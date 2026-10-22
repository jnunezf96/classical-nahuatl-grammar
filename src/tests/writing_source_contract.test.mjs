import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {isRuntimeCrossModuleCapability} from '../runtime/runtime_capability_contract.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {executeConstructionPacket} from '../ui/composition/construction_packet.mjs';
import {Element} from './helpers/organization_dom.mjs';

const fixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_writing_source_fixture.json',import.meta.url),'utf8'));
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const app=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[fixture.request]});
assert.equal(app.authorizationStatus,'authorized',app.blockReason);
const api=name=>{assert.equal(typeof r[name],'function',`actual canonical runtime capability ${name} is required`);return r[name];};
const fromApplication=(application=app,parts=fixture.morphParts)=>api('issueClassicalNahuatlWritingSourceFromApplication')(application,parts);
const bind=(source,writingVariant='ordinary')=>api('issueClassicalNahuatlTranscriptionBindingFrame')(source,{writingVariant});
const fixed=()=>api('issueClassicalNahuatlWritingSourceFromParticleGroup')(fixture.fixedGroup.map(id=>r.buildClassicalNahuatlParticleSourceFrame(id)));
const options=binding=>binding.choiceOptionProjection?.writingVariant || [];
const selected=(binding,ruleId)=>{const value=options(binding).find(option=>option.ruleId===ruleId)?.value;assert(value,`genuine Source must offer ${ruleId}`);return value;};
const execute=binding=>r.executeClassicalGrammarApplicationRequest({operationId:'orthography:transcription',args:[...binding.executionArgs]});

test('raw whole sound Source offers ordinary writing without manufacturing a grammatical boundary licence',()=>{
 assert.equal(isRuntimeCrossModuleCapability('getActiveClassicalGrammarTypedSourceOperationBinding'),true);
 assert.equal(typeof r.getActiveClassicalGrammarTypedSourceOperationBinding,'function','the actual installed getter is exposed to shell through the real runtime contract');
 const source=r.issueClassicalTranscriptionSourceFrame([{segments:fixture.morphParts.flatMap(p=>p.segments)}]);
 assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),true);
 const binding=bind(source);assert.equal(api('isClassicalNahuatlTranscriptionBindingFrame')(binding),true);
 assert(binding.exactSourceFrame===source);assert.equal(binding.bindingStatus,'ready');
 assert.deepEqual(options(binding).map(x=>x.value),['ordinary']);
 const made=execute(binding);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert(made.canonicalResult.sourceFrame===source);
});

test('genuine original grammar morphs align forward to one full vocable while retaining every zero and sounded part',()=>{
 const source=fromApplication();assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),true);
 assert.equal(source.constituents.length,1,'one NNC vocable is distinct from its morph parts');
 assert.deepEqual([...source.constituents[0].segments],fixture.morphParts.flatMap(p=>p.segments));
 const context=source.writingContext;assert(context.exactApplicationResult===app);assert(context.exactInputResult===app.canonicalResult);
 assert.deepEqual(context.morphParts.map(p=>p.role),fixture.morphParts.map(p=>p.role));
 assert.equal(context.morphParts.find(p=>p.role==='subject-number-1').sourceValue,'uh');
 assert.equal(context.morphParts.find(p=>p.role==='subject-number-2').sourceValue,'0');
 assert.equal(context.morphParts.find(p=>p.role==='subject-number-2').segmentStart,context.morphParts.find(p=>p.role==='subject-number-2').segmentEnd);
 const binding=bind(source);assert.equal(binding.bindingStatus,'ready');
 assert(selected(binding,'cn-l2-211-regressive-dissimilation-kk-hk'));
});

test('copied application, wrong full Source alignment and dropped actual suffix cannot supply the grammar context',()=>{
 assert.notEqual(r.isClassicalNahuatlTranscriptionSourceFrame(fromApplication({...app})),true);
 const wrong=fixture.morphParts.map(p=>({...p,segments:[...p.segments]}));wrong.find(p=>p.role==='matrix').segments[1]='a';
 assert.notEqual(r.isClassicalNahuatlTranscriptionSourceFrame(fromApplication(app,wrong)),true);
 assert.notEqual(r.isClassicalNahuatlTranscriptionSourceFrame(fromApplication(app,fixture.morphParts.filter(p=>p.role!=='subject-number-1'))),true);
 const source=fromApplication();assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame({...source}),false);
 assert.notEqual(bind({...source}).authorizationStatus,'authorized');
});

