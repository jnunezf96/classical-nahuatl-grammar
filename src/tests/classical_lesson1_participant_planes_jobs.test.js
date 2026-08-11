"use strict";

const { createSuite } = require("./runner");

function execute(ctx, operationId, args) {
    return ctx.executeClassicalGrammarApplicationRequest({ operationId, args, languageId: "classical-nahuatl" }).canonicalResult;
}

function concept(ctx, domain, selection) {
    return execute(ctx, "concept:classification", [ctx.buildClassicalGrammarConceptSource({ domain, selection })]);
}

function meaningful(ctx, candidateKind) {
    return execute(ctx, "classical.morpheme.meaningful-unit.classify", [
        ctx.buildClassicalMeaningfulMorphemeUnitClassificationSource({ candidateResult: concept(ctx, "morpheme", candidateKind) }),
    ]);
}

function combinatorial(ctx, kind, candidateKind = "morpheme") {
    return execute(ctx, "classical.morpheme.combinatorial-type.classify", [
        ctx.buildClassicalMorphemeCombinatorialTypeClassificationSource({
            meaningfulUnitResult: meaningful(ctx, candidateKind),
            requestedAnalysisKind: kind,
        }),
    ]);
}

function stem(ctx) {
    const root = execute(ctx, "classical.structure.root.major-morpheme.validate", [
        ctx.buildClassicalRootMajorMorphemeDefinitionSource({
            majorTypeResult: combinatorial(ctx, "major-definition"),
            majorUnitCount: 1,
            requestedStructureKind: "root",
        }),
    ]);
    const position = execute(ctx, "classical.morpheme.affix.position.classify", [
        ctx.buildClassicalAffixLinearPositionClassificationSource({
            minorTypeResult: combinatorial(ctx, "minor-definition", "morph"),
            sequencePosition: "end",
        }),
    ]);
    const suffix = execute(ctx, "classical.morpheme.affix.function.classify", [
        ctx.buildClassicalAffixFunctionalTypeClassificationSource({
            affixPositionResult: position,
            informationRole: "modifying-or-category-altering",
            stemBoundaryRelation: "inside",
        }),
    ]);
    return execute(ctx, "classical.structure.stem.form-via-stock", [
        ctx.buildClassicalStockMediatedStemFormationSource({
            rootResult: root,
            derivationalSuffixResult: suffix,
            requestedFormation: "root-plus-derivational-suffix-via-stock-to-stem",
        }),
    ]);
}

function nuclear(ctx) {
    const clause = execute(ctx, "vnc:nuclear-clause", ["tlacatl", {
        nuclearClauseKind: "nominal-nuclear-clause",
        state: "absolutive",
    }]);
    const morphosyntax = execute(ctx, "classical.nuclear-clause.morphosyntax.validate", [
        ctx.buildClassicalNuclearClauseMorphosyntaxDomainSource({
            analysisDomain: "nuclear-clause-morphosyntax-domain",
            requestedAnalysisKind: "subject-predicate-morphosyntax",
            prerequisites: { nuclearClauseResult: clause },
        }),
    ]);
    return { clause, morphosyntax };
}

function group(ctx, clause) {
    const particle = execute(ctx, "particle:result", [ctx.buildClassicalNahuatlParticleSourceFrame("l3-ma")]);
    return execute(ctx, "classical.structure.group.compose", [
        ctx.buildClassicalNahuatlGroupCompositionSource({
            analysisDomain: "nahuatl-group-composition",
            requestedAnalysisKind: "particles-and-nuclear-clause",
            prerequisites: { particleResults: [particle], nuclearClauseResults: [clause] },
        }),
    ]);
}

function levelDistribution(ctx) {
    const morphologicalStructureResult = stem(ctx);
    const nuclearResult = nuclear(ctx);
    const syntacticalStructureResult = group(ctx, nuclearResult.clause);
    const source = ctx.buildClassicalNahuatlStructureLevelDistributionSource({
        analysisDomain: "nahuatl-structure-level-distribution",
        requestedAnalysisKind: "cross-level-distribution",
        prerequisites: {
            morphologicalStructureResult,
            morphosyntacticalStructureResult: nuclearResult.morphosyntax,
            syntacticalStructureResult,
        },
    });
    return {
        result: execute(ctx, "classical.structure.level-distribution.validate", [source]),
        morphologicalStructureResult,
        morphosyntacticalStructureResult: nuclearResult.morphosyntax,
        syntacticalStructureResult,
    };
}

