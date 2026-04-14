# SPRINT 1.1 SETUP AUDIT REPORT

**Audit Date:** 2026-04-14T04:00:00Z
**Sprint Audited:** 1.1 — Scaffold + Design Tokens
**Verdict:** 🟡 YELLOW

---

## EXECUTIVE SUMMARY

- Blockers (🔴): 0
- Majors (🟠): 3
- Minors (🟡): 5
- Passes (🟢): 30

**Proceed to Sprint 1.2?**
🟡 YELLOW — zero blockers, three majors → fix majors first (or consciously accept with written justification), then proceed.

---

## TOP FINDINGS

1. [🟠 MAJOR] React version is 19.2.x, not 18.x as specified — `package.json` line 14 — downgrade to `react@^18` and `react-dom@^18` or update the blueprint to accept v19.
2. [🟠 MAJOR] `@types/react` and `@types/react-dom` are present as devDependencies — `package.json` lines 21–22 — these are TypeScript type packages; the blueprint explicitly forbids `@types/*` as a direct dependency.
3. [🟠 MAJOR] `App.jsx` imports from `./pages/*` (seven page files) which do exist, but `App.jsx` has already wired full routing including `<BrowserRouter>` — this is Sprint 1.2 work delivered one sprint early. Not a blocker (the pages exist and the build passes), but it's out-of-sprint scope. Flag for Sprint 1.2 prompt to skip routing setup.

---

## SECTION 1 — VITE + REACT SCAFFOLD

| Check | Expected | Actual | Verdict |
|---|---|---|---|
| `package.json` exists | yes | yes | 🟢 |
| `vite.config.js` exists | yes | yes | 🟢 |
| `index.html` exists at root | yes | yes | 🟢 |
| `src/main.jsx` exists | yes | yes | 🟢 |
| `src/App.jsx` exists | yes | yes | 🟢 |
| React version | 18.x | 19.2.5 | 🟠 MAJOR |
| `type: "module"` in package.json | yes | yes (line 5) | 🟢 |
| `dev` script present | yes | `"dev": "vite"` | 🟢 |
| `build` script present | yes | `"build": "vite build"` | 🟢 |
| `preview` script present | yes | `"preview": "vite preview"` | 🟢 |
| `test` script present | yes | `"test": "vitest"` | 🟢 |

**Finding:** React is at `19.2.5` (`react@^19.2.4` in `package.json` line 14). Sprint 1.1 spec targets React 18.x. React 19 is a major version bump with breaking changes in some APIs (`createRoot` behavior, StrictMode double-invocation, act() wrapping). The app builds and runs without error at this stage, but alignment with the blueprint's stated version (`React 18`) is a spec violation. Severity: 🟠 MAJOR — the project works now, but if any Sprint 4–6 libraries target React 18 peer deps, this will cause peer-dep conflicts.

---

## SECTION 2 — NO TYPESCRIPT ANYWHERE

| Check | Result | Verdict |
|---|---|---|
| `.ts` files in `src/` | 0 files found | 🟢 |
| `.tsx` files in `src/` | 0 files found | 🟢 |
| `tsconfig*.json` at root | not present | 🟢 |
| `typescript` in dependencies | not found | 🟢 |
| `@types/react` in devDeps | **present** (`^19.2.14`, line 21) | 🟠 MAJOR |
| `@types/react-dom` in devDeps | **present** (`^19.2.3`, line 22) | 🟠 MAJOR |

**Finding:** No `.ts`/`.tsx` files exist and `typescript` itself is not installed. However, `@types/react` and `@types/react-dom` are present as direct devDependencies. These are TypeScript type definition packages. The blueprint says no TypeScript; the `.cursor/rules/vibe.mdc` rule says no `@types/*`. They do not cause a build error (Vite ignores them in a JSX-only project), but they are a spec violation and signal TypeScript creep. Remove them.

---

## SECTION 3 — DEPENDENCIES AUDIT

