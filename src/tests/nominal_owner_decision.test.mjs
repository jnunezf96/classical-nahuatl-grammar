import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import * as adapter from '../ui/composition/nominal_operation_transaction.mjs';
import * as decision from '../ui/composition/owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261031-1';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function ordinary(stem,sourceClass){const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});return owner.requestClassicalOrdinaryNncResult(source,owner.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive',predicateFormation:'source-stem'}));}
function calendar(){const numeral=owner.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[{constructionKind:'cardinal-numeral-nnc',value:1,classifier:'basic',countKind:'ordinary',subject:'3common',state:'absolutive',animacy:'nonanimate'}]}).canonicalResult,day=ordinary('cipac','tli-1');return {numeral,day};}
test('calendar owner exposes its actual boundary domain with fixed target facts and exact parent custody through rejection',()=>{
 const {numeral,day}=calendar(),ingress={},session=createConstructionSession({isSource:x=>x===numeral||x===day});
 const binding=owner.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',numeral,{});
 const scope=adapter.createNominalOperationScope({owner,source:numeral,session,getIngress:()=>ingress,presentation:{choices:{calendarBoundary:{controlId:'boundary'}}}});
 const input={ingress,binding,selectedBindingId:'calendar-date:numeral-result',additionalResults:{'calendar-day-sign-result':day},request:{constructionKind:'calendar-date-nnc',calendarBoundary:'forged',source:{numeralResult:numeral,daySignResult:day}}};
 const snapshot=adapter.issueNominalOperationSnapshot(scope,input);assert.equal(snapshot.contract.ready,false);
 assert.equal(snapshot.contract.choices,snapshot.contract.preview.choiceOptionProjection);
 const field=decision.projectOwnerOperationChoice(snapshot,'calendarBoundary');assert.ok(field);assert.equal(field.authoredValue,'forged');
 assert.deepEqual(field.options.map(x=>x.optionId),['double-nucleus','single-nucleus']);
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'subject','1sg'),false);
 const control={id:'boundary',tagName:'SELECT',value:'forged'};
 const request=decision.readOwnerOperationControlIntent(snapshot,{getElementById:()=>control},snapshot.contract.request,control,'single-nucleus');
 assert.equal(request.source.numeralResult,numeral);assert.equal(request.source.daySignResult,day);
 const ready=adapter.issueNominalOperationSnapshot(scope,{...input,request});assert.equal(ready.contract.ready,true,ready.contract.blockReason);
 assert.equal(adapter.projectNominalOperationExecution(ready).request.args[0],ready.contract.request);
 assert.equal(snapshot.contract.request.calendarBoundary,'forged');assert.equal(adapter.projectNominalOperationExecution(snapshot),null);
 const contradictory=owner.evaluateClassicalNahuatlNominalConstruction({...request,subject:'1sg'});assert.equal(contradictory.authorizationStatus,'blocked');assert.equal(contradictory.choiceOptionProjection.subject.authoredValue,'1sg');
});


