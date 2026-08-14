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
    const patternsByClass = Object.fromEntries(
        inventory.map((entry) => [entry.sourceClass, entry.classPattern])
    );
    s.eq("each Lesson 14 class carries its complete absolutive and possessive pattern", {
        tl1a: patternsByClass["tl-1-a"],
        tl2c: patternsByClass["tl-2-c"],
        tli2: patternsByClass["tli-2"],
        zero: patternsByClass.zero,
    }, {
        tl1a: {
            absolutiveSingularCommon: { realization: "restricted-use stem + tl", canvasSection: "§14.4" },
            absolutivePlural: { realization: "restricted-use stem + lexical m-eh or 0-h", canvasSection: "§14.5" },
            possessiveSingularCommon: { realization: "general-use stem + uh", canvasSection: "§14.7" },
            possessivePlural: { realization: "general-use stem + hu-ān", canvasSection: "§14.6" },
        },
        tl2c: {
            absolutiveSingularCommon: { realization: "restricted-use stem + tl", canvasSection: "§14.4" },
            absolutivePlural: { realization: "restricted-use stem + lexical m-eh or 0-h", canvasSection: "§14.5" },
            possessiveSingularCommon: { realization: "truncated general-use stem + supportive i + 0", canvasSection: "§14.7" },
            possessivePlural: { realization: "general-use stem + hu-ān", canvasSection: "§14.6" },
        },
        tli2: {
            absolutiveSingularCommon: { realization: "restricted-use stem + tli or li", canvasSection: "§14.4" },
            absolutivePlural: { realization: "restricted-use stem + lexical t-in or m-eh", canvasSection: "§14.5" },
            possessiveSingularCommon: { realization: "general-use stem + hui or a licensed silent alternative", canvasSection: "§14.7" },
            possessivePlural: { realization: "general-use stem + hu-ān", canvasSection: "§14.6" },
        },
        zero: {
            absolutiveSingularCommon: { realization: "restricted-use stem + 0", canvasSection: "§14.4" },
            absolutivePlural: { realization: "restricted-use stem + lexical t-in or m-eh", canvasSection: "§14.5" },
            possessiveSingularCommon: { realization: "general-use stem + 0", canvasSection: "§14.7" },
            possessivePlural: { realization: "general-use stem + hu-ān", canvasSection: "§14.6" },
        },
    });

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
        known: [true, true],
    });

    const sourcePanel = ctx.ClassicalSourcePanel();
    const authorityPanel = ctx.ClassicalAuthorityPanel();
    s.eq("the nounstem class choice is presented in Source, not Grammar", {
        source: sourcePanel.includes('id="classical-rule-logic-nnc-class"')
            && sourcePanel.includes(">Nounstem class</span>"),
        grammar: authorityPanel.includes('id="classical-rule-logic-nnc-class"'),
        matchingVerbstemPresentation:
            sourcePanel.includes(">Verbstem class</span>")
            && sourcePanel.includes(
                'id="classical-rule-logic-class"\n                          class="classical-nnc-source-guide__select"'
            ),
        noClassPatternInSource:
            !sourcePanel.includes('id="classical-nnc-source-class-pattern"'),
        pluralEndingChoiceInGrammar:
            authorityPanel.includes('id="classical-rule-logic-nnc-plural-connector"')
            && authorityPanel.includes(">Plural ending</span>")
            && authorityPanel.includes('<option value="t-in">-tin</option>')
            && authorityPanel.includes('<option value="m-eh">-meh</option>')
            && authorityPanel.includes('<option value="0-h">-h</option>')
            && authorityPanel.includes('<option value="hu-ān">-huān (automatic)</option>'),
        nounstemControlsFollowFormulaOrder:
            authorityPanel.indexOf('id="classical-rule-logic-nnc-predicate-form"')
                < authorityPanel.indexOf('id="classical-rule-logic-nnc-stem-relation"')
            && authorityPanel.indexOf('id="classical-rule-logic-nnc-stem-relation"')
                < authorityPanel.indexOf('id="classical-rule-logic-nnc-plural-connector"'),
    }, {
        source: true,
        grammar: false,
        matchingVerbstemPresentation: true,
        noClassPatternInSource: true,
        pluralEndingChoiceInGrammar: true,
        nounstemControlsFollowFormulaOrder: true,
    });

    const canonicalClass = ctx.issueCanonicalNncSourceFrame({
        stem: "cal", sourceClass: "tli-1",
    });
    const contradictedCanonicalClass = ctx.issueCanonicalNncSourceFrame({
        stem: "cal", sourceClass: "zero",
    });
    s.eq("the Source choice is open, while Canvas still guards a known nounstem", {
        canonical: [canonicalClass.authorizationStatus, canonicalClass.sourceClass],
        contradiction: [
            contradictedCanonicalClass.authorizationStatus,
            contradictedCanonicalClass.blockReason,
        ],
    }, {
        canonical: ["authorized", "tli-1"],
        contradiction: [
            "blocked",
            "ordinary-nnc-source-class-contradicts-canonical-source",
        ],
    });

    const michSource = ctx.issueCanonicalNncSourceFrame({ stem: "mich" });
    const michPluralChoices = ctx.getCanonicalNncOperationSelectionFrame(
        michSource,
        { state: "absolutive", subject: "3pl" }
    );
    const michUnselectedPlural = ctx.issueCanonicalNncOperationFrame(
        michSource,
        { state: "absolutive", subject: "3pl" }
    );
    const michTinOperation = ctx.issueCanonicalNncOperationFrame(
        michSource,
        { state: "absolutive", subject: "3pl", pluralConnector: "t-in" }
    );
    const michTinResult = ctx.requestClassicalOrdinaryNncResult(
        michSource,
        michTinOperation
    );
    const michPossessivePluralOperation = ctx.issueCanonicalNncOperationFrame(
        michSource,
        { state: "possessive", subject: "3pl", possessor: "3sg" }
    );
    const michPossessivePluralResult = ctx.requestClassicalOrdinaryNncResult(
        michSource,
        michPossessivePluralOperation
    );
    s.eq("Grammar asks for the absolutive plural ending but supplies possessive plural hu-ān", {
        choices: michPluralChoices.pluralConnectorValues,
        selectedBeforeChoice: michPluralChoices.selectedPluralConnector,
        unselected: [
            michUnselectedPlural.authorizationStatus,
            michUnselectedPlural.blockReason,
        ],
        absolutiveTin: [
            michTinResult.authorizationStatus,
            michTinResult.formulaRealization,
            michTinResult.surfaceRealization,
        ],
        possessivePlural: [
            michPossessivePluralResult.authorizationStatus,
            michPossessivePluralResult.formulaRealization,
            michPossessivePluralResult.surfaceRealization,
        ],
    }, {
        choices: ["t-in", "m-eh"],
        selectedBeforeChoice: "",
        unselected: [
            "blocked",
            "ordinary-nnc-plural-connector-not-lexically-authorized",
        ],
        absolutiveTin: ["authorized", "#0-0(mich)t-in#", "michtin"],
        possessivePlural: [
            "authorized",
            "#0-0+ī-0(mich)hu-ān#",
            "īmichhuān",
        ],
    });

    const michDistributiveOperation = ctx.issueCanonicalNncOperationFrame(
        michSource,
        {
            state: "absolutive",
            subject: "3pl",
            pluralConnector: "t-in",
            stemFormation: "distributive-varietal",
        }
    );
    const michDistributiveResult = ctx.requestClassicalOrdinaryNncResult(
        michSource,
        michDistributiveOperation
    );
    s.eq("the normal Grammar route applies the stem relation before the plural ending", {
        operation: michDistributiveOperation.authorizationStatus,
        relation: michDistributiveOperation.stemFormation,
        result: michDistributiveResult.authorizationStatus,
        formula: michDistributiveResult.formulaRealization,
        surface: michDistributiveResult.wordSurface,
    }, {
        operation: "authorized",
        relation: "distributive-varietal",
        result: "authorized",
        formula: "#0-0(mih-mich)t-in#",
        surface: "mihmichtin",
    });

    const michAffinityChoices = ctx.getCanonicalNncOperationSelectionFrame(
        michSource,
        {
            state: "absolutive",
            subject: "3pl",
            stemFormation: "affinity",
            pluralConnector: "m-eh",
        }
    );
    const chichiSource = ctx.issueCanonicalNncSourceFrame({ stem: "chichi" });
    const chichiPluralChoices = ctx.getCanonicalNncOperationSelectionFrame(
        chichiSource,
        { state: "absolutive", subject: "3pl" }
    );
    s.eq("Grammar hides plural endings and relations that contradict the selected class", {
        michAffinityEndings: michAffinityChoices.pluralConnectorValues,
        michAffinitySelected: michAffinityChoices.selectedPluralConnector,
        zeroClassPluralRelations: chichiPluralChoices.stemRelationValues,
    }, {
        michAffinityEndings: ["t-in"],
        michAffinitySelected: "t-in",
        zeroClassPluralRelations: ["plain", "distributive-varietal"],
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
