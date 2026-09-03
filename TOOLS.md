# TOOLS — rectrixcaedere

> What this project uses and what for. Maintained by the handoff motion: whenever
> a tool is used here, add or bump its row.
> Types: `Skill` · `MCP` · `CLI` · `App` · `Service` · `Site` · `Library` · `Data` · `Task`
> A `~` before a date means inferred, not observed. `—` means unknown.

## Active

| Tool | Type | Used for | Access | Last used | Cost | Notes |
|---|---|---|---|---|---|---|
| **React** | Library | All dashboard components | CDN UMD, pinned **18.2.0** | 2026-08-31 | Free | 🛑 `React.createElement` only — no JSX, no build step |
| **Recharts** | Library | Every chart on the dashboard | CDN UMD, pinned **2.12.7** | 2026-08-31 | Free | 🛑 Do NOT upgrade — Recharts 3.x breaks with React 18 UMD |
| **prop-types** | Library | Required by the Recharts UMD build | CDN UMD | 2026-08-31 | Free | ⚠️ Script order React → ReactDOM → prop-types → Recharts. Missing it = black screen |
| **Supabase** | Service | `Rectrix_Caedere` — roll, session, and character data for all four campaigns | project `vtrtyagltwdrbastpppl` | 2026-08-31 | Free tier | Read direct from the browser in `app.js` and the per-campaign pages |
| **supabase-cutter** | MCP | Schema + query access to `Rectrix_Caedere` | local MCP server | ~2026-08-31 | Free | The write path for roll/session backfills |
| **GitHub Pages** | Service | Hosting the live site | rectrixcaedere.com | 2026-08-31 | Free | Custom domain via root `CNAME` |
| **GitHub** | Service | Remote host for `TheLittlestAskew/rectrixcaedere` | github.com | 2026-08-31 | Free | ⚠️ Push API truncates files over ~15 KB — split rather than grow a file |
| **git** | CLI | Version control, handoff motion | `C:\Program Files\Git` | 2026-08-31 | Free | — |
| **/rc-brand** | Skill | Applying the Rectrix Caedere brand system | `~/.claude/skills` | ~2026-08-31 | Free | Brand guide lives in `.design/rc/` |
| **impeccable** | Skill | Frontend design/critique passes | `.claude/commands/impeccable.md`, locked in `skills-lock.json` | ~2026-08-31 | Free | Source `pbakaus/impeccable`, hash-pinned |
| **design-tokens** | Skill | Generating and maintaining `tokens.css` | locked in `skills-lock.json` | ~2026-08-31 | Free | Source `julianoczkowski/designer-skills`, hash-pinned |
| **Claude Code** | App | Component work, parser fixes, publish waves, handoffs | CLI / IDE extension | 2026-08-31 | Paid | — |
| **ddb-roll-sync** | App | Chrome extension feeding rolls into `Rectrix_Caedere` | unpacked MV3 extension | ~2026-07-22 | Free | PGRST102 mixed-key bulk-POST bug fixed 2026-07-22 |
| **D&D Beyond** | Site | Source of the roll data | dndbeyond.com | ~2026-08-31 | Paid | — |
| **septentrion-sync** | Skill | Feeds handoff state to the vault + SystemHorizon heartbeat | `~/.claude/skills/septentrion-sync` | 2026-09-02 | Free | In both `REPOS` and `TOOLS_REPOS` |

## Retired

| Tool | Type | Was used for | Retired | Why |
|---|---|---|---|---|
| ~~**Hardcoded campaign data in `app.js`**~~ | Data | Campaign stats before the Supabase wiring | ~2026-08-31 | ✅ Replaced by live Supabase reads; a hardcoded `FALLBACK` config still survives in the map script |
| ~~**Two-DB roll copy**~~ | Service | Staging rolls in a second Supabase project before copying here | 2026-07-22 | ✅ `ddb-roll-sync` writes direct to `Rectrix_Caedere` now |
