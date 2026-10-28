import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectCourseLessons } from '../src/lib/course-progress';
import curriculum from '../src/data/zeirishi-outline.json';
import { zeirishiDeepLessons } from '../src/data/zeirishi-expanded';
import { zeirishiLearningPath, zeirishiLessonIds, zeirishiLessonOrder } from '../src/data/zeirishi-learning-path';

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

test('the unified tax learning path contains every published lesson once and respects subject prerequisites', () => {
  const allIds:string[]=[];
  for (const subject of curriculum.subjects) {
    const ids=zeirishiLessonIds(subject.id);
    const expected=[...curriculum.lessons,...zeirishiDeepLessons].filter(lesson=>lesson.subject===subject.id).map(lesson=>lesson.id);
    assert.deepEqual([...ids].sort(),expected.sort(),subject.id);
    assert.equal(new Set(ids).size,ids.length,subject.id);
    assert.deepEqual([...ids].reverse().sort((a,b)=>zeirishiLessonOrder(a)-zeirishiLessonOrder(b)),ids);
    for (const lesson of zeirishiDeepLessons.filter(lesson=>lesson.subject===subject.id)) {
      for (const prerequisite of lesson.prerequisites.filter(id=>ids.includes(id))) {
        assert.ok(ids.indexOf(prerequisite)<ids.indexOf(lesson.id),`${lesson.id}: ${prerequisite}`);
      }
    }
    allIds.push(...ids);
  }
  assert.equal(allIds.length,93);
  assert.equal(new Set(allIds).size,93);
});

test('related introductions and detailed units form one study sequence without reassigning old completions', () => {
  const ids=zeirishiLessonIds('boki');
  assert.equal(ids.length,20);
  assert.equal(ids[0],'zr-boki-flow');
  assert.equal(ids[1],'zr2-boki-account-equation');
  const cashIndex=ids.indexOf('zr-boki-cash');
  assert.equal(ids[cashIndex-1],'zr2-boki-books-vouchers');
  assert.equal(ids[cashIndex+1],'zr2-boki-cash-count');
  assert.equal(ids[ids.indexOf('zr2-boki-bad-debt-dcf')+1],'zr-boki-inventory');
  const groups=zeirishiLearningPath('boki');
  assert.equal(groups[0]!.lessonIds.length,8);
  const completed=new Set(curriculum.lessons.filter(lesson=>lesson.subject==='boki').map(lesson=>lesson.id));
  assert.equal(ids.filter(id=>completed.has(id)).length,6);
  assert.equal(ids.find(id=>!completed.has(id)),'zr2-boki-account-equation');
});