| Package | Expected Status | Actual Status | Verdict |
|---|---|---|---|
| `react` | present, 18.x | present, 19.2.5 | 🟠 MAJOR |
| `react-dom` | present, 18.x | present, 19.2.5 | 🟠 MAJOR |
| `react-router-dom` | present | present, 7.14.0 | 🟢 |
| `@supabase/supabase-js` | present | present, 2.103.0 | 🟢 |
| `vite` | devDep | present (devDep), 8.0.8 | 🟢 |
| `@vitejs/plugin-react` | devDep | present (devDep), 6.0.1 | 🟢 |
| `vitest` | devDep | present (devDep), 4.1.4 | 🟢 |
| `@testing-library/react` | devDep | present (devDep), 16.3.2 | 🟢 |
| `typescript` | absent | absent | 🟢 |
| `@types/react` | absent | **present** (devDep) | 🟠 MAJOR |
| `@types/react-dom` | absent | **present** (devDep) | 🟠 MAJOR |
| `tailwindcss` | absent | absent | 🟢 |
| `postcss` | absent as direct dep | absent | 🟢 |
| `framer-motion` | absent | absent | 🟢 |
| `redux` / `@reduxjs/toolkit` | absent | absent | 🟢 |
| `react-redux` | absent | absent | 🟢 |
| `zustand` | absent | absent | 🟢 |
| `styled-components` | absent | absent | 🟢 |
| `@emotion/react` | absent | absent | 🟢 |

**Note on react-router-dom v7:** Installed is `react-router-dom@7.14.0`. This is a major version above the more common v6; the Blueprint does not specify a version. The import API is compatible with what `App.jsx` uses (`BrowserRouter`, `Routes`, `Route`), so no issue.

**Note on Vite v8:** Installed is `vite@8.0.8`. Blueprint does not specify a Vite version. Vite 8 works correctly — build produced clean output.

---

## SECTION 4 — FOLDER STRUCTURE

Directories found under `src/`:
```
src/assets
src/components
src/components/investigation
src/components/layout
src/components/ui
src/context
src/data
src/data/cases
src/hooks
src/lib
src/pages
src/styles
src/types
```

Blueprint Part B.1 expected directories vs. actual:

| Directory | Expected | Actual | Verdict |
|---|---|---|---|
| `src/` | yes | yes | 🟢 |
| `src/components/` | yes | yes | 🟢 |
| `src/components/shared/` | yes | **missing** | 🟡 MINOR |
| `src/components/landing/` | yes | **missing** | 🟡 MINOR |
| `src/components/select/` | yes | **missing** | 🟡 MINOR |
| `src/components/briefing/` | yes | **missing** | 🟡 MINOR |
| `src/components/investigation/` | yes | yes | 🟢 |
| `src/components/verdict/` | yes | **missing** | 🟡 MINOR |
| `src/components/results/` | yes | **missing** | 🟡 MINOR |
| `src/context/` | yes | yes | 🟢 |
| `src/data/` | yes | yes | 🟢 |
| `src/data/cases/` | yes | yes | 🟢 |
| `src/lib/` | yes | yes | 🟢 |
| `src/routes/` | yes | **missing** | 🟡 MINOR |
| `src/scoring/` | yes | **missing** | 🟡 MINOR |
| `src/styles/` | yes | yes | 🟢 |
| `src/types/` | yes | yes | 🟢 |
| `supabase/` | yes | yes | 🟢 |

**Bonus directories (not in blueprint, not a problem):**
- `src/assets/` — fine
- `src/components/layout/`, `src/components/ui/` — fine, subset of `shared/` intent
- `src/hooks/` — fine
- `src/pages/` — used by `App.jsx` routing (Sprint 1.2-ahead work)

**Finding:** 7 of the specified sub-directories under `src/components/` are absent (`shared/`, `landing/`, `select/`, `briefing/`, `verdict/`, `results/`), plus `src/routes/` and `src/scoring/` are absent. All are trivially created with `mkdir`. Sprint 1.1 spec says these should exist even if empty. Severity: 🟡 MINOR for each — easy to create, no breakage.

---

## SECTION 5 — DESIGN TOKENS (tokens.css)

File: `src/styles/tokens.css`
Scoped under: `:root` ✓

