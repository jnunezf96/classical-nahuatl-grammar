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

    const families = {
        "lesson15-natural-possession": {
            semanticPolicies: [propertyAuthority, relationAuthority, bodyAuthority].map((frame) => [
                frame.authorizationStatus, frame.naturalPossessionSemantics, frame.stateAvailability,
            ]),
            normalResult: [naturalResult.authorizationStatus, naturalResult.formulaRealization],
            naturalBlocked: [naturalBlocked.authorizationStatus, naturalBlocked.blockReason],
            neverBlocked: [neverBlocked.authorizationStatus, neverBlocked.blockReason],
            metaphor: [metaphor.authorizationStatus, metaphor.nncSourceAuthorityFrame.metaphoricalOverrideUsedForState],
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
        },
    };
    const expected = JSON.parse(JSON.stringify(families));

    s.eq("accepted Lesson 15 Groups 7-8 cover every atom once", {
        atoms: records.length, unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length, reading: records.length - writing.length,
    }, { atoms: 88, unique: 88, writing: 38, reading: 50 });
    for (const record of writing) {
        const actual = families[record.reviewGroupId];
        const wanted = expected[record.reviewGroupId];
        s.eq(`${record.atomId} performs its accepted grammar job`, actual, wanted);
        const broken = { ...actual, mutation: `broken-${record.atomId}` };
        s.no(`mutation:${record.atomId} fails when that grammar behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }
    const naturalCues = ctx.getClassicalFormulaDerivedAnnotations(
        naturalResult.formulaRealization, naturalResult.nncSlotFrame, naturalResult,
    ).map((cue) => cue.label);
    s.ok("natural possession is visible as a clickable formula cue",
        naturalCues.includes("natural possession"));
    return s;
}

module.exports = { run };
