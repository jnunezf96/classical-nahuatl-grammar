"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite(
        "classical_vnc_capability_navigator_interface_workflow"
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
