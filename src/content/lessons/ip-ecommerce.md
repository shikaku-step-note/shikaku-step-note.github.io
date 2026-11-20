---
{
  'stableId': 'ip-ecommerce',
  'qualification': 'it-passport',
  'title': 'eビジネスとデジタルサービス',
  'description': '取引の組合せと事業モデルを区別する。電子商取引の指標を計算する。具体例と理解度チェックで学ぶITパスポートの無料レッスンです。',
  'order': 14,
  'minutes': 95,
  'sample': false,
  'updated': '2026-11-20',
  'unit': 5,
  'syllabus': [16],
  'objectives': ['取引の組合せと事業モデルを区別する', '電子商取引の指標を計算する'],
  'prerequisite': '直前の「生産・設計とIoTシステム」を学習済みだと進めやすくなります。各用語は本文でも説明します。',
  'keywords': ['BtoC', 'サブスクリプション', 'CVR', 'CPA'],
  'glossary':
    [
      { 'term': 'BtoC', 'definition': '企業と一般消費者の間で行われる取引。' },
      { 'term': 'サブスクリプション', 'definition': '継続的な利用などに対して定期的に料金を支払う方式。' },
      { 'term': 'CVR', 'definition': '訪問など定義した母数に対し、購入等の成果に至った割合。' },
      { 'term': 'CPA', 'definition': '広告費を成果件数で割って求める、成果1件当たりの獲得費用。' },
    ],
  "inlineGlossary": [
    {"id": "btoc", "term": "BtoC"},
    {"id": "subscription", "term": "サブスクリプション"},
    {"id": "cvr", "term": "CVR"},
    {"id": "cpa", "term": "CPA"},
    {"id": "ctr", "term": "CTR", "definition": "クリック率（Click-Through Rate）です。広告などが表示された回数のうち、クリックされた回数の割合を指します。"},
    {"id": "freemium", "term": "フリーミアム", "definition": "基本機能を無料で提供し、追加の機能や容量などを有料にする仕組みです。"}
  ],
}
---

## 誰と誰が取引するか

**電子商取引（EC）**は、インターネットなどのネットワークを通じて行う商取引です。画面の運営者だけを見ると、実際に商品を売る人や、代金を受け取る人を取り違えることがあります。まず、契約の当事者を確認します。

企業同士の取引がBtoB、企業と消費者の取引が<a class="lesson-term" data-lesson-term href="#lesson-term-btoc">BtoC</a>、消費者同士の取引がCtoCです。「B」はBusiness、「C」はConsumerを表します。たとえば個人が不要品を別の個人へ売る場では、アプリの運営会社が企業であっても、商品の売買の当事者は個人同士です。

次に、注文を受ける人、支払を処理する人、品物を引き渡す人をたどります。注文の記録があるだけでは、代金の決済や発送が済んだとは判断できません。返金を求める窓口と実際に返金処理を行う者が違う場合もあるため、業務の状態と責任を分けて記録する必要があります。

## 収益の仕組みを比較する

サービスの料金方式を比べるときは、何に対して、いつ料金を受け取るかを確認します。<a class="lesson-term" data-lesson-term href="#lesson-term-subscription">サブスクリプション</a>は、一定期間の継続利用などに対し、定期的に支払ってもらう仕組みです。利用回数に関係なく月額を払う方式なら、単発の購入とは解約や継続の判断が異なります。

<a class="lesson-term" data-lesson-term href="#lesson-term-freemium">フリーミアム</a>は、基本機能を無料で提供し、追加の機能や価値を有料にする方式です。無料利用者が増えても、有料の価値を選ぶ人がいなければ、その人数だけで売上は決まりません。シェアリングエコノミーでは、使われていない設備や部屋などの利用機会を、必要とする相手につなぎます。所有する者、利用する者、仲介する者の役割を読むと区別できます。

一部の人気商品だけでなく、販売数の少ない多数の商品を合わせると大きな市場になり得るという見方がロングテールです。電子商取引では売場の面積に制約されにくい場合があり、幅広い商品を扱う機会が生まれます。一方、保管や検索、配送には費用がかかるため、品数の増加がそのまま利益増になるとは限りません。

プラットフォームでは、利用者が増えることによって、他の利用者にとっての価値も高まるネットワーク効果が働く場合があります。売り手が増えると買い手の選択肢が増え、買い手が増えると売り手が参加する理由も増える関係などです。その効果と、手数料・運営費用を踏まえた収益性を分けて考えます。

## 広告と購入の指標

