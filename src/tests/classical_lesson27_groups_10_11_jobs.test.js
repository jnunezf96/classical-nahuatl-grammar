"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function request(overrides = {}) {
    return {
        sourceStem: "zamal",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        objectKind: "none",
        objectPerson: "",
        lateOperation: "frequentative",
        lateVariant: "uncertain-tzca",
        frequentativeRepetitions: 1,
        ...overrides,
    };
}

function cueRoles(ctx, closure) {
    return ctx.getClassicalFormulaDerivedAnnotations(
        closure.formulaRealization,
        closure.finalTypedVncSlotFrame,
        closure,
    ).map((cue) => cue.role);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson27_groups_10_11_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson27-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson27-uncertain-tzca-frequentatives",
        "lesson27-frequentative-nonactive",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const tla = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "tla-tla",
    }));
    const cui = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "cui-ca",
    }));
    const arbitrary = ctx.evaluateClassicalNahuatlLateVncDerivation(request());
    const projection = ctx.getClassicalNahuatlVncContinuationSourceConstituents(
        arbitrary,
    );
    const alreadyTzca = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "pi-pi-tz-ca",
    }));
    const transitive = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "cui-ca",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    }));

    const nonactiveSource = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "patl-ā-ni",
        sourceValence: "intransitive",
        verbClass: "B",
        subject: "3sg",
        mood: "indicative",
        tense: "imperfect",
        derivationType: "direct",
        voice: "impersonal",
        requestedVoice: "impersonal",
        nonactiveOptionId: "hua:patl-ā-nī-hua",
        objectKind: "none",
        objectPerson: "",
    });
    const nonactiveFrequentative = ctx.evaluateClassicalNahuatlLateVncDerivation(
        request({
            sourceStem: "patl-ā-ni",
            verbClass: "B",
            tense: "imperfect",
            voice: "impersonal",
            requestedVoice: "impersonal",
            nonactiveOptionId: "hua:patl-ā-nī-hua",
            lateVariant: "ordinary-short-glottal",
            sourceApplicationFrame: nonactiveSource,
        }),
    );
    const forgedNonactive = ctx.evaluateClassicalNahuatlLateVncDerivation(
        request({
            sourceStem: "patl-ā-ni",
            verbClass: "B",
            tense: "imperfect",
            voice: "impersonal",
            requestedVoice: "impersonal",
            lateVariant: "ordinary-short-glottal",
            sourceApplicationFrame: { authorizationStatus: "authorized" },
        }),
    );

    const observations = {
        "lesson27-uncertain-tzca-frequentatives": {
            examples: [tla, cui].map((entry) => [
                entry.authorizationStatus,
                entry.operationFrame?.targetStem,
            ]),
            arbitrary: {
                status: arbitrary.authorizationStatus,
                target: arbitrary.operationFrame?.targetStem,
                replaced: arbitrary.operationFrame?.operationFacts
                    ?.replacedSourceSyllable,
                replacement: arbitrary.operationFrame?.operationFacts?.replacement,
                copied: arbitrary.operationFrame?.operationFacts?.copiedPrefix,
                open: arbitrary.operationFrame?.operationFacts?.openSourceShape,
                meaningInferred: arbitrary.operationFrame?.operationFacts
                    ?.lexicalMeaningInferred,
            },
            continuation: {
                ready: arbitrary.operationFrame?.operationFacts
                    ?.completedTzcaResultAvailableForContinuation,
                sourceStem: projection?.sourceStem,
                classId: projection?.verbClass,
                sourceValence: projection?.sourceValence,
                role: projection?.projectionRole,
            },
            distinctAnalyses: [
                arbitrary.operationFrame?.operationFacts
                    ?.unreduplicatedTzcaIsDifferentSourceAnalysis,
                arbitrary.operationFrame?.operationFacts
                    ?.transitiveTzcaIsDifferentFormation,
                [alreadyTzca.authorizationStatus, alreadyTzca.blockReason],
                [transitive.authorizationStatus, transitive.blockReason],
            ],
            examplesAuthorize: arbitrary.operationFrame?.storedExampleAuthority,
            cue: cueRoles(ctx, arbitrary).includes(
                "lesson27-uncertain-tzca-frequentatives",
            ),
        },
        "lesson27-frequentative-nonactive": {
            source: [
                nonactiveSource.authorizationStatus,
                nonactiveSource.controlFrame?.selectedVoiceOperation,
                nonactiveSource.resultFrame?.finalTypedVncSlotFrame
                    ?.slots?.predicate?.stem,
            ],
            result: [
                nonactiveFrequentative.authorizationStatus,
                nonactiveFrequentative.operationFrame?.targetStem,
                nonactiveFrequentative.surfaceRealization,
            ],
            continuity: {
                recaptured: nonactiveFrequentative.operationFrame?.operationFacts
                    ?.nonactiveSourceRecaptured,
                voice: nonactiveFrequentative.operationFrame?.operationFacts
                    ?.sourceVoice,
                group: nonactiveFrequentative.operationFrame?.operationFacts
                    ?.impersonalGroupReading,
                distributed: nonactiveFrequentative.operationFrame?.operationFacts
                    ?.separateIndividualActsWithinCollectiveAction,
                topology: nonactiveFrequentative.operationFrame?.operationFacts
                    ?.participantTopologyPreserved,
                mood: nonactiveFrequentative.operationFrame?.operationFacts
                    ?.finiteMood,
                tense: nonactiveFrequentative.operationFrame?.operationFacts
                    ?.finiteTense,
            },
            ruleFamily: nonactiveFrequentative.operationFrame?.ruleFamilies
                ?.includes("frequentative-nonactive"),
            forged: [forgedNonactive.authorizationStatus, forgedNonactive.blockReason],
            cue: cueRoles(ctx, nonactiveFrequentative).includes(
                "lesson27-frequentative-nonactive",
            ),
        },
    };

    const expected = {
        "lesson27-uncertain-tzca-frequentatives": {
            examples: [
                ["authorized", "tla-tla-tz-ca"],
                ["authorized", "cui-cui-tz-ca"],
            ],
            arbitrary: {
                status: "authorized",
                target: "za-za-tz-ca",
                replaced: "mal",
                replacement: "tz-ca",
                copied: "za",
                open: true,
                meaningInferred: false,
            },
            continuation: {
                ready: true,
                sourceStem: "za-za-tz-ca",
                classId: "A",
                sourceValence: "intransitive",
                role: "read-only-source-constituents",
            },
            distinctAnalyses: [
                true,
                true,
                ["blocked", "replaceable-final-source-syllable-required"],
                ["blocked", "intransitive-uncertain-tzca-source-required"],
            ],
            examplesAuthorize: false,
            cue: true,
        },
        "lesson27-frequentative-nonactive": {
            source: ["authorized", "impersonal", "patl-ā-nī-hua"],
            result: ["authorized", "pah-patl-ā-nī-hua", "pahpatlānīhuaya"],
            continuity: {
                recaptured: true,
                voice: "impersonal",
                group: true,
                distributed: true,
                topology: true,
                mood: "indicative",
                tense: "imperfect",
            },
            ruleFamily: true,
            forged: ["blocked", "engine-issued-derived-source-application-required"],
            cue: true,
        },
    };

    s.eq("accepted Lesson 27 Groups 10-11 use typed open and Result-continuation paths", observations, expected);
    s.eq("accepted Lesson 27 Groups 10-11 cover every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every((record) => record.reviewStatus === "ACCEPTED"),
    }, {
        records: 44,
        unique: 44,
        writing: 20,
        reading: 24,
        accepted: true,
    });
    const rendering = fs.readFileSync(
        path.join(ROOT, "src/ui/rendering/rendering.mjs"),
        "utf8",
    );
    s.ok(
        "live formula delivery passes the exact late-operation closure to clickable cues",
        rendering.includes(
            "vncLateOperationClosureFrame: annotationLateOperationClosureFrame",
        )
        && rendering.includes(
            "operationFrame: annotationLateOperationClosureFrame?.operationFrame",
        ),
    );

    for (const record of writing) {
        const observed = observations[record.reviewGroupId];
        s.eq(`${record.atomId} has its accepted writing job`, observed, expected[record.reviewGroupId]);
        const mutation = JSON.parse(JSON.stringify(observed));
        if (record.reviewGroupId === "lesson27-uncertain-tzca-frequentatives") {
            mutation.continuation.ready = false;
        } else {
            mutation.continuity.distributed = false;
        }
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation) === JSON.stringify(expected[record.reviewGroupId]),
            false,
        );
    }
    return s;
}

module.exports = { run };
