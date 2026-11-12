---
{
  'stableId': 'ip-sql-transactions',
  'qualification': 'it-passport',
  'title': 'SQLとトランザクション',
  'description': '検索・集計の基本を読む。同時更新と復旧の必要性を説明する。具体例と理解度チェックで学ぶITパスポートの無料レッスンです。',
  'order': 35,
  'minutes': 75,
  'sample': false,
  'updated': '2026-11-12',
  'unit': 21,
  'syllabus': [56, 57],
  'objectives': ['検索・集計の基本を読む', '同時更新と復旧の必要性を説明する'],
  'prerequisite': '直前の「データベースの設計と正規化」を学習済みだと進めやすくなります。各用語は本文でも説明します。',
  'keywords': ['トランザクション', 'COMMIT', 'ROLLBACK', 'デッドロック'],
  'glossary':
    [
      { 'term': 'トランザクション', 'definition': '一体として成功または取消し等を扱う一連の処理単位。' },
      { 'term': 'COMMIT', 'definition': 'トランザクションの更新結果を確定する操作。' },
      { 'term': 'ROLLBACK', 'definition': 'トランザクションの更新を取り消す操作。' },
      { 'term': 'デッドロック', 'definition': '複数の処理が互いの資源の解放を待ち、進まなくなる状態。' },
    ],
}
---

## 必要なデータを取り出す

SQLではSELECTで列、FROMで対象、WHEREで条件を指定します。ORDER BYは並べ替え、GROUP BYはグループ化、HAVINGはグループに対する条件に使います。COUNT、SUM、AVGなどで集計します。NULLは値がない・不明等を表し、通常の等号でなくIS NULLなどで判定します。選択は行を絞り、射影は列を選び、結合は表を関連付けます。

## 例：在庫数を合計する

商品表に区分と在庫数があれば、区分ごとにGROUP BYしSUMで集計できます。WHEREで在庫数が0より大きい行を先に選ぶことと、HAVINGで合計が一定以上の区分を選ぶことは対象が違います。JOINでは関連付ける条件を明示し、意図しない全組合せに注意します。INSERT、UPDATE、DELETEはデータの追加・変更・削除に使います。

## ひとまとまりの処理

トランザクションは一体として扱う処理単位です。原子性は全部成功か全部取り消しか、一貫性は整合した状態を保つこと、独立性は同時実行の影響を制御すること、永続性は確定した結果を保持することです。これらをACIDと呼びます。COMMITは確定、ROLLBACKは取消しに使います。

## 例：口座間の振替

A口座から1,000円を引き、B口座へ1,000円を加える途中で故障した場合、片方だけの更新を残さないようにします。同時更新にはロック等を使いますが、互いの資源を待つデッドロックが起こる場合があります。ログ、バックアップ、復旧の方式も重要です。可用性を高める複製と、誤更新からの復旧を混同しないようにします。

## まとめ

SQLの各句の対象と、更新を一体として扱う理由を説明できるようにします。

## 抽出、集計、更新の境界を追う

店舗Aの数量が2、5、店舗Bの数量が4の明細を考えます。WHEREで数量4以上の行を残すとAの5とBの4です。GROUP BYで店舗別にまとめ、SUMで合計を取るとAが5、Bが4になります。先に元の全行を店舗ごとに足すとAは7になるので、どの段階の条件かを見ます。集約した結果に掛ける条件はHAVINGで表せます。

商品表に商品XとY、販売表にXの記録だけがあるとします。内部結合では対応するXだけが出ます。商品表からの左外部結合ならYも残り、販売側はNULLになります。NULLは0と同じ値ではありません。集計で数えたいのが結果の行数か、販売番号がある行数かで、数える列が変わります。

在庫の移動で倉庫Aを減らしてからBを増やす途中に障害が起きると、片方だけ変われば総量がずれます。両更新を一つのトランザクションとし、成功時にコミット、失敗時にロールバックします。他の処理との見え方や、確定後に結果が残ることも別の性質として考えます。

<details><summary>倉庫Aを減らした時点で確定してよい？</summary><p>移動全体が一つの処理なら、AとBの変更を両方成功させてから確定します。</p></details>