<a class="lesson-term" data-lesson-term href="#lesson-term-ctr">CTR</a>はクリック数÷表示回数、<a class="lesson-term" data-lesson-term href="#lesson-term-cvr">CVR</a>は購入等の成果数÷訪問等の母数です。何を母数とするかは必ず定義します。<a class="lesson-term" data-lesson-term href="#lesson-term-cpa">CPA</a>は広告費÷成果数です。SEOは検索から見つけてもらうための技術・内容の改善、SEMは検索を通じたマーケティングを指す文脈で使われます。検索順位や成果を保証するものではありません。

<span id="ip-ecommerce-source-reasoning"></span>

## 広告から購入までの各段階で、分母をそろえる

ネットの広告を評価するときは、表示、クリック、購入の順に人数や件数を追います。この例では、同じ広告が複数回クリックされる場合の重複はなく、一回の購入が一件の成果です。購入後の返金は、広告の成果を最初に数えた後に判明したとします。

<figure id="ip-ecommerce-source-table">
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-ecommerce-source-caption">
<table>
<caption id="ip-ecommerce-source-caption">広告の段階ごとの数と、分母の対応</caption>
<thead><tr><th scope="col">段階</th><th scope="col">件数・金額</th><th scope="col">計算する指標</th></tr></thead>
<tbody>
<tr><th scope="row">広告を表示</th><td>20,000回</td><td>クリック率の分母</td></tr>
<tr><th scope="row">クリックから訪問</th><td>400件</td><td>CTR＝400÷20,000＝2％</td></tr>
<tr><th scope="row">購入が確定</th><td>20件</td><td>訪問を分母にしたCVR＝20÷400＝5％</td></tr>
<tr><th scope="row">広告へ支出</th><td>12,000円</td><td>当初のCPA＝12,000÷20＝600円</td></tr>
<tr><th scope="row">購入後に全額返金</th><td>4件</td><td>返金のない購入は16件</td></tr>
</tbody>
</table>
</div>
<figcaption>CTRは表示からクリック、CVRはこの例では訪問から購入へ進んだ割合です。CPAは、どの成果を数えるかで変わります。</figcaption>
</figure>

購入20件を成果と決めた報告なら、CPAは600円です。一方、全額返金された購入を除いた16件を成果とする報告では、12,000÷16＝750円になります。どちらも式の間違いではなく、数えている成果が異なります。施策を比較するときには、購入をいつ確定とし、返金をどの期間へ反映するかもそろえます。

一件の購入から広告費を引く前に800円が残り、返金された分からは何も残らない条件なら、16件の購入から残る額は12,800円です。広告費12,000円を差し引くと800円になります。CPAだけを見ると600円だったため余裕があるように見えても、返金後の利益は小さくなっています。表示やクリックの改善が、最後にどの成果へつながったかを確かめる理由です。

<span id="ip-ecommerce-source-practice"></span>

### 返金件数が違う広告を比べる

同じ広告費12,000円で購入20件を得た別の広告では、全額返金が2件でした。一件当たり800円が残る条件は同じです。返金後の成果当たり費用と、広告費を引いた後の残額を求めてください。端数は計算中に丸めず、成果当たり費用だけ最後に一円未満を四捨五入します。

<details>
<summary>考え方と答えを確かめる</summary>
<p>返金されなかった購入は18件です。成果当たり費用は12,000÷18＝約667円。残額は18×800−12,000＝2,400円です。購入数だけは同じ20件でも、返金まで追うと結果が変わります。</p>
</details>

## 例：広告の効果を確認する

広告費30,000円で100件の購入があればCPAは300円です。表示10,000回、クリック200回ならCTRは2%。訪問200件から購入10件ならCVRは5%です。購入数が増えても返品や粗利益を考えなければ採算は分かりません。不正注文、なりすまし、決済情報の保護、解約条件の明示も運用の一部です。

## 注文、決済、出荷を分けて記録する

通販の注文を受けた後、決済の承認と商品の出荷は別の時点に起きます。注文を保存しただけで入金済みにすると、決済に失敗した商品まで発送しかねません。注文IDと状態を分けて記録し、決済済みの条件を満たしたときだけ出荷に進めます。通信の再送で同じ通知が二度来ても、処理済みIDを見て二度発送しないようにします。

BtoBは企業間、BtoCは企業と消費者、CtoCは消費者同士の取引です。場を提供する会社がいても、売買の当事者が消費者同士であれば、その売買はCtoCとして考えられます。EDIは定型の注文・請求情報を組織間で交換する考え方で、Web画面を人が操作すること自体を指しません。商品番号、単位、取消時の扱いなども取り決めます。

購入のしやすさを改善するときは、注文完了数だけでなく誤注文、取消、問合せも測ります。送料や返品条件を後から表示すると、誤解による離脱が起きます。決済情報の取扱いは必要な範囲に限定し、注文履歴などの保存・閲覧権限を決めます。

