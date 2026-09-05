"use strict";

const { createSuite } = require("./runner");

function collectNodes(root, predicate, output = []) {
    if (!root || typeof root !== "object") return output;
    if (predicate(root)) output.push(root);
    (root.children || []).forEach(child => (
        collectNodes(child, predicate, output)
    ));
    return output;
}

function createProbeElement(tagName = "div") {
    const attributes = new Map();
    let literalText = "";
    const element = {
        tagName: String(tagName).toUpperCase(),
        id: "",
        className: "",
        dataset: {},
        children: [],
        hidden: false,
        disabled: false,
        open: false,
        value: "",
        checked: false,
        parentNode: null,
        parentElement: null,
        style: {
            setProperty() {},
            removeProperty() {},
        },
        classList: {
            add(...names) {
                const classes = new Set(
                    element.className.split(/\s+/u).filter(Boolean)
                );
                names.forEach(name => classes.add(String(name)));
                element.className = [...classes].join(" ");
            },
            remove(...names) {
                const removed = new Set(names.map(String));
                element.className = element.className.split(/\s+/u)
                    .filter(name => name && !removed.has(name))
                    .join(" ");
            },
            toggle(name, force) {
                const enabled = force === undefined
                    ? !this.contains(name)
                    : Boolean(force);
                if (enabled) this.add(name);
                else this.remove(name);
                return enabled;
            },
            contains(name) {
                return element.className.split(/\s+/u)
                    .includes(String(name));
            },
        },
        setAttribute(name, value) {
            const key = String(name);
            const normalized = String(value);
            attributes.set(key, normalized);
            if (key === "id") this.id = normalized;
            if (key === "class") this.className = normalized;
        },
        getAttribute(name) {
            return attributes.get(String(name)) ?? null;
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
                node.parentElement = this;
            }
            this.children.push(node);
            return node;
        },
        prepend(...nodes) {
            nodes.slice().reverse().forEach(node => {
                if (node && typeof node === "object") {
                    node.parentNode = this;
                    node.parentElement = this;
                }
                this.children.unshift(node);
            });
        },
        insertBefore(node, referenceNode) {
            const index = this.children.indexOf(referenceNode);
            if (index < 0) return this.appendChild(node);
            if (node && typeof node === "object") {
                node.parentNode = this;
                node.parentElement = this;
            }
            this.children.splice(index, 0, node);
            return node;
        },
        replaceChildren(...nodes) {
            this.children.forEach(node => {
                if (node && typeof node === "object") {
                    node.parentNode = null;
                    node.parentElement = null;
                }
            });
            this.children = [];
            literalText = "";
            this.append(...nodes);
        },
        removeChild(node) {
            const index = this.children.indexOf(node);
            if (index >= 0) this.children.splice(index, 1);
            if (node && typeof node === "object") {
                node.parentNode = null;
                node.parentElement = null;
            }
            return node;
        },
        remove() {
            this.parentElement?.removeChild?.(this);
        },
        contains(node) {
            return node === this || collectNodes(
                this,
                candidate => candidate === node
            ).length > 0;
        },
        querySelector() { return null; },
        querySelectorAll() { return []; },
        closest() { return null; },
        addEventListener() {},
        removeEventListener() {},
        focus() {},
        scrollIntoView() {},
    };
    Object.defineProperties(element, {
        childElementCount: {
            get() {
                return element.children.filter(node => (
                    node && typeof node === "object"
                )).length;
            },
        },
        firstChild: {
            get() { return element.children[0] || null; },
        },
        textContent: {
            get() {
                if (element.children.length) {
                    return element.children.map(node => (
                        node && typeof node === "object"
                            ? String(node.textContent || "")
                            : String(node || "")
                    )).join("");
                }
                return literalText;
            },
            set(value) {
                literalText = String(value ?? "");
                element.children = [];
            },
        },
        innerHTML: {
            get() { return ""; },
            set() { element.replaceChildren(); },
        },
    });
    return element;
}

