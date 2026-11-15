# 原価計算初級 ユニット2　教材・評価・検索の点検

対象は「消費量と原価を集計する」。確認日 2026-11-15。日本商工会議所の出題範囲は2026年度適用分と2027年度確定版で変更なし。サイトのユニットは学習順。対象は1(1)の資源消費、1(3)の分類、3(1)の直課・配賦が中心。3(2)・(3)のうち、仕掛品・製品と売上原価への振替までをここで扱い、詳しい在庫と製品別損益はユニット3へ続く。

公開サンプルの第1問から材料元帳と売上原価の仕訳、第3問から複数資料による材料・作業・間接費の製品別集計を確認した。現行試験は40分の選択式。公開サンプルの解答箇所数や配点を固定の本試験仕様とは扱わない。新しい問題文、数値、資料は独自作成。標準原価計算や個別・総合原価計算の方式比較は範囲に追加していない。[公式出題範囲](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30genkashokyu.pdf) · [適用年度](https://www.kentei.ne.jp/bookkeeping/exam-list) · [公開サンプル](https://www.kentei.ne.jp/bookkeeping/ca/sample) · [ネット試験](https://www.kentei.ne.jp/33013)

## 学習順と教え方

以前の4章には個別の計算と発展例がある。原票から製品別の空欄を復元し、製造費の合計が一致する誤記録を検出する複合技能を5章目に追加した。既存の章の説明、例題、理解度チェックを保持し、各章に異なる条件で判断を求める例題と数値入力を加えた。学習済み記録はもとの章に残り、新しい章は別の記録で始まる。

| 章 | 用途と検索意図の候補 | 今回の例題・図解 | 数値入力で確かめること |
| --- | --- | --- | --- |
| cb2-materials | 材料消費額の計算、材料元帳の読み方 | #material-movement-map と #material-record-reconciliation。返却は在庫を動かし、使用先だけの訂正は在庫を動かさない | #guided-materials で返却と付け替えから月末12kg |
| cb2-labor-expenses | 消費賃率の計算、直接労務費と間接労務費 | #labor-document-map と #labor-expense-meter-reconciliation。内訳を含む親メーターの二重加算を避け、工場共通費20,000円を照合 | #guided-labor-expenses で点検時間と当月賃借料から7,250円 |
| cb2-allocation | 製造間接費の配賦率、配賦基準 | #allocation-evidence-figure と #allocation-time-correction。分母から外す時間と、A・Bで移す30分を区別 | #guided-allocation で訂正後のB負担27,000円 |
| cb2-cost-flow | 原価の流れ、仕掛品・製品・売上原価の仕訳 | #monthly-cost-ledger と #cost-flow-two-errors。早すぎる完成8,000円と販売の二重計上5,000円を個別に取り消す | #guided-cost-flow で逆向きの訂正を月末製品23,500円へ反映 |
| cb2-cost-sheet-audit | 製品別原価計算表の作り方、原価明細表 | #cost-sheet-records と #cost-sheet-reconstruction。51,000円が一致する二つの表を比較し、売上原価の過大360円を販売割合から逆算 | #guided-cost-sheet-audit で別の配賦の誤りを訂正し、売上原価37,200円 |

数値入力は空欄や入力形式の問題を送信時に知らせ、誤答時には確認すべき条件を返す。解答・途中式はJavaScriptなしでも開ける。各章の図解は数量や金額の移動と判断根拠を示す。原票や表の内容は本文でも読める。

## 実力確認と採点

- ユニット2は4章から5章、コースは26章から27章。既存の理解度チェック56問を保持し、新章に選択4問と数値入力2問を追加した。
- 総合確認は17問から20問。木工の資料を保持し、金属加工の資料で製品番号の訂正、製品別原価表の復元、在庫・売上原価の再計算を確認する。訂正前後とも製造原価64,200円。作業票の60分の移動で製品別原価は32,600円と31,600円に変わり、売上原価の増加2,075円を別計算で照合した。
- 総合確認だけを新しい版に更新し、旧版の得点は保存する。既存4章の理解度チェック、用語確認、40分模試2回は従来のデータを利用する。新章の理解度チェックは独立して記録する。
- [公開対応表](https://shikaku-step-note.github.io/qualifications/cost-beginner/coverage/)に章ごとの到達目標・例題・採点付き練習への根拠を追加した。

## 検索の点検

2026-11-15のGoogle Search Consoleエクスポートは日本のウェブ検索で過去24時間。原価計算初級のコースの行は2表示・0クリック・平均掲載順位8.0。サイト62表示のうちモバイル53表示。Unit 2のクエリ×ページは確認できない。Bingの日別CSVはサイト全体28表示・3クリックで、ページやクエリの列がない。

上表の検索意図は公式用語と日本語の検索結果から得た候補。検索量や順位の測定値ではない。それぞれ異なる課題を解く章に対応させ、章タイトル・説明・本文をそろえた。内部検索で使う略記や日常語は教材のキーワードに置いた。学習者が使った検索語自体は送信・保存しない。後日、データが得られればGoogleとBingの日本・端末別で同じ日数の前後を比べ、クエリとURLごとの表示、クリック、CTR、順位を確認する。[Googleのタイトルリンク](https://developers.google.com/search/docs/appearance/title-link) · [検索パフォーマンス](https://support.google.com/webmasters/answer/7576553)

## 維持管理

本文は `src/content/lessons/cb2-*.md`、学習順は `src/data/cost-beginner-plan.json`。新章の設問は `cost-beginner-unit12-questions.json`、総合確認と資料は `cost-beginner-reviews.json` と `cost-beginner-unit2-diagnostic-material.json`、出題範囲への対応は `cost-beginner-coverage.json` に置く。章と問題のIDを保ち、採点仕様が変わるときは該当評価の版を更新する。公式の適用範囲と試験方式を確認し、`pnpm build` で学習ツリーと日程表を再出力する。
