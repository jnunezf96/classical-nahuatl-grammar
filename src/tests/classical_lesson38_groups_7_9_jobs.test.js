"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson38-projective-impersonal-patientive-lo",
    "lesson38-projective-impersonal-patientive-o",
    "lesson38-projective-impersonal-patientive-hua",
];

function buildImpersonalVnc(ctx, fields = {}, suffix = "lō") {
    const request = {
        sourceStem: "pāna",
        verbClass: "B",
        sourceValence: "projective-nonhuman",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        voice: "impersonal",
        ...fields,
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const option = (preview.controlFrame
        ?.nonactiveOptionInventory?.options || []).find(item => (
        item.suffixFamily === suffix
        || item.optionId.startsWith(`${suffix}:`)
    ));
    return {
        preview,
        option,
        result: ctx.evaluateClassicalNahuatlVncApplication({
            ...request,
            nonactiveOptionId: option?.optionId || "",
        }),
    };
}

function derivePatientive(ctx, fields = {}, suffix = "lō", overrides = {}) {
    const impersonal = buildImpersonalVnc(ctx, fields, suffix);
    const request = {
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: impersonal.result.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
        humanness: "nonhuman",
        ...overrides,
    };
    const result = ctx.evaluateClassicalNahuatlDeverbalNnc(request);
    return {
        impersonal,
        request,
        result,
        family: result.operationFrame?.impersonalPatientiveFamilyFrame,
        objects: result.operationFrame?.impersonalPatientiveObjectFrame,
        projective: result.operationFrame
            ?.impersonalProjectivePatientiveFrame,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson38_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson38-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const mainlineLo = derivePatientive(ctx, {
        sourceStem: "pāna", verbClass: "B",
        sourceValence: "projective-nonhuman",
    }, "lō");
    s.eq("projective tla remains on the mainline lō patientive", {
        statuses: [mainlineLo.impersonal.result.authorizationStatus,
            mainlineLo.result.authorizationStatus],
        target: mainlineLo.projective?.patientiveTargetStem,
        carriers: mainlineLo.projective?.carrierSequence,
        direct: mainlineLo.projective?.directPatientCarrier,
        position: mainlineLo.projective?.directPatientCarrierPosition,
        nonhuman: mainlineLo.projective?.nonhumanDirectObjectPreserved,
        lo: mainlineLo.projective?.loDeletesFinalOAndRetainsL,
        exampleGate: mainlineLo.projective?.exampleStemMembershipRequired,
    }, {
        statuses: ["authorized", "authorized"], target: "tla-pāna-l",
        carriers: ["tla"], direct: "tla", position: "mainline",
        nonhuman: true, lo: true, exampleGate: false,
    });

    const doubleLo = derivePatientive(ctx, {
        sourceStem: "pāna", verbClass: "B",
        sourceValence: "multiple-object",
        objectKind: "nonspecific-nonhuman",
        sourceObjectRequests: [
            { objectId: "recipient", objectKind: "nonspecific-human",
                governor: "directive", derivationalLevel: 1 },
            { objectId: "theme", objectKind: "nonspecific-nonhuman",
                governor: "applicative", derivationalLevel: 2 },
        ],
    }, "lō");
    s.eq("double-object tē+tla topology remains typed and ordered", {
        statuses: [doubleLo.impersonal.result.authorizationStatus,
            doubleLo.result.authorizationStatus],
        target: doubleLo.projective?.patientiveTargetStem,
        carriers: doubleLo.projective?.carrierSequence,
        position: doubleLo.projective?.directPatientCarrierPosition,
        human: doubleLo.projective?.humanRecipientPreserved,
        double: doubleLo.projective?.doubleObjectTeTlaPattern,
        topology: doubleLo.projective?.activeObjectTopologyPreserved,
    }, {
        statuses: ["authorized", "authorized"],
        target: "tē-tla-pāna-l", carriers: ["tē", "tla"],
        position: "shuntline-after-human-recipient", human: true,
        double: true, topology: true,
    });

    const mainlineO = derivePatientive(ctx, {
        sourceStem: "pāna", verbClass: "B",
        sourceValence: "projective-nonhuman",
    }, "ō");
    s.eq("projective tla remains when typed ō is removed", {
        statuses: [mainlineO.impersonal.result.authorizationStatus,
            mainlineO.result.authorizationStatus],
        impersonal: mainlineO.projective?.impersonalSourceStem,
        target: mainlineO.projective?.patientiveTargetStem,
        suffix: mainlineO.projective?.typedSuffixFamily,
        deletes: mainlineO.projective?.oDeletesCompleteNonactiveSuffix,
        patient: mainlineO.projective?.patientiveSubjectReferentAnimacy,
    }, {
        statuses: ["authorized", "authorized"],
        impersonal: "pān-ō", target: "tla-pān", suffix: "ō",
        deletes: true, patient: "nonhuman",
    });

    const finalAHua = derivePatientive(ctx, {
        sourceStem: "xema", verbClass: "B",
        sourceValence: "projective-nonhuman",
    }, "hua");
    s.eq("typed projective final a receives hua and becomes short i", {
        statuses: [finalAHua.impersonal.result.authorizationStatus,
            finalAHua.result.authorizationStatus],
        option: finalAHua.impersonal.option?.optionId || "",
        impersonal: finalAHua.projective?.impersonalSourceStem,
        target: finalAHua.projective?.patientiveTargetStem,
        activeFinal: finalAHua.projective?.activeSourceFinalVowel,
        behavior: finalAHua.projective?.precedingVowelBehavior,
        replacement: finalAHua.projective?.activeFinalAReplacedByShortI,
        userVowel: finalAHua.projective?.vowelBehaviorSelectedByUser,
    }, {
        statuses: ["authorized", "authorized"],
        option: "hua:xemī-hua", impersonal: "xemī-hua",
        target: "tla-xemi", activeFinal: "a",
        behavior: "active-final-a-replaced-by-short-i",
        replacement: true, userVowel: false,
    });

    const longHua = derivePatientive(ctx, {
        sourceStem: "xemī", verbClass: "B",
        sourceValence: "projective-nonhuman",
    }, "hua");
    s.eq("a phonemically long active vowel stays long after hua deletion", {
        statuses: [longHua.impersonal.result.authorizationStatus,
            longHua.result.authorizationStatus],
        impersonal: longHua.projective?.impersonalSourceStem,
        target: longHua.projective?.patientiveTargetStem,
        activeFinal: longHua.projective?.activeSourceFinalVowel,
        behavior: longHua.projective?.precedingVowelBehavior,
        preserved: longHua.projective?.activeLongVowelPreserved,
    }, {
        statuses: ["authorized", "authorized"],
        impersonal: "xemī-hua", target: "tla-xemī",
        activeFinal: "ī", behavior: "active-source-long-vowel-preserved",
        preserved: true,
    });

    const intransitiveFinalA = buildImpersonalVnc(ctx, {
        sourceStem: "xema", verbClass: "B",
        sourceValence: "intransitive",
    }, "hua");
    s.eq("final a shape alone does not license the projective hua route", {
        huaOption: Boolean(intransitiveFinalA.option),
        hasProjectiveRoute: (intransitiveFinalA.preview.controlFrame
            ?.nonactiveOptionInventory?.options || []).some(item => (
            item.ruleId === "cn-l38-1-3c-projective-final-a-hua"
        )),
    }, { huaOption: false, hasProjectiveRoute: false });

    const hostileCarrier = ctx.evaluateClassicalNahuatlDeverbalNnc({
        ...mainlineLo.request,
        patientiveProjectiveCarrier: "omit-tla",
    });
    const hostilePlacement = ctx.evaluateClassicalNahuatlDeverbalNnc({
        ...doubleLo.request,
        patientiveProjectivePlacement: "mainline",
    });
    const hostileVowel = ctx.evaluateClassicalNahuatlDeverbalNnc({
        ...finalAHua.request,
        patientiveProjectiveVowelAnalysis: "preserve-a",
    });
    s.eq("object carriers, placement, and hua vowel behavior are not manual", {
        carrier: [hostileCarrier.authorizationStatus,
            hostileCarrier.blockReason],
        placement: [hostilePlacement.authorizationStatus,
            hostilePlacement.blockReason],
        vowel: [hostileVowel.authorizationStatus,
            hostileVowel.blockReason],
    }, {
        carrier: ["blocked",
            "38.1.3-projective-object-and-vowel-facts-are-inherited-from-the-vnc-result"],
        placement: ["blocked",
            "38.1.3-projective-object-and-vowel-facts-are-inherited-from-the-vnc-result"],
        vowel: ["blocked",
            "38.1.3-projective-object-and-vowel-facts-are-inherited-from-the-vnc-result"],
    });

    const parityPlan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        ...doubleLo.request,
        subjects: ["3sg"],
        states: ["absolutive", "possessive"],
    });
    const parityCoordinates =
        ctx.projectClassicalNahuatlParadigmCoordinates(parityPlan);
    s.eq("projective patientives keep scalar and paradigm parity", {
        status: parityPlan.authorizationStatus,
        count: parityCoordinates.length,
        allScalar: parityCoordinates.every(frame => frame.scalarEquivalent),
        exactSource: parityCoordinates.every(frame => (
            frame.preparedFrame.sourceFrame
                === parityPlan.preparedSourceFrame
        )),
    }, { status: "authorized", count: 2, allScalar: true,
        exactSource: true });

    const cueFrames = [mainlineLo.result, doubleLo.result, mainlineO.result,
        finalAHua.result, longHua.result];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame || null,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const cueRoles = [...new Set(cues.map(cue => cue.role))].sort();
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 83 atoms have jobs and all 37 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: cueRoles,
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        records: 83, writing: 37, readingOnly: 46,
        roles: [...GROUPS].sort(), covered: true,
    });
    for (const record of writing) {
        s.eq(`cue:${record.atomId}`, covered.has(record.atomId), true);
    }

    return s;
}

module.exports = { run };
