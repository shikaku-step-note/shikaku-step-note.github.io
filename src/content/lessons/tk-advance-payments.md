---
{
  "stableId": "tk-advance-payments",
  "qualification": "takken",
  "title": "手付金等の保全措置：累計・完成前後・境界の計算",
  "description": "5％・10％と1,000万円の二条件を、契約時の完成状態と累計受領額から判定し、保全方法・支払拒絶まで学びます。",
  "order": 27,
  "minutes": 85,
  "sample": false,
  "archived": false,
  "updated": "2026-11-21",
  "unit": 3,
  "syllabus": [
    7
  ],
  "scopeLabel": "2026年度・2026年4月1日施行法令を参照／独自教材",
  "subject": "7",
  "objectives": [
    "契約時の完成状態と保全対象の金銭を区別する",
    "累計額・割合・1,000万円の条件を独立に計算する",
    "保証・保険・保管の違いと支払拒絶を説明する"
  ],
  "prerequisite": "「自ら売主の8種制限」で手付の20％上限と買主保護の適用関係を確認してから進みます。",
  "glossary": [
    {
      "term": "手付金等",
      "definition": "契約締結日以後、引渡し前に支払われ代金に充当される金銭"
    },
    {
      "term": "累計受領額",
      "definition": "今回受領しようとする額に既に受領した対象額を加えた額"
    },
    {
      "term": "指定保管機関",
      "definition": "完成物件の手付金等について法定の保管措置を行う指定機関"
    }
  ],
  "keywords": [
    "手付金等",
    "累計受領額",
    "指定保管機関"
  ],
  "inlineGlossary": [
    {
      "id": "tk-ee5f38f6e4",
      "term": "指定保管機関"
    },
    {
      "id": "tk-e0f13e09b1",
      "term": "手付金等"
    }
  ]
}
---

## 保全措置は、引渡し前に払う金銭の返還を守ります

<a class="lesson-term" data-lesson-term href="#lesson-term-tk-e0f13e09b1">手付金等</a>の保全措置は、売主業者が返還義務を履行できなくなった場合に備え、銀行等の保証や保証保険等で買主の金銭を保護する制度です。手付という名称の金銭だけが対象ではありません。契約締結の日以後、引渡し前に払われ、代金へ充当される金銭であれば、中間金などの名目も含めて調べます。

前提は、宅建業者が自ら売主となり、非業者の買主へ売る場合です。業者間売買、個人間売買の媒介、引渡し後の金銭を、すべて同じ保全計算へ入れないようにします。また、保全が必要な場合に講じる措置は、原則として対象金銭を受領する前に整えます。

<span id="tk-advance-contract-status"></span>
## 完成前後は、売買契約時を基準にする

工事が完了していたかは売買契約時で判断します。未完成時に契約し、その後に建物が完成してから中間金を払う例で、支払日だけを見て完成物件の10％へ切り替えると、契約時の区分を取り違えます。外観だけでなく内装等の工事が完了して居住可能かという状態も確認します。

金額による保全不要の条件は、未完成物件なら代金の5％以下かつ1,000万円以下、完成物件なら10％以下かつ1,000万円以下です。さらに、買主への所有権移転登記がされた場合、又は買主が所有権の登記をした場合の適用除外も別に確認します。以下の計算は、登記等の他の適用除外がないことを前提にします。
<figure id="tk-advance-threshold-grid"><div class="table-scroll" role="region" tabindex="0" aria-labelledby="tk-advance-threshold-grid-caption"><table><caption id="tk-advance-threshold-grid-caption">保全不要の金額条件を、割合と絶対額の二つに分ける</caption><thead><tr><th scope="col">契約時の状態</th><th scope="col">割合条件</th><th scope="col">絶対額条件</th><th scope="col">両方の結果</th></tr></thead><tbody><tr><th scope="row">未完成</th><td>累計が代金の5％以下</td><td>累計が1,000万円以下</td><td>両方を満たすときに金額による除外</td></tr><tr><th scope="row">完成</th><td>累計が代金の10％以下</td><td>累計が1,000万円以下</td><td>両方を満たすときに金額による除外</td></tr><tr><th scope="row">どちらも共通</th><td>ちょうど基準額は「以下」に含む</td><td>1,000万円ちょうども「以下」に含む</td><td>一方でも超えると金額による除外なし</td></tr></tbody></table></div></figure>

