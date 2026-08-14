"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson11_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson11-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson11-form-meaning-dislocation",
        "lesson11-positional-verbs",
        "lesson11-defective-a",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const build = (stem, overrides = {}) => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem,
        valence: "intransitive",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        verbClass: "A",
        ...overrides,
    });
    const plan = (frame) => frame.machineryFrame?.lesson11ParadigmPlan || {};

    const ihca = build("ih-ca");
    const ihcaPast = build("ih-ca", { tense: "general-past" });
    const ihcaFuture = build("ih-ca", { tense: "future" });
    const ono = build("on-o");
    const onoFuture = build("on-o", { tense: "future" });
    const onoExternalDirectional = build("on-o", { directionalPrefix: "on" });
    const onoConnective = ctx.buildClassicalNahuatlIrregularVncParadigmPlan("on-o", {
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        connectiveTMatrix: true,
    });
    const pilca = build("pil-ca", { subject: "3sg" });
    const pilcaFuture = build("pil-ca", { tense: "future" });
    const aPositive = build("ā", { subject: "3sg" });
    const aNegativeThird = build("ā", { subject: "3sg", polarity: "negative" });
    const aNegativeSecond = build("ā", { subject: "2sg", polarity: "negative" });
    const aNegativePlural = build("ā", { subject: "2pl", polarity: "negative" });
    const aImperfect = build("ā", { tense: "imperfect" });
    const aFuture = build("ā", { tense: "future" });
    const ihcaAntecessive = ctx.buildClassicalNahuatlIrregularVncParadigmPlan("ih-ca", {
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        prefixStackMode: "antecessive",
    });

    const observations = new Map();
    const expected = new Map();
    const add = (atomId, actual, wanted) => {
        observations.set(atomId, actual);
        expected.set(atomId, wanted);
    };

    add("ACI-P106-L019-409F949CAE",
        [plan(ihca).paradigmTense, plan(ihca).semanticTenseValue, plan(ihcaPast).paradigmTense, plan(ihcaPast).semanticTenseValue],
        ["preterit-as-present", "present", "distant-past-as-past", "general-past"]);
    add("ACI-P106-L022-AA129D8F4C",
        [ihcaAntecessive.authorizationStatus, ihcaAntecessive.blockReason],
        ["blocked", "preterit-as-present-cannot-take-antecessive-order-prefix"]);
    add("ACI-P106-L026-9BAAC5347D",
        [plan(ihca).morphologicalTense, ihca.sentenceFormulaDisplay],
        ["preterit", "#n-0(ih-ca)0+c-0#."]);

    add("ACI-P106-L030-45D2971474",
        [ihca.sentenceFormulaDisplay, ihca.sentenceSurfaceDisplay],
        ["#n-0(ih-ca)0+c-0#.", "Nihcac."]);
    add("ACI-P106-L037-987EBB0647",
        [ihcaFuture.authorizationStatus, plan(ihcaFuture).morphologicalTense, ihcaFuture.sentenceSurfaceDisplay],
        ["authorized", "future", "Nihcaz."]);
    add("ACI-P106-L038-D8D005B8FD",
        [ono.sentenceFormulaDisplay, ono.sentenceSurfaceDisplay],
        ["#n-0(on-o)0+c-0#.", "Nonoc."]);
    add("ACI-P106-L038-D8D005B8FD-02",
        [plan(ono).fusedDirectionalSlotOwnership.fusedDirectional, onoExternalDirectional.authorizationStatus, onoExternalDirectional.blockReason],
        ["on", "blocked", "lesson11-fused-directional-already-occupies-directional-slot"]);
    add("ACI-P106-L038-D8D005B8FD-03",
        [onoConnective.selectedStemOverride, onoConnective.actions.includes("remove-fused-prefix-in-connective-t-matrix")],
        ["o", true]);
    add("ACI-P107-L009-97BD54C119",
        [onoFuture.authorizationStatus, plan(onoFuture).morphologicalTense, onoFuture.sentenceSurfaceDisplay],
        ["authorized", "future", "Nonoz."]);
    add("ACI-P107-L010-326F8916DB",
        [pilca.sentenceFormulaDisplay, pilca.sentenceSurfaceDisplay],
        ["#0-0(pil-ca)0+c-0#.", "Pilcac."]);
    add("ACI-P107-L016-234DB02AB4",
        [pilcaFuture.authorizationStatus, plan(pilcaFuture).morphologicalTense, pilcaFuture.sentenceSurfaceDisplay],
        ["authorized", "future", "Nipilcaz."]);

    add("ACI-P107-L017-153B6118EF",
        [aImperfect.authorizationStatus, aImperfect.blockReason],
        ["blocked", "defective-a-only-preterit-as-present"]);
    add("ACI-P107-L017-153B6118EF-02",
        [plan(aPositive).morphologicalTense, plan(aPositive).contextualInterpretation, aPositive.sentenceSurfaceDisplay],
        ["preterit", "be-present", "Āc."]);
    add("ACI-P107-L019-CE6B110CFF",
        [aFuture.authorizationStatus, aFuture.blockReason],
        ["blocked", "defective-a-only-preterit-as-present"]);
    add("ACI-P107-L019-75464D5C92",
        [plan(aNegativeThird).contextualInterpretation, aNegativeThird.sentenceSurfaceDisplay],
        ["be-absent", "Ayāc."]);
    add("ACI-P107-L025-B6F7DF6F59",
        [aNegativeThird.sentenceSurfaceFrame.negativePrefix, aNegativeThird.sentenceSurfaceFrame.negativePrefixAlternatives, aNegativeSecond.sentenceSurfaceDisplay, aNegativePlural.sentenceSurfaceDisplay],
        ["ay#", ["ay#", "ah#"], "Ahtāc.", "Ahamāqueh."]);

    s.eq("accepted Lesson 11 Groups 4-6 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 45, unique: 45, writing: 16, reading: 29 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writing.filter((record) => observations.has(record.atomId)).length,
        expected: writing.filter((record) => expected.has(record.atomId)).length,
        missing: writing.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 16, expected: 16, missing: [] });
    for (const record of writing) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = Array.isArray(actual) ? ["BROKEN", ...actual.slice(1)] : `${actual}-BROKEN`;
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }

    const cueRows = (frame) => {
        const formula = frame.sentenceFormulaDisplay;
        const typed = frame.machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame;
        const grammar = { ...frame.machineryFrame, mood: frame.state?.mood, tense: frame.state?.tense, sentenceSurfaceFrame: frame.sentenceSurfaceFrame };
        return ctx.getClassicalFormulaDerivedAnnotations(formula, typed, grammar)
            .map((cue) => [formula.slice(cue.start, cue.end), cue.label, cue.lessonSections]);
    };
    s.ok("Formula and Diagram show the positional and form-meaning jobs",
        cueRows(ihca).some((cue) => cue[1] === "positional verbstem" && cue[2].includes("§11.4.1"))
        && cueRows(ihca).some((cue) => cue[1].endsWith("preterit form with present meaning") && cue[2].includes("§11.4")));
    s.ok("Formula and Diagram show defective ā's present and absent jobs",
        cueRows(aPositive).some((cue) => cue[1] === "be present" && cue[2].includes("§11.4.4"))
        && cueRows(aNegativeThird).some((cue) => cue[1] === "be absent" && cue[2].includes("§11.4.4")));
    return s;
}

module.exports = { run };
