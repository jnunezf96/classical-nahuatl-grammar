import test from 'node:test';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {getResultEditTargets,resolveResultEditTarget} from '../ui/composition/result_editing.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('an authenticated admonitive sentence exposes its exact nuclear verb clause for composition',()=>{
 const nucleus=r.requestClassicalVncApplicationResult({sourceStem:'chīhua',verbClass:'B',sourceValence:'mainline-reflexive',subject:'2sg',mood:'admonitive',tense:'nonpast',requestedVoice:'active',sentenceOptions:{sentenceType:'admonition-sentence',introductoryParticle:'mā'}});
 const sentence=r.requestClassicalVncSentenceResultFrame(nucleus);
 assert.equal(sentence.authorizationStatus,'authorized',sentence.blockReason);
 const targets=getResultEditTargets(r,sentence),part=targets.find(x=>x.node===nucleus);
 assert.ok(part,'exact nucleus appears in existing Part choices');
 assert.equal(resolveResultEditTarget(r,sentence,part.path).node,nucleus);
 assert.equal(getResultEditTargets(r,{...sentence}).length,0);
 assert.equal(resolveResultEditTarget(r,sentence,['vncApplicationFrame']),null);
 const source=r.buildClassicalComparisonSourceUnit({sourceResult:nucleus});
 assert.equal(source.authorizationStatus,'authorized');
 assert.equal(r.getClassicalComparisonCanonicalSourceResult(source),nucleus);
 assert.equal(nucleus.normalizedRequest.mood,'admonitive');assert.equal(nucleus.normalizedRequest.tense,'nonpast');
 assert.equal(sentence.consumedNuclearSurface,'timochīuh');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const start=code.indexOf('    function handleClassicalResultAction(');
 let continued=null;
 const ctx=vm.createContext({targetObject:r,ClassicalConstructionSession:{position:{accepted:{result:sentence}}},
   resolveResultEditTarget:(runtime,root,path)=>resolveResultEditTarget(runtime,root,path),getClassicalOwnerIssuedResultProjection:null,
   PendingClassicalResultEdit:null,useClassicalWholeCanvasResultAsNextSource:exact=>{continued=exact;return true;}});
 vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);
 const detail={action:'continue',root:sentence,target:nucleus,path:part.path};
 assert.equal(ctx.handleClassicalResultAction(detail),true);assert.equal(continued,nucleus);
 assert.equal(ctx.ClassicalConstructionSession.position.accepted.result,sentence);
 for(const bad of [{...detail,target:{...nucleus}},{...detail,root:{...sentence}},{...detail,path:['vncApplicationFrame']}]){
  continued=null;assert.equal(ctx.handleClassicalResultAction(bad),false);assert.equal(continued,null);
 }
 const nounSource=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'chicāhuac',sourceClass:'zero'});
 const noun=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[nounSource,r.buildClassicalNahuatlOrdinaryNncOperationFrame(nounSource,{subject:'2sg',state:'absolutive'})]}).canonicalResult;
 const src=x=>r.buildClassicalComparisonSourceUnit({sourceResult:x});
 const child=r.requestClassicalComparisonResult({routeId:'similarity-iuhqui-principal',slots:{adjoined:src(noun)},choices:{icRelation:false,iuhquiModifier:'ma-nen',sentenceType:'none'}});
 const whole=r.requestClassicalComparisonResult({routeId:'similarity-iuhqui-larger-concatenate',slots:{similarityClause:src(child),headClause:source},choices:{position:'preposed',sentenceType:'none'}});
 assert.equal(whole.authorizationStatus,'authorized',whole.blockReason);
 assert.equal(whole.surface,'mā nēn iuhqui in tichicāhuac timochīuh');
 assert.equal(r.getClassicalComparisonCanonicalSourceResult(whole.operationFrame.sourceSlots.headClause),nucleus);
 assert.equal(sentence.consumedNuclearSurface,'timochīuh');
});
