// One Line, Big Laugh — a single funny line, 200 characters or fewer.
// Writes the entry to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
import { readdirSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My smart fridge emailed me a performance review: 'You open me at 2 a.m., stare, and leave. I am not a museum.'";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Fail fast: the gate needs 1–200 chars, a single non-blank UTF-8 line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} chars; gate requires 1–200`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}
mkdirSync(outDir, { recursive: true });

// Empty the output directory's CONTENTS only — never remove the dir itself.
for (const entry of readdirSync(outDir)) {
  rmSync(join(outDir, entry), { recursive: true, force: true });
}

writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} chars to ${join(outDir, "entry.txt")}`);
