"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const read = relativePath => fs.readFileSync(
    path.join(ROOT, relativePath),
    "utf8"
);

function countLiteral(source, literal) {
    return String(source || "").split(literal).length - 1;
}

function functionSlice(source, functionName, nextFunctionName) {
    const start = source.indexOf(`function ${functionName}`);
    const end = source.indexOf(`function ${nextFunctionName}`, start + 1);
    return start >= 0 && end > start ? source.slice(start, end) : "";
}

function createProbeElement(tagName = "div") {
    const attributes = new Map();
    const element = {
        tagName: String(tagName).toUpperCase(),
        id: "",
        className: "",
        dataset: {},
        children: [],
        hidden: false,
        open: false,
        value: "",
        textContent: "",
        parentNode: null,
        classList: {
            add() {},
            remove() {},
            toggle() {},
            contains() { return false; },
        },
        style: {
            setProperty() {},
            removeProperty() {},
        },
        setAttribute(name, value) {
            attributes.set(String(name), String(value));
        },
        getAttribute(name) {
            return attributes.has(String(name))
                ? attributes.get(String(name))
                : null;
        },
        removeAttribute(name) {
            attributes.delete(String(name));
        },
        append(...nodes) {
            nodes.forEach(node => this.appendChild(node));
        },
        appendChild(node) {
            if (node && typeof node === "object") {
                node.parentNode = this;
            }
            this.children.push(node);
            return node;
        },
        replaceChildren(...nodes) {
            this.children.forEach(node => {
                if (node && typeof node === "object") node.parentNode = null;
            });
            this.children = [];
            this.append(...nodes);
        },
        removeChild(node) {
            const index = this.children.indexOf(node);
            if (index >= 0) this.children.splice(index, 1);
            if (node && typeof node === "object") node.parentNode = null;
            return node;
        },
        remove() {
            this.parentNode?.removeChild?.(this);
        },
        querySelector(selector) {
            if (selector === ":scope > [data-classical-sgr-output-analysis]") {
                return this.children.find(child => (
                    child?.dataset?.classicalSgrOutputAnalysis === "true"
                )) || null;
            }
            return null;
        },
        querySelectorAll() {
            return [];
        },
        closest() {
            return null;
        },
        addEventListener() {},
        removeEventListener() {},
        focus() {},
    };
    Object.defineProperty(element, "innerHTML", {
        get() { return ""; },
        set() { element.replaceChildren(); },
    });
    return element;
}

function collectProbeNodes(root, predicate, output = []) {
    if (!root || typeof root !== "object") return output;
    if (predicate(root)) output.push(root);
    (root.children || []).forEach(child => (
        collectProbeNodes(child, predicate, output)
    ));
    return output;
}

function withProbeDocument(ctx, elementsById, callback) {
    const documentObject = ctx.document;
    const originalGetElementById = documentObject.getElementById;
    const originalQuerySelector = documentObject.querySelector;
    const originalQuerySelectorAll = documentObject.querySelectorAll;
    const originalCreateElement = documentObject.createElement;
    try {
        documentObject.getElementById = id => (
            elementsById.get(String(id || "")) || null
        );
        documentObject.querySelector = () => null;
        documentObject.querySelectorAll = () => [];
        documentObject.createElement = tagName => createProbeElement(tagName);
        return callback();
    } finally {
        documentObject.getElementById = originalGetElementById;
        documentObject.querySelector = originalQuerySelector;
        documentObject.querySelectorAll = originalQuerySelectorAll;
        documentObject.createElement = originalCreateElement;
    }
}

