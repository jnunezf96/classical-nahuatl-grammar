"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P036-L037-9C47980823", "traditional-quauhtla-corresponds-to-normalized-cuauhtlah"],
    ["ACI-P036-L037-9C47980823-02", "molina-glosses-quauhtla-with-spanish-montana-mountain"],
    ["ACI-P036-L037-9C47980823-03", "molina-glosses-quauhtla-with-spanish-arboleda-grove"],
    ["ACI-P036-L037-9C47980823-04", "molina-glosses-quauhtla-with-spanish-bosque-forest"],
    ["ACI-P036-L037-9C47980823-05", "molinas-entry-imposes-spanish-semantic-values-on-the-nahuatl-item"],
    ["ACI-P036-L039-BD7D84E391", "literal-mountain-is-rejected-because-the-spanish-usage-conflates-mountain-and-forest"],
    ["ACI-P036-L039-BD7D84E391-02", "iberian-deforestation-explains-the-historical-spanish-mountain-forest-conflation"],
    ["ACI-P036-L043-48BE012749", "molina-imposed-that-spanish-mountain-forest-conflation-on-cuauhtlah"],
    ["ACI-P037-L002-F2CAF52173", "cuauhtlah-means-it-is-a-place-of-abundant-trees-a-forest-or-grove"],
    ["ACI-P037-L002-5804EB2DBB", "with-plural-reference-cuauhtlah-means-they-are-forests-or-groves"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_cuauhtlah_forest_place_jobs");
    const source = ctx.buildTranslationAuthorityBoundarySource({ analysisDomain: "translation-authority-boundary", requestedAnalysisKind: "cuauhtlah-forest-place-reanalysis-boundary" });
    const boundary = ctx.executeClassicalGrammarApplicationRequest({ operationId: "classical.authority.source-language.firewall.enforce", args: [source], languageId: "classical-nahuatl" }).canonicalResult;
    const place = ctx.requestClassicalPlaceGentilicResult({ constructionKind: "place-name", formation: "tlah", source: { embedStem: "Cuauh" }, usage: "adverbial" });
    const wrongPlace = ctx.requestClassicalPlaceGentilicResult({ constructionKind: "place-name", formation: "tlah", source: { embedStem: "Tepē" }, usage: "adverbial" });
    s.eq("the cuauhtlah group contains 10 atoms", EXACT_FACTS.length, 10);
    for (const [atomId, fact] of EXACT_FACTS) {
        const exact = (value, placeResult) => value.authorizationStatus === "authorized" && value.facts.includes(fact) && value.relations.includes("canonical-cuauh-plus-tlah-formation-authorizes-cuauhtlah-and-context-selects-one-or-more-forest-places-without-changing-the-form") && placeResult.authorizationStatus === "authorized" && placeResult.wordSurface === "Cuauhtlah" && placeResult.formationFrame?.derivedStem === "Cuauh-tlah";
        s.ok(`${atomId} performs its exact cuauhtlah job`, exact(boundary, place));
        s.ok(`mutation:${atomId} fails when its fact or canonical stem is broken`, !exact({ ...boundary, facts: boundary.facts.filter(value => value !== fact) }, wrongPlace));
    }
    return s;
}

module.exports = { run };
