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
