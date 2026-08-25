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
            [vncNavigator, vncSource, "vnc:derivational-operation"],
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
    s.eq(
        "normal rerendering replaces the current Source observation without enabling Result-continuation mutation",
        {
            ordinary: ordinaryPresentation,
            vnc: {
                exactIdentity: syncedVnc?.exactSource === vncSource,
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
                role: "exact-owner-issued-source",
                units: "vnc-derivational-machinery-source",
                status: "owner-checked",
                continuationMutationEnabled: "",
            },
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
    s.ok(
        "continued Result, current Source, and Result preview have one explicit precedence order",
        precedence.indexOf("continuedExactResult")
            < precedence.indexOf("currentExactTypedSource")
            && precedence.indexOf("currentExactTypedSource")
                < precedence.indexOf("visibleResultPreview")
    );
    s.ok(
        "Source-mode pathway selection remains a read-only owner check",
        selection.includes(
            '?.inputRole === "exact-owner-issued-source"'
        )
            && selection.indexOf(
                "if (!ActiveClassicalGrammarResultSourceCapture)"
            ) < selection.indexOf(
                'getElementById(\n        "classical-construction-operation"'
            )
            && selection.includes(
                "This Source pathway is a read-only owner check."
            )
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
    );

    return s;
}

module.exports = { run };
