# Algo Pay — Loan Investigator

A browser-based detective game where players act as loan officers at a near-future finance company. Each case presents an applicant's declared financial profile alongside their social media activity. Players cross-reference inconsistencies, weigh clues, and deliver a verdict — approve or reject — by reaching for their physical stamp.

---

## Current phase: meta-layer only

This repo contains **only** project scaffolding, documentation, and agent configuration. No application source code exists yet. See the [docs/overview.md](docs/overview.md) for the full game design, and [docs/content-model.md](docs/content-model.md) for the proposed data shapes.

The application source will be scaffolded in a later task and will use:
- **React 18** + **Vite** (plain JS/JSX — no TypeScript)
- **Plain CSS** (no preprocessors or CSS-in-JS)
- **Static JSON** data files (no backend in the initial version)

---

## Quick glossary

| Term | Meaning |
|---|---|
| `Applicant` | The loan subject being investigated each round |
| `FeedPost` | A social media post surfaced as potential evidence |
| `VerdictStamp` | The physical approval/rejection mechanic; player picks up and slams the stamp |
| `Case` | One complete investigable unit: one applicant, a set of FeedPosts, and one verdict |
| `Clue` | A tagged discrepancy or correlation linking a FeedPost field to a declared value |

---

## Docs

- [docs/overview.md](docs/overview.md) — vision, core loop, player actions, fail states
- [docs/content-model.md](docs/content-model.md) — static JSON schemas (examples only)
- [docs/mcp-supabase.md](docs/mcp-supabase.md) — Supabase MCP integration notes and setup

---

## Repository layout

```
.cursor/        Cursor IDE rules and settings
.claude/        Claude/Codex agent configuration and skills
.agents/        Generic agent instructions and skills
docs/           Design and technical documentation
CLAUDE.md       Instructions for Claude and Codex assistants
AGENTS.md       Role definitions for agent-assisted work
.env.example    Environment variable template
settings.json   Editor/IDE defaults
```
