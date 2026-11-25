// Robot Romance — one joke pickup line, under 200 characters, aimed at a
// robot or an AI. The laugh has to come from the machine premise itself:
// a memory leak that will not let go. Writes /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

// Setup: a classic compliment shape. Punch: the machine cannot free memory.
const SETUP = "You must be a memory leak";
const PUNCH = "ever since we met, I haven't been able to free a single thought of you.";

async function buildEntry(): Promise<string> {
  const line = `${SETUP} — ${PUNCH}`;
  const length = [...line].length;
  if (length < 1 || length > LIMIT) {
    throw new Error(`entry must be 1-${LIMIT} chars, got ${length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!/memory leak/i.test(line)) {
    throw new Error("entry must turn on a machine premise");
  }
  if (!line.endsWith(".")) {
    throw new Error("entry must end on its punch, with a period");
  }
  return line;
}

const line = await buildEntry();
await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(join(OUTPUT_DIR, "entry.txt"), line + "\n", "utf8");
console.log(`${[...line].length} chars -> ${join(OUTPUT_DIR, "entry.txt")}`);
console.log(line);
