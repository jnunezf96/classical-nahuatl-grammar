import test from 'node:test';
import assert from 'node:assert/strict';
import {createCompoundChoiceMemory} from '../application/classical/compound_choice_coordination.mjs';
test('explicit intent returns only for the same sources and an owner-accepted current coordinate',()=>{
 const c=createCompoundChoiceMemory(),source={},matrix={},scope={source,matrix,route:'connective-t'};
 assert(c.record(scope,'impersonal','both',['embed','matrix','both']));
 assert.equal(c.restore(scope,'active',['none'],()=>true),'');
 assert.equal(c.restore(scope,'impersonal',['embed','matrix','both'],()=>false),'');
 assert.equal(c.restore(scope,'impersonal',['embed','matrix','both'],()=>true),'both');
 assert.equal(c.restore({...scope,matrix:{}},'impersonal',['embed','matrix','both'],()=>true),'');
});
test('different voice and withdrawn domain do not consume or execute a retained choice',()=>{
 const c=createCompoundChoiceMemory(),scope={source:{},matrix:{},route:'connective-t'};
 c.record(scope,'impersonal','matrix',['embed','matrix','both']);
 assert.equal(c.restore(scope,'passive',['embed','both'],()=>true),'');
 assert.equal(c.restore(scope,'impersonal',['embed','both'],()=>true),'');
 assert.equal(c.record(scope,'impersonal','invented',['embed','both']),false);
});
