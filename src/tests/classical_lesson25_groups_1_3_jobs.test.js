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
        objectKind: sourceValence === "intransitive"
            ? "none"
            : sourceValence,
        objectPerson: sourceValence === "intransitive" ? "" : objectPerson,
    });
}

function inspectOption(ctx, stem, targetStem, options = {}) {
    const source = buildSource(ctx, stem, options);
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        source,
        { derivationType: "causative" },
    );
    const option = inventory.options.find((candidate) => (
        candidate.derivationSubtype === "type-two"
        && candidate.targetStem === targetStem
    )) || null;
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
        source,
        {
            derivationType: "causative",
            optionId: option?.optionId || `missing:${stem}:${targetStem}`,
            targetSubject: "1sg",
            causativeObjectKind: "specific-projective",
        },
    );
    const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
        source,
        operation,
        {
            mood: "indicative",
            tense: "present",
            targetSubject: "1sg",
        },
    );
    return { source, inventory, option, operation, machinery };
}

function evaluateTarget(ctx, baseRequest, targetStem, extra = {}) {
    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const preview = application.evaluate({ ...baseRequest, ...extra });
    const option = preview.controlFrame?.derivationOptionInventory?.options
        ?.find((candidate) => candidate.targetStem === targetStem) || null;
    const scalar = application.evaluate({
        ...baseRequest,
        ...extra,
        derivationOptionId: option?.optionId || `missing:${targetStem}`,
    });
    return { application, preview, option, scalar };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson25-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson25-type-two-foundation",
        "lesson25-hua-source-routes",
        "lesson25-o-ohua-source-and-machtia",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const tomi = inspectOption(ctx, "tomi", "tom-tiā");
    const xochi = inspectOption(ctx, "xochi", "xochī-tiā");
    const caqui = inspectOption(ctx, "caqui", "caqui-tiā", {
        verbClass: "B",
        sourceValence: "specific-projective",
    });
    const neci = inspectOption(ctx, "nēci", "nēxi-tiā");
    const ihza = inspectOption(ctx, "ihza", "ihxi-tiā", { verbClass: "A" });
    const mixihui = inspectOption(ctx, "mīx-i-hui", "mīx-i-huī-tiā");
    const mahui = inspectOption(ctx, "mahui", "mauh-tiā");
    const quemi = inspectOption(ctx, "quēmi", "quēn-tiā", {
        sourceValence: "specific-projective",
    });
    const yauh = inspectOption(ctx, "yauh", "huīca", { verbClass: "D" });
    const huallauh = inspectOption(ctx, "huāllauh", "huīca", {
        verbClass: "D",
    });

    const machBase = {
        sourceStem: "mati",
        verbClass: "B",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceSubject: "3sg",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        sourceVoice: "passive",
        sourceNonactiveOptionId: "ō:mach-ō",
        requestedVoice: "active",
    };
    const machPreview = evaluateTarget(ctx, machBase, "mach-tiā");
    const machSilent = evaluateTarget(ctx, machBase, "mach-tiā", {
        causativeSpecificShuntlineRealization: "silent",
    });
    const machSounded = evaluateTarget(ctx, machBase, "mach-tiā", {
        causativeSpecificShuntlineRealization: "sounded",
    });

    const cueRoles = (frame) => ctx.getClassicalFormulaDerivedAnnotations(
        frame.resultFrame?.formulaRealization || frame.formulaRealization || "",
        frame.resultFrame?.finalTypedVncSlotFrame || null,
        frame,
    ).map((cue) => cue.role);
    const tomiCues = cueRoles(tomi.machinery);
    const xochiCues = cueRoles(xochi.machinery);
    const machCues = cueRoles(machSilent.scalar);

    const observations = {
        "lesson25-type-two-foundation": {
            openTypeTwo: [
                tomi.inventory.authorizationStatus,
                tomi.option?.targetStem || "",
                tomi.option?.typeTwoInternalBridgeFrame?.nonactiveStem || "",
                tomi.operation.authorizationStatus,
                tomi.operation.participantTransformFrame?.targetObjectRequests?.length,
            ],
            suppletion: [yauh, huallauh].map((entry) => [
                entry.option?.targetStem || "",
                entry.option?.targetConstruction?.operation || "",
                entry.option?.derivationRoute || "",
            ]),
            cue: tomiCues.includes("lesson25-type-two-foundation"),
        },
        "lesson25-hua-source-routes": {
            openShapeNotList: [
                xochi.inventory.authorizationStatus,
                xochi.option?.targetStem || "",
                xochi.option?.lesson20NonactiveStemRecord?.nonactiveStem || "",
                xochi.option?.exactWitness === true,
                xochi.operation.participantTransformFrame?.targetObjectRequests?.length,
            ],
            shapeRoutes: [caqui, neci, ihza, mixihui].map((entry) => [
                entry.option?.targetStem || "",
                entry.option?.typeTwoInternalBridgeFrame?.nonactiveStem || "",
                entry.operation.authorizationStatus,
            ]),
            cue: xochiCues.includes("lesson25-hua-source-routes"),
        },
        "lesson25-o-ohua-source-and-machtia": {
            openOHistory: [
                tomi.option?.targetStem || "",
                tomi.option?.typeTwoInternalBridgeFrame?.nonactiveStem || "",
            ],
            boundaryChanges: [
                mahui.option?.targetStem || "",
                quemi.option?.targetStem || "",
            ],
            shuntlineControl: {
                eligible: machPreview.scalar.controlFrame
                    ?.causativeSpecificShuntlineChoiceEligible,
                allowed: machPreview.scalar.controlFrame
                    ?.allowedCausativeSpecificShuntlineRealizations,
                silent: machSilent.scalar.resultFrame?.formulaRealization || "",
                sounded: machSounded.scalar.resultFrame?.formulaRealization || "",
            },
            cue: machCues.includes("lesson25-o-ohua-source-and-machtia"),
        },
    };
    const expected = {
        "lesson25-type-two-foundation": {
            openTypeTwo: ["authorized", "tom-tiā", "tom-o-hua", "authorized", 1],
            suppletion: [
                ["huīca", "suppletion", "type-two-suppletive-yauh-huica"],
                ["huīca", "suppletion", "type-two-suppletive-huallauh-hual-huica"],
            ],
            cue: true,
        },
        "lesson25-hua-source-routes": {
            openShapeNotList: ["authorized", "xochī-tiā", "xochī-hua", false, 1],
            shapeRoutes: [
                ["caqui-tiā", "caqui-hua", "authorized"],
                ["nēxi-tiā", "nēxi-hua", "authorized"],
                ["ihxi-tiā", "ihxi-hua", "authorized"],
                ["mīx-i-huī-tiā", "mīx-i-huī-hua", "authorized"],
            ],
            cue: true,
        },
        "lesson25-o-ohua-source-and-machtia": {
            openOHistory: ["tom-tiā", "tom-o-hua"],
            boundaryChanges: ["mauh-tiā", "quēn-tiā"],
            shuntlineControl: {
                eligible: true,
                allowed: ["silent", "sounded"],
                silent: "#0-0+⎕-0+tē(mach-tia)0+0-0#",
                sounded: "#0-0+qui-0+tē(mach-tia)0+0-0#",
            },
            cue: true,
        },
    };
    const mutations = {
        "lesson25-type-two-foundation": [
            !ctx.isClassicalNahuatlVncDerivationOptionInventory(tomi.inventory),
            !ctx.isClassicalNahuatlVncDerivationOperationFrame(tomi.operation),
            yauh.option?.targetStem !== "huīca",
            huallauh.option?.targetStem !== "huīca"
                || huallauh.option?.targetEnvironment?.directionalPrefix !== "huāl",
            !tomiCues.includes("lesson25-type-two-foundation"),
        ],
        "lesson25-hua-source-routes": [
            xochi.option?.exactWitness === true,
            xochi.option?.targetStem !== "xochī-tiā",
            xochi.operation.authorizationStatus !== "authorized",
            xochi.operation.participantTransformFrame?.targetObjectRequests?.length !== 1,
            !xochiCues.includes("lesson25-hua-source-routes"),
        ],
        "lesson25-o-ohua-source-and-machtia": [
            tomi.option?.typeTwoInternalBridgeFrame?.nonactiveStem !== "tom-o-hua",
            mahui.option?.targetStem !== "mauh-tiā",
            quemi.option?.targetStem !== "quēn-tiā",
            machSilent.scalar.authorizationStatus !== "authorized",
            machSounded.scalar.authorizationStatus !== "authorized",
            machSilent.scalar.resultFrame?.formulaRealization
                === machSounded.scalar.resultFrame?.formulaRealization,
            !machCues.includes("lesson25-o-ohua-source-and-machtia"),
        ],
    };

    s.eq("accepted Lesson 25 Groups 1-3 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => (
            record.proposedDirection === "READING_ONLY"
        )).length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 168, records: 168, both: 37, readingOnly: 131, unique: 168 });
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
