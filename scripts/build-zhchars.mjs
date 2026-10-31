// Packs makemeahanzi dictionary.txt (LGPL v3) into rows {char: [radical, ids, etymology?]}.
// etymology = [type, hint, phonetic, semantic] with type p (pictophonetic), i (ideographic), g (pictographic);
// empty fields are dropped from the end. Characters without a radical are skipped.
// This is the unchanged base. Rebuild data/zhChars.json with scripts/apply-patch.mjs, which calls build()
// and then applies overlay/zhChars.patch.json.
const T = { pictophonetic: "p", ideographic: "i", pictographic: "g" };

export function build(text) {
  const out = {};
  for (const line of text.split("\n")) {
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
  return out;
}
