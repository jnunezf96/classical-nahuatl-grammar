"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lessons12_16_nnc_source_rerun");

    const inventory = ctx.getClassicalNahuatlOpenNncSourceClassInventory();
    s.eq(
        "Lesson 14 exposes every complete open-source class analysis",
        inventory.map((entry) => entry.sourceClass),
        [
            "tl-1-a", "tl-1-b", "tl-2-a", "tl-2-b-a", "tl-2-b-i",
            "tl-2-c", "tli-1", "tli-2", "in", "zero",
        ]
    );

    const sources = [
        ["cihuā", "tl-1-a", {}, ["tl", "tl-1-a", "base", ""]],
        ["izte", "tl-1-b", {}, ["tl", "tl-1-b", "base", ""]],
        ["tēi", "tl-2-a", {}, ["tl", "tl-2-a", "truncated", "i"]],
        ["naca", "tl-2-b-a", {}, ["tl", "tl-2-b", "truncated", "a"]],
        ["toci", "tl-2-b-i", {}, ["tl", "tl-2-b", "truncated", "i"]],
        ["coz-ca", "tl-2-c", { embedStem: "coz", matrixStem: "ca" }, ["tl", "tl-2-c", "truncated", "a"]],
        ["xal", "tli-1", {}, ["tli", "tli-1", "base", ""]],
        ["ich", "tli-2", {}, ["tli", "tli-2", "base", ""]],
        ["tepin", "in", {}, ["in", "", "base", ""]],
        ["xopa", "zero", {}, ["zero", "", "base", ""]],
    ].map(([stem, sourceClass, parts, expected]) => {
        const source = ctx.issueCanonicalNncSourceFrame({
            stem, sourceClass, ...parts,
        });
        const operation = ctx.issueCanonicalNncOperationFrame(source, {
            state: "absolutive", subject: "3sg",
        });
        const result = ctx.requestClassicalOrdinaryNncResult(source, operation);
        return {
            sourceClass,
            expected,
            actual: [
                source.nounClass,
                source.subclass,
                source.useShape,
                source.ephemeralFinalVowel,
            ],
            sourceStatus: source.authorizationStatus,
            operationStatus: operation?.authorizationStatus || "missing",
            operationReason: operation?.blockReason || "",
            resultStatus: result?.authorizationStatus || "missing",
            resultReason: result?.blockReason || "",
            resultSourceClass: result?.sourceFrame?.sourceClass || "",
        };
    });
    for (const row of sources) {
        s.eq(`${row.sourceClass} has its exact Lesson 14 Source job`, {
            analysis: row.actual,
            sourceStatus: row.sourceStatus,
            operationStatus: row.operationStatus,
            operationReason: row.operationReason,
            resultStatus: row.resultStatus,
            resultReason: row.resultReason,
            resultSourceClass: row.resultSourceClass,
        }, {
            analysis: row.expected,
            sourceStatus: "authorized",
            operationStatus: "authorized",
            operationReason: "",
            resultStatus: "authorized",
            resultReason: "",
            resultSourceClass: row.sourceClass,
        });
    }

    const missing = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem: "tēi" });
    const broadOnly = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "tēi", nounClass: "tl",
    });
    const wrongShape = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "xopi", sourceClass: "tl-2-a",
    });
    const exact = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "tēi", sourceClass: "tl-2-a",
    });
    s.eq("unknown input is never assigned a Lesson 14 class from spelling", {
        missing: missing.blockReason,
        broadOnly: broadOnly.blockReason,
        wrongShape: [
            wrongShape.authorizationStatus,
            wrongShape.blockReason,
            wrongShape.sourceClassShapeFrame?.blockReason || "",
            wrongShape.sourceClassShapeFrame?.conditionId || "missing",
        ],
        exact: [exact.authorizationStatus, exact.sourceClass, exact.subclass],
    }, {
        missing: "lexical-noun-class-selection-required",
        broadOnly: "lexical-noun-class-selection-required",
        wrongShape: [
            "blocked",
            "tl-subclass2a-requires-final-i-after-long-a-or-e",
            "tl-subclass2a-requires-final-i-after-long-a-or-e",
            "tl-2a-final-i-after-long-a-or-e",
        ],
        exact: ["authorized", "tl-2-a", "tl-2-a"],
    });

    const plainClass = ctx.issueCanonicalNncSourceFrame({
        stem: "cihuā", sourceClass: "zero",
    });
    const tlClass = ctx.issueCanonicalNncSourceFrame({
        stem: "cihuā", sourceClass: "tl-1-a",
    });
    const realize = (source) => {
        const operation = ctx.issueCanonicalNncOperationFrame(source, {
            state: "absolutive", subject: "3sg",
        });
        return ctx.requestClassicalOrdinaryNncResult(source, operation);
    };
    const plainResult = realize(plainClass);
    const tlResult = realize(tlClass);
    s.eq("the selected Source class changes the normal application Result", {
        zero: [plainResult.formulaRealization, plainResult.surfaceRealization],
        tl1a: [tlResult.formulaRealization, tlResult.surfaceRealization],
    }, {
        zero: ["#0-0(cihuā)0-0#", "cihuā"],
        tl1a: ["#0-0(cihuā)tl-0#", "cihuātl"],
    });

    const unresolvedUi = ctx.buildClassicalRuleLogicSurfaceFrame({
        basalUnit: "nnc", stem: "xopa", nncState: "absolutive",
        subject: "3sg", nncOutputScope: "single",
    });
    const selectedUi = ctx.buildClassicalRuleLogicSurfaceFrame({
        basalUnit: "nnc", stem: "xopa", nncSourceClass: "zero",
        nncState: "absolutive", subject: "3sg", nncOutputScope: "single",
    });
    const knownUi = ctx.buildClassicalRuleLogicSurfaceFrame({
        basalUnit: "nnc", stem: "cal", nncState: "absolutive",
        subject: "3common", nncOutputScope: "single",
    });
    s.eq("the normal interface asks only when Source class is truly unknown", {
        unresolved: [unresolvedUi.authorizationStatus, unresolvedUi.blockReason],
        selected: [selectedUi.authorizationStatus, selectedUi.state.nncTypedSourceFrame?.sourceClass || ""],
        known: [knownUi.authorizationStatus, knownUi.state.nncTypedSourceFrame?.sourceClass || ""],
    }, {
        unresolved: ["blocked", "lexical-noun-class-selection-required"],
        selected: ["authorized", "zero"],
        known: ["authorized", "tli-1"],
    });
    const unresolvedAvailability = ctx.getClassicalNncAuthorityControlAvailability({
        state: unresolvedUi.state,
    });
    const knownAvailability = ctx.getClassicalNncAuthorityControlAvailability({
        state: knownUi.state,
    });
    s.eq("the Source class picker appears only where it has a real job", {
        unresolved: [
            unresolvedAvailability["classical-rule-logic-nnc-class"]?.available,
            unresolvedAvailability["classical-rule-logic-nnc-class"]?.renderInAuthority,
        ],
        known: [
            knownAvailability["classical-rule-logic-nnc-class"]?.available,
            knownAvailability["classical-rule-logic-nnc-class"]?.renderInAuthority,
        ],
    }, {
        unresolved: [true, true],
        known: [false, false],
    });

    const sourcePanel = ctx.ClassicalSourcePanel();
    const authorityPanel = ctx.ClassicalAuthorityPanel();
    s.eq("the nounstem class choice is presented in Source, not Grammar", {
        source: sourcePanel.includes('id="classical-rule-logic-nnc-class"')
            && sourcePanel.includes(">Nounstem class</span>"),
        grammar: authorityPanel.includes('id="classical-rule-logic-nnc-class"'),
    }, {
        source: true,
        grammar: false,
    });

    const ordinary = ctx.issueCanonicalNncSourceFrame({ stem: "cal" });
    const personal = ctx.issueCanonicalNncSourceFrame({
        stem: "eh-huā", embedStem: "eh", matrixStem: "huā",
    });
    s.eq("Lessons 12 to 15 ordinary Source and Lesson 16 pronominal Source stay distinct", {
        ordinary: [ordinary.authorizationStatus, ordinary.openStemSource, ordinary.sourceClass],
        personal: [personal.authorizationStatus, personal.familyId],
    }, {
        ordinary: ["authorized", false, "tli-1"],
        personal: ["authorized", "personal-compound"],
    });

    return s;
}

module.exports = { run };