function setControl(documentObject, id, value) {
    documentObject.getElementById(id).value = value;
}

function renderDenominalResult(ctx) {
    const documentObject = ctx.document;
    const resultRoot = createProbeElement("section");
    resultRoot.dataset.classicalPersonalNameSentenceOperation = "stale";
    resultRoot.dataset.classicalCapabilityAppliedOperation = "stale";
    let denominalApplicationResult = null;
    const unsubscribe =
        ctx.subscribeClassicalGrammarApplicationAtlasObservations(
            observation => {
                if (observation?.operationId === "vnc:denominal") {
                    denominalApplicationResult =
                        observation.applicationResult || null;
                }
            }
        );
    const original = {
        getElementById: documentObject.getElementById,
        querySelector: documentObject.querySelector,
        querySelectorAll: documentObject.querySelectorAll,
        createElement: documentObject.createElement,
        createTextNode: documentObject.createTextNode,
    };
    try {
        setControl(documentObject, "classical-source-whole", "tlīl");
        setControl(documentObject, "classical-source-embed", "");
        setControl(documentObject, "classical-source-matrix", "");
        setControl(documentObject, "classical-construction-operation", "denominal-vnc");
        setControl(documentObject, "classical-rule-logic-subject", "3sg");
        setControl(documentObject, "classical-rule-logic-mood", "indicative");
        setControl(documentObject, "classical-rule-logic-tense", "present");
        setControl(documentObject, "classical-rule-logic-vnc-voice", "active");
        setControl(documentObject, "classical-rule-logic-vnc-output-scope", "single");
        setControl(
            documentObject,
            "classical-denominal-vnc-operation",
            "inceptive-ti"
        );
        setControl(documentObject, "classical-denominal-vnc-operation-path", "");

        documentObject.getElementById = id => (
            String(id) === "classical-rule-logic-surface"
                ? resultRoot
                : original.getElementById.call(documentObject, id)
        );
        documentObject.querySelector = () => null;
        documentObject.querySelectorAll = () => [];
        documentObject.createElement = tagName => createProbeElement(tagName);
        documentObject.createTextNode = value => ({
            nodeType: 3,
            textContent: String(value || ""),
            parentNode: null,
            parentElement: null,
        });

        ctx.renderClassicalRuleLogicSurfaceBlock({ stem: "tlīl" });
        return { resultRoot, denominalApplicationResult };
    } finally {
        unsubscribe();
        Object.assign(documentObject, original);
    }
}

