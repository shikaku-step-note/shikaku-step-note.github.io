import { getCollection } from 'astro:content';
import { qualifications } from '../data/qualifications';
import { href } from '../lib/site';
export async function GET() {
  const lessons = await getCollection('lessons');
  return new Response(
    JSON.stringify([
      ...qualifications.map((q) => ({
        id: q.id,
        title: q.name,
        description: q.description,
        qualification: q.id,
        kind: '資格',
        url: href(`qualifications/${q.id}/`),
        keywords: [q.category, q.shortName],
      })),
      ...lessons.map((l) => ({
        id: l.data.stableId,
        title: l.data.title,
        description: l.data.description,
        qualification: l.data.qualification,
        kind: 'レッスン',
        sample: l.data.sample,
        order: l.data.order,
        url: href(`qualifications/${l.data.qualification}/${l.data.stableId}/`),
        keywords: [...l.data.keywords, qualifications.find((q) => q.id === l.data.qualification)!.name],
      })),
    ]),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
}
