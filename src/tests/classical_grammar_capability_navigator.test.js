"use strict";

const { createSuite } = require("./runner");

function issueDirectVnc(ctx) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        args: [{
            sourceStem: "ahci",
            verbClass: "A",
            sourceValence: "intransitive",
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            requestedDerivation: "direct",
            requestedVoice: "active",
            voice: "active",
        }],
    });
}

function issueOrdinaryNnc(ctx) {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "tēuc",
    });
    const operationFrame =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
            state: "absolutive",
            subject: "3sg",
            sentenceType: "statement",
            polarity: "positive",
        });
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:ordinary",
        args: [source, operationFrame],
    });
}

function operation(frame, operationId) {
    return frame?.operations.find(
        candidate => candidate.operationId === operationId
    ) || null;
}

const CAPABILITY_CLOSURE_BINDING_OPERATION_IDS = Object.freeze([
    "vnc:application",
    "vnc:ordered-voice-application",
    "vnc:derivational-operation",
    "sentence:adverbial-adjunction",
    "sentence:particle-adjunction",
    "particle:negative-selection",
    "sentence:supplementation",
    "nnc:adjectival-modification",
    "clause:adverbial-adjunction",
    "clause:composition",
    "clause:comparison",
    "grammar:nominal-construction",
    "nnc:deverbal-construction",
    "nnc:adverbial",
    "nnc:relational",
    "nnc:place-gentilic",
    "vnc:denominal",
    "nnc:personal-name",
]);

function navigatorCountsMatchRecords(frame) {
    return Boolean(
        frame
        && frame.availableCount === frame.operations.filter(
            candidate => candidate.availabilityStatus === "available"
        ).length
        && frame.missingPrerequisiteCount === frame.operations.filter(
            candidate => (
                candidate.availabilityStatus === "missing-prerequisite"
            )
        ).length
        && frame.incompatibleCount === frame.operations.filter(
            candidate => candidate.availabilityStatus === "incompatible"
        ).length
    );
}

