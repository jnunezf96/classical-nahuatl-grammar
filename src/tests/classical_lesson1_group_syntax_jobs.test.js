"use strict";

const { createSuite } = require("./runner");

function execute(ctx, operationId, args) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId,
        args,
        languageId: "classical-nahuatl",
    }).canonicalResult;
}

function concept(ctx, domain, selection) {
    return execute(ctx, "concept:classification", [
        ctx.buildClassicalGrammarConceptSource({ domain, selection }),
    ]);
}

function particle(ctx, entryId = "l3-ma") {
    return execute(ctx, "particle:result", [
        ctx.buildClassicalNahuatlParticleSourceFrame(entryId),
    ]);
}

function nuclearClause(ctx, stem) {
    return execute(ctx, "vnc:nuclear-clause", [stem, {
        nuclearClauseKind: "nominal-nuclear-clause",
        state: "absolutive",
    }]);
}

function group(ctx, requestedAnalysisKind, particleResults, nuclearClauseResults) {
    return execute(ctx, "classical.structure.group.compose", [
        ctx.buildClassicalNahuatlGroupCompositionSource({
            analysisDomain: "nahuatl-group-composition",
            requestedAnalysisKind,
            prerequisites: { particleResults, nuclearClauseResults },
        }),
    ]);
}

function rejectedGroup(ctx, requestedAnalysisKind, particleResults, nuclearClauseResults) {
    return ctx.evaluateClassicalNahuatlGroupComposition(
        ctx.buildClassicalNahuatlGroupCompositionSource({
            analysisDomain: "nahuatl-group-composition",
            requestedAnalysisKind,
            prerequisites: { particleResults, nuclearClauseResults },
        }),
    );
}

function syntaxOnset(ctx, groupResult) {
    return execute(ctx, "classical.structure.syntax-domain-onset.validate", [
        ctx.buildClassicalNahuatlSyntaxDomainOnsetSource({
            analysisDomain: "nahuatl-syntax-domain-onset",
            requestedAnalysisKind: "group-rank-onset",
            prerequisites: { groupResult },
        }),
    ]);
}

function includesFact(result, fact) {
    return Boolean(result && result.authorizationStatus === "authorized" && result.facts.includes(fact));
}

function exactFactAndMutation(result, fact) {
    if (!result) return false;
    const mutation = {
        ...result,
        facts: result.facts.map(value => value === fact ? `broken-${value}` : value),
    };
    return includesFact(result, fact) && !includesFact(mutation, fact);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_group_syntax_jobs");
    const comparison = concept(ctx, "structure", "english-spanish-group-rank-evidence");
    const ma = particle(ctx);
    const tlacatl = nuclearClause(ctx, "tlacatl");
    const cihuatl = nuclearClause(ctx, "cihuatl");
    const particlesOnly = group(ctx, "particles-only", [ma], []);
    const particleAndClause = group(ctx, "particles-and-nuclear-clause", [ma], [tlacatl]);
    const multipleClauses = group(ctx, "multiple-nuclear-clauses", [], [tlacatl, cihuatl]);
    const syntax = syntaxOnset(ctx, particlesOnly);

    const exactFacts = [
        ["ACI-P031-L007-56E0C6ADEF", comparison, "the-English-and-Spanish-syntactic-domain-begins-at-word-group-rank"],
        ["ACI-P031-L008-4D20CF03F5", comparison, "an-English-or-Spanish-word-group-contains-no-conjugated-verbword"],
        ["ACI-P031-L008-4D20CF03F5-02", comparison, "on-the-table-is-an-English-prepositional-word-group"],
        ["ACI-P031-L008-4D20CF03F5-03", comparison, "within-on-the-table-the-table-is-the-object-of-on"],
        ["ACI-P031-L008-4D20CF03F5-04", comparison, "an-English-or-Spanish-clause-group-contains-a-conjugated-verbword"],
        ["ACI-P031-L008-4D20CF03F5-05", comparison, "before-I-left-is-an-English-prepositional-clause-group"],
        ["ACI-P031-L008-4D20CF03F5-06", comparison, "within-before-I-left-I-left-is-the-object-of-before"],
        ["ACI-P031-L013-C77F349CD4", syntax, "the-Classical-Nahuatl-syntactic-domain-begins-with-an-owner-issued-group"],
        ["ACI-P031-L014-944BF6A0F4", comparison, "sections-3.4-and-15.3-and-Lesson-17-document-the-three-Nahuatl-group-shapes"],
    ];

    s.eq("nine single-job atoms keep Canvas order", exactFacts.length, 9);
    for (const [atomId, result, fact] of exactFacts) {
        s.ok(`${atomId} performs its exact job and its mutation fails`, exactFactAndMutation(result, fact));
    }

    const brokenParticlesOnly = rejectedGroup(ctx, "particles-only", [], []);
    const brokenParticleAndClause = rejectedGroup(ctx, "particles-and-nuclear-clause", [], [tlacatl]);
    const brokenMultipleClauses = rejectedGroup(ctx, "multiple-nuclear-clauses", [], [tlacatl]);
    s.ok(
        "ACI-P031-L014-D364C15A04 performs all three allowed Nahuatl group shapes and each broken shape fails",
        includesFact(particlesOnly, "a-Classical-Nahuatl-group-can-consist-only-of-owner-issued-particles")
        && includesFact(particleAndClause, "a-Classical-Nahuatl-group-can-consist-of-particles-and-a-complete-nuclear-clause")
        && includesFact(multipleClauses, "a-Classical-Nahuatl-group-can-consist-of-more-than-one-complete-nuclear-clause")
        && brokenParticlesOnly.authorizationStatus === "blocked"
        && brokenParticleAndClause.authorizationStatus === "blocked"
        && brokenMultipleClauses.authorizationStatus === "blocked",
    );

    const copiedGroup = Object.freeze({ ...particlesOnly });
    const copiedSyntax = ctx.evaluateClassicalNahuatlSyntaxDomainOnset(
        ctx.buildClassicalNahuatlSyntaxDomainOnsetSource({
            analysisDomain: "nahuatl-syntax-domain-onset",
            requestedAnalysisKind: "group-rank-onset",
            prerequisites: { groupResult: copiedGroup },
        }),
    );
    s.eq("the normal route keeps group shapes and the syntax boundary owner-issued", {
        particlesOnly: [particlesOnly.authorizationStatus, particlesOnly.analysisKind, particlesOnly.constituentCount],
        particleAndClause: [particleAndClause.authorizationStatus, particleAndClause.analysisKind, particleAndClause.constituentCount],
        multipleClauses: [multipleClauses.authorizationStatus, multipleClauses.analysisKind, multipleClauses.constituentCount],
        syntax: [syntax.authorizationStatus, syntax.classification],
        copiedSyntax: [copiedSyntax.authorizationStatus, copiedSyntax.blockReason],
    }, {
        particlesOnly: ["authorized", "particles-only", 1],
        particleAndClause: ["authorized", "particles-and-nuclear-clause", 2],
        multipleClauses: ["authorized", "multiple-nuclear-clauses", 2],
        syntax: ["authorized", "Classical-Nahuatl-syntax-begins-at-group-rank"],
        copiedSyntax: ["blocked", "nahuatl-syntax-domain-onset-owner-issued-prerequisites-required"],
    });

    return s;
}

module.exports = { run };
