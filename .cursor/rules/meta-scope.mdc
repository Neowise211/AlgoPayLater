---
description: Enforce meta-layer-only scope during project initialization phase
globs: ["**/*"]
alwaysApply: true
---

# Rule: meta-scope

This repository is in the **meta-layer phase**. The application has not been scaffolded yet.

## Prohibited actions

- Creating any file inside `src/`
- Creating or modifying `package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
- Creating `vite.config.js`, `vite.config.ts`, or any other build-tool config
- Running `npm`, `pnpm`, `yarn`, `bun`, or any package manager command
- Creating `.jsx`, `.tsx`, `.ts` files anywhere
- Creating any CSS files intended for the application UI
- Writing React component code, even as a "preview" or "example"

## Permitted file locations

- `.cursor/` (rules, settings)
- `.claude/` (skills, config)
- `.agents/` (skills, instructions)
- `docs/` (design and technical documentation)
- Root-level files: `README.md`, `CLAUDE.md`, `AGENTS.md`, `.env.example`, `.gitignore`, `settings.json`

## How to handle out-of-scope requests

If asked to write application code or install dependencies, respond:
> "This repo is in the meta-layer phase. Application scaffolding is a separate task. I can document this as a proposal in `docs/` instead."
