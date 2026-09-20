# DDB Roll Sync — Usage Guide

A Chrome extension that pulls your D&D Beyond dice roll history and upserts it into
the Supabase roll archive (`ddb_rolls`), across **all four campaigns at once**. It
lives here in Septentrion instead of inside any single campaign vault — one install
now covers Sky Is The Limit, Pacts & Power, Ashfall Brittania, and Where the Flowers
Forget.

It also captures **Marginalia** session notes (Moment / NPC / Quote / Quest /
Question / Loot) and **Character Snapshots** (mechanical stats pulled from D&D
Beyond's character-service), both written straight to Supabase.

The extension opens as a Chrome **side panel**, not a popup — click the toolbar icon
and it docks alongside the page instead of floating over it.

## Merge history

### 2026-07-20 — four divergent copies merged into one
Four divergent copies of this extension had accumulated, one per campaign vault, each
missing something the others had. This version merged them:

| Kept from | Feature |
|---|---|
| SITL/Ashfall copy (2026-05-22) | `enrichRoll()` auto-classification: skill/ability/spell/feat, nat20/nat1 detection |
| SITL/Ashfall copy (2026-05-22) | Auto token refresh via `background.js` tab injection (no manual re-scroll) |
| WTFF/Pacts&Power copy (2026-06-15) | Dedup-safe upsert with explicit `on_conflict` — fixes the 409/21000 errors the older copy could hit |
| WTFF/Pacts&Power copy (2026-06-15) | Correct current campaign config: WTFF has its real `gameId` (7853407) and `active` status now that it's launched |

The four old copies were moved to `Workflows/_archive/` in this same vault rather
than deleted outright — Claude's filesystem tool here can't hard-delete.

### (undated, between the merge and 2026-09-20) — side panel replaced the popup
`panel.html` + `panel.js` were built as a Chrome **side panel**, adding Marginalia
(session notes) and Character Snapshot on top of the Siphon roll-sync.
`manifest.json` was repointed at the side panel (`side_panel.default_path`,
`chrome.sidePanel.setPanelBehavior` in `background.js`) and the `action.default_popup`
key was dropped. **`popup.html`/`popup.js` were left in place but silently stopped
being the live UI** — Chrome had nothing pointing at them anymore, but nothing
archived them either, so they kept sitting in this folder looking current.
`background.js` also grew a second token listener for `character-service.dndbeyond.com`
(character sheets + character-id capture), feeding the new Snapshot feature.

### 2026-09-20 — reconciliation pass
Caught in a Claude chat session cross-checking this folder against what had been
pasted into an earlier conversation as "the current code" — it wasn't; it was two
different pre-side-panel snapshots.
- **Archived** `popup.html` + `popup.js` to
  `Workflows/_archive/ddb-roll-sync_pre-sidepanel-popup_2026-09-20/`. Dead code,
  unreferenced by `manifest.json`.
- **Re-ported `enrichRoll()` into `panel.js`.** It had quietly stopped running
  when the side panel took over — `panel.js`'s `normalizeMessage()` never called
  it, so every roll synced since the side-panel switch has null
  `action_category`/`skill`/`ability`/`spell`/`feat`/`is_nat_20`/`is_nat_1`.
  Going forward, new syncs are enriched again. **Existing null rows are not
  backfilled** — that's a separate one-off pass if it's ever wanted.
- **Fixed a bug the re-port would otherwise have reintroduced:** `enrichRoll()`
  emits a different subset of keys per roll type, and Postgres bulk-insert
  (PGRST102) requires every row in a batch to share the same key set. `panel.js`'s
  `upsertRolls()` now unions all keys across a batch and backfills missing ones
  with `null` before posting (this fix already existed in the archived `popup.js`;
  it just hadn't made it into `panel.js`).
- **Removed a live TEMP DIAGNOSTIC block** in `panel.js`'s `fetchDDBRolls()` that
  was logging the first roll message's context to console + the sync log on every
  page-1 fetch, marked "DELETE once the shape is confirmed" but never deleted.
  If you still need that answer (whether a DDB character id rides along with a
  roll message), it's gone from the code now — say so and it can go back in.
- **Still open, not fixed this pass:** `session_notes.sql` has an unresolved
  question written into itself — whether `ddb_rolls`/`ddb_campaigns` have RLS
  enabled, which decides whether `session_notes` needs a matching policy. The
  chat session doing this cleanup only had a connector for a different Supabase
  project and couldn't run the check. Run the query already sitting in
  `session_notes.sql` from the Supabase SQL editor to close this out.
- **Still not version-controlled.** This whole folder exists only on this
  machine, in `Septentrion` — a vault outside the tracked GitHub repo list.
  Nothing here has a backup.

---

## One-time install

The extension is unpacked (not from the Chrome Web Store), so you load it from disk.

1. Open Chrome and go to `chrome://extensions`.
2. Turn on **Developer mode** (top-right toggle).
3. Click **Load unpacked**.
4. Select the folder:
   `C:\Users\theli\Obsidian Vaults\Septentrion\Workflows\ddb-roll-sync`
5. The "DDB Roll Sync" 🎲 icon appears in the toolbar. Pin it (puzzle-piece menu →
   pin) so it's one click away.
6. Click the icon once — it opens the **side panel**, not a popup.

You only do this once. After that the extension stays loaded across browser
restarts, and it's the single copy for all four campaigns — no need to load it
separately per vault.

> If you ever edit the extension files, return to `chrome://extensions` and click the
> **reload** ↻ icon on the DDB Roll Sync card to pick up the changes.

**If you already had an older copy loaded** (from `sitl_vault`, `ashfall_vault`,
`wtff_vault`, or `pacts_power_vault`): remove that entry from `chrome://extensions`
first, then load this one instead, so you're not running two copies with the same
Supabase key.

---

## The Siphon — every-time roll sync

Do this after a session, once D&D Beyond has the rolls.

### 1. Capture a fresh token

1. Log into **dndbeyond.com**.
2. Open any campaign or character sheet and **scroll the dice / game-log panel** so
   the roll history loads. That network request is what hands the extension a
   valid token.
3. Open the 🎲 **DDB Roll Sync** side panel.
4. The status bar should read **✅ Token captured** and the **Sync All Campaigns**
   button becomes active.

If it still says **⏳ No token yet**, the browser hasn't made a game-log request.
Scroll the dice log again (or open a different character) and reopen the panel.

### 2. Sync

1. Click **⚡ Sync All Campaigns**.
2. Watch the log panel. For each active campaign it shows pages fetched, new rolls
   found, and an upsert count (`+N`), auto-enriched with skill/ability/spell/attack
   classification. Paused campaigns are skipped.
3. Wait for **🏁 Sync complete!**

The sync is incremental: it reads the newest `timestamp_unix` already in Supabase
for each campaign and only fetches rolls newer than that, so re-running is safe and
fast. Re-seeing an already-synced roll merges instead of duplicating (the upsert
targets the composite unique key `campaign_id, roll_id, roll_type, dice_notation`,
with client-side dedup first so Postgres never sees two updates to the same row in
one statement).

### What gets synced

Campaigns are hard-coded in `panel.js`:

| Campaign | Supabase `campaign_id` | DDB `gameId` | Status |
|---|---|---|---|
| Sky Is The Limit | 1 | 6907990 | active |
| Pacts & Power | 2 | 3661522 | active |
| Ashfall Brittania | 3 | 7170962 | active |
| Where the Flowers Forget | 4 | 7853407 | active |

Each synced roll row carries: character, action, roll type/kind, dice notation
(rebuilt as e.g. `2d20+10`), modifier, total, individual die values, plus
auto-enrichment fields (`action_category`, `roll_subtype`, `skill`, `ability`,
`spell`, `feat`, `weapon`, `is_nat_20`, `is_nat_1`, `dice_count`, `dice_type`,
`dice_raw_total`) where applicable.

Physical dice rolls (players who roll outside DDB) never appear here — that's
expected, not a bug; pull those from the transcript instead.

---

## Marginalia — session notes

A note-taking panel below the Siphon. Pick a campaign and (optionally) a session
label, pick a note type — Moment, NPC, Quote, Quest, Question, or Loot — and add
notes as the session happens. Quests and Questions track resolved/open; NPCs track
a relationship; Loot tracks quantity. The feed above the form shows notes for the
currently selected campaign + session, newest last, with a delete button on each.

Writes to a `session_notes` table in the same Supabase project as `ddb_rolls`
(`vtrtyagltwdrbastpppl`) — **run `session_notes.sql` once** in that project's SQL
editor before using this, or every add/delete fails with a Supabase error in the
log. That file also has an open question about whether `session_notes` needs an RLS
policy — see the 2026-09-20 entry above.

---

## Character Snapshot

Pulls a character's mechanical stats (ability scores, class, level, HP as raw
input only — never computed) from D&D Beyond's character-service and upserts one
row per character into `character_snapshots`. Ported from the same reducer logic
as the Aftermath Meridian Pump's `character-snapshot.js`.

1. Open a character sheet on D&D Beyond (this captures the character-service token
   *and* tags that character id to whichever campaign is currently selected in the
   Marginalia campaign dropdown — so pick the right campaign first).
2. In the side panel, pick that same campaign, then click **📸 Snapshot
   Characters**.
3. It snapshots every character id seen so far for the selected campaign, not
   just the one you last opened.

---

## Verifying a sync (optional)

After syncing, confirm the data landed via the Supabase MCP or `execute_sql`:

```sql
SELECT MAX(timestamp_iso) FROM ddb_rolls WHERE campaign_id = 1; -- Sky Is The Limit
```

Pull a specific session's rolls (Eastern-time cast required):

```sql
SELECT * FROM ddb_rolls
WHERE campaign_id = 1
AND DATE(timestamp_iso AT TIME ZONE 'America/New_York') = 'YYYY-MM-DD';
```

If a session looks short, sync again before assuming rolls are missing — DDB's log
can lag by a few hours, and physical/off-DDB dice never appear here at all.

---

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| **⏳ No token yet** | No game-log request has happened. Open a DDB character and scroll the dice log, then reopen the panel. |
| Token shows but **DDB API error: 403** | Token expired or it's the wrong (website SSO) token. Re-scroll the dice log to re-capture, then sync again. |
| **Supabase ... 401 / 403** | The anon key in `panel.js` was rotated. Update `SUPABASE_KEY` (in both `panel.js` and, if still used, `background.js` context). |
| Campaign says **no gameId** | Shouldn't happen with current config — all four campaigns have real gameIds now. If it does, a campaign's `gameId` was reset to 0; check `panel.js`. |
| Marginalia note add/delete fails with a Supabase error | `session_notes.sql` hasn't been run yet in the Supabase SQL editor. |
| Character Snapshot says "no characters seen yet" | Open that character's D&D Beyond sheet with the right campaign selected in the panel first — snapshot only works on characters the extension has already tagged. |
| Edited the code, nothing changed | Reload the extension on `chrome://extensions`. |
| Two copies both loaded, weird duplicate behavior | Remove any leftover per-vault copy from `chrome://extensions` — this Septentrion copy is the only one that should be loaded. |

---

## How the token capture works (background)

The main dndbeyond.com site issues a website/SSO token (`aud=dndbeyond.com`) that the
game-log API gateway **rejects** with a 403. The game-log service uses a different,
service-scoped token. So `background.js` listens on `game-log-rest-live.dndbeyond.com`
(rolls) and separately on `character-service.dndbeyond.com` (character sheets, for
Snapshot) and stores the Bearer token from each — tokens DDB itself just used
successfully. That's why "scroll the dice log" / "open a character sheet" are the
capture steps: they force the browser to make exactly those requests.

---

## Files

| File | Role |
|---|---|
| `manifest.json` | MV3 manifest, permissions, host access for DDB + Supabase, side-panel config. |
| `background.js` | Service worker: captures both the game-log and character-service Bearer tokens, tags character ids to the active campaign. |
| `panel.html` | The side panel UI (live — this is what actually opens). |
| `panel.js` | Sync logic: campaign config, auto-enrichment, DDB fetch/paginate, dedup, Supabase upsert, Marginalia, Character Snapshot. |
| `session_notes.sql` | Run once in the Supabase SQL editor to create the `session_notes` table Marginalia writes to. Has an open RLS question — see above. |
| `icon.png` | Toolbar icon. |
| `files.zip` | Unreviewed as of 2026-09-20 — check before relying on anything in it. |
