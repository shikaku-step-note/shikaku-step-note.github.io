---
{
  "stableId": "ip-reading-business-data",
  "qualification": "it-passport",
  "title": "経営データの読解演習：改善案を数字で選ぶ",
  "description": "母数の異なるデータを比較し、利益と費用の資料を照合して、改善案を選ぶ手順を練習します。",
  "unit": 1,
  "order": 5,
  "minutes": 55,
  "syllabus": [
    2,
    3
  ],
  "prerequisite": "「業務分析・データ利活用」と「会計・財務」のレッスンを先に学びます。",
  "keywords": [
    "分母",
    "利益",
    "固定費",
    "改善案"
  ],
  "objectives": [
    "比較すべき母数を自分で決める",
    "利益の増減を求め、改善案の条件を説明する"
  ],
  "glossary": [],
  "sample": false,
  "updated": "2026-11-20",
  "inlineGlossary": [
    {"id": "comparison-unit", "term": "比較の単位", "definition": "何を一つの観測として数えるかを決めたものです。この例では注文を一件ずつ数えます。"},
    {"id": "denominator", "term": "分母", "definition": "割合を求めるときに割る側の数です。この章の取違い率では、対象となる注文の総数を使います。"},
    {"id": "percentage-point", "term": "パーセントポイント", "definition": "二つの百分率を引いたときの差の単位です。5％から2％への変化は3ポイントの低下です。"},
    {"id": "rate-of-decrease", "term": "減少率", "definition": "どれだけ減ったかを、もとの量に対する割合で示した値です。10件から4件への変化なら、6÷10＝60％です。"},
    {"id": "variable-cost", "term": "変動費", "definition": "仕事の量に応じて変わる費用です。この章では、取違いが減ると不要になる再配送費などを指します。"}
  ],
}
---

## 比較の分母を決める

業務のデータを比べるときは、件数そのものを比べたいのか、一件当たりの起きやすさを知りたいのかを決めます。たとえば取違いの件数には、注文の多さと、注文ごとの取違いの起きやすさの両方が含まれています。注文の多い店は、一件当たりの取違いが少なくても、件数の合計が多くなる場合があります。

次に受ける注文一件当たりの取違いを減らしたいなら、<a class="lesson-term" data-lesson-term href="#lesson-term-comparison-unit">比較の単位</a>を注文一件と定め、取違い件数を対象の注文件数で割ります。割る側の注文数が分母です。対象期間と注文の種類もそろえて計算すると、仕事の量の違いを考慮した率として比べられます。次の表では、同じ月に三店舗が受けた注文と取違いを集計しています。

| 店舗 | 注文件数 | 取違い | 取違い率 |
| --- | ---: | ---: | ---: |
| 東 | 600 | 18 | 3％ |
| 西 | 200 | 10 | 5％ |
| 南 | 400 | 8 | 2％ |

東は取違い件数が最大ですが、率は西が最大です。取違いの発生件数を最も多く減らせる店を選ぶなら、対策の効果と注文数が別途必要です。同じ資料から答えが二つ出たように見えるのは、問いが違うためです。

<figure id="ip-reading-business-data-existing-visual"><svg viewBox="0 0 340 145" width="340" height="145" role="img" aria-label="取違い率の横棒図。東3％、西5％、南2％。同じ尺度で西の棒が最も長い。" style="max-width:100%;height:auto"><g fill="currentColor" font-size="14"><text x="12" y="35">東</text><text x="12" y="74">西</text><text x="12" y="113">南</text><rect x="42" y="18" width="138" height="21" rx="3" opacity=".45"/><rect x="42" y="57" width="230" height="21" rx="3" opacity=".75"/><rect x="42" y="96" width="92" height="21" rx="3" opacity=".45"/><text x="190" y="35">3％</text><text x="282" y="74">5％</text><text x="144" y="113">2％</text></g><path d="M42 12v110" stroke="currentColor"/></svg><figcaption>注文1件当たりの率を同じ尺度で比べます。表の件数順位と図の率順位が異なる点に注目してください。</figcaption></figure>

全店の取違い率は、3％・5％・2％の平均ではありません。全店で36件、注文は1,200件なので、36÷1,200＝3％です。店ごとの率を平均すると各店を同じ重みで扱います。注文ごとの率を求めるときは各注文を同じ重みで扱うため、件数から計算します。

## 改善したときの利益を求める

西店は月200件の注文を受けます。取違いを1件防ぐと、再配送などの<a class="lesson-term" data-lesson-term href="#lesson-term-variable-cost">変動費</a>が1,800円減ります。試行では、見直しにより率が5％から2％へ下がる見込みです。見直しの月額費用は8,000円です。ほかの費用と売上は変わらないとします。

