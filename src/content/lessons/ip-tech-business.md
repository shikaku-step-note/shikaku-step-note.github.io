---
{
  'stableId': 'ip-tech-business',
  'qualification': 'it-passport',
  'title': '技術戦略とビジネスシステム',
  'description': '技術ロードマップと研究開発を説明する。事業に合うシステムの役割を選ぶ。具体例と理解度チェックで学ぶITパスポートの無料レッスンです。',
  'order': 12,
  'minutes': 90,
  'sample': false,
  'updated': '2026-11-16',
  'unit': 4,
  'syllabus': [13, 14],
  'objectives': ['技術ロードマップと研究開発を説明する', '事業に合うシステムの役割を選ぶ'],
  'prerequisite': '直前の「マーケティングと経営管理システム」を学習済みだと進めやすくなります。各用語は本文でも説明します。',
  'keywords': ['PoC', '技術ロードマップ', 'オープンイノベーション', 'POS'],
  'glossary':
    [
      { 'term': 'PoC', 'definition': '限定した環境などで技術や構想の実現可能性を検証する取組。' },
      {
        'term': '技術ロードマップ',
        'definition': '市場や製品と技術の発展・導入計画を時間軸で整理したもの。',
      },
      {
        'term': 'オープンイノベーション',
        'definition': '組織外の知識や技術も取り込み、新たな価値を生む取組。',
      },
      { 'term': 'POS', 'definition': '販売時点の商品や数量等の情報を収集する仕組み。' },
    ],
  "inlineGlossary": [
    {"id": "poc", "term": "PoC"},
    {"id": "technology-roadmap", "term": "技術ロードマップ"},
    {"id": "open-innovation", "term": "オープンイノベーション"},
    {"id": "pos", "term": "POS"},
    {"id": "mot", "term": "MOT", "definition": "技術経営（Management of Technology）です。技術を育て、製品やサービスを通じて事業の成果につなげる考え方です。"},
    {"id": "wms", "term": "WMS", "definition": "倉庫管理システム（Warehouse Management System）です。入出庫や在庫の場所と数量を管理します。"}
  ],
}
---

## 技術を事業の目的につなぐ

技術戦略は、どの技術をいつ育て、何の価値へ結び付けるかを考える活動です。<a class="lesson-term" data-lesson-term href="#lesson-term-technology-roadmap">技術ロードマップ</a>は市場・製品・技術の関係を時間軸で整理します。研究開発（R&D）は不確実性を伴い、研究成果がすぐ売上になるとは限りません。<a class="lesson-term" data-lesson-term href="#lesson-term-poc">PoC</a>は限定した条件で実現可能性などを検証する取組で、本番運用の品質保証そのものではありません。

## 新しい技術をどう生かすか

イノベーションには製品の改善、工程の変革、事業モデルの変更などがあります。<a class="lesson-term" data-lesson-term href="#lesson-term-open-innovation">オープンイノベーション</a>は外部の知識や技術も活用します。<a class="lesson-term" data-lesson-term href="#lesson-term-mot">MOT</a>は技術を経営に結び付ける考え方です。特許の確保、他社権利の確認、標準化への参加、開発か調達かの選択も戦略に関係します。

## 分野別の業務システム

流通では<a class="lesson-term" data-lesson-term href="#lesson-term-pos">POS</a>が販売時点の情報を集め、物流では<a class="lesson-term" data-lesson-term href="#lesson-term-wms">WMS</a>が倉庫管理を支援します。金融ではFinTechやキャッシュレス決済、保険ではInsurTechなど、ITと既存業務の組合せが見られます。公共分野では電子行政、医療では電子カルテなどが使われます。RPAは定型操作の自動化に役立ちますが、業務の例外や権限、誤った処理の大量実行を管理する必要があります。

## 例：画像検査の導入

最初に不良品を見逃す影響と検査速度の目標を決め、PoCで画像と判定精度を確認します。その後、現場の照明変化、保守、人の最終判断、個人情報等を含む運用を設計します。小規模な検証で動いたことと、全工場で安全に使えることは別です。

## まとめ

技術の新しさではなく、目的、実現可能性、運用上の責任をつなげて評価します。

## 研究成果を商品化する判断

