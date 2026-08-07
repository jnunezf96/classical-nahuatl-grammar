"use strict";

const SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";

function claim(id, lesson, section, lineStart, lineEnd, category, axes) {
    return Object.freeze({
        id,
        lesson,
        section,
        sourceDocument: SOURCE_DOCUMENT,
        transcriptionLineStart: lineStart,
        transcriptionLineEnd: lineEnd,
        category,
        disposition: "canonical-adverbial-adjunction-rule",
        implementationStatus: "implemented",
        canonicalObjectIds: Object.freeze([
            "adverbial-adjunction-source-unit",
            "adverbial-adjunction-relation-profile",
            "adverbial-adjunction-composition",
        ]),
        axes: Object.freeze(axes),
        proofFamilies: Object.freeze([
            "positive",
            "negative",
            "interaction",
            "hostile-authority",
            "selected-result",
            "finite-surface",
        ]),
        lessonMetadataAuthority: false,
        sourceTextAuthority: false,
        displayTextAuthority: false,
    });
}

const CLASSICAL_NAHUATL_LESSONS49_50_SOURCE_CLAIMS = Object.freeze([
    claim("l49-01-simple-first-degree", 49, "49.1.1", 20712, 20764, "simple-first-degree", [
        "structure.simple", "order.modifier-head", "order.head-modifier",
        "degree.first", "domain.place", "domain.duration", "domain.manner",
        "domain.compared-manner", "domain.means",
    ]),
    claim("l49-02-compared-manner-contrast", 49, "49.1.1.d", 20742, 20757, "compared-manner-contrast", [
        "contrast.compared-manner", "contrast.supplementary-subject",
        "contrast.metaphorical", "ambiguity.third-singular",
        "contrast.incorporated-adverb-counterpart",
    ]),
    claim("l49-03-second-degree", 49, "49.1.2", 20765, 20791, "simple-second-degree", [
        "degree.second", "domain.place", "domain.time", "domain.manner",
        "domain.compared-manner",
    ]),
    claim("l49-04-multiple-nucleus", 49, "49.2", 20792, 20795, "multiple-nucleus", [
        "nucleus.adjectival-modification", "nucleus.supplementation",
        "nucleus.combination",
    ]),
    claim("l49-05-multiple-nucleus-examples", 49, "49.2", 20796, 20829, "multiple-nucleus", [
        "nucleus.adjectival-modification", "nucleus.supplementation",
        "nucleus.combination", "domain.place", "domain.time", "domain.manner",
    ]),
    claim("l49-06-complex-overview", 49, "49.3", 20830, 20833, "recursive-overview", [
        "structure.complex", "recursion.head", "recursion.modifier", "recursion.both",
    ]),
    claim("l49-07-head-recursion", 49, "49.4", 20834, 20858, "head-recursion", [
        "recursion.head", "recursion.unbounded",
    ]),
    claim("l49-08-interrogative-recursion", 49, "49.4", 20859, 20887, "interrogative-order", [
        "question.inherent-initial", "question.cuix-optional",
        "question.cuix-initial-without-inherent", "question.mach",
        "question.rhetorical-surrender",
    ]),
    claim("l49-09-modifier-recursion", 49, "49.5", 20888, 20902, "modifier-recursion", [
        "recursion.modifier",
    ]),
    claim("l49-10-lexicalized-collocations", 49, "49.5", 20903, 20936, "collocations", [
        "collocation.particle-adverbial", "collocation.negative",
        "collocation.traditional-solid-spelling",
    ]),
    claim("l49-11-intensifiers", 49, "49.6", 20937, 20994, "intensifiers", [
        "intensifier.precedes-head", "intensifier.adverbial-head",
        "intensifier.adjectival-nnc-head", "intensifier.lexicalized-collocation",
    ]),
    claim("l49-12-modifier-internal-recursion", 49, "49.7", 20995, 21008, "modifier-internal-recursion", [
        "recursion.modifier-internal",
    ]),
    claim("l49-13-apposition", 49, "49.8", 21009, 21039, "place-time-apposition", [
        "recursion.appositive", "apposition.general-before-specific",
        "domain.place", "domain.time",
    ]),
    claim("l49-14-apposition-conjunction-contrast", 49, "49.8 note", 21040, 21047, "apposition-conjunction-contrast", [
        "contrast.modification-conjunction",
    ]),
    claim("l49-15-both-recursion", 49, "49.9", 21048, 21057, "both-recursion", [
        "recursion.both", "recursion.unbounded",
    ]),
    claim("l49-16-adverbial-principal", 49, "49.10.1-3", 21058, 21116, "adverbial-principal", [
        "rank.adverbial-principal", "domain.time", "domain.place", "domain.manner",
    ]),
    claim("l49-17-interrogative-principal", 49, "49.10.4", 21117, 21145, "interrogative-principal", [
        "rank.interrogative-upgrade", "question.inherent-initial",
        "question.adjunctor-in", "question.quen-exception",
        "question.included-loses-force",
    ]),
    claim("l50-01-nonadverbialized-overview", 50, "50.1", 21151, 21158, "nonadverbialized-adjoined-unit", [
        "degree.nonadverbialized", "relation.ten-types",
    ]),
    claim("l50-02-time-implicit", 50, "50.2.1", 21159, 21223, "time-implicit", [
        "relation.time", "time.implicit", "time.iuh-state",
        "time.iuhqui", "time.ellipsis", "time.one-out-of-number",
    ]),
    claim("l50-03-time-explicit", 50, "50.2.2", 21224, 21258, "time-explicit", [
        "relation.time", "time.explicit", "time.ihcuac", "time.ic",
        "time.oc-ic", "time.other-expression",
    ]),
    claim("l50-04-time-corroborating", 50, "50.2.3", 21259, 21292, "time-corroborating", [
        "relation.time", "time.corroborating-principal",
        "time.higher-principal-tense", "time.downgrade-to-multiple-nucleus",
    ]),
    claim("l50-05-place", 50, "50.3", 21293, 21322, "place", [
        "relation.place", "place.future-from-past", "place.reduced-copula",
        "place.apposition-ambiguity",
    ]),
    claim("l50-06-manner", 50, "50.4", 21323, 21332, "manner", [
        "relation.manner", "manner.iuh", "manner.quen",
    ]),
    claim("l50-07-consideration", 50, "50.5", 21333, 21396, "consideration", [
        "relation.consideration", "contrast.included-referent-supplementation",
        "consideration.intransitive-principal", "consideration.reflexive-principal",
        "consideration.nonspecific-projective", "consideration.shared-reference",
    ]),
    claim("l50-08-purpose-unmarked", 50, "50.6.1", 21397, 21464, "purpose-unmarked", [
        "relation.purpose", "purpose.unmarked", "purpose.future-usual",
        "purpose.other-tense", "purpose.in-optional", "purpose.purposive-vnc",
        "purpose.adjectival-ambiguity", "purpose.conjunction-ambiguity",
        "purpose.weak-reading",
    ]),
    claim("l50-09-purpose-ma", 50, "50.6.2", 21465, 21484, "purpose-ma", [
        "relation.purpose", "purpose.ma-optative", "purpose.ma-admonitive-lest",
    ]),
    claim("l50-10-condition-overview", 50, "50.7", 21485, 21500, "condition-overview", [
        "relation.condition", "condition.open", "condition.hypothetical",
        "condition.tla", "condition.in-tla", "condition.order-both",
        "condition.principal-sentence-types", "condition.wish-upgrade",
    ]),
    claim("l50-11-open-condition-nnc", 50, "50.7.1.a", 21501, 21547, "open-condition-nnc", [
        "condition.center-nnc", "condition.principal-tense-governs-time",
        "condition.negative-ca", "condition.negative-camo",
    ]),
    claim("l50-12-open-condition-vnc", 50, "50.7.1.b", 21548, 21600, "open-condition-vnc", [
        "condition.center-vnc", "condition.nonpast-optative",
        "condition.future-optative", "condition.preterit-optative",
        "condition.present-indicative", "condition.indicative-optative-ambiguity",
        "condition.present-for-past", "condition.until",
    ]),
    claim("l50-13-hypothetical-present-future", 50, "50.7.2.a", 21601, 21610, "hypothetical-present-future", [
        "condition.hypothetical-present-future", "condition.past-optative",
        "condition.antecessive-absent", "condition.future-embed-principal",
    ]),
    claim("l50-14-hypothetical-past", 50, "50.7.2.b", 21611, 21636, "hypothetical-past", [
        "condition.hypothetical-past", "condition.past-optative",
        "condition.antecessive-optional-matched", "condition.future-embed-principal",
    ]),
    claim("l50-15-condition-marker-omission", 50, "50.7 remark", 21637, 21641, "condition-marker-omission", [
        "condition.tla-omitted-with-cue",
    ]),
    claim("l50-16-concession-in-tla-nel", 50, "50.8", 21642, 21663, "concession-in-tla-nel", [
        "relation.concession", "concession.in-tla-nel",
        "concession.intensive-pronoun", "concession.negative",
    ]),
    claim("l50-17-concession-in-ma-nel", 50, "50.8", 21664, 21680, "concession-in-ma-nel", [
        "relation.concession", "concession.in-ma-nel",
        "concession.intensive-pronoun",
    ]),
    claim("l50-18-concession-ma-zo", 50, "50.8", 21681, 21706, "concession-ma-zo", [
        "relation.concession", "concession.ma-zo-family",
        "concession.tel", "concession.negative",
    ]),
    claim("l50-19-concession-at-least", 50, "50.8", 21707, 21722, "concession-at-least", [
        "relation.concession", "concession.at-least", "concession.za-zan-distinction",
    ]),
    claim("l50-20-consequence", 50, "50.9", 21723, 21726, "consequence", [
        "relation.consequence", "consequence.adverbialized-iuh",
    ]),
    claim("l50-21-proviso", 50, "50.10", 21727, 21732, "proviso", [
        "relation.proviso", "proviso.negativized-ahzo",
    ]),
    claim("l50-22-reason", 50, "50.11", 21733, 21755, "reason", [
        "relation.reason", "reason.ca-principal-introducer",
        "reason.juxtaposed-sentences", "reason.not-conjunction",
        "reason.translation-mirage", "reason.negative",
    ]),
]);

