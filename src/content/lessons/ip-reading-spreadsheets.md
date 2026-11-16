---
{
  "stableId": "ip-reading-spreadsheets",
  "qualification": "it-passport",
  "title": "表計算の読解演習：数式を写して検算する",
  "description": "相対・絶対・複合参照の移動を図で追い、条件付き集計と売上の計算を検算します。",
  "unit": 17,
  "order": 30,
  "minutes": 50,
  "syllabus": [
    47
  ],
  "prerequisite": "「オフィスツールとOSS」のセル、数式、参照の基礎を先に学びます。",
  "keywords": [
    "表計算",
    "絶対参照",
    "複合参照",
    "条件付き集計",
    "検算"
  ],
  "objectives": [
    "数式を横・縦にコピーした結果を説明する",
    "条件付き集計の対象を読み、誤った参照を検算で見つける"
  ],
  "glossary": [],
  "sample": false,
  "updated": "2026-11-16"
}
---

## コピーで何が動くかを一つずつ考える

表計算の参照は列の文字と行の番号でできています。式を1列右へコピーすると、固定していない列は1列右へ動きます。2行下なら固定していない行が2行動きます。列と行を別々に考えると、片方だけ固定する複合参照でも混乱しません。

| 元の参照 | 列の扱い | 行の扱い | 1列右、2行下へコピー |
| --- | --- | --- | --- |
| B3 | 動く | 動く | C5 |
| $B3 | 固定 | 動く | $B5 |
| B$3 | 動く | 固定 | C$3 |
| $B$3 | 固定 | 固定 | $B$3 |

## 縦横に同じ式を配る

文具店では、行に商品、列に販売日の数量を置き、下の別表に売上を出します。B3は商品Aの単価120円、B4は商品Bの単価80円です。C3とD3は商品Aの月曜と火曜の数量4個と6個、C4とD4は商品Bの数量5個と3個です。

<figure id="ip-reading-spreadsheets-figure-1"><svg viewBox="0 0 345 174" width="345" height="174" role="img" aria-label="入力表のB列が単価、C列が月曜、D列が火曜。商品Aは120円、4個、6個。商品Bは80円、5個、3個。" style="max-width:100%;height:auto"><g fill="currentColor" font-size="14" text-anchor="middle"><text x="35" y="29">行</text><text x="105" y="29">B 単価</text><text x="190" y="29">C 月曜</text><text x="278" y="29">D 火曜</text><text x="35" y="73">3 A</text><text x="105" y="73">120</text><text x="190" y="73">4</text><text x="278" y="73">6</text><text x="35" y="117">4 B</text><text x="105" y="117">80</text><text x="190" y="117">5</text><text x="278" y="117">3</text><text x="174" y="158">単価は横へ動かさず、数量だけ販売日に合わせる</text></g><path d="M15 42h310M15 88h310M15 132h310M68 12v120m82-120v120m83-120v120" stroke="currentColor" opacity=".55" fill="none"/><rect x="70" y="44" width="78" height="86" rx="4" fill="currentColor" opacity=".1"/></svg><figcaption>売上を求めるとき、数量の列は販売日ごとに動き、単価のB列は同じ行にとどまります。</figcaption></figure>

C8に `=$B3*C3` と書きます。C8は120×4＝480円です。D8にコピーすると `=$B3*D3` で720円。C9では `=$B4*C4` で400円。D9では `=$B4*D4` で240円です。元の式のBの前だけを固定したのは、どの曜日も単価をB列から取得し、商品が変わったら単価の行も動かしたいからです。

誤って `=$B$3*C3` と書くと、月曜の商品Aは480円で正しいので間違いに気付きにくくなります。しかし商品Bの単価まで120円となり、C9は600円です。検算ではコピー元だけでなく、右端と下端の値を手で求めます。

## 条件の列と合計する列を見分ける

| 行 | A 商品 | B 状態 | C 金額（円） |
| ---: | --- | --- | ---: |
| 2 | ノート | 確定 | 480 |
| 3 | ペン | 取消 | 240 |
| 4 | ペン | 確定 | 400 |
| 5 | ノート | 確定 | 720 |

B列が「確定」の行だけ合計したい場合、条件は状態、合計は金額です。条件付き合計の引数を `SUMIF(判定範囲, 条件, 合計範囲)` とする表計算であれば、`SUMIF(B2:B5,"確定",C2:C5)` と書きます。結果は480＋400＋720＝1,600円です。単純合計は1,840円なので、差240円が取消額に一致することでも検算できます。

条件列を1行ずらすと、確定の印と金額が別の注文に対応します。実務でも試験でも、判定範囲の先頭行と合計範囲の先頭行を指で追い、同じ注文かを確かめます。確定「件数」を尋ねられた場合は3件です。金額を尋ねられたときと集計の目的が違います。

## 自分で確かめる

販売手数料をC1の率で一律に計算し、売上表の全セルへコピーします。C8からD9へコピーするとき、式 `=C8*$C$1` はどうなりますか。D9が240円で、手数料率が5％なら手数料も求めてください。

<details><summary>数式と検算を確認する</summary><p>コピーの移動は1列右、1行下です。C8は相対参照なのでD9になります。$C$1は列と行を固定しているのでそのままです。式は =D9*$C$1 です。手数料は240×0.05＝12円。率のセルに入っている値と、5という整数の違いも確認します。</p></details>

<span id="ip-reading-spreadsheets-logical-total"></span>

## 条件を一つずつ確かめてから、必要な行だけを合計する

表計算で「ある支店の確定分で、指定額以上」のように条件が重なる場合は、各行が集計に入る理由を見える形にできます。今回は、行ごとに条件を判定し、集計に入る金額だけをD列へ出します。条件に当てはまらない行は0円です。最後にD列を合計すると、対象行と総額の両方を見直せます。

