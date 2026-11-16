---
{
  "stableId": "ip-resource-planning",
  "qualification": "it-passport",
  "title": "工程表と人員配置：同じ担当者の作業が重なるとき",
  "description": "工程表では並行に見える作業を、担当者、資格、期限、応援費用から組み直します。ITパスポートのプロジェクト管理を例題で学びます。",
  "order": 21,
  "minutes": 80,
  "sample": false,
  "updated": "2026-11-16",
  "unit": 10,
  "syllabus": [
    27
  ],
  "objectives": [
    "先行作業と担当者の空きの両方を使って各作業の開始日を決める",
    "応援の条件、費用、期限を照合して実行可能な案を選ぶ",
    "進捗報告とリスク対策を、判断期限と費用・品質への影響まで具体化する"
  ],
  "prerequisite": "「プロジェクト管理とクリティカルパス」と「工程計画の読解演習」を学んでから進みます。先行作業と後続作業の関係を振り返ります。",
  "keywords": [
    "ITパスポート 人的資源 配置",
    "工程計画 ガントチャート",
    "クリティカルパス 人員制約",
    "プロジェクト リスク対応",
    "作業の依存関係"
  ],
  "glossary": [
    {
      "term": "資源の制約",
      "definition": "各時点で使える人員、設備、時間などの上限。この章では同じ担当者を同時に二つの作業へ割り当てられないことを含みます。"
    },
    {
      "term": "作業の依存関係",
      "definition": "ある作業の開始や終了が、別の作業の結果や時期に左右される関係。"
    },
    {
      "term": "基準計画",
      "definition": "合意した納期、費用、作業範囲などをまとめ、後から状況を比較するために残した計画。必要な変更は承認手続を経ます。"
    },
    {
      "term": "対応を始める条件",
      "definition": "納期に影響する状況が実際に近づいたと分かるよう、日付や進捗などで決めた目安。担当者と対応方法をあらかじめ決めます。"
    }
  ],
  "inlineGlossary": [
    {
      "id": "resource-limit",
      "term": "資源の制約",
      "definition": "各時点で使える人員、設備、時間などの上限。この章では同じ担当者を同時に二つの作業へ割り当てられないことを含みます。"
    },
    {
      "id": "task-dependency",
      "term": "作業の依存関係",
      "definition": "ある作業の開始や終了が、別の作業の結果や時期に左右される関係。"
    },
    {
      "id": "plan-baseline",
      "term": "基準計画",
      "definition": "合意した納期、費用、作業範囲などをまとめ、後から状況を比較するために残した計画。必要な変更は承認手続を経ます。"
    },
    {
      "id": "risk-trigger",
      "term": "対応を始める条件",
      "definition": "納期に影響する状況が実際に近づいたと分かるよう、日付や進捗などで決めた目安。担当者と対応方法をあらかじめ決めます。"
    }
  ]
}
---

## 工程表にある並行作業を、人員の条件で見直す

別々の作業が同じ日に始められるかどうかには、二種類の条件があります。一つは、必要な成果物を前の作業から受け取れることです。たとえば対象の画面が決まる前に、操作方法を検証することはできません。この順序の条件が<a class="lesson-term" data-lesson-term href="#lesson-term-task-dependency">作業の依存関係</a>です。

もう一つは、その仕事を担当できる人や設備が空いていることです。同じ人が一日に一つの仕事にしか従事できなければ、先行作業が済んでいても、その人を二つの仕事に同時に割り当てられません。この上限が<a class="lesson-term" data-lesson-term href="#lesson-term-resource-limit">資源の制約</a>です。前の章で最長経路から求めた最短期間は、同時に進められるという条件の下での値です。人員が足りなければ、作業の開始日をずらします。

<span id="resource-feasibility"></span>

## 先に終える仕事と担当者の空きの両方を読む

社内の申込画面を初めて使う人のために、手順書を作ります。1人は1日1作業を担当し、作業の途中で担当者を替えません。前の作業が終わった翌日から後続作業を始めます。休日は考えません。表の条件を見て、いつ公開できるかを計算します。