test('production exact nominal execution delegates only to its current issued session decision',()=>{
 const {numeral,day}=calendar(),ingress={},session=createConstructionSession({isSource:x=>x===numeral||x===day});
 const ownerBindingFrame=owner.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',numeral,{});
 const scope=adapter.createNominalOperationScope({owner,source:numeral,session,getIngress:()=>ingress});
 const selectedBindingId='calendar-date:numeral-result';
 const snapshot=adapter.issueNominalOperationSnapshot(scope,{ingress,binding:ownerBindingFrame,selectedBindingId,additionalResults:{'calendar-day-sign-result':day},request:{constructionKind:'calendar-date-nnc',calendarBoundary:'single-nucleus',source:{numeralResult:numeral,daySignResult:day}}});
 assert.equal(snapshot.contract.ready,true,snapshot.contract.blockReason);
 session.stage({source:numeral,route:{operation:'grammar:nominal-construction',binding:selectedBindingId},slots:snapshot.captures,operationContract:snapshot,execution:adapter.projectNominalOperationExecution(snapshot),ready:true});
 const binding={operationId:'grammar:nominal-construction',exactResult:numeral,bindingIds:[selectedBindingId],selectedBindingId,ownerBindingFrame};
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),start=code.indexOf('    function enterClassicalGrammarResultBindingChoice('),end=code.indexOf('      syncClassicalSelectedResultBindingRole(',start);
 let calls=0;
 const context=vm.createContext({ActiveClassicalGrammarResultBinding:binding,ClassicalConstructionSession:session,
   projectOwnerOperationDecision:decision.projectOwnerOperationDecision,isDerivedFormationOperation:id=>['nnc:adverbial','nnc:relational','nnc:deverbal-construction'].includes(id),isParticleOperation:()=>false,
   applyClassicalConstructionPosition:()=>{calls++;return session.position.execution;}});
 const enter=vm.runInContext(code.slice(start,end)+"return 'legacy';}\nenterClassicalGrammarResultBindingChoice",context);
 const retainedStart=code.indexOf('    function getClassicalRetainedOwnerRequest('),retainedEnd=code.indexOf('    function getClassicalAdverbialDecisionRequest(',retainedStart);
 context.ClassicalChoicePreflightTransaction=null;
 const retained=vm.runInContext(code.slice(retainedStart,retainedEnd)+'getClassicalRetainedOwnerRequest',context);
 assert.equal(retained('grammar:nominal-construction',binding),snapshot.contract.request);
 assert.equal(retained('grammar:nominal-construction',{...binding,ownerBindingFrame:{...ownerBindingFrame}}),null);
 assert.equal(retained('grammar:nominal-construction',{...binding,selectedBindingId:'other-role'}),null);
 assert.equal(enter(selectedBindingId,{allowExecution:true}),session.position.execution);assert.equal(calls,1);
 context.ActiveClassicalGrammarResultBinding={...binding,ownerBindingFrame:{...ownerBindingFrame}};
 assert.equal(enter(selectedBindingId,{allowExecution:true}),false);assert.equal(calls,1);
 context.ActiveClassicalGrammarResultBinding={...binding,selectedBindingId:'other-role',bindingIds:[selectedBindingId,'other-role']};
 assert.equal(enter('other-role',{allowExecution:true}),false);assert.equal(calls,1);
 context.ActiveClassicalGrammarResultBinding={...binding,exactResult:{...numeral}};
 assert.equal(enter(selectedBindingId,{allowExecution:true}),false);assert.equal(calls,1);
});

test('numeric typed choices retain the actual owner-probed dependent transition rather than UI clear instructions',()=>{
 const source=owner.buildClassicalNahuatlNominalConstructionTypedSourceFrame({value:3}),navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(source);
 const issue=selections=>owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'grammar:nominal-construction',selections);
 const binding=issue({countKind:'ordinary',classifier:'basic',animacy:'nonanimate',subject:'3common',state:'absolutive'});
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);
 const gross=binding.choiceOptionProjection.countKind.find(x=>x.optionId==='gross');assert.equal(gross.availabilityStatus,'available');assert.ok(gross.nextSelections);
 assert.equal(gross.nextSelections.countKind,'gross');assert.equal(Object.hasOwn(gross.nextSelections,'subject'),false);
 assert.equal(issue(gross.nextSelections).bindingStatus,'choices-required');
 assert.equal(binding.callerSelections.subject,'3common');assert.equal(Object.isFrozen(gross.nextSelections),true);
});

