# Content model — Algo Pay: Loan Investigator

All data shapes below are **draft proposals only**. They are non-binding examples intended to guide future implementation. Nothing here should be imported, instantiated, or treated as final.

---

## Applicant

An Applicant is the loan subject investigated in one Case.

<!-- EXAMPLE ONLY — not a final schema -->
```json
{
  "id": "applicant-001",
  "name": "Jordan Marsh",
  "age": 34,
  "occupation": "Freelance Consultant",
  "declaredIncome": 62000,
  "employerName": "Self-employed",
  "existingDebts": 8400,
  "loanAmount": 15000,
  "loanPurpose": "Home renovation"
}
```

---

## SocialAccount

Each Applicant has one or more SocialAccounts from which FeedPosts are pulled.

<!-- EXAMPLE ONLY — not a final schema -->
```json
{
  "id": "account-001",
  "applicantId": "applicant-001",
  "platform": "Bluebird",
  "handle": "@jmarsh_consults",
  "followerCount": 240,
  "verified": false
}
```

---

## FeedPost

A single post from a SocialAccount, surfaced as potential evidence.

<!-- EXAMPLE ONLY — not a final schema -->
```json
{
  "id": "post-001",
  "accountId": "account-001",
  "timestamp": "2026-02-14T19:32:00Z",
  "body": "Just got back from a week in Santorini. Needed it after Q4.",
  "attachments": ["photo"],
  "tags": ["travel", "lifestyle"]
}
```

---

## Clue

A Clue is a tagged association between a FeedPost and a declared Applicant field, representing a discrepancy or a correlation.

<!-- EXAMPLE ONLY — not a final schema -->
```json
{
  "id": "clue-001",
  "caseId": "case-001",
  "postId": "post-001",
  "applicantField": "declaredIncome",
  "type": "contradiction",
  "note": "Santorini trip implies discretionary spend inconsistent with stated income vs. debt ratio."
}
```

`type` values: `"contradiction"` | `"corroboration"` | `"ambiguous"`

---

## Case

A Case bundles one Applicant, their social evidence, and the intended clues.

<!-- EXAMPLE ONLY — not a final schema -->
```json
{
  "id": "case-001",
  "applicantId": "applicant-001",
  "socialAccounts": ["account-001"],
  "feedPosts": ["post-001", "post-002", "post-003"],
  "clues": ["clue-001"],
  "difficulty": "medium",
  "shift": 1
}
```

`difficulty` values: `"easy"` | `"medium"` | `"hard"`

---

## Verdict

A Verdict is the player's stamped decision on a Case, recorded for consequence tracking.

<!-- EXAMPLE ONLY — not a final schema -->
```json
{
  "id": "verdict-001",
  "caseId": "case-001",
  "decision": "reject",
  "timestamp": "2026-04-13T14:20:00Z",
  "memoTriggered": false
}
```

`decision` values: `"approve"` | `"reject"`

---

## Relationships

```
Case
 ├── Applicant (1:1)
 ├── SocialAccount[] (1:many)
 │    └── FeedPost[] (1:many)
 └── Clue[] (1:many)
      ├── → FeedPost (references)
      └── → Applicant field (references)

Verdict
 └── Case (1:1)
```

---

## Open questions for future implementation

- Should `Clue` objects be pre-authored in the JSON, or discovered dynamically by player interaction?
- Should `FeedPost.timestamp` be shown to the player, or hidden to add uncertainty?
- Does `SocialAccount.platform` affect visual theming (different feed UI per platform)?
