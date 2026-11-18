---
{
  "stableId": "cb2-department-cost-route",
  "qualification": "cost-beginner",
  "title": "共通費を部門から製品へ配賦する｜工場と販売部門の家賃",
  "description": "共通の建物代を製造と販売の部門へ分け、機械時間・作業時間で製品X・Yの原価を求めます。部門の使用面積を訂正したとき、在庫・売上原価・営業利益へどう伝わるかを表と例題で確認します。",
  "order": 12,
  "minutes": 78,
  "sample": false,
  "updated": "2026-11-18",
  "unit": 2,
  "syllabus": [
    1,
    3
  ],
  "scopeLabel": "原価計算初級・現行範囲の基礎を組み合わせた独自演習",
  "subject": "cost",
  "objectives": [
    "共通の請求額を用途と使用面積から部門へ分け、製造間接費と販管費に整理する",
    "部門ごとに指定された時間を使い、製品別の負担額と完成品の単位原価を求める",
    "使用面積の訂正で変わる製品原価、販売分、在庫、営業利益を順に検算する"
  ],
  "prerequisite": "部門固有費・共通費、配賦基準と配賦率を学んでから進みます。製品に費用を集める計算を、部門から始めて練習します。",
  "keywords": [
    "部門共通費",
    "配賦",
    "配賦率",
    "製造間接費",
    "販管費",
    "部門から製品",
    "部門共通費 配賦 計算",
    "工場と販売部門の家賃",
    "製造原価と販管費"
  ],
  "glossary": [],
  "inlineGlossary": [
    {
      "id": "department-common",
      "term": "部門共通費",
      "definition": "複数の部門の活動に共通してかかる費用。負担の根拠となる面積などの資料から、部門別の金額に分けます。"
    },
    {
      "id": "department-specific",
      "term": "部門固有費",
      "definition": "請求書や作業記録を見て、どの部門で生じたかを金額まで確かめられる費用。部門の中で複数の製品に共通することもあります。"
    },
    {
      "id": "manufacturing-overhead",
      "term": "製造間接費",
      "definition": "製造にかかった費用のうち、特定の製品に直接結び付けられないもの。指定された基準で製品に配賦します。"
    },
    {
      "id": "selling-admin",
      "term": "販売費および一般管理費",
      "definition": "販売活動や会社全体の管理活動にかかる費用。製造原価の集計とは分け、営業利益を求める段階で売上総利益から引きます。"
    },
    {
      "id": "allocation-base",
      "term": "配賦基準",
      "definition": "共通する費用を分けるための尺度。この章では、使用面積、機械の運転時間、担当者の作業時間を使い分けます。"
    },
    {
      "id": "unit-cost",
      "term": "単位原価",
      "definition": "製品一個当たりの原価。ここでは、同じ条件で完成した製品の原価を完成数量で割って求めます。"
    }
  ]
}
---

建物を複数の部門で使う場合、一枚の家賃請求書から、そのまま製品一つの負担額を読むことはできません。まず、どの部門が建物のどの範囲を使ったかを調べ、請求額を部門に分けます。この段階で、工場に集める分と、売場などの販売活動に集める分が決まります。

次に、工場の部門で複数の製品を作っているなら、その部門に集めた費用を製品へ分けます。最初は「どの部門の費用か」、次は「どの製品が負担するか」を決める手順です。[部門別原価の読み方](../cb2-departments/)と[製造間接費の配賦](../cb2-allocation/)をつなぐと、同じ一枚の請求書でも、販売費と各製品の原価に分かれる理由を説明できます。

<span id="objective-1"></span>

## 建物の使用面積で家賃を部門へ分ける

部門は、担当する仕事のまとまりです。木を削る仕事を切削部門、表面を磨く仕事を仕上部門が受け持ちます。店頭に立って注文を受けるのは販売部門です。複数の部門が一緒に使う建物の家賃を、ここでは<a class="lesson-term" data-lesson-term href="#lesson-term-department-common">部門共通費</a>と呼びます。

共通費を分けるときに使う面積や時間は<a class="lesson-term" data-lesson-term href="#lesson-term-allocation-base">配賦基準</a>です。この章の家賃は、三つの部門の使用面積に比例させる指定です。工場側の金額だけが知りたい場合も、請求書の家賃には売場の分が入っています。したがって、割り始めに使う面積は建物を使う三部門の合計です。

