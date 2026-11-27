import test from "node:test";
import assert from "node:assert/strict";
import { createRuntimeInstance } from "../runtime/create_runtime.mjs";
import {
  exportNncContextReloadNode,
  replayNncContextReloadNode,
  isNncReloadEvidence,
} from "../application/classical/reload_nnc_context.mjs";
import {
  exportClassicalResultReloadRecipe,
  replayClassicalResultReloadRecipe,
  inspectClassicalResultLink,
} from "../application/classical/result_reload.mjs";
const runtime = async () =>
  (
    await createRuntimeInstance({
      documentObject: { getElementById: () => null, addEventListener() {} },
    })
  ).runtimeObject;
// Fresh random nonce stems, retained as reproducible regression inputs.
const nonce = ["ēyomatitlōcuitzo", "xīxehuoxātlacha"];
const execute = (r, id, ...args) => {
  if (id === "nnc:sentence-surface" && args[1]?.canonicalNuclearWrittenResult) {
    args = [r.buildClassicalNahuatlNncSentenceSurfaceFrame(...args), {}];
  }
  const a = r.executeClassicalGrammarApplicationRequest({
    operationId: id,
    args,
  });
  assert.equal(a.authorizationStatus, "authorized", a.blockReason);
  return a.canonicalResult;
};
function noun(r, stem) {
  const s = r.buildClassicalNahuatlOrdinaryNncSourceFrame({
    stem,
    sourceClass: "tl-1-a",
  });
  const nav = r.getClassicalGrammarApplicationCapabilityNavigator(s),
    binding = r.issueClassicalGrammarTypedSourceOperationBindingFrame(
      nav,
      "nnc:ordinary",
      {
        subject: "3sg",
        animacy: "animate",
        humanness: "human",
        state: "absolutive",
        predicateFormation: "source-stem",
      },
    );
  const a = r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);
  assert.equal(a.authorizationStatus, "authorized", a.blockReason);
  return a.canonicalResult;
}
async function roundtrip(r, value) {
  const recipe = exportClassicalResultReloadRecipe(r, { accepted: value });
  assert(recipe, "complete owner input graph must export");
  const fresh = await runtime();
  const restored = replayClassicalResultReloadRecipe(
    fresh,
    JSON.parse(JSON.stringify(recipe)),
  );
  assert(restored, "complete graph must replay");
  return { fresh, result: restored.accepted, recipe };
}
function group(r, left, right) {
  return execute(r, "clause:composition", {
    operationKind: "conjunction",
    conjuncts: [left, right].map((v, i) =>
      r.buildClassicalNahuatlClauseCompositionSourceFrame(v, {
        referenceId: `remaining-nnc-${i}`,
      }),
    ),
    options: {
      relation: "marked",
      coordinationType: "additive",
      level: "principal",
      polarity: "positive",
      rightwardModifier: "oc",
      modifierAdjunctor: "none",
      sharedModifierScope: "none",
      sharedModifier: "none",
      leftContextAbsent: false,
      adjoinedFunction: "none",
      identicalAdjoinedClauseEllipsis: "none",
      boundaryPunctuation: "none",
    },
  });
}
test("NNC written nucleus and its exact ordered input survive whole conjunction reload", async () => {
  const r = await runtime(),
    left = noun(r, nonce[0]);
  const written = r.writeClassicalNahuatlLesson2Result(
    r.issueClassicalNahuatlLesson2WritingSource({
      parts: [
        { role: "stem", value: nonce[0] },
        { role: "number", value: "tl" },
      ],
      boundaryKind: "typed-nnc-slots",
    }),
  );
  const sentence = execute(r, "nnc:sentence-surface", left.typedSlotFrame, {
    sentenceType: "assertion",
    polarity: "negative",
    negativePrefix: "ay",
    canonicalNuclearWrittenResult: written,
  });
  const whole = group(r, sentence, noun(r, nonce[1]));
  const { fresh, result, recipe } = await roundtrip(r, whole);
  assert.equal(result.surfaceRealization, whole.surfaceRealization);
  assert(JSON.stringify(recipe).includes("nnc:writing"));
  assert(!JSON.stringify(recipe).includes("canonicalNuclearSurface"));
  assert(fresh.isClassicalNahuatlClauseConjunctionResultFrame(result));
});
test("intrinsic interrogative discourse replays through original lexical pronominal parent", async () => {
  const r = await runtime();
  const s = r.buildClassicalNahuatlPronominalNncSourceFrame({
    stem: "tl-eh",
    embedStem: "tl",
    matrixStem: "eh",
  });
  const op = r.buildClassicalNahuatlPronominalNncOperationFrame(s, {
    subject: "3sg",
    clausePosition: "initial",
    adjunctorInMode: "none",
    sentenceType: "statement",
    polarity: "positive",
  });
  const p = execute(r, "nnc:pronominal", s, op);
  const sentence = execute(r, "nnc:sentence-surface", p.typedSlotFrame, {
    sentenceType: "statement",
    polarity: "positive",
    discourseFrame: p.sentenceFrame.discourseFrame,
  });
  const { fresh, result } = await roundtrip(r, sentence);
  assert.equal(result.sentenceSurface, "Tleh?");
  assert.equal(result.discourseFrame.inherentInterrogative, true);
  assert.equal(
    result.sourceNncSlotFrame.pronominalSubtypeDetail,
    sentence.sourceNncSlotFrame.pronominalSubtypeDetail,
  );
  assert.equal(
    fresh.buildClassicalNahuatlNncSentenceSurfaceFrame(result, {
      polarity: "negative",
    }).sentenceSurface,
    "Ahtleh.",
  );
});
test("contextual flawed-subject reload retains exact negative authority and rejects a positive reentry", async () => {
  const r = await runtime();
  const source = r.buildClassicalNahuatlOrdinaryNncSourceFrame({
    stem: "hueli",
    sourceClass: "tl",
  });
  const neg = execute(r, "particle:negative-selection", {
    polarity: "negative",
    sentenceKind: "statement",
  });
  const context = r.issueClassicalNahuatlContextualFlawedSubjectSourceFrame(
    source,
    neg,
  );
  const parent = execute(r, "grammar:nominal-construction", {
    constructionKind: "affective-nnc",
    affectRoute: "flawed-subject",
    subject: "3common",
    state: "absolutive",
    animacy: "unspecified",
    source: {
      embedStem: "hueli",
      embedClass: "tl",
      embedSourceClass: "tl",
      canonicalNncSourceFrame: source,
      contextualFlawedSubjectSourceFrame: context,
    },
  });
  const sentence = execute(
    r,
    "nnc:sentence-surface",
    parent.canonicalResult.nncSlotFrame,
    { polarity: "negative" },
  );
  const { fresh, result } = await roundtrip(r, sentence);
  assert.equal(result.sentenceSurface, "Ahhueli.");
  assert(
    fresh.isClassicalNahuatlContextualFlawedSubjectSourceFrame(
      result.contextualFlawedSubjectSourceFrame,
    ),
  );
  assert.equal(
    fresh.buildClassicalNahuatlNncSentenceSurfaceFrame(result, {
      polarity: "positive",
    }).blockReason,
    "contextual-flawed-subject-negative-assertion-required",
  );
});
test("copied authority and forged ordered-writing recipe fields cannot authorize reload", async () => {
  const r = await runtime();
  const written = r.writeClassicalNahuatlLesson2Result(
    r.issueClassicalNahuatlLesson2WritingSource({
      parts: [{ role: "stem", value: nonce[1] }],
      boundaryKind: "typed-nnc-slots",
    }),
  );
  assert.equal(isNncReloadEvidence(r, { ...written }), false);
  assert.equal(
    exportNncContextReloadNode(r, { ...written }, () => 0),
    undefined,
  );
  const node = exportNncContextReloadNode(r, written, () => 0);
  assert.equal(
    replayNncContextReloadNode(r, { ...node, surface: "forged" }, () => null),
    null,
  );
  assert.equal(
    r.getClassicalNahuatlNncSentenceReloadContext({
      ...noun(r, nonce[0]).sentenceFrame,
    }),
    null,
  );
});
test("relational intrinsic-question discourse keeps parent writing authority after replay", async () => {
  const r = await runtime();
  const parent = execute(r, "nnc:relational", {
    nounstem: {
      kind: "classical-nahuatl-nnc-nounstem-request",
      stemId: "n-locative",
      formation: "option-two",
      operation: "relational-nnc",
      sourceKind: "interrogative-empty",
      sourceFormation: "can-interrogative",
      sourceMode: "embed-matrix",
      sourceStem: "can",
    },
    subjectMode: "adverbialized",
    state: "possessive",
  });
  const current = execute(r, "nnc:sentence-surface", parent.sentenceFrame, {
    polarity: "positive",
  });
  const { fresh, result, recipe } = await roundtrip(r, current);
  assert.equal(result.sentenceSurface, "Cān?");
  assert.equal(result.discourseFrame.inherentInterrogative, true);
  const retainedParent = fresh.captureClassicalGrammarApplicationResult(
    result.sourceNncSlotFrame,
    "relational-reload",
  ).applicationResult.canonicalResult;
  assert.equal(
    result.discourseFrame,
    retainedParent.sentenceFrame.discourseFrame,
  );
  assert.equal(
    result.canonicalNuclearWrittenResult,
    retainedParent.sentenceFrame.canonicalNuclearWrittenResult,
  );
  assert(recipe.nodes.some((n) => n.parentWriting === true));
});
test("relational selected imperfect-source analysis replays from its declared parts", async () => {
  const r = await runtime();
  const selected = r.buildClassicalNahuatlSelectedImperfectPredicateSourceFrame(
    {
      sourceKind: "incorporated-adverb-imperfect-predicate",
      sourceFormation: "imperfect-active",
      sourceVoice: "active",
      incorporatedEmbed: { kind: "nounstem", stem: nonce[0] },
      predicateStem: nonce[1],
      tenseCarrier: "yā",
      initialI: "supportive-omitted",
    },
  );
  const parent = execute(r, "nnc:relational", {
    nounstem: {
      kind: "classical-nahuatl-nnc-nounstem-request",
      stemId: "n-locative",
      formation: "option-two",
      operation: "relational-nnc",
      selectedImperfectPredicateSource: selected,
      sourceKind: "incorporated-adverb-imperfect-predicate",
      sourceFormation: "imperfect-active",
    },
    subjectMode: "adverbialized",
    state: "absolutive",
  });
  const current = execute(r, "nnc:sentence-surface", parent.sentenceFrame, {});
  const { result } = await roundtrip(r, current);
  assert.equal(result.sentenceSurface, parent.sentenceFrame.sentenceSurface);
});

