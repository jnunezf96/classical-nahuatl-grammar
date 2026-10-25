import test from 'node:test';
import assert from 'node:assert/strict';
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as restore} from '../application/classical/result_reload.mjs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
const verb=()=>r.requestClassicalVncApplicationResult({sourceStem:'cati',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active'});
const inner=id=>r.requestClassicalAdverbialAdjunctionResult({principalClause:verb(),adjoinedUnit:r.requestClassicalParticleResult(id),adjoinedUnitType:'particle',semanticRelation:'manner',adverbializationDegree:'second',structureKind:'simple',order:'modifier-head',recursion:'none',marking:'unmarked',intensifier:true});
const selection={relation:'condition',degree:'nonadverbialized',relationProfile:'open',order:'modifier-head'};
const controller=adjoined=>{const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',verb());c.captureCurrentResult('adjoined',adjoined);return c;};
const request=adjoined=>({principalClause:verb(),adjoinedUnit:adjoined,adjoinedUnitType:'vnc',semanticRelation:'condition',conditionType:'open',adverbializationDegree:'nonadverbialized',structureKind:'complex',order:'modifier-head',recursion:'modifier',marking:'unmarked'});
// Andrews 50.7.2.b Remark: another element suggesting condition licenses omission of tlā.
for(const id of ['l3-at','l3-ahzo']) test(`${id}: issued conditional cue permits omitted or overt tlā`,()=>{
 const adjoined=inner(id),c=controller(adjoined);
 assert.equal(adjoined.supported,true);
 assert.equal(r.getCanonicalAdverbialAdjunctionSourceUnit(adjoined,'adjoined').features.conditionalCue,true);
 const before=c.getCapturedCanonicalResult('adjoined');
 const principal=c.getCapturedCanonicalResult('principal');
 assert.equal(c.issueRelationAvailabilityContract().relations.find(x=>x.value==='condition').status,'available');
 assert(c.preview(selection)?.isCurrent());
 const contract=c.buildDecisionContract(selection);
 assert.equal(contract.authorizationStatus,'authorized',JSON.stringify(contract.diagnostics));
 assert.equal(c.getCapturedCanonicalResult('adjoined'),before);
 const made=c.compose(selection);
 assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 assert.equal(made.canonicalResult.sourceContract.adjoined.issuedResult,adjoined);
 assert.equal(made.canonicalResult.sourceContract.principal.issuedResult,principal);
 assert.equal(made.canonicalResult.surface,`${id==='l3-at'?'at':'ahzo'} cati cati`);
 assert.equal(r.evaluateAdverbialAdjunction(request(adjoined)).supported,true);
 c.captureCurrentResult('marker',r.requestClassicalParticleResult('l3-tla'));
 const overt=c.compose(selection);assert.equal(overt.authorizationStatus,'authorized',overt.blockReason);
 assert.equal(overt.canonicalResult.surface,`tlā ${made.canonicalResult.surface}`);
});
test('missing cue, caller flags, and copied or forged parents cannot authorize omission',()=>{
 const plain=verb();
 assert.equal(controller(plain).compose({...selection,conditionalCuePresent:true}).authorizationStatus,'blocked');
 assert.equal(r.evaluateAdverbialAdjunction({...request(plain),recursion:'none',conditionalCuePresent:true}).supported,false);
 const issued=inner('l3-ahzo');
 for(const invalid of [{...issued},JSON.parse(JSON.stringify(issued)),{...plain,conditionalCuePresent:true}]){
  assert.equal(controller(invalid).compose(selection).authorizationStatus,'blocked');
  assert.equal(r.evaluateAdverbialAdjunction(request(invalid)).supported,false);
 }
});

test('public sentence-particle attachment retains the issued conditional cue',()=>{
 for(const id of ['l3-at','l3-ahzo']){
  const nuclear=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:sentence-result',args:[verb()]}).canonicalResult;
  const layer=r.executeClassicalGrammarApplicationRequest({operationId:'sentence:particle-adjunction',args:[{particleResultFrame:r.requestClassicalParticleResult(id),nuclearResultFrame:nuclear}]}).canonicalResult;
  assert(layer,'particle layer issued');
  assert.equal(controller({...layer}).compose(selection).authorizationStatus,'blocked');
  assert.equal(controller(nuclear).compose({...selection,conditionalCuePresent:true}).authorizationStatus,'blocked');
  const c=controller(layer),made=c.compose(selection);assert.equal(made.authorizationStatus,'authorized',made.blockReason);
  assert.equal(made.canonicalResult.sourceContract.adjoined.issuedResult,layer);
  assert.equal(layer.canonicalInputFrame,nuclear);
 }
});

test('cue-bearing condition reload is supported and reissues exact parents',async()=>{
 const adjoined=inner('l3-at'),c=controller(adjoined),principal=c.getCapturedCanonicalResult('principal');
 const result=c.compose(selection).canonicalResult;
 const recipe=save(r,{result,adjoined,principal});assert(recipe);
 const fresh=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
 const roots=restore(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots);
 assert.equal(roots.result.surface,result.surface);
 assert.equal(roots.result.sourceContract.adjoined.issuedResult,roots.adjoined);
 assert.equal(roots.result.sourceContract.principal.issuedResult,roots.principal);
 assert.equal(fresh.getCanonicalAdverbialAdjunctionSourceUnit(roots.adjoined).features.conditionalCue,true);
});
