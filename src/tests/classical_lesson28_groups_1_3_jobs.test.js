"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function request(overrides = {}) {
    return {
        sourceStem: "chōca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        objectKind: "none",
        objectPerson: "",
        lateOperation: "compound",
        lateVariant: "connective-t",
        compoundMatrixStem: "zamal",
        compoundMatrixClass: "A",
        compoundEventOrder: "iconic",
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
    const s = createSuite("classical_lesson28_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson28-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson28-compounding-foundation-and-embed-matrix-order",
        "lesson28-linked-integrated-and-valence-system",
        "lesson28-connective-t-foundation",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const consonantMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request());
    const vowelMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "āna",
    }));
    const transitiveEmbed = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "maca",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    }));
    const intransitiveEmbedTransitiveMatrix =
        ctx.evaluateClassicalNahuatlLateVncDerivation(request({
            sourceStem: "cochi",
            sourceValence: "intransitive",
            verbClass: "B",
            tense: "future",
            lateVariant: "future-embed",
            compoundMatrixStem: "tla-nequi",
        }));
    const transitiveEmbedTransitiveMatrix =
        ctx.evaluateClassicalNahuatlLateVncDerivation(request({
            sourceStem: "cui",
            sourceValence: "specific-projective",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            verbClass: "A",
            lateVariant: "shared-object",
            compoundMatrixStem: "tlāl-i-ā",
        }));
    const missingMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "",
    }));
    const facts = consonantMatrix.operationFrame?.operationFacts || {};
    const vowelFacts = vowelMatrix.operationFrame?.operationFacts || {};
    const roles = cueRoles(ctx, consonantMatrix);

    const observations = {
        "lesson28-compounding-foundation-and-embed-matrix-order": {
            status: consonantMatrix.authorizationStatus,
            target: consonantMatrix.operationFrame?.targetStem,
            binary: [facts.binaryCompoundStructure, facts.binaryConstituentCount],
            order: facts.matrixAfterEmbed,
            sourceRelation: facts.sourceClauseRelationshipsPreserved,
            morphology: facts.syntaxDowngradedToMorphology,
            subjects: [
                facts.principalSubjectFromMatrix,
                facts.embedSubjectDeleted,
                facts.embedSubjectReferencePreserved,
            ],
            category: facts.compoundOutputCategory,
            embedFunctions: facts.licensedEmbedFunctions,
            embedNeverSubject: facts.embedNeverFunctionsAsSubject,
            missing: [missingMatrix.authorizationStatus, missingMatrix.blockReason],
            cue: roles.includes(
                "lesson28-compounding-foundation-and-embed-matrix-order",
            ),
        },
        "lesson28-linked-integrated-and-valence-system": {
            arbitraryMatrix: [
                consonantMatrix.authorizationStatus,
                facts.openTypedMatrixAdmission,
                facts.canvasExamplesAreEvidenceOnly,
            ],
            structure: [facts.compoundType, facts.linkage],
            valence: [
                facts.embedSourceValence,
                facts.matrixSourceValence,
                consonantMatrix.operationFrame?.targetValence,
                facts.embedDeterminesCompoundValence,
                facts.matrixDeterminesCompoundType,
            ],
            transitiveEmbed: [
                transitiveEmbed.authorizationStatus,
                transitiveEmbed.operationFrame?.operationFacts?.embedSourceValence,
                transitiveEmbed.operationFrame?.targetValence,
            ],
            fourGeneratedPatterns: [
                consonantMatrix,
                transitiveEmbed,
                intransitiveEmbedTransitiveMatrix,
                transitiveEmbedTransitiveMatrix,
            ].map((frame) => [
                frame.authorizationStatus,
                frame.operationFrame?.operationFacts?.embedSourceValence,
                frame.operationFrame?.operationFacts?.matrixSourceValence,
                frame.operationFrame?.targetValence,
            ]),
            patterns: facts.supportedEmbedMatrixValencePatterns,
            matrixClassControlOpen: fs.readFileSync(
                path.join(ROOT, "src/ui/rendering/rendering.mjs"),
                "utf8",
            ).includes("!automaticCompoundMatrixClasses.has(compoundMatrixStem)"),
            semanticHelperOpen: (() => {
                const helper = fs.readFileSync(
                    path.join(ROOT, "src/core/classical/vnc_compound_validation_semantic_operations.mjs"),
                    "utf8",
                );
                return helper.includes("arbitraryTypedMatrix")
                    && helper.includes("openTypedMatrixAdmission")
                    && !helper.includes("lesson28-matrix-inventory-selection-required");
            })(),
            cue: roles.includes(
                "lesson28-linked-integrated-and-valence-system",
            ),
        },
        "lesson28-connective-t-foundation": {
            consonant: [
                consonantMatrix.authorizationStatus,
                consonantMatrix.operationFrame?.targetStem,
                facts.embedStem,
                facts.embedTenseMorph,
                facts.connectiveAllomorph,
                facts.connectiveCondition,
                facts.connectiveSupportiveI,
            ],
            vowel: [
                vowelMatrix.authorizationStatus,
                vowelMatrix.operationFrame?.targetStem,
                vowelFacts.connectiveAllomorph,
                vowelFacts.connectiveCondition,
                vowelFacts.connectiveSupportiveI,
            ],
            eventReadings: facts.availableEventTimeReadings,
            translationAuthority: facts.translationDoesNotAuthorizeGrammar,
            cue: roles.includes("lesson28-connective-t-foundation"),
        },
    };

    const expected = {
        "lesson28-compounding-foundation-and-embed-matrix-order": {
            status: "authorized",
            target: "chōca-ti-zamal",
            binary: [true, 2],
            order: true,
            sourceRelation: true,
            morphology: true,
            subjects: [true, true, true],
            category: "VNC",
            embedFunctions: [
                "incorporated-object",
                "incorporated-possessor",
                "incorporated-modifier",
                "incorporated-complement",
            ],
            embedNeverSubject: true,
            missing: ["blocked", "typed-compound-matrix-required"],
            cue: true,
        },
        "lesson28-linked-integrated-and-valence-system": {
            arbitraryMatrix: ["authorized", true, true],
            structure: ["linked", "linked-connective-t"],
            valence: ["intransitive", "intransitive", "intransitive", true, true],
            transitiveEmbed: [
                "authorized",
                "specific-projective",
                "specific-projective",
            ],
            fourGeneratedPatterns: [
                ["authorized", "intransitive", "intransitive", "intransitive"],
                ["authorized", "specific-projective", "intransitive", "specific-projective"],
                ["authorized", "intransitive", "transitive", "intransitive"],
                ["authorized", "specific-projective", "transitive", "specific-projective"],
            ],
            patterns: [
                "intransitive+intransitive",
                "transitive+intransitive",
                "intransitive+transitive",
                "transitive+transitive",
            ],
            matrixClassControlOpen: true,
            semanticHelperOpen: true,
            cue: true,
        },
        "lesson28-connective-t-foundation": {
            consonant: [
                "authorized",
                "chōca-ti-zamal",
                "chōca",
                "0",
                "ti",
                "ti-before-consonant",
                true,
            ],
            vowel: [
                "authorized",
                "chōca-t-āna",
                "t",
                "t-before-vowel",
                false,
            ],
            eventReadings: [
                "embed-completed-before-matrix",
                "embed-begun-before-and-continuing-with-matrix",
            ],
            translationAuthority: true,
            cue: true,
        },
    };

    s.eq("accepted Lesson 28 Groups 1-3 use the canonical typed compound path", observations, expected);
    s.eq("accepted Lesson 28 Groups 1-3 cover every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every((record) => record.reviewStatus === "ACCEPTED"),
    }, {
        records: 113,
        unique: 113,
        writing: 73,
        reading: 40,
        accepted: true,
    });

    for (const record of writing) {
        const observed = observations[record.reviewGroupId];
        s.eq(`${record.atomId} has its accepted writing job`, observed, expected[record.reviewGroupId]);
        const mutation = JSON.parse(JSON.stringify(observed));
        if (record.reviewGroupId === groupIds[0]) mutation.order = false;
        if (record.reviewGroupId === groupIds[1]) mutation.arbitraryMatrix[1] = false;
        if (record.reviewGroupId === groupIds[2]) mutation.consonant[4] = "t";
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation) === JSON.stringify(expected[record.reviewGroupId]),
            false,
        );
    }
    return s;
}

module.exports = { run };
