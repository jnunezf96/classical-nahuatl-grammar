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

function buildVnc(ctx, sourceStem) {
    return execute(ctx, "vnc:application", [{
        sourceStem,
        verbClass: "A",
        sourceValence: "transitive",
        subject: "2sg",
        requestedDerivation: "direct",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
    }]);
}

function build(ctx) {
    const tleh = ctx.buildClassicalNahuatlPronominalNncFrame({
        subtype: "interrogative",
        interrogativeKind: "tleh",
        subject: "3sg",
    });
    const pairSource = ctx.buildClassicalNahuatlTlehAdmonitoryPairSource(
        tleh,
        buildVnc(ctx, "momachītia"),
        buildVnc(ctx, "matcātzintli"),
    );
    const pairResult = execute(
        ctx,
        "classical.sentence.tleh-admonitory-pair.interpret",
        [pairSource],
    );
    const source = ctx.buildClassicalNahuatlTlehClosingVocativeSource(pairResult);
    const result = execute(
        ctx,
        "classical.sentence.tleh-closing-vocative.interpret",
        [source],
    );
    return { pairResult, source, result };
}

const JOBS = Object.freeze([
    ["ACI-P034-L038-EC58BBE8BB", result => result.returnsToEarlierRhetoricalQuestion === true],
    ["ACI-P034-L038-EC58BBE8BB-02", result => result.canonicalQuestion === "Tleh ticmatcātzintli, tlazohtitlācatle, totēucyōe?"],
    ["ACI-P034-L038-EC58BBE8BB-03", result => result.vocatives?.length === 2 && result.vocatives.every(vocative => vocative.addressee === "same-honored-singular-human-woman")],
    ["ACI-P034-L039-887B294CA5", result => result.rejectedRestInPeaceMeaning === true],
    ["ACI-P034-L039-887B294CA5-02", result => result.principalClauseMeaning === "you-are-ignorant"],
    ["ACI-P034-L039-887B294CA5-03", result => result.principalSubject?.person === "second" && result.principalSubject?.number === "singular" && result.principalSubject?.honorific === true],
    ["ACI-P034-L039-887B294CA5-04", result => result.vocatives?.[0]?.form === "tlazohtitlācatle" && result.vocatives?.[0]?.meaning === "O-valued-person"],
    ["ACI-P034-L039-887B294CA5-05", result => result.vocatives?.[1]?.form === "totēucyōe" && result.vocatives?.[1]?.meaning === "O-our-lady"],
    ["ACI-P034-L039-887B294CA5-06", result => result.pragmaticFunctions?.includes("remind-addressee-of-her-ignorance")],
    ["ACI-P034-L039-887B294CA5-07", result => result.pragmaticFunctions?.includes("instruct-addressee-to-think-carefully-about-preceding-advice")],
    ["ACI-P034-L039-887B294CA5-08", result => result.sourceCitation === "Anderson-and-Dibble-VI-page-185" && result.citedSpeechAuthority === false],
    ["ACI-P034-L039-887B294CA5-09", result => result.citedSpeechEvidenceSupportsReading === true && result.citedSpeechAuthority === false],
    ["ACI-P034-L042-AF216CB166", result => result.takeThingsEasyMeaning === false],
    ["ACI-P034-L042-AF216CB166-02", result => result.prepareForPossibleDisasterMeaning === true],
    ["ACI-P034-L043-BC82265E11", result => result.culturallyFamiliarMindsetCanMaskInadequateTranslation === true],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_tleh_closing_vocative_jobs");
    const built = build(ctx);
    s.eq("the normal application returns to the rhetorical question with two vocatives", {
        earlier: built.pairResult.canonicalQuestions?.[1],
        closing: built.result.canonicalQuestion,
        vocatives: built.result.vocatives?.map(value => value.form),
    }, {
        earlier: "Tleh ticmatcātzintli?",
        closing: "Tleh ticmatcātzintli, tlazohtitlācatle, totēucyōe?",
        vocatives: ["tlazohtitlācatle", "totēucyōe"],
    });
    for (const [atomId, observes] of JOBS) {
        s.ok(`${atomId} performs its exact closing-question job`, observes(built.result));
        const mutation = {
            ...built.result,
            returnsToEarlierRhetoricalQuestion: false,
            canonicalQuestion: "broken",
            principalClauseMeaning: "rest-in-peace",
            principalSubject: Object.freeze({}),
            vocatives: Object.freeze([]),
            rejectedRestInPeaceMeaning: false,
            pragmaticFunctions: Object.freeze([]),
            sourceCitation: "",
            citedSpeechEvidenceSupportsReading: false,
            citedSpeechAuthority: true,
            takeThingsEasyMeaning: true,
            prepareForPossibleDisasterMeaning: false,
            culturallyFamiliarMindsetCanMaskInadequateTranslation: false,
        };
        s.ok(`mutation:${atomId} fails when its exact behavior is broken`, !observes(mutation));
    }
    const copied = ctx.evaluateClassicalNahuatlTlehClosingVocative(
        Object.freeze({ ...built.source }),
    );
    s.eq("a copied source cannot claim the closing-question grammar", [
        copied.authorizationStatus,
        copied.blockReason,
    ], ["blocked", "owner-issued-tleh-closing-vocative-source-required"]);
    return s;
}

module.exports = { run };