1. 対策前の取違いは200×0.05＝10件です。
2. 対策後の見込みは200×0.02＝4件です。差は月6件です。
3. 費用の削減は6×1,800＝10,800円。対策費を引くと、月2,800円の利益改善です。
4. 必要な削減件数は8,000÷1,800≒4.44件です。実際には件数は整数なので、月5件以上減らせば費用を上回ります。

ありがちな間違いは、5％から2％への変化を「60％減」と計算し、その60％を全注文に掛けることです。60％はもとの取違い件数を基準にした<a class="lesson-term" data-lesson-term href="#lesson-term-rate-of-decrease">減少率</a>です。全注文を基準にするなら差は3<a class="lesson-term" data-lesson-term href="#lesson-term-percentage-point">パーセントポイント</a>です。10×0.60でも200×0.03でも6件となることを確かめます。

## 集計の内訳が変わった場合を考える

次の月に全店の取違い率が下がっても、対策が効いたとはまだ判断できません。注文の構成が変わった可能性があるからです。例えば、複雑な注文では10％、単純な注文では1％と、どちらの率も前月と同じとします。複雑な注文が半数なら全体は5.5％ですが、複雑な注文が2割なら全体は2.8％になります。各種類で改善していなくても全体は下がります。

効果を確認するなら、各店舗を注文種類ごとに分け、対策前後で同じ条件を比べます。注文の種類を見ずに比較した場合は、結論を「集計値が下がった」までにとどめます。予測で導入を判断した場合は、試行後に件数、費用、顧客への影響を改めて確認します。

<span id="ip-reading-business-data-source-reasoning"></span>

## 一店舗ずつ求めた率から、全体の件数へ戻る

率をまとめるときは、何を一つの単位として平均するかを考えます。次の資料は、一週間に受けた注文と、取違いが起きた注文の数です。各注文について一回だけ数え、複数の誤りがあっても取違い注文一件とします。

<figure id="ip-reading-business-data-source-table">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-reading-business-data-source-caption">
<table>
<caption id="ip-reading-business-data-source-caption">一店舗ずつ求めた率から、全体の件数へ戻る</caption>
<thead><tr><th scope="col">窓口</th><th scope="col">注文件数</th><th scope="col">取違い注文と率</th></tr></thead>
<tbody>
<tr><th scope="row">小規模窓口A</th><td>100件</td><td>8件、8％</td></tr>
<tr><th scope="row">大規模窓口B</th><td>900件</td><td>18件、2％</td></tr>
<tr><th scope="row">全体</th><td>1,000件</td><td>26件、2.6％</td></tr>
</tbody>
</table>
</div>
<figcaption>元の記録と判断の根拠を、同じ行で照合します。</figcaption>
</figure>

窓口の率だけを足して2で割ると、（8＋2）÷2＝5％です。この計算では、注文が100件の窓口と900件の窓口を同じ一つの重みで扱っています。全注文一件当たりの率を知りたい場合は、取違い26件を全注文1,000件で割り、2.6％とします。

同じことを重みで表せば、Aの注文は全体の1割、Bは9割なので、8％×0.1＋2％×0.9＝2.6％です。注文の構成が変わる月を比べるときも、各窓口の率と全体の率のどちらが変わったかを分けると、対策の効果と構成の影響を取り違えにくくなります。

<span id="ip-reading-business-data-source-practice"></span>

### 別の条件で判断する

翌週はAが200件で取違い16件、Bが800件で取違い16件でした。両窓口の率は改善したでしょうか。全体の率も求めてください。

<details>
<summary>考え方と答えを確かめる</summary>
<p>Aは8％、Bは2％で、各窓口の率は変わっていません。全体は32÷1,000＝3.2％へ上がります。率の高いAの注文が増えたことが、全体の変化に影響しています。</p>
</details>

## 自分で判断してみる

月500件の窓口で取違いが4％から3％に下がる見込みです。1件を防ぐ効果は1,000円、対策の費用は月6,000円。月の利益だけで判断する場合、導入は有利でしょうか。計算する前に、何が<a class="lesson-term" data-lesson-term href="#lesson-term-denominator">分母</a>か答えてください。

<details><summary>考え方と答えを確認する</summary><p>分母は月500件の注文です。取違いは20件から15件へ減るので、月5,000円の費用削減です。対策費6,000円を差し引くと利益は1,000円減ります。安全や顧客への影響など、資料に金額で示されていない効果はこの結論に含めていません。</p></details>

## 解き直すときの確認