function run(ctx = {}) {
    const suite = createSuite("classical_denominal_vnc_result_presentation");
    const {
        resultRoot,
        denominalApplicationResult,
    } = renderDenominalResult(ctx);
    const nodes = collectNodes(resultRoot, () => true);
    const surfaceFrame = ctx.getActiveClassicalRuleLogicSurfaceFrame?.() || null;
    const nestedCanonicalVncFrame =
        surfaceFrame?.state?.vncApplicationFrame || null;
    const denominalOwnerFrame =
        denominalApplicationResult?.canonicalResult || null;
    const ownerProjection =
        ctx.getClassicalSgrOwnerIssuedProjection?.(surfaceFrame) || null;
    const activeApplicationResult =
        ctx.getActiveClassicalCapabilityApplicationResult?.() || null;
    const activeNavigator =
        ctx.getClassicalCapabilityNavigatorFrame?.(surfaceFrame) || null;
    const written = nodes.find(node => (
        String(node.className).split(/\s+/u)
            .includes("classical-rule-surface__single-vnc-surface")
    ));
    const linearFormula = nodes.find(node => (
        node.dataset?.classicalNahuatlSelectedOutput === "true"
    ));
    const sentenceFormula = nodes.find(node => (
        node.dataset?.classicalLesson8SentenceFormula === "true"
    ));
    const diagram = nodes.find(node => (
        node.dataset?.classicalNuclearClauseDiagrammaticFormat === "true"
    ));
    const diagramRows = nodes.filter(node => (
        String(node.className).split(/\s+/u)
            .includes("classical-rule-surface__diagram-row")
    ));

    suite.eq(
        "authorized denominal scalar uses the exact owner frame and standard VNC Result projections",
        {
            owner: {
                status: denominalOwnerFrame?.authorizationStatus || "",
                kind: denominalOwnerFrame?.kind || "",
                surface: denominalOwnerFrame?.surfaceRealization || "",
                formula: denominalOwnerFrame?.formulaRealization || "",
                typedFrame:
                    denominalOwnerFrame?.finalTypedVncSlotFrame?.kind || "",
                exactNestedCanonicalVncFrame:
                    nestedCanonicalVncFrame
                    === denominalOwnerFrame?.canonicalVncFrame,
                exactVisibleOwnerApplication:
                    ownerProjection?.applicationResult
                    === denominalApplicationResult,
                exactVisibleOuterResult:
                    ownerProjection?.canonicalResult
                    === denominalOwnerFrame,
                exactActiveApplication:
                    activeApplicationResult
                    === denominalApplicationResult,
                exactActiveNavigator:
                    activeNavigator?.inputRole
                    === "exact-owner-issued-result"
                    && activeNavigator?.exactResult
                        === denominalOwnerFrame,
            },
            rendered: {
                basalUnit: resultRoot.dataset.classicalBasalUnit || "",
                visualSystem:
                    resultRoot.dataset.classicalResultVisualSystem || "",
                projectionPath:
                    resultRoot.dataset.classicalResultProjectionPath || "",
                appliedOperation:
                    resultRoot.dataset
                        .classicalCapabilityAppliedOperation || "",
                stalePersonalNameMetadataCleared:
                    !Object.prototype.hasOwnProperty.call(
                        resultRoot.dataset,
                        "classicalPersonalNameSentenceOperation"
                    ),
                singleVnc: nodes.some(node => (
                    node.dataset?.classicalVncSingleForm === "true"
                )),
                surface: String(written?.textContent || ""),
                linearFormula: String(linearFormula?.textContent || ""),
                sentenceFormula: String(sentenceFormula?.textContent || ""),
                formulaNodesAreIndependent:
                    Boolean(linearFormula && sentenceFormula)
                    && linearFormula !== sentenceFormula,
                diagramIsVnc:
                    diagram?.dataset?.classicalVncDiagrammaticFormat === "true",
                diagramAuthority:
                    diagram?.dataset
                        ?.classicalNuclearClauseDiagramAuthority || "",
                diagramRows: diagramRows.length,
            },
        },
        {
            owner: {
                status: "authorized",
                kind: "classical-nahuatl-denominal-vnc-result-frame",
                surface: "tlīlti",
                formula: "#0-0(tlīl-ti)0+0-0#",
                typedFrame: "classical-nahuatl-vnc-slot-frame",
                exactNestedCanonicalVncFrame: true,
                exactVisibleOwnerApplication: true,
                exactVisibleOuterResult: true,
                exactActiveApplication: true,
                exactActiveNavigator: true,
            },
            rendered: {
                basalUnit: "vnc",
                visualSystem: "grammar-account-surface",
                projectionPath: "standard-vnc-result",
                appliedOperation: "vnc:denominal",
                stalePersonalNameMetadataCleared: true,
                singleVnc: true,
                surface: "tlīlti.",
                linearFormula: "#0-0(tlīl-ti)0+0-0#",
                sentenceFormula: "#0-0(tlīl-ti)0+0-0#.",
                formulaNodesAreIndependent: true,
                diagramIsVnc: true,
                diagramAuthority: "typed-vnc-slots",
                diagramRows: 3,
            },
        }
    );

    return suite;
}

module.exports = {
    run,
    collectNodes,
    createProbeElement,
    setControl,
};
