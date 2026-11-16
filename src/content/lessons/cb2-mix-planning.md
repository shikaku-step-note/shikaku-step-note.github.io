---
{
  "stableId": "cb2-mix-planning",
  "qualification": "cost-beginner",
  "title": "複数商品の損益分岐点｜販売構成と必要な販売数",
  "description": "商品の販売構成を使い、全体の貢献利益率・損益分岐点売上高・実行できる最小販売数を計算する原価計算初級のCVP応用。販売数量に上限があるときも例題で判断します。",
  "order": 28,
  "minutes": 85,
  "sample": false,
  "updated": "2026-11-16",
  "unit": 4,
  "syllabus": [
    2
  ],
  "scopeLabel": "原価計算初級・公式範囲2(1)の応用",
  "subject": "cost",
  "objectives": [
    "販売構成を数量と売上高に分け、全体の貢献利益率を計算する",
    "販売一組を単位として、理論上の損益分岐点と実行できる最小販売数を求める",
    "販売上限や商品構成の変化を反映し、営業利益を再計算する"
  ],
  "prerequisite": "「損益分岐点の求め方｜販売数量と売上高」と「CVP分析の例題｜営業計画と値上げ後の損益」を学んでから進みます。貢献利益の求め方は本文でも振り返ります。",
  "keywords": [
    "複数商品の損益分岐点",
    "セールスミックス",
    "販売構成 貢献利益率",
    "損益分岐点 複数製品",
    "原価計算初級 CVP 応用",
    "販売上限"
  ],
  "glossary": [],
  "inlineGlossary": [
    {
      "id": "sales-mix",
      "term": "販売構成",
      "definition": "複数の商品の販売数量や売上高の内訳。この章では、どちらの割合かを明示します。"
    },
    {
      "id": "unit-contribution",
      "term": "単位貢献利益",
      "definition": "販売単価から一個当たりの変動費を引いた金額。固定費の回収や営業利益に充てます。"
    },
    {
      "id": "mix-contribution-rate",
      "term": "全体の貢献利益率",
      "definition": "各商品の貢献利益を合計し、売上高の合計で割った割合。商品の売上高の内訳により変わります。"
    },
    {
      "id": "sales-bundle",
      "term": "販売一組",
      "definition": "商品の個数の割合を保つために置く計算上の単位。この章の最初の例ではA2個・B1個です。"
    },
    {
      "id": "break-even",
      "term": "損益分岐点",
      "definition": "売上高から費用を引いた営業利益がちょうど0となる売上規模。商品を整数で売る場合の最小数量と異なることがあります。"
    }
  ]
}
---

<span id="objective-1"></span>

## 販売構成が変われば、同じ売上高でも利益が変わる

商品Aは1個1,000円で、販売1個につき600円の変動費がかかります。商品Bは1個2,000円で、販売1個につき900円の変動費がかかるとします。1個売ると、Aでは400円、Bでは1,100円を固定費の回収や営業利益に回せます。この金額が1個当たりの貢献利益、つまり<a class="lesson-term" data-lesson-term href="#lesson-term-unit-contribution">単位貢献利益</a>です。同じ売上高2,000円でも、Aを2個売ったときの貢献利益は800円、Bを1個売ったときは1,100円になります。

複数の商品を売る場合、商品ごとの販売数や売上高の内訳を<a class="lesson-term" data-lesson-term href="#lesson-term-sales-mix">販売構成</a>と呼びます。営業利益の計画を立てるときは、その内訳も決めておく必要があります。売上高の合計から出発する場合も、各商品の変動費を計算してから利益を求めます。

<span id="worked-1"></span>

<figure id="mix-planning-unit-economics">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="mix-planning-unit-economics-caption">
<table>
<thead><tr><th scope="col">商品</th><th scope="col">販売単価</th><th scope="col">単位変動費</th><th scope="col">単位貢献利益</th><th scope="col">貢献利益率</th></tr></thead>
<tbody>
<tr><th scope="row">A</th><td>1,000円</td><td>600円</td><td>400円</td><td>40％</td></tr>
<tr><th scope="row">B</th><td>2,000円</td><td>900円</td><td>1,100円</td><td>55％</td></tr>
</tbody>
</table>
</div>
<figcaption id="mix-planning-unit-economics-caption">売上高が同じ2,000円になる組合せでも、A2個とB1個では固定費の回収に使える金額が違います。</figcaption>
</figure>

この章では、複数商品の売り方を計画するために、現行範囲2(1)のCVP分析を応用します。1か月を対象にし、固定費は月180,500円。問題ごとに指定した条件の範囲では、各商品の販売単価と単位変動費を一定とします。計画の利益は「売上高−変動費−固定費」で求めます。製造途中のものや、作って売れなかった製品の原価を計算する[在庫と原価の対応を学ぶ章](../cb2-finished/)とは、使う資料が異なります。

### 数量の割合と売上高の割合を取り違えない

