"use strict";

const { createSuite } = require("./runner");

function summarizeResult(result = null) {
    return {
        supported: result?.supported === true,
        result: result?.result || "",
        stem: result?.stem || "",
        formula: result?.clauseFrame?.formulaEcho || "",
        diagnosticIds: (result?.diagnostics || []).map((diagnostic) => diagnostic.id),
        authorityCarrierKeys: result?.authorityCarrierKeys || [],
    };
}

function run(ctx = {}) {
    const s = createSuite("ordinary_nnc_authority_firewall");
    const cleanRequest = {
        stem: "kal",
        state: "absolutive",
        number: "singular",
    };
    const poisonSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "nemi",
        state: "absolutive",
        number: "singular",
        nounClass: "zero",
    });

    s.eq(
        "ordinary NNC scalar derives exact GCD and LCM from typed Source",
        summarizeResult(ctx.generateOrdinaryNncParadigm(cleanRequest)),
        {
            supported: true,
            result: "kal",
            stem: "kal",
            formula: "#Ø-Ø(kal)Ø#",
            diagnosticIds: [],
            authorityCarrierKeys: [],
        }
    );
    s.eq(
        "parenthesized formula text remains diagnostic and cannot become Source",
        summarizeResult(
            ctx.generateOrdinaryNncParadigm({
                stem: "(siwa)t",
                state: "absolutive",
                number: "singular",
            })
        ),
        {
            supported: false,
            result: "",
            stem: "siwa",
            formula: "#Ø-Ø(siwa)tl#",
            diagnosticIds: ["ordinary-nnc-legacy-formula-string-blocked"],
            authorityCarrierKeys: [],
        }
    );

    const copiedSlots = JSON.parse(JSON.stringify(poisonSlots));
    const inheritedCarrierRequest = Object.assign(
        Object.create({ formulaSlots: copiedSlots }),
        cleanRequest
    );
    const getterCarrierRequest = { ...cleanRequest };
    Object.defineProperty(getterCarrierRequest, "formulaSlots", {
        enumerable: true,
        get() {
            throw new Error("formula carrier getter must not execute");
        },
    });
    const hostileRequests = [
        { ...cleanRequest, formulaSlots: poisonSlots },
        { ...cleanRequest, formulaSlots: copiedSlots },
        { ...cleanRequest, clauseFrame: { formulaSlots: copiedSlots } },
        { ...cleanRequest, nuclearClauseFrame: { formulaSlots: copiedSlots } },
        { ...cleanRequest, routeContract: { clauseFrame: { formulaSlots: copiedSlots } } },
        { ...cleanRequest, displayStem: "nemi" },
        { ...cleanRequest, surface: "nemi" },
        { ...cleanRequest, surfaceForms: ["nemi"] },
        inheritedCarrierRequest,
        getterCarrierRequest,
    ];
    s.eq(
        "raw copied nested inherited and getter carriers fail closed before scalar generation",
        hostileRequests.map((request) => summarizeResult(
            ctx.generateOrdinaryNncParadigm(request)
        )),
        hostileRequests.map((_request, index) => ({
            supported: false,
            result: "",
            stem: "kal",
            formula: "#Ø-Ø(kal)Ø#",
            diagnosticIds: ["ordinary-nnc-authority-carrier-rejected"],
            authorityCarrierKeys: [[
                "formulaSlots",
                "formulaSlots",
                "clauseFrame",
                "nuclearClauseFrame",
                "routeContract",
                "displayStem",
                "surface",
                "surfaceForms",
                "formulaSlots",
                "formulaSlots",
            ][index]],
        }))
    );

    const cleanSet = ctx.generateOrdinaryNncParadigmSet({
        stem: "kal",
        states: ["absolutive"],
        numbers: ["singular"],
    });
    const blockedSet = ctx.generateOrdinaryNncParadigmSet({
        stem: "kal",
        states: ["absolutive"],
        numbers: ["singular"],
        formulaSlots: copiedSlots,
    });
    s.eq(
        "full paradigm coordinate is pointwise equal to scalar and shares its carrier firewall",
        {
            cleanSupported: cleanSet.supported,
            cleanEntryCount: cleanSet.entries.length,
            scalar: summarizeResult(ctx.generateOrdinaryNncParadigm(cleanRequest)),
            coordinate: summarizeResult(cleanSet.entries[0]),
            blockedSupported: blockedSet.supported,
            blockedEntryCount: blockedSet.entries.length,
            blockedDiagnosticIds: blockedSet.diagnostics.map((diagnostic) => diagnostic.id),
            blockedCarrierKeys: blockedSet.authorityCarrierKeys,
        },
        {
            cleanSupported: true,
            cleanEntryCount: 1,
            scalar: {
                supported: true,
                result: "kal",
                stem: "kal",
                formula: "#Ø-Ø(kal)Ø#",
                diagnosticIds: [],
                authorityCarrierKeys: [],
            },
            coordinate: {
                supported: true,
                result: "kal",
                stem: "kal",
                formula: "#Ø-Ø(kal)Ø#",
                diagnosticIds: [],
                authorityCarrierKeys: [],
            },
            blockedSupported: false,
            blockedEntryCount: 0,
            blockedDiagnosticIds: ["ordinary-nnc-authority-carrier-rejected"],
            blockedCarrierKeys: ["formulaSlots"],
        }
    );
    const completeKalSet = ctx.generateOrdinaryNncParadigmSet({ stem: "kal" });
    const parityMismatches = completeKalSet.entries.flatMap((coordinate, index) => {
        const scalar = ctx.generateOrdinaryNncParadigm({
            stem: "kal",
            state: coordinate.state,
            subject: coordinate.subject,
            possessor: coordinate.possessor?.id || null,
            number: coordinate.number,
            pluralType: coordinate.pluralType || "auto",
            nounClass: coordinate.nounClass,
            animacy: coordinate.animacy,
        });
        const same =
            scalar.supported === coordinate.supported
            && scalar.result === coordinate.result
            && scalar.clauseFrame?.formulaEcho
                === coordinate.clauseFrame?.formulaEcho;
        return same
            ? []
            : [{
                index,
                coordinate: summarizeResult(coordinate),
                scalar: summarizeResult(scalar),
            }];
    });
    s.eq(
        "every generated kal paradigm coordinate is exactly the same scalar evaluation",
        {
            coordinateCount: completeKalSet.entries.length,
            parityMismatches,
        },
        {
            coordinateCount: 8,
            parityMismatches: [],
        }
    );

    const organic = ctx.generateOrdinaryNncParadigm({
        stem: "naka",
        state: "possessive",
        possessor: "no",
        possessionKind: "organic",
    });
    const organicSource = ctx.buildOrdinaryNncOrganicPossessionSourceFrame({
        sourceStem: "naka",
        possessor: ctx.resolveOrdinaryNncPossessor("no"),
        possessionKind: "organic",
    });
    const organicOperation =
        ctx.buildOrdinaryNncOrganicPossessionOperationFrame(organicSource);
    const copiedOrganicSource = JSON.parse(JSON.stringify(organicSource));
    const copiedOrganicOperation = JSON.parse(JSON.stringify(organicOperation));
    s.eq(
        "organic possession derives from Source stem and copied operation frames cannot authorize",
        {
            result: summarizeResult(organic),
            sourceStem: organic.sourceStem,
            builderRejectsFormulaSlots:
                ctx.buildOrdinaryNncOrganicPossessionSourceFrame({
                    formulaSlots: poisonSlots,
                    possessor: ctx.resolveOrdinaryNncPossessor("no"),
                    possessionKind: "organic",
                }),
            copiedProfile:
                ctx.buildOrdinaryNncOrganicPossessionProfile({
                    sourceFrame: copiedOrganicSource,
                    operationFrame: copiedOrganicOperation,
                }),
            scalarWithCopiedFrames: summarizeResult(
                ctx.generateOrdinaryNncParadigm({
                    stem: "naka",
                    state: "possessive",
                    possessor: "no",
                    possessionKind: "organic",
                    organicPossessionSourceFrame: copiedOrganicSource,
                    organicPossessionOperationFrame: copiedOrganicOperation,
                })
            ),
        },
        {
            result: {
                supported: true,
                result: "nonakayo",
                stem: "nakayo",
                formula: "#Ø-Ø(nakayo)tl#",
                diagnosticIds: [],
                authorityCarrierKeys: [],
            },
            sourceStem: "naka",
            builderRejectsFormulaSlots: null,
            copiedProfile: null,
            scalarWithCopiedFrames: {
                supported: false,
                result: "",
                stem: "naka",
                formula: "#Ø-Ø(naka)Ø#",
                diagnosticIds: ["ordinary-nnc-authority-carrier-rejected"],
                authorityCarrierKeys: [
                    "organicPossessionSourceFrame",
                    "organicPossessionOperationFrame",
                ],
            },
        }
    );

    const retiredEngineRequest = {
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.sustantivo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
                ordinaryNnc: {
                    enabled: true,
                    state: "absolutive",
                    number: "singular",
                    clauseFrame: { formulaSlots: copiedSlots },
                },
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "kal",
            pers2: "",
            num2: "",
            tiempo: "ordinary-nnc",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    };
    const retiredEngineResult =
        ctx.executeNuclearClauseSurfaceRequest(retiredEngineRequest);
    s.eq(
        "the canonical executor rejects the retired ordinary-NNC request lane, including nested formula carriers",
        {
            retired: summarizeResult(retiredEngineResult),
            legacyRequestBuilderPresent:
                typeof ctx.buildOrdinaryNncGenerateWordRequest === "function",
            legacyExecutorPresent:
                typeof ctx.executeGenerateWordRequest === "function",
        },
        {
            retired: {
                supported: false,
                result: "—",
                stem: "",
                formula: "",
                diagnosticIds: [
                    "retired-ordinary-nnc-generation-carrier-forbidden",
                ],
                authorityCarrierKeys: [],
            },
            legacyRequestBuilderPresent: false,
            legacyExecutorPresent: false,
        }
    );

    const ordinaryWorkbench =
        ctx.buildOrdinaryNncFormulaWorkbenchSlice({ inputValue: "kal" });
    const possessiveWorkbench =
        ctx.buildPossessiveStateNncFormulaWorkbenchSlice({ inputValue: "kal" });
    s.eq(
        "formula workbench surfaces are projections of scalar results rather than schema gates",
        [ordinaryWorkbench, possessiveWorkbench].map((slice) => ({
            allowed: slice.generation.allowed,
            status: slice.generation.status,
            authorizationPath: slice.generation.authorizationPath,
            hasFormulaAuthorityField:
                Object.keys(slice.generation).some((key) =>
                    key.startsWith("formulaAuthority")
                ),
            sourceContainsLegacyEvaluator:
                String(
                    slice.kind === "ordinary-nnc-formula-workbench-slice"
                        ? ctx.buildOrdinaryNncFormulaWorkbenchSlice
                        : ctx.buildPossessiveStateNncFormulaWorkbenchSlice
                ).includes("evaluateAndrewsFormulaGenerationAuthority"),
        })),
        [
            {
                allowed: true,
                status: "generated",
                authorizationPath:
                    "typed-source-to-canonical-ordinary-nnc-result",
                hasFormulaAuthorityField: false,
                sourceContainsLegacyEvaluator: false,
            },
            {
                allowed: true,
                status: "generated",
                authorizationPath:
                    "typed-source-to-canonical-ordinary-nnc-result",
                hasFormulaAuthorityField: false,
                sourceContainsLegacyEvaluator: false,
            },
        ]
    );
    s.eq(
        "the retired ordinary-NNC renderer is absent and the canonical application entry remains available",
        {
            retiredRenderer: typeof ctx.renderOrdinaryNncConjugations,
            canonicalApplication:
                typeof ctx.requestClassicalOrdinaryNncResult,
        },
        {
            retiredRenderer: "undefined",
            canonicalApplication: "function",
        }
    );

    return s;
}

module.exports = { run };