export function makeDirectNounSentences(r) {
  const possessive=r.buildClassicalNahuatlPossessiveNncFrame("chīmal",{
    subject:"3sg",possessor:"1sg",singularConnector:"0",nounstemRelationKind:"nonrelational",animacy:"nonanimate",
  });
  const absolutive=r.buildClassicalNahuatlAbsolutiveNncFrame("pil",{
    subject:"3sg",nounClass:"tli",animacy:"animate",humanness:"human",
  });
  return [possessive,absolutive].map((parent,index)=>({slot:parent.nncSlotFrame,
    result:execute(r,"nnc:sentence-surface",parent.nncSlotFrame,{
      sentenceType:"assertion",polarity:index ? "negative" : "positive",
    }),
  }));
}

test("direct noun sentences restore the chosen state and exact nucleus",async()=>{
  const r=await runtime(),fresh=await runtime();
  for(const {slot,result} of makeDirectNounSentences(r)){
    const recipe=exportClassicalResultReloadRecipe(r,{result,slot});
    assert.ok(recipe,result.sentenceSurface);
    const roots=replayClassicalResultReloadRecipe(fresh,recipe);
    assert.ok(roots);
    assert.ok(roots.result.sourceNncSlotFrame===roots.slot);
    assert.equal(roots.result.sentenceSurface,result.sentenceSurface);
    assert.equal(roots.result.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
    assert.deepEqual(roots.slot.slots,slot.slots);
  }
});

export function makeLayeredNounSentence(r) {
  const host=makeDirectNounSentences(r)[0].result;
  const result=execute(r,"sentence:adverbial-adjunction",{
    nuclearResultFrame:host,particleSourceFrame:r.buildClassicalNahuatlParticleSourceFrame("l3-no-adverbial"),
  });
  return {host,result};
}

test("a particle layer retains the direct noun sentence it modifies",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {host,result}=makeLayeredNounSentence(r);
  const roots=replayClassicalResultReloadRecipe(fresh,exportClassicalResultReloadRecipe(r,{result,host}));
  assert.ok(roots);
  assert.ok(roots.result.canonicalInputFrame===roots.host);
  assert.equal(roots.result.sentenceSurfaceDisplay,result.sentenceSurfaceDisplay);
  assert.equal(roots.result.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
});

export function makeTypedPossessiveSentence(r) {
  const source=r.buildClassicalNahuatlNncSourceAuthorityFrame("chīmal",{
    selectedState:"possessive",naturalPossessionPolicy:"naturally-possessed",naturalPossessionSemantics:"property",
  });
  const parent=r.buildClassicalNahuatlPossessiveNncFrame("chīmal",{
    nncSourceAuthorityFrame:source,subject:"3sg",possessor:"2sg",singularConnector:"0",
    nounstemRelationKind:"nonrelational",animacy:"nonanimate",
  });
  return {source,slot:parent.nncSlotFrame,result:execute(r,"nnc:sentence-surface",parent.nncSlotFrame,{
    sentenceType:"assertion",polarity:"positive",
  })};
}

test("a noun sentence link restores its explicitly selected possession policy",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {source,slot,result}=makeTypedPossessiveSentence(r);
  const recipe=exportClassicalResultReloadRecipe(r,{result,source,slot});
  assert.ok(recipe,result.sentenceSurface);
  const roots=replayClassicalResultReloadRecipe(fresh,recipe);
  assert.ok(roots);
  assert.equal(roots.result.sentenceSurface,result.sentenceSurface);
  assert.equal(roots.result.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
  assert.equal(roots.source.naturalPossessionSemantics,"property");
  assert.deepEqual(roots.source.allowedStateValues,["possessive"]);
  assert.ok(fresh.getClassicalNahuatlDirectNncSlotReloadInputs(roots.slot).options.nncSourceAuthorityFrame===roots.source);
});

export function makeLesson15Sentence(r) {
  const stem="tah";
  const operation=r.buildClassicalNahuatlStemOperationRecord(stem,{
    operation:"secondary-general-use",targetStem:"tē-tah",secondaryPossessorCarrier:"tē",
    selectionAuthority:"user-supplied-lexical-analysis",
  });
  const reduplication=r.buildClassicalNahuatlPossessorReduplicationSelection(stem,{
    selected:true,selectionAuthority:"user-selection",
  });
  const source=r.buildClassicalNahuatlNncSourceAuthorityFrame(stem,{
    selectedState:"possessive",lesson15StemOperationRecord:operation,lesson15PossessorReduplicationSelection:reduplication,
  });
  const parent=r.buildClassicalNahuatlPossessiveNncFrame(stem,{
    nncSourceAuthorityFrame:source,subject:"3sg",possessor:"2sg",singularConnector:"0",
    nounstemRelationKind:"nonrelational",animacy:"animate",
  });
  return {source,operation,reduplication,result:execute(r,"nnc:sentence-surface",parent.nncSlotFrame,{
    sentenceType:"assertion",polarity:"positive",
  })};
}

test("Lesson 15 stem operation and reduplication both survive a noun sentence link",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {source,operation,reduplication,result}=makeLesson15Sentence(r);
  const recipe=exportClassicalResultReloadRecipe(r,{result,source,operation,reduplication});
  assert.ok(recipe,result.sentenceSurface);
  const roots=replayClassicalResultReloadRecipe(fresh,recipe);
  assert.ok(roots);
  assert.equal(roots.result.sentenceSurface,result.sentenceSurface);
  assert.equal(roots.result.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
  assert.deepEqual(roots.source.lesson15StemOperationRecord,source.lesson15StemOperationRecord);
  assert.deepEqual(roots.source.lesson15PossessorReduplicationSelection,source.lesson15PossessorReduplicationSelection);
  const reloaded=fresh.getClassicalNahuatlNncSourceAuthorityReloadInputs(roots.source);
  assert.ok(reloaded.stemOperation===roots.operation);
  assert.ok(reloaded.reduplication===roots.reduplication);
  const forged=structuredClone(recipe);
  const node=forged.nodes.find(entry=>entry.type==="nnc:source-authority");
  node.stemOperation=node.reduplication;
  assert.equal(replayClassicalResultReloadRecipe(fresh,forged),null);
});

export function makeClassGovernedSentence(r) {
  const stem="tah";
  const operation=r.buildClassicalNahuatlStemOperationRecord(stem,{
    operation:"secondary-general-use",targetStem:"tē-tah",secondaryPossessorCarrier:"tē",
    selectionAuthority:"user-supplied-lexical-analysis",
  });
  const source=r.buildClassicalNahuatlNncSourceAuthorityFrame(stem,{
    selectedState:"possessive",lesson15StemOperationRecord:operation,
  });
  const lower=r.buildClassicalNahuatlClassGovernedNncFrame(stem,{
    state:"possessive",subject:"3sg",possessor:"3pl",thirdPluralPossessorNumberMorph:"n",nounClass:"tli",
    classSelectionAuthority:"user-selection",tliSubclass:"1",nncSourceAuthorityFrame:source,
  });
  const higher=r.buildClassicalNahuatlHigherNncFrame(lower);
  const result=execute(r,"nnc:sentence-surface",higher.nncSlotFrame,{sentenceType:"assertion",polarity:"positive"});
  assert.equal(result.sentenceSurface,"Īntētah.");
  return {lower,higher,result};
}

test("a class-governed sentence link reissues the lower class and higher stem operation",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {lower,higher,result}=makeClassGovernedSentence(r);
  const recipe=exportClassicalResultReloadRecipe(r,{result,lowerSlot:lower.nncSlotFrame});
  assert.ok(recipe,result.sentenceSurface);
  const reopened=replayClassicalResultReloadRecipe(fresh,recipe);
  assert.ok(reopened);
  assert.equal(reopened.result.sentenceSurface,result.sentenceSurface);
  assert.equal(reopened.result.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
  assert.deepEqual(reopened.result.sourceNncSlotFrame.slots,higher.nncSlotFrame.slots);
  assert.ok(fresh.getClassicalNahuatlClassGovernedReloadInputs(reopened.result.sourceNncSlotFrame).parent.nncSlotFrame===reopened.lowerSlot);
});

export function makeLexicalPluralSentence(r) {
  const stem="tōch", plural={nounClass:"tli",stemFormation:"affinity",pluralConnector:"m-eh"};
  const lexical=r.buildClassicalNahuatlLexicalSelectionRecord(stem,{
    ...plural,selectionAuthority:"external-lexical-record",classMembershipOptions:["in","tli"],
    pluralStemFormationOptions:["plain","affinity"],pluralStemFormationRequirement:"allowed",
    preferredPluralStemFormation:"affinity",pluralConnectorOptions:["t-in","m-eh"],
    preferredPluralConnector:"t-in",affinityConnectorExceptionAuthorized:true,
  });
  const noun=r.buildClassicalNahuatlClassGovernedNncFrame(stem,{
    ...plural,state:"absolutive",subject:"3pl",animacy:"animate",classSelectionAuthority:"external-lexical-record",
    pluralSelectionAuthority:"external-lexical-record",lesson14LexicalSelectionRecord:lexical,
  });
  const result=execute(r,"nnc:sentence-surface",noun.nncSlotFrame,{sentenceType:"assertion",polarity:"positive"});
  assert.equal(result.sentenceSurface,"Tōtōchmeh.");
  return {lexical,noun,result};
}

test("a lexical plural link retains the selected form and its eligible alternatives",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {lexical,noun,result}=makeLexicalPluralSentence(r);
  const recipe=exportClassicalResultReloadRecipe(r,{result,lexical,noun});
  assert.ok(recipe,result.sentenceSurface);
  const reopened=replayClassicalResultReloadRecipe(fresh,recipe);
  assert.ok(reopened);
  assert.equal(reopened.result.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
  assert.equal(reopened.result.sentenceSurface,result.sentenceSurface);
  assert.deepEqual(reopened.lexical,lexical);
  const inputs=fresh.getClassicalNahuatlClassGovernedReloadInputs(reopened.noun);
  assert.ok(inputs.options.lesson14LexicalSelectionRecord===reopened.lexical);
  assert.ok(reopened.result.sourceNncSlotFrame===reopened.noun.nncSlotFrame);
  const forged=structuredClone(recipe);
  forged.nodes.find(node=>node.type==="nnc:lexical-selection-record").stem="cal";
  assert.equal(replayClassicalResultReloadRecipe(fresh,forged),null);
});

export function makeYoCompoundSentence(r) {
  const noun=r.buildClassicalNahuatlClassGovernedNncFrame("cal-yō",{
    state:"possessive",subject:"3sg",possessor:"1sg",nounClass:"tl",tlSubclass:"1B",
    classSelectionAuthority:"user-selection",sourceStructure:"compound",compoundSourceConstituents:["cal","yō"],
  });
  const result=execute(r,"nnc:sentence-surface",noun.nncSlotFrame,{sentenceType:"assertion",polarity:"positive"});
  assert.equal(result.sentenceSurface,"Nocalyo.");
  return {noun,result};
}

test("a possessive yō compound link preserves both constituents and the shortened matrix",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {noun,result}=makeYoCompoundSentence(r);
  const recipe=exportClassicalResultReloadRecipe(r,{result,noun});
  assert.ok(recipe,result.sentenceSurface);
  const reopened=replayClassicalResultReloadRecipe(fresh,recipe);
  assert.ok(reopened);
  assert.equal(reopened.result.sentenceSurface,result.sentenceSurface);
  assert.equal(reopened.result.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
  assert.deepEqual(reopened.noun.sourceFrame,noun.sourceFrame);
  assert.equal(reopened.result.sourceNncSlotFrame,reopened.noun.nncSlotFrame);
  assert.deepEqual(fresh.getClassicalNahuatlClassGovernedReloadInputs(reopened.noun).options.compoundSourceConstituents,["cal","yō"]);
});

export function makeConstituentChoiceSentence(r, selection="alternative-typed-slots") {
  const options={state:"possessive",subject:"3common",possessor:"1sg",nounClass:"zero",
    classSelectionAuthority:"user-selection",constituentAmbiguityKind:"front-o",constituentAlternativeStem:"mī",
    selectedConstituentAnalysisId:selection,constituentAnalysisSelectionAuthority:"user-selection"};
  const original=r.buildClassicalNahuatlClassGovernedNncFrame("omi",options);
  const noun=r.buildClassicalNahuatlClassGovernedNncFrame("omi",{...options,constituentAnalyses:original.ambiguityFrame.analyses});
  return {noun,result:execute(r,"nnc:sentence-surface",noun.nncSlotFrame,{sentenceType:"assertion",polarity:"positive"})};
}

test("explicit constituent alternatives and the chosen boundary survive the link",async()=>{
  const r=await runtime(),fresh=await runtime();
  for(const selection of ["current-typed-slots","alternative-typed-slots"]){
    const {noun,result}=makeConstituentChoiceSentence(r,selection);
    const recipe=exportClassicalResultReloadRecipe(r,{result,noun});
    assert.ok(recipe,result.sentenceSurface);
    const reopened=replayClassicalResultReloadRecipe(fresh,recipe);
    assert.ok(reopened);
    assert.equal(reopened.result.sentenceSurface,result.sentenceSurface);
    assert.equal(reopened.result.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
    assert.deepEqual(reopened.noun.ambiguityFrame,noun.ambiguityFrame);
    assert.ok(reopened.result.sourceNncSlotFrame===reopened.noun.nncSlotFrame);
  }
});

export function makeOrdinaryCompoundSentence(r) {
  const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:"tle-māi",embedStem:"tle",matrixStem:"māi"});
  const operation=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{
    state:"absolutive",subject:"3common",predicateFormation:"yo-matrix",
  });
  const noun=execute(r,"nnc:ordinary",source,operation);
  const result=execute(r,"nnc:sentence-surface",noun.typedSlotFrame,{sentenceType:"assertion",polarity:"positive"});
  assert.equal(result.sentenceSurface,"Tlemāyōtl.");
  return {source,noun,result};
}

