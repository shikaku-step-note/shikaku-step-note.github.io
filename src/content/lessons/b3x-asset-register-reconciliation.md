---
{
  "stableId": "b3x-asset-register-reconciliation",
  "qualification": "boki-3",
  "title": "固定資産台帳の空欄を埋める｜月割・累計額・売却損益",
  "description": "日商簿記3級の第2問に向け、固定資産台帳の取得月や取得原価を逆算し、直接法・間接法で期末残高を照合します。期中売却の影響も新しい資料で練習します。",
  "order": 34,
  "minutes": 90,
  "sample": false,
  "updated": "2026-11-16",
  "unit": 5,
  "subject": "commercial",
  "syllabus": [
    2
  ],
  "scopeLabel": "日商簿記3級・固定資産と帳簿の応用",
  "objectives": [
    "月割の範囲を定めて、台帳の取得月・原価・累計額を互いに逆算する",
    "同じ当期償却額を直接法・間接法の勘定に記し、期末の帳簿価額を照合する",
    "仮の期中売却を台帳の一行へ反映し、売却損益・残った資産・当期費用を別々に検算する"
  ],
  "prerequisite": "固定資産の取得、定額法による減価償却、固定資産の期中売却を学んでから進みます。月を数える条件は本文で確認します。",
  "keywords": [
    "日商簿記3級 第2問 固定資産台帳",
    "期首減価償却累計額 逆算",
    "月割 取得月",
    "直接法 間接法 帳簿価額",
    "期中売却 台帳"
  ],
  "glossary": [],
  "inlineGlossary": [
    {
      "id": "asset-register",
      "term": "固定資産台帳",
      "definition": "備品などについて、取得日・取得原価・耐用年数・減価償却などを資産ごとに記録する補助簿。"
    },
    {
      "id": "months-of-use",
      "term": "月割計算",
      "definition": "一年分の償却額を、問題で指定された使用月数に応じて計算すること。"
    },
    {
      "id": "opening-depreciation",
      "term": "期首減価償却累計額",
      "definition": "当期が始まるまでに、その資産に対して計上した減価償却費の合計。"
    },
    {
      "id": "carrying-value",
      "term": "帳簿価額",
      "definition": "取得原価から、その時点の減価償却累計額を差し引いた金額。"
    },
    {
      "id": "direct-method",
      "term": "直接法",
      "definition": "減価償却を記帳するとき、備品などの資産勘定から費用になった額を差し引く方法。"
    },
    {
      "id": "indirect-method",
      "term": "間接法",
      "definition": "取得原価を資産勘定に残し、費用化した額を減価償却累計額勘定に記録する方法。"
    },
    {
      "id": "disposal-result",
      "term": "固定資産売却損益",
      "definition": "売却代金と売却時の帳簿価額との差。代金が帳簿価額を上回れば益、下回れば損です。"
    }
  ]
}
---

## 台帳の列は、どの時点の数字かを読んでから使う

<a class="lesson-term" data-lesson-term href="#lesson-term-asset-register">固定資産台帳</a>は、備品などを一件ずつ追うための補助簿です。例えば「備品が何円あるか」は会社全体の勘定から分かりますが、「どの備品を何月に取得し、そのうちいくらを費用にしたか」は台帳の一行から分かります。第2問で空欄を埋めるときは、まず一行の中で、取得原価、費用にした額、残っている額の関係を確定させます。その後、同じ名前の列だけを縦に足し、勘定記入に使います。

<a class="lesson-term" data-lesson-term href="#lesson-term-opening-depreciation">期首減価償却累計額</a>は、当期が始まる前にすでに費用化した金額です。その残りが期首の<a class="lesson-term" data-lesson-term href="#lesson-term-carrying-value">帳簿価額</a>で、取得原価から期首累計額を引いて求めます。当期に使用した分だけを費用にした金額が当期減価償却費です。期首の累計額と当期費用を分けると、当期費用の二重計上を防げます。

<span id="objective-1"></span>

## 月数・取得原価・累計額のうち、どこから逆算できるか

備品をどれくらい使えると見込むかを年数で示したものを、耐用年数といいます。以下では、その期間が終わった時点で残ると見込む金額（残存価額）を0円とします。毎年同じ額を費用にする定額法で計算するため、一年分は取得原価を耐用年数で割って求めます。<a class="lesson-term" data-lesson-term href="#lesson-term-months-of-use">月割計算</a>では、使い始めた月から売却した月までを含め、期末まで保有する資産は期末の月まで含める条件にします。すべて月初に取得・使用を開始し、売却は月末です。本試験でも、対象となる期間と月の数え方は与えられた条件を先に確かめます。次の行には耐用年数に達した資産がなく、購入と売却に消費税や付随費用はないものとします。

