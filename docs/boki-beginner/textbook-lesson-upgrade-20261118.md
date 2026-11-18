# 日商簿記初級　教材と模試の改訂記録（2026-11-18）

## 公式範囲と教材の対応

対象は2027年3月31日までの簿記初級。日本商工会議所の[出題区分表](https://www.kentei.ne.jp/bookkeeping/exam-list)、[現行の初級PDF](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30bokishokyu.pdf)、[受験方式](https://www.kentei.ne.jp/33013)、[試験時間・合格基準](https://www.kentei.ne.jp/bookkeeping/class-s/effect)、[公式サンプル](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/04/s-sample0404.pdf)、[初級Q&A](https://www.kentei.ne.jp/bookkeeping/class-s/qa)を2026年11月18日に再照合した。[2027年度確定版](https://www.kentei.ne.jp/wp/wp-content/uploads/2014/10/2027shokyu_fixed.pdf)は2027年4月1日から適用される。

46技能の指導箇所、例題と演習の対応は [技能データ](../../src/data/boki-beginner-coverage.json)と[公開対応表](https://shikaku-step-note.github.io/qualifications/boki-beginner/coverage/)に掲載。公式サンプルから読み取れる3群の構成と現在の選択式の案内を区別した。固定の小問数、個々の配点、部分点や実測難易度は公表仕様として扱わない。土地以外の売却、決算処理、消耗品の資産処理、税込方式は公開中の必須範囲に広げない。

## 学習順と本文

6単元28講を照合した。講数は5／6／4／4／4／5。既存の技能別ページで説明、実例と初見の練習が対応しているため、今回の不足は本文内の順序と条件の説明で補った。月次では前月末と当月初を突き合わせる練習を総合演習より先にした。仕訳から元帳へ転記する手順が、試算表の合計と残高へどうつながるかを同じ数字でたどれるようにした。

| 単元・章ID | 改訂箇所と確認する判断 |
| --- | --- |
| bb2-business / bb2-profit | 資産・負債・純資産と、収益・費用・利益を分け、残高の表と期間の表の対象を確かめる。 |
| bb2-transaction / bb2-journal / bb2-foundations-case | 記録する日と項目を選び、証拠となる金額を借方・貸方に対応させてから開業月の資料へ進む。 |
| bb2-ledger / bb2-evidence / bb2-cash | 元の記録と最終記入先を同じ値で照合し、差額や記入先の誤りを見つける。 |
| bb2-sales / bb2-sales-returns / bb2-trade-case | 三分法と返品を、商品代・付随費用・代金の決済に分けて売買明細に反映する。 |
| bb2-receivables / bb2-credit / bb2-prepayments / bb2-other-claims | 返品や切替えを入金と分け、手数料の月、前渡し分の充当、商品の代金か備品の代金かを資料から判定する。 |
| bb2-loans / bb2-temporary / bb2-custody / bb2-bills | 元本が変わる時点、仮勘定の精算日、給与の控除と納付、電子記録の切替えと実際の決済を追う。 |
| bb2-assets / bb2-depreciation | 用途と使用開始時の支出から取得原価を判断する。同じ備品の月額・累計・帳簿価額の対応を追う。 |
| bb2-capital / bb2-expenses | 振込の出どころと目的から科目を選ぶ。納税通知と領収書をつなぎ、計上済みの固定資産税を二重に費用にしない。 |
| bb2-vat / bb2-trial-balance | 返品の税額と商品代を対にして戻す。残高0円でも元帳の左右の記入は合計欄に残ることを確かめる。 |
| bb2-monthly / bb2-opening-balances / bb2-integration | 売掛金の貸方合計を入金・返品・電子記録の切替えに分ける。月次の表を同じ期間で比較し、月末残高と当月利益を別の経路で検算する。 |

[いぬぼきの簿記入門](https://inuboki.com/nyuumon/nyuumon-text1/)と[転記の例](https://inuboki.com/nyuumon/nyuumon-text6/)を、用語を初出で説明する順序と元の記録から記入欄へ目を移す方法の参考にした。図表・資料・問題は独自に作成。新しい図表には帳簿、証ひょう、残高の比較と計算過程を示す。

## 評価・保存

既存のレッスンID、本文アンカー、レッスンの採点問題、用語問題の並びを維持した。12問の模試を見直し、誤答に実際に起こりやすい取り違えを反映させた。各回40分・30小問・100点の2回分で、月次の取引資料は別々。詳しい問題IDと答えの再計算は[模試の見直し記録](mock-choice-review-20261118.md)を参照。模試だけ版をv4に更新し、旧版の採点済み結果を保持する。旧版で解答途中の模試は、改訂版で再開する際に新しい受験を開始する。

## 公開検索で確認した探し方

公開検索結果で教材との一致を2026年11月18日に確認。検索量・順位・クリック率の実測値はない。

| 検索の目的 | 例 | 対応先 |
| --- | --- | --- |
| 初級の学習順と模試を選ぶ | 日商簿記初級 無料 テキスト 40分 模試 | [コーストップ](https://shikaku-step-note.github.io/qualifications/boki-beginner/) |
| 試算表の三形式を使い分ける | 合計残高試算表 作り方 簿記初級 | [元帳から三種類の表を作る](https://shikaku-step-note.github.io/qualifications/boki-beginner/bb2-trial-balance/) |
| 売掛金の動きから実際の回収額を計算する | 売掛金 回収額 貸方合計 返品 試算表 | [月次残高から回収額を求める](https://shikaku-step-note.github.io/qualifications/boki-beginner/bb2-monthly/) |

新しい章を追加する際は、出題範囲との対応、前後の順序、本文と解答の根拠、図の参照先を先に確認する。採点問題を変える場合は評価の版を更新する。添付テキストは `pnpm build` で再生成する。
