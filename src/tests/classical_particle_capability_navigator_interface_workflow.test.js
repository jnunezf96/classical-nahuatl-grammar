"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const suite = createSuite(
        "classical_particle_capability_navigator_interface_workflow"
    );
    ctx.renderClassicalRuleLogicSurfaceBlock({
        basalUnit: "vnc",
        stem: "ahci",
        verbClass: "A",
        valence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivation: "direct",
        voice: "active",
    });
    const beforeSurface = ctx.getActiveClassicalRuleLogicSurfaceFrame();
    const navigator = ctx.syncClassicalCapabilityNavigator(beforeSurface);
    const particleOperation = navigator?.operations?.find(
        operation => operation.operationId === "particle:result"
    );
    const select = ctx.document.getElementById(
        "classical-capability-navigator-operation"
    );
    select.value = "particle:result";
    const choices = ctx.stageClassicalGrammarTypedSourceOperationBinding(
        "particle:result",
        {}
    );
    const particleSearch = ctx.document.querySelector(
        '[data-classical-capability-choice-search="particleId"]'
    );
    const auhChoice = choices?.choiceOptionProjection?.particleId
        ?.find(option => option.optionId === "l3-auh-conjunctor");

    suite.eq(
        "Particle Result enters as a separate root constructor without consuming or changing the current exact Source",
        {
            navigator: [
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    navigator
                ),
                navigator?.inputRole,
            ],
            advertised: [
                particleOperation?.availabilityStatus,
                particleOperation?.availabilityReason,
            ],
            binding: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    choices
                ),
                choices?.family,
                choices?.navigatorInputConsumed,
                choices?.bindingStatus,
                choices?.requiredChoiceIds,
                choices?.choiceOptionProjection?.particleId
                    ?.find(option => (
                        option.optionId === "l3-auh-conjunctor"
                    ))?.availabilityStatus,
            ],
            readiness:
                ctx.getClassicalSourceCapabilityOperationExecutionReadiness(
                    "particle:result"
                )?.executable,
            findability: [
                particleSearch?.placeholder,
                choices?.choiceOptionProjection?.particleId?.length,
                auhChoice?.presentationGroupId,
                auhChoice?.description,
            ],
            unchangedResult:
                ctx.getActiveClassicalRuleLogicSurfaceFrame()
                    === beforeSurface,
        },
        {
            navigator: [true, "exact-owner-issued-source"],
            advertised: [
                "missing-prerequisite",
                "owner-source-preflight-not-declared",
            ],
            binding: [
                true,
                "source-independent-root-constructor",
                false,
                "choices-required",
                ["particleId"],
                "available",
            ],
            readiness: false,
            findability: [
                "Find by form or meaning",
                116,
                "conjunctor",
                "and; but",
            ],
            unchangedResult: true,
        }
    );

    const ready = ctx.stageClassicalGrammarTypedSourceOperationBinding(
        "particle:result",
        { particleId: "l3-auh-conjunctor" }
    );
    suite.eq(
        "the exact particle owner makes Apply ready while the existing Result remains untouched",
        {
            binding: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    ready
                ),
                ready?.bindingStatus,
                ready?.requiredChoiceIds?.length,
                ready?.ownerBindingFrame?.exactParticleSourceFrame
                    ?.particleId,
            ],
            readiness: [
                ctx.getClassicalSourceCapabilityOperationExecutionReadiness(
                    "particle:result"
                )?.rootSourceConstructor,
                ctx.getClassicalSourceCapabilityOperationExecutionReadiness(
                    "particle:result"
                )?.executable,
            ],
            unchangedResult:
                ctx.getActiveClassicalRuleLogicSurfaceFrame()
                    === beforeSurface,
        },
        {
            binding: [true, "ready", 0, "l3-auh-conjunctor"],
            readiness: [true, true],
            unchangedResult: true,
        }
    );

    const applied = ctx.applyClassicalCapabilityNavigatorSelection(select);
    const applicationResult = ctx
        .getActiveClassicalCapabilityApplicationResult();
    const canonical = applicationResult?.canonicalResult || null;
    const resultRoot = ctx.document.getElementById(
        "classical-rule-logic-surface"
    );
    suite.eq(
        "Apply presents one exact canonical Particle Result and does not silently advance it into Source",
        {
            applied,
            receipt: [
                ctx.isClassicalGrammarApplicationResult(applicationResult),
                applicationResult?.authorizationStatus,
                applicationResult?.operationId,
            ],
            result: [
                ctx.isClassicalNahuatlParticleResultFrame(canonical),
                canonical?.sourceFrame
                    === ready?.ownerBindingFrame?.exactParticleSourceFrame,
                ctx.getActiveClassicalRuleLogicSurfaceFrame() === canonical,
                resultRoot?.dataset?.classicalCapabilityAppliedResult,
                resultRoot?.dataset?.classicalCapabilityInputSourceIdentity,
                canonical?.surface,
                canonical?.formula,
            ],
            navigatorStillReviewingPriorInput:
                ctx.getClassicalCapabilityNavigatorFrame(null) === navigator,
            noPrematureCapture:
                ctx.getActiveClassicalGrammarResultSourceCapture(),
        },
        {
            applied: true,
            receipt: [true, "authorized", "particle:result"],
            result: [
                true,
                true,
                true,
                "exact-owner-issued",
                "separate-root-source-constructor",
                canonical?.surface,
                canonical?.formula,
            ],
            navigatorStillReviewingPriorInput: true,
            noPrematureCapture: null,
        }
    );

    const reviewNavigatorAfterResync =
        ctx.syncClassicalCapabilityNavigator(canonical);
    suite.eq(
        "ordinary surface reconciliation keeps the exact Particle Result in review until Continue",
        {
            navigatorRetained:
                reviewNavigatorAfterResync === navigator,
            activeNavigatorRetained:
                ctx.getClassicalCapabilityNavigatorFrame(null) === navigator,
            pendingApplicationRetained:
                ctx.getActiveClassicalCapabilityApplicationResult()
                    === applicationResult,
            displayedResultRetained:
                ctx.getActiveClassicalRuleLogicSurfaceFrame() === canonical,
            noPrematureCapture:
                ctx.getActiveClassicalGrammarResultSourceCapture(),
        },
        {
            navigatorRetained: true,
            activeNavigatorRetained: true,
            pendingApplicationRetained: true,
            displayedResultRetained: true,
            noPrematureCapture: null,
        }
    );

    const continued = ctx.useClassicalWholeCanvasResultAsNextSource(canonical);
    const capture = ctx.getActiveClassicalGrammarResultSourceCapture();
    const continuedNavigator = ctx.getClassicalCapabilityNavigatorFrame(null);
    const root = ctx.document.getElementById(
        "classical-capability-navigator"
    );
    const repeatRoot = ctx
        .stageClassicalGrammarTypedSourceOperationBinding(
            "particle:result",
            {}
        );
    suite.eq(
        "Continue retains the exact Particle Result as navigator input, and the root constructor remains enterable from that Result",
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
            delivery: [
                root?.dataset?.classicalCapabilityContinuedResult,
                root?.dataset?.classicalCapabilityContinuedSourceIdentity,
                ctx.getActiveClassicalCapabilityApplicationResult(),
                ctx.getActiveClassicalRuleLogicSurfaceFrame() === canonical,
            ],
            repeatRoot: [
                ctx.isClassicalGrammarTypedSourceOperationBindingFrame(
                    repeatRoot
                ),
                repeatRoot?.family,
                repeatRoot?.bindingStatus,
                repeatRoot?.navigatorInputConsumed,
            ],
        },
        {
            continued: true,
            capture: [true, true],
            navigator: [true, "exact-owner-issued-result", true],
            delivery: [
                "exact-owner-issued",
                "exact-owner-issued-result",
                null,
                true,
            ],
            repeatRoot: [
                true,
                "source-independent-root-constructor",
                "choices-required",
                false,
            ],
        }
    );

    return suite;
}

module.exports = { run };
