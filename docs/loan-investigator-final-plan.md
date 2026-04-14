# Algo Pay — Loan Investigator
## Finalized Plan (v3.0)

**Last Updated:** April 2026
**Status:** Core decisions locked. One item pending (backend choice).

---

## 🎯 Core Concept

A browser-based evidence-based investigation game where players act as loan officers evaluating applicants by analyzing their declared loan info against their social media footprint across four platforms.

**One-line pitch:** *"Catch the liar before you approve the loan."*

---

## ✅ Confirmed Decisions

### Play Model
- **Single mode** (no Fair Mode / Full Mode split)
- **No forced time pressure** (no countdown)
- **Stopwatch timer** (count-up, mandatory, records final time for leaderboard)

### Difficulty System
- **4 tiers**: Easy / Medium / Hard / Extreme
- **All unlocked from start** — players freely pick
- **No linear progression requirement**

### Cases (Replacing original Marco/Diana/Rafael)
| Tier | Case | Correct Verdict |
|---|---|---|
| Easy | Underage applicant | Reject |
| Medium | Pesto case | Approve |
| Hard | Wi-Fi thief | Reject |
| Extreme | HUAC case | Approve *(with heavy Reject bait)* |

**Balance:** 2 Approve + 2 Reject — kills "spam Reject" strategy.

### Verdict System
- **Binary only**: Approve / Reject
- Dropped: Approve+Monitor, Escalate

### Leaderboards
- **4 separate boards** (one per difficulty)
- **Persistent across sessions**
- Backend: *(pending — A/B/C choice)*

### Visual Identity (Locked from Figma)
- Cream background `#F5F0E6`
- Gold accent `#F0C050`
- Crimson primary `#A52424`
- Algo Pay logo + existing typography preserved
- **Folder-style platform tabs** with manila paper texture

---

## 🖼️ Screen Flow

1. **Home / Landing** — Logo, tagline, leaderboard preview, Start button
2. **Difficulty Select** — 4 cards (Easy / Medium / Hard / Extreme), all selectable
3. **Case Briefing** — Applicant dossier with declared info
4. **Investigation** — Core gameplay, 4 platform tabs, stopwatch running
5. **Verdict** — Binary Approve / Reject
6. **Score Breakdown** — Points earned, time taken, leaderboard position
7. **Consequence Story** — Wrong-verdict only email from Ate Vivien
8. **Leaderboard View** — Per-difficulty top scores

---

## 🔍 Investigation Screen Features

### Top Bar
- Algo Pay logo
- View Application button
- Evidence count badge
- Submit Verdict button (disabled until ≥1 evidence saved)
- **Stopwatch timer** (count-up display)

### Left Sidebar — Platform Tabs (Folder Style)
- Facebook, Instagram, LinkedIn, X/Twitter
- Manila paper texture with cross-hatch grain
- Active tab taller, connects seamlessly to folder body
- Inactive tabs darker, semi-transparent
- Gold unread dot on unvisited platforms

### Main Feed
- Platform-native styling (FB blue, IG gradient, LinkedIn blue, X black)
- Dense scrollable feed
- Posts include: avatar, username, timestamp, content, optional image, engagement counts

### Post Interaction
- Click to pin → opens Pin Classification Sidebar
- Pinned state: gold border + pushpin icon

### Persistent Elements
- Red flags counter strip
- Rotating Ate Vivien tips

---

## 📌 Pin Classification Sidebar

Slides in from right when post is pinned.

### Step 1 — Why is this suspicious? *(required)*
- ○ No Match / Contradiction
- ○ Misinformation
- ○ Other Red Flag

### Step 2 — Which field does it contradict? *(required)*
Chip grid pulled from Case Briefing:
- Age, Address, Employer, Position, Tenure, Income, Purpose, Dependents *(fields adjust per case)*

### Step 3 — Quick note *(optional)*
Free-text area for player's reasoning.

### Footer
- Evidence strength preview (★★★ / ★★ / ★)
- Active vouchers display
- Cancel Pin / Save Evidence buttons

---

## 🎟️ Voucher System (Shopee-Style)

Horizontal scrolling tray inside classification sidebar.

