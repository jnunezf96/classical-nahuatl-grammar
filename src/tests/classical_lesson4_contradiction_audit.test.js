"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function captureError(fn) {
    try { fn(); return ""; } catch (error) { return String(error?.message || error); }
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson4_contradiction_audit");
    const audit = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson4-contradiction-audit.json"
    ), "utf8"));
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson4-review-ledger.json"
    ), "utf8"));
    const request = (stem, options) => ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:nuclear-clause", args: [stem, options],
    }).canonicalResult;
    const six = [
        request("itta", { tenseMode: "verb", transitivity: "transitive", valenceArity: "dyadic" }),
        request("tlahtoa", { tenseMode: "verb", transitivity: "transitive", valenceArity: "monadic" }),
        request("nemi", { tenseMode: "verb", transitivity: "intransitive" }),
        request("cal", { tenseMode: "noun", state: "possessive", stateArity: "dyadic" }),
        request("cal", { tenseMode: "noun", state: "possessive" }),
        request("cal", { tenseMode: "noun", state: "absolutive" }),
    ];

    s.eq("all Lesson 4 atoms keep accepted and exact jobs", {
        total: ledger.records.length,
        accepted: ledger.records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        exact: ledger.records.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
    }, { total: 167, accepted: 167, exact: 167 });
    s.eq("the contradiction record is clear and non-authorizing", {
        status: audit.status,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        reportAuthority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 6, unresolved: 0, reportAuthority: false });
    s.eq("all six formula shapes come from active grammar without a formula choice", {
        formulas: six.map((frame) => frame.formulaRealization),
        selectedBy: six.map((frame) => frame.structureFrame.selectedFormulaShape.selectedBy),
        userChoice: six.map((frame) => frame.structureFrame.selectedFormulaShape.userFormulaChoiceRequired),
    }, {
        formulas: [
            "#pers1-pers2+va1-va2(itta)tns+num1-num2#",
            "#pers1-pers2+va(tlahtoa)tns+num1-num2#",
            "#pers1-pers2(nemi)tns+num1-num2#",
            "#pers1-pers2+st1-st2(cal)num1-num2#",
            "#pers1-pers2+st(cal)num1-num2#",
            "#pers1-pers2(cal)num1-num2#",
        ],
        selectedBy: Array(6).fill("active-typed-grammar"),
        userChoice: Array(6).fill(false),
    });
    s.eq("English pronoun categories cannot override Nahuatl case and position", [
        captureError(() => ctx.evaluateClassicalNahuatlPersonalPronounStructure({
            pronounCase: "objective", clauseKind: "nnc", positionRole: "predicate",
        })),
        captureError(() => ctx.evaluateClassicalNahuatlPersonalPronounStructure({
            pronounCase: "possessive", clauseKind: "vnc", positionRole: "predicate",
        })),
        captureError(() => ctx.evaluateClassicalNahuatlPersonalPronounStructure({
            pronounCase: "nominative", clauseKind: "vnc", positionRole: "subject", gender: "feminine",
        })),
    ], Array(3).fill("classical-nuclear-clause-structure-operation-invalid"));
    s.eq("third-person reference requires context but a supplied context resolves that requirement", [
        ctx.evaluateClassicalNahuatlPersonalPronounStructure({
            pronounCase: "nominative", clauseKind: "vnc", positionRole: "subject", person: "third",
        }).referenceFrame.status,
        ctx.evaluateClassicalNahuatlPersonalPronounStructure({
            pronounCase: "nominative", clauseKind: "vnc", positionRole: "subject", person: "third", referenceContext: "supplied",
        }).referenceFrame.status,
    ], ["context-required", "context-supplied"]);

    return s;
}

module.exports = { run };
