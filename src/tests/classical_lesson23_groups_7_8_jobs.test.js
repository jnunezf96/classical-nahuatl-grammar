"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const LESSON23_THREE_CARRIER_ROWS = Object.freeze([
    ["tla", "tla", "tla"],
    ["tē", "tla", "tla"],
    ["m-o", "tla", "tla"],
    ["tē", "tē", "tla"],
    ["m-o", "tē", "tla"],
    ["c-0", "m-o", "tla"],
    ["tē", "tē", "tē"],
    ["m-o", "tē", "tē"],
    ["c-0", "m-o", "tē"],
    ["c-0", "0-0", "tla"],
    ["c-0", "0-0", "tē"],
    ["c-0", "0-0", "m-o"],
    ["c-0", "0-0", "0-0"],
].map(row => Object.freeze(row)));

function run(ctx = {}) {
    const s = createSuite("classical_lesson23_groups_7_8_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson23-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson23-multiple-valence-formula-and-silencing",
        "lesson23-object-order-and-role-ambiguity",
    ];
    const records = ledger.records.filter(record => groupIds.includes(record.reviewGroupId));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const request = (objectId, objectKind, governor, derivationalLevel, objectPerson = "") => ({
        objectId,
        objectKind,
        objectPerson,
        governor,
        derivationalLevel,
    });
    const cluster = (objectRequests, overrides = {}) => (
        ctx.buildClassicalNahuatlObjectClusterFrame("maca", {
            subject: "3sg",
            subjectCarrier: "0",
            predicateStem: "maca",
            tense: "present",
            objectRequests,
            minimumPositionCount: objectRequests.length,
            maximumPositionCount: 3,
            ...overrides,
        })
    );

    const fullCluster = cluster([
        request("theme", "nonspecific-nonhuman", "directive", 1),
        request("causee", "specific-projective", "causative", 2, "1sg"),
        request("recipient", "nonspecific-human", "applicative", 3),
    ]);
    const application = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "maca",
        verbClass: "A",
        sourceValence: "multiple-object",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        objectRequests: fullCluster.objectRequests,
        directionalPrefix: "on",
        outputScope: "single",
    });
    const machinery = application.resultFrame?.selectedMachineryFrame || null;

    const specificSilencing = [
        cluster([
            request("older", "specific-projective", "directive", 1, "1sg"),
            request("newer", "specific-projective", "causative", 2, "2sg"),
        ]),
        cluster([
            request("older", "specific-projective", "directive", 1, "3pl"),
            request("newer", "specific-projective", "causative", 2, "2sg"),
        ]),
        cluster([
            request("older", "specific-projective", "directive", 1, "3pl"),
            request("newer", "specific-projective", "causative", 2, "3pl"),
        ]),
    ];
    const automaticCarriers = cluster([
        request("specific", "specific-projective", "directive", 1, "2sg"),
        request("self", "reflexive", "causative", 2, "nonfirst-common"),
        request("thing", "nonspecific-nonhuman", "applicative", 3),
    ]);
    const twoReflexives = cluster([
        request("shared-self", "reflexive", "causative", 1, "nonfirst-common"),
        request("main-self", "reflexive", "applicative", 2, "3sg"),
    ]);
    const fourthPosition = cluster([
        request("one", "nonspecific-human", "directive", 1),
        request("two", "nonspecific-human", "causative", 2),
        request("three", "nonspecific-nonhuman", "applicative", 3),
        request("four", "nonspecific-nonhuman", "applicative", 4),
    ], { maximumPositionCount: 3 });

    const carrierKind = carrier => carrier === "tla"
        ? "nonspecific-nonhuman"
        : carrier === "tē"
            ? "nonspecific-human"
            : carrier === "m-o"
                ? "reflexive"
                : "specific-projective";
    const combinationFrames = LESSON23_THREE_CARRIER_ROWS.map((carriers, rowIndex) => {
        const kinds = carriers.map(carrierKind);
        const reflexiveIndex = kinds.indexOf("reflexive");
        const specificIndex = kinds.indexOf("specific-projective");
        const mainlineIndex = reflexiveIndex >= 0
            ? reflexiveIndex
            : specificIndex >= 0 ? specificIndex : kinds.length - 1;
        const remainingLevels = [1, 2];
        const levels = kinds.map((_kind, index) => (
            index === mainlineIndex ? 3 : remainingLevels.shift()
        ));
        return cluster(kinds.map((objectKind, index) => request(
            `row-${rowIndex + 1}-object-${index + 1}`,
            objectKind,
            levels[index] === 1 ? "directive" : levels[index] === 2 ? "causative" : "applicative",
            levels[index],
            objectKind === "specific-projective" || objectKind === "reflexive" ? "3sg" : "",
        )), { subjectCarrier: "i" });
    });
    const twoCarrierSubsequences = combinationFrames.flatMap(frame => ([
        [frame.positions[0], frame.positions[1]],
        [frame.positions[0], frame.positions[2]],
        [frame.positions[1], frame.positions[2]],
    ])).map(pair => pair.map(position => position.sequencePriority));

    const ambiguity = ctx.buildClassicalNahuatlObjectRoleAmbiguityFrame(fullCluster);
    const fixedCluster = cluster([
        request("older-specific", "specific-projective", "directive", 1, "1sg"),
        request("newer-specific", "specific-projective", "causative", 2, "2sg"),
    ]);
    const fixedRoleFrame = ctx.buildClassicalNahuatlObjectRoleAmbiguityFrame(fixedCluster);
    const formula = `#0-0+${fullCluster.linearCarriers.join("+")}(maca)0+0-0#`;
    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        formula,
        null,
        {
            multipleObjectClusterFrame: fullCluster,
            objectRoleAmbiguityFrame: ambiguity,
        },
    );

    const observations = {
        "lesson23-multiple-valence-formula-and-silencing": {
            application: [
                application.authorizationStatus,
                machinery?.multipleObjectClusterFrame === fullCluster,
                application.resultFrame?.formulaRealization,
                machinery?.proofFrame?.conclusion?.finalTypedVncSlotFrame?.slots?.prePredicate?.length,
            ],
            positions: fullCluster.positions.map(position => [
                position.objectId,
                position.prominence,
                position.valenceArity,
                position.va1 || position.va,
                position.va2 || "",
                position.sounded,
            ]),
            silence: specificSilencing.map(frame => frame.positions.map(position => [
                position.objectPerson,
                position.prominence,
                position.carrier,
                position.sounded,
            ])),
            automatic: automaticCarriers.positions.map(position => position.carrier),
            cue: cues.find(cue => cue.role === "lesson23-multiple-valence-formula-and-silencing")?.role || "",
        },
        "lesson23-object-order-and-role-ambiguity": {
            rules: fullCluster.orderingRules,
            combinations: combinationFrames.map(frame => [
                frame.authorizationStatus,
                frame.linearCarriers,
            ]),
            subsequencesPreserveOrder: twoCarrierSubsequences.every(pair => pair[0] <= pair[1]),
            twoReflexives: twoReflexives.linearCarriers,
            directional: [
                application.authorizationStatus,
                application.resultFrame?.formulaRealization?.includes("n-ēch+on+tē") || false,
            ],
            ambiguity: [
                ambiguity.authorizationStatus,
                ctx.isClassicalNahuatlObjectRoleAmbiguityFrame(ambiguity),
                ambiguity.surfaceCarriers,
                ambiguity.roleMappingCount,
                ambiguity.genuinelyAmbiguous,
                ambiguity.userChoiceAvailable,
                ambiguity.selectionRequired,
                ambiguity.carrierOrderAuthority,
            ],
            applicationAmbiguity: [
                machinery?.objectRoleAmbiguityFrame?.genuinelyAmbiguous,
                machinery?.objectRoleAmbiguityFrame?.roleMappingCount,
            ],
            fixed: [
                fixedRoleFrame.genuinelyAmbiguous,
                fixedRoleFrame.userChoiceAvailable,
            ],
            cue: cues.find(cue => cue.role === "lesson23-object-order-and-role-ambiguity")?.role || "",
        },
    };
    const expected = {
        "lesson23-multiple-valence-formula-and-silencing": {
            application: [
                "authorized",
                false,
                "#0-0+n-ēch+on+tē+tla(maca)0+0-0#",
                4,
            ],
            positions: [
                ["causee", "shuntline", "dyadic", "n", "ēch", true],
                ["recipient", "mainline", "monadic", "tē", "", true],
                ["theme", "shuntline", "monadic", "tla", "", true],
            ],
            silence: [
                [["2sg", "mainline", "m-itz", true], ["1sg", "shuntline", "0-0", false]],
                [["2sg", "mainline", "m-itz", true], ["3pl", "shuntline", "0-im", false]],
                [["3pl", "mainline", "qu-im", true], ["3pl", "shuntline", "0-0", false]],
            ],
            automatic: ["m-itz", "ne", "tla"],
            cue: "lesson23-multiple-valence-formula-and-silencing",
        },
        "lesson23-object-order-and-role-ambiguity": {
            rules: [
                "specific-projective-before-reflexive",
                "specific-projective-before-nonspecific-projective",
                "reflexive-before-nonspecific-projective",
                "human-before-nonhuman",
            ],
            combinations: LESSON23_THREE_CARRIER_ROWS.map(row => ["authorized", row]),
            subsequencesPreserveOrder: true,
            twoReflexives: ["m-o", "ne"],
            directional: ["authorized", true],
            ambiguity: [
                "authorized",
                true,
                ["n-ēch", "tē", "tla"],
                2,
                true,
                true,
                false,
                "form-not-object-function",
            ],
            applicationAmbiguity: [true, 2],
            fixed: [false, false],
            cue: "lesson23-object-order-and-role-ambiguity",
        },
    };
    const mutations = {
        "lesson23-multiple-valence-formula-and-silencing": [
            fourthPosition.authorizationStatus === "authorized",
            fullCluster.positions.some(position => !position.carrier),
            specificSilencing.some(frame => frame.positions.filter(position => (
                position.objectKind === "specific-projective" && position.sounded
            )).length !== 1),
        ],
        "lesson23-object-order-and-role-ambiguity": [
            combinationFrames.some((frame, index) => (
                frame.linearCarriers.join("|") !== LESSON23_THREE_CARRIER_ROWS[index].join("|")
            )),
            ctx.isClassicalNahuatlObjectRoleAmbiguityFrame({ ...ambiguity }),
            fixedRoleFrame.userChoiceAvailable,
        ],
    };

    s.eq("accepted Lesson 23 Groups 7-8 cover every atom once", {
        accepted: records.filter(record => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter(record => record.proposedDirection === "READING_ONLY").length,
        unique: new Set(records.map(record => record.atomId)).size,
    }, { accepted: 57, records: 57, both: 44, readingOnly: 13, unique: 57 });
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
