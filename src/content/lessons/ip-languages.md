---
{
  'stableId': 'ip-languages',
  'qualification': 'it-passport',
  'title': 'プログラム言語・Webとデータ表現',
  'description': '言語の役割を区別する。HTML・CSS・JSON等の用途を説明する。具体例と理解度チェックで学ぶITパスポートの無料レッスンです。',
  'order': 30,
  'minutes': 68,
  'sample': false,
  'updated': '2026-11-20',
  'unit': 14,
  'syllabus': [38, 39],
  'objectives': ['言語の役割を区別する', 'HTML・CSS・JSON等の用途を説明する'],
  'prerequisite': '直前の「データ構造とアルゴリズム」を学習済みだと進めやすくなります。各用語は本文でも説明します。',
  'keywords': ['コンパイル', 'カプセル化', 'HTML', 'JSON'],
  'glossary':
    [
      { 'term': 'コンパイル', 'definition': 'ソースコードを別の実行可能な形式等へ変換する処理。' },
      {
        'term': 'カプセル化',
        'definition': 'データと処理をまとめ内部の実装を隠し、定めた接点を通じて利用する設計。',
      },
      { 'term': 'HTML', 'definition': '見出しや段落などWeb文書の構造を表現するマークアップ言語。' },
      { 'term': 'JSON', 'definition': 'キーと値や配列などで構造化データを表す形式。' },
    ],
  "inlineGlossary": [
    {"id": "compilation", "term": "コンパイル"},
    {"id": "encapsulation", "term": "カプセル化"},
    {"id": "html", "term": "HTML"},
    {"id": "json", "term": "JSON"},
    {"id": "interpreter", "term": "インタプリタ", "definition": "プログラムを解釈しながら実行する仕組みです。実際の処理系は事前の変換や、実行途中のコンパイルを組み合わせることもあります。"},
    {"id": "instance", "term": "インスタンス", "definition": "クラスの定義をもとに作られた具体的なオブジェクトです。同じクラスから異なる値を持つものを作れます。"}
  ],
}
---

## プログラムの実行まで

人が処理の内容を書いた文書がソースコードです。CPUは、その文章をそのまま理解するのではなく、処理系が変換や解釈をした結果を実行します。ソースコードを別の実行可能な表現などへ変換する方法が<a class="lesson-term" data-lesson-term href="#lesson-term-compilation">コンパイル</a>、命令を解釈しながら実行する方式が<a class="lesson-term" data-lesson-term href="#lesson-term-interpreter">インタプリタ</a>です。実際の処理系では両方を組み合わせることもあります。

言語を選ぶときは、どこで実行するか、どのライブラリを使うかも調べます。ライブラリは、ほかの処理から利用できるように用意された機能の集まりです。変換の成功、実行環境、入力に対する正しい答えをそれぞれ確認します。

CPUが直接実行する命令の表現が機械語です。命令を人が読みやすい記号で表すものにはアセンブリ言語があり、用途の処理をより抽象的に書けるものが高水準言語です。PythonやJavaなどでも、実行に必要な処理系や環境を確認します。

## オブジェクト指向と再利用

オブジェクトはデータとそれに関する処理をまとめて扱う考え方です。クラスは共通の性質を定義し、<a class="lesson-term" data-lesson-term href="#lesson-term-instance">インスタンス</a>はその具体的な実体です。<a class="lesson-term" data-lesson-term href="#lesson-term-encapsulation">カプセル化</a>は内部の状態や実装を隠し、定めた接点を使う設計に役立ちます。継承は性質等の引継ぎ、多態性は同じ接点で異なる実装を扱う性質です。関数や部品を適切に分けると変更を局所化できます。

## Webで役割を分ける

| 形式・言語 | 主な役割                           |
| ---------- | ---------------------------------- |
| <a class="lesson-term" data-lesson-term href="#lesson-term-html">HTML</a>       | 見出し、段落、リンクなど文書の構造 |
| CSS        | 色、余白、画面幅に応じた表示等     |
| JavaScript | 操作への反応やブラウザ内の処理等   |
| XML・<a class="lesson-term" data-lesson-term href="#lesson-term-json">JSON</a>  | 構造化したデータの表現・交換       |
| SQL        | データベースの検索・更新等         |

## 例：学習サイトの問題画面

問題文と選択肢をHTMLで構造化し、CSSで読みやすく配置し、JavaScriptで解答を判定します。問題データをJSONで扱うこともできます。JSONはデータ形式であり、その文字列をそのままプログラムとして実行する必要はありません。APIで受け取った入力にも検証が必要です。

## まとめ

構造、見た目、処理、データを分けると、道具の目的を説明しやすくなります。

## 文書の構造、見た目、操作を分ける

