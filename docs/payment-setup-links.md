# Axion Payment And Provider Setup Links

Use these official dashboards for the production setup. Do not paste card data,
bank details, passwords, API keys or service-role keys into chat or frontend
code.

## OpenAI API Billing

- Payment methods: https://platform.openai.com/settings/organization/billing/payment-methods
- Billing overview: https://platform.openai.com/settings/organization/billing/overview

Action: add a payment method or credits, then confirm the project that owns
`OPENAI_API_KEY` has active quota and a sensible spend limit.

## Supabase/Postgres

- Billing: https://supabase.com/dashboard/org/_/billing
- Dashboard: https://supabase.com/dashboard

Action: create or choose the organization/project, upgrade if needed, run
`supabase/schema.sql`, then store `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` in the backend host secret manager.

## Render Backend Hosting

- Billing: https://dashboard.render.com/billing
- Blueprint deploy: https://dashboard.render.com/select-repo?type=blueprint

Action: connect the GitHub repository, deploy `render.yaml`, add all production
secrets, attach a custom domain, then set `APP_BASE_URL` to the public HTTPS URL.

## Stripe Paywall

- Account activation: https://dashboard.stripe.com/account/onboarding
- Products/prices: https://dashboard.stripe.com/products
- Webhooks: https://dashboard.stripe.com/webhooks

Action: activate the account, create the Axion annual product/price, set
`STRIPE_PRICE_ID`, `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`, and add this
webhook after the backend is deployed:

```text
https://your-domain/api/stripe/webhook
```

Events:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

## Resend Invite Email

- Billing: https://resend.com/settings/billing
- Domains: https://resend.com/domains

Action: add billing if needed, verify the sending domain, then store
`RESEND_API_KEY` and `INVITE_EMAIL_FROM` in the backend host secret manager.

## After Setup

Run:

```bash
pnpm run doctor
```

After deployment:

```bash
npm run smoke:production
```
