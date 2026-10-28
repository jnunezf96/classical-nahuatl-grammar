import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {createVerbalDerivationScope,issueVerbalDerivationSnapshot,projectVerbalDerivationExecution} from '../ui/composition/verbal_derivation_transaction.mjs';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('exact frequentative custody uses issued continuation args and rejects copied binding',()=>{
 const source=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 assert.equal(source.authorizationStatus,'authorized');
 const binding=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,{lateOperation:'frequentative',lateVariant:'ordinary-short-glottal'});
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);
 let ingress={};const session=createConstructionSession({isSource:x=>x===source});
 const scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress});
 const snapshot=issueVerbalDerivationSnapshot(scope,{ingress,binding});
 assert.ok(snapshot?.contract.ready);const execution=projectVerbalDerivationExecution(snapshot);
 assert.equal(execution.request.args,binding.executionArgs);
 assert.equal(issueVerbalDerivationSnapshot(scope,{ingress,binding}),snapshot);
 assert.equal(issueVerbalDerivationSnapshot(scope,{ingress,binding:{...binding}}),null);
 ingress={};assert.equal(projectVerbalDerivationExecution(snapshot),null);
});
test('prepared raw honorific remains exact owner capability, current Apply context required',()=>{
 const request={sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',sourceSubject:'3sg',sourceSubjectHumanness:'human',sourceSubjectAnimacy:'animate',mood:'indicative',tense:'present',voice:'active',lateOperation:'honorific',lateVariant:'causative',honoredParticipant:'subject',honorificFormationAnalysis:'causative-only',honorificStemAlternative:'type-two-long'};
 const prepared=owner.prepareClassicalGrammarApplicationRequest({operationId:'vnc:derivational-operation',args:[request]});assert.equal(prepared.authorizationStatus,'authorized');
 const source=owner.evaluateClassicalNahuatlVncApplication({...request,requestedDerivation:'direct',requestedVoice:'active'}).resultFrame.sourceMachineryFrame;
 const ingress=owner.getClassicalGrammarApplicationCapabilityNavigator(source),session=createConstructionSession({isSource:x=>x===source});let context=Object.freeze({source,ingress,committed:true});
 const scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress,getSourceContext:()=>context});
 const input={ingress,request,sourceContext:context,prepared};const snapshot=issueVerbalDerivationSnapshot(scope,input);assert.ok(snapshot?.contract.ready);
 const p=projectVerbalDerivationExecution(snapshot);assert.equal(p.prepared,prepared);assert.equal(p.request,prepared.request);assert.equal(snapshot.contract.preview,prepared.canonicalResult);
 assert.equal(issueVerbalDerivationSnapshot(scope,{...input,prepared:{...prepared}}),null);
 assert.equal(issueVerbalDerivationSnapshot(scope,{...input,request:{...request,lateVariant:'different'}}),null);
 context=Object.freeze({...context});assert.equal(projectVerbalDerivationExecution(snapshot),null);
});
test('production packet fails closed without snapshot and uses exact issued execution request',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
 const {freezeConstructionData}=await import('../ui/composition/construction_packet.mjs');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const fn=code.slice(code.indexOf('    function captureClassicalConstructionPacket('),code.indexOf('    function syncClassicalPositionFixedChoices('));
 const source=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const binding=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,{lateOperation:'frequentative',lateVariant:'ordinary-short-glottal'});
 const ingress={},session=createConstructionSession({isSource:x=>x===source}),scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress}),snapshot=issueVerbalDerivationSnapshot(scope,{ingress,binding});
 const ctx=vm.createContext({isFinalSourceOperation:()=>false,isParticleOperation:()=>false,targetObject:owner,PendingClassicalOrdinaryGrammarBinding:null,captureClassicalPositionLayers:()=>[],projectVerbalDerivationExecution,ClassicalPositionSources:new WeakSet([source]),getClassicalOwnerIssuedResultProjection:()=>null,getClassicalPositionIdentity:()=>1,freezeConstructionData});vm.runInContext(fn,ctx);
 assert.equal(ctx.captureClassicalConstructionPacket('vnc:derivational-operation',source,null,null),null);
 const packet=ctx.captureClassicalConstructionPacket('vnc:derivational-operation',source,null,null,null,null,snapshot);
 assert.equal(packet.request.args[0],binding.executionArgs[0]);assert.equal(packet.source,source);
});
test('six exact route contracts preserve owner execution and incomplete compound recovery',()=>{
 const source=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const ingress={},session=createConstructionSession({isSource:x=>x===source}),scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress});
 const cases=[{lateOperation:'frequentative',lateVariant:'ordinary-short-glottal'},{lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'yāuh'},{lateOperation:'purposive',purposiveSeries:'outbound-nonpast-indicative',lateVariant:'outbound-nonpast-indicative'},{lateOperation:'honorific',lateVariant:'causative',honoredParticipant:'subject',honorificFormationAnalysis:'causative-only'},{lateOperation:'pejorative',lateVariant:'preterit-embed',honoredParticipant:'subject'}];
 let honorific;
 for(const choices of cases){const b=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,choices);assert.equal(b.bindingStatus,'ready',`${choices.lateOperation}: ${b.blockReason}`);const s=issueVerbalDerivationSnapshot(scope,{ingress,binding:b});assert.equal(s.routeId,choices.lateOperation);const p=projectVerbalDerivationExecution(s);assert.equal(p.request.args,b.executionArgs);if(choices.lateOperation==='honorific')honorific=owner.executeClassicalGrammarApplicationRequest(p.request).canonicalResult;}
 const reverential=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',honorific,{lateOperation:'reverential'});assert.equal(reverential.bindingStatus,'ready',reverential.blockReason);
 const nextScope=createVerbalDerivationScope({owner,source:honorific,session,getIngress:()=>ingress});assert.equal(issueVerbalDerivationSnapshot(nextScope,{ingress,binding:reverential}).routeId,'reverential');
 const missing=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,{lateOperation:'compound',lateVariant:'connective-t'}),blocked=issueVerbalDerivationSnapshot(scope,{ingress,binding:missing});assert.ok(blocked);assert.equal(blocked.contract.ready,false);assert.equal(projectVerbalDerivationExecution(blocked),null);
});
test('typed compound Source binding and incomplete recovery retain actual owner request',()=>{
 const source=owner.buildClassicalNahuatlCompoundPredicateSourceFrame({sourceStem:'cac'}),ingress=owner.getClassicalGrammarApplicationCapabilityNavigator(source);
 const session=createConstructionSession({isSource:x=>x===source}),scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress});
 const bind=choices=>owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'vnc:derivational-operation',choices);
 const missing=issueVerbalDerivationSnapshot(scope,{ingress,binding:bind({})});assert.ok(missing);assert.equal(missing.contract.ready,false);
 const binding=bind({compoundMatrixStem:'yāuh'}),snapshot=issueVerbalDerivationSnapshot(scope,{ingress,binding});assert.equal(snapshot.contract.ready,true,binding.blockReason);assert.equal(snapshot.contract.request.compoundPredicateSourceFrame,source);assert.equal(projectVerbalDerivationExecution(snapshot).binding,binding);
 assert.equal(issueVerbalDerivationSnapshot(scope,{ingress,binding:{...binding}}),null);
});
test('raw equivalent authored request reuses snapshot and immutable nested intent',()=>{
 const request={sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',lateOperation:'frequentative',lateVariant:'ordinary-short-glottal'};
 const source=owner.evaluateClassicalNahuatlVncApplication({...request,requestedDerivation:'direct',requestedVoice:'active'}).resultFrame.sourceMachineryFrame,ingress={};const session=createConstructionSession({isSource:x=>x===source}),context={source,ingress,committed:true};const scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress,getSourceContext:()=>context});
 const a=issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request});assert.ok(a?.contract.ready);const b=issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request:{...request}});assert.equal(a,b);
});
test('equivalent exact owner reissue does not move construction revision',()=>{
 const source=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}),ingress={},session=createConstructionSession({isSource:x=>x===source}),scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress});
 const issue=()=>issueVerbalDerivationSnapshot(scope,{ingress,binding:owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,{lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'yāuh'})});
 const proposal=s=>({source,route:{operation:'vnc:derivational-operation'},operationContract:s,slots:s.captures,choices:s.selections,ready:true,execution:projectVerbalDerivationExecution(s)});
 session.stage(proposal(issue()));const revision=session.position.revision;session.stage(proposal(issue()));assert.equal(session.position.revision,revision);
});
test('typed compound control projection exposes required matrix from authentic owner even when incomplete',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');const fn=code.slice(code.indexOf('    function projectClassicalTypedLateDerivationSurface('),code.indexOf('    function syncClassicalLessons27282933Closure('));const ctx=vm.createContext({targetObject:owner});vm.runInContext(fn,ctx);
 const source=owner.buildClassicalNahuatlCompoundPredicateSourceFrame({sourceStem:'cac'}),nav=owner.getClassicalGrammarApplicationCapabilityNavigator(source),binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:derivational-operation',{}),surface={basalUnit:'vnc',state:{lateOperation:'none'}};
 const p=ctx.projectClassicalTypedLateDerivationSurface(surface,binding);assert.equal(p.state.lateOperation,'compound');assert.equal(p.state.stem,'cac');assert.equal(p.state.compoundPredicateSourceFrame,source);assert.equal(binding.bindingStatus,'choices-required');assert.equal(ctx.projectClassicalTypedLateDerivationSurface(surface,{...binding}),surface);
});
test('production move gate admits inherited ready typed matrix clearing and rejects stale or copied targets',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const extract=(name,next)=>code.slice(code.indexOf(`    function ${name}(`),code.indexOf(`    function ${next}(`));
 const source=owner.buildClassicalNahuatlCompoundPredicateSourceFrame({sourceStem:'cac'}),ingress=owner.getClassicalGrammarApplicationCapabilityNavigator(source),binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'vnc:derivational-operation',{compoundMatrixStem:'yāuh'});
 assert.equal(binding.requiredChoiceIds.length,0,'inherited ready matrix no longer appears as missing');
 const session=createConstructionSession({isSource:x=>x===source}),scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress}),snapshot=issueVerbalDerivationSnapshot(scope,{ingress,binding});
 session.stage({source,route:{operation:'vnc:derivational-operation'},operationContract:snapshot,slots:snapshot.captures,choices:{},legalMoves:[],ready:false,execution:null});
 const control={id:'classical-rule-logic-compound-matrix',tagName:'INPUT',type:'text',value:'',dataset:{},isConnected:true,closest:()=>null};
 const listeners={},queue=[];let reconciles=0;
 const doc={addEventListener:(type,fn)=>listeners[type]=fn,getElementById:id=>id===control.id?control:null};
 const {isCurrentVerbalDerivationSnapshot}=await import('../ui/composition/verbal_derivation_transaction.mjs');
 const ctx=vm.createContext({targetObject:{document:doc,queueMicrotask:fn=>queue.push(fn),isClassicalNahuatlCompoundPredicateBindingFrame:owner.isClassicalNahuatlCompoundPredicateBindingFrame},ClassicalConstructionSession:session,ClassicalPositionStaging:false,ClassicalPositionExecuting:false,PendingClassicalResultEdit:null,ClassicalChoicePreflightTransaction:null,ClassicalComparisonTransitionDraft:null,captureClassicalDenominalChoiceIntent:()=>{},
 getNativeGrammarControls:()=>[control],getActiveClassicalGrammarTypedSourceOperationBinding:()=>binding,isCurrentVerbalDerivationSnapshot,
 getClassicalCapabilityBindingControlsForChoice:key=>key==='compoundMatrixStem'?[control]:[],
 syncClassicalCapabilityApplyOperationState:()=>{reconciles++;session.stage({...session.position.construction,operationContract:snapshot,choices:{'compound-matrix':'yāuh'},legalMoves:[{type:'choice',id:'compound-matrix'}],ready:false,execution:null});}});
 vm.runInContext(extract('getClassicalPositionChoiceId','captureClassicalPositionLayers')+extract('reconcileClassicalNewNativeChoiceOffer','dispatchClassicalConstructionChoice')+extract('bindClassicalPositionMoves','getClassicalPositionIdentity'),ctx);
 ctx.bindClassicalPositionMoves();let stopped=false;
 listeners.input({target:control,type:'input',preventDefault(){},stopImmediatePropagation(){stopped=true;}});
 assert.equal(stopped,false);assert.equal(reconciles,1);assert.equal(queue.length,1);assert.equal(session.position.construction.source,source);assert.equal(session.position.accepted.result,null);
 ctx.ClassicalPositionStaging=false;
 session.stage({...session.position.construction,operationContract:snapshot,choices:{},legalMoves:[],ready:false,execution:null});
 assert.equal(ctx.reconcileClassicalNewNativeChoiceOffer({...control},'yāuh'),false);
 control.isConnected=false;assert.equal(ctx.reconcileClassicalNewNativeChoiceOffer(control,'yāuh'),false);control.isConnected=true;
 const other={...control,id:'unrelated'};assert.equal(ctx.reconcileClassicalNewNativeChoiceOffer(other,'x'),false);
 session.stage({...session.position.construction,operationContract:null,choices:{},legalMoves:[],ready:false,execution:null});assert.equal(ctx.reconcileClassicalNewNativeChoiceOffer(control,'yāuh'),false);assert.equal(reconciles,1);
});
test('raw named compound closure retains exact owner custody and rejects copied or misplaced authority',()=>{
 const base={sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',voice:'active'};
 const compound=owner.evaluateClassicalNahuatlLateVncDerivation({...base,lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'yāuh'});assert.equal(compound.authorizationStatus,'authorized');
 const source=compound,ingress={},session=createConstructionSession({isSource:x=>x===source}),context={source,ingress,committed:true},scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress,getSourceContext:()=>context});
 const request={...base,sourceStem:compound.operationFrame.targetStem,verbClass:compound.operationFrame.targetClass,lateOperation:'honorific',lateVariant:'causative',honoredParticipant:'subject',attitudeCompoundClosureFrame:compound,sourceEmbedStem:'chōca',sourceMatrixStem:'yāuh'};
 const snapshot=issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request});assert.equal(snapshot?.contract.ready,true);assert.equal(snapshot.contract.request.attitudeCompoundClosureFrame,compound);assert.equal(snapshot.contract.preview.operationFrame.operationFacts.typedCompoundSourceFrame,compound);assert.equal(projectVerbalDerivationExecution(snapshot).request.args[0],snapshot.contract.request);
 assert.equal(issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request:{...request,attitudeCompoundClosureFrame:{...compound}}}),null);
 const {attitudeCompoundClosureFrame,...plain}=request;assert.equal(issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request:{...plain,ignoredParent:compound}}),null);
});
test('raw participant semantic input is immutable while owner normalizes output participants',()=>{
 const base={sourceStem:'itta',sourceInitialISelection:'real',verbClass:'A',sourceValence:'specific-projective',subject:'3sg',objectKind:'specific-projective',objectPerson:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
 const source=owner.evaluateClassicalNahuatlVncApplication(base);assert.equal(source.authorizationStatus,'authorized');
 const ingress={},session=createConstructionSession({isSource:x=>x===source}),context={source,ingress,committed:true},scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress,getSourceContext:()=>context});
 const request={...base,sourceObjectRequests:source.normalizedRequest.sourceObjectRequests,lateOperation:'frequentative',lateVariant:'ordinary-short-glottal'};
 const snapshot=issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request});assert.equal(snapshot?.contract.ready,true);
 const input=request.sourceObjectRequests[0],retained=snapshot.contract.request.sourceObjectRequests[0],normalized=snapshot.contract.preview.baseApplicationFrame.normalizedRequest.sourceObjectRequests[0];
 assert.equal(retained.participantFrame===input.participantFrame,false);assert.equal(Object.isFrozen(retained.participantFrame),true);assert.equal(projectVerbalDerivationExecution(snapshot).request.args[0],snapshot.contract.request);
 for(const key of ['objectKind','objectPerson','objectNumber'])assert.equal(normalized[key],input[key],key);
 assert.ok(normalized.participantFrame,'owner supplies its normalized participant; identity equality is not required');
 assert.equal(issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request:{...request,sourceObjectRequests:[{...input,participantFrame:{...input.participantFrame,person:"invalid"}}]}}),null);
 const mutable={...input.participantFrame};const mutableRequest={...request,sourceObjectRequests:[{...input,participantFrame:mutable}]};
 const isolated=issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request:mutableRequest});assert.equal(isolated?.contract.ready,true);const before=isolated.contract.request.sourceObjectRequests[0].participantFrame.person;mutable.person='invalid';assert.equal(isolated.contract.request.sourceObjectRequests[0].participantFrame.person,before);

});
test('raw named source application remains the owner base, copied and misplaced frames fail',()=>{
 const base={sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'},source=owner.evaluateClassicalNahuatlVncApplication(base),ingress={},session=createConstructionSession({isSource:x=>x===source}),context={source,ingress,committed:true},scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress,getSourceContext:()=>context});
 const request={...base,sourceApplicationFrame:source,lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'yāuh'},input={ingress,sourceContext:context,request};
 const snapshot=issueVerbalDerivationSnapshot(scope,input);assert.equal(snapshot?.contract.ready,true);assert.equal(snapshot.contract.preview.baseApplicationFrame,source);assert.equal(snapshot.contract.request.sourceApplicationFrame,source);
 assert.equal(issueVerbalDerivationSnapshot(scope,{...input,request:{...request,sourceApplicationFrame:{...source}}}),null);
 const {sourceApplicationFrame,...plain}=request;assert.equal(issueVerbalDerivationSnapshot(scope,{...input,request:{...plain,ignoredParent:source}}),null);
});
