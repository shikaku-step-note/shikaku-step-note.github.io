import { getCollection } from 'astro:content';
import { bokiCourses } from '../data/bookkeeping';
import { qualifications } from '../data/qualifications';
import { publicPages, href } from '../lib/site';
import type { APIContext } from 'astro';
export async function GET({ site }: APIContext) {
  const lessons = await getCollection('lessons', (l) => !l.data.sample);
  const paths = [
    ...publicPages,
    ...qualifications.map((q) => `qualifications/${q.id}/`),
    ...lessons.map((l) => `qualifications/${l.data.qualification}/${l.data.stableId}/`),
    ...bokiCourses.flatMap((c) => [`qualifications/${c.id}/tests/`, `qualifications/${c.id}/coverage/`]),
    'qualifications/it-passport/tests/',
    'qualifications/it-passport/coverage/',
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${new URL(href(p), site).href}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
