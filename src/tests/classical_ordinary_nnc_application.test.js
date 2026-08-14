"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_ordinary_nnc_application");

    s.eq(
        "ordinary NNC exposes one typed scalar route and coordinated paradigm outputs",
        [
            typeof ctx.buildClassicalNahuatlOrdinaryNncSourceFrame,
            typeof ctx.buildClassicalNahuatlOrdinaryNncOperationFrame,
            typeof ctx.evaluateClassicalNahuatlOrdinaryNnc,
            typeof ctx.requestClassicalOrdinaryNncResult,
            typeof ctx.prepareClassicalOrdinaryNncParadigmPlan,
            typeof ctx.projectClassicalOrdinaryNncParadigmCoordinates,
        ],
        Array(6).fill("function")
    );

    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "mich",
    });
    const selectedOperation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
            state: "absolutive",
            subject: "1sg",
            sentenceType: "statement",
            polarity: "positive",
        });
    const selectedReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:ordinary",
            args: [source, selectedOperation],
        });
    const selected = selectedReceipt.canonicalResult;

    s.eq(
        "selected ordinary NNC returns exact independent LCM formula and GCD written projections",
        {
            sourceAuthorized:
                ctx.isClassicalNahuatlOrdinaryNncSourceFrame(source),
            operationAuthorized:
                ctx.isClassicalNahuatlOrdinaryNncOperationFrame(
                    selectedOperation
                ),
            receiptStatus: selectedReceipt.authorizationStatus,
            receiptOperationId: selectedReceipt.operationId,
            resultAuthorized:
                ctx.isClassicalNahuatlOrdinaryNncResult(selected),
            formula: selected.formulaRealization,
            written: selected.surfaceRealization,
            sentence: selected.sentenceSurface,
            formulaSource: selected.formulaProjection.projectionSource,
            writtenSource: selected.writtenProjection.projectionSource,
            independent: selected.formulaAndWrittenDerivedIndependently,
        },
        {
            sourceAuthorized: true,
            operationAuthorized: true,
            receiptStatus: "authorized",
            receiptOperationId: "nnc:ordinary",
            resultAuthorized: true,
            formula: "#ni-0(mich)in-0#",
            written: "nimichin",
            sentence: "Nimichin.",
            formulaSource: "typed-nnc-slot-frame",
            writtenSource: "typed-nnc-boundary-realization",
            independent: true,
        }
    );

    const openSource =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "nemi",
            nounClass: "zero",
        });
    const openOperation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(openSource, {
            state: "absolutive",
            subject: "3sg",
        });
    const openResult =
        ctx.requestClassicalOrdinaryNncResult(openSource, openOperation);
    const secondOpenSource =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "xopa",
            nounClass: "zero",
        });
    const secondOpenOperation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
            secondOpenSource,
            { state: "absolutive", subject: "3sg" }
        );
    const secondOpenResult =
        ctx.requestClassicalOrdinaryNncResult(
            secondOpenSource,
            secondOpenOperation
        );
    const openPlan =
        ctx.prepareClassicalOrdinaryNncParadigmPlan(openSource, {
            states: ["absolutive"],
            subjects: ["3sg"],
        });
    const openCoordinates =
        ctx.projectClassicalOrdinaryNncParadigmCoordinates(openPlan);
    const missingOpenClass =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem: "nemi" });
    const incompatibleOpenClass =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "nemi",
            nounClass: "tli",
        });
    const canonicalClassOverride =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "cal",
            nounClass: "zero",
        });
    const copiedOpenSource = { ...openSource };

    s.eq(
        "open nounstems use one authenticated lexical analysis and the canonical scalar/paradigm evaluator",
        {
            sourceStatus: openSource.authorizationStatus,
            sourceAuthorized:
                ctx.isClassicalNahuatlOrdinaryNncSourceFrame(openSource),
            sourceAuthority: openSource.lexicalSelectionAuthority,
            openStemSource: openSource.openStemSource,
            operationStatus: openOperation.authorizationStatus,
            resultStatus: openResult.authorizationStatus,
            formula: openResult.formulaRealization,
            written: openResult.surfaceRealization,
            sentence: openResult.sentenceSurface,
            secondSentence: secondOpenResult.sentenceSurface,
            planStatus: openPlan.authorizationStatus,
            coordinateCount: openCoordinates.length,
            coordinateSentence: openCoordinates[0].sentenceSurface,
            copiedSourceAccepted:
                ctx.isClassicalNahuatlOrdinaryNncSourceFrame(
                    copiedOpenSource
                ),
            missingClassReason: missingOpenClass.blockReason,
            incompatibleClassReason: incompatibleOpenClass.blockReason,
            canonicalOverrideReason: canonicalClassOverride.blockReason,
        },
        {
            sourceStatus: "authorized",
            sourceAuthorized: true,
            sourceAuthority: "user-supplied-lexical-analysis",
            openStemSource: true,
            operationStatus: "authorized",
            resultStatus: "authorized",
            formula: "#0-0(nemi)0-0#",
            written: "nemi",
            sentence: "Nemi.",
            secondSentence: "Xopa.",
            planStatus: "authorized",
            coordinateCount: 1,
            coordinateSentence: "Nemi.",
            copiedSourceAccepted: false,
            missingClassReason: "lexical-noun-class-selection-required",
            incompatibleClassReason:
                "typed-class-alternative-contradicts-canvas-form-constraint",
            canonicalOverrideReason:
                "ordinary-nnc-source-canonical-class-override-not-allowed",
        }
    );

    const possessiveOperation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
            state: "possessive",
            subject: "1sg",
            possessor: "3sg",
        });
    const possessiveReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:ordinary",
            args: [source, possessiveOperation],
        });
    s.eq(
        "changing a genuine Grammar control stays on the same ordinary-NNC workflow",
        {
            selectedRoute: selectedReceipt.operationId,
            changedRoute: possessiveReceipt.operationId,
            status: possessiveReceipt.authorizationStatus,
            formula: possessiveReceipt.canonicalResult.formulaRealization,
            written: possessiveReceipt.canonicalResult.surfaceRealization,
        },
        {
            selectedRoute: "nnc:ordinary",
            changedRoute: "nnc:ordinary",
            status: "authorized",
            formula: "#n-0+ī-0(mich)0-0#",
            written: "nīmich",
        }
    );

    const thirdPluralBoundaryResults = ["cal", "pah"].map((stem) => {
        const boundarySource =
            ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem });
        const boundaryOperation =
            ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
                boundarySource,
                {
                    state: "possessive",
                    subject: "3sg",
                    possessor: "3pl",
                    metaphoricalUse: stem === "cal",
                }
            );
        const boundaryResult =
            ctx.requestClassicalOrdinaryNncResult(
                boundarySource,
                boundaryOperation
            );
        return {
            stem,
            formula: boundaryResult.formulaRealization,
            written: boundaryResult.surfaceRealization,
            contextual: boundaryResult.contextualRealizations,
        };
    });
    s.eq(
        "third-plural possessor m or n is a contextual realization inside the canonical ordinary result",
        {
            results: thirdPluralBoundaryResults,
            splitApplicationRoute:
                typeof ctx.requestClassicalThirdPluralPossessor,
            splitOperationRegistered:
                ctx.getClassicalGrammarApplicationInventory()
                    .operationIds.includes(
                        "nnc:third-plural-possessor"
                    ),
        },
        {
            results: [
                {
                    stem: "cal",
                    formula: "#0-0+ī-n(cal)0-0#",
                    written: "īncal",
                    contextual: {
                        thirdPluralPossessorSt2: "n",
                        thirdPluralPossessorBoundarySound: "c",
                        thirdPluralPossessorApplicable: true,
                        selectionAuthority: "typed-boundary-context",
                        userSelectionAuthority: false,
                        formulaStringAuthority: false,
                        surfaceStringAuthority: false,
                    },
                },
                {
                    stem: "pah",
                    formula: "#0-0+ī-m(pah)0-0#",
                    written: "īmpah",
                    contextual: {
                        thirdPluralPossessorSt2: "m",
                        thirdPluralPossessorBoundarySound: "p",
                        thirdPluralPossessorApplicable: true,
                        selectionAuthority: "typed-boundary-context",
                        userSelectionAuthority: false,
                        formulaStringAuthority: false,
                        surfaceStringAuthority: false,
                    },
                },
            ],
            splitApplicationRoute: "undefined",
            splitOperationRegistered: false,
        }
    );

    const paradigmSelections = {
            states: ["absolutive", "possessive"],
            subjects: ["1sg", "3sg"],
            possessors: ["1sg", "3sg"],
            sentenceType: "statement",
            polarity: "positive",
        };
    const plan =
        ctx.prepareClassicalOrdinaryNncParadigmPlan(
            source,
            paradigmSelections
        );
    const coordinates =
        ctx.projectClassicalOrdinaryNncParadigmCoordinates(plan);
    const directScalarCoordinates = plan.coordinates.map((coordinate) =>
        ctx.requestClassicalOrdinaryNncResult(
            source,
            coordinate.operationFrame
        ));

    s.eq(
        "every paradigm coordinate is the exact output of the canonical scalar evaluator",
        {
            planStatus: plan.authorizationStatus,
            projectionStatus: coordinates.every((coordinate) =>
                coordinate.authorizationStatus === "authorized")
                ? "authorized"
                : "blocked",
            coordinateCount: coordinates.length,
            allCoordinatesIssued: coordinates.every((coordinate) =>
                ctx.isClassicalNahuatlOrdinaryNncParadigmCoordinate(
                    coordinate
                )),
            allScalarIssued: directScalarCoordinates.every((scalar) =>
                ctx.isClassicalNahuatlOrdinaryNncResult(scalar)),
            parity: coordinates.map((coordinate, index) => ({
                id: coordinate.coordinateId,
                scalarIdentity:
                    coordinate.scalarEvaluatorIdentity
                    === "evaluateClassicalNahuatlOrdinaryNnc",
                sameFormula:
                    coordinate.formulaRealization
                    === directScalarCoordinates[index].formulaRealization,
                sameWritten:
                    coordinate.surfaceRealization
                    === directScalarCoordinates[index].surfaceRealization,
                sameSentence:
                    coordinate.sentenceSurface
                    === directScalarCoordinates[index].sentenceSurface,
            })),
            exactPairs: coordinates.map((coordinate) => [
                coordinate.formulaRealization,
                coordinate.surfaceRealization,
            ]),
        },
        {
            planStatus: "authorized",
            projectionStatus: "authorized",
            coordinateCount: 6,
            allCoordinatesIssued: true,
            allScalarIssued: true,
            parity: [
                "absolutive:1sg:no-possessor:plain:no-plural-connector",
                "absolutive:3sg:no-possessor:plain:no-plural-connector",
                "possessive:1sg:1sg:plain:no-plural-connector",
                "possessive:1sg:3sg:plain:no-plural-connector",
                "possessive:3sg:1sg:plain:no-plural-connector",
                "possessive:3sg:3sg:plain:no-plural-connector",
            ].map((id) => ({
                id,
                scalarIdentity: true,
                sameFormula: true,
                sameWritten: true,
                sameSentence: true,
            })),
            exactPairs: [
                ["#ni-0(mich)in-0#", "nimichin"],
                ["#0-0(mich)in-0#", "michin"],
                ["#ni-0+n-o(mich)0-0#", "ninomich"],
                ["#n-0+ī-0(mich)0-0#", "nīmich"],
                ["#0-0+n-o(mich)0-0#", "nomich"],
                ["#0-0+ī-0(mich)0-0#", "īmich"],
            ],
        }
    );

    const rawPlan =
        ctx.prepareClassicalNahuatlOrdinaryNncParadigmPlan(source, {
            states: ["absolutive"],
            subjects: ["1sg"],
        });
    const rawPlanProjectionReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:ordinary",
            outputKind: "coordinate-projection",
            args: [rawPlan],
        });
    const copiedPlanProjectionReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:ordinary",
            outputKind: "coordinate-projection",
            args: [{ ...plan }],
        });
    s.eq(
        "coordinate projection requires the owner-issued application plan receipt",
        {
            rawPlanStatus: rawPlanProjectionReceipt.authorizationStatus,
            rawPlanReason: rawPlanProjectionReceipt.blockReason,
            copiedPlanStatus: copiedPlanProjectionReceipt.authorizationStatus,
            copiedPlanReason: copiedPlanProjectionReceipt.blockReason,
        },
        {
            rawPlanStatus: "blocked",
            rawPlanReason:
                "classical-grammar-application-request-invalid:issued-authorized-prepared-plan-required",
            copiedPlanStatus: "blocked",
            copiedPlanReason:
                "classical-grammar-application-request-invalid:issued-authorized-prepared-plan-required",
        }
    );

    const buildDerivedSource = stem =>
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem });
    const evaluateFormation = (
        sourceFrame,
        predicateFormation,
        selections
    ) => {
        const selectedFrame =
            ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
                sourceFrame,
                {
                    predicateFormation,
                    stemFormation: "plain",
                    sentenceType: "statement",
                    polarity: "positive",
                    ...selections,
                }
            );
        const resultFrame =
            ctx.requestClassicalOrdinaryNncResult(
                sourceFrame,
                selectedFrame
            );
        return {
            operationStatus: selectedFrame.authorizationStatus,
            resultStatus: resultFrame.authorizationStatus,
            predicateFormation:
                resultFrame.operationFrame?.predicateFormation || "",
            operation: resultFrame.stemOperation?.operation || "",
            target: resultFrame.stemOperation?.targetStem || "",
            derivation:
                resultFrame.stemOperation?.targetStemDerivation || "",
            formula: resultFrame.formulaRealization,
            written: resultFrame.surfaceRealization,
            storedTargetAuthority:
                resultFrame.stemOperation
                    ?.callerSuppliedTargetStemAuthority,
        };
    };
    const teuc = buildDerivedSource("tēuc");
    const pil = buildDerivedSource("pil");
    const cal = buildDerivedSource("cal");
    const mai = buildDerivedSource("māi");
    s.eq(
        "licensed predicate formations are selected in Grammar and independently realized by the ordinary scalar evaluator",
        [
            evaluateFormation(teuc, "yo-matrix", {
                state: "absolutive",
                subject: "3common",
            }),
            evaluateFormation(pil, "yo-matrix", {
                state: "possessive",
                subject: "1sg",
                possessor: "2sg",
            }),
            evaluateFormation(teuc, "tec-title", {
                state: "possessive",
                subject: "3sg",
                possessor: "1pl",
            }),
            evaluateFormation(cal, "secondary-general-use", {
                state: "possessive",
                subject: "3sg",
                possessor: "1sg",
                metaphoricalUse: true,
            }),
            evaluateFormation(cal, "analogical-restricted-use", {
                state: "absolutive",
                subject: "3common",
            }),
            evaluateFormation(mai, "tl-2a-to-1a", {
                state: "possessive",
                subject: "3sg",
                possessor: "3sg",
            }),
        ],
        [
            {
                operationStatus: "authorized",
                resultStatus: "authorized",
                predicateFormation: "yo-matrix",
                operation: "yo-matrix",
                target: "tēuc-yō",
                derivation: "canonical-semantic-operation",
                formula: "#0-0(tēuc-yō)tl-0#",
                written: "tēucyōtl",
                storedTargetAuthority: false,
            },
            {
                operationStatus: "authorized",
                resultStatus: "authorized",
                predicateFormation: "yo-matrix",
                operation: "yo-matrix",
                target: "pil-lo",
                derivation: "canonical-semantic-operation",
                formula: "#ni-0+m-o(pil-lo)0-0#",
                written: "nimopillo",
                storedTargetAuthority: false,
            },
            {
                operationStatus: "authorized",
                resultStatus: "authorized",
                predicateFormation: "tec-title",
                operation: "suppletive",
                target: "tēc",
                derivation: "exact-canvas-lexical-option",
                formula: "#0-0+t-o(tēc)0-0#",
                written: "totēc",
                storedTargetAuthority: false,
            },
            {
                operationStatus: "authorized",
                resultStatus: "authorized",
                predicateFormation: "secondary-general-use",
                operation: "secondary-general-use",
                target: "tē-cal",
                derivation: "canonical-semantic-operation",
                formula: "#0-0+n-o(tē-cal)0-0#",
                written: "notēcal",
                storedTargetAuthority: false,
            },
            {
                operationStatus: "authorized",
                resultStatus: "authorized",
                predicateFormation: "analogical-restricted-use",
                operation: "analogical-restricted-use",
                target: "tla-cal",
                derivation: "canonical-semantic-operation",
                formula: "#0-0(tla-cal)li-0#",
                written: "tlacalli",
                storedTargetAuthority: false,
            },
            {
                operationStatus: "authorized",
                resultStatus: "authorized",
                predicateFormation: "tl-2a-to-1a",
                operation: "tl-2a-to-1a",
                target: "mā",
                derivation: "canonical-semantic-operation",
                formula: "#0-0+ī-0(mā)uh-0#",
                written: "īmāuh",
                storedTargetAuthority: false,
            },
        ]
    );

    const pilReduplicationOperation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(pil, {
            state: "possessive",
            subject: "3pl",
            possessor: "1sg",
            possessorReduplication: true,
        });
    const pilReduplicationResult =
        ctx.requestClassicalOrdinaryNncResult(
            pil,
            pilReduplicationOperation
        );
    const openReduplicationSource =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "xal",
            nounClass: "tli",
        });
    const calReduplicationOperation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(openReduplicationSource, {
            state: "possessive",
            subject: "3pl",
            possessor: "1sg",
            possessorReduplication: true,
        });
    const poisonedCalReduplicationSource =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "cal",
            nounClass: "tli",
            animacy: "animate",
            naturalPossessionPolicy: "ordinary",
            classMembershipOptions: ["tli"],
            stemFormationOptions: ["plain"],
            pluralConnectorOptions: ["t-in", "m-eh"],
            possessorReduplicationOptions: [false, true],
        });
    const poisonedCalReduplicationOperation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
            poisonedCalReduplicationSource,
            {
                state: "possessive",
                subject: "3pl",
                possessor: "1sg",
                possessorReduplication: true,
            }
        );
    const blockedCalReduplicationPlan =
        ctx.prepareClassicalNahuatlOrdinaryNncParadigmPlan(openReduplicationSource, {
            states: ["possessive"],
            subjects: ["3pl"],
            possessors: ["1sg"],
            possessorReduplication: true,
        });
    s.eq(
        "possessor reduplication is a structural choice for every matching possessive plural context",
        {
            pilSourceOptions: pil.possessorReduplicationOptions,
            pilOperationStatus:
                pilReduplicationOperation.authorizationStatus,
            pilResultStatus: pilReduplicationResult.authorizationStatus,
            pilFormula: pilReduplicationResult.formulaRealization,
            pilWritten: pilReduplicationResult.surfaceRealization,
            calSourceOptions: openReduplicationSource.possessorReduplicationOptions,
            calStatus: calReduplicationOperation.authorizationStatus,
            calReason: calReduplicationOperation.blockReason,
            poisonedSourceStatus:
                poisonedCalReduplicationSource.authorizationStatus,
            poisonedSourceReason:
                poisonedCalReduplicationSource.blockReason,
            poisonedStatus:
                poisonedCalReduplicationOperation.authorizationStatus,
            poisonedReason:
                poisonedCalReduplicationOperation.blockReason,
            planStatus: blockedCalReduplicationPlan.authorizationStatus,
            planReason: blockedCalReduplicationPlan.blockReason,
        },
        {
            pilSourceOptions: [false, true],
            pilOperationStatus: "authorized",
            pilResultStatus: "authorized",
            pilFormula: "#0-0+n-o-n-o(pil)hu-ān#",
            pilWritten: "nonopilhuān",
            calSourceOptions: [false],
            calStatus: "authorized",
            calReason: "",
            poisonedSourceStatus: "blocked",
            poisonedSourceReason:
                "ordinary-nnc-source-lexical-facts-are-engine-owned:animacy",
            poisonedStatus: "blocked",
            poisonedReason:
                "issued-authorized-ordinary-nnc-source-required",
            planStatus: "authorized",
            planReason: "",
        }
    );

    const pahSource =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "pah",
        });
    const pahPluralWithoutLexicalConnector =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
            pahSource,
            {
                state: "absolutive",
                subject: "1pl",
            }
        );
    const pahPluralWithInjectedConnector =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
            pahSource,
            {
                state: "absolutive",
                subject: "1pl",
                pluralConnector: "m-eh",
            }
        );
    s.eq(
        "an unattested pah plural connector is absent from the coordinate domain and cannot be caller-authorized",
        {
            lexicalConnectorDomain: pahSource.pluralConnectorOptions,
            missingConnectorStatus:
                pahPluralWithoutLexicalConnector.authorizationStatus,
            missingConnectorReason:
                pahPluralWithoutLexicalConnector.blockReason,
            injectedConnectorStatus:
                pahPluralWithInjectedConnector.authorizationStatus,
            injectedConnectorReason:
                pahPluralWithInjectedConnector.blockReason,
        },
        {
            lexicalConnectorDomain: [],
            missingConnectorStatus: "blocked",
            missingConnectorReason:
                "ordinary-nnc-plural-connector-not-lexically-authorized",
            injectedConnectorStatus: "blocked",
            injectedConnectorReason:
                "ordinary-nnc-operation-derived-facts-are-engine-owned:pluralConnector",
        }
    );

    const tleMaiSource =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "tle-māi",
            embedStem: "tle",
            matrixStem: "māi",
        });
    const tleMaiOperation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
            tleMaiSource,
            {
                state: "absolutive",
                subject: "3common",
                predicateFormation: "yo-matrix",
            }
        );
    const tleMaiResult =
        ctx.requestClassicalOrdinaryNncResult(
            tleMaiSource,
            tleMaiOperation
        );
    const tleMaiMissingConstituents =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "tle-māi",
        });
    const tleMaiMismatchedConstituents =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "tle-māi",
            embedStem: "tle",
            matrixStem: "mā",
        });
    const forgedCompoundCal =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "cal",
            embedStem: "tle",
            matrixStem: "māi",
        });
    s.eq(
        "tle-māi uses exact typed compound Source constituents before the shared yo-matrix scalar evaluator",
        {
            sourceStatus: tleMaiSource.authorizationStatus,
            sourceConstituents: tleMaiSource.sourceConstituents,
            operationStatus: tleMaiOperation.authorizationStatus,
            resultStatus: tleMaiResult.authorizationStatus,
            formula: tleMaiResult.formulaRealization,
            written: tleMaiResult.surfaceRealization,
            missingStatus:
                tleMaiMissingConstituents.authorizationStatus,
            missingReason: tleMaiMissingConstituents.blockReason,
            mismatchStatus:
                tleMaiMismatchedConstituents.authorizationStatus,
            mismatchReason:
                tleMaiMismatchedConstituents.blockReason,
            forgedSimpleStatus: forgedCompoundCal.authorizationStatus,
            forgedSimpleReason: forgedCompoundCal.blockReason,
        },
        {
            sourceStatus: "authorized",
            sourceConstituents: ["tle", "māi"],
            operationStatus: "authorized",
            resultStatus: "authorized",
            formula: "#0-0(tle-mā-yō)tl-0#",
            written: "tlemāyōtl",
            missingStatus: "blocked",
            missingReason:
                "ordinary-nnc-source-constituent-structure-mismatch",
            mismatchStatus: "blocked",
            mismatchReason:
                "ordinary-nnc-source-constituent-structure-mismatch",
            forgedSimpleStatus: "blocked",
            forgedSimpleReason:
                "ordinary-nnc-source-constituent-structure-mismatch",
        }
    );

    const copiedSource = { ...source };
    const copiedOperation = { ...selectedOperation };
    const mismatchedSource =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "mich",
        });
    const blockedMissingLexicalEntry =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "not-an-attested-nounstem",
        });
    const blockedInjectedAnswer =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
            state: "absolutive",
            subject: "1sg",
            lessonNumber: 12,
            formula: "#ni-0(mich)in-0#",
            surface: "nimichin",
        });
    const blockedAbsolutivePossessor =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
            state: "absolutive",
            subject: "1sg",
            possessor: "3sg",
        });
    const blockedTargetStem =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(teuc, {
            state: "possessive",
            subject: "3sg",
            possessor: "1pl",
            predicateFormation: "tec-title",
            targetStem: "FORGED-TARGET",
        });
    const blockedDerivedLexicalFact =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
            state: "absolutive",
            subject: "1sg",
            useShape: "base",
        });

    let hostileGetterCalls = 0;
    const hostileSource = {};
    Object.defineProperty(hostileSource, "stem", {
        enumerable: true,
        get() {
            hostileGetterCalls += 1;
            return "mich";
        },
    });
    Object.defineProperty(hostileSource, "formula", {
        enumerable: true,
        value: "#ni-0(mich)in-0#",
    });
    const blockedAccessorSource =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame(hostileSource);

    s.eq(
        "typed source, lexical authorization, and owner-issued operation identity fail closed",
        {
            copiedSourceAccepted:
                ctx.isClassicalNahuatlOrdinaryNncSourceFrame(copiedSource),
            copiedOperationAccepted:
                ctx.isClassicalNahuatlOrdinaryNncOperationFrame(
                    copiedOperation
                ),
            copiedEvaluationStatus:
                ctx.evaluateClassicalNahuatlOrdinaryNnc(
                    copiedSource,
                    copiedOperation
                ).authorizationStatus,
            mismatchedStatus:
                ctx.evaluateClassicalNahuatlOrdinaryNnc(
                    mismatchedSource,
                    selectedOperation
                ).authorizationStatus,
            missingLexicalEntryStatus:
                blockedMissingLexicalEntry.authorizationStatus,
            missingLexicalEntryReason:
                blockedMissingLexicalEntry.blockReason,
            injectedStatus: blockedInjectedAnswer.authorizationStatus,
            injectedReason: blockedInjectedAnswer.blockReason,
            absolutivePossessorStatus:
                blockedAbsolutivePossessor.authorizationStatus,
            absolutivePossessorReason:
                blockedAbsolutivePossessor.blockReason,
            targetStemStatus: blockedTargetStem.authorizationStatus,
            targetStemReason: blockedTargetStem.blockReason,
            derivedLexicalFactStatus:
                blockedDerivedLexicalFact.authorizationStatus,
            derivedLexicalFactReason:
                blockedDerivedLexicalFact.blockReason,
            accessorStatus: blockedAccessorSource.authorizationStatus,
            accessorReason: blockedAccessorSource.blockReason,
            hostileGetterCalls,
        },
        {
            copiedSourceAccepted: false,
            copiedOperationAccepted: false,
            copiedEvaluationStatus: "blocked",
            mismatchedStatus: "blocked",
            missingLexicalEntryStatus: "blocked",
            missingLexicalEntryReason:
                "lexical-noun-class-selection-required",
            injectedStatus: "blocked",
            injectedReason:
                "ordinary-nnc-operation-forbidden-authority:$.lessonNumber",
            absolutivePossessorStatus: "blocked",
            absolutivePossessorReason:
                "ordinary-nnc-absolutive-state-has-no-possessor-operation",
            targetStemStatus: "blocked",
            targetStemReason:
                "ordinary-nnc-operation-selection-not-recognized:targetStem",
            derivedLexicalFactStatus: "blocked",
            derivedLexicalFactReason:
                "ordinary-nnc-operation-derived-facts-are-engine-owned:useShape",
            accessorStatus: "blocked",
            accessorReason:
                "ordinary-nnc-source-forbidden-authority:$.stem:accessor",
            hostileGetterCalls: 0,
        }
    );

    return s;
}

module.exports = { run };
