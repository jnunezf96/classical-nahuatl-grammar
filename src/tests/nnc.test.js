"use strict";

/**
 * Tests for src/core/nnc/nnc.mjs.
 * These cover verb-derived nominal outputs plus the explicit nominal nuclear clause API.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc");
    const summarizeOrdinaryNnc = (result) => {
        if (!result) {
            return result;
        }
        const summary = {
            supported: result.supported,
            result: result.result,
            surfaceForms: result.surfaceForms,
            stem: result.stem,
            state: result.state,
            nounClass: result.nounClass,
            animacy: result.animacy,
            number: result.number,
            pluralType: result.pluralType || undefined,
            subject: result.subject,
            possessor: result.possessor,
            diagnostics: result.diagnostics,
        };
        return summary;
    };
    const summarizeGeneratedOrdinaryNnc = (result) => {
        if (!result) {
            return result;
        }
        const summary = {
            generationRoute: result.generationRoute || "",
            supported: result.supported === true,
            result: result.result || "",
            surfaceForms: result.surfaceForms || [],
            stem: result.stem || "",
            state: result.state || "",
            nounClass: result.nounClass || "",
            animacy: result.animacy || "",
            number: result.number || "",
            pluralType: result.pluralType || undefined,
            subjectKey: result.subject ? result.subject.personSubKey : null,
            possessorPrefix: result.possessor ? result.possessor.prefix : null,
            diagnostics: result.diagnostics || [],
            isReflexive: result.isReflexive === true,
            stemProvenance: result.stemProvenance || null,
        };
        return summary;
    };
    const summarizeOrdinaryNncSet = (result) => result && ({
        supported: result.supported,
        stem: result.stem,
        nounClass: result.nounClass,
        animacy: result.animacy,
        entries: Array.isArray(result.entries)
            ? result.entries.map((entry) => {
                const summary = {
                    result: entry.result,
                    surfaceForms: entry.surfaceForms,
                    state: entry.state,
                    number: entry.number,
                    pluralType: entry.pluralType || undefined,
                    possessor: entry.possessor ? entry.possessor.prefix : null,
                };
                return summary;
            })
            : [],
        diagnostics: result.diagnostics,
        source: result.source,
    });
    const summarizeOrdinaryNncFixtureProbe = (result) => result && ({
        supported: result.supported,
        kind: result.kind,
        input: result.input,
        normalizedInput: result.normalizedInput,
        fixture: result.fixture,
        paradigmSet: summarizeOrdinaryNncSet(result.paradigmSet),
    });
    const buildSilentOrdinaryNncRequest = ({
        stem,
        state = "absolutive",
        number = "singular",
        pluralType = "auto",
        possessor = "",
        animacy = "",
        nounClass = "",
        possessionKind = "",
        stateCase = "",
        subjectPrefix = "",
        subjectSuffix = "",
        derivationMode = ctx.DERIVATION_MODE.active,
        voiceMode = ctx.VOICE_MODE.active,
        formulaSlots = null,
    }) => ({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tenseMode: ctx.TENSE_MODE.sustantivo,
                derivationMode,
                voiceMode,
                ordinaryNnc: {
                    enabled: true,
                    state,
                    number,
                    pluralType,
                    possessor,
                    animacy,
                    nounClass,
                    possessionKind,
                    stateCase,
                    ...(formulaSlots ? { formulaSlots } : {}),
                },
            },
        },
        posicionesFormula: {
            pers1: subjectPrefix,
            obj1: "",
            tronco: stem,
            pers2: subjectSuffix,
            num2: subjectSuffix,
            poseedor: possessor,
            tiempo: "ordinary-nnc",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });

    const retiredLessons3539Lane = [
        "getInstrumentivoResult",
        "getCalificativoInstrumentivoResult",
        "getLocativoTemporalResult",
    ];
    s.eq(
        "obsolete Lessons 35-39 noun-tense helpers are absent from the canonical runtime",
        retiredLessons3539Lane.map((name) => [name, typeof ctx[name]]),
        retiredLessons3539Lane.map((name) => [name, "undefined"])
    );
    const canonicalDeverbalNnc = ctx.requestClassicalDeverbalNncResult({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        source: {
            sourceStage: "preterit-predicate",
            sourceStem: "pix-ca",
            verbClass: "A",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: "3sg",
        state: "absolutive",
    });
    s.eq(
        "Lessons 35-39 behavior uses the canonical deverbal NNC application route",
        {
            status: canonicalDeverbalNnc.authorizationStatus,
            formula: canonicalDeverbalNnc.formulaRealization,
            word: canonicalDeverbalNnc.wordSurface,
            targetEvaluator: canonicalDeverbalNnc.canonicalTargetEvaluator,
        },
        {
            status: "authorized",
            formula: "#0-0(pix-ca-0)c-0#",
            word: "pixcac",
            targetEvaluator: "buildClassicalNahuatlNncSlotFrame",
        }
    );

    const canvasLesson12Cihuatl = ctx.generateOrdinaryNncParadigm({
        stem: "cihuā",
        nounClass: "tl",
        animacy: "animate",
        state: "absolutive",
        number: "singular",
    });
    const canvasLesson12CihuatlSet = ctx.generateOrdinaryNncParadigmSet({
        stem: "cihuā",
        nounClass: "tl",
        animacy: "animate",
        states: ["absolutive"],
        numbers: ["singular"],
    });
    const formulaPoisonedCihuatl = ctx.generateOrdinaryNncParadigm({
        stem: "cihuā",
        nounClass: "tl",
        animacy: "animate",
        state: "absolutive",
        number: "singular",
        formulaSlots: {
            predicateStem: { stem: "poison" },
            num1Num2: { connector: "zero" },
        },
        formulaEcho: "#Ø-Ø(poison)Ø#",
    });
    s.eq(
        "Andrews 12.4 cihuātl uses typed Source, licensed realization, independent LCM, and one Classical GCD",
        {
            supported: canvasLesson12Cihuatl.supported,
            result: canvasLesson12Cihuatl.result,
            surfaces: canvasLesson12Cihuatl.surfaceForms,
            formula: canvasLesson12Cihuatl.formulaRecord?.formula || "",
            sourceKind: canvasLesson12Cihuatl.ordinaryNncAbsolutiveSingularSourceFrames?.[0]?.kind || "",
            sourceStem: canvasLesson12Cihuatl.ordinaryNncAbsolutiveSingularSourceFrames?.[0]?.sourceStem || "",
            operationId: canvasLesson12Cihuatl.ordinaryNncAbsolutiveSingularOperationFrames?.[0]?.operationId || "",
            formulaSegments: canvasLesson12Cihuatl.formulaRealizationRecord?.segmentFrames?.map((frame) => [frame.slot, frame.formulaValue, frame.surface]) || [],
            scalarSetEquivalent: canvasLesson12CihuatlSet.entries?.[0]?.result === canvasLesson12Cihuatl.result,
            literalModernSpelling: /[wk]/iu.test([canvasLesson12Cihuatl.result, ...(canvasLesson12Cihuatl.surfaceForms || [])].join(" ")),
        },
        {
            supported: true,
            result: "cihuātl",
            surfaces: ["cihuātl"],
            formula: "#Ø-Ø(cihuā)tl-Ø#",
            sourceKind: "ordinary-nnc-absolutive-singular-source-frame",
            sourceStem: "cihuā",
            operationId: "ordinary-nnc-absolutive-singular-realization",
            formulaSegments: [["STEM", "cihuā", "cihuā"], ["num1-num2", "tl", "tl"]],
            scalarSetEquivalent: true,
            literalModernSpelling: false,
        }
    );
    s.eq(
        "ordinary NNC rejects raw and nested formula carriers as generation authority",
        {
            supported: formulaPoisonedCihuatl.supported,
            result: formulaPoisonedCihuatl.result,
            diagnostic: formulaPoisonedCihuatl.diagnostics?.[0]?.id || "",
        },
        {
            supported: false,
            result: "",
            diagnostic: "ordinary-nnc-authority-carrier-rejected",
        }
    );
    const outputSetCarrierRequest = buildSilentOrdinaryNncRequest({
        stem: "cihuā",
        nounClass: "tl",
        animacy: "animate",
        state: "absolutive",
        number: "singular",
    });
    outputSetCarrierRequest.options.override.ordinaryNnc.outputSet = "documentary-row-set";
    const outputSetCarrierResult = ctx.executeNuclearClauseSurfaceRequest(outputSetCarrierRequest);
    s.eq(
        "ordinary NNC rejects caller-selected output sets instead of opening a parallel result lane",
        {
            supported: outputSetCarrierResult.supported,
            result: outputSetCarrierResult.result,
            diagnostic: outputSetCarrierResult.diagnostics?.[0]?.id || "",
            authorityCarrierKeys: outputSetCarrierResult.authorityCarrierKeys,
        },
        {
            supported: false,
            result: "—",
            diagnostic: "retired-ordinary-nnc-generation-carrier-forbidden",
            authorityCarrierKeys: undefined,
        }
    );

    s.eq("ordinary NNC direct helper is exported", typeof ctx.generateOrdinaryNncParadigm, "function");
    const issuedCurrentRegexOperation = ctx.buildCurrentRegexParseOperationFrameFromRawInput("(nemi)");
    const issuedEntradaGrammarObject = ctx.buildEntradaGrammarObjectFromCurrentRegexParseOperationFrame(
        "(nemi)",
        issuedCurrentRegexOperation
    );
    const copiedFormulaEntradaGrammarObject = {
        ...issuedEntradaGrammarObject,
        valenceFrame: { ...issuedEntradaGrammarObject.valenceFrame, frameFixed: true },
        objectFrame: { ...issuedEntradaGrammarObject.objectFrame, frameFixed: true },
        formulaBoundaryFrame: {
            ...issuedEntradaGrammarObject.formulaBoundaryFrame,
            frameFixed: true,
            valenceFrameFixed: true,
            formulaEvidencePresent: true,
            objectSlotsCovered: true,
            sourceFormulaSlots: { obj1: { token: "qui" } },
            sourceFormulaEcho: "#Ø-qui(nemi)Ø#",
        },
    };
    const issuedTypedSourceGate = ctx.buildFunctionUseValenceObjectHardGate({
        entradaGrammarObject: issuedEntradaGrammarObject,
        sourceKind: "verbal-nuclear-clause",
        currentVector: {},
    });
    const rawFormulaGate = ctx.buildFunctionUseValenceObjectHardGate({
        sourceKind: "verbal-nuclear-clause",
        currentVector: { obj1: "qui" },
        sourceFormulaSlots: { obj1: { token: "qui" } },
    });
    const nestedFormulaGate = ctx.buildFunctionUseValenceObjectHardGate({
        sourceKind: "verbal-nuclear-clause",
        currentVector: { obj1: "qui" },
        sourceFrame: {
            formulaSlots: { obj1: { token: "qui" } },
            nuclearClauseFrame: { formulaSlots: { obj1: { token: "qui" } } },
        },
    });
    const copiedFormulaGate = ctx.buildFunctionUseValenceObjectHardGate({
        entradaGrammarObject: copiedFormulaEntradaGrammarObject,
        sourceKind: "verbal-nuclear-clause",
        currentVector: {},
    });
    s.eq(
        "function-use valence accepts an issued typed Source operation and rejects raw, nested, and copied formula authority",
        {
            issued: {
                status: issuedTypedSourceGate.status,
                fixed: issuedTypedSourceGate.valenceFrameFixed,
                issued: ctx.isIssuedEntradaGrammarObject(issuedEntradaGrammarObject),
            },
            raw: {
                status: rawFormulaGate.status,
                reason: rawFormulaGate.reason,
                formulaEvidence: rawFormulaGate.hasFormulaEvidence,
                formulaAuthorizesValence: rawFormulaGate.formulaEvidenceAuthorizesValence,
                formulaValence: rawFormulaGate.hasFormulaValence,
                fixed: rawFormulaGate.valenceFrameFixed,
            },
            nested: {
                status: nestedFormulaGate.status,
                reason: nestedFormulaGate.reason,
                formulaEvidence: nestedFormulaGate.hasFormulaEvidence,
                formulaAuthorizesValence: nestedFormulaGate.formulaEvidenceAuthorizesValence,
                formulaValence: nestedFormulaGate.hasFormulaValence,
                fixed: nestedFormulaGate.valenceFrameFixed,
            },
            copied: {
                status: copiedFormulaGate.status,
                reason: copiedFormulaGate.reason,
                issued: ctx.isIssuedEntradaGrammarObject(copiedFormulaEntradaGrammarObject),
                fixed: copiedFormulaGate.valenceFrameFixed,
            },
        },
        {
            issued: { status: "pass", fixed: true, issued: true },
            raw: {
                status: "blocked",
                reason: "function-use-would-invent-valence-object",
                formulaEvidence: true,
                formulaAuthorizesValence: false,
                formulaValence: false,
                fixed: false,
            },
            nested: {
                status: "blocked",
                reason: "function-use-would-invent-valence-object",
                formulaEvidence: true,
                formulaAuthorizesValence: false,
                formulaValence: false,
                fixed: false,
            },
            copied: {
                status: "blocked",
                reason: "function-use-source-valence-frame-unfixed",
                issued: false,
                fixed: false,
            },
        }
    );

    s.eq(
        "ordinary NNC noun-class contract exposes one Classical inventory",
        {
            kind: ctx.ORDINARY_NNC_NOUN_CLASS_CONTRACT.kind,
            language: ctx.ORDINARY_NNC_NOUN_CLASS_CONTRACT.language,
            values: ctx.ORDINARY_NNC_NOUN_CLASS_CONTRACT.values,
            liAlias: ctx.normalizeOrdinaryNncNounClass("li"),
            retiredTiAlias: ctx.normalizeOrdinaryNncNounClass("ti"),
            manuallyWrittenFormulaAuthority:
                ctx.ORDINARY_NNC_NOUN_CLASS_CONTRACT.manuallyWrittenFormulaAuthority,
        },
        {
            kind: "classical-ordinary-nnc-noun-class-vocabulary",
            language: "classical-nahuatl",
            values: ["tl", "tli", "in", "zero"],
            liAlias: "tli",
            retiredTiAlias: "",
            manuallyWrittenFormulaAuthority: false,
        }
    );
    s.eq(
        "ordinary NNC noun-class inventory audit rejects a poisoned carrier",
        [
            ctx.buildOrdinaryNncNounClassControlInventoryValidationFrame({
                controlValues: ["tl", "tli", "in", "zero"],
                ledgerValues: ["tl", "tli", "in", "zero"],
            }),
            ctx.buildOrdinaryNncNounClassControlInventoryValidationFrame({
                controlValues: ["tl", "tli", "fabricated", "zero"],
                ledgerValues: ["tl", "tli", "in", "zero"],
            }),
        ].map((frame) => [frame.authorizationStatus, frame.controlsMatch, frame.ledgerMatches]),
        [
            ["authorized", true, true],
            ["blocked", false, true],
        ]
    );
    s.eq(
        "invalid explicit ordinary NNC class cannot inherit zero or fixture authority",
        [
            ctx.generateOrdinaryNncParadigm({ stem: "nemi", nounClass: "fabricated" }),
            ctx.generateOrdinaryNncParadigm({ stem: "mistun", nounClass: "fabricated" }),
        ].map((result) => ({
            supported: result.supported,
            result: result.result,
            nounClass: result.nounClass,
            diagnosticIds: result.diagnostics.map((entry) => entry.id),
        })),
        [
            { supported: false, result: "", nounClass: "fabricated", diagnosticIds: ["ordinary-nnc-noun-class-not-recognized"] },
            { supported: false, result: "", nounClass: "fabricated", diagnosticIds: ["ordinary-nnc-noun-class-not-recognized"] },
        ]
    );
    s.eq(
        "manually written ordinary NNC formula cannot manufacture zero-class authority",
        (() => {
            const result = ctx.generateOrdinaryNncParadigm({ stem: "(nemi)" });
            return {
                supported: result.supported,
                result: result.result,
                diagnosticIds: result.diagnostics.map((entry) => entry.id),
            };
        })(),
        {
            supported: false,
            result: "",
            diagnosticIds: ["ordinary-nnc-legacy-formula-string-blocked"],
        }
    );

    return s;
}

module.exports = { run };