test('compound structure and dependent orientation are one owner decision with explicit authored rejection',()=>{
 const request={constructionKind:'compound-nnc',structure:'integrated',embedRole:'association',possessorOrientation:'matrix',reduplication:'none',bracketing:'unambiguous',subject:'3sg',state:'possessive',possessor:'3sg',animacy:'animate',source:{embedStem:'cin',embedClass:'tli',embedSourceClass:'tli-1',matrixStem:'teō',matrixClass:'tl',matrixSourceClass:'tl-1-a'}};
 const initial=owner.evaluateClassicalNahuatlNominalConstruction(request);assert.equal(initial.authorizationStatus,'authorized',initial.blockReason);
 const choices=initial.choiceOptionProjection;assert.ok(choices?.possessorOrientation);assert.deepEqual(choices.possessorOrientation.options.map(x=>x.optionId),initial.operationFrame.possessorOrientationOptions);
 const linked=choices.structure.options.find(x=>x.optionId==='linked-connective-t');assert.ok(linked.withdrawRequestPaths.some(path=>path.join('.')==='possessorOrientation'));
 const rejected=owner.evaluateClassicalNahuatlNominalConstruction({...request,structure:'linked-connective-t'});
 assert.equal(rejected.authorizationStatus,'blocked');assert.equal(rejected.choiceOptionProjection.possessorOrientation.authoredValue,'matrix');
 assert.deepEqual(rejected.choiceOptionProjection.possessorOrientation.options.map(x=>x.optionId),['embed']);
 const recovered=owner.evaluateClassicalNahuatlNominalConstruction({...request,structure:'linked-connective-t',possessorOrientation:'embed'});
 assert.equal(recovered.authorizationStatus,'authorized',recovered.blockReason);assert.equal(recovered.operationFrame.possessorOrientation,'embed');
});

test('compound target decision exposes actual contextual state, reduplication, boundary and scope guards before rejection',()=>{
 const request={constructionKind:'compound-nnc',structure:'integrated',embedRole:'association',reduplication:'none',subject:'3sg',state:'absolutive',animacy:'animate',source:{embedStem:'cin',embedClass:'tli',embedSourceClass:'tli-1',matrixStem:'teō',matrixClass:'tl',matrixSourceClass:'tl-1-a'}};
 const frame=owner.evaluateClassicalNahuatlNominalConstruction(request);assert.equal(frame.authorizationStatus,'authorized',frame.blockReason);
 const values=(result,key)=>result.choiceOptionProjection[key].options.map(x=>x.optionId);
 assert.deepEqual(values(frame,'state'),['absolutive','possessive']);
 assert.deepEqual(values(frame,'reduplication'),['none','distributive-varietal']);
 assert.deepEqual(values(frame,'reduplicationTarget'),['embed']);
 assert.deepEqual(values(frame,'bracketing'),['unambiguous']);
 assert.deepEqual(values(frame,'matrixInitialIVariant'),['retain']);
 assert.deepEqual(values(frame,'embedIntensification'),['none']);
 assert.deepEqual(values(frame,'matrixExpansion'),['none']);
 const plural=owner.evaluateClassicalNahuatlNominalConstruction({...request,subject:'3pl',reduplication:'affinity',reduplicationTarget:'matrix'});
 assert.equal(plural.authorizationStatus,'authorized',plural.blockReason);assert.deepEqual(values(plural,'reduplicationTarget'),['embed','matrix','both']);
 assert.deepEqual(values(plural,'pluralConnector'),plural.canonicalResult.numberFrame.pluralConnectorOptions);
 const possessed=owner.evaluateClassicalNahuatlNominalConstruction({...request,state:'possessive',possessor:'forged'});
 assert.equal(possessed.authorizationStatus,'blocked');assert.deepEqual(values(possessed,'possessor'),possessed.canonicalResult.stateFrame.possessorChoices);
 assert.equal(possessed.choiceOptionProjection.possessor.authoredValue,'forged');
 const badConnector=owner.evaluateClassicalNahuatlNominalConstruction({...request,state:'possessive',singularPossessiveConnector:'0'});
 assert.equal(badConnector.authorizationStatus,'blocked');assert.deepEqual(values(badConnector,'singularPossessiveConnector'),['uh']);assert.equal(badConnector.choiceOptionProjection.singularPossessiveConnector.editable,true);

 const invalid=owner.evaluateClassicalNahuatlNominalConstruction({...request,matrixInitialIVariant:'absent'});
 assert.equal(invalid.authorizationStatus,'blocked');assert.equal(invalid.choiceOptionProjection.matrixInitialIVariant.authoredValue,'absent');
 assert.equal(invalid.choiceOptionProjection.matrixInitialIVariant.editable,true);assert.deepEqual(values(invalid,'matrixInitialIVariant'),['retain']);
 const typed=owner.buildClassicalNahuatlNominalConstructionTypedSourceFrame({stem:'cin-teō',embedStem:'cin',matrixStem:'teō',sourceClass:'tl'});
 assert.ok(typed);const navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(typed);
 const binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'grammar:nominal-construction',{embedUse:'nounstem',embedSourceClass:'tli-1',subject:'3sg',animacy:'animate',state:'absolutive'});
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);assert.deepEqual(binding.choiceOptionProjection.structure.options.map(x=>x.optionId),values(frame,'structure'));
 assert.deepEqual(binding.choiceOptionProjection.reduplication.options.map(x=>x.optionId),values(frame,'reduplication'));
 const rejectedTyped=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'grammar:nominal-construction',{...binding.callerSelections,reduplication:'affinity'});
 assert.equal(rejectedTyped.bindingStatus,'rejected');assert.equal(rejectedTyped.choiceOptionProjection.reduplication.authoredValue,'affinity');assert.equal(rejectedTyped.choiceOptionProjection.reduplication.options.some(x=>x.optionId==='none'),true);
 const rejectedState=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'grammar:nominal-construction',{...binding.callerSelections,state:'possessive'});
 assert.equal(rejectedState.bindingStatus,'rejected');assert.equal(rejectedState.choiceOptionProjection.state.authoredValue,'possessive');assert.deepEqual(rejectedState.choiceOptionProjection.state.options.map(x=>x.optionId),['absolutive']);

});