| Token | Expected | Actual (line) | Verdict |
|---|---|---|---|
| `--cream` | `#F5F0E6` | `#F5F0E6` (line 3) | 🟢 |
| `--gold` | `#F0C050` | `#F0C050` (line 4) | 🟢 |
| `--crimson` | `#A52424` | `#A52424` (line 5) | 🟢 |
| `--ink` | `#1C1A17` | `#1C1A17` (line 6) | 🟢 |
| `--paper` | `#FAF6EE` | `#FAF6EE` (line 7) | 🟢 |
| `--fb-blue` | `#1877F2` | `#1877F2` (line 10) | 🟢 |
| `--ig-pink` | `#E1306C` | `#E1306C` (line 11) | 🟢 |
| `--li-blue` | `#0A66C2` | `#0A66C2` (line 12) | 🟢 |
| `--x-black` | `#000000` | `#000000` (line 13) | 🟢 |
| `--approve-green` | `#1E8449` | `#1E8449` (line 16) | 🟢 |
| `--reject-red` | `#A52424` | `#A52424` (line 17) | 🟢 |
| `--font-display` | `"Inter", system-ui, sans-serif` | `"Inter", system-ui, sans-serif` (line 20) | 🟢 |
| `--font-body` | `"Inter", system-ui, sans-serif` | `"Inter", system-ui, sans-serif` (line 21) | 🟢 |
| `--font-mono` | `"JetBrains Mono", ui-monospace, monospace` | `"JetBrains Mono", ui-monospace, monospace` (line 22) | 🟢 |
| `--stagger` | `120ms` | `120ms` (line 25) | 🟢 |
| `--stamp-duration` | `800ms` | `800ms` (line 26) | 🟢 |
| `--radius-sm` | `4px` | `4px` (line 29) | 🟢 |
| `--radius-md` | `8px` | `8px` (line 30) | 🟢 |
| `--radius-lg` | `12px` | `12px` (line 31) | 🟢 |

**All 19 tokens present with exact values. `:root` scoping confirmed. Full PASS.**

---

## SECTION 6 — GLOBAL CSS (global.css)

File: `src/styles/global.css`

| Check | Expected | Actual | Verdict |
|---|---|---|---|
| `@import` for Google Fonts at TOP | yes, line 1 | yes, line 1 | 🟢 |
| `box-sizing: border-box` reset | yes | `*,*::before,*::after { box-sizing: border-box; }` (lines 3–7) | 🟢 |
| `html` sets `font-family: var(--font-body)` | yes | yes (line 10) | 🟢 |
| `body` sets `background: var(--cream)` | yes | `background: var(--cream)` (line 17) | 🟢 |
| `body` sets `color: var(--ink)` | yes | `color: var(--ink)` (line 18) | 🟢 |
| `body` sets `margin: 0` | yes | yes (line 16) | 🟢 |
| Uses `var()` tokens (not raw hex) | yes | yes — all via `var(--*)` | 🟢 |

**Inter import:** `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap')` at line 1. Also loads JetBrains Mono. Correct and well-positioned.

**Full PASS.** Global CSS is clean and complete.

---

## SECTION 7 — ANIMATIONS.CSS

File: `src/styles/animations.css`

Content: `/* Sprint 3 + 6 fills this file — stamp, score reveal, pin feedback, rank-up animations */`

Exists: yes. Non-empty (contains a header comment). Will be populated in Sprint 3 and Sprint 6 as specified.

**🟢 PASS.**

---

## SECTION 8 — main.jsx IMPORT ORDER

File: `src/main.jsx`

```
Line 1: import './styles/tokens.css'
Line 2: import './styles/global.css'
Line 3: import './styles/animations.css'
Line 5: import { StrictMode } from 'react'
Line 6: import { createRoot } from 'react-dom/client'
Line 7: import App from './App.jsx'
Line 9: createRoot(document.getElementById('root')).render(...)
```

| Check | Expected | Actual | Verdict |
|---|---|---|---|
| Imports React + createRoot | yes | yes (lines 5–6) | 🟢 |
| Imports `./styles/tokens.css` | yes | yes (line 1) | 🟢 |
| Imports `./styles/global.css` AFTER tokens | yes | yes (line 2, after line 1) | 🟢 |
| Imports `./styles/animations.css` | yes | yes (line 3) | 🟢 |
| Renders `<App />` into `#root` | yes | yes (line 9) | 🟢 |
| No `<GameProvider>` wrapper | correct for 1.1 | absent | 🟢 |
| No router wrapper | correct for 1.1 | absent | 🟢 |

