---
{
  "stableId": "ip-spreadsheet-lookups",
  "qualification": "it-passport",
  "title": "表計算の表引き：垂直照合と水平照合を使い分ける",
  "description": "ITパスポートの表引きを、完全一致と近似一致、縦・横の照合、別シートの参照、条件付個数に分けて学びます。",
  "order": 36,
  "minutes": 93,
  "sample": false,
  "updated": "2026-11-20",
  "unit": 17,
  "syllabus": [
    47
  ],
  "objectives": [
    "基準の並ぶ向きと結果の位置から垂直照合・水平照合を選ぶ",
    "識別用のコードと数値区分を区別し、一致方式を決める",
    "別シートの照合式と条件付個数を、境界と例外を含めて検算する"
  ],
  "prerequisite": "「表計算の読解演習」でセル範囲と相対参照・絶対参照を学んでから進みます。ここでも参照範囲の読み方を振り返ります。",
  "keywords": [
    "ITパスポート 垂直照合",
    "水平照合",
    "表引き",
    "完全一致 近似一致",
    "条件付個数",
    "別シート参照"
  ],
  "glossary": [
    {
      "term": "検索値",
      "definition": "表のどの行や列を使うかを決めるために、表の値と照合する値。商品コードや注文数が該当します。"
    },
    {
      "term": "完全一致",
      "definition": "指定した値と等しいセルを探すこと。番号や文字列で特定の品目を引くときに使います。"
    },
    {
      "term": "近似一致",
      "definition": "ここでは、昇順に並んだ区切りのうち、検索値以下で最も大きい値を探す方法。区分ごとの単価を引く際に使います。"
    },
    {
      "term": "戻す位置",
      "definition": "指定範囲の端を1として数えた、結果を取り出す列または行の番号。シート全体の列番号や行番号とは異なります。"
    }
  ],
  "inlineGlossary": [
    {
      "id": "lookup-key",
      "term": "検索値",
      "definition": "表のどの行や列を使うかを決めるために、表の値と照合する値。商品コードや注文数が該当します。"
    },
    {
      "id": "exact-match",
      "term": "完全一致",
      "definition": "指定した値と等しいセルを探すこと。番号や文字列で特定の品目を引くときに使います。"
    },
    {
      "id": "band-match",
      "term": "近似一致",
      "definition": "ここでは、昇順に並んだ区切りのうち、検索値以下で最も大きい値を探す方法。区分ごとの単価を引く際に使います。"
    },
    {
      "id": "return-position",
      "term": "戻す位置",
      "definition": "指定範囲の端を1として数えた、結果を取り出す列または行の番号。シート全体の列番号や行番号とは異なります。"
    }
  ]
}
---

## 表引きで決めるのは、対象の行や列と取り出す項目です

単価や商品名を別の表にまとめておけば、注文のたびに同じ情報を入力し直す必要がなくなります。注文表に書いた商品コードから品目表の行を特定し、その行にある単価を取り出す操作が表引きです。このとき照合の出発点になるコードや数量を、<a class="lesson-term" data-lesson-term href="#lesson-term-lookup-key">検索値</a>と呼びます。

表引きの式を読むには、照合対象が縦と横のどちらに並ぶか、どの条件で対象を選ぶか、選んだ場所と同じ行または列のどこから結果を取り出すかを順に確かめます。縦に並んでいれば垂直照合、横に並んでいれば水平照合を使います。式の中で指定した範囲が表の一部であれば、その範囲の端から位置を数えます。

<span id="lookup-exact"></span>

## 商品コードを見つけ、同じ行から料金を取り出す

C9:E11の品目表では、左端のC列に商品コード、右のD列とE列に品名と基本料金が入っています。コード「S-07」の基本料金を求める場合、C列で文字列が等しい行を探します。この方法は<a class="lesson-term" data-lesson-term href="#lesson-term-exact-match">完全一致</a>です。コードは品目を特定するための記号なので、番号が一つ違えば別の行を指す可能性があります。

