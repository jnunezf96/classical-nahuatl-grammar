"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function createProbeElement(tagName = "div") {
    const element = {
        tagName: String(tagName).toUpperCase(),
        className: "",
        dataset: {},
        children: [],
        hidden: false,
        open: false,
        textContent: "",
        parentNode: null,
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
        setAttribute() {},
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

function withProbeDocument(ctx, elementsById, callback) {
    const documentObject = ctx.document;
    const originals = {
        getElementById: documentObject.getElementById,
        querySelector: documentObject.querySelector,
        querySelectorAll: documentObject.querySelectorAll,
        createElement: documentObject.createElement,
    };
    try {
        documentObject.getElementById = id => elementsById.get(String(id)) || null;
        documentObject.querySelector = () => null;
        documentObject.querySelectorAll = () => [];
        documentObject.createElement = tagName => createProbeElement(tagName);
        return callback();
    } finally {
        Object.assign(documentObject, originals);
    }
}

function project(ctx, canonicalResult) {
    const resultRoot = createProbeElement("section");
    withProbeDocument(
        ctx,
        new Map(),
        () => ctx.syncClassicalSourceGrammarResultSurface(
            canonicalResult,
            resultRoot
        )
    );
    return {
        outputSections: collectNodes(
            resultRoot,
            node => Boolean(node.dataset?.classicalOutputContractId)
        ),
        resultRoot,
    };
}

function run(ctx = {}) {
    const suite = createSuite("classical_sgr_owner_projection");
    const rendering = fs.readFileSync(
        path.join(ROOT, "src/ui/rendering/rendering.mjs"),
        "utf8"
    );
    const shell = fs.readFileSync(
        path.join(ROOT, "src/ui/shell/classical_shell.mjs"),
        "utf8"
    );
    const inventory = ctx.getClassicalSourceGrammarResultSurfaceInventory();
    const intentionallyUnsurfacedAxes = inventory.axes.filter(atom => (
        atom.disposition === "intentionally-unsurfaced"
    ));

    suite.eq(
        "the v2 boundary keeps all 124 former fact and diagnostic axes private",
        {
            version: inventory.version,
            count: intentionallyUnsurfacedAxes.length,
            publicValues: Array.from(new Set(
                intentionallyUnsurfacedAxes.map(atom => atom.binding?.public)
            )),
            proofBoundaries: Array.from(new Set(
                intentionallyUnsurfacedAxes.map(atom => atom.proof?.boundary)
            )),
            allInertnessBound: intentionallyUnsurfacedAxes.every(atom => (
                atom.proof?.executionReceiptId === `execution:${atom.atomId}`
                && atom.proof?.inertnessReceiptId === `inertness:${atom.atomId}`
            )),
        },
        {
            version: 2,
            count: 124,
            publicValues: [false],
            proofBoundaries: ["private"],
            allInertnessBound: true,
        }
    );

    suite.eq(
        "the rejected generic Grammar facts component and projection path are absent",
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

    suite.ok(
        "Result analysis lists only exact owner output records",
        [
            "grammar:nominal-construction/coordinate-projection",
            "nnc:adverbial/coordinate-projection",
            "nnc:deverbal-construction/coordinate-projection",
            "nnc:personal-name/coordinate-projection",
            "nnc:place-gentilic/coordinate-projection",
            "nnc:relational/coordinate-projection",
            "particle:result/scalar",
        ].every(key => rendering.includes(`"${key}"`))
        && rendering.includes(
            "record.applicationResult.canonicalResult !== record.canonicalResult"
        )
        && rendering.includes(
            "ClassicalSgrAnalysisBundleBySurfaceFrame.delete(surfaceFrame)"
        )
        && rendering.includes("function getClassicalSgrAnalysisBundle")
        && rendering.includes("function syncClassicalSgrResultContracts")
    );

    const personalSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({
            stem: "yeh",
        });
    const personalOperation =
        ctx.buildClassicalNahuatlPronominalNncOperationFrame(
            personalSource,
            {
                subject: "3sg",
                clausePosition: "initial",
                adjunctorInMode: "none",
                sentenceType: "statement",
                polarity: "positive",
            }
        );
    const personalResult = ctx.requestClassicalPronominalNncResult(
        personalSource,
        personalOperation
    );
    const personalProjection = project(ctx, personalResult);
    const quantitiveSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({
            stem: "ix-qui-ch",
            embedStem: "ix",
            matrixStem: "qui-ch",
        });
    const quantitiveOperation =
        ctx.buildClassicalNahuatlPronominalNncOperationFrame(
            quantitiveSource,
            {
                subject: "3common",
                clausePosition: "initial",
                adjunctorInMode: "none",
                sentenceType: "statement",
                polarity: "positive",
            }
        );
    const quantitiveResult = ctx.requestClassicalPronominalNncResult(
        quantitiveSource,
        quantitiveOperation
    );
    const quantitiveProjection = project(ctx, quantitiveResult);
    const pronominalUnsurfacedAxes = inventory.axes.filter(atom => (
        atom.operationId === "nnc:pronominal"
        && atom.disposition === "intentionally-unsurfaced"
    ));
    const pronominalScalarOutput = inventory.outputs.find(atom => (
        atom.operationId === "nnc:pronominal"
        && atom.outputKind === "scalar"
    ));
    const expectedAnalysisIds = inventory.outputs
        .filter(atom => (
            atom.disposition === "analysis-readout"
            && ["concept:classification", "nnc:diagram"].includes(
                atom.operationId
            )
        ))
        .map(atom => atom.atomId)
        .sort();
    const projectedAnalysisIds = [
        ...personalProjection.outputSections,
        ...quantitiveProjection.outputSections,
    ]
        .map(section => section.dataset.classicalOutputContractId)
        .filter(atomId => expectedAnalysisIds.includes(atomId))
        .filter((atomId, index, values) => values.indexOf(atomId) === index)
        .sort();
    suite.eq(
        "personal and quantitive requests remain canonical Results with public Result analysis",
        {
            formerFactAxisCount: pronominalUnsurfacedAxes.length,
            formerFactAxesPrivate: pronominalUnsurfacedAxes.every(atom => (
                atom.binding?.public === false
                && atom.proof?.boundary === "private"
            )),
            personal: {
                issued: ctx.isClassicalNahuatlPronominalNncResult(
                    personalResult
                ),
                kind: personalResult.kind,
                authorizationStatus: personalResult.authorizationStatus,
                sourceIdentity: personalResult.sourceFrame === personalSource,
                operationIdentity:
                    personalResult.operationFrame === personalOperation,
                formulaProjectionMatches:
                    personalResult.formulaProjection?.formulaRealization
                        === personalResult.formulaRealization,
                writtenProjectionMatches:
                    personalResult.writtenProjection?.surfaceRealization
                        === personalResult.surfaceRealization,
                independentlyDerived:
                    personalResult.formulaAndWrittenDerivedIndependently,
            },
            quantitive: {
                issued: ctx.isClassicalNahuatlPronominalNncResult(
                    quantitiveResult
                ),
                kind: quantitiveResult.kind,
                authorizationStatus: quantitiveResult.authorizationStatus,
                sourceIdentity:
                    quantitiveResult.sourceFrame === quantitiveSource,
                operationIdentity:
                    quantitiveResult.operationFrame === quantitiveOperation,
                formulaProjectionMatches:
                    quantitiveResult.formulaProjection?.formulaRealization
                        === quantitiveResult.formulaRealization,
                writtenProjectionMatches:
                    quantitiveResult.writtenProjection?.surfaceRealization
                        === quantitiveResult.surfaceRealization,
                independentlyDerived:
                    quantitiveResult.formulaAndWrittenDerivedIndependently,
            },
            scalarOutputPresent: [
                personalProjection,
                quantitiveProjection,
            ].every(projection => (
                String(
                    projection.resultRoot.dataset.classicalOutputContractIds
                    || ""
                ).split(/\s+/u).includes(pronominalScalarOutput.atomId)
            )),
            projectedAnalysisIds,
            analysisOwnerIssued: [
                ...personalProjection.outputSections,
                ...quantitiveProjection.outputSections,
            ].every(section => (
                section.dataset.classicalAnalysisOwnerIssued === "true"
                && section.dataset.classicalGrammarAuthority === "false"
            )),
        },
        {
            formerFactAxisCount: 15,
            formerFactAxesPrivate: true,
            personal: {
                issued: true,
                kind: "classical-nahuatl-pronominal-nnc-result-frame",
                authorizationStatus: "authorized",
                sourceIdentity: true,
                operationIdentity: true,
                formulaProjectionMatches: true,
                writtenProjectionMatches: true,
                independentlyDerived: true,
            },
            quantitive: {
                issued: true,
                kind: "classical-nahuatl-pronominal-nnc-result-frame",
                authorizationStatus: "authorized",
                sourceIdentity: true,
                operationIdentity: true,
                formulaProjectionMatches: true,
                writtenProjectionMatches: true,
                independentlyDerived: true,
            },
            scalarOutputPresent: true,
            projectedAnalysisIds: expectedAnalysisIds,
            analysisOwnerIssued: true,
        }
    );

    const particleResult = ctx.requestClassicalParticleResult(
        "l3-auh-conjunctor"
    );
    const particleProjection = project(ctx, particleResult);
    const particleOutput = inventory.outputs.find(atom => (
        atom.operationId === "particle:result"
        && atom.outputKind === "scalar"
    ));
    const particleOwnerProjection =
        ctx.getClassicalSgrOwnerIssuedProjection(particleResult);
    suite.eq(
        "the issued particle Result retains exact identity in its Result-analysis record",
        {
            issued: ctx.isClassicalNahuatlParticleResultFrame(
                particleResult
            ),
            kind: particleResult.kind,
            authorizationStatus: particleResult.authorizationStatus,
            projectionIdentity:
                particleOwnerProjection?.canonicalResult === particleResult
                && particleOwnerProjection?.applicationResult
                    ?.canonicalResult === particleResult,
            outputIds: particleProjection.outputSections
                .map(section => section.dataset.classicalOutputContractId),
            outputDispositions: particleProjection.outputSections
                .map(section => section.dataset.classicalOutputDisposition),
            operationIds: particleProjection.outputSections
                .map(section => section.dataset.classicalAnalysisOperationId),
            resultKinds: particleProjection.outputSections
                .map(section => section.dataset.classicalAnalysisResultKind),
            authorizationStatuses: particleProjection.outputSections
                .map(section => (
                    section.dataset.classicalAnalysisAuthorizationStatus
                )),
            ownerIssued: particleProjection.outputSections
                .map(section => section.dataset.classicalAnalysisOwnerIssued),
            grammarAuthority: particleProjection.outputSections
                .map(section => section.dataset.classicalGrammarAuthority),
            resultAuthority:
                particleProjection.resultRoot.dataset.classicalSgrResultAuthority,
        },
        {
            issued: true,
            kind: "classical-nahuatl-particle-result-frame",
            authorizationStatus: "authorized",
            projectionIdentity: true,
            outputIds: [particleOutput.atomId],
            outputDispositions: ["composed-projection"],
            operationIds: ["particle:result"],
            resultKinds: ["classical-nahuatl-particle-result-frame"],
            authorizationStatuses: ["authorized"],
            ownerIssued: ["true"],
            grammarAuthority: ["false"],
            resultAuthority: "canonical-only",
        }
    );

    return suite;
}

module.exports = { run };
