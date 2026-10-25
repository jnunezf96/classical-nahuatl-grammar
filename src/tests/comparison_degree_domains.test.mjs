import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
const quality=subject=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'chicāhuac',sourceClass:'zero'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject,state:'absolutive'})]}).canonicalResult;};
const p=quality('1sg'),q=quality('2sg');
const source=x=>r.buildClassicalComparisonSourceUnit({sourceResult:x});
const base=['oc-achi','oc-cencah','oc-cencah-yeh','oc-cencah-yehhuatl','oc-yeh','oc-yeh-cencah'];
const negative=[...base,...base.map(x=>`huel-${x}`)];
const adversative=['cencah',...negative.filter(x=>x.includes('cencah'))];
const domains={'comparative-adversative':adversative,'comparative-negative-adverbial':negative};
const slots=route=>route==='comparative-adversative'?{baseClause:source(p),superiorClause:source(q)}:{principal:source(p),standard:source(q)};
const make=(route,degreeMarker,overrides={})=>r.evaluateClassicalNahuatlComparison({routeId:route,slots:slots(route),choices:{degreeMarker,sentenceType:'none'},...overrides});
// Andrews 53.5.1 requires cencah; 53.5.2a licenses six collocations, each with optional huel.
test('comparison degree domains agree between canonical operation and visible controller',()=>{
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',p);c.captureCurrentResult('adjoined',q);
 for(const [route,domain] of Object.entries(domains)){
  const contract=c.buildDecisionContract({relation:'comparison',comparisonRoute:route});
  assert.deepEqual(contract.decisions.find(x=>x.id==='degree-marker').values,domain);
  for(const degreeMarker of domain){
   const made=make(route,degreeMarker);assert.equal(made.authorizationStatus,'authorized',`${route}/${degreeMarker}: ${made.blockReason}`);
   assert.ok(made.selectedResult.includes(degreeMarker.replaceAll('-',' ').replace('yehhuatl','yehhuātl')));
   assert.ok(made.formula.includes(degreeMarker.replaceAll('-',' + ').replace('yehhuatl','yehhuātl')));
   assert.equal(c.buildDecisionContract({relation:'comparison',comparisonRoute:route,degreeMarker}).authorizationStatus,'authorized');
  }
  for(const degreeMarker of ['none','achi','zan-achi','oc','huel-oc',...(route==='comparative-adversative'?['oc-achi','oc-yeh','huel-oc-achi','huel-oc-yeh']:['cencah'])]){
   assert.equal(make(route,degreeMarker).authorizationStatus,'blocked',`${route}/${degreeMarker}`);
   assert.equal(c.buildDecisionContract({relation:'comparison',comparisonRoute:route,degreeMarker}).authorizationStatus,'blocked');
  }
  const validSlots=slots(route),first=Object.keys(validSlots)[0];
  assert.equal(make(route,domain[0],{slots:{...validSlots,[first]:{...validSlots[first]}}}).authorizationStatus,'blocked');
  assert.equal(c.getCapturedCanonicalResult('principal'),p);assert.equal(c.getCapturedCanonicalResult('adjoined'),q);
 }
});
