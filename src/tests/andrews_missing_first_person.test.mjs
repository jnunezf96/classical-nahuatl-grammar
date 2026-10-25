import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
const v=(sourceStem,subject='1sg',extra={})=>{
 const made=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem,verbClass:sourceStem==='mati'?'B':'A',sourceValence:'intransitive',subject,mood:'indicative',tense:'present',...extra}]});
 assert.equal(made.authorizationStatus,'authorized',made.blockReason);return made.canonicalResult;
};
const conjunction={relation:'conjunction',coordinationRelation:'unmarked',coordinationType:'additive',clauseLevel:'principal',polarity:'positive',leftContext:'present',rightwardModifier:'none',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',adjoinedFunction:'none'};
const supplement={relation:'supplementation',supplementationReferenceMode:'shared',supplementationHeadRole:'subject',supplementationContactRole:'subject',supplementationOrder:'principal-first'};
const controller=(a,b)=>{const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',a);c.captureCurrentResult('adjoined',b);return c;};
test('57.6 conjunction offers optional later first-person silence while retaining its first-person source',()=>{
 const first=v('cuīca'),later=v('mati'),c=controller(first,later);
 const d=c.buildDecisionContract({...conjunction,contextualSilentFirstPerson:'absent'});
 assert.deepEqual(d.decisions.find(x=>x.id==='contextual-silent-first-person')?.values,['absent','present']);
 for(const [mark,surface] of [['unmarked','Nicuīca mati.'],['marked','Nicuīca auh mati.']]){
  const made=c.compose({...conjunction,coordinationRelation:mark,contextualSilentFirstPerson:'present'});
  assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(made.canonicalResult.surfaceRealization,surface);
  assert.match(made.canonicalResult.formulaRealization,/#0-0\(mati\)/u);
  const projection=made.canonicalResult.contextualFirstPersonProjections[1];
  assert.equal(projection.contextualTypedSlotFrame.slots.subject.pers1,'0');
  assert.equal(projection.sourceTypedSlotFrame.slots.subject.pers1,'ni');
  assert.equal(made.canonicalResult.conjuncts[1].subject.features.person,'1');
 }
 assert.equal(c.getCapturedCanonicalResult('adjoined'),later);
 assert.equal(c.compose({...conjunction,contextualSilentFirstPerson:'absent'}).canonicalResult.surfaceRealization,'Nicuīca nimati.');
});
test('57.6 nominalized-VNC priest supplement retains person one when its pers1 becomes silent',()=>{
 const future=v('maca','1pl',{sourceValence:'projective-nonhuman',objectKind:'nonspecific-nonhuman',tense:'future'});
 const made=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[{constructionKind:'predicate-nominalization',nominalizationKind:'future-agentive',canonicalVncResult:future,subject:'1pl',state:'absolutive',humanness:'human',animacy:'animate',numberConnector:'qui'}]});
 assert.equal(made.authorizationStatus,'authorized',made.blockReason);const priest=made.canonicalResult,c=controller(v('cuīca','1pl'),priest);
 const d=c.buildDecisionContract({...supplement,contextualSilentFirstPerson:'present'});
 assert.deepEqual(d.decisions.find(x=>x.id==='contextual-silent-first-person')?.values,['absent','present']);
 const result=c.compose({...supplement,contextualSilentFirstPerson:'present'});
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);assert.equal(result.canonicalResult.surfaceRealization,'Ticuīcah tlamacazqueh.');
 assert.equal(result.canonicalResult.supplementClause.subject.features.person,'1');
 const f=result.canonicalResult.operationFrames.find(x=>x.kind==='classical-nahuatl-contextual-silent-first-person-frame');
 assert.equal(f.contextualProjection.sourceTypedSlotFrame.slots.subject.pers1,'ti');
 assert.equal(f.contextualProjection.contextualTypedSlotFrame.slots.subject.pers1,'0');
 assert.equal(r.isClassicalNahuatlContextualFirstPersonNncSlotFrame(f.contextualProjection.contextualTypedSlotFrame),true);
 assert.equal(r.isClassicalNahuatlContextualFirstPersonNncSlotFrame({...f.contextualProjection.contextualTypedSlotFrame}),false);
 assert.equal(r.buildClassicalNahuatlNncSentenceSurfaceFrame(structuredClone(f.contextualProjection.contextualTypedSlotFrame),{sentenceType:'assertion',polarity:'positive'}).authorizationStatus,'blocked');
 assert.equal(c.getCapturedCanonicalResult('adjoined'),priest);
 assert.equal(c.compose({...supplement,contextualSilentFirstPerson:'absent'}).canonicalResult.surfaceRealization,'Ticuīcah titlamacazqueh.');
});
test('57.6 silence rejects mismatched persons or groups and independent nonreflexive requests',()=>{
 for(const later of [v('mati','3sg'),v('mati','1pl')]){
  const result=controller(v('cuīca'),later).compose({...conjunction,contextualSilentFirstPerson:'present'});
  assert.equal(result.authorizationStatus,'blocked');
 }
 const c=controller(v('mati'),v('cuīca'));
 assert.equal(c.compose({relation:'contextual-first-person-realization',contextualSilentFirstPerson:'present'}).authorizationStatus,'blocked');
});

test('concatenated first-person owner rejects copied envelopes and distinct first-plural referents',()=>{
 const a=r.buildClassicalNahuatlSupplementationClauseEnvelope(v('cuīca','1pl'),{referenceId:'group-a'});
 const b=r.buildClassicalNahuatlSupplementationClauseEnvelope(v('mati','1pl'),{referenceId:'group-b'});
 assert.equal(r.buildClassicalNahuatlConcatenatedFirstPersonProjection(a,b),null);
 assert.equal(r.buildClassicalNahuatlConcatenatedFirstPersonProjection({...a},b),null);
 assert.equal(r.buildClassicalNahuatlConcatenatedFirstPersonProjection(a,{...b,subject:a.subject}),null);
});

test('the existing distinctive reflexive standalone silence remains available',()=>{
 for(const subject of ['1sg','1pl']){
  const source=v('mati',subject,{sourceValence:'mainline-reflexive',objectKind:'reflexive'});
  const principalClause=r.buildClassicalNahuatlSupplementationClauseEnvelope(source,{referenceId:'speaker'});
  const made=r.evaluateClassicalNahuatlSupplementationOperation({operationKind:'contextual-first-person-realization',principalClause,options:{contextualSilentFirstPerson:true}});
  assert.equal(made.authorizationStatus,'authorized',made.blockReason);
  assert.equal(made.principalClause.subject.features.person,'1');
 }
});
