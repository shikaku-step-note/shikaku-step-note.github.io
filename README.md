# 資格ステップノート

無料・登録不要の日本語資格学習サイト。Astro / TypeScriptで静的HTMLを生成し、GitHub Pagesに公開します。学習記録はIndexedDBに保存し、サーバーへ送信しません。

## 起動と確認

Node.js 24とpnpm 11.25.0を使用します。

```sh
pnpm install
pnpm dev
pnpm check
pnpm test:storage
pnpm build
pnpm verify
pnpm preview
```

既定の公開先は `https://shikaku-step-note.github.io/`、リポジトリは `shikaku-step-note/shikaku-step-note.github.io` です。開発時も `/` を開いてください。`astro.config.mjs` の `SITE_URL` / `BASE_PATH` で変更できます。`.env.example` に設定例があります。実行環境の変数として指定してください。

## 表示モードと旧URL

ヘッダーから端末連動・ライト・ダークを選べます。`src/scripts/theme.ts`と先行適用スクリプト、`src/styles/theme.css`が表示を管理します。明示した設定はlocalStorageの`shikaku-step-note:theme`へ保存し、学習記録と分離します。保存制限時も画面の切替えは可能です。

旧`/web/`のHTMLページには`src/pages/web/[...path].astro`でnoindexの移転ページを生成し、対応するルートのcanonicalへ移動します。クエリとフラグメントを保ち、任意の外部URLへの転送は行いません。GitHub Pagesにはサーバー側の301設定機能がないため、即時meta refreshとJavaScript、手動リンクを使います。同じオリジンのIndexedDBと既存キーを維持するため、学習データの移し替えは不要です。

## 資格を追加する

1. `src/data/qualifications.ts` に資格の情報、英数字の固定ID、学習ステップ、公式の参照先を追加します。
2. `src/content/lessons/` にMarkdown形式のレッスンを作成します。
3. `qualification` を資格IDに合わせ、`order` で順番を指定します。学習ステップの名称は資格データの `groups` と揃えます。
4. ビルドと検証を実行し、表示と内容を確認してから `main` に反映します。

## レッスンを追加する

既存のMarkdownをコピーしてください。主なフロントマターは次のとおりです。

```yaml
stableId: it-new-topic
qualification: it-passport
title: レッスンのタイトル
description: このレッスンで学べること。
order: 4
minutes: 6
sample: true
updated: '2026-10-24'
keywords: [検索語, 関連用語]
question: 練習問題の本文
options: [選択肢1, 選択肢2, 選択肢3]
answer: 0
explanation: 正解の理由と考え方。
```

`answer` は0から数えた正解の位置です。本文の `##` 見出しから目次を自動生成します。テンプレートは `src/pages/qualifications/[qualification]/[lesson].astro` です。

**stableIdは一度公開したら変更・再利用しないでください。** タイトルは変更できます。保存記録はURLやタイトルでなく、このIDを使います。資格IDも公開後は維持してください。

`sample: true` の教材は `noindex` とし、サイトマップから除外します。正式公開するときは、正確性・出典・独自の価値・対象範囲・必要に応じた専門的な確認を済ませてから `sample: false` に変更してください。サンプル表示の文言、ホームや資格カードのレッスン数なども公開状況に応じて見直してください。

## 学習記録

保存データの形式はversion 3、IndexedDBの構造バージョンは1です。version 1・2のバックアップも検証・移行します。通常はIndexedDBを使い、失敗時はlocalStorage、それも使えない場合は一時的なメモリ保存へ移り案内します。旧localStorageキー名は移行のため維持しています。

バックアップは最大20MB、レッスン最大2,000件、テスト最大1,000種類・合計5,000回（各テスト直近100回まで）を検証します。統合はレッスン・テストの各回単位で更新日時が新しいものを優先します。将来の教材や現在表示しないID・旧版の記録も保持します。リセットと置き換えには確認が必要です。記録の保存先はサイトのオリジンに依存するため、独自ドメインへ移る前にバックアップを案内してください。

