---
{
  'stableId': 'ip-protocols',
  'qualification': 'it-passport',
  'title': 'TCP/IP・名前解決とインターネット',
  'description': '代表的なプロトコルの役割を説明する。アドレスと名前の関係を理解する。具体例と理解度チェックで学ぶITパスポートの無料レッスンです。',
  'order': 43,
  'minutes': 73,
  'sample': false,
  'updated': '2026-11-20',
  'unit': 22,
  'syllabus': [59, 60],
  'objectives': ['代表的なプロトコルの役割を説明する', 'アドレスと名前の関係を理解する'],
  'prerequisite': '直前の「LAN・無線とネットワーク構成」を学習済みだと進めやすくなります。各用語は本文でも説明します。',
  'keywords': ['DNS', 'DHCP', 'TCP', 'TLS'],
  'glossary':
    [
      { 'term': 'DNS', 'definition': 'ドメイン名に対応するIPアドレス等の情報を調べる仕組み。' },
      { 'term': 'DHCP', 'definition': 'IPアドレスなどのネットワーク設定情報を自動的に配布する仕組み。' },
      { 'term': 'TCP', 'definition': '順序制御や再送等により信頼性のある転送を提供するプロトコル。' },
      { 'term': 'TLS', 'definition': '通信の暗号化や相手の認証、改ざん検出等を支えるプロトコル。' },
    ],
  "inlineGlossary": [
    {"id": "dns", "term": "DNS"},
    {"id": "dhcp", "term": "DHCP"},
    {"id": "tcp", "term": "TCP"},
    {"id": "tls", "term": "TLS"},
    {"id": "udp", "term": "UDP", "definition": "User Datagram Protocolの略です。接続を確立せずにデータを送り、到達や順序はプロトコル自体では保証しません。"},
    {"id": "nat", "term": "NAT", "definition": "Network Address Translationの略です。通信の途中でIPアドレスを変換し、内部ネットワークと外部の間の通信などに用います。"}
  ],
}
---

## 通信の約束を階層に分ける

通信する機器が、どの形式の情報をどの順で送り合うかという約束がプロトコルです。相手へ届ける仕事は、物理的な伝送、ネットワーク間の転送、アプリケーション間の受渡しなどへ分けられます。役割を階層に分けると、一部の方式を変えるときも、ほかの役割を整理して考えられます。

IPは宛先などを基にパケットを転送します。その上で<a class="lesson-term" data-lesson-term href="#lesson-term-tcp">TCP</a>は接続、順序、再送などを管理し、連続するデータを渡します。<a class="lesson-term" data-lesson-term href="#lesson-term-udp">UDP</a>は同じ接続管理や再送を提供しないため、必要な制御は用途に応じて上位で考えます。ポート番号は、同じ端末のどの処理へ渡すかを区別する手掛かりです。

## アドレスとネットワーク

IPv4は32ビット、IPv6は128ビットのアドレスを用います。サブネットマスクはIPv4のネットワーク部分等を示します。プライベートアドレスを外部通信へ対応させる<a class="lesson-term" data-lesson-term href="#lesson-term-nat">NAT</a>等の仕組みがあります。<a class="lesson-term" data-lesson-term href="#lesson-term-dhcp">DHCP</a>はIPアドレスなどの設定情報を配布します。<a class="lesson-term" data-lesson-term href="#lesson-term-dns">DNS</a>はドメイン名からアドレス等の情報を調べる仕組みです。IPアドレスだけから利用者本人を常に一意に特定できるとは限りません。

## Webとメール

HTTPはWebのデータ転送、HTTPSは<a class="lesson-term" data-lesson-term href="#lesson-term-tls">TLS</a>等により通信を保護するWeb接続です。TLSは暗号化、相手の認証、改ざん検出等を支えますが、接続先の内容や商取引の安全性を保証しません。SMTPはメールの転送、POPやIMAPは受信・参照の方式に関係します。FTPはファイル転送の方式ですが、認証情報等をどう保護するかを確認します。

