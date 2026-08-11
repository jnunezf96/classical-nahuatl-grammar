"use strict";

const { createSuite } = require("./runner");

function execute(ctx, operationId, args) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId,
        outputKind: "scalar",
        args,
        languageId: "classical-nahuatl",
    }).canonicalResult;
}

function build(ctx, overrides = {}) {
    const nnc = ctx.buildClassicalNahuatlAbsolutiveNncFrame("exō", {
        subject: "3sg",
        nounClass: "tl",
        animacy: "nonanimate",
        ...overrides,
    });
    const sentence = execute(ctx, "nnc:sentence-surface", [
        nnc.nncSlotFrame,
        { sentenceType: "assertion", polarity: "positive" },
    ]);
    const source = ctx.buildClassicalNahuatlExotlInterpretationSource(sentence);
    const result = source.authorizationStatus === "authorized"
        ? execute(ctx, "classical.nnc.exotl.interpret", [source])
        : ctx.evaluateClassicalNahuatlExotlInterpretation(source);
    return { nnc, sentence, source, result };
}

function observesFullNominalClause(result) {
    return result.authorizationStatus === "authorized"
        && result.canonicalResult === "exōtl"
        && result.canonicalFormula === "#0-0(exō)tl-0#"
        && result.nuclearClauseKind === "nominal-nuclear-clause"
        && result.completeClause === true
        && result.wordPhrase === false
        && result.subject?.person === "third"
        && result.subject?.number === "singular"
        && result.subject?.sounded === false
        && result.predicate?.nounstem === "exō"
        && result.predicate?.absolutiveNumberMorph === "tl"
        && result.predicate?.referentHumanness === "nonhuman"
        && result.compositionalMeaning === "it-is-a-green-thing-in-the-form-of-a-bean";
}

function observesNahuatlWeighting(result) {
    return result.authorizationStatus === "authorized"
        && result.semanticWeighting?.primary === "green-quality"
        && result.semanticWeighting?.secondary === "bean-form-entity"
        && result.semanticWeighting?.relation === "quality-predicated-of-a-nonhuman-entity-form"
        && result.englishGreenBeanAuthority === false
        && result.reversedWeightingAllowed === false;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_exotl_jobs");
    const built = build(ctx);

    s.eq("the normal application builds exōtl as a complete NNC Result", {
        word: built.sentence.canonicalNuclearSurface,
        formula: built.sentence.baseNncFormula,
        sentence: built.sentence.sentenceSurface,
        interpreted: built.result.canonicalResult,
    }, {
        word: "exōtl",
        formula: "#0-0(exō)tl-0#",
        sentence: "Exōtl.",
        interpreted: "exōtl",
    });

    s.ok(
        "ACI-P033-L038-979B2933D1 performs its exact full-clause job",
        observesFullNominalClause(built.result),
    );
    s.ok(
        "mutation:ACI-P033-L038-979B2933D1 fails when clause structure is broken",
        !observesFullNominalClause({
            ...built.result,
            completeClause: false,
            wordPhrase: true,
            compositionalMeaning: "green-bean",
        }),
    );

    s.ok(
        "ACI-P033-L041-182265FE6B performs its exact weighting-protection job",
        observesNahuatlWeighting(built.result),
    );
    s.ok(
        "mutation:ACI-P033-L041-182265FE6B fails when English weighting is imposed",
        !observesNahuatlWeighting({
            ...built.result,
            semanticWeighting: Object.freeze({
                primary: "bean-form-entity",
                secondary: "green-quality",
                relation: "english-noun-phrase",
            }),
            englishGreenBeanAuthority: true,
            reversedWeightingAllowed: true,
        }),
    );

    const wrongStem = ctx.buildClassicalNahuatlAbsolutiveNncFrame("elo", {
        subject: "3sg",
        nounClass: "tl",
        animacy: "nonanimate",
    });
    const wrongSentence = execute(ctx, "nnc:sentence-surface", [
        wrongStem.nncSlotFrame,
        { sentenceType: "assertion", polarity: "positive" },
    ]);
    const wrongSource = ctx.buildClassicalNahuatlExotlInterpretationSource(wrongSentence);
    s.eq("a different NNC cannot claim the exōtl interpretation", [
        wrongSource.authorizationStatus,
        wrongSource.blockReason,
    ], ["blocked", "canonical-exotl-nnc-sentence-required"]);

    const copied = ctx.evaluateClassicalNahuatlExotlInterpretation(
        Object.freeze({ ...built.source }),
    );
    s.eq("a copied source cannot claim the exōtl grammar", [
        copied.authorizationStatus,
        copied.blockReason,
    ], ["blocked", "owner-issued-exotl-interpretation-source-required"]);

    return s;
}

module.exports = { run };