一方、切削機の点検を頼んだ請求書に切削部門と金額が書かれていれば、その費用は切削部門に集められます。発生した部門を記録から確かめられる費用が<a class="lesson-term" data-lesson-term href="#lesson-term-department-specific">部門固有費</a>です。ここで分かるのは切削部門までです。一台の切削機で製品AとBを扱うなら、点検費のうち各製品にかかった額は別の資料から求めます。

<span id="worked-1"></span>

### 例題1　家賃72,000円のうち、製造と販売はいくらか

この工房の当月の家賃は72,000円です。共用通路など別に計算する面積はなく、三部門の使用面積の合計が請求書の対象と一致します。切削と仕上には、家賃とは別に、それぞれ28,000円と42,000円の部門固有の製造間接費があります。

<figure id="cb2-department-cost-route-usage"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="cb2-department-cost-route-usage-caption"><table><thead><tr><th scope="col">部門</th><th scope="col">活動</th><th scope="col">面積</th><th scope="col">当月の部門固有の製造間接費</th></tr></thead><tbody><tr><th scope="row">切削部門</th><td>木を削る</td><td>60㎡</td><td>28,000円</td></tr><tr><th scope="row">仕上部門</th><td>磨き、表面を整える</td><td>30㎡</td><td>42,000円</td></tr><tr><th scope="row">販売部門</th><td>店頭で販売する</td><td>30㎡</td><td>集計対象外</td></tr><tr><th scope="row">計</th><td>共用建物</td><td>120㎡</td><td>70,000円</td></tr></tbody></table></div><figcaption id="cb2-department-cost-route-usage-caption">一枚の請求書の費用を、各部門の使用面積へ対応させます。製造部門の固有費は別資料の金額です。</figcaption></figure>

面積の合計は60＋30＋30＝120㎡です。家賃の割当てに使う率は72,000÷120＝600円/㎡。切削へ36,000円、仕上へ18,000円、販売へ18,000円を分けると、合計は元の請求額72,000円になります。工場の面積90㎡だけで割ると、店頭が使った部分まで工場の負担にしてしまいます。

製造に関わる費用で、個々の製品へ金額を直接結び付けられないものが<a class="lesson-term" data-lesson-term href="#lesson-term-manufacturing-overhead">製造間接費</a>です。切削と仕上の家賃は、各部門の固有の間接費に加えます。販売部門が負担する家賃は、<a class="lesson-term" data-lesson-term href="#lesson-term-selling-admin">販売費および一般管理費</a>（販管費）に入れます。店頭で販売する仕事に使った場所なので、製品を作るための原価とは集計する段階が異なります。

<figure id="cb2-department-cost-route-split"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="cb2-department-cost-route-split-caption"><table><thead><tr><th scope="col">内訳</th><th scope="col">切削</th><th scope="col">仕上</th><th scope="col">販売</th><th scope="col">合計</th></tr></thead><tbody><tr><th scope="row">家賃</th><td>36,000円</td><td>18,000円</td><td>18,000円</td><td>72,000円</td></tr><tr><th scope="row">固有の製造間接費</th><td>28,000円</td><td>42,000円</td><td>―</td><td>70,000円</td></tr><tr><th scope="row">この表の合計</th><td>64,000円</td><td>60,000円</td><td>18,000円</td><td>142,000円</td></tr></tbody></table></div><figcaption id="cb2-department-cost-route-split-caption">面積で分けるのは家賃です。部門固有費は金額が分かっている部門の列へ記入します。</figcaption></figure>

製造側は切削64,000円と仕上60,000円です。販売部門の列は、家賃の18,000円だけをここに載せています。後で販売に固有の費用と合わせるため、この表の142,000円を工房のすべての費用と思わないようにします。