const CLASSICAL_NAHUATL_LESSONS49_50_GCD = Object.freeze({
    id: "classical-nahuatl-adverbial-adjunction-gcd",
    stages: Object.freeze([
        "canonical-principal-result",
        "canonical-adjoined-result",
        "typed-relation-profile",
        "licensed-order-and-marker-validation",
        "recursive-clause-composition",
        "canonical-formula-realization",
        "selected-finite-surface",
    ]),
    forbiddenAuthorities: Object.freeze([
        "lesson-number",
        "source-text",
        "stored-answer",
        "formula-display",
        "surface-display",
        "restored-state",
        "raw-string",
    ]),
});

const CLASSICAL_NAHUATL_LESSONS49_50_LCM_AXES = Object.freeze(
    Array.from(new Set(CLASSICAL_NAHUATL_LESSONS49_50_SOURCE_CLAIMS.flatMap((entry) => entry.axes))).sort()
);

function buildClassicalNahuatlLessons49To50ClosureReport() {
    const claims = CLASSICAL_NAHUATL_LESSONS49_50_SOURCE_CLAIMS;
    const lessons = Object.freeze(Object.fromEntries([49, 50].map((lesson) => [
        lesson,
        claims.filter((entry) => entry.lesson === lesson).length,
    ])));
    const claimIds = claims.map((entry) => entry.id);
    const duplicateClaimIds = claimIds.filter((id, index) => claimIds.indexOf(id) !== index);
    const axesFromClaims = Array.from(new Set(claims.flatMap((entry) => entry.axes))).sort();
    return Object.freeze({
        kind: "classical-nahuatl-clause-relation-source-closure-report",
        sourceDocument: SOURCE_DOCUMENT,
        sourceLineStart: 20712,
        sourceLineEnd: 21755,
        claimCount: claims.length,
        lessonClaimCounts: lessons,
        gcd: CLASSICAL_NAHUATL_LESSONS49_50_GCD,
        lcmAxisCount: CLASSICAL_NAHUATL_LESSONS49_50_LCM_AXES.length,
        lcmAxes: CLASSICAL_NAHUATL_LESSONS49_50_LCM_AXES,
        duplicateClaimIds: Object.freeze(duplicateClaimIds),
        missingAxes: Object.freeze(CLASSICAL_NAHUATL_LESSONS49_50_LCM_AXES.filter(
            (axis) => !axesFromClaims.includes(axis)
        )),
        nonImplementedClaims: Object.freeze(claims.filter(
            (entry) => entry.implementationStatus !== "implemented"
        ).map((entry) => entry.id)),
        authorityLeaks: Object.freeze(claims.filter(
            (entry) => entry.lessonMetadataAuthority
                || entry.sourceTextAuthority
                || entry.displayTextAuthority
        ).map((entry) => entry.id)),
    });
}

module.exports = {
    SOURCE_DOCUMENT,
    CLASSICAL_NAHUATL_LESSONS49_50_SOURCE_CLAIMS,
    CLASSICAL_NAHUATL_LESSONS49_50_GCD,
    CLASSICAL_NAHUATL_LESSONS49_50_LCM_AXES,
    buildClassicalNahuatlLessons49To50ClosureReport,
};
