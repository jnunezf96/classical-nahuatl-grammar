"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_pronominal_nnc_application");

    const source = ctx.buildClassicalNahuatlPronominalNncSourceFrame({
        stem: "yeh",
    });
    const operation =
        ctx.buildClassicalNahuatlPronominalNncOperationFrame(source, {
            subject: "3sg",
            clausePosition: "initial",
            adjunctorInMode: "none",
            sentenceType: "statement",
            polarity: "positive",
        });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:pronominal",
        args: [source, operation],
    });
    const result = receipt.canonicalResult;

    s.eq(
        "pronominal NNC uses one typed Source, operation, and canonical Result",
        {
            source: ctx.isClassicalNahuatlPronominalNncSourceFrame(
                source
            ),
            operation:
                ctx.isClassicalNahuatlPronominalNncOperationFrame(
                    operation
                ),
            receipt: receipt.authorizationStatus,
            route: receipt.operationId,
            result: ctx.isClassicalNahuatlPronominalNncResult(result),
            formula: result.formulaProjection.formulaRealization,
            written: result.writtenProjection.surfaceRealization,
            sentence: result.sentenceSurface,
            independent:
                result.formulaAndWrittenDerivedIndependently,
        },
        {
            source: true,
            operation: true,
            receipt: "authorized",
            route: "nnc:pronominal",
            result: true,
            formula: "#0-0(yeh)0-0#",
            written: "yeh",
            sentence: "Yeh.",
            independent: true,
        }
    );

    const interrogativeSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({
            stem: "tl-eh",
            embedStem: "tl",
            matrixStem: "eh",
        });
    const requestInterrogative = (clausePosition) => {
        const selectedOperation =
            ctx.buildClassicalNahuatlPronominalNncOperationFrame(
                interrogativeSource,
                {
                    subject: "3sg",
                    clausePosition,
                    adjunctorInMode: "none",
                    sentenceType: "statement",
                    polarity: "positive",
                }
            );
        return ctx.requestClassicalPronominalNncResult(
            interrogativeSource,
            selectedOperation
        );
    };
    const initial = requestInterrogative("initial");
    const noninitial = requestInterrogative("noninitial");

    s.eq(
        "changing clause position remains in the same workflow and realizes contextual interrogation",
        {
            initialFormula: initial.formulaRealization,
            initialWritten: initial.surfaceRealization,
            initialSentence: initial.sentenceSurface,
            noninitialFormula: noninitial.formulaRealization,
            noninitialWritten: noninitial.surfaceRealization,
            noninitialSentence: noninitial.sentenceSurface,
            initialEvaluator: initial.scalarEvaluatorIdentity,
            noninitialEvaluator: noninitial.scalarEvaluatorIdentity,
        },
        {
            initialFormula: "#0-0(tl-eh)0-0#",
            initialWritten: "tleh",
            initialSentence: "Tleh?",
            noninitialFormula: "#0-0(tl-eh)0-0#",
            noninitialWritten: "tleh",
            noninitialSentence: "Tleh.",
            initialEvaluator:
                "evaluateClassicalNahuatlPronominalNnc",
            noninitialEvaluator:
                "evaluateClassicalNahuatlPronominalNnc",
        }
    );

    const quantitiveSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({
            stem: "miye-c",
            embedStem: "miye",
            matrixStem: "c",
        });
    const quantitiveOperation =
        ctx.buildClassicalNahuatlPronominalNncOperationFrame(
            quantitiveSource,
            {
                subject: "1pl",
                clausePosition: "initial",
                adjunctorInMode: "none",
                sentenceType: "statement",
                polarity: "positive",
            }
        );
    const quantitive =
        ctx.requestClassicalPronominalNncResult(
            quantitiveSource,
            quantitiveOperation
        );

    s.eq(
        "quantitive internal n remains predicate derivation while subject number is independently realized",
        {
            status: quantitive.authorizationStatus,
            formula: quantitive.formulaRealization,
            written: quantitive.surfaceRealization,
            internalMorph:
                quantitive.numberRealization.internalPluralMorph,
            internalBelongsTo:
                quantitive.numberRealization.internalPluralBelongsTo,
            subjectBelongsTo:
                quantitive.numberRealization.subjectNumberBelongsTo,
        },
        {
            status: "authorized",
            formula: "#ti-0(miye-quī-n)t-in#",
            written: "timiyequīntin",
            internalMorph: "n-inside-stem",
            internalBelongsTo: "predicate-stem-derivation",
            subjectBelongsTo: "subject-personal-pronoun",
        }
    );

    const plan = ctx.prepareClassicalPronominalNncParadigmPlan(
        source,
        {
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    const coordinates =
        ctx.projectClassicalPronominalNncParadigmCoordinates(plan);
    const direct = plan.coordinates.map((coordinate) =>
        ctx.requestClassicalPronominalNncResult(
            source,
            coordinate.operationFrame
        ));

    s.eq(
        "every pronominal paradigm coordinate is pointwise the scalar evaluator",
        {
            status: plan.authorizationStatus,
            coordinateCount: coordinates.length,
            issued: coordinates.every((coordinate) =>
                ctx.isClassicalNahuatlPronominalNncParadigmCoordinate(
                    coordinate
                )),
            parity: coordinates.every((coordinate, index) =>
                coordinate.formulaRealization
                    === direct[index].formulaRealization
                && coordinate.surfaceRealization
                    === direct[index].surfaceRealization
                && coordinate.sentenceSurface
                    === direct[index].sentenceSurface
                && coordinate.scalarEvaluatorIdentity
                    === "evaluateClassicalNahuatlPronominalNnc"),
            exact: coordinates.map((coordinate) => [
                coordinate.formulaRealization,
                coordinate.surfaceRealization,
            ]),
        },
        {
            status: "authorized",
            coordinateCount: 3,
            issued: true,
            parity: true,
            exact: [
                ["#0-0(yeh)0-0#", "yeh"],
                ["#0-0(yeh)0-0#", "yeh"],
                ["#0-0(yeh)m-eh#", "yehmeh"],
            ],
        }
    );

    const personalCompoundSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({
            stem: "eh-huā",
            embedStem: "eh",
            matrixStem: "huā",
        });
    const personalCompoundPlan =
        ctx.prepareClassicalPronominalNncParadigmPlan(
            personalCompoundSource,
            {
                sentenceType: "statement",
                polarity: "positive",
            }
        );
    const personalCompoundCoordinates =
        ctx.projectClassicalPronominalNncParadigmCoordinates(
            personalCompoundPlan
        );
    const personalCompoundDirect =
        personalCompoundPlan.coordinates.map((coordinate) =>
            ctx.requestClassicalPronominalNncResult(
                personalCompoundSource,
                coordinate.operationFrame
            ));
    const missingPersonalCompoundSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({
            stem: "eh-huā",
        });
    const mismatchedPersonalCompoundSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({
            stem: "eh-huā",
            embedStem: "yeh",
            matrixStem: "huā",
        });
    s.eq(
        "eh-huā requires its exact typed compound Source and its complete paradigm is pointwise scalar",
        {
            sourceStatus: personalCompoundSource.authorizationStatus,
            sourceParts: [
                personalCompoundSource.embedStem,
                personalCompoundSource.matrixStem,
            ],
            planStatus: personalCompoundPlan.authorizationStatus,
            subjects: personalCompoundSource.allowedSubjects,
            coordinateCount: personalCompoundPlan.coordinateCount,
            parity: personalCompoundCoordinates.every(
                (coordinate, index) => (
                    coordinate.formulaRealization
                        === personalCompoundDirect[index].formulaRealization
                    && coordinate.surfaceRealization
                        === personalCompoundDirect[index].surfaceRealization
                    && coordinate.sentenceSurface
                        === personalCompoundDirect[index].sentenceSurface
                )
            ),
            exact: personalCompoundCoordinates.map((coordinate) => [
                coordinate.formulaRealization,
                coordinate.surfaceRealization,
            ]),
            missingStatus:
                missingPersonalCompoundSource.authorizationStatus,
            missingReason: missingPersonalCompoundSource.blockReason,
            mismatchStatus:
                mismatchedPersonalCompoundSource.authorizationStatus,
            mismatchReason: mismatchedPersonalCompoundSource.blockReason,
        },
        {
            sourceStatus: "authorized",
            sourceParts: ["eh", "huā"],
            planStatus: "authorized",
            subjects: ["1sg", "2sg", "3common", "1pl", "2pl"],
            coordinateCount: 12,
            parity: true,
            exact: [
                ["#n-0(eh-huā)tl-0#", "nehhuātl"],
                ["#n-0(eh-huā)⎕-0#", "nehhuā"],
                ["#t-0(eh-huā)tl-0#", "tehhuātl"],
                ["#t-0(eh-huā)⎕-0#", "tehhuā"],
                ["#0-0(eh-huā)tl-0#", "ehhuātl"],
                ["#0-0(eh-huā)⎕-0#", "ehhuā"],
                ["#t-0(eh-huā-n)t-in#", "tehhuāntin"],
                ["#ti-t-0(eh-huā-n)t-in#", "titehhuāntin"],
                ["#t-0(eh-huā-n)⎕-⎕#", "tehhuān"],
                ["#ti-t-0(eh-huā-n)⎕-⎕#", "titehhuān"],
                ["#am-0(eh-huā-n)t-in#", "amehhuāntin"],
                ["#am-0(eh-huā-n)⎕-⎕#", "amehhuān"],
            ],
            missingStatus: "blocked",
            missingReason:
                "pronominal-nnc-source-constituent-structure-mismatch",
            mismatchStatus: "blocked",
            mismatchReason:
                "pronominal-nnc-source-constituent-structure-mismatch",
        }
    );

    const copiedSource = { ...source };
    const copiedOperation = { ...operation };
    const lexicalFactSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({
            stem: "yeh",
            familyId: "personal-simple",
        });
    const derivedFactOperation =
        ctx.buildClassicalNahuatlPronominalNncOperationFrame(
            source,
            {
                subject: "3sg",
                numberForm: "sounded",
            }
        );
    const injected = ctx.buildClassicalNahuatlPronominalNncOperationFrame(
        source,
        {
            subject: "3sg",
            numberForm: "sounded",
            clausePosition: "initial",
            adjunctorInMode: "none",
            formula: "#0-0(yeh)0-0#",
            surface: "yeh",
            lessonNumber: 16,
        }
    );
    const copiedPlanReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:pronominal",
            outputKind: "coordinate-projection",
            args: [{ ...plan }],
        });

    s.eq(
        "copied frames and documentary or stored-answer authority fail closed",
        {
            copiedSource:
                ctx.isClassicalNahuatlPronominalNncSourceFrame(
                    copiedSource
                ),
            copiedOperation:
                ctx.isClassicalNahuatlPronominalNncOperationFrame(
                    copiedOperation
                ),
            lexicalFactSourceStatus:
                lexicalFactSource.authorizationStatus,
            lexicalFactSourceReason: lexicalFactSource.blockReason,
            derivedFactOperationStatus:
                derivedFactOperation.authorizationStatus,
            derivedFactOperationReason:
                derivedFactOperation.blockReason,
            copiedEvaluation:
                ctx.evaluateClassicalNahuatlPronominalNnc(
                    copiedSource,
                    copiedOperation
                ).authorizationStatus,
            injectedStatus: injected.authorizationStatus,
            injectedReason: injected.blockReason,
            copiedPlanStatus: copiedPlanReceipt.authorizationStatus,
            copiedPlanReason: copiedPlanReceipt.blockReason,
        },
        {
            copiedSource: false,
            copiedOperation: false,
            lexicalFactSourceStatus: "blocked",
            lexicalFactSourceReason:
                "pronominal-nnc-source-lexical-facts-are-engine-owned:familyId",
            derivedFactOperationStatus: "blocked",
            derivedFactOperationReason:
                "pronominal-nnc-operation-derived-facts-are-engine-owned:numberForm",
            copiedEvaluation: "blocked",
            injectedStatus: "blocked",
            injectedReason:
                "pronominal-nnc-operation-forbidden-authority:$.formula",
            copiedPlanStatus: "blocked",
            copiedPlanReason:
                "classical-grammar-application-request-invalid:issued-authorized-prepared-plan-required",
        }
    );

    return s;
}

module.exports = { run };
