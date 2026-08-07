"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_semantic_derivation_environment_continuity");

    s.ok(
        "A Lesson 11 distant-past-as-past source retains all three tense axes through Causative derivation",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const base = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "nemi",
                    sourceTransitivity: "intransitive",
                    verbClass: "B",
                    valence: "intransitive",
                    subject: "1pl",
                    derivationType: "causative",
                    mood: "indicative",
                    tense: "general-past",
                    construction: "none",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                };
                const preview = ctx.buildClassicalRuleLogicSurfaceFrame(base);
                const derivationOptionId = preview.state?.derivationOptionInventory?.options?.find(
                    (candidate) => candidate.targetStem === "nen-tiā"
                )?.optionId || "";
                const derived = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    derivationOptionId,
                });
                const applicationFrame = derived.state?.vncApplicationFrame || {};
                const selectedMachinery = applicationFrame.resultFrame?.selectedMachineryFrame || {};
                return Boolean(
                    derivationOptionId
                    && derived.authorizationStatus === "authorized"
                    && applicationFrame.normalizedRequest?.tense === "distant-past-as-past"
                    && selectedMachinery.sourceSemanticEnvironment?.tense === "general-past"
                    && selectedMachinery.sourceSemanticEnvironment?.paradigmTense === "distant-past-as-past"
                    && selectedMachinery.sourceSemanticEnvironment?.semanticTenseValue === "general-past"
                    && selectedMachinery.targetMorphologicalEnvironment?.tense === "distant-past"
                    && applicationFrame.controlFrame?.selectedDerivationOptionId === derivationOptionId
                );
            })()
            : false
    );

    return s;
}

module.exports = { run };
