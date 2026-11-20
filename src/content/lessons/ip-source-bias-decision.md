---
{
  "stableId": "ip-source-bias-decision",
  "qualification": "it-passport",
  "title": "標本抽出とバイアス：調査の偏りを見抜く",
  "description": "ITパスポートの業務分析で問われる単純無作為抽出・層別抽出・多段抽出を、調査名簿と回答状況から見分けます。交絡が疑われるときの比較方法と、調査結果に合う図や改善案の選び方も学びます。",
  "unit": 1,
  "order": 3,
  "minutes": 75,
  "syllabus": [
    2
  ],
  "sample": false,
  "updated": "2026-11-20",
  "prerequisite": "「業務分析とデータの可視化」で、調査の目的から集めるデータや図表を選ぶ考え方を学びます。この章では割合を「該当件数÷対象件数」で計算します。",
  "keywords": [
    "標本抽出",
    "単純無作為抽出",
    "層別抽出",
    "多段抽出",
    "選択バイアス",
    "情報バイアス",
    "無回答バイアス",
    "交絡",
    "親和図法"
  ],
  "objectives": [
    "母集団と抽出枠を定め、目的と資料に合う標本の選び方を識別する",
    "抽出・回答・測定の各段階で偏りを見つけ、比較条件の違いを確かめる",
    "判断したいことに合う可視化を選び、案を出す工程と根拠を確かめる工程を区別する"
  ],
  "glossary": [
    {
      "term": "抽出枠",
      "definition": "標本を選ぶときに使う名簿や一覧。調べたい集団をどこまで含み、誰が重複しているかを先に確認します。"
    },
    {
      "term": "層別抽出",
      "definition": "母集団を地域などの特徴で重ならない層に分け、各層から標本を選ぶ方法です。"
    },
    {
      "term": "多段抽出",
      "definition": "学校を選び、選んだ学校から生徒を選ぶように、抽出を複数の段階に分ける方法です。"
    },
    {
      "term": "無回答バイアス",
      "definition": "回答した人と回答しなかった人で調べたい性質が異なるため、回収した回答から求めた値が一方向に偏ることです。"
    },
    {
      "term": "交絡要因",
      "definition": "比較したい条件と結果の両方に関係し、どちらの影響で差が生じたかを見分けにくくする第三の要因です。"
    },
    {
      "term": "親和図法",
      "definition": "意見や観察内容を一件ずつ書き出し、意味の近いものをまとめて見出しを付ける問題整理の手法です。"
    }
  ],
  "inlineGlossary": [
    {
      "id": "sampling-frame",
      "term": "抽出枠",
      "definition": "標本を選ぶときに使う名簿や一覧。調べたい集団をどこまで含み、誰が重複しているかを先に確認します。"
    },
    {
      "id": "stratified-sampling",
      "term": "層別抽出",
      "definition": "母集団を地域などの特徴で重ならない層に分け、各層から標本を選ぶ方法です。"
    },
    {
      "id": "multistage-sampling",
      "term": "多段抽出",
      "definition": "学校を選び、選んだ学校から生徒を選ぶように、抽出を複数の段階に分ける方法です。"
    },
    {
      "id": "nonresponse-bias",
      "term": "無回答バイアス",
      "definition": "回答した人と回答しなかった人で調べたい性質が異なるため、回収した回答から求めた値が一方向に偏ることです。"
    },
    {
      "id": "confounder",
      "term": "交絡要因",
      "definition": "比較したい条件と結果の両方に関係し、どちらの影響で差が生じたかを見分けにくくする第三の要因です。"
    },
    {
      "id": "affinity-diagram",
      "term": "親和図法",
      "definition": "意見や観察内容を一件ずつ書き出し、意味の近いものをまとめて見出しを付ける問題整理の手法です。"
    }
  ]
}
---

<span id="ip-source-bias-decision-objective-1"></span>

## 誰について知りたいかで、使う名簿が決まる

