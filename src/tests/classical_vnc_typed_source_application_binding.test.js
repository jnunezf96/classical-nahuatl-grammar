"use strict";

const { createSuite } = require("./runner");

function issueAhciSource(ctx) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "ahci",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
    });
}

function summarizeOptions(binding, choiceId) {
    return (binding.choiceOptionProjection?.[choiceId] || []).map(
        option => [
            option.optionId,
            option.availabilityStatus,
            option.grammarAuthority,
        ]
    );
}

function run(ctx = {}) {
    const s = createSuite(
        "classical_vnc_typed_source_application_binding"
    );

    s.eq(
        "the VNC API exposes one typed-Source binding issuer, validator, and executor",
        [
            ctx
                .CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND,
            ctx
                .CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_STATUSES,
            typeof ctx
                .issueClassicalNahuatlVncTypedSourceApplicationBindingFrame,
            typeof ctx
                .isClassicalNahuatlVncTypedSourceApplicationBindingFrame,
            typeof ctx
                .executeClassicalNahuatlVncTypedSourceApplicationBindingFrame,
        ],
        [
            "classical-nahuatl-vnc-typed-source-application-binding-frame",
            ["choices-required", "ready", "rejected"],
            "function",
            "function",
            "function",
        ]
    );

    const issuedSourceApplication = issueAhciSource(ctx);
    const exactSource =
        issuedSourceApplication.resultFrame.sourceMachineryFrame;
    const initial =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            {}
        );

    s.eq(
        "an exact owner-issued Source retains coordinate defaults and asks first for the genuine derivation choice",
        {
            sourceIssued:
                ctx.isClassicalNahuatlVncApplicationIssuedResultFrame(
                    issuedSourceApplication.resultFrame
                ),
            bindingValid:
                ctx.isClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    initial
                ),
            frozen: [
                Object.isFrozen(initial),
                Object.isFrozen(initial.requiredChoiceIds),
                Object.isFrozen(initial.choiceOptionProjection),
                Object.isFrozen(
                    initial.choiceOptionProjection.requestedDerivation
                ),
            ],
            status: initial.bindingStatus,
            required: initial.requiredChoiceIds,
            defaults: [
                initial.effectiveSelections.subject,
                initial.effectiveSelections.mood,
                initial.effectiveSelections.tense,
                initial.effectiveSelections.requestedVoice,
            ],
            routes: summarizeOptions(initial, "requestedDerivation"),
            executionArgs: initial.executionArgs.length,
            grammarAuthority: initial.choiceOptionProjection.grammarAuthority,
        },
        {
            sourceIssued: true,
            bindingValid: true,
            frozen: [true, true, true, true],
            status: "choices-required",
            required: ["requestedDerivation"],
            defaults: ["3sg", "indicative", "present", "active"],
            routes: [
                ["direct", "available", false],
                ["causative", "available", false],
                ["applicative", "available", false],
            ],
            executionArgs: 0,
            grammarAuthority: false,
        }
    );

    const direct =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            { requestedDerivation: "direct" }
        );
    const directResult =
        ctx.executeClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            direct
        );

    s.eq(
        "direct is a truthful ready default with no invented derivation inventory and executes exactly once",
        {
            valid:
                ctx.isClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    direct
                ),
            status: direct.bindingStatus,
            required: direct.requiredChoiceIds,
            ownerInventory: direct.ownerDerivationOptionInventory,
            ownerInventoryValidated: direct.ownerInventoryValidated,
            exactIdentity:
                direct.exactSourceMachineryFrame === exactSource,
            executionArgs: [
                direct.executionArgs.length,
                direct.executionArgs[0] === exactSource,
            ],
            result: [
                directResult?.authorizationStatus,
                directResult?.resultFrame?.surfaceRealization,
                ctx.isClassicalNahuatlVncApplicationFrame(directResult),
            ],
            secondExecution:
                ctx.executeClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    direct
                ),
        },
        {
            valid: true,
            status: "ready",
            required: [],
            ownerInventory: null,
            ownerInventoryValidated: true,
            exactIdentity: true,
            executionArgs: [2, true],
            result: ["authorized", "ahci", true],
            secondExecution: null,
        }
    );

    const staleDirect =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            {
                requestedDerivation: "direct",
                derivationOptionId: "stale-causative-option",
                causativeObjectKind: "specific-projective",
            }
        );
    s.eq(
        "an upstream derivation change rejects stale downstream choices at the public owner boundary",
        {
            valid:
                ctx.isClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    staleDirect
                ),
            status: staleDirect.bindingStatus,
            reason: staleDirect.blockReason,
            executionArgs: staleDirect.executionArgs.length,
            execution:
                ctx.executeClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    staleDirect
                ),
        },
        {
            valid: true,
            status: "rejected",
            reason:
                "classical-vnc-typed-source-application-inapplicable-selection:derivationOptionId",
            executionArgs: 0,
            execution: null,
        }
    );

    const causativeChoices =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            { requestedDerivation: "causative" }
        );
    const causativeOptionId =
        causativeChoices.choiceOptionProjection.derivationOptionId[0]
            ?.optionId || "";
    const causativeParticipantChoice =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            {
                requestedDerivation: "causative",
                derivationOptionId: causativeOptionId,
            }
        );
    const causativeReady =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            {
                requestedDerivation: "causative",
                derivationOptionId: causativeOptionId,
                causativeObjectKind: "specific-projective",
            }
        );
    const causativeResult =
        ctx.executeClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            causativeReady
        );

    s.eq(
        "causative routes come from the exact owner inventory and expose each subsequent genuine participant choice",
        {
            inventoryChoice: [
                causativeChoices.bindingStatus,
                causativeChoices.requiredChoiceIds,
                causativeChoices.ownerDerivationOptionInventory
                    ?.sourceMachineryFrame === exactSource,
                ctx.isClassicalNahuatlVncDerivationOptionInventory(
                    causativeChoices.ownerDerivationOptionInventory
                ),
                causativeChoices.choiceOptionProjection
                    .derivationOptionId.length,
                causativeChoices.executionArgs.length,
            ],
            participantChoice: [
                causativeParticipantChoice.bindingStatus,
                causativeParticipantChoice.requiredChoiceIds,
                causativeParticipantChoice.choiceOptionProjection
                    .causativeObjectKind.map(option => option.optionId),
                causativeParticipantChoice.executionArgs.length,
            ],
            ready: [
                causativeReady.bindingStatus,
                causativeReady.requiredChoiceIds.length,
                causativeReady.executionArgs.length,
                ctx.isClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    causativeReady
                ),
            ],
            result: [
                causativeResult?.authorizationStatus,
                causativeResult?.resultFrame?.selectedDerivation,
                causativeResult?.resultFrame?.sourceMachineryFrame
                    === exactSource,
                causativeResult?.controlFrame?.selectedDerivationOptionId
                    === causativeOptionId,
                ctx.isClassicalNahuatlVncApplicationFrame(
                    causativeResult
                ),
            ],
        },
        {
            inventoryChoice: [
                "choices-required",
                ["derivationOptionId"],
                true,
                true,
                2,
                0,
            ],
            participantChoice: [
                "choices-required",
                ["causativeObjectKind"],
                ["specific-projective", "reflexive"],
                0,
            ],
            ready: ["ready", 0, 2, true],
            result: ["authorized", "causative", true, true, true],
        }
    );

    const applicativeChoices =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            { requestedDerivation: "applicative" }
        );
    const applicativeOptionId =
        applicativeChoices.choiceOptionProjection.derivationOptionId[0]
            ?.optionId || "";
    const applicativePersonChoice =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            {
                requestedDerivation: "applicative",
                derivationOptionId: applicativeOptionId,
            }
        );
    const applicativeReady =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            {
                requestedDerivation: "applicative",
                derivationOptionId: applicativeOptionId,
                applicativeObjectPerson: "1sg",
            }
        );
    const applicativeResult =
        ctx.executeClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            applicativeReady
        );

    s.eq(
        "applicative routes likewise require an exact owner option and only the specific-object person that the owner requests",
        {
            inventoryChoice: [
                applicativeChoices.bindingStatus,
                applicativeChoices.requiredChoiceIds,
                applicativeChoices.choiceOptionProjection
                    .derivationOptionId.length,
            ],
            personChoice: [
                applicativePersonChoice.bindingStatus,
                applicativePersonChoice.requiredChoiceIds,
                applicativePersonChoice.choiceOptionProjection
                    .applicativeObjectPerson.map(option => option.optionId),
                applicativePersonChoice.executionArgs.length,
            ],
            ready: [
                applicativeReady.bindingStatus,
                ctx.isClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    applicativeReady
                ),
            ],
            result: [
                applicativeResult?.authorizationStatus,
                applicativeResult?.resultFrame?.selectedDerivation,
                applicativeResult?.controlFrame?.selectedDerivationOptionId
                    === applicativeOptionId,
                ctx.isClassicalNahuatlVncApplicationFrame(
                    applicativeResult
                ),
            ],
        },
        {
            inventoryChoice: [
                "choices-required",
                ["derivationOptionId"],
                2,
            ],
            personChoice: [
                "choices-required",
                ["applicativeObjectPerson"],
                ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
                0,
            ],
            ready: ["ready", true],
            result: ["authorized", "applicative", true, true],
        }
    );

    const copiedSource = { ...exactSource };
    const copiedSourceBinding =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            copiedSource,
            { requestedDerivation: "direct" }
        );
    const copiedBinding = { ...causativeReady };
    const forgedInventoryBinding =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            {
                requestedDerivation: "causative",
                derivationOptionId: causativeOptionId,
                derivationOptionInventory: {
                    ...causativeChoices.ownerDerivationOptionInventory,
                },
            }
        );
    const invalidOptionBinding =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            {
                requestedDerivation: "causative",
                derivationOptionId: "forged-option",
            }
        );

    s.eq(
        "copied Sources, copied bindings, caller-supplied inventories, and forged option IDs all fail closed",
        {
            copiedSource: [
                copiedSourceBinding.bindingStatus,
                copiedSourceBinding.blockReason,
                ctx.isClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    copiedSourceBinding
                ),
                ctx.executeClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    copiedSourceBinding
                ),
            ],
            copiedBinding: [
                ctx.isClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    copiedBinding
                ),
                ctx.executeClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    copiedBinding
                ),
            ],
            forgedInventory: [
                forgedInventoryBinding.bindingStatus,
                forgedInventoryBinding.blockReason,
                forgedInventoryBinding.executionArgs.length,
            ],
            invalidOption: [
                invalidOptionBinding.bindingStatus,
                invalidOptionBinding.blockReason,
                invalidOptionBinding.executionArgs.length,
            ],
        },
        {
            copiedSource: [
                "rejected",
                "classical-vnc-typed-source-application-exact-issued-source-required",
                true,
                null,
            ],
            copiedBinding: [false, null],
            forgedInventory: [
                "rejected",
                "classical-vnc-typed-source-application-caller-authority-rejected",
                0,
            ],
            invalidOption: [
                "rejected",
                "classical-vnc-typed-source-application-derivation-option-not-authorized",
                0,
            ],
        }
    );

    const canonicalRouteBinding =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactSource,
            {
                requestedDerivation: "causative",
                derivationOptionId: causativeOptionId,
                causativeObjectKind: "specific-projective",
            }
        );
    const canonicalRouteResult =
        ctx.evaluateClassicalNahuatlVncApplication(canonicalRouteBinding);
    s.eq(
        "the normal VNC owner route consumes the issued binding once and preserves the exact Source identity",
        {
            bindingValid:
                ctx.isClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    canonicalRouteBinding
                ),
            result: [
                ctx.isClassicalNahuatlVncApplicationFrame(
                    canonicalRouteResult
                ),
                canonicalRouteResult?.authorizationStatus,
                canonicalRouteResult?.resultFrame?.sourceMachineryFrame
                    === exactSource,
                canonicalRouteResult?.resultFrame?.selectedMachineryFrame
                    !== exactSource,
            ],
            secondExecution:
                ctx.evaluateClassicalNahuatlVncApplication(
                    canonicalRouteBinding
                ),
        },
        {
            bindingValid: true,
            result: [true, "authorized", true, true],
            secondExecution: null,
        }
    );

    return s;
}

module.exports = { run };
