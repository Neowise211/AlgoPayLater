# Sprint roadmap — Algo Pay: Loan Investigator

Four sequential build sprints, each with a scope definition and a Cursor Composer-ready prompt. Open Composer (`Ctrl+I`) and paste the prompt for each sprint when you are ready to begin.

Stack: React 18 + Vite, plain JS/JSX, plain CSS, static JSON.
Design source: Figma MCP (connected).
Governance: `.cursor/rules/vibe-governance.md`, `.cursor/rules/figma.md`.

---

## Sprint 1 — Token Extraction (Foundation)

**Goal:** Extract all design tokens from Figma and map them into a single `globals.css` file as CSS custom properties. Build no screens. End with a visual style-guide component to preview the token set.

**Deliverables:**
- `src/globals.css` — all `--brand-*` tokens (colors, spacing, radius, typography, shadows)
- `src/components/StyleGuide.jsx` — a dev-only preview page rendering all tokens
- Vite app scaffolded and running (`npm run dev` works)

**Rules to follow:**
- Every Figma colour, spacing value, and type style → one CSS custom property in `globals.css`
- No hex codes, pixel values, or font strings anywhere except `globals.css`
- If a token is ambiguous or missing from Figma, flag it with a `/* TODO: confirm with Figma */` comment

---

**Composer prompt — Sprint 1:**

> Analyse the Figma file at [PASTE FIGMA FILE URL HERE]. Extract all design tokens: colours, border-radius values, spacing scale, typography (font families, sizes, weights), and shadows. Map every token into `src/globals.css` as CSS custom properties using the naming pattern `--brand-[category]-[name]` (e.g. `--brand-color-bg`, `--brand-space-md`). Do not build any screens. After creating `globals.css`, scaffold a minimal Vite + React 18 project (plain JS/JSX, plain CSS, no TypeScript, no Tailwind) and create a `src/components/StyleGuide.jsx` page that renders a visual preview of every token — colour swatches, spacing blocks, typography samples, shadow samples. The style guide is a dev tool only.

---

## Sprint 2 — Adaptive Scaffold (The Case Desk)

**Goal:** Build the primary game screen — the Case Desk — using Figma as the vibe reference. Implement the layout with flex/grid (not absolute positioning). Wire to placeholder/static data.

**Deliverables:**
- `src/components/CaseDesk.jsx` + `src/styles/case-desk.css`
- `src/components/ApplicantProfile.jsx` + `src/styles/applicant-profile.css`
- `src/components/FeedPanel.jsx` + `src/styles/feed-panel.css`
- `src/components/VerdictStamp.jsx` + `src/styles/verdict-stamp.css`
- All components wired to a single hardcoded placeholder Case object

**Rules to follow:**
- All colours, spacing, and type via `var(--brand-*)` — zero hardcoded values
- Layout: flex/grid, not absolute positioning. Match the Figma vibe (proportion, weight), not the pixel coordinates
- VerdictStamp must have a CSS transition press-down effect (`transform: scale()`, `ease-in` down, `ease-out` up)
- FeedPanel is visually secondary — smaller, darker surface than ApplicantProfile
- No game logic yet — clicking the stamp just logs to console

---

**Composer prompt — Sprint 2:**

> Using the tokens already in `src/globals.css` and the Figma design at [PASTE CASE DESK FRAME URL], build the primary Case Desk screen. Components needed: `CaseDesk` (the container), `ApplicantProfile` (declared financial data panel), `FeedPanel` (social media posts panel), `VerdictStamp` (the approve/reject mechanic). Use the Figma design for visual reference — spacing, proportions, surface tones, stamp shape — but implement all layouts with CSS flex or grid, not fixed heights or absolute positioning. All styles must use `var(--brand-*)` tokens from `globals.css`. Zero hardcoded colours or pixel values. The VerdictStamp must have a physical press-down CSS transition (scale down on mousedown, scale up on mouseup, ease-in/ease-out). Wire all components to a single hardcoded placeholder Case object — no real data loading yet. Plain JSX and plain CSS only. No TypeScript, no Tailwind.

---

## Sprint 3 — Logical Core (The Brain)

