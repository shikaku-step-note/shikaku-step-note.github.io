# ITパスポート Ver.6.5 アップグレード

着手：2026-11-12。現行は単一のCBT試験で、対象はストラテジ・マネジメント・テクノロジの全範囲。公式の級・選択科目はありません。2027年度予定のシラバス案は別扱いです。

- 現行版と改定履歴：https://www.ipa.go.jp/shiken/syllabus/gaiyou.html
- 出題範囲：https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf
- 現行の形式：https://www.ipa.go.jp/shiken/kubun/ip.html
- 公開問題の案内：https://www.ipa.go.jp/shiken/mondai-kaiotu/index.html
- 将来案：https://www.ipa.go.jp/shiken/syllabus/henkou/2026/20260630.html

開始時点：37現行レッスン、23ユニット、63公式項目の対応表、四肢択一120分100問の独自模試1回。項目名の対応は、説明・適用練習の深さを保証しません。

第一バッチ：財務、プロジェクト管理、2進数・論理演算。例題と別条件の入力問題を追加。損益分岐点の比較、依存関係図、2進数の重みを操作できます。理解度チェック3本だけ評価版を変更。URL、レッスンID、旧問題ID、模試・用語・復習の評価版は維持。

残作業：63項目の実質的な技能監査、未拡充34本の教学と視覚化、独立した総復習の精査、既存模試の質の点検と第2回100問の内容精査、全体の日本語校正、ブラウザ・保存確認、公開・配信確認。全課程完成の表示はしません。

第2回を実装：ストラテジ35、マネジメント20、テクノロジ45。四肢択一100問・120分。第1回のIDと版は維持。公開前に問題の難度と解答根拠を再点検する。

## 検証済みの作業地点

- 公開前の作業ツリー。コミット、push、配信は未実施。
- 型検査：95ファイルでエラー・警告なし。静的ビルド：1068 HTML、342サイトマップURL、既存の広告対象334ページ。保存と採点の回帰テスト78件が成功。
- ブラウザ（広告など外部通信を遮断した合成記録）：360pxダーク表示、キーボードでの損益・作業順の操作、2進数の切替とリセット、120分の第2回、見直しフラグ復元、全角数値の再読込と解説表示を確認。
- baseline-coverage.json は63項目と現行37本の機械的な対応と現行の問題数の棚卸し。全項目の教学の十分さを確認したという意味ではない。
- 第2回は第1回を改変せず新規登録。形式と分野数、問題の重複なし、8件の数値解答を別計算で確認した。全問の独立した内容レビューや受験者の難易度試行は未実施。
- 次にストラテジの企業活動（ip-organization / ip-analysis）を、公式項目1・2の細目から監査し、現場事例・図解・独立問題を追加。残り34本も単元単位で同様に進める。先行3本も最終的な深度・適用範囲を再点検する。レビュー後に全コースのメタデータ、TXT、学習順を再照合し、公開する。

## 続き：企業活動（項目1・2）

IPA Ver.6.5 PDFの印刷ページ4〜7を参照。ip-organizationに倉庫運営を題材とした権限、組織形態、人材育成、通常時の改善とBCP/BCM、DXの適用事例を追加。ip-analysisに分析単位、調査、欠損・名寄せ、グラフの読み方、データの比較条件、作業制約と意思決定、原因仮説の確認を追加。対応する独立問題は各2問。累計5レッスンを拡充、10問を追加。追加した2レッスンのID・順序と元の設問IDは維持。

項目1の追加確認：ガバナンス・社会課題・多様な組織形態の演習。項目2の追加確認：管理図、標本抽出・検定、データサイエンスの全体像は既存関連教材との連携と演習を監査する。今回の変更だけで項目1・2の細目全てを確認済みとは扱わない。次は会計・財務の残る細目と、法務4〜8の一次資料確認・技能別演習。

会計・財務（項目3）：利益率、流動比率、投資利益率を別の例で練習できるよう補足。国税庁の資料に基づく消費税・インボイスの基本説明と、流動比率の数値入力1問を追加。追加入力は累計11問。回帰78件が成功。法務の次の作業では、IPAの項目4〜8にある用語例と実際の判断技能を分け、法令・公的資料を確認してから演習を増やす。

## 2026-11-12 release review

- 37 existing lessons across 23 units now include worked examples and 75 additional input questions. The separate cumulative review adds 23 questions. Both mocks contain 100 questions and run for 120 minutes in timed mode.
- The public coverage table maps all 63 numbered Ver.6.5 topics to lessons. It also identifies areas for further study, including control charts, hypothesis testing, legal applicability, and combined multi-document cases. The future draft is separate.
- Stable lesson IDs, URLs, bookmarks, and mock 1 records are preserved. The expanded lesson assessments and the new cumulative review and mock 2 carry distinct assessment versions.
- Astro type checking and the release verifier passed. The full storage and scoring suite passed 78 tests, including independent arithmetic checks for the second mock and the cumulative review. The release verifier checked 1,070 HTML pages, 342 sitemap URLs and the existing AdSense policy.
- Mock questions are original. The forms have no external difficulty calibration and use practice scores. The visual aids are original HTML and SVG.