test('optional consonant Make is a canonical whole transcription Result, retaining original Source and full parent context',()=>{
 const source=fromApplication(),ordinary=bind(source),alternative=selected(ordinary,'cn-l2-211-regressive-dissimilation-kk-hk');
 const operation=bind(source,alternative),made=execute(operation);
 assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 const result=made.canonicalResult;assert.equal(r.isClassicalNahuatlTranscriptionFrame(result),true);
 assert(result.sourceFrame===source);assert(result.operationFrame===operation.executionArgs[1]);
 assert(result.writingContext===source.writingContext);assert(result.writingContext.exactInputResult===app.canonicalResult);
 assert(result.formulaProjection.sourceFrame===source);assert(result.writtenProjection.sourceFrame===source);
 assert.equal(result.formulaDerivedFromWrittenProjection,false);
 assert(result.surface.startsWith('no'));assert(result.surface.endsWith('uh'),'actual sounded possessed suffix must survive');
 assert(result.surface.includes('hquī'),'actual /k/ before ī still requires qu after optional dissimilation');assert.notEqual(result.surface,'hc','the phoneme-operation answer is not the whole writing Result');
});

test('actual fixed zā+oc Source supplies the set-group licence and whole ordinary/elided alternatives',()=>{
 const parents=fixture.fixedGroup.map(id=>r.buildClassicalNahuatlParticleSourceFrame(id));
 const source=api('issueClassicalNahuatlWritingSourceFromParticleGroup')(parents);
 assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),true);
 assert(source.writingContext.parentSources[0]===parents[0]);assert(source.writingContext.parentSources[1]===parents[1]);
 const ordinary=bind(source),elision=selected(ordinary,'cn-l2-214-short-vowel-stress-group-elision');
 assert.equal(execute(ordinary).canonicalResult.surface,'zā oc');
 const made=execute(bind(source,elision));assert.equal(made.authorizationStatus,'authorized');assert.equal(made.canonicalResult.surface,'zāc');
 assert(made.canonicalResult.sourceFrame===source);assert(made.canonicalResult.writingContext===source.writingContext);
 assert.notEqual(r.isClassicalNahuatlTranscriptionSourceFrame(api('issueClassicalNahuatlWritingSourceFromParticleGroup')([{...parents[0]},parents[1]])),true);
});

test('arbitrary nonce+oc and caller elision flags cannot become a licensed set group',()=>{
 const source=r.issueClassicalTranscriptionSourceFrame([{segments:fixture.morphParts.find(p=>p.role==='embed').segments},{segments:['o','/k/']}]);
 assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),true);
 const binding=bind(source);assert(!options(binding).some(p=>/elision/u.test(p.ruleId || '')));
 assert.notEqual(bind(source,'cn-l2-214-short-vowel-stress-group-elision').authorizationStatus,'authorized');
 const forged=r.buildClassicalNahuatlTranscriptionSourceFrame({constituents:source.constituents,stressGroupCombination:true});
 assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(forged),false);
 const group=fixed();assert.notEqual(r.buildClassicalNahuatlTranscriptionFrame({...group},{stressGroupCombination:true}).authorizationStatus,'authorized');
});

test('genuine typed Source/navigation/packet preserves accepted receipt until Make, including ordinary reversal',()=>{
 const source=fixed(),nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 assert.equal(r.isClassicalGrammarApplicationCapabilityNavigator(nav),true);
 assert.equal(nav.operations.find(x=>x.operationId==='orthography:transcription')?.availabilityStatus,'available');
 const issue=writingVariant=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'orthography:transcription',{writingVariant});
 const first=issue('ordinary');assert.equal(first.bindingStatus,'ready');const elision=selected(first.ownerBindingFrame,'cn-l2-214-short-vowel-stress-group-elision');
 let executions=0;const session=createConstructionSession({isSource:v=>v===source,isResult:v=>r.isClassicalNahuatlTranscriptionFrame(v)||v===app.canonicalResult,
  execute:packet=>{executions++;return executeConstructionPacket(r,packet);},present:()=>true});
 const receipt=Object.freeze({application:app});session.restore(app.canonicalResult,receipt);
 const stage=binding=>session.stage({source,route:{operation:'orthography:transcription',binding:'typed-source'},slots:[],choices:{writingVariant:binding.effectiveSelections.writingVariant},legalMoves:[],ready:binding.bindingStatus==='ready',execution:{kind:'typed',operation:'orthography:transcription',source,binding}});
 assert.equal(stage(first),true);assert(session.position.accepted.result===app.canonicalResult);assert(session.position.accepted.receipt===receipt);assert.equal(executions,0);
 assert.equal(session.make(),true);assert.equal(executions,1);const baseline=session.position.accepted.result;
 assert.equal(stage(issue(elision)),true);assert(session.position.accepted.result===baseline);assert.equal(executions,1);assert.equal(session.make(),true);const elided=session.position.accepted.result;
 assert.equal(elided.surface,'zāc');assert.equal(stage(issue('ordinary')),true);assert(session.position.accepted.result===elided);assert.equal(executions,2);assert.equal(session.make(),true);assert.equal(session.position.accepted.result.surface,'zā oc');assert.equal(executions,3);
});