<figure id="ip-resource-planning-requirements"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="ip-resource-planning-requirements-caption"><table><thead><tr><th scope="col">作業</th><th scope="col">開始に必要な作業</th><th scope="col">日数</th><th scope="col">担当条件</th></tr></thead><tbody><tr><th scope="row">A　対象を決める</th><td>なし</td><td>1</td><td>稲葉</td></tr><tr><th scope="row">B　画面の操作を検証</th><td>A</td><td>3</td><td>石井または応援の野村</td></tr><tr><th scope="row">C　入力の例を検証</th><td>A</td><td>2</td><td>石井</td></tr><tr><th scope="row">D　手順書の表記を整える</th><td>A</td><td>2</td><td>稲葉</td></tr><tr><th scope="row">E　確認して公開する</th><td>B・C・D</td><td>1</td><td>稲葉</td></tr></tbody></table></div><figcaption id="ip-resource-planning-requirements-caption">手順書を公開するまでの作業。所要日数はそれぞれの作業に必要な稼働日です。</figcaption></figure>

Aを1日目に終えると、前の作業だけを見た場合はB・C・Dを2日目に始められます。3日かかるBは4日目に終わり、確認と公開のEは5日目になります。ところが、野村に応援を依頼しなければ、BとCを担当できるのは石井だけです。石井がBを2〜4日目に行うなら、Cに取りかかれるのは5日目。Cが6日目までかかるため、Eは7日目になります。

BとCの順序を入れ替えると、Cは2〜3日目、Bは4〜6日目で、Eはやはり7日目です。BとCはそれぞれ単独で見ると別の経路にありますが、石井一人に3＋2＝5日分の仕事が集まっています。順序を変えても、担当者の負担そのものは減りません。

<figure id="ip-resource-planning-schedule"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="ip-resource-planning-schedule-caption"><table><thead><tr><th scope="col">作業</th><th scope="col">先行関係だけの案</th><th scope="col">応援なし</th><th scope="col">応援あり</th></tr></thead><tbody><tr><th scope="row">A</th><td>1日目</td><td>1日目</td><td>1日目</td></tr><tr><th scope="row">B</th><td>2〜4日目</td><td>2〜4日目</td><td>2〜4日目（野村）</td></tr><tr><th scope="row">C</th><td>2〜3日目</td><td>5〜6日目</td><td>2〜3日目（石井）</td></tr><tr><th scope="row">D</th><td>2〜3日目</td><td>2〜3日目</td><td>2〜3日目</td></tr><tr><th scope="row">E</th><td>5日目</td><td>7日目</td><td>5日目</td></tr></tbody></table></div><figcaption id="ip-resource-planning-schedule-caption">同じ先行関係でも、担当者の空きで日程が変わります。日番号の範囲は両端を含みます。</figcaption></figure>

日程を確かめるときは、作業ごとに前の作業が終わる日を書き、担当者ごとにも使う日を並べます。どちらか片方の表だけを見ると、「Aは終了したが担当者が空いていない」という状況を見落とします。最後に、どの作業がすべて終わるまで公開できないかを確認します。

<span id="resource-alternatives"></span>

## 応援を頼む日は、必要な技能と費用で決める

野村はBを担当でき、1日2万円で3日間応援できます。Cを任せて石井を空ける案は、野村がCの担当条件を満たさないので候補から外れます。野村にBを任せる場合は、石井がCを2〜3日目、稲葉がDを2〜3日目に進められます。野村が2日目から働けばBは4日目に終わり、5日目にEを行えます。

期限が6日目、応援費用の上限が6万円なら、野村が2日目からBを行う案は両方を満たします。3日目からならBは5日目に終わり、6日目に公開できるため、この条件でも間に合います。4日目からでは7日目の公開です。同じ費用でも開始日によって効果が変わります。

<figure id="ip-resource-planning-decisions"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="ip-resource-planning-decisions-caption"><table><thead><tr><th scope="col">案</th><th scope="col">公開日</th><th scope="col">応援費用</th><th scope="col">結論</th></tr></thead><tbody><tr><th scope="row">応援なし</th><td>7日目</td><td>0円</td><td>期限に間に合わない</td></tr><tr><th scope="row">野村が2日目からBを担当</th><td>5日目</td><td>6万円</td><td>期限と費用を満たす</td></tr><tr><th scope="row">野村が4日目からBを担当</th><td>7日目</td><td>6万円</td><td>期限に間に合わない</td></tr></tbody></table></div><figcaption id="ip-resource-planning-decisions-caption">6日目までに公開し、追加費用6万円以下に収めるときの比較。</figcaption></figure>

