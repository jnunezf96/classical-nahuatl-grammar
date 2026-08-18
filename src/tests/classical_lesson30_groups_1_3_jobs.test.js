"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson30-nominal-embed-foundation-and-object-valence",
    "lesson30-single-object-incorporation",
    "lesson30-higher-valence-object-incorporation",
];

function objectRequest(matrixValence = "single-object", overrides = {}) {
    return {
        constructionKind: "nominal-embed-vnc",
        relation: "object",
        route: "object",
        source: {
            embedStem: "xō-chi",
            embedClass: "zero",
            matrixStem: "tēm-o-a",
            matrixVerbClass: "C",
            matrixValence,
            ...overrides.source,
        },
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        outputKind: "single",
        ...overrides,
        source: {
            embedStem: "xō-chi",
            embedClass: "zero",
            matrixStem: "tēm-o-a",
            matrixVerbClass: "C",
            matrixValence,
            ...overrides.source,
        },
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson30_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson30-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => GROUPS.includes(record.reviewGroupId));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = request => ctx.evaluateClassicalNahuatlNominalConstruction(request);
    const nncSource = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "xō-chi", sourceClass: "zero",
    });
    const nncOperation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        nncSource, { state: "absolutive", subject: "3sg" });
    const nncResult = ctx.requestClassicalOrdinaryNncResult(nncSource, nncOperation);
    const matrixApplication = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "tēm-o-a", verbClass: "C",
        sourceValence: "specific-projective", objectPerson: "3sg",
        subject: "1sg", mood: "indicative", tense: "present",
        requestedVoice: "active", outputScope: "single",
    });
    const captured = evaluate(objectRequest("single-object", {
        source: {
            embedConstituent: {
                kind: "ordinary-nnc", stem: "xō-chi", resultFrame: nncResult,
            },
            matrixConstituent: {
                kind: "vnc-result", stem: "tēm-o-a",
                resultFrame: matrixApplication.resultFrame,
            },
        },
    }));
    const single = evaluate(objectRequest());
    const double = evaluate(objectRequest("double-object"));
    const triple = evaluate(objectRequest("triple-object"));
    const arbitrary = evaluate(objectRequest("single-object", {
        source: { embedStem: "tzīl-invented", matrixStem: "pach-i-hui" },
    }));
    const impossible = evaluate(objectRequest("intransitive"));
    const passive = evaluate(objectRequest("single-object", { voice: "passive" }));
    const ambiguous = evaluate(objectRequest("double-object", {
        source: {
            incorporatedObjectCandidateIds: ["source-object-1", "source-object-2"],
        },
    }));
    const selectedAmbiguous = evaluate(objectRequest("double-object", {
        incorporatedObjectId: "source-object-2",
        source: {
            incorporatedObjectCandidateIds: ["source-object-1", "source-object-2"],
        },
    }));
    const operation = frame => frame.operationFrame || {};
    const cues = [single, double].flatMap(frame => ctx.getClassicalFormulaDerivedAnnotations(
        frame.formulaRealization,
        frame.canonicalResult?.resultFrame?.typedSlotFrame
            || frame.canonicalResult?.finalTypedVncSlotFrame
            || frame.canonicalResult?.typedSlotFrame,
        frame,
    )).filter(cue => GROUPS.includes(cue.role));
    const continuation = ctx.getClassicalNahuatlVncContinuationSourceConstituents(
        single.canonicalResult?.resultFrame || single.canonicalResult,
    );

    s.eq("one productive nominal-embed owner derives relation, boundary, and exact valence", {
        captured: [captured.authorizationStatus,
            captured.sourceAuthorizationFrame?.lexicalFacts?.ordinaryNncEmbed,
            captured.sourceAuthorizationFrame?.lexicalFacts?.matrixResultCaptured,
            captured.sourceAuthorizationFrame?.sourceConstituents?.embedConstituent?.kind,
            captured.sourceAuthorizationFrame?.sourceConstituents?.matrixConstituent?.kind],
        single: [single.authorizationStatus, operation(single).relation,
            operation(single).compoundStem, operation(single).sourceValencePositionCount,
            operation(single).targetValencePositionCount, operation(single).targetSourceValence,
            operation(single).incorporatedObjectId, operation(single).remainingObjectIds],
        double: [double.authorizationStatus, operation(double).sourceValencePositionCount,
            operation(double).targetValencePositionCount, operation(double).incorporatedObjectId,
            operation(double).remainingObjectIds,
            operation(double).targetObjectRequests.map(request => [request.governor,
                request.derivationalLevel, request.sourceGovernor, request.sourceDerivationalLevel])],
        triple: [triple.authorizationStatus, operation(triple).sourceValencePositionCount,
            operation(triple).targetValencePositionCount, operation(triple).incorporatedObjectId,
            operation(triple).remainingObjectIds,
            operation(triple).targetObjectRequests.map(request => [request.governor,
                request.derivationalLevel, request.sourceGovernor, request.sourceDerivationalLevel])],
    }, {
        captured: ["authorized", true, true, "ordinary-nnc", "vnc-result"],
        single: ["authorized", "object", "xō-chi-tēm-o-a", 1, 0, "intransitive",
            "source-object-1", []],
        double: ["authorized", 2, 1, "source-object-1", ["source-object-2"],
            [["directive", 1, "applicative", 2]]],
        triple: ["authorized", 3, 2, "source-object-1",
            ["source-object-2", "source-object-3"],
            [["directive", 1, "applicative", 2], ["causative", 2, "causative", 3]]],
    });
    s.eq("typed compatibility decides automatic role selection and genuine ambiguity", {
        openSource: [arbitrary.authorizationStatus,
            operation(arbitrary).embedShape?.sourceStem, operation(arbitrary).compoundStem],
        blocked: [impossible.authorizationStatus, impossible.blockReason,
            passive.authorizationStatus, passive.blockReason],
        ambiguous: [ambiguous.authorizationStatus, ambiguous.blockReason],
        selected: [selectedAmbiguous.authorizationStatus,
            operation(selectedAmbiguous).incorporatedObjectId,
            operation(selectedAmbiguous).remainingObjectIds,
            operation(selectedAmbiguous).incorporatedObjectRoleChoiceRequired],
    }, {
        openSource: ["authorized", "tzīl-invented", "tzīl-invented-pach-i-hui"],
        blocked: ["blocked", "incorporated-object-requires-transitive-matrix",
            "blocked", "incorporated-object-from-single-object-matrix-cannot-passivize"],
        ambiguous: ["blocked", "incorporated-object-role-choice-required"],
        selected: ["authorized", "source-object-2", ["source-object-1"], true],
    });
    s.eq("single-object Result has no object carrier and remains canonical continuation Source", {
        targetRequests: operation(single).targetObjectRequests.length,
        canonical: ctx.isClassicalNahuatlNominalConstructionResult(single),
        continuation: [continuation?.kind, continuation?.sourceStem,
            continuation?.sourceValence, continuation?.sourceObjectRequests?.length,
            continuation?.grammarAuthority, continuation?.callerSuppliedAuthorityAccepted],
    }, {
        targetRequests: 0,
        canonical: true,
        continuation: ["classical-nahuatl-vnc-result-source-constituent-projection",
            "xō-chi-tēm-o-a", "intransitive", 0, false, false],
    });
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
    }, { records: 148, writing: 83, groups: 3, cueGroups: 3, covered: true });
    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [operation(single).embedShape?.realizedStem, operation(single).compoundStem,
                operation(single).sourceValencePositionCount, operation(single).targetValencePositionCount]
            : record.reviewGroupId === GROUPS[1]
                ? [operation(single).incorporatedObjectId, operation(single).targetObjectRequests.length,
                    operation(single).targetSourceValence]
                : [operation(triple).incorporatedObjectId,
                    operation(triple).remainingObjectIds,
                    operation(triple).targetValencePositionCount];
        const expected = record.reviewGroupId === GROUPS[0]
            ? ["xō-chi", "xō-chi-tēm-o-a", 1, 0]
            : record.reviewGroupId === GROUPS[1]
                ? ["source-object-1", 0, "intransitive"]
                : ["source-object-1", ["source-object-2", "source-object-3"], 2];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`, observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that canonical Result`,
            record.reviewGroupId === GROUPS[0]
                ? impossible.authorizationStatus === "blocked"
                : record.reviewGroupId === GROUPS[1]
                    ? passive.authorizationStatus === "blocked"
                    : operation(selectedAmbiguous).incorporatedObjectId
                        !== operation(triple).incorporatedObjectId);
    }
    return s;
}

module.exports = { run };
