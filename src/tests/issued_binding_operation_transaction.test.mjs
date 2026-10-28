import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import * as a from '../ui/composition/issued_binding_operation_transaction.mjs';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'pil',sourceClass:'tli-1'});
const navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(source);
const issue=choices=>owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'nnc:ordinary',choices);
const base={subject:'3sg',state:'absolutive',humanness:'human'};
test('authentic typed binding enters one session and stale equivalent-replacement events cannot change it',()=>{
 const session=createConstructionSession({isSource:x=>x===source,isResult:()=>false});let ingress=navigator;
 const scope=a.createIssuedBindingOperationScope({owner,source,operationId:'nnc:ordinary',ingressKind:'typed',navigator,session,getIngress:()=>ingress,reissue:issue});
 let s=a.issueIssuedBindingOperationSnapshot(scope,issue(base),ingress);assert.ok(s);assert.equal(s.source,source);assert.equal(a.isCurrentIssuedBindingOperationSnapshot(s),false);
 const stage=x=>session.stage({source,route:{operation:'nnc:ordinary'},slots:x.captures,choices:x.selections,operationContract:x,ready:false});stage(s);assert.equal(a.isCurrentIssuedBindingOperationSnapshot(s),true);const event=a.captureIssuedBindingChoiceFrame(s);assert.ok(event);
 const replacement=a.issueIssuedBindingOperationSnapshot(scope,issue(base),ingress);stage(replacement);assert.equal(a.isCurrentIssuedBindingOperationSnapshot(s),false);assert.equal(a.transitionIssuedBindingOperationSnapshot(s,{type:'set-choice',key:'subject',value:'3pl'},event).authorizationStatus,'blocked');
 const current=a.captureIssuedBindingChoiceFrame(replacement);assert.equal(a.transitionIssuedBindingOperationSnapshot(replacement,{type:'set-choice',key:'subject',value:'3pl'},{...current}).authorizationStatus,'blocked');
 const next=a.transitionIssuedBindingOperationSnapshot(replacement,{type:'set-choice',key:'subject',value:'3pl'},current);assert.equal(next.authorizationStatus,'authorized');assert.equal(next.snapshot.contract.binding.exactSource,source);assert.equal(next.snapshot.selections.intent.subject,'3pl');assert.equal(session.position.operationContract,replacement,'transition does not create another current store');stage(next.snapshot);assert.equal(a.isCurrentIssuedBindingOperationSnapshot(next.snapshot),true);
 session.stage({source,sourcePending:true,route:{operation:'nnc:ordinary'},operationContract:next.snapshot,ready:false});assert.equal(a.isCurrentIssuedBindingOperationSnapshot(next.snapshot),false,'uncommitted Source draft blocks old grammar controls');
 ingress={};assert.equal(a.isCurrentIssuedBindingOperationSnapshot(next.snapshot),false);
});
test('copied binding rejected and nested intent isolated without cloning canonical custody',()=>{
 const session=createConstructionSession({isSource:x=>x===source});const scope=a.createIssuedBindingOperationScope({owner,source,operationId:'nnc:ordinary',ingressKind:'typed',navigator,session,getIngress:()=>navigator,reissue:issue});const b=issue(base);assert.equal(a.issueIssuedBindingOperationSnapshot(scope,{...b},navigator),null);const s=a.issueIssuedBindingOperationSnapshot(scope,b,navigator);assert.equal(s.contract.binding,b);assert.equal(s.captures[0].exact,source);assert.ok(Object.isFrozen(s.selections.intent));
});

