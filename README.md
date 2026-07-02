# Cursor Skills

Agent skills and rules for [Cursor](https://cursor.com), installed per-repo via `skills-cursor`.

Based on [Matt Pocock's skills](https://github.com/mattpocock/skills). See [CONTRIBUTORS.md](./CONTRIBUTORS.md) for attribution.

## Quickstart

From any repo:

```bash
npx skills-cursor install
```

Or from a local checkout of this repo:

```bash
node cli/bin/skills-cursor.mjs install
```

This copies skills to `.cursor/skills/` and the ponytail rule to `.cursor/rules/ponytail.mdc`. Skills under `personal/`, `in-progress/`, and `deprecated/` are skipped.

Then in Cursor, run **`/setup-matt-pocock-skills`** once to scaffold per-repo config (issue tracker, triage labels, domain docs).

### CLI options

```bash
skills-cursor -h
skills-cursor install --skill tdd --skill grill-me
skills-cursor install --cwd ../my-app --dry-run
```

## Repo layout

| Path | Purpose |
|------|---------|
| [`skills/`](skills/) | Skill source (edit here) |
| [`rules/`](rules/) | Cursor rule source |
| [`cli/`](cli/) | `skills-cursor` installer |

Generated locally (gitignored): `.cursor/skills/`, `.cursor/rules/`. Re-run `install` after pulling skill changes.

## Contributing

1. Add or edit skills under the right bucket in [`skills/`](skills/):
   - `engineering/` — daily code work
   - `productivity/` — non-code workflow
   - `misc/` — occasional tools
   - `personal/`, `in-progress/`, `deprecated/` — not installed by the CLI
2. List new **published** skills in this README and in the bucket's [`README.md`](skills/engineering/README.md).
3. Run `node cli/bin/skills-cursor.mjs install` in this repo to dogfood.
4. Run `npm test` in [`cli/`](cli/).

Add your name to [CONTRIBUTORS.md](./CONTRIBUTORS.md) when you land a change.

## Reference

### Engineering

- **[diagnose](./skills/engineering/diagnose/SKILL.md)** — Disciplined diagnosis loop: reproduce → minimise → hypothesise → instrument → fix → regression-test.
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)** — Grilling session that sharpens terminology and updates `CONTEXT.md` and ADRs inline.
- **[triage](./skills/engineering/triage/SKILL.md)** — Triage issues through a state machine of triage roles.
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** — Find deepening opportunities informed by `CONTEXT.md` and `docs/adr/`.
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)** — Scaffold per-repo config the other engineering skills consume. Run once per repo.
- **[tdd](./skills/engineering/tdd/SKILL.md)** — Red-green-refactor, one vertical slice at a time.
- **[to-issues](./skills/engineering/to-issues/SKILL.md)** — Break a plan or PRD into independently-grabbable issues.
- **[to-prd](./skills/engineering/to-prd/SKILL.md)** — Turn conversation context into a PRD as a GitHub issue.
- **[zoom-out](./skills/engineering/zoom-out/SKILL.md)** — Broader context on an unfamiliar section of code.
- **[prototype](./skills/engineering/prototype/SKILL.md)** — Throwaway prototype to flush out a design.

### Productivity

- **[caveman](./skills/productivity/caveman/SKILL.md)** — Ultra-compressed communication mode.
- **[grill-me](./skills/productivity/grill-me/SKILL.md)** — Relentless interview until the decision tree is resolved.
- **[write-a-skill](./skills/productivity/write-a-skill/SKILL.md)** — Create new skills with proper structure.

### Ponytail

Lazy senior dev mode — simplest solution that works.

- **[ponytail](./skills/ponytail/SKILL.md)** — YAGNI ladder, intensity levels (`lite` / `full` / `ultra`).
- **[ponytail-help](./skills/ponytail-help/SKILL.md)** — Quick-reference for ponytail commands.
- **[ponytail-audit](./skills/ponytail-audit/SKILL.md)** — Audit code for over-engineering.
- **[ponytail-debt](./skills/ponytail-debt/SKILL.md)** — Track intentional simplifications marked with `ponytail:` comments.
- **[ponytail-review](./skills/ponytail-review/SKILL.md)** — Review a diff through the ponytail lens.

The **`ponytail.mdc`** rule in [`rules/`](rules/ponytail.mdc) is installed to `.cursor/rules/` on every `install`.

### Misc

- **[git-guardrails-claude-code](./skills/misc/git-guardrails-claude-code/SKILL.md)** — Block dangerous git commands via hooks (Claude Code; not Cursor).
- **[migrate-to-shoehorn](./skills/misc/migrate-to-shoehorn/SKILL.md)** — Migrate `as` assertions to @total-typescript/shoehorn.
- **[scaffold-exercises](./skills/misc/scaffold-exercises/SKILL.md)** — Exercise directory structures.
- **[setup-pre-commit](./skills/misc/setup-pre-commit/SKILL.md)** — Husky + lint-staged + Prettier.

## License

MIT — see [LICENSE](./LICENSE). Original skill content © Matt Pocock.