function run(ctx) {
    const s = createSuite("classical_grammar_capability_navigator");

    s.eq(
        "the canonical runtime publishes exact Result and Source navigator pairs",
        [
            ctx.APPLICATION_CAPABILITY_NAVIGATOR_KIND,
            typeof ctx.getClassicalGrammarApplicationCapabilityNavigator,
            typeof ctx.isClassicalGrammarApplicationCapabilityNavigator,
            ctx.APPLICATION_TYPED_SOURCE_CAPABILITY_NAVIGATOR_KIND,
            typeof ctx
                .getClassicalGrammarApplicationTypedSourceCapabilityNavigator,
            typeof ctx
                .isClassicalGrammarApplicationTypedSourceCapabilityNavigator,
        ],
        [
            "classical-grammar-application-capability-navigator",
            "function",
            "function",
            "classical-grammar-application-typed-source-capability-navigator",
            "function",
            "function",
        ]
    );

    const atlasObservations = [];
    const unsubscribe =
        ctx.subscribeClassicalGrammarApplicationAtlasObservations(
            observation => atlasObservations.push(observation)
        );
    const receipt = issueDirectVnc(ctx);
    const observationsBeforeNavigator = atlasObservations.length;
    const frame =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(receipt);
    const sentenceResult = operation(frame, "vnc:sentence-result");
    const vncDiagram = operation(frame, "vnc:diagram");

    s.eq(
        "one exact Result receives the complete declared continuation view",
        {
            receiptStatus: receipt.authorizationStatus,
            valid:
                ctx.isClassicalGrammarApplicationCapabilityNavigator(frame),
            kind: frame?.kind,
            scope: frame?.scope,
            operationCount: frame?.operationCount,
            countsAddUp:
                frame?.availableCount
                + frame?.missingPrerequisiteCount
                + frame?.incompatibleCount,
            countsMatchRecords: navigatorCountsMatchRecords(frame),
            observerSideEffects:
                atlasObservations.length - observationsBeforeNavigator,
            applicationIdentity:
                frame?.applicationResult === receipt,
            canonicalIdentity:
                frame?.exactResult === receipt.canonicalResult,
            resultRole: frame?.resultRole,
            exactApplicationResultIdentity:
                frame?.exactApplicationResultIdentity,
            exactCanonicalResultIdentity:
                frame?.exactCanonicalResultIdentity,
            exactContinuationResultIdentity:
                frame?.exactContinuationResultIdentity,
        },
        {
            receiptStatus: "authorized",
            valid: true,
            kind: "classical-grammar-application-capability-navigator",
            scope: "canonical-continuation-contracts-only",
            operationCount: 25,
            countsAddUp: 25,
            countsMatchRecords: true,
            observerSideEffects: 0,
            applicationIdentity: true,
            canonicalIdentity: true,
            resultRole: "application-result",
            exactApplicationResultIdentity: true,
            exactCanonicalResultIdentity: false,
            exactContinuationResultIdentity: false,
        }
    );

    s.eq(
        "direct owner probes preserve exact identity and carry the availability authority",
        {
            sentenceStatus: sentenceResult?.availabilityStatus,
            sentenceOwnerAccepted:
                sentenceResult?.ownerInputAcceptanceProven,
            sentenceValidatorAccepted:
                sentenceResult?.ownerProbeResultValidated,
            sentenceAuthority: sentenceResult?.availabilityAuthority,
            sentenceExactIdentity:
                sentenceResult?.ownerProbeInputExactIdentityMatched,
            diagramStatus: vncDiagram?.availabilityStatus,
            diagramValidatorAccepted:
                vncDiagram?.ownerProbeResultValidated,
            diagramAuthority: vncDiagram?.availabilityAuthority,
            diagramExactIdentity:
                vncDiagram?.ownerProbeInputExactIdentityMatched,
        },
        {
            sentenceStatus: "available",
            sentenceOwnerAccepted: true,
            sentenceValidatorAccepted: true,
            sentenceAuthority: "canonical-owner-direct-probe",
            sentenceExactIdentity: true,
            diagramStatus: "available",
            diagramValidatorAccepted: true,
            diagramAuthority: "canonical-owner-direct-probe",
            diagramExactIdentity: true,
        }
    );

    s.eq(
        "every record reports installation and the frozen six-field projection without authorizing grammar",
        {
            allFrozen: frame?.operations.every(candidate => (
                Object.isFrozen(candidate)
                && Object.isFrozen(candidate.changes)
                && Object.isFrozen(candidate.sixFieldSignature)
                && Object.isFrozen(candidate.preserves)
                && Object.isFrozen(candidate.emits)
            )),
            installationStatesMatch: frame?.operations.every(candidate => (
                candidate.installedCapabilityState
                    === (candidate.capabilityInstalled
                        ? "installed"
                        : "missing")
                && candidate.installedOwnerValidatorState
                    === (!candidate.allOutputsHaveOwnerValidators
                        ? "missing-validator"
                        : candidate.allOwnerValidatorsInstalled
                            ? "installed"
                            : "missing")
            )),
            sixFieldsPresent: frame?.operations.every(candidate => (
                [
                    "requiresPresent",
                    "requiresAbsent",
                    "adds",
                    "removes",
                    "preserves",
                    "emits",
                ].every(field => Array.isArray(
                    candidate.sixFieldSignature?.[field]
                ))
                && candidate.changes.adds
                    === candidate.sixFieldSignature.adds
                && candidate.changes.removes
                    === candidate.sixFieldSignature.removes
                && candidate.preserves
                    === candidate.sixFieldSignature.preserves
                && candidate.emits
                    === candidate.sixFieldSignature.emits
            )),
            fixedClosureBindingsDeclared:
                CAPABILITY_CLOSURE_BINDING_OPERATION_IDS.length === 18
                && CAPABILITY_CLOSURE_BINDING_OPERATION_IDS.every(
                    operationId => {
                        const candidate = operation(frame, operationId);
                        return Boolean(
                            candidate
                            && candidate.ownerBindingContractDeclared === true
                            && candidate.ownerBindingFamily
                            && candidate.ownerBindingIssuerCapabilityName
                            && candidate.ownerBindingValidatorCapabilityName
                        );
                    }
                ),
            availableOnlyThroughCanonicalOwner:
                frame?.operations.every(candidate => {
                    if (candidate.availabilityStatus !== "available") {
                        return true;
                    }
                    const acceptedByDirectProbe = Boolean(
                        candidate.availabilityAuthority
                            === "canonical-owner-direct-probe"
                        && candidate.ownerProbeInvoked === true
                        && candidate.ownerProbeResultValidated === true
                    );
                    const acceptedByValidatedBinding = Boolean(
                        candidate.availabilityAuthority
                            === "canonical-owner-result-binding"
                        && candidate.ownerBindingInvoked === true
                        && candidate.ownerBindingFrameValidated === true
                        && candidate.ownerBindingInputResult
                            === candidate.ownerProbeInputResult
                    );
                    return Boolean(
                        candidate.ownerInputAcceptanceProven === true
                        && candidate.ownerEvaluationStatus === "accepted"
                        && (acceptedByDirectProbe
                            || acceptedByValidatedBinding)
                    );
                }),
            ownerOutcomesMatchAvailability:
                frame?.operations.every(candidate => (
                    candidate.ownerInputAcceptanceProven
                        === (candidate.availabilityStatus === "available")
                    && candidate.ownerRejectionProven
                        === (candidate.availabilityStatus === "incompatible")
                    && candidate.ownerAuthorizationStillRequired === true
                    && candidate.grammarAuthority === false
                )),
            noAvailableTypeMismatch:
                frame?.operations.every(candidate => (
                    candidate.availabilityStatus !== "available"
                    || candidate.typeCompatibilityStatus
                        !== "type-incompatible"
                )),
            frameNeverAuthorizes:
                frame?.ownerAuthorizationStatus
                    === "navigator-does-not-authorize-execution"
                && frame?.ownerAuthorizationStillRequired === true
                && frame?.directOwnerEvaluationIncluded === true
                && frame?.typeCompatibilityOnly === false
                && frame?.grammarAuthority === false,
        },
        {
            allFrozen: true,
            installationStatesMatch: true,
            sixFieldsPresent: true,
            fixedClosureBindingsDeclared: true,
            availableOnlyThroughCanonicalOwner: true,
            ownerOutcomesMatchAvailability: true,
            noAvailableTypeMismatch: true,
            frameNeverAuthorizes: true,
        }
    );

    const nncReceipt = issueOrdinaryNnc(ctx);
    const exactNncSlot = nncReceipt.canonicalResult.typedSlotFrame;
    const observationsBeforeNncNavigator = atlasObservations.length;
    const nncFrame =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(
            nncReceipt
        );
    const nncSentence = operation(nncFrame, "nnc:sentence-surface");
    const nncDiagram = operation(nncFrame, "nnc:diagram");
    s.eq(
        "a visible NNC Result reuses its registered exact typed-slot carrier for both direct owners",
        {
            valid:
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    nncFrame
                ),
            resultRole: nncFrame?.resultRole,
            emittedUnitKinds: nncFrame?.emittedUnitKinds,
            sentence: [
                nncSentence?.availabilityStatus,
                nncSentence?.ownerProbeResultKind,
                nncSentence?.ownerProbeResultValidated,
                nncSentence?.ownerProbeInputResult === exactNncSlot,
                nncSentence?.ownerProbeInputResultRole,
                nncSentence?.ownerProbeInputUnitKinds,
                nncSentence
                    ?.ownerProbeInputExactIdentityMatched,
                nncSentence
                    ?.ownerProbeInputExactCanonicalResultIdentity,
                nncSentence
                    ?.ownerProbeInputExactContinuationResultIdentity,
            ],
            diagram: [
                nncDiagram?.availabilityStatus,
                nncDiagram?.ownerProbeResultKind,
                nncDiagram?.ownerProbeResultValidated,
                nncDiagram?.ownerProbeInputResult === exactNncSlot,
                nncDiagram?.ownerProbeInputResultRole,
                nncDiagram?.ownerProbeInputUnitKinds,
                nncDiagram
                    ?.ownerProbeInputExactIdentityMatched,
                nncDiagram
                    ?.ownerProbeInputExactCanonicalResultIdentity,
                nncDiagram
                    ?.ownerProbeInputExactContinuationResultIdentity,
            ],
            cachedIdentity:
                ctx.getClassicalGrammarApplicationCapabilityNavigator(
                    nncReceipt
                ) === nncFrame,
            exactCarrierStillNavigable:
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    ctx.getClassicalGrammarApplicationCapabilityNavigator(
                        exactNncSlot
                    )
                ),
            copiedCarrierRejected:
                ctx.getClassicalGrammarApplicationCapabilityNavigator({
                    ...exactNncSlot,
                }),
            observerSideEffects:
                atlasObservations.length - observationsBeforeNncNavigator,
        },
        {
            valid: true,
            resultRole: "application-result",
            emittedUnitKinds: [
                "nnc-result",
                "nnc-embeddable-result",
            ],
            sentence: [
                "available",
                "classical-nahuatl-nnc-sentence-surface-frame",
                true,
                true,
                "continuation-result",
                [
                    "nnc-diagram-slot-frame",
                    "nnc-sentence-slot-frame",
                ],
                true,
                false,
                true,
            ],
            diagram: [
                "available",
                "classical-nahuatl-nnc-diagrammatic-frame",
                true,
                true,
                "continuation-result",
                [
                    "nnc-diagram-slot-frame",
                    "nnc-sentence-slot-frame",
                ],
                true,
                false,
                true,
            ],
            cachedIdentity: true,
            exactCarrierStillNavigable: true,
            copiedCarrierRejected: null,
            observerSideEffects: 0,
        }
    );

    const canonicalFrame =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(
            receipt.canonicalResult
        );
    s.eq(
        "an exact canonical Result retains its distinct identity role",
        {
            valid:
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    canonicalFrame
                ),
            applicationIdentity:
                canonicalFrame?.applicationResult === receipt,
            exactIdentity:
                canonicalFrame?.exactResult === receipt.canonicalResult,
            resultRole: canonicalFrame?.resultRole,
            exactApplicationResultIdentity:
                canonicalFrame?.exactApplicationResultIdentity,
            exactCanonicalResultIdentity:
                canonicalFrame?.exactCanonicalResultIdentity,
            exactContinuationResultIdentity:
                canonicalFrame?.exactContinuationResultIdentity,
        },
        {
            valid: true,
            applicationIdentity: true,
            exactIdentity: true,
            resultRole: "canonical-result",
            exactApplicationResultIdentity: false,
            exactCanonicalResultIdentity: true,
            exactContinuationResultIdentity: false,
        }
    );

    s.eq(
        "copies, strings, lesson metadata, and copied navigator frames fail closed",
        [
            ctx.getClassicalGrammarApplicationCapabilityNavigator({
                ...receipt,
            }),
            ctx.getClassicalGrammarApplicationCapabilityNavigator({
                ...receipt.canonicalResult,
            }),
            ctx.getClassicalGrammarApplicationCapabilityNavigator({
                ...exactNncSlot,
            }),
            ctx.getClassicalGrammarApplicationCapabilityNavigator("ahci"),
            ctx.getClassicalGrammarApplicationCapabilityNavigator({
                lessonNumber: 27,
                operationId: "vnc:derivational-operation",
            }),
            ctx.isClassicalGrammarApplicationCapabilityNavigator({
                ...frame,
            }),
        ],
        [null, null, null, null, null, false]
    );

    const exactOrdinarySource = ctx.issueCanonicalNncSourceFrame({
        stem: "tēuc",
    });
    const ordinarySourceNavigator =
        ctx.getClassicalGrammarApplicationTypedSourceCapabilityNavigator(
            exactOrdinarySource
        );
    const ordinarySourceOperation = operation(
        ordinarySourceNavigator,
        "nnc:ordinary"
    );
    const pronominalSourceOperation = operation(
        ordinarySourceNavigator,
        "nnc:pronominal"
    );
    const ordinaryResultOperation = operation(
        ordinarySourceNavigator,
        "nnc:sentence-surface"
    );
    s.eq(
        "an exact ordinary NNC Source receives its owner-preflighted route and truthful aggregate counts",
        {
            exactSource:
                ctx.isIssuedCanonicalNncSourceFrame(exactOrdinarySource),
            valid:
                ctx.isClassicalGrammarApplicationTypedSourceCapabilityNavigator(
                    ordinarySourceNavigator
                ),
            genericIdentity:
                ctx.getClassicalGrammarApplicationCapabilityNavigator(
                    exactOrdinarySource
                ) === ordinarySourceNavigator,
            genericValid:
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    ordinarySourceNavigator
                ),
            frame: [
                ordinarySourceNavigator?.inputRole,
                ordinarySourceNavigator?.operationCount,
                ordinarySourceNavigator?.availableCount
                    + ordinarySourceNavigator?.missingPrerequisiteCount
                    + ordinarySourceNavigator?.incompatibleCount,
                navigatorCountsMatchRecords(ordinarySourceNavigator),
                ordinarySourceNavigator?.sourceUnitKinds,
                ordinarySourceNavigator?.sourceContractOperationIds,
            ],
            ordinary: [
                ordinarySourceOperation?.availabilityStatus,
                ordinarySourceOperation?.availabilityReason,
                ordinarySourceOperation?.sourceIdentityMatched,
                ordinarySourceOperation?.ownerPreflightFrameValidated,
                ordinarySourceOperation?.ownerChoicesRequired,
                ordinarySourceOperation?.ownerPreflightFrame?.sourceFrame
                    === exactOrdinarySource,
                ordinarySourceOperation?.availabilityAuthority,
            ],
            pronominal: [
                pronominalSourceOperation?.availabilityStatus,
                pronominalSourceOperation?.availabilityReason,
                pronominalSourceOperation?.sourceIdentityMatched,
            ],
            resultRoute: [
                ordinaryResultOperation?.availabilityStatus,
                ordinaryResultOperation?.availabilityReason,
            ],
            allKeepExactSource:
                ordinarySourceNavigator?.operations.every(
                    candidate => candidate.exactSource
                        === exactOrdinarySource
                ),
        },
        {
            exactSource: true,
            valid: true,
            genericIdentity: true,
            genericValid: true,
            frame: [
                "exact-owner-issued-source",
                25,
                25,
                true,
                ["ordinary-nnc-source"],
                ["nnc:ordinary"],
            ],
            ordinary: [
                "available",
                "canonical-owner-choices-required",
                true,
                true,
                true,
                true,
                "canonical-owner-source-preflight",
            ],
            pronominal: [
                "missing-prerequisite",
                "different-owner-issued-source-required",
                false,
            ],
            resultRoute: [
                "missing-prerequisite",
                "canonical-result-required",
            ],
            allKeepExactSource: true,
        }
    );

    const exactPronominalSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({
            stem: "yeh",
        });
    const pronominalSourceNavigator =
        ctx.getClassicalGrammarApplicationTypedSourceCapabilityNavigator(
            exactPronominalSource
        );
    const selectedPronominalSourceOperation = operation(
        pronominalSourceNavigator,
        "nnc:pronominal"
    );
    s.eq(
        "the same Source contract selects the pronominal owner without admitting an ordinary copy",
        {
            valid:
                ctx.isClassicalGrammarApplicationTypedSourceCapabilityNavigator(
                    pronominalSourceNavigator
                ),
            counts: {
                operationCount: pronominalSourceNavigator?.operationCount,
                countsAddUp:
                    pronominalSourceNavigator?.availableCount
                    + pronominalSourceNavigator?.missingPrerequisiteCount
                    + pronominalSourceNavigator?.incompatibleCount,
                countsMatchRecords:
                    navigatorCountsMatchRecords(pronominalSourceNavigator),
            },
            operation: [
                selectedPronominalSourceOperation?.operationId,
                selectedPronominalSourceOperation?.availabilityStatus,
                selectedPronominalSourceOperation?.availabilityReason,
                selectedPronominalSourceOperation
                    ?.ownerPreflightFrame?.sourceFrame
                    === exactPronominalSource,
            ],
            copiedSource:
                ctx.getClassicalGrammarApplicationTypedSourceCapabilityNavigator({
                    ...exactPronominalSource,
                }),
            copiedNavigator:
                ctx.isClassicalGrammarApplicationTypedSourceCapabilityNavigator({
                    ...pronominalSourceNavigator,
                }),
        },
        {
            valid: true,
            counts: {
                operationCount: 25,
                countsAddUp: 25,
                countsMatchRecords: true,
            },
            operation: [
                "nnc:pronominal",
                "available",
                "canonical-owner-choices-required",
                true,
            ],
            copiedSource: null,
            copiedNavigator: false,
        }
    );

    const exactVncSource =
        receipt.canonicalResult.resultFrame.sourceMachineryFrame;
    const vncSourceNavigator =
        ctx.getClassicalGrammarApplicationTypedSourceCapabilityNavigator(
            exactVncSource
        );
    const vncSourceOperation = operation(
        vncSourceNavigator,
        "vnc:application"
    );
    const lateVncSourceOperation = operation(
        vncSourceNavigator,
        "vnc:derivational-operation"
    );
    s.eq(
        "exact VNC machinery keeps causative and applicative choices under the standard application owner",
        {
            exactSource:
                ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(
                    exactVncSource
                ),
            valid:
                ctx.isClassicalGrammarApplicationTypedSourceCapabilityNavigator(
                    vncSourceNavigator
                ),
            counts: {
                operationCount: vncSourceNavigator?.operationCount,
                countsAddUp:
                    vncSourceNavigator?.availableCount
                    + vncSourceNavigator?.missingPrerequisiteCount
                    + vncSourceNavigator?.incompatibleCount,
                countsMatchRecords:
                    navigatorCountsMatchRecords(vncSourceNavigator),
            },
            operation: [
                vncSourceOperation?.availabilityStatus,
                vncSourceOperation?.availabilityReason,
                vncSourceOperation?.ownerPreflightFrameValidated,
                vncSourceOperation?.ownerChoicesRequired,
                vncSourceOperation?.ownerPreflightFrames?.map(
                    preflight => preflight.derivationType
                ),
                vncSourceOperation?.ownerPreflightFrames?.every(
                    preflight => (
                        ctx.isClassicalNahuatlVncDerivationOptionInventory(
                            preflight
                        )
                        && preflight.sourceMachineryFrame === exactVncSource
                        && preflight.optionCount > 0
                    )
                ),
            ],
            lateOperation: [
                lateVncSourceOperation?.availabilityStatus,
                lateVncSourceOperation?.availabilityReason,
                lateVncSourceOperation?.sourceContractDeclared,
            ],
            copiedSource:
                ctx.getClassicalGrammarApplicationTypedSourceCapabilityNavigator({
                    ...exactVncSource,
                }),
        },
        {
            exactSource: true,
            valid: true,
            counts: {
                operationCount: 25,
                countsAddUp: 25,
                countsMatchRecords: true,
            },
            operation: [
                "available",
                "canonical-owner-choices-required",
                true,
                true,
                ["causative", "applicative"],
                true,
            ],
            lateOperation: [
                "missing-prerequisite",
                "canonical-result-required",
                false,
            ],
            copiedSource: null,
        }
    );

    const particleRoot =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            frame,
            "particle:result",
            {}
        );
    const typedSourceIds = ordinarySourceNavigator.operations
        .filter(candidate => candidate.sourceContractDeclared === true)
        .map(candidate => candidate.operationId)
        .sort();
    const directResultIds = frame.operations
        .filter(candidate => candidate.directOwnerProbeInstalled === true)
        .map(candidate => candidate.operationId)
        .sort();
    const resultBindingIds = frame.operations
        .filter(candidate => candidate.ownerBindingContractDeclared === true)
        .map(candidate => candidate.operationId)
        .sort();
    const rootConstructorIds =
        ctx.isClassicalGrammarTypedSourceOperationBindingFrame(particleRoot)
        && particleRoot.family === "source-independent-root-constructor"
            ? [particleRoot.operationId]
            : [];
    const modeByOperationId = new Map(
        frame.operationIds.map(operationId => [operationId, []])
    );
    [
        ["typed-source", typedSourceIds],
        ["direct-result", directResultIds],
        ["result-binding", resultBindingIds],
        ["root-constructor", rootConstructorIds],
    ].forEach(([mode, operationIds]) => {
        operationIds.forEach(operationId => {
            modeByOperationId.get(operationId)?.push(mode);
        });
    });
    s.eq(
        "all 25 visible pathways have a truthful entry mode, with one intentional VNC overlap and one independent particle root",
        {
            sameUniverse: ordinarySourceNavigator.operationIds.every(
                operationId => frame.operationIds.includes(operationId)
            ),
            typedSourceIds,
            directResultIds,
            resultBindingIds,
            rootConstructorIds,
            uniqueCovered: [...modeByOperationId.values()].filter(
                modes => modes.length > 0
            ).length,
            qualifiedMemberships: [...modeByOperationId.values()].reduce(
                (count, modes) => count + modes.length,
                0
            ),
            uncovered: [...modeByOperationId]
                .filter(([, modes]) => modes.length === 0)
                .map(([operationId]) => operationId),
            overlaps: [...modeByOperationId]
                .filter(([, modes]) => modes.length > 1)
                .map(([operationId, modes]) => [
                    operationId,
                    [...modes].sort(),
                ]),
            particle: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    particleRoot
                ),
                particleRoot?.family,
                particleRoot?.operationId,
                particleRoot?.navigatorInputConsumed,
            ],
        },
        {
            sameUniverse: true,
            typedSourceIds: [
                "nnc:ordinary",
                "nnc:pronominal",
                "vnc:application",
            ],
            directResultIds: [
                "nnc:diagram",
                "nnc:sentence-surface",
                "vnc:diagram",
                "vnc:sentence-result",
            ],
            resultBindingIds: [...CAPABILITY_CLOSURE_BINDING_OPERATION_IDS]
                .sort(),
            rootConstructorIds: ["particle:result"],
            uniqueCovered: 25,
            qualifiedMemberships: 26,
            uncovered: [],
            overlaps: [[
                "vnc:application",
                ["result-binding", "typed-source"],
            ]],
            particle: [
                true,
                "source-independent-root-constructor",
                "particle:result",
                false,
            ],
        }
    );

    unsubscribe();

    return s;
}

module.exports = { run };
