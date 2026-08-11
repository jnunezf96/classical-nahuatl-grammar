"use strict";

const { createSuite } = require("./runner");

const ATOM_OBSERVATIONS = Object.freeze([
    ["ACI-P039-L003-5036476036", value => value.system.segmentalPhonemeCount === 23],
    ["ACI-P039-L004-897BE64FB1", value => value.system.vowelPhonemeCount === 8 && value.vowels === "aāeēiīoō"],
    ["ACI-P039-L004-E7E01D8587", value => value.system.consonantPhonemeCount === 15],
    ["ACI-P039-L007-2C1DE9E201", value => value.vowels === "aāeēiīoō" && value.simple === "lnmxypth" && value.affricates === "tltzch"],
    ["ACI-P041-L033-5DC2501239", value => value.shortVowels === "aeio"],
    ["ACI-P041-L033-DABD2BE51F", value => value.longVowels === "āēīō"],
    ["ACI-P042-L022-D2C248195A", value => value.l === "l"],
    ["ACI-P042-L027-CD2308A77F", value => value.m === "m"],
    ["ACI-P043-L015-B702A24041", value => value.x === "x"],
    ["ACI-P043-L027-98A44BD022", value => value.y === "y"],
    ["ACI-P044-L030-6CCBCBA244", value => value.p === "p" && value.t === "t"],
    ["ACI-P044-L031-9E6CE9402F", value => value.p === "p" && value.t === "t"],
    ["ACI-P044-L041-AD9B08BD11", value => value.h === "h"],
    ["ACI-P045-L030-2527A41ED4", value => value.tl === "tl"],
    ["ACI-P045-L031-18802D0BDC", value => value.tl === "tl"],
    ["ACI-P045-L032-B859BA5D79", value => value.tz === "tz"],
    ["ACI-P045-L033-E0F5380BED", value => value.ch === "ch"],
]);

function run(ctx) {
    const s = createSuite("classical_lesson2_basic_spelling_jobs");
    const transcribe = segments => {
        const source = ctx.buildClassicalNahuatlTranscriptionSourceFrame({
            constituents: [{ segments }],
        });
        const application = ctx.executeClassicalGrammarApplicationRequest({
            operationId: "orthography:transcription",
            args: [source],
        });
        return {
            authorized: source.authorizationStatus === "authorized"
                && application.authorizationStatus === "authorized"
                && ctx.isClassicalNahuatlTranscriptionFrame(application.canonicalResult),
            result: application.canonicalResult,
        };
    };

    const vowelSegments = ["a", "ā", "e", "ē", "i", "ī", "o", "ō"];
    const simpleSegments = ["/l/", "/n/", "/m/", "/š/", "/y/", "/p/", "/t/", "/ʔ/"];
    const affricateSegments = ["/λ/", "/¢/", "/č/"];
    const runs = Object.fromEntries(
        [...vowelSegments, ...simpleSegments, ...affricateSegments]
            .map(segment => [
                segment,
                transcribe(vowelSegments.includes(segment)
                    ? [segment]
                    : ["a", segment, "a"]),
            ])
    );
    const surfaces = Object.fromEntries(
        Object.entries(runs).map(([segment, run]) => [
            segment,
            vowelSegments.includes(segment)
                ? run.result.surface
                : run.result.surface.slice(1, -1),
        ])
    );
    const firstCarrier = runs.a.result.carrierFrame;
    const observed = {
        system: {
            segmentalPhonemeCount: firstCarrier.systemFacts.segmentalPhonemeCount,
            vowelPhonemeCount: firstCarrier.systemFacts.vowelPhonemeCount,
            consonantPhonemeCount: firstCarrier.systemFacts.consonantPhonemeCount,
        },
        vowels: vowelSegments.map(segment => surfaces[segment]).join(""),
        shortVowels: ["a", "e", "i", "o"].map(segment => surfaces[segment]).join(""),
        longVowels: ["ā", "ē", "ī", "ō"].map(segment => surfaces[segment]).join(""),
        simple: simpleSegments.map(segment => surfaces[segment]).join(""),
        affricates: affricateSegments.map(segment => surfaces[segment]).join(""),
        l: surfaces["/l/"], m: surfaces["/m/"], x: surfaces["/š/"],
        y: surfaces["/y/"], p: surfaces["/p/"], t: surfaces["/t/"],
        h: surfaces["/ʔ/"], tl: surfaces["/λ/"], tz: surfaces["/¢/"],
        ch: surfaces["/č/"],
    };

    s.eq("the normal application writes the basic Lesson 2 inventory", {
        allAuthorized: Object.values(runs).every(run => run.authorized),
        observed,
    }, {
        allAuthorized: true,
        observed: {
            system: { segmentalPhonemeCount: 23, vowelPhonemeCount: 8, consonantPhonemeCount: 15 },
            vowels: "aāeēiīoō", shortVowels: "aeio", longVowels: "āēīō",
            simple: "lnmxypth", affricates: "tltzch",
            l: "l", m: "m", x: "x", y: "y", p: "p", t: "t", h: "h",
            tl: "tl", tz: "tz", ch: "ch",
        },
    });

    for (const [atomId, observes] of ATOM_OBSERVATIONS) {
        s.eq(`${atomId}: exact basic spelling job`, observes(observed), true);
        const mutations = [
            value => { value.system.segmentalPhonemeCount = 22; },
            value => { value.system.vowelPhonemeCount = 7; },
            value => { value.system.consonantPhonemeCount = 14; },
            ...["vowels", "shortVowels", "longVowels", "simple", "affricates", "l", "m", "x", "y", "p", "t", "h", "tl", "tz", "ch"]
                .map(key => value => { value[key] = `broken-${value[key]}`; }),
        ];
        let broken = null;
        for (const mutate of mutations) {
            const candidate = structuredClone(observed);
            mutate(candidate);
            if (!observes(candidate)) { broken = candidate; break; }
        }
        s.eq(`${atomId}: changing the required inventory or spelling fails`, Boolean(broken) && observes(broken), false);
    }

    return s;
}

module.exports = { run };
