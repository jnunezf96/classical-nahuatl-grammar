import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const {r}=await createPossessiveFixture('pil');
const base={constructionKind:'affective-nnc',affectRoute:'compound',source:{embedStem:'pil',embedClass:'tli',embedSourceClass:'tli-1'},semanticReading:'pil-child',pilChildRoute:'simple',affectiveMatrix:'tzin',animacy:'animate',subject:'3sg',state:'absolutive',possessor:'1sg'};
test('32.6 distinguishes simple plural child from singular affective child and noble',()=>{
 for(const state of ['absolutive','possessive'])for(const gender of ['unspecified','male','female']){
  const blocked=r.requestClassicalNominalConstructionResult({...base,state,pilGenderSpecification:gender});
  assert.equal(blocked.authorizationStatus,'blocked');assert.equal(blocked.blockReason,'pil-child-singular-requires-affective-matrix');
 }
 for(const [patch,word]of [
  [{subject:'3pl'},'pīpiltin'],
  [{subject:'2pl',state:'possessive'},'annopilhuān'],
  [{pilChildRoute:'affective'},'piltzintli'],
  [{pilChildRoute:'affective',state:'possessive'},'nopiltzin'],
  [{semanticReading:'pil-noble'},'pilli'],
  [{semanticReading:'pil-noble',state:'possessive'},'nopillo'],
 ]){const result=r.requestClassicalNominalConstructionResult({...base,...patch});assert.equal(result.authorizationStatus,'authorized',result.blockReason);assert.equal(result.wordSurface,word);}
});
