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
        selectionStart: 0,
        selectionEnd: 0,
        _listeners: new Map(),
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
        prepend(...nodes) {
            nodes.slice().reverse().forEach(node => {
                if (node && typeof node === "object") {
                    node.parentNode = this;
                }
                this.children.unshift(node);
            });
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
        closest(selector) {
            return selector === "[data-classical-transcription-token]"
                && this.dataset.classicalTranscriptionToken
                ? this
                : null;
        },
        addEventListener(type, listener) {
            const listeners = this._listeners.get(type) || [];
            listeners.push(listener);
            this._listeners.set(type, listeners);
        },
        removeEventListener() {},
        dispatchEvent(event) {
            (this._listeners.get(event?.type) || []).forEach(listener => (
                listener.call(this, event)
            ));
            return true;
        },
        contains(node) {
            return node === this || collectProbeNodes(
                this,
                candidate => candidate === node
            ).length > 0;
        },
        setSelectionRange(start, end) {
            this.selectionStart = start;
            this.selectionEnd = end;
        },
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
    (root.children || []).forEach(child => collectProbeNodes(child, predicate, output));
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
        "long-vowel helpers use the real Stem fields without a separate Writing Source",
        {
            secondSource: countLiteral(
                shell,
                'id="classical-transcription-source"'
            ),
            secondInput: countLiteral(
                shell,
                'id="classical-transcription-source-input"'
            ),
            secondApply: countLiteral(
                shell,
                'id="classical-transcription-source-apply"'
            ),
            insideStemStructure:
                shell.indexOf('id="classical-source-parts"')
                    < shell.indexOf('id="classical-transcription-keyboard"')
                && shell.indexOf('id="classical-transcription-keyboard"')
                    < shell.indexOf('id="classical-source-commit-status"'),
            realTargets:
                shell.includes('id="classical-source-whole"')
                && shell.includes('id="classical-source-embed"')
                && shell.includes('id="classical-source-matrix"'),
        },
        {
            secondSource: 0,
            secondInput: 0,
            secondApply: 0,
            insideStemStructure: true,
            realTargets: true,
        }
    );

    suite.eq(
        "the four long-vowel helpers are owner-filtered and never limit typed input",
        {
            keyboard: countLiteral(
                shell,
                'id="classical-transcription-keyboard"'
            ),
            unnecessaryHeadingRemoved:
                !shell.includes("classical-transcription-keyboard__title")
                && !shell.includes("Click a sound to type it directly"),
            longVowelGroup: shell.includes('role="group" aria-label="Long vowels"'),
            noSoundAlphabet: !shell.includes('id="classical-transcription-keyboard-consonants"')
                && !shell.includes('>Sound keyboard<'),
            availableLongVowels: ["ā", "ē", "ī", "ō"].filter(token => Object.hasOwn(
                ctx.CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS || {}, token
            )).length,
            ownerFiltered: shell.includes("ownerVowels.has(token)"),
            insertsAtCaret:
                shell.includes("input.selectionStart")
                && shell.includes("input.selectionEnd")
                && shell.includes("input.setSelectionRange"),
            typingRemainsOpen:
                !shell.includes("classicalTranscriptionKeyboardOnly")
                && shell.includes('id="classical-source-whole"')
                && shell.includes('type="text"'),
            displayDoesNotAuthorize:
                shell.includes(
                    'button.dataset.classicalGrammarAuthority = "false"'
                ),
        },
        {
            keyboard: 1,
            unnecessaryHeadingRemoved: true,
            longVowelGroup: true,
            noSoundAlphabet: true,
            availableLongVowels: 4,
            ownerFiltered: true,
            insertsAtCaret: true,
            typingRemainsOpen: true,
            displayDoesNotAuthorize: true,
        }
    );
    const compactSoundResult =
        ctx.buildClassicalNahuatlCompactTranscriptionFrame?.(
            "i/kʷ//s/i"
        );
    suite.eq(
        "an internal compact sound sequence still reaches the canonical written Result",
        {
            status: compactSoundResult?.authorizationStatus,
            formula: compactSoundResult?.formula,
            surface: compactSoundResult?.surface,
            typedFrame: ctx.isClassicalNahuatlTranscriptionFrame?.(
                compactSoundResult
            ),
        },
        {
            status: "authorized",
            formula: "#(i/kʷ//s/i)#",
            surface: "iucci",
            typedFrame: true,
        }
    );
    // Resolve the typed compound boundary through its owner before entering VNC.
    // A raw hyphenated string is not an owner-issued written Source.
    const compoundWritten = ctx.writeClassicalNahuatlLesson2Result(
        ctx.issueClassicalNahuatlLesson2WritingSource({
            parts: [{role: "embed", value: "tenam"}, {role: "matrix", value: "ca"}],
            boundaryKind: "compound",
        })
    );
    const compoundVncResult = ctx.executeClassicalGrammarApplicationRequest?.({
        operationId: "vnc:application",
        args: [{
            sourceStem: compoundWritten.surface,
            verbClass: "A",
            sourceValence: "intransitive",
            subject: "1sg",
            requestedDerivation: "direct",
            requestedVoice: "active",
            mood: "indicative",
            tense: "present",
            outputKind: "single",
        }],
    });
    suite.eq(
        "owner-written Embed plus Matrix enters the normal VNC Result",
        {
            status: compoundVncResult?.authorizationStatus,
            writtenStem:
                compoundVncResult?.canonicalResult?.normalizedRequest
                    ?.sourceStem,
            sourceSelection:
                compoundVncResult?.canonicalResult?.resultFrame
                    ?.sourceMachineryFrame?.sourceSelectionFrame
                    ?.authorizationStatus,
            surface:
                compoundVncResult?.canonicalResult?.resultFrame
                    ?.surfaceRealization,
            writingMode:
                compoundVncResult?.lesson2WritingOutputs?.[0]?.mode,
        },
        {
            status: "authorized",
            writtenStem: "tenanca",
            sourceSelection: "authorized",
            surface: "nitenanca",
            writingMode: "lesson2-writer",
        }
    );

    const installSlice = functionSlice(
        shell,
        "installClassicalTranscriptionSourcePresentation",
        "installClassicalWorkbenchPresentation"
    );
    suite.eq(
        "keyboard clicks type into the active real Stem field",
        {
            directStemTargets:
                installSlice.includes(
                    '"classical-source-whole"'
                )
                && installSlice.includes(
                    '"classical-source-embed"'
                )
                && installSlice.includes(
                    '"classical-source-matrix"'
                ),
            focusedEmbedOrMatrix:
                installSlice.includes("activeInput === matrixInput")
                && installSlice.includes('input.addEventListener("focus"'),
            directInsertion:
                installSlice.includes('input.value = `${before}${insertion}${after}`')
                && installSlice.includes('sourceParts.dataset.classicalSourceCommitState = "pending"'),
            noSeparateApply:
                !installSlice.includes("applyClassicalTranscriptionSource"),
            shellOwnsNoGrammarExecution:
                !installSlice.includes("executeClassicalGrammarApplicationRequest")
                && !installSlice.includes(
                    "buildClassicalNahuatlTranscriptionFrame"
                ),
        },
        {
            directStemTargets: true,
            focusedEmbedOrMatrix: true,
            directInsertion: true,
            noSeparateApply: true,
            shellOwnsNoGrammarExecution: true,
        }
    );

    const keyboard = createProbeElement("div");
    const vowelKeys = createProbeElement("div");
    keyboard.append(vowelKeys);
    const sourceParts = createProbeElement("div");
    sourceParts.dataset.classicalSourcePartsMode = "whole-stem";
    const wholeInput = createProbeElement("input");
    wholeInput.id = "classical-source-whole";
    wholeInput.value = "ca";
    wholeInput.selectionStart = 2;
    wholeInput.selectionEnd = 2;
    const embedInput = createProbeElement("input");
    embedInput.id = "classical-source-embed";
    const matrixInput = createProbeElement("input");
    matrixInput.id = "classical-source-matrix";
    matrixInput.value = "ti";
    matrixInput.selectionStart = 2;
    matrixInput.selectionEnd = 2;
    const wholeMode = createProbeElement("button");
    wholeMode.dataset.classicalSourcePartsKind = "whole-stem";
    const embedMatrixMode = createProbeElement("button");
    embedMatrixMode.dataset.classicalSourcePartsKind = "embed-matrix";
    sourceParts.querySelectorAll = selector => (
        selector === "[data-classical-source-parts-kind]"
            ? [wholeMode, embedMatrixMode]
            : []
    );
    const directKeyboardProbe = withProbeDocument(
        ctx,
        new Map([
            ["classical-transcription-keyboard", keyboard],
            ["classical-transcription-keyboard-vowels", vowelKeys],
            ["classical-source-parts", sourceParts],
            ["classical-source-whole", wholeInput],
            ["classical-source-embed", embedInput],
            ["classical-source-matrix", matrixInput],
        ]),
        () => {
            const installed = ctx.installClassicalTranscriptionSourcePresentation();
            const longAKey = vowelKeys.children.find(key => key.textContent === "ā");
            keyboard.dispatchEvent({
                type: "click",
                target: longAKey,
                preventDefault() {},
            });
            sourceParts.dataset.classicalSourcePartsMode = "embed-matrix";
            embedMatrixMode.dispatchEvent({ type: "click" });
            const longOKey = vowelKeys.children.find(
                key => key.textContent === "ō"
            );
            keyboard.dispatchEvent({
                type: "click",
                target: longOKey,
                preventDefault() {},
            });
            matrixInput.dispatchEvent({ type: "focus" });
            keyboard.dispatchEvent({
                type: "click",
                target: longOKey,
                preventDefault() {},
            });
            return {
                installed,
                whole: wholeInput.value,
                embed: embedInput.value,
                matrix: matrixInput.value,
                target: keyboard.dataset.classicalTranscriptionTarget,
                state: sourceParts.dataset.classicalSourceCommitState,
            };
        }
    );
    suite.eq(
        "a click writes directly to Stem, then to the focused Matrix",
        directKeyboardProbe,
        {
            installed: true,
            whole: "caā",
            embed: "ō",
            matrix: "tiō",
            target: "classical-source-matrix",
            state: "pending",
        }
    );

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
    const canonicalOwnerProjection = ctx.getClassicalSgrOwnerIssuedProjection(canonicalResult);
    const inventory = ctx.getClassicalSourceGrammarResultSurfaceInventory();
    const orthographyAxes = inventory.axes.filter(atom => atom.operationId === "orthography:transcription");
    suite.eq("internal orthography retains exact canonical identity and private axes", {
        applicationIssued: ctx.isClassicalGrammarApplicationResult(canonicalApplication),
        resultIssued: ctx.isClassicalNahuatlTranscriptionFrame(canonicalResult),
        exactApplication: canonicalOwnerProjection?.applicationResult === canonicalApplication,
        exactResult: canonicalOwnerProjection?.canonicalResult === canonicalResult,
        sourceIdentity: canonicalResult.sourceFrame === canonicalSource,
        formulaProjection: canonicalResult.formulaProjection?.formula === canonicalResult.formula,
        writtenProjection: canonicalResult.writtenProjection?.surface === canonicalResult.surface,
        distinctProjections: canonicalResult.formulaProjection !== canonicalResult.writtenProjection
            && canonicalResult.formulaProjection?.derivedFromWrittenProjection === false
            && canonicalResult.writtenProjection?.derivedFromFormulaProjection === false,
        privateAxes: orthographyAxes.map(atom => ({atomId: atom.atomId, disposition: atom.disposition, public: atom.binding?.public, proofBoundary: atom.proof?.boundary})).sort((a,b)=>a.atomId.localeCompare(b.atomId)),
    }, {
        applicationIssued: true, resultIssued: true, exactApplication: true, exactResult: true,
        sourceIdentity: true, formulaProjection: true, writtenProjection: true, distinctProjections: true,
        privateAxes: ["orthographic-realization", "phonological-boundary", "transcription-source"].map(name=>({atomId: `CAA-orthography-transcription--${name}`, disposition: "intentionally-unsurfaced", public: false, proofBoundary: "private"})),
    });
    suite.eq("copied internal orthography Source cannot authorize a result", {
        copiedSourceIssued: ctx.isClassicalNahuatlTranscriptionSourceFrame({...canonicalSource}),
        applicationStatus: ctx.executeClassicalGrammarApplicationRequest({operationId: "orthography:transcription", args: [{...canonicalSource}]}).authorizationStatus,
    }, {copiedSourceIssued: false, applicationStatus: "blocked"});

    // No public Writing Source lane remains. Source staging/field insertion is
    // covered by long_vowel_input.test.mjs; canonical spelling stays below.
    suite.eq(
        "Lesson 2 writes the whole sound sequence and the same Embed plus Matrix boundary as iucci",
        (() => {
            const realize = (sourceText) => {
                const parsed = ctx.parseClassicalTranscriptionSourceInput(
                    sourceText
                );
                const application =
                    ctx.executeClassicalGrammarApplicationRequest({
                        operationId: "orthography:transcription",
                        outputKind: "scalar",
                        args: [
                            ctx.buildClassicalNahuatlTranscriptionSourceFrame({
                                constituents: parsed.constituents,
                            }),
                        ],
                    });
                return {
                    status: application.authorizationStatus,
                    constituents: application.canonicalResult?.sourceFrame
                        ?.constituents?.map(
                            constituent => constituent.segments
                        ),
                    result: application.canonicalResult?.surface,
                };
            };
            return {
                whole: realize("i /kʷ/ /s/ i"),
                embedMatrix: realize("i /kʷ/ | /s/ i"),
            };
        })(),
        {
            whole: {
                status: "authorized",
                constituents: [["i", "/kʷ/", "/s/", "i"]],
                result: "iucci",
            },
            embedMatrix: {
                status: "authorized",
                constituents: [["i", "/kʷ/"], ["/s/", "i"]],
                result: "iucci",
            },
        }
    );
    return suite;
}

module.exports = { run };
