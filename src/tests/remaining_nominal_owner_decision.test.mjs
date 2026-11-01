import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const o=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const ids=field=>field?.options.map(option=>option.optionId);
const noun=(stem='tepi',sourceClass='zero')=>{
 const source=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});
 const operation=o.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive'});
 const result=o.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,operation]}).canonicalResult;assert.equal(result.authorizationStatus,'authorized',result.blockReason);return result;
};
test('adjectival decision retains semantic rejection and delegates target inflection to the exact Source family',()=>{
 const parent=noun(),request={constructionKind:'adjectival-nnc',adjectivalOperation:'invented',subject:'3sg',state:'absolutive',animacy:'animate',source:{canonicalNncResult:parent}};
 const rejected=o.evaluateClassicalNahuatlNominalConstruction(request);assert.equal(rejected.authorizationStatus,'blocked');
 assert.deepEqual(ids(rejected.choiceOptionProjection?.adjectivalOperation),['quality-intensification','distribution-variety']);
 assert.equal(rejected.choiceOptionProjection.adjectivalOperation.authoredValue,'invented');
 const good=o.evaluateClassicalNahuatlNominalConstruction({...request,adjectivalOperation:'quality-intensification'});assert.equal(good.authorizationStatus,'authorized',good.blockReason);
 assert(good.choiceOptionProjection.subject.options.length);assert.equal(good.sourceFrame.canonicalNncResult,parent);
 const copied=o.evaluateClassicalNahuatlNominalConstruction({...request,source:{canonicalNncResult:{...parent}}});assert.equal(copied.choiceOptionProjection,undefined);
});
test('raw cardinal decisions preserve incompatible agreement and share actual number, variant and finite receiving guards',()=>{
 const request={constructionKind:'cardinal-numeral-nnc',value:2,countKind:'ordinary',classifier:'basic',subject:'3pl',state:'absolutive',animacy:'animate',ordinaryNumberVariant:'invented'};
 const rejected=o.evaluateClassicalNahuatlNominalConstruction(request);assert.equal(rejected.authorizationStatus,'blocked');
 assert.deepEqual(ids(rejected.choiceOptionProjection?.ordinaryNumberVariant),['tin','zero']);
 assert.equal(rejected.choiceOptionProjection.ordinaryNumberVariant.authoredValue,'invented');
 const badSubject=o.evaluateClassicalNahuatlNominalConstruction({...request,ordinaryNumberVariant:'tin',animacy:'nonanimate'});assert.equal(badSubject.authorizationStatus,'blocked');
 assert.deepEqual(ids(badSubject.choiceOptionProjection.subject),['3common']);assert.equal(badSubject.choiceOptionProjection.subject.authoredValue,'3pl');
 const ready=o.evaluateClassicalNahuatlNominalConstruction({...request,ordinaryNumberVariant:'zero'});assert.equal(ready.authorizationStatus,'authorized',ready.blockReason);assert.equal(ready.choiceOptionProjection.value.inputKind,'text');
 const receiving=o.evaluateClassicalNahuatlNominalConstruction({...request,numeralOutputKind:'vnc-embed',subject:'3sg',ordinaryNumberVariant:'tin',tense:'invented',source:{matrixStem:'chōca',matrixVerbClass:'A',matrixValence:'intransitive'}});
 assert.equal(receiving.authorizationStatus,'blocked');assert.deepEqual(ids(receiving.choiceOptionProjection.countKind),['ordinary']);assert.deepEqual(ids(receiving.choiceOptionProjection.classifier),['basic']);assert(ids(receiving.choiceOptionProjection.tense).includes('present'));assert.equal(receiving.choiceOptionProjection.tense.authoredValue,'invented');
});
test('minor deverbal targets issue vocative recovery and exact citation and double-nucleus target restrictions',()=>{
 const preterit=o.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'predicate-nominalization',nominalizationKind:'preterit-agentive',source:{sourceStage:'preterit-predicate',sourceStem:'pix',verbClass:'A',sourceVoice:'active',sourceValence:'intransitive',sourceObjectPattern:'none',sourceSubject:'3sg'},subject:'3sg',state:'absolutive',animacy:'animate'});assert.equal(preterit.authorizationStatus,'authorized',preterit.blockReason);
 const vocative=o.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'vocative',canonicalNncResult:preterit.canonicalResult,hToYVariant:true});assert.equal(vocative.authorizationStatus,'blocked');
 assert.deepEqual(ids(vocative.choiceOptionProjection?.hToYVariant),[false]);assert.equal(vocative.choiceOptionProjection.hToYVariant.authoredValue,true);
 const double=o.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'double-nucleus-ownerhood',source:{principalNncResult:preterit,supplementNncResult:noun(),supplementationAnalysis:'fixed-order-subject-supplementation'},subject:'3sg',state:'invented',animacy:'animate'});
 assert.equal(double.authorizationStatus,'blocked');assert.deepEqual(ids(double.choiceOptionProjection.state),['absolutive','possessive']);
 const finite=o.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'imperfect',requestedVoice:'active'});
 const instrument=o.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'predicate-nominalization',nominalizationKind:'instrumentive',canonicalVncResult:finite,subject:'3common',state:'possessive',possessor:'3sg',animacy:'nonanimate'});assert.equal(instrument.authorizationStatus,'authorized',instrument.blockReason);
 const citation=o.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'predicate-citation',canonicalNncResult:instrument,subject:'3common',state:'possessive',animacy:'nonanimate'});assert.equal(citation.authorizationStatus,'blocked');assert.deepEqual(ids(citation.choiceOptionProjection.state),['absolutive']);
});
test('raw adverbial matrix fields inherit only forwarded receiving choices and retain rejected receiving identity',()=>{
 const potential=o.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:'quēn'}),request={adverbialPotentialFrame:potential,degree:potential.allowedDegrees[0],scope:'incorporated-predicate',matrix:{stem:'chōca',verbClass:'A',valence:'intransitive',subject:'3sg',mood:'indicative',tense:'invented',voice:'active'}};
 const rejected=o.evaluateClassicalNahuatlAdverbialNuclear(request);assert.equal(rejected.authorizationStatus,'blocked');
 assert(ids(rejected.choiceOptionProjection?.tense).includes('present'));assert.deepEqual(rejected.choiceOptionProjection.tense.requestPath,['matrix','tense']);assert.equal(rejected.choiceOptionProjection.tense.authoredValue,'invented');
 assert.equal(rejected.receivingDecision.request.tense,'invented');assert.equal(rejected.receivingDecision.result.authorizationStatus,'blocked');
 const ready=o.evaluateClassicalNahuatlAdverbialNuclear({...request,matrix:{...request.matrix,tense:'present'}});assert.equal(ready.authorizationStatus,'authorized',ready.blockReason);
 assert.equal(ready.canonicalResult,ready.receivingDecision.result);assert.equal(ready.choiceOptionProjection.nonactiveOptionId,undefined);
});