## 例：URLを開くまで

URLのホスト名をDNSで調べ、接続先へ通信し、HTTPSなら証明書等を検証してWebの内容を取得します。キャッシュやCDNは応答や配信を助けますが、古い情報の扱いも必要です。検索サービス、メール、SNS、オンライン会議などは、これらの基盤とアプリケーションの組合せで成り立ちます。

## まとめ

名前を調べる、設定を配る、転送する、保護するという役割で略語を整理します。

## 名前を引き、接続し、要求を送る

新しい端末をネットワークにつなぐと、DHCPでIPアドレスや既定ゲートウェイなどの設定を受け取る構成があります。利用者がURLを入力すると、DNSで名前を接続先の情報に対応付け、接続後にHTTPの要求を送ります。名前が引けない場合と、名前は引けるがサービスが応答しない場合とでは、調べる箇所が違います。

TCPは順序や再送を扱う通信に使われます。UDPはその仕組みを持たず、遅延の少なさを重視する用途などで利用されます。用途によってはアプリ側が必要な信頼性を補います。単に「UDPだから速い」「TCPだから絶対失われない」と決めつけないようにします。

HTTPSはTLSを用い、証明書を適切に検証した接続では相手の確認と経路上の保護に役立ちます。サービスの内容自体が正しいことは別です。メールでも、SMTPは送信・配送、IMAPはサーバ上のメールの参照・管理というように、通信で果たす役割から判断します。

<details><summary>DHCPでIPアドレスを取得できれば、名前解決も確認済み？</summary><p>端末の設定を受け取ることと、宛先名の情報をDNSで引けることは別です。</p></details>

## ブラウザでページを開くまでの通信を追う

新しい端末をLANに接続し、名前で社内Webページを開きます。DHCPを利用する構成なら、端末はIPアドレスなどの設定を受け取ります。DNSはWebサイト名を接続先のIPアドレスに対応づけます。その接続先と通信を始め、HTTPSならTLSで通信相手の確認や保護を行った上で、HTTPの要求・応答をやり取りします。IPアドレスで到達できるのに名前から接続先が分からないなら、最初にDNS側の問題を切り分けます。

<figure id="ip-protocols-figure-1"><svg viewBox="0 0 360 220" width="360" height="220" style="max-width:100%;height:auto" role="img" aria-label="DHCP：端末のネットワーク設定、DNS：サイト名から接続先を取得、TLS：通信相手を確認し保護、HTTP：ページを要求し応答を受ける"><g fill="currentColor" font-size="14" text-anchor="middle"><rect x="35" y="8" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="28">DHCP：端末のネットワーク設定</text><rect x="35" y="60" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="80">DNS：サイト名から接続先を取得</text><rect x="35" y="112" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="132">TLS：通信相手を確認し保護</text><rect x="35" y="164" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="184">HTTP：ページを要求し応答を受ける</text></g><g fill="none" stroke="currentColor" stroke-width="2"><path d="M180 41v14m-4-4 4 4 4-4"/><path d="M180 93v14m-4-4 4 4 4-4"/><path d="M180 145v14m-4-4 4 4 4-4"/></g></svg><figcaption>端末側の設定、名前解決、通信の保護、Webの内容交換を分けて追います。</figcaption></figure>

## 送るものと優先する性質から方式を選ぶ

メールを送る際のサーバへの受渡しにはSMTPを使います。複数端末でサーバ上のメールを参照して既読状態も共有する運用にはIMAPが適しています。POPでもサーバにコピーを残す構成はありますが、IMAPと同じ同期の使い方とは限りません。

