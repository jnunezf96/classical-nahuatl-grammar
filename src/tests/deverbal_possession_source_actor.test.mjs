import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createPossessiveFixture,domains} from './helpers/deverbal_possessive_fixture.mjs';
const nonce=JSON.parse(readFileSync(new URL('./fixtures/nonce_deverbal_possessive_20261024.json',import.meta.url)));
const specific=domains.possessors.filter(o=>/^[123](sg|pl)$/.test(o.value)).map(o=>o.value);
for(const kind of ['passive-action','active-action'])test(`native ${kind} raw Source carries each selected specific possessor into its genuine VNC subject`,async()=>{
 const h=await createPossessiveFixture(nonce.verb);
 h.set('classical-deverbal-nnc-family','predicate-nominalization');h.set('classical-deverbal-nnc-nominalization-kind',kind);
 const valence=kind==='passive-action'?'specific-projective':'intransitive';h.set('classical-rule-logic-valence',valence);
 const options=h.r.getClassicalNahuatlNonactiveStemOptions(nonce.verb,{verbClass:'B',sourceValence:valence});
 h.set('classical-rule-logic-nonactive-family',(options.options.find(o=>o.suffixFamily==='ō')||options.options[0])?.optionId||'');
 for(const person of specific){
  h.set('classical-rule-logic-nnc-possessor',person);
  const request=h.r.buildClassicalNominalConstructionUiRequest(),result=h.r.evaluateClassicalNahuatlDeverbalNnc(request);
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(result.operationFrame.transformedPossessor,person,'the Source subject must become this selected possessor');
  assert.equal(result.canonicalResult.subject,'3common','outer possessum reference remains independent of Source actor');
  assert.equal(result.canonicalResult.possessor,person);
 }
});

test('raw Core action nouns retain all nominal possessors and independent common reference',async()=>{
 const h=await createPossessiveFixture(nonce.verbI);
 h.set('classical-deverbal-nnc-family','deverbal-action');h.set('classical-deverbal-nnc-action-kind','active-action');h.set('classical-rule-logic-valence','intransitive');
 h.set('classical-rule-logic-nnc-subject-number','common');h.set('classical-rule-logic-nnc-subject-animacy','nonanimate');
 for(const {value:person} of domains.possessors){h.set('classical-rule-logic-nnc-possessor',person);const req=h.r.buildClassicalNominalConstructionUiRequest(),result=h.r.evaluateClassicalNahuatlDeverbalNnc(req);assert.equal(result.authorizationStatus,'authorized',result.blockReason);assert.equal(result.canonicalResult.possessor,person);if(specific.includes(person))assert.equal(result.operationFrame.transformedPossessor,person);}
 h.set('classical-rule-logic-nnc-possessor','3sg');const finiteResult=h.r.evaluateClassicalNahuatlDeverbalNnc(h.r.buildClassicalNominalConstructionUiRequest());
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),start=code.indexOf('    function getClassicalDeverbalEditablePossessorValues('),end=code.indexOf('\n    function ',start+1);
 const ctx=vm.createContext({targetObject:{...h.r,document:h.documentObject},getActiveClassicalGrammarResultBinding:()=>null,getClassicalNominalConstructionControlValue:(id,fallback)=>h.controls.get(id)?.value||fallback});vm.runInContext(code.slice(start,end),ctx);
 assert.deepEqual([...ctx.getClassicalDeverbalEditablePossessorValues(finiteResult)],domains.possessors.map(o=>o.value));
});

test('source-derived raw possessors offer the finite participant domain; exact Sources keep their participant',async()=>{
 const h=await createPossessiveFixture(nonce.verb);h.set('classical-deverbal-nnc-family','predicate-nominalization');h.set('classical-deverbal-nnc-nominalization-kind','active-action');h.set('classical-rule-logic-valence','intransitive');
 const request=h.r.buildClassicalNominalConstructionUiRequest(),result=h.r.evaluateClassicalNahuatlDeverbalNnc(request);assert.equal(result.authorizationStatus,'authorized');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');let exact=null;
 const ctx=vm.createContext({targetObject:{...h.r,document:h.documentObject},getActiveClassicalGrammarResultBinding:()=>exact,getClassicalNominalConstructionControlValue:(id,fallback)=>h.controls.get(id)?.value||fallback,
 applyClassicalRuleLogicSelectOptionAvailability:(id,values,fallback)=>{const c=h.controls.get(id);if(!c)return;for(const option of c.options)option.disabled=!values.includes(option.value);c.disabled=values.length<2;if(!values.includes(c.value))c.value=fallback||values[0];}});
 for(const name of ['getClassicalDeverbalEditablePossessorValues','syncClassicalDeverbalNncStateOptions']){
  const start=code.indexOf(`    function ${name}(`);if(start<0)continue;const end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);
 }
 ctx.syncClassicalDeverbalNncStateOptions(result);
 assert.deepEqual(h.controls.get('classical-rule-logic-nnc-possessor').options.filter(o=>!o.disabled).map(o=>o.value),specific);
 exact={exactResult:request.canonicalVncResult};ctx.syncClassicalDeverbalNncStateOptions(result);assert.equal(h.controls.get('classical-rule-logic-nnc-possessor').disabled,true);
 assert.deepEqual(h.controls.get('classical-rule-logic-nnc-possessor').options.filter(o=>!o.disabled).map(o=>o.value),['3sg']);
});

