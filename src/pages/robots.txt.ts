import { href } from '../lib/site';
import type { APIContext } from 'astro';
export function GET({ site }: APIContext) {
  return new Response(
    `# A robots file is effective only at the origin root.\n# For /web/ project hosting, submit the sitemap directly to Search Console.\nUser-agent: *\nAllow: /\nSitemap: ${new URL(href('sitemap.xml'), site).href}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
}
