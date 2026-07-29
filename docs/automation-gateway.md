# Axion automation edge gateway

The automation gateway is a separately deployable Node service for the OT or industrial DMZ network. It keeps OPC UA credentials and certificates outside the public web application, reads only an explicit tag allowlist, and relays quality-coded telemetry to Axion.

## Safety model

The default state is:

- simulator connection
- read-only telemetry
- physical writes disabled
- template OPC UA node IDs
- no PLC connection

A physical write must pass both the Axion API policy and the independent edge-gateway policy. Enabling only one side is insufficient.

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

1. Export the PLC/SCADA namespace and replace every template `nodeId` in `automation-gateway/tag-map.json`.
2. Review engineering units, data types, ranges, writable flags, and CPP/CMA criticality with the site automation owner.
3. Install the client certificate and key on the gateway host.
4. Establish server trust and keep the connection read-only.
5. Test `/v1/connections/test`.
6. Verify signal quality and source timestamps.
7. Run the Axion **Read-only FAT/SAT gate** in Factory Twin.
8. Attach cause-and-effect, interlock, trip, alarm, and rollback evidence.
9. Only after site approval, configure the connection as read-write and enable the backend write flag.
10. Enable `AUTOMATION_GATEWAY_WRITES_ENABLED=true` last.

Required OPC UA environment:

```bash
AUTOMATION_CONNECTION_KIND=opcua-edge
AUTOMATION_CONNECTION_ENDPOINT=opc.tcp://approved-server:4840
OPCUA_SECURITY_MODE=SignAndEncrypt
OPCUA_SECURITY_POLICY=Basic256Sha256
OPCUA_CERTIFICATE_FILE=/run/secrets/axion-client-cert.pem
OPCUA_PRIVATE_KEY_FILE=/run/secrets/axion-client-key.pem
```

Username/password credentials, when unavoidable, are supplied by the Axion backend to the gateway as an encrypted connection credential. Certificate authentication is preferred.

## Gateway API

```text
GET  /health
GET  /v1/tag-map
POST /v1/connections/test
POST /v1/telemetry/snapshot
POST /v1/write
GET  /v1/audit
```

Every route except `/health` requires `Authorization: Bearer <AUTOMATION_GATEWAY_TOKEN>`.

## Remaining plant work

The repository cannot supply site-specific PLC node IDs, network routes, certificates, interlock logic, safety-trip evidence, or change-control approvals. Those items must come from the plant owner and be verified through the site's automation, quality, cybersecurity, and process-safety procedures.
