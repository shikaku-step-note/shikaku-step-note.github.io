---
{"stableId":"cb2-inventory-cutoff","qualification":"cost-beginner","title":"月をまたぐ在庫原価：仕掛品・製品・売上原価を照合する","description":"原価計算初級の月末在庫を翌月の月初につなぎ、完成原価・売上原価・営業利益への影響を、二か月の表と入力式演習で確かめます。","order":21,"minutes":90,"sample":false,"updated":"2026-11-16","unit":3,"objectives":["仕掛品と製品を別々に繰り越し、二か月の完成原価と売上原価を求める","完成日の訂正で移る金額と、その月の費用に残る金額を区別する","販売月の訂正を売上・売上原価・利益に反映し、原票を使って検算する"],"prerequisite":"月末仕掛品・月末製品、製品別の月次損益計算書を読んでから進みます。この章では月ごとの原価の移動を計算し直します。","keywords":["原価計算初級 月末仕掛品","月初 月末 製品","完成原価 売上原価 違い","月次 損益 誤り 訂正","繰越 原価"],"glossary":[],"inlineGlossary":[{"id":"period-carryover","term":"繰越額","definition":"月末に残った資産を翌月の初めに引き継ぐ金額。この章では仕掛品と完成済み製品を分けて引き継ぎます。"},{"id":"finished-cost","term":"完成原価","definition":"その月に完成して、仕掛品から製品へ移した原価の合計。前月までに作りかけにかかった額を含むこともあります。"},{"id":"matched-cogs","term":"売上原価","definition":"その月の売上に対応する製品の原価。完成した時点の在庫の振替とは別に、販売した分を費用にします。"},{"id":"period-cutoff","term":"締め日","definition":"その月の記録に含める仕事や販売を区切る日。資料の入力日よりも、完了や販売がいつ起きたかを、この章の条件に従って確認します。"}],"scopeLabel":"原価計算初級 3(2) 在庫の原価、3(3) 製品別（サービス別）の損益計算書","subject":"cost","syllabus":[3]}
---

## 前月の残高と、当月に使った原価を分ける

月末に仕事が途中なら、そこまでに使った材料や作業の金額は仕掛品に残ります。仕事が終わっていても販売していなければ、原価は製品に残ります。この二つを翌月の初めに引き継いだ金額が<a class="lesson-term" data-lesson-term href="#lesson-term-period-carryover">繰越額</a>です。前月から持っている在庫の原価を、当月に新たに使った材料や作業としてもう一度足すと、同じ原価を重ねて数えます。

当月の記録では、まず仕掛品にある原価を「完成した分」と「まだ仕掛品に残る分」に分けます。そのうち<a class="lesson-term" data-lesson-term href="#lesson-term-finished-cost">完成原価</a>だけを製品の集計に渡します。製品の集計では、その月に売れた分の<a class="lesson-term" data-lesson-term href="#lesson-term-matched-cogs">売上原価</a>と、まだ売れていない分を分けるという順序です。

<span id="objective-1"></span>
<span id="worked-1"></span>
<span id="cost-cutoff-two-months"></span>

## 二つの残高から、当月に動いた金額を求める

6月と7月で、工房が作る器具の在庫を確認します。この章では仕事ごとの金額と月末の区分を、原価表と作業の記録から読み取ります。

<figure id="cb2-inventory-cutoff-baseline"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="cb2-inventory-cutoff-baseline-caption"><table><thead><tr><th scope="col">項目</th><th scope="col">6月</th><th scope="col">7月</th></tr></thead><tbody><tr><th scope="row">月初仕掛品</th><td>0</td><td>30,000</td></tr><tr><th scope="row">当月製造費用</th><td>180,000</td><td>170,000</td></tr><tr><th scope="row">月末仕掛品</th><td>30,000</td><td>20,000</td></tr><tr><th scope="row">月初製品</th><td>20,000</td><td>50,000</td></tr><tr><th scope="row">月末製品</th><td>50,000</td><td>40,000</td></tr><tr><th scope="row">売上高</th><td>220,000</td><td>295,000</td></tr><tr><th scope="row">販売費及び一般管理費</th><td>34,000</td><td>40,000</td></tr></tbody></table></div><figcaption id="cb2-inventory-cutoff-baseline-caption">ひかり器具工房の6月・7月の当初資料。金額はすべて円です。7月の月初欄は6月の月末欄を引き継いでいます。</figcaption></figure>

