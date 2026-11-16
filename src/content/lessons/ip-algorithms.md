---
{
  'stableId': 'ip-algorithms',
  'qualification': 'it-passport',
  'title': 'データ構造とアルゴリズム',
  'description': '順次・分岐・反復を追跡する。探索とデータ構造を使い分ける。具体例と理解度チェックで学ぶITパスポートの無料レッスンです。',
  'order': 24,
  'minutes': 70,
  'sample': false,
  'updated': '2026-11-16',
  'unit': 14,
  'syllabus': [36, 37],
  'objectives': ['順次・分岐・反復を追跡する', '探索とデータ構造を使い分ける'],
  'prerequisite': '直前の「情報理論・AIと生成AIの活用」を学習済みだと進めやすくなります。各用語は本文でも説明します。',
  'keywords': ['スタック', 'キュー', '二分探索', 'トレース'],
  'glossary':
    [
      { 'term': 'スタック', 'definition': '最後に入れた要素から取り出す後入れ先出しのデータ構造。' },
      { 'term': 'キュー', 'definition': '最初に入れた要素から取り出す先入れ先出しのデータ構造。' },
      { 'term': '二分探索', 'definition': '整列済みの探索範囲を半分ずつ絞って目的の値を探す方法。' },
      { 'term': 'トレース', 'definition': '処理の各段階で変数や状態の変化を追って動作を確かめること。' },
    ],
  "inlineGlossary": [
    {"id": "stack", "term": "スタック"},
    {"id": "queue", "term": "キュー"},
    {"id": "binary-search", "term": "二分探索"},
    {"id": "trace", "term": "トレース"},
    {"id": "index-position", "term": "添字", "definition": "配列のどの位置の要素を使うか示す番号です。最初の要素が0番か1番かは、問題の指定を確認します。"},
    {"id": "assignment", "term": "代入", "definition": "変数などに値を入れる操作です。右辺で求めた値を左辺に入れ、次の処理からその値を使います。"}
  ],
}
---

## 処理を手順にする

アルゴリズムは問題を解くための手順です。順次は上から順に実行、分岐は条件に応じた選択、反復は条件を満たす間などの繰返しです。フローチャートや擬似言語で表し、変数の値を追跡する<a class="lesson-term" data-lesson-term href="#lesson-term-trace">トレース</a>で動作を確認します。<a class="lesson-term" data-lesson-term href="#lesson-term-assignment">代入</a>は値の更新で、数学の等式とは役割が違います。

## 例：合計を求める

合計sを0とし、配列[3,1,4]の要素を順に加えると、sは0→3→4→8と変わります。繰返し開始前の初期値を忘れると正しい結果になりません。<a class="lesson-term" data-lesson-term href="#lesson-term-index-position">添字</a>が0始まりか1始まりか、範囲の終端を含むか、空の配列をどう扱うかも確認します。

## データの持ち方

配列は添字で要素へアクセスします。リストは要素間のつながりで表す構造の一つです。<a class="lesson-term" data-lesson-term href="#lesson-term-stack">スタック</a>は後入れ先出し（LIFO）、<a class="lesson-term" data-lesson-term href="#lesson-term-queue">キュー</a>は先入れ先出し（FIFO）です。木は階層、グラフは一般的な接続関係を表します。どの操作を速くしたいかで適切な構造が変わります。

## 探索と整列

線形探索は順に調べます。<a class="lesson-term" data-lesson-term href="#lesson-term-binary-search">二分探索</a>は整列済みの範囲を半分ずつ絞ります。未整列の列へそのまま使えません。整列には交換、選択、挿入などの考え方があります。計算量はデータ量に対して処理量がどう増えるかを表し、装置が速いかという話とは分けて考えます。探索の正しさだけでなく、見つからない場合も確認します。

## まとめ

初期値、条件、更新、終了を一つずつ追います。コードを書く前に、具体的な小さな入力で手順を確かめましょう。

## 途中の状態を書いて処理を追う

配列[6,3,8,5]を順に調べ、値が偶数のときだけ合計に加える処理を考えます。合計を0で始め、6を読んで6、3では変わらず6、8を読んで14、5では14です。添字は位置、要素は値なので、条件「偶数の値」を添字に適用しないようにします。ループの最後まで答えを確定しません。

検索では、順不同でも線形探索は使えます。二分探索は整列済みであることを使い、中央と比較して片側を捨てます。区間を縮めるとき中央を再び含め続けると、残り一要素で止まらないことがあるので境界を追います。検索対象がない場合も試し、空の範囲で終了する条件を確かめます。

