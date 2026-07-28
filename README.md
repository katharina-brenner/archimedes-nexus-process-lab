# Axion Process OS

A standalone high-density bioprocess flowsheet and process-intelligence studio inspired by professional process simulation tools.

## Open locally with backend

```bash
npm install
npm run backend
```

Then open `http://127.0.0.1:8899/index.html?v=saas-checkout-v1`.

## Online access

The public frontend can be hosted statically for marketing pages, but the private workspace requires the Node backend. Paid access, Google login, projects, collaboration, exports, Python runs, and CFD jobs are verified server-side.

## Product-first workflow

The front of the application now works like a company-grade product entry flow:

- Login opens a BeamAI-inspired Axion landing surface, not the payment screen
- The logo opens a public Axion front page with platform, workflow, ecosystem, and login sections
- Start page asks for a natural-language product and plant description
- Optional data files can be attached to the product brief
- Axion automatically maps the brief to the closest process model
- The detailed workspace then opens with flowsheets, equipment, balances, CFD, boundaries, economics, sources, recommendations, and downloads
- The download center exports detailed LCA inventory CSVs, LCA impact summaries, TEA-ready cost tables, and downloadable SVG visualizations for plant architecture, LCA flows, and cost stacks
- The Process Builder can be opened directly from Twin OS and automatically fits the full process canvas
- Platform, Workflow, and Ecosystem pages include concrete tool examples for mAb, cultured meat, penicillin, LCA/TEA handoff, SCADA/historian, supplier quotes, and gPROMS-style modelling paths
- Real-time digital-twin telemetry cards show live DO, pH, OTR margin, mixing time, heat load, and mass-closure signals in Overview, Simulation, and CFD
- Click-to-explore detail drawer for public cards, KPI tiles, reports, sources, standards, recommendations, simulation cards, live telemetry, canvas units, streams, and tables, with animated click feedback and contextual tool jumps
- A persistent help field lets users describe a problem in words and receive direct tool steps

## Private workspace backend

Axion includes a small Node backend for private workspace access, product briefs, uploaded data previews, Google login configuration, and contextual tool help. Set these environment variables on the machine or hosting platform:

```bash
export AXION_ADMIN_USER="owner"
export AXION_ADMIN_PASSWORD="set-a-private-password"
export SESSION_SECRET="set-a-long-random-secret"
export APP_BASE_URL="http://127.0.0.1:8899"
export AXION_DATA_DIR=".data"
export GOOGLE_CLIENT_ID="your-google-oauth-client-id.apps.googleusercontent.com"
export GOOGLE_ALLOWED_EMAILS="you@example.com"
export GOOGLE_ALLOWED_DOMAINS=""
```

Google login uses Google Identity Services in the browser and verifies the returned ID token on the backend. It only renders as active when `GOOGLE_CLIENT_ID` is configured.

## Paywall setup

The paywall is backend-enforced. Do not use a static GitHub Pages deployment for real paid access, because static HTML cannot securely verify payment. Use `npm run backend` or deploy `server.mjs` to a Node hosting provider.

1. Copy `.env.example` to `.env`.
2. Set `SESSION_SECRET` to a long private random string.
3. Set `AXION_PRICE_CENTS=240000` and `AXION_CURRENCY=EUR` for the Professional Individual annual licence.
4. Create a Stripe product/price for the annual Axion license, or let the backend create a one-off checkout price from `AXION_PRICE_CENTS`.
5. Set `STRIPE_SECRET_KEY`.
6. Optional but recommended: set `STRIPE_PRICE_ID` and `STRIPE_WEBHOOK_SECRET`.
7. Set `APP_BASE_URL` to the public backend URL, for example `https://your-domain.com`.
8. Start the backend with `npm run backend`.
9. New paying users open the login page and submit the paid-access form.
10. The backend creates a Stripe Checkout session and redirects the user to secure payment.
11. After Stripe confirms payment, the backend creates a license and the frontend logs the user in automatically.

For production Stripe activation on a public HTTPS backend, set:

