"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson22_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson22-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson22-impersonal-formula-and-intransitive-irregular-results",
        "lesson22-nonspecific-object-retention-and-readings",
        "lesson22-reflexive-source-to-ne",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const apply = (request = {}) => ctx.evaluateClassicalNahuatlVncApplication({
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        outputScope: "single",
        mood: "indicative",
        tense: "present",
        ...request,
    });
    const cueFor = (applicationFrame, role, readingFrame = null) => {
        const machinery = applicationFrame.resultFrame?.selectedMachineryFrame;
        return ctx.getClassicalFormulaDerivedAnnotations(
            applicationFrame.resultFrame?.formulaRealization || "",
            null,
            readingFrame ? { ...machinery, lesson22ImpersonalReadingFrame: readingFrame } : machinery,
        ).find((entry) => entry.role === role);
    };

    const mayana = apply({
        sourceStem: "mayāna",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3pl",
    });
    const ahci = apply({
        sourceStem: "ahci",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "2pl",
        tense: "preterit",
    });
    const huetzca = apply({
        sourceStem: "hue-tz-ca",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3pl",
        tense: "preterit",
    });
    const yauh = apply({
        sourceStem: "ya-uh",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3pl",
    });
    const cah = apply({
        sourceStem: "ca-h",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "1pl",
        tense: "preterit-as-present",
    });
    const huitz = apply({
        sourceStem: "hui-tz",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "2pl",
        tense: "distant-past-as-past",
    });
    const formulaCue = cueFor(
        mayana,
        "impersonal-formula-and-irregular-results",
    );
    const inheritedIrregularCue = cueFor(
        huitz,
        "impersonal-formula-and-irregular-results",
    );
    const hostileFormula = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "mayāna",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3pl",
        requestedVoice: "impersonal",
        outputScope: "single",
        formula: "#0-0(INVENTED)0+0-0#",
    });

    const human = apply({
        sourceStem: "tla-zo-h-tla",
        verbClass: "A",
        sourceValence: "projective-human",
        subject: "3pl",
    });
    const nonhuman = apply({
        sourceStem: "pol-o-ā",
        verbClass: "C",
        sourceValence: "projective-nonhuman",
        subject: "1pl",
        tense: "preterit",
    });
    const humanAndNonhumanObjects = [
        {
            objectId: "direct-human",
            objectKind: "nonspecific-human",
            governor: "directive",
            derivationalLevel: 1,
        },
        {
            objectId: "applied-nonhuman",
            objectKind: "nonspecific-nonhuman",
            governor: "applicative",
            derivationalLevel: 2,
        },
    ];
    const doubleObject = apply({
        sourceStem: "maca",
        verbClass: "A",
        sourceValence: "projective-human",
        sourceObjectRequests: humanAndNonhumanObjects,
        subject: "1sg",
        tense: "preterit",
    });
    const humanReadingInventory =
        ctx.interpretClassicalNahuatlImpersonalResultReading(human);
    const humanPatientReading =
        ctx.interpretClassicalNahuatlImpersonalResultReading(human, {
            requestedReading: "patient-human",
        });
    const nonhumanReadingInventory =
        ctx.interpretClassicalNahuatlImpersonalResultReading(nonhuman);
    const doubleReadingInventory =
        ctx.interpretClassicalNahuatlImpersonalResultReading(doubleObject);
    const doubleThemeReading =
        ctx.interpretClassicalNahuatlImpersonalResultReading(doubleObject, {
            requestedReading: "patient-nonhuman",
        });
    const invalidHumanReading =
        ctx.interpretClassicalNahuatlImpersonalResultReading(human, {
            requestedReading: "patient-nonhuman",
        });
    const objectCue = cueFor(
        human,
        "impersonal-nonspecific-object-retention",
        humanPatientReading,
    );

    const reflexive = apply({
        sourceStem: "zahua",
        verbClass: "A",
        sourceValence: "mainline-reflexive",
        subject: "1sg",
    });
    const reflexiveAndTlaObjects = [
        {
            objectId: "direct-reflexive",
            objectKind: "reflexive",
            governor: "directive",
            derivationalLevel: 1,
        },
        {
            objectId: "applied-nonhuman",
            objectKind: "nonspecific-nonhuman",
            governor: "applicative",
            derivationalLevel: 2,
        },
    ];
    const reflexiveAndTla = apply({
        sourceStem: "tequi-tī",
        verbClass: "A",
        sourceValence: "mainline-reflexive",
        sourceObjectRequests: reflexiveAndTlaObjects,
        subject: "2sg",
        tense: "preterit",
    });
    const reflexiveReading =
        ctx.interpretClassicalNahuatlImpersonalResultReading(reflexive);
    const reflexiveAndTlaReading =
        ctx.interpretClassicalNahuatlImpersonalResultReading(reflexiveAndTla);
    const reflexiveCue = cueFor(reflexive, "impersonal-reflexive-ne");
    const reflexiveAndTlaCue = cueFor(
        reflexiveAndTla,
        "impersonal-reflexive-ne",
    );

    const observations = {
        "lesson22-impersonal-formula-and-intransitive-irregular-results": {
            formula: [
                mayana.authorizationStatus,
                mayana.controlFrame.selectedVoice,
                mayana.resultFrame.selectedMachineryFrame
                    .voiceTransformationFrame.sourceValence,
                mayana.resultFrame.selectedMachineryFrame
                    .voiceTransformationFrame.targetValence,
                mayana.resultFrame.selectedMachineryFrame
                    .voiceTransformationFrame.sourceSubjectDeleted,
                mayana.resultFrame.selectedMachineryFrame
                    .voiceTransformationFrame.targetSubject,
                mayana.resultFrame.formulaRealization,
                mayana.resultFrame.surfaceRealization,
            ],
            irregularResults: [
                [ahci.resultFrame.formulaRealization, ahci.resultFrame.surfaceRealization],
                [huetzca.resultFrame.formulaRealization, huetzca.resultFrame.surfaceRealization],
                [yauh.resultFrame.formulaRealization, yauh.resultFrame.surfaceRealization],
                [cah.resultFrame.formulaRealization, cah.resultFrame.surfaceRealization],
                [huitz.resultFrame.formulaRealization, huitz.resultFrame.surfaceRealization],
            ],
            cue: [
                formulaCue?.role,
                formulaCue?.atomIds?.length,
                formulaCue?.lessonSections,
                inheritedIrregularCue?.label.includes("inherited Lesson 11 irregular tense"),
            ],
        },
        "lesson22-nonspecific-object-retention-and-readings": {
            results: [
                [human.authorizationStatus, human.resultFrame.formulaRealization, human.resultFrame.surfaceRealization],
                [nonhuman.authorizationStatus, nonhuman.resultFrame.formulaRealization, nonhuman.resultFrame.surfaceRealization],
                [doubleObject.authorizationStatus, doubleObject.resultFrame.formulaRealization, doubleObject.resultFrame.surfaceRealization],
            ],
            readings: [
                humanReadingInventory.availableReadings,
                nonhumanReadingInventory.availableReadings,
                doubleReadingInventory.availableReadings,
                humanPatientReading.selectedReading,
                doubleThemeReading.selectedReading,
                humanPatientReading.formulaRealization,
                doubleThemeReading.formulaRealization,
                humanPatientReading.changesFiniteMorphology,
                humanPatientReading.retainedObjectChoice,
            ],
            cue: [objectCue?.role, objectCue?.atomIds?.length, objectCue?.lessonSections],
        },
        "lesson22-reflexive-source-to-ne": {
            results: [
                [reflexive.authorizationStatus, reflexive.resultFrame.formulaRealization, reflexive.resultFrame.surfaceRealization],
                [reflexiveAndTla.authorizationStatus, reflexiveAndTla.resultFrame.formulaRealization, reflexiveAndTla.resultFrame.surfaceRealization],
            ],
            transform: [
                reflexive.resultFrame.selectedMachineryFrame
                    .voiceTransformationFrame.targetValence,
                reflexiveAndTla.resultFrame.selectedMachineryFrame
                    .voiceTransformationFrame.retainedObjectCarriers,
                reflexiveReading.authorizationStatus,
                reflexiveReading.blockReason,
                reflexiveAndTlaReading.authorizationStatus,
                reflexiveAndTlaReading.blockReason,
            ],
            cue: [
                reflexiveCue?.role,
                reflexiveCue?.atomIds?.length,
                reflexiveCue?.lessonSections,
                reflexiveAndTlaCue?.label.includes("tla retained separately"),
            ],
        },
    };
    const expected = {
        "lesson22-impersonal-formula-and-intransitive-irregular-results": {
            formula: [
                "authorized",
                "impersonal",
                "intransitive",
                "intransitive",
                true,
                "3sg",
                "#0-0(mayāna-lo)0+0-0#",
                "mayānalo",
            ],
            irregularResults: [
                ["#0-0(ahxī-hua)0+c-0#", "ahxīhuac"],
                ["#0-0(hue-tz-c-ō)0+c-0#", "huetzcōc"],
                ["#0-0(hui-lō-hua)0+0-0#", "huilōhua"],
                ["#0-0(ye-lo-hua)0+c-0#", "yelohuac"],
                ["#0-0(huī-lo-hua-tz)a+0-0#", "huīlohuatza"],
            ],
            cue: [
                "impersonal-formula-and-irregular-results",
                21,
                ["§22.4", "§22.4.1"],
                true,
            ],
        },
        "lesson22-nonspecific-object-retention-and-readings": {
            results: [
                ["authorized", "#0-0+tē(tla-zo-h-tla-lo)0+0-0#", "tētlazohtlalo"],
                ["authorized", "#0-0+tla(pol-ō-lō)0+c-0#", "tlapolōlōc"],
                ["authorized", "#0-0+tē+tla(mac-ō)0+c-0#", "tētlamacōc"],
            ],
            readings: [
                ["generalized-active", "distributive", "maximally-generalized", "patient-human"],
                ["generalized-active", "distributive", "patient-nonhuman-singular", "patient-nonhuman-plural"],
                ["generalized-active", "patient-human", "patient-nonhuman", "patient-human-plural-theme"],
                "patient-human",
                "patient-nonhuman",
                "#0-0+tē(tla-zo-h-tla-lo)0+0-0#",
                "#0-0+tē+tla(mac-ō)0+c-0#",
                false,
                false,
            ],
            cue: [
                "impersonal-nonspecific-object-retention",
                28,
                ["§22.4.2"],
            ],
        },
        "lesson22-reflexive-source-to-ne": {
            results: [
                ["authorized", "#0-0+ne(zahua-lo)0+0-0#", "nezahualo"],
                ["authorized", "#0-0+ne+tla(tequi-tī-lō)0+c-0#", "netlatequitīlōc"],
            ],
            transform: [
                "shuntline-reflexive",
                ["ne", "tla"],
                "blocked",
                "impersonal-reflexive-ne-reading-is-derived-from-the-source",
                "blocked",
                "impersonal-reflexive-ne-reading-is-derived-from-the-source",
            ],
            cue: ["impersonal-reflexive-ne", 16, ["§22.4.3"], true],
        },
    };
    const mutations = {
        "lesson22-impersonal-formula-and-intransitive-irregular-results": [
            hostileFormula.authorizationStatus,
            hostileFormula.blockReason,
            mayana.resultFrame.formulaRealization === "#0-0(mayāna)0+0-0#",
            mayana.resultFrame.selectedMachineryFrame
                .voiceTransformationFrame.sourceSubjectDeleted === false,
        ],
        "lesson22-nonspecific-object-retention-and-readings": [
            invalidHumanReading.authorizationStatus,
            invalidHumanReading.blockReason,
            humanPatientReading.formulaRealization
                !== human.resultFrame.formulaRealization,
            doubleThemeReading.formulaRealization
                !== doubleObject.resultFrame.formulaRealization,
        ],
        "lesson22-reflexive-source-to-ne": [
            reflexiveReading.authorizationStatus,
            reflexiveAndTlaReading.authorizationStatus,
            reflexiveAndTla.resultFrame.formulaRealization.includes("+m-o"),
            reflexiveAndTla.resultFrame.formulaRealization.includes("+ne+tla"),
        ],
    };
    const expectedMutations = {
        "lesson22-impersonal-formula-and-intransitive-irregular-results": [
            "blocked",
            "classical-vnc-application-caller-authority-rejected",
            false,
            false,
        ],
        "lesson22-nonspecific-object-retention-and-readings": [
            "blocked",
            "impersonal-result-reading-not-licensed",
            false,
            false,
        ],
        "lesson22-reflexive-source-to-ne": ["blocked", "blocked", false, true],
    };

    s.eq("accepted Lesson 22 Groups 4-6 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 88, unique: 88, writing: 65, reading: 23 });
    groupIds.forEach((groupId) => {
        s.eq(
            `${groupId} works through canonical typed owners`,
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
