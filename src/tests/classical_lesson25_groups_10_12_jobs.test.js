"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function selectDerivation(application, request, targetStem) {
    const preview = application.evaluate(request);
    const option = preview.controlFrame?.derivationOptionInventory?.options
        ?.find(candidate => candidate.targetStem === targetStem);
    const selectedRequest = {
        ...request,
        derivationOptionId: option?.optionId || `missing:${targetStem}`,
    };
    return {
        request: selectedRequest,
        frame: application.evaluate(selectedRequest),
    };
}

function continueCausative(application, sourceResult, targetStem) {
    const source = application.getContinuationSourceConstituents(sourceResult);
    const request = {
        sourceStem: source.sourceStem,
        sourceLexemeId: source.sourceLexemeId,
        sourceInitialISelection: source.sourceInitialISelection,
        verbClass: source.verbClass,
        sourceValence: source.sourceValence,
        sourceSubject: source.sourceSubject,
        sourceVoice: source.sourceVoice,
        sourceNonactiveOptionId: source.sourceNonactiveOptionId,
        sourceObjectRequests: source.sourceObjectRequests,
        objectKind: source.objectKind,
        objectPerson: source.objectPerson,
        subject: "2sg",
        mood: "indicative",
        tense: "present",
        requestedVoice: "active",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
    };
    const preview = application.continueFromResult(sourceResult, request);
    const option = preview.controlFrame?.derivationOptionInventory?.options
        ?.find(candidate => candidate.targetStem === targetStem);
    return application.continueFromResult(sourceResult, {
        ...request,
        derivationOptionId: option?.optionId || `missing:${targetStem}`,
    });
}

function selectLaterVoice(application, selected, requestedVoice) {
    const preview = application.evaluate({
        ...selected.request,
        requestedVoice,
    });
    const nonactiveOptionId = preview.controlFrame
        ?.nonactiveOptionInventory?.automaticOptionId
        || preview.controlFrame?.nonactiveOptionInventory?.options?.[0]
            ?.optionId
        || "";
    return application.evaluate({
        ...selected.request,
        requestedVoice,
        nonactiveOptionId,
    });
}

function cueRoles(ctx, frame) {
    const result = frame?.resultFrame || frame;
    return ctx.getClassicalFormulaDerivedAnnotations(
        result?.formulaRealization || frame?.formulaRealization || "",
        result?.finalTypedVncSlotFrame || null,
        result,
    ).map(cue => cue.role);
}

