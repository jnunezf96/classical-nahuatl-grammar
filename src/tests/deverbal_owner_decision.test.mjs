import test from 'node:test';import assert from 'node:assert/strict';import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const o=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const ids=field=>field.options.map(option=>option.optionId);
const finite=(tense='present',subject='3sg')=>o.evaluateClassicalNahuatlVncApplication({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject,mood:'indicative',tense,requestedVoice:'active'});
test('deverbal actual target retains fixed and rejected state recovery in its same decision',()=>{
 const source=finite(),request={constructionKind:'predicate-nominalization',nominalizationKind:'present-agentive',canonicalVncResult:source,subject:'3sg',state:'possessive',animacy:'animate'};
 const blocked=o.evaluateClassicalNahuatlDeverbalNnc(request);assert.equal(blocked.authorizationStatus,'blocked');assert.deepEqual(ids(blocked.choiceOptionProjection.state),['absolutive']);assert.equal(blocked.choiceOptionProjection.state.authoredValue,'possessive');assert.equal(blocked.choiceOptionProjection.state.editable,true);assert.equal(blocked.sourceFrame.canonicalVncResult,source);
 const ready=o.evaluateClassicalNahuatlDeverbalNnc({...request,state:'absolutive'});assert.equal(ready.authorizationStatus,'authorized');assert.equal(ready.choiceOptionProjection.state.editable,false);assert.deepEqual(ids(ready.choiceOptionProjection.subject),['3sg']);assert.equal(ready.choiceOptionProjection.possessor.applicable,false);
});
test('preterit connector and spelling guards retain actual recovery options before rejection',()=>{
 const source=finite('preterit'),request={constructionKind:'predicate-nominalization',nominalizationKind:'preterit-agentive',canonicalVncResult:source,subject:'3sg',state:'absolutive',animacy:'animate'};
 const good=o.evaluateClassicalNahuatlDeverbalNnc(request);assert.equal(good.authorizationStatus,'authorized',good.blockReason);assert.deepEqual(ids(good.choiceOptionProjection.numberConnector),good.operationFrame.singularConnectorOptions);
 for(const key of ['numberConnector','nominalSpelling','preteritAgentiveVariant','preteritAgentiveBoundarySpelling','preteritSourceAnalysis']){const bad=o.evaluateClassicalNahuatlDeverbalNnc({...request,[key]:'invented'});assert.equal(bad.authorizationStatus,'blocked',key);assert.equal(bad.choiceOptionProjection[key].authoredValue,'invented');assert(ids(bad.choiceOptionProjection[key]).length>0);assert(!ids(bad.choiceOptionProjection[key]).includes('invented'));}
});
test('exact preterit reanalysis retains its subject while general-use possession selects a new outer subject',()=>{
 const source=finite('preterit','1sg'),request={constructionKind:'predicate-nominalization',nominalizationKind:'preterit-agentive',canonicalVncResult:source,subject:'2sg',state:'absolutive',animacy:'animate'};
 const blocked=o.evaluateClassicalNahuatlDeverbalNnc(request);assert.equal(blocked.authorizationStatus,'blocked');assert.deepEqual(ids(blocked.choiceOptionProjection.subject),['1sg']);assert.equal(blocked.choiceOptionProjection.subject.authoredValue,'2sg');assert.equal(blocked.choiceOptionProjection.subject.editable,true);
 const general=o.evaluateClassicalNahuatlDeverbalNnc({...request,state:'possessive',possessor:'3sg'});assert.equal(general.authorizationStatus,'authorized',general.blockReason);assert(ids(general.choiceOptionProjection.subject).includes('2sg'));assert.equal(general.canonicalResult.subject,'2sg');assert.equal(general.sourceFrame.canonicalVncResult,source);
 const contradiction=o.evaluateClassicalNahuatlDeverbalNnc({...request,state:'possessive',possessor:'3sg',animacy:'nonanimate'});assert.equal(contradiction.authorizationStatus,'blocked');assert.equal(contradiction.choiceOptionProjection.animacy.authoredValue,'nonanimate');assert(!ids(contradiction.choiceOptionProjection.animacy).includes('nonanimate'));
});
test('action stem and characteristic reading recovery reuse the same actual branch guards',()=>{
 const source=finite('future'),request={constructionKind:'deverbal-action',actionKind:'active-action',actionSuffix:'liz',canonicalVncResult:source,subject:'3common',state:'absolutive',animacy:'nonanimate'};
 const good=o.evaluateClassicalNahuatlDeverbalNnc(request);assert.equal(good.authorizationStatus,'authorized',good.blockReason);assert.deepEqual(ids(good.choiceOptionProjection.actionKind),['active-action','potential-patient']);assert(ids(good.choiceOptionProjection.actionSuffix).includes('liz'));
 const bad=o.evaluateClassicalNahuatlDeverbalNnc({...request,actionStemVariant:'invented'});assert.equal(bad.authorizationStatus,'blocked');assert(ids(bad.choiceOptionProjection.actionStemVariant).length>0);assert.equal(bad.choiceOptionProjection.actionStemVariant.authoredValue,'invented');
 const ns=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'pil',sourceClass:'tli-1'}),r={constructionKind:'patientive',patientiveKind:'characteristic-property',patientiveSourceFamily:'characteristic-property',canonicalNncSourceFrame:ns,characteristicReading:'organic-possession',state:'absolutive',subject:'3sg',animacy:'animate',possessor:'1sg'};
 const organic=o.evaluateClassicalNahuatlDeverbalNnc(r);assert.equal(organic.authorizationStatus,'blocked');assert.deepEqual(ids(organic.choiceOptionProjection.state),['possessive']);assert.equal(organic.choiceOptionProjection.state.authoredValue,'absolutive');assert(ids(organic.choiceOptionProjection.characteristicReading).includes('inherent-quality'));
 const recovered=o.evaluateClassicalNahuatlDeverbalNnc({...r,state:'possessive'});assert.equal(recovered.authorizationStatus,'authorized',recovered.blockReason);
 const missing=o.evaluateClassicalNahuatlDeverbalNnc({...r,state:'possessive',possessor:''});assert.equal(missing.authorizationStatus,'blocked');assert(ids(missing.choiceOptionProjection.possessor).includes('1sg'));assert.equal(missing.choiceOptionProjection.possessor.editable,true);
});
test('ownerhood target matrices and boundary corrections come from the actual matrix admission',()=>{
 const request={constructionKind:'ownerhood',source:{sourceStem:'cal',nounClass:'zero',ownerhoodMatrix:'invented'},subject:'3sg',state:'absolutive',animacy:'animate'};
 const bad=o.evaluateClassicalNahuatlDeverbalNnc(request);assert.equal(bad.authorizationStatus,'blocked');assert.deepEqual(ids(bad.choiceOptionProjection.ownerhoodMatrix),['ē','huā','yō-ā']);assert.equal(bad.choiceOptionProjection.ownerhoodMatrix.authoredValue,'invented');
 const next={...request,source:{...request.source,ownerhoodMatrix:'yō-ā'},ownerhoodBoundaryVariant:'invented'};const boundary=o.evaluateClassicalNahuatlDeverbalNnc(next);assert.equal(boundary.authorizationStatus,'blocked');assert.deepEqual(ids(boundary.choiceOptionProjection.ownerhoodBoundaryVariant),['ordinary','single-writing']);
 const good=o.evaluateClassicalNahuatlDeverbalNnc({...next,ownerhoodBoundaryVariant:'single-writing'});assert.equal(good.authorizationStatus,'authorized',good.blockReason);
});