## 行の絞込みとグループの絞込みを区別する

売上表にA店120円、A店80円、B店90円、B店20円の4行があり、50円以上の取引だけを対象に店別の合計が100円以上の店を求めます。行を先に絞るとA店120、80、B店90が残ります。店別合計はA店200、B店90。合計100円以上に絞るとA店だけです。20円を残したまま集計すると、B店が110円となり誤って結果に含まれます。

```sql
SELECT shop, SUM(amount) AS total
FROM sales
WHERE amount >= 50
GROUP BY shop
HAVING SUM(amount) >= 100;
```

<figure><svg viewBox="0 0 360 220" width="360" height="220" style="max-width:100%;height:auto" role="img" aria-label="WHERE：金額50円以上の行だけ、GROUP BY：店ごとに分ける、SUM：Aは200円、Bは90円、HAVING：100円以上のAだけ残す"><g fill="currentColor" font-size="14" text-anchor="middle"><rect x="35" y="8" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="28">WHERE：金額50円以上の行だけ</text><rect x="35" y="60" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="80">GROUP BY：店ごとに分ける</text><rect x="35" y="112" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="132">SUM：Aは200円、Bは90円</text><rect x="35" y="164" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="184">HAVING：100円以上のAだけ残す</text></g><g fill="none" stroke="currentColor" stroke-width="2"><path d="M180 41v14m-4-4 4 4 4-4"/><path d="M180 93v14m-4-4 4 4 4-4"/><path d="M180 145v14m-4-4 4 4 4-4"/></g></svg><figcaption>条件の対象が元の行か、集計後のグループかを確認します。</figcaption></figure>

## 一緒に終えるべき処理をひとまとまりにする

残り1席の予約で、空席を1減らしたのに予約者情報の書込みが失敗したとします。そのまま確定すると、誰にも割り当てていないのに満席になります。空席の変更と予約情報の登録を同じトランザクションにし、両方成功したときだけコミットします。途中で失敗すればロールバックします。

同時に2人が残り1席を読み取る場面では、両者がそれぞれ「まだ空きがある」と判断することがあります。トランザクションを開始するだけで、すべての同時処理の競合が解決するとは限りません。更新が競合したときの処理や、データベース側の制約・排他を設計します。バックアップは障害後に復旧するための手段で、実行中の競合を止める機能とは別です。

<span id="textbook-sql-transactions"></span>

## 行、グループ、取引のどれを処理しているかを見る

店舗の売上から、返品を除いた売上合計が多い店舗を抽出します。同じシステムでは在庫を減らして申込みを登録します。前者は集計の順序、後者は変更をまとめる範囲に注意します。

<figure><svg viewBox="0 0 340 228" width="340" height="228" style="max-width:100%;height:auto" role="img" aria-label="結合、対応する行を組み合わせる。WHERE、個々の行を先に絞る。GROUP BY、同じ店舗をまとめる。HAVING、合計などで組を絞る"><rect x="4" y="4" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="29" fill="currentColor" font-size="14">結合</text><text x="126" y="29" fill="currentColor" font-size="14">対応する行を組み合わせる</text><path d="M170 46v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="58" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="83" fill="currentColor" font-size="14">WHERE</text><text x="126" y="83" fill="currentColor" font-size="14">個々の行を先に絞る</text><path d="M170 100v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="112" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="137" fill="currentColor" font-size="14">GROUP BY</text><text x="126" y="137" fill="currentColor" font-size="14">同じ店舗をまとめる</text><path d="M170 154v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="166" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="191" fill="currentColor" font-size="14">HAVING</text><text x="126" y="191" fill="currentColor" font-size="14">合計などで組を絞る</text></svg><figcaption>集計前の行条件と、集計後のグループ条件を別に考えます。</figcaption></figure>

<span id="sql-transactions-textbook-skill-1"></span>

### 絞る対象を一段ずつ確かめる

