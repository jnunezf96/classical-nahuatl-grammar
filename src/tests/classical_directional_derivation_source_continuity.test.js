"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_directional_derivation_source_continuity");

    s.eq(
        "Only the finalized c-0 + on environment realizes a supportive subject carrier with o",
        typeof ctx.getClassicalNahuatlVncDirectionalSubjectCarrierRealization === "function"
            ? {
                exactEnvironment: ctx.getClassicalNahuatlVncDirectionalSubjectCarrierRealization({
                    slots: {
                        prePredicate: [
                            { kind: "dyadic-valence", va1: "c", va2: "0", carrier: "c-0" },
                            { kind: "directional", carrier: "on" },
                        ],
                    },
                }, "ni"),
                missingDirectional: ctx.getClassicalNahuatlVncDirectionalSubjectCarrierRealization({
                    slots: {
                        prePredicate: [{ kind: "dyadic-valence", va1: "c", va2: "0", carrier: "c-0" }],
                    },
                }, "ni"),
                wrongValence: ctx.getClassicalNahuatlVncDirectionalSubjectCarrierRealization({
                    slots: {
                        prePredicate: [
                            { kind: "dyadic-valence", va1: "qu", va2: "0", carrier: "qu-0" },
                            { kind: "directional", carrier: "on" },
                        ],
                    },
                }, "ni"),
            }
            : null,
        {
            exactEnvironment: "no",
            missingDirectional: "",
            wrongValence: "",
        }
    );

    s.ok(
        "Applicative source continuity retains its selected formation and passive Voice after Directional on",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const base = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "xeloa",
                    sourceTransitivity: "transitive",
                    verbClass: "C",
                    valence: "specific-projective",
                    subject: "1sg",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    derivationType: "applicative",
                    applicativeObjectKind: "specific-projective",
                    applicativeObjectPerson: "3sg",
                    mood: "indicative",
                    tense: "preterit",
                    construction: "none",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                };
                const preview = ctx.buildClassicalRuleLogicSurfaceFrame(base);
                const derivationOptionId = preview.state?.derivationOptionInventory?.options?.find(
                    (candidate) => candidate.targetStem === "xel-huiā"
                )?.optionId || "";
                const directional = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    derivationOptionId,
                    vncVoice: "passive",
                    directionalPrefix: "on",
                });
                const controlFrame = directional.state?.vncApplicationFrame?.controlFrame || {};
                return Boolean(
                    derivationOptionId
                    && directional.authorizationStatus === "authorized"
                    && controlFrame.derivationOptionInventory?.authorizationStatus === "authorized"
                    && controlFrame.derivationOptionInventory?.options?.some((candidate) => candidate.optionId === derivationOptionId)
                    && controlFrame.selectedDerivationOptionId === derivationOptionId
                    && controlFrame.selectedVoice === "passive"
                    && controlFrame.allowedVoices?.includes("passive")
                    && directional.state?.vncApplicationFrame?.resultFrame?.selectedMachineryFrame?.voice === "passive"
                );
            })()
            : false
    );

    return s;
}

module.exports = { run };