function run(ctx = {}) {
    const suite = createSuite("classical_sgr_orthography_surface");
    const shell = read("src/ui/shell/classical_shell.mjs");
    const rendering = read("src/ui/rendering/rendering.mjs");
    const application = read(
        "src/application/classical/grammar_application.mjs"
    );

    suite.eq(
        "orthography has no generic Grammar facts host or renderer projection",
        {
            shellHost: shell.includes("classical-grammar-facts"),
            rendererHost: rendering.includes("classical-grammar-facts"),
            rendererSynchronizer:
                rendering.includes("syncClassicalSgrGrammarFacts"),
            rendererValueResolver:
                rendering.includes("resolveClassicalSgrFactValue"),
        },
        {
            shellHost: false,
            rendererHost: false,
            rendererSynchronizer: false,
            rendererValueResolver: false,
        }
    );

    suite.eq(
        "sound entry is inside the one Stem structure",
        {
            operationRoot: countLiteral(
                shell,
                'id="classical-transcription-source"'
            ),
            input: countLiteral(
                shell,
                'id="classical-transcription-source-input"'
            ),
            apply: countLiteral(
                shell,
                'id="classical-transcription-source-apply"'
            ),
            status: countLiteral(
                shell,
                'id="classical-transcription-source-status"'
            ),
            exactOperation:
                shell.includes(
                    'data-classical-source-operation="orthography:transcription"'
                ),
            typedConstituentsOnly:
                shell.includes(
                    'data-classical-source-authorizes="typed-phonological-constituents-only"'
                )
                && shell.includes(
                    'data-classical-source-input-role="typed-phonological-constituents"'
                ),
            accessibleStatus:
                shell.includes(
                    'aria-describedby="classical-transcription-source-help classical-transcription-source-status"'
                )
                && shell.includes('aria-live="polite"'),
            insideStemStructure:
                shell.indexOf('id="classical-source-parts"')
                    < shell.indexOf('id="classical-transcription-source"')
                && shell.indexOf('id="classical-transcription-source"')
                    < shell.indexOf('id="classical-source-commit-status"'),
            noSecondVisibleSource:
                !shell.includes("Phonological source")
                && !shell.includes("Apply transcription"),
        },
        {
            operationRoot: 1,
            input: 1,
            apply: 1,
            status: 1,
            exactOperation: true,
            typedConstituentsOnly: true,
            accessibleStatus: true,
            insideStemStructure: true,
            noSecondVisibleSource: true,
        }
    );

    suite.eq(
        "the optional sound keyboard is owner-filtered and never limits typed input",
        {
            keyboard: countLiteral(
                shell,
                'id="classical-transcription-keyboard"'
            ),
            vowelKeys: Object.keys(
                ctx.CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS || {}
            ).length,
            consonantKeys: Object.keys(
                ctx.CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS || {}
            ).length,
            ownerFiltered:
                shell.includes(
                    "CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS"
                )
                && shell.includes(
                    "CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS"
                )
                && shell.includes("ownerVowels.has(token)")
                && shell.includes("ownerConsonants.has(token)"),
            insertsAtCaret:
                shell.includes("input.selectionStart")
                && shell.includes("input.selectionEnd")
                && shell.includes("input.setSelectionRange"),
            typingRemainsOpen:
                shell.includes("You can still type or edit anything.")
                && !shell.includes("classicalTranscriptionKeyboardOnly"),
            displayDoesNotAuthorize:
                shell.includes(
                    'button.dataset.classicalGrammarAuthority = "false"'
                ),
        },
        {
            keyboard: 1,
            vowelKeys: 8,
            consonantKeys: 15,
            ownerFiltered: true,
            insertsAtCaret: true,
            typingRemainsOpen: true,
            displayDoesNotAuthorize: true,
        }
    );

    const installSlice = functionSlice(
        shell,
        "installClassicalTranscriptionSourcePresentation",
        "installClassicalWorkbenchPresentation"
    );
    suite.eq(
        "Enter and Use sounds share the same pending-versus-committed path",
        {
            pendingDoesNotExecute:
                installSlice.includes(
                    'root.dataset.classicalSourceCommitState = "pending"'
                )
                && installSlice.includes(
                    "Grammar and Result still use the sounds you last applied."
                ),
            sharedApply:
                installSlice.includes(
                    "targetObject.applyClassicalTranscriptionSource?.(input.value)"
                )
                && installSlice.includes('event.key === "Enter"')
                && installSlice.includes(
                    'applyButton.addEventListener("click", applySource)'
                ),
            shellOwnsNoGrammarExecution:
                !installSlice.includes("executeClassicalGrammarApplicationRequest")
                && !installSlice.includes(
                    "buildClassicalNahuatlTranscriptionFrame"
                ),
        },
        {
            pendingDoesNotExecute: true,
            sharedApply: true,
            shellOwnsNoGrammarExecution: true,
        }
    );

    const applySlice = functionSlice(
        rendering,
        "applyClassicalTranscriptionSource",
        "renderClassicalRuleLogicSurfaceBlock"
    );
    suite.eq(
        "the renderer admits owner tokens and executes the canonical orthography application",
        {
            publicApi:
                typeof ctx.applyClassicalTranscriptionSource === "function"
                && /api\.applyClassicalTranscriptionSource\s*=\s*applyClassicalTranscriptionSource/gu
                    .test(rendering),
            applicationOwnsSourceConstruction:
                typeof ctx.issueClassicalTranscriptionSourceFrame ===
                    "function"
                && application.includes(
                    '"buildClassicalNahuatlTranscriptionSourceFrame"'
                ),
            rendererPassesParsedConstituents:
                applySlice.includes(
                    "issueClassicalTranscriptionSourceFrame"
                ),
            rendererCallsNoGrammarConstructor:
                !applySlice.includes(
                    "buildClassicalNahuatlTranscriptionSourceFrame"
                ),
            canonicalApplication:
                applySlice.includes(
                    "executeClassicalGrammarApplicationRequest"
                )
                && applySlice.includes('operationId: "orthography:transcription"'),
            noDirectResultConstruction:
                !applySlice.includes("buildClassicalNahuatlTranscriptionFrame"),
            noDisplayCarrierAuthority:
                !applySlice.includes("formulaStringAuthority: true")
                && !applySlice.includes("surfaceStringAuthority: true")
                && !applySlice.includes("displayTextAuthority: true"),
        },
        {
            publicApi: true,
            applicationOwnsSourceConstruction: true,
            rendererPassesParsedConstituents: true,
            rendererCallsNoGrammarConstructor: true,
            canonicalApplication: true,
            noDirectResultConstruction: true,
            noDisplayCarrierAuthority: true,
        }
    );

    const resultRoot = createProbeElement("section");
    const canonicalSource =
        ctx.issueClassicalTranscriptionSourceFrame([
            { segments: ["/k/", "a", "/l/"] },
        ]);
    const canonicalApplication =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "orthography:transcription",
            args: [canonicalSource],
        });
    const canonicalResult = canonicalApplication.canonicalResult;
    const synchronized = withProbeDocument(
        ctx,
        new Map(),
        () => ctx.syncClassicalSourceGrammarResultSurface(
            canonicalResult,
            resultRoot
        )
    );
    const canonicalOwnerProjection =
        ctx.getClassicalSgrOwnerIssuedProjection(canonicalResult);
    const inventory = ctx.getClassicalSourceGrammarResultSurfaceInventory();
    const orthographyAxes = inventory.axes.filter(atom => (
        atom.operationId === "orthography:transcription"
    ));
    const analysisSections = collectProbeNodes(
        resultRoot,
        node => Boolean(node.dataset?.classicalOutputContractId)
    );
    const analysisLines = collectProbeNodes(
        resultRoot,
        node => String(node.className || "").split(/\s+/u)
            .includes("grammar-inspector__line")
    );
    suite.eq(
        "the exact canonical orthography Result keeps three axes private and projects one Result analysis",
        {
            synchronized,
            canonicalApplicationIssued:
                ctx.isClassicalGrammarApplicationResult(
                    canonicalApplication
                ),
            canonicalIdentity:
                canonicalApplication.canonicalResult === canonicalResult
                && canonicalOwnerProjection?.applicationResult
                    === canonicalApplication
                && canonicalOwnerProjection?.canonicalResult
                    === canonicalResult,
            canonicalResultIssued:
                ctx.isClassicalNahuatlTranscriptionFrame(
                    canonicalResult
                ),
            canonicalKind: canonicalResult.kind,
            canonicalAuthorizationStatus:
                canonicalResult.authorizationStatus,
            sourceIdentity:
                canonicalResult.sourceFrame === canonicalSource,
            formulaProjectionMatches:
                canonicalResult.formulaProjection?.formula
                    === canonicalResult.formula,
            writtenProjectionMatches:
                canonicalResult.writtenProjection?.surface
                    === canonicalResult.surface,
            independentProjections:
                canonicalResult.formulaProjection
                    ?.derivedFromWrittenProjection === false
                && canonicalResult.writtenProjection
                    ?.derivedFromFormulaProjection === false,
            privateAxes: orthographyAxes.map(atom => ({
                atomId: atom.atomId,
                disposition: atom.disposition,
                public: atom.binding?.public,
                proofBoundary: atom.proof?.boundary,
            })).sort((left, right) => left.atomId.localeCompare(right.atomId)),
            outputContractIds:
                resultRoot.dataset.classicalOutputContractIds,
            resultAuthority:
                resultRoot.dataset.classicalSgrResultAuthority,
            analysis: analysisSections.map(section => ({
                atomId: section.dataset.classicalOutputContractId,
                operationId: section.dataset.classicalAnalysisOperationId,
                resultKind: section.dataset.classicalAnalysisResultKind,
                authorizationStatus:
                    section.dataset.classicalAnalysisAuthorizationStatus,
                ownerIssued: section.dataset.classicalAnalysisOwnerIssued,
                grammarAuthority:
                    section.dataset.classicalGrammarAuthority,
            })),
            analysisLabels: analysisLines.map(
                line => line.dataset.lineLabel
            ),
            analysisValues: analysisLines.map(
                line => line.children[1]?.textContent
            ),
        },
        {
            synchronized: true,
            canonicalApplicationIssued: true,
            canonicalIdentity: true,
            canonicalResultIssued: true,
            canonicalKind: "classical-nahuatl-transcription-frame",
            canonicalAuthorizationStatus: "authorized",
            sourceIdentity: true,
            formulaProjectionMatches: true,
            writtenProjectionMatches: true,
            independentProjections: true,
            privateAxes: [
                {
                    atomId:
                        "CAA-orthography-transcription--orthographic-realization",
                    disposition: "intentionally-unsurfaced",
                    public: false,
                    proofBoundary: "private",
                },
                {
                    atomId:
                        "CAA-orthography-transcription--phonological-boundary",
                    disposition: "intentionally-unsurfaced",
                    public: false,
                    proofBoundary: "private",
                },
                {
                    atomId:
                        "CAA-orthography-transcription--transcription-source",
                    disposition: "intentionally-unsurfaced",
                    public: false,
                    proofBoundary: "private",
                },
            ],
            outputContractIds: "CAO-orthography-transcription--scalar",
            resultAuthority: "canonical-only",
            analysis: [{
                atomId: "CAO-orthography-transcription--scalar",
                operationId: "orthography:transcription",
                resultKind: "classical-nahuatl-transcription-frame",
                authorizationStatus: "authorized",
                ownerIssued: "true",
                grammarAuthority: "false",
            }],
            analysisLabels: [
                "stem sounds",
                "contextual realization",
                "boundary realization",
            ],
            analysisValues: [
                canonicalResult.formula,
                ctx.formatClassicalClauseRelationValue(
                    canonicalResult.surface
                ),
                ctx.formatClassicalClauseRelationValue("contextual"),
            ],
        }
    );

    const sourceRoot = createProbeElement("details");
    const sourceInput = createProbeElement("input");
    const sourceStatus = createProbeElement("p");
    const authorityPanel = createProbeElement("section");
    const grammarContinuation = createProbeElement("section");
    const routeResultRoot = createProbeElement("section");
    const routeProbe = withProbeDocument(
        ctx,
        new Map([
            ["classical-transcription-source", sourceRoot],
            ["classical-transcription-source-input", sourceInput],
            ["classical-transcription-source-status", sourceStatus],
            ["classical-authority-panel", authorityPanel],
            ["classical-grammar-continuation", grammarContinuation],
            ["classical-rule-logic-surface", routeResultRoot],
        ]),
        () => {
            const valid = ctx.applyClassicalTranscriptionSource(
                "/k/ a /l/"
            );
            const validSnapshot = {
                sourceState:
                    sourceRoot.dataset.classicalSourceCommitState,
                committedSource:
                    sourceRoot.dataset.classicalCommittedSource,
                sourceActive:
                    sourceRoot.dataset.classicalSourceActive,
                ownerTokensOnly:
                    sourceInput.dataset.classicalOwnerTokensOnly,
                inputInvalid: sourceInput.getAttribute("aria-invalid"),
                sourceStatus: sourceStatus.textContent,
                resultChildren: routeResultRoot.children.slice(),
            };
            const hostileDisplayString =
                ctx.applyClassicalTranscriptionSource("cal");
            const hostileSnapshot = {
                sourceState:
                    sourceRoot.dataset.classicalSourceCommitState,
                committedSource:
                    sourceRoot.dataset.classicalCommittedSource,
                blockReason:
                    sourceRoot.dataset.classicalBlockReason,
                ownerTokensOnly:
                    sourceInput.dataset.classicalOwnerTokensOnly,
                inputInvalid: sourceInput.getAttribute("aria-invalid"),
                resultPreserved:
                    routeResultRoot.children.length
                        === validSnapshot.resultChildren.length
                    && routeResultRoot.children.every(
                        (node, index) => (
                            node === validSnapshot.resultChildren[index]
                        )
                    ),
            };
            const empty = ctx.applyClassicalTranscriptionSource("");
            return {
                valid,
                validSnapshot,
                hostileDisplayString,
                hostileSnapshot,
                empty,
                emptySnapshot: {
                    committedSource:
                        sourceRoot.dataset.classicalCommittedSource,
                    blockReason:
                        sourceRoot.dataset.classicalBlockReason,
                    resultPreserved:
                        routeResultRoot.children.length
                            === validSnapshot.resultChildren.length
                        && routeResultRoot.children.every(
                            (node, index) => (
                                node === validSnapshot.resultChildren[index]
                            )
                        ),
                },
            };
        }
    );
    const routeAnswer = collectProbeNodes(
        routeResultRoot,
        node => node.dataset?.classicalTranscriptionSurface
            === "canonical-result"
    )[0] || null;
    const routePrimaryAnswer = collectProbeNodes(
        routeResultRoot,
        node => node.dataset?.classicalResultPrimaryAnswer === "true"
    )[0] || null;
    const routeAnalysis = collectProbeNodes(
        routeResultRoot,
        node => node.dataset?.classicalSgrOutputAnalysis === "true"
    )[0] || null;
    const routeAnalysisSection = collectProbeNodes(
        routeResultRoot,
        node => node.dataset?.classicalOutputContractId
            === "CAO-orthography-transcription--scalar"
    )[0] || null;
    const routeAnalysisLines = collectProbeNodes(
        routeAnalysisSection,
        node => String(node.className || "").split(/\s+/u)
            .includes("grammar-inspector__line")
    );
    suite.eq(
        "the public Source route returns the exact canonical Result and keeps answer before analysis",
        {
            resultIssued: ctx.isClassicalGrammarApplicationResult(
                routeProbe.valid
            ),
            operationId: routeProbe.valid?.operationId,
            outputKind: routeProbe.valid?.outputKind,
            canonicalKind: routeProbe.valid?.canonicalResult?.kind,
            canonicalSurface: routeProbe.valid?.canonicalResult?.surface,
            sourceKind:
                routeProbe.valid?.canonicalResult?.sourceFrame?.kind,
            sourceSegments:
                routeProbe.valid?.canonicalResult?.sourceFrame
                    ?.constituents?.map(constituent => constituent.segments),
            committed: {
                sourceState:
                    routeProbe.validSnapshot.sourceState,
                committedSource:
                    routeProbe.validSnapshot.committedSource,
                sourceActive:
                    routeProbe.validSnapshot.sourceActive,
                ownerTokensOnly:
                    routeProbe.validSnapshot.ownerTokensOnly,
                inputInvalid:
                    routeProbe.validSnapshot.inputInvalid,
                sourceStatus:
                    routeProbe.validSnapshot.sourceStatus,
            },
            resultOperation:
                routeResultRoot.dataset.classicalSgrStandaloneOperation,
            resultAuthority:
                routeResultRoot.dataset.classicalSgrResultAuthority,
            outputContractIds:
                routeResultRoot.dataset.classicalOutputContractIds,
            answer: routeAnswer?.textContent,
            primaryAnswer: Boolean(routePrimaryAnswer),
            analysisOpen: routeAnalysis?.open === true,
            answerBeforeAnalysis:
                routeResultRoot.children.indexOf(routePrimaryAnswer)
                    < routeResultRoot.children.indexOf(routeAnalysis),
            analysis: {
                atomId:
                    routeAnalysisSection?.dataset.classicalOutputContractId,
                disposition:
                    routeAnalysisSection?.dataset.classicalOutputDisposition,
                operationId:
                    routeAnalysisSection?.dataset
                        .classicalAnalysisOperationId,
                resultKind:
                    routeAnalysisSection?.dataset.classicalAnalysisResultKind,
                authorizationStatus:
                    routeAnalysisSection?.dataset
                        .classicalAnalysisAuthorizationStatus,
                ownerIssued:
                    routeAnalysisSection?.dataset.classicalAnalysisOwnerIssued,
                grammarAuthority:
                    routeAnalysisSection?.dataset.classicalGrammarAuthority,
                labels: routeAnalysisLines.map(
                    line => line.dataset.lineLabel
                ),
                values: routeAnalysisLines.map(
                    line => line.children[1]?.textContent
                ),
            },
        },
        {
            resultIssued: true,
            operationId: "orthography:transcription",
            outputKind: "scalar",
            canonicalKind: "classical-nahuatl-transcription-frame",
            canonicalSurface: "cal",
            sourceKind: "classical-nahuatl-transcription-source-frame",
            sourceSegments: [["/k/", "a", "/l/"]],
            committed: {
                sourceState: "committed",
                committedSource: "/k/ a /l/",
                sourceActive: "true",
                ownerTokensOnly: "true",
                inputInvalid: "false",
                sourceStatus:
                    "/k/ a /l/ is the sound structure now used by Grammar and Result.",
            },
            resultOperation: "orthography:transcription",
            resultAuthority: "canonical-only",
            outputContractIds: "CAO-orthography-transcription--scalar",
            answer: "cal",
            primaryAnswer: true,
            analysisOpen: true,
            answerBeforeAnalysis: true,
            analysis: {
                atomId: "CAO-orthography-transcription--scalar",
                disposition: "analysis-readout",
                operationId: "orthography:transcription",
                resultKind: "classical-nahuatl-transcription-frame",
                authorizationStatus: "authorized",
                ownerIssued: "true",
                grammarAuthority: "false",
                labels: [
                    "stem sounds",
                    "contextual realization",
                    "boundary realization",
                ],
                values: [
                    routeProbe.valid.canonicalResult.formula,
                    ctx.formatClassicalClauseRelationValue(
                        routeProbe.valid.canonicalResult.surface
                    ),
                    ctx.formatClassicalClauseRelationValue("contextual"),
                ],
            },
        }
    );
    suite.eq(
        "empty, visible-result, and unknown-token input cannot replace the committed Result",
        {
            visibleStringRejected:
                routeProbe.hostileDisplayString === null,
            visibleStringState: routeProbe.hostileSnapshot,
            emptyRejected: routeProbe.empty === null,
            emptyState: routeProbe.emptySnapshot,
        },
        {
            visibleStringRejected: true,
            visibleStringState: {
                sourceState: "invalid",
                committedSource: "/k/ a /l/",
                blockReason: "classical-transcription-segment-not-licensed",
                ownerTokensOnly: "false",
                inputInvalid: "true",
                resultPreserved: true,
            },
            emptyRejected: true,
            emptyState: {
                committedSource: "/k/ a /l/",
                blockReason:
                    "classical-transcription-typed-constituents-required",
                resultPreserved: true,
            },
        }
    );

    return suite;
}

module.exports = { run };
