---
description: Prohibit destructive or remote git operations without explicit per-action user permission
globs: ["**/*"]
alwaysApply: true
---

# Rule: git-safety

Agents must never push to a remote, rewrite history, or perform destructive git operations without the user explicitly authorising that specific action in the current conversation.

---

## Prohibited without explicit per-action user instruction

- `git push` (any form, any remote, any branch)
- `git push --force` / `git push --force-with-lease`
- `git commit --amend`
- `git rebase` (interactive or otherwise)
- `git reset --hard`
- `git clean -f` / `git clean -fd`

---

## Allowed without asking

- `git status`, `git diff`, `git log` — read-only inspection
- `git add` — staging changes
- `git commit` — creating a local commit (stays local until explicitly pushed)
- `git stash` — local stash operations
- `npx gitnexus analyze` / `npx gitnexus status` — index maintenance

---

## Required behaviour when a prohibited command is needed

1. **Stop.** Do not run the command.
2. **Describe** exactly what you want to do and why (e.g. "I'd like to push the current branch `main` to `origin` to publish the last 2 commits.").
3. **Wait** for the user to respond with an explicit instruction (e.g. "yes, push", "go ahead", "push it").
4. Only then run the command.

If the user's instruction is ambiguous (e.g. "push that"), confirm the exact command before running.

---

## Never do

- NEVER push to `main` or `master` with `--force` under any circumstances, even if the user says "just force push it" — respond with a warning about overwriting remote history and ask them to confirm once more.
- NEVER amend a commit that has already been pushed to a remote branch.
- NEVER run `git reset --hard` without first showing the user what commits or changes will be discarded.
