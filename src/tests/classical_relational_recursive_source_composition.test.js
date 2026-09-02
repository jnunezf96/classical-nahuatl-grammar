"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite(
        "classical_relational_recursive_source_composition",
    );
    const frame = ctx.buildClassicalRelationalContinuationValidationFrame();
    const tech = frame.constraints.techEmbedPaCopaMatrixPair;
    const tlan = frame.constraints.tlanNestedBodypartMatrixChoice;

    s.eq("tech remains the embed while pa and co-pa are distinct matrices", {
        status: tech.authorizationStatus,
        branches: tech.branches.map(branch => ({
            branchId: branch.branchId,
            signature: branch.compositionSignature,
            surface: branch.resultSurface,
            formula: branch.formula,
            exactResultKind: branch.canonicalParentResultKind,
        })),
    }, {
        status: "authorized",
        branches: [
            {
                branchId: "tech-plus-pa",
                signature: "(tech>pa)",
                surface: "techpa",
                formula: "#Ø-Ø(tech-pa)Ø-Ø#",
                exactResultKind:
                    "classical-nahuatl-relational-nnc-relational-result",
            },
            {
                branchId: "tech-plus-copa",
                signature: "(tech>(co>pa))",
                surface: "techcopa",
                formula: "#Ø-Ø(tech-co-pa)Ø-Ø#",
                exactResultKind:
                    "classical-nahuatl-relational-nnc-relational-result",
            },
        ],
    });

    s.eq("tlan retains a typed inner ix or tzin matrix", {
        status: tlan.authorizationStatus,
        branches: tlan.branches.map(branch => ({
            branchId: branch.branchId,
            signature: branch.compositionSignature,
            surface: branch.resultSurface,
            formula: branch.formula,
            exactResultKind: branch.canonicalParentResultKind,
        })),
    }, {
        status: "authorized",
        branches: [
            {
                branchId: "inner-matrix-ix",
                signature: "((cal>īx)>tlan)",
                surface: "calīxtlan",
                formula: "#Ø-Ø(cal-īx-tlan)Ø-Ø#",
                exactResultKind:
                    "classical-nahuatl-relational-nnc-relational-result",
            },
            {
                branchId: "inner-matrix-tzin",
                signature: "((cuauh>tzīn)>tlan)",
                surface: "cuauhtzīntlan",
                formula: "#Ø-Ø(cuauh-tzīn-tlan)Ø-Ø#",
                exactResultKind:
                    "classical-nahuatl-relational-nnc-relational-result",
            },
        ],
    });

    s.eq("flattened, reversed, copied, and incomplete substitutes fail", {
        reversedTech: ctx.buildClassicalTechEmbedPaCopaMatrixPair({
            ...frame.cases,
            techPaMatrix: frame.cases.techIntegrated,
        }).authorizationStatus,
        copiedTech: ctx.buildClassicalTechEmbedPaCopaMatrixPair({
            ...frame.cases,
            techCopaMatrix: frame.cases.techPaMatrix,
        }).authorizationStatus,
        missingTech: ctx.buildClassicalTechEmbedPaCopaMatrixPair({
            ...frame.cases,
            techCopaMatrix: null,
        }).authorizationStatus,
        opaqueTlan: ctx.buildClassicalTlanNestedBodypartMatrixChoice({
            ...frame.cases,
            tlanNestedIxMatrix: frame.cases.tlanNested,
        }).authorizationStatus,
        copiedTlan: ctx.buildClassicalTlanNestedBodypartMatrixChoice({
            ...frame.cases,
            tlanNestedTzinMatrix: frame.cases.tlanNestedIxMatrix,
        }).authorizationStatus,
        missingTlan: ctx.buildClassicalTlanNestedBodypartMatrixChoice({
            ...frame.cases,
            tlanNestedTzinMatrix: null,
        }).authorizationStatus,
    }, {
        reversedTech: "blocked",
        copiedTech: "blocked",
        missingTech: "blocked",
        opaqueTlan: "blocked",
        copiedTlan: "blocked",
        missingTlan: "blocked",
    });

    s.eq("existing flat relational cases remain valid but cannot prove nesting", {
        techIntegrated: frame.cases.techIntegrated.canonicalResult,
        tlanNested: frame.cases.tlanNested.canonicalResult,
        techHasComposition:
            Boolean(frame.cases.techIntegrated.sourceCompositionFrame),
        tlanHasComposition:
            Boolean(frame.cases.tlanNested.sourceCompositionFrame),
    }, {
        techIntegrated: true,
        tlanNested: true,
        techHasComposition: false,
        tlanHasComposition: false,
    });

    const stemNode = stem => ({
        kind: ctx
            .CLASSICAL_NAHUATL_RELATIONAL_SOURCE_COMPOSITION_STEM_NODE_KIND,
        stem,
    });
    const evaluateTech = sourceComposition => (
        ctx.evaluateClassicalNahuatlRelationalNnc({
            state: "absolutive",
            subjectMode: "adverbialized",
            nounstem: {
                kind: ctx.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND,
                stemId: "pa-direction",
                formation: "option-two",
                operation: "relational-nnc",
                sourceKind: "relational-compound",
                sourceFormation: "plain-nounstem",
                sourceVoice: "active",
                sourceMode: "embed-matrix",
                sourceComposition,
            },
        })
    );
    const validTechComposition = {
        kind: ctx
            .CLASSICAL_NAHUATL_RELATIONAL_SOURCE_COMPOSITION_REQUEST_KIND,
        embed: stemNode("tech"),
        matrix: stemNode("pa"),
    };
    const wrongKind = evaluateTech({
        ...validTechComposition,
        kind: "untyped-source-composition",
    });
    const opaqueLeaf = evaluateTech({
        ...validTechComposition,
        embed: stemNode("tech-co"),
    });
    const flatContradiction = ctx.evaluateClassicalNahuatlRelationalNnc({
        state: "absolutive",
        subjectMode: "adverbialized",
        nounstem: {
            kind: ctx.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND,
            stemId: "pa-direction",
            formation: "option-two",
            operation: "relational-nnc",
            sourceKind: "relational-compound",
            sourceFormation: "plain-nounstem",
            sourceVoice: "active",
            sourceMode: "embed-matrix",
            sourceStem: "cal",
            sourceComposition: validTechComposition,
        },
    });
    s.eq("the recursive source gate rejects untyped or contradictory input", {
        wrongKind: wrongKind.diagnostics[0],
        opaqueLeaf: opaqueLeaf.diagnostics[0],
        flatContradiction: flatContradiction.diagnostics[0],
    }, {
        wrongKind: "relational-source-composition-request-kind-invalid",
        opaqueLeaf: "relational-source-composition-leaf-must-be-atomic",
        flatContradiction:
            "relational-source-composition-flat-claim-mismatch",
    });

    return s;
}

module.exports = { run };
