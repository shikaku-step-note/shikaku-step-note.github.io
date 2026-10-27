# 最初の拡充2単元の公開確認

2026年10月27日、コミット `73c39389f90d22eedb967b2062c8f5552b28e20f` の既存GitHub Pagesワークフローが成功した。新規公開は簿記論の帳簿7講と所得税法の範囲5講、およびそれぞれの独立単元演習・用語評価である。税理士全11科目の拡充完了を意味しない。新しい本試験相当模試は0件。

- [ワークフロー実行](https://github.com/shikaku-step-note/shikaku-step-note.github.io/actions/runs/40530867341)：completed / success、対象コミット一致。
- [簿記論・帳簿単元](https://shikaku-step-note.github.io/qualifications/zeirishi/units/zr2-boki-unit-records/) と [所得税法・範囲単元](https://shikaku-step-note.github.io/qualifications/zeirishi/units/zr2-shotoku-unit-scope/) はHTTP 200。代表講2件も200で、公開URLとroot canonicalが一致。
- 帳簿演習CはHTTP 200、noindex,follow。全ての新単元演習ランナーがサイトマップから除外されている。評価一覧と個々のランナーは区別して検査した。
- ホーム、税理士案内、robots.txt、sitemap.xml、TXTはHTTP 200。サイトマップは225 URL、root形式で、新単元を含む。
- 新しい簿記講の旧`/web/`パスはroot canonicalと即時のmeta refresh、noindex,followを持つ。GitHub Pagesの静的互換ページであり、HTTP 301とは表示しない。
- TXTに実在する単元演習Cの識別子を確認した。未執筆の全科目を完成済みとする表示へ変更していない。

詳細のHTTP応答・meta記録は制作環境の `work/zeirishi-upgrade/checks/published-reviewed-units.json`。これは公開技術チェックであり、GoogleやBingへのインデックス登録を証明するものではない。

## 同日の追加公開

続いてコミット `b5b408aec3cecacc4ae820723a05a0d71be76e05`、[実行40537815118](https://github.com/shikaku-step-note/shikaku-step-note.github.io/actions/runs/40537815118) も成功した。国税徴収法の基礎6講と独立評価を加え、拡充教材は3単元18講となった。保存不能時に現画面から直接バックアップできる回復手段と、複合問題の複数講への復習先も公開した。

[徴収基礎単元](https://shikaku-step-note.github.io/qualifications/zeirishi/units/zr2-kokuzei-unit-foundations/)、延滞税の代表講、単元記述、科目TXTのHTTP 200を確認した。公開教材のroot canonicalは一致し、記述ランナーはnoindexでサイトマップ外。サイトマップは232 URL。前の2単元と旧`/web/`互換も維持した。詳細は`checks/published-reviewed-units-b5b408a.json`。全科目・本試験相当模試の制作は引き続き未完了である。
