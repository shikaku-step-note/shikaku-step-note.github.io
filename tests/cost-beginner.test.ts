import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { bokiAssessments } from '../src/data/bookkeeping';
import { costBank, costLessonIds, costLegacyIds, costUnitOneAssessmentVersion, costUnitOneExpandedVersion,costUnitOneReviewVersion, costUnitOneGlossaryVersion, costUnitTwoAssessmentVersion, costUnitTwoReviewVersion, costSheetAuditVersion, costUnitThreeReviewVersion, costMonthlyProfitVersion, costUnitFourReviewVersion, costCvpPlanningVersion, costUnitFiveReviewVersion, costCourseReviewVersion, costMockVersion, costVersion, costWorkload } from '../src/data/cost-beginner';
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
  assert.deepEqual(rows.map(l=>l.data.stableId),costLessonIds);assert.equal(rows.length,29);assert.equal(scope.length,42);
  for(const row of rows){
    const id=row.data.stableId;
    const teaching=row.body.split(/###? 公式資料/)[0]!.replace(/\r\n/g,'\n').replace(/^#{1,6}[^\n]*$/gm,'').replace(/<[^>]*>/g,'').replace(/\[[^\]]*\]\([^)]*\)/g,'').replace(/\s/g,'');
    if(addedSteps.includes(id)) {
      assert.match(row.body,/<figure id=/);
      assert.ok((row.body.match(/<details id=/g)??[]).length>=2);
      assert.ok(scope.some(competency=>competency.lessons.includes(id)));
    } else assert.ok(teaching.length>=3500,`${id}: teaching depth guard (not proof of completeness)`);
    assert.equal(row.data.objectives.length,3);
    if(id==='cb2-cost-sheet-audit') {
      assert.match(row.body,/用語を確認するときは/);
    } else if(['cb2-monthly-profit-statement','cb2-cvp-planning-case'].includes(id)) {
      assert.match(row.body,/用語の復習では/);
    } else assert.ok(row.data.glossary.length>=6);
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
  assert.equal(current.length,29);assert.equal(current.filter(l=>saved.records[l.id]?.status==='completed').length,0);
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
    assert.equal(a.version,costMockVersion);assert.equal(a.minutes,40);assert.equal(a.questions.length,37);
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
    assert.match(expression,/^[\d.()+*/\s-]+$|^Math\.ceil\([\d.()+*/\s-]+\)$/);
    const expected=Function(`"use strict";return (${expression});`)() as number;
    const q=allQuestions.get(w.id)!;assert.ok(q,w.id);
    assert.ok(Math.abs(numeric(q.options[q.answer]!)-expected)<1e-8,w.id);
  }
  const reviews=assessments.filter(a=>a.kind==='review'&&[costVersion,costUnitOneReviewVersion,costUnitTwoReviewVersion,costUnitThreeReviewVersion,costUnitFourReviewVersion,costUnitFiveReviewVersion,costCourseReviewVersion].includes(a.version)).flatMap(a=>a.questions);
  assert.equal(reviews.length,135);assert.equal(new Set(reviews.map(q=>q.id)).size,135);
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
  assert.equal(assessments.length,48);
  assert.ok(bokiAssessments(entries).filter(a=>!['boki-beginner','cost-beginner','boki-3'].includes(a.qualification)).every(a=>a.version==='boki-2026-v1'));
});

