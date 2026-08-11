"use strict";

const { createSuite } = require("./runner");

function ownerFrame(ctx, prefix, domain, selection, facet) {
    const source = ctx[`build${prefix}Source`]({
        analysisDomain: domain,
        selection,
        requestedFacet: facet,
        participantChoice: `${selection}:${facet}`,
    });
    return ctx[`evaluate${prefix}`](source);
}

function run(ctx = {}) {
    const s = createSuite("classical_nnc_subject_paradigm_projection_exact");
    const absolutive = ownerFrame(ctx,
        "ClassicalAbsolutiveSubjectPronounParadigm",
        "classical-absolutive-subject-pronoun-paradigm",
        "claim-p1290",
        "p1290-each-of-the-persons-has-four-variant-personal-pronoun",
    );
    const possessive = ownerFrame(ctx,
        "ClassicalPossessiveSubjectPronounParadigm",
        "classical-possessive-subject-pronoun-paradigm",
        "claim-p1379",
        "p1379-these-personal-pronouns-can-occur-as-a-subject-only",
    );
    const expectedEquivalents = {
        "first-singular": ["I"],
        "first-plural": ["we"],
        "second-singular": ["you (singular)"],
        "second-plural": ["you (plural)"],
        "third-singular-or-common": ["he", "she", "it", "they"],
        "third-plural": ["they"],
    };
    const observations = [
        ["ACI-P116-L033-7862336BFD", absolutive.payload.definition.contractSubjectParadigmComplete, true],
        ["ACI-P116-L035-0FFEC06FF8", absolutive.payload.definition.contractSubjectEnglishEquivalents, expectedEquivalents],
        ["ACI-P121-L009-6F36DD17BE", possessive.payload.definition.contractSubjectParadigmComplete, true],
        ["ACI-P121-L011-6338924872", possessive.payload.definition.contractSubjectEnglishEquivalents, expectedEquivalents],
    ];
    for (const [atomId, actual, expected] of observations) {
        s.eq(`${atomId} observes the complete typed subject paradigm Result`, actual, expected);
        const hostile = typeof expected === "boolean" ? false : { ...expected, "third-plural": ["it"] };
        s.no(`${atomId} rejects a broken subject paradigm projection`, JSON.stringify(hostile) === JSON.stringify(expected));
    }
    s.eq("both state-specific owners execute", [absolutive.authorizationStatus, possessive.authorizationStatus], ["authorized", "authorized"]);
    return s;
}

module.exports = { run };
