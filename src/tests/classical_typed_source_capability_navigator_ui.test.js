"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite(
        "classical_typed_source_capability_navigator_ui"
    );
    const rendering = fs.readFileSync(
        path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
        "utf8"
    );

    const unresolvedNnc = ctx.buildClassicalRuleLogicSurfaceFrame({
        basalUnit: "nnc",
        stem: "xopa",
        nncState: "absolutive",
        subject: "3sg",
        nncOutputScope: "single",
    });
    const ordinaryNnc = ctx.buildClassicalRuleLogicSurfaceFrame({
        basalUnit: "nnc",
        stem: "xopa",
        nncSourceClass: "zero",
        nncState: "absolutive",
        subject: "3sg",
        nncOutputScope: "single",
    });
    const pronominalNnc = ctx.buildClassicalRuleLogicSurfaceFrame({
        basalUnit: "nnc",
        stem: "cem-ix-qui-ch",
        sourceEmbedStem: "cem-ix",
        sourceMatrixStem: "qui-ch",
        nncState: "absolutive",
        subject: "3common",
        nncOutputScope: "single",
    });
    const vnc = ctx.buildClassicalRuleLogicSurfaceFrame({
        basalUnit: "vnc",
        stem: "ahci",
        verbClass: "A",
        valence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        vncVoice: "active",
        vncOutputScope: "single",
    });

    const ordinarySource =
        ctx.getClassicalGrammarExactTypedSourceFromSurfaceFrame(ordinaryNnc);
    const pronominalSource =
        ctx.getClassicalGrammarExactTypedSourceFromSurfaceFrame(pronominalNnc);
    const vncSource =
        ctx.getClassicalGrammarExactTypedSourceFromSurfaceFrame(vnc);
    const ordinaryNavigator =
        ctx.getClassicalCapabilityNavigatorFrame(ordinaryNnc);
    const pronominalNavigator =
        ctx.getClassicalCapabilityNavigatorFrame(pronominalNnc);
    const vncNavigator = ctx.getClassicalCapabilityNavigatorFrame(vnc);

    s.eq(
        "normal NNC and VNC rendering exposes only exact owner-issued Sources",
        {
            unresolved: ctx.getClassicalGrammarExactTypedSourceFromSurfaceFrame(
                unresolvedNnc
            ),
            ordinary: [
                ordinarySource
                    === ordinaryNnc.state.nncTypedSourceFrame,
                ctx.isIssuedCanonicalNncSourceFrame(ordinarySource),
                ordinarySource?.kind || "",
            ],
            pronominal: [
                pronominalSource
                    === pronominalNnc.state.nncTypedSourceFrame,
                ctx.isIssuedCanonicalNncSourceFrame(pronominalSource),
                pronominalSource?.kind || "",
            ],
            vnc: [
                vncSource
                    === vnc.state.vncApplicationFrame.resultFrame
                        .sourceMachineryFrame,
                ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(
                    vncSource
                ),
                vncSource?.kind || "",
            ],
        },
        {
            unresolved: null,
            ordinary: [
                true,
                true,
                "classical-nahuatl-ordinary-nnc-source-frame",
            ],
            pronominal: [
                true,
                true,
                "classical-nahuatl-pronominal-nnc-source-frame",
            ],
            vnc: [
                true,
                true,
                "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
            ],
        }
    );

    s.eq(
        "the navigator prefers each current typed Source over its visible Result preview",
        [
            [ordinaryNavigator, ordinarySource, "nnc:ordinary"],
            [pronominalNavigator, pronominalSource, "nnc:pronominal"],
            [vncNavigator, vncSource, "vnc:application"],
        ].map(([navigator, source, operationId]) => ({
            valid:
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    navigator
                ),
            inputRole: navigator?.inputRole || "",
            exactIdentity: navigator?.exactSource === source,
            typedSourceProjection:
                navigator?.typedSourceProjectionIncluded === true,
            ownerOperation: navigator?.operations?.find(
                operation => operation.operationId === operationId
            )?.availabilityStatus || "",
            authority: navigator?.grammarAuthority,
        })),
        [
            {
                valid: true,
                inputRole: "exact-owner-issued-source",
                exactIdentity: true,
                typedSourceProjection: true,
                ownerOperation: "available",
                authority: false,
            },
            {
                valid: true,
                inputRole: "exact-owner-issued-source",
                exactIdentity: true,
                typedSourceProjection: true,
                ownerOperation: "available",
                authority: false,
            },
            {
                valid: true,
                inputRole: "exact-owner-issued-source",
                exactIdentity: true,
                typedSourceProjection: true,
                ownerOperation: "available",
                authority: false,
            },
        ]
    );

    s.eq(
        "typed Source choices stay with the same operation that the current owner Result actually contains",
        [
            [vnc, vncNavigator, "vnc:application"],
            [ordinaryNnc, ordinaryNavigator, "nnc:ordinary"],
        ].map(([surface, navigator, operationId]) => {
            const operation = navigator?.operations?.find(
                candidate => candidate.operationId === operationId
            );
            const ownerProjection =
                ctx.getClassicalSgrOwnerIssuedProjection(surface);
            const layerGraph =
                ctx.getClassicalGrammarApplicationLayerGraph(
                    ownerProjection?.applicationResult
                );
            return {
                ownerChoicesRequired:
                    operation?.ownerChoicesRequired === true,
                ownerPreflightValidated:
                    operation?.ownerPreflightFrameValidated === true,
                exactOperationApplied: layerGraph?.nodes?.some(
                    node => node.operationId === operationId
                ) === true,
            };
        }),
        [
            {
                ownerChoicesRequired: true,
                ownerPreflightValidated: true,
                exactOperationApplied: true,
            },
            {
                ownerChoicesRequired: true,
                ownerPreflightValidated: true,
                exactOperationApplied: true,
            },
        ]
    );

    const navigatorRoot = ctx.document.getElementById(
        "classical-capability-navigator"
    );
    const construction = ctx.document.getElementById(
        "classical-construction-operation"
    );
    const syncedOrdinary = ctx.syncClassicalCapabilityNavigator(ordinaryNnc);
    const ordinaryPresentation = {
        exactIdentity: syncedOrdinary?.exactSource === ordinarySource,
        role: navigatorRoot.dataset.classicalCapabilitySourceRole,
        units: navigatorRoot.dataset.classicalCapabilitySourceUnitKinds,
        status: navigatorRoot.dataset.classicalCapabilityNavigatorStatus,
        continuationMutationEnabled:
            construction.dataset.classicalCapabilityContinuationActive
                || "",
    };
    const syncedVnc = ctx.syncClassicalCapabilityNavigator(vnc);
    const retainedVnc = ctx.syncClassicalCapabilityNavigator(null);
    const navigatorControl = ctx.document.getElementById(
        "classical-capability-navigator-operation"
    );
    navigatorControl.dispatchEvent(new ctx.Event("click", { bubbles: true }));
    const retainedAfterNavigatorClick =
        ctx.getClassicalCapabilityNavigatorFrame(null);
    s.eq(
        "normal rendering, presentation refresh, and a native navigator click preserve the exact current Source without enabling Result-continuation mutation",
        {
            ordinary: ordinaryPresentation,
            vnc: {
                exactIdentity: syncedVnc?.exactSource === vncSource,
                presentationRefreshIdentity:
                    retainedVnc === syncedVnc,
                nativeClickIdentity:
                    retainedAfterNavigatorClick === syncedVnc,
                navigatorDisabled: ctx.document.getElementById(
                    "classical-capability-navigator-operation"
                ).disabled,
                role: navigatorRoot.dataset.classicalCapabilitySourceRole,
                units:
                    navigatorRoot.dataset.classicalCapabilitySourceUnitKinds,
                status:
                    navigatorRoot.dataset.classicalCapabilityNavigatorStatus,
                continuationMutationEnabled:
                    construction.dataset
                        .classicalCapabilityContinuationActive || "",
            },
        },
        {
            ordinary: {
                exactIdentity: true,
                role: "exact-owner-issued-source",
                units: "ordinary-nnc-source",
                status: "owner-checked",
                continuationMutationEnabled: "",
            },
            vnc: {
                exactIdentity: true,
                presentationRefreshIdentity: true,
                nativeClickIdentity: true,
                navigatorDisabled: false,
                role: "exact-owner-issued-source",
                units: "vnc-derivational-machinery-source",
                status: "owner-checked",
                continuationMutationEnabled: "",
            },
        }
    );

    const incompleteRestore = ctx.applyEntradaUrlStateSnapshot(
        ctx.normalizeEntradaUrlStateSnapshot({
            input: "",
            presentFields: ["input"],
        }),
        { triggerGenerate: false }
    );
    s.eq(
        "restoring an incomplete Source clears the old exact ahci navigator before controls mutate",
        {
            restored: incompleteRestore,
            retainedNavigator:
                ctx.getClassicalCapabilityNavigatorFrame(null),
            status:
                navigatorRoot.dataset
                    .classicalCapabilityNavigatorStatus || "",
            clearReason:
                navigatorRoot.dataset
                    .classicalCapabilitySourceClearReason || "",
            disabled: navigatorControl.disabled,
        },
        {
            restored: true,
            retainedNavigator: null,
            status: "waiting",
            clearReason: "url-or-restored-state-transaction",
            disabled: true,
        }
    );
    ctx.syncClassicalCapabilityNavigator(vnc);

    const navigatorSelect = ctx.document.getElementById(
        "classical-capability-navigator-operation"
    );
    navigatorSelect.value = "vnc:application";
    navigatorSelect.dispatchEvent(new ctx.Event("change", { bubbles: true }));
    ctx.syncClassicalCapabilityNavigator(unresolvedNnc);
    ctx.syncClassicalCapabilityNavigator(vnc);
    const retainedVncSelection = navigatorSelect.value;
    ctx.syncClassicalCapabilityNavigator(ordinaryNnc);
    s.eq(
        "a typed Source pathway survives a transient waiting rerender but not a genuine Source-kind change",
        {
            afterWaitingRerender: retainedVncSelection,
            afterSourceKindChange: navigatorSelect.value,
        },
        {
            afterWaitingRerender: "vnc:application",
            afterSourceKindChange: "",
        }
    );

    const copiedSurface = {
        basalUnit: "nnc",
        state: {
            basalUnit: "nnc",
            nncTypedSourceFrame: { ...ordinarySource },
        },
    };
    s.eq(
        "copied Source data cannot enter the interface navigator",
        {
            source:
                ctx.getClassicalGrammarExactTypedSourceFromSurfaceFrame(
                    copiedSurface
                ),
            navigator: ctx.getClassicalCapabilityNavigatorFrame(
                copiedSurface
            ),
        },
        { source: null, navigator: null }
    );

    const precedenceStart = rendering.indexOf(
        "function getClassicalCapabilityNavigatorFrame"
    );
    const precedenceEnd = rendering.indexOf(
        "function projectClassicalCapabilityNavigatorFrame",
        precedenceStart
    );
    const precedence = rendering.slice(precedenceStart, precedenceEnd);
    const selectionStart = rendering.indexOf(
        "function updateClassicalCapabilityNavigatorSelection"
    );
    const selectionEnd = rendering.indexOf(
        "function syncClassicalCapabilityNavigator",
        selectionStart
    );
    const selection = rendering.slice(selectionStart, selectionEnd);
    const sourceApplyStart = selection.indexOf(
        "function applyClassicalCapabilityNavigatorSelection"
    );
    const sourceApply = selection.slice(sourceApplyStart);
    s.ok(
        "continued Result, current Source, and Result preview have one explicit precedence order",
        precedence.indexOf("continuedExactResult")
            < precedence.indexOf("currentExactTypedSource")
            && precedence.indexOf("currentExactTypedSource")
                < precedence.indexOf("visibleResultPreview")
    );
    const sourceModeApplyEnd = sourceApply.indexOf(
        "sourceExecutionReadiness\n        && sourceExecutionReadiness.executable !== true"
    );
    const sourceModeApply = sourceApply.slice(0, sourceModeApplyEnd);
    s.ok(
        "Source-mode selection stages owner choices and Apply executes only the exact ready binding",
        selection.includes(
            '?.inputRole === "exact-owner-issued-source"'
        )
            && selection.includes(
                "stageClassicalGrammarTypedSourceOperationBinding(operationId);"
            )
            && rendering.includes(
                "function getClassicalSourceCapabilityOperationExecutionReadiness"
            )
            && rendering.includes(
                "binding?.navigator === navigator"
            )
            && rendering.includes(
                "binding.operation === operation"
            )
            && rendering.includes(
                "binding.exactSource === exactSource"
            )
            && rendering.includes(
                'binding.bindingStatus === "ready"'
            )
            && rendering.includes(
                '"classical-capability-operation-choices"'
            )
            && rendering.includes(
                "executeClassicalGrammarTypedSourceOperationBindingFrame?.("
            )
            && rendering.includes(
                "renderClassicalTypedSourceCapabilityApplicationResult("
            )
            && rendering.includes(
                "applyClassicalCapabilityNavigatorSelection(select);"
            )
            && rendering.includes(
                "navigate: true,\n            execute: false"
            )
            && sourceModeApply.includes(
                "sourceExecutionReadiness?.executable"
            )
            && !sourceModeApply.includes(
                ".refreshClassicalRuleLogicSurfaceFromControl?.()"
            )
            && !sourceModeApply.includes("exactOperationApplied")
    );

    s.ok(
        "both text edits and select changes invalidate a continued Result before normal rerendering captures the new Source",
        rendering.includes(
            '"input",\n        invalidateEditedTypedSource'
        )
            && rendering.includes(
                '"change",\n        invalidateEditedTypedSource'
            )
            && rendering.includes(
                "syncClassicalCapabilityNavigator(surfaceFrame);"
            )
            && rendering.includes(
                '"#verb-entry-clear, button[data-classical-basal-unit]"'
            )
            && !rendering.includes(
                '"#verb-entry-clear, [data-classical-basal-unit]"'
            )
    );

    const surfaceSyncStart = rendering.indexOf(
        "function syncClassicalSourceGrammarResultSurface"
    );
    const surfaceSyncEnd = rendering.indexOf(
        "function getClassicalTranscriptionOwnerSegmentTokens",
        surfaceSyncStart
    );
    const surfaceSync = rendering.slice(surfaceSyncStart, surfaceSyncEnd);
    const summaryStart = rendering.indexOf(
        "function syncClassicalCompositionPathSummary"
    );
    const summaryEnd = rendering.indexOf(
        "function syncClassicalAppliedGrammar",
        summaryStart
    );
    const summary = rendering.slice(
        summaryStart,
        summaryEnd > summaryStart ? summaryEnd : surfaceSyncStart
    );
    const events = fs.readFileSync(
        path.join(ROOT, "src", "ui", "events", "events.mjs"),
        "utf8"
    );
    s.ok(
        "startup and every exact surface commit hydrate the navigator independently of the optional path summary",
        surfaceSync.indexOf("syncClassicalCapabilityNavigator(surfaceFrame);")
            < surfaceSync.indexOf(
                "syncClassicalCompositionPathSummary(surfaceFrame, resultRoot);"
            )
            && !summary.includes(
                "syncClassicalCapabilityNavigator(surfaceFrame);"
            )
            && events.includes(
                "targetObject.syncClassicalCapabilityNavigator?.("
            )
            && events.includes(
                "targetObject.getActiveClassicalRuleLogicSurfaceFrame?.() || null"
            )
    );

    return s;
}

module.exports = { run };