test('actual retained Source Apply must stage an authentic Source without executing or displaying a Result',()=>{
 const rendering=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const page=new Element('main'),root=new Element('section');root.id='classical-transcription-source';const input=new Element('input');input.id='classical-transcription-source-input';root.append(input);page.append(root);
 const target=Object.create(r);Object.defineProperty(target,'document',{value:{getElementById:id=>page.querySelector('#'+id)}});
 Object.defineProperty(target,'setLeftPanelStackMode',{value:()=>{}});
 Object.defineProperty(target,'issueClassicalTranscriptionSourceFrame',{value:constituents=>r.issueClassicalTranscriptionSourceFrame(Array.from(constituents,c=>({segments:Array.from(c.segments)})))});
 let executions=0,displays=0;Object.defineProperty(target,'executeClassicalGrammarApplicationRequest',{value:request=>{executions++;return r.executeClassicalGrammarApplicationRequest({operationId:request.operationId,outputKind:request.outputKind,args:Array.from(request.args)});}});
 const context=vm.createContext({targetObject:target,ActiveClassicalTranscriptionBaselineApplication:null,ActiveClassicalTranscriptionParsedSource:null,
  renderClassicalTranscriptionSurfaceBlock(){displays++;return true;},syncClassicalLesson2OptionalResultControls(){},updateClassicalTranscriptionSourceStatus(){},
  syncClassicalCapabilityNavigator(){},stageClassicalGrammarTypedSourceOperationBinding(){},syncClassicalCapabilityApplyOperationState(){},formatClassicalClauseRelationValue:v=>v});
 context.commitClassicalWritingSource=source=>source;
 for(const name of ['getClassicalTranscriptionOwnerSegmentTokens','parseClassicalTranscriptionSourceInput','applyClassicalTranscriptionSource']){const start=rendering.indexOf(`    function ${name}(`),end=rendering.indexOf('\n    function ',start+1);assert(start>=0);vm.runInContext(rendering.slice(start,end),context);}
 context.applyClassicalTranscriptionSource(fixture.morphParts.flatMap(p=>p.segments).join(' '));
 assert.equal(executions,0,'Source Apply cannot execute the ordinary writing operation');assert.equal(displays,0,'Source Apply cannot replace accepted Result');
});

test('private whole writing operation cannot be copied or moved to another exact Source',()=>{
 const source=fromApplication(),binding=bind(source),operation=binding.executionArgs[1];
 const forged=r.executeClassicalGrammarApplicationRequest({operationId:'orthography:transcription',args:[source,{...operation}]});
 assert.notEqual(forged.authorizationStatus,'authorized');
 const other=fromApplication();
 assert.notEqual(r.executeClassicalGrammarApplicationRequest({operationId:'orthography:transcription',args:[other,operation]}).authorizationStatus,'authorized');
 assert.equal(execute(binding).authorizationStatus,'authorized');
});