Aを2個売るごとにBを1個売ると仮定します。売れた3個のうち2個がAなので、個数で見たAの割合は3分の2です。売上高で見ると、Aは1,000円×2＝2,000円、Bも2,000円×1＝2,000円。AもBも全体の50％を占めます。商品によって販売単価が異なるため、数量の割合を売上高の割合へそのまま移せません。

全体の売上高のうち、固定費の回収や営業利益に回る割合が<a class="lesson-term" data-lesson-term href="#lesson-term-mix-contribution-rate">全体の貢献利益率</a>です。ここでは貢献利益の合計400円×2＋1,100円＝1,900円を、売上高の合計4,000円で割ります。答えは47.5％です。商品別の貢献利益率から計算しても、40％×0.5＋55％×0.5＝47.5％と一致します。AとBの率の単純平均と一致したのは、売上高がたまたま等しいからです。個数の割合で計算する場合は、まず1個当たりの金額を各商品の個数で加重してから売上高に対する割合へ直します。

<span id="objective-2"></span>

## 販売の組合せを一組と置き、必要な組数を求める

A2個とB1個をまとめて考える単位を、<a class="lesson-term" data-lesson-term href="#lesson-term-sales-bundle">販売一組</a>とします。実際にセット商品として売るという意味ではありません。同じ割合を保ったまま販売数を増やせるよう、計算上のまとまりを置いたものです。一組が売れるごとに1,900円の貢献利益が増えるので、固定費を賄うのに必要な組数は、180,500÷1,900＝95組となります。

95組ならA190個、B95個です。売上高は4,000円×95＝380,000円。全体の貢献利益率から求めても、180,500÷0.475＝380,000円となります。固定費と貢献利益が一致し、営業利益は0円です。売上高だけ示されたときにも38万円を目安にできるのは、商品の組合せ、価格、変動費、固定費が計画と同じだと置いた場合です。

### 応用　目標利益に必要な数量が、販売の上限を超えないか

月28,500円の営業利益を目標にすると、必要な貢献利益は180,500＋28,500＝209,000円です。A2個とB1個の組合せを守ると、209,000÷1,900＝110組、すなわちA220個、B110個が必要になります。

ところが今月は、Aを最大220個、Bを最大90個までしか販売できません。Aだけなら220÷2＝110組分ありますが、Bで作れるのは90÷1＝90組分です。この組合せのまま売れる上限は90組。営業利益は1,900×90−180,500＝−9,500円なので、組合せを保つ限り赤字になります。110組という必要数を求めたら、それぞれの商品を必要なだけ売れるかも確かめます。

<span id="worked-3"></span>

<figure id="mix-planning-capacity">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="mix-planning-capacity-caption">
<table>
<thead><tr><th scope="col">状態</th><th scope="col">Aの数量</th><th scope="col">Bの数量</th><th scope="col">組数</th><th scope="col">営業利益</th></tr></thead>
<tbody>
<tr><th scope="row">利益をゼロにする数量</th><td>190個</td><td>95個</td><td>95組</td><td>0円</td></tr>
<tr><th scope="row">目標利益を得る数量</th><td>220個</td><td>110個</td><td>110組</td><td>28,500円</td></tr>
<tr><th scope="row">Bが90個までの月</th><td>180個</td><td>90個</td><td>90組</td><td>−9,500円</td></tr>
</tbody>
</table>
</div>
<figcaption id="mix-planning-capacity-caption">A2個・B1個の場合は、必要数と実際の上限を商品ごとに照合します。</figcaption>
</figure>

Bを増やす方法を検討する際には、Bの上限が供給と需要のどちらから生じているかを確認します。上限を超えるために追加の費用がかかるなら、固定費や変動費にも変更を反映して計算し直す必要があります。販売構成を変えた案は、別の計画として扱います。

<span id="objective-3"></span>

## 組数が割り切れない場合は、分岐点と実行できる数量を分ける

A1個とB2個の組合せを別の計画とします。固定費は180,500円のままで、ここではBの販売上限を設けません。一組の売上高は1,000＋2,000×2＝5,000円、貢献利益は400＋1,100×2＝2,600円です。全体の貢献利益率は52％。販売数量を連続量として扱った場合の、理論上の<a class="lesson-term" data-lesson-term href="#lesson-term-break-even">損益分岐点売上高</a>は、180,500÷0.52≒347,115.38円です。

決められた組合せを守り、AやBを個数で販売するには、組数を整数にします。180,500÷2,600＝約69.42組なので、赤字にならない最小は70組です。69組なら貢献利益179,400円で1,100円の赤字、70組なら貢献利益182,000円で1,500円の黒字になります。70組を売る場合の売上高は350,000円で、理論上の分岐点とは別の金額です。

<span id="worked-2"></span>

