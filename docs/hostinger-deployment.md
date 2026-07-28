# Hostinger Deployment

Axion can use Hostinger for the public website and Node.js API while keeping
Postgres, payment, email, and CFD compute as separate services.

## hPanel Web App

Use these values when creating the Hostinger Node.js web app:

- Repository: `katharina-brenner/archimedes-nexus-process-lab`
- Branch: `main`
- Node.js: `22`
- Framework: `Other` or `Express.js`
- Package manager: `pnpm`
- Build command: `pnpm install --frozen-lockfile && pnpm run build`
- Start command: `pnpm run start:hostinger`
- Health endpoint: `/api/health`

The production server binds to `0.0.0.0` automatically and serves the optimized
`dist` build after the build command completes.

## Domain Layout

- `axionbioprocess.com`: public website
- `app.axionbioprocess.com`: authenticated application
- `api.axionbioprocess.com`: optional API hostname
- `compute.axionbioprocess.com`: optional CFD worker gateway

The first deployment can serve the website and app from the root domain. The
subdomains can be separated later without changing the product model.

## Required Environment Variables

Set these in hPanel. Never commit their values:

```text
NODE_ENV=production
APP_BASE_URL=https://axionbioprocess.com
SESSION_SECRET=<long-random-secret>
SUPABASE_URL=<project-url>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
SUPABASE_STATE_TABLE=axion_state
SUPABASE_DOCUMENTS_TABLE=axion_documents
STRIPE_SECRET_KEY=<live-or-test-secret>
STRIPE_PRICE_ID=<price-id>
STRIPE_WEBHOOK_SECRET=<webhook-secret>
GOOGLE_CLIENT_ID=<oauth-client-id>
GOOGLE_ALLOWED_DOMAINS=<allowed-company-domains>
INVITE_EMAIL_FROM=Axion <invites@axionbioprocess.com>
RESEND_API_KEY=<resend-key>
OPENAI_API_KEY=<project-key>
CFD_WORKER_URL=<separate-worker-url>
CFD_WORKER_TOKEN=<long-random-token>
AXION_REQUIRE_PRODUCTION_CONFIG=true
```

Start with Stripe test mode and a non-production Supabase project. Move to live
payments only after login, webhook, invitation, project isolation, and export
tests pass on the final HTTPS domain.

## Scaling Boundary

Hostinger should handle the frontend and normal API requests. Do not execute
OpenFOAM jobs inside the web process. Submit CFD jobs to a queue and run them on
separate Docker workers so a simulation cannot block login, payments, projects,
or exports.
