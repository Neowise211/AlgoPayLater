# .claude/skills

This directory holds local **agent skills** for use with Claude and Codex assistants working in this repository.

## What is a skill?

A skill is a `SKILL.md` file that gives an AI assistant a reusable, domain-specific set of instructions for a well-defined task. Skills are read by the assistant at task time — they are not code, configuration, or executable scripts.

## How to add a skill

1. Create a subdirectory with a short, descriptive name (e.g., `case-authoring/`).
2. Inside it, create a `SKILL.md` file that describes:
   - When to use this skill (trigger examples)
   - Step-by-step instructions the assistant should follow
   - Any constraints or output format requirements
3. Register the skill in the top-level `AGENTS.md` or `CLAUDE.md` if it should be surfaced automatically.

## Skills planned for this project

| Skill | Purpose |
|---|---|
| `case-authoring/` | Draft a new Case including Applicant, FeedPosts, and Clues that meet the design guardrails |
| `schema-review/` | Review a proposed JSON schema against `docs/content-model.md` for consistency |
| `qa-checklist/` | Generate an acceptance checklist for a new feature or document |

These directories do not exist yet and will be added when the application phase begins.
