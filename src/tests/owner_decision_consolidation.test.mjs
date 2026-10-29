import test from 'node:test';
import assert from 'node:assert/strict';
import * as decision from '../ui/composition/owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261029-12';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {syncStemLayerChoices} from '../ui/composition/stem_layer_choices.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {createVerbalDerivationScope,issueVerbalDerivationSnapshot,projectVerbalDerivationExecution} from '../ui/composition/verbal_derivation_transaction.mjs';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const base={sourceStem:'caqui',verbClass:'B',sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3sg',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
test('visible Stem chooser forwards the canonical owner choice and owns its label',()=>{
 const nodes=new Map(),host={},events=[],native={id:'classical-rule-logic-late-operation',value:'',disabled:false,options:[{value:'frequentative',textContent:'frequentative',disabled:false,hidden:false}],closest:()=>host,after(x){nodes.set(x.id,x);},dispatchEvent(e){events.push({type:e.type,value:this.value});}};
 nodes.set(native.id,native);
 const doc={getElementById:id=>nodes.get(id),defaultView:{Event:class{constructor(type){this.type=type;}}},createElement:()=>({dataset:{},options:[],setAttribute(){},addEventListener(type,fn){this[type]=fn;},replaceChildren(){this.options=[];},append(x){this.options.push(x);}})};
 syncStemLayerChoices(doc);const menu=nodes.get('classical-stem-layer');
 assert.equal(host.htmlFor,menu.id);assert.equal(menu.dataset.classicalCompactChoiceDisplay,'true');
 menu.value='frequentative';menu.change();assert.deepEqual(events,[{type:'change',value:'frequentative'}]);
});
function setup(intent){const source=owner.evaluateClassicalNahuatlVncApplication(base),ingress={},session=createConstructionSession({isSource:x=>x===source}),scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress}),binding=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,intent),snapshot=issueVerbalDerivationSnapshot(scope,{ingress,binding});return {source,ingress,session,scope,binding,snapshot};}
test('one authentic decision survives blocked owner request and has no execution fallback',()=>{const {binding,snapshot}=setup({lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'ya-uh',compoundMatrixClass:'B',compoundYaSyncopation:true});assert.equal(binding.bindingStatus,'rejected');assert.equal(snapshot.contract.request===binding.ownerRequest,true);assert.equal(snapshot.contract.preview===binding.ownerPreflightResult,true);assert.equal(snapshot.contract.choices===binding.ownerChoiceOptionProjection,true);assert.equal(decision.projectOwnerOperationDecision(snapshot)===snapshot.contract,true);assert.equal(projectVerbalDerivationExecution(snapshot),null);assert.equal(decision.projectOwnerOperationDecision({...snapshot}),null);assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'compoundYaSyncopation',false),true);assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'compoundYaSyncopation',true),false);});
test('shared decision admission distinguishes pre-stage authenticity from current revision and ignores forged DOM values',()=>{const {source,session,snapshot,binding}=setup({lateOperation:'frequentative',lateVariant:'ordinary-short-glottal'});assert.equal(decision.projectOwnerOperationDecision(snapshot)===snapshot.contract,true);assert.equal(decision.projectOwnerOperationDecision(snapshot,{current:true}),null);session.stage({source,route:{operation:'vnc:derivational-operation'},operationContract:snapshot,slots:snapshot.captures,choices:{},legalMoves:[],ready:true,execution:projectVerbalDerivationExecution(snapshot)});assert.equal(decision.projectOwnerOperationDecision(snapshot,{current:true})===snapshot.contract,true);assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'frequentativeScope','patient',{current:true}),true);assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'frequentativeScope','DOM-forged',{current:true}),false);assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'unknownChoice',true,{current:true}),false);assert.equal(projectVerbalDerivationExecution(snapshot).request.args===binding.executionArgs,true);});

