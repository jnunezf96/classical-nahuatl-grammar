"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson38-impersonal-patientive-hua",
    "lesson38-impersonal-patientive-hua-lo",
    "lesson38-reflexive-impersonal-patientive",
];

function buildImpersonalVnc(ctx, fields = {}, suffix = "lō") {
    const request = {
        sourceStem: "cochi",
        verbClass: "B",
        sourceValence: "intransitive",
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
    return ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        nonactiveOptionId: option?.optionId || "",
    });
}

function derivePatientive(ctx, fields = {}, suffix = "lō", overrides = {}) {
    const impersonal = buildImpersonalVnc(ctx, fields, suffix);
    const request = {
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: impersonal.resultFrame,
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
        reflexive: result.operationFrame
            ?.impersonalReflexivePatientiveFrame,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson38_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson38-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const hua = derivePatientive(ctx, {
        sourceStem: "cochi", verbClass: "B",
    }, "hua");
    s.eq("typed hua is removed and preceding long i shortens automatically", {
        statuses: [hua.impersonal.authorizationStatus,
            hua.result.authorizationStatus],
        family: hua.family?.selectedFamily,
        active: hua.family?.activeSourceStem,
        impersonal: hua.family?.impersonalSourceStem,
        target: hua.family?.patientiveTargetStem,
        suffix: hua.family?.typedSuffixFamily,
        removed: hua.family?.removedMaterial,
        vowel: hua.family?.precedingVowel,
        behavior: hua.family?.precedingVowelBehavior,
        deletes: hua.family?.huaDeletesCompleteNonactiveMaterial,
        shortens: hua.family?.huaPrecedingLongIShortenedAutomatically,
        vowelChoice: hua.family?.huaVowelBehaviorIsUserChoice,
        nounClass: hua.family?.nounClass,
        classChoice: hua.family?.nounClassIsUserChoice,
        examples: hua.family?.exampleStemMembershipRequired,
    }, {
        statuses: ["authorized", "authorized"],
        family: "hua-impersonal-patientive",
        active: "cochi", impersonal: "cochī-hua", target: "cochi",
        suffix: "hua", removed: "hua", vowel: "ī",
        behavior: "long-i-shortened-to-i", deletes: true,
        shortens: true, vowelChoice: false, nounClass: "tl",
        classChoice: false, examples: false,
    });

    const unlistedHua = derivePatientive(ctx, {
        sourceStem: "xemi", verbClass: "B",
    }, "hua");
    s.eq("an unlisted compatible hua Source follows the same shape rule", {
        status: unlistedHua.result.authorizationStatus,
        target: unlistedHua.family?.patientiveTargetStem,
        behavior: unlistedHua.family?.precedingVowelBehavior,
        preserved: unlistedHua.family
            ?.huaOtherPrecedingVowelQuantityPreserved,
        examples: unlistedHua.family?.exampleStemMembershipRequired,
    }, {
        status: "authorized", target: "xem",
        behavior: "not-applicable", preserved: false,
        examples: false,
    });
    s.eq("a hua alternative belongs to another owner-issued VNC Result", {
        alternative: hua.family
            ?.alternativeFormationRequiresAnotherOwnerIssuedVncResult,
        manual: hua.family?.manualAlternativeFormationAuthorizesThisResult,
        exact: hua.family?.exactImpersonalVncResultIdentityPreserved,
    }, { alternative: true, manual: false, exact: true });

    const layered = derivePatientive(ctx, {
        sourceStem: "chīchi", verbClass: "B",
    }, "hua-lō");
    s.eq("typed inner hua plus outer lō keeps the inner layer", {
        statuses: [layered.impersonal.authorizationStatus,
            layered.result.authorizationStatus],
        reason: layered.result.blockReason,
        selectedSuffix: layered.impersonal.resultFrame
            ?.selectedMachineryFrame?.nonactiveStemRecord?.suffixFamily,
        selectedStem: layered.impersonal.resultFrame
            ?.selectedMachineryFrame?.nonactiveStemRecord?.nonactiveStem,
        family: layered.family?.selectedFamily,
        active: layered.family?.activeSourceStem,
        impersonal: layered.family?.impersonalSourceStem,
        target: layered.family?.patientiveTargetStem,
        morphemes: layered.family?.impersonalSourceMorphemes,
        layered: layered.family?.layeredHuaLoSource,
        inner: layered.family?.innerHuaBoundaryPreserved,
        outer: layered.family?.outerLoDeletesOnlyFinalOAndRetainsL,
        removed: layered.family?.removedMaterial,
        userLayer: layered.family?.deletionLayerSelectedByUser,
        letters: layered.family?.layeredSourceReconstructedFromFinalLetters,
    }, {
        statuses: ["authorized", "authorized"], reason: "",
        selectedSuffix: "hua-lō", selectedStem: "chīchi-hua-lō",
        family: "hua-lō-impersonal-patientive",
        active: "chīchi", impersonal: "chīchi-hua-lō",
        target: "chīchi-hua-l", morphemes: ["chīchi", "hua", "lō"],
        layered: true, inner: true, outer: true, removed: "ō",
        userLayer: false, letters: false,
    });
    const notLayered = derivePatientive(ctx, {
        sourceStem: "pāna", verbClass: "B",
    }, "lō");
    s.eq("final letters without a hua boundary do not invent a layer", {
        status: notLayered.result.authorizationStatus,
        reason: notLayered.result.blockReason,
        family: notLayered.family?.selectedFamily,
        layered: notLayered.family?.layeredHuaLoSource,
        letters: notLayered.family?.layeredSourceReconstructedFromFinalLetters,
    }, {
        status: "authorized", reason: "",
        family: "lō-impersonal-patientive",
        layered: false, letters: false,
    });

    const reciprocal = derivePatientive(ctx, {
        sourceStem: "nōtza", verbClass: "A",
        sourceValence: "human-reciprocal",
    }, "lō");
    s.eq("reciprocal ancestry supplies shuntline ne automatically", {
        statuses: [reciprocal.impersonal.authorizationStatus,
            reciprocal.result.authorizationStatus],
        reasons: [reciprocal.impersonal.blockReason,
            reciprocal.result.blockReason],
        target: reciprocal.family?.patientiveTargetStem,
        ancestry: reciprocal.reflexive
            ?.activeReflexiveOrReciprocalAncestry,
        carriers: reciprocal.reflexive?.carrierSequence,
        inherited: reciprocal.reflexive?.shuntlineNeInheritedAutomatically,
        overlap: reciprocal.reflexive
            ?.passiveImpersonalSurfaceOverlapPossible,
        distinct: reciprocal.reflexive
            ?.passiveAndImpersonalAnalysesRemainDistinct,
        manual: reciprocal.reflexive?.manualNeInsertionAccepted,
    }, {
        statuses: ["authorized", "authorized"], reasons: ["", ""],
        target: "ne-nōtza-l", ancestry: "reciprocal",
        carriers: ["ne"], inherited: true, overlap: true,
        distinct: true, manual: false,
    });

    const reflexiveHuman = derivePatientive(ctx, {
        sourceStem: "pāna", verbClass: "B",
        sourceValence: "multiple-object",
        objectKind: "reflexive",
        sourceObjectRequests: [
            { objectId: "beneficiary", objectKind: "reflexive",
                governor: "directive", derivationalLevel: 1 },
            { objectId: "addressee", objectKind: "nonspecific-human",
                governor: "applicative", derivationalLevel: 2 },
        ],
    }, "lō");
    s.eq("reflexive ne and a surviving human projective object remain together", {
        statuses: [reflexiveHuman.impersonal.authorizationStatus,
            reflexiveHuman.result.authorizationStatus],
        target: reflexiveHuman.family?.patientiveTargetStem,
        ancestry: reflexiveHuman.reflexive
            ?.activeReflexiveOrReciprocalAncestry,
        carriers: reflexiveHuman.reflexive?.carrierSequence,
        projective: reflexiveHuman.reflexive
            ?.retainedProjectiveObjectEvidence.map(item => item.objectKind),
        preserved: reflexiveHuman.reflexive?.projectiveObjectsPreserved,
        disambiguates: reflexiveHuman.reflexive
            ?.projectiveObjectDisambiguatesPassiveFromImpersonal,
        overlap: reflexiveHuman.reflexive
            ?.passiveImpersonalSurfaceOverlapPossible,
        reconstructed: reflexiveHuman.reflexive
            ?.reflexivityReconstructedFromNounstemSurface,
    }, {
        statuses: ["authorized", "authorized"],
        target: "ne-tē-pāna-l", ancestry: "reflexive",
        carriers: ["ne", "tē"], projective: ["nonspecific-human"],
        preserved: true, disambiguates: true, overlap: false,
        reconstructed: false,
    });

    const hostileHua = ctx.evaluateClassicalNahuatlDeverbalNnc({
        ...hua.request,
        patientiveHuaVowelBehavior: "preserve-long-i",
    });
    const hostileLayer = ctx.evaluateClassicalNahuatlDeverbalNnc({
        ...layered.request,
        patientiveLayerDeletion: "delete-inner-hua",
    });
    const hostileReflexive = ctx.evaluateClassicalNahuatlDeverbalNnc({
        ...reflexiveHuman.request,
        patientiveReflexiveCarrier: "omit-ne",
    });
    s.eq("derived vowel, layer, and ne facts are not manual choices", {
        hua: [hostileHua.authorizationStatus, hostileHua.blockReason],
        layer: [hostileLayer.authorizationStatus, hostileLayer.blockReason],
        reflexive: [hostileReflexive.authorizationStatus,
            hostileReflexive.blockReason],
    }, {
        hua: ["blocked",
            "38.1.1c-hua-vowel-behavior-is-derived-from-typed-source"],
        layer: ["blocked",
            "38.1.1d-layer-deletion-is-derived-from-typed-source"],
        reflexive: ["blocked",
            "38.1.2-reflexive-carrier-is-inherited-from-the-vnc-result"],
    });

    const parityPlan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        ...reflexiveHuman.request,
        subjects: ["3sg"],
        states: ["absolutive", "possessive"],
    });
    const parityCoordinates =
        ctx.projectClassicalNahuatlParadigmCoordinates(parityPlan);
    s.eq("reflexive impersonal patientives keep scalar and paradigm parity", {
        status: parityPlan.authorizationStatus,
        count: parityCoordinates.length,
        allScalar: parityCoordinates.every(frame => frame.scalarEquivalent),
        exactSource: parityCoordinates.every(frame => (
            frame.preparedFrame.sourceFrame
                === parityPlan.preparedSourceFrame
        )),
    }, { status: "authorized", count: 2, allScalar: true,
        exactSource: true });

    const cueFrames = [hua.result, layered.result, reciprocal.result,
        reflexiveHuman.result];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame || null,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const cueRoles = [...new Set(cues.map(cue => cue.role))].sort();
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 45 atoms have jobs and all 29 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: cueRoles,
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        records: 45, writing: 29, readingOnly: 16,
        roles: [...GROUPS].sort(), covered: true,
    });
    for (const record of writing) {
        s.eq(`cue:${record.atomId}`, covered.has(record.atomId), true);
    }

    return s;
}

module.exports = { run };
