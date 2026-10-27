import { getCollection } from 'astro:content';
import { qualifications } from '../data/qualifications';
import { zeirishiSubjects } from '../data/zeirishi';
import { zeirishiDeepUnits } from '../data/zeirishi-expanded';
import { publicPages, href } from '../lib/site';
import type { APIContext } from 'astro';
export async function GET({ site }: APIContext) {
  const lessons = await getCollection('lessons', (l) => !l.data.sample);
  const paths = [
    ...publicPages,
    ...zeirishiSubjects.map((s) => `qualifications/zeirishi/subjects/${s.id}/`),
    ...zeirishiDeepUnits.map((unit) => `qualifications/zeirishi/units/${unit.id}/`),
    ...qualifications.map((q) => `qualifications/${q.id}/`),
    ...lessons.map((l) => `qualifications/${l.data.qualification}/${l.data.stableId}/`),
    ...qualifications
      .filter((q) => q.status === 'course')
      .flatMap((q) => [`qualifications/${q.id}/tests/`, `qualifications/${q.id}/coverage/`]),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${new URL(href(p), site).href}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
