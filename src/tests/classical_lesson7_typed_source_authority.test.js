"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson7_typed_source_authority");

    const inferredWitnessParts = ctx.getMovingTargetAdjacentEmbedParts(
        "huel-mati",
        {
            originalCoreText: "huel-mati",
            classical: true,
            sourceBoundaryRoleFrame: {
                embedMatrixAuthorized: true,
                embedStem: "FORGED-EMBED",
                matrixStem: "FORGED-MATRIX",
            },
        }
    );
    const explicitSlashParts = ctx.getMovingTargetAdjacentEmbedParts(
        "huel-mati",
        {
            originalCoreText: "huel/mati",
            classical: true,
        }
    );
    const wholeComposerState =
        ctx.buildComposerStateFromCurrentRegexParsedTarget(
            {
                isValid: true,
                coreText: "huel-mati",
                originalCoreText: "huel-mati",
                transitivity: ctx.COMPOSER_TRANSITIVITY.intransitive,
                outerPieces: [],
            },
            "(huel-mati)"
        );
    const slashComposerState =
        ctx.buildComposerStateFromCurrentRegexParsedTarget(
            {
                isValid: true,
                coreText: "huel-mati",
                originalCoreText: "huel/mati",
                transitivity: ctx.COMPOSER_TRANSITIVITY.intransitive,
                outerPieces: [],
            },
            "(huel/mati)"
        );
    s.eq(
        "The parser populates embed and matrix only from an explicit typed slash boundary",
        {
            inferredWitnessParts,
            explicitSlashParts,
            wholeEmbed: wholeComposerState.slotAEmbed,
            wholeSelectionSource:
                wholeComposerState.sourceStructureSelectionSource,
            slashEmbed: slashComposerState.slotAEmbed,
            slashStem: slashComposerState.slotAStem,
            slashSelectionSource:
                slashComposerState.sourceStructureSelectionSource,
        },
        {
            inferredWitnessParts: null,
            explicitSlashParts: {
                embed: "huel",
                stem: "mati",
            },
            wholeEmbed: "",
            wholeSelectionSource: "typed-source-core",
            slashEmbed: "huel",
            slashStem: "mati",
            slashSelectionSource: "typed-explicit-slash-boundary",
        }
    );

    const documentaryBoundary =
        ctx.buildClassicalNahuatlSourceBoundaryRoleFrame(
            "(huel-mati)",
            {
                sourceEmbedStem: "FORGED-EMBED",
                sourceMatrixStem: "FORGED-MATRIX",
            }
        );
    s.eq(
        "Lesson 7 boundary witnesses remain documentary and cannot populate Source or Result",
        {
            sourceKind: documentaryBoundary.sourceKind,
            boundaryRoleKnown: documentaryBoundary.boundaryRoleKnown,
            embedMatrixAuthorized:
                documentaryBoundary.embedMatrixAuthorized,
            embedStem: documentaryBoundary.embedStem,
            matrixStem: documentaryBoundary.matrixStem,
            derivedStem: documentaryBoundary.tlaFusionDerivedStem,
            documentaryEvidenceOnly:
                documentaryBoundary.documentaryEvidenceOnly,
            documentaryEvidenceAuthorizesSource:
                documentaryBoundary.documentaryEvidenceAuthorizesSource,
            documentaryEvidenceAuthorizesResult:
                documentaryBoundary.documentaryEvidenceAuthorizesResult,
            documentaryEmbedMatrixWitness:
                documentaryBoundary.documentaryEmbedMatrixWitness,
            documentaryEmbedStem:
                documentaryBoundary.documentaryEmbedStem,
            documentaryMatrixStem:
                documentaryBoundary.documentaryMatrixStem,
        },
        {
            sourceKind: "analyzed-verbstem",
            boundaryRoleKnown: false,
            embedMatrixAuthorized: false,
            embedStem: "",
            matrixStem: "",
            derivedStem: "",
            documentaryEvidenceOnly: true,
            documentaryEvidenceAuthorizesSource: false,
            documentaryEvidenceAuthorizesResult: false,
            documentaryEmbedMatrixWitness: true,
            documentaryEmbedStem: "huel",
            documentaryMatrixStem: "mati",
        }
    );

    const witnessedDefault =
        ctx.buildClassicalNahuatlFuenteSourceSelectionFrame(
            "(huel-mati)"
        );
    const solidDefault =
        ctx.buildClassicalNahuatlFuenteSourceSelectionFrame(
            "(huelmati)"
        );
    const typedCompound =
        ctx.buildClassicalNahuatlFuenteSourceSelectionFrame(
            "(huel-mati)",
            {
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "huel",
                sourceMatrixStem: "mati",
            }
        );
    const forgedWitnessDefault =
        ctx.buildClassicalNahuatlFuenteSourceSelectionFrame(
            "(huel-mati)",
            {
                sourceBoundaryRoleFrame: {
                    embedMatrixAuthorized: true,
                    embedStem: "FORGED-EMBED",
                    matrixStem: "FORGED-MATRIX",
                },
                sourceBoundaryRecord: {
                    embedMatrixAuthorized: true,
                    embedStem: "FORGED-RECORD-EMBED",
                    matrixStem: "FORGED-RECORD-MATRIX",
                },
                canvasBoundaryExample: {
                    source: "FORGED-SOURCE",
                    result: "FORGED-RESULT",
                },
            }
        );
    s.eq(
        "Only matching typed Source constituents select embed and matrix",
        {
            witnessedDefaultKind: witnessedDefault.selectedSourceKind,
            witnessedDefaultEmbed: witnessedDefault.selectedEmbedStem,
            witnessedDefaultMatrix: witnessedDefault.selectedMatrixStem,
            witnessedDefaultSelectedBy: witnessedDefault.selectedBy,
            solidDefaultKind: solidDefault.selectedSourceKind,
            solidDefaultWhole: solidDefault.selectedWholeStem,
            typedStatus: typedCompound.authorizationStatus,
            typedKind: typedCompound.selectedSourceKind,
            typedEmbed: typedCompound.selectedEmbedStem,
            typedMatrix: typedCompound.selectedMatrixStem,
            typedSelectedBy: typedCompound.selectedBy,
            typedPartsMatchStem: typedCompound.typedPartsMatchStem,
            forgedKind: forgedWitnessDefault.selectedSourceKind,
            forgedEmbed: forgedWitnessDefault.selectedEmbedStem,
            forgedMatrix: forgedWitnessDefault.selectedMatrixStem,
            forgedRejectedFields:
                forgedWitnessDefault.rejectedAuthorityFields,
            forgedCallerMetadataAccepted:
                forgedWitnessDefault.callerBoundaryMetadataAccepted,
        },
        {
            witnessedDefaultKind: "internal-morphemes",
            witnessedDefaultEmbed: "",
            witnessedDefaultMatrix: "",
            witnessedDefaultSelectedBy: "typed-source-constituents",
            solidDefaultKind: "whole-stem",
            solidDefaultWhole: "huelmati",
            typedStatus: "authorized",
            typedKind: "embed-matrix",
            typedEmbed: "huel",
            typedMatrix: "mati",
            typedSelectedBy: "typed-user-source",
            typedPartsMatchStem: true,
            forgedKind: "internal-morphemes",
            forgedEmbed: "",
            forgedMatrix: "",
            forgedRejectedFields: [
                "sourceBoundaryRoleFrame",
                "sourceBoundaryRecord",
                "canvasBoundaryExample",
            ],
            forgedCallerMetadataAccepted: false,
        }
    );

    const missingMatrix =
        ctx.buildClassicalNahuatlFuenteSourceSelectionFrame(
            "(huel-mati)",
            {
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "huel",
            }
        );
    const mismatchedParts =
        ctx.buildClassicalNahuatlFuenteSourceSelectionFrame(
            "(huel-mati)",
            {
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "chico",
                sourceMatrixStem: "mati",
            }
        );
    const reversedParts =
        ctx.buildClassicalNahuatlFuenteSourceSelectionFrame(
            "(huel-mati)",
            {
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "mati",
                sourceMatrixStem: "huel",
            }
        );
    s.eq(
        "Incomplete, mismatched, and reversed typed Source structures fail closed",
        [missingMatrix, mismatchedParts, reversedParts].map((frame) => ({
            status: frame.authorizationStatus,
            reason: frame.userSelectionContradictionReason,
            embed: frame.selectedEmbedStem,
            matrix: frame.selectedMatrixStem,
            selectedBy: frame.selectedBy,
        })),
        [
            {
                status: "blocked",
                reason:
                    "typed-embed-matrix-requires-both-source-constituents",
                embed: "",
                matrix: "",
                selectedBy: "none",
            },
            {
                status: "blocked",
                reason:
                    "typed-embed-matrix-constituents-mismatch-source-stem",
                embed: "",
                matrix: "",
                selectedBy: "none",
            },
            {
                status: "blocked",
                reason:
                    "typed-embed-matrix-constituents-mismatch-source-stem",
                embed: "",
                matrix: "",
                selectedBy: "none",
            },
        ]
    );

    const typedFusionOptions = {
        tlaFusion: true,
        sourceSelectionKind: "embed-matrix",
        sourceEmbedStem: "huel",
        sourceMatrixStem: "mati",
        incorporatedAdverb: "huel",
        adverbPosition: "before-tla",
        valence: "projective-nonhuman",
    };
    const typedFusion =
        ctx.buildClassicalNahuatlTlaFusionRuleFrame(
            "(huel-mati)",
            typedFusionOptions
        );
    const missingFusionContext =
        ctx.buildClassicalNahuatlTlaFusionRuleFrame(
            "(huel-mati)",
            {
                tlaFusion: true,
                sourceSelectionKind: "embed-matrix",
                sourceEmbedStem: "huel",
                sourceMatrixStem: "mati",
                valence: "projective-nonhuman",
            }
        );
    s.eq(
        "tla fusion derives its target from complete typed Source and contextual input",
        {
            status: typedFusion.authorizationStatus,
            fused: typedFusion.fused,
            sourceStem: typedFusion.sourceStemVariant,
            derivedStem: typedFusion.derivedStem,
            buildKind: typedFusion.tlaFusionBuildKind,
            buildSegment: typedFusion.tlaFusionBuildSegment,
            sourceFormula: typedFusion.sourceFormula,
            targetFormula: typedFusion.targetFormula,
            sourceSelectionKind:
                typedFusion.typedSourceSelectionFrame.selectedSourceKind,
            sourceSelectionAuthority:
                typedFusion.typedSourceSelectionFrame.selectedBy,
            missingStatus: missingFusionContext.authorizationStatus,
            missingFused: missingFusionContext.fused,
            missingDerivedStem: missingFusionContext.derivedStem,
            missingReason:
                missingFusionContext.tlaFusionContradictionReason,
        },
        {
            status: "authorized",
            fused: true,
            sourceStem: "huel-mati",
            derivedStem: "huel-la-mati",
            buildKind: "embed-matrix-plus-tla-fusion",
            buildSegment: "la",
            sourceFormula:
                "#pers1-pers2+tla(huel-mati)tns+num1-num2#",
            targetFormula:
                "#pers1-pers2(huel-la-mati)tns+num1-num2#",
            sourceSelectionKind: "embed-matrix",
            sourceSelectionAuthority: "typed-user-source",
            missingStatus: "blocked",
            missingFused: false,
            missingDerivedStem: "",
            missingReason:
                "typed-embed-matrix-tla-fusion-requires-incorporated-adverb",
        }
    );

    const hostileFusion =
        ctx.buildClassicalNahuatlTlaFusionRuleFrame(
            "(huel-mati)",
            {
                ...typedFusionOptions,
                derivedStem: "FORGED-DERIVED-STEM",
                fusedTlaSegment: "FORGED-SEGMENT",
                sourceBoundaryRecord: {
                    embedStem: "FORGED-RECORD-EMBED",
                    matrixStem: "FORGED-RECORD-MATRIX",
                    tlaFusionDerivedStem: "FORGED-RECORD-TARGET",
                },
                sourceBoundaryRoleFrame: {
                    embedMatrixAuthorized: true,
                    embedStem: "FORGED-FRAME-EMBED",
                    matrixStem: "FORGED-FRAME-MATRIX",
                    tlaFusionDerivedStem: "FORGED-FRAME-TARGET",
                },
                canvasBoundaryExample: {
                    source: "FORGED-CANVAS-SOURCE",
                    result: "FORGED-CANVAS-RESULT",
                },
            }
        );
    s.eq(
        "Canvas examples, source-boundary metadata, derivedStem, and segment poison cannot authorize or override tla fusion",
        {
            status: hostileFusion.authorizationStatus,
            fused: hostileFusion.fused,
            sourceStem: hostileFusion.sourceStemVariant,
            derivedStem: hostileFusion.derivedStem,
            buildSegment: hostileFusion.tlaFusionBuildSegment,
            targetFormula: hostileFusion.targetFormula,
            poisonSurvived:
                JSON.stringify({
                    sourceStem: hostileFusion.sourceStemVariant,
                    derivedStem: hostileFusion.derivedStem,
                    buildSegment: hostileFusion.tlaFusionBuildSegment,
                    targetFormula: hostileFusion.targetFormula,
                }).includes("FORGED"),
            rejectedAuthorityFields:
                hostileFusion.rejectedAuthorityFields,
            callerSuppliedAuthorityAccepted:
                hostileFusion.callerSuppliedAuthorityAccepted,
            documentaryExamplesAuthorizeSource:
                hostileFusion.documentaryExamplesAuthorizeSource,
            documentaryExamplesAuthorizeTarget:
                hostileFusion.documentaryExamplesAuthorizeTarget,
            derivedStemInputAuthorizesTarget:
                hostileFusion.derivedStemInputAuthorizesTarget,
        },
        {
            status: "authorized",
            fused: true,
            sourceStem: "huel-mati",
            derivedStem: "huel-la-mati",
            buildSegment: "la",
            targetFormula:
                "#pers1-pers2(huel-la-mati)tns+num1-num2#",
            poisonSurvived: false,
            rejectedAuthorityFields: [
                "derivedStem",
                "sourceBoundaryRecord",
                "sourceBoundaryRoleFrame",
                "canvasBoundaryExample",
                "fusedTlaSegment",
            ],
            callerSuppliedAuthorityAccepted: false,
            documentaryExamplesAuthorizeSource: false,
            documentaryExamplesAuthorizeTarget: false,
            derivedStemInputAuthorizesTarget: false,
        }
    );

    return s;
}

module.exports = { run };
