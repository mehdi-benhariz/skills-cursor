#!/usr/bin/env node

import { printHelp } from "../lib/help.mjs";
import { install } from "../lib/install.mjs";

function parseArgs(argv) {
  const positional = [];
  const options = { skills: [], dryRun: false, help: false, cwd: process.cwd() };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") {
      options.help = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--cwd") {
      options.cwd = argv[++i];
      if (!options.cwd) {
        throw new Error("--cwd requires a directory");
      }
    } else if (arg === "--skill") {
      const name = argv[++i];
      if (!name) {
        throw new Error("--skill requires a name");
      }
      options.skills.push(name);
    } else if (arg.startsWith("-")) {
      throw new Error(`unknown option: ${arg}`);
    } else {
      positional.push(arg);
    }
  }

  return { positional, options };
}

function main() {
  const { positional, options } = parseArgs(process.argv.slice(2));

  if (options.help || positional.length === 0) {
    printHelp();
    return;
  }

  if (positional[0] !== "install" || positional.length > 1) {
    throw new Error(`unknown command: ${positional.join(" ")}`);
  }

  install({
    cwd: options.cwd,
    skills: options.skills.length ? options.skills : null,
    dryRun: options.dryRun,
  });
}

try {
  main();
} catch (err) {
  console.error(`error: ${err.message}`);
  process.exit(1);
}