test('VNC typed and exact snapshots isolate nested sentence intent and preserve canonical custody',()=>{
 const result=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}).resultFrame;
 for(const exact of [false,true]){
  const source=exact?result:result.sourceMachineryFrame,navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(source),session=createConstructionSession({isSource:x=>x===source});
  const issue=s=>exact?owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',source,s):owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'vnc:application',s);
  const choices={subject:'3sg',mood:'optative',tense:'nonpast',requestedDerivation:'direct',requestedVoice:'active',sentenceOptions:{introductoryParticle:'mā',outsidePrefixes:[]}};
  const b=issue(choices),scope=a.createIssuedBindingOperationScope({owner,source,operationId:'vnc:application',ingressKind:exact?'exact':'typed',navigator,session,getIngress:()=>navigator,reissue:issue});const s=a.issueIssuedBindingOperationSnapshot(scope,b,navigator);assert.ok(s);assert.equal(s.routeId,'vnc:application:direct');assert.equal(s.contract.binding,b);assert.equal(s.source,source);assert.notEqual(s.selections.intent.sentenceOptions,b.callerSelections.sentenceOptions);assert.ok(Object.isFrozen(s.selections.intent.sentenceOptions));assert.throws(()=>{s.selections.intent.sentenceOptions.introductoryParticle='tlā';},TypeError);assert.equal(b.callerSelections.sentenceOptions.introductoryParticle,'mā');
 }
});

test('all three VNC derivation branches and ordered voice retain owner route identity',()=>{
 const root=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'caqui',verbClass:'B',sourceValence:'projective-nonhuman',objectKind:'projective-nonhuman',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}).resultFrame;
 const source=root.sourceMachineryFrame,navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(source),session=createConstructionSession({isSource:x=>x===source});
 const issue=intent=>owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'vnc:application',intent),scope=a.createIssuedBindingOperationScope({owner,source,operationId:'vnc:application',ingressKind:'typed',navigator,session,getIngress:()=>navigator,reissue:issue});
 for(const requestedDerivation of ['direct','causative','applicative']){
  const b=issue({subject:'1sg',mood:'indicative',tense:'present',requestedDerivation,requestedVoice:'active'}),s=a.issueIssuedBindingOperationSnapshot(scope,b,navigator);assert.ok(s);assert.equal(s.routeId,`vnc:application:${requestedDerivation}`);assert.equal(s.contract.binding,b);assert.equal(s.source,source);
 }
 const exact=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'yohua',verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'impersonal',nonactiveOptionId:'inherent-impersonal'}).resultFrame;
 const nav=owner.getClassicalGrammarApplicationCapabilityNavigator(exact),ss=createConstructionSession({isSource:x=>x===exact}),reissue=intent=>owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:ordered-voice-application',exact,intent);
 const scope2=a.createIssuedBindingOperationScope({owner,source:exact,operationId:'vnc:ordered-voice-application',ingressKind:'exact',navigator:nav,session:ss,getIngress:()=>nav,reissue}),b=reissue({operations:['inherent-impersonal','tla-impersonal','nonactive-lō']}),s=a.issueIssuedBindingOperationSnapshot(scope2,b,nav);assert.ok(s);assert.equal(s.routeId,'vnc:ordered-voice-application');assert.notEqual(s.selections.intent.operations,b.callerSelections.operations);assert.ok(Object.isFrozen(s.selections.intent.operations));assert.equal(s.source,exact);
});

test('exact ordinary reinflection keeps the Result as Source while its typed owner binding retains the original noun source',()=>{
 const app=owner.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,owner.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{...base,predicateFormation:'source-stem'})]});assert.equal(app.authorizationStatus,'authorized',app.blockReason);const result=app.canonicalResult;
 const context=owner.getClassicalNahuatlOrdinaryNncReinflectionContext(result);assert.ok(context);
 const nav=owner.getClassicalGrammarApplicationCapabilityNavigator(context.sourceFrame),session=createConstructionSession({isSource:x=>x===result});
 const issue=intent=>owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',intent);
 const scope=a.createIssuedBindingOperationScope({owner,source:result,operationId:'nnc:ordinary',ingressKind:'nnc-exact',navigator:nav,session,getIngress:()=>nav,reissue:issue}),binding=issue(context.selections),snapshot=a.issueIssuedBindingOperationSnapshot(scope,binding,nav);
 assert.ok(snapshot);assert.equal(snapshot.source,result);assert.equal(snapshot.captures[0].exact,result);assert.equal(snapshot.contract.binding.exactSource,source);
 const fake=a.createIssuedBindingOperationScope({owner,source:{...result},operationId:'nnc:ordinary',ingressKind:'nnc-exact',navigator:nav,session,getIngress:()=>nav,reissue:issue});assert.equal(a.issueIssuedBindingOperationSnapshot(fake,binding,nav),null);
});

