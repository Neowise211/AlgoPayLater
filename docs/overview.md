# Overview — Algo Pay: Loan Investigator

## Vision

Loan Investigator is a browser-based single-player detective game set in the near future. Players work as loan investigators at Algo Pay, a finance company that uses social media monitoring alongside traditional credit checks. Each shift presents a queue of Cases. The player must sift through evidence and then physically stamp their verdict.

The tone is bureaucratic dread crossed with detective noir: quiet offices, flickering screens, and the weight of consequential decisions made under time pressure.

---

## Core loop

```
1. New Case arrives on the player's desk
2. Player reads the declared profile (income, occupation, existing debts)
3. Player reviews the FeedPost evidence panel (social media activity)
4. Player identifies Clues — contradictions or correlations between declared data and posts
5. Player picks up the VerdictStamp
6. Player slams the stamp: APPROVE or REJECT
7. Brief consequence screen (no moral judgment, just downstream effects)
8. Next Case
```

---

## Player actions

| Action | Description |
|---|---|
| Read profile | View the applicant's declared financial and personal information |
| Browse feed | Scroll through the applicant's social media posts |
| Tag a clue | Mark a post (or field) as relevant evidence |
| Cross-reference | Link a FeedPost field to a declared field to surface a discrepancy |
| Pick up stamp | Initiate the verdict gesture |
| Stamp APPROVE | Approve the loan application |
| Stamp REJECT | Reject the loan application |

---

## Fail states

Loan Investigator has no game-over screen. Instead, failure is accumulative and narrative:

- **False approvals** — Approving a clearly fraudulent case generates a complaint memo on a later shift.
- **False rejections** — Rejecting a genuine case generates an internal review memo.
- **Memo accumulation** — Too many memos trigger an "investigation into your conduct" cutscene (not a hard failure — the game continues with added pressure).
- **Time pressure (optional mechanic)** — If implemented, letting the clock run out defaults to REJECT and logs a "deferred" memo.

---

## Design principles

- Every Case must include at least one genuine contradiction between declared data and social activity.
- No Case has an objectively correct verdict — ambiguity is the point.
- The stamp mechanic is the only verdict input. No buttons, sliders, or multiple-choice menus for the final decision.
- The game does not show a score after each verdict. Consequences are revealed slowly, diegetically.

---

## Out of scope for v1

- Multiplayer or leaderboards
- Backend persistence (v1 uses static JSON cases)
- Custom stamp skins or cosmetics
- Voice acting or animated cutscenes
