import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createPossessiveFixture, domains} from './helpers/deverbal_possessive_fixture.mjs';
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as load} from '../application/classical/result_reload.mjs';
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_deverbal_reload_20261024.json',import.meta.url)));
const h=await createPossessiveFixture(f.verbs[0]),r=h.r;
const fresh=async()=>(await createPossessiveFixture(f.verbs[1])).r;
const make=(r,q)=>{const a=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[q]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;};
function native(kind,state='absolutive',possessor='2sg'){
 for(const[id,v]of Object.entries(h.defaults))h.set(id,v);
 for(const[id,v]of Object.entries({'classical-deverbal-nnc-family':'predicate-nominalization','classical-deverbal-nnc-nominalization-kind':kind,'classical-rule-logic-nnc-state':state,'classical-rule-logic-nnc-possessor':possessor}))h.set(id,v);
 const valence=['preterit-patientive','customary-patientive','passive-action'].includes(kind)?'specific-projective':kind==='active-action'?'intransitive':'projective-nonhuman';h.set('classical-rule-logic-valence',valence);
 const opts=r.getClassicalNahuatlNonactiveStemOptions(f.verbs[0],{verbClass:'B',sourceValence:valence});h.set('classical-rule-logic-nonactive-family',(opts.options.find(o=>o.suffixFamily==='ō')||opts.options[0])?.optionId||'');
 return r.buildClassicalNominalConstructionUiRequest();
}
async function roundtrip(result,roots={}){const recipe=save(r,{result,...roots});assert(recipe,'deverbal owner input graph must export');const next=await fresh(),loaded=load(next,JSON.parse(JSON.stringify(recipe)));assert(loaded,'owner inputs must replay in a fresh runtime');assert.equal(loaded.result.wordSurface,result.wordSurface);return{next,recipe,...loaded};}