test('a coordinated native candidate must match the current event and exact binding owner',()=>{
 const session=createConstructionSession({isSource:x=>x===source});const scope=a.createIssuedBindingOperationScope({owner,source,operationId:'nnc:ordinary',ingressKind:'typed',navigator,session,getIngress:()=>navigator,reissue:issue});
 const snapshot=a.issueIssuedBindingOperationSnapshot(scope,issue(base),navigator);
 session.stage({source,route:{operation:'nnc:ordinary'},operationContract:snapshot,ready:false});
 const event=a.captureIssuedBindingChoiceFrame(snapshot),candidate=issue({...base,state:'possessive',possessor:'1sg'});
 assert.ok(a.adoptIssuedBindingOperationCandidate(snapshot,candidate,event));
 assert.equal(a.adoptIssuedBindingOperationCandidate(snapshot,{...candidate},event),null);
 assert.equal(a.adoptIssuedBindingOperationCandidate(snapshot,candidate,{...event}),null);
 session.stage({source,route:{operation:'nnc:ordinary'},operationContract:a.issueIssuedBindingOperationSnapshot(scope,issue(base),navigator),ready:false});
 assert.equal(a.adoptIssuedBindingOperationCandidate(snapshot,candidate,event),null);
});

test('a ready execution packet must belong to the same issued binding, Source and intent',()=>{
 const session=createConstructionSession({isSource:x=>x===source}),scope=a.createIssuedBindingOperationScope({owner,source,operationId:'nnc:ordinary',ingressKind:'typed',navigator,session,getIngress:()=>navigator,reissue:issue});
 const binding=issue({...base,predicateFormation:'source-stem'}),snapshot=a.issueIssuedBindingOperationSnapshot(scope,binding,navigator),packet={kind:'typed',operation:'nnc:ordinary',source,binding,choices:binding.effectiveSelections};
 assert.equal(a.matchesIssuedBindingExecutionPacket(snapshot,packet),true);
 for(const candidate of [{...packet,source:{...source}},{...packet,binding:issue(base)},{...packet,choices:{...packet.choices,state:'possessive'}},{...packet,operation:'vnc:application'}])assert.equal(a.matchesIssuedBindingExecutionPacket(snapshot,candidate),false);
 assert.equal(a.matchesIssuedBindingExecutionPacket(null,packet),false);assert.equal(a.matchesIssuedBindingExecutionPacket({...snapshot},packet),false);
 assert.equal(a.matchesIssuedBindingExecutionPacket(snapshot,{kind:'result-edit',inner:packet}),true);
});
test('exact VNC execution keeps owner argument identities rather than copied lookalikes',()=>{
 const source=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}).resultFrame;
 const nav=owner.getClassicalGrammarApplicationCapabilityNavigator(source),session=createConstructionSession({isSource:x=>x===source}),reissue=intent=>owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',source,intent);
 const binding=reissue({subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}),scope=a.createIssuedBindingOperationScope({owner,source,operationId:'vnc:application',ingressKind:'exact',navigator:nav,session,getIngress:()=>nav,reissue}),snapshot=a.issueIssuedBindingOperationSnapshot(scope,binding,nav);
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);assert.ok(snapshot);
 const packet={kind:'request',operation:'vnc:application',source,choices:binding.effectiveSelections||binding.callerSelections||{},request:{operationId:'vnc:application',args:binding.executionArgs}};
 assert.equal(a.matchesIssuedBindingExecutionPacket(snapshot,packet),true);
 assert.equal(a.matchesIssuedBindingExecutionPacket(snapshot,{...packet,request:{...packet.request,args:binding.executionArgs.map(x=>typeof x==='object'?{...x}:x)}}),false);
});
