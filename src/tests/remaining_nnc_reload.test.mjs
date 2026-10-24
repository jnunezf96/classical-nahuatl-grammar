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
