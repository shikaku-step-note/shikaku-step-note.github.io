---
{
  "stableId": "ip-regression-residuals",
  "qualification": "it-passport",
  "title": "回帰分析の読み方：予測値・残差・最小二乗法",
  "description": "ITパスポートで扱う回帰分析を、式の単位、予測値と残差の計算、最小二乗法の考え方、外挿の注意から学びます。",
  "order": 26,
  "minutes": 90,
  "sample": false,
  "updated": "2026-11-16",
  "unit": 13,
  "syllabus": [
    34
  ],
  "objectives": [
    "説明変数・目的変数と単位から回帰直線の予測を読む",
    "残差と二乗和で同じ実測データに対する予測式を比較する",
    "観測範囲や作業条件から予測を使える場面と追加調査を判断する"
  ],
  "prerequisite": "「確率・統計とデータの読み方」で平均、グラフ、相関と因果を学んでから進みます。回帰の式はこの章で読み直します。",
  "keywords": [
    "ITパスポート 回帰分析",
    "残差 計算",
    "最小二乗法",
    "相関 回帰 違い",
    "外挿",
    "予測値"
  ],
  "glossary": [
    {
      "term": "回帰直線",
      "definition": "一方の値を使って他方の値を予測するために、観測したデータに当てはめた直線。"
    },
    {
      "term": "残差",
      "definition": "実測値から予測値を引いた差。この章では、正なら予測が実測より低かったことを示します。"
    },
    {
      "term": "最小二乗法",
      "definition": "この章の例では、各点での残差を二乗して足した値が最も小さくなるように、回帰直線を当てはめる方法。"
    },
    {
      "term": "外挿",
      "definition": "観測した説明変数の範囲を外れて予測すること。範囲内で成り立った関係が続くかを別に確認します。"
    }
  ],
  "inlineGlossary": [
    {
      "id": "prediction-line",
      "term": "回帰直線",
      "definition": "一方の値を使って他方の値を予測するために、観測したデータに当てはめた直線。"
    },
    {
      "id": "prediction-residual",
      "term": "残差",
      "definition": "実測値から予測値を引いた差。この章では、正なら予測が実測より低かったことを示します。"
    },
    {
      "id": "least-squares",
      "term": "最小二乗法",
      "definition": "この章の例では、各点での残差を二乗して足した値が最も小さくなるように、回帰直線を当てはめる方法。"
    },
    {
      "id": "extrapolation",
      "term": "外挿",
      "definition": "観測した説明変数の範囲を外れて予測すること。範囲内で成り立った関係が続くかを別に確認します。"
    }
  ]
}
---

## 回帰分析では、何から何を予測するかを決める

受付票の数が多い日には、入力作業が長くなる傾向が見られるかもしれません。二つの値が一緒に増減する傾向を調べるのが相関分析です。これに対し、受付票が10件と分かったときに何分を見込むかを計算できる形にするのが回帰分析です。相関の強さだけでは、具体的な予測時間は求まりません。

予測に使う値を説明変数、予測したい値を目的変数と呼びます。この章では受付票の件数を横軸に、作業時間を縦軸に取ります。同じ日の二つの値を一組にして点を打つと、散布図になります。データの点の間を通るように当てはめた直線が<a class="lesson-term" data-lesson-term href="#lesson-term-prediction-line">回帰直線</a>です。観測のばらつきがあれば、すべての点が直線の上に載るとは限りません。

<span id="regression-reading"></span>

## 切片と傾きを単位で読む

予測式を「時間（分）＝14＋2×受付票の件数」とします。14は横軸が0のときの予測値で、切片と呼ばれます。受付票が1件増えるごとに、式の右辺は2分増えます。この変化を表す傾きの単位は分/件です。8件を代入すると14＋2×8＝30分。8を作業時間に代入して件数を求める式ではないので、先にどちらの値が与えられたかを確かめましょう。

観測した件数が4〜12件なら、0件の日の実際の準備時間が14分だと、この式だけから確認することはできません。切片は直線を決める数値です。実際の準備作業と一致するかは、0件の日の記録や作業手順を調べて判断します。