test('production compound capture keeps admitted target intent ahead of DOM projection for raw and typed ingress',()=>{
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const source=owner.buildClassicalNahuatlNominalConstructionTypedSourceFrame({stem:'cin-teō',embedStem:'cin',matrixStem:'teō',sourceClass:'tl'}),ingress=owner.getClassicalGrammarApplicationCapabilityNavigator(source);
 const binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'grammar:nominal-construction',{embedUse:'nounstem',embedSourceClass:'tli-1',subject:'3sg',animacy:'animate',structure:'integrated'});
 const session=createConstructionSession({isSource:x=>x===source}),scope=adapter.createNominalOperationScope({owner,source,session,getIngress:()=>ingress,presentation:{choices:{structure:{controlId:'structure'}}}});
 const snapshot=adapter.issueNominalOperationSnapshot(scope,{ingress,binding});session.stage({source,route:{operation:'grammar:nominal-construction'},operationContract:snapshot,slots:snapshot.captures,ready:true,execution:adapter.projectNominalOperationExecution(snapshot)});
 const control={id:'structure',value:'integrated',tagName:'SELECT',dataset:{}},document={getElementById:()=>control};
 const context=vm.createContext({ClassicalConstructionSession:session,ClassicalChoicePreflightTransaction:{},targetObject:{document},
   findOwnerOperationControlChoice:decision.findOwnerOperationControlChoice,readOwnerOperationControlValue:decision.readOwnerOperationControlValue,isOwnerOperationChoiceAllowed:decision.isOwnerOperationChoiceAllowed,
   captureNominalOperationChoiceFrame:adapter.captureNominalOperationChoiceFrame,readOwnerOperationControlIntent:decision.readOwnerOperationControlIntent});
 const start=code.indexOf('    function captureClassicalOwnerRequestChoiceIntent('),end=code.indexOf('    function captureClassicalVerbalChoiceIntent(',start);
 const capture=vm.runInContext(code.slice(start,end)+'captureClassicalOwnerRequestChoiceIntent',context),captured=capture(control,'linked-connective-t');
 assert.ok(captured);assert.equal(captured.request.structure,'linked-connective-t');assert.equal(binding.callerSelections.structure,'integrated');
 const next=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'grammar:nominal-construction',captured.request);assert.equal(next.bindingStatus,'ready',next.blockReason);assert.equal(next.effectiveSelections.possessorOrientation,'embed');
 assert.equal(session.position.accepted.result,null);
 const entryStart=code.indexOf('    function getClassicalGrammarTypedSourceNncSelections('),entryEnd=code.indexOf('      // The accepted surface',entryStart);
 context.getActiveClassicalGrammarTypedSourceOperationBinding=()=>binding;context.targetObject.isClassicalGrammarTypedSourceOperationBindingFrame=owner.isClassicalGrammarTypedSourceOperationBindingFrame;
 context.projectOwnerOperationDecision=decision.projectOwnerOperationDecision;
 const read=vm.runInContext(code.slice(entryStart,entryEnd)+"return null;}\ngetClassicalGrammarTypedSourceNncSelections",context);
 assert.equal(read('grammar:nominal-construction',ingress),captured.request);
 assert.deepEqual(Object.keys(read('grammar:nominal-construction',{})),[]);
 const variant=binding.choiceOptionProjection.embedAnalysis.find(x=>x.optionId==='unexpected-variant');assert.equal(variant.availabilityStatus,'available');
 const pending=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'grammar:nominal-construction',variant.nextSelections);
 assert.equal(pending.bindingStatus,'choices-required',pending.blockReason);assert.deepEqual(pending.requiredChoiceIds,['variantStem']);assert.equal(pending.choiceOptionProjection.variantStem.inputKind,'text');assert.equal(pending.choiceOptionProjection.variantStem.editable,true);
 const supplied=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'grammar:nominal-construction',{...variant.nextSelections,variantStem:'cem'});assert.equal(supplied.bindingStatus,'ready',supplied.blockReason);
 const compoundForm=binding.choiceOptionProjection.embedUse.find(x=>x.optionId==='compound-form');
 const classless=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'grammar:nominal-construction',compoundForm.nextSelections);assert.equal(classless.bindingStatus,'ready',classless.blockReason);
 const classlessSnapshot=adapter.issueNominalOperationSnapshot(scope,{ingress,binding:classless});assert.equal(decision.projectOwnerOperationChoice(classlessSnapshot,'embedSourceClass').applicable,false);
 assert.equal(decision.projectOwnerOperationChoice(classlessSnapshot,'unknownField'),null);



});