for(const [actor,patient] of [['3sg','1sg'],['3sg','3sg']])for(const [kind,tense] of [['passive-action','distant-past'],['preterit-patientive','preterit']])test(`${kind} captures passive ${patient} separately from active actor ${actor}`,async()=>{
 const h=await createPossessiveFixture(nonce.verb);const option=h.r.getClassicalNahuatlNonactiveStemOptions(nonce.verb,{verbClass:'B',sourceValence:'specific-projective'}).options.find(o=>o.suffixFamily==='ō');
 const a=h.r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:nonce.verb,verbClass:'B',sourceValence:'specific-projective',sourceSubject:actor,subject:patient,objectKind:'specific-projective',objectPerson:patient,sourceObjectRequests:[{objectId:'source-object-1',objectKind:'specific-projective',objectPerson:patient,governor:'directive',derivationalLevel:1}],mood:'indicative',tense,requestedDerivation:'direct',requestedVoice:'passive',nonactiveOptionId:option.optionId}]});
 assert.equal(a.authorizationStatus,'authorized',a.blockReason);const source=a.canonicalResult.resultFrame;
 assert.equal(source.participantProjection.targetSubject.category,patient);
 const before=source.surfaceRealization;
 const capture=kind==='preterit-patientive'?h.r.captureClassicalNahuatlPreteritVncResultForNominalization(source):h.r.captureClassicalNahuatlVncResultForPredicateNominalization(source,kind,'possessive');
 assert.equal(capture.authorizationStatus,'authorized',capture.blockReason);assert.equal(capture.sourceSubject,patient);assert(capture.canonicalVncResult===source);
 assert.equal(capture.continuationProjection.sourceSubject,actor,'the active ancestry remains available separately');
 const captureWhole=kind==='preterit-patientive'?h.r.captureClassicalNahuatlPreteritVncResultForNominalization(a.canonicalResult):h.r.captureClassicalNahuatlVncResultForPredicateNominalization(a.canonicalResult,kind,'possessive');
 assert.equal(captureWhole.authorizationStatus,'authorized',captureWhole.blockReason);assert.equal(captureWhole.sourceSubject,patient);assert(captureWhole.canonicalVncResult===a.canonicalResult);
 const copy=kind==='preterit-patientive'?h.r.captureClassicalNahuatlPreteritVncResultForNominalization({...source}):h.r.captureClassicalNahuatlVncResultForPredicateNominalization({...source},kind,'possessive');
 assert.equal(copy.authorizationStatus,'blocked');assert.equal(source.surfaceRealization,before);
});

test('changing from imported possession to a finite-Source route restores its actual domain before a valid preview',async()=>{
 const h=await createPossessiveFixture(nonce.verb);h.set('classical-deverbal-nnc-family','predicate-nominalization');h.set('classical-deverbal-nnc-nominalization-kind','active-action');h.set('classical-rule-logic-valence','intransitive');h.set('classical-rule-logic-nnc-possessor','nonspecific-human');
 const result=h.r.evaluateClassicalNahuatlDeverbalNnc(h.r.buildClassicalNominalConstructionUiRequest());assert.equal(result.authorizationStatus,'blocked');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const ctx=vm.createContext({targetObject:{...h.r,document:h.documentObject},getActiveClassicalGrammarResultBinding:()=>null,buildClassicalNominalConstructionUiRequest:(...args)=>h.r.buildClassicalNominalConstructionUiRequest(...args),getClassicalNominalConstructionControlValue:(id,fallback)=>h.controls.get(id)?.value||fallback,
 applyClassicalRuleLogicSelectOptionAvailability:(id,values,fallback)=>{const c=h.controls.get(id);if(!c)return;for(const o of c.options)o.disabled=!values.includes(o.value);c.disabled=values.length<2;if(!values.includes(c.value))c.value=fallback||values[0];}});
 for(const name of ['getClassicalDeverbalEditablePossessorValues','syncClassicalDeverbalNncStateOptions']){const start=code.indexOf(`    function ${name}(`),end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);}
 const before=h.r.getClassicalGrammarWorkspaceHistorySnapshot();ctx.syncClassicalDeverbalNncStateOptions(result);
 assert.deepEqual(h.controls.get('classical-rule-logic-nnc-possessor').options.filter(o=>!o.disabled).map(o=>o.value),specific);
 assert.equal(h.controls.get('classical-rule-logic-nnc-possessor').value,'3sg');
 assert.deepEqual(h.r.getClassicalGrammarWorkspaceHistorySnapshot(),before,'visibility probes do not accept');
});

test('raw passive possession changes the promoted patient while retaining another Source object',async()=>{
 const h=await createPossessiveFixture(nonce.verb);
 for(const [id,value]of Object.entries({'classical-deverbal-nnc-family':'predicate-nominalization','classical-deverbal-nnc-nominalization-kind':'passive-action','classical-rule-logic-valence':'specific-projective','classical-rule-logic-nnc-possessor':'2sg','classical-source-object-count':'2','classical-source-object-2-kind':'nonspecific-nonhuman'}))h.set(id,value);
 const option=h.r.getClassicalNahuatlNonactiveStemOptions(nonce.verb,{verbClass:'B',sourceValence:'specific-projective'}).options.find(o=>o.suffixFamily==='ō');h.set('classical-rule-logic-nonactive-family',option.optionId);
 const request=h.r.buildClassicalNominalConstructionUiRequest(),result=h.r.evaluateClassicalNahuatlDeverbalNnc(request);
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);assert.equal(result.canonicalResult.possessor,'2sg');
 const capture=h.r.captureClassicalNahuatlVncResultForPredicateNominalization(request.canonicalVncResult,'passive-action','possessive');
 assert.equal(capture.canonicalVncResult,request.canonicalVncResult);
 const objects=capture.canonicalVncResult.sourceAnalysisFrame.participantSurfaceObjectRequests;
 assert.equal(objects.length,2);assert.equal(objects[0].objectPerson,'2sg');assert.equal(objects[1].objectKind,'nonspecific-nonhuman');
 assert.equal(capture.canonicalVncResult.participantProjection.targetSubject.category,'2sg');
});
