import test from 'node:test';
import assert from 'node:assert/strict';
import {createOwnerOperationProtocol,areOwnerOperationSnapshotsEquivalent} from '../ui/composition/owner_operation_protocol.mjs';
import {createConstructionPosition} from '../ui/composition/construction_position.mjs';
import {readFileSync} from 'node:fs';
function fixture(shape='ticket'){
 const source={},other={};const owner={epoch:0,inputs:new Map([['actor',source]])};
 const frame=o=>shape==='ticket'?{ticket:o.epoch}:{permit:`p${o.epoch}`};
 const current=(o,f)=>shape==='ticket'?f?.ticket===o.epoch:f?.permit===`p${o.epoch}`;
 const api=createOwnerOperationProtocol({kind:`test-${shape}`,select:s=>s.route?.startsWith(shape),routeId:s=>s.route,
  projectIntent:s=>Object.freeze({...s,...(s.meta?{meta:Object.freeze({...s.meta})}:{})}),
  buildContract:(o,s)=>({permit:frame(o),selection:s}),isCurrentFrame:(o,c,s,expected=c.permit)=>current(o,expected),
  projectCaptures:o=>[...o.inputs].map(([role,exact])=>({role,exact})),
  transition:(o,s,intent,expected)=>{if(!current(o,expected))return {authorizationStatus:'blocked'};o.epoch++;return {authorizationStatus:'authorized',selections:{...s,value:intent.value},contract:{permit:frame(o)}};},
  equivalent:(a,b)=>a.controller===b.controller&&a.source===b.source&&JSON.stringify(a.selections)===JSON.stringify(b.selections)&&JSON.stringify(a.contract.permit)===JSON.stringify(b.contract.permit),
  staleReason:'fixture-stale'});
 return {api,owner,source,other,select:{route:`${shape}-one`,value:'a'}};
}
test('different owner frame shapes retain exact captures and delegate transitions',()=>{
 for(const shape of ['ticket','permit']){const f=fixture(shape),s=f.api.issue(f.owner,f.select,f.source);assert.ok(s);assert.equal(s.captures[0].exact,f.source);assert.ok(Object.isFrozen(s));const t=f.api.transition(s,{value:'b'},s.contract.permit);assert.equal(t.authorizationStatus,'authorized');assert.equal(t.snapshot.selections.value,'b');assert.equal(f.api.isCurrent(s),false);assert.equal(f.api.isCurrent(t.snapshot),true);assert.equal(f.api.transition(s,{value:'c'},s.contract.permit).blockReason,'fixture-stale');}
});
test('copied cross-adapter and changed canonical captures cannot inherit authority',()=>{
 const a=fixture(),b=fixture('permit'),s=a.api.issue(a.owner,a.select,a.source);assert.equal(a.api.isCurrent({...s}),false);assert.equal(b.api.isCurrent(s),false);assert.equal(areOwnerOperationSnapshotsEquivalent(s,{...s}),false);assert.equal(areOwnerOperationSnapshotsEquivalent(s,b.api.issue(b.owner,b.select,b.source)),false);a.owner.inputs.set('actor',a.other);assert.equal(a.api.isCurrent(s),false);
});
test('missing anchor retention requires authentic same adapter and owner, while ingress stays exact',()=>{
 const f=fixture(),s=f.api.issue(f.owner,f.select,f.source);f.owner.inputs.clear();f.owner.epoch++;
 const next=f.api.issue(f.owner,{...f.select,route:'ticket-two'},f.source,null,s);assert.ok(next);assert.equal(f.api.readSelections(next,f.select,f.source),next.selections);assert.notEqual(f.api.readSelections(next,{...f.select},f.source),next.selections);
 assert.equal(f.api.issue({...f.owner},f.select,f.source,null,s),null);assert.equal(f.api.issue(f.owner,f.select,f.source,null,{...s}),null);
 const other=fixture();assert.equal(other.api.issue(f.owner,f.select,f.source,null,s),null);
});
test('position delegates equivalent issued snapshots without reading frame fields',()=>{
 const f=fixture('permit'),p=createConstructionPosition({isSource:x=>x===f.source});const proposal=s=>({source:f.source,route:{operation:'fixture'},operationContract:s,slots:s.captures,choices:s.selections});
 const a=f.api.issue(f.owner,f.select,f.source);assert.equal(p.stage(proposal(a)),true);const rev=p.position.revision;
 const b=f.api.issue(f.owner,f.select,f.source);assert.equal(areOwnerOperationSnapshotsEquivalent(a,b),true);p.stage(proposal(b));assert.equal(p.position.revision,rev);
 f.owner.epoch++;p.stage(proposal(f.api.issue(f.owner,f.select,f.source)));assert.equal(p.position.revision,rev+1);
});
test('adapter and position import one exact protocol URL',()=>{
 const paths=['comparison_operation_transaction.mjs','construction_position.mjs'];
 const urls=paths.map(path=>{const url=new URL(`../ui/composition/${path}`,import.meta.url),code=readFileSync(url,'utf8');const specifier=code.match(/from ['"]([^'"]*owner_operation_protocol\.mjs[^'"]*)['"]/)[1];return new URL(specifier,url).href;});
 assert.equal(urls[0],urls[1]);
 const ownSpecifier=readFileSync(new URL(import.meta.url),'utf8').match(/from ['"]([^'"]*owner_operation_protocol\.mjs[^'"]*)['"]/)[1];assert.equal(urls[0],new URL(ownSpecifier,import.meta.url).href);
});

test('adapter isolates nested intent without cloning canonical captures',()=>{
 const f=fixture(),input={...f.select,meta:{value:'original'}},s=f.api.issue(f.owner,input,f.source);input.meta.value='changed';assert.equal(s.selections.meta.value,'original');assert.ok(Object.isFrozen(s.selections.meta));assert.equal(s.captures[0].exact,f.source);
});
