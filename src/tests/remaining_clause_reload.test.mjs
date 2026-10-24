import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as restore} from '../application/classical/result_reload.mjs';
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_remaining_reload_20261024.json',import.meta.url)));
const runtime=async()=>(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const r=await runtime(),fresh=await runtime();
function noun(stem){const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tl-1-a'}),nav=r.getClassicalGrammarApplicationCapabilityNavigator(s),b=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{subject:'3sg',animacy:'animate',humanness:'human',state:'absolutive',predicateFormation:'source-stem'});const a=r.executeClassicalGrammarTypedSourceOperationBindingFrame(b);assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;}
const nouns=f.stems.map(noun);
const options={relation:'marked',coordinationType:'additive',level:'principal',polarity:'positive',rightwardModifier:'oc',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',leftContextAbsent:false,adjoinedFunction:'none',identicalAdjoinedClauseEllipsis:'none',boundaryPunctuation:'comma'};
const source=(v,i,contextRecords=[])=>r.buildClassicalNahuatlClauseCompositionSourceFrame(v,{referenceId:'remaining-'+i,contextRecords});
function group(conjuncts,extra={}){const a=r.executeClassicalGrammarApplicationRequest({operationId:'clause:composition',args:[{operationKind:'conjunction',conjuncts,options,...extra}]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;}
function roundtrip(whole,extra={}){const recipe=save(r,{accepted:whole,...extra});assert(recipe,'the complete Result graph must export');const roots=restore(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots,'the complete Result graph must replay');assert.equal(roots.accepted.surfaceRealization,whole.surfaceRealization);return {recipe,roots};}
test('conjunct context records retain original discourse authority and exact aliases',()=>{
 const discourse=r.buildClassicalNahuatlDiscourseSourceContextFrame({speakerGender:'male',speakerGroupMembership:'member',namedPartnerKnownParticipant:'addressee'});
 const record=r.buildClassicalNahuatlSupplementationContextRecord({kind:'male-bonding',referenceId:'remaining-0',discourseSourceContextFrame:discourse});assert(r.isClassicalNahuatlSupplementationContextRecord(record));
 const whole=group([source(nouns[0],0,[record]),source(nouns[1],1)]),{recipe,roots}=roundtrip(whole,{context:record});
 const restored=roots.accepted.conjuncts[0].envelope.contextRecords[0];assert.equal(restored,roots.context);assert(fresh.isClassicalNahuatlDiscourseSourceContextFrame(restored.discourseSourceContextFrame));assert.equal(restored.discourseSourceContextFrame.speakerGender,'male');
 const forged=structuredClone(recipe),node=forged.nodes.find(n=>n.type==='clause:context-record');node.speakerIsGroupMember=true;assert.equal(restore(fresh,forged),null);
 assert.equal(save(r,{accepted:whole,context:{...record}}),null);
});
test('shared supplementation source survives whole conjunction reload',()=>{
 const shared=source(nouns[2],2),whole=group([source(nouns[0],0),source(nouns[1],1)],{sharedSupplement:shared,options:{...options,level:'adjoined',markedAdjoinedException:true,adjoinedFunction:'supplementary-subject'}});
 const {roots}=roundtrip(whole,{shared});assert.equal(roots.accepted.sharedSupplement,roots.shared);assert(fresh.isClassicalNahuatlClauseCompositionSourceFrame(roots.shared));assert.deepEqual(roots.accepted.relationFrame,whole.relationFrame);
});
test('a mixed conjunction/supplementation retains the whole and its exact original envelopes',()=>{
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',nouns[3]);c.captureCurrentResult('adjoined',nouns[4]);const a=c.compose({relation:'supplementation',supplementationReferenceMode:'shared',supplementationHeadRole:'subject',supplementationContactRole:'subject',supplementationOrder:'principal-first'});assert.equal(a.authorizationStatus,'authorized',a.blockReason);
 const whole=group([source(a.canonicalResult,0),source(nouns[5],1)]),{roots,recipe}=roundtrip(whole,{supplement:a.canonicalResult,principal:nouns[3]});
 assert(fresh.isClassicalNahuatlSupplementationFrame(roots.supplement));assert.equal(fresh.getClassicalNahuatlSupplementationClauseSourceFrame(roots.accepted.conjuncts[0].envelope),roots.supplement);assert.equal(fresh.getClassicalNahuatlSupplementationClauseSourceFrame(roots.supplement.principalClause),roots.principal);assert.deepEqual(roots.supplement.referenceFrame, a.canonicalResult.referenceFrame);
 const forged=structuredClone(recipe);forged.nodes.find(n=>n.type==='clause:supplementation').options.surface='answer';assert.equal(restore(fresh,forged),null);
});
test('composite particle is one exact dependency for outer conjunction and inner condition marker',()=>{
 const verb=stem=>r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:stem+'za',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]}).canonicalResult;
 const marker=r.executeClassicalGrammarApplicationRequest({operationId:'particle:result',args:[r.buildClassicalNahuatlParticleSourceFrame('l3-auh-in-tla'),{}]}).canonicalResult;
 const right=r.requestClassicalAdverbialAdjunctionResult({principalClause:verb(f.stems[0]),adjoinedUnit:verb(f.stems[1]),markerUnit:marker,semanticRelation:'condition',adverbializationDegree:'nonadverbialized',structureKind:'complex',adjoinedUnitType:'vnc',order:'modifier-head',recursion:'none',marking:'in-tla',conditionType:'open',contrast:'adverbial-modification'});assert.equal(right.supported,true);
 const whole=group([source(nouns[2],0),source(right,1)],{conjunctorResult:marker});
 const {recipe,roots}=roundtrip(whole,{marker});
 const rightRestored=fresh.getClassicalNahuatlSupplementationClauseSourceFrame(roots.accepted.conjuncts[1].envelope);
 assert.equal(rightRestored.sourceContract.marker.issuedResult,roots.marker);
 const request=fresh.buildClassicalNahuatlConjunctReplacementRequest(roots.accepted,0,fresh.getClassicalNahuatlSupplementationClauseSourceFrame(roots.accepted.conjuncts[0].envelope));assert.equal(request.conjunctorResult,roots.marker);
 // An equal, independently reissued particle must not impersonate that marker.
 const broken=structuredClone(recipe),original=broken.nodes.findIndex(n=>n.type==='particle:result');broken.nodes.splice(broken.nodes.length-1,0,structuredClone(broken.nodes[original]));broken.nodes.at(-1).conjunctorResult=broken.nodes.length-2;broken.roots.accepted=broken.nodes.length-1;
 assert.equal(restore(fresh,broken),null);
});
test('a reloaded contextual whole keeps the accepted Result until explicit Make',async()=>{
 const {restoreResultEditReload}=await import('../ui/composition/result_edit_reload.mjs');
 const {previewConstructionPacket}=await import('../ui/composition/construction_preview.mjs');
 const {executeConstructionPacket}=await import('../ui/composition/construction_packet.mjs');
 const {createConstructionSession}=await import('../ui/composition/construction_session.mjs');
 const {projectResultForEditing}=await import('../ui/composition/result_editing.mjs');
 const context=r.buildClassicalNahuatlSupplementationContextRecord({kind:'absolute-topic',referenceId:'remaining-0'});
 const whole=group([source(nouns[0],0,[context]),source(nouns[1],1)],{sharedSupplement:source(nouns[2],2),options:{...options,level:'adjoined',markedAdjoinedException:true,adjoinedFunction:'supplementary-subject'}});
 const {roots}=roundtrip(whole,{source:nouns[0]});
 const retained=roots.accepted; // restore adapter uses the standard result root name
 const named={...roots,result:retained};const pending=restoreResultEditReload(fresh,named,{version:1,path:['children',0]});assert(pending);
 const sourceFrame=roots.source.sourceFrame,nav=fresh.getClassicalGrammarApplicationCapabilityNavigator(sourceFrame);
 const binding=fresh.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{subject:'3sg',animacy:'animate',humanness:'human',state:'possessive',possessor:'2sg',predicateFormation:'source-stem'});
 const packet={kind:'result-edit',operation:'nnc:ordinary',edit:pending,inner:{kind:'typed',operation:'nnc:ordinary',source:sourceFrame,binding}};
 const history=fresh.getClassicalGrammarWorkspaceHistorySnapshot(),preview=previewConstructionPacket(fresh,packet);assert(preview?.isCurrent());assert.deepEqual(fresh.getClassicalGrammarWorkspaceHistorySnapshot(),history);
 const session=createConstructionSession({isSource:x=>x===sourceFrame,isResult:x=>Boolean(projectResultForEditing(fresh,x)),execute:p=>executeConstructionPacket(fresh,p),present:()=>true});session.restore(retained,null);session.stage({source:sourceFrame,route:{operation:'nnc:ordinary'},choices:{possessor:'2sg'},slots:[],ready:true,execution:packet});assert.equal(session.position.accepted.result,retained);
 assert.equal(session.make(),true);const made=session.position.accepted.result;assert.notEqual(made,retained);assert.equal(made.sharedSupplement,retained.sharedSupplement);assert.equal(made.conjuncts[1],retained.conjuncts[1]);assert.equal(made.conjuncts[0].envelope.contextRecords[0],retained.conjuncts[0].envelope.contextRecords[0]);
 const next=save(fresh,{result:made});assert(next);const third=await runtime(),again=restore(third,JSON.parse(JSON.stringify(next)));assert.equal(again.result.surfaceRealization,made.surfaceRealization);
});
test('projected nonspecific object references survive the composition source wrapper',()=>{
 const a=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:f.stems[0]+'za',verbClass:'A',sourceValence:'projective-nonhuman',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);
 const projected=r.buildClassicalNahuatlClauseCompositionSourceFrame(a.canonicalResult,{referenceId:'nonspecific-source',objectReferenceId:'retained-object',objectReferenceIds:{'nonspecific-object':'retained-object'}});assert.equal(projected.authorizationStatus,'authorized',projected.blockReason);
 const whole=group([projected,source(nouns[1],1)]),{roots}=roundtrip(whole);assert.deepEqual(roots.accepted.conjuncts[0].objects,whole.conjuncts[0].objects);assert.equal(roots.accepted.conjuncts[0].objects[0].referenceId,'retained-object');
});
