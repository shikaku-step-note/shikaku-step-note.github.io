import { getCollection } from 'astro:content';
import { qualifications } from '../data/qualifications';
import { href } from '../lib/site';
import { ipAssessments } from '../data/it-passport';
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
        archived: l.data.archived,
        order: l.data.order,
        url: href(`qualifications/${l.data.qualification}/${l.data.stableId}/`),
        keywords: [...l.data.keywords, qualifications.find((q) => q.id === l.data.qualification)!.name],
      })),
      ...ipAssessments(lessons).map((a) => ({
        id: a.id,
        title: a.title,
        description: `${a.questions.length}問の${a.kind === 'glossary' ? '用語' : a.kind === 'mock' ? '模擬試験' : a.kind === 'lesson' ? '理解度チェック' : '復習'}。解答と結果はこのブラウザに保存します。`,
        qualification: 'it-passport',
        kind:
          a.kind === 'glossary'
            ? '用語テスト'
            : a.kind === 'mock'
              ? '模擬試験'
              : a.kind === 'lesson'
                ? '理解度チェック'
                : '復習テスト',
        assessmentKind: a.kind,
        assessmentVersion: a.version,
        url:
          a.kind === 'lesson'
            ? href(`qualifications/it-passport/${a.questions[0]!.lesson}/#practice`)
            : href(`qualifications/it-passport/tests/${a.id}/`),
        keywords: ['ITパスポート', a.kind === 'mock' ? '模試' : 'テスト', a.title],
      })),
    ]),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
}
