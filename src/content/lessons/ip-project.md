---
{
  'stableId': 'ip-project',
  'qualification': 'it-passport',
  'title': 'プロジェクト管理とクリティカルパス',
  'description': 'クリティカルパスと余裕の求め方を、先行作業と開始・終了時点の表から学びます。工程を短縮した後の再計算、WBS、変更とリスクの管理も練習します。',
  'order': 19,
  'minutes': 75,
  'sample': false,
  'updated': '2026-11-20',
  'unit': 10,
  'syllabus': [27],
  'objectives': ['WBSとスケジュールを関連付ける', '制約とリスクを踏まえて計画する'],
  'prerequisite': '直前の「開発プロセス・アジャイルとDevOps」を学習済みだと進めやすくなります。各用語は本文でも説明します。',
  'keywords': ['WBS', 'クリティカルパス', 'ガントチャート', 'EVM'],
  'glossary':
    [
      { 'term': 'WBS', 'definition': 'プロジェクトの作業や成果物を管理可能な単位へ階層的に分解したもの。' },
      {
        'term': 'クリティカルパス',
        'definition': '作業の依存関係の経路のうち、全体の最短期間を決める最長の経路。',
      },
      { 'term': 'ガントチャート', 'definition': '作業の開始・終了や進捗を時間軸の棒で表す図。' },
      { 'term': 'EVM', 'definition': '計画価値、出来高、実コストから進捗やコストを評価する方法。' },
    ],
  "inlineGlossary": [
    {"id": "wbs", "term": "WBS"},
    {"id": "critical-path", "term": "クリティカルパス"},
    {"id": "gantt-chart", "term": "ガントチャート"},
    {"id": "evm", "term": "EVM"},
    {"id": "dependency", "term": "依存関係", "definition": "ある作業の開始や完了が、別の作業の進み具合に左右される関係です。"},
    {"id": "scope", "term": "スコープ", "definition": "プロジェクトで作る成果物と、そのために行う作業の範囲です。"}
  ],
}
---

## プロジェクトの特徴

プロジェクトは、目標とする成果を得るために、始まりと終わりを設けて行う活動です。新しい予約システムを導入し、利用部門へ引き渡す仕事が一例です。公開後に毎日の予約を受け付ける運用とは、終える条件が異なります。

計画では、どこまでを成果として作るかを決め、そのための仕事を細かく分けます。成果と作業のまとまりを段階的に分けた構成がWBSです。WBSを作ると、抜けや重複を確認し、担当、必要な時間、費用を見積もる単位をそろえられます。ただし、一覧にしただけでは作業の前後関係や開始日は決まりません。次に、どの仕事の完了を待つ必要があるかを工程表へ表します。

品質、費用、納期は互いに影響します。期限を早めるために応援を増やすと費用が増える場合があり、試験を省けば品質に影響します。変更の判断では、何を変え、どの条件を守るかを関係者と確認します。

## 依存関係と最短期間

<a class="lesson-term" data-lesson-term href="#lesson-term-critical-path">クリティカルパス</a>は、依存関係のある作業の経路のうち所要時間が最長の経路です。この経路がプロジェクトの最短所要期間を決めます。余裕のある作業だけを短縮しても、全体期間が短くなるとは限りません。複数のクリティカルパスがある場合もあります。

## 例：並行作業の期間

最初にA（2日）を行い、その後B（4日）とC（3日）を並行し、両方が終わってからD（2日）を行います。経路A→B→Dは8日、A→C→Dは7日なので最短8日です。Bを1日短縮すると両経路とも7日になります。Cだけを1日短縮しても全体は8日のままです。ここでは人員競合や休日を考えません。

## 変更とリスクを管理する

リスクは起きるか不確かな事象、課題は既に発生した問題として区別します。リスクの影響と発生可能性を見積もり、回避・軽減（低減）・転嫁（移転）・受容などを選びます。変更時はスコープ、費用、納期、品質への影響を評価し承認します。<a class="lesson-term" data-lesson-term href="#lesson-term-evm">EVM</a>では計画価値PV、出来高EV、実コストACを比較し、単に予算を使っていないことを順調と誤認しないようにします。

<span id="depth-project-plan"></span>
## 開始前に、何を終えたら成功かを決める

地域の医療機関で予約システムを更新します。日々の予約受付には繰り返しがあり、更新には終了時点と固有の成果があります。更新のような期間限定の取組みがプロジェクトです。立上げでは、目的、責任者、予算・納期の制約、主要な関係者をプロジェクト憲章などで共有します。「予約をウェブで受け付け、予約台帳と照合できれば完了」と決め、会計システムとの連携は今回の対象外とします。この境界がスコープです。

