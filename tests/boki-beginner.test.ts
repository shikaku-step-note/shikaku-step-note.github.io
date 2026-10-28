import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { beginnerAssessments, beginnerBank, beginnerLessonIds, beginnerLegacyIds, beginnerVersion, beginnerWorkload } from '../src/data/boki-beginner';
import { bokiAssessments } from '../src/data/bookkeeping';
import { gradeAttempt, newAttempt, practicePoints, remainingSeconds, compatibleAttempt, assessmentMaterialIssues, isCorrect, type Question } from '../src/lib/assessment';
import { emptyData, validateData, mergeData } from '../src/lib/storage';
import { selectCourseLessons } from '../src/lib/course-progress';
import oldBank from '../src/data/boki-questions.json';
import oldMocks from '../src/data/boki-mock.json';
import reviewWitnesses from '../docs/boki-beginner/review-arithmetic-witnesses.json';
import lessonWitnesses from '../docs/boki-beginner/lesson-arithmetic-witnesses.json';
import ledgerWitnesses from '../docs/boki-beginner/mock-ledger-witnesses.json';
import scope from '../src/data/boki-beginner-coverage.json';

const entries=readdirSync('src/content/lessons').filter(n=>n.endsWith('.md')).map(n=>{
  const raw=readFileSync('src/content/lessons/'+n,'utf8');
  return {data:parse(raw.split('---')[1]!),body:raw.split('---').slice(2).join('---')};
});
const rows=entries.filter(l=>l.data.qualification==='boki-beginner'&&!l.data.archived).sort((a,b)=>a.data.order-b.data.order);
const assessments=bokiAssessments(entries).filter(a=>a.qualification==='boki-beginner');

test('all current scope is mapped to detailed teaching and independently assessed objectives',()=>{
  assert.deepEqual(rows.map(l=>l.data.stableId),beginnerLessonIds);
  assert.equal(scope.length,46);
  for(const row of rows){
    const id=row.data.stableId;
    assert.equal(row.data.objectives.length,3,id);
    // A prose guard, not a claim that character count proves educational completeness.
    // Ignore CRLF/LF, markup and link text so Windows and Linux measure the same content.
    const teaching=row.body.split(/###? 公式資料/)[0]!.replace(/\r\n/g,'\n')
      .replace(/^#{1,6}[^\n]*$/gm,'').replace(/<[^>]*>/g,'')
      .replace(/\[[^\]]*\]\([^)]*\)/g,'').replace(/\s/g,'');
    assert.ok(teaching.length>=3500,`${id}: substantive teaching text`);
    for(let i=1;i<=3;i++){
      assert.ok(row.body.includes(`id="objective-${i}"`),`${id}: objective ${i}`);
      assert.ok(row.body.includes(`id="worked-${i}"`),`${id}: worked ${i}`);
      assert.ok(beginnerBank[id]!.some(q=>q.objectives?.includes(i-1)),`${id}: independent exercise for objective ${i}`);
    }
    assert.ok(beginnerBank[id]!.length>=10,id);
    assert.ok(row.data.glossary.length>=6,id);
    const review=assessments.find(a=>a.id===`boki-beginner-unit-${row.data.unit}-review`)!;
    for(let i=0;i<row.data.objectives.length;i++)assert.ok(
      review.questions.some(q=>(q.lesson===id&&q.objectives?.includes(i))||q.targetObjectives?.[id]?.includes(i)),
      `${id}: related unit review for objective ${i+1}`,
    );
  }
  for(const competency of scope) for(const id of competency.lessons) assert.ok(rows.some(l=>l.data.stableId===id),competency.id);
  const work=beginnerWorkload(rows);
  assert.equal(work.lessonMinutes,rows.reduce((sum,l)=>sum+l.data.minutes,0));
  assert.ok(work.total>work.lessonMinutes+200);
});