```bash
STRIPE_SECRET_KEY=sk_live_or_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
APP_BASE_URL=https://your-public-backend-domain.com
```

Configure the Stripe webhook endpoint to:

```text
https://your-public-backend-domain.com/api/stripe/webhook
```

Listen for `checkout.session.completed`, `checkout.session.async_payment_succeeded`, and `checkout.session.async_payment_failed`.

For local webhook testing with Stripe CLI:

```bash
stripe listen --forward-to http://127.0.0.1:8899/api/stripe/webhook
```

Manual admin activation is still available as a fallback:

```bash
TOKEN=$(curl -sS -X POST http://127.0.0.1:8899/api/auth/login \
  -H 'content-type: application/json' \
  -d '{"user":"owner","password":"YOUR_ADMIN_PASSWORD"}' | python3 -c 'import json,sys; print(json.load(sys.stdin)["token"])')

curl -sS -X POST http://127.0.0.1:8899/api/admin/orders/ORDER_REFERENCE/mark-paid \
  -H "authorization: Bearer $TOKEN"
```

The response contains the activated license key. The user can then log in with their email and the license key.

Workspace users are configured through backend environment variables, activated licenses, Google OAuth, or admin-managed access. No customer-facing default users are embedded in the browser.

## Public website

The public site presents Axion as a professional process-modelling workspace with platform, workflow, ecosystem, reviews, pricing, and login pages. Customer-facing copy focuses on product capabilities, implementation fit, data governance, and onboarding.

The `Readiness` page explains the difference between the current working prototype and a production SaaS web app: product features are available locally, while real professional operation still depends on hosted infrastructure, persistent database setup, provider secrets, OAuth, payments, email delivery, monitoring, deployment, and validated CFD compute.

## Backend API

- `GET /api/health` returns production health, storage, payment, Google, and invite-email readiness
- `GET /api/production-readiness` returns a secret-safe setup checklist for Supabase, Stripe, Google, email, deployment, CFD worker and CI
- `GET /api/professional-readiness` returns the public-safe professional SaaS gap analysis used by the Readiness page
- `GET /api/product` lists product and backend configuration
- `POST /api/checkout` creates a Stripe Checkout session for the 2,400 EUR Professional Individual annual licence
- `GET /api/checkout/session/:sessionId` verifies a completed checkout and returns the activated license
- `POST /api/stripe/webhook` receives Stripe checkout payment events and activates paid orders
- `POST /api/auth/login` logs in the owner workspace
- `GET /api/auth/google-config` tells the frontend whether Google login is configured
- `POST /api/auth/google` verifies a Google ID token and creates a server session
- `GET /api/account` verifies a server session
- `GET /api/projects` lists projects, invitations, integration definitions, and model folders
- `POST /api/projects` creates a user-owned project
- `GET /api/projects/:id` opens a saved model and its old versions
- `GET /api/projects/:id/export` downloads a full project package with model, versions, datasets, invites, runs, CFD jobs and audit context
- `POST /api/projects/:id/save` saves the current model and archives the previous one
- `POST /api/projects/:id/archive` moves a project out of the active list
- `POST /api/projects/:id/invites` invites a collaborator by username or email
- `POST /api/projects/:id/versions/:versionId/restore` restores an archived model version
- `GET /api/integrations` lists prepared API connector targets
- `POST /api/integrations/:key/actions` runs configure, mapping-test, or export actions for a connector and stores an audit record
- `GET /api/data/architecture` returns the recommended production data stack and Postgres schema blueprint
- `GET /api/backend/processes` returns the production backend process map, including API core, Next.js BFF, datasets, jobs, billing, OAuth, email and CFD worker responsibilities
- `GET /api/services/status` returns secret-safe provider status for GitHub, Supabase, Stripe, Google, email, OpenAI and CFD
- `POST /api/services/:key/probe` runs an admin-only safe live probe for `openai`, `supabase`, `stripe`, or `cfd`
- `GET /api/audit` returns authenticated audit events, optionally filtered by `projectId`, `type`, and `limit`
- `POST /api/commands/plan` creates a safe AI/deterministic model-edit plan for Cursor-style process commands
- `POST /api/commands/:planId/apply` records an applied command as a project version and audit event
- `POST /api/commands/undo` restores the archived model version behind the last applied command
- `GET /api/sources/academic` returns the source-backed model design library for boundaries, CFD, TEA/LCA, scheduling, digital twin and Python modelling
- `GET /api/datasets` lists registered project datasets and uploaded-data metadata
- `POST /api/datasets` registers a project dataset, schema, source, preview rows and validation status
- `GET /api/datasets/:id/export` downloads a company data package with detected schema, preview rows, model targets, quality checks and calibration hints
- `GET /api/model-runs` lists saved Python/backend model runs
- `POST /api/model-runs/python` runs the local Python bioprocess screening model and saves the full input/output package
- `GET /api/cfd/jobs` lists backend CFD screening/handoff jobs
- `POST /api/cfd/jobs` creates a backend CFD screening job with OpenFOAM-ready boundary-condition metadata
- `GET /api/cfd/jobs/:id` returns the stored CFD job and, when configured, the external CFD worker status
- `POST /api/project/brief` stores the natural-language product brief and uploaded data previews
- `POST /api/help` returns contextual tool guidance for the current process, scale, and selected unit
- `GET /api/admin/orders` lists orders and licenses for admins
- `POST /api/admin/orders/:id-or-reference/mark-paid` activates a paid order and creates a license key

