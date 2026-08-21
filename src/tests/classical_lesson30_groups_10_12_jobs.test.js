"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const RENDERING_SOURCE = fs.readFileSync(path.join(
    ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
const GROUPS = [
    "lesson30-unique-embed-nounstems",
    "lesson30-possessive-supplementary-subject-adverbs",
    "lesson30-possessive-supplementary-object-and-passive-adverbs",
];

function request(overrides = {}) {
    return {
        constructionKind: "nominal-embed-vnc",
        relation: "adverb",
        route: "direct-adverb",
        adverbRole: "manner",
        source: {
            embedStem: "il",
            matrixStem: "cahu-a-ca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
            subjectReferenceId: "principal-subject",
            objectReferenceIds: [],
            ...overrides.source,
        },
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        outputKind: "single",
        ...overrides,
        source: {
            embedStem: "il",
            matrixStem: "cahu-a-ca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
            subjectReferenceId: "principal-subject",
            objectReferenceIds: [],
            ...overrides.source,
        },
    };
}

function possessiveNnc(ctx, stem, possessor) {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem, sourceClass: "zero",
    });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
        state: "possessive", subject: "3sg", possessor,
    });
    return ctx.requestClassicalOrdinaryNncResult(source, operation);
}

function matrixVnc(ctx, matrixStem, matrixVerbClass, matrixValence, objectPerson = "") {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: matrixStem,
        verbClass: matrixVerbClass,
        sourceValence: matrixValence === "intransitive"
            ? "intransitive"
            : "specific-projective",
        objectPerson,
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedVoice: "active",
        outputScope: "single",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson30_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson30-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => GROUPS.includes(record.reviewGroupId));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = value => ctx.evaluateClassicalNahuatlNominalConstruction(value);
    const operation = frame => frame.operationFrame || {};

    const knownUnique = evaluate(request());
    const typedUnique = evaluate(request({
        source: {
            embedStem: "zax-invented",
            uniqueEmbedAnalysis: {
                lexicalStatus: "unique-incorporated-nounstem",
                sourceStem: "zax-invented",
                initialIAnalysis: "not-applicable",
                meaningCertainty: "uncertain",
                historicalSource: "zan-a-ni",
            },
        },
    }));
    const sameStemProductive = evaluate(request({
        source: { embedStem: "zax-invented" },
    }));
    const mismatchedUnique = evaluate(request({
        source: {
            embedStem: "zax-invented",
            uniqueEmbedAnalysis: {
                lexicalStatus: "unique-incorporated-nounstem",
                sourceStem: "other-stem",
                initialIAnalysis: "not-applicable",
                meaningCertainty: "uncertain",
                historicalSource: "zan-a-ni",
            },
        },
    }));
    const ihSupportive = evaluate(request({
        source: {
            embedStem: "ih",
            uniqueEmbedAnalysis: {
                lexicalStatus: "unique-incorporated-nounstem",
                sourceStem: "ih",
                initialIAnalysis: "supportive",
                meaningCertainty: "uncertain",
                historicalSource: "i-tl",
            },
        },
    }));
    const ihReduplicated = evaluate(request({
        embedReduplication: "affinity",
        source: {
            embedStem: "ih",
            uniqueEmbedAnalysis: {
                lexicalStatus: "unique-incorporated-nounstem",
                sourceStem: "ih",
                initialIAnalysis: "supportive",
                meaningCertainty: "uncertain",
                historicalSource: "i-tl",
            },
        },
    }));
    const uniqueContinuation = ctx.getClassicalNahuatlVncContinuationSourceConstituents(
        typedUnique.canonicalResult?.resultFrame || typedUnique.canonicalResult,
    );

    const subjectEmbed = possessiveNnc(ctx, "mā", "1sg");
    const intransitiveMatrix = matrixVnc(ctx, "chōca", "A", "intransitive");
    const supplementSubject = evaluate(request({
        route: "supplement-subject",
        adverbRole: "means",
        source: {
            embedStem: "mā",
            matrixStem: "chōca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
            embedPossessorReferenceId: "owner-1sg",
            embedConstituent: {
                kind: "ordinary-nnc", stem: "mā", resultFrame: subjectEmbed,
            },
            matrixConstituent: {
                kind: "vnc-result", stem: "chōca",
                resultFrame: intransitiveMatrix.resultFrame,
            },
        },
    }));
    const nonpossessiveSupplement = evaluate(request({
        route: "supplement-subject",
        adverbRole: "means",
        source: { embedStem: "mā", matrixStem: "chōca", matrixVerbClass: "A" },
    }));
    const transitiveSupplementSubject = evaluate(request({
        route: "supplement-subject",
        adverbRole: "means",
        source: {
            embedStem: "mā", matrixStem: "chihua", matrixVerbClass: "B",
            matrixValence: "single-object", embedState: "possessive",
            embedPossessorPerson: "1sg", objectReferenceIds: ["patient"],
        },
    }));

    const objectEmbed = possessiveNnc(ctx, "cac", "2sg");
    const transitiveMatrix = matrixVnc(ctx, "chihua", "B", "single-object", "3sg");
    const supplementObjectBase = {
        route: "supplement-object",
        adverbRole: "means",
        source: {
            embedStem: "cac",
            matrixStem: "chihua",
            matrixVerbClass: "B",
            matrixValence: "single-object",
            objectReferenceIds: ["supplement-nnc"],
            embedPossessorReferenceId: "owner-2sg",
            embedConstituent: {
                kind: "ordinary-nnc", stem: "cac", resultFrame: objectEmbed,
            },
            matrixConstituent: {
                kind: "vnc-result", stem: "chihua",
                resultFrame: transitiveMatrix.resultFrame,
            },
        },
    };
    const supplementObject = evaluate(request(supplementObjectBase));
    const sameStemApplicativeBlocked = evaluate(request({
        ...supplementObjectBase,
        source: {
            ...supplementObjectBase.source,
            matrixDerivationType: "applicative",
            matrixConstituent: undefined,
        },
    }));
    const lessIntimateApplicative = evaluate(request({
        ...supplementObjectBase,
        source: {
            ...supplementObjectBase.source,
            matrixDerivationType: "applicative",
            embedConstituent: undefined,
            matrixConstituent: undefined,
            embedState: "possessive",
            embedPossessorPerson: "2sg",
        },
        possessionKind: "less-intimate",
        source: {
            ...supplementObjectBase.source,
            matrixDerivationType: "applicative",
            embedConstituent: undefined,
            matrixConstituent: undefined,
            embedState: "possessive",
            embedPossessorPerson: "2sg",
            possessionKind: "less-intimate",
        },
    }));
    const passive = evaluate(request({
        route: "passive-adverbialized-subject",
        adverbRole: "means",
        voice: "passive",
        source: {
            embedStem: "xīcoh",
            matrixStem: "chihua",
            matrixVerbClass: "B",
            matrixValence: "single-object",
            objectPerson: "2sg",
            subjectReferenceId: "active-actor",
            objectReferenceIds: ["active-patient"],
        },
    }));
    const passiveWithActiveTarget = evaluate(request({
        route: "passive-adverbialized-subject",
        adverbRole: "means",
        source: {
            embedStem: "xīcoh", matrixStem: "chihua", matrixVerbClass: "B",
            matrixValence: "single-object", objectPerson: "2sg",
            objectReferenceIds: ["active-patient"],
        },
    }));
    const passiveFromIntransitive = evaluate(request({
        route: "passive-adverbialized-subject",
        adverbRole: "means",
        voice: "passive",
        source: { embedStem: "xīcoh", matrixStem: "tōna", matrixVerbClass: "B" },
    }));

    s.eq("unique lexical analysis enriches but never authorizes the productive route", {
        known: [knownUnique.authorizationStatus,
            operation(knownUnique).uniqueEmbedAnalysisFrame?.lexicalStatus,
            operation(knownUnique).uniqueEmbedAnalysisFrame?.meaningCertainty],
        typed: [typedUnique.authorizationStatus,
            operation(typedUnique).uniqueEmbedAnalysisFrame?.sourceStem,
            operation(typedUnique).uniqueEmbedAnalysisFrame?.historicalSource,
            operation(typedUnique).uniqueEmbedAnalysisFrame?.productiveRouteAuthority],
        productive: [sameStemProductive.authorizationStatus,
            operation(sameStemProductive).uniqueEmbedAnalysisFrame],
        mismatch: [mismatchedUnique.authorizationStatus, mismatchedUnique.blockReason],
        initialI: [operation(ihSupportive).uniqueEmbedAnalysisFrame?.selectedInitialIAnalysis,
            operation(ihReduplicated).uniqueEmbedAnalysisFrame?.selectedInitialIAnalysis,
            operation(ihReduplicated).uniqueEmbedAnalysisFrame?.reduplicationForcesRealInitialVowel],
        continuation: [uniqueContinuation?.sourceStem,
            uniqueContinuation?.sourceValence,
            uniqueContinuation?.grammarAuthority],
    }, {
        known: ["authorized", "unique-incorporated-nounstem", "uncertain"],
        typed: ["authorized", "zax-invented", "zan-a-ni", false],
        productive: ["authorized", null],
        mismatch: ["blocked", "typed-unique-embed-analysis-mismatch"],
        initialI: ["supportive", "real", true],
        continuation: ["zax-invented-cahu-a-ca", "intransitive", false],
    });

    s.eq("supplementary-subject transformation promotes the captured possessor", {
        source: [subjectEmbed.authorizationStatus, intransitiveMatrix.authorizationStatus],
        result: [supplementSubject.authorizationStatus, supplementSubject.blockReason,
            operation(supplementSubject).route,
            operation(supplementSubject).sourceMatrixSubject,
            operation(supplementSubject).targetMatrixSubject,
            operation(supplementSubject).supplementTransformationFrame?.sourceRole,
            operation(supplementSubject).supplementTransformationFrame?.targetPossessorCase,
            operation(supplementSubject).supplementTransformationFrame?.targetRole,
            operation(supplementSubject).supplementTransformationFrame?.sourceCapturedFromOwnerResult,
            operation(supplementSubject).possessorReferenceFrame?.possessorRepresentation,
            operation(supplementSubject).valenceChanged],
        blocked: [nonpossessiveSupplement.blockReason,
            transitiveSupplementSubject.blockReason],
    }, {
        source: ["authorized", "authorized"],
        result: ["authorized", "", "supplement-subject", "3sg", "1sg",
            "supplementary-subject", "nominative", "matrix-subject", true,
            "promoted-to-matrix-subject", false],
        blocked: ["supplement-subject-embed-must-be-possessive",
            "supplement-subject-route-requires-intransitive-principal"],
    });

    s.eq("supplementary-object and passive transformations follow typed participants", {
        object: [supplementObject.authorizationStatus,
            operation(supplementObject).sourceObjectRequests[0]?.objectPerson,
            operation(supplementObject).targetObjectRequests[0]?.objectPerson,
            operation(supplementObject).supplementTransformationFrame?.targetPossessorCase,
            operation(supplementObject).supplementTransformationFrame?.sourceCapturedFromOwnerResult,
            operation(supplementObject).possessorReferenceFrame?.possessorRepresentation],
        applicative: [sameStemApplicativeBlocked.authorizationStatus,
            sameStemApplicativeBlocked.blockReason],
        imitation: [lessIntimateApplicative.authorizationStatus,
            operation(lessIntimateApplicative).supplementTransformationFrame?.possessionKind,
            operation(lessIntimateApplicative).supplementTransformationFrame?.matrixDerivationType],
        passive: [passive.authorizationStatus, passive.blockReason,
            operation(passive).selectedVoice,
            operation(passive).sourceMatrixSubject,
            operation(passive).targetMatrixSubject,
            operation(passive).supplementTransformationFrame?.activeBasicSubjectRepresentation,
            operation(passive).supplementTransformationFrame?.supplementarySubjectRepresentation,
            operation(passive).supplementTransformationFrame?.passiveAgentExpressible],
        blocked: [passiveWithActiveTarget.blockReason,
            passiveFromIntransitive.blockReason],
    }, {
        object: ["authorized", "3sg", "2sg", "objective", true,
            "promoted-to-matrix-object"],
        applicative: ["blocked", "intimate-supplement-object-applicative-source-blocked"],
        imitation: ["authorized", "less-intimate", "applicative"],
        passive: ["authorized", "", "passive", "3sg", "2sg", "discarded",
            "incorporated-adverb", false],
        blocked: ["passive-adverbialized-subject-requires-passive-target",
            "passive-adverbialized-subject-requires-transitive-active-source"],
    });

    const cues = [typedUnique, supplementSubject, supplementObject, passive].flatMap(frame =>
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.resultFrame?.typedSlotFrame
                || frame.canonicalResult?.finalTypedVncSlotFrame
                || frame.canonicalResult?.typedSlotFrame,
            frame,
        )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all accepted Group 10-12 atoms have exact writing and clickable-cue routes", {
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
    }, { records: 328, writing: 181, groups: 3, cueGroups: 3, covered: true });
    s.ok("the live nominal-embedding result sends formulas through clickable cues",
        RENDERING_SOURCE.includes("renderClassicalFormulaDerivedAnnotations(\n        linearFormula,")
        && RENDERING_SOURCE.includes("nominalConstructionTypedSlotFrame,\n        frame,"));

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [operation(typedUnique).uniqueEmbedAnalysisFrame?.lexicalStatus,
                operation(typedUnique).uniqueEmbedAnalysisFrame?.sourceStem,
                operation(typedUnique).compoundStem]
            : record.reviewGroupId === GROUPS[1]
                ? [operation(supplementSubject).supplementTransformationFrame?.sourceRole,
                    operation(supplementSubject).targetMatrixSubject,
                    operation(supplementSubject).targetValencePositionCount]
                : [operation(supplementObject).supplementTransformationFrame?.sourceRole,
                    operation(supplementObject).targetObjectRequests[0]?.objectPerson,
                    operation(supplementObject).targetValencePositionCount];
        const expected = record.reviewGroupId === GROUPS[0]
            ? ["unique-incorporated-nounstem", "zax-invented", "zax-invented-cahu-a-ca"]
            : record.reviewGroupId === GROUPS[1]
                ? ["supplementary-subject", "1sg", 0]
                : ["supplementary-object", "2sg", 1];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`, observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that canonical Result`,
            record.reviewGroupId === GROUPS[0]
                ? mismatchedUnique.authorizationStatus === "blocked"
                : record.reviewGroupId === GROUPS[1]
                    ? transitiveSupplementSubject.authorizationStatus === "blocked"
                    : sameStemApplicativeBlocked.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
