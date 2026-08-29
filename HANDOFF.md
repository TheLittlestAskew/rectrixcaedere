# HANDOFF — rectrixcaedere

> Public D&D roll-statistics dashboard + campaign archive (GitHub Pages + Supabase) at rectrixcaedere.com.
> Handoff is **enabled** for this repo. Every change updates the Status/Next Steps below and prepends a log entry.

## Status

SITL Session 19 is wired into the site and its roll data is repaired end-to-end; S16–S19 recordings still need uploading to R2.

## Next Steps

- [ ] Upload SITL S16–19 recordings (`052426 pt2`, `060726`, `061426`, `070526` from `Session_Sources/Recordings/`) to the R2 `recordings` bucket → `Recordings/sitl/`
- [ ] Add `rec:` fields to ARC entries 16–19 in `sky-is-the-limit/session.html` once those recordings are uploaded

## Context

**DONE 2026-07-16 — S19 roll data repaired:** root cause was the extension's migration to Aftermath Meridian (nothing wrote to this project's `ddb_rolls` after 2026-06-14). All 82 missing SITL rolls backfilled (S19 = 56, checksum-verified), S19 registered in `ddb_sessions` (id 20), anon REST confirmed serving them. Recurring per-session copy runbook: `sitl_vault/Workflows/scripts/Sync-Rolls-To-RC.md`. Note: `sitl_session_rolls` is a VIEW over `ddb_rolls` (ET session dates).

---

## Log
<!-- newest first · one entry per logical task/session · timestamp · source · changed · commit · next -->

### 2026-08-29 17:45 ET · Codex
- **Changed:** Ashfall’s public dashboard now refreshes its roll totals, sessions, natural 20/1 counts, session chart, roll/action breakdowns, and character table from the approved public roll source plus the vault’s public session index. It paginates beyond 1,000 rows and shows unavailable values if either source fails.
- **Commit:** `f7def18`
- **Next:** Verify the deployed Ashfall dashboard reflects live roll analytics.
- **Watch out:** This deliberately exposes the approved analytics fields publicly; the raw session-note workflow remains gated by the vault index validator.

### 2026-08-29 17:38 ET · Codex
- **Changed:** Ashfall’s archive and session reader now load new validated sessions from the vault’s public session index. This removes the two per-session Rectrix registry edits and selects the correct tracker range for each session.
- **Commit:** `ae36d89`
- **Next:** Wire the Ashfall dashboard to its approved public data source.
- **Watch out:** The index is live only after the ashfall vault pushes `00-Campaign-Hub/Public Session Index.json`; legacy sessions 01–09 remain in the curated fallback registry.

### 2026-07-27 18:38 ET · Claude Code
- **Changed:** Investigated the "raw-URL sweep" and CORRECTED the prior overclaim. Only ONE more fixable instance existed — `where-the-flowers-forget/archive.html:123` tarot-face pointed at the site repo's own asset via raw URL (fixed to `/assets/img/`). The other 7 `raw.githubusercontent` references are **intentional cross-repo fetches to the campaign vault repos** (`sitl_vault`, `pacts_power_vault`, `ashfall_vault`, `wtff_vault`) — the site's data architecture, NOT the WTFF bug. Left them alone.
- **Commit:** `a9dc158`
- **Next:** `tokens.css` consolidation (AUDIT.md §5 step 1) — route every page through `tokens.css`, deleting the hand-rolled `:root` blocks. Root-cause fix that collapses most of the audit.
- **Watch out:** Do NOT convert the vault-repo raw URLs to local paths — those files live in separate repos, converting breaks them. If their raw.githubusercontent fragility ever needs solving, that's an architecture question (CDN/proxy/build-time bake), not a path swap. Weight decision recorded in AUDIT.md §0 + rc-brand skill.

### 2026-07-27 18:20 ET · Claude Code
- **Changed:** Fixed all 4 P0/P1 bugs from the site audit. P0: un-swapped the two case-study files (`case-studies/index.html` = listing, `.../are-the-dice-fair/index.html` = article; verified the full click-through). P1: deleted orphaned `pacts-and-power/session-v2.html` + fixed its `session.html` SELF fallback. P1: WTFF landing art moved from `raw.githubusercontent.com` to `/assets/img/` (9 files confirmed local). P1: Ashfall archive jump-scare gated to once-ever via localStorage (on top of existing reduced-motion guard). Recorded Taylor's ratified weight rule (Cinzel Decorative 700 display-only, 600 banned elsewhere) in `AUDIT.md §0`.
- **Commit:** `d53d637`
- **Next:** (1) NEW finding — 8 more pages use the same fragile `raw.githubusercontent` image URLs (session readers, archives, character), not just WTFF; offer a site-wide sweep. (2) Reflect the ratified weight rule in the `rc-brand` skill's "Three Weights Only" section (skill file location TBD). (3) Then AUDIT.md §5 fix-order: route every page through `tokens.css`, then the 600/700 weight sweep.
- **Watch out:** Weight decision is Option A (display-only 700). Dashboard sweep items 4-6 still pending under all this.

