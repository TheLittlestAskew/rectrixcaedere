# Rectrix Caedere — Project Context for Claude

## What this is

A D&D roll statistics dashboard at **rectrixcaedere.com**, hosted on GitHub Pages from `TheLittlestAskew/rectrixcaedere`. It visualizes dice roll data from multiple D&D Beyond campaigns. The visual treatment is as important as the data — this must feel like a premium oracle artifact, not a generic dashboard.

**Full project brief:** `RECTRIX_CAEDERE_PROJECT_BRIEF.md`

## Design target

The aspirational design target is `.design/rc/mockup-target.png`. Key features to work toward:
- Stat cards with unique botanical/celestial SVG illustrations per card (snake, moon, flowers at ~4% opacity)
- Ornate double-line corner flourishes with leaf/vine detail on every panel
- Stronger gold border glow — visible accent line at top of each panel
- Elaborate crescent + star ornamental dividers between sections
- Header with flanking blade logos and celestial icon buttons
- Sidebar with expanded nav + character portrait area at bottom
- Richer area chart with purple bleeding into gold gradient fill
- Bottom tarot-style character portrait cards

## Brand references

- **Full brand guide:** `.design/rc/Brand Guide.md`
- **Design brief (tokens brief):** `.design/rc/DESIGN_BRIEF.md`
- **Design tokens:** `tokens.css` — single source of truth for all CSS custom properties
- **Color palettes:** `.design/rc/color palette1.png`, `.design/rc/color palette2.png`

Core aesthetic: *dark celestial botanical tarot* — Art Nouveau framing, antique-gold linework, midnight navy ground, muted jewel-toned florals. **Beauty as ritual, growth as strategy, softness with a blade hidden inside it.**

## Tech stack — critical constraints

- **React 18.2.0** via CDN (UMD) — pure `React.createElement`, no JSX, no build step
- **Recharts 2.12.7** via CDN (UMD) — do NOT upgrade; Recharts 3.x breaks with React 18 UMD
- **CDN script order is critical:** React → ReactDOM → prop-types → Recharts. Missing prop-types = black screen.
- **Vanilla CSS only** — no Tailwind, no preprocessors, no CSS-in-JS
- **Single HTML file shell** (`dashboard.html`) + **single JS file** (`app.js`) — no bundler, no build
- **File size limit ~15KB per file** — GitHub's push API truncates larger files. Split if needed.
- **Dark-only** — no light mode, no `prefers-color-scheme` blocks, ever

## Design system rules

- **Three font weights only:** 300 Light, 400 Regular, 500 Medium. Never 600+.
- **Gold is structural, not decorative** — borders, sigils, type accents, hover affordances only. Never large fills.
- **4px base spacing unit** — all spacing from `tokens.css` `--space-*` scale
- **JS-side tokens** — hardcoded colors in Recharts inline props must use the `T` object (defined at top of `app.js`)
- All `var(--*)` tokens are in `tokens.css` — extend it, never replace existing token names

## Current state

Only the **Campaign Overview** page exists. Five pages are planned but unbuilt: Characters, Combat, Skills & Spells, Luck & Trends, Session Explorer. Campaign data is currently hardcoded in `app.js`; Supabase integration is planned (project ID: `vtrtyagltwdrbastpppl`).

## Files

```
index.html                          # Veil + tarot deck landing (campaign selector)
dashboard.html                      # SITL dashboard — HTML shell + all CSS
app.js                              # All React components, data, charts
tokens.css                          # CSS custom property design tokens
RECTRIX_CAEDERE_PROJECT_BRIEF.md    # Full project brief
.design/rc/mockup-target.png        # Design target image
.design/rc/Brand Guide.md           # Full brand guide
.design/rc/DESIGN_BRIEF.md          # Token-generation design brief
.design/rc/color palette1.png       # Color reference
.design/rc/color palette2.png       # Color reference
```