test("ordinary compound noun links preserve their licensed embed and matrix",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {source,noun,result}=makeOrdinaryCompoundSentence(r);
  const recipe=exportClassicalResultReloadRecipe(r,{result,noun,source});
  assert.ok(recipe,result.sentenceSurface);
  const reopened=replayClassicalResultReloadRecipe(fresh,recipe);
  assert.ok(reopened);
  assert.deepEqual(reopened.noun.sourceFrame.sourceConstituents,source.sourceConstituents);
  assert.ok(reopened.noun.sourceFrame===reopened.source);
  assert.ok(reopened.result.sourceNncSlotFrame===reopened.noun.typedSlotFrame);
  assert.equal(reopened.result.sentenceSurface,result.sentenceSurface);
  assert.equal(reopened.result.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
  const altered=structuredClone(recipe);
  altered.nodes.find(node=>node.type==="nnc:source").source.matrixStem="mā";
  assert.equal(replayClassicalResultReloadRecipe(fresh,altered),null);
});

export function makeGeneralUseNounSentence(r) {
  const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:"noh-mah",sourceUse:"general-use"});
  const operation=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{
    state:"possessive",subject:"3common",possessor:"1sg",singularConnector:"silent",
  });
  const noun=execute(r,"nnc:ordinary",source,operation);
  const result=execute(r,"nnc:sentence-surface",noun.typedSlotFrame,{sentenceType:"assertion",polarity:"positive"});
  return {noun,result};
}

