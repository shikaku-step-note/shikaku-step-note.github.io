import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectCourseLessons } from '../src/lib/course-progress';

const entries = [
  { id: 'legacy-foundation', qualification: 'zeirishi', subject: 'boki', unit: 1 },
  { id: 'new-cash', qualification: 'zeirishi', subject: 'boki', unit: 101 },
  { id: 'new-credit', qualification: 'zeirishi', subject: 'boki', unit: 102 },
  { id: 'other-subject', qualification: 'zeirishi', subject: 'zaimu', unit: 101 },
  { id: 'other-course', qualification: 'it-passport', unit: 101 },
  { id: 'archived-sample', qualification: 'zeirishi', subject: 'boki', unit: 1, archived: true },
];
test('new course units remain unfinished even when old introductory pages were completed', () => {
  const records = {
    'legacy-foundation': { status: 'completed' },
    'archived-sample': { status: 'completed' },
    'retained-unknown-id': { status: 'completed' },
  };
  const subject = selectCourseLessons(entries, 'zeirishi', 'boki');
  assert.equal(subject.length, 3);
  assert.equal(
    subject.filter((entry) => records[entry.id as keyof typeof records]?.status === 'completed').length,
    1,
  );
  assert.deepEqual(
    selectCourseLessons(entries, 'zeirishi', 'boki', 101).map((entry) => entry.id),
    ['new-cash'],
  );
  assert.equal(Object.keys(records).length, 3);
});
test('subject/unit selection does not mix another qualification or archived samples', () => {
  assert.equal(selectCourseLessons(entries, 'zeirishi').length, 4);
  assert.deepEqual(
    selectCourseLessons(entries, 'zeirishi', 'boki', 1).map((entry) => entry.id),
    ['legacy-foundation'],
  );
  assert.deepEqual(
    selectCourseLessons(entries, 'it-passport', undefined, 101).map((entry) => entry.id),
    ['other-course'],
  );
});