### 2026-07-27 17:52 ET · Claude Code
- **Changed:** Ran a REAL full-site design audit (all 19 HTML pages, not just the dashboard) after Taylor flagged the earlier "sweep" only looked at the dashboard deeply. Method: 4 parallel code-audit subagents (all pages read in full) + a rendered visual pass on every template type. Wrote consolidated scored findings to `.design/rc/AUDIT.md`.
- **Commit:** `79f135c`
- **Next:** DECISION NEEDED from Taylor — the font-weight-700 question (Cinzel Decorative only ships 400/700, conflicts with the 300/400/500 brand rule). Then fix-order in AUDIT.md §5, starting with routing every page through `tokens.css` (root cause of most findings). Also 4 real bugs to fix: P0 case-study files swapped (dead links); orphaned `pacts/session-v2.html` duplicate; WTFF landing's fragile raw.githubusercontent image URLs; Ashfall archive jump-scare.
- **Watch out:** Biggest systemic finding — NO page imports `tokens.css`; every page hand-rolls `:root` and values have drifted (`--muted` has 3 different values). Fixing that collapses most of the audit. Dashboard sweep items 4-6 (empty states, campaign stat row, deck/veil stagger) still pending underneath the audit.

### 2026-07-27 17:18 ET · Claude Code
- **Changed:** Taste-lens sweep continued. **Item 2:** Quick Access resource tiles rebuilt from 4 flat identical rounded rectangles into brand cathedral arch-top niche tiles (`--r-arch`), inner arched rule, gold halo ring behind each icon, hover lift; mobile now 2-col arch tiles (CSS-only, `dashboard.html`). **Item 3:** fixed the roll-activity chart x-axis (was 15 tiny 9px rotated low-contrast labels) to horizontal 11px lighter every-other ticks, session + quarterly both legible (`AreaC` in `app.js`).
- **Commit:** `628d032` (quick access) · `324a9f8` (chart axis)
- **Next:** Sweep item 4 — composed empty/loading states for the WTFF campaign (~20 rolls, 1 session; the analytics section currently just no-ops for stat-less campaigns). Then item 5 (campaign-page stat-row asymmetry), item 6 (deck/veil staggered fade-up).
- **Watch out:** Correction to prior entry — paper grain is NOT missing; `#grain` SVG overlay (opacity .035, blend overlay) already exists and is brand-compliant. Open brand delta still standing: `bolder` stat-card corners are SVG-drawn vs brand's `elements\*.png`.

### 2026-07-27 16:52 ET · Claude Code
- **Changed:** Whole-site "taste-lens" sweep (from `/design-taste-frontend-v1`, applied as brand-agnostic principles inside RC constraints, not the skill's literal light/sans aesthetic). **Item 1 of 6 done:** rebuilt Records & Reckonings from a 7-identical-clone tile grid into one editorial hero record (`The Workhorse`) + a divided ledger (asymmetric columns, hairline gold rules, right-aligned values, faint semantic tints on lucky/cursed). New `recVal` helper + rewritten `RecordsGrid` in `app.js`; replaced `.rec-grid`/`.rec-card` CSS with `.rec-wrap`/`.rec-hero`/`.rec-ledger`/`.rec-row` in `dashboard.html` (+ mobile stack).
- **Commit:** `028bea0`
- **Next:** Sweep items 2–6: (2) Quick Access → cathedral arch-top tiles, break 4-clone row; (3) add mandatory paper grain + fix chart axis legibility; (4) composed empty/loading states (WTFF); (5) campaign-page stat row asymmetry; (6) staggered fade-up on deck/veil.
- **Watch out:** Two open brand deltas — (a) `bolder` stat cards use SVG-drawn corners; brand guide says corner flourishes should be `elements\*.png` (not in repo). (b) Motion stays RC-restrained (`cubic-bezier(.4,0,.2,1)`, no spring/bounce/parallax), overriding the skill's spring mandate. Status/Next Steps blocks above are the separate R2-recordings work order, untouched.

### 2026-07-27 16:24 ET · Claude Code
- **Changed:** `$impeccable bolder` on the dashboard stat cards. Amplified the five KPI cards from "frameless" to on-brand oracle framing toward `mockup-target.png`: Art Nouveau double-line corner brackets on all four corners, a gold top accent line, warm-gold labels (fixes the low-contrast grey), and a faint per-card sigil (d20 / moon / star / laurel / key) so the identical clones differentiate. Nat 20 card uses the green `--success` accent. New `KCorner` + `KSigil` components in `app.js`; extended the `.kpi` CSS block in `dashboard.html`. Also banked untracked `supabase/` CLI scaffolding (`config.toml`) in a separate commit.
- **Commit:** `d674c49` (stat cards) · `4396193` (supabase scaffolding)
- **Next:** Roll the corner-flourish + accent framing to the Quick Access cards and the Records & Reckonings tiles (the next identical-clone rows), then push live and eyeball on rectrixcaedere.com.
- **Watch out:** Status / Next Steps blocks above are the standing R2-recordings work order (separate track), left untouched on purpose. Verified rendering clean via local server (`python -m http.server`), no console errors; not yet deployed to the live GitHub Pages site.

### 2026-07-26 11:44 ET · Claude Code
- **Changed:** Added the Handoff Contract to `AGENTS.md` so Codex follows it. Codex reads `AGENTS.md`, never `~/.claude/skills/`, so it had no handoff instructions at all before this.
- **Commit:** `3a02611`
- **Next:** Unchanged. See the block above this log.
- **Watch out:** Log entries must now carry a tool label (`Claude Code` / `Claude desktop` / `Codex` / `ChatGPT`). Do not restructure this file; the dashboard parses it.

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
