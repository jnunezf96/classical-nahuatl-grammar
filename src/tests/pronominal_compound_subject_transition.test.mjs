import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const s=r.buildClassicalNahuatlPronominalNncSourceFrame({stem:'cā'}),nav=r.getClassicalGrammarApplicationCapabilityNavigator(s);
const bind=q=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:pronominal',q);
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),ctx=vm.createContext({targetObject:r});
for(const name of ['getClassicalPronominalSpecialHumanTransitionSelections','getClassicalPronominalSubjectTransitionSelections','getClassicalPronominalNextChoiceProjection','getClassicalOrdinaryNncNextChoiceProjection']){const a=code.indexOf(`    function ${name}(`);vm.runInContext(code.slice(a,code.indexOf('\n    function ',a+1)),ctx);}
test('compound cā derives plural subject domain; return to simple withdraws only recognized old subject',()=>{
 const simple=bind({subject:'3sg'}),forward=ctx.getClassicalPronominalSubjectTransitionSelections(simple,{...simple.callerSelections,compoundMatrix:'tl-e-in'},'compoundMatrix');
 assert.equal(bind(forward).bindingStatus,'ready');assert.equal(forward.subject,'3sg');assert.ok(bind(forward).ownerBindingFrame.ownerSelectionFrame.subjectValues.includes('3pl'));
 const q={subject:'3pl',compoundMatrix:'tl-e-in'};
 const domain=r.getCanonicalNncOperationSelectionFrame(s,q);assert.ok(domain.subjectValues.includes('3pl'));assert.equal(domain.selectedSubject,'3pl');
 const compound=bind(q);assert.equal(compound.bindingStatus,'ready');const op=r.buildClassicalNahuatlPronominalNncOperationFrame(s,q);assert.equal(op.authorizationStatus,'authorized');assert.equal(op.derivedSourceFrame.allowedSubjects.includes('3pl'),true);
 const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:pronominal',args:[s,op]});assert.equal(receipt.authorizationStatus,'authorized');assert.equal(receipt.canonicalResult.wordSurface,'cātleimeh');
 const invalid={...q,compoundMatrix:'none'};assert.notEqual(bind(invalid).bindingStatus,'ready');
 const next=ctx.getClassicalPronominalSubjectTransitionSelections(compound,invalid,'compoundMatrix');assert.equal(Object.hasOwn(next,'subject'),false);const b=bind(next);assert.equal(b.bindingStatus,'ready');assert.equal(b.effectiveSelections.subject,'3sg');assert.equal(compound.callerSelections.subject,'3pl');
 const projection=ctx.getClassicalOrdinaryNncNextChoiceProjection(compound);assert.equal(projection.compoundMatrix.find(o=>o.optionId==='none').availabilityStatus,'available');
 assert.equal(r.buildClassicalNahuatlPronominalNncOperationFrame(s,invalid).authorizationStatus,'blocked');
});
test('copied source/binding and unrecognized subject cannot acquire compound transition authority',()=>{
 assert.equal(r.getCanonicalNncOperationSelectionFrame({...s},{subject:'3pl',compoundMatrix:'tl-e-in'}).authorizationStatus,'blocked');
 const old=bind({subject:'3sg',compoundMatrix:'tl-e-in'});for(const [b,q]of [[{...old},{subject:'3pl',compoundMatrix:'none'}],[old,{subject:'invented',compoundMatrix:'none'}]])assert.equal(ctx.getClassicalPronominalSubjectTransitionSelections(b,q,'compoundMatrix'),q);
});