test('compound subject reference is validated and projected by the participant owner without class-based reference inference',()=>{
 const base={constructionKind:'compound-nnc',structure:'integrated',embedRole:'association',subject:'1sg',state:'absolutive',animacy:'nonanimate',source:{embedStem:'cin',embedClass:'tli',embedSourceClass:'tli-1',matrixStem:'teō',matrixClass:'tl',matrixSourceClass:'tl-1-a'}};
 const contradictory=owner.evaluateClassicalNahuatlNominalConstruction(base);assert.equal(contradictory.authorizationStatus,'blocked');assert.match(contradictory.blockReason,/subject-reference/);
 assert.equal(contradictory.choiceOptionProjection.animacy.authoredValue,'nonanimate');
 const third=owner.evaluateClassicalNahuatlNominalConstruction({...base,subject:'3sg'});assert.equal(third.authorizationStatus,'authorized',third.blockReason);
 assert.equal(third.typedSlotFrame.slots.subject.participantFrame.animacy,'nonanimate');assert.equal(third.typedSlotFrame.slots.subject.participantFrame.humanness,'nonhuman');assert.equal(third.typedSlotFrame.slots.subject.participantFrame.morphologicalAgreement,'3sg');
 const contextual=owner.evaluateClassicalNahuatlNominalConstruction({...base,subject:'3pl',animacy:'animate'});assert.equal(contextual.authorizationStatus,'authorized',contextual.blockReason);assert.equal(contextual.typedSlotFrame.subjectAnimacy,'animate');
 const firstChoice=third.choiceOptionProjection.subject.options.find(x=>x.optionId==='1sg');assert.equal(firstChoice.availabilityStatus,'available');assert.equal(firstChoice.writeRequestValues.find(x=>x.path[0]==='animacy').value,'animate');
 const rawSource=owner.buildClassicalNahuatlNominalConstructionTypedSourceFrame({stem:'cin-teō',embedStem:'cin',matrixStem:'teō',sourceClass:'tl'}),rawIngress={},rawSession=createConstructionSession({isSource:x=>x===rawSource}),rawContext=Object.freeze({source:rawSource,ingress:rawIngress,committed:true});
 const rawScope=adapter.createNominalOperationScope({owner,source:rawSource,session:rawSession,getIngress:()=>rawIngress,sourceContext:rawContext,getSourceContext:()=>rawContext,presentation:{choices:{subject:{controlId:'subject'}}}});
 const raw=adapter.issueNominalOperationSnapshot(rawScope,{ingress:rawIngress,sourceContext:rawContext,request:{...base,subject:'3sg'}});
 assert.equal(raw.contract.ready,true,raw.contract.blockReason);
 const authored=decision.readOwnerOperationControlIntent(raw,{getElementById:()=>null},raw.contract.request,{id:'subject',tagName:'SELECT',value:'3sg'},'1sg');
 assert.equal(authored.subject,'1sg');assert.equal(authored.animacy,'animate');assert.equal(raw.contract.request.animacy,'nonanimate');
 const chosen=adapter.issueNominalOperationSnapshot(rawScope,{ingress:rawIngress,sourceContext:rawContext,request:authored});assert.equal(chosen.contract.ready,true,chosen.contract.blockReason);

 assert.equal(third.choiceOptionProjection.animacy.options.some(x=>x.optionId==='nonanimate'),true);
 const source=owner.buildClassicalNahuatlNominalConstructionTypedSourceFrame({stem:'cin-teō',embedStem:'cin',matrixStem:'teō',sourceClass:'tl'}),nav=owner.getClassicalGrammarApplicationCapabilityNavigator(source);
 const binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'grammar:nominal-construction',{embedUse:'nounstem',embedSourceClass:'tli-1',subject:'3sg',animacy:'nonanimate'});
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);const first=binding.choiceOptionProjection.subject.find(x=>x.optionId==='1sg');assert.equal(first.availabilityStatus,'available');assert.equal(first.nextSelections.animacy,'animate');
 assert.equal(owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'grammar:nominal-construction',first.nextSelections).bindingStatus,'ready');
 assert.equal(owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'grammar:nominal-construction',{...binding.callerSelections,subject:'1sg'}).bindingStatus,'rejected');
});


