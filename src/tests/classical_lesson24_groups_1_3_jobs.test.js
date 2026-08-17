"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson24_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson24-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson24-final-vowel-and-open-valence",
        "lesson24-valence-neutral-sources",
        "lesson24-final-i-type-one-causatives",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const source = (stem, valence = "intransitive", objectPerson = "", verbClass = "B") => (
        ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            verbClass,
            perfectiveClass: verbClass,
            valence,
            transitivity: valence === "intransitive" ? "intransitive" : "transitive",
            objectKind: valence,
            objectPerson,
        })
    );
    const application = (stem, valence = "intransitive", objectPerson = "", verbClass = "B", extra = {}) => (
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: stem,
            verbClass,
            sourceValence: valence,
            sourceObjectPerson: objectPerson,
            subject: extra.subject || "3sg",
            sourceSubject: extra.sourceSubject || "3sg",
            requestedDerivation: extra.requestedDerivation || "direct",
            derivationOptionId: extra.derivationOptionId || "",
            causativeObjectKind: extra.causativeObjectKind || "",
            requestedVoice: "active",
            outputScope: "single",
        })
    );

    const openVowels = [
        ["xopi", "B"],
        ["xela", "A"],
        ["xoco", "A"],
        ["xele", "B"],
    ].map(([stem, verbClass]) => application(stem, "intransitive", "", verbClass));
    const xopiIntransitive = openVowels[0];
    const xopiTransitive = application("xopi", "specific-projective", "3sg", "B");
    const directCues = ctx.getClassicalFormulaDerivedAnnotations(
        xopiIntransitive.resultFrame.formulaRealization,
        null,
        xopiIntransitive,
    );

    const teciIntransitive = ctx.getClassicalNahuatlNonactiveStemOptions("teci", {
        verbClass: "B",
        sourceValence: "intransitive",
    });
    const teciTransitive = ctx.getClassicalNahuatlNonactiveStemOptions("teci", {
        verbClass: "B",
        sourceValence: "specific-projective",
    });

    const xopiSource = source("xopi");
    const xopiInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        xopiSource,
        { derivationType: "causative" },
    );
    const typeOneOptions = xopiInventory.options.filter((option) => (
        option.derivationSubtype === "type-one"
    ));
    const typeOneApplications = typeOneOptions.map((option) => application(
        "xopi",
        "intransitive",
        "",
        "B",
        {
            subject: "1sg",
            requestedDerivation: "causative",
            derivationOptionId: option.optionId,
            causativeObjectKind: "specific-projective",
        },
    ));
    const typeOneCues = typeOneApplications.flatMap((frame) => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.resultFrame.formulaRealization,
            null,
            frame,
        )
    ));
    const huaquiSource = source("huā-qui");
    const huaquiInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        huaquiSource,
        { derivationType: "causative" },
    );

    const observations = {
        "lesson24-final-vowel-and-open-valence": {
            open: openVowels.map((frame) => [
                frame.authorizationStatus,
                frame.normalizedRequest.sourceStem,
                frame.normalizedRequest.sourceValence,
            ]),
            sameShape: [
                xopiIntransitive.authorizationStatus,
                xopiTransitive.authorizationStatus,
                xopiIntransitive.normalizedRequest.sourceStem,
                xopiTransitive.normalizedRequest.sourceStem,
                xopiIntransitive.normalizedRequest.sourceValence,
                xopiTransitive.normalizedRequest.sourceValence,
            ],
            cue: directCues.find((cue) => (
                cue.role === "lesson24-final-vowel-and-open-valence"
            ))?.role || "",
        },
        "lesson24-valence-neutral-sources": {
            sameShape: [
                xopiIntransitive.resultFrame.sourceMachineryFrame.stem,
                xopiTransitive.resultFrame.sourceMachineryFrame.stem,
                xopiTransitive.normalizedRequest.sourceObjectRequests.length === 1,
            ],
            nonactive: {
                intransitive: teciIntransitive.options.map((option) => [
                    option.nonactiveStem,
                    option.suffixFamily,
                ]),
                transitive: teciTransitive.options.map((option) => [
                    option.nonactiveStem,
                    option.suffixFamily,
                ]),
            },
            cue: directCues.find((cue) => (
                cue.role === "lesson24-valence-neutral-sources"
            ))?.role || "",
        },
        "lesson24-final-i-type-one-causatives": {
            selection: [xopiInventory.authorizationStatus, xopiInventory.selectionRequired],
            options: typeOneOptions.map((option) => [
                option.derivationRoute,
                option.targetStem,
                option.targetClass,
                option.targetConstruction.operation,
                option.targetConstruction.remove || "",
                option.targetConstruction.add,
                option.lexicalChoiceRequired,
            ]),
            applications: typeOneApplications.map((frame) => [
                frame.authorizationStatus,
                frame.resultFrame.derivationOperationFrame.targetStem,
                frame.resultFrame.derivationOperationFrame.targetClass,
                frame.resultFrame.derivationOperationFrame.participantTransformFrame.targetObjectCount,
                frame.resultFrame.derivationOperationFrame.participantTransformFrame
                    .addedObjectRequest.governor,
            ]),
            consonantChange: huaquiInventory.options.some((option) => (
                option.targetStem === "huā-tz-a"
                && option.targetConstruction.operation === "replace-final-and-consonant"
            )),
            cue: typeOneCues.some((cue) => (
                cue.role === "lesson24-final-i-type-one-causatives"
                && cue.label.includes("Class B")
            )) && typeOneCues.some((cue) => (
                cue.role === "lesson24-final-i-type-one-causatives"
                && cue.label.includes("Class C")
            )),
        },
    };
    const expected = {
        "lesson24-final-vowel-and-open-valence": {
            open: [
                ["authorized", "xopi", "intransitive"],
                ["authorized", "xela", "intransitive"],
                ["authorized", "xoco", "intransitive"],
                ["authorized", "xele", "intransitive"],
            ],
            sameShape: [
                "authorized", "authorized", "xopi", "xopi",
                "intransitive", "specific-projective",
            ],
            cue: "lesson24-final-vowel-and-open-valence",
        },
        "lesson24-valence-neutral-sources": {
            sameShape: ["xopi", "xopi", true],
            nonactive: {
                intransitive: [["tecī-hua", "hua"]],
                transitive: [["tex-ō", "ō"], ["tex-o-hua", "o-hua"]],
            },
            cue: "lesson24-valence-neutral-sources",
        },
        "lesson24-final-i-type-one-causatives": {
            selection: ["authorized", true],
            options: [
                ["type-one-final-i-replacement", "xop-a", "B", "replace-final", "i", "a", true],
                ["type-one-final-i-addition", "xopi-ā", "C", "append", "", "ā", true],
            ],
            applications: [
                ["authorized", "xop-a", "B", 1, "causative"],
                ["authorized", "xopi-ā", "C", 1, "causative"],
            ],
            consonantChange: true,
            cue: true,
        },
    };
    const mutations = {
        "lesson24-final-vowel-and-open-valence": [
            openVowels.some((frame) => frame.authorizationStatus !== "authorized"),
            xopiTransitive.normalizedRequest.sourceValence !== "specific-projective",
            !directCues.some((cue) => cue.label.includes("reading clue only")),
        ],
        "lesson24-valence-neutral-sources": [
            xopiTransitive.authorizationStatus !== "authorized",
            teciIntransitive.options[0]?.nonactiveStem === teciTransitive.options[0]?.nonactiveStem,
            !directCues.some((cue) => cue.label.includes("no valence-neutral list or toggle")),
        ],
        "lesson24-final-i-type-one-causatives": [
            typeOneOptions.length !== 2,
            typeOneOptions[0]?.targetClass === typeOneOptions[1]?.targetClass,
            typeOneApplications.some((frame) => frame.authorizationStatus !== "authorized"),
            typeOneCues.some((cue) => cue.role === "lesson24-final-i-type-one-causatives") === false,
        ],
    };

    s.eq("accepted Lesson 24 Groups 1-3 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => record.proposedDirection === "READING_ONLY").length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 137, records: 137, both: 22, readingOnly: 115, unique: 137 });
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
