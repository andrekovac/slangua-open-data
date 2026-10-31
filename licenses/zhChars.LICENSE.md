# zhChars.json

Data from Make Me a Hanzi `dictionary.txt` (https://github.com/skishore/makemeahanzi), which is derived from
Unihan (https://unicode.org/charts/unihan.html) and CJKlib (https://github.com/cburgmer/cjklib). The project
releases `dictionary.txt` under the GNU Lesser General Public License v3 or later
(https://www.gnu.org/licenses/lgpl-3.0.html). The stroke data (`graphics.txt`, Arphic Public License) is NOT used.

This file is a changed (shortened) copy: for each character only the radical (部首), the decomposition
(Ideographic Description Sequence) and the origin (type, hint, sound part, meaning part) are kept, in a compact
array form. Built by `scripts/build-zhchars.mjs`. The changed data stays under the LGPL v3. It is plain data
in its own file: you can rebuild it from the source with the script and swap it.
The credit line is shown in Settings > Licenses (components/account/LicensesSheet.tsx).

## Notice of change: correction overlay (2026-10-31)

Since 2026-10-31, `data/zhChars.json` is the shortened copy described above with a correction overlay on top.
What changed, when and how:

- **How:** `scripts/apply-patch.mjs` packs the source `dictionary.txt` with `scripts/build-zhchars.mjs` (unchanged
  base) and then replaces single rows as listed in `overlay/zhChars.patch.json`. Each entry keeps the source row
  (`before`), the new row (`after`), the reason (`why`), the reference used (`source`) and a `confidence`. An entry
  is only applied when `before` still equals the source row. `scripts/test-zhchars.mjs` checks all of this.
- **What (77 rows):** 38 rows fixed (wrong radical, a part that is not in the character, 日 written for 曰, sound or
  meaning parts in the wrong script, empty or garbled fields); 11 rows get a `note` (a part that looks like another
  one, for example 冃 written as 日); 29 rows get a `histPhonetic` (the old sound part that the simplified form no
  longer shows). One row has both a fix and a `histPhonetic`.
- **Format:** the array positions of the source stay the same (0 radical, 1 decomposition, 2 etymology). New
  information is an optional object at index 3. When a row has no etymology but needs index 3, index 2 is `null`.
- **When:** 2026-10-31, source `dictionary.txt` with SHA-256
  `744bb05d5b0742e9ee35c37791f94d56a173349b3367569e7ca11e510364d203`.

The corrections are our own wording, based on Shuowen Jiezi, the Kangxi radical system and the Unihan database
(Unicode, https://www.unicode.org/license.txt). No text from Wiktionary or other share-alike sources was copied.
The overlay and the changed data stay under the LGPL v3 or later, like the source.
The files in `lists/` are helper lists derived from the data (and from Unihan for `modernRadical.json`).
