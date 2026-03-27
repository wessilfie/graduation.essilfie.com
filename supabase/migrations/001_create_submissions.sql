-- Graduation address collection — submissions table
-- Run this in the Supabase SQL editor or via `supabase db push`

create table if not exists public.submissions (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  email       text        not null,
  digital_only boolean    not null default false,
  street      text,
  city        text,
  state       text,
  zip         text,
  country     text,
  created_at  timestamptz not null default now()
);

-- Enable row-level security
alter table public.submissions enable row level security;

-- Only the service-role key (used by the API route) can insert rows.
-- No public read access — submissions are private to Will.
create policy "service_role_insert"
  on public.submissions
  for insert
  to service_role
  with check (true);

-- Add a unique index on email so duplicate submissions are easy to detect
-- (not enforced at DB level to allow re-submission with address corrections)
create index if not exists submissions_email_idx on public.submissions (email);
