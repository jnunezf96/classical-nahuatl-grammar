import assert from "node:assert/strict";
import test from "node:test";
import {createRuntimeInstance} from "../runtime/create_runtime.mjs";
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as replay} from "../application/classical/result_reload.mjs";
import {encodeCompactResultAddress as encode,decodeCompactResultAddress as decode} from "../application/classical/compact_result_link.mjs";

const runtime=async()=>(await createRuntimeInstance({
  documentObject:{getElementById:()=>null,addEventListener(){}},
})).runtimeObject;

export function makeAttitudeContinuations(r, direct=false) {
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
    return apply(direct ? [{...binding.executionArgs[0]}] : binding.executionArgs);
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
  const carry={...base,sourceValence:"tla",objectKind:"nonspecific-nonhuman",objectPerson:"",
    lateVariant:"huītz-carry",compoundMatrixStem:"huī-tz"};
  const requests=[
    {...carry,sourceStem:"huīca",subject:"3pl",tense:"preterit-as-present"},
    {...carry,sourceStem:"itqui",subject:"1sg",tense:"distant-past-as-past"},
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

export function makeRecursiveCompound(r) {
  const request={sourceStem:"chōca",sourceValence:"intransitive",verbClass:"A",subject:"2sg",
    mood:"indicative",tense:"present",derivationType:"direct",voice:"active",
    lateOperation:"compound",lateVariant:"connective-t",compoundMatrixStem:"ahci"};
  const make=args=>r.executeClassicalGrammarApplicationRequest({operationId:"vnc:derivational-operation",args:[args]});
  const inner=make(request).canonicalResult;
  const outer=make({...request,sourceStem:inner.operationFrame.targetStem,compoundMatrixStem:"ya-uh",
    compoundEmbedClosureFrame:inner,tense:"future"}).canonicalResult;
  assert.equal(outer.surfaceRealization,"tichōcatahcitiyāz");
  return {inner,parent:outer,result:r.requestClassicalVncSentenceResultFrame(outer)};
}

test("a compound used as an embed survives a nested Result link",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {inner,parent,result}=makeRecursiveCompound(r);
  const recipe=save(r,{result});
  assert.ok(recipe,parent.surfaceRealization);
  const decoded=await decode(await encode(recipe));
  const reopened=replay(fresh,decoded)?.result?.lateOperationClosureFrame;
  assert.ok(reopened);
  assert.equal(reopened.surfaceRealization,parent.surfaceRealization);
  assert.equal(reopened.formulaRealization,parent.formulaRealization);
  const restored=fresh.getClassicalNahuatlDirectLateReloadInputs(reopened).operands.compoundEmbedClosureFrame;
  assert.equal(restored.surfaceRealization,inner.surfaceRealization);
  assert.equal(restored.formulaRealization,inner.formulaRealization);
  const outer=decoded.nodes.find(node=>node.operands?.compoundEmbedClosureFrame!==undefined);
  outer.operands.compoundEmbedClosureFrame=decoded.nodes.length-1;
  assert.equal(replay(fresh,decoded),null);
});

export function makeDirectReverential(r) {
  const [{parent:honorific}]=makeAttitudeContinuations(r);
  const {targetStem,targetValence,targetClass}=honorific.operationFrame;
  const application=r.executeClassicalGrammarApplicationRequest({operationId:"vnc:derivational-operation",args:[{
    sourceStem:targetStem,sourceValence:targetValence,verbClass:targetClass,subject:"3sg",mood:"indicative",
    tense:"present",derivationType:"direct",voice:"active",objectKind:"reflexive",lateOperation:"reverential",
    lateVariant:"preterit-embed",honoredParticipant:"subject",attitudeSourceClosureFrame:honorific,
  }]});
  assert.equal(application.authorizationStatus,"authorized",application.blockReason);
  const parent=application.canonicalResult;
  assert.equal(parent.surfaceRealization,"mochōquitihtzinoa");
  return {honorific,parent,result:r.requestClassicalVncSentenceResultFrame(parent)};
}

test("a direct reverential sentence link preserves its honorific input",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {honorific,parent,result}=makeDirectReverential(r);
  const recipe=save(r,{result});
  assert.ok(recipe,parent.surfaceRealization);
  const decoded=await decode(await encode(recipe));
  const sentence=replay(fresh,decoded)?.result;
  assert.ok(sentence);
  assert.equal(sentence.sentenceSurfaceDisplay,result.sentenceSurfaceDisplay);
  assert.equal(sentence.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
  const closure=sentence.lateOperationClosureFrame;
  assert.equal(closure.formulaRealization,parent.formulaRealization);
  const restored=fresh.getClassicalNahuatlDirectLateReloadInputs(closure).operands.attitudeSourceClosureFrame;
  assert.equal(restored.surfaceRealization,honorific.surfaceRealization);
  assert.equal(restored.formulaRealization,honorific.formulaRealization);
  const outer=decoded.nodes.find(node=>node.operands?.attitudeSourceClosureFrame!==undefined);
  delete outer.operands.attitudeSourceClosureFrame;
  assert.equal(replay(fresh,decoded),null);
});

export function makeCompoundPredicate(r, fromOwnerhood=false) {
  const ownerhood=fromOwnerhood ? r.evaluateClassicalNahuatlDeverbalNnc({
    constructionKind:"ownerhood",source:{sourceStem:"xōch",nounClass:"tli",ownerhoodMatrix:"ē"},
    subject:"3sg",state:"absolutive",animacy:"animate",numberConnector:"silent",
  }) : null;
  const source=r.buildClassicalNahuatlCompoundPredicateSourceFrame(
    ownerhood ? {canonicalNncResult:ownerhood} : {sourceStem:"cac"}
  );
  assert.ok(r.isClassicalNahuatlCompoundPredicateSourceFrame(source));
  const args={sourceStem:source.sourceStem,sourceValence:"intransitive",verbClass:"A",subject:"3sg",mood:"indicative",
    tense:"present",derivationType:"direct",voice:"active",lateOperation:"compound",lateVariant:"connective-t",
    compoundMatrixStem:"yāuh",compoundPredicateSourceFrame:source};
  const application=r.executeClassicalGrammarApplicationRequest({operationId:"vnc:derivational-operation",args:[args]});
  assert.equal(application.authorizationStatus,"authorized",application.blockReason);
  const parent=application.canonicalResult;
  assert.equal(parent.surfaceRealization,ownerhood ? "xōchehtiyauh" : "cactiyauh");
  return {parent,result:r.requestClassicalVncSentenceResultFrame(parent)};
}

test("a compound link restores its compound-only predicate Source",async()=>{
  const r=await runtime(),fresh=await runtime();
  for(const fromOwnerhood of [false,true]) {
    const {parent,result}=makeCompoundPredicate(r,fromOwnerhood);
    const recipe=save(r,{result});
    assert.ok(recipe,parent.surfaceRealization);
    const decoded=await decode(await encode(recipe));
    const reopened=replay(fresh,decoded)?.result;
    assert.ok(reopened);
    assert.equal(reopened.sentenceSurfaceDisplay,result.sentenceSurfaceDisplay);
    assert.equal(reopened.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
    const closure=reopened.lateOperationClosureFrame;
    const source=closure.compoundPredicateSourceFrame;
    assert.ok(fresh.isClassicalNahuatlCompoundPredicateSourceFrame(source));
    assert.equal(source.lexicalIdentity,parent.compoundPredicateSourceFrame.lexicalIdentity);
    assert.equal(source.independentFiniteUse,false);
    assert.equal(closure.formulaRealization,parent.formulaRealization);
    if(fromOwnerhood) {
      assert.equal(source.canonicalNncResult.formulaRealization,
        parent.compoundPredicateSourceFrame.canonicalNncResult.formulaRealization);
    }
    const compound=decoded.nodes.find(node=>node.predicate);
    compound.predicate.sourceStem="chōca";
    assert.equal(replay(fresh,decoded),null);
  }
});

export function makeNominalMatrixCompound(r) {
  const execute=(operationId,...args)=>r.executeClassicalGrammarApplicationRequest({operationId,args}).canonicalResult;
  const nounSource=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:"pil",sourceClass:"tli-1"});
  const nounOperation=r.buildClassicalNahuatlOrdinaryNncOperationFrame(nounSource,{
    state:"absolutive",subject:"3sg",predicateFormation:"source-stem",humanness:"human",
  });
  const embed=execute("nnc:ordinary",nounSource,nounOperation);
  const finite={subject:"3sg",mood:"indicative",tense:"present"};
  const matrix=execute("vnc:application",{...finite,sourceStem:"caqui",verbClass:"B",sourceValence:"specific-projective",
    objectKind:"specific-projective",objectPerson:"3sg",requestedDerivation:"direct",requestedVoice:"active"});
  const nominal=execute("grammar:nominal-construction",{...finite,constructionKind:"nominal-embed-vnc",relation:"object",
    route:"object",voice:"active",embedReduplication:"none",matrixFormation:"ordinary",matrixReduplication:"none",
    orientation:"not-applicable",source:{embedStem:"pil",embedClass:"tli",embedSourceClass:"tli-1",
      embedConstituent:{kind:"ordinary-nnc",stem:"pil",resultFrame:embed},
      matrixStem:"caqui",matrixValence:"specific-projective",matrixVerbClass:"B",
      matrixConstituent:{kind:"vnc-result",stem:"caqui",resultFrame:matrix}}});
  const parent=execute("vnc:derivational-operation",{...finite,sourceStem:"chōca",verbClass:"A",sourceValence:"intransitive",
    objectKind:"specific-projective",objectPerson:"3sg",voice:"active",lateOperation:"compound",lateVariant:"connective-t",
    compoundMatrixVncResultFrame:nominal});
  assert.equal(parent?.surfaceRealization,"chōcatipilcaqui");
  return {nominal,parent,result:r.requestClassicalVncSentenceResultFrame(parent)};
}

