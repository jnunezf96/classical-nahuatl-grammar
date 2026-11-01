import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const o=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const ids=f=>f?.options.map(x=>x.optionId);
test('denominal actual path and finite receiver retain rejected tense with authentic recovery',()=>{
 const request={nounStem:'cal',sourceNounClass:'li',operationPath:['possession-ti'],subject:'1sg',mood:'indicative',tense:'invented'};
 const r=o.evaluateClassicalNahuatlDenominalVnc(request);assert.equal(r.authorizationStatus,'blocked');assert(ids(r.choiceOptionProjection?.tense)?.includes('present'));assert.equal(r.choiceOptionProjection.tense.authoredValue,'invented');
 const p=o.prepareClassicalGrammarApplicationRequest({operationId:'vnc:denominal',args:[request]});assert.ok(p);assert.equal(p.canonicalResult.authorizationStatus,'blocked');
 const ready=o.prepareClassicalGrammarApplicationRequest({operationId:'vnc:denominal',args:[{...request,tense:'present'}]});assert.equal(ready?.authorizationStatus,'authorized');assert.equal(o.executeClassicalGrammarApplicationRequest(ready.request,ready).canonicalResult,ready.canonicalResult);
});
test('place actual formation guard issues co/c and exact imperfect correction without widening typed n-can',()=>{
 const request={constructionKind:'place-name',formation:'c',source:{embedStem:'cal'},usage:'adverbial'},r=o.evaluatePlaceGentilicNnc(request);assert.equal(r.authorizationStatus,'blocked');assert(ids(r.choiceOptionProjection?.formation)?.includes('co'));assert(!ids(r.choiceOptionProjection.formation).includes('c'));assert(!ids(r.choiceOptionProjection.formation).includes('n-imperfect-active'));assert.equal(r.choiceOptionProjection.formation.authoredValue,'c');
 const parent=o.requestClassicalVncApplicationResult({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'imperfect',requestedVoice:'active'});
 const exact=o.evaluatePlaceGentilicNnc({canonicalVncResult:parent,constructionKind:'place-name',formation:'n-imperfect-nonactive'});assert.deepEqual(ids(exact.choiceOptionProjection.formation),['n-imperfect-active']);
 const source=o.buildClassicalNahuatlPlaceNominalSourceFrame({embedStem:'coch',matrixStem:'to'}),b=o.issueClassicalNahuatlPlaceNominalBindingFrame(source,{constructionKind:'place-name',formation:'n-can'});assert.deepEqual(b.choiceOptionProjection.formation.map(x=>x.optionId),['n-can']);
 const p=o.prepareClassicalGrammarApplicationRequest({operationId:'nnc:place-gentilic',args:[{...request,formation:'co'}]});assert.ok(p);assert.equal(o.executeClassicalGrammarApplicationRequest(p.request,p).canonicalResult,p.canonicalResult);
});
const nameSource=()=>{const clause=o.buildPersonalNameInnerClauseFrame({sourceFamily:'absolutive-state-nnc',subjectPrefix:'Ø',subjectConnector:'Ø',predicateMorphs:['Xip','e'],numberPrefix:'⎕',numberSuffix:'Ø'});return o.buildPersonalNameNncSourceFrame({sourceFamily:'absolutive-state-nnc',clauses:[clause],referentKind:'god'});};
test('name actual affective guard and explicit sentence semantics preserve invalid choices and exact primary parent',()=>{
 const source=nameSource(),request={sourceFrame:source,outerSubject:'3sg',affectiveScope:'general-use-agentive',affectiveMatrix:'tzin'},r=o.evaluatePersonalNameNnc(request);assert.equal(r.authorizationStatus,'blocked');assert.deepEqual(ids(r.choiceOptionProjection?.affectiveScope),['none','inner-source','outer-name']);assert.equal(r.choiceOptionProjection.affectiveScope.authoredValue,'general-use-agentive');
 const primary=o.prepareClassicalGrammarApplicationRequest({operationId:'nnc:personal-name',args:[{...request,affectiveScope:'outer-name'}]});assert.equal(primary?.authorizationStatus,'authorized');
 const missing=o.evaluatePersonalNameSentenceOperation({personalNameResult:primary.canonicalResult,operation:'god-name-to-place-name-embed',locativeMatrix:''});assert.equal(missing.authorizationStatus,'blocked');assert.equal(missing.choiceOptionProjection.locativeMatrix.inputKind,'text');assert.equal(missing.choiceOptionProjection.operation.options.find(x=>x.optionId==='god-name-to-place-name-embed').reranking,'place-name-embed');
 const receiver=o.prepareClassicalGrammarApplicationRequest({operationId:'nnc:personal-name',outputKind:'sentence-operation',args:[{personalNameResult:primary.canonicalResult,operation:'god-name-to-place-name-embed',locativeMatrix:'tlā-n'}]});assert.ok(receiver);assert.equal(receiver.canonicalResult.personalNameResult,primary.canonicalResult);assert.equal(o.executeClassicalGrammarApplicationRequest(receiver.request,receiver).canonicalResult,receiver.canonicalResult);
 assert.equal(o.evaluatePersonalNameNnc({...request,sourceFrame:{...source}}).choiceOptionProjection,undefined);
});

