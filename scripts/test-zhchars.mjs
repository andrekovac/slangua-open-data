// Checks the overlay. Usage: node scripts/test-zhchars.mjs path/to/dictionary.txt (no dependencies)
import { readFileSync, readdirSync } from "node:fs";
import { rebuild, OUT } from "./apply-patch.mjs";

const { base, patch, rows, problems } = rebuild(process.argv[2]);
const fail = [];
const ok = (cond, msg) => { if (!cond) fail.push(msg); };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const isStr = (x) => typeof x === "string";

ok(!problems.length, "patch does not apply: " + problems.join(", "));
ok(same(Object.keys(rows), Object.keys(base)), "rows were added, removed or reordered");
ok(readFileSync(OUT, "utf8") === JSON.stringify(rows), "data/zhChars.json is not the rebuild of source + patch");

const seen = new Set();
for (const e of patch) {
  const c = e.char, a = e.after, b = e.before;
  ok(!seen.has(c), `${c}: more than one entry`); seen.add(c);
  ok(isStr(e.why) && e.why.trim() && isStr(e.source) && e.source.trim(), `${c}: missing why or source`);
  ok(typeof e.confidence === "number" && e.confidence > 0 && e.confidence <= 1, `${c}: confidence not in (0, 1]`);
  ok(Array.isArray(e.kinds) && e.kinds.length && e.kinds.every((k) => ["fix", "note", "histPhonetic"].includes(k)), `${c}: bad kinds`);
  ok(!same(a, b), `${c}: after equals before`);
  // positions: 0 radical, 1 ids, 2 etymology (or null), 3 optional extra object
  ok(isStr(a[0]) && a[0] && isStr(a[1]), `${c}: radical or ids is not a string`);
  ok(a.length >= b.length && a.length <= 4, `${c}: row length shrank or grew past 4`);
  if (b.length > 2) ok(Array.isArray(a[2]) && a[2].length === b[2].length && a[2][0] === b[2][0], `${c}: etymology shape changed`);
  else ok(a.length === 2 || a[2] === null, `${c}: index 2 must be null when the source has no etymology`);
  if (a.length === 4) {
    const x = a[3];
    ok(x && typeof x === "object" && !Array.isArray(x) && Object.keys(x).every((k) => k === "note" || k === "histPhonetic"), `${c}: bad index 3`);
    if (x.note) ok(["kind", "shown", "was", "why"].every((k) => isStr(x.note[k]) && x.note[k]), `${c}: note needs kind, shown, was, why`);
    if ("histPhonetic" in x) ok(isStr(x.histPhonetic) && x.histPhonetic, `${c}: empty histPhonetic`);
  }
  // only "fix" entries may change the source fields
  if (!e.kinds.includes("fix")) ok(same(a.slice(0, 2), b.slice(0, 2)) && same(a[2] ?? null, b[2] ?? null), `${c}: a note-only entry changed source fields`);
}
for (const [c, r] of Object.entries(rows)) if (!seen.has(c)) ok(same(r, base[c]), `${c}: changed without a patch entry`);

// no em dashes in anything we wrote
for (const f of ["README.md", "REPORT.md", "overlay/zhChars.patch.json", "licenses/zhChars.LICENSE.md", ...readdirSync(new URL("../lists", import.meta.url)).map((x) => "lists/" + x)])
  ok(!readFileSync(new URL("../" + f, import.meta.url), "utf8").includes("—"), `${f}: contains an em dash`);

const n = (k) => patch.filter((e) => e.kinds.includes(k)).length;
console.log(`rows ${Object.keys(rows).length}, patched ${patch.length}: fix ${n("fix")}, note ${n("note")}, histPhonetic ${n("histPhonetic")}`);
if (fail.length) { console.error("FAIL\n" + fail.join("\n")); process.exit(1); }
console.log("all checks pass");
