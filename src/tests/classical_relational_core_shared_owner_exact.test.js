"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_relational_core_shared_owner_exact");
    const facet = "p4246-warning-the-major-deterrent-to-understanding-nahuatl-grammar-here";
    const source = ctx.buildClassicalRelationalNoPrepositionMorphologyCounterpartSource({
        analysisDomain: "classical-relational-no-preposition-morphology-counterpart",
        selection: "claim-p4246",
        requestedFacet: facet,
        participantChoice: `claim-p4246:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalRelationalNoPrepositionMorphologyCounterpart(source);
    const frame = ownerResult.payload.definition;
    const core = frame.cases.relationalCore;
    const observations = [
        ["ACI-P460-L003-1E7DF7F207", "relational generation without preposition morphology", {
            prepositionAuthority: frame.contract.translationPrepositionAuthorizesMorphology,
            canonicalResult: core.canonicalResult,
            construction: core.constructionKind,
        }, { prepositionAuthority: false, canonicalResult: true, construction: "relational-nnc" }],
        ["ACI-P460-L005-770F28C4C0", "relational meaning inherent in the adverbialized clause", {
            selectedAxis: core.selectedAxisIds.includes("translation-preposition-has-no-source-slot"),
            translationPrepositionIsMorphology: core.contextualFacts.translationPrepositionIsMorphology,
            subjectMode: core.liveResult.formulaSlots.subjectMode,
        }, { selectedAxis: true, translationPrepositionIsMorphology: false, subjectMode: "adverbialized" }],
        ["ACI-P460-L022-370DF69AD0-03", "relational nounstem adverbialized NNC formation", {
            sourceCategory: core.liveResult.sourceCategory,
            lexicalClass: core.liveResult.lexicalClass,
            construction: core.constructionKind,
            subjectMode: core.liveResult.formulaSlots.subjectMode,
        }, { sourceCategory: "nounstem", lexicalClass: "relational", construction: "relational-nnc", subjectMode: "adverbialized" }],
        ["ACI-P461-L026-D8FC647DE1", "option one possessive-state enforcement", {
            option: core.option,
            sourceState: core.sourceState,
            predicateState: core.predicateState,
            trace: core.operationTrace,
        }, { option: "option-one", sourceState: "possessive", predicateState: "possessive", trace: ["select-simple-relational-predicate", "require-possessive-state"] }],
    ];
    for (const [atomId, path, actual, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, actual, expected);
        const hostile = JSON.parse(JSON.stringify(actual));
        hostile[Object.keys(hostile)[0]] = "BROKEN";
        s.no(`${atomId} rejects a mutation of ${path}`, JSON.stringify(hostile) === JSON.stringify(expected));
    }
    s.eq("the shared relational Result is authorized", ownerResult.authorizationStatus, "authorized");
    return s;
}

module.exports = { run };
