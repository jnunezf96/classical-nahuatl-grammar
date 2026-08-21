"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson30-exceptional-tla-fusion-and-source-ambiguity",
    "lesson30-incorporated-adverb-foundation",
    "lesson30-means-and-instrument-adverbs",
];

function adverbRequest(overrides = {}) {
    return {
        constructionKind: "nominal-embed-vnc",
        relation: "adverb",
        route: "direct-adverb",
        adverbRole: "means",
        source: {
            embedStem: "zāl-invented",
            embedClass: "zero",
            matrixStem: "nel-o-a",
            matrixVerbClass: "C",
            matrixValence: "single-object",
            subjectReferenceId: "actor",
            objectReferenceIds: ["patient"],
            ...overrides.source,
        },
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        outputKind: "single",
        ...overrides,
        source: {
            embedStem: "zāl-invented",
            embedClass: "zero",
            matrixStem: "nel-o-a",
            matrixVerbClass: "C",
            matrixValence: "single-object",
            subjectReferenceId: "actor",
            objectReferenceIds: ["patient"],
            ...overrides.source,
        },
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson30_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson30-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => GROUPS.includes(record.reviewGroupId));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = request => ctx.evaluateClassicalNahuatlNominalConstruction(request);
    const operation = frame => frame.operationFrame || {};

    const exceptional = evaluate(adverbRequest({
        adverbRole: "form-style",
        source: {
            embedStem: "ā",
            matrixStem: "tla-cui",
            matrixVerbClass: "B",
            matrixValence: "intransitive",
            adverbSourceStructure: "exceptional-tla-fusion",
            subjectReferenceId: "actor",
            objectReferenceIds: [],
        },
    }));
    const inventedExceptional = evaluate(adverbRequest({
        adverbRole: "form-style",
        source: {
            embedStem: "tzāl-invented",
            matrixStem: "tla-tōna",
            matrixVerbClass: "B",
            matrixValence: "intransitive",
            adverbSourceStructure: "exceptional-tla-fusion",
            subjectReferenceId: "actor",
            objectReferenceIds: [],
        },
    }));
    const notFused = evaluate(adverbRequest({
        adverbRole: "form-style",
        source: {
            matrixStem: "mec-a",
            matrixValence: "intransitive",
            adverbSourceStructure: "exceptional-tla-fusion",
        },
    }));
    const ambiguousRole = evaluate(adverbRequest({
        adverbRole: "",
        source: {
            matrixStem: "tla-tōna",
            matrixValence: "intransitive",
            adverbSourceStructure: "exceptional-tla-fusion",
            adverbRoleCandidates: ["form-style", "means"],
        },
    }));
    const chosenMeans = evaluate(adverbRequest({
        adverbRole: "means",
        source: {
            matrixStem: "tla-tōna",
            matrixValence: "intransitive",
            objectReferenceIds: [],
            adverbRoleCandidates: ["form-style", "means"],
        },
    }));

    const directOnly = evaluate(adverbRequest({
        route: "",
        source: {
            matrixStem: "tōna",
            matrixVerbClass: "B",
            matrixValence: "intransitive",
            objectReferenceIds: [],
            adverbSourceRouteCandidates: ["direct-adverb"],
        },
    }));
    const ambiguousRoute = evaluate(adverbRequest({
        route: "",
        source: {
            adverbSourceRouteCandidates: ["direct-adverb", "supplement-subject"],
        },
    }));
    const chosenDirect = evaluate(adverbRequest({
        source: {
            adverbSourceRouteCandidates: ["direct-adverb", "supplement-subject"],
        },
    }));

    const coreferential = evaluate(adverbRequest({
        adverbRole: "instrument",
        source: { possessorReferenceCandidates: ["actor"] },
    }));
    const noncoreferential = evaluate(adverbRequest({
        adverbRole: "instrument",
        source: { possessorReferenceCandidates: ["outsider"] },
    }));
    const ambiguousReferent = evaluate(adverbRequest({
        adverbRole: "instrument",
        source: { possessorReferenceCandidates: ["actor", "patient"] },
    }));
    const chosenReferent = evaluate(adverbRequest({
        adverbRole: "instrument",
        possessorReferenceId: "patient",
        source: { possessorReferenceCandidates: ["actor", "patient"] },
    }));
    const changedStemSameGrammar = evaluate(adverbRequest({
        adverbRole: "instrument",
        source: {
            embedStem: "nēx-invented",
            possessorReferenceCandidates: ["actor"],
        },
    }));

    s.eq("structural tla fusion licenses the exceptional analysis without a stem list", {
        witness: [exceptional.authorizationStatus, operation(exceptional).matrixTlaFusion,
            operation(exceptional).matrixFormation, operation(exceptional).semanticRole,
            operation(exceptional).sourceValencePositionCount,
            operation(exceptional).targetValencePositionCount],
        invented: [inventedExceptional.authorizationStatus,
            operation(inventedExceptional).compoundStem,
            operation(inventedExceptional).matrixTlaFusion],
        rejected: [notFused.authorizationStatus, notFused.blockReason],
        ambiguous: [ambiguousRole.authorizationStatus, ambiguousRole.blockReason],
        chosen: [chosenMeans.authorizationStatus, operation(chosenMeans).semanticRole,
            operation(chosenMeans).semanticRoleChoiceRequired],
    }, {
        witness: ["authorized", true, "tla-fused-intransitive", "form-style", 0, 0],
        invented: ["authorized", "tzāl-invented-tla-tōna", true],
        rejected: ["blocked", "form-style-adverb-requires-intransitive-tla-fused-matrix"],
        ambiguous: ["blocked", "incorporated-adverb-role-choice-required"],
        chosen: ["authorized", "means", true],
    });

    s.eq("incorporated adverbs preserve valence and distinct typed Source histories", {
        direct: [directOnly.authorizationStatus, operation(directOnly).route,
            operation(directOnly).sourceRouteChoiceRequired,
            operation(directOnly).sourceValencePositionCount,
            operation(directOnly).targetValencePositionCount,
            operation(directOnly).valenceChanged],
        ambiguous: [ambiguousRoute.authorizationStatus, ambiguousRoute.blockReason],
        chosen: [chosenDirect.authorizationStatus, operation(chosenDirect).route,
            operation(chosenDirect).sourceRouteCandidates,
            operation(chosenDirect).sourceRouteChoiceRequired],
    }, {
        direct: ["authorized", "direct-adverb", false, 0, 0, false],
        ambiguous: ["blocked", "incorporated-adverb-source-route-choice-required"],
        chosen: ["authorized", "direct-adverb",
            ["direct-adverb", "supplement-subject"], true],
    });

    s.eq("means and instrument deletion follows referent identity, never noun identity", {
        coreferential: [coreferential.authorizationStatus,
            operation(coreferential).possessorReferenceFrame?.possessorReferenceId,
            operation(coreferential).possessorReferenceFrame?.referenceIdentityUnified,
            operation(coreferential).possessorReferenceFrame?.possessorRepresentation,
            operation(coreferential).targetValencePositionCount,
            operation(coreferential).embedIsGrammaticalSubject,
            operation(coreferential).embedIsAgent],
        noncoreferential: [noncoreferential.authorizationStatus,
            operation(noncoreferential).possessorReferenceFrame?.referenceIdentityUnified,
            operation(noncoreferential).possessorReferenceFrame?.possessorRepresentation],
        ambiguous: [ambiguousReferent.authorizationStatus, ambiguousReferent.blockReason],
        chosen: [chosenReferent.authorizationStatus,
            operation(chosenReferent).possessorReferenceFrame?.possessorReferenceId,
            operation(chosenReferent).possessorReferenceFrame?.possessorRepresentation],
        changedStem: [changedStemSameGrammar.authorizationStatus,
            operation(changedStemSameGrammar).embedShape?.sourceStem,
            operation(changedStemSameGrammar).possessorReferenceFrame?.possessorRepresentation],
    }, {
        coreferential: ["authorized", "actor", true, "deleted-as-coreferential", 1, false, false],
        noncoreferential: ["authorized", false, "preserved-as-noncoreferential"],
        ambiguous: ["blocked", "incorporated-adverb-possessor-reference-choice-required"],
        chosen: ["authorized", "patient", "deleted-as-coreferential"],
        changedStem: ["authorized", "nēx-invented", "deleted-as-coreferential"],
    });

    const cues = [exceptional, chosenDirect, coreferential].flatMap(frame =>
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.resultFrame?.typedSlotFrame
                || frame.canonicalResult?.finalTypedVncSlotFrame
                || frame.canonicalResult?.typedSlotFrame,
            frame,
        )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all accepted Group 4-6 atoms have exact writing and clickable-cue routes", {
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
    }, { records: 133, writing: 76, groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [operation(exceptional).matrixFormation,
                operation(exceptional).semanticRole,
                operation(exceptional).targetValencePositionCount]
            : record.reviewGroupId === GROUPS[1]
                ? [operation(chosenDirect).route,
                    operation(chosenDirect).sourceRouteCandidates,
                    operation(chosenDirect).valenceChanged]
                : [operation(coreferential).semanticRole,
                    operation(coreferential).possessorReferenceFrame?.possessorRepresentation,
                    operation(coreferential).targetValencePositionCount];
        const expected = record.reviewGroupId === GROUPS[0]
            ? ["tla-fused-intransitive", "form-style", 0]
            : record.reviewGroupId === GROUPS[1]
                ? ["direct-adverb", ["direct-adverb", "supplement-subject"], false]
                : ["instrument", "deleted-as-coreferential", 1];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`, observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that canonical Result`,
            record.reviewGroupId === GROUPS[0]
                ? notFused.authorizationStatus === "blocked"
                : record.reviewGroupId === GROUPS[1]
                    ? ambiguousRoute.authorizationStatus === "blocked"
                    : operation(noncoreferential).possessorReferenceFrame?.possessorRepresentation
                        !== operation(coreferential).possessorReferenceFrame?.possessorRepresentation);
    }
    return s;
}

module.exports = { run };
