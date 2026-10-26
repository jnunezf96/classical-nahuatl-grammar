import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const start=code.indexOf('    function syncClassicalResultOperationGuidance(');
function fixture(commit='committed',exact=null){
 const status={textContent:'Use this Source first. Your accepted Result is unchanged.'};
 const source={dataset:{classicalSourceCommitState:commit}};
 const context={targetObject:{document:{getElementById:id=>id==='classical-capability-operation-plan-status'?status:id==='classical-source-parts'?source:null}},ActiveClassicalGrammarCapabilityNavigator:exact?{exactResult:exact}:null,getClassicalOwnerIssuedResultProjection:r=>({surface:'Result',canonicalResult:r}),formatClassicalRequiredResultRoleLabel:x=>x,formatClassicalCapabilityChoiceLabel:x=>x};
 vm.createContext(context);vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),context);
 return {status,source,refresh:(state,binding=null)=>context.syncClassicalResultOperationGuidance(binding,{dataset:{classicalCapabilityApplyState:state}})};
}
test('applied raw Source replaces stale pending guidance with the operation-selection step',()=>{
 const h=fixture();h.refresh('waiting');assert.equal(h.status.textContent,'Choose an available operation for this Source.');
});
test('pending and absent Source guidance remains intact',()=>{
 for(const state of ['pending','empty']){const h=fixture(state);h.refresh('waiting');assert.match(h.status.textContent,/Use this Source first/);}
});
test('selected raw-operation requirements are not replaced by generic route guidance',()=>{
 const h=fixture();h.status.textContent='Choose a compatible speaker context';h.refresh('not-ready');assert.equal(h.status.textContent,'Choose a compatible speaker context');
});
test('genuine Result guidance retains its route and required-role distinctions',()=>{
 const h=fixture('committed',{});h.refresh('waiting');assert.equal(h.status.textContent,'Next: choose an operation for this Result.');
 h.refresh('needs-result',{requiredResultRoles:['dimension']});assert.equal(h.status.textContent,'Next: add a dimension Result.');
});
