"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function buildSource(ctx, stem, {
    verbClass = "A",
    sourceValence = "intransitive",
    objectKind = sourceValence === "intransitive" ? "none" : sourceValence,
    objectPerson = sourceValence === "intransitive" ? "" : "3sg",
    subject = "3sg",
} = {}) {
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        requestedSourceValence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind,
        objectPerson,
    });
}

function deriveApplicative(ctx, source, targetStem, {
    objectKind = "specific-projective",
    objectPerson = "1sg",
    subject = "3sg",
    mood = "indicative",
} = {}) {
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        source,
        { derivationType: "applicative" },
    );
    const option = inventory.options.find((candidate) => (
        candidate.targetStem === targetStem
    )) || null;
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
        source,
        {
            derivationType: "applicative",
            optionId: option?.optionId || `missing:${targetStem}`,
            applicativeObjectKind: objectKind,
            applicativeObjectPerson: objectPerson,
        },
    );
    const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
        source,
        operation,
        { targetSubject: subject, mood, tense: mood === "indicative" ? "present" : "nonpast" },
    );
    return { source, inventory, option, operation, machinery };
}

function selectDerivation(application, request, targetStem) {
    const preview = application.evaluate(request);
    const option = preview.controlFrame?.derivationOptionInventory?.options
        ?.find((candidate) => candidate.targetStem === targetStem);
    const selectedRequest = {
        ...request,
        derivationOptionId: option?.optionId || `missing:${targetStem}`,
    };
    return { request: selectedRequest, frame: application.evaluate(selectedRequest) };
}

function selectLaterVoice(application, selected, requestedVoice) {
    const preview = application.evaluate({
        ...selected.request,
        requestedVoice,
    });
    const nonactiveOptionId = preview.controlFrame
        ?.nonactiveOptionInventory?.automaticOptionId
        || preview.controlFrame?.nonactiveOptionInventory?.options?.[0]
            ?.optionId
        || "";
    return application.evaluate({
        ...selected.request,
        requestedVoice,
        nonactiveOptionId,
    });
}