TCPは、順序の整った信頼できるバイト列をアプリケーションへ渡す仕組みを持ちます。UDPにはTCPと同じ再送や順序保証がなく、アプリケーション側が用途に応じて必要な制御を考えます。配信方式を判断するときは「消えたデータを必ず待つ方がよいか」「遅れて届いたデータを使うか」を分けます。VPNはネットワーク間や端末とネットワークの間に論理的な通路を作ります。接続できても、どの社内情報へアクセスしてよいかは別の権限の問題です。

## 層をたどると、正常な区間を切り分けられる

Web画面を開くとき、アプリケーションのHTTP要求はトランスポート層で通信に載せられ、インターネット層のIPでネットワーク間を渡り、目の前のLANではイーサネットや無線LANが運びます。例えば同じ端末から別のWebサービスを利用できるなら、少なくともその経路で物理的な接続とIPの通信は使えています。対象サービスだけ反応しないときは、名前解決、接続先のアプリケーション、サービスを指定するポート番号などへ調査を絞れます。ポート番号は通信先の機器の中で、どのサービスとの通信かを識別する手掛かりです。

OSI基本参照モデルでは、信号を伝える物理層、同じ区間でフレームを運ぶデータリンク層、ネットワーク間を扱うネットワーク層、端点間の通信を扱うトランスポート層、対話を管理するセション層、データ表現を扱うプレゼンテーション層、アプリケーションに機能を提供するアプリケーション層の七つに分けます。TCP/IPの四層モデルでは、下の物理・データリンクに当たる働きをネットワークインタフェース層に、上のセション・表現・サービスに当たる働きをアプリケーション層にまとめて考えることが多く、対応は機能の概略です。実際の通信方式が必ず七つの独立した処理に分かれて実装されるわけではありません。

<figure id="ip-protocols-figure-2"><svg viewBox="0 0 360 220" width="360" height="220" style="max-width:100%;height:auto" role="img" aria-label="Webの要求と応答：アプリケーション、端点間の通信：トランスポート、別ネットワークへ運ぶ：IP、目の前の通信区間：LAN"><g fill="currentColor" font-size="14" text-anchor="middle"><rect x="35" y="8" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="28">Webの要求と応答：アプリケーション</text><rect x="35" y="60" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="80">端点間の通信：トランスポート</text><rect x="35" y="112" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="132">別ネットワークへ運ぶ：IP</text><rect x="35" y="164" width="290" height="31" rx="6" fill-opacity=".08" stroke="currentColor"/><text x="180" y="184">目の前の通信区間：LAN</text></g><g fill="none" stroke="currentColor" stroke-width="2"><path d="M180 41v14m-4-4 4 4 4-4"/><path d="M180 93v14m-4-4 4 4 4-4"/><path d="M180 145v14m-4-4 4 4 4-4"/></g></svg><figcaption>同じWeb接続を上位からたどると、サービスの処理と通信経路の働きを切り分けられます。</figcaption></figure>

複数の機器で記録時刻を比較したい場合、NTPで時刻を合わせれば、時計のずれによる並びの誤りを減らせます。FTPはファイル転送のためのプロトコルです。保護が必要なデータでは、サービスの通信が暗号化される構成かを確認します。メールではMIMEにより添付などのデータの種類や表現を扱えます。多数の利用者に同報する場合、宛先を互いに知らせる必要があるかを考えます。CCは受信者から見え、BCCは通常、他の受信者にその宛先を表示しません。

## 移動先の接続と契約の条件を読む

携帯電話で接続中に電車が移動し、使う基地局が変わっても通信を引き継ぐのがハンドオーバーです。契約している事業者の網の外で、提携先の網を使うのがローミングです。前者は通信を引き継ぐ技術、後者は他の事業者のサービスを使う仕組みに着目します。SIMは契約や加入者に関わる情報を扱い、eSIMでは対応端末にプロファイルを追加できます。電話番号を保ったまま契約先を変えるMNPは別の手続です。MVNOは他社の移動通信網を利用してサービスを提供する事業者、ISPはインターネットへの接続を提供する事業者です。

