import { ipAssessments } from './it-passport';
import { bokiAssessments } from './bookkeeping';
import { takkenAssessments } from './takken';
export function allAssessments(lessons: Parameters<typeof bokiAssessments>[0]) {
  return [...ipAssessments(lessons), ...bokiAssessments(lessons), ...takkenAssessments(lessons)];
}
