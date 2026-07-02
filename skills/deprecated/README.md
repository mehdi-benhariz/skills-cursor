# Deprecated

Skills I no longer use. **Not installed** by `skills-cursor install`.

## Cursor setup

Repo: [github.com/mehdi-benhariz/skills-cursor](https://github.com/mehdi-benhariz/skills-cursor)

Install skills + ponytail rule into any project:

```bash
git clone https://github.com/mehdi-benhariz/skills-cursor.git
node skills-cursor/cli/bin/skills-cursor.mjs install --cwd /path/to/your-repo
```

From a checkout of that repo (install into cwd):

```bash
node cli/bin/skills-cursor.mjs install
```

Copies skills to `.cursor/skills/` and `rules/ponytail.mdc` to `.cursor/rules/ponytail.mdc`. Skips `personal/`, `in-progress/`, and this `deprecated/` bucket.

Then in Cursor run **`/setup-matt-pocock-skills`** once (issue tracker, triage labels, domain docs).

```bash
skills-cursor -h
skills-cursor install --skill tdd --skill grill-me
skills-cursor install --cwd ../my-app --dry-run
```

After npm publish: `npx skills-cursor install`.

---

- **[design-an-interface](./design-an-interface/SKILL.md)** — Generate multiple radically different interface designs for a module using parallel sub-agents.
- **[qa](./qa/SKILL.md)** — Interactive QA session where user reports bugs conversationally and the agent files GitHub issues.
- **[request-refactor-plan](./request-refactor-plan/SKILL.md)** — Create a detailed refactor plan with tiny commits via user interview, then file it as a GitHub issue.
- **[ubiquitous-language](./ubiquitous-language/SKILL.md)** — Extract a DDD-style ubiquitous language glossary from the current conversation.
