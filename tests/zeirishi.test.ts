import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { zeirishiOutline, zeirishiSubjects, zeirishiAssessments } from '../src/data/zeirishi';
import { checkSubjectCombination } from '../src/lib/subject-selection';
import { newAttempt, gradeAttempt, practicePoints, compatibleAttempt } from '../src/lib/assessment';
const lessons = zeirishiOutline.map((r) => ({
  data: parse(readFileSync(`src/content/lessons/${r.id}.md`, 'utf8').split('---')[1]!),
}));
const all = zeirishiAssessments(lessons);
test('normal five-subject route handles mandatory subjects, alternative pairs and unknown IDs', () => {
  assert.equal(checkSubjectCombination(['boki', 'zaimu', 'shotoku', 'hojin', 'sozoku']).valid, true);
  assert.equal(checkSubjectCombination(['boki', 'zaimu', 'hojin', 'shohi', 'kotei']).valid, true);
  for (const invalid of [
    [],
    ['boki', 'zaimu', 'shohi', 'sozoku', 'kotei'],
    ['boki', 'zaimu', 'hojin', 'shohi', 'shuzei'],
    ['boki', 'zaimu', 'shotoku', 'jumin', 'jigyo'],
    ['boki', 'hojin', 'shohi', 'kotei'],
    ['boki', 'zaimu', 'hojin', 'shohi', 'kotei', 'unknown'],
  ])
    assert.equal(checkSubjectCombination(invalid).valid, false);
  assert.equal(checkSubjectCombination(['boki', 'zaimu', 'hojin', 'shohi', 'kotei', 'kotei']).valid, true);
});
test('eleven subjects have substantial lessons, mapped skills, original mocks and valid self-review rubrics', () => {
  assert.equal(zeirishiSubjects.length, 11);
  assert.equal(lessons.length, 54);
  assert.equal(all.length, 87);
  const ids = new Set<string>();
  for (const a of all) {
    assert.ok(a.questions.length > 0, a.id);
    for (const q of a.questions) {
      if (a.kind !== 'review') {
        assert.ok(!ids.has(q.id), q.id);
        ids.add(q.id);
      }
      assert.ok(
        zeirishiOutline.some((r) => r.id === q.lesson),
        q.id,
      );
      if (q.input === 'essay') {
        assert.ok(q.modelAnswer!.length >= 40, q.id);
        assert.equal(
          q.rubric!.reduce((s, r) => s + r.points, 0),
          q.points,
        );
      } else if (q.input === 'number')
        assert.ok(
          q.accepted?.every((v) => Number.isFinite(Number(v))),
          q.id,
        );
      else {
        assert.equal(new Set(q.options).size, 4, q.id);
        assert.ok(q.answer >= 0 && q.answer < 4, q.id);
      }
    }
  }
  for (const r of zeirishiOutline) {
    const a = all.find((a) => a.id === r.id + '-check')!;
    assert.ok(a.questions.length >= 3 && a.questions.length <= 7, r.id);
    for (let n = 1; n <= 3; n++)
      assert.ok(
        a.questions.some((q) => q.objectives?.includes(n)),
        r.id + ':' + n,
      );
    const body = readFileSync(`src/content/lessons/${r.id}.md`, 'utf8')
      .replace(/^---[\s\S]*?---\s*/, '')
      .replace(/^#+.*$/gm, '')
      .replace(/[\s#*|>`-]/g, '');
    assert.ok(body.length >= 2500, r.id + ':' + body.length);
  }
  for (const s of zeirishiSubjects) {
    const exam = all.find((a) => a.id === `zeirishi-${s.id}-mock`)!;
    assert.equal(exam.minutes, 120);
    assert.equal(exam.questions.length, 12);
    assert.deepEqual(
      s.majorPoints.map((_, i) =>
        exam.questions.filter((q) => q.group!.startsWith(`第${i + 1}問`)).reduce((n, q) => n + q.points!, 0),
      ),
      s.majorPoints,
    );
    assert.ok(exam.questions.every((q) => q.input === 'number' || q.input === 'essay'));
  }
});
test('real course scoring distinguishes automatic answers and rubric points while preserving old lesson IDs', () => {
  const exam = all.find((a) => a.id === 'zeirishi-boki-mock')!;
  const a = newAttempt(exam, 'timed', 0);
  // Independently calculated solutions for the twelve new bookkeeping cases.
  const answers = [4000, 501000, 240000, 620000, 400000, 150000, 1960000, 60000, 10000, 4000, 50000, 740000];
  exam.questions.forEach((q, i) => (a.answers[q.id] = String(answers[i])));
  const scored = gradeAttempt(exam, a, 120 * 60 * 1000);
  assert.equal(practicePoints(exam, scored), 100);
  assert.equal(scored.finishedAt, '1970-01-01T02:00:00.000Z');
  assert.ok(compatibleAttempt({ ...exam, title: '題名の変更' }, scored));
  assert.equal(compatibleAttempt({ ...exam, version: 'future-version' }, scored), false);
  assert.ok(!zeirishiOutline.some((r) => ['ip-security', 'boki-journal', 'tk-contract'].includes(r.id)));
});
