"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const suite = createSuite(
        "classical_nnc_capability_navigator_interface_workflow"
    );
    ctx.renderClassicalRuleLogicSurfaceBlock({
        basalUnit: "nnc",
        stem: "xopa",
        nncSourceClass: "zero",
        nncState: "absolutive",
        subject: "3sg",
        nncOutputScope: "single",
    });
    const beforeSurface = ctx.getActiveClassicalRuleLogicSurfaceFrame();
    const exactSource = ctx
        .getClassicalGrammarExactTypedSourceFromSurfaceFrame(beforeSurface);
    const navigator = ctx.syncClassicalCapabilityNavigator(beforeSurface);
    const select = ctx.document.getElementById(
        "classical-capability-navigator-operation"
    );
    select.value = "nnc:ordinary";
    const binding = ctx.stageClassicalGrammarTypedSourceOperationBinding(
        "nnc:ordinary",
        {}
    );

    suite.eq(
        "ordinary NNC stages one exact owner binding without changing the visible Result",
        {
            navigator: [
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    navigator
                ),
                navigator?.exactSource === exactSource,
            ],
            binding: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    binding
                ),
                binding?.bindingStatus,
                binding?.exactSource === exactSource,
                ctx.getClassicalSourceCapabilityOperationExecutionReadiness(
                    "nnc:ordinary"
                )?.executable,
            ],
            unchangedResult:
                ctx.getActiveClassicalRuleLogicSurfaceFrame()
                    === beforeSurface,
        },
        {
            navigator: [true, true],
            binding: [true, "ready", true, true],
            unchangedResult: true,
        }
    );

    const applied = ctx.applyClassicalCapabilityNavigatorSelection(select);
    const applicationResult = ctx
        .getActiveClassicalCapabilityApplicationResult();
    const canonical = applicationResult?.canonicalResult || null;
    const afterApplySurface = ctx.getActiveClassicalRuleLogicSurfaceFrame();

    suite.eq(
        "NNC Apply presents the one owner-issued exact Result without reconstructing its Source",
        {
            applied,
            receipt: [
                ctx.isClassicalGrammarApplicationResult(applicationResult),
                applicationResult?.authorizationStatus,
                applicationResult?.operationId,
            ],
            result: [
                ctx.isClassicalNahuatlOrdinaryNncResult(canonical),
                canonical?.sourceFrame === exactSource,
                afterApplySurface?.nncGrammarSurfaceContract === canonical,
                afterApplySurface?.state?.nncTypedSourceFrame
                    === exactSource,
            ],
        },
        {
            applied: true,
            receipt: [true, "authorized", "nnc:ordinary"],
            result: [true, true, true, true],
        }
    );

    const continued = ctx.useClassicalWholeCanvasResultAsNextSource(
        afterApplySurface
    );
    const capture = ctx.getActiveClassicalGrammarResultSourceCapture();
    const continuedNavigator = ctx.getClassicalCapabilityNavigatorFrame(null);
    const sentenceOperation = continuedNavigator?.operations?.find(
        operation => operation.operationId === "nnc:sentence-surface"
    );
    const diagramOperation = continuedNavigator?.operations?.find(
        operation => operation.operationId === "nnc:diagram"
    );

    suite.eq(
        "Continue retains the exact NNC Result and reveals its direct owner pathways",
        {
            continued,
            capture: [
                ctx.isClassicalGrammarApplicationResultCapture(
                    capture,
                    "universal-capability-navigator-source"
                ),
                capture?.canonicalResult === canonical,
            ],
            navigator: [
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    continuedNavigator
                ),
                continuedNavigator?.inputRole,
                continuedNavigator?.exactResult === canonical,
            ],
            directPathways: [
                sentenceOperation?.availabilityStatus,
                sentenceOperation?.ownerProbeResultValidated,
                diagramOperation?.availabilityStatus,
                diagramOperation?.ownerProbeResultValidated,
            ],
            displayedResultIdentity:
                ctx.getActiveClassicalRuleLogicSurfaceFrame()
                    === afterApplySurface,
        },
        {
            continued: true,
            capture: [true, true],
            navigator: [true, "exact-owner-issued-result", true],
            directPathways: ["available", true, "available", true],
            displayedResultIdentity: true,
        }
    );

    return suite;
}

module.exports = { run };
