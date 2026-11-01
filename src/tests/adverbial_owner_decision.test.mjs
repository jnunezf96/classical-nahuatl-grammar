import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {createDerivedFormationScope,issueDerivedFormationSnapshot,projectDerivedFormationExecution,captureDerivedFormationChoiceFrame} from '../ui/composition/derived_formation_transaction.mjs';
import {projectOwnerOperationChoice,readOwnerOperationControlIntent} from '../ui/composition/owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261031-1';
import * as decision from '../ui/composition/owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261031-1';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;

test('raw adverbial decision preserves invalid intent and issues contextual recovery from the authentic potential',()=>{
 const potential=owner.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:'iz'}),source=potential.lexicalVncSourceFrame,ingress={};
 const session=createConstructionSession({isSource:x=>x===source}),context=Object.freeze({source,ingress,committed:true});
 const presentation={choices:{degree:{controlId:'degree'},negativeParticle:{controlId:'negative'}}};
 const scope=createDerivedFormationScope({owner,source,operation:'nnc:adverbial',session,getIngress:()=>ingress,getSourceContext:()=>context,presentation});
 const request={adverbialPotentialFrame:potential,degree:'forged',scope:'external-clause',context:{negativeParticle:'forged'}};
 const blocked=issueDerivedFormationSnapshot(scope,{ingress,sourceContext:context,request});
 assert.equal(blocked.contract.ready,false);assert.equal(projectDerivedFormationExecution(blocked),null);
 assert.equal(blocked.contract.choices,blocked.contract.preview.choiceOptionProjection);
 const degree=projectOwnerOperationChoice(blocked,'degree');assert.ok(degree);
 assert.equal(degree.authoredValue,'forged');assert.deepEqual(degree.options.map(x=>x.optionId),potential.allowedDegrees);
 const negative=projectOwnerOperationChoice(blocked,'negativeParticle');assert.equal(negative.authoredValue,'forged');
 assert.deepEqual(negative.options.map(x=>x.optionId),['',...potential.contextChoices.negativeParticles]);
 const control={id:'negative',value:'',tagName:'SELECT'};
 const corrected=readOwnerOperationControlIntent(blocked,{getElementById:()=>control},blocked.contract.request,control);
 assert.equal(corrected.context.negativeParticle,'');assert.equal(corrected.degree,'forged');assert.equal(corrected.adverbialPotentialFrame,potential);
 assert.equal(blocked.contract.request.context.negativeParticle,'forged');
 const ready=issueDerivedFormationSnapshot(scope,{ingress,sourceContext:context,request:{...corrected,degree:'first-degree'}});
 assert.equal(ready.contract.ready,true,ready.contract.blockReason);assert.equal(projectDerivedFormationExecution(ready).request.args[0],ready.contract.request);
 assert.equal(owner.evaluateClassicalNahuatlAdverbialNuclear({...request,adverbialPotentialFrame:{...potential}}).choiceOptionProjection,undefined);
});

test('exact adverbial rejection retains owner domains and exact source without granting execution',()=>{
 const typed=owner.issueCanonicalNncSourceFrame({stem:'achi',sourceClass:'zero'}),navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(typed);
 const ordinary=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'nnc:ordinary',{}),source=owner.executeClassicalGrammarTypedSourceOperationBindingFrame(ordinary).canonicalResult;
 const binding=owner.issueClassicalGrammarFormationResultBindingFrame('nnc:adverbial',source,{scope:'external-clause'}),ingress={},session=createConstructionSession({isSource:x=>x===source});
 const scope=createDerivedFormationScope({owner,source,operation:'nnc:adverbial',session,getIngress:()=>ingress});
 const blocked=issueDerivedFormationSnapshot(scope,{ingress,binding,request:{canonicalSourceResult:source,degree:'forged',scope:'external-clause'}});
 assert.equal(blocked.contract.ready,false);assert.equal(blocked.contract.preview.canonicalSourceResult,source);
 assert.equal(blocked.contract.choices,blocked.contract.preview.choiceOptionProjection);assert.ok(blocked.contract.choices.degree.options.length);
 assert.equal(blocked.contract.request.degree,'forged');assert.equal(projectDerivedFormationExecution(blocked),null);
});


