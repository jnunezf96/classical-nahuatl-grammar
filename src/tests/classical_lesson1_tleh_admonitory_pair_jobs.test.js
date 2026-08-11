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

function buildVnc(ctx, sourceStem, subject = "2sg") {
    return execute(ctx, "vnc:application", [{
        sourceStem,
        verbClass: "A",
        sourceValence: "transitive",
        subject,
        requestedDerivation: "direct",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
    }]);
}

function build(ctx, subject = "2sg") {
    const tleh = ctx.buildClassicalNahuatlPronominalNncFrame({
        subtype: "interrogative",
        interrogativeKind: "tleh",
        subject: "3sg",
    });
    const knowing = buildVnc(ctx, "momachītia", subject);
    const knower = buildVnc(ctx, "matcātzintli", subject);
    const source = ctx.buildClassicalNahuatlTlehAdmonitoryPairSource(
        tleh,
        knowing,
        knower,
    );
    const result = source.authorizationStatus === "authorized"
        ? execute(ctx, "classical.sentence.tleh-admonitory-pair.interpret", [source])
        : ctx.evaluateClassicalNahuatlTlehAdmonitoryPair(source);
    return { tleh, knowing, knower, source, result };
}

const JOBS = Object.freeze([
    ["ACI-P034-L029-96C3C7DFCF", result => result.canonicalQuestions?.[0] === "Tleh ticmomachītia?"],
    ["ACI-P034-L029-96C3C7DFCF-02", result => result.questionMeanings?.[0] === "what-is-it-that-you-honored-one-know"],
    ["ACI-P034-L029-96C3C7DFCF-03", result => result.subjects?.[0]?.person === "second" && result.subjects?.[0]?.number === "singular" && result.subjects?.[0]?.humanness === "human" && result.subjects?.[0]?.honorific === true && result.interrogativeObject?.humanness === "nonhuman" && result.interrogativeObject?.role === "thing-known"],
    ["ACI-P034-L029-96C3C7DFCF-04", result => result.canonicalQuestions?.[1] === "Tleh ticmatcātzintli?"],
    ["ACI-P034-L029-96C3C7DFCF-05", result => result.questionMeanings?.[1] === "what-is-it-that-you-honored-one-are-a-knower-of"],
    ["ACI-P034-L029-96C3C7DFCF-06", result => result.subjects?.[1]?.person === "second" && result.subjects?.[1]?.number === "singular" && result.subjects?.[1]?.humanness === "human" && result.subjects?.[1]?.honorific === true && result.interrogativeObject?.humanness === "nonhuman"],
    ["ACI-P034-L030-0DA56B325E", result => result.pairDiscourse?.comfortingWish === false && result.pairDiscourse?.goodCheerAndRestMeaning === false],
    ["ACI-P034-L030-0DA56B325E-02", result => result.pairDiscourse?.pragmaticFunctions?.includes("challenge")],
    ["ACI-P034-L030-0DA56B325E-03", result => result.pairDiscourse?.pragmaticFunctions?.includes("wake-up-call")],
    ["ACI-P034-L030-0DA56B325E-04", result => result.pairDiscourse?.rhetorical === true],
    ["ACI-P034-L030-0DA56B325E-05", result => result.pairDiscourse?.expectedAnswer === "nothing"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_tleh_admonitory_pair_jobs");
    const built = build(ctx);
    s.eq("the normal application builds both VNCs before interpreting the pair", {
        tlehFormula: built.tleh.formulaRealization,
        knowing: built.knowing.resultFrame.surfaceRealization,
        knower: built.knower.resultFrame.surfaceRealization,
        questions: built.result.canonicalQuestions,
    }, {
        tlehFormula: "#0-0(tl-eh)0-0#",
        knowing: "ticmomachītia",
        knower: "ticmatcātzintli",
        questions: ["Tleh ticmomachītia?", "Tleh ticmatcātzintli?"],
    });

    for (const [atomId, observes] of JOBS) {
        s.ok(`${atomId} performs its exact sentence job`, observes(built.result));
        const mutation = {
            ...built.result,
            canonicalQuestions: Object.freeze(["broken", "broken"]),
            questionMeanings: Object.freeze(["broken", "broken"]),
            subjects: Object.freeze([Object.freeze({}), Object.freeze({})]),
            interrogativeObject: Object.freeze({}),
            pairDiscourse: Object.freeze({
                rhetorical: false,
                pragmaticFunctions: Object.freeze([]),
                expectedAnswer: "something",
                comfortingWish: true,
                goodCheerAndRestMeaning: true,
            }),
        };
        s.ok(`mutation:${atomId} fails when that sentence behavior is broken`, !observes(mutation));
    }

    const wrongSubject = build(ctx, "1sg");
    s.eq("a first-person VNC pair cannot claim the honored second-person reading", [
        wrongSubject.source.authorizationStatus,
        wrongSubject.result.authorizationStatus,
    ], ["blocked", "blocked"]);

    const copied = ctx.evaluateClassicalNahuatlTlehAdmonitoryPair(
        Object.freeze({ ...built.source }),
    );
    s.eq("a copied source cannot claim the paired-question grammar", [
        copied.authorizationStatus,
        copied.blockReason,
    ], ["blocked", "owner-issued-tleh-admonitory-pair-source-required"]);
    return s;
}

module.exports = { run };
