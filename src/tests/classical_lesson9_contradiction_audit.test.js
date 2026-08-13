"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson9_contradiction_audit");
    const read = (file) => JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
    const ledger = read("docs/canvas-progress/lesson9-review-ledger.json");
    const audit = read("docs/canvas-progress/lesson9-contradiction-audit.json");
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const build = (options = {}) => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem: "tequi-ti",
        valence: "intransitive",
        subject: "2sg",
        mood: "optative",
        tense: "future",
        verbClass: "A",
        sentenceType: "command-sentence",
        ...options,
    });

    s.eq("every Lesson 9 atom has an accepted exact job", {
        total: ledger.records.length,
        accepted: ledger.records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        exact: ledger.records.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
    }, { total: 187, accepted: 187, exact: 187 });
    s.eq("the Lesson 9 contradiction record is complete and non-authorizing", {
        status: audit.status,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        reportAuthority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 10, unresolved: 0, reportAuthority: false });

    const direct = build({ tense: "nonpast" });
    const indirect = build({ subject: "3sg", tense: "nonpast", introductoryParticle: "mā" });
    const exhortation = build({ subject: "1pl", tense: "nonpast", sentenceType: "exhortation-sentence", introductoryParticle: "mā" });
    s.eq("one optative system derives command or exhortation use from the participant", {
        direct: [direct.sentenceCanvasRole, direct.sentenceIntroductoryParticleOmissionAllowed],
        indirect: [indirect.sentenceCanvasRole, indirect.sentenceIntroductoryParticleRequired],
        exhortation: [exhortation.sentenceCanvasRole, exhortation.sentenceIntroductoryParticleRequired],
    }, {
        direct: ["direct-command", true],
        indirect: ["indirect-command", true],
        exhortation: ["exhortation", true],
    });

    const future = build({ introductoryParticle: "mā" });
    const introducedNegative = build({ tense: "nonpast", introductoryParticle: "mā", negative: true });
    const bluntNegative = build({ tense: "nonpast", negative: true });
    s.eq("borrowed future form and the two negative boundaries remain distinct", {
        future: [future.sentenceFutureIndicativeAsOptative, future.sentenceSurfaceDisplay],
        introduced: [introducedNegative.sentencePrefixalStack, introducedNegative.sentenceLesson9NegativeTransformation],
        blunt: [bluntNegative.sentencePrefixalStack, bluntNegative.sentenceLesson9NegativeTransformation],
    }, {
        future: [true, "Mā titequitiz."],
        introduced: [["ca#"], "ma-tla-changes-ah-to-ca"],
        blunt: [["ah#"], "brusque-command-keeps-ah"],
    });
    s.ok("Lesson 9 reuses genuine choices and does not expose its automatic rules as new controls",
        shell.includes('id="classical-rule-logic-mood"')
        && shell.includes('id="classical-rule-logic-tense"')
        && shell.includes('id="classical-rule-logic-subject"')
        && shell.includes('id="classical-rule-logic-polarity"')
        && shell.includes('id="classical-rule-logic-sentence-particle"')
        && !/(?:id|name)="[^"]*(?:future-indicative-as-optative|negative-command-prefix|command-participant-role)[^"]*"/iu.test(shell));
    return s;
}

module.exports = { run };
