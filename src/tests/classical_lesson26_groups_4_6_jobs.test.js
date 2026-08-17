"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function buildSource(ctx, stem, {
    verbClass = "B",
    sourceValence = "intransitive",
    objectPerson = "2sg",
} = {}) {
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        requestedSourceValence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: sourceValence === "intransitive" ? "none" : sourceValence,
        objectPerson: sourceValence === "intransitive" ? "" : objectPerson,
    });
}

function inspectOption(ctx, stem, {
    verbClass = "B",
    sourceValence = "intransitive",
    targetStem = "",
    route = "",
} = {}) {
    const source = buildSource(ctx, stem, { verbClass, sourceValence });
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        source,
        { derivationType: "applicative" },
    );
    const option = inventory.options.find((candidate) => (
        (!targetStem || candidate.targetStem === targetStem)
        && (!route || candidate.derivationRoute === route)
    )) || null;
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
        source,
        {
            derivationType: "applicative",
            optionId: option?.optionId || `missing:${stem}:${targetStem}:${route}`,
            applicativeObjectKind: "specific-projective",
            applicativeObjectPerson: "1sg",
        },
    );
    const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
        source,
        operation,
        { mood: "indicative", tense: "present", targetSubject: "3sg" },
    );
    const formula = machinery.resultFrame?.formulaRealization
        || machinery.formulaRealization
        || "";
    const typed = machinery.resultFrame?.finalTypedVncSlotFrame
        || machinery.finalTypedVncSlotFrame
        || null;
    const cues = ctx.getClassicalFormulaDerivedAnnotations(formula, typed, machinery);
    return { source, inventory, option, operation, machinery, formula, cues };
}

function summarizeOption(entry) {
    const option = entry.option;
    return option ? {
        target: option.targetStem,
        route: option.derivationRoute,
        construction: {
            operation: option.targetConstruction?.operation || "",
            remove: option.targetConstruction?.remove || "",
            add: option.targetConstruction?.add || "",
        },
        targetClass: option.targetClass,
        exact: option.exactWitness === true,
        tier: option.formationRuleTier,
    } : null;
}

