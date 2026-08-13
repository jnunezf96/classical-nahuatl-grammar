"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson3_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson3-review-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter((record) =>
        [
            "lesson3-particle-structure-and-identity",
            "lesson3-particle-use-and-structural-limits",
            "lesson3-clause-introducing-particles",
        ].includes(record.reviewGroupId)
        && record.proposedDirection === "BOTH"
    );

    const result = (id, structuralRole = "") => ctx.requestClassicalParticleResult(
        id,
        structuralRole ? { structuralRole } : {}
    );
    const ca = result("l3-ca");
    const e = result("l3-e-vocative");
    const oc = result("l3-oc");
    const ahEmbed = result("l3-ah-negative", "compound-embed");
    const matrixBlocked = result("l3-ca", "matrix-stem");
    const principalBlocked = result("l3-ca", "principal-clause");
    const independentBlocked = result("l3-ca", "independent-utterance");
    const embedBlocked = result("l3-ca", "compound-embed");
    const adverbial = result("l3-oc", "adverbial-modifier");
    const exclamation = result("l3-o-interjection", "exclamation");
    const om = ctx.classifyClassicalNahuatlLesson3ParticleCandidate("om");
    const iuh = ctx.classifyClassicalNahuatlLesson3ParticleCandidate("iuh");
    const ihui = ctx.classifyClassicalNahuatlLesson3ParticleCandidate("(ihui)");

    const observations = new Map([
        ["ACI-P054-L003-DADB414F03", [ca.structureFrame.unitKind, ca.structureFrame.lexicalRank, ca.structureFrame.monomorphemic]],
        ["ACI-P054-L005-08BA89BEA7", [ca.structureFrame.internalMorphologicalStructure]],
        ["ACI-P054-L006-456782D2B7", [ca.structureFrame.normalSyllableCount]],
        ["ACI-P054-L006-456782D2B7-02", [ca.structureFrame.exceptionalSyllableCount]],
        ["ACI-P054-L008-317762E402", [e.structureFrame.clauseDependence]],
        ["ACI-P054-L008-7324BF122B", [e.lexicalFactFrame.vocativeProfile.attachmentHost]],
        ["ACI-P054-L011-283E5406D4", [e.surface, e.lexicalFactFrame.vocativeProfile.writingAttachment]],
        ["ACI-P054-L012-9E29E630D8", [e.structureFrame.stressAllowedWhenDependent]],
        ["ACI-P054-L012-6B6ED9C941", [e.lexicalFactFrame.vocativeProfile.stressBehavior, e.lexicalFactFrame.vocativeProfile.writtenStressAccent]],
        ["ACI-P054-L016-5836E6F329", [oc.lexicalFactFrame.meanings.includes("still")]],
        ["ACI-P054-L016-5836E6F329-02", [oc.lexicalFactFrame.meanings.includes("yet")]],
        ["ACI-P054-L016-5836E6F329-04", [om.unitKind, om.meaning, om.particleAllowed]],
        ["ACI-P054-L016-5836E6F329-05", [om.construction]],
        ["ACI-P054-L017-1E47CCBD5D-03", [iuh.unitKind, iuh.particleAllowed]],
        ["ACI-P054-L017-1E47CCBD5D-04", [iuh.meaning]],
        ["ACI-P054-L017-1E47CCBD5D-05", [iuh.sourceVerbstem]],
        ["ACI-P054-L017-1E47CCBD5D-06", [ihui.unitKind, ihui.meaning]],
        ["ACI-P054-L021-83FB00D900", [ca.structureFrame.degenerateClauseDefaultClassification, ca.structureFrame.reclassificationRequiresClearProof]],
        ["ACI-P054-L024-1FE8858464", [independentBlocked.authorizationStatus, independentBlocked.structuralRoleFrame.permitted]],
        ["ACI-P054-L025-0624917443", [principalBlocked.authorizationStatus, principalBlocked.structuralRoleFrame.permitted]],
        ["ACI-P054-L026-40A0D33D4C", [embedBlocked.authorizationStatus, embedBlocked.structuralRoleFrame.permitted]],
        ["ACI-P054-L026-69D42EEFD9", [ahEmbed.authorizationStatus, ahEmbed.structuralRoleFrame.permitted]],
        ["ACI-P054-L028-6FA07476B9", [matrixBlocked.authorizationStatus, matrixBlocked.structuralRoleFrame.matrixStemAllowed]],
        ["ACI-P055-L002-914BE57025", [adverbial.authorizationStatus, exclamation.authorizationStatus]],
        ["ACI-P055-L002-F7034A8A49", [result("l3-ca", "clause-introducer").authorizationStatus, result("l3-ca", "adverbial-modifier").authorizationStatus]],
    ]);
    const expectedObservations = new Map([
        ["ACI-P054-L003-DADB414F03", ["particle", "minor", true]],
        ["ACI-P054-L005-08BA89BEA7", ["none"]],
        ["ACI-P054-L006-456782D2B7", [1]],
        ["ACI-P054-L006-456782D2B7-02", [2]],
        ["ACI-P054-L008-317762E402", ["required"]],
        ["ACI-P054-L008-7324BF122B", ["preceding-nominal-nuclear-clause"]],
        ["ACI-P054-L011-283E5406D4", ["é", "obligatory"]],
        ["ACI-P054-L012-9E29E630D8", [true]],
        ["ACI-P054-L012-6B6ED9C941", ["attracts-stress", "required-unique-item"]],
        ["ACI-P054-L016-5836E6F329", [true]],
        ["ACI-P054-L016-5836E6F329-02", [true]],
        ["ACI-P054-L016-5836E6F329-04", ["numeral-combination-morpheme", "plus", false]],
        ["ACI-P054-L016-5836E6F329-05", ["numeral-combination"]],
        ["ACI-P054-L017-1E47CCBD5D-03", ["adverbialized-verbal-nuclear-clause", false]],
        ["ACI-P054-L017-1E47CCBD5D-04", ["thus"]],
        ["ACI-P054-L017-1E47CCBD5D-05", ["(ihui)"]],
        ["ACI-P054-L017-1E47CCBD5D-06", ["verbstem", "to be thus"]],
        ["ACI-P054-L021-83FB00D900", ["particle", true]],
        ["ACI-P054-L024-1FE8858464", ["blocked", false]],
        ["ACI-P054-L025-0624917443", ["blocked", false]],
        ["ACI-P054-L026-40A0D33D4C", ["blocked", false]],
        ["ACI-P054-L026-69D42EEFD9", ["authorized", true]],
        ["ACI-P054-L028-6FA07476B9", ["blocked", false]],
        ["ACI-P055-L002-914BE57025", ["authorized", "authorized"]],
        ["ACI-P055-L002-F7034A8A49", ["authorized", "blocked"]],
    ]);

    const clauseIntroducers = [
        ["ACI-P055-L006-14E2993193", "l3-ca", "ca", ["indeed", "in fact"]],
        ["ACI-P055-L011-AB2D82A37B", "l3-cuix", "cuix", ["perhaps", "perchance"]],
        ["ACI-P055-L012-0DAB15A93F", "l3-tla", "tlā", ["if", "in the event that", "in case", "provided that"]],
        ["ACI-P055-L013-FC34FCAEDA", "l3-ma", "mā", ["if only", "would that"]],
        ["ACI-P055-L014-DBD44C3C73", "l3-o-behold", "ō", ["here is", "here are", "here you have", "behold"]],
    ];
    for (const [atomId, particleId, surface, meanings] of clauseIntroducers) {
        const particleResult = result(particleId, "clause-introducer");
        observations.set(atomId, [
            particleResult.authorizationStatus,
            particleResult.surface,
            particleResult.lexicalFactFrame.functionScope,
            particleResult.lexicalFactFrame.placementScope,
            particleResult.lexicalFactFrame.meanings,
        ]);
        s.eq(`${atomId} observes its clause introducer through the normal application request`, observations.get(atomId), [
            "authorized", surface, "clause-introducer", "clause-initial", meanings,
        ]);
        const wrongParticle = result("l3-oc", "clause-introducer");
        s.no(`${atomId} rejects a broken identity, force, or placement`,
            JSON.stringify([
                wrongParticle.authorizationStatus,
                wrongParticle.surface,
                wrongParticle.lexicalFactFrame?.functionScope,
                wrongParticle.lexicalFactFrame?.placementScope,
                wrongParticle.lexicalFactFrame?.meanings,
            ]) === JSON.stringify(observations.get(atomId)));
    }

    s.eq("accepted writing atoms have one exact application observation", {
        expected: records.length,
        observed: observations.size,
        missing: records.filter((record) => !observations.has(record.atomId)).map((record) => record.atomId),
    }, { expected: 30, observed: 30, missing: [] });

    for (const record of records.filter((record) => !clauseIntroducers.some((row) => row[0] === record.atomId))) {
        const actual = observations.get(record.atomId);
        const expected = expectedObservations.get(record.atomId);
        s.eq(`${record.atomId} observes its accepted grammar job`, actual, expected);
        const broken = actual.slice();
        broken[broken.length - 1] = Symbol("broken-grammar-behavior");
        s.no(`${record.atomId} rejects its relevant behavior when broken`,
            JSON.stringify(actual) === JSON.stringify(broken));
    }

    s.eq("all clause introducers remain available in the one normal particle control",
        ctx.getClassicalNahuatlSentenceParticleEntries()
            .filter((entry) => entry.functionScope === "clause-introducer")
            .map((entry) => entry.id),
        ["l3-ca", "l3-cuix", "l3-tla", "l3-ma", "l3-o-behold", "l58-ahmo"]);
    s.eq("nonparticles stay out of the particle source path", [
        ctx.requestClassicalParticleResult("om").authorizationStatus,
        ctx.requestClassicalParticleResult("iuh").authorizationStatus,
    ], ["blocked", "blocked"]);

    return s;
}

module.exports = { run };
