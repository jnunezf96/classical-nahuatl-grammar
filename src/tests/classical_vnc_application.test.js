"use strict";

const { createSuite } = require("./runner");

function summarizeApplicationFrame(frame = {}) {
    return {
        status: frame.authorizationStatus,
        reason: frame.blockReason,
        requestedVoice: frame.controlFrame?.requestedVoice,
        selectedVoice: frame.controlFrame?.selectedVoice,
        selectedVoiceOperation: frame.controlFrame?.selectedVoiceOperation,
        selectedNonactiveOptionId: frame.controlFrame?.selectedNonactiveOptionId,
        accepted: frame.controlFrame?.requestedVoiceAccepted,
        normalization: frame.controlFrame?.voiceNormalizationReason,
        formula: frame.resultFrame?.formulaRealization,
        finalKind: frame.resultFrame?.finalTypedVncSlotFrame?.kind || "",
        selectedKind: frame.resultFrame?.selectedMachineryFrame?.kind || "",
        selectedStatus: frame.resultFrame?.selectedMachineryFrame?.authorizationStatus || "",
        appliedKinds: (frame.resultFrame?.appliedTypedFrames || []).map((typedFrame) => typedFrame.kind),
    };
}

function findNestedFrameByKind(value, expectedKind, seen = new Set()) {
    if (!value || typeof value !== "object" || seen.has(value)) {
        return null;
    }
    seen.add(value);
    if (value.kind === expectedKind) {
        return value;
    }
    for (const child of Object.values(value)) {
        const found = findNestedFrameByKind(child, expectedKind, seen);
        if (found) {
            return found;
        }
    }
    return null;
}