<details><summary>同じ決済通知が二回届いた。二件の売上？</summary><p>同じ注文IDかを確認します。同じ決済の再通知なら状態は一度だけ進め、二重出荷を防ぎます。</p></details>

<span id="depth-ecommerce"></span>

## 注文から入金までの状態と責任を追う

### 販売の場、支払の受付、商品の引渡しを分ける

手作り商品の出店者が集まるオンラインモールを考えます。企業が消費者へ売るならBtoC、消費者同士の売買ならCtoCに当たります。モールを提供する会社と、商品を販売する出店者が別の場合もあります。取引の類型はサイト運営者の法人格だけで決めず、実際に誰が誰へ何を売るかを読み取ります。企業が仕入先と受発注データを電子的にやり取りする場合には、BtoBの業務を支えるEDIも使われます。

ある客が商品をカートに入れ、支払画面へ移ります。ここで注文番号が発行されても、決済が確定したとは限りません。決済事業者からの結果と注文番号を対応付け、成功を確認した注文だけを出荷へ回すと、未決済品を発送する誤りを減らせます。通信が途切れて購入者が再操作した場合、以前の決済が成立しているか確認してから再処理します。画面の表示だけを信じ、注文を作り直すと、二重に請求するおそれがあります。

<figure id="ip-ecommerce-existing-visual"><svg viewBox="0 0 400 189" width="400" height="189" style="max-width:100%;height:auto" role="img" aria-label="注文を受け付ける、注文番号を決済情報へ渡す。決済結果を確認する、成功と失敗を分けて記録。成功した注文を出荷する、後で返金・照合できるようにする"><g fill="currentColor" text-anchor="middle" font-size="16"><rect x="13" y="4" width="374" height="49" rx="6" fill="currentColor" fill-opacity=".08" stroke="currentColor"/><text x="200" y="24" font-weight="bold">注文を受け付ける</text><text x="200" y="43">注文番号を決済情報へ渡す</text><path d="M200 53v9m-4-5 4 5 4-5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="67" width="374" height="49" rx="6" fill="currentColor" fill-opacity=".08" stroke="currentColor"/><text x="200" y="87" font-weight="bold">決済結果を確認する</text><text x="200" y="106">成功と失敗を分けて記録</text><path d="M200 116v9m-4-5 4 5 4-5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="130" width="374" height="49" rx="6" fill="currentColor" fill-opacity=".08" stroke="currentColor"/><text x="200" y="150" font-weight="bold">成功した注文を出荷する</text><text x="200" y="169">後で返金・照合できるようにする</text></g></svg><figcaption>受注、決済、出荷は独立して記録し、注文番号で関係付けます。</figcaption></figure>

### 便利な本人確認と、必要以上に集めない設計を両立する

オンラインで口座開設する際、対面せずに本人確認を行う方法がeKYCです。商品レビュー用の表示名と、法令やサービス要件に基づく本人確認は目的が違います。確認が必要な業務では、確認済みという結果と本人確認資料そのものを誰が扱うか、分けて考えます。本人確認の仕組みを採用したからといって、不自然な取引への確認や利用者への説明まで自動的に済むわけではありません。

広告からの購入を評価します。表示10,000回のうちクリック200回、購入12件なら、クリック率は2％、クリック後購入率は6％、表示からの購入率は0.12％です。表示から購入に至る割合は、各段階の率を掛けると0.02×0.06＝0.0012となり、12÷10,000と一致します。広告費6,000円であれば一件当たり広告費は500円です。売上総額と広告費だけでは利益は決まりません。商品の原価や送料も含め、継続に見合うかを考えます。

出題範囲の参照：[IPA ITパスポート試験シラバス Ver.6.5（本文20ページ）](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf)。

<span id="textbook-ecommerce"></span>

## 注文、支払、引渡しの記録を照合する

通販の注文記録と支払サービスの入金記録には別々の識別番号が付くことがあります。両者を注文番号などで対応付けます。商品代金3,000円を受け取り、手数料120円が差し引かれて2,880円が入金された例では、注文3,000円と入金2,880円を比較するだけでは未収と誤判断します。手数料の明細を加えて照合し、返品があれば返金を元の注文に対応付けます。

### 例題：注文履歴に現れた例外を扱う

同じ注文に決済通知が2回届きました。支払サービス側が再送しただけなら出荷は1回です。注文ごとに出荷依頼を一つ記録し、新たに記録できたときだけ後続処理を進めます。金額で重複判定すると、別の顧客が同じ価格の商品を買った場合に片方を誤って止めます。照合キー、通知を受け取った時刻、取消しや返金の状態を分けて記録します。

買い手と売り手を仲介する電子市場、販売者が直接顧客に届けるEC、企業間で受発注を交換するEDIは役割が異なります。金融分野では振込や決済の情報を照合して業務を効率化できますが、例外の判断や権限管理も残ります。