test('production presentation claims cardinal, adjectival and adverbial receiving controls without a second option authority',async()=>{
 const {readFileSync}=await import('node:fs'),vm=await import('node:vm');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const ctx={ClassicalAdverbialChoiceAddresses:{degree:'degree',scope:'scope'},getClassicalBasalUnitFromSurfaceForRendering:()=> 'nnc',getClassicalNuclearSentencePresentation:()=>({choices:{}})};
 for(const name of ['getClassicalNominalEmbedChoicePresentation','getClassicalNominalChoicePresentation','getClassicalAdverbialChoicePresentation']){
  const a=code.indexOf(`    function ${name}(`),b=code.indexOf('\n    }',a)+6;
  ctx[name]=vm.compileFunction(`return ${code.slice(a,b)}`,[],{contextExtensions:[ctx]})();
 }
 assert.equal(ctx.getClassicalNominalChoicePresentation('cardinal-numeral-nnc').choices.value.controlId,'classical-cardinal-value');
 assert.equal(ctx.getClassicalNominalChoicePresentation('adjectival-nnc').choices.adjectivalOperation.controlId,'classical-adjectival-nnc-operation');
 assert.equal(ctx.getClassicalAdverbialChoicePresentation().choices.tense.controlId,'classical-rule-logic-tense');
});

