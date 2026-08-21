"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson31-progeny-and-fellowship-compounds",
    "lesson31-affinity-reduplication-scope",
    "lesson31-distributive-varietal-reduplication",
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

function affinityAnalysis(embedStem, matrixStem, availableTargets,
    lexicalRequirement = "optional") {
    return {
        lexicalStatus: "compound-affinity-scope",
        embedStem,
        matrixStem,
        availableTargets,
        lexicalRequirement,
    };
}

function distributiveAnalysis(semanticReading, contextDecides) {
    return {
        lexicalStatus: "compound-distributive-varietal-reading",
        semanticReading,
        contextDecides,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson31_groups_13_15_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson31-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = value => ctx.evaluateClassicalNahuatlNominalConstruction(
        value);
    const operation = frame => frame.operationFrame || {};

    const openProgeny = evaluate(request({
        embedStem: "zaca", embedClass: "tl-1-a",
        embedSourceClass: "tl-1-a", matrixStem: "conē",
        matrixClass: "zero", matrixSourceClass: "zero",
    }, { embedRole: "progeny" }));
    const animalSynonym = evaluate(request({
        embedStem: "chīl", embedClass: "tli-1",
        embedSourceClass: "tli-1", matrixStem: "pil-tōn",
        matrixClass: "zero", matrixSourceClass: "zero",
    }, { embedRole: "progeny" }));
    const wrongProgenyMatrix = evaluate(request({}, {
        embedRole: "progeny",
    }));
    const fellowship = evaluate(request({
        embedStem: "zaca", embedClass: "tl-1-a",
        embedSourceClass: "tl-1-a", matrixStem: "poh",
        matrixClass: "zero", matrixSourceClass: "zero",
    }, {
        embedRole: "fellowship", state: "possessive", subject: "3pl",
        possessor: "2pl",
    }));
    const fellowshipAbsolutive = evaluate(request({
        matrixStem: "poh", matrixClass: "zero", matrixSourceClass: "zero",
    }, { embedRole: "fellowship" }));

    const affinity = evaluate(request({
        embedStem: "zaca", embedClass: "tl-1-a",
        embedSourceClass: "tl-1-a", matrixStem: "mox",
        matrixClass: "zero", matrixSourceClass: "zero",
        affinityScopeAnalysis: affinityAnalysis(
            "zaca", "mox", ["embed", "matrix"]),
    }, {
        subject: "3pl", reduplication: "affinity",
        reduplicationTarget: "matrix",
    }));
    const obligatoryBothAffinity = evaluate(request({
        affinityScopeAnalysis: affinityAnalysis(
            "zaca", "mox", ["both"], "obligatory"),
    }, {
        subject: "3pl", reduplication: "affinity",
        reduplicationTarget: "both",
    }));
    const singularAffinity = evaluate(request({
        affinityScopeAnalysis: affinityAnalysis(
            "zaca", "mox", ["embed"], "obligatory"),
    }, {
        reduplication: "affinity", reduplicationTarget: "embed",
    }));
    const unlicensedAffinityTarget = evaluate(request({
        affinityScopeAnalysis: affinityAnalysis(
            "zaca", "mox", ["embed"], "obligatory"),
    }, {
        subject: "3pl", reduplication: "affinity",
        reduplicationTarget: "matrix",
    }));

    const distribution = evaluate(request({
        embedStem: "mōl", embedClass: "zero", embedSourceClass: "zero",
        matrixStem: "caxi", matrixClass: "tli",
        matrixSourceClass: "tli-1",
        distributiveVarietalAnalysis: distributiveAnalysis(
            "distribution", true),
    }, { reduplication: "distributive-varietal" }));
    const unresolvedVariety = evaluate(request({
        embedStem: "cuez", embedClass: "zero", embedSourceClass: "zero",
        matrixStem: "coma", matrixClass: "tl",
        matrixSourceClass: "tl-1-a",
        distributiveVarietalAnalysis: distributiveAnalysis(
            "ambiguous", false),
    }, { reduplication: "distributive-varietal" }));
    const wrongDistributiveTarget = evaluate(request({
        distributiveVarietalAnalysis: distributiveAnalysis(
            "variety", true),
    }, {
        reduplication: "distributive-varietal",
        reduplicationTarget: "matrix",
    }));

    s.eq("progeny matrices keep their lexical meanings and open embeds", {
        cone: [openProgeny.authorizationStatus,
            operation(openProgeny).progenyRelationFrame?.matrixStem,
            operation(openProgeny).progenyRelationFrame?.humanParentNuance,
            operation(openProgeny).progenyRelationFrame
                ?.compatibleEmbedAdmission,
            operation(openProgeny).progenyRelationFrame
                ?.productiveRouteAuthority],
        pilton: [animalSynonym.authorizationStatus,
            operation(animalSynonym).progenyRelationFrame
                ?.semanticContribution],
        wrong: [wrongProgenyMatrix.authorizationStatus,
            wrongProgenyMatrix.blockReason],
    }, {
        cone: ["authorized", "conē",
            "woman-specific-in-lesson-31-human-reading",
            "open-typed-nnc-source", false],
        pilton: ["authorized", "child-or-offspring-animal-synonym"],
        wrong: ["blocked",
            "progeny-compound-requires-cone-or-pil-ton-matrix"],
    });
    s.eq("poh fellowship preserves possession and participant identity", {
        status: fellowship.authorizationStatus,
        meaning: operation(fellowship).fellowshipRelationFrame
            ?.semanticContribution,
        subject: operation(fellowship).fellowshipRelationFrame
            ?.subjectParticipantId,
        possessor: operation(fellowship).fellowshipRelationFrame
            ?.possessorParticipantId,
        number: operation(fellowship).fellowshipRelationFrame?.subjectNumber,
        state: operation(fellowship).fellowshipRelationFrame?.sourceState,
        absolutive: [fellowshipAbsolutive.authorizationStatus,
            fellowshipAbsolutive.blockReason],
    }, {
        status: "authorized",
        meaning: ["companion", "match", "equal", "peer"],
        subject: "compound-subject:3pl",
        possessor: "compound-possessor:2pl",
        number: "plural", state: "possessive",
        absolutive: ["blocked", "fellowship-poh-is-possessive-state-only"],
    });
    s.eq("typed affinity scope preserves plural and lexical facts", {
        selected: [affinity.authorizationStatus,
            operation(affinity).affinityScopeFrame?.availableTargets,
            operation(affinity).affinityScopeFrame?.selectedTarget,
            operation(affinity).affinityScopeFrame?.targetChoiceRequired,
            operation(affinity).affinityScopeFrame?.lexicalRequirement,
            operation(affinity).affinityScopeFrame?.pluralSubjectSatisfied],
        obligatory: [obligatoryBothAffinity.authorizationStatus,
            operation(obligatoryBothAffinity).affinityScopeFrame
                ?.selectedTarget,
            operation(obligatoryBothAffinity).affinityScopeFrame
                ?.targetChoiceRequired,
            operation(obligatoryBothAffinity).affinityScopeFrame
                ?.lexicalRequirement],
    }, {
        selected: ["authorized", ["embed", "matrix"], "matrix", true,
            "optional", true],
        obligatory: ["authorized", "both", false, "obligatory"],
    });
    s.eq("affinity contradictions change grammar, not vocabulary", {
        singular: [singularAffinity.authorizationStatus,
            singularAffinity.blockReason],
        target: [unlicensedAffinityTarget.authorizationStatus,
            unlicensedAffinityTarget.blockReason],
    }, {
        singular: ["blocked",
            "nominal-compound-affinity-reduplication-requires-plural-subject"],
        target: ["blocked",
            "nominal-compound-affinity-target-not-licensed-by-typed-source"],
    });
    s.eq("distributive or varietal reduplication targets the embed", {
        distribution: [distribution.authorizationStatus,
            operation(distribution).distributiveVarietalFrame
                ?.semanticReading,
            operation(distribution).distributiveVarietalFrame
                ?.reduplicationTarget,
            operation(distribution).distributiveVarietalFrame
                ?.targetChoiceRequired,
            operation(distribution).compoundStem],
        unresolved: [unresolvedVariety.authorizationStatus,
            operation(unresolvedVariety).distributiveVarietalFrame
                ?.meaningChoiceRequired,
            operation(unresolvedVariety).distributiveVarietalFrame
                ?.semanticReading],
        wrong: [wrongDistributiveTarget.authorizationStatus,
            wrongDistributiveTarget.blockReason],
    }, {
        distribution: ["authorized", "distribution", "embed", false,
            "moh-mōl-caxi"],
        unresolved: ["authorized", true, "ambiguous"],
        wrong: ["blocked",
            "nominal-compound-distributive-varietal-reduplication-requires-embed"],
    });

    const cueFrames = [openProgeny, fellowship, affinity, distribution];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame,
        )
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all final accepted atoms have writing and clickable-cue routes", {
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
    }, { records: 63, writing: 17, groups: 3, cueGroups: 3,
        covered: true });

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [operation(openProgeny).progenyRelationFrame?.matrixStem,
                operation(fellowship).fellowshipRelationFrame?.sourceState]
            : record.reviewGroupId === GROUPS[1]
                ? [operation(affinity).affinityScopeFrame?.selectedTarget,
                    operation(affinity).affinityScopeFrame
                        ?.pluralSubjectSatisfied]
                : [operation(distribution).distributiveVarietalFrame
                    ?.reduplicationTarget,
                operation(distribution).distributiveVarietalFrame
                    ?.semanticReading];
        const expected = record.reviewGroupId === GROUPS[0]
            ? ["conē", "possessive"]
            : record.reviewGroupId === GROUPS[1]
                ? ["matrix", true]
                : ["embed", "distribution"];
        s.eq(`${record.atomId} observes its accepted canonical job`,
            observed, expected);
        s.ok(`mutation:${record.atomId} blocks the contradicted job`,
            record.reviewGroupId === GROUPS[0]
                ? wrongProgenyMatrix.authorizationStatus === "blocked"
                : record.reviewGroupId === GROUPS[1]
                    ? singularAffinity.authorizationStatus === "blocked"
                    : wrongDistributiveTarget.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
