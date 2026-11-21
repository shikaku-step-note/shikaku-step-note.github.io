---
{
  "stableId": "tk-housing-finance",
  "qualification": "takken",
  "title": "住宅金融支援機構と証券化の資金の流れ",
  "description": "買取型の融資・債権・返済の流れを説明する。条件の読み方、途中の判断、比較例、入力式の練習と解説を通して学びます。",
  "order": 55,
  "minutes": 65,
  "sample": false,
  "archived": false,
  "updated": "2026-11-21",
  "unit": 7,
  "syllabus": [
    5
  ],
  "scopeLabel": "2026年度・2026年4月1日施行法令を参照／独自教材",
  "subject": "5",
  "objectives": [
    "買取型の融資・債権・返済の流れを説明する",
    "保証型と買取型の役割の違いを資料から識別する",
    "機構の業務と個別融資の条件を区別する"
  ],
  "prerequisite": "「住宅の需給・広告・統計」で住宅金融の目的を確認し、「弁済・相殺・債権譲渡」で債権の意味を学びます。",
  "glossary": [
    {
      "term": "ローン債権",
      "definition": "住宅ローン契約に基づき元金や利息の返済を受け取る権利"
    },
    {
      "term": "証券化",
      "definition": "債権等から生じる資金を裏付けとする証券で資金を調達する仕組み"
    },
    {
      "term": "管理回収",
      "definition": "債権の返済を受け取り、管理する業務"
    }
  ],
  "keywords": [
    "ローン債権",
    "証券化",
    "管理回収"
  ],
  "inlineGlossary": [
    {
      "id": "tk-e11a836b91",
      "term": "ローン債権"
    },
    {
      "id": "tk-e8846d3a6f",
      "term": "管理回収"
    },
    {
      "id": "tk-d78075b022",
      "term": "証券化"
    }
  ]
}
---

## 住宅金融支援機構は、民間の住宅ローンを支える

住宅金融支援機構は、長期固定金利の住宅ローンの供給を支える<a class="lesson-term" data-lesson-term href="#lesson-term-tk-d78075b022">証券化</a>支援業務などを行う独立行政法人です。住宅ローンとは、住宅の建設・購入等のために借り入れ、契約に従って返済するお金です。金融機関から見れば、将来の返済を受け取る権利が<a class="lesson-term" data-lesson-term href="#lesson-term-tk-e11a836b91">ローン債権</a>になります。機構がその債権を買い取る場合と、金融機関の証券化を保証等で支える場合では、関係者の役割が変わります。

証券化は、多数のローン等から生じる将来の資金を基に証券を発行し、投資家から資金を調達する仕組みです。この章では商品の金利や審査基準の暗記を先に置かず、誰が貸し、誰が債権を持ち、誰が資金を出すかを順に整理します。借り手の返済条件と、金融機関が資金を回収する仕組みを区別することが出発点です。

## 買取型では、債権の移転と返済窓口を分ける

買取型では、まず民間金融機関が対象となる住宅ローンを実行します。次に、そのローン債権を機構へ売却し、機構は債権を担保とするMBS等の発行によって資金を調達します。MBSは住宅ローン債権を裏付けとする資産担保証券です。借り手が毎月支払う返済金は、管理・回収を受託した金融機関を通じて機構へ渡り、投資家への元利払いの資金になります。

債権が機構へ移ることと、利用者の返済窓口が機構へ変わることは同じではありません。金融機関は、債権を売却した後も、管理・回収の業務を受託して返済を受け取ります。契約書や業務の説明に「売却」と「回収」が同時に書かれていても、対象が権利なのか業務なのかを分ければ読み取れます。

<figure id="tk-finance-claim-flow"><figcaption id="tk-finance-claim-flow-caption">買取型では、何が誰へ移るかを矢印で読む</figcaption><div class="table-scroll" role="region" tabindex="0" aria-labelledby="tk-finance-claim-flow-caption"><table><thead><tr><th scope="col">順序</th><th scope="col">関係者の動き</th><th scope="col">移るもの・残る役割</th></tr></thead><tbody><tr><th scope="row">融資</th><td>金融機関 → 利用者</td><td>融資金。返済を受ける債権が成立</td></tr><tr><th scope="row">買取り</th><td>金融機関 → 機構</td><td>ローン債権。住宅そのものではない</td></tr><tr><th scope="row">調達</th><td>投資家 → 機構</td><td>証券の発行代金</td></tr><tr><th scope="row">返済</th><td>利用者 → 管理回収する金融機関 → 機構</td><td>元利金。銀行は回収業務を受託</td></tr><tr><th scope="row">支払い</th><td>機構 → 投資家</td><td>証券の元利払い</td></tr></tbody></table></div></figure>

### 基本例　同じ銀行へ返済する理由

利用者Aへ銀行Bが2,000万円を融資し、Bがその対象債権を機構へ売却したとします。Aは引き続きBの返済口座へ支払っています。Bが債権を売ったから二重に返済するという話にはなりません。Bは<a class="lesson-term" data-lesson-term href="#lesson-term-tk-e8846d3a6f">管理回収</a>の受託者として受け取り、所定の流れで機構へ渡す役割を持つためです。「債権の帰属先」と「返済を扱う窓口」を別々に答えてください。

### 標準例　発行代金と毎月の返済を混同しない

機構が住宅ローンを裏付けとする証券を発行し、投資家Cが購入した場面では、Cが支払う発行代金が機構の資金調達になります。後日、利用者の返済に基づく資金から投資家へ元利払いをする流れと、最初の調達を時間順に分けます。投資家が個々の借り手へ直接住宅ローンを申し込ませ、審査し、融資する仕組みとして読むと、金融機関の役割を取り違えます。

