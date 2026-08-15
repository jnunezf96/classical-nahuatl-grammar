"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson20_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson20-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson20-nonactive-foundation-and-suffixes",
        "lesson20-regular-lo-and-root-ya",
        "lesson20-class-c-d-lo-and-irregular-lohua",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const inventory = (stem, verbClass, sourceValence) => (
        ctx.getClassicalNahuatlNonactiveStemOptions(stem, {
            verbClass,
            sourceValence,
        })
    );
    const derive = (stem, verbClass, sourceValence, optionId = "") => (
        ctx.deriveClassicalNahuatlNonactiveStemRecord(stem, {
            verbClass,
            sourceValence,
            ...(optionId ? { optionId } : {}),
        })
    );
    const optionSummary = (result) => result.options.map((option) => ({
        id: option.optionId,
        stem: option.nonactiveStem,
        family: option.suffixFamily,
        role: option.optionRole,
    }));
    const cueLabels = (formula, grammarContext) => (
        ctx.getClassicalFormulaDerivedAnnotations(
            formula,
            null,
            grammarContext,
        ).map((cue) => cue.label)
    );

    const mayana = inventory("mayāna", "B", "intransitive");
    const mayanaRecord = derive("mayāna", "B", "intransitive");
    const huicatz = inventory(
        "huica-tz",
        "B",
        "specific-projective",
    );
    const huicatzMissingChoice = derive(
        "huica-tz",
        "B",
        "specific-projective",
    );
    const huicatzLo = derive(
        "huica-tz",
        "B",
        "specific-projective",
        "lo-hua:huica-lo-hua-tz",
    );
    const hiddenAnswer = ctx.getClassicalNahuatlNonactiveStemOptions(
        "mayāna",
        {
            verbClass: "B",
            sourceValence: "intransitive",
            nonactiveStem: "mayāna-lō",
        },
    );

    const nequiya = inventory("nequi-ya", "B", "intransitive");
    const nequiyaSolid = inventory("nequiya", "B", "intransitive");
    const nequiyaClassA = inventory("nequiya", "A", "intransitive");
    const copiedMayanaRecord = { ...mayanaRecord };

    const classC = inventory(
        "pol-o-ā",
        "C",
        "projective-nonhuman",
    );
    const classD = inventory(
        "māmā",
        "D",
        "specific-projective",
    );
    const chihuaRecord = derive(
        "chihua",
        "A",
        "specific-projective",
    );
    const cah = inventory("ca-h", "A", "intransitive");
    const yauh = inventory("ya-uh", "A", "intransitive");
    const huallauh = inventory("huāl-la-uh", "A", "intransitive");
    const huitz = inventory("huī-tz", "A", "intransitive");
    const itquitz = inventory("itqui-tz", "A", "intransitive");
    const unknownConsonant = inventory(
        "xoch-tz",
        "B",
        "intransitive",
    );

    const observations = {
        "lesson20-nonactive-foundation-and-suffixes": {
            cores: mayana.formationCores,
            families: ["ō", "lō", "hua", "o-hua", "lo-hua", "hua-lō"]
                .map((family) => [
                    family,
                    ctx.getClassicalNahuatlNonactiveFormationStructure(family)
                        .formationCore,
                ]),
            determinate: {
                options: optionSummary(mayana),
                selector: mayana.selectorRequired,
                automatic: mayana.automaticOptionId,
                record: [
                    mayanaRecord.authorizationStatus,
                    mayanaRecord.nonactiveStem,
                    mayanaRecord.imperfectiveNonactiveStem,
                    mayanaRecord.perfectiveNonactiveStem,
                ],
            },
            alternatives: {
                options: optionSummary(huicatz),
                selector: huicatz.selectorRequired,
                automatic: huicatz.automaticOptionId,
                missingChoice: [
                    huicatzMissingChoice.authorizationStatus,
                    huicatzMissingChoice.blockReason,
                ],
            },
            boundaries: {
                structure: huicatzLo.formationStructure.sequence,
                surfaceIsRealization: huicatzLo.surfaceFamilyIsRealization,
                userTypedTargetAllowed: huicatz.userSuppliedDerivedStemAllowed,
            },
        },
        "lesson20-regular-lo-and-root-ya": {
            ordinary: [
                mayana.options[0]?.ruleId,
                mayana.options[0]?.nonactiveStem,
            ],
            segmented: [
                nequiya.options[0]?.ruleId,
                nequiya.options[0]?.nonactiveStem,
                nequiya.sourceIdentityFrame.internalMorphology
                    .explicitRootPlusYaBoundary,
            ],
            solid: [
                nequiyaSolid.options[0]?.ruleId,
                nequiyaSolid.options[0]?.nonactiveStem,
                nequiyaSolid.sourceIdentityFrame.internalMorphology
                    .rootPlusYaAnalysisAuthorized,
            ],
            cue: cueLabels(
                "#0-0(mayāna-lo)0+0-0#",
                { nonactiveStemRecord: mayanaRecord },
            ).some((label) => (
                label.includes("mayāna → mayāna-lō")
                && label.includes("automatic licensed formation")
            )),
        },
        "lesson20-class-c-d-lo-and-irregular-lohua": {
            classC: [
                classC.options[0]?.nonactiveStem,
                classC.options[0]?.finalShapeRelation?.replacementShape,
                classC.options[0]?.ruleId,
            ],
            classD: [
                classD.options[0]?.nonactiveStem,
                classD.options[0]?.finalShapeRelation?.replacementShape,
                classD.options[0]?.ruleId,
            ],
            exceptionalQuantity: [
                chihuaRecord.imperfectiveNonactiveStem,
                chihuaRecord.perfectiveNonactiveStem,
            ],
            suppletion: [
                cah.options[0]?.nonactiveStem,
                yauh.options[0]?.nonactiveStem,
                huallauh.options[0]?.nonactiveStem,
            ],
            compounds: [
                [huitz.options[0]?.nonactiveStem, huitz.options[0]?.attachmentSite],
                [itquitz.options[0]?.nonactiveStem, itquitz.options[0]?.attachmentSite],
                [huicatzLo.nonactiveStem, huicatzLo.attachmentSite],
            ],
            cue: cueLabels(
                "#0-0(huica-lo-hua-tz)0+0-0#",
                huicatzLo,
            ).some((label) => (
                label.includes("chosen from licensed alternatives")
                && label.includes("first compound member")
            )),
        },
    };
    const expected = {
        "lesson20-nonactive-foundation-and-suffixes": {
            cores: ["o", "lo", "hua"],
            families: [
                ["ō", "o"],
                ["lō", "lo"],
                ["hua", "hua"],
                ["o-hua", "o"],
                ["lo-hua", "lo"],
                ["hua-lō", "hua"],
            ],
            determinate: {
                options: [{
                    id: "lō:mayāna-lō",
                    stem: "mayāna-lō",
                    family: "lō",
                    role: "determinate",
                }],
                selector: false,
                automatic: "lō:mayāna-lō",
                record: [
                    "authorized",
                    "mayāna-lō",
                    "mayāna-lō",
                    "mayāna-lō",
                ],
            },
            alternatives: {
                options: [
                    {
                        id: "lo-hua:huica-lo-hua-tz",
                        stem: "huica-lo-hua-tz",
                        family: "lo-hua",
                        role: "user-choice",
                    },
                    {
                        id: "o-hua:huīc-o-hua-tz",
                        stem: "huīc-o-hua-tz",
                        family: "o-hua",
                        role: "user-choice",
                    },
                ],
                selector: true,
                automatic: "",
                missingChoice: [
                    "blocked",
                    "lesson20-nonactive-option-selection-required",
                ],
            },
            boundaries: {
                structure: ["lo", "hua"],
                surfaceIsRealization: true,
                userTypedTargetAllowed: false,
            },
        },
        "lesson20-regular-lo-and-root-ya": {
            ordinary: ["cn-l20-2-final-a", "mayāna-lō"],
            segmented: [
                "cn-l20-2-class-b-root-plus-ya-deletion",
                "nequi-lō",
                true,
            ],
            solid: [
                "cn-l20-2-class-b-root-plus-ya-deletion",
                "nequi-lō",
                true,
            ],
            cue: true,
        },
        "lesson20-class-c-d-lo-and-irregular-lohua": {
            classC: [
                "pol-ō-lō",
                "o-ā > ō-lō",
                "cn-l20-2-class-c-o-a",
            ],
            classD: [
                "māma-lō",
                "ā > a-lō",
                "cn-l20-2-class-d-reduced-long-before-lo",
            ],
            exceptionalQuantity: ["chihua-lō", "chīhua-lō"],
            suppletion: ["ye-lo-hua", "hui-lo-hua", "huāl-hui-lo-hua"],
            compounds: [
                ["huī-lo-hua-tz", "first-compound-member"],
                ["itqui-lo-hua-tz", "first-compound-member"],
                ["huica-lo-hua-tz", "first-compound-member"],
            ],
            cue: true,
        },
    };
    const mutations = {
        "lesson20-nonactive-foundation-and-suffixes": [
            hiddenAnswer.authorizationStatus,
            hiddenAnswer.blockReason,
            huicatzMissingChoice.blockReason,
        ],
        "lesson20-regular-lo-and-root-ya": [
            nequiyaClassA.options.map((option) => option.nonactiveStem),
            ctx.isClassicalNahuatlNonactiveStemRecord(
                copiedMayanaRecord,
                "mayāna",
            ),
        ],
        "lesson20-class-c-d-lo-and-irregular-lohua": [
            unknownConsonant.authorizationStatus,
            unknownConsonant.blockReason,
            ctx.isClassicalNahuatlNonactiveStemRecord(
                { ...huicatzLo },
                "huica-tz",
            ),
        ],
    };
    const expectedMutations = {
        "lesson20-nonactive-foundation-and-suffixes": [
            "blocked",
            "nonactive-options-contain-hidden-accessor-or-unknown-authority",
            "lesson20-nonactive-option-selection-required",
        ],
        "lesson20-regular-lo-and-root-ya": [["nequiya-lō"], false],
        "lesson20-class-c-d-lo-and-irregular-lohua": [
            "blocked",
            "lesson20-consonant-final-source-requires-lexical-or-suppletive-license",
            false,
        ],
    };

    s.eq("accepted Lesson 20 Groups 1-3 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 87, unique: 87, writing: 20, reading: 67 });
    groupIds.forEach((groupId) => {
        s.eq(
            `${groupId} works through the normal nonactive application path`,
            observations[groupId],
            expected[groupId],
        );
    });
    for (const record of writing) {
        s.eq(
            `${record.atomId} performs its accepted writing job`,
            observations[record.reviewGroupId],
            expected[record.reviewGroupId],
        );
        s.eq(
            `mutation:${record.atomId} fails when its accepted grammar behavior is broken`,
            mutations[record.reviewGroupId],
            expectedMutations[record.reviewGroupId],
        );
    }
    return s;
}

module.exports = { run };
