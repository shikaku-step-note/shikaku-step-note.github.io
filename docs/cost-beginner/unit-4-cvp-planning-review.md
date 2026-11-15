# 原価計算初級 ユニット4の範囲・教材・検索の点検

確認日 2026-11-15。改訂対象は「利益を計画する」。日本商工会議所の出題範囲2(1)は変動費と固定費、売上高、貢献利益と営業利益、損益分岐点。2026年度に適用される範囲と2027年度確定版の原価計算初級に変更はない。原価の分類はユニット1・2、製品・サービス別の期間損益はユニット3、予算と実績の差異はユニット5につながる。[出題範囲](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30genkashokyu.pdf) · [適用年度](https://www.kentei.ne.jp/bookkeeping/exam-list)

公式サンプル第2問では月額・単位当たりなどの明細から費用を集め、数量別の営業利益、貢献利益率、損益分岐点売上高、価格変更の影響を求める。現行の試験案内は40分の選択式。サンプルの配点や小問数は固定仕様と扱わない。本文・問題・表は独自作成。目標利益、安全余裕、販売経路・商品構成、契約の段階差は、公式項目とは区別して利益式の応用として扱う。[公開サンプル](https://www.kentei.ne.jp/bookkeeping/ca/sample) · [試験案内](https://www.kentei.ne.jp/33013)

## 教材と検索意図の対応

以前の5章には単独の計算と70問の理解度チェックがある。資料からCVP表を作って料金変更までつなぐ章はなかったため、第6章を追加。既存の本文・図表・例題・採点データを保持し、5章すべてに条件を読み直す例題と数値入力を加えた。

| 章 | 日本語の検索意図候補 | 今回の例題の到達点と確認箇所 |
| --- | --- | --- |
| cb2-behavior | 変動費と固定費の違い、数量と総費用 | #unit4-behavior-model と #unit4-behavior-comparison、契約の範囲をまたぐ費用を比較。#guided-behavior は184,000円を算定 |
| cb2-contribution | 貢献利益率の求め方、貢献利益と営業利益 | #unit4-contribution-model と #unit4-contribution-comparison、売上高一定でも販売経路で貢献利益が変わる理由。#guided-contribution は205,000円を算定 |
| cb2-break-even | 損益分岐点の求め方、件数と売上高の違い | #unit4-break-even-model と #unit4-break-even-comparison、二か月の資料から単位費用を戻し、理論値と整数を照合。#guided-break-even は123件 |
| cb2-target-profit | 目標利益の求め方、手数料と必要売価 | #unit4-target-profit-model と #unit4-target-profit-comparison、売上高連動の手数料を含めて1円刻みの売価を検算。#guided-target-profit は1,200円 |
| cb2-safety-changes | 安全余裕率の計算、販売内訳の変化 | #unit4-safety-changes-model と #unit4-safety-changes-comparison、売上が同じ場合に安全余裕が縮む応用。#guided-safety-changes は30,000円 |
| cb2-cvp-planning-case | CVP分析の例題、値上げ後の損益 | #cvp-planning-packet、#cvp-planning-worksheet、#cvp-planning-price で資料の単位、表の空欄、料金・人数の三つを追う。#guided-cvp-planning-case は78件 |

各活動では答えを入力して理由を確かめる。空欄・形式誤りへの案内と、条件を確かめるヒントがある。解答はJavaScriptなしでも開ける。表の見出しを保ち、狭い画面では表にフォーカスして横に移動できる。

新章の例では、現行売上450,000円・利益78,000円、損益分岐点120人・300,000円。単位変動費と固定費を据え置く値上げでは理論97.5人・273,000円、整数で98人・274,400円。150人集まれば利益84,000円、140人では68,000円。固定費が増える場合、変動費が売上高比で一定の場合、受け入れの上限がある場合を別条件として比較する。

## 評価と記録

ユニット4は5章から6章、コースは28章から29章。既存の理解度チェック70問に新章の6問（数値2・選択4）を追加。総合確認は16問から21問。体験講座とは異なる撮影ブースの共通資料を読み、売上300,000円、変動費120,000円、固定費144,000円を集計して、現行の利益36,000円と分岐点240,000円を求める。値上げ後は単位変動費が一定なら分岐点216,000円・見込み利益16,000円、変動費率が一定なら分岐点240,000円。前版の総合確認は履歴に保持し、新版や新章の得点と分ける。既存の用語確認と全範囲40分模試2回は従来どおり学習順に含める。

## 検索の根拠

2026-11-15提供のGoogle Search Consoleの24時間、日本のウェブ検索では、原価計算初級のコースは2表示、0クリック、平均掲載順位8.0。サイト全体62表示のうちモバイル53。提供データはユニット4のクエリ×URLを確認できない。Bingの日別CSVのサイト全体は28表示・3クリックで、個別のクエリとページは確認できない。

上表は公式用語と日本語の公開検索結果を基にした候補。検索数の測定はしていない。単独の式や定義を探す語は解説章に、資料から一連の計算を練習する語は新章に対応させた。オンサイト検索用の日本語表記を教材のキーワードに加えた。公開後は同じ長さの期間・日本・端末別でページとクエリを照合し、母数が十分な行から表示、クリック、順位、CTRを確認する。[Googleのタイトルリンク](https://developers.google.com/search/docs/appearance/title-link) · [検索パフォーマンス](https://support.google.com/webmasters/answer/7576553) · [Google検索のAI機能](https://developers.google.com/search/docs/appearance/ai-features)

## 維持管理

本文は `src/content/lessons/cb2-*.md`、学習順は `src/data/cost-beginner-plan.json`。設問は `cost-beginner-unit45-questions.json` と `cost-beginner-reviews.json`、共通資料は `cost-beginner-unit4-material.json`、出題範囲の根拠は `cost-beginner-coverage.json`。章と設問のIDを維持し、実質的に問題が変わった評価だけ版を上げる。公式の合格条件と適用範囲は年度更新時に確認し、`pnpm build` でTXTを再生成する。
