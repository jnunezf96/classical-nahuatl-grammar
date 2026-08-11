"use strict";

const { createSuite } = require("./runner");

const get = (value, path) => path.split(".").reduce((current, key) => current[key], value);

function run(ctx = {}) {
    const s = createSuite("classical_interrogative_pronominal_subject_exact");
    const facet = "p1677-an-nnc-ca-n-express-an-information-question-that";
    const source = ctx.buildClassicalInterrogativePronominalSourceSystemSource({
        analysisDomain: "classical-interrogative-pronominal-source-system",
        selection: "claim-p1677",
        requestedFacet: facet,
        participantChoice: `claim-p1677:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalInterrogativePronominalSourceSystem(source);
    const frame = ownerResult.payload.definition;
    const observations = [
        ["ACI-P144-L012-F0288997A4-02", "interrogativeSystem.tlehSubjectParadigm.1sg.authorizationStatus", "authorized"],
        ["ACI-P144-L012-F0288997A4-03", "interrogativeSystem.tlehSubjectParadigm.1pl.authorizationStatus", "authorized"],
        ["ACI-P144-L012-F0288997A4-04", "interrogativeSystem.tlehSubjectParadigm.2sg.authorizationStatus", "authorized"],
        ["ACI-P144-L012-F0288997A4-05", "interrogativeSystem.tlehSubjectParadigm.2pl.authorizationStatus", "authorized"],
        ["ACI-P144-L012-F0288997A4-06", "interrogativeSystem.tlehSubjectParadigm.3sg.authorizationStatus", "authorized"],
        ["ACI-P144-L012-F0288997A4-07", "interrogativeSystem.tlehSubjectParadigm.3pl.authorizationStatus", "authorized"],
        ["ACI-P145-L029-8BFA3914CD-02", "interrogativeSystem.acWithDependentClause", {
            principalClause: "āc",
            adjunctClauseIntroducedBy: "in",
            writingPolicy: "write-pronominal-nnc-and-in-separately",
            traditionalSolidSpellingCannotOverrideClauseStructure: true,
        }],
    ];
    for (const [atomId, path, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, get(frame, path), expected);
        const hostile = JSON.parse(JSON.stringify(frame));
        const keys = path.split(".");
        const last = keys.pop();
        keys.reduce((current, key) => current[key], hostile)[last] = typeof expected === "object" ? { broken: true } : "blocked";
        s.no(`${atomId} rejects a broken ${path}`, JSON.stringify(get(hostile, path)) === JSON.stringify(expected));
    }
    s.eq("the interrogative family operation is canonical", ownerResult.authorizationStatus, "authorized");
    return s;
}

module.exports = { run };
