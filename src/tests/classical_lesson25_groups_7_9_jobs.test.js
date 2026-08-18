"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function buildSource(ctx, stem, {
    verbClass = "B",
    sourceValence = "intransitive",
    sourceSubject = "3sg",
    objectPerson = "3sg",
} = {}) {
    const objectKind = sourceValence === "intransitive"
        ? "none"
        : sourceValence === "mainline-reflexive"
            ? "reflexive"
            : sourceValence;
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: sourceSubject,
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        requestedSourceValence: sourceValence,
        transitivity: sourceValence === "intransitive"
            ? "intransitive"
            : "transitive",
        objectKind,
        objectPerson: sourceValence === "intransitive"
            ? ""
            : sourceValence === "mainline-reflexive"
                ? sourceSubject
                : objectPerson,
    });
}

function derive(ctx, source, targetStem, {
    targetSubject = "1sg",
    causativeObjectKind = "specific-projective",
} = {}) {
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        source,
        { derivationType: "causative" },
    );
    const option = inventory.options.find((candidate) => (
        candidate.targetStem === targetStem
    )) || null;
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
        source,
        {
            derivationType: "causative",
            optionId: option?.optionId || `missing:${targetStem}`,
            targetSubject,
            causativeObjectKind,
        },
    );
    const result = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
        source,
        operation,
        { targetSubject, mood: "indicative", tense: "present" },
    );
    return { source, inventory, option, operation, result };
}