<span id="worked-1"></span>

### 例題1　同じ表でも、空欄によって使う列が変わる

<figure id="asset-register-blank">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="asset-register-blank-caption">
<table><thead><tr><th scope="col">備品</th><th scope="col">使い始めた日</th><th scope="col">耐用年数</th><th scope="col">取得原価</th><th scope="col">期首の償却累計額</th><th scope="col">期首帳簿価額</th><th scope="col">当期償却費</th></tr></thead><tbody>
<tr><th scope="row">A 包装機</th><td>X5年4月1日</td><td>5年</td><td>360,000</td><td>（ア）</td><td>216,000</td><td>（イ）</td></tr>
<tr><th scope="row">B 撮影台</th><td>X6年（ウ）月1日</td><td>4年</td><td>240,000</td><td>25,000</td><td>（エ）</td><td>（オ）</td></tr>
<tr><th scope="row">C 切断機</th><td>X7年10月1日</td><td>5年</td><td>（カ）</td><td>—</td><td>—</td><td>18,000</td></tr>
</tbody></table></div>
<figcaption id="asset-register-blank-caption">3月31日決算の灯工房。期首はX7年4月1日、期末はX8年3月31日。金額は円。記号の欄を補い、対象がない欄は「—」と示した。</figcaption>
</figure>

Aの（ア）には、取得原価と期首帳簿価額の差が入ります。360,000−216,000＝144,000円です。X5年4月1日に使い始めてX7年3月31日までに丸二年経っているため、年額72,000円を二回足しても同じになります。当期は丸一年使うので、（イ）は72,000円です。

Bの取得月は、期首累計額から逆算します。年額は240,000÷4＝60,000円、月額は5,000円です。25,000÷5,000＝5か月ですから、前期末の3月を含めて五つの月を並べると11・12・1・2・3月となります。（ウ）は11月。（エ）は240,000−25,000＝215,000円です。当期は丸一年保有するため、（オ）は60,000円。取得月を求めるための五か月を当期の計算に使うと、当期費用を25,000円と誤ります。

Cは今期の途中から使っています。10月から翌年3月まで六か月なので、18,000円は一年分の半分。年額は18,000×12÷6＝36,000円、五年で全額を費用にする条件から（カ）は36,000×5＝180,000円です。当期首の時点では、Cはまだ取得していません。「—」の欄に当期の数字を写さず、当期の取得として別に集計します。

<figure id="asset-register-months">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="asset-register-months-caption">
<table><thead><tr><th scope="col">対象</th><th scope="col">前期末まで</th><th scope="col">当期末まで保有</th><th scope="col">仮に当期12月末に売却</th></tr></thead><tbody>
<tr><th scope="row">B 撮影台</th><td>X6年11月〜X7年3月（5か月）</td><td>X7年4月〜X8年3月（12か月）</td><td>X7年4〜12月（9か月）</td></tr>
<tr><th scope="row">C 切断機</th><td>当期取得のため該当なし</td><td>X7年10月〜X8年3月（6か月）</td><td>Bだけ売却するため6か月</td></tr>
</tbody></table></div>
<figcaption id="asset-register-months-caption">期間がつながっていても、期首累計額と当期償却費に入れる月は重ならない。Bを12月末に売る条件は後半で使う。</figcaption>
</figure>

空欄に数字を入れたら、欄で使った計算と逆の順序で検算します。Bの取得月なら、得られた11月から3月まで五か月と数え、月額5,000円を掛けて25,000円に戻します。Cの原価なら、180,000÷5×6÷12＝18,000円に戻るかを確かめます。ここでは各月の額が一定で、端数処理も必要ありません。候補の月が複数あり得る情報しかないときは、追加の条件を探します。

<span id="objective-2"></span>

## 同じ台帳から直接法・間接法で勘定を作る

各資産の当期費用は、A72,000円・B60,000円・C18,000円なので合計150,000円です。減価償却の記録方法が変わっても、この三件を使った期間は同じですから、当期費用は150,000円のままです。どの勘定に残すかが、<a class="lesson-term" data-lesson-term href="#lesson-term-direct-method">直接法</a>と<a class="lesson-term" data-lesson-term href="#lesson-term-indirect-method">間接法</a>の違いです。