function deriveSignedHistory(ctx, sourceStem, sourceClass, causativeTarget) {
    const source = buildSource(ctx, sourceStem, {
        verbClass: sourceClass,
        sourceValence: "intransitive",
    });
    const causativeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        source,
        { derivationType: "causative" },
    );
    const causativeOption = causativeInventory.options.find((option) => (
        option.targetStem === causativeTarget && option.causativeOaHistory
    ));
    const causativeOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
        source,
        {
            derivationType: "causative",
            optionId: causativeOption?.optionId || "missing-signed-o-a-source",
            targetSubject: "1sg",
        },
    );
    const causativeMachinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
        source,
        causativeOperation,
        { mood: "indicative", tense: "present", targetSubject: "1sg" },
    );
    const applicativeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        causativeMachinery,
        { derivationType: "applicative" },
    );
    return {
        causativeTarget: causativeOption?.targetStem || "",
        history: causativeOption?.causativeOaHistory?.underlyingDestockalVowel || "",
        causativeCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(causativeOperation)
            && ctx.isClassicalNahuatlDerivedVncMachineryFrame(causativeMachinery),
        applicativeCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(applicativeInventory),
        selectorRequired: applicativeInventory.selectorRequired,
        options: applicativeInventory.options.map((option) => [
            option.targetStem,
            option.derivationRoute,
            option.formationRuleTier,
        ]),
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson26_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson26-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson26-final-a-source-routes",
        "lesson26-shape-and-class-exceptions",
        "lesson26-oa-and-huia-routes",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const finalIa = inspectOption(ctx, "tlami-ā", {
        verbClass: "C",
        sourceValence: "specific-projective",
        targetStem: "tlami-liā",
    });
    const recursive = inspectOption(ctx, "ce-liā", {
        verbClass: "C",
        sourceValence: "specific-projective",
        targetStem: "ce-li-liā",
    });
    const openFinalA = inspectOption(ctx, "āna", {
        verbClass: "A",
        sourceValence: "specific-projective",
        targetStem: "āni-liā",
    });
    const exactTl = inspectOption(ctx, "pa-tla", {
        verbClass: "A",
        sourceValence: "specific-projective",
        targetStem: "pa-ti-liā",
    });

    const openClassD = inspectOption(ctx, "xā", {
        verbClass: "D",
        sourceValence: "specific-projective",
        targetStem: "xā-liā",
    });
    const openIya = inspectOption(ctx, "miya", {
        verbClass: "B",
        sourceValence: "specific-projective",
        targetStem: "miya-liā",
    });
    const openEya = inspectOption(ctx, "xeya", {
        verbClass: "B",
        sourceValence: "intransitive",
        targetStem: "xe-liā",
    });
    const openIntransitiveOya = inspectOption(ctx, "zoya", {
        verbClass: "B",
        sourceValence: "intransitive",
        targetStem: "zo-liā",
    });
    const openTransitiveOya = inspectOption(ctx, "zoyā", {
        verbClass: "B",
        sourceValence: "specific-projective",
        targetStem: "zoyā-liā",
    });

    const rootFinalL = inspectOption(ctx, "xel-o-ā", {
        verbClass: "C",
        sourceValence: "specific-projective",
        targetStem: "xel-huiā",
    });
    const unknownHistory = inspectOption(ctx, "pach-o-ā", {
        verbClass: "C",
        sourceValence: "specific-projective",
        targetStem: "pach-i-l-huiā",
    });
    const exceptionalLia = inspectOption(ctx, "tēm-o-ā", {
        verbClass: "C",
        sourceValence: "specific-projective",
        targetStem: "tēm-o-liā",
    });
    const suppletive = inspectOption(ctx, "iht-o-ā", {
        verbClass: "C",
        sourceValence: "specific-projective",
        targetStem: "il-huiā",
    });
    const signedIHui = deriveSignedHistory(ctx, "tep-i-hui", "B", "tep-o-ā");

    const hasCue = (entry, role) => entry.cues.some((cue) => cue.role === role);
    const observations = {
        "lesson26-final-a-source-routes": {
            finalIa: {
                canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(finalIa.inventory),
                selectionRequired: finalIa.inventory.selectionRequired,
                option: summarizeOption(finalIa),
            },
            openFinalA: {
                selectionRequired: openFinalA.inventory.selectionRequired,
                option: summarizeOption(openFinalA),
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(openFinalA.operation),
            },
            recursive: {
                option: summarizeOption(recursive),
                objectCounts: [
                    recursive.operation.participantTransformFrame?.sourceObjectCount,
                    recursive.operation.participantTransformFrame?.targetObjectCount,
                ],
                formula: recursive.formula,
            },
            exactTl: summarizeOption(exactTl),
            cue: hasCue(finalIa, "lesson26-final-a-source-routes")
                && hasCue(openFinalA, "lesson26-final-a-source-routes")
                && hasCue(recursive, "lesson26-final-a-source-routes"),
        },
        "lesson26-shape-and-class-exceptions": {
            openRoutes: [openClassD, openIya, openEya].map(summarizeOption),
            oyaByTypedValence: [
                summarizeOption(openIntransitiveOya),
                summarizeOption(openTransitiveOya),
            ],
            canonical: [openClassD, openIya, openEya, openIntransitiveOya, openTransitiveOya]
                .every((entry) => (
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(entry.inventory)
                    && ctx.isClassicalNahuatlVncDerivationOperationFrame(entry.operation)
                )),
            cue: hasCue(openClassD, "lesson26-shape-and-class-exceptions")
                && hasCue(openIya, "lesson26-shape-and-class-exceptions")
                && hasCue(openEya, "lesson26-shape-and-class-exceptions")
                && hasCue(openTransitiveOya, "lesson26-shape-and-class-exceptions"),
        },
        "lesson26-oa-and-huia-routes": {
            automaticRootFinalL: {
                selectionRequired: rootFinalL.inventory.selectionRequired,
                option: summarizeOption(rootFinalL),
            },
            unknownHistory: {
                selectionRequired: unknownHistory.inventory.selectionRequired,
                options: unknownHistory.inventory.options.map((option) => [
                    option.targetStem,
                    option.sourceHistoryChoice || "",
                    option.formationRuleTier,
                ]),
                selected: summarizeOption(unknownHistory),
            },
            signedIHui,
            lexicalRoutes: [summarizeOption(exceptionalLia), summarizeOption(suppletive)],
            canonical: [rootFinalL, unknownHistory, exceptionalLia, suppletive].every((entry) => (
                ctx.isClassicalNahuatlVncDerivationOptionInventory(entry.inventory)
                && ctx.isClassicalNahuatlVncDerivationOperationFrame(entry.operation)
            )),
            cue: hasCue(rootFinalL, "lesson26-oa-and-huia-routes")
                && hasCue(unknownHistory, "lesson26-oa-and-huia-routes")
                && hasCue(exceptionalLia, "lesson26-oa-and-huia-routes")
                && hasCue(suppletive, "lesson26-oa-and-huia-routes"),
        },
    };
    const expected = {
        "lesson26-final-a-source-routes": {
            finalIa: {
                canonical: true,
                selectionRequired: false,
                option: {
                    target: "tlami-liā",
                    route: "type-two-final-ia-delete-a-add-lia",
                    construction: { operation: "replace-final", remove: "ā", add: "liā" },
                    targetClass: "C",
                    exact: false,
                    tier: "productive-final-shape",
                },
            },
            openFinalA: {
                selectionRequired: true,
                option: {
                    target: "āni-liā",
                    route: "type-two-consonant-final-a-to-i-lia",
                    construction: { operation: "replace-and-append", remove: "a", add: "i-liā" },
                    targetClass: "C",
                    exact: false,
                    tier: "productive-final-shape",
                },
                operationCanonical: true,
            },
            recursive: {
                option: {
                    target: "ce-li-liā",
                    route: "type-two-final-ia-delete-a-add-lia",
                    construction: { operation: "replace-final", remove: "ā", add: "liā" },
                    targetClass: "C",
                    exact: false,
                    tier: "productive-final-shape",
                },
                objectCounts: [1, 2],
                formula: "#0-0+n-ēch+⎕-⎕(ce-li-lia)0+0-0#",
            },
            exactTl: {
                target: "pa-ti-liā",
                route: "type-two-final-tla-to-ti-lia-exact",
                construction: { operation: "replace-final-tla-with-ti-and-append", remove: "tla", add: "ti-liā" },
                targetClass: "C",
                exact: true,
                tier: "exact-lexical-overlay",
            },
            cue: true,
        },
        "lesson26-shape-and-class-exceptions": {
            openRoutes: [
                {
                    target: "xā-liā",
                    route: "type-two-class-d-append-lia",
                    construction: { operation: "append", remove: "", add: "liā" },
                    targetClass: "C",
                    exact: false,
                    tier: "typed-class-exception",
                },
                {
                    target: "miya-liā",
                    route: "type-two-class-b-transitive-iya-append-lia",
                    construction: { operation: "append", remove: "", add: "liā" },
                    targetClass: "C",
                    exact: false,
                    tier: "typed-class-valence-exception",
                },
                {
                    target: "xe-liā",
                    route: "type-two-class-b-intransitive-eya-delete-ya-add-lia",
                    construction: { operation: "replace-final", remove: "ya", add: "liā" },
                    targetClass: "C",
                    exact: false,
                    tier: "typed-class-valence-exception",
                },
            ],
            oyaByTypedValence: [
                {
                    target: "zo-liā",
                    route: "type-two-intransitive-oya-delete-ya-add-lia",
                    construction: { operation: "replace-final", remove: "ya", add: "liā" },
                    targetClass: "C",
                    exact: false,
                    tier: "typed-valence-exception",
                },
                {
                    target: "zoyā-liā",
                    route: "type-two-transitive-oya-append-lia",
                    construction: { operation: "append", remove: "", add: "liā" },
                    targetClass: "C",
                    exact: false,
                    tier: "typed-valence-exception",
                },
            ],
            canonical: true,
            cue: true,
        },
        "lesson26-oa-and-huia-routes": {
            automaticRootFinalL: {
                selectionRequired: false,
                option: {
                    target: "xel-huiā",
                    route: "type-two-huia-from-root-final-l-o-a",
                    construction: { operation: "replace-final-o-a", remove: "o-a", add: "huiā" },
                    targetClass: "C",
                    exact: false,
                    tier: "typed-internal-morphology",
                },
            },
            unknownHistory: {
                selectionRequired: true,
                options: [
                    ["pach-a-l-huiā", "a-hui", "generated-source-history-choice"],
                    ["pach-i-l-huiā", "i-hui", "generated-source-history-choice"],
                    ["pach-o-l-huiā", "root-final-o", "generated-source-history-choice"],
                ],
                selected: {
                    target: "pach-i-l-huiā",
                    route: "type-two-huia-from-selected-i-hui-history",
                    construction: { operation: "recover-i-hui-history-and-add-i-l-huia", remove: "", add: "i-l-huiā" },
                    targetClass: "C",
                    exact: false,
                    tier: "generated-source-history-choice",
                },
            },
            signedIHui: {
                causativeTarget: "tep-o-ā",
                history: "i",
                causativeCanonical: true,
                applicativeCanonical: true,
                selectorRequired: false,
                options: [[
                    "tep-i-l-huiā",
                    "type-two-huia-from-signed-causative-o-a-history",
                    "signed-prior-derivation-history",
                ]],
            },
            lexicalRoutes: [
                {
                    target: "tēm-o-liā",
                    route: "type-two-exceptional-final-o-a-to-o-lia",
                    construction: { operation: "replace-final", remove: "a", add: "liā" },
                    targetClass: "C",
                    exact: true,
                    tier: "exceptional-lexical-rule",
                },
                {
                    target: "il-huiā",
                    route: "type-two-suppletive-ihtoa-to-il-huia-exact",
                    construction: { operation: "suppletive-base", remove: "", add: "huiā" },
                    targetClass: "C",
                    exact: true,
                    tier: "suppletive-lexical-rule",
                },
            ],
            canonical: true,
            cue: true,
        },
    };
    const mutations = {
        "lesson26-final-a-source-routes": [
            finalIa.option?.targetStem !== "tlami-liā",
            openFinalA.option?.targetStem !== "āni-liā",
            recursive.operation.participantTransformFrame?.targetObjectCount !== 2,
            exactTl.option?.derivationRoute !== "type-two-final-tla-to-ti-lia-exact",
            !hasCue(openFinalA, "lesson26-final-a-source-routes"),
        ],
        "lesson26-shape-and-class-exceptions": [
            openClassD.option?.targetStem !== "xā-liā",
            openIya.option?.targetStem !== "miya-liā",
            openEya.option?.targetStem !== "xe-liā",
            openIntransitiveOya.option?.targetStem === openTransitiveOya.option?.targetStem,
            !hasCue(openClassD, "lesson26-shape-and-class-exceptions"),
        ],
        "lesson26-oa-and-huia-routes": [
            rootFinalL.inventory.selectionRequired !== false,
            unknownHistory.inventory.options.length !== 3,
            signedIHui.selectorRequired !== false,
            exceptionalLia.option?.targetStem !== "tēm-o-liā",
            suppletive.option?.targetStem !== "il-huiā",
            !hasCue(unknownHistory, "lesson26-oa-and-huia-routes"),
        ],
    };

    s.eq("accepted Lesson 26 Groups 4-6 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => record.proposedDirection === "READING_ONLY").length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 189, records: 189, both: 103, readingOnly: 86, unique: 189 });
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