test('remaining owner choices preserve immutable parents, forged admission, explicit Make and post-Make staging',async()=>{
 const a=await import('../ui/composition/nominal_operation_transaction.mjs'),d=await import('../ui/composition/derived_formation_transaction.mjs');
 const protocol=await import('../ui/composition/owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261031-1');
 const {createConstructionSession}=await import('../ui/composition/construction_session.mjs');
 const {executeConstructionPacket}=await import('../ui/composition/construction_packet.mjs');
 const {previewConstructionPacket}=await import('../ui/composition/construction_preview.mjs');
 const source=o.buildClassicalNahuatlNominalConstructionTypedSourceFrame({stem:'cin-teō',embedStem:'cin',matrixStem:'teō',sourceClass:'tl'}),ingress={},context=Object.freeze({source,ingress,committed:true});
 let makes=0;const session=createConstructionSession({isSource:x=>x===source,isResult:x=>o.isClassicalNahuatlNominalConstructionResult(x),execute:p=>{makes++;return executeConstructionPacket(o,p)},present:()=>true});
 const scope=a.createNominalOperationScope({owner:o,source,session,getIngress:()=>ingress,sourceContext:context,getSourceContext:()=>context,presentation:{choices:{ordinaryNumberVariant:{controlId:'number'}}}});
 const request={constructionKind:'cardinal-numeral-nnc',value:2,countKind:'ordinary',classifier:'basic',subject:'3pl',state:'absolutive',animacy:'animate',ordinaryNumberVariant:'invented'};
 const blocked=a.issueNominalOperationSnapshot(scope,{ingress,sourceContext:context,request});assert.equal(blocked.contract.ready,false);assert.equal(a.projectNominalOperationExecution(blocked),null);assert(Object.isFrozen(blocked.contract.choices));assert.equal(protocol.projectOwnerOperationDecision({...blocked}),null);
 session.stage({source,route:{operation:'grammar:nominal-construction'},operationContract:blocked,slots:blocked.captures,ready:false});
 const control={id:'number',tagName:'SELECT',value:'invented'};
 assert.equal(protocol.isOwnerOperationChoiceAllowed(blocked,'ordinaryNumberVariant','forged'),false);
 const corrected=protocol.readOwnerOperationControlIntent(blocked,{getElementById:()=>control},blocked.contract.request,control,'zero');
 assert.equal(corrected.ordinaryNumberVariant,'zero');assert.equal(blocked.contract.request.ordinaryNumberVariant,'invented');
 const ready=a.issueNominalOperationSnapshot(scope,{ingress,sourceContext:context,request:corrected});assert.equal(ready.contract.ready,true,ready.contract.blockReason);
 session.stage({source,route:{operation:'grammar:nominal-construction'},operationContract:ready,slots:ready.captures,execution:a.projectNominalOperationExecution(ready),ready:true});
 assert.equal(makes,0);assert.equal(ready.contract.request,ready.contract.prepared.request.args[0]);assert.equal(previewConstructionPacket(o,a.projectNominalOperationExecution(ready)).canonicalResult,ready.contract.preview);assert.equal(session.make(),true);assert.equal(makes,1);const accepted=session.position.accepted;
 const staged=a.issueNominalOperationSnapshot(scope,{ingress,sourceContext:context,request:{...corrected,ordinaryNumberVariant:'tin'}});session.stage({source,route:{operation:'grammar:nominal-construction'},operationContract:staged,slots:staged.captures,execution:a.projectNominalOperationExecution(staged),ready:true});assert.equal(session.position.accepted,accepted);assert.equal(makes,1);assert.equal(session.position.construction.source,source);
 const potential=o.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:'quēn'}),adverbSource=potential.lexicalNncSourceFrame,adverbContext=Object.freeze({source:adverbSource,ingress,committed:true}),ss=createConstructionSession({isSource:x=>x===adverbSource});
 const ds=d.createDerivedFormationScope({owner:o,source:adverbSource,operation:'nnc:adverbial',session:ss,getIngress:()=>ingress,getSourceContext:()=>adverbContext,presentation:{choices:{tense:{controlId:'tense'}}}});
 const snapshot=d.issueDerivedFormationSnapshot(ds,{ingress,sourceContext:adverbContext,request:{adverbialPotentialFrame:potential,degree:potential.allowedDegrees[0],scope:'incorporated-predicate',matrix:{stem:'chōca',verbClass:'A',valence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',voice:'active'}}});assert.equal(snapshot.contract.ready,true,snapshot.contract.blockReason);
 ss.stage({source:adverbSource,route:{operation:'nnc:adverbial'},operationContract:snapshot,slots:snapshot.captures,execution:d.projectDerivedFormationExecution(snapshot),ready:true});
 const next=protocol.readOwnerOperationControlIntent(snapshot,{getElementById:()=>null},snapshot.contract.request,{id:'tense',tagName:'SELECT',value:'present'},'imperfect');assert.equal(next.matrix.tense,'imperfect');assert.equal(next.adverbialPotentialFrame,potential);assert.equal(snapshot.contract.request.matrix.tense,'present');assert.equal(d.projectDerivedFormationExecution(snapshot).request.args[0],snapshot.contract.request);
 const parent=noun(),binding=o.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',parent),s3=createConstructionSession({isSource:x=>x===parent}),as=a.createNominalOperationScope({owner:o,source:parent,session:s3,getIngress:()=>ingress,presentation:{choices:{subject:{controlId:'subject'}}}});
 const adjective=a.issueNominalOperationSnapshot(as,{ingress,binding,selectedBindingId:'adjectival-nnc:source-result',request:{constructionKind:'adjectival-nnc',adjectivalOperation:'quality-intensification',subject:'3sg',state:'absolutive',animacy:'animate',source:{canonicalNncResult:parent}}});assert.equal(adjective.contract.ready,true,adjective.contract.blockReason);
 const moved=protocol.readOwnerOperationControlIntent(adjective,{getElementById:()=>null},adjective.contract.request,{id:'subject',tagName:'SELECT',value:'3sg'},'2sg');assert.equal(moved.source.canonicalNncResult,parent);assert.equal(moved.constructionKind,'adjectival-nnc');
 assert.equal(a.issueNominalOperationSnapshot(as,{ingress,binding:{...binding},selectedBindingId:'adjectival-nnc:source-result',request:moved}),null);
});

test('possessed adjective realizes the same original-family possessor it offers and retains exact parent',()=>{
 const source=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'tepi',sourceClass:'zero'}),operation=o.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'possessive',possessor:'2sg'});
 const parent=o.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,operation]}).canonicalResult;assert.equal(parent.authorizationStatus,'authorized');
 const request={constructionKind:'adjectival-nnc',adjectivalOperation:'quality-intensification',subject:'3sg',state:'possessive',possessor:'1sg',animacy:'animate',source:{canonicalNncResult:parent}};
 const made=o.evaluateClassicalNahuatlNominalConstruction(request);assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 assert.equal(made.sourceFrame.canonicalNncResult,parent);assert.equal(made.sourceFrame.sourceInflectionResult.operationFrame.possessor,'1sg');assert.equal(made.canonicalResult.stateFrame.possessor,'1sg');assert.equal(made.choiceOptionProjection.possessor.selectedValue,'1sg');
 assert.equal(parent.operationFrame.possessor,'2sg');
});

