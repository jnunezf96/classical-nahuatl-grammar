"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson17_group_7_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson17-review-ledger.json"),
        "utf8",
    ));
    const records = ledger.records.filter((record) => (
        record.reviewGroupId === "lesson17-information-questions"
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
                tense: "present",
                outputScope: "single",
                sentenceOptions: {},
            }],
        })
    );
    const issueNnc = (stem) => {
        const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
            subject: "3sg",
            nounClass: "zero",
            animacy: "animate",
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
    const makeController = () => {
        const target = Object.create(ctx);
        const api = ctx.createClassicalClauseRelationControllerGlobals(target);
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
        return target.createClassicalClauseRelationController();
    };
    const compose = (principal, supplement, selections = {}) => {
        const controller = makeController();
        const captures = [
            controller.captureCurrentResult(
                "principal",
                principal.canonicalResult || principal,
            ),
            controller.captureCurrentResult(
                "adjoined",
                supplement.canonicalResult || supplement,
            ),
        ];
        const request = {
            relation: "supplementation",
            supplementationReferenceMode: "shared",
            supplementationContactRole: "subject",
            ...selections,
        };
        return {
            captures,
            contract: controller.buildDecisionContract(request),
            result: controller.compose(request),
        };
    };
    const decision = (contract, id) => {
        const found = contract.decisions.find((candidate) => candidate.id === id);
        return found ? {
            values: found.values,
            selected: found.selectedValue,
        } : null;
    };
    const operationFrame = (result, kind) => (
        result.canonicalResult?.operationFrames?.find((frame) => (
            frame.kind === kind
        )) || null
    );
    const cueLabels = (result) => (
        ctx.getClassicalFormulaDerivedAnnotations(
            result.presentation.formula,
            null,
            result.canonicalResult,
        ).map((cue) => cue.label)
    );

    const who = issuePronominal("ā-0", "3sg");
    const dies = issueVnc("miqui", { subject: "3sg" });
    const question = compose(dies, who, {
        supplementationHeadRole: "subject",
    });
    const informationFrame = operationFrame(
        question.result,
        "classical-nahuatl-supplementation-information-question-frame",
    );

    const sees = issueVnc("itta", {
        subject: "3sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const subjectQuestion = compose(sees, who, {
        supplementationHeadRole: "subject",
    });
    const objectQuestion = compose(sees, who, {
        supplementationHeadRole: "object",
    });

    const observation = {
        counts: {
            atoms: records.length,
            unique: new Set(records.map((record) => record.atomId)).size,
            writing: writing.length,
            reading: records.length - writing.length,
        },
        captures: question.captures.map((capture) => capture.authorizationStatus),
        captureSlots: {
            required: question.contract.derived.requiredCaptureRoles,
            optional: question.contract.derived.optionalCaptureRoles,
        },
        status: question.result.authorizationStatus,
        surface: question.result.presentation.surface,
        formula: question.result.presentation.formula,
        informationFrame: informationFrame && {
            kind: informationFrame.interrogativeKind,
            position: informationFrame.requiredPosition,
        },
        referenceDecision: decision(
            question.contract,
            "supplementation-reference-mode",
        ),
        orderDecision: decision(question.contract, "supplementation-order"),
        headDecision: decision(subjectQuestion.contract, "supplementation-head-role"),
        selectedHeads: [
            subjectQuestion.result.canonicalResult.referenceFrame.headRole,
            objectQuestion.result.canonicalResult.referenceFrame.headRole,
        ],
        cues: cueLabels(question.result),
    };
    const expected = {
        counts: { atoms: 19, unique: 19, writing: 5, reading: 14 },
        captures: ["authorized", "authorized"],
        captureSlots: {
            required: ["principal", "adjoined"],
            optional: ["marker"],
        },
        status: "authorized",
        surface: "Āc miqui?",
        formula: "#0-0(ā-0)c-0# + #0-0(miqui)0+0-0#",
        informationFrame: { kind: "ac", position: "sentence-initial" },
        referenceDecision: null,
        orderDecision: null,
        headDecision: { values: ["subject", "object"], selected: "subject" },
        selectedHeads: ["subject", "object"],
        cues: [
            "interrogative supplementary subject",
            "shared referent",
            "questioned subject head",
        ],
    };

    const principalEnvelope = question.result.canonicalResult.principalClause;
    const supplementEnvelope = question.result.canonicalResult.supplementClause;
    const ordinary = compose(dies, issueNnc("Petoloh"), {
        supplementationHeadRole: "subject",
        supplementationOrder: "principal-first",
    });
    const mutation = {
        wrongOrder: ctx.evaluateClassicalNahuatlSupplementationOperation({
            operationKind: "relation",
            principalClause: principalEnvelope,
            supplementClause: supplementEnvelope,
            options: {
                referenceMode: "shared",
                headRole: "subject",
                supplementContactRole: "subject",
                order: "principal-first",
                informationQuestion: true,
            },
        }).blockReason,
        ordinarySupplement: ctx.evaluateClassicalNahuatlSupplementationOperation({
            operationKind: "relation",
            principalClause: ordinary.result.canonicalResult.principalClause,
            supplementClause: ordinary.result.canonicalResult.supplementClause,
            options: {
                referenceMode: "shared",
                headRole: "subject",
                supplementContactRole: "subject",
                order: "supplement-first",
                informationQuestion: true,
            },
        }).blockReason,
        copiedFrame: ctx.isClassicalNahuatlSupplementationFrame({
            ...question.result.canonicalResult,
        }),
    };
    const expectedMutation = {
        wrongOrder:
            "information-question-requires-initial-interrogative-nnc-supplement",
        ordinarySupplement:
            "information-question-requires-initial-interrogative-nnc-supplement",
        copiedFrame: false,
    };

    s.eq(
        "accepted Lesson 17 Group 7 uses the normal information-question path",
        observation,
        expected,
    );
    for (const record of writing) {
        s.eq(
            `${record.atomId} performs its accepted writing job`,
            observation,
            expected,
        );
        s.eq(
            `mutation:${record.atomId} fails when its accepted grammar behavior is broken`,
            mutation,
            expectedMutation,
        );
    }
    return s;
}

module.exports = { run };
