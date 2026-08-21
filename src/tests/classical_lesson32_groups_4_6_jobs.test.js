"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson32-ton-matrix-and-class-exceptions",
    "lesson32-zol-matrix-recursion-and-denominal-continuation",
    "lesson32-affective-affinity-and-absolutive-number",
];

function request(overrides = {}) {
    return {
        constructionKind: "affective-nnc",
        source: {
            embedStem: "xōchi",
            embedClass: "zero",
            ...overrides.source,
        },
        affectRoute: "compound",
        affectiveMatrix: "tōn",
        semanticReading: "ordinary-affective",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...overrides,
        source: {
            embedStem: "xōchi",
            embedClass: "zero",
            ...overrides.source,
        },
    };
}

function classException(embedStem, matrixStem = "tōn") {
    return {
        lexicalStatus: "affective-compound-lexical-analysis",
        embedStem,
        matrixStem,
        lexicalizedSpecialMeaning: false,
        classException: true,
        resultClass: "zero",
        embedVariantStem: "",
        variantKind: "",
    };
}

function affinityAnalysis(embedStem, matrixStem, requirement, target = "initial") {
    return {
        lexicalStatus: "affective-affinity-scope-analysis",
        embedStem,
        matrixStem,
        embedAffinityRequirement: requirement,
        embedAffinityTarget: target,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson32_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson32-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = value => ctx.evaluateClassicalNahuatlNominalConstruction(value);
    const op = frame => frame.operationFrame || {};

    const tonZero = evaluate(request());
    const tonTli = evaluate(request({
        source: { embedStem: "michi", embedClass: "in" },
    }));
    const tonExceptional = evaluate(request({
        source: {
            embedStem: "michi",
            embedClass: "in",
            affectiveLexicalAnalysis: classException("michi"),
        },
    }));
    const tonBoundary = evaluate(request({
        source: {
            embedStem: "te-coma",
            embedClass: "tl",
            affectiveLexicalAnalysis: {
                lexicalStatus: "affective-compound-lexical-analysis",
                embedStem: "te-coma",
                matrixStem: "tōn",
                lexicalizedSpecialMeaning: false,
                classException: false,
                resultClass: "",
                embedVariantStem: "te-con",
                variantKind: "irregular-compound-embed",
            },
        },
    }));
    const tonMismatch = evaluate(request({
        source: {
            embedStem: "michi",
            embedClass: "in",
            affectiveLexicalAnalysis: classException("another-source"),
        },
    }));

    const zol = evaluate(request({
        affectiveMatrix: "zol",
        animacy: "nonanimate",
        source: { embedStem: "tilmah", embedClass: "tli", animacy: "nonanimate" },
    }));
    const anotherZol = evaluate(request({
        affectiveMatrix: "zol",
        animacy: "nonanimate",
        source: { embedStem: "xōchi", embedClass: "zero", animacy: "nonanimate" },
    }));
    const animateZol = evaluate(request({
        affectiveMatrix: "zol",
        source: { embedStem: "tilmah", embedClass: "tli" },
    }));
    const recursiveZol = evaluate(request({
        affectiveMatrix: "tōn",
        animacy: "nonanimate",
        source: {
            embedStem: op(zol).compoundStem,
            embedClass: op(zol).matrixClass,
            embedConstituent: {
                kind: "affective-nnc",
                stem: op(zol).compoundStem,
                resultFrame: zol,
            },
        },
    }));
    const nonZolInner = evaluate(request({ affectiveMatrix: "tzin" }));
    const blockedRecursion = evaluate(request({
        affectiveMatrix: "tōn",
        source: {
            embedStem: op(nonZolInner).compoundStem,
            embedClass: op(nonZolInner).matrixClass,
            embedConstituent: {
                kind: "affective-nnc",
                stem: op(nonZolInner).compoundStem,
                resultFrame: nonZolInner,
            },
        },
    }));
    const zolInchoative = evaluate(request({
        affectiveOutputKind: "denominal-vnc",
        affectiveMatrix: "zol",
        denominalKind: "inchoative",
        source: { embedStem: "zol", embedClass: "tli" },
    }));
    const zolCausative = evaluate(request({
        affectiveOutputKind: "denominal-vnc",
        affectiveMatrix: "zol",
        denominalKind: "causative",
        source: { embedStem: "zol", embedClass: "tli" },
    }));
    const wrongDenominalSource = evaluate(request({
        affectiveOutputKind: "denominal-vnc",
        affectiveMatrix: "zol",
        denominalKind: "inchoative",
        source: { embedStem: "cal", embedClass: "tli" },
    }));

    const affinitySilent = evaluate(request({
        affectiveMatrix: "tzin",
        subject: "3pl",
        reduplication: "none",
    }));
    const affinitySounded = evaluate(request({
        subject: "3pl",
        reduplication: "none",
        source: { embedStem: "cōl", embedClass: "tli" },
    }));
    const optionalMatrix = evaluate(request({
        affectiveMatrix: "pil",
        subject: "3pl",
        source: {
            embedStem: "tēl-pōch",
            embedClass: "zero",
            affectiveAffinityAnalysis: affinityAnalysis(
                "tēl-pōch", "pil", "optional", "matrix"),
        },
    }));
    const optionalBoth = evaluate(request({
        affectiveMatrix: "pil",
        subject: "3pl",
        affinityEmbedSelected: true,
        source: {
            embedStem: "tēl-pōch",
            embedClass: "zero",
            affectiveAffinityAnalysis: affinityAnalysis(
                "tēl-pōch", "pil", "optional", "matrix"),
        },
    }));
    const obligatoryBoth = evaluate(request({
        affectiveMatrix: "pil",
        subject: "3pl",
        source: {
            embedStem: "pīl",
            embedClass: "tli",
            affectiveAffinityAnalysis: affinityAnalysis(
                "pīl", "pil", "obligatory", "initial"),
        },
    }));
    const invalidAffinityChoice = evaluate(request({
        subject: "3pl",
        affinityEmbedSelected: true,
    }));
    const singularAffinity = evaluate(request({ reduplication: "affinity" }));

    s.eq("tōn is productive and derives class unless typed analysis says otherwise", {
        zero: [tonZero.authorizationStatus, op(tonZero).compoundStem,
            op(tonZero).matrixClass, op(tonZero).tonMatrixFrame.selectedMeaning],
        tli: [tonTli.authorizationStatus, op(tonTli).compoundStem,
            op(tonTli).matrixClass,
            op(tonTli).tonMatrixFrame.classDerivedAutomatically],
        exception: [tonExceptional.authorizationStatus,
            op(tonExceptional).matrixClass,
            op(tonExceptional).tonMatrixFrame.classExceptionFrame?.resultClass],
        boundary: [tonBoundary.authorizationStatus,
            op(tonBoundary).compoundStem,
            op(tonBoundary).tonMatrixFrame.boundaryExceptionFrame?.embedVariantStem],
        mismatch: [tonMismatch.authorizationStatus, tonMismatch.blockReason],
    }, {
        zero: ["authorized", "xōchi-tōn", "zero",
            "smallness-without-admiration-or-affection"],
        tli: ["authorized", "michi-tōn", "tli", true],
        exception: ["authorized", "zero", "zero"],
        boundary: ["authorized", "te-con-tōn", "te-con"],
        mismatch: ["blocked", "typed-affective-compound-lexical-analysis-mismatch"],
    });
    s.eq("zol is open, nonanimate, always tli, and recursively capturable", {
        first: [zol.authorizationStatus, op(zol).compoundStem,
            op(zol).matrixClass, op(zol).zolMatrixFrame.requiredAnimacy],
        another: [anotherZol.authorizationStatus, op(anotherZol).compoundStem,
            op(anotherZol).matrixClass],
        animate: [animateZol.authorizationStatus, animateZol.blockReason],
        recursive: [recursiveZol.authorizationStatus,
            op(recursiveZol).compoundStem,
            op(recursiveZol).recursiveAffectiveEmbedFrame?.innerMatrix,
            op(recursiveZol).recursiveAffectiveEmbedFrame?.depth,
            op(recursiveZol).recursiveAffectiveEmbedFrame?.ownerIssuedResultPreserved],
        blockedRecursion: [blockedRecursion.authorizationStatus,
            blockedRecursion.blockReason],
    }, {
        first: ["authorized", "tilmah-zol", "tli", "nonanimate"],
        another: ["authorized", "xōchi-zol", "tli"],
        animate: ["blocked", "affective-zol-requires-nonanimate-embed"],
        recursive: ["authorized", "tilmah-zol-tōn", "zol", 2, true],
        blockedRecursion: ["blocked",
            "recursive-affective-embed-requires-zol-inner-matrix"],
    });
    s.eq("typed zol continues through canonical denominal VNC owners", {
        inchoative: [zolInchoative.authorizationStatus,
            op(zolInchoative).denominalContinuationFrame?.sourceNounstem,
            op(zolInchoative).denominalContinuationFrame?.selectedContinuation,
            op(zolInchoative).denominalContinuationFrame?.derivedVerbstem,
            op(zolInchoative).denominalContinuationFrame?.manualStemAssemblyAllowed],
        causative: [zolCausative.authorizationStatus,
            op(zolCausative).denominalContinuationFrame?.selectedContinuation,
            op(zolCausative).denominalContinuationFrame?.derivedBoundary],
        wrong: [wrongDenominalSource.authorizationStatus,
            wrongDenominalSource.blockReason],
    }, {
        inchoative: ["authorized", "zol", "inchoative", "zol-i-hui", false],
        causative: ["authorized", "causative", ["zol", "o", "ā"]],
        wrong: ["blocked",
            "zol-denominal-continuation-requires-typed-zol-tli-source"],
    });
    s.eq("plural affective affinity and absolutive number are automatic", {
        silent: [affinitySilent.authorizationStatus,
            op(affinitySilent).reduplication,
            op(affinitySilent).compoundStem,
            op(affinitySilent).affectiveAffinityFrame?.matrixPrefixVowelQuantity,
            op(affinitySilent).affectiveAffinityFrame?.absolutivePluralDyad,
            affinitySilent.canonicalResult?.numberFrame?.num1,
            affinitySilent.canonicalResult?.numberFrame?.num2],
        sounded: [affinitySounded.authorizationStatus,
            op(affinitySounded).compoundStem,
            op(affinitySounded).affectiveAffinityFrame?.correspondingSingularNum1,
            op(affinitySounded).affectiveAffinityFrame?.absolutivePluralDyad,
            affinitySounded.canonicalResult?.numberFrame?.num1,
            affinitySounded.canonicalResult?.numberFrame?.num2],
        singular: [singularAffinity.authorizationStatus,
            singularAffinity.blockReason],
    }, {
        silent: ["authorized", "affinity", "xōchi-tzi-tzin", "short",
            "⎕-⎕", "⎕", "⎕"],
        sounded: ["authorized", "cōl-to-tōn", "sounded", "t-in", "t", "in"],
        singular: ["blocked",
            "affective-affinity-requires-plural-compound-subject"],
    });
    s.eq("typed embed affinity exposes only the genuine optional target", {
        matrix: [optionalMatrix.authorizationStatus,
            op(optionalMatrix).compoundStem,
            op(optionalMatrix).affectiveAffinityFrame?.selectedTarget,
            op(optionalMatrix).affectiveAffinityFrame?.targetChoiceRequired],
        both: [optionalBoth.authorizationStatus,
            op(optionalBoth).compoundStem,
            op(optionalBoth).affectiveAffinityFrame?.embedAffinityTarget,
            op(optionalBoth).affectiveAffinityFrame?.selectedTarget],
        obligatory: [obligatoryBoth.authorizationStatus,
            op(obligatoryBoth).affectiveAffinityFrame?.embedAffinityRequirement,
            op(obligatoryBoth).affectiveAffinityFrame?.embedAffinityApplied,
            op(obligatoryBoth).affectiveAffinityFrame?.targetChoiceRequired],
        invalid: [invalidAffinityChoice.authorizationStatus,
            invalidAffinityChoice.blockReason],
    }, {
        matrix: ["authorized", "tēl-pōch-pi-pīl", "matrix", true],
        both: ["authorized", "tēl-pō-pōch-pi-pīl", "matrix", "both"],
        obligatory: ["authorized", "obligatory", true, false],
        invalid: ["blocked",
            "affective-embed-affinity-choice-not-licensed-by-typed-source"],
    });

    const cueFrames = [tonTli, tonExceptional, zol, recursiveZol,
        zolInchoative, affinitySilent, optionalBoth];
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
    }, { records: 83, writing: 30, groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [op(tonTli).tonMatrixFrame.selectedMeaning,
                op(tonTli).matrixClass,
                op(tonTli).tonMatrixFrame.classDerivedAutomatically]
            : record.reviewGroupId === GROUPS[1]
                ? [op(zol).zolMatrixFrame.requiredAnimacy,
                    op(zol).matrixClass,
                    op(recursiveZol).recursiveAffectiveEmbedFrame?.innerMatrix]
                : [op(affinitySilent).affectiveAffinityFrame
                    ?.matrixPrefixVowelQuantity,
                    op(affinitySilent).affectiveAffinityFrame
                        ?.absolutivePluralDyad,
                    op(affinitySilent).affectiveAffinityFrame
                        ?.matrixAffinityAutomatic];
        const expected = record.reviewGroupId === GROUPS[0]
            ? ["smallness-without-admiration-or-affection", "tli", true]
            : record.reviewGroupId === GROUPS[1]
                ? ["nonanimate", "tli", "zol"]
                : ["short", "⎕-⎕", true];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`,
            observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that Result`,
            record.reviewGroupId === GROUPS[0]
                ? op(tonExceptional).matrixClass !== op(tonTli).matrixClass
                : record.reviewGroupId === GROUPS[1]
                    ? animateZol.authorizationStatus === "blocked"
                    : op(affinitySounded).affectiveAffinityFrame
                        ?.absolutivePluralDyad
                        !== op(affinitySilent).affectiveAffinityFrame
                            ?.absolutivePluralDyad);
    }
    return s;
}

module.exports = { run };
