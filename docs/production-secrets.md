# Axion Production Secrets

Do not commit real values. Store them in the backend host secret manager.

## Required for production SaaS

| Secret | Where to get it | Used for |
| --- | --- | --- |
| `SESSION_SECRET` | Generate a long random string | Signs backend sessions |
| `APP_BASE_URL` | Your public HTTPS backend URL | Stripe redirects, invite URLs, OAuth origin |
| `AXION_ADMIN_PASSWORD` | Your private owner password | Owner/admin login |
| `SUPABASE_URL` | Supabase project settings | Production Postgres adapter |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase API settings | Server-only database access |
| `SUPABASE_STATE_TABLE` | Use `axion_state` unless renamed | Account, order, license, project and collaboration metadata |
| `SUPABASE_DOCUMENTS_TABLE` | Use `axion_documents` unless renamed | Active models, archived versions, simulation runs and CFD job payloads |
| `STRIPE_SECRET_KEY` | Stripe Developers/API keys | Creates Checkout sessions |
| `STRIPE_PRICE_ACADEMIC_ID` | Stripe monthly recurring price | Research subscription |
| `STRIPE_PRICE_PROFESSIONAL_ID` | Stripe monthly recurring price | Professional subscription |
| `STRIPE_PRICE_TEAM_ID` | Stripe monthly recurring price | Engineering Team subscription |
| `STRIPE_PRICE_ENTERPRISE_ID` | Stripe monthly recurring price | Enterprise Site subscription |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook endpoint signing secret | Verifies paid checkout events |

## Required for Google login

| Secret | Where to get it | Used for |
| --- | --- | --- |
| `GOOGLE_CLIENT_ID` | Google Cloud OAuth client | Browser Google Identity login |
| `GOOGLE_ALLOWED_EMAILS` | Manual comma-separated list | Optional user allowlist |
| `GOOGLE_ALLOWED_DOMAINS` | Manual comma-separated list | Optional company/university domain allowlist |

## Required for real invite emails

| Secret | Where to get it | Used for |
| --- | --- | --- |
| `INVITE_EMAIL_FROM` | Verified sender/domain | From address for collaboration invites |
| `RESEND_API_KEY` | Resend API key | Sends invite email |
| `SMTP_HOST` | SMTP provider | Alternative invite email transport |
| `SMTP_PORT` | SMTP provider | Alternative invite email transport |
| `SMTP_USER` | SMTP provider | Alternative invite email transport |
| `SMTP_PASSWORD` | SMTP provider | Alternative invite email transport |

Use either Resend or SMTP. Resend is simpler for a first SaaS deployment; SMTP is now supported when all SMTP variables are present.

## Optional search verification

| Secret | Where to get it | Used for |
| --- | --- | --- |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag verification | Adds the server-rendered Google verification meta tag |
| `BING_SITE_VERIFICATION` | Bing Webmaster Tools HTML meta verification | Adds the server-rendered Bing verification meta tag |

Both values stay in Hostinger environment variables. Do not commit verification tokens to the repository.

## Required for AI command changes

| Secret | Where to get it | Used for |
| --- | --- | --- |
| `OPENAI_API_KEY` | OpenAI Platform project | Cursor-style command planner |
| `OPENAI_MODEL` | OpenAI Platform model name | Model selection |

## Required for future rigorous CFD workers

| Secret | Where to get it | Used for |
| --- | --- | --- |
| `CFD_WORKER_URL` | Future OpenFOAM/BiRD worker service | Submits real 3D CFD jobs |
| `CFD_WORKER_TOKEN` | Worker secret/token | Authenticates CFD job submission |

Current backend CFD jobs are screening/handoff jobs. For validated CFD, attach a worker that builds a 3D mesh, writes OpenFOAM-compatible case files, runs multiphase/turbulence/MRF models, stores residuals and fields, and returns reviewed results.
