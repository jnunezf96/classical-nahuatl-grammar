import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import * as a from '../ui/composition/derived_formation_transaction.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {executeConstructionPacket} from '../ui/composition/construction_packet.mjs';
const o=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('derived exact and raw decisions retain one authentic request and Result through preview and Make',()=>{
 const v=o.evaluateClassicalNahuatlVncApplication({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active'}),potential=o.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:'iz'});
 for(const [operation,source,request,binding,selectedBindingId]of [
  ['nnc:deverbal-construction',v,{constructionKind:'predicate-nominalization',nominalizationKind:'present-agentive',canonicalVncResult:v,subject:'3sg',state:'absolutive',animacy:'animate'},o.issueClassicalNahuatlFormationResultBindingFrame('nnc:deverbal-construction',v),'predicate-nominalization:present-agentive'],
  ['nnc:adverbial',potential.lexicalVncSourceFrame,{adverbialPotentialFrame:potential,degree:'first-degree',scope:'external-clause',context:{sentencePosition:'initial',clauseType:'assertion'}},null,null]
 ]){
  const ingress={},context={source,ingress,committed:true},session=createConstructionSession({isSource:x=>x===source}),scope=a.createDerivedFormationScope({owner:o,source,operation,session,getIngress:()=>ingress,getSourceContext:()=>context}),s=a.issueDerivedFormationSnapshot(scope,{ingress,sourceContext:context,request,binding,selectedBindingId});assert.equal(s?.contract.ready,true,s?.contract.blockReason);const p=a.projectDerivedFormationExecution(s);assert(p.prepared);assert.equal(p.prepared.canonicalResult,s.contract.preview);assert.equal(p.request,p.prepared.request);assert.equal(previewConstructionPacket(o,p).canonicalResult,s.contract.preview);assert.equal(executeConstructionPacket(o,p).canonicalResult,s.contract.preview);
  o.discardClassicalGrammarPreparedApplicationRequest(p.prepared);assert.equal(a.projectDerivedFormationExecution(s),null);assert.equal(previewConstructionPacket(o,p),null);assert.notEqual(executeConstructionPacket(o,p)?.authorizationStatus,'authorized');
 }
});
test('relational constituted Source keeps one prepared decision and cannot authorize a copied preparation',()=>{
 const source=o.buildClassicalNahuatlRelationalNncTypedSourceFrame({state:'possessive',possessorId:'1sg',subjectMode:'adverbialized',subjectId:'3common',nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'tloc-proximity',formation:'option-one',operation:'relational-nnc',sourceKind:'possessor',sourceFormation:'plain-nounstem',sourceVoice:'active',sourceMode:'whole-stem',sourceStem:'tloc',sourceMatrixStem:'tloc',affective:'none'}}),ingress=o.getClassicalGrammarApplicationCapabilityNavigator(source),binding=o.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'nnc:relational',{}),session=createConstructionSession({isSource:x=>x===source}),scope=a.createDerivedFormationScope({owner:o,source,operation:'nnc:relational',session,getIngress:()=>ingress}),s=a.issueDerivedFormationSnapshot(scope,{ingress,binding}),p=a.projectDerivedFormationExecution(s);assert(p.prepared);assert.equal(p.prepared.request.args[0],source);assert.equal(p.prepared,o.prepareClassicalGrammarApplicationRequest(binding));assert.equal(previewConstructionPacket(o,p).canonicalResult,p.prepared.canonicalResult);assert.equal(executeConstructionPacket(o,p).canonicalResult,p.prepared.canonicalResult);assert.equal(o.isClassicalGrammarPreparedApplicationRequest({...p.prepared}),false);
});
test('blocked derived and relational decisions are privately issued recovery evidence, never published Results',()=>{
 for(const [operation,request,decisionValidator,resultValidator]of [
  ['nnc:deverbal-construction',{constructionKind:'invented'},'isClassicalNahuatlIssuedDeverbalNncDecision','isClassicalNahuatlDeverbalNncGrammarFrame'],
  ['nnc:relational',{nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'invented'}},'isClassicalNahuatlIssuedRelationalNncDecision','isClassicalNahuatlRelationalResult']
 ]){const p=o.prepareClassicalGrammarApplicationRequest({operationId:operation,args:[request]});assert(p,operation);assert.equal(p.authorizationStatus,'blocked');assert.equal(o[decisionValidator](p.canonicalResult),true);assert.equal(o[decisionValidator]({...p.canonicalResult}),false);assert.equal(o[resultValidator](p.canonicalResult),false);assert.equal(o.previewClassicalGrammarApplicationRequest(p.request,p),null);assert.notEqual(o.executeClassicalGrammarApplicationRequest(p.request,p)?.authorizationStatus,'authorized');}
});
