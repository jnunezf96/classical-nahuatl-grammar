"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson20_groups_7_8_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson20-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson20-hualo-free-variants",
        "lesson20-nonactive-class-a-and-perfective",
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
    const stems = (result) => result.options.map((option) => (
        option.nonactiveStem
    ));
    const annotationSummary = (formula, grammarContext) => (
        ctx.getClassicalFormulaDerivedAnnotations(
            formula,
            null,
            grammarContext,
        ).filter((entry) => entry.role.startsWith("nonactive-"))
            .map((entry) => ({
                role: entry.role,
                sections: entry.lessonSections,
                label: entry.label,
            }))
    );
    const buildPassive = ({
        stem,
        verbClass,
        tense = "present",
        optionId = "",
    }) => {
        const active = ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            subject: "3sg",
            mood: "indicative",
            tense,
            verbClass,
            perfectiveClass: verbClass,
            valence: "specific-projective",
            transitivity: "transitive",
            objectKind: "specific-projective",
            objectPerson: "1sg",
        });
        const nonactive = derive(
            stem,
            verbClass,
            "specific-projective",
            optionId,
        );
        return ctx.buildClassicalNahuatlDerivedVncFrame(active, {
            voice: "passive",
            nonactiveStemRecord: nonactive,
            sourceValence: "specific-projective",
            sourceSubject: "3sg",
            sourceObjectPerson: "1sg",
            mood: "indicative",
            tense,
            verbClass,
        });
    };

    const cui = inventory("cui", "A", "specific-projective");
    const mamali = inventory(
        "mamali",
        "B",
        "specific-projective",
    );
    const cuiMissing = derive("cui", "A", "specific-projective");
    const cuiHualo = derive(
        "cui",
        "A",
        "specific-projective",
        "hua-lō:cui-hua-lō",
    );
    const mamaliHualo = derive(
        "mamali",
        "B",
        "specific-projective",
        "hua-lō:mamalī-hua-lō",
    );
    const forgedCoichiHualo = derive(
        "cochi",
        "B",
        "intransitive",
        "hua-lō:cochī-hua-lō",
    );

    const chihua = derive(
        "chihua",
        "A",
        "specific-projective",
    );
    const mayana = derive("mayāna", "B", "intransitive");
    const poloa = derive("pol-o-ā", "C", "projective-nonhuman");
    const mama = derive("māmā", "D", "specific-projective");
    const cochi = derive("cochi", "B", "intransitive");
    const anaO = derive(
        "āna",
        "B",
        "specific-projective",
        "ō:ān-ō",
    );
    const chihuaPresent = buildPassive({
        stem: "chihua",
        verbClass: "A",
    });
    const chihuaFuture = buildPassive({
        stem: "chihua",
        verbClass: "A",
        tense: "future",
    });
    const chihuaPreterit = buildPassive({
        stem: "chihua",
        verbClass: "A",
        tense: "preterit",
    });
    const anaPresent = buildPassive({
        stem: "āna",
        verbClass: "B",
        optionId: "ō:ān-ō",
    });
    const anaFuture = buildPassive({
        stem: "āna",
        verbClass: "B",
        tense: "future",
        optionId: "ō:ān-ō",
    });

    const hualoAnnotations = annotationSummary(
        "#0-0(cui-hua-lo)0+0-0#",
        { nonactiveStemRecord: cuiHualo },
    );
    const perfectiveAnnotations = annotationSummary(
        chihuaPreterit.formulaRealization,
        chihuaPreterit,
    );
    const observations = {
        "lesson20-hualo-free-variants": {
            inventories: {
                cui: stems(cui),
                mamali: stems(mamali),
            },
            choice: {
                cuiSelector: cui.selectorRequired,
                cuiAutomatic: cui.automaticOptionId,
                missing: [cuiMissing.authorizationStatus, cuiMissing.blockReason],
                cui: [
                    cuiHualo.authorizationStatus,
                    cuiHualo.suffixFamily,
                    cuiHualo.formationSequence,
                    cuiHualo.selectedFormationAuthority,
                    cuiHualo.selectedOptionWasUserOptional,
                ],
                mamali: [
                    mamaliHualo.authorizationStatus,
                    mamaliHualo.nonactiveStem,
                    mamaliHualo.selectedOptionWasUserOptional,
                ],
            },
            cues: {
                family: hualoAnnotations[0]?.sections,
                familyLabel: hualoAnnotations[0]?.label,
                class: hualoAnnotations[1]?.sections,
            },
        },
        "lesson20-nonactive-class-a-and-perfective": {
            sourceClasses: [
                ["A", chihua.targetClass],
                ["B", mayana.targetClass],
                ["C", poloa.targetClass],
                ["D", mama.targetClass],
            ],
            boundaryProfiles: {
                hua: cochi.targetClass,
                lo: chihua.targetClass,
                o: anaO.targetClass,
                hualo: cuiHualo.targetClass,
            },
            aspectDependency: {
                chihua: [
                    chihua.imperfectiveNonactiveStem,
                    chihua.perfectiveNonactiveStem,
                ],
                mayana: [
                    mayana.imperfectiveNonactiveStem,
                    mayana.perfectiveNonactiveStem,
                ],
            },
            contextualQuantity: {
                present: [
                    chihuaPresent.selectedNonactiveAspect,
                    chihuaPresent.formulaRealization,
                ],
                future: [
                    chihuaFuture.selectedNonactiveAspect,
                    chihuaFuture.formulaRealization,
                ],
                preterit: [
                    chihuaPreterit.selectedNonactiveAspect,
                    chihuaPreterit.formulaRealization,
                ],
                oPresent: anaPresent.formulaRealization,
                oFuture: anaFuture.formulaRealization,
            },
            classCue: {
                sections: perfectiveAnnotations.find((entry) => (
                    entry.role === "nonactive-class-a-aspect"
                ))?.sections,
                label: perfectiveAnnotations.find((entry) => (
                    entry.role === "nonactive-class-a-aspect"
                ))?.label,
            },
        },
    };
    const expected = {
        "lesson20-hualo-free-variants": {
            inventories: {
                cui: ["cuī-hua", "cui-hua-lō"],
                mamali: ["mamali-o-hua", "mamalī-hua-lō"],
            },
            choice: {
                cuiSelector: true,
                cuiAutomatic: "",
                missing: [
                    "blocked",
                    "lesson20-nonactive-option-selection-required",
                ],
                cui: [
                    "authorized",
                    "hua-lō",
                    ["hua", "lo"],
                    "optional-variant",
                    true,
                ],
                mamali: ["authorized", "mamalī-hua-lō", true],
            },
            cues: {
                family: ["§20.7"],
                familyLabel: "cui → cui-hua-lō · hua-lō · chosen from licensed alternatives · ∅ > -hua-lō",
                class: ["§20.8"],
            },
        },
        "lesson20-nonactive-class-a-and-perfective": {
            sourceClasses: [
                ["A", "A-2"],
                ["B", "A-2"],
                ["C", "A-2"],
                ["D", "A-2"],
            ],
            boundaryProfiles: {
                hua: "A-1",
                lo: "A-2",
                o: "A-2",
                hualo: "A-2",
            },
            aspectDependency: {
                chihua: ["chihua-lō", "chīhua-lō"],
                mayana: ["mayāna-lō", "mayāna-lō"],
            },
            contextualQuantity: {
                present: ["imperfective", "#ni-0(chihua-lo)0+0-0#"],
                future: ["imperfective", "#ni-0(chihua-lō)z+⎕-0#"],
                preterit: ["perfective", "#ni-0(chīhua-lō)0+c-0#"],
                oPresent: "#n-0(ān-o)0+0-0#",
                oFuture: "#n-0(ān-ō)z+⎕-0#",
            },
            classCue: {
                sections: ["§20.8"],
                label: "Class A (A-2 boundary profile) · perfective · imperfective chihua-lō → perfective chīhua-lō · final o quantity follows the next typed morph",
            },
        },
    };
    const mutations = {
        "lesson20-hualo-free-variants": [
            cuiMissing.blockReason,
            forgedCoichiHualo.blockReason,
            ctx.isClassicalNahuatlNonactiveStemRecord(
                { ...cuiHualo },
                "cui",
            ),
        ],
        "lesson20-nonactive-class-a-and-perfective": [
            ctx.isClassicalNahuatlNonactiveStemRecord(
                { ...chihua, targetClass: "D" },
                "chihua",
            ),
            ctx.deriveClassicalNahuatlNonactiveStemRecord("chihua", {
                verbClass: "A",
                sourceValence: "specific-projective",
                perfectiveNonactiveStem: "FORGED",
            }).blockReason,
            chihuaPreterit.selectedNonactiveAspect,
        ],
    };
    const expectedMutations = {
        "lesson20-hualo-free-variants": [
            "lesson20-nonactive-option-selection-required",
            "lesson20-selected-option-was-not-generated",
            false,
        ],
        "lesson20-nonactive-class-a-and-perfective": [
            false,
            "nonactive-options-contain-hidden-accessor-or-unknown-authority",
            "perfective",
        ],
    };

    s.eq("accepted Lesson 20 Groups 7-8 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 13, unique: 13, writing: 6, reading: 7 });
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
