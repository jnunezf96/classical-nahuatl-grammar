"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson21_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson21-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson21-passive-reflexive-projective-double-object",
        "lesson21-passive-two-specific-mainline-promotion",
        "lesson21-passive-specific-nonspecific-and-three-object",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const application = (objectRequests) => (
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: "maca",
            verbClass: "A",
            sourceValence: "multiple-object",
            subject: "3sg",
            mood: "indicative",
            tense: "future",
            requestedDerivation: "direct",
            requestedVoice: "passive",
            objectRequests,
        })
    );
    const compact = (app) => {
        const machinery = app.resultFrame?.selectedMachineryFrame || null;
        const cluster = machinery?.voiceTransformationFrame
            ?.targetObjectClusterFrame || null;
        return {
            authorizationStatus: app.authorizationStatus,
            blockReason: app.blockReason,
            subject: machinery?.subject || "",
            valence: machinery?.valence || "",
            formula: app.resultFrame?.formulaRealization || "",
            promotedObjectId: cluster?.promotedObjectId || "",
            retainedObjectIds: cluster?.retainedObjectIds || [],
            retainedCarriers: cluster?.retainedCarriers || [],
        };
    };
    const cue = (app, role) => {
        const machinery = app.resultFrame?.selectedMachineryFrame || null;
        return ctx.getClassicalFormulaDerivedAnnotations(
            app.resultFrame?.formulaRealization || "",
            null,
            machinery,
        ).find((entry) => entry.role === role);
    };

    const reflexiveProjective = application([
        { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
        { objectId: "applied-reflexive", objectKind: "reflexive", objectPerson: "3sg", governor: "applicative", derivationalLevel: 2 },
    ]);
    const twoSpecific = application([
        { objectId: "direct", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
        { objectId: "caused", objectKind: "specific-projective", objectPerson: "2sg", governor: "causative", derivationalLevel: 2 },
    ]);
    const pluralShuntline = application([
        { objectId: "direct", objectKind: "specific-projective", objectPerson: "3pl", governor: "directive", derivationalLevel: 1 },
        { objectId: "caused", objectKind: "specific-projective", objectPerson: "1sg", governor: "causative", derivationalLevel: 2 },
    ]);
    const specificHuman = application([
        { objectId: "direct", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
        { objectId: "applied-human", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
    ]);
    const specificNonhuman = application([
        { objectId: "direct", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
        { objectId: "applied-nonhuman", objectKind: "nonspecific-nonhuman", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
    ]);
    const threeSpecific = application([
        { objectId: "direct", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
        { objectId: "caused", objectKind: "specific-projective", objectPerson: "2sg", governor: "causative", derivationalLevel: 2 },
        { objectId: "applied", objectKind: "specific-projective", objectPerson: "1sg", governor: "applicative", derivationalLevel: 3 },
    ]);

    const observations = {
        "lesson21-passive-reflexive-projective-double-object": {
            result: compact(reflexiveProjective),
            cue: cue(
                reflexiveProjective,
                "passive-reflexive-projective-double-object",
            ),
        },
        "lesson21-passive-two-specific-mainline-promotion": {
            silentShuntline: compact(twoSpecific),
            pluralShuntline: compact(pluralShuntline),
            nonactiveChoiceForwarding: [
                ctx.buildClassicalRuleLogicVncApplicationRequest({
                    requestedNonactiveOptionId: "ō:mac-ō",
                    requestedNonactiveOptionIsUserIntent: false,
                }).nonactiveOptionId,
                ctx.buildClassicalRuleLogicVncApplicationRequest({
                    requestedNonactiveOptionId: "lō:mac-ti-lō",
                    requestedNonactiveOptionIsUserIntent: true,
                }).nonactiveOptionId,
            ],
            cue: cue(
                twoSpecific,
                "passive-two-specific-mainline-promotion",
            ),
        },
        "lesson21-passive-specific-nonspecific-and-three-object": {
            human: compact(specificHuman),
            nonhuman: compact(specificNonhuman),
            threeSpecific: compact(threeSpecific),
            cue: cue(
                specificHuman,
                "passive-specific-nonspecific-and-three-object",
            ),
        },
    };
    const expected = {
        "lesson21-passive-reflexive-projective-double-object": {
            result: {
                authorizationStatus: "authorized",
                blockReason: "",
                subject: "3sg",
                valence: "shuntline-reflexive",
                formula: "#0-0+ne(mac-o)z+0-0#",
                promotedObjectId: "direct-specific",
                retainedObjectIds: ["applied-reflexive"],
                retainedCarriers: ["ne"],
            },
            cue: {
                start: 5,
                end: 7,
                role: "passive-reflexive-projective-double-object",
                label: "projective object direct-specific (3sg) → passive subject · reflexive object → retained ne",
                presentation: "carrier",
                lessonSections: ["§21.2.3"],
                atomIds: [
                    "ACI-P181-L037-3FCA069955",
                    "ACI-P181-L038-8ADF9848BA",
                    "ACI-P182-L002-B1650B5553",
                    "ACI-P182-L004-194C24FE0D-03",
                    "ACI-P182-L004-194C24FE0D-04",
                    "ACI-P182-L004-194C24FE0D-05",
                ],
            },
        },
        "lesson21-passive-two-specific-mainline-promotion": {
            silentShuntline: {
                authorizationStatus: "authorized",
                blockReason: "",
                subject: "2sg",
                valence: "specific-projective",
                formula: "#ti-0+⎕-0(mac-o)z+0-0#",
                promotedObjectId: "caused",
                retainedObjectIds: ["direct"],
                retainedCarriers: ["0-0"],
            },
            pluralShuntline: {
                authorizationStatus: "authorized",
                blockReason: "",
                subject: "1sg",
                valence: "specific-projective",
                formula: "#ni-0+qu-in(mac-ō)z+0-0#",
                promotedObjectId: "caused",
                retainedObjectIds: ["direct"],
                retainedCarriers: ["qu-im"],
            },
            nonactiveChoiceForwarding: ["", "lō:mac-ti-lō"],
            cue: {
                start: 1,
                end: 9,
                role: "passive-two-specific-mainline-promotion",
                label: "mainline caused (2sg) → passive subject · shuntline retained 0-0",
                presentation: "carrier",
                lessonSections: ["§21.2.4"],
                atomIds: [
                    "ACI-P182-L010-E24BEADF5D",
                    "ACI-P182-L011-34E83C82C2",
                    "ACI-P182-L015-F2543AB6CE",
                    "ACI-P182-L017-14B2326E02",
                    "ACI-P182-L021-FA8D405171-02",
                    "ACI-P182-L021-FA8D405171-04",
                    "ACI-P182-L025-41D049D423-05",
                    "ACI-P182-L025-41D049D423-06",
                    "ACI-P182-L030-C23035C588-02",
                    "ACI-P182-L030-C23035C588-03",
                    "ACI-P182-L032-27A652CE1E-02",
                    "ACI-P182-L032-27A652CE1E-03",
                    "ACI-P182-L036-1021D26BE7",
                    "ACI-P182-L039-29BE94C614-02",
                    "ACI-P182-L039-29BE94C614-05",
                    "ACI-P182-L039-29BE94C614-06",
                ],
            },
        },
        "lesson21-passive-specific-nonspecific-and-three-object": {
            human: {
                authorizationStatus: "authorized",
                blockReason: "",
                subject: "3sg",
                valence: "projective-human",
                formula: "#0-0+te(mac-o)z+0-0#",
                promotedObjectId: "direct",
                retainedObjectIds: ["applied-human"],
                retainedCarriers: ["tē"],
            },
            nonhuman: {
                authorizationStatus: "authorized",
                blockReason: "",
                subject: "3sg",
                valence: "projective-nonhuman",
                formula: "#0-0+tla(mac-o)z+0-0#",
                promotedObjectId: "direct",
                retainedObjectIds: ["applied-nonhuman"],
                retainedCarriers: ["tla"],
            },
            threeSpecific: {
                authorizationStatus: "authorized",
                blockReason: "",
                subject: "1sg",
                valence: "multiple-object",
                formula: "#ni-0+⎕-0+⎕-0(mac-o)z+0-0#",
                promotedObjectId: "applied",
                retainedObjectIds: ["caused", "direct"],
                retainedCarriers: ["0-0", "0-0"],
            },
            cue: {
                start: 5,
                end: 7,
                role: "passive-specific-nonspecific-and-three-object",
                label: "specific object direct (3sg) → passive subject · retained tē · 2-object rules reused",
                presentation: "carrier",
                lessonSections: ["§21.2.5", "§21.2.6"],
                atomIds: [
                    "ACI-P183-L006-6C457776AC",
                    "ACI-P183-L007-D0EF89CF9E",
                    "ACI-P183-L009-0A59DFEB0F",
                    "ACI-P183-L011-2A1C9685CE-04",
                    "ACI-P183-L011-2A1C9685CE-05",
                    "ACI-P183-L011-2A1C9685CE-06",
                    "ACI-P183-L011-2A1C9685CE-07",
                    "ACI-P183-L011-2A1C9685CE-08",
                    "ACI-P183-L016-C69CC6E6B8-03",
                    "ACI-P183-L016-C69CC6E6B8-04",
                    "ACI-P183-L022-6723A9B7E6-03",
                    "ACI-P183-L022-6723A9B7E6-04",
                    "ACI-P183-L022-6723A9B7E6-06",
                    "ACI-P183-L029-B5ACCFBC4C",
                ],
            },
        },
    };

    const noSpecific = application([
        { objectId: "direct-reflexive", objectKind: "reflexive", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
        { objectId: "applied-reflexive", objectKind: "reflexive", objectPerson: "3sg", governor: "applicative", derivationalLevel: 2 },
    ]);
    const swappedMainline = application([
        { objectId: "direct", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 2 },
        { objectId: "caused", objectKind: "specific-projective", objectPerson: "2sg", governor: "causative", derivationalLevel: 1 },
    ]);
    const nonspecificOnly = application([
        { objectId: "direct-human", objectKind: "nonspecific-human", objectPerson: "", governor: "directive", derivationalLevel: 1 },
        { objectId: "applied-nonhuman", objectKind: "nonspecific-nonhuman", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
    ]);
    const mutations = {
        "lesson21-passive-reflexive-projective-double-object": [
            noSpecific.authorizationStatus,
            noSpecific.blockReason,
            cue(reflexiveProjective, "passive-reflexive-ne-retention"),
        ],
        "lesson21-passive-two-specific-mainline-promotion": [
            swappedMainline.authorizationStatus,
            swappedMainline.blockReason,
            compact(swappedMainline).formula === compact(twoSpecific).formula,
        ],
        "lesson21-passive-specific-nonspecific-and-three-object": [
            nonspecificOnly.authorizationStatus,
            nonspecificOnly.blockReason,
            compact(threeSpecific).retainedObjectIds.length,
        ],
    };
    const expectedMutations = {
        "lesson21-passive-reflexive-projective-double-object": [
            "blocked",
            "classical-vnc-target-voice-not-authorized-for-source",
            undefined,
        ],
        "lesson21-passive-two-specific-mainline-promotion": [
            "blocked",
            "classical-vnc-target-voice-not-authorized-for-source",
            false,
        ],
        "lesson21-passive-specific-nonspecific-and-three-object": [
            "blocked",
            "classical-vnc-target-voice-not-authorized-for-source",
            2,
        ],
    };

    s.eq("accepted Lesson 21 Groups 4-6 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 63, unique: 63, writing: 36, reading: 27 });
    groupIds.forEach((groupId) => {
        s.eq(
            `${groupId} uses the canonical typed object Source`,
            observations[groupId],
            expected[groupId],
        );
    });
    for (const record of writing) {
        s.eq(
            `${record.atomId} performs its accepted writing job`,
            observations[record.reviewGroupId],
            expected[record.reviewGroupId],
        );
        s.eq(
            `mutation:${record.atomId} fails when the typed Source relation is changed`,
            mutations[record.reviewGroupId],
            expectedMutations[record.reviewGroupId],
        );
    }
    return s;
}

module.exports = { run };