test('affective target decision shares matrix, reading, address and plural guards with actual execution',()=>{
 const request={constructionKind:'affective-nnc',affectRoute:'compound',affectiveMatrix:'tzin',subject:'3sg',state:'absolutive',animacy:'animate',semanticReading:'ordinary-affective',source:{embedStem:'cihuā',embedClass:'tl',embedSourceClass:'tl-1-a'}};
 const evaluate=changes=>owner.evaluateClassicalNahuatlNominalConstruction({...request,...changes});
 const frame=evaluate({});assert.equal(frame.authorizationStatus,'authorized',frame.blockReason);
 const values=(result,key)=>result.choiceOptionProjection[key].options.map(x=>x.optionId);
 assert.ok(frame.choiceOptionProjection?.affectiveMatrix);assert.ok(values(frame,'semanticReading').includes('compassion'));
 assert.equal(values(frame,'semanticReading').includes('pil-child'),false);
 const rejected=evaluate({affectiveMatrix:'pōl',semanticReading:'compassion'});assert.equal(rejected.authorizationStatus,'blocked');
 assert.equal(rejected.choiceOptionProjection.semanticReading.authoredValue,'compassion');assert.equal(values(rejected,'semanticReading').includes('compassion'),false);
 assert.equal(evaluate({affectiveMatrix:'pōl',semanticReading:'ordinary-affective'}).authorizationStatus,'authorized');
 assert.deepEqual(values(frame,'addressForm'),['none','full','abbreviated']);
 assert.deepEqual(values(evaluate({affectiveMatrix:'pōl'}),'addressForm'),['none','full']);
 const plural=evaluate({subject:'3pl',state:'possessive',possessor:'3sg'});assert.equal(plural.authorizationStatus,'authorized',plural.blockReason);
 assert.deepEqual(values(plural,'possessiveAffinityPlural'),['hu-ān','silent']);
 assert.equal(plural.operationFrame.reduplication,'affinity');
 const nonanimate=evaluate({subject:'3pl',animacy:'nonanimate',reduplication:'none'});assert.equal(nonanimate.authorizationStatus,'authorized',nonanimate.blockReason);
 assert.equal(nonanimate.choiceOptionProjection.nonanimateReduplicationReading.applicable,true);
 assert.equal(nonanimate.typedSlotFrame?.subjectNumber || nonanimate.canonicalResult.nncSlotFrame.subjectNumber,'plural');
 const contradictory=evaluate({subject:'1sg',animacy:'nonanimate'});assert.equal(contradictory.authorizationStatus,'blocked');assert.match(contradictory.blockReason,/subject-reference/);
 assert.deepEqual(values(contradictory,'animacy'),['animate']);
 const first=nonanimate.choiceOptionProjection.subject.options.find(option=>option.optionId==='1sg');assert.equal(first.writeRequestValues.find(write=>write.path[0]==='animacy').value,'animate');
 const commonChoice=evaluate({subject:'3sg',animacy:'animate'}).choiceOptionProjection.subject.options.find(option=>option.optionId==='3common');
 assert.equal(commonChoice.writeRequestValues.find(write=>write.path[0]==='animacy').value,'nonanimate');
 assert.equal(evaluate({subject:'3common',animacy:commonChoice.writeRequestValues.find(write=>write.path[0]==='animacy').value}).authorizationStatus,'authorized');
 const firstCorrected=evaluate({subject:'1sg',animacy:'animate'});assert.equal(firstCorrected.authorizationStatus,'authorized');assert.equal(firstCorrected.canonicalResult.nncSlotFrame.slots.subject.participantFrame.animacy,'animate');
 const badReading=evaluate({subject:'3pl',animacy:'nonanimate',reduplication:'none',nonanimateReduplicationReading:'forged'});assert.equal(badReading.authorizationStatus,'blocked');
 assert.equal(badReading.choiceOptionProjection.nonanimateReduplicationReading.authoredValue,'forged');
 const pil={...request,source:{embedStem:'pil',embedClass:'tli',embedSourceClass:'tli-1'},semanticReading:'pil-child',pilChildRoute:'simple'};
 const child=owner.evaluateClassicalNahuatlNominalConstruction(pil);assert.equal(child.authorizationStatus,'blocked');
 assert.deepEqual(values(child,'pilChildRoute'),['affective']);
 const recovered=owner.evaluateClassicalNahuatlNominalConstruction({...pil,pilChildRoute:'affective'});assert.equal(recovered.authorizationStatus,'authorized',recovered.blockReason);
 assert.equal(values(recovered,'affectiveMatrix').includes('zol'),false);
 const badAffinity=evaluate({affinityEmbedSelected:true});assert.equal(badAffinity.authorizationStatus,'blocked');
 assert.deepEqual(values(badAffinity,'affinityEmbedSelected'),[false]);
});

