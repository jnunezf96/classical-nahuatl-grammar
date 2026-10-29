import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import * as ownerChoices from '../core/classical/vnc_late_operation_ui_contract.mjs';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
function renderer(getOptions,selected=''){
 const control={value:selected,options:['','owner-new-variant','ordinary-long','causative','preterit-embed'].map(value=>({value})),querySelectorAll:()=>[]};
 const ctx=vm.createContext({targetObject:{document:{getElementById:()=>control}},getClassicalNahuatlVncLateVariantOptions:getOptions});
 // Include the old local table if present, so this reproduces its authority.
 const start=code.includes('    const CLASSICAL_LATE_VARIANT_IDS_BY_OPERATION =')?code.indexOf('    const CLASSICAL_LATE_VARIANT_IDS_BY_OPERATION ='):code.indexOf('    function syncClassicalLateVariantControlForOperation(');
 vm.runInContext(code.slice(start,code.indexOf('    function syncClassicalCompoundMatrixFormation(',start)),ctx);
 return {control,sync:ctx.syncClassicalLateVariantControlForOperation};
}
test('production variant control consumes owner offerings rather than a second interface whitelist',()=>{
 const {control,sync}=renderer(()=>[{value:'owner-new-variant'}],'owner-new-variant');
 const result=sync('honorific');
 assert.deepEqual([...result.licensedVariants],['owner-new-variant']);
 assert.equal(control.value,'owner-new-variant');
 assert.equal(control.options.find(x=>x.value==='owner-new-variant').disabled,false);
 assert.equal(control.options.find(x=>x.value==='causative').disabled,true);
});
test('owner records distinguish operations, canonical variants and legacy request aliases',()=>{
 const get=ownerChoices.getClassicalNahuatlVncLateVariantOptions;
 assert.equal(typeof get,'function');
 const counts={frequentative:15,compound:6,honorific:3,reverential:1,pejorative:1,purposive:0,none:0};
 for(const [operation,count]of Object.entries(counts))assert.equal(get(operation).length,count,operation);
 for(const operation of ['reverential','pejorative'])assert.deepEqual(get(operation).map(x=>x.value),['preterit-embed']);
 const aliases=ownerChoices.CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS['classical-rule-logic-late-variant'].filter(x=>x.requestAlias);
 assert.equal(aliases.length,5);
 assert.equal(get('frequentative').some(x=>x.requestAlias),false);
 assert.deepEqual(get('not-an-operation'),[]);
});
test('actual operation switching retains valid choice and clears an incompatible former choice',()=>{
 const get=ownerChoices.getClassicalNahuatlVncLateVariantOptions;
 assert.equal(typeof get,'function');
 const {control,sync}=renderer(get,'causative');
 sync('honorific');assert.equal(control.value,'causative');
 sync('reverential');assert.equal(control.value,'');
 assert.equal(control.options.find(x=>x.value==='causative').disabled,true);
 assert.equal(control.options.find(x=>x.value==='preterit-embed').disabled,false);
 control.value='preterit-embed';sync('pejorative');assert.equal(control.value,'preterit-embed');
});