test('typed and raw ingresses retain one decision and exact request; forged typed Source is rejected without throwing',()=>{
 const source=owner.buildClassicalNahuatlCompoundPredicateSourceFrame({sourceStem:'cac'}), ingress=owner.getClassicalGrammarApplicationCapabilityNavigator(source);
 const session=createConstructionSession({isSource:x=>x===source}),scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress});
 const binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'vnc:derivational-operation',{compoundMatrixStem:'yāuh'});
 const snapshot=issueVerbalDerivationSnapshot(scope,{ingress,binding});
 assert.equal(snapshot.contract.choices===binding.choiceOptionProjection,true);
 assert.equal(snapshot.contract.preview===binding.ownerBindingFrame.ownerPreflightResult,true);
 assert.equal(snapshot.contract.request===binding.ownerBindingFrame.ownerRequest,true);
 assert.equal(projectVerbalDerivationExecution(snapshot).binding===binding,true);
 const incompatible=owner.evaluateClassicalNahuatlLateVncDerivation({...snapshot.contract.request,lateOperation:'frequentative',lateVariant:'ordinary-short-glottal'});
 assert.equal(incompatible.authorizationStatus,'blocked');
 assert.deepEqual(incompatible.choiceOptionProjection.lateOperation.options.map(x=>x.optionId),['compound']);
 assert.deepEqual(incompatible.choiceOptionProjection.lateVariant.options.map(x=>x.optionId),['connective-t']);
 const rejected=owner.issueClassicalNahuatlCompoundPredicateBindingFrame({...source},{compoundMatrixStem:'yāuh'});
 assert.equal(rejected.bindingStatus,'rejected');assert.equal(rejected.ownerRequest,null);assert.deepEqual(rejected.choiceOptionProjection,{});
 const rawSource=owner.evaluateClassicalNahuatlVncApplication(base),rawIngress={},context={source:rawSource,ingress:rawIngress,committed:true};
 const rawScope=createVerbalDerivationScope({owner,source:rawSource,session:createConstructionSession({isSource:x=>x===rawSource}),getIngress:()=>rawIngress,getSourceContext:()=>context});
 const raw=issueVerbalDerivationSnapshot(rawScope,{ingress:rawIngress,sourceContext:context,request:{...base,lateOperation:'frequentative',lateVariant:'ordinary-short-glottal'}});
 assert.equal(raw.contract.choices===raw.contract.preview.choiceOptionProjection,true);
 assert.equal(projectVerbalDerivationExecution(raw).request.args[0]===raw.contract.request,true);
 assert.equal(decision.projectOwnerOperationDecision({...raw}),null);
});
test('replaced ingress and changed revision reject stale choice events without executing',async()=>{
 const {captureVerbalDerivationChoiceFrame}=await import('../ui/composition/verbal_derivation_transaction.mjs');
 const source=owner.evaluateClassicalNahuatlVncApplication(base);let ingress={};
 const session=createConstructionSession({isSource:x=>x===source}),scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress});
 const binding=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,{lateOperation:'frequentative',lateVariant:'ordinary-short-glottal'});
 const snapshot=issueVerbalDerivationSnapshot(scope,{ingress,binding});
 const stage=choices=>session.stage({source,route:{operation:'vnc:derivational-operation'},operationContract:snapshot,slots:snapshot.captures,choices,legalMoves:[],ready:false,execution:null});
 stage({});const event=captureVerbalDerivationChoiceFrame(snapshot);assert.ok(event);
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'frequentativeScope','patient',{current:true,event}),true);
 stage({changed:true});assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'frequentativeScope','patient',{current:true,event}),false);
 ingress={};assert.equal(decision.projectOwnerOperationDecision(snapshot),null);assert.equal(projectVerbalDerivationExecution(snapshot),null);
});
test('incomplete reverential keeps required exact-result role and cannot acquire execution',()=>{
 const {binding,snapshot}=setup({lateOperation:'reverential',lateVariant:'double'});
 assert.ok(binding.requiredResultRoles.includes('attitude-source-closure'));
 assert.notEqual(binding.bindingStatus,'ready');assert.ok(binding.ownerRequest);
 assert.equal(snapshot.contract.preview===binding.ownerPreflightResult,true);assert.equal(projectVerbalDerivationExecution(snapshot),null);
});
test('production generic controls project blocked boolean recovery and reject invented select options',()=>{
 const {snapshot}=setup({lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'ya-uh',compoundMatrixClass:'B',compoundYaSyncopation:true});
 const controls=new Map();
 function control(id,type,value){const host={hidden:false,setAttribute(){}},c={id,tagName:type==='checkbox'?'INPUT':'SELECT',type,value,checked:value===true,dataset:{},options:[],setAttribute(){},closest:()=>host,appendChild(o){this.options.push(o);},querySelectorAll:()=>[]};controls.set(id,c);return c;}
 const sync=control('classical-rule-logic-compound-ya-syncopation','checkbox',true);
 const order=control('classical-rule-logic-compound-event-order','select','iconic');order.options.push({value:'DOM-forged',disabled:false,hidden:false});
 const doc={getElementById:id=>controls.get(id),createElement:()=>({})};
 sync.setAttribute=(key,value)=>{sync[key]=value;};
 assert.deepEqual(decision.getOwnerOperationDecisionControls(snapshot,doc),[sync,order]);
 assert.equal(decision.syncOwnerOperationDecisionControls(snapshot,doc),true);
 assert.equal(sync.checked,true);assert.equal(sync.disabled,false);assert.equal(sync.closest().hidden,false);
 assert.equal(sync['aria-disabled'],'false');
 assert.equal(order.options.find(x=>x.value==='DOM-forged').disabled,true);
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'compoundEventOrder','DOM-forged'),false);
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'compoundYaSyncopation',false),true);
 sync.checked=false;const intent=decision.readOwnerOperationControlIntent(snapshot,doc,{lateOperation:'compound'},sync);
 assert.equal(intent.compoundYaSyncopation,false);assert.equal(snapshot.contract.request.compoundYaSyncopation,true);
 assert.equal(decision.projectOwnerOperationChoiceMove({...snapshot},'compoundYaSyncopation',sync.id),null);
});