## 保証型では、機構がすべての債権を買うとは限らない

保証型では、対象ローンについて機構が住宅融資保険を引き受け、また金融機関が当該ローン等を担保として発行する債券等の元利払いを保証する仕組みを使います。機構がローン債権を買い取る買取型と、保証・保険で民間側の資金調達を支える保証型を、同じ動きとして覚えないようにします。

金融機関、機構、投資家の間に保証があることだけから、借り手の返済義務が消えたり、どの申込者も融資を受けられたりするとは判断できません。対象となる貸付けや技術基準、審査等は制度と個別契約に従います。試験の選択肢で「すべて」「必ず」と条件が広がっているときは、どの事実まで公式の仕組みから説明できるかを確かめます。

<figure id="tk-finance-two-models"><figcaption id="tk-finance-two-models-caption">方式を見分けるのは、機構が行う取引</figcaption><div class="table-scroll" role="region" tabindex="0" aria-labelledby="tk-finance-two-models-caption"><table><thead><tr><th scope="col">比較する点</th><th scope="col">買取型</th><th scope="col">保証型</th></tr></thead><tbody><tr><th scope="row">機構の働き</th><td>対象ローン債権を買い取る</td><td>住宅融資保険と元利払い保証等</td></tr><tr><th scope="row">資金調達の説明</th><td>機構のMBS発行を読む</td><td>金融機関の債券等と機構の保証を読む</td></tr><tr><th scope="row">共通して守る区別</th><td>債権の売買と返済窓口は別</td><td>保証があっても借り手の返済義務を別に確認</td></tr></tbody></table></div></figure>

### 応用例　資料の言葉から方式を識別する

資料Xには「民間金融機関が融資後にローン債権を機構へ売却する」、資料Yには「ローンに保険を付し、そのローン等を担保とする債券等の支払いを機構が保証する」とあります。Xは債権の買取りが決め手なので買取型、Yは保険と元利払い保証が決め手なので保証型として読みます。両方に長期固定金利という言葉が出ていても、そこだけでは方式を区別できません。共通の目的と、異なる取引の動きを分けることが判断の理由です。

<section class="guided-lesson" id="guided-tk-finance" aria-labelledby="guided-tk-finance-title">
<h3 id="guided-tk-finance-title">途中で確認　債権の管理と金額を分ける</h3>
<p id="guided-tk-finance-prompt">買取型の対象債権2,000万円について、元金部分を120万円返済した直後とします。繰上返済・新たな借入れなしの場合の元金残高を、万円で求めます。債権の買取り自体で元金が増減するとは考えません。</p>
<form data-guided-practice data-expected="1880" data-guided-hint="条件と単位を表に戻して、計算の順序を確かめてください。" aria-labelledby="guided-tk-finance-title" aria-describedby="guided-tk-finance-prompt" data-lesson-screen-only>
<fieldset hidden><legend>練習の答え</legend><label for="guided-tk-finance-input">答え（万円）</label><input id="guided-tk-finance-input" name="answer" class="guided-number" type="text" inputmode="numeric" autocomplete="off" maxlength="20"><div class="guided-buttons"><button class="button primary" type="submit">答えを確かめる</button><button class="button secondary" type="reset">やり直す</button></div></fieldset><p role="status" data-guided-feedback></p>
</form><details><summary>解答と考え方を読む</summary><p data-guided-solution>2,000－120＝1,880万円です。利息と元金を分け、指定された元金返済額だけを差し引きます。金融機関から機構への債権の移転それ自体は、借り手が同じ元金をもう一度返す理由にはなりません。</p></details></section>

## 直接融資などの業務も、対象を確かめて整理する

機構は証券化支援だけでなく、災害復興住宅融資、マンション管理組合向けの支援、賃貸住宅の建設等に関する業務も行います。そのため、通常の住宅購入の支援方式を理解した後は、資料がどの対象・業務を述べているかを確認します。証券化支援が中心であるという説明を、機構が直接貸す業務は一切ないという選択肢へ広げないでください。

条件が付く業務を比較するときは、対象者、資金の使途、機構が行う行為を三つに分けます。商品名の数字や過去の金利を先に暗記しても、貸付けと債権買取りの違いは説明できません。公式の業務案内へ戻り、対象を読み取って学習用の表へ整理する方法が役立ちます。

## 自分で解く　役割の誤りを直す

「買取型では機構が銀行から住宅を買い、その住宅を投資家へ販売するため、利用者が支払うのは賃料である」という説明を、制度の流れに沿って直してください。

<details><summary>解答と根拠を読む</summary><p>機構が買い取る対象は、対象となる住宅ローン債権です。機構はこれを裏付けとする証券等で資金を調達し、借り手は住宅ローン契約に基づく元金と利息を返済します。住宅そのものの売買、ローン債権の売買、証券の購入を別の取引として読みます。誤りの原因は、取引の対象をすべて「住宅」に置き換えたことです。</p></details>

## この章のまとめ

借り手から見た融資と返済を起点に、金融機関、機構、投資家へ関係を広げます。説明する際は、移るものが資金か債権か、請け負う役割が回収か保証かを明示してください。図の矢印一つずつを言葉で説明できれば、方式を取り違えにくくなります。

出典は住宅金融支援機構[買取型の概要](https://www.jhf.go.jp/about/financial/join/outline_kaitori.html)、[保証型の概要](https://www.jhf.go.jp/about/financial/join/outline_hosyo.html)、[災害復興・宅地防災](https://www.jhf.go.jp/)。2026年11月21日確認。商品の金利・融資可否を判断する教材ではなく、業務の基本的な構造を扱います。
