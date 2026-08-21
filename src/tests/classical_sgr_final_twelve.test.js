"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const PUBLIC_FINAL_SIX = Object.freeze([
    {
        atomId: "CAA-grammar-nominal-construction--measure-modification",
        disposition: "interactive-choice",
        stage: "grammar",
    },
    {
        atomId: "CAA-nnc-personal-name--outer-subject",
        disposition: "interactive-choice",
        stage: "grammar",
    },
    {
        atomId: "CAA-vnc-denominal--finite-participants",
        disposition: "interactive-choice",
        stage: "grammar",
    },
    {
        atomId: "CAA-nnc-adjectival-modification--compound-head-target",
        disposition: "interactive-choice",
        stage: "grammar",
    },
    {
        atomId: "CAA-nnc-adjectival-modification--transitive-reference-contact",
        disposition: "interactive-choice",
        stage: "grammar",
    },
    {
        atomId: "CAO-nnc-adverbial--coordinate-projection",
        disposition: "public-result",
        stage: "result",
    },
]);

const INTENTIONALLY_UNSURFACED_FINAL_SIX = Object.freeze([
    "CAA-nnc-pronominal--matrix-family",
    "CAA-nnc-pronominal--matrix-form",
    "CAA-nnc-pronominal--quantitive-embed",
    "CAA-nnc-pronominal--quantitive-matrix",
    "CAA-vnc-ordered-voice-application--participant-transformation",
    "CAA-vnc-ordered-voice-chain--participant-transformation",
]);

function createProbeElement(tagName = "div") {
    const attributes = new Map();
    const element = {
        tagName: String(tagName).toUpperCase(),
        className: "",
        dataset: {},
        children: [],
        hidden: false,
        open: false,
        textContent: "",
        parentNode: null,
        classList: {
            add() {}, remove() {}, toggle() {}, contains() { return false; },
        },
        setAttribute(name, value) { attributes.set(name, String(value)); },
        getAttribute(name) { return attributes.get(name) ?? null; },
        removeAttribute(name) { attributes.delete(name); },
        append(...nodes) { nodes.forEach(node => this.appendChild(node)); },
        appendChild(node) {
            if (node && typeof node === "object") node.parentNode = this;
            this.children.push(node);
            return node;
        },
        replaceChildren(...nodes) {
            this.children = [];
            this.append(...nodes);
        },
        removeChild(node) {
            const index = this.children.indexOf(node);
            if (index >= 0) this.children.splice(index, 1);
            return node;
        },
        remove() { this.parentNode?.removeChild?.(this); },
        querySelector(selector) {
            if (selector !== ":scope > [data-classical-sgr-output-analysis]") {
                return null;
            }
            return this.children.find(child => (
                child?.dataset?.classicalSgrOutputAnalysis === "true"
            )) || null;
        },
        querySelectorAll() { return []; },
        closest() { return null; },
        addEventListener() {},
    };
    Object.defineProperty(element, "childElementCount", {
        get() { return element.children.length; },
    });
    return element;
}

function collectNodes(root, predicate, output = []) {
    if (!root || typeof root !== "object") return output;
    if (predicate(root)) output.push(root);
    (root.children || []).forEach(child => collectNodes(child, predicate, output));
    return output;
}

function project(ctx, canonicalResult) {
    const resultRoot = createProbeElement("section");
    const documentObject = ctx.document;
    const originals = {
        getElementById: documentObject.getElementById,
        querySelector: documentObject.querySelector,
        querySelectorAll: documentObject.querySelectorAll,
        createElement: documentObject.createElement,
    };
    try {
        documentObject.getElementById = () => null;
        documentObject.querySelector = () => null;
        documentObject.querySelectorAll = () => [];
        documentObject.createElement = tagName => createProbeElement(tagName);
        ctx.syncClassicalSourceGrammarResultSurface(canonicalResult, resultRoot);
    } finally {
        Object.assign(documentObject, originals);
    }
    return {
        outputs: collectNodes(
            resultRoot,
            node => Boolean(node.dataset?.classicalOutputContractId)
        ),
    };
}

