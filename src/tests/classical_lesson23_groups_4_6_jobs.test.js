"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson23_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson23-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson23-directive-source-histories",
        "lesson23-filled-positions-and-mainline-reflexive",
        "lesson23-suffix-history-and-specific-incompatibility",
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
    const directiveTwo = cluster("maca", [
        request("direct-theme", "specific-projective", "directive", 1, "3sg"),
        request("causee", "nonspecific-human", "causative", 2),
    ]);
    const directiveThree = cluster("xaca", [
        request("direct-theme", "specific-projective", "directive", 1, "3sg"),
        request("causee", "nonspecific-human", "causative", 2),
        request("recipient", "nonspecific-nonhuman", "applicative", 3),
    ]);
    const rareThirdBlocked = cluster("zaca", [
        request("direct-theme", "specific-projective", "directive", 1, "3sg"),
        request("first-causee", "nonspecific-human", "causative", 2),
        request("second-causee", "nonspecific-nonhuman", "causative", 3),
    ]);
    const rareThirdSupported = cluster("zaca", rareThirdBlocked.objectRequests, {
        rareThirdCausativeMeaningSupported: true,
    });
    const rareApplication = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "zaca",
        verbClass: "A",
        sourceValence: "multiple-object",
        subject: "1sg",
        requestedDerivation: "direct",
        requestedVoice: "active",
        objectRequests: rareThirdBlocked.objectRequests,
        rareThirdCausativeMeaningSupported: true,
        outputScope: "single",
    });

    const mainlineReflexive = cluster("zōma", [
        request("theme", "nonspecific-human", "causative", 1),
        request("self", "reflexive", "applicative", 2, "1sg"),
    ]);
    const shuntlineReflexive = cluster("zōma", [
        request("self", "reflexive", "causative", 1, "nonfirst-common"),
        request("theme", "specific-projective", "causative", 2, "3sg"),
        request("recipient", "nonspecific-human", "applicative", 3),
    ]);
    const incompatibleSpecific = cluster("maca", [
        request("earlier-specific", "specific-projective", "directive", 1, "2sg"),
        request("latest-specific", "specific-projective", "causative", 2, "3sg"),
    ]);

    const ordinaryOrder = cluster("xele", [
        request("causee", "nonspecific-human", "causative", 1),
        request("recipient", "nonspecific-nonhuman", "applicative", 2),
    ]);
    const exceptionalBlocked = cluster("xele", [
        request("recipient", "nonspecific-human", "applicative", 1),
        request("causee", "nonspecific-nonhuman", "causative", 2),
    ]);
    const exceptionalSupported = cluster("xele", exceptionalBlocked.objectRequests, {
        exceptionalSuffixOrderAuthorized: true,
    });
    const surfaceOrderDistinct = cluster("xele", [
        request("earlier-human", "nonspecific-human", "causative", 1),
        request("later-specific", "specific-projective", "applicative", 2, "3sg"),
    ]);
    const cueCluster = cluster("maca", [
        request("direct-theme", "specific-projective", "directive", 1, "3sg"),
        request("self", "reflexive", "causative", 2, "1sg"),
        request("recipient", "nonspecific-human", "applicative", 3),
    ]);
    const cueFormula = `#ni-0+${cueCluster.linearCarriers.join("+")}(maca)0+0-0#`;
    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        cueFormula,
        null,
        { multipleObjectClusterFrame: cueCluster },
    );

    const observations = {
        "lesson23-directive-source-histories": {
            two: directiveTwo.objectRequests
                .slice()
                .sort((left, right) => left.derivationalLevel - right.derivationalLevel)
                .map((position) => [position.objectId, position.governor, position.derivationalLevel]),
            three: directiveThree.positions
                .slice()
                .sort((left, right) => left.derivationalLevel - right.derivationalLevel)
                .map((position) => [position.objectId, position.governor, position.derivationalLevel, position.prominence]),
            rare: [
                rareThirdBlocked.authorizationStatus,
                rareThirdBlocked.blockReason,
                rareThirdSupported.authorizationStatus,
                rareThirdSupported.rareThirdCausativeHistory,
                rareThirdSupported.rareThirdCausativeMeaningSupported,
            ],
            application: [
                rareApplication.authorizationStatus,
                rareApplication.blockReason,
                rareApplication.normalizedRequest.sourceStem,
                rareApplication.normalizedRequest.rareThirdCausativeMeaningSupported,
                rareApplication.resultFrame.selectedMachineryFrame?.multipleObjectClusterFrame?.rareThirdCausativeHistory,
            ],
            cue: cues.find((cue) => cue.role === "lesson23-directive-source-histories")?.role || "",
        },
        "lesson23-filled-positions-and-mainline-reflexive": {
            mainline: mainlineReflexive.positions
                .filter((position) => position.objectKind === "reflexive")
                .map((position) => [position.prominence, position.carrier, position.governor, position.sounded]),
            shuntline: shuntlineReflexive.positions
                .filter((position) => position.objectKind === "reflexive")
                .map((position) => [position.prominence, position.carrier, position.governor, position.sounded]),
            singleMainline: [mainlineReflexive, shuntlineReflexive].map((frame) => (
                frame.positions.filter((position) => position.prominence === "mainline").length
            )),
            silentPosition: incompatibleSpecific.positions
                .filter((position) => position.sounded === false)
                .map((position) => [position.objectId, position.va1, position.va2, position.carrier]),
            cue: cues.find((cue) => cue.role === "lesson23-filled-positions-and-mainline-reflexive")?.role || "",
        },
        "lesson23-suffix-history-and-specific-incompatibility": {
            ordinary: [
                ordinaryOrder.authorizationStatus,
                ordinaryOrder.suffixHistory,
                ordinaryOrder.standardSuffixOrder,
                ordinaryOrder.historyAuthorizationStatus,
            ],
            exceptional: [
                exceptionalBlocked.authorizationStatus,
                exceptionalBlocked.blockReason,
                exceptionalSupported.authorizationStatus,
                exceptionalSupported.standardSuffixOrder,
                exceptionalSupported.exceptionalSuffixOrderAuthorized,
            ],
            separateOrders: [
                surfaceOrderDistinct.objectRequests.map((position) => position.objectId),
                surfaceOrderDistinct.positions.map((position) => position.objectId),
            ],
            incompatibility: incompatibleSpecific.positions.map((position) => [
                position.objectId,
                position.prominence,
                position.sounded,
                position.carrier,
                position.silencingRule,
            ]),
            cue: cues.find((cue) => cue.role === "lesson23-suffix-history-and-specific-incompatibility")?.role || "",
        },
    };
    const expected = {
        "lesson23-directive-source-histories": {
            two: [["direct-theme", "directive", 1], ["causee", "causative", 2]],
            three: [
                ["direct-theme", "directive", 1, "shuntline"],
                ["causee", "causative", 2, "shuntline"],
                ["recipient", "applicative", 3, "mainline"],
            ],
            rare: [
                "blocked",
                "lesson23-rare-third-causative-meaning-support-required",
                "authorized",
                true,
                true,
            ],
            application: ["authorized", "", "zaca", true, true],
            cue: "lesson23-directive-source-histories",
        },
        "lesson23-filled-positions-and-mainline-reflexive": {
            mainline: [["mainline", "n-o", "applicative", true]],
            shuntline: [["shuntline", "ne", "causative", true]],
            singleMainline: [1, 1],
            silentPosition: [["earlier-specific", "0", "0", "0-0"]],
            cue: "lesson23-filled-positions-and-mainline-reflexive",
        },
        "lesson23-suffix-history-and-specific-incompatibility": {
            ordinary: ["authorized", ["causative", "applicative"], true, "authorized"],
            exceptional: [
                "blocked",
                "lesson23-exceptional-suffix-order-support-required",
                "authorized",
                false,
                true,
            ],
            separateOrders: [
                ["earlier-human", "later-specific"],
                ["later-specific", "earlier-human"],
            ],
            incompatibility: [
                ["latest-specific", "mainline", true, "c-0", ""],
                ["earlier-specific", "shuntline", false, "0-0", "incompatible-specific-projective-silenced"],
            ],
            cue: "lesson23-suffix-history-and-specific-incompatibility",
        },
    };
    const mutations = {
        "lesson23-directive-source-histories": [
            directiveThree.objectRequests[0].governor !== "directive",
            rareThirdBlocked.authorizationStatus === "authorized",
            rareThirdSupported.positions.filter((position) => position.prominence === "mainline").length !== 1,
        ],
        "lesson23-filled-positions-and-mainline-reflexive": [
            incompatibleSpecific.positions.length !== 2,
            mainlineReflexive.positions.filter((position) => position.prominence === "mainline").length !== 1,
            shuntlineReflexive.positions.find((position) => position.objectKind === "reflexive")?.carrier !== "ne",
        ],
        "lesson23-suffix-history-and-specific-incompatibility": [
            exceptionalBlocked.authorizationStatus === "authorized",
            surfaceOrderDistinct.positions.map((position) => position.objectId).join("|") === surfaceOrderDistinct.objectRequests.map((position) => position.objectId).join("|"),
            incompatibleSpecific.positions.filter((position) => position.objectKind === "specific-projective" && position.sounded).length !== 1,
        ],
    };

    s.eq("accepted Lesson 23 Groups 4-6 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => record.proposedDirection === "READING_ONLY").length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 30, records: 30, both: 20, readingOnly: 10, unique: 30 });
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