**Critical import order confirmed:** tokens.css (line 1) loads before global.css (line 2). CSS custom properties are defined before they are consumed.

**Full PASS.**

---

## SECTION 9 — App.jsx PLACEHOLDER

File: `src/App.jsx`

State: Sprint 1.2 work already done — full routing with `<BrowserRouter>`, `<Routes>`, and seven `<Route>` entries importing from `./pages/*`.

| Check | Status | Verdict |
|---|---|---|
| File exists | yes | 🟢 |
| No syntax errors | clean (build passed) | 🟢 |
| No imports from missing files | all 7 page files exist | 🟢 |
| Sprint 1.1 minimal placeholder state | **NOT minimal** — routing already wired | 🟡 MINOR |

**Finding:** `App.jsx` is in "Acceptable state B" per the audit spec — routing added early. All imports resolve (verified by the successful build). This is out-of-sprint scope but not breaking. Sprint 1.2 prompt should be adjusted to skip the routing setup step, as it is already complete.

---

## SECTION 10 — VITE CONFIG

File: `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.jsx'],
    setupFiles: [],
  },
})
```

| Check | Expected | Actual | Verdict |
|---|---|---|---|
| Exports Vite config | yes | yes | 🟢 |
| React plugin registered | `plugins: [react()]` | yes (line 5) | 🟢 |
| Port 5173 or not set (= default) | either | not set (uses default 5173) | 🟢 |
| `build.target` for browser targets | optional bonus | not set | 🟢 (Sprint 6 item) |

**Bonus:** `test.environment: 'jsdom'` and `test.globals: true` are already configured for Vitest. This is correct and forward-compatible.

**Full PASS.**

---

## SECTION 11 — DEV SERVER SMOKE TEST

Command: `npm run dev` — started successfully in 223ms at `http://localhost:5173/`

HTTP check: `Invoke-WebRequest http://localhost:5173` → **HTTP 200** ✓

Build output: `vite v8.0.8 ready in 223ms`

**🟢 PASS.** Dev server starts and responds with HTTP 200.

**Manual checks required from human — see section below.**

---

## SECTION 12 — BUILD SMOKE TEST

Command: `npm run build`
Exit code: **0**

Output:
```
vite v8.0.8 building client environment for production...
✓ 33 modules transformed.
dist/index.html          0.48 kB │ gzip: 0.32 kB
dist/assets/index-DrBO3va6.css   0.98 kB │ gzip: 0.59 kB
dist/assets/index-ExNr9VN_.js  232.63 kB │ gzip: 74.34 kB
✓ built in 213ms
```

dist/ contents: `index.html`, `assets/index-DrBO3va6.css`, `assets/index-ExNr9VN_.js`, `favicon.svg`, `icons.svg`

No errors, no warnings. JS bundle is 232KB raw / 74KB gzip — well under the 2MB bundle-size target.

**🟢 PASS.**

---

## SECTION 13 — NODE MODULES HYGIENE

| Check | Result | Verdict |
|---|---|---|
| `node_modules/.bin/vite` exists | True | 🟢 |
| `node_modules/.bin/vitest` exists | True | 🟢 |
| `node_modules/react/package.json` exists | True | 🟢 |
| Lockfile present | `package-lock.json` found | 🟢 |
| Exactly one lockfile | only `package-lock.json` | 🟢 |

**Full PASS.** All binaries installed. Single lockfile (`package-lock.json`).

---

## SECTION 14 — GITIGNORE CHECK

File: `.gitignore`

| Check | Expected | Actual | Verdict |
|---|---|---|---|
| `node_modules/` excluded | yes | yes (line 24) | 🟢 |
| `dist/` excluded | yes | yes (line 25) | 🟢 |
| `.env.local` excluded | yes | `.env.local` (line 3) + `.env.*.local` (line 4) | 🟢 |
| `.DS_Store` excluded | nice to have | yes (line 8) | 🟢 |
| `.env` itself excluded | recommended | yes (line 2) | 🟢 |