test('all native predicate nominalizations reissue their genuine Sources without a displayed-stem substitute',async()=>{
 for(const {value:kind}of domains.nominalizations){const q=native(kind),made=make(r,q),loaded=await roundtrip(made,{finite:q.canonicalVncResult});
  assert.equal(loaded.result.sourceFrame.canonicalVncResult,loaded.finite,kind+' shared finite parent');
  assert.equal(loaded.result.operationFrame.nominalizationKind,kind);assert.notEqual(loaded.result,made);}
});
test('instrumentive companions and selected possession retain exact shared Source identity on reload',async()=>{
 const q=native('instrumentive','possessive','1pl'),made=make(r,q),loaded=await roundtrip(made,{finite:q.canonicalVncResult,absolutive:q.canonicalInstrumentiveAbsolutiveVncResult,possessive:q.canonicalInstrumentivePossessiveVncResult});
 const inputs=loaded.next.getClassicalNahuatlDeverbalNncReloadInputs(loaded.result);assert(inputs.canonicalVncResult===loaded.finite);assert(inputs.canonicalInstrumentiveAbsolutiveVncResult===loaded.absolutive);assert(inputs.canonicalInstrumentivePossessiveVncResult===loaded.possessive);assert.equal(loaded.result.canonicalResult.possessor,'1pl');
});
test('primitive Core action possession and characteristic classified Source restore without flattening',async()=>{
 native('active-action','possessive','nonspecific-human');h.set('classical-deverbal-nnc-family','deverbal-action');const action=make(r,r.buildClassicalNominalConstructionUiRequest());const a=await roundtrip(action);assert.equal(a.result.canonicalResult.possessor,'nonspecific-human');
 h.set('classical-deverbal-nnc-family','patientive');h.set('classical-deverbal-nnc-patientive-family','characteristic-property');h.set('classical-source-whole',f.nouns[0]);h.set('classical-rule-logic-nnc-subject-number','plural');const q=r.buildClassicalNominalConstructionUiRequest(),c=await roundtrip(make(r,q));assert.equal(c.result.canonicalResult.subject,'3pl');assert.equal(c.result.canonicalResult.possessor,'nonspecific-human');
});
test('exact patientive parent remains shared across an NNC continuation and further reload',async()=>{
 native('preterit-patientive');const opts=r.getClassicalNahuatlNonactiveStemOptions(f.verbs[0],{verbClass:'B',sourceValence:'specific-projective'}),option=opts.options.find(o=>o.suffixFamily==='lō');
 const finite=r.evaluateClassicalNahuatlVncApplication({sourceStem:f.verbs[0],verbClass:'B',sourceValence:'specific-projective',subject:'3sg',objectKind:'specific-projective',objectPerson:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'passive',nonactiveOptionId:option.optionId});assert.equal(finite.authorizationStatus,'authorized',finite.blockReason);
 const parent=make(r,{constructionKind:'patientive',patientiveSourceFamily:'passive-core',canonicalVncResult:finite.resultFrame,subject:'3common',state:'absolutive',animacy:'nonanimate'});
 const binding={operationId:'nnc:deverbal-construction',exactResult:parent,ownerBindingFrame:r.issueClassicalNahuatlFormationResultBindingFrame('nnc:deverbal-construction',parent),selectedBindingId:'continuation:patientive-nnc'};
 h.set('classical-deverbal-nnc-family','patientive-matrix-continuation');h.set('classical-deverbal-nnc-patientive-matrix-embed-stem',f.nouns[1]);h.set('classical-deverbal-nnc-patientive-matrix-embed-class','tl-1-a');h.set('classical-deverbal-nnc-patientive-matrix-relation','purpose');h.set('classical-rule-logic-nnc-state','possessive');h.set('classical-rule-logic-nnc-possessor','reciprocal');
 const made=make(r,r.buildClassicalNominalConstructionUiRequest(binding)),loaded=await roundtrip(made,{parent});
 const inputs=loaded.next.getClassicalNahuatlDeverbalNncReloadInputs(loaded.result);assert.equal(inputs.canonicalPatientiveNncGrammarFrame||inputs.canonicalPatientiveNncResult,loaded.parent);assert.equal(loaded.result.canonicalResult.operationFrame.possessor,'reciprocal');
 const again=save(loaded.next,{result:loaded.result,parent:loaded.parent});assert(again);assert(load(await fresh(),JSON.parse(JSON.stringify(again))));
});
test('copied Results and forged frame/authority/forward-edge reload data reject',async()=>{
 const q=native('future-agentive','possessive'),made=make(r,q);assert.equal(save(r,{result:{...made}}),null);const recipe=save(r,{result:made});assert(recipe);
 for(const mutate of [n=>n.request.surface='forged',n=>n.request.canonicalVncResult={...q.canonicalVncResult},n=>n.request.canonicalVncResult={resultRef:999}]){const copy=JSON.parse(JSON.stringify(recipe));mutate(copy.nodes.find(n=>n.type==='deverbal:nnc'));assert.equal(load(await fresh(),copy),null);}
});

function noun(stem,sourceClass,selections){const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass}),operation=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{predicateFormation:'source-stem',stemFormation:'plain',sentenceType:'statement',polarity:'positive',humanness:'human',...selections});const result=r.evaluateClassicalNahuatlOrdinaryNnc(source,operation);assert.equal(result.authorizationStatus,'authorized',result.blockReason);return result;}
test('two-nucleus replay keeps the exact inner clauses and their issued relation shared',async()=>{
 const principal=noun(f.nouns[0],'tl-1-a',{subject:'1pl',state:'possessive',possessor:'2pl'}),supplement=noun(f.nouns[1],'tl-1-a',{subject:'2pl',state:'absolutive',pluralConnector:'m-eh'});
 const request={constructionKind:'double-nucleus-ownerhood',source:{principalNncResult:principal,supplementNncResult:supplement,supplementationAnalysis:'fixed-order-possessor-supplementation'},subject:'1sg',state:'absolutive',animacy:'animate'};
 const made=make(r,request),relation=made.sourceFrame.canonicalSupplementationResult,loaded=await roundtrip(made,{principal,supplement,relation});
 assert.equal(loaded.result.sourceFrame.principalNncResult,loaded.principal);assert.equal(loaded.result.sourceFrame.supplementNncResult,loaded.supplement);assert.equal(loaded.result.sourceFrame.canonicalSupplementationResult,loaded.relation);
 const again=save(loaded.next,{result:loaded.result,principal:loaded.principal,supplement:loaded.supplement,relation:loaded.relation});assert(again);const second=load(await fresh(),JSON.parse(JSON.stringify(again)));assert(second);assert.equal(second.result.sourceFrame.principalNncResult,second.principal);assert.equal(second.result.wordSurface,made.wordSurface);
});

