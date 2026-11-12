---
{
  'stableId': 'ip-os-files',
  'qualification': 'it-passport',
  'title': 'OSとファイルシステム',
  'description': 'OSの資源管理を説明する。ファイルの経路と権限を扱う。具体例と理解度チェックで学ぶITパスポートの無料レッスンです。',
  'order': 28,
  'minutes': 60,
  'sample': false,
  'updated': '2026-11-12',
  'unit': 17,
  'syllabus': [45, 46],
  'objectives': ['OSの資源管理を説明する', 'ファイルの経路と権限を扱う'],
  'prerequisite': '直前の「システム構成と信頼性・性能」を学習済みだと進めやすくなります。各用語は本文でも説明します。',
  'keywords': ['OS', 'プロセス', '絶対パス', 'デバイスドライバ'],
  'glossary':
    [
      {
        'term': 'OS',
        'definition': 'ハードウェア資源を管理しアプリケーション等の実行環境を提供する基本ソフトウェア。',
      },
      { 'term': 'プロセス', 'definition': '実行中のプログラムを管理する単位。' },
      { 'term': '絶対パス', 'definition': '基点となるディレクトリなどから対象までの経路を示す指定。' },
      { 'term': 'デバイスドライバ', 'definition': 'OS等から周辺機器を制御するためのソフトウェア。' },
    ],
}
---

## OSは資源を管理する

OSはCPU、メモリ、ファイル、入出力などを管理し、アプリケーションの実行環境を提供します。プロセスは実行中のプログラムの単位、スレッドはその中の処理の流れの単位です。マルチタスクは複数の処理を切り替えたり並行させたりして進めます。スケジューリングでCPUの利用順序を調整します。

## 主記憶を使う仕組み

仮想記憶は補助記憶等を利用し、プログラムから見える記憶空間を扱う仕組みです。実際の主記憶が無限に増えるわけではありません。ページングによる入替えが過度になると処理が遅くなる場合があります。デバイスドライバは機器を制御し、ミドルウェアはOSとアプリケーションの間などで共通機能を提供します。

## ファイルとディレクトリ

ファイルは名前を持つデータのまとまり、ディレクトリは階層的に整理する場所です。絶対パスは基点から、相対パスは現在地からの経路を表します。「.」は現在、「..」は一つ上を表す文脈があります。拡張子は種類の手掛かりですが、内容の安全性を保証しません。隠れた二重拡張子にも注意します。

## 例：資料の共同利用

原稿は編集担当だけが書込みでき、他部署は読取りだけにすれば誤変更を抑えられます。共有フォルダへの権限、バックアップ、版の管理を決めます。ファイルを削除しても媒体から完全に復元不能になったとは限らないため、廃棄時は適切な消去を行います。フル・差分・増分バックアップは取得対象と復元時に必要な組合せが異なります。

## まとめ

OSの管理対象とファイル操作の意味を理解し、権限と復旧をセットで考えます。

## 保存、共有、復元を分けて考える

利用者が二つのアプリを同時に動かしても、CPU、メモリ、画面、記憶装置は共有されています。OSはそれらの資源を管理し、アプリに使わせます。主記憶が足りないときに補助記憶の領域を利用する仮想記憶は、物理メモリが実際に増えたという意味ではなく、入替えが多いと処理が遅くなります。

部署でファイルを共有するとき、名前が分かっても読む権限があるとは限りません。利用者やグループに、読取、書込など必要な権限を付けます。編集を許可しない閲覧用資料に書込権限を配ると、誤って上書きするおそれがあります。拡張子は形式の手掛かりですが、名前を変更するだけでファイルの中身は変換されません。

同じディスクの別フォルダにコピーすれば誤削除の一部には備えられますが、ディスク故障には一緒に失われます。別媒体や別の場所に復元できる複製を置き、実際に復元できるかを試します。同期は変更を伝える仕組みなので、誤削除まで同期される構成では世代管理などを別に考えます。

<details><summary>ファイル名を .pdf に変えればPDFに変換される？</summary><p>名前だけ変わり、内部形式は変わりません。変換には対応した処理が必要です。</p></details>

## 同じファイル名でも到達先が違う理由

フォルダ `/study/week1` にいるとき、`../data/a.csv` は「親の `/study` に上がってから `data/a.csv` へ」を表します。到達先は `/study/data/a.csv` です。現在位置を `/study/week1/notes` に変えて同じ相対パスを使うと、今度は `/study/week1/data/a.csv` を参照します。パスの先頭から所在が決まる絶対パスなら現在位置に影響されません。

<figure><svg viewBox="0 0 360 220" width="360" height="220" style="max-width:100%;height:auto" role="img" aria-label="現在位置：/study/week1、.. で親へ：/study、data へ移動：/study/data、a.csv を開く：/study/data/a.csv"><g fill="currentColor" font-size="14" text-anchor="middle"><rect x="35" y="8" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="28">現在位置：/study/week1</text><rect x="35" y="60" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="80">.. で親へ：/study</text><rect x="35" y="112" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="132">data へ移動：/study/data</text><rect x="35" y="164" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="184">a.csv を開く：/study/data/a.csv</text></g><g fill="none" stroke="currentColor" stroke-width="2"><path d="M180 41v14m-4-4 4 4 4-4"/><path d="M180 93v14m-4-4 4 4 4-4"/><path d="M180 145v14m-4-4 4 4 4-4"/></g></svg><figcaption>相対パスは現在位置とセットで読みます。別の場所で実行する場合は到達先を引き直します。</figcaption></figure>

