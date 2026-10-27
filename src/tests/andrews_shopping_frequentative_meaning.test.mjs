import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createUiRenderingApi} from '../ui/rendering/rendering.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const rendering=createUiRenderingApi(r);
const make=(target,extra={})=>r.evaluateClassicalNahuatlLateVncDerivation({sourceStem:'tla-cōhua',sourceValence:'intransitive',verbClass:'A',subject:'3sg',mood:'indicative',tense:'present',derivationType:'direct',voice:'active',objectKind:'none',objectPerson:'',lateOperation:'frequentative',lateVariant:'ordinary-short-glottal',frequentativeTarget:target,...extra});
test('Andrews 27.3.1 separates the shopping variety from numerous occasions',()=>{
 for(const [target,meaning]of [['lexical-stem','to shop for a variety of things'],['fused-tla-and-lexical-stem','to shop for a variety of things on numerous occasions']]){
  const made=make(target);assert.equal(made.authorizationStatus,'authorized');
  assert.equal(made.operationFrame.operationFacts.attestedInterpretation,meaning);
  const labels=rendering.getClassicalFormulaDerivedAnnotations(made.formulaRealization,made.finalTypedVncSlotFrame,made).map(x=>x.label).join('\n');
  assert(labels.includes(meaning));
 }
});

test('attested shopping interpretation is not extended to extra repetition or a selected agent reading',()=>{
 for(const extra of [{frequentativeRepetitions:2},{frequentativeScope:'agent'}]){
 const made=make('lexical-stem',extra);assert.equal(made.authorizationStatus,'authorized');assert.equal(made.operationFrame.operationFacts.attestedInterpretation,undefined);
 }
});
