---
{
  "stableId": "ip-release-decision",
  "qualification": "it-passport",
  "title": "3分野の総合読解：受入条件と試験記録から導入を判断する",
  "description": "要件文、拠点別の集計、復旧試験の記録を突き合わせ、平均で隠れる未達や、条件の変更で変わる判定を根拠から説明します。",
  "order": 47,
  "unit": 23,
  "minutes": 75,
  "sample": false,
  "syllabus": [2, 23, 25, 28, 63],
  "scopeLabel": "現行の3分野をつなぐコース独自の総合演習",
  "updated": "2026-11-16",
  "objectives": [
    "要件文から、判定対象・測り方・合格となる境界を抜き出す",
    "拠点別の率と全体の率、復旧時間と復元時点を区別して判定する",
    "資料が欠けている場合や対象範囲が変わる場合に、導入判断と次の確認を説明する"
  ],
  "prerequisite": "経営データの読解演習、システム企画、サービス管理、バックアップと復旧を先に学んでおくと進みやすくなります。この章では、判断に必要な率と復旧目標の意味を振り返ります。",
  "keywords": ["ITパスポート 資料問題", "受入条件", "受入試験", "母数", "RTO", "RPO", "3分野 総合読解"],
  "glossary": [],
  "inlineGlossary": [
    {"id": "acceptance-test", "term": "受入試験", "definition": "本番導入の前に、あらかじめ合意した要件を実際の試験記録で確かめる作業です。"},
    {"id": "denominator", "term": "分母", "definition": "割合を出すときに割る側の数です。拠点ごとの失敗率では、同じ拠点・同じ期間の試行総数を使います。"},
    {"id": "rto", "term": "RTO", "definition": "目標復旧時間（Recovery Time Objective）です。中断が起きてから、いつまでに業務やサービスを再開するかを決めた目標です。"},
    {"id": "rpo", "term": "RPO", "definition": "目標復旧時点（Recovery Point Objective）です。障害前のどの時点までのデータを戻す必要があるかを決めた目標です。"}
  ],
}
---

本番前の<a class="lesson-term" data-lesson-term href="#lesson-term-acceptance-test">受入試験</a>では、仕様として約束した条件を、実際の記録で満たせたか確かめます。要件文から先に判断の物差しを取り出すと、報告書にある数字のうち、どれをどの条件と比べるかが決まります。例えば「全体の失敗率」と「各拠点の失敗率」では集計の範囲が異なり、同じ試験記録から違う判定が出ることがあります。

この章は、経営データの割合、システムを受け入れる条件、障害後の復旧を一つの判断にまとめる総合演習です。個別に計算できるようになったら、同じ書面に並ぶ条件を一項目ずつ判定し、導入の可否と次の確認までつなげます。

<span id="objective-1"></span>

## 条件文を「対象・物差し・境界」に分ける

「試行した各拠点で、申込失敗率が3.0％以下である」という一文からは、対象が拠点ごとであること、物差しが失敗率であること、境界が3.0％以下であることを読み取れます。失敗率の<a class="lesson-term" data-lesson-term href="#lesson-term-denominator">分母</a>には、同じ拠点の、同じ期間に試した申込みの総数を使います。すでに申込みに成功した件数で割ると、条件文とは異なる率になります。

「各」「全体」「いずれか」「すべて」のような小さな言葉は、判定の集め方を決めます。「すべて満たす」が条件なら、明らかな未達が一つあれば導入は保留です。全ての項目が測定済みなら確定した判定を出せます。記録が足りない項目があれば、そこは未確認として残しておきます。

<figure id="ip-release-rules">
<figcaption id="ip-release-rules-caption">条件文を読む順番。対象を先に決めると、全体の率を各拠点へ流用する誤りを防げます。</figcaption>
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-release-rules-caption">
<table>
<thead><tr><th scope="col">要件文の手掛かり</th><th scope="col">記録で確認するもの</th><th scope="col">判定の形</th></tr></thead>
<tbody>
<tr><th scope="row">各拠点で失敗率3.0％以下</th><td>拠点ごとの失敗件数と試行総数</td><td>同じ拠点の分子と分母で割り、拠点別に判定</td></tr>
<tr><th scope="row">停止から90分以内に再開</th><td>停止時刻とサービス再開時刻</td><td>再開時刻から停止時刻を引く</td></tr>
<tr><th scope="row">停止前15分までのデータに復元</th><td>停止時刻と復元できたデータの時点</td><td>停止時刻から復元時点を引く</td></tr>
</tbody>
</table>
</div>
</figure>

<span id="worked-1"></span>

### 例題1　境界に一致する記録を判定する

会議室の予約を250回試し、失敗が5件ありました。失敗率の条件は2.0％以下です。5÷250×100＝2.0なので、記録は条件を満たします。250回には成功も失敗も入ります。成功した245回で割ると約2.04％となるため、分母を取り違えるだけで同じ記録の判定が変わります。2.0％×250＝5と掛け戻せば、境界の件数も確認できます。

<span id="objective-2"></span>

## 集計表と復旧記録を、要件文の同じ行に戻す

<span id="worked-2"></span>

### 例題2　平均を満たしていても、未達の条件を説明する

市の相談予約システムを二つの拠点で試しました。導入条件は、各拠点の失敗率は3.0％以下、復旧目標時間（<a class="lesson-term" data-lesson-term href="#lesson-term-rto">RTO</a>）は90分以内、復旧時点目標（<a class="lesson-term" data-lesson-term href="#lesson-term-rpo">RPO</a>）は15分以内の三つです。RTOは停止してから再開するまでの長さ、RPOは停止した時点からどこまでさかのぼるデータを残せるかの目標です。

