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
    const issueNormalResult = (sourceInput, operationInput) => {
        const source = ctx.issueCanonicalNncSourceFrame(sourceInput);
        const selection = ctx.getCanonicalNncOperationSelectionFrame(source, operationInput);
        const operation = ctx.issueCanonicalNncOperationFrame(source, operationInput);
        const result = ctx.requestClassicalOrdinaryNncResult(source, operation);
        return { source, selection, operation, result };
    };
    const normalSecondary = issueNormalResult(
        { stem: "tah", sourceClass: "tli-1" },
        { state: "possessive", subject: "3pl", possessor: "3pl", predicateFormation: "secondary-general-use" },
    );
    const normalReducedPossessor = issueNormalResult(
        { stem: "āch-cāuh" },
        { state: "possessive", subject: "3sg", possessor: "nonspecific-human" },
    );
    const normalReducedSecondary = issueNormalResult(
        { stem: "āch-cāuh" },
        { state: "possessive", subject: "3pl", possessor: "nonspecific-human", predicateFormation: "secondary-general-use" },
    );
    const normalAnalogicalAbsolutive = issueNormalResult(
        { stem: "māi", sourceClass: "tl-2-a" },
        { state: "absolutive", subject: "3common", predicateFormation: "analogical-restricted-use" },
    );
    const normalAnalogicalPossessive = issueNormalResult(
        { stem: "māi", sourceClass: "tl-2-a" },
        { state: "possessive", subject: "3common", possessor: "3sg", predicateFormation: "analogical-restricted-use" },
    );
    const normalReclassifiedAbsolutive = issueNormalResult(
        { stem: "māi", sourceClass: "tl-2-a" },
        { state: "absolutive", subject: "3common", predicateFormation: "tl-2a-to-1a" },
    );
    const normalReclassifiedPossessive = issueNormalResult(
        { stem: "māi", sourceClass: "tl-2-a" },
        { state: "possessive", subject: "3sg", possessor: "3sg", predicateFormation: "tl-2a-to-1a" },
    );
    const badAnalogical = ctx.buildClassicalNahuatlStemOperationRecord("māi", {
        operation: "analogical-restricted-use", nounClass: "tl",
        useShape: "truncated-i", subclass: "tl-2a",
        targetStem: "tla-mā", selectionAuthority: "user-supplied-lexical-analysis",
    });
    const badReclassification = ctx.buildClassicalNahuatlStemOperationRecord("māi", {
        operation: "tl-2a-to-1a", nounClass: "tli",
        useShape: "base", subclass: "tli-1", selectionAuthority: "user-selection",
    });

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
    const mutationResults = {
        "lesson15-secondary-general-use": [badSecondary.authorizationStatus, badSecondary.blockReason],
        "lesson15-analogical-restricted-use": [badAnalogical.authorizationStatus, badAnalogical.blockReason],
        "lesson15-reclassification-and-possessor-scope": [badReclassification.authorizationStatus, badReclassification.blockReason],
    };
    const expectedMutationResults = {
        "lesson15-secondary-general-use": ["blocked", "secondary-general-use-carrier-must-be-te-long-ti-or-t"],
        "lesson15-analogical-restricted-use": ["blocked", "supplied-lesson15-target-stem-contradicts-canvas-operation"],
        "lesson15-reclassification-and-possessor-scope": ["blocked", "tl-2a-to-1a-reclassification-requires-typed-tl-2a-source-analysis"],
    };

    s.eq("accepted Lesson 15 Groups 4-6 cover every atom once", {
        atoms: records.length, unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length, reading: records.length - writing.length,
    }, { atoms: 63, unique: 63, writing: 33, reading: 30 });
    for (const record of writing) {
        const actual = families[record.reviewGroupId];
        const wanted = expected[record.reviewGroupId];
        s.eq(`${record.atomId} performs its accepted grammar job`, actual, wanted);
        s.eq(`mutation:${record.atomId} fails when that grammar behavior is broken`,
            mutationResults[record.reviewGroupId], expectedMutationResults[record.reviewGroupId]);
    }
    const cueLabels = (frame) => ctx.getClassicalFormulaDerivedAnnotations(
        frame.formulaRealization, frame.nncSlotFrame, frame,
    ).map((cue) => cue.label);
    s.ok("accepted automatic Lesson 15 stem changes are visible through clickable cues",
        cueLabels(secondaryFrames[0]).includes("secondary general-use stem")
        && cueLabels(analogicalFrames[0]).includes("analogical nounstem")
        && cueLabels(reclassifiedFrames[0]).includes("reclassification"));
    const normalCueLabels = ({ result }) => ctx.getClassicalFormulaDerivedAnnotations(
        result.formulaRealization, result.typedSlotFrame, result,
    ).map((cue) => cue.label);
    s.eq("the normal application builds the secondary general-use relational stem", {
        selected: normalSecondary.selection.selectedPredicateOptionId,
        formula: normalSecondary.result.formulaRealization,
        surface: normalSecondary.result.surfaceRealization,
        cue: normalCueLabels(normalSecondary).includes("secondary general-use stem"),
        lexicalChoiceAuthority: normalSecondary.source.lexicalSelectionAuthority,
    }, {
        selected: "secondary-general-use",
        formula: "#0-0+ī-n(tē-tah)hu-ān#",
        surface: "īntētahhuān",
        cue: true,
        lexicalChoiceAuthority: "canonical-lexical-inventory",
    });
    s.eq("the normal application uses the lexical ti carrier without a new control", {
        sourceCarrier: normalReducedPossessor.source.boundaryFacts.nonspecificHumanPossessorCarrier,
        plainFormula: normalReducedPossessor.result.formulaRealization,
        plainSurface: normalReducedPossessor.result.surfaceRealization,
        plainCue: normalCueLabels(normalReducedPossessor).includes("possessor carrier reduction"),
        secondaryLabel: normalReducedSecondary.selection.predicateOptionContract.options
            .find((option) => option.optionId === "secondary-general-use").displayLabel,
        secondaryFormula: normalReducedSecondary.result.formulaRealization,
        secondarySurface: normalReducedSecondary.result.surfaceRealization,
        secondaryCues: ["secondary general-use stem", "assimilation"].map(
            (label) => normalCueLabels(normalReducedSecondary).includes(label),
        ),
    }, {
        sourceCarrier: "ti",
        plainFormula: "#0-0+ti(āch-cāuh)0-0#",
        plainSurface: "tiāchcāuh",
        plainCue: true,
        secondaryLabel: "secondary general-use stem (ti-)",
        secondaryFormula: "#0-0+tē(ti-āch-cā)hu-ān#",
        secondarySurface: "tētiāchcāhuān",
        secondaryCues: [true, true],
    });
    s.eq("the normal application reranks the analogical tla noun in both States", {
        optionAvailable: normalAnalogicalAbsolutive.selection.predicateOptionValues.includes("analogical-restricted-use"),
        absolutiveFormula: normalAnalogicalAbsolutive.result.formulaRealization,
        absolutiveSurface: normalAnalogicalAbsolutive.result.surfaceRealization,
        possessiveFormula: normalAnalogicalPossessive.result.formulaRealization,
        possessiveSurface: normalAnalogicalPossessive.result.surfaceRealization,
        cues: [normalAnalogicalAbsolutive, normalAnalogicalPossessive].map((frame) => normalCueLabels(frame).includes("analogical nounstem")),
    }, {
        optionAvailable: true,
        absolutiveFormula: "#0-0(tla-māi)tl-0#",
        absolutiveSurface: "tlamāitl",
        possessiveFormula: "#0-0+ī-0(tla-mā)0-0#",
        possessiveSurface: "ītlamā",
        cues: [true, true],
    });
    s.eq("the normal application keeps reclassification out of Stem formation", {
        optionAvailable: normalReclassifiedAbsolutive.selection.predicateOptionValues.includes("tl-2a-to-1a"),
        absolutiveFormula: normalReclassifiedAbsolutive.result.formulaRealization,
        absolutiveSurface: normalReclassifiedAbsolutive.result.surfaceRealization,
        possessiveFormula: normalReclassifiedPossessive.result.formulaRealization,
        possessiveSurface: normalReclassifiedPossessive.result.surfaceRealization,
        cues: [normalReclassifiedAbsolutive, normalReclassifiedPossessive].map((frame) => normalCueLabels(frame).includes("reclassification")),
        wrongClassMutation: mutationResults["lesson15-reclassification-and-possessor-scope"],
    }, {
        optionAvailable: false,
        absolutiveFormula: "#0-0(mā)tl-0#",
        absolutiveSurface: "mātl",
        possessiveFormula: "#0-0+ī-0(mā)uh-0#",
        possessiveSurface: "īmāuh",
        cues: [true, true],
        wrongClassMutation: ["blocked", "tl-2a-to-1a-reclassification-requires-typed-tl-2a-source-analysis"],
    });
    return s;
}

module.exports = { run };