test('new work does not inherit old completions or erase bookmarks and historical scores',()=>{
  const old=emptyData();
  for(const id of beginnerLegacyIds)old.records[id]={status:'completed',bookmarked:true,attempts:2,updatedAt:'2026-10-25T00:00:00Z'};
  const legacy={...assessments.find(a=>a.id==='boki-beginner-unit-1-review')!,version:'boki-2026-v1'};
  const attempt=newAttempt(legacy,'practice',Date.parse('2026-10-25T00:00:00Z'));
  old.assessments[legacy.id]=[attempt];
  const restored=validateData(JSON.parse(JSON.stringify(old)));
  const course=selectCourseLessons(entries.map(l=>({id:l.data.stableId,qualification:l.data.qualification,archived:l.data.archived})), 'boki-beginner');
  assert.equal(course.length,24);
  assert.equal(course.filter(l=>restored.records[l.id]?.status==='completed').length,0);
  assert.equal(Object.values(restored.records).filter(r=>r.bookmarked).length,4);
  assert.ok(!compatibleAttempt(assessments.find(a=>a.id===legacy.id)!,attempt));
  const incoming=emptyData();incoming.records['bb2-cash']={status:'studying',bookmarked:false,attempts:0,updatedAt:'2026-10-28T00:00:00Z'};
  const merged=validateData(JSON.parse(JSON.stringify(mergeData(restored,incoming))));
  assert.ok(merged.records['bb-foundation']?.bookmarked);
  assert.equal(merged.records['bb2-cash']?.status,'studying');
  assert.deepEqual(merged.assessments[legacy.id],[attempt]);
  for(const id of beginnerLegacyIds){
    assert.ok(entries.find(l=>l.data.stableId===id)?.data.archived);
    assert.ok(assessments.find(a=>a.id===`${id}-check`));
  }
});

test('two complete independent mock forms retain 40-minute absolute deadlines and100-point scoring',()=>{
  const lessonPrompts=new Set(Object.values(beginnerBank).flat().map(q=>q.prompt));
  const seen=new Set<string>();
  for(const id of ['bb2-mock-a','bb2-mock-b']){
    const a=assessments.find(a=>a.id===id)!;
    assert.equal(a.version,beginnerVersion);assert.equal(a.minutes,40);assert.equal(a.questions.length,30);
    assert.deepEqual(assessmentMaterialIssues(a),[]);
    for(const q of a.questions){assert.ok(!seen.has(q.prompt));assert.ok(!lessonPrompts.has(q.prompt));seen.add(q.prompt);assert.equal(q.input,undefined);}
    assert.deepEqual([...new Set(a.questions.map(q=>q.group))].map(group=>a.questions.filter(q=>q.group===group).reduce((s,q)=>s+(q.points??1),0)),[30,40,30]);
    const t=newAttempt(a,'timed',1000);assert.equal(remainingSeconds(t,1000),2400);
    const resumed=validateData({...emptyData(),assessments:{[id]:[t]}}).assessments[id]![0]!;
    assert.equal(resumed.deadline,t.deadline);assert.equal(remainingSeconds(resumed,2401001),0);
    for(const q of a.questions)t.answers[q.id]=q.answer;
    const graded=gradeAttempt(a,t,2401000);assert.equal(practicePoints(a,graded),100);assert.equal(graded.score,30);
    t.answers[a.questions[0]!.id]=(a.questions[0]!.answer+1)%4;
    assert.equal(practicePoints(a,gradeAttempt(a,t,2401000)),97);
  }
  assert.equal(assessments.find(a=>a.id==='boki-beginner-mock')!.kind,'review','old mini-test must not be counted as a full mock');
});

test('mock monthly answer vectors agree with recomputed double-entry ledgers and two-way profits',()=>{
  for(const form of ['a','b'] as const){
    const data=ledgerWitnesses[form];const balances:Record<string,number>={...data.opening};
    assert.equal(Object.values(balances).reduce((s,v)=>s+v,0),0);
    for(const [title,debits,credits] of data.events as [string,Record<string,number>,Record<string,number>][]){
      assert.equal(Object.values(debits).reduce((s,v)=>s+v,0),Object.values(credits).reduce((s,v)=>s+v,0),title);
      for(const [k,v] of Object.entries(debits))balances[k]=(balances[k]??0)+v;
      for(const [k,v] of Object.entries(credits))balances[k]=(balances[k]??0)-v;
    }
    const assets=['現金','普通預金','売掛金','繰越商品','備品','土地','未収入金','前払金','仮払消費税'].reduce((s,k)=>s+(balances[k]??0),0)+(balances['減価償却累計額']??0);
    const liabilities=-['買掛金','借入金','電子記録債務','未払固定資産税','前受金','仮受消費税'].reduce((s,k)=>s+(balances[k]??0),0);
    const capital=-(balances['資本金']??0);
    const revenue=-['売上','受取利息','固定資産売却益'].reduce((s,k)=>s+(balances[k]??0),0);
    const expense=['仕入','支払家賃','支払手数料','減価償却費','租税公課','支払利息','旅費交通費'].reduce((s,k)=>s+(balances[k]??0),0);
    const profit=revenue-expense;assert.equal(assets-liabilities-capital,profit);
    const expected=form==='a'
      ?[balances['現金'],balances['普通預金'],balances['売掛金'],-balances['買掛金']!,capital,-balances['仮受消費税']!-balances['仮払消費税']!,balances['備品']!+balances['減価償却累計額']!,assets,liabilities,-profit]
      :[balances['売掛金'],-balances['電子記録債務']!,balances['現金'],-balances['固定資産売却益']!,balances['未収入金'],balances['普通預金'],assets,liabilities,-balances['仮受消費税']!-balances['仮払消費税']!,profit];
    const a=assessments.find(a=>a.id===`bb2-mock-${form}`)!;
    a.questions.slice(20).forEach((q,i)=>assert.ok(q.options[q.answer]!.startsWith(Number(expected[i]).toLocaleString('en-US')+'円'),q.id));
  }
});

