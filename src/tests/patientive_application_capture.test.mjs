import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const {r}=await createPossessiveFixture('cochi');
const cases=[
 ['imperfective-active-core','cuīca','A','present','active','captureClassicalNahuatlImperfectiveVncResultForPatientive'],
 ['perfective-active-core','miqui','B','preterit','active','captureClassicalNahuatlPerfectiveVncResultForPatientive'],
 ['impersonal-core','cochi','B','present','impersonal','captureClassicalNahuatlImpersonalVncResultForPatientive'],
];
for(const [family,stem,verbClass,tense,voice,captureName] of cases)test(`${family}: authentic application custody reaches capture and execution`,()=>{
 const option=voice==='impersonal'?r.getClassicalNahuatlNonactiveStemOptions(stem,{verbClass,sourceValence:'intransitive'}).options.find(o=>o.suffixFamily==='hua'):null;
 if(voice==='impersonal')assert(option);
 const parent=r.requestClassicalVncApplicationResult({sourceStem:stem,verbClass,sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense,requestedVoice:voice,...(option?{nonactiveOptionId:option.optionId}:{})});
 assert.equal(parent.authorizationStatus,'authorized',parent.blockReason);
 const capture=r[captureName](parent);
 assert.equal(capture.authorizationStatus,'authorized',capture.blockReason);
 assert.equal(capture.canonicalVncResult,parent);
 assert.equal(capture.canonicalNucleusResult,parent.resultFrame);
 const request={constructionKind:'patientive',patientiveSourceFamily:family,canonicalVncResult:parent,state:'absolutive',subject:'3common',animacy:'nonanimate',humanness:'nonhuman'};
 const result=r.evaluateClassicalNahuatlDeverbalNnc(request);
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);
 const application={operationId:'nnc:deverbal-construction',args:[request]};
 assert.equal(r.isClassicalGrammarApplicationPreview(r.previewClassicalGrammarApplicationRequest(application)),true);
 assert.equal(r.executeClassicalGrammarApplicationRequest(application).authorizationStatus,'authorized');
 const unrelated=r.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'future',requestedVoice:'active'});
 for(const bad of [{...parent},JSON.parse(JSON.stringify(parent)),unrelated]){
  assert.equal(r[captureName](bad).authorizationStatus,'blocked');
  const badRequest={...request,canonicalVncResult:bad};
  assert.equal(r.evaluateClassicalNahuatlDeverbalNnc(badRequest).authorizationStatus,'blocked');
  const badApplication={...application,args:[badRequest]};
  assert.equal(r.isClassicalGrammarApplicationPreview(r.previewClassicalGrammarApplicationRequest(badApplication)),false);
  let rejection;
  try { rejection=r.executeClassicalGrammarApplicationRequest(badApplication); }
  catch(error) { assert.match(error.message,/classical-grammar-application-request-invalid/); rejection={authorizationStatus:'blocked'}; }
  assert.equal(rejection.authorizationStatus,'blocked');
 }
});