test("general-use noun links preserve their source scope and recover earlier links",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {noun,result}=makeGeneralUseNounSentence(r);
  const recipe=exportClassicalResultReloadRecipe(r,{result,noun});
  assert.ok(recipe);
  const node=recipe.nodes.find(node=>node.type==="nnc:ordinary");
  assert.equal(node.source.sourceUse,"general-use");
  const legacy=structuredClone(recipe);
  delete legacy.nodes.find(node=>node.type==="nnc:ordinary").source.sourceUse;
  for(const input of [recipe,legacy]){
    const reopened=replayClassicalResultReloadRecipe(fresh,input);
    assert.ok(reopened);
    assert.equal(reopened.noun.sourceFrame.generalUseOnly,true);
    assert.equal(reopened.noun.sourceFrame.selectedUseScope,noun.sourceFrame.selectedUseScope);
    assert.equal(reopened.result.sentenceSurface,result.sentenceSurface);
    assert.equal(reopened.result.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
    assert.ok(reopened.result.sourceNncSlotFrame===reopened.noun.typedSlotFrame);
  }
});

test("the shared link check verifies an adverbial with an ordinary compound noun parent", async () => {
  const r = await runtime(), fresh = await runtime();
  const {default: fixtures} = await import("./helpers/classical_lesson44_nominal_fixture_sources.js");
  const fixture = fixtures.createNominalFixtureSource(r, "44.6-ixtlapal");
  const result = r.requestClassicalAdverbialNncResult({adverbialPotentialFrame: fixture.potential});
  assert.equal(result.authorizationStatus, "authorized");
  const project = (_runtime, value) => ({
    surface: value.sentenceSurface || value.wordSurface,
    analysis: value.formulaRealization,
    source: value.adverbialPotentialFrame?.canonicalSourceResult?.sourceFrame?.sourceConstituents,
  });
  assert.ok(project(r, result).surface);
  assert.ok(project(r, result).analysis);
  const check = inspectClassicalResultLink(r, result, project, fresh);
  assert.equal(check.status, "verified");
  const legacy = structuredClone(check.recipe);
  delete legacy.nodes.at(-1).degree;
  assert.deepEqual(project(fresh, replayClassicalResultReloadRecipe(fresh, legacy).result), project(r, result));
  const changedAnalysis = (runtime, value) => ({
    ...project(runtime, value),
    analysis: runtime === fresh ? "different analysis" : value.formulaRealization,
  });
  assert.equal(inspectClassicalResultLink(r, result, changedAnalysis, fresh).status, "changed-analysis");
});