**Full PASS.** `.gitignore` is comprehensive — also covers `Thumbs.db`, `desktop.ini`, editor swap files, and `.gitnexus/`.

---

## SECTION 15 — VISUAL PORT PROTOCOL STATUS

| Check | Result | Verdict |
|---|---|---|
| `.cursor/rules/vibe.mdc` exists | yes | 🟢 |
| `docs/design-reference.html` exists | yes | 🟢 |
| `vibe.mdc` has Locked Stack block | yes | 🟢 |
| `vibe.mdc` has Visual Port Protocol block | yes | 🟢 |
| `design-reference.html` contains full CSS | yes (all component selectors present) | 🟢 |

**🟢 PASS.** Visual Port Protocol patch is fully applied. Both files are present and complete.

---

## SECTION 16 — OUT-OF-SPRINT FILES

Files that exist but belong to Sprint 1.2 or later:

| File | Sprint | Exists | Notes |
|---|---|---|---|
| `src/types/shapes.js` | Sprint 1.2 | yes | JSDoc typedefs — Sprint 1.2 work done early |
| `src/lib/supabase.js` | Sprint 1.2 | yes | Supabase client — Sprint 1.2 work done early |
| `src/lib/session.js` | Sprint 1.2 | yes | Session utilities — Sprint 1.2 work done early |
| `src/lib/share.js` | Sprint 1.2 | yes | Share utilities — Sprint 1.2 work done early |
| `src/context/GameContext.jsx` | Sprint 2 | yes | Game context — Sprint 2 work done early |
| `src/context/gameReducer.js` | Sprint 2 | no | Not yet present |
| `supabase/schema.sql` | Sprint 1.2 | yes | DB schema — Sprint 1.2 work done early |
| `src/routes/Landing.jsx` | Sprint 1.2 | no | Not yet present |
| `.env.local` | Sprint 4 | no | Not present — correct |
| `src/pages/HomePage.jsx` | Sprint 1.2 | yes | Routing pages exist — Sprint 1.2 ahead |
| `src/pages/DifficultySelectPage.jsx` | Sprint 1.2 | yes | Same |
| `src/pages/CaseBriefingPage.jsx` | Sprint 1.2 | yes | Same |
| `src/pages/InvestigationPage.jsx` | Sprint 1.2 | yes | Same |
| `src/pages/VerdictPage.jsx` | Sprint 1.2 | yes | Same |
| `src/pages/ScoreBreakdownPage.jsx` | Sprint 1.2 | yes | Same |
| `src/pages/LeaderboardPage.jsx` | Sprint 1.2 | yes | Same |

**All are 🟡 MINOR** — none break the build (build passed, HTTP 200 confirmed). Multiple sprint boundaries were crossed early but consistently. Sprint 1.2 prompt should treat these as already done and skip duplicating them.

---

## PRIORITIZED FIX LIST

### Fix #1 [🟠 MAJOR] — React version mismatch
**Finding:** `react@19.2.5` and `react-dom@19.2.5` are installed. Blueprint specifies React 18.x. `vibe.mdc` locked stack says "React 18 via Vite."
**File:** `package.json` lines 14–15
**Cause:** Vite scaffold default (as of 2026) targets React 19. Blueprint pre-dates this.
**Fix (Option A — downgrade):** `npm install react@^18 react-dom@^18` then verify build passes.
**Fix (Option B — accept v19):** Update blueprint (`docs/loan-investigator-final-plan.md`) and `vibe.mdc` to say "React 18 or 19." React 19 is backwards-compatible for all APIs this project uses (`createRoot`, `StrictMode`, hooks). The project already builds and runs cleanly on v19.
**Verification:** `npm ls react` should show `18.x` (Option A) or blueprint updated to accept v19 (Option B).

### Fix #2 [🟠 MAJOR] — `@types/react` and `@types/react-dom` present
**Finding:** TypeScript type packages are direct devDependencies despite the stack being plain JSX.
**File:** `package.json` lines 21–22
```json
"@types/react": "^19.2.14",
"@types/react-dom": "^19.2.3",
```
**Cause:** Vite scaffold template includes them by default for IDE intellisense. They don't break the build but violate the "no `@types/*`" rule in `vibe.mdc`.
**Fix:** Remove them: `npm uninstall @types/react @types/react-dom`
**Verification:** `npm ls | grep @types` should return empty.

