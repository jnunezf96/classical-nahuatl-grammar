import test from'node:test';import assert from'node:assert/strict';import{createPossessiveFixture}from'./helpers/deverbal_possessive_fixture.mjs';
test('actual collector ignores inactive nominal fields on a derived active-action request',async()=>{
 const h=await createPossessiveFixture('cochi');h.controls.set('classical-basal-unit-controls',{dataset:{classicalBasalUnit:'vnc'}});
 for(const[id,v]of Object.entries({'classical-deverbal-nnc-family':'deverbal-action','classical-deverbal-nnc-action-suffix':'liz','classical-rule-logic-valence':'intransitive','classical-rule-logic-nnc-state':'absolutive','classical-rule-logic-nnc-subject-number':'common','classical-rule-logic-nnc-subject-animacy':'nonanimate','classical-deverbal-nnc-preterit-agentive-variant':'elder','classical-deverbal-nnc-number-connector':'silent','classical-deverbal-nnc-patientive-analogy':'passive','classical-personal-name-affective-scope':'inner-source'}))h.set(id,v);
 const q=h.r.buildClassicalNominalConstructionUiRequest();
 for(const key of ['preteritAgentiveVariant','numberConnector','patientiveAnalogy','affectiveScope'])assert.equal(q[key],undefined,key);
 const made=h.r.evaluateClassicalNahuatlDeverbalNnc(q);assert.equal(made.authorizationStatus,'authorized');assert.equal(made.wordSurface,'cochiliztli');
 assert.equal(h.controls.get('classical-deverbal-nnc-number-connector').value,'silent');
});
test('patientive analogy consumes exact active Source and excludes incompatible or copied parents',async()=>{
 const{r}=await createPossessiveFixture('');
 const make=transitive=>r.evaluateClassicalNahuatlVncApplication({sourceStem:transitive?'toca':'cuica',verbClass:'A',sourceValence:transitive?'projective-nonhuman':'intransitive',objectKind:transitive?'nonspecific-nonhuman':'none',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active'}).resultFrame;
 const parent=make(true),request={constructionKind:'patientive',patientiveSourceFamily:'imperfective-active-core',patientiveAnalogy:'passive',canonicalVncResult:parent,subject:'3sg',state:'absolutive',animacy:'animate'};
 const made=r.evaluateClassicalNahuatlDeverbalNnc(request);assert.equal(made.authorizationStatus,'authorized');assert.equal(made.wordSurface,'tocatl');assert.equal(made.operationFrame.imperfectivePatientiveFrame.canonicalActivePresentVncResult===parent,true);
 assert.equal(r.evaluateClassicalNahuatlDeverbalNnc({...request,canonicalVncResult:make(false)}).blockReason,'39.2.1-passive-analogy-requires-transitive-source');
 assert.equal(r.evaluateClassicalNahuatlDeverbalNnc({...request,canonicalVncResult:{...parent}}).authorizationStatus,'blocked');
});
