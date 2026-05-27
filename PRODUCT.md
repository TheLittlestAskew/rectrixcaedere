# Rectrix Caedere — Product Context

## Product Purpose

A D&D roll statistics dashboard at rectrixcaedere.com. Visualizes dice roll data from multiple D&D Beyond campaigns. The visual treatment is as important as the data — this is a premium oracle artifact, not a generic dashboard.

## Users

Taylor Ritchie — the DM and data owner. Runs multiple long-term D&D campaigns, tracks roll statistics to analyze player behavior, luck streaks, and session patterns. Uses the dashboard for personal insight and to share with players. Has ADHD — keep tasks concrete and broken into steps.

## Register

product

## Brand

Dark celestial botanical tarot. Art Nouveau framing, antique-gold linework, midnight navy ground, muted jewel-toned florals. The brand sits between oracle deck, dark academia stationery, botanical grimoire, and luxury strategy brand.

**Core through-line:** beauty as ritual, growth as strategy, softness with a blade hidden inside it.

**Tone:** mystical, feminine, literary, strategic, high-end. Restrained rather than chaotic — curated ritual object, not witchy clutter.

## Design target

`.design/rc/mockup-target.png` — an AI-generated concept mockup showing the aspirational visual direction. More ornate than current state, with botanical card illustrations, elaborate corner flourishes, stronger gold glow, atmospheric chart fills, celestial section dividers.

## Anti-references

- Generic dark dashboard (Inter font, purple gradient, rounded cards, neon accents)
- Flat black backgrounds — must have visible paper/cardstock texture
- Yellow gold — always copper/amber warmth
- Glossy 3D effects, cartoon outlines, bright white
- Clutter — "let the symbol be simple, let the frame carry the magic"

## Strategic principles

- Gold is structural, not decorative — borders, sigils, type accents, hover affordances only
- Three font weights only: 300 Light, 400 Regular, 500 Medium. Never 600+
- Dark-only — no light mode ever
- 4px base spacing unit

## Tech constraints (critical)

- React 18.2.0 via CDN UMD — pure React.createElement, no JSX, no build step
- Recharts 2.12.7 via CDN — do NOT upgrade, Recharts 3.x breaks with React 18 UMD
- CDN load order: React → ReactDOM → prop-types → Recharts (missing prop-types = black screen)
- Vanilla CSS only — no Tailwind, no preprocessors
- Files: index.html (CSS + shell) + app.js (all React) — keep each under ~15KB
- All CSS tokens in tokens.css; JS color tokens in var T at top of app.js
