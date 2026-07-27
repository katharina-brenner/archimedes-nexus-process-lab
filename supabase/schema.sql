-- Axion Process OS production-state table for the current backend adapter.
-- Run this once in Supabase SQL editor, then set SUPABASE_URL and
-- SUPABASE_SERVICE_ROLE_KEY in the deployed backend.

create table if not exists public.axion_state (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.axion_state enable row level security;

-- The Node backend uses the Supabase service-role key server-side only.
-- No browser/client should ever receive the service-role key.
