# HANDOFF — rectrixcaedere

> Public D&D roll-statistics dashboard + campaign archive (GitHub Pages + Supabase) at rectrixcaedere.com.
> Handoff is **enabled** for this repo. Every change updates the Status/Next Steps below and prepends a log entry.

## Status

✅ **The SITL dashboard and landing page are live (`330a8bb`).** `dashboard.html?c=1` was fully hardcoded at **946 rolls / 15 sessions / "last session May 2 2026"**; it now reads **1,330 rolls / 22 sessions** from Supabase plus the vault index, matching `archive.html` exactly. `sky-is-the-limit/index.html` was equally static and now refreshes too. ⭐ **Also fixed Ashfall: `dashboard.html?c=3` was reporting SESSIONS LOGGED: 2** because it read the count from the index's curated `sessions` array (S10+ only); it now reads **12**.

✅ **The SITL session pages were rebuilt story-first on 2026-08-30 (`46fb570`).** Three parser defects were leaking raw markdown into every page (literal `**` bold markers, raw `[[wikilinks]]`, a blank party roster); all fixed and verified at zero leaks on S22 and S20. The three-column masonry is replaced by a sticky jump nav, an untruncated story tier and a reflowing reference grid. 📌 **`session.html` stores unicode as literal backslash-u escape text and breaks `position:sticky` if `.wrap` keeps a transform — read the 2026-08-30 log entry before editing it.**

**SITL sessions now publish themselves.** `sky-is-the-limit/session.html` and `archive.html` fetch `00-Campaign-Hub/Public Session Index.json` from `sitl_vault` and merge it into their `ARC` arrays, so S20, S21 and S22 are live and a future session needs no edit in this repo. Entries S01–S19 keep their curated editorial hardcoded here; the index only refreshes and extends from S20 on. S16–S19 recordings still need uploading to R2.

## Next Steps

- [ ] 🔴 **Do NOT enable `sessionRollsOnly` for Ashfall until its dates are fixed** — see the log entry. Two problems in `ashfall_vault`: its index dates are **off by one day** from its roll dates for S01/S02/S04, and **~400 rolls exist on dates after S11** that the vault has no session record for. Filtering would silently drop **1,037 real rolls**.
- [ ] 🔵 **The other three campaign landing pages are still fully hardcoded** — `ashfall-britannia`, `pacts-and-power` and `where-the-flowers-forget` `index.html` all carry static session/roll counts. Same fix as `sky-is-the-limit/index.html` if wanted.
- [ ] Upload SITL S16–19 recordings (`052426 pt2`, `060726`, `061426`, `070526` from `Session_Sources/Recordings/`) to the R2 `recordings` bucket → `Recordings/sitl/`
- [ ] Add `rec:` fields to ARC entries 16–19 in `sky-is-the-limit/session.html` once those recordings are uploaded

## Context

**DONE 2026-07-16 — S19 roll data repaired:** root cause was the extension's migration to Aftermath Meridian (nothing wrote to this project's `ddb_rolls` after 2026-06-14). All 82 missing SITL rolls backfilled (S19 = 56, checksum-verified), S19 registered in `ddb_sessions` (id 20), anon REST confirmed serving them. Recurring per-session copy runbook: `sitl_vault/Workflows/scripts/Sync-Rolls-To-RC.md`. Note: `sitl_session_rolls` is a VIEW over `ddb_rolls` (ET session dates).

---

## Log
<!-- newest first · one entry per logical task/session · timestamp · source · changed · commit · next -->

### 2026-09-02 22:20 ET · Claude Code (TOOLS.md tool inventory added)
- **Changed:** Added `TOOLS.md` (15 active rows) — the pinned React 18.2 / Recharts 2.12.7 / prop-types CDN stack, Supabase `Rectrix_Caedere` + the `supabase-cutter` MCP server, the two hash-pinned skills from `skills-lock.json`, and the rest. `AGENTS.md` gained a `### TOOLS.md` subsection so Codex maintains it too. One of 13 project tables that `septentrion-sync` v4 rolls into the vault's new `The Toolbox.md`.
- **Commit:** `ea0a317`
- **Next:** Unchanged. See the block above this log.
- **Watch out:** The version pins in `TOOLS.md` restate the hard constraints from `CLAUDE.md` — Recharts must stay 2.12.7 (3.x breaks React 18 UMD), and script order is React → ReactDOM → prop-types → Recharts. If those ever change, the tool table has to change with them or it becomes a second, lying source of truth.

