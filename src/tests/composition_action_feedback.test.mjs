import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
const load=()=>import('../ui/composition/action_feedback.mjs');
function scene(){
 const frames=[],timers=[],root=new Element(),button=new Element('button');root.id='classical-workbench';button.id='test-action';root.append(button);
 for(const node of [root,button]){node.isConnected=true;node.removeAttribute=k=>{delete node.attributes[k];};}
 const doc={getElementById:id=>id===root.id?root:root.querySelector(`#${id}`),createElement:tag=>new Element(tag),
  defaultView:{requestAnimationFrame:fn=>frames.push(fn),setTimeout:fn=>timers.push(fn)}};
 return {root,button,doc,frames,timers,paint(){assert.equal(timers.length,0);frames.shift()();assert.equal(timers.length,1);},finish(){timers.shift()();}};
}
test('busy is visible before paint and canonical action; accepted state changes only in that action',async()=>{
 const {runCompositionAction}=await load(),s=scene();let accepted='old',calls=0;
 assert.equal(runCompositionAction(s.doc,s.button,()=>{calls++;accepted='made';},{label:'Making Result…'}),true);
 assert.equal(s.button.getAttribute('aria-busy'),'true');assert.equal(s.button.dataset.compositionWorking,'true');
 assert.equal(accepted,'old');assert.equal(calls,0);s.paint();assert.equal(calls,0);s.finish();
 assert.equal(accepted,'made');assert.equal(calls,1);assert.equal(s.button.hasAttribute('aria-busy'),false);assert.equal(s.root.dataset.compositionWorking,undefined);
});
test('double click or another pending action does not dispatch twice; disabled/fixed controls stay disabled',async()=>{
 const {runCompositionAction}=await load(),s=scene();let calls=0;const action=()=>calls++;
 runCompositionAction(s.doc,s.button,action);assert.equal(runCompositionAction(s.doc,s.button,action),false);
 const other=new Element('button');other.isConnected=true;s.root.append(other);assert.equal(runCompositionAction(s.doc,other,action),false);
 s.paint();s.finish();assert.equal(calls,1);
 s.button.disabled=true;assert.equal(runCompositionAction(s.doc,s.button,action),false);assert.equal(s.frames.length,0);assert.equal(s.button.disabled,true);
});
test('a queued Make for an obsolete position, disabled control or detached control is cancelled',async()=>{
 const {runCompositionAction}=await load();
 for(const invalidate of [s=>s.current={},s=>s.button.disabled=true,s=>s.button.isConnected=false]){
  const s=scene();s.current={};const before=s.current;let calls=0;
  runCompositionAction(s.doc,s.button,()=>calls++,{isCurrent:()=>s.current===before});invalidate(s);s.paint();s.finish();
  assert.equal(calls,0);assert.equal(s.root.dataset.compositionWorking,undefined);assert.equal(s.button.hasAttribute('aria-busy'),false);
 }
});
test('busy clears on refusal or throw without claiming success or changing owner availability',async()=>{
 const {runCompositionAction}=await load();
 for(const throws of [false,true]){
  const s=scene();s.button.setAttribute('aria-busy','false');
  runCompositionAction(s.doc,s.button,()=>{s.button.disabled=true;if(throws)throw Error('owner refused');return false;});s.paint();
  if(throws)assert.throws(()=>s.finish(),/owner refused/);else s.finish();
  assert.equal(s.button.getAttribute('aria-busy'),'false');assert.equal(s.button.disabled,true);assert.equal(s.root.dataset.compositionWorking,undefined);
 }
});
test('actual native derivation button waits for paint and stages exactly once without a fallback render',async()=>{
 const {runCompositionAction}=await load(),s=scene();
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
 const source=readFileSync(new URL('../ui/state.mjs',import.meta.url),'utf8');
 const start=source.indexOf('    function initDerivationTypeControl()'),end=source.indexOf('\n    function ',start+1);
 s.button.setAttribute('data-derivation-type','causative');
 const select=new Element('select');select.id='derivation-type';s.root.append(select);
 s.doc.querySelectorAll=selector=>selector==='[data-derivation-type]'?[s.button]:[];
 let changes=0,stages=0,renders=0;const position={};
 const ctx=vm.createContext({runCompositionAction,targetObject:{document:s.doc,
  getClassicalConstructionPosition:()=>position,handleClassicalCapabilityStagedGrammarControlChange:()=>{stages++;return true;},
  renderTenseTabs:()=>renders++},setActiveDerivationType:()=>changes++,updateDerivationTypeControl(){},
  preserveViewportAnchorPosition:(node,fn)=>fn()});
 vm.runInContext(source.slice(start,end),ctx);ctx.initDerivationTypeControl();
 s.button.listeners.click[0]({});s.button.listeners.click[0]({});
 assert.equal(changes,0);assert.equal(stages,0);s.paint();s.finish();
 assert.equal(changes,1);assert.equal(stages,1);assert.equal(renders,0);assert.equal(select.value,'causative');
});
test('the actual native Make listener queues one explicit execution and cancels a changed position',async()=>{
 const {runCompositionAction}=await load(),{readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
 const source=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const start=source.indexOf('    function bindClassicalResultMakeButton('),end=source.indexOf('\n    function ',start+1);
 for(const stale of [false,true]){
  const s=scene();let current={},accepted=null,calls=0,arrivals=0;
  const session={get position(){return current;}};
  const ctx=vm.createContext({runCompositionAction,targetObject:{document:s.doc},ClassicalConstructionSession:session,
   getClassicalVisibleAcceptedResult:()=>accepted&&{canonicalResult:accepted},
   applyClassicalConstructionPosition:()=>{calls++;accepted={};current={};return true;},notifyExplicitMakeResult:()=>arrivals++});
  vm.runInContext(source.slice(start,end),ctx);ctx.bindClassicalResultMakeButton(s.button);
  s.button.listeners.click[0]();s.button.listeners.click[0]();assert.equal(calls,0);assert.equal(accepted,null);
  if(stale)current={};s.paint();s.finish();assert.equal(calls,stale?0:1);assert.equal(arrivals,stale?0:1);
 }
});

test('native segmented choice reflects the staged value even when its owner returns before a full render',async()=>{
 const {runCompositionAction}=await load(),{readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
 const source=readFileSync(new URL('../ui/composer/composer.mjs',import.meta.url),'utf8');
 const start=source.indexOf('      targetObject.document.querySelectorAll("[data-classical-segment-control]").forEach(option => {'),end=source.indexOf('\n      renderInitialClassicalPanelContractSurface();',start);assert(start>=0&&end>start);
 const s=scene(),positive=new Element('button'),negative=s.button,control=new Element('input');control.id='classical-rule-logic-polarity';control.value='positive';s.root.append(control,positive);
 positive.dataset.classicalSegmentControl=control.id;positive.dataset.classicalSegmentValue='positive';positive.classList.add('is-active');positive.setAttribute('aria-pressed','true');negative.dataset.classicalSegmentControl=control.id;negative.dataset.classicalSegmentValue='negative';negative.setAttribute('aria-pressed','false');
 for(const button of [positive,negative])button.classList.toggle=(name,on)=>{button.className=button.className.split(/\s+/u).filter(value=>value&&value!==name).concat(on?[name]:[]).join(' ');};
 let staged='',accepted='old',calls=0;control.dispatchEvent=()=>{staged=control.value;calls++;};s.doc.querySelectorAll=()=>[positive,negative];
 const position={},ctx=vm.createContext({runCompositionAction,CLASSICAL_CAUSATIVE_PARTICIPANT_CONTROL_REQUEST_KEYS:{},targetObject:{document:s.doc,getClassicalConstructionPosition:()=>position,Event:class{}}});
 vm.runInContext(source.slice(start,end),ctx);negative.listeners.click[0]();s.paint();s.finish();
 assert.equal(staged,'negative');assert.equal(calls,1);assert.equal(negative.getAttribute('aria-pressed'),'true');assert.equal(positive.getAttribute('aria-pressed'),'false');assert.equal(accepted,'old','highlighting a staged choice does not accept Result');
});
