import data from './zeirishi-expanded.json';
import { expandedTaxIssues, expandedTaxAssessments } from '../lib/tax-curriculum';
import type { ExpandedTaxCurriculum } from '../lib/tax-curriculum';

export const expandedZeirishi = data as ExpandedTaxCurriculum;
const issues = expandedTaxIssues(expandedZeirishi);
if (issues.length) throw new Error(`Tax curriculum validation failed:\n${issues.join('\n')}`);

export const zeirishiDeepLessons = expandedZeirishi.lessons;
export const zeirishiDeepUnits = expandedZeirishi.units;
export const zeirishiDeepAssessments = expandedTaxAssessments(expandedZeirishi);
export const zeirishiDeepLesson = (id: string) => zeirishiDeepLessons.find((lesson) => lesson.id === id);
export const zeirishiDeepUnit = (id: string) => zeirishiDeepUnits.find((unit) => unit.id === id);
