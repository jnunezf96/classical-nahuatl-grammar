import test from 'node:test';
import assert from 'node:assert/strict';
const tasks = await import('../ui/composition/build_task_menu.mjs').catch(() => null);
const navId = 'classical-capability-navigator-operation';
const stemId = 'classical-construction-operation';
const ref = (id, value) => `option:id%3A${id}:${encodeURIComponent(value)}`;
function fixture() {
  const events = [];
  const option = (value, label, data = {}) => ({value, textContent: label, dataset: data});
  const nav = {id: navId, value: 'vnc:application', options: [
    option('vnc:application', 'Make a verb clause'),
    option('nnc:adverbial', 'Form an adverbial clause'),
    option('clause:adverbial-adjunction', 'Attach a modifier'),
    option('future:owner-operation', 'Future owner action'),
  ]};
  const stem = {id: stemId, value: 'none', dataset: {classicalSourceUnit: 'vnc'}, options: [
    option('none', 'Standard formation', {classicalApplicationOperation: 'direct'}),
    option('deverbal-nnc', 'Old caption', {classicalApplicationOperation: 'nnc:deverbal-construction'}),
    option('adverbial-nuclear', 'Adverbial use', {classicalApplicationOperation: 'nnc:adverbial'}),
    option('cardinal-numeral-nnc', 'Cardinal number', {classicalApplicationOperation: 'grammar:nominal-construction'}),
    option('calendar-date-nnc', 'Calendar', {classicalApplicationOperation: 'grammar:nominal-construction'}),
  ]};
  for (const control of [nav, stem]) control.dispatchEvent = () => {
    events.push([control.id, control.value]);
    if (control === stem && control.value !== 'none') nav.value = '';
  };
  const doc = {getElementById: id => id === navId ? nav : id === stemId ? stem : null,
    defaultView: {Event: class {constructor(type, init) {this.type=type; Object.assign(this, init);}}}};
  return {doc, nav, stem, events};
}
test('one task catalog retains distinct input lanes and shared owners by exact inventory address', () => {
  assert.ok(tasks, 'install the unified task menu');
  const {doc, events} = fixture();
  const routes = tasks.getBuildTaskRoutes(doc);
  assert.equal(new Set(routes.map(r => r.optionRef)).size, routes.length);
  assert.ok(routes.some(r => r.optionRef === ref(navId, 'nnc:adverbial')));
  assert.ok(routes.some(r => r.optionRef === ref(stemId, 'adverbial-nuclear')));
  assert.ok(routes.some(r => r.optionRef === ref(navId, 'clause:adverbial-adjunction')));
  assert.ok(routes.some(r => r.optionRef === ref(stemId, 'cardinal-numeral-nnc')));
  assert.equal(routes.some(r => r.optionRef === ref(stemId, 'calendar-date-nnc')),false,'calendar requires an exact Result binding');
  assert.ok(routes.some(r => r.optionRef === ref(navId, 'future:owner-operation')));
  assert.ok(routes.find(r => r.optionRef === ref(navId, 'vnc:application')).aliasRefs.includes(ref(stemId, 'none')));
  assert.deepEqual(events, [], 'catalog inspection must not stage or execute');
});
test('native-only tasks remain reachable without a navigator projection and dispatch exactly once', () => {
  assert.ok(tasks);
  const {doc, nav, stem, events} = fixture();
  nav.options = []; nav.disabled = true; nav.value = '';
  assert.ok(tasks.getBuildTaskRoutes(doc).some(r => r.optionRef === ref(stemId, 'deverbal-nnc')));
  assert.equal(tasks.activateBuildTask(doc, ref(stemId, 'deverbal-nnc')), true);
  assert.equal(stem.value, 'deverbal-nnc');
  assert.deepEqual(events, [[stemId, 'deverbal-nnc']]);
  assert.equal(tasks.activateBuildTask(doc, ref(stemId, 'deverbal-nnc')), false);
  assert.equal(events.length, 1, 'reselecting the current task is a no-op');
});
test('the native neutral fallback enters direct formation when the reset restores its owner projection',()=>{
  const {doc,nav,stem,events}=fixture();
  nav.options=[];nav.disabled=true;nav.value='';stem.value='deverbal-nnc';
  const original=stem.dispatchEvent;
  stem.dispatchEvent=event=>{original(event);if(stem.value==='none'){
    nav.disabled=false;nav.options=[{value:'vnc:application',textContent:'Make a verb clause',dataset:{}}];
  }};
  assert.equal(tasks.activateBuildTask(doc,ref(stemId,'none')),true);
  assert.equal(nav.value,'vnc:application','one explicit direct task must not stop at an empty route');
  assert.deepEqual(events,[[stemId,'none'],[navId,'vnc:application']]);
});
test('task routing rechecks live native availability and rejects forged or stale addresses', () => {
  assert.ok(tasks);
  const {doc, stem, events} = fixture();
  tasks.getBuildTaskRoutes(doc);
  stem.options[1].disabled = true;
  assert.equal(tasks.activateBuildTask(doc, ref(stemId, 'deverbal-nnc')), false);
  stem.options[2].parentElement = {hidden: true};
  assert.equal(tasks.activateBuildTask(doc, ref(stemId, 'adverbial-nuclear')), false);
  assert.equal(tasks.activateBuildTask(doc, ref(stemId, 'forged')), false);
  assert.deepEqual(events, []);
});
test('returning to direct formation resets the native layer before staging its original operation', () => {
  assert.ok(tasks);
  const {doc, nav, stem, events} = fixture();
  stem.value = 'deverbal-nnc'; nav.value = '';
  assert.equal(tasks.activateBuildTask(doc, ref(navId, 'vnc:application')), true);
  assert.equal(stem.value, 'none'); assert.equal(nav.value, 'vnc:application');
  assert.deepEqual(events, [[stemId, 'none'], [navId, 'vnc:application']]);
});
test('an exact binding mirror value does not prevent switching to the native construction lane', () => {
  const {doc, nav, stem, events} = fixture();
  nav.options.push({value:'nnc:deverbal-construction',textContent:'Make a noun from a verb',dataset:{}});
  nav.value='nnc:deverbal-construction';
  stem.value='deverbal-nnc'; // Existing exact binding stages this native mirror.
  assert.equal(tasks.activateBuildTask(doc,ref(stemId,'deverbal-nnc')),true);
  assert.deepEqual(events,[[stemId,'deverbal-nnc']]);
  assert.equal(nav.value,'');
});
test('overlapping lane labels distinguish the actual Result input without misclassifying native special routes', () => {
  const {doc} = fixture();
  const get=doc.getElementById;
  doc.getElementById=id=>id==='classical-capability-navigator'
    ? {dataset:{classicalCapabilitySourceRole:'exact-owner-issued-result'}} : id==='classical-source-whole'?{value:'ce-liā'}:get(id);
  const routes=tasks.getBuildTaskRoutes(doc);
  assert.match(routes.find(r=>r.optionRef===ref(navId,'nnc:adverbial')).label,/Applied Source/u);
  assert.doesNotMatch(routes.find(r=>r.optionRef===ref(stemId,'adverbial-nuclear')).label,/Source stem/u);
  assert.match(routes.find(r=>r.optionRef===ref(stemId,'deverbal-nnc')).label,/Source editor: ce-liā/u,
    'an alternate material route must name its editor material before selection');
});
test('an unbound nominal family does not duplicate its concrete tasks, while a real owner binding remains reachable', () => {
  const {doc,nav}=fixture();
  nav.options.push({value:'grammar:nominal-construction',textContent:'Generic nominal family',dataset:{}});
  const projection={operations:[{operationId:'grammar:nominal-construction',ownerBindingFrameValidated:false,
    ownerPreflightFrameValidated:false,ownerInputAcceptanceProven:false}]};
  const get=doc.getElementById;
  doc.getElementById=id=>id==='classical-capability-navigator-frame'?{textContent:JSON.stringify(projection)}:get(id);
  assert.equal(tasks.getBuildTaskRoutes(doc).some(r=>r.optionRef===ref(navId,'grammar:nominal-construction')),false);
  assert.ok(tasks.getBuildTaskRoutes(doc).some(r=>r.optionRef===ref(stemId,'cardinal-numeral-nnc')));
  projection.operations[0].ownerBindingFrameValidated=true;
  assert.ok(tasks.getBuildTaskRoutes(doc).some(r=>r.optionRef===ref(navId,'grammar:nominal-construction')));
});