test('contextual cardinal classifier domain shares real twenty-group and cob guards even with typed compatibility',()=>{
 const base={constructionKind:'cardinal-numeral-nnc',countKind:'ordinary',classifier:'basic',subject:'3common',state:'absolutive',animacy:'nonanimate'};
 for(const value of [2,400]){const frame=o.evaluateClassicalNahuatlNominalConstruction({...base,value});const values=ids(frame.choiceOptionProjection.classifier);for(const classifier of ['tecpan','ipil','quimil'])assert.equal(values.includes(classifier),false,`${value}:${classifier}`);}
 const guarded=o.evaluateClassicalNahuatlNominalConstruction({...base,value:40,classifier:'cob',source:{compatibleClassifiers:['basic','cob']}});assert.equal(guarded.authorizationStatus,'blocked');assert.deepEqual(ids(guarded.choiceOptionProjection.classifier),['basic']);assert.equal(guarded.choiceOptionProjection.classifier.authoredValue,'cob');
});
test('malformed vocative Boolean remains rejected until explicit owner correction',()=>{
 const source=o.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'predicate-nominalization',nominalizationKind:'preterit-agentive',source:{sourceStage:'preterit-predicate',sourceStem:'pix',verbClass:'A',sourceVoice:'active',sourceValence:'intransitive',sourceObjectPattern:'none',sourceSubject:'3sg'},subject:'3sg',state:'absolutive',animacy:'animate'});
 const request={constructionKind:'vocative',canonicalNncResult:source.canonicalResult,hToYVariant:'invented'};
 const bad=o.evaluateClassicalNahuatlDeverbalNnc(request);assert.equal(bad.authorizationStatus,'blocked');assert.equal(bad.choiceOptionProjection.hToYVariant.authoredValue,'invented');assert.deepEqual(ids(bad.choiceOptionProjection.hToYVariant),[false]);
 assert.equal(o.evaluateClassicalNahuatlDeverbalNnc({...request,hToYVariant:false}).authorizationStatus,'authorized');
});

