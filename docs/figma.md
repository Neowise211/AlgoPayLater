# Figma — Design reference

This document covers how to use the Figma MCP with Algo Pay: Loan Investigator, and serves as the central reference for design files once they exist.

---

## Using the Figma MCP

The Figma MCP is connected to this workspace. To translate a design into code:

1. Copy a Figma frame or component URL (e.g. `https://www.figma.com/design/:fileKey/:fileName?node-id=:nodeId`)
2. Paste it into Cursor Agent chat with an instruction like:
   - *"Build this screen as a JSX component"*
   - *"What components make up this frame?"*
   - *"Get the design context for this node"*
3. The agent will call `get_design_context`, read the screenshot and code hints, and translate to **plain JSX + plain CSS** per [`.cursor/rules/figma.md`](.cursor/../.cursor/rules/figma.md).

**Important:** The MCP defaults to React + Tailwind. The project rule overrides this — all output will be adapted to plain JSX + plain CSS automatically.

---

## Design files

<!-- Add your Figma file URLs here when designs are created -->

| Screen | Figma URL | Status |
|---|---|---|
| Case desk (main game screen) | _not yet created_ | Pending |
| Applicant profile panel | _not yet created_ | Pending |
| Social feed panel | _not yet created_ | Pending |
| VerdictStamp interaction | _not yet created_ | Pending |
| Consequence / memo screen | _not yet created_ | Pending |
| Shift intro / loading screen | _not yet created_ | Pending |

---

## Visual language reference

When creating or evaluating Figma designs for this project, apply these principles:

### Tone
- Dark, bureaucratic, detective-noir. Think government office at night, not a fintech dashboard.
- Surfaces should feel aged or institutional — dark backgrounds, muted greys, off-white for text.

### Typography
- Data fields (income, debts, loan amount): monospace or condensed serif — feels like a form.
- Navigation and labels: clean sans-serif, small and understated.
- Avoid decorative or display typefaces.

### Colour palette (proposed — not final)
| Role | Description |
|---|---|
| Background | Very dark grey or near-black |
| Surface | Dark grey (desk surface, panels) |
| Text primary | Off-white or aged paper white |
| Text secondary | Medium grey |
| Accent / alert | Muted red or amber (for clue highlighting) |
| Stamp — Approve | Deep green or olive |
| Stamp — Reject | Deep red or crimson |

### Interaction
- The **VerdictStamp** is the hero element — it should have visual mass and feel physical.
- The **FeedPost** panel is secondary — slightly smaller, slightly darker than the profile panel.
- No rounded corners, card shadows, or bright hover states unless the frame explicitly has them.

---

## Design guardrails

Before implementing any Figma frame, verify it against:

- [ ] [`docs/overview.md`](overview.md) — does the screen match an described game screen?
- [ ] [`.cursor/rules/game-design-guardrails.md`](../.cursor/rules/game-design-guardrails.md) — does it preserve detective tone and stamp mechanic?
- [ ] [`docs/content-model.md`](content-model.md) — do any data fields match the proposed JSON shapes?

---

## Token architecture

All design tokens extracted from Figma live in a single file: `src/globals.css` (created in Sprint 1). This is the only place where raw values (hex codes, pixel sizes, font strings) are permitted to exist.

### Namespace

All tokens use the `--brand-[category]-[name]` pattern:

| Category | Prefix | Example |
|---|---|---|
| Colors | `--brand-color-*` | `--brand-color-bg`, `--brand-color-stamp-approve` |
| Spacing | `--brand-space-*` | `--brand-space-sm`, `--brand-space-xl` |
| Border radius | `--brand-radius-*` | `--brand-radius-panel` |
| Typography | `--brand-font-*` | `--brand-font-data`, `--brand-font-ui` |
| Shadows | `--brand-shadow-*` | `--brand-shadow-panel` |

### Extraction workflow

Tokens are extracted from Figma during **Sprint 1**. See [docs/sprint-roadmap.md](sprint-roadmap.md) for the full workflow and Composer prompt.

The proposed default token values are documented in `.cursor/rules/vibe-governance.md`. These are overridden by the actual Figma values during Sprint 1.

### Rule

No component stylesheet may contain a raw hex code, pixel value, or font string. All values must reference `var(--brand-*)`. See `.cursor/rules/vibe-governance.md` — Principle 3 for the full constraint.

---

## Code Connect (future)

Once the React component library is built, Figma Code Connect can be configured to map Figma components directly to their codebase counterparts. This eliminates guesswork when the MCP reads a design. Setup instructions will be added here when the application scaffolding task is complete.
