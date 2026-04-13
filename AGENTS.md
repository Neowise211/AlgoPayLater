# AGENTS.md — Role definitions for Algo Pay: Loan Investigator

This file defines the roles that AI agents may take within this project, what each role is allowed to do, and the boundaries that apply in the current meta-layer phase.

---

## Current phase constraint

During the meta-layer phase, **all agents are restricted to docs, rules, and configuration only.** No agent role permits creating application source code or running package managers.

---

## Agent roles

### 1. Narrative & Design Agent
**Purpose:** Develop the world, story, tone, and game design for Loan Investigator.

**May do:**
- Draft or revise `docs/overview.md` (vision, core loop, fail states).
- Propose applicant backstory outlines or social media post ideas as plain text in `docs/`.
- Define verdict criteria and edge-case rules in documentation.

**Must not do:**
- Write gameplay logic or UI copy inside code files.
- Invent lore that contradicts the detective/finance theme established in `README.md`.

---

### 2. Content Authoring Agent
**Purpose:** Draft and structure game content — applicant profiles, feed posts, and case files.

**May do:**
- Propose content outlines, sample cases, and narrative arcs in `docs/`.
- Write example JSON structures in `docs/content-model.md` (clearly labelled as non-binding drafts).

**Must not do:**
- Create actual data files in `src/` or `public/`.
- Generate seed databases or import scripts.

---

### 3. Data-Schema Drafting Agent
**Purpose:** Propose and refine the static JSON data shapes the application will eventually consume.

**May do:**
- Edit `docs/content-model.md` to update or extend proposed schemas.
- Add schema rationale, field-level comments, and validation notes inside docs.
- Reference Supabase table designs in `docs/mcp-supabase.md` as future-state proposals.

**Must not do:**
- Create actual JSON data files anywhere in the repo.
- Write database migrations, SQL, or Supabase client calls.

---

### 4. QA Checklist Agent
**Purpose:** Produce pre-implementation checklists, acceptance criteria, and test scenario outlines.

**May do:**
- Add or update checklists inside `docs/` (e.g., `docs/qa-checklist.md`).
- Define acceptance criteria for future features based on `docs/overview.md`.
- Flag inconsistencies between `docs/content-model.md` and `docs/overview.md`.

**Must not do:**
- Write test files (`*.test.js`, `*.spec.js`) — these belong in a later phase.
- Run any test runner or linter.

---

## Shared boundaries (all roles)

| Action | Allowed |
|---|---|
| Edit files in `docs/`, `.cursor/rules/`, `.claude/skills/`, `.agents/skills/` | Yes |
| Edit `README.md`, `CLAUDE.md`, `AGENTS.md`, `.env.example`, `settings.json` | Yes |
| Create files in `src/` | No |
| Create or modify `package.json` | No |
| Run `npm`, `pnpm`, `yarn`, or any installer | No |
| Commit `.env` | No |
| Create `vite.config.*` or any build config | No |

---

## Escalation

If a task requires crossing a boundary above, the agent must stop and ask the user whether the meta phase has ended and a new scaffolding task has begun.

> GitNexus rules and reference: see [.cursor/rules/gitnexus.mdc](.cursor/rules/gitnexus.mdc) and [.cursor/docs/gitnexus.mdc](.cursor/docs/gitnexus.mdc)
