"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson11_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson11-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson11-being-suppletion",
        "lesson11-going-suppletion",
        "lesson11-coming-fused-hual",
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
    const typed = (frame) => frame.machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || {};

    const bePresentSingular = build("ye", { subject: "3sg" });
    const bePresentPlural = build("ye", { subject: "3pl" });
    const beAntiquated = build("ye", { subject: "3sg", irregularStemChoice: "ca-t" });
    const beCustomary = build("ye", { subject: "2sg", tense: "customary-present" });
    const beFuture = build("ye", { subject: "1sg", tense: "future" });
    const beAdmonitive = build("ye", { subject: "2sg", mood: "admonitive", tense: "nonpast" });
    const bePast = build("ye", { subject: "1pl", tense: "general-past" });
    const beTherePresent = build("ye", { subject: "3sg", directionalPrefix: "on" });
    const beThereFuture = build("ye", { subject: "3sg", tense: "future", directionalPrefix: "on" });

    const goPresentSingular = build("yā", { verbClass: "D", subject: "1sg" });
    const goPresentPlural = build("yā", { verbClass: "D", subject: "1pl" });
    const goOptativePlural = build("yā", { verbClass: "D", subject: "2pl", mood: "optative", tense: "nonpast" });
    const goPast = build("yā", { verbClass: "D", subject: "1sg", tense: "general-past" });
    const goCustomary = build("yā", { verbClass: "D", subject: "1sg", tense: "customary-present" });
    const goImperfect = build("yā", { verbClass: "D", subject: "2pl", tense: "imperfect" });
    const goFuture = build("yā", { verbClass: "D", subject: "1sg", tense: "future" });
    const goPreterit = build("yā", { verbClass: "D", subject: "1sg", tense: "preterit" });
    const goDistant = build("yā", { verbClass: "D", subject: "2sg", tense: "distant-past" });
    const goAdmonitive = build("yā", { verbClass: "D", subject: "2sg", mood: "admonitive", tense: "nonpast" });
    const cenHuiPlural = build("cen-hui", { subject: "1pl" });
    const cenHuiSingular = build("cen-hui", { subject: "1sg" });

    const comePresent = build("huāl-lā", { verbClass: "D", subject: "2sg" });
    const comePlural = build("huāl-lā", { verbClass: "D", subject: "2pl" });
    const comePast = build("huāl-lā", { verbClass: "D", subject: "1sg", tense: "general-past" });
    const comeExternalDirectional = build("huāl-lā", { verbClass: "D", subject: "2sg", directionalPrefix: "on" });

    const observations = new Map();
    const expected = new Map();
    const add = (atomId, actual, wanted) => {
        observations.set(atomId, actual);
        expected.set(atomId, wanted);
    };

    add("ACI-P109-L031-72ADB5606D",
        [plan(beAdmonitive).selectedStemOverride, plan(bePresentSingular).selectedStemOverride, plan(beAdmonitive).paradigmTense],
        ["ye", "ca-h", "nonpast"]);
    add("ACI-P109-L035-CA9C29D22B",
        [plan(bePresentSingular).selectedStemOverride, plan(beCustomary).selectedStemOverride, plan(beFuture).selectedStemOverride],
        ["ca-h", "ye", "ye"]);
    add("ACI-P109-L038-9E5A0944CF",
        [beFuture.sentenceFormulaDisplay, beFuture.sentenceSurfaceDisplay],
        ["#ni-0(ye)z+⎕-0#.", "Niyez."]);
    add("ACI-P110-L019-6F64A7502A",
        [plan(beAdmonitive).selectedStemOverride, plan(beAdmonitive).morphologicalMood, beAdmonitive.authorizationStatus],
        ["ye", "admonitive", "authorized"]);
    add("ACI-P110-L020-37CFBCC6CC",
        [beAdmonitive.sentenceFormulaDisplay, beAdmonitive.sentenceSurfaceDisplay],
        ["mā #ti-0(ye)h+⎕-0#.", "Mā tiyeh."]);
    add("ACI-P110-L025-198EFE635C",
        [plan(bePresentSingular).selectedStemOverride, plan(bePresentPlural).selectedStemOverride],
        ["ca-h", "ca-t"]);
    add("ACI-P110-L027-7B10812DD4",
        [typed(bePresentPlural).slots.number.num1, typed(bePresentPlural).slots.number.num2],
        ["⎕", "eh"]);
    add("ACI-P110-L027-7B10812DD4-02",
        [bePresentPlural.sentenceFormulaDisplay, bePresentPlural.sentenceSurfaceDisplay],
        ["#0-0(ca-t)0+⎕-eh#.", "Cateh."]);
    add("ACI-P110-L034-C416EAF445-02",
        [typed(bePresentPlural).slots.subject.pers1, typed(bePresentPlural).slots.number.num2, plan(bePresentPlural).subjectNumber],
        ["0", "eh", "plural"]);
    add("ACI-P110-L034-C416EAF445-03",
        bePresentPlural.sentenceFormulaDisplay,
        "#0-0(ca-t)0+⎕-eh#.");
    add("ACI-P110-L034-C416EAF445-05",
        [bePresentPlural.sentenceSurfaceDisplay, beAntiquated.sentenceSurfaceDisplay, plan(beAntiquated).selectedAlternativeStem],
        ["Cateh.", "Catqui.", "ca-t"]);
    add("ACI-P110-L036-D09AFA4B31",
        [typed(beAntiquated).slots.number.num1, typed(beAntiquated).slots.number.num2],
        ["qui", "0"]);
    add("ACI-P110-L040-BCB2A29CC6-02",
        beAntiquated.sentenceFormulaDisplay,
        "#0-0(ca-t)0+qui-0#.");
    add("ACI-P110-L040-BCB2A29CC6-03",
        [plan(beAntiquated).paradigmTense, plan(beAntiquated).selectedAlternativeStem, beAntiquated.sentenceSurfaceDisplay],
        ["preterit-as-present", "ca-t", "Catqui."]);
    add("ACI-P110-L040-BCB2A29CC6-04",
        [typed(beAntiquated).slots.number.num1, beAntiquated.sentenceSurfaceDisplay.endsWith("tqui.")],
        ["qui", true]);
    add("ACI-P111-L008-8B99184F43",
        [plan(bePast).morphologicalTense, typed(bePast).slots.predicate.tns, bePast.sentenceFormulaDisplay],
        ["distant-past", "ca", "#ti-0(ca-t)ca+0-h#."]);
    add("ACI-P111-L010-8E5FB4FD72-02",
        [typed(bePast).slots.subject.pers1, typed(bePast).slots.number.num2, plan(bePast).subjectNumber],
        ["ti", "h", "plural"]);
    add("ACI-P111-L010-8E5FB4FD72-03",
        [bePast.sentenceFormulaDisplay, bePast.sentenceSurfaceDisplay],
        ["#ti-0(ca-t)ca+0-h#.", "Ticatcah."]);
    add("ACI-P111-L010-8E5FB4FD72-07",
        [plan(beTherePresent).contextualInterpretation, plan(beThereFuture).contextualInterpretation],
        ["there-to-be", "there-to-be"]);
    add("ACI-P111-L012-C25CF69685",
        [plan(beTherePresent).contextualInterpretation, beTherePresent.sentenceSurfaceDisplay, beThereFuture.sentenceSurfaceDisplay],
        ["there-to-be", "Oncah.", "Onyez."]);

    add("ACI-P111-L020-9E6B134C7E",
        [plan(goPresentSingular).paradigmRelationFrame.imperfectiveMembers, plan(goPreterit).paradigmRelationFrame.perfectiveMembers],
        [["yā", "ya-uh", "hui"], ["yah", "hui"]]);
    add("ACI-P111-L022-7F03C72B1E",
        [goPresentSingular.sentenceFormulaDisplay, goPresentSingular.sentenceSurfaceDisplay],
        ["#ni-0(ya-uh)0+0-0#.", "Niyauh."]);
    add("ACI-P111-L022-F4A8B11CA5",
        [goFuture.sentenceFormulaDisplay, goFuture.sentenceSurfaceDisplay],
        ["#ni-0(yā)z+⎕-0#.", "Niyāz."]);
    add("ACI-P111-L025-AAC2F38F3B",
        [plan(goPast).deletePostStemK, typed(goPast).slots.predicate.tns, typed(goPast).slots.number.num1],
        [true, "a", "0"]);
    add("ACI-P111-L027-A907BE4B72",
        [plan(goPresentSingular).selectedStemOverride, plan(goPresentPlural).selectedStemOverride],
        ["ya-uh", "hui"]);
    add("ACI-P111-L029-96F20D0AF6",
        [plan(goPresentSingular).subjectNumber, plan(goPresentSingular).selectedStemOverride, plan(goPresentPlural).subjectNumber, plan(goPresentPlural).selectedStemOverride],
        ["singular", "ya-uh", "plural", "hui"]);
    add("ACI-P111-L039-BADA6A134B",
        [plan(goOptativePlural).deletePostStemK, typed(goOptativePlural).slots.number.num1],
        [true, "⎕"]);
    add("ACI-P111-L039-BADA6A134B-02",
        [goOptativePlural.sentenceFormulaDisplay, typed(goOptativePlural).slots.number.num2],
        ["#xi-0(hui)0+⎕-ān#.", "ān"]);
    add("ACI-P112-L009-CE08EA3B23",
        [plan(goPast).selectedStemOverride, typed(goPast).slots.predicate.tns, goPast.sentenceFormulaDisplay],
        ["hui", "a", "#ni-0(hui)a+0-0#."]);
    add("ACI-P112-L015-AFE1446A4A",
        [plan(goImperfect).selectedStemOverride, typed(goImperfect).slots.predicate.tns, goImperfect.sentenceFormulaDisplay.includes("(hui)ya")],
        ["yā", "ya", false]);
    add("ACI-P112-L019-191AD41FD8-02",
        [plan(goPresentSingular).selectedStemOverride, goPresentSingular.sentenceFormulaDisplay.includes("(yā)")],
        ["ya-uh", false]);
    add("ACI-P112-L019-191AD41FD8-03",
        [plan(goOptativePlural).selectedStemOverride, goOptativePlural.sentenceFormulaDisplay.includes("(yā)")],
        ["hui", false]);
    add("ACI-P112-L021-6C90C3FDB2",
        [plan(goCustomary).selectedStemOverride, plan(goImperfect).selectedStemOverride, plan(goFuture).selectedStemOverride],
        ["yā", "yā", "yā"]);
    add("ACI-P112-L029-A2DD8A98D1-02",
        [typed(goImperfect).slots.subject.pers1, typed(goImperfect).slots.number.num2, plan(goImperfect).subjectNumber],
        ["an", "h", "plural"]);
    add("ACI-P112-L029-A2DD8A98D1-03",
        [goImperfect.sentenceFormulaDisplay, goImperfect.sentenceSurfaceDisplay],
        ["#an-0(yā)ya+0-h#.", "Anyāyah."]);
    add("ACI-P112-L037-9A91BF8394",
        [plan(goPreterit).selectedStemOverride, goPreterit.sentenceFormulaDisplay, plan(goDistant).selectedStemOverride, goDistant.sentenceFormulaDisplay, plan(goAdmonitive).selectedStemOverride],
        ["yah", "#ni-0(yah)0+⎕-0#.", "yah", "#ti-0(yah)ca+0-0#.", "yah"]);
    add("ACI-P113-L015-5DE8845CD5",
        [plan(goPresentPlural).rejectedVariants.length, plan(goPresentPlural).rejectedVariants[0]?.stem, plan(goPresentPlural).rejectedVariants[0]?.usage],
        [1, "ya-hui", "dialectal-not-good-usage"]);
    add("ACI-P113-L016-FCC6D6B481",
        [plan(goPresentPlural).selectedStemOverride, plan(goPresentPlural).rejectedVariants.map((variant) => variant.stem)],
        ["hui", ["ya-hui"]]);
    add("ACI-P113-L018-D299E78807-03",
        [cenHuiPlural.authorizationStatus, cenHuiPlural.blockReason, cenHuiPlural.sentenceSurfaceDisplay, cenHuiSingular.authorizationStatus, cenHuiSingular.blockReason],
        ["authorized", "", "Ticenhuih.", "blocked", "cen-hui-requires-a-plural-subject"]);

    add("ACI-P113-L022-1CE11A34D2",
        [plan(comePresent).paradigmRelationFrame.imperfectiveMembers, plan(comePast).paradigmRelationFrame.perfectiveMembers, plan(comePresent).selectedStemOverride, plan(comePlural).selectedStemOverride],
        [["huāl-lā", "huāl-la-uh", "huāl-hui"], ["huāl-lah", "huāl-hui"], "huāl-la-uh", "huāl-hui"]);
    add("ACI-P113-L024-D3C08FAA63",
        [plan(comePresent).sourceParadigmMember, plan(comePresent).selectedStemOverride, comePresent.sentenceSurfaceDisplay, comeExternalDirectional.authorizationStatus, comeExternalDirectional.blockReason],
        ["ya-uh", "huāl-la-uh", "Tihuāllauh.", "blocked", "lesson11-fused-directional-already-occupies-directional-slot"]);

    s.eq("accepted Lesson 11 Groups 10-12 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 174, unique: 174, writing: 41, reading: 133 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writing.filter((record) => observations.has(record.atomId)).length,
        expected: writing.filter((record) => expected.has(record.atomId)).length,
        missing: writing.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 41, expected: 41, missing: [] });
    for (const record of writing) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = Array.isArray(actual) ? ["BROKEN", ...actual.slice(1)] : `${actual}-BROKEN`;
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }

    const cueLabels = (frame) => {
        const formula = frame.sentenceFormulaDisplay;
        const grammar = { ...frame.machineryFrame, mood: frame.state?.mood, tense: frame.state?.tense, sentenceSurfaceFrame: frame.sentenceSurfaceFrame };
        return ctx.getClassicalFormulaDerivedAnnotations(formula, typed(frame), grammar).map((cue) => cue.label);
    };
    s.ok("Formula and Diagram name each suppletive grammatical job",
        cueLabels(bePresentSingular).includes("suppletive being verbstem")
        && cueLabels(goPresentPlural).includes("suppletive going verbstem")
        && cueLabels(comePresent).includes("fused huāl coming verbstem")
        && cueLabels(cenHuiPlural).includes("plural-only go-together verbstem"));
    return s;
}

module.exports = { run };