<span id="worked-2"></span>

### 例題2　台帳合計と勘定残高を二つの方法で照合する

<figure id="asset-register-close">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="asset-register-close-caption">
<table><thead><tr><th scope="col">備品</th><th scope="col">期末の原価</th><th scope="col">期首累計額</th><th scope="col">当期償却費</th><th scope="col">期末累計額</th><th scope="col">期末帳簿価額</th></tr></thead><tbody>
<tr><th scope="row">A</th><td>360,000</td><td>144,000</td><td>72,000</td><td>216,000</td><td>144,000</td></tr>
<tr><th scope="row">B</th><td>240,000</td><td>25,000</td><td>60,000</td><td>85,000</td><td>155,000</td></tr>
<tr><th scope="row">C</th><td>180,000</td><td>0</td><td>18,000</td><td>18,000</td><td>162,000</td></tr>
<tr><th scope="row">合計</th><td>780,000</td><td>169,000</td><td>150,000</td><td>319,000</td><td>461,000</td></tr>
</tbody></table></div>
<figcaption id="asset-register-close-caption">全資産を期末まで保有する場合の台帳の集計（円）。「期末の原価」と「期末帳簿価額」の列を取り違えない。</figcaption>
</figure>

間接法では、取得原価が備品勘定に残ります。期首にAとBがあり、当期にCを追加したので、備品の借方残高は360,000＋240,000＋180,000＝780,000円です。当期の減価償却の仕訳は、借方「減価償却費」150,000円、貸方「減価償却累計額」150,000円。貸方の期首残高169,000円に150,000円が加わり、期末の累計額は319,000円です。差額780,000−319,000＝461,000円が、期末の備品の帳簿価額です。

直接法では、期首の備品残高がA216,000＋B215,000＝431,000円です。Cの取得額180,000円を加えた後、貸方の備品に150,000円を記入して減らします。仕訳の借方は間接法と同じ「減価償却費」150,000円です。式は431,000＋180,000−150,000＝461,000円。間接法の備品残高780,000円と直接法の備品残高461,000円をそのまま比べると一致しませんが、間接法の累計額を差し引いた期末帳簿価額はそろいます。台帳は直接法でも、元の取得関係と個々の償却額を確認する手掛かりになります。

決算の勘定記入では、次期へつなぐ欄も読む必要があります。間接法の備品勘定における期末借方残高780,000円は、当期末の締切行では貸方に「次期繰越」と書いて左右を合わせ、次期の期首には借方に「前期繰越」として記入します。累計額は貸方残高なので、同様の締切行と開始行が反対になります。締切の数字を「資産を売った」と読んでしまうと、台帳には存在しない売却を置くことになります。問題が締切・開始記入を求めるかどうかも確認します。

<span id="objective-3"></span>

## 売却条件があるときは、一行だけ変更して表を作り直す

ここからは、例題2とは別に「備品BをX7年12月末に157,000円で売り、普通預金へ入金された」と仮定します。AとCは変わりません。Bの<a class="lesson-term" data-lesson-term href="#lesson-term-disposal-result">固定資産売却損益</a>を求めるには、Bの取得額を探し、売却する日までの償却を計算し、その日の帳簿価額で代金と比べます。当期末までの十二か月で計算すると、売却までの期間に合いません。

<span id="worked-3"></span>

### 例題3　売った資産の累計額は外すが、使った分の当期費用は残る

Bの当期償却費は5,000×9＝45,000円。期首までに計上した25,000円を足すと、売却時点の累計額は70,000円です。帳簿価額は240,000−70,000＝170,000円。代金157,000円が13,000円低いため、固定資産売却損を13,000円計上します。売却時の差額に当期償却45,000円をさらに足すと、計算の途中で差し引いた費用を二重に数えます。

間接法では、売却前に借方「減価償却費」45,000円、貸方「減価償却累計額」45,000円を記録します。続いて、借方「普通預金」157,000円・「減価償却累計額」70,000円・「固定資産売却損」13,000円、貸方「備品」240,000円です。借方の157,000＋70,000＋13,000＝240,000円が貸方の額と合います。直接法では売却前に貸方「備品」へ45,000円を記録した後、売却で同勘定から残った170,000円を外します。いずれの方法でも、増えた預金は157,000円、売却損は13,000円です。

