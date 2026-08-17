"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function buildSource(ctx, stem, {
    verbClass = "B",
    sourceValence = "intransitive",
    sourceSubject = "3sg",
    objectPerson = "2sg",
    silentSpecificObject = false,
} = {}) {
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: sourceSubject,
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        requestedSourceValence: sourceValence,
        transitivity: sourceValence === "intransitive"
            ? "intransitive"
            : "transitive",
        objectKind: sourceValence === "intransitive"
            ? "none"
            : sourceValence,
        objectPerson: sourceValence === "intransitive" ? "" : objectPerson,
        silentSpecificObject,
    });
}

function inspectOption(ctx, stem, {
    verbClass = "B",
    sourceValence = "intransitive",
    objectPerson = "2sg",
    silentSpecificObject = false,
    subtype = "",
    targetStem = "",
    applicativeObjectKind = "specific-projective",
    applicativeObjectPerson = "1sg",
} = {}) {
    const source = buildSource(ctx, stem, {
        verbClass,
        sourceValence,
        objectPerson,
        silentSpecificObject,
    });
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        source,
        { derivationType: "applicative" },
    );
    const option = inventory.options.find((candidate) => (
        (!subtype || candidate.derivationSubtype === subtype)
        && (!targetStem || candidate.targetStem === targetStem)
    )) || null;
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
        source,
        {
            derivationType: "applicative",
            optionId: option?.optionId || `missing:${stem}:${targetStem}`,
            applicativeObjectKind,
            applicativeObjectPerson,
        },
    );
    const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
        source,
        operation,
        {
            mood: "indicative",
            tense: "present",
            targetSubject: "3sg",
        },
    );
    const formula = machinery.resultFrame?.formulaRealization
        || machinery.formulaRealization
        || "";
    const typed = machinery.resultFrame?.finalTypedVncSlotFrame
        || machinery.finalTypedVncSlotFrame
        || null;
    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        formula,
        typed,
        machinery,
    );
    return { source, inventory, option, operation, machinery, formula, cues };
}

