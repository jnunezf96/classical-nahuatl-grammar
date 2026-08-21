"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson31-recursive-compound-embeds",
    "lesson31-recursive-matrices-and-bracketing-ambiguity",
    "lesson31-sex-distinction-compounds",
];

function request(source = {}, overrides = {}) {
    const structure = overrides.structure || source.structure || "integrated";
    return {
        constructionKind: "compound-nnc",
        structure,
        embedRole: "association",
        possessorOrientation: "matrix",
        subject: "3sg",
        state: "absolutive",
        possessor: "3sg",
        animacy: "animate",
        source: {
            embedStem: "zaca",
            embedClass: "tl-1-a",
            embedSourceClass: "tl-1-a",
            matrixStem: "mox",
            matrixClass: "zero",
            matrixSourceClass: "zero",
            structure,
            ...source,
        },
        ...overrides,
    };
}

function sexAnalysis(sourceStem, sexValue) {
    return {
        lexicalStatus: "sex-distinction-embed",
        sourceStem,
        sexValue,
        referentClass: "animate",
        neutralWithoutSex: true,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson31_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson31-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = value => ctx.evaluateClassicalNahuatlNominalConstruction(
        value);
    const operation = frame => frame.operationFrame || {};

    const innerEmbedCompound = evaluate(request({
        embedStem: "ā", embedClass: "tl-1-a",
        embedSourceClass: "tl-1-a", matrixStem: "tepē",
        matrixClass: "tl", matrixSourceClass: "tl-1-a",
    }));
    const recursiveEmbed = evaluate(request({
        embedStem: operation(innerEmbedCompound).compoundStem,
        embedClass: operation(innerEmbedCompound).resultSourceClass,
        embedSourceClass: operation(innerEmbedCompound).resultSourceClass,
        embedConstituent: {
            kind: "compound-nnc",
            stem: operation(innerEmbedCompound).compoundStem,
            resultFrame: innerEmbedCompound,
        },
        matrixStem: "tlatqui", matrixClass: "tli",
        matrixSourceClass: "tli-1",
    }));
    const mismatchedRecursiveEmbed = evaluate(request({
        embedStem: operation(innerEmbedCompound).compoundStem,
        embedClass: operation(innerEmbedCompound).resultSourceClass,
        embedSourceClass: operation(innerEmbedCompound).resultSourceClass,
        embedConstituent: {
            kind: "compound-nnc",
            stem: "copied-compound",
            resultFrame: innerEmbedCompound,
        },
    }));

    const recursiveMatrix = evaluate(request({
        embedStem: "teō", embedClass: "zero", embedSourceClass: "zero",
        matrixStem: operation(innerEmbedCompound).compoundStem,
        matrixClass: operation(innerEmbedCompound).matrixClass,
        matrixSourceClass: operation(innerEmbedCompound).resultSourceClass,
        matrixConstituent: {
            kind: "compound-nnc",
            stem: operation(innerEmbedCompound).compoundStem,
            resultFrame: innerEmbedCompound,
        },
    }));
    const conflictingBracketing = evaluate(request({
        embedStem: "teō", embedClass: "zero", embedSourceClass: "zero",
        matrixStem: operation(innerEmbedCompound).compoundStem,
        matrixClass: operation(innerEmbedCompound).matrixClass,
        matrixSourceClass: operation(innerEmbedCompound).resultSourceClass,
        bracketing: "compound-embed",
        matrixConstituent: {
            kind: "compound-nnc",
            stem: operation(innerEmbedCompound).compoundStem,
            resultFrame: innerEmbedCompound,
        },
    }, { bracketing: "compound-embed" }));
    const unsupportedManualRecursion = evaluate(request({}, {
        bracketing: "compound-embed",
    }));
    const bothRecursive = evaluate(request({
        embedStem: operation(innerEmbedCompound).compoundStem,
        embedClass: operation(innerEmbedCompound).resultSourceClass,
        embedSourceClass: operation(innerEmbedCompound).resultSourceClass,
        embedConstituent: {
            kind: "compound-nnc",
            stem: operation(innerEmbedCompound).compoundStem,
            resultFrame: innerEmbedCompound,
        },
        matrixStem: operation(innerEmbedCompound).compoundStem,
        matrixClass: operation(innerEmbedCompound).matrixClass,
        matrixSourceClass: operation(innerEmbedCompound).resultSourceClass,
        matrixConstituent: {
            kind: "compound-nnc",
            stem: operation(innerEmbedCompound).compoundStem,
            resultFrame: innerEmbedCompound,
        },
    }));

    const maleOpenSource = evaluate(request({
        embedStem: "zaca", embedClass: "tl-1-a",
        embedSourceClass: "tl-1-a", matrixStem: "mox",
        matrixClass: "zero", matrixSourceClass: "zero",
        sexEmbedAnalysis: sexAnalysis("zaca", "male"),
    }, { embedRole: "sex" }));
    const femaleOpenSource = evaluate(request({
        embedStem: "chīl", embedClass: "tli-1",
        embedSourceClass: "tli-1", matrixStem: "pōch",
        matrixClass: "in", matrixSourceClass: "in",
        sexEmbedAnalysis: sexAnalysis("chīl", "female"),
    }, { embedRole: "sex" }));
    const neutralSource = evaluate(request({
        embedStem: "zaca", matrixStem: "mox",
    }));
    const missingSexAnalysis = evaluate(request({}, { embedRole: "sex" }));
    const nonanimateSex = evaluate(request({
        sexEmbedAnalysis: sexAnalysis("zaca", "male"),
    }, { embedRole: "sex", animacy: "nonanimate" }));
    const mismatchedSex = evaluate(request({
        sexEmbedAnalysis: sexAnalysis("other", "female"),
    }, { embedRole: "sex" }));

    s.eq("owner-issued compound Results recurse as embeds without flattening", {
        status: recursiveEmbed.authorizationStatus,
        stem: operation(recursiveEmbed).compoundStem,
        class: operation(recursiveEmbed).resultSourceClass,
        hierarchy: {
            bracketing: operation(recursiveEmbed).recursiveHierarchyFrame
                ?.bracketing,
            depth: operation(recursiveEmbed).recursiveHierarchyFrame?.depth,
            innerMatrix: operation(recursiveEmbed).recursiveHierarchyFrame
                ?.innerEmbedMatrixStem,
            outerMatrix: operation(recursiveEmbed).recursiveHierarchyFrame
                ?.outerMatrixStem,
            acyclic: operation(recursiveEmbed).recursiveHierarchyFrame?.acyclic,
            exactResultPreserved: operation(recursiveEmbed)
                .recursiveHierarchyFrame?.embedResultFrame
                === innerEmbedCompound,
        },
    }, {
        status: "authorized", stem: "ā-tepē-tlatqui", class: "tli-1",
        hierarchy: { bracketing: "compound-embed", depth: 2,
            innerMatrix: "tepē", outerMatrix: "tlatqui", acyclic: true,
            exactResultPreserved: true },
    });
    s.eq("recursive embed mutations cannot substitute copied Results", {
        mismatch: [mismatchedRecursiveEmbed.authorizationStatus,
            mismatchedRecursiveEmbed.blockReason],
        manual: [unsupportedManualRecursion.authorizationStatus,
            unsupportedManualRecursion.blockReason],
    }, {
        mismatch: ["blocked", "compound-nnc-embed-constituent-mismatch"],
        manual: ["blocked",
            "recursive-compound-requires-owner-issued-compound-result"],
    });
    s.eq("recursive matrices preserve hierarchy and govern the outer class", {
        matrix: [recursiveMatrix.authorizationStatus,
            operation(recursiveMatrix).recursiveHierarchyFrame?.bracketing,
            operation(recursiveMatrix).recursiveHierarchyFrame?.depth,
            operation(recursiveMatrix).resultSourceClass,
            operation(recursiveMatrix).recursiveHierarchyFrame
                ?.matrixResultFrame === innerEmbedCompound],
        both: [bothRecursive.authorizationStatus,
            operation(bothRecursive).recursiveHierarchyFrame?.bracketing,
            operation(bothRecursive).recursiveHierarchyFrame?.recursiveEmbed,
            operation(bothRecursive).recursiveHierarchyFrame?.recursiveMatrix],
        conflict: [conflictingBracketing.authorizationStatus,
            conflictingBracketing.blockReason],
    }, {
        matrix: ["authorized", "compound-matrix", 2, "tl-1-a", true],
        both: ["authorized", "both", true, true],
        conflict: ["blocked",
            "recursive-compound-bracketing-conflicts-with-captured-results"],
    });
    s.eq("bracketing is automatic unless a genuine alternative survives", {
        embedChoice: operation(recursiveEmbed).recursiveHierarchyFrame
            ?.bracketingChoiceRequired,
        matrixChoice: operation(recursiveMatrix).recursiveHierarchyFrame
            ?.bracketingChoiceRequired,
        embedOptions: operation(recursiveEmbed).recursiveHierarchyFrame
            ?.bracketingOptions,
        matrixOptions: operation(recursiveMatrix).recursiveHierarchyFrame
            ?.bracketingOptions,
    }, {
        embedChoice: false, matrixChoice: false,
        embedOptions: ["compound-embed"],
        matrixOptions: ["compound-matrix"],
    });
    s.eq("sex distinction uses typed meaning and open animate Sources", {
        male: [maleOpenSource.authorizationStatus,
            operation(maleOpenSource).sexDistinctionFrame?.sexValue,
            operation(maleOpenSource).compoundStem,
            operation(maleOpenSource).resultSourceClass],
        female: [femaleOpenSource.authorizationStatus,
            operation(femaleOpenSource).sexDistinctionFrame?.sexValue,
            operation(femaleOpenSource).compoundStem],
        neutral: [neutralSource.authorizationStatus,
            operation(neutralSource).sexDistinctionFrame || null],
        authority: operation(maleOpenSource).sexDistinctionFrame
            ?.productiveRouteAuthority,
    }, {
        male: ["authorized", "male", "zaca-mox", "zero"],
        female: ["authorized", "female", "chīl-pōch"],
        neutral: ["authorized", null],
        authority: false,
    });
    s.eq("sex contradictions change typed grammar, not stem membership", {
        missing: [missingSexAnalysis.authorizationStatus,
            missingSexAnalysis.blockReason],
        nonanimate: [nonanimateSex.authorizationStatus,
            nonanimateSex.blockReason],
        mismatch: [mismatchedSex.authorizationStatus,
            mismatchedSex.blockReason],
    }, {
        missing: ["blocked",
            "sex-compound-requires-typed-sex-distinction-embed-analysis"],
        nonanimate: ["blocked",
            "sex-distinction-compound-requires-animate-matrix-referent"],
        mismatch: ["blocked", "typed-sex-distinction-embed-analysis-mismatch"],
    });

    const cueFrames = [recursiveEmbed, recursiveMatrix, maleOpenSource];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame,
        )
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all accepted atoms have exact writing and clickable-cue routes", {
        records: records.length,
        writing: writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
        cueGroups: new Set(cues.map(cue => cue.role)).size,
        covered: GROUPS.every(group => {
            const ids = records.filter(record => record.reviewGroupId === group)
                .map(record => record.atomId);
            return cues.some(cue => cue.role === group
                && ids.every(id => cue.atomIds?.includes(id)));
        }),
    }, { records: 41, writing: 16, groups: 3, cueGroups: 3,
        covered: true });

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [operation(recursiveEmbed).recursiveHierarchyFrame?.bracketing,
                operation(recursiveEmbed).recursiveHierarchyFrame?.acyclic,
                operation(recursiveEmbed).recursiveHierarchyFrame
                    ?.embedResultFrame === innerEmbedCompound]
            : record.reviewGroupId === GROUPS[1]
                ? [operation(recursiveMatrix).recursiveHierarchyFrame?.bracketing,
                    operation(recursiveMatrix).resultSourceClass,
                    operation(recursiveMatrix).recursiveHierarchyFrame
                        ?.bracketingChoiceRequired]
                : [operation(maleOpenSource).sexDistinctionFrame?.sexValue,
                    operation(maleOpenSource).sexDistinctionFrame?.referentClass,
                    operation(maleOpenSource).resultSourceClass];
        const expected = record.reviewGroupId === GROUPS[0]
            ? ["compound-embed", true, true]
            : record.reviewGroupId === GROUPS[1]
                ? ["compound-matrix", "tl-1-a", false]
                : ["male", "animate", "zero"];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`,
            observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that canonical Result`,
            record.reviewGroupId === GROUPS[0]
                ? mismatchedRecursiveEmbed.authorizationStatus === "blocked"
                : record.reviewGroupId === GROUPS[1]
                    ? conflictingBracketing.authorizationStatus === "blocked"
                    : nonanimateSex.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
