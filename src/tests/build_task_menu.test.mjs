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
  assert.ok(routes.some(r => r.optionRef === ref(stemId, 'calendar-date-nnc')));
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
  assert.match(routes.find(r=>r.optionRef===ref(navId,'nnc:adverbial')).label,/current Result/u);
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