WBSでは、例えば「受付を切り替える」という成果を、移行対象の確定、データの変換、移行後の照合、窓口の訓練など、見積りや担当の割当てができる仕事に分けます。WBSは「何をするか」を見える形にします。先に終える仕事の関係はアローダイアグラムなどで整理し、ガントチャートでは日付ごとの開始・終了や進捗を横棒で示します。同じ作業一覧でも、並行できるか、誰が作業できるかによって日程は変わります。

<span id="depth-project-network"></span>
## 二つの経路で、何日まで待てるかを計算する

<figure id="ip-project-parallel-paths"><svg viewBox="0 0 340 180" width="340" height="180" style="display:block;max-width:100%;height:auto" role="img" aria-label="開始からAに4日。Aの後の上経路はBに8日、下経路はCに5日とDに2日。両経路の後にEを3日"><g stroke="currentColor" stroke-width="2" fill="none"><path d="M10 90h39m-7-5 7 5-7 5M109 90h8V39h22m-7-5 7 5-7 5M109 90h8v50h22m-7-5 7 5-7 5M200 39h50v51h18m-7-5 7 5-7 5M199 140h17m-7-5 7 5-7 5M277 140h13v-25m-5 7 5-7 5 7"/><g fill="currentColor" fill-opacity=".08"><rect x="49" y="67" width="60" height="46" rx="5"/><rect x="139" y="16" width="61" height="46" rx="5"/><rect x="139" y="117" width="60" height="46" rx="5"/><rect x="217" y="117" width="60" height="46" rx="5"/><rect x="269" y="67" width="60" height="46" rx="5"/></g></g><g fill="currentColor" text-anchor="middle" font-size="14"><text x="79" y="96">A：4日</text><text x="169" y="45">B：8日</text><text x="169" y="146">C：5日</text><text x="247" y="146">D：2日</text><text x="299" y="96">E：3日</text></g></svg><figcaption>Aの後でBとCが分かれます。EはBとDの完了を待って始めます。長い方の経路が全体の最短日数を決めます。</figcaption></figure>

開始時点を0日とします。Aの完了は4日、Bの完了は12日です。もう一方はCが9日、続くDが11日に終わります。Eの開始は遅い方の12日、完了は15日です。A→B→Eがクリティカルパスです。遅らせられる日数は、合流点で比較すると求められます。Eを12日に始めるにはDは12日までに終わればよく、Dの最も遅い開始は12−2＝10日です。Dの最も早い開始は9日なので、余裕は1日です。Cを1日遅く始めても合流には間に合います。CとDを各1日ずつ遅らせると同じ経路に計2日の遅れが生じ、全体は1日遅れます。

Cが5日から7日に延びた場合、下の経路はA4＋C7＋D2＋E3＝16日です。上の15日を上回り、クリティカルパスが変わります。Bを1日短くしても全体は16日のままです。逆に、BとCを同じ担当者が行う場合は図のまま同時着手できません。先行関係による15日は、人の制約がないと仮定した最短日数です。人の割当てが変わったら日程を引き直します。

### 矢印に日数を書く図も同じ順序で読む

上の図では箱が作業を表します。アローダイアグラムでは矢印が作業、結合点が前後の作業をつなぐ時点です。たとえば結合点1から2へ3日、1から3へ4日、2から4へ5日、3から4へ2日なら、結合点4に着く二つの経路はそれぞれ8日と6日です。結合点4から始まる作業は8日までは始められません。結合点4を8日に保つ場合、結合点3の最も遅い時点は8−2＝6日で、最も早い4日との差は2日です。図の書き方が変わっても、合流点では遅い方を待つという読み方は同じです。

<span id="depth-project-control"></span>
## 変更と進捗を、関係者が判断できる形で伝える

成果に影響を与える人や、成果から影響を受ける人をステークホルダと呼びます。プロジェクトのコミュニケーション管理では、誰が、何を、いつ知れば判断できるかを決めます。例えば費用の変更は承認者へ早く届け、受付手順の変更は窓口が訓練に使える時期に伝えます。同じ変更でも、読む人ごとに必要な情報が異なります。