test('production deverbal native choices retain the one exact owner decision through correction and Make',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
 const decision=await import('../ui/composition/owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261031-1');
 const adapter=await import('../ui/composition/derived_formation_transaction.mjs');
 const {createConstructionSession}=await import('../ui/composition/construction_session.mjs');
 const {executeConstructionPacket}=await import('../ui/composition/construction_packet.mjs');
 const {previewConstructionPacket}=await import('../ui/composition/construction_preview.mjs');
 const source=o.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'preterit',requestedVoice:'active'}),ingress=o.getClassicalGrammarApplicationCapabilityNavigator(source);
 const binding={operationId:'nnc:deverbal-construction',exactResult:source,ownerBindingFrame:o.issueClassicalNahuatlFormationResultBindingFrame('nnc:deverbal-construction',source),selectedBindingId:'predicate-nominalization:preterit-source'};
 const initial={constructionKind:'predicate-nominalization',nominalizationKind:'preterit-agentive',canonicalVncResult:source,subject:'1sg',state:'absolutive',animacy:'animate'};
 let reads=0,makes=0;const control={id:'classical-rule-logic-nnc-state',value:'absolutive',tagName:'SELECT'},doc={getElementById:id=>id===control.id?control:null};
 const target=Object.create(o);Object.defineProperty(target,'document',{value:doc});
 const session=createConstructionSession({isSource:x=>x===source,isResult:x=>o.isClassicalNahuatlDeverbalNncGrammarFrame(x),execute:p=>{makes++;return executeConstructionPacket(o,p)},present:()=>true});
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const ctx=vm.createContext({...adapter,...decision,ClassicalConstructionSession:session,ClassicalChoicePreflightTransaction:{},targetObject:target,ActiveClassicalGrammarCapabilityNavigator:ingress,
 ClassicalDerivedFormationScopes:new WeakMap(),ClassicalNominalSourceVncRefusals:new WeakSet(),getClassicalNativeDerivedIngress:()=>null,readClassicalNominalSourceContext:()=>null,
 getActiveClassicalGrammarResultBinding:()=>binding,buildClassicalNominalConstructionUiRequest:()=>{reads++;return initial;},syncOwnerOperationDecisionControls:()=>true,
 HandledClassicalContinuationChoiceEvents:new WeakSet(),scheduleClassicalVncReloadSave:()=>{}});
 for(const name of ['getClassicalRetainedOwnerRequest','getClassicalRetainedDeverbalRequest','getClassicalDeverbalChoicePresentation','captureClassicalOwnerRequestChoiceIntent','readClassicalDerivedFormationSnapshot','stageClassicalRelationalOwnerChoice']){
  const a=code.indexOf(`    function ${name}(`);assert(a>=0,name);const b=code.indexOf('\n    }',a)+6;vm.runInContext(code.slice(a,b),ctx);
 }
 const stage=()=>{const s=ctx.readClassicalDerivedFormationSnapshot('nnc:deverbal-construction',source,binding,null);assert(s?.contract.ready,s?.contract.blockReason);session.stage({source,route:{operation:'nnc:deverbal-construction',binding:binding.selectedBindingId},slots:s.captures,operationContract:s,execution:adapter.projectDerivedFormationExecution(s),ready:s.contract.ready});return s;};
 ctx.syncClassicalCapabilityApplyOperationState=stage;stage();const before=session.position;
 ctx.captureClassicalOwnerRequestChoiceIntent(control,'possessive');assert.equal(control.value,'absolutive');assert.equal(ctx.stageClassicalRelationalOwnerChoice(control,{}),true);
 const s=session.position.operationContract;assert.equal(s.contract.request.state,'possessive');assert.equal(s.contract.request.canonicalVncResult,source);assert.equal(s.contract.choices,s.contract.preview.choiceOptionProjection);assert.equal(reads,1);assert.equal(session.position.accepted,before.accepted);assert.equal(makes,0);
 assert.equal(previewConstructionPacket(o,adapter.projectDerivedFormationExecution(s)).canonicalResult,s.contract.preview);assert.equal(session.make(),true);assert.equal(makes,1);
 assert.equal(ctx.captureClassicalOwnerRequestChoiceIntent(control,'invented'),null);
 const actionSource=finite('future'),actionBinding=o.issueClassicalNahuatlFormationResultBindingFrame('nnc:deverbal-construction',actionSource);
 const actionSession=createConstructionSession({isSource:x=>x===actionSource}),actionIngress={};
 const actionScope=adapter.createDerivedFormationScope({owner:o,source:actionSource,operation:'nnc:deverbal-construction',session:actionSession,getIngress:()=>actionIngress,presentation:ctx.getClassicalDeverbalChoicePresentation()});
 const action=adapter.issueDerivedFormationSnapshot(actionScope,{ingress:actionIngress,binding:actionBinding,selectedBindingId:'deverbal-action:future-source',request:{constructionKind:'deverbal-action',actionKind:'potential-patient',actionSuffix:'liz',canonicalVncResult:actionSource,state:'absolutive',subject:'3common',animacy:'nonanimate'}});
 assert(action?.contract.ready,action?.contract.blockReason);
 const option={value:'none',textContent:'none'},alias={id:'classical-deverbal-nnc-action-stem-variant',tagName:'SELECT',options:[option],value:'none',dataset:{},setAttribute(){},getAttribute(){},closest:()=>null,appendChild(x){this.options.push(x)}};
 const aliasDoc={getElementById:id=>id===alias.id?alias:null,createElement:()=>({})};
 assert.equal(decision.findOwnerOperationControlChoice(action,alias).choiceId,'actionStemVariant');
 decision.syncOwnerOperationDecisionControls(action,aliasDoc);assert.equal(option.hidden,false);assert.equal(alias.dataset.ownerChoiceId,'actionStemVariant');

});

