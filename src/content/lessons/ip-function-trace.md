---
{
  "stableId": "ip-function-trace",
  "qualification": "it-passport",
  "title": "擬似言語の関数を読む：引数・戻り値と処理の追い方",
  "description": "ITパスポートの擬似言語で、引数を渡すところから戻り値を次の計算に使うところまでを学びます。境界値や異なる呼出しを表に分けて追う解説と演習です。",
  "order": 29,
  "unit": 14,
  "minutes": 70,
  "sample": false,
  "syllabus": [
    37
  ],
  "scopeLabel": "現行シラバス Ver.6.5：37 アルゴリズムとプログラミング",
  "updated": "2026-11-16",
  "objectives": [
    "関数の定義と呼出しを見分け、渡す値と戻る値を対応させる",
    "分岐、境界値、呼出しごとの変数を表に記録して、複数の戻り値から最終結果を求める",
    "returnで終わる処理と表示を区別し、戻り値の誤りを見つけるための入力を選ぶ"
  ],
  "prerequisite": "上から実行する順次、条件による分岐、変数への代入を学んでから進みます。これらの書き方は、前の「データ構造とアルゴリズム」で確認できます。",
  "keywords": [
    "ITパスポート 擬似言語",
    "引数 戻り値 違い",
    "関数 呼出し トレース",
    "return",
    "ローカル変数",
    "境界値"
  ],
  "glossary": [
    {
      "term": "関数の定義",
      "definition": "関数の名前、受け取る値、実行する処理などを記述すること。定義した処理は呼び出されたときに実行される。"
    },
    {
      "term": "関数の呼出し",
      "definition": "関数の名前を指定し、必要な値を渡して、その関数の処理を実行すること。"
    },
    {
      "term": "引数",
      "definition": "関数に渡す値。呼出し側にある実際の値と、定義側で受け取る変数を区別して追う。"
    },
    {
      "term": "戻り値",
      "definition": "関数から呼出し元に返る値。呼出しを式の一部として書いたときは、そこで値として使える。"
    },
    {
      "term": "ローカル変数",
      "definition": "処理の決められた範囲だけで使う変数。この章では関数内で宣言し、一回の呼出しの中だけで使う変数を指す。"
    },
    {
      "term": "境界値",
      "definition": "条件が切り替わる境目にある値。直前、境目、直後を比べると、不等号の取り違えを見つけやすい。"
    }
  ],
  "inlineGlossary": [
    {
      "id": "function-definition",
      "term": "関数の定義"
    },
    {
      "id": "function-call",
      "term": "関数の呼出し"
    },
    {
      "id": "argument",
      "term": "引数"
    },
    {
      "id": "return-value",
      "term": "戻り値"
    },
    {
      "id": "local-variable",
      "term": "ローカル変数"
    },
    {
      "id": "boundary-value",
      "term": "境界値"
    }
  ]
}
---

関数は、一つのまとまりにした処理に名前を付け、別の場所から使えるようにしたものです。送料を求める処理を関数にすると、注文ごとに荷物の重さを渡し、同じ規則で計算した金額を受け取れます。関数を読むときは、渡した値を定義に当てはめ、その回の結果を呼出し元の式に戻して考えます。

前の章で扱った[順次・分岐・反復](../ip-algorithms/)は、関数の中でも同じように働きます。この章で追うのは、関数の前後を含む値の動きです。関数を二度使う式でも、呼出しごとに表の行を分ければ、どの値がどこへ返ったかを確かめられます。

<span id="objective-1"></span>

## 関数の定義に書かれた処理を、呼び出したときに実行する

処理の名前、受け取る項目、行う操作を書いたものが<a class="lesson-term" data-lesson-term href="#lesson-term-function-definition">関数の定義</a>です。名前と実際に渡す値を書いて処理を使うことを、<a class="lesson-term" data-lesson-term href="#lesson-term-function-call">関数の呼出し</a>と呼びます。呼出しがなければ、その関数の本体は実行されません。例えば、点検料の規則を定義しただけの段階では、どの注文についても料金はまだ計算されていません。

