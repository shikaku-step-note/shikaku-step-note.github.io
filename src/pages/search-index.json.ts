import { getCollection } from 'astro:content';
import { qualifications } from '../data/qualifications';
import { href } from '../lib/site';
import { zeirishiSubjects } from '../data/zeirishi';
import { zeirishiDeepUnits } from '../data/zeirishi-expanded';
import { zeirishiLessonOrder } from '../data/zeirishi-learning-path';
import { allAssessments } from '../data/assessments';
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
      ...zeirishiSubjects.map((s) => ({
        id: `zeirishi-subject-${s.id}`,
        title: `税理士・${s.name}`,
        description: s.scope,
        qualification: 'zeirishi',
        subject: s.id,
        kind: '科目の学習案内',
        url: href(`qualifications/zeirishi/subjects/${s.id}/`),
        keywords: ['税理士', s.name, s.category],
      })),
      ...lessons.map((l) => ({
        id: l.data.stableId,
        title: l.data.title,
        description: l.data.description,
        qualification: l.data.qualification,
        kind: 'レッスン',
        sample: l.data.sample,
        archived: l.data.archived,
        order: l.data.qualification === 'zeirishi' ? zeirishiLessonOrder(l.data.stableId) : l.data.order,
        subject: l.data.subject,
        unit: l.data.unit,
        url: href(`qualifications/${l.data.qualification}/${l.data.stableId}/`),
        keywords: [...l.data.keywords, qualifications.find((q) => q.id === l.data.qualification)!.name],
      })),
      ...zeirishiDeepUnits.map((unit) => ({
        id: unit.id,
        title: unit.title,
        description: unit.description,
        qualification: 'zeirishi',
        subject: unit.subject,
        unit: unit.number,
        kind: '学習ユニット',
        url: href(`qualifications/zeirishi/units/${unit.id}/`),
        keywords: [
          '税理士',
          zeirishiSubjects.find((subject) => subject.id === unit.subject)!.name,
          unit.title,
        ],
      })),
      ...allAssessments(lessons).map((a) => ({
        id: a.id,
        title: a.title,
        description: `${a.questions.length}問の${a.kind === 'glossary' ? '用語' : a.kind === 'mock' ? '模擬試験' : a.kind === 'lesson' ? '理解度チェック' : '復習'}。解答と結果はこのブラウザに保存します。`,
        qualification: a.qualification,
        kind:
          a.kind === 'glossary'
            ? '用語テスト'
            : a.kind === 'mock'
              ? '模擬試験'
              : a.kind === 'lesson'
                ? '理解度チェック'
                : '復習テスト',
        assessmentKind: a.kind,
        subject: a.qualification === 'zeirishi' ? a.questions[0]?.field : undefined,
        assessmentVersion: a.version,
        archived:
          (a.qualification === 'boki-beginner' &&
            (a.id.startsWith('bb-') || a.id === 'boki-beginner-mock')) ||
          (a.qualification === 'cost-beginner' &&
            (a.id.startsWith('cb-') || a.id === 'cost-beginner-mock')) ||
          (a.qualification === 'boki-3' && a.id === 'boki-3-mock'),
        url:
          a.kind === 'lesson'
            ? href(`qualifications/${a.qualification}/${a.questions[0]!.lesson}/#practice`)
            : href(`qualifications/${a.qualification}/tests/${a.id}/`),
        keywords: [
          qualifications.find((q) => q.id === a.qualification)!.name,
          a.kind === 'mock' ? '模試' : 'テスト',
          a.title,
        ],
      })),
    ]),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
}