<figure id="ip-spreadsheet-lookups-codes"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="ip-spreadsheet-lookups-codes-caption"><table><thead><tr><th scope="col">行</th><th scope="col">C列　コード</th><th scope="col">D列　品名</th><th scope="col">E列　基本料金（円）</th></tr></thead><tbody><tr><th scope="row">9</th><td>S-12</td><td>封筒</td><td>140</td></tr><tr><th scope="row">10</th><td>S-07</td><td>台紙</td><td>90</td></tr><tr><th scope="row">11</th><td>S-20</td><td>箱</td><td>220</td></tr></tbody></table></div><figcaption id="ip-spreadsheet-lookups-codes-caption">見本の品目表はC9:E11。商品コードには文字列の一致を使います。</figcaption></figure>

IPAの表記では「垂直照合(式, セル範囲, 列の位置, 検索の指定)」の順に読みます。最初の式を計算した結果が検索値です。「垂直照合('S-07', C9:E11, 3, 0)」なら、末尾の0が完全一致を指示します。C10で一致するため、同じ10行目のE10を読み、90円を得ます。ここでの<a class="lesson-term" data-lesson-term href="#lesson-term-return-position">戻す位置</a>はCから数えた3列目。E列がシート全体で5列目に当たることは、この式の指定に影響しません。

結果が「台紙」になる式を調べるときは、照合に失敗したと決めつけず、どの列から値を取り出しているかも見ます。位置を2とすれば、同じ行のD10が返ります。品目コードが重複していた場合、この形式の完全一致は範囲の上から最初の一致を使います。品目を一意に識別したいなら、マスターを更新する時点で重複を直しておきます。見つからない場合のエラー表示や別処理が問題文に示されていれば、その指定に従います。

<span id="lookup-band"></span>

## 数量から単価を決めるときは、区切りを超えたかを見る

料金が注文数に応じて下がる表では、すべての数量を一行ずつ並べる代わりに、料金が変わる最小の数量を記録できます。例えば12個の行が「12個から19個まで」を表すなら、11個は一つ前の区分、12個は新しい区分です。

<figure id="ip-spreadsheet-lookups-rates"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="ip-spreadsheet-lookups-rates-caption"><table><thead><tr><th scope="col">行</th><th scope="col">B列　注文数の下限</th><th scope="col">C列　通常（円）</th><th scope="col">D列　速達（円）</th></tr></thead><tbody><tr><th scope="row">4</th><td>0</td><td>500</td><td>900</td></tr><tr><th scope="row">5</th><td>5</td><td>420</td><td>720</td></tr><tr><th scope="row">6</th><td>12</td><td>360</td><td>630</td></tr><tr><th scope="row">7</th><td>20</td><td>300</td><td>550</td></tr></tbody></table></div><figcaption id="ip-spreadsheet-lookups-rates-caption">料金表のB4:D7。先頭列は区分の下限です。行番号は表を読むための目印で、照合範囲には含みません。</figcaption></figure>

区分を引くための<a class="lesson-term" data-lesson-term href="#lesson-term-band-match">近似一致</a>では、検索の指定を1にします。これは検索値に一番近い値を左右から探すという意味ではありません。先頭列の値を小さい順にしておき、検索値以下に絞った後、その中の最大値を使います。11個なら0と5が候補で、12は候補外。下限5のC5が通常料金420円です。12個になるとC6の360円に切り替わります。

「垂直照合(11, B4:D7, 3, 1)」のように列の位置を3にすると、区分を決める作業は変わりません。同じ行からD5の速達料金720円を取る点だけが変わります。逆に、3を保って検索の指定を0にすると、表の先頭に11という下限がないため、一致する行を選べません。数式のどの引数を変えたかによって、誤りを調べる場所が異なります。

先頭列を昇順にできない表を渡されたら、近似一致をそのまま適用する前に表を直します。注文量が0より小さいと候補が存在しないので、この例では入力段階で対象外とします。最高の下限20を超えても20の行が選ばれますが、20以上をひとまとめにしてよいかは業務上の区分で決まります。

<span id="lookup-horizontal"></span>

## 表が横向きなら、対象列を決めた後に下へ進む