切替えの2週間前に、予約画面へ多言語案内を追加する要望が来たとします。口頭で引き受けると、翻訳、確認、研修、費用への影響が見えません。PMは変更の目的と優先度を記録し、依存作業と品質基準への影響を見積もり、決裁できる関係者に選択肢を示します。承認されれば、スコープ、日程、試験、周知先を更新します。定例報告では「80％進行」とだけ書かず、完了した成果、計画との差、原因、対応担当、期限、決裁が要る事項を分けて伝えます。

「旧台帳の変換が切替えまでに終わらない可能性」はリスクです。対象形式を減らしてその原因をなくすのは回避、変換リハーサルで失敗の可能性を下げるのは軽減、契約や保険で合意した損失の負担を移すのは転嫁です。残る小さなリスクを認識し、起きたときの対応を準備して許容するのは受容です。既に試験で変換失敗が起きた場合、今すぐ対処が必要な課題として扱いつつ、次に起こり得る影響をリスクとして見直します。

<span id="depth-project-close"></span>
## 公開後の仕事を引き継ぎ、プロジェクトを終える

医療機関の予約画面を切り替え、利用部門が合意した受入条件を満たしたと確認しました。次に、運用責任者へ障害時の連絡先、監視と復旧の手順、残った改善要望を渡し、担当者が引き継いだことを確かめます。毎日の運用が残っていても、計画した成果物の受入れと引継ぎが済めば、更新プロジェクトは終結できます。受入条件を満たさない重大な未解決事項があれば、完了とせず、対処や例外の承認を関係者に求めます。

今回、事前リハーサルで台帳変換の問題が見つかり、切替えを遅らせずに済んだなら、その条件と手順を記録します。次の担当者が再現できるように、どのデータで確認し、誰が修正し、どの時点で切替えを判断したかを残します。公開直後に受付時間が半分になるとは限りません。導入効果を測る担当と時期も引き継ぎ、成果物の受入れと運用中の効果測定を区別します。

<span id="worked-management-transfer"></span>

## 合流する仕事は、長いほうが終わるまで始められない

受付端末を導入する作業を、時点0から計画します。「3日目が開始」などの暦日の数え方と混ぜず、開始から何日経過したかで時点を表します。Aが終わるとBとCを並行でき、DはBとCの両方の完了後に始められるとします。

<figure id="project-transfer-network">
<svg viewBox="0 0 360 180" width="360" height="180" style="max-width:100%;height:auto" role="img" aria-labelledby="project-transfer-network-title project-transfer-network-desc" xmlns="http://www.w3.org/2000/svg">
<title id="project-transfer-network-title">Aの後にBとCへ分かれ、両方を待ってDへ進む</title>
<desc id="project-transfer-network-desc">Aは二日。上の経路はB四日、下の経路はC三日。Dは二日かかり、上の経路の完了を待つため全体は八日です。</desc>
<g fill="none" stroke="currentColor" stroke-width="2">
<path d="M67 86L121 45H219L276 86M67 94L121 135H219L276 94"/>
<path d="M112 42L121 45L117 54M112 132L121 135L117 144M267 79L276 86L266 88M268 96L276 94L273 104"/>
</g>
<g fill="currentColor" font-size="16" text-anchor="middle">
<text x="34" y="88">A 2日</text>
<text x="169" y="33">B 4日</text>
<text x="169" y="161">C 3日</text>
<text x="315" y="88">D 2日</text>
</g>
</svg>
<figcaption>上の経路は8日、下は7日です。Dの前で両方の成果がそろう必要があるため、全体は長いほうの8日になります。</figcaption>
</figure>

| 作業 | 所要日数 | 先に完了する仕事 | 最も早い開始→終了 |
| --- | ---: | --- | --- |
| A | 2 | なし | 0→2 |
| B | 4 | A | 2→6 |
| C | 3 | A | 2→5 |
| D | 2 | B・C | 6→8 |

Dを始める時点は、前の作業の終了時点の大きいほうです。Cが時点5で終わっても、Bが時点6まで続くので、Dは6からになります。A→B→Dは8日、A→C→Dは7日で、工期を決める経路は前者です。これがクリティカルパスです。

終了時点8から逆にたどると、Dは6までに開始する必要があります。Bは2、Cは3までに開始すればDの開始に間に合います。Cの最早開始2と最遅開始3の差1日が、この計画でCにある余裕です。Cの終了を一日遅らせても、ほかの条件が同じなら工期は変わりません。

### 短縮した後で、どの経路が工期を決めるか