test('receiving owner regains common controls after a fixed purposive decision',()=>{
 const {snapshot}=setup({lateOperation:'purposive',purposiveSeries:'outbound-nonpast-indicative'});
 const host={hidden:false,setAttribute(){}},control={id:'classical-rule-logic-tense',tagName:'SELECT',type:'select-one',value:'present',disabled:false,required:false,dataset:{},options:[{value:'present',hidden:false,disabled:false}],closest:()=>host,setAttribute(){},querySelectorAll:()=>[],appendChild(x){this.options.push(x);}};
 const lateHost={hidden:false,setAttribute(){}},lateControl={...control,id:'classical-rule-logic-purposive-series',dataset:{},options:[],closest:()=>lateHost};
 const doc={getElementById:id=>id===control.id?control:id===lateControl.id?lateControl:null,createElement:()=>({})};
 decision.syncOwnerOperationDecisionControls(snapshot,doc);assert.equal(control.disabled,true);assert.equal(host.hidden,true);assert.equal(lateHost.hidden,false);
 decision.restoreOwnerOperationDecisionControls(doc);assert.equal(control.disabled,false);assert.equal(host.hidden,false);assert.equal(control.options[0].disabled,false);assert.equal(lateHost.hidden,true);assert.equal(lateControl.disabled,true);
});
test('shared possessor normalization preserves the prior subject aliases and projects actual state choices',()=>{
 assert.equal(owner.normalizeClassicalNahuatlNncSubject('thirdplural'),'3pl');
 assert.equal(owner.normalizeClassicalNahuatlNncPossessor('nonspecific-human'),'nonspecific-human');
 const state=owner.buildClassicalNahuatlPossessiveStateFrame({stem:'pil',possessor:'1sg'});
 assert.equal(state.authorizationStatus,'authorized');assert.ok(state.possessorChoices.includes('1sg'));
 assert.equal(state.possessorChoices.includes('forged'),false);
});

