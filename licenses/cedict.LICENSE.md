# cedict.json

Data from CC-CEDICT, the community maintained free Chinese-English dictionary
(https://www.mdbg.net/chinese/dictionary?page=cc-cedict), released under the
Creative Commons Attribution-ShareAlike 4.0 International licence
(https://creativecommons.org/licenses/by-sa/4.0/).

This file is a changed (shortened and filtered) copy: only single characters and the words in
`zhWords.json` / `zhWordsLong.json`, at most 2 readings and 2 meanings per word, cross references
removed, pinyin with tone marks. Built by `scripts/build-cedict.mjs`; the version of the source file is
in the `~source` key. The changed data stays under the same licence (CC BY-SA 4.0). The credit line is
shown in the footer of Settings (`zhWord.source`, components/account/AppFooter.tsx).