件数と率のどちらを使うかを目的から決め、条件が同じかを確かめます。率を件数に戻してから金額へ換算し、最後に増える費用も引きます。

<span id="ip-reading-business-data-decision-section"></span>

## 同じ条件にそろえた効果予測から改善案を選ぶ

業務改善の案を選ぶときは、状況を示す件数表と、費用を示す見積書を一度分けて読みます。最初に「どの注文を次月の対象と考えるか」を決め、その件数に対策前後の率の差を掛けて、防げる件数を求めます。次に、防げる一件当たりの費用を掛け、追加の運用費を引きます。予測の結果が基準をわずかに上回る場合は、件数や効果が少し変わったらどうなるかを照合し、導入後に記録する数字を決めておきます。

<figure id="ip-reading-business-data-worked-decision">
<figcaption id="ip-reading-business-data-worked-decision-caption">翌月の改善案を比べるための二つの資料</figcaption>
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-reading-business-data-worked-decision-caption">
<table>
  <thead><tr><th scope="col">資料と項目</th><th scope="col">案Aで対策する注文</th><th scope="col">案Bで対策する注文</th></tr></thead>
  <tbody>
    <tr><th scope="row">注文予測</th><td>通常400件</td><td>特注200件</td></tr>
    <tr><th scope="row">取違い率の見込み</th><td>4％から2％</td><td>12％から7％</td></tr>
    <tr><th scope="row">取違い一件の費用</th><td>1,200円</td><td>1,800円</td></tr>
    <tr><th scope="row">対策の月額費用</th><td>6,000円</td><td>15,000円</td></tr>
  </tbody>
</table>
</div>
</figure>

Aの対象は通常注文なので、防げる件数は400×(0.04−0.02)＝8件。利益改善は8×1,200−6,000＝3,600円です。Bの対象は特注で、防げる件数は200×(0.12−0.07)＝10件。利益改善は10×1,800−15,000＝3,000円です。取違いを多く防ぐ目的ではB、ここにある費用で翌月の利益を最大にする目的ではAになります。

Aの予測が外れた場合も考えます。通常注文が300件に下がると、率の差が同じでも減るのは6件で、利益改善は1,200円です。Aの対策費を回収するには6,000÷1,200＝5件分の削減が必要なので、率の2ポイント差が続く条件では通常250件が境目です。導入後は、通常と特注を分けて注文数と取違い数を記録し、予測より注文が少なかったのか、率が下がらなかったのかを切り分けます。

次の[在庫管理と発注方式](/qualifications/it-passport/ip-inventory-decisions/)では、実際に使える在庫と今後の入荷を分け、費用と欠品の条件から案を選びます。


<section class="guided-lesson" id="ip-reading-business-data-guided-transfer" aria-labelledby="ip-reading-business-data-guided-transfer-title">
<h3 id="ip-reading-business-data-guided-transfer-title">条件を変えて確かめる</h3>
<p id="ip-reading-business-data-guided-transfer-prompt">Bの運用費が16,000円に増え、次月の注文、率、一件の費用は表のままです。月の利益改善は何円ですか。</p>
<form data-guided-practice data-expected="2000" data-guided-hint="特注は200件です。12％に7％を掛けず、減る幅を先に求めます。" aria-labelledby="ip-reading-business-data-guided-transfer-title" aria-describedby="ip-reading-business-data-guided-transfer-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>練習の答え</legend>
<label for="ip-reading-business-data-guided-transfer-input">答え（円）</label> <input id="ip-reading-business-data-guided-transfer-input" name="answer" class="guided-number" type="text" inputmode="numeric" enterkeyhint="done" maxlength="18" autocomplete="off">
<div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details>
<summary>解答と考え方を読む</summary>
<p data-guided-solution>200×(0.12−0.07)＝10件、10×1,800＝18,000円の削減です。月の運用費16,000円を差し引くと利益改善は2,000円になります。</p>
</details>
</section>

<span id="ip-reading-business-data-decision-independent"></span>

### 自分で判断する

Aで通常注文を350件と見込み、対策前の率が4％、対策後の率が3％になりそうです。費用条件は表のままです。予測の平均件数を途中で丸めず、利益の増減と、判断の確かさを説明してください。

<details><summary>考え方と答えを確認する</summary><p>率の差は1パーセントポイントなので、平均では350×0.01＝3.5件の取違いを防ぐ見込みです。3.5×1,200−6,000＝マイナス1,800円。平均の予測では3.5件をそのまま用い、実際の記録は一件ずつ数えます。今回は費用上の改善を見込めないので、対策費を下げられるか、率が下がる根拠が確かなのかを確認します。</p></details>
