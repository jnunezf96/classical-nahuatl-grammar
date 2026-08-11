"use strict";

const { createSuite } = require("./runner");
const selection = require("../../docs/canvas-progress/checkpoint009_fact_selection.json");
const semanticScope = require("../../docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json");

const ownerById = new Map(selection.owners.map((owner) => [owner.ownerId, owner]));
const sourceFactById = new Map(semanticScope.atoms.map((atom) => [atom.atomId, atom]));

function run(ctx = {}) {
    const s = createSuite("classical_checkpoint009_grammar_fact_projection");
    s.eq("checkpoint 009 selects exactly 500 read-only grammar facts", selection.counts.selectedAtoms, 500);
    s.eq("checkpoint 009 reuses fewer than 50 shared typed owners", selection.counts.selectedOwners, 18);

    const resultsByOwner = new Map();
    for (const owner of selection.owners) {
        const source = ctx[`build${owner.prefix}Source`]({
            analysisDomain: owner.ownerId,
            selection: owner.selection,
            requestedFacet: owner.requestedFacet,
            participantChoice: `${owner.selection}:${owner.requestedFacet}`,
        });
        const result = ctx[`evaluate${owner.prefix}`](source);
        s.ok(`${owner.ownerId} supplies an authorized typed owner result`, result.authorizationStatus === "authorized");
        resultsByOwner.set(owner.ownerId, result);
    }

    for (const fact of selection.atoms) {
        const owner = ownerById.get(fact.semanticOwnerId);
        const result = resultsByOwner.get(fact.semanticOwnerId);
        const sourceFact = sourceFactById.get(fact.atomId);
        const projection = ctx[`present${owner.prefix}GrammarFact`](result, fact.atomId);
        s.eq(`${fact.atomId} observes its exact read-only grammar fact`, {
            status: projection.authorizationStatus,
            atomId: projection.atomId,
            semanticOwnerId: projection.semanticOwnerId,
            canvasSection: projection.canvasSection,
            canvasSpan: projection.canvasSpan,
            statement: projection.statement,
            projectRole: projection.projectRole,
            grammarAuthority: projection.grammarAuthority,
            generationAuthority: projection.generationAuthority,
            evidenceAbsenceBlocksResult: projection.evidencePolicy?.evidenceAbsenceBlocksResult,
        }, {
            status: "authorized",
            atomId: fact.atomId,
            semanticOwnerId: fact.semanticOwnerId,
            canvasSection: sourceFact.belongsTo,
            canvasSpan: sourceFact.canvasSpan,
            statement: sourceFact.anchor,
            projectRole: "read-only-grammar-fact",
            grammarAuthority: false,
            generationAuthority: false,
            evidenceAbsenceBlocksResult: false,
        });
        s.ok(`${fact.atomId} accepts only its owner-issued fact projection`, ctx[`is${owner.prefix}GrammarFactProjection`](projection));

        const mutatedRecord = { ...ctx.getClassicalCanvasGrammarFactRecord(fact.atomId), statement: `BROKEN:${sourceFact.anchor}` };
        s.no(`${fact.atomId} rejects a mutation of its exact grammar statement`, ctx.isClassicalCanvasGrammarFactRecord(mutatedRecord));

        const forgedResult = { ...result };
        const forgedProjection = ctx[`present${owner.prefix}GrammarFact`](forgedResult, fact.atomId);
        s.eq(`${fact.atomId} rejects a copied owner result`, forgedProjection.authorizationStatus, "blocked");
    }
    return s;
}

module.exports = { run };