function cueRoles(ctx, frame) {
    return ctx.getClassicalFormulaDerivedAnnotations(
        frame.resultFrame?.formulaRealization || frame.formulaRealization || "",
        frame.resultFrame?.finalTypedVncSlotFrame || null,
        frame,
    ).map((cue) => cue.role);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson25-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson25-basic-causative-transformation",
        "lesson25-double-object-causatives",
        "lesson25-triple-object-causatives",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const caquiSource = buildSource(ctx, "caqui", {
        sourceValence: "specific-projective",
        sourceSubject: "2sg",
        objectPerson: "3sg",
    });
    const first = derive(ctx, caquiSource, "caquī-tiā", {
        targetSubject: "1sg",
    });
    const second = derive(ctx, first.result, "caquī-ti-l-tiā", {
        targetSubject: "3sg",
    });
    const reflexiveSource = buildSource(ctx, "petlāhua", {
        verbClass: "A",
        sourceValence: "mainline-reflexive",
        sourceSubject: "1sg",
    });
    const retainedReflexive = derive(
        ctx,
        reflexiveSource,
        "petlāhua-l-tiā",
        { targetSubject: "2sg" },
    );
    const equalSource = buildSource(ctx, "chōca", {
        verbClass: "A",
        sourceSubject: "3pl",
    });
    const equalInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        equalSource,
        { derivationType: "causative" },
    );
    const equalOption = equalInventory.options.find((candidate) => (
        candidate.targetStem === "chōc-tiā"
    ));
    const equalRequired = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
        equalSource,
        {
            derivationType: "causative",
            optionId: equalOption?.optionId || "missing:chōc-tiā",
            targetSubject: "3pl",
        },
    );
    const equalReflexive = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
        equalSource,
        {
            derivationType: "causative",
            optionId: equalOption?.optionId || "missing:chōc-tiā",
            targetSubject: "3pl",
            causativeObjectKind: "mainline-reflexive",
        },
    );
    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const impersonalRequest = {
        sourceStem: "quīza",
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "2sg",
        objectKind: "none",
        objectPerson: "",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "nonspecific-human",
        sourceVoice: "impersonal",
        requestedVoice: "active",
    };
    const impersonalPreview = application.evaluate(impersonalRequest);
    const impersonalOption = impersonalPreview.controlFrame
        ?.derivationOptionInventory?.options?.find((candidate) => (
            candidate.targetStem === "quix-tiā"
        ));
    const impersonal = application.evaluate({
        ...impersonalRequest,
        derivationOptionId: impersonalOption?.optionId || "missing:quix-tiā",
    });

    const firstPositions = first.result.targetObjectClusterFrame?.positions || [];
    const secondPositions = second.result.targetObjectClusterFrame?.positions || [];
    const observations = {
        "lesson25-basic-causative-transformation": {
            activeTransfer: [
                first.operation.authorizationStatus,
                first.operation.sourceSubject,
                first.operation.targetSubject,
                first.operation.participantTransformFrame
                    ?.addedObjectRequest?.objectKind,
                first.operation.participantTransformFrame
                    ?.addedObjectRequest?.objectPerson,
                first.operation.participantTransformFrame
                    ?.addedObjectRequest?.governor,
            ],
            genuineCoreferenceChoice: [
                equalRequired.authorizationStatus,
                equalRequired.blockReason,
                equalRequired.participantTransformFrame
                    ?.allowedCausativeObjectKinds,
                equalReflexive.authorizationStatus,
                equalReflexive.participantTransformFrame
                    ?.addedObjectRequest?.objectKind,
            ],
            impersonalTransfer: [
                impersonal.authorizationStatus,
                impersonal.resultFrame?.derivationOperationFrame
                    ?.participantTransformFrame?.sourceVoice,
                impersonal.resultFrame?.derivationOperationFrame
                    ?.participantTransformFrame?.addedObjectRequest?.objectKind,
            ],
            cue: cueRoles(ctx, first.result)
                .includes("lesson25-basic-causative-transformation"),
        },
        "lesson25-double-object-causatives": {
            hierarchy: first.operation.targetObjectRequests.map((request) => [
                request.objectKind,
                request.objectPerson,
                request.governor,
                request.derivationalLevel,
            ]),
            positions: firstPositions.map((position) => [
                position.objectId,
                position.prominence,
                position.sounded,
                position.governor,
            ]),
            retainedReflexive: [
                retainedReflexive.operation.authorizationStatus,
                retainedReflexive.operation.participantTransformFrame
                    ?.retainedSourceReflexiveShuntlineRuleFrame?.ruleId,
                retainedReflexive.result.formulaRealization,
            ],
            cue: cueRoles(ctx, first.result)
                .includes("lesson25-double-object-causatives"),
        },
        "lesson25-triple-object-causatives": {
            recursiveSource: [
                ctx.isClassicalNahuatlDerivedVncMachineryFrame(first.result),
                second.inventory.authorizationStatus,
                second.option?.targetStem || "",
                second.operation.authorizationStatus,
            ],
            hierarchy: second.operation.targetObjectRequests.map((request) => [
                request.objectKind,
                request.objectPerson,
                request.governor,
                request.derivationalLevel,
            ]),
            positions: secondPositions.map((position) => [
                position.objectId,
                position.prominence,
                position.sounded,
                position.governor,
            ]),
            cue: cueRoles(ctx, second.result)
                .includes("lesson25-triple-object-causatives"),
        },
    };
    const expected = {
        "lesson25-basic-causative-transformation": {
            activeTransfer: [
                "authorized", "2sg", "1sg",
                "specific-projective", "2sg", "causative",
            ],
            genuineCoreferenceChoice: [
                "blocked",
                "classical-vnc-causative-causee-valence-selection-required",
                ["specific-projective", "reflexive"],
                "authorized",
                "reflexive",
            ],
            impersonalTransfer: ["authorized", "impersonal", "nonspecific-human"],
            cue: true,
        },
        "lesson25-double-object-causatives": {
            hierarchy: [
                ["specific-projective", "3sg", "directive", 1],
                ["specific-projective", "2sg", "causative", 2],
            ],
            positions: [
                ["causative-object", "mainline", true, "causative"],
                ["source-object-1", "shuntline", false, "directive"],
            ],
            retainedReflexive: [
                "authorized",
                "cn-vnc-retained-source-mainline-reflexive-to-shuntline-ne",
                "#ti-0+n-ēch+ne(petlāhua-l-tia)0+0-0#",
            ],
            cue: true,
        },
        "lesson25-triple-object-causatives": {
            recursiveSource: [true, "authorized", "caquī-ti-l-tiā", "authorized"],
            hierarchy: [
                ["specific-projective", "3sg", "directive", 1],
                ["specific-projective", "2sg", "causative", 2],
                ["specific-projective", "1sg", "causative", 3],
            ],
            positions: [
                ["causative-object-3", "mainline", true, "causative"],
                ["causative-object", "shuntline", false, "causative"],
                ["source-object-1", "shuntline", false, "directive"],
            ],
            cue: true,
        },
    };
    const mutations = {
        "lesson25-basic-causative-transformation": [
            first.operation.participantTransformFrame
                ?.addedObjectRequest?.objectPerson !== "2sg",
            equalRequired.authorizationStatus !== "blocked",
            equalReflexive.authorizationStatus === "blocked",
            impersonal.authorizationStatus !== "authorized",
            !cueRoles(ctx, first.result)
                .includes("lesson25-basic-causative-transformation"),
        ],
        "lesson25-double-object-causatives": [
            first.operation.targetObjectRequests.length !== 2,
            firstPositions[0]?.prominence !== "mainline",
            firstPositions[1]?.prominence !== "shuntline",
            retainedReflexive.operation.authorizationStatus !== "authorized",
            !cueRoles(ctx, first.result)
                .includes("lesson25-double-object-causatives"),
        ],
        "lesson25-triple-object-causatives": [
            second.operation.targetObjectRequests.length !== 3,
            secondPositions.length !== 3,
            second.operation.authorizationStatus !== "authorized",
            !ctx.isClassicalNahuatlDerivedVncMachineryFrame(first.result),
            !cueRoles(ctx, second.result)
                .includes("lesson25-triple-object-causatives"),
        ],
    };

    s.eq("accepted Lesson 25 Groups 7-9 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => (
            record.proposedDirection === "READING_ONLY"
        )).length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 368, records: 368, both: 98, readingOnly: 270, unique: 368 });
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