<figure id="asset-register-disposal">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="asset-register-disposal-caption">
<table><thead><tr><th scope="col">備品</th><th scope="col">当期償却費</th><th scope="col">期末の原価</th><th scope="col">期末累計額</th><th scope="col">期末帳簿価額</th></tr></thead><tbody>
<tr><th scope="row">A</th><td>72,000</td><td>360,000</td><td>216,000</td><td>144,000</td></tr>
<tr><th scope="row">B</th><td>45,000</td><td>0</td><td>0</td><td>0</td></tr>
<tr><th scope="row">C</th><td>18,000</td><td>180,000</td><td>18,000</td><td>162,000</td></tr>
<tr><th scope="row">合計</th><td>135,000</td><td>540,000</td><td>234,000</td><td>306,000</td></tr>
</tbody></table></div>
<figcaption id="asset-register-disposal-caption">仮にBだけ12月末に売った場合。売った資産にも使用中の当期償却費は発生する（円）。</figcaption>
</figure>

決算書に残る備品はAとCだけで、帳簿価額は144,000＋162,000＝306,000円です。別の順序でも検算できます。期首帳簿価額431,000円にCを180,000円で加え、当期に使った原価135,000円を引きます。さらに売ったBの帳簿価額170,000円を引くと、やはり306,000円です。この式で減らすのは売却時の帳簿価額です。代金157,000円は普通預金へ移るので、期末備品の金額を求める式には使いません。

<section id="asset-register-guided" aria-labelledby="asset-register-guided-title">
<h3 id="asset-register-guided-title">途中で確認　期首までに何か月使ったか</h3>
<p id="asset-register-guided-prompt">3月31日を期末とする別の会社の備品は、前期の月初に取得し、取得原価300,000円・耐用年数5年・残存価額0円です。当期首の償却累計額は35,000円で、定額法・月割です。取得月から前期末まで、何か月使用していますか。</p>
<form data-guided-practice data-expected="7" data-guided-hint="年額60,000円を12で割って月額を作り、期首累計額35,000円をその月額で割ります。" aria-labelledby="asset-register-guided-title" aria-describedby="asset-register-guided-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>自分の答えを入力する</legend>
<label for="asset-register-guided-answer">答え（か月）</label>
<input type="text" inputmode="numeric" id="asset-register-guided-answer" autocomplete="off">
<button type="submit" class="button secondary">答えを確かめる</button>
<button type="reset" class="button secondary">やり直す</button>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details><summary>答えと確認方法を読む</summary><p data-guided-solution>300,000÷5÷12＝5,000円が一か月の額。35,000÷5,000＝7か月です。3月を含めて七か月なら9月に使い始めたと分かり、9〜3月の七か月を一つずつ数えて検算できます。</p></details>
</section>

## 自力で解く　旧備品を売って新備品が残る場合

当期は4月1日から翌年3月31日までです。旧備品Zの取得原価は150,000円、耐用年数は五年、期首累計額は10,000円。Zは前期中のいずれかの月初に取得しており、当期10月末に120,000円で売却しました。新備品Pは当期7月1日に取得・使用を始め、耐用年数は四年、当期償却費は36,000円と分かっています。定額法、残存価額0円、使用月と売却月を含める月割です。他に備品はありません。①Zの取得月、②Pの取得原価、③Zの売却損益、④当期償却費の合計と期末の備品帳簿価額を、途中式とともに答えてください。

<details><summary>解答と検算を読む</summary>

Zの月額は150,000÷5÷12＝2,500円。期首までの10,000÷2,500＝4か月は、12・1・2・3月です。Pは7月から3月まで九か月。36,000×12÷9＝48,000円が年額なので、取得原価は48,000×4＝192,000円となります。Zは当期の4〜10月の七か月で17,500円を償却し、売却時の累計額は27,500円、帳簿価額は122,500円です。代金120,000円との差2,500円が売却損です。当期償却費はZの17,500円とPの36,000円で53,500円。期末に残るのはPだけなので、帳簿価額は192,000−36,000＝156,000円です。全体としても、期首備品140,000＋取得192,000−当期費用53,500−売却時帳簿価額122,500＝156,000円に戻ります。

</details>

## 公式資料と確認日

- [日本商工会議所「簿記出題区分表」](https://www.kentei.ne.jp/bookkeeping/35697-2)で現行範囲の固定資産・減価償却・帳簿の扱いを確認しました（2026年11月16日）。
- [日本商工会議所「3級 サンプル問題」](https://www.kentei.ne.jp/bookkeeping/sample/sample_3)の第2問サンプルを参照しました。ここで使った資料・数字・設問は独自に作成したものです。