6月は月初の仕掛品0円に当月製造費用180,000円を加えます。月末に30,000円残ったので、完成したのは150,000円分です。製品には前月に完成した20,000円分もあります。合わせた170,000円のうち、月末製品は50,000円。6月の売上原価は120,000円となります。売上220,000円との差100,000円が売上総利益で、販売費及び一般管理費34,000円を引くと、営業利益66,000円です。

7月は仕掛品30,000円に、その月の製造費用170,000円を足し、月末仕掛品20,000円を引くので、完成原価は180,000円。前月から引き継いだ製品50,000円を加え、7月末に残った40,000円を引くと、売上原価は190,000円です。売上総利益105,000円から販売費及び一般管理費40,000円を引き、営業利益65,000円となります。

6月末の二つの残高を横へ写すと、7月初めの二つの残高と一致します。一方、7月の製造費用は7月の消費の記録から集めます。繰越額と新たな動きを同じ欄に記録しないことで、どちらから来た金額かを確認できます。

<span id="objective-2"></span>
<span id="worked-2"></span>
<span id="cost-cutoff-finished"></span>

## 完成日だけが変わると、在庫の内訳が移る

6月30日に原価12,000円の一組が完成しました。ただし完了票を入力したのは7月1日で、当初の表では7月に完成した扱いです。売れたのは7月10日と確認できています。この設例では完了の事実が記録された日付を使います。<a class="lesson-term" data-lesson-term href="#lesson-term-period-cutoff">締め日</a>を確かめるときは、入力日の欄だけでなく、完了票が示す実際の完了日も読みます。

6月には12,000円を仕掛品から製品へ移します。月末仕掛品は18,000円へ減り、月末製品は62,000円へ増えます。この一組は6月中に売れていないので、6月の売上原価に加えません。完成原価が12,000円増えた分と、月末製品が12,000円増えた分は、売上原価の計算で互いに打ち消し合います。

<figure id="cb2-inventory-cutoff-transfer"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="cb2-inventory-cutoff-transfer-caption"><table><thead><tr><th scope="col">行</th><th scope="col">6月 当初 → 訂正</th><th scope="col">7月 当初 → 訂正</th></tr></thead><tbody><tr><th scope="row">月初仕掛品</th><td>0 → 0</td><td>30,000 → 18,000</td></tr><tr><th scope="row">月末仕掛品</th><td>30,000 → 18,000</td><td>20,000 → 20,000</td></tr><tr><th scope="row">完成原価</th><td>150,000 → 162,000</td><td>180,000 → 168,000</td></tr><tr><th scope="row">月初製品</th><td>20,000 → 20,000</td><td>50,000 → 62,000</td></tr><tr><th scope="row">月末製品</th><td>50,000 → 62,000</td><td>40,000 → 40,000</td></tr><tr><th scope="row">売上原価</th><td>120,000 → 120,000</td><td>190,000 → 190,000</td></tr></tbody></table></div><figcaption id="cb2-inventory-cutoff-transfer-caption">原価12,000円の一組を6月完了に訂正した後の金額。使用した製造費用や販売日は同じです。</figcaption></figure>

7月では反対の動きが起きます。7月の初めに仕掛品として持っていた12,000円分は、すでに製品へ移っています。そのため7月の完成原価が12,000円減る一方、7月初めの製品が12,000円増えます。7月に売ったという事実は変わらないので、売上原価190,000円も変わりません。製品と仕掛品を合算した残高だけを見ても、この誤りは見つかりません。

<span id="objective-3"></span>
<span id="worked-3"></span>
<span id="cost-cutoff-sale"></span>

## 販売日を訂正するときは、売上と対応する原価を一緒に移す