標本調査では、調べたい集団の一部を選び、その回答や記録から全体の傾向を見積もります。結果をどの範囲に広げられるかは、誰を選べる名簿を使い、どのように選んだかで変わります。たとえば、市の講座に申し込んだ人の待ち時間を調べるなら、知りたいのは、決めた期間に申し込んだ人全体です。この全体を**母集団**、そこから調べるために取り出した一部を**標本**と呼びます。申込みを取り下げた人や予約が取れなかった人を含めるかは、「窓口を利用しようとした人」を調べるのか、「受講者」を調べるのかで変わります。

標本を選ぶときに使う名簿や一覧が<a class="lesson-term" data-lesson-term href="#lesson-term-sampling-frame">抽出枠</a>です。オンラインの申込者だけが載った一覧から100人を無作為に選んでも、電話で申し込んだ人が選ばれる確率は0です。また、ある人が3回申し込んで3行に現れる一覧から、各行を同じ確率で選ぶと、その人は一度だけ申し込んだ人より選ばれやすくなります。人について知りたいなら一人を1行にまとめ、申込み一件ごとの処理時間を知りたいなら、同じ人が繰り返し申し込んだ分も一件ずつ数えます。

### 全部を調べるか、一部を選ぶか

全数調査は母集団の全員に調査する方法です。短期間の受講者が30人で連絡先も分かるなら、全員に聞く方法を検討できます。ただし、全員に依頼しても、全員から同じ条件で回答が返るとは限りません。標本調査では、全体の一部を選ぶため、連絡や集計の負担を抑えられます。限られた人数をどう選ぶかによって、調べられることが変わります。

単純無作為抽出では、全員の一覧から定めた人数をくじ引きのように選びます。一人ずつ名簿から重複なく選ぶなら、誰もが同じ確率で標本に入ります。<a class="lesson-term" data-lesson-term href="#lesson-term-stratified-sampling">層別抽出</a>では、申込み方法のように結果に関係しそうな特徴で全体を分け、その各グループから標本を選びます。少ない方のグループにも必要な人数を割り当てられるので、グループ別の結果を見たいときに向きます。

<a class="lesson-term" data-lesson-term href="#lesson-term-multistage-sampling">多段抽出</a>は、抽出を何回かに分ける方法です。すべての店舗の来店者を一つの名簿にまとめられなくても、店舗の一覧から調査店を選び、選んだ店舗の来店者一覧から対象者を選べます。この場合、選ばれなかった店舗では来店者を一人も調べません。地域別に層を作り、各地域の中で店舗、来店者の順に選べば、層別と多段を組み合わせた設計になります。

<figure id="ip-source-bias-sampling-methods">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-source-bias-sampling-caption">
<table>
<caption id="ip-source-bias-sampling-caption">抽出方法と、選ぶ単位の対応</caption>
<thead><tr><th scope="col">方法</th><th scope="col">選ぶ手順</th><th scope="col">使うときの条件</th></tr></thead>
<tbody>
<tr><th scope="row">単純無作為</th><td>一人ずつ並べた全体の名簿から人数分を選ぶ</td><td>母集団を覆う名簿がある</td></tr>
<tr><th scope="row">層別</th><td>電話とオンラインに分け、両方から人を選ぶ</td><td>両方の群の結果を把握したい</td></tr>
<tr><th scope="row">二段</th><td>調査店を選び、その店から来店者を選ぶ</td><td>全店分の来店者名簿を用意しにくい</td></tr>
</tbody>
</table>
</div>
<figcaption>層別では各層を調べます。二段抽出では、第一段で選んだグループの中から次の対象を選びます。</figcaption>
</figure>

たとえば、規模の違う支店を同じ確率で選び、どの支店でも20人ずつ調べる設計では、小さな支店の一人のほうが、大きな支店の一人より選ばれやすくなります。「店舗の選び方が無作為」と「一人ずつの抽出確率が同じ」は別の条件です。店舗ごとの平均を知りたいのか、全来店者の平均を知りたいのかを先に決めると、その違いが問題になる場面を見分けられます。

