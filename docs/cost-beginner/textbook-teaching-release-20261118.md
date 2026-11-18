# 原価計算初級の改訂記録（2026-11-18）

## 対象と一次資料

[日本商工会議所の出題区分表](https://www.kentei.ne.jp/bookkeeping/exam-list)と[原価計算初級の範囲PDF](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30genkashokyu.pdf)を照合。対象は原価計算初級の全範囲（公式3領域・9小区分）。2026年度は2027年3月31日まで。2027年4月1日からの2027年度も同じ範囲が適用される。公式の案内で、会場での選択式ネット試験、40分、100点満点で70点以上、受験資格の制限なしを再確認した。[試験概要](https://www.kentei.ne.jp/bookkeeping/ca/effect)・[ネット試験案内](https://www.kentei.ne.jp/33013)・[資料台帳](source-register.json)。

[公開サンプル](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/03/SAMPLE_ca2018.pdf)は課題の構成を知る手掛かりとした。試験で固定された問題数、個別配点、部分点、受験者での難度校正は確認できない。二つの模試の資料・設問・数値は独自。個別原価計算と総合原価計算の形態の区別や標準原価計算は、[公式の上位級とのつながり](https://www.kentei.ne.jp/bookkeeping/ca/point_ca)に従い必須範囲へ広げない。

## 章の判断と習得の流れ

各分野の技能を[対応データ](../../src/data/cost-beginner-coverage.json)と [公開対応表](https://shikaku-step-note.github.io/qualifications/cost-beginner/coverage/)に記録。既存の42技能と33章（8／6／7／7／5章）で、基礎の分類から二製品の計算、計画と差異の分析までの移行をたどった。今回は各章で既存の中心課題を深めることで新しいケースの前提・手順・練習をつなげられたため、章を分割していない。

| 学習ユニット | 説明・原票と新しい練習で確かめる判断 |
| --- | --- |
| 1 原価の考え方と分類 | 資源を使う目的と記録時点、追跡先と部門の違い、売上と原価の期間の対応を資料から認定する。 |
| 2 消費量と原価を集計する | 材料の払出し、作業時間、設備時間を読み分ける。配賦基準の訂正が各製品や残高にどう広がるか確かめる。 |
| 3 在庫と製品・サービス別の利益 | 数量・単価・ロットをそろえ、仕掛品・製品・販売分を移し替える。期間の損益を別の資料と照合する。 |
| 4 利益を計画する | 変動費と固定費、貢献利益率、分岐点と目標利益を順に求め、前提や販売構成が変わった場合を表で検算する。 |
| 5 予算と実績から利益を確かめる | 箱と個数や返品・値引きを正規化し、差異を資料へ戻って検算する。最後に材料・労務・配賦を製品別に集め、完成数と販売数から在庫と損益を作る。 |

全章で二つ以上の図表と途中確認を用意。新しい注釈付き表では、元の記録、換算の単位、計算後の値を隣り合わせにした。練習では検算次第で見つからない誤りを確認する。[いぬぼきの転記の例](https://inuboki.com/nyuumon/nyuumon-text6/)と[段階ごとに図を埋める例](https://inuboki.com/2q-koubo-kouza/koubo-kouza3-5/)を、資料で見つけた値を一段ずつ結果につなぐ説明の例として参照した。

総合例題の新しいケースでは、A/Bの完成原価が72,000円／52,000円、月末製品原価が12,000円／6,500円、営業利益合計は73,500円。別の自力課題では、製品X/Yの売上原価を数量から求めても、完成原価から期末製品を差し引いても合計66,500円になり、営業利益は19,750円。[総合例題](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#worked-integration-physical-records)。

## 模試と記録

第1回を改訂し、共通資料を使う18問の原価、数量、選択肢、解説を見直した。費用の明細を分けて貢献利益率を出し、製造の記録から製品別原価・在庫・利益まで求める。第1回はv5、第2回はv4。各37小問・40分・独自配点100点。既存の学習記録・採点済みの結果を保持し、第2回の途中解答も再開できる。第1回の旧版で未提出の場合は新版で新たに開始する。[模試の独立検算](mock-source-reconciliation-20261118.md)。

## 検索で想定する質問

2026年11月18日に公開結果の内容と教材を照合した。月間検索数や実際の順位・クリック率は計測していない。

| 質問・検索語の例 | 案内先 |
| --- | --- |
| 原価計算初級の試験の流れ・40分模試 | [講座トップ](https://shikaku-step-note.github.io/qualifications/cost-beginner/)・[模試一覧](https://shikaku-step-note.github.io/qualifications/cost-beginner/tests/) |
| 製品別損益計算で材料消費量、直接作業時間、月末製品原価をどう使うか | [元の記録から製品利益まで計算する](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-integration/#worked-integration-physical-records) |
| 販売数量差異と販売価格差異を返品・値引きについてどう計算するか | [販売明細の照合](https://shikaku-step-note.github.io/qualifications/cost-beginner/cb2-sales-ledger-reconciliation/) |

更新するときは、学習順、技能との対応、本文へのアンカーと用語リンク、模試の版を確認する。配布TXTは `pnpm build` で生成する。