test('current genuine grammar and lexical parents are required through Source, binding, navigation and explicit Make',()=>{
 for(const family of ['compound','set-group']){
  const source=family==='compound'?fromApplication():fixed(),binding=bind(source),made=execute(binding);
  const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
  const typed=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'orthography:transcription',{writingVariant:'ordinary'});
  let executions=0;const session=createConstructionSession({isSource:v=>r.isClassicalNahuatlTranscriptionSourceFrame(v),isResult:v=>r.isClassicalNahuatlTranscriptionFrame(v)||v===app.canonicalResult,
   execute:packet=>{executions++;return executeConstructionPacket(r,packet);},present:()=>true});
  const receipt=Object.freeze({application:app});session.restore(app.canonicalResult,receipt);
  session.stage({source,route:{operation:'orthography:transcription',binding:'typed-source'},slots:[],choices:{writingVariant:'ordinary'},legalMoves:[],ready:true,
   execution:{kind:'typed',operation:'orthography:transcription',source,binding:typed}});
  const name=family==='compound'?'isClassicalNahuatlNominalConstructionResult':'isClassicalNahuatlParticleSourceFrame',original=r[name];
  const parent=family==='compound'?app.canonicalResult:source.writingContext.parentSources[1];
  assert.equal(original(parent),true);
  try{
   r[name]=value=>value===parent?false:original(value);
   assert.equal(r[name](parent),false);
   assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),false);
   assert.equal(api('isClassicalNahuatlTranscriptionBindingFrame')(binding),false);
   assert.equal(r.isClassicalNahuatlTranscriptionFrame(made.canonicalResult),false);
   assert.notEqual(r.getClassicalGrammarApplicationCapabilityNavigator(source)?.operations?.find(item=>item.operationId==='orthography:transcription')?.availabilityStatus,'available');
   assert.notEqual(r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'orthography:transcription',{writingVariant:'ordinary'})?.bindingStatus,'ready');
   let rejected=false;try{rejected=execute(binding).authorizationStatus!=='authorized';}catch{rejected=true;}assert.equal(rejected,true);
   assert.equal(session.make(),false);assert(session.position.accepted.result===app.canonicalResult);assert(session.position.accepted.receipt===receipt);
  }finally{r[name]=original;}
  assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),true);
  assert.equal(api('isClassicalNahuatlTranscriptionBindingFrame')(binding),true);
  assert.equal(r.isClassicalNahuatlTranscriptionFrame(made.canonicalResult),true);
  assert.equal(execute(binding).authorizationStatus,'authorized');
 }
});


test('genuine fresh kw+k compound owns ordinary, delabialized and ordered dissimilated whole alternatives',()=>{
 const fixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_writing_kwk_fixture.json',import.meta.url),'utf8'));
 const app=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[fixture.request]});
 assert.equal(app.authorizationStatus,'authorized',app.blockReason);
 const source=api('issueClassicalNahuatlWritingSourceFromApplication')(app,fixture.morphParts),ordinary=bind(source);
 assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),true);
 const choices=options(ordinary),shift=choices.find(p=>p.ruleId==='cn-l2-213-kw-exposed-k'),chain=choices.find(p=>p.ruleId==='cn-l2-211-regressive-dissimilation-kk-hk');
 assert(shift,'actual exposed kw boundary offers delabialization');assert(chain,'dissimilation is offered after actual delabialization');
 assert.deepEqual([...chain.dependencies],['cn-l2-213-kw-exposed-k']);
 const results=[ordinary,bind(source,shift.value),bind(source,chain.value)].map(execute);
 for(const made of results){assert.equal(made.authorizationStatus,'authorized',made.blockReason);const result=made.canonicalResult;
  assert.equal(r.isClassicalNahuatlTranscriptionFrame(result),true);assert(result.sourceFrame===source);assert(result.writingContext.exactInputResult===app.canonicalResult);
  assert(result.surface.startsWith('no'));assert(result.surface.endsWith('uh'));assert(result.formulaProjection.sourceFrame===source);
 }
 const [base,delabialized,dissimilated]=results.map(app=>app.canonicalResult);
 assert(base.surface.includes('ucque'));assert(delabialized.surface.includes('cque'));assert(dissimilated.surface.includes('hque'));
 assert.equal(new Set(results.map(app=>app.canonicalResult.surface)).size,3);
 assert.deepEqual(dissimilated.dependencyResults.map(p=>p.selectedRuleId),['cn-l2-213-kw-exposed-k','cn-l2-211-regressive-dissimilation-kk-hk']);
 assert.equal(dissimilated.dependencyResults[1].leftConsonant,dissimilated.dependencyResults[0].outputSound);
 const raw=r.issueClassicalTranscriptionSourceFrame([{segments:fixture.morphParts.flatMap(p=>p.segments)}]);assert.deepEqual(options(bind(raw)).map(p=>p.value),['ordinary']);
 assert.notEqual(bind(raw,chain.value).authorizationStatus,'authorized');
});


