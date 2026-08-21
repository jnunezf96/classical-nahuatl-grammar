"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson31-ca-matrix-compounds",
    "lesson31-yo-matrix-and-possessive-embed",
    "lesson31-conjunctive-compounds",
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

function yoAnalysis(sourceStem, embedState) {
    return {
        lexicalStatus: "yo-matrix-embed-history",
        sourceStem,
        embedState,
        possessorKind: embedState === "possessive"
            ? "nonspecific-nonhuman"
            : "none",
        meaningRelation: "related-but-distinct",
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson31_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson31-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = value => ctx.evaluateClassicalNahuatlNominalConstruction(
        value);
    const operation = frame => frame.operationFrame || {};

    const caRegular = evaluate(request({
        embedStem: "zaca", embedClass: "tl-1-a",
        embedSourceClass: "tl-1-a", matrixStem: "ca",
        matrixClass: "tl", matrixSourceClass: "tl-1-a",
    }));
    const caLessCommon = evaluate(request({
        embedStem: "moxa", embedClass: "tl-2-b-a",
        embedSourceClass: "tl-2-b-a", matrixStem: "ca",
        matrixClass: "tl", matrixSourceClass: "tl-2-c",
    }));
    const arbitraryCaEmbed = evaluate(request({
        embedStem: "zōl", embedClass: "in", embedSourceClass: "in",
        matrixStem: "ca", matrixClass: "tl",
        matrixSourceClass: "tl-1-a",
    }));
    const ordinaryFinalCa = evaluate(request({
        matrixStem: "zaraca", matrixClass: "tl",
        matrixSourceClass: "tl-2-b-a",
    }));
    const falseCaClass = evaluate(request({
        matrixStem: "ca", matrixClass: "tl",
        matrixSourceClass: "tl-2-b-a",
    }));

    const yoAbsolutive = evaluate(request({
        embedStem: "yōl", embedClass: "tli-1",
        embedSourceClass: "tli-1", matrixStem: "yō",
        matrixClass: "tl", matrixSourceClass: "tl-1-b",
        yoEmbedAnalysis: yoAnalysis("yōl", "absolutive"),
    }));
    const yoPossessive = evaluate(request({
        embedStem: "īx-pan", embedClass: "zero",
        embedSourceClass: "zero", matrixStem: "yō",
        matrixClass: "tl", matrixSourceClass: "tl-1-b",
        yoEmbedAnalysis: yoAnalysis("īx-pan", "possessive"),
    }));
    const yoXAssimilation = evaluate(request({
        embedStem: "īx", embedClass: "tli-1",
        embedSourceClass: "tli-1", matrixStem: "yō",
        matrixClass: "tl", matrixSourceClass: "tl-1-b",
        yoEmbedAnalysis: yoAnalysis("īx", "absolutive"),
    }));
    const arbitraryYoEmbed = evaluate(request({
        embedStem: "zaca", embedClass: "tl-1-a",
        embedSourceClass: "tl-1-a", matrixStem: "yō",
        matrixClass: "tl", matrixSourceClass: "tl-1-b",
        yoEmbedAnalysis: yoAnalysis("zaca", "possessive"),
    }));
    const yoOuterPossessive = evaluate(request({
        embedStem: "teō", embedClass: "zero",
        embedSourceClass: "zero", matrixStem: "yō",
        matrixClass: "tl", matrixSourceClass: "tl-1-b",
        yoEmbedAnalysis: yoAnalysis("teō", "absolutive"),
    }, { state: "possessive" }));
    const updatedPortraitExample = evaluate(request({
        embedStem: "īx-xīp-tla", embedClass: "tl-1-a",
        embedSourceClass: "tl-1-a", matrixStem: "yō",
        matrixClass: "tl", matrixSourceClass: "tl-1-b",
        yoEmbedAnalysis: yoAnalysis("īx-xīp-tla", "possessive"),
    }));
    const wrongYoClass = evaluate(request({
        matrixStem: "yō", matrixClass: "zero", matrixSourceClass: "zero",
        yoEmbedAnalysis: yoAnalysis("zaca", "absolutive"),
    }));
    const wrongYoMatrix = evaluate(request({
        yoEmbedAnalysis: yoAnalysis("zaca", "possessive"),
    }));

    const conjunctTl = evaluate(request({
        embedStem: "ā", embedClass: "tl-1-a",
        embedSourceClass: "tl-1-a", matrixStem: "tepē",
        matrixClass: "tl", matrixSourceClass: "tl-1-a",
        structure: "conjunctive",
    }, { structure: "conjunctive" }));
    const conjunctTli = evaluate(request({
        embedStem: "cuāuh", embedClass: "tli-1",
        embedSourceClass: "tli-1", matrixStem: "ōcēlō",
        matrixClass: "tl", matrixSourceClass: "tl-1-a",
        structure: "conjunctive",
    }, { structure: "conjunctive" }));
    const conjunctUnlisted = evaluate(request({
        embedStem: "zaca", embedClass: "tl-1-a",
        embedSourceClass: "tl-1-a", matrixStem: "mox",
        matrixClass: "zero", matrixSourceClass: "zero",
        structure: "conjunctive",
    }, { structure: "conjunctive" }));
    const conjunctPossessive = evaluate(request({
        embedStem: "zaca", embedClass: "tl-1-a",
        embedSourceClass: "tl-1-a", matrixStem: "mox",
        matrixClass: "zero", matrixSourceClass: "zero",
        structure: "conjunctive",
    }, { structure: "conjunctive", state: "possessive" }));
    const invalidConjunct = evaluate(request({
        embedStem: "zaca", embedClass: "zero",
        embedSourceClass: "zero", structure: "conjunctive",
    }, { structure: "conjunctive" }));

    s.eq("ca is a typed lexical matrix with open compatible embeds", {
        regular: [caRegular.authorizationStatus,
            operation(caRegular).compoundStem,
            operation(caRegular).caMatrixFrame?.semanticContribution,
            operation(caRegular).resultSourceClass],
        lessCommon: [caLessCommon.authorizationStatus,
            operation(caLessCommon).resultSourceClass],
        arbitrary: [arbitraryCaEmbed.authorizationStatus,
            operation(arbitraryCaEmbed).compoundStem],
        authority: operation(caRegular).caMatrixFrame
            ?.productiveRouteAuthority,
    }, {
        regular: ["authorized", "zaca-ca",
            "associated-characterized-or-made-of-entity", "tl-1-a"],
        lessCommon: ["authorized", "tl-2-c"],
        arbitrary: ["authorized", "zōl-ca"],
        authority: false,
    });
    s.eq("ordinary final-ca Sources are distinguished by class, not identity", {
        ordinary: [ordinaryFinalCa.authorizationStatus,
            operation(ordinaryFinalCa).ordinaryFinalCaFrame?.sourceStem,
            operation(ordinaryFinalCa).ordinaryFinalCaFrame?.sourceClass,
            operation(ordinaryFinalCa).ordinaryFinalCaFrame?.caMatrixAnalysis],
        contradiction: [falseCaClass.authorizationStatus,
            falseCaClass.blockReason],
    }, {
        ordinary: ["authorized", "zaraca", "tl-2-b-a", false],
        contradiction: ["blocked",
            "ca-matrix-requires-typed-tl-1-a-or-tl-2-c-result-class"],
    });
    s.eq("yō preserves typed embed history and automatic assimilation", {
        absolutive: [yoAbsolutive.authorizationStatus,
            operation(yoAbsolutive).yoEmbedHistoryFrame?.embedState,
            operation(yoAbsolutive).matrixBoundaryRuleId,
            operation(yoAbsolutive).compoundStem],
        possessive: [yoPossessive.authorizationStatus,
            operation(yoPossessive).yoEmbedHistoryFrame?.possessorMorpheme,
            operation(yoPossessive).compoundStem],
        x: [operation(yoXAssimilation).matrixBoundaryRuleId,
            operation(yoXAssimilation).compoundStem],
        arbitrary: [arbitraryYoEmbed.authorizationStatus,
            operation(arbitraryYoEmbed).compoundStem],
        matrix: [operation(yoAbsolutive).yoMatrixFrame?.sourceClass,
            operation(yoAbsolutive).yoMatrixFrame?.laterUses],
        outerPossessive: [operation(yoOuterPossessive).compoundStem,
            operation(yoOuterPossessive).stateRealizedCompoundStem,
            operation(yoOuterPossessive).stateStemRuleId,
            yoOuterPossessive.wordSurface,
            yoOuterPossessive.sentenceSurface],
        correctedSource: [operation(updatedPortraitExample).embedStem,
            operation(updatedPortraitExample).compoundStem],
    }, {
        absolutive: ["authorized", "absolutive", "l-plus-yo-to-llo",
            "yōl-lō"],
        possessive: ["authorized", "tla", "tla-īx-pan-yō"],
        x: ["x-plus-yo-to-xxo", "īx-xō"],
        arbitrary: ["authorized", "tla-zaca-yō"],
        matrix: ["tl-1-b", ["pertinency-§47.5",
            "gentilic-collectivity-§48.12",
            "characteristic-properties-§39.3"]],
        outerPossessive: ["teō-yō", "teō-yo",
            "yo-tl-1-b-final-o-shortening-before-possessive-zero-dyad",
            "īteōyo", "Īteōyo."],
        correctedSource: ["īx-xīp-tla", "tla-īx-xīp-tla-yō"],
    });
    s.eq("yō contradictions hold Source facts constant where possible", {
        class: [wrongYoClass.authorizationStatus, wrongYoClass.blockReason],
        matrix: [wrongYoMatrix.authorizationStatus, wrongYoMatrix.blockReason],
    }, {
        class: ["blocked",
            "yo-matrix-requires-typed-tl-1-b-source-class"],
        matrix: ["blocked", "typed-yo-embed-history-mismatch"],
    });
    s.eq("conjunctive compounds derive vestiges from the first Source class", {
        tl: [conjunctTl.authorizationStatus,
            operation(conjunctTl).firstConjunctVestige,
            operation(conjunctTl).compoundStem],
        tli: [conjunctTli.authorizationStatus,
            operation(conjunctTli).firstConjunctVestige,
            operation(conjunctTli).compoundStem],
        unlisted: [conjunctUnlisted.authorizationStatus,
            operation(conjunctUnlisted).compoundStem,
            conjunctUnlisted.sourceFrame?.matrixGovernsClass,
            operation(conjunctUnlisted).resultClassSource],
        possessive: operation(conjunctPossessive)
            .possessiveContinuationFrame,
        invalid: [invalidConjunct.authorizationStatus,
            invalidConjunct.blockReason],
    }, {
        tl: ["authorized", "l", "ā-l-tepē"],
        tli: ["authorized", "tl", "cuāuh-tl-ōcēlō"],
        unlisted: ["authorized", "zaca-l-mox", false,
            "second-conjunct"],
        possessive: {
            sourceState: "possessive", singleCompoundAvailable: true,
            separateConjoinedNncsAvailable: true,
            laterOwner: "double-nucleus-conjunction",
            breakupChoiceExposedHere: false,
        },
        invalid: ["blocked",
            "conjunctive-compound-requires-tl-or-tli-first-source"],
    });

    const cueFrames = [caRegular, yoPossessive, conjunctPossessive];
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
    }, { records: 133, writing: 41, groups: 3, cueGroups: 3,
        covered: true });

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [operation(caRegular).caMatrixFrame?.sourceStem,
                operation(caRegular).resultSourceClass,
                operation(ordinaryFinalCa).ordinaryFinalCaFrame
                    ?.caMatrixAnalysis]
            : record.reviewGroupId === GROUPS[1]
                ? [operation(yoPossessive).yoEmbedHistoryFrame?.embedState,
                    operation(yoPossessive).yoEmbedHistoryFrame
                        ?.possessorMorpheme,
                    operation(yoAbsolutive).matrixBoundaryRuleId]
                : [operation(conjunctTl).firstConjunctVestige,
                    operation(conjunctTl).constituentRelation,
                    conjunctTl.sourceFrame?.matrixGovernsClass];
        const expected = record.reviewGroupId === GROUPS[0]
            ? ["ca", "tl-1-a", false]
            : record.reviewGroupId === GROUPS[1]
                ? ["possessive", "tla", "l-plus-yo-to-llo"]
                : ["l", "conjunction", false];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`,
            observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that canonical Result`,
            record.reviewGroupId === GROUPS[0]
                ? falseCaClass.authorizationStatus === "blocked"
                : record.reviewGroupId === GROUPS[1]
                    ? wrongYoClass.authorizationStatus === "blocked"
                : invalidConjunct.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