<section class="guided-lesson" id="guided-management-shortening" aria-labelledby="guided-management-shortening-title">
<h3 id="guided-management-shortening-title">Bを短くした後の工期を入力する</h3>
<p id="guided-management-shortening-prompt">Bだけを4日から2日へ短縮しました。ほかの作業と依存関係は変わりません。変更後の全体の工期は何日でしょうか。</p>
<form data-guided-practice data-expected="7" data-guided-hint="Bを通る経路とCを通る経路をそれぞれ計算し、両方が終わる時点を使います。" aria-labelledby="guided-management-shortening-title" aria-describedby="guided-management-shortening-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>全体の工期を答える</legend>
<label>工期（日） <input inputmode="numeric" autocomplete="off" name="duration"></label>
<button type="submit" class="button secondary">答えを確認</button>
<button type="reset" class="button secondary">やり直す</button>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details>
<summary>経路を計算し直す</summary>
<p data-guided-solution>A→B→Dは2＋2＋2＝6日ですが、A→C→Dは2＋3＋2＝7日です。短縮後はC側の完了を待つので、全体は7日になり、一日の短縮です。クリティカルパスが入れ替わる場合もあるため、変更した後の経路をすべて確かめます。</p>
</details>
</section>

<span id="depth-project-practice"></span>
### 自分で解く：短縮案に効果があるか

受付端末の展開は、調査2日の後、手順確認6日と端末準備3日を並行して行います。端末準備の後には接続確認2日があり、手順確認と接続確認が両方終わったら導入2日を行います。手順確認を2日短縮すると、全体は何日短くなりますか。

<details><summary>解答と考え方</summary><p>元は 2＋max(6, 3＋2)＋2＝10日です。短縮後は 2＋max(4, 3＋2)＋2＝9日です。短くなるのは1日です。手順確認の経路が短くなり、端末準備と接続確認の経路を待つためです。</p></details>