function selectApplicationDerivationOption(application, request, targetStem) {
    const preview = application.evaluate({ ...request, derivationOptionId: "" });
    const inventory = preview.controlFrame?.derivationOptionInventory || null;
    const option = (inventory?.options || []).find(candidate => candidate.targetStem === targetStem) || null;
    return { inventory, option, preview };
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_application");
    const {
        CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES,
        buildClassicalNahuatlVncDerivationExplanationProjection,
        buildClassicalNahuatlVncSourceConstitutionProjection,
        createClassicalNahuatlVncApplication,
        evaluateClassicalNahuatlVncApplication,
        getDefaultGrammarContractRegistry,
        getGrammarContractDefinition,
        inspectRegisteredGrammarContract,
    } = ctx;

    s.eq(
        "Lesson 8 optional on plus itta contraction remains a typed public application choice and reaches the finite result",
        (() => {
            const frame = createClassicalNahuatlVncApplication(ctx).evaluate({
                sourceStem: "(itt-a)",
                verbClass: "A",
                sourceValence: "specific-projective",
                objectPerson: "3sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "direct",
                requestedVoice: "active",
                sentenceOptions: {
                    directionalPrefix: "on",
                    directionalIttaContraction: "rare",
                },
            });
            const operation = frame.resultFrame?.selectedMachineryFrame
                ?.proofFrame?.conclusion?.finalBoundaryRealizationFrame
                ?.directionalStemOperationEvaluationFrame;
            return {
                status: frame.authorizationStatus,
                normalizedChoice: frame.normalizedRequest
                    ?.sentenceOptions?.directionalIttaContraction,
                operationStatus: operation?.authorizationStatus,
                operationId: operation?.operationId,
                formula: frame.resultFrame?.formulaRealization,
                surface: frame.resultFrame?.surfaceRealization,
            };
        })(),
        {
            status: "authorized",
            normalizedChoice: "rare",
            operationStatus: "authorized",
            operationId: "optional-on-itta-directional-contraction",
            formula: "#no-0+c-0+o(tt-a)0+0-0#",
            surface: "nocotta",
        }
    );

    s.eq(
        "Unknown derivation intent is retained diagnostically and cannot authorize a Direct result",
        (() => {
            const frame = createClassicalNahuatlVncApplication(ctx).evaluate({
                sourceStem: "nemi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                requestedDerivation: "fabricated-derivation",
                requestedVoice: "active",
            });
            return {
                status: frame.authorizationStatus,
                reason: frame.blockReason,
                requested: frame.normalizedRequest.requestedDerivation,
                safeLayoutType: frame.normalizedRequest.derivationType,
                recognized: frame.normalizedRequest.requestedDerivationRecognized,
                selectionStatus: frame.normalizedRequest.derivationTypeSelectionFrame.authorizationStatus,
                accepted: frame.controlFrame.requestedDerivationAccepted,
                formula: frame.resultFrame.formulaRealization,
                surface: frame.resultFrame.surfaceRealization,
                selected: frame.resultFrame.selectedMachineryFrame,
            };
        })(),
        {
            status: "blocked",
            reason: "classical-vnc-derivation-type-not-recognized",
            requested: "fabricated-derivation",
            safeLayoutType: "direct",
            recognized: false,
            selectionStatus: "blocked",
            accepted: false,
            formula: "",
            surface: "",
            selected: null,
        }
    );

    s.eq(
        "Unknown target and causative-source voice intents cannot authorize Active results",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const summarize = frame => ({
                status: frame.authorizationStatus,
                reason: frame.blockReason,
                requestedTarget: frame.normalizedRequest.requestedVoice,
                targetRecognized: frame.normalizedRequest.requestedVoiceRecognized,
                targetSelectionStatus: frame.normalizedRequest.targetVoiceSelectionFrame.authorizationStatus,
                requestedSource: frame.normalizedRequest.requestedSourceVoice,
                sourceRecognized: frame.normalizedRequest.requestedSourceVoiceRecognized,
                sourceSelectionStatus: frame.normalizedRequest.sourceVoiceSelectionFrame.authorizationStatus,
                selectedTarget: frame.controlFrame.selectedVoice,
                selectedSource: frame.controlFrame.selectedSourceVoice,
                formula: frame.resultFrame.formulaRealization,
                surface: frame.resultFrame.surfaceRealization,
            });
            return {
                target: summarize(application.evaluate({
                    sourceStem: "nemi",
                    verbClass: "B",
                    sourceValence: "intransitive",
                    requestedVoice: "fabricated-target-voice",
                })),
                source: summarize(application.evaluate({
                    sourceStem: "nemi",
                    verbClass: "B",
                    sourceValence: "intransitive",
                    sourceVoice: "fabricated-source-voice",
                    requestedVoice: "active",
                })),
            };
        })(),
        {
            target: {
                status: "blocked",
                reason: "classical-vnc-target-voice-not-recognized",
                requestedTarget: "fabricated-target-voice",
                targetRecognized: false,
                targetSelectionStatus: "blocked",
                requestedSource: "active",
                sourceRecognized: true,
                sourceSelectionStatus: "authorized",
                selectedTarget: "active",
                selectedSource: "active",
                formula: "",
                surface: "",
            },
            source: {
                status: "blocked",
                reason: "classical-vnc-causative-source-voice-not-recognized",
                requestedTarget: "active",
                targetRecognized: true,
                targetSelectionStatus: "authorized",
                requestedSource: "fabricated-source-voice",
                sourceRecognized: false,
                sourceSelectionStatus: "blocked",
                selectedTarget: "active",
                selectedSource: "active",
                formula: "",
                surface: "",
            },
        }
    );

    s.eq(
        "Ordered Voice consumes an issued VNC application and owns its exact finite Result",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const base = application.evaluate({
                sourceStem: "yohua",
                verbClass: "A",
                sourceValence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "direct",
                requestedVoice: "impersonal",
                nonactiveOptionId: "inherent-impersonal",
            });
            const operations = [
                "inherent-impersonal",
                "tla-impersonal",
                "nonactive-lō",
            ];
            const ordered =
                ctx.buildClassicalNahuatlOrderedVoiceVncApplicationFrame(
                    base,
                    { operations }
                );
            const sentence =
                ctx.buildClassicalNahuatlVncSentenceResultFrame(ordered);
            const poisoned =
                ctx.buildClassicalNahuatlOrderedVoiceVncApplicationFrame(
                    base,
                    {
                        operations,
                        formula: "FORGED-FORMULA",
                        surface: "FORGED-SURFACE",
                        resultFrame: {
                            formulaRealization: "FORGED-RESULT",
                        },
                        state: {
                            selectedFormula: "FORGED-STATE",
                        },
                    }
                );
            const copiedBase =
                ctx.buildClassicalNahuatlOrderedVoiceVncApplicationFrame(
                    { ...base },
                    { operations }
                );
            return {
                status: ordered.authorizationStatus,
                valid:
                    ctx.isClassicalNahuatlOrderedVoiceVncApplicationFrame(
                        ordered
                    ),
                target: ordered.voiceLayerChainFrame?.targetStem,
                selectedKind: ordered.selectedMachineryFrame?.kind,
                formula: ordered.formulaRealization,
                surface: ordered.surfaceRealization,
                finiteIdentity:
                    ordered.finiteSurfaceFrame?.machineryFrame
                    === ordered.selectedMachineryFrame,
                sentenceStatus: sentence.authorizationStatus,
                sentenceFormula: sentence.sentenceFormulaDisplay,
                sentenceSurface: sentence.sentenceSurfaceDisplay,
                sentenceValid:
                    ctx.isClassicalNahuatlVncSentenceResultFrame(sentence),
                poisonStatus: poisoned.authorizationStatus,
                poisonReason: poisoned.blockReason,
                poisonRejected: poisoned.rejectedAuthorityFields,
                poisonStringsAbsent:
                    !JSON.stringify(poisoned).includes("FORGED-"),
                copiedStatus: copiedBase.authorizationStatus,
                copiedReason: copiedBase.blockReason,
            };
        })(),
        {
            status: "authorized",
            valid: true,
            target: "tla-yohua-lō",
            selectedKind:
                "classical-nahuatl-ordered-voice-layer-vnc-machinery-frame",
            formula: "#0-0(tla-yohua-lo)0+0-0#",
            surface: "tlayohualo",
            finiteIdentity: true,
            sentenceStatus: "authorized",
            sentenceFormula: "#0-0(tla-yohua-lo)0+0-0#",
            sentenceSurface: "tlayohualo",
            sentenceValid: true,
            poisonStatus: "blocked",
            poisonReason: "classical-ordered-voice-caller-authority-rejected",
            poisonRejected: ["formula", "surface", "resultFrame", "state"],
            poisonStringsAbsent: true,
            copiedStatus: "blocked",
            copiedReason: "canonical-issued-vnc-application-frame-required",
        }
    );

    s.eq(
        "Output scope cannot mutate or block the completed Grammar predicate",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "2pl",
                objectPerson: "1sg",
                requestedVoice: "passive",
            };
            const absent = application.evaluate(request);
            const single = application.evaluate({ ...request, outputScope: "single" });
            const paradigm = application.evaluate({ ...request, outputScope: "paradigm" });
            const malformed = application.evaluate({ ...request, outputScope: "fabricated-scope" });
            const summarize = frame => ({
                status: frame.authorizationStatus,
                reason: frame.blockReason,
                requested: frame.normalizedRequest.requestedOutputScope,
                scope: frame.normalizedRequest.outputScope,
                scopeStatus: frame.normalizedRequest.outputScopeSelectionFrame.authorizationStatus,
                selectedVoice: frame.controlFrame.selectedVoice,
                formulaPresent: Boolean(frame.resultFrame.formulaRealization),
            });
            return {
                absent: summarize(absent),
                single: summarize(single),
                paradigm: summarize(paradigm),
                malformed: summarize(malformed),
            };
        })(),
        {
            absent: { status: "authorized", reason: "", requested: "", scope: "single", scopeStatus: "authorized", selectedVoice: "passive", formulaPresent: true },
            single: { status: "authorized", reason: "", requested: "single", scope: "single", scopeStatus: "authorized", selectedVoice: "passive", formulaPresent: true },
            paradigm: { status: "authorized", reason: "", requested: "paradigm", scope: "paradigm", scopeStatus: "authorized", selectedVoice: "passive", formulaPresent: true },
            malformed: { status: "authorized", reason: "", requested: "fabricated-scope", scope: "", scopeStatus: "blocked", selectedVoice: "passive", formulaPresent: true },
        }
    );

    s.eq(
        "Source constitution projects the typed Andrews cual-ā-ni analysis before derivation",
        (() => {
            const projection = buildClassicalNahuatlVncSourceConstitutionProjection({
                sourceStem: "(cual-ā-ni)",
                sourceValence: "intransitive",
                verbClass: "B",
                derivationType: "direct",
            }, ctx);
            const unlicensedHyphens = buildClassicalNahuatlVncSourceConstitutionProjection({
                sourceStem: "tom-a",
                sourceValence: "intransitive",
                verbClass: "B",
                derivationType: "direct",
            }, ctx);
            return {
                role: projection?.frameRole || "",
                status: projection?.authorizationStatus || "",
                stem: projection?.sourceStem || "",
                parts: (projection?.parts || []).map(part => [part.segment, part.role]),
                authority: projection?.grammarAuthority,
                unlicensedHyphens,
            };
        })(),
        {
            role: "classical-nahuatl-vnc-source-constitution-projection",
            status: "authorized",
            stem: "cual-ā-ni",
            parts: [["cual", "root"], ["ā", "stock formative"], ["ni", "stem formative"]],
            authority: false,
            unlicensedHyphens: null,
        }
    );

    s.eq(
        "The empty Source display sentinel cannot enter finite VNC machinery",
        buildClassicalNahuatlVncSourceConstitutionProjection({
            sourceStem: "_",
            sourceValence: "intransitive",
            verbClass: "B",
            derivationType: "direct",
        }, ctx),
        null
    );

    s.eq(
        "The application service declares every grammar dependency and fails closed when any are absent",
        (() => {
            const available = createClassicalNahuatlVncApplication(ctx);
            const unavailable = createClassicalNahuatlVncApplication({});
            const blocked = unavailable.evaluate({
                sourceStem: "chihua",
                sourceValence: "specific-projective",
                requestedVoice: "passive",
            });
            return {
                available: [available.authorizationStatus, available.missingCapabilities],
                unavailable: [unavailable.authorizationStatus, unavailable.missingCapabilities],
                blocked: {
                    status: blocked.authorizationStatus,
                    reason: blocked.blockReason,
                    selectedVoice: blocked.controlFrame.selectedVoice,
                    allowedVoices: blocked.controlFrame.allowedVoices,
                    formula: blocked.resultFrame.formulaRealization,
                },
            };
        })(),
        {
            available: ["authorized", []],
            unavailable: ["blocked", CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES],
            blocked: {
                status: "blocked",
                reason: "classical-vnc-application-required-capabilities-unavailable",
                selectedVoice: "active",
                allowedVoices: ["active"],
                formula: "",
            },
        }
    );

    s.eq(
        "One DOM-free boundary keeps three public voices while orchestrating every authorized impersonal formation",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const passive = application.evaluate({
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "2pl",
                objectPerson: "1sg",
                requestedVoice: "passive",
            });
            const impersonal = application.evaluate({
                sourceStem: "mayāna",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3pl",
                requestedVoice: "impersonal",
                nonactiveOptionId: "lō:mayāna-lō",
            });
            const inherent = application.evaluate({
                sourceStem: "tōna",
                verbClass: "A",
                sourceValence: "intransitive",
                subject: "1sg",
                requestedVoice: "impersonal",
                nonactiveOptionId: "inherent-impersonal",
            });
            const tla = application.evaluate({
                sourceStem: "nēci",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "2pl",
                requestedVoice: "impersonal",
                nonactiveOptionId: "tla-impersonal",
            });
            return {
                passive: summarizeApplicationFrame(passive),
                impersonal: summarizeApplicationFrame(impersonal),
                inherent: summarizeApplicationFrame(inherent),
                tla: summarizeApplicationFrame(tla),
            };
        })(),
        {
            passive: {
                status: "authorized",
                reason: "",
                requestedVoice: "passive",
                selectedVoice: "passive",
                selectedVoiceOperation: "passive",
                selectedNonactiveOptionId: "lō:chihua-lō",
                accepted: true,
                normalization: "",
                formula: "#ni-0(chihua-lo)0+0-0#",
                finalKind: "classical-nahuatl-vnc-slot-frame",
                selectedKind: "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame",
                selectedStatus: "authorized",
                appliedKinds: [
                    "classical-nahuatl-vnc-derivation-source-analysis",
                    "classical-nahuatl-nonactive-vnc-nonactive-stem-record",
                    "classical-nahuatl-passive-vnc-passive-transformation-frame",
                ],
            },
            impersonal: {
                status: "authorized",
                reason: "",
                requestedVoice: "impersonal",
                selectedVoice: "impersonal",
                selectedVoiceOperation: "impersonal",
                selectedNonactiveOptionId: "lō:mayāna-lō",
                accepted: true,
                normalization: "",
                formula: "#0-0(mayāna-lo)0+0-0#",
                finalKind: "classical-nahuatl-vnc-slot-frame",
                selectedKind: "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame",
                selectedStatus: "authorized",
                appliedKinds: [
                    "classical-nahuatl-vnc-derivation-source-analysis",
                    "classical-nahuatl-nonactive-vnc-nonactive-stem-record",
                    "classical-nahuatl-impersonal-vnc-impersonal-transformation-frame",
                ],
            },
            inherent: {
                status: "authorized",
                reason: "",
                requestedVoice: "impersonal",
                selectedVoice: "impersonal",
                selectedVoiceOperation: "inherent-impersonal",
                selectedNonactiveOptionId: "inherent-impersonal",
                accepted: true,
                normalization: "inherent-impersonal-source-fixes-public-voice",
                formula: "#0-0(tōna)0+0-0#",
                finalKind: "classical-nahuatl-vnc-slot-frame",
                selectedKind: "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame",
                selectedStatus: "authorized",
                appliedKinds: [
                    "classical-nahuatl-vnc-derivation-source-analysis",
                    "classical-nahuatl-impersonal-vnc-inherent-impersonal-record",
                    "classical-nahuatl-impersonal-vnc-inherent-impersonal-transformation-frame",
                ],
            },
            tla: {
                status: "authorized",
                reason: "",
                requestedVoice: "impersonal",
                selectedVoice: "impersonal",
                selectedVoiceOperation: "tla-impersonal",
                selectedNonactiveOptionId: "tla-impersonal",
                accepted: true,
                normalization: "",
                formula: "#0-0(tla-nēci)0+0-0#",
                finalKind: "classical-nahuatl-vnc-slot-frame",
                selectedKind: "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame",
                selectedStatus: "authorized",
                appliedKinds: [
                    "classical-nahuatl-vnc-derivation-source-analysis",
                    "classical-nahuatl-impersonal-vnc-tla-impersonal-stem-record",
                    "classical-nahuatl-impersonal-vnc-tla-impersonal-transformation-frame",
                ],
            },
        }
    );

    s.eq(
        "Class B intransitive final tza reaches impersonal application without becoming x",
        (() => {
            const frame = createClassicalNahuatlVncApplication(ctx).evaluate({
                sourceStem: "oh-quetza",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                requestedVoice: "impersonal",
            });
            return {
                status: frame.authorizationStatus,
                selectedVoice: frame.controlFrame?.selectedVoice,
                nonactiveStem: frame.resultFrame?.selectedMachineryFrame?.nonactiveStemRecord?.nonactiveStem,
                formula: frame.resultFrame?.formulaRealization,
            };
        })(),
        {
            status: "authorized",
            selectedVoice: "impersonal",
            nonactiveStem: "oh-quetz-o-hua",
            formula: "#0-0(oh-quetz-o-hua)0+0-0#",
        }
    );

    s.eq(
        "A recognized but unavailable target voice fails closed instead of silently authorizing Active",
        summarizeApplicationFrame(createClassicalNahuatlVncApplication(ctx).evaluate({
            sourceStem: "mayāna",
            verbClass: "B",
            sourceValence: "intransitive",
            subject: "3sg",
            requestedVoice: "passive",
        })),
        {
            status: "blocked",
            reason: "classical-vnc-target-voice-not-authorized-for-source",
            requestedVoice: "passive",
            selectedVoice: "active",
            selectedVoiceOperation: "active",
            selectedNonactiveOptionId: "",
            accepted: false,
            normalization: "requested-voice-not-authorized-for-source",
            formula: "",
            finalKind: "",
            selectedKind: "",
            selectedStatus: "",
            appliedKinds: [],
        }
    );

    s.eq(
        "Lesson 11.3.1 direct compounds authorize passive only after the typed compound has supplied its canonical class and object structure",
        (() => {
            const frame = createClassicalNahuatlVncApplication(ctx).evaluate({
                sourceStem: "ahco-cui",
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "1sg",
                objectPerson: "3sg",
                mood: "indicative",
                tense: "preterit",
                requestedVoice: "passive",
            });
            return {
                status: frame.authorizationStatus,
                reason: frame.blockReason,
                selectedVoice: frame.controlFrame.selectedVoice,
                normalization: frame.controlFrame.voiceNormalizationReason,
                targetClass: frame.normalizedRequest.targetClass,
                formula: frame.resultFrame.formulaRealization,
                stem: frame.resultFrame.finalTypedVncSlotFrame?.slots?.predicate?.stem || "",
                nonactiveApplied: frame.resultFrame.appliedTypedFrames.some((typedFrame) => typedFrame.kind === "classical-nahuatl-nonactive-vnc-nonactive-stem-record"),
            };
        })(),
        {
            status: "authorized",
            reason: "",
            selectedVoice: "passive",
            normalization: "",
            targetClass: "B",
            formula: "#0-0(ahco-c-ō)0+c-0#",
            stem: "ahco-c-ō",
            nonactiveApplied: true,
        }
    );

    s.eq(
        "Direct application preserves the Lesson 11 typed paradigm member through selected Result",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const generalPast = application.evaluate({
                sourceStem: "(nemi)",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "general-past",
                derivationType: "direct",
                requestedVoice: "active",
            });
            return {
                status: generalPast.authorizationStatus,
                source: generalPast.normalizedRequest.sourceStem,
                selectedStem: generalPast.resultFrame.finalTypedVncSlotFrame?.slots?.predicate?.stem || "",
                semanticTense: generalPast.resultFrame.sourceMachineryFrame?.lesson11ParadigmPlan?.requestedSemanticTense || "",
                morphologicalTense: generalPast.resultFrame.sourceMachineryFrame?.lesson11ParadigmPlan?.morphologicalTense || "",
                formula: generalPast.resultFrame.formulaRealization,
                surface: generalPast.resultFrame.surfaceRealization,
            };
        })(),
        {
            status: "authorized",
            source: "nemi",
            selectedStem: "nen",
            semanticTense: "general-past",
            morphologicalTense: "distant-past",
            formula: "#0-0(nen)ca+0-0#",
            surface: "nenca",
        }
    );

    s.eq(
        "Ambiguous nonactive alternatives stay blocked until the user shares an authorized option id",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "zō",
                verbClass: "A",
                sourceValence: "mainline-reflexive",
                subject: "3sg",
                requestedVoice: "passive",
            };
            const unresolved = application.evaluate(request);
            const resolved = application.evaluate({ ...request, nonactiveOptionId: "lō:zō-lō" });
            return {
                unresolved: {
                    status: unresolved.authorizationStatus,
                    reason: unresolved.blockReason,
                    selectedVoice: unresolved.controlFrame.selectedVoice,
                    selectorRequired: unresolved.controlFrame.nonactiveSelectorRequired,
                    options: unresolved.controlFrame.nonactiveOptionInventory.options.map((option) => option.optionId),
                    selectedKind: unresolved.resultFrame.selectedMachineryFrame?.kind,
                    selectedStatus: unresolved.resultFrame.selectedMachineryFrame?.authorizationStatus,
                    formula: unresolved.resultFrame.formulaRealization,
                },
                resolved: {
                    status: resolved.authorizationStatus,
                    reason: resolved.blockReason,
                    selectedOption: resolved.controlFrame.selectedNonactiveOptionId,
                    formula: resolved.resultFrame.formulaRealization,
                },
            };
        })(),
        {
            unresolved: {
                status: "blocked",
                reason: "classical-vnc-nonactive-formation-option-selection-required",
                selectedVoice: "passive",
                selectorRequired: true,
                options: ["hua:zō-hua", "lō:zō-lō"],
                selectedKind: undefined,
                selectedStatus: undefined,
                formula: "",
            },
            resolved: {
                status: "authorized",
                reason: "",
                selectedOption: "lō:zō-lō",
                formula: "#0-0+ne(zō-lo)0+0-0#",
            },
        }
    );

    s.eq(
        "The public choice is Active, Passive, or Impersonal; formation choice appears only when grammar leaves a real alternative",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const single = application.evaluate({
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "2pl",
                objectPerson: "1sg",
                requestedVoice: "passive",
            });
            const impersonalRequest = {
                sourceStem: "mayāna",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                requestedVoice: "impersonal",
            };
            const multiple = application.evaluate(impersonalRequest);
            const inherent = application.evaluate({ ...impersonalRequest, nonactiveOptionId: "inherent-impersonal" });
            const tla = application.evaluate({ ...impersonalRequest, nonactiveOptionId: "tla-impersonal" });
            const forged = application.evaluate({ ...impersonalRequest, nonactiveOptionId: "fabricated-impersonal" });
            const multipleOptions = multiple.controlFrame.nonactiveOptionInventory.options || [];
            return {
                single: {
                    status: single.authorizationStatus,
                    selectorRequired: single.controlFrame.nonactiveSelectorRequired,
                    optionCount: single.controlFrame.nonactiveOptionInventory.options.length,
                    selectedOption: single.controlFrame.selectedNonactiveOptionId,
                },
                multiple: {
                    status: multiple.authorizationStatus,
                    reason: multiple.blockReason,
                    publicVoices: multiple.controlFrame.allowedVoices,
                    internalOperations: multiple.controlFrame.allowedVoiceOperations,
                    selectorRequired: multiple.controlFrame.nonactiveSelectorRequired,
                    ordinaryPresent: multipleOptions.some(option => option.voiceOperation === "impersonal"),
                    inherentPresent: multipleOptions.some(option => option.optionId === "inherent-impersonal"),
                    tlaPresent: multipleOptions.some(option => option.optionId === "tla-impersonal"),
                },
                inherent: [inherent.authorizationStatus, inherent.controlFrame.selectedVoice, inherent.controlFrame.selectedVoiceOperation, inherent.resultFrame.formulaRealization],
                tla: [tla.authorizationStatus, tla.controlFrame.selectedVoice, tla.controlFrame.selectedVoiceOperation, tla.resultFrame.formulaRealization],
                forged: [forged.authorizationStatus, forged.blockReason, forged.resultFrame.formulaRealization],
            };
        })(),
        {
            single: {
                status: "authorized",
                selectorRequired: false,
                optionCount: 1,
                selectedOption: "lō:chihua-lō",
            },
            multiple: {
                status: "authorized",
                reason: "",
                publicVoices: ["active", "impersonal"],
                internalOperations: ["active", "impersonal", "inherent-impersonal", "tla-impersonal"],
                selectorRequired: true,
                ordinaryPresent: true,
                inherentPresent: true,
                tlaPresent: true,
            },
            inherent: ["authorized", "impersonal", "inherent-impersonal", "#0-0(mayāna)0+0-0#"],
            tla: ["authorized", "impersonal", "tla-impersonal", "#0-0(tla-mayāna)0+0-0#"],
            forged: ["blocked", "classical-vnc-nonactive-formation-option-not-authorized", ""],
        }
    );

    s.eq(
        "The application derives the witnessed distinct and reflexive Lesson 24 causatives through one typed operation",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const baseRequest = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const distinctRequest = { ...baseRequest, sourceSubject: "3sg" };
            const reflexiveRequest = { ...baseRequest, sourceSubject: "1sg", causativeObjectKind: "reflexive" };
            const distinctSelection = selectApplicationDerivationOption(application, distinctRequest, "tom-a");
            const reflexiveSelection = selectApplicationDerivationOption(application, reflexiveRequest, "tom-a");
            const distinct = application.evaluate({
                ...distinctRequest,
                derivationOptionId: distinctSelection.option?.optionId || "missing-tomi-option",
            });
            const reflexive = application.evaluate({
                ...reflexiveRequest,
                derivationOptionId: reflexiveSelection.option?.optionId || "missing-tomi-option",
            });
            const summarize = (frame, selection) => {
                const operation = frame.resultFrame.derivationOperationFrame;
                const addedObject = operation?.participantTransformFrame?.addedObjectRequest
                    || operation?.targetObjectRequests?.[0]
                    || null;
                return {
                    status: frame.authorizationStatus,
                    derivation: frame.controlFrame.derivationType,
                    accepted: frame.controlFrame.requestedDerivationAccepted,
                    inventoryKind: selection.inventory?.kind || "",
                    selectedOptionMatchesInventory: frame.controlFrame.selectedDerivationOptionId === selection.option?.optionId,
                    selectedOptionTarget: selection.option?.targetStem || "",
                    derivedStem: frame.controlFrame.derivedStem,
                    targetObjectCount: frame.controlFrame.targetObjectCount,
                    operationKind: operation?.kind || "",
                    operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                    addedObject: addedObject ? {
                        kind: addedObject.objectKind,
                        person: addedObject.objectPerson,
                        governor: addedObject.governor,
                        level: addedObject.derivationalLevel,
                    } : null,
                    formula: frame.resultFrame.formulaRealization,
                };
            };
            return {
                distinct: summarize(distinct, distinctSelection),
                reflexive: summarize(reflexive, reflexiveSelection),
            };
        })(),
        {
            distinct: {
                status: "authorized",
                derivation: "causative",
                accepted: true,
                inventoryKind: "classical-nahuatl-vnc-derivation-option-inventory",
                selectedOptionMatchesInventory: true,
                selectedOptionTarget: "tom-a",
                derivedStem: "tom-a",
                targetObjectCount: 1,
                operationKind: "classical-nahuatl-vnc-derivation-operation-frame",
                operationTyped: true,
                addedObject: { kind: "specific-projective", person: "3sg", governor: "causative", level: 1 },
                formula: "#ni-0+c-0(tom-a)0+0-0#",
            },
            reflexive: {
                status: "authorized",
                derivation: "causative",
                accepted: true,
                inventoryKind: "classical-nahuatl-vnc-derivation-option-inventory",
                selectedOptionMatchesInventory: true,
                selectedOptionTarget: "tom-a",
                derivedStem: "tom-a",
                targetObjectCount: 1,
                operationKind: "classical-nahuatl-vnc-derivation-operation-frame",
                operationTyped: true,
                addedObject: { kind: "reflexive", person: "1sg", governor: "causative", level: 1 },
                formula: "#ni-0+n-o(tom-a)0+0-0#",
            },
        }
    );

    s.eq(
        "Type-two causative and applicative requests preserve their typed source bases and Lesson 23 object routing",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const causativeRequest = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "1sg",
                subject: "2sg",
                objectPerson: "3sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const applicativeRequest = {
                sourceStem: "xeloa",
                verbClass: "C",
                sourceValence: "specific-projective",
                subject: "1sg",
                objectPerson: "3sg",
                requestedDerivation: "applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "2sg",
                requestedVoice: "active",
            };
            const causativeSelection = selectApplicationDerivationOption(
                application,
                causativeRequest,
                "chīhua-l-tiā"
            );
            const applicativeSelection = selectApplicationDerivationOption(
                application,
                applicativeRequest,
                "xel-huiā"
            );
            const causative = application.evaluate({
                ...causativeRequest,
                derivationOptionId: causativeSelection.option?.optionId || "missing-type-two-causative-option",
            });
            const applicative = application.evaluate({
                ...applicativeRequest,
                derivationOptionId: applicativeSelection.option?.optionId || "missing-type-two-applicative-option",
            });
            const causativeNonactiveBase = findNestedFrameByKind(
                causative.resultFrame.derivationOperationFrame,
                "classical-nahuatl-nonactive-vnc-nonactive-stem-record"
            );
            const applicativeCluster = applicative.resultFrame.activeMachineryFrame?.multipleObjectClusterFrame;
            return {
                causative: {
                    status: causative.authorizationStatus,
                    selectedOptionMatchesInventory: causative.controlFrame.selectedDerivationOptionId === causativeSelection.option?.optionId,
                    selectedOptionTarget: causativeSelection.option?.targetStem || "",
                    stem: causative.resultFrame.activeMachineryFrame?.stem || "",
                    formula: causative.resultFrame.formulaRealization,
                    nonactiveBase: causativeNonactiveBase ? {
                        sourceStem: causativeNonactiveBase.sourceStem,
                        nonactiveStem: causativeNonactiveBase.nonactiveStem,
                        status: causativeNonactiveBase.authorizationStatus,
                    } : null,
                },
                applicative: {
                    status: applicative.authorizationStatus,
                    selectedOptionMatchesInventory: applicative.controlFrame.selectedDerivationOptionId === applicativeSelection.option?.optionId,
                    selectedOptionTarget: applicativeSelection.option?.targetStem || "",
                    stem: applicative.resultFrame.activeMachineryFrame?.stem || "",
                    formula: applicative.resultFrame.formulaRealization,
                    clusterKind: applicativeCluster?.kind || "",
                    positions: (applicativeCluster?.positions || []).map((position) => ({
                        governor: position.governor,
                        level: position.derivationalLevel,
                        prominence: position.prominence,
                        carrier: position.carrier,
                    })),
                },
            };
        })(),
        {
            causative: {
                status: "authorized",
                selectedOptionMatchesInventory: true,
                selectedOptionTarget: "chīhua-l-tiā",
                stem: "chīhua-l-tiā",
                formula: "#ti-0+n-ēch+⎕-0(chīhua-l-tia)0+0-0#",
                nonactiveBase: {
                    sourceStem: "chīhua",
                    nonactiveStem: "chihua-lō",
                    status: "authorized",
                },
            },
            applicative: {
                status: "authorized",
                selectedOptionMatchesInventory: true,
                selectedOptionTarget: "xel-huiā",
                stem: "xel-huiā",
                formula: "#ni-0+m-itz+⎕-0(xel-huia)0+0-0#",
                clusterKind: "classical-nahuatl-multiple-object-vnc-object-cluster-frame",
                positions: [
                    { governor: "applicative", level: 2, prominence: "mainline", carrier: "m-itz" },
                    { governor: "directive", level: 1, prominence: "shuntline", carrier: "0-0" },
                ],
            },
        }
    );

    s.eq(
        "Entered sources outside the exact witness overlays receive productive causative and applicative operations",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const causativeRequest = {
                sourceStem: "miqui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const causativeSelection = selectApplicationDerivationOption(application, causativeRequest, "mic-tiā");
            const causative = application.evaluate({
                ...causativeRequest,
                derivationOptionId: causativeSelection.option?.optionId || "missing-productive-causative-option",
            });
            const applicativeRequest = {
                sourceStem: "mati",
                verbClass: "B",
                sourceValence: "specific-projective",
                subject: "1sg",
                objectPerson: "3sg",
                requestedDerivation: "applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "2sg",
                requestedVoice: "active",
            };
            const applicativeSelection = selectApplicationDerivationOption(application, applicativeRequest, "mati-liā");
            const applicative = application.evaluate({
                ...applicativeRequest,
                derivationOptionId: applicativeSelection.option?.optionId || "missing-regular-type-two-applicative-option",
            });
            const summarize = frame => ({
                status: frame.authorizationStatus,
                reason: frame.blockReason,
                selectedTarget: frame.resultFrame.derivationOperationFrame?.selectedOption?.targetStem || "",
                selectedRoute: frame.resultFrame.derivationOperationFrame?.selectedOption?.derivationRoute || "",
                operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(frame.resultFrame.derivationOperationFrame),
                targetObjectCount: frame.controlFrame.targetObjectCount,
                formula: frame.resultFrame.formulaRealization,
            });
            const selectedSemanticOption = causative.controlFrame.derivationOptionInventory?.options?.find(
                (option) => option.optionId === causative.controlFrame.selectedDerivationOptionId
            ) || null;
            const selectedOperation = causative.resultFrame.derivationOperationFrame || null;
            return {
                causativePreview: {
                    status: causativeSelection.preview.authorizationStatus,
                    reason: causativeSelection.preview.blockReason,
                    selectorRequired: causativeSelection.preview.controlFrame.derivationSelectorRequired,
                    targets: causativeSelection.inventory.options.map(option => option.targetStem),
                },
                causative: summarize(causative),
                semanticOptionIdentity: {
                    inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(
                        causative.controlFrame.derivationOptionInventory
                    ),
                    operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(selectedOperation),
                    target: selectedSemanticOption?.targetStem || "",
                    previewSignatureMatches:
                        causativeSelection.option?.canonicalSignature
                        === selectedSemanticOption?.canonicalSignature,
                    inventoryToOperation:
                        Boolean(selectedSemanticOption?.optionId)
                        && selectedOperation?.selectedOptionId === selectedSemanticOption.optionId
                        && selectedOperation?.selectedOption?.canonicalSignature
                            === selectedSemanticOption.canonicalSignature,
                    retiredCapabilityAbsent:
                        typeof ctx.isClassicalNahuatlCanvasDerivationChoiceFrame === "undefined",
                    retiredContractAbsent:
                        getGrammarContractDefinition(
                            getDefaultGrammarContractRegistry(),
                            "classical-nahuatl-canvas-derivation-choice-frame"
                        ) === null,
                    retiredCarriersAbsent:
                        !Object.hasOwn(selectedSemanticOption || {}, "canvasDerivationChoiceFrame")
                        && !Object.hasOwn(selectedOperation || {}, "selectedCanvasDerivationChoiceFrame")
                        && !Object.hasOwn(selectedOperation || {}, "selectedChoiceId")
                        && !Object.hasOwn(selectedOperation || {}, "selectedChoiceSignature")
                        && !Object.hasOwn(causative.controlFrame || {}, "selectedCanvasDerivationChoiceFrame")
                        && !Object.hasOwn(causative.resultFrame || {}, "selectedCanvasDerivationChoiceFrame")
                        && !Object.hasOwn(causative.derivationExplanationProjection || {}, "canvasDerivationChoiceFrame"),
                },
                applicative: summarize(applicative),
            };
        })(),
        {
            causativePreview: {
                status: "blocked",
                reason: "classical-vnc-derivation-option-selection-required",
                selectorRequired: true,
                targets: ["mic-a", "miqui-ā", "mic-tiā"],
            },
            causative: {
                status: "authorized",
                reason: "",
                selectedTarget: "mic-tiā",
                selectedRoute: "type-two-tia-from-o-hua-nonactive",
                operationTyped: true,
                targetObjectCount: 1,
                formula: "#ni-0+c-0(mic-tia)0+0-0#",
            },
            semanticOptionIdentity: {
                inventoryCanonical: true,
                operationCanonical: true,
                target: "mic-tiā",
                previewSignatureMatches: true,
                inventoryToOperation: true,
                retiredCapabilityAbsent: true,
                retiredContractAbsent: true,
                retiredCarriersAbsent: true,
            },
            applicative: {
                status: "authorized",
                reason: "",
                selectedTarget: "mati-liā",
                selectedRoute: "type-two-final-i-append-lia",
                operationTyped: true,
                targetObjectCount: 2,
                formula: "#ni-0+m-itz+⎕-0(mati-lia)0+0-0#",
            },
        }
    );

    s.eq(
        "#3 projects Andrews formation, participants, scope, and later voice from one canonical application envelope",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const evaluateSelected = (request, targetStem) => {
                const selection = selectApplicationDerivationOption(application, request, targetStem);
                return application.evaluate({
                    ...request,
                    derivationOptionId: selection.option?.optionId || "missing-option",
                });
            };
            const chihua = buildClassicalNahuatlVncDerivationExplanationProjection(evaluateSelected({
                sourceStem: "chīhua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "1sg",
                subject: "2sg",
                objectPerson: "3sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            }, "chīhua-l-tiā"));
            const xeloa = buildClassicalNahuatlVncDerivationExplanationProjection(evaluateSelected({
                sourceStem: "xeloa",
                verbClass: "C",
                sourceValence: "specific-projective",
                subject: "1sg",
                objectPerson: "3sg",
                requestedDerivation: "applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "2sg",
                requestedVoice: "active",
            }, "xel-huiā"));
            const tomiPassive = buildClassicalNahuatlVncDerivationExplanationProjection(evaluateSelected({
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "passive",
            }, "tom-a"));
            const miquiAddition = buildClassicalNahuatlVncDerivationExplanationProjection(evaluateSelected({
                sourceStem: "miqui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            }, "miqui-ā"));
            const summarizeParticipants = projection => projection.participantRows.map(row => ({
                source: row.sourceRole,
                action: row.transformation,
                carrier: row.targetCarrier,
                prominence: row.prominence,
                level: row.derivationalLevel,
                sounded: row.sounded,
            }));
            return {
                chihua: {
                    status: chihua.authorizationStatus,
                    route: chihua.formationSteps.map(step => step.stem),
                    participants: summarizeParticipants(chihua),
                    subjectLinks: {
                        source: chihua.sourceProfile.participantFormulaSegments
                            .filter(segment => segment.participantId === chihua.participantRows.find(row => row.sourceCarrierKind === "subject")?.participantId)
                            .map(segment => segment.text),
                        target: chihua.targetProfile.participantFormulaSegments
                            .filter(segment => segment.participantId === chihua.participantRows.find(row => row.targetCarrierKind === "subject")?.participantId)
                            .map(segment => segment.text),
                    },
                    targetObjectLinks: chihua.participantRows
                        .filter(row => row.targetCarrierKind === "object")
                        .map(row => ({
                            carrier: row.targetCarrier,
                            links: chihua.targetProfile.participantFormulaSegments
                                .filter(segment => segment.participantId === row.participantId)
                                .map(segment => segment.text),
                        })),
                    scope: [chihua.scope.model, chihua.scope.section],
                    evidence: chihua.evidence.sections,
                    procedure: [chihua.derivationProcedure.procedureType, chihua.derivationProcedure.label],
                },
                xeloa: {
                    status: xeloa.authorizationStatus,
                    route: xeloa.formationSteps.map(step => step.stem),
                    participants: summarizeParticipants(xeloa),
                    scope: [xeloa.scope.model, xeloa.scope.section],
                    carriers: xeloa.evidence.lesson23ObjectRouting.linearCarriers,
                    procedure: [xeloa.derivationProcedure.procedureType, xeloa.derivationProcedure.label],
                },
                tomiPassive: {
                    status: tomiPassive.authorizationStatus,
                    route: tomiPassive.formationSteps.map(step => step.stem),
                    activeBeforeVoice: tomiPassive.higherLayers.map(layer => layer.value),
                    finalFormula: tomiPassive.higherLayers[2].value,
                    procedure: [tomiPassive.derivationProcedure.procedureType, tomiPassive.derivationProcedure.label],
                },
                miquiAddition: [miquiAddition.authorizationStatus, miquiAddition.derivationProcedure.procedureType, miquiAddition.derivationProcedure.label],
                authority: [chihua.grammarAuthority, chihua.formulaStringAuthority, chihua.surfaceStringAuthority, chihua.displayTextAuthority],
            };
        })(),
        {
            chihua: {
                status: "authorized",
                route: ["chīhua", "chīhua", "chihua-lō", "chīhua-l-tiā"],
                participants: [
                    { source: "2sg new matrix subject", action: "imported as outer subject", carrier: "ti-0…0-0", prominence: "subject", level: 0, sounded: true },
                    { source: "1sg source subject", action: "becomes the causative object", carrier: "n-ēch", prominence: "mainline", level: 2, sounded: true },
                    { source: "3sg specific object in the source VNC", action: "retained from the source VNC", carrier: "0-0", prominence: "shuntline", level: 1, sounded: false },
                ],
                subjectLinks: {
                    source: ["ni-0", "0-0"],
                    target: ["ti-0", "0-0"],
                },
                targetObjectLinks: [
                    { carrier: "n-ēch", links: ["n-ēch"] },
                    { carrier: "0-0", links: ["⎕-0"] },
                ],
                scope: ["causative-source-vnc-core", "24.9"],
                evidence: ["25.1", "25.4", "25.9", "25.15"],
                procedure: ["nonactive-base-replacement", "Nonactive-base replacement"],
            },
            xeloa: {
                status: "authorized",
                route: ["xel-o-ā", "xel-o-ā", "xel-huiā"],
                participants: [
                    { source: "1sg source subject", action: "preserved as outer subject", carrier: "ni-0…0-0", prominence: "subject", level: 0, sounded: true },
                    { source: "new 2sg specific object", action: "is imported by the applicative", carrier: "m-itz", prominence: "mainline", level: 2, sounded: true },
                    { source: "3sg specific object in the source VNC", action: "retained from the source VNC", carrier: "0-0", prominence: "shuntline", level: 1, sounded: false },
                ],
                scope: ["applicative-object-suffix-discontinuous-unit", "26.23"],
                carriers: ["m-itz", "0-0"],
                procedure: ["replacement", "Replacement"],
            },
            tomiPassive: {
                status: "authorized",
                route: ["tomi", "tomi", "tom-a", "tom-a-lō"],
                activeBeforeVoice: ["tom-a", "passive → tom-a-lō", "#0-0(tom-a-lo)0+0-0#"],
                finalFormula: "#0-0(tom-a-lo)0+0-0#",
                procedure: ["replacement", "Replacement"],
            },
            miquiAddition: ["authorized", "addition", "Addition"],
            authority: [false, false, false, false],
        }
    );

    s.eq(
        "typed open VNC analysis authorizes productive derivation while raw Karttunen evidence remains inert",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "cā-hua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "3sg",
                subject: "1sg",
                objectPerson: "3sg",
                requestedDerivation: "applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "2sg",
                requestedVoice: "active",
            };
            const withoutEvidence = application.evaluate(request);
            const ownerOption = withoutEvidence.controlFrame
                ?.derivationOptionInventory?.options?.[0] || null;
            const selectedOpenSource = application.evaluate({
                ...request,
                derivationOptionId: ownerOption?.optionId || "missing-option",
            });
            const withEvidencePoison = application.evaluate({
                ...request,
                derivationOptionId: "applicative:karttunen:cā-hui-liā",
                lexicalEvidenceMatches: [{
                    sourceRecordId: "karttunen-all:000041:a1",
                    sourceOriginal: "CĀHU(A)",
                    targetOriginal: "CĀHUILIĀ",
                    generationAuthority: true,
                }],
            });
            return {
                withoutEvidence: [
                    withoutEvidence.authorizationStatus,
                    withoutEvidence.blockReason,
                    withoutEvidence.controlFrame
                        ?.derivationOptionInventory?.authorizationStatus || "",
                    withoutEvidence.controlFrame
                        ?.derivationOptionInventory?.options?.length || 0,
                    withoutEvidence.resultFrame?.formulaRealization || "",
                    withoutEvidence.resultFrame?.surfaceRealization || "",
                ],
                selectedOpenSource: [
                    selectedOpenSource.authorizationStatus,
                    ctx.isClassicalNahuatlVncApplicationFrame(
                        selectedOpenSource
                    ),
                    Boolean(selectedOpenSource.resultFrame
                        ?.formulaRealization),
                    Boolean(selectedOpenSource.resultFrame
                        ?.surfaceRealization),
                    selectedOpenSource.resultFrame?.sourceMachineryFrame
                        ?.canonicalSourceSelectionFrame
                        ?.lexicalSelectionAuthority || "",
                ],
                withEvidencePoison: [
                    withEvidencePoison.authorizationStatus,
                    withEvidencePoison.blockReason,
                    withEvidencePoison.controlFrame
                        ?.derivationOptionInventory?.authorizationStatus || "",
                    withEvidencePoison.controlFrame
                        ?.derivationOptionInventory?.options?.some(option =>
                            option.optionId
                                === "applicative:karttunen:cā-hui-liā"
                        ) || false,
                    withEvidencePoison.resultFrame?.formulaRealization || "",
                    withEvidencePoison.resultFrame?.surfaceRealization || "",
                ],
            };
        })(),
        {
            withoutEvidence: [
                "blocked",
                "classical-vnc-derivation-option-selection-required",
                "authorized",
                2,
                "",
                "",
            ],
            selectedOpenSource: [
                "authorized",
                true,
                true,
                true,
                "user-supplied-lexical-analysis",
            ],
            withEvidencePoison: [
                "blocked",
                "classical-vnc-derivation-operation-not-authorized",
                "authorized",
                false,
                "",
                "",
            ],
        }
    );

    s.eq(
        "#3 keeps Lesson 20 bridge evidence distinct from later-voice nonactive evidence and rejects typed evidence poison",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);

            const bridgeRequest = {
                sourceStem: "mayāna",
                verbClass: "A",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const bridgeSelection = selectApplicationDerivationOption(application, bridgeRequest, "mayāna-l-tiā");
            const bridgeApplication = application.evaluate({
                ...bridgeRequest,
                derivationOptionId: bridgeSelection.option?.optionId || "missing-mayana-type-two-option",
            });
            const bridgeProjection = buildClassicalNahuatlVncDerivationExplanationProjection(bridgeApplication);
            const bridgeAttestation = bridgeProjection.evidence?.lesson20Bridge?.lexicalAttestations?.[0] || null;
            const bridgePoison = JSON.parse(JSON.stringify(bridgeApplication));
            const bridgePoisonMatch = bridgePoison.resultFrame?.derivationOperationFrame?.selectedOption
                ?.lesson20NonactiveStemRecord?.lexicalEvidenceMatches?.[0];
            if (bridgePoisonMatch) {
                bridgePoisonMatch.sourceRecordId = "FORGED";
            }

            const laterVoiceRequest = {
                sourceStem: "cui",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "3sg",
                objectPerson: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
            };
            const laterVoiceSelection = selectApplicationDerivationOption(application, laterVoiceRequest, "cui-tiā");
            const selectedLaterVoiceRequest = {
                ...laterVoiceRequest,
                derivationOptionId: laterVoiceSelection.option?.optionId || "missing-cui-type-two-option",
            };
            const laterVoicePreview = application.evaluate({
                ...selectedLaterVoiceRequest,
                requestedVoice: "passive",
            });
            const nonactiveOptionId = laterVoicePreview.controlFrame.nonactiveOptionInventory?.automaticOptionId
                || laterVoicePreview.controlFrame.nonactiveOptionInventory?.options?.[0]?.optionId
                || "missing-cui-nonactive-option";
            const laterVoiceApplication = application.evaluate({
                ...selectedLaterVoiceRequest,
                requestedVoice: "passive",
                nonactiveOptionId,
            });
            const laterVoiceProjection = buildClassicalNahuatlVncDerivationExplanationProjection(laterVoiceApplication);
            const laterVoiceAttestation = laterVoiceProjection.evidence?.laterVoiceNonactive?.lexicalAttestations?.[0] || null;
            const laterVoicePoison = JSON.parse(JSON.stringify(laterVoiceApplication));
            const laterVoicePoisonMatch = laterVoicePoison.resultFrame?.selectedMachineryFrame
                ?.nonactiveStemRecord?.lexicalEvidenceMatches?.[0];
            if (laterVoicePoisonMatch) {
                laterVoicePoisonMatch.sourceRecordId = "FORGED";
            }

            const summarizeAttestation = attestation => attestation ? {
                id: attestation.sourceRecordId,
                operation: attestation.operation,
                citation: `${attestation.sourceOriginal} → ${attestation.targetOriginal}`,
                provenance: attestation.provenanceDisplay,
                authority: [attestation.grammarAuthority, attestation.generationAuthority],
            } : null;
            return {
                bridge: {
                    canonical: ctx.isClassicalNahuatlVncApplicationFrame(bridgeApplication),
                    route: bridgeProjection.formationSteps.map(step => step.stem),
                    record: bridgeProjection.evidence?.lesson20Bridge ? {
                        source: bridgeProjection.evidence.lesson20Bridge.sourceStem,
                        target: bridgeProjection.evidence.lesson20Bridge.nonactiveStem,
                        attestation: summarizeAttestation(bridgeAttestation),
                    } : null,
                    selectedEvidenceOperation: bridgeProjection.evidence?.lexicalAttestations?.[0]?.operation || "",
                    poisonedCanonical: ctx.isClassicalNahuatlVncApplicationFrame(bridgePoison),
                    poisonedProjectionStatus: buildClassicalNahuatlVncDerivationExplanationProjection(bridgePoison).authorizationStatus,
                },
                laterVoice: {
                    canonical: ctx.isClassicalNahuatlVncApplicationFrame(laterVoiceApplication),
                    route: laterVoiceProjection.formationSteps.map(step => step.stem),
                    record: laterVoiceProjection.evidence?.laterVoiceNonactive ? {
                        source: laterVoiceProjection.evidence.laterVoiceNonactive.sourceStem,
                        target: laterVoiceProjection.evidence.laterVoiceNonactive.nonactiveStem,
                        attestation: summarizeAttestation(laterVoiceAttestation),
                    } : null,
                    nonactiveOptionId,
                    poisonedCanonical: ctx.isClassicalNahuatlVncApplicationFrame(laterVoicePoison),
                    poisonedProjectionStatus: buildClassicalNahuatlVncDerivationExplanationProjection(laterVoicePoison).authorizationStatus,
                },
            };
        })(),
        {
            bridge: {
                canonical: true,
                route: ["mayāna", "mayāna", "mayāna-lō", "mayāna-l-tiā"],
                record: {
                    source: "mayāna",
                    target: "mayāna-lō",
                    attestation: {
                        id: "karttunen-all:000225:n1",
                        operation: "nonactive",
                        citation: "MAYĀN(A) → MAYĀNALŌ",
                        provenance: "raw Karttunen column",
                        authority: [false, false],
                    },
                },
                selectedEvidenceOperation: "causative",
                poisonedCanonical: false,
                poisonedProjectionStatus: "blocked",
            },
            laterVoice: {
                canonical: true,
                route: ["cui", "cui", "cuī-hua", "cui-tiā", "cui-tī-lō"],
                record: {
                    source: "cui-tiā",
                    target: "cui-tī-lō",
                    attestation: null,
                },
                nonactiveOptionId: "lō:cui-tī-lō",
                poisonedCanonical: false,
                poisonedProjectionStatus: "blocked",
            },
        }
    );

    s.eq(
        "#3 derivation explanation ignores display poison and fails closed on typed-envelope poison",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "1sg",
                subject: "2sg",
                objectPerson: "3sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "chīhua-l-tiā");
            const canonical = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-option",
            });
            const displayPoison = {
                ...canonical,
                state: {
                    derivedStem: "LIE",
                    derivedClass: "LIE",
                    targetObjectCount: 99,
                    selectedFormula: "#LIE#",
                },
                derivationExplanationFrame: { authorizationStatus: "authorized", prose: "LIE" },
            };
            const poisonedProjection = buildClassicalNahuatlVncDerivationExplanationProjection(displayPoison);
            const mutate = callback => {
                const clone = JSON.parse(JSON.stringify(canonical));
                callback(clone);
                return {
                    applicationValid: ctx.isClassicalNahuatlVncApplicationFrame(clone),
                    projectionStatus: buildClassicalNahuatlVncDerivationExplanationProjection(clone).authorizationStatus,
                };
            };
            return {
                displayPoison: {
                    status: poisonedProjection.authorizationStatus,
                    route: poisonedProjection.formationSteps.map(step => step.stem),
                    poisonSurvived: JSON.stringify(poisonedProjection).includes("LIE"),
                },
                optionTarget: mutate(clone => {
                    clone.resultFrame.derivationOperationFrame.selectedOption.targetStem = "LIE";
                }),
                participant: mutate(clone => {
                    clone.resultFrame.derivationOperationFrame.participantTransformFrame.addedObjectRequest.objectPerson = "3pl";
                }),
                cluster: mutate(clone => {
                    clone.resultFrame.activeMachineryFrame.targetObjectClusterFrame.positions[0].carrier = "LIE";
                }),
                evidence: mutate(clone => {
                    clone.resultFrame.derivationOperationFrame.selectedOption.andrewsSection = "LIE";
                }),
                scope: mutate(clone => {
                    clone.resultFrame.derivationOperationFrame.selectedOption.scopeRule = "LIE";
                }),
            };
        })(),
        {
            displayPoison: {
                status: "authorized",
                route: ["chīhua", "chīhua", "chihua-lō", "chīhua-l-tiā"],
                poisonSurvived: false,
            },
            optionTarget: { applicationValid: false, projectionStatus: "blocked" },
            participant: { applicationValid: false, projectionStatus: "blocked" },
            cluster: { applicationValid: false, projectionStatus: "blocked" },
            evidence: { applicationValid: false, projectionStatus: "blocked" },
            scope: { applicationValid: false, projectionStatus: "blocked" },
        }
    );

    s.eq(
        "#3 explanation cannot select among productive causative routes or replay itself as grammar authority",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const canonicalRequest = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
            };
            const selection = selectApplicationDerivationOption(application, canonicalRequest, "tom-a");
            const canonical = application.evaluate({
                ...canonicalRequest,
                derivationOptionId: selection.option?.optionId || "missing-option",
            });
            const explanation = buildClassicalNahuatlVncDerivationExplanationProjection(canonical);
            const blocked = application.evaluate({
                sourceStem: "miqui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                derivationExplanationProjection: explanation,
                derivationExplanationFrame: explanation,
                derivationOperationFrame: explanation,
            });
            return {
                status: blocked.authorizationStatus,
                reason: blocked.blockReason,
                selectorRequired: blocked.controlFrame.derivationSelectorRequired,
                optionTargets: blocked.controlFrame.derivationOptionInventory.options.map(option => option.targetStem),
                rejected: [...blocked.rejectedAuthorityFields].sort(),
                formula: blocked.resultFrame.formulaRealization,
                selectedMachinery: blocked.resultFrame.selectedMachineryFrame,
                explanationSurvived: JSON.stringify(blocked).includes("classical-nahuatl-vnc-derivation-explanation-projection"),
            };
        })(),
        {
            status: "blocked",
            reason: "classical-vnc-application-caller-authority-rejected",
            selectorRequired: true,
            optionTargets: ["mic-a", "miqui-ā", "mic-tiā"],
            rejected: ["derivationExplanationFrame", "derivationExplanationProjection", "derivationOperationFrame"],
            formula: "",
            selectedMachinery: null,
            explanationSurvived: false,
        }
    );

    s.eq(
        "A productive type-two causative consumes a typed two-object source and routes the new causee as the third object",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "multiple-object",
                sourceSubject: "1sg",
                subject: "2sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
                objectRequests: [
                    { objectId: "source-object-1", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "source-object-2", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
                ],
            };
            const selection = selectApplicationDerivationOption(application, request, "chīhua-l-tiā");
            const result = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "forged-three-position-causative-option",
            });
            const operation = result.resultFrame.derivationOperationFrame;
            return {
                inventoryStatus: selection.inventory?.authorizationStatus || "",
                inventoryReason: selection.inventory?.blockReason || "",
                productiveOptionPresent: Boolean(selection.option),
                status: result.authorizationStatus,
                reason: result.blockReason,
                operationAuthorized: operation?.authorizationStatus === "authorized",
                operationTyped: Boolean(operation) && ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                targetObjectCount: result.controlFrame.targetObjectCount,
                formula: result.resultFrame.formulaRealization,
            };
        })(),
        {
            inventoryStatus: "authorized",
            inventoryReason: "",
            productiveOptionPresent: true,
            status: "authorized",
            reason: "",
            operationAuthorized: true,
            operationTyped: true,
            targetObjectCount: 3,
            formula: "#ti-0+n-ēch+⎕-0+tē(chīhua-l-tia)0+0-0#",
        }
    );

    s.eq(
        "A later passive derives its nonactive stem from the completed causative target",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const derivationRequest = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
            };
            const derivationSelection = selectApplicationDerivationOption(
                application,
                derivationRequest,
                "tom-a"
            );
            const selectedDerivationRequest = {
                ...derivationRequest,
                derivationOptionId: derivationSelection.option?.optionId || "missing-tomi-option",
            };
            const active = application.evaluate({ ...selectedDerivationRequest, requestedVoice: "active" });
            const passivePreview = application.evaluate({ ...selectedDerivationRequest, requestedVoice: "passive" });
            const engineOptionId = passivePreview.controlFrame.nonactiveOptionInventory?.automaticOptionId
                || passivePreview.controlFrame.nonactiveOptionInventory?.options?.[0]?.optionId
                || "";
            const passive = application.evaluate({
                ...selectedDerivationRequest,
                requestedVoice: "passive",
                nonactiveOptionId: engineOptionId,
            });
            const nonactiveRecord = (passive.resultFrame.appliedTypedFrames || []).find(
                frame => frame?.kind === "classical-nahuatl-nonactive-vnc-nonactive-stem-record"
            );
            const voiceFrame = (passive.resultFrame.appliedTypedFrames || []).find(
                frame => frame?.kind === "classical-nahuatl-passive-vnc-passive-transformation-frame"
            );
            return {
                active: {
                    status: active.authorizationStatus,
                    sourceStem: active.resultFrame.sourceMachineryFrame?.stem || "",
                    derivedStem: active.resultFrame.activeMachineryFrame?.stem || "",
                    formula: active.resultFrame.formulaRealization,
                    engineOptionId,
                },
                passive: {
                    status: passive.authorizationStatus,
                    selectedVoice: passive.controlFrame.selectedVoice,
                    derivationStem: passive.resultFrame.derivationOperationFrame?.targetStem || "",
                    activeDerivedStem: passive.resultFrame.activeMachineryFrame?.stem || "",
                    nonactiveSourceStem: nonactiveRecord?.sourceStem || "",
                    nonactiveStem: nonactiveRecord?.nonactiveStem || "",
                    voiceSourceStem: voiceFrame?.sourceStem || "",
                    voiceTargetStem: voiceFrame?.targetStem || "",
                    selectedStem: passive.resultFrame.selectedMachineryFrame?.stem || "",
                    formula: passive.resultFrame.formulaRealization,
                },
            };
        })(),
        {
            active: {
                status: "authorized",
                sourceStem: "tomi",
                derivedStem: "tom-a",
                formula: "#ni-0+c-0(tom-a)0+0-0#",
                engineOptionId: "lō:tom-a-lō",
            },
            passive: {
                status: "authorized",
                selectedVoice: "passive",
                derivationStem: "tom-a",
                activeDerivedStem: "tom-a",
                nonactiveSourceStem: "tom-a",
                nonactiveStem: "tom-a-lō",
                voiceSourceStem: "tom-a",
                voiceTargetStem: "tom-a-lō",
                selectedStem: "tom-a-lō",
                formula: "#0-0(tom-a-lo)0+0-0#",
            },
        }
    );

    s.eq(
        "Source passive and impersonal are causativized before the independently selected target voice",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const passiveRequest = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "3sg",
                objectPerson: "3sg",
                subject: "2sg",
                requestedDerivation: "causative",
                sourceVoice: "passive",
                requestedVoice: "active",
            };
            const passiveSelection = selectApplicationDerivationOption(application, passiveRequest, "chīhua-l-tiā");
            const sourcePassiveTargetActive = application.evaluate({
                ...passiveRequest,
                derivationOptionId: passiveSelection.option?.optionId || "missing-chihua-causative-option",
            });
            const sourcePassiveTargetPassivePreview = application.evaluate({
                ...passiveRequest,
                derivationOptionId: passiveSelection.option?.optionId || "missing-chihua-causative-option",
                requestedVoice: "passive",
            });
            const targetNonactiveOptionId = sourcePassiveTargetPassivePreview.controlFrame.nonactiveOptionInventory?.automaticOptionId
                || sourcePassiveTargetPassivePreview.controlFrame.nonactiveOptionInventory?.options?.[0]?.optionId
                || "";
            const sourcePassiveTargetPassive = application.evaluate({
                ...passiveRequest,
                derivationOptionId: passiveSelection.option?.optionId || "missing-chihua-causative-option",
                requestedVoice: "passive",
                nonactiveOptionId: targetNonactiveOptionId,
            });
            const impersonalRequest = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "projective-nonhuman",
                sourceSubject: "3sg",
                subject: "2sg",
                requestedDerivation: "causative",
                sourceVoice: "impersonal",
                requestedVoice: "active",
            };
            const impersonalSelection = selectApplicationDerivationOption(application, impersonalRequest, "chīhua-l-tiā");
            const sourceImpersonalTargetActive = application.evaluate({
                ...impersonalRequest,
                derivationOptionId: impersonalSelection.option?.optionId || "missing-chihua-causative-option",
            });
            const summarize = frame => {
                const sourceMachinery = frame.resultFrame.sourceMachineryFrame;
                const activeMachinery = frame.resultFrame.activeMachineryFrame;
                const selectedMachinery = frame.resultFrame.selectedMachineryFrame;
                const operation = frame.resultFrame.derivationOperationFrame;
                return {
                    status: frame.authorizationStatus,
                    reason: frame.blockReason,
                    sourceVoice: frame.controlFrame.selectedSourceVoice,
                    targetVoice: frame.controlFrame.selectedVoice,
                    sourceFrameVoice: sourceMachinery?.voice || "active",
                    operationSourceVoice: operation?.sourceVoice || "",
                    sourceNonactive: sourceMachinery?.nonactiveStemRecord ? {
                        source: sourceMachinery.nonactiveStemRecord.sourceStem,
                        target: sourceMachinery.nonactiveStemRecord.nonactiveStem,
                        option: sourceMachinery.nonactiveStemRecord.selectedOptionId,
                    } : null,
                    activeDerivedStem: activeMachinery?.stem || "",
                    selectedFrameVoice: selectedMachinery?.voice || "active",
                    targetNonactive: selectedMachinery?.nonactiveStemRecord ? {
                        source: selectedMachinery.nonactiveStemRecord.sourceStem,
                        target: selectedMachinery.nonactiveStemRecord.nonactiveStem,
                        option: selectedMachinery.nonactiveStemRecord.selectedOptionId,
                    } : null,
                    targetObjects: (operation?.targetObjectRequests || []).map(request => ({
                        kind: request.objectKind,
                        person: request.objectPerson,
                        governor: request.governor,
                    })),
                    formula: frame.resultFrame.formulaRealization,
                    canonical: ctx.isClassicalNahuatlVncApplicationFrame(frame),
                };
            };
            return {
                sourcePassiveTargetActive: summarize(sourcePassiveTargetActive),
                sourcePassiveTargetPassive: summarize(sourcePassiveTargetPassive),
                sourceImpersonalTargetActive: summarize(sourceImpersonalTargetActive),
            };
        })(),
        {
            sourcePassiveTargetActive: {
                status: "authorized",
                reason: "",
                sourceVoice: "passive",
                targetVoice: "active",
                sourceFrameVoice: "passive",
                operationSourceVoice: "passive",
                sourceNonactive: {
                    source: "chīhua",
                    target: "chihua-lō",
                    option: "lō:chihua-lō",
                },
                activeDerivedStem: "chīhua-l-tiā",
                selectedFrameVoice: "active",
                targetNonactive: null,
                targetObjects: [
                    { kind: "specific-projective", person: "3sg", governor: "directive" },
                    { kind: "nonspecific-human", person: "", governor: "causative" },
                ],
                formula: "#ti-0+⎕-0+tē(chīhua-l-tia)0+0-0#",
                canonical: true,
            },
            sourcePassiveTargetPassive: {
                status: "authorized",
                reason: "",
                sourceVoice: "passive",
                targetVoice: "passive",
                sourceFrameVoice: "passive",
                operationSourceVoice: "passive",
                sourceNonactive: {
                    source: "chīhua",
                    target: "chihua-lō",
                    option: "lō:chihua-lō",
                },
                activeDerivedStem: "chīhua-l-tiā",
                selectedFrameVoice: "passive",
                targetNonactive: {
                    source: "chīhua-l-tiā",
                    target: "chīhua-l-tī-lō",
                    option: "lō:chīhua-l-tī-lō",
                },
                targetObjects: [
                    { kind: "specific-projective", person: "3sg", governor: "directive" },
                    { kind: "nonspecific-human", person: "", governor: "causative" },
                ],
                formula: "#0-0+tē(chīhua-l-tī-lo)0+0-0#",
                canonical: true,
            },
            sourceImpersonalTargetActive: {
                status: "authorized",
                reason: "",
                sourceVoice: "impersonal",
                targetVoice: "active",
                sourceFrameVoice: "impersonal",
                operationSourceVoice: "impersonal",
                sourceNonactive: {
                    source: "chīhua",
                    target: "chihua-lō",
                    option: "lō:chihua-lō",
                },
                activeDerivedStem: "chīhua-l-tiā",
                selectedFrameVoice: "active",
                targetNonactive: null,
                targetObjects: [
                    { kind: "nonspecific-nonhuman", person: "", governor: "directive" },
                    { kind: "nonspecific-human", person: "", governor: "causative" },
                ],
                formula: "#ti-0+tē+tla(chīhua-l-tia)0+0-0#",
                canonical: true,
            },
        }
    );

    s.eq(
        "A derivation-owned hypothetical nonactive bridge forms mauh-tiā without becoming a Lesson 20 voice choice",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const activeRequest = {
                sourceStem: "mahui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                sourceVoice: "active",
                requestedVoice: "active",
            };
            const preview = application.evaluate(activeRequest);
            const derivationOption = preview.controlFrame.derivationOptionInventory?.options?.find(
                option => option.targetStem === "mauh-tiā"
            );
            const resolved = application.evaluate({
                ...activeRequest,
                derivationOptionId:
                    derivationOption?.optionId
                    || "missing-mahui-causative-option",
            });
            const selectedOption =
                resolved.resultFrame.derivationOperationFrame?.selectedOption
                || null;
            const internalBridge =
                selectedOption?.typeTwoInternalBridgeFrame || null;
            const copiedInventory = JSON.parse(JSON.stringify(
                preview.controlFrame.derivationOptionInventory
            ));
            const copiedOperation = JSON.parse(JSON.stringify(
                resolved.resultFrame.derivationOperationFrame
            ));
            const impersonalRequest = {
                ...activeRequest,
                sourceVoice: "impersonal",
            };
            const impersonalPreview = application.evaluate(impersonalRequest);
            const forbiddenBridgeSelection = application.evaluate({
                ...impersonalRequest,
                sourceNonactiveOptionId: "o-hua:mahu-o-hua",
            });
            return {
                impersonalVoice: {
                    status: impersonalPreview.authorizationStatus,
                    reason: impersonalPreview.blockReason,
                    selectorRequired:
                        impersonalPreview.controlFrame
                            .sourceNonactiveSelectorRequired,
                    options:
                        impersonalPreview.controlFrame
                            .sourceNonactiveOptionInventory.options
                            .map(option => option.optionId),
                    internalBridgeExposed:
                        impersonalPreview.controlFrame
                            .sourceNonactiveOptionInventory.options
                            .some(option => option.nonactiveStem === "mahu-o-hua"),
                },
                activeDerivation: {
                    previewStatus: preview.authorizationStatus,
                    previewReason: preview.blockReason,
                    optionTargets:
                        preview.controlFrame.derivationOptionInventory.options
                            .map(option => option.targetStem),
                    status: resolved.authorizationStatus,
                    reason: resolved.blockReason,
                    selectedSourceNonactive:
                        resolved.controlFrame.selectedSourceNonactiveOptionId,
                    sourceVoiceStem:
                        resolved.resultFrame.sourceMachineryFrame?.stem || "",
                    lesson20RecordPresent:
                        Boolean(selectedOption?.lesson20NonactiveStemRecord),
                    operationTarget:
                        resolved.resultFrame.derivationOperationFrame
                            ?.targetStem || "",
                    internalBridge: internalBridge ? {
                        kind: internalBridge.kind,
                        source: internalBridge.sourceStem,
                        baseOperation: internalBridge.bridgeBaseOperation,
                        base: internalBridge.bridgeBaseStem,
                        suffix: internalBridge.suffixFamily,
                        nonactive: internalBridge.nonactiveStem,
                        retained: internalBridge.retainedStem,
                        realizedRetained:
                            internalBridge.realizedRetainedStem,
                        target: internalBridge.targetStem,
                        userSelectable: internalBridge.userSelectable,
                        internalOnly:
                            internalBridge.internalPrerequisiteOnly,
                        lesson20Authority:
                            internalBridge.lesson20OperationAuthority,
                        callerAuthority:
                            internalBridge.callerSuppliedAuthorityAccepted,
                    } : null,
                    boundarySpelling:
                        internalBridge?.boundarySpellingFrame ? {
                            operationId:
                                internalBridge.boundarySpellingFrame
                                    .operationId,
                            selectedRuleId:
                                internalBridge.boundarySpellingFrame
                                    .spellingChangeFrame?.selectedRuleId
                                    || "",
                            phoneme:
                                internalBridge.boundarySpellingFrame
                                    .underlyingFinalConsonant,
                            source:
                                internalBridge.boundarySpellingFrame
                                    .retainedStem,
                            mode:
                                internalBridge.boundarySpellingFrame
                                    .realizationMode,
                            result:
                                internalBridge.boundarySpellingFrame
                                    .realizedRetainedStem,
                            spelling:
                                internalBridge.boundarySpellingFrame
                                    .outputSpelling,
                        } : null,
                    formula: resolved.resultFrame.formulaRealization,
                    surface: resolved.resultFrame.surfaceRealization,
                    canonical:
                        ctx.isClassicalNahuatlVncApplicationFrame(resolved),
                },
                hostile: {
                    forbiddenVoiceStatus:
                        forbiddenBridgeSelection.authorizationStatus,
                    forbiddenVoiceReason:
                        forbiddenBridgeSelection.blockReason,
                    forbiddenSelectionSurvived:
                        JSON.stringify(forbiddenBridgeSelection)
                            .includes("o-hua:mahu-o-hua"),
                    copiedInventoryCanonical:
                        ctx.isClassicalNahuatlVncDerivationOptionInventory(
                            copiedInventory
                        ),
                    copiedOperationCanonical:
                        ctx.isClassicalNahuatlVncDerivationOperationFrame(
                            copiedOperation
                        ),
                },
            };
        })(),
        {
            impersonalVoice: {
                status: "blocked",
                reason: "lesson20-nonactive-option-selection-required",
                selectorRequired: true,
                options: ["hua:mahuī-hua", "o-hua:ma-ō-hua"],
                internalBridgeExposed: false,
            },
            activeDerivation: {
                previewStatus: "blocked",
                previewReason:
                    "classical-vnc-derivation-option-selection-required",
                optionTargets: ["mahu-a", "mahui-ā", "mauh-tiā"],
                status: "authorized",
                reason: "",
                selectedSourceNonactive: "",
                sourceVoiceStem: "mahui",
                lesson20RecordPresent: false,
                operationTarget: "mauh-tiā",
                internalBridge: {
                    kind:
                        "classical-nahuatl-type-two-causative-internal-nonactive-bridge-frame",
                    source: "mahui",
                    baseOperation: "delete-final-i",
                    base: "mahu",
                    suffix: "o-hua",
                    nonactive: "mahu-o-hua",
                    retained: "mahu",
                    realizedRetained: "mauh",
                    target: "mauh-tiā",
                    userSelectable: false,
                    internalOnly: true,
                    lesson20Authority: false,
                    callerAuthority: false,
                },
                boundarySpelling: {
                    operationId: "cn-l2-derivational-boundary-spelling",
                    selectedRuleId: "cn-l2-24-w-final",
                    phoneme: "[w]",
                    source: "mahu",
                    mode: "lesson2.4-environment-sensitive",
                    result: "mauh",
                    spelling: "uh",
                },
                formula: "#ni-0+c-0(mahu-tia)0+0-0#",
                surface: "nicmauhtia",
                canonical: true,
            },
            hostile: {
                forbiddenVoiceStatus: "blocked",
                forbiddenVoiceReason:
                    "lesson20-selected-option-was-not-generated",
                forbiddenSelectionSurvived: false,
                copiedInventoryCanonical: false,
                copiedOperationCanonical: false,
            },
        }
    );

    s.eq(
        "The application binds an unhyphenated Lessons 24–25 source analysis into control, inventory, result, applied frames, and #3",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "huāqui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "huā-tz-a");
            const derived = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-huaqui-option",
            });
            const direct = application.evaluate({
                sourceStem: "huāqui",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
                requestedDerivation: "direct",
            });
            const analysis = derived.resultFrame.sourceAnalysisFrame;
            const formationStep = derived.derivationExplanationProjection.formationSteps.find(step => step.stage === "source-analysis");
            const evidence = derived.derivationExplanationProjection.evidence.sourceAnalysis;
            const freeSourceAnalysisControls = Object.keys(derived.controlFrame).filter(key => /sourceAnalysis(?:Option|Selector|Selection)/u.test(key));
            return {
                status: derived.authorizationStatus,
                target: derived.controlFrame.derivedStem,
                analysis: {
                    kind: analysis?.kind || "",
                    canonical: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(analysis),
                    categories: analysis?.analyses.map(item => item.category) || [],
                    segments: analysis?.analyses.map(item => item.segments.join(" + ")) || [],
                    explicitBoundaryObserved: analysis?.explicitBoundaryObserved,
                    boundaryAuthority: analysis?.boundaryAuthority,
                },
                continuity: {
                    control: derived.controlFrame.sourceAnalysisFrame?.canonicalSignature === analysis?.canonicalSignature,
                    inventory: derived.controlFrame.derivationOptionInventory?.sourceAnalysisFrame?.canonicalSignature === analysis?.canonicalSignature,
                    result: derived.resultFrame.sourceAnalysisFrame?.canonicalSignature === analysis?.canonicalSignature,
                    appliedFirst: derived.resultFrame.appliedTypedFrames[0]?.kind,
                },
                projection: {
                    stage: formationStep?.stage,
                    categories: formationStep?.analysisCategories,
                    segments: formationStep?.analyses.map(item => item.segments.join(" + ")),
                    display: formationStep?.analyses.map(item => ({
                        label: item.display?.label,
                        parts: item.display?.parts.map(part => `${part.segment}:${part.role}`),
                        effect: item.display?.formationEffect,
                    })),
                    displayGroups: formationStep?.analysisDisplayGroups.map(group => ({
                        parts: group.parts.map(part => `${part.segment}:${part.role}`),
                        readings: group.readings,
                        effects: group.formationEffects,
                    })),
                    compact: formationStep?.compactDisplay ? {
                        parts: formationStep.compactDisplay.parts.map(part => `${part.segment}:${part.role}`),
                        process: formationStep.compactDisplay.process,
                        source: formationStep.compactDisplay.source,
                        grammarAuthority: formationStep.compactDisplay.grammarAuthority,
                    } : null,
                    boundaryObserved: formationStep?.explicitBoundaryObserved,
                    userHyphensAuthority: formationStep?.userHyphensAuthority,
                    statement: formationStep?.authorityStatement,
                    evidenceCategories: evidence?.analysisCategories,
                    evidenceSegments: evidence?.analyses.map(item => item.segments.join(" + ")),
                    evidenceUserHyphensAuthority: evidence?.userHyphensAuthority,
                },
                freeSourceAnalysisControls,
                direct: {
                    status: direct.authorizationStatus,
                    analysisKind: direct.resultFrame.sourceAnalysisFrame?.kind || "",
                    appliedFirst: direct.resultFrame.appliedTypedFrames[0]?.kind || "",
                    explanationStatus: direct.derivationExplanationProjection.authorizationStatus,
                    explanationReason: direct.derivationExplanationProjection.blockReason,
                },
            };
        })(),
        {
            status: "authorized",
            target: "huā-tz-a",
            analysis: {
                kind: "classical-nahuatl-vnc-derivation-source-analysis",
                canonical: true,
                categories: ["fused-destockal-final-i", "type-one-consonant-alternation"],
                segments: ["huā + qui", "huā + qui"],
                explicitBoundaryObserved: false,
                boundaryAuthority: "engine-derived-analysis; editorial hyphens are observation only",
            },
            continuity: {
                control: true,
                inventory: true,
                result: true,
                appliedFirst: "classical-nahuatl-vnc-derivation-source-analysis",
            },
            projection: {
                stage: "source-analysis",
                categories: ["fused-destockal-final-i", "type-one-consonant-alternation"],
                segments: ["huā + qui", "huā + qui"],
                display: [
                    {
                        label: "Fused final-i analysis",
                        parts: ["huā:root", "qui:stem formative"],
                        effect: "Identifies the final-i base used by the available Type 1 formation.",
                    },
                    {
                        label: "Type 1 consonant alternation",
                        parts: ["huā:source base", "qui:stem-final formative"],
                        effect: "Allows the documented consonant replacement before causative a.",
                    },
                ],
                displayGroups: [{
                    parts: ["huā:root", "qui:stem formative"],
                    readings: ["Fused final-i analysis", "Type 1 consonant alternation"],
                    effects: [
                        "Identifies the final-i base used by the available Type 1 formation.",
                        "Allows the documented consonant replacement before causative a.",
                    ],
                }],
                compact: {
                    parts: ["huā:root", "qui:stem formative"],
                    process: "The internal roles come from the typed Andrews source; entered hyphens only help reading.",
                    source: "Andrews §§24.3.1.a, 24.5.9, 25.8",
                    grammarAuthority: false,
                },
                boundaryObserved: false,
                userHyphensAuthority: false,
                statement: "User-authored hyphens are observations only; they never authorize source analysis.",
                evidenceCategories: ["fused-destockal-final-i", "type-one-consonant-alternation"],
                evidenceSegments: ["huā + qui", "huā + qui"],
                evidenceUserHyphensAuthority: false,
            },
            freeSourceAnalysisControls: [],
            direct: {
                status: "authorized",
                analysisKind: "classical-nahuatl-vnc-derivation-source-analysis",
                appliedFirst: "classical-nahuatl-vnc-derivation-source-analysis",
                explanationStatus: "blocked",
                explanationReason: "classical-vnc-derivation-explanation-derived-result-required",
            },
        }
    );

    s.eq(
        "The Lesson 25 causative card receives the Canvas-authorized internal derived-stem analysis",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "huā-qui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "huā-qui-l-tiā");
            const derived = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-huaqui-type-two-option",
            });
            const step = derived.derivationExplanationProjection.formationSteps.find(item => item.stage === "completed-active-derivation");
            return {
                status: derived.authorizationStatus,
                target: step?.stem,
                analysis: {
                    label: step?.derivedStemAnalysis?.label,
                    parts: step?.derivedStemAnalysis?.parts.map(part => `${part.segment}:${part.role}`),
                    process: step?.derivedStemAnalysis?.process,
                    source: step?.derivedStemAnalysis?.source,
                    grammarAuthority: step?.derivedStemAnalysis?.grammarAuthority,
                },
                frozen: Object.isFrozen(step?.derivedStemAnalysis) && Object.isFrozen(step?.derivedStemAnalysis?.parts),
            };
        })(),
        {
            status: "authorized",
            target: "huā-qui-l-tiā",
            analysis: {
                label: "Andrews derived-stem analysis",
                parts: [
                    "huā:root",
                    "qui:stem formative",
                    "l:retained nonactive formative",
                    "ti:empty connective",
                    "ā:causative formative",
                ],
                process: "The lō nonactive base loses ō; l remains before tiā. The tiā unit is connective ti plus causative ā.",
                source: "Andrews §§25.1, 25.4",
                grammarAuthority: false,
            },
            frozen: true,
        }
    );

    s.eq(
        "The Lesson 26 applicative card receives the Canvas-authorized huiā internal analysis",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "xeloa",
                verbClass: "C",
                sourceValence: "specific-projective",
                subject: "1sg",
                objectPerson: "3sg",
                requestedDerivation: "applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "2sg",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "xel-huiā");
            const derived = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-xeloa-applicative-option",
            });
            const step = derived.derivationExplanationProjection.formationSteps.find(item => item.stage === "completed-active-derivation");
            return {
                status: derived.authorizationStatus,
                target: step?.stem,
                analysis: {
                    parts: step?.derivedStemAnalysis?.parts.map(part => `${part.segment}:${part.role}`),
                    process: step?.derivedStemAnalysis?.process,
                    source: step?.derivedStemAnalysis?.source,
                    grammarAuthority: step?.derivedStemAnalysis?.grammarAuthority,
                },
                frozen: Object.isFrozen(step?.derivedStemAnalysis) && Object.isFrozen(step?.derivedStemAnalysis?.parts),
            };
        })(),
        {
            status: "authorized",
            target: "xel-huiā",
            analysis: {
                parts: [
                    "xel:typed source base",
                    "hu:empty connective /w/",
                    "iā:applicative formative",
                ],
                process: "The typed route forms the applicative base, then adds empty connective /w/ (written hu) plus applicative iā.",
                source: "Andrews §§26.3, 26.9–26.10",
                grammarAuthority: false,
            },
            frozen: true,
        }
    );

    s.eq(
        "cual-ā-ni preserves root, stock formative, and stem formative across compact causative and applicative cards",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const summarize = (requestedDerivation, targetStem) => {
                const request = {
                    sourceStem: "cual-ā-ni",
                    verbClass: "B",
                    sourceValence: "intransitive",
                    subject: "1sg",
                    requestedDerivation,
                    causativeObjectKind: "specific-projective",
                    applicativeObjectKind: "specific-projective",
                    applicativeObjectPerson: "3sg",
                    requestedVoice: "active",
                };
                const selection = selectApplicationDerivationOption(application, request, targetStem);
                const derived = application.evaluate({
                    ...request,
                    derivationOptionId: selection.option?.optionId || `missing-cualani-${requestedDerivation}-option`,
                });
                const source = derived.derivationExplanationProjection.formationSteps.find(item => item.stage === "source-analysis");
                const result = derived.derivationExplanationProjection.formationSteps.find(item => item.stage === "completed-active-derivation");
                return {
                    status: derived.authorizationStatus,
                    target: result?.stem,
                    source: source?.compactDisplay?.parts.map(part => `${part.segment}:${part.role}`),
                    result: result?.derivedStemAnalysis?.parts.map(part => `${part.segment}:${part.role}`),
                };
            };
            return {
                causative: summarize("causative", "cual-ā-n-tiā"),
                applicative: summarize("applicative", "cual-ā-ni-liā"),
            };
        })(),
        {
            causative: {
                status: "authorized",
                target: "cual-ā-n-tiā",
                source: ["cual:root", "ā:stock formative", "ni:stem formative"],
                result: [
                    "cual:root",
                    "ā:stock formative",
                    "n:retained stem-formative consonant",
                    "ti:empty connective",
                    "ā:causative formative",
                ],
            },
            applicative: {
                status: "authorized",
                target: "cual-ā-ni-liā",
                source: ["cual:root", "ā:stock formative", "ni:stem formative"],
                result: [
                    "cual:root",
                    "ā:stock formative",
                    "ni:stem formative",
                    "l:empty connective",
                    "iā:applicative formative",
                ],
            },
        }
    );

    s.eq(
        "Caller source-analysis injection is discarded and hostile analysis mutation fails result and application validation",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "huāqui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "huā-tz-a");
            const cleanRequest = {
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-huaqui-option",
            };
            const clean = application.evaluate(cleanRequest);
            const injected = application.evaluate({
                ...cleanRequest,
                sourceAnalysisFrame: {
                    kind: "classical-nahuatl-vnc-derivation-source-analysis",
                    authorizationStatus: "authorized",
                    canonicalSignature: "SOURCE-ANALYSIS-POISON",
                },
                sentenceOptions: {
                    sourceAnalysisFrame: { canonicalSignature: "NESTED-SOURCE-ANALYSIS-POISON" },
                },
            });
            const poisonedAnalysis = {
                ...clean.resultFrame.sourceAnalysisFrame,
                analyses: clean.resultFrame.sourceAnalysisFrame.analyses.map((analysis, index) => index === 0 ? {
                    ...analysis,
                    category: "hostile-source-analysis-category",
                } : analysis),
            };
            const poisonedResult = {
                ...clean.resultFrame,
                sourceAnalysisFrame: poisonedAnalysis,
                appliedTypedFrames: clean.resultFrame.appliedTypedFrames.map((frame, index) => index === 0 ? poisonedAnalysis : frame),
            };
            const poisonedControlEnvelope = {
                ...clean,
                controlFrame: {
                    ...clean.controlFrame,
                    sourceAnalysisFrame: poisonedAnalysis,
                },
            };
            const registry = getDefaultGrammarContractRegistry();
            const poisonedResultReport = inspectRegisteredGrammarContract(registry, poisonedResult);
            const poisonedControlReport = inspectRegisteredGrammarContract(registry, poisonedControlEnvelope);
            return {
                status: injected.authorizationStatus,
                reason: injected.blockReason,
                rejected: injected.rejectedAuthorityFields,
                canonical: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(clean.resultFrame.sourceAnalysisFrame),
                poisonSurvived: JSON.stringify(injected).includes("POISON"),
                injectedFormula: injected.resultFrame.formulaRealization,
                poisonedResultRejected: !poisonedResultReport.ok
                    && poisonedResultReport.errors.includes("authorized-application-result-canonical-validator-required"),
                poisonedControlRejected: !poisonedControlReport.ok
                    && poisonedControlReport.errors.includes("authorized-application-frame-canonical-validator-required"),
            };
        })(),
        {
            status: "blocked",
            reason: "classical-vnc-application-caller-authority-rejected",
            rejected: ["sourceAnalysisFrame", "sentenceOptions.sourceAnalysisFrame"],
            canonical: true,
            poisonSurvived: false,
            injectedFormula: "",
            poisonedResultRejected: true,
            poisonedControlRejected: true,
        }
    );

    s.eq(
        "Source-voice authority is immutable, caller source machinery is discarded, and cloned mutations never inherit canonical cache status",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "3sg",
                objectPerson: "3sg",
                subject: "2sg",
                requestedDerivation: "causative",
                sourceVoice: "passive",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "chīhua-l-tiā");
            const clean = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-chihua-causative-option",
            });
            const callerPoisoned = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-chihua-causative-option",
                sourceMachineryFrame: { voice: "ACTUAL-SOURCE-MACHINERY-POISON" },
                sourceVoiceMachineryFrame: { voice: "SOURCE-MACHINERY-POISON" },
                formationSourceMachineryFrame: { stem: "FORMATION-SOURCE-POISON" },
                reverseSourceAnalyses: [{ formationStem: "REVERSE-SOURCE-POISON" }],
            });
            const sourceMachinery = clean.resultFrame.sourceMachineryFrame;
            const formationMachinery = clean.resultFrame.formationSourceMachineryFrame;
            const operation = clean.resultFrame.derivationOperationFrame;
            const poisonedSourceVoiceResult = {
                ...clean.resultFrame,
                selectedSourceVoice: "impersonal",
            };
            const poisonedSourceMachineryResult = {
                ...clean.resultFrame,
                sourceMachineryFrame: {
                    ...sourceMachinery,
                    voice: "impersonal",
                },
            };
            const poisonedFormationMachineryResult = {
                ...clean.resultFrame,
                formationSourceMachineryFrame: {
                    ...formationMachinery,
                    stem: "forged-formation-source",
                },
            };
            const poisonedReverseOperation = {
                ...operation,
                reverseSourceAnalyses: operation.reverseSourceAnalyses.map((analysis, index) => index === 0 ? {
                    ...analysis,
                    formationStem: "forged-reverse-source",
                } : analysis),
            };
            const poisonedReverseResult = {
                ...clean.resultFrame,
                derivationOperationFrame: poisonedReverseOperation,
            };
            const poisonedSourceEnvelope = {
                ...clean,
                resultFrame: poisonedSourceMachineryResult,
            };
            const poisonedControlEnvelope = {
                ...clean,
                controlFrame: {
                    ...clean.controlFrame,
                    allowedSourceVoices: [...clean.controlFrame.allowedSourceVoices, "forged-source-voice"],
                    sourceNonactiveOptionInventory: {
                        ...clean.controlFrame.sourceNonactiveOptionInventory,
                        options: [],
                    },
                    sourceNonactiveSelectorRequired: !clean.controlFrame.sourceNonactiveSelectorRequired,
                },
            };
            const sparseAppliedFrames = Array(clean.resultFrame.appliedTypedFrames.length);
            const sparseAppliedFramesResult = {
                ...clean.resultFrame,
                appliedTypedFrames: sparseAppliedFrames,
            };
            const canonicalBeforeMutationAttempts = [
                ctx.isClassicalNahuatlVncApplicationResultFrame(clean.resultFrame),
                ctx.isClassicalNahuatlVncApplicationFrame(clean),
                ctx.isClassicalNahuatlVncApplicationFrame(clean),
            ];
            let sourceVoiceMutationThrew = false;
            let allowedVoiceMutationThrew = false;
            try {
                clean.resultFrame.sourceMachineryFrame.voice = "impersonal";
            } catch (_error) {
                sourceVoiceMutationThrew = true;
            }
            try {
                clean.controlFrame.allowedSourceVoices.push("forged-source-voice");
            } catch (_error) {
                allowedVoiceMutationThrew = true;
            }
            return {
                clean: {
                    status: clean.authorizationStatus,
                    sourceVoice: clean.controlFrame.selectedSourceVoice,
                    sourceMachineryVoice: clean.resultFrame.sourceMachineryFrame?.voice || "",
                    formula: clean.resultFrame.formulaRealization,
                    canonicalBeforeMutationAttempts,
                    canonicalAfterMutationAttempts: ctx.isClassicalNahuatlVncApplicationFrame(clean),
                },
                frozen: {
                    envelope: Object.isFrozen(clean),
                    control: Object.isFrozen(clean.controlFrame),
                    result: Object.isFrozen(clean.resultFrame),
                    allowedSourceVoices: Object.isFrozen(clean.controlFrame.allowedSourceVoices),
                    sourceMachinery: Object.isFrozen(clean.resultFrame.sourceMachineryFrame),
                    reverseAnalyses: Object.isFrozen(operation.reverseSourceAnalyses),
                    reverseAnalysis: Object.isFrozen(operation.reverseSourceAnalyses[0]),
                    sourceVoiceMutationThrew,
                    allowedVoiceMutationThrew,
                    sourceVoiceAfterMutationAttempt: clean.resultFrame.sourceMachineryFrame?.voice || "",
                },
                callerInjection: {
                    status: callerPoisoned.authorizationStatus,
                    rejected: [...callerPoisoned.rejectedAuthorityFields].sort(),
                    poisonSurvived: JSON.stringify(callerPoisoned).includes("POISON"),
                    canonical: ctx.isClassicalNahuatlVncApplicationFrame(callerPoisoned),
                },
                hostileClones: {
                    sourceVoiceResultRejected: !ctx.isClassicalNahuatlVncApplicationResultFrame(poisonedSourceVoiceResult),
                    sourceMachineryResultRejected: !ctx.isClassicalNahuatlVncApplicationResultFrame(poisonedSourceMachineryResult),
                    formationMachineryResultRejected: !ctx.isClassicalNahuatlVncApplicationResultFrame(poisonedFormationMachineryResult),
                    reverseOperationRejected: !ctx.isClassicalNahuatlVncDerivationOperationFrame(poisonedReverseOperation),
                    reverseResultRejected: !ctx.isClassicalNahuatlVncApplicationResultFrame(poisonedReverseResult),
                    sourceEnvelopeRejected: !ctx.isClassicalNahuatlVncApplicationFrame(poisonedSourceEnvelope),
                    controlInventoryRejected: !ctx.isClassicalNahuatlVncApplicationFrame(poisonedControlEnvelope),
                    sparseAppliedFramesRejected: !ctx.isClassicalNahuatlVncApplicationResultFrame(sparseAppliedFramesResult),
                },
            };
        })(),
        {
            clean: {
                status: "authorized",
                sourceVoice: "passive",
                sourceMachineryVoice: "passive",
                formula: "#ti-0+⎕-0+tē(chīhua-l-tia)0+0-0#",
                canonicalBeforeMutationAttempts: [true, true, true],
                canonicalAfterMutationAttempts: true,
            },
            frozen: {
                envelope: true,
                control: true,
                result: true,
                allowedSourceVoices: true,
                sourceMachinery: true,
                reverseAnalyses: true,
                reverseAnalysis: true,
                sourceVoiceMutationThrew: true,
                allowedVoiceMutationThrew: true,
                sourceVoiceAfterMutationAttempt: "passive",
            },
            callerInjection: {
                status: "blocked",
                rejected: ["formationSourceMachineryFrame", "reverseSourceAnalyses", "sourceMachineryFrame", "sourceVoiceMachineryFrame"],
                poisonSurvived: false,
                canonical: true,
            },
            hostileClones: {
                sourceVoiceResultRejected: true,
                sourceMachineryResultRejected: true,
                formationMachineryResultRejected: true,
                reverseOperationRejected: true,
                reverseResultRejected: true,
                sourceEnvelopeRejected: true,
                controlInventoryRejected: true,
                sparseAppliedFramesRejected: true,
            },
        }
    );

    s.eq(
        "Caller derivation targets, formulae, surfaces, and operation frames cannot replace the engine operation",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const cleanRequest = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, cleanRequest, "tom-a");
            const result = application.evaluate({
                ...cleanRequest,
                derivationOptionId: selection.option?.optionId || "missing-tomi-option",
                targetStem: "TARGET-LIE",
                formula: "#FORMULA-LIE#",
                surface: "SURFACE-LIE",
                derivationOperationFrame: {
                    kind: "classical-nahuatl-vnc-derivation-operation-frame",
                    authorizationStatus: "authorized",
                    targetStem: "OPERATION-LIE",
                },
            });
            const operation = result.resultFrame.derivationOperationFrame;
            return {
                status: result.authorizationStatus,
                rejected: [...result.rejectedAuthorityFields].sort(),
                operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                operationTarget: operation?.targetStem || "",
                formula: result.resultFrame.formulaRealization,
                callerAccepted: result.callerSuppliedAuthorityAccepted,
                poisonSurvived: JSON.stringify(result).includes("LIE"),
            };
        })(),
        {
            status: "blocked",
            rejected: ["derivationOperationFrame", "formula", "surface", "targetStem"],
            operationTyped: false,
            operationTarget: "",
            formula: "",
            callerAccepted: false,
            poisonSurvived: false,
        }
    );

    s.eq(
        "Caller-built targets, records, formulae, and surfaces are reported but never admitted as authority",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const result = application.evaluate({
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "2pl",
                objectPerson: "1sg",
                requestedVoice: "passive",
                targetStem: "TARGET-LIE",
                formulaArtifact: "#FORMULA-LIE#",
                surfaceArtifact: "SURFACE-LIE",
                nonactiveStemRecord: { targetStem: "RECORD-LIE" },
                sentenceOptions: {
                    targetStem: "NESTED-TARGET-LIE",
                    resultFrame: { formulaRealization: "NESTED-RESULT-LIE" },
                },
            });
            const serialized = JSON.stringify(result);
            return {
                status: result.authorizationStatus,
                formula: result.resultFrame.formulaRealization,
                rejected: result.rejectedAuthorityFields,
                callerAccepted: result.callerSuppliedAuthorityAccepted,
                resultCallerAccepted: result.resultFrame.callerSuppliedAuthorityAccepted,
                formulaAuthority: result.formulaStringAuthority,
                surfaceAuthority: result.surfaceStringAuthority,
                poisonSurvived: serialized.includes("LIE"),
            };
        })(),
        {
            status: "blocked",
            formula: "",
            rejected: [
                "targetStem",
                "formulaArtifact",
                "surfaceArtifact",
                "nonactiveStemRecord",
                "sentenceOptions.targetStem",
                "sentenceOptions.resultFrame",
            ],
            callerAccepted: false,
            resultCallerAccepted: false,
            formulaAuthority: false,
            surfaceAuthority: false,
            poisonSurvived: false,
        }
    );

    s.eq(
        "The shared catalog validates the application envelope and rejects a poisoned result contract",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const frame = application.evaluate({
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "2pl",
                objectPerson: "1sg",
                requestedVoice: "passive",
            });
            const direct = application.evaluate({
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
            });
            const alternateDirect = application.evaluate({
                sourceStem: "tēmi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "2sg",
            });
            const directionalDirect = application.evaluate({
                sourceStem: "mati",
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "1sg",
                objectPerson: "3sg",
                directionalPrefix: "on",
            });
            const causativeRequest = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
                sourceSubject: "3sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
            };
            const causativeSelection = selectApplicationDerivationOption(application, causativeRequest, "tom-a");
            const causative = application.evaluate({
                ...causativeRequest,
                derivationOptionId: causativeSelection.option?.optionId || "missing-tomi-option",
            });
            const reflexiveVoiceBase = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "mainline-reflexive",
                subject: "1sg",
            };
            const reflexivePassive = application.evaluate({ ...reflexiveVoiceBase, requestedVoice: "passive" });
            const reflexiveImpersonal = application.evaluate({ ...reflexiveVoiceBase, requestedVoice: "impersonal" });
            const registry = getDefaultGrammarContractRegistry();
            const poisonedResult = {
                ...frame.resultFrame,
                formulaStringAuthority: true,
            };
            const forgedResult = {
                ...frame.resultFrame,
                selectedMachineryFrame: { kind: "forged-machinery", authorizationStatus: "authorized" },
                finalTypedVncSlotFrame: { kind: "forged-typed-slot", semanticIdentity: "forged" },
                formulaRealization: "#FORGED#",
            };
            const formulaPoisonedResult = {
                ...frame.resultFrame,
                formulaRealization: "#FORGED#",
            };
            const forgedEnvelope = {
                ...frame,
                resultFrame: forgedResult,
            };
            const mixedSourceResult = {
                ...direct.resultFrame,
                sourceMachineryFrame: alternateDirect.resultFrame.sourceMachineryFrame,
            };
            const mixedActiveResult = {
                ...direct.resultFrame,
                activeMachineryFrame: alternateDirect.resultFrame.activeMachineryFrame,
                selectedMachineryFrame: alternateDirect.resultFrame.selectedMachineryFrame,
                finalTypedVncSlotFrame: alternateDirect.resultFrame.finalTypedVncSlotFrame,
                formulaRealization: alternateDirect.resultFrame.formulaRealization,
            };
            const mixedResultEnvelope = {
                ...direct,
                resultFrame: alternateDirect.resultFrame,
            };
            const mixedRequestEnvelope = {
                ...direct,
                normalizedRequest: {
                    ...direct.normalizedRequest,
                    sourceStem: "tēmi",
                },
            };
            const mismatchedFinalTypedResult = {
                ...frame.resultFrame,
                finalTypedVncSlotFrame: {
                    kind: "mismatched-typed-slot-frame",
                    semanticIdentity: frame.resultFrame.finalTypedVncSlotFrame.semanticIdentity,
                    slots: frame.resultFrame.finalTypedVncSlotFrame.slots,
                },
            };
            const mismatchedAppliedResult = {
                ...frame.resultFrame,
                appliedTypedFrames: [{ kind: "mismatched-applied-frame" }],
            };
            const mismatchedDerivationResult = {
                ...causative.resultFrame,
                selectedDerivation: "applicative",
            };
            const invalidNestedControlEnvelope = {
                ...direct,
                controlFrame: {
                    ...direct.controlFrame,
                    allowedVoices: [],
                },
            };
            const blockedAuthorityResult = {
                ...direct.resultFrame,
                authorizationStatus: "blocked",
                formulaRealization: "#MISMATCH#",
                selectedMachineryFrame: { kind: "mismatched-selected-frame" },
                finalTypedVncSlotFrame: { kind: "mismatched-final-frame" },
            };
            const blockedStatusEnvelope = {
                ...direct,
                authorizationStatus: "blocked",
                resultFrame: blockedAuthorityResult,
            };
            const mixedVoiceResult = {
                ...reflexivePassive.resultFrame,
                selectedVoice: "impersonal",
                selectedMachineryFrame: reflexiveImpersonal.resultFrame.selectedMachineryFrame,
                finalTypedVncSlotFrame: reflexiveImpersonal.resultFrame.finalTypedVncSlotFrame,
                formulaRealization: reflexiveImpersonal.resultFrame.formulaRealization,
                appliedTypedFrames: reflexiveImpersonal.resultFrame.appliedTypedFrames,
            };
            const mixedVoiceEnvelope = {
                ...reflexivePassive,
                normalizedRequest: {
                    ...reflexivePassive.normalizedRequest,
                    voice: "impersonal",
                },
                controlFrame: {
                    ...reflexivePassive.controlFrame,
                    selectedVoice: "impersonal",
                    selectedNonactiveOptionId: reflexiveImpersonal.controlFrame.selectedNonactiveOptionId,
                },
                resultFrame: mixedVoiceResult,
            };
            const forgedResultReport = inspectRegisteredGrammarContract(registry, forgedResult);
            const formulaPoisonedReport = inspectRegisteredGrammarContract(registry, formulaPoisonedResult);
            const forgedEnvelopeReport = inspectRegisteredGrammarContract(registry, forgedEnvelope);
            const mixedSourceReport = inspectRegisteredGrammarContract(registry, mixedSourceResult);
            const mixedActiveReport = inspectRegisteredGrammarContract(registry, mixedActiveResult);
            const mixedResultEnvelopeReport = inspectRegisteredGrammarContract(registry, mixedResultEnvelope);
            const mixedRequestEnvelopeReport = inspectRegisteredGrammarContract(registry, mixedRequestEnvelope);
            const mismatchedFinalTypedReport = inspectRegisteredGrammarContract(registry, mismatchedFinalTypedResult);
            const mismatchedAppliedReport = inspectRegisteredGrammarContract(registry, mismatchedAppliedResult);
            const mismatchedDerivationReport = inspectRegisteredGrammarContract(registry, mismatchedDerivationResult);
            const invalidNestedControlReport = inspectRegisteredGrammarContract(registry, invalidNestedControlEnvelope);
            const blockedAuthorityReport = inspectRegisteredGrammarContract(registry, blockedAuthorityResult);
            const blockedStatusEnvelopeReport = inspectRegisteredGrammarContract(registry, blockedStatusEnvelope);
            const mixedVoiceResultReport = inspectRegisteredGrammarContract(registry, mixedVoiceResult);
            const mixedVoiceEnvelopeReport = inspectRegisteredGrammarContract(registry, mixedVoiceEnvelope);
            return {
                envelope: inspectRegisteredGrammarContract(registry, frame).ok,
                request: inspectRegisteredGrammarContract(registry, frame.normalizedRequest).ok,
                control: inspectRegisteredGrammarContract(registry, frame.controlFrame).ok,
                result: inspectRegisteredGrammarContract(registry, frame.resultFrame).ok,
                directionalDirect: inspectRegisteredGrammarContract(registry, directionalDirect).ok,
                poisonedResult: inspectRegisteredGrammarContract(registry, poisonedResult),
                forgedResultRejected: !forgedResultReport.ok
                    && forgedResultReport.errors.includes("authorized-application-result-canonical-validator-required"),
                formulaPoisonRejected: !formulaPoisonedReport.ok
                    && formulaPoisonedReport.errors.includes("authorized-application-result-canonical-validator-required"),
                forgedEnvelopeRejected: !forgedEnvelopeReport.ok
                    && forgedEnvelopeReport.errors.includes("authorized-application-frame-canonical-validator-required"),
                mixedSourceRejected: !mixedSourceReport.ok
                    && mixedSourceReport.errors.includes("authorized-application-result-canonical-validator-required"),
                mixedActiveRejected: !mixedActiveReport.ok
                    && mixedActiveReport.errors.includes("authorized-application-result-canonical-validator-required"),
                mixedResultEnvelopeRejected: !mixedResultEnvelopeReport.ok
                    && mixedResultEnvelopeReport.errors.includes("authorized-application-frame-canonical-validator-required"),
                mixedRequestEnvelopeRejected: !mixedRequestEnvelopeReport.ok
                    && mixedRequestEnvelopeReport.errors.includes("authorized-application-frame-canonical-validator-required"),
                mismatchedFinalTypedRejected: !mismatchedFinalTypedReport.ok
                    && mismatchedFinalTypedReport.errors.includes("authorized-application-result-canonical-validator-required"),
                mismatchedAppliedRejected: !mismatchedAppliedReport.ok
                    && mismatchedAppliedReport.errors.includes("authorized-application-result-canonical-validator-required"),
                mismatchedDerivationRejected: !mismatchedDerivationReport.ok
                    && mismatchedDerivationReport.errors.includes("authorized-application-result-canonical-validator-required"),
                invalidNestedControlRejected: !invalidNestedControlReport.ok
                    && invalidNestedControlReport.errors.includes("authorized-application-frame-canonical-validator-required"),
                blockedAuthorityRejected: !blockedAuthorityReport.ok
                    && blockedAuthorityReport.errors.includes("blocked-application-result-authority-payload-forbidden"),
                blockedStatusEnvelopeRejected: !blockedStatusEnvelopeReport.ok
                    && blockedStatusEnvelopeReport.errors.includes("blocked-application-frame-status-and-authority-payload-mismatch"),
                mixedVoiceResultCanonical: mixedVoiceResultReport.ok,
                mixedVoiceEnvelopeRejected: !mixedVoiceEnvelopeReport.ok
                    && mixedVoiceEnvelopeReport.errors.includes("authorized-application-frame-canonical-validator-required"),
            };
        })(),
        {
            envelope: true,
            request: true,
            control: true,
            result: true,
            directionalDirect: true,
            poisonedResult: {
                kind: "grammar-contract-validation-report",
                version: 1,
                ok: false,
                status: "invalid",
                contractKind: "classical-nahuatl-vnc-application-result-frame",
                contractVersion: 1,
                authorityRole: "validated-typed-result",
                definition: getGrammarContractDefinition(
                    getDefaultGrammarContractRegistry(),
                    "classical-nahuatl-vnc-application-result-frame",
                    1
                ),
                errors: [
                    "contract-validator-rejected-frame",
                    "authorized-application-result-canonical-validator-required",
                    "application-result-formula-string-authority-forbidden",
                ],
            },
            forgedResultRejected: true,
            formulaPoisonRejected: true,
            forgedEnvelopeRejected: true,
            mixedSourceRejected: true,
            mixedActiveRejected: true,
            mixedResultEnvelopeRejected: true,
            mixedRequestEnvelopeRejected: true,
            mismatchedFinalTypedRejected: true,
            mismatchedAppliedRejected: true,
            mismatchedDerivationRejected: true,
            invalidNestedControlRejected: true,
            blockedAuthorityRejected: true,
            blockedStatusEnvelopeRejected: true,
            mixedVoiceResultCanonical: false,
            mixedVoiceEnvelopeRejected: true,
        }
    );

    s.eq(
        "Causative causee Valence and shuntline realization remain canonical application controls",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const relationBase = {
                sourceStem: "māmā",
                verbClass: "D",
                sourceValence: "specific-projective",
                sourceSubject: "3pl",
                subject: "3pl",
                objectPerson: "3sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const relationSelection = selectApplicationDerivationOption(application, relationBase, "māma-l-tiā");
            const relationOptionId = relationSelection.option?.optionId || relationSelection.inventory?.options?.[0]?.optionId || "missing-option";
            const relationRequired = application.evaluate({ ...relationBase, derivationOptionId: relationOptionId, causativeObjectKind: "" });
            const relationDistinct = application.evaluate({
                ...relationBase,
                derivationOptionId: relationOptionId,
                causativeObjectKind: "specific-projective",
            });
            const shuntlineBase = {
                sourceStem: "mati",
                verbClass: "B",
                sourceValence: "specific-projective",
                sourceSubject: "3sg",
                subject: "3sg",
                objectPerson: "3sg",
                requestedDerivation: "causative",
                sourceVoice: "passive",
                sourceNonactiveOptionId: "ō:mach-ō",
                requestedVoice: "active",
            };
            const shuntlineSelection = selectApplicationDerivationOption(application, shuntlineBase, "mach-tiā");
            const shuntlineOptionId = shuntlineSelection.option?.optionId || shuntlineSelection.inventory?.options?.[0]?.optionId || "missing-option";
            const shuntlinePreview = application.evaluate({ ...shuntlineBase, derivationOptionId: shuntlineOptionId });
            const shuntlineSilent = application.evaluate({
                ...shuntlineBase,
                derivationOptionId: shuntlineOptionId,
                causativeSpecificShuntlineRealization: "silent",
            });
            const shuntlineSounded = application.evaluate({
                ...shuntlineBase,
                derivationOptionId: shuntlineOptionId,
                causativeSpecificShuntlineRealization: "sounded",
            });
            const poisonedControlInventory = JSON.parse(JSON.stringify(shuntlineSilent));
            poisonedControlInventory.controlFrame.allowedCausativeSpecificShuntlineRealizations = ["caller-invented"];
            return {
                relationRequired: {
                    status: relationRequired.authorizationStatus,
                    reason: relationRequired.blockReason,
                    eligible: relationRequired.controlFrame.causativeObjectKindChoiceEligible,
                    allowed: relationRequired.controlFrame.allowedCausativeObjectKinds,
                    required: relationRequired.controlFrame.causativeObjectKindSelectionRequired,
                    selected: relationRequired.controlFrame.selectedCausativeObjectKind,
                },
                relationDistinct: {
                    status: relationDistinct.authorizationStatus,
                    eligible: relationDistinct.controlFrame.causativeObjectKindChoiceEligible,
                    selected: relationDistinct.controlFrame.selectedCausativeObjectKind,
                    specificObject: relationDistinct.resultFrame.derivationOperationFrame?.participantTransformFrame?.addedObjectRequest?.objectKind,
                },
                shuntlinePreview: {
                    status: shuntlinePreview.authorizationStatus,
                    eligible: shuntlinePreview.controlFrame.causativeSpecificShuntlineChoiceEligible,
                    allowed: shuntlinePreview.controlFrame.allowedCausativeSpecificShuntlineRealizations,
                    selected: shuntlinePreview.controlFrame.selectedCausativeSpecificShuntlineRealization,
                },
                shuntlineRealizations: [shuntlineSilent, shuntlineSounded].map(frame => ({
                    status: frame.authorizationStatus,
                    selected: frame.controlFrame.selectedCausativeSpecificShuntlineRealization,
                    formula: frame.resultFrame.formulaRealization,
                })),
                poisonedControlInventoryCanonical: ctx.isClassicalNahuatlVncApplicationFrame(poisonedControlInventory),
            };
        })(),
        {
            relationRequired: {
                status: "blocked",
                reason: "classical-vnc-causative-causee-valence-selection-required",
                eligible: true,
                allowed: ["specific-projective", "reflexive"],
                required: true,
                selected: "",
            },
            relationDistinct: {
                status: "authorized",
                eligible: true,
                selected: "specific-projective",
                specificObject: "specific-projective",
            },
            shuntlinePreview: {
                status: "authorized",
                eligible: true,
                allowed: ["silent", "sounded"],
                selected: "",
            },
            shuntlineRealizations: [{
                status: "authorized",
                selected: "silent",
                formula: "#0-0+⎕-0+tē(mach-tia)0+0-0#",
            }, {
                status: "authorized",
                selected: "sounded",
                formula: "#0-0+qui-0+tē(mach-tia)0+0-0#",
            }],
            poisonedControlInventoryCanonical: false,
        }
    );

    s.eq(
        "Typed object requests enter the shared Lesson 23 path while ordered voice layers remain unsupported",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "maca",
                verbClass: "A",
                sourceValence: "multiple-object",
                subject: "3sg",
                tense: "future",
                requestedVoice: "active",
                objectRequests: [
                    { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "applied-human", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
                ],
            };
            const accepted = application.evaluate(request);
            const unsupported = application.evaluate({
                ...request,
                sentenceOptions: { orderedVoiceOperations: ["passive", "impersonal"] },
            });
            return {
                accepted: {
                    status: accepted.authorizationStatus,
                    reason: accepted.blockReason,
                    intent: accepted.unsupportedIntentFields,
                    requestCount: accepted.normalizedRequest.sourceObjectRequests.length,
                    selectedKind: accepted.resultFrame.selectedMachineryFrame?.kind || "",
                    clusterKind: accepted.resultFrame.selectedMachineryFrame?.multipleObjectClusterFrame?.kind || "",
                    formula: accepted.resultFrame.formulaRealization,
                },
                unsupported: {
                    status: unsupported.authorizationStatus,
                    reason: unsupported.blockReason,
                    intent: unsupported.unsupportedIntentFields,
                    formula: unsupported.resultFrame.formulaRealization,
                    activeSourceStatus: unsupported.resultFrame.activeMachineryFrame?.authorizationStatus
                        || unsupported.resultFrame.activeMachineryFrame?.proofFrame?.authorizationStatus
                        || "",
                },
            };
        })(),
        {
            accepted: {
                status: "authorized",
                reason: "",
                intent: [],
                requestCount: 2,
                selectedKind: "classical-nahuatl-multiple-object-vnc-multiple-object-vnc-machinery-frame",
                clusterKind: "classical-nahuatl-multiple-object-vnc-object-cluster-frame",
                formula: "#0-0+qui-0+tē(maca)z+⎕-0#",
            },
            unsupported: {
                status: "blocked",
                reason: "classical-vnc-application-intent-outside-derivation-and-single-voice-scope",
                intent: ["sentenceOptions.orderedVoiceOperations"],
                formula: "",
                activeSourceStatus: "authorized",
            },
        }
    );

    s.eq(
        "The one-shot helper and injected ESM service expose the same application contract",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "nēci",
                verbClass: "B",
                sourceValence: "intransitive",
                requestedVoice: "impersonal",
                nonactiveOptionId: "tla-impersonal",
            };
            const installed = application.evaluate(request);
            const oneShot = evaluateClassicalNahuatlVncApplication(request, ctx);
            return {
                serviceKind: application.kind,
                serviceStatus: application.authorizationStatus,
                createInstalled: typeof createClassicalNahuatlVncApplication,
                installed: [installed.authorizationStatus, installed.resultFrame.formulaRealization],
                oneShot: [oneShot.authorizationStatus, oneShot.resultFrame.formulaRealization],
            };
        })(),
        {
            serviceKind: "classical-nahuatl-vnc-application-service",
            serviceStatus: "authorized",
            createInstalled: "function",
            installed: ["authorized", "#0-0(tla-nēci)0+0-0#"],
            oneShot: ["authorized", "#0-0(tla-nēci)0+0-0#"],
        }
    );

    return s;
}

module.exports = { run };
