"use strict";

const { createSuite } = require("./runner");

const EXACT_FACTS = Object.freeze([
    ["ACI-P037-L024-7765DF72EF", "ach-doubt-particle", "ach", "a-dictionary-error-can-arise-from-an-incorrect-entry-head"],
    ["ACI-P037-L024-616429102A", "ach-doubt-particle", "ach", "simeon-lists-achi-quin-as-an-entry-head"],
    ["ACI-P037-L024-616429102A-02", "ach-doubt-particle", "ach", "simeons-achi-quin-entry-redirects-to-achi"],
    ["ACI-P037-L025-34A5BD6934", "ach-doubt-particle", "ach", "the-see-achi-direction-is-dictionary-provenance-only"],
    ["ACI-P037-L025-7831CB7A3D", "ach-doubt-particle", "ach", "simeons-entry-includes-the-missegmented-sequence-achi-quin"],
    ["ACI-P037-L025-7831CB7A3D-02", "ach-doubt-particle", "ach", "simeon-glosses-achi-quin-as-je-ne-sais"],
    ["ACI-P037-L025-7831CB7A3D-03", "ach-doubt-particle", "ach", "simeon-glosses-achi-quin-as-on-ne-sait-quand"],
    ["ACI-P037-L025-7831CB7A3D-04", "ach-doubt-particle", "ach", "je-ne-sais-means-i-do-not-know"],
    ["ACI-P037-L025-7831CB7A3D-05", "ach-doubt-particle", "ach", "on-ne-sait-quand-means-it-is-not-known-when"],
    ["ACI-P037-L026-94063CE428", "ach-doubt-particle", "ach", "molina-witnesses-the-compressed-entry-head-achiquin"],
    ["ACI-P037-L026-94063CE428-02", "ach-doubt-particle", "ach", "molina-glosses-achiquin-as-no-se-quando-si-acaecio-esso"],
    ["ACI-P037-L027-E8E4805B28", "ach-doubt-particle", "ach", "the-molina-gloss-means-i-do-not-know-when-that-happened"],
    ["ACI-P037-L028-9C6EB3B02B", "ach-doubt-particle", "ach", "achiquin-must-be-analyzed-as-ach-iquin"],
    ["ACI-P037-L030-ED1CDB600C", "achi-ach-liaison-contrast", "achi→ach/_iuh|iuhqui", "simeon-confused-achi-somewhat-with-ach-i-do-not-know"],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_ach_iquin_particle_jobs");
    const achResult = ctx.buildClassicalNahuatlParticleResultFrame(
        ctx.buildClassicalNahuatlParticleSourceFrame("l3-ach")
    );
    const achiResult = ctx.buildClassicalNahuatlParticleResultFrame(
        ctx.buildClassicalNahuatlParticleSourceFrame("cn-achi")
    );
    const evaluate = (kind, choice) => {
        const source = ctx.buildClassicalParticleLexicalDistinctionSource({
            analysisDomain: "classical-particle-lexical-distinction",
            requestedAnalysisKind: kind,
            participantChoice: choice,
            prerequisites: { achResult, achiResult },
        });
        return ctx.executeClassicalGrammarApplicationRequest({
            operationId: "classical.particle.lexical-distinction.authorize",
            args: [source],
            languageId: "classical-nahuatl",
        }).canonicalResult;
    };

    s.eq("the ach iquin particle group contains 14 atoms", EXACT_FACTS.length, 14);
    for (const [atomId, kind, choice, fact] of EXACT_FACTS) {
        const result = evaluate(kind, choice);
        const exact = value => value.authorizationStatus === "authorized"
            && value.analysisKind === kind
            && value.participantChoice === choice
            && value.facts.includes(fact)
            && value.payload?.dictionaryHeadAuthority === false
            && (kind !== "ach-doubt-particle" || value.payload?.canonicalSequence?.join(" ") === "ach iquin")
            && (kind !== "achi-ach-liaison-contrast" || value.payload?.liaisonForm === "ach");
        s.ok(`${atomId} performs its exact particle job`, exact(result));
        s.ok(`mutation:${atomId} fails when its exact particle fact is removed`, !exact({ ...result, facts: result.facts.filter(value => value !== fact) }));
        const brokenPayload = kind === "ach-doubt-particle"
            ? { ...result.payload, canonicalSequence: ["achi", "quin"] }
            : { ...result.payload, liaisonForm: "achi" };
        s.ok(`mutation:${atomId} fails when the particle identity or boundary is broken`, !exact({ ...result, payload: brokenPayload }));
    }
    return s;
}

module.exports = { run };