商品説明のページを作るとき、見出しや段落をHTMLで表し、余白や画面幅に応じた配置をCSSで指定し、ボタンを押した後の変化をJavaScriptで扱えます。太字にしただけの段落は、利用者や機械に見出し構造を同じようには伝えません。構造と見た目を分けておくと、画面が変わっても情報を読めます。

プログラムは人が書いた命令を、処理できる形へ変換して実行します。コンパイラは典型的には実行前にまとめて変換し、インタプリタは実行時に解釈しながら進めます。実際には中間コードや実行時コンパイルを組み合わせる実装もあります。試験では言語名だけで決めず、問題が示す変換と実行の関係を読みます。

XMLの要素で情報を構造化する場合と、SQLでデータベースの条件を指定して操作する場合とでは役割が違います。機能をライブラリやAPIで再利用する際は、入力、出力、エラー時の条件を確認してから呼び出します。

<details><summary>見出しが太字なら読み上げでも見出しになる？</summary><p>見た目だけでは構造は伝わりません。意味に合う見出し要素を使います。</p></details>

## 表示・意味・動作をそれぞれ直す

申込ページで、見出しが普通の文章に見え、人数に0を入れても確認に進めるとします。見出しやラベルの意味はHTMLの要素で表現し、見出しの大きさや配置はCSSで決めます。入力値に応じてその場で案内を切り替えるのはJavaScriptの典型的な仕事です。申込をサーバに送るサービスなら、ブラウザでの案内に加えて、受け付け側でも人数を検証します。

<figure id="ip-languages-figure-1"><svg viewBox="0 0 360 220" width="360" height="220" style="max-width:100%;height:auto" role="img" aria-label="HTML：項目の意味と文書構造、CSS：配置、配色、文字サイズ、JavaScript：入力に応じた案内、受け付け側：業務規則を再検証"><g fill="currentColor" font-size="14" text-anchor="middle"><rect x="35" y="8" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="28">HTML：項目の意味と文書構造</text><rect x="35" y="60" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="80">CSS：配置、配色、文字サイズ</text><rect x="35" y="112" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="132">JavaScript：入力に応じた案内</text><rect x="35" y="164" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="184">受け付け側：業務規則を再検証</text></g><g fill="none" stroke="currentColor" stroke-width="2"><path d="M180 41v14m-4-4 4 4 4-4"/><path d="M180 93v14m-4-4 4 4 4-4"/><path d="M180 145v14m-4-4 4 4 4-4"/></g></svg><figcaption>同じ入力欄でも、意味・見た目・反応・受付の要件はそれぞれ変更先が異なります。</figcaption></figure>

XMLでは `<申込><人数>3</人数></申込>` のように項目名を付けたデータを受け渡せます。開始タグと終了タグが対応し、内側を閉じてから外側を閉じていれば、構造を読み取れます。それだけで人数が1以上であることは確認できません。件数の検索や行の更新を扱うSQL、画面を表すHTML、取引先にデータを渡すXMLは、どの段階で何をするかを分けて考えます。

## 変換の成功と実行結果を分ける

変数名の書き間違いは、プログラムを実行する前に見つかることがあります。割り算の入力が当日0のときだけ処理に失敗するなら、文法が正しくても実行時に初めて現れます。コンパイラは一般にソースを実行前に変換し、インタプリタは実行時にコードを処理します。中間コードや実行時コンパイルを組み合わせる処理系もあります。試験では、検査や変換の時点を読んだ上で、どの入力に対する動作を別に確かめるべきか考えます。

<span id="textbook-languages"></span>

<span id="ip-languages-source-reasoning"></span>

## 同じ見た目の値を、文字と数値に分けて処理する

画面に12と表示されても、プログラムが文字列として保持する場合があります。文字列は文字を並べたデータで、数値は加減算などの対象です。入力欄から文字列を受け取る条件では、使い道を決め、入力規則を確認して変換します。

| 入力された文字列 | 数量は0以上の整数という規則 | 次の処理 |
| --- | --- | --- |
| 12 | 満たす | 整数12へ変換 |
| 3.5 | 満たさない | 整数を入力するよう伝える |
| 空欄 | 数量が分からない | 入力を求める |
| １２ | 全角を受け付ける設計なら正規化して判断 | 表記の仕様も決める |

文字列をつなぐ処理なら12と3は123になります。数量として合計するには、整数へ変換して12＋3＝15と計算します。空欄を無条件に0へ変えると、未入力と0個を区別できなくなります。

構文どおり書けていること、変換して実行できること、数量が許される範囲にあることは別々に確かめます。プログラムが動いても、業務の条件まで正しいとは限りません。

**入力を分類する。** 0個が有効な状態である場合、「0」「−2」「未定」のうちどれを受け付けるでしょうか。

<details><summary>解答と確認する順を読む</summary>
<p>0だけです。−2は整数に変換できても0以上の範囲を外れ、未定は整数へ変換できません。文字の形、数値への変換、値の範囲を順に確認します。</p>
</details>

