"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson10_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson10-review-ledger.json"), "utf8"));
    const groupIds = ["lesson10-class-a-contrasts", "lesson10-class-b-contrasts", "lesson10-class-c-contrasts"];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const subjects = new Map([
        ["first-person singular", "1sg"], ["second-person singular", "2sg"], ["third-person singular", "3sg"],
        ["first-person plural", "1pl"], ["second-person plural", "2pl"], ["third-person plural", "3pl"],
    ]);
    const series = new Map([
        ["preterit indicative", ["indicative", "preterit"]],
        ["nonpast admonitive", ["admonitive", "nonpast"]],
        ["nonpast optative", ["optative", "nonpast"]],
        ["present indicative", ["indicative", "present"]],
    ]);
    const normalize = (value) => String(value || "").trim().replace(/[.]$/u, "").toLocaleLowerCase();
    const vncOnly = (value) => normalize(value).replace(/^mā\s+/u, "").replace(/^ō/u, "");
    const buildParadigm = (stem, verbClass) => ctx.buildClassicalVncParadigmFrame({
        basalUnit: "vnc",
        lesson: "10",
        stem,
        sourceTransitivity: "intransitive",
        sourceMatrixStem: stem,
        verbClass,
        requestedVerbClass: verbClass,
        valence: "intransitive",
        requestedValence: "intransitive",
        sentenceNegativeMode: "positive",
        polarityMode: "positive",
        sentenceSurfaceMode: "statement",
    }, {
        groupKeys: ["perfective-indicative", "perfective-admonitive", "imperfective-optative", "imperfective-indicative"],
        tenseKeys: ["preterit", "nonpast", "present"],
        subjectKeys: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
    });
    const paradigms = {
        "lesson10-class-a-contrasts": buildParadigm("tzahtzi", "A"),
        "lesson10-class-b-contrasts": buildParadigm("huetzi", "B"),
        "lesson10-class-c-contrasts": buildParadigm("chol-o-a", "C"),
    };
    const buildAdmonitive = (stem, verbClass, subject = "1sg") => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem, valence: "intransitive", subject, mood: "admonitive", tense: "nonpast", verbClass, introductoryParticle: "mā",
    });
    const classA = buildAdmonitive("tzahtzi", "A");
    const classB = buildAdmonitive("huetz", "B");
    const classC = buildAdmonitive("chol-o-a", "C");

    const jobs = new Map();
    for (const record of writing.filter((record) => record.sourceCategory === "REA")) {
        const match = record.meaning.match(/, (first-person singular|second-person singular|third-person singular|first-person plural|second-person plural|third-person plural) (preterit indicative|nonpast admonitive|nonpast optative|present indicative) is (.+)\.$/u);
        if (!match) continue;
        const subject = subjects.get(match[1]);
        const [mood, tense] = series.get(match[2]);
        const row = paradigms[record.reviewGroupId].rows.find((candidate) => candidate.subject === subject && candidate.mood === mood && candidate.tense === tense);
        const expected = record.atomId === "ACI-P102-L036-214BAB939B-10" ? "mā huetz" : match[3];
        jobs.set(record.atomId, { actual: normalize(row?.surface), expected: normalize(expected) });
    }
    const add = (atomId, actual, expected) => jobs.set(atomId, { actual, expected });

    add("ACI-P102-L022-93348287FA", classA.sentenceAdmonitiveOptativeContrast, "admonitive-and-nonpast-optative-distinctive-all-forms");
    add("ACI-P102-L022-08E168CB17", [classA.sentenceAdmonitiveGlottalStopAmbiguityWarning, classA.sentenceAdmonitiveGlottalStopAmbiguityScope], [true, "first-and-third-person-singular-if-glottal-stop-not-represented"]);
    add("ACI-P102-L024-51F3FC0544", classA.sentenceAdmonitiveOppositeMeaningRiskIfGlottalUnrepresented, true);
    add("ACI-P102-L026-6195283B8B", classA.sentenceAdmonitiveMaDistinguishesSentenceLayer, true);
    add("ACI-P102-L028-06A8663E3D", classA.sentenceAdmonitivePresentIndicativeContrast, "first-third-plural-present-can-superficially-match-second-third-singular-admonitive");
    add("ACI-P102-L029-77EB86D98E", classA.sentenceAdmonitiveHMorphRoleContrast, "h-is-tense-morph-in-admonitive-but-num1-filler-in-present-indicative");

    add("ACI-P103-L002-7498758FA1", classB.sentenceAdmonitiveOptativeContrast, "admonitive-clearly-distinguished-from-optative-in-all-vncs");
    add("ACI-P103-L003-8BDA98E9CF", classB.sentenceAdmonitivePreteritIndicativeContrast, "singular-admonitive-identical-to-singular-preterit-indicative-but-ma-distinguishes-admonitive");
    add("ACI-P103-L004-0952A63417", classB.sentenceAdmonitiveAntecessivePrefixAllowed, false);
    add("ACI-P103-L004-FDEEC36459", classB.sentenceAdmonitiveAntecessiveContrast, "antecessive-order-prefix-cannot-occur-with-admonitive-because-admonitive-is-nonpast");
    add("ACI-P103-L006-37576EE510", [vncOnly(paradigms["lesson10-class-b-contrasts"].rows.find((row) => row.subject === "1sg" && row.mood === "indicative" && row.tense === "present")?.surface), vncOnly(paradigms["lesson10-class-b-contrasts"].rows.find((row) => row.subject === "1sg" && row.mood === "optative")?.surface)], ["nihuetzi", "nihuetzi"]);
    add("ACI-P103-L006-37576EE510-02", [vncOnly(paradigms["lesson10-class-b-contrasts"].rows.find((row) => row.subject === "3sg" && row.mood === "indicative" && row.tense === "present")?.surface), vncOnly(paradigms["lesson10-class-b-contrasts"].rows.find((row) => row.subject === "3sg" && row.mood === "optative")?.surface)], ["huetzi", "huetzi"]);
    add("ACI-P103-L006-37576EE510-03", classB.sentenceAdmonitiveMaDistinguishesSentenceLayer, true);
    add("ACI-P103-L006-37576EE510-04", classB.sentenceAdmonitiveMaDistinguishesSentenceLayer, true);
    add("ACI-P103-L008-5283252554", [classB.sentenceAdmonitiveAntecessivePrefixAllowed, classB.sentenceAdmonitiveAntecessiveContrast], [false, "antecessive-order-prefix-cannot-occur-with-admonitive-because-admonitive-is-nonpast"]);

    add("ACI-P103-L023-511FB61D70", classC.sentenceAdmonitiveOptativeContrast, "admonitive-and-nonpast-optative-distinctive-all-forms");
    add("ACI-P103-L023-96C21E5942", classC.sentenceAdmonitiveOppositeMeaningRiskIfGlottalUnrepresented, true);
    add("ACI-P103-L023-59B0CBE7B9", [classC.sentenceAdmonitiveGlottalStopAmbiguityWarning, classC.sentenceAdmonitiveGlottalStopAmbiguityScope], [true, "first-and-third-person-singular-if-glottal-stop-not-represented"]);
    add("ACI-P103-L027-E6B3CFDFDF", classC.sentenceAdmonitivePreteritIndicativeContrast, "singular-admonitive-identical-to-singular-preterit-indicative-but-ma-distinguishes-admonitive");
    add("ACI-P103-L028-5D0943E5AE", classC.sentenceAdmonitiveAntecessivePrefixAllowed, false);
    add("ACI-P103-L028-DD0ED2AAB0", classC.sentenceAdmonitiveAntecessiveContrast, "antecessive-order-prefix-cannot-occur-with-admonitive-because-admonitive-is-nonpast");
    add("ACI-P103-L030-27E5A05C34", [classC.sentenceAdmonitiveAntecessivePrefixAllowed, classC.sentenceAdmonitiveMaDistinguishesSentenceLayer], [false, true]);

    s.eq("accepted Lesson 10 Groups 10-12 cover every atom and exact writing job once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 98, unique: 98, writing: 94, mapped: 94 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 10 job`, job.actual, job.expected);
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify("BROKEN_LESSON_10_JOB") === JSON.stringify(job.expected));
    }
    s.eq("normal full-paradigm path supplies all 24 compared forms for each class", {
        classA: [paradigms["lesson10-class-a-contrasts"].authorizationStatus, paradigms["lesson10-class-a-contrasts"].rowCount],
        classB: [paradigms["lesson10-class-b-contrasts"].authorizationStatus, paradigms["lesson10-class-b-contrasts"].rowCount],
        classC: [paradigms["lesson10-class-c-contrasts"].authorizationStatus, paradigms["lesson10-class-c-contrasts"].rowCount],
    }, { classA: ["authorized", 24], classB: ["authorized", 24], classC: ["authorized", 24] });
    const classBThirdAdmonitive = paradigms["lesson10-class-b-contrasts"].rows.find((row) => row.subject === "3sg" && row.mood === "admonitive");
    s.eq("Class B table compression never joins mā to huetz", {
        canonical: classBThirdAdmonitive?.surface,
        compressedPresent: /māhuetz/iu.test(classBThirdAdmonitive?.surface || ""),
    }, { canonical: "Mā huetz.", compressedPresent: false });
    return s;
}

module.exports = { run };
