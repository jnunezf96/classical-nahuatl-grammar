import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const {r}=await createPossessiveFixture('cuīca');
const verb=stem=>r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:stem,verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',voice:'active'}]}).canonicalResult;
const principal=verb('cuīca'),adjoined=verb('chōca');
const particle=id=>r.requestClassicalParticleResult(id);
const query=(marker,profile='at-least')=>({principalClause:principal,adjoinedUnit:adjoined,markerUnit:marker,semanticRelation:'concession',concessionType:profile,adverbializationDegree:'nonadverbialized',structureKind:'complex',adjoinedUnitType:'vnc',order:'modifier-head',recursion:'none',marking:marker.semanticMarker});
test('at least requires an issued restrictive collocation; ordinary concession markers retain their own profile',()=>{
 for(const id of ['l50-ma-nel','l3-ma-zo','l3-ma-zo-tel'])assert.notEqual(r.evaluateAdverbialAdjunction(query(particle(id))).ok,true,`${id} is not restrictive`);
 const entries=[['ma-nel-zan','mā nel zan'],['ma-zan-nel','mā zan nel'],['ma-nel-za','mā nel zā'],['ma-za-nel','mā zā nel'],['ma-tel-za','mā tēl zā'],['ma-tel-za-yeh','mā tēl zā yeh']];
 for(const[id,form]of entries){const marker=particle('l50-'+id);assert.equal(r.isClassicalNahuatlParticleResultFrame(marker),true,id);assert.equal(r.getClassicalNahuatlParticleRelationalUse(marker).relationProfile,'at-least');const result=r.evaluateAdverbialAdjunction(query(marker));assert.equal(result.ok,true,id);assert.equal(result.surface,`${form} chōca cuīca`);assert.equal(result.sourceContract.marker.issuedResult,marker);assert.notEqual(r.evaluateAdverbialAdjunction(query({...marker})).ok,true);assert.notEqual(r.evaluateAdverbialAdjunction(query(marker,'in-ma-nel')).ok,true);}
 const ordinary=particle('l50-ma-nel');assert.equal(r.getClassicalNahuatlParticleRelationalUse(ordinary).relationProfile,'in-ma-nel');assert.equal(r.evaluateAdverbialAdjunction(query(ordinary,'in-ma-nel')).ok,true);
});
