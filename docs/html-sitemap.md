# HTMLサイトマップ

- 公開URL：`https://shikaku-step-note.github.io/sitemap/`
- 全ページ共通のフッターから「サイトマップ」でリンクします。
- 資格・税理士科目ごとの案内、公開レッスン、学習単元、演習一覧、対応表、サイト案内を静的HTMLのリンクとして掲載します。JavaScriptを無効にしても一覧を読めます。
- 検索とマイ学習は利用者向けの機能リンクとして別に掲載します。個人の記録や回答は含みません。

## 更新方法

`src/lib/sitemap.ts` の `getSitemapEntries()` をHTMLとXMLで共用しています。資格・科目・単元・レッスンは既存のデータとコンテンツから生成されます。サイト案内の固定ページを追加するときは `src/lib/site.ts` の `publicPageLinks` に相対パスと日本語タイトルを追加してください。URLのベースパスとホストは既存の設定・hrefヘルパーを使います。

サンプル・アーカイブのレッスン、個々の演習実行画面、旧`/web/`互換ページは公開教材の一覧とXMLへ加えません。演習実行画面は資格ごとの演習一覧から到達できます。HTMLの一覧とXMLの正規URL集合の一致、重複、内部リンク、noindexの除外は `pnpm build` 後の `pnpm verify` で確認します。

## XMLサイトマップとの関係

HTMLは利用者とクローラーがページへ移動するための通常のウェブページです。XMLは引き続き `/sitemap.xml` に置き、robots.txtのSitemap行も維持します。HTMLをXMLとしてSearch Consoleのサイトマップ欄へ登録しません。Googleが対応するサイトマップ形式はXML・RSS/Atom・URLを並べたテキストです。

2026-10-28の公開前確認では、既存XMLはHTTP200・Content-Type application/xmlで、XMLとして解析でき、256件の重複のないroot URLを含みました。robots.txtも200でクロールを許可していました。この確認はSearch Consoleでの処理成功やインデックス登録を証明するものではありません。HTML追加は、Search Consoleの取得失敗の原因がGitHub Pages一般の不具合であると確認したうえでの変更ではありません。

参考：[Google：サイトマップの概要](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)、[サイトマップの作成と送信](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)。内部リンクとサイトマップはいずれもページの発見を助けますが、クロール・登録・順位を保証しません。

## 追加時の検証

型検査76ファイルはエラー・警告・ヒントなし。生成820HTML、257サイトマップURL、21,479内部参照の検証が成功しました。旧256URLを全て保持し、追加はHTMLサイトマップ自身の1件だけです。ブラウザでJavaScript無効時の257件のリンク、ホームのフッターからの移動、キーボードによる目次移動、320/768/1440pxの明暗6条件を確認。320pxの両テーマでA/AA関連の自動アクセシビリティ検査に違反はありませんでした。自動検査は全端末・全補助技術に対する適合認証ではありません。