1か月の転送量が2 GBで、従量制は基本料300円に1 GB当たり200円を加える、定額制は月1,000円とします。同じ品質でほかの料金を無視すれば、2 GBでは従量制700円、4 GBでは従量制1,100円なので定額制のほうが安くなります。パケット通信では情報を小さな単位に分けて伝送しますが、契約の課金単位が必ずパケット数とは限りません。上限超過で速度制限がある場合は、費用の比較と別に利用可能な速度も確認します。

<span id="textbook-protocols"></span>

<span id="ip-protocols-source-reasoning"></span>

## 接続の記録を、設定から名前、要求までたどる

Webを開くときは、ネットワーク参加の設定、相手の名前、相手との通信、利用者の権限という段階を分けます。記録が残った順に、分かったことと、まだ確認していないことを並べます。

| 記録 | 分かること | まだ分からないこと |
| --- | --- | --- |
| DHCPでIP、経路、DNSの設定を取得 | 接続用の設定が渡された | 外のサービスへ届くか |
| DNSがサイト名に対応するアドレスを応答 | 名前を解決できた | 接続や本人確認が成功するか |
| TLSで証明書の名前等を検証して接続 | その名前への保護された通信を開始 | 利用者に閲覧権限があるか |
| HTTPで認証を要求する応答 | Webの要求に応答が返った | 利用者の認証と権限 |

DNSが成功しても閲覧権限は得ていません。また、証明書の名前はURLのホスト名と照合します。URLのパスや入力したパスワードをDNSが照合するわけではありません。エラーの段階に合う記録を調べ、正常と分かったところまで設定し直さないようにします。

**異なる記録を読む。** DNSは正常ですが、証明書の対象名がURLのホスト名と一致しません。何を確認し、認証情報の入力はどう扱いますか。

<details><summary>解答と確認範囲を読む</summary>
<p>URL、正しい接続先の案内、サーバが提示した証明書の対象名や設定を確認します。接続先の確認が済むまで認証情報の入力を控えます。DNSでアドレスが得られたことだけでは、証明書の不一致を解消できません。</p>
</details>

## 接続、名前解決、認証を別々の成功条件として読む

社内で新しい端末を使い始めます。無線に接続できたこと、サービス名から接続先を調べられたこと、サーバに届いたこと、サービスにログインできたことはそれぞれ別の確認です。

<figure id="ip-protocols-figure-3"><svg viewBox="0 0 340 228" width="340" height="228" style="max-width:100%;height:auto" role="img" aria-label="設定、DHCPなどで端末を設定。名前、DNSで接続先を調べる。通信、接続し相手の証明書を確認。利用、HTTP応答と操作権限を確認"><rect x="4" y="4" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="29" fill="currentColor" font-size="14">設定</text><text x="126" y="29" fill="currentColor" font-size="14">DHCPなどで端末を設定</text><path d="M170 46v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="58" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="83" fill="currentColor" font-size="14">名前</text><text x="126" y="83" fill="currentColor" font-size="14">DNSで接続先を調べる</text><path d="M170 100v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="112" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="137" fill="currentColor" font-size="14">通信</text><text x="126" y="137" fill="currentColor" font-size="14">接続し相手の証明書を確認</text><path d="M170 154v10m-4-4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="166" width="332" height="40" rx="5" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><text x="16" y="191" fill="currentColor" font-size="14">利用</text><text x="126" y="191" fill="currentColor" font-size="14">HTTP応答と操作権限を確認</text></svg><figcaption>画面でサービスを開けない場合、どの段階まで成功したかを確かめます。</figcaption></figure>

<span id="protocols-textbook-skill-1"></span>

### 端末の設定と名前の問い合わせを分ける

DHCPは端末にIPアドレスなどの通信設定を渡す仕組みです。DNSは名前に対応する情報を調べる仕組みで、端末自身の設定を割り当てる役割とは異なります。ある端末で通信設定が得られず、別の端末ではサービス名を調べられるなら、新しい端末側の接続・設定を先に確認します。反対に、接続先の住所が分かる場合だけ通信できる状況なら、名前解決の設定やサービスを点検します。

