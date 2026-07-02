import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import test from "node:test";
import { discoverSkills, install } from "./install.mjs";
import { skillsRoot } from "./roots.mjs";

test("discoverSkills excludes personal, in-progress, deprecated", () => {
  const skills = discoverSkills(skillsRoot());
  const rels = skills.map((s) => s.rel);

  assert.ok(rels.some((r) => r === "engineering/tdd"));
  assert.ok(rels.some((r) => r === "ponytail"));
  assert.ok(!rels.some((r) => r.startsWith("personal/")));
  assert.ok(!rels.some((r) => r.startsWith("in-progress/")));
  assert.ok(!rels.some((r) => r.startsWith("deprecated/")));
});

test("discoverSkills --skill filter by name", () => {
  const skills = discoverSkills(skillsRoot()).filter((s) => s.name === "tdd");
  assert.equal(skills.length, 1);
  assert.equal(skills[0].rel, "engineering/tdd");
});

test("install copies skills and ponytail rule", () => {
  const dir = mkdtempSync(join(tmpdir(), "skills-cursor-test-"));
  try {
    install({ cwd: dir, skills: ["tdd"], dryRun: false });

    const skillMd = join(dir, ".cursor", "skills", "engineering", "tdd", "SKILL.md");
    const rule = join(dir, ".cursor", "rules", "ponytail.mdc");

    assert.ok(readFileSync(skillMd, "utf8").includes("tdd"));
    assert.ok(readFileSync(rule, "utf8").includes("Ponytail"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("install dry-run includes ponytail rule", () => {
  const dir = mkdtempSync(join(tmpdir(), "skills-cursor-test-"));
  const logs = [];
  const original = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  try {
    install({ cwd: dir, skills: ["tdd"], dryRun: true });
    assert.ok(logs.some((line) => line.includes("engineering/tdd")));
    assert.ok(logs.some((line) => line.includes("ponytail.mdc")));
  } finally {
    console.log = original;
    rmSync(dir, { recursive: true, force: true });
  }
});