test("primitive adverbial links preserve the exact initial and possessor choices", async () => {
  const r = await runtime(), fresh = await runtime();
  for (const possessor of ["1sg", "2sg"]) {
    const adverbialPotentialFrame = r.buildClassicalNahuatlPrimitiveAdverbialPotentialFrame({
      predicateKind: "active-action", sourceStem: "iyo-ā", verbClass: "C",
      sourceValence: "intransitive", sourceInitialISelection: "supportive", possessor,
    });
    const result = r.requestClassicalAdverbialNncResult({adverbialPotentialFrame});
    assert.equal(result.authorizationStatus, "authorized");
    const project = (_runtime, value) => ({
      surface: value.wordSurface,
      analysis: value.formulaRealization,
      source: value.adverbialPotentialFrame.primitiveAdverbialSourceFrame.nominalPredicateSourceFrame.possessor,
    });
    assert.equal(project(r, result).source, possessor);
    assert.ok(project(r, result).analysis);
    assert.equal(inspectClassicalResultLink(r, result, project, fresh).status, "verified");
  }
});

test("incorporated adverbial links keep the selected degree and both exact parents", async () => {
  const r = await runtime(), fresh = await runtime();
  const typed = r.issueCanonicalNncSourceFrame({stem:"achi", sourceClass:"zero"});
  const navigator = r.getClassicalGrammarApplicationCapabilityNavigator(typed);
  const binding = r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator, "nnc:ordinary", {});
  const source = r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding).canonicalResult;
  const matrix = r.requestClassicalVncApplicationResult({
    sourceStem:"chōca", verbClass:"A", sourceValence:"intransitive",
    subject:"3sg", mood:"indicative", tense:"present", requestedVoice:"active",
  });
  const result = execute(r, "nnc:adverbial", {
    canonicalSourceResult:source, canonicalMatrixResult:matrix,
    scope:"incorporated-predicate", degree:"second-degree",
  });
  const recipe = exportClassicalResultReloadRecipe(r, {result, source, matrix});
  assert.ok(recipe);
  const reopened = replayClassicalResultReloadRecipe(fresh, recipe);
  assert.ok(reopened);
  assert.equal(reopened.result.canonicalSourceResult, reopened.source);
  assert.equal(reopened.result.canonicalMatrixResult, reopened.matrix);
  assert.equal(reopened.result.operationFrame.degree, result.operationFrame.degree);
  assert.equal(reopened.result.formulaRealization, result.formulaRealization);
  assert.equal(reopened.result.wordSurface, result.wordSurface);
  const invalid = structuredClone(recipe);
  invalid.nodes.at(-1).matrix = invalid.roots.result;
  assert.equal(replayClassicalResultReloadRecipe(fresh, invalid), null);
});