<span id="protocols-textbook-skill-2"></span>

### 転送の性質とアプリの役割を切り分ける

IPは別のネットワークへパケットを届ける役割を担います。TCPは順序や届かなかったデータの再送などを扱います。UDPではそのような配送保証をプロトコル自身は提供せず、用途に応じてアプリが扱います。HTTPは文書の要求と応答などを取り決めるアプリケーション層のプロトコルです。TLSを使うHTTPSでは通信の機密性や相手の確認を支えますが、ログイン後にどの操作が許されるかはサービス側の権限で決まります。

<span id="protocols-textbook-skill-3"></span>

### 送るメールと受け取ったメールを分ける

送信用にはSMTPを使います。受信側でサーバ上のメールと状態を複数端末で共有したいときはIMAPが使われます。POPはサーバからメールを取得する仕組みで、端末の設定によってサーバにコピーを残す場合もあります。端末で時計が大きくずれていると有効期間の確認やログの比較に影響することがあります。NTPは時計を合わせるために使うので、名前解決とは役割が異なります。

<span id="protocols-textbook-skill-4"></span>

### 携帯通信の切替えと契約を区別する

移動中に接続する基地局が変わって通信を続けるのがハンドオーバーです。契約先とは別の通信事業者の網を利用するローミングとは判断の基準が違います。料金の問題では、固定料金に含まれる量、超過分の単価、丸め単位を先に読みます。5 GBまで2,000円、超過分が1 GB当たり400円で、7 GB使うなら2,000＋2×400＝2,800円です。

<details><summary>練習問題の解き方を確かめる</summary>

**練習**　社内と自宅で既読・未読を同じ状態に保ちたい。送信に使う仕組みと、受信側で状態を共有する仕組みを答えてください。

送信用はSMTPです。サーバ上のメールや状態を複数端末で共有したい場合はIMAPが適します。

</details>

**復習の目安**　通信の各段階とプロトコルを対応させ、成功した部分と追加で調べる部分を説明できます。

<section class="guided-lesson" id="guided-ip-protocols" aria-labelledby="ip-protocols-guided-title">
<h3 id="ip-protocols-guided-title">途中で確認　名前の解決と通信の保護</h3>
<p id="ip-protocols-guided-prompt">ブラウザがサーバの名前から接続先のIPアドレスを得た後、Web通信の内容を保護します。二つの役割の組合せはどれですか。</p>
<form data-guided-practice data-expected="correct" data-guided-hint="接続先を知る作業と、接続後のデータを保護する作業を分けます。" aria-labelledby="ip-protocols-guided-title" aria-describedby="ip-protocols-guided-prompt" data-lesson-screen-only>
<fieldset hidden>
<legend>自分の答えを入力する</legend>
<label><input type="radio" name="ip-protocols-guided-answer" value="correct"> 名前から接続先を調べるのがDNS、Web通信を保護するのがHTTPS</label>
<label><input type="radio" name="ip-protocols-guided-answer" value="choice-1"> 名前から接続先を調べるのがHTTPS、Web通信を保護するのがDNS</label>
<label><input type="radio" name="ip-protocols-guided-answer" value="choice-2"> どちらも同じ役割で、名前が分かれば通信の保護も済む</label>
<button type="submit" class="button secondary">答えを確かめる</button>
<button type="reset" class="button secondary">やり直す</button>
</fieldset>
<p role="status" data-guided-feedback></p>
</form>
<details><summary>答えと確認方法を読む</summary>
<p data-guided-solution>DNSで名前に対応するIPアドレスを調べます。HTTPSはTLSを使い、Web通信の暗号化などを行います。接続先のIPアドレスを知るだけでは、送るデータの保護はできません。</p>
</details>
</section>
