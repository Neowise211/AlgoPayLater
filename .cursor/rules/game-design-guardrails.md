---
description: Keep game design proposals consistent with the detective-finance theme and stamp verdict mechanic
globs: ["docs/**"]
alwaysApply: false
---

# Rule: game-design-guardrails

These guardrails ensure any design work stays coherent with the established vision for Loan Investigator.

## Core pillars (non-negotiable)

1. **Detective tone** — The player is an investigator, not a bank teller. The interface should feel like evidence gathering, not form-filling.
2. **Stamp verdict mechanic** — The final action of every case is a physical-feeling stamp (Approve / Reject). No other verdict UX may replace this.
3. **Tension through contradiction** — Cases are only interesting when the declared data and the social feed conflict. Design proposals must include at least one such contradiction.
4. **No moral lecturing** — The game does not tell players they made the "right" choice. Verdicts have consequences, not gold stars.

## Prohibited design directions

- Gamification elements that trivialise the applicant (e.g., cartoon animations, happy/sad emoji reactions on the stamp).
- Adding a "maybe" or "defer" verdict — every case must resolve to Approve or Reject.
- Introducing multiplayer or social comparison in the initial version.
- Cases that have an objectively correct answer (every case should be genuinely ambiguous).

## Consistency checks

When proposing a new case, clue type, or UI mechanic, verify it against:

- [ ] Does it reinforce the detective atmosphere?
- [ ] Does it terminate with the stamp?
- [ ] Does it involve at least one FeedPost vs. declared-data contradiction?
- [ ] Is the correct verdict genuinely ambiguous?

## Vocabulary alignment

Avoid synonyms that dilute the theme. Use the canonical terms from `README.md` and `docs/overview.md`:

| Avoid | Use instead |
|---|---|
| customer, client | Applicant |
| tweet, post, update | FeedPost |
| decision, ruling | Verdict |
| flag, warning | Clue |
| approve button, deny button | VerdictStamp |
