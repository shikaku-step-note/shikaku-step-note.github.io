import { href } from '../lib/site';
import type { APIContext } from 'astro';
export function GET({ site }: APIContext) {
  return new Response(
    `# Effective at the origin root.\nUser-agent: *\nAllow: /\nSitemap: ${new URL(href('sitemap.xml'), site).href}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
}
