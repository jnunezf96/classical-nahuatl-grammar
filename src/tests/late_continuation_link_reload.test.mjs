import assert from "node:assert/strict";
import test from "node:test";
import {createRuntimeInstance} from "../runtime/create_runtime.mjs";
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as replay} from "../application/classical/result_reload.mjs";
import {encodeCompactResultAddress as encode,decodeCompactResultAddress as decode} from "../application/classical/compact_result_link.mjs";

const runtime=async()=>(await createRuntimeInstance({
  documentObject:{getElementById:()=>null,addEventListener(){}},
})).runtimeObject;

export function makeAttitudeContinuations(r) {
  const operationId="vnc:derivational-operation";
  const base={subject:"3sg",mood:"indicative",tense:"present",requestedDerivation:"direct",requestedVoice:"active"};
  function apply(args) {
    const made=r.executeClassicalGrammarApplicationRequest({operationId,args});
    assert.equal(made.authorizationStatus,"authorized",made.blockReason);
    return made.canonicalResult;
  }
  function bind(parent,choices) {
    const binding=r.issueClassicalNahuatlVncContinuationBindingFrame(operationId,parent,choices);
    assert.equal(binding.bindingStatus,"ready",binding.blockReason);
    return apply(binding.executionArgs);
  }
  const honorific=apply([{...base,sourceStem:"chōca",verbClass:"A",sourceValence:"intransitive",sourceSubject:"3sg",
    sourceSubjectHumanness:"human",sourceSubjectAnimacy:"animate",voice:"active",lateOperation:"honorific",lateVariant:"causative",
    honoredParticipant:"subject",honorificFormationAnalysis:"causative-only",honorificStemAlternative:"type-two-long"}]);
  const reverential=bind(honorific,{lateOperation:"reverential",lateVariant:""});
  const compound=apply([{...base,sourceStem:"cui",verbClass:"A",sourceValence:"specific-projective",
    objectKind:"specific-projective",objectPerson:"3sg",lateOperation:"compound",lateVariant:"connective-t",
    compoundMatrixStem:"huetzi",compoundMatrixClass:"B"}]);
  const readings=["compositional","lexicalized"].map(compoundAttitudeStructure=>{
    const choices={lateOperation:"honorific",lateVariant:"applicative",honoredParticipant:"subject",compoundAttitudeStructure};
    const pending=r.issueClassicalNahuatlVncContinuationBindingFrame(operationId,compound,choices);
    return bind(compound,{...choices,honorificDerivationOptionId:pending.ownerChoiceOptionProjection.honorificDerivationOptionId.options[0].optionId});
  });
  return [{parent:honorific,result:reverential},...readings.map(result=>({parent:compound,result}))];
}

test("attitude links reopen with the original parent, formula and chosen scope",async()=>{
  const r=await runtime(),fresh=await runtime();
  for(const {parent,result} of makeAttitudeContinuations(r)){
    const recipe=save(r,{result,parent});
    assert.ok(recipe,result.surfaceRealization);
    const compact=save(r,{result});
    assert.ok(compact);
    const reissued=replay(fresh,await decode(await encode(compact)))?.result;
    assert.ok(reissued,result.surfaceRealization);
    assert.equal(reissued.surfaceRealization,result.surfaceRealization);
    assert.equal(reissued.formulaRealization,result.formulaRealization);
    assert.equal(reissued.operationFrame.operationFacts.compoundTarget,result.operationFrame.operationFacts.compoundTarget);
    const roots=replay(fresh,recipe);
    const custody=fresh.getClassicalNahuatlLateContinuationReloadInputs(roots.result);
    assert.equal(custody.parent,roots.parent);
    const originalCustody=r.getClassicalNahuatlLateContinuationReloadInputs(result);
    assert.deepEqual(custody.selections,originalCustody.selections);
    assert.deepEqual(Object.keys(custody.operands),Object.keys(originalCustody.operands));
    for(const [role,operand] of Object.entries(originalCustody.operands)) {
      if(operand===parent)assert.equal(custody.operands[role],roots.parent);
    }
    if(result.operationFrame.operationFacts.typedCompoundSourceFrame===parent)
      assert.equal(roots.result.operationFrame.operationFacts.typedCompoundSourceFrame,roots.parent);
    const forged=structuredClone(compact);
    forged.nodes.at(-1).source=forged.nodes.length-1;
    assert.equal(replay(fresh,forged),null);
  }
});

export function makeDirectCompounds(r) {
  const base={sourceStem:"cui",sourceValence:"specific-projective",objectKind:"specific-projective",
    objectPerson:"3sg",verbClass:"A",subject:"3sg",mood:"indicative",tense:"present",
    derivationType:"direct",voice:"active",lateOperation:"compound"};
  const requests=[
    {...base,lateVariant:"shared-object",compoundMatrixStem:"tlāl-i-ā"},
    {...base,lateVariant:"shared-object",compoundMatrixStem:"quetza",objectKind:"reflexive",objectPerson:""},
    {...base,sourceStem:"chōca",sourceValence:"intransitive",objectKind:"none",objectPerson:"",
      lateVariant:"reflexive-matrix",compoundMatrixStem:"m-o-quetza"},

  ];
  return requests.map(request=>{
    const made=r.executeClassicalGrammarApplicationRequest({operationId:"vnc:derivational-operation",args:[request]});
    assert.equal(made.authorizationStatus,"authorized",made.blockReason || request.lateVariant);
    const parent=made.canonicalResult;
    const result=r.requestClassicalVncSentenceResultFrame(parent);
    assert.equal(result.lateOperationClosureFrame,parent);
    return {parent,result};
  });
}

test("direct compounds reopen inside sentences with the exact compound analysis",async()=>{
  const r=await runtime(),fresh=await runtime();
  for(const {parent,result} of makeDirectCompounds(r)){
    const recipe=save(r,{result,parent});
    assert.ok(recipe,parent.surfaceRealization);
    const reopened=replay(fresh,recipe);
    assert.ok(reopened,parent.surfaceRealization);
    assert.ok(reopened.result.lateOperationClosureFrame===reopened.parent, parent.surfaceRealization);
    assert.equal(reopened.parent.surfaceRealization,parent.surfaceRealization);
    assert.equal(reopened.parent.formulaRealization,parent.formulaRealization);
    assert.equal(reopened.parent.operationFrame.variant,parent.operationFrame.variant);
    const compact=await encode(save(r,{result}));
    const linked=replay(fresh,await decode(compact))?.result;
    assert.ok(linked,parent.surfaceRealization);
    assert.equal(linked.lateOperationClosureFrame.formulaRealization,parent.formulaRealization);
    assert.equal(linked.surfaceRealization,result.surfaceRealization);
    assert.equal(linked.formulaRecord?.formula,result.formulaRecord?.formula);
  }
});
