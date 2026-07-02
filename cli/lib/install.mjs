import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { ponytailRuleSrc, skillsRoot } from "./roots.mjs";

const EXCLUDED = new Set(["personal", "in-progress", "deprecated"]);

export function discoverSkills(root) {
  const found = [];

  function walk(dir) {
    if (existsSync(join(dir, "SKILL.md"))) {
      const rel = relative(root, dir);
      const bucket = rel.split(/[/\\]/)[0];
      if (EXCLUDED.has(bucket)) {
        return;
      }
      found.push({
        name: rel.split(/[/\\]/).pop(),
        rel,
        srcDir: dir,
      });
      return;
    }

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory() && entry.name !== "node_modules") {
        walk(join(dir, entry.name));
      }
    }
  }

  walk(root);
  return found.sort((a, b) => a.rel.localeCompare(b.rel));
}

export function install({ cwd = process.cwd(), skills = null, dryRun = false } = {}) {
  const target = resolve(cwd);
  const root = skillsRoot();
  const ruleSrc = ponytailRuleSrc();
  const ruleDest = join(target, ".cursor", "rules", "ponytail.mdc");
  const only = skills?.length ? new Set(skills) : null;

  let discovered = discoverSkills(root);
  if (only) {
    discovered = discovered.filter((s) => only.has(s.name));
  }

  const actions = [
    ...discovered.map((s) => ({
      kind: "skill",
      src: s.srcDir,
      dest: join(target, ".cursor", "skills", s.rel),
      label: s.rel,
    })),
    {
      kind: "rule",
      src: ruleSrc,
      dest: ruleDest,
      label: ".cursor/rules/ponytail.mdc",
    },
  ];

  if (!existsSync(ruleSrc)) {
    throw new Error(`ponytail rule not found: ${ruleSrc}`);
  }

  for (const action of actions) {
    if (dryRun) {
      console.log(`would install ${action.label}`);
      continue;
    }
    mkdirSync(join(action.dest, ".."), { recursive: true });
    if (action.kind === "rule") {
      cpSync(action.src, action.dest, { force: true });
    } else {
      cpSync(action.src, action.dest, { recursive: true, force: true });
    }
    console.log(`installed ${action.label}`);
  }

  return { installed: actions.length, skills: discovered.length };
}