test('Writing task menu projects only live exact Writing Source owner options and leaves native menus intact on exit',async()=>{
 const {createRuntimeInstance}=await import('../runtime/create_runtime.mjs');
 const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
 const source=r.issueClassicalNahuatlWritingSourceFromParticleGroup([r.buildClassicalNahuatlParticleSourceFrame('l3-za'),r.buildClassicalNahuatlParticleSourceFrame('l3-oc')]);
 assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),true);
 const navOwner=r.getClassicalGrammarApplicationCapabilityNavigator(source);let binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(navOwner,'orthography:transcription',{writingVariant:'ordinary'});
 assert.equal(r.isClassicalGrammarTypedSourceOperationBindingFrame(binding),true);
 const {doc,nav,stem,events}=fixture(),get=doc.getElementById,workbench={dataset:{classicalWritingSourceMode:'true'}};
 nav.options.push({value:'orthography:transcription',textContent:'Choose writing',dataset:{}});nav.options.push({value:'particle:result',textContent:'Make a particle',dataset:{}});nav.value='orthography:transcription';
 doc.getElementById=id=>id==='classical-workbench'?workbench:get(id);Object.setPrototypeOf(doc.defaultView,r);doc.defaultView.getActiveClassicalGrammarTypedSourceOperationBinding=()=>binding;
 const writingRoutes=tasks.getBuildTaskRoutes(doc);assert.deepEqual(writingRoutes.map(route=>route.operationId),['orthography:transcription']);assert(writingRoutes.every(route=>route.control===nav));assert.deepEqual(events,[]);
 const genuine=binding;binding={...binding};assert.deepEqual(tasks.getBuildTaskRoutes(doc),[],'copied binding cannot advertise an exact current Source');binding=genuine;
 const validator=r.isClassicalNahuatlTranscriptionSourceFrame;try{r.isClassicalNahuatlTranscriptionSourceFrame=()=>false;assert.deepEqual(tasks.getBuildTaskRoutes(doc),[]);}finally{r.isClassicalNahuatlTranscriptionSourceFrame=validator;}
 nav.options.find(o=>o.value==='orthography:transcription').disabled=true;assert.deepEqual(tasks.getBuildTaskRoutes(doc),[],'native withdrawal remains authoritative');
 workbench.dataset.classicalWritingSourceMode='false';assert(tasks.getBuildTaskRoutes(doc).some(route=>route.control===stem&&route.option.value==='deverbal-nnc'));
});
test('an exact Result without an offered direct clause owner cannot select a phantom basal clause task',()=>{
 const {doc,nav,stem}=fixture();nav.value='';nav.options=[{value:'particle:result',textContent:'Make a particle',dataset:{}}];stem.dataset.classicalSourceUnit='nnc';
 const get=doc.getElementById;doc.getElementById=id=>id==='classical-capability-navigator'?{dataset:{classicalCapabilitySourceRole:'exact-owner-issued-result'}}:get(id);
 assert.equal(tasks.getBuildTaskRoutes(doc).some(route=>route.operationId==='nnc:ordinary'),false);
 assert.equal(tasks.getBuildTaskRoutes(doc).some(route=>route.operationId==='particle:result'),true);
});

