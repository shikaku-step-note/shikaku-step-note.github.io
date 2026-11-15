# 原価計算初級 ユニット1 教材レビュー

2026-11-15。対象は「原価の考え方と分類」の4章。公式範囲の番号とサイト内のユニット番号は別です。日本商工会議所の[出題範囲PDF](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30genkashokyu.pdf)の1(1)〜(3)を扱い、1(4)を売上・在庫と結び付けて導入します。1(4)の詳しい計算と、公式範囲3の期間損益は既存の後続章へつなぎます。[2026年度・2027年度の適用案内](https://www.kentei.ne.jp/bookkeeping/exam-list)と[現行ネット試験案内](https://www.kentei.ne.jp/33013)を照合。2026年度の適用は2027年3月31日まで。2027年度にも同じ範囲が適用されます。公表資料の確認は source-register.json に記録しました。

## 到達目標と初見の判断

| 章・到達目標（本文アンカー） | 既存の基礎から進む例題・変化条件 | 独立練習と解説 |
| --- | --- | --- |
| cb2-purpose #objective-1　製品・サービス・部門が必要とする資源を集める | #worked-1 で部品・時間・設備を一件に集計。異なる件の部品を除く | q01–q04、総合確認 r01 |
| cb2-purpose #objective-2　購入・消費・支払を分ける | #worked-2 で期首・購入・期末を使用量へ。#cost-timing-bridge で消費と売上原価の時点を分ける | q05–q08、総合確認 r02 |
| cb2-purpose #objective-3　総額・単位をそろえ、収益と比べる | #worked-3 でサービスの売上と平均費用を整合。#cost-timing-bridge で製造60個と販売45個、次に販売30個を比較 | q09–q13、総合確認 r03・r14 |
| cb2-elements #objective-1　材料費・労務費・経費を判定 | #worked-1 で加工に使った資源の形態を分類。#worked-activity-profit で一枚の電力請求書を分割 | q01–q04、総合確認 r04 |
| cb2-elements #objective-2　製造・販売・一般管理の活動を区別 | #worked-2 と #worked-activity-profit、#try-store-use。使用場所の名称より実際の用途を読む | q05–q08・q13、総合確認 r05 |
| cb2-elements #objective-3　資料を分類し製造原価の合計を確かめる | #worked-3 から #worked-activity-profit へ。未販売分と販管費を混同せず元の費用総額と照合 | q09–q12、総合確認 r06 |
| cb2-traceability #objective-1　対象と元資料で直接・間接を判断 | #worked-1、#trace-evidence-map、#try-trace-target。工場から製品、案件から店へ対象を変更 | q01–q04、総合確認 r07 |
| cb2-traceability #objective-2　費目別と直間別を重ねる | #worked-2 から #worked-trace-documents へ。作業票で追える労務費と共通経費を判別 | q05–q08、総合確認 r08 |
| cb2-traceability #objective-3　直課と配賦を使い総額を検算 | #worked-3、#worked-trace-documents、#try-trace-source。専用記録が出た金額を最初に直課し、残りだけを配賦 | q09–q13、総合確認 r09 |
| cb2-departments #objective-1　部門別原価と責任範囲を区別 | #worked-1、#responsibility-bridge。数量の違い、配賦基準だけの違い、本部契約の違いを切り分け | q01–q04、総合確認 r10・r15 |
| cb2-departments #objective-2　部門固有費に共通分を加える | #worked-2 から #responsibility-bridge の二つの基準へ。費用総額の変更と負担割合だけの変更を比較 | q05–q08・q13、総合確認 r11・r12 |
| cb2-departments #objective-3　部門別と全社の利益を同じ集計範囲で比べる | #worked-3、#responsibility-bridge。部門利益が反対方向に動くとき全社利益を元資料から逆算 | q09–q12、総合確認 r13 |

q は各章の cb2-…-q、r は cb2-unit-1-r。例題5等の本文の問題は採点バンクに数えません。公式で確認できる基礎の語句選択から、条件を読んで複数の判断をつなぐ問題へ進めます。計算入力は学習用で、現行本試験に倣う模試は選択式です。章の前提は四則計算と順番に学ぶ先行章です。

## 図と練習

| 章 | 見て確認する図 | 手を動かしてから解説を開く練習 |
| --- | --- | --- |
| cb2-purpose | #cost-timing。二つの矢印で販売前後を区別し、同節の表で集計対象を確認 | #cost-timing-bridge の販売30個。原価のどの部分が在庫に残るかを予測し、粗利と営業利益を再計算 |
| cb2-elements | #activity-routing。作る・売る・管理する活動から在庫と損益への経路をたどる | #try-store-use で電力の使途変更を損益まで追跡し、#try-classification-evidence で根拠資料を選ぶ |
| cb2-traceability | #trace-evidence-map。同じ家賃を対象別に直接・間接へ振り分ける | #try-trace-source で追加資料を受けた直課と配賦、#try-trace-target で対象変更を判断 |
| cb2-departments | #cost-responsibility。内訳、配賦、担当の順に確認 | #responsibility-bridge の家賃総額変更。部門の配賦後利益と全社利益を再計算 |

図の意味は図の近くの本文でも説明しています。例題の解答は標準の開閉操作で表示でき、JavaScriptを切っても読めます。図は正確な分類・順序を見せる自作SVGを使用。

## 変更と整合

- 4章のID・順序・URLを維持。Unit 1の理解度チェックは48問から52問、総合確認は13問から15問。用語確認・全体総復習・二つの40分模試は既存版です。
- 改訂5評価のみ cost-2026-unit-1-v3。過去の得点は保存した版で残り、改訂問題の得点へ換算しません。旧版の未提出の回答は履歴として残り、新版の受験は最初から開始。しおり・学習状態・他の評価の版は共通の保存処理を使います。
- 新しい数値4問は lesson-unit12-arithmetic-witnesses.json に別式を保存。本文・応用練習の確認値は材料在庫の受入／使用の区別、製品原価36,000＝27,000＋9,000、売上総利益13,500・営業利益9,500、電力費の付替え前後の費用合計137,000、案件原価41,000、配賦だけを変更した全社利益180,000・家賃総額増加後160,000です。
- 維持管理では src/content/lessons/cb2-*.md と対応する src/data のバンク・範囲対応を一緒に編集し、pnpm curriculum で学習順序と設問数をTXTへ反映。採点や設問を変更した評価だけ版を更新します。試験の実施年度が変わる場合は、新しい出題区分表とネット試験案内を確認してください。
- 扱うのは指定されたユニットで、他ユニットの教材を再執筆した記録ではありません。公開サンプルは構成の確認に使用。実試験の固定の小問数や個別配点、部分点は確認できません。外部専門家による監修・受験者を用いた難度検証は未実施です。