test('raw gross possessor context explicitly declares plural reference through the owner choice',async()=>{
 const a=await import('../ui/composition/nominal_operation_transaction.mjs'),protocol=await import('../ui/composition/owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261031-1'),{createConstructionSession}=await import('../ui/composition/construction_session.mjs');
 const source=o.buildClassicalNahuatlNominalConstructionTypedSourceFrame({stem:'cin-teō',embedStem:'cin',matrixStem:'teō',sourceClass:'tl'}),ingress={},context=Object.freeze({source,ingress,committed:true}),session=createConstructionSession({isSource:x=>x===source});
 const scope=a.createNominalOperationScope({owner:o,source,session,getIngress:()=>ingress,sourceContext:context,getSourceContext:()=>context,presentation:{choices:{grossPossessorKind:{controlId:'kind'}}}});
 const request={constructionKind:'cardinal-numeral-nnc',value:2,countKind:'gross',classifier:'basic',subject:'3pl',state:'possessive',possessor:'3pl',animacy:'animate',source:{grossPossessorKind:'animate',grossPossessiveNumberVariant:'tin',possessorReferentPlural:false}};
 const initial=a.issueNominalOperationSnapshot(scope,{ingress,sourceContext:context,request});assert.equal(initial.contract.ready,true,initial.contract.blockReason);
 const next=protocol.readOwnerOperationControlIntent(initial,{getElementById:()=>null},initial.contract.request,{id:'kind',tagName:'SELECT',value:'animate'},'nonanimate');
 assert.equal(next.source.possessorReferentPlural,true);assert.equal(next.possessor,'3pl');assert.equal(initial.contract.request.source.possessorReferentPlural,false);
 const pending=a.issueNominalOperationSnapshot(scope,{ingress,sourceContext:context,request:next});assert.equal(pending.contract.ready,false);assert.equal(pending.contract.choices.possessor.authoredValue,'3pl');assert.deepEqual(ids(pending.contract.choices.possessor),['3sg']);
 const corrected=a.issueNominalOperationSnapshot(scope,{ingress,sourceContext:context,request:{...next,possessor:'3sg'}});assert.equal(corrected.contract.ready,true,corrected.contract.blockReason);assert.equal(corrected.contract.preview.operationFrame.grossPossessiveFrame.possessorReferentPlural,true);
});
