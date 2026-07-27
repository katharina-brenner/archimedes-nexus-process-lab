# Axion Production Setup

This is the secure path from local prototype to real SaaS.

## 0. Important security note

Never put personal passwords, Stripe secret keys, Supabase service-role keys or Google secrets into chat, GitHub, frontend code or `.env.example`.

Use provider dashboards and backend-host secret managers.

## 1. Supabase/Postgres

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy project URL into `SUPABASE_URL`.
5. Copy service-role key into `SUPABASE_SERVICE_ROLE_KEY`.
6. Set `SUPABASE_STATE_TABLE=axion_state`.
7. Set `SUPABASE_DOCUMENTS_TABLE=axion_documents`.

The current adapter stores account/order/project metadata in `axion_state` and active models, archived versions, simulation runs and CFD job payloads in `axion_documents`. This is production-persistent Postgres storage and can later be normalized into dedicated relational tables when the product needs row-level analytics, branch diffs and large-scale multi-user concurrency.

`SUPABASE_SERVICE_ROLE_KEY` must only exist on the backend host. Never expose it in the browser, GitHub Pages, screenshots, client code or public logs.

## 2. Stripe

1. Create a Stripe product: `Axion Process OS`.
2. Create an annual price, for example 2,400 EUR/year.
3. Copy the price id into `STRIPE_PRICE_ID`.
4. Copy the secret API key into `STRIPE_SECRET_KEY`.
5. Deploy the backend to a public HTTPS URL.
6. Set `APP_BASE_URL=https://your-domain`.
7. Create a Stripe webhook endpoint:

```text
https://your-domain/api/stripe/webhook
```

8. Subscribe to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

9. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## 3. Google OAuth

1. Open Google Cloud Console.
2. Create OAuth Client ID for Web Application.
3. Add authorized JavaScript origin:

```text
https://your-domain
```

4. Copy the client id into `GOOGLE_CLIENT_ID`.
5. Optional: restrict users with `GOOGLE_ALLOWED_EMAILS` or `GOOGLE_ALLOWED_DOMAINS`.

## 4. Invite Email

1. Create a Resend account.
2. Verify a sender domain, for example `your-domain`.
3. Create an API key.
4. Set:

```bash
INVITE_EMAIL_FROM="Axion Process OS <invites@your-domain>"
RESEND_API_KEY=re_...
```

Project invites to email addresses will then be sent automatically and recorded in the backend.

## 5. Deployment

Recommended fast path: Render Blueprint.

1. Push the repo to GitHub.
2. In Render, create a new Blueprint from this repository.
3. Render reads `render.yaml`.
4. Set every `sync: false` secret in the Render dashboard.
5. Open:

```text
https://your-render-url/api/health
```

6. Then open:

```text
https://your-render-url/api/production-readiness
```

7. Connect a custom domain in Render.
8. Point your DNS records to Render.
9. Update `APP_BASE_URL` to the custom domain.

For a real private SaaS, deploy the Node backend on Render/Fly/Railway/AWS and point the domain there. GitHub Pages can host the public static marketing build, but it cannot safely run Stripe webhooks, Google token checks, Supabase service-role access, invite email, or CFD worker submission by itself.

## 6. CFD Backend Jobs

Current Axion backend CFD jobs are screening/handoff jobs.

For rigorous external CFD:

1. Deploy an OpenFOAM/BiRD/COMSOL/STAR-CCM+ worker service.
2. Use `workers/cfd_worker.py` as the Axion worker contract or replace its solver section with your validated CFD stack.
3. The worker should expose:

```text
POST /jobs
Authorization: Bearer CFD_WORKER_TOKEN
```

4. Set:

```bash
CFD_WORKER_URL=https://your-cfd-worker
CFD_WORKER_TOKEN=...
```

Axion will submit CFD jobs to the worker and keep the screening result as fallback evidence.

Detailed worker notes are in `docs/cfd-worker.md`.

## 7. Tests and CI

Local:

```bash
npm run check
npm test
npm run build
npm run doctor
```

CI:

- `.github/workflows/ci.yml` runs syntax checks, backend API tests and build.
- `.github/workflows/pages.yml` deploys the static GitHub Pages build.

## 8. Workspace users

Production access should come from Google OAuth, paid licenses, admin-created accounts, or explicit environment-based seed users for a private deployment. Do not publish default usernames or passwords in the frontend.

## 9. GitHub deploy/auth checklist

1. Authenticate locally:

```bash
gh auth login
gh auth status
```

2. Commit and push:

```bash
git add .
git commit -m "Prepare Axion production backend"
git push origin main
```

3. In GitHub repository settings, enable Pages with GitHub Actions as the source.
4. Confirm the Pages workflow succeeds.
5. Use Render or another backend host for the real private app URL.

## 10. Production smoke checks

After deployment and secrets are set:

```bash
curl https://your-domain/api/health
curl https://your-domain/api/product
curl https://your-domain/api/production-readiness
```

Expected:

- `storage` should be `supabase-postgres-documents`
- `payments.stripeEnabled` should be `true`
- `auth.googleEnabled` should be `true`
- `inviteEmailConfigured` should be `true`
- production readiness should show Stripe, Google, email and deployment ready
