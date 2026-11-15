# 日商原価計算初級 全課程の教材・評価監査

教材照合日：2026-11-16。公式資料照合日：2026-11-15。

日本商工会議所の現行範囲（2018年度適用開始、2026年度・公表済み2027年度とも変更なし）を、公式の3領域・9細区分から42の学習技能に展開した。公式文書・公開サンプル・試験仕様は[出典台帳](source-register.json)、技能別の根拠と設問IDは[カバレッジ台帳](../../src/data/cost-beginner-coverage.json)を参照。標準原価計算と、個別・総合など原価計算方式による計算手続の違いは対象外。教材は独自作成。

既存の29章・章末341問と5回のユニット総合確認104問を監査し、現行範囲を教えるための追加章は不要と判断した。原価・在庫・営業利益・CVP・売上高差異を連続して分析する課程末の練習には不足があったため、月次資料に基づく9問を追加した。総復習は既存22問と合わせて31問。2回の模試は各37問・40分・独自配点100点。実際の試験の問数・詳細配点は公式確認できていない。

原価集計の説明では、倉庫の純払出量と実際の消費量を同一視できる条件を補足した。模試では、総額一致で見逃す配賦ミスと値下げ後の損益分岐点を問う設問を追加し、概念問題の選択肢を見直した。模試と総復習の旧版記録は保存される。新しい問題の成績とは別の版として扱う。

章ごとに、到達目標の本文、実際に該当する例題、自力演習のID、授業用の図表と途中確認を示す。章末の解説は各ページの「理解度チェック」にある。複数章にわたる対象技能の例題・独立演習は上の技能台帳も参照。文章構成、例題の計算、教材設計の詳細は各ユニットの点検記録に記載。照合は公式資料と教材・評価の突き合わせであり、外部専門家の監修や受験成果の測定は実施していない。

補強候補として、異なる案件に平均原価を当てたときの利益の誤差と、期末材料残高の金額までを単独で問う演習がある。両方とも本文・例題で扱う。前者の章末では案件別の利益を、後者では消費額や期末数量を確認できる。

## ユニット1 原価の考え方と分類

[本文・自力演習・検算の詳細](unit-1-search-and-transfer-review.md)

### [原価とは何か｜資源を使った量と金額](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-purpose/)

`cb2-purpose` · 80分の目安 · 章末13問

