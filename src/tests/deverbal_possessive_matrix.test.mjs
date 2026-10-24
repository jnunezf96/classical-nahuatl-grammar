import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, writeFileSync} from 'node:fs';
import {createPossessiveFixture,domains} from './helpers/deverbal_possessive_fixture.mjs';
const nonce=JSON.parse(readFileSync(new URL('./fixtures/nonce_deverbal_possessive_20261024.json',import.meta.url)));
const rows=[];
const finite=p=>/^[123](?:sg|pl)$/.test(p);
const sourceDerived=new Set(['instrumentive','passive-action','active-action']);
const stateRestricted=new Set(['customary-agentive-reanalysis','customary-patientive','present-agentive']);

test('every native nominalization and possessor agrees across request, owner, preview and Make',async()=>{
 const h=await createPossessiveFixture(nonce.verb);
 for(const {value:kind} of domains.nominalizations)for(const number of ['singular','plural']){
  h.set('classical-deverbal-nnc-family','predicate-nominalization');h.set('classical-deverbal-nnc-nominalization-kind',kind);
  h.set('classical-rule-logic-nnc-subject-number',number);
  h.set('classical-deverbal-nnc-action-reference',kind==='active-action'&&number==='plural'?'human-metaphor':'action');
  const valence=['preterit-patientive','customary-patientive','passive-action'].includes(kind)?'specific-projective':kind==='active-action'?'intransitive':'projective-nonhuman';
  h.set('classical-rule-logic-valence',valence);
  const options=h.r.getClassicalNahuatlNonactiveStemOptions(nonce.verb,{verbClass:'B',sourceValence:valence});
  h.set('classical-rule-logic-nonactive-family',(options.options.find(o=>o.suffixFamily==='ō')||options.options[0])?.optionId||'');
  for(const {value:possessor} of domains.possessors){
   h.set('classical-rule-logic-nnc-possessor',possessor);
   const label=`${kind}/${number}/${possessor}`;
   const request=h.r.buildClassicalNominalConstructionUiRequest();
   const result=h.r.evaluateClassicalNahuatlDeverbalNnc(request);
   const app={operationId:'nnc:deverbal-construction',args:[request]};
   const preview=h.r.previewClassicalGrammarApplicationRequest(app);
   const expected=!stateRestricted.has(kind)&&(!sourceDerived.has(kind)||finite(possessor));
   const row={kind,number,possessor,valence,status:result.authorizationStatus,reason:result.blockReason,surface:result.wordSurface||'',actual:{subject:result.canonicalResult?.subject,possessor:result.canonicalResult?.possessor},classification:expected?'supported':stateRestricted.has(kind)?kind==='customary-agentive-reanalysis'?'lexically-qualified-possession':'productive-state-restriction':'finite-source-participant-required'};
   rows.push(row);
   assert.equal(result.authorizationStatus,expected?'authorized':'blocked',`${label}: ${result.blockReason}`);
   assert.equal(h.r.isClassicalGrammarApplicationPreview(preview),expected,label+' preview');
   if(!expected){let refused;try{refused=h.r.executeClassicalGrammarApplicationRequest(app);}catch(error){assert.match(error.message,/classical-grammar-application-request-invalid/);}
    if(refused)assert.equal(refused.authorizationStatus,'blocked',label+' execution');continue;}
   assert.equal(result.canonicalResult.state,'possessive',label);
   assert.equal(result.canonicalResult.possessor,possessor,label+' must not silently become another possessor');
   const fixedCommon=kind==='instrumentive'||kind==='passive-action'||kind==='active-action'&&number==='singular';
   assert.equal(result.canonicalResult.subject,fixedCommon?'3common':number==='plural'?'3pl':'3sg',label+' possessum number');
   if(sourceDerived.has(kind))assert.equal(result.operationFrame.transformedPossessor,possessor,label+' Source participant');
   const made=h.r.executeClassicalGrammarApplicationRequest(app);
   assert.equal(made.authorizationStatus,'authorized',label+' Make');
   assert.equal(made.canonicalResult.wordSurface,result.wordSurface,label+' preview/Make surface');
  }
 }
 assert.equal(rows.length,domains.nominalizations.length*domains.possessors.length*2);
 if(process.env.CLASSICAL_POSSESSIVE_MATRIX_OUTPUT)writeFileSync(process.env.CLASSICAL_POSSESSIVE_MATRIX_OUTPUT,JSON.stringify({source:nonce.verb,rows},null,2)+'\n');
});

test('Andrews rare possessed reanalysis keeps its own number paradigm and all nominal possessors',async()=>{
 // This is a lexical contrast (§36.2), not a licence fabricated for a nonce.
 const h=await createPossessiveFixture('yāō-chīhua'),contrasts=[];
 h.set('classical-rule-logic-class','A');h.set('classical-rule-logic-valence','projective-human');
 h.set('classical-deverbal-nnc-family','predicate-nominalization');h.set('classical-deverbal-nnc-nominalization-kind','customary-agentive-reanalysis');
 for(const number of ['singular','plural'])for(const {value:possessor}of domains.possessors){
  h.set('classical-rule-logic-nnc-subject-number',number);h.set('classical-rule-logic-nnc-possessor',possessor);
  const request=h.r.buildClassicalNominalConstructionUiRequest(),result=h.r.evaluateClassicalNahuatlDeverbalNnc(request),app={operationId:'nnc:deverbal-construction',args:[request]};
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);assert.equal(result.canonicalResult.possessor,possessor);
  assert.equal(result.canonicalResult.subject,number==='plural'?'3pl':'3sg');
  assert.equal(h.r.isClassicalGrammarApplicationPreview(h.r.previewClassicalGrammarApplicationRequest(app)),true);
  assert.equal(h.r.executeClassicalGrammarApplicationRequest(app).canonicalResult.wordSurface,result.wordSurface);
  const full=h.r.evaluateClassicalNahuatlDeverbalNnc({...request,nominalizationKind:'customary-agentive-full'});
  assert.equal(full.authorizationStatus,'authorized',full.blockReason);assert.notEqual(full.wordSurface,result.wordSurface,'rare VNC-associated number is not the fully nominal ending');
  contrasts.push({number,possessor,surface:result.wordSurface,fullyNominal:full.wordSurface});
 }
 if(process.env.CLASSICAL_POSSESSIVE_MATRIX_OUTPUT)writeFileSync(process.env.CLASSICAL_POSSESSIVE_MATRIX_OUTPUT.replace(/\.json$/,'-rare-contrast.json'),JSON.stringify(contrasts,null,2)+'\n');
});