## 文書、データ、処理を役割で分ける

商品の一覧を別の部署へ渡し、利用者にはブラウザで見せます。どこを直すべきかは、変えたいのが情報の意味、見た目、動作、データ交換の約束のどれかで決まります。

<figure id="ip-languages-figure-2"><svg viewBox="0 0 340 228" width="340" height="228" style="max-width:100%;height:auto" role="img" aria-label="構造、HTMLで見出し・入力を表す。見た目、CSSで読みやすく整える。操作、プログラムで入力を処理。交換、構造化データの仕様を共有"><rect x="4" y="4" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="29" fill="currentColor" font-size="14">構造</text><text x="126" y="29" fill="currentColor" font-size="14">HTMLで見出し・入力を表す</text><path d="M170 46v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="58" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="83" fill="currentColor" font-size="14">見た目</text><text x="126" y="83" fill="currentColor" font-size="14">CSSで読みやすく整える</text><path d="M170 100v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="112" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="137" fill="currentColor" font-size="14">操作</text><text x="126" y="137" fill="currentColor" font-size="14">プログラムで入力を処理</text><path d="M170 154v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="166" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="191" fill="currentColor" font-size="14">交換</text><text x="126" y="191" fill="currentColor" font-size="14">構造化データの仕様を共有</text></svg><figcaption>文書の構造、表示、処理、交換は別々に変更できるようにします。</figcaption></figure>

<span id="languages-textbook-skill-1"></span>

### 構文が合うことと業務上正しいことを分ける

「数量」が数値の3として記録され、名称が文字列なら、受信側は数量を計算に使えます。JSONで数量を文字列の「3」にすれば、データとしては成立しても、受信仕様の数値型と合わない場合があります。XMLの開始・終了タグが対応していても、必須項目がなければ業務上は受理できません。両方の問題を避けるには、構造の規則と型・必須項目・単位の約束を別に確認します。

<span id="languages-textbook-skill-2"></span>

### 画面を見て役割を判断する

申込ページで入力欄の意味が伝わらないなら、ラベルと入力欄の関連をHTMLで示します。文字が読みにくければCSSの色や大きさを調整します。入力条件に違反したときに案内する振る舞いはプログラムで実装します。見た目だけで必須を示すと、色を見分けにくい利用者や読み上げで情報が伝わらないことがあります。文書の意味は視覚表現だけに任せません。

<span id="languages-textbook-skill-3"></span>

### 翻訳の成功から結果の正しさを推測しない

高水準言語で書かれた指示を、実行環境が扱える形に変換する方法の一つがコンパイルです。命令を逐次実行するインタプリタなどもあります。構文や型に関する誤りは変換段階で見つかる場合がありますが、値が0になったときの除算や、割引条件の比較向きを間違えた結果は、実行と検証が必要です。例えば「10個以上」を「10個より多い」と実装すると、11個の試験は通っても10個で誤ります。

<details><summary>練習問題の解き方を確かめる</summary>

**練習**　他社から届いたXMLの構造は読めますが、支払額が桁違いです。画面のCSSを修正すればよいでしょうか。

まず送受信の単位を照合します。円を前提とする側が100分の1円の単位を受け取れば100倍と解釈します。表示が正しくても値の意味が一致していないため、データ交換の仕様と変換を確かめます。

</details>

**復習の目安**　画面とデータの問題を分け、構文・実行・業務規則のどこを確認するか説明できます。

<span id="ip-languages-reuse-contract"></span>

## 読み手が追える名前と構造にそろえ、計算を再利用する

複数の人が同じプログラムを作るときは、変数や関数の名の付け方、字下げ、処理の分け方をそろえます。こうした書き方の約束を**コーディング標準**と呼びます。名前には値や処理の役割が伝わる語を使い、条件の内側にある処理は一段下げて読みやすくします。字下げの規則が処理のまとまり自体を決める言語もあるため、対応する言語の文法を確認したうえで、チームの書き方を定めます。

一つの処理が長くなったら、何度も使う計算を一つのまとまりとして取り出せます。これが**モジュール分割**の一例です。主処理は受付の流れを組み立て、分けた部品は料金計算など行う仕事を限定します。呼出し側で必要となる、関数名、渡す値の型や単位、戻り値、異常時の扱いを決めた接点が**API**です。別の処理でも使えるように部品をまとめたものを**ライブラリ**といいます。Web APIでは、通信を通して別のシステムの機能やデータを利用するための約束を公開します。

### 例題　送料の計算を見積画面と請求処理で使う

見積画面と請求処理に同じ計算を書くと、料金改定の際に片方だけ直して、同じ荷物でも画面によって金額が変わるおそれがあります。両方から一つの関数 `送料(重さg, 最短日指定)` を呼び出せば、送料を求める規則の更新先は一つです。APIの約束は、引数が0より大きい整数のグラム数と真偽値、戻り値が整数の円額とします。誤った引数は料金を返さず、入力の誤りとして呼出し側に伝えます。