関数へ渡す値を<a class="lesson-term" data-lesson-term href="#lesson-term-argument">引数</a>といいます。関数の定義側には、その値を受け取る変数を用意します。呼出し側が「実際の値」を渡し、定義側の変数がそれを預かる関係です。複数の値を位置で渡す書き方では、第1引数を第1の変数、第2引数を第2の変数に対応させます。この章では整数や論理値を値として渡す例を扱います。

受付一覧に一行を追記するなど、結果を式に返さず一連の操作を実行するまとまりは、手続として書かれることがあります。定義や問題文を読み、その呼出しの先で操作を行うのか、値が返って呼出し元の式が続くのかを確かめます。

関数を終える際に呼出し元へ渡す値が<a class="lesson-term" data-lesson-term href="#lesson-term-return-value">戻り値</a>です。擬似言語の `return 式` では、式を計算してその値を返し、今回の関数の実行を終えます。呼出しを右辺に書いた場合、呼出しの位置に戻り値を置くと、その後の計算を続けられます。以下の記述は練習用です。試験では、問題文と冊子末尾に示された記述形式に従います。

<figure id="ip-function-call-flow">
<figcaption id="ip-function-call-flow-caption">一回の呼出しで値を渡し、元の式へ戻す流れ</figcaption>
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-function-call-flow-caption">
<table>
<thead><tr><th scope="col">順序</th><th scope="col">読む場所</th><th scope="col">何が起きるか</th></tr></thead>
<tbody>
<tr><th scope="row">1</th><td>呼出し元の「合計 ← 追加料(3) ＋ 100」</td><td>追加料へ整数3を渡す。合計の計算は戻り値が返るまで待つ。</td></tr>
<tr><th scope="row">2</th><td>定義側の「追加料(件数)」</td><td>受け取る変数「件数」に3が入り、定義された手順を実行する。</td></tr>
<tr><th scope="row">3</th><td>関数内の「return 件数 × 80」</td><td>3×80の結果240を返して、この呼出しを終える。</td></tr>
<tr><th scope="row">4</th><td>呼出し元の式の続き</td><td>呼出しの位置に240が入り、240＋100＝340を「合計」に入れる。</td></tr>
</tbody>
</table>
</div>
</figure>

<span id="worked-1"></span>

### 例題1　引数の並びと呼出し元の式を照合する

`値(個数, 単価)` は「個数×単価」を戻り値とする関数です。呼出しが `値(3, 170)` なら、個数に3、単価に170を当てはめます。戻り値は510円です。式 `値(3, 170) ＋ 50` の値を問われた場合は、その戻り値に50円を加えた560円を答えます。問題文が「戻り値」と「式全体」のどちらを尋ねているかで、必要な計算が一段変わります。

掛け算だけの例では二つの引数を逆にしても答えは同じです。引数の順序が結果に影響する例として、`残数(在庫, 払出数)` が「在庫−払出数」を返す場合を考えます。`残数(11, 4)` なら7ですが、`残数(4, 11)` では式の値が−7になります。数量が負になるときの追加処理はこの定義にないため、勝手に0へ置き換えません。

<span id="objective-2"></span>

## 呼出しごとに変数を記録してから、戻り値を合算する

関数の中だけで使うように宣言した変数を、この章では<a class="lesson-term" data-lesson-term href="#lesson-term-local-variable">ローカル変数</a>と呼びます。点検料を計算する際に一時的に使う「料金」は、各呼出しで作業用に用意します。二回目の処理は、二回目の引数と定義に沿って計算します。同じ名前の変数を使っていても、前の呼出しで求めた金額がそのまま入っていると考える必要はありません。

次の点検料では、0台のときは0円を返します。1〜2台の基本料金は150円で、2台を超えた台数には1台当たり80円を加えます。再点検なら、最後に料金から40円を引きます。台数は0以上の整数とし、再点検には「真」か「偽」を渡します。先頭の「○整数型」は、ここから点検料の関数を定義し、整数を返すことを示します。括弧の中では、何をどの順番で受け取るかを指定しています。論理型は真か偽を受け取る型で、ifは条件が真のときだけ対応するendifまでの処理を実行します。

~~~text
○整数型: 点検料(整数型: 台数, 論理型: 再点検)
  整数型: 料金
  if (台数 = 0)
    return 0
  endif
  料金 ← 150
  if (台数 > 2)
    料金 ← 料金 + (台数 - 2) × 80
  endif
  if (再点検)
    料金 ← 料金 - 40
  endif
  return 料金
