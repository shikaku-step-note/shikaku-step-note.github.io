import { getCollection } from 'astro:content';
import { qualifications } from '../data/qualifications';
import { zeirishiSubjects } from '../data/zeirishi';
import { zeirishiDeepUnits } from '../data/zeirishi-expanded';
import { publicPageLinks } from './site';

export interface SitemapEntry {
  path: string;
  title: string;
  kind: 'site' | 'qualification' | 'subject' | 'unit' | 'lesson' | 'tests' | 'coverage';
  qualification?: string;
  subject?: string;
}

/** One build-time catalog for both human navigation and the XML sitemap. */
export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const lessons = (await getCollection('lessons', (lesson) => !lesson.data.sample && !lesson.data.archived))
    .sort((a, b) => a.data.order - b.data.order || a.data.stableId.localeCompare(b.data.stableId));
  const entries: SitemapEntry[] = [
    ...publicPageLinks.map((page) => ({ ...page, kind: 'site' as const })),
    ...qualifications.map((qualification) => ({
      path: `qualifications/${qualification.id}/`, title: qualification.name,
      kind: 'qualification' as const, qualification: qualification.id,
    })),
    ...zeirishiSubjects.map((subject) => ({
      path: `qualifications/zeirishi/subjects/${subject.id}/`, title: subject.name,
      kind: 'subject' as const, qualification: 'zeirishi', subject: subject.id,
    })),
    ...zeirishiDeepUnits.map((unit) => ({
      path: `qualifications/zeirishi/units/${unit.id}/`, title: unit.title,
      kind: 'unit' as const, qualification: 'zeirishi', subject: unit.subject,
    })),
    ...lessons.map(({ data }) => ({
      path: `qualifications/${data.qualification}/${data.stableId}/`, title: data.title,
      kind: 'lesson' as const, qualification: data.qualification, subject: data.subject,
    })),
    ...qualifications.filter((qualification) => qualification.status === 'course').flatMap((qualification) => [
      { path: `qualifications/${qualification.id}/tests/`, title: '用語・復習テストと模擬試験', kind: 'tests' as const, qualification: qualification.id },
      { path: `qualifications/${qualification.id}/coverage/`, title: '教材の対応範囲と出典', kind: 'coverage' as const, qualification: qualification.id },
    ]),
  ];
  return [...new Map(entries.map((entry) => [entry.path, entry])).values()];
}
