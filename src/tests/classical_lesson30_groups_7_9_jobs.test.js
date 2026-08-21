"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson30-place-adverbs",
    "lesson30-time-duration-cause-and-purpose-adverbs",
    "lesson30-manner-and-compared-manner-adverbs",
];

function adverbRequest(adverbRole, matrixValence = "single-object", overrides = {}) {
    return {
        constructionKind: "nominal-embed-vnc",
        relation: "adverb",
        route: "direct-adverb",
        adverbRole,
        source: {
            embedStem: "cal-tlan",
            matrixStem: "pach-i-hui",
            matrixVerbClass: "C",
            matrixValence,
            subjectReferenceId: "actor",
            objectReferenceIds: matrixValence === "intransitive" ? [] : ["patient"],
            ...overrides.source,
        },
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        outputKind: "single",
        ...overrides,
        source: {
            embedStem: "cal-tlan",
            matrixStem: "pach-i-hui",
            matrixVerbClass: "C",
            matrixValence,
            subjectReferenceId: "actor",
            objectReferenceIds: matrixValence === "intransitive" ? [] : ["patient"],
            ...overrides.source,
        },
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson30_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson30-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => GROUPS.includes(record.reviewGroupId));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = request => ctx.evaluateClassicalNahuatlNominalConstruction(request);
    const operation = frame => frame.operationFrame || {};

    const compoundNnc = evaluate({
        constructionKind: "compound-nnc",
        source: { embedStem: "ā", embedClass: "tl", matrixStem: "cal", matrixClass: "tli" },
        structure: "integrated",
        embedRole: "association",
        possessorOrientation: "matrix",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
    const compoundStem = operation(compoundNnc).compoundStem;
    const place = evaluate(adverbRequest("place", "single-object", {
        source: {
            embedStem: compoundStem,
            embedConstituent: {
                kind: "compound-nnc",
                stem: compoundStem,
                resultFrame: compoundNnc,
            },
            possessorReferenceCandidates: ["actor"],
        },
    }));
    const placeOutsider = evaluate(adverbRequest("place", "single-object", {
        source: { possessorReferenceCandidates: ["outsider"] },
    }));
    const placeAmbiguous = evaluate(adverbRequest("place", "single-object", {
        source: { possessorReferenceCandidates: ["actor", "patient"] },
    }));
    const inventedPlace = evaluate(adverbRequest("place", "single-object", {
        source: { embedStem: "tzāl-nepan-invented", matrixStem: "nel-o-a" },
    }));

    const duration = evaluate(adverbRequest("duration"));
    const purpose = evaluate(adverbRequest("purpose"));
    const temporalAmbiguous = evaluate(adverbRequest("", "single-object", {
        source: { adverbRoleCandidates: ["time", "duration"] },
    }));
    const chosenTime = evaluate(adverbRequest("time", "single-object", {
        source: { adverbRoleCandidates: ["time", "duration"] },
    }));
    const changedTemporalStem = evaluate(adverbRequest("duration", "single-object", {
        source: { embedStem: "xih-invented", matrixStem: "itt-ī-hua" },
    }));

    const ordinaryManner = evaluate(adverbRequest("manner", "single-object"));
    const ordinaryFormStyle = evaluate(adverbRequest("form-style", "single-object"));
    const intransitiveComparison = evaluate(adverbRequest("compared-manner", "intransitive"));
    const badIntransitiveComparison = evaluate(adverbRequest("compared-manner", "intransitive", {
        orientation: "object",
    }));
    const transitiveUnresolved = evaluate(adverbRequest("compared-manner", "single-object", {
        orientation: "",
    }));
    const subjectComparison = evaluate(adverbRequest("compared-manner", "single-object", {
        orientation: "subject",
    }));
    const objectComparison = evaluate(adverbRequest("compared-manner", "single-object", {
        orientation: "object",
    }));
    const uniqueObjectComparison = evaluate(adverbRequest("compared-manner", "single-object", {
        orientation: "",
        source: { comparisonTargetCandidates: ["object"] },
    }));
    const roleAmbiguous = evaluate(adverbRequest("", "single-object", {
        source: { adverbRoleCandidates: ["cause", "compared-manner"] },
    }));
    const chosenCause = evaluate(adverbRequest("cause", "single-object", {
        source: { adverbRoleCandidates: ["cause", "compared-manner"] },
    }));

    s.eq("place accepts a captured compound NNC and derives possession from identity", {
        compound: [compoundNnc.authorizationStatus, compoundStem],
        place: [place.authorizationStatus,
            place.sourceAuthorizationFrame?.lexicalFacts?.compoundNncEmbed,
            place.sourceAuthorizationFrame?.sourceConstituents?.embedConstituent?.kind,
            operation(place).semanticRole,
            operation(place).embedInternalBoundaries,
            operation(place).possessorReferenceFrame?.possessorRepresentation,
            operation(place).sourceValencePositionCount,
            operation(place).targetValencePositionCount],
        outsider: operation(placeOutsider).possessorReferenceFrame?.possessorRepresentation,
        ambiguous: [placeAmbiguous.authorizationStatus, placeAmbiguous.blockReason],
        invented: [inventedPlace.authorizationStatus,
            operation(inventedPlace).embedShape?.sourceStem,
            operation(inventedPlace).targetValencePositionCount],
    }, {
        compound: ["authorized", "ā-cal"],
        place: ["authorized", true, "compound-nnc", "place", ["ā", "cal"],
            "deleted-as-coreferential", 1, 1],
        outsider: "preserved-as-noncoreferential",
        ambiguous: ["blocked", "incorporated-adverb-possessor-reference-choice-required"],
        invented: ["authorized", "tzāl-nepan-invented", 1],
    });

    s.eq("time, duration, cause, and purpose use typed scope without lexical gates", {
        duration: [duration.authorizationStatus, operation(duration).adverbScopeFrame?.scope,
            operation(duration).valenceChanged],
        purpose: [purpose.authorizationStatus,
            operation(purpose).adverbScopeFrame?.contextualReadings,
            operation(purpose).adverbScopeFrame?.translationAuthority],
        ambiguous: [temporalAmbiguous.authorizationStatus, temporalAmbiguous.blockReason],
        chosen: [chosenTime.authorizationStatus, operation(chosenTime).semanticRole,
            operation(chosenTime).semanticRoleChoiceRequired],
        changedStem: [changedTemporalStem.authorizationStatus,
            operation(changedTemporalStem).embedShape?.sourceStem,
            operation(changedTemporalStem).adverbScopeFrame?.scope],
    }, {
        duration: ["authorized", "temporal-extent", false],
        purpose: ["authorized", ["purpose", "lack-purpose"], false],
        ambiguous: ["blocked", "incorporated-adverb-role-choice-required"],
        chosen: ["authorized", "time", true],
        changedStem: ["authorized", "xih-invented", "temporal-extent"],
    });

    s.eq("comparison target follows valence and appears only for real ambiguity", {
        ordinary: [ordinaryManner.authorizationStatus, operation(ordinaryManner).orientation,
            ordinaryFormStyle.authorizationStatus, operation(ordinaryFormStyle).adverbSourceStructure],
        intransitive: [intransitiveComparison.authorizationStatus,
            operation(intransitiveComparison).orientation,
            operation(intransitiveComparison).adverbScopeFrame?.comparisonTargetChoiceRequired],
        badIntransitive: [badIntransitiveComparison.authorizationStatus,
            badIntransitiveComparison.blockReason],
        unresolved: [transitiveUnresolved.authorizationStatus, transitiveUnresolved.blockReason],
        subject: [subjectComparison.authorizationStatus,
            operation(subjectComparison).adverbScopeFrame?.comparisonTarget],
        object: [objectComparison.authorizationStatus,
            operation(objectComparison).adverbScopeFrame?.comparisonTarget],
        unique: [uniqueObjectComparison.authorizationStatus,
            operation(uniqueObjectComparison).orientation,
            operation(uniqueObjectComparison).adverbScopeFrame?.comparisonTargetChoiceRequired],
        roleAmbiguous: [roleAmbiguous.authorizationStatus, roleAmbiguous.blockReason],
        cause: [chosenCause.authorizationStatus, operation(chosenCause).semanticRole,
            operation(chosenCause).semanticRoleChoiceRequired],
    }, {
        ordinary: ["authorized", "not-applicable", "authorized", "ordinary-adverbial"],
        intransitive: ["authorized", "subject", false],
        badIntransitive: ["blocked", "intransitive-compared-manner-requires-subject-orientation"],
        unresolved: ["blocked", "compared-manner-target-choice-required"],
        subject: ["authorized", "subject"],
        object: ["authorized", "object"],
        unique: ["authorized", "object", false],
        roleAmbiguous: ["blocked", "incorporated-adverb-role-choice-required"],
        cause: ["authorized", "cause", true],
    });

    const cues = [place, duration, intransitiveComparison].flatMap(frame =>
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.resultFrame?.typedSlotFrame
                || frame.canonicalResult?.finalTypedVncSlotFrame
                || frame.canonicalResult?.typedSlotFrame,
            frame,
        )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all accepted Group 7-9 atoms have exact writing and clickable-cue routes", {
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
    }, { records: 234, writing: 116, groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [operation(place).semanticRole, operation(place).embedInternalBoundaries,
                operation(place).possessorReferenceFrame?.possessorRepresentation,
                operation(place).targetValencePositionCount]
            : record.reviewGroupId === GROUPS[1]
                ? [operation(duration).semanticRole, operation(duration).adverbScopeFrame?.scope,
                    operation(duration).targetValencePositionCount]
                : [operation(intransitiveComparison).semanticRole,
                    operation(intransitiveComparison).orientation,
                    operation(intransitiveComparison).targetValencePositionCount];
        const expected = record.reviewGroupId === GROUPS[0]
            ? ["place", ["ā", "cal"], "deleted-as-coreferential", 1]
            : record.reviewGroupId === GROUPS[1]
                ? ["duration", "temporal-extent", 1]
                : ["compared-manner", "subject", 0];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`, observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that canonical Result`,
            record.reviewGroupId === GROUPS[0]
                ? operation(placeOutsider).possessorReferenceFrame?.possessorRepresentation
                    !== operation(place).possessorReferenceFrame?.possessorRepresentation
                : record.reviewGroupId === GROUPS[1]
                    ? temporalAmbiguous.authorizationStatus === "blocked"
                    : badIntransitiveComparison.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