### 2026-08-31 11:20 ET · Claude Code (WTFF map now reads the vault index)
- **Changed:** `where-the-flowers-forget/archive.html` no longer hardcodes the Map of Artemesia. It fetches the `map` block of `wtff_vault`'s `Public Session Index.json` — locations, blooms, travel line and the "party is here" pin — so a new WTFF session note publishes itself to the map with no edit in this repo. The render code is wrapped in `renderMap()` and driven by `loadMap().then(renderMap)`.
- **Commit:** `0f69051` (vault side: `wtff_vault@2bd2674`)
- **Verification:** ✓ Headless render test drove the real script and produced **identical output from the live index and from the frozen fallback** — 1 pin, 2 blooms, 1 travel polyline, 3 session links, exactly matching the hardcoded version. ✓ Script parses standalone. ✓ Confirmed the WTFF index is live on `raw.githubusercontent.com` with the expected party/path/blooms.
- **Friction:** gen-fail — my first edit replaced only the opening line of the multi-line `budFlower` SVG string literal and left its continuation lines orphaned, which would have been a syntax error on a live page. Caught by parse-checking the script block rather than by eye. ✅ **What works: after editing inline `<script>` in an HTML file, extract the block and `new Function(body)` it as a parse check before committing.**
- **Watch out:** ⚠️ The old hardcoded CONFIG survives as **`FALLBACK`** and is used **only** when the fetch fails. It is deliberately allowed to go stale. **Editing it does not publish anything** — the live index replaces it on the next successful load. ⚠️ `runReveal()` (the cross-page card-flip intro) is untouched and still independent of the map data; it only fades `markers` in, so a slow fetch delays the blooms, not the animation.
- **Next:** Unchanged. See the DO NEXT block above.

### 2026-08-30 17:10 ET · Claude Code (SITL session pages: parser repairs + story-first layout)
- **Changed:** Rebuilt `sky-is-the-limit/session.html` around how the table actually reads it. **Three parser defects fixed first**, because no layout looks right while markdown leaks: (1) `^key:\s*(.*)$` let `\s*` swallow the newline so **every YAML block list matched with an empty capture** — `party_present` and `site_events` both rendered blank; (2) table cells used `zesc()`, which escapes entities but leaves markdown, so `**Dead**` and `[[Nanny Plunk]]` printed as literal asterisks and brackets across NPCs, Loot, Locations, Quotes and Quests — added `zinl()` (strip wikilinks → escape → promote bold/italic/code, in that order, so no injection path opens); (3) profanity speakers never had wikilinks stripped. **Then the layout:** the three independent `.pp-col` stacks are gone, replaced by a sticky jump nav, a single-column story tier at a 740px measure, and a reference tier on an auto-fit grid that reflows into rows. **Nothing in the story tier is truncated any more** — journal, narrative, scene list and themes all render inline, and the three fade-to-modal patterns are gone. Quote board went from 4-of-95 to all of them. Profanity demoted out of the top-left slot.
- **Commits:** `f78dbc8` (parser) · `5207c8b` (paren repair) · `7540063` (layout) · `bce3876` (sticky fix) · `46fb570` (scroll panels)
- **Housekeeping:** trimmed the log to 15 and archived the oldest entry. It was first filed into a new `handoff-archive/2026-07.md`, which was wrong — the entry is dated **2026-06-25**, so it was moved into the existing `2026-06.md` and the stray July file deleted (`8d5cdc5`). The archive marker at the foot of this file stays accurate.
- **Verification:** ✓ Live on S22 **and** S20: **0 leaked bold markers, 0 leaked wikilinks**, no empty panels. ✓ 6 party chips (was 1 malformed), 17 NPCs, 20 quests, 68 roll rows, all 6 jump links resolve. ✓ Reference grid reflows to 3 even 388px columns. ✓ Contrast **6.24:1** body / **14.61:1** quotes against the ink ground, both over 4.5:1. ✓ `prefers-reduced-motion` disables the entrance animation.
- **Friction:** `gen-fail` — the `zesc`→`zinl` swap left an **unbalanced paren**, which is a parse error for the whole inline script, so the page hung on "Loading…" until I read the console. Worked once `node --check` on the extracted `<script>` block became part of the loop. 📌 **Never push an edit to this file without extracting the script and running `node --check` first.**
- **Friction:** `gen-fail` — repeated failed string replacements because **this file stores unicode as literal backslash-u escape text** (`“`, `’`, `·`), not as characters, so pasting the real glyph never matches. Worked by targeting the line and swapping the function name instead. 📌 **Match on ASCII-only substrings in `session.html`, or operate line-wise.**
- **Friction:** `misread` — I reported "Quests renders empty" in the audit. It was **collapsed by default**, not broken. Corrected before any code changed; the section is now open and always rendered.
- **Next:** Backdating S01–S19 needs the parser made tolerant of the older heading shapes (S13 at H2, S17 with no `Related`, "Locations" vs "Locations Visited") — the layout itself is already shape-agnostic.
- **Watch out:** ⚠️ **`position:sticky` breaks under `.wrap`** because its entrance animation leaves a `transform`, which makes it the containing block. The transform is now cleared on `animationend` with a 1.4s timeout fallback; **do not re-add a persistent transform to `.wrap`**. ⚠️ **Screenshots of this page are unreliable** — the capture scales differently from the real viewport (`innerWidth` reported 2071 against a 1554px capture), which made a working sticky nav look broken. Verify layout with `getBoundingClientRect` and `elementFromPoint`, not screenshots. ⚠️ The reference tier still lets one long list set its grid row height; NPCs/Loot/Quotes/Profanity are capped at 430px with internal scroll as the mitigation, not a true masonry.

