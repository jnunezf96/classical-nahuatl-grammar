import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
test('context change stages the current exact relation role without execution',()=>{
 const source=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const start=source.indexOf('    function handleClassicalDiscourseContextChange()');
 const end=source.indexOf('    function syncClassicalDiscourseContextControls',start);
 assert.ok(start>0&&end>start);
 const calls=[];const env={ActiveClassicalGrammarResultBinding:{family:'clause-relation',selectedBindingId:'vocative:principal'},enterClassicalGrammarResultBindingChoice:(...args)=>calls.push(args)};
 vm.runInNewContext(source.slice(start,end)+'\nhandleClassicalDiscourseContextChange()',env);
 assert.equal(calls.length,1);assert.equal(calls[0][0],'vocative:principal');assert.equal(calls[0][1].allowExecution,false);
 env.ActiveClassicalGrammarResultBinding={family:'formation',selectedBindingId:'ordinary'};
 vm.runInNewContext(source.slice(start,end)+'\nhandleClassicalDiscourseContextChange()',env);assert.equal(calls.length,1);
});
test('a captured clause packet cannot execute after its discourse context changes',async()=>{
 const {captureConstructionParents,executeConstructionPacket}=await import('../ui/composition/construction_packet.mjs');
 const exact=Object.freeze({kind:'test-owner-result'});let gender='male',composed=0;
 const controller={getCapturedCanonicalResult:role=>role==='principal'?exact:null,getState:()=>({captures:{principal:{discourseSourceContext:{speakerGender:gender}}}}),compose:()=>{composed++;return {authorizationStatus:'authorized',canonicalResult:exact};}};
 const packet={kind:'clause',controller,captures:captureConstructionParents(controller),choices:{relation:'vocative'}};
 const runtime={captureClassicalGrammarApplicationResult:()=>({applicationResult:{authorizationStatus:'authorized'}})};
 assert.equal(executeConstructionPacket(runtime,packet).authorizationStatus,'authorized');assert.equal(composed,1);
 gender='female';assert.equal(executeConstructionPacket(runtime,packet),null);assert.equal(composed,1);
 const fresh={...packet,captures:captureConstructionParents(controller)};assert.equal(executeConstructionPacket(runtime,fresh).authorizationStatus,'authorized');assert.equal(composed,2);
});
