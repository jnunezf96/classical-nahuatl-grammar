import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
import {createClassicalNahuatlNncClosureApi} from '../core/classical/nnc_lessons45_47_closure.mjs';
test('imperfect relational possession preserves the issued source subject and rejects disagreement',async()=>{
 const {r}=await createPossessiveFixture('');const api=createClassicalNahuatlNncClosureApi(r);
 const upstream=r.requestClassicalVncApplicationResult({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'imperfect',requestedVoice:'active'});
 assert.equal(upstream.authorizationStatus,'authorized',upstream.blockReason);
 const request={nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'n-locative',operation:'relational-nnc',formation:'option-two',sourceFormation:'imperfect-active',upstreamResult:upstream},state:'possessive',possessorId:'1sg',subjectMode:'adverbialized',subjectId:'3common'};
 const good=api.evaluateClassicalNahuatlRelationalNnc(request);
 assert.equal(good.authorizationStatus,'authorized',JSON.stringify(good.diagnostics));
 assert.equal(good.surface,'nochōcayān');
 const bad=api.evaluateClassicalNahuatlRelationalNnc({...request,possessorId:'2pl'});
 assert.equal(bad.authorizationStatus,'blocked');
 assert.ok(bad.diagnostics.includes('relational-source-subject-possessor-mismatch'));
 const rawOverride=api.evaluateClassicalNahuatlRelationalNnc({...request,nounstem:{...request.nounstem,sourceEmbedStem:'chōca'}});
 assert.equal(rawOverride.authorizationStatus,'blocked');
 const copied=api.evaluateClassicalNahuatlRelationalNnc({...request,nounstem:{...request.nounstem,upstreamResult:{...upstream}}});
 assert.equal(copied.authorizationStatus,'blocked');
});
for(const [stem,verbClass,valence,voice,option,subject,formation,state,surface] of [
 ['nāmiqui','B','specific-projective','passive','','3pl','imperfect-passive','possessive','īnnāmicōyān'],
 ['panō','A','intransitive','impersonal','hua:panō-hua','3sg','imperfect-impersonal','absolutive','panōhuayān'],
 ['celiya','A','intransitive','impersonal','tla-impersonal','3sg','imperfect-impersonal','absolutive','tlaceliyayān'],
]) test(`relational ${formation} preserves ${option||voice} owner analysis`,async()=>{
 const {r}=await createPossessiveFixture('');const api=createClassicalNahuatlNncClosureApi(r);
 const upstream=r.requestClassicalVncApplicationResult({sourceStem:stem,verbClass,sourceValence:valence,subject,mood:'indicative',tense:'imperfect',requestedVoice:voice,nonactiveOptionId:option});
 assert.equal(upstream.authorizationStatus,'authorized',upstream.blockReason);
 const request={nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'n-locative',operation:'relational-nnc',formation:'option-two',sourceFormation:formation,upstreamResult:upstream},state,possessorId:state==='possessive'?subject:'',subjectMode:'adverbialized',subjectId:'3common'};
 const result=api.evaluateClassicalNahuatlRelationalNnc(request);
 assert.equal(result.authorizationStatus,'authorized',JSON.stringify(result.diagnostics));
 assert.equal(result.surface,surface);
 if(state==='possessive')assert.equal(api.evaluateClassicalNahuatlRelationalNnc({...request,possessorId:'1sg'}).authorizationStatus,'blocked');
 else {const attempted=api.evaluateClassicalNahuatlRelationalNnc({...request,state:'possessive',possessorId:'1sg'});assert.equal(attempted.sourceFrame.state,'absolutive');assert.equal(attempted.surface,surface);}
});