<figure id="mix-planning-break-even">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="mix-planning-break-even-caption">
<table>
<thead><tr><th scope="col">組数</th><th scope="col">売上高</th><th scope="col">貢献利益</th><th scope="col">固定費</th><th scope="col">営業利益</th></tr></thead>
<tbody>
<tr><th scope="row">69組</th><td>345,000円</td><td>179,400円</td><td>180,500円</td><td>−1,100円</td></tr>
<tr><th scope="row">70組</th><td>350,000円</td><td>182,000円</td><td>180,500円</td><td>1,500円</td></tr>
</tbody>
</table>
</div>
<figcaption id="mix-planning-break-even-caption">A1個・B2個の組合せでは69組と70組の間で損益が変わります。</figcaption>
</figure>

### 例題　売上が当初の計画と同じだった月を判定する

最初の計画では、売上高380,000円をA190個・B95個で得れば営業利益は0円でした。今月はA220個とB80個を販売しました。Aの売上高が220,000円、Bが160,000円なので、合計は同じ380,000円です。営業利益も0円だったか、確かめましょう。

実際の貢献利益はAが400×220＝88,000円、Bが1,100×80＝88,000円、合計176,000円です。固定費180,500円を引くと営業損失4,500円でした。最初に計算した47.5％を実績に当てはめると、この損失を見落とします。割合が変わった月は、商品ごとの実績を使って貢献利益を求めます。

別の検算では、Bの販売が計画より15個少なく、Aは30個多いことを使います。同じ売上高を作るためにBを1個減らしてAを2個増やすたびに、貢献利益は1,100−800＝300円下がります。300円×15＝4,500円なので、上の損失額と一致します。売上が同じ月でも営業利益が違う理由を、商品の内訳から説明できます。

<section class="guided-lesson" id="guided-mix-planning" aria-labelledby="guided-mix-planning-title">
<h3 id="guided-mix-planning-title">途中で確認　販売数量から赤字額を求める</h3>
<p id="guided-mix-planning-prompt">ある店はA1個につき500円、B1個につき800円の貢献利益を得ます。月の固定費は72,000円、実際の販売数はA60個、B50個でした。営業損失は何円ですか。損失の額を正の数字で入力してください。</p>
<form data-guided-practice data-expected="2000" data-guided-hint="AとBそれぞれの貢献利益を計算して合計し、固定費72,000円に足りない金額を求めます。" aria-labelledby="guided-mix-planning-title" aria-describedby="guided-mix-planning-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>練習の答え</legend>
<label for="guided-mix-planning-input">答え（円）</label>
<input id="guided-mix-planning-input" name="answer" aria-describedby="guided-mix-planning-prompt" class="guided-number" type="text" inputmode="numeric" enterkeyhint="done" maxlength="18" autocomplete="off">
<div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details>
<summary>解答と考え方を読む</summary>
<p data-guided-solution>Aは500円×60＝30,000円、Bは800円×50＝40,000円で、貢献利益は合計70,000円。固定費72,000円に2,000円足りません。営業利益は−2,000円なので、問われた営業損失の額は2,000円です。</p>
</details>
</section>

## 自分で解く　計画の組合せで赤字を避けられるか

商品Cは販売単価1,500円・単位変動費1,000円、商品Dは販売単価2,500円・単位変動費1,700円です。月間固定費は136,500円。C1個とD2個を一組とし、組単位で販売計画を立てます。赤字を避ける最小の組数、各商品の販売数、売上高を求めてください。Dが120個までしか売れない月は、この計画で赤字を避けられますか。指定された範囲では、固定費・単価に変更がないものとします。

<details>
<summary>解答と考え方を読む</summary>
<p>一組の貢献利益は、Cの500円とDの800円×2で2,100円。固定費136,500円を賄うには65組が必要です。C65個とD130個で、売上高は6,500円×65＝422,500円です。</p>
<p>Dを120個までしか売れない月は、60組が上限です。貢献利益126,000円（2,100円×60）から固定費136,500円を引くと10,500円の営業損失です。65組を売れる前提で出した必要売上高を、そのまま今月の目標にはできません。</p>
</details>

## 関連する例題と公式資料

[数量と金額で見る損益分岐点](../cb2-break-even/)で、一つの商品を扱う場合の考え方を復習できます。[価格や変動費が変わる場合](../cb2-cvp-planning-case/)では、一つのサービスについて条件の違いを確かめます。実績の売上高が予算から動いた理由を説明するには、[製品ごとに売上高差異を求める章](../cb2-variance-cases/)へ進みます。

[日本商工会議所の出題範囲2(1)](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30genkashokyu.pdf)は、売上高・変動費・固定費・貢献利益と営業利益・損益分岐点を扱います。販売構成を固定して複数商品の分岐点を求める方法は、これらの計算を組み合わせた本章の応用です。公式資料では「販売構成を固定した複数商品の計算」を独立した項目として指定していません。単一の事業で条件を変更する設問は[日本商工会議所の公開サンプル](https://www.kentei.ne.jp/bookkeeping/ca/sample)で確認できます。一般的な分岐点の式は[中小企業基盤整備機構「損益分岐点を使った目標売上高」](https://j-net21.smrj.go.jp/startup/manual/list5/5-2-9.html)にも解説があります。
