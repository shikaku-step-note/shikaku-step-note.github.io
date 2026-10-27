import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questionRevisionLessons } from '../src/lib/assessment';
import {
  expandedTaxIssues,
  expandedTaxAssessments,
  type ExpandedTaxCurriculum,
} from '../src/lib/tax-curriculum';

const fixture = (): ExpandedTaxCurriculum => ({
  schemaVersion: 1,
  subjectNames: { boki: '簿記論' },
  lessons: [
    {
      id: 'zr2-boki-fixture',
      title: '新しい学習',
      description: '検証用',
      subject: 'boki',
      unit: 1001,
      moduleId: 'zr2-boki-unit-fixture',
      position: 1,
      stage: '基礎',
      minutes: 90,
      objectives: ['資料から判断する'],
      objectiveIds: ['zr2-boki-fixture-o1'],
      prerequisites: ['zr-boki-cash'],
      glossary: [{ term: '現金', definition: '検証用の定義' }],
      reviewed: '2026-10-27',
      assessmentVersion: 'fixture-v1',
      workedExamples: [{ id: 'zr2-boki-fixture-e1', section: '検証用例題', objectives: [1] }],
      references: [
        {
          id: 'fixture',
          title: '出典',
          url: 'https://example.com/source',
          locator: '項目1',
          version: '検証用',
          verified: '2026-10-27',
        },
      ],
      questions: [
        {
          id: 'zr2-boki-fixture-q1',
          lesson: 'zr2-boki-fixture',
          field: 'boki',
          prompt: '検証用',
          options: [],
          answer: 0,
          input: 'essay',
          explanation: '理由',
          points: 3,
          objectives: [1],
          modelAnswer: '解答例',
          rubric: [
            { criterion: '判断', points: 2 },
            { criterion: '根拠', points: 1 },
          ],
        },
      ],
    },
  ],
  units: [
    {
      id: 'zr2-boki-unit-fixture',
      subject: 'boki',
      number: 1001,
      title: '単元',
      description: '独立した学習目標と練習問題を持つ検証用単元',
      reviewed: '2026-10-27',
      lessonIds: ['zr2-boki-fixture'],
      assessments: [],
    },
  ],
  subjectAssessments: [],
});

test('expanded material keeps independent assessment versions without resetting legacy IDs', () => {
  const course = fixture();
  assert.deepEqual(expandedTaxIssues(course), []);
  const assessment = expandedTaxAssessments(course)[0]!;
  assert.equal(assessment.id, 'zr2-boki-fixture-check');
  assert.equal(assessment.version, 'fixture-v1');
  course.lessons[0]!.title = '題名を変更';
  assert.equal(expandedTaxAssessments(course)[0]!.version, 'fixture-v1');
  assert.equal(course.lessons[0]!.prerequisites[0], 'zr-boki-cash');
});

test('unwritten prerequisites, reused questions and inconsistent written rubrics block integration', () => {
  const course = fixture();
  course.lessons[0]!.prerequisites.push('zr2-boki-unwritten');
  course.lessons[0]!.questions[0]!.rubric![0]!.points = 1;
  course.subjectAssessments.push({
    ...expandedTaxAssessments(course)[0]!,
    id: 'zr2-boki-fresh-review',
    kind: 'review',
  });
  const issues = expandedTaxIssues(course);
  assert.ok(issues.some((s) => s.includes('Unimplemented expanded prerequisite')));
  assert.ok(issues.some((s) => s.includes('Incomplete self-review rubric')));
  assert.ok(issues.some((s) => s.includes('Reused independent question')));
});

test('cumulative skills retain both revision lessons and reject missing or invalid targets', () => {
  const course = fixture();
  const second = structuredClone(course.lessons[0]!);
  second.id = 'zr2-boki-second';
  second.objectiveIds = ['zr2-boki-second-o1'];
  second.position = 2;
  second.questions[0]!.id = 'zr2-boki-second-q1';
  second.questions[0]!.lesson = second.id;
  course.lessons.push(second);
  course.units[0]!.lessonIds.push(second.id);
  const question = course.lessons[0]!.questions[0]!;
  question.targetObjectives = { [question.lesson]: [1], [second.id]: [1] };
  assert.deepEqual(expandedTaxIssues(course), []);
  assert.deepEqual(questionRevisionLessons(question), [question.lesson, second.id]);
  question.targetObjectives[second.id] = [2];
  assert.ok(expandedTaxIssues(course).some((s) => s.includes('Invalid cumulative objective target')));
  question.targetObjectives = { 'zr2-boki-unwritten': [1] };
  assert.ok(expandedTaxIssues(course).some((s) => s.includes('Invalid cumulative objective target')));
  question.targetObjectives = { [question.lesson]: [1, 1] };
  assert.ok(expandedTaxIssues(course).some((s) => s.includes('Inconsistent primary objective target')));
});