手順書の品質を守るためにEを必ず1日確保すると決めたなら、期限に間に合わないときもEを勝手に削れません。応援が得られないまま6日目へ近づいたら、許容できる対象範囲を確認して依頼者と相談します。期限、対象、品質のどれを変えるかは、担当者が自分で置き換えてよい条件ではありません。

<span id="resource-risk-report"></span>

## 見積りと実績の差を、判断できる形で報告する

依頼者と合意した期日や対象を<a class="lesson-term" data-lesson-term href="#lesson-term-plan-baseline">基準計画</a>として残しておくと、予定と現状を比べられます。進捗報告に「順調でない」とだけ書いても、依頼者は何を決めればよいか分かりません。例題では、応援の返事を待つ間も石井は2日目からCを進めます。そのうえで「野村の確保が3日目の開始に間に合わなければ、従来の体制では公開は7日目。追加6万円で3日目からBを担当できれば6日目。対象や品質は変更しない」と、判断期限と影響を示します。

「3日目の開始までに野村を確保できたか」は、<a class="lesson-term" data-lesson-term href="#lesson-term-risk-trigger">対応を始める条件</a>として使えます。可能性の段階で代替案を考えておき、該当したら計画した対応に移ります。例えば、事前の交代要員確保は遅れの可能性を小さくする軽減策です。日程を論じるときは、誰が確認し、いつ依頼者へ連絡し、どの範囲で変更を承認するかまで決めておきます。

<section class="guided-lesson" id="guided-ip-resource-planning" aria-labelledby="ip-resource-planning-guided-title">
<h2 id="ip-resource-planning-guided-title">途中で確認　必要な応援をいつから確保するか</h2>
<p id="ip-resource-planning-guided-prompt">公開を6日目までに終える必要があります。野村がBだけを3日間担当し、ほかの作業は本文の条件と同じです。野村の最も遅い開始日を数字で答えてください。</p>
<form data-guided-practice data-expected="3" data-guided-hint="Eの1日を期限の日に取り、Bの完了をその前日までに置きます。" aria-labelledby="ip-resource-planning-guided-title" aria-describedby="ip-resource-planning-guided-prompt" data-lesson-screen-only>
<fieldset hidden><legend>自分で答える</legend><label for="ip-resource-planning-guided-answer">答え（日目）</label><input class="guided-number" type="text" inputmode="numeric" id="ip-resource-planning-guided-answer" autocomplete="off"><button type="submit" class="button secondary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></fieldset>
<p role="status" data-guided-feedback></p></form>
<details><summary>答えと確認方法を読む</summary><p data-guided-solution>6日目にEを行うので、Bは5日目までに終える必要があります。野村のBは3日間なので3・4・5日目を使います。石井のCと稲葉のDは2〜3日目に終わり、Eを待たせません。</p></details>
</section>

## 総合演習　希望する期限と実際の費用から案を選ぶ

新しい問題です。対象決めを初日に行い、同じ担当者の検証PとQがそれぞれ4日、2日かかります。両方が終わった翌日に別の担当者が公開します。公開は7日目まで。応援者はPだけを担当でき、4日目から空き、1日1万円です。費用4万円までなら承認可能です。期限と費用を同時に満たすかを調べてください。

<details><summary>解答と検算を読む</summary><p>応援なしではPとQの合計6日を2〜7日目に行うので、公開は8日目。応援者が4日目からPを行うと4〜7日目にかかり、Qが早く終わっても公開は8日目です。費用4万円は上限内ですが、期限は満たせません。Pを応援者に任せるなら、遅くとも3〜6日目に作業をする必要があります。応援の空きが変わらなければ、期限の変更などを依頼者と相談します。</p></details>

## 参考資料

- [IPA「ITパスポート試験」シラバス Ver.6.5（項目27 プロジェクトマネジメント）](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf)。人員配置、日程、進捗報告に関する活用例を2026年11月16日に確認しました。本章の設定・日程・費用は独自の例です。
