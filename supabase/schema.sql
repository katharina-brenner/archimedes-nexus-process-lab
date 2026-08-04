-- Axion Process OS production-state table for the current backend adapter.
-- Run this once in Supabase SQL editor, then set SUPABASE_URL and
-- SUPABASE_SERVICE_ROLE_KEY in the deployed backend.

create table if not exists public.axion_state (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.axion_state enable row level security;

create table if not exists public.axion_documents (
  id text primary key,
  kind text not null check (kind in (
    'project_model',
    'project_version',
    'simulation_run',
    'dataset',
    'connector_run',
    'cfd_job',
    'command_plan'
  )),
  project_id text,
  version_id text,
  run_id text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists axion_documents_kind_project_idx
  on public.axion_documents (kind, project_id, updated_at desc);

create index if not exists axion_documents_run_idx
  on public.axion_documents (run_id)
  where run_id is not null;

create index if not exists axion_documents_version_idx
  on public.axion_documents (project_id, version_id)
  where version_id is not null;

create index if not exists axion_documents_updated_idx
  on public.axion_documents (updated_at desc);

alter table public.axion_documents enable row level security;

-- Normalized SaaS accounts. Engineering model documents stay in axion_state /
-- axion_documents, while commercial identity and access are queryable here.
create table if not exists public.axion_customers (
  id uuid primary key default gen_random_uuid(),
  customer_number text not null unique,
  legal_name text not null,
  display_name text not null,
  billing_email text not null,
  stripe_customer_id text unique,
  status text not null default 'active' check (status in ('lead', 'active', 'past_due', 'suspended', 'cancelled')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists axion_customers_billing_email_idx
  on public.axion_customers (lower(billing_email));

create table if not exists public.axion_contracts (
  id uuid primary key default gen_random_uuid(),
  contract_number text not null unique,
  customer_id uuid not null references public.axion_customers(id) on delete cascade,
  plan_id text not null check (plan_id in ('academic', 'professional', 'team', 'enterprise')),
  plan_name text not null,
  status text not null default 'draft' check (status in ('draft', 'trialing', 'active', 'past_due', 'suspended', 'cancelled', 'expired')),
  seat_limit integer not null default 1 check (seat_limit > 0),
  billing_interval text not null default 'month' check (billing_interval in ('month', 'year', 'one_time')),
  currency text not null default 'EUR',
  amount numeric(14,2) not null default 0 check (amount >= 0),
  stripe_subscription_id text unique,
  valid_from timestamptz,
  current_period_end timestamptz,
  cancelled_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists axion_contracts_customer_status_idx
  on public.axion_contracts (customer_id, status, updated_at desc);

create table if not exists public.axion_customer_users (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.axion_customers(id) on delete cascade,
  user_id text,
  email text not null,
  username text,
  role text not null default 'member' check (role in ('owner', 'admin', 'member', 'viewer')),
  status text not null default 'active' check (status in ('invited', 'active', 'suspended', 'removed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (customer_id, email)
);

create index if not exists axion_customer_users_lookup_idx
  on public.axion_customer_users (lower(email), status);

create table if not exists public.axion_plan_entitlements (
  plan_id text not null check (plan_id in ('academic', 'professional', 'team', 'enterprise')),
  feature_key text not null,
  feature_label text not null,
  enabled boolean not null default false,
  limit_value integer,
  configuration jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (plan_id, feature_key)
);

create table if not exists public.axion_entitlement_overrides (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.axion_customers(id) on delete cascade,
  contract_id uuid references public.axion_contracts(id) on delete cascade,
  feature_key text not null,
  enabled boolean,
  limit_value integer,
  reason text,
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (customer_id, contract_id, feature_key)
);

create table if not exists public.axion_subscription_events (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.axion_customers(id) on delete set null,
  contract_id uuid references public.axion_contracts(id) on delete set null,
  provider text not null default 'stripe',
  provider_event_id text unique,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.axion_access_grants (
  id uuid primary key default gen_random_uuid(),
  external_id text not null unique,
  grant_type text not null default 'founding_customer' check (grant_type in ('founding_customer', 'partner', 'internal')),
  slot_number integer check (slot_number between 1 and 5),
  email text not null unique,
  username text not null unique,
  display_name text not null,
  company text not null default '',
  plan_id text not null check (plan_id in ('academic', 'professional', 'team', 'enterprise')),
  status text not null default 'active' check (status in ('active', 'blocked', 'payment_required', 'converted')),
  customer_number text not null,
  contract_number text not null,
  converted_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists axion_access_grants_active_slot_idx
on public.axion_access_grants (slot_number)
where status <> 'converted';

create index if not exists axion_entitlement_overrides_contract_idx
  on public.axion_entitlement_overrides (contract_id)
  where contract_id is not null;

create index if not exists axion_subscription_events_customer_idx
  on public.axion_subscription_events (customer_id, created_at desc)
  where customer_id is not null;

create index if not exists axion_subscription_events_contract_idx
  on public.axion_subscription_events (contract_id, created_at desc)
  where contract_id is not null;

create or replace function public.axion_set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists axion_customers_updated_at on public.axion_customers;
create trigger axion_customers_updated_at before update on public.axion_customers
for each row execute function public.axion_set_updated_at();

drop trigger if exists axion_contracts_updated_at on public.axion_contracts;
create trigger axion_contracts_updated_at before update on public.axion_contracts
for each row execute function public.axion_set_updated_at();

drop trigger if exists axion_customer_users_updated_at on public.axion_customer_users;
create trigger axion_customer_users_updated_at before update on public.axion_customer_users
for each row execute function public.axion_set_updated_at();

drop trigger if exists axion_entitlement_overrides_updated_at on public.axion_entitlement_overrides;
create trigger axion_entitlement_overrides_updated_at before update on public.axion_entitlement_overrides
for each row execute function public.axion_set_updated_at();

drop trigger if exists axion_access_grants_updated_at on public.axion_access_grants;
create trigger axion_access_grants_updated_at before update on public.axion_access_grants
for each row execute function public.axion_set_updated_at();

insert into public.axion_plan_entitlements (plan_id, feature_key, feature_label, enabled, limit_value)
values
  ('academic', 'core_modeling', 'Flowsheet and equipment modelling', true, null),
  ('academic', 'mass_energy_balances', 'Mass and energy balances', true, null),
  ('academic', 'dynamic_simulation', 'ODE and PDE simulation', true, 25),
  ('academic', 'engineering_exports', 'Engineering exports', true, 25),
  ('academic', 'scheduling', 'Finite-capacity scheduling', false, null),
  ('academic', 'tea_lca', 'TEA and LCA', false, null),
  ('academic', 'cfd_screening', 'Bioreactor CFD screening', false, null),
  ('academic', 'company_data_ingestion', 'Company data ingestion', false, null),
  ('academic', 'branches_versions', 'Branches and model versions', false, null),
  ('academic', 'collaboration', 'Multi-user collaboration', false, 1),
  ('academic', 'api_connectors', 'API connector registry', false, null),
  ('academic', 'ai_command_engine', 'AI command engine', false, null),
  ('academic', 'cfd_worker_jobs', 'Validated CFD worker jobs', false, null),
  ('academic', 'automation_opcua', 'OPC UA and plant automation', false, null),
  ('academic', 'priority_support', 'Priority engineering support', false, null),
  ('professional', 'core_modeling', 'Flowsheet and equipment modelling', true, null),
  ('professional', 'mass_energy_balances', 'Mass and energy balances', true, null),
  ('professional', 'dynamic_simulation', 'ODE and PDE simulation', true, 250),
  ('professional', 'engineering_exports', 'Engineering exports', true, 250),
  ('professional', 'scheduling', 'Finite-capacity scheduling', true, null),
  ('professional', 'tea_lca', 'TEA and LCA', true, null),
  ('professional', 'cfd_screening', 'Bioreactor CFD screening', true, 50),
  ('professional', 'company_data_ingestion', 'Company data ingestion', true, 20),
  ('professional', 'branches_versions', 'Branches and model versions', true, 100),
  ('professional', 'collaboration', 'Multi-user collaboration', false, 1),
  ('professional', 'api_connectors', 'API connector registry', false, null),
  ('professional', 'ai_command_engine', 'AI command engine', true, 250),
  ('professional', 'cfd_worker_jobs', 'Validated CFD worker jobs', false, null),
  ('professional', 'automation_opcua', 'OPC UA and plant automation', false, null),
  ('professional', 'priority_support', 'Priority engineering support', false, null),
  ('team', 'core_modeling', 'Flowsheet and equipment modelling', true, null),
  ('team', 'mass_energy_balances', 'Mass and energy balances', true, null),
  ('team', 'dynamic_simulation', 'ODE and PDE simulation', true, 2000),
  ('team', 'engineering_exports', 'Engineering exports', true, 2000),
  ('team', 'scheduling', 'Finite-capacity scheduling', true, null),
  ('team', 'tea_lca', 'TEA and LCA', true, null),
  ('team', 'cfd_screening', 'Bioreactor CFD screening', true, 500),
  ('team', 'company_data_ingestion', 'Company data ingestion', true, 250),
  ('team', 'branches_versions', 'Branches and model versions', true, 1000),
  ('team', 'collaboration', 'Multi-user collaboration', true, 5),
  ('team', 'api_connectors', 'API connector registry', true, 25),
  ('team', 'ai_command_engine', 'AI command engine', true, 2500),
  ('team', 'cfd_worker_jobs', 'Validated CFD worker jobs', false, null),
  ('team', 'automation_opcua', 'OPC UA and plant automation', false, null),
  ('team', 'priority_support', 'Priority engineering support', true, null),
  ('enterprise', 'core_modeling', 'Flowsheet and equipment modelling', true, null),
  ('enterprise', 'mass_energy_balances', 'Mass and energy balances', true, null),
  ('enterprise', 'dynamic_simulation', 'ODE and PDE simulation', true, null),
  ('enterprise', 'engineering_exports', 'Engineering exports', true, null),
  ('enterprise', 'scheduling', 'Finite-capacity scheduling', true, null),
  ('enterprise', 'tea_lca', 'TEA and LCA', true, null),
  ('enterprise', 'cfd_screening', 'Bioreactor CFD screening', true, null),
  ('enterprise', 'company_data_ingestion', 'Company data ingestion', true, null),
  ('enterprise', 'branches_versions', 'Branches and model versions', true, null),
  ('enterprise', 'collaboration', 'Multi-user collaboration', true, 20),
  ('enterprise', 'api_connectors', 'API connector registry', true, null),
  ('enterprise', 'ai_command_engine', 'AI command engine', true, null),
  ('enterprise', 'cfd_worker_jobs', 'Validated CFD worker jobs', true, null),
  ('enterprise', 'automation_opcua', 'OPC UA and plant automation', true, null),
  ('enterprise', 'priority_support', 'Priority engineering support', true, null)
on conflict (plan_id, feature_key) do update
set feature_label = excluded.feature_label,
    enabled = excluded.enabled,
    limit_value = excluded.limit_value,
    updated_at = now();

alter table public.axion_customers enable row level security;
alter table public.axion_contracts enable row level security;
alter table public.axion_customer_users enable row level security;
alter table public.axion_plan_entitlements enable row level security;
alter table public.axion_entitlement_overrides enable row level security;
alter table public.axion_subscription_events enable row level security;
alter table public.axion_access_grants enable row level security;

drop policy if exists axion_backend_only on public.axion_state;
create policy axion_backend_only on public.axion_state for all to anon, authenticated using (false) with check (false);
drop policy if exists axion_backend_only on public.axion_documents;
create policy axion_backend_only on public.axion_documents for all to anon, authenticated using (false) with check (false);
drop policy if exists axion_backend_only on public.axion_customers;
create policy axion_backend_only on public.axion_customers for all to anon, authenticated using (false) with check (false);
drop policy if exists axion_backend_only on public.axion_contracts;
create policy axion_backend_only on public.axion_contracts for all to anon, authenticated using (false) with check (false);
drop policy if exists axion_backend_only on public.axion_customer_users;
create policy axion_backend_only on public.axion_customer_users for all to anon, authenticated using (false) with check (false);
drop policy if exists axion_backend_only on public.axion_plan_entitlements;
create policy axion_backend_only on public.axion_plan_entitlements for all to anon, authenticated using (false) with check (false);
drop policy if exists axion_backend_only on public.axion_entitlement_overrides;
create policy axion_backend_only on public.axion_entitlement_overrides for all to anon, authenticated using (false) with check (false);
drop policy if exists axion_backend_only on public.axion_subscription_events;
create policy axion_backend_only on public.axion_subscription_events for all to anon, authenticated using (false) with check (false);
drop policy if exists axion_backend_only on public.axion_access_grants;
create policy axion_backend_only on public.axion_access_grants for all to anon, authenticated using (false) with check (false);

-- The browser never receives these tables directly. All reads and writes pass
-- through the Node backend, which keeps the service-role secret server-side.
revoke all on table public.axion_state, public.axion_documents, public.axion_customers,
  public.axion_contracts, public.axion_customer_users, public.axion_plan_entitlements,
  public.axion_entitlement_overrides, public.axion_subscription_events from anon, authenticated;
revoke all on table public.axion_access_grants from anon, authenticated;
grant select, insert, update, delete on table public.axion_state, public.axion_documents,
  public.axion_customers, public.axion_contracts, public.axion_customer_users,
  public.axion_plan_entitlements, public.axion_entitlement_overrides,
  public.axion_subscription_events to service_role;
grant select, insert, update, delete on table public.axion_access_grants to service_role;

-- Some starter projects contain a helper RPC that can change RLS state. It is
-- not part of Axion and must never be callable through the public REST API.
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    execute 'revoke execute on function public.rls_auto_enable() from public, anon, authenticated';
  end if;
end
$$;

-- Optional storage bucket for larger customer uploads. The current backend
-- stores dataset metadata and parsed previews in Postgres; large raw files can
-- be moved here when a Supabase Storage upload pipeline is enabled.
insert into storage.buckets (id, name, public)
values ('axion-model-data', 'axion-model-data', false)
on conflict (id) do nothing;
