"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson14_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson14-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson14-use-stem-kinds",
        "lesson14-nounstem-classes",
        "lesson14-number-and-derived-nounstems",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const source = (stem, options) => ctx.buildClassicalNahuatlNounstemSourceFrame(stem, options);
    const baseAbsolutive = source("naca", {
        state: "absolutive", nounClass: "tl", classSelectionAuthority: "user-selection",
    });
    const basePossessive = source("naca", {
        state: "possessive", nounClass: "tl", classSelectionAuthority: "user-selection",
    });
    const truncatedPossessive = source("naca", {
        state: "possessive", nounClass: "tl", classSelectionAuthority: "user-selection",
        generalUseShape: "truncated", ephemeralFinalVowel: "a", tlSubclass: "2B",
    });
    const absolutiveNnc = ctx.buildClassicalNahuatlClassGovernedNncFrame("naca", {
        state: "absolutive", subject: "3common", nounClass: "tl",
        classSelectionAuthority: "user-selection",
    });
    const vowelGuidance = ctx.getClassicalNahuatlClassFormGuidance("cihuā");
    const consonantGuidance = ctx.getClassicalNahuatlClassFormGuidance("cal");
    const alternativeClass = ctx.buildClassicalNahuatlLexicalSelectionRecord("tōch", {
        selectionAuthority: "external-lexical-record", nounClass: "tli",
        classMembershipOptions: ["tli", "in"],
    });
    const supportiveInitial = ctx.buildClassicalNahuatlLexicalSelectionRecord("ich", {
        selectionAuthority: "external-lexical-record", nounClass: "tli",
        supportiveInitialI: true, selectedInitialVariant: "omitted",
    });
    const glottalized = ctx.buildClassicalNahuatlGlottalizedGeneralUseFrame("teō", {
        matrixMorpheme: "cal", lexicallyGlottalizable: true,
    });
    const blockedGlottalized = ctx.buildClassicalNahuatlGlottalizedGeneralUseFrame("teō", {
        matrixMorpheme: "cal", lexicallyGlottalizable: false,
    });

    const affinityCal = ctx.buildClassicalNahuatlDerivedStemFrame("cal", {
        stemFormation: "affinity", subject: "3pl", animacy: "animate",
    });
    const distributiveCal = ctx.buildClassicalNahuatlDerivedStemFrame("cal", {
        stemFormation: "distributive-varietal", subject: "3common", animacy: "nonanimate",
    });
    const distributiveIcxi = ctx.buildClassicalNahuatlDerivedStemFrame("icxi", {
        stemFormation: "distributive-varietal", subject: "3pl", animacy: "animate",
    });
    const distributiveIzte = ctx.buildClassicalNahuatlDerivedStemFrame("izte", {
        stemFormation: "distributive-varietal", subject: "3common", animacy: "nonanimate",
    });
    const numberFrame = ctx.NNC_LESSON14_NOUNSTEM_NUMBER_FRAME;

    const observations = new Map();
    const expected = new Map();
    const add = (atomId, actual, wanted) => {
        observations.set(atomId, actual);
        expected.set(atomId, wanted);
    };

    add("ACI-P124-L004-B2113D1117", [[baseAbsolutive.restrictedUseStem, basePossessive.generalUseStem], [truncatedPossessive.restrictedUseStem, truncatedPossessive.generalUseStem]], [["naca", "naca"], ["naca", "nac"]]);
    add("ACI-P124-L006-C0AE46F48A", [baseAbsolutive.state, baseAbsolutive.selectedUseKind, baseAbsolutive.selectedUseStem], ["absolutive", "restricted-use", "naca"]);
    add("ACI-P124-L007-621B5EF7A8", [truncatedPossessive.state, truncatedPossessive.selectedUseKind, truncatedPossessive.selectedUseStem, truncatedPossessive.useShapeAction], ["possessive", "general-use", "nac", "delete-tagged-ephemeral-vowel"]);

    add("ACI-P124-L024-151C106FBE", [absolutiveNnc.nncSlotFrame.slots.number.num1, absolutiveNnc.nncSlotFrame.slots.number.num2], ["tl", "0"]);
    add("ACI-P124-L027-8B7CFC817C", [vowelGuidance.classAuthorized, vowelGuidance.lexicalSelectionRequired, vowelGuidance.rule], [false, true, "form-constrains-candidates-but-does-not-predict-class-membership"]);
    add("ACI-P124-L028-FD6EDFBD34", [vowelGuidance.candidateClasses.includes("zero"), consonantGuidance.candidateClasses.includes("zero")], [true, true]);
    add("ACI-P124-L030-C984F457C0", ctx.buildClassicalNahuatlNounstemSourceFrame("cal", { state: "absolutive", nounClass: "li" }).nounClass, "tli");
    add("ACI-P125-L007-FE9EA970C1", [alternativeClass.authorizationStatus, alternativeClass.classMembershipOptions, alternativeClass.alternativeClassMembership], ["authorized", ["tli", "in"], true]);
    add("ACI-P125-L011-6989F89F08", [supportiveInitial.authorizationStatus, supportiveInitial.supportiveInitialVariant, supportiveInitial.selectedRestrictedUseStem], ["authorized", "ch", "ch"]);
    add("ACI-P125-L013-503C09E40A", [basePossessive.generalUseShape, truncatedPossessive.generalUseShape, glottalized.usageEnvironment], ["base", "truncated", "compound-embed"]);
    add("ACI-P125-L015-6F0617554C", [basePossessive.restrictedUseStem, basePossessive.generalUseStem, basePossessive.useShapeAction], ["naca", "naca", "identity-base-shape"]);
    add("ACI-P125-L016-FED7318DFE", [truncatedPossessive.restrictedUseStem, truncatedPossessive.generalUseStem, truncatedPossessive.ephemeralFinalVowel], ["naca", "nac", "a"]);
    add("ACI-P125-L018-2FFDF88B5D", [glottalized.finalLongVowel, glottalized.replacement, glottalized.generalUseStem], ["ō", "oh", "teoh"]);
    add("ACI-P125-L019-F2F22D44FB", [glottalized.usageEnvironment, glottalized.matrixMorpheme], ["compound-embed", "cal"]);
    add("ACI-P125-L019-54F0BCB4FE", [blockedGlottalized.authorizationStatus, blockedGlottalized.blockReason, glottalized.authorizationStatus], ["blocked", "typed-lexical-glottalized-shape-authorization-required", "authorized"]);

    add("ACI-P125-L022-0FE1A6DD74", numberFrame.numberBelongsTo, "personal-pronoun subject");
    add("ACI-P125-L023-72684F1ABE", numberFrame.predicateMarksNumber, false);
    add("ACI-P125-L025-94A7BEEFB8", [numberFrame.nounstemCanBeDerivationallyAlteredForGroupRelation, affinityCal.subjectNumberChanged], [true, false]);
    add("ACI-P125-L029-4262ECF3D4", [affinityCal.derivationPosition, distributiveCal.derivationPosition, affinityCal.morphBoundaryPolicy], ["inside-predicate-stem", "inside-predicate-stem", "keep-entire-derived-form-inside-one-stem-slot"]);
    add("ACI-P125-L032-2A3E0EDDEC", [affinityCal.derivationOperationFrame.animateNonanimateDistinctionPreserved, distributiveCal.derivationOperationFrame.animateNonanimateDistinctionPreserved], [true, true]);
    add("ACI-P125-L034-A46722AFDF", [affinityCal.relationMeaning, affinityCal.relationEnvironmentRule], ["cohesiveness-or-affinity", "derived relation stem requires plural personal reference or nonanimate common reference"]);
    add("ACI-P125-L034-A46722AFDF-02", [affinityCal.derivationOperationFrame.reduplicativePrefix, affinityCal.derivedStem], ["cā", "cā-cal"]);
    add("ACI-P125-L034-4C1BBF23C4", affinityCal.relationMeaning, "cohesiveness-or-affinity");
    add("ACI-P126-L004-1E32AFE2C3", affinityCal.derivedStem, "cā-cal");
    add("ACI-P126-L005-C4120B1ED1", [affinityCal.derivationOperationFrame.reduplicativePrefix, numberFrame.affectiveStemContrast], ["cā", "Lesson 32"]);
    add("ACI-P126-L007-91CBBE32AB", distributiveCal.relationMeaning, "distribution-or-variety");
    add("ACI-P126-L011-72C329D9E3", distributiveCal.derivedStem, "cah-cal");
    add("ACI-P126-L014-C644DC3C3E", [distributiveIcxi.derivationOperationFrame.reduplicativePrefix, distributiveIcxi.derivationOperationFrame.supportiveInitialIReduplicatedAsSupportive], ["ih", true]);
    add("ACI-P126-L014-699A7C6742", [distributiveIcxi.derivationOperationFrame.initialVowelFrame.initialISurface, distributiveIcxi.derivationOperationFrame.supportiveInitialIKeptInSource], [true, true]);
    add("ACI-P126-L016-837CF22E18", distributiveIcxi.derivedStem, "ih-icxi");
    add("ACI-P126-L017-DB8EAD730E", distributiveIzte.derivedStem, "ih-izte");
    add("ACI-P126-L018-EEEF40B4C6", [distributiveCal.sourceStem, distributiveCal.derivedStem, distributiveCal.relationMeaning], ["cal", "cah-cal", "distribution-or-variety"]);
    add("ACI-P126-L021-45091E1942", [distributiveCal.derivedByRule, distributiveCal.derivedStem, distributiveCal.grammaticalNumberValue], [true, "cah-cal", "none"]);
    add("ACI-P126-L029-9478D4B41B", numberFrame.pronominalPluralStemExceptions, ["Andrews §16.3", "Andrews §16.9"]);
    add("ACI-P126-L046-C2A418BEF2", baseAbsolutive.selectedUseKind, "restricted-use");
    add("ACI-P126-L046-92A897F11B", [baseAbsolutive.selectedUseKind, baseAbsolutive.selectedUseShape], ["restricted-use", "base"]);
    add("ACI-P127-L002-037F2C2847", [basePossessive.generalUseShape, truncatedPossessive.generalUseShape, glottalized.usageEnvironment], ["base", "truncated", "compound-embed"]);
    add("ACI-P127-L002-5C8CCEB8CB", [basePossessive.selectedUseKind, truncatedPossessive.selectedUseKind], ["general-use", "general-use"]);
    add("ACI-P127-L003-031C43157E", numberFrame.derivedStemTypes.map((entry) => entry.id), ["plain", "affinity", "distributive-varietal"]);

    s.eq("accepted Lesson 14 Groups 1-3 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 90, unique: 90, writing: 39, reading: 51 });
    s.eq("every writing atom has its own exact grammar observation", {
        observed: writing.filter((record) => observations.has(record.atomId)).length,
        expected: writing.filter((record) => expected.has(record.atomId)).length,
        missing: writing.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 39, expected: 39, missing: [] });
    for (const record of writing) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted grammar job`, actual, wanted);
        const broken = Array.isArray(actual)
            ? ["BROKEN", ...actual.slice(1)]
            : typeof actual === "boolean"
                ? !actual
                : `${actual}-BROKEN`;
        s.no(`mutation:${record.atomId} fails when that exact grammar behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }

    const appSource = ctx.issueCanonicalNncSourceFrame({ stem: "cal" });
    const appOperation = ctx.issueCanonicalNncOperationFrame(appSource, {
        state: "absolutive", subject: "3common", stemFormation: "distributive-varietal",
    });
    const appReceipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:ordinary",
        args: [appSource, appOperation],
    });
    const appResult = appReceipt.canonicalResult;
    s.eq("the normal application route derives the selected distributive nounstem", {
        source: appSource.authorizationStatus,
        choices: appSource.stemFormationOptions,
        operation: appOperation.authorizationStatus,
        relation: appOperation.stemFormation,
        receipt: appReceipt.authorizationStatus,
        result: appResult.authorizationStatus,
        formula: appResult.formulaRealization,
        surface: appResult.wordSurface,
    }, {
        source: "authorized",
        choices: ["plain", "affinity", "distributive-varietal"],
        operation: "authorized",
        relation: "distributive-varietal",
        receipt: "authorized",
        result: "authorized",
        formula: "#0-0(cah-cal)li-0#",
        surface: "cahcalli",
    });
    return s;
}

module.exports = { run };
