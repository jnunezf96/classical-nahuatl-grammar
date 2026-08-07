"use strict";

/**
 * Tests for src/core/agreement/agreement.mjs
 * Covers: getPers1Pers2Info, getObj1PersonInfo,
 *         isPers1Obj1SamePersonAcrossNumber, isPers1Obj1Reflexivo.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("agreement");

    // getPers1Pers2Info(pers1, pers2) -> {person, number}
    s.eq("pers1-pers2 ni/Ø = 1sg", ctx.getPers1Pers2Info("ni", ""), { person: 1, number: "sg" });
    s.eq("pers1-pers2 ti/Ø = 2sg", ctx.getPers1Pers2Info("ti", ""), { person: 2, number: "sg" });
    s.eq("pers1-pers2 Ø/Ø = 3sg", ctx.getPers1Pers2Info("", ""), { person: 3, number: "sg" });
    s.eq("pers1-pers2 ti/h = 1pl", ctx.getPers1Pers2Info("ti", "h"), { person: 1, number: "pl" });
    s.eq("pers1-pers2 x/Ø = 2sg optative", ctx.getPers1Pers2Info("x", ""), { person: 2, number: "sg", mode: "optative" });
    s.eq("pers1-pers2 ti/ān = 1pl optative", ctx.getPers1Pers2Info("ti", "ān"), { person: 1, number: "pl", mode: "optative" });
    s.eq("pers1-pers2 x/ān = 2pl optative", ctx.getPers1Pers2Info("x", "ān"), { person: 2, number: "pl", mode: "optative" });
    s.eq("pers1-pers2 Ø/ān = 3pl optative", ctx.getPers1Pers2Info("", "ān"), { person: 3, number: "pl", mode: "optative" });
    s.eq("optative pers1-pers2 ni/Ø = 1sg", ctx.getOptativePers1Pers2Info("ni", ""), { person: 1, number: "sg", mode: "optative" });
    s.eq("optative pers1-pers2 x/Ø = 2sg", ctx.getOptativePers1Pers2Info("x", ""), { person: 2, number: "sg", mode: "optative" });
    s.eq("optative pers1-pers2 Ø/Ø = 3sg", ctx.getOptativePers1Pers2Info("", ""), { person: 3, number: "sg", mode: "optative" });
    s.eq("optative pers1-pers2 ti/ān = 1pl", ctx.getOptativePers1Pers2Info("ti", "ān"), { person: 1, number: "pl", mode: "optative" });
    s.eq("optative pers1-pers2 x/ān = 2pl", ctx.getOptativePers1Pers2Info("x", "ān"), { person: 2, number: "pl", mode: "optative" });
    s.eq("optative pers1-pers2 Ø/ān = 3pl", ctx.getOptativePers1Pers2Info("", "ān"), { person: 3, number: "pl", mode: "optative" });
    s.eq("pers1-pers2 ni/Ø with optative context = 1sg optative", ctx.getPers1Pers2Info("ni", "", { tense: "optativo" }), { person: 1, number: "sg", mode: "optative" });
    s.eq("nonoptative pers1-pers2 ni/Ø = 1sg", ctx.getNonOptativePers1Pers2Info("ni", ""), { person: 1, number: "sg", mode: "nonoptative" });
    s.eq("nonoptative pers1-pers2 ti/Ø = 2sg", ctx.getNonOptativePers1Pers2Info("ti", ""), { person: 2, number: "sg", mode: "nonoptative" });
    s.eq("nonoptative pers1-pers2 Ø/Ø = 3sg", ctx.getNonOptativePers1Pers2Info("", ""), { person: 3, number: "sg", mode: "nonoptative" });
    s.eq("nonoptative pers1-pers2 ti/h = 1pl", ctx.getNonOptativePers1Pers2Info("ti", "h"), { person: 1, number: "pl", mode: "nonoptative" });
    s.eq("nonoptative pers1-pers2 am/h = 2pl", ctx.getNonOptativePers1Pers2Info("am", "h"), { person: 2, number: "pl", mode: "nonoptative" });
    s.eq("nonoptative pers1-pers2 Ø/h = 3pl", ctx.getNonOptativePers1Pers2Info("", "h"), { person: 3, number: "pl", mode: "nonoptative" });
    s.eq("pers1-pers2 am/h with nonoptative tense = 2pl", ctx.getPers1Pers2Info("am", "h", { tense: "presente" }), { person: 2, number: "pl", mode: "nonoptative" });
    s.eq("pers1-pers2 ti/Ø with nonoptative mode = 2sg", ctx.getPers1Pers2Info("ti", "", { mode: "non-optative" }), { person: 2, number: "sg", mode: "nonoptative" });

    // getObj1PersonInfo(obj1) -> {person, number} | null
    s.eq("obj1 qui = 3sg", ctx.getObj1PersonInfo("qui"), { person: 3, number: "sg" });
    s.eq("obj1 nēch = 1sg", ctx.getObj1PersonInfo("nēch"), { person: 1, number: "sg" });
    s.eq("obj1 tēch = 1pl", ctx.getObj1PersonInfo("tēch"), { person: 1, number: "pl" });
    s.eq("obj1 quin = 3pl", ctx.getObj1PersonInfo("quin"), { person: 3, number: "pl" });
    s.eq("nonspecific object tē has no person identity", ctx.getObj1PersonInfo("tē"), null);

    // isPers1Obj1SamePersonAcrossNumber: true when pers1-pers2 and obj1 share person but differ in number.
    s.ok("1sg pers1-pers2 + 1pl obj1 = same person across number", ctx.isPers1Obj1SamePersonAcrossNumber("ni", "", "tēch"));
    s.ok("optative 2sg pers1-pers2 + 2pl obj1 = same person across number", ctx.isPers1Obj1SamePersonAcrossNumber("x", "", "amēch"));
    s.no("1sg pers1-pers2 + 3sg obj1 = different person", ctx.isPers1Obj1SamePersonAcrossNumber("ni", "", "qui"));
    s.no("2sg pers1-pers2 + 1sg obj1 = different person", ctx.isPers1Obj1SamePersonAcrossNumber("ti", "", "nēch"));

    // isPers1Obj1Reflexivo: pers1-pers2 = obj1 in person+number (3rd person never reflexive here).
    s.ok("1sg pers1-pers2 + 1sg obj1 = reflexive", ctx.isPers1Obj1Reflexivo("ni", "", "nēch"));
    s.ok("optative 2pl pers1-pers2 + 2pl obj1 = reflexive", ctx.isPers1Obj1Reflexivo("x", "ān", "amēch"));
    s.no("1sg pers1-pers2 + 3sg obj1 = not reflexive", ctx.isPers1Obj1Reflexivo("ni", "", "qui"));
    s.no("3sg pers1-pers2 + 3sg obj1 = not reflexive (3rd person excluded)", ctx.isPers1Obj1Reflexivo("", "", "qui"));

    // getObjectLabel — returns non-empty string for known prefixes
    s.ok("getObjectLabel qui returns non-empty", Boolean(ctx.getObjectLabel("qui")));
    s.ok("getObjectLabel quin returns non-empty", Boolean(ctx.getObjectLabel("quin")));
    s.ok("getObjectLabel nēch returns non-empty", Boolean(ctx.getObjectLabel("nēch")));
    s.ok("getObjectLabel empty prefix returns intransitive label", Boolean(ctx.getObjectLabel("")));

    // getObjectLabelShort — strips parenthetical suffix notations
    const longLabel = ctx.getObjectLabel("qui");
    const shortLabel = ctx.getObjectLabelShort("qui");
    s.ok("getObjectLabelShort result length <= full label length", shortLabel.length <= longLabel.length);
    s.no("getObjectLabelShort contains no parenthetical", shortLabel.includes("("));

    s.eq(
        "masked conjugation display uses a diagnostic message instead of an empty dash",
        ctx.getConjugationNoOutputDisplay({
            shouldMaskRow: true,
            isErrorRow: true,
            diagnosticIds: [ctx.CONJUGATION_DIAGNOSTIC_IDS.invalidCombo],
        }),
        "Combinacion incompatible."
    );
    s.eq(
        "missing conjugation display has a stable fallback",
        ctx.getConjugationNoOutputDisplay({ hasRenderableResult: false }),
        "Sin salida para esta configuracion."
    );
    s.eq(
        "publicly shape-built frame cannot supply LCM route metadata",
        (() => {
            const diagnostic = {
                id: "ANDREWS_ROUTE_NOT_LICENSED",
                message: "Andrews route blocked before generation.",
                severity: "error",
            };
            const grammarFrame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "diagnostic-only",
                    andrewsRefs: ["Andrews Lesson 53"],
                    supported: false,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "comparison",
                    routeStage: "classify-boundary",
                    generationAllowed: false,
                    blockingDiagnostics: [diagnostic],
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "comparison-candidate-classification",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "diagnostic-only",
                    diagnostics: [diagnostic],
                }),
            });
            const evaluation = ctx.buildConjugationEvaluationRecord({
                result: {
                    frames: grammarFrame,
                    contractDiagnostics: [diagnostic],
                },
            });
            const row = { dataset: {} };
            ctx.applyConjugationEvaluationPresentation({
                row,
                value: null,
                evaluation,
            });
            return {
                label: ctx.getConjugationNoOutputDisplay(evaluation),
                diagnosticIds: evaluation.diagnosticIds,
                routeFamily: row.dataset.lcmRouteFamily,
                routeStage: row.dataset.lcmRouteStage,
                generationAllowed: row.dataset.lcmGenerationAllowed,
                evidenceStatus: row.dataset.lcmEvidenceStatus,
            };
        })(),
        {
            label: "Andrews route blocked before generation.",
            diagnosticIds: ["ANDREWS_ROUTE_NOT_LICENSED"],
        }
    );
    s.eq(
        "publicly shape-built frame cannot outrank owner diagnostics",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "blocked",
                    andrewsRefs: ["Andrews Lesson 4"],
                    supported: false,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "nuclear-clause-surface",
                    routeStage: "morphology-application",
                    generationAllowed: false,
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "nuclear-clause-surface",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "blocked",
                    diagnostics: [],
                }),
            });
            const evaluation = ctx.buildConjugationEvaluationRecord({
                result: {
                    error: true,
	                    diagnostics: [{
	                        id: "nuclear-clause-surface-route-blocked",
	                        severity: "error",
	                        message: "La generacion no produjo una forma.",
	                        failedLayer: "output",
	                        contractLayer: "resultFrame",
	                    }],
                    frames: grammarFrame,
                },
            });
            return {
                label: ctx.getConjugationNoOutputDisplay(evaluation),
                diagnosticIds: evaluation.diagnosticIds,
                firstFailedLayer: evaluation.diagnostics[0]?.failedLayer || "",
                firstContractLayer: evaluation.diagnostics[0]?.contractLayer || "",
                secondMessage: evaluation.diagnostics[1]?.message || "",
            };
        })(),
        {
            label: "La generacion no produjo una forma.",
            diagnosticIds: ["nuclear-clause-surface-route-blocked"],
            firstFailedLayer: "output",
            firstContractLayer: "resultFrame",
            secondMessage: "",
        }
    );
    s.eq(
        "unissued blocked-frame status supplies no inferred contract layer",
        (() => {
            const plainDiagnostic = {
                id: "plain-route-blocked",
                severity: "error",
                message: "Route blocked without explicit layer.",
            };
            const grammarFrame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "blocked",
                    andrewsRefs: ["Andrews Lesson 4"],
                    supported: true,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "vnc",
                    routeStage: "classify-route",
                    generationAllowed: false,
                    blockingDiagnostics: [plainDiagnostic],
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "vnc",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "blocked",
                    diagnostics: [plainDiagnostic],
                }),
            });
            const evaluation = ctx.buildConjugationEvaluationRecord({
                result: {
                    frames: grammarFrame,
                    diagnostics: [plainDiagnostic],
                },
            });
            const row = { dataset: {} };
            ctx.applyConjugationEvaluationPresentation({
                row,
                value: null,
                evaluation,
            });
            return {
                diagnosticId: row.dataset.lcmDiagnosticId,
                failedLayer: row.dataset.lcmFailedLayer,
                contractLayer: row.dataset.lcmContractLayer,
            };
        })(),
        {
            diagnosticId: "plain-route-blocked",
            failedLayer: "",
            contractLayer: "",
        }
    );
    s.eq(
        "raw output contracts cannot render without an owner-issued frame",
        (() => {
            const result = ctx.buildOutputWordResult({ pers1: "ni", tronco: "nemi" });
            const evaluation = ctx.buildConjugationEvaluationRecord({ result });
            return {
                resultField: result.result || "",
                surface: result.surface,
                hasRenderableResult: evaluation.hasRenderableResult,
                hasVisibleResult: evaluation.hasVisibleResult,
                availabilityState: evaluation.availabilityState,
            };
        })(),
        {
            resultField: "",
            surface: "ninemi",
            hasRenderableResult: false,
            hasVisibleResult: false,
            availabilityState: ctx.CONJUGATION_AVAILABILITY_STATE.impossible,
        }
    );
    s.eq(
        "publicly shape-built result-frame surfaces are not renderable",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-visible-a / frame-visible-b"],
                    outputKind: "vnc",
                    generationRoute: "vnc",
                }),
            });
            const result = {
                result: "stale-visible-result",
                surface: "top-visible-surface",
                surfaceForms: ["stale-visible-a / stale-visible-b"],
                frames: grammarFrame,
            };
            const evaluation = ctx.buildConjugationEvaluationRecord({ result });
            return {
                forms: ctx.getConjugationRenderableSurfaceForms(result),
                surface: ctx.getConjugationRenderableSurface(result),
                hasRenderableResult: evaluation.hasRenderableResult,
                hasVisibleResult: evaluation.hasVisibleResult,
                availabilityState: evaluation.availabilityState,
            };
        })(),
        {
            forms: [],
            surface: "",
            hasRenderableResult: false,
            hasVisibleResult: false,
            availabilityState: ctx.CONJUGATION_AVAILABILITY_STATE.impossible,
        }
    );
    s.eq(
        "conjugation renderable surface reader stops at empty LCM result frames before stale surfaces",
        (() => {
            const result = {
                result: "stale-visible-result",
                surface: "top-visible-surface",
                surfaceForms: ["stale-visible-a / stale-visible-b"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                        outputKind: "blocked-vnc",
                    }),
                }),
            };
            return {
                forms: ctx.getConjugationRenderableSurfaceForms(result),
                surface: ctx.getConjugationRenderableSurface(result),
            };
        })(),
        {
            forms: [],
            surface: "",
        }
    );
    s.eq(
        "presentation does not fall back to raw contract surface",
        (() => {
            const classes = new Set();
            const value = {
                textContent: "",
                dataset: {},
                classList: {
                    add: (...names) => names.forEach((name) => classes.add(name)),
                    remove: (...names) => names.forEach((name) => classes.delete(name)),
                    contains: (name) => classes.has(name),
                },
            };
            const result = ctx.buildOutputWordResult({ pers1: "ni", tronco: "nemi" });
            const evaluation = ctx.buildConjugationEvaluationRecord({ result });
            ctx.applyConjugationEvaluationPresentation({
                value,
                evaluation,
                formattedValue: "",
            });
            return {
                textContent: value.textContent,
                noOutputClass: classes.has("conjugation-value--no-output"),
                availabilityState: value.dataset.availabilityState,
            };
        })(),
        {
            textContent: "Sin salida para esta configuracion.",
            noOutputClass: true,
            availabilityState: ctx.CONJUGATION_AVAILABILITY_STATE.impossible,
        }
    );
    s.eq(
        "mask state prefers LCM route diagnostics over generic result error",
        (() => {
            const diagnostic = {
                id: "ANDREWS_ROUTE_NOT_LICENSED",
                message: "Andrews route blocked before generation.",
                severity: "error",
            };
            const grammarFrame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "diagnostic-only",
                    andrewsRefs: ["Andrews Lesson 40"],
                    supported: false,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "adjectival-nnc-function",
                    routeStage: "classify-route",
                    generationAllowed: false,
                    blockingDiagnostics: [diagnostic],
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "adjectival-nnc-function",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "blocked",
                    diagnostics: [diagnostic],
                }),
            });
            const result = {
                error: true,
                frames: grammarFrame,
                contractDiagnostics: [diagnostic],
            };
            const maskState = ctx.getConjugationMaskState({
                result,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                enforceInvalidCombo: false,
            });
            const evaluation = ctx.buildConjugationEvaluationRecord({ result, maskState });
            return {
                maskDiagnosticIds: maskState.diagnosticIds,
                evaluationDiagnosticIds: evaluation.diagnosticIds,
                label: ctx.getConjugationNoOutputDisplay(evaluation),
            };
        })(),
        {
            maskDiagnosticIds: ["ANDREWS_ROUTE_NOT_LICENSED"],
            evaluationDiagnosticIds: ["ANDREWS_ROUTE_NOT_LICENSED"],
            label: "Andrews route blocked before generation.",
        }
    );
    s.eq(
        "verb-derived nominal builder context exposes non-enumerable LCM frame",
        (() => {
            const rawVerb = "(miki)";
            const result = ctx.buildVerbDerivedNominalBuilderContext({
                kind: ctx.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
                rawVerb,
                verbMeta: ctx.parseVerbInput(rawVerb),
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            });
            return {
                error: result.error,
                ok: result.ok,
                surface: result.surface,
                frameAlias: result.frames === result.grammarFrame,
                grammarFrameEnumerable: Object.prototype.propertyIsEnumerable.call(result, "grammarFrame"),
                routeFamily: result.grammarFrame.routeContract.routeFamily,
                routeStage: result.grammarFrame.routeContract.routeStage,
                unitKind: result.grammarFrame.unitFrame.unitKind,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
                evidenceStatus: result.grammarFrame.authorityFrame.evidenceStatus,
                sourceInput: result.grammarFrame.resultFrame.sourceInput,
            };
        })(),
        {
            error: false,
            ok: true,
            surface: "",
            frameAlias: true,
            grammarFrameEnumerable: false,
            routeFamily: "verb-derived-nominal-builder-context",
            routeStage: "build-context",
            unitKind: "agreement-builder-context",
            generationAllowed: true,
            evidenceStatus: "context-built",
            sourceInput: "(miki)",
        }
    );
    s.eq(
        "verb-derived nominal builder context blocked gates carry diagnostics",
        (() => {
            const rawVerb = "(miki)";
            const result = ctx.buildVerbDerivedNominalBuilderContext({
                kind: ctx.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
                rawVerb,
                verbMeta: ctx.parseVerbInput(rawVerb),
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "",
                requireNonanimateSubject: true,
            });
            return {
                error: result.error,
                ok: result.ok,
                routeStage: result.grammarFrame.routeContract.routeStage,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
                diagnosticStatus: result.grammarFrame.diagnosticFrame.status,
                diagnosticId: result.grammarFrame.diagnosticFrame.diagnostics[0]?.id || "",
                diagnosticMessage: result.grammarFrame.diagnosticFrame.diagnostics[0]?.message || "",
                diagnosticFailedLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.failedLayer || "",
                diagnosticContractLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.contractLayer || "",
                diagnosticRouteFamily: result.grammarFrame.diagnosticFrame.diagnostics[0]?.routeFamily || "",
                diagnosticRouteStage: result.grammarFrame.diagnosticFrame.diagnostics[0]?.routeStage || "",
                diagnosticsEnumerable: Object.prototype.propertyIsEnumerable.call(result, "diagnostics"),
            };
        })(),
        {
            error: true,
            ok: false,
            routeStage: "subject-gate",
            generationAllowed: false,
            diagnosticStatus: "blocked",
            diagnosticId: "verb-derived-nominal-context-nonanimate-subject-required",
            diagnosticMessage: "Esta ruta nominal requiere sujeto no animado.",
            diagnosticFailedLayer: "agreement",
            diagnosticContractLayer: "participantFrame",
            diagnosticRouteFamily: "verb-derived-nominal-builder-context",
            diagnosticRouteStage: "subject-gate",
            diagnosticsEnumerable: false,
        }
    );
    s.eq(
        "blank formatted conjugation display normalizes to no output",
        ctx.normalizeConjugationDisplayText("—"),
        ""
    );

    return s;
}

module.exports = { run };
