import curriculum from './zeirishi-outline.json';
import { zeirishiDeepLessons, zeirishiDeepUnits } from './zeirishi-expanded';
import type { ExpandedTaxUnit } from '../lib/tax-curriculum';

// Place the detailed teaching beside the introduction to the same topic.
// These anchors affect navigation only; lesson IDs, units and records stay unchanged.
const unitAnchors: Record<string, string> = {
  'zr2-boki-unit-records': 'zr-boki-flow',
  'zr2-boki-unit-cash': 'zr-boki-cash',
  'zr2-zaimu-unit-framework': 'zr-zaimu-concepts',
  'zr2-shotoku-unit-scope': 'zr-shotoku-scope',
  'zr2-hojin-unit-scope': 'zr-hojin-adjustment',
  'zr2-kokuzei-unit-foundations': 'zr-kokuzei-priority',
};

export interface ZeirishiLearningGroup {
  id: string;
  title: string;
  lessonIds: string[];
  units: ExpandedTaxUnit[];
}

export function zeirishiLearningPath(subject: string): ZeirishiLearningGroup[] {
  const introductions = curriculum.lessons.filter((lesson) => lesson.subject === subject)
    .sort((a, b) => a.position - b.position);
  const units = zeirishiDeepUnits.filter((unit) => unit.subject === subject)
    .sort((a, b) => a.number - b.number);
  for (const unit of units) {
    const anchor = unitAnchors[unit.id] ?? introductions.at(-1)?.id;
    if (!introductions.some((lesson) => lesson.id === anchor)) {
      throw new Error(`Missing learning-path anchor: ${unit.id}`);
    }
  }
  return introductions.map((lesson) => {
    const members = units.filter((unit) =>
      (unitAnchors[unit.id] ?? introductions.at(-1)?.id) === lesson.id);
    return {
      id: lesson.id,
      title: lesson.title,
      lessonIds: [lesson.id, ...members.flatMap((unit) => unit.lessonIds)],
      units: members,
    };
  });
}

export const zeirishiLessonIds = (subject: string): string[] =>
  zeirishiLearningPath(subject).flatMap((group) => group.lessonIds);

const order = new Map(curriculum.subjects.flatMap((subject) =>
  zeirishiLessonIds(subject.id).map((id, index) => [id, subject.unit * 1000 + index] as const)));

if (order.size !== curriculum.lessons.length + zeirishiDeepLessons.length) {
  throw new Error('Tax learning path must include every published lesson exactly once');
}

export const zeirishiLessonOrder = (id: string): number => order.get(id) ?? Number.MAX_SAFE_INTEGER;
