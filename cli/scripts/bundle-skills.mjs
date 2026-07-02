import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { discoverSkills } from "../lib/install.mjs";

const cliRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(cliRoot, "..");
const skillsSrc = join(repoRoot, "skills");
const skillsDest = join(cliRoot, "skills");
const ruleSrc = join(repoRoot, "rules", "ponytail.mdc");
const ruleDest = join(cliRoot, "rules", "ponytail.mdc");

if (!existsSync(skillsSrc)) {
  console.error("error: ../skills not found (run from repo checkout)");
  process.exit(1);
}

if (existsSync(skillsDest)) {
  rmSync(skillsDest, { recursive: true, force: true });
}
mkdirSync(skillsDest, { recursive: true });

for (const skill of discoverSkills(skillsSrc)) {
  const dest = join(skillsDest, skill.rel);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(skill.srcDir, dest, { recursive: true });
  console.log(`bundled ${skill.rel}`);
}

mkdirSync(dirname(ruleDest), { recursive: true });
cpSync(ruleSrc, ruleDest, { force: true });
console.log("bundled rules/ponytail.mdc");
