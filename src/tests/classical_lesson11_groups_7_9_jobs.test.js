"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson11_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson11-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson11-itzi-compound-paradigm",
        "lesson11-amia-constructions",
        "lesson11-zero-ia-mani-nemi-relations",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const build = (stem, overrides = {}) => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem,
        valence: "intransitive",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        verbClass: "B",
        ...overrides,
    });
    const plan = (frame) => frame.machineryFrame?.lesson11ParadigmPlan || {};

    const huitz = build("hui-tz");
    const huitzPlural = build("hui-tz", { subject: "1pl" });
    const huitzPast = build("hui-tz", { subject: "2sg", tense: "general-past" });
    const huitzFuture = build("hui-tz", { tense: "future" });
    const huitzSecond = build("hui-tz", { subject: "2sg" });
    const itquitz = build("itqui-tz", {
        valence: "projective-nonhuman",
        sourceInitialISelection: "real",
    });
    const ambiguousItz = build("itz", { tense: "preterit" });
    const alertItz = build("itz", { tense: "preterit", lexicalReading: "alert-observant" });
    const simpleMotionItz = build("itz", { lexicalReading: "motion" });

    const amiaMissing = build("am-i-ā");
    const quenAmia = build("am-i-ā", { subject: "3sg", construction: "quēn" });
    const quenMachAmia = build("am-i-ā", { construction: "quēn-mach" });
    const incorporatedAmia = build("am-i-ā", { subject: "2sg", construction: "incorporated-quēn" });

    const zeroIaMissing = build("i-ā", { subject: "2pl" });
    const zeroIa = build("i-ā", { subject: "2pl", construction: "pronominal-nnc" });
    const mani = build("mani", { subject: "3sg" });
    const maniPreterit = build("mani", { subject: "3sg", tense: "preterit" });
    const maniPast = build("mani", { subject: "3sg", tense: "general-past" });
    const maniWide = build("mani", { subject: "3sg", predicateReferentKind: "wide-flat-thing" });
    const maniMass = build("mani", { subject: "3sg", predicateReferentKind: "mass-or-crowd" });
    const maniIndividual = build("mani", { subject: "3sg", predicateReferentKind: "individual-animate" });
    const nemi = build("nemi", { subject: "3sg" });
    const nemiPreterit = build("nemi", { subject: "3sg", tense: "preterit" });
    const nemiPast = build("nemi", { subject: "3sg", tense: "general-past" });

    const observations = new Map();
    const expected = new Map();
    const add = (atomId, actual, wanted) => {
        observations.set(atomId, actual);
        expected.set(atomId, wanted);
    };

    add("ACI-P107-L030-2C30D8AF1A",
        [plan(huitz).irregularityKind, plan(huitz).morphologicalTense, huitzFuture.authorizationStatus, huitzFuture.blockReason],
        ["defective-compound-only", "preterit", "blocked", "defective-itz-only-preterit-as-present-or-distant-past-as-past"]);
    add("ACI-P107-L034-D374C0BC37",
        [ctx.buildClassicalNahuatlIrregularVncParadigmPlan("itz", { lexicalReading: "motion", tense: "present" }).authorizationStatus,
            ctx.buildClassicalNahuatlIrregularVncParadigmPlan("itz", { lexicalReading: "motion", tense: "present" }).blockReason],
        ["blocked", "motion-itz-never-occurs-in-a-simple-stemmed-vnc"]);
    add("ACI-P107-L034-345B30D332",
        [plan(huitz).applies, plan(itquitz).applies, plan(huitz).irregularityKind, plan(itquitz).irregularityKind],
        [true, true, "defective-compound-only", "defective-compound-only"]);
    add("ACI-P108-L002-B869DC3E81",
        [huitzPlural.sentenceFormulaDisplay, huitzPlural.sentenceSurfaceDisplay],
        ["#ti-0(hui-tz)0+⎕-eh#.", "Tihuitzeh."]);
    add("ACI-P108-L011-39214EEA5E",
        [plan(huitzPast).morphologicalTense, huitzPast.sentenceFormulaDisplay, huitzPast.sentenceSurfaceDisplay],
        ["distant-past", "#ti-0(hui-tz)a+0-0#.", "Tihuitza."]);
    add("ACI-P108-L022-FC3118146B",
        [plan(huitzSecond).contextualInterpretation, plan(huitzSecond).authorizedSentenceRoles],
        ["second-person-indicative-may-express-command", ["statement", "command"]]);
    add("ACI-P108-L025-AA241C5DA3",
        [ambiguousItz.authorizationStatus, ambiguousItz.blockReason, alertItz.authorizationStatus, plan(alertItz).irregularityKind],
        ["blocked", "itz-reading-must-distinguish-motion-from-alert-observant", "authorized", "defective-alert-perfective-only"]);
    add("ACI-P108-L026-AC3FDD8441",
        [simpleMotionItz.authorizationStatus, alertItz.authorizationStatus, itquitz.authorizationStatus],
        ["blocked", "authorized", "authorized"]);

    add("ACI-P108-L028-BC30330250",
        [plan(quenAmia).irregularityKind, plan(quenAmia).morphologicalTense, plan(quenAmia).semanticTenseValue],
        ["defective-construction-bound", "preterit", "present"]);
    add("ACI-P108-L030-4645D457AD",
        [amiaMissing.authorizationStatus, amiaMissing.blockReason, quenAmia.authorizationStatus],
        ["blocked", "am-i-a-requires-quen-construction-and-present-meaning", "authorized"]);
    add("ACI-P108-L034-7AC357A1DB-02",
        [quenMachAmia.sentenceFormulaDisplay, quenMachAmia.sentenceSurfaceDisplay],
        ["quēn mach #n-0(am-i-h)0+⎕-0#!", "Quēn mach namih!"]);
    add("ACI-P108-L034-7AC357A1DB-03",
        [plan(quenMachAmia).subjectNumber, quenMachAmia.sentenceFormulaDisplay.startsWith("quēn mach #n-"), quenMachAmia.sentenceSurfaceDisplay.startsWith("Quēn mach n")],
        ["singular", true, true]);
    add("ACI-P108-L034-7AC357A1DB-04",
        [plan(quenMachAmia).irregularityKind, plan(quenMachAmia).paradigmTense, quenMachAmia.sentenceFormulaDisplay.includes("(am-i-h)")],
        ["defective-construction-bound", "preterit-as-present", true]);
    add("ACI-P108-L034-7AC357A1DB-05",
        [quenMachAmia.sentenceSurfaceFrame.lesson11ConstructionParticles, quenMachAmia.sentenceSurfaceFrame.finalPunctuation, quenMachAmia.sentenceSurfaceDisplay],
        [["quēn", "mach"], "!", "Quēn mach namih!"]);
    add("ACI-P108-L037-90BDE6BBE7",
        [incorporatedAmia.authorizationStatus, plan(incorporatedAmia).selectedStemOverride, incorporatedAmia.sentenceFormulaDisplay],
        ["authorized", "quē-n-am-i-h", "#ti-0(quē-n-am-i-h)0+⎕-0#."]);

    add("ACI-P108-L040-8CDA405528",
        [plan(zeroIa).irregularityKind, plan(zeroIa).morphologicalTense, plan(zeroIa).selectedStemOverride],
        ["defective-nnc-cooperation", "preterit", "0-i-h"]);
    add("ACI-P109-L002-AF0781E708",
        [zeroIaMissing.authorizationStatus, zeroIaMissing.blockReason, zeroIa.authorizationStatus],
        ["blocked", "zero-i-a-requires-pronominal-nnc-cooperation", "authorized"]);
    add("ACI-P109-L003-8C51A8439E",
        [plan(zeroIa).rootMorpheme, plan(zeroIa).rootMorphemeRole, plan(zeroIa).zeroRootPreserved, zeroIa.sentenceFormulaDisplay],
        ["0", "verbstem-root", true, "#am-0(0-i-h)0+qu-eh#."]);
    add("ACI-P109-L009-154A6AA078",
        [plan(mani).irregularityKind, plan(mani).paradigmRelationFrame.relationDisplay],
        ["preterit-stem-exception", "(mani) > (man)"]);
    add("ACI-P109-L009-154A6AA078-02",
        [plan(maniPreterit).selectedStemOverride, maniPreterit.sentenceSurfaceDisplay],
        ["mani", "Manic."]);
    add("ACI-P109-L009-154A6AA078-03",
        [plan(maniPast).morphologicalTense, maniPast.sentenceFormulaDisplay, maniPast.sentenceSurfaceDisplay],
        ["distant-past", "#0-0(man)ca+0-0#.", "Manca."]);
    add("ACI-P109-L009-154A6AA078-04",
        [plan(maniWide).contextualInterpretation, maniWide.sentenceSurfaceDisplay],
        ["wide-flat-thing", "Mani."]);
    add("ACI-P109-L012-463D207465",
        [plan(maniMass).contextualInterpretation, maniMass.sentenceSurfaceDisplay],
        ["mass-or-crowd", "Mani."]);
    add("ACI-P109-L012-3F5C84A7B4",
        [plan(maniIndividual).usageStatus, plan(maniIndividual).contextualInterpretation],
        ["marked-not-ordinary", ""]);
    add("ACI-P109-L016-5287F30C12",
        [plan(nemi).irregularityKind, nemi.sentenceSurfaceDisplay, nemiPreterit.sentenceFormulaDisplay, nemiPreterit.sentenceSurfaceDisplay],
        ["regular-with-optional-past-reading", "Nemi.", "#0-0(nen)0+⎕-0#.", "Nen."]);
    add("ACI-P109-L018-813CB3CE7E",
        [plan(nemiPast).morphologicalTense, plan(nemiPast).semanticTenseValue, nemiPast.sentenceSurfaceDisplay],
        ["distant-past", "general-past", "Nenca."]);

    s.eq("accepted Lesson 11 Groups 7-9 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 71, unique: 71, writing: 26, reading: 45 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writing.filter((record) => observations.has(record.atomId)).length,
        expected: writing.filter((record) => expected.has(record.atomId)).length,
        missing: writing.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 26, expected: 26, missing: [] });
    for (const record of writing) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = Array.isArray(actual) ? ["BROKEN", ...actual.slice(1)] : `${actual}-BROKEN`;
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }

    const cueLabels = (frame) => {
        const formula = frame.sentenceFormulaDisplay;
        const typed = frame.machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame;
        const grammar = { ...frame.machineryFrame, mood: frame.state?.mood, tense: frame.state?.tense, sentenceSurfaceFrame: frame.sentenceSurfaceFrame };
        return ctx.getClassicalFormulaDerivedAnnotations(formula, typed, grammar).map((cue) => cue.label);
    };
    s.ok("Formula and Diagram show the Lesson 11 stem jobs",
        cueLabels(huitz).includes("come or go motion verbstem")
        && cueLabels(alertItz).includes("alert or observant verbstem")
        && cueLabels(quenMachAmia).includes("construction-bound verbstem")
        && cueLabels(zeroIa).includes("zero-root existence verbstem")
        && cueLabels(maniWide).includes("wide or flat referent")
        && cueLabels(nemiPast).includes("nemi tense relation"));
    return s;
}

module.exports = { run };
