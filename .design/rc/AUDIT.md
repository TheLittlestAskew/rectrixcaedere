# Rectrix Caedere — Full Site Design Audit

**Date:** 2026-07-27 · **Scope:** all 19 HTML pages · **Method:** deep code audit of every page (4 parallel passes) + rendered visual pass on every template type + the earlier dashboard deep-dive. Code findings and visual findings are both folded in below.

> Honest framing: the site is in good shape. Almost nothing here is "this looks bad." The findings are dominated by *systemic discipline* problems (one root cause, repeated on every page) plus a small number of real bugs. Fix the root cause and the list collapses.

---

## 0 · The one decision only you can make

> ✅ **DECIDED 2026-07-27 (Taylor): Option A.** Cinzel Decorative **700 is ratified for DISPLAY headings only**; **600 stays banned everywhere else** (body, labels, sans). The remaining weight sweep removes all non-display 600/700, not the display 700.

**Font weight 700.** Your brand rule is "300 / 400 / 500, never 600+." But **Cinzel Decorative ships only 400 and 700**, and nearly every page loads and uses 700 for display headings (and some use 600 elsewhere). So the rule as written is broken almost everywhere by necessity.

Pick one, and I'll apply it site-wide:
- **(A, recommended)** Ratify a **display-only 700 exception** for Cinzel Decorative in the brand guide. Keep 600 banned everywhere else (body, labels, sans). This legitimizes the display face and still catches the real offenders.
- **(B)** Rework display headings to get their weight from **size + tracking**, drop to 500. More work, stricter.

Half the "violations" below are waiting on this call.

---

## 1 · Fix-first: real bugs (not style opinions)

| Sev | Where | Bug |
|---|---|---|
| **P0** | `case-studies/index.html` ↔ `case-studies/are-the-dice-fair/index.html` | **The two files are swapped.** `/case-studies/` serves the *article*; `/are-the-dice-fair/` serves the *listing*. Every cross-link is a dead self-referential loop and the article is unreachable from any real listing. Swap the file contents, then verify the deck → listing → article path. |
| **P1** | `pacts-and-power/session-v2.html` | **Orphaned byte-identical duplicate** of `session.html` (verified identical). Nothing links to it; it's a live second URL and a drift trap. Delete it (or make it a redirect stub). |
| **P1** | `where-the-flowers-forget/index.html` | **Art loads from `raw.githubusercontent.com`** absolute URLs (rate-limited, uncacheable, breaks if repo path/visibility changes). The other 3 landings use root-relative `/assets/img/`. Switch to local paths. |
| **P1** | `ashfall-britannia/archive.html` | **Full-screen jump-scare on load** (`vamp.webp` snaps in for 190ms, "no transition, that's the point"). Startle / anxiety accessibility concern for anyone without reduced-motion set. It does honor reduced-motion, but gate it behind a first-visit check + dismissible warning, or cut it. |

---

## 2 · Systemic patterns (repeat across many pages — fix once, not per-page)

1. **No page imports `tokens.css`.** Every page (all campaign landings, all session readers, all archives, character) hand-rolls its own `:root` block, and the values have **drifted**: `--muted` exists as `#5E5A55`, `#9A9590`, *and* `#6b665e` across pages; `--card` is `#0D141C` vs the token's `#0E1820`. **This is the root cause of most findings below** (contrast bugs, hairline color, weight drift). Route every page through `tokens.css` and most of this file evaporates.
2. **Weight 600/700** on nearly every page (pending §0 decision).
3. **`background-attachment:fixed`** on the 5 session readers + P&P/Ashfall archives + veil + case studies. It's parallax by definition (banned) and a known iOS Safari jank/repaint source. Drop to normal scroll.
4. **Glassmorphism nav chrome** — `backdrop-filter:blur` frosted `.back`/`.subnav` pills across all archives + modals. Brand bans decorative glass. Use a solid low-alpha fill.
5. **Low-contrast muted text** — `#5E5A55` / `#6b665e` on near-black is ~3:1, below WCAG AA 4.5:1, and it's on 9–13px captions/labels/"no data" lines. Lighten to ~`#8a857c`+ or reserve the darkest grey for non-essential decoration.
6. **White-alpha hairlines** — `rgba(255,255,255,.05)` dividers instead of the `--gold-alpha-*` tokens that exist for exactly this. Against the "no #fff" rule.
7. **Grain missing on 2 pages** — mandatory grain overlay is present everywhere *except* `where-the-flowers-forget/archive.html` and `sky-is-the-limit/character.html`. Add the `body::after` feTurbulence layer.
8. **Off-brand easing** — `cubic-bezier(.2,.7,.2,1)` used for signature interactions instead of the token `cubic-bezier(.4,0,.2,1)`. Not springs (no overshoot, so not a bounce violation), but off-token.
9. **Silent error fallbacks** — timeline archives `catch{}` a failed roll-stat fetch and render **"0 rolls · nat 20 ×0"** as if it were real data, indistinguishable from a true zero. Against your own "no silent fallbacks." Distinguish "no data" from "zero." (`character.html` does this correctly, copy it.)
10. **Modal-first long-form reading** — the session readers put the primary POV/narrative/scene text in an ~880–920px modal at **~110ch measure**, past your 65–75ch target, for content whose whole job is reading. Cap prose to ~68ch and/or move it inline.
11. **Side-stripe borders** (banned) — `border-left:2px solid` era accents on Ashfall archive cards; `border-left:2px` on the case-study `.callout`. Encode via marker color / full border / top rule instead.
12. **Emoji-risk glyphs** — `⚔ ☀ ⚡ ✦ ⇧` used as tag icons in P&P/Ashfall/character; several have emoji-presentation variants that render as color emoji on some platforms. Force text presentation (VS15) or draw SVG marks.
13. **Dead CSS** — a ~40-line `.md` ruleset is carried in SITL + both pacts session files, unused by the v2 renderer. Delete.