<span id="ip-source-bias-decision-objective-2"></span>

## 回収率の差と測り方の差を別々に調べる

調査の**バイアス**とは、集め方や測り方に一定の傾向があり、結果が調べたい実態から一定の方向へずれることです。名簿に電話申込者が入っていない場合は、選べる人の範囲に問題があります。対象の選び方によって結果に偏りが生じることを選択バイアスと呼びます。一方、電話申込者を名簿に入れて標本に選んでも、その人たちが回答しにくい状況なら、回収した回答の構成が変わります。

市の講座の申込者を、オンライン600人、電話400人とします。両方の名簿から1割ずつ無作為に選びました。次の表では、回答者が「待ち時間が長かった」と答えた人数も記録しています。

<figure id="ip-source-bias-response-flow">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-source-bias-response-caption">
<table>
<caption id="ip-source-bias-response-caption">申込み方法ごとの人数と回答内容</caption>
<thead><tr><th scope="col">申込み方法</th><th scope="col">名簿</th><th scope="col">依頼</th><th scope="col">回答</th><th scope="col">待ち時間が長かった</th></tr></thead>
<tbody>
<tr><th scope="row">オンライン</th><td>600人</td><td>60人</td><td>48人</td><td>12人</td></tr>
<tr><th scope="row">電話</th><td>400人</td><td>40人</td><td>20人</td><td>10人</td></tr>
</tbody>
</table>
</div>
<figcaption>母集団と依頼した標本の構成は6対4です。回答者は48対20で、依頼時より電話の割合が小さくなっています。</figcaption>
</figure>

### 例題　回答者の割合を全員へ広げられるか

回答が返った割合を、依頼数を分母にして計算します。オンラインは48÷60＝80％、電話は20÷40＝50％です。次に、回答者に限って「待ち時間が長かった」と答えた割合を求めると、オンラインは12÷48＝25％、電話は10÷20＝50％になります。二つの計算は分母が違います。回収率は回答しやすさを点検する値で、「長かった」と答えた割合は回収した回答の内容を表す値です。

回答を全部足すと22÷68で約32.4％です。これは回答者68人について言える値です。調査前の名簿では全体の4割が電話ですが、表の回答者では20÷68で約29.4％に下がっています。電話の回答者で「長かった」が多いので、その層の重みが小さくなると割合も小さくなります。名簿の人数比で重み付けし直すと、25％×0.6＋50％×0.4＝35％です。この計算は各層内の回答をその層全体に当てはめています。たとえば、待つのが嫌で途中で電話を切った人ほど回答していない場合、比率を直すだけではその人たちの経験を補えません。

調べたい性質と回答の有無が関係するために生じる偏りが、<a class="lesson-term" data-lesson-term href="#lesson-term-nonresponse-bias">無回答バイアス</a>です。回収率に差がある段階で確認の必要は生じますが、その差だけから偏りの向きや大きさは決まりません。未回答者の一部へ別の方法で連絡し、先に答えた人と状況が似ているか確かめると、追加で判断できる材料が得られます。

測り方にも偏りは生じます。オンラインで「入力を始めてから送信まで」、電話で「職員につながってから受付完了まで」を測れば、電話をつなぐまで待った時間だけ電話の集計から抜けます。人を同じ割合で選んでも、この欠落は直りません。調べたい時間を「申込みの意思を持って手続を始めてから、受付が終わるまで」と定義し、開始や終了を記録できるか確かめます。質問の誘導、記憶のずれ、測定基準の違いなど、情報の取り方によって結果が偏ることを情報バイアスと呼びます。対象が名簿に含まれるか、依頼後に回答したか、同じ意味で測ったかの順に資料を見れば、直すべき工程を絞れます。