<figure id="ip-spreadsheets-logical-input" aria-labelledby="ip-spreadsheets-logical-input-caption">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-spreadsheets-logical-input-caption">
<table>
  <caption id="ip-spreadsheets-logical-input-caption">注文表と、条件を満たす行の金額</caption>
  <thead><tr><th scope="col">行</th><th scope="col">A 支店</th><th scope="col">B 状態</th><th scope="col">C 金額（円）</th><th scope="col">D 集計額（円）</th></tr></thead>
  <tbody>
    <tr><th scope="row">2</th><td>北</td><td>確定</td><td>700</td><td>0</td></tr>
    <tr><th scope="row">3</th><td>北</td><td>確定</td><td>1,000</td><td>1,000</td></tr>
    <tr><th scope="row">4</th><td>南</td><td>確定</td><td>1,300</td><td>0</td></tr>
    <tr><th scope="row">5</th><td>北</td><td>取消</td><td>1,800</td><td>0</td></tr>
    <tr><th scope="row">6</th><td>南</td><td>確定</td><td>900</td><td>0</td></tr>
  </tbody>
</table>
</div>
</figure>

### 判定式を作り、どの行でも同じ基準を使う

F1に「北」、E2に1,000を入れ、「指定支店、確定、基準額以上」のすべてを満たす注文を集計します。以下ではIPAの表計算の記述に合わせ、文字列を一重引用符で囲み、関数名は `IF`、`論理積`、`合計` とします。問題に独自の機能や書式が定義されているときは、その説明を先に読みます。

```text
D2：=IF(論理積(A2=$F$1,B2='確定',C2>=$E$2),C2,0)
D7：=合計(D2:D6)
```

`論理積` は三つの判定がすべて真のときに真を返します。その結果を `IF` へ渡すと、真なら同じ行の金額、偽なら0がセルへ入ります。D2の式をD6までコピーすると、A2、B2、C2は現在の行へ移ります。支店名と基準額はどの行でも同じセルから読むので、`$F$1` と `$E$2` は固定します。

北かつ確定なのは2、3行目です。2行目は700円で基準未満。3行目の1,000円は「以上」に含まれるので、集計は1,000円です。4行目は金額を満たしても支店が違い、5行目は金額が大きくても取消です。式を検算するときは、合計の1,000円に加え、3行目だけが対象になっていることも確かめます。

### コピー先と、条件を変えた際の集計を予測する

たとえば基準の参照を `E2` と書いた場合、D3では判定が `C3>=E3` へ変わります。2行目で正解しても、3行目以降は同じ基準で判定できません。表示された集計額だけでは、参照先を取り違えた箇所が分かりづらいので、D3や末尾のD6にコピーされた式を開き、問題で指定された基準セルを読んでいるか確かめます。

同じ表でF1を「南」、E2を900へ変えると、4行目の1,300円と6行目の900円が集計され、合計は2,200円です。条件を「900円を超える」へ変えると6行目が外れ、1,300円になります。「以上」と「超える」の違いを検算するときは、基準と同じ金額の行から確かめると早く見つけられます。

<section class="guided-lesson" id="guided-ip-spreadsheets-logical" aria-labelledby="guided-ip-spreadsheets-logical-title">
<h3 id="guided-ip-spreadsheets-logical-title">途中で確認　条件の境目で集計がどう変わるか</h3>
<p id="guided-ip-spreadsheets-logical-prompt">上の注文表で支店は「北」のまま、最低金額を700円に変えます。確定で700円以上の注文を合計すると何円ですか。</p>
<form data-guided-practice data-expected="1700" data-guided-hint="700円の行は「以上」の境目に入ります。北支店でも取消の行は含めません。" aria-labelledby="guided-ip-spreadsheets-logical-title" aria-describedby="guided-ip-spreadsheets-logical-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>練習の答え</legend>
<label for="guided-ip-spreadsheets-logical-input">答え（円）</label> <input id="guided-ip-spreadsheets-logical-input" name="answer" class="guided-number" type="text" inputmode="numeric" enterkeyhint="done" maxlength="18" autocomplete="off">
<div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details>
<summary>解答と考え方を読む</summary>
<p data-guided-solution>北支店の確定分は2行目の700円と3行目の1,000円です。どちらも最低金額以上なので700＋1,000＝1,700円。5行目の1,800円は取消なので集計されません。</p>
</details>
</section>

### 別の表で、正しい合計と誤りの原因を求める

窓口の受付表に、4行目から順に「東、完了、300円」「西、完了、800円」「東、保留、900円」「東、完了、600円」の4件があります。東の完了分のうち300円以上だけが対象です。集計額の列を手計算して合計を確かめてください。さらに、式の金額条件を誤って「300円を超える」としたときに、どの行がいくら変わるかを説明してください。

<details>
<summary>解答と考え方を読む</summary>
<p>4〜7行目の集計額は300円、0円、0円、600円で、合計は900円です。西支店と保留は金額の判定を満たしても含めません。条件を「超える」に変えると4行目だけが300円から0円になり、合計は600円へ下がります。各行の差額300円と合計の差額300円を照合できます。</p>
</details>

出典：[IPA「試験で使用する情報技術に関する用語・プログラム言語など」Ver.5.1 別紙3（表計算）](https://www.ipa.go.jp/shiken/syllabus/doe3um0000002djj-att/shiken_yougo_ver5_1.pdf#page=8)。すべて教材用の架空データです。

## 解き直すときの確認

何を同じ場所から読み、何を行や列に合わせて動かすかを説明します。集計では、条件・対象行・答える単位を先に明確にしてから式を読みます。
