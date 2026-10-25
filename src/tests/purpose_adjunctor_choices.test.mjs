import test from 'node:test';
import assert from 'node:assert/strict';
import {getClassicalClauseRelationMarkerProfiles} from '../application/classical/clause_relation_controller.mjs';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const {r}=await createPossessiveFixture('cochi');
const v=(stem,verbClass,mood,tense)=>r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:stem,verbClass,sourceValence:'intransitive',subject:'3sg',mood,tense,voice:'active'}]}).canonicalResult;
const principal=v('cuīca','A','indicative','present');
const future=v('cochi','B','indicative','future');
const optative=v('cochi','B','optative','nonpast');
const admonitive=v('cochi','B','admonitive','nonpast');
const query=(adjoined,marker,profile)=>({principalClause:principal,adjoinedUnit:adjoined,markerUnit:marker,semanticRelation:'purpose',purposeType:profile,adverbializationDegree:'nonadverbialized',structureKind:'complex',adjoinedUnitType:'vnc',order:'head-modifier',recursion:'none',marking:marker.semanticMarker});
test('purpose offers in and in mā through issued markers while preserving optative and admonitive prerequisites',()=>{
 assert.ok(getClassicalClauseRelationMarkerProfiles('purpose').includes('in'));
 const ordinary=r.requestClassicalParticleResult('l3-in');
 assert.equal(r.evaluateAdverbialAdjunction(query(future,ordinary,'unmarked')).ok,true);
 const marker=r.requestClassicalParticleResult('l50-in-ma');assert.equal(r.isClassicalNahuatlParticleResultFrame(marker),true);
 for(const[adj,profile]of [[optative,'ma-optative'],[admonitive,'ma-admonitive-lest']]){assert.equal(adj.authorizationStatus,'authorized',`${profile}: ${adj.blockReason}`);const result=r.evaluateAdverbialAdjunction(query(adj,marker,profile));assert.equal(result.ok,true,profile);assert.equal(result.sourceContract.marker.surface,'in mā');assert.equal(result.sourceContract.adjoined.issuedResult,adj);assert.notEqual(r.evaluateAdverbialAdjunction(query(future,marker,profile)).ok,true);assert.notEqual(r.evaluateAdverbialAdjunction(query(adj,{...marker},profile)).ok,true);}
});
test('purpose consumes an existing issued mā introduction once without rewriting the captured sentence',()=>{
 const sentence=r.buildClassicalNahuatlVncSentenceResultFrame(optative,{sentenceType:'wish-sentence',introductoryParticle:'mā'});
 assert.equal(r.isClassicalNahuatlVncSentenceResultFrame(sentence),true);
 assert.equal(sentence.sentenceSurfaceDisplay,'Mā cochi.');
 for(const id of ['l3-ma','l50-in-ma']){const marker=r.requestClassicalParticleResult(id);const result=r.evaluateAdverbialAdjunction({...query(sentence,marker,'ma-optative'),adjoinedUnitType:'sentence'});assert.equal(result.ok,true);assert.equal(result.surface,`cuīca ${id==='l3-ma'?'mā':'in mā'} cochi`);assert.equal(result.sourceContract.adjoined.issuedResult,sentence);assert.equal(sentence.sentenceSurfaceDisplay,'Mā cochi.');assert.equal(result.purposeIntroductionProjection.exactSentence,sentence);assert.notEqual(r.evaluateAdverbialAdjunction({...query({...sentence},marker,'ma-optative'),adjoinedUnitType:'sentence'}).ok,true);}
 const unchanged=r.evaluateAdverbialAdjunction({...query(sentence,r.requestClassicalParticleResult('l50-in-ma-nel'),'ma-optative'),semanticRelation:'concession',concessionType:'in-ma-nel',adjoinedUnitType:'sentence'});assert.equal(unchanged.ok,true);assert.equal(unchanged.sourceContract.adjoined.surface,'mā cochi');assert.equal(unchanged.purposeIntroductionProjection,null);
});
test('purpose introduction consumption preserves the negative sentence prefix',()=>{
 const sentence=r.buildClassicalNahuatlVncSentenceResultFrame(optative,{sentenceType:'wish-sentence',introductoryParticle:'mā',negative:true});
 assert.equal(r.isClassicalNahuatlVncSentenceResultFrame(sentence),true);
 const marker=r.requestClassicalParticleResult('l50-in-ma');
 const result=r.evaluateAdverbialAdjunction({...query(sentence,marker,'ma-optative'),adjoinedUnitType:'sentence'});
 assert.equal(result.ok,true);
 assert.equal(result.surface,'cuīca in mā cacochi');
 assert.equal(sentence.sentenceSurfaceDisplay,'Mā cacochi.');
 assert.equal(result.sourceContract.adjoined.issuedResult,sentence);
});
