#!/usr/bin/env python3
"""Axion screening bioprocess model.

This is a deliberately compact, dependency-free model runner for the Node
backend. It is not a validated CFD or mechanistic GMP model; it creates a
source-backed dynamic screen that can later be replaced by SciPy, CasADi,
OpenFOAM, COMSOL, or a dedicated equation-oriented solver.
"""

from __future__ import annotations

import json
import math
import sys


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def read_input() -> dict:
    raw = sys.stdin.read()
    if not raw.strip():
        return {}
    return json.loads(raw)


def simulate(payload: dict) -> dict:
    template = str(payload.get("template") or "culturedMeat")
    volume_l = max(1.0, float(payload.get("batchVolumeL") or 20000.0))
    duration_h = max(1.0, float(payload.get("durationH") or 120.0))
    titer_gl = max(0.001, float(payload.get("titerGL") or 4.0))
    recovery_pct = clamp(float(payload.get("recoveryPct") or 72.0), 1.0, 99.9)
    annual_batches = max(1.0, float(payload.get("annualBatches") or 180.0))
    kla_h = max(0.01, float(payload.get("klaH") or 12.0))
    our_mol_l_h = max(0.00001, float(payload.get("ourMolLh") or 0.006))
    working_volume_pct = clamp(float(payload.get("workingVolumePct") or 65.0), 1.0, 95.0)
    vcd = max(0.01, float(payload.get("viableCellDensityMillionMl") or 50.0))
    glucose_gl = max(0.0, float(payload.get("glucoseGL") or 6.0))
    glutamine_mm = max(0.0, float(payload.get("glutamineMm") or 4.0))
    lactate_mm = max(0.0, float(payload.get("lactateMm") or 0.0))
    ammonium_mm = max(0.0, float(payload.get("ammoniumMm") or 0.4))
    ph = float(payload.get("ph") or 7.1)
    temp_c = float(payload.get("temperatureC") or 37.0)

    # Screening values: oxygen saturation proxy in mmol/L and product mass.
    do_sat_mm = 0.21
    liquid_l = volume_l * working_volume_pct / 100.0
    product_kg_batch = volume_l * titer_gl / 1000.0 * recovery_pct / 100.0
    annual_product_kg = product_kg_batch * annual_batches

    dt = max(0.25, duration_h / 96.0)
    steps = int(math.ceil(duration_h / dt))
    x = max(0.05, vcd / 50.0)
    do_mm = do_sat_mm * 0.72
    glucose = glucose_gl
    glutamine = glutamine_mm
    lactate = lactate_mm
    ammonium = ammonium_mm
    product = 0.0
    heat_kwh = 0.0
    energy_kwh = 0.0
    series = []

    mu_max = 0.032 if template in {"culturedMeat", "antibody", "vaccine", "cellTherapy"} else 0.12
    ks_glucose = 0.45
    ks_glutamine = 0.12
    oxygen_sensitivity = 0.5
    product_rate = titer_gl / duration_h

    for index in range(steps + 1):
        time_h = min(duration_h, index * dt)
        glucose_factor = glucose / (ks_glucose + glucose) if glucose > 0 else 0.0
        glutamine_factor = glutamine / (ks_glutamine + glutamine) if glutamine > 0 else 0.0
        oxygen_factor = do_mm / (do_sat_mm * oxygen_sensitivity + do_mm)
        inhibition = 1.0 / (1.0 + max(0.0, ammonium - 2.0) * 0.28 + max(0.0, lactate - 20.0) * 0.035)
        mu = mu_max * glucose_factor * max(0.3, glutamine_factor) * oxygen_factor * inhibition

        otr = kla_h * max(0.0, do_sat_mm - do_mm)
        our = our_mol_l_h * (0.65 + 0.35 * x)
        do_mm = clamp(do_mm + (otr - our) * dt, 0.0, do_sat_mm)

        growth = x * mu * dt
        x += growth
        glucose = max(0.0, glucose - (0.055 * growth * 50.0 + 0.012 * dt))
        glutamine = max(0.0, glutamine - (0.28 * growth + 0.006 * dt))
        lactate += max(0.0, (0.58 * growth + max(0.0, glucose - 3.0) * 0.004 * dt))
        ammonium += max(0.0, (0.34 * growth + max(0.0, glutamine - 2.0) * 0.009 * dt))
        product = min(titer_gl, product + product_rate * dt * inhibition)
        heat_kwh += liquid_l * 0.00018 * (1.0 + x * 0.08) * dt
        energy_kwh += liquid_l * 0.00009 * (1.0 + kla_h / 15.0) * dt

        if index % max(1, steps // 32) == 0 or index == steps:
            series.append(
                {
                    "timeH": round(time_h, 3),
                    "vcdRelative": round(x, 4),
                    "dissolvedOxygenPct": round(do_mm / do_sat_mm * 100.0, 2),
                    "glucoseGL": round(glucose, 4),
                    "glutamineMm": round(glutamine, 4),
                    "lactateMm": round(lactate, 4),
                    "ammoniumMm": round(ammonium, 4),
                    "productGL": round(product, 4),
                }
            )

    warnings = []
    if working_volume_pct > 80:
        warnings.append("Working volume exceeds 80% STR screening limit; add headspace/foam and gas-disengagement review.")
    if template in {"culturedMeat", "antibody", "vaccine", "cellTherapy"} and volume_l > 20000:
        warnings.append("Animal-cell reactor volume exceeds 20,000 L screening boundary; evaluate scale-out or intensified perfusion.")
    if ammonium > 2.0:
        warnings.append("Ammonium exceeds 2 mM screening boundary; reduce glutamine burden or add perfusion/bleed control.")
    if lactate > 20.0:
        warnings.append("Lactate is high; review feed strategy, glucose excess, base addition and harvest timing.")
    if do_mm / do_sat_mm * 100.0 < 35.0:
        warnings.append("Dissolved oxygen approaches transfer limitation; review kLa, sparger, gas flow, impeller and working volume.")
    if ph < 6.8 or ph > 7.4:
        warnings.append("pH is outside common mammalian-cell screening band; add control and CO2/base-balance review.")
    if temp_c < 35.0 or temp_c > 38.0:
        warnings.append("Temperature is outside common mammalian-cell screening band; check heat-transfer and cell-line assumptions.")

    severity = "critical" if len(warnings) >= 3 else "review" if warnings else "screening-ok"
    return {
        "model": "Axion Python bioprocess screening v0.1",
        "status": severity,
        "inputs": payload,
        "kpis": {
            "productKgPerBatch": round(product_kg_batch, 3),
            "annualProductKg": round(annual_product_kg, 3),
            "finalDissolvedOxygenPct": round(do_mm / do_sat_mm * 100.0, 2),
            "finalLactateMm": round(lactate, 3),
            "finalAmmoniumMm": round(ammonium, 3),
            "finalGlucoseGL": round(glucose, 3),
            "finalGlutamineMm": round(glutamine, 3),
            "heatKwhPerBatch": round(heat_kwh, 3),
            "mixingEnergyKwhPerBatch": round(energy_kwh, 3),
            "workingVolumePct": round(working_volume_pct, 2),
        },
        "warnings": warnings,
        "timeSeries": series,
        "modelBoundaries": [
            {"name": "ammonium", "limit": "2 mM screening boundary", "basis": "CHO/mammalian-cell metabolic literature"},
            {"name": "lactate", "limit": "20 mM screening review level", "basis": "cell-culture metabolic overflow screen"},
            {"name": "working_volume", "limit": "80% STR screening limit", "basis": "bioreactor working-volume and headspace practice"},
            {"name": "animal_cell_reactor_volume", "limit": "20,000 L screening boundary", "basis": "cultured-meat and animal-cell scale-up review"},
            {"name": "oxygen_transfer", "limit": "DO should remain comfortably above low-oxygen warning band", "basis": "kLa/OUR oxygen-transfer model"},
        ],
    }


def main() -> None:
    payload = read_input()
    print(json.dumps(simulate(payload), separators=(",", ":")))


if __name__ == "__main__":
    main()
