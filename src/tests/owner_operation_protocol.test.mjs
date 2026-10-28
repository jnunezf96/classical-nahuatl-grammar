import test from 'node:test';
import assert from 'node:assert/strict';
import {createOwnerOperationProtocol,areOwnerOperationSnapshotsEquivalent} from '../ui/composition/owner_operation_protocol.mjs?issuedBinding=20261028-1';
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
 const paths=['comparison_operation_transaction.mjs','conjunction_operation_transaction.mjs','complement_operation_transaction.mjs','issued_binding_operation_transaction.mjs','nominal_operation_transaction.mjs','construction_position.mjs'];
 const urls=paths.map(path=>{const url=new URL(`../ui/composition/${path}`,import.meta.url),code=readFileSync(url,'utf8');const specifier=code.match(/from ['"]([^'"]*owner_operation_protocol\.mjs[^'"]*)['"]/)[1];return new URL(specifier,url).href;});
 for(const url of urls)assert.equal(url,urls[0]);
 const ownSpecifier=readFileSync(new URL(import.meta.url),'utf8').match(/from ['"]([^'"]*owner_operation_protocol\.mjs[^'"]*)['"]/)[1];assert.equal(urls[0],new URL(ownSpecifier,import.meta.url).href);
});

test('adapter isolates nested intent without cloning canonical captures',()=>{
 const f=fixture(),input={...f.select,meta:{value:'original'}},s=f.api.issue(f.owner,input,f.source);input.meta.value='changed';assert.equal(s.selections.meta.value,'original');assert.ok(Object.isFrozen(s.selections.meta));assert.equal(s.captures[0].exact,f.source);
});

// Synthetic engineering owner: tests protocol custody, not grammatical authority.
function snapshotFixture() {
 const source={},controller={},ingress={};
 const store=createConstructionPosition({isSource:x=>x===source});
 let checks=0,transitions=0;
 const api=createOwnerOperationProtocol({kind:'snapshot-fixture',select:()=>true,
  routeId:()=> 'fixture',projectIntent:s=>Object.freeze({...s}),
  buildContract:()=>Object.freeze({}),isCurrentFrame:()=>true,
  projectCaptures:()=>[{role:'source',exact:source}],
  equivalent:(a,b)=>a.source===b.source&&a.ingress===b.ingress&&a.selections.value===b.selections.value,
  isCurrentSnapshot(snapshot,expected=null) {
   checks++;
   return store.position.operationContract===snapshot && (!expected || (
    expected.snapshot===snapshot && expected.revision===store.position.revision
    && expected.ingress===snapshot.ingress));
  },
  transition:(c,s,intent,expected)=>{
   transitions++;
   assert.equal(expected.snapshot,store.position.operationContract);
   return {authorizationStatus:'authorized',selections:{...s,value:intent.value}};
  },staleReason:'snapshot-stale'});
 const issue=()=>api.issue(controller,{value:'a'},source,null,null,ingress);
 const stage=snapshot=>store.stage({source,route:{operation:'fixture'},operationContract:snapshot,
  choices:snapshot.selections,slots:snapshot.captures});
 const expectation=snapshot=>({snapshot,revision:store.position.revision,ingress});
 return {api,store,issue,stage,expectation,get checks(){return checks;},get transitions(){return transitions;}};
}

test('snapshot currentness never prevents issuance before staging',()=>{
 const f=snapshotFixture(),s=f.issue();
 assert.ok(s);assert.equal(f.checks,0);
 assert.equal(f.api.isCurrent(s),false);
 f.stage(s);assert.equal(f.api.isCurrent(s,f.expectation(s)),true);
 const t=f.api.transition(s,{value:'b'},f.expectation(s));
 assert.equal(t.authorizationStatus,'authorized');assert.ok(t.snapshot);
 assert.equal(t.snapshot.ingress,s.ingress);
 assert.equal(f.api.isCurrent(t.snapshot),false);
 f.stage(t.snapshot);assert.equal(f.api.isCurrent(t.snapshot),true);
 assert.equal(f.api.isCurrent(s),false);
});

test('equivalent replacement invalidates old snapshot even at unchanged position revision',()=>{
 const f=snapshotFixture(),a=f.issue();f.stage(a);
 const expected=f.expectation(a),b=f.issue();
 assert.equal(areOwnerOperationSnapshotsEquivalent(a,b),true);
 f.stage(b);assert.equal(f.store.position.revision,expected.revision);
 assert.equal(f.api.isCurrent(a,expected),false);
 assert.equal(f.api.transition(a,{value:'b'},expected).blockReason,'snapshot-stale');
 assert.equal(f.transitions,0);assert.equal(f.api.isCurrent(b,f.expectation(b)),true);
});

test('wrong event expectation and copied snapshot block before owner transition',()=>{
 const f=snapshotFixture(),s=f.issue();f.stage(s);const expected=f.expectation(s);
 for(const bad of [{...expected,revision:expected.revision-1},
  {...expected,ingress:{}},{...expected,snapshot:{...s}}]) {
  assert.equal(f.api.isCurrent(s,bad),false);
  assert.equal(f.api.transition(s,{value:'b'},bad).blockReason,'snapshot-stale');
 }
 assert.equal(f.api.transition({...s},{value:'b'},expected).blockReason,'snapshot-stale');
 assert.equal(f.transitions,0);
 assert.equal(f.api.transition(s,{value:'b'},expected).authorizationStatus,'authorized');
 assert.equal(f.transitions,1);
});

test('absent snapshot hook preserves owner frame expectation semantics',()=>{
 const f=fixture('permit'),s=f.api.issue(f.owner,f.select,f.source);
 assert.equal(f.api.isCurrent(s,{unrelated:'not an owner frame'}),true);
 assert.equal(f.api.transition(s,{value:'b'},{permit:'wrong'}).blockReason,'fixture-stale');
 assert.equal(f.owner.epoch,0);
 const t=f.api.transition(s,{value:'b'},s.contract.permit);
 assert.equal(t.authorizationStatus,'authorized');assert.equal(t.snapshot.selections.value,'b');
 assert.equal(f.owner.epoch,1);
});
