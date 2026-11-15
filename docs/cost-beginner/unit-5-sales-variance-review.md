# 原価計算初級 ユニット5の範囲・教材・検索の点検

確認日 2026-11-15。改訂対象は「予算と実績から利益を確かめる」。日本商工会議所の出題範囲2(2)は予算売上高と実際売上高、販売数量差異と販売価格差異。2026年度に適用される範囲と2027年度確定の原価計算初級で変更なし。原価・在庫の計算はユニット1〜3、CVPはユニット4を前提とする。[出題範囲](https://www.kentei.ne.jp/wp/wp-content/uploads/2018/01/h30genkashokyu.pdf) · [適用年度](https://www.kentei.ne.jp/bookkeeping/exam-list)

現行の試験案内では40分の選択式。公開サンプルの第2問はCVPを扱い、販売数量・価格差異の分解順序や固定の配点は確認できない。教材と演習は独自作成。問題で計算の順序が指定された場合はその条件に従う。参考として比較する別方式では、数量・価格の基準を一組で使う。売上高差異を、上位級の原価差異や標準原価計算の範囲に読み替えない。共通資料の最後で費用を追加して利益を求める設問は、CVPとのつながりを確かめる応用。[公開サンプル](https://www.kentei.ne.jp/bookkeeping/ca/sample) · [試験案内](https://www.kentei.ne.jp/33013) · [上位級との違い](https://www.kentei.ne.jp/bookkeeping/ca/point_ca)

## 教材と検索意図の対応

既存の4章は「比較の前提をそろえる」「数量・価格へ分ける」「複数商品へ適用する」「全範囲の例で原価・利益と結び付ける」を分担する。報告書から数量と単価を復元する技能は、二つの式の基準を教える既存の章に追加した。独立した資料で初めから終わりまで練習する役割は、新しい総合確認が担う。各章の既存教材と識別子を維持した。

| レッスン | 主な日本語の検索意図候補 | 新しい例題と操作 |
| --- | --- | --- |
| cb2-budget | 予算実績差異の求め方、予算と実績の比較、売上達成率 | #unit5-budget-model と #unit5-budget-comparison。月途中の予定表と提供完了の明細を照合。#guided-budget は8,000円 |
| cb2-sales-variance | 販売数量差異の求め方、販売価格差異の求め方、売上高差異分析 | #unit5-sales-variance-model と #sales-variance-bridge-diagram で二段階の金額を追う。#unit5-sales-variance-comparison で元の資料に戻り、合計が同じ内訳を区別。#guided-sales-variance は不利差異の金額10,800円 |
| cb2-variance-cases | 複数製品の売上高差異、返品と数量差異 | #unit5-variance-cases-model と #unit5-variance-cases-comparison。新商品や販売終了分の比較可能性を確かめる。#guided-variance-cases は全体の売上増3,000円 |
| cb2-integration | 原価計算初級 総合例題、利益と売上高差異の違い | #unit5-integration-model と #unit5-integration-comparison。売上増のまま営業利益が減る理由を費用から確かめる。#guided-integration は21,000円 |

各章に数値入力とヒントを用意し、解答と途中式はJavaScriptが使えなくても開ける。表と図の情報は本文にも記載した。

## 評価・記録

ユニット5は4章、コースは全29章。総合確認を14問から21問へ拡張した。新しい7問では、6個入りの箱を個数へ直し、当月返品を反映し、売上高から実績単価を求める。予算228,000円、比較用256,800円、実績231,800円。指定順序では数量差異＋28,800円と価格差異−25,000円が、総額＋3,800円に戻る。別方式の＋25,800円と−22,000円でも総額が同じになる理由を確認する。三つの数値入力で符号を確かめる。最後の利益計算は費用の前提を追加した応用で、予算60,000円、実績41,400円。

既存の理解度チェックと用語確認、全範囲の模試2回を維持した。各模試のCVPと売上差異の資料・設問・解答を再点検した。模試Aは総額と価格差異、模試Bは数量・価格・総額を計算する。過去の総合確認は別版の記録として保存し、追加設問を含む現在の採点へ換算しない。

## 検索の根拠

2026-11-15のGoogle Search Console提供ファイルは日本のウェブ検索で直近24時間。原価計算初級のコースは2表示、0クリック、平均掲載順位8.0。サイト全体62表示、うちモバイル53。ユニット5のクエリと着地ページの組合せは取得できなかった。BingのCSVはサイト全体28表示・3クリックの日別データで、ページとクエリを含まない。

上の語は公式の用語と日本語の公開検索結果を基にした候補。検索数や現在順位の測定値ではない。基本の式、複数製品と返品、全範囲を使う例題を章ごとに分け、タイトル・説明とオンサイト検索語をそろえた。公開後は同じ長さの期間で日本・端末別のクエリと掲載URLの組合せを比較する。[Googleのタイトルリンク](https://developers.google.com/search/docs/appearance/title-link) · [検索パフォーマンス](https://support.google.com/webmasters/answer/7576553) · [Google検索のAI機能](https://developers.google.com/search/docs/appearance/ai-features)

## 維持管理

本文は `src/content/lessons/cb2-*.md`。総合問題は `src/data/cost-beginner-reviews.json`、原票は `cost-beginner-unit5-material.json`、出題範囲への根拠は `cost-beginner-coverage.json`。章・問題のIDを維持し、問題を変更した評価だけ版を更新する。年度ごとに公式の範囲を確認し、`pnpm build` でTXTを作り直す。
