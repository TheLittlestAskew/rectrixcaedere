-- Run this in the RECTRIX Supabase project's SQL editor
-- (project ref vtrtyagltwdrbastpppl — the one panel.js points at, NOT aftermath-atlas-dev)

create table if not exists public.session_notes (
  id bigint generated always as identity primary key,
  campaign_id integer not null,       -- adjust type if ddb_campaigns.id isn't integer
  session_label text,
  note_type text not null check (note_type in ('moment','npc','quote','quest','question','loot')),
  content text not null,
  who text,
  resolved boolean,
  timestamp_iso timestamptz not null,
  timestamp_unix bigint not null,
  created_at timestamptz not null default now()
);

create index if not exists session_notes_campaign_session_idx
  on public.session_notes (campaign_id, session_label, timestamp_unix);

-- ─── RLS check ──────────────────────────────────────────────────
-- I can't see this project from the chat I'm in (only aftermath-atlas-dev is
-- connected here), so I can't confirm how ddb_rolls/ddb_campaigns handle RLS.
-- Run this first:
--
--   select relname, relrowsecurity from pg_class
--   where relname in ('ddb_rolls', 'ddb_campaigns');
--
-- If those show relrowsecurity = true, session_notes needs the same policy
-- or panel.js's inserts/deletes will silently fail with a 401/403. If they
-- show false, leave session_notes as-is above — it'll behave the same way.

-- ─── Added: per-type fields ─────────────────────────────────────
-- title:        NPC name / Quest name / Loot item name
-- relationship: NPC only (Ally / Neutral / Hostile / Unknown)
-- quantity:     Loot only
alter table public.session_notes
  add column if not exists title text,
  add column if not exists relationship text,
  add column if not exists quantity integer;
