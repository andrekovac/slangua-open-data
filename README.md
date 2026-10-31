# slangua-open-data

Open data used in the Slangua app (https://slangua.com), in the changed form the app uses, with the scripts that
made it and the license texts. Shared here because the licenses of the sources ask for it.

| File | Source | License |
| --- | --- | --- |
| `data/cedict.json` | CC-CEDICT (https://www.mdbg.net/chinese/dictionary?page=cc-cedict), shortened | CC BY-SA 4.0 |
| `data/zhChars.json` | Make Me a Hanzi `dictionary.txt` (https://github.com/skishore/makemeahanzi), shortened | LGPL 3.0 or later |
| `data/zhStrokes.json` | Make Me a Hanzi `graphics.txt` + stroke-to-part matches, 1,200 most frequent characters | Arphic Public License |

What we changed, how, and when is written in `licenses/*.LICENSE.md` (each file starts with the notice of change,
the Arphic Public License text is in `licenses/zhStrokes.LICENSE.md`). `scripts/` rebuilds each file from the public source.
The Slangua app code is not part of this repository and is not under these licenses.

## zhChars.json: correction overlay

`data/zhChars.json` is the Make Me a Hanzi data plus a small, traceable overlay. The source stays the base; every
change is one row in `overlay/zhChars.patch.json` with `before`, `after`, `why`, `source` and `confidence`.
Nothing is changed without an entry, and an entry only applies while its `before` still equals the source row.

Row format: `char: [radical, ids, etymology, extra?]`.

- Index 0 to 2 are the same as in the source (etymology = `[type, hint, phonetic, semantic]`).
- Index 3 is new and optional: `{note?: {kind, shown, was, why}, histPhonetic?: string}`. Old app code ignores it.
  - `note`: a part that is written like another one, for example 最 shows 日 but the part was 冃.
  - `histPhonetic`: the historical sound part that the (mostly simplified) form no longer shows, for example 场 and 昜.
- When a row has no etymology but has index 3, index 2 is `null`.

Rebuild (one way, needs Node 18+, no dependencies). Download `dictionary.txt` from
https://github.com/skishore/makemeahanzi to a folder outside this repo, then:

```bash
node scripts/apply-patch.mjs /path/to/dictionary.txt           # writes data/zhChars.json
node scripts/apply-patch.mjs /path/to/dictionary.txt --check   # fails if an entry no longer matches the source
node scripts/test-zhchars.mjs /path/to/dictionary.txt          # all checks + counts
node scripts/build-lists.mjs /path/to/Unihan                   # lists/ (unzipped Unihan.zip from unicode.org)
```

Helper lists in `lists/` (no data change):

| File | What |
| --- | --- |
| `needs-review.json` | possible corrections we were not sure enough to make, with a guess and a confidence |
| `strokeRadical.json` | radical is a single stroke (一 丨 丶 丿 乙 ...) that is not a part of the decomposition |
| `nestedRadical.json` | radical sits inside a part that the decomposition does not split: `{char: that part}` (修: 攸) |
| `modernRadical.json` | radical differs from the Kangxi radical of the traditional form (modern simplified radical table, or the source's own choice) |

`REPORT.md` lists every change for a human reviewer. The overlay is under the LGPL v3 or later like the data; the
notice of change is in `licenses/zhChars.LICENSE.md`.