test("a nominally composed matrix retains its exact identity in a compound link",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {nominal,parent,result}=makeNominalMatrixCompound(r);
  const recipe=save(r,{result,nominal});
  assert.ok(recipe,parent.surfaceRealization);
  const roots=replay(fresh,recipe);
  assert.ok(roots?.result.lateOperationClosureFrame.operationFrame.operationFacts.nominalMatrixResultFrame===roots?.nominal);
  const decoded=await decode(await encode(save(r,{result})));
  const reopened=replay(fresh,decoded)?.result;
  assert.ok(reopened);
  assert.equal(reopened.sentenceSurfaceDisplay,result.sentenceSurfaceDisplay);
  assert.equal(reopened.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
  const outer=decoded.nodes.find(node=>node.operands?.compoundMatrixVncResultFrame!==undefined);
  outer.operands.compoundMatrixVncResultFrame=decoded.nodes.findIndex(node=>node.type==="vnc");
  assert.equal(replay(fresh,decoded),null);
});

test("both direct compound honorific readings keep their scope and parent in a sentence link",async()=>{
  const r=await runtime(),fresh=await runtime();
  for(const {parent,result} of makeAttitudeContinuations(r,true).slice(1)){
    const sentence=r.requestClassicalVncSentenceResultFrame(result);
    const recipe=save(r,{result:sentence});
    assert.ok(recipe,result.surfaceRealization);
    const decoded=await decode(await encode(recipe));
    const reopened=replay(fresh,decoded)?.result;
    assert.ok(reopened);
    assert.equal(reopened.sentenceSurfaceDisplay,sentence.sentenceSurfaceDisplay);
    assert.equal(reopened.sentenceFormulaDisplay,sentence.sentenceFormulaDisplay);
    const closure=reopened.lateOperationClosureFrame;
    assert.equal(closure.operationFrame.operationFacts.compoundTarget,result.operationFrame.operationFacts.compoundTarget);
    assert.deepEqual(closure.operationFrame.operationFacts.compoundLexicalizationAnalysisFrame,
      result.operationFrame.operationFacts.compoundLexicalizationAnalysisFrame);
    assert.equal(fresh.getClassicalNahuatlDirectLateReloadInputs(closure).operands.attitudeCompoundClosureFrame.formulaRealization,
      parent.formulaRealization);
    assert.deepEqual(closure.baseApplicationFrame.normalizedRequest.sourceObjectRequests,
      result.baseApplicationFrame.normalizedRequest.sourceObjectRequests);
    const altered=structuredClone(decoded);
    const node=altered.nodes.find(entry=>entry.operands?.attitudeCompoundClosureFrame!==undefined);
    node.request.compoundLexicalizationAnalysis.sourceEmbedStem="chōca";
    assert.equal(replay(fresh,altered),null);
  }
});
