# OT site pack

Copy this directory to a controlled deployment location outside the public web host. Replace every `REPLACE` value and every template Node ID with approved plant data.

Do not commit certificates, private keys, credentials, exported PLC logic, or controlled safety documents. Store only document IDs, revisions, SHA-256 fingerprints, approval roles, and dates in `approvals.json`.

Run the strict preflight before commissioning:

```bash
pnpm gateway:site:check -- --source /controlled/path/to/site-pack
```

The gateway starts in read-only mode. A valid `writeRelease` does not enable writes by itself; the independent `AUTOMATION_GATEWAY_WRITES_ENABLED=true` switch is still required.