物流会社が冷蔵品の温度予測を研究しています。研究段階では予測できるかを調べ、開発段階ではセンサーと業務を結び付けます。事業化では、どの顧客が費用を払うか、設置と保守にいくら掛かるかを確かめます。技術が動いたことは必要な証拠ですが、それだけで市場や採算は確かめられません。研究、開発、商品化の間に異なる判断があるという見方が役に立ちます。

技術ロードマップに「2年後に低消費電力版」と書くなら、必要な電池寿命、機器価格、実地試験、量産時期を関連付けます。開発期間を短くするため、無線部品を共同開発する案と購入する案を比べる場合は、性能、権利、量産供給、継続保守の条件を同じ軸で比較します。知財や設備を外部と組み合わせて価値を作るオープンイノベーションでも、成果物の権利や秘密の扱いは事前に決めます。

事業側では、センサーが売れた数だけでなく、継続利用や廃棄の減少を見ます。測定精度が上がっても、現場が通知を確認できなければ価値につながりません。試作の評価では、動作条件に加え、利用者がどの判断を改善できたかを観察します。

<details><summary>試作品の精度が高い。すぐ量産してよい？</summary><p>技術面の証拠に加え、利用場面、費用、供給能力、顧客価値を調べて段階の判断をします。</p></details>

<span id="depth-tech-business"></span>

## 実証で確かめることと、事業で成立する条件を分ける

### 技術の成熟と、利用者に届ける仕組みを同じ計画に載せる

食品工場向けの画像検査装置を作ります。光の反射で検出精度が下がる課題に対し、研究段階では撮影方法を変えて原因を調べます。技術開発では搬送速度で必要な画像を処理できるか、温度や原料が変わっても精度を維持できるかを試作で確認します。製品化には、装置の交換部品、校正方法、問い合わせ窓口、納入先への設定手順が必要です。実験室で測定できたという事実は、工場へ毎日提供できるという証明にはなりません。

技術ロードマップには、例えば『照明方式の実証』『連続運転』『現場への試験設置』『保守体制を含む発売』の順と判定条件を置きます。発売予定だけを書いた日程表では、技術課題が残ったままでも日付だけが来てしまいます。PoC（概念実証）で二つの照明を比較するなら、正しく判定できる割合のほか、見逃しと誤検知の負担も確認します。基準を先に決め、見逃しを減らすために誤検知が増えたときに、目視確認の負荷を許容できるか考えます。

<figure id="ip-tech-business-existing-visual"><svg viewBox="0 0 400 189" width="400" height="189" style="max-width:100%;height:auto" role="img" aria-label="概念実証、反射しても欠陥を見分けられるか。現場で試作を評価、搬送速度と昼夜条件で再現するか。導入後の運用を設計、校正、交換部品、窓口を用意"><g fill="currentColor" text-anchor="middle" font-size="16"><rect x="13" y="4" width="374" height="49" rx="6" fill="currentColor" fill-opacity=".08" stroke="currentColor"/><text x="200" y="24" font-weight="bold">概念実証</text><text x="200" y="43">反射しても欠陥を見分けられるか</text><path d="M200 53v9m-4-5 4 5 4-5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="67" width="374" height="49" rx="6" fill="currentColor" fill-opacity=".08" stroke="currentColor"/><text x="200" y="87" font-weight="bold">現場で試作を評価</text><text x="200" y="106">搬送速度と昼夜条件で再現するか</text><path d="M200 116v9m-4-5 4 5 4-5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="130" width="374" height="49" rx="6" fill="currentColor" fill-opacity=".08" stroke="currentColor"/><text x="200" y="150" font-weight="bold">導入後の運用を設計</text><text x="200" y="169">校正、交換部品、窓口を用意</text></g></svg><figcaption>画像検査を事業化するには、実験で測る条件から、現場で維持できる条件へと確かめる範囲を広げます。</figcaption></figure>

### 自社で開発する範囲と、外部と協力する範囲を決める

装置メーカーには顧客の現場知識があり、大学には光学の知見があります。大学と共同で測定方法を開発すれば、外部の知識を取り込むオープンイノベーションに当たります。共同研究を始める前に、既存の技術と新しい研究成果、学会で発表できる情報、製品に利用できる範囲を整理します。最初に何も決めないと、公開と特許出願の時期がぶつかったり、製品化に必要な利用条件がそろわなかったりします。