<figure id="cb2-department-cost-route-flow"><svg viewBox="0 0 360 250" width="360" height="250" style="max-width:100%;height:auto" role="img" aria-label="建物の家賃72,000円を面積で切削36,000円、仕上18,000円、販売18,000円へ。切削と仕上は固有の製造間接費も加えて製品AとBへ。販売の分は販管費へ。"><g fill="currentColor" fill-opacity=".08" stroke="currentColor"><rect x="105" y="7" width="150" height="35" rx="6"/><rect x="8" y="86" width="106" height="45" rx="6"/><rect x="126" y="86" width="106" height="45" rx="6"/><rect x="244" y="86" width="108" height="45" rx="6"/><rect x="29" y="179" width="182" height="47" rx="6"/><rect x="251" y="179" width="94" height="47" rx="6"/></g><path d="M180 43v24H61v18m119-17h118v17m-118-17v17M61 132v24h59v22m59-46v24h-59m178-24v46" fill="none" stroke="currentColor" stroke-width="2"/><g fill="currentColor" font-size="13" text-anchor="middle"><text x="180" y="29">家賃 72,000円</text><text x="61" y="104">切削部門</text><text x="61" y="122">36,000円</text><text x="179" y="104">仕上部門</text><text x="179" y="122">18,000円</text><text x="298" y="104">販売部門</text><text x="298" y="122">18,000円</text><text x="120" y="197">固有の製造間接費も加え</text><text x="120" y="216">製品A・Bへ配賦</text><text x="298" y="207">販管費へ</text></g></svg><figcaption>面積で分けた後、工場の分は製品の原価へ進みます。販売部門の分は損益計算書で引きます。</figcaption></figure>

<section class="guided-lesson" id="guided-department-route-factory" aria-labelledby="guided-department-route-factory-title">
<h3 id="guided-department-route-factory-title">途中で確認　工場の二部門が負担する家賃</h3>
<p id="guided-department-route-factory-prompt">家賃48,000円を、加工30㎡・検査20㎡・販売10㎡へ面積で分けます。加工と検査だけが製造活動を行います。二部門が負担する家賃の合計はいくらですか。</p>
<form data-guided-practice data-expected="40000" data-guided-hint="家賃の分母は加工・検査・販売が使う全60㎡です。加工と検査は合わせて50㎡を使います。" aria-labelledby="guided-department-route-factory-title" aria-describedby="guided-department-route-factory-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>練習の答え</legend>
<label for="guided-department-route-factory-input">答え（円）</label> <input id="guided-department-route-factory-input" name="answer" aria-describedby="guided-department-route-factory-prompt" class="guided-number" type="text" inputmode="numeric" enterkeyhint="done" maxlength="18" autocomplete="off">
<div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details>
<summary>解答と考え方を読む</summary>
<p data-guided-solution>面積一㎡当たりの家賃は48,000÷60＝800円です。加工と検査は合わせて50㎡なので40,000円を負担し、残る8,000円は販売の分です。</p>
</details>
</section>

<span id="objective-2"></span>

## 部門によって、製品に振り分けるための資料が変わる

家賃を部門へ配った後は、部門ごとに集まった製造間接費を製品A・Bへ分けます。切削機の運転時間が長い品目と、仕上げの作業時間が長い品目は同じとは限りません。この例では、切削は機械時間、仕上は作業時間の割合で配ります。どちらも時間で測りますが、一方では機械が動いた長さを、もう一方では人が作業した長さを記録しています。

<span id="worked-2"></span>

### 例題2　切削の率と仕上の率を別々に求める

作業記録によると、切削の機械時間はA24時間、B16時間です。仕上の作業時間はA12時間、B18時間でした。切削は64,000円を40機械時間で割り、1機械時間当たり1,600円。仕上は60,000円を30作業時間で割り、1作業時間当たり2,000円になります。ここで求めたのは、製造間接費を分けるための率です。作業員に払う賃金の時間単価は、この資料からは分かりません。

<figure id="cb2-department-cost-route-product"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="cb2-department-cost-route-product-caption"><table><thead><tr><th scope="col">部門</th><th scope="col">費用総額</th><th scope="col">Aの基準量</th><th scope="col">Bの基準量</th><th scope="col">率</th><th scope="col">Aの負担</th><th scope="col">Bの負担</th></tr></thead><tbody><tr><th scope="row">切削</th><td>64,000円</td><td>機械24時間</td><td>機械16時間</td><td>1,600円/機械時間</td><td>38,400円</td><td>25,600円</td></tr><tr><th scope="row">仕上</th><td>60,000円</td><td>作業12時間</td><td>作業18時間</td><td>2,000円/作業時間</td><td>24,000円</td><td>36,000円</td></tr><tr><th scope="row">計</th><td>124,000円</td><td>―</td><td>―</td><td>―</td><td>62,400円</td><td>61,600円</td></tr></tbody></table></div><figcaption id="cb2-department-cost-route-product-caption">率と負担額を部門ごとに表にします。切削に機械時間、仕上に作業時間を使う指定です。</figcaption></figure>

製品Aの切削分は24×1,600＝38,400円、仕上分は12×2,000＝24,000円です。円に直してから足すので、Aの負担額は62,400円。Bは25,600＋36,000＝61,600円です。A・Bの計124,000円は、部門の合計64,000＋60,000円に戻ります。この検算で製造側の費用の配り残しは見つけられます。仕上の資料を切削に使ったような誤りは、元の記録と照らし合わせて見つけます。