test('initial late route issues an incomplete owner decision instead of recovering DOM permission',()=>{
 for(const intent of [{},{lateOperation:'none'}]) {
  const {snapshot,binding}=setup(intent);assert.ok(snapshot);assert.equal(snapshot.contract.ready,false);
  assert.equal(binding.bindingStatus,'choices-required');
  assert.ok(binding.requiredChoiceIds.includes('lateOperation'));assert.equal(owner.isClassicalNahuatlVncContinuationBindingFrame(binding),true);
  assert.equal(snapshot.contract.choices===binding.ownerChoiceOptionProjection,true);
  assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'lateOperation','compound'),true);
  assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'compoundMatrixStem','forged-before-route'),false);
 }

});
test('structured compound interpretation and nondefault honorific formation remain owner-authored',()=>{
 const compound=owner.evaluateClassicalNahuatlLateVncDerivation({...base,sourceStem:'cui',verbClass:'A',lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'huetzi',compoundMatrixClass:'B'});
 assert.equal(compound.authorizationStatus,'authorized');
 for(const [structure,target] of [['compositional','embed'],['lexicalized','matrix']]) {
  const intent={lateOperation:'honorific',lateVariant:'applicative',honoredParticipant:'subject',compoundAttitudeStructure:structure};
  const pending=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',compound,intent);
  const projection=pending.ownerChoiceOptionProjection;
  assert.equal(projection.compoundAttitudeStructure.selectedValue,structure);
  assert.equal(projection.honorificDerivationOptionId.applicable,true);
  const option=projection.honorificDerivationOptionId.options[0].optionId;
  const binding=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',compound,{...intent,honorificDerivationOptionId:option});
  assert.equal(binding.bindingStatus,'ready',binding.blockReason);
  assert.equal(binding.ownerPreflightResult.operationFrame.operationFacts.compoundTarget,target);
  assert.equal(binding.executionArgs[0]===binding.ownerRequest,true);
 }
 const source=owner.evaluateClassicalNahuatlVncApplication({...base,sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',objectKind:'none',objectPerson:''});
 const binding=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,{lateOperation:'honorific',lateVariant:'causative',honoredParticipant:'subject',honorificStemAlternative:'type-two-long'});
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);
 assert.equal(binding.ownerChoiceOptionProjection.honorificFormationAnalysis.inputKind,'fixed');
 assert.equal(binding.ownerChoiceOptionProjection.honorificStemAlternative.selectedValue,'type-two-long');
 assert.equal(binding.ownerPreflightResult.operationFrame.operationFacts.selectedLexicalAlternative,'type-two-long');
});

