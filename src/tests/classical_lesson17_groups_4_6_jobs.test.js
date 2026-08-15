"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson17_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson17-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson17-recursive-supplementation",
        "lesson17-contact-demonstratives-and-ambiguity",
        "lesson17-topic-comment",
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
                mood: "indicative",
                tense: options.tense || "present",
                outputScope: "single",
                sentenceOptions: {},
            }],
        })
    );
    const issueNnc = (stem, options = {}) => {
        const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
            subject: options.subject || "3sg",
            nounClass: options.nounClass || "zero",
            animacy: options.animacy || "animate",
        });
        return ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            args: [
                frame.nncSlotFrame,
                { sentenceType: "assertion", polarity: "positive" },
            ],
        });
    };
    const issuePronominal = (sourceInput, subject = "3sg") => {
        const source = ctx.issueCanonicalNncSourceFrame(
            typeof sourceInput === "string" ? { stem: sourceInput } : sourceInput,
        );
        const selection = ctx.getCanonicalNncOperationSelectionFrame(
            source,
            { subject },
        );
        const operation = ctx.issueCanonicalNncOperationFrame(source, {
            subject,
            clausePosition: selection.selectedClausePosition || "initial",
            numberForm: selection.selectedNumberForm || "",
            predicatePluralization:
                selection.selectedPredicatePluralization || "",
            sentenceType: "statement",
            polarity: "positive",
        });
        return ctx.requestClassicalPronominalNncResult(source, operation);
    };
    const issueParticle = (particleId) => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "particle:result",
            args: [ctx.buildClassicalNahuatlParticleSourceFrame(particleId)],
        })
    );
    const makeController = () => {
        const target = Object.create(ctx);
        const api = ctx.createClassicalClauseRelationControllerGlobals(target);
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
        return target.createClassicalClauseRelationController();
    };
    const compose = (
        principal,
        supplement,
        selections = {},
        marker = null,
    ) => {
        const controller = makeController();
        const principalCapture = controller.captureCurrentResult(
            "principal",
            principal.canonicalResult || principal,
        );
        const supplementCapture = controller.captureCurrentResult(
            "adjoined",
            supplement.canonicalResult || supplement,
        );
        const markerCapture = marker
            ? controller.captureCurrentResult(
                "marker",
                marker.canonicalResult || marker,
            )
            : null;
        const request = {
            relation: "supplementation",
            supplementationReferenceMode: "shared",
            supplementationContactRole: "subject",
            supplementationOrder: "principal-first",
            ...selections,
        };
        return {
            controller,
            captures: [principalCapture, supplementCapture, markerCapture]
                .filter(Boolean),
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
    const operationFrame = (result, kind) => (
        result.canonicalResult?.operationFrames?.find((frame) => (
            frame.kind === kind
        )) || null
    );
    const cues = (result) => (
        ctx.getClassicalFormulaDerivedAnnotations(
            result.presentation.formula,
            null,
            result.canonicalResult,
        ).map((cue) => ({
            label: cue.label,
            text: result.presentation.formula.slice(cue.start, cue.end),
        }))
    );

    const singing = issueVnc("cuīca", { subject: "3sg" });
    const friend = issueNnc("icnīuh", { subject: "3sg" });
    const father = issueNnc("tah", { subject: "3sg" });
    const nested = compose(friend, father, {
        supplementationHeadRole: "subject",
    });
    const recursive = compose(singing, nested.result.canonicalResult, {
        supplementationHeadRole: "subject",
    });
    const recursiveFrame = operationFrame(
        recursive.result,
        "classical-nahuatl-supplementation-recursive-clause-graph-frame",
    );

    const yehhuatl = issuePronominal({
        stem: "eh-huā",
        embedStem: "eh",
        matrixStem: "huā",
    }, "3sg");
    const inDemonstrative = issuePronominal("īn", "3sg");
    const demonstrative = compose(yehhuatl, inDemonstrative, {
        supplementationHeadRole: "subject",
    });
    const demonstrativeSpelling = operationFrame(
        demonstrative.result,
        "classical-nahuatl-demonstrative-supplement-spelling-frame",
    );

    const seeingThird = issueVnc("itta", {
        subject: "3sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const peterThird = issueNnc("Petoloh", { subject: "3sg" });
    const ambiguousSubject = compose(seeingThird, peterThird, {
        supplementationHeadRole: "subject",
    });
    const ambiguousObject = compose(seeingThird, peterThird, {
        supplementationHeadRole: "object",
    });
    const ambiguityFrame = operationFrame(
        ambiguousSubject.result,
        "classical-nahuatl-supplementation-contact-alternatives-frame",
    );

    const peterFirst = issueNnc("Petoloh", { subject: "1sg" });
    const singingFirst = issueVnc("cuīca", { subject: "1sg" });
    const topic = compose(singingFirst, peterFirst, {
        supplementationHeadRole: "subject",
        supplementationOrder: "supplement-first",
    });
    const nonTopic = compose(singingFirst, peterFirst, {
        supplementationHeadRole: "subject",
        supplementationOrder: "principal-first",
    });
    const emphaticTopic = compose(singingFirst, peterFirst, {
        supplementationHeadRole: "subject",
        supplementationOrder: "supplement-first",
    }, issueParticle("l3-ca"));
    const reversedPrincipal = compose(peterFirst, singingFirst, {
        supplementationHeadRole: "subject",
        supplementationOrder: "supplement-first",
    });

    const observations = {
        "lesson17-recursive-supplementation": {
            captures: recursive.captures.map(capture => capture.authorizationStatus),
            status: recursive.result.authorizationStatus,
            formula: recursive.result.presentation.formula,
            surface: recursive.result.presentation.surface,
            graph: recursiveFrame && {
                acyclic: recursiveFrame.acyclic,
                nodes: recursiveFrame.completeClauseNodeCount,
                links: recursiveFrame.continuations.map((entry) => [
                    entry.attachTo,
                    entry.depth,
                ]),
            },
            cues: cues(recursive.result),
        },
        "lesson17-contact-demonstratives-and-ambiguity": {
            demonstrative: {
                status: demonstrative.result.authorizationStatus,
                kind: demonstrative.result.canonicalResult.supplementClause
                    .demonstrativeKind,
                spelling: demonstrativeSpelling && {
                    separated: demonstrativeSpelling.separatedSurface,
                    fused: demonstrativeSpelling.traditionalFusedAlternatives,
                    grammarPreserved:
                        demonstrativeSpelling.grammaticalRelationPreserved,
                },
            },
            ambiguityChoice: decision(
                ambiguousSubject.contract,
                "supplementation-head-role",
            ),
            alternatives: ambiguityFrame?.alternatives.map((entry) => (
                entry.headRole
            )),
            selectedReadings: [
                ambiguousSubject.result.canonicalResult.referenceFrame.headRole,
                ambiguousObject.result.canonicalResult.referenceFrame.headRole,
            ],
            cues: cues(ambiguousSubject.result),
        },
        "lesson17-topic-comment": {
            orderChoice: decision(topic.contract, "supplementation-order"),
            topic: {
                formula: topic.result.presentation.formula,
                surface: topic.result.presentation.surface,
                order: operationFrame(
                    topic.result,
                    "classical-nahuatl-supplementation-order-frame",
                ),
                relation: operationFrame(
                    topic.result,
                    "classical-nahuatl-topic-comment-relation-frame",
                )?.relation,
                cues: cues(topic.result),
            },
            nonTopic: operationFrame(
                nonTopic.result,
                "classical-nahuatl-supplementation-order-frame",
            )?.topic,
            emphatic: {
                surface: emphaticTopic.result.presentation.surface,
                cues: cues(emphaticTopic.result),
            },
            principalSelection: [
                topic.result.canonicalResult.principalClause.unitKind,
                reversedPrincipal.result.canonicalResult.principalClause.unitKind,
                reversedPrincipal.result.presentation.surface,
            ],
        },
    };
    const expected = {
        "lesson17-recursive-supplementation": {
            captures: ["authorized", "authorized"],
            status: "authorized",
            formula: "#0-0(cuīca)0+0-0# + #0-0(icnīuh)0-0# + #0-0(tah)0-0#",
            surface: "Cuīca icnīuh tah.",
            graph: { acyclic: true, nodes: 3, links: [["supplement", 1]] },
            cues: [
                { label: "principal subject head", text: "#0-0(cuīca)0+0-0#" },
                { label: "shared referent", text: "+" },
                { label: "principal subject head", text: "#0-0(icnīuh)0-0#" },
                { label: "nested shared referent", text: "+" },
                { label: "supplementary subject", text: "#0-0(tah)0-0#" },
            ],
        },
        "lesson17-contact-demonstratives-and-ambiguity": {
            demonstrative: {
                status: "authorized",
                kind: "in",
                spelling: {
                    separated: "Yehhuātl īn.",
                    fused: ["yehhuātlin", "yehhuatli"],
                    grammarPreserved: true,
                },
            },
            ambiguityChoice: {
                values: ["subject", "object"],
                selected: "subject",
            },
            alternatives: ["subject", "object"],
            selectedReadings: ["subject", "object"],
            cues: [
                { label: "ambiguous principal subject/object head", text: "#0-0+qu-0(itta)0+0-0#" },
                { label: "shared referent", text: "+" },
                { label: "supplementary subject", text: "#0-0(Petoloh)0-0#" },
            ],
        },
        "lesson17-topic-comment": {
            orderChoice: {
                values: ["principal-first", "supplement-first", "discontinuous"],
                selected: "supplement-first",
            },
            topic: {
                formula: "#ni-0(Petoloh)0-0# + #ni-0(cuīca)0+0-0#",
                surface: "NiPetoloh nicuīca.",
                order: {
                    kind: "classical-nahuatl-supplementation-order-frame",
                    order: "supplement-first",
                    topic: true,
                    comment: true,
                    discontinuous: false,
                    interveningClauseCount: 0,
                },
                relation: "topicalized-supplement-or-modification-head",
                cues: [
                    { label: "topic · supplementary subject", text: "#ni-0(Petoloh)0-0#" },
                    { label: "shared referent", text: "+" },
                    { label: "comment · principal subject head", text: "#ni-0(cuīca)0+0-0#" },
                ],
            },
            nonTopic: false,
            emphatic: {
                surface: "NiPetoloh ca nicuīca.",
                cues: [
                    { label: "topic · supplementary subject", text: "#ni-0(Petoloh)0-0#" },
                    { label: "comment emphasis ca", text: "ca" },
                    { label: "comment · principal subject head", text: "#ni-0(cuīca)0+0-0#" },
                ],
            },
            principalSelection: ["vnc", "nnc", "Nicuīca niPetoloh."],
        },
    };

    const duplicateContinuation = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause: recursive.result.canonicalResult.principalClause,
        supplementClause: recursive.result.canonicalResult.supplementClause,
        options: {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
            supplementContinuationFrames: [
                nested.result.canonicalResult,
                nested.result.canonicalResult,
            ],
        },
    });
    const nonThirdPrincipal = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        singingFirst.canonicalResult,
        {
            referenceId: "speaker",
            subjectReferenceId: "speaker",
        },
    );
    const nonThirdSupplement = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        peterFirst.canonicalResult,
        { referenceId: "speaker", subjectReferenceId: "speaker" },
    );
    const nonThirdAmbiguity = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause: nonThirdPrincipal,
        supplementClause: nonThirdSupplement,
        options: {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
            retainContactAlternatives: true,
        },
    });
    const invalidCa = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause: topic.result.canonicalResult.principalClause,
        supplementClause: topic.result.canonicalResult.supplementClause,
        options: {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
            order: "principal-first",
            commentEmphaticCa: true,
        },
    });
    const mutationProof = {
        "lesson17-recursive-supplementation": {
            duplicate: duplicateContinuation.blockReason,
            copied: ctx.isClassicalNahuatlSupplementationFrame({
                ...recursive.result.canonicalResult,
            }),
        },
        "lesson17-contact-demonstratives-and-ambiguity": {
            nonThird: nonThirdAmbiguity.blockReason,
            stemAuthority:
                demonstrative.result.canonicalResult.supplementClause
                    .callerDerivedFactAuthority,
        },
        "lesson17-topic-comment": {
            invalidCa: invalidCa.blockReason,
            principalFirstTopic: operationFrame(
                nonTopic.result,
                "classical-nahuatl-supplementation-order-frame",
            )?.topic,
        },
    };
    const expectedMutationProof = {
        "lesson17-recursive-supplementation": {
            duplicate:
                "recursive-supplementation-requires-typed-acyclic-continuations",
            copied: false,
        },
        "lesson17-contact-demonstratives-and-ambiguity": {
            nonThird:
                "contact-ambiguity-requires-two-typed-third-person-head-candidates",
            stemAuthority: false,
        },
        "lesson17-topic-comment": {
            invalidCa:
                "comment-emphatic-ca-requires-topic-before-comment-order",
            principalFirstTopic: false,
        },
    };

    s.eq("accepted Lesson 17 Groups 4-6 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 122, unique: 122, writing: 69, reading: 53 });
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
            mutationProof[record.reviewGroupId],
            expectedMutationProof[record.reviewGroupId],
        );
    }
    return s;
}

module.exports = { run };
