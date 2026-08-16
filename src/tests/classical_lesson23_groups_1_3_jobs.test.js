"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson23_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson23-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson23-object-functions-and-governors",
        "lesson23-multiple-valence-foundation",
        "lesson23-intransitive-source-histories",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const request = (objectId, objectKind, governor, derivationalLevel, objectPerson = "") => ({
        objectId,
        objectKind,
        objectPerson,
        governor,
        derivationalLevel,
    });
    const cluster = (sourceStem, objectRequests, overrides = {}) => (
        ctx.buildClassicalNahuatlObjectClusterFrame(sourceStem, {
            subject: "1sg",
            subjectCarrier: "ni",
            predicateStem: sourceStem,
            tense: "present",
            objectRequests,
            minimumPositionCount: objectRequests.length,
            maximumPositionCount: 3,
            ...overrides,
        })
    );

    const directive = cluster("maca", [
        request("theme", "specific-projective", "directive", 1, "3sg"),
    ]).positions[0].governorUnitFrame;
    const causative = cluster("xele", [
        request("causee", "specific-projective", "causative", 1, "2sg"),
    ]).positions[0].governorUnitFrame;
    const applicative = cluster("zoma", [
        request("beneficiary", "nonspecific-human", "applicative", 1),
    ]).positions[0].governorUnitFrame;
    const openCausativeShapedSource = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "xeltia",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        requestedDerivation: "direct",
        requestedVoice: "active",
        outputScope: "single",
    });

    const twoObjects = cluster("xele", [
        request("causee", "specific-projective", "causative", 1, "2sg"),
        request("beneficiary", "nonspecific-human", "applicative", 2),
    ]);
    const threeObjects = cluster("zoma", [
        request("causee", "specific-projective", "causative", 1, "3sg"),
        request("affected", "reflexive", "causative", 2, "1sg"),
        request("theme", "nonspecific-nonhuman", "applicative", 3),
    ]);
    const directiveHistory = cluster("maca", [
        request("theme", "specific-projective", "directive", 1, "3sg"),
        request("recipient", "nonspecific-human", "applicative", 2),
    ]);
    const fourth = cluster("xele", [
        request("o1", "specific-projective", "causative", 1, "2sg"),
        request("o2", "nonspecific-human", "applicative", 2),
        request("o3", "nonspecific-nonhuman", "causative", 3),
        request("o4", "specific-projective", "applicative", 4, "3sg"),
    ]);
    const noncontiguous = cluster("xele", [
        request("o1", "specific-projective", "causative", 1, "2sg"),
        request("o3", "nonspecific-human", "applicative", 3),
    ]);
    const misplacedDirective = cluster("maca", [
        request("added", "nonspecific-human", "applicative", 1),
        request("theme", "specific-projective", "directive", 2, "3sg"),
    ]);
    const application = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "xele",
        verbClass: "B",
        sourceValence: "multiple-object",
        subject: "1sg",
        requestedDerivation: "direct",
        requestedVoice: "active",
        objectRequests: twoObjects.objectRequests,
        outputScope: "single",
    });
    const cueFormula = `#ni-0+${twoObjects.linearCarriers.join("+")}(xele)0+0-0#`;
    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        cueFormula,
        null,
        { multipleObjectClusterFrame: twoObjects },
    );

    const observations = {
        "lesson23-object-functions-and-governors": {
            units: [directive, causative, applicative].map((frame) => [
                frame.authorizationStatus,
                frame.objectFunction,
                frame.requiredStemOperation,
                frame.discontinuousUnit,
                frame.callerSuppliedGovernorAllowed,
            ]),
            openSource: [
                openCausativeShapedSource.authorizationStatus,
                openCausativeShapedSource.normalizedRequest.sourceStem,
                openCausativeShapedSource.normalizedRequest.sourceValence,
                openCausativeShapedSource.resultFrame.formulaRealization,
            ],
            directiveHistory: directiveHistory.positions.map((position) => [
                position.objectId,
                position.governorUnitFrame.objectFunction,
                position.governorUnitFrame.discontinuousUnit,
            ]),
            cue: cues.find((cue) => cue.role === "lesson23-object-functions-and-governors")?.role || "",
        },
        "lesson23-multiple-valence-foundation": {
            positions: [
                twoObjects.authorizationStatus,
                twoObjects.positionCount,
                threeObjects.authorizationStatus,
                threeObjects.positionCount,
                threeObjects.positions.every((position) => Boolean(position.governorUnitFrame)),
            ],
            application: [
                application.authorizationStatus,
                application.normalizedRequest.sourceStem,
                application.normalizedRequest.sourceObjectRequests.length,
                application.resultFrame.selectedMachineryFrame?.multipleObjectClusterFrame?.positionCount,
            ],
            ceiling: [fourth.authorizationStatus, fourth.blockReason],
            cue: cues.find((cue) => cue.role === "lesson23-multiple-valence-foundation")?.role || "",
        },
        "lesson23-intransitive-source-histories": {
            two: twoObjects.positions
                .slice()
                .sort((left, right) => left.derivationalLevel - right.derivationalLevel)
                .map((position) => [position.derivationalLevel, position.governor, position.prominence]),
            three: threeObjects.positions
                .slice()
                .sort((left, right) => left.derivationalLevel - right.derivationalLevel)
                .map((position) => [position.derivationalLevel, position.governor, position.prominence]),
            automatic: [
                twoObjects.derivationalLevelsContiguous,
                threeObjects.derivationalLevelsContiguous,
                twoObjects.positions.filter((position) => position.prominence === "mainline").length,
                threeObjects.positions.filter((position) => position.prominence === "mainline").length,
            ],
            invalid: [
                noncontiguous.authorizationStatus,
                noncontiguous.blockReason,
                misplacedDirective.authorizationStatus,
                misplacedDirective.blockReason,
            ],
            cue: cues.find((cue) => cue.role === "lesson23-intransitive-source-histories")?.role || "",
        },
    };
    const expected = {
        "lesson23-object-functions-and-governors": {
            units: [
                ["authorized", "direct", "lexical-directive-stem", false, false],
                ["authorized", "causative", "causative-derivational-suffix", true, false],
                ["authorized", "applicative", "applicative-derivational-suffix", true, false],
            ],
            openSource: ["authorized", "xeltia", "intransitive", "#0-0(xeltia)0+0-0#"],
            directiveHistory: [
                ["theme", "direct", false],
                ["recipient", "applicative", true],
            ],
            cue: "lesson23-object-functions-and-governors",
        },
        "lesson23-multiple-valence-foundation": {
            positions: ["authorized", 2, "authorized", 3, true],
            application: ["authorized", "xele", 2, 2],
            ceiling: ["blocked", "lesson23-typed-object-request-inventory-invalid"],
            cue: "lesson23-multiple-valence-foundation",
        },
        "lesson23-intransitive-source-histories": {
            two: [[1, "causative", "shuntline"], [2, "applicative", "mainline"]],
            three: [[1, "causative", "shuntline"], [2, "causative", "shuntline"], [3, "applicative", "mainline"]],
            automatic: [true, true, 1, 1],
            invalid: [
                "blocked",
                "lesson23-typed-object-request-inventory-invalid",
                "blocked",
                "lesson23-typed-object-request-inventory-invalid",
            ],
            cue: "lesson23-intransitive-source-histories",
        },
    };
    const mutations = {
        "lesson23-object-functions-and-governors": [
            causative.discontinuousUnit === false,
            applicative.requiredStemOperation === "lexical-directive-stem",
            openCausativeShapedSource.authorizationStatus !== "authorized",
        ],
        "lesson23-multiple-valence-foundation": [
            threeObjects.positionCount === 2,
            fourth.authorizationStatus === "authorized",
            application.normalizedRequest.sourceObjectRequests.length !== 2,
        ],
        "lesson23-intransitive-source-histories": [
            twoObjects.positions.filter((position) => position.prominence === "mainline").length !== 1,
            threeObjects.derivationalLevelsContiguous === false,
            noncontiguous.authorizationStatus === "authorized",
        ],
    };

    s.eq("accepted Lesson 23 Groups 1-3 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => record.proposedDirection === "READING_ONLY").length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 62, records: 62, both: 29, readingOnly: 33, unique: 62 });
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