料金の例として、基本料金を500円、最短日を指定した場合の追加を120円とします。呼出し `送料(850, 真)` の結果は620円です。見積画面が「0.85 kg」を受け取った場合は、850 gと変換できることを確かめてから関数へ渡します。`送料(0.85, 真)` をそのまま呼ぶと、金額を求める前に「正の整数のグラム数」という約束を満たさなくなります。画面から届いた文字列まで関数の内側でさまざまに解釈させると、見積画面と請求処理が別々の前提で動く原因になります。

<figure id="ip-languages-reuse-boundaries">
<figcaption id="ip-languages-reuse-caption">受付と共通計算を分け、同じ値で結果を照合する</figcaption>
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-languages-reuse-caption">
<table>
<thead><tr><th scope="col">処理の場所</th><th scope="col">ここで決めること</th><th scope="col">例での確認</th></tr></thead>
<tbody>
<tr><th scope="row">見積画面</th><td>入力の単位を読み取り、必要な整数へ変換する</td><td>「0.85 kg」を850 gへ変換する。</td></tr>
<tr><th scope="row">共通の送料計算</th><td>グラム数と真偽値の条件を確かめ、規則に沿って金額を返す</td><td>850 g、最短日指定あり → 620円を返す。</td></tr>
<tr><th scope="row">請求処理</th><td>注文データから同じ単位で値を渡し、料金を明細に記録する</td><td>850 g、最短日指定あり → 同じ620円となる。</td></tr>
</tbody>
</table>
</div>
</figure>

この関数の名前を単に `計算` とすると、呼出し元からは、税込金額を求めるのか、重さから送料を求めるのかが分かりません。役割が分かる名前と単位を使い、追加料金を求める処理を条件の下に置きます。基本料金の変更で呼出し方まで変える必要はありません。適用単位をグラムからキログラムに変える場合はAPIの約束も変わるため、利用する側を同時に調べます。

### 自力で確認　ライブラリを呼ぶ前に、入口の約束を確認する

注文の金額計算を別のライブラリへ移します。旧システムでは金額を円で渡していましたが、新ライブラリは金額を100分の1円単位の整数で受け取ります。画面は何も変えずに「450円」を表示しています。どこを変え、何を確かめればよいでしょうか。

<details><summary>呼出し前に必要な変換を読む</summary>
<p>新ライブラリを呼ぶ側で450円を45,000に変換します。APIが受け取るのは画面の文字ではなく、仕様で定めた単位の整数です。表示を変えず、呼出し直前の45,000という値と、戻り値を表示単位へ戻す方法を確かめます。同じ注文が別の画面からも来るなら、共通の変換を通して同じ結果になることも試します。</p>
</details>

シラバスではC、Java、Python、JavaScript、Rなども用語例に挙がります。選ぶときは言語名を一対一で用途に当てはめるのではなく、動作する場所と使える部品を確かめます。例えばブラウザ内で入力に応じて画面を切り替える処理にはJavaScriptが使われ、統計集計ならRやPythonに使えるライブラリがあります。機器に組み込む制御では、対象装置に合わせて使える処理系が必要です。

<section class="guided-lesson" id="guided-ip-languages" aria-labelledby="ip-languages-guided-title">
<h3 id="ip-languages-guided-title">途中で確認　型の異なる値を渡す境界</h3>
<p id="ip-languages-guided-prompt">数量を整数として受け取る処理に、画面から文字列「12」が渡されました。入力が整数として解釈できるという条件は、どこで確認するとよいでしょうか。</p>
<form data-guided-practice data-expected="correct" data-guided-hint="画面にどう表示されるかと、処理に渡す値の型を分けて考えます。" aria-labelledby="ip-languages-guided-title" aria-describedby="ip-languages-guided-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>自分の答えを入力する</legend>
<label><input type="radio" name="ip-languages-guided-answer" value="correct"> 画面から受け取った直後に、規則を確認して整数として変換する</label>
<label><input type="radio" name="ip-languages-guided-answer" value="choice-1"> 表示が数字なので、文字列のまま数量の足し算をする</label>
<label><input type="radio" name="ip-languages-guided-answer" value="choice-2"> 同じプログラムを別のOSで動かせば、整数として扱える</label>
<button type="submit" class="button secondary">答えを確かめる</button>
<button type="reset" class="button secondary">やり直す</button>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details><summary>答えと確認方法を読む</summary>
<p data-guided-solution>入力の規則を確認してから、処理に必要な整数へ変換します。「12」と「3」の文字をつないで「123」になる処理と、整数12＋3＝15は意味が異なります。</p>
</details>
</section>