先の訂正とは別に、6月中にすでに完成していた別の一組を考えます。売価13,000円、原価8,000円です。設例では顧客への引渡日を販売日とします。7月1日販売と記録されていましたが、引渡票では6月30日と分かりました。販売費及び一般管理費などは変わらないものとします。

6月へ売上13,000円と原価8,000円を移します。6月末の製品は8,000円減るため、7月初めの製品も8,000円減ります。売上13,000円を戻すだけでは、売上に対応する原価の月が一致しません。6月の営業利益は差額5,000円増え、7月の営業利益は同額減ります。

<figure id="cb2-inventory-cutoff-sale-change"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="cb2-inventory-cutoff-sale-change-caption"><table><thead><tr><th scope="col">項目</th><th scope="col">6月 当初 → 訂正</th><th scope="col">7月 当初 → 訂正</th></tr></thead><tbody><tr><th scope="row">売上高</th><td>220,000 → 233,000</td><td>295,000 → 282,000</td></tr><tr><th scope="row">月末製品</th><td>50,000 → 42,000</td><td>40,000 → 40,000</td></tr><tr><th scope="row">売上原価</th><td>120,000 → 128,000</td><td>190,000 → 182,000</td></tr><tr><th scope="row">売上総利益</th><td>100,000 → 105,000</td><td>105,000 → 100,000</td></tr><tr><th scope="row">営業利益</th><td>66,000 → 71,000</td><td>65,000 → 60,000</td></tr></tbody></table></div><figcaption id="cb2-inventory-cutoff-sale-change-caption">当初資料から販売日だけを訂正した場合。完成日の訂正はここでは行いません。</figcaption></figure>

二か月分の営業利益を足すと、どちらの集計でも131,000円です。同じ二か月内で移したため、合計は変わりません。それでも6月と7月を別々に評価する資料では訂正が必要です。金額が一致するかに加え、完了票と引渡票が指す日付まで調べると、何を動かすべきか判断できます。

<section class="guided-lesson" id="guided-cb2-inventory-cutoff" aria-labelledby="cb2-inventory-cutoff-guided-title">
<h2 id="cb2-inventory-cutoff-guided-title">途中で確認　売上と原価を同じ月へ移す</h2>
<p id="cb2-inventory-cutoff-guided-prompt">ある組の売上18,000円、対応する原価11,000円を、後の月から一つ前の月へ移します。販売費及び一般管理費は変わりません。前の月の営業利益は何円増えますか。</p>
<form data-guided-practice data-expected="7000" data-guided-hint="増える売上から、同じ月に増える売上原価を引きます。" aria-labelledby="cb2-inventory-cutoff-guided-title" aria-describedby="cb2-inventory-cutoff-guided-prompt" data-lesson-screen-only>
<fieldset hidden><legend>自分で答える</legend><label for="cb2-inventory-cutoff-guided-answer">答え（円）</label><input class="guided-number" type="text" inputmode="numeric" id="cb2-inventory-cutoff-guided-answer" autocomplete="off"><button type="submit" class="button secondary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></fieldset>
<p role="status" data-guided-feedback></p></form>
<details><summary>答えと確認方法を読む</summary><p data-guided-solution>18,000円から11,000円を引いた7,000円です。後の月は7,000円減ります。売上だけを振り替えると増加額を18,000円と誤ります。</p></details>
</section>

<span id="cost-cutoff-missing-cost"></span>

## 投入した原価そのものが別の月へ入っていたとき

完了日の訂正では、すでに集めた原価の行き先だけを変えました。ところが、材料費の記録が一か月遅れた場合には、仕掛品に集める当月製造費用から直します。何を訂正するかは、どの仕事がいつ終わったかだけでなく、費用の記録がどこで抜けたかで決まります。

別の工房の当初集計では、8月の月初仕掛品14,000円、当月製造費用61,000円、月末仕掛品20,000円でした。月初製品は18,000円、月末製品は24,000円です。9月の製造費用は78,000円、月末仕掛品は16,000円、月末製品は29,000円でした。月初の在庫はそれぞれ前月末から引き継いでいます。

