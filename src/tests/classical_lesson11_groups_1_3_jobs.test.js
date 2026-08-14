"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson11_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson11-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson11-irregularity-foundation",
        "lesson11-speech-criterion",
        "lesson11-perfective-stem-irregularity",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const build = (stem, overrides = {}) => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem,
        valence: "intransitive",
        subject: "1sg",
        mood: "indicative",
        tense: "preterit",
        verbClass: "B",
        ...overrides,
    });
    const plan = (frame) => frame.machineryFrame?.lesson11ParadigmPlan;

    const ceya = build("ce-ya");
    const cui = build("cui", { verbClass: "A" });
    const ahco = build("ahco-cui", { verbClass: "A", subject: "3sg" });
    const ahcoAlternative = build("ahco-cui", { verbClass: "A", subject: "3sg", irregularStemChoice: "ahco-c" });
    const cecui = build("ce-cui", { verbClass: "A", subject: "3sg" });
    const mati = build("mati");
    const matiAlternative = build("mati", { irregularStemChoice: "mat" });
    const matiPlural = build("mati", { subject: "1pl" });
    const matiDistant = build("mati", { tense: "distant-past" });
    const cati = build("ca-ti");
    const huehueti = build("huē-huē-ti");
    const ilamati = build("ilama-ti");
    const ihca = build("ih-ca", { verbClass: "A", tense: "present" });
    const hostileAlternative = build("mati", { irregularStemChoice: "invented" });
    const cuiPlan = ctx.buildClassicalNahuatlIrregularVncParadigmPlan("cui", { tense: "preterit" });
    const nearbyPatiPlan = ctx.buildClassicalNahuatlIrregularVncParadigmPlan("pati", { subject: "1sg", tense: "preterit" });

    const observations = new Map();
    const expected = new Map();
    const add = (atomId, actual, wanted) => {
        observations.set(atomId, actual);
        expected.set(atomId, wanted);
    };

    add("ACI-P105-L003-980AC81F5A", [plan(ahco).irregularityKind, ahco.sentenceFormulaDisplay], ["compound-class-shift", "#0-0(ahco-uc)0+⎕-0#."]);
    add("ACI-P105-L003-980AC81F5A-02", [plan(ihca).semanticTenseValue, plan(ihca).morphologicalTense], ["present", "preterit"]);

    add("ACI-P105-L006-F50CAB9E01", [plan(ceya).irregularityKind, plan(ceya).actions], ["lesson7-delegated-irregular-sound-change", ["reuse-regular-sound-rule"]]);
    add("ACI-P105-L007-9536E9DC9C", [ceya.sentenceFormulaDisplay, plan(ceya).regularSystemRemainsAuthority], ["#ni-0(ce-z)0+⎕-0#.", true]);
    add("ACI-P105-L009-D0CA423EC5", [ceya.sentenceSurfaceDisplay, plan(ceya).selectedStemOverride], ["Nicez.", ""]);

    add("ACI-P105-L013-65F44103B3", [cuiPlan.applies, cuiPlan.regularSystemRemainsAuthority], [false, true]);
    add("ACI-P105-L014-BABCF678C5", [plan(ahco).irregularityKind, plan(ahco).selectedClassOverride], ["compound-class-shift", "B"]);
    add("ACI-P105-L015-1C9F561900", [cui.authorizationStatus, cuiPlan.applies], ["authorized", false]);
    add("ACI-P105-L016-34A1C18BE7", [ahco.sentenceFormulaDisplay, ahcoAlternative.sentenceFormulaDisplay], ["#0-0(ahco-uc)0+⎕-0#.", "#0-0(ahco-c)0+⎕-0#."]);
    add("ACI-P105-L018-6A53AB2C9A", [plan(cecui).selectedClassOverride, cecui.sentenceFormulaDisplay], ["B", "#0-0(ce-uc)0+⎕-0#."]);
    add("ACI-P105-L019-C87BF867E5", [plan(ahco).selectedClassOverride, plan(ahco).actions], ["B", ["override-derived-compound-class"]]);
    add("ACI-P105-L021-09CD8F9F58", plan(mati).paradigmRelationFrame.perfectiveMembers, ["mat", "mah"]);
    add("ACI-P105-L024-A81AEFF179", [plan(mati).selectedStemOverride, plan(matiAlternative).selectedStemOverride], ["mah", "mat"]);
    add("ACI-P105-L025-6E2D37611B", [mati.sentenceFormulaDisplay, matiAlternative.sentenceFormulaDisplay], ["#ni-0(mah)0+⎕-0#.", "#ni-0(mat)0+⎕-0#."]);
    add("ACI-P105-L026-3154B9EFB1-02", plan(matiAlternative).selectedStemOverride, "mat");
    add("ACI-P105-L026-3154B9EFB1-03", plan(mati).selectedStemOverride, "mah");
    add("ACI-P106-L002-767CEA9665", [plan(mati).requestedMood, plan(mati).morphologicalTense], ["indicative", "preterit"]);
    add("ACI-P106-L002-20D45CF318", [plan(mati).subjectNumber, plan(mati).selectedStemOverride], ["singular", "mah"]);
    add("ACI-P106-L007-600EC7F741", [plan(matiPlural).selectedStemOverride, plan(matiDistant).selectedStemOverride], ["", ""]);
    add("ACI-P106-L012-04348EAF38", [plan(matiAlternative).selectedAlternativeStem, matiAlternative.sentenceSurfaceDisplay], ["mat", "Nimat."]);
    add("ACI-P106-L012-04348EAF38-02", [plan(mati).defaultStemOverride, plan(mati).preference], ["mah", "irregular-preferred-regular-authorized"]);
    add("ACI-P106-L014-381CCD2E1B", [plan(cati).irregularityKind, nearbyPatiPlan.applies], ["conditioned-ti-perfective", false]);
    add("ACI-P106-L015-5C68235DFC", [plan(cati).paradigmRelationFrame.relationDisplay, cati.sentenceFormulaDisplay], ["*(ca-ti) > (ca-t) ~ (ca-h)", "#ni-0(ca-h)0+⎕-0#."]);
    add("ACI-P106-L016-2506893806-02", [plan(huehueti).selectedStemOverride, ilamati.sentenceFormulaDisplay], ["huē-hue-h", "#n-0(ilama-h)0+⎕-0#."]);

    s.eq("accepted Lesson 11 Groups 1-3 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 46, unique: 46, writing: 24, reading: 22 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writing.filter((record) => observations.has(record.atomId)).length,
        expected: writing.filter((record) => expected.has(record.atomId)).length,
        missing: writing.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 24, expected: 24, missing: [] });
    for (const record of writing) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = Array.isArray(actual) ? ["BROKEN", ...actual.slice(1)] : `${actual}-BROKEN`;
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }

    s.eq("only Canvas-authorized alternatives pass through the normal application", {
        preferred: [mati.authorizationStatus, mati.sentenceSurfaceDisplay],
        alternative: [matiAlternative.authorizationStatus, matiAlternative.sentenceSurfaceDisplay],
        invented: [hostileAlternative.authorizationStatus, hostileAlternative.blockReason],
    }, {
        preferred: ["authorized", "Nimah."],
        alternative: ["authorized", "Nimat."],
        invented: ["blocked", "lesson11-irregular-alternative-not-authorized-for-selected-cell"],
    });

    const cueRows = (frame) => {
        const formula = frame.sentenceFormulaDisplay;
        const typed = frame.machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame;
        const grammar = { ...frame.machineryFrame, mood: frame.state?.mood, tense: frame.state?.tense, sentenceSurfaceFrame: frame.sentenceSurfaceFrame };
        return ctx.getClassicalFormulaDerivedAnnotations(formula, typed, grammar)
            .map((cue) => [formula.slice(cue.start, cue.end), cue.label, cue.lessonSections]);
    };
    s.ok("the normal Formula and Diagram cue source marks the exact Lesson 11 operation",
        cueRows(mati).some((cue) => cue[0] === "(" && cue[1] === "irregular perfective stem" && cue[2].includes("§11.3.2"))
        && cueRows(ceya).some((cue) => cue[0] === "(" && cue[1] === "regular sound change" && cue[2].includes("§11.2")));
    return s;
}

module.exports = { run };
