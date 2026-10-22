import test from 'node:test';
import assert from 'node:assert/strict';
const module=()=>import('../ui/composition/make_preview.mjs');
const tick=()=>new Promise(resolve=>setImmediate(resolve));
const draft=revision=>({revision,ready:true,applied:false,construction:{sourcePending:false}});
test('spinner is published before preparation; late A cannot overwrite B',async()=>{
 const {createMakePreviewController}=await module();let current=draft(1);const tasks=[],states=[],resolvers=[];
 const c=createMakePreviewController({read:()=>current,prepare:()=>new Promise(resolve=>resolvers.push(resolve)),render:s=>states.push(s),schedule:task=>{tasks.push(task);return()=>{};}});
 c.refresh();assert.equal(states.at(-1).state,'loading');assert.equal(resolvers.length,0);
 tasks.shift()();await tick();current=draft(2);c.refresh();tasks.shift()();await tick();
 resolvers[0]({surface:'old',isCurrent:()=>false});await tick();assert.notEqual(states.at(-1).surface,'old');
 resolvers[1]({surface:'new',isCurrent:()=>true});await tick();assert.equal(states.at(-1).state,'ready');assert.equal(states.at(-1).surface,'new');
});
test('pending Source and Applied stop the waiting circle and discard the pending form',async()=>{
 const {createMakePreviewController}=await module();let current=draft(1);const tasks=[],states=[];
 const c=createMakePreviewController({read:()=>current,prepare:()=>({surface:'pending',isCurrent:()=>true}),render:s=>states.push(s),schedule:task=>{tasks.push(task);return()=>{};}});
 c.refresh();current={...draft(2),ready:false,construction:{sourcePending:true}};c.refresh();tasks[0]();await tick();assert.equal(states.at(-1).state,'idle');assert.equal(states.at(-1).surface,'');
 current={...draft(3),ready:false,applied:true};c.refresh();assert.equal(states.at(-1).state,'applied');assert.equal(states.at(-1).surface,'');
});
test('errors, unavailable owners and a revoked current preview never spin indefinitely',async()=>{
 const {createMakePreviewController}=await module();let current=draft(1),mode='error';const tasks=[],states=[];
 const c=createMakePreviewController({read:()=>current,prepare:()=>{if(mode==='error')throw Error('owner refused');return mode==='missing'?null:{surface:'revoked',isCurrent:()=>false};},render:s=>states.push(s),schedule:task=>{tasks.push(task);return()=>{};}});
 for(const m of ['error','missing','revoked']){mode=m;current=draft(current.revision+1);c.refresh();tasks.shift()();await tick();assert.equal(states.at(-1).state,'unavailable');assert.equal(states.at(-1).surface,'');}
});
