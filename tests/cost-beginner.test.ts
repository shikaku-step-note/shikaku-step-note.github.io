import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { bokiAssessments } from '../src/data/bookkeeping';
import { costBank, costLessonIds, costLegacyIds, costUnitOneAssessmentVersion, costUnitOneExpandedVersion,costUnitOneReviewVersion, costUnitOneGlossaryVersion, costUnitTwoAssessmentVersion, costVersion, costWorkload } from '../src/data/cost-beginner';
import scope from '../src/data/cost-beginner-coverage.json';
import { assessmentMaterialIssues, newAttempt, gradeAttempt, practicePoints, remainingSeconds, compatibleAttempt, isCorrect } from '../src/lib/assessment';
import { emptyData, validateData, mergeData } from '../src/lib/storage';
import { selectCourseLessons } from '../src/lib/course-progress';
import reviewWitnesses from '../docs/cost-beginner/review-arithmetic-witnesses.json';
import mockWitnesses from '../docs/cost-beginner/mock-arithmetic-witnesses.json';
import unit12Witnesses from '../docs/cost-beginner/lesson-unit12-arithmetic-witnesses.json';
import unit3Witnesses from '../docs/cost-beginner/lesson-unit3-arithmetic-witnesses.json';
import unit45Witnesses from '../docs/cost-beginner/lesson-unit45-arithmetic-witnesses.json';

const entries=readdirSync('src/content/lessons').filter(n=>n.endsWith('.md')).map(n=>{
  const raw=readFileSync('src/content/lessons/'+n,'utf8');
  return {data:parse(raw.split('---')[1]!),body:raw.split('---').slice(2).join('---')};
});
const rows=entries.filter(l=>l.data.qualification==='cost-beginner'&&!l.data.archived).sort((a,b)=>a.data.order-b.data.order);
const assessments=bokiAssessments(entries).filter(a=>a.qualification==='cost-beginner');
const addedSteps=['cb2-material-use','cb2-matched-revenue','cb2-profit-boundary','cb2-classification-case'];
const allQuestions=new Map(assessments.flatMap(a=>a.questions.map(q=>[q.id,q] as const)));
const numeric=(s:string)=>Number(s.replaceAll(',','').replace('−','-').replace(/[^\d.+-]/g,''));