<section class="guided-lesson" id="ip-source-bias-guided" aria-labelledby="ip-source-bias-guided-title">
<h3 id="ip-source-bias-guided-title">集計の分母を選ぶ</h3>
<p id="ip-source-bias-guided-prompt">上の表で、依頼した電話申込者のうち、回答しなかった人の割合は何％ですか。数字だけを入力してください。</p>
<form data-guided-practice data-expected="50" data-guided-hint="電話の依頼は40人、回答は20人です。回答しなかった人数を出し、電話の依頼数で割ります。" aria-labelledby="ip-source-bias-guided-title" aria-describedby="ip-source-bias-guided-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>回収状況の練習</legend>
<label for="ip-source-bias-guided-input">電話の未回答率（％）</label>
<input id="ip-source-bias-guided-input" name="answer" class="guided-number" type="text" inputmode="numeric" enterkeyhint="done" maxlength="18" autocomplete="off">
<div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details>
<summary>解答と考え方を読む</summary>
<p data-guided-solution>未回答は40−20＝20人です。電話で申し込み、調査を依頼された40人が分母なので、20÷40×100＝50％になります。20を電話の申込者総数400で割ると、調査で依頼しなかった360人を分母に入れることになります。</p>
</details>
</section>

## 全体で差が出たら、比較する条件をそろえる

参加者に予約日の通知を送ったところ、欠席が少なくなったと報告されたとします。通知を送った予約の多くは夕方、送らなかった予約の多くは日中でした。夕方のほうが来やすければ、通知の有無と時間帯の両方が全体の差に関係します。比較したい条件と結果の双方に関係する第三の要因を<a class="lesson-term" data-lesson-term href="#lesson-term-confounder">交絡要因</a>と呼びます。異なるデータの値が一緒に動くように見えても、第三の要因がその関係を作っていることがあります。これを擬似相関といいます。

<figure id="ip-source-bias-confounding">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-source-bias-confounding-caption">
<table>
<caption id="ip-source-bias-confounding-caption">通知の有無と欠席数。括弧内は各欄の欠席率</caption>
<thead><tr><th scope="col">予約時間帯</th><th scope="col">通知あり</th><th scope="col">通知なし</th></tr></thead>
<tbody>
<tr><th scope="row">日中</th><td>10件中2件（20％）</td><td>40件中8件（20％）</td></tr>
<tr><th scope="row">夕方</th><td>40件中4件（10％）</td><td>10件中1件（10％）</td></tr>
<tr><th scope="row">全体</th><td>50件中6件（12％）</td><td>50件中9件（18％）</td></tr>
</tbody>
</table>
</div>
<figcaption>全体では6ポイント差がありますが、日中と夕方を別々に見ると、同じ時間帯の中では率が一致します。</figcaption>
</figure>

通知の有無で全体の率が違うのは、通知ありに欠席率の低い夕方が多いためです。この資料の値から「通知で欠席が減った」とは結論できません。次に通知の効果を調べるなら、同じ時間帯の予約を対象に、通知を送るかどうかを無作為に割り当てるなど、比較の条件をそろえます。時間帯ごとに率が違い、しかも通知ありとなしで時間帯の構成も違う、という二点を資料から読み取ると、全体の率だけを見る間違いを避けられます。

<span id="ip-source-bias-decision-objective-3"></span>

## 図を選ぶ前に、読み取る値を決める

時間帯による偏りを確かめたいときは、期間を横軸とする折れ線グラフより、時間帯と通知の有無を交差させた**クロス集計表**が向きます。人数と率を併記すれば、根拠になった件数まで確認できます。異なる店舗の欠席率そのものを比べるなら、同じ尺度で横棒を並べると差が分かります。日ごとに欠席率を追うなら、時点の並びを残す折れ線グラフが合います。

