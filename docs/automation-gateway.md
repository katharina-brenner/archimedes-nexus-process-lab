# Axion automation edge gateway

The automation gateway is a separately deployable Node service for the OT or Industrial DMZ network. It keeps OPC UA credentials and certificates outside the public web application, reads only an explicit tag allowlist, and relays quality-coded telemetry to Axion through an outbound HTTPS connection.

The gateway is intentionally not part of `docker-compose.production.yml`. That stack is for the public control plane. Deploy the gateway with `docker-compose.ot.yml` on a host managed by the plant's OT team.

## Safety model

The default state is:

- simulator connection
- read-only telemetry
- physical writes disabled
- template OPC UA node IDs
- no PLC connection

A physical write must pass both the Axion API policy and the independent edge-gateway policy. Enabling only one side is insufficient.

For a physical connection, the gateway additionally requires a controlled site pack:

- exact Axion project ID
- approved `opc.tcp://` endpoint
- exported and reviewed plant Node IDs
- `SignAndEncrypt` with `Basic256Sha256`
- installed client certificate, private key and trusted-server certificate directory
- Industrial DMZ or OT placement with no public inbound exposure
- versioned cause-and-effect, interlock matrix, trip-test and rollback-plan fingerprints
- approvals by site automation, process safety, quality and cybersecurity
- explicit read-only FAT/SAT release

## Local simulator

```bash
export AUTOMATION_GATEWAY_TOKEN="replace-with-a-long-random-token"
export AUTOMATION_GATEWAY_WRITES_ENABLED=false
pnpm gateway:start
```

The service listens on `http://127.0.0.1:8921`.

```bash
curl http://127.0.0.1:8921/health

curl -X POST http://127.0.0.1:8921/v1/telemetry/snapshot \
  -H "authorization: Bearer $AUTOMATION_GATEWAY_TOKEN" \
  -H "content-type: application/json" \
  -d '{"kind":"simulation"}'
```

## Backend telemetry publishing

Set the same machine-ingest token on the Axion backend and gateway:

```bash
AXION_AUTOMATION_INGEST_TOKEN=replace-with-a-second-long-random-token
AXION_AUTOMATION_INGEST_OWNER=the-project-owner-username
AXION_BACKEND_URL=https://your-axion-api.example
AXION_AUTOMATION_PROJECT_ID=project-id
AXION_AUTOMATION_CONNECTION_ID=connection-id
AUTOMATION_PUBLISH_INTERVAL_MS=5000
```

The machine token can only ingest telemetry in the configured owner's project scope. It cannot open projects, change models, configure loops, or invoke physical control.

## OPC UA commissioning

1. Copy `automation-gateway/site-pack.example` to a controlled location outside Git.
2. Export the PLC/SCADA namespace and replace every template `nodeId` in `tag-map.json`.
3. Review engineering units, data types, ranges, writable flags, and CPP/CMA criticality with the site automation owner.
4. Enter the exact Axion project ID and approved OPC UA endpoint in `site.json`.
5. Install the client certificate and key on the gateway host, establish server trust, and leave the connection read-only.
6. Record controlled document metadata and SHA-256 fingerprints in `approvals.json`. Do not copy controlled documents into this repository.
7. Run `pnpm gateway:site:check -- --source /controlled/path/to/site-pack`.
8. Deploy `docker-compose.ot.yml` in the OT network or Industrial DMZ.
9. Test `/v1/connections/test`, verify signal quality and source timestamps, then run the Axion **Read-only FAT/SAT gate** in Factory Twin.
10. Only after site approval, complete `writeRelease`, configure the backend connection as read-write, enable the backend write flag, and enable `AUTOMATION_GATEWAY_WRITES_ENABLED=true` last.

Required OPC UA environment:

```bash
AUTOMATION_CONNECTION_KIND=opcua-edge
AUTOMATION_CONNECTION_ENDPOINT=opc.tcp://approved-server:4840
OPCUA_SECURITY_MODE=SignAndEncrypt
OPCUA_SECURITY_POLICY=Basic256Sha256
OPCUA_CERTIFICATE_FILE=/run/secrets/axion-client-cert.pem
OPCUA_PRIVATE_KEY_FILE=/run/secrets/axion-client-key.pem
OPCUA_TRUSTED_CERTIFICATES_DIR=/run/secrets/opcua/trusted
AUTOMATION_SITE_MANIFEST=/run/site-pack/site.json
AUTOMATION_APPROVALS_MANIFEST=/run/site-pack/approvals.json
```

Username/password credentials, when unavoidable, are supplied by the Axion backend to the gateway as an encrypted connection credential. Certificate authentication is preferred.

## Gateway API

```text
GET  /health
GET  /v1/tag-map
GET  /v1/commissioning/status
POST /v1/connections/test
POST /v1/telemetry/snapshot
POST /v1/write
GET  /v1/audit
```

Every route except `/health` requires `Authorization: Bearer <AUTOMATION_GATEWAY_TOKEN>`. `/health` exposes only readiness flags, never credentials, keys or certificate paths.

## Dockerless preflight

Docker is not required for source and policy validation:

```bash
pnpm gateway:site:check -- --source automation-gateway/site-pack.example --template
pnpm gateway:container:check
pnpm test
```

GitHub Actions builds the real image with Docker on every push. This catches Dockerfile and dependency-build failures even when the developer workstation has no Docker runtime.

## Remaining plant work

The repository cannot invent site-specific PLC node IDs, network routes, certificates, interlock logic, safety-trip evidence, or change-control approvals. Those items must come from the plant owner and be verified through the site's automation, quality, cybersecurity, and process-safety procedures. Until they are supplied, Axion shows each physical commissioning item as blocked and does not attempt an OPC UA network session.
