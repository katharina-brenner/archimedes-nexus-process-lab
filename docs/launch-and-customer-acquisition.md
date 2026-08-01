# Axion launch and customer-acquisition runbook

Updated: 2026-07-31

## Launch position

Axion is ready for controlled technical pilots, not yet for unassisted enterprise production use. The public application, private workspace, process modelling, versioning, exports, checkout integration, and production adapters exist. The deployed environment still needs provider credentials and persistent production services before paid self-service access is enabled.

Do not describe browser CFD screening as validated CFD. Do not claim customer outcomes until a customer has approved the wording. Use a representative, customer-owned process and agreed acceptance criteria for every pilot.

## Minimum production stack

| Service | Launch choice | Expected entry cost | Why |
| --- | --- | ---: | --- |
| Application host | Existing Hostinger Node plan | already paid | Keep the current deployment while early usage is modest. |
| Database and object storage | Supabase Pro | from USD 25/month | Persistent Postgres, storage, daily backups, and no inactivity pause. |
| Payments | Stripe Checkout + Billing | transaction based | Hosted payment entry, recurring subscriptions, invoices, and customer portal. |
| Transactional email | Resend Free initially | USD 0/month initially | Pilot notifications, invitations, and account messages with a verified domain. |
| Identity | Google Identity Services | no separate platform fee | Familiar sign-in on the production HTTPS origin. |
| Error and uptime monitoring | Sentry Developer | USD 0/month initially | Error monitoring, tracing, email alerts, and one uptime monitor. |
| Domain | Short process-specific `.com` or `.de` | registrar price | Credibility, stable OAuth origin, email domain, and search identity. |

Keep Supabase's spend cap enabled initially. Use Stripe standard pricing rather than a monthly Stripe package until payment volume justifies a negotiated plan. Upgrade Resend and Sentry only when usage exceeds their free limits.

## Environment values required on Hostinger

Generate and store these only in Hostinger's environment-variable manager. Never commit them.

```text
NODE_ENV=production
HOST=0.0.0.0
APP_BASE_URL=https://YOUR_DOMAIN
SESSION_SECRET=<at least 32 random bytes>
AXION_REQUIRE_PRODUCTION_CONFIG=true

SUPABASE_URL=<project URL>
SUPABASE_SERVICE_ROLE_KEY=<server-only service role key>
SUPABASE_STATE_TABLE=axion_state
SUPABASE_DOCUMENTS_TABLE=axion_documents
SUPABASE_STORAGE_BUCKET=axion-model-data

STRIPE_SECRET_KEY=<live secret key>
STRIPE_WEBHOOK_SECRET=<signing secret for /api/stripe/webhook>
STRIPE_PRICE_ACADEMIC_ID=<monthly recurring price>
STRIPE_PRICE_PROFESSIONAL_ID=<monthly recurring price>
STRIPE_PRICE_TEAM_ID=<monthly recurring price>
STRIPE_PRICE_ENTERPRISE_ID=<monthly recurring price>

GOOGLE_CLIENT_ID=<web application client ID>

INVITE_EMAIL_FROM=Axion Process OS <workspace@YOUR_DOMAIN>
SALES_NOTIFICATION_TO=<monitored sales inbox>
RESEND_API_KEY=<server-only API key>
```

Run `supabase/schema.sql` before enabling `AXION_REQUIRE_PRODUCTION_CONFIG=true`. Add the final HTTPS origin to the Google Web client. Configure the Stripe webhook for at least checkout completion, subscription lifecycle, paid invoices, and failed invoices. Enable the Stripe customer portal.

## Customer path

1. A visitor sees real plant photography and current application screenshots.
2. The visitor opens `/pilot` and describes one engineering decision.
3. Axion stores the lead with source and campaign attribution and emails the configured sales inbox.
4. A 30-minute qualification call establishes data ownership, process scope, decision, and acceptance criteria.
5. The pilot reconstructs or imports permitted customer data and delivers a model comparison plus an engineering gap map.
6. Only an approved customer statement becomes a public case study.
7. A suitable pilot converts to Professional, Engineering Team, or Enterprise Site access.

## First pilot acceptance criteria

- Reconcile total and component mass balances against an agreed reference.
- Explain every material residual and major energy duty.
- Show equipment occupancy, cleaning, holds, and the limiting production resource.
- Compare at least two process or operating scenarios.
- Quantify the leading TEA and LCA drivers with ranges and sensitivities.
- Identify missing kinetics, physical boundaries, source quality, and validation work.
- Export the model, flowsheet, workbook, tables, charts, and readiness record together.
- Demonstrate one branch, one reviewed change, and one before/after comparison.

## First 30 customer conversations

Start with technically accessible teams where one successful pilot can be completed quickly: university bioprocess groups, fermentation and alternative-protein startups, smaller CDMOs, and process-engineering consultancies. Lead with one concrete decision, not a replacement claim.

Use this outreach structure:

> We are evaluating Axion Process OS with a small number of process teams. It connects an editable flowsheet to balances, scheduling, scale-up boundaries, TEA/LCA, versioning, and detailed exports. We would like to test one company-owned process decision against agreed acceptance criteria. No proprietary simulator files are required.

Track source, organisation, process area, decision, current tools, response, call date, pilot status, evidence received, acceptance results, and next action. Do not scrape personal contact data or use private addresses.

## Release gate

Before enabling paid self-service access, all of the following must pass:

- `npm run check`
- `npm test`
- `npm run build`
- `npm run smoke:production`
- `/api/production-readiness` reports database, Stripe, Google, email, deployment, and session secret as ready
- A test-mode Stripe subscription activates access and opens the billing portal
- A production-domain Google login succeeds for an allowed test account
- A pilot request reaches the monitored inbox
- A project survives restart and redeployment
- Backup restore is tested
- Legal, privacy, cancellation, and VAT wording is reviewed by qualified counsel or tax advice
- Screenshots and public claims match the deployed product

## Later, not required for the first paid pilots

- Validated OpenFOAM worker cluster with mesh, residual, convergence, and experimental validation records
- SAML/SCIM, formal validation package, and enterprise security questionnaires
- OT-connected PLC/SCADA closed-loop control
- Point-in-time database recovery beyond daily backups
- High-availability multi-region deployment

## Current provider references

- Supabase pricing: https://supabase.com/pricing
- Stripe Germany pricing: https://stripe.com/en-de/pricing
- Stripe Checkout: https://stripe.com/en-de/payments/checkout
- Resend pricing: https://resend.com/pricing
- Google Identity client setup: https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
- Google Search Console: https://developers.google.com/search/docs/monitor-debug/search-console-start
- Sentry pricing: https://sentry.io/pricing/
- Hostinger domain search: https://www.hostinger.com/domain-name-search
