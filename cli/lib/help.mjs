export function printHelp() {
  console.log(`Usage: skills-cursor install [options]

Install Cursor skills and the ponytail rule into the current repo.

Commands:
  install           Copy skills to .cursor/skills/ and ponytail.mdc to .cursor/rules/

Options:
  --cwd <dir>       Target repo (default: cwd)
  --skill <name>    Install only named skills (repeatable)
  --dry-run         Show actions without writing
  -h, --help        Show this help

Examples:
  skills-cursor install
  skills-cursor install --skill tdd --skill grill-me
  skills-cursor install --cwd ../my-app --dry-run`);
}
