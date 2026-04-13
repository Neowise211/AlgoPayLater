# CLAUDE.md — Agent instructions for Algo Pay: Loan Investigator

This file governs how Claude, Codex, and other AI assistants should behave when working in this repository.

---

## Current phase

This repo is in the **meta-layer phase**. No application source code exists yet. Your job is to help design, document, and scaffold — not to build.

---

## Hard rules

1. **Do not create application source code.** No `src/` directory, no React components, no CSS, no gameplay logic.
2. **Do not create or modify `package.json`, `vite.config.*`, or any dependency manifest.** Tooling setup is a later task.
3. **Do not run `npm`, `yarn`, `pnpm`, or any package installer.**
4. **Do not install, add, or suggest adding npm dependencies.**
5. **Keep documentation consistent.** If you edit `docs/overview.md`, keep terminology aligned with the glossary in `README.md`.
6. **Never commit `.env`.** Only `.env.example` may exist in the repo.

---

## What you may do

- Edit or create files inside `.cursor/`, `.claude/`, `.agents/`, `docs/`.
- Edit `README.md`, `CLAUDE.md`, `AGENTS.md`, `.env.example`, `.gitignore`, `settings.json`.
- Propose data schemas inside `docs/content-model.md` as **examples only** (JSON code blocks, clearly labelled as non-binding drafts).
- Write new Cursor rules in `.cursor/rules/`.
- Write new agent skills in `.claude/skills/` or `.agents/skills/`.

---

## Content conventions

### Naming
- All filenames: lowercase, kebab-case (e.g., `content-model.md`, `meta-scope.md`).
- JSON field names: camelCase.
- Game concept names in prose: PascalCase (e.g., `VerdictStamp`, `FeedPost`).

### Document structure
- All docs open with a `# Title` heading.
- Use `##` and `###` sub-headings; do not skip levels.
- Use tables for structured comparisons, JSON fences for data shapes.
- Avoid bullet-points-of-bullet-points deeper than two levels.

### Proposing data schemas
When you need to show a game data shape, use a fenced JSON block and mark it explicitly:

```
<!-- EXAMPLE ONLY — not a final schema -->
```json
{
  "id": "applicant-001",
  "name": "Jordan Marsh",
  "declaredIncome": 62000
}
```
```

Never auto-generate IDs, seed data files, or import paths alongside schema proposals.

---

## Tech stack (for documentation reference — not for implementation yet)

- React 18 + Vite (plain JS/JSX, no TypeScript)
- Plain CSS (no preprocessors, no CSS-in-JS)
- Static JSON files as data source
- Supabase (future: leaderboard, analytics — see `docs/mcp-supabase.md`)

---

## Useful docs
- [docs/overview.md](docs/overview.md)
- [docs/content-model.md](docs/content-model.md)
- [docs/mcp-supabase.md](docs/mcp-supabase.md)

> GitNexus rules and reference: see [.cursor/rules/gitnexus.md](.cursor/rules/gitnexus.md) and [.cursor/docs/gitnexus.md](.cursor/docs/gitnexus.md)
