"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson6_groups_7_8_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson6-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson6-reflexive-object-structure",
        "lesson6-reflexive-object-paradigm",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writingRecords = records.filter((record) => record.proposedDirection === "BOTH");
    const system = ctx.buildClassicalNahuatlMainlineReflexiveObjectSystemFrame();
    const p = system.paradigm;
    const reciprocalApplication = (subject) => ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "mati", verbClass: "B", sourceValence: "mainline-reflexive",
        subject, mood: "indicative", tense: "present",
        objectInterpretation: "reciprocal", requestedDerivation: "direct",
        requestedVoice: "active", outputScope: "single",
    });
    const singularReciprocal = reciprocalApplication("2sg");
    const pluralReciprocal = reciprocalApplication("2pl");

    const pairs = [
        ["ACI-P074-L022-01B5CFF032", system.alignment, ["person-number", "objective-case"]],
        ["ACI-P074-L022-16DD334C26", system.condition, "mainline-reflexive-or-reciprocative"],
        ["ACI-P074-L024-A5A1E081EB", system.pluralMayBeReciprocal, true],
        ["ACI-P074-L025-D628B6DB99", system.reflectsSubject, true],
        ["ACI-P074-L026-3272E83C4D", system.noRepeatedSubjectInformation, true],
        ["ACI-P074-L028-B320257450", system.va1CarriesPerson, true],
        ["ACI-P074-L028-B320257450-02", system.va1CarriesNumber, true],
        ["ACI-P074-L028-B320257450-03", system.firstSingularVa1, "n"],
        ["ACI-P074-L028-B320257450-04", system.firstPluralVa1, "t"],
        ["ACI-P074-L032-766EB1B178", system.nonfirstVa1, "m"],
        ["ACI-P074-L033-07E54C007A", [system.va2Carries, system.consonantInitialVa2], [["objective-case"], "o"]],
        ["ACI-P074-L034-34199278E6", system.vowelInitialVa2, "⎕"],
        ["ACI-P074-L034-2B64B4B3D3", [system.vowelInitialCondition, system.replacementRule, p.firstSingularBeforeVowel.formula], ["vowel-initial-verbstem", "lesson-6.6.2-square-zero-before-vowel", "#n-0+n-⎕(itta)0+0-0#"]],

        ["ACI-P074-L036-7758C04A7A", [p.firstSingular.va1, p.firstPlural.va1, p.secondSingular.va1], ["n", "t", "m"]],
        ["ACI-P075-L004-A99BF9D40A", p.secondSingular.alternateObjectDyads, ["m-o", "m-⎕"]],
        ["ACI-P075-L004-A99BF9D40A-02", system.readingsBySubject.secondSingular, ["yourself"]],
        ["ACI-P075-L004-A99BF9D40A-03", system.readingsBySubject.thirdSingularHumanMale, ["himself"]],
        ["ACI-P075-L004-A99BF9D40A-04", system.readingsBySubject.thirdSingularHumanFemale, ["herself"]],
        ["ACI-P075-L004-A99BF9D40A-05", system.readingsBySubject.thirdSingularNonhuman, ["itself"]],
        ["ACI-P075-L004-A99BF9D40A-06", system.readingsBySubject.secondPlural[0], "yourselves"],
        ["ACI-P075-L004-A99BF9D40A-07", system.readingsBySubject.secondPlural[1], "one another"],
        ["ACI-P075-L004-A99BF9D40A-08", system.readingsBySubject.thirdPlural[0], "themselves"],
        ["ACI-P075-L004-A99BF9D40A-09", system.readingsBySubject.thirdPlural[1], "one another"],
        ["ACI-P075-L004-A99BF9D40A-10", [system.reciprocalRequiresPluralSubject, singularReciprocal.authorizationStatus, pluralReciprocal.authorizationStatus], [true, "blocked", "authorized"]],
    ];
    const observations = new Map(pairs.map(([id, actual]) => [id, actual]));
    const expected = new Map(pairs.map(([id, , wanted]) => [id, wanted]));

    s.eq("accepted Lesson 6 Groups 7-8 cover every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writingRecords.length,
        reading: records.length - writingRecords.length,
    }, { records: 26, unique: 26, writing: 24, reading: 2 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writingRecords.filter((record) => observations.has(record.atomId)).length,
        expected: writingRecords.filter((record) => expected.has(record.atomId)).length,
        missing: writingRecords.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 24, expected: 24, missing: [] });
    for (const record of writingRecords) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = Array.isArray(actual)
            ? [...actual, "BROKEN"]
            : actual && typeof actual === "object"
                ? { ...actual, BROKEN: true }
                : typeof actual === "boolean" ? !actual : `${actual}-BROKEN`;
        s.no(`${record.atomId} fails when its exact behavior is broken`,
            JSON.stringify(broken) === JSON.stringify(wanted));
    }
    s.ok("the reflexive and reciprocal Results are issued by their canonical owner",
        ctx.isClassicalNahuatlMainlineReflexiveObjectSystemFrame(system));
    s.eq("singular reciprocal input is blocked but plural reciprocal input works", {
        singular: singularReciprocal.authorizationStatus,
        plural: pluralReciprocal.authorizationStatus,
    }, { singular: "blocked", plural: "authorized" });
    return s;
}

module.exports = { run };
