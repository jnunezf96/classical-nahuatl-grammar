"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite(
        "classical_vnc_capability_navigator_interface_workflow"
    );
    ctx.setActiveDerivationType("direct");
    ctx.renderClassicalRuleLogicSurfaceBlock({
        basalUnit: "vnc",
        stem: "caqui",
        verbClass: "B",
        valence: "projective-nonhuman",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        vncVoice: "active",
        requestedVoice: "active",
        vncOutputScope: "single",
        lateOperation: "none",
    });
    const exactCommittedTlaCaquiSurface =
        ctx.getActiveClassicalRuleLogicSurfaceFrame();
    const exactCommittedTlaCaquiSource =
        ctx.getClassicalGrammarExactTypedSourceFromSurfaceFrame(
            exactCommittedTlaCaquiSurface
        );
    ctx.syncClassicalCapabilityNavigator(exactCommittedTlaCaquiSurface);
    ctx.renderClassicalRuleLogicSurfaceBlock({
        basalUnit: "vnc",
        stem: "caqui",
        verbClass: "B",
        valence: "projective-nonhuman",
        subject: "1sg",
        mood: "indicative",
        tense: "imperfect",
        requestedDerivation: "direct",
        vncVoice: "impersonal",
        requestedVoice: "impersonal",
        nonactiveOptionId: "ō:cac-ō",
        vncOutputScope: "single",
        lateOperation: "none",
    });
    const exactTlaCaquiSurface =
        ctx.getActiveClassicalRuleLogicSurfaceFrame();
    const exactTlaCaquiPreviewSource =
        ctx.getClassicalGrammarExactTypedSourceFromSurfaceFrame(
            exactTlaCaquiSurface
        );
    const exactTlaCaquiNavigator =
        ctx.syncClassicalCapabilityNavigator(exactTlaCaquiSurface);
    const exactTlaCaquiSource = exactTlaCaquiNavigator.exactSource;
    const exactTlaCaquiSelections = Object.freeze({
        subject: "1sg",
        mood: "indicative",
        tense: "imperfect",
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        derivationOptionId: "",
        nonactiveOptionId: "ō:cac-ō",
    });
    const exactTlaCaquiBinding =
        ctx.stageClassicalGrammarTypedSourceOperationBinding(
            "vnc:application",
            exactTlaCaquiSelections
        );
    const exactTlaCaquiOwnerBinding =
        ctx.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
            exactTlaCaquiSource,
            exactTlaCaquiSelections
        );
    const exactTlaCaquiAggregateBinding =
        ctx.issueClassicalGrammarTypedSourceOperationBindingFrame(
            exactTlaCaquiNavigator,
            "vnc:application",
            exactTlaCaquiSelections
        );
    const exactTlaCaquiOperation = exactTlaCaquiNavigator.operations.find(
        operation => operation.operationId === "vnc:application"
    );
    s.eq(
        "the exact tla-caqui impersonal imperfect surface stages its visible Source choices",
        {
            formula: exactTlaCaquiSurface?.state?.vncApplicationFrame
                ?.resultFrame?.formulaRealization,
            source: Boolean(exactTlaCaquiSource),
            sourceIdentity: [
                exactTlaCaquiSource === exactCommittedTlaCaquiSource,
                exactTlaCaquiPreviewSource
                    !== exactCommittedTlaCaquiSource,
            ],
            navigator: exactTlaCaquiNavigator?.inputRole,
            operation: [
                exactTlaCaquiOperation?.availabilityStatus,
                exactTlaCaquiOperation?.ownerPreflightFrameValidated,
                exactTlaCaquiOperation?.exactSource
                    === exactTlaCaquiSource,
            ],
            selections: exactTlaCaquiSelections,
            owner: [
                Boolean(exactTlaCaquiOwnerBinding),
                ctx.isClassicalNahuatlVncTypedSourceApplicationBindingFrame(
                    exactTlaCaquiOwnerBinding
                ),
                exactTlaCaquiOwnerBinding?.bindingStatus,
                exactTlaCaquiOwnerBinding?.blockReason,
            ],
            aggregate: [
                Boolean(exactTlaCaquiAggregateBinding),
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    exactTlaCaquiAggregateBinding
                ),
                exactTlaCaquiAggregateBinding?.bindingStatus,
                exactTlaCaquiAggregateBinding?.blockReason,
            ],
            binding: Boolean(exactTlaCaquiBinding),
            status: exactTlaCaquiBinding?.bindingStatus,
            reason: exactTlaCaquiBinding?.blockReason,
        },
        {
            formula: "#0-0+tla(cac-ō)ya+0-0#",
            source: true,
            sourceIdentity: [true, true],
            navigator: "exact-owner-issued-source",
            operation: ["available", true, true],
            selections: {
                subject: "1sg",
                mood: "indicative",
                tense: "imperfect",
                requestedDerivation: "direct",
                requestedVoice: "impersonal",
                derivationOptionId: "",
                nonactiveOptionId: "ō:cac-ō",
            },
            owner: [true, true, "ready", ""],
            aggregate: [true, true, "ready", ""],
            binding: true,
            status: "ready",
            reason: "",
        }
    );
    const exactTlaCaquiSelect = ctx.document.getElementById(
        "classical-capability-navigator-operation"
    );
    ctx.document.getElementById(
        "classical-rule-logic-vnc-voice"
    ).value = "impersonal";
    ctx.document.getElementById(
        "classical-rule-logic-tense"
    ).value = "imperfect";
    ctx.document.getElementById(
        "classical-rule-logic-nonactive-family"
    ).value = "ō:cac-ō";
    exactTlaCaquiSelect.value = "vnc:application";
    const exactTlaCaquiApplied =
        ctx.applyClassicalCapabilityNavigatorSelection(
            exactTlaCaquiSelect
        );
    const exactTlaCaquiApplicationResult =
        ctx.getActiveClassicalCapabilityApplicationResult();
    const exactTlaCaquiAppliedSurface =
        ctx.getActiveClassicalRuleLogicSurfaceFrame();
    const exactTlaCaquiCanonical =
        exactTlaCaquiApplicationResult?.canonicalResult || null;
    const exactTlaCaquiResultFrame =
        exactTlaCaquiCanonical?.resultFrame || null;
    const exactTlaCaquiOwnerProjection =
        ctx.getClassicalSgrOwnerIssuedProjection(
            exactTlaCaquiAppliedSurface
        );
    const exactTlaCaquiNextSource =
        exactTlaCaquiResultFrame?.selectedMachineryFrame || null;
    const exactTlaCaquiInputSource =
        exactTlaCaquiResultFrame?.sourceMachineryFrame || null;
    const exactTlaCaquiNextSourceProjection =
        ctx.getClassicalNahuatlVncContinuationSourceConstituents(
            exactTlaCaquiResultFrame
        );
    const exactTlaCaquiNextNavigator =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(
            exactTlaCaquiNextSource
        );
    const exactTlaCaquiCapture =
        ctx.captureClassicalGrammarApplicationResult(
            exactTlaCaquiCanonical,
            "universal-capability-navigator-source"
        );
    const exactTlaCaquiResultNavigator =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(
            exactTlaCaquiCanonical
        );
    const exactTlaCaquiContinued =
        ctx.continueClassicalCapabilityApplicationResultAsTypedSource(
            exactTlaCaquiAppliedSurface
        );
    const exactTlaCaquiContinuedNavigator =
        ctx.getClassicalCapabilityNavigatorFrame(null);
    s.eq(
        "the exact tla-caqui Result remains review-only until Continue and then enters Result pathways",
        {
            applied: exactTlaCaquiApplied,
            result: [
                exactTlaCaquiApplicationResult?.authorizationStatus,
                exactTlaCaquiApplicationResult?.canonicalResult?.resultFrame
                    ?.formulaRealization,
            ],
            acceptance: [
                exactTlaCaquiAppliedSurface?.authorizationStatus
                    === "authorized",
                exactTlaCaquiOwnerProjection?.applicationResult
                    === exactTlaCaquiApplicationResult,
                exactTlaCaquiOwnerProjection?.canonicalResult
                    === exactTlaCaquiCanonical,
                ctx.isClassicalNahuatlVncApplicationFrame(
                    exactTlaCaquiCanonical
                ),
                ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(
                    exactTlaCaquiInputSource
                ),
                ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(
                    exactTlaCaquiNextSource
                ),
                Boolean(exactTlaCaquiNextSourceProjection),
                exactTlaCaquiNextNavigator?.inputRole
                    === "exact-owner-issued-source",
                exactTlaCaquiNextNavigator?.exactSource
                    === exactTlaCaquiNextSource,
                ctx.isClassicalGrammarApplicationResultCapture(
                    exactTlaCaquiCapture,
                    "universal-capability-navigator-source"
                ),
                exactTlaCaquiResultNavigator?.inputRole
                    === "exact-owner-issued-result",
                exactTlaCaquiResultNavigator?.exactResult
                    === exactTlaCaquiCanonical,
            ],
            continued: exactTlaCaquiContinued,
            navigator: [
                exactTlaCaquiContinuedNavigator?.inputRole,
                exactTlaCaquiContinuedNavigator?.exactResult
                    === exactTlaCaquiApplicationResult?.canonicalResult,
            ],
        },
        {
            applied: true,
            result: [
                "authorized",
                "#0-0+tla(cac-ō)ya+0-0#",
            ],
            acceptance: [
                true, true, true, true, true,
                false, false, false, false,
                true, true, true,
            ],
            continued: true,
            navigator: ["exact-owner-issued-result", true],
        }
    );
    ctx.clearClassicalGrammarResultSourceContinuation(
        "exact-tla-caqui-test-complete"
    );
    const construction = ctx.document.getElementById(
        "classical-construction-operation"
    );
    if (construction) construction.value = "none";
    ctx.renderClassicalRuleLogicSurfaceBlock({
        basalUnit: "vnc",
        stem: "ahci",
        verbClass: "A",
        valence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        vncVoice: "active",
        requestedVoice: "active",
        vncOutputScope: "single",
        lateOperation: "none",
    });
    ctx.document.getElementById(
        "classical-rule-logic-vnc-voice"
    ).value = "active";
    ctx.document.getElementById(
        "classical-rule-logic-tense"
    ).value = "present";
    ctx.document.getElementById(
        "classical-rule-logic-nonactive-family"
    ).value = "";
    const beforeSurface = ctx.getActiveClassicalRuleLogicSurfaceFrame();
    const exactSource = ctx
        .getClassicalGrammarExactTypedSourceFromSurfaceFrame(beforeSurface);
    const navigator = ctx.syncClassicalCapabilityNavigator(beforeSurface);
    const select = ctx.document.getElementById(
        "classical-capability-navigator-operation"
    );
    select.value = "vnc:application";

    const initial = ctx.stageClassicalGrammarTypedSourceOperationBinding(
        "vnc:application",
        {}
    );
    const derivation = ctx.stageClassicalGrammarTypedSourceOperationBinding(
        "vnc:application",
        { requestedDerivation: "causative" }
    );
    const derivationOptionId = derivation.choiceOptionProjection
        .derivationOptionId[0].optionId;
    const participant = ctx.stageClassicalGrammarTypedSourceOperationBinding(
        "vnc:application",
        { requestedDerivation: "causative", derivationOptionId }
    );
    const ready = ctx.stageClassicalGrammarTypedSourceOperationBinding(
        "vnc:application",
        {
            requestedDerivation: "causative",
            derivationOptionId,
            causativeObjectKind: "specific-projective",
        }
    );
    const beforeApplySurface = ctx.getActiveClassicalRuleLogicSurfaceFrame();

    s.eq(
        "selecting a Source pathway reveals only each successive owner choice and never changes Result before Apply",
        {
            exactNavigator: [
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    navigator
                ),
                navigator.exactSource === exactSource,
            ],
            progression: [
                [initial.bindingStatus, initial.requiredChoiceIds],
                [derivation.bindingStatus, derivation.requiredChoiceIds],
                [participant.bindingStatus, participant.requiredChoiceIds],
                [ready.bindingStatus, ready.requiredChoiceIds],
            ],
            activeBinding: [
                ctx.getActiveClassicalGrammarTypedSourceOperationBinding()
                    === ready,
                ctx.getClassicalSourceCapabilityOperationExecutionReadiness(
                    "vnc:application"
                ).executable,
            ],
            unchangedResult:
                beforeApplySurface === beforeSurface,
        },
        {
            exactNavigator: [true, true],
            progression: [
                ["choices-required", ["requestedDerivation"]],
                ["choices-required", ["derivationOptionId"]],
                ["choices-required", ["causativeObjectKind"]],
                ["ready", []],
            ],
            activeBinding: [true, true],
            unchangedResult: true,
        }
    );

    const applied = ctx.applyClassicalCapabilityNavigatorSelection(select);
    const applicationResult = ctx.getActiveClassicalCapabilityApplicationResult();
    const afterApplySurface = ctx.getActiveClassicalRuleLogicSurfaceFrame();
    const canonical = applicationResult?.canonicalResult || null;

    s.eq(
        "Apply executes the exact owner binding once and presents its exact Result without advancing Source",
        {
            applied,
            receipt: [
                ctx.isClassicalGrammarApplicationResult(applicationResult),
                applicationResult?.authorizationStatus,
                applicationResult?.operationId,
            ],
            result: [
                ctx.isClassicalNahuatlVncApplicationFrame(canonical),
                canonical?.resultFrame?.sourceMachineryFrame === exactSource,
                canonical?.resultFrame?.selectedMachineryFrame !== exactSource,
                canonical?.resultFrame?.selectedDerivation,
            ],
            presentation: [
                afterApplySurface?.state?.vncApplicationFrame === canonical,
                ctx.getClassicalGrammarExactTypedSourceFromSurfaceFrame(
                    afterApplySurface
                ) === exactSource,
            ],
        },
        {
            applied: true,
            receipt: [true, "authorized", "vnc:application"],
            result: [true, true, true, "causative"],
            presentation: [true, true],
        }
    );

    const continued = ctx
        .continueClassicalCapabilityApplicationResultAsTypedSource(
            afterApplySurface
        );
    const continuedNavigator = ctx.getClassicalCapabilityNavigatorFrame(null);
    const resultCapture = ctx.getActiveClassicalGrammarResultSourceCapture();
    const exactNextSource = canonical?.resultFrame?.selectedMachineryFrame;
    const continuedSourceProjection = ctx
        .getClassicalNahuatlVncContinuationSourceConstituents(
        canonical.resultFrame
        );
    const refreshedNavigator = ctx.syncClassicalCapabilityNavigator(
        afterApplySurface
    );
    const sentenceOperation = continuedNavigator?.operations?.find(
        operation => operation.operationId === "vnc:sentence-result"
    );

    s.eq(
        "Continue retains the exact Result for Result pathways while mirroring its owner-issued output Source without rerunning",
        {
            continued,
            navigator: [
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    continuedNavigator
                ),
                continuedNavigator?.inputRole,
                continuedNavigator?.exactResult === canonical,
                refreshedNavigator?.exactResult === canonical,
            ],
            resultCapture: [
                ctx.isClassicalGrammarApplicationResultCapture(
                    resultCapture,
                    "universal-capability-navigator-source"
                ),
                resultCapture?.canonicalResult === canonical,
            ],
            sentencePathway: [
                sentenceOperation?.availabilityStatus,
                sentenceOperation?.ownerProbeResultValidated,
            ],
            appliedResult:
                ctx.getActiveClassicalCapabilityApplicationResult(),
            sourceStem: ctx.document.getElementById(
                "classical-source-whole"
            )?.value || "",
            ownerSurfaceStillExact:
                ctx.getActiveClassicalRuleLogicSurfaceFrame()
                    === afterApplySurface,
        },
        {
            continued: true,
            navigator: [true, "exact-owner-issued-result", true, true],
            resultCapture: [true, true],
            sentencePathway: ["available", true],
            appliedResult: null,
            sourceStem: continuedSourceProjection.sourceStem,
            ownerSurfaceStillExact: true,
        }
    );

    return s;
}

module.exports = { run };
