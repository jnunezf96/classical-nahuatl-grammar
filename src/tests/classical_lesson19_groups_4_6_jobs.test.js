"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson19_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson19-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson19-speech-and-question-content",
        "lesson19-causing-and-requesting-content",
        "lesson19-wishes-and-realizability",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const issueVnc = (sourceStem, options = {}) => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [{
                sourceStem,
                verbClass: options.verbClass || "A",
                sourceValence: options.sourceValence || "intransitive",
                subject: options.subject || "3sg",
                objectKind: options.objectKind || "",
                objectPerson: options.objectPerson || "",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: options.mood || "indicative",
                tense: options.tense || "present",
                outputScope: "single",
                sentenceOptions: {
                    sentenceType: options.sentenceType || "assertion",
                    negative: options.negative === true,
                    antecessive: options.antecessive === true,
                    sentenceAntecessive: options.antecessive === true,
                    outsidePrefixes: options.antecessive ? ["ō#"] : [],
                },
            }],
        })
    );
    const makeController = () => {
        const target = Object.create(ctx);
        const api = ctx.createClassicalClauseRelationControllerGlobals(target);
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
        return target.createClassicalClauseRelationController();
    };
    const compose = ({ principal, supplement, selections = {} }) => {
        const controller = makeController();
        controller.captureCurrentResult(
            "principal",
            principal.canonicalResult || principal,
        );
        controller.captureCurrentResult(
            "adjoined",
            supplement.canonicalResult || supplement,
        );
        const request = {
            relation: "supplementation",
            supplementationReferenceMode: "included",
            supplementationHeadRole: "object",
            supplementationContactRole: "subject",
            supplementationOrder: "principal-first",
            ...selections,
        };
        return {
            controller,
            contract: controller.buildDecisionContract(request),
            result: controller.compose(request),
        };
    };
    const decision = (contract, id) => {
        const found = contract.decisions.find((candidate) => (
            candidate.id === id
        ));
        return found
            ? { values: found.values, selected: found.selectedValue }
            : null;
    };
    const operationFrame = (composition, kind) => (
        composition.result.canonicalResult?.operationFrames?.find((frame) => (
            frame.kind === kind
        )) || null
    );
    const cueLabels = (composition) => ctx.getClassicalFormulaDerivedAnnotations(
        composition.result.presentation.formula,
        null,
        composition.result.canonicalResult,
    ).map((cue) => cue.label);

    const speechPrincipal = issueVnc("ihtoa", {
        subject: "1sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const statement = issueVnc("huītz", { subject: "3sg" });
    const question = issueVnc("huītz", {
        subject: "3sg",
        sentenceType: "yes-no-question",
    });
    const indirectCommand = issueVnc("yā", {
        subject: "2pl",
        tense: "future",
        sentenceType: "command-sentence",
    });
    const directStatement = compose({
        principal: speechPrincipal,
        supplement: statement,
        selections: { speechDirectness: "direct" },
    });
    const indirectStatement = compose({
        principal: speechPrincipal,
        supplement: statement,
        selections: { speechDirectness: "indirect" },
    });
    const directQuestion = compose({
        principal: speechPrincipal,
        supplement: question,
        selections: { speechDirectness: "direct" },
    });
    const indirectCommandResult = compose({
        principal: speechPrincipal,
        supplement: indirectCommand,
        selections: { speechDirectness: "indirect" },
    });
    const missingDirectness = compose({
        principal: speechPrincipal,
        supplement: statement,
    });

    const causingPrincipal = issueVnc("chihua", {
        subject: "1sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const requestingPrincipal = issueVnc("ihtlani", {
        subject: "1sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const causedEvent = issueVnc("tlathui", {
        subject: "3sg",
        negative: true,
    });
    const requestedEvent = issueVnc("yā", {
        subject: "2sg",
        mood: "optative",
        tense: "nonpast",
    });
    const causing = compose({
        principal: causingPrincipal,
        supplement: causedEvent,
    });
    const requesting = compose({
        principal: requestingPrincipal,
        supplement: requestedEvent,
    });
    const wrongCausingHead = compose({
        principal: causingPrincipal,
        supplement: causedEvent,
        selections: { supplementationHeadRole: "subject" },
    });

    const wishPrincipal = issueVnc("nequi", {
        subject: "1sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const futureWish = issueVnc("yā", {
        subject: "2pl",
        tense: "future",
    });
    const impossibleWish = issueVnc("yā", {
        subject: "2pl",
        mood: "optative",
        tense: "past",
        negative: true,
    });
    const counterfactualWish = issueVnc("yā", {
        subject: "2pl",
        mood: "optative",
        tense: "past",
        antecessive: true,
    });
    const realizable = compose({
        principal: wishPrincipal,
        supplement: futureWish,
        selections: { wishRealizability: "realizable" },
    });
    const impossible = compose({
        principal: wishPrincipal,
        supplement: impossibleWish,
        selections: {
            wishRealizability: "present-or-future-impossible",
        },
    });
    const counterfactual = compose({
        principal: wishPrincipal,
        supplement: counterfactualWish,
        selections: { wishRealizability: "past-counterfactual" },
    });
    const wrongRealizability = compose({
        principal: wishPrincipal,
        supplement: futureWish,
        selections: { wishRealizability: "past-counterfactual" },
    });

    const observations = {
        "lesson19-speech-and-question-content": {
            direct: [
                directStatement.result.authorizationStatus,
                operationFrame(
                    directStatement,
                    "classical-nahuatl-supplementation-complement-policy-frame",
                )?.speechDirectness,
                operationFrame(
                    directStatement,
                    "classical-nahuatl-supplementation-complement-policy-frame",
                )?.speechAct,
            ],
            indirect: [
                indirectStatement.result.authorizationStatus,
                indirectCommandResult.result.authorizationStatus,
            ],
            question: [
                directQuestion.result.authorizationStatus,
                operationFrame(
                    directQuestion,
                    "classical-nahuatl-supplementation-complement-policy-frame",
                )?.speechAct,
            ],
            choice: decision(
                directStatement.contract,
                "speech-directness",
            ),
            cues: cueLabels(directQuestion).some((label) => (
                label.includes("question") && label.includes("content")
            )) && cueLabels(directStatement).some((label) => (
                label.includes("direct statement")
            )),
        },
        "lesson19-causing-and-requesting-content": {
            causing: [
                causing.result.authorizationStatus,
                operationFrame(
                    causing,
                    "classical-nahuatl-supplementation-complement-policy-frame",
                )?.semanticGroup,
                causing.result.canonicalResult?.supplementClause?.sentenceKind,
            ],
            requesting: [
                requesting.result.authorizationStatus,
                operationFrame(
                    requesting,
                    "classical-nahuatl-supplementation-complement-policy-frame",
                )?.semanticGroup,
                requesting.result.canonicalResult?.supplementClause?.sentenceKind,
            ],
            noExtraChoice: [
                decision(causing.contract, "causing-kind"),
                decision(requesting.contract, "requesting-kind"),
            ],
            cues: cueLabels(causing).some((label) => (
                label.includes("caused proposition")
            )) && cueLabels(requesting).some((label) => (
                label.includes("requested proposition")
            )),
        },
        "lesson19-wishes-and-realizability": {
            realizable: [
                realizable.result.authorizationStatus,
                operationFrame(
                    realizable,
                    "classical-nahuatl-supplementation-complement-policy-frame",
                )?.wishRealizability,
                decision(realizable.contract, "wish-realizability"),
            ],
            impossible: [
                impossible.result.authorizationStatus,
                operationFrame(
                    impossible,
                    "classical-nahuatl-supplementation-complement-policy-frame",
                )?.wishRealizability,
                impossible.result.canonicalResult?.supplementClause?.polarity,
                decision(impossible.contract, "wish-realizability"),
            ],
            counterfactual: [
                counterfactual.result.authorizationStatus,
                operationFrame(
                    counterfactual,
                    "classical-nahuatl-supplementation-complement-policy-frame",
                )?.wishRealizability,
                decision(counterfactual.contract, "wish-realizability"),
            ],
            cues: cueLabels(counterfactual).some((label) => (
                label.includes("past-counterfactual")
            )),
        },
    };
    const expected = {
        "lesson19-speech-and-question-content": {
            direct: ["authorized", "direct", "statement"],
            indirect: ["authorized", "authorized"],
            question: ["authorized", "question"],
            choice: {
                values: ["direct", "indirect"],
                selected: "direct",
            },
            cues: true,
        },
        "lesson19-causing-and-requesting-content": {
            causing: ["authorized", "causing", "assertion"],
            requesting: ["authorized", "requesting", "command"],
            noExtraChoice: [null, null],
            cues: true,
        },
        "lesson19-wishes-and-realizability": {
            realizable: ["authorized", "realizable", null],
            impossible: [
                "authorized",
                "present-or-future-impossible",
                "negative",
                null,
            ],
            counterfactual: [
                "authorized",
                "past-counterfactual",
                {
                    values: [
                        "present-or-future-impossible",
                        "past-counterfactual",
                    ],
                    selected: "past-counterfactual",
                },
            ],
            cues: true,
        },
    };
    const mutations = {
        "lesson19-speech-and-question-content": [
            missingDirectness.result.blockReason,
            ctx.isClassicalNahuatlSupplementationFrame({
                ...directStatement.result.canonicalResult,
            }),
        ],
        "lesson19-causing-and-requesting-content": [
            wrongCausingHead.result.blockReason,
        ],
        "lesson19-wishes-and-realizability": [
            wrongRealizability.result.blockReason,
        ],
    };
    const expectedMutations = {
        "lesson19-speech-and-question-content": [
            "classical-clause-relation-decision-required:speech-directness",
            false,
        ],
        "lesson19-causing-and-requesting-content": [
            "classical-supplementation-supplementation-head-role-not-licensed",
        ],
        "lesson19-wishes-and-realizability": [
            "classical-supplementation-wish-realizability-not-licensed",
        ],
    };

    s.eq("accepted Lesson 19 Groups 4-6 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 138, unique: 138, writing: 78, reading: 60 });
    groupIds.forEach((groupId) => {
        s.eq(
            `${groupId} works through the normal clause-composition path`,
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
