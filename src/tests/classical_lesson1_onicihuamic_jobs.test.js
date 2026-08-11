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
    const vnc = execute(ctx, "vnc:application", [{
        sourceStem: "cihuāmiqui",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "1sg",
        requestedDerivation: "direct",
        requestedVoice: "active",
        mood: "indicative",
        tense: "preterit",
        outputScope: "single",
        sentenceAntecessive: true,
        ...overrides,
    }]);
    const sentence = execute(ctx, "vnc:sentence-result", [vnc]);
    const source = ctx.buildClassicalNahuatlWidowhoodCompoundInterpretationSource(sentence);
    const result = source.authorizationStatus === "authorized"
        ? execute(ctx, "classical.vnc.compound.widowhood.interpret", [source])
        : ctx.evaluateClassicalNahuatlWidowhoodCompoundInterpretation(source);
    return { vnc, sentence, source, result };
}

const JOBS = Object.freeze([
    ["ACI-P033-L021-ADF1056ADD", result => result.canonicalRealization === "ōnicihuāmic"],
    ["ACI-P033-L021-ADF1056ADD-02", result => result.lexicalMeaning === "become-a-widower"],
    ["ACI-P033-L021-ADF1056ADD-03", result => JSON.stringify(result.subjectInterpretation) === JSON.stringify({ person: "first", number: "singular", humanness: "human", sex: "male", role: "widower-experiencer", subjectPrefix: "ni-" })],
    ["ACI-P033-L021-ADF1056ADD-04", result => result.englishAnalogueAuthority === false],
    ["ACI-P033-L023-0B7415E491", result => JSON.stringify(result.literalStructure) === JSON.stringify(["already", "first-person-singular-human-male-subject", "wife-or-woman", "die-perfective"])],
    ["ACI-P033-L023-0B7415E491-02", result => result.explanatoryParaphrases.includes("die-in-the-form-of-my-wife") && result.paraphraseAuthority === false],
    ["ACI-P033-L023-0B7415E491-03", result => result.explanatoryParaphrases.includes("die-in-regard-to-my-wife") && result.paraphraseAuthority === false],
    ["ACI-P033-L023-0B7415E491-04", result => result.explanatoryParaphrases.includes("die-by-means-of-my-wife") && result.paraphraseAuthority === false],
    ["ACI-P033-L023-0B7415E491-05", result => result.explanatoryParaphrases.includes("die-because-of-my-wife") && result.paraphraseAuthority === false],
    ["ACI-P033-L023-0B7415E491-06", result => result.explanatoryParaphrases.includes("die-in-relation-to-my-wife") && result.paraphraseAuthority === false],
    ["ACI-P033-L023-0B7415E491-07", result => result.paraphrasesExhaustive === false],
    ["ACI-P033-L023-0B7415E491-08", result => result.grammarSourceSections.includes("30.14.1")],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_onicihuamic_jobs");
    const built = build(ctx);
    s.eq("the normal application builds the full earlier-event form", {
        nuclear: built.vnc.resultFrame.surfaceRealization,
        sentence: built.sentence.sentenceSurfaceDisplay,
        interpreted: built.result.canonicalRealization,
    }, {
        nuclear: "nicihuāmic",
        sentence: "Ōnicihuāmic.",
        interpreted: "ōnicihuāmic",
    });
    for (const [atomId, observes] of JOBS) {
        s.ok(`${atomId} performs its exact job`, observes(built.result));
        const mutation = {
            ...built.result,
            canonicalRealization: "broken",
            lexicalMeaning: "broken",
            subjectInterpretation: Object.freeze({}),
            englishAnalogueAuthority: true,
            literalStructure: Object.freeze([]),
            explanatoryParaphrases: Object.freeze([]),
            paraphraseAuthority: true,
            paraphrasesExhaustive: true,
            grammarSourceSections: Object.freeze([]),
        };
        s.ok(`mutation:${atomId} fails when that behavior is broken`, !observes(mutation));
    }

    const wrongSubject = build(ctx, { subject: "2sg" });
    s.eq("a second-person Result cannot claim the first-person widower reading", [
        wrongSubject.source.authorizationStatus,
        wrongSubject.result.authorizationStatus,
    ], ["blocked", "blocked"]);

    const noAntecessive = build(ctx, { sentenceAntecessive: false });
    s.eq("the form without ō cannot claim the exact earlier-event Result", [
        noAntecessive.sentence.sentenceSurfaceDisplay,
        noAntecessive.source.authorizationStatus,
        noAntecessive.result.authorizationStatus,
    ], ["nicihuāmic", "blocked", "blocked"]);

    const copied = ctx.evaluateClassicalNahuatlWidowhoodCompoundInterpretation(
        Object.freeze({ ...built.source })
    );
    s.eq("a copied source cannot claim the lexical grammar", [
        copied.authorizationStatus,
        copied.blockReason,
    ], ["blocked", "owner-issued-widowhood-compound-source-required"]);

    return s;
}

module.exports = { run };
