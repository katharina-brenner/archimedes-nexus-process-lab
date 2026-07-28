#!/usr/bin/env python3
"""Minimal Axion CFD worker contract.

This service is intentionally dependency-free so it can run anywhere. In
production, deploy it on a machine/container that has OpenFOAM or another
validated CFD stack installed, then replace the dry-run command section with
the project-specific meshing/solver pipeline.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import time
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "8787"))
TOKEN = os.environ.get("CFD_WORKER_TOKEN", "")
JOBS_DIR = Path(os.environ.get("CFD_JOBS_DIR", ".cfd-jobs")).resolve()
OPENFOAM_SOLVER = os.environ.get("OPENFOAM_SOLVER", "interFoam")
DRY_RUN = os.environ.get("AXION_CFD_DRY_RUN", "true").lower() != "false"


def json_response(handler: BaseHTTPRequestHandler, status: int, payload: dict) -> None:
    body = json.dumps(payload, indent=2).encode("utf-8")
    handler.send_response(status)
    handler.send_header("content-type", "application/json; charset=utf-8")
    handler.send_header("content-length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def read_json(handler: BaseHTTPRequestHandler) -> dict:
    length = int(handler.headers.get("content-length", "0"))
    if length > 10_000_000:
        raise ValueError("Payload too large")
    raw = handler.rfile.read(length) if length else b"{}"
    return json.loads(raw.decode("utf-8"))


def authorized(handler: BaseHTTPRequestHandler) -> bool:
    if not TOKEN:
        return False
    return handler.headers.get("authorization", "") == f"Bearer {TOKEN}"


def prepare_case(payload: dict) -> dict:
    job_id = str(payload.get("jobId") or uuid.uuid4())
    case_dir = JOBS_DIR / job_id
    case_dir.mkdir(parents=True, exist_ok=True)
    case_input = payload.get("caseInput") or {}
    boundary_conditions = [
        {"name": "gas_inlet", "field": "alpha.gas / U.gas / C_O2", "patch": "ring-sparger"},
        {"name": "feed_inlet", "field": "C_N / glucose / glutamine", "patch": "top-feed"},
        {"name": "walls_baffles", "field": "U.liquid", "patch": "noSlip"},
        {"name": "top_headspace", "field": "p_rgh / alpha.gas", "patch": "pressure-outlet"},
        {"name": "impeller_zone", "field": "MRF / momentumSource", "patch": "horizontal rotating frame"},
        {"name": "cell_uptake", "field": "S_O2 / S_N", "patch": "volumetric sink"},
    ]
    case_manifest = {
        "jobId": job_id,
        "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "projectId": payload.get("projectId", ""),
        "unitId": payload.get("unitId", ""),
        "requestedSolver": payload.get("solver", OPENFOAM_SOLVER),
        "caseInput": case_input,
        "boundaryConditions": boundary_conditions,
        "requiredProductionInputs": [
            "3D vessel CAD or parametric vessel geometry",
            "impeller blade geometry and rotation speed",
            "baffle dimensions",
            "sparger ring and hole layout",
            "liquid/gas material properties",
            "cell uptake kinetics for O2 and nutrients",
            "mesh-independence target",
            "measured kLa, mixing time and power draw for validation",
        ],
    }
    (case_dir / "axion-case.json").write_text(json.dumps(case_manifest, indent=2), encoding="utf-8")
    return case_manifest


def run_solver(case_dir: Path) -> dict:
    solver_path = shutil.which(OPENFOAM_SOLVER)
    if DRY_RUN:
        return {
            "status": "prepared-dry-run",
            "solver": OPENFOAM_SOLVER,
            "message": "Case package prepared. Set AXION_CFD_DRY_RUN=false on an OpenFOAM host to execute the solver.",
        }
    if not solver_path:
        return {
            "status": "solver-unavailable",
            "solver": OPENFOAM_SOLVER,
            "message": f"{OPENFOAM_SOLVER} is not installed or not on PATH.",
        }
    started = time.time()
    proc = subprocess.run(
        [solver_path, "-case", str(case_dir)],
        cwd=case_dir,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=int(os.environ.get("CFD_SOLVER_TIMEOUT_S", "3600")),
        check=False,
    )
    return {
        "status": "completed" if proc.returncode == 0 else "failed",
        "solver": OPENFOAM_SOLVER,
        "returnCode": proc.returncode,
        "durationS": round(time.time() - started, 2),
        "stdoutTail": proc.stdout[-4000:],
        "stderrTail": proc.stderr[-4000:],
    }


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt: str, *args) -> None:
        print(f"{self.address_string()} - {fmt % args}")

    def do_GET(self) -> None:
        if self.path == "/health":
            json_response(self, 200, {
                "ok": True,
                "worker": "axion-cfd-worker",
                "dryRun": DRY_RUN,
                "solver": OPENFOAM_SOLVER,
                "solverAvailable": bool(shutil.which(OPENFOAM_SOLVER)),
            })
            return
        if self.path.startswith("/jobs/"):
            if not authorized(self):
                json_response(self, 401, {"error": "Not authenticated"})
                return
            job_id = self.path.rsplit("/", 1)[-1].strip()
            case_dir = JOBS_DIR / job_id
            manifest_path = case_dir / "axion-case.json"
            result_path = case_dir / "worker-result.json"
            if not manifest_path.exists():
                json_response(self, 404, {"error": "Job not found"})
                return
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            result = json.loads(result_path.read_text(encoding="utf-8")) if result_path.exists() else {"status": "prepared"}
            json_response(self, 200, {
                "jobId": job_id,
                "status": result.get("status", "prepared"),
                "caseDir": str(case_dir),
                "manifest": manifest,
                "solver": result,
            })
            return
        json_response(self, 404, {"error": "Route not found"})

    def do_POST(self) -> None:
        if self.path != "/jobs":
            json_response(self, 404, {"error": "Route not found"})
            return
        if not authorized(self):
            json_response(self, 401, {"error": "Not authenticated"})
            return
        try:
            payload = read_json(self)
            manifest = prepare_case(payload)
            case_dir = JOBS_DIR / manifest["jobId"]
            solver = run_solver(case_dir)
            (case_dir / "worker-result.json").write_text(json.dumps(solver, indent=2), encoding="utf-8")
            json_response(self, 201, {
                "jobId": manifest["jobId"],
                "status": solver["status"],
                "caseDir": str(case_dir),
                "manifest": manifest,
                "solver": solver,
            })
        except Exception as exc:
            json_response(self, 500, {"error": str(exc)})


def main() -> None:
    JOBS_DIR.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Axion CFD worker listening on http://{HOST}:{PORT}")
    server.serve_forever()


if __name__ == "__main__":
    main()
