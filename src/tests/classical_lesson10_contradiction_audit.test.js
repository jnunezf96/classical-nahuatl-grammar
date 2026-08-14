"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson10_contradiction_audit");
    const read = (file) => JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
    const ledger = read("docs/canvas-progress/lesson10-review-ledger.json");
    const audit = read("docs/canvas-progress/lesson10-contradiction-audit.json");
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const build = (options = {}) => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem: "huetz", valence: "intransitive", subject: "2sg", mood: "admonitive", tense: "nonpast", verbClass: "B", introductoryParticle: "mā", ...options,
    });

    s.eq("every Lesson 10 atom has an accepted exact job", {
        total: ledger.records.length,
        accepted: ledger.records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        exact: ledger.records.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
    }, { total: 248, accepted: 248, exact: 248 });
    s.eq("the Lesson 10 contradiction record is complete and non-authorizing", {
        status: audit.status,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        reportAuthority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 10, unresolved: 0, reportAuthority: false });

    const positive = build();
    const negative = build({ stem: "quiza", negative: true });
    const hostileCa = build({ stem: "quiza", negative: true, requestedNegativePrefix: "ca#" });
    s.eq("positive and negative admonitions keep opposite caution jobs without becoming prohibitions", {
        positive: [positive.sentenceAdmonitiveForce, positive.sentenceAdmonitiveIsPositiveByMood, positive.sentenceAdmonitiveProhibitionReadingAllowed],
        negative: [negative.sentenceAdmonitiveForce, negative.sentencePrefixalStack, negative.sentenceAdmonitiveNegativeIntroductoryCollocation],
        hostileCa: [hostileCa.sentenceSurfaceStatus, hostileCa.sentenceBlockReason],
    }, {
        positive: ["positive-cautionary-warning-advice", true, false],
        negative: ["cancel-warning-recommend-reject-caution", ["ah#"], "mā nēn"],
        hostileCa: ["blocked", "lesson-10-admonition-keeps-ah-not-ca"],
    });
    const future = build({ tense: "future" });
    s.eq("admonitive formation remains nonpast, perfective, and class-sensitive", {
        classB: [positive.sentenceAdmonitiveOnlyNonpastTense, positive.sentenceAdmonitiveStemAspect, positive.sentenceAdmonitiveTenseMorph],
        future: [future.sentenceSurfaceStatus, future.sentenceBlockReason],
    }, {
        classB: [true, "perfective", "0"],
        future: ["blocked", "lesson-10-admonitive-requires-nonpast-tense"],
    });
    const thirdB = build({ subject: "3sg" });
    s.eq("Class B table compression never becomes grammatical concatenation", {
        surface: thirdB.sentenceSurfaceDisplay,
        compressed: /māhuetz/iu.test(thirdB.sentenceSurfaceDisplay),
    }, { surface: "Mā huetz.", compressed: false });
    s.ok("Lesson 10 reuses genuine choices and does not expose automatic realizations as controls",
        shell.includes('id="classical-rule-logic-mood"')
        && shell.includes('id="classical-rule-logic-subject"')
        && shell.includes('id="classical-rule-logic-polarity"')
        && shell.includes('id="classical-rule-logic-sentence-particle"')
        && !/(?:id|name)="[^"]*(?:admonitive-tense-morph|admonitive-number-dyad|admonitive-stem-aspect|admonitive-negative-prefix)[^"]*"/iu.test(shell));
    return s;
}

module.exports = { run };