- [目的・活動・資源の関係から原価の対象を説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-purpose/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-purpose/#worked-1)。自力演習 `q01, q02, q03, q04`。
- [購入・支払い・消費を区別して資源の消費額を計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-purpose/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-purpose/#worked-2)。自力演習 `q05, q06, q07, q08`。
- [総原価と単位当たり原価を求め、収益との比較条件を確かめる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-purpose/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-purpose/#worked-3)。自力演習 `q09, q10, q11, q12, q13`。

図表：[図　取付け1件から調べる資料を逆にたどる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-purpose/#purpose-activity-resource)、[図　原価が移る二つの境目。最初の矢印は材料の消費、次の矢印は製品の販売を表します。](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-purpose/#cost-timing)。途中確認：[途中で確認　機器を借りた時間と使った時間を分ける](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-purpose/#guided-purpose)。

### [材料費の求め方｜購入・払出し・返却](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-material-use/)

`cb2-material-use` · 84分の目安 · 章末6問

- [注文・受入れ・支払い・消費を別の事実として読み取る](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-material-use/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-material-use/#worked-1)。自力演習 `q01, q02`。
- [払出しと製造現場からの返却から正味消費量・月末残高を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-material-use/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-material-use/#worked-2)。自力演習 `q03, q04`。
- [同じ単価で消費分と残存分を金額に直し、現物と記録の不一致を判断する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-material-use/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-material-use/#worked-3)。自力演習 `q05, q06`。

図表：[図　倉庫へ入り、製造に渡り、未使用分が戻る](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-material-use/#material-use-movement)、[図　所在と消費を分けて、40kgの行き先を照合する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-material-use/#material-use-custody)。途中確認：[途中で確認　倉庫と現場の残りから消費量を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-material-use/#guided-material-use)。

### [材料費・労務費・経費の見分け方](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-elements/)

`cb2-elements` · 70分の目安 · 章末13問

- [消費した資源の形態から材料費・労務費・経費を分類する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-elements/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-elements/#worked-1)。自力演習 `q01, q02, q03, q04`。
- [製造原価と販売費及び一般管理費を活動の目的から区別する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-elements/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-elements/#worked-2)。自力演習 `q05, q06, q07, q08, q13`。
- [分類表の小計を照合して製造原価と期間の費用を集計する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-elements/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-elements/#worked-3)。自力演習 `q09, q10, q11, q12`。

図表：[図　消費した資源から損益計算書のどこにつながるか](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-elements/#activity-routing)、[図　勤怠集計の22,000円を、確認済みと照合待ちへ分ける](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-elements/#elements-source-audit)。途中確認：[途中で確認　訂正後の製造労務費を集計する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-elements/#guided-elements)。

### [直接費と間接費の違い｜直課と配賦](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-traceability/)

`cb2-traceability` · 75分の目安 · 章末13問

- [原価計算対象を指定して直接費と間接費を判断する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-traceability/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-traceability/#worked-1)。自力演習 `q01, q02, q03, q04`。
- [材料費・労務費・経費と直接費・間接費を組み合わせる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-traceability/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-traceability/#worked-2)。自力演習 `q05, q06, q07, q08`。
- [直課額と配賦額を区別し、製品別集計を総額に照合する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-traceability/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-traceability/#worked-3)。自力演習 `q09, q10, q11, q12, q13`。

図表：[図　共用建物の家賃90,000円を、どこまで直接たどれるか](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-traceability/#trace-evidence-map)、[図　請求明細からどこまで直接集計できるか](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-traceability/#trace-source-strength)。途中確認：[途中で確認　専用分を外した後の共通分を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-traceability/#guided-traceability)。

### [部門別原価の読み方｜固有費・共通費と責任の範囲](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-departments/)

`cb2-departments` · 80分の目安 · 章末13問

- [部門・活動・責任者の関係を原価情報の用途として説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-departments/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-departments/#worked-1)。自力演習 `q01, q02, q03, q04`。
- [部門固有の原価と共通原価を区別し部門別に集計する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-departments/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-departments/#worked-2)。自力演習 `q05, q06, q07, q08, q13`。
- [部門別損益を全社損益へ照合し、比較の条件を説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-departments/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-departments/#worked-3)。自力演習 `q09, q10, q11, q12`。

図表：[図　部門別利益の差を調べる順序。責任の所在は、最後に変化した条件から判断します。](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-departments/#cost-responsibility)、[図　同じ原価増加でも、照合先は変化した条件で決まる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-departments/#department-cause-controls)。途中確認：[途中で確認　部門利益の低下を全社利益と照合する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-departments/#guided-departments)。

### [サービスの売上と原価｜完了日と案件番号で対応させる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-matched-revenue/)

`cb2-matched-revenue` · 85分の目安 · 章末6問

- [売上と原価を同じ期間の完了案件に対応させる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-matched-revenue/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-matched-revenue/#worked-1)。自力演習 `q01, q02`。
- [案件ごとに追跡できる原価から差額を求め、平均値の用途を判断する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-matched-revenue/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-matched-revenue/#worked-2)。自力演習 `q03, q04`。
- [共通費を引く前後で差額の意味がどう変わるかを説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-matched-revenue/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-matched-revenue/#worked-3)。自力演習 `q05, q06`。

図表：[図　月の損益を読む前に、三つの欄を照合する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-matched-revenue/#match-evidence-table)、[案件Mの三か月。中央の枠で売上と対応原価を組み合わせ、上下の枠で代金の動きを追います。](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-matched-revenue/#match-month-ledger)。途中確認：[途中で確認　完了月に回す直接費を選ぶ](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-matched-revenue/#guided-matched-revenue)。

### [製造原価と販管費の違い｜売上総利益と営業利益](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-profit-boundary/)

`cb2-profit-boundary` · 98分の目安 · 章末6問

- [同じ費目を使途で製造原価・販売費・一般管理費に分ける](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-profit-boundary/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-profit-boundary/#worked-1)。自力演習 `q01, q02`。
- [販売分に対応する売上原価と売上総利益・営業利益を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-profit-boundary/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-profit-boundary/#worked-2)。自力演習 `q03, q04`。
- [売れ残りや費用の使途が変わると、どの利益がなぜ変わるかを説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-profit-boundary/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-profit-boundary/#worked-3)。自力演習 `q05, q06`。

図表：[図　売れた製品の原価が、二つの利益につながる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-profit-boundary/#profit-statement-bridge)、[図　製造原価から外れた4,800円は、どの欄にあったか](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-profit-boundary/#profit-boundary-sold-share)。途中確認：[途中で確認　販売割合から分類の訂正額を逆算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-profit-boundary/#guided-profit-boundary)。

### [原価の分類を例題で練習｜製造原価・販売費・在庫](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/)

`cb2-classification-case` · 95分の目安 · 章末6問

- [費用を活動の目的・費目・原価計算対象の順に分類する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/#worked-1)。自力演習 `q01, q02`。
- [専用費と共通費を切り分け、元の明細と製品別集計を照合する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/#worked-2)。自力演習 `q03, q04`。
- [販売分の原価から利益を求め、集計先の変化と担当者の判断を区別する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/#objective-3)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/#worked-3)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/#worked-classify-meter-correction)、[例題3](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/#worked-classification-payroll)。自力演習 `q05, q06`。

図表：[図　電気代の明細を、販売・管理と製造から読み分ける](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/#classify-route)、[原価の照合表　上の三行の合計を、A・Bの完成原価の合計と照らし合わせる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/#classify-correction-flow)。途中確認：[途中で確認　総額が同じでも、売上原価が動く理由を確かめる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-classification-case/#guided-classification-case)。

## ユニット2 消費量と原価を集計する

[本文・自力演習・検算の詳細](unit-2-source-records-review.md)

### [材料消費額の計算｜材料元帳・払出し・返却](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-materials/)

`cb2-materials` · 92分の目安 · 章末14問

- [材料の数量のつながりから消費量と月末残高を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-materials/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-materials/#worked-1)。自力演習 `q01, q02, q03, q04, q13`。
- [指定された単価を用いて材料消費額と残存額を計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-materials/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-materials/#worked-2)。自力演習 `q05, q06, q07, q08`。
- [材料消費額を製品別の直接材料費と共通の間接材料費へ集計する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-materials/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-materials/#worked-3)。自力演習 `q09, q10, q11, q12, q14`。

図表：[図　材料が動く向きと、集計への影響](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-materials/#material-movement-map)、[記録を直したときに動く残高と製品別消費量](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-materials/#material-record-reconciliation)。途中確認：[途中で確認　返却と付け替えを区別する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-materials/#guided-materials)。

### [労務費と経費の計算｜消費賃率と当月の製造費](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-labor-expenses/)

`cb2-labor-expenses` · 97分の目安 · 章末14問

- [時間と時間当たり原価から製造労務費を計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-labor-expenses/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-labor-expenses/#worked-1)。自力演習 `q01, q02, q03, q04, q13`。
- [製品別作業と共通作業を分け直接労務費・間接労務費へ集計する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-labor-expenses/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-labor-expenses/#worked-2)。自力演習 `q05, q06, q07, q08`。
- [当月の製造経費を消費期間と対象の条件から求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-labor-expenses/#objective-3)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-labor-expenses/#worked-3)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-labor-expenses/#worked-labor-expense-packet)。自力演習 `q09, q10, q11, q12, q14`。

図表：[図　同じ担当者の作業を、使った活動に応じて集計する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-labor-expenses/#labor-document-map)、[電力計の親子関係と使用先別の計算](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-labor-expenses/#labor-expense-meter-reconciliation)。途中確認：[途中で確認　当月に発生した工場共通費を拾う](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-labor-expenses/#guided-labor-expenses)。

### [製造間接費の配賦率と計算｜配賦基準と製品別原価](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-allocation/)

`cb2-allocation` · 92分の目安 · 章末14問

- [配賦基準の総量から配賦率を求め単位を説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-allocation/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-allocation/#worked-1)。自力演習 `q01, q02, q03, q04, q13`。
- [指定基準で製品別間接費を計算し直接費と合算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-allocation/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-allocation/#worked-2)。自力演習 `q05, q06, q07, q08`。
- [基準変更や端数を含む配賦額を総額へ照合する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-allocation/#objective-3)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-allocation/#worked-3)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-allocation/#worked-allocation-rounding)。自力演習 `q09, q10, q11, q12, q14`。

図表：[図　原票で金額を切り分けてから、共通費を配賦する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-allocation/#allocation-evidence-figure)、[作業票の30分をBからAへ移したときの配賦表](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-allocation/#allocation-time-correction)。途中確認：[途中で確認　訂正した時間でBの配賦額を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-allocation/#guided-allocation)。

### [原価の流れと仕訳｜仕掛品・製品・売上原価](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-flow/)

`cb2-cost-flow` · 92分の目安 · 章末14問

- [製造に関する勘定と借方・貸方の基本的な動きを説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-flow/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-flow/#worked-1)。自力演習 `q01, q02, q03, q04`。
- [材料消費・製造原価投入・完成・販売に伴う原価の移動を記録する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-flow/#objective-2)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-flow/#worked-2)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-flow/#worked-3)。自力演習 `q05, q06, q07, q08, q14`。
- [仕掛品・製品・売上原価の金額を照合し二重費用化を避ける](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-flow/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-flow/#worked-3)。自力演習 `q09, q10, q11, q12, q13, q14`。

図表：[月次の残高表。太字の金額が、次の行に引き継がれます。単位は円です。](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-flow/#monthly-cost-ledger)、[二つの誤記録を別々にたどると、残高の差を説明できる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-flow/#cost-flow-two-errors)。途中確認：[途中で確認　完成と販売を訂正し、製品残高へつなぐ](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-flow/#guided-cost-flow)。

### [製品別原価計算表の作り方｜原票の照合と誤りの訂正](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-sheet-audit/)

`cb2-cost-sheet-audit` · 85分の目安 · 章末6問

- [原票を読み、製品別の直接費・工場共通費・製造外の費用を整理する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-sheet-audit/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-sheet-audit/#worked-1)。自力演習 `q01, q02`。
- [製品別原価表を復元し、合計では見えない分類や配賦の誤りを説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-sheet-audit/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-sheet-audit/#worked-2)。自力演習 `q03, q04`。
- [訂正後の製品別原価を販売分と在庫に分け、売上原価への影響を照合する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-sheet-audit/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-sheet-audit/#worked-3)。自力演習 `q05, q06`。

図表：[原票と、製品別に金額を集計する前に確かめる資料](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-sheet-audit/#cost-sheet-records)、[原票から作り直した製品別原価表と、照合前の表](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-sheet-audit/#cost-sheet-reconstruction)。途中確認：[途中で確認　別の製品別原価表で販売分を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cost-sheet-audit/#guided-cost-sheet-audit)。

## ユニット3 在庫と製品・サービス別の利益

[本文・自力演習・検算の詳細](unit-3-monthly-profit-review.md)

### [月末仕掛品と完成原価の計算](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-wip/)

`cb2-wip` · 87分の目安 · 章末13問

- [仕掛品の月初・当月投入・完成・月末の関係から完成品原価を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-wip/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-wip/#worked-1)。自力演習 `q01, q02, q03, q04`。
- [未完成の製品に直接追跡できる原価と指定配賦額を集めて月末仕掛品を評価する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-wip/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-wip/#worked-2)。自力演習 `q05, q06, q07, q08`。
- [不明な投入額や残高を逆算し、翌月の引継ぎと二方向の検算を行う](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-wip/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-wip/#worked-3)。自力演習 `q09, q10, q11, q12, q13`。

図表：[仕掛品の増加・完成振替・月末残高](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-wip/#unit3-wip-model)、[完成と未完成を判定する資料と金額](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-wip/#unit3-wip-comparison)。途中確認：[途中で確認　原票で確認した未完成分から完成額を出す](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-wip/#guided-wip)。

### [月末製品原価と売上原価の計算](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-finished/)

`cb2-finished` · 87分の目安 · 章末13問

- [月初製品・当月完成原価・月末製品から売上原価を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-finished/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-finished/#worked-1)。自力演習 `q01, q02, q03, q04`。
- [完成数量・販売数量・単位原価を区別して製品在庫を評価する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-finished/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-finished/#worked-2)。自力演習 `q05, q06, q07, q08`。
- [数量と原価の未知数を逆算し、仕掛品から売上原価まで一貫して検算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-finished/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-finished/#worked-3)。自力演習 `q09, q10, q11, q12, q13`。

図表：[完成した製品の原価が売上原価へ移る条件](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-finished/#unit3-finished-model)、[販売したロットと期末に残るロットの金額](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-finished/#unit3-finished-comparison)。途中確認：[途中で確認　販売明細からロット別の売上原価を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-finished/#guided-finished)。

### [損益計算書の作り方｜売上総利益と営業利益](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-pnl/)

`cb2-pnl` · 87分の目安 · 章末13問

- [製造原価・売上原価・販売費及び一般管理費を活動と期間から区別する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-pnl/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-pnl/#worked-1)。自力演習 `q01, q02, q03, q04`。
- [売上高から売上総利益と営業利益の表を順に完成し、逆算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-pnl/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-pnl/#worked-2)。自力演習 `q05, q06, q07, q08`。
- [利益の額と利益率、営業損失の意味を読み、二重控除や集計漏れを検算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-pnl/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-pnl/#worked-3)。自力演習 `q09, q10, q11, q12, q13`。

図表：[費用を原価にするか、販管費にするかの判断](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-pnl/#unit3-pnl-model)、[組替えと期間訂正が利益へ及ぼす違い](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-pnl/#unit3-pnl-comparison)。途中確認：[途中で確認　組替えと当月費用の訂正後の営業利益を出す](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-pnl/#guided-pnl)。

### [製品別利益の計算｜配賦と営業利益の逆算](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-product-profit/)

`cb2-product-profit` · 102分の目安 · 章末13問

- [二製品の直接費・配賦費から製造原価と単位原価を組み立てる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-product-profit/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-product-profit/#worked-1)。自力演習 `q01, q02, q03, q04`。
- [数量と在庫条件を使い、製品別の売上原価・売上総利益・営業利益を計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-product-profit/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-product-profit/#worked-product-profit-inventory-backsolve)。自力演習 `q05, q06, q07, q08`。
- [配賦基準と直接把握できる費用を区別し、全体との一致と利益比較の条件を説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-product-profit/#objective-3)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-product-profit/#worked-2)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-product-profit/#worked-3)。自力演習 `q09, q10, q11, q12, q13`。

図表：[製品別の売上から営業利益までの集計行](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-product-profit/#unit3-product-profit-model)、[分かっている利益から在庫に戻る検算](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-product-profit/#unit3-product-profit-comparison)。途中確認：[途中で確認　営業利益から月末製品の額まで逆算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-product-profit/#guided-product-profit)。

### [サービス別の利益計算｜修理・役務・小売](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/)

`cb2-services` · 97分の目安 · 章末13問

- [顧客・作業・案件など原価を計算する単位を決め、直接費と共通費を整理する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#objective-1)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#worked-services-unit-selection)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#worked-1)。自力演習 `q01, q02, q03, q04`。
- [サービス別の作業時間・消費額・配賦条件から原価と利益を計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#objective-2)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#worked-1)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#worked-2)、[例題3](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#worked-services-two-drivers-diagnostic)。自力演習 `q05, q06, q07, q08`。
- [完了と未完了の指定条件や小売の在庫を区別し、サービスの違いに応じた原価の流れを説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#worked-3)。自力演習 `q09, q10, q11, q12, q13`。

図表：[対象と集計単位を決める手順](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#unit3-services-model)、[共通費を配賦する基準とサービス別利益](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#unit3-services-comparison)。途中確認：[途中で確認　完了した修理分の営業利益を計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-services/#guided-services)。

### [製品別月次損益計算書｜在庫から営業利益まで](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-monthly-profit-statement/)

`cb2-monthly-profit-statement` · 92分の目安 · 章末6問

- [二製品への製造間接費を集計し、仕掛品と製品を順に調整する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-monthly-profit-statement/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-monthly-profit-statement/#worked-1)。自力演習 `q01, q02`。
- [別の基準で販管費を配賦し、製品別損益表と合計を照合する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-monthly-profit-statement/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-monthly-profit-statement/#worked-2)。自力演習 `q03, q04`。
- [月末残高の訂正が完成原価・売上原価と利益にどう波及するか検算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-monthly-profit-statement/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-monthly-profit-statement/#worked-3)。自力演習 `q05, q06`。

図表：[製造・在庫・売上の資料を、AとBで読み合わせる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-monthly-profit-statement/#monthly-profit-packet)、[月次損益計算書の記入練習。二つの列を足し、合計欄と照合する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-monthly-profit-statement/#monthly-profit-worksheet)、[Aの月末仕掛品の訂正で動く行と、その向き](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-monthly-profit-statement/#monthly-profit-correction)。途中確認：[途中で確認　仕掛品と製品の訂正を別々に反映する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-monthly-profit-statement/#guided-monthly-profit-statement)。

## ユニット4 利益を計画する

[本文・自力演習・検算の詳細](unit-4-cvp-planning-review.md)

### [変動費と固定費の違い｜費用の計算と条件の変化](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-behavior/)

`cb2-behavior` · 77分の目安 · 章末14問

- [活動量と費用の関係から変動費・固定費を区別する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-behavior/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-behavior/#worked-1)。自力演習 `q01, q14`。
- [総額と単位当たりの費用を数量に合わせて計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-behavior/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-behavior/#worked-2)。自力演習 `q02, q03, q04, q05, q06, q07, q10, q11, q13`。
- [直接・間接の区分との違いと計算の前提を説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-behavior/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-behavior/#worked-3)。自力演習 `q08, q09, q12`。

図表：[費用の分類と総額に使う単位](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-behavior/#unit4-behavior-model)、[料金の適用範囲で分けた費用と差額](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-behavior/#unit4-behavior-comparison)。途中確認：[途中で確認　条件をまたぐ数量で総費用を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-behavior/#guided-behavior)。

### [貢献利益と貢献利益率の求め方](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-contribution/)

`cb2-contribution` · 82分の目安 · 章末14問

- [単位貢献利益と貢献利益総額を計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-contribution/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-contribution/#worked-1)。自力演習 `q01, q02, q09`。
- [変動販売費を含む費用区分で営業利益を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-contribution/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-contribution/#worked-2)。自力演習 `q03, q04, q05, q10, q11, q14`。
- [貢献利益率と追加販売による利益の変化を説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-contribution/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-contribution/#worked-3)。自力演習 `q06, q07, q08, q12, q13`。

図表：[売上高を変動費と貢献利益に分けて読む](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-contribution/#unit4-contribution-model)、[売上高が同じでも貢献利益が変わる条件](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-contribution/#unit4-contribution-comparison)。途中確認：[途中で確認　販売経路ごとの貢献利益を合わせる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-contribution/#guided-contribution)。

### [損益分岐点の求め方｜販売数量と売上高](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/)

`cb2-break-even` · 87分の目安 · 章末14問

- [貢献利益と固定費が等しくなる損益分岐点を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/#worked-1)。自力演習 `q01, q04, q07, q12`。
- [数量と売上高の計算を使い分けて結果を検算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/#worked-2)。自力演習 `q02, q03, q10, q11, q14`。
- [整数制約と貢献利益が正でない場合を区別する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/#objective-3)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/#worked-3)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/#worked-break-even-nonpositive)。自力演習 `q05, q06, q08, q09, q13`。

図表：[損益分岐点と前後の数量で動く利益](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/#unit4-break-even-model)、[実績から逆算した分岐点の照合](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/#unit4-break-even-comparison)。途中確認：[途中で確認　整数で赤字を避けられる数量を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/#guided-break-even)。

### [目標利益を達成する販売数量と必要売価](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/)

`cb2-target-profit` · 92分の目安 · 章末14問

- [目標営業利益を達成する販売数量・売上高を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/#worked-1)。自力演習 `q01, q02, q04, q09, q12, q14`。
- [数量を固定したときの必要売価や費用上限を逆算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/#objective-2)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/#worked-2)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/#worked-3)、[例題3](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/#worked-target-profit-percentage-fee)。自力演習 `q05, q06, q07, q10, q11`。
- [切上げた数量と計画の活動範囲を検算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/#worked-target-profit-capacity)。自力演習 `q03, q08, q13`。

図表：[与えられた条件から式を選ぶ順番](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/#unit4-target-profit-model)、[1円刻みの売価の前後で目標を検算](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/#unit4-target-profit-comparison)。途中確認：[途中で確認　手数料率を考慮して必要売価を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-target-profit/#guided-target-profit)。

### [安全余裕率の計算｜売上の余裕と条件の変化](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-safety-changes/)

`cb2-safety-changes` · 92分の目安 · 章末14問

- [実際売上高と損益分岐点の差から販売の余裕を説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-safety-changes/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-safety-changes/#worked-1)。自力演習 `q01, q02, q03, q09, q14`。
- [売価・単位変動費・固定費の変更案を独立に計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-safety-changes/#objective-2)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-safety-changes/#worked-2)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-safety-changes/#worked-3)。自力演習 `q05, q06, q07, q08, q13`。
- [売上変化と利益変化を区別して条件を照合する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-safety-changes/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-safety-changes/#worked-safety-shift-in-sales-mix)。自力演習 `q04, q10, q11, q12`。

図表：[損益分岐点と売上見込みを分ける](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-safety-changes/#unit4-safety-changes-model)、[売上高が同じ計画の利益と安全余裕の比較](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-safety-changes/#unit4-safety-changes-comparison)。途中確認：[途中で確認　固定費を見直した後の安全余裕額を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-safety-changes/#guided-safety-changes)。

### [CVP分析の例題｜営業計画と値上げ後の損益](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cvp-planning-case/)

`cb2-cvp-planning-case` · 92分の目安 · 章末6問

- [売価・販売数量と複数の費用明細から売上高と営業利益の表を作る](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cvp-planning-case/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cvp-planning-case/#worked-1)。自力演習 `q01, q02`。
- [貢献利益率と単位貢献利益から販売数量・売上高の分岐点を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cvp-planning-case/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cvp-planning-case/#worked-2)。自力演習 `q03, q04`。
- [値上げ後の分岐点と営業利益を計算し、条件次第で結果が変わる理由を説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cvp-planning-case/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cvp-planning-case/#worked-3)。自力演習 `q05, q06`。

図表：[体験講座の資料を、人数で増える費用と毎月の費用に分ける](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cvp-planning-case/#cvp-planning-packet)、[空欄を埋めて、180人の見込みと営業利益がゼロになる条件を比べる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cvp-planning-case/#cvp-planning-worksheet)、[値上げしても、見込みの営業利益は参加人数に左右される](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cvp-planning-case/#cvp-planning-price)。途中確認：[途中で確認　新料金で現行利益を確保する最小件数を出す](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-cvp-planning-case/#guided-cvp-planning-case)。

## ユニット5 予算と実績から利益を確かめる

[本文・自力演習・検算の詳細](unit-5-sales-variance-review.md)

### [売上高の予算と実績の比較｜差額と達成率](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-budget/)

`cb2-budget` · 77分の目安 · 章末14問

- [数量と単価から予算売上高・実際売上高を求める](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-budget/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-budget/#worked-1)。自力演習 `q01, q02, q07`。
- [同じ期間・単位の差額と達成率を計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-budget/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-budget/#worked-2)。自力演習 `q03, q04, q05, q06, q08, q10, q11, q12, q14`。
- [売上の差とその原因・利益を区別して説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-budget/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-budget/#worked-budget-profit-interpretation)。自力演習 `q09, q13`。

図表：[予算・実績の売上高をそろえる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-budget/#unit5-budget-model)、[営業予定と締め日を照合する月途中の事例](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-budget/#unit5-budget-comparison)。途中確認：[途中で確認　月途中の予算額と実績額を合わせて読む](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-budget/#guided-budget)。

### [販売数量差異と販売価格差異の計算](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/)

`cb2-sales-variance` · 97分の目安 · 章末14問

- [販売数量差異と販売価格差異を定義に沿って計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/#worked-1)。自力演習 `q01, q02, q04, q05, q07`。
- [比較用売上高を使って二つの差異の合計を検算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/#objective-2)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/#worked-2)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/#worked-3)。自力演習 `q03, q06, q08, q12, q13`。
- [基準数量・単価と符号が異なる分析方式を区別する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/#worked-sales-variance-alternate-order)。自力演習 `q09, q10, q11, q14`。

図表：[価格を固定して数量を変える計算順](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/#unit5-sales-variance-model)、[500,000円から495,000円までの計算順。売上高を二段階に分けて比べる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/#sales-variance-bridge-diagram)、[資料から比較用売上高を復元し、別方式と照合](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/#unit5-sales-variance-comparison)。途中確認：[途中で確認　比較用売上高を使って価格の影響を確かめる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/#guided-sales-variance)。

### [複数製品の売上高差異｜返品・新商品・集計](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-variance-cases/)

`cb2-variance-cases` · 97分の目安 · 章末14問

- [複数製品の売上差異を製品ごとに分解して合計する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-variance-cases/#objective-1)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-variance-cases/#worked-1)。自力演習 `q01, q02, q03, q10, q11, q12`。
- [相殺された増減と単位の違いを説明する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-variance-cases/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-variance-cases/#worked-2)。自力演習 `q05, q06, q07`。
- [サービスや返品条件の明示された売上を分析する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-variance-cases/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-variance-cases/#worked-3)。自力演習 `q04, q08, q09, q13, q14`。

図表：[製品ごとに数量差異と価格差異を足す](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-variance-cases/#unit5-variance-cases-model)、[新商品や販売終了で、比較できる範囲を確かめる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-variance-cases/#unit5-variance-cases-comparison)。途中確認：[途中で確認　単位が違う商品とサービスを金額で集計する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-variance-cases/#guided-variance-cases)。

### [原価計算初級の総合例題｜在庫・CVP・売上高差異](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/)

`cb2-integration` · 107分の目安 · 章末14問

- [二製品の直接費・配賦費と在庫から営業利益を計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#objective-1)。[例題1](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#worked-1)、[例題2](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#worked-2)。自力演習 `q01, q02, q03, q04, q05, q06`。
- [在庫が変わる損益と在庫一定のCVPを区別して計画する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#objective-2)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#worked-3)。自力演習 `q07, q08, q09, q14`。
- [製品別の売上差異を集計し損益計算と照合する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#objective-3)。[例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#worked-4)。自力演習 `q10, q11, q12, q13`。

図表：[当月実績と計画で使う資料を分ける](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#unit5-integration-model)、[売上高差異から費用と営業利益まで別に照合](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#unit5-integration-comparison)。途中確認：[途中で確認　売上が増えた月の営業利益を費用から確かめる](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#guided-integration)。

## 更新時の確認

章を追加する場合は `src/content/lessons/` に本文を置き、`cost-beginner-plan.json` と設問バンク、カバレッジ台帳、出典台帳を更新する。既存の章IDと公開URLを維持する。既存成績の意味が変わる評価の改定では版を更新する。教材の内容・評価を変えたら `pnpm build` でTXTを再生成し、`pnpm verify` と原価計算初級のテストを実行する。変更時は本文、到達目標、例題、演習解説、図表の対応を再確認する。

## 検索語と対象ページ

集計基準：2026-11-15版の Google Search Console／Bing Webmaster Tools エクスポート。Google のコースページ行は表示2回・クリック0回・平均掲載順位8.0。日本のサイト全体では表示62回（うちモバイル53回）。ページ集計と検索語集計は別のため、特定の検索語の表示・順位に結び付けられない。Bing のサイト全体の日別集計にも同じページの検索語別データはない。この段階では低CTRの原因や順位の傾向を判断しない。

| 検索意図の候補 | 対象 | 今回の対応 |
| --- | --- | --- |
| 原価計算初級 無料 テキスト、日商 原価計算初級 勉強順 | [コース](https://shikaku-step-note.github.io/qualifications/cost-beginner/) | 検索用タイトルに資格名・無料テキスト・勉強順・40分模試を自然に含めた。本文には、ユニット確認から総復習と模試へ進む順序を追加した。 |
| 原価計算初級 総合例題 | [統合章](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/) | 在庫・製品別損益・計画・差異がつながる公開例題から、課程末の資料問題へ案内した。 |
| 原価計算初級 損益分岐点、売上高差異分析、原材料 消費量 | [損益分岐点](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-break-even/)・[売上高差異](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-variance/)・[材料](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-materials/) | 具体的な計算意図には既存の公開章を使う。内訳の計算順序をたどる導線、倉庫払出と消費の違いなど、該当箇所に教材上の補足を追加した。 |
| 原価計算初級 模試 40分 | [コースの模試案内](https://shikaku-step-note.github.io/qualifications/cost-beginner/#cost-mock-practice) | 公開コースから試験時間と模試の選択肢へ案内する。受験画面は noindex。 |

検索語は公開検索結果の表示や日本語の学習意図に基づく候補であり、検索量の確認値ではない。[Google のタイトルリンク](https://developers.google.com/search/docs/appearance/title-link)と[ユーザー第一のコンテンツ](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)を参照。再クロール後に十分なデータがたまったら、同じ国・端末・ページ・検索語で前後約28日をそろえ、表示回数、順位、CTR、クリックを比較する。
