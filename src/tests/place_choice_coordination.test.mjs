import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
import {createCompoundChoiceMemory} from '../application/classical/compound_choice_coordination.mjs';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const block=code.slice(code.indexOf('    function getClassicalPlaceChoiceContext()'),code.indexOf('    function getClassicalRuleLogicSurfaceState(',code.indexOf('    function getClassicalPlaceChoiceContext()')));
test('explicit native place formation returns by kind only under current canonical owner and Apply session',async()=>{
 const {r}=await createPossessiveFixture('cal');
 let request={constructionKind:'place-name',formation:'n-yan',source:{embedStem:'cal'},usage:'adverbial',state:'absolutive',subject:'3common',nounClass:'tl-1-a'};
 const target={...r,ClassicalSourcePartsCommittedSignature:JSON.stringify({mode:'whole-stem',sourceWholeStem:'cal'})};
 let listener;
 const control={value:'n-yan',dataset:{},options:['n-yan','co','nonlocative-absolutive'].map(value=>({value})),addEventListener:(_,f)=>listener=f};
 const ctx=vm.createContext({targetObject:target,getActiveClassicalGrammarResultBinding:()=>null,getActiveClassicalGrammarTypedSourceOperationBinding:()=>null,buildClassicalNominalConstructionUiRequest:()=>request,ClassicalNativeCompoundChoiceSession:{},ClassicalPlaceFormations:createCompoundChoiceMemory()});
 vm.runInContext(block+'globalThis.coordinate=coordinateClassicalPlaceFormation;',ctx);
 ctx.coordinate(control,'place-name');control.value='co';listener();
 request={...request,constructionKind:'gentilic',formation:'nonlocative-absolutive',usage:'ordinary',source:{gentilicStem:'cal',embedStem:'cal'}};control.value='nonlocative-absolutive';ctx.coordinate(control,'gentilic');assert.equal(control.value,'nonlocative-absolutive');
 request={...request,constructionKind:'place-name',usage:'adverbial',formation:'n-yan'};control.value='n-yan';ctx.coordinate(control,'place-name');assert.equal(control.value,'co');assert.equal(r.evaluatePlaceGentilicNnc({...request,formation:control.value}).wordSurface,'calco');
 // An unavailable current formation cannot be restored even with old intent.
 control.options.find(o=>o.value==='co').disabled=true;control.value='n-yan';ctx.coordinate(control,'place-name');assert.equal(control.value,'n-yan');
 control.options.find(o=>o.value==='co').disabled=false;ctx.ClassicalNativeCompoundChoiceSession={};ctx.coordinate(control,'place-name');assert.equal(control.value,'n-yan');
 // New source text without Apply does not even obtain a draft context.
 request={...request,source:{embedStem:'ā'}};assert.equal(vm.runInContext('getClassicalPlaceChoiceContext()',ctx),null);
});
test('exact-source remembered formation still requires canonical authentic parent',async()=>{
 const {r}=await createPossessiveFixture('cal');
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal'});
 const op=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{state:'absolutive',subject:'3common'});
 const parent=r.requestClassicalOrdinaryNncResult(source,op);
 const request={canonicalNncResult:parent,constructionKind:'place-name',formation:'co',usage:'adverbial'};
 assert.equal(r.evaluatePlaceGentilicNnc(request).authorizationStatus,'authorized');
 assert.equal(r.evaluatePlaceGentilicNnc({...request,canonicalNncResult:{...parent}}).authorizationStatus,'blocked');
 const control={value:'',dataset:{},options:[{value:'co'}],addEventListener(){}};
 const memory=createCompoundChoiceMemory(),scope={source:parent,matrix:null,route:'exact-place'};memory.record(scope,'place-name','co',['co']);
 const ctx=vm.createContext({targetObject:r,getActiveClassicalGrammarResultBinding:()=>({exactResult:parent}),getActiveClassicalGrammarTypedSourceOperationBinding:()=>null,buildClassicalNominalConstructionUiRequest:()=>request,ClassicalNativeCompoundChoiceSession:{},ClassicalPlaceFormations:memory});
 vm.runInContext(block+'globalThis.coordinate=coordinateClassicalPlaceFormation;',ctx);ctx.coordinate(control,'place-name');assert.equal(control.value,'co');
 request.canonicalNncResult={...parent};control.value='';ctx.coordinate(control,'place-name');assert.equal(control.value,'');
});
