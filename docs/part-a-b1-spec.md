# Part A / B.1 Specification — Algo Pay: Loan Investigator

**Status:** Canonical source. Derived from task description (April 2026).
When the original Part A document is recovered, replace sections A.1 and A.3 in-place and re-copy into `src/types/shapes.js` and `supabase/schema.sql`.

---

## Part A.1 — JSDoc Type Definitions

These typedefs are the authoritative data shapes for the application.
Copy verbatim into `src/types/shapes.js`.

```js
/**
 * @typedef {Object} Applicant
 * @property {string} id
 * @property {string} name
 * @property {number} age
 * @property {string} address
 * @property {string} employer
 * @property {string} position
 * @property {number} tenureYears
 * @property {number} declaredIncome
 * @property {string} loanPurpose
 * @property {number} dependents
 */

/**
 * @typedef {'facebook'|'instagram'|'linkedin'|'twitter'} Platform
 */

/**
 * @typedef {'strong'|'moderate'|'weak'|'red_herring'|'neutral'} ClueStrength
 */

/**
 * @typedef {Object} FeedPost
 * @property {string} id
 * @property {Platform} platform
 * @property {string} username
 * @property {string} avatar
 * @property {string} timestamp
 * @property {string} content
 * @property {string|null} image
 * @property {number} likes
 * @property {number} comments
 * @property {ClueStrength|null} clueStrength  - null for non-clue posts
 * @property {string|null} clueField           - which applicant field it contradicts
 */

/**
 * @typedef {'no_match'|'misinformation'|'other_red_flag'} PinReason
 */

/**
 * @typedef {Object} PinnedPost
 * @property {string} postId
 * @property {PinReason} reason
 * @property {string} field                    - applicant field targeted
 * @property {string} note                     - player's free-text note (may be empty)
 * @property {string|null} voucherApplied
 */

/**
 * @typedef {'easy'|'medium'|'hard'|'extreme'} Difficulty
 */

/**
 * @typedef {'approve'|'reject'} Verdict
 */

/**
 * @typedef {Object} Case
 * @property {string} id
 * @property {Difficulty} difficulty
 * @property {Verdict} correctVerdict
 * @property {Applicant} applicant
 * @property {FeedPost[]} posts
 */

/**
 * @typedef {Object} ScoreBreakdown
 * @property {number} pinScore
 * @property {number} reasonScore
 * @property {number} fieldScore
 * @property {number} verdictScore
 * @property {number} explanationBonus
 * @property {number} missedCluesPenalty
 * @property {number} voucherModifier
 * @property {number} total
 */

/**
 * @typedef {Object} LeaderboardRow
 * @property {string} id
 * @property {string} initials
 * @property {Difficulty} difficulty
 * @property {string} caseId
 * @property {number} score
 * @property {number} timeSeconds
 * @property {boolean} verdictCorrect
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Session
 * @property {boolean} tutorialSeen
 * @property {string|null} [lastCaseId]
 * @property {Difficulty|null} [lastDifficulty]
 */
```

---

## Part A.3 — Database Schema (Supabase / PostgreSQL)

Copy verbatim into `supabase/schema.sql`.

```sql
-- Algo Pay: Loan Investigator — Supabase schema
-- Run once against your Supabase project to initialise tables.

create extension if not exists "pgcrypto";

-- ─── Leaderboards ────────────────────────────────────────────────────────────

create table if not exists leaderboards (
  id             uuid primary key default gen_random_uuid(),
  initials       text        not null,
  difficulty     text        not null check (difficulty in ('easy','medium','hard','extreme')),
  case_id        text        not null,
  score          integer     not null,
  time_seconds   integer     not null,
  verdict_correct boolean    not null,
  created_at     timestamptz not null default now()
);

create index if not exists leaderboards_rank_idx
  on leaderboards (difficulty, score desc, time_seconds asc);

-- ─── Telemetry ───────────────────────────────────────────────────────────────

create table if not exists telemetry (
  id          uuid primary key default gen_random_uuid(),
  event       text        not null,
  payload     jsonb,
  created_at  timestamptz not null default now()
);
```

---

## Part B.1 — Route Table (R1–R7)

| Route | Method | Path | Page Component | Notes |
|-------|--------|------|----------------|-------|
| R1 | GET | `/` | `HomePage` | Landing, leaderboard preview |
| R2 | GET | `/difficulty` | `DifficultySelectPage` | 4 selectable tiers |
| R3 | GET | `/briefing/:caseId` | `CaseBriefingPage` | Applicant dossier |
| R4 | GET | `/investigate/:caseId` | `InvestigationPage` | Core gameplay |
| R5 | GET | `/verdict/:caseId` | `VerdictPage` | Approve / Reject |
| R6 | GET | `/score/:caseId` | `ScoreBreakdownPage` | Points + leaderboard |
| R7 | GET | `/leaderboard` | `LeaderboardPage` | Per-difficulty boards |

**F-feature annotations (from task):**

| Feature | Routes | Description |
|---------|--------|-------------|
| F3 | R3, R4 | Case data loading (applicant + posts from static JSON) |
| F8 | R4 | Pin classification sidebar |
| F9 | R4 | Voucher system |
| F10 | R5 | Binary Approve / Reject verdict |
| F11 | R6 | Score breakdown display |
