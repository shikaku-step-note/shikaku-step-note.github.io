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

既定の公開先は `https://shikaku-step-note.github.io/web/` です。開発時も `/web/` を開いてください。`astro.config.mjs` の `SITE_URL` / `BASE_PATH` で変更できます。`.env.example` に設定例があります。実行環境の変数として指定してください。

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

保存データの形式はversion 2、IndexedDBの構造バージョンは1です。version 1のバックアップも検証・移行します。通常はIndexedDBを使い、失敗時はlocalStorage、それも使えない場合は一時的なメモリ保存へ移り案内します。

バックアップは最大2MB、最大2,000レコードです。統合はレコード単位で更新日時が新しいものを優先します。将来の教材や現在表示しないIDの記録も失わず保持します。リセットと置き換えには確認が必要です。記録の保存先はサイトのオリジンに依存するため、独自ドメインへ移る前に利用者へバックアップを案内してください。

## 自動公開

`main` へのpushで `.github/workflows/deploy.yml` が型・内容・保存機能を確認して静的サイトを生成し、Pagesへ公開します。GitHub側の設定で **Settings → Pages → Source: GitHub Actions** を使用します。必要な権限があれば `configure-pages` でも有効化を試みます。

独自ドメインを使う場合はGitHub Pagesのドメイン設定に加え、リポジトリ変数 `SITE_URL`、`BASE_PATH` を設定してください。ルート公開の `BASE_PATH` は `/` です。

## 検索エンジンへの登録

- Search Consoleで公開URLのURLプレフィックスプロパティを追加します。
- HTMLタグによる所有権確認では、リポジトリ変数 `PUBLIC_GOOGLE_SITE_VERIFICATION` にトークン部分を設定し、再デプロイします。
- 公開された `/web/sitemap.xml` をSearch Consoleから送信します。
- `/web/robots.txt` はプロジェクト配下にあるため、オリジン全体のrobots制御には使われません。将来ルート公開するときは生成済みのrobots.txtが有効になります。他のリポジトリやオリジンルートは勝手に変更しません。
- 個人の進捗、内部検索、404、サンプル教材はnoindexです。サイトマップは公開可能なページのみ含みます。
- JSON-LDはWebSite、WebPage、BreadcrumbListを使用し、実在しない運営者や監修者は記載しません。GEO用の特別なランキング保証は行いません。

## 編集・連絡

資格概要の公式参照先を2026年10月24日に確認しています。レッスンは独自に作成したAI支援の入門サンプルで、専門監修済みとはしていません。法令・制度・試験条件は更新されるため、正式公開前に分野ごとの確認が必要です。

連絡先は公開のGitHub Issuesです。非公開の問い合わせメールや運営者の個人情報を架空で設置していません。将来導入する場合は、連絡・プライバシー・運営者情報の各ページを実際の状況に合わせて更新してください。
