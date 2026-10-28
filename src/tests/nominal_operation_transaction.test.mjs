import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const moduleUrl=new URL('../ui/composition/nominal_operation_transaction.mjs',import.meta.url);
const a=await import(moduleUrl).catch(error=>{if(error.code==='ERR_MODULE_NOT_FOUND')return {};throw error;});
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function noun(stem){const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tli-1'});const operation=owner.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{state:'absolutive',subject:'3sg',predicateFormation:'source-stem',humanness:'human'});const app=owner.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,operation]});assert.equal(app.authorizationStatus,'authorized',app.blockReason);assert.ok(app.canonicalResult);return app.canonicalResult;}
function fixture(){
 const embed=noun('pil'),matrix=owner.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:'caqui',verbClass:'B',sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3sg',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]}).canonicalResult;
 const request={constructionKind:'nominal-embed-vnc',relation:'object',route:'object',subject:'3sg',mood:'indicative',tense:'present',voice:'active',embedReduplication:'none',matrixFormation:'ordinary',matrixReduplication:'none',orientation:'not-applicable',source:{embedStem:'pil',embedClass:'tli',embedSourceClass:'tli-1',embedConstituent:{kind:'ordinary-nnc',stem:'pil',resultFrame:embed},matrixStem:'caqui',matrixValence:'specific-projective',matrixVerbClass:'B',matrixConstituent:{kind:'vnc-result',stem:'caqui',resultFrame:matrix}}};
 const binding=owner.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',matrix,{});
 return {embed,matrix,request,binding};
}
test('nominal exact snapshot retains the one owner-validated request and both exact parents without accepting preview',()=>{
 assert.equal(typeof a.createNominalOperationScope,'function','nominal adapter required');
 const f=fixture(),session=createConstructionSession({isSource:x=>x===f.matrix||x===f.embed,isResult:x=>x===f.embed});session.restore(f.embed);
 const ingress={},scope=a.createNominalOperationScope({owner,source:f.matrix,session,getIngress:()=>ingress});
 const snapshot=a.issueNominalOperationSnapshot(scope,{ingress,request:f.request,binding:f.binding,selectedBindingId:'nominal-embed:matrix-vnc-result',additionalResults:{'nominal-embed-constituent':f.embed}});
 assert.ok(snapshot);assert.equal(snapshot.contract.ready,true,snapshot.contract.blockReason);assert.equal(snapshot.contract.request.source.matrixConstituent.resultFrame,f.matrix);assert.equal(snapshot.contract.request.source.embedConstituent.resultFrame,f.embed);
 assert.notEqual(snapshot.contract.request,f.request);assert.ok(Object.isFrozen(snapshot.contract.request.source));f.request.voice='passive';assert.equal(snapshot.contract.request.voice,'active');
 session.stage({source:f.matrix,route:{operation:'grammar:nominal-construction'},slots:snapshot.captures,operationContract:snapshot,ready:true});assert.equal(a.isCurrentNominalOperationSnapshot(snapshot),true);assert.equal(session.position.accepted.result,f.embed);
 const event=a.captureNominalOperationChoiceFrame(snapshot);assert.ok(event);assert.equal(a.isCurrentNominalOperationSnapshot(snapshot,{...event}),false);
 const reissued=owner.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',f.matrix,{});assert.notEqual(reissued===f.binding,true);const newer=a.issueNominalOperationSnapshot(scope,{ingress,request:snapshot.contract.request,binding:reissued,selectedBindingId:'nominal-embed:matrix-vnc-result',additionalResults:{'nominal-embed-constituent':f.embed}});session.stage({source:f.matrix,route:{operation:'grammar:nominal-construction'},slots:newer.captures,operationContract:newer,ready:true});assert.equal(a.isCurrentNominalOperationSnapshot(snapshot,event),false);
});
test('copied nominal binding or exact parent cannot acquire ready snapshot custody',()=>{
 assert.equal(typeof a.createNominalOperationScope,'function');const f=fixture(),session=createConstructionSession({isSource:()=>true}),ingress={};const scope=a.createNominalOperationScope({owner,source:f.matrix,session,getIngress:()=>ingress});
 assert.equal(a.issueNominalOperationSnapshot(scope,{ingress,request:f.request,binding:{...f.binding},selectedBindingId:'nominal-embed:matrix-vnc-result',additionalResults:{'nominal-embed-constituent':f.embed}}),null);
 const copied={...f.embed},request={...f.request,source:{...f.request.source,embedConstituent:{resultFrame:copied}}};const bad=a.issueNominalOperationSnapshot(scope,{ingress,request,binding:f.binding,selectedBindingId:'nominal-embed:matrix-vnc-result',additionalResults:{'nominal-embed-constituent':copied}});assert.ok(!bad||!bad.contract.ready);
});

test('misplaced exact parent is not a role and shallow frozen intent cannot mutate retained request',()=>{
 const f=fixture(),session=createConstructionSession({isSource:()=>true}),ingress={},scope=a.createNominalOperationScope({owner,source:f.matrix,session,getIngress:()=>ingress});
 const options={ingress,binding:f.binding,selectedBindingId:'nominal-embed:matrix-vnc-result',additionalResults:{'nominal-embed-constituent':f.embed}};
 const misplaced={...f.request,source:{...f.request.source,embedConstituent:{resultFrame:{...f.embed}},ignoredParent:f.embed}};
 assert.equal(a.issueNominalOperationSnapshot(scope,{...options,request:misplaced}),null);
 const extra={value:'original'},request=Object.freeze({...f.request,unusedIntent:extra});
 const snapshot=a.issueNominalOperationSnapshot(scope,{...options,request});assert.ok(snapshot);extra.value='changed';assert.equal(snapshot.contract.request.unusedIntent.value,'original');assert.ok(Object.isFrozen(snapshot.contract.request.unusedIntent));
});
test('typed cardinal binding retains issued choices and fails closed for copied or wrong Source binding',()=>{
 const source=owner.buildClassicalNahuatlNominalConstructionTypedSourceFrame({value:3}),navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(source);
 const binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'grammar:nominal-construction',{countKind:'ordinary',classifier:'basic',animacy:'animate',subject:'1pl'});
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);
 const session=createConstructionSession({isSource:x=>x===source}),scope=a.createNominalOperationScope({owner,source,session,getIngress:()=>navigator});
 const s=a.issueNominalOperationSnapshot(scope,{ingress:navigator,binding});assert.ok(s);assert.equal(s.routeId,'cardinal-numeral-nnc');assert.equal(s.contract.binding,binding);assert.equal(s.contract.ready,true);assert.equal(s.contract.choices,binding.choiceOptionProjection);
 assert.equal(a.issueNominalOperationSnapshot(scope,{ingress:navigator,binding:{...binding}}),null);
 const other=owner.buildClassicalNahuatlNominalConstructionTypedSourceFrame({value:5});const wrong=a.createNominalOperationScope({owner,source:other,session,getIngress:()=>navigator});assert.equal(a.issueNominalOperationSnapshot(wrong,{ingress:navigator,binding}),null);
});
test('missing exact required input stays staged and owner-validated recovery retains the same primary',()=>{
 const f=fixture(),session=createConstructionSession({isSource:x=>x===f.matrix||x===f.embed}),ingress={},scope=a.createNominalOperationScope({owner,source:f.matrix,session,getIngress:()=>ingress});
 const request={...f.request,source:{...f.request.source,embedConstituent:undefined}};
 const missing=a.issueNominalOperationSnapshot(scope,{ingress,request,binding:f.binding,selectedBindingId:'nominal-embed:matrix-vnc-result'});assert.ok(missing);assert.equal(missing.contract.ready,false);assert.deepEqual(missing.contract.requiredResultRoles,['nominal-embed-constituent']);
 const restored=a.issueNominalOperationSnapshot(scope,{ingress,request:f.request,binding:f.binding,selectedBindingId:'nominal-embed:matrix-vnc-result',additionalResults:{'nominal-embed-constituent':f.embed}});assert.ok(restored.contract.ready);assert.equal(restored.source,missing.source);
});
test('preview and Make consume the snapshot request, never a later mutable native draft',()=>{
 assert.equal(typeof a.projectNominalOperationExecution,'function');const f=fixture(),session=createConstructionSession({isSource:x=>x===f.matrix||x===f.embed}),ingress={},scope=a.createNominalOperationScope({owner,source:f.matrix,session,getIngress:()=>ingress});
 const snapshot=a.issueNominalOperationSnapshot(scope,{ingress,request:f.request,binding:f.binding,selectedBindingId:'nominal-embed:matrix-vnc-result',additionalResults:{'nominal-embed-constituent':f.embed}}),packet=a.projectNominalOperationExecution(snapshot);
 assert.ok(packet);assert.equal(packet.request.args[0],snapshot.contract.request);assert.equal(packet.source,f.matrix);assert.equal(packet.operation,'grammar:nominal-construction');f.request.voice='passive';assert.equal(packet.request.args[0].voice,'active');
 assert.equal(a.projectNominalOperationExecution({...snapshot}),null);
 const made=owner.executeClassicalGrammarApplicationRequest(packet.request);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(made.canonicalResult.sourceAuthorizationFrame.lexicalFacts.capturedEmbedResult,f.embed);assert.equal(made.canonicalResult.sourceAuthorizationFrame.lexicalFacts.capturedMatrixVncResult,f.matrix);
});
test('raw owner request requires current committed Source ingress, including same-spelling replacement',()=>{
 const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'pil',sourceClass:'tli-1'}),ingress={},session=createConstructionSession({isSource:x=>x===source});
 let context=Object.freeze({source,ingress,committed:true,declaration:Object.freeze({mode:'whole',sourceWholeStem:'pil'})});
 const scope=a.createNominalOperationScope({owner,source,session,getIngress:()=>context.ingress,sourceContext:context,getSourceContext:()=>context});
 const request={constructionKind:'affective-nnc',affectRoute:'compound',affectiveMatrix:'tzin',semanticReading:'pil-child',pilChildRoute:'affective',pilGenderSpecification:'unspecified',reduplication:'none',subject:'3sg',state:'absolutive',animacy:'animate',source:{embedStem:'pil',embedClass:'tli',embedSourceClass:'tli-1',initialIAnalysis:'real',affectiveMatrix:'tzin',animacy:'animate'}};
 const snapshot=a.issueNominalOperationSnapshot(scope,{ingress,request,sourceContext:context});assert.ok(snapshot);assert.equal(snapshot.contract.ready,true,snapshot.contract.blockReason);assert.equal(owner.isClassicalNahuatlNominalConstructionSourceAuthorization(snapshot.contract.sourceAuthorization),true);
 const withoutRequest={...owner,getClassicalNahuatlNominalConstructionReloadInputs:()=>null};const unavailableScope=a.createNominalOperationScope({owner:withoutRequest,source,session,getIngress:()=>ingress,sourceContext:context,getSourceContext:()=>context});const unavailable=a.issueNominalOperationSnapshot(unavailableScope,{ingress,request,sourceContext:context});assert.ok(unavailable);assert.equal(unavailable.contract.ready,false);assert.equal(a.projectNominalOperationExecution(unavailable),null);
 session.stage({source,route:{operation:'grammar:nominal-construction'},slots:snapshot.captures,operationContract:snapshot,ready:true});const event=a.captureNominalOperationChoiceFrame(snapshot);assert.ok(event);
 session.stage({source,sourcePending:true,route:{operation:'grammar:nominal-construction'},operationContract:snapshot,ready:false});assert.equal(a.isCurrentNominalOperationSnapshot(snapshot,event),false);
 context=Object.freeze({...context,ingress:{}});assert.equal(a.projectNominalOperationExecution(snapshot),null,'revoked Apply context cannot project execution');assert.equal(a.issueNominalOperationSnapshot(scope,{ingress:context.ingress,request,sourceContext:context}),null,'same spelling does not transfer prior Apply context');
});
test('nominal typed candidate adoption requires the authentic current event and owner binding',()=>{
 assert.equal(typeof a.adoptNominalOperationCandidate,'function');const source=owner.buildClassicalNahuatlNominalConstructionTypedSourceFrame({value:3}),ingress=owner.getClassicalGrammarApplicationCapabilityNavigator(source),session=createConstructionSession({isSource:x=>x===source}),scope=a.createNominalOperationScope({owner,source,session,getIngress:()=>ingress});
 const issue=subject=>owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'grammar:nominal-construction',{countKind:'ordinary',classifier:'basic',animacy:'animate',subject});
 const s=a.issueNominalOperationSnapshot(scope,{ingress,binding:issue('1pl')});session.stage({source,route:{operation:'grammar:nominal-construction'},slots:s.captures,operationContract:s,ready:true});const event=a.captureNominalOperationChoiceFrame(s),binding=issue('2pl');
 assert.ok(a.adoptNominalOperationCandidate(s,{binding},event));assert.equal(a.adoptNominalOperationCandidate(s,{binding},{...event}),null);assert.equal(a.adoptNominalOperationCandidate(s,{binding:{...binding}},event),null);
});
test('calendar boundary and both adjectival branches retain their distinct owner roles',()=>{
 const ordinary=(stem,sourceClass)=>{const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});const app=owner.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,owner.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive'})]});assert.equal(app.authorizationStatus,'authorized',app.blockReason);return app.canonicalResult;};
 const numeral=owner.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[{constructionKind:'cardinal-numeral-nnc',value:1,classifier:'basic',countKind:'ordinary',subject:'3common',state:'absolutive',animacy:'nonanimate'}]}).canonicalResult,day=ordinary('cipac','tli-1');
 const ingress={},session=createConstructionSession({isSource:x=>x===numeral||x===day}),scope=a.createNominalOperationScope({owner,source:numeral,session,getIngress:()=>ingress}),binding=owner.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',numeral,{});
 for(const calendarBoundary of ['double-nucleus','single-nucleus']){
  const s=a.issueNominalOperationSnapshot(scope,{ingress,binding,selectedBindingId:'calendar-date:numeral-result',additionalResults:{'calendar-day-sign-result':day},request:{constructionKind:'calendar-date-nnc',calendarBoundary,source:{numeralResult:numeral,daySignResult:day}}});assert.ok(s);assert.equal(s.contract.ready,true,s.contract.blockReason);assert.equal(s.contract.preview.sourceAuthorizationFrame.lexicalFacts.capturedDaySignResult,day);assert.equal(s.contract.request.calendarBoundary,calendarBoundary);
 }
 const parent=ordinary('tepi','zero'),ss=createConstructionSession({isSource:x=>x===parent}),scope2=a.createNominalOperationScope({owner,source:parent,session:ss,getIngress:()=>ingress}),b=owner.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',parent,{});
 for(const adjectivalOperation of ['quality-intensification','distribution-variety']){
  const s=a.issueNominalOperationSnapshot(scope2,{ingress,binding:b,selectedBindingId:'adjectival-nnc:source-result',request:{constructionKind:'adjectival-nnc',source:{canonicalNncResult:parent},adjectivalOperation,operationScope:'whole',subject:'3sg',state:'absolutive',animacy:'animate'}});assert.ok(s);assert.equal(s.contract.ready,true,s.contract.blockReason);assert.equal(s.routeId,`adjectival-nnc:${adjectivalOperation}`);assert.equal(s.captures[0].role,'adjectival-source-result');assert.equal(s.contract.preview.sourceAuthorizationFrame.lexicalFacts.capturedAdjectivalNncResult,parent);
 }
});
test('contextual flawed-subject request preserves the existing owners exact negative and nominal source',()=>{
 const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'hueli',sourceClass:'tl'}),negative=owner.executeClassicalGrammarApplicationRequest({operationId:'particle:negative-selection',args:[{polarity:'negative',sentenceKind:'statement'}]}).canonicalResult,context=owner.issueClassicalNahuatlContextualFlawedSubjectSourceFrame(source,negative);assert.equal(context.authorizationStatus,'authorized',context.blockReason);
 const ingress={},sourceContext=Object.freeze({source,ingress,committed:true}),session=createConstructionSession({isSource:x=>x===source}),scope=a.createNominalOperationScope({owner,source,session,getIngress:()=>ingress,sourceContext,getSourceContext:()=>sourceContext});
 const request={constructionKind:'affective-nnc',affectRoute:'flawed-subject',subject:'3common',state:'absolutive',animacy:'unspecified',source:{embedStem:'hueli',embedClass:'tl',embedSourceClass:'tl',canonicalNncSourceFrame:source,contextualFlawedSubjectSourceFrame:context}};
 const s=a.issueNominalOperationSnapshot(scope,{ingress,sourceContext,request});assert.ok(s);assert.equal(s.contract.ready,true,s.contract.blockReason);assert.equal(s.contract.request.source.contextualFlawedSubjectSourceFrame,context);assert.equal(s.contract.request.source.canonicalNncSourceFrame,source);
 assert.equal(s.contract.request===owner.getClassicalNahuatlNominalConstructionReloadInputs(s.contract.preview),true,'reuse owner-retained immutable request');
 assert.equal(a.issueNominalOperationSnapshot(scope,{ingress,sourceContext,request:{...request,source:{...request.source,contextualFlawedSubjectSourceFrame:{...context}}}}),null);
});
test('ordinary and flawed subject alternatives use the existing source facts without inventing a choice domain',()=>{
 const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'tzapa',sourceClass:'tl'}),ingress={},sourceContext=Object.freeze({source,ingress,committed:true}),session=createConstructionSession({isSource:x=>x===source}),scope=a.createNominalOperationScope({owner,source,session,getIngress:()=>ingress,sourceContext,getSourceContext:()=>sourceContext});
 const base={constructionKind:'affective-nnc',affectiveMatrix:'',semanticReading:'ordinary-affective',defectAnalysis:'defect',subject:'3sg',state:'absolutive',animacy:'animate',source:{embedStem:'tzapa',embedClass:'tl',embedSourceClass:'tl'}};
 const facts=owner.getClassicalNahuatlFlawedSubjectSourceFacts(base);assert.equal(facts.authorizationStatus,'authorized',facts.blockReason);assert.ok(facts.flawedSubjectAnalysis);
 for(const affectRoute of ['ordinary-subject','flawed-subject']){
  const request={...base,affectRoute,source:{...base.source,flawedSubjectAnalysis:facts.flawedSubjectAnalysis}},s=a.issueNominalOperationSnapshot(scope,{ingress,sourceContext,request});assert.ok(s);assert.equal(s.contract.ready,true,s.contract.blockReason);assert.equal(s.routeId,`affective-nnc:${affectRoute}`);assert.equal(s.contract.request.source.flawedSubjectAnalysis.availability,facts.flawedSubjectAnalysis.availability);
 }
});
test('compound typed and exact ingresses preserve the same owner operation without interchangeable authority',()=>{
 const source=owner.buildClassicalNahuatlNominalConstructionTypedSourceFrame({stem:'cin-teō',embedStem:'cin',matrixStem:'teō',sourceClass:'tl'});assert.ok(source);const ingress=owner.getClassicalGrammarApplicationCapabilityNavigator(source),binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'grammar:nominal-construction',{embedUse:'nounstem',embedSourceClass:'tli-1',subject:'3sg',animacy:'animate'});assert.equal(binding.bindingStatus,'ready',binding.blockReason);
 const session=createConstructionSession({isSource:x=>x===source}),scope=a.createNominalOperationScope({owner,source,session,getIngress:()=>ingress}),typed=a.issueNominalOperationSnapshot(scope,{ingress,binding});assert.ok(typed?.contract.ready);assert.equal(typed.routeId,'compound-nnc');
 const ordinary=(stem,sourceClass,subject)=>{const sf=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass}),app=owner.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[sf,owner.buildClassicalNahuatlOrdinaryNncOperationFrame(sf,{subject,state:'absolutive'})]});assert.equal(app.authorizationStatus,'authorized',app.blockReason);return app.canonicalResult;};
 const embed=ordinary('cin','tli-1','3common'),matrix=ordinary('teō','tl-1-a','3sg'),nav=owner.getClassicalGrammarApplicationCapabilityNavigator(embed),ss=createConstructionSession({isSource:x=>x===embed||x===matrix}),sc=a.createNominalOperationScope({owner,source:embed,session:ss,getIngress:()=>nav}),b=owner.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',embed,{});
 const request={constructionKind:'compound-nnc',structure:'integrated',embedRole:'association',possessorOrientation:'matrix',reduplication:'none',bracketing:'unambiguous',subject:'3sg',state:'absolutive',animacy:'animate',source:{embedStem:'cin',embedClass:'tli',embedSourceClass:'tli-1',embedConstituent:{kind:'ordinary-nnc',stem:'cin',resultFrame:embed},matrixStem:'teō',matrixClass:'tl',matrixSourceClass:'tl-1-a',matrixConstituent:{kind:'ordinary-nnc',stem:'teō',resultFrame:matrix}}};
 const exact=a.issueNominalOperationSnapshot(sc,{ingress:nav,request,binding:b,selectedBindingId:'compound-nnc:embed-result',additionalResults:{'compound-matrix-constituent':matrix}});assert.ok(exact);assert.equal(exact.contract.ready,true,exact.contract.blockReason);assert.equal(exact.contract.preview.sourceAuthorizationFrame.lexicalFacts.capturedMatrixNncResult,matrix);assert.equal(a.issueNominalOperationSnapshot(sc,{ingress:nav,binding}),null);
});
test('lexical conjunction handoff retains whole Source and both owner-defined members',()=>{
 const noun=stem=>{const sf=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:stem==='tlāca'?'tl-1-a':'tli-1'});return owner.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[sf,owner.buildClassicalNahuatlOrdinaryNncOperationFrame(sf,{subject:'3sg',state:'absolutive'})]}).canonicalResult;};
 const first=noun('tlāca'),second=noun('cipac'),controller=owner.createClassicalClauseRelationController();controller.captureCurrentResult('principal',first);controller.captureCurrentResult('adjoined',second);const app=controller.compose({relation:'lexical-conjunction',lexicalType:'lord-and-master',adjunctorDistribution:'none',stateRealization:'compound-handoff'});assert.equal(app.authorizationStatus,'authorized',app.blockReason);const source=app.canonicalResult,binding=owner.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',source,{}),choice=binding.bindingChoices.find(x=>x.id==='compound-nnc:lexical-conjunction');assert.ok(choice);
 const ingress={},session=createConstructionSession({isSource:x=>x===source}),scope=a.createNominalOperationScope({owner,source,session,getIngress:()=>ingress}),request={constructionKind:'compound-nnc',structure:'conjunctive',subject:'1sg',state:'absolutive',source:choice.lexicalConjunctionSource};
 const snapshot=a.issueNominalOperationSnapshot(scope,{ingress,request,binding,selectedBindingId:choice.id});assert.ok(snapshot);assert.equal(snapshot.contract.ready,true,snapshot.contract.blockReason);const facts=snapshot.contract.preview.sourceAuthorizationFrame.lexicalFacts;assert.equal(facts.capturedLexicalConjunctionResult,source);assert.equal(facts.capturedEmbedResult,first);assert.equal(facts.capturedMatrixNncResult,second);assert.equal(source.relationFrame.lexicalInterpretationIndependentlyValidated,false,'engineering conjunction remains explicitly unclaimed as lexical attestation');
});
