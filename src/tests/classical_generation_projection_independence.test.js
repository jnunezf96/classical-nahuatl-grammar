"use strict";

const { createSuite } = require("./runner");

function buildMiquiPreterit(ctx, derivationMode) {
    const tiempo = "preterito";
    const pers1 = "";
    const pers2 = "";
    return ctx.executeNuclearClauseSurfaceRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode,
                derivationType: ctx.DERIVATION_TYPE.direct,
                voiceMode:
                    derivationMode === ctx.DERIVATION_MODE.nonactive
                        ? ctx.VOICE_MODE.passive
                        : ctx.VOICE_MODE.active,
                tiempo,
                posicionesFormula: {
                    pers1,
                    obj1: "",
                    tronco: "miqui",
                    pers2,
                    num2: pers2,
                    tiempo,
                },
            },
        },
        posicionesFormula: {
            pers1,
            obj1: "",
            tronco: "miqui",
            pers2,
            num2: pers2,
            tiempo,
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_generation_projection_independence");

    const typedFrame = ctx.buildGeneratedTypedMorphResultFrame({
        subjectPrefix: "ni",
        objectPrefix: "c-0",
        subjectSuffix: "t",
        predicateStem: "iht-a",
        morphologyInput: {
            subjectPrefix: "ni",
            objectPrefix: "c",
            subjectSuffix: "t",
            verb: "ihta",
        },
    });
    const hostileWrittenCarrierFrame = ctx.buildGeneratedTypedMorphResultFrame({
        subjectPrefix: "ni",
        objectPrefix: "c-0",
        subjectSuffix: "t",
        predicateStem: "iht-a",
        morphologyInput: {
            subjectPrefix: "FORGED-SUBJECT",
            objectPrefix: "FORGED-OBJECT",
            subjectSuffix: "FORGED-SUFFIX",
            verb: "FORGED-WRITTEN-STEM",
        },
    });
    s.eq(
        "Typed morph result gives formula and written projections independent inputs",
        {
            identity: typedFrame.semanticIdentity,
            formula: typedFrame.formulaProjectionInput,
            written: typedFrame.writtenProjectionInput,
            hostileFormula: hostileWrittenCarrierFrame.formulaProjectionInput,
            hostileWrittenVerb:
                hostileWrittenCarrierFrame.writtenProjectionInput.morphologyInput.verb,
            formulaStableAcrossHostileWrittenCarrier:
                JSON.stringify(typedFrame.formulaProjectionInput)
                === JSON.stringify(hostileWrittenCarrierFrame.formulaProjectionInput),
            formulaDerivedFromWritten:
                typedFrame.formulaDerivedFromWrittenProjection,
            writtenDerivedFromFormula:
                typedFrame.writtenDerivedFromFormulaProjection,
            writtenCarrierParsingAllowed:
                typedFrame.writtenCarrierParsingAllowedForFormula,
        },
        {
            identity: "ni|c-0|iht-a|t",
            formula: {
                kind: "generated-formula-projection-input",
                subjectPrefix: "ni",
                objectPrefix: "c-0",
                subjectSuffix: "t",
                predicateStem: "iht-a",
                sourceKind: "typed-morph-result",
                derivedFromWrittenProjection: false,
            },
            written: {
                kind: "generated-written-projection-input",
                morphologyInput: {
                    subjectPrefix: "ni",
                    objectPrefix: "c",
                    subjectSuffix: "t",
                    verb: "ihta",
                },
                sourceKind: "typed-morph-result",
                derivedFromFormulaProjection: false,
            },
            hostileFormula: {
                kind: "generated-formula-projection-input",
                subjectPrefix: "ni",
                objectPrefix: "c-0",
                subjectSuffix: "t",
                predicateStem: "iht-a",
                sourceKind: "typed-morph-result",
                derivedFromWrittenProjection: false,
            },
            hostileWrittenVerb: "FORGED-WRITTEN-STEM",
            formulaStableAcrossHostileWrittenCarrier: true,
            formulaDerivedFromWritten: false,
            writtenDerivedFromFormula: false,
            writtenCarrierParsingAllowed: false,
        }
    );

    const nominalTypedFrame = ctx.buildGeneratedTypedMorphResultFrame({
        predicateStem: "tla-mat-Ø-t-ā-ni",
        morphologyInput: {
            verb: "tlamatiāni",
        },
    });
    const nominalShell = {
        formulaEcho: "#Ø-Ø(tla-mat-Ø-t-ā-ni)Ø-Ø#",
        formulaSlots: {
            pers1Pers2: {
                prefix: "",
                suffix: "",
                displayPrefix: "Ø",
                displaySuffix: "Ø",
            },
            predicateStem: {
                stem: "tla-mat-Ø-t-ā-ni",
                formulaDisplayStem: "tla-mat-Ø-t-ā-ni",
                stateSlot: null,
            },
            num1Num2: {
                connector: "",
                displayConnector: "Ø-Ø",
            },
        },
        typedMorphResultFrame: nominalTypedFrame,
    };
    const nominalFrame = {
        operationId: "active-agentive-ni",
        family: "active-agentive",
        nominalKind: "agentivo",
        sourceStem: "mati",
    };
    const hostilePathRecords = [
        {
            surface: "tlamatiāni",
            paths: [
                {
                    formulaSlotKey: "pers1",
                    formulaMorph: "FORGED-PERS1",
                    surfaceValue: "FORGED-PERS1-SURFACE",
                },
                {
                    formulaSlotKey: "base",
                    formulaMorph: "FORGED-FORMULA-STEM",
                    surfaceValue: "FORGED-WRITTEN-STEM",
                },
            ],
            segments: [
                { role: "obj1", value: "FORGED-OBJECT" },
                { role: "tronco", value: "FORGED-STEM" },
                { role: "sufijoNominal", value: "FORGED-SUFFIX" },
            ],
        },
        {
            surface: "tlamatiānih",
            paths: [
                {
                    formulaSlotKey: "pers2",
                    formulaMorph: "FORGED-PERS2",
                    surfaceValue: "FORGED-PERS2-SURFACE",
                },
            ],
            segments: [
                { role: "poseedor", value: "FORGED-POSSESSOR" },
                { role: "tronco", value: "SECOND-FORGED-STEM" },
            ],
        },
    ];
    const nominalSourceFrame = ctx.buildGeneratedNominalFormulaSourceFrame(
        hostilePathRecords[0],
        {
            frame: nominalFrame,
            nuclearClauseShell: nominalShell,
        }
    );
    const nominalOperationFrame =
        ctx.buildGeneratedNominalFormulaOperationFrame(nominalSourceFrame);
    const nominalFormula = ctx.buildGeneratedNominalFormulaFromSurfacePath(
        hostilePathRecords[0],
        {
            frame: nominalFrame,
            nuclearClauseShell: nominalShell,
            sourceFrame: nominalSourceFrame,
            operationFrame: nominalOperationFrame,
        }
    );
    const nominalPairs = ctx.buildGeneratedNominalFormulaSurfacePairs({
        frame: nominalFrame,
        nuclearClauseShell: nominalShell,
        cnvFormulaSurfacePath: {
            pathsBySurface: hostilePathRecords,
        },
        sourceFormulaEcho: "CNV(mati)",
    });
    s.eq(
        "Nominal formula projection ignores every written path and segment carrier",
        {
            formula: nominalFormula,
            sourcePredicate: nominalSourceFrame.predicateStem,
            sourceProjection: nominalSourceFrame.formulaProjectionSource,
            sourceConsumesRenderedInput: nominalSourceFrame.consumesRenderedInput,
            sourceDerivedFromSurfacePath:
                nominalSourceFrame.formulaDerivedFromSurfacePath,
            writtenCarrierParsingAllowed:
                nominalSourceFrame.writtenCarrierParsingAllowed,
            pairSurfaces: nominalPairs.map((pair) => pair.surface),
            pairFormulas: nominalPairs.map((pair) => pair.targetFormulaEcho),
            poisonSurvivedInFormula: nominalPairs.some((pair) => (
                pair.targetFormulaEcho.includes("FORGED")
            )),
            pairSourcesAreTyped: nominalPairs.every((pair) => (
                pair.nominalFormulaSourceFrame.formulaProjectionSource
                    === "typed-nuclear-clause-shell"
                && pair.nominalFormulaSourceFrame.formulaDerivedFromSurfacePath
                    === false
            )),
        },
        {
            formula: "#Ø-Ø(tla-mat-Ø-t-ā-ni)Ø-Ø#",
            sourcePredicate: "tla-mat-Ø-t-ā-ni",
            sourceProjection: "typed-nuclear-clause-shell",
            sourceConsumesRenderedInput: false,
            sourceDerivedFromSurfacePath: false,
            writtenCarrierParsingAllowed: false,
            pairSurfaces: ["tlamatiāni", "tlamatiānih"],
            pairFormulas: [
                "#Ø-Ø(tla-mat-Ø-t-ā-ni)Ø-Ø#",
                "#Ø-Ø(tla-mat-Ø-t-ā-ni)Ø-Ø#",
            ],
            poisonSurvivedInFormula: false,
            pairSourcesAreTyped: true,
        }
    );

    const hostileNominalOperationFrame = {
        ...nominalOperationFrame,
        targetFrame: {
            ...nominalOperationFrame.targetFrame,
            formula: "#FORGED-FORMULA#",
        },
    };
    s.eq(
        "Nominal formula projection fails closed on a contradictory target frame",
        {
            mismatch: ctx.getGeneratedNominalFormulaFrameMismatch({
                pathRecord: hostilePathRecords[0],
                frame: nominalFrame,
                nuclearClauseShell: nominalShell,
                sourceFrame: nominalSourceFrame,
                operationFrame: hostileNominalOperationFrame,
            }),
            formula: ctx.buildGeneratedNominalFormulaFromSurfacePath(
                hostilePathRecords[0],
                {
                    frame: nominalFrame,
                    nuclearClauseShell: nominalShell,
                    sourceFrame: nominalSourceFrame,
                    operationFrame: hostileNominalOperationFrame,
                }
            ),
        },
        {
            mismatch: "generated-nominal-formula-contradictory-target-frame",
            formula: "",
        }
    );

    const nonactivePreterit = buildMiquiPreterit(
        ctx,
        ctx.DERIVATION_MODE.nonactive
    );
    s.eq(
        "Contextual written alternants and the exact LCM come independently from one typed morph result",
        {
            surface: nonactivePreterit.result,
            surfaceForms: nonactivePreterit.surfaceForms,
            formula: nonactivePreterit.nuclearClauseShell?.formulaEcho,
            predicate:
                nonactivePreterit.nuclearClauseShell?.slots?.predicateStem?.stem,
            typedPredicate:
                nonactivePreterit.typedMorphResultFrame
                    ?.formulaProjectionInput?.predicateStem,
            shellUsesResultTypedFrame:
                nonactivePreterit.nuclearClauseShell?.typedMorphResultFrame
                === nonactivePreterit.typedMorphResultFrame,
            oneProjectionSource:
                nonactivePreterit.formulaProjection?.sourceSemanticIdentity
                === nonactivePreterit.writtenProjection?.sourceSemanticIdentity,
            formulaProjection: nonactivePreterit.formulaProjection,
            writtenProjection: nonactivePreterit.writtenProjection,
            formulaDerivedFromWritten:
                nonactivePreterit.formulaDerivedFromWrittenProjection,
            writtenDerivedFromFormula:
                nonactivePreterit.writtenDerivedFromFormulaProjection,
            writtenCarrierParsingAllowed:
                nonactivePreterit.writtenCarrierParsingAllowedForFormula,
            obsoleteStemLeaked:
                /(?:mikiwa|mikihua|mikiwak|mikuwak)/u.test(
                    JSON.stringify({
                        surface: nonactivePreterit.result,
                        formula:
                            nonactivePreterit.nuclearClauseShell?.formulaEcho,
                    })
                ),
            selectedRule:
                nonactivePreterit.canonicalNonactiveStemFrame?.selectedRuleId,
            selectedOption:
                nonactivePreterit.canonicalNonactiveStemFrame?.selectedOptionId,
        },
        {
            surface: "micohuac",
            surfaceForms: ["micohuac"],
            formula: "#0-0(mic-o-hua)0+c-0#",
            predicate: "mic-o-hua",
            typedPredicate: "mic-o-hua",
            shellUsesResultTypedFrame: true,
            oneProjectionSource: true,
            formulaProjection: {
                kind: "generated-formula-projection",
                sourceKind: "generated-typed-morph-result-frame",
                sourceSemanticIdentity: "||mic-o-hua|",
                result: "#0-0(mic-o-hua)0+c-0#",
                derivedFromWrittenProjection: false,
            },
            writtenProjection: {
                kind: "generated-written-projection",
                sourceKind: "generated-typed-morph-result-frame",
                sourceSemanticIdentity: "||mic-o-hua|",
                result: "micohuac",
                surfaceForms: ["micohuac"],
                derivedFromFormulaProjection: false,
            },
            formulaDerivedFromWritten: false,
            writtenDerivedFromFormula: false,
            writtenCarrierParsingAllowed: false,
            obsoleteStemLeaked: false,
            selectedRule: "cn-l20-5-intransitive-final-qui",
            selectedOption: "o-hua:mic-o-hua",
        }
    );

    return s;
}

module.exports = { run };