<figure id="ip-release-evidence">
<figcaption id="ip-release-evidence-caption">記録と条件の照合。全体の行は参考値で、拠点ごとの条件には上の二行を使います。</figcaption>
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-release-evidence-caption">
<table>
<thead><tr><th scope="col">見る記録</th><th scope="col">試行・時刻</th><th scope="col">途中の計算と判定</th></tr></thead>
<tbody>
<tr><th scope="row">北拠点</th><td>1,200回中30件が失敗</td><td>30÷1,200×100＝2.5％。達成。</td></tr>
<tr><th scope="row">南拠点</th><td>300回中12件が失敗</td><td>12÷300×100＝4.0％。未達。</td></tr>
<tr><th scope="row">全体</th><td>1,500回中42件が失敗</td><td>42÷1,500×100＝2.8％。ここでは参考値。</td></tr>
<tr><th scope="row">再開</th><td>11:00停止、12:10再開</td><td>70分で再開。RTOを達成。</td></tr>
<tr><th scope="row">復元</th><td>11:00停止、10:40の状態へ復元</td><td>停止前20分の状態。RPOは未達。</td></tr>
</tbody>
</table>
</div>
</figure>

最初に南拠点の4.0％を見つければ、拠点別条件の未達を説明できます。全体の2.8％には試行数の多い北拠点が強く反映されます。全体と各拠点で答えが違うのは、計算した範囲が違うためです。北と南の率をそのまま平均した3.25％も、全申込みの失敗率とは異なります。

復旧の条件では、どちらも11:00を基準にしますが、見る方向が違います。再開時刻の12:10は停止から先へ70分、復元した状態の10:40は停止から手前へ20分。再開だけを早めても、復元できるデータが更新されるとは限りません。報告には「南拠点とRPOを再試験する」と、直す箇所まで書きます。割合の比較は[経営データの読解演習](../ip-reading-business-data/)、復旧の意味は[バックアップと復旧](../ip-security-controls/)でそれぞれ練習できます。

<span id="objective-3"></span>

## データがない場合と、要件自体が変わる場合

<span id="worked-3"></span>

### 例題3　導入先を変えるときは、残る条件も確認する

改修後の北拠点では2.0％、南拠点では3.2％でした。RTOの試験では55分で再開できていますが、改修後のRPOの記録は未提出です。北拠点だけを先行導入する案が出た場合、北が2.0％なら、その範囲で失敗率の条件を満たします。対象の変更を承認したうえで、先行導入に残るRPOの条件を確認できるまでは、全条件を満たしたとは判断できません。

前回の復元記録は、どんな状態を再試験するかを考える材料になります。改修後の値を記録する欄は、その試験で測った資料が届くまで未確認のままにします。許容する時間を変える場合も、試験担当の判断で記録に合わせると、元の約束を満たしたかが分からなくなります。条件を変えるなら、関係者が承認した新しい条件と適用範囲を残してから判定します。

<section class="guided-lesson" id="guided-ip-release-decision" aria-labelledby="ip-release-guided-title">
<h3 id="ip-release-guided-title">途中で確認　いま出せる結論を選ぶ</h3>
<p id="ip-release-guided-prompt">ある拠点だけを先行対象にすることが承認されました。その拠点の失敗率は上限以下で、RTOも達成しています。RPOの記録には、サービスが再開した時刻だけが書かれています。いま出せる結論はどれですか。</p>
<form data-guided-practice data-expected="hold" aria-labelledby="ip-release-guided-title" aria-describedby="ip-release-guided-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>いまの判定を一つ選ぶ</legend>
<label><input type="radio" name="ip-release-gate" value="go" data-guided-hint="再開時刻から分かるのは、復旧にかかった時間です。データがいつの状態まで戻ったかの記録を探してください。">失敗率とRTOが達成なので、このまま導入する</label>
<label><input type="radio" name="ip-release-gate" value="hold">復元できたデータの時点を確認するまで、導入は保留する</label>
<label><input type="radio" name="ip-release-gate" value="fail" data-guided-hint="記録不足からは、許容した時間を超えたかどうかが分かりません。資料がないことと測定結果の未達を区別します。">復元時点の記録がないので、RPO未達と確定する</label>
<button type="submit" class="button secondary">答えを確かめる</button>
<button type="reset" class="button secondary">やり直す</button>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details><summary>判定とその根拠を読む</summary>
<p data-guided-solution>RPOは未確認です。再開した時刻はRTOの資料に使います。停止時刻と、復元できたデータの時点の両方を確認してから、全条件を判定します。</p>
</details>
</section>

### 自力で確認　拠点を増やした後に測る範囲

西拠点を加えた導入で、失敗率は全体で2.0％、西拠点だけでは3.0％でした。条件は「対象となる各拠点の失敗率が3.0％以下、復元時点は停止前15分以内」。他の拠点も失敗率の条件を満たしています。16:20の障害でデータは16:05の状態に戻りました。提示した二つの条件は満たしているでしょうか。

<details><summary>計算と判定を読む</summary>
<p>各拠点の条件を満たします。西の3.0％は上限を含むので達成です。復元時点は停止から15分さかのぼった位置にあり、こちらも上限以内です。全体2.0％は西拠点の判定には使いません。再開時刻は示されていないので、この記録だけでRTOを判定することはできません。</p>
</details>

理解度チェックの後は、[別の資料を読む3分野のケース演習](../tests/ip-integrated-cases/)へ進みます。制限時間を設けて練習する場合は、[100問の模擬試験](../tests/ip-mock-01/)で分野の切替えにも慣れてください。
