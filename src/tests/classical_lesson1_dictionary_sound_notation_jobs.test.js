"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P036-L005-9C9110AD6B", "molinas-communicative-purpose-required-consistent-vowel-length-and-glottal-stop-marking"],
    ["ACI-P036-L005-9C9110AD6B-02", "molinas-dictionary-never-marks-vowel-length"],
    ["ACI-P036-L005-9C9110AD6B-03", "molinas-dictionary-marks-a-glottal-stop-only-rarely"],
    ["ACI-P036-L005-9C9110AD6B-04", "when-molina-marks-a-glottal-stop-he-uses-h"],
    ["ACI-P036-L005-9C9110AD6B-05", "andrews-lessons-use-h-to-write-the-glottal-stop"],
    ["ACI-P036-L005-9C9110AD6B-06", "sections-2-2-and-2-3-3-own-the-importance-of-vowel-length-and-glottal-stops"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_dictionary_sound_notation_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({
        analysisDomain: "translation-authority-boundary",
        requestedAnalysisKind: "dictionary-sound-notation-incompleteness-boundary",
    });
    const result = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.authority.source-language.firewall.enforce",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;
    s.eq("the dictionary sound-notation group contains 6 atoms", EXACT_FACTS.length, 6);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = value => value.authorizationStatus === "authorized"
            && value.facts.includes(fact)
            && value.relations.includes("unmarked-vowel-length-or-glottal-stop-in-dictionary-evidence-cannot-be-read-as-phonological-absence-or-block-a-canonical-result")
            && value.generationAllowed === false;
        s.ok(`${atomId} performs its exact sound-notation job`, exact(result));
        s.ok(`mutation:${atomId} fails when its job is removed`, !exact({
            ...result,
            facts: result.facts.filter(value => value !== fact),
        }));
    }
    return s;
}

module.exports = { run };
