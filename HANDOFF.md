# HANDOFF — rectrixcaedere

> Public D&D roll-statistics dashboard + campaign archive (GitHub Pages + Supabase) at rectrixcaedere.com.
> Handoff is **enabled** for this repo. Every change updates the DO NEXT block below and prepends a log entry.

## ▶ DO NEXT
1. **SITL recordings S16–S19 not on the site:** the mp3s exist in the vault (`Session_Sources/Recordings/`: 052426 pt2, 060726, 061426, 070526) but were never uploaded to the R2 bucket (`recordings` bucket → `Recordings/sitl/`). Upload them, then add `rec:` fields to ARC entries 16–19 in `sky-is-the-limit/session.html`.
2. **S19 roll data not in Supabase:** the S19 archivist pass was denied Supabase access, so `ddb_sessions` registration and the `sitl_session_rolls` cross-reference for 2026-07-05 are both pending — the S19 reader page will show no roll log until that's done (vault pipeline task, not a site bug).

---

## Log
<!-- newest first · one entry per logical task/session · timestamp · source · changed · commit · next -->

### 2026-07-16 · Claude Code
- **Changed:** Wired SITL Session 19 "We Are Split in Two" (2026-07-05) into `sky-is-the-limit/session.html` (ARC entry, note fetched from sitl_vault main — URL verified 200) and `sky-is-the-limit/archive.html` (ARC card with 4 event beats + session count 18→19). No `rec:` field, matching S16–18 (recordings not yet on R2 — see DO NEXT). No new map waypoint; the party is still in Sloobludop (wp set at S18). Both ARC arrays syntax-validated (19 contiguous entries).
- **Commit:** `SITL: wire Session 19 (We Are Split in Two) into archive + session reader`
- **Next:** DO NEXT items 1–2 above (R2 recording uploads; S19 Supabase roll registration in the vault pipeline).

### 2026-06-29 · Claude chat
- **Changed:** All three session readers (WtFF, Ashfall, SITL): moved "Open threads"/"Quests & objectives" card into the center column directly below "Narrative summary"; made "Full roll log" section collapsible, default collapsed, with clickable header toggle and ▸/▾ caret. WtFF only: added "Scene / timeline" and "Themes & beats" cards in center column (wired to `renderScene`/`renderThemes`, hidden if section absent). Ashfall's collapsible log + quests position were already correct from a prior edit — only the column re-order was applied. pacts-and-power untouched.
- **Commit:** `session readers: move quests to center, collapsible roll log (SITL/WtFF/Ashfall); add Scene+Themes to WtFF`
- **Next:** Add Scene / Timeline Breakdown and Themes & Emotional Beats sections to WtFF vault notes for them to render.

### 2026-06-29 · Claude chat
- **Changed:** Wired WtFF Session 02 "Something's Changing" (2026-06-28) into the session reader (`ARC` array in `session.html`) and the archive map (`CONFIG.events[0].sessions` in `archive.html`, Rhusatatiam node). Prev/next nav, tags (⚑ Crossover, ● Roleplay), and popover link all wired. Session 00 intentionally excluded.
- **Commit:** `WtFF: wire Session 02 (Something's Changing) into session reader + map`
- **Next:** Add Session 03 the same way when notes are ready.

### 2026-06-25 ET · Claude chat
- **Changed:** `app.js` — replaced the single hardcoded `QuoteBoard` with a live, per-campaign random-quote loader. Added a `vault` field to each campaign in `D`; fetches `00-Campaign-Hub/Quote Board Master.md`, follows the `[[Quote Board …]]` batch-file links (SITL & Ashfall masters are stubs), parses three formats (bold-header, blockquote, P&P table), dedupes, and random-picks on mount + on campaign switch.
- **Commit:** `feat: live per-campaign random quotes on dashboard` (fill short-SHA on push)
- **Next:** eyeball all 4 campaigns, then build the live roll-stats pipeline (Phase 1).
- **Watch out:** parser validated against live vault data (SITL 299 / P&P 206 / Ashfall 112 / WTFF 19 quotes) but full browser render was not testable in-sandbox. `app.js` is ~50KB → local-Git deploy.

### 2026-06-25 ET · Claude chat
- **Changed:** `where-the-flowers-forget/archive.html` — reworked the campaign→map intro. The tarot card now flies to center **and** turns horizontal in one motion (cross-page view transition), flips to reveal the map (lands upright, un-mirrored), then enlarges and un-crops into the live map. Added `@view-transition` opt-in + `hero-card` resting state rotated 90°.
- **Commit:** `feat: rotating fly-in flip-to-map intro on WTFF archive` (fill short-SHA on push)
- **Next:** superseded by the live-quotes task above.
- **Watch out:** the combined fly+turn needs a Chromium browser; it degrades gracefully (no fly/turn, still flip→grow) elsewhere.

### 2026-06-23 09:21 ET · Claude chat
- **Changed:** Enabled repo handoff — added this `HANDOFF.md` at root.
- **Commit:** `docs: enable repo handoff`
- **Next:** Set by the next real change to the repo.