test('production adverbial capture retains an admitted nested edit before presentation restores its control',()=>{
 const potential=owner.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:'quēn'}),source=potential.lexicalNncSourceFrame,ingress={};
 const session=createConstructionSession({isSource:x=>x===source}),context=Object.freeze({source,ingress,committed:true});
 const scope=createDerivedFormationScope({owner,source,operation:'nnc:adverbial',session,getIngress:()=>ingress,getSourceContext:()=>context,
   presentation:{choices:{negativeParticle:{controlId:'negative'}}}});
 const snapshot=issueDerivedFormationSnapshot(scope,{ingress,sourceContext:context,request:{adverbialPotentialFrame:potential,degree:'second-degree',scope:'external-clause',context:{}}});
 const controls={negative:{id:'negative',value:'',tagName:'SELECT'}};
 session.stage({source,route:{operation:'nnc:adverbial'},slots:snapshot.captures,operationContract:snapshot,execution:projectDerivedFormationExecution(snapshot),ready:true});
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const start=code.indexOf('    function captureClassicalOwnerRequestChoiceIntent('),end=code.indexOf('\n    }',start)+6;
 const contextVm=vm.createContext({ClassicalConstructionSession:session,ClassicalChoicePreflightTransaction:{},targetObject:{document:{getElementById:id=>controls[id]}},
   findOwnerOperationControlChoice:decision.findOwnerOperationControlChoice,readOwnerOperationControlValue:decision.readOwnerOperationControlValue,
   isOwnerOperationChoiceAllowed:decision.isOwnerOperationChoiceAllowed,readOwnerOperationControlIntent,
   captureDerivedFormationChoiceFrame});
 const capture=vm.runInContext(code.slice(start,end)+'\ncaptureClassicalOwnerRequestChoiceIntent',contextVm);
 const before=session.position,chosen=capture(controls.negative,'ah');
 assert.ok(chosen);controls.negative.value='';assert.equal(chosen.request.context.negativeParticle,'ah');
 assert.equal(chosen.request.adverbialPotentialFrame,potential);assert.equal(session.position,before);
 assert.equal(capture({...controls.negative,value:'forged'},'forged'),null);
 const next=issueDerivedFormationSnapshot(scope,{ingress,sourceContext:context,request:chosen.request});
 assert.equal(next.contract.ready,true,next.contract.blockReason);assert.equal(next.contract.preview.operationFrame.contextFrame.negativeParticle,'ah');
 assert.equal(projectDerivedFormationExecution(next).request.args[0],next.contract.request);
});

test('external scope is an owner-issued withdrawal of the exact incorporation matrix, never a contradictory execution request',()=>{
 const typed=owner.issueCanonicalNncSourceFrame({stem:'achi',sourceClass:'zero'}),navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(typed),source=owner.executeClassicalGrammarTypedSourceOperationBindingFrame(owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'nnc:ordinary',{})).canonicalResult;
 const matrix=owner.requestClassicalVncApplicationResult({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active'});
 const binding=owner.issueClassicalGrammarFormationResultBindingFrame('nnc:adverbial',source,{scope:'incorporated-predicate',canonicalMatrixResult:matrix}),ingress={},session=createConstructionSession({isSource:x=>x===source});
 const scope=createDerivedFormationScope({owner,source,operation:'nnc:adverbial',session,getIngress:()=>ingress,presentation:{choices:{scope:{controlId:'scope'}}}});
 const request={canonicalSourceResult:source,canonicalMatrixResult:matrix,scope:'incorporated-predicate',degree:'second-degree'};
 const snapshot=issueDerivedFormationSnapshot(scope,{ingress,binding,request});assert.equal(snapshot.contract.ready,true,snapshot.contract.blockReason);
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'scope','external-clause'),true);
 const control={id:'scope',tagName:'SELECT',value:'external-clause'},next=readOwnerOperationControlIntent(snapshot,{getElementById:()=>control},snapshot.contract.request,control);
 assert.equal(Object.hasOwn(next,'canonicalMatrixResult'),false);assert.equal(next.canonicalSourceResult,source);assert.equal(snapshot.contract.request.canonicalMatrixResult,matrix);
 assert.equal(owner.evaluateClassicalNahuatlAdverbialNuclear({...request,scope:'external-clause'}).authorizationStatus,'blocked');
 assert.equal(owner.evaluateClassicalNahuatlAdverbialNuclear(next).authorizationStatus,'authorized');
});