### 2026-08-30 12:20 ET · Claude Code (dashboards go live)
- **Changed:** Generalised Codex's Ashfall-only live-analytics block into a per-campaign config (`RC_LIVE`) covering **both** SITL and Ashfall, and made `sky-is-the-limit/index.html` refresh its hero stats and per-PC roll counts from the same sources. Session count / date range / per-session chart now come from the vault index's new **`all_sessions`** array (every session, number+date only), falling back to the curated `sessions` list for older indexes. Each campaign catches its own failure, so one outage cannot blank the other.
- **Commit:** `330a8bb` (vault side: `sitl_vault@15b1b67`, `ashfall_vault@7c2c99c`)
- **Verification:** ✓ Confirmed on the **live domain**, not just locally. SITL **1,330 rolls / 22 sessions / 51 nat20 / 47 nat1**, and its chart now sums to its own headline. Ashfall **1,681 rolls / 12 sessions** (was 2), totals unchanged.
- **Watch out:** 🛑 **`sessionRollsOnly` is ON for SITL and deliberately OFF for Ashfall.** For SITL, **90 rolls sit on 17 dates that are not sessions — 52 of them *before the campaign started*** (Aug–Oct 2025 character building), plus clusters on 2026-07-15/16/18. Excluding them is what makes the dashboard agree with `archive.html` at 1,330. 🔴 **Turning the same flag on for Ashfall would have deleted 1,037 real rolls**, because of two genuine problems in `ashfall_vault`: **(1)** its index dates are **off by one day** from its roll dates for S01, S02 and S04 (index 2026-02-13, rolls 2026-02-12) — the generator reads the Campaign Dashboard while the site's own ARC uses the roll dates; **(2)** **~400 rolls exist on 2026-08-03, 08-17 and 08-27, all after S11 (Jun 22)** — sessions appear to have been played that the vault has no record of. ⚠️ **The index fetch had no cache-buster**, unlike `session.html`/`archive.html`; without it the browser served a stale index and the fix looked broken. Added. ⚠️ SITL's character table now lists **9 names** because the archive contains DM-side rolls — *Black Pudding*, *Gelatinous Cube* and *Kirk* (Addison's own handle), 1–2 rolls each, sorted to the bottom. Left as truthful data; the headline "Characters" stat is a separate hardcoded 6.
- **Next:** Unchanged — see the Next Steps block above.

### 2026-08-29 18:20 ET · Claude Code (SITL sessions load from the vault index)
- **Changed:** S20, S21 and S22 had been invisible on the site since 2026-07-19 because `sky-is-the-limit/session.html` and `archive.html` both held hardcoded `ARC` arrays stopping at S19. Both now fetch `Public Session Index.json` from `sitl_vault` and merge it into `ARC`, the same `loadRegistry()` shape already running on `ashfall-britannia`. Entries before S20 keep their curated editorial here. `archive.html`'s hand-edited "19 Sessions" and "Sloobludop / Deepest Reach" stats now derive from the registry. If the index is unreachable both pages fall back to the hardcoded array, so this degrades to the old behaviour rather than to a blank page.
- **Commit:** `5d2be07` (vault side: `sitl_vault@bbea7a7`)
- **Verification:** ✓ Checked against a local server with the index live on raw.githubusercontent rather than assumed. 22 cards render, the jump rail runs 01–22, `session.html?n=22` renders the full note with prev-nav to S21, all of S19–S22 fetch HTTP 200, and nothing prints "undefined".
- **Next:** Unchanged — see the Next Steps block above.
- **Watch out:** 🛑 **Fixed a pre-existing bug in `archive.html`'s `tallies()` that publishing S20–S22 made visible.** It requested `&limit=5000`, but **PostgREST caps a response at 1000 rows** and `sitl_session_rolls` now holds **1,420**. The page only ever saw the oldest 1000 rolls, so **every session from S18 on displayed "no rolls synced"** and the header totals were computed from a truncated set. Paginated with `Range`; totals went **948 → 1,330 rolls, 37 → 51 nat 20s, 40 → 47 nat 1s**. ⭐ This is the same cap the 17:45 Codex entry hit on the Ashfall dashboard — two independent finds on the same day. ⚠️ **`pacts-and-power/archive.html` still has the identical `&limit=6000` pattern and was not audited.** Check it and `dashboard.html` before trusting either one's totals. ⚠️ `where-the-flowers-forget` and the other campaigns still use hardcoded `ARC` only; the vault-index pattern is now live on `ashfall-britannia` and `sky-is-the-limit`.

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

> Older entries archived to handoff-archive/2026-08.md
