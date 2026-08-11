"use strict";

const { createSuite } = require("./runner");

const get = (value, path) => path.split(".").reduce((current, key) => current[key], value);

function run(ctx = {}) {
    const s = createSuite("classical_adverbial_preterit_full_stem_exact");
    const facet = "p4204-other-root-plus-ya-verbs-use-the-full-stem";
    const source = ctx.buildClassicalAdverbialPreteritAgentiveFullStemSource({
        analysisDomain: "classical-adverbial-preterit-agentive-full-stem",
        selection: "claim-p4204",
        requestedFacet: facet,
        participantChoice: `claim-p4204:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalAdverbialPreteritAgentiveFullStem(source);
    const frame = ownerResult.payload.definition;
    const observations = [
        ["ACI-P456-L021-EF16B29666-03", "cases.preteritFullStem.lexicalReadings.0", "calmly"],
        ["ACI-P456-L021-EF16B29666-04", "cases.preteritFullStem.lexicalReadings.1", "peacefully"],
        ["ACI-P456-L021-EF16B29666-05", "cases.preteritFullStem.sourceAnalysis", {
            sourceStem: "yōco-ya",
            sourceStemStrategy: "full-root-plus-ya",
            sourceAttested: false,
            nonattestationBlocksDerivation: false,
            preteritAgentiveStem: "yōco-x-Ø-qui",
            preteritAgentiveReading: "one who has become well formed",
        }],
        ["ACI-P456-L021-EF16B29666-07", "cases.preteritFullStem.sourceAnalysis.nonattestationBlocksDerivation", false],
        ["ACI-P456-L021-EF16B29666-09", "cases.preteritFullStem.sourceAnalysis.preteritAgentiveReading", "one who has become well formed"],
    ];
    for (const [atomId, path, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, get(frame, path), expected);
        const hostile = JSON.parse(JSON.stringify(frame));
        const keys = path.split(".");
        const last = keys.pop();
        keys.reduce((current, key) => current[key], hostile)[last] = typeof expected === "boolean"
            ? !expected
            : (typeof expected === "object" ? { broken: true } : `${expected}-BROKEN`);
        s.no(`${atomId} rejects a broken ${path}`, JSON.stringify(get(hostile, path)) === JSON.stringify(expected));
    }
    s.eq("the full-stem owner is canonical", ownerResult.authorizationStatus, "authorized");
    s.eq("the full-stem result is engine-issued", get(frame, "cases.preteritFullStem.canonicalResult"), true);
    return s;
}

module.exports = { run };