出典：[IPA ITパスポート試験シラバス Ver.6.5、項目27（p.30）](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf#page=34)


## 作業表を完成予定日に変える

新しい受付システムを導入するとします。機器の設置と操作説明書の作成は、準備が済めば同時に進められます。ただし、利用者向けの確認会は機器と説明書の両方がそろわないと開けません。WBSで「何を終わらせるか」を分けた後、スケジュールでは「何を待つ必要があるか」を整理します。担当者が同じ場合は、依存関係がなくても同時に実施できないことがあります。

### 合流点では遅い方を待つ

準備Aが3日、Aの後のBが5日、Cが4日、最後の確認Dが2日とします。開始を0日目と置くと、Aは3日後に終了します。Bは8日後、Cは7日後に終わるので、Dを始められるのは8日後です。完了は10日後です。BとCは並行できるため、全作業の日数を足した14日にはなりません。

Cに1日の余裕があるのは、Cが8日後までに終わればDの開始が動かないためです。Bにはこの余裕がありません。AやDは両方の経路が通るので、どちらかが延びると完了日も動きます。Bを2日短縮すると、今度はCを通る経路が9日で全体を決めます。Bだけをさらに短縮しても、全体は短くなりません。短縮策を比べるときには、計算後の新しい経路も確認してください。

### 計画との差を二つの軸で読む

ある時点で予定していた作業の予算価値（PV）が50万円、実際に完了した作業の予算価値（EV）が40万円、実支出（AC）が45万円とします。進捗を見る差はEV−PV＝−10万円なので、完了した仕事量は予定より少ない状態です。費用を見る差はEV−AC＝−5万円なので、終えた仕事の価値より多く支払っています。ACがPVより低いことだけを見て「節約できた」とは判断できません。

### 自分で確かめる

Aが2日、その後のBが6日、Cが3日、両方を待つDが1日なら、完了は9日後です。Cだけが2日延びても、A→C→Dは8日で、全体の9日は変わりません。Bの担当者をCへ移す提案があれば、Bの完了が遅れないかも検討します。

<span id="textbook-project"></span>

## 教科書演習：合流点の締切から作業の余裕を逆算する

教材の申込みフォームを公開します。計画の順序を決めるには、「どの作業を同時に進められるか」と「誰がそれを担当できるか」を分けて考えます。依存関係は前者を表し、同じ担当者が二つの仕事を同時にはできない制約は後者です。日程表に着手日を書く前に、まず成果物と責任をWBSで整理し、その作業同士に先行関係を設定します。

| 作業 | 日数 | 開始に必要な作業 |
|---|---:|---|
| A：申込み条件を決める | 2 | なし |
| B：フォームを作る | 5 | A |
| C：職員用手順を作る | 3 | A |
| D：通し試験をする | 2 | B、C |
| E：教材を校正する | 4 | なし |
| F：公開判定をする | 1 | D、E |

最も早く始められる時刻を左から追います。Aは0日目に開始し2日目に完了。Bは7日目、Cは5日目に完了します。Dは両方がそろう7日目から9日目までです。Eは4日目に完了しますが、FはDも終わる9日目から始まり、10日目に全体完了です。合流で二本の時間を足すと、並行できる期間を重複して数えてしまいます。

今度は10日目を守るための最遅時刻を右から逆算します。Fの最遅開始は9日目。Dは9日目までに終えるので7日目開始、Bは7日目までに終えるので2日目開始です。Cも7日目までに終えれば間に合い、3日かかるので最遅開始は4日目。Cの最早開始2日目との差は2日です。EはFが始まる9日目までに終えればよく、最遅開始は5日目。AがBとCへ分岐する箇所では、両方の条件を守るため、BとCの最遅開始の早い方である2日目までに終える必要があります。

| 作業 | 最早開始 | 最遅開始 | 日程を延ばさず使える余裕 |
|---|---:|---:|---:|
| A | 0 | 0 | 0 |
| B | 2 | 2 | 0 |
| C | 2 | 4 | 2 |
| D | 7 | 7 | 0 |
| E | 0 | 5 | 5 |
| F | 9 | 9 | 0 |

<figure id="ip-project-gantt-float"><svg viewBox="0 0 328 214" width="328" height="214" role="img" aria-label="作業AからFまでのガントチャート。Cは2日、Eは5日の余裕がある。" style="max-width:100%;height:auto"><g fill="currentColor" font-size="12" text-anchor="middle"><text x="39" y="19">0</text><path d="M39 25v150" stroke="currentColor" opacity=".15"/><text x="65" y="19">1</text><path d="M65 25v150" stroke="currentColor" opacity=".15"/><text x="91" y="19">2</text><path d="M91 25v150" stroke="currentColor" opacity=".15"/><text x="117" y="19">3</text><path d="M117 25v150" stroke="currentColor" opacity=".15"/><text x="143" y="19">4</text><path d="M143 25v150" stroke="currentColor" opacity=".15"/><text x="169" y="19">5</text><path d="M169 25v150" stroke="currentColor" opacity=".15"/><text x="195" y="19">6</text><path d="M195 25v150" stroke="currentColor" opacity=".15"/><text x="221" y="19">7</text><path d="M221 25v150" stroke="currentColor" opacity=".15"/><text x="247" y="19">8</text><path d="M247 25v150" stroke="currentColor" opacity=".15"/><text x="273" y="19">9</text><path d="M273 25v150" stroke="currentColor" opacity=".15"/><text x="299" y="19">10</text><path d="M299 25v150" stroke="currentColor" opacity=".15"/><text x="20" y="42">A</text><rect x="39" y="30" width="52" height="16" rx="2" opacity=".72"/><text x="20" y="67">B</text><rect x="91" y="55" width="130" height="16" rx="2" opacity=".72"/><text x="20" y="92">C</text><rect x="91" y="80" width="78" height="16" rx="2" opacity=".72"/><rect x="169" y="80" width="52" height="16" fill="none" stroke="currentColor" stroke-dasharray="4 3"/><text x="20" y="117">D</text><rect x="221" y="105" width="52" height="16" rx="2" opacity=".72"/><text x="20" y="142">E</text><rect x="39" y="130" width="104" height="16" rx="2" opacity=".72"/><rect x="143" y="130" width="130" height="16" fill="none" stroke="currentColor" stroke-dasharray="4 3"/><text x="20" y="167">F</text><rect x="273" y="155" width="26" height="16" rx="2" opacity=".72"/><text x="168" y="201">開始からの日数（点線は作業の余裕）</text></g></svg><figcaption>各行は最早開始で描いています。Cの実線の終端は5日目、点線の終端は7日目。Cを2日ずらしてもDを7日目に開始できます。Eの点線は9日目までです。</figcaption></figure>

<details><summary>合流点の見方を確かめる：Cが2日遅れたら公開日はどうなるか</summary><p>Cは当初の5日目から7日目の完了に変わります。DはもともとBの終了を待って7日目に開始するので、全体の公開日は10日目のままです。次にCをもう1日遅らせるとどうなるか、表で追ってみましょう。</p></details>

<span id="textbook-project-resources"></span>

### 条件変更：作業を短くしても公開が早まらない場合

Bを3日短縮して2日にすると、Bは4日目、Cは5日目に完了します。Dは5日目から7日目、Fは8日目に完了します。Bを3日短くしたのに全体は2日しか短くなりません。合流点を決める経路がB側からC側に移るためです。図や表で「どの経路が待ちを生むか」を短縮案ごとに確認します。

次に同じ人がBとCを担当する条件を加えます。元の5日・3日で分割できないなら、BとCの合計8日がAの後に必要で、両方の完了は10日目、公開は13日目です。依存関係だけから得た10日を、そのまま人員の制約がある計画の納期には使えません。担当変更で並行化できるか、研修・引継ぎの時間がかかるかも進捗報告に含めます。

<span id="textbook-project-report"></span>

<span id="ip-project-new-worked-example"></span>

### 担当が重なったら、追加された順序を工程に戻す

工程表で並行できるのは、必要な人員や設備を確保できる場合です。同じ担当者が二つの作業を受け持つときは、両方を同時に開始できません。どちらを先に行うかで、その後の作業を待たせる時間が変わるため、各案で後続作業まで計算し直します。

例えば、準備2日後にAを3日、Bを4日行います。Aの後には別の担当者がCを2日行い、BとCがそろってから最終確認に1日かかります。AとBを同じ担当者が行う場合、Aを先にすると時点5にAが終わり、同時にBとCが始まります。Bは時点9、Cは時点7で終わるため、最終確認は時点9から10です。Bを先にすると時点6にBが終わり、時点9にA、時点11にCが終わるので、最終確認は時点12までかかります。

<figure id="ip-project-worked-evidence">
<figcaption id="ip-project-worked-evidence-caption">作業順で後続作業の待ち時間が変わる</figcaption>
<div class="table-scroll" role="region" tabindex="0" aria-labelledby="ip-project-worked-evidence-caption">
<table>
  <thead>
    <tr><th scope="col">AとBの順序</th><th scope="col">最終確認の開始・終了</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Aの後にB</th><td>時点5からBとCを並行。Bが時点9までかかり、確認は9→10。</td></tr>
    <tr><th scope="row">Bの後にA</th><td>CはAの終了を時点9まで待つ。確認は11→12。</td></tr>
  </tbody>
</table>
</div>
</figure>

<section class="guided-lesson" id="guided-ip-project" aria-labelledby="guided-ip-project-title">
<h3 id="guided-ip-project-title">途中で確認　担当の制約を入れて工期を求める</h3>
<p id="guided-ip-project-prompt">準備は1日。準備後にAが2日、Bが3日で、A・Bを同じ担当者が同時には行えません。Aの後に別の担当者がCを4日行います。BとCが終わったら、最終確認を1日行います。Aを先にしたとき、全体は何日ですか。</p>
<form data-guided-practice data-expected="8" data-guided-hint="Aの後にBとCを並行できます。最終確認はBとCのうち遅い方の終了を待ちます。" aria-labelledby="guided-ip-project-title" aria-describedby="guided-ip-project-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>練習の答え</legend>
<label for="guided-ip-project-input">答え（日）</label> <input id="guided-ip-project-input" name="answer" class="guided-number" type="text" inputmode="numeric" enterkeyhint="done" maxlength="18" autocomplete="off">
<div class="guided-buttons"><button type="submit" class="button primary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></div>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details>
<summary>解答と考え方を読む</summary>
<p data-guided-solution>準備は時点1まで、Aは時点1から3までです。その後BとCを同時に始め、Bは時点6、Cは時点7に終わります。両方が終わった時点7から最終確認1日を加え、全体は8日です。</p>
</details>
</section>

### 自分で解く：何を報告すると判断できるか

Cの開始が3日遅れました。他の作業は当初のままで、人員の兼務はありません。いつ公開できる見込みで、責任者には何を示しますか。

**解き方。** Cは5日目開始、8日目完了なので、DはB完了の7日目では開始できません。Dの完了は10日目、公開判定完了は11日目です。Cの余裕2日を超えた1日が全体の遅れです。「Cが3日遅れた」という事実に加えて、予定と見込みの差、原因、他作業への影響、短縮や公開日の変更などの選択肢と、判断が必要な日を伝えます。

## まとめ

作業の分解と順序、実績の評価、変更の合意をつなげます。期間を縮める前に、全体を制約している経路を確かめましょう。
