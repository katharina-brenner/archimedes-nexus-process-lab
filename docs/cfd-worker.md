# Axion CFD Worker

The browser CFD page is a fast screening and case-building layer. Rigorous CFD should run in a separate worker on a machine that has OpenFOAM, BiRD, COMSOL, STAR-CCM+ or another validated solver stack.

## Local worker contract

```bash
export CFD_WORKER_TOKEN="replace-with-worker-token"
python3 workers/cfd_worker.py
```

Health check:

```bash
curl http://127.0.0.1:8787/health
```

Backend connection:

```bash
CFD_WORKER_URL=http://127.0.0.1:8787
CFD_WORKER_TOKEN=replace-with-worker-token
```

## Production mode

The default worker is a safe dry run. It authenticates Axion, writes the case package, records required boundary conditions and returns a prepared job.

For real solver execution:

```bash
AXION_CFD_DRY_RUN=false
OPENFOAM_SOLVER=interFoam
CFD_SOLVER_TIMEOUT_S=3600
```

The solver host must provide:

- 3D vessel geometry or parametric case generation
- impeller blade geometry and horizontal MRF zone
- baffle geometry
- ring sparger holes and gas inlet
- top feed inlet for nutrient/glucose/glutamine proxy
- no-slip walls and baffles
- pressure/headspace outlet
- oxygen and nutrient scalar transport
- cell uptake sink terms
- turbulence model selection and mesh-independence checks
- measured kLa, mixing time and power draw for validation

Axion stores the submitted job and the worker response. The browser remains the design and review interface; the worker is the compute boundary for validated CFD.