~~~

<span id="worked-2"></span>

### 例題2　2台の新規点検と4台の再点検を合算する

呼出し元の `点検料(2, 偽) ＋ 点検料(4, 真)` を求めます。まず、台数が2のときは条件 `台数 > 2` が偽なので、超過分は0円です。再点検も偽のため150円を返します。続いて4台を渡すと、超過分は2台で160円、再点検の値引きは40円です。二回目の戻り値は150＋160−40＝270円。呼出し元で150と270を足すと420円になります。

<figure id="ip-function-pricing-trace">
<figcaption id="ip-function-pricing-trace-caption">条件の判定と「料金」の変化を、関数を使った回ごとに記録する</figcaption>
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-function-pricing-trace-caption">
<table>
<thead><tr><th scope="col">呼出し</th><th scope="col">初期の料金</th><th scope="col">超過を加えた後</th><th scope="col">再点検を反映した後</th><th scope="col">戻り値</th></tr></thead>
<tbody>
<tr><th scope="row">点検料(2, 偽)</th><td>150</td><td>2は2を超えない。150。</td><td>偽。150。</td><td>150円</td></tr>
<tr><th scope="row">点検料(4, 真)</th><td>150</td><td>150＋2×80＝310。</td><td>真。310−40＝270。</td><td>270円</td></tr>
<tr><th scope="row">点検料(0, 真)</th><td colspan="3">最初の return が働く。基本料金の設定や値引きは実行しない。</td><td>0円</td></tr>
</tbody>
</table>
</div>
</figure>

料金を増やすとき、80円を掛けるのは点検した台数全体ではなく、2台を超えた分です。例えば4台で320円を加えた場合は、基本料金に含まれる最初の2台にも80円ずつを重ねて払う計算になります。境目の2台と、その一つ先の3台で差が80円になることを確かめると、加算の範囲を検算できます。

<span id="objective-3"></span>

## 戻る値と、画面に表示する値は別の場所で決まる

関数の中に「表示」という操作が書かれている場合、そこを実行すると画面などに文字や数値が出ます。その値を呼出し元の式で使えるかどうかは、`return` に指定された値によって決まります。この章の擬似言語における「表示」は、画面へ出力する操作の名前です。式の中で関数を使うときには、画面に現れた順序と戻り値が渡る順序を分けて記録します。

<span id="worked-3"></span>

### 例題3　関数の中からもう一つの関数を使う

次のプログラムは、展示用パネルの面積を求めてから、1平方センチメートル当たり3円の材料費を計算します。説明のため、面積を求める途中で縦の長さを表示し、最後に呼出し元で材料費を表示します。

~~~text
○整数型: 面積(整数型: 縦, 整数型: 横)
  表示(縦)
  return 縦 × 横

○整数型: 材料費(整数型: 縦, 整数型: 横)
  整数型: 平方センチ
  平方センチ ← 面積(縦, 横)
  return 平方センチ × 3

合計 ← 材料費(4, 7) + 20
表示(合計)
~~~

呼出し元はまず材料費を求めます。材料費の中では面積の結果を待つので、`面積(4, 7)` に進みます。ここで表示されるのは縦の長さ4です。面積が返すのは28で、材料費の変数「平方センチ」に入るのも28です。材料費からは28×3＝84円が戻ります。呼出し元で20円を足すと104円。表示の並びは「4、104」、最後に求めた合計は104円となります。

<figure id="ip-function-nested-trace">
<figcaption id="ip-function-nested-trace-caption">関数の中で別の関数を呼んだ場合は、直前の呼出し元に戻る</figcaption>
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-function-nested-trace-caption">
<table>
<thead><tr><th scope="col">実行中の場所</th><th scope="col">結果を待っている場所</th><th scope="col">その場所の出力、代入、戻り値</th></tr></thead>
<tbody>
<tr><th scope="row">面積(4, 7)</th><td>材料費の「平方センチ ← 面積(縦, 横)」</td><td>4を表示。28を材料費へ返す。</td></tr>
<tr><th scope="row">材料費(4, 7)に戻る</th><td>呼出し元の「合計 ← 材料費(4, 7) ＋ 20」</td><td>平方センチに28を代入。84を呼出し元へ返す。</td></tr>
<tr><th scope="row">呼出し元に戻る</th><td>この例で待っている処理はない</td><td>合計に104を代入。104を表示。</td></tr>
</tbody>
</table>
</div>
</figure>