| Voucher | Effect |
|---|---|
| 🟡 Auto Checkout | Skip classification for one pin. Correct = full pts, Wrong = no penalty |
| 🟠 20% OFF Category | +20% on matching field classifications |
| 🚚 Free Shipping | Auto-fills reason OR field (not correctness-based) |
| 💸 Cashback | Caps penalty for wrong classification (e.g., −5 → −2) |
| ⚡ Flash Deal | Shows confidence % hints (visual hint only) |

**Principle:** Vouchers modify decision-making and scoring, not truth. No correctness revealed mid-game.

---

## 🎯 Verdict & Submission

- **Two buttons**: APPROVE (green) / REJECT (crimson)
- Confirmation modal before final submit
- **Stopwatch stops** on submit
- Animations (stamp-slam, etc.) flagged as **optional** — revisit later

---

## 💥 Dopamine / Animations *(All Optional — Not Final)*

- [ ] Stamp-slam submission
- [ ] Animated score reveal (line-by-line)
- [ ] Pin feedback variants (4 types)
- [ ] Rank-up cinematic
- [ ] Achievement toasts

---

## 📈 Progression Systems

### Session Score & Ranks
- 🔰 Trainee Analyst (0+)
- 🔍 Junior Investigator (50+)
- 🕵️ Field Agent (120+)
- ⭐ Senior Investigator (200+)
- 🏆 Chief Risk Officer (300+)

### Per-Difficulty Leaderboards
- 4 separate boards: Easy / Medium / Hard / Extreme
- Ranking factors: **Score** + **Time** (faster = better tiebreaker)
- Persistent across sessions
- Player enters initials or name before saving

### Optional
- [ ] Achievement badges (~10)
- [ ] Streak system
- [ ] Algo Pay Ledger (session stats)

---

## 📧 Consequence Story System

**Fires only on wrong verdicts.**

### Trigger Matrix (Binary Verdict)
| Given | Correct | Fires? | Story Type |
|---|---|---|---|
| Reject | Approve | ✅ | Wrongfully Denied |
| Approve | Reject | ✅ | Fraud Slipped Through |
| Correct | — | ❌ | Skip |

### Email Structure (Ate Vivien)
- Sender header with avatar + timestamp
- Subject line with clue hint
- Narrative body in Taglish
- Italic pullquote in gold highlight
- Impact cards: Default Loss / Fraud Ring / Trust Points
- CTAs: Review Missed Clues / Next Case

---

## 🎮 Scoring Formula

```
Final Case Score =
  (Pin Correctness × Noise Multiplier)
  + (Reason Classification Accuracy × 3)
  + (Field Targeting Accuracy × 5)
  + (Verdict Score × Confidence Modifier)
  + Explanation Bonus
  − Missed Clue Penalties
  ± Voucher Modifiers
```

### Point Values
- Strong Clue: +15
- Moderate: +8
- Weak: +4
- Red Herring: −8 (Cashback caps at −2)
- Missed Strong Clue: −5 each
- Correct reason: +3
- Correct field: +5
- Filled note bonus: +2

### Verdict Score
- Correct verdict: +30
- Wrong verdict: −10

### Time Bonus *(New — for Leaderboard)*
Faster submission = tiebreaker advantage on leaderboard ranking. Not a direct score modifier.

---

## 👥 Characters

| Character | Role | Where They Appear |
|---|---|---|
| **Ate Vivien Cruz** | Senior Risk Officer | Briefings, tips, consequence emails |
| Kuya Jun | Veteran analyst | Post-MVP |
| Bea | HR / cheerleader | Post-MVP |
| Rence | IT intern | Post-MVP |

**Voice:** Professional Taglish, warm but firm. Never mocks applicants. Always ends with encouragement.

---

## 📂 Case Content (Franco's Domain)

Each case needs:
- Applicant dossier (declared info)
- Social media posts across 4 platforms
- Classified clues (Strong / Moderate / Weak / Red Herring / Neutral)
- Consequence story (wrong-verdict email)

**Balance goal:** Each case must have ≥2 corroborating clues to justify its correct verdict. Every case includes ≥2 meaningful red herrings.

### Content Principles
1. No single post justifies a verdict — requires ≥2 corroborating clues
2. Lifestyle ≠ fraud signal (no shallow profiling)
3. Every case has ≥2 meaningful red herrings
4. No applicant is fully truthful or fully fraudulent
5. Never reward flagging based on race / class / gender
6. Flagging = verification trigger, not auto-denial

---