表を横に置いた場合は「水平照合(式, セル範囲, 行の位置, 検索の指定)」を使います。垂直照合の考え方を90度回したもので、範囲の上端を端から順に調べ、同じ列の指定行に進みます。結果を取る行番号が6であっても、範囲の上端の4行目を1と数えるため、6行目は位置3です。

<figure id="ip-spreadsheet-lookups-horizontal"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="ip-spreadsheet-lookups-horizontal-caption"><table><thead><tr><th scope="col">行</th><th scope="col">F列</th><th scope="col">G列</th><th scope="col">H列</th><th scope="col">I列</th></tr></thead><tbody><tr><th scope="row">4</th><td>0</td><td>5</td><td>12</td><td>20</td></tr><tr><th scope="row">5</th><td>500</td><td>420</td><td>360</td><td>300</td></tr><tr><th scope="row">6</th><td>900</td><td>720</td><td>630</td><td>550</td></tr></tbody></table></div><figcaption id="ip-spreadsheet-lookups-horizontal-caption">料金表を横向きに置き換えたF4:I6。縦の表と同じ単価です。</figcaption></figure>

例として「水平照合(12, F4:I6, 3, 1)」を読みます。最上段で12以下の最大値を探し、12のあるH列を選びます。その列で上から3行目はH6の630円です。11個ならG列へ移り、G6の720円。入れ替わるのは列で、速達料金の行はそのままです。

<span id="lookup-summary-count"></span>

## 行と列が分かっているときは「表引き」を使う

試験用の記述には、照合とは別に「表引き(セル範囲, 行の位置, 列の位置)」という関数があります。行と列の位置がすでに分かっていれば、この関数は検索値を照合する手順を省けます。範囲 B4:D7 で「表引き(B4:D7, 3, 3)」を求めるときは、範囲の4行目を1として3番目の6行目、B列を1として3番目のD列を選びます。D6は630円です。注文数から該当行がまだ決まっていないときは、垂直照合のように検索する関数が必要です。

## 別シートへ参照を伸ばし、結果から条件に合う件数を数える

発注一覧のA2に注文数を入力し、マスターの名前を「料金」とします。IPAの表計算の表記で別シートのセル範囲を「料金!B4:D7」と書けば、発注一覧から料金表を参照できます。通常料金の計算を下の行へ写す場合、注文数のA2はA3、A4と動きます。マスターの位置は変えないので両端の列と行を固定し、「垂直照合(A2, 料金!$B$4:$D$7, 2, 1)」のようにします。

<figure id="ip-spreadsheet-lookups-records"><div class="table-scroll" tabindex="0" role="region" aria-labelledby="ip-spreadsheet-lookups-records-caption"><table><thead><tr><th scope="col">注文</th><th scope="col">数量</th><th scope="col">通常料金（円）</th></tr></thead><tbody><tr><th scope="row">A</th><td>4</td><td>500</td></tr><tr><th scope="row">B</th><td>5</td><td>420</td></tr><tr><th scope="row">C</th><td>11</td><td>420</td></tr><tr><th scope="row">D</th><td>12</td><td>360</td></tr><tr><th scope="row">E</th><td>20</td><td>300</td></tr></tbody></table></div><figcaption id="ip-spreadsheet-lookups-records-caption">発注一覧の注文数と返された通常料金。境界の前後で、異なる区分に入ることを確認できます。</figcaption></figure>

返された通常料金が発注一覧のC2:C6にあるとします。400円未満の行を求めるなら「条件付個数(C2:C6, <400)」で2件です。比較対象のセルが別にあるときは「<D1」のように、そのセルへ条件をつなぎます。「個数」は範囲にある空白でないセルを数えるため、全5行に料金があれば5を返します。

境界を検算に使います。下限が5なら4、5の両方で試し、下限が12なら11、12を並べます。さらに別の行に式をコピーして、動くのが注文数だけであることを確認します。同じ検索値で違う結果が出た場合は、先頭列の並び、検索の指定、返す位置、固定されている範囲をそれぞれ調べると原因を絞れます。