test("typed impersonal links keep the chosen voice on each accepted verb", async () => {
  const r = await runtime(), fresh = await runtime();
  for (const [sourceStem, verbClass, tense] of [
    ["nemi", "B", "present"], ["temō", "A", "preterit"], ["chōca", "A", "present"],
  ]) {
    const source = r.requestClassicalVncApplicationResult({
      sourceStem, verbClass, tense, sourceValence:"intransitive", subject:"3sg", mood:"indicative",
    }).resultFrame.sourceMachineryFrame;
    for (const nonactiveOptionId of ["inherent-impersonal", "tla-impersonal"]) {
      const binding = r.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(source, {
        requestedDerivation:"direct", requestedVoice:"impersonal", nonactiveOptionId, tense,
      });
      assert.equal(binding.bindingStatus, "ready", binding.blockReason);
      const result = execute(r, "vnc:application", binding);
      const recipe = exportClassicalResultReloadRecipe(r, {result});
      assert.equal(recipe.nodes.at(-1).recipe.steps.at(-1).request.nonactiveOptionId, nonactiveOptionId);
      const restored = replayClassicalResultReloadRecipe(fresh, recipe)?.result;
      assert.ok(restored, sourceStem + " " + nonactiveOptionId);
      assert.equal(restored.resultFrame.surfaceRealization, result.resultFrame.surfaceRealization);
      assert.equal(restored.resultFrame.formulaRealization, result.resultFrame.formulaRealization);
      assert.equal(restored.resultFrame.selectedVoice, result.resultFrame.selectedVoice);
      const legacy = structuredClone(recipe);
      const step = legacy.nodes.at(-1).recipe.steps.at(-1);
      const { requestedDerivation, requestedVoice, subject, mood, tense: selectedTense } = binding.effectiveSelections;
      step.operationId = "vnc:typed-impersonal";
      step.request = { requestedDerivation, requestedVoice, nonactiveOptionId, subject, mood, tense:selectedTense };
      const previous = replayClassicalResultReloadRecipe(fresh, legacy)?.result;
      assert.equal(previous?.resultFrame.formulaRealization, result.resultFrame.formulaRealization);
    }
  }
});