| 照合する記録 | 金額 |
| --- | ---: |
| 注文票の代金 | 3,000円 |
| 決済明細の手数料 | 120円 |
| 銀行の入金額 | 2,880円 |

<span id="textbook-ecommerce-transfer"></span>

### 複数の取引で注文番号と返金をたどる

同じ金額4,000円の注文KとLがあり、Kだけが後日返品されました。決済明細に4,000円の返金があっても金額だけではどちらの注文か特定できません。決済識別番号をもとに元の注文へ戻り、Kの売上と返金を対応させます。未入金、手数料、返金は別の理由で差が生まれるので、それぞれの記録の列を用意します。

<span id="ip-ecommerce-decision-section"></span>

## 注文、入金、返金の状態を別々に確かめる

ECでは、注文を受け付けた記録、支払処理の記録、発送の記録が別々に更新されます。注文番号を手掛かりに記録を照合し、どの部署が次の行動を取るかを決めます。ネットワークが一時的に途切れたり、担当者の処理が遅れたりすると、画面に出る状態が現実の処理より遅れることがあります。再処理する前に、最終的に確定している記録を確認すると、二重請求・二重返金の手直しを減らせます。

<figure id="ip-ecommerce-worked-decision">
<figcaption id="ip-ecommerce-worked-decision-caption">同じ注文について照合する三つの記録</figcaption>
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-ecommerce-worked-decision-caption">
<table>
  <thead><tr><th scope="col">記録</th><th scope="col">状態</th><th scope="col">確認したいこと</th></tr></thead>
  <tbody>
    <tr><th scope="row">注文管理</th><td>利用者が取消しを申請</td><td>取消しを承認したか</td></tr>
    <tr><th scope="row">決済</th><td>返金の受付番号あり・完了は未確定</td><td>元の番号で返金の結果を照会</td></tr>
    <tr><th scope="row">出荷</th><td>倉庫で未出荷</td><td>発送を保留できるか</td></tr>
  </tbody>
</table>
</div>
</figure>

この注文は未出荷なので、まず倉庫へ発送保留の可否を確認します。返金については、決済の受付番号を使って処理結果を確かめます。利用者に知らせるときは、取消しと返金の進み方を区別し、返金結果が確認できる時期を案内します。同じ注文で決済を繰り返すと返金の受付が二件になるおそれがあるため、受付がある場合は結果の照会を先にします。

<section class="guided-lesson" id="ip-ecommerce-guided-transfer" aria-labelledby="ip-ecommerce-guided-transfer-title">
<h3 id="ip-ecommerce-guided-transfer-title">条件を変えて確かめる</h3>
<p id="ip-ecommerce-guided-transfer-prompt">利用者から「返金がまだ見えない」と連絡がありました。表の条件では、最初に何をしますか。</p>
<form data-guided-practice data-expected="2" data-guided-hint="発送と返金は異なる記録です。返金依頼には状態を調べられる番号があります。" aria-labelledby="ip-ecommerce-guided-transfer-title" aria-describedby="ip-ecommerce-guided-transfer-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>練習の答え</legend>
<label for="ip-ecommerce-guided-transfer-1"><input type="radio" id="ip-ecommerce-guided-transfer-1" name="answer" value="1"> 同じ金額をすぐもう一度返金する</label><br>
<label for="ip-ecommerce-guided-transfer-2"><input type="radio" id="ip-ecommerce-guided-transfer-2" name="answer" value="2"> 決済の受付番号を使い、既に依頼した返金の処理結果を確認する</label><br>
<label for="ip-ecommerce-guided-transfer-3"><input type="radio" id="ip-ecommerce-guided-transfer-3" name="answer" value="3"> 倉庫が未出荷なので、返金は完了したと案内する</label><br>
<div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details>
<summary>解答と考え方を読む</summary>
<p data-guided-solution>決済の受付番号を照合して、処理中か完了なのかを確認します。受付が既にあるので、確認前に再処理すると二重の返金につながるおそれがあります。</p>
</details>
</section>

<span id="ip-ecommerce-decision-independent"></span>

### 自分で判断する

倉庫記録は一件が出荷済みですが、決済には同じ注文番号で二件の受付があり、一方だけ入金が確定しています。注文数を集計するときと、実際の入金を修正するときに見る記録はどれですか。

<details><summary>考え方と答えを確認する</summary><p>注文数の集計は注文管理に戻り、一つの注文番号が一件として登録されているか確認します。入金の修正は決済に戻り、確定済みと保留の受付を照合してから処理します。受付が二件あっても、注文と入金が二件と決まるわけではありません。</p></details>

## まとめ

取引相手、収益の流れ、成果の定義を分けて考えます。比率の問題では、分母と単位を最初に確認しましょう。