「欠席率が高い曜日と店舗の組合せを探す」という問いには、曜日を行、店舗を列とし、率に応じてセルの濃さを変える**ヒートマップ**を使えます。色の濃淡は場所を見つける目印です。たとえば、率が10％でも1件÷10件と100件÷1,000件では、次に同じ結果が出るかを判断する材料の量が違います。セルには訪問者数や率を数字でも載せ、比較する図は色の範囲をそろえます。見た目から入ると、「濃い色は数が多い」「ゼロ件は欠測と同じ」などの読み違いが起きます。欠測したセルは「未集計」と表示し、実際に0件だったセルと区別します。

<figure id="ip-source-bias-heatmap">
<svg viewBox="0 0 350 150" width="350" height="150" style="max-width:100%;height:auto" role="img" aria-labelledby="ip-source-bias-heatmap-title ip-source-bias-heatmap-description">
<title id="ip-source-bias-heatmap-title">曜日と受付場所で比べた欠席率</title>
<desc id="ip-source-bias-heatmap-description">A会場は月曜が10件中1件で10％、火曜は20件中0件で0％。B会場は月曜が1,000件中100件で10％、火曜は未集計です。</desc>
<g fill="currentColor" font-size="14" text-anchor="middle"><text x="110" y="22">A会場</text><text x="267" y="22">B会場</text><text x="22" y="67">月曜</text><text x="22" y="118">火曜</text></g>
<g fill="currentColor" fill-opacity=".10" stroke="currentColor" stroke-opacity=".56"><rect x="45" y="34" width="130" height="45" rx="4"/><rect x="185" y="34" width="162" height="45" rx="4"/><rect x="45" y="86" width="130" height="45" rx="4" fill="none"/><rect x="185" y="86" width="162" height="45" rx="4" fill="none" stroke-dasharray="4 4"/></g>
<g fill="currentColor" font-size="14" text-anchor="middle"><text x="110" y="62">10％（1／10）</text><text x="267" y="62">10％（100／1,000）</text><text x="110" y="114">0％（0／20）</text><text x="267" y="114">未集計</text></g>
</svg>
<figcaption>月曜の二つのセルは色も率も同じです。括弧内の件数まで読むと、同じ10％が異なる件数から出たと分かります。</figcaption>
</figure>

<span id="ip-source-bias-decision-source-reasoning"></span>

## 依頼対象者と回答者の構成を並べ、結果の届く範囲を確かめる

無作為に選んだ後でも、回答する人の割合に差があれば、回答者だけの集計は母集団の構成と変わります。ある施設の利用者1,000人のうち、利用方法別に一割ずつ調査を依頼しました。「不便だった」は回答者について確かめた結果です。

<figure id="ip-source-bias-decision-source-table">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-source-bias-decision-source-caption">
<table>
<caption id="ip-source-bias-decision-source-caption">依頼対象者と回答者の構成を並べ、結果の届く範囲を確かめる</caption>
<thead><tr><th scope="col">利用方法</th><th scope="col">全利用者と依頼数</th><th scope="col">回答者と不便だった人数</th></tr></thead>
<tbody>
<tr><th scope="row">窓口利用</th><td>600人、60人に依頼</td><td>30人が回答、12人が不便</td></tr>
<tr><th scope="row">オンライン</th><td>400人、40人に依頼</td><td>36人が回答、9人が不便</td></tr>
<tr><th scope="row">回答者の合計</th><td>100人に依頼</td><td>66人が回答、21人が不便</td></tr>
</tbody>
</table>
</div>
<figcaption>元の記録と判断の根拠を、同じ行で照合します。</figcaption>
</figure>

窓口の回答率は30÷60＝50％、オンラインは36÷40＝90％です。依頼段階では6対4だった構成が、回答者では30対36に変わりました。回答者全体の不便だった割合は21÷66で約31.8％ですが、これを利用者全体の値と断定するには、未回答者がどうだったかという問題が残ります。

