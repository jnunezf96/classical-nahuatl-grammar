"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const CASES = Object.freeze([
    ["ACI-P050-L022-A33747C200", "select", ["assimilation", { leftConsonant: "k", rightConsonant: "k", grammaticalConstruction: true }], "cn-l2-211-regressive-dissimilation-kk-hk", "hc"],
    ["ACI-P050-L025-12876984C1", "select", ["shift", { sourceConsonant: "kw", position: "exposed", grammaticalConstruction: true }], "cn-l2-213-kw-exposed-k", "c"],
    ["ACI-P050-L027-6ECB43F0B4", "select", ["assimilation", { leftConsonant: "k", rightConsonant: "k", grammaticalConstruction: true }], "cn-l2-211-regressive-dissimilation-kk-hk", "hc"],
    ["ACI-P050-L031-20EA88210A", "select", ["loss", { leftConsonant: "tz", rightConsonant: "w", grammaticalConstruction: true }], "cn-l2-212-tz-w-tz", "tz"],
    ["ACI-P050-L033-8ED17977BE", "select", ["loss", { leftConsonant: "ch", rightConsonant: "w", grammaticalConstruction: true }], "cn-l2-212-ch-w-ch", "ch"],
    ["ACI-P050-L035-9EFC19B9DD", "select", ["loss", { leftConsonant: "glottal", rightConsonant: "y", grammaticalConstruction: true }], "cn-l2-212-glottal-y-h", "h"],
    ["ACI-P051-L024-FA7BB4A79C", "select", ["shift", { sourceConsonant: "glottal", followingVowel: "a", grammaticalConstruction: true }], "cn-l2-213-glottal-vowel-y", "ya"],
    ["ACI-P052-L010-C54302F544", "select", ["shift", { sourceConsonant: "kw", position: "exposed", grammaticalConstruction: true }], "cn-l2-213-kw-exposed-k", "c"],
    ["ACI-P052-L014-75267806EC", "select", ["shift", { sourceConsonant: "t", position: "exposed", grammaticalConstruction: true }], "cn-l2-213-t-final-h", "h"],
    ["ACI-P052-L017-66E82EE5B5", "select", ["shift", { sourceConsonant: "glottal", position: "nonfinal", grammaticalConstruction: true }], "cn-l2-213-rare-glottal-nonfinal-t", "t"],
    ["ACI-P052-L020-B62AAD1010", "checkbox", ["elision", { sourceMorpheme: "oc", targetMorpheme: "c", vowelLength: "short", stressGroupCombination: true }], "cn-l2-214-short-vowel-stress-group-elision", "c"],
]);

function observe(record) {
    return record.authorized === true
        && record.ruleId === record.expectedRuleId
        && record.surface === record.expectedSurface
        && record.normalApplicationPath === true
        && record.controlKind === record.expectedControlKind;
}

function run(ctx) {
    const s = createSuite("classical_lesson2_optional_result_controls");
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    const controls = {
        select: shell.includes('id="classical-transcription-optional-result"')
            && rendering.includes("buildClassicalLesson2OptionalBoundaryChoices")
            && rendering.includes("renderSelectedClassicalLesson2OptionalResult"),
        checkbox: shell.includes('id="classical-transcription-elision"')
            && shell.includes('type="checkbox"')
            && rendering.includes("buildClassicalLesson2ElisionChoice")
            && rendering.includes("renderSelectedClassicalLesson2OptionalResult"),
    };
    const normalApplicationPath = rendering.includes("syncClassicalLesson2OptionalResultControls(parsed)")
        && rendering.includes("ActiveClassicalTranscriptionBaselineApplication = applicationResult")
        && rendering.includes("executeClassicalGrammarApplicationRequest")
        && rendering.includes("captureClassicalGrammarApplicationResult");
    const operationIds = {
        assimilation: "phonology:assimilation",
        loss: "phonology:consonant-loss",
        shift: "phonology:consonant-shift",
        elision: "phonology:vowel-elision",
    };

    for (const [atomId, expectedControlKind, [kind, options], expectedRuleId, expectedSurface] of CASES) {
        const application = ctx.executeClassicalGrammarApplicationRequest({
            operationId: operationIds[kind],
            outputKind: "scalar",
            args: [options],
        });
        const result = application.canonicalResult;
        const record = {
            authorized: application.authorizationStatus === "authorized"
                && ctx.isClassicalNahuatlTranscriptionAnalysisFrame(result),
            ruleId: result?.selectedRuleId || "",
            surface: result?.surface || "",
            expectedRuleId,
            expectedSurface,
            normalApplicationPath,
            controlKind: controls[expectedControlKind] ? expectedControlKind : "",
            expectedControlKind,
        };
        s.eq(`${atomId}: normal application offers and performs the exact Canvas choice`, observe(record), true);
        const broken = { ...record, surface: "broken", controlKind: "" };
        s.eq(`${atomId}: breaking either the Result or its genuine control fails`, observe(broken), false);
    }

    return s;
}

module.exports = { run };
