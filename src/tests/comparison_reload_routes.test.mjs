import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as replay} from '../application/classical/result_reload.mjs';
const runtime=async()=>(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('all 23 comparison routes reissue input graphs and exact slot identities in a fresh runtime',async()=>{
 const r=await runtime(),fresh=await runtime();
 const noun=(stem='cal',state='absolutive')=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:stem==='cal'?'tli-1':'zero'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{state,subject:'3common',possessor:state==='possessive'?'3sg':''})]}).canonicalResult;};
 const base=noun(),quality=noun('chicāhuac');
 const vnc=(stem,kind='intransitive')=>r.requestClassicalVncApplicationResult({sourceStem:stem,verbClass:stem==='ihui'?'B':'A',sourceInitialISelection:'real',sourceValence:kind,objectKind:kind==='intransitive'?'':kind,objectPerson:'3common',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const ihui=vnc('ihui'),unspecified=vnc('cempanahuia','projective-nonhuman'),specified=vnc('panahuia','specific-projective');
 const src=x=>r.buildClassicalComparisonSourceUnit({sourceResult:x});
 const imperfect=r.resolveClassicalNahuatlImperfectiveVncSourceFrame({enteredStem:'nēnehuilia',valence:'specific-projective'});
 const rb=r.issueClassicalGrammarTypedSourceOperationBindingFrame(r.getClassicalGrammarApplicationCapabilityNavigator(imperfect),'vnc:application',{subject:'1sg',subjectAnimacy:'animate',subjectHumanness:'human',objectSelection:'specific-projective:3common',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const resemblance=r.executeClassicalGrammarTypedSourceOperationBindingFrame(rb).canonicalResult;
 const child=r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[{routeId:'similarity-iuhqui-principal',slots:{adjoined:src(quality)},choices:{icRelation:false,sentenceType:'none'}}]}).canonicalResult;
 const failures=[];
 for(const route of r.getClassicalComparisonRouteInventory()){
  const slots=Object.fromEntries(route.requiredSlots.map(k=>[k,src(base)]));let choices={sentenceType:'none'};
  if(route.id==='similarity-reduplicative-prefix')choices.continuationFamily='absolutive-li';
  if(route.id==='similarity-downgraded-possessive-tla'){slots.source=src(base);choices={};}
  if(route.id==='similarity-ihui-vnc')slots.principal=src(ihui);
  if(route.id==='similarity-resemblance-verbstem-nnc')slots.principal=src(resemblance);
  if(route.id==='similarity-iuhqui-larger-concatenate')slots.similarityClause=src(child);
  if(route.id==='comparative-panahuia-unspecified')slots.principal=src(unspecified);
  if(route.id==='comparative-panahuia-specified')slots.principal=src(specified);
  const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[{routeId:route.id,slots,choices}]});
  if(receipt.authorizationStatus!=='authorized'){failures.push([route.id,'fixture',receipt.blockReason]);continue;}
  const result=receipt.canonicalResult,parents=Object.fromEntries(Object.entries(result.operationFrame.sourceSlots).map(([k,s])=>[k,r.getClassicalComparisonCanonicalSourceResult(s)]));
  const recipe=save(r,{result,...parents});if(!recipe){failures.push([route.id,'export']);continue;}
  const roots=replay(fresh,JSON.parse(JSON.stringify(recipe)));if(!roots){failures.push([route.id,'replay']);continue;}
  assert.equal(roots.result.surface,result.surface,route.id);
  for(const key of Object.keys(parents))assert.equal(fresh.getClassicalComparisonCanonicalSourceResult(roots.result.operationFrame.sourceSlots[key]),roots[key],`${route.id}:${key}`);
 }
 assert.deepEqual(failures,[]);
});
