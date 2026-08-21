"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson37-reflexive-passive-patientive",
    "lesson37-double-object-passive-patientive",
];

function buildPassive(ctx, fields = {}) {
    const request = {
        sourceStem: "maca",
        verbClass: "A",
        sourceValence: "specific-projective",
        subject: "3sg",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "passive",
        voice: "passive",
        ...fields,
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const inventory = preview.controlFrame?.nonactiveOptionInventory;
    const optionId = fields.nonactiveOptionId
        || inventory?.automaticOptionId
        || inventory?.options?.[0]?.optionId
        || "";
    return optionId && !request.nonactiveOptionId
        ? ctx.evaluateClassicalNahuatlVncApplication({
            ...request, nonactiveOptionId: optionId,
        })
        : preview;
}

function patientive(ctx, passive, overrides = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "passive-core",
        canonicalVncResult: passive.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        humanness: "human",
        ...overrides,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson37_groups_19_20_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson37-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const reflexivePassive = buildPassive(ctx, {
        sourceStem: "zahua",
        sourceValence: "mainline-reflexive",
        objectKind: "",
        objectPerson: "",
    });
    const reflexive = patientive(ctx, reflexivePassive, {
        animacy: "nonanimate",
        humanness: "nonhuman",
    });
    const reflexiveFrame = reflexive.operationFrame
        ?.passivePatientiveFamilyFrame?.reflexivePassivePatientiveFrame;
    s.eq("reflexive passive ancestry supplies shuntline ne automatically", {
        statuses: [reflexivePassive.authorizationStatus,
            reflexive.authorizationStatus],
        passiveFormula: reflexivePassive.resultFrame?.formulaRealization,
        target: reflexive.operationFrame?.targetStems?.restrictedUse,
        pattern: reflexive.operationFrame?.sourceObjectPattern,
        ancestry: reflexiveFrame?.activeReflexiveAncestryPreserved,
        carrier: reflexiveFrame?.shuntlineReflexiveCarrier,
        inherited: reflexiveFrame?.shuntlineReflexiveInheritedAutomatically,
        manual: reflexiveFrame?.manualNeInsertionAccepted,
        surface: reflexiveFrame?.reflexivityReconstructedFromSurface,
    }, {
        statuses: ["authorized", "authorized"],
        passiveFormula: "#0-0+ne(zahua-lo)0+0-0#",
        target: "ne-zahua-l",
        pattern: "reflexive",
        ancestry: true,
        carrier: "ne",
        inherited: true,
        manual: false,
        surface: false,
    });
    s.eq("the reflexive Result keeps typed referent and lexical boundaries", {
        exact: reflexiveFrame?.canonicalPassiveVncResult
            === reflexivePassive.resultFrame,
        referent: reflexiveFrame?.patientReferent,
        animacy: reflexiveFrame?.targetAnimacy,
        humanness: reflexiveFrame?.targetHumanness,
        compositional: reflexiveFrame?.compositionalReading,
        lexical: reflexiveFrame?.lexicalReadings,
        lexicalTyped:
            reflexiveFrame?.lexicalReadingRequiresTypedSourceOrContext,
    }, {
        exact: true,
        referent: "3sg",
        animacy: "nonanimate",
        humanness: "nonhuman",
        compositional: "thing-that-has-undergone-the-reflexive-action",
        lexical: [],
        lexicalTyped: true,
    });

    const clothedPassive = buildPassive(ctx, {
        sourceStem: "maca",
        sourceValence: "multiple-object",
        objectKind: "multiple-object",
        objectPerson: "",
        objectRequests: [
            {
                objectId: "wearer",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                governor: "directive",
                derivationalLevel: 1,
            },
            {
                objectId: "garment",
                objectKind: "nonspecific-nonhuman",
                governor: "causative",
                derivationalLevel: 2,
            },
        ],
    });
    const clothed = patientive(ctx, clothedPassive);
    const clothedFrame = clothed.operationFrame
        ?.passivePatientiveFamilyFrame?.doubleObjectPassivePatientiveFrame;
    s.eq("double-object passive patientive retains only the surviving tla", {
        statuses: [clothedPassive.authorizationStatus,
            clothed.authorizationStatus],
        target: clothed.operationFrame?.targetStems?.restrictedUse,
        sourceObjects: clothedFrame?.activeObjectEvidence?.map(item => (
            item.objectId
        )),
        promoted: clothedFrame?.promotedObjectEvidence?.objectId,
        survivor: clothedFrame?.survivingInternalObjects?.map(item => (
            [item.objectId, item.objectKind, item.carrier]
        )),
        one: clothedFrame?.onlyPassiveSurvivingObjectRetained,
        deletion: clothedFrame?.humanObjectDeletionLicensed,
    }, {
        statuses: ["authorized", "authorized"],
        target: "tla-mac",
        sourceObjects: ["wearer", "garment"],
        promoted: "wearer",
        survivor: [["garment", "nonspecific-nonhuman", "tla"]],
        one: true,
        deletion: false,
    });

    const giftPassive = buildPassive(ctx, {
        sourceStem: "maca",
        sourceValence: "multiple-object",
        objectKind: "multiple-object",
        objectPerson: "",
        objectRequests: [
            {
                objectId: "gift",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                governor: "directive",
                derivationalLevel: 1,
            },
            {
                objectId: "recipient",
                objectKind: "nonspecific-human",
                governor: "applicative",
                derivationalLevel: 2,
            },
        ],
    });
    const retainedTe = patientive(ctx, giftPassive);
    const deletedTe = patientive(ctx, giftPassive, {
        passiveHumanObjectRealization: "delete",
    });
    const giftFrame = retainedTe.operationFrame
        ?.passivePatientiveFamilyFrame?.doubleObjectPassivePatientiveFrame;
    const deletedGiftFrame = deletedTe.operationFrame
        ?.passivePatientiveFamilyFrame?.doubleObjectPassivePatientiveFrame;
    s.eq("surviving tē exposes only the licensed retain or delete choice", {
        statuses: [giftPassive.authorizationStatus,
            retainedTe.authorizationStatus, deletedTe.authorizationStatus],
        retained: retainedTe.operationFrame?.targetStems?.restrictedUse,
        deleted: deletedTe.operationFrame?.targetStems?.restrictedUse,
        survivor: giftFrame?.retainedObjectCarrier,
        options: giftFrame?.humanObjectRealizationOptions,
        selectedRetain: giftFrame?.selectedHumanObjectRealization,
        selectedDelete: deletedGiftFrame?.selectedHumanObjectRealization,
        arbitrary: giftFrame?.arbitraryObjectDeletionAccepted,
        prefixOrder: giftFrame?.participantRolesInferredFromPrefixOrder,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        retained: "tē-mac",
        deleted: "mac",
        survivor: "tē",
        options: ["retain", "delete"],
        selectedRetain: "retain",
        selectedDelete: "delete",
        arbitrary: false,
        prefixOrder: false,
    });

    const badDeletion = patientive(ctx, clothedPassive, {
        passiveHumanObjectRealization: "delete",
    });
    const copied = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "passive-core",
        canonicalVncResult: { ...giftPassive.resultFrame },
    });
    s.eq("only typed participant facts and exact owner identity authorize", {
        badDeletion: [badDeletion.authorizationStatus,
            badDeletion.blockReason],
        copied: [copied.authorizationStatus, copied.blockReason],
    }, {
        badDeletion: ["blocked",
            "37.9.3-human-object-deletion-lexical-license-required"],
        copied: ["blocked", "exact-owner-issued-vnc-result-required"],
    });

    const productivePassive = buildPassive(ctx, {
        sourceStem: "paca",
        sourceValence: "multiple-object",
        objectKind: "multiple-object",
        objectPerson: "",
        objectRequests: [
            {
                objectId: "theme",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                governor: "directive",
                derivationalLevel: 1,
            },
            {
                objectId: "human",
                objectKind: "nonspecific-human",
                governor: "applicative",
                derivationalLevel: 2,
            },
        ],
    });
    const productive = patientive(ctx, productivePassive, {
        passiveHumanObjectRealization: "delete",
    });
    s.eq("Source shape changes do not create a double-object stem list", {
        statuses: [productivePassive.authorizationStatus,
            productive.authorizationStatus],
        target: productive.operationFrame?.targetStems?.restrictedUse,
        examples: productive.operationFrame?.passivePatientiveFamilyFrame
            ?.exampleStemMembershipRequired,
    }, {
        statuses: ["authorized", "authorized"],
        target: "pac",
        examples: false,
    });

    const cueFrames = [reflexive, clothed, retainedTe, deletedTe];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame || null,
            frame,
        )
    )).filter(cue => GROUPS.includes(cue.role));
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all 35 atoms have jobs and all 18 writing atoms have cues", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        roles: [...new Set(cues.map(cue => cue.role))].sort(),
        covered: writing.every(record => covered.has(record.atomId)),
    }, {
        records: 35,
        writing: 18,
        readingOnly: 17,
        roles: [...GROUPS].sort(),
        covered: true,
    });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
    }
    return s;
}

module.exports = { run };