test('all three transactions retain one prepared Result through preview/Make and reject copied custody',async t=>{
 const {createConstructionSession}=await import('../ui/composition/construction_session.mjs');
 const {executeConstructionPacket}=await import('../ui/composition/construction_packet.mjs');
 const adapters=await Promise.all(['denominal','place_gentilic','personal_name'].map(f=>import(`../ui/composition/${f}_transaction.mjs`)));
 const source=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal',sourceClass:'li'}),name=nameSource();
 for(const [i,operation,src,request,sentence] of [[0,'vnc:denominal',source,{nounStem:'cal',sourceNounClass:'li',operationPath:['possession-ti'],subject:'1sg',mood:'indicative',tense:'present'},{}],[1,'nnc:place-gentilic',source,{constructionKind:'place-name',formation:'co',source:{embedStem:'cal'},usage:'adverbial'},{}],[2,'nnc:personal-name',name,{sourceFrame:name,outerSubject:'3sg'},{operation:'god-name-to-place-name-embed',locativeMatrix:'tlā-n'}]]){
  await t.test(operation,()=>{
  const a=adapters[i],prefix=['Denominal','PlaceGentilic','PersonalName'][i],ingress={},context={source:src,ingress,committed:true,declaration:{mode:'whole-stem',sourceWholeStem:'cal'}},session=createConstructionSession({isSource:x=>x===src});
  const scope=a[`create${prefix}Scope`]({owner:o,source:src,session,getIngress:()=>ingress,getSourceContext:()=>context}),snapshot=a[`issue${prefix}Snapshot`](scope,{ingress,sourceContext:context,request,sentence});
  assert.equal(snapshot?.contract.ready,true,snapshot?.contract.blockReason);assert.ok(snapshot.contract.prepared,operation);
  const packet=a[`project${prefix}Execution`](snapshot);assert.equal(packet.prepared,snapshot.contract.prepared);assert.equal(packet.request,packet.prepared.request);assert.equal(snapshot.contract.preview,packet.prepared.canonicalResult);assert.equal(executeConstructionPacket(o,packet).canonicalResult,snapshot.contract.preview);assert.equal(a[`project${prefix}Execution`]({...snapshot}),null);
  });
 }
});