## 🎓 Tutorial

- Keep a tutorial, but **not blocking** — players can skip and go straight to Hard/Extreme
- Format: likely lightweight walkthrough (exact format TBD)
- Shown only on first entry, skippable

---

## 🧱 Technical Stack

- **Framework:** React 18 via Vite
- **Language:** JavaScript / JSX (no TypeScript)
- **Styling:** Plain CSS / CSS Modules (no Tailwind)
- **State:** React Context + useReducer
- **Data:** Static JSON for cases
- **Backend:** *(pending — A/B/C)*
- **Target Browsers:** Chrome 109+ / Firefox ESR 115+
- **Bundle size:** < 2MB
- **Resolution:** 1280×720 minimum
- **Runtime:** Windows XP / 7 Virtual Machine

---

## 🟡 Single Pending Decision

### Backend for Persistent Leaderboards

- **A)** Full backend (Firebase / Supabase) — free tier, cross-device scores, ~half-day setup
- **B)** Serverless (Vercel + DB)
- **C)** localStorage on booth laptop — no backend, zero cost, scores persist per machine

---

## 📐 Build Order

### Phase 1 — Foundation
1. Vite + React scaffold, design tokens
2. GameContext + reducer
3. Shared components (TopBar, PostCard, folder-style PlatformTab, Stopwatch)
4. Scoring engine

### Phase 2 — Core Loop
5. Investigation screen with 4 feeds
6. Pin Classification Sidebar
7. Voucher system
8. Binary Verdict screen
9. Score Breakdown

### Phase 3 — Content
10. Case 1 (Easy) — Underage, Reject
11. Case 2 (Medium) — Pesto, Approve
12. Case 3 (Hard) — Wi-Fi thief, Reject
13. Case 4 (Extreme) — HUAC, Approve

### Phase 4 — Leaderboards & Persistence
14. Per-difficulty leaderboard structure
15. Backend/storage integration (per decision)
16. Name entry + score submission flow

### Phase 5 — Polish
17. Consequence story system
18. Tutorial (skippable)
19. Optional dopamine animations (revisit based on time)

---

## B.5 — Visual Port Protocol (Authoritative Visual Spec)

**File:** `docs/design-reference.html`

This file is the complete visual specification. The blueprint (this doc) describes structure, data shape, and behavior. The reference file describes appearance. A component is not "done" until both have been satisfied.

### The Rule

For every component that has a matching selector in `docs/design-reference.html`:

1. Open the reference file.
2. Find the matching selector.
3. Port the CSS rules verbatim into the CSS Module.
4. Port the HTML structure into JSX, adjusting only for React syntax.
5. Do not reinvent gradients, colors, spacing, or shadows when the reference specifies them.

### Selector Map

See `.cursor/rules/vibe.mdc` for the full per-sprint selector map. The rule file is loaded on every Cursor prompt; this blueprint section is the narrative reference.

### Visual Parity Check

After every UI sprint, perform a side-by-side visual diff at 1280×720 before marking the sprint complete. Divergences beyond minor spacing tolerance → stop, re-port the CSS, re-run the diff. No exceptions.

### What the Reference Covers vs. What it Doesn't

**Covered (port verbatim):** home stats, difficulty grid, dossier gradient card, investigation topbar, folder tabs + manila texture, folder body panel, post cards, pin classification sidebar, voucher tray, verdict option cards, score breakdown, consequence email modal, leaderboard.

**Not covered (invent using tokens + vibe):** stamp-slam animation keyframes, score line-by-line reveal timing, tutorial tooltip styling, toast container styling. Flag these with `/* NOT IN design-reference.html */` comments.

---

## ✂️ Explicitly Out of Scope

- Case replay
- Mobile responsive
- Desktop-OS metaphor shell
- Office Viber chat
- Timer countdown (only stopwatch)
- Approve+Monitor / Escalate verdicts
- Linear case unlock
- Procedural case generation
- Adaptive difficulty

---

## 🎯 Success Criteria

- All 4 cases playable end to end
- Each difficulty has its own functioning leaderboard
- Wrong verdicts trigger consequence story
- Tutorial is skippable but helpful
- Game runs smoothly in VM at 1280×720
- Booth evaluators can pick any difficulty and start playing in under 20 seconds

---

*End of finalized plan. One decision remains (backend A/B/C). Everything else is locked.*
