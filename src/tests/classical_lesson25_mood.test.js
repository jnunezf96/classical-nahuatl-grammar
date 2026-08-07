"use strict";

const { createSuite } = require("./runner");

function selectCausativeRequest(application, specification, targetStem) {
    const baseRequest = {
        verbClass: "A",
        sourceSubject: "3sg",
        requestedDerivation: "causative",
        requestedVoice: "active",
        ...specification,
    };
    const preview = application.evaluate(baseRequest);
    const option = preview.controlFrame.derivationOptionInventory.options
        .find(candidate => candidate.targetStem === targetStem);
    if (!option) {
        throw new Error(`Missing canonical causative option ${specification.sourceStem} -> ${targetStem}`);
    }
    return { ...baseRequest, derivationOptionId: option.optionId };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_mood");
    const application = ctx.createClassicalNahuatlVncApplication(ctx);

    s.eq(
        "Lesson 25.14 does not expose a second mood-transformation result lane",
        [
            typeof ctx.buildClassicalNahuatlLesson2514MoodTransformationFrame,
            typeof ctx.isClassicalNahuatlLesson2514MoodTransformationFrame,
            typeof ctx.isClassicalNahuatlLesson2514DerivedCausativeAssertionFrame,
            typeof ctx.CLASSICAL_NAHUATL_LESSON25_MOOD_TARGETS,
            typeof ctx.CLASSICAL_NAHUATL_LESSON25_MOOD_RULE_REFS,
        ],
        ["undefined", "undefined", "undefined", "undefined", "undefined"]
    );

    const cases = [{
        label: "wish",
        targetStem: "chīhua-l-tiā",
        request: {
            sourceStem: "chīhua",
            sourceValence: "projective-nonhuman",
            subject: "1sg",
            mood: "optative",
            tense: "nonpast",
            sentenceOptions: {
                sentenceType: "wish-sentence",
                introductoryParticle: "ma",
            },
        },
        expected: {
            formula: "#ni-0+c-0+tla(chīhua-l-ti)0+⎕-0#",
            written: "nictlachīhualti",
            sentenceFormula: "mā #ni-0+c-0+tla(chīhua-l-ti)0+⎕-0#.",
            sentenceWritten: "Mā nictlachīhualti.",
            role: "wish",
            sentenceType: "wish-sentence",
        },
    }, {
        label: "direct command",
        targetStem: "chīhua-l-tiā",
        request: {
            sourceStem: "chīhua",
            sourceValence: "projective-nonhuman",
            subject: "2pl",
            mood: "optative",
            tense: "nonpast",
            sentenceOptions: {
                sentenceType: "command-sentence",
                introductoryParticle: "ma",
            },
        },
        expected: {
            formula: "#xi-0+c-0+tla(chīhua-l-tī)0+c-ān#",
            written: "xictlachīhualtīcān",
            sentenceFormula: "mā #xi-0+c-0+tla(chīhua-l-tī)0+c-ān#.",
            sentenceWritten: "Mā xictlachīhualtīcān.",
            role: "direct-command",
            sentenceType: "command-sentence",
        },
    }, {
        label: "exhortation",
        targetStem: "chīhua-l-tiā",
        request: {
            sourceStem: "chīhua",
            sourceValence: "specific-projective",
            objectPerson: "3sg",
            subject: "1pl",
            mood: "optative",
            tense: "nonpast",
            sentenceOptions: {
                sentenceType: "exhortation-sentence",
                introductoryParticle: "ma",
            },
        },
        expected: {
            formula: "#ti-0+c-0+⎕-0(chīhua-l-tī)0+c-ān#",
            written: "ticchīhualtīcān",
            sentenceFormula: "mā #ti-0+c-0+⎕-0(chīhua-l-tī)0+c-ān#.",
            sentenceWritten: "Mā ticchīhualtīcān.",
            role: "exhortation",
            sentenceType: "exhortation-sentence",
        },
    }, {
        label: "indirect admonition",
        targetStem: "chōc-tiā",
        request: {
            sourceStem: "chōca",
            sourceValence: "intransitive",
            subject: "3pl",
            mood: "admonitive",
            tense: "nonpast",
            sentenceOptions: {
                sentenceType: "admonition-sentence",
                introductoryParticle: "ma",
                admonitiveTranslationReading: "warning",
            },
        },
        expected: {
            formula: "#0-0+qui-0(chōc-tih)0+t-in#",
            written: "quichōctihtin",
            sentenceFormula: "mā #0-0+qui-0(chōc-tih)0+t-in#.",
            sentenceWritten: "Mā quichōctihtin.",
            role: "indirect-admonition",
            sentenceType: "admonition-sentence",
        },
    }];

    const selectedRequests = cases.map(testCase => selectCausativeRequest(
        application,
        testCase.request,
        testCase.targetStem
    ));
    s.eq(
        "Mood and sentence-force choices compose with the same selected causative operation",
        selectedRequests.map((request, index) => {
            const result = application.evaluate(request);
            const sentence = result.resultFrame.selectedMachineryFrame.sentenceSurfaceFrame;
            const sentenceResult = ctx.buildClassicalNahuatlVncSentenceResultFrame(result);
            return {
                label: cases[index].label,
                status: result.authorizationStatus,
                targetStem: result.normalizedRequest.targetStem,
                formula: result.resultFrame.formulaRealization,
                written: result.resultFrame.surfaceRealization,
                independent: [
                    result.resultFrame.finiteSurfaceFrame.formulaDerivedFromWrittenProjection,
                    result.resultFrame.finiteSurfaceFrame.writtenDerivedFromFormulaProjection,
                ],
                role: sentence.canvasSentenceRole,
                sentenceType: sentence.sentenceType,
                particle: sentence.introductoryParticle,
                punctuation: sentence.finalPunctuation,
                sentenceCanonical: ctx.isClassicalNahuatlVncSentenceResultFrame(sentenceResult),
                sentenceFormula: sentenceResult.sentenceFormulaDisplay,
                sentenceWritten: sentenceResult.sentenceSurfaceDisplay,
                sentenceIndependent: [
                    sentenceResult.formulaStringAuthority,
                    sentenceResult.surfaceStringAuthority,
                ],
            };
        }),
        cases.map(testCase => ({
            label: testCase.label,
            status: "authorized",
            targetStem: testCase.targetStem,
            formula: testCase.expected.formula,
            written: testCase.expected.written,
            independent: [false, false],
            role: testCase.expected.role,
            sentenceType: testCase.expected.sentenceType,
            particle: "mā",
            punctuation: ".",
            sentenceCanonical: true,
            sentenceFormula: testCase.expected.sentenceFormula,
            sentenceWritten: testCase.expected.sentenceWritten,
            sentenceIndependent: [false, false],
        }))
    );

    const wrongOption = application.evaluate({
        ...selectedRequests[0],
        derivationOptionId: "caller-invented-causative-option",
    });
    s.eq(
        "A mood choice cannot authorize an unlicensed derivational selection",
        [
            wrongOption.authorizationStatus,
            wrongOption.blockReason,
            wrongOption.resultFrame.formulaRealization,
            wrongOption.resultFrame.surfaceRealization,
        ],
        [
            "blocked",
            "classical-vnc-derivation-operation-not-authorized",
            "",
            "",
        ]
    );

    const hostile = application.evaluate({
        ...selectedRequests[0],
        targetWord: "forged",
        formulaRealization: "#forged#",
        surfaceRealization: "forged",
        lessonNumber: 25,
    });
    s.eq(
        "Stored output and curriculum fields cannot authorize a Lesson 25 mood result",
        {
            status: hostile.authorizationStatus,
            reason: hostile.blockReason,
            rejected: [...hostile.rejectedAuthorityFields].sort(),
            formula: hostile.resultFrame.formulaRealization,
            written: hostile.resultFrame.surfaceRealization,
        },
        {
            status: "blocked",
            reason: "classical-vnc-application-caller-authority-rejected",
            rejected: ["formulaRealization", "lessonNumber", "surfaceRealization", "targetWord"],
            formula: "",
            written: "",
        }
    );

    s.eq(
        "A copied or caller-shaped sentence cannot replace the owner-issued complete Mā sentence Result",
        (() => {
            const applicationFrame = application.evaluate(selectedRequests[0]);
            const canonical = ctx.buildClassicalNahuatlVncSentenceResultFrame(applicationFrame);
            const copied = JSON.parse(JSON.stringify(canonical));
            const raw = ctx.buildClassicalNahuatlVncSentenceResultFrame({
                authorizationStatus: "authorized",
                formulaRealization: canonical.consumedNuclearFormula,
                surfaceRealization: canonical.consumedNuclearSurface,
                sentenceSurfaceFrame: canonical.sentenceSurfaceFrame,
            });
            return {
                canonical: ctx.isClassicalNahuatlVncSentenceResultFrame(canonical),
                copied: ctx.isClassicalNahuatlVncSentenceResultFrame(copied),
                rawStatus: raw.authorizationStatus,
                rawReason: raw.blockReason,
                rawFormula: raw.sentenceFormulaDisplay,
                rawWritten: raw.sentenceSurfaceDisplay,
            };
        })(),
        {
            canonical: true,
            copied: false,
            rawStatus: "blocked",
            rawReason: "canonical-vnc-application-frame-required",
            rawFormula: "",
            rawWritten: "",
        }
    );

    const plan = application.prepareParadigm({
        ...selectedRequests[0],
        outputScope: "paradigm",
    });
    const coordinate = { subject: "1sg", mood: "optative", tense: "nonpast" };
    const point = application.projectParadigmCoordinates(plan, [coordinate])[0];
    const scalar = application.evaluate({
        ...selectedRequests[0],
        ...coordinate,
        outputScope: "single",
    });
    s.eq(
        "The Lesson 25.14 paradigm coordinate is pointwise identical to scalar generation",
        {
            plan: plan.authorizationStatus,
            point: point.authorizationStatus,
            scalarEquivalent: point.scalarEquivalent,
            pointFormula: point.formulaRealization,
            pointWritten: point.surfaceRealization,
            pointSentenceFormula: point.sentenceFormulaDisplay,
            pointSentenceWritten: point.sentenceSurfaceDisplay,
            scalarFormula: scalar.resultFrame.formulaRealization,
            scalarWritten: scalar.resultFrame.surfaceRealization,
            scalarSentenceFormula: ctx.buildClassicalNahuatlVncSentenceResultFrame(scalar).sentenceFormulaDisplay,
            scalarSentenceWritten: ctx.buildClassicalNahuatlVncSentenceResultFrame(scalar).sentenceSurfaceDisplay,
        },
        {
            plan: "authorized",
            point: "authorized",
            scalarEquivalent: true,
            pointFormula: cases[0].expected.formula,
            pointWritten: cases[0].expected.written,
            pointSentenceFormula: cases[0].expected.sentenceFormula,
            pointSentenceWritten: cases[0].expected.sentenceWritten,
            scalarFormula: cases[0].expected.formula,
            scalarWritten: cases[0].expected.written,
            scalarSentenceFormula: cases[0].expected.sentenceFormula,
            scalarSentenceWritten: cases[0].expected.sentenceWritten,
        }
    );

    return s;
}

module.exports = { run };
