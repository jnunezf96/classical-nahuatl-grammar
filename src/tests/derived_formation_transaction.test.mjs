import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {createDerivedFormationScope,issueDerivedFormationSnapshot,projectDerivedFormationExecution,captureDerivedFormationChoiceFrame,isCurrentDerivedFormationSnapshot} from '../ui/composition/derived_formation_transaction.mjs';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function fixture(){const source=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});assert.equal(source.authorizationStatus,'authorized');const request={constructionKind:'predicate-nominalization',nominalizationKind:'present-agentive',canonicalVncResult:source,subject:'3sg',state:'absolutive',animacy:'animate'};const binding=owner.issueClassicalNahuatlFormationResultBindingFrame('nnc:deverbal-construction',source,{state:'absolutive',subject:'3sg'});return {source,request,binding};}
test('deverbal exact owner request owns preview and execution, copied or misplaced parent rejected',()=>{
 const f=fixture(),ingress={},session=createConstructionSession({isSource:x=>x===f.source}),scope=createDerivedFormationScope({owner,source:f.source,operation:'nnc:deverbal-construction',session,getIngress:()=>ingress});
 const input={ingress,binding:f.binding,request:f.request,selectedBindingId:'predicate-nominalization:present-agentive'};
 const s=issueDerivedFormationSnapshot(scope,input);assert.ok(s?.contract.ready,s?.contract.blockReason);const p=projectDerivedFormationExecution(s);assert.equal(p.request.args[0],s.contract.request);assert.equal(s.contract.preview.sourceFrame.canonicalVncResult,f.source);
 assert.equal(issueDerivedFormationSnapshot(scope,{...input,request:{...f.request}}),s,'unchanged reconciled request must reuse snapshot');
 assert.ok(issueDerivedFormationSnapshot(scope,{...input,selectedBindingId:'patientive:imperfective-source'})===null,'an imperfective patientive binding cannot certify a predicate nominalization');
 f.request.subject='2sg';assert.equal(s.contract.request.subject,'3sg');
 assert.equal(issueDerivedFormationSnapshot(scope,{...input,binding:{...f.binding}}),null);
 assert.equal(issueDerivedFormationSnapshot(scope,{...input,request:{...f.request,canonicalVncResult:{...f.source},ignored:f.source}}),null);
 session.stage({source:f.source,route:{operation:'nnc:deverbal-construction'},slots:s.captures,operationContract:s,execution:p,ready:true});const e=captureDerivedFormationChoiceFrame(s);assert.ok(e);assert.equal(isCurrentDerivedFormationSnapshot(s,{...e}),false);
});
test('raw deverbal request requires current committed context and cannot execute after departure',()=>{
 const f=fixture(),ingress={},session=createConstructionSession({isSource:x=>x===f.source});let context=Object.freeze({source:f.source,ingress,committed:true});const scope=createDerivedFormationScope({owner,source:f.source,operation:'nnc:deverbal-construction',session,getIngress:()=>ingress,getSourceContext:()=>context});
 assert.equal(issueDerivedFormationSnapshot(scope,{ingress,request:f.request}),null);
 const s=issueDerivedFormationSnapshot(scope,{ingress,request:f.request,sourceContext:context});assert.ok(s.contract.ready);assert.ok(projectDerivedFormationExecution(s));context={...context};assert.equal(projectDerivedFormationExecution(s),null);
});
test('adverbial snapshot executes only the immutable request evaluated against authentic potential and context',()=>{
 const potential=owner.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:'iz'});assert.equal(owner.isClassicalNahuatlAdverbialPotentialFrame(potential),true);
 const source=potential.lexicalVncSourceFrame,ingress={},session=createConstructionSession({isSource:x=>x===source});assert.ok(source);
 const context=Object.freeze({source,ingress,committed:true}),scope=createDerivedFormationScope({owner,source,operation:'nnc:adverbial',session,getIngress:()=>ingress,getSourceContext:()=>context});
 const request={adverbialPotentialFrame:potential,degree:'first-degree',scope:'external-clause',context:{sentencePosition:'initial',clauseType:'assertion'}};
 const s=issueDerivedFormationSnapshot(scope,{ingress,sourceContext:context,request});assert.ok(s?.contract.ready,s?.contract.blockReason);assert.equal(s.contract.preview.adverbialPotentialFrame,potential);assert.equal(projectDerivedFormationExecution(s).request.args[0],s.contract.request);request.context.clauseType='interrogative';assert.equal(s.contract.request.context.clauseType,'assertion');
 const copied=issueDerivedFormationSnapshot(scope,{ingress,sourceContext:context,request:{...request,adverbialPotentialFrame:{...potential}}});assert.ok(!copied||!copied.contract.ready);
 const incompatible=issueDerivedFormationSnapshot(scope,{ingress,sourceContext:context,request:{...request,degree:'invented-degree'}});assert.ok(!incompatible||!incompatible.contract.ready);
});
test('relational exact continuation retains upstream identity in owner-constituted execution Source',()=>{
 const nounSource=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'ā',sourceClass:'tl-1-a'}),nounOperation=owner.buildClassicalNahuatlOrdinaryNncOperationFrame(nounSource,{state:'absolutive',subject:'3common',predicateFormation:'source-stem'}),source=owner.requestClassicalOrdinaryNncResult(nounSource,nounOperation);assert.equal(source.authorizationStatus,'authorized');
 const binding=owner.issueClassicalNahuatlFormationResultBindingFrame('nnc:relational',source,{state:'absolutive',subject:'3common'}),ingress={},session=createConstructionSession({isSource:x=>x===source}),scope=createDerivedFormationScope({owner,source,operation:'nnc:relational',session,getIngress:()=>ingress});
 const request={state:'absolutive',subjectMode:'adverbialized',subjectId:'3common',nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'ca-means',operation:'relational-nnc',formation:'option-three',sourceFormation:'ordinary-nnc-general-use',sourceKind:'nounstem',sourceMode:'embed-matrix',sourceMatrixStem:'ca',upstreamResult:source}};
 const input={ingress,binding,request,selectedBindingId:'relational-source:ordinary-nnc-general-use:ca-means'},s=issueDerivedFormationSnapshot(scope,input);assert.ok(s?.contract.ready,s?.contract.blockReason);assert.equal(s.contract.preview.sourceFrame.upstreamSourceCarrier.ownerResult,source);assert.equal(projectDerivedFormationExecution(s).request.args[0],s.contract.request);
 assert.equal(issueDerivedFormationSnapshot(scope,{...input,request:{...request,nounstem:{...request.nounstem,upstreamResult:{...source},ignored:source}}}),null);
 assert.ok(issueDerivedFormationSnapshot(scope,{...input,request:{...request,nounstem:{...request.nounstem,operation:'associated-entity'}}})===null,'selected relational role cannot certify a different executed operation');
});
test('instrumentive completion uses owner-paired named inputs and missing companion stays blocked',()=>{
 const base={sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative'};
 const source=owner.requestClassicalVncApplicationResult({...base,tense:'customary-present',requestedVoice:'impersonal',nonactiveOptionId:'ō:coch-ō'}),companion=owner.requestClassicalVncApplicationResult({...base,tense:'imperfect',requestedVoice:'active'});
 assert.equal(source.authorizationStatus,'authorized');assert.equal(companion.authorizationStatus,'authorized');
 const binding=owner.issueClassicalNahuatlFormationResultBindingFrame('nnc:deverbal-construction',source,{state:'absolutive',subject:'3common'}),ingress={},session=createConstructionSession({isSource:x=>x===source||x===companion}),scope=createDerivedFormationScope({owner,source,operation:'nnc:deverbal-construction',session,getIngress:()=>ingress});
 const request={constructionKind:'predicate-nominalization',nominalizationKind:'instrumentive',canonicalVncResult:source,canonicalInstrumentiveAbsolutiveVncResult:source,canonicalInstrumentivePossessiveVncResult:companion,subject:'3common',state:'absolutive',possessor:'3sg',animacy:'nonanimate'};
 const input={ingress,binding,request,selectedBindingId:'predicate-nominalization:instrumentive',additionalResults:{'instrumentive-companion-vnc':companion}};
 const s=issueDerivedFormationSnapshot(scope,input);assert.ok(s?.contract.ready,s?.contract.blockReason);assert.ok(s.captures.some(c=>c.exact===companion));assert.equal(s.contract.preview.operationFrame.instrumentiveSourcePairFrame.imperfectActive.canonicalVncResult,companion);
 assert.ok(!issueDerivedFormationSnapshot(scope,{...input,additionalResults:{}})?.contract.ready);
 assert.ok(!issueDerivedFormationSnapshot(scope,{...input,additionalResults:{'instrumentive-companion-vnc':{...companion}}})?.contract.ready);
 assert.ok(!issueDerivedFormationSnapshot(scope,{...input,request:{...request,canonicalInstrumentivePossessiveVncResult:source,ignored:companion}})?.contract.ready);
});
test('both patientive continuation roles project their exact owner parent and reject a copied request parent',async()=>{
 const {createPossessiveFixture}=await import('./helpers/deverbal_possessive_fixture.mjs');const h=await createPossessiveFixture('pōpītāpōmōza'),o=h.r;
 const option=o.getClassicalNahuatlNonactiveStemOptions('pōpītāpōmōza',{verbClass:'B',sourceValence:'specific-projective'}).options.find(x=>x.suffixFamily==='lō');assert.ok(option);
 const v=o.evaluateClassicalNahuatlVncApplication({sourceStem:'pōpītāpōmōza',verbClass:'B',sourceValence:'specific-projective',subject:'3sg',objectKind:'specific-projective',objectPerson:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'passive',nonactiveOptionId:option.optionId});
 const source=o.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'patientive',patientiveSourceFamily:'passive-core',canonicalVncResult:v.resultFrame,subject:'3common',state:'absolutive',animacy:'nonanimate'});assert.equal(source.authorizationStatus,'authorized');
 const binding=o.issueClassicalNahuatlFormationResultBindingFrame('nnc:deverbal-construction',source),ingress={},session=createConstructionSession({isSource:x=>x===source}),scope=createDerivedFormationScope({owner:o,source,operation:'nnc:deverbal-construction',session,getIngress:()=>ingress});
 for(const route of ['patientive-embed-continuation','patientive-matrix-continuation']){
  h.set('classical-deverbal-nnc-family',route);
  if(route==='patientive-embed-continuation')for(const [id,value]of Object.entries({'target':'nnc','matrix-stem':'cuētēxōzīpōhua','matrix-noun-class':'tl-1-a','relation':'material'}))h.set(`classical-deverbal-nnc-patientive-embed-${id}`,value);
  else for(const [id,value]of Object.entries({'embed-stem':'cuētēxōzīpōhua','embed-class':'tl-1-a','relation':'purpose'}))h.set(`classical-deverbal-nnc-patientive-matrix-${id}`,value);
  const request=o.buildClassicalNominalConstructionUiRequest({operationId:'nnc:deverbal-construction',exactResult:source,ownerBindingFrame:binding,selectedBindingId:'continuation:patientive-nnc'}),input={ingress,binding,request,selectedBindingId:'continuation:patientive-nnc'};
  const s=issueDerivedFormationSnapshot(scope,input);assert.ok(s?.contract.ready,`${route}: ${s?.contract.blockReason}`);assert.equal(projectDerivedFormationExecution(s).request.args[0].canonicalPatientiveNncGrammarFrame,source);
  assert.equal(issueDerivedFormationSnapshot(scope,{...input,request:{...request,canonicalPatientiveNncGrammarFrame:{...source}}}),null);
 }
});
test('action continuations keep the accepted action parent through both execution requests',()=>{
 const future=owner.requestClassicalVncApplicationResult({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'future',requestedVoice:'active'}),source=owner.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'deverbal-action',actionKind:'active-action',actionSuffix:'liz',actionStemVariant:'ca-to-qui',canonicalVncResult:future,state:'absolutive',subject:'3common',animacy:'nonanimate'});assert.equal(source.authorizationStatus,'authorized');
 const binding=owner.issueClassicalNahuatlFormationResultBindingFrame('nnc:deverbal-construction',source),ingress={},session=createConstructionSession({isSource:x=>x===source}),scope=createDerivedFormationScope({owner,source,operation:'nnc:deverbal-construction',session,getIngress:()=>ingress});
 for(const request of [{constructionKind:'nominal-continuation',source:{matrixStem:'cal',matrixClass:'tl',matrixSourceClass:'tl-1-a'},subject:'3sg',state:'absolutive'},{constructionKind:'verbal-continuation',source:{matrixStem:'tzahtzi',matrixVerbClass:'A',matrixValence:'intransitive',embedClass:'tli',sourceState:'absolutive'},relation:'adverb',adverbRole:'manner',subject:'3sg',mood:'indicative',tense:'present'}]){
  request.canonicalNncResult=source;const input={ingress,binding,request,selectedBindingId:'continuation:action-nnc'},s=issueDerivedFormationSnapshot(scope,input);assert.ok(s?.contract.ready,`${request.constructionKind}: ${s?.contract.blockReason}`);assert.equal(s.contract.preview.operationFrame.actionNncContinuationFrame.canonicalActionNncResult,source);assert.equal(projectDerivedFormationExecution(s).request.args[0].canonicalNncResult,source);
  assert.equal(issueDerivedFormationSnapshot(scope,{...input,request:{...request,canonicalNncResult:{...source}}}),null);
 }
});
test('raw ownerhood vocative and double nucleus snapshots retain owner dependencies without authoring authority',()=>{
 const noun=(stem,subject='3common',selections={})=>{const s=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tl-1-a'}),op=owner.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{state:'absolutive',subject,predicateFormation:'source-stem',stemFormation:'plain',sentenceType:'statement',polarity:'positive',humanness:'human',...selections});return owner.evaluateClassicalNahuatlOrdinaryNnc(s,op);};
 const principal=noun('nāhuīpōtēpōhua','1pl',{state:'possessive',possessor:'2pl'}),supplement=noun('chānēcuēpīhuīhua','2pl',{pluralConnector:'m-eh'});assert.equal(principal.authorizationStatus,'authorized',principal.blockReason);assert.equal(supplement.authorizationStatus,'authorized',supplement.blockReason);
 const agentive=owner.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'predicate-nominalization',nominalizationKind:'preterit-agentive',source:{sourceStage:'preterit-predicate',sourceStem:'pix',verbClass:'A',sourceVoice:'active',sourceValence:'intransitive',sourceObjectPattern:'none',sourceSubject:'3sg'},subject:'3sg',state:'absolutive',animacy:'animate'});assert.equal(agentive.authorizationStatus,'authorized');
 const rows=[{constructionKind:'ownerhood',source:{sourceStem:'cal',nounClass:'zero',ownerhoodMatrix:'huā'},subject:'3sg',state:'absolutive'},{constructionKind:'vocative',canonicalNncResult:agentive.canonicalResult},{constructionKind:'double-nucleus-ownerhood',source:{principalNncResult:principal,supplementNncResult:supplement,supplementationAnalysis:'fixed-order-possessor-supplementation'},subject:'1sg',state:'absolutive',animacy:'animate'}];
 for(const request of rows){
  const source=principal,ingress={},session=createConstructionSession({isSource:()=>true}),context={source,ingress,committed:true},scope=createDerivedFormationScope({owner,source,operation:'nnc:deverbal-construction',session,getIngress:()=>ingress,getSourceContext:()=>context});
  const evaluated=owner.evaluateClassicalNahuatlDeverbalNnc(request);assert.equal(evaluated.authorizationStatus,'authorized',evaluated.blockReason);const s=issueDerivedFormationSnapshot(scope,{ingress,request,sourceContext:context});assert.ok(s?.contract.ready,`${request.constructionKind}: ${s?.contract.blockReason}`);assert.equal(projectDerivedFormationExecution(s).request.args[0],s.contract.request);
  if(request.constructionKind==='double-nucleus-ownerhood'){assert.ok(s.captures.some(c=>c.exact===supplement));const bad=issueDerivedFormationSnapshot(scope,{ingress,sourceContext:context,request:{...request,source:{...request.source,supplementNncResult:{...supplement}}}});assert.ok(!bad?.contract.ready);}
 }
});
test('remaining relational constituted routes use the same genuine binding without free selection reinterpretation',()=>{
 const kind='classical-nahuatl-nnc-nounstem-request';
 const rows=[{operation:'compound-embed',stemId:'tloc-proximity',formation:'option-four',sourceKind:'possessor',downstreamTargetStem:'cal'},
 {operation:'associated-entity',stemId:'pan-surface-time',sourceStem:'cuauhtlah',sourceFormation:'plain-nounstem',nounConnector:'tl'},
 {operation:'pertinency',stemId:'pan-surface-time',sourceStem:'huehcapan',sourceFormation:'plain-nounstem',pertinencySourceKind:'direct-relational',nounConnector:'tl'}];
 for(const nounstem of rows){
  const source=owner.buildClassicalNahuatlRelationalNncTypedSourceFrame({subjectMode:'normal',subjectId:'3sg',nounstem:{kind,...nounstem}});assert.equal(source.authorizationStatus,'authorized',`${nounstem.operation}: ${source.blockReason}`);
  const ingress=owner.getClassicalGrammarApplicationCapabilityNavigator(source),binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'nnc:relational',{}),session=createConstructionSession({isSource:x=>x===source}),scope=createDerivedFormationScope({owner,source,operation:'nnc:relational',session,getIngress:()=>ingress}),s=issueDerivedFormationSnapshot(scope,{ingress,binding});assert.ok(s?.contract.ready,`${nounstem.operation}: ${s?.contract.blockReason}`);assert.equal(s.routeId,nounstem.operation);assert.equal(projectDerivedFormationExecution(s).binding,binding);
  const invalid=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'nnc:relational',{state:'possessive'});assert.ok(!issueDerivedFormationSnapshot(scope,{ingress,binding:invalid})?.contract.ready);
 }
});
test('instrumentive citation executes its own exact binding role',()=>{
 const finite=owner.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'imperfect',requestedVoice:'active'});
 const source=owner.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'predicate-nominalization',nominalizationKind:'instrumentive',canonicalVncResult:finite,subject:'3common',state:'possessive',possessor:'3sg',animacy:'nonanimate'});assert.equal(source.authorizationStatus,'authorized',source.blockReason);
 const binding=owner.issueClassicalNahuatlFormationResultBindingFrame('nnc:deverbal-construction',source),ingress={},session=createConstructionSession({isSource:x=>x===source}),scope=createDerivedFormationScope({owner,source,operation:'nnc:deverbal-construction',session,getIngress:()=>ingress});
 const s=issueDerivedFormationSnapshot(scope,{ingress,binding,selectedBindingId:'continuation:instrumentive-citation',request:{constructionKind:'predicate-citation',canonicalNncResult:source,subject:'3common',state:'absolutive',animacy:'nonanimate'}});assert.ok(s?.contract.ready,s?.contract.blockReason);assert.equal(s.contract.preview.operationFrame.predicateCitationBridgeFrame.canonicalNncResult,source);
});
test('exact adverbial snapshot follows generic owner scope and rejects copied source',()=>{
 const typed=owner.issueCanonicalNncSourceFrame({stem:'achi',sourceClass:'zero'}),navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(typed),ordinaryBinding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'nnc:ordinary',{}),source=owner.executeClassicalGrammarTypedSourceOperationBindingFrame(ordinaryBinding).canonicalResult;assert.equal(source.authorizationStatus,'authorized',source.blockReason);
 const binding=owner.issueClassicalGrammarFormationResultBindingFrame('nnc:adverbial',source,{scope:'external-clause'}),ingress={},session=createConstructionSession({isSource:x=>x===source}),scope=createDerivedFormationScope({owner,source,operation:'nnc:adverbial',session,getIngress:()=>ingress}),request={canonicalSourceResult:source,degree:binding.selectedOwnerChoices.degree,scope:'external-clause',context:{sentencePosition:'initial',clauseType:'assertion'}},input={ingress,binding,request};
 const s=issueDerivedFormationSnapshot(scope,input);assert.ok(s?.contract.ready,s?.contract.blockReason);assert.equal(s.contract.preview.canonicalSourceResult,source);assert.equal(projectDerivedFormationExecution(s).request.args[0].canonicalSourceResult,source);assert.equal(issueDerivedFormationSnapshot(scope,{...input,request:{...request,canonicalSourceResult:{...source}}}),null);
 const matrix=owner.requestClassicalVncApplicationResult({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active'});
 const missing=owner.issueClassicalGrammarFormationResultBindingFrame('nnc:adverbial',source,{scope:'incorporated-predicate'}),incorporated={...request,scope:'incorporated-predicate'};
 assert.ok(!issueDerivedFormationSnapshot(scope,{ingress,binding:missing,request:incorporated})?.contract.ready);
 const complete=owner.issueClassicalGrammarFormationResultBindingFrame('nnc:adverbial',source,{scope:'incorporated-predicate',canonicalMatrixResult:matrix}),ready=issueDerivedFormationSnapshot(scope,{ingress,binding:complete,request:{...incorporated,canonicalMatrixResult:matrix}});
 assert.ok(ready?.contract.ready,ready?.contract.blockReason);assert.equal(ready.contract.preview.canonicalMatrixResult,matrix);assert.ok(ready.captures.some(c=>c.exact===matrix));
 assert.equal(issueDerivedFormationSnapshot(scope,{ingress,binding:complete,request:{...incorporated,canonicalMatrixResult:{...matrix}}}),null);
});
test('direct action and patientive routes retain exact VNC custody through their selected owner role',()=>{
 for(const [tense,bindingId,options]of [['future','deverbal-action:future-source',{constructionKind:'deverbal-action',actionKind:'active-action',actionSuffix:'liz',actionStemVariant:'ca-to-qui',animacy:'nonanimate',subject:'3common'}],['present','patientive:imperfective-source',{constructionKind:'patientive',patientiveSourceFamily:'imperfective-active-core',patientiveAnalogy:'impersonal',animacy:'animate',subject:'3sg'}]]){
  const source=owner.requestClassicalVncApplicationResult({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense,requestedVoice:'active'}),binding=owner.issueClassicalNahuatlFormationResultBindingFrame('nnc:deverbal-construction',source),ingress={},session=createConstructionSession({isSource:x=>x===source}),scope=createDerivedFormationScope({owner,source,operation:'nnc:deverbal-construction',session,getIngress:()=>ingress}),request={...options,canonicalVncResult:source,state:'absolutive'};
  const s=issueDerivedFormationSnapshot(scope,{ingress,binding,selectedBindingId:bindingId,request});assert.ok(s?.contract.ready,`${bindingId}: ${s?.contract.blockReason}`);assert.equal(s.contract.preview.sourceFrame.canonicalVncResult,source);assert.equal(projectDerivedFormationExecution(s).request.args[0].canonicalVncResult,source);
 }
});
