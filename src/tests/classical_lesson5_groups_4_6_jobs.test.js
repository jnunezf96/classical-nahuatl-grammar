"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const SQUARE_ZERO = "⎕";

function run(ctx = {}) {
    const s = createSuite("classical_lesson5_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson5-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson5-subject-case-filler",
        "lesson5-subject-number-connector",
        "lesson5-subject-number-suffix",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writingRecords = records.filter((record) => record.proposedDirection === "BOTH");
    const finite = (options) => ctx.buildClassicalNahuatlFiniteVncResult(
        options.stem || "mati", options
    );

    const presentSingular = finite({ subject: "1sg", mood: "indicative", tense: "present" });
    const presentPlural = finite({ subject: "1pl", mood: "indicative", tense: "present" });
    const customaryPlural = finite({ subject: "1pl", mood: "indicative", tense: "customary-present" });
    const imperfectPlural = finite({ subject: "1pl", mood: "indicative", tense: "imperfect" });
    const distantPlural = finite({ subject: "1pl", mood: "indicative", tense: "distant-past" });
    const pastOptativePlural = finite({ subject: "1pl", mood: "optative", tense: "past" });
    const futureSingular = finite({ subject: "1sg", mood: "indicative", tense: "future", verbClass: "A" });
    const futurePlural = finite({ subject: "1pl", mood: "indicative", tense: "future", verbClass: "A" });
    const preteritASingular = finite({ subject: "1sg", mood: "indicative", tense: "preterit", verbClass: "A" });
    const preteritBSingular = finite({ subject: "1sg", mood: "indicative", tense: "preterit", verbClass: "B" });
    const preteritPlural = finite({ subject: "1pl", mood: "indicative", tense: "preterit", verbClass: "A" });
    const optativeSingular = finite({ subject: "1sg", mood: "optative", tense: "nonpast" });
    const optativePlural = finite({ subject: "1pl", mood: "optative", tense: "nonpast" });
    const admonitiveSingular = finite({ subject: "1sg", mood: "admonitive", tense: "nonpast" });
    const admonitivePlural = finite({ subject: "1pl", mood: "admonitive", tense: "nonpast" });
    const person = presentSingular.personDyad;

    const irregularPlan = ctx.buildClassicalNahuatlIrregularVncParadigmPlan("hui-tz", {
        subject: "1sg",
        mood: "indicative",
        semanticTense: "general-past",
    });
    const irregularTyped = ctx.buildClassicalNahuatlVncSlotFrame({
        sourceFrameKind: "lesson5-number-connector-irregular-boundary",
        sourceAuthorizationStatus: "authorized",
        stem: "hui-tz",
        personDyad: { pers1: "ni", pers2: "0" },
        tenseFrame: { tns: "ca" },
        numberDyad: { num1: "qu", num2: "0" },
    });
    const irregularApplication = ctx.applyClassicalNahuatlLesson11PlanToVncSlotFrame(
        irregularPlan, irregularTyped
    );

    const observations = new Map([
        ["ACI-P066-L033-9298289CDF", person.pers2Locus],
        ["ACI-P066-L033-5043A0EB61", person.pers2Case],
        ["ACI-P066-L034-E9C7BF87CC", person.pers2CaseMorph],
        ["ACI-P066-L035-87CF77E36D", person.pers2Locus],
        ["ACI-P066-L035-87CF77E36D-02", person.pers2Case],
        ["ACI-P066-L035-87CF77E36D-03", [person.pers2, presentSingular.formula]],
        ["ACI-P066-L035-87CF77E36D-04", [person.pers2CaseIsSilentlyPresent, person.pers2CaseIsNotGrammaticalAbsence, presentSingular.written]],

        ["ACI-P066-L038-E95A69E5E8", presentSingular.numberDyad.num1Locus],
        ["ACI-P066-L038-044B926E52", presentSingular.numberDyad.num1MediatesPredicateAndNum2],
        ["ACI-P066-L040-AB1B7A2863", [presentSingular.numberDyad.num1, futurePlural.numberDyad.num1, optativePlural.numberDyad.num1, admonitivePlural.numberDyad.num1]],
        ["ACI-P067-L002-C2FFFE34F2", presentSingular.numberDyad.num1],
        ["ACI-P067-L003-C1198E0116", [presentPlural, customaryPlural, imperfectPlural, distantPlural, pastOptativePlural].map((result) => result.numberDyad.num1)],
        ["ACI-P067-L005-DC30495266", [preteritASingular.numberDyad.num1, futurePlural.numberDyad.num1, preteritBSingular.numberDyad.num1Variants, preteritBSingular.numberDyad.num1BaseMorphSpelling]],
        ["ACI-P067-L007-4B84CFF753", [preteritASingular.numberDyad.num1, futurePlural.numberDyad.num1, preteritASingular.numberDyad.num1BaseMorphSpelling, futurePlural.numberDyad.num1BaseMorphSpelling]],
        ["ACI-P067-L007-4B84CFF753-02", [preteritBSingular.numberDyad.num1Variants, preteritBSingular.numberDyad.num1SupportiveVowelForQui, preteritBSingular.numberDyad.quiIsIrregularSupportiveVowelCarrier]],
        ["ACI-P067-L009-74EA403D49", [futurePlural.numberDyad.num1, futurePlural.numberDyad.num2]],
        ["ACI-P067-L010-6488B3CC1F", futurePlural.numberDyad.num2],
        ["ACI-P067-L011-54E726E418", [preteritASingular.numberDyad.num1VariantRule, preteritBSingular.numberDyad.num1VariantRule]],
        ["ACI-P067-L011-270BA4E31B", [preteritASingular.numberDyad.num1, preteritBSingular.numberDyad.num1Variants]],
        ["ACI-P067-L013-37332A1592", [preteritASingular.numberDyad.verbClass, preteritASingular.numberDyad.num1, preteritBSingular.numberDyad.verbClass, preteritBSingular.numberDyad.num1]],
        ["ACI-P067-L014-110527F983", [preteritASingular.tense, preteritASingular.numberDyad.num1, preteritASingular.numberDyad.dyadRemainsSubjectConnector]],
        ["ACI-P067-L016-4558E8C87A", [preteritASingular.numberDyad.tenseMorphDoesNotOwnNum1, preteritASingular.numberDyad.num1Locus]],
        ["ACI-P067-L019-A3CF78EEA3", [preteritBSingular.numberDyad.num1, preteritBSingular.numberDyad.num1Variants, preteritBSingular.numberDyad.alternateNumberDyads]],
        ["ACI-P067-L022-44C0441496", [irregularApplication.authorizationStatus, irregularApplication.typedVncSlotFrame.slots.number.num1]],
        ["ACI-P067-L025-3CE484B348", [[optativePlural.numberDyad.num1, optativePlural.numberDyad.num2], [optativeSingular.numberDyad.num1, optativeSingular.numberDyad.num2]]],
        ["ACI-P067-L029-31914A65EF", [[admonitivePlural.numberDyad.num1, admonitivePlural.numberDyad.num2], [admonitiveSingular.numberDyad.num1, admonitiveSingular.numberDyad.num2]]],

        ["ACI-P067-L031-47DF6EA054", presentSingular.numberDyad.num2Locus],
        ["ACI-P067-L032-2DF66E2A0D", [presentSingular, futureSingular, preteritASingular, optativeSingular, admonitiveSingular].map((result) => result.numberDyad.num2)],
        ["ACI-P067-L033-4B7E1A6037", [presentPlural.numberDyad.num2, futurePlural.numberDyad.num2, optativePlural.numberDyad.num2, admonitivePlural.numberDyad.num2]],
        ["ACI-P067-L036-566811EA90", [presentPlural, customaryPlural, imperfectPlural, distantPlural, pastOptativePlural].map((result) => result.numberDyad.num2)],
        ["ACI-P067-L039-052CC9A185", [futurePlural.numberDyad.num2, preteritPlural.numberDyad.num2]],
        ["ACI-P068-L002-9E872F177B", optativePlural.numberDyad.num2],
        ["ACI-P068-L004-BA9F731283", admonitivePlural.numberDyad.num2],
        ["ACI-P068-L004-BA9F731283-02", admonitivePlural.numberDyad.num2Variants],
        ["ACI-P068-L005-3E73B3B787", admonitivePlural.numberDyad.alternateNumberDyads],
    ]);

    const expected = new Map([
        ["ACI-P066-L033-9298289CDF", "subject-case"],
        ["ACI-P066-L033-5043A0EB61", "nominative"],
        ["ACI-P066-L034-E9C7BF87CC", "0"],
        ["ACI-P066-L035-87CF77E36D", "subject-case"],
        ["ACI-P066-L035-87CF77E36D-02", "nominative"],
        ["ACI-P066-L035-87CF77E36D-03", ["0", "#ni-0(mati)0+0-0#"]],
        ["ACI-P066-L035-87CF77E36D-04", [true, true, "nimati"]],
        ["ACI-P066-L038-E95A69E5E8", "subject-number-connector"],
        ["ACI-P066-L038-044B926E52", true],
        ["ACI-P066-L040-AB1B7A2863", ["0", "qu", "c", "t"]],
        ["ACI-P067-L002-C2FFFE34F2", "0"],
        ["ACI-P067-L003-C1198E0116", ["0", "0", "0", "0", "0"]],
        ["ACI-P067-L005-DC30495266", ["c", "qu", [SQUARE_ZERO, "qui"], "qu"]],
        ["ACI-P067-L007-4B84CFF753", ["c", "qu", "c", "qu"]],
        ["ACI-P067-L007-4B84CFF753-02", [[SQUARE_ZERO, "qui"], "i", true]],
        ["ACI-P067-L009-74EA403D49", ["qu", "eh"]],
        ["ACI-P067-L010-6488B3CC1F", "eh"],
        ["ACI-P067-L011-54E726E418", ["c-after-class-a-preterit-vowel", "square-zero-replaces-qui-outside-class-a-vowel"]],
        ["ACI-P067-L011-270BA4E31B", ["c", [SQUARE_ZERO, "qui"]]],
        ["ACI-P067-L013-37332A1592", ["A", "c", "B", SQUARE_ZERO]],
        ["ACI-P067-L014-110527F983", ["preterit", "c", true]],
        ["ACI-P067-L016-4558E8C87A", [true, "subject-number-connector"]],
        ["ACI-P067-L019-A3CF78EEA3", [SQUARE_ZERO, [SQUARE_ZERO, "qui"], ["qui-0"]]],
        ["ACI-P067-L022-44C0441496", ["authorized", SQUARE_ZERO]],
        ["ACI-P067-L025-3CE484B348", [["c", "ān"], [SQUARE_ZERO, "0"]]],
        ["ACI-P067-L029-31914A65EF", [["t", "in"], [SQUARE_ZERO, "0"]]],
        ["ACI-P067-L031-47DF6EA054", "definitive-subject-number"],
        ["ACI-P067-L032-2DF66E2A0D", ["0", "0", "0", "0", "0"]],
        ["ACI-P067-L033-4B7E1A6037", ["h", "eh", "ān", "in"]],
        ["ACI-P067-L036-566811EA90", ["h", "h", "h", "h", "h"]],
        ["ACI-P067-L039-052CC9A185", ["eh", "eh"]],
        ["ACI-P068-L002-9E872F177B", "ān"],
        ["ACI-P068-L004-BA9F731283", "in"],
        ["ACI-P068-L004-BA9F731283-02", ["in", "ih"]],
        ["ACI-P068-L005-3E73B3B787", ["t-ih"]],
    ]);

    s.eq("accepted Lesson 5 Groups 4-6 cover every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writingRecords.length,
        reading: records.length,
    }, { records: 39, unique: 39, writing: 35, reading: 39 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writingRecords.filter((record) => observations.has(record.atomId)).length,
        expected: writingRecords.filter((record) => expected.has(record.atomId)).length,
        missing: writingRecords.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 35, expected: 35, missing: [] });

    for (const record of writingRecords) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = JSON.parse(JSON.stringify(actual));
        if (Array.isArray(broken)) broken.push("BROKEN");
        else if (typeof broken === "boolean") observations.set(record.atomId, !broken);
        else observations.set(record.atomId, `${broken}-BROKEN`);
        if (Array.isArray(broken)) observations.set(record.atomId, broken);
        s.no(`${record.atomId} fails when its exact behavior is broken`,
            JSON.stringify(observations.get(record.atomId)) === JSON.stringify(wanted));
    }

    const shell = ctx.ClassicalAuthorityPanel();
    s.no("derived pers2, num1, and num2 carriers are not added as user controls",
        /(?:id|name)="[^"]*(?:pers2|num1|num2|number-connector)[^"]*"/iu.test(shell));

    return s;
}

module.exports = { run };