<figure id="tk-advance-running-bars"><figcaption>累計は140万円、240万円、250万円へ増える</figcaption><svg viewBox="0 0 328 190" width="328" height="190" role="img" aria-label="代金4800万円未完成物件。手付140万円、中間金後240万円、追加後250万円。5パーセント基準240万円を最後の受領で超える" style="max-width:100%;height:auto"><g fill="currentColor" font-size="12"><text x="10" y="26">手付</text><text x="10" y="76">中間金</text><text x="10" y="126">追加後</text><text x="74" y="48">140万円</text><text x="74" y="98">240万円</text><text x="74" y="148">250万円</text><text x="144" y="177">縦線＝5％の240万円</text></g><g fill="currentColor" fill-opacity=".28" stroke="currentColor"><rect x="74" y="12" width="134.4" height="18"/><rect x="74" y="62" width="230.4" height="18"/><rect x="74" y="112" width="240" height="18"/></g><path d="M304.4 6v147" fill="none" stroke="currentColor" stroke-dasharray="4 3"/></svg><p>2回目は線に一致する5％ちょうどです。3回目は追加10万円で累計が線を越えるため、受領前の措置を確認します。</p></figure>


## 今回の金額と、すでに払った金額を足す

契約時に手付100万円を受領し、今回中間金150万円を受け取るなら、今回の判定額は250万円です。150万円だけを割合へ当てはめると、受領を細かく分ければいくらでも基準未満にできてしまいます。そのため法は、今回受領しようとする額に受領済みの手付金等を加えます。

累計で基準を超えて必要となった措置は、超えた差額だけを守ればよいという意味ではありません。保証・保険の対象額などは法定の条件に従い、受領する手付金等の全部を保護する内容を確認します。必要な措置を講じない売主に対しては、買主が支払いを拒める規定があります。

<span id="tk-advance-worked-cases"></span>
## 三つの例で、超えた条件を特定する

### 例題1　未完成の5％ちょうどと、その後の中間金

代金4,800万円の未完成物件では5％が240万円です。受領済み手付140万円に今回中間金100万円を加えると240万円なので、5％以下かつ1,000万円以下を満たします。さらに10万円を追加受領する前には、累計250万円となり5％を超えることを確認します。基準超過は10万円ですが、保全内容をその差額10万円だけに限定する計算にはしません。

### 例題2　割合は低いが1,000万円を超える

完成物件の代金1億5,000万円、受領累計1,100万円とします。割合は1,100÷15,000×100＝約7.33％で10％以下です。しかし1,000万円を超えるため、金額による除外条件を満たしません。10％以下だけをチェックして保全不要とする誤りを、絶対額の欄で発見できます。

### 例題3　契約後の完成で率を変えない

代金6,000万円、未完成時に売買契約をした物件が、その後完成しました。引渡し前に手付金等累計400万円を受領しようとする例です。契約時は未完成なので基準は5％の300万円です。400万円はこれを超え、登記等の他の除外もなければ、受領前に所定の措置が必要です。受領日に完成しているから10％の600万円まで不要、という処理にはしません。
<figure id="tk-advance-running-ledger"><div class="table-scroll" role="region" tabindex="0" aria-labelledby="tk-advance-running-ledger-caption"><table><caption id="tk-advance-running-ledger-caption">代金4,800万円・未完成の例を、支払ごとに追う</caption><thead><tr><th scope="col">受領予定の段階</th><th scope="col">今回（万円）</th><th scope="col">累計（万円）</th><th scope="col">金額による除外の判定</th></tr></thead><tbody><tr><th scope="row">手付</th><td>140</td><td>140</td><td>240以下、1,000以下</td></tr><tr><th scope="row">最初の中間金</th><td>100</td><td>240</td><td>5％ちょうどで両条件内</td></tr><tr><th scope="row">追加の中間金</th><td>10</td><td>250</td><td>5％超。受領前に所定の保全が必要</td></tr></tbody></table></div></figure>

