# ITパスポート Ver.6.5 ストラテジ系の照合記録

確認日 2026-11-16。[IPAの現行シラバス Ver.6.5](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf)の番号1〜24を、7中分類、14章で辿った。公式番号の対応は、用語例の個別解説や全ての出題条件での練習とは区別する。原稿の旧版はコミット `134fa7b`。14章の固定ID、本文と過去のアンカーを保持した。先頭の図に既存IDがない場合は表示を変えずIDだけを追加した。既存の例題は、下表の本文節と設問の組から追える。

## 章目標ごとの到達点

`#...` をレッスン URL の末尾に付ける。日本語の節名を記した箇所は、章内の見出しが本文の起点。各章に新しい資料付き例題 `#<lesson>-decision-section`、途中確認 `#<lesson>-guided-transfer`、条件の異なる自力演習と解答 `#<lesson>-decision-independent` を追加。図表の具体的な ID、入力値、解答は `strategy-entries.json` で確認できる。

| 章 | 既存の章目標 | 本文と例題 | 旧版の独立練習・追加した条件 |
| --- | --- | --- | --- |
| ip-organization | 経営資源と組織の役割 | #depth-organization、#textbook-organization、#textbook-organization-transfer | ip-organization-textbook-1、ip-organization-depth-1。追加は本人確認の有無で窓口処理と専門判断を切り替える。 |
| ip-organization | PDCAとBCPを業務へ | #depth-organization、#governance-and-ooda | ip-organization-textbook-2、ip-organization-depth-3。追加は処理件数と再受付率を読み、例外の改善を決める。 |
| ip-analysis | 目的に合う図を選ぶ | 「図は目的に合わせて選ぶ」、#process-variation-case | ip-analysis-depth-4〜6の管理図・比較。追加は前後の種類別件数と率が食い違う表を読む。 |
| ip-analysis | 相関と因果を区別 | #depth-analysis、#hypothesis-experiment、#textbook-analysis-transfer | ip-analysis-textbook-1・2は率の計算。追加は構成比固定前後の違いと、因果の追加確認を分離する。 |
| ip-finance | 財務三表の役割 | 「財務三表は何を示すのか」、#depth-finance、#textbook-finance | ip-finance-textbook-2、ip-finance-depth-1〜3。追加は支払義務、支払時点と年末の資金を区別する。 |
| ip-finance | 利益と損益分岐点 | 「例：小さな教材店」、#depth-finance | ip-finance-textbook-1は回収年数。追加は回収の早さと初期支払資金を比較し、年度中の臨時支出も扱う。 |
| ip-rights | 保護対象に合う権利 | #depth-rights、#trade-secret-case、#textbook-rights | ip-rights-textbook-1。追加は公開する資料の種類と、利用する素材の権利確認を分ける。 |
| ip-rights | 利用許諾と著作権 | #depth-rights、#textbook-rights-transfer | ip-rights-textbook-2。追加は掲載可と加工不可を同時に満たす方法を比較する。 |
| ip-law-ethics | 行動と関連法令 | #legal-scope-cases、#oversight-records-and-disposal、#textbook-law-ethics-security | ip-law-ethics-textbook-2〜4。追加は点検に委託する目的、権限、保持と返却を分ける。 |
| ip-law-ethics | 個人情報の目的と第三者提供 | #depth-law-ethics、#textbook-law-ethics-transfer | ip-law-ethics-textbook-1。追加は電話相談の品質点検から不要な識別項目を除いた資料を選ぶ。 |
| ip-standards | 公的標準と事実上の標準 | 「標準の作られ方」、#depth-standards | ip-standards-depth-1〜3。追加は分類を繰り返さず、規則に合ったデータの受入検証まで進む。 |
| ip-standards | 標準化の効果と限界 | #textbook-standards、#textbook-standards-transfer | ip-standards-textbook-1・2。追加は識別子の0、時差、金額の単位を別々に検証する。 |
| ip-strategy | 戦略分析の軸 | #depth-strategy、#textbook-strategy-method | ip-strategy-textbook-1〜3。追加は各施策と成果の因果を確認する実験へ進む。 |
| ip-strategy | KGIとKPIを結ぶ | #depth-strategy、#textbook-strategy-kpi-case | ip-strategy-textbook-4。追加は登録数・有料契約数・一契約当たりの費用を同時に比べる。 |
| ip-marketing | STPと4Pで施策を整理 | 「顧客を理解し、届け方を決める」、#depth-marketing | ip-marketing-depth-1〜3。追加はクリック率と購入率が逆向きに動く場合の次の確認を決める。 |
| ip-marketing | ERP、SCM、CRMの役割 | #systems-worked-diagnosis、#textbook-marketing | ip-marketing-textbook-3は知識継承の応用。追加の広告費比較はマーケティングを深めるもので、経営管理システムの専用練習は既存の理解度チェックも参照する。 |
| ip-tech-business | 技術ロードマップと研究開発 | #depth-tech-business、#textbook-tech-business-transfer | ip-tech-business-textbook-1・2。追加は通信正常時、通信断、保守まで段階ごとに次へ進める条件を選ぶ。 |
| ip-tech-business | 事業に合うシステムの役割 | #public-system-application、#textbook-tech-business-systems | ip-tech-business-textbook-3。追加は遠隔点検システムの検証をした後、保守や更新の担当を比較する。 |
| ip-engineering-iot | 設計と生産を支えるシステム | #manufacturing-worked-plan、#textbook-engineering-iot | ip-engineering-iot-textbook-1。追加は検査待ち、予約済みと入荷予定によって必要手配数量が変わる。 |
| ip-engineering-iot | IoTの計測、通信、制御 | #depth-engineering-iot、#textbook-engineering-iot-transfer | ip-engineering-iot-textbook-2。追加の在庫表はセンサが送った状態と、受入れ可能な状態を区別する。 |
| ip-ecommerce | 取引の組合せと事業モデル | 「誰と誰が取引するか」、「収益の仕組みを比較する」、#depth-ecommerce | ip-ecommerce-depth-1〜3。追加はECで相談を受ける主体、決済の確定、出荷の状態を照合する。 |
| ip-ecommerce | ECの指標を計算 | 「広告と購入の指標」、#textbook-ecommerce | ip-ecommerce-textbook-1。追加は同じ注文IDに受付が重複しても、集計する注文数と入金が増えたとみなさない。 |
| ip-system-strategy | 全体最適と業務改革 | #adoption-measure-case、#textbook-system-strategy-choice | ip-system-strategy-textbook-1・2・4。追加は利用の入口が広がっても手続が完了しない場合を見つける。 |
| ip-system-strategy | クラウド等の利用形態 | 「サービスとしてITを使う」、#textbook-system-strategy-provider | ip-system-strategy-textbook-3。追加例は利用形態の一覧を繰り返さず、導入後の検証を深める。 |
| ip-procurement | 業務要件と非機能要件 | #procurement-document-case、#textbook-procurement-requirements | ip-procurement-textbook-1・4。追加は最安の見積りだけでは判断できない保存・取出し条件。 |
| ip-procurement | RFIとRFPを区別 | 「調達の流れ」、#depth-procurement、#textbook-procurement-contract | ip-procurement-depth-1〜5。追加は依頼側が必須条件を変えた場合の公平な再見積りへ進む。 |
| ip-reading-business-data | 比較すべき母数を決める | 「比較の分母を決める」、「集計の内訳が変わった場合を考える」 | ip-reading-business-data-textbook-rate・weighted・composition。追加は通常と特注を違う店舗・件数で比較する。 |
| ip-reading-business-data | 利益の増減と案の条件 | 「改善したときの利益を求める」、#ip-reading-business-data-decision-section | ip-reading-business-data-textbook-threshold。追加は同じ注文条件にそろえた資料から両案の費用を合算し、予測件数が変わる場合と境界を解く。 |

## 独立確認と残る範囲

- 14章の新旧本文を比較した。新節より前は更新日と図のID以外同一で、既存のURL、図、途中式、記録のIDを維持した。
- 7中分類に独立評価の新しい短い資料問題を各1問追加。うち5の部品手配は入力式。残りは4択で、誤答が生じる計算・資料の読み違いを解説した。新規問 `ip-unit-1-cumulative-1`〜`ip-unit-7-cumulative-1` は内容・答えを元の例題から独立させた。
- 各章の途中確認は、JavaScriptのあるブラウザで数値入力または選択と条件別の案内を出す。JavaScriptがないときも同じ問題文と解答を開ける。HTML原稿のID、表の見出し、フォームの説明、解答のフォールバックを確認した。経営の比較、調達の総費用、在庫、請求、標準の境界、業務分析は独立した式で再計算した。
- 法務は架空の条件を使う。対象規模・取引の個別適用、外部の専門監修、用語例の個別確認、公式試験と同水準とする統計的検証は行っていない。標本設計、媒体をまたぐ複合広告、組織や運用方式ごとの専用演習には追加余地がある。細目ごとの入門・習得効果の残りは既存の `strategy-coverage.json` も参照する。
