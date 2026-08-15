"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson21_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson21-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson21-passive-foundation-and-source-limits",
        "lesson21-passive-formula-and-single-object-promotion",
        "lesson21-passive-reflexive-ne-retention",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const active = ({
        stem,
        subject,
        valence,
        objectPerson = "",
        verbClass = "A",
        tense = "present",
        silentSpecificObject = false,
    }) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense,
        verbClass,
        perfectiveClass: verbClass,
        valence,
        transitivity: valence === "intransitive" ? "intransitive" : "transitive",
        objectKind: valence,
        objectPerson,
        silentSpecificObject,
    });
    const nonactive = (stem, verbClass, sourceValence, optionId = "") => (
        ctx.deriveClassicalNahuatlNonactiveStemRecord(stem, {
            verbClass,
            sourceValence,
            ...(optionId ? { optionId } : {}),
        })
    );
    const passive = ({
        stem,
        subject,
        sourceValence,
        objectPerson = "",
        verbClass = "A",
        tense = "present",
        optionId = "",
        silentSpecificObject = false,
    }) => {
        const source = active({
            stem,
            subject,
            valence: sourceValence,
            objectPerson,
            verbClass,
            tense,
            silentSpecificObject,
        });
        const record = nonactive(
            stem,
            verbClass,
            sourceValence,
            optionId,
        );
        return ctx.buildClassicalNahuatlDerivedVncFrame(source, {
            voice: "passive",
            nonactiveStemRecord: record,
            sourceValence,
            sourceSubject: subject,
            sourceObjectPerson: objectPerson,
            mood: "indicative",
            tense,
            verbClass,
        });
    };
    const annotations = (frame) => ctx.getClassicalFormulaDerivedAnnotations(
        frame.formulaRealization,
        null,
        frame,
    ).filter((entry) => entry.role.startsWith("passive-"));

    const ordinary = passive({
        stem: "chihua",
        subject: "2pl",
        sourceValence: "specific-projective",
        objectPerson: "1sg",
    });
    const intransitiveSource = active({
        stem: "mayāna",
        subject: "3pl",
        valence: "intransitive",
        verbClass: "B",
    });
    const intransitiveRecord = nonactive("mayāna", "B", "intransitive");
    const blockedIntransitive = ctx.buildClassicalNahuatlDerivedVncFrame(
        intransitiveSource,
        {
            voice: "passive",
            nonactiveStemRecord: intransitiveRecord,
            sourceValence: "intransitive",
            sourceSubject: "3pl",
        },
    );
    const nonspecificSource = active({
        stem: "chihua",
        subject: "3sg",
        valence: "projective-human",
        verbClass: "A",
    });
    const nonspecificRecord = nonactive(
        "chihua",
        "A",
        "projective-human",
    );
    const blockedNonspecific = ctx.buildClassicalNahuatlDerivedVncFrame(
        nonspecificSource,
        {
            voice: "passive",
            nonactiveStemRecord: nonspecificRecord,
            sourceValence: "projective-human",
            sourceSubject: "3sg",
        },
    );

    const pluralFrom1sg = passive({
        stem: "āna",
        subject: "1sg",
        sourceValence: "specific-projective",
        objectPerson: "3pl",
        verbClass: "B",
        optionId: "ō:ān-ō",
    });
    const pluralFrom2pl = passive({
        stem: "āna",
        subject: "2pl",
        sourceValence: "specific-projective",
        objectPerson: "3pl",
        verbClass: "B",
        optionId: "ō:ān-ō",
    });
    const silentThird = passive({
        stem: "āyi",
        subject: "3pl",
        sourceValence: "specific-projective",
        objectPerson: "3sg",
        verbClass: "B",
        silentSpecificObject: true,
    });

    const reflexive = passive({
        stem: "zahua",
        subject: "1sg",
        sourceValence: "mainline-reflexive",
    });
    const reciprocal = passive({
        stem: "zahua",
        subject: "1pl",
        sourceValence: "human-reciprocal",
    });

    const ordinaryCues = annotations(ordinary);
    const reflexiveCues = annotations(reflexive);
    const observations = {
        "lesson21-passive-foundation-and-source-limits": {
            authorized: [ordinary.authorizationStatus, ordinary.voice],
            transformation: [
                ordinary.voiceTransformationFrame.sourceSubject,
                ordinary.voiceTransformationFrame.sourceSubjectDeleted,
                ordinary.voiceTransformationFrame.sourceStem,
                ordinary.voiceTransformationFrame.targetStem,
                ordinary.voiceTransformationFrame.promotedObjectBecomesSubject,
                ordinary.voiceTransformationFrame.agentExpressible,
            ],
            invalidSources: [
                [blockedIntransitive.authorizationStatus, blockedIntransitive.blockReason],
                [blockedNonspecific.authorizationStatus, blockedNonspecific.blockReason],
            ],
            cue: ordinaryCues.find((entry) => (
                entry.role === "passive-source-transformation"
            )),
        },
        "lesson21-passive-formula-and-single-object-promotion": {
            oneObject: [
                ordinary.voiceTransformationFrame.sourceSpecificObject,
                ordinary.voiceTransformationFrame.targetSubject,
                ordinary.voiceTransformationFrame.targetValence,
                ordinary.formulaRealization,
            ],
            pluralPromotion: [
                pluralFrom1sg.subject,
                pluralFrom1sg.formulaRealization,
            ],
            activeSubjectsCollapse: (
                pluralFrom1sg.formulaRealization
                === pluralFrom2pl.formulaRealization
            ),
            silentObject: [
                silentThird.authorizationStatus,
                silentThird.subject,
                silentThird.valence,
                silentThird.formulaRealization,
                silentThird.activeMachineryFrame.priorVncFrame
                    ?.objectFrame?.silentSpecificObject,
            ],
            cue: ordinaryCues.find((entry) => (
                entry.role === "passive-single-object-promotion"
            )),
        },
        "lesson21-passive-reflexive-ne-retention": {
            reflexive: [
                reflexive.authorizationStatus,
                reflexive.subject,
                reflexive.valence,
                reflexive.formulaRealization,
                reflexive.voiceTransformationFrame.sourceSubjectDeleted,
            ],
            reciprocal: [
                reciprocal.authorizationStatus,
                reciprocal.subject,
                reciprocal.valence,
                reciprocal.formulaRealization,
            ],
            cue: reflexiveCues.find((entry) => (
                entry.role === "passive-reflexive-ne-retention"
            )),
        },
    };
    const expected = {
        "lesson21-passive-foundation-and-source-limits": {
            authorized: ["authorized", "passive"],
            transformation: [
                "2pl",
                true,
                "chihua",
                "chihua-lō",
                true,
                false,
            ],
            invalidSources: [
                ["blocked", "passive-requires-specific-or-reflexive-object"],
                ["blocked", "passive-requires-specific-or-reflexive-object"],
            ],
            cue: {
                start: 0,
                end: 1,
                role: "passive-source-transformation",
                label: "passive · active subject 2pl deleted · agent cannot be expressed · chihua → chihua-lō",
                presentation: "boundary",
                lessonSections: ["§21.1"],
                atomIds: [
                    "ACI-P180-L005-8CA04071D4",
                    "ACI-P180-L006-5F63598C83",
                    "ACI-P180-L007-A148C00D37",
                    "ACI-P180-L007-A148C00D37-02",
                    "ACI-P180-L007-A148C00D37-03",
                    "ACI-P180-L007-A148C00D37-04",
                    "ACI-P180-L011-47CED2645F",
                    "ACI-P180-L013-4A8D238C1B",
                    "ACI-P180-L015-7CEE842EBD",
                    "ACI-P180-L017-80D2CF82A4",
                    "ACI-P180-L019-652EEF9B9B",
                    "ACI-P180-L019-652EEF9B9B-03",
                ],
            },
        },
        "lesson21-passive-formula-and-single-object-promotion": {
            oneObject: [
                "1sg",
                "1sg",
                "intransitive",
                "#ni-0(chihua-lo)0+0-0#",
            ],
            pluralPromotion: ["3pl", "#0-0(ān-o)0+0-h#"],
            activeSubjectsCollapse: true,
            silentObject: [
                "authorized",
                "3sg",
                "intransitive",
                "#0-0(āyī-hua)0+0-0#",
                true,
            ],
            cue: {
                start: 1,
                end: 5,
                role: "passive-single-object-promotion",
                label: "specific object 1sg → nominative subject 1sg · single-object passive becomes intransitive",
                presentation: "carrier",
                lessonSections: ["§21.2", "§21.2.1"],
                atomIds: [
                    "ACI-P180-L023-1F1409C7BF",
                    "ACI-P180-L028-90F35C9643",
                    "ACI-P181-L002-85ED2274E5",
                    "ACI-P181-L003-0E3D9B2475",
                    "ACI-P181-L008-AD3005935B-03",
                    "ACI-P181-L008-AD3005935B-04",
                    "ACI-P181-L013-892BAC75D4-04",
                    "ACI-P181-L013-892BAC75D4-05",
                    "ACI-P181-L013-892BAC75D4-06",
                    "ACI-P181-L013-892BAC75D4-07",
                    "ACI-P181-L013-892BAC75D4-10",
                    "ACI-P181-L023-E091B01E41",
                    "ACI-P181-L023-129D397475",
                    "ACI-P181-L023-129D397475-02",
                ],
            },
        },
        "lesson21-passive-reflexive-ne-retention": {
            reflexive: [
                "authorized",
                "1sg",
                "shuntline-reflexive",
                "#ni-0+ne(zahua-lo)0+0-0#",
                true,
            ],
            reciprocal: [
                "authorized",
                "1pl",
                "shuntline-reflexive",
                "#ti-0+ne(zahua-lo)0+0-h#",
            ],
            cue: {
                start: 6,
                end: 8,
                role: "passive-reflexive-ne-retention",
                label: "source reflexive object → passive subject 1sg · ne retained on the shuntline",
                presentation: "carrier",
                lessonSections: ["§21.2.2"],
                atomIds: [
                    "ACI-P181-L025-FB15BDA085",
                    "ACI-P181-L026-9B4E20B690",
                    "ACI-P181-L029-18EC409F25",
                    "ACI-P181-L029-18EC409F25-02",
                    "ACI-P181-L033-972A2DB21F-03",
                    "ACI-P181-L033-972A2DB21F-04",
                ],
            },
        },
    };
    const mutations = {
        "lesson21-passive-foundation-and-source-limits": [
            blockedIntransitive.authorizationStatus,
            blockedNonspecific.authorizationStatus,
            ctx.buildClassicalNahuatlDerivedVncFrame(null, {
                voice: "passive",
                nonactiveStemRecord: ordinary.nonactiveStemRecord,
                sourceValence: "specific-projective",
                sourceObjectPerson: "1sg",
            }).blockReason,
        ],
        "lesson21-passive-formula-and-single-object-promotion": [
            ordinary.voiceTransformationFrame.targetSubject === "2pl",
            ordinary.formulaRealization.includes("n-ēch"),
            ordinary.voiceTransformationFrame.sourceSubjectDeleted,
        ],
        "lesson21-passive-reflexive-ne-retention": [
            reflexive.formulaRealization.includes("+ne("),
            reflexive.valence,
            ctx.buildClassicalNahuatlDerivedVncFrame(
                reflexive.activeMachineryFrame,
                {
                    voice: "passive",
                    nonactiveStemRecord: reflexive.nonactiveStemRecord,
                    sourceValence: "intransitive",
                    sourceSubject: "1sg",
                },
            ).authorizationStatus,
        ],
    };
    const expectedMutations = {
        "lesson21-passive-foundation-and-source-limits": [
            "blocked",
            "blocked",
            "lessons20-22-authorized-active-vnc-source-required",
        ],
        "lesson21-passive-formula-and-single-object-promotion": [
            false,
            false,
            true,
        ],
        "lesson21-passive-reflexive-ne-retention": [
            true,
            "shuntline-reflexive",
            "blocked",
        ],
    };

    s.eq("accepted Lesson 21 Groups 1-3 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 55, unique: 55, writing: 32, reading: 23 });
    groupIds.forEach((groupId) => {
        s.eq(
            `${groupId} works through the canonical passive application path`,
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
            `mutation:${record.atomId} fails when its accepted grammar behavior is broken`,
            mutations[record.reviewGroupId],
            expectedMutations[record.reviewGroupId],
        );
    }
    return s;
}

module.exports = { run };
