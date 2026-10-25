import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {runClassicalSourceApplyAction} from '../ui/events/events.mjs';
test('Source Apply tolerates presentation reordering but cancels changed selections',()=>{
 for(const changed of [false,true]){
  const root=new Element();root.id='classical-workbench';
  const button=new Element('button');button.id='verb-entry-apply';button.removeAttribute=k=>delete button.attributes[k];root.append(button);
  let controls=[{id:'possessor',value:'1sg',checked:false},{id:'source',value:'huān',checked:false}],frame,timer,count=0;
  const doc={getElementById:id=>id===root.id?root:root.querySelector('#'+id),createElement:tag=>new Element(tag),querySelectorAll:()=>controls,defaultView:{requestAnimationFrame:fn=>{frame=fn},setTimeout:fn=>{timer=fn}}};
  assert.equal(runClassicalSourceApplyAction({document:doc},()=>count++),true);
  controls.reverse();if(changed)controls.find(c=>c.id==='possessor').value='2sg';
  frame();timer();assert.equal(count,changed?0:1);
 }
});
