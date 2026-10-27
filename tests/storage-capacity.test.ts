import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { emptyData, validateData, mergeData, STORAGE_LIMITS } from '../src/lib/storage';
import { newAttempt, type Assessment } from '../src/lib/assessment';

const exam: Assessment = {
  id: 'zr2-capacity-review',
  qualification: 'zeirishi',
  version: 'zr2-capacity-v1',
  title: '容量検証用',
  kind: 'review',
  questions: [
    {
      id: 'zr2-capacity-q1',
      prompt: '検証用',
      options: ['a', 'b'],
      answer: 0,
      explanation: '検証用',
      lesson: 'zr2-capacity-lesson',
      field: 'boki',
    },
  ],
};

test('all planned assessment types and retained unknown history can round-trip beyond the former type limit', () => {
  const data = emptyData();
  const plan = JSON.parse(readFileSync('docs/zeirishi/upgrade-plan.json', 'utf8'));
  const planned =
    303 +
    plan.totals.lessons +
    plan.totals.units * 2 +
    plan.totals.subjects * 2 +
    plan.totals.fullMockBlueprints;
  assert.ok(planned <= STORAGE_LIMITS.assessmentTypes);
  for (let i = 0; i < planned; i++) {
    const id = `capacity-review-${i}`;
    const attempt = newAttempt({ ...exam, id }, 'practice', i);
    attempt.answers['zr2-capacity-q1'] = i % 2;
    data.assessments[id] = [attempt];
  }
  data.records['zr-boki-cash'] = {
    status: 'completed',
    bookmarked: true,
    attempts: 2,
    updatedAt: data.savedAt,
  };
  const backup = validateData(JSON.parse(JSON.stringify(data)));
  const merged = mergeData(emptyData(), backup);
  assert.equal(Object.keys(merged.assessments).length, planned);
  assert.equal(
    merged.assessments[`capacity-review-${planned - 1}`]![0]!.answers['zr2-capacity-q1'],
    (planned - 1) % 2,
  );
  assert.deepEqual(merged.records['zr-boki-cash'], data.records['zr-boki-cash']);
  assert.equal(merged.version, 5);
});

test('expanded limits remain bounded and reject excess records without returning truncated data', () => {
  const data = emptyData();
  for (let i = 0; i <= STORAGE_LIMITS.assessmentTypes; i++) data.assessments[`capacity-${i}`] = [];
  assert.throws(() => validateData(data), /テスト記録/);
  data.assessments = {};
  for (let i = 0; i <= STORAGE_LIMITS.totalAttempts; i++) {
    const group = Math.floor(i / STORAGE_LIMITS.attemptsPerAssessment);
    const id = `capacity-${group}`;
    (data.assessments[id] ??= []).push(newAttempt({ ...exam, id }, 'practice', i));
  }
  assert.throws(() => validateData(data), /テストの解答/);
});
