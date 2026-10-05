-- Run once in Supabase SQL Editor. Browser roles have no direct access.
create table public.flex_states (id uuid primary key, state jsonb not null, created_at timestamptz not null default now());
create table public.flex_logs (id bigint generated always as identity primary key, session_id uuid not null references public.flex_states(id) on delete cascade, event text not null, payload jsonb not null default '{}', created_at timestamptz not null default now());
create index flex_logs_session_time on public.flex_logs(session_id, created_at);
alter table public.flex_states enable row level security;
alter table public.flex_logs enable row level security;
revoke all on public.flex_states, public.flex_logs from anon, authenticated;
-- Service role operates only inside the server. Signed HttpOnly cookies isolate demo sessions.
