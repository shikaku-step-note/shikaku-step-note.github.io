# 原価計算初級 ユニット2 教材と採点の確認

確認日 2026-11-15。対象は「消費量と原価を集計する」の4章。教材側のユニット番号は公式の出題区分と別です。

## 公式範囲と教材の境界

出題範囲1(1)の資源消費、1(3)の費目と直接・間接、3(1)の直課・配賦が中心。3(2)〜(3)の仕掛品、製品、売上原価は、資料をつないで原価を追うところまで扱います。在庫評価や製品別・サービス別の期間損益の詳しい計算は後続ユニットに接続します。2026年度の適用は2027年3月31日まで。2027年度も同じ出題範囲です。[公式範囲](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30genkashokyu.pdf) · [適用案内](https://www.kentei.ne.jp/bookkeeping/exam-list)

公開サンプルでは、第1問に材料元帳・分類・売上原価の仕訳、第3問に消費数量・単価、作業時間・消費賃率、指定率での配賦から製品別原価を求める形式が確認できます。設問と資料は当サイトの独自作成です。確認できる本試験の条件は選択式・40分。独自の数値入力は学習用で、サンプルに示された問題数や配点を実試験全回の仕様として扱いません。[公開サンプル](https://www.kentei.ne.jp/bookkeeping/ca/sample) · [ネット試験案内](https://www.kentei.ne.jp/33013)

## 到達目標と練習の対応

| 章・目標 | 基礎から代表例、条件違いへの進み方 | 理解度チェックと総合確認 |
| --- | --- | --- |
| cb2-materials #objective-1 受払記録を読む | #worked-1 の残高式から #worked-material-ledger の仕入先返品と未使用返却、#try-material-count の現物差異へ | q01–q04・q13、r01・r14 |
| cb2-materials #objective-2 単価と数量で原価換算 | #worked-2 の指定平均、#worked-material-ledger の金額照合。現物差異を製品消費に推定しない | q05–q08、r02 |
| cb2-materials #objective-3 製品専用と共通の消費を集計 | #worked-3 の費用分類から #worked-material-ledger の原票照合、#try-material-reverse のB払出量逆算へ | q09–q12・q14、r03・r13・r14 |
| cb2-labor-expenses #objective-1 時間・単価から労務費 | #worked-1 の分の換算、#worked-labor-expense-packet で同一製品の別賃率を合算 | q01–q04・q13、r04・r15 |
| cb2-labor-expenses #objective-2 直接・共通の作業を分ける | #worked-2 と #labor-document-map で製品・共通・販売へ分け、#try-labor-reclassification で作業票の訂正を反映 | q05–q08、r05・r15 |
| cb2-labor-expenses #objective-3 当月製造経費の特定 | #worked-3 で期間を確かめてから、#worked-labor-expense-packet の異なる使用期間と外注の対象、#try-expense-period-and-target へ | q09–q12・q14、r06 |
| cb2-allocation #objective-1 分母・率を読み取る | #worked-1 の実額と機械時間から率を求める方法、#allocation-source-evidence 内で与えられた配賦率を直接適用する方法 | q01–q04・q13、r07 |
| cb2-allocation #objective-2 製品原価・単位原価を算出 | #worked-2 の配賦後単位原価、#allocation-source-evidence で直課を先に確定し二つの配賦額を加える | q05–q08、r08・r16 |
| cb2-allocation #objective-3 元の費用合計と照合 | #worked-3・#worked-4 の基準違い、#try-allocation-without-ticket で根拠資料の有無が分担に与える影響 | q09–q12・q14、r09 |
| cb2-cost-flow #objective-1 勘定の増減と借方・貸方 | #worked-1 の購入と消費を図解し、#monthly-cost-reconciliation で仕掛品・製品の資産増減を表へ転記 | q01–q04、r10 |
| cb2-cost-flow #objective-2 直課・間接費配賦の振替 | #worked-2 で消費を二つの仕訳の行き先に区別し、#monthly-cost-reconciliation で全額配賦後の投入総額を照合 | q05–q08、r11 |
| cb2-cost-flow #objective-3 完成と販売の振替を区別 | #worked-3・#worked-4 の残高と仕訳、#monthly-cost-ledger の三段の照合、#try-monthly-cost-correction で在庫の誤りを訂正 | q09–q14、r12・r17 |

qは各章のIDに続く設問番号。rは cb2-unit-2-r に続く設問番号。最終4問は同じ木工工房の資料を参照する独立事例です。倉庫7kg、Qの直接労務費19,800円、共通費17,000円、製品原価P40,400円・Q41,150円、販売分の原価79,000円。4段階の算定を個別に確認できます。

## 教材の図と操作

- 材料 #material-movement-map は二つの返却方向と在庫の増減を並べて読むSVG。#try-material-count で差と確認資料を考え、#try-material-reverse で数量の流れを逆に追います。
- 労務・経費 #labor-document-map は作業票を製品別、共通、製造外に分けるSVG。#try-labor-reclassification は作業票訂正後の直接費と共通費を再集計。#try-expense-period-and-target は別条件で当月製造経費を求めます。
- 配賦 #allocation-evidence-figure は一枚の明細を専用額と共通額に分けるSVG。#try-allocation-without-ticket は元の資料が変わった場合の製品別原価を再計算し、工場全体の額を照合します。
- 原価の流れ #monthly-cost-ledger は仕掛品の完成減少額と製品の増加額が同じことを、強調表示と行見出しで追う残高表。#try-monthly-cost-correction は修正仕訳と利益への影響を考えてから解答を開きます。
- 図は自作。読み上げ用の等価な本文を備え、開閉式の解答はJavaScriptなしで表示できます。採点付き演習はブラウザに保存します。

## 保存・版と維持管理

4章のIDと順序を維持し、採点付き理解度チェックは48問から56問、総合確認は13問から17問。用語確認と既存の二つの模試は同じ版を使用します。今回変更した5評価のみ cost-2026-unit-2-v3 です。旧版の得点や学習状態・しおりは保存されます。未提出の旧版は履歴として残し、新版の受験は新しい回として開始します。

教材は src/content/lessons/cb2-*.md。設問と共通資料は src/data/cost-beginner-unit12-questions.json、cost-beginner-reviews.json、cost-beginner-unit2-material.json、対応表は cost-beginner-coverage.json。問題を変更した評価だけ版を進め、pnpm curriculum でダウンロードと順序を同期します。適用年度と試験形式は新しい公式案内を確認してください。

他ユニットはこの改訂の対象外です。実試験の固定問題数、設問別配点、難易度は確認できません。外部専門家の監修や受験者による時間・難度の検証は行っていません。
