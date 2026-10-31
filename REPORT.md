# zhChars overlay: report for review

Branch `overlay-zhchars`, 2026-10-31. Base: Make Me a Hanzi `dictionary.txt` (SHA-256 744bb05d...d203).
Rebuilding the base from the source reproduced the old `data/zhChars.json` byte for byte before any change.

Please check the rows marked **(U)**: their source is Shuowen Jiezi as I know it, not checked line by line against
a printed or scanned edition. Radical numbers (Unihan kRSUnicode, Unicode 18.0.0) were checked by script.

## Counts

| Category | Rows |
| --- | --- |
| Rows in the data | 9574 |
| Rows touched by the overlay | 77 |
| Fixed (data change) | 38 |
| Note added (lookalike part) | 11 |
| histPhonetic added | 29 |
| needs-review entries (no change) | 28 |
| strokeRadical list | 21 |
| nestedRadical list | 189 |
| modernRadical list | 165 |

## 1. Fixes (data changed)

| Char | Change | Why | Source | Conf. |
| --- | --- | --- | --- | --- |
| 曹 | ids: ⿱？日 → ⿱？曰 | The bottom part is 曰 (speak), not 日 (sun). Shuowen places 曹 under 曰. | Shuowen Jiezi (Xu Shen), entry for 曹 (U) | 0.9 |
| 曾 | ids: ⿳丷？日 → ⿳丷？曰 | The bottom part is 曰, not 日. Shuowen explains 曾 with 八 and 曰. The hint text from the source still names 日 and is left as it is. | Shuowen Jiezi (Xu Shen), entry for 曾 (U) | 0.9 |
| 曷 | ids: ⿱日？ → ⿱曰？ | The top part is 曰, not 日. Shuowen: 曰 is the meaning part, 匃 the sound part. | Shuowen Jiezi (Xu Shen), entry for 曷 (U) | 0.9 |
| 朁 | ids: ⿱？日 → ⿱兓曰 | The bottom part is 曰, not 日, and the unknown top part is 兓. Shuowen: meaning part 曰, sound part 兓. | Shuowen Jiezi (Xu Shen), entry for 朁 (U) | 0.85 |
| 會 | ids: ⿱⿱亼？日 → ⿱⿱亼？曰 | The bottom part is 曰, not 日: Shuowen explains 會 with 亼 and a shortened 曾, whose bottom is 曰. The hint text still names 日 and is left as it is. | Shuowen Jiezi (Xu Shen), entry for 會 (U) | 0.8 |
| 颦 | radical: 十 → 页 | Radical 十 is not part of this character. 颦 is filed under 页 (traditional 顰 under 頁 in Kangxi). | Unihan database 18.0.0, kRSUnicode of 颦 (181'.15); Kangxi Zidian radical 181 for 顰 | 0.95 |
| 啰 | radical: 罒 → 口 | Radical 罒 belongs to the sound part 罗; the character is filed under 口 (mouth), like traditional 囉. | Unihan database 18.0.0, kRSUnicode of 啰 (30.8); same dataset, row 囉 | 0.95 |
| 毂 | ids: ⿰⿱士军车 → ⿰⿱⿳士冖一车殳 | The decomposition lost 殳 and wrote 车 twice. Same layout as the traditional row 轂, with 车 for 車. | same dataset, row 轂; Unihan database 18.0.0, kRSUnicode of 毂 (79.9) | 0.9 |
| 载 | ids: ⿹哉车 → ⿹⿱十戈车 | There is no 口 in 载. The top-right part is 𢦏 (written 十 over 戈 in this dataset, as in 裁 and 截), plus 车. The sound hint 哉 is kept: it has the same sound part 𢦏. | Shuowen Jiezi (Xu Shen), entry for 載 (sound part 𢦏); same dataset, row 裁 (U) | 0.9 |
| 載 | ids: ⿹哉車 → ⿹⿱十戈車 | There is no 口 in 載. The top-right part is 𢦏 (written 十 over 戈 in this dataset, as in 裁 and 截), plus 車. The sound hint 哉 is kept: it has the same sound part 𢦏. | Shuowen Jiezi (Xu Shen), entry for 載 (sound part 𢦏); same dataset, row 裁 (U) | 0.9 |
| 鼋 | radical: 龟 → 黾 | The character has 黾 (frog), not 龟 (turtle). Traditional 黿 is under 黽. | Unihan database 18.0.0, kRSUnicode of 鼋 (205'.4); same dataset, row 黿 | 0.95 |
| 黨 | semantic: "兄" → 黑 | Meaning part 兄 is not in 黨 (it belongs to the simplified 党). Shuowen: meaning part 黑, sound part 尚. | Shuowen Jiezi (Xu Shen), entry for 黨 (U) | 0.95 |
| 瓣 | phonetic: "\n\n\n\n\n\n\n\n辡" → 辡 | The sound part field had eight line breaks before 辡 (formatting error in the source). | Shuowen Jiezi (Xu Shen), entry for 瓣 (sound part 辡) (U) | 0.99 |
| 舉 | phonetic: "舉" → 與 | The sound part pointed to the character itself. Shuowen: meaning part 手, sound part 與. | Shuowen Jiezi (Xu Shen), entry for 舉 (U) | 0.9 |
| 凫 | phonetic: "凡" → 几 | Sound part 凡 is not in the character. Shuowen gives 几 (shu, short feathers) as the sound part of 鳧. | Shuowen Jiezi (Xu Shen), entry for 鳧 (U) | 0.85 |
| 鳧 | phonetic: "凡" → 几 | Sound part 凡 is not in the character. Shuowen gives 几 (shu, short feathers) as the sound part. | Shuowen Jiezi (Xu Shen), entry for 鳧 (U) | 0.85 |
| 寬 | phonetic: "苋" → 萈 | Sound part was the simplified 苋 (amaranth), a different character. Shuowen: sound part 萈 (huan). | Shuowen Jiezi (Xu Shen), entry for 寬 (U) | 0.85 |
| 屬 | phonetic: "禹" → 蜀 | Sound part 禹 is not in 屬. Shuowen: sound part 蜀. | Shuowen Jiezi (Xu Shen), entry for 屬 (U) | 0.9 |
| 廄 | semantic: "厂" → 广 | Meaning part 厂 is not in 廄; the building part is 广. | Shuowen Jiezi (Xu Shen), entry for 廄 (meaning part 广) (U) | 0.9 |
| 廚 | semantic: "厂" → 广 | Meaning part 厂 is not in 廚; the building part is 广. | Shuowen Jiezi (Xu Shen), entry for 廚 (meaning part 广, sound part 尌) (U) | 0.9 |
| 惠 | ids: ⿱？心 → ⿱叀心 | The unknown top part is 叀, the same as the sound/meaning part already given in the etymology. | Shuowen Jiezi (Xu Shen), entry for 惠 (U) | 0.9 |
| 擢 | phonetic: "隹" → 翟 | The sound part is the whole 翟 (zhai), not only 隹. | Shuowen Jiezi (Xu Shen), entry for 擢 (U) | 0.9 |
| 濯 | phonetic: "隹" → 翟 | The sound part is the whole 翟 (zhuo), not only 隹. | Shuowen Jiezi (Xu Shen), entry for 濯 (U) | 0.9 |
| 槜 | phonetic: "隹" → 隽 | The sound part is the whole 隽 (variant of 雋), not only 隹. | Shuowen Jiezi (Xu Shen), entry for 檇 (sound part 雋) (U) | 0.85 |
| 漲 | phonetic: "张" → 張 | A traditional character got the simplified 张 as sound part; its own decomposition has 張. | same dataset, row 漲 (decomposition) | 0.95 |
| 貿 | semantic: "贝" → 貝 | A traditional character got the simplified 贝 as meaning part; its own decomposition has 貝. | same dataset, row 貿 (decomposition) | 0.95 |
| 賞 | semantic: "贝" → 貝 | A traditional character got the simplified 贝 as meaning part; its own decomposition has 貝. | same dataset, row 賞 (decomposition) | 0.95 |
| 賣 | phonetic: "买" → 買 | A traditional character got the simplified 买 as sound part; the traditional form is 買. | Shuowen Jiezi (Xu Shen), entry for 賣 (出 and 買) (U) | 0.9 |
| 鰂 | semantic: "鱼" → 魚 | A traditional character got the simplified 鱼 as meaning part; its own decomposition has 魚. | same dataset, row 鰂 (decomposition) | 0.95 |
| 磯 | ids: ⿰石？ → ⿰石幾 | The unknown right part is 幾, the sound part already given in the etymology. | Shuowen Jiezi (Xu Shen), entry for 磯 (U) | 0.95 |
| 髓 | ids: ⿰骨？ → ⿰骨遀 | The unknown right part is 遀, the sound part already given in the etymology. | Shuowen Jiezi (Xu Shen), entry for 髓 (U) | 0.9 |
| 膃 | phonetic: "？" → 昷 | The sound part field held the placeholder ？. The sound part is 昷 (written as 囚 over 皿 in the decomposition), as in 溫. | same dataset, row 昷; Shuowen Jiezi (Xu Shen), entry for 溫 (sound part 昷) (U) | 0.85 |
| 朔 | phonetic: "月" → 屰 | Sound part and meaning part were both 月. Shuowen: meaning part 月, sound part 屰. | Shuowen Jiezi (Xu Shen), entry for 朔 (U) | 0.95 |
| 噁 | semantic: "惡" → 口 | Sound part and meaning part were both 惡. The meaning part is 口, the radical. | Unihan database 18.0.0, kRSUnicode of 噁 (30.12) | 0.85 |
| 馋 | phonetic: "饣" → 毚 | Sound part and meaning part were both 饣. The sound part is 毚 (traditional 饞), reduced in the simplified form. Simplified form: the historical sound part 毚 of 饞 is no longer visible. | Shuowen Jiezi (Xu Shen), entry for 毚; traditional 饞; traditional form 饞 (U) | 0.85 |
| 平 | radical: 广 → 干 | Radical 广 is not part of 平. Kangxi files 平 under 干. | Unihan database 18.0.0, kRSUnicode of 平 (51.2) | 0.9 |
| 干 | radical: 十 → 干 | 干 is itself Kangxi radical 51; 十 was given instead. | Unihan database 18.0.0, kRSUnicode of 干 (51.0) | 0.85 |
| 雁 | phonetic: "" → 厂 | Empty sound part filled: Shuowen gives 厂 (han) as the sound part, with 隹 and 人 as meaning parts. | Shuowen Jiezi (Xu Shen), entry for 雁 (U) | 0.85 |

## 2. Notes: a part that looks like another (data kept)

| Char | Shown | Was | Why | Source |
| --- | --- | --- | --- | --- |
| 最 | 日 | 冃 | The top looks like 日 but comes from 冃 (a cap), not the sun. | Shuowen Jiezi (Xu Shen), entry for 最 (U) |
| 冒 | 日 | 冃 | The top looks like 日 but is 冃, a cap pulled over the eyes 目. | Shuowen Jiezi (Xu Shen), entry for 冒 (U) |
| 冕 | 日 | 冃 | The top looks like 日 but is 冃, a cap or crown. | Shuowen Jiezi (Xu Shen), entry for 冕 (U) |
| 冑 | ⺼ | 冃 | This is the helmet character: the bottom is 冃 (a cap), not flesh 肉 as in 胄 (descendant). | Shuowen Jiezi (Xu Shen), entry for 冑; Kangxi Zidian radical 13 (U) |
| 夏 | 夂 | 夊 | The bottom is 夊 (slow feet), almost the same shape as 夂. | Shuowen Jiezi (Xu Shen), entry for 夏 (U) |
| 复 | 夂 | 夊 | The bottom is 夊 (slow feet), almost the same shape as 夂. | Shuowen Jiezi (Xu Shen), entry for 复 (U) |
| 夌 | 夂 | 夊 | The bottom is 夊 (slow feet), almost the same shape as 夂. | Shuowen Jiezi (Xu Shen), entry for 夌 (U) |
| 内 | 人 | 入 | Mainland print writes 人 inside, but the part is 入 (enter), as in traditional 內. | Shuowen Jiezi (Xu Shen), entry for 內 (U) |
| 眾 | 罒 | 目 | The top 罒 is an eye 目 turned on its side, not a net. | Shuowen Jiezi (Xu Shen), entry for 眾 (U) |
| 睘 | 罒 | 目 | The top 罒 is an eye 目 turned on its side, not a net. | Shuowen Jiezi (Xu Shen), entry for 睘 (U) |
| 睪 | 罒 | 目 | The top 罒 is an eye 目 turned on its side, not a net. | Shuowen Jiezi (Xu Shen), entry for 睪 (U) |

## 3. histPhonetic: old sound part no longer visible (data kept)

| Char | Phonetic in data | histPhonetic | Why |
| --- | --- | --- | --- |
| 馋 | 毚 | 毚 | Sound part and meaning part were both 饣. The sound part is 毚 (traditional 饞), reduced in the simplified form. Simplified form: the historical sound part 毚 of 饞 is no longer visible. |
| 举 | 舉 | 舉 | Simplified form: the historical sound part 舉 of 舉 is no longer visible. |
| 凤 | 凡 | 凡 | Simplified form: the historical sound part 凡 of 鳳 is no longer visible. |
| 场 | 昜 | 昜 | Simplified form: the historical sound part 昜 of 場 is no longer visible. |
| 峄 | 睪 | 睪 | Simplified form: the historical sound part 睪 of 嶧 is no longer visible. |
| 峦 | 䜌 | 䜌 | Simplified form: the historical sound part 䜌 of 巒 is no longer visible. |
| 庄 | 壯 | 壯 | Simplified form: the historical sound part 壯 of 莊 is no longer visible. |
| 敌 | 啇 | 啇 | Simplified form: the historical sound part 啇 of 敵 is no longer visible. |
| 权 | 雚 | 雚 | Simplified form: the historical sound part 雚 of 權 is no longer visible. |
| 标 | 票 | 票 | Simplified form: the historical sound part 票 of 標 is no longer visible. |
| 满 | 㒼 | 㒼 | Simplified form: the historical sound part 㒼 of 滿 is no longer visible. |
| 瞒 | 㒼 | 㒼 | Simplified form: the historical sound part 㒼 of 瞞 is no longer visible. |
| 螨 | 㒼 | 㒼 | Simplified form: the historical sound part 㒼 of 蟎 is no longer visible. |
| 蹒 | 㒼 | 㒼 | Simplified form: the historical sound part 㒼 of 蹣 is no longer visible. |
| 爷 | 耶 | 耶 | Simplified form: the historical sound part 耶 of 爺 is no longer visible. |
| 盘 | 般 | 般 | Simplified form: the historical sound part 般 of 盤 is no longer visible. |
| 稳 | 㥯 | 㥯 | Simplified form: the historical sound part 㥯 of 穩 is no longer visible. |
| 艰 | 堇 | 堇 | Simplified form: the historical sound part 堇 of 艱 is no longer visible. |
| 苏 | 稣 | 稣 | Simplified form: the historical sound part 稣 of 蘇 is no longer visible. |
| 边 | 臱 | 臱 | Simplified form: the historical sound part 臱 of 邊 is no longer visible. |
| 过 | 咼 | 咼 | Simplified form: the historical sound part 咼 of 過 is no longer visible. |
| 邓 | 登 | 登 | Simplified form: the historical sound part 登 of 鄧 is no longer visible. |
| 释 | 睪 | 睪 | Simplified form: the historical sound part 睪 of 釋 is no longer visible. |
| 历 | 力 | 厤 | Simplified form: 曆 and 歷 both take 厤 as sound part; it is no longer visible. The source lists 厤 as meaning part (see needs-review). |
| 宽 | 苋 | 萈 | Simplified form: the historical sound part is 萈 (Shuowen for 寬). The source lists the lookalike 苋. |
| 属 | 禹 | 蜀 | Simplified form: the historical sound part is 蜀 (Shuowen for 屬). The source lists 禹, which only matches the shape. |
| 商 | 章 | 章 | Shortened sound part: Shuowen reads 商 with a shortened 章, so 章 is not visible as a whole. |
| 轍 | 徹 | 徹 | Shortened sound part: 徹 without its 彳. |
| 蛋 | 延 | 延 | Old form 蜑 has the sound part 延; in 蛋 it is reduced to 疋. |

## 4. Needs review (no change made)

| Char | Field | Now | Best guess | Conf. | Why |
| --- | --- | --- | --- | --- | --- |
| 替 | ids | ⿱⿰夫夫日 | ⿱⿰夫夫曰 | 0.6 | Shuowen writes the character with 竝 over 白 or over 曰, never with the sun 日. Modern mainland print draws the bottom like 日, so the change may confuse more than it helps. |
| 曾 | etymology hint | names 日 | name 曰 to match the fixed decomposition | 0.8 | The decomposition now has 曰. The hint text is the source's own wording and was not changed. |
| 會 | etymology hint | names 日 | name 曰 to match the fixed decomposition | 0.8 | The decomposition now has 曰. The hint text is the source's own wording and was not changed. |
| 冑 | radical | ⺼ | 冂 | 0.75 | The helmet character is filed under 冂 in Kangxi; ⺼ belongs to 胄 (descendant). A note was added; the radical was left because 冂 is not a part of the stored decomposition. |
| 颦 顰 | etymology phonetic / semantic | phonetic 頻, semantic 卑 | phonetic 卑, semantic 頻 | 0.7 | Shuowen reads 顰 as 頻 for the meaning with 卑 as sound part. The modern reading pin follows 頻, which is why the source may have swapped them. |
| 载 載 哉 | ids and phonetic | 载 and 載: ⿹⿱十戈车 with phonetic 哉; 哉: ⿹？口 with empty phonetic | write the part as 𢦏 and use 𢦏 as the phonetic of all three | 0.9 | Historically right, but 𢦏 (U+2298F) is outside the Basic Multilingual Plane, no row of the data uses such characters yet, and phone fonts may not show it. The data writes 𢦏 as 十 over 戈 elsewhere (裁, 截, 戴). |
| 栽 裁 | etymology | 栽: phonetic 戈; 裁: ideographic | both pictophonetic with sound part 𢦏 (十 over 戈) | 0.85 | Shuowen gives 𢦏 as the sound part of both. Same font question as 载. |
| 轂 毂 | etymology phonetic | 轂: 殳; 毂: empty | 𣪊 (outside the Basic Multilingual Plane) | 0.7 | Shuowen: meaning part 車, sound part 𣪊. 殳 alone is not the sound part. |
| 强 | etymology | phonetic 虫, semantic 弓 | phonetic 弘, semantic 虫 | 0.8 | Shuowen: 強 is an insect name, meaning part 虫, sound part 弘. 弘 is not a single part of the stored decomposition (弓 + 虽), so it was not changed. |
| 徹 | etymology | pictophonetic, phonetic 彳, semantic 切 | ideographic (彳, 育, 攴), no phonetic | 0.75 | 切 is not in the character and 彳 is not a sound part. Shuowen explains 徹 with 彳, 攴 and 育 together. |
| 徵 | etymology phonetic | 正 | no clear sound part (Shuowen: a shortened 微 with 壬) | 0.6 | 正 is not in the character. |
| 鬆 | etymology | phonetic 公, semantic 木, hint tree | phonetic 松, semantic 髟 (hair) | 0.8 | The character means loose hair; 髟 carries the meaning and 松 the sound. |
| 務 | etymology | phonetic 务 (simplified form), semantic 矛 | phonetic 敄, semantic 力 | 0.75 | Shuowen: meaning part 力, sound part 敄. 务 is the simplified character, not a part of 務. |
| 卖 | etymology | phonetic and semantic both 买 | ideographic (出 and 買, written 十 and 买) | 0.6 | Phonetic and semantic should not be the same part. |
| 属 | etymology phonetic | 禹 (histPhonetic 蜀 added) | empty phonetic, keep histPhonetic 蜀 | 0.85 | 禹 only matches the shape of the simplified bottom; it is not the sound part. |
| 历 | etymology semantic | 厤 (histPhonetic 厤 added) | semantic 厂 or empty; 厤 is the old sound part | 0.7 | In 曆 and 歷 the part 厤 gives the sound, not the meaning. |
| 义 厅 | etymology semantic | 义: ⺷; 厅: 广 | keep, and add a histSemantic field like histPhonetic | 0.8 | The meaning part of the traditional form (義, 廳) is no longer visible in the simplified form. |
| 鳳 | ids | ⿵几⿱一鳥 (phonetic 凡 is split) | no change; the app can show 凡 as one part | 0.9 | The decomposition splits the sound part 凡 into 几 and 一. |
| 毓 | etymology | pictophonetic, empty phonetic, semantic 母 | ideographic: a mother 每 and a newborn 㐬 (a form of 育) | 0.5 | Not sure enough to fill. |
| 罹 | etymology | pictophonetic, empty phonetic, semantic 忄 | unknown | 0.3 | Late character (not in the original Shuowen); no reliable analysis found. |
| 籑 | etymology semantic | 食, written as 良 in the decomposition | no change | 0.7 | The bottom 良 shape is 食 merged with 算; the app may show 食 for it. |
| 仨 兒 氂 | etymology | phonetic equals semantic | 仨: semantic 亻; 兒: pictographic; 氂: phonetic is a shortened 犛 | 0.6 | Phonetic and semantic should not be the same part. |
| 壴 | ids | ⿱土口 | top 士, not 土 | 0.7 | The radical is 士 and the print form has a short bottom stroke. |
| 睾 | ids | ⿱血幸 | top is a form of 目 (eye on its side), like 睪 | 0.5 | The radical is 目 but no part shows it. |
| 冘 | ids and etymology | ⿸巾乚, phonetic 乚, semantic 巾 | unclear; Shuowen explains it with 人 going out of 冂 | 0.4 | The stored analysis looks like a shape guess. |
| 鋁 閭 | ids and phonetic | 吕 (U+5415, mainland form) | 呂 (U+5442, traditional form) | 0.6 | Traditional characters elsewhere in the data mostly use traditional part forms. Same shape, different code point. |
| 兀 | radical | 兀 | 儿 | 0.6 | 兀 is not a Kangxi radical; Kangxi files it under 儿. |
| 亍 亟 兓 卅 卌 半 垂 并 承 毌 率 甩 甲 申 甴 芻 采 凸 凹 夃 | radical | radical is not a part of the decomposition and not inside one | no change: the radical spans several parts or the decomposition has unknown parts | 0.8 | Listed so the app knows it cannot find the radical in these. |

## 5. Lists only (no change)

- `lists/strokeRadical.json`: radical is a single stroke and not a part of the decomposition (丑 世 东 乘 乾 之 ...).
- `lists/nestedRadical.json`: radical sits inside a part the decomposition does not split (修 in 攸). Not an error.
- `lists/modernRadical.json`: radical differs from the Kangxi radical of the traditional form (东 一 vs 東 木). Most
  are the modern simplified radical table; some are the source's own choice (篡 under 厶, which follows Shuowen).

## Not verified

- Shuowen statements (rows marked U) come from memory, not a checked edition.
- Earlier review findings checked and confirmed: a1 (曹 曾 曷 朁, 會 fixed; 替 left in needs-review), a2 (all six
  plus 冑 noted), e (all six fixed; 毂 and 载 fixed differently, see below).
- 载 and 載: the earlier review asked for 𢦏. The fix writes it as 十 over 戈, as the data does in 裁 and 截, because
  𢦏 is outside the Basic Multilingual Plane and may not show on phones. The phonetic 哉 is kept (see needs-review).
- 师 from the earlier review's modern-radical list: the data files 师 and 師 both under 巾, so it is not listed.
- `data/zhStrokes.json` (stroke-to-part matches) is built from the unpatched source and still says 日 for 曹 etc.
- Glosses (`hint` texts) are the source's own and were not reviewed.
