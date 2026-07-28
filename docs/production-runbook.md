# Axion Production Runbook

This runbook is for the real external setup. Keep secret values in provider
dashboards and backend-host secret managers only.

## 1. GitHub Write Access

Current local Git credentials are read/denied for this repository, so `git push`
returns 403. Fix one of these paths:

- Sign in locally with GitHub CLI, then push:

```bash
brew install gh
gh auth login
gh auth status
git push origin main
```

- Or create a fine-grained GitHub token with repository `Contents: Read and write`,
  store it in Keychain or your Git credential manager, then push.

- Or install/reconnect the GitHub app for this repository with contents write
  permission.

Codex can verify repository metadata through the GitHub connector, but the local
HTTPS credential and the connector ref-write permission are separate. Production
publishing needs one working write path: local `git push`, GitHub CLI, a
fine-grained token, or an installed app with contents write access.

## 1.5 Where Payment Approval Is Required

The codebase can prepare manifests, APIs, tests and readiness probes. Account
owners must approve paid or money-moving provider setup:

| Area | Payment or owner approval | Why |
| --- | --- | --- |
| OpenAI billing/quota | Yes | The command planner needs a billed Platform project or active credits. |
| Supabase/Postgres | Usually yes | Production persistence, storage and backups may require a paid plan. |
| Stripe live payments | Yes | Live payments, webhooks, payouts and tax/legal settings are account-owner actions. |
| Email sending | Usually yes | A verified sending domain and provider quota are required for invites. |
| Public host/domain | Yes | Backend hosting, DNS/domain purchase and TLS setup are provider-side. |
| CFD worker/cluster | Yes | Validated CFD requires real compute and often paid solver/cluster capacity. |
| Google OAuth | Owner action, usually no payment | A Google Cloud OAuth client and allowed domain must be created by the account owner. |

Do not share personal passwords or live secret values in chat. Store secrets only
in the backend host secret manager.

## 2. OpenAI Billing And Quota

The backend reads `OPENAI_API_KEY` and calls the Responses API for command
planning. The key must belong to a project with active billing/quota.

Provider-side action:

1. Open the OpenAI Platform billing page.
2. Add a payment method or credits to the organization/project.
3. Confirm the project that owns `OPENAI_API_KEY` has spend limit/quota.
4. Restart the backend.
5. Run `pnpm run doctor`.

No code change is needed after quota is active.

## 3. Supabase/Postgres

1. Create a Supabase project.
2. Run `supabase/schema.sql` in SQL Editor.
3. Put these on the backend host:

```bash
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_STATE_TABLE=axion_state
SUPABASE_DOCUMENTS_TABLE=axion_documents
SUPABASE_STORAGE_BUCKET=axion-model-data
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only.

## 4. Stripe Paywall

1. Create a Stripe product for Axion Process OS.
2. Create a recurring or annual price.
3. Put these on the backend host:

```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
APP_BASE_URL=https://your-domain
```

4. Add webhook endpoint:

```text
https://your-domain/api/stripe/webhook
```

Events:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

## 5. Google OAuth

Create a Web Application OAuth client and add:

```text
Authorized JavaScript origin: https://your-domain
```

Then set:

```bash
GOOGLE_CLIENT_ID=...
GOOGLE_ALLOWED_DOMAINS=your-company-domain.com
```

Use `GOOGLE_ALLOWED_EMAILS` for a strict invite-only allowlist.

## 6. Email Invites

Use Resend or SMTP.

Resend:

```bash
INVITE_EMAIL_FROM="Axion Process OS <invites@your-domain>"
RESEND_API_KEY=re_...
```

SMTP:

```bash
INVITE_EMAIL_FROM="Axion Process OS <invites@your-domain>"
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
```

## 7. Public Deployment

Recommended first production path:

1. Fix GitHub push.
2. Push `main`.
3. Create a Render Blueprint from `render.yaml`.
4. Add all `sync: false` secrets in Render.
5. Attach a custom domain such as `axion-engineering.com`.
6. Point DNS to Render.
7. Set `APP_BASE_URL=https://axion-engineering.com`.
8. Restart services.
9. Run:

```bash
curl https://axion-engineering.com/api/health
curl https://axion-engineering.com/api/production-readiness
npm run smoke:production
```

After admin login, use the provider probes:

```bash
curl -X POST https://axion-engineering.com/api/services/stripe/probe \
  -H "authorization: Bearer $TOKEN"
curl -X POST https://axion-engineering.com/api/services/supabase/probe \
  -H "authorization: Bearer $TOKEN"
curl -X POST https://axion-engineering.com/api/services/openai/probe \
  -H "authorization: Bearer $TOKEN"
curl -X POST https://axion-engineering.com/api/services/cfd/probe \
  -H "authorization: Bearer $TOKEN"
```

GitHub Pages can host a static marketing export, but it cannot run the secure
backend, paywall, OAuth verification, Supabase service-role access, email, or
CFD jobs.

## 8. CFD Worker

The app now has a separate CFD worker contract.

Local dry run:

```bash
docker compose -f docker-compose.production.yml up --build
```

Validated solver mode:

1. Build `Dockerfile.cfd-worker` with an OpenFOAM-capable base image.
2. Set `AXION_CFD_DRY_RUN=false`.
3. Keep `CFD_WORKER_TOKEN` secret.
4. Set the API backend:

```bash
CFD_WORKER_URL=https://your-cfd-worker
CFD_WORKER_TOKEN=...
```

Production CFD still requires validated geometry, mesh independence, solver
settings, residual criteria, experimental kLa/mixing-time validation, and a
review workflow before regulated engineering use.
