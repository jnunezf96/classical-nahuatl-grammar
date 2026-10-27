import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createUiRenderingApi} from '../ui/rendering/rendering.mjs';

const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
const rendering=createUiRenderingApi(r);
const source=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{
  sourceStem:'yohua',verbClass:'A',sourceValence:'intransitive',subject:'3sg',
  mood:'indicative',tense:'present',requestedDerivation:'direct',
  requestedVoice:'impersonal',nonactiveOptionId:'tla-impersonal',
}]}).canonicalResult;
assert.equal(source.controlFrame.selectedVoiceOperation,'tla-impersonal');
const make=target=>{
  const binding=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source.resultFrame,{
    lateOperation:'frequentative',lateVariant:'ordinary-short-glottal',frequentativeTarget:target,
  });
  assert.equal(binding.bindingStatus,'ready',binding.blockReason);
  assert.equal(binding.exactInputResult,source.resultFrame);
  const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:derivational-operation',args:binding.executionArgs});
  assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);
  return receipt.canonicalResult;
};

// Andrews §27.2.1, Canvas9059–9062: impersonal tla is a derived stem
// constituent. Copying it cannot introduce a projective object or human group.
test('AD055 both impersonal copying loci retain vacant participant structure and event scope',()=>{
  for(const [target,stem,prefixCopied] of [['fused-tla','tlah-tla-yohua',true],['lexical-stem','tla-yoh-yohua',false]]){
    const made=make(target),facts=made.operationFrame.operationFacts;
    assert.equal(made.operationFrame.targetStem,stem);
    assert.equal(made.finalTypedVncSlotFrame.valenceArity,'vacant');
    assert.deepEqual(facts.sourceParticipantTopology,[]);
    assert.equal(facts.objectPronounReduplicated,false);
    assert.equal(facts.objectScope,'no object');
    assert.equal(facts.eventScope,'frequentative impersonal event');
    assert.equal(facts.impersonalStemPrefixReduplicated,prefixCopied);
    assert.equal(facts.copiedPrefix,prefixCopied?'tlah':'yoh');
    assert.equal(facts.independentObjectAndEventScopes,false);
    assert.equal(facts.impersonalGroupReading,false);
    assert.equal(facts.separateIndividualActsWithinCollectiveAction,false);
  }
});

test('AD055 Result explanation describes an impersonal event without adding objects or a human group',()=>{
  const made=make('fused-tla');
  const cues=rendering.getClassicalFormulaDerivedAnnotations(made.formulaRealization,made.finalTypedVncSlotFrame,made);
  const labels=cues.map(x=>x.label).join('\n');
  assert.match(labels,/impersonal tla/u);
  assert.doesNotMatch(labels,/nonspecific-nonhuman objects|people in general|collective action/u);
  assert.ok(!cues.some(x=>x.role==='lesson27-object-pronoun-reduplication'));
});

test('AD055 immediate contrast retains copying loci without inferring universal semantic scopes',()=>{
  const made=r.evaluateClassicalNahuatlLateVncDerivation({
    sourceStem:'tla-cōhua',sourceValence:'intransitive',verbClass:'A',subject:'3sg',
    mood:'indicative',tense:'present',derivationType:'direct',voice:'active',
    objectKind:'none',objectPerson:'',lateOperation:'frequentative',
    lateVariant:'ordinary-short-glottal',frequentativeTarget:'fused-tla-and-lexical-stem',
  });
  assert.equal(made.authorizationStatus,'authorized',made.blockReason);
  assert.equal(made.operationFrame.targetStem,'tlah-tla-coh-cōhua');
  const facts=made.operationFrame.operationFacts;
  assert.equal(facts.objectPronounReduplicated,true);
  assert.equal(facts.objectScope,'construction-dependent interpretation');
  assert.equal(facts.eventScope,'construction-dependent interpretation');
  assert.equal(facts.independentObjectAndEventScopes,false);
});