test('native presentation addresses are projections of the three actual owner decisions',async()=>{
 const {readFileSync}=await import('node:fs'),vm=await import('node:vm'),code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const context={};
 for(const name of ['getClassicalDenominalChoicePresentation','getClassicalPlaceGentilicChoicePresentation','getClassicalPersonalNameChoicePresentation']){
  const start=code.indexOf(`    function ${name}(`);assert(start>=0,name);const end=code.indexOf('\n    }',start)+6;context[name]=vm.compileFunction(`return ${code.slice(start,end)}`,[],{contextExtensions:[context]})();
 }
 assert.equal(context.getClassicalDenominalChoicePresentation().choices.tense.controlId,'classical-rule-logic-tense');assert.equal(context.getClassicalDenominalChoicePresentation().choices.object1.controlId,'classical-denominal-vnc-result-object-1');
 assert.equal(context.getClassicalPlaceGentilicChoicePresentation().choices.formation.controlId,'classical-place-gentilic-formation');assert.equal(context.getClassicalPersonalNameChoicePresentation().choices.operation.controlId,'classical-personal-name-sentence-operation');assert.equal(context.getClassicalPersonalNameChoicePresentation().choices.affectiveScope.controlId,'classical-personal-name-affective-scope');
});

test('gentilic target decisions inherit actual agreement and retain incompatible fixed-state intent',()=>{
 const request={constructionKind:'gentilic',formation:'nonlocative-absolutive',source:{embedStem:'Mēxi'},subject:'3pl',state:'possessive',animacy:'animate'};
 const r=o.evaluatePlaceGentilicNnc(request);assert.equal(r.authorizationStatus,'blocked');assert.deepEqual(ids(r.choiceOptionProjection.state),['absolutive']);assert.equal(r.choiceOptionProjection.state.authoredValue,'possessive');
 const good=o.evaluatePlaceGentilicNnc({...request,state:'absolutive'});assert.equal(good.authorizationStatus,'authorized',good.blockReason);assert(ids(good.choiceOptionProjection.subject).includes('1sg'));assert(ids(good.choiceOptionProjection.pluralConnector).includes('0-h'));assert.ok(good.agreementFrame.receivingDecision.result);
});

test('native owner intent retains immutable operands and actual array and receiving sentence writes',async t=>{
 const protocol=await import('../ui/composition/owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261031-1'),{createConstructionSession}=await import('../ui/composition/construction_session.mjs');
 await t.test('denominal object is an owner-issued whole array and not a DOM object list',async()=>{
  const a=await import('../ui/composition/denominal_transaction.mjs'),source=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal',sourceClass:'tli-1'}),ingress={},context={source,ingress,committed:true,declaration:{mode:'whole-stem',sourceWholeStem:'cal'}},session=createConstructionSession({isSource:x=>x===source});
  const scope=a.createDenominalScope({owner:o,source,session,getIngress:()=>ingress,getSourceContext:()=>context,presentation:{choices:{object1:{controlId:'object'}}}}),request={nounStem:'cal',sourceNounClass:'tli',operationPath:['applicative-huia-use'],subject:'1sg',mood:'indicative',tense:'present',objectPeople:['3sg']},snapshot=a.issueDenominalSnapshot(scope,{ingress,sourceContext:context,request});assert.equal(snapshot.contract.ready,true,snapshot.contract.blockReason);
  session.stage({source,route:{operation:'vnc:denominal'},operationContract:snapshot,slots:snapshot.captures,ready:true,execution:a.projectDenominalExecution(snapshot)});
  const control={id:'object'},intent=protocol.readOwnerOperationControlIntent(snapshot,{getElementById:()=>control},snapshot.contract.request,control,'non-specific-human');assert(Array.isArray(intent.objectPeople));assert.deepEqual(intent.objectPeople,['non-specific-human']);assert.deepEqual(snapshot.contract.request.objectPeople,['3sg']);
  const next=a.issueDenominalSnapshot(scope,{ingress,sourceContext:context,request:intent});assert.equal(next.contract.ready,true,next.contract.blockReason);assert.equal(next.contract.preview.receivingDecision.request.sourceValence,'projective-human');
  assert.equal(protocol.readOwnerOperationControlIntent({...snapshot},{getElementById:()=>control},request,control,'non-specific-human'),null);
 });
 await t.test('name receiver primitive intent retains primary Source and exact prepared parent',async()=>{
  const a=await import('../ui/composition/personal_name_transaction.mjs'),source=nameSource(),ingress={},context={source,ingress,committed:true},session=createConstructionSession({isSource:x=>x===source});
  const scope=a.createPersonalNameScope({owner:o,source,session,getIngress:()=>ingress,getSourceContext:()=>context,presentation:{choices:{locativeMatrix:{controlId:'matrix'},reranking:{controlId:'reranking'}}}}),request={sourceFrame:source,outerSubject:'3sg'},snapshot=a.issuePersonalNameSnapshot(scope,{ingress,sourceContext:context,request,sentence:{operation:'god-name-to-place-name-embed',locativeMatrix:''}});assert.equal(snapshot.contract.ready,false);session.stage({source,route:{operation:'nnc:personal-name'},operationContract:snapshot,slots:snapshot.captures,ready:false,execution:null});
  const control={id:'matrix'},next=protocol.readOwnerOperationControlIntent(snapshot,{getElementById:()=>control},snapshot.contract.authoredSelections,control,'tlā-n');assert.equal(next.sourceFrame,source);assert.equal(next.sentence.locativeMatrix,'tlā-n');
  const {sentence,...primary}=next,ready=a.issuePersonalNameSnapshot(scope,{ingress,sourceContext:context,request:primary,sentence});assert.equal(ready.contract.ready,true);assert.equal(ready.contract.preview.personalNameResult,ready.contract.namePrepared.canonicalResult);assert.equal(snapshot.contract.preview.authorizationStatus,'blocked');
 });
});