function cueRoles(ctx, frame) {
    const result = frame?.resultFrame || frame;
    return ctx.getClassicalFormulaDerivedAnnotations(
        result?.formulaRealization || frame?.formulaRealization || "",
        result?.finalTypedVncSlotFrame || frame?.finalTypedVncSlotFrame || null,
        result,
    ).map((cue) => cue.role);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson26_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson26-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson26-triple-object-applicatives",
        "lesson26-ambiguity-mood-and-voice",
        "lesson26-object-interpretation-and-applicative-unit",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const first = deriveApplicative(
        ctx,
        buildSource(ctx, "mati", {
            verbClass: "B",
            sourceValence: "specific-projective",
        }),
        "machi-liā",
    );
    const triple = deriveApplicative(
        ctx,
        first.machinery,
        "machi-li-liā",
        { objectKind: "nonspecific-human", objectPerson: "" },
    );
    const triplePositions = triple.machinery.targetObjectClusterFrame?.positions || [];
    const reverseSources = triple.operation.reverseSourceAnalyses || [];

    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const mood = selectDerivation(application, {
        sourceStem: "cōhua",
        verbClass: "A",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceSubject: "3sg",
        subject: "3sg",
        mood: "optative",
        tense: "nonpast",
        requestedDerivation: "applicative",
        applicativeObjectKind: "specific-projective",
        applicativeObjectPerson: "1sg",
        requestedVoice: "active",
    }, "cōhu-iā");
    const activeForPassive = selectDerivation(application, {
        ...mood.request,
        mood: "indicative",
        tense: "present",
        requestedVoice: "active",
    }, "cōhu-iā");
    const passive = selectLaterVoice(application, activeForPassive, "passive");
    const activeForImpersonal = selectDerivation(application, {
        sourceStem: "paca",
        verbClass: "A",
        sourceValence: "intransitive",
        objectKind: "none",
        objectPerson: "",
        sourceSubject: "3sg",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "applicative",
        applicativeObjectKind: "nonspecific-human",
        applicativeObjectPerson: "",
        requestedVoice: "active",
    }, "paqui-liā");
    const impersonal = selectLaterVoice(application, activeForImpersonal, "impersonal");

    const human = deriveApplicative(
        ctx,
        buildSource(ctx, "paca"),
        "paqui-liā",
        { objectKind: "nonspecific-human", objectPerson: "" },
    );
    const nonhuman = deriveApplicative(
        ctx,
        buildSource(ctx, "paca"),
        "paqui-liā",
        { objectKind: "nonspecific-nonhuman", objectPerson: "" },
    );
    const specific = deriveApplicative(
        ctx,
        buildSource(ctx, "paca"),
        "paqui-liā",
        { objectKind: "specific-projective", objectPerson: "1sg" },
    );
    const nequiSource = buildSource(ctx, "nequi", {
        verbClass: "B",
        sourceValence: "specific-projective",
    });
    const nequiRoles = ["causative", "applicative"].map((derivationType) => (
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            nequiSource,
            { derivationType },
        ).options.find((option) => option.targetStem === "nec-tiā")
    ));
    const specificPosition = first.machinery.targetObjectClusterFrame
        ?.positions?.find((position) => position.objectId === "applicative-object");

    const observations = {
        "lesson26-triple-object-applicatives": {
            recursiveSource: [
                ctx.isClassicalNahuatlDerivedVncMachineryFrame(first.machinery),
                triple.inventory.authorizationStatus,
                triple.option?.targetStem || "",
                triple.operation.authorizationStatus,
            ],
            hierarchy: triple.operation.targetObjectRequests.map((request) => [
                request.objectId,
                request.objectKind,
                request.governor,
                request.derivationalLevel,
            ]),
            positions: triplePositions.map((position) => [
                position.objectId,
                position.prominence,
                position.sounded,
                position.carrier,
            ]),
            formula: triple.machinery.formulaRealization,
            cue: cueRoles(ctx, triple.machinery)
                .includes("lesson26-triple-object-applicatives"),
        },
        "lesson26-ambiguity-mood-and-voice": {
            analyses: reverseSources.map((analysis) => [
                analysis.analysisStatus,
                analysis.generationAuthority,
                analysis.formulaAuthority,
                analysis.surfaceAuthority,
            ]),
            mood: [
                mood.frame.authorizationStatus,
                mood.frame.resultFrame?.formulaRealization,
                mood.frame.resultFrame?.surfaceRealization,
                cueRoles(ctx, mood.frame)
                    .includes("lesson26-ambiguity-mood-and-voice"),
            ],
            passive: [
                passive.authorizationStatus,
                passive.resultFrame?.selectedVoice,
                passive.resultFrame?.formulaRealization,
                passive.resultFrame?.surfaceRealization,
                passive.resultFrame?.selectedMachineryFrame
                    ?.voiceTransformationFrame?.targetObjectClusterFrame
                    ?.positions?.length,
                cueRoles(ctx, passive)
                    .includes("lesson26-ambiguity-mood-and-voice"),
            ],
            impersonal: [
                impersonal.authorizationStatus,
                impersonal.resultFrame?.selectedVoice,
                impersonal.resultFrame?.formulaRealization,
                impersonal.resultFrame?.surfaceRealization,
                cueRoles(ctx, impersonal)
                    .includes("lesson26-ambiguity-mood-and-voice"),
            ],
        },
        "lesson26-object-interpretation-and-applicative-unit": {
            interpretations: [human, nonhuman, specific].map((entry) => [
                entry.operation.participantTransformFrame?.addedObjectRequest?.objectKind,
                entry.operation.participantTransformFrame?.addedObjectRequest?.objectPerson,
                entry.machinery.formulaRealization,
            ]),
            unit: [
                specificPosition?.objectId,
                specificPosition?.governorUnitFrame?.objectFunction,
                specificPosition?.governorUnitFrame?.governor,
                specificPosition?.governorUnitFrame?.requiredStemOperation,
                specificPosition?.governorUnitFrame?.discontinuousUnit,
            ],
            roleComparison: nequiRoles.map((option) => [
                option?.derivationType,
                option?.targetStem,
                option?.derivationSubtype,
            ]),
            cues: [human, nonhuman, specific].every((entry) => (
                cueRoles(ctx, entry.machinery)
                    .includes("lesson26-object-interpretation-and-applicative-unit")
            )),
        },
    };
    const expected = {
        "lesson26-triple-object-applicatives": {
            recursiveSource: [true, "authorized", "machi-li-liā", "authorized"],
            hierarchy: [
                ["source-object-1", "specific-projective", "directive", 1],
                ["applicative-object", "specific-projective", "applicative", 2],
                ["applicative-object-3", "nonspecific-human", "applicative", 3],
            ],
            positions: [
                ["applicative-object", "shuntline", true, "n-ēch"],
                ["source-object-1", "shuntline", false, "0-0"],
                ["applicative-object-3", "mainline", true, "tē"],
            ],
            formula: "#0-0+n-ēch+⎕-0+tē(machi-li-lia)0+0-0#",
            cue: true,
        },
        "lesson26-ambiguity-mood-and-voice": {
            analyses: [
                ["identified-source", false, false, false],
                ["canonically-licensed-role-alternative", false, false, false],
            ],
            mood: ["authorized", "#0-0+n-ēch+⎕-0(cōhu-i)0+⎕-0#", "nēchcōhui", true],
            passive: ["authorized", "passive", "#ni-0+⎕-0(cōhu-i-lo)0+0-0#", "nicōhuilo", 1, true],
            impersonal: ["authorized", "impersonal", "#0-0+tē(paqui-li-lo)0+0-0#", "tēpaquililo", true],
        },
        "lesson26-object-interpretation-and-applicative-unit": {
            interpretations: [
                ["nonspecific-human", "", "#0-0+tē(paqui-lia)0+0-0#"],
                ["nonspecific-nonhuman", "", "#0-0+tla(paqui-lia)0+0-0#"],
                ["specific-projective", "1sg", "#0-0+n-ēch(paqui-lia)0+0-0#"],
            ],
            unit: ["applicative-object", "applicative", "applicative", "applicative-derivational-suffix", true],
            roleComparison: [
                ["causative", "nec-tiā", "type-two"],
                ["applicative", "nec-tiā", "type-three"],
            ],
            cues: true,
        },
    };
    const mutations = {
        "lesson26-triple-object-applicatives": [
            triple.operation.targetObjectRequests.length !== 3,
            triplePositions.filter((position) => position.prominence === "shuntline").length !== 2,
            !cueRoles(ctx, triple.machinery)
                .includes("lesson26-triple-object-applicatives"),
        ],
        "lesson26-ambiguity-mood-and-voice": [
            reverseSources.length !== 2,
            mood.frame.authorizationStatus !== "authorized",
            passive.resultFrame?.selectedVoice !== "passive",
            impersonal.resultFrame?.selectedVoice !== "impersonal",
            !cueRoles(ctx, mood.frame)
                .includes("lesson26-ambiguity-mood-and-voice"),
        ],
        "lesson26-object-interpretation-and-applicative-unit": [
            human.operation.participantTransformFrame?.addedObjectRequest?.objectKind !== "nonspecific-human",
            nonhuman.operation.participantTransformFrame?.addedObjectRequest?.objectKind !== "nonspecific-nonhuman",
            specificPosition?.governorUnitFrame?.requiredStemOperation !== "applicative-derivational-suffix",
            nequiRoles.some((option) => option?.targetStem !== "nec-tiā"),
            !cueRoles(ctx, specific.machinery)
                .includes("lesson26-object-interpretation-and-applicative-unit"),
        ],
    };

    s.eq("accepted Lesson 26 Groups 10-12 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => record.proposedDirection === "READING_ONLY").length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 169, records: 169, both: 86, readingOnly: 83, unique: 169 });
    for (const record of writing) {
        s.eq(
            `${record.atomId} has its exact accepted application job`,
            observations[record.reviewGroupId],
            expected[record.reviewGroupId],
        );
        s.eq(
            `mutation:${record.atomId} fails when its accepted job is contradicted`,
            mutations[record.reviewGroupId].some(Boolean),
            false,
        );
    }
    return s;
}

module.exports = { run };