スタックは後から入れたものを先に出す構造です。操作の取消では新しい操作から戻すのに向きます。キューは先に入れたものを先に出すので、受付順に処理する場面で使います。優先度による並べ替えがあれば、単純な先入先出とは別に考えます。

<details><summary>合計をループの内側で0に戻すと？</summary><p>毎回、前の要素までの結果が消えます。合計の初期化は繰返しの前に一度だけ行います。</p></details>

## 反復が終わったときの変数の意味を決める

売上のリストから10以上の値の合計を求めます。各回の前に「そこまでに読んだ対象の合計」を残しておくため、合計を0にするのは反復の前の1回だけです。値が10以上なら加え、対象外なら合計をそのまま次へ渡します。対象が1件もなければ合計は初期値の0です。「10以上」を「10より大きい」と取り違えたときの差は、10を入力に含めて確かめます。

<figure id="ip-algorithms-figure-1"><svg viewBox="0 0 360 272" width="360" height="272" style="max-width:100%;height:auto" role="img" aria-label="開始：合計0、値を順番に読む、8 は対象外 → 合計0、10 を加える → 合計10、15 を加える → 合計25、3 は対象外 → 合計25"><g fill="currentColor" font-size="14" text-anchor="middle"><rect x="35" y="8" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="28">開始：合計0、値を順番に読む</text><rect x="35" y="60" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="80">8 は対象外 → 合計0</text><rect x="35" y="112" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="132">10 を加える → 合計10</text><rect x="35" y="164" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="184">15 を加える → 合計25</text><rect x="35" y="216" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="236">3 は対象外 → 合計25</text></g><g fill="none" stroke="currentColor" stroke-width="2"><path d="M180 41v14m-4-4 4 4 4-4"/><path d="M180 93v14m-4-4 4 4 4-4"/><path d="M180 145v14m-4-4 4 4 4-4"/><path d="M180 197v14m-4-4 4 4 4-4"/></g></svg><figcaption>反復ごとの状態を追うと、初期化の位置と条件の境目を一緒に確かめられます。</figcaption></figure>

## データが整列しているときだけ探索範囲を半分にする

昇順の [3, 8, 12, 15, 21, 30, 40] から21を探します。中央15と比べると、15以前に21はないと判断できるので [21, 30, 40] に絞れます。次の中央は30なので左側の21を見つけます。整列していなければ、15より前に21がある可能性を捨てられません。1回だけ検索するなら線形探索も候補です。何度も同じデータを検索するなら、最初の整列にかける時間を含めて比べます。

空のキューへA、B、Cを順に入れ、2回取り出すとA、Bが出ます。窓口は先に来た客から処理したいので、このFIFOの規則が適しています。スタックならC、Bの順に出るLIFOです。操作の履歴を最後の操作から戻すときに使えます。

## 整列と併合を途中状態まで追う

[7, 3, 5, 2] を選択ソートで昇順に並べます。最小の2を探して先頭の7と交換し、[2, 3, 5, 7] になります。先頭を確定した後は残りの範囲から最小を探します。この例では1回で見た目は整っていますが、最初から並んでいるとは限らないので、次の範囲も規則どおり確認します。バブルソートで左から隣接要素を順に交換する場合は、7と3、7と5、7と2を交換して [3, 5, 2, 7] です。最初の1巡で確定するのは最大の7です。どの位置を一巡で確定させるかが手順の違いです。

昇順の [2, 8, 9] と [1, 4, 10] を併合します。両列の先頭のうち小さい値を取り出し、1、2、4、8、9の順で出します。片側が空になったら残る10を付けます。毎回2列全体から最小を探し直す必要がないのは、各列の先頭以降が昇順に並んでいるからです。クイックソートでは基準値を選んで小さい側・大きい側などに分割し、各範囲をさらに整列します。分割だけで各範囲の内部まで整列するわけではありません。

## 木にしたときの親子と番号の違いを読む

フォルダが「資料」の下に「会議」と「契約」、さらに「会議」の下に「議事録」を持つなら、木の根は資料、議事録の親は会議です。同じ段に並ぶ名前を探す場合と、あるフォルダの下をすべて探す場合とでは、たどる範囲が異なります。二分木は各節点が持てる子の数が最大2の木で、全節点に子が2個あることを要求しません。

<span id="textbook-algorithms"></span>

## 途中の状態を書いて、処理を最後まで追う

発送対象を抽出して優先順に並べる処理を考えます。配列や反復の問題では、最終結果を推測するより、どのデータがいつ読まれ、変数がいつ更新されたかを一行ずつ記録する方が確実です。

