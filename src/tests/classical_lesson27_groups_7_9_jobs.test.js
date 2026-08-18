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
        frequentativeRepetitions: 1,
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

function compactObjects(frame) {
    return (frame.finalTypedVncSlotFrame?.slots?.prePredicate || []).map((slot) => [
        slot.carrier,
        slot.objectPositionFrame?.objectKind || "",
        slot.objectPositionFrame?.governor || "",
    ]);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson27_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson27-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson27-extinct-fused-and-role-ambiguous-destockals",
        "lesson27-destockal-applicative-and-type-two-causative",
        "lesson27-uncertain-ca-frequentatives",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const fused = evaluate(ctx, {
        sourceStem: "za-zā-tz-a",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: "B",
        lateVariant: "destockal-lexicalized",
    });
    const applicativeRole = evaluate(ctx, {
        sourceStem: "za-zā-tz-a",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: "B",
        lateVariant: "destockal-applicative-force",
    });
    const hostileLexicalized = evaluate(ctx, {
        sourceStem: "nema",
        lateVariant: "destockal-lexicalized",
    });

    const applicative = evaluate(ctx, {
        sourceStem: "za-zap-o-tz-a",
        sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
        verbClass: "B",
        lateVariant: "destockal-applicative",
        applicativeObjectKind: "nonspecific-human",
    });
    const typeTwo = evaluate(ctx, {
        sourceStem: "za-zap-o-ca",
        lateVariant: "destockal-type-two",
        causativeObjectKind: "specific-projective",
        causativeObjectPerson: "2sg",
    });
    const hostileApplicative = evaluate(ctx, {
        sourceStem: "za-zap-o-ca",
        lateVariant: "destockal-applicative",
    });

    const uncertain = evaluate(ctx, { lateVariant: "uncertain-ca" });
    const uncertainCausative = evaluate(ctx, {
        lateVariant: "uncertain-ca-causative",
        causativeObjectKind: "specific-projective",
        causativeObjectPerson: "3sg",
    });
    const uncertainApplicative = evaluate(ctx, {
        lateVariant: "uncertain-ca-applicative",
        applicativeObjectKind: "nonspecific-human",
    });
    const uncertainFused = evaluate(ctx, {
        lateVariant: "uncertain-ca-fused-tla",
    });
    const hostileUncertain = evaluate(ctx, {
        sourceStem: "zzz",
        lateVariant: "uncertain-ca",
    });

    const observations = {
        "lesson27-extinct-fused-and-role-ambiguous-destockals": {
            open: [fused.authorizationStatus, fused.operationFrame?.targetStem],
            history: fused.operationFrame?.operationFacts?.sourceHistory,
            long: [
                fused.operationFrame?.operationFacts?.fusedLongVowel,
                fused.operationFrame?.operationFacts?.fusedStockVowelRemainsLong,
            ],
            ambiguity: fused.operationFrame?.operationFacts?.licensedSemanticForces,
            selectedRole: applicativeRole.operationFrame?.operationFacts
                ?.contextualRoleSelected,
            examplesAuthorize: fused.operationFrame?.storedExampleAuthority,
            hostile: [hostileLexicalized.authorizationStatus, hostileLexicalized.blockReason],
            cue: cueRoles(ctx, fused).includes(
                "lesson27-extinct-fused-and-role-ambiguous-destockals",
            ),
        },
        "lesson27-destockal-applicative-and-type-two-causative": {
            applicative: {
                status: applicative.authorizationStatus,
                target: applicative.operationFrame?.targetStem,
                replacement: [
                    applicative.operationFrame?.operationFacts?.replacementSuffix,
                    applicative.operationFrame?.operationFacts?.addedApplicativeSuffix,
                ],
                objects: compactObjects(applicative),
                fusionRejected: applicative.operationFrame?.operationFacts
                    ?.unsupportedTlaFusionRejected,
            },
            typeTwo: {
                status: typeTwo.authorizationStatus,
                target: typeTwo.operationFrame?.targetStem,
                role: typeTwo.operationFrame?.operationFacts?.derivationRole,
                participant: typeTwo.operationFrame?.operationFacts?.addedParticipant,
                objects: compactObjects(typeTwo),
            },
            hostile: [hostileApplicative.authorizationStatus, hostileApplicative.blockReason],
            cues: [applicative, typeTwo].every((entry) => cueRoles(ctx, entry).includes(
                "lesson27-destockal-applicative-and-type-two-causative",
            )),
        },
        "lesson27-uncertain-ca-frequentatives": {
            statuses: [uncertain, uncertainCausative, uncertainApplicative, uncertainFused]
                .map((entry) => entry.authorizationStatus),
            targets: [uncertain, uncertainCausative, uncertainApplicative, uncertainFused]
                .map((entry) => entry.operationFrame?.targetStem),
            roles: [uncertain, uncertainCausative, uncertainApplicative, uncertainFused]
                .map((entry) => entry.operationFrame?.operationFacts?.derivationRole),
            copied: uncertain.operationFrame?.operationFacts?.copiedPrefix,
            lexicalMeaningInferred: uncertain.operationFrame?.operationFacts
                ?.lexicalMeaningInferred,
            causativeObjects: compactObjects(uncertainCausative),
            applicativeObjects: compactObjects(uncertainApplicative),
            fusedValence: uncertainFused.operationFrame?.targetValence,
            hostile: [hostileUncertain.authorizationStatus, hostileUncertain.blockReason],
            arbitrarySourceAdmitted: uncertain.operationFrame?.operationFacts?.openSourceShape,
            cue: cueRoles(ctx, uncertain).includes(
                "lesson27-uncertain-ca-frequentatives",
            ),
        },
    };

    const expected = {
        "lesson27-extinct-fused-and-role-ambiguous-destockals": {
            open: ["authorized", "za-zā-tz-a"],
            history: "extinct-or-fused-destockal",
            long: ["ā", true],
            ambiguity: ["causative", "applicative"],
            selectedRole: "applicative",
            examplesAuthorize: false,
            hostile: ["blocked", "completed-ca-or-tza-destockal-shape-required"],
            cue: true,
        },
        "lesson27-destockal-applicative-and-type-two-causative": {
            applicative: {
                status: "authorized",
                target: "za-zap-o-ch-i-liā",
                replacement: ["ch-i", "liā"],
                objects: [["tla", "", ""], ["tē", "nonspecific-human", "applicative"]],
                fusionRejected: true,
            },
            typeTwo: {
                status: "authorized",
                target: "za-zap-o-qui-l-tiā",
                role: "rare-type-two-causative",
                participant: { objectKind: "specific-projective", objectPerson: "2sg" },
                objects: [["m-itz", "", ""]],
            },
            hostile: ["blocked", "frequentative-destockal-tza-source-required"],
            cues: true,
        },
        "lesson27-uncertain-ca-frequentatives": {
            statuses: ["authorized", "authorized", "authorized", "authorized"],
            targets: ["za-zamal-ca", "za-zamal-tz-a", "za-zamal-tz-a", "tla-za-zamal-tz-a"],
            roles: ["intransitive", "causative", "applicative", "applicative"],
            copied: "za",
            lexicalMeaningInferred: false,
            causativeObjects: [["qui-0", "", ""]],
            applicativeObjects: [["tē", "", ""]],
            fusedValence: "intransitive",
            hostile: ["blocked", "open-uncertain-ca-root-shape-required"],
            arbitrarySourceAdmitted: true,
            cue: true,
        },
    };

    s.eq("accepted Lesson 27 Groups 7-9 use open typed Source shapes", observations, expected);
    s.eq("accepted Lesson 27 Groups 7-9 cover every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every((record) => record.reviewStatus === "ACCEPTED"),
    }, {
        records: 82,
        unique: 82,
        writing: 30,
        reading: 52,
        accepted: true,
    });

    for (const record of writing) {
        const observed = observations[record.reviewGroupId];
        s.eq(`${record.atomId} has its accepted writing job`, observed, expected[record.reviewGroupId]);
        const mutation = JSON.parse(JSON.stringify(observed));
        if (record.reviewGroupId === "lesson27-extinct-fused-and-role-ambiguous-destockals") {
            mutation.ambiguity = ["causative"];
        } else if (record.reviewGroupId === "lesson27-destockal-applicative-and-type-two-causative") {
            mutation.applicative.objects = mutation.applicative.objects.slice(0, 1);
        } else {
            mutation.targets = mutation.targets.slice(0, 3);
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
