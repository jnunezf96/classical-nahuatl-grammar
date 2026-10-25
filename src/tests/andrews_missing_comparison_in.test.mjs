import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
const learned=subject=>{
  const v=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:'mati',verbClass:'B',sourceValence:'projective-nonhuman',objectKind:'nonspecific-nonhuman',subject,mood:'indicative',tense:'customary-present'}]}).canonicalResult;
  const n=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[{constructionKind:'predicate-nominalization',nominalizationKind:'customary-agentive-full',canonicalVncResult:v,subject,state:'absolutive',numberConnector:'silent'}]});
  assert.equal(n.authorizationStatus,'authorized',n.blockReason);return n.canonicalResult;
};
const principal=learned('1sg'),standard=learned('2sg');
const source=x=>r.buildClassicalComparisonSourceUnit({sourceResult:x});
const slots={principal:source(principal),standard:source(standard)};
const make=(negativeIntroducer,negativeStandardIn,extra={})=>r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[{routeId:'comparative-negative-adverbial',slots,choices:{negativeIntroducer,degreeMarker:'oc-achi',sentenceType:'declarative',...(negativeStandardIn===undefined?{}:{negativeStandardIn})},...extra}]});
// Andrews 53.5.2, Canvas 22854: in is optional in every listed recipe.
test('negative comparison standard omits only its optional in for all five recipes',()=>{
  for(const [id,present,absent] of [['inahmo','inahmo','ahmō'],['in-ahmo-iuh','in ahmō iuh','ahmō iuh'],['in-ahmo-iuhqui','in ahmō iuhqui','ahmō iuhqui'],['in-ahmo-mach-iuh','in ahmō mach iuh','ahmō mach iuh'],['in-ahmo-mach-iuhqui','in ahmō mach iuhqui','ahmō mach iuhqui']]){
    for(const [selected,phrase] of [[true,present],[false,absent],[undefined,present]]){
      const made=make(id,selected);assert.equal(made.authorizationStatus,'authorized',made.blockReason);
      assert.equal(made.canonicalResult.surface,`Oc achi nitlamatini, ${phrase} titlamatini.`);
      assert.equal(made.canonicalResult.operationFrame.sourceSlots.principal,slots.principal);
      assert.equal(r.getClassicalComparisonCanonicalSourceResult(made.canonicalResult.operationFrame.sourceSlots.standard),standard);
      assert.equal(made.canonicalResult.formula.includes('in + ahmō'),selected!==false);
    }
  }
});
test('comparison controller offers and transports the standard boundary independently of point-clause in',()=>{
  const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',principal);c.captureCurrentResult('adjoined',standard);
  const selections={relation:'comparison',comparisonRoute:'comparative-tachcauh-hualcah',principalNnc:'tachcauh',degreeMarker:'oc',negativeIntroducer:'in-ahmo-iuh',copula:'no',adjunctorIn:'yes',negativeStandardIn:'no',sentenceType:'declarative'};
  const before=c.getCapturedCanonicalResult('principal');const d=c.buildDecisionContract(selections);
  assert.deepEqual(d.decisions.find(x=>x.id==='negative-standard-in')?.values,['yes','no']);
  assert.equal(c.getCapturedCanonicalResult('principal'),before);
  const made=c.compose(selections);assert.equal(made.authorizationStatus,'authorized',made.blockReason);
  assert.match(made.canonicalResult.surface,/in īc nitlamatini/u);
  assert.match(made.canonicalResult.surface,/, ahmō iuh titlamatini/u);
  assert.equal(made.canonicalResult.operationFrame.choices.adjunctorIn,true);
  assert.equal(made.canonicalResult.operationFrame.choices.negativeStandardIn,false);
});
test('negative-standard selection rejects invalid or unrelated context and copied sources',()=>{
  assert.equal(make('inahmo','no').authorizationStatus,'blocked');
  assert.equal(make('inahmo',false,{routeId:'equality-iuhqui',slots:{comparand:slots.principal,standard:slots.standard}}).authorizationStatus,'blocked');
  assert.throws(()=>make('inahmo',false,{slots:{...slots,standard:{...slots.standard}}}),/forbidden-authority/u);
});
