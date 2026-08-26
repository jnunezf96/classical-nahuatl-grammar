"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_typed_source_operation_binding");
    const initialResult = ctx.requestClassicalVncApplicationResult({
        sourceStem: "ahci",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
    });
    const exactSource = initialResult.resultFrame.selectedMachineryFrame;
    const navigator =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(exactSource);

    const initialBinding =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            navigator,
            "vnc:application",
            {}
        );
    s.eq(
        "the application boundary stages the exact navigator Source and asks only for the first owner choice",
        {
            navigatorValid:
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    navigator
                ),
            bindingValid:
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    initialBinding
                ),
            exactSource:
                initialBinding.exactSource === exactSource,
            status: initialBinding.bindingStatus,
            required: initialBinding.requiredChoiceIds,
            choices:
                initialBinding.choiceOptionProjection
                    .requestedDerivation.map(option => option.optionId),
            authority: initialBinding.grammarAuthority,
        },
        {
            navigatorValid: true,
            bindingValid: true,
            exactSource: true,
            status: "choices-required",
            required: ["requestedDerivation"],
            choices: ["direct", "causative", "applicative"],
            authority: false,
        }
    );

    const causativeChoice =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            navigator,
            "vnc:application",
            { requestedDerivation: "causative" }
        );
    const derivationOptionId = causativeChoice.choiceOptionProjection
        .derivationOptionId[0].optionId;
    const participantChoice =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            navigator,
            "vnc:application",
            { requestedDerivation: "causative", derivationOptionId }
        );
    const ready =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            navigator,
            "vnc:application",
            {
                requestedDerivation: "causative",
                derivationOptionId,
                causativeObjectKind: "specific-projective",
            }
        );
    s.eq(
        "the aggregate advances only through the owner-issued missing choices",
        {
            derivation: [
                causativeChoice.bindingStatus,
                causativeChoice.requiredChoiceIds,
                causativeChoice.choiceOptionProjection
                    .derivationOptionId.length,
            ],
            participant: [
                participantChoice.bindingStatus,
                participantChoice.requiredChoiceIds,
                participantChoice.choiceOptionProjection
                    .causativeObjectKind.map(option => option.optionId),
            ],
            ready: [
                ready.bindingStatus,
                ready.requiredChoiceIds.length,
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    ready
                ),
            ],
        },
        {
            derivation: ["choices-required", ["derivationOptionId"], 2],
            participant: [
                "choices-required",
                ["causativeObjectKind"],
                ["specific-projective", "reflexive"],
            ],
            ready: ["ready", 0, true],
        }
    );

    const applied =
        ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(ready);
    const capture = ctx.captureClassicalGrammarApplicationResult(
        applied,
        "typed-source-operation-binding-proof"
    );
    s.eq(
        "Apply executes once through the standard application boundary and returns one exact continuable Result",
        {
            receipt: [
                ctx.isClassicalGrammarApplicationResult(applied),
                applied?.authorizationStatus,
                applied?.operationId,
            ],
            ownerResult: [
                ctx.isClassicalNahuatlVncApplicationFrame(
                    applied?.canonicalResult
                ),
                applied?.canonicalResult?.resultFrame
                    ?.sourceMachineryFrame === exactSource,
                applied?.canonicalResult?.resultFrame
                    ?.selectedMachineryFrame !== exactSource,
                applied?.canonicalResult?.resultFrame?.selectedDerivation,
            ],
            capture: [
                ctx.isClassicalGrammarApplicationResultCapture(
                    capture,
                    "typed-source-operation-binding-proof"
                ),
                capture?.canonicalResult === applied?.canonicalResult,
            ],
            secondExecution:
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
                    ready
                ),
        },
        {
            receipt: [true, "authorized", "vnc:application"],
            ownerResult: [true, true, true, "causative"],
            capture: [true, true],
            secondExecution: null,
        }
    );

    s.eq(
        "copied navigators and copied bindings cannot stage or execute",
        {
            copiedNavigator:
                ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
                    { ...navigator },
                    "vnc:application",
                    { requestedDerivation: "direct" }
                ),
            copiedBindingValid:
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame({
                    ...ready,
                }),
            copiedBindingExecution:
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame({
                    ...ready,
                }),
        },
        {
            copiedNavigator: null,
            copiedBindingValid: false,
            copiedBindingExecution: null,
        }
    );

    const ordinarySource = ctx.issueCanonicalNncSourceFrame({
        stem: "cal",
    });
    const ordinaryNavigator =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(
            ordinarySource
        );
    const ordinaryDefault =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            ordinaryNavigator,
            "nnc:ordinary",
            {}
        );
    s.eq(
        "an ordinary NNC exact Source uses the owner's truthful defaults and keeps its operation arguments private",
        {
            source: ctx.isClassicalNahuatlOrdinaryNncSourceFrame(
                ordinarySource
            ),
            navigator:
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    ordinaryNavigator
                ),
            binding:
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    ordinaryDefault
                ),
            identity: ordinaryDefault?.exactSource === ordinarySource,
            status: ordinaryDefault?.bindingStatus,
            defaults: [
                ordinaryDefault?.effectiveSelections?.state,
                ordinaryDefault?.effectiveSelections?.subject,
            ],
            privateArgs: [
                ordinaryDefault?.ownerBindingFrame
                    ?.privateExecutionArguments,
                ordinaryDefault?.ownerBindingFrame
                    ?.executionArgs?.length,
            ],
        },
        {
            source: true,
            navigator: true,
            binding: true,
            identity: true,
            status: "ready",
            defaults: ["absolutive", "3common"],
            privateArgs: [true, 0],
        }
    );

    const ordinaryApplied =
        ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
            ordinaryDefault
        );
    s.eq(
        "ordinary NNC Apply executes the private exact Source and owner operation once through the standard application boundary",
        {
            receipt: [
                ctx.isClassicalGrammarApplicationResult(
                    ordinaryApplied
                ),
                ordinaryApplied?.authorizationStatus,
                ordinaryApplied?.operationId,
            ],
            result: [
                ctx.isClassicalNahuatlOrdinaryNncResult(
                    ordinaryApplied?.canonicalResult
                ),
                ordinaryApplied?.canonicalResult?.sourceFrame
                    === ordinarySource,
                ordinaryApplied?.canonicalResult?.surfaceRealization,
            ],
            secondExecution:
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
                    ordinaryDefault
                ),
        },
        {
            receipt: [true, "authorized", "nnc:ordinary"],
            result: [true, true, "calli"],
            secondExecution: null,
        }
    );

    const pluralSource = ctx.issueCanonicalNncSourceFrame({
        stem: "mich",
    });
    const pluralNavigator =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(
            pluralSource
        );
    const pluralChoices =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            pluralNavigator,
            "nnc:ordinary",
            { state: "absolutive", subject: "3pl" }
        );
    const pluralConnector = pluralChoices?.choiceOptionProjection
        ?.pluralConnector?.find(option => (
            option.availabilityStatus === "available"
        ))?.optionId || "";
    const pluralReady =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            pluralNavigator,
            "nnc:ordinary",
            {
                state: "absolutive",
                subject: "3pl",
                pluralConnector,
            }
        );
    s.eq(
        "ordinary NNC exposes only a genuinely missing owner-projected plural connector before becoming ready",
        {
            choices: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    pluralChoices
                ),
                pluralChoices?.bindingStatus,
                pluralChoices?.requiredChoiceIds,
                pluralChoices?.choiceOptionProjection?.pluralConnector
                    ?.map(option => [
                        option.optionId,
                        option.availabilityStatus,
                        option.grammarAuthority,
                    ]),
            ],
            ready: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    pluralReady
                ),
                pluralReady?.bindingStatus,
                pluralReady?.requiredChoiceIds?.length,
            ],
        },
        {
            choices: [
                true,
                "choices-required",
                ["pluralConnector"],
                [
                    ["t-in", "available", false],
                    ["m-eh", "available", false],
                ],
            ],
            ready: [true, "ready", 0],
        }
    );

    const staleOrdinary =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            ordinaryNavigator,
            "nnc:ordinary",
            { state: "absolutive", possessor: "1sg" }
        );
    const forgedOrdinary =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            ordinaryNavigator,
            "nnc:ordinary",
            { subject: "not-an-owner-option" }
        );
    s.eq(
        "stale, forged, and copied ordinary NNC choices never become executable",
        {
            stale: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    staleOrdinary
                ),
                staleOrdinary?.bindingStatus,
                staleOrdinary?.blockReason,
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
                    staleOrdinary
                ),
            ],
            forged: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    forgedOrdinary
                ),
                forgedOrdinary?.bindingStatus,
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
                    forgedOrdinary
                ),
            ],
            copied: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame({
                    ...pluralReady,
                }),
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame({
                    ...pluralReady,
                }),
            ],
        },
        {
            stale: [
                true,
                "rejected",
                "ordinary-nnc-absolutive-state-has-no-possessor-operation",
                null,
            ],
            forged: [true, "rejected", null],
            copied: [false, null],
        }
    );

    const pronominalSource = ctx.issueCanonicalNncSourceFrame({
        stem: "eh",
    });
    const pronominalNavigator =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(
            pronominalSource
        );
    const pronominalDefault =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            pronominalNavigator,
            "nnc:pronominal",
            {}
        );
    const pronominalApplied =
        ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
            pronominalDefault
        );
    const forgedPronominal =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            pronominalNavigator,
            "nnc:pronominal",
            { subject: "not-an-owner-option" }
        );
    s.eq(
        "a pronominal NNC exact Source takes the preflight's subject default, returns its exact Result, and rejects forged choices",
        {
            source: ctx.isClassicalNahuatlPronominalNncSourceFrame(
                pronominalSource
            ),
            binding: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    pronominalDefault
                ),
                pronominalDefault?.bindingStatus,
                pronominalDefault?.effectiveSelections?.subject,
                pronominalDefault?.ownerBindingFrame
                    ?.executionArgs?.length,
            ],
            receipt: [
                ctx.isClassicalGrammarApplicationResult(
                    pronominalApplied
                ),
                pronominalApplied?.authorizationStatus,
                pronominalApplied?.operationId,
                ctx.isClassicalNahuatlPronominalNncResult(
                    pronominalApplied?.canonicalResult
                ),
                pronominalApplied?.canonicalResult?.sourceFrame
                    === pronominalSource,
            ],
            forged: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    forgedPronominal
                ),
                forgedPronominal?.bindingStatus,
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
                    forgedPronominal
                ),
            ],
            secondExecution:
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
                    pronominalDefault
                ),
        },
        {
            source: true,
            binding: [true, "ready", "3sg", 0],
            receipt: [
                true,
                "authorized",
                "nnc:pronominal",
                true,
                true,
            ],
            forged: [true, "rejected", null],
            secondExecution: null,
        }
    );

    const specialSource = ctx.issueCanonicalNncSourceFrame({
        stem: "itl-ah",
        embedStem: "itl",
        matrixStem: "ah",
    });
    const specialNavigator =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(
            specialSource
        );
    const specialChoices =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            specialNavigator,
            "nnc:pronominal",
            { subject: "3sg" }
        );
    const specialReady =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            specialNavigator,
            "nnc:pronominal",
            { subject: "3sg", specialHumanUse: true }
        );
    const specialApplied =
        ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
            specialReady
        );
    s.eq(
        "pronominal NNC asks for the owner's special-human choice only when that context genuinely requires it",
        {
            choices: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    specialChoices
                ),
                specialChoices?.bindingStatus,
                specialChoices?.requiredChoiceIds,
                specialChoices?.choiceOptionProjection?.specialHumanUse
                    ?.map(option => [
                        option.optionId,
                        option.availabilityStatus,
                    ]),
            ],
            ready: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    specialReady
                ),
                specialReady?.bindingStatus,
            ],
            result: [
                ctx.isClassicalGrammarApplicationResult(
                    specialApplied
                ),
                ctx.isClassicalNahuatlPronominalNncResult(
                    specialApplied?.canonicalResult
                ),
                specialApplied?.canonicalResult?.sourceFrame
                    === specialSource,
            ],
        },
        {
            choices: [
                true,
                "choices-required",
                ["specialHumanUse"],
                [
                    ["false", "incompatible"],
                    ["true", "available"],
                ],
            ],
            ready: [true, "ready"],
            result: [true, true, true],
        }
    );

    const resultNavigator =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(
            ordinaryApplied
        );
    const particleChoice =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            resultNavigator,
            "particle:result",
            {}
        );
    const particleReady =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            resultNavigator,
            "particle:result",
            { particleId: "l3-auh-conjunctor" }
        );
    const particleApplied =
        ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
            particleReady
        );
    s.eq(
        "Particle Result is an honest root constructor: it asks for one owner-projected particle, consumes no current input, and returns one exact Result",
        {
            choices: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    particleChoice
                ),
                particleChoice?.family,
                particleChoice?.navigatorInputConsumed,
                particleChoice?.bindingStatus,
                particleChoice?.requiredChoiceIds,
                particleChoice?.choiceOptionProjection?.particleId
                    ?.find(option => (
                        option.optionId === "l3-auh-conjunctor"
                    )),
            ],
            ready: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    particleReady
                ),
                particleReady?.bindingStatus,
                particleReady?.requiredChoiceIds?.length,
                particleReady?.ownerBindingFrame
                    ?.exactParticleSourceFrame?.particleId,
            ],
            receipt: [
                ctx.isClassicalGrammarApplicationResult(
                    particleApplied
                ),
                particleApplied?.authorizationStatus,
                particleApplied?.operationId,
                ctx.isClassicalNahuatlParticleResultFrame(
                    particleApplied?.canonicalResult
                ),
                particleApplied?.canonicalResult?.sourceFrame
                    === particleReady?.ownerBindingFrame
                        ?.exactParticleSourceFrame,
            ],
            secondExecution:
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
                    particleReady
                ),
        },
        {
            choices: [
                true,
                "source-independent-root-constructor",
                false,
                "choices-required",
                ["particleId"],
                {
                    choiceId: "particleId",
                    optionId: "l3-auh-conjunctor",
                    label: "auh",
                    description: "and; but",
                    presentationGroupId: "conjunctor",
                    availabilityStatus: "available",
                    blockReason: "",
                    ownerOptionProjected: true,
                    ownerOptionAuthority: false,
                    grammarAuthority: false,
                    formulaStringAuthority: false,
                    surfaceStringAuthority: false,
                },
            ],
            ready: [true, "ready", 0, "l3-auh-conjunctor"],
            receipt: [
                true,
                "authorized",
                "particle:result",
                true,
                true,
            ],
            secondExecution: null,
        }
    );

    const unknownParticle =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            resultNavigator,
            "particle:result",
            { particleId: "not-an-owner-particle" }
        );
    const forgedParticle =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            resultNavigator,
            "particle:result",
            {
                particleId: "l3-auh-conjunctor",
                grammarAuthority: "true",
            }
        );
    s.eq(
        "Particle root construction fails closed for copied identity, unknown particles, extra authority fields, and copied bindings",
        {
            copiedNavigator:
                ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
                    { ...resultNavigator },
                    "particle:result",
                    { particleId: "l3-auh-conjunctor" }
                ),
            unknown: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    unknownParticle
                ),
                unknownParticle?.bindingStatus,
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
                    unknownParticle
                ),
            ],
            forged: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    forgedParticle
                ),
                forgedParticle?.bindingStatus,
                forgedParticle?.blockReason,
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame(
                    forgedParticle
                ),
            ],
            copiedBinding: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame({
                    ...particleReady,
                }),
                ctx.executeClassicalGrammarTypedSourceOperationBindingFrame({
                    ...particleReady,
                }),
            ],
        },
        {
            copiedNavigator: null,
            unknown: [true, "rejected", null],
            forged: [
                true,
                "rejected",
                "canonical-particle-root-selections-invalid",
                null,
            ],
            copiedBinding: [false, null],
        }
    );

    return s;
}

module.exports = { run };
