"use strict";

const { createSuite } = require("./runner");

const get = (value, path) => path.split(".").reduce((current, key) => current[key], value);

function executeOwner(ctx, { prefix, domain, selection, facet }) {
    const source = ctx[`build${prefix}Source`]({
        analysisDomain: domain,
        selection,
        requestedFacet: facet,
        participantChoice: `${selection}:${facet}`,
    });
    return ctx[`evaluate${prefix}`](source);
}

function run(ctx = {}) {
    const s = createSuite("classical_pronominal_shared_owner_exact");
    const owners = [
        {
            prefix: "ClassicalPronominalNncFamilySystem",
            domain: "classical-pronominal-nnc-family-system",
            selection: "claim-p1643",
            facet: "p1643-there-is-a-special-kind-of-nnc-which-is",
            observations: [
                ["ACI-P141-L005-7F2425F8BF", "pronominalFamilySystem.usualEnglishProjection", "pronoun-word"],
                ["ACI-P141-L005-327BF4AB5E", "pronominalFamilySystem.nahuatlStructuralCategory", "nominal-nuclear-clause"],
            ],
        },
        {
            prefix: "ClassicalEntitivePronominalSubtypeSystem",
            domain: "classical-entitive-pronominal-subtype-system",
            selection: "claim-p1648",
            facet: "p1648-there-are-four-subtypes-of-entitive-pronominal-nncs-personal",
            observations: [
                ["ACI-P163-L036-69F6FCD1F7-03", "pronominalFamilySystem.structurallyEquivalentToIsolatedEnglishPronoun", false],
            ],
        },
        {
            prefix: "ClassicalPersonalPronominalContextFormation",
            domain: "classical-personal-pronominal-context-formation",
            selection: "claim-p1671",
            facet: "p1671-these-personal-pronominal-nncs-occur-in-an-idiomatic-construction",
            observations: [
                ["ACI-P143-L024-DC4CC9D60E", "personalContextSystem.quenMachHuelSynonymousWithLesson11Construction", true],
                ["ACI-P144-L003-222ED155A4", "personalContextSystem.supplementRepeatsBasicAffixalPersonInformation", true],
                ["ACI-P144-L003-222ED155A4-02", "personalContextSystem.supplementalEnglishProjection", "emphatic-wordal-personal-pronoun"],
            ],
        },
        {
            prefix: "ClassicalDemonstrativePronominalSourceNumber",
            domain: "classical-demonstrative-pronominal-source-number",
            selection: "claim-p1710",
            facet: "p1710-when-plural-the-number-dyad-is-filled-with-see",
            observations: [
                ["ACI-P146-L008-FAA8CA5738-02", "demonstrativeNumberVariants", ["inon", "ini", "ino"]],
            ],
        },
        {
            prefix: "ClassicalIndefinitePronominalSourceFormation",
            domain: "classical-indefinite-pronominal-source-formation",
            selection: "claim-p1720",
            facet: "p1720-itl-ah-something-the-embedded-constituent-itl-is-related",
            observations: [
                ["ACI-P146-L025-8BFBD677DB-02", "indefiniteSomethingReference", {
                    referent: "nonspecific-nonhuman-thing",
                    existenceStatus: "questioned",
                }],
            ],
        },
        {
            prefix: "ClassicalQuantitivePronominalSourceInventory",
            domain: "classical-quantitive-pronominal-source-inventory",
            selection: "claim-p1724",
            facet: "p1724-quantitive-pronominal-nncs-can-also-function-as-quantitive-adjectival",
            observations: [
                ["ACI-P147-L002-DBC633B763-04", "quantitivePhonology.miyahuaLongABeforeWa", true],
            ],
        },
    ];

    for (const owner of owners) {
        const result = executeOwner(ctx, owner);
        const frame = result.payload.definition;
        s.eq(`${owner.domain} is canonical`, result.authorizationStatus, "authorized");
        for (const [atomId, path, expected] of owner.observations) {
            s.eq(`${atomId} observes ${path}`, get(frame, path), expected);
            const hostile = JSON.parse(JSON.stringify(frame));
            const keys = path.split(".");
            const last = keys.pop();
            keys.reduce((current, key) => current[key], hostile)[last] = typeof expected === "boolean"
                ? !expected
                : (typeof expected === "object" ? { broken: true } : `${expected}-BROKEN`);
            s.no(`${atomId} rejects a broken ${path}`, JSON.stringify(get(hostile, path)) === JSON.stringify(expected));
        }
    }
    return s;
}

module.exports = { run };