function buildSilentObjectSupplementation(ctx, application) {
    const selected = selectDerivation(application, {
        sourceStem: "ī",
        verbClass: "A",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceSubject: "1pl",
        subject: "3pl",
        mood: "indicative",
        tense: "future",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    }, "ī-tiā");
    const supplement = ctx.buildClassicalNahuatlAbsolutiveNncFrame("ātōl", {
        subject: "3sg",
        nounClass: "tli",
        animacy: "nonanimate",
    });
    const referenceId = "referent:lesson25-silent-object";
    const principalClause =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            selected.frame,
            {
                referenceId: "principal:lesson25-silent-object",
                subjectReferenceId: "subject:lesson25-silent-object",
                objectReferenceIds: {
                    "source-object-1": referenceId,
                    "causative-object": "referent:causative-object",
                },
            },
        );
    const supplementClause =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            supplement,
            { referenceId },
        );
    const request = {
        operationKind: "relation",
        principalClause,
        supplementClause,
        options: {
            referenceMode: "shared",
            headRole: "object",
            principalObjectId: "source-object-1",
            supplementContactRole: "subject",
            order: "principal-first",
            adjunctor: "in",
        },
    };
    return {
        request,
        frame: ctx.evaluateClassicalNahuatlSupplementationOperation(request),
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson25-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson25-causative-ambiguity",
        "lesson25-mood-and-nonactive-voice",
        "lesson25-silent-object-supplementation",
    ];
    const records = ledger.records.filter(record => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));
    const application = ctx.createClassicalNahuatlVncApplication(ctx);

    const firstCausative = selectDerivation(application, {
        sourceStem: "caqui",
        verbClass: "B",
        sourceValence: "projective-human",
        objectKind: "nonspecific-human",
        sourceSubject: "3sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    }, "caqui-tiā");
    const ambiguous = continueCausative(
        application,
        firstCausative.frame.resultFrame,
        "caqui-ti-l-tiā",
    );
    const reverseAnalyses = ambiguous.resultFrame
        ?.derivationOperationFrame?.reverseSourceAnalyses || [];

    const mood = selectDerivation(application, {
        sourceStem: "chōca",
        verbClass: "A",
        sourceValence: "intransitive",
        objectKind: "none",
        sourceSubject: "3pl",
        subject: "3pl",
        mood: "admonitive",
        tense: "nonpast",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
        sentenceOptions: {
            sentenceType: "admonition-sentence",
            introductoryParticle: "ma",
            admonitiveTranslationReading: "warning",
        },
    }, "chōc-tiā");
    const activeVoice = selectDerivation(application, {
        sourceStem: "chīhua",
        verbClass: "A",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
        sourceSubject: "1pl",
        subject: "3pl",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    }, "chīhua-l-tiā");
    const passive = selectLaterVoice(application, activeVoice, "passive");
    const supplementation = buildSilentObjectSupplementation(
        ctx,
        application,
    );

    const observations = {
        "lesson25-causative-ambiguity": {
            result: [
                ambiguous.authorizationStatus,
                ambiguous.resultFrame?.surfaceRealization,
                ambiguous.resultFrame?.formulaRealization,
            ],
            analyses: reverseAnalyses.map(analysis => [
                analysis.analysisStatus,
                analysis.sourceVoice,
                analysis.generationAuthority,
                analysis.formulaAuthority,
                analysis.surfaceAuthority,
            ]),
            cue: cueRoles(ctx, ambiguous)
                .includes("lesson25-causative-ambiguity"),
        },
        "lesson25-mood-and-nonactive-voice": {
            mood: [
                mood.frame.authorizationStatus,
                mood.frame.resultFrame?.formulaRealization,
                mood.frame.resultFrame?.surfaceRealization,
                cueRoles(ctx, mood.frame)
                    .includes("lesson25-mood-and-nonactive-voice"),
            ],
            voice: [
                passive.authorizationStatus,
                passive.resultFrame?.selectedMachineryFrame
                    ?.voiceTransformationFrame?.voice,
                passive.resultFrame?.formulaRealization,
                passive.resultFrame?.surfaceRealization,
                passive.resultFrame?.selectedMachineryFrame
                    ?.voiceTransformationFrame?.targetObjectClusterFrame
                    ?.positions?.length,
                cueRoles(ctx, passive)
                    .includes("lesson25-mood-and-nonactive-voice"),
            ],
        },
        "lesson25-silent-object-supplementation": {
            relation: [
                supplementation.frame.authorizationStatus,
                supplementation.frame.referenceFrame?.headRole,
                supplementation.frame.referenceFrame?.principalHead?.id,
                supplementation.frame.referenceFrame?.principalHead?.silent,
                supplementation.frame.formulaRealization,
                supplementation.frame.surfaceRealization,
                supplementation.frame.projectionsGeneratedIndependently,
            ],
            causativeObjectPresent:
                supplementation.frame.principalClause?.objects?.some(
                    object => /^causative-object/u.test(object.id),
                ),
            cue: cueRoles(ctx, supplementation.frame)
                .includes("lesson25-silent-object-supplementation"),
        },
    };
    const expected = {
        "lesson25-causative-ambiguity": {
            result: [
                "authorized",
                "tinēchtēcaquitiltia",
                "#ti-0+n-ēch+⎕-0+tē(caqui-ti-l-tia)0+0-0#",
            ],
            analyses: [
                ["identified-source", "active", false, false, false],
                ["canonically-licensed-reverse-source", "passive", false, false, false],
            ],
            cue: true,
        },
        "lesson25-mood-and-nonactive-voice": {
            mood: [
                "authorized",
                "#0-0+qu-in(chōc-tih)0+t-in#",
                "quinchōctihtin",
                true,
            ],
            voice: [
                "authorized",
                "passive",
                "#ti-0+tla(chīhua-l-tī-lo)0+0-h#",
                "titlachīhualtīloh",
                1,
                true,
            ],
        },
        "lesson25-silent-object-supplementation": {
            relation: [
                "authorized",
                "object",
                "source-object-1",
                true,
                "#0-0+t-ēch+⎕-0(i-ti)z+qu-eh# + in + #0-0(ātōl)li-0#",
                "Tēchitizqueh in ātollī.",
                true,
            ],
            causativeObjectPresent: true,
            cue: true,
        },
    };
    const mutations = {
        "lesson25-causative-ambiguity": [
            reverseAnalyses.length !== 2,
            reverseAnalyses.some(analysis => analysis.generationAuthority !== false),
            reverseAnalyses.some(analysis => analysis.formulaAuthority !== false),
            reverseAnalyses.some(analysis => analysis.surfaceAuthority !== false),
            !cueRoles(ctx, ambiguous)
                .includes("lesson25-causative-ambiguity"),
        ],
        "lesson25-mood-and-nonactive-voice": [
            mood.frame.authorizationStatus !== "authorized",
            passive.authorizationStatus !== "authorized",
            passive.resultFrame?.selectedMachineryFrame
                ?.voiceTransformationFrame?.targetObjectClusterFrame
                ?.positions?.length !== 1,
            !cueRoles(ctx, mood.frame)
                .includes("lesson25-mood-and-nonactive-voice"),
            !cueRoles(ctx, passive)
                .includes("lesson25-mood-and-nonactive-voice"),
        ],
        "lesson25-silent-object-supplementation": [
            supplementation.frame.authorizationStatus !== "authorized",
            supplementation.frame.referenceFrame?.principalHead?.silent !== true,
            supplementation.frame.referenceFrame?.principalHead?.id
                !== "source-object-1",
            !cueRoles(ctx, supplementation.frame)
                .includes("lesson25-silent-object-supplementation"),
        ],
    };

    s.eq("accepted Lesson 25 Groups 10-12 cover every atom once", {
        accepted: records.filter(record => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter(record => (
            record.proposedDirection === "READING_ONLY"
        )).length,
        unique: new Set(records.map(record => record.atomId)).size,
    }, { accepted: 73, records: 73, both: 15, readingOnly: 58, unique: 73 });
    for (const record of writing) {
        s.eq(
            `${record.atomId} has its exact accepted application job`,
            observations[record.reviewGroupId],
            expected[record.reviewGroupId],
        );
        s.eq(
            `mutation:${record.atomId} fails when its accepted job is contradicted`,
            mutations[record.reviewGroupId].some(Boolean),
            false,
        );
    }
    return s;
}

module.exports = { run };
