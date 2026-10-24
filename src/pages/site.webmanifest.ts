import { href } from '../lib/site';
export function GET() {
  return new Response(
    JSON.stringify({
      name: '資格ステップノート',
      short_name: '資格ノート',
      lang: 'ja',
      start_url: href(''),
      scope: href(''),
      display: 'standalone',
      background_color: '#f7fafb',
      theme_color: '#173c59',
      icons: [
        { src: href('icon-192.png'), sizes: '192x192', type: 'image/png' },
        { src: href('icon-512.png'), sizes: '512x512', type: 'image/png' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
}
