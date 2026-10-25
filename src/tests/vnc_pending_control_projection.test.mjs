import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const runtime=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
function fixture(){
 const initial=runtime.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const source=initial.resultFrame.sourceMachineryFrame,nav=runtime.getClassicalGrammarApplicationCapabilityNavigator(source);
 const bind=choices=>runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active',...choices});
 const symbol=Symbol('exact');let projections=0;
 const ctx=vm.createContext({targetObject:runtime,ClassicalCapabilityExactVncApplicationFrame:symbol,ActiveClassicalGrammarCapabilityNavigator:nav,
 buildClassicalRuleLogicSurfaceFrame:overrides=>{projections++;return {...overrides,state:{...overrides}};}});
 const name='getClassicalTypedVncControlProjection',a=code.indexOf(`    function ${name}(`),b=code.indexOf('\n    function ',a+1);
 assert.ok(a>=0,'pending VNC projection adapter is present');vm.runInContext(code.slice(a,b),ctx);
 return {ctx,initial,source,nav,bind,symbol,project:b=>ctx.getClassicalTypedVncControlProjection(b),get projections(){return projections;}};
}
test('pending causal control projection uses the issued preview and retains distinct source and result participants',()=>{
 const h=fixture();const binding=h.bind({requestedDerivation:'causative',derivationOptionId:'causative:type-one:final-a-replacement:chōca'});
 assert.equal(binding.bindingStatus,'ready');const p=h.project(binding);
 assert.ok(p);assert.equal(p.derivationType,'causative');assert.equal(p.sourceSubject,'1sg');assert.equal(p.subject,'3sg');assert.equal(p.causativeResultSubject,'3sg');assert.equal(p.subjectPerson,'3');
 assert.equal(runtime.isClassicalNahuatlVncApplicationFrame(p[h.symbol]),true);
 assert.equal(p[h.symbol].controlFrame.derivationType,'causative');assert.equal(h.initial.normalizedRequest.requestedDerivation,'direct');
});
test('pending VNC projection rejects copied and foreign bindings and does not invent an incomplete preview',()=>{
 const h=fixture(),b=h.bind({requestedDerivation:'causative'});
 assert.equal(h.project({...b}),null);const draft=h.project(b);assert.ok(draft);assert.equal(draft.state.derivationType,'causative');assert.equal(draft.state.vncApplicationFrame,null);assert.equal(draft[h.symbol],undefined);
 h.ctx.ActiveClassicalGrammarCapabilityNavigator={...h.nav};assert.equal(h.project(h.bind({requestedDerivation:'direct'})),null);
 assert.equal(h.projections,1);
});

test('incomplete applicative choices replace stale causative presentation without manufacturing a preview',()=>{
 const h=fixture(),b=h.bind({requestedDerivation:'applicative'}),p=h.project(b);
 assert.ok(p);assert.equal(p.state.derivationType,'applicative');assert.equal(p.state.vncApplicationFrame,null);
 assert.equal(p.state.derivationOptionInventory,b.ownerBindingFrame.ownerDerivationOptionInventory);
 assert.equal(runtime.previewClassicalGrammarTypedSourceOperationBindingFrame(b),null);
});

test('pending Source editor cannot borrow the old VNC control projection',()=>{
 const h=fixture(),b=h.bind({requestedDerivation:'direct'});
 h.ctx.targetObject={...runtime,document:{getElementById:id=>id==='classical-source-parts'?{dataset:{classicalSourceCommitState:'pending'}}:null}};
 assert.equal(h.project(b),null);assert.equal(h.projections,0);
});