もし製品Bが切削工程を通らなければ、Bの切削時間は0です。切削をAだけが使い、ほかに負担する製品がない条件では、切削の費用はAが全額負担します。Bが仕上工程を使うなら、Bは仕上の分を負担します。基準量がゼロのときは、その製品か部門全体かを区別してください。部門全体の基準量がゼロの場合、この割り算では率が求められません。

### 直接費を加え、完成した製品の個数で割る

製品Aには57,600円、Bには38,400円の製品別直接費があります。最初から製品ごとに分かっているため、製造間接費を分ける表には入れていません。各製品の直接費に先ほどの負担額を一度だけ足すと、Aは120,000円、Bは100,000円です。月初の仕掛品と製品はなく、当月の製造はすべて完成したとします。A100個、B80個がそれぞれ同じ条件で完成した場合、<a class="lesson-term" data-lesson-term href="#lesson-term-unit-cost">単位原価</a>はA1,200円/個、B1,250円/個になります。

ここで使うのは完成数量です。Aを70個しか売らなかった月でも、120,000円は完成した100個にかかった金額なので、70個で割りません。70個分の84,000円を売上原価にし、残る30個分の36,000円は月末製品の原価として残します。

<figure id="cb2-department-cost-route-sold"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="cb2-department-cost-route-sold-caption"><table><thead><tr><th scope="col">内訳</th><th scope="col">製品A</th><th scope="col">製品B</th><th scope="col">合計</th></tr></thead><tbody><tr><th scope="row">直接費</th><td>57,600円</td><td>38,400円</td><td>96,000円</td></tr><tr><th scope="row">配賦された製造間接費</th><td>62,400円</td><td>61,600円</td><td>124,000円</td></tr><tr><th scope="row">完成した原価</th><td>120,000円</td><td>100,000円</td><td>220,000円</td></tr><tr><th scope="row">完成数量</th><td>100個</td><td>80個</td><td>―</td></tr><tr><th scope="row">単位原価</th><td>1,200円/個</td><td>1,250円/個</td><td>―</td></tr><tr><th scope="row">販売数量</th><td>70個</td><td>60個</td><td>―</td></tr><tr><th scope="row">売上原価</th><td>84,000円</td><td>75,000円</td><td>159,000円</td></tr><tr><th scope="row">月末製品原価</th><td>36,000円</td><td>25,000円</td><td>61,000円</td></tr></tbody></table></div><figcaption id="cb2-department-cost-route-sold-caption">完成した原価を販売分と月末製品に分け、売上原価だけを売上高と対応させます。</figcaption></figure>

<section class="guided-lesson" id="guided-department-route-product" aria-labelledby="guided-department-route-product-title">
<h3 id="guided-department-route-product-title">途中で確認　部門の率から製品Aの負担を求める</h3>
<p id="guided-department-route-product-prompt">切削の製造間接費32,000円を機械時間A18・B22時間で、仕上の36,000円を作業時間A16・B8時間で分けます。Aの製造間接費の合計はいくらですか。</p>
<form data-guided-practice data-expected="38400" data-guided-hint="切削は40機械時間、仕上は24作業時間を分母にします。Aの二つの負担額は、円にしてから合計します。" aria-labelledby="guided-department-route-product-title" aria-describedby="guided-department-route-product-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>練習の答え</legend>
<label for="guided-department-route-product-input">答え（円）</label> <input id="guided-department-route-product-input" name="answer" aria-describedby="guided-department-route-product-prompt" class="guided-number" type="text" inputmode="numeric" enterkeyhint="done" maxlength="18" autocomplete="off">
<div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details>
<summary>解答と考え方を読む</summary>
<p data-guided-solution>切削は32,000÷40＝800円/機械時間で、Aは800×18＝14,400円です。仕上では36,000÷24＝1,500円/作業時間でAは24,000円。Aの合計は38,400円です。</p>
</details>
</section>

<span id="objective-3"></span>

## 部門の使い方が変わると、在庫に残る金額も変わる

配賦の総額を確かめた後は、製品A・Bに分けた原価が、その月の損益へどのように入るかを調べます。売った製品に対応する金額は売上原価に入り、売っていない製品の分は在庫に残ります。販売部門へ配った家賃は在庫へ進まず、その月の販管費です。したがって、製造部門と販売部門の間で費用の分類が変わったときは、営業利益まで計算をやり直します。

