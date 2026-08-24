"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_grammatical_rhyme_evaluation_order");
    const inventory = ctx.getClassicalGrammarApplicationInventory();

    s.eq(
        "one non-authorizing evaluation-order cast covers every canonical application Result",
        {
            getter: typeof ctx.getClassicalGrammarApplicationEvaluationOrder,
            inspector:
                typeof ctx.inspectClassicalGrammarEvaluationOrderCandidate,
            declaration:
                inventory.grammaticalRhymeCalibration.evaluationOrderCast,
        },
        {
            getter: "function",
            inspector: "function",
            declaration: {
                kind: "classical-grammatical-rhyme-evaluation-order-cast",
                version: 1,
                entrance: "executeClassicalGrammarApplicationRequest",
                scope: "every-authorized-owner-issued-application-result",
                stageOrder: [
                    "exact-owner-source",
                    "inner-formation",
                    "participants-and-state-finalized",
                    "boundary-realization",
                    "surface-projection",
                ],
                earlyEvaluationCondition:
                    "consumer-runs-before-final-inner-carrier-order",
                lateEvaluationCondition:
                    "consumer-runs-after-required-owner-identity-is-lost",
                discoveredFromTypedStructureNotExampleIdentity: true,
                ownerResultValidationRequired: true,
                grammarAuthority: false,
            },
        }
    );

    const earlyNncSlotFrame = Object.freeze({
        kind: "classical-nahuatl-nnc-slot-frame",
        slots: Object.freeze({
            subject: Object.freeze({
                pers1BaseMorph: "t",
                pers1: "t",
            }),
            participant: Object.freeze({ slots: Object.freeze([]) }),
            state: Object.freeze({
                slots: Object.freeze([
                    Object.freeze({ carrier: "n" }),
                ]),
            }),
            predicate: Object.freeze({ stem: "āna-l" }),
        }),
    });
    const syntheticBefore =
        ctx.inspectClassicalGrammarEvaluationOrderCandidate(
            Object.freeze({
                kind: "diagnostic-before-result",
                nncSlotFrame: earlyNncSlotFrame,
            })
        );
    s.eq(
        "the uncorrected early boundary is found from typed neighboring material without gaining grammar authority",
        {
            status: syntheticBefore.analysisStatus,
            findingCount: syntheticBefore.findingCount,
            classification:
                syntheticBefore.earlyFindings[0]?.timingClassification,
            actual: syntheticBefore.earlyFindings[0]?.actualSubjectCarrier,
            expected:
                syntheticBefore.earlyFindings[0]?.expectedSubjectCarrier,
            immediate:
                syntheticBefore.earlyFindings[0]?.immediateAudibleCarrier,
            diagnosticOnly: syntheticBefore.diagnosticOnly,
            grammarAuthority: syntheticBefore.grammarAuthority,
        },
        {
            status: "untrusted-input",
            findingCount: 1,
            classification: "early-evaluation-before-inner-consonant",
            actual: "t",
            expected: "ti",
            immediate: "n",
            diagnosticOnly: true,
            grammarAuthority: false,
        }
    );

    const vncRequest = {
        sourceStem: "āna",
        verbClass: "B",
        sourceValence: "specific-projective",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "passive",
        voice: "passive",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(vncRequest);
    const option = preview.controlFrame
        ?.nonactiveOptionInventory?.options?.find(item => (
            item.nonactiveStem === "āna-lō"
            || item.optionId === "lō:āna-lō"
        ));
    const vncReceipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        args: [{
            ...vncRequest,
            nonactiveOptionId: option?.optionId || "",
        }],
    });
    const patientiveReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:deverbal-construction",
            args: [{
                constructionKind: "patientive",
                patientiveSourceFamily: "passive-core",
                canonicalVncResult: vncReceipt.canonicalResult.resultFrame,
                subject: "2sg",
                state: "possessive",
                possessor: "1sg",
                animacy: "animate",
            }],
        });
    const evaluation =
        ctx.getClassicalGrammarApplicationEvaluationOrder(
            patientiveReceipt
        );
    const correctedBoundary = evaluation?.subjectBoundaryObservations.find(
        observation => (
            observation.unitFamily === "nnc"
            && observation.baseMorph === "t"
            && observation.immediateAudibleCarrier === "n"
        )
    );
    const capture = ctx.captureClassicalGrammarApplicationResult(
        patientiveReceipt,
        "evaluation-order-rhyme-proof"
    );
    s.eq(
        "the corrected owner-issued āna patientive waits for possessive state before realizing supportive i",
        {
            authorizationStatus: patientiveReceipt.authorizationStatus,
            formula:
                patientiveReceipt.canonicalResult
                    ?.canonicalResult?.formulaRealization,
            status: evaluation?.analysisStatus,
            findingCount: evaluation?.findingCount,
            actual: correctedBoundary?.actualSubjectCarrier,
            expected: correctedBoundary?.expectedSubjectCarrier,
            immediate: correctedBoundary?.immediateAudibleCarrier,
            aligned: correctedBoundary?.aligned,
            exactOwnerHandoffs:
                evaluation?.exactOwnerIdentityHandoffsPreserved,
            captureKeepsExactFrame:
                capture?.evaluationOrderFrame === evaluation,
        },
        {
            authorizationStatus: "authorized",
            formula: "#ti-0+n-⎕(āna-l)0-0#",
            status: "order-aligned",
            findingCount: 0,
            actual: "ti",
            expected: "ti",
            immediate: "n",
            aligned: true,
            exactOwnerHandoffs: true,
            captureKeepsExactFrame: true,
        }
    );

    s.eq(
        "copies and JSON lookalikes cannot retrieve the owner-bound timing observation",
        [
            ctx.getClassicalGrammarApplicationEvaluationOrder({
                ...patientiveReceipt,
            }),
            ctx.getClassicalGrammarApplicationEvaluationOrder({
                ...patientiveReceipt.canonicalResult,
            }),
            ctx.getClassicalGrammarApplicationEvaluationOrder(
                JSON.parse(JSON.stringify(patientiveReceipt))
            ),
        ],
        [null, null, null]
    );

    return s;
}

module.exports = { run };
