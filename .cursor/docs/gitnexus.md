# GitNexus — Reference

This project is indexed by GitNexus as **AlgoPayLater**. Use the MCP tools below to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in the terminal first.

---

## Tools quick reference

| Tool | When to use | Example |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

---

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/AlgoPayLater/context` | Codebase overview, check index freshness |
| `gitnexus://repo/AlgoPayLater/clusters` | All functional areas |
| `gitnexus://repo/AlgoPayLater/processes` | All execution flows |
| `gitnexus://repo/AlgoPayLater/process/{name}` | Step-by-step execution trace |
| `gitnexus://repo/AlgoPayLater/schema` | Graph schema for Cypher queries |

---

## Impact risk levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

---

## Keeping the index fresh

After committing code changes, re-run analyze to update the index:

```bash
npx gitnexus analyze
```

To preserve previously generated embeddings:

```bash
npx gitnexus analyze --embeddings
```

Check `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). Running `analyze` without `--embeddings` will delete any previously generated embeddings.

---

## Skill files (globally installed)

| Task | Skill |
|------|-------|
| Understand architecture / "How does X work?" | `gitnexus-exploring` |
| Blast radius / "What breaks if I change X?" | `gitnexus-impact-analysis` |
| Trace bugs / "Why is X failing?" | `gitnexus-debugging` |
| Rename / extract / split / refactor | `gitnexus-refactoring` |
| Tools, resources, schema reference | `gitnexus-guide` |
| Index, status, clean, wiki CLI commands | `gitnexus-cli` |
