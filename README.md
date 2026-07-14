# Axion Process OS

A standalone high-density bioprocess flowsheet and process-intelligence studio inspired by professional process simulation tools.

## Open locally with backend

```bash
npm install
npm run backend
```

Then open `http://127.0.0.1:8899/index.html?v=frontpage-content`.

## Online static access

The app also includes a static hosted access mode for GitHub Pages or Sites deployments. If the backend API is not available, the login screen switches to password-only static mode and unlocks the same frontend workspace after the workspace password is entered. The Node backend remains the recommended mode for stronger production authentication.

## Product-first workflow

The front of the application now works like a company-grade product entry flow:

- Login opens a BeamAI-inspired Axion landing surface, not the payment screen
- The logo opens a public Axion front page with platform, workflow, ecosystem, and login sections
- Start page asks for a natural-language product and plant description
- Optional data files can be attached to the product brief
- Axion automatically maps the brief to the closest process model
- The detailed workspace then opens with flowsheets, equipment, balances, CFD, boundaries, economics, sources, recommendations, and downloads
- A persistent help field lets users describe a problem in words and receive direct tool steps

## Private workspace backend

Axion includes a small Node backend for private workspace access, product briefs, uploaded data previews, Google login configuration, and contextual tool help. Set these environment variables on the machine or hosting platform:

```bash
export AXION_ADMIN_USER="owner"
export AXION_ADMIN_PASSWORD="set-a-private-password"
export SESSION_SECRET="set-a-long-random-secret"
export GOOGLE_CLIENT_ID="your-google-oauth-client-id.apps.googleusercontent.com"
export GOOGLE_ALLOWED_EMAILS="you@example.com"
export GOOGLE_ALLOWED_DOMAINS=""
```

Google login uses Google Identity Services in the browser and verifies the returned ID token on the backend. It only renders as active when `GOOGLE_CLIENT_ID` is configured.

## Backend API

- `GET /api/product` lists product and backend configuration
- `POST /api/auth/login` logs in the owner workspace
- `GET /api/auth/google-config` tells the frontend whether Google login is configured
- `POST /api/auth/google` verifies a Google ID token and creates a server session
- `GET /api/account` verifies a server session
- `POST /api/project/brief` stores the natural-language product brief and uploaded data previews
- `POST /api/help` returns contextual tool guidance for the current process, scale, and selected unit

## What is included

- Process templates for cultured meat, penicillin, monoclonal antibody, industrial fermentation, recombinant insulin, viral vaccine, plasmid DNA, autologous cell therapy, small-molecule API, biohydrogen dark-fermentation, industrial wastewater, water purification, and air pollution control
- Natural-language product brief that chooses the process model automatically, so users do not have to manually choose between template families
- Data upload capture for project briefs, including file metadata and short previews for CSV, text, JSON, and other attached data
- Persistent help dock for natural-language troubleshooting inside the tool
- Twin OS workspace for clickable factory-to-cell-model navigation, live-data connector mapping, process-version comparison, SOP/literature attachment, and AI-assisted process variants
- Scale presets for lab, pilot, demo, and commercial designs
- Click-to-add and drag-and-drop unit-operation library with 120+ ISO/PFD-style pharmaceutical, biochemical, environmental, packaging, utilities, wastewater, water-purification, air-pollution, resource, report, recycling, heat-reuse, cleaning, and documentation items
- Granular process flowsheets with visible process-role badges for main process, support, CIP/SIP cleaning, recycle/reuse, heat reuse, waste/emissions, and QC/data elements
- Universal support-infrastructure layer for CIP/SIP, cleaning-agent and rinse-water supply, CIP return/neutralization, heat-transfer-agent reuse, condensate return, recycle/purge, water reuse, solvent recycle, material inventory, power demand/generation, and report sets
- Moveable flowsheet nodes, copy selected unit, clearer move/connect/inspect modes, canvas quick-add for valves, pumps, flowmeters, sensors, manifolds, and pressure relief elements
- Animated color-coded streams for main product flow, utilities, waste, QC/PAT/data paths, cleaning loops, heat-reuse loops, and recycle/purge loops
- In-flowsheet equation spotlight that changes with the selected unit or stream and links into the full equation library
- Interactive CFD workbench with visible bioreactor vessel, impellers, sparger, feed plume, oxygen/nutrient/shear maps, hotspot counts, and suggested engineering edits
- SuperPro-style simulation functions from the referenced thesis and v12 manual: chemical/component register, stock mixtures, bulk/discrete streams, stream drawing and classification, procedures/operations, batch-vs-continuous mode, resource tracking, scheduling/Gantt concepts, feedback regulation, recycle loops, tear-stream convergence, breakpoints, throughput scale-up, debottlenecking, emissions, reports, databanks, and economic evaluation
- Major remaining manual areas represented as model modules: cleaning-agent stream classification, CIP/SIP auxiliary occupancy, material inventory/storage charts, heat-transfer-agent tracking, heat reuse, condensate return, solvent and water recycle with purge, power demand/generation, labor requirement tables, process explorer/overview navigator, stream summary tables, physical-state and density toolboxes, pre-simulation checks, partition/sequencing/back-propagation, error/status output, visual annotation objects, Excel/OLE exchange concepts, report sets, database import/export/access control, currency/consumable/material/site databanks, process-library search, and emission limit checks
- Biohydrogen-specific functions including potato-peel pre-treatment, enzymatic liquefaction/saccharification, rotary vacuum filtration, dark fermentation, anaerobic digestion, CO2 absorption/desorption, solvent recycle, osmotic inhibition, H2 inhibition, and CSTR washout checks
- Live batch volume, annual batch, titer, recovery, production, utilization, utility, and non-linear direct-cost estimates
- 56 biochemical, environmental, scheduling, resource, and economic parameters including viability, inoculation ratio, doubling time, mu max, peak cell density, glucose, glutamine, lactate, ammonia, pH, temperature, dissolved oxygen, kLa, OUR, agitation, aeration, feed rate, perfusion rate, step yields, sterile filter flux, bioburden limit, H2 productivity, osmotic inhibition, dissolved H2 inhibition, CSTR dilution, recycle fraction, CO2 absorption, BOD/COD removal, RO recovery, VOC removal, throughput target, bottleneck utilization, validation factor, CAPEX scale exponent, lab fixed burden, campaign learning rate, automation level, facility premium, annual operating time, setup/turnaround/holdup time, equipment uptime, resource slack, inventory days, zero-flow threshold, density safety factor, emission limits, working capital, taxes, discount rate, and depreciation life
- Non-linear scale-up economics with high lab-scale fixed burden, six-tenths-style CAPEX scaling, bulk purchasing effects, automation credits, campaign learning, parallel-train sizing, validation burden, and scale-efficiency reporting
- Editable unit and stream inspector
- Equipment and stream tables
- Searchable equation library with 210 formulas for stoichiometry, kinetics, mass balances, energy balances, separations, cleaning, CIP/SIP, heat reuse, recycle/purge, aseptic filling, utilities, scheduling, resources, physical-state calculations, emissions, cash flow, profitability, and economics
- Standards library covering EU GMP Annex 1/15, FDA 21 CFR, ICH Q-series guidance, ISO 14644, ISO 13408, ISO 10628, ASME BPE, ISA-88/95, GAMP 5, USP chapters, and ISO 15378
- Cost-driver economics view with annualized CAPEX, fixed facility burden, materials, labor, QA/QC validation, utilities, and waste cost shares
- CSV exports for process summaries, streams, mass and energy balances, costs, equations, and parameters

The backend has no runtime dependencies beyond Node.js.