## 保証・保険・保管を、返還の仕組みで区別する

銀行等による保証では、売主が返すべき手付金等を銀行等も連帯して保証する契約等と、法定の書面の交付を確認します。連帯保証では、主たる債務者への請求を先に済ませるよう求める権利などが制限され、保証人も全額の履行を求められる立場になります。買主が返還を求めるときの相手方を確保する仕組みです。保証保険では、返還債務を履行しないことで買主に生じる損害を保険で補う契約等を用います。保全が必要な金額と、少なくとも引渡しまでを含む期間等の条件を確認します。

完成物件では、<a class="lesson-term" data-lesson-term href="#lesson-term-tk-ee5f38f6e4">指定保管機関</a>による保管措置も選択肢になります。寄託は、保管を依頼して金銭等を預ける契約です。保管機関との寄託契約に加え、売主が保管機関から金銭の返還を受ける権利へ、買主のための質権を設定する契約等をそろえます。質権はこの例では、買主が売主へ返還を求める権利を回収するための担保です。単に預けてあるだけの金銭を、買主の回収へ結び付ける法41条の2の手続として理解します。未完成物件については保証と保険が基本で、完成物件向けの保管措置だけを講じれば同じように足りると考えないでください。

35条では、手付金等を受領する場合の保全措置の概要を契約前に説明します。説明書に「保証あり」と書くことと、実際に契約と交付等を済ませてから受領することは別です。情報提供と、金銭を保護する措置の実施を両方確かめます。
<section class="guided-lesson" id="guided-tk-advance" aria-labelledby="guided-tk-advance-title">
<h3 id="guided-tk-advance-title">途中で確認</h3><p id="guided-tk-advance-prompt">未完成物件の代金5,600万円、受領済み手付160万円です。他の適用除外はありません。金額による保全不要の範囲にとどまる中間金の最大額は何万円ですか。</p>
<form data-guided-practice data-expected="120" data-guided-hint="代金の5％を求め、受領済み160万円を差し引きます。" aria-labelledby="guided-tk-advance-title" aria-describedby="guided-tk-advance-prompt" data-lesson-screen-only>
<fieldset hidden><legend>練習の答え</legend><label for="guided-tk-advance-input">今回の最大額（万円）</label> <input id="guided-tk-advance-input" name="answer" class="guided-number" type="text" inputmode="numeric" maxlength="18" autocomplete="off"><div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div></fieldset><p role="status" data-guided-feedback></p></form>
<details><summary>解答と考え方を読む</summary><p data-guided-solution>5,600×0.05＝280万円、280－160＝120万円です。中間金120万円なら累計280万円で5％ちょうど、1,000万円以下でもあります。これを1万円でも超えると、この金額による除外条件を失います。</p></details></section>

## 自分で解く　「手付」と「手付金等」を区別する

代金3,000万円の未完成物件で、手付金500万円を受け取る予定です。「手付は20％の600万円以下なので、保全なしで受領できる」という売主の説明を点検してください。登記等の他の除外はありません。

<details><summary>解答と理由</summary><p>手付20％の受領上限と、手付金等保全の5％基準を混同しています。未完成の5％は150万円で、500万円はこれを超えます。したがって所定の措置を講じてから受領する必要があります。20％以下であることは手付額の規制についての一つの条件で、保全義務をなくす事実にはなりません。必要な保全がなければ買主はこの支払いを拒めます。</p></details>

## まとめ

契約時の完成状態、対象となる金銭、受領済みを含めた累計、割合、1,000万円、登記等の除外、受領前の措置という順で確認します。判定に使った数字を式へ戻し、どちらの金額条件を超えたかまで説明してください。


## 根拠を確認する

この章の法令基準日は2026年4月1日、参照資料の確認日は2026年11月21日です。[宅地建物取引業法35・39・41・41条の2・78条2項](https://laws.e-gov.go.jp/law/327AC1000000176)と[国土交通省「解釈・運用の考え方」2026年4月1日版](https://www.mlit.go.jp/totikensangyo/const/content/001881261.pdf)を参照しています。
