// Packs makemeahanzi graphics.txt (stroke outlines, Arphic Public License) + the stroke-to-part matches of
// dictionary.txt (LGPL) into lib/translit/zhStrokes.json for the most frequent characters:
//   { char: [partOfEachStroke, [pathOfEachStroke...]] }
// partOfEachStroke is one character per stroke: the leaf part of the decomposition that stroke belongs to
// ("？" when unknown). Paths are in the 1024 box with y up: draw with scale(1,-1) translate(0,-900).
// Usage: node scripts/build-zhstrokes.mjs dictionary.txt graphics.txt hanziDB.csv [count=2500]
// (hanziDB.csv: https://github.com/ruddfawcett/hanziDB.csv, only used to pick the most frequent characters)
import { readFileSync, writeFileSync } from "node:fs";

const [dictPath, gfxPath, csvPath, countArg] = process.argv.slice(2);
const COUNT = Number(countArg ?? 2500);
const isOp = (c) => c >= "⿰" && c <= "⿿";
const ARITY = { "⿲": 3, "⿳": 3 };
function parse(ids) {
  const cs = [...ids]; let i = 0;
  const walk = () => { const c = cs[i++]; if (c === undefined) return null; if (!isOp(c)) return c;
    const parts = []; for (let k = 0; k < (ARITY[c] ?? 2); k++) { const p = walk(); if (p === null) return null; parts.push(p); } return parts; };
  const t = walk(); return i === cs.length ? t : null;
}
const dict = new Map(readFileSync(dictPath, "utf8").split("\n").filter(Boolean).map((l) => { const e = JSON.parse(l); return [e.character, e]; }));
const gfx = new Map(readFileSync(gfxPath, "utf8").split("\n").filter(Boolean).map((l) => { const e = JSON.parse(l); return [e.character, e]; }));
const freq = readFileSync(csvPath, "utf8").split("\n").slice(1).map((l) => l.split(",")[1]).filter(Boolean);
const compact = (d) => d.replace(/ ([MLQCZ])/g, "$1").replace(/([MLQCZ]) /g, "$1");
const out = {}; let bad = 0, internal = 0;
for (const ch of freq) {
  if (Object.keys(out).length >= COUNT) break;
  const e = dict.get(ch), g = gfx.get(ch);
  if (!e || !g || !e.matches || e.matches.length !== g.strokes.length) { bad++; continue; }
  const tree = parse(e.decomposition);
  const part = e.matches.map((path) => {
    if (!path || !tree) return "？";
    let n = tree;
    for (const k of path) { if (typeof n === "string") break; n = n[k]; if (n === undefined) return "？"; }
    while (typeof n !== "string") { internal++; n = n[0]; }
    return n;
  }).join("");
  out[ch] = [part, g.strokes.map(compact)];
}
writeFileSync(new URL("../lib/translit/zhStrokes.json", import.meta.url), JSON.stringify(out));
console.log(Object.keys(out).length, "characters;", bad, "skipped (no strokes or no match data);", internal, "strokes ended on a composite part");