test("a typed causative probe with an unavailable voice returns a rejected choice", async () => {
  const r = await runtime();
  const root = r.requestClassicalVncApplicationResult({
    sourceStem:"yohua", verbClass:"A", sourceValence:"intransitive",
    subject:"1sg", mood:"indicative", tense:"present", requestedVoice:"impersonal",
    nonactiveOptionId:"inherent-impersonal",
  });
  const source = root.resultFrame.sourceMachineryFrame;
  const binding = r.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(source, {
    requestedDerivation:"causative", derivationOptionId:"causative:type-one:final-a-replacement:yohua",
  });
  assert.ok(r.isClassicalNahuatlVncTypedSourceApplicationBindingFrame(binding));
  assert.equal(binding.bindingStatus, "rejected");
  assert.equal(binding.blockReason, "classical-vnc-typed-source-application-target-voice-not-authorized");
  assert.deepEqual(binding.executionArgs, []);
});

test("a verbal sentence reopens with the exact finite Result shared in its graph", async () => {
  const r = await runtime(), fresh = await runtime();
  const finite = execute(r, "vnc:application", {
    sourceStem:"nemi", verbClass:"B", sourceValence:"intransitive", subject:"3sg", tense:"present", mood:"indicative",
  });
  const result = execute(r, "vnc:sentence-result", finite);
  const recipe = exportClassicalResultReloadRecipe(r, {result, finite});
  assert.equal(recipe.nodes.length, 2);
  const reopened = replayClassicalResultReloadRecipe(fresh, recipe);
  assert.equal(reopened.result.vncApplicationFrame, reopened.finite);
  assert.equal(reopened.result.sentenceSurface, result.sentenceSurface);
  assert.equal(reopened.result.sentenceFormulaDisplay, result.sentenceFormulaDisplay);
  const oldRecipe = { ...recipe, roots:{result:0},
    nodes:[{type:"vnc", recipe:r.exportClassicalNahuatlVncApplicationRecipe(result)}] };
  const oldResult = replayClassicalResultReloadRecipe(fresh, oldRecipe)?.result;
  assert.equal(oldResult.sentenceSurface, result.sentenceSurface);
  assert.equal(oldResult.sentenceFormulaDisplay, result.sentenceFormulaDisplay);
});