<section class="guided-lesson" id="guided-ip-spreadsheet-lookups" aria-labelledby="ip-spreadsheet-lookups-guided-title">
<h2 id="ip-spreadsheet-lookups-guided-title">途中で確認　区分と戻す位置を順に読む</h2>
<p id="ip-spreadsheet-lookups-guided-prompt">通常料金を求めます。上の料金表で、注文数19のとき、垂直照合(19, B4:D7, 2, 1)はいくらですか。円の数字を入力してください。</p>
<form data-guided-practice data-expected="360" data-guided-hint="下限のうち19以下で最も大きい値を選び、その行の左から2列目を読みます。" aria-labelledby="ip-spreadsheet-lookups-guided-title" aria-describedby="ip-spreadsheet-lookups-guided-prompt" data-lesson-screen-only>
<fieldset hidden><legend>自分で答える</legend><label for="ip-spreadsheet-lookups-guided-answer">答え（円）</label><input class="guided-number" type="text" inputmode="numeric" id="ip-spreadsheet-lookups-guided-answer" autocomplete="off"><button type="submit" class="button secondary">答えを確かめる</button><button type="reset" class="button secondary">やり直す</button></fieldset>
<p role="status" data-guided-feedback></p></form>
<details><summary>答えと確認方法を読む</summary><p data-guided-solution>下限が12の6行目を選びます。20と19の数字の差は小さくても、20の区分は始まっていません。B列を1と数えた2列目はC列なので、C6の360円です。</p></details>
</section>

<span id="ip-spreadsheet-lookups-source-reasoning"></span>

## 向きが変わっても、検索する軸と返す項目を保つ

料金表を縦から横へ並べ替えると、検索する方向と返す位置の数え方が変わります。金額が同じでも、垂直照合を横向き表へ使うと先頭列で別のものを探してしまいます。

| 表の向き | 検索値の並び | 返す位置 |
| --- | --- | --- |
| 左からコード・通常料・特急料 | 先頭列を縦に探す | 同じ行の左から何列目か |
| 上からコード・通常料・特急料 | 先頭行を横に探す | 同じ列の上から何行目か |

P03の特急料を取り出すなら、縦型は3列目、横型は3行目です。検索値P03は同じでも、検索の軸と返す方向を読み直します。

数量の下限で選ぶ表なら完全一致か区間照合かも必要です。下限0、10、20が昇順なら19は下限10の区分です。19自体は表にないので、商品コードの完全一致と同じ指定では選べません。区間の順序が崩れていれば、式より前に表の内容と並びを確認します。

**位置を判断する。** 横型のE4:H6で、コードは4行目、通常料は5行目、特急料は6行目です。特急料を返す位置は6か3のどちらですか。

<details><summary>解答と範囲内の番号を読む</summary>
<p>3です。シート全体の行番号6ではなく、範囲の先頭行E4:H4を1として数えます。通常料2、特急料3となります。</p>
</details>

## 総合演習　式を写す前に間違いを見つける

工具の貸出表では数量3以上で単価が260円、数量8以上で220円、数量15以上で190円になります。最小の数量は3と定めます。貸出数6の行で単価が220円と表示され、数量9の行へ数式をコピーすると参照範囲も一行動きました。誤りの原因を二つの視点から説明し、貸出数7と8で期待する結果を書いてください。

<details><summary>解答と検算を読む</summary><p>6は3以上8未満です。近似一致では6以下の最大の下限3を使い、260円を返すはずです。6との差が小さい8を選ぶ処理や、誤った位置から結果を返す処理を確認します。式を写したときに範囲が動く場合はマスター範囲の両端を絶対参照にします。数量7は260円、数量8は220円です。7と8を順に試すと、下限の値を含めることまで検算できます。</p></details>

## 参考資料

- [IPA「ITパスポート試験」シラバス Ver.6.5（項目47 オフィスツール）](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf)

- [IPA 令和7年度公開問題の巻末「表計算ソフトの機能・用語」](https://www3.jitec.ipa.go.jp/JitesCbt/html/openinfo/pdf/questions/2025r07_ip_qs.pdf)。2026年11月16日確認。本文の表と問題は当サイトの独自例です。