test('passive patientive target reference is validated and realized without rewriting exact passive ancestry',()=>{
 const source=o.evaluateClassicalNahuatlVncApplication({sourceStem:'pōhua',verbClass:'A',sourceValence:'specific-projective',objectPerson:'3sg',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'passive',nonactiveOptionId:'hua:pōhuī-hua'}).resultFrame;assert.equal(source.authorizationStatus,'authorized',source.blockReason);
 const request={constructionKind:'patientive',patientiveKind:'ordinary',patientiveSourceFamily:'passive-core',canonicalVncResult:source,subject:'1sg',state:'absolutive',animacy:'animate',humanness:'nonhuman'};
 const blocked=o.evaluateClassicalNahuatlDeverbalNnc(request);assert.equal(blocked.authorizationStatus,'blocked');assert.equal(blocked.choiceOptionProjection.humanness.authoredValue,'nonhuman');assert.deepEqual(ids(blocked.choiceOptionProjection.humanness),['human']);
 const good=o.evaluateClassicalNahuatlDeverbalNnc({...request,humanness:'human'});assert.equal(good.authorizationStatus,'authorized',good.blockReason);assert.equal(good.operationFrame.passivePatientiveFamilyFrame.targetHumanness,'human');assert.equal(good.canonicalResult.personFrame.participantFrame.humanness,'human');assert.equal(good.sourceFrame.canonicalVncResult,source);
 const third=o.evaluateClassicalNahuatlDeverbalNnc({...request,subject:'3sg',humanness:''});assert.equal(third.authorizationStatus,'authorized',third.blockReason);assert.equal(third.operationFrame.passivePatientiveFamilyFrame.targetHumanness,'unspecified');assert.equal(third.canonicalResult.personFrame.participantFrame.humanness,'unspecified');
 const fixed=o.evaluateClassicalNahuatlDeverbalNnc({...request,subject:'3common',animacy:'nonanimate',humanness:'human'});assert.equal(fixed.authorizationStatus,'blocked');assert.deepEqual(ids(fixed.choiceOptionProjection.humanness),['nonhuman']);
 const human=o.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'predicate-nominalization',nominalizationKind:'active-action',canonicalVncResult:finite('distant-past'),state:'possessive',subject:'2sg',possessor:'3sg',actionReference:'human-metaphor',animacy:'animate',humanness:'human'});assert.equal(human.authorizationStatus,'authorized',human.blockReason);assert(ids(human.choiceOptionProjection.subject).includes('1sg'));assert.deepEqual(ids(human.choiceOptionProjection.humanness),['human']);
});