<figure id="ip-algorithms-figure-2"><svg viewBox="0 0 340 228" width="340" height="228" style="max-width:100%;height:auto" role="img" aria-label="初期化、番号の起点・初期値を読む。反復、読む値と条件を記録。更新、実行された代入だけ変更。終了、境界と返す値を再確認"><rect x="4" y="4" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="29" fill="currentColor" font-size="14">初期化</text><text x="126" y="29" fill="currentColor" font-size="14">番号の起点・初期値を読む</text><path d="M170 46v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="58" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="83" fill="currentColor" font-size="14">反復</text><text x="126" y="83" fill="currentColor" font-size="14">読む値と条件を記録</text><path d="M170 100v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="112" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="137" fill="currentColor" font-size="14">更新</text><text x="126" y="137" fill="currentColor" font-size="14">実行された代入だけ変更</text><path d="M170 154v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="166" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="191" fill="currentColor" font-size="14">終了</text><text x="126" y="191" fill="currentColor" font-size="14">境界と返す値を再確認</text></svg><figcaption>疑似言語の追跡では、条件が真の行と偽の行を分けて書きます。</figcaption></figure>

<span id="algorithms-textbook-skill-1"></span>

### 配列を走査し、途中の値が表す意味を言う

配列は要素を順に並べ、添字で取り出せます。添字を0から始めるか1から始めるかは設問で確認します。次の例は1から始まる配列 [6, 3, 9, 3] を読み、5以上の値だけを合計します。合計を0で始め、6で6、3では6のまま、9で15、最後の3でも15。カウントが別なら6で1、9で2になります。毎回「ここまで見たうち、条件に合うものの合計」と説明できれば、どこかで値を初期化し直した誤りにも気付けます。空の配列なら一度も加えず、結果は0です。

<span id="algorithms-textbook-skill-2"></span>

### 探索に使う順序を先に確認する

二分探索で [3, 6, 9, 12, 15, 18, 21] から15を探します。中央12より大きいので候補を右3個に絞ります。その中央18より小さいので左の15だけが残ります。値の並びが順不同なら「中央より小さい値は左側」と判断できません。また、重複する値があるときに最初の位置が必要なら、一つ一致したところで終了せず、左側にも候補があるか調べる必要があります。

<span id="algorithms-textbook-skill-3"></span>

### データの入出順と探索効率を分ける

順に到着した注文を公平に扱うなら、先に入れたものから取り出すキューを使います。直前の編集から順に取り消すなら、最後に入れた操作から取り出すスタックです。枝分かれするカテゴリは木として表せますが、一般の木の子に値の大小関係があるとは限りません。木の絵を見ただけで二分探索のように候補を捨てられるとは判断しません。

<span id="algorithms-textbook-skill-4"></span>

### 同じ値のときの規則まで追う

日付順の二つの注文一覧を一つにまとめます。一方が [2, 5, 9日]、他方が [3, 5, 6日] なら、両側の先頭だけを比較して小さい方を順に出せます。2、3の次は5日同士です。左を優先するなど同日の規則が必要なら、比較結果が等しい場合を処理に含めます。片方が空になったら、残った側をその順で出します。

<details><summary>練習問題の解き方を確かめる</summary>

**練習**　配列 [4, 1, 6, 1, 7] を先頭から読み、値が偶数なら合計に加え、奇数なら今の合計から1を引きます。最終値を求めてください。

0から順に4、3、9、8、7です。7は奇数なので、その値を引くのではなく「1を引く」という規則を使います。

</details>

<span id="ip-algorithms-branch-trace"></span>

## 反復の中で、最初に当てはまる分岐を追う

繰返し処理の中に選択処理がある場合は、先に「今回読む行」を固定し、その行で真になった最初の条件を探します。代入の矢印（←）は、右側をその時点の値で計算し、その結果を左側へ保存する指示です。たとえば優先合計が9のときに `優先合計 ← 優先合計 ＋ 4` が実行されると、以後の優先合計は13になります。ほかの変数は、代入が実行されるまで前の回の値を保ちます。

### 注文ごとの条件と、全体の集計を分けて書く

発送リストの明細を、取消、優先、通常、取扱いなしの順に分けます。数量は整数で、取消と急ぎは真偽値です。取消を先に調べ、取り消していない明細では「8個以上または急ぎ」を優先、「5個以上」を通常とします。優先と通常は数量の合計を別々に求め、取消は明細数を数えます。

```text
優先合計 ← 0
通常合計 ← 0
取消件数 ← 0
i ← 1
while（i ≦ 明細数）
  if（取消[i]）
    取消件数 ← 取消件数 ＋ 1
  elseif（数量[i] ≧ 8 or 急ぎ[i]）
    優先合計 ← 優先合計 ＋ 数量[i]
  elseif（数量[i] ≧ 5）
    通常合計 ← 通常合計 ＋ 数量[i]
  endif
  i ← i ＋ 1
endwhile
```

