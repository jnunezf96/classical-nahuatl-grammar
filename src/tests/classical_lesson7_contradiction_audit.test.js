"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson7_contradiction_audit");
    const read = (file) => JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
    const ledger = read("docs/canvas-progress/lesson7-review-ledger.json");
    const audit = read("docs/canvas-progress/lesson7-contradiction-audit.json");
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const build = (stem, options) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, options);

    s.eq("every Lesson 7 atom has an accepted exact job", {
        total: ledger.records.length,
        accepted: ledger.records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        exact: ledger.records.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
    }, { total: 344, accepted: 344, exact: 344 });
    s.eq("the Lesson 7 contradiction record is complete and non-authorizing", {
        status: audit.status,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        reportAuthority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 9, unresolved: 0, reportAuthority: false });

    const ehuaA = ctx.getClassicalNahuatlPerfectiveStem("ē-hua", { classId: "A" });
    const ehuaB = ctx.getClassicalNahuatlPerfectiveStem("ē-hua", { classId: "B" });
    const eHuA = ctx.getClassicalNahuatlPerfectiveStem("e-hu-a", { classId: "C" });
    s.eq("the variable e-hua rule does not steal the separate e-hu-a stem", {
        variable: [ehuaA.perfectiveStem, ehuaB.perfectiveStem],
        separate: eHuA.perfectiveStem,
    }, { variable: ["ē-hua", "ē-uh"], separate: "e-hu-h" });

    const singular = build("itta", { verbClass: "A", valence: "mainline-reflexive", subject: "1sg", mood: "indicative", tense: "present" });
    const plural = build("itta", { verbClass: "A", valence: "mainline-reflexive", subject: "1pl", mood: "indicative", tense: "present" });
    s.eq("singular reflexive and plural reflexive-reciprocal readings do not collapse", {
        singular: singular.objectRelationshipRuleFrame.selectedObjectInterpretations,
        plural: plural.objectRelationshipRuleFrame.selectedObjectInterpretations,
    }, { singular: ["reflexive"], plural: ["reflexive", "reciprocal"] });

    const unfused = build("(huel-mati)", { verbClass: "A", valence: "projective-nonhuman", subject: "1sg", mood: "indicative", tense: "present", tlaFusion: false });
    const fused = build("(huel-mati)", { verbClass: "A", valence: "projective-nonhuman", subject: "1sg", mood: "indicative", tense: "present", tlaFusion: true, sourceSelectionKind: "embed-matrix", sourceEmbedStem: "huel", sourceMatrixStem: "mati", incorporatedAdverb: "huel", adverbPosition: "before-tla" });
    s.eq("external object tla and stem-internal tla fusion do not collapse", {
        unfused: [unfused.formulaRealization, unfused.tlaFusionRuleFrame.selectedTlaFusionAnalysisKind, unfused.tlaFusionRuleFrame.objectSlotAfterFusion],
        fused: [fused.formulaRealization, fused.tlaFusionRuleFrame.selectedTlaFusionAnalysisKind, fused.tlaFusionRuleFrame.objectSlotAfterFusion],
    }, {
        unfused: ["#ni-0+tla(huel-mati)0+0-0#", "unfused-transitive-tla-object", "tla"],
        fused: ["#ni-0(huel-la-mati)0+0-0#", "fused-derived-intransitive", "none"],
    });
    s.no("automatic carriers and raw fusion spelling are not separate user controls",
        /(?:id|name)="[^"]*(?:raw-carrier|fusion-spelling|perfective-shape|imperfective-shape)[^"]*"/iu.test(shell));
    return s;
}

module.exports = { run };
