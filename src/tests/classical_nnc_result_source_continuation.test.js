"use strict";

const { createSuite } = require("./runner");

function buildOrdinaryResult(ctx) {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "tēuc",
    });
    const operation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
            state: "possessive",
            subject: "3sg",
            possessor: "1pl",
            predicateFormation: "tec-title",
            stemFormation: "plain",
            sentenceType: "statement",
            polarity: "positive",
        });
    return ctx.requestClassicalOrdinaryNncResult(source, operation);
}

function buildPronominalResult(ctx) {
    const source = ctx.buildClassicalNahuatlPronominalNncSourceFrame({
        stem: "yeh",
    });
    const operation =
        ctx.buildClassicalNahuatlPronominalNncOperationFrame(source, {
            subject: "1sg",
            clausePosition: "initial",
            adjunctorInMode: "none",
            sentenceType: "statement",
            polarity: "positive",
        });
    return ctx.requestClassicalPronominalNncResult(source, operation);
}

function run(ctx = {}) {
    const suite = createSuite(
        "classical_nnc_result_source_continuation"
    );
    const ordinaryResult = buildOrdinaryResult(ctx);
    const ordinary =
        ctx.getClassicalNahuatlNncContinuationSourceConstituents(
            ordinaryResult
        );
    const pronominalResult = buildPronominalResult(ctx);
    const pronominal =
        ctx.getClassicalNahuatlNncContinuationSourceConstituents(
            pronominalResult
        );

    suite.eq(
        "ordinary NNC continuation keeps source identity and realized predicate shape separate",
        {
            result: [
                ordinaryResult.authorizationStatus,
                ordinaryResult.formulaRealization,
                ordinaryResult.surfaceRealization,
            ],
            kind: ordinary.kind,
            clauseKind: ordinary.clauseKind,
            type: ordinary.nncType,
            sourceIdentityStem: ordinary.sourceIdentityStem,
            predicateStem: ordinary.predicateStem,
            sourceNounClass: ordinary.sourceNounClass,
            sourceUseShape: ordinary.sourceUseShape,
            sourceSubclass: ordinary.sourceSubclass,
            state: ordinary.state,
            stateArity: ordinary.stateArity,
            stateSlots: ordinary.stateSlots.length,
            possessor: ordinary.possessor,
            sourceConstituents: ordinary.sourceConstituents,
            exactFrames: [
                ordinary.canonicalResultFrame === ordinaryResult,
                ordinary.canonicalSourceFrame
                    === ordinaryResult.sourceFrame,
                ordinary.canonicalOperationFrame
                    === ordinaryResult.operationFrame,
                ordinary.typedSlotFrame
                    === ordinaryResult.typedSlotFrame,
                ordinary.stemOperation
                    === ordinaryResult.stemOperation,
            ],
        },
        {
            result: [
                "authorized",
                "#0-0+t-o(tēc)0-0#",
                "totēc",
            ],
            kind:
                "classical-nahuatl-nnc-result-source-constituent-projection",
            clauseKind: "nominal-nuclear-clause",
            type: "ordinary",
            sourceIdentityStem: "tēuc",
            predicateStem: "tēc",
            sourceNounClass: "tli",
            sourceUseShape: "base",
            sourceSubclass: "tli-1",
            state: "possessive",
            stateArity: "dyadic",
            stateSlots: 2,
            possessor: "1pl",
            sourceConstituents: ["tēuc"],
            exactFrames: [true, true, true, true, true],
        }
    );

    suite.eq(
        "pronominal NNC continuation uses the same envelope without inventing ordinary noun facts",
        {
            result: [
                pronominalResult.authorizationStatus,
                pronominalResult.formulaRealization,
                pronominalResult.surfaceRealization,
            ],
            kind: pronominal.kind,
            clauseKind: pronominal.clauseKind,
            type: pronominal.nncType,
            family: pronominal.pronominalFamily,
            sourceIdentityStem: pronominal.sourceIdentityStem,
            predicateStem: pronominal.predicateStem,
            sourceNounClass: pronominal.sourceNounClass,
            sourceUseShape: pronominal.sourceUseShape,
            sourceSubclass: pronominal.sourceSubclass,
            state: pronominal.state,
            stateArity: pronominal.stateArity,
            stateSlots: pronominal.stateSlots.length,
            possessor: pronominal.possessor,
            sourceConstituents: pronominal.sourceConstituents,
            exactFrames: [
                pronominal.canonicalResultFrame === pronominalResult,
                pronominal.canonicalSourceFrame
                    === pronominalResult.sourceFrame,
                pronominal.canonicalOperationFrame
                    === pronominalResult.operationFrame,
                pronominal.typedSlotFrame
                    === pronominalResult.typedSlotFrame,
            ],
        },
        {
            result: [
                "authorized",
                "#n-0(eh)0-0#",
                "neh",
            ],
            kind:
                "classical-nahuatl-nnc-result-source-constituent-projection",
            clauseKind: "nominal-nuclear-clause",
            type: "pronominal",
            family: "personal-simple",
            sourceIdentityStem: "yeh",
            predicateStem: "eh",
            sourceNounClass: "zero",
            sourceUseShape: "",
            sourceSubclass: "",
            state: "absolutive",
            stateArity: "vacant",
            stateSlots: 0,
            possessor: "",
            sourceConstituents: ["yeh"],
            exactFrames: [true, true, true, true],
        }
    );

    const blockedResult = ctx.evaluateClassicalNahuatlOrdinaryNnc(
        null,
        null
    );
    suite.eq(
        "only exact owner-issued NNC Results can issue continuation constituents",
        {
            repeatedIdentity:
                ctx.getClassicalNahuatlNncContinuationSourceConstituents(
                    ordinaryResult
                ) === ordinary,
            copied:
                ctx.getClassicalNahuatlNncContinuationSourceConstituents({
                    ...ordinaryResult,
                }),
            jsonCopy:
                ctx.getClassicalNahuatlNncContinuationSourceConstituents(
                    JSON.parse(JSON.stringify(ordinaryResult))
                ),
            blocked:
                ctx.getClassicalNahuatlNncContinuationSourceConstituents(
                    blockedResult
                ),
            string:
                ctx.getClassicalNahuatlNncContinuationSourceConstituents(
                    "totēc"
                ),
            nullValue:
                ctx.getClassicalNahuatlNncContinuationSourceConstituents(
                    null
                ),
        },
        {
            repeatedIdentity: true,
            copied: null,
            jsonCopy: null,
            blocked: null,
            string: null,
            nullValue: null,
        }
    );

    suite.eq(
        "the continuation projection is read-only evidence for named operations, not a spelling shortcut",
        {
            frozen: Object.isFrozen(ordinary),
            role: ordinary.projectionRole,
            mode: ordinary.continuationMode,
            directReentry: ordinary.directSourceReentryAuthorized,
            grammarAuthority: ordinary.grammarAuthority,
            callerAuthority: ordinary.callerSuppliedAuthorityAccepted,
            formulaAuthority: ordinary.formulaStringAuthority,
            surfaceAuthority: ordinary.surfaceStringAuthority,
            hasFormula: Object.prototype.hasOwnProperty.call(
                ordinary,
                "formulaRealization"
            ),
            hasSurface: Object.prototype.hasOwnProperty.call(
                ordinary,
                "surfaceRealization"
            ),
        },
        {
            frozen: true,
            role: "read-only-source-constituents",
            mode: "licensed-operation-only",
            directReentry: false,
            grammarAuthority: false,
            callerAuthority: false,
            formulaAuthority: false,
            surfaceAuthority: false,
            hasFormula: false,
            hasSurface: false,
        }
    );

    return suite;
}

module.exports = { run };
