# マネジメント系 2026-11-16の教材再監査

日付は確認日。対象はIPAの現行シラバスVer.6.5本文27〜34ページの項目25〜32、サイトのユニット8〜12。既存の教科書版証拠 `docs/it-passport/textbook-management.json` と `management-depth.json` を土台に、説明、例題、次の独力課題とのつながりを確認。公式の将来シラバス案、各規格の実務認定、専門監査の実施は対象外。現行範囲の基礎語は既存節に残す。公式公表は [試験要綱・シラバス](https://www.ipa.go.jp/shiken/syllabus/gaiyou.html)、[Ver.6.5 PDF 該当範囲](https://www.ipa.go.jp/shiken/syllabus/omgdg50000005kn1-att/syllabus_ip_ver6_5.pdf#page=31)。演習と数値はオリジナル。

| ユニット・章 | 到達目標から解法・根拠への順 | 自力演習と後続の評価 |
| --- | --- | --- |
| U8・ip-development。前提はシステム化計画・要件定義・調達 | 開発工程とテストは「要求をテストできる形にする」→「故障の範囲に合わせてテストを選ぶ」→「教科書演習：要件、設計、テストを一つの表で照合する」。移行・保守は「実績を評価して受入れと移行を決める」→「運用開始後の変更を保守で扱う」→ `#ip-development-new-worked-example`。3件同数の例で欠落・重複を見つけ、番号がそろった別条件で状態の異常を識別。 | 「自分で解く：移行した翌日の食い違い」と解答節。既存 `ip-development-textbook-boundary`・`-views`・`-migration`・`-maintenance`。U8新 `ip-management-u08-transfer` は13:00の境界と通知・台帳の連携を同時に検証。 |
| U9・ip-agile。前提はシステム開発とテスト・移行 | モデルの比較は「何がまだ分からないかで開発モデルを選ぶ」→「教科書演習：不確実性を読んで、進め方を組み立てる」。役割・継続改善は「スプリントの結果を次の判断に使う」→ `#ip-agile-new-worked-example`。入荷画面の観察結果、通信性能、環境待ちを、次に決めることから区別する。 | 「自分で解く：改善対象はモデルか、運用か」と解答節。既存 `ip-agile-textbook-choose`・`-scrum`・`-xp`・`-model`。U9新 `ip-management-u09-transfer` は返品受付の機能改善と準備手順をそれぞれ適切な振り返りへ振り分ける。 |
| U10・ip-project。前提は開発プロセス・アジャイルとDevOps | WBSと日程は「開始前に、何を終えたら成功かを決める」→「二つの経路で、何日まで待てるかを計算する」→「教科書演習：合流点の締切から作業の余裕を逆算する」。制約・リスクは「変更と進捗を、関係者が判断できる形で伝える」→ `#ip-project-new-worked-example`。同じ担当者が二作業を行う順序で最終確認が9→10日目または11→12日目になることを追う。 | 「自分で解く：短縮案に効果があるか」「自分で解く：何を報告すると判断できるか」。既存 `ip-project-textbook-schedule`・`-slack`・`-resource`・`-risk`・`-report`。次の読解章で工程表と費用資料を組み合わせる。 |
| U10・ip-reading-project-plans。前提は前章の依存関係・クリティカルパス | 前進・後退は「最短日数と余裕を求める」で合流の最大値と後退の最小値を実表と照合。短縮案は「工期を縮めたら最長経路を計算し直す」「短縮費用まで比べる」→ `#ip-reading-project-plans-new-worked-example`。共有の準備を短縮する案と片側だけの案を比べ、経路への効果と費用を数える単位を区別。 | 「新しい条件で解く」の解答と条件差。既存 `ip-reading-project-plans-textbook-join`・`-slack`。U10新 `ip-management-u10-transfer` は共通作業を短縮する場合10万円、しない場合11万円を比較。 |
| U11・ip-services。前提はプロジェクト管理の計画と引継ぎ | 障害対応と問題管理は「問い合わせから復旧、恒久対応まで担当をつなぐ」→「教科書演習：サービスの申込みから復旧までを記録で追う」。SLAと改善は「SLAの目標と、実測する指標を分ける」→「例題：月次報告の数値から改善を選ぶ」→ `#ip-services-new-worked-example`。測定条件と重複時間をそろえ、480分中455分が利用可能という測定値まで求める。 | 「自分で解く：合意、復旧、変更を分ける」「自分で解く：どの仕組みで何を減らすか」。既存 `ip-services-textbook-sla`・`-desk`・`-change`・`-pdca`。U11新 `ip-management-u11-transfer` は測定外保守と重複停止を整理して30分を出し、原因調査を問題管理に振る。 |
| U12・ip-audit。前提はサービス管理の記録 | 独立性と証拠は「統制を動かす人と、独立して確かめる人」→「記録を組み合わせて、何が言えるかを判断する」→ `#ip-audit-new-worked-example`。内部統制の目的と限界は「統制は設計と運用の両方を見る」「監査で示せる結論と、改善を助言する範囲」を読み、確定した時刻逆転と証拠不足で結論の書き方を変える。 | 「自分で解く：例外が見つかった後に何をするか」「自分で解く：方針、実行、点検の責任を分ける」。既存 `ip-audit-textbook-proof`・`-sample`・`-follow`・`-govern`。U12新 `ip-management-u12-transfer` は前後の時刻と台帳の不足を別々に扱い、承認代行を避ける。 |

既存の六つの章を維持。U8、U9、U11、U12は、初学者の定義から既存の証拠照合・反復・運用・報告の作例と新しい条件差へ進む。U10は方法を学ぶ章と初めての工程表・費用を扱う章が既に分かれており、共有作業の条件差を後者に追加することで足りる。旧見出し、評価ID、図の内容は維持。主要節を移設していない。

## 見る資料と回答

静的な代替は各 `guided-ip-...` 節の「解答と考え方を読む」。数値入力は整数。誤答には次に照合する条件を示し、正答時には手順を返す。選択式も各誤答の理由が異なる。

| 章 | 先に見る図 | 二つ目以降の資料 | 入力・期待結果 |
| --- | --- | --- | --- |
| development | `ip-development-test-scope`：部品、連携、受入れの範囲 | `ip-development-requirement-acceptance`：要件から受入れを追う。 `ip-development-worked-evidence`：件数・キー・項目の三層 | `guided-ip-development`、b。予約番号で変換前後の状態を照合。 |
| agile | `ip-agile-scrum-feedback`：成果への反応と作業の進め方 | `ip-agile-worked-evidence`：画面、性能、反復の判断ごとの証拠 | `guided-ip-agile`、c。現場条件で端末の読み取りを検証。 |
| project | `ip-project-parallel-paths`：先行条件と合流 | `ip-project-gantt-float`：作業の余裕。 `ip-project-worked-evidence`：担当を共有するときの順序 | `guided-ip-project`、8日。時点7の合流後に最終確認1日。 |
| reading-project-plans | `ip-reading-project-plans-project-paths`：二経路の合流 | `ip-reading-project-plans-worked-evidence`：共有作業が両経路に効くときの比較 | `guided-ip-reading-project-plans`、9日。短縮後は上9日・下8日。 |
| services | `ip-services-service-desk-routing`：復旧と原因調査の分岐 | `ip-services-power-continuity`：UPSと発電装置の時間。 `ip-services-worked-evidence`：停止時間の重なり | `guided-ip-services`、22分。15＋12−5分。 |
| audit | `ip-audit-audit-records`：変更票、ログ、権限を突合 | `ip-audit-audit-evidence-chain`：規程と記録から報告。 `ip-audit-worked-evidence`：反映時刻と証拠不足 | `guided-ip-audit`、b。月末の一覧とは別に削除時刻の履歴を確認。 |

未実施：外部専門家による査読、受験者の結果を用いた統計的な難易度校正。今回の変更には、最新公開問題の再現や公開されていない公式配点に関する推測を含めない。ブラウザと公開確認は共通のリリース検証で実施する。