同じ工場でも、機器の画像判定、受注と在庫の同期、配送車の位置記録は異なる業務です。画像判定にAIを用いるときは、判定の根拠をどこまで説明するか、人が再確認する例外をどう選ぶかを決めます。固定ルールで受注データを転記するだけならRPAも候補ですが、入力画面が変わると誤処理するため監視や例外処理が必要です。AIを導入すること自体を目標にせず、必要な判断が規則で書けるか、判断の誤りにどんな負担があるかを先に確認します。

<span id="public-system-application"></span>

### 部門ごとに同じ住所を入力する問題を解く

ある市で、設備点検、施設予約、避難所案内のシステムが、同じ施設を別々の名称や住所で記録しています。一つの施設に施設IDを割り当て、名称や所在地の元になるデータを管理すれば、各業務はIDで同じ施設を参照できます。信頼できる基礎データを整備するベースレジストリの発想です。各部門の予約履歴や点検記録まで一つの公開データにまとめる必要はありません。共通に管理する基礎データと、個別業務が管理するデータを分け、更新責任と公開・閲覧の範囲を定めます。

クラウドを共用する施策を導入しても、同じ施設をどう識別するかまでは自動で決まりません。ガバメントクラウドは行政システムのクラウド利用に関わる基盤の考え方であり、施設名や住所を一致させるためのデータ設計とは役割が異なります。共用環境を選ぶ場合も、誰が設定と運用を担い、データをどの条件で移行できるかを確認します。実際の施策の概要は[デジタル庁のベース・レジストリの案内](https://www.digital.go.jp/policies/base_registry)と[ガバメントクラウドの案内](https://www.digital.go.jp/policies/gov_cloud)を参照できます。

出題範囲の参照：[IPA ITパスポート試験シラバス Ver.6.5（本文17〜19ページ）](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf)。

<span id="textbook-tech-business"></span>

## 実験の成功から事業化までの条件を順に確認する

店舗の廃棄食品を画像で分類する技術を考えます。少量の画像で分類できても、照明や容器が変わる実店舗で精度が保てるか、誰が誤分類を訂正するか、機器故障時に手作業へ戻れるかは分かりません。技術の検証、製品としての設計、継続して提供する事業の検証を分けます。技術ロードマップでは、試作、実店舗の比較試験、導入判断を日付と条件で結びます。試作の終了を本番移行の条件にせず、想定外の条件も検証します。

### 例題：開発形態を選ぶ

技術は自社の強みですが、現場の画像は店舗側が持っています。単独開発では利用条件を決めるまでデータを得にくいので、共同実証を検討します。実証の目的、データの利用範囲、成果の知的財産、撤退時の取扱いを事前に合意します。他社の技術や知見を活用して事業化を進めるのはオープンイノベーションの考え方です。実験後の追加投資が大きいなら、技術・需要・維持費の確認を節目ごとに行います。

システムを公共サービスに使う場合は、利用できない人への代替手段、判断の説明、苦情の扱い、個人情報の管理を設計します。精度が全体で高くても、特定の店舗や利用条件で誤りが多ければ、導入を広げる前に原因を調べます。

| 判断の節目 | 確かめること |
| --- | --- |
| 試作 | 限られた画像で分類できるか |
| 実店舗試験 | 照明や容器の違いで誤りが変わるか |
| 導入判断 | 誤りの訂正、代替作業、費用の条件を満たすか |

<span id="textbook-tech-business-transfer"></span>

### 候補を選ぶため、検証から導入へ条件を引き継ぐ

販売予測を導入するとき、検証に使った店舗以外でも同じ季節や商品群を扱えるかを確認します。予測値だけでなく、その値を発注に使った結果を評価します。誤差が小さくても生鮮品の過剰発注が増えれば、廃棄が増えることがあります。逆に欠品だけを減らす条件では、在庫を多めにすれば目標を達成できてしまいます。欠品と廃棄の両方を記録し、従来の発注と同じ期間や条件で比較します。

<span id="textbook-tech-business-systems"></span>

### 社会の事業を支えるシステムの役割を区別する

バスの現在位置を地図に表示するサービスを考えます。位置を送る車載機器は情報の収集を担当し、位置と路線を地図に重ねるサービスが案内に使われます。位置データを地図上で管理・分析するのがGISの利用例です。到着時刻の予測や運行管理は、情報通信を交通に活用するITSの例にもなります。何を扱う技術かを問われたら、地理情報の処理を説明しているのか、交通全体の課題を説明しているのかに注目します。

別の例で、行政サービスの申請を電子化しても、紙で申請した人の進捗が別台帳に残ると問い合わせ対応が難しくなります。窓口受付と電子受付に共通の申請番号を使い、審査状況を同じ仕組みで扱います。利用者に通知する情報と、審査担当者だけが見られる情報も分けます。

<span id="ip-tech-business-decision-section"></span>

## 試作を通過した技術に、次の条件を追加して判断する

技術を事業にするときは、原理の確認、実際の環境での検証、利用者へ届け続ける計画の順に条件を増やします。実証で目的は果たせたか、現場で使える条件はそろったか、運用の費用と担当を決められたかを分けると、どこまで確かめれば次の投資に進めるかが明確になります。技術ロードマップには時期だけでなく、次の段階に進める判断の根拠も載せます。

<figure id="ip-tech-business-worked-decision">
<figcaption id="ip-tech-business-worked-decision-caption">遠隔点検の試験に置いた判断条件</figcaption>
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-tech-business-worked-decision-caption">
<table>
  <thead><tr><th scope="col">段階</th><th scope="col">先に確認すること</th><th scope="col">例で得た結果</th></tr></thead>
  <tbody>
    <tr><th scope="row">試作</th><td>異常を見つけ、担当に通知する</td><td>室内の試験で通知できた</td></tr>
    <tr><th scope="row">実証</th><td>実際の現場で、所定の時間内に通知する</td><td>正常時は達成したが、通信断の結果は未確認</td></tr>
    <tr><th scope="row">運用移行</th><td>保守の担当、更新、費用を決める</td><td>担当の候補はあるが、費用と支援時間は未確定</td></tr>
  </tbody>
</table>
</div>
</figure>

室内で通知に成功しても、通信が途切れた現場で異常を見逃す可能性が残ります。実証では通信が途切れる条件を追加し、復帰後に遅れて通知できるか、現場には代替の連絡手段があるかを確認します。その後、どの異常を誰が確認し、保守に費用がいくら掛かるかを決めます。保守に強い外部事業者へ一部を委ねる場合も、通知の手順と情報を渡す範囲を先に合意してから契約へ進みます。

<section class="guided-lesson" id="ip-tech-business-guided-transfer" aria-labelledby="ip-tech-business-guided-transfer-title">
<h3 id="ip-tech-business-guided-transfer-title">条件を変えて確かめる</h3>
<p id="ip-tech-business-guided-transfer-prompt">実際の現場で通信が正常なときだけ通知できました。来週に確認すべきことはどれですか。</p>
<form data-guided-practice data-expected="1" data-guided-hint="実証の条件は正常時だけではありません。表で結論が確定していない箇所を探します。" aria-labelledby="ip-tech-business-guided-transfer-title" aria-describedby="ip-tech-business-guided-transfer-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>練習の答え</legend>
<label for="ip-tech-business-guided-transfer-1"><input type="radio" id="ip-tech-business-guided-transfer-1" name="answer" value="1"> 通信が切れて復帰する条件で通知の扱いを確認する</label><br>
<label for="ip-tech-business-guided-transfer-2"><input type="radio" id="ip-tech-business-guided-transfer-2" name="answer" value="2"> 試作の担当を先に全員解散する</label><br>
<label for="ip-tech-business-guided-transfer-3"><input type="radio" id="ip-tech-business-guided-transfer-3" name="answer" value="3"> 既に正常時を確認したので全拠点へ展開する</label><br>
<div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details>
<summary>解答と考え方を読む</summary>
<p data-guided-solution>通信が途切れる状況で、通知が遅れるか、失われるか、別手段が使えるかを確かめます。検証結果をそろえて展開範囲を決めます。</p>
</details>
</section>

<span id="ip-tech-business-decision-independent"></span>

### 自分で判断する

第三者の試験装置を使えば検証は半年早まりますが、保守契約がないため翌年は使えません。装置自体の機能は適合しているとします。何を確認してから事業計画へ進みますか。

<details><summary>考え方と答えを確認する</summary><p>保守と更新を誰が担い、翌年も調達できるかを確認します。その装置がない場合の代替案も計画に入れます。機能の合格は、継続して利用者へサービスを届けられるという確認とは別です。</p></details>