## ITパスポート教材の編集

現行シラバスVer.6.5の63項目を37レッスンへ対応付けています。公式の級分けはありません。ユニットは公式の23中分類を学習単位にしたものです。2027年度の案を現行適用版と混同しないでください。

- 本文とメタデータ：`src/content/lessons/ip-*.md`。YAMLフロントマターの`unit`、`syllabus`、`objectives`、`glossary`等を編集します。
- 1レッスンの理解度チェック3問と総合確認用2問：`src/data/ip-questions.json`。キーはレッスンの固定IDです。
- 独自模試100問：`src/data/ip-mock.json`。現行の35/20/45問、120分を参考にしています。全問各1点で、IRT評価点・合否は再現しません。
- 分類・公式資料・問題版・テスト生成：`src/data/it-passport.ts`。用語テストは本文の用語定義から生成し、総復習は各ユニットの問題を再利用します。
- 出題内容や正解、採点を変更したら`ipVersion`を更新してください。旧版の履歴は残り、新版の得点へ読み替えません。
- `pnpm curriculum`で`public/downloads/it-passport-curriculum.txt`を再生成します。`pnpm build`でも自動生成します。TXTを手編集せず、元データを修正します。
- `archived: true`の旧ITサンプル3件はページと記録を保管します。新しい本文へ同じIDを使い回さないでください。旧サンプルの完了は新コースへ加算しません。
- 資格の`status`、名称、カテゴリは`src/data/qualifications.ts`が共通データです。ホーム・カード・一覧・案内ページはこのデータを参照します。公開範囲に関する編集方針・FAQ等の本文も確認します。

模試は開始時の絶対期限を保存します。閉じている時間も進み、期限後の再訪時に確定します。端末時計の変更、不正操作、ブラウザ間の同時編集を防ぐ試験システムではありません。学習用のローカル機能です。

## 自動公開

`main` へのpushで `.github/workflows/deploy.yml` が型・内容・保存機能を確認して静的サイトを生成し、Pagesへ公開します。GitHub側の設定で **Settings → Pages → Source: GitHub Actions** を使用します。必要な権限があれば `configure-pages` でも有効化を試みます。

独自ドメインを使う場合はGitHub Pagesのドメイン設定に加え、リポジトリ変数 `SITE_URL`、`BASE_PATH` を設定してください。ルート公開の `BASE_PATH` は `/` です。

## 検索エンジンへの登録

- Search Consoleで公開URLのURLプレフィックスプロパティを追加します。
- HTMLタグによる所有権確認では、リポジトリ変数 `PUBLIC_GOOGLE_SITE_VERIFICATION` にトークン部分を設定し、再デプロイします。
- 公開された `/sitemap.xml` をSearch Consoleから送信します。以前の`/web/`プロパティを使用していた場合はルートのURLプレフィックスも追加します。
- `/robots.txt`はルート配信され、ルートのサイトマップを案内します。旧URLの移転ページをサイトマップへ含めません。
- 個人の進捗、内部検索、404、サンプル教材、テスト実行ページはnoindexです。完成したIT本文・コース・テスト案内・対応表はサイトマップへ含めます。
- JSON-LDはWebSite、WebPage、BreadcrumbList、正式レッスンのLearningResourceを使用します。実在しない運営者や監修者は記載しません。特別なランキングやリッチリザルトの保証は行いません。

## 編集・連絡

ITパスポートの公式資料は2026年10月25日に確認し、コースの対応表に版・URL・日付を公開しています。簿記・FPは2026年10月24日に資格概要の参照先を確認した入門サンプルです。教材は独自に作成しAI支援を利用しています。専門監修済みとは表示していません。法令・制度・試験条件の変更時には公式資料を確認して更新してください。

連絡先は公開のGitHub Issuesです。非公開の問い合わせメールや運営者の個人情報を架空で設置していません。将来導入する場合は、連絡・プライバシー・運営者情報の各ページを実際の状況に合わせて更新してください。
