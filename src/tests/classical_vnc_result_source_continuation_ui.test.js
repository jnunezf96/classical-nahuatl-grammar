"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function buildFirstCaquiCausative(ctx) {
    const request = {
        sourceStem: "caqui",
        verbClass: "B",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceSubject: "2sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    };
    const preview =
        ctx.evaluateClassicalNahuatlVncApplication(request);
    const optionId =
        preview.controlFrame?.derivationOptionInventory
            ?.options?.find(option =>
                option.targetStem === "caquī-tiā"
            )?.optionId || "";
    return ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        derivationOptionId: optionId,
    });
}

function buildAuthorizedSurface(first) {
    return {
        kind: "focused-vnc-surface-witness",
        authorizationStatus: "authorized",
        basalUnit: "vnc",
        state: {
            vncApplicationFrame: first,
            vncOrderedVoiceApplicationFrame: null,
            vncLateOperationClosureFrame: null,
        },
    };
}

function configureSecondCausativeControls(ctx) {
    ctx.setActiveDerivationType("causative");
    ctx.document.getElementById(
        "classical-rule-logic-causative-result-subject"
    ).value = "3sg";
    ctx.document.getElementById(
        "classical-rule-logic-causative-causee-valence"
    ).value = "specific-projective";
    ctx.document.getElementById(
        "classical-rule-logic-vnc-voice"
    ).value = "active";
}