**Goal:** Wire the UI to real game data. Implement the full core loop: load a Case from static JSON, support clue tagging, and handle VerdictStamp to produce a Verdict. The game should be playable end-to-end with at least one authored Case.

**Deliverables:**
- `src/data/cases.json` — at least one fully authored Case (per `docs/content-model.md` schema)
- `src/hooks/useCase.js` — loads and manages the active Case
- `src/hooks/useVerdict.js` — tracks the player's verdict decision and clue tags
- `VerdictStamp` triggers a real verdict (APPROVE / REJECT) and transitions to a consequence screen
- `src/components/ConsequenceScreen.jsx` — brief post-verdict screen showing downstream effect

**Rules to follow:**
- Data shapes must match the schemas in `docs/content-model.md` exactly
- No backend — all data from static JSON files
- Supabase integration is deferred to a future phase
- Every Case must include at least one genuine FeedPost vs. declared-data contradiction (per `docs/overview.md`)
- The stamp is the only verdict input — no buttons or menus

---

**Composer prompt — Sprint 3:**

> The UI shell from Sprint 2 is complete. Now implement the core game logic. First, author at least one complete Case in `src/data/cases.json` following the schema in `docs/content-model.md` — the Case must include a realistic contradiction between the Applicant's declared income/occupation and at least one FeedPost. Then: create `src/hooks/useCase.js` to load and manage the active Case; create `src/hooks/useVerdict.js` to track clue tags and the final verdict decision; wire the VerdictStamp so that pressing APPROVE or REJECT records a Verdict and transitions to a `ConsequenceScreen` component (a brief diegetic consequence, no score, no moral judgment). All data from static JSON — no backend, no Supabase. All styles still use `var(--brand-*)` tokens. Plain JSX only.

---

## Sprint 4 — Vibe Polish (Micro-interactions)

**Goal:** Audit the build against Figma. Add physical micro-interactions, hover/active states, and the final atmospheric touches that make the game feel like a real detective tool, not a web form.

**Deliverables:**
- VerdictStamp slam animation with full motion arc (not just scale — consider a brief rotation or ink-splat CSS effect)
- FeedPost scroll feel — smooth, slightly weighted (CSS `scroll-behavior` or a lightweight motion library if CSS alone is insufficient)
- Clue-tagging visual feedback — a subtle amber highlight on tagged posts
- Optional: a global atmospheric layer (CSS noise/grain overlay, subtle flicker on the desk lamp, typewriter tick on data fields)
- All hover/active states verified against Figma interactive patterns

**Rules to follow:**
- Try CSS-only first. Introduce a motion library only if the effect genuinely cannot be achieved with CSS transitions/animations
- If a motion library is added, update `CLAUDE.md` and `docs/overview.md` to reflect it
- Atmospheric effects must be opt-out — a `prefers-reduced-motion` media query must disable all non-essential animations
- Do not add new tokens without updating `globals.css`

---

**Composer prompt — Sprint 4:**

> Audit the current build against the Figma design at [PASTE FIGMA FILE URL]. Add micro-interactions and atmospheric polish: (1) upgrade the VerdictStamp slam to a full physical motion arc — a brief downward lunge with a slight rotation, held for 150ms, then a slow lift; (2) add a subtle amber highlight (`var(--brand-color-clue)`) to FeedPosts when tagged as a clue; (3) add hover/active states to all interactive elements matching the Figma interactive patterns; (4) optionally add a CSS noise grain overlay to the desk surface for noir atmosphere. All animations must respect `prefers-reduced-motion`. Use CSS transitions and `@keyframes` first — only propose adding a motion library if you cannot achieve the effect with CSS alone. All colour values must come from `globals.css` tokens.

---

## Status tracker

| Sprint | Status | Figma URL | Notes |
|---|---|---|---|
| 1 — Token Extraction | Not started | — | Run after app scaffolding task |
| 2 — Adaptive Scaffold | Not started | — | Requires Sprint 1 complete |
| 3 — Logical Core | Not started | — | Requires Sprint 2 complete |
| 4 — Vibe Polish | Not started | — | Requires Sprint 3 complete |
