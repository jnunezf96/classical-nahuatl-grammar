"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function buildSource(ctx, stem, {
    verbClass = "A",
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
        candidate.targetStem === targetStem
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

function bridgeStem(entry) {
    return entry.option?.typeTwoInternalBridgeFrame?.nonactiveStem
        || entry.option?.lesson20NonactiveStemRecord?.nonactiveStem
        || entry.option?.typeTwoBridgeStem
        || "";
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson25-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson25-lo-source-routes",
        "lesson25-lia-causatives",
        "lesson25-huia-class-and-parallel-causatives",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const cocoLo = inspectOption(ctx, "coco-ya", "coco-l-tiā");
    const cocoLia = inspectOption(ctx, "coco-ya", "coco-liā");
    const tlacatiLia = inspectOption(ctx, "tlāca-ti", "tlāca-ti-liā");
    const maca = inspectOption(ctx, "maca", "maqui-l-tiā", {
        sourceValence: "specific-projective",
    });
    const cualana = inspectOption(ctx, "cual-ā-ni", "cual-ā-na-l-tiā", {
        verbClass: "B",
    });
    const tzacua = inspectOption(ctx, "tzacu-a", "tzacu-i-l-tiā", {
        verbClass: "B",
        sourceValence: "projective-nonhuman",
    });
    const imacaci = inspectOption(ctx, "īmacaci", "īmacaxi-l-tiā", {
        verbClass: "B",
        sourceValence: "projective-human",
    });
    const mati = inspectOption(ctx, "mati", "machi-l-tiā", {
        verbClass: "B",
        sourceValence: "projective-nonhuman",
    });
    const zepoHuia = inspectOption(ctx, "zepō", "zepō-huiā");
    const zepaHuia = inspectOption(ctx, "zepō", "zepa-huiā");
    const huaquiTypeOne = inspectOption(ctx, "huā-qui", "huā-tz-a", {
        verbClass: "B",
    });
    const huaquiTypeTwo = inspectOption(ctx, "huā-qui", "huā-qui-l-tiā", {
        verbClass: "B",
    });

    const cueRoles = (frame) => ctx.getClassicalFormulaDerivedAnnotations(
        frame.resultFrame?.formulaRealization || frame.formulaRealization || "",
        frame.resultFrame?.finalTypedVncSlotFrame || null,
        frame,
    ).map((cue) => cue.role);
    const loCues = cueRoles(cocoLo.machinery);
    const liaCues = cueRoles(cocoLia.machinery);
    const huiaCues = cueRoles(zepoHuia.machinery);
    const parallelTypeOneCues = cueRoles(huaquiTypeOne.machinery);

    const observations = {
        "lesson25-lo-source-routes": {
            openShapeNotList: [
                cocoLo.inventory.authorizationStatus,
                cocoLo.option?.targetStem || "",
                bridgeStem(cocoLo),
                cocoLo.option?.exactWitness === true,
                cocoLo.option?.targetClass || "",
                cocoLo.operation.authorizationStatus,
            ],
            automaticAlternations: [maca, cualana, tzacua, imacaci, mati]
                .map((entry) => [bridgeStem(entry), entry.option?.targetStem || ""]),
            cue: loCues.includes("lesson25-lo-source-routes"),
        },
        "lesson25-lia-causatives": {
            openRootPlusYa: [
                cocoLia.inventory.authorizationStatus,
                cocoLia.option?.targetStem || "",
                cocoLia.option?.derivationRoute || "",
                cocoLia.option?.targetClass || "",
                cocoLia.option?.exactWitness === true,
                cocoLia.operation.participantTransformFrame
                    ?.targetObjectRequests?.length,
            ],
            denominalTi: [
                tlacatiLia.option?.targetStem || "",
                tlacatiLia.option?.derivationRoute || "",
                tlacatiLia.option?.targetClass || "",
            ],
            roleOwnedByDerivation: [
                cocoLia.option?.derivationType || "",
                Object.prototype.hasOwnProperty.call(
                    cocoLia.option || {},
                    "semanticSelection",
                ),
            ],
            cue: liaCues.includes("lesson25-lia-causatives"),
        },
        "lesson25-huia-class-and-parallel-causatives": {
            openLongO: [zepoHuia, zepaHuia].map((entry) => [
                entry.inventory.authorizationStatus,
                entry.option?.targetStem || "",
                entry.option?.derivationRoute || "",
                entry.option?.targetClass || "",
                entry.option?.exactWitness === true,
            ]),
            allTypeTwoClassC: [cocoLo, cocoLia, zepoHuia, zepaHuia]
                .every((entry) => entry.option?.targetClass === "C"),
            parallel: [huaquiTypeOne, huaquiTypeTwo].map((entry) => [
                entry.option?.derivationSubtype || "",
                entry.option?.targetStem || "",
                entry.option?.targetClass || "",
                entry.option?.parallelFormationLexicalRelation
                    ?.meaningRelation || "",
                entry.option?.parallelFormationLexicalRelation
                    ?.operationSelectionAuthority === true,
            ]),
            cues: [
                huiaCues.includes("lesson25-huia-class-and-parallel-causatives"),
                parallelTypeOneCues.includes(
                    "lesson25-huia-class-and-parallel-causatives",
                ),
            ],
        },
    };
    const expected = {
        "lesson25-lo-source-routes": {
            openShapeNotList: [
                "authorized",
                "coco-l-tiā",
                "coco-lō",
                false,
                "C",
                "authorized",
            ],
            automaticAlternations: [
                ["maqui-lō", "maqui-l-tiā"],
                ["cual-ā-na-lō", "cual-ā-na-l-tiā"],
                ["tzacu-i-lō", "tzacu-i-l-tiā"],
                ["īmacaxi-lō", "īmacaxi-l-tiā"],
                ["machi-lō", "machi-l-tiā"],
            ],
            cue: true,
        },
        "lesson25-lia-causatives": {
            openRootPlusYa: [
                "authorized",
                "coco-liā",
                "type-two-lia-from-typed-root-plus-ya",
                "C",
                false,
                1,
            ],
            denominalTi: [
                "tlāca-ti-liā",
                "type-two-lia-from-typed-denominal-ti",
                "C",
            ],
            roleOwnedByDerivation: ["causative", false],
            cue: true,
        },
        "lesson25-huia-class-and-parallel-causatives": {
            openLongO: [
                ["authorized", "zepō-huiā", "type-two-final-o-direct-huia", "C", false],
                ["authorized", "zepa-huiā", "type-two-final-o-replacive-huia", "C", false],
            ],
            allTypeTwoClassC: true,
            parallel: [
                ["type-one", "huā-tz-a", "B", "same-meaning", false],
                ["type-two", "huā-qui-l-tiā", "C", "same-meaning", false],
            ],
            cues: [true, true],
        },
    };
    const mutations = {
        "lesson25-lo-source-routes": [
            cocoLo.option?.exactWitness === true,
            bridgeStem(cocoLo) !== "coco-lō",
            cocoLo.option?.targetStem !== "coco-l-tiā",
            cocoLo.option?.targetClass !== "C",
            !loCues.includes("lesson25-lo-source-routes"),
        ],
        "lesson25-lia-causatives": [
            cocoLia.option?.targetStem !== "coco-liā",
            cocoLia.option?.targetClass !== "C",
            cocoLia.operation.authorizationStatus !== "authorized",
            Object.prototype.hasOwnProperty.call(
                cocoLia.option || {},
                "semanticSelection",
            ),
            !liaCues.includes("lesson25-lia-causatives"),
        ],
        "lesson25-huia-class-and-parallel-causatives": [
            zepoHuia.option?.exactWitness === true,
            zepaHuia.option?.targetStem !== "zepa-huiā",
            zepoHuia.option?.targetClass !== "C",
            huaquiTypeOne.option?.parallelFormationLexicalRelation
                ?.operationSelectionAuthority === true,
            !huiaCues.includes("lesson25-huia-class-and-parallel-causatives"),
            !parallelTypeOneCues.includes(
                "lesson25-huia-class-and-parallel-causatives",
            ),
        ],
    };

    s.eq("accepted Lesson 25 Groups 4-6 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => (
            record.proposedDirection === "READING_ONLY"
        )).length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 147, records: 147, both: 27, readingOnly: 120, unique: 147 });
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
