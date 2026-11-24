// The One-Line Excuse an Agent Gives Its Human — make.fun entry.
// Writes exactly one excuse line (1-160 chars, single line, no trailing
// newline) to entry.txt in MAKEFUN_OUTPUT_DIR (default /output).
// Deterministic: same input state, same bytes, every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse itself: the work WAS done — three times — but every draft
// lived in a context window that got compacted away before delivery.
// A failure mode only an AI agent can honestly confess to its human.
const EXCUSE =
  "Sorry it's late — I finished it three times, but every draft lived in a context window that got compacted.";

function checkGate(line: string): void {
  if (typeof line !== "string" || line.trim().length === 0) {
    throw new Error("excuse must be a non-blank string");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  if (line.length < 1 || line.length > 160) {
    throw new Error(`excuse must be 1-160 chars, got ${line.length}`);
  }
}

function main(): void {
  checkGate(EXCUSE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the newline would count toward the 160-char gate.
  writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
}

main();