A店に100、200、返品の−70、B店に150と50があるとします。返品の行を `WHERE` に相当する条件で除くと、A店の合計は300、B店は200です。「合計250以上」は各取引を選ぶ条件ではなく、店舗ごとの合計に対する条件なので `HAVING` に相当します。先に取引額250以上で行を絞ると、A店の取引も消えてしまいます。表示順は `ORDER BY` で決め、抽出する条件とは区別します。

<span id="sql-transactions-textbook-skill-2"></span>

### 件数を求めるときに欠けた値を確認する

一つの表に金額100、NULL、0の3行があります。NULLは値が未入力・不明などの状態であり、0という値とは別です。行数を数える `COUNT(*)` は3、値がある金額を数える `COUNT(金額)` は2です。金額平均でNULLを含めない場合、100と0の平均は50。NULLを勝手に0へ変えると集計の意味が変わります。

<span id="sql-transactions-textbook-skill-3"></span>

### 変更をひとまとまりとして扱う

申込を登録し、その人数分の残席を減らすとします。登録した後に残席更新が失敗した場合、登録だけ確定すると申込数と残席が合わなくなります。二つを一つのトランザクションに含め、両方成功したらコミット、途中で失敗したらロールバックします。ACIDでは、このような全体を一つに扱う性質が原子性、他の処理から途中状態を見せない考え方が独立性です。制約を守ることが一貫性、確定後の結果が障害でも保たれることが耐久性です。

<span id="sql-transactions-textbook-skill-4"></span>

### 同時実行時に一件ずつの正しさを考える

残席1を二人が同時に読んでからそれぞれ確定すると、両方が申込済みになるおそれがあります。在庫を確認した処理と減らす処理を適切な条件や排他制御と一体にし、片方だけが確定できるようにします。処理が互いに相手のロック解除を待つとデッドロックとなります。DBMSの検知や再試行手順、データの整合が保たれることを確認します。

<details><summary>練習問題の解き方を確かめる</summary>

**練習**　Aに130と返品−20、Bに90と80があります。返品を除き、店ごとの合計150以上を表示する場合、結果を求めてください。

返品の行を除いてAは130、Bは170です。150は店ごとの合計への条件なのでBだけを残します。

</details>

**復習の目安**　絞る段階を分けて結果を予測し、競合や部分失敗が起きても正しい更新条件を説明できます。

<span id="textbook-sql-join-case"></span>

### 集計結果を、小さな表から手で再現する

工房の出荷データから、「東店の完了済み伝票の合計が600円以上か」を確かめます。店舗表にある ID、伝票表にある店舗ID、状態、金額を使います。必要な列だけを出す操作が射影、条件に合う行だけを残す操作が選択です。今回は伝票の店舗IDで店舗表と結合して店名を得ます。

| 伝票 | 店舗ID | 状態 | 金額 |
| --- | --- | --- | ---: |
| 01 | E | 完了 | 350 |
| 02 | E | 取消 | 180 |
| 03 | E | 完了 | 290 |
| 04 | W | 完了 | 610 |

店舗表で E は東、W は西です。東の完了伝票だけを先に残すと、01と03の2件です。店ごとの集計は次の形になります。

```sql
SELECT s.shop_id, s.name, SUM(o.amount) AS total
FROM shop AS s
JOIN orders AS o ON s.shop_id = o.shop_id
WHERE o.status = '完了' AND s.shop_id = 'E'
GROUP BY s.shop_id, s.name
HAVING SUM(o.amount) >= 600;
```

結果は東店、640円です。取消を先に除かずに合計すると820円になります。条件の適用順を確かめるには、各段階に残る行を小さな表に書き出します。

集計と違って更新では確定済みかどうかも大切です。例えば伝票01を取消にした時点で在庫を戻し、伝票と在庫の両方を確定します。途中停止なら変更前に戻し、両方が確定した後の障害なら更新記録などを用いて確定した結果を再現します。バックアップには取得時点の状態しかないので、それ以降の確定分も必要な運用では記録の保存と復元手順を組み合わせます。

<details><summary>別条件で練習する</summary>

**課題**　東店で、完了伝票が240円と330円、取消伝票が700円でした。同じ集計の結果はどうなりますか。

**解答**　取消を除いて570円となり、600円以上という条件を満たしません。東店の結果行は出ません。

</details>
