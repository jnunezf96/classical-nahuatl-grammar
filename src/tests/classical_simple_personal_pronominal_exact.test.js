"use strict";

const { createSuite } = require("./runner");

const get = (value, path) => path.split(".").reduce((current, key) => current[key], value);

function run(ctx = {}) {
    const s = createSuite("classical_simple_personal_pronominal_exact");
    const facet = "p1653-the-latter-is-used-in-third-person-nncs";
    const source = ctx.buildClassicalSimplePersonalPronominalSourceSelectionSource({
        analysisDomain: "classical-simple-personal-pronominal-source-selection",
        selection: "claim-p1653",
        requestedFacet: facet,
        participantChoice: `claim-p1653:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalSimplePersonalPronominalSourceSelection(source);
    const frame = ownerResult.payload.definition;
    const observations = [
        ["ACI-P141-L027-F428CA2C4E-02", "simplePersonalSystem.canonicalFormula", "#Ø-Ø(yeh)Ø-Ø#"],
        ["ACI-P141-L027-F428CA2C4E-03", "simplePersonalSystem.readings.singularHumanMale", "he is an entity"],
        ["ACI-P141-L027-F428CA2C4E-04", "simplePersonalSystem.readings.singularHumanFemale", "she is an entity"],
        ["ACI-P141-L027-F428CA2C4E-05", "simplePersonalSystem.readings.singularNonanimate", "it is an entity"],
        ["ACI-P141-L027-F428CA2C4E-06", "simplePersonalSystem.readings.pluralNonanimate", "they are entities"],
        ["ACI-P142-L010-E2FD88C32D-02", "simplePersonalSystem.adverbialCollocationFinalMember", {
            preferred: "eh", licensedAlternative: "yeh",
        }],
    ];
    for (const [atomId, path, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, get(frame, path), expected);
        const hostile = JSON.parse(JSON.stringify(frame));
        const keys = path.split(".");
        const last = keys.pop();
        keys.reduce((current, key) => current[key], hostile)[last] = typeof expected === "object" ? { broken: true } : `${expected}-BROKEN`;
        s.no(`${atomId} rejects a broken ${path}`, JSON.stringify(get(hostile, path)) === JSON.stringify(expected));
    }
    s.eq("the simple personal owner is canonical", ownerResult.authorizationStatus, "authorized");
    return s;
}

module.exports = { run };
