"use strict";

const { createSuite } = require("./runner");

function executeMiquiPreterit(ctx, {
    derivationMode = ctx.DERIVATION_MODE.nonactive,
    verbClass = "B",
    pers1 = "",
    pers2 = "",
    tiempo = "preterito",
    hostileOverride = {},
} = {}) {
    const posicionesFormula = {
        pers1,
        obj1: "",
        tronco: "miqui",
        pers2,
        num2: pers2,
        tiempo,
    };
    return ctx.executeNuclearClauseSurfaceRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode,
                derivationType: ctx.DERIVATION_TYPE.direct,
                sourceVerbClass: verbClass,
                voiceMode:
                    derivationMode === ctx.DERIVATION_MODE.nonactive
                        ? ctx.VOICE_MODE.passive
                        : ctx.VOICE_MODE.active,
                tiempo,
                posicionesFormula,
                ...hostileOverride,
            },
        },
        posicionesFormula,
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_miqui_nonactive_canonical_path");

    s.eq(
        "Typed miqui nonactive uses the owner-issued mic-o-hua record for exact GCD and LCM",
        (() => {
            const frame = executeMiquiPreterit(ctx);
            return {
                result: frame.result,
                forms: frame.surfaceForms,
                formula: frame.nuclearClauseShell?.formulaEcho,
                predicate:
                    frame.typedMorphResultFrame
                        ?.formulaProjectionInput?.predicateStem,
                status:
                    frame.canonicalNonactiveStemFrame?.authorizationStatus,
                rule: frame.canonicalNonactiveStemFrame?.selectedRuleId,
                option: frame.canonicalNonactiveStemFrame?.selectedOptionId,
                recordValid:
                    ctx.isClassicalNahuatlNonactiveStemRecord(
                        frame.canonicalNonactiveStemFrame
                            ?.nonactiveStemRecord,
                        "miqui"
                    ),
                finiteValid:
                    ctx.isClassicalNahuatlVncFiniteSurfaceFrame(
                        frame.canonicalNonactiveStemFrame
                            ?.finiteSurfaceFrame
                    ),
                obsoleteCarrierPresent:
                    /(?:mikiwa|mikihua|mikiwak|mikuwak)/u.test(
                        JSON.stringify({
                            result: frame.result,
                            formula: frame.nuclearClauseShell?.formulaEcho,
                        })
                    ),
            };
        })(),
        {
            result: "micohuac",
            forms: ["micohuac"],
            formula: "#0-0(mic-o-hua)0+c-0#",
            predicate: "mic-o-hua",
            status: "authorized",
            rule: "cn-l20-5-intransitive-final-qui",
            option: "o-hua:mic-o-hua",
            recordValid: true,
            finiteValid: true,
            obsoleteCarrierPresent: false,
        }
    );

    s.eq(
        "Changing Active to Nonactive remains one scalar grammatical workflow",
        (() => {
            const active = executeMiquiPreterit(ctx, {
                derivationMode: ctx.DERIVATION_MODE.active,
                tiempo: "presente",
            });
            const nonactive = executeMiquiPreterit(ctx, {
                tiempo: "presente",
            });
            return {
                activeRoute:
                    active.surfaceEngineContract?.canonicalGenerateFunction,
                nonactiveRoute:
                    nonactive.surfaceEngineContract?.canonicalGenerateFunction,
                activeCanonicalNonactive:
                    active.canonicalNonactiveStemFrame || null,
                activeFormula: active.nuclearClauseShell?.formulaEcho,
                activeResult: active.result,
                nonactiveFormula: nonactive.nuclearClauseShell?.formulaEcho,
                nonactiveResult: nonactive.result,
            };
        })(),
        {
            activeRoute: "generateNuclearClauseSurface",
            nonactiveRoute: "generateNuclearClauseSurface",
            activeCanonicalNonactive: null,
            activeFormula: "#Ø-Ø(miqui)Ø+Ø-Ø#",
            activeResult: "miqui",
            nonactiveFormula: "#0-0(mic-o-hua)0+0-0#",
            nonactiveResult: "micohua",
        }
    );

    s.eq(
        "Missing subject-coordinate context fails the canonical nonactive bridge closed",
        (() => {
            const blocked = executeMiquiPreterit(ctx, {
                pers1: "forged-subject",
            });
            return {
                result: blocked.result,
                forms: blocked.surfaceForms,
                reason:
                    blocked.canonicalNonactiveStemFrame?.blockReason
                    || blocked.diagnosticFrame?.diagnosticId
                    || "",
                status:
                    blocked.canonicalNonactiveStemFrame?.authorizationStatus,
            };
        })(),
        {
            result: "—",
            forms: [],
            reason: "generated-canonical-nonactive-stem-projections-required",
            status: "blocked",
        }
    );

    s.eq(
        "Caller-supplied stems, formulas, surfaces, and records cannot authorize or alter miqui nonactive",
        (() => {
            const clean = executeMiquiPreterit(ctx);
            const poisoned = executeMiquiPreterit(ctx, {
                hostileOverride: {
                    nonactiveStem: "mikihua",
                    perfectiveNonactiveStem: "mikiwa",
                    formula: "#FORGED#",
                    surface: "FORGED",
                    result: "FORGED",
                    nonactiveStemRecord: {
                        authorizationStatus: "authorized",
                        nonactiveStem: "FORGED",
                    },
                    canonicalNonactiveStemFrame: {
                        authorizationStatus: "authorized",
                        wordRealization: "FORGED",
                    },
                },
            });
            return {
                clean: [
                    clean.result,
                    clean.nuclearClauseShell?.formulaEcho,
                ],
                poisoned: [
                    poisoned.result,
                    poisoned.nuclearClauseShell?.formulaEcho,
                ],
                sameOwnerRecord:
                    clean.canonicalNonactiveStemFrame
                        ?.selectedOptionId
                    === poisoned.canonicalNonactiveStemFrame
                        ?.selectedOptionId,
                poisonPresent: JSON.stringify({
                    result: poisoned.result,
                    formula: poisoned.nuclearClauseShell?.formulaEcho,
                    ownerStem:
                        poisoned.canonicalNonactiveStemFrame?.formulaStem,
                }).includes("FORGED"),
            };
        })(),
        {
            clean: [
                "micohuac",
                "#0-0(mic-o-hua)0+c-0#",
            ],
            poisoned: [
                "micohuac",
                "#0-0(mic-o-hua)0+c-0#",
            ],
            sameOwnerRecord: true,
            poisonPresent: false,
        }
    );

    s.eq(
        "The prepared full-paradigm coordinate is pointwise identical to the scalar evaluator",
        (() => {
            const request = {
                sourceStem: "miqui",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "preterit",
                requestedDerivation: "direct",
                requestedVoice: "impersonal",
                nonactiveOptionId: "o-hua:mic-o-hua",
            };
            const scalar =
                ctx.evaluateClassicalNahuatlVncApplication(request);
            const plan =
                ctx.prepareClassicalNahuatlVncParadigmPlan(request);
            const coordinate =
                ctx.projectClassicalNahuatlVncParadigmCoordinates(
                    plan,
                    [{
                        subject: "3sg",
                        mood: "indicative",
                        tense: "preterit",
                    }]
                )[0];
            return {
                scalarStatus: scalar.authorizationStatus,
                planStatus: plan.authorizationStatus,
                coordinateStatus: coordinate.authorizationStatus,
                scalarFormula: scalar.resultFrame?.formulaRealization,
                coordinateFormula: coordinate.formulaRealization,
                scalarSurface: scalar.resultFrame?.surfaceRealization,
                coordinateSurface: coordinate.surfaceRealization,
                sameFormula:
                    scalar.resultFrame?.formulaRealization
                    === coordinate.formulaRealization,
                sameSurface:
                    scalar.resultFrame?.surfaceRealization
                    === coordinate.surfaceRealization,
                coordinateValid:
                    ctx.isClassicalNahuatlVncParadigmCoordinateFrame(
                        coordinate
                    ),
            };
        })(),
        {
            scalarStatus: "authorized",
            planStatus: "authorized",
            coordinateStatus: "authorized",
            scalarFormula: "#0-0(mic-o-hua)0+c-0#",
            coordinateFormula: "#0-0(mic-o-hua)0+c-0#",
            scalarSurface: "micohuac",
            coordinateSurface: "micohuac",
            sameFormula: true,
            sameSurface: true,
            coordinateValid: true,
        }
    );

    return s;
}

module.exports = { run };