test('genuine required n+p keeps original phonemes but ordinary whole Writing follows its actual mandatory owner baseline',()=>{
 const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_writing_required_np_fixture.json',import.meta.url),'utf8'));
 const parent=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[f.request]});assert.equal(parent.authorizationStatus,'authorized');
 const source=fromApplication(parent,f.morphParts);assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),true,'required n+p formation must admit its genuine original Source');
 const binding=bind(source);assert.deepEqual(options(binding).map(p=>p.value),['ordinary'],'mandatory mp is never an optional spelling');
 const made=execute(binding);assert.equal(made.authorizationStatus,'authorized');const result=made.canonicalResult,baseline=parent.lesson2WritingOutputs.find(row=>row.role==='word').writtenResult;
 assert.equal(result.surface,baseline.surface);assert.equal(result.surface,'notlonīlōyāxāmpāquipoxonēuh');assert(result.baselineWrittenResult===baseline);assert(result.sourceFrame===source);
 assert(source.writingContext.exactApplicationResult===parent);assert(source.writingContext.exactInputResult===parent.canonicalResult);assert.equal(source.writingContext.morphParts.length,8);
 assert.equal(source.writingContext.morphParts.find(part=>part.role==='embed').segments.at(-1),'/n/');assert(source.constituents[0].segments.includes('/n/'));assert(result.formula.includes('/n//p/'));
 assert.equal(result.dependencyResults.length,1);const required=result.dependencyResults[0];assert.equal(r.isClassicalNahuatlTranscriptionAnalysisFrame(required),true);assert.equal(required.selectedRuleId,'cn-l2-211-regressive-n-p-mp');assert.equal(required.optional,false);assert.equal(required.lowFrequency,false);
 const raw=r.issueClassicalTranscriptionSourceFrame([{segments:f.morphParts.flatMap(p=>p.segments)}]),rawMade=execute(bind(raw));assert.equal(rawMade.authorizationStatus,'authorized');assert(rawMade.canonicalResult.surface.includes('np'));assert.notEqual(rawMade.canonicalResult.surface,result.surface);
 assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame({...source,writingContext:{...source.writingContext,requiredBoundary:{...source.writingContext.requiredBoundary}}}),false);
 const altered=f.morphParts.map(part=>({...part,segments:[...part.segments]}));altered.find(part=>part.role==='embed').segments[10]='/m/';assert.notEqual(r.isClassicalNahuatlTranscriptionSourceFrame(fromApplication(parent,altered)),true);
 const graft=f.morphParts.map(part=>({...part}));graft[4].requiredBoundary=source.writingContext.requiredBoundary;assert.notEqual(r.isClassicalNahuatlTranscriptionSourceFrame(fromApplication(parent,graft)),true);
 const owner=r.buildClassicalNahuatlAssimilationFrame;
 try{r.buildClassicalNahuatlAssimilationFrame=()=>({...required});assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),false);assert.equal(api('isClassicalNahuatlTranscriptionBindingFrame')(binding),false);assert.equal(r.isClassicalNahuatlTranscriptionFrame(result),false);assert.notEqual(r.isClassicalNahuatlTranscriptionSourceFrame(fromApplication(parent,f.morphParts)),true);let refused=false;try{refused=execute(binding).authorizationStatus!=='authorized';}catch{refused=true;}assert(refused);}finally{r.buildClassicalNahuatlAssimilationFrame=owner;}
 const validator=r.isClassicalNahuatlTranscriptionAnalysisFrame;
 try{r.isClassicalNahuatlTranscriptionAnalysisFrame=()=>false;assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),false);assert.equal(r.isClassicalNahuatlTranscriptionFrame(result),false);assert.equal(api('isClassicalNahuatlTranscriptionBindingFrame')(binding),false);}finally{r.isClassicalNahuatlTranscriptionAnalysisFrame=validator;}
 assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),true);assert.equal(r.isClassicalNahuatlTranscriptionFrame(result),true);assert.equal(execute(binding).canonicalResult.surface,baseline.surface);
 const excluded=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[{...f.request,subject:'3pl',reduplication:'affinity'}]});assert.equal(excluded.authorizationStatus,'authorized',excluded.blockReason);const held=fromApplication(excluded,f.morphParts);assert.equal(held.blockReason,'writing-simple-compound-context-not-supported');
});
