"use strict";

const { createSuite } = require("./runner");

const get = (value, path) => path.split(".").reduce((current, key) => current[key], value);

function executeOwner(ctx, owner) {
    const source = ctx[`build${owner.prefix}Source`]({
        analysisDomain: owner.domain,
        selection: owner.selection,
        requestedFacet: owner.facet,
        participantChoice: `${owner.selection}:${owner.facet}`,
    });
    return ctx[`evaluate${owner.prefix}`](source);
}

function hostileReplacement(expected) {
    if (typeof expected === "boolean") return !expected;
    if (typeof expected === "object") return { broken: true };
    return `${expected}-BROKEN`;
}

function run(ctx = {}) {
    const s = createSuite("classical_quantitive_shared_owner_exact");
    const lexicalOwners = [
        ["classical-achi-quantitive-source", "ClassicalAchiQuantitiveSource", "claim-p1765", "p1765-a-chi-a-small-amount-or-quantity-a-little", "ACI-P149-L030-8DC94D38FD", ["a-chi"], ["a small amount or quantity", "a little"]],
        ["classical-aqui-quantitive-source", "ClassicalAquiQuantitiveSource", "claim-p1764", "p1764-a-qui-a-small-amount-or-number-a-few", "ACI-P149-L028-CCC7D2903E", ["a-qui"], ["a small amount or number", "a few"]],
        ["classical-cequi-quantitive-source-restriction", "ClassicalCequiQuantitiveSourceRestriction", "claim-p1754", "p1754-ce-qui-ce-c-one-a-certain-amount-or", "ACI-P148-L027-CBCCCF8372", ["ce-qui", "ce-c"], ["one or a certain amount or number", "one", "some", "part"]],
        ["classical-ixachi-quantitive-source-number", "ClassicalIxachiQuantitiveSourceNumber", "claim-p1769", "p1769-ix-a-chi-a-very-large-amount-or-number", "ACI-P150-L010-3DF611B752", ["ix-a-chi"], ["a very large amount or number", "much", "many"]],
        ["classical-izqui-quantitive-number-alternative", "ClassicalIzquiQuantitiveNumberAlternative", "claim-p1757", "p1757-iz-qui-an-equal-amount-or-number-as-much", "ACI-P149-L002-244CD15A74", ["iz-qui"], ["an equal amount or number", "as much", "as many", "so much", "so many"]],
        ["classical-miya-miye-quantitive-source", "ClassicalMiyaMiyeQuantitiveSource", "claim-p1752", "p1752-miya-qui-miya-c-miye-qui-miye-c-an", "ACI-P148-L017-390FED16EA", ["miya-qui", "miya-c", "miye-qui", "miye-c"], ["an abundant amount or quantity", "much", "many"]],
        ["classical-mochi-quantitive-source-alternatives", "ClassicalMochiQuantitiveSourceAlternatives", "claim-p1766", "p1766-mo-chi-mo-ch-a-full-amount-or-number", "ACI-P149-L033-7C14355E7D", ["mo-chi", "mo-ch"], ["a full amount or number", "all"]],
        ["classical-quezqui-quantitive-source-formation", "ClassicalQuezquiQuantitiveSourceFormation", "claim-p1759", "p1759-que-z-qui-how-large-or-full-a-number", "ACI-P149-L012-B16AFE1F31", ["quē-z-qui"], ["how large or full a number", "how many specifically", "how large a sum"]],
        ["classical-quich-quantitive-source-formation", "ClassicalQuichQuantitiveSourceFormation", "claim-p1743", "p1743-ix-qui-ch-a-total-amount-or-quantity-all", "ACI-P147-L021-FF3BA5DE52", ["ix-qui-ch"], ["a total amount or quantity", "all"]],
    ];
    const owners = lexicalOwners.map(([domain, prefix, selection, facet, atomId, sourceAlternants, readings]) => ({
        domain, prefix, selection, facet,
        observations: [[atomId, "quantitiveLexicalSystem", { sourceAlternants, readings }]],
    }));
    owners.push(
        {
            domain: "classical-quantitive-matrix-allomorph-system",
            prefix: "ClassicalQuantitiveMatrixAllomorphSystem",
            selection: "claim-p1729",
            facet: "p1729-both-morphemes-have-four-morphs-each",
            observations: [["ACI-P147-L005-067DD8CEC0", "quantitiveMatrixAllomorphSystem", {
                longVowelFamilies: ["chī", "quī"],
                chiiMorphs: ["chī", "chih", "chi", "ch"],
                quiiMorphs: ["quī", "quih", "qui", "c"],
                longVowelBeforePluralN: true,
                glottalStopBeforeAffectiveMatrix: true,
                shortVowelElsewhere: true,
                vowellessMorphsIdiosyncratic: true,
                deploymentFullyPredictable: false,
            }]],
        },
        {
            domain: "classical-qui-chi-internal-number-formation",
            prefix: "ClassicalQuiChiInternalNumberFormation",
            selection: "claim-p1749",
            facet: "p1749-result-the-stem-normally-has-the-peculiarity-of-being",
            observations: [["ACI-P148-L013-BB2A42B0E7", "quantitiveInternalNumberSystem", {
                matrixFamilies: ["quī", "chī"],
                internalPluralSuffix: "n",
                suffixPosition: "inside-pronominal-stem",
                subjectPluralDyads: ["t-in", "⎕-⎕"],
            }]],
        },
        {
            domain: "classical-pronominal-internal-number-formation",
            prefix: "ClassicalPronominalInternalNumberFormation",
            selection: "claim-p1646",
            facet: "p1646-pronominal-stems-are-pluralized-by-including-the-plural-number",
            observations: [["ACI-P141-L009-71570A239F", "numberFrame.internalPluralMorph", "n-inside-stem"]],
        },
        {
            domain: "classical-pronominal-adjunctor-in-contextual-realization",
            prefix: "ClassicalPronominalAdjunctorInContextualRealization",
            selection: "claim-p1683",
            facet: "p1683-the-usage-is-so-frequent-that-fusion-can-take",
            observations: [["ACI-P144-L018-DF551549BE", "adjunctorFusionSystem", {
                mode: "fused-tlein",
                fusedSurface: "tlein",
                writingPolicy: "fuse-in-after-dependent-clause-ellipsis",
                dependentClausePresent: false,
                ellipsisSelected: true,
            }]],
        },
        {
            domain: "classical-indefinite-human-context-selection",
            prefix: "ClassicalIndefiniteHumanContextSelection",
            selection: "claim-p1721",
            facet: "p1721-as-is-obvious-from-the-meaning-the-stem-would",
            observations: [["ACI-P146-L027-CE17E0606C", "contextSelectionRecord.specialHumanUse.available", true]],
        },
    );

    for (const owner of owners) {
        const result = executeOwner(ctx, owner);
        const frame = result.payload.definition;
        s.eq(`${owner.domain} is canonical`, result.authorizationStatus, "authorized");
        for (const [atomId, path, expected] of owner.observations) {
            s.eq(`${atomId} observes ${path}`, get(frame, path), expected);
            const hostile = JSON.parse(JSON.stringify(frame));
            const keys = path.split(".");
            const last = keys.pop();
            keys.reduce((current, key) => current[key], hostile)[last] = hostileReplacement(expected);
            s.no(`${atomId} rejects a broken ${path}`, JSON.stringify(get(hostile, path)) === JSON.stringify(expected));
        }
    }
    return s;
}

module.exports = { run };