function run(ctx = {}) {
    const s = createSuite(
        "classical_vnc_result_source_continuation_ui"
    );
    const root = path.resolve(__dirname, "..", "..");
    const rendering = fs.readFileSync(
        path.join(root, "src", "ui", "rendering", "rendering.mjs"),
        "utf8"
    );
    const renderingCompact = rendering.replace(/\s+/gu, " ");
    const composer = fs.readFileSync(
        path.join(root, "src", "ui", "composer", "composer.mjs"),
        "utf8"
    );
    const shell = fs.readFileSync(
        path.join(root, "src", "ui", "shell", "classical_shell.mjs"),
        "utf8"
    );

    s.ok(
        "the production action has no surface-copy, dataset-authority, relational, or restored-state continuation lane",
        (() => {
            const actionStart = rendering.indexOf(
                "function useClassicalWholeCanvasResultAsNextSource"
            );
            const actionEnd = rendering.indexOf(
                "function showClassicalWholeCanvasWitnesses",
                actionStart
            );
            const action = rendering.slice(actionStart, actionEnd);
            return action.includes(
                "getClassicalVncResultSourceContinuationCandidate"
            )
                && action.includes("projection.sourceStem")
                && !action.includes("projection.surface")
                && !action.includes(
                    "classicalNextSourceFromAuthorizedResult"
                )
                && !action.includes(
                    "classicalNextSourceAuthority"
                )
                && !rendering.includes(
                    '["Use form as new source", "use-result-as-source"'
                )
                && !shell.includes(
                    "data-andrews-result-can-feed-next-source"
                )
                && composer.includes(
                    "url-or-restored-state-transaction"
                )
                && composer.includes(
                    "source-constituent-edited"
                );
        })()
    );

    s.ok(
        "the derivation workflow selects the actual terminal Result and can feed a continued application into another late operation",
        rendering.includes(
            "directLateOperationResult ? surfaceFrame : null"
        )
            && rendering.includes(
                "|| surfaceFrame.state?.vncLateOperationClosureFrame"
            )
            && rendering.includes(
                "sourceApplicationFrame: continuedBaseVncApplicationFrame"
            )
            && !rendering.includes(
                "classical-vnc-result-source-continuation-late-operation-not-licensed"
            )
            && rendering.includes(
                'continueAction.textContent = "Continue this Result"'
            )
            && rendering.includes(
                '=== "classical-nahuatl-late-vnc-derivation-closure-frame"'
            )
            && shell.includes(
                'class="classical-rule-control__label">Next VNC derivation layer</span>'
            )
    );

    s.ok(
        "a causative or applicative Result keeps its exact owner-issued application frame when the next operation is honorific",
        renderingCompact.includes(
            "ActiveClassicalVncResultSourceApplicationFrame"
        )
            && renderingCompact.includes(
                "sourceApplicationFrame: ActiveClassicalVncResultSourceApplicationFrame"
            )
            && renderingCompact.includes(
                "sourceApplicationFrame: derivedSourceApplicationFrame"
            )
            && renderingCompact.includes(
                "sourceDerivationKind: String("
            )
            && renderingCompact.includes(
                "ActiveClassicalVncResultSourceProjection ?.sourceSubject"
            )
            && renderingCompact.includes(
                "ActiveClassicalVncResultSourceProjection ?.sourceObjectRequests"
            )
            && renderingCompact.includes(
                "canonicalParticipantChoiceKnown"
            )
            && renderingCompact.includes(
                "const priorParticipantFacts ="
            )
            && renderingCompact.includes(
                "participantFacts.possibleHonoredParticipants ?.includes(\"object\")"
            )
    );

    s.eq(
        "Continue this Result binds the exact Result, exposes inherited Source facts read-only, and runs the required second causative",
        (() => {
            const first = buildFirstCaquiCausative(ctx);
            const used =
                ctx.useClassicalWholeCanvasResultAsNextSource(
                    buildAuthorizedSurface(first)
                );
            configureSecondCausativeControls(ctx);
            ctx.renderClassicalRuleLogicSurfaceBlock({
                stem: "caquī-tiā",
            });
            const state = ctx.getClassicalRuleLogicSurfaceState({
                basalUnit: "vnc",
                mood: "indicative",
                tense: "present",
            });
            const controls = {
                stem: ctx.document.getElementById(
                    "classical-source-whole"
                ),
                verbClass: ctx.document.getElementById(
                    "classical-rule-logic-class"
                ),
                valence: ctx.document.getElementById(
                    "classical-rule-logic-valence"
                ),
                sourceSubject: ctx.document.getElementById(
                    "classical-rule-logic-subject"
                ),
                object: ctx.document.getElementById(
                    "classical-rule-logic-object"
                ),
                resultSubject: ctx.document.getElementById(
                    "classical-rule-logic-causative-result-subject"
                ),
            };
            const ambiguity = ctx.document.querySelector(
                "[data-classical-vnc-reverse-source-analyses]"
            );
            return {
                used,
                controls: {
                    stem: controls.stem.value,
                    verbClass: [
                        controls.verbClass.value,
                        controls.verbClass.disabled,
                    ],
                    valence: [
                        controls.valence.value,
                        controls.valence.disabled,
                    ],
                    sourceSubject: [
                        controls.sourceSubject.value,
                        controls.sourceSubject.disabled,
                    ],
                    object: [
                        controls.object.value,
                        controls.object.disabled,
                    ],
                    resultSubject: [
                        controls.resultSubject.value,
                        controls.resultSubject.disabled === true,
                    ],
                    oldAuthorityDatasets: [
                        controls.stem.dataset
                            .classicalNextSourceFromAuthorizedResult || "",
                        controls.stem.dataset
                            .classicalNextSourceAuthority || "",
                    ],
                },
                state: {
                    status:
                        state.vncApplicationFrame
                            ?.authorizationStatus || "",
                    reason:
                        state.vncApplicationFrame
                            ?.blockReason || "",
                    written:
                        state.vncApplicationFrame?.resultFrame
                            ?.surfaceRealization || "",
                    formula:
                        state.vncApplicationFrame?.resultFrame
                            ?.formulaRealization || "",
                    sourceStem:
                        state.vncApplicationFrame?.normalizedRequest
                            ?.sourceStem || "",
                    sourceValence:
                        state.vncApplicationFrame?.normalizedRequest
                            ?.sourceValence || "",
                    lateOperation: state.lateOperation || "",
                    requestedDerivation:
                        state.vncApplicationFrame?.normalizedRequest
                            ?.requestedDerivation || "",
                    derivationType:
                        state.vncApplicationFrame?.normalizedRequest
                            ?.derivationType || "",
                    resultReason:
                        state.vncApplicationFrame?.resultFrame
                            ?.blockReason || "",
                },
                ambiguity: {
                    disposition:
                        ambiguity?.dataset
                            ?.classicalVncReverseSourceAnalyses || "",
                    choice:
                        ambiguity?.dataset
                            ?.classicalVncReverseSourceChoice || "",
                    analyses: Array.from(
                        ambiguity?.querySelectorAll?.(
                            "[data-classical-vnc-reverse-source-analysis]"
                        ) || []
                    ).map(node => ({
                        status:
                            node.dataset
                                .classicalVncReverseSourceAnalysis || "",
                        grammarAuthority:
                            node.dataset.classicalGrammarAuthority || "",
                        text: node.textContent,
                    })),
                    controls:
                        ambiguity?.querySelectorAll?.(
                            "button, input, select, textarea"
                        ).length || 0,
                },
            };
        })(),
        {
            used: true,
            controls: {
                stem: "caquī-tiā",
                verbClass: ["C", true],
                valence: ["multiple-object", true],
                sourceSubject: ["1sg", true],
                object: ["multiple-object:3sg", true],
                resultSubject: ["3sg", false],
                oldAuthorityDatasets: ["", ""],
            },
            state: {
                status: "authorized",
                reason: "",
                written: "nēchcaquītiltia",
                formula:
                    "#0-0+n-ēch+⎕-⎕+⎕-0(caquī-ti-l-tia)0+0-0#",
                sourceStem: "caquī-tiā",
                sourceValence: "multiple-object",
                lateOperation: "none",
                requestedDerivation: "causative",
                derivationType: "causative",
                resultReason: "",
            },
            ambiguity: {
                disposition: "read-only-not-authority",
                choice: "none",
                // The Node runtime deliberately uses a non-tree DOM shim.
                // Live-browser proof below owns the rendered analysis cards;
                // this focused receipt proves the production render path
                // executed and kept the container non-authoritative.
                analyses: [],
                controls: 0,
            },
        }
    );

    s.eq(
        "the matching UI paradigm is a pointwise scalar continuation of the same exact Result",
        (() => {
            const state = ctx.getClassicalRuleLogicSurfaceState({
                basalUnit: "vnc",
                mood: "indicative",
                tense: "present",
            });
            const frame = ctx.buildClassicalVncParadigmFrame(
                state,
                {
                    valenceKeys: [state.targetValence],
                    groupKeys: ["imperfective-indicative"],
                    tenseKeys: ["present"],
                    subjectKeys: ["3sg"],
                }
            );
            const row = frame.rows[0] || null;
            return {
                status: frame.authorizationStatus,
                rowCount: frame.rowCount,
                written: row?.surface || "",
                word:
                    row?.preparedCoordinateFrame
                        ?.surfaceRealization || "",
                formula: row?.formula || "",
                scalarEquivalent:
                    row?.preparedCoordinateFrame
                        ?.scalarEquivalent === true,
            };
        })(),
        {
            status: "authorized",
            rowCount: 1,
            written: "Nēchcaquītiltia.",
            word: "nēchcaquītiltia",
            formula:
                "#0-0+n-ēch+⎕-⎕+⎕-0(caquī-ti-l-tia)0+0-0#",
            scalarEquivalent: true,
        }
    );

    s.eq(
        "copied Results, edited Source, and URL restoration cannot retain continuation authority",
        (() => {
            const first = buildFirstCaquiCausative(ctx);
            const copiedUse =
                ctx.useClassicalWholeCanvasResultAsNextSource(
                    buildAuthorizedSurface({
                        ...first,
                        resultFrame: { ...first.resultFrame },
                    })
                );
            const exactUse =
                ctx.useClassicalWholeCanvasResultAsNextSource(
                    buildAuthorizedSurface(first)
                );
            const stem = ctx.document.getElementById(
                "classical-source-whole"
            );
            stem.value = "caquī-tiā-edited";
            stem.dispatchEvent(new ctx.Event("input", {
                bubbles: true,
            }));
            const editedSourceInvalidated =
                ctx.clearClassicalVncResultSourceContinuation(
                    "source-constituent-edited"
                );
            const afterEdit = {
                classDisabled: ctx.document.getElementById(
                    "classical-rule-logic-class"
                ).disabled === true,
                valenceDisabled: ctx.document.getElementById(
                    "classical-rule-logic-valence"
                ).disabled === true,
                objectDisabled: ctx.document.getElementById(
                    "classical-rule-logic-object"
                ).disabled === true,
            };
            const exactUseAgain =
                ctx.useClassicalWholeCanvasResultAsNextSource(
                    buildAuthorizedSurface(first)
                );
            const restored = ctx.applyEntradaUrlStateSnapshot(
                ctx.normalizeEntradaUrlStateSnapshot({
                    input: "(caquī-tiā)",
                    derivationType: "causative",
                }),
                { triggerGenerate: false }
            );
            return {
                copiedUse,
                exactUse,
                editedSourceInvalidated,
                afterEdit,
                exactUseAgain,
                restored,
                afterRestore: {
                    classDisabled: ctx.document.getElementById(
                        "classical-rule-logic-class"
                    ).disabled === true,
                    valenceDisabled: ctx.document.getElementById(
                        "classical-rule-logic-valence"
                    ).disabled === true,
                    objectDisabled: ctx.document.getElementById(
                        "classical-rule-logic-object"
                    ).disabled === true,
                },
            };
        })(),
        {
            copiedUse: false,
            exactUse: true,
            editedSourceInvalidated: true,
            afterEdit: {
                classDisabled: false,
                valenceDisabled: false,
                objectDisabled: false,
            },
            exactUseAgain: true,
            restored: true,
            afterRestore: {
                classDisabled: false,
                valenceDisabled: false,
                objectDisabled: false,
            },
        }
    );

    return s;
}

module.exports = { run };