### 条件が切り替わる値で、正しい行を通るか確かめる

条件の判断が切り替わる境目が<a class="lesson-term" data-lesson-term href="#lesson-term-boundary-value">境界値</a>です。先ほどの基本料金は2台までです。台数が0なら0円を返すので、関数の先頭から料金の設定まで進みません。台数が2なら超過料金なし、3なら1台分を加えます。改修前と改修後を比較するなら、台数0、1、2、3を使うと、0台の特別処理や超過料金の条件が変わっていないか確認できます。

不等号だけが変わっても、最終結果が変わらない場合があります。この点検料で `> 2` を `≥ 2` と書き換えても、2台の加算は `(2 − 2) × 80` なので料金は変わりません。一方、条件を `> 3` にすると、3台の超過1台分が加算から漏れます。「通った行」と「戻り値」のどちらが条件として問われているかを見て、確認する記録を選びます。

<section class="guided-lesson" id="guided-ip-function-trace" aria-labelledby="ip-function-guided-title">
<h3 id="ip-function-guided-title">途中で確認　二つの関数から返った値を足す</h3>
<p id="ip-function-guided-prompt">上の点検料で、新規3台と再点検1台の合計はいくらですか。円を付けず数字だけ入力してください。</p>
<form data-guided-practice data-expected="340" data-guided-hint="新規3台の料金と、再点検1台の料金を別々に計算してから足します。" aria-labelledby="ip-function-guided-title" aria-describedby="ip-function-guided-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>合計の金額を入力する</legend>
<label for="ip-function-guided-answer">二件分の合計（円）</label>
<input id="ip-function-guided-answer" name="answer" class="guided-number" type="text" inputmode="numeric" enterkeyhint="done" maxlength="18" autocomplete="off">
<div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details><summary>途中の式と答えを読む</summary>
<p data-guided-solution>新規3台は150＋(3−2)×80＝230円。再点検1台は基本料金150円から40円を引き、110円です。230＋110＝340円。二回目の「料金」は最初から150円で計算します。</p>
</details>
</section>

<span id="ip-function-trace-independent"></span>

### 自力で確認　途中の表示と戻り値を二回分記録する

配送所の `梱包(箱数, 急ぎ)` は、箱数が0なら直ちに0を返します。1箱以上なら、箱数を画面に表示してから、戻り値を「箱数×90＋急ぎ料」とします。急ぎ料は「真」で70円、「偽」で0円です。`結果 ← 梱包(2, 真) ＋ 梱包(0, 真)` を実行した後、`表示(結果)` を実行します。表示される順序と結果を別々に書き、箱数0の呼出しで急ぎ料が発生するか確かめてください。

<details><summary>呼出しごとの記録と解答を読む</summary>
<p>一回目は画面に2を出し、2×90＋70＝250を返します。二回目は0を返す行で終了するため、表示も急ぎ料の加算も行いません。呼出し元で「結果」に250＋0＝250を入れ、最後に250を表示します。画面に出るのは「2、250」の順です。二回目に70を足した場合は、returnに達した後も処理を続けてしまっています。</p>
</details>

理解度チェックでは、ここで扱った料金表とは異なる関数を使います。まず呼出しの引数に下線を引き、各呼出しで返る値を書き出してから、呼出し元の計算に戻ってください。次の[プログラム言語・Webとデータ表現](../ip-languages/)では、手順とデータを記述する言語の役割を学びます。

## 出典

- [IPA「ITパスポート試験」シラバス Ver.6.5](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf)（37 アルゴリズムとプログラミング、38ページ）
- [IPA 令和7年度 ITパスポート試験の公開問題](https://www3.jitec.ipa.go.jp/JitesCbt/html/openinfo/pdf/questions/2025r07_ip_qs.pdf)（問99と巻末の擬似言語の記述形式を参照。例題・練習問題は独自作成）