<figure id="ip-regression-residuals-scatter"><svg viewBox="0 0 360 225" width="360" height="225" style="max-width:100%;height:auto" role="img" aria-label="横軸は受付票の数、縦軸は作業時間。8件で式Aの直線は30分、実測の点は28分。実測から予測を引いた残差はマイナス2分"><path d="M40 20v152h264" fill="none" stroke="currentColor"/><path d="M52 140L280 32" fill="none" stroke="currentColor" stroke-width="2"/><g fill="currentColor"><circle cx="90" cy="117.5" r="4"/><circle cx="166" cy="95" r="4"/><circle cx="242" cy="45.5" r="4"/><text x="4" y="15" font-size="14">時間（分）</text><text x="208" y="201" font-size="14">受付票（件）</text><text x="153" y="189" font-size="14">8</text><text x="174" y="75" font-size="14">予測 30分</text><text x="175" y="113" font-size="14">実測 28分</text></g><path d="M166 86v86" stroke="currentColor" stroke-dasharray="4 4"/></svg><figcaption>同じ横軸の位置で観測点と回帰直線を比較します。図は関係を示す模式図です。計算には表の正確な値を使います。</figcaption></figure>

<span id="regression-fit"></span>

## 予測との差を計算し、当てはまりを比べる

8件の日に実際は28分で終わったとします。実測値28から予測値30を引くと−2分です。この差が<a class="lesson-term" data-lesson-term href="#lesson-term-prediction-residual">残差</a>で、負なら予測したより早く終わったことが分かります。正の残差なら、実際の方が長くかかったことを表します。差を引く向きをそろえると、どちらにずれたかを比較できます。

見本の式Aを14＋2×件数、式Bを20＋1×件数とし、4、8、12件の3日で比較します。各日について式に件数を代入してから、残差を求めます。

<figure id="ip-regression-residuals-model-comparison"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="ip-regression-residuals-model-comparison-caption"><table><thead><tr><th scope="col">受付票（件）</th><th scope="col">実測</th><th scope="col">式A 予測</th><th scope="col">式A 残差</th><th scope="col">式B 予測</th><th scope="col">式B 残差</th></tr></thead><tbody><tr><th scope="row">4</th><td>23</td><td>22</td><td>1</td><td>24</td><td>-1</td></tr><tr><th scope="row">8</th><td>28</td><td>30</td><td>-2</td><td>28</td><td>0</td></tr><tr><th scope="row">12</th><td>39</td><td>38</td><td>1</td><td>32</td><td>7</td></tr></tbody></table></div><figcaption id="ip-regression-residuals-model-comparison-caption">同じ3日の実測値に対して式AとBの残差を計算します。すべての時間と残差は分です。</figcaption></figure>

式Aの残差の合計は1−2＋1＝0分ですが、予測が毎日正しかったわけではありません。正と負の差は足すと打ち消し合うため、差の大きさを比較する目的には、残差を二乗してから合計します。Aの二乗和は1²＋(−2)²＋1²＝6分²。Bは(−1)²＋0²＋7²＝50分²です。この3日の同じ実測値に照らすと、二乗和はAの方が小さくなります。

この基準を使い、候補の直線全体から二乗和が最も小さくなるよう式を求める方法が<a class="lesson-term" data-lesson-term href="#lesson-term-least-squares">最小二乗法</a>です。ここでは与えられた二つの式を比較しました。本当に最小かはほかの直線も含めて決まります。二乗すると大きな残差の影響が強くなるので、外れた日を見つけたら入力ミスか、特別な条件で実際に起きたことかを確かめます。

<span id="regression-conditions"></span>

## 予測式を作った日と、これから使う日を分ける

同じデータで式を作って当てはまりを確認しても、別の日に当たるとは限りません。10件で34分と出る場合でも、普段の受付人数と、応援を置いた日の受付人数が違えば、実測は変わり得ます。予測式を使う前に、別の日の観測を用意し、ずれの向きが条件によって変わるかを調べます。

