"use strict";

const { createSuite } = require("./runner");

const ATOM_IDS = Object.freeze([
    "ACI-P039-L015-D741EB618B",
    "ACI-P039-L015-D741EB618B-02",
    "ACI-P039-L015-D741EB618B-03",
    "ACI-P039-L025-A0793B2361",
    "ACI-P039-L027-566A4F635F",
    "ACI-P039-L029-9E1CE576E7",
    "ACI-P039-L029-9E1CE576E7-02",
]);

function run(ctx) {
    const s = createSuite("classical_lesson2_spelling_source_jobs");
    const request = (operationId, args) =>
        ctx.executeClassicalGrammarApplicationRequest({ operationId, args });
    const transcribe = segments => {
        const source = ctx.buildClassicalNahuatlTranscriptionSourceFrame({
            constituents: [{ segments }],
        });
        return request("orthography:transcription", [source]);
    };
    const assign = options => request(
        "phonology:phone-source-assignment",
        [options],
    );

    const phonemeSpelling = transcribe(["/k/", "e"]);
    const environmentShift = request("phonology:consonant-shift", [{
        sourceConsonant: "m",
        position: "vocable-final",
    }]);
    const morphologyShift = request("phonology:assimilation", [{
        leftConsonant: "m",
        rightConsonant: "t",
        grammaticalConstruction: true,
    }]);
    const optionalShift = request("phonology:assimilation", [{
        leftConsonant: "k",
        rightConsonant: "k",
        grammaticalConstruction: true,
    }]);
    const sourceAssignment = assign({
        underlyingPhoneme: "/¢/",
        realizedPhone: "č",
        morphemicSourceSegments: ["a", "/ʔ/", "/w/", "e", "/¢/", "i"],
    });

    const exact = {
        phonemeSpelling: phonemeSpelling.authorizationStatus === "authorized"
            && phonemeSpelling.canonicalResult.formula === "#(/k/e)#"
            && phonemeSpelling.canonicalResult.surface === "que",
        environmentShift: environmentShift.authorizationStatus === "authorized"
            && environmentShift.canonicalResult.sourceConsonant === "m"
            && environmentShift.canonicalResult.outputSound === "n̥"
            && environmentShift.canonicalResult.outputSpelling === "n",
        morphologyShift: morphologyShift.authorizationStatus === "authorized"
            && morphologyShift.canonicalResult.grammaticalConstruction === true
            && morphologyShift.canonicalResult.outputSound === "nt"
            && morphologyShift.canonicalResult.outputSpelling === "nt",
        optionality: optionalShift.authorizationStatus === "authorized"
            && optionalShift.canonicalResult.optional === true
            && morphologyShift.canonicalResult.optional === false,
        sourceAssignment: sourceAssignment.authorizationStatus === "authorized"
            && sourceAssignment.canonicalResult.assignmentBasis
                === "morphemic-source-relationship"
            && sourceAssignment.canonicalResult.underlyingPhoneme === "/¢/"
            && sourceAssignment.canonicalResult.realizedPhone === "č"
            && sourceAssignment.canonicalResult.outputSpelling === "ch",
        samePhoneDifferentPhoneme:
            sourceAssignment.canonicalResult.samePhoneIsRegularForAnotherPhoneme
                === true
            && sourceAssignment.canonicalResult.regularOwnerOfSamePhone === "/č/",
        ahhuachtliSource:
            sourceAssignment.canonicalResult.morphemicSourceSegments.join("")
                === "a/ʔ//w/e/¢/i"
            && sourceAssignment.canonicalResult.sourceContainsPhoneme === true,
    };

    s.eq("the seven spelling-source jobs run through normal application requests", exact, {
        phonemeSpelling: true,
        environmentShift: true,
        morphologyShift: true,
        optionality: true,
        sourceAssignment: true,
        samePhoneDifferentPhoneme: true,
        ahhuachtliSource: true,
    });

    const broken = {
        wrongEnvironment: request("phonology:consonant-shift", [{
            sourceConsonant: "m",
            position: "vocable-final",
            requestedSpelling: "m",
        }]),
        noMorphology: request("phonology:assimilation", [{
            leftConsonant: "m",
            rightConsonant: "t",
            grammaticalConstruction: false,
        }]),
        wrongSource: assign({
            underlyingPhoneme: "/č/",
            realizedPhone: "č",
            morphemicSourceSegments: ["a", "/ʔ/", "/w/", "e", "/¢/", "i"],
        }),
        wrongPhone: assign({
            underlyingPhoneme: "/¢/",
            realizedPhone: "p",
            morphemicSourceSegments: ["a", "/ʔ/", "/w/", "e", "/¢/", "i"],
        }),
        wrongWriting: assign({
            underlyingPhoneme: "/¢/",
            realizedPhone: "č",
            morphemicSourceSegments: ["a", "/ʔ/", "/w/", "e", "/¢/", "i"],
            requestedSpelling: "tz",
        }),
    };
    s.eq("breaking the environment, grammar, source, phone, or spelling is rejected", {
        wrongEnvironment: broken.wrongEnvironment.authorizationStatus,
        noMorphology: broken.noMorphology.authorizationStatus,
        wrongSource: broken.wrongSource.authorizationStatus,
        wrongPhone: broken.wrongPhone.authorizationStatus,
        wrongWriting: broken.wrongWriting.authorizationStatus,
    }, {
        wrongEnvironment: "blocked",
        noMorphology: "blocked",
        wrongSource: "blocked",
        wrongPhone: "blocked",
        wrongWriting: "blocked",
    });

    ATOM_IDS.forEach((atomId, index) => {
        s.eq(`${atomId}: exact normal application job`, Object.values(exact)[index], true);
    });
    return s;
}

module.exports = { run };