## Backend Data + Python Modelling

Company datasets can be registered from CSV or JSON and classified into kinetics, CFD, TEA, LCA, supplier, QC and scheduling roles. The backend stores dataset metadata, detects column roles, scores data quality, and prepares calibration targets for Python or external modelling jobs.

## AI Command Planner

The side composer works like a controlled engineering command system. The frontend sends the user command plus a compact model summary to `POST /api/commands/plan`; the backend returns only bounded operations such as `setParam`, `setCfd`, `addUnit`, `addPreset`, `fitCanvas`, and `startCfd`. The browser applies those operations, shows before/after impact, and then calls `POST /api/commands/:planId/apply` to archive the previous project model as a version. `POST /api/commands/undo` restores that archived version.

Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL` on the backend for LLM planning. If OpenAI is disabled or unavailable, Axion falls back to a deterministic safe planner so the command field still works.

The key must belong to an OpenAI project with active billing/quota. When quota is exhausted, the backend keeps the command system available through the deterministic planner and reports the provider error without exposing the key.

## Next.js Backend-For-Frontend

`nextjs-bff/` adds an optional Next.js app edge in front of the Axion API core. It follows the Next.js Route Handler / Backend-for-Frontend pattern and uses `output: "standalone"` for production containers. The API core remains `server.mjs`; the BFF proxies `/api/axion/*` and `/api/core/*` to the core so future SSR pages, auth middleware, public-domain routing and app-edge concerns do not get mixed into the process-modelling backend.

Local BFF run:

```bash
cd nextjs-bff
AXION_API_BASE_URL=http://127.0.0.1:8899 pnpm install
AXION_API_BASE_URL=http://127.0.0.1:8899 pnpm dev
```

Production variables:

- API core: `APP_BASE_URL=https://your-api-core-domain`, `NEXTJS_BFF_URL=https://your-public-app-domain`, `AXION_REQUIRE_PRODUCTION_CONFIG=true`
- Next.js BFF: `AXION_API_BASE_URL=https://your-api-core-domain`

The local prototype can store users, projects, datasets, simulation runs and model versions in `.data/*.json`. In production, the backend can use Supabase/Postgres for account/order/project metadata plus versioned model documents. Use Supabase Storage or S3-compatible object storage for uploaded file bytes, and a separate Python/CFD worker service for longer model runs.

## Supabase/Postgres setup

The backend now supports a production Supabase/Postgres adapter without adding runtime dependencies. Run [supabase/schema.sql](/Users/katharinajuliabrenner/Documents/GitHub/superpro-designer/supabase/schema.sql) once in the Supabase SQL editor, then set:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
SUPABASE_STATE_TABLE=axion_state
SUPABASE_DOCUMENTS_TABLE=axion_documents
SUPABASE_STORAGE_BUCKET=axion-model-data
```

The service-role key must only exist on the backend host. Never expose it in GitHub Pages, frontend code, or browser environment variables.

## CFD worker setup

For rigorous external CFD jobs, use [docs/cfd-worker.md](/Users/katharinajuliabrenner/Documents/GitHub/superpro-designer/docs/cfd-worker.md). The included [workers/cfd_worker.py](/Users/katharinajuliabrenner/Documents/GitHub/superpro-designer/workers/cfd_worker.py) implements Axion's `/jobs` contract, writes case payloads, and can be deployed on an OpenFOAM-capable host. [Dockerfile.cfd-worker](/Users/katharinajuliabrenner/Documents/GitHub/superpro-designer/Dockerfile.cfd-worker) packages the worker; build it on an OpenFOAM-capable base image and set `AXION_CFD_DRY_RUN=false` for real solver execution.

## Invite email setup

Invite records work without email. For real email delivery, configure a sender domain and set either Resend:

```bash
INVITE_EMAIL_FROM="Axion Process OS <invites@your-domain.com>"
RESEND_API_KEY=re_...
```

or SMTP:

```bash
INVITE_EMAIL_FROM="Axion Process OS <invites@your-domain.com>"
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
```

When configured, project invites to email addresses are sent automatically and still remain recorded in the backend audit trail.

## Deployment checklist

GitHub Pages can host the static marketing/frontend shell, but paid access, Google login, project storage, email invites, Python runs and CFD jobs require a Node backend on HTTPS.

Recommended production shape:

- Deploy `server.mjs` to a Node host such as Render, Fly.io, Railway, Vercel serverless functions, Google Cloud Run, or AWS.
- Use [Dockerfile](/Users/katharinajuliabrenner/Documents/GitHub/superpro-designer/Dockerfile) for container deployment, or [render.yaml](/Users/katharinajuliabrenner/Documents/GitHub/superpro-designer/render.yaml) for a direct Render Blueprint.
- Set all backend secrets on that host, not in GitHub Pages.
- Set `AXION_REQUIRE_PRODUCTION_CONFIG=true` after the host secrets are complete, so the backend refuses to start with local-only defaults.
- Point `APP_BASE_URL` to the public backend URL.
- Add the same public backend URL to Stripe webhook configuration.
- Add the domain to the Google OAuth authorized JavaScript origins and redirect/origin settings.
- Point the custom domain DNS to the backend host if the full app should run behind one URL.

For Render Blueprint deployment:

1. Push this repository to GitHub.
2. In Render, create a Blueprint from the repository.
3. Use `render.yaml`.
4. Set all `sync: false` secrets in the Render dashboard.
5. Open `/api/health` on the Render URL.
6. Set `APP_BASE_URL` to the Render/custom-domain HTTPS URL.
7. Configure Stripe webhook to `${APP_BASE_URL}/api/stripe/webhook`.
8. Configure Google OAuth to allow the same origin.
9. Open `/api/production-readiness`; every required row should be `ready`.

For provider-side account actions and domain/DNS setup, use [docs/production-runbook.md](/Users/katharinajuliabrenner/Documents/GitHub/superpro-designer/docs/production-runbook.md).

## Tests and CI

Run locally:

```bash
npm run check
npm test
npm run doctor
npm run smoke:production
```

GitHub Actions also runs syntax checks, backend API tests, and a static build via `.github/workflows/ci.yml`.

See [docs/setup-production.md](/Users/katharinajuliabrenner/Documents/GitHub/superpro-designer/docs/setup-production.md) for the exact production setup flow.

Python modelling starts with `python_models/bioprocess_model.py`, a dependency-free dynamic screening model for batch/cell-culture behaviour. It returns time series, product, oxygen-transfer, glucose/glutamine, lactate, ammonium, heat/energy and boundary warnings. It is a screening model, not validated CFD or GMP-grade process validation.

## What is included

- Process templates for cultured meat, penicillin, monoclonal antibody, industrial fermentation, recombinant insulin, viral vaccine, plasmid DNA, autologous cell therapy, small-molecule API, biohydrogen dark-fermentation, industrial wastewater, water purification, and air pollution control
- Natural-language product brief that chooses the process model automatically, so users do not have to manually choose between template families
- Project workspace with multi-user backend accounts, per-user projects, active model files, archived old model versions, project restore, and invite-by-email/username collaboration records
- API connector registry for legacy process-simulator exports, Aspen, COMSOL, STAR-CCM+, OPC UA/SCADA, AVEVA PI/OSIsoft PI, Benchling, and generic LIMS/ELN handoff targets
- Data upload capture for project briefs, including file metadata and short previews for CSV, text, JSON, and other attached data
- Persistent help dock for natural-language troubleshooting inside the tool
- Twin OS workspace for clickable factory-to-cell-model navigation, live-data connector mapping, process-version comparison, SOP/literature attachment, and AI-assisted process variants
- Scale presets for lab, pilot, demo, and commercial designs
- Click-to-add and drag-and-drop unit-operation library with 120+ ISO/PFD-style pharmaceutical, biochemical, environmental, packaging, utilities, wastewater, water-purification, air-pollution, resource, report, recycling, heat-reuse, cleaning, and documentation items
- Granular process flowsheets with visible process-role badges for main process, support, CIP/SIP cleaning, recycle/reuse, heat reuse, waste/emissions, and QC/data elements
- Universal support-infrastructure layer for CIP/SIP, cleaning-agent and rinse-water supply, CIP return/neutralization, heat-transfer-agent reuse, condensate return, recycle/purge, water reuse, solvent recycle, material inventory, power demand/generation, and report sets
- Moveable PFD-style flowsheet nodes, visible input/output ports, animated stream arrows, stream tags, copy selected unit, clearer move/connect/inspect modes, canvas quick-add for valves, pumps, flowmeters, sensors, manifolds, and pressure relief elements
- Animated color-coded streams for main product flow, utilities, waste, QC/PAT/data paths, cleaning loops, heat-reuse loops, and recycle/purge loops
- In-flowsheet equation spotlight that changes with the selected unit or stream and links into the full equation library
- Interactive CFD workbench with a more technical bioreactor vessel section, liquid level, shaft, motor, baffles, DO/pH probes, dual impellers, axial/radial circulation loops, gas plume, sparger ring, feed zone, 12x12 oxygen/nutrient/shear screening map, hotspot counts, mixing time, tip speed, gas hold-up, OTR margin, dead-zone proxy, live telemetry, and suggested engineering edits
- gPROMS-style advanced modelling scaffold for equation-oriented plant models, parameter estimation, dynamic optimization, uncertainty/design-space analysis, soft sensors, online digital twins, utility optimization, and sustainability optimization
- Convective-dispersive/PVSD-style simulation algorithm panel with PDE boundary conditions, method-of-lines discretization, solver/validation loop, transport parameters, and downloadable handoff CSVs
- Finite-capacity campaign scheduler with editable active/skip flags, route branches, visual branch/merge topology, automatic route optimizer, predecessor dependencies, recipe timing, setup/process/CIP windows, parallel equipment pools, shared CIP/SIP skid constraints, equipment occupancy, hold-time warnings, QC release queue, bottleneck resources, route comparison, and downloadable recipe/schedule/resource/route/topology/optimizer CSV files
- Plant-simulation workbench with object-oriented factory hierarchy, equipment/stream/resource object records, reusable-state logic, material-flow/Sankey indicators, logistics buffers, value-stream timing, bottleneck detection, 3D-style factory layout preview, experiment manager, optimizer-ready scenario rows, neural-surrogate placeholders, and downloadable plant-layout SVG
- Concrete API/integration matrix for JSON, CSV/XLSX, CAD/JT layout import, MQTT, OPC UA/OPC Classic, ODBC/SQL/Oracle, REST/webhooks, Python SDK, optimizer handoff, and scheduling/MES bridge
- Professional process-simulation functions from the referenced thesis and process-modelling requirements: chemical/component register, stock mixtures, bulk/discrete streams, stream drawing and classification, procedures/operations, batch-vs-continuous mode, resource tracking, scheduling/Gantt concepts, feedback regulation, recycle loops, tear-stream convergence, breakpoints, throughput scale-up, debottlenecking, emissions, reports, databanks, and economic evaluation
- Major remaining manual areas represented as model modules: cleaning-agent stream classification, CIP/SIP auxiliary occupancy, material inventory/storage charts, heat-transfer-agent tracking, heat reuse, condensate return, solvent and water recycle with purge, power demand/generation, labor requirement tables, process explorer/overview navigator, stream summary tables, physical-state and density toolboxes, pre-simulation checks, partition/sequencing/back-propagation, error/status output, visual annotation objects, Excel/OLE exchange concepts, report sets, database import/export/access control, currency/consumable/material/site databanks, process-library search, and emission limit checks
- Biohydrogen-specific functions including potato-peel pre-treatment, enzymatic liquefaction/saccharification, rotary vacuum filtration, dark fermentation, anaerobic digestion, CO2 absorption/desorption, solvent recycle, osmotic inhibition, H2 inhibition, and CSTR washout checks
- Live batch volume, annual batch, titer, recovery, production, utilization, utility, and non-linear direct-cost estimates
- 56 biochemical, environmental, scheduling, resource, and economic parameters including viability, inoculation ratio, doubling time, mu max, peak cell density, glucose, glutamine, lactate, ammonia, pH, temperature, dissolved oxygen, kLa, OUR, agitation, aeration, feed rate, perfusion rate, step yields, sterile filter flux, bioburden limit, H2 productivity, osmotic inhibition, dissolved H2 inhibition, CSTR dilution, recycle fraction, CO2 absorption, BOD/COD removal, RO recovery, VOC removal, throughput target, bottleneck utilization, validation factor, CAPEX scale exponent, lab fixed burden, campaign learning rate, automation level, facility premium, annual operating time, setup/turnaround/holdup time, equipment uptime, resource slack, inventory days, zero-flow threshold, density safety factor, emission limits, working capital, taxes, discount rate, and depreciation life
- Non-linear scale-up economics with high lab-scale fixed burden, six-tenths-style CAPEX scaling, bulk purchasing effects, automation credits, campaign learning, parallel-train sizing, validation burden, and scale-efficiency reporting
- Editable unit and stream inspector
- Equipment and stream tables
- Searchable equation library with 230+ formulas for stoichiometry, kinetics, mass balances, energy balances, separations, cleaning, CIP/SIP, heat reuse, recycle/purge, aseptic filling, utilities, scheduling, resources, physical-state calculations, plant-simulation event states, Sankey/value-stream metrics, optimizer objectives, digital-twin residuals, emissions, cash flow, profitability, and economics
- Standards library covering EU GMP Annex 1/15, FDA 21 CFR, ICH Q-series guidance, ISO 14644, ISO 13408, ISO 10628, ASME BPE, ISA-88/95, GAMP 5, USP chapters, and ISO 15378
- Cost-driver economics view with annualized CAPEX, fixed facility burden, materials, labor, QA/QC validation, utilities, and waste cost shares
- CSV and SVG exports for process summaries, input/output streams, mass and energy balances, TEA-ready cost models, LCA inventories, LCA impact summaries, costs, equations, parameters, plant architecture, plant-simulation object libraries, experiment-manager scenarios, integration matrices, LCA flow maps, LCA impact bars, finite-capacity Gantt charts, 3D-style plant layout, and TEA cost-stack graphics

The backend has no runtime dependencies beyond Node.js.
