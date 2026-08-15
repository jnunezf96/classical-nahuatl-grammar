"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson15_groups_7_8_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson15-review-ledger.json"), "utf8"));
    const groupIds = ["lesson15-natural-possession", "lesson15-nnc-sentences"];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const naturalAuthority = (stem, semantics) => ctx.buildClassicalNahuatlNncSourceAuthorityFrame(stem, {
        selectedState: "possessive", naturalPossessionPolicy: "naturally-possessed",
        naturalPossessionSemantics: semantics, policySelectionAuthority: "external-lexical-record",
    });
    const propertyAuthority = naturalAuthority("āxcā", "property");
    const relationAuthority = naturalAuthority("nān", "kinship-or-human-relation");
    const bodyAuthority = naturalAuthority("māi", "body-part");
    const naturalLower = ctx.buildClassicalNahuatlClassGovernedNncFrame("chān", {
        state: "possessive", subject: "3common", possessor: "3sg",
        nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
        nncSourceAuthorityFrame: naturalAuthority("chān", "property"),
    });
    const naturalResult = ctx.buildClassicalNahuatlHigherNncFrame(naturalLower);
    const absoluteLower = ctx.buildClassicalNahuatlClassGovernedNncFrame("chān", {
        state: "absolutive", subject: "3common", nounClass: "tli",
        classSelectionAuthority: "user-selection",
    });
    const neverLower = ctx.buildClassicalNahuatlClassGovernedNncFrame("tōnati", {
        state: "possessive", subject: "3sg", possessor: "1sg",
        nounClass: "tl", classSelectionAuthority: "user-selection", tlSubclass: "1A",
    });
    const naturalBlocked = ctx.buildClassicalNahuatlHigherNncFrame(absoluteLower, {
        naturalPossessionPolicy: "naturally-possessed",
    });
    const neverBlocked = ctx.buildClassicalNahuatlHigherNncFrame(neverLower, {
        naturalPossessionPolicy: "never-possessive",
    });
    const metaphor = ctx.buildClassicalNahuatlHigherNncFrame(neverLower, {
        naturalPossessionPolicy: "never-possessive", metaphoricalOverride: true,
    });

    const sentenceLower = ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", {
        state: "absolutive", subject: "3common", nounClass: "tli",
        classSelectionAuthority: "user-selection",
    });
    const sentenceNnc = ctx.buildClassicalNahuatlHigherNncFrame(sentenceLower, {
        sentenceType: "statement", predicateKind: "equative", polarity: "positive",
    });
    const statement = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(sentenceNnc.nncSlotFrame, {
        sentenceType: "statement", polarity: "positive",
    });
    const question = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(sentenceNnc.nncSlotFrame, {
        sentenceType: "question-cuix", polarity: "positive",
    });
    const negative = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(sentenceNnc.nncSlotFrame, {
        sentenceType: "statement", polarity: "negative",
    });
    const possessiveLower = ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", {
        state: "possessive", subject: "3common", possessor: "3sg",
        nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
    });
    const possessiveSentence = ctx.buildClassicalNahuatlHigherNncFrame(possessiveLower, {
        sentenceType: "statement", predicateKind: "equative", polarity: "positive",
    });
    const issueNormalResult = (stem, operationInput) => {
        const source = ctx.issueCanonicalNncSourceFrame({ stem });
        const selection = ctx.getCanonicalNncOperationSelectionFrame(source, operationInput);
        const operation = ctx.issueCanonicalNncOperationFrame(source, operationInput);
        const result = ctx.requestClassicalOrdinaryNncResult(source, operation);
        return { source, selection, operation, result };
    };
    const normalNaturalProperty = issueNormalResult("chān", {
        state: "possessive", subject: "3common", possessor: "1sg",
    });
    const normalNaturalOwnership = issueNormalResult("āxcāi", {
        state: "possessive", subject: "3common", possessor: "nonspecific-human",
    });
    const normalNaturalNose = issueNormalResult("yaca", {
        state: "possessive", subject: "3common", possessor: "1pl",
    });
    const normalNaturalHand = issueNormalResult("māi", {
        state: "possessive", subject: "3common", possessor: "1pl",
    });
    const normalDerivedFathom = issueNormalResult("māi", {
        state: "absolutive", subject: "3common", predicateFormation: "tl-2a-to-1a",
    });
    const normalLiteralNaturalBlock = issueNormalResult("chān", {
        state: "absolutive", subject: "3common",
    });
    const normalLiteralNeverBlock = issueNormalResult("tōnatiuh", {
        state: "possessive", subject: "3sg", possessor: "1sg",
    });
    const normalMetaphoricalSun = issueNormalResult("tōnatiuh", {
        state: "possessive", subject: "3sg", possessor: "1sg", metaphoricalUse: true,
    });
    const normalSentence = (sentenceType, polarity = "positive") => issueNormalResult("cal", {
        state: "absolutive", subject: "3common", sentenceType, polarity,
    });
    const normalSentenceResults = [
        normalSentence("statement"),
        normalSentence("yes-no-intonation"),
        normalSentence("yes-no-cuix"),
        normalSentence("emphatic"),
        normalSentence("wish", "negative"),
    ];
    const brokenSentenceOperation = ctx.issueCanonicalNncOperationFrame(
        ctx.issueCanonicalNncSourceFrame({ stem: "cal" }),
        { state: "absolutive", subject: "3common", sentenceType: "question" },
    );
    const cueLabels = ({ result }) => result
        ? ctx.getClassicalFormulaDerivedAnnotations(
            result.formulaRealization, result.typedSlotFrame, result,
        ).map((cue) => cue.label)
        : [];

    const families = {
        "lesson15-natural-possession": {
            semanticPolicies: [propertyAuthority, relationAuthority, bodyAuthority].map((frame) => [
                frame.authorizationStatus, frame.naturalPossessionSemantics, frame.stateAvailability,
            ]),
            normalResult: [naturalResult.authorizationStatus, naturalResult.formulaRealization],
            naturalBlocked: [naturalBlocked.authorizationStatus, naturalBlocked.blockReason],
            neverBlocked: [neverBlocked.authorizationStatus, neverBlocked.blockReason],
            metaphor: [metaphor.authorizationStatus, metaphor.nncSourceAuthorityFrame.metaphoricalOverrideUsedForState],
            normalForms: [
                normalNaturalProperty,
                normalNaturalOwnership,
                normalNaturalNose,
                normalNaturalHand,
                normalDerivedFathom,
                normalMetaphoricalSun,
            ].map(({ result }) => [
                result.authorizationStatus,
                result.formulaRealization,
                result.surfaceRealization,
            ]),
            normalCues: [
                cueLabels(normalNaturalProperty).includes("natural possession"),
                cueLabels(normalMetaphoricalSun).includes("exception"),
            ],
        },
        "lesson15-nnc-sentences": {
            handoff: [
                sentenceNnc.sentenceHandoffFrame.authorizationStatus,
                sentenceNnc.sentenceHandoffFrame.consumedNncStatus,
                sentenceNnc.sentenceHandoffFrame.sentenceCompositionOperationId,
                sentenceNnc.sentenceHandoffFrame.nncFormulaIsSentenceAuthority,
            ],
            surfaces: [statement.sentenceSurface, question.sentenceSurface, negative.sentenceSurface],
            punctuation: [statement.sentenceFormulaDisplay, question.sentenceFormulaDisplay, negative.sentenceFormulaDisplay],
            contextualHaving: possessiveSentence.sentenceHandoffFrame.possessiveHavingTranslationIsContextual,
            definiteness: [
                sentenceNnc.sentenceHandoffFrame.definitenessEncoded,
                sentenceNnc.sentenceHandoffFrame.indefinitenessEncoded,
                sentenceNnc.sentenceHandoffFrame.definitenessRemainsAmbiguous,
            ],
            normalSentences: normalSentenceResults.map(({ result }) => [
                result.operationFrame.sentenceType,
                result.operationFrame.polarity,
                result.sentenceFrame.sentenceFormulaDisplay,
                result.sentenceSurface,
                result.sentenceFrame.sentenceCompositionOperationId,
            ]),
        },
    };
    const expected = JSON.parse(JSON.stringify(families));
    const mutationResults = {
        "lesson15-natural-possession": [
            normalLiteralNaturalBlock.operation.authorizationStatus,
            normalLiteralNaturalBlock.operation.blockReason,
            normalLiteralNeverBlock.operation.authorizationStatus,
            normalLiteralNeverBlock.operation.blockReason,
        ],
        "lesson15-nnc-sentences": [
            brokenSentenceOperation.authorizationStatus,
            brokenSentenceOperation.blockReason,
        ],
    };
    const expectedMutationResults = {
        "lesson15-natural-possession": [
            "blocked",
            "ordinary-nnc-state-not-lexically-authorized",
            "blocked",
            "ordinary-nnc-state-not-lexically-authorized",
        ],
        "lesson15-nnc-sentences": [
            "blocked",
            "ordinary-nnc-sentence-type-not-recognized",
        ],
    };

    s.eq("accepted Lesson 15 Groups 7-8 cover every atom once", {
        atoms: records.length, unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length, reading: records.length - writing.length,
    }, { atoms: 88, unique: 88, writing: 38, reading: 50 });
    for (const record of writing) {
        const actual = families[record.reviewGroupId];
        const wanted = expected[record.reviewGroupId];
        s.eq(`${record.atomId} performs its accepted grammar job`, actual, wanted);
        s.eq(`mutation:${record.atomId} fails when that grammar behavior is broken`,
            mutationResults[record.reviewGroupId], expectedMutationResults[record.reviewGroupId]);
    }
    const naturalCues = ctx.getClassicalFormulaDerivedAnnotations(
        naturalResult.formulaRealization, naturalResult.nncSlotFrame, naturalResult,
    ).map((cue) => cue.label);
    s.ok("natural possession is visible as a clickable formula cue",
        naturalCues.includes("natural possession"));
    s.eq("the normal application performs the accepted natural-possession jobs", {
        sourceForms: [
            normalNaturalProperty.result.surfaceRealization,
            normalNaturalOwnership.result.surfaceRealization,
            normalNaturalNose.result.surfaceRealization,
            normalNaturalHand.result.surfaceRealization,
        ],
        derivedNounKeepsIndependentPolicy: [
            normalDerivedFathom.selection.stateValues,
            normalDerivedFathom.result.surfaceRealization,
        ],
        literalNaturalBlock: [
            normalLiteralNaturalBlock.operation.authorizationStatus,
            normalLiteralNaturalBlock.operation.blockReason,
        ],
        literalNeverBlock: [
            normalLiteralNeverBlock.operation.authorizationStatus,
            normalLiteralNeverBlock.operation.blockReason,
        ],
        metaphoricalOverride: [
            normalMetaphoricalSun.selection.metaphoricalUseAvailable,
            normalMetaphoricalSun.result.formulaRealization,
            normalMetaphoricalSun.result.surfaceRealization,
        ],
        cues: [
            cueLabels(normalNaturalProperty).includes("natural possession"),
            cueLabels(normalMetaphoricalSun).includes("exception"),
        ],
    }, {
        sourceForms: ["nochān", "tēāxcā", "toyac", "tomā"],
        derivedNounKeepsIndependentPolicy: [["absolutive", "possessive"], "mātl"],
        literalNaturalBlock: ["blocked", "ordinary-nnc-state-not-lexically-authorized"],
        literalNeverBlock: ["blocked", "ordinary-nnc-state-not-lexically-authorized"],
        metaphoricalOverride: [true, "#0-0+n-o(tōnatiuh)0-0#", "notōnatiuh"],
        cues: [true, true],
    });
    s.eq("the normal application sends a finished NNC through the existing sentence choices",
        normalSentenceResults.map(({ result }) => [
            result.sentenceFrame.sentenceCompositionOperationId,
            result.sentenceFrame.sentenceFormulaDisplay,
            result.sentenceSurface,
        ]), [
            ["nnc-sentence-composition", "#0-0(cal)li-0#.", "Calli."],
            ["nnc-sentence-composition", "#0-0(cal)li-0#?", "Calli?"],
            ["nnc-sentence-composition", "Cuix #0-0(cal)li-0#?", "Cuix calli?"],
            ["nnc-sentence-composition", "Ca #0-0(cal)li-0#.", "Ca calli."],
            ["nnc-sentence-composition", "Mā ca#0-0(cal)li-0#.", "Mā cacalli."],
        ]);
    return s;
}

module.exports = { run };
