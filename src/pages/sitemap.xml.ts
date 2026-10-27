import { href } from '../lib/site';
import { getSitemapEntries } from '../lib/sitemap';
import type { APIContext } from 'astro';
export async function GET({ site }: APIContext) {
  const entries = await getSitemapEntries();
  const entities: Record<string, string> = {
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  };
  const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => entities[character]!);
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((entry) => `  <url><loc>${escapeXml(new URL(href(entry.path), site).href)}</loc></url>`).join('\n')}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
