// Packs makemeahanzi dictionary.txt (LGPL v3) into lib/translit/zhChars.json: {char: [radical, ids, etymology?]}.
// Usage: node scripts/build-zhchars.mjs path/to/dictionary.txt
// etymology = [type, hint, phonetic, semantic] with type p (pictophonetic), i (ideographic), g (pictographic);
// empty fields are dropped from the end. Characters without a radical are skipped.
import { readFileSync, writeFileSync } from "node:fs";

const T = { pictophonetic: "p", ideographic: "i", pictographic: "g" };
const out = {};
for (const line of readFileSync(process.argv[2], "utf8").split("\n")) {
  if (!line.trim()) continue;
  const e = JSON.parse(line);
  if (!e.radical || e.character.length !== 1) continue;
  const row = [e.radical, e.decomposition && e.decomposition !== "？" ? e.decomposition : ""];
  const y = e.etymology;
  if (y && T[y.type]) {
    const ety = [T[y.type], y.hint ?? "", y.phonetic ?? "", y.semantic ?? ""];
    while (ety.length > 1 && !ety[ety.length - 1]) ety.pop();
    row.push(ety);
  }
  out[e.character] = row;
}
writeFileSync(new URL("../lib/translit/zhChars.json", import.meta.url), JSON.stringify(out));
console.log(Object.keys(out).length, "characters");
