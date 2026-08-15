"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson20_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson20-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson20-o-nonactive-formation",
        "lesson20-ohua-nonactive-formation",
        "lesson20-hua-nonactive-formation",
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
    const rules = (result) => result.options.map((option) => (
        option.ruleId
    ));
    const cue = (formula, record, section) => {
        const annotations = ctx.getClassicalFormulaDerivedAnnotations(
            formula,
            null,
            record,
        ).filter((entry) => entry.role === "nonactive-derived-stem");
        return {
            count: annotations.length,
            section: annotations[0]?.lessonSections || [],
            label: annotations[0]?.label || "",
            hasExpectedSection: annotations[0]?.lessonSections?.includes(section)
                || false,
        };
    };

    const ana = inventory("āna", "B", "specific-projective");
    const anaMissing = derive("āna", "B", "specific-projective");
    const anaO = derive(
        "āna",
        "B",
        "specific-projective",
        "ō:ān-ō",
    );
    const caqui = inventory("caqui", "B", "specific-projective");
    const pasaTransitive = inventory(
        "pasa",
        "B",
        "specific-projective",
    );
    const tlaniTransitive = inventory(
        "tlani",
        "B",
        "specific-projective",
    );
    const xocui = inventory("xocui", "B", "specific-projective");
    const meloti = inventory("meloti", "B", "specific-projective");
    const pati = inventory("pa-ti", "B", "intransitive");
    const pasaO = derive(
        "pasa",
        "B",
        "specific-projective",
        "ō:pax-ō",
    );

    const miqui = inventory("miqui", "B", "intransitive");
    const miquiRecord = derive("miqui", "B", "intransitive");
    const pewa = inventory("pewa", "B", "intransitive");
    const pasaIntransitive = inventory("pasa", "B", "intransitive");
    const ohquetza = inventory("oh-quetza", "B", "intransitive");
    const xoni = inventory("xoni", "B", "intransitive");
    const xoniMissing = derive("xoni", "B", "intransitive");
    const choca = inventory("choca", "B", "intransitive");
    const mamali = inventory(
        "mamali",
        "B",
        "specific-projective",
    );
    const transitiveMiqui = inventory(
        "miqui",
        "B",
        "specific-projective",
    );

    const cochi = inventory("cochi", "B", "intransitive");
    const cochiRecord = derive("cochi", "B", "intransitive");
    const longI = inventory("xī", "B", "intransitive");
    const zo = inventory("zō", "A", "mainline-reflexive");
    const ahci = inventory("ahci", "A", "intransitive");
    const cui = inventory("cui", "A", "specific-projective");
    const ihcuania = inventory(
        "ihcuani-ā",
        "C",
        "specific-projective",
    );
    const unknownE = inventory("xoche", "B", "intransitive");

    const observations = {
        "lesson20-o-nonactive-formation": {
            environments: {
                ca: stems(caqui),
                qui: stems(xocui),
                na: stems(ana),
                ni: stems(tlaniTransitive),
                sa: stems(pasaTransitive),
                ta: stems(inventory(
                    "patata",
                    "B",
                    "specific-projective",
                )),
                ti: stems(meloti),
                intransitive: stems(pati),
            },
            consonantRules: {
                caqui: rules(caqui),
                pasa: rules(pasaTransitive),
                xocui: rules(xocui),
            },
            alternatives: {
                selector: ana.selectorRequired,
                automatic: ana.automaticOptionId,
                missing: [anaMissing.authorizationStatus, anaMissing.blockReason],
                chosen: [
                    anaO.authorizationStatus,
                    anaO.nonactiveStem,
                    anaO.finalShapeRelation?.replacementShape,
                ],
            },
            replaciveCue: cue("#0-0(pax-o)0+0-0#", pasaO, "§20.4"),
        },
        "lesson20-ohua-nonactive-formation": {
            productive: {
                qui: stems(miqui),
                w: stems(pewa),
                za: stems(pasaIntransitive),
                tza: stems(ohquetza),
            },
            operations: {
                miqui: miqui.options[0]?.finalShapeRelation?.replacementShape,
                pewa: [
                    pewa.options[0]?.nonactiveStem,
                    pewa.options[0]?.formationStructure?.surfaceAllomorph,
                ],
                choca: [
                    choca.options[0]?.nonactiveStem,
                    choca.options[0]?.vowelLengthRuleId,
                ],
            },
            finalNi: {
                stems: stems(xoni),
                selector: xoni.selectorRequired,
                missing: [
                    xoniMissing.authorizationStatus,
                    xoniMissing.blockReason,
                ],
            },
            rareTransitive: {
                stems: stems(mamali),
                selector: mamali.selectorRequired,
            },
            cue: cue(
                "#0-0(mic-o-hua)0+0-0#",
                miquiRecord,
                "§20.5",
            ),
        },
        "lesson20-hua-nonactive-formation": {
            vowels: {
                shortI: [
                    cochi.options[0]?.nonactiveStem,
                    cochi.options[0]?.vowelLengthRuleId,
                ],
                longI: [
                    longI.options[0]?.nonactiveStem,
                    longI.options[0]?.vowelLengthRuleId,
                ],
                longO: stems(zo),
            },
            exceptions: {
                ci: [ahci.options[0]?.nonactiveStem, ahci.options[0]?.ruleId],
                transitive: stems(cui),
                classC: stems(ihcuania),
            },
            alternatives: {
                zoSelector: zo.selectorRequired,
                zoAutomatic: zo.automaticOptionId,
                cuiSelector: cui.selectorRequired,
                classCSelector: ihcuania.selectorRequired,
            },
            cue: cue(
                "#0-0(cochī-hua)0+0-0#",
                cochiRecord,
                "§20.6",
            ),
        },
    };
    const expected = {
        "lesson20-o-nonactive-formation": {
            environments: {
                ca: ["cac-ō"],
                qui: ["xoc-ō"],
                na: ["ān-ō", "āna-lō"],
                ni: ["tlan-ō", "tlani-lō"],
                sa: ["pax-ō", "pasa-lō"],
                ta: ["patat-ō"],
                ti: ["meloch-ō"],
                intransitive: ["pa-tī-hua", "pa-ch-ō"],
            },
            consonantRules: {
                caqui: ["cn-l20-4-final-qui"],
                pasa: [
                    "cn-l20-4-final-sa",
                    "cn-l20-4-final-sa-lo-variant",
                ],
                xocui: ["cn-l20-4-final-cui"],
            },
            alternatives: {
                selector: true,
                automatic: "",
                missing: [
                    "blocked",
                    "lesson20-nonactive-option-selection-required",
                ],
                chosen: ["authorized", "ān-ō", "a > -ō"],
            },
            replaciveCue: {
                count: 1,
                section: ["§20.4"],
                label: "pasa → pax-ō · ō · chosen from licensed alternatives · sa > x-ō",
                hasExpectedSection: true,
            },
        },
        "lesson20-ohua-nonactive-formation": {
            productive: {
                qui: ["mic-o-hua"],
                w: ["peō-hua"],
                za: ["pax-o-hua"],
                tza: ["oh-quetz-o-hua"],
            },
            operations: {
                miqui: "qui > c-o-hua",
                pewa: ["peō-hua", "ō-hua"],
                choca: ["chōc-o-hua", "cn-l20-5-choca-lexical-o-lengthening"],
            },
            finalNi: {
                stems: ["xonī-hua", "xon-o-hua"],
                selector: true,
                missing: [
                    "blocked",
                    "lesson20-nonactive-option-selection-required",
                ],
            },
            rareTransitive: {
                stems: ["mamali-o-hua", "mamalī-hua-lō"],
                selector: true,
            },
            cue: {
                count: 1,
                section: ["§20.5"],
                label: "miqui → mic-o-hua · o-hua · automatic licensed formation · qui > c-o-hua",
                hasExpectedSection: true,
            },
        },
        "lesson20-hua-nonactive-formation": {
            vowels: {
                shortI: [
                    "cochī-hua",
                    "cn-l20-6-short-final-i-lengthening-before-hua",
                ],
                longI: [
                    "xī-hua",
                    "cn-l20-6-preserve-final-long-i-or-o-before-hua",
                ],
                longO: ["zō-hua", "zō-lō"],
            },
            exceptions: {
                ci: ["ahxī-hua", "cn-l20-6-ahci"],
                transitive: ["cuī-hua", "cui-hua-lō"],
                classC: ["ihcuanī-lō", "ihcuanī-hua"],
            },
            alternatives: {
                zoSelector: true,
                zoAutomatic: "",
                cuiSelector: true,
                classCSelector: true,
            },
            cue: {
                count: 1,
                section: ["§20.6"],
                label: "cochi → cochī-hua · hua · automatic licensed formation · i > ī-hua",
                hasExpectedSection: true,
            },
        },
    };
    const mutations = {
        "lesson20-o-nonactive-formation": [
            anaMissing.blockReason,
            ctx.isClassicalNahuatlNonactiveStemRecord({ ...anaO }, "āna"),
            stems(inventory("xocui", "B", "intransitive")),
        ],
        "lesson20-ohua-nonactive-formation": [
            xoniMissing.blockReason,
            stems(transitiveMiqui),
            derive(
                "miqui",
                "B",
                "intransitive",
                "o-hua:FORGED",
            ).blockReason,
        ],
        "lesson20-hua-nonactive-formation": [
            stems(miqui),
            unknownE.blockReason,
            ctx.isClassicalNahuatlNonactiveStemRecord(
                { ...cochiRecord },
                "cochi",
            ),
        ],
    };
    const expectedMutations = {
        "lesson20-o-nonactive-formation": [
            "lesson20-nonactive-option-selection-required",
            false,
            ["xocuī-hua"],
        ],
        "lesson20-ohua-nonactive-formation": [
            "lesson20-nonactive-option-selection-required",
            ["mic-ō"],
            "lesson20-selected-option-was-not-generated",
        ],
        "lesson20-hua-nonactive-formation": [
            ["mic-o-hua"],
            "lesson20-final-e-requires-owner-issued-licensed-active-allomorph",
            false,
        ],
    };

    s.eq("accepted Lesson 20 Groups 4-6 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 151, unique: 151, writing: 38, reading: 113 });
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