function participant(ctx, requestedAnalysisKind, participantChoice) {
    return execute(ctx, "classical.structure.participant-role.analyze", [
        ctx.buildClassicalParticipantRoleAnalysisSource({
            analysisDomain: "participant-role-analysis",
            requestedAnalysisKind,
            participantChoice,
        }),
    ]);
}

function planes(ctx, requestedAnalysisKind, participantChoice) {
    return execute(ctx, "classical.structure.conceptual-plane.separate", [
        ctx.buildClassicalConceptualPlaneSeparationSource({
            analysisDomain: "conceptual-plane-separation",
            requestedAnalysisKind,
            participantChoice,
        }),
    ]);
}

function exactFactAndMutation(result, fact) {
    const exact = result.authorizationStatus === "authorized" && result.facts.includes(fact);
    const mutation = { ...result, facts: result.facts.map(value => value === fact ? `broken-${value}` : value) };
    return exact && !mutation.facts.includes(fact);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_participant_planes_jobs");
    const levels = levelDistribution(ctx);
    const participantUnits = participant(ctx, "event-relation-units", "participants-events-relations");
    const roles = participant(ctx, "participant-role-inventory", "agent-patient-goal-instrument");
    const inventory = planes(ctx, "plane-inventory", "function-unit+form-class+lexical-item+participant-role");
    const nonintermingling = planes(ctx, "nonintermingling", "keep-planes-distinct");
    const functionForm = planes(ctx, "function-form-confusion-rejected", "subject-of-the-verb");
    const evidence = concept(ctx, "structure", "english-participant-plane-confusion-evidence");

    const exact = [
        ["ACI-P032-L026-ADA59A0620", levels.result, "some-structures-occur-only-or-mainly-on-the-morphosyntactical-level"],
        ["ACI-P032-L026-ADA59A0620-02", levels.result, "some-structures-occur-only-on-the-syntactical-level"],
        ["ACI-P032-L026-ADA59A0620-03", levels.result, "some-structures-occur-on-both-the-morphological-and-syntactical-levels"],
        ["ACI-P032-L029-7F658B71D1", participantUnits, "participant-related-units-are-distinct-from-grammatical-function-units"],
        ["ACI-P032-L030-55922DAECB", roles, "participant-roles-include-agent-patient-goal-and-instrument"],
        ["ACI-P032-L031-AB8A8E2EEE", evidence, "in-Paul-broke-the-window-the-subject-Paul-has-agent-role"],
        ["ACI-P032-L033-DB783927D5", evidence, "in-the-window-got-broken-the-subject-window-has-patient-role-and-in-a-rock-broke-the-window-the-subject-rock-has-instrument-role"],
        ["ACI-P032-L035-8614AE1561", inventory, "function-units-form-classes-lexical-items-and-participant-roles-occupy-different-conceptual-planes"],
        ["ACI-P032-L036-1DB4314953", nonintermingling, "different-conceptual-planes-must-not-be-treated-as-conceptual-mates"],
        ["ACI-P032-L038-5CFADB0FE4", evidence, "the-criticized-form-class-account-is-an-English-fostered-conceptual-confusion"],
        ["ACI-P032-L038-5CFADB0FE4-02", evidence, "using-the-criticized-account-even-for-English-is-poor-analysis"],
        ["ACI-P032-L038-5CFADB0FE4-03", evidence, "applying-the-criticized-account-to-Spanish-or-Nahuatl-is-nonsensical"],
        ["ACI-P032-L038-5CFADB0FE4-04", functionForm, "subject-cooperates-with-predicate-or-predicator-not-verb"],
    ];

    s.eq("all final 13 section 1.12 atoms keep Canvas order", exact.length, 13);
    for (const [atomId, result, fact] of exact) {
        s.ok(`${atomId} performs its exact job and its mutation fails`, exactFactAndMutation(result, fact));
    }

    const copiedGroup = Object.freeze({ ...levels.syntacticalStructureResult });
    const broken = ctx.evaluateClassicalNahuatlStructureLevelDistribution(
        ctx.buildClassicalNahuatlStructureLevelDistributionSource({
            analysisDomain: "nahuatl-structure-level-distribution",
            requestedAnalysisKind: "cross-level-distribution",
            prerequisites: {
                morphologicalStructureResult: levels.morphologicalStructureResult,
                morphosyntacticalStructureResult: levels.morphosyntacticalStructureResult,
                syntacticalStructureResult: copiedGroup,
            },
        }),
    );
    s.eq("copied structure cannot claim a syntactical level", [broken.authorizationStatus, broken.blockReason], [
        "blocked",
        "nahuatl-structure-level-distribution-owner-issued-prerequisites-required",
    ]);

    return s;
}

module.exports = { run };
