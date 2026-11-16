# ITパスポートの教材改訂記録（2026-11-16）

## 適用範囲と確認資料

- 2026年11月16日時点の現行シラバスは [Ver.6.5](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf)。ストラテジ・マネジメント・テクノロジの3分野、23中分類、番号付き63項目を既存教材と照合した。ITパスポートには級や選択科目がない。学習ステップはサイト独自の順序。
- [試験要綱 Ver.5.6](https://www.ipa.go.jp/shiken/syllabus/rcu1hd00000141gq-att/youkou_ver5_6.pdf) と [IPAの概要](https://www.ipa.go.jp/shiken/kubun/ip.html) で、120分、四肢択一100問、評価対象92問、IRTによる評価、総合600点・各分野300点以上の基準を確認。模試は練習用の素点で、実際の評価点との対応や難易度の校正は未検証。
- [2027年度のシラバス案](https://www.ipa.go.jp/shiken/syllabus/henkou/2026/20260630.html) と [サンプル](https://www.ipa.go.jp/shiken/syllabus/henkou/2026/20260622.html) は将来の制度。2026年12月28日からの一時休止・2027年1月下旬の再開予定は、別の [CBT実施案内](https://www.ipa.go.jp/shiken/2026/cbt-202701-yotei.html) に基づく。現行模試の出題配分を将来版に外挿していない。
- [令和6年度公開問題](https://www3.jitec.ipa.go.jp/JitesCbt/html/openinfo/pdf/questions/2024r06_ip_qs.pdf) の問14・24、[令和7年度公開問題](https://www3.jitec.ipa.go.jp/JitesCbt/html/openinfo/pdf/questions/2025r07_ip_qs.pdf) の問99と擬似言語・表計算の巻末資料、[IPA擬似言語サンプル](https://www.ipa.go.jp/shiken/syllabus/ps6vr7000000i9in-att/ip_programming_sample.pdf) を作問前に照合。令和8年度の公開一覧・解答例は確認できたが、問題冊子の取得先はアクセス制限を返した。本文の資料・数字・問題は独自作成。

## 範囲内の変更と復習

| ユニット | レッスン | 理解度チェック | 用語確認 | 総合確認 |
|---|---:|---:|---:|---:|
| 1 企業活動 | 4 → 6 | 40 → 59 | 12 → 22 | 7 → 9 |
| 10 プロジェクトマネジメント | 2 → 3 | 21 → 29 | 4 → 8 | 3 → 4 |
| 13 基礎理論 | 3 → 4 | 48 → 57 | 12 → 16 | 7 → 8 |
| 14 アルゴリズムとプログラミング | 2 → 3 | 25 → 36 | 8 → 14 | 5 → 6 |
| 17 ソフトウェア | 3 → 4 | 26 → 35 | 8 → 12 | 5 → 6 |
| 全23ユニット | 41 → 47 | 517 → 573 | 148 → 176 | 97 → 103 |

- 追加6章を前提の章の後に配置。標本の抽出と測定、在庫と調達時期、工程と担当者の空き、回帰の残差、関数の呼出し、表計算の照合を、条件と手順から教える。既存の「情報理論・AI」は規則を述語で書いて反例を判定する補講、「プログラム言語」は共通部品の呼出し仕様を決める補講と独立設問を追加した。
- その他18ユニットは別章を増やす根拠が得られた範囲の外で、既存の分野別の教材・演習・対応を引き継いだ。各章の前後の本文量、目標、図表、追加技能に対応する例題・演習は [教材証拠表](applied-textbook-evidence-20261116.json)。既存の [ストラテジ](strategy-objective-audit.md)、[マネジメント](management-release-audit.md)、[テクノロジ](technology-chapter-audit.md) の教材監査も参照。
- 図表は103 → 127、途中演習は41 → 47。本文・例題の見積りは3,030 → 3,495分。各章の対象を増やすときも、既存の説明や例題は削っていない。総復習の順序は学習ツリーと公開TXTに記載。
- 二つの100問・120分模試に各6問を入れ替えた。いずれも練習の配分は35/20/45。既存の lesson ID、URL、評価IDを維持した。問題を変えた章末・ユニット・用語総復習と模試には新しい版を付け、過去の結果と新版の途中解答を区別する。
- 別担当のレビューで新設6章の作例と新問の主要な数値、設問の一意性を照合。通常・応援の公開日は7/5/6/7日目。手元の数量に引当済み分が含まれることを2問で明記し、応援待ちでも並行できる作業は着手する条件を補った。残差の二乗和6対50、式の近似一致・位置、境界での戻り値、発注点22と在庫ポジション19も独立して検算した。
- 文体は、[総務省統計局の相関と回帰の解説](https://www.stat.go.jp/dstart/point/seminar/02/3-3-2.html)で変数の役割から式へ進む順序、[文科省「情報Ⅰ」研修教材](https://www.mext.go.jp/content/20200716-mxt_jogai01-000001169_001.pdf)で呼出し元と処理を分けて見せる構成を参考にした。定義、作業の理由、判断順、条件が変わる例を本文で追えるよう、冒頭と例題を通して推敲した。

## 検索語と案内先

検索結果から定性的な意図を調べ、教材としての説明・演習と対応する語をタイトル、概要、内部リンク、サイト内検索へ反映した。検索量や掲載順位を示すものではない。

| 主な検索意図 | 案内先 | ページで教える内容 |
|---|---|---|
| ITパスポート 層別抽出 多段抽出 | [調査の偏り](https://shikaku-step-note.github.io/qualifications/it-passport/ip-source-bias-decision/) | 名簿の選び方、標本と回答の段階 |
| 定期発注方式 発注点 計算 | [在庫管理](https://shikaku-step-note.github.io/qualifications/it-passport/ip-inventory-decisions/) | 発注量の式、欠品の時点、発注週の逆算 |
| 工程計画 人員配置 例題 | [担当者が重なる工程](https://shikaku-step-note.github.io/qualifications/it-passport/ip-resource-planning/) | 担当できる人、日数、費用を同時に見る |
| ITパスポート 回帰分析 残差 | [回帰の読み方](https://shikaku-step-note.github.io/qualifications/it-passport/ip-regression-residuals/) | 残差の符号、二乗和、使える条件 |
| ITパスポート 擬似言語 引数 戻り値 | [関数の呼出し](https://shikaku-step-note.github.io/qualifications/it-passport/ip-function-trace/) | 呼出しごとの値と境界の追跡 |
| 垂直照合 水平照合 近似一致 | [表計算の表引き](https://shikaku-step-note.github.io/qualifications/it-passport/ip-spreadsheet-lookups/) | 完全・近似一致、結果を返す位置、別シート |

過去の24時間エクスポートの制約は [前回の調査記録](course-release-20261116.md) に記載。ページとクエリを組み合わせた基準値や、本更新後の表示数・掲載順位・クリック率は未測定。後から比較する場合は同じクエリ・ページ・地域・端末で条件をそろえ、表示回数と順位も一緒に確認する。

## 残る限界と次の改訂

番号付き63項目を案内する範囲は維持した。シラバスの全例示語を一語ずつ技能として試験形式に落とし込む確認や、実際の受験結果との照合までは行っていない。ITパスポートの範囲を超える個々の検定公式の導出、待ち行列の理論モデル、実案件の法的判断は別の学習範囲。

レッスン本文は `src/content/lessons/ip-*.md`、新しい演習は `src/data/ip-application-practice.json`。既存の章IDを維持し、新規章は順序・中分類・公式番号を登録する。設問・採点を変更した評価は版を更新する。正式な適用日と範囲が公表されたら公式資料と例題を照合してから切り替える。`pnpm build` で学習ツリーTXTとサイトマップを再生成する。
