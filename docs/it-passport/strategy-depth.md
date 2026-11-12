# ITパスポート Ver.6.5 ストラテジ系の教材対応

[IPA シラバス Ver.6.5](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf)の本文ページ番号を使用。以下は今回追加した内容の証跡で、公式用語例ごとの網羅判定や学習効果測定ではありません。

| IPA本文 | レッスンと節 | 追加の教示と事例 | 独立設問ID |
|---|---|---|---|
| 本文4〜5ページ | ip-organization#depth-organization | 二つの組織図から、決める人を探す／改善の数字と事業継続の判断を分ける | ip-organization-depth-1〜3 |
| 本文5〜7ページ | ip-analysis#depth-analysis | 管理限界を越えたとき、製品の合否と工程の異常を分ける／前後比較と比較実験では、答えられる問いが違う | ip-analysis-depth-1〜3 |
| 本文7〜8ページ | ip-finance#depth-finance | 掛売りを入れると利益と現金はいつ動くか／売上構成が変わると損益分岐点も変わる | ip-finance-depth-1〜3 |
| 本文9ページ | ip-rights#depth-rights | 仕組み、外観、名前、説明文を別々に見る／社内で買ったソフトを取引先に使わせられるか | ip-rights-depth-1〜3 |
| 本文10〜12ページ | ip-law-ethics#depth-law-ethics | 人の属性、アクセス権限、情報の利用目的を順に確認する／成果の要求と、労働者への作業指示を分ける | ip-law-ethics-depth-1〜3 |
| 本文13ページ | ip-standards#depth-standards | 共通規格があっても、互換性を確認する／規格の策定と、適合性を評価する活動を区別する | ip-standards-depth-1〜3 |
| 本文14〜15ページ | ip-strategy#depth-strategy | 外部の変化を、自社の能力と組み合わせて読む／成長率とシェアの位置から、資金の使い方を考える／目標と中間指標を、一つの因果の流れで設計する | ip-strategy-depth-1〜3 |
| 本文14〜16ページ | ip-marketing#depth-marketing | 商品を買う人の条件が変わると、最適な施策も変わる／購入回数の多さだけで顧客の次の行動を決めない | ip-marketing-depth-1〜3 |
| 本文17〜19ページ | ip-tech-business#depth-tech-business | 技術の成熟と、利用者に届ける仕組みを同じ計画に載せる／自社で開発する範囲と、外部と協力する範囲を決める | ip-tech-business-depth-1〜3 |
| 本文19〜21ページ | ip-engineering-iot#depth-engineering-iot | 設計、製造、検査で扱う情報を見分ける／IoTの通信が止まっても安全を保つ | ip-engineering-iot-depth-1〜3 |
| 本文20ページ | ip-ecommerce#depth-ecommerce | 販売の場、支払の受付、商品の引渡しを分ける／便利な本人確認と、必要以上に集めない設計を両立する | ip-ecommerce-depth-1〜3 |
| 本文22〜24ページ | ip-system-strategy#depth-system-strategy | 見えている症状から、変えるべき業務を探す／正本を決めてから、使いやすい接点を追加する | ip-system-strategy-depth-1〜3 |
| 本文25ページ | ip-procurement#depth-procurement | 現状メモを、測れる要求と制約に変える／初期費用が安い提案をそのまま採用しない | ip-procurement-depth-1〜3 |

## 確認の範囲

- 事例の企業・金額・工程は教材用の架空例。法務では適用要件の見分け方を扱い、個別事件や契約の法的評価は扱わない。
- 各追加節のSVGは自作。図の内容は本文でも説明。
- 一つの設問IDで複数の枝をまとめて網羅と判定していない。詳細な法律の個別適用、検定計算、長い複合資料など、対応表の指摘を完全に解消したとは扱わない。

## 詳細教材の追加後

- 公式番号1〜24それぞれの学習内容、節、設問ID、残る作業は [strategy-coverage.json](./strategy-coverage.json) を参照。公式資料の本文ページ番号を使用し、出題例すべての適用・独立評価を完了したとは扱わない。
- [調達の三資料ケース](../../src/content/lessons/ip-procurement.md) は現状調査、提案依頼、三つの見積り、試験記録から判断する。ip-procurement-depth-4 / 5 は新しい条件に応用。
- [業務分析](../../src/content/lessons/ip-analysis.md) に管理限界と目標の読み分け、分母が違う拠点の比較、少人数の無作為割当てによる検定の考え方を追加。ip-analysis-depth-4〜6 は検定の結果と、率・管理図の読解を評価。
- [法務](../../src/content/lessons/ip-law-ethics.md) に36協定、通信販売の返品特約、GDPRの地理的適用の例を追加。個別事案への助言や判例の網羅ではない。
- [産業財産権](https://www.jpo.go.jp/news/shinchaku/event/seminer/text/2025_nyumon.html)、[派遣・請負](https://www.mhlw.go.jp/bunya/koyou/gigi_outou01.html)、[36協定](https://www.check-roudou.mhlw.go.jp/saburoku/)、[通信販売](https://www.no-trouble.caa.go.jp/what/mailorder/)、[個人情報保護法のガイドライン](https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/)、[GDPRの資料](https://www.ppc.go.jp/enforcement/infoprovision/EU/)、[ベース・レジストリ](https://www.digital.go.jp/policies/base_registry)、[JIS](https://www.jisc.go.jp/jis-act/index.html) を参照。確認日2026-11-12。設問・事例は独自作成。
- 公式番号7の行政文書と廃棄の判断に2問、番号12のCRM・SFA・SCM・ERPの適用に2問を追加。制度の参照先として[国土交通省の情報公開制度](https://www.mlit.go.jp/appli/file000011.html)と[環境省の排出事業者責任](https://www.env.go.jp/recycle/waste/haisyutsu.html)を掲載。
