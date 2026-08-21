"use strict";

const { createSuite } = require("./runner");

const SERIES = Object.freeze({
    "outbound-nonpast-indicative": Object.freeze({ singular: "t-ī-uh", plural: "t-ī-hui" }),
    "outbound-past-indicative": Object.freeze({ singular: "t-o", plural: "t-o" }),
    "outbound-nonpast-optative": Object.freeze({ singular: "t-i", plural: "t-i" }),
    "inbound-nonfuture-indicative": Object.freeze({ singular: "c-o", plural: "c-o" }),
    "inbound-future-indicative": Object.freeze({ singular: "qu-ī-uh", plural: "qu-i-hui" }),
    "inbound-nonpast-optative": Object.freeze({ singular: "qu-i", plural: "qu-i" }),
});

const CLASSES = Object.freeze([
    Object.freeze({ classId: "A", sourceStem: "cuīca", expectedEmbed: "cuīca", sourceValence: "intransitive" }),
    Object.freeze({ classId: "B", sourceStem: "miqui", expectedEmbed: "miqui", sourceValence: "intransitive" }),
    Object.freeze({
        classId: "C", sourceStem: "ihcuil-o-ā", expectedEmbed: "ihcuil-ō",
        sourceValence: "specific-projective", objectKind: "specific-projective", objectPerson: "3sg",
    }),
    Object.freeze({
        classId: "D", sourceStem: "cuā", expectedEmbed: "cuā",
        sourceValence: "projective-nonhuman", objectKind: "nonspecific-nonhuman",
    }),
]);

function request(source, purposiveSeries, subject) {
    return {
        sourceStem: source.sourceStem,
        sourceValence: source.sourceValence,
        objectKind: source.objectKind,
        objectPerson: source.objectPerson,
        verbClass: source.classId,
        subject,
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        lateOperation: "purposive",
        lateVariant: "directional",
        purposiveSeries,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_purposive_class_grid");
    const rows = [];
    for (const source of CLASSES) {
        for (const [purposiveSeries, shapes] of Object.entries(SERIES)) {
            for (const [number, subject] of [["singular", "1sg"], ["plural", "1pl"]]) {
                const frame = ctx.evaluateClassicalNahuatlLateVncDerivation(
                    request(source, purposiveSeries, subject),
                );
                const facts = frame.operationFrame?.operationFacts || {};
                rows.push({
                    coordinate: `${source.classId}:${purposiveSeries}:${number}`,
                    authorizationStatus: frame.authorizationStatus,
                    targetStem: frame.operationFrame?.targetStem,
                    expectedTargetStem: `${source.expectedEmbed}-⎕-${shapes[number]}`,
                    futureEmbedSourceStem: facts.futureEmbedSourceStem,
                    futureEmbedPredicateStem: facts.futureEmbedPredicateStem,
                    sharedClassOwner: facts.futureEmbedUsesSharedLesson7ShapeOwner,
                    noStemWhitelist: facts.noStemWhitelist,
                    numberMorph: facts.numberMorph,
                    expectedNumberMorph: number === "plural" ? "h" : "0",
                });
            }
        }
    }
    s.eq("all four verbstem classes cross all six Purposive series and both numbers", {
        rows: rows.length,
        authorized: rows.every(row => row.authorizationStatus === "authorized"),
        exactTargetStems: rows.every(row => row.targetStem === row.expectedTargetStem),
        sourcePreserved: rows.every(row => {
            const source = CLASSES.find(entry => row.coordinate.startsWith(`${entry.classId}:`));
            return row.futureEmbedSourceStem === source.sourceStem;
        }),
        classShapeApplied: rows.every(row => {
            const source = CLASSES.find(entry => row.coordinate.startsWith(`${entry.classId}:`));
            return row.futureEmbedPredicateStem === source.expectedEmbed;
        }),
        sharedClassOwner: rows.every(row => row.sharedClassOwner === true),
        openAdmission: rows.every(row => row.noStemWhitelist === true),
        number: rows.every(row => row.numberMorph === row.expectedNumberMorph),
    }, {
        rows: 48, authorized: true, exactTargetStems: true,
        sourcePreserved: true, classShapeApplied: true, sharedClassOwner: true,
        openAdmission: true, number: true,
    });

    const userSingular = ctx.evaluateClassicalNahuatlLateVncDerivation(request(
        CLASSES[2], "outbound-nonpast-indicative", "1sg",
    ));
    const userPlural = ctx.evaluateClassicalNahuatlLateVncDerivation(request(
        CLASSES[2], "outbound-nonpast-indicative", "1pl",
    ));
    s.eq("internally boundaried Class C Source produces the exact Purposive pair", {
        singular: userSingular.formulaRealization,
        plural: userPlural.formulaRealization,
    }, {
        singular: "#ni-0+qu-0(ihcuil-ō-⎕-t-ī-uh)0+0-0#",
        plural: "#ti-0+qu-0(ihcuil-ō-⎕-t-ī-hui)0+0-h#",
    });

    const classCShapes = [
        ["pachi-i-ā", "pachi-ī"],
        ["mā-o-ā", "mā-ō"],
        ["choloā", "cholō"],
        ["te-i-ā", "te-ī"],
    ].map(([sourceStem, expectedEmbed]) => {
        const source = {
            classId: "C", sourceStem, expectedEmbed, sourceValence: "intransitive",
        };
        const frame = ctx.evaluateClassicalNahuatlLateVncDerivation(request(
            source, "outbound-past-indicative", "1sg",
        ));
        return [sourceStem, frame.authorizationStatus,
            frame.operationFrame?.operationFacts?.futureEmbedPredicateStem,
            frame.operationFrame?.operationFacts?.noStemWhitelist];
    });
    s.eq("Class C future shape reads morphemic boundaries instead of example identity", classCShapes, [
        ["pachi-i-ā", "authorized", "pachi-ī", true],
        ["mā-o-ā", "authorized", "mā-ō", true],
        ["choloā", "authorized", "cholō", true],
        ["te-i-ā", "authorized", "te-ī", true],
    ]);

    const wrongClass = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        classId: "A", sourceStem: "ihcuil-o-ā", expectedEmbed: "ihcuil-o-ā",
        sourceValence: "intransitive",
    }, "outbound-nonpast-indicative", "1sg"));
    s.eq("typed verbstem class and Source shape must agree before future formation", {
        status: wrongClass.authorizationStatus,
        reason: wrongClass.blockReason,
        classCStatus: userSingular.authorizationStatus,
        classCEmbed: userSingular.operationFrame?.operationFacts?.futureEmbedPredicateStem,
    }, {
        status: "blocked", reason: "authorized-canonical-base-vnc-required",
        classCStatus: "authorized", classCEmbed: "ihcuil-ō",
    });

    return s;
}

module.exports = { run };
