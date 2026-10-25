import test from 'node:test';
import assert from 'node:assert/strict';
import {exportClassicalResultReloadRecipe,replayClassicalResultReloadRecipe} from '../application/classical/result_reload.mjs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
const request=(sourceStem,verbClass,tense,extra={})=>({sourceStem,verbClass,tense,mood:'indicative',subject:'1sg',sourceValence:'intransitive',...extra});
const make=q=>r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[q]});
const envelope=x=>r.buildClassicalNahuatlSupplementationClauseEnvelope(x.canonicalResult,{referenceId:'speaker'});
// §5.3.3c: supportive qui is a singular number connector, not a tense suffix.
test('eligible ordinary finite future and consonantal preterit retain selected archaic qui through final realization',()=>{
 for(const [q,ordinary,archaic] of [[request('cuīca','A','future'),'nicuīcaz','nicuīcazqui'],[request('cochi','B','preterit'),'nicoch','nicochqui'],[request('āna','C','preterit'),'nānh','nānhqui']]){
  const usual=make(q),selected=make({...q,finiteSingularConnector:'qui'});
  assert.equal(usual.authorizationStatus,'authorized',usual.blockReason);assert.equal(selected.authorizationStatus,'authorized',selected.blockReason);
  assert.equal(envelope(usual).surface,ordinary);assert.equal(envelope(selected).surface,archaic);
  assert.equal(selected.canonicalResult.resultFrame.finalTypedVncSlotFrame.slots.number.num1,'qui');
  assert.match(envelope(selected).formulaRealization,/qui-0#/u);
 }
});
test('finite connector choice cannot overwrite Class A c, plural qu, unrelated tense, or irregular zero',()=>{
 for(const q of [request('cuīca','A','preterit'),request('cuīca','A','future',{subject:'1pl'}),request('cuīca','A','present'),request('cuīca','A','nonpast',{mood:'optative'}),request('il','B','preterit',{subject:'3sg',sourceValence:'transitive',objectKind:'specific-projective',objectPerson:'3sg'})]){
  assert.equal(make({...q,finiteSingularConnector:'qui'}).authorizationStatus,'blocked');
 }
 assert.equal(make({...request('cuīca','A','future'),finiteSingularConnector:'invented'}).authorizationStatus,'blocked');
});

test('raw Source and exact Result bindings project connector choices and preserve custody through recoordination',()=>{
 const parent=make(request('cuīca','A','present')).canonicalResult;
 const source=parent.resultFrame.sourceMachineryFrame,nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const base={subject:'1sg',mood:'indicative',tense:'future',requestedVoice:'active',requestedDerivation:'direct'};
 const bind=q=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',q);
 const continuation=q=>r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',parent,q);
 const b=bind(base),c=continuation(base);
 assert.equal(b.bindingStatus,'ready',b.blockReason);assert.equal(c.bindingStatus,'ready',c.blockReason);
 assert.deepEqual(b.choiceOptionProjection.finiteSingularConnector.map(x=>x.optionId),['silent','qui']);
 assert.deepEqual(c.ownerChoiceOptionProjection.finiteSingularConnector.map(x=>x.optionId),['silent','qui']);
 assert.equal(b.effectiveSelections.finiteSingularConnector,'silent');assert.equal(c.selectedOwnerChoices.finiteSingularConnector,'silent');
 for(const value of ['qui','silent']){
  const raw=bind({...base,finiteSingularConnector:value}),exact=continuation({...base,finiteSingularConnector:value});
  assert.equal(raw.bindingStatus,'ready',raw.blockReason);assert.equal(exact.bindingStatus,'ready',exact.blockReason);
  assert.ok(raw.exactSource===source);assert.ok(exact.exactInputResult===parent);
  const a=r.executeClassicalGrammarTypedSourceOperationBindingFrame(raw),b=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[...exact.executionArgs]});
  for(const x of [a,b]){assert.equal(x.authorizationStatus,'authorized',x.blockReason);assert.equal(envelope(x).surface,value==='qui'?'nicuīcazqui':'nicuīcaz');}
 }
 for(const q of [{...base,subject:'1pl'},{...base,tense:'present'},{...base,tense:'preterit'}]){
  for(const b of [bind(q),continuation(q)]){assert.equal(b.bindingStatus,'ready',b.blockReason);assert.equal((b.choiceOptionProjection||b.ownerChoiceOptionProjection).finiteSingularConnector,undefined);}
  for(const b of [bind({...q,finiteSingularConnector:'qui'}),continuation({...q,finiteSingularConnector:'qui'})])assert.equal(b.bindingStatus,'rejected');
 }
 assert.equal(r.isClassicalNahuatlVncContinuationBindingFrame({...c}),false);
 assert.equal(r.isClassicalNahuatlVncTypedSourceApplicationBindingFrame({...b}),false);
});

test('connector reload recipe reissues the chosen number cell in a fresh runtime',async()=>{
 const parent=make({...request('cuīca','A','future'),finiteSingularConnector:'qui'}).canonicalResult;
 const recipe=exportClassicalResultReloadRecipe(r,{result:parent});assert.ok(recipe);
 const {runtimeObject:fresh}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
 const restored=replayClassicalResultReloadRecipe(fresh,JSON.parse(JSON.stringify(recipe)));assert.ok(restored);
 assert.equal(restored.result.resultFrame.finalTypedVncSlotFrame.slots.number.num1,'qui');
 assert.equal(fresh.buildClassicalNahuatlSupplementationClauseEnvelope(restored.result,{referenceId:'speaker'}).surface,'nicuīcazqui');
});

test('a retained archaic Result permits new ineligible coordinates without retaining stale qui',()=>{
 const parent=make({...request('cuīca','A','future'),finiteSingularConnector:'qui'}).canonicalResult;
 for(const selections of [{subject:'1sg',mood:'indicative',tense:'present'},{subject:'1pl',mood:'indicative',tense:'future'}]){
  const b=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',parent,{requestedVoice:'active',requestedDerivation:'direct',...selections});
  assert.equal(b.bindingStatus,'ready',b.blockReason);assert.equal(b.ownerChoiceOptionProjection.finiteSingularConnector,undefined);
  const made=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[...b.executionArgs]});
  assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.notEqual(made.canonicalResult.resultFrame.finalTypedVncSlotFrame.slots.number.num1,'qui');
  assert.equal(parent.resultFrame.finalTypedVncSlotFrame.slots.number.num1,'qui');
 }
});

test('future object and passive number overrides outrank the optional connector',()=>{
 const base={sourceStem:'maca',verbClass:'A',sourceValence:'specific-projective',subject:'3sg',mood:'indicative',tense:'future',sourceObjectRequests:[
  {objectId:'direct-specific',objectKind:'specific-projective',objectPerson:'2sg',governor:'directive',derivationalLevel:1},
  {objectId:'applied-specific',objectKind:'specific-projective',objectPerson:'3sg',governor:'applicative',derivationalLevel:2}]};
 for(const [q,rule] of [[base,'lesson23-canvas-future-specific-cooccurrence-zero-number'],[{...base,requestedVoice:'passive',nonactiveOptionId:'ō:mac-ō'},'lesson21-transitive-passive-future-singular-number']]){
  const normal=make(q);assert.equal(normal.authorizationStatus,'authorized',normal.blockReason);
  assert.equal(normal.canonicalResult.resultFrame.finalTypedVncSlotFrame.slots.number.rule,rule);
  assert.equal(normal.canonicalResult.resultFrame.finalTypedVncSlotFrame.slots.number.num1,'0');
  assert.equal(make({...q,finiteSingularConnector:'qui'}).authorizationStatus,'blocked');
 }
});
