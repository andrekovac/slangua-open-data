// Builds the helper lists in lists/ from data/zhChars.json (after the patch) and the Unihan database.
// Usage: node scripts/build-lists.mjs path/to/Unihan-folder   (unzipped https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip)
// lists/needs-review.json is written by hand and not touched here.
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const d = JSON.parse(readFileSync(new URL("data/zhChars.json", root), "utf8"));
const uni = process.argv[2];
const hex = (h) => String.fromCodePoint(parseInt(h, 16));
const rs = {}, trad = {};
for (const l of readFileSync(uni + "/Unihan_IRGSources.txt", "utf8").split("\n")) {
  const m = l.match(/^U\+(\w+)\tkRSUnicode\t(.*)/); if (m) rs[hex(m[1])] = m[2].split(" ");
}
for (const l of readFileSync(uni + "/Unihan_Variants.txt", "utf8").split("\n")) {
  const m = l.match(/^U\+(\w+)\tkTraditionalVariant\t(.*)/);
  if (m) { const c = hex(m[1]); const t = m[2].split(" ").map((x) => hex(x.slice(2))); if (t.some((x) => x !== c)) trad[c] = t; }
}
const IDC = /[⿰-⿿？]/u;
const leaves = (ids) => [...ids].filter((c) => !IDC.test(c));
const json = (o) => "{\n" + Object.entries(o).map(([k, v]) => JSON.stringify(k) + ": " + JSON.stringify(v)).join(",\n") + "\n}\n";
const write = (name, o) => { writeFileSync(new URL("lists/" + name, root), json(o)); console.log(name, Object.keys(o).length); };

// radical forms that count as the same part (position variants and simplified forms)
const GROUPS = ["人亻", "水氵", "心忄⺗", "手扌", "火灬", "刀刂", "犬犭", "示礻", "衣衤", "玉王", "肉月⺼", "艸艹", "辵辶", "邑阝", "阜阝",
  "言讠", "金钅釒", "食饣飠", "糸纟糹", "网罒⺲", "竹⺮", "爪爫", "攴攵", "老耂", "牛牜", "足⻊", "乙乚", "小⺌⺍", "卩㔾", "夂夊", "彐⺕彑"];
const V = {}; for (const g of GROUPS) for (const c of g) V[c] = new Set(g);
const same = (a, b) => a === b || (V[a] && V[a].has(b));

// 1. single-stroke radical that is not a part of the decomposition
const STROKES = new Set([..."一丨丶丿乙乚乛亅"]);
const stroke = {};
for (const [c, [rad, ids]] of Object.entries(d)) if (STROKES.has(rad) && c !== rad && !leaves(ids).includes(rad)) stroke[c] = rad;
write("strokeRadical.json", stroke);

// 2. radical not a direct part, but inside one: {char: the direct part that holds the radical}
const holds = (part, rad, seen = new Set()) => {
  if (same(part, rad)) return true; if (seen.has(part)) return false; seen.add(part);
  const r = d[part]; return !!(r && r[1] && leaves(r[1]).some((l) => holds(l, rad, seen)));
};
const nested = {};
for (const [c, [rad, ids]] of Object.entries(d)) {
  if (!ids || c === rad || STROKES.has(rad) || leaves(ids).some((l) => same(l, rad))) continue;
  const p = leaves(ids).find((l) => holds(l, rad)); if (p) nested[c] = p;
}
write("nestedRadical.json", nested);

// 3. radical differs from the Kangxi radical (Unihan kRSUnicode) of the traditional form, or of the character
//    itself when it has no traditional form: the modern (simplified) radical table, or the source's own choice.
const FORMS = { "⺼": "130", "⺮": "118", "王": "96", "丷": "12", "㔾": "26", "⺌": "42", "⺊": "25", "肀": "129", "耂": "125", "⺳": "122",
  "⺗": "61", "旡": "71", "炏": "86", "龶": "96", "阝": "163 170", "母": "80", "虎": "141", "釒": "167" };
const num = (c) => FORMS[c] ? FORMS[c].split(" ") : (rs[c.normalize("NFKC")] ?? rs[c] ?? []).filter((x) => x.endsWith(".0")).map((x) => x.split(".")[0].replace(/'+$/, ""));
const kx = (c) => (rs[c] ?? []).map((x) => x.split(".")[0].replace(/'+$/, ""));
const kxChar = (n) => String.fromCodePoint(0x2f00 + Number(n) - 1).normalize("NFKC");
const modern = {};
for (const [c, [rad]] of Object.entries(d)) {
  if (c === rad) continue;
  const from = trad[c] ?? [c];
  const want = from.flatMap(kx); if (!want.length) continue;
  if (num(rad).some((n) => want.includes(n))) continue;
  modern[c] = { radical: rad, kangxi: [...new Set(want)].map(kxChar).join(""), from: from.join("") };
}
write("modernRadical.json", modern);
