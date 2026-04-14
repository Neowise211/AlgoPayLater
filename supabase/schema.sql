-- Algo Pay: Loan Investigator — Supabase schema
-- Run once against your Supabase project to initialise tables.

create extension if not exists "pgcrypto";

-- ─── Leaderboards ────────────────────────────────────────────────────────────

create table if not exists leaderboards (
  id             uuid primary key default gen_random_uuid(),
  initials       text        not null,
  difficulty     text        not null check (difficulty in ('easy','medium','hard','extreme')),
  case_id        text        not null,
  score          integer     not null,
  time_seconds   integer     not null,
  verdict_correct boolean    not null,
  created_at     timestamptz not null default now()
);

create index if not exists leaderboards_rank_idx
  on leaderboards (difficulty, score desc, time_seconds asc);

-- ─── Telemetry ───────────────────────────────────────────────────────────────

create table if not exists telemetry (
  id          uuid primary key default gen_random_uuid(),
  event       text        not null,
  payload     jsonb,
  created_at  timestamptz not null default now()
);