<figure id="ip-regression-residuals-new-days"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="ip-regression-residuals-new-days-caption"><table><thead><tr><th scope="col">利用状況</th><th scope="col">受付票（件）</th><th scope="col">実測（分）</th><th scope="col">式A 予測（分）</th><th scope="col">残差（分）</th></tr></thead><tbody><tr><th scope="row">通常週・別の日</th><td>10</td><td>35</td><td>34</td><td>1</td></tr><tr><th scope="row">臨時窓口あり</th><td>10</td><td>27</td><td>34</td><td>-7</td></tr><tr><th scope="row">大きな催しの日</th><td>30</td><td>102</td><td>74</td><td>28</td></tr></tbody></table></div><figcaption id="ip-regression-residuals-new-days-caption">式を作った3日とは異なる日の記録。式Aの当てはまりと、運用条件の違いを一緒に見ます。</figcaption></figure>

10件の日を予測するのは観測した4〜12件の範囲内ですが、30件の日の予測は<a class="lesson-term" data-lesson-term href="#lesson-term-extrapolation">外挿</a>です。式には30を入れられても、催しの日は受付窓口や仕事の進め方が変わるかもしれません。受付票が多いときだけ作業が並行になる仕組みなら、同じ傾きで時間が増えると考える根拠も弱くなります。

範囲内かどうかと、作業条件がそろうかどうかは別々に点検します。臨時窓口がある日の10件は件数の範囲内でも、通常日と同じ予測式を使える根拠を要します。残差が臨時窓口のある日に偏っていれば、条件を分けて観測する理由になります。受付票の数と所要時間が同時に増えることから、件数だけが時間を変えたとまでは判断できません。

<section class="guided-lesson" id="guided-ip-regression-residuals" aria-labelledby="ip-regression-residuals-guided-title">
<h2 id="ip-regression-residuals-guided-title">途中で確認　予測が何分ずれたか</h2>
<p id="ip-regression-residuals-guided-prompt">上の式Aで受付票が6件の場合、まず予測時間を計算します。実測が29分だったときの残差だけを、分の数字で入力してください。</p>
<form data-guided-practice data-expected="3" data-guided-hint="予測は14に2×6を足した26分です。実測から予測を引きます。" aria-labelledby="ip-regression-residuals-guided-title" aria-describedby="ip-regression-residuals-guided-prompt" data-lesson-screen-only>
<fieldset hidden><legend>自分で答える</legend><label for="ip-regression-residuals-guided-answer">答え（分）</label><input class="guided-number" type="text" inputmode="numeric" id="ip-regression-residuals-guided-answer" autocomplete="off"><button type="submit" class="button secondary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></fieldset>
<p role="status" data-guided-feedback></p></form>
<details><summary>答えと確認方法を読む</summary><p data-guided-solution>予測は14＋12＝26分。本章の残差は実測−予測なので29−26＝3分です。正なので、実際は予測よりも3分長くかかりました。</p></details>
</section>

## 総合演習　式が当たった理由と採用条件を説明する

社内研修の準備時間を、参加人数から予測します。実測は、5人で23分、7人で24分、9人で35分。式Cは「時間＝8＋3×人数」、式Dは「時間＝17＋2×人数」です。①各式の残差の二乗和を比べ、②25人の外部会場で使うときに何を確認すべきか説明してください。

<details><summary>解答と検算を読む</summary><p>Cの予測は23、29、35分。残差は0、−5、0分で、二乗和は25分²です。Dの予測は27、31、35分。残差は−4、−7、0分で、二乗和は16＋49＝65分²です。今回の3件ではCがよく当てはまります。25人は観測した5〜9人を外れ、外部会場という条件も異なります。会場までの移動が作業時間に含まれるか、準備が分担できるかを確かめ、新しい条件で観測した記録で予測を検証します。</p></details>

## 参考資料

- [IPA「ITパスポート試験」シラバス Ver.6.5（項目34 応用数学、項目2 業務分析・データ利活用）](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf)

- [IPA 令和6年度公開問題・問14](https://www3.jitec.ipa.go.jp/JitesCbt/html/openinfo/pdf/questions/2024r06_ip_qs.pdf) は予測の目的から手法を選ぶ例です。

- [総務省統計局 データ・スタート「相関と回帰」](https://www.stat.go.jp/dstart/point/seminar/02/3-3-2.html)・[「複数の変数の関係性を見る」](https://www.stat.go.jp/naruhodo/10_tokucho/hukusu.html)。2026年11月16日確認。例題では当てはめの考え方を扱い、直線を求める公式の導出は省きます。