材料の払出し票と製品別の原価表を照らすと、6,000円分は8月に使い、同じ月に完成して販売した一組に属していました。製造費用だけが9月へ入っています。倉庫へ返品した材料はありません。売上高、販管費、他の在庫の原価は正しいものとします。訂正の出発点は、材料を使ったことを示す払出し票です。

8月の完成原価は当初の14,000＋61,000−20,000＝55,000円から、61,000円へ増えます。この組は売れているため、8月末の製品24,000円は変わりません。売上原価は当初の18,000＋55,000−24,000＝49,000円から、55,000円へ増えます。9月の製造費用は72,000円に減り、完成原価は20,000＋72,000−16,000＝76,000円。売上原価は24,000＋76,000−29,000＝71,000円です。

<figure id="cost-cutoff-missing-cost-figure"><div class="table-scroll" role="region" tabindex="0" aria-labelledby="cost-cutoff-missing-cost-caption"><table><thead><tr><th scope="col">記録する項目</th><th scope="col">8月の当初 → 訂正</th><th scope="col">9月の当初 → 訂正</th></tr></thead><tbody><tr><th scope="row">当月製造費用</th><td>61,000 → 67,000</td><td>78,000 → 72,000</td></tr><tr><th scope="row">完成原価</th><td>55,000 → 61,000</td><td>82,000 → 76,000</td></tr><tr><th scope="row">売上原価</th><td>49,000 → 55,000</td><td>77,000 → 71,000</td></tr><tr><th scope="row">営業利益</th><td>30,000 → 24,000</td><td>35,000 → 41,000</td></tr></tbody></table></div><figcaption id="cost-cutoff-missing-cost-caption">単位は円。売上高と販管費は8月が94,000円・15,000円、9月が130,000円・18,000円です。</figcaption></figure>

8月は売上高が変わらず売上原価が6,000円増えたので、営業利益も6,000円減ります。9月はその反対です。払出し票が8月の日付でも、完成品が8月に売れたかまでは分かりません。完了票と引渡票で行き先を追ってから、在庫に残す額を決めます。この組を9月に売った場合は、8月に費用を加えても、増えた原価は8月末の製品に残ります。その場合、販売月まで原価を費用にしません。

別の例で、製品にはすでに費用が入っていて、訂正対象が完了日の記録だけなら、この手順で製造費用を改めて移す必要はありません。表の一致を調べた後、払出し、完了、引渡しのうち、どの事実のどの日付が違ったかを一行ずつ確認します。二か月合計では相殺される金額でも、個々の月の損益を使う以上は訂正が必要です。

## 自分で解く　どの資料がどの金額を動かすか

別の月で、作りかけに含まれていた9,000円の組が月末に完成していたと分かりました。翌月に販売したと記録され、根拠の引渡票も翌月を示しています。もう一つの組は完成日の記録が正しく、原価6,500円、売価10,500円ですが、引渡票によると記録より一か月前に売れていました。両方とも、訂正前からこの二か月のどこかに記録されています。①月末の仕掛品・製品間で動く額、②販売の訂正による先月の営業利益の変化、③二か月合計で変わるものを説明してください。販管費などの条件は同じです。

<details><summary>解答と検算を読む</summary><p>①9,000円を仕掛品から製品へ移します。売れた月は変わらないため、この組の売上原価は変わりません。②別の組は売上が10,500円、売上原価が6,500円だけ先月へ移り、先月の営業利益は4,000円増えます。③完成原価と売上・売上原価は二か月の内訳が動きますが、それぞれ二か月合計は変わりません。製品の月末は完成の訂正で9,000円増え、販売の訂正で6,500円減るので、前月末から翌月初めに引き継ぐ製品が差引き2,500円増えます。</p></details>

## 公式資料

- [日本商工会議所「原価計算初級 出題範囲・内容」](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30genkashokyu.pdf) の3(2)・3(3)を2026年11月16日に確認。月をまたぐ訂正は、月末の在庫と売上原価のつながりを練習する独自の題材です。
