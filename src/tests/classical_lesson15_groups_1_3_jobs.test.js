"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson15_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson15-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson15-possessive-plural-assimilation",
        "lesson15-suppletive-possessive-stems",
        "lesson15-derived-nonanimate-and-possessor-reduplication",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const eagleLower = ctx.buildClassicalNahuatlClassGovernedNncFrame("cuāuh", {
        state: "possessive", subject: "3pl", possessor: "1sg",
        nounClass: "tli", classSelectionAuthority: "user-selection",
    });
    const motherLower = ctx.buildClassicalNahuatlClassGovernedNncFrame("nān", {
        state: "possessive", subject: "1pl", possessor: "1pl",
        nounClass: "tli", classSelectionAuthority: "user-selection",
    });
    const nearbyLower = ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", {
        state: "possessive", subject: "3pl", possessor: "1sg",
        nounClass: "tli", classSelectionAuthority: "user-selection",
    });
    const eagle = ctx.buildClassicalNahuatlHigherNncFrame(eagleLower);
    const mother = ctx.buildClassicalNahuatlHigherNncFrame(motherLower);
    const nearby = ctx.buildClassicalNahuatlHigherNncFrame(nearbyLower);

    const suppletiveRecord = ctx.buildClassicalNahuatlStemOperationRecord("tlācoh", {
        operation: "suppletive", targetStem: "tlāca", suppletiveConnector: "uh",
        selectionAuthority: "user-supplied-lexical-analysis",
    });
    const suppletiveAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("tlācoh", {
        selectedState: "possessive", policySelectionAuthority: "user-supplied-lexical-analysis",
        lesson15StemOperationRecord: suppletiveRecord,
    });
    const suppletiveLower = ctx.buildClassicalNahuatlClassGovernedNncFrame("tlācoh", {
        state: "possessive", subject: "1sg", possessor: "2sg",
        nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
        nncSourceAuthorityFrame: suppletiveAuthority,
    });
    const suppletive = ctx.buildClassicalNahuatlHigherNncFrame(suppletiveLower);
    const pilMatrix = ctx.buildClassicalNahuatlStemOperationRecord("pil", {
        operation: "yo-matrix", state: "possessive", subject: "1sg", possessor: "2sg",
        selectionAuthority: "external-lexical-record",
    });
    const teucMatrix = ctx.buildClassicalNahuatlStemOperationRecord("tēuc", {
        operation: "yo-matrix", state: "possessive", subject: "3pl", possessor: "2sg",
        selectionAuthority: "external-lexical-record",
    });
    const teucOptions = ctx.getClassicalNahuatlPredicateOptionContract("tēuc", {
        state: "possessive", subject: "3sg", possessor: "1pl",
    });

    const derivedLower = ctx.buildClassicalNahuatlClassGovernedNncFrame("chān", {
        state: "possessive", subject: "3common", possessor: "3pl",
        thirdPluralPossessorNumberMorph: "n", nounClass: "tli",
        classSelectionAuthority: "user-selection", tliSubclass: "1",
        stemFormation: "distributive", derivedStem: "chah-chān",
    });
    const derived = ctx.buildClassicalNahuatlHigherNncFrame(derivedLower, { animacy: "nonanimate" });
    const reduplicationSelection = ctx.buildClassicalNahuatlPossessorReduplicationSelection("cal", {
        selected: true, selectionAuthority: "user-selection",
    });
    const reduplicationAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("cal", {
        selectedState: "possessive", policySelectionAuthority: "user-supplied-lexical-analysis",
        lesson15PossessorReduplicationSelection: reduplicationSelection,
    });
    const reduplicationLower = ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", {
        state: "possessive", subject: "3pl", possessor: "1sg",
        nounClass: "tli", classSelectionAuthority: "user-selection",
        nncSourceAuthorityFrame: reduplicationAuthority,
    });
    const reduplicated = ctx.buildClassicalNahuatlHigherNncFrame(reduplicationLower);
    const applicationReduplicationSource = ctx.issueCanonicalNncSourceFrame({ stem: "cal" });
    const applicationReduplicationSelection = ctx.getCanonicalNncOperationSelectionFrame(
        applicationReduplicationSource,
        {
            state: "possessive", subject: "3pl", possessor: "1sg",
            animacy: "animate", metaphoricalUse: true,
            possessorReduplication: true,
        },
    );
    const applicationReduplicationOperation = ctx.issueCanonicalNncOperationFrame(
        applicationReduplicationSource,
        {
            state: "possessive", subject: "3pl", possessor: "1sg",
            metaphoricalUse: true, possessorReduplication: true,
        },
    );
    const applicationReduplicationResult = ctx.requestClassicalOrdinaryNncResult(
        applicationReduplicationSource,
        applicationReduplicationOperation,
    );
    const issueNormalResult = (sourceInput, operationInput) => {
        const source = ctx.issueCanonicalNncSourceFrame(sourceInput);
        const selection = ctx.getCanonicalNncOperationSelectionFrame(source, {
            ...operationInput,
            animacy: operationInput.subject === "3common" ? "nonanimate" : "animate",
        });
        const operation = ctx.issueCanonicalNncOperationFrame(source, operationInput);
        const result = ctx.requestClassicalOrdinaryNncResult(source, operation);
        return { source, selection, operation, result };
    };
    const normalEagle = issueNormalResult(
        { stem: "cuāuh", sourceClass: "tli-1" },
        { state: "possessive", subject: "3pl", possessor: "1sg" },
    );
    const normalPilYo = issueNormalResult(
        { stem: "pil" },
        { state: "possessive", subject: "1sg", possessor: "2sg", predicateFormation: "yo-matrix" },
    );
    const normalCalSource = ctx.issueCanonicalNncSourceFrame({ stem: "cal" });
    const normalCalSelection = ctx.getCanonicalNncOperationSelectionFrame(normalCalSource, {
        state: "possessive", subject: "3common", possessor: "3sg", animacy: "nonanimate",
    });
    const normalCalYo = issueNormalResult({ stem: "cal" }, {
        state: "possessive", subject: "3common", possessor: "3sg", predicateFormation: "yo-matrix",
    });
    const normalDerived = issueNormalResult(
        { stem: "cal" },
        { state: "possessive", subject: "3common", possessor: "3pl", stemFormation: "distributive-varietal" },
    );
    const normalReduplicated = issueNormalResult(
        { stem: "cal" },
        { state: "possessive", subject: "3pl", possessor: "1sg", metaphoricalUse: true, possessorReduplication: true },
    );
    const normalUnreduplicated = issueNormalResult(
        { stem: "cal" },
        { state: "possessive", subject: "3pl", possessor: "1sg", metaphoricalUse: true },
    );

    const families = {
        "lesson15-possessive-plural-assimilation": {
            eagle: [eagle.authorizationStatus, eagle.formulaRealization, eagle.operationFrame.appliedActions.map((action) => action.action)],
            mother: [mother.authorizationStatus, mother.formulaRealization, mother.operationFrame.appliedActions.map((action) => action.action)],
            nearby: [nearby.authorizationStatus, nearby.formulaRealization, nearby.operationFrame.appliedActions.map((action) => action.action)],
            spellingAlternative: mother.operationFrame.appliedActions[0].spellingAlternative,
        },
        "lesson15-suppletive-possessive-stems": {
            selected: [suppletive.authorizationStatus, suppletive.formulaRealization, suppletive.operationFrame.appliedActions[0].action],
            matrices: [[pilMatrix.authorizationStatus, pilMatrix.targetStem], [teucMatrix.authorizationStatus, teucMatrix.targetStem]],
            titleAvailable: teucOptions.optionIds.includes("tec-title"),
            examplesAreWhitelist: suppletive.operationFrame.lexicalExamplesAreRuleWhitelist,
            rejectedHistoricalOutput: suppletive.operationFrame.prohibitedDerivationRecords[0].rejectedOutput,
        },
        "lesson15-derived-nonanimate-and-possessor-reduplication": {
            derived: [derived.authorizationStatus, derived.formulaRealization, derived.nncSlotFrame.lesson15DerivedNonanimateReading],
            reduplicated: [reduplicated.authorizationStatus, reduplicated.formulaRealization, reduplicated.nncSlotFrame.slots.state.arity],
            possessorSlots: reduplicated.nncSlotFrame.slots.state.slots.map((slot) => `${slot.role}:${slot.carrier}`),
            subjectNumber: reduplicated.nncSlotFrame.subjectNumber,
            structuralChoiceAuthority: reduplicated.operationFrame.lesson15PossessorReduplicationSelection.selectionAuthority,
            normalApplicationPath: [
                applicationReduplicationSelection.possessorReduplicationAvailable,
                applicationReduplicationSelection.selectedPossessorReduplication,
                applicationReduplicationOperation.authorizationStatus,
                applicationReduplicationResult.formulaRealization,
                applicationReduplicationResult.surfaceRealization,
            ],
        },
    };
    const expected = JSON.parse(JSON.stringify(families));

    s.eq("accepted Lesson 15 Groups 1-3 cover every atom once", {
        atoms: records.length, unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length, reading: records.length - writing.length,
    }, { atoms: 86, unique: 86, writing: 40, reading: 46 });
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
    s.ok("accepted automatic Lesson 15 work is visible through clickable formula cues",
        cueLabels(eagle).includes("assimilation")
        && cueLabels(suppletive).includes("suppletive stem")
        && cueLabels(reduplicated).filter((label) => label === "possessor reduplication").length === 4);
    const normalCueLabels = ({ result }) => ctx.getClassicalFormulaDerivedAnnotations(
        result.formulaRealization, result.typedSlotFrame, result,
    ).map((cue) => cue.label);
    s.eq("the normal application path performs final-w assimilation", {
        status: normalEagle.result.authorizationStatus,
        formula: normalEagle.result.formulaRealization,
        surface: normalEagle.result.surfaceRealization,
        cue: normalCueLabels(normalEagle).includes("assimilation"),
    }, { status: "authorized", formula: "#0-0+n-o(cuā)hu-ān#", surface: "nocuāhuān", cue: true });
    s.eq("the normal application marks only the lexical yō replacement as suppletive", {
        pilOptions: normalPilYo.selection.predicateOptionValues,
        pilSurface: normalPilYo.result.surfaceRealization,
        pilCue: normalCueLabels(normalPilYo).includes("suppletive stem"),
        calOptions: normalCalSelection.predicateOptionValues,
        productiveCalStatus: normalCalYo.result.authorizationStatus,
        productiveCalCue: normalCueLabels(normalCalYo).includes("suppletive stem"),
    }, {
        pilOptions: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"],
        pilSurface: "nimopillo",
        pilCue: true,
        calOptions: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"],
        productiveCalStatus: "authorized",
        productiveCalCue: false,
    });
    s.eq("the normal application keeps common grammar number while building the derived nonanimate form", {
        formula: normalDerived.result.formulaRealization,
        surface: normalDerived.result.surfaceRealization,
        reading: normalDerived.result.typedSlotFrame.lesson15DerivedNonanimateReading,
    }, {
        formula: "#0-0+ī-n(cah-cal)0-0#",
        surface: "īncahcal",
        reading: {
            active: true,
            subjectNumber: "common",
            EnglishPluralTranslationDoesNotChangeGrammarNumber: true,
        },
    });
    s.eq("the normal application obeys the genuine possessor-reduplication choice", {
        selected: normalReduplicated.selection.selectedPossessorReduplication,
        selectedSurface: normalReduplicated.result.surfaceRealization,
        selectedCues: normalCueLabels(normalReduplicated).filter((label) => label === "possessor reduplication").length,
        unselectedSurface: normalUnreduplicated.result.surfaceRealization,
    }, {
        selected: true,
        selectedSurface: "nonocalhuān",
        selectedCues: 4,
        unselectedSurface: "nocalhuān",
    });
    return s;
}

module.exports = { run };