test('all review numeric answers have independently expressed arithmetic witnesses and honest reuse counts',()=>{
  const questionMap=new Map(assessments.flatMap(a=>a.questions.map(q=>[q.id,q] as const)));
  for(const [id,w] of Object.entries(reviewWitnesses)){
    assert.match(w.formula,/^[\d.()+*/\s-]+$/);
    const calculated=Function(`"use strict"; return (${w.formula});`)() as number;
    assert.equal(calculated,w.value,id);
    assert.ok(isCorrect(questionMap.get(id)!,String(calculated)),id);
  }
  const cumulative=assessments.find(a=>a.id==='boki-beginner-review-all')!;
  assert.equal(cumulative.questions.filter(q=>q.id.startsWith('bb2-cumulative-')).length,12);
  assert.equal(cumulative.questions.filter(q=>!q.id.startsWith('bb2-cumulative-')).length,12);
});

test('all numeric lesson answers retain the independent reviewer arithmetic witnesses',()=>{
  const numeric=Object.values(beginnerBank).flat().filter(q=>q.input==='number');
  assert.equal(numeric.length,47);
  assert.equal(Object.keys(lessonWitnesses).length,numeric.length);
  for(const q of numeric){
    const witness=lessonWitnesses[q.id as keyof typeof lessonWitnesses];
    assert.ok(witness,q.id);
    assert.match(witness.formula,/^[\d.()+*/\s-]+$/);
    const calculated=Function(`"use strict"; return (${witness.formula});`)() as number;
    assert.equal(calculated,witness.value,q.id);
    assert.ok(isCorrect(q,String(calculated)),q.id);
  }
});

test('beginner registration is deterministic and never resets unrelated assessments',()=>{
  assert.deepEqual(bokiAssessments([...entries].reverse()),bokiAssessments(entries));
  const direct=beginnerAssessments(entries,oldBank as Record<string,Question[]>,oldMocks['boki-beginner-mock'] as Question[]);
  assert.deepEqual(direct,assessments);
  assert.ok(bokiAssessments(entries).filter(a=>a.qualification!=='boki-beginner'&&a.qualification!=='cost-beginner'&&a.qualification!=='boki-3').every(a=>a.version==='boki-2026-v1'));
});

test('reviewed glossary questions distinguish overlapping categories and monthly change from ending balance',()=>{
  const terms=assessments.find(a=>a.id==='boki-beginner-terms-all')!.questions;
  assert.equal(terms.length,157);
  for(const [term,excluded] of Object.entries({
    '補助簿':['得意先元帳','仕入先元帳'], '回収':['決済'], '決済手数料':['支払手数料'],
    '残代金':['未払金','未収入金'],
  })){
    const q=terms.find(q=>q.options[q.answer]===term)!;
    assert.ok(q,term);
    for(const alternative of excluded)assert.ok(!q.options.includes(alternative),`${term}: ${alternative}`);
  }
  const change=terms.find(q=>q.options[q.answer]==='資本金の月次増減')!;
  assert.ok(change.prompt.includes('月末残高は月初資本金にこの増減額を加えて'));
  for(const q of terms){assert.equal(new Set(q.options).size,4,q.id);assert.ok(!q.prompt.includes('。。'),q.id);}
});
