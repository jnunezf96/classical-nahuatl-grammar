"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson8_contradiction_audit");
    const read = (file) => JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
    const ledger = read("docs/canvas-progress/lesson8-review-ledger.json");
    const audit = read("docs/canvas-progress/lesson8-contradiction-audit.json");
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const build = (options = {}) => ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
        valence: "intransitive", subject: "3sg", mood: "indicative", tense: "present", verbClass: "B", ...options,
    });

    s.eq("every Lesson 8 atom has an accepted exact job", {
        total: ledger.records.length,
        accepted: ledger.records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        exact: ledger.records.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
    }, { total: 204, accepted: 204, exact: 204 });
    s.eq("the Lesson 8 contradiction record is complete and non-authorizing", {
        status: audit.status,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        reportAuthority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 10, unresolved: 0, reportAuthority: false });

    const directional = ctx.buildClassicalNahuatlDirectionalPrefixSystemFrame();
    const antecessive = ctx.buildClassicalNahuatlAntecessivePrefixSystemFrame();
    const negative = ctx.buildClassicalNahuatlNegativePrefixSystemFrame();
    s.eq("the three modifier systems keep their different boundaries and scope", {
        directional: [directional.insideVncCore, directional.prefixes],
        antecessive: [antecessive.outsideVnc, antecessive.externalSlots],
        negative: [negative.outsideVnc, negative.prefixalStack],
    }, {
        directional: [true, ["on", "huāl"]],
        antecessive: [true, ["antecessive-order"]],
        negative: [true, ["ah#", "ō#"]],
    });

    const affirmative = build({ sentenceType: "affirmative-assertion" }).sentenceSurfaceFrame;
    const negativeStatement = build({ sentenceType: "negative-assertion" }).sentenceSurfaceFrame;
    const emphatic = build({ sentenceType: "emphatic-assertion" }).sentenceSurfaceFrame;
    const intonation = build({ sentenceType: "yes-no-question", questionMode: "intonation" }).sentenceSurfaceFrame;
    const cuix = build({ sentenceType: "yes-no-question", questionMode: "cuix" }).sentenceSurfaceFrame;
    s.eq("statement transformations and question composition remain distinct", {
        affirmative: [affirmative.sentenceOperationType, affirmative.sentenceParticles, affirmative.finalPunctuation],
        negative: [negativeStatement.sentenceOperationType, negativeStatement.sentenceParticles, negativeStatement.finalPunctuation],
        emphatic: [emphatic.sentenceOperationType, emphatic.sentenceParticles, emphatic.finalPunctuation],
        intonation: [intonation.sentenceOperationType, intonation.questionMode, intonation.sentenceParticles, intonation.finalPunctuation],
        cuix: [cuix.sentenceOperationType, cuix.questionMode, cuix.sentenceParticles, cuix.finalPunctuation],
    }, {
        affirmative: ["assertion-composition", [], "."],
        negative: ["negative-assertion-transformation", ["ah#"], "."],
        emphatic: ["emphatic-assertion-transformation", ["ca"], "."],
        intonation: ["question-composition", "intonation", [], "?"],
        cuix: ["question-composition", "cuix", ["cuix"], "?"],
    });
    s.eq("sentence particles never become VNC formula slots", {
        negative: negativeStatement.sentenceParticlesBecomeFormulaSlots,
        emphatic: emphatic.sentenceParticlesBecomeFormulaSlots,
        intonation: intonation.sentenceParticlesBecomeFormulaSlots,
        cuix: cuix.sentenceParticlesBecomeFormulaSlots,
    }, { negative: false, emphatic: false, intonation: false, cuix: false });
    s.ok("only genuine choices are exposed; automatic placement and transformation labels are absent",
        shell.includes('id="classical-rule-logic-directional"')
        && shell.includes('id="classical-rule-logic-prefix-stack"')
        && shell.includes('id="classical-rule-logic-polarity"')
        && shell.includes('id="classical-rule-logic-sentence-surface"')
        && shell.includes('id="classical-rule-logic-sentence-particle"')
        && !/(?:id|name)="[^"]*(?:directional-placement|negative-prefix-position|single-base|double-base|question-intonation)[^"]*"/iu.test(shell));
    return s;
}

module.exports = { run };