### Fix #3 [🟠 MAJOR] — Missing blueprint directory scaffold
**Finding:** 8 directories specified in Blueprint Part B.1 do not exist.
**Directories:**
- `src/components/shared/`
- `src/components/landing/`
- `src/components/select/`
- `src/components/briefing/`
- `src/components/verdict/`
- `src/components/results/`
- `src/routes/`
- `src/scoring/`
**Cause:** Cursor created alternative structures (`src/pages/`, `src/components/ui/`, `src/components/layout/`) that partially overlap but diverge from the blueprint naming.
**Fix:** Create the missing directories. Use `.gitkeep` files if needed to track them in git:
```bash
mkdir -p src/components/shared src/components/landing src/components/select src/components/briefing src/components/verdict src/components/results src/routes src/scoring
```
**Note:** The `src/pages/` structure already in place may conflict with `src/routes/` in later sprints. Decide whether to consolidate into one pattern before Sprint 2.
**Verification:** `find src -type d | sort` matches the blueprint list.

---

## MANUAL CHECKS (ASK HUMAN)

Cursor cannot verify these — you must confirm in the browser:

- [ ] Open `http://localhost:5173` — does the page load without a white screen?
- [ ] Is the background color cream (`#F5F0E6`) and not white (`#FFFFFF`)?
- [ ] Open browser console (F12 → Console tab) — are there zero errors?
- [ ] Open Network tab — do you see a request to `fonts.googleapis.com` for Inter + JetBrains Mono?
- [ ] Refresh the page — does it remain stable (no flash of white, no hydration errors)?

---

## PRE-SPRINT-1.2 CHECKLIST

Before proceeding to Sprint 1.2, confirm:

- [ ] Resolve Fix #1: decide React 18 vs. 19 — either downgrade or update blueprint
- [ ] Resolve Fix #2: remove `@types/react` and `@types/react-dom`
- [ ] Resolve Fix #3: create missing directories (or document accepted deviation from blueprint)
- [ ] Manual browser check complete (see above)
- [ ] Confirm Sprint 1.2 prompt will SKIP: routing setup (already done), page stubs (already done), `src/types/shapes.js` (already done), `src/lib/supabase.js` / `session.js` / `share.js` (already done), `supabase/schema.sql` (already done)
- [ ] Commit current state: `git commit -m "Sprint 1.1 complete, audit passed"`

---

## AUDITOR NOTES

1. **The scaffold is functionally sound.** The build passes clean (exit 0, no errors), the dev server runs at HTTP 200, all CSS tokens are correct with the right hex values, import order is correct. The app will render a cream background on first load.

2. **Sprint boundary discipline was not followed.** Multiple Sprint 1.2 and 2 deliverables were produced ahead of schedule (`GameContext`, page stubs, routing, lib files, schema). This is common when Cursor runs multiple sprints in a single session. It is not harmful here — the files build successfully — but it means Sprint 1.2 and parts of Sprint 2 are partially or fully complete. The Sprint 1.2 prompt must be adjusted to account for what already exists.

3. **`src/pages/` vs. `src/routes/` naming conflict.** The blueprint spec says `src/routes/` (matching the route table R1–R7). The implementation uses `src/pages/`. These are the same thing by different names. Before Sprint 2, decide on one canonical location and update `App.jsx` import paths accordingly. Recommendation: keep `src/pages/` (already in use) and note the deviation in the blueprint.

4. **React 19 vs. 18.** React 19 is fully compatible with everything this project does. The only practical risk is peer-dependency conflicts if any future library (e.g., `@testing-library/react` version constraints, animation libraries) declares `peerDependencies: { react: "^18" }`. At present, `@testing-library/react@16.3.2` supports React 19. This is low risk but should be a conscious decision.

5. **`@types/react` is harmless but sloppy.** JSX files in a Vite project get no TypeScript checking regardless of whether `@types/react` is installed. Remove it to stay spec-compliant.
