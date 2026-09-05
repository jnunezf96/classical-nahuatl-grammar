"use strict";

const { createSuite } = require("./runner");

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
                const classes = new Set(element.className.split(/\s+/u).filter(Boolean));
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
                const present = this.contains(name);
                const enabled = force === undefined ? !present : Boolean(force);
                if (enabled) this.add(name);
                else this.remove(name);
                return enabled;
            },
            contains(name) {
                return element.className.split(/\s+/u).includes(String(name));
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

function collectNodes(root, predicate, output = []) {
    if (!root || typeof root !== "object") return output;
    if (predicate(root)) output.push(root);
    (root.children || []).forEach(child => (
        collectNodes(child, predicate, output)
    ));
    return output;
}

function setControl(documentObject, id, value, checked = false) {
    const control = documentObject.getElementById(id);
    control.value = value;
    control.checked = checked;
}

function renderAttitudeResult(ctx, {
    attitude = "honorific",
    formation = "causative",
    participant = "subject",
    sourceAnalysis = "causative-only",
    preserveTypedSource = false,
} = {}) {
    const documentObject = ctx.document;
    const resultRoot = createProbeElement("section");
    const original = {
        getElementById: documentObject.getElementById,
        querySelector: documentObject.querySelector,
        querySelectorAll: documentObject.querySelectorAll,
        createElement: documentObject.createElement,
        createTextNode: documentObject.createTextNode,
    };
    try {
        if (!preserveTypedSource) {
            setControl(documentObject, "classical-source-whole", "chōca");
            setControl(documentObject, "classical-source-embed", "");
            setControl(documentObject, "classical-source-matrix", "");
            setControl(documentObject, "classical-rule-logic-class", "A");
            setControl(
                documentObject,
                "classical-rule-logic-valence",
                "intransitive"
            );
            setControl(documentObject, "classical-rule-logic-subject", "3sg");
        }
        setControl(documentObject, "classical-construction-operation", "attitude-vnc");
        setControl(documentObject, "classical-rule-logic-mood", "indicative");
        setControl(documentObject, "classical-rule-logic-tense", "present");
        setControl(documentObject, "classical-rule-logic-vnc-voice", "active");
        setControl(documentObject, "classical-rule-logic-vnc-output-scope", "single");
        setControl(documentObject, "classical-attitude-operation", attitude);
        setControl(documentObject, "classical-attitude-formation", formation);
        setControl(documentObject, "classical-attitude-participant", participant);
        setControl(
            documentObject,
            "classical-attitude-source-analysis",
            sourceAnalysis
        );
        setControl(documentObject, "classical-attitude-stem-alternative", "default");
        setControl(documentObject, "classical-attitude-derivation-option", "");

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

        ctx.renderClassicalRuleLogicSurfaceBlock({ stem: "chōca" });
        return resultRoot;
    } finally {
        Object.assign(documentObject, original);
    }
}

function readStandardVncResult(resultRoot) {
    const nodes = collectNodes(resultRoot, () => true);
    const singleVnc = nodes.find(node => (
        node.dataset?.classicalVncSingleForm === "true"
    ));
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
    return {
        basalUnit: resultRoot.dataset.classicalBasalUnit || "",
        visualSystem: resultRoot.dataset.classicalResultVisualSystem || "",
        projectionPath: resultRoot.dataset.classicalResultProjectionPath || "",
        singleVnc: Boolean(singleVnc),
        surface: String(written?.textContent || ""),
        linearFormula: String(linearFormula?.textContent || ""),
        sentenceFormula: String(sentenceFormula?.textContent || ""),
        formulaNodesAreIndependent:
            Boolean(linearFormula && sentenceFormula)
            && linearFormula !== sentenceFormula,
        diagramIsVnc:
            diagram?.dataset?.classicalVncDiagrammaticFormat === "true",
        diagramAuthority:
            diagram?.dataset?.classicalNuclearClauseDiagramAuthority || "",
        diagramRows: diagramRows.length,
    };
}

function readCanonicalVncResult(ctx, canonical) {
    const diagram = ctx.requestClassicalVncDiagrammaticFrame(
        canonical?.finalTypedVncSlotFrame
    );
    return {
        status: canonical?.authorizationStatus || "",
        surface: canonical?.surfaceRealization || "",
        formula: canonical?.formulaRealization || "",
        typedFrame: canonical?.finalTypedVncSlotFrame?.kind || "",
        diagramAuthority: diagram?.projectionAuthority || "",
        diagramRows: diagram?.rows?.length || 0,
    };
}

function run(ctx = {}) {
    const suite = createSuite("classical_attitude_vnc_result_presentation");
    const honorificRoot = renderAttitudeResult(ctx);
    const honorificRendered = readStandardVncResult(honorificRoot);
    const honorificSurfaceFrame =
        ctx.getActiveClassicalRuleLogicSurfaceFrame();
    const innerHonorificOwnerFrame =
        honorificSurfaceFrame?.state?.vncLateOperationClosureFrame || null;
    const honorificCanonical = readCanonicalVncResult(
        ctx,
        innerHonorificOwnerFrame
    );
    const continuationAction = collectNodes(honorificRoot, node => (
        node.dataset?.classicalRuleSurfaceAction === "use-result-as-source"
    ))[0] || null;
    const reverentialOwnerFrame = ctx.requestClassicalLateVncOperation({
        sourceStem: innerHonorificOwnerFrame?.operationFrame?.targetStem,
        sourceValence:
            innerHonorificOwnerFrame?.operationFrame?.targetValence,
        verbClass: innerHonorificOwnerFrame?.operationFrame?.targetClass,
        objectKind: "reflexive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        lateOperation: "reverential",
        lateVariant: "preterit-embed",
        honoredParticipant:
            innerHonorificOwnerFrame?.operationFrame?.operationFacts
                ?.honoredParticipant || "subject",
        attitudeSourceClosureFrame: innerHonorificOwnerFrame,
    });
    const reverentialCanonical = {
        ...readCanonicalVncResult(ctx, reverentialOwnerFrame),
        exactHonorificSource:
            reverentialOwnerFrame?.operationFrame?.operationFacts
                ?.ownerIssuedHonorificSourceFrame
            === innerHonorificOwnerFrame,
    };

    suite.eq(
        "honorific attitude-vnc uses the standard VNC Result projections",
        {
            canonical: honorificCanonical,
            rendered: honorificRendered,
        },
        {
            canonical: {
                status: "authorized",
                surface: "mochoctia",
                formula: "#0-0+m-o(choc-tia)0+0-0#",
                typedFrame: "classical-nahuatl-vnc-slot-frame",
                diagramAuthority: "typed-vnc-slots",
                diagramRows: 3,
            },
            rendered: {
                basalUnit: "vnc",
                visualSystem: "grammar-account-surface",
                projectionPath: "standard-vnc-result",
                singleVnc: true,
                surface: "Mochoctia.",
                linearFormula: "#0-0+m-o(choc-tia)0+0-0#",
                sentenceFormula: "#0-0+m-o(choc-tia)0+0-0#.",
                formulaNodesAreIndependent: true,
                diagramIsVnc: true,
                diagramAuthority: "typed-vnc-slots",
                diagramRows: 3,
            },
        }
    );

    suite.eq(
        "reverential requires and retains the exact rendered honorific Result",
        {
            continuationOffered: Boolean(continuationAction),
            continuedSourceStem:
                innerHonorificOwnerFrame?.operationFrame?.targetStem || "",
            canonical: reverentialCanonical,
        },
        {
            continuationOffered: true,
            continuedSourceStem: "choc-tiā",
            canonical: {
                status: "authorized",
                surface: "mochoctiatzinoa",
                formula: "#0-0+m-o(choc-tia-0-tzin-o-a)0+0-0#",
                typedFrame: "classical-nahuatl-vnc-slot-frame",
                diagramAuthority: "typed-vnc-slots",
                diagramRows: 3,
                exactHonorificSource: true,
            },
        }
    );

    ctx.clearClassicalGrammarResultSourceContinuation?.(
        "attitude-vnc-result-presentation-test-cleanup"
    );

    return suite;
}

module.exports = { run };
