# HANDOFF — rectrixcaedere

> Public D&D roll-statistics dashboard + campaign archive (GitHub Pages + Supabase) at rectrixcaedere.com.
> Handoff is **enabled** for this repo. Every change updates the DO NEXT block below and prepends a log entry.


---

## Log
<!-- newest first · one entry per logical task/session · timestamp · source · changed · commit · next -->

# HANDOFF — rectrixcaedere

> Public D&D roll-statistics dashboard + campaign archive (GitHub Pages + Supabase) at rectrixcaedere.com.
> Handoff is **enabled** for this repo. Every change updates the DO NEXT block below and prepends a log entry.

## ▶ DO NEXT
Push `app.js` — the dashboard quote box now pulls a random quote from the active campaign's vault, live, on each load (all 4 campaigns).
- ~50KB → deploy via local Git + blob-SHA verify; do **not** commit any local `vendor/` test scaffolding
- Sandbox couldn't render-test (the React CDN is blocked there): after pushing, eyeball `dashboard.html?c=1` … `c=4` and confirm a quote + attribution shows and re-rolls on reload
- After that: build the live roll-stats pipeline (Phase 1) — spec is kept locally (`dashboard-live-spec.md`), not in this repo

---

## Log
<!-- newest first · one entry per logical task/session · timestamp · source · changed · commit · next -->

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
### 2026-06-23 09:21 ET · Claude chat
- **Changed:** Enabled repo handoff — added this `HANDOFF.md` at root.
- **Commit:** `docs: enable repo handoff`
- **Next:** Set by the next real change to the repo.
