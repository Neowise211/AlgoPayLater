# MCP — Supabase integration notes

This document describes the planned Supabase integration for Algo Pay: Loan Investigator. No implementation has been done yet. This is a forward-looking reference for when the application phase begins.

---

## Purpose

In v1, the game uses static JSON files for all case data. Supabase is planned for a future phase to support:

- **Verdict persistence** — storing player decisions across sessions
- **Analytics** — aggregate approve/reject rates per case (for game balancing)
- **Optional leaderboard** — if competitive mechanics are added

---

## Required environment variables

See `.env.example` for the template. Two variables are needed:

| Variable | Description | Where to find it |
|---|---|---|
| `SUPABASE_URL` | Your project's API URL | Supabase Dashboard → Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Public anon key | Supabase Dashboard → Settings → API → Project API keys |

**Security notes:**
- The anon key is safe to use in browser code but should still not be committed to version control.
- Never commit `.env`. Only `.env.example` (with placeholder values) belongs in the repo.
- Row-level security (RLS) must be enabled on any Supabase tables before going public.

---

## Cursor MCP configuration (future)

When the Supabase MCP server is configured in Cursor, you will need a `.cursor/mcp.json` (or equivalent, depending on your Cursor version) that references the MCP server. A placeholder shape is documented here for reference — do not create this file until the Supabase MCP is ready to be wired up.

<!-- EXAMPLE ONLY — not a final config -->
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest", "--supabase-url", "${SUPABASE_URL}", "--supabase-key", "${SUPABASE_ANON_KEY}"]
    }
  }
}
```

The exact config key names and transport mechanism may differ depending on your Cursor version. Refer to the Supabase MCP documentation at the time of implementation.

---

## Proposed Supabase tables (future)

These are non-binding drafts. Do not create migrations from these.

### `verdicts`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `case_id` | text | References the static JSON case ID |
| `decision` | text | `"approve"` or `"reject"` |
| `created_at` | timestamptz | Auto-set by Supabase |

### `sessions` (optional)

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `started_at` | timestamptz | |
| `shift_reached` | integer | Highest shift completed |

---

## Open questions

- Should verdict data be anonymous (no user account) or tied to a session ID?
- Is a leaderboard valuable enough to add authentication complexity in v1?
- Should analytics be Supabase-native or an external tool (e.g., PostHog)?