function summarizeOption(option = null) {
    return option ? {
        subtype: option.derivationSubtype,
        target: option.targetStem,
        route: option.derivationRoute,
        targetClass: option.targetClass,
        lexicalChoice: option.lexicalChoiceRequired === true,
        exactWitness: option.exactWitness === true,
        construction: option.targetConstruction,
    } : null;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson26_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson26-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson26-applicative-foundation-and-irregular-sources",
        "lesson26-type-one-applicatives",
        "lesson26-type-two-foundation-and-final-i",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const maca = inspectOption(ctx, "maca", {
        verbClass: "A",
        sourceValence: "specific-projective",
        subtype: "inherent-applicative",
        targetStem: "maca",
    });
    const itziIrregular = inspectOption(ctx, "itzi", {
        subtype: "irregular-applicative",
        targetStem: "itt-a",
    });
    const itziNeutral = inspectOption(ctx, "itzi", {
        subtype: "valence-neutral-applicative",
        targetStem: "itzi",
    });

    const openTypeOne = inspectOption(ctx, "paca", {
        verbClass: "A",
        subtype: "type-one",
        targetStem: "paqu-iā",
    });
    const ixca = inspectOption(ctx, "ixca", {
        verbClass: "A",
        sourceValence: "specific-projective",
        subtype: "type-one",
        targetStem: "ixqu-iā",
    });
    const ohquetza = inspectOption(ctx, "oh-quetza", {
        verbClass: "A",
        sourceValence: "specific-projective",
        subtype: "type-one",
        targetStem: "oh-quech-iā",
    });
    const cuicatiSource = buildSource(ctx, "cuīca-ti", {
        verbClass: "B",
    });
    const cuicatiCausatives = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        cuicatiSource,
        { derivationType: "causative" },
    );
    const cuicatiApplicatives = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        cuicatiSource,
        { derivationType: "applicative" },
    );

    const openTypeTwo = inspectOption(ctx, "pati", {
        subtype: "type-two",
        targetStem: "pati-liā",
    });
    const finalSi = inspectOption(ctx, "maci", {
        sourceValence: "specific-projective",
        subtype: "type-two",
        targetStem: "maxi-liā",
    });
    const finalTzi = inspectOption(ctx, "huetzi", {
        subtype: "type-two",
        targetStem: "huechi-liā",
    });
    const finalTi = inspectOption(ctx, "mati", {
        sourceValence: "specific-projective",
        subtype: "type-two",
        targetStem: "machi-liā",
    });
    const retainedReflexive = inspectOption(ctx, "ihyāni", {
        sourceValence: "mainline-reflexive",
        objectPerson: "3sg",
        subtype: "type-two",
        targetStem: "ihyāni-liā",
    });
    const silentAyi = inspectOption(ctx, "āyi", {
        sourceValence: "specific-projective",
        objectPerson: "3sg",
        silentSpecificObject: true,
        subtype: "type-two",
        targetStem: "āyi-liā",
        applicativeObjectKind: "nonspecific-human",
        applicativeObjectPerson: "",
    });

    const hasCue = (entry, role) => entry.cues.some((cue) => cue.role === role);
    const targetRequests = (entry) => entry.operation.participantTransformFrame
        ?.targetObjectRequests || [];
    const observations = {
        "lesson26-applicative-foundation-and-irregular-sources": {
            maca: {
                inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(maca.inventory),
                selectionRequired: maca.inventory.selectionRequired,
                option: summarizeOption(maca.option),
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(maca.operation),
                sourceDepth: maca.operation.participantTransformFrame?.sourceObjectCount,
                targetDepth: maca.operation.participantTransformFrame?.targetObjectCount,
                added: maca.operation.participantTransformFrame?.addedObjectRequest,
                subjectPreserved: maca.operation.participantTransformFrame?.sourceSubjectPreservedByApplicative,
            },
            itziOptions: itziIrregular.inventory.options.map((option) => [
                option.derivationSubtype,
                option.targetStem,
                option.derivationRoute,
            ]),
            irregularDepth: targetRequests(itziIrregular).length,
            neutralDepth: targetRequests(itziNeutral).length,
            cue: hasCue(maca, "lesson26-applicative-foundation-and-irregular-sources")
                && hasCue(itziIrregular, "lesson26-applicative-foundation-and-irregular-sources"),
        },
        "lesson26-type-one-applicatives": {
            openNotList: {
                inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(openTypeOne.inventory),
                selectionRequired: openTypeOne.inventory.selectionRequired,
                option: summarizeOption(openTypeOne.option),
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(openTypeOne.operation),
                targetDepth: targetRequests(openTypeOne).length,
                addedGovernor: openTypeOne.operation.participantTransformFrame?.addedObjectRequest?.governor,
            },
            boundaryChanges: [ixca, ohquetza].map((entry) => [
                entry.option?.targetStem || "",
                entry.option?.targetConstruction?.remove || "",
                entry.option?.targetConstruction?.add || "",
            ]),
            roleChoice: {
                causativeCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(cuicatiCausatives),
                applicativeCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(cuicatiApplicatives),
                causativeBoundaryless: cuicatiCausatives.options
                    .map((option) => option.targetStem.replace(/-/gu, ""))
                    .includes("cuicatiā"),
                applicativeBoundaryless: cuicatiApplicatives.options
                    .map((option) => option.targetStem.replace(/-/gu, ""))
                    .includes("cuicatiā"),
            },
            cue: hasCue(openTypeOne, "lesson26-type-one-applicatives"),
        },
        "lesson26-type-two-foundation-and-final-i": {
            openNotList: {
                inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(openTypeTwo.inventory),
                selectionRequired: openTypeTwo.inventory.selectionRequired,
                option: summarizeOption(openTypeTwo.option),
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(openTypeTwo.operation),
                targetDepth: targetRequests(openTypeTwo).length,
            },
            shapeRoutes: [finalSi, finalTzi, finalTi].map((entry) => [
                entry.option?.targetStem || "",
                entry.option?.derivationRoute || "",
                entry.option?.targetConstruction?.remove || "",
                entry.option?.targetConstruction?.add || "",
            ]),
            reflexiveTransfer: {
                requests: targetRequests(retainedReflexive).map((request) => [
                    request.objectKind,
                    request.objectPerson,
                    request.governor,
                    request.derivationalLevel,
                ]),
                rule: retainedReflexive.operation.participantTransformFrame
                    ?.retainedSourceReflexiveShuntlineRuleFrame?.ruleId || "",
                formula: retainedReflexive.formula,
            },
            silentAyi: {
                inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(silentAyi.inventory),
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(silentAyi.operation),
                machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(silentAyi.machinery),
                formula: silentAyi.formula,
                positions: (silentAyi.machinery.targetObjectClusterFrame?.positions || []).map((position) => [
                    position.objectId,
                    position.carrier,
                    position.sounded,
                    position.prominence,
                    position.silencingRule || "",
                ]),
            },
            cue: hasCue(openTypeTwo, "lesson26-type-two-foundation-and-final-i")
                && hasCue(retainedReflexive, "lesson26-type-two-foundation-and-final-i"),
        },
    };
    const expected = {
        "lesson26-applicative-foundation-and-irregular-sources": {
            maca: {
                inventoryCanonical: true,
                selectionRequired: true,
                option: {
                    subtype: "inherent-applicative",
                    target: "maca",
                    route: "inherent-applicative-valence-import",
                    targetClass: "A",
                    lexicalChoice: false,
                    exactWitness: true,
                    construction: { operation: "identity-stem-with-valence-increase" },
                },
                operationCanonical: true,
                sourceDepth: 1,
                targetDepth: 2,
                added: {
                    objectId: "applicative-object",
                    objectKind: "specific-projective",
                    objectPerson: "1sg",
                    governor: "applicative",
                    derivationalLevel: 2,
                },
                subjectPreserved: true,
            },
            itziOptions: [
                ["irregular-applicative", "itt-a", "irregular-applicative-itzi-to-itta"],
                ["valence-neutral-applicative", "itzi", "valence-neutral-applicative-identity"],
                ["type-two", "itzi-liā", "type-two-final-i-append-lia"],
            ],
            irregularDepth: 1,
            neutralDepth: 1,
            cue: true,
        },
        "lesson26-type-one-applicatives": {
            openNotList: {
                inventoryCanonical: true,
                selectionRequired: true,
                option: {
                    subtype: "type-one",
                    target: "paqu-iā",
                    route: "type-one-final-vowel-replacement-optional",
                    targetClass: "C",
                    lexicalChoice: true,
                    exactWitness: false,
                    construction: { operation: "replace-final-vowel", remove: "a", add: "iā" },
                },
                operationCanonical: true,
                targetDepth: 1,
                addedGovernor: "applicative",
            },
            boundaryChanges: [
                ["ixqu-iā", "ca", "qu-iā"],
                ["oh-quech-iā", "tza", "ch-iā"],
            ],
            roleChoice: {
                causativeCanonical: true,
                applicativeCanonical: true,
                causativeBoundaryless: true,
                applicativeBoundaryless: true,
            },
            cue: true,
        },
        "lesson26-type-two-foundation-and-final-i": {
            openNotList: {
                inventoryCanonical: true,
                selectionRequired: true,
                option: {
                    subtype: "type-two",
                    target: "pati-liā",
                    route: "type-two-final-i-append-lia",
                    targetClass: "C",
                    lexicalChoice: false,
                    exactWitness: false,
                    construction: { operation: "append", remove: "", add: "liā" },
                },
                operationCanonical: true,
                targetDepth: 1,
            },
            shapeRoutes: [
                ["maxi-liā", "type-two-final-si-to-xi-append-lia", "ci", "xi-liā"],
                ["huechi-liā", "type-two-final-tzi-to-chi-lia-exact", "tzi", "chi-liā"],
                ["machi-liā", "type-two-final-ti-to-chi-lia-exact", "ti", "chi-liā"],
            ],
            reflexiveTransfer: {
                requests: [
                    ["reflexive", "nonfirst-common", "directive", 1],
                    ["specific-projective", "1sg", "applicative", 2],
                ],
                rule: "cn-vnc-retained-source-mainline-reflexive-to-shuntline-ne",
                formula: "#0-0+n-ēch+ne(ihyāni-lia)0+0-0#",
            },
            silentAyi: {
                inventoryCanonical: true,
                operationCanonical: true,
                machineryCanonical: true,
                formula: "#0-0+⎕-0+tē(āyi-lia)0+0-0#",
                positions: [
                    ["source-object-1", "⎕-0", false, "shuntline", "lesson18.8-ayi-silent-specific-object-retained"],
                    ["applicative-object", "tē", true, "mainline", ""],
                ],
            },
            cue: true,
        },
    };
    const mutations = {
        "lesson26-applicative-foundation-and-irregular-sources": [
            !ctx.isClassicalNahuatlVncDerivationOptionInventory(maca.inventory),
            !ctx.isClassicalNahuatlVncDerivationOperationFrame(itziIrregular.operation),
            itziNeutral.option?.targetStem !== "itzi",
            !hasCue(maca, "lesson26-applicative-foundation-and-irregular-sources"),
        ],
        "lesson26-type-one-applicatives": [
            openTypeOne.option?.exactWitness === true,
            openTypeOne.option?.lexicalChoiceRequired !== true,
            openTypeOne.option?.targetStem !== "paqu-iā",
            ixca.option?.targetStem !== "ixqu-iā",
            ohquetza.option?.targetStem !== "oh-quech-iā",
            !hasCue(openTypeOne, "lesson26-type-one-applicatives"),
        ],
        "lesson26-type-two-foundation-and-final-i": [
            openTypeTwo.option?.exactWitness === true,
            openTypeTwo.option?.targetStem !== "pati-liā",
            finalSi.option?.targetStem !== "maxi-liā",
            finalTzi.option?.targetStem !== "huechi-liā",
            finalTi.option?.targetStem !== "machi-liā",
            retainedReflexive.operation.participantTransformFrame
                ?.retainedSourceReflexiveShuntlineRuleFrame?.targetObjectPerson
                !== "nonfirst-common",
            silentAyi.formula !== "#0-0+⎕-0+tē(āyi-lia)0+0-0#",
            !hasCue(openTypeTwo, "lesson26-type-two-foundation-and-final-i"),
        ],
    };

    s.eq("accepted Lesson 26 Groups 1-3 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => (
            record.proposedDirection === "READING_ONLY"
        )).length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 217, records: 217, both: 101, readingOnly: 116, unique: 217 });
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