test('rejected honorific source analysis cannot manufacture offered formations',()=>{
 const {binding,snapshot}=setup({lateOperation:'honorific',lateVariant:'causative',honoredParticipant:'object',honorificFormationAnalysis:{lexicalStatus:'honorific-formation-analysis',sourceStem:'caqui',availableFormations:['invented-route']}});
 assert.notEqual(binding.bindingStatus,'ready');
 assert.equal(snapshot.contract.choices.lateVariant.options.some(x=>x.optionId==='invented-route'),false);
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'lateVariant','invented-route'),false);
 assert.equal(projectVerbalDerivationExecution(snapshot),null);
});
test('visible subject mirrors encode the same finite owner domain without independent permissions',()=>{
 const {snapshot}=setup({lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'chōca'});
 const person={id:'classical-rule-logic-vnc-subject-person',value:'2',type:'select-one'},number={id:'classical-rule-logic-vnc-subject-number',value:'plural',type:'select-one'};
 const doc={getElementById:id=>id===person.id?person:id===number.id?number:null};person.ownerDocument=doc;number.ownerDocument=doc;
 const field=decision.findOwnerOperationControlChoice(snapshot,person.id);
 assert.equal(field.choiceId,'subject');assert.equal(decision.readOwnerOperationControlValue(field,'2',doc),'2pl');
 const intent=decision.readOwnerOperationControlIntent(snapshot,doc,{},person);assert.equal(intent.subject,'2pl');
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'subject',intent.subject),true);
 person.value='forged';assert.equal(decision.readOwnerOperationControlValue(field,person.value,doc),null);
});
test('outer reference facts are not borrowed from the embed and contextual compound animacy follows its owner guard',()=>{
 const source=owner.buildClassicalNahuatlCompoundPredicateSourceFrame({sourceStem:'cac'});
 const binding=owner.issueClassicalNahuatlCompoundPredicateBindingFrame(source,{compoundMatrixStem:'yāuh',subject:'1sg',compoundSubjectAnimacy:'animate'});
 assert.equal(binding.bindingStatus,'rejected');
 assert.deepEqual(binding.choiceOptionProjection.compoundSubjectAnimacy.options.map(x=>x.optionId),['nonanimate']);
 const {snapshot}=setup({lateOperation:'compound',lateVariant:'reflexive-matrix',compoundMatrixStem:'m-o-man-a',subject:'3sg',compoundSubjectAnimacy:'animate'});
 assert.equal(snapshot.contract.choices.subjectAnimacy.applicable,false);
 assert.equal(snapshot.contract.choices.subjectHumanness.applicable,false);
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'compoundSubjectAnimacy','animate'),false);
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'compoundSubjectAnimacy','nonanimate'),true);
 assert.equal(snapshot.contract.request.compoundSubjectAnimacy,'animate');
 const plural=setup({lateOperation:'compound',lateVariant:'reflexive-matrix',compoundMatrixStem:'m-o-man-a',subject:'3pl',compoundSubjectAnimacy:'animate'});
 assert.equal(decision.isOwnerOperationChoiceAllowed(plural.snapshot,'compoundSubjectAnimacy','animate'),true);
});
test('production native capture retains text intent before presentation can restore an old value',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const extract=(a,b)=>code.slice(code.indexOf(`    function ${a}(`),code.indexOf(`    function ${b}(`));
 const {source,session,snapshot,binding}=setup({lateOperation:'compound',lateVariant:'connective-t'});
 session.stage({source,route:{operation:'vnc:derivational-operation'},operationContract:snapshot,slots:snapshot.captures,choices:{},legalMoves:[],ready:false,execution:null});
 const control={id:'classical-rule-logic-compound-matrix',value:'chōca',type:'text'},doc={getElementById:()=>control};
 const ctx=vm.createContext({...decision,targetObject:{document:doc},ClassicalConstructionSession:session,ClassicalChoicePreflightTransaction:{},readClassicalLateOwnerDecisionSnapshot:()=>snapshot});
 vm.runInContext(extract('captureClassicalVerbalChoiceIntent','bindClassicalPositionMoves')+extract('getClassicalVncContinuationBindingSelections','getClassicalNncSubjectSelection'),ctx);
 ctx.captureClassicalVerbalChoiceIntent(control,control.value);control.value='';
 const selected=ctx.getClassicalVncContinuationBindingSelections({operationId:'vnc:derivational-operation',ownerBindingFrame:binding},{editedControl:control});
 assert.equal(selected.compoundMatrixStem,'chōca');assert.equal(snapshot.contract.request.compoundMatrixStem,undefined);
 const next=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,selected);
 assert.equal(next.ownerRequest.compoundMatrixStem,'chōca');assert.equal(next.bindingStatus,'ready');
 let issued=0;ctx.HandledClassicalContinuationChoiceEvents=new WeakSet();
 ctx.getActiveClassicalGrammarResultBinding=()=>({ownerBindingFrame:binding,selectedBindingId:'source'});
 ctx.enterClassicalGrammarResultBindingChoice=(_id,args)=>{assert.equal(args.allowExecution,false);issued++;const actual=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,args.vncSelections);assert.equal(actual.bindingStatus,'ready');};
 vm.runInContext(extract('stageClassicalCapturedVerbalIntent','getClassicalChoiceDispatchReadiness'),ctx);
 assert.equal(ctx.stageClassicalCapturedVerbalIntent(),true);assert.equal(ctx.stageClassicalCapturedVerbalIntent(),false);assert.equal(issued,1);
});
test('raw attitude aliases use the same owner decision and bounded public route without swallowing Source authoring',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const a=code.indexOf('    const ClassicalRawAttitudeSourceControlIds='),b=code.indexOf('    const ClassicalVerbalDerivationScopes =',a);
 const ctx=vm.createContext({targetObject:owner});vm.runInContext(code.slice(a,b),ctx);const presentation=ctx.getClassicalRawAttitudePresentation();
 const rawBase={...base,sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',objectKind:'none',objectPerson:''};
 const source=owner.evaluateClassicalNahuatlVncApplication(rawBase),ingress={},context={source,ingress,committed:true};
 const scope=createVerbalDerivationScope({owner,source,session:createConstructionSession({isSource:x=>x===source}),getIngress:()=>ingress,getSourceContext:()=>context,presentation});
 const request={...rawBase,lateOperation:'honorific',lateVariant:'causative',honoredParticipant:'subject'};
 const snapshot=issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request});assert.equal(snapshot.contract.ready,true);
 assert.equal(snapshot.contract.choices,snapshot.contract.preview.choiceOptionProjection);
 assert.equal(decision.findOwnerOperationControlChoice(snapshot,'classical-attitude-stem-alternative').choiceId,'honorificStemAlternative');
 const hosts={},controls={};for(const id of ['classical-rule-logic-honorific-stem-alternative','classical-attitude-stem-alternative']){hosts[id]={hidden:false,setAttribute(){}};controls[id]={id,tagName:'SELECT',value:'default',dataset:{},options:[],closest:()=>hosts[id],setAttribute(){},querySelectorAll:()=>[],appendChild(x){this.options.push(x)}};}
 decision.syncOwnerOperationDecisionControls(snapshot,{getElementById:id=>controls[id],createElement:()=>({})});
 assert.equal(hosts['classical-rule-logic-honorific-stem-alternative'].hidden,true);assert.equal(hosts['classical-attitude-stem-alternative'].hidden,false);
 assert.equal(decision.findOwnerOperationControlChoice(snapshot,'classical-rule-logic-vnc-subject-animacy'),null);
 assert.ok(presentation.sourceControlIds.includes('classical-rule-logic-vnc-subject-animacy'));
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'lateOperation','compound'),false);
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'lateOperation','pejorative'),true);
 assert.equal(decision.isOwnerOperationChoiceAllowed(snapshot,'directionalPrefix','on'),true);
 const directional=issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request:{...request,directionalPrefix:'on'}});
 assert.equal(directional.contract.ready,true);assert.equal(directional.contract.preview.baseApplicationFrame.normalizedRequest.sentenceOptions.directionalPrefix,'on');
 assert.notEqual(directional.contract.preview.surfaceRealization,snapshot.contract.preview.surfaceRealization);
 assert.equal(projectVerbalDerivationExecution(directional).request.args[0],directional.contract.request);
 const invalidMood=issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request:{...request,mood:'optative',tense:'present'}});
 assert.equal(invalidMood.contract.ready,false);assert.equal(decision.isOwnerOperationChoiceAllowed(invalidMood,'tense','nonpast'),true);
 assert.equal(decision.isOwnerOperationChoiceAllowed(invalidMood,'mood','indicative'),true);
 const recoveredMood=issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request:{...invalidMood.contract.request,tense:'nonpast'}});
 assert.equal(recoveredMood.contract.ready,true);
 assert.equal(issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request:{...request,lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'chōca'}}),null);
 assert.equal(projectVerbalDerivationExecution(snapshot).request.args[0],snapshot.contract.request);
 const production=vm.createContext({targetObject:({...owner,isClassicalGrammarApplicationCapabilityNavigator:()=>true}),ActiveClassicalGrammarCapabilityNavigator:ingress,ClassicalConstructionSession:scope.session,PendingClassicalRawAttitudeRequest:request,PendingClassicalPreparedAttitudeResult:null,readClassicalNominalSourceContext:()=>context,createVerbalDerivationScope,issueVerbalDerivationSnapshot});
 const end=code.indexOf('    const ClassicalDerivedFormationScopes =',a);vm.runInContext(code.slice(a,end),production);
 const actual=production.readClassicalVerbalDerivationSnapshot('vnc:derivational-operation',source,null,null);
 assert.equal(actual.contract.presentation.choices.lateOperation.controlId,'classical-attitude-operation');
 assert.equal(production.readClassicalVerbalDerivationSnapshot('vnc:derivational-operation',source,null,null),actual);
 const denominalStart=code.indexOf('    const ClassicalDenominalScopes ='),denominalEnd=code.indexOf('    const ClassicalPlaceGentilicScopes =',denominalStart);
 let adjacentScope;production.createDenominalScope=options=>(adjacentScope=options);production.issueDenominalSnapshot=(_scope,args)=>args.binding;
 vm.runInContext(code.slice(denominalStart,denominalEnd),production);
 const typed={operationId:'vnc:denominal'};assert.equal(production.readClassicalDenominalSnapshot('vnc:denominal',source,null,typed),typed);assert.equal(adjacentScope.presentation,undefined);
});
