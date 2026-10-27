import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assessmentMaterialIssues, newAttempt, gradeAttempt, type Assessment } from '../src/lib/assessment';

const fixture: Assessment = {
  id: 'material-fixture',
  qualification: 'zeirishi',
  version: 'fixture-v1',
  kind: 'review',
  title: '資料を読んで計算するテスト',
  materials: [
    {
      id: 'balance',
      title: '預金の照合資料',
      paragraphs: ['帳簿残高100、未記帳の手数料5。'],
      tables: [{ caption: '未記帳項目', headers: ['内容', '金額'], rows: [['手数料', '5']] }],
    },
  ],
  questions: [
    {
      id: 'balance-answer',
      prompt: '修正後の帳簿残高を求める。',
      options: [],
      answer: 0,
      input: 'number',
      accepted: ['95'],
      explanation: '100−5＝95。',
      lesson: 'fixture-lesson',
      field: 'boki',
      materialIds: ['balance'],
    },
  ],
};
test('shared exam data is validated without changing answer records or scoring', () => {
  assert.deepEqual(assessmentMaterialIssues(fixture), []);
  const attempt = newAttempt(fixture, 'practice', 0);
  attempt.answers['balance-answer'] = '95';
  assert.equal(gradeAttempt(fixture, attempt, 1).score, 1);
  assert.equal('materials' in attempt, false);
  assert.deepEqual(
    assessmentMaterialIssues({ questions: fixture.questions.map(({ materialIds, ...q }) => q) }),
    [],
  );
});
test('broken material links, duplicate IDs and malformed tables fail before publication', () => {
  assert.match(assessmentMaterialIssues({ ...fixture, materials: [] }).join(), /Unknown material/);
  assert.match(
    assessmentMaterialIssues({
      ...fixture,
      materials: [...fixture.materials!, ...fixture.materials!],
    }).join(),
    /duplicate/,
  );
  const broken = structuredClone(fixture);
  broken.materials![0]!.tables![0]!.rows.push(['Missing amount']);
  assert.match(assessmentMaterialIssues(broken).join(), /Invalid material table/);
});
