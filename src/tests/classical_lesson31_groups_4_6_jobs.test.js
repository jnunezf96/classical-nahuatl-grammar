"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson31-simple-embed-class-examples",
    "lesson31-tl-subclass-two-and-boundary-alternations",
    "lesson31-unique-compound-only-nounstems",
];

function request(source = {}, overrides = {}) {
    return {
        constructionKind: "compound-nnc",
        structure: "integrated",
        embedRole: "association",
        possessorOrientation: "matrix",
        subject: "3sg",
        state: "absolutive",
        possessor: "3sg",
        animacy: "animate",
        source: {
            embedStem: "zōl",
            embedClass: "in",
            embedSourceClass: "in",
            matrixStem: "ez",
            matrixClass: "tli",
            ...source,
        },
        ...overrides,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson31_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson31-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = value => ctx.evaluateClassicalNahuatlNominalConstruction(
        value);
    const operation = frame => frame.operationFrame || {};

    const simple = [
        request({ embedStem: "ten", embedClass: "tli-1",
            embedSourceClass: "tli-1", matrixStem: "tzon" }),
        request({ embedStem: "tōtol", embedClass: "in",
            embedSourceClass: "in", matrixStem: "te", matrixClass: "tl" }),
        request({ embedStem: "tlatzcan", embedClass: "zero",
            embedSourceClass: "zero", matrixStem: "copal" }),
        request({ embedStem: "teō", embedClass: "tl-1-a",
            embedSourceClass: "tl-1-a", matrixStem: "cuitla",
            matrixClass: "tl" }),
    ].map(evaluate);
    const subclass = {
        retained: evaluate(request({ embedStem: "petla",
            embedClass: "tl-2-b-a", embedSourceClass: "tl-2-b-a",
            matrixStem: "cal" })),
        lost: evaluate(request({ embedStem: "maxa",
            embedClass: "tl-2-b-a", embedSourceClass: "tl-2-b-a",
            matrixStem: "tla", matrixClass: "tl",
            compoundEmbedAnalysis: {
                lexicalStatus: "compound-embed-exception",
                sourceStem: "maxa",
                exceptionKind: "marked-final-a-loss",
                meaningCertainty: "known",
                sourceBoundaries: ["maxa"],
            } })),
        truncated: evaluate(request({ embedStem: "quili",
            embedClass: "tl-2-b-i", embedSourceClass: "tl-2-b-i",
            matrixStem: "mil" })),
        repaired: evaluate(request({ embedStem: "tlaca",
            embedClass: "tl-2-c", embedSourceClass: "tl-2-c",
            matrixStem: "mox" })),
        glottalized: evaluate(request({ embedStem: "māi",
            embedClass: "tl-2-a", embedSourceClass: "tl-2-a",
            matrixStem: "e-hu-a", matrixClass: "tl",
            compoundEmbedAnalysis: {
                lexicalStatus: "compound-embed-exception",
                sourceStem: "māi",
                exceptionKind: "glottalized-long-vowel",
                meaningCertainty: "known",
                sourceBoundaries: ["māi"],
            } })),
        boundary: evaluate(request({ embedStem: "mah",
            embedClass: "tli-1", embedSourceClass: "tli-1",
            matrixStem: "e-hu-a", matrixClass: "tl" })),
        negative: evaluate(request({ embedStem: "ah",
            embedClass: "zero", embedSourceClass: "zero",
            matrixStem: "tlaca", matrixClass: "tl" })),
        variant: evaluate(request({ embedStem: "xōchi",
            embedClass: "tl-1-a", embedSourceClass: "tl-1-a",
            matrixStem: "cua-l", matrixClass: "tli",
            compoundEmbedAnalysis: {
                lexicalStatus: "compound-embed-exception",
                sourceStem: "xōchi",
                exceptionKind: "unexpected-variant",
                variantStem: "xochih",
                meaningCertainty: "known",
                sourceBoundaries: ["xō", "chi"],
            } })),
    };
    const uniqueSource = {
        lexicalStatus: "unique-compound-only-nounstem",
        position: "embed",
        sourceStem: "chi",
        meaningCertainty: "uncertain",
        historicalSource: "chi",
        sourceBoundaries: ["chi"],
        relatedFormations: ["chi-nāmi"],
    };
    const unique = evaluate(request({ embedStem: "chi",
        embedClass: "tl-1-a", embedSourceClass: "tl-1-a",
        matrixStem: "nāmi", matrixClass: "tl",
        uniqueCompoundNounstemAnalysis: uniqueSource }));
    const sameWithoutUnique = evaluate(request({ embedStem: "chi",
        embedClass: "tl-1-a", embedSourceClass: "tl-1-a",
        matrixStem: "nāmi", matrixClass: "tl" }));
    const unlistedUnique = evaluate(request({ embedStem: "zaca",
        embedClass: "tl-1-a", embedSourceClass: "tl-1-a",
        matrixStem: "mox", matrixClass: "zero",
        uniqueCompoundNounstemAnalysis: {
            ...uniqueSource, sourceStem: "zaca", sourceBoundaries: ["za", "ca"],
            relatedFormations: [],
        } }));

    const invalidFinalLoss = evaluate(request({ embedStem: "maxa",
        embedClass: "tl-1-a", embedSourceClass: "tl-1-a",
        compoundEmbedAnalysis: {
            lexicalStatus: "compound-embed-exception", sourceStem: "maxa",
            exceptionKind: "marked-final-a-loss", meaningCertainty: "known",
            sourceBoundaries: ["maxa"],
        } }));
    const invalidUnique = evaluate(request({ embedStem: "chi",
        embedClass: "tl-1-a", embedSourceClass: "tl-1-a",
        matrixStem: "nāmi", matrixClass: "tl",
        uniqueCompoundNounstemAnalysis: {
            ...uniqueSource, position: "matrix",
        } }));
    const missingClass = evaluate(request({ embedClass: "",
        embedSourceClass: "" }));
    const shapeMutation = evaluate(request({ embedStem: "zōli",
        embedClass: "tl-2-b-i", embedSourceClass: "tl-2-b-i" }));

    s.eq("simple noun classes share one productive compound owner", simple.map(
        frame => [frame.authorizationStatus, operation(frame).embedShape?.sourceClass,
            operation(frame).embedShape?.realizedStem,
            operation(frame).embedShape?.sourceShapeRule,
            operation(frame).matrixClass]), [
        ["authorized", "tli-1", "ten", "general-use-embed", "tli"],
        ["authorized", "in", "tōtol", "general-use-embed", "tl"],
        ["authorized", "zero", "tlatzcan", "general-use-embed", "tli"],
        ["authorized", "tl-1-a", "teō", "general-use-embed", "tl"],
    ]);
    s.eq("Subclass 2 and boundary outcomes follow typed shape plus lexical facts", {
        retained: [operation(subclass.retained).embedShape?.realizedStem,
            operation(subclass.retained).embedShape?.sourceShapeRule],
        lost: [operation(subclass.lost).embedShape?.realizedStem,
            operation(subclass.lost).embedShape?.sourceShapeRule],
        truncated: operation(subclass.truncated).embedShape?.realizedStem,
        repaired: operation(subclass.repaired).embedShape?.realizedStem,
        glottalized: [operation(subclass.glottalized).embedShape?.realizedStem,
            operation(subclass.glottalized).embedShape?.boundaryRuleId],
        boundary: [operation(subclass.boundary).embedShape?.realizedStem,
            operation(subclass.boundary).embedShape?.boundaryRuleId],
        negative: operation(subclass.negative).embedShape?.realizedStem,
        variant: operation(subclass.variant).embedShape?.realizedStem,
    }, {
        retained: ["petla", "compound-tl-2-b-final-a-retention"],
        lost: ["max", "marked-tl-2-b-final-a-loss"],
        truncated: "quil", repaired: "tlaci",
        glottalized: ["may", "final-h-to-y-before-vowel"],
        boundary: ["may", "final-h-to-y-before-vowel"],
        negative: "ah", variant: "xochih",
    });
    s.eq("unique lexical status is preserved but never gates compounding", {
        typed: [unique.authorizationStatus,
            operation(unique).uniqueCompoundNounstemAnalysisFrame?.position,
            operation(unique).uniqueCompoundNounstemAnalysisFrame
                ?.meaningCertainty,
            operation(unique).uniqueCompoundNounstemAnalysisFrame
                ?.productiveRouteAuthority,
            operation(unique).compoundStem],
        ordinary: [sameWithoutUnique.authorizationStatus,
            Boolean(operation(sameWithoutUnique)
                .uniqueCompoundNounstemAnalysisFrame),
            operation(sameWithoutUnique).compoundStem],
        unlisted: [unlistedUnique.authorizationStatus,
            operation(unlistedUnique).uniqueCompoundNounstemAnalysisFrame
                ?.sourceStem],
    }, {
        typed: ["authorized", "embed", "uncertain", false, "chi-nāmi"],
        ordinary: ["authorized", false, "chi-nāmi"],
        unlisted: ["authorized", "zaca"],
    });
    s.eq("contradictions change typed facts instead of checking a stem list", {
        finalLoss: [invalidFinalLoss.authorizationStatus,
            invalidFinalLoss.blockReason],
        unique: [invalidUnique.authorizationStatus, invalidUnique.blockReason],
        missingClass: [missingClass.authorizationStatus,
            missingClass.blockReason],
        shapeMutation: [shapeMutation.authorizationStatus,
            operation(shapeMutation).embedShape?.realizedStem,
            operation(shapeMutation).matrixStem],
    }, {
        finalLoss: ["blocked",
            "marked-final-a-loss-requires-tl-2-b-final-a-source"],
        unique: ["blocked",
            "typed-unique-compound-nounstem-analysis-mismatch"],
        missingClass: ["blocked",
            "nominal-compound-embed-stem-and-class-required"],
        shapeMutation: ["authorized", "zōl", "ez"],
    });

    const cueFrames = [simple[0], subclass.lost, unique];
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
    }, { records: 99, writing: 31, groups: 3, cueGroups: 3,
        covered: true });

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [operation(simple[0]).embedShape?.sourceClass,
                operation(simple[0]).embedShape?.realizedStem,
                operation(simple[0]).matrixClass]
            : record.reviewGroupId === GROUPS[1]
                ? [operation(subclass.lost).embedShape?.sourceShapeRule,
                    operation(subclass.boundary).embedShape?.boundaryRuleId,
                    operation(subclass.glottalized).embedShape
                        ?.fullerSourceAnalysisPreserved]
                : [operation(unique).uniqueCompoundNounstemAnalysisFrame
                    ?.position,
                    operation(unique).uniqueCompoundNounstemAnalysisFrame
                        ?.meaningCertainty,
                    operation(unique).uniqueCompoundNounstemAnalysisFrame
                        ?.productiveRouteAuthority];
        const expected = record.reviewGroupId === GROUPS[0]
            ? ["tli-1", "ten", "tli"]
            : record.reviewGroupId === GROUPS[1]
                ? ["marked-tl-2-b-final-a-loss",
                    "final-h-to-y-before-vowel", true]
                : ["embed", "uncertain", false];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`,
            observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that canonical Result`,
            record.reviewGroupId === GROUPS[0]
                ? operation(shapeMutation).embedShape?.realizedStem
                    !== operation(simple[0]).embedShape?.realizedStem
                : record.reviewGroupId === GROUPS[1]
                    ? invalidFinalLoss.authorizationStatus === "blocked"
                : invalidUnique.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