test('an inherited negative remains an exact Source fact and blank context is labelled as inheritance',()=>{
 const potential=owner.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:'quēn'});
 const source=owner.buildClassicalNahuatlNncSentenceSurfaceFrame(potential.canonicalTypedSlotFrame,{sentenceType:'assertion',polarity:'negative'});
 assert.equal(owner.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(source),true);
 const result=owner.evaluateClassicalNahuatlAdverbialNuclear({canonicalSourceResult:source,degree:'second-degree',scope:'external-clause',context:{negativeParticle:''}});
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);
 assert.equal(result.operationFrame.contextFrame.negativeParticle,'ah');
 const blank=result.choiceOptionProjection.negativeParticle.options.find(x=>x.optionId==='');
 assert.equal(blank.inheritedValue,'ah');assert.match(blank.label,/inherited/i);
 assert.equal(result.choiceOptionProjection.polarity.editable,false);
 assert.equal(result.choiceOptionProjection.polarity.applicable,false);
});


test('existing context option labels follow the current owner decision and restore when its controls depart',()=>{
 const potential=owner.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:'quēn'}),source=potential.lexicalNncSourceFrame,ingress={};
 const session=createConstructionSession({isSource:x=>x===source}),context=Object.freeze({source,ingress,committed:true});
 const scope=createDerivedFormationScope({owner,source,operation:'nnc:adverbial',session,getIngress:()=>ingress,getSourceContext:()=>context,presentation:{choices:{negativeParticle:{controlId:'negative'}}}});
 const positive=issueDerivedFormationSnapshot(scope,{ingress,sourceContext:context,request:{adverbialPotentialFrame:potential,degree:'second-degree',scope:'external-clause'}});
 const host={hidden:false,setAttribute(){}},empty={value:'',textContent:'none',hidden:false,disabled:false};
 const control={id:'negative',tagName:'SELECT',value:'',dataset:{},options:[empty],setAttribute(){},removeAttribute(){},getAttribute:()=>null,closest:()=>host,querySelectorAll:()=>[],appendChild(x){this.options.push(x);}};
 const doc={getElementById:id=>id==='negative'?control:null,createElement:()=>({})};
 decision.syncOwnerOperationDecisionControls(positive,doc);assert.equal(empty.textContent,'none');
 const exact=owner.executeClassicalGrammarApplicationRequest({operationId:'nnc:sentence-surface',args:[potential.canonicalTypedSlotFrame,{sentenceType:'assertion',polarity:'negative'}]}).canonicalResult;
 const binding=owner.issueClassicalGrammarFormationResultBindingFrame('nnc:adverbial',exact,{scope:'external-clause'});
 const exactScope=createDerivedFormationScope({owner,source:exact,operation:'nnc:adverbial',session:createConstructionSession({isSource:x=>x===exact}),getIngress:()=>ingress,presentation:{choices:{negativeParticle:{controlId:'negative'}}}});
 const inherited=issueDerivedFormationSnapshot(exactScope,{ingress,binding,request:{canonicalSourceResult:exact,degree:'second-degree',scope:'external-clause'}});
 assert.ok(inherited, binding?.blockReason);assert.match(inherited.contract.choices.negativeParticle.options[0].label,/inherited ah/);
 decision.syncOwnerOperationDecisionControls(inherited,doc);assert.match(empty.textContent,/inherited ah/);
 decision.syncOwnerOperationDecisionControls(positive,doc);assert.equal(empty.textContent,'none');
 decision.syncOwnerOperationDecisionControls(inherited,doc);decision.restoreOwnerOperationDecisionControls(doc);assert.equal(empty.textContent,'none');
});