test('two-nucleus Source exposes its actual ownerhood task caption without changing ordinary nominalization',()=>{
  const {doc}=fixture(),get=doc.getElementById,family={value:'double-nucleus-ownerhood'};
  doc.getElementById=id=>id==='classical-deverbal-nnc-family'?family:get(id);
  assert.equal(tasks.getBuildTaskRoutes(doc).find(route=>route.optionRef===ref(stemId,'deverbal-nnc')).label,'Form two-nucleus ownerhood');
  family.value='predicate-nominalization';
  assert.equal(tasks.getBuildTaskRoutes(doc).find(route=>route.optionRef===ref(stemId,'deverbal-nnc')).label,'Make a noun from a verb');
});

test('calendar keeps its exact Result route and native collector without a raw or duplicate task',()=>{
 const {doc,nav,stem,events}=fixture(),get=doc.getElementById;
 const calendar=stem.options.find(o=>o.value==='calendar-date-nnc');
 assert.equal(tasks.getBuildTaskRoutes(doc).some(r=>r.optionRef===ref(stemId,'calendar-date-nnc')),false);
 nav.options.push({value:'grammar:nominal-construction',textContent:'Nominal construction',dataset:{}});
 const root={dataset:{classicalCapabilitySourceRole:'exact-owner-issued-result',classicalCapabilityBindingFamily:'formation-result'}};
 const frame={textContent:JSON.stringify({operations:[{operationId:'grammar:nominal-construction',ownerBindingFrameValidated:true,sourceIdentityMatched:true}]})};
 doc.getElementById=id=>id==='classical-capability-navigator'?root:id==='classical-capability-navigator-frame'?frame:get(id);
 stem.value='calendar-date-nnc';nav.value='grammar:nominal-construction';
 const routes=tasks.getBuildTaskRoutes(doc);
 assert.ok(routes.some(r=>r.optionRef===ref(navId,'grammar:nominal-construction')));
 assert.equal(routes.some(r=>r.optionRef===ref(stemId,'calendar-date-nnc')),false);
 assert.equal(stem.options.find(o=>o.value==='calendar-date-nnc'),calendar);
 assert.equal(stem.value,'calendar-date-nnc');assert.deepEqual(events,[]);
});

