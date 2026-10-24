// Build-time asset preparation. Never runs in the visitor's browser.
import sharp from 'sharp';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
const source = process.argv[2];
if (!source) throw new Error('Pass the original logo PNG path.');
await mkdir('public', { recursive: true });
await copyFile(source, 'public/logo.png');
for (const [name, size] of [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
])
  await sharp(source)
    .resize(size, size, { fit: 'contain', background: '#ffffff' })
    .png()
    .toFile(`public/${name}`);
const png = await readFile(source);
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 0;
header[7] = 0;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([header, png]));
const image = `data:image/png;base64,${png.toString('base64')}`;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f2f8f9"/><rect x="0" y="0" width="17" height="630" fill="#087e79"/><rect x="815" y="55" width="325" height="520" rx="28" fill="white"/><image href="${image}" x="845" y="130" width="265" height="265"/><path d="M870 447h215" stroke="#c1ddd9" stroke-width="3"/><text x="70" y="185" fill="#173c59" font-family="Yu Gothic,Meiryo,sans-serif" font-size="56" font-weight="bold">資格ステップノート</text><text x="74" y="272" fill="#087e79" font-family="Yu Gothic,Meiryo,sans-serif" font-size="32" font-weight="bold">無料で学べる資格学習サイト</text><text x="74" y="360" fill="#526773" font-family="Yu Gothic,Meiryo,sans-serif" font-size="25">今日のひとつが、明日の自信に。</text><rect x="74" y="442" width="320" height="58" rx="8" fill="#173c59"/><text x="103" y="480" fill="white" font-family="Yu Gothic,Meiryo,sans-serif" font-size="23">登録不要・自分のペースで</text></svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og-default.png');
await writeFile('public/.nojekyll', '');
console.log('Prepared original logo, favicon, app icons and 1200×630 social image.');
