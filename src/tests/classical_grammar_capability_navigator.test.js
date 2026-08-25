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
    const derivation = operation(frame, "vnc:derivational-operation");
    const denominal = operation(frame, "vnc:denominal");
    const newVnc = operation(frame, "vnc:application");
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
            availableCount: frame?.availableCount,
            missingPrerequisiteCount:
                frame?.missingPrerequisiteCount,
            incompatibleCount: frame?.incompatibleCount,
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
            availableCount: 2,
            missingPrerequisiteCount: 23,
            incompatibleCount: 0,
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
        "only a directly accepting owner can raise a type match to available",
        {
            derivationStatus: derivation?.availabilityStatus,
            derivationTypeStatus: derivation?.typeCompatibilityStatus,
            derivationReason: derivation?.availabilityReason,
            derivationSharedKinds: derivation?.sharedUnitKinds,
            sentenceStatus: sentenceResult?.availabilityStatus,
            sentenceOwnerAccepted:
                sentenceResult?.ownerInputAcceptanceProven,
            sentenceValidatorAccepted:
                sentenceResult?.ownerProbeResultValidated,
            sentenceAuthority: sentenceResult?.availabilityAuthority,
            diagramStatus: vncDiagram?.availabilityStatus,
            diagramReason: vncDiagram?.availabilityReason,
            denominalStatus: denominal?.availabilityStatus,
            denominalTypeStatus: denominal?.typeCompatibilityStatus,
            denominalReason: denominal?.availabilityReason,
            newVncStatus: newVnc?.availabilityStatus,
            newVncReason: newVnc?.availabilityReason,
        },
        {
            derivationStatus: "missing-prerequisite",
            derivationTypeStatus: "type-compatible",
            derivationReason: "direct-owner-probe-not-installed",
            derivationSharedKinds: ["vnc-result"],
            sentenceStatus: "available",
            sentenceOwnerAccepted: true,
            sentenceValidatorAccepted: true,
            sentenceAuthority: "canonical-owner-direct-probe",
            diagramStatus: "available",
            diagramReason: "canonical-owner-direct-result-validated",
            denominalStatus: "missing-prerequisite",
            denominalTypeStatus: "type-incompatible",
            denominalReason:
                "continuation-unit-mismatch-owner-rejection-not-proven",
            newVncStatus: "missing-prerequisite",
            newVncReason: "direct-owner-probe-not-installed",
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
            exactOwnerEvaluation: frame?.operations.every(candidate => (
                candidate.ownerProbeResultValidated
                    === (candidate.availabilityStatus === "available")
                && candidate.ownerInputAcceptanceProven
                    === (candidate.availabilityStatus === "available")
                && candidate.ownerRejectionProven
                    === (candidate.availabilityStatus === "incompatible")
                && candidate.ownerAuthorizationStillRequired === true
                && candidate.grammarAuthority === false
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
            exactOwnerEvaluation: true,
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
        "an exact ordinary NNC Source receives one owner-preflighted route and 24 truthful pending routes",
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
                ordinarySourceNavigator?.availableCount,
                ordinarySourceNavigator?.missingPrerequisiteCount,
                ordinarySourceNavigator?.incompatibleCount,
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
                1,
                24,
                0,
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
            counts: [
                pronominalSourceNavigator?.operationCount,
                pronominalSourceNavigator?.availableCount,
                pronominalSourceNavigator?.missingPrerequisiteCount,
                pronominalSourceNavigator?.incompatibleCount,
            ],
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
            counts: [25, 1, 24, 0],
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
        "vnc:derivational-operation"
    );
    s.eq(
        "exact VNC derivational machinery exposes both owner-issued derivation inventories",
        {
            exactSource:
                ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(
                    exactVncSource
                ),
            valid:
                ctx.isClassicalGrammarApplicationTypedSourceCapabilityNavigator(
                    vncSourceNavigator
                ),
            counts: [
                vncSourceNavigator?.operationCount,
                vncSourceNavigator?.availableCount,
                vncSourceNavigator?.missingPrerequisiteCount,
                vncSourceNavigator?.incompatibleCount,
            ],
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
            copiedSource:
                ctx.getClassicalGrammarApplicationTypedSourceCapabilityNavigator({
                    ...exactVncSource,
                }),
        },
        {
            exactSource: true,
            valid: true,
            counts: [25, 1, 24, 0],
            operation: [
                "available",
                "canonical-owner-choices-required",
                true,
                true,
                ["causative", "applicative"],
                true,
            ],
            copiedSource: null,
        }
    );

    unsubscribe();

    return s;
}

module.exports = { run };