test('accepted reload inputs copy shallow-frozen caller containers while retaining genuine operand identity',()=>{
 const source={sourceStem:f.verbs[0],sourceStage:'future-core',verbClass:'B',sourceVoice:'active',sourceValence:'intransitive',sourceObjectPattern:'none',sourceSubject:'2sg'};
 const request=Object.freeze({constructionKind:'deverbal-action',actionKind:'active-action',actionSuffix:'liz',source,subject:'3common',state:'possessive',possessor:'2sg',animacy:'nonanimate'});
 const made=make(r,request),before=JSON.stringify(save(r,{result:made}));source.sourceStem=f.verbs[1];
 assert.equal(r.getClassicalNahuatlDeverbalNncReloadInputs(made).source.sourceStem,f.verbs[0]);assert.equal(JSON.stringify(save(r,{result:made})),before);
 const q=native('future-agentive','possessive'),nominal=make(r,Object.freeze({...q}));assert.equal(r.getClassicalNahuatlDeverbalNncReloadInputs(nominal).canonicalVncResult,q.canonicalVncResult);
});

test('a whole conjunction keeps its deverbal constituent and the shared Source after reload',async()=>{
 const inner=make(r,native('preterit-agentive','possessive','1sg')),right=noun(f.nouns[3],'tl-1-a',{subject:'3sg',state:'absolutive'});
 const app=r.executeClassicalGrammarApplicationRequest({operationId:'clause:composition',args:[{operationKind:'conjunction',conjuncts:[inner,right].map((value,i)=>r.buildClassicalNahuatlClauseCompositionSourceFrame(value,{referenceId:`deverbal-conj-${i}`})),options:{relation:'marked',coordinationType:'additive',level:'principal',polarity:'positive',rightwardModifier:'oc',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',leftContextAbsent:false,adjoinedFunction:'none',identicalAdjoinedClauseEllipsis:'none',boundaryPunctuation:'comma'}}]});
 assert.equal(app.authorizationStatus,'authorized',app.blockReason);const whole=app.canonicalResult,recipe=save(r,{result:whole,inner});assert(recipe);const next=await fresh(),loaded=load(next,JSON.parse(JSON.stringify(recipe)));assert(loaded);assert.equal(loaded.result.surfaceRealization,whole.surfaceRealization);assert.equal(next.getClassicalNahuatlSupplementationClauseSourceFrame(loaded.result.conjuncts[0].envelope),loaded.inner);assert.equal(loaded.result.conjuncts.length,2);
 const inputs=next.getClassicalNahuatlDeverbalNncReloadInputs(loaded.inner),changed=next.executeClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[{...inputs,possessor:'3pl'}]}).canonicalResult;
 const replacement=next.buildClassicalNahuatlConjunctReplacementRequest(loaded.result,0,changed),made=next.executeClassicalGrammarApplicationRequest({operationId:'clause:composition',args:[replacement]});assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(made.canonicalResult.conjuncts.length,2);assert.equal(next.getClassicalNahuatlSupplementationClauseSourceFrame(made.canonicalResult.conjuncts[1].envelope),next.getClassicalNahuatlSupplementationClauseSourceFrame(loaded.result.conjuncts[1].envelope));
 const again=save(next,{result:made.canonicalResult,inner:changed});assert(again);assert(load(await fresh(),JSON.parse(JSON.stringify(again))));
});
