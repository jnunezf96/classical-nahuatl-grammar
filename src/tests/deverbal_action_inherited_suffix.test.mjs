import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

test('exact action continuation inherits its suffix while raw formation retains the choice',async()=>{
 const {r}=await createPossessiveFixture('chōca');
 const future=r.requestClassicalVncApplicationResult({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'future',requestedVoice:'active'});
 const action=r.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'deverbal-action',actionKind:'active-action',actionSuffix:'liz',actionStemVariant:'ca-to-qui',canonicalVncResult:future,state:'absolutive',subject:'3common',animacy:'nonanimate'});
 assert.equal(action.authorizationStatus,'authorized',action.blockReason);
 const wrapper={hidden:false,setAttribute(){}};
 const control={disabled:false,value:'z',closest:()=>wrapper};
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const start=code.indexOf('    function syncClassicalDeverbalActionSuffixControl(');
 assert.ok(start>=0,'dedicated inherited-suffix presentation is present');
 const end=code.indexOf('\n    function ',start+1);
 const ctx=vm.createContext({targetObject:{...r,document:{getElementById:()=>control}}});
 vm.runInContext(code.slice(start,end),ctx);
 for(const selectedFamily of ['nominal-continuation','verbal-continuation']){
  ctx.syncClassicalDeverbalActionSuffixControl(true,selectedFamily,{selectedBindingId:'continuation:action-nnc',exactResult:action});
  assert.equal(wrapper.hidden,true);assert.equal(control.disabled,true);
 }
 ctx.syncClassicalDeverbalActionSuffixControl(true,'deverbal-action',null);
 assert.equal(wrapper.hidden,false);assert.equal(control.disabled,false);
 ctx.syncClassicalDeverbalActionSuffixControl(true,'nominal-continuation',null);
 assert.equal(wrapper.hidden,false);assert.equal(control.disabled,false);
 const result=r.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'verbal-continuation',canonicalNncResult:action,actionSuffix:'z',source:{matrixStem:'tzahtzi',matrixVerbClass:'A',matrixValence:'intransitive',embedClass:'tli',sourceState:'absolutive'},relation:'adverb',adverbRole:'manner',subject:'3sg',mood:'indicative',tense:'present'});
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);
 assert.equal(result.wordSurface,'chōquiliztzahtzi');
 assert.equal(result.operationFrame.actionNncContinuationFrame.canonicalActionNncResult,action);
 assert.equal(r.captureClassicalNahuatlActionNncResultForContinuation({...action}).authorizationStatus,'blocked');
 assert.equal(action.wordSurface,'chōquiliztli');
});