function run(ctx = {}) {
    const suite = createSuite("classical_sgr_final_twelve");
    const inventory = ctx.getClassicalSourceGrammarResultSurfaceInventory();
    const inventoryById = new Map(
        [...inventory.axes, ...inventory.outputs].map(atom => [atom.atomId, atom])
    );
    const publicBindingProjection = PUBLIC_FINAL_SIX.map(expected => {
        const atom = inventoryById.get(expected.atomId);
        return {
            atomId: atom?.atomId || "",
            disposition: atom?.disposition || "",
            stage: atom?.binding?.stage || "",
        };
    });
    const intentionallyUnsurfacedProjection =
        INTENTIONALLY_UNSURFACED_FINAL_SIX.map(atomId => {
            const atom = inventoryById.get(atomId);
            return {
                atomId: atom?.atomId || "",
                disposition: atom?.disposition || "",
                stage: atom?.binding?.stage || "",
                public: atom?.binding?.public,
            };
        });
    suite.eq(
        "the final twelve retain five Grammar choices and one Result while six Grammar facts stay unsurfaced",
        {
            publicAtoms: publicBindingProjection,
            intentionallyUnsurfaced: intentionallyUnsurfacedProjection,
        },
        {
            publicAtoms: PUBLIC_FINAL_SIX,
            intentionallyUnsurfaced:
                INTENTIONALLY_UNSURFACED_FINAL_SIX.map(atomId => ({
                    atomId,
                    disposition: "intentionally-unsurfaced",
                    stage: "grammar",
                    public: false,
                })),
        }
    );

    const rendering = fs.readFileSync(
        path.join(ROOT, "src/ui/rendering/rendering.mjs"),
        "utf8"
    );
    const recipes = fs.readFileSync(
        path.join(ROOT, "src/tests/helpers/classical_sgr_route_recipes.mjs"),
        "utf8"
    );
    suite.ok(
        "the five choices bind only to genuine reusable controls on reachable routes",
        rendering.includes(
            '"grammar:nominal-construction/measure-modification": "#classical-cardinal-measure-composition"'
        )
        && rendering.includes(
            '"nnc:personal-name/outer-subject": "#classical-rule-logic-nnc-subject-person, #classical-rule-logic-nnc-subject-number"'
        )
        && rendering.includes(
            '"vnc:denominal/finite-participants": "#classical-rule-logic-subject, #classical-denominal-vnc-result-object-1, #classical-denominal-vnc-result-object-2"'
        )
        && rendering.includes(
            '"nnc:adjectival-modification/compound-head-target": "[data-classical-clause-relation-decision=\\"compound-head-target\\"]"'
        )
        && rendering.includes(
            '"nnc:adjectival-modification/transitive-reference-contact": "[data-classical-clause-relation-decision=\\"link-kind\\"], [data-classical-clause-relation-decision=\\"contact-kind\\"]"'
        )
        && rendering.includes("targetObject.document.querySelectorAll(selector).forEach(control =>")
        && !rendering.includes("const bindingTarget = control")
        && recipes.includes('caseId: "nominal-construction/measure"')
        && recipes.includes('caseId: "specialized-nnc/personal-name"')
        && recipes.includes('caseId: "vnc-denominal/scalar"')
        && recipes.includes('caseId: "clause-relations/adjectival-compound-contact"')
    );

    const adverbialPlan = ctx.prepareClassicalAdverbialNncParadigmPlan({
        scope: "external-clause",
    });
    const adverbialCoordinates =
        ctx.projectClassicalAdverbialNncParadigmCoordinates(adverbialPlan);
    const adverbialApplication =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:adverbial",
            outputKind: "coordinate-projection",
            args: [adverbialPlan],
        });
    suite.eq(
        "the convenience projection and its owner-issued application agree",
        adverbialApplication.canonicalResult,
        adverbialCoordinates
    );
    const adverbial = project(ctx, adverbialApplication);

    const projectedOutputIds = adverbial.outputs.map(
        node => node.dataset.classicalOutputContractId
    );
    suite.eq(
        "the canonical adverbial Result still projects its public output contract",
        projectedOutputIds,
        ["CAO-nnc-adverbial--coordinate-projection"]
    );

    return suite;
}

module.exports = { run };