test('every numeric lesson key retains an independently recalculated regression reference',()=>{
  const numericQuestions=Object.values(costBank).flat().filter(q=>q.input==='number');
  const witnesses=[...unit12Witnesses,...unit3Witnesses,...unit45Witnesses];
  assert.equal(numericQuestions.length,199);assert.equal(witnesses.length,199);
  assert.equal(new Set(witnesses.map(w=>w.id)).size,199);
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
  assert.deepEqual(rows.map(row=>row.data.order),Array.from({length:29},(_,i)=>i+1));
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

test('Unit 2 tests two distinct source-record cases and preserves reports from earlier reviews',()=>{
  const revised=assessments.filter(a=>a.version===costUnitTwoAssessmentVersion);
  assert.equal(revised.length,4);
  assert.ok(revised.every(a=>a.unit===2&&a.kind==='lesson'));
  const review=assessments.find(a=>a.id==='cost-beginner-unit-2-review')!;
  assert.equal(review.version,costUnitTwoReviewVersion);
  assert.equal(review.questions.length,20);
  assert.deepEqual(assessmentMaterialIssues(review),[]);
  const shared=review.questions.slice(13,17);
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
  const current=review.questions.slice(17);
  assert.deepEqual(current.map(q=>q.materialIds),Array.from({length:3},()=>['cb2-unit2-metal-shop']));
  const netMaterials=(24-4)*600;
  const rate=(5*600+2400+8600)/8;
  const revisedA=netMaterials+4*(2400+rate)+4000;
  const revisedB=25*600+4*(2400+rate);
  const salesCost=revisedA+revisedB/2;
  assert.equal(netMaterials,12000);
  assert.equal(revisedA,32600);assert.equal(revisedB,31600);
  assert.equal(revisedA+revisedB,28450+35750);
  assert.equal(salesCost,48400);
  assert.equal(salesCost-(28450+35750/2),2075);
  assert.match(current[0]!.options[current[0]!.answer]!,/12,000円と10kg/);
  assert.match(current[1]!.options[current[1]!.answer]!,/A32,600円とB31,600円/);
  assert.match(current[2]!.options[current[2]!.answer]!,/48,400円.*15,800円.*2,075円減る/);
  const capstone=assessments.find(a=>a.id==='cb2-cost-sheet-audit-check')!;
  assert.equal(capstone.version,costSheetAuditVersion);
  assert.equal(capstone.questions.length,6);
  const previous={...review,version:costUnitTwoAssessmentVersion,questions:review.questions.slice(0,17)};
  const attempt=newAttempt(previous,'practice',1000);
  for(const q of previous.questions)attempt.answers[q.id]=q.answer;
  const finished=gradeAttempt(previous,attempt,2000);
  const restored=validateData({...emptyData(),assessments:{[review.id]:[finished]}}).assessments[review.id]![0]!;
  assert.equal(restored.score,17);
  assert.ok(compatibleAttempt(previous,restored));
  assert.ok(!compatibleAttempt(review,restored));
  for (const lesson of revised.filter(a=>a.kind==='lesson')) assert.equal(lesson.questions.length,14);
});

test('every cost accounting lesson has two teaching figures and in-body feedback with a static solution',()=>{
  for(const {data,body} of rows){
    const figures=[...body.matchAll(/<figure id="([^"]+)"/g)];
    assert.ok(new Set(figures.map(figure=>figure[1])).size>=2,data.stableId);
    assert.equal((body.match(/<form data-guided-practice/g)??[]).length,1,data.stableId);
    assert.match(body,/<fieldset hidden>[\s\S]+?<p role="status" data-guided-feedback>/);
    assert.match(body,/<details>\s*<summary>解答と考え方を読む<\/summary>\s*<p data-guided-solution>/);
  }
});

test('Unit 3 preserves earlier records and assesses period profit from a fresh mixed-business case',()=>{
  const id='cb2-monthly-profit-statement';
  const review=assessments.find(a=>a.id==='cost-beginner-unit-3-review')!;
  assert.equal(review.version,costUnitThreeReviewVersion);
  assert.equal(review.questions.length,20);
  assert.deepEqual(assessmentMaterialIssues(review),[]);
  const current=review.questions.slice(16);
  assert.ok(current.every(q=>q.materialIds?.[0]==='cb2-unit3-workshop-monthly'));
  const finished=9000+51000-12000;
  const costOfGoods=6000+finished-14000;
  const serviceRevenue=41000+7000;
  const serviceCost=3000+27000-8000;
  const revenue=72000+serviceRevenue;
  const productProfit=72000-costOfGoods-5000-10000*72000/revenue;
  const serviceProfit=serviceRevenue-serviceCost-3000-10000*serviceRevenue/revenue;
  const revisedServiceProfit=serviceProfit+9500-8000;
  assert.equal(finished,48000);assert.equal(costOfGoods,40000);
  assert.equal(serviceRevenue,48000);assert.equal(serviceCost,22000);
  assert.equal(productProfit,21000);assert.equal(serviceProfit,19000);
  assert.equal(revisedServiceProfit,20500);assert.equal(productProfit+revisedServiceProfit,41500);
  assert.match(current[0]!.options[current[0]!.answer]!,/48,000円.*40,000円/);
  assert.match(current[1]!.options[current[1]!.answer]!,/48,000円.*22,000円/);
  assert.match(current[2]!.options[current[2]!.answer]!,/21,000円.*19,000円.*40,000円/);
  assert.match(current[3]!.options[current[3]!.answer]!,/20,500円.*41,500円/);
  const newCheck=assessments.find(a=>a.id===id+'-check')!;
  assert.equal(newCheck.version,costMonthlyProfitVersion);
  assert.equal(newCheck.questions.length,6);
  const former={...review,version:costVersion,questions:review.questions.slice(0,16)};
  const attempt=newAttempt(former,'practice',1000);
  for(const question of former.questions)attempt.answers[question.id]=question.answer;
  const past=gradeAttempt(former,attempt,2000);
  const saved=emptyData();
  saved.records['cb2-wip']={status:'completed',bookmarked:true,attempts:1,updatedAt:'2026-11-15T00:00:00Z'};
  saved.assessments[review.id]=[past];
  const restored=validateData(JSON.parse(JSON.stringify(saved)));
  assert.ok(restored.records['cb2-wip']?.bookmarked);
  assert.ok(!restored.records[id]);
  assert.equal(restored.assessments[review.id]?.[0]?.score,16);
  assert.ok(compatibleAttempt(former,restored.assessments[review.id]![0]!));
  assert.ok(!compatibleAttempt(review,restored.assessments[review.id]![0]!));
});

test('Unit 4 distinguishes fixed unit costs, a fixed variable cost ratio and revised demand',()=>{
  const review=assessments.find(a=>a.id==='cost-beginner-unit-4-review')!;
  assert.equal(review.version,costUnitFourReviewVersion);
  assert.equal(review.questions.length,21);
  assert.deepEqual(assessmentMaterialIssues(review),[]);
  const fresh=review.questions.slice(16);
  assert.equal(fresh.length,5);
  assert.ok(fresh.every(q=>q.materialIds?.[0]==='cb2-unit4-photo-bookings'));
  const fixed=60000+84000,unitVariable=500+200+100;
  const baseRevenue=2000*150,baseVariable=unitVariable*150,baseMargin=2000-unitVariable;
  const baseProfit=baseRevenue-baseVariable-fixed;
  const currentThreshold=fixed/baseMargin,ratio=baseMargin/2000;
  const optionPrice=2400,margin=optionPrice-unitVariable;
  const changedThreshold=fixed/margin;
  const changedProfit=100*margin-fixed;
  const constantRatioThreshold=fixed/ratio/optionPrice;
  assert.equal(baseRevenue,300000);assert.equal(baseVariable,120000);assert.equal(fixed,144000);
  assert.equal(baseProfit,36000);assert.equal(ratio,.6);
  assert.equal(currentThreshold,120);assert.equal(currentThreshold*2000,240000);
  assert.equal(changedThreshold*optionPrice,216000);assert.equal(changedProfit,16000);
  assert.equal(constantRatioThreshold,100);assert.equal(constantRatioThreshold*optionPrice,240000);
  assert.match(fresh[0]!.options[fresh[0]!.answer]!,/300,000円.*120,000円.*144,000円/);
  assert.match(fresh[1]!.options[fresh[1]!.answer]!,/60％.*36,000円/);
  assert.match(fresh[2]!.options[fresh[2]!.answer]!,/120件.*240,000円/);
  assert.match(fresh[3]!.options[fresh[3]!.answer]!,/216,000円.*16,000円/);
  assert.match(fresh[4]!.options[fresh[4]!.answer]!,/100件.*240,000円/);
  const newLesson=assessments.find(a=>a.id==='cb2-cvp-planning-case-check')!;
  assert.equal(newLesson.version,costCvpPlanningVersion);
  assert.equal(newLesson.questions.length,6);
  const old={...review,version:costVersion,questions:review.questions.slice(0,16)};
  const previous=newAttempt(old,'practice',1000);
  for(const q of old.questions)previous.answers[q.id]=q.answer;
  const completed=gradeAttempt(old,previous,2000);
  const saved=emptyData();
  saved.records['cb2-behavior']={status:'completed',bookmarked:true,attempts:1,updatedAt:'2026-11-15T00:00:00Z'};
  saved.assessments[review.id]=[completed];
  const restored=validateData(JSON.parse(JSON.stringify(saved)));
  assert.ok(restored.records['cb2-behavior']?.bookmarked);
  assert.ok(!restored.records['cb2-cvp-planning-case']);
  assert.equal(restored.assessments[review.id]?.[0]?.score,16);
  assert.ok(compatibleAttempt(old,restored.assessments[review.id]![0]!));
  assert.ok(!compatibleAttempt(review,restored.assessments[review.id]![0]!));
});

test('Unit 5 reconciles normalized sales records, signed variances and a separate applied profit case',()=>{
  const review=assessments.find(a=>a.id==='cost-beginner-unit-5-review')!;
  assert.equal(review.version,costUnitFiveReviewVersion);
  assert.equal(review.questions.length,21);
  assert.deepEqual(assessmentMaterialIssues(review),[]);
  const fresh=review.questions.slice(14);
  assert.equal(fresh.length,7);
  assert.ok(fresh.every(q=>q.materialIds?.[0]==='cb2-unit5-sales-records'));
  const aBudget=20*6, aActual=(25-3)*6, bActual=92, bPrice=119600/bActual;
  const budget=aBudget*900+80*1500;
  const actual=aActual*850+bActual*bPrice;
  const bridge=aActual*900+bActual*1500;
  const priceFirst=aBudget*850+80*bPrice;
  assert.equal(aActual,132);assert.equal(bPrice,1300);
  assert.equal(actual-budget,3800);
  assert.equal(bridge-budget,28800);assert.equal(actual-bridge,-25000);
  assert.equal(actual-priceFirst,25800);assert.equal(priceFirst-budget,-22000);
  for(const [index,value] of [[1,actual-budget],[2,bridge-budget],[3,actual-bridge]] as const){
    const q=fresh[index]!;
    assert.ok(q.signed);assert.ok(isCorrect(q,String(value)));
    assert.ok(!isCorrect(q,String(-value)));
  }
  assert.ok(isCorrect(fresh[1]!,'＋３，８００'));
  assert.ok(isCorrect(fresh[2]!,'+28,800'));
  assert.ok(isCorrect(fresh[3]!,'－２５，０００'));
  assert.ok(!isCorrect(fresh[1]!,'+3,8,00'));
  assert.ok(!isCorrect(fresh[1]!,'+-3800'));
  assert.ok(!isCorrect({...fresh[1]!,signed:false},'+3800'));
  assert.ok(!isCorrect(fresh[3]!,'25000'));
  assert.match(fresh[4]!.options[fresh[4]!.answer]!,/価格を先に動かす/);
  assert.match(fresh[5]!.options[fresh[5]!.answer]!,/400円下回った.*費用/);
  const planned=(900-450)*aBudget+(1500-800)*80-50000;
  const recorded=(850-470)*aActual+(bPrice-830)*bActual-52000;
  assert.equal(planned,60000);assert.equal(recorded,41400);
  assert.match(fresh[6]!.options[fresh[6]!.answer]!,/60,000円.*41,400円.*18,600円/);
  const old={...review,version:costVersion,questions:review.questions.slice(0,14)};
  const attempt=newAttempt(old,'practice',1000);
  for(const q of old.questions)attempt.answers[q.id]=q.answer;
  const result=gradeAttempt(old,attempt,2000);
  const saved=emptyData();
  saved.records['cb2-sales-variance']={status:'completed',bookmarked:true,attempts:1,updatedAt:'2026-11-15T00:00:00Z'};
  saved.assessments[review.id]=[result];
  const restored=validateData(JSON.parse(JSON.stringify(saved)));
  assert.equal(restored.records['cb2-sales-variance']?.status,'completed');
  assert.ok(restored.records['cb2-sales-variance']?.bookmarked);
  assert.equal(restored.assessments[review.id]?.[0]?.score,14);
  assert.ok(compatibleAttempt(old,restored.assessments[review.id]![0]!));
  assert.ok(!compatibleAttempt(review,restored.assessments[review.id]![0]!));
});

test('course review reconciles current inventory and profit separately from CVP and budget variance',()=>{
  const final=assessments.find(a=>a.id==='cost-beginner-review-all')!;
  assert.equal(final.version,costCourseReviewVersion);
  assert.equal(final.questions.length,31);
  assert.deepEqual(assessmentMaterialIssues(final),[]);
  const tasks=final.questions.slice(22);
  assert.ok(tasks.every(q=>q.materialIds?.[0]==='cb2-course-monthly-workshop'));
  const overhead=3000+2*1800+5400;
  const material=(24-4)*500;
  const manufacturingA=material+8*1800+3600+overhead*15/20;
  const manufacturingB=18*500+6*1800+2200+overhead*5/20;
  const completeA=4000+manufacturingA-6000;
  const completeB=5000+manufacturingB-3000;
  const costA=7000+completeA-8000, costB=4000+completeB-6000;
  const profitA=52*1100-costA-4200-4000, profitB=20*1700-costB-1800-2000;
  assert.equal(profitA,15000);assert.equal(profitB,5200);
  assert.equal(profitA+profitB,20200);
  assert.ok(isCorrect(tasks[0]!,String(material)));assert.ok(isCorrect(tasks[1]!,String(overhead/4)));
  assert.match(tasks[2]!.options[tasks[2]!.answer]!,/35,000円.*34,000円/);
  assert.match(tasks[3]!.options[tasks[3]!.answer]!,/15,000円.*5,200円.*20,200円/);
  const firstThreshold=42000/(1250-750), secondThreshold=48000/(1400-800);
  assert.equal(firstThreshold,84);assert.equal(secondThreshold,80);
  assert.equal(firstThreshold*1250,105000);assert.equal(secondThreshold*1400,112000);
  assert.match(tasks[4]!.options[tasks[4]!.answer]!,/84個から80個.*105,000円から112,000円/);
  assert.equal((1250-750)*100-42000,8000);assert.equal((1400-800)*100-48000,12000);
  assert.match(tasks[5]!.options[tasks[5]!.answer]!,/8,000円.*12,000円/);
  const quantity=(52-50)*1200+(20-18)*1800;
  const price=(1100-1200)*52+(1700-1800)*20;
  assert.equal(quantity+price,52*1100+20*1700-50*1200-18*1800);
  assert.ok(isCorrect(tasks[6]!,'＋６，０００'));assert.ok(isCorrect(tasks[7]!,'−７，２００'));
  assert.ok(!isCorrect(tasks[7]!,String(-price)));
  assert.match(tasks[8]!.options[tasks[8]!.answer]!,/1,200円.*20,200円.*費用予算/);
  const old={...final,version:costVersion,questions:final.questions.slice(0,22),materials:undefined};
  const oldRun=newAttempt(old,'practice',1000);
  for(const question of old.questions)oldRun.answers[question.id]=question.answer;
  const finished=gradeAttempt(old,oldRun,2000);
  const stored=validateData({...emptyData(),assessments:{[old.id]:[finished]}}).assessments[old.id]![0]!;
  assert.equal(stored.score,22);
  assert.ok(compatibleAttempt(old,stored));assert.ok(!compatibleAttempt(final,stored));
});

test('revised mocks retain 40-minute format and protect older scores from changed questions',()=>{
  const current=assessments.find(a=>a.id==='cb2-mock-a')!;
  const old=newAttempt({...current,version:costVersion},'timed',1000);
  assert.ok(!compatibleAttempt(current,old));
  const priceChange=current.questions.find(q=>q.id==='cb2-mock-a-p04')!;
  assert.equal(numeric(priceChange.options[priceChange.answer]!),334);
  assert.ok(333*(1440-900)<180000);
  assert.ok(334*(1440-900)>=180000);
  for(const form of ['a','b']){
    const mock=assessments.find(a=>a.id==='cb2-mock-'+form)!;
    const concepts=mock.questions.filter(q=>/c(?:0[1-9]|1[0-3])$/.test(q.id));
    const longest=concepts.filter(q=>q.options.every((o,index)=>index===q.answer||o.length<q.options[q.answer]!.length));
    assert.ok(longest.length<=4);
  }
});