test('noun-source formation caption covers its actual family without changing its native address or dispatch',()=>{
 const {doc,stem,events}=fixture();const find=()=>tasks.getBuildTaskRoutes(doc).find(r=>r.optionRef===ref(stemId,'deverbal-nnc'));
 const original=find();assert.equal(original.label,'Make a noun from a verb');
 stem.dataset.classicalSourceUnit='nnc';const noun=find();assert.equal(noun.label,'Form a noun construction');assert.equal(noun.option,original.option);assert.equal(noun.optionRef,original.optionRef);
 const get=doc.getElementById;doc.getElementById=id=>id==='classical-deverbal-nnc-family'?{value:'double-nucleus-ownerhood'}:get(id);
 assert.equal(find().label,'Form two-nucleus ownerhood');assert.deepEqual(events,[]);
});

test('fixed typed Sources expose owner operations without silently reinterpreting their citation as a nounstem',()=>{
 for(const [sourceKind,operationId] of [
  ['attested-nnc-cell-source','nnc:attested-cell'],
  ['attested-place-source','nnc:attested-place'],
  ['attested-principal-collocation-source','clause:attested-collocation'],
  ['quantitative-predicate-source','nnc:quantitative-predicate'],
 ]){
  const {doc,nav,stem,events}=fixture();stem.dataset.classicalSourceUnit='nnc';nav.value=operationId;
  nav.options=[{value:operationId,textContent:'Use fixed Source',dataset:{}},{value:'particle:result',textContent:'Make a particle',dataset:{}}];
  const projection={inputRole:'exact-owner-issued-source',sourceUnitKinds:[sourceKind]};
  const get=doc.getElementById;doc.getElementById=id=>id==='classical-capability-navigator-frame'?{textContent:JSON.stringify(projection)}:get(id);
  assert.deepEqual(tasks.getBuildTaskRoutes(doc).map(r=>r.operationId).sort(),[operationId,'particle:result'].sort(),sourceKind);
  assert.equal(tasks.activateBuildTask(doc,ref(stemId,'none')),false,'no phantom ordinary task');
  assert.equal(tasks.activateBuildTask(doc,ref(stemId,'deverbal-nnc')),false,'stale raw entry cannot reinterpret a fixed Source');
  assert.deepEqual(events,[]);
  for (const kind of ['ordinary-nnc-source','pronominal-nnc-source']) {
   projection.sourceUnitKinds=[kind];
   assert.ok(tasks.getBuildTaskRoutes(doc).some(r=>r.control===stem),'explicit ordinary/pronominal Source restores native routes');
  }
  projection.sourceUnitKinds=[sourceKind];projection.inputRole='exact-owner-issued-result';
  assert.ok(tasks.getBuildTaskRoutes(doc).some(r=>r.control===stem),'Result continuation retains its distinct input lanes');
 }
});

