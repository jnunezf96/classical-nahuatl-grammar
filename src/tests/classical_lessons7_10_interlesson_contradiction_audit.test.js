"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lessons7_10_interlesson_contradiction_audit");
    const read = (file) => JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
    const ledgers = [7, 8, 9, 10].map((lesson) => read(`docs/canvas-progress/lesson${lesson}-review-ledger.json`));
    const audit = read("docs/canvas-progress/lessons7-10-interlesson-contradiction-audit.json");
    const build = (options = {}) => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem: "cochi",
        valence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass: "B",
        ...options,
    });

    const records = ledgers.flatMap((ledger) => ledger.records);
    s.eq("all Lesson 7-10 atoms retain accepted exact jobs", {
        total: records.length,
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        exact: records.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
    }, { total: 983, accepted: 983, exact: 983 });
    s.eq("the cross-lesson contradiction record is complete and non-authorizing", {
        status: audit.status,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        reportAuthority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 12, unresolved: 0, reportAuthority: false });

    const question = build({ sentenceType: "yes-no-question", questionMode: "cuix" });
    const emphatic = build({ sentenceType: "emphatic-assertion" });
    s.eq("one normal sentence choice controls force, particles, and final writing", {
        question: [
            question.state.sentenceSurfaceMode,
            question.sentenceSurfaceFrame.sentenceType,
            question.sentenceSurfaceFrame.sentenceParticles,
            question.sentenceFinalPunctuation,
            question.sentenceSurfaceDisplay,
        ],
        emphatic: [
            emphatic.sentenceSurfaceFrame.sentenceParticles,
            emphatic.sentenceCanvasCompositionPunctuation,
            emphatic.sentenceFinalPunctuation,
            emphatic.sentenceWritingContextDiffersFromCanvasComposition,
            emphatic.sentenceWritingContextIsGrammarAuthority,
            emphatic.sentenceSurfaceDisplay,
        ],
    }, {
        question: ["question", "yes-no-question", ["cuix"], "?", "Cuix cochi?"],
        emphatic: [["ca"], ".", "!", true, false, "Ca cochi!"],
    });

    const negativeWish = build({
        subject: "1sg", mood: "optative", tense: "nonpast", introductoryParticle: "mā", polarityMode: "negative",
    });
    const bluntCommand = build({
        stem: "ihcihui", subject: "2sg", mood: "optative", tense: "nonpast", sentenceType: "command-sentence", polarityMode: "negative",
    });
    const negativeAdmonition = build({
        stem: "huetz", subject: "2sg", mood: "admonitive", tense: "nonpast", introductoryParticle: "mā", polarityMode: "negative",
    });
    s.eq("ca and ah keep the jobs required by their sentence environments", {
        wish: [negativeWish.sentencePrefixalStack, negativeWish.sentenceCanvasRole, negativeWish.sentenceSurfaceDisplay],
        blunt: [bluntCommand.sentencePrefixalStack, bluntCommand.sentenceCanvasRole, bluntCommand.sentenceSurfaceDisplay],
        admonition: [
            negativeAdmonition.sentencePrefixalStack,
            negativeAdmonition.sentenceCanvasRole,
            negativeAdmonition.sentenceAdmonitiveNegativeIntroductoryCollocation,
            negativeAdmonition.sentenceAdmonitiveForce,
            negativeAdmonition.sentenceSurfaceDisplay,
        ],
    }, {
        wish: [["ca#"], "wish", "Mā canicochi."],
        blunt: [["ah#"], "direct-command", "Ahxihcihui."],
        admonition: [["ah#"], "direct-admonition", "mā nēn", "cancel-warning-recommend-reject-caution", "Mā nēn ahtihuetz."],
    });

    const preteritWish = build({
        subject: "1sg", mood: "optative", tense: "preterit", introductoryParticle: "mā",
    });
    const hostileAdmonition = build({
        stem: "huetz", subject: "2sg", mood: "admonitive", tense: "nonpast", introductoryParticle: "mā", prefixStackMode: "antecessive",
    });
    const directionalAdmonition = build({
        stem: "huetz", subject: "2sg", mood: "admonitive", tense: "nonpast", introductoryParticle: "mā", directionalPrefix: "huāl",
    });
    s.eq("earlier-event o, directionals, and the admonitive perfective keep separate boundaries", {
        preteritWish: [preteritWish.state.prefixStackMode, preteritWish.sentencePrefixalStack, preteritWish.sentenceSurfaceDisplay],
        admonitionRejectsEarlierEvent: [hostileAdmonition.state.prefixStackMode, hostileAdmonition.sentencePrefixalStack, hostileAdmonition.sentenceSurfaceDisplay],
        directionalAdmonition: [
            directionalAdmonition.sentenceAdmonitiveStemAspect,
            directionalAdmonition.sentenceFormulaDisplay,
            directionalAdmonition.sentenceSurfaceDisplay,
        ],
    }, {
        preteritWish: ["antecessive", ["ō#"], "Mā ōnicoch."],
        admonitionRejectsEarlierEvent: ["none", [], "Mā tihuetz."],
        directionalAdmonition: ["perfective", "mā #ti-0+huāl(huetz)0+⎕-0#.", "Mā tihuālhuetz."],
    });

    return s;
}

module.exports = { run };
