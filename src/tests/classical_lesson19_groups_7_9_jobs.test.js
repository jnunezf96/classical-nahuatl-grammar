"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson19_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson19-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson19-perception-cognition-and-emotion",
        "lesson19-same-subject-futures-and-rumored-report",
        "lesson19-deleted-saying-principals",
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
                ...(options.objectRequests?.length
                    ? { objectRequests: options.objectRequests }
                    : {}),
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: options.mood || "indicative",
                tense: options.tense || "present",
                outputScope: "single",
                sentenceOptions: {
                    sentenceType: options.sentenceType || "assertion",
                    negative: options.negative === true,
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
    const compose = ({
        relation = "supplementation",
        principal,
        supplement,
        dependent = null,
        selections = {},
    }) => {
        const controller = makeController();
        controller.captureCurrentResult(
            "principal",
            principal.canonicalResult || principal,
        );
        controller.captureCurrentResult(
            "adjoined",
            supplement.canonicalResult || supplement,
        );
        if (dependent) {
            controller.captureCurrentResult(
                "dependent",
                dependent.canonicalResult || dependent,
            );
        }
        const request = relation === "supplementation"
            ? {
                relation,
                supplementationReferenceMode: "included",
                supplementationOrder: "principal-first",
                ...selections,
            }
            : { relation, ...selections };
        return {
            contract: controller.buildDecisionContract(request),
            result: controller.compose(request),
        };
    };
    const operationFrame = (composition, kind) => (
        composition.result.canonicalResult?.operationFrames?.find((frame) => (
            frame.kind === kind
        )) || null
    );
    const decision = (contract, id) => {
        const found = contract.decisions.find((candidate) => candidate.id === id);
        return found ? { values: found.values, selected: found.selectedValue } : null;
    };
    const cueLabels = (composition) => ctx.getClassicalFormulaDerivedAnnotations(
        composition.result.presentation.formula,
        null,
        composition.result.canonicalResult,
    ).map((cue) => cue.label);

    const perceive = issueVnc("itta", {
        subject: "1sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const presentEvent = issueVnc("huītz", { subject: "3sg" });
    const pastEvent = issueVnc("yā", { subject: "3sg", tense: "preterit" });
    const perception = compose({ principal: perceive, supplement: presentEvent });
    const pastPerception = compose({ principal: perceive, supplement: pastEvent });

    const know = issueVnc("mati", {
        subject: "1sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const futureSame = issueVnc("pōhua", { subject: "1sg", tense: "future" });
    const futureDifferent = issueVnc("pōhua", { subject: "2sg", tense: "future" });
    const sameSubjectFuture = compose({ principal: know, supplement: futureSame });
    const differentSubjectFuture = compose({ principal: know, supplement: futureDifferent });

    const affect = issueVnc("cualitta", {
        subject: "3sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "1pl",
    });
    const happyEvent = issueVnc("itta", {
        subject: "2sg",
        tense: "preterit",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const affectResult = compose({ principal: affect, supplement: happyEvent });

    const quil = issueVnc("il", {
        subject: "3sg",
        tense: "preterit",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const reported = issueVnc("yā", { subject: "3pl", tense: "preterit" });
    const fusedReport = compose({
        relation: "rumored-report",
        principal: quil,
        supplement: reported,
        selections: { mach: "present", fuseQuilMach: "fused" },
    });
    const bareReport = compose({
        relation: "rumored-report",
        principal: quil,
        supplement: reported,
        selections: { mach: "absent" },
    });
    const missingMach = compose({
        relation: "rumored-report",
        principal: quil,
        supplement: reported,
    });
    const wrongQuil = compose({
        relation: "rumored-report",
        principal: know,
        supplement: reported,
        selections: { mach: "absent" },
    });

    const answer = issueVnc("nanquilia", {
        subject: "1sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3pl",
    });
    const saying = issueVnc("ilhuia", {
        subject: "1sg",
        sourceValence: "multiple-object",
        objectRequests: [{
            objectId: "reported-supplement",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            governor: "directive",
            derivationalLevel: 1,
        }, {
            objectId: "addressees",
            objectKind: "specific-projective",
            objectPerson: "3pl",
            governor: "applicative",
            derivationalLevel: 2,
        }],
    });
    const deletedSaying = compose({
        relation: "deleted-principal",
        principal: answer,
        dependent: saying,
        supplement: reported,
        selections: { speechDirectness: "direct" },
    });
    const missingDeletedDirectness = compose({
        relation: "deleted-principal",
        principal: answer,
        dependent: saying,
        supplement: reported,
    });

    const observations = {
        "lesson19-perception-cognition-and-emotion": {
            perception: [
                perception.result.authorizationStatus,
                operationFrame(perception, "classical-nahuatl-supplementation-complement-policy-frame")?.semanticGroup,
                operationFrame(perception, "classical-nahuatl-supplementation-complement-policy-frame")?.supplementTense,
                decision(perception.contract, "supplementation-head-role"),
            ],
            affect: [
                affectResult.result.authorizationStatus,
                operationFrame(affectResult, "classical-nahuatl-supplementation-complement-policy-frame")?.semanticGroup,
                operationFrame(affectResult, "classical-nahuatl-supplementation-complement-policy-frame")?.headRole,
                decision(affectResult.contract, "supplementation-head-role"),
            ],
            cues: cueLabels(perception).some((label) => label.includes("perceived proposition"))
                && cueLabels(affectResult).some((label) => label.includes("supplementary subject")),
        },
        "lesson19-same-subject-futures-and-rumored-report": {
            sameSubject: [
                sameSubjectFuture.result.authorizationStatus,
                operationFrame(sameSubjectFuture, "classical-nahuatl-supplementation-coreferential-future-frame")?.authorizationStatus,
                operationFrame(sameSubjectFuture, "classical-nahuatl-supplementation-coreferential-future-frame")?.infinitiveReadingLicensed,
                decision(sameSubjectFuture.contract, "same-subject-future"),
            ],
            report: [
                fusedReport.result.authorizationStatus,
                fusedReport.result.canonicalResult?.machSelected,
                fusedReport.result.canonicalResult?.quilMachFused,
                decision(fusedReport.contract, "rumor-mach"),
                decision(fusedReport.contract, "fuse-quil-mach"),
                decision(bareReport.contract, "fuse-quil-mach"),
            ],
            cues: cueLabels(sameSubjectFuture).some((label) => label.includes("same subject"))
                && cueLabels(fusedReport).some((label) => label.includes("typed quil"))
                && cueLabels(fusedReport).some((label) => label.includes("reported proposition")),
        },
        "lesson19-deleted-saying-principals": {
            deleted: [
                saying.authorizationStatus,
                deletedSaying.result.authorizationStatus,
                deletedSaying.result.canonicalResult?.deletionKind,
                deletedSaying.result.canonicalResult?.supplementHasNoDirectRelationToVisiblePrincipal,
                deletedSaying.result.canonicalResult?.speechDirectness,
                decision(deletedSaying.contract, "deletion-kind"),
            ],
            cues: cueLabels(deletedSaying).some((label) => label.includes("surviving speech-action"))
                && cueLabels(deletedSaying).some((label) => label.includes("recoverable saying node")),
        },
    };
    const expected = {
        "lesson19-perception-cognition-and-emotion": {
            perception: ["authorized", "perception", "present", null],
            affect: ["authorized", "affect", "subject", null],
            cues: true,
        },
        "lesson19-same-subject-futures-and-rumored-report": {
            sameSubject: ["authorized", "authorized", true, null],
            report: [
                "authorized",
                true,
                true,
                { values: ["present", "absent"], selected: "present" },
                { values: ["separate", "fused"], selected: "fused" },
                null,
            ],
            cues: true,
        },
        "lesson19-deleted-saying-principals": {
            deleted: ["authorized", "authorized", "saying", true, "direct", null],
            cues: true,
        },
    };
    const mutations = {
        "lesson19-perception-cognition-and-emotion": [
            pastPerception.result.blockReason,
        ],
        "lesson19-same-subject-futures-and-rumored-report": [
            operationFrame(differentSubjectFuture, "classical-nahuatl-supplementation-coreferential-future-frame")?.authorizationStatus,
            missingMach.result.blockReason,
            wrongQuil.result.blockReason,
        ],
        "lesson19-deleted-saying-principals": [
            missingDeletedDirectness.result.blockReason,
            ctx.isClassicalNahuatlDeletedPrincipalFrame({
                ...deletedSaying.result.canonicalResult,
            }),
        ],
    };
    const expectedMutations = {
        "lesson19-perception-cognition-and-emotion": [
            "perception-complement-normally-requires-present",
        ],
        "lesson19-same-subject-futures-and-rumored-report": [
            "blocked",
            "classical-clause-relation-decision-required:rumor-mach",
            "classical-clause-relation-rumored-report-source-incompatible",
        ],
        "lesson19-deleted-saying-principals": [
            "classical-clause-relation-decision-required:speech-directness",
            false,
        ],
    };

    s.eq("accepted Lesson 19 Groups 7-9 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 211, unique: 211, writing: 141, reading: 70 });
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
