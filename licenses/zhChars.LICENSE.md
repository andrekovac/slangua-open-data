# zhChars.json

Data from Make Me a Hanzi `dictionary.txt` (https://github.com/skishore/makemeahanzi), which is derived from
Unihan (https://unicode.org/charts/unihan.html) and CJKlib (https://github.com/cburgmer/cjklib). The project
releases `dictionary.txt` under the GNU Lesser General Public License v3 or later
(https://www.gnu.org/licenses/lgpl-3.0.html). The stroke data (`graphics.txt`, Arphic Public License) is NOT used.

This file is a changed (shortened) copy: for each character only the radical (部首), the decomposition
(Ideographic Description Sequence) and the origin (type, hint, sound part, meaning part) are kept, in a compact
array form. Built by `scripts/build-zhchars.mjs`. The changed data stays under the LGPL v3. It is plain data
in its own file: you can rebuild it from the source with the script and swap it.
The credit line is shown in the footer of Settings (`zhChar.source`, components/account/AppFooter.tsx).
