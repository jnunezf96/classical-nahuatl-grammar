"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson32-affective-nnc-foundation-and-attitude-route",
    "lesson32-pil-and-pol-affective-matrices",
    "lesson32-tzin-matrix-class-meaning-and-vocative",
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
        affectiveMatrix: "tzin",
        semanticReading: "special-regard",
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

function run(ctx = {}) {
    const s = createSuite("classical_lesson32_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson32-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = value => ctx.evaluateClassicalNahuatlNominalConstruction(value);
    const op = frame => frame.operationFrame || {};

    const ordinaryTzin = evaluate(request());
    const differentTzin = evaluate(request({
        source: { embedStem: "zāyol", embedClass: "zero" },
        semanticReading: "compassion",
    }));
    const pil = evaluate(request({
        affectiveMatrix: "pil",
        semanticReading: "ordinary-affective",
        source: { embedStem: "ton", embedClass: "tli" },
    }));
    const pol = evaluate(request({
        affectiveMatrix: "pōl",
        semanticReading: "ordinary-affective",
        source: { embedStem: "zāyol", embedClass: "tl" },
    }));
    const lexicalized = evaluate(request({
        affectiveMatrix: "pōl",
        semanticReading: "ordinary-affective",
        source: {
            embedStem: "zāyol",
            embedClass: "tl",
            affectiveLexicalAnalysis: {
                lexicalStatus: "affective-compound-lexical-analysis",
                embedStem: "zāyol",
                matrixStem: "pōl",
                lexicalizedSpecialMeaning: true,
                resultClass: "tli",
                embedVariantStem: "",
                variantKind: "",
            },
        },
    }));
    const irregular = evaluate(request({
        source: {
            embedStem: "nōn",
            embedClass: "tl",
            affectiveLexicalAnalysis: {
                lexicalStatus: "affective-compound-lexical-analysis",
                embedStem: "nōn",
                matrixStem: "tzin",
                lexicalizedSpecialMeaning: false,
                resultClass: "",
                embedVariantStem: "nō",
                variantKind: "irregular-compound-embed",
            },
        },
        semanticReading: "honorific",
    }));
    const mismatch = evaluate(request({
        affectiveMatrix: "pōl",
        semanticReading: "ordinary-affective",
        source: {
            affectiveLexicalAnalysis: {
                lexicalStatus: "affective-compound-lexical-analysis",
                embedStem: "not-the-source",
                matrixStem: "pōl",
                lexicalizedSpecialMeaning: true,
                resultClass: "tli",
                embedVariantStem: "",
                variantKind: "",
            },
        },
    }));
    const demonstrative = evaluate(request({
        source: { embedStem: "in", embedClass: "zero" },
        semanticReading: "affection",
    }));
    const mass = evaluate(request({
        source: { embedStem: "ā", embedClass: "tl" },
        semanticReading: "mass-delimited",
        animacy: "nonanimate",
    }));
    const fullVocative = evaluate(request({
        state: "vocative", vocativeForm: "full", semanticReading: "honorific",
    }));
    const shortVocative = evaluate(request({
        state: "vocative", vocativeForm: "abbreviated",
        semanticReading: "honorific",
    }));
    const wrongReading = evaluate(request({
        affectiveMatrix: "pil", semanticReading: "honorific",
    }));
    const wrongVocative = evaluate(request({
        affectiveMatrix: "pil", semanticReading: "ordinary-affective",
        state: "vocative", vocativeForm: "abbreviated",
    }));
    const wrongRoute = evaluate(request({ affectRoute: "flawed-subject" }));

    s.eq("typed structure selects the attitude route without an example gate", {
        first: [ordinaryTzin.authorizationStatus,
            op(ordinaryTzin).attitudeRouteFrame.selectedRoute,
            op(ordinaryTzin).attitudeRouteFrame.availableRoutes,
            op(ordinaryTzin).attitudeRouteFrame.routeChoiceRequired,
            op(ordinaryTzin).attitudeRouteFrame.attitudeLocation],
        different: [differentTzin.authorizationStatus,
            op(differentTzin).compoundStem,
            op(differentTzin).semanticReading],
        wrong: [wrongRoute.authorizationStatus, wrongRoute.blockReason],
    }, {
        first: ["authorized", "compound", ["compound"], false,
            "affective-matrix-nounstem"],
        different: ["authorized", "zāyol-tzin", "compassion"],
        wrong: ["blocked", "flawed-subject-requires-licensed-defect-stem"],
    });
    s.eq("pīl and pōl accept open typed embeds and derive ordinary zero class", {
        pil: [pil.authorizationStatus, op(pil).affectiveMatrixStem,
            op(pil).compoundStem, op(pil).matrixClass,
            op(pil).affectiveMatrixFrame.semanticContribution,
            op(pil).affectiveMatrixFrame.embedAdmission],
        pol: [pol.authorizationStatus, op(pol).compoundStem,
            op(pol).matrixClass,
            op(pol).affectiveMatrixFrame.semanticContribution],
    }, {
        pil: ["authorized", "pīl", "tom-pīl", "zero",
            "affectionate-smallness", "open-compatible-typed-nnc-source"],
        pol: ["authorized", "zāyol-pōl", "zero",
            "disparaging-largeness"],
    });
    s.eq("exceptional class and shape require matching typed lexical analysis", {
        ordinary: op(pol).matrixClass,
        lexicalized: [lexicalized.authorizationStatus,
            op(lexicalized).matrixClass,
            op(lexicalized).lexicalizedSpecialMeaningFrame
                ?.lexicalizedSpecialMeaning],
        irregular: [irregular.authorizationStatus,
            op(irregular).compoundStem,
            op(irregular).lexicalizedSpecialMeaningFrame?.embedVariantStem],
        mismatch: [mismatch.authorizationStatus, mismatch.blockReason],
    }, {
        ordinary: "zero",
        lexicalized: ["authorized", "tli", true],
        irregular: ["authorized", "nō-tzin", "nō"],
        mismatch: ["blocked", "typed-affective-compound-lexical-analysis-mismatch"],
    });
    s.eq("tzin keeps reading, class, and open Source admission visible", {
        zero: [op(ordinaryTzin).tzinMatrixFrame.selectedMeaning,
            op(ordinaryTzin).tzinMatrixFrame.embedClass,
            op(ordinaryTzin).tzinMatrixFrame.resultClass],
        tli: [mass.authorizationStatus, op(mass).matrixClass,
            op(mass).tzinMatrixFrame.masslikeEmbedAvailable],
        demonstrative: [demonstrative.authorizationStatus,
            op(demonstrative).compoundStem,
            op(demonstrative).tzinMatrixFrame.demonstrativeSourcesRemainAvailable],
        meanings: op(demonstrative).tzinMatrixFrame.availableMeanings,
    }, {
        zero: ["special-regard", "zero", "zero"],
        tli: ["authorized", "tli", true],
        demonstrative: ["authorized", "in-tzin", true],
        meanings: ["special-regard", "honorific", "compassion", "affection",
            "cherished-smallness", "mass-delimited"],
    });
    s.eq("vocative form is chosen but final é and class are automatic", {
        full: [fullVocative.authorizationStatus,
            op(fullVocative).vocativeFrame.selectedForm,
            op(fullVocative).vocativeFrame.matrixStem,
            op(fullVocative).vocativeFrame.particle,
            op(fullVocative).vocativeFrame.register,
            fullVocative.sentenceSurface.endsWith("é")],
        short: [shortVocative.authorizationStatus,
            op(shortVocative).vocativeFrame.selectedForm,
            op(shortVocative).vocativeFrame.matrixStem,
            op(shortVocative).vocativeFrame.formChoiceRequired,
            shortVocative.sentenceSurface.endsWith("é")],
        wrongReading: [wrongReading.authorizationStatus,
            wrongReading.blockReason],
        wrongVocative: [wrongVocative.authorizationStatus,
            wrongVocative.blockReason],
    }, {
        full: ["authorized", "full", "tzin", "é",
            "full-formal-or-ritualistic", true],
        short: ["authorized", "abbreviated", "tz", true, true],
        wrongReading: ["blocked", "selected-tzin-reading-requires-tzin-matrix"],
        wrongVocative: ["blocked", "abbreviated-vocative-requires-tzin"],
    });

    const cueFrames = [ordinaryTzin, pil, lexicalized, fullVocative];
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
    }, { records: 112, writing: 58, groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [op(ordinaryTzin).attitudeRouteFrame.selectedRoute,
                op(ordinaryTzin).attitudeRouteFrame.attitudeLocation,
                op(ordinaryTzin).attitudeRouteFrame.routeChoiceRequired]
            : record.reviewGroupId === GROUPS[1]
                ? [op(pil).affectiveMatrixFrame.sourceStem,
                    op(pil).matrixClass,
                    op(pil).affectiveMatrixFrame.embedAdmission]
                : [op(ordinaryTzin).tzinMatrixFrame.selectedMeaning,
                    op(ordinaryTzin).tzinMatrixFrame.resultClass,
                    op(fullVocative).vocativeFrame.particle];
        const expected = record.reviewGroupId === GROUPS[0]
            ? ["compound", "affective-matrix-nounstem", false]
            : record.reviewGroupId === GROUPS[1]
                ? ["pīl", "zero", "open-compatible-typed-nnc-source"]
                : ["special-regard", "zero", "é"];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`,
            observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that Result`,
            record.reviewGroupId === GROUPS[0]
                ? op(differentTzin).compoundStem !== op(ordinaryTzin).compoundStem
                : record.reviewGroupId === GROUPS[1]
                    ? op(lexicalized).matrixClass !== op(pol).matrixClass
                    : op(mass).matrixClass !== op(ordinaryTzin).matrixClass);
    }
    return s;
}

module.exports = { run };
