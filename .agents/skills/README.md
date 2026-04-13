# .agents/skills

This directory holds agent skill definitions compatible with generic agent frameworks (OpenAI Assistants, Cursor agent, etc.) working in this repository.

## Purpose

Skills here are intended to be framework-agnostic — they describe what an agent should do without assuming a specific AI platform. Where a skill is Cursor-specific or Claude-specific, it lives in `.cursor/` or `.claude/skills/` instead.

## Structure

Each skill is a subdirectory containing at minimum a `SKILL.md` (instructions) and optionally example inputs/outputs:

```
.agents/skills/
  case-authoring/
    SKILL.md
    example-input.md
    example-output.json
```

## Skills planned for this project

| Skill | Purpose |
|---|---|
| `case-authoring/` | Draft a game Case that satisfies all design guardrails |
| `doc-sync/` | Check that terminology in docs is consistent with the glossary in README.md |
| `content-review/` | Review a FeedPost batch for tone, realism, and design guardrail compliance |

These directories do not exist yet and will be added when content authoring begins.

## Relationship to `.claude/skills/`

- `.agents/skills/` — framework-agnostic, works with any agent
- `.claude/skills/` — Claude/Codex-specific, may reference Claude features or tool-use patterns
