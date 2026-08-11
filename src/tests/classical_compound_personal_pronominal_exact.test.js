"use strict";

const { createSuite } = require("./runner");

const get = (value, path) => path.split(".").reduce((current, key) => current[key], value);

function run(ctx = {}) {
    const s = createSuite("classical_compound_personal_pronominal_exact");
    const facet = "p1663-the-compound-stem-also-has-two-shapes-eh-hua";
    const source = ctx.buildClassicalCompoundPersonalPronominalNumberFormationSource({
        analysisDomain: "classical-compound-personal-pronominal-number-formation",
        selection: "claim-p1663",
        requestedFacet: facet,
        participantChoice: `claim-p1663:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalCompoundPersonalPronominalNumberFormation(source);
    const frame = ownerResult.payload.definition;
    const commonReadings = [
        ["03", "personalCompoundReadings.singularHumanMale.0", "he is an entity"],
        ["04", "personalCompoundReadings.singularHumanMale.1", "he is the entity"],
        ["05", "personalCompoundReadings.singularHumanFemale.0", "she is an entity"],
        ["06", "personalCompoundReadings.singularHumanFemale.1", "she is the entity"],
        ["07", "personalCompoundReadings.singularNonanimate.0", "it is an entity"],
        ["08", "personalCompoundReadings.singularNonanimate.1", "it is the entity"],
        ["09", "personalCompoundReadings.pluralNonanimate.0", "they are entities"],
        ["10", "personalCompoundReadings.pluralNonanimate.1", "they are the entities"],
    ];
    const observations = [
        ["ACI-P142-L029-6625F350A5-02", "personalCompoundVariants.sounded.formulaRealization", "#Ø-Ø(yeh-huā)tl-Ø#"],
        ...commonReadings.map(([suffix, path, expected]) => [`ACI-P142-L029-6625F350A5-${suffix}`, path, expected]),
        ["ACI-P143-L003-B17C446543", "translationValuesPreservedAcrossNumberVariants", true],
        ["ACI-P143-L007-2F0A19B5E9-02", "personalCompoundVariants.silent.formulaRealization", "#Ø-Ø(yeh-huā)⎕-Ø#"],
        ...commonReadings.map(([suffix, path, expected]) => [`ACI-P143-L007-2F0A19B5E9-${suffix}`, path, expected]),
    ];
    for (const [atomId, path, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, get(frame, path), expected);
        const hostile = JSON.parse(JSON.stringify(frame));
        const keys = path.split(".");
        const last = keys.pop();
        keys.reduce((current, key) => current[key], hostile)[last] = typeof expected === "boolean" ? !expected : `${expected}-BROKEN`;
        s.no(`${atomId} rejects a broken ${path}`, JSON.stringify(get(hostile, path)) === JSON.stringify(expected));
    }
    s.eq("the owner executes one typed pronominal operation for both number variants", {
        ownerStatus: ownerResult.authorizationStatus,
        frameStatus: frame.authorizationStatus,
        storedExampleAuthority: frame.storedExampleAuthority,
    }, { ownerStatus: "authorized", frameStatus: "authorized", storedExampleAuthority: false });
    return s;
}

module.exports = { run };