test("a typed verbal sentence reopens without an extra grammar operation", async () => {
  const r = await runtime(), fresh = await runtime();
  const base = execute(r, "vnc:application", {
    sourceStem:"nemi", verbClass:"B", sourceValence:"intransitive", subject:"3sg", tense:"present", mood:"indicative",
  });
  const binding = r.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
    base.resultFrame.sourceMachineryFrame, {requestedDerivation:"direct", subject:"1pl"},
  );
  const finite = execute(r, "vnc:application", binding);
  const sentence = execute(r, "vnc:sentence-result", finite);
  const recipe = exportClassicalResultReloadRecipe(r, {result:sentence, finite});
  const reopened = replayClassicalResultReloadRecipe(fresh, recipe);
  assert.equal(reopened.result.vncApplicationFrame, reopened.finite);
  assert.equal(reopened.result.sentenceFormulaDisplay, sentence.sentenceFormulaDisplay);
  const operations = (runtime, result) => runtime.getClassicalGrammarApplicationLayerGraph(result)
    .nodes.map(node => [node.operationId, node.depth]);
  assert.deepEqual(operations(fresh, reopened.result), operations(r, sentence));
  const invalid = structuredClone(recipe);
  invalid.nodes[0].recipe.steps.at(-1).request.formulaRealization = "forged";
  assert.equal(replayClassicalResultReloadRecipe(fresh, invalid), null);
});

test("link publication detects a missing grammar chain even when the form and formula match", async () => {
  const r = await runtime(), fresh = await runtime();
  const finite = execute(r, "vnc:application", {
    sourceStem:"nemi", verbClass:"B", sourceValence:"intransitive", subject:"3sg", tense:"present", mood:"indicative",
  });
  const sentence = execute(r, "vnc:sentence-result", finite);
  const project = (_runtime, result) => ({
    form:result.sentenceSurface, formula:result.sentenceFormulaDisplay,
  });
  const ordinary = inspectClassicalResultLink(r, sentence, project, fresh);
  assert.equal(ordinary.status, "verified");
  assert.equal(ordinary.checkedOwnerGraph, true);
  const missingGraph = Object.create(fresh);
  Object.defineProperty(missingGraph, "getClassicalGrammarApplicationLayerGraph", {value:() => null});
  assert.equal(inspectClassicalResultLink(r, sentence, project, missingGraph).status, "changed-owner-graph");
});
