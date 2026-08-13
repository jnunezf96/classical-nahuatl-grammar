"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson4_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson4-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson4-nuclear-clause-identity-and-use",
        "lesson4-vnc-and-nnc-kinds",
        "lesson4-basic-formula-and-slots",
    ];
    const writingRecords = ledger.records.filter((record) =>
        groupIds.includes(record.reviewGroupId)
        && record.proposedDirection === "BOTH"
    );

    const request = (stem, options) => ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:nuclear-clause",
        args: [stem, options],
    }).canonicalResult;
    const simpleVnc = request("nemi", {
        tenseMode: "verb",
        transitivity: "intransitive",
    });
    const mainVnc = request("nemi", {
        tenseMode: "verb",
        transitivity: "intransitive",
        usageRole: "main-clause",
    });
    const dependentVnc = request("nemi", {
        tenseMode: "verb",
        transitivity: "intransitive",
        usageRole: "dependent-clause",
    });
    const conjoinedVnc = request("nemi", {
        tenseMode: "verb",
        transitivity: "intransitive",
        usageRole: "conjoined-clause",
    });
    const transitiveVnc = request("itta", {
        tenseMode: "verb",
        transitivity: "transitive",
    });
    const nominalNnc = request("cal", {
        tenseMode: "noun",
        state: "absolutive",
    });
    const adjectivalNnc = request("cualli", {
        tenseMode: "adjective",
        state: "absolutive",
    });
    const adverbialNnc = request("nicān", {
        tenseMode: "adverb",
        state: "absolutive",
    });

    const observations = new Map([
        ["ACI-P060-L003-A267F4D8D1", [
            simpleVnc.structureFrame.excludedFormalClass,
            simpleVnc.structureFrame.unitKind,
            nominalNnc.structureFrame.unitKind,
        ]],
        ["ACI-P060-L004-F0BA302DF6", simpleVnc.structureFrame.requiredFunctions],
        ["ACI-P060-L007-CD8DC4B7D1-02", [
            simpleVnc.structureFrame.formation,
            simpleVnc.structureFrame.constituentOrder,
            simpleVnc.formulaRealization,
        ]],
        ["ACI-P060-L017-0D0056E9B9", [
            simpleVnc.structureFrame.entitiveFunctions,
            simpleVnc.structureFrame.entitiveExpression,
        ]],
        ["ACI-P060-L020-6A731AF00C", [simpleVnc.structureFrame.expressionScope]],
        ["ACI-P060-L022-F2AEB1E5CC", [simpleVnc.structureFrame.activeUseRole]],
        ["ACI-P060-L022-F2AEB1E5CC-02", [
            mainVnc.structureFrame.activeUseRole,
            dependentVnc.structureFrame.activeUseRole,
        ]],
        ["ACI-P060-L022-F2AEB1E5CC-03", [conjoinedVnc.structureFrame.activeUseRole]],

        ["ACI-P060-L024-BBD0E75416", [simpleVnc.structureFrame.nuclearClauseKinds]],
        ["ACI-P060-L024-BBD0E75416-02", [simpleVnc.clauseKind]],
        ["ACI-P060-L024-BBD0E75416-03", [nominalNnc.clauseKind]],
        ["ACI-P060-L025-8C295EAC37", [
            simpleVnc.structureFrame.predicateSourceKind,
            transitiveVnc.structureFrame.predicateSourceKind,
            simpleVnc.transitivity,
            transitiveVnc.transitivity,
        ]],
        ["ACI-P060-L025-8C295EAC37-04", [
            nominalNnc.structureFrame.predicateSourceKind,
            adjectivalNnc.clauseKind,
            adverbialNnc.clauseKind,
        ]],

        ["ACI-P061-L002-95D1AF7F26", [
            simpleVnc.structureFrame.constituentOrder,
            simpleVnc.formulaRealization,
        ]],
        ["ACI-P061-L005-F74AE918B4", [
            simpleVnc.structureFrame.positionsRepresent,
            simpleVnc.structureFrame.fillersRepresent,
        ]],
        ["ACI-P061-L005-F74AE918B4-02", [
            simpleVnc.structureFrame.positionsRepresent,
            simpleVnc.structureFrame.examplePositionCategories,
        ]],
        ["ACI-P061-L005-F74AE918B4-06", [simpleVnc.structureFrame.fillersRepresent]],
        ["ACI-P061-L008-F25F43FB61", [simpleVnc.structureFrame.stage1Formula]],
        ["ACI-P061-L010-27A24662ED", [
            simpleVnc.structureFrame.stage1Diagram.numerator,
            simpleVnc.structureFrame.stage1Diagram.denominator,
        ]],
    ]);

    const expected = new Map([
        ["ACI-P060-L003-A267F4D8D1", ["particle", "nuclear-clause", "nuclear-clause"]],
        ["ACI-P060-L004-F0BA302DF6", ["subject", "predicate"]],
        ["ACI-P060-L007-CD8DC4B7D1-02", [
            "stem-with-inflectional-affixes",
            "rigid",
            "#pers1-pers2(nemi)tns+num1-num2#",
        ]],
        ["ACI-P060-L017-0D0056E9B9", [
            ["subject", "object", "possessor"],
            "personal-pronoun-affixes-only",
        ]],
        ["ACI-P060-L020-6A731AF00C", ["basic-nuclear"]],
        ["ACI-P060-L022-F2AEB1E5CC", ["simple-sentence"]],
        ["ACI-P060-L022-F2AEB1E5CC-02", ["main-clause", "dependent-clause"]],
        ["ACI-P060-L022-F2AEB1E5CC-03", ["conjoined-clause"]],
        ["ACI-P060-L024-BBD0E75416", [[
            "verbal-nuclear-clause",
            "nominal-nuclear-clause",
        ]]],
        ["ACI-P060-L024-BBD0E75416-02", ["verbal-nuclear-clause"]],
        ["ACI-P060-L024-BBD0E75416-03", ["nominal-nuclear-clause"]],
        ["ACI-P060-L025-8C295EAC37", [
            "verbal",
            "verbal",
            "intransitive",
            "transitive",
        ]],
        ["ACI-P060-L025-8C295EAC37-04", [
            "nominal-adjectival-or-adverbial",
            "nominal-nuclear-clause",
            "nominal-nuclear-clause",
        ]],
        ["ACI-P061-L002-95D1AF7F26", [
            "rigid",
            "#pers1-pers2(nemi)tns+num1-num2#",
        ]],
        ["ACI-P061-L005-F74AE918B4", [
            "informational-categories",
            "morphemes-or-morphs",
        ]],
        ["ACI-P061-L005-F74AE918B4-02", [
            "informational-categories",
            ["person", "number", "tense"],
        ]],
        ["ACI-P061-L005-F74AE918B4-06", ["morphemes-or-morphs"]],
        ["ACI-P061-L008-F25F43FB61", ["Subject + Predicate"]],
        ["ACI-P061-L010-27A24662ED", ["Subject", "Predicate"]],
    ]);

    s.eq("all accepted writing atoms in groups 1-3 have one exact normal-route observation", {
        expected: writingRecords.length,
        observed: observations.size,
        missing: writingRecords.filter((record) => !observations.has(record.atomId)).map((record) => record.atomId),
    }, { expected: 19, observed: 19, missing: [] });

    for (const record of writingRecords) {
        const actual = observations.get(record.atomId);
        const exact = expected.get(record.atomId);
        s.eq(`${record.atomId} observes its accepted Lesson 4 grammar job`, actual, exact);
        const broken = JSON.parse(JSON.stringify(actual));
        if (Array.isArray(broken)) broken[broken.length - 1] = "BROKEN_LESSON4_BEHAVIOR";
        s.no(`${record.atomId} fails when its exact behavior is broken`,
            JSON.stringify(broken) === JSON.stringify(exact));
    }

    s.eq("adjectival and adverbial predicate sources enter the NNC path without a duplicate clause-kind choice", [
        adjectivalNnc.source.clauseKind,
        adverbialNnc.source.clauseKind,
        adjectivalNnc.formulaRealization,
        adverbialNnc.formulaRealization,
    ], [
        "nominal-nuclear-clause",
        "nominal-nuclear-clause",
        "#pers1-pers2(cualli)num1-num2#",
        "#pers1-pers2(nicān)num1-num2#",
    ]);

    return s;
}

module.exports = { run };