利用方法ごとの回答者の率は、窓口40％、オンライン25％です。母集団の構成6対4にそろえるという仮定の下で計算すると、40％×0.6＋25％×0.4＝34％です。ただし、この補正でも、同じ利用方法の中で未回答者ほど不便に感じていた場合などの偏りは解消しません。計算した値に、どの仮定が必要かを添えます。

<span id="ip-source-bias-decision-source-practice"></span>

### 別の条件で判断する

窓口の未回答者が忙しいために回答できず、その人たちが特に長い待ち時間を経験していたとします。利用方法の構成だけを補正すれば、この偏りまで解消できるでしょうか。

<details>
<summary>考え方と答えを確かめる</summary>
<p>解消できるとは判断できません。同じ窓口利用者の中で、回答するかどうかと待ち時間が関係しているためです。連絡方法を変えるなどして未回答者の事情を調べ、残る限界も記録します。</p>
</details>

## 意見を集め、検証する問いに整理する

改善会議では、問題を広く見つける工程と、どの原因が本当に関係するか調べる工程が続きます。**ブレーンストーミング**では、他の人の案を聞きながら考えを広げ、案を出している途中は評価を控えます。話し始めた人の案へ意見が集まりやすい場では、各自で書いてから共有する**ブレーンライティング**を使うと、全員の最初の考えを取り出しやすくなります。

出てきた意見を整理するときは、内容が近いものをまとめて見出しを付ける<a class="lesson-term" data-lesson-term href="#lesson-term-affinity-diagram">親和図法</a>が使えます。「折り返し時刻が分からない」「混雑時、何番目か知りたい」は「待ち状況が伝わらない」というまとまりに入ります。「スマートフォンで受付ボタンが隠れた」「入力欄に日付の見本が欲しい」は「操作の手掛かりが足りない」とまとめられます。見出しを付けると、前者は案内を見た人と見ていない人、後者は端末の種類ごとに、どの記録を比較すればよいか考えられます。

仮に参加者6人から「案内がない」という内容のカードが8枚出ても、問題に遭った利用者が8人いたとは言えません。一人が複数枚を書いた可能性があり、会議の参加者と利用者全体も一致しないためです。カードは仮説を作る材料として使い、利用者への調査、待ち時間の記録、画面で離脱した箇所などを調べます。原因が確かめられたら、施策を一部で試し、同じ指標で前後を比べます。

### 独力で判断する

研修センターは、全教室の受講者について、教材を開くまでの時間を比べたいと考えました。費用の都合で、各地域から一部の教室を選び、選ばれた教室で受講者を抽出します。教室Aは講師が説明を始めた時刻、教室Bは受講者が会場に着いた時刻を起点として記録しています。教室Bの時間が長かった場合、抽出方法の名称と、比較前に見直すべき点を説明してください。

<details>
<summary>解答と考え方を読む</summary>
<p>地域ごとに教室を選び、その教室の中で受講者を選ぶので、層別と二段抽出を組み合わせた設計です。各地域から調べていることが層別の手掛かりで、抽出する単位が教室から受講者へ変わることが二段抽出の手掛かりです。</p>
<p>測定の開始時点は両教室で異なります。教室Bには入室後、説明を待つ時間まで入るため、教材が開きにくかったのか、説明の開始を長く待ったのかを分けられません。調査目的に応じて開始時点と終了時点を決め直し、両教室で同じ時点を記録します。費用を抑える抽出方法を選べても、測定条件の食い違いは別に解消する必要があります。</p>
</details>

この章の範囲は[IPA ITパスポート試験シラバス Ver.6.5 本文5〜7ページ](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf#page=9)の項目2です。標本の選び方をもう一段詳しく確認するときは、[総務省統計局 Data StaRt「標本抽出の諸方法」](https://www.stat.go.jp/dstart/point/seminar/02/2-1-2.html)と[「調査の概要の作成」](https://www.stat.go.jp/naruhodo/12_ppdac/plan/plan1.html)に進めます。参照確認日 2026年11月16日。
