---
{
  'stableId': 'ip-languages',
  'qualification': 'it-passport',
  'title': 'プログラム言語・Webとデータ表現',
  'description': '言語の役割を区別する。HTML・CSS・JSON等の用途を説明する。具体例と理解度チェックで学ぶITパスポートの無料レッスンです。',
  'order': 25,
  'minutes': 60,
  'sample': false,
  'updated': '2026-11-12',
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
}
---

## プログラムの実行まで

ソースコードをコンピュータで実行できる形へ変換する方法にはコンパイル等があります。インタプリタ方式はプログラムを解釈しながら実行する考え方ですが、実際の処理系は複数方式を組み合わせることもあります。機械語、アセンブリ言語、高水準言語は抽象化の程度が異なります。PythonやJavaなどは目的や実行環境に応じて選びます。

## オブジェクト指向と再利用

オブジェクトはデータとそれに関する処理をまとめて扱う考え方です。クラスは共通の性質を定義し、インスタンスはその具体的な実体です。カプセル化は内部の状態や実装を隠し、定めた接点を使う設計に役立ちます。継承は性質等の引継ぎ、多態性は同じ接点で異なる実装を扱う性質です。関数や部品を適切に分けると変更を局所化できます。

## Webで役割を分ける

| 形式・言語 | 主な役割                           |
| ---------- | ---------------------------------- |
| HTML       | 見出し、段落、リンクなど文書の構造 |
| CSS        | 色、余白、画面幅に応じた表示等     |
| JavaScript | 操作への反応やブラウザ内の処理等   |
| XML・JSON  | 構造化したデータの表現・交換       |
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

<figure><svg viewBox="0 0 360 220" width="360" height="220" style="max-width:100%;height:auto" role="img" aria-label="HTML：項目の意味と文書構造、CSS：配置、配色、文字サイズ、JavaScript：入力に応じた案内、受け付け側：業務規則を再検証"><g fill="currentColor" font-size="14" text-anchor="middle"><rect x="35" y="8" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="28">HTML：項目の意味と文書構造</text><rect x="35" y="60" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="80">CSS：配置、配色、文字サイズ</text><rect x="35" y="112" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="132">JavaScript：入力に応じた案内</text><rect x="35" y="164" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="184">受け付け側：業務規則を再検証</text></g><g fill="none" stroke="currentColor" stroke-width="2"><path d="M180 41v14m-4-4 4 4 4-4"/><path d="M180 93v14m-4-4 4 4 4-4"/><path d="M180 145v14m-4-4 4 4 4-4"/></g></svg><figcaption>同じ入力欄でも、意味・見た目・反応・受付の要件はそれぞれ変更先が異なります。</figcaption></figure>

XMLでは `<申込><人数>3</人数></申込>` のように項目名を付けたデータを受け渡せます。開始タグと終了タグが対応し、内側を閉じてから外側を閉じていれば、構造を読み取れます。それだけで人数が1以上であることは確認できません。件数の検索や行の更新を扱うSQL、画面を表すHTML、取引先にデータを渡すXMLは、どの段階で何をするかを分けて考えます。

## 変換の成功と実行結果を分ける

変数名の書き間違いは、プログラムを実行する前に見つかることがあります。割り算の入力が当日0のときだけ処理に失敗するなら、文法が正しくても実行時に初めて現れます。コンパイラは一般にソースを実行前に変換し、インタプリタは実行時にコードを処理します。中間コードや実行時コンパイルを組み合わせる処理系もあります。試験では、検査や変換の時点を読んだ上で、どの入力に対する動作を別に確かめるべきか考えます。

<span id="textbook-languages"></span>

## 文書、データ、処理を役割で分ける

商品の一覧を別の部署へ渡し、利用者にはブラウザで見せます。どこを直すべきかは、変えたいのが情報の意味、見た目、動作、データ交換の約束のどれかで決まります。

<figure><svg viewBox="0 0 340 228" width="340" height="228" style="max-width:100%;height:auto" role="img" aria-label="構造、HTMLで見出し・入力を表す。見た目、CSSで読みやすく整える。操作、プログラムで入力を処理。交換、構造化データの仕様を共有"><rect x="4" y="4" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="29" fill="currentColor" font-size="14">構造</text><text x="126" y="29" fill="currentColor" font-size="14">HTMLで見出し・入力を表す</text><path d="M170 46v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="58" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="83" fill="currentColor" font-size="14">見た目</text><text x="126" y="83" fill="currentColor" font-size="14">CSSで読みやすく整える</text><path d="M170 100v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="112" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="137" fill="currentColor" font-size="14">操作</text><text x="126" y="137" fill="currentColor" font-size="14">プログラムで入力を処理</text><path d="M170 154v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="166" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="191" fill="currentColor" font-size="14">交換</text><text x="126" y="191" fill="currentColor" font-size="14">構造化データの仕様を共有</text></svg><figcaption>文書の構造、表示、処理、交換は別々に変更できるようにします。</figcaption></figure>

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
