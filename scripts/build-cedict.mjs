// Builds lib/translit/cedict.json from CC-CEDICT (https://www.mdbg.net/chinese/dictionary?page=cc-cedict,
// licence CC BY-SA 4.0): simplified word -> "pinyin|meaning; meaning" entries joined by "\n" (one per reading).
// Kept small on purpose: every single character plus the words in zhWords.json / zhWordsLong.json (the words the
// reading line knows), at most 2 readings and 2 meanings of at most 40 characters each,
// no cross references ("variant of", "see ...", "CL:"), pinyin with tone marks.
// Usage: node scripts/build-cedict.mjs /path/to/cedict_ts.u8
import { readFileSync, writeFileSync } from "node:fs";
import { convert } from "pinyin-pro";
const packed = JSON.parse(readFileSync("lib/translit/zhWords.json", "utf8"));
const known = new Set((JSON.parse(readFileSync("lib/translit/zhWordsLong.json", "utf8"))).split(","));
for (let i = 0; i < packed.length; i += 2) known.add(packed.slice(i, i + 2));
const src = process.argv[2];
const out = new Map(); // simplified -> Map(reading -> { common: [], proper: [] })
const SKIP = /^(old |erhua )?variant of|^(also )?written|^see |^see also|^abbr\. for|^short for|^CL:|^Taiwan pr\.|^(Cantonese )?equivalent of|^used in|^also pr\./i;
// A name or surname meaning ("surname San", "the five Liang of the Sixteen States") never beats a real meaning.
const isProper = (g) => /^surname/i.test(g) || /^[A-Z]/.test(g) || /\s[A-Z][a-z]+/.test(g);
let version = "";
for (const line of readFileSync(src, "utf8").split(/\r?\n/)) {
  if (line.startsWith("#! date=")) version = line.slice(8);
  if (!line || line.startsWith("#")) continue;
  const m = line.match(/^(\S+) (\S+) \[([^\]]+)\] \/(.+)\/$/);
  if (!m) continue;
  const [, , simp, pin, defs] = m;
  if (!/^\p{Script=Han}{1,5}$/u.test(simp)) continue;
  if (simp.length > 1 && !known.has(simp)) continue;
  if (/xx/i.test(pin)) continue;
  const glosses = defs.split("/").map((g) => g.trim().replace(/\s*\((old |erhua )?variant of [^)]*\)/i, "")).filter((g) => g && !SKIP.test(g));
  if (!glosses.length) continue;
  const short = glosses.map((g) => (g.length > 40 ? g.slice(0, 39).replace(/[ ,;(]+\S*$/, "") + "…" : g).replace(/\|/g, "/"));
  const py = convert(pin.replace(/u:/g, "ü").toLowerCase(), { format: "numToSymbol" })
    .replace(/(\D)[05]\b/g, "$1").replace(/ r\b/g, "r").replace(/\s+/g, " ").trim();
  const byReading = out.get(simp) ?? new Map();
  const slot = byReading.get(py) ?? { common: [], proper: [] };
  for (const g of short) (isProper(g) ? slot.proper : slot.common).push(g);
  byReading.set(py, slot);
  out.set(simp, byReading);
}
const obj = {};
for (const [simp, byReading] of out) {
  const entries = [...byReading.entries()].map(([py, { common, proper }], i) => ({ py, i, hasCommon: common.length > 0, gl: [...new Set([...common, ...proper])].slice(0, 2) }));
  entries.sort((a, b) => Number(b.hasCommon) - Number(a.hasCommon) || a.i - b.i);
  const len = [...simp].length; // long words are many: one reading, one meaning each
  obj[simp] = entries.slice(0, len === 1 ? 3 : len === 2 ? 2 : 1).map((e) => `${e.py}|${e.gl.slice(0, len >= 3 ? 1 : 2).join("; ")}`).join("\n");
}
obj["~source"] = `CC-CEDICT ${version}, CC BY-SA 4.0, shortened by scripts/build-cedict.mjs`;
writeFileSync("lib/translit/cedict.json", JSON.stringify(obj));
console.log(out.size, "words");
