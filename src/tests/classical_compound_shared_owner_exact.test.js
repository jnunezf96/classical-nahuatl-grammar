"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_compound_shared_owner_exact");
    const facet = "p2751-when-the-predicate-of-a-vnc-is-incorporated-into";
    const source = ctx.buildClassicalCompoundValenceCombinationSystemSource({
        analysisDomain: "classical-compound-valence-combination-system",
        selection: "claim-p2751",
        requestedFacet: facet,
        participantChoice: `claim-p2751:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalCompoundValenceCombinationSystem(source);
    const frame = ownerResult.payload.definition;
    const recursive = frame.cases.recursiveEmbed;
    const observations = [
        ["ACI-P252-L026-9B812B7DCB-02", "contract matrix structural governance", {
            matrixDeterminesCompoundKind: frame.contract.matrixDeterminesCompoundKind,
            compoundTypes: frame.contract.compoundTypes,
        }, { matrixDeterminesCompoundKind: true, compoundTypes: ["linked", "integrated"] }],
        ["ACI-P252-L026-9B812B7DCB-03", "contract linked matrix outcome", {
            matrixDeterminesCompoundKind: frame.contract.matrixDeterminesCompoundKind,
            licensed: frame.contract.compoundTypes.includes("linked"),
        }, { matrixDeterminesCompoundKind: true, licensed: true }],
        ["ACI-P252-L026-9B812B7DCB-04", "contract integrated matrix outcome", {
            matrixDeterminesCompoundKind: frame.contract.matrixDeterminesCompoundKind,
            licensed: frame.contract.compoundTypes.includes("integrated"),
        }, { matrixDeterminesCompoundKind: true, licensed: true }],
        ["ACI-P251-L024-EE58159F0B-02", "contract typed VNC embed", {
            firstOperation: frame.contract.operationOrder[0],
            embedStem: frame.cases.basic.facts.embedStem,
            sourcePredicatePreserved: frame.cases.basic.facts.sourcePredicatePreserved,
        }, { firstOperation: "authorized-typed-embed-vnc", embedStem: "chōca", sourcePredicatePreserved: true }],
        ["ACI-P251-L032-6F31831A04-02", "contract embed valence governance", {
            contract: frame.contract.embedDeterminesCompoundValence,
            caseFact: frame.cases.basic.facts.embedDeterminesCompoundValence,
            sourceValence: frame.cases.basic.facts.embedSourceValence,
            targetValence: frame.cases.basic.targetValence,
        }, { contract: true, caseFact: true, sourceValence: "intransitive", targetValence: "intransitive" }],
        ["ACI-P252-L032-0C3F5A758B-02", "contract connective allomorph conditioning", frame.contract.connectiveAllomorphs,
            { beforeVowel: "t", beforeConsonant: "ti", supportiveVowelSeparatesConstituents: true }],
        ["ACI-P265-L018-457D21F4B2", "cases.recursiveEmbed recursive operation", {
            canonical: recursive.authorizationStatus,
            ruleFamily: recursive.ruleFamily,
            recursiveEmbed: recursive.facts.recursiveEmbed,
        }, { canonical: "authorized", ruleFamily: "compound-recursion", recursiveEmbed: true }],
        ["ACI-P265-L018-457D21F4B2-02", "cases.recursiveEmbed compound-as-embed", {
            sourceStem: recursive.sourceStem,
            targetStem: recursive.targetStem,
            recursiveEmbed: recursive.facts.recursiveEmbed,
        }, { sourceStem: "chōca-ti-nen", targetStem: "chōca-ti-nen-ti-yah", recursiveEmbed: true }],
    ];
    for (const [atomId, path, actual, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, actual, expected);
        const hostile = JSON.parse(JSON.stringify(actual));
        hostile[Object.keys(hostile)[0]] = "BROKEN";
        s.no(`${atomId} rejects a mutation of ${path}`, JSON.stringify(hostile) === JSON.stringify(expected));
    }
    s.eq("the shared compound Result is authorized", ownerResult.authorizationStatus, "authorized");
    return s;
}

module.exports = { run };