添字は1から始まり、明細数を5とします。表の右側の2列には、その行の処理を終えたときの値を書きます。取消件数が増えるのは4行目だけです。

<figure id="ip-algorithms-branch-trace" aria-labelledby="ip-algorithms-branch-trace-caption">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-algorithms-branch-trace-caption">
<table>
  <caption id="ip-algorithms-branch-trace-caption">注文を一行ずつ読んだ直後の累計</caption>
  <thead><tr><th scope="col">行</th><th scope="col">入力</th><th scope="col">実行した分岐</th><th scope="col">優先合計</th><th scope="col">通常合計</th></tr></thead>
  <tbody>
    <tr><th scope="row">1</th><td>6個</td><td>通常</td><td>0</td><td>6</td></tr>
    <tr><th scope="row">2</th><td>9個、急ぎ</td><td>優先</td><td>9</td><td>6</td></tr>
    <tr><th scope="row">3</th><td>4個、急ぎ</td><td>優先</td><td>13</td><td>6</td></tr>
    <tr><th scope="row">4</th><td>8個、取消</td><td>取消</td><td>13</td><td>6</td></tr>
    <tr><th scope="row">5</th><td>10個</td><td>優先</td><td>23</td><td>6</td></tr>
  </tbody>
</table>
</div>
</figure>

2行目の9個は「5個以上」にも当てはまりますが、先に優先へ入ったので通常合計は6のままです。4行目では、先に取消の処理が実行されて、その行の数量はどちらの合計にも入りません。5行目の末尾で `i` は6になり、次の判定 `6 ≦ 5` は偽なので処理を終えます。明細が0件なら最初の判定で終了し、三つの集計値はすべて0です。

### 条件だけを変えて、結果が変わる行を選ぶ

優先条件を `数量[i] ≧ 8 and 急ぎ[i]` にすると、数量と急ぎの両方を満たす2行目だけが優先です。3行目の急ぎ4個は通常条件にも届かず、5行目の10個は通常へ移ります。よって優先は9個、通常は6＋10＝16個、取消は1件です。条件を変えたときは前後で行の分類を比べると、表を最初から埋め直さずに差を確かめられます。

<section class="guided-lesson" id="guided-ip-algorithms-branch" aria-labelledby="guided-ip-algorithms-branch-title">
<h3 id="guided-ip-algorithms-branch-title">途中で確認　優先の条件を上から読む</h3>
<p id="guided-ip-algorithms-branch-prompt">元の <code>or</code> の条件を使い、5個、急ぎで取消した9個、7個、急ぎの4個をこの順に読みます。四つの明細の処理後、優先合計は何個ですか。</p>
<form data-guided-practice data-expected="4" data-guided-hint="9個の行では、急ぎかどうかを調べる前に取消条件に当てはまります。取り消していない行から優先の対象を探してください。" aria-labelledby="guided-ip-algorithms-branch-title" aria-describedby="guided-ip-algorithms-branch-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>練習の答え</legend>
<label for="guided-ip-algorithms-branch-input">答え（個）</label> <input id="guided-ip-algorithms-branch-input" name="answer" class="guided-number" type="text" inputmode="numeric" enterkeyhint="done" maxlength="18" autocomplete="off">
<div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details>
<summary>解答と考え方を読む</summary>
<p data-guided-solution>先に該当した分岐から順に、通常・取消・通常・優先です。優先は4個、通常は5＋7＝12個、取消は1件。取消の9個は二つの合計に入りません。</p>
</details>
</section>

### 間違った分岐の順序を、テストデータで見つける

同じ四つの明細に対し、担当者が「数量8個以上または急ぎ」を先頭へ移し、取消をその直後の `elseif` に書いたとします。正しい処理との差が表れるのはどの行で、優先合計はどのように変わりますか。

<details>
<summary>解答と考え方を読む</summary>
<p>2行目の9個に差が出ます。優先条件に先に当てはまるので、取消の条件を調べず9個を加えます。4行目の4個も従来どおり加わり、優先合計は4個から13個へ増えます。取消件数は1件から0件です。取消と優先の両方に当てはまるデータを入れると、別々の行で一条件ずつ調べるだけでは見つけられない誤りを拾えます。</p>
</details>

出典：[IPA「試験で使用する情報技術に関する用語・プログラム言語など」Ver.5.1 別紙1（ITパスポート試験用）](https://www.ipa.go.jp/shiken/syllabus/doe3um0000002djj-att/shiken_yougo_ver5_1.pdf#page=5)。条件と数値は教材用に作成しました。

**復習の目安**　添字、初期値、条件、代入を表に書き、順序が成立するときだけ探索範囲を絞れます。
