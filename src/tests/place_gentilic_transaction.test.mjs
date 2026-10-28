import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {createPlaceGentilicScope,issuePlaceGentilicSnapshot,projectPlaceGentilicExecution} from '../ui/composition/place_gentilic_transaction.mjs';
const {r:owner}=await createPossessiveFixture('cal');
function harness(source){const ingress={},session=createConstructionSession({isSource:x=>x===source});let context={source,ingress,committed:true,declaration:{mode:"whole-stem",sourceWholeStem:"cal"}};const scope=createPlaceGentilicScope({owner,source,session,getIngress:()=>ingress,getSourceContext:()=>context});return {source,ingress,session,scope,get context(){return context;},revoke(){context=null;}};}
test('native place request is immutable, current Apply scoped and shared by preview and execution',()=>{
 const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal'}),h=harness(source),request={constructionKind:'place-name',formation:'co',source:{embedStem:'cal'},usage:'adverbial'};
 const s=issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,sourceContext:h.context,request});assert.equal(s?.contract.ready,true);assert.equal(s.routeId,'place-name:co');assert.equal(s.contract.preview.wordSurface,'calco');assert.equal(projectPlaceGentilicExecution(s).request.args[0],s.contract.request);
 assert.equal(issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,sourceContext:h.context,request:{...request,source:{...request.source}}}),s);
 request.source.embedStem='changed';assert.equal(s.contract.request.source.embedStem,'cal');h.revoke();assert.equal(projectPlaceGentilicExecution(s),null);
});
test('exact formation binding preserves named NNC parent and selected formation correspondence',()=>{
 const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal'}),op=owner.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{state:'absolutive',subject:'3common'}),parent=owner.requestClassicalOrdinaryNncResult(source,op),h=harness(parent);
 const binding=owner.issueClassicalGrammarFormationResultBindingFrame('nnc:place-gentilic',parent,{constructionKind:'place-name',formation:'co'}),request={canonicalNncResult:parent,constructionKind:'place-name',formation:'co',usage:'adverbial'};
 const s=issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,binding,request});assert.equal(s?.contract.ready,true);assert.equal(s.contract.preview.canonicalNncResult,parent);assert.equal(s.contract.request.canonicalNncResult,parent);
 assert.equal(issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,binding:{...binding},request}),null);
 assert.equal(issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,binding,request:{...request,formation:'n-yan'}}),null);
 assert.equal(issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,binding,request:{...request,canonicalNncResult:{...parent}}}),null);
 assert.equal(issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,binding,request:{constructionKind:'place-name',formation:'co',ignored:{canonicalNncResult:parent}}}),null,'an exact parent in an ignored role cannot authorize execution');
 const two=owner.issueClassicalGrammarFormationResultBindingFrame('nnc:place-gentilic',parent,{constructionKind:'gentilic',formation:'two-clause-concatenate'}),missing=issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,binding:two,request:{canonicalNncResult:parent,constructionKind:'gentilic',formation:'two-clause-concatenate'}});assert.equal(Boolean(missing?.contract.ready),false,'one exact parent does not fabricate the second clause');assert.equal(projectPlaceGentilicExecution(missing),null);
});
for(const [stem,voice,option,formation]of [['chōca','active','','n-imperfect-active'],['panō','impersonal','hua:panō-hua','n-imperfect-nonactive']])test(`exact ${voice} imperfect retains named canonical nominalization fields`,()=>{
 const parent=owner.requestClassicalVncApplicationResult({sourceStem:stem,verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'imperfect',requestedDerivation:'direct',requestedVoice:voice,nonactiveOptionId:option});assert.equal(parent.authorizationStatus,'authorized');
 const h=harness(parent),binding=owner.issueClassicalGrammarFormationResultBindingFrame('nnc:place-gentilic',parent,{constructionKind:'place-name',formation}),request={canonicalVncResult:parent,constructionKind:'place-name',formation};
 const s=issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,binding,request});assert.equal(s?.contract.ready,true);const a=s.contract.preview.sourceAnalysis;assert.equal(a.canonicalVncResult,parent);assert.ok(a.canonicalImperfectNominalizationResult);assert.ok(a.nominalizedSourceStateFrame);assert.equal(projectPlaceGentilicExecution(s).request.args[0].canonicalVncResult,parent);
 const mixed=issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,binding,request:{...request,source:{embedStem:stem}}});assert.equal(Boolean(mixed?.contract.ready),false);assert.equal(projectPlaceGentilicExecution(mixed),null);
});
test('typed nominal-site owner binding remains narrow and requires its existing choices',()=>{
 const source=owner.buildClassicalNahuatlPlaceNominalSourceFrame({embedStem:'coch',matrixStem:'to'});assert.equal(source.authorizationStatus,'authorized',source.blockReason);
 const ingress=owner.getClassicalGrammarApplicationCapabilityNavigator(source),session=createConstructionSession({isSource:x=>x===source}),scope=createPlaceGentilicScope({owner,source,session,getIngress:()=>ingress});
 assert.equal(scope.operationId,'nnc:place-gentilic','production typed reissue recognizes this coordinated owner');
 const bind=choices=>owner.issueClassicalGrammarTypedSourceOperationBindingFrame(ingress,'nnc:place-gentilic',choices);
 const missing=issuePlaceGentilicSnapshot(scope,{ingress,binding:bind({})});assert.equal(missing?.contract.ready,false);assert.equal(projectPlaceGentilicExecution(missing),null);
 const binding=bind({constructionKind:'place-name',formation:'n-can'}),s=issuePlaceGentilicSnapshot(scope,{ingress,binding});assert.equal(s?.contract.ready,true);assert.equal(projectPlaceGentilicExecution(s).binding,binding);assert.equal(s.contract.request.canonicalNominalSourceFrame,source);
 assert.equal(issuePlaceGentilicSnapshot(scope,{ingress,binding:{...binding}}),null);
});
test('formation intent belongs to current snapshot and restores only offered owner-authorized choices',async()=>{
 const {recordPlaceGentilicFormation,getRememberedPlaceGentilicFormation,capturePlaceGentilicChoiceFrame}=await import('../ui/composition/place_gentilic_transaction.mjs');
 const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal'}),h=harness(source),request={constructionKind:'place-name',formation:'n-yan',source:{embedStem:'cal'},usage:'adverbial'};
 const s=issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,sourceContext:h.context,request});
 h.session.stage({source,route:{operation:'nnc:place-gentilic'},operationContract:s,slots:s.captures,choices:{},ready:false,execution:null});
 const event=capturePlaceGentilicChoiceFrame(s);assert.ok(event);const revision=h.session.position.revision,intent=recordPlaceGentilicFormation(s,'co',event,['co','n-yan']);assert.ok(intent);assert.equal(h.session.position.revision,revision,'intent capture must not invalidate the scheduled choice revision');
 assert.equal(issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,sourceContext:h.context,request:{...request,formation:'co'},intent:{...intent}}),null,'copied intent cannot authorize remembered choices');
 const current=issuePlaceGentilicSnapshot(h.scope,{ingress:h.ingress,sourceContext:h.context,request:{...request,formation:'co'},intent});h.session.stage({source,route:{operation:'nnc:place-gentilic'},operationContract:current,slots:current.captures,ready:true,execution:projectPlaceGentilicExecution(current)});assert.equal(current.contract.memory['place-name'],'co');assert.equal(Object.isFrozen(current.contract.memory),true);
 assert.equal(getRememberedPlaceGentilicFormation(current,'place-name',['co'],request),'co');assert.equal(getRememberedPlaceGentilicFormation(current,'place-name',['n-yan'],request),'');
 assert.equal(recordPlaceGentilicFormation(s,'n-yan',event,['n-yan']),false,'old event cannot rewrite newer snapshot');assert.equal(h.session.position.accepted.result,null);
 h.revoke();assert.equal(getRememberedPlaceGentilicFormation(current,'place-name',['co'],request),'');
});
test('all native formation and extension routes project the same owner-retained request',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');const legacy=readFileSync(new URL('./nnc_place_gentilic.test.js',import.meta.url),'utf8');
 const table=name=>vm.runInNewContext(legacy.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n    \\]);`))[1]);
 const requests=table('placeCases').filter(([id])=>!id.startsWith('n-imperfect')).map(([formation,source])=>({constructionKind:'place-name',formation,source,usage:'adverbial'}));
 requests.push({constructionKind:'place-name',formation:'co-place-affective',source:{embedStem:'Ā-tōy-a-co',affectiveMatrix:'tzin',analysisKind:'place-name-affective'}});
 requests.push(...table('gentilicCases').map(([formation,source,nounClass])=>({constructionKind:'gentilic',formation,source,nounClass,subject:'1sg',animacy:'animate'})));
 requests.push({constructionKind:'gentilic',formation:'two-clause-concatenate',source:{placeStem:'Ātlacuīhuayān',headStem:'tlāca'},subject:'1sg',nounClass:'tl',animacy:'animate'},
 {constructionKind:'gentilic-collective',source:{gentilicStem:'Mē-xi-h-ca'},subject:'3sg',state:'absolutive',nounClass:'tli'},
 {constructionKind:'gentilic-adjectival-use',source:{gentilicStem:'Cuex-tē-ca'},subject:'3sg',nounClass:'tl'},
 {constructionKind:'profession-place-association',extensionKind:'profession',lexicalId:'toltec-craftsman',subject:'1pl',state:'absolutive',pluralConnector:'0-h'},
 {constructionKind:'profession-pertinency',lexicalId:'amantec-feather-worker',subject:'3sg',state:'absolutive',nounClass:'tli'});
 assert.equal(requests.length,36);const ids=new Set();
 for(const original of requests){const stem=original.source?.embedStem||original.source?.gentilicStem||original.source?.placeStem||'cal',request={...original,source:{...original.source,embedStem:stem}},source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem}),ingress={},session=createConstructionSession({isSource:x=>x===source}),context={source,ingress,committed:true,declaration:{mode:'whole-stem',sourceWholeStem:stem}},scope=createPlaceGentilicScope({owner,source,session,getIngress:()=>ingress,getSourceContext:()=>context});
  const s=issuePlaceGentilicSnapshot(scope,{ingress,sourceContext:context,request});assert.equal(Boolean(s?.contract.ready),true,`${original.constructionKind}:${original.formation}: ${s?.contract.blockReason}`);ids.add(s.routeId);assert.equal(projectPlaceGentilicExecution(s).request.args[0]===owner.getClassicalNahuatlPlaceReloadInputs(s.contract.preview),true,s.routeId);
 }
 assert.equal(ids.size,36);
});