<span id="worked-3"></span>

### 例題3　仕上の10㎡を販売部門で使っていた

製品の売価はAが2,300円、Bが2,500円です。販売数量は表のとおりA70個、B60個。売上高は161,000＋150,000＝311,000円です。家賃とは別に、店頭で当月にかかった販売費が12,000円あります。以上のほかに売上や費用はありません。

最初の資料では、売上原価159,000円を引くと売上総利益が152,000円です。販管費は販売部門の家賃18,000円と販売費12,000円で30,000円。営業利益は122,000円になります。

その後、建物の当月の使用記録で、仕上部門の30㎡としていたうち10㎡は販売部門が使っていたと分かりました。家賃の請求額と建物全体の面積、当月の機械時間、作業時間、直接費、販売費、製品の完成・販売数量は変わりません。変わるのは各部門が使った面積です。

面積の合計は120㎡のままなので、600円/㎡は同じです。新しい面積は切削60㎡、仕上20㎡、販売40㎡。家賃はそれぞれ36,000円、12,000円、24,000円です。切削の製造間接費は64,000円のままですが、仕上は42,000＋12,000＝54,000円になります。仕上の新しい率は54,000÷30＝1,800円/作業時間です。

仕上の負担はA12×1,800＝21,600円、B18×1,800＝32,400円です。切削分を合わせた製造間接費はA60,000円、B58,000円になります。直接費を加えた完成原価はA117,600円、B96,400円。単位原価はA1,176円、B1,205円です。販売分はA70×1,176＝82,320円、B60×1,205＝72,300円で、合わせて154,620円。月末製品はA35,280円、B24,100円なので、59,380円残ります。

<figure id="cb2-department-cost-route-correction"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="cb2-department-cost-route-correction-caption"><table><thead><tr><th scope="col">段階</th><th scope="col">訂正前</th><th scope="col">訂正後</th></tr></thead><tbody><tr><th scope="row">切削・仕上・販売の面積</th><td>60・30・30㎡</td><td>60・20・40㎡</td></tr><tr><th scope="row">切削・仕上・販売の家賃</th><td>36,000・18,000・18,000円</td><td>36,000・12,000・24,000円</td></tr><tr><th scope="row">A・Bの完成した原価</th><td>120,000・100,000円</td><td>117,600・96,400円</td></tr><tr><th scope="row">売上原価の合計</th><td>159,000円</td><td>154,620円</td></tr><tr><th scope="row">月末製品原価の合計</th><td>61,000円</td><td>59,380円</td></tr><tr><th scope="row">販管費の合計</th><td>30,000円</td><td>36,000円</td></tr><tr><th scope="row">営業利益</th><td>122,000円</td><td>120,380円</td></tr></tbody></table></div><figcaption id="cb2-department-cost-route-correction-caption">面積の訂正を反映した原価。各部門の固有費と作業時間は最初の資料のままです。</figcaption></figure>

訂正後の売上総利益は311,000−154,620＝156,380円です。販管費は家賃24,000円と販売費12,000円で36,000円。営業利益は120,380円になります。売上原価は4,380円減りましたが、販管費は6,000円増えたため、営業利益は1,620円減ります。製造費用から販売費用へ移した6,000円のうち、以前は1,620円が売れ残った製品に含まれていました。移動後は全額が当月の費用に入ります。

### 金額を二つの方向から確かめる

まず集計した費用は、訂正前が完成原価220,000円＋販管費30,000円、訂正後が完成原価214,000円＋販管費36,000円で、どちらも250,000円です。同じ支出を配り直しただけなので、費用と在庫に向かう金額を全部足せば変わりません。

次に、その250,000円を販売分と在庫に分けます。訂正後の売上原価154,620円、販管費36,000円、月末製品原価59,380円の合計も250,000円です。月初在庫や未完成品がなく、売上高も変わらないため、この例では月末製品原価の減少1,620円が、営業利益の減少額に一致します。全部売れて月末製品がなければ、この条件の下で配り直しによる営業利益の差はなくなります。その場合も、製品別原価や売上総利益の表示は変わります。

<span id="worked-transfer"></span>

### 例題　部門によって配賦の基準が違う場合の照合

家賃60,000円の建物60㎡を、加工24㎡、仕上18㎡、販売18㎡で使っています。家賃は面積で配賦します。加工部門には他に部門固有費6,000円、仕上部門には12,000円があります。加工の費用は機械時間、仕上の費用は人の作業時間で製品P・Qへ分けるとします。

