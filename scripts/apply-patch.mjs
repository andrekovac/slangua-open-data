// The one way to rebuild data/zhChars.json: source dictionary.txt (Make Me a Hanzi, LGPL v3) packed by
// build-zhchars.mjs, then every entry of overlay/zhChars.patch.json applied in file order.
// Usage: node scripts/apply-patch.mjs path/to/dictionary.txt           writes data/zhChars.json
//        node scripts/apply-patch.mjs path/to/dictionary.txt --check   writes nothing; exits 1 when a patch
//          entry no longer matches its source row, or when data/zhChars.json differs from the rebuild.
// A patch entry replaces the whole row: {char, kinds, before, after, why, source, confidence}.
// "before" must equal the source row exactly, so a changed source never gets patched blindly.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { build } from "./build-zhchars.mjs";

const root = new URL("../", import.meta.url);
export const PATCH = new URL("overlay/zhChars.patch.json", root);
export const OUT = new URL("data/zhChars.json", root);

export function applyPatch(base, patch) {
  const rows = structuredClone(base);
  const problems = [];
  for (const e of patch) {
    if (!(e.char in rows)) problems.push(`${e.char}: not in source`);
    else if (JSON.stringify(rows[e.char]) !== JSON.stringify(e.before)) problems.push(`${e.char}: source row changed`);
    else rows[e.char] = e.after;
  }
  return { rows, problems };
}

export function rebuild(dictPath) {
  const base = build(readFileSync(dictPath, "utf8"));
  const patch = JSON.parse(readFileSync(PATCH, "utf8"));
  return { base, patch, ...applyPatch(base, patch) };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [dictPath, flag] = process.argv.slice(2);
  if (!dictPath) { console.error("usage: node scripts/apply-patch.mjs dictionary.txt [--check]"); process.exit(2); }
  const { rows, problems, patch } = rebuild(dictPath);
  const json = JSON.stringify(rows);
  if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
  if (flag === "--check") {
    if (readFileSync(OUT, "utf8") !== json) { console.error("data/zhChars.json differs from the rebuild"); process.exit(1); }
    console.log(`ok: ${patch.length} patch entries match the source, data/zhChars.json is current`);
  } else {
    writeFileSync(OUT, json);
    console.log(Object.keys(rows).length, "characters,", patch.length, "patched");
  }
}