## 利用者の権限と資源の不足を切り分ける

共有フォルダを開けないとき、本人を確認できたか、その本人に読む権限があるか、指定先が存在するかを順に確認します。ログインに成功しても、別部署のファイルを書き換えてよいことにはなりません。OSは利用者、プロセス、メモリ、入出力を管理して、同じ端末で複数のアプリを動かせるようにします。

多くのアプリを開いたとき、OSが補助記憶と主記憶の間でデータを頻繁に移して処理が遅くなる場合があります。仮想記憶により主記憶の容量より大きいアドレス空間を利用できる構成でも、実際に使うデータの移動には時間がかかります。空きディスク容量があるから主記憶と同じ速さで処理できる、とは判断できません。ファイルの拡張子は形式を選ぶ手掛かりですが、名前を .csv に変えるだけで内容の文字コードや形式が変換されるわけでもありません。

<span id="textbook-os-files"></span>

## OSが分ける作業場所と、ファイルが置かれる場所

店舗のPCで、ある利用者は共有フォルダを読めますが書き込めません。別の利用者は一時的に処理が重くなると訴えています。OSが管理する権限、処理、主記憶、保存先を分けて考えます。

<figure><svg viewBox="0 0 340 228" width="340" height="228" style="max-width:100%;height:auto" role="img" aria-label="実行、OSが仕事の切替えを管理。記憶、主記憶と仮想記憶を管理。保存、ファイル名から保存先へ。権限、許可された操作だけ実行"><rect x="4" y="4" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="29" fill="currentColor" font-size="14">実行</text><text x="126" y="29" fill="currentColor" font-size="14">OSが仕事の切替えを管理</text><path d="M170 46v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="58" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="83" fill="currentColor" font-size="14">記憶</text><text x="126" y="83" fill="currentColor" font-size="14">主記憶と仮想記憶を管理</text><path d="M170 100v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="112" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="137" fill="currentColor" font-size="14">保存</text><text x="126" y="137" fill="currentColor" font-size="14">ファイル名から保存先へ</text><path d="M170 154v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="166" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="191" fill="currentColor" font-size="14">権限</text><text x="126" y="191" fill="currentColor" font-size="14">許可された操作だけ実行</text></svg><figcaption>OSは資源へのアクセスを調整します。症状に合わせて対象を切り分けます。</figcaption></figure>

<span id="os-files-textbook-skill-1"></span>

### 実行中の処理と保存済みファイルを区別する

アプリを開くと、保存されたプログラムが読み込まれ、実行中の仕事として扱われます。OSは複数の仕事にCPUを順に割り当て、入力や保存の待ち時間も調整します。アプリを切り替えられることは、どの仕事にもCPUを無制限に使わせることではありません。プリンタの種類ごとの操作をOSとアプリから扱えるようにするソフトがデバイスドライバです。

<span id="os-files-textbook-skill-2"></span>

### メモリが足りないときの症状をつなげる

OSはプログラムに仮想的なアドレス空間を用意し、実際の主記憶などと対応させます。主記憶に収まらないデータを補助記憶と入れ替える仕組みを使う場合、頻繁な入替えが続くと処理が遅くなります。ストレージに空きがあるから主記憶の速度で作業できる、という意味ではありません。入替えが多いか、CPUが計算に時間を使っているか、出力装置を待っているかを測って判断します。

<span id="os-files-textbook-skill-3"></span>

### 相対パスを一段ずつ移動して確認する

作業場所が `/shop/report/july` のとき、`../sales.csv` は一段上の `/shop/report` にある `sales.csv` を指します。`../../sales.csv` ならさらに上の `/shop` です。先頭に `/` が付く `/shop/sales.csv` は起点がルートなので、作業場所を変更しても同じ場所を表します。ファイル名が同じでもディレクトリが違えば内容は別です。

<span id="os-files-textbook-skill-4"></span>

### アクセスできない原因を切り分ける

特定の利用者だけ書けず読めるなら、ファイルやフォルダに付与された権限を確認します。誰も書けないなら、権限の変更に加えて、保存先の空きや書込みを止める状態も確認します。ファイルを消してから戻せることと、記憶装置が故障した後に別の場所から復元できることは違います。復元が目的なら、別媒体または別システムにもバックアップを置き、復元手順を試します。

<details><summary>練習問題の解き方を確かめる</summary>

**練習**　作業場所が `/library/users/edit`。`../../data/list.csv` はどこですか。相対パスが正しいのに特定の係だけ書けない場合は何を点検しますか。

`edit` と `users` から二段上がると `/library`。そこから `data/list.csv` へ進みます。係に書込み権限があるかを確認し、必要な場合にだけ付与します。

</details>

**復習の目安**　パスをたどり、処理遅延、容量、権限のどれを調べるか判断できます。