| 部門 | 家賃の負担額 | 製品へ配賦する額 | P・Qの基準量 |
| --- | ---: | ---: | --- |
| 加工 | 24,000円 | 30,000円 | P30機械時間、Q20機械時間 |
| 仕上 | 18,000円 | 30,000円 | P10作業時間、Q30作業時間 |
| 販売 | 18,000円 | 製品への配賦なし | 販管費へ集計 |

加工と仕上には同じ30,000円が集まりましたが、分ける基準は別です。加工では30,000円÷50機械時間＝600円/機械時間、仕上では30,000円÷40作業時間＝750円/作業時間となります。Pは加工18,000円と仕上7,500円で25,500円、Qは加工12,000円と仕上22,500円で34,500円です。両製品の合計60,000円が部門二つの合計に戻り、販売に集めた18,000円は製品に含まれていません。

<details>
<summary>50機械時間と40作業時間を足してもよいか</summary>
<p>この問題では足しません。両方に「時間」が付いていても、測っているものは機械を動かした長さと、人が作業した長さです。それぞれの部門で指定された量を分母にします。製品別の負担を合わせるのは、両方を円に直した後です。</p>
</details>

## 自力演習　使った面積と時間を拾い、訂正の影響を説明する

箱を作る工房で、家賃54,000円を加工40㎡、検査35㎡、販売15㎡へ面積で分けます。固有の製造間接費は加工12,000円、検査19,000円です。加工では機械時間A10時間・B20時間、検査では作業時間A15時間・B10時間を配賦基準とします。直接費はA24,000円、B20,000円。完成はA60個・B50個で、いずれも製品別に同じ原価で完成しています。A45個を各1,800円、B25個を各2,200円で販売しました。販売部門の家賃とは別に、販売費8,000円があります。月初在庫や未完成品はなく、記載以外の費用もありません。

1. 二つの製造部門の率と製品別の単位原価を求めてください。
2. 売上原価、月末製品原価、営業利益を求めてください。
3. 原票の誤記を訂正し、加工の機械時間だけがA12時間・B18時間に変わりました。営業利益はいくらになりますか。費用の合計が変わらないのに、営業利益が変わる理由を説明してください。

<details>
<summary>解答と検算を読む</summary>
<p>家賃を90㎡で割ると600円/㎡。割当額は加工24,000円、検査21,000円、販売9,000円です。加工は36,000÷30＝1,200円/機械時間、検査は40,000÷25＝1,600円/作業時間です。Aの製造間接費は12,000＋24,000＝36,000円、Bは24,000＋16,000＝40,000円。直接費を加えると製品別の完成原価はそれぞれ60,000円で、単位原価はA1,000円、B1,200円です。</p>
<p>売上高は81,000＋55,000＝136,000円、売上原価は45,000＋30,000＝75,000円、月末製品原価は15,000＋30,000＝45,000円です。家賃9,000円と販売費8,000円を合わせた販管費17,000円を売上総利益61,000円から引くと、営業利益は44,000円です。</p>
<p>訂正後も機械の総時間は30時間なので、加工の率は1,200円のままです。加工の負担額2,400円がBからAへ移ります。Aの完成原価は62,400円で1,040円/個、Bは57,600円で1,152円/個。売上原価は45×1,040＋25×1,152＝75,600円となり、営業利益は43,400円です。負担が増えたAは完成分の4分の3を売り、負担が減ったBは2分の1を売りました。販売割合が異なるため、全体の売上原価は600円増え、月末製品原価は同額減りました。</p>
</details>

## 公式資料で確かめる

この章は、出題範囲にある部門、用途別の費用区分、直課・配賦を一つの資料で練習する当サイトの例です。部門を経由する配賦を独立した本試験項目と位置づけず、ここで指定した面積や時間の使い方を学びます。販売分と在庫の詳しい読み方は、[完成品と月末製品の計算](../cb2-finished/)で確かめられます。

- [日本商工会議所「原価計算初級　出題範囲・内容」](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30genkashokyu.pdf) の1（2）・（4）、3（1）〜（3）
- [日本商工会議所「簿記 出題区分表」](https://www.kentei.ne.jp/bookkeeping/exam-list) の2026年度適用範囲と[2027年度確定版](https://www.kentei.ne.jp/bookkeeping/35697-2)。2026年11月16日確認
