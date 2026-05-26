# Rectrix Caedere — Design Brief

## Aesthetic Philosophy

**Dark celestial botanical.** Midnight navy grounds, antique copper-gold linework, muted jewel-tone florals, restrained occult geometry. The brand sits between oracle deck, dark academia stationery, and luxury strategy brand.

Core through-line: *beauty as ritual, growth as strategy, softness with a blade hidden inside it.*

## Critical Rules for Token Generation

- **Dark-only.** Never generate a light mode, `@media (prefers-color-scheme: light)` block, or `[data-theme="light"]` selector. This is a single-surface dark brand.
- **Extend, never replace.** The existing token names (`--bg-void`, `--gold-mid`, `--text-1`, `--border`, etc.) are used throughout the production codebase. Do not rename them.
- **4px base unit** for all spacing. The scale runs 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 48 / 56 / 64.
- **Three font weights only:** 300 Light, 400 Regular, 500 Medium. Never generate 600, 700, or heavier. Hierarchy comes from size, color, tracking, and casing — not ink weight.
- **Gold is structural, not decorative.** It defines borders, sigils, type accents, and hover affordances. Never use it as a large-surface fill or button gradient.

## Color System

Primary surface: `#111A24` (Deep Blue-Black). Page void: `#050A0E`. Gold ramp: `#68442F` → `#8C5D3F` → `#C7A369` → `#DA9565` → `#E8C690`. Status colors (semantic only, never decorative): success `#4A9E6E`, danger `#B44A4A`, info `#6B8AAD`, mystic `#8B6BB5`, warn `#D4943A`.

## Typography

| Role | Font | Notes |
|---|---|---|
| Display / identity | Cinzel | High-contrast inscriptional Roman, all-caps friendly |
| Hero / packaging only | Cinzel Decorative | Not for UI chrome |
| Labels / nav / eyebrows | Alegreya Sans SC | Small caps everywhere |
| Body / product UI | Raleway | Variable font |
| Editorial / long-form | EB Garamond | Italics for marginalia |

Letter spacing: minimum `0.05em` on display, `0.14–0.18em` on labels.

## Motion

Easing: `cubic-bezier(.4,0,.2,1)` for all transitions.
Durations: 200ms hover, 350ms content entrance, 500ms route transition, 550ms staggered card appearance.
No bounce. No spring overshoot. Movement should feel like a printed page turning.

## Layout

Sidebar: fixed 240px left. Stat grid: 4–5 columns desktop. Section gaps: 40px minimum.

## Border Radius

6px default, 10px chart panels, 18px tarot-framed cards, `80px 80px 6px 6px` arch/cathedral top.

## Output Target

Plain CSS custom properties in `tokens.css`. No Tailwind, no CSS-in-JS, no build step. The project is a static GitHub Pages site.