test('cost scope has detailed teaching, worked methods and independent objective-specific review',()=>{
  assert.deepEqual(rows.map(l=>l.data.stableId),costLessonIds);assert.equal(rows.length,26);assert.equal(scope.length,42);
  for(const row of rows){
    const id=row.data.stableId;
    const teaching=row.body.split(/###? 公式資料/)[0]!.replace(/\r\n/g,'\n').replace(/^#{1,6}[^\n]*$/gm,'').replace(/<[^>]*>/g,'').replace(/\[[^\]]*\]\([^)]*\)/g,'').replace(/\s/g,'');
    if(addedSteps.includes(id)) {
      assert.match(row.body,/<figure id=/);
      assert.ok((row.body.match(/<details id=/g)??[]).length>=2);
      assert.ok(scope.some(competency=>competency.lessons.includes(id)));
    } else assert.ok(teaching.length>=3500,`${id}: teaching depth guard (not proof of completeness)`);
    assert.equal(row.data.objectives.length,3);assert.ok(row.data.glossary.length>=6);
    const review=assessments.find(a=>a.id===`cost-beginner-unit-${row.data.unit}-review`)!;
    for(let i=0;i<3;i++){
      assert.ok(row.body.includes(`id="objective-${i+1}"`));assert.ok(row.body.includes(`id="worked-${i+1}"`));
      assert.ok(costBank[id]!.some(q=>q.objectives?.includes(i)),id);
      assert.ok(review.questions.some(q=>q.lesson===id&&q.objectives?.includes(i)),`${id} review objective ${i}`);
    }
  }
  for(const competency of scope){
    for(const id of competency.lessons)assert.ok(rows.some(l=>l.data.stableId===id));
    // Populated only after editorial cross-review; never silently generated as a completion claim.
    assert.ok(competency.independentQuestionIds.length>0,competency.id);
    assert.ok(competency.unitReviewQuestionIds.length>0,competency.id);
    for(const id of [...competency.independentQuestionIds,...competency.unitReviewQuestionIds])assert.ok(allQuestions.has(id),id);
  }
  const workload=costWorkload(rows);assert.equal(workload.lessonMinutes,rows.reduce((s,l)=>s+l.data.minutes,0));assert.ok(workload.total>workload.lessonMinutes+400);
});

test('cost old completions/bookmarks/history survive import without completing new lessons',()=>{
  const old=emptyData();
  for(const id of costLegacyIds)old.records[id]={status:'completed',bookmarked:true,attempts:1,updatedAt:'2026-10-25T00:00:00Z'};
  const legacy=assessments.find(a=>a.id==='cb-cvp-check')!;
  const historical=newAttempt({...legacy,version:'boki-2026-v1'},'practice',1);
  old.assessments[legacy.id]=[historical];
  const saved=validateData(JSON.parse(JSON.stringify(old)));
  const current=selectCourseLessons(entries.map(l=>({id:l.data.stableId,qualification:l.data.qualification,archived:l.data.archived})),'cost-beginner');
  assert.equal(current.length,26);assert.equal(current.filter(l=>saved.records[l.id]?.status==='completed').length,0);
  assert.equal(Object.values(saved.records).filter(r=>r.bookmarked).length,4);
  assert.ok(!compatibleAttempt(legacy,historical));
  assert.equal(legacy.version,'cost-legacy-2026-v2');
  const fixed=legacy.questions.find(q=>q.id==='cb-cvp-q2')!;
  assert.match(fixed.prompt,/160,000/);assert.ok(isCorrect(fixed,String((160000+80000)/(2000-1200))));
  const incoming=emptyData();incoming.records['cb2-purpose']={status:'studying',bookmarked:false,attempts:0,updatedAt:'2026-10-28T00:00:00Z'};
  const merged=validateData(JSON.parse(JSON.stringify(mergeData(saved,incoming))));
  assert.ok(merged.records['cb-classify']?.bookmarked);assert.equal(merged.records['cb2-purpose']?.status,'studying');
  assert.deepEqual(merged.assessments[legacy.id],[historical]);
  for(const id of costLegacyIds)assert.ok(entries.find(l=>l.data.stableId===id)?.data.archived);
});

test('two full cost mocks use current selection format and absolute 40-minute deadlines',()=>{
  const seen=new Set<string>();const taught=new Set(Object.values(costBank).flat().map(q=>q.prompt));
  for(const form of ['a','b']){
    const a=assessments.find(a=>a.id===`cb2-mock-${form}`)!;
    assert.equal(a.version,costVersion);assert.equal(a.minutes,40);assert.equal(a.questions.length,37);
    assert.deepEqual(assessmentMaterialIssues(a),[]);
    assert.deepEqual([...new Set(a.questions.map(q=>q.group))].map(g=>a.questions.filter(q=>q.group===g).reduce((s,q)=>s+(q.points??1),0)),[44,24,32]);
    for(const q of a.questions){assert.equal(q.input,undefined);assert.equal(q.options.length,4);const premise=JSON.stringify([q.prompt,q.materialIds]);assert.ok(!seen.has(premise));assert.ok(!taught.has(q.prompt));seen.add(premise);}
    const t=newAttempt(a,'timed',1000);assert.equal(remainingSeconds(t,1000),2400);
    const reloaded=validateData({...emptyData(),assessments:{[a.id]:[t]}}).assessments[a.id]![0]!;
    assert.equal(reloaded.deadline,t.deadline);assert.equal(remainingSeconds(reloaded,2401001),0);
    for(const q of a.questions)t.answers[q.id]=q.answer;
    const result=gradeAttempt(a,t,2401000);assert.equal(result.score,37);assert.equal(practicePoints(a,result),100);
    t.answers[a.questions[0]!.id]=(a.questions[0]!.answer+1)%4;
    assert.equal(practicePoints(a,gradeAttempt(a,t,2401000)),97);
  }
  assert.equal(assessments.find(a=>a.id==='cost-beginner-mock')!.kind,'review');
});

test('root review and mock numeric targets agree with independently expressed formulas',()=>{
  for(const w of [...reviewWitnesses,...Object.entries(mockWitnesses).map(([id,w])=>({id,expression:w.formula,expected:String(w.value)}))]){
    const expression=w.expression;
    assert.match(expression,/^[\d.()+*/\s-]+$/);
    const expected=Function(`"use strict";return (${expression});`)() as number;
    const q=allQuestions.get(w.id)!;assert.ok(q,w.id);
    assert.ok(Math.abs(numeric(q.options[q.answer]!)-expected)<1e-8,w.id);
  }
  const reviews=assessments.filter(a=>a.kind==='review'&&[costVersion,costUnitOneReviewVersion,costUnitTwoAssessmentVersion].includes(a.version)).flatMap(a=>a.questions);
  assert.equal(reviews.length,107);assert.equal(new Set(reviews.map(q=>q.id)).size,107);
});

test('mock inventory and profit vectors reconcile independently in both directions',()=>{
  for(const [form,data] of Object.entries({
    a:{direct:[282000,198000],overhead:120000,hours:[300,200],bw:[30000,20000],ew:[40000,30000],bf:[50000,20000],ef:[34000,16000],sales:[600*900,500*700],sga:24000+16000+50000},
    b:{direct:[(20000+130000-30000)+400*200+10000,(15000+100000-10000)+200*175+5000],overhead:180000,hours:[400,200],bw:[25000,25000],ew:[45000,20000],bf:[45000,45000],ef:[35000,15000],sales:[600000,400000],sga:1000000*.02+180000},
  })){
    const manufacturing=data.direct.map((d,i)=>d+data.overhead*data.hours[i]!/data.hours.reduce((s,h)=>s+h,0));
    const finished=manufacturing.map((m,i)=>data.bw[i]!+m-data.ew[i]!);
    const cogs=finished.map((f,i)=>data.bf[i]!+f-data.ef[i]!);
    const gross=data.sales.map((s,i)=>s-cogs[i]!);
    const profit=gross.reduce((s,g)=>s+g,0)-data.sga;
    assert.equal(profit,form==='a'?200000:240000);
    assert.equal(profit,data.sales.reduce((s,n)=>s+n,0)-manufacturing.reduce((s,n)=>s+n,0)-data.sga+data.ew.reduce((s,n)=>s+n,0)-data.bw.reduce((s,n)=>s+n,0)+data.ef.reduce((s,n)=>s+n,0)-data.bf.reduce((s,n)=>s+n,0));
    const a=assessments.find(a=>a.id===`cb2-mock-${form}`)!;
    const last=a.questions.at(-1)!;assert.equal(numeric(last.options[last.answer]!),profit);
  }
});

test('cost registries are deterministic and preserve other qualification versions',()=>{
  assert.deepEqual(bokiAssessments([...entries].reverse()),bokiAssessments(entries));
  assert.equal(assessments.length,45);
  assert.ok(bokiAssessments(entries).filter(a=>!['boki-beginner','cost-beginner','boki-3'].includes(a.qualification)).every(a=>a.version==='boki-2026-v1'));
});

test('every numeric lesson key retains an independently recalculated regression reference',()=>{
  const numericQuestions=Object.values(costBank).flat().filter(q=>q.input==='number');
  const witnesses=[...unit12Witnesses,...unit3Witnesses,...unit45Witnesses];
  assert.equal(numericQuestions.length,193);assert.equal(witnesses.length,193);
  assert.equal(new Set(witnesses.map(w=>w.id)).size,193);
  for(const q of numericQuestions){
    const w=witnesses.find(w=>w.id===q.id)!;assert.ok(w,q.id);
    assert.match(w.formula,/^[\d.()+*/\s,-]+$|^Math\.(ceil|abs)\([\d.()+*/\s-]+\)$/);
    const calculated=Function(`"use strict";return (${w.formula});`)() as number;
    assert.ok(Math.abs(calculated-w.value)<1e-8,q.id);assert.ok(isCorrect(q,String(calculated)),q.id);
  }
});


test('glossary alternatives avoid aliases and overlapping broader/narrower terms',()=>{
  const groups=[['単位原価','単位当たり原価'],['当月製品製造原価','当月完成品原価'],['配賦額','製品別配賦額'],['経費','製造経費'],['原価計算対象','原価計算の単位'],['売上高差異','予算差額'],['作業時間','直接作業時間','間接作業時間'],['サービス別原価','案件別原価','完了した役務の原価'],['製品別損益','製品別営業利益']];
  const questions=assessments.find(a=>a.id==='cost-beginner-terms-all')!.questions;
  assert.equal(questions.length,157);
  for(const q of questions)for(const group of groups)if(group.includes(q.options[q.answer]!))assert.equal(q.options.filter(option=>group.includes(option)).length,1,q.id);
});

test('Unit 1 expansion gives new lessons separate records and preserves existing checks',()=>{
  assert.deepEqual(rows.filter(row=>row.data.unit===1).map(row=>row.data.stableId),[
    'cb2-purpose','cb2-material-use','cb2-elements','cb2-traceability','cb2-departments',
    'cb2-matched-revenue','cb2-profit-boundary','cb2-classification-case',
  ]);
  assert.deepEqual(rows.map(row=>row.data.order),Array.from({length:26},(_,i)=>i+1));
  const updated=assessments.filter(a=>a.version===costUnitOneExpandedVersion);
  assert.equal(updated.length,4);
  const revisedGlossaries=assessments.filter(a=>a.version===costUnitOneGlossaryVersion);
  assert.deepEqual(revisedGlossaries.map(a=>a.id),['cost-beginner-unit-1-glossary','cost-beginner-terms-all']);
  for(const a of revisedGlossaries)assert.ok(a.questions.some(q=>q.prompt.includes('現場在庫の増減')&&q.options[q.answer]==='正味消費量'));
  for (const id of addedSteps){
    const a=updated.find(item=>item.id===id+'-check')!;
    assert.equal(a.questions.length,6);
    for (const n of [0,1,2]) assert.equal(a.questions.filter(q=>q.objectives?.includes(n)).length,2);
  }
  const review=assessments.find(a=>a.id==='cost-beginner-unit-1-review')!;
  assert.equal(review.version,costUnitOneReviewVersion);
  assert.equal(review.questions.length,22);
  const previousExpanded={...review,version:costUnitOneExpandedVersion,questions:review.questions.slice(0,19)};
  assert.ok(!compatibleAttempt(review,newAttempt(previousExpanded,'practice',500)));
  const caseItems=review.questions.slice(19);
  assert.equal(caseItems.length,3);
  assert.ok(caseItems.every(q=>q.materialIds?.[0]==='cb2-unit1-repair-shop'));
  const direct=(4200+2800)+(3+2)*1600;
  const difference=18000+14000-direct-3600-2400;
  assert.equal(direct,15000);
  assert.equal(difference,11000);
  assert.match(caseItems[0]!.options[caseItems[0]!.answer]!,/32,000円、直接費15,000円/);
  assert.match(caseItems[1]!.options[caseItems[1]!.answer]!,/直接材料費、作業は直接労務費/);
  assert.match(caseItems[2]!.options[caseItems[2]!.answer]!,/11,000円。.*確定しない/);
  assert.deepEqual(assessmentMaterialIssues(review),[]);
  const previous={...review,version:costUnitOneAssessmentVersion,questions:review.questions.slice(0,15)};
  const attempt=newAttempt(previous,'practice',1000);
  for(const q of previous.questions)attempt.answers[q.id]=q.answer;
  const graded=gradeAttempt(previous,attempt,2000);
  const oldCheck=assessments.find(a=>a.id==='cb2-purpose-check')!;
  assert.equal(oldCheck.version,costUnitOneAssessmentVersion);
  const incomplete=newAttempt(oldCheck,'practice',1000);
  const restored=validateData({...emptyData(),assessments:{[review.id]:[graded],[oldCheck.id]:[incomplete]}});
  assert.equal(restored.assessments[review.id]![0]!.score,15);
  assert.ok(compatibleAttempt(oldCheck,restored.assessments[oldCheck.id]![0]!));
  assert.ok(!compatibleAttempt(review,restored.assessments[review.id]![0]!));
  const oldGlossaries=bokiAssessments(entries.filter(row=>!addedSteps.includes(row.data.stableId)));
  for(const a of assessments.filter(a=>a.kind==='glossary'&&(a.unit??0)>1)){
    assert.deepEqual(a.questions,oldGlossaries.find(old=>old.id===a.id)!.questions);
  }
  restored.records['cb2-purpose']={status:'completed',bookmarked:true,attempts:1,updatedAt:'2026-11-15T00:00:00Z'};
  assert.ok(addedSteps.every(id=>!restored.records[id]));
});

test('Unit 2 shares one traceable case and keeps new scores separate from prior results',()=>{
  const revised=assessments.filter(a=>a.version===costUnitTwoAssessmentVersion);
  assert.equal(revised.length,5);
  assert.ok(revised.every(a=>a.unit===2&&['lesson','review'].includes(a.kind)));
  const review=revised.find(a=>a.kind==='review')!;
  assert.equal(review.questions.length,17);
  assert.deepEqual(assessmentMaterialIssues(review),[]);
  const shared=review.questions.slice(13);
  assert.deepEqual(shared.map(q=>q.materialIds),Array.from({length:4},()=>['cb2-unit2-monthly-case']));
  const netP=40-4, quantity=20+70-5-netP-30-12;
  const perHour=(12*400+4*1800+5000)/(9+11);
  const costP=netP*400+9*(1800+perHour)+2150;
  const costQ=30*400+11*(1800+perHour);
  assert.equal(quantity,7);assert.equal(costP,40400);assert.equal(costQ,41150);
  assert.equal(6000+costP+costQ-8550,79000);
  assert.match(shared[0]!.options[shared[0]!.answer]!,/14,400円と7kg/);
  assert.match(shared[1]!.options[shared[1]!.answer]!,/19,800円と7,200円/);
  assert.equal(numeric(shared[2]!.options[shared[2]!.answer]!),costP);
  assert.equal(shared[3]!.options[shared[3]!.answer],'借方 売上原価79,000円／貸方 製品79,000円');
  const previous={...review,version:costVersion,questions:review.questions.slice(0,13)};
  const attempt=newAttempt(previous,'practice',1000);
  for(const q of previous.questions)attempt.answers[q.id]=q.answer;
  const finished=gradeAttempt(previous,attempt,2000);
  const restored=validateData({...emptyData(),assessments:{[review.id]:[finished]}}).assessments[review.id]![0]!;
  assert.equal(restored.score,13);
  assert.ok(compatibleAttempt(previous,restored));
  assert.ok(!compatibleAttempt(review,restored));
  for (const lesson of revised.filter(a=>a.kind==='lesson')) assert.equal(lesson.questions.length,14);
});

test('each Unit 1 lesson has two teaching figures and in-body feedback with a static solution',()=>{
  const unitOne=rows.filter(row=>row.data.unit===1);
  for(const {data,body} of unitOne){
    const figures=[...body.matchAll(/<figure id="([^"]+)"/g)];
    assert.ok(new Set(figures.map(figure=>figure[1])).size>=2,data.stableId);
    assert.equal((body.match(/<form data-guided-practice/g)??[]).length,1,data.stableId);
    assert.match(body,/<fieldset hidden>[\s\S]+?<p role="status" data-guided-feedback>/);
    assert.match(body,/<details>\s*<summary>解答と考え方を読む<\/summary>\s*<p data-guided-solution>/);
  }
});
