"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function request(overrides = {}) {
    const sourceValence = overrides.sourceValence || "intransitive";
    return {
        sourceStem: "chōca",
        sourceValence,
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        objectKind: sourceValence === "intransitive"
            ? "none"
            : sourceValence,
        objectPerson: sourceValence === "intransitive" ? "" : "2sg",
        lateOperation: "frequentative",
        frequentativeRepetitions: 1,
        frequentativeScope: "open",
        ...overrides,
    };
}

function evaluate(ctx, overrides = {}) {
    return ctx.evaluateClassicalNahuatlLateVncDerivation(request(overrides));
}

function cueRoles(ctx, closure) {
    return ctx.getClassicalFormulaDerivedAnnotations(
        closure.formulaRealization,
        closure.finalTypedVncSlotFrame,
        closure,
    ).map((cue) => cue.role);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson27_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson27-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson27-frequentative-foundation-and-shape-choice",
        "lesson27-short-glottal-ordinary-frequentatives",
        "lesson27-long-short-supportive-i-and-recursion",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const shortGlottal = evaluate(ctx, {
        sourceStem: "maca",
        lateVariant: "ordinary-short-glottal",
    });
    const long = evaluate(ctx, {
        sourceStem: "maca",
        lateVariant: "ordinary-long",
    });
    const short = evaluate(ctx, {
        sourceStem: "maca",
        lateVariant: "ordinary-short",
    });
    const vowelInitial = evaluate(ctx, {
        sourceStem: "āhua",
        lateVariant: "ordinary-long",
    });
    const patientScope = evaluate(ctx, {
        sourceStem: "maca",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "2sg",
        lateVariant: "ordinary-short-glottal",
        frequentativeScope: "patient",
    });
    const openScope = evaluate(ctx, {
        sourceStem: "chōca",
        lateVariant: "ordinary-short-glottal",
    });
    const hostilePatient = evaluate(ctx, {
        sourceStem: "chōca",
        lateVariant: "ordinary-short-glottal",
        frequentativeScope: "patient",
    });
    const hostileLongScope = evaluate(ctx, {
        sourceStem: "chōca",
        lateVariant: "ordinary-long",
        frequentativeScope: "occasion",
    });
    const fusedTla = evaluate(ctx, {
        sourceStem: "tla-cōhua",
        lateVariant: "tla-short-glottal",
    });
    const fusedTlaAndStem = evaluate(ctx, {
        sourceStem: "tla-cōhua",
        lateVariant: "tla-short-glottal-and-stem-short-glottal",
    });
    const supportiveI = evaluate(ctx, {
        sourceStem: "ihcuil-o-ā",
        verbClass: "C",
        lateVariant: "ordinary-short",
        sourceInitialISelection: "supportive",
    });
    const realI = evaluate(ctx, {
        sourceStem: "ihcuil-o-ā",
        verbClass: "C",
        lateVariant: "ordinary-short-glottal",
        sourceInitialISelection: "real",
    });
    const recursive = evaluate(ctx, {
        sourceStem: "chōca",
        lateVariant: "ordinary-long",
        frequentativeRepetitions: 3,
    });
    const hostileSupportive = evaluate(ctx, {
        sourceStem: "ita",
        verbClass: "A",
        lateVariant: "ordinary-short",
        sourceInitialISelection: "supportive",
    });

    const observations = {
        "lesson27-frequentative-foundation-and-shape-choice": {
            statuses: [shortGlottal, long, short, vowelInitial]
                .map((entry) => entry.authorizationStatus),
            targets: [shortGlottal, long, short, vowelInitial]
                .map((entry) => entry.operationFrame?.targetStem),
            shapes: [shortGlottal, long, short]
                .map((entry) => entry.operationFrame?.operationFacts?.shape),
            formulas: [shortGlottal, long, short]
                .map((entry) => entry.operationFrame?.operationFacts?.shapeFormula),
            copied: [shortGlottal, long, short, vowelInitial]
                .map((entry) => entry.operationFrame?.operationFacts?.copiedPrefix),
            canonical: [shortGlottal, long, short, vowelInitial]
                .every((entry) => ctx.isClassicalNahuatlClosureFrame(entry)),
            cue: cueRoles(ctx, long)
                .includes("lesson27-frequentative-foundation-and-shape-choice"),
        },
        "lesson27-short-glottal-ordinary-frequentatives": {
            patient: {
                status: patientScope.authorizationStatus,
                scope: patientScope.operationFrame?.operationFacts?.semanticScope,
                patientAvailable: patientScope.operationFrame?.operationFacts?.patientScopeAvailable,
                participantSlots: patientScope.finalTypedVncSlotFrame?.slots
                    ?.prePredicate?.length,
            },
            open: {
                status: openScope.authorizationStatus,
                scope: openScope.operationFrame?.operationFacts?.semanticScope,
                scopes: openScope.operationFrame?.operationFacts
                    ?.availableSemanticScopes,
                patientAvailable: openScope.operationFrame?.operationFacts?.patientScopeAvailable,
            },
            hostilePatient: [
                hostilePatient.authorizationStatus,
                hostilePatient.blockReason,
            ],
            hostileLongScope: [
                hostileLongScope.authorizationStatus,
                hostileLongScope.blockReason,
            ],
            tla: [
                fusedTla.operationFrame?.targetStem,
                fusedTlaAndStem.operationFrame?.targetStem,
            ],
            cue: cueRoles(ctx, patientScope)
                .includes("lesson27-short-glottal-ordinary-frequentatives"),
        },
        "lesson27-long-short-supportive-i-and-recursion": {
            supportive: {
                status: supportiveI.authorizationStatus,
                target: supportiveI.operationFrame?.targetStem,
                analysis: supportiveI.operationFrame?.operationFacts?.initialIAnalysis,
                deleted: supportiveI.operationFrame?.operationFacts?.supportiveIDeleted,
                retained: supportiveI.operationFrame?.operationFacts
                    ?.sourceStemAfterSupportiveIDeletion,
                copied: supportiveI.operationFrame?.operationFacts?.copiedPrefix,
            },
            real: {
                status: realI.authorizationStatus,
                target: realI.operationFrame?.targetStem,
                analysis: realI.operationFrame?.operationFacts?.initialIAnalysis,
                deleted: realI.operationFrame?.operationFacts?.supportiveIDeleted,
                copied: realI.operationFrame?.operationFacts?.copiedPrefix,
            },
            recursive: {
                status: recursive.authorizationStatus,
                target: recursive.operationFrame?.targetStem,
                repetitions: recursive.operationFrame?.operationFacts?.repetitions,
                ruleFamilies: recursive.operationFrame?.ruleFamilies,
            },
            hostileSupportive: [
                hostileSupportive.authorizationStatus,
                hostileSupportive.blockReason,
            ],
            cues: {
                supportive: cueRoles(ctx, supportiveI)
                    .includes("lesson27-long-short-supportive-i-and-recursion"),
                recursive: cueRoles(ctx, recursive)
                    .includes("lesson27-long-short-supportive-i-and-recursion"),
            },
        },
    };

    const expected = {
        "lesson27-frequentative-foundation-and-shape-choice": {
            statuses: ["authorized", "authorized", "authorized", "authorized"],
            targets: ["mah-maca", "mā-maca", "ma-maca", "ā-āhua"],
            shapes: ["short-glottal", "long", "short"],
            formulas: [
                "(C)+short vowel+h",
                "(C)+long vowel",
                "(C)+short vowel",
            ],
            copied: ["mah", "mā", "ma", "ā"],
            canonical: true,
            cue: true,
        },
        "lesson27-short-glottal-ordinary-frequentatives": {
            patient: {
                status: "authorized",
                scope: "patient",
                patientAvailable: true,
                participantSlots: 1,
            },
            open: {
                status: "authorized",
                scope: "open",
                scopes: ["open", "action", "agent", "patient", "occasion", "place"],
                patientAvailable: false,
            },
            hostilePatient: ["blocked", "patient-scope-requires-typed-source-object"],
            hostileLongScope: ["blocked", "frequentative-scope-requires-short-glottal-formation"],
            tla: ["tlah-tla-cōhua", "tlah-tla-coh-cōhua"],
            cue: true,
        },
        "lesson27-long-short-supportive-i-and-recursion": {
            supportive: {
                status: "authorized",
                target: "cui-hcuil-o-ā",
                analysis: "supportive",
                deleted: true,
                retained: "hcuil-o-ā",
                copied: "cui",
            },
            real: {
                status: "authorized",
                target: "ih-ihcuil-o-ā",
                analysis: "real",
                deleted: false,
                copied: "ih",
            },
            recursive: {
                status: "authorized",
                target: "chō-chō-chō-chōca",
                repetitions: 3,
                ruleFamilies: ["frequentative-prefix-shape", "frequentative-recursion"],
            },
            hostileSupportive: ["blocked", "supportive-i-plus-two-consonants-required"],
            cues: { supportive: true, recursive: true },
        },
    };

    s.eq("accepted Lesson 27 Groups 1-3 use the normal canonical application path", observations, expected);
    s.eq("accepted Lesson 27 Groups 1-3 cover every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every((record) => record.reviewStatus === "ACCEPTED"),
    }, {
        records: 114,
        unique: 114,
        writing: 54,
        reading: 60,
        accepted: true,
    });

    for (const record of writing) {
        const observed = observations[record.reviewGroupId];
        s.eq(`${record.atomId} has its accepted writing job`, observed, expected[record.reviewGroupId]);
        const mutation = JSON.parse(JSON.stringify(observed));
        if (record.reviewGroupId === "lesson27-frequentative-foundation-and-shape-choice") {
            mutation.shapes = mutation.shapes.slice(0, 2);
        } else if (record.reviewGroupId === "lesson27-short-glottal-ordinary-frequentatives") {
            mutation.open.scopes = mutation.open.scopes.filter((scope) => scope !== "place");
        } else {
            mutation.supportive.deleted = false;
        }
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation)
                === JSON.stringify(expected[record.reviewGroupId]),
            false,
        );
    }
    return s;
}

module.exports = { run };
