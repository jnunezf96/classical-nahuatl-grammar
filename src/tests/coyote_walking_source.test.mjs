import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'coyō',sourceClass:'tl'});
const noun=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive',humanness:'nonhuman'})]}).canonicalResult;
const make=(n,family='oyotl-nehnemi',shape='short-cv')=>r.requestClassicalComparisonResult({routeId:'similarity-reduplicative-prefix',slots:{source:r.buildClassicalComparisonSourceUnit({sourceResult:n})},choices:{continuationFamily:family,reduplicationShape:shape}});
test('Andrews53.1.1 coyō has its exact walking use without an invented general paradigm',()=>{
 const out=make(noun);assert.equal(out.authorizationStatus,'authorized',out.blockReason);assert.equal(out.surface,'cocoyōnehnemi');
 assert.equal(r.getClassicalComparisonCanonicalSourceResult(out.operationFrame.sourceSlots.source),noun);
 assert.equal(source.restrictedUseOnly,true);assert.equal(source.generalUseShapeClaimed,false);
 assert.equal(source.attestedPredicateEmbedUse.sourceSection,'53.1.1');
 assert.equal(make({...noun}).authorizationStatus,'blocked');
 assert.equal(make(noun,'cihuatl-tlahtoa').authorizationStatus,'blocked');
 assert.equal(make(noun,'oyotl-nehnemi','long-cv').authorizationStatus,'blocked');
 const possessive=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'possessive',possessor:'1sg',humanness:'nonhuman'});
 assert.equal(possessive.authorizationStatus,'blocked');
});

test('direct nominal execution cannot bypass contextual reduplication requirements',()=>{
 const matrix=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:'neh-nemi',verbClass:'B',sourceValence:'intransitive',sourceSubject:'3sg',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]}).canonicalResult.resultFrame;
 const request={constructionKind:'nominal-embed-vnc',source:{embedStem:'coyō',embedClass:'tl',embedConstituent:{kind:'ordinary-nnc-predicate',stem:'coyō',resultFrame:noun},matrixStem:'neh-nemi',matrixVerbClass:'B',matrixValence:'intransitive',matrixConstituent:{kind:'vnc-result',stem:'neh-nemi',resultFrame:matrix}},relation:'adverb',route:'direct-adverb',adverbRole:'compared-manner',orientation:'subject',subject:'3sg',mood:'indicative',tense:'present',voice:'active'};
 assert.equal(r.evaluateClassicalNahuatlNominalConstruction(request).authorizationStatus,'blocked');
 assert.equal(r.evaluateClassicalNahuatlNominalConstruction({...request,embedReduplication:'similarity'}).authorizationStatus,'blocked');
 assert.equal(r.evaluateClassicalNahuatlNominalConstruction({...request,embedReduplication:'similarity',similarityReduplicationShape:'short-cv'}).authorizationStatus,'authorized');
});
