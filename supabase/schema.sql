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

-- The Node backend uses the Supabase service-role key server-side only.
-- No browser/client should ever receive the service-role key. RLS stays on;
-- the service role bypasses RLS while browser access remains blocked.

-- Optional storage bucket for larger customer uploads. The current backend
-- stores dataset metadata and parsed previews in Postgres; large raw files can
-- be moved here when a Supabase Storage upload pipeline is enabled.
insert into storage.buckets (id, name, public)
values ('axion-model-data', 'axion-model-data', false)
on conflict (id) do nothing;