test('quality changes retain their exact Result owner route and reject the raw duplicate',()=>{
 const {doc,nav,stem,events}=fixture();stem.dataset.classicalSourceUnit='nnc';
 stem.options.push({value:'adjectival-nnc',textContent:'Change quality',dataset:{classicalApplicationOperation:'grammar:nominal-construction'}});
 nav.options.push({value:'grammar:nominal-construction',textContent:'Nominal construction',dataset:{}});
 const get=doc.getElementById;
 doc.getElementById=id=>id==='classical-capability-navigator-frame'?{textContent:JSON.stringify({operations:[{operationId:'grammar:nominal-construction',ownerBindingFrameValidated:true}]})}:get(id);
 const routes=tasks.getBuildTaskRoutes(doc);
 assert.ok(routes.some(r=>r.optionRef===ref(navId,'grammar:nominal-construction')));
 assert.equal(routes.some(r=>r.optionRef===ref(stemId,'adjectival-nnc')),false);
 assert.equal(tasks.activateBuildTask(doc,ref(stemId,'adjectival-nnc')),false);
 assert.deepEqual(events,[]);
 assert.ok(routes.some(r=>r.optionRef===ref(stemId,'deverbal-nnc')));
});

test('first explicit neutral task remains selected for recovery when the raw finite owner is unavailable',async()=>{
  const {Element}=await import('./helpers/organization_dom.mjs');
  const {doc,nav,stem,events}=fixture();nav.options=[];nav.disabled=true;nav.value='';stem.value='none';
  const field=new Element('label'),get=doc.getElementById;
  doc.getElementById=id=>id==='classical-capability-navigator-field'?field:get(id);
  doc.createElement=tag=>new Element(tag);doc.querySelectorAll=()=>[];
  const refresh=tasks.createBuildTaskMenu(doc);refresh();const menu=field.querySelector('#classical-build-task');
  assert.equal(menu.value,'');const direct=ref(stemId,'none');
  menu.value=direct;for(const listener of menu.listeners.change)listener({stopPropagation(){}});
  assert.equal(menu.value,direct,'an explicitly chosen direct task must remain visible so its participant controls can be edited');
  assert.equal(menu.dataset.buildTaskOperation,'vnc:application');
  assert.deepEqual(events,[[stemId,'none']]);assert.equal(nav.disabled,true,'presentation does not admit the invalid raw finite');
  for(const listener of menu.listeners.change)listener({stopPropagation(){}});
  assert.equal(events.length,1,'the already-active same-value route remains a no-op');
  nav.options=[{value:'vnc:application',textContent:'Make a verb clause',dataset:{}}];nav.disabled=false;
  refresh();
  assert.equal(menu.value,ref(navId,'vnc:application'),'correcting the Source retains the explicitly selected direct task through its canonical alias');
  assert.equal(nav.value,'vnc:application');
  assert.deepEqual(events,[[stemId,'none'],[navId,'vnc:application']],'only the newly available owner is staged; no Make is dispatched');
  refresh();for(const listener of menu.listeners.change)listener({stopPropagation(){}});
  assert.equal(events.length,2,'the migrated active route remains a same-value no-op');
});
