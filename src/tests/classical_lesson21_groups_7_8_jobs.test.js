"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson21_groups_7_8_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson21-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson21-passive-mood-sentence-composition",
        "lesson21-active-reflexive-contextual-passive-reading",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const shellSource = fs.readFileSync(
        path.join(ROOT, "src/ui/shell/classical_shell.mjs"),
        "utf8",
    );
    const renderingSource = fs.readFileSync(
        path.join(ROOT, "src/ui/rendering/rendering.mjs"),
        "utf8",
    );
    const passive = (mood, tense, sentence = {}) => (
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: "chihua",
            verbClass: "B",
            sourceValence: "specific-projective",
            objectPerson: "3sg",
            subject: "3sg",
            requestedDerivation: "direct",
            requestedVoice: "passive",
            mood,
            tense,
            ...sentence,
        })
    );
    const activeReflexive = (lexicalReading = "") => (
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: "chīhua",
            verbClass: "B",
            sourceValence: "mainline-reflexive",
            objectInterpretation: "reflexive",
            subject: "3sg",
            requestedDerivation: "direct",
            requestedVoice: "active",
            mood: "indicative",
            tense: "future",
            lexicalReading,
        })
    );
    const compactReading = (frame) => ({
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        grammaticalVoice: frame.grammaticalVoice,
        reflexiveMorphologyPreserved: frame.reflexiveMorphologyPreserved,
        subjectAnimacy: frame.subjectAnimacy,
        subjectReference: frame.subjectReference,
        subjectSemanticRole: frame.subjectSemanticRole,
        availableReadings: frame.availableReadings,
        selectedReading: frame.selectedReading,
        readingSelectionRequired: frame.readingSelectionRequired,
        readingSelectionIsUserChoice: frame.readingSelectionIsUserChoice,
        animacyFactIsUserChoice: frame.animacyFactIsUserChoice,
        animatePatientWarning: frame.animatePatientWarning,
        changesFiniteMorphology: frame.changesFiniteMorphology,
        formulaRealization: frame.formulaRealization,
        surfaceRealization: frame.surfaceRealization,
        canonical: ctx.isClassicalNahuatlActiveReflexiveContextualPassiveReadingFrame(
            frame,
        ),
    });
    const assertion = passive("indicative", "present");
    const wish = passive("optative", "nonpast", {
        introductoryParticle: "mā",
    });
    const admonition = passive("admonitive", "nonpast", {
        introductoryParticle: "mā",
        introductoryModifier: "nēn",
    });
    const active = activeReflexive();
    const activeWithReading = activeReflexive("contextual-passive");
    const contextual = ctx.interpretClassicalNahuatlActiveReflexiveContextualPassiveReading(
        active,
        {
            subjectAnimacy: "nonanimate",
            subjectReference: "specific",
            requestedReading: "contextual-passive",
        },
    );
    const literal = ctx.interpretClassicalNahuatlActiveReflexiveContextualPassiveReading(
        active,
        {
            subjectAnimacy: "nonanimate",
            subjectReference: "specific",
            requestedReading: "literal-reflexive",
        },
    );
    const animateInventory = ctx.interpretClassicalNahuatlActiveReflexiveContextualPassiveReading(
        active,
        {
            subjectAnimacy: "animate",
            subjectReference: "generic",
        },
    );
    const observations = {
        "lesson21-passive-mood-sentence-composition": {
            assertion: {
                voice: assertion.resultFrame?.selectedVoice,
                stem: assertion.resultFrame?.selectedMachineryFrame?.stem,
                formula: assertion.resultFrame?.formulaRealization,
                surface: assertion.resultFrame?.surfaceRealization,
            },
            wish: {
                voice: wish.resultFrame?.selectedVoice,
                stem: wish.resultFrame?.selectedMachineryFrame?.stem,
                formula: wish.resultFrame?.formulaRealization,
                surface: wish.resultFrame?.surfaceRealization,
            },
            admonition: {
                voice: admonition.resultFrame?.selectedVoice,
                stem: admonition.resultFrame?.selectedMachineryFrame?.stem,
                formula: admonition.resultFrame?.formulaRealization,
                surface: admonition.resultFrame?.surfaceRealization,
            },
            cue: ctx.getClassicalFormulaDerivedAnnotations(
                wish.resultFrame?.formulaRealization || "",
                null,
                wish.resultFrame?.selectedMachineryFrame || null,
            ).find((entry) => (
                entry.role === "passive-mood-sentence-composition"
            )),
        },
        "lesson21-active-reflexive-contextual-passive-reading": {
            activeResult: {
                voice: active.resultFrame?.selectedVoice,
                formula: active.resultFrame?.formulaRealization,
                surface: active.resultFrame?.surfaceRealization,
            },
            contextual: compactReading(contextual),
            literal: compactReading(literal),
            animateInventory: compactReading(animateInventory),
            readingChoiceDoesNotChangeGrammar: {
                requested: activeWithReading.normalizedRequest?.sentenceOptions
                    ?.lexicalReading,
                voice: activeWithReading.resultFrame?.selectedVoice,
                formula: activeWithReading.resultFrame?.formulaRealization,
                sameFormula: activeWithReading.resultFrame?.formulaRealization
                    === active.resultFrame?.formulaRealization,
            },
            genuineChoiceControl: {
                literalOption: shellSource.includes(
                    '<option value="literal-reflexive">literal reflexive</option>',
                ),
                contextualOption: shellSource.includes(
                    '<option value="contextual-passive">contextual passive</option>',
                ),
                activeReflexiveGate: renderingSource.includes(
                    'canvas-lesson21-active-reflexive-contextual-reading-choice',
                ),
                hiddenWithoutChoice: renderingSource.includes(
                    'no-genuine-lexical-or-contextual-reading-choice',
                ),
            },
            cue: ctx.getClassicalFormulaDerivedAnnotations(
                active.resultFrame?.formulaRealization || "",
                null,
                active.resultFrame?.selectedMachineryFrame || null,
            ).find((entry) => (
                entry.role === "active-reflexive-contextual-passive-reading"
            )),
        },
    };
    const expected = {
        "lesson21-passive-mood-sentence-composition": {
            assertion: {
                voice: "passive",
                stem: "chihua-lō",
                formula: "#0-0(chihua-lo)0+0-0#",
                surface: "chihualo",
            },
            wish: {
                voice: "passive",
                stem: "chihua-lō",
                formula: "#0-0(chihua-lo)0+⎕-0#",
                surface: "chihualo",
            },
            admonition: {
                voice: "passive",
                stem: "chīhua-lō",
                formula: "#0-0(chīhua-lo)h+⎕-0#",
                surface: "chīhualoh",
            },
            cue: {
                start: 15,
                end: 20,
                role: "passive-mood-sentence-composition",
                label: "passive voice preserved inside the ordinary optative sentence path",
                presentation: "carrier",
                lessonSections: ["§21.3"],
                atomIds: ["ACI-P183-L031-EEE03DF249"],
            },
        },
        "lesson21-active-reflexive-contextual-passive-reading": {
            activeResult: {
                voice: "active",
                formula: "#0-0+m-o(chīhua)z+⎕-0#",
                surface: "mochīhuaz",
            },
            contextual: {
                authorizationStatus: "authorized",
                blockReason: "",
                grammaticalVoice: "active",
                reflexiveMorphologyPreserved: true,
                subjectAnimacy: "nonanimate",
                subjectReference: "specific",
                subjectSemanticRole: "patient",
                availableReadings: ["literal-reflexive", "contextual-passive"],
                selectedReading: "contextual-passive",
                readingSelectionRequired: false,
                readingSelectionIsUserChoice: true,
                animacyFactIsUserChoice: false,
                animatePatientWarning: "",
                changesFiniteMorphology: false,
                formulaRealization: "#0-0+m-o(chīhua)z+⎕-0#",
                surfaceRealization: "mochīhuaz",
                canonical: true,
            },
            literal: {
                authorizationStatus: "authorized",
                blockReason: "",
                grammaticalVoice: "active",
                reflexiveMorphologyPreserved: true,
                subjectAnimacy: "nonanimate",
                subjectReference: "specific",
                subjectSemanticRole: "agent-and-patient",
                availableReadings: ["literal-reflexive", "contextual-passive"],
                selectedReading: "literal-reflexive",
                readingSelectionRequired: false,
                readingSelectionIsUserChoice: true,
                animacyFactIsUserChoice: false,
                animatePatientWarning: "",
                changesFiniteMorphology: false,
                formulaRealization: "#0-0+m-o(chīhua)z+⎕-0#",
                surfaceRealization: "mochīhuaz",
                canonical: true,
            },
            animateInventory: {
                authorizationStatus: "authorized",
                blockReason: "",
                grammaticalVoice: "active",
                reflexiveMorphologyPreserved: true,
                subjectAnimacy: "animate",
                subjectReference: "generic",
                subjectSemanticRole: "unresolved-until-reading-selection",
                availableReadings: ["literal-reflexive", "contextual-passive"],
                selectedReading: "",
                readingSelectionRequired: true,
                readingSelectionIsUserChoice: true,
                animacyFactIsUserChoice: false,
                animatePatientWarning: "animate subject is interpreted as patient, not agent",
                changesFiniteMorphology: false,
                formulaRealization: "#0-0+m-o(chīhua)z+⎕-0#",
                surfaceRealization: "mochīhuaz",
                canonical: true,
            },
            readingChoiceDoesNotChangeGrammar: {
                requested: "contextual-passive",
                voice: "active",
                formula: "#0-0+m-o(chīhua)z+⎕-0#",
                sameFormula: true,
            },
            genuineChoiceControl: {
                literalOption: true,
                contextualOption: true,
                activeReflexiveGate: true,
                hiddenWithoutChoice: true,
            },
            cue: {
                start: 5,
                end: 8,
                role: "active-reflexive-contextual-passive-reading",
                label: "active reflexive grammar · literal or contextual passive reading is a genuine interpretation choice",
                presentation: "carrier",
                lessonSections: ["§21.4"],
                atomIds: [
                    "ACI-P184-L007-B0D1F1DB43",
                    "ACI-P184-L010-2D9384C5D9",
                    "ACI-P184-L012-729B8E1BA4",
                    "ACI-P184-L018-12FCF5D77C-02",
                    "ACI-P184-L018-12FCF5D77C-03",
                    "ACI-P184-L018-12FCF5D77C-04",
                    "ACI-P184-L018-12FCF5D77C-05",
                    "ACI-P184-L025-6580367C23",
                    "ACI-P184-L025-6580367C23-02",
                    "ACI-P184-L026-2D616E8E21",
                    "ACI-P184-L028-A56F36A11A-02",
                    "ACI-P184-L028-A56F36A11A-03",
                    "ACI-P184-L028-A56F36A11A-04",
                    "ACI-P184-L028-A56F36A11A-05",
                    "ACI-P184-L031-B1A89F9C22-03",
                    "ACI-P184-L031-B1A89F9C22-04",
                    "ACI-P184-L031-B1A89F9C22-06",
                    "ACI-P184-L031-B1A89F9C22-07",
                ],
            },
        },
    };
    const activeMutation = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "chīhua",
        verbClass: "B",
        sourceValence: "specific-projective",
        objectPerson: "3sg",
        subject: "3sg",
        requestedVoice: "active",
        mood: "indicative",
        tense: "future",
    });
    const mutations = {
        "lesson21-passive-mood-sentence-composition": {
            voice: activeMutation.resultFrame?.selectedVoice,
            cue: ctx.getClassicalFormulaDerivedAnnotations(
                activeMutation.resultFrame?.formulaRealization || "",
                null,
                activeMutation.resultFrame?.selectedMachineryFrame || null,
            ).some((entry) => (
                entry.role === "passive-mood-sentence-composition"
            )),
        },
        "lesson21-active-reflexive-contextual-passive-reading": (() => {
            const mutated = ctx.interpretClassicalNahuatlActiveReflexiveContextualPassiveReading(
                activeMutation,
                {
                    subjectAnimacy: "nonanimate",
                    subjectReference: "specific",
                    requestedReading: "contextual-passive",
                },
            );
            return {
                authorizationStatus: mutated.authorizationStatus,
                blockReason: mutated.blockReason,
                canonical: ctx.isClassicalNahuatlActiveReflexiveContextualPassiveReadingFrame(
                    mutated,
                ),
            };
        })(),
    };
    const expectedMutations = {
        "lesson21-passive-mood-sentence-composition": {
            voice: "active",
            cue: false,
        },
        "lesson21-active-reflexive-contextual-passive-reading": {
            authorizationStatus: "blocked",
            blockReason: "contextual-passive-reading-requires-active-reflexive-vnc",
            canonical: false,
        },
    };

    s.eq("accepted Lesson 21 Groups 7-8 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 43, unique: 43, writing: 19, reading: 24 });
    groupIds.forEach((groupId) => {
        s.eq(
            `${groupId} reuses the canonical VNC and sentence paths`,
            observations[groupId],
            expected[groupId],
        );
    });
    for (const record of writing) {
        s.eq(
            `${record.atomId} performs its accepted writing job`,
            observations[record.reviewGroupId],
            expected[record.reviewGroupId],
        );
        s.eq(
            `mutation:${record.atomId} fails when its typed condition is changed`,
            mutations[record.reviewGroupId],
            expectedMutations[record.reviewGroupId],
        );
    }
    return s;
}

module.exports = { run };