test('affective address intent is captured once and survives old DOM values with exact Source and accepted Result intact',()=>{
 const source=owner.buildClassicalNahuatlPronominalNncSourceFrame({stem:'īn'}),operation=owner.buildClassicalNahuatlPronominalNncOperationFrame(source,{subject:'3common',clausePosition:'initial',adjunctorInMode:'none',sentenceType:'statement',polarity:'positive'});
 const parent=owner.executeClassicalGrammarApplicationRequest({operationId:'nnc:pronominal',args:[source,operation]}).canonicalResult;
 const binding=owner.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',parent),selectedBindingId='affective-nnc:embed-result';
 const request={constructionKind:'affective-nnc',affectiveMatrix:'tzin',affectRoute:'compound',subject:'3sg',state:'vocative',vocativeState:'possessive',vocativeForm:'full',source:{embedStem:'īn',embedClass:'zero',embedSourceClass:'zero',embedConstituent:{kind:'demonstrative-pronominal-nnc',stem:'īn',resultFrame:parent}}};
 const ingress={},session=createConstructionSession({isSource:x=>x===parent}),scope=adapter.createNominalOperationScope({owner,source:parent,session,getIngress:()=>ingress,presentation:{choices:{addressForm:{controlId:'address'}}}});
 const snapshot=adapter.issueNominalOperationSnapshot(scope,{ingress,binding,selectedBindingId,request});assert.equal(snapshot.contract.ready,true,snapshot.contract.blockReason);
 session.stage({source:parent,route:{operation:'grammar:nominal-construction',binding:selectedBindingId},operationContract:snapshot,slots:snapshot.captures,ready:true,execution:adapter.projectNominalOperationExecution(snapshot)});
 const accepted=session.position.accepted,control={id:'address',tagName:'SELECT',value:'full'};
 const captured=decision.readOwnerOperationControlIntent(snapshot,{getElementById:()=>control},snapshot.contract.request,control,'none');
 assert.equal(captured.state,'possessive');assert.equal(captured.vocativeForm,'full');assert.equal(captured.source.embedConstituent.resultFrame,parent);
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),start=code.indexOf('    function buildClassicalNominalConstructionUiRequest('),end=code.indexOf('    function readClassicalNominalConstructionDraft(',start);
 const context=vm.createContext({ClassicalConstructionSession:session,readClassicalNominalConstructionDraft:()=>request,getClassicalRetainedOwnerRequest:()=>captured});
 const read=vm.runInContext(code.slice(start,end)+'buildClassicalNominalConstructionUiRequest',context),retained=read();
 assert.equal(retained.state,'possessive');assert.equal(retained.source.embedConstituent.resultFrame,parent);
 const recovered=adapter.issueNominalOperationSnapshot(scope,{ingress,binding,selectedBindingId,request:{...retained}});assert.equal(recovered.contract.ready,true,recovered.contract.blockReason);
 assert.equal(session.position.accepted,accepted);assert.equal(snapshot.contract.request.state,'vocative');
 const canStart=code.indexOf('    function canClassicalNominalNativeChoice('),canEnd=code.indexOf('    const ClassicalIssuedBindingSnapshots',canStart);
 const frames=new WeakMap([[control,{snapshot,frame:adapter.captureNominalOperationChoiceFrame(snapshot)}]]);
 control.closest=selector=>selector==='#classical-rule-logic-controls'?{}:null;control.isConnected=true;control.disabled=false;
 const can=vm.runInNewContext(code.slice(canStart,canEnd)+'canClassicalNominalNativeChoice',{ClassicalConstructionSession:session,ClassicalNominalNativeChoiceFrames:frames,targetObject:{document:{getElementById:()=>control}},
  isFinalSourceOperation:()=>false,isCurrentNominalOperationSnapshot:adapter.isCurrentNominalOperationSnapshot,
  findOwnerOperationControlChoice:decision.findOwnerOperationControlChoice,readOwnerOperationControlValue:decision.readOwnerOperationControlValue,isOwnerOperationChoiceAllowed:decision.isOwnerOperationChoiceAllowed});
 assert.equal(can(control),true);control.value='forged';assert.equal(can(control),false);
 const partControls=Object.fromEntries([['person','3',['1','2','3']],['number','common',['singular','common','plural']]].map(([id,value,values])=>[id,{id,value,tagName:'SELECT',dataset:{},options:values.map(value=>({value})),setAttribute(){},appendChild(option){this.options.push(option);}}]));
 const document={getElementById:id=>partControls[id],createElement:()=>({})};Object.values(partControls).forEach(control=>control.ownerDocument=document);
 const partScope=adapter.createNominalOperationScope({owner,source:parent,session,getIngress:()=>ingress,presentation:{choices:{subject:{controlParts:[{controlId:'person',part:'person'},{controlId:'number',part:'number'}]}}}});
 const partSnapshot=adapter.issueNominalOperationSnapshot(partScope,{ingress,binding,selectedBindingId,request:{...request,state:'absolutive',subject:'3common',animacy:'nonanimate'}});
 assert.equal(partSnapshot.contract.ready,true,partSnapshot.contract.blockReason);
 decision.syncOwnerOperationDecisionControls(partSnapshot,document);
 assert.equal(partControls.person.options.find(option=>option.value==='1').hidden,true);
 assert.deepEqual(partControls.person.options.filter(option=>!option.hidden).map(option=>option.value),decision.projectOwnerOperationControlMove(partSnapshot,partControls.person).values);
 assert.equal(partControls.number.options.find(option=>option.value==='singular').hidden,false);

});