---

## 3 · Per-page scores

| Page | Score | Headline |
|---|---|---|
| `index.html` (veil + deck) | **8** | Strongest page; reduced-motion + a11y wired. Weight-700, off-token easing. |
| `enter.html` | 7 | Redirect stub; unstyled fallback flashes white/light-mode if JS slow. |
| `dashboard.html` | 5 → improving | Was worst; 3 sweep items shipped (records ledger, arch tiles, axis). More below. |
| `case-studies/index.html` (article) | 7 | Excellent editorial + accessible SVG charts. **P0 swap**, weight, side-stripe callout, low-contrast caps. |
| `case-studies/are-the-dice-fair/` (listing) | 7 | Cleanest small page. **P0 swap**, weight. |
| `sky-is-the-limit/index.html` | 6.5 | Template outlier: inline CTAs, links-not-modal, glassmorphism, `background-attachment:fixed`. |
| `pacts-and-power/index.html` | 7.5 | Best landing exemplar; solid modal (no focus trap). |
| `ashfall-britannia/index.html` | 7.5 | Only landing with image `onerror` fallbacks; odd 1080px width divergence. |
| `where-the-flowers-forget/index.html` | 7 | Thin data handled gracefully. **P1 fragile image URLs.** |
| `sky-is-the-limit/session.html` | 7 | Most complete (audio player w/ a11y). Modal-reader 110ch, parallax. |
| `pacts-and-power/session.html` | 6.5 | Roll log **not collapsible** (regression vs SITL); font-size drift. |
| `pacts-and-power/session-v2.html` | 6 | **Delete — orphaned duplicate.** |
| `ashfall-britannia/session.html` | 7 | Themed loading state (good). Yellow "ember" + glow, ash particles. |
| `where-the-flowers-forget/session.html` | 7 | Best empty-state handling. Purple petal particles promote a minor accent. |
| `sky-is-the-limit/archive.html` | 7 | Best composition (alternating spine). **No reduced-motion block.** |
| `pacts-and-power/archive.html` | 7 | Best loading skeletons. Zeros-as-data on failure. |
| `ashfall-britannia/archive.html` | 6 | Most off-brand: jump-scare, glow, side-stripe cards, 78 ash particles. |
| `where-the-flowers-forget/archive.html` | 7 | Elegant map, correctly does NOT scroll-jack. **No grain.** `#fff` in ping dot. |
| `sky-is-the-limit/character.html` | 7 | **Best error/empty-state discipline of the whole site.** But weight-600, no grain, tabs lack ARIA. |

---

## 4 · What's genuinely strong (leave alone)

- The **veil gate + tarot deck** (`index.html`) — committed, atmospheric, accessible. The front door earns its reputation.
- The **"Descent" archive spine** — alternating tarot-card timeline is the best single composition on the site.
- The **campaign-landing template** — visually excellent across all four; issues are all under the hood.
- The **case-study article** — real editorial craft, accessible tables + SVG charts, superb restrained copy.
- **Empty/error-state discipline** on `character.html` and the WTFF pages — this is the model everything else should copy.

---

## 5 · Suggested fix order

1. **Route every page through `tokens.css`** (kills systemic #1, #5, #6, and the weight drift at the source).
2. **Make the §0 weight decision**, then sweep 600/700 accordingly.
3. **The 4 fix-first bugs** (§1): file swap, delete duplicate, WTFF image URLs, Ashfall jump-scare.
4. **Contrast + grain + reduced-motion** gaps (accessibility floor): lighten muted text, add grain to the 2 missing pages, add reduced-motion to SITL archive.
5. **Session-reader reading experience**: cap prose to ~68ch, make pacts roll-log collapsible, reconsider modal-first.
6. **Remaining polish**: glassmorphism → solid fills, off-token easing, side-stripe borders, emoji-glyphs, silent-fallback error states, dead `.md` CSS.
7. **Finish the dashboard sweep** already in flight (empty states, campaign stat row).

---

*Generated from a code audit of every page plus a rendered visual pass. Where a finding is code-level (weights, tokens, contrast ratios) it's checkable against the cited file. Where it's visual (composition, hierarchy) it reflects the rendered pass.*
