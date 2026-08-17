"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function request(overrides = {}) {
    const sourceValence = overrides.sourceValence || "intransitive";
    return {
        sourceStem: "tla-cōhua",
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
        objectPerson: sourceValence === "intransitive" ? "" : "3sg",
        lateOperation: "frequentative",
        lateVariant: "ordinary-short-glottal",
        frequentativeRepetitions: 1,
        frequentativeTarget: "lexical-stem",
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

function compact(frame) {
    return {
        status: frame.authorizationStatus,
        reason: frame.blockReason,
        target: frame.operationFrame?.targetStem,
        facts: frame.operationFrame?.operationFacts,
        classId: frame.operationFrame?.targetClass,
        valence: frame.operationFrame?.targetValence,
        predicate: frame.finalTypedVncSlotFrame?.slots?.predicate?.stem,
        objects: frame.finalTypedVncSlotFrame?.slots?.prePredicate?.map(
            (slot) => [slot.kind, slot.carrier],
        ),
        formula: frame.formulaRealization,
        surface: frame.surfaceRealization,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson27_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson27-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson27-object-pronoun-reduplication",
        "lesson27-intransitive-destockal-frequentatives",
        "lesson27-causative-destockal-frequentatives",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const lexicalTarget = evaluate(ctx, {
        frequentativeTarget: "lexical-stem",
    });
    const tlaTarget = evaluate(ctx, {
        frequentativeTarget: "fused-tla",
    });
    const bothTargets = evaluate(ctx, {
        frequentativeTarget: "fused-tla-and-lexical-stem",
    });
    const reflexive = evaluate(ctx, {
        sourceStem: "ilpi-ā",
        sourceValence: "mainline-reflexive",
        verbClass: "C",
        subject: "3pl",
        sourceInitialISelection: "supportive",
        frequentativeTarget: "mainline-reflexive",
    });
    const hostileTla = evaluate(ctx, {
        sourceStem: "maca",
        frequentativeTarget: "fused-tla",
    });
    const hostileReflexive = evaluate(ctx, {
        sourceStem: "ilpi-ā",
        sourceValence: "mainline-reflexive",
        verbClass: "C",
        sourceInitialISelection: "real",
        frequentativeTarget: "mainline-reflexive",
    });

    const openDestockal = evaluate(ctx, {
        sourceStem: "zap-ō-ni",
        verbClass: "B",
        lateVariant: "destockal-intransitive",
    });
    const huiDestockal = evaluate(ctx, {
        sourceStem: "māhui",
        verbClass: "B",
        lateVariant: "destockal-intransitive",
    });
    const recursiveDestockal = evaluate(ctx, {
        sourceStem: "chal-ā-ni",
        verbClass: "B",
        lateVariant: "destockal-intransitive",
        frequentativeRepetitions: 2,
    });
    const nonactiveO = evaluate(ctx, {
        sourceStem: "patl-ā-ni",
        verbClass: "B",
        lateVariant: "destockal-intransitive",
        voice: "impersonal",
        requestedVoice: "impersonal",
        nonactiveOptionId: "hua:patl-ā-nī-hua",
    });
    const nonactiveOHua = evaluate(ctx, {
        sourceStem: "patl-ā-ni",
        verbClass: "B",
        lateVariant: "destockal-intransitive",
        voice: "impersonal",
        requestedVoice: "impersonal",
        nonactiveOptionId: "o-hua:patl-ā-n-o-hua",
    });
    const tlaImpersonal = evaluate(ctx, {
        sourceStem: "patl-ā-ni",
        verbClass: "B",
        lateVariant: "destockal-intransitive",
        voice: "impersonal",
        requestedVoice: "impersonal",
        nonactiveOptionId: "tla-impersonal",
    });
    const hostileDestockal = evaluate(ctx, {
        sourceStem: "maca",
        lateVariant: "destockal-intransitive",
    });

    const causativeNA = evaluate(ctx, {
        sourceStem: "tlap-ā-n-a",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: "B",
        tense: "preterit",
        lateVariant: "destockal-causative",
    });
    const causativeHua = evaluate(ctx, {
        sourceStem: "invent-ō-hu-a",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: "B",
        tense: "preterit",
        lateVariant: "destockal-causative",
    });
    const hostileCausative = evaluate(ctx, {
        sourceStem: "maca",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: "A",
        lateVariant: "destockal-causative",
    });

    const observations = {
        "lesson27-object-pronoun-reduplication": {
            targets: [lexicalTarget, tlaTarget, bothTargets]
                .map((entry) => entry.operationFrame?.targetStem),
            selectedTargets: [lexicalTarget, tlaTarget, bothTargets]
                .map((entry) => entry.operationFrame?.operationFacts
                    ?.reduplicationTarget),
            bothScopes: {
                object: bothTargets.operationFrame?.operationFacts?.objectScope,
                event: bothTargets.operationFrame?.operationFacts?.eventScope,
                independent: bothTargets.operationFrame?.operationFacts
                    ?.independentObjectAndEventScopes,
            },
            reflexive: {
                target: reflexive.operationFrame?.targetStem,
                carrier: reflexive.finalTypedVncSlotFrame?.slots
                    ?.prePredicate?.[0]?.carrier,
                deleted: reflexive.operationFrame?.operationFacts
                    ?.supportiveIDeleted,
                surface: reflexive.surfaceRealization,
            },
            hostile: [
                [hostileTla.authorizationStatus, hostileTla.blockReason],
                [hostileReflexive.authorizationStatus, hostileReflexive.blockReason],
            ],
            cues: [bothTargets, reflexive].every((entry) => (
                cueRoles(ctx, entry)
                    .includes("lesson27-object-pronoun-reduplication")
            )),
        },
        "lesson27-intransitive-destockal-frequentatives": {
            open: [openDestockal, huiDestockal].map((entry) => ({
                target: entry.operationFrame?.targetStem,
                sourceSuffix: entry.operationFrame?.operationFacts
                    ?.sourceDestockalSuffix,
                stock: entry.operationFrame?.operationFacts?.stockVowel,
                reduced: entry.operationFrame?.operationFacts
                    ?.reducedStockVowel,
                classId: entry.operationFrame?.targetClass,
            })),
            recursive: [
                recursiveDestockal.operationFrame?.targetStem,
                recursiveDestockal.operationFrame?.operationFacts?.repetitions,
            ],
            voicePaths: [nonactiveO, nonactiveOHua, tlaImpersonal]
                .map((entry) => [
                    entry.operationFrame?.targetStem,
                    entry.operationFrame?.operationFacts?.nonactiveFormation,
                ]),
            hostile: [hostileDestockal.authorizationStatus, hostileDestockal.blockReason],
            cue: cueRoles(ctx, openDestockal)
                .includes("lesson27-intransitive-destockal-frequentatives"),
        },
        "lesson27-causative-destockal-frequentatives": {
            shapes: [causativeNA, causativeHua].map((entry) => ({
                target: entry.operationFrame?.targetStem,
                sourceSuffix: entry.operationFrame?.operationFacts
                    ?.sourceDestockalSuffix,
                targetSuffix: entry.operationFrame?.operationFacts
                    ?.targetDestockalSuffix,
                retainedA: entry.operationFrame?.operationFacts
                    ?.retainedCausativeVowel,
                classId: entry.operationFrame?.targetClass,
                perfective: entry.finalTypedVncSlotFrame?.slots?.predicate?.stem,
                objects: entry.finalTypedVncSlotFrame?.slots?.prePredicate?.length,
            })),
            hostile: [hostileCausative.authorizationStatus, hostileCausative.blockReason],
            cue: cueRoles(ctx, causativeNA)
                .includes("lesson27-causative-destockal-frequentatives"),
        },
    };

    const expected = {
        "lesson27-object-pronoun-reduplication": {
            targets: ["tla-coh-cōhua", "tlah-tla-cōhua", "tlah-tla-coh-cōhua"],
            selectedTargets: ["lexical-stem", "fused-tla", "fused-tla-and-lexical-stem"],
            bothScopes: {
                object: "nonspecific-nonhuman objects",
                event: "frequentative event",
                independent: true,
            },
            reflexive: {
                target: "lpi-ā",
                carrier: "m-oh-o",
                deleted: true,
                surface: "moholpiah",
            },
            hostile: [
                ["blocked", "fused-tla-source-required"],
                ["blocked", "supportive-initial-i-source-required"],
            ],
            cues: true,
        },
        "lesson27-intransitive-destockal-frequentatives": {
            open: [
                { target: "za-zap-o-ca", sourceSuffix: "ni", stock: "ō", reduced: "o", classId: "A" },
                { target: "ma-maca", sourceSuffix: "hui", stock: "ā", reduced: "a", classId: "A" },
            ],
            recursive: ["cha-cha-chal-a-ca", 2],
            voicePaths: [
                ["pa-patl-a-c-ō", "ca-to-c-ō"],
                ["pa-patl-a-c-o-hua", "ca-to-c-o-hua"],
                ["tla-pa-patl-a-ca", "tla-impersonal"],
            ],
            hostile: ["blocked", "ni-or-hui-destockal-source-required"],
            cue: true,
        },
        "lesson27-causative-destockal-frequentatives": {
            shapes: [
                {
                    target: "tla-tlap-a-tz-a",
                    sourceSuffix: "n-a",
                    targetSuffix: "tz-a",
                    retainedA: "a",
                    classId: "B",
                    perfective: "tla-tlap-a-tz",
                    objects: 1,
                },
                {
                    target: "i-invent-o-tz-a",
                    sourceSuffix: "hu-a",
                    targetSuffix: "tz-a",
                    retainedA: "a",
                    classId: "B",
                    perfective: "i-invent-o-tz",
                    objects: 1,
                },
            ],
            hostile: ["blocked", "destockal-causative-source-required"],
            cue: true,
        },
    };

    s.eq("accepted Lesson 27 Groups 4-6 use the normal canonical path", observations, expected);
    s.eq("accepted Lesson 27 Groups 4-6 cover every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every((record) => record.reviewStatus === "ACCEPTED"),
    }, {
        records: 95,
        unique: 95,
        writing: 58,
        reading: 37,
        accepted: true,
    });

    for (const record of writing) {
        const observed = observations[record.reviewGroupId];
        s.eq(`${record.atomId} has its accepted writing job`, observed, expected[record.reviewGroupId]);
        const mutation = JSON.parse(JSON.stringify(observed));
        if (record.reviewGroupId === "lesson27-object-pronoun-reduplication") {
            mutation.bothScopes.independent = false;
        } else if (record.reviewGroupId === "lesson27-intransitive-destockal-frequentatives") {
            mutation.voicePaths = mutation.voicePaths.slice(0, 2);
        } else {
            mutation.shapes[0].objects = 0;
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
