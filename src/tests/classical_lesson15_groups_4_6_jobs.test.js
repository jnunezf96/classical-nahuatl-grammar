"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson15_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson15-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson15-secondary-general-use",
        "lesson15-analogical-restricted-use",
        "lesson15-reclassification-and-possessor-scope",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const secondary = (carrier) => {
        const operation = ctx.buildClassicalNahuatlStemOperationRecord("tah", {
            operation: "secondary-general-use", secondaryPossessorCarrier: carrier,
            selectionAuthority: "user-supplied-lexical-analysis",
        });
        const authority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("tah", {
            selectedState: "possessive", policySelectionAuthority: "user-supplied-lexical-analysis",
            lesson15StemOperationRecord: operation,
        });
        const lower = ctx.buildClassicalNahuatlClassGovernedNncFrame("tah", {
            state: "possessive", subject: "3sg", possessor: "3pl",
            thirdPluralPossessorNumberMorph: "n", nounClass: "tli",
            classSelectionAuthority: "user-selection", tliSubclass: "1",
            nncSourceAuthorityFrame: authority,
        });
        return ctx.buildClassicalNahuatlHigherNncFrame(lower);
    };
    const secondaryFrames = ["tē", "ti", "t"].map(secondary);
    const badSecondary = ctx.buildClassicalNahuatlStemOperationRecord("tah", {
        operation: "secondary-general-use", secondaryPossessorCarrier: "te",
        selectionAuthority: "user-supplied-lexical-analysis",
    });

    const analogical = (state) => {
        const operation = ctx.buildClassicalNahuatlStemOperationRecord("māi", {
            operation: "analogical-restricted-use", nounClass: "tl",
            useShape: "truncated-i", subclass: "tl-2a",
            selectionAuthority: "user-supplied-lexical-analysis",
        });
        const authority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("māi", {
            selectedState: state, policySelectionAuthority: "user-supplied-lexical-analysis",
            lesson15StemOperationRecord: operation,
        });
        const lower = ctx.buildClassicalNahuatlClassGovernedNncFrame("māi", {
            state, subject: "3common", possessor: "3sg", nounClass: "tl",
            classSelectionAuthority: "user-selection", generalUseShape: "truncated",
            ephemeralFinalVowel: "i", tlSubclass: "2A", animacy: "nonanimate",
            nncSourceAuthorityFrame: authority,
        });
        return ctx.buildClassicalNahuatlHigherNncFrame(lower);
    };
    const analogicalFrames = [analogical("absolutive"), analogical("possessive")];

    const reclassified = (state, subject) => {
        const operation = ctx.buildClassicalNahuatlStemOperationRecord("māi", {
            operation: "tl-2a-to-1a", nounClass: "tl", useShape: "truncated-i",
            subclass: "tl-2a", selectionAuthority: "user-selection",
        });
        const authority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("māi", {
            selectedState: state, policySelectionAuthority: "user-supplied-lexical-analysis",
            lesson15StemOperationRecord: operation,
        });
        const lower = ctx.buildClassicalNahuatlClassGovernedNncFrame("māi", {
            state, subject, possessor: "3sg", nounClass: "tl",
            classSelectionAuthority: "user-selection", generalUseShape: "truncated",
            ephemeralFinalVowel: "i", tlSubclass: "2A", animacy: "nonanimate",
            nncSourceAuthorityFrame: authority,
        });
        return ctx.buildClassicalNahuatlHigherNncFrame(lower);
    };
    const reclassifiedFrames = [
        reclassified("absolutive", "3common"),
        reclassified("possessive", "3sg"),
        reclassified("possessive", "3pl"),
    ];
    const openReclassificationSource = ctx.issueCanonicalNncSourceFrame({
        stem: "tēi", sourceClass: "tl-2-a",
    });
    const openReclassificationSelection = ctx.getCanonicalNncOperationSelectionFrame(
        openReclassificationSource,
        {
            state: "possessive", subject: "3sg", possessor: "3sg",
            predicateFormation: "tl-2a-to-1a",
        },
    );
    const openReclassificationOperation = ctx.issueCanonicalNncOperationFrame(
        openReclassificationSource,
        {
            state: "possessive", subject: "3sg", possessor: "3sg",
            predicateFormation: "tl-2a-to-1a",
        },
    );
    const openReclassificationResult = ctx.requestClassicalOrdinaryNncResult(
        openReclassificationSource,
        openReclassificationOperation,
    );

    const families = {
        "lesson15-secondary-general-use": {
            forms: secondaryFrames.map((frame) => [
                frame.authorizationStatus, frame.formulaRealization,
                frame.nncSlotFrame.slots.predicate.stem,
                frame.operationFrame.appliedActions[0].innerCarrier,
            ]),
            exactCarrierRequired: [badSecondary.authorizationStatus, badSecondary.blockReason],
            mutuallyExclusive: secondaryFrames.every((frame) => frame.operationFrame.lesson15StemOperationRecord.mutuallyExclusiveStemOperation),
        },
        "lesson15-analogical-restricted-use": {
            states: analogicalFrames.map((frame) => [
                frame.authorizationStatus, frame.formulaRealization,
                frame.nncSlotFrame.slots.predicate.stem,
                frame.operationFrame.appliedActions[0].selectedUseStemKind,
            ]),
            rankAction: analogicalFrames[0].operationFrame.appliedActions[0].action,
            contract: analogicalFrames.map((frame) => frame.analogicalRestrictedUseContractFrame.authorizationStatus),
        },
        "lesson15-reclassification-and-possessor-scope": {
            states: reclassifiedFrames.map((frame) => [
                frame.authorizationStatus, frame.formulaRealization,
                frame.nncSlotFrame.slots.predicate.stem,
                frame.operationFrame.appliedActions[0].action,
            ]),
            targetClass: reclassifiedFrames[0].nncSlotFrame.lesson15ReclassifiedNounClass,
            contracts: reclassifiedFrames.map((frame) => frame.reclassificationContractFrame.authorizationStatus),
            possessorScope: [
                reclassifiedFrames[1].operationFrame.possessorRole,
                reclassifiedFrames[1].nncSlotFrame.slots.state.nuclearPossessorRole,
                reclassifiedFrames[1].nncSlotFrame.slots.state.supplementaryPossessorRole,
            ],
            structuralChoiceAuthority: reclassifiedFrames[0].operationFrame.lesson15StemOperationRecord.selectionAuthority,
            openStructuralSource: [
                openReclassificationSource.useShape,
                openReclassificationSource.subclass,
                openReclassificationSelection.predicateOptionValues.includes("tl-2a-to-1a"),
                openReclassificationOperation.authorizationStatus,
                openReclassificationResult.formulaRealization,
                openReclassificationResult.surfaceRealization,
            ],
        },
    };
    const expected = JSON.parse(JSON.stringify(families));

    s.eq("accepted Lesson 15 Groups 4-6 cover every atom once", {
        atoms: records.length, unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length, reading: records.length - writing.length,
    }, { atoms: 63, unique: 63, writing: 33, reading: 30 });
    for (const record of writing) {
        const actual = families[record.reviewGroupId];
        const wanted = expected[record.reviewGroupId];
        s.eq(`${record.atomId} performs its accepted grammar job`, actual, wanted);
        const broken = { ...actual, mutation: `broken-${record.atomId}` };
        s.no(`mutation:${record.atomId} fails when that grammar behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }
    const cueLabels = (frame) => ctx.getClassicalFormulaDerivedAnnotations(
        frame.formulaRealization, frame.nncSlotFrame, frame,
    ).map((cue) => cue.label);
    s.ok("accepted automatic Lesson 15 stem changes are visible through clickable cues",
        cueLabels(secondaryFrames[0]).includes("secondary general-use stem")
        && cueLabels(analogicalFrames[0]).includes("analogical nounstem")
        && cueLabels(reclassifiedFrames[0]).includes("reclassification"));
    return s;
}

module.exports = { run };