test('denominal implicit single operation retains the existing owner API while explicit malformed paths stay rejected',()=>{
 const request={nounStem:'cal',operationId:'possession-ti',subject:'1sg',mood:'indicative',tense:'present'};
 const result=o.evaluateClassicalNahuatlDenominalVnc(request);assert.equal(result.authorizationStatus,'authorized',result.blockReason);assert.equal(result.selectedPathChoice.operationId,'possession-ti');assert.equal(o.evaluateClassicalNahuatlDenominalVnc({...request,operationPath:[]}).authorizationStatus,'authorized','existing empty path normalizes to the explicit single operation');
 assert.equal(o.evaluateClassicalNahuatlDenominalVnc({...request,operationPath:['invented']}).authorizationStatus,'blocked');assert.equal(o.evaluateClassicalNahuatlDenominalVnc({...request,classChoice:'C'}).authorizationStatus,'blocked');
});
test('place and gentilic offerings share contextual formation prerequisites with realization',()=>{
 const request={constructionKind:'gentilic',formation:'ca-pan-eca',source:{embedStem:'Mēxi'},subject:'3sg'},r=o.evaluatePlaceGentilicNnc(request);assert.equal(r.authorizationStatus,'blocked');assert(!ids(r.choiceOptionProjection.formation).includes('ca-pan-eca'));assert(!ids(r.choiceOptionProjection.formation).includes('ca-can-meca'));assert(!ids(r.choiceOptionProjection.formation).includes('two-clause-concatenate'));assert.equal(r.choiceOptionProjection.formation.authoredValue,'ca-pan-eca');
 const place=o.evaluatePlaceGentilicNnc({constructionKind:'place-name',formation:'co-place-affective',source:{embedStem:'cal'}});assert.equal(place.authorizationStatus,'blocked');assert(!ids(place.choiceOptionProjection.formation).includes('co-place-affective'));
 const good=o.evaluatePlaceGentilicNnc({...request,source:{embedStem:'Cal-pan'}});assert.equal(good.authorizationStatus,'authorized',good.blockReason);assert(ids(good.choiceOptionProjection.formation).includes('ca-pan-eca'));
 const affective=o.evaluatePlaceGentilicNnc({constructionKind:'place-name',formation:'co-place-affective',source:{embedStem:'Ā-tōy-a-co',affectiveMatrix:'tzin',analysisKind:'place-name-affective'}});assert.equal(affective.authorizationStatus,'authorized');assert(ids(affective.choiceOptionProjection.formation).includes('co-place-affective'));
});

