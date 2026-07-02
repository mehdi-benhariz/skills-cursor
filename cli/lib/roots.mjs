import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const cliRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

export function packageRoot() {
  const devSkills = join(cliRoot, "..", "skills", "engineering");
  if (existsSync(devSkills)) {
    return join(cliRoot, "..");
  }
  return cliRoot;
}

export function skillsRoot() {
  const root = join(packageRoot(), "skills");
  if (!existsSync(root)) {
    throw new Error("skills directory not found");
  }
  return root;
}

export function ponytailRuleSrc() {
  return join(packageRoot(), "rules", "ponytail.mdc");
}