test('included possessor target context retains incompatible authored tense and exclamation for explicit recovery',()=>{
 const request={nounStem:'tlahuēlil',sourceKind:'possessive-nnc-predicate',sourceState:'possessive',possessor:'1sg',operationId:'included-possessor-ti',operationPath:['included-possessor-ti'],subject:'2sg',mood:'indicative',tense:'present',exclamatory:false};
 const r=o.evaluateClassicalNahuatlDenominalVnc(request);assert.equal(r.authorizationStatus,'blocked');assert.deepEqual(ids(r.choiceOptionProjection.tense),['preterit']);assert.equal(r.choiceOptionProjection.tense.authoredValue,'present');assert.deepEqual(ids(r.choiceOptionProjection.exclamatory),[true]);assert.equal(r.choiceOptionProjection.exclamatory.authoredValue,false);
 const good=o.evaluateClassicalNahuatlDenominalVnc({...request,tense:'preterit',exclamatory:true});assert.equal(good.authorizationStatus,'authorized',good.blockReason);assert.equal(good.receivingDecision.request.tense,'preterit');
});

test('existing place extension and collectivity target controls use actual lexical and connector owners',()=>{
 const request={constructionKind:'profession-place-association',lexicalId:'invented',source:{embedStem:'cal'},subject:'3sg',state:'absolutive'},r=o.evaluatePlaceGentilicNnc(request);assert.equal(r.authorizationStatus,'blocked');assert(ids(r.choiceOptionProjection.lexicalId)?.includes('toltec-craftsman'));assert(!ids(r.choiceOptionProjection.lexicalId).includes('tlillan-calqui'));assert.equal(r.choiceOptionProjection.lexicalId.authoredValue,'invented');
});
test('collectivity connector intent remains authored until an actual owner correction',()=>{
 const collective={constructionKind:'gentilic-collective',source:{gentilicStem:'Mē-xi-h-ca'},subject:'3sg',state:'possessive',possessor:'3sg',collectivityPossessiveVariant:'invented'},bad=o.evaluatePlaceGentilicNnc(collective);assert.equal(bad.authorizationStatus,'blocked');assert.deepEqual(ids(bad.choiceOptionProjection.collectivityPossessiveVariant),['0','uh']);assert.equal(o.evaluatePlaceGentilicNnc({...collective,collectivityPossessiveVariant:'uh'}).authorizationStatus,'authorized');
});

test('typed denominal presentation retains its actual binding domain instead of promoting lower raw fields',async()=>{
 const a=await import('../ui/composition/denominal_transaction.mjs'),{createConstructionSession}=await import('../ui/composition/construction_session.mjs'),source=o.buildClassicalNahuatlBoundNominalSourceFrame({nounStem:'ix'}),ingress=o.getClassicalGrammarApplicationCapabilityNavigator(source),missing=o.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'vnc:denominal',{}),path=missing.ownerBindingFrame.choiceOptionProjection.pathChoiceId[0]?.optionId;assert.ok(path);
 const binding=o.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'vnc:denominal',{pathChoiceId:path,subject:'3sg',mood:'indicative',tense:'present'}),session=createConstructionSession({isSource:x=>x===source}),scope=a.createDenominalScope({owner:o,source,session,getIngress:()=>ingress}),snapshot=a.issueDenominalSnapshot(scope,{ingress,binding});assert.equal(snapshot.contract.ready,true,snapshot.contract.blockReason);assert.equal(snapshot.contract.choices,binding.choiceOptionProjection);assert.equal(snapshot.contract.choices.object1,undefined);assert.deepEqual(snapshot.contract.effectiveSelections,binding.effectiveSelections);
});
