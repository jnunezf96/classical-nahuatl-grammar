"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    LESSON56_CLAIMS,
    SECTION_SPANS,
    REQUIRED_RULE_IDS,
    REQUIRED_EXAMPLE_LABELS,
    auditClassicalNahuatlLesson56Canvas,
} = require("./fixtures/classical_lesson56_source_ledger");

function buildClause(ctx, sourceFamily, overrides = {}) {
    return ctx.buildPersonalNameInnerClauseFrame({
        sourceFamily,
        subjectPrefix: "Ø",
        subjectConnector: "Ø",
        predicateMorphs: ["temō", "Ø"],
        numberPrefix: "c",
        numberSuffix: "Ø",
        ...overrides,
    });
}

function buildSource(ctx, sourceFamily, overrides = {}) {
    const spec = ctx.getPersonalNameNncLcm().sourceFamilies
        .find((entry) => entry.id === sourceFamily);
    const clauseCount = spec.minClauses;
    const clauses = Array.from({ length: clauseCount }, () => buildClause(ctx, sourceFamily));
    return ctx.buildPersonalNameNncSourceFrame({
        sourceFamily,
        clauses,
        ...overrides,
    });
}

function run(ctx) {
    const s = createSuite("nnc_names");

    s.eq(
        "Lesson 56 canonical API exports GCD, LCM, scalar, paradigm, and sentence operations",
        [
            "buildPersonalNameInnerClauseFrame",
            "isPersonalNameInnerClauseFrame",
            "buildPersonalNameNncSourceFrame",
            "isPersonalNameNncSourceFrame",
            "buildPersonalNameNncOperationFrame",
            "evaluatePersonalNameNnc",
            "preparePersonalNameNncParadigmPlan",
            "isPersonalNameNncParadigmPlan",
            "projectPersonalNameNncParadigmCoordinates",
            "evaluatePersonalNameSentenceOperation",
            "getPersonalNameNncGcd",
            "getPersonalNameNncLcm",
        ].map((name) => typeof ctx[name]),
        Array(12).fill("function")
    );

    const exactNncSource =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "xōchi",
            sourceClass: "zero",
        });
    const exactNncOperation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
            exactNncSource,
            { state: "absolutive", subject: "3sg" },
        );
    const exactNncResult = ctx.requestClassicalOrdinaryNncResult(
        exactNncSource,
        exactNncOperation,
    );
    const exactNncName = ctx.evaluatePersonalNameNnc({
        canonicalSourceResult: exactNncResult,
        outerSubject: "2sg",
    });
    const exactVncApplication =
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: "temō",
            verbClass: "A",
            sourceValence: "intransitive",
            subject: "3sg",
            mood: "indicative",
            tense: "preterit",
            requestedDerivation: "direct",
            requestedVoice: "active",
        });
    const exactVncResult = exactVncApplication.resultFrame;
    const exactVncName = ctx.evaluatePersonalNameNnc({
        canonicalSourceResult: exactVncResult,
        sourceFamily: "preterit-agentive",
        outerSubject: "3sg",
    });
    const exactTransitiveVncApplication =
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: "āna",
            verbClass: "A",
            sourceValence: "specific-projective",
            objectPerson: "3sg",
            subject: "1sg",
            mood: "indicative",
            tense: "present",
            requestedDerivation: "direct",
            requestedVoice: "active",
        });
    const exactTransitiveVncName = ctx.evaluatePersonalNameNnc({
        canonicalSourceResult: exactTransitiveVncApplication.resultFrame,
        sourceFamily: "present-agentive",
        outerSubject: "2sg",
    });
    const exactClauseResult =
        ctx.buildClassicalNahuatlVncSentenceResultFrame(
            exactVncApplication,
        );
    const exactClauseName = ctx.evaluatePersonalNameNnc({
        canonicalSourceResult: exactClauseResult,
        sourceFamily: "preterit-agentive",
        outerSubject: "1sg",
    });
    const unresolvedVncFamily = ctx.evaluatePersonalNameNnc({
        canonicalSourceResult: exactVncResult,
        outerSubject: "3sg",
    });
    const copiedExactName = ctx.evaluatePersonalNameNnc({
        canonicalSourceResult: { ...exactNncResult },
        outerSubject: "2sg",
    });
    const stringExactName = ctx.evaluatePersonalNameNnc({
        canonicalSourceResult: "xōchi",
        outerSubject: "2sg",
    });
    const mixedExactName = ctx.evaluatePersonalNameNnc({
        canonicalSourceResult: exactNncResult,
        sourceFrame: buildSource(ctx, "absolutive-state-nnc"),
        outerSubject: "2sg",
    });
    s.eq("personal-name formation consumes exact NNC, VNC, and clause Results", {
        nnc: [
            exactNncName.authorizationStatus,
            ctx.isPersonalNameNncResult(exactNncName),
            exactNncName.sourceInputMode,
            exactNncName.canonicalSourceResult === exactNncResult,
            exactNncName.exactSourceResolution?.selectedSourceFamily,
            exactNncName.exactSourceResultIdentityPreserved,
        ],
        vnc: [
            exactVncName.authorizationStatus,
            ctx.isPersonalNameNncResult(exactVncName),
            exactVncName.canonicalSourceResult === exactVncResult,
            exactVncName.exactSourceResolution?.sourceUnitKind,
        ],
        clause: [
            exactClauseName.authorizationStatus,
            ctx.isPersonalNameNncResult(exactClauseName),
            exactClauseName.canonicalSourceResult === exactClauseResult,
            exactClauseName.exactSourceResolution?.sourceUnitKind,
        ],
        unresolved: [
            unresolvedVncFamily.authorizationStatus,
            unresolvedVncFamily.blockReason,
        ],
        copied: [
            copiedExactName.authorizationStatus,
            copiedExactName.blockReason,
        ],
        string: [
            stringExactName.authorizationStatus,
            stringExactName.blockReason,
        ],
        mixed: [
            mixedExactName.authorizationStatus,
            mixedExactName.blockReason,
        ],
    }, {
        nnc: [
            "authorized",
            true,
            "exact-owner-issued-vnc-nnc-or-clause-result",
            true,
            "absolutive-state-nnc",
            true,
        ],
        vnc: ["authorized", true, true, "vnc-result"],
        clause: ["authorized", true, true, "clause-result"],
        unresolved: [
            "blocked",
            "personal-name-exact-source-choice-required:source-family",
        ],
        copied: [
            "blocked",
            "exact-owner-issued-vnc-nnc-or-clause-result-required",
        ],
        string: [
            "blocked",
            "exact-owner-issued-vnc-nnc-or-clause-result-required",
        ],
        mixed: [
            "blocked",
            "canonical-source-result-and-raw-source-are-mutually-exclusive",
        ],
    });
    s.eq(
        "personal-name formation derives its functional slots while preserving an exact transitive VNC Result",
        {
            authorizationStatus:
                exactTransitiveVncName.authorizationStatus,
            exactResultPreserved:
                exactTransitiveVncName.canonicalSourceResult
                    === exactTransitiveVncApplication.resultFrame,
            sourceFamily:
                exactTransitiveVncName.exactSourceResolution
                    ?.selectedSourceFamily,
            formula: exactTransitiveVncName.formulaRealization,
            diagram: {
                status:
                    exactTransitiveVncName.diagrammaticProjection
                        ?.authorizationStatus,
                authority:
                    exactTransitiveVncName.diagrammaticProjection
                        ?.projectionAuthority,
                formula:
                    exactTransitiveVncName.diagrammaticProjection
                        ?.linearFormula,
                rows:
                    exactTransitiveVncName.diagrammaticProjection
                        ?.rows.map(row => [row.role, row.expression]),
            },
        },
        {
            authorizationStatus: "authorized",
            exactResultPreserved: true,
            sourceFamily: "present-agentive",
            formula: "#ti-Ø(Ø-Ø-c-Ø-āna-Ø-c-Ø)Ø-Ø#",
            diagram: {
                status: "authorized",
                authority: "typed-personal-name-slots",
                formula: "#ti-Ø(Ø-Ø-c-Ø-āna-Ø-c-Ø)Ø-Ø#",
                rows: [
                    ["Subject", "#ti-Ø( ... )Ø-Ø#"],
                    [
                        "Personal-name predicate",
                        "(Ø-Ø-c-Ø-āna-Ø-c-Ø)",
                    ],
                ],
            },
        }
    );

    const canvasPath = path.resolve(__dirname, "../../ANDREWS_TRANSCRIPTION_CANVAS.md");
    const sourceAudit = auditClassicalNahuatlLesson56Canvas(fs.readFileSync(canvasPath, "utf8"));
    s.eq(
        "Canvas-only Lesson 56 ledger covers the exact lesson span, every formula-bearing line, rule family, and named witness",
        {
            complete: sourceAudit.complete,
            sourceLineStart: sourceAudit.sourceLineStart,
            sourceLineEnd: sourceAudit.sourceLineEnd,
            sectionSpanCount: sourceAudit.sectionSpanCount,
            ruleCount: sourceAudit.ruleCount,
            claimCount: sourceAudit.claimCount,
            exactClaimCount: sourceAudit.exactClaimCount,
            claimBijectionComplete:
                sourceAudit.claimBijectionComplete,
            invalidClaimSchemaIds:
                sourceAudit.invalidClaimSchemaIds,
            exampleCount: sourceAudit.exampleCount,
            formulaBearingLineCount: sourceAudit.formulaBearingLineCount,
            expectedFormulaBearingLineCount: sourceAudit.expectedFormulaBearingLineCount,
            missingExamples: sourceAudit.missingExamples,
            uncoveredLines: sourceAudit.uncoveredLines,
        },
        {
            complete: true,
            sourceLineStart: 24065,
            sourceLineEnd: 24704,
            sectionSpanCount: SECTION_SPANS.length,
            ruleCount: REQUIRED_RULE_IDS.length,
            claimCount: LESSON56_CLAIMS.length,
            exactClaimCount: LESSON56_CLAIMS.length,
            claimBijectionComplete: true,
            invalidClaimSchemaIds: [],
            exampleCount: REQUIRED_EXAMPLE_LABELS.length,
            formulaBearingLineCount: 133,
            expectedFormulaBearingLineCount: 133,
            missingExamples: [],
            uncoveredLines: [],
        }
    );

    const gcd = ctx.getPersonalNameNncGcd();
    const lcm = ctx.getPersonalNameNncLcm();
    s.eq(
        "Lesson 56 GCD is the ordered two-tier typed operation and the LCM retains every distinction family",
        {
            gcdId: gcd.id,
            stages: gcd.stages,
            fixedOuterNumber: gcd.fixedOuterNumber,
            innerSubjectBarrier: gcd.innerSubjectBarrier,
            sourceFamilyCount: lcm.sourceFamilies.length,
            sentenceOperationCount: lcm.sentenceOperations.length,
            axisCount: lcm.axes.length,
            sourceFamilies: lcm.sourceFamilies.map((entry) => entry.id),
        },
        {
            gcdId: "classical-nahuatl-personal-name-nnc-personal-name-nnc-gcd",
            stages: [
                "validated-typed-source-clause-or-clause-unit",
                "preserve-each-inner-predicate-subject-and-number-dyad",
                "downgrade-the-complete-source-statement-to-nounstem-rank",
                "apply-inner-or-outer-affective-scope-at-the-typed-boundary",
                "place-the-downgraded-source-as-predicate-of-an-absolutive-state-nnc",
                "apply-an-independent-outer-subject-with-fixed-zero-zero-number",
                "realize-classical-transcription-at-typed-boundaries",
                "return-formula-and-finite-surface-from-the-same-typed-slots",
            ],
            fixedOuterNumber: "Ø-Ø",
            innerSubjectBarrier: true,
            sourceFamilyCount: 20,
            sentenceOperationCount: 8,
            axisCount: 20,
            sourceFamilies: [
                "preterit-agentive",
                "preterit-as-present-agentive",
                "present-agentive",
                "customary-present-agentive",
                "purposive-past-agentive",
                "reflexive-preterit-agentive",
                "passive-preterit-patientive",
                "impersonal-preterit-agentive",
                "absolutive-state-nnc",
                "absolutive-state-truncated-inner-number",
                "possessive-state-nnc",
                "subject-supplementation",
                "possessor-supplementation",
                "adjectival-modification",
                "adverbial-modification",
                "calendar-double-nucleus",
                "calendar-single-nucleus",
                "calendar-day-sign",
                "calendar-personalizing-thing",
                "conjunctorless-personal-name-unit",
            ],
        }
    );

    const temocClause = buildClause(ctx, "preterit-agentive", {
        predicateMorphs: ["Temō", "Ø"],
    });
    const temocSource = ctx.buildPersonalNameNncSourceFrame({
        sourceFamily: "preterit-agentive",
        clauses: [temocClause],
    });
    const copiedTemocClause = { ...temocClause };
    const descriptorCopiedTemocClause = Object.defineProperties(
        {},
        Object.getOwnPropertyDescriptors(temocClause)
    );
    const copiedTemocSource = { ...temocSource };
    const descriptorCopiedTemocSource = Object.defineProperties(
        {},
        Object.getOwnPropertyDescriptors(temocSource)
    );
    s.eq(
        "PersonalName Source authority is owner-issued identity; spread and descriptor copies fail closed",
        {
            issuedClause: ctx.isPersonalNameInnerClauseFrame(temocClause),
            spreadClause:
                ctx.isPersonalNameInnerClauseFrame(copiedTemocClause),
            descriptorClause:
                ctx.isPersonalNameInnerClauseFrame(
                    descriptorCopiedTemocClause
                ),
            issuedSource: ctx.isPersonalNameNncSourceFrame(temocSource),
            spreadSource:
                ctx.isPersonalNameNncSourceFrame(copiedTemocSource),
            descriptorSource:
                ctx.isPersonalNameNncSourceFrame(
                    descriptorCopiedTemocSource
                ),
            sourceWithCopiedClause:
                ctx.buildPersonalNameNncSourceFrame({
                    sourceFamily: "preterit-agentive",
                    clauses: [copiedTemocClause],
                }),
            sourceWithDescriptorClause:
                ctx.buildPersonalNameNncSourceFrame({
                    sourceFamily: "preterit-agentive",
                    clauses: [descriptorCopiedTemocClause],
                }),
        },
        {
            issuedClause: true,
            spreadClause: false,
            descriptorClause: false,
            issuedSource: true,
            spreadSource: false,
            descriptorSource: false,
            sourceWithCopiedClause: null,
            sourceWithDescriptorClause: null,
        }
    );
    const temoc = ctx.evaluatePersonalNameNnc({ sourceFrame: temocSource, outerSubject: "2sg" });
    s.eq(
        "single-clause preterit-agentive source executes the GCD and retains both subjects and number dyads",
        {
            authorizationStatus: temoc.authorizationStatus,
            sourceFamily: temoc.sourceFamily,
            outerSubject: temoc.outerSubject,
            outerNumberDyad: temoc.outerNumberDyad,
            innerSubjectBarrier: temoc.innerSubjectBarrier,
            quotedPredicate: temoc.quotedPredicate,
            formulaRealization: temoc.formulaRealization,
            hasSurface: Boolean(temoc.surfaceRealization),
            innerSlots:
                temoc.typedSlotFrame.downgradedSource.clauses[0].slots,
            storedSourceProjectionsAbsent:
                !Object.hasOwn(
                    temoc.typedSlotFrame.downgradedSource.clauses[0],
                    "structuralFormula"
                )
                && !Object.hasOwn(
                    temoc.typedSlotFrame.downgradedSource.clauses[0],
                    "surfaceRealization"
                ),
            sourceAuthorityFieldsAbsent: [
                "affectiveScope",
                "affectiveMatrix",
                "innerNumberAdjustment",
                "outerNumberDyad",
                "quotedPredicate",
                "structuralFormula",
                "surfaceRealization",
            ].every(field => !Object.hasOwn(
                temoc.typedSlotFrame.downgradedSource,
                field
            )),
        },
        {
            authorizationStatus: "authorized",
            sourceFamily: "preterit-agentive",
            outerSubject: "2sg",
            outerNumberDyad: { prefix: "Ø", suffix: "Ø" },
            innerSubjectBarrier: true,
            quotedPredicate: true,
            formulaRealization: "#ti-Ø(Ø-Ø-Temō-Ø-c-Ø)Ø-Ø#",
            hasSurface: true,
            innerSlots: {
                innerSubject: {
                    prefix: "Ø",
                    connector: "Ø",
                    reference: "independent-of-outer",
                },
                predicate: { morphs: ["Temō", "Ø"] },
                innerNumber: {
                    prefix: "c",
                    suffix: "Ø",
                    mode: "overt",
                },
            },
            storedSourceProjectionsAbsent: true,
            sourceAuthorityFieldsAbsent: true,
        }
    );

    const namesSourceText = fs.readFileSync(
        path.resolve(__dirname, "../core/nnc/names/names.mjs"),
        "utf8"
    );
    const scalarRealizerSource = namesSourceText.slice(
        namesSourceText.indexOf(
            "function realizePersonalNameNncCoordinate"
        ),
        namesSourceText.indexOf("function isPersonalNameNncResult")
    );
    s.eq(
        "formula and written projections independently consume the same typed slots",
        {
            formula: temoc.formulaProjection,
            written: temoc.writtenProjection,
            flags: [
                temoc.formulaDerivedFromWritten,
                temoc.writtenDerivedFromFormula,
            ],
            storedProjectionReadsAbsent:
                !scalarRealizerSource.includes("clause.structuralFormula")
                && !scalarRealizerSource.includes(
                    "clause.surfaceRealization"
                ),
        },
        {
            formula: {
                kind: "classical-nahuatl-personal-name-formula-projection",
                version: 2,
                sourceKind: "typed-personal-name-slots",
                outerSubject: "2sg",
                clauseProjections: [{
                    innerFormula: "Ø-Ø-Temō-Ø-c-Ø",
                    result: "#ti-Ø(Ø-Ø-Temō-Ø-c-Ø)Ø-Ø#",
                }],
                coordinateFormulas: [
                    "#ti-Ø(Ø-Ø-Temō-Ø-c-Ø)Ø-Ø#",
                ],
                result: "#ti-Ø(Ø-Ø-Temō-Ø-c-Ø)Ø-Ø#",
                derivedFromWrittenProjection: false,
            },
            written: {
                kind: "classical-nahuatl-personal-name-written-projection",
                version: 2,
                sourceKind: "typed-personal-name-slots",
                outerSubject: "2sg",
                clauseProjections: [{ result: "Temōc" }],
                coordinateSurfaces: ["tiTemōc"],
                result: "tiTemōc",
                derivedFromFormulaProjection: false,
            },
            flags: [false, false],
            storedProjectionReadsAbsent: true,
        }
    );

    const honorific = ctx.evaluatePersonalNameNnc({
        sourceFrame: temocSource,
        outerSubject: "2sg",
        affectiveScope: "outer-name",
        affectiveMatrix: "tzin",
    });
    s.eq(
        "outer affective scope embeds the complete inner NNC and cannot contact the inner predicate",
        {
            formula: honorific.formulaRealization,
            operationScope:
                honorific.typedSlotFrame.grammarOperation.affectiveScope,
            operationMatrix:
                honorific.typedSlotFrame.grammarOperation.affectiveMatrix,
            innerNumber: honorific.typedSlotFrame.downgradedSource.clauses[0].slots.innerNumber,
        },
        {
            formula: "#ti-Ø(Ø-Ø-Temō-Ø-c-Ø+tzin)Ø-Ø#",
            operationScope: "outer-name",
            operationMatrix: "tzin",
            innerNumber: { prefix: "c", suffix: "Ø", mode: "overt" },
        }
    );

    const absolutiveAffectiveSource = ctx.buildPersonalNameNncSourceFrame({
        sourceFamily: "absolutive-state-nnc",
        clauses: [buildClause(ctx, "absolutive-state-nnc", {
            predicateMorphs: ["Yaō", "tl"],
            numberPrefix: "tl",
            numberSuffix: "Ø",
        })],
    });
    const absolutiveAffective = ctx.evaluatePersonalNameNnc({
        sourceFrame: absolutiveAffectiveSource,
        outerSubject: "2sg",
        affectiveScope: "outer-name",
        affectiveMatrix: "tzin",
    });
    const generalUse = ctx.evaluatePersonalNameNnc({
        sourceFrame: temocSource,
        outerSubject: "2sg",
        affectiveScope: "general-use-agentive",
        affectiveMatrix: "tzin",
    });
    const innerAffectiveSource = ctx.buildPersonalNameNncSourceFrame({
        sourceFamily: "absolutive-state-nnc",
        clauses: [buildClause(ctx, "absolutive-state-nnc", {
            predicateMorphs: ["Xoco"],
            numberPrefix: "Ø",
            numberSuffix: "Ø",
        })],
    });
    const innerAffective = ctx.evaluatePersonalNameNnc({
        sourceFrame: innerAffectiveSource,
        outerSubject: "2sg",
        affectiveScope: "inner-source",
        affectiveMatrix: "tzin",
    });
    s.eq(
        "affective LCM distinguishes inner source, outer forced-zero, and general-use agentive formation",
        {
            innerFormula: innerAffective.formulaRealization,
            innerSurface: innerAffective.surfaceRealization,
            outerForcedFormula: absolutiveAffective.formulaRealization,
            outerAdjustment: absolutiveAffective.innerNumberAdjustment,
            outerInnerNumber: absolutiveAffectiveSource.clauses[0].slots.innerNumber,
            generalUseFormula: generalUse.formulaRealization,
            generalUseScope: generalUse.affectiveScope,
        },
        {
            innerFormula: "#ti-Ø(Ø-Ø-Xoco-tzin-Ø-Ø)Ø-Ø#",
            innerSurface: "tiXocotzin",
            outerForcedFormula: "#ti-Ø(Ø-Ø-Yaō-tl-Ø-Ø+tzin)Ø-Ø#",
            outerAdjustment: "outer-affective-forced-zero",
            outerInnerNumber: { prefix: "tl", suffix: "Ø", mode: "overt" },
            generalUseFormula: "#ti-Ø(Ø-Ø-Temō-Ø-cā-tzin-Ø-Ø)Ø-Ø#",
            generalUseScope: "general-use-agentive",
        }
    );

    const adjectivalAffectiveSource =
        ctx.buildPersonalNameNncSourceFrame({
            sourceFamily: "adjectival-modification",
            clauses: [
                buildClause(ctx, "adjectival-modification", {
                    predicateMorphs: ["Huē", "i"],
                    numberPrefix: "Ø",
                    numberSuffix: "Ø",
                }),
                buildClause(ctx, "adjectival-modification", {
                    predicateMorphs: ["ozomah"],
                    numberPrefix: "tli",
                    numberSuffix: "Ø",
                }),
            ],
            modificationAmbiguity:
                "also-subject-supplementation",
        });
    const adjectivalAffective = ctx.evaluatePersonalNameNnc({
        sourceFrame: adjectivalAffectiveSource,
        outerSubject: "2sg",
        affectiveScope: "outer-name",
        affectiveMatrix: "tzin",
    });
    s.eq(
        "an outer affective embeds an entire adjectival-modification source but truncates only its final inner number dyad",
        {
            formula: adjectivalAffective.formulaRealization,
            surface: adjectivalAffective.surfaceRealization,
            adjustment:
                adjectivalAffective.innerNumberAdjustment,
            adjustedClauseIndexes:
                adjectivalAffective
                    .innerNumberAdjustmentClauseIndexes,
            sourceNumbers:
                adjectivalAffectiveSource.clauses.map(
                    clause => clause.slots.innerNumber
                ),
        },
        {
            formula:
                "#ti-Ø(Ø-Ø-Huē-i-Ø-Ø+Ø-Ø-ozomah-Ø-Ø+tzin)Ø-Ø#",
            surface: "tiHuēiozomahtzin",
            adjustment: "outer-affective-forced-zero",
            adjustedClauseIndexes: [1],
            sourceNumbers: [
                { prefix: "Ø", suffix: "Ø", mode: "zero" },
                { prefix: "tli", suffix: "Ø", mode: "overt" },
            ],
        }
    );

    s.eq(
        "source-family lexical and derived facts reject contradictory caller claims",
        {
            passiveAsActive: buildClause(
                ctx,
                "passive-preterit-patientive",
                { sourceVoice: "active" }
            ),
            impersonalAsActive: buildClause(
                ctx,
                "impersonal-preterit-agentive",
                { sourceVoice: "active" }
            ),
            reflexiveWithoutInnerController: buildClause(
                ctx,
                "reflexive-preterit-agentive",
                { reflexiveController: "none" }
            ),
            wrongNominalization: buildClause(
                ctx,
                "present-agentive",
                { nominalization: "preterit-agentive" }
            ),
            invalidReferent: ctx.buildPersonalNameNncSourceFrame({
                sourceFamily: "preterit-agentive",
                clauses: [temocClause],
                referentKind: "stored-answer",
            }),
            invalidRelation: ctx.buildPersonalNameNncSourceFrame({
                sourceFamily: "preterit-agentive",
                clauses: [temocClause],
                relationKind: "documentary-example",
            }),
            sourceCarriedAffective: ctx.buildPersonalNameNncSourceFrame({
                sourceFamily: "preterit-agentive",
                clauses: [temocClause],
                affectiveScope: "outer-name",
                affectiveMatrix: "tzin",
            }),
            hostileSubjectPrefix:
                ctx.buildPersonalNameInnerClauseFrame({
                    sourceFamily: "preterit-agentive",
                    subjectPrefix: "ATTACKER",
                    subjectConnector: "Ø",
                    subjectReference: "independent-of-outer",
                    predicateMorphs: ["temō", "Ø"],
                    numberPrefix: "c",
                    numberSuffix: "Ø",
                }),
            hostileSubjectConnector:
                ctx.buildPersonalNameInnerClauseFrame({
                    sourceFamily: "preterit-agentive",
                    subjectPrefix: "Ø",
                    subjectConnector: "X",
                    subjectReference: "independent-of-outer",
                    predicateMorphs: ["temō", "Ø"],
                    numberPrefix: "c",
                    numberSuffix: "Ø",
                }),
            hostileNumberMorphs:
                ctx.buildPersonalNameInnerClauseFrame({
                    sourceFamily: "preterit-agentive",
                    subjectPrefix: "Ø",
                    subjectConnector: "Ø",
                    subjectReference: "independent-of-outer",
                    predicateMorphs: ["temō", "Ø"],
                    numberPrefix: "BAD",
                    numberSuffix: "Y",
                }),
            unlicensedInnerAffective:
                ctx.buildPersonalNameNncOperationFrame(temocSource, {
                    affectiveScope: "inner-source",
                    affectiveMatrix: "tzin",
                }),
        },
        {
            passiveAsActive: null,
            impersonalAsActive: null,
            reflexiveWithoutInnerController: null,
            wrongNominalization: null,
            invalidReferent: null,
            invalidRelation: null,
            sourceCarriedAffective: null,
            hostileSubjectPrefix: null,
            hostileSubjectConnector: null,
            hostileNumberMorphs: null,
            unlicensedInnerAffective: null,
        }
    );

    const familyResults = lcm.sourceFamilies.map((spec) => {
        const source = buildSource(ctx, spec.id);
        const result = ctx.evaluatePersonalNameNnc({ sourceFrame: source, outerSubject: "3sg" });
        return [spec.id, Boolean(source), result.authorizationStatus, Boolean(result.formulaRealization), Boolean(result.surfaceRealization)];
    });
    s.eq(
        "all twenty source families execute through the same canonical operation",
        familyResults,
        lcm.sourceFamilies.map((spec) => [spec.id, true, "authorized", true, true])
    );

    const reflexiveClause = buildClause(ctx, "reflexive-preterit-agentive", {
        predicateMorphs: ["m", "o", "tel", "chiuh", "Ø"],
        numberPrefix: "⎕",
    });
    const reflexiveSource = ctx.buildPersonalNameNncSourceFrame({
        sourceFamily: "reflexive-preterit-agentive",
        clauses: [reflexiveClause],
    });
    const reflexive = ctx.evaluatePersonalNameNnc({ sourceFrame: reflexiveSource, outerSubject: "1sg" });
    s.eq(
        "inner reflexive remains controlled by the sealed inner subject rather than the outer first person",
        {
            outerSubject: reflexive.outerSubject,
            controller: reflexiveSource.clauses[0].reflexiveController,
            formula: reflexive.formulaRealization,
            surface: reflexive.surfaceRealization,
        },
        {
            outerSubject: "1sg",
            controller: "inner-subject",
            formula: "#ni-Ø(Ø-Ø-m-o-tel-chiuh-Ø-Ø-Ø)Ø-Ø#",
            surface: "nimotelchiuh",
        }
    );

    const classicalSpellingClause = buildClause(ctx, "absolutive-state-nnc", {
        predicateMorphs: ["cuauh", "tli"],
        numberPrefix: "Ø",
    });
    const classicalSpellingSource = ctx.buildPersonalNameNncSourceFrame({
        sourceFamily: "absolutive-state-nnc",
        clauses: [classicalSpellingClause],
    });
    const classicalSpelling = ctx.evaluatePersonalNameNnc({
        sourceFrame: classicalSpellingSource,
        outerSubject: "3sg",
    });
    s.eq(
        "Classical personal-name surfaces retain cu/uh and cannot leak literal Modern Nawat w or k",
        {
            surface: classicalSpelling.surfaceRealization,
            containsModernNawatGrapheme: /[wk]/u.test(classicalSpelling.surfaceRealization),
        },
        {
            surface: "cuauhtli",
            containsModernNawatGrapheme: false,
        }
    );

    const adjunctionSource = buildSource(ctx, "subject-supplementation");
    const adjunction = ctx.evaluatePersonalNameNnc({ sourceFrame: adjunctionSource, outerSubject: "1sg" });
    s.eq(
        "adjunction downgrades the whole plus-delimited clause unit under one outer shell",
        {
            formula: adjunction.formulaRealization,
            coordinateCount: adjunction.coordinateParts.length,
            relationKind: adjunctionSource.relationKind,
        },
        {
            formula: "#ni-Ø(Ø-Ø-temō-Ø-c-Ø+Ø-Ø-temō-Ø-c-Ø)Ø-Ø#",
            coordinateCount: 1,
            relationKind: "subject-supplementation",
        }
    );

    const conjunctionSource = buildSource(ctx, "conjunctorless-personal-name-unit");
    const conjunction = ctx.evaluatePersonalNameNnc({ sourceFrame: conjunctionSource, outerSubject: "2sg" });
    s.eq(
        "conjunction preserves one two-tier personal-name shell per conjunct",
        {
            formula: conjunction.formulaRealization,
            coordinateCount: conjunction.coordinateParts.length,
            sourceUnitKind: conjunction.sourceUnitKind,
        },
        {
            formula: "#ti-Ø(Ø-Ø-temō-Ø-c-Ø)Ø-Ø# #ti-Ø(Ø-Ø-temō-Ø-c-Ø)Ø-Ø#",
            coordinateCount: 2,
            sourceUnitKind: "conjunction",
        }
    );

    const plan = ctx.preparePersonalNameNncParadigmPlan({ sourceFrame: temocSource });
    const projected = ctx.projectPersonalNameNncParadigmCoordinates(plan);
    const scalar = ["1sg", "2sg", "3sg"].map((outerSubject) =>
        ctx.evaluatePersonalNameNnc({ sourceFrame: temocSource, outerSubject })
    );
    s.eq(
        "prepared outer-subject paradigm is pointwise identical to scalar generation",
        projected.map((result) => [result.outerSubject, result.formulaRealization, result.surfaceRealization]),
        scalar.map((result) => [result.outerSubject, result.formulaRealization, result.surfaceRealization])
    );
    const applicationScalar = ["1sg", "2sg", "3sg"].map((outerSubject) =>
        ctx.requestClassicalPersonalNameNncResult({
            sourceFrame: temocSource,
            outerSubject,
        })
    );
    const applicationPlan =
        ctx.prepareClassicalPersonalNameNncParadigmPlan({
            sourceFrame: temocSource,
        });
    const applicationProjected =
        ctx.projectClassicalPersonalNameNncParadigmCoordinates(
            applicationPlan
        );
    s.eq(
        "one owner-issued public application plan projects a pointwise-identical complete subject paradigm",
        {
            planValid: ctx.isPersonalNameNncParadigmPlan(applicationPlan),
            preparedOnce: applicationPlan.preparedOnce,
            projected: applicationProjected.map((result) => [
                result.outerSubject,
                result.formulaRealization,
                result.surfaceRealization,
            ]),
            scalar: applicationScalar.map((result) => [
                result.outerSubject,
                result.formulaRealization,
                result.surfaceRealization,
            ]),
        },
        {
            planValid: true,
            preparedOnce: true,
            projected: [
                [
                    "1sg",
                    "#ni-Ø(Ø-Ø-Temō-Ø-c-Ø)Ø-Ø#",
                    "niTemōc",
                ],
                [
                    "2sg",
                    "#ti-Ø(Ø-Ø-Temō-Ø-c-Ø)Ø-Ø#",
                    "tiTemōc",
                ],
                [
                    "3sg",
                    "#Ø-Ø(Ø-Ø-Temō-Ø-c-Ø)Ø-Ø#",
                    "Temōc",
                ],
            ],
            scalar: [
                [
                    "1sg",
                    "#ni-Ø(Ø-Ø-Temō-Ø-c-Ø)Ø-Ø#",
                    "niTemōc",
                ],
                [
                    "2sg",
                    "#ti-Ø(Ø-Ø-Temō-Ø-c-Ø)Ø-Ø#",
                    "tiTemōc",
                ],
                [
                    "3sg",
                    "#Ø-Ø(Ø-Ø-Temō-Ø-c-Ø)Ø-Ø#",
                    "Temōc",
                ],
            ],
        }
    );

    const godSource = ctx.buildPersonalNameNncSourceFrame({
        sourceFamily: "absolutive-state-nnc",
        clauses: [buildClause(ctx, "absolutive-state-nnc", { predicateMorphs: ["Xip", "e"], numberPrefix: "⎕" })],
        referentKind: "god",
    });
    const godName = ctx.evaluatePersonalNameNnc({ sourceFrame: godSource, outerSubject: "3sg" });
    const sentenceOperations = lcm.sentenceOperations.map((spec) =>
        ctx.evaluatePersonalNameSentenceOperation({
            personalNameResult: spec.id.startsWith("god-name-") ? godName : temoc,
            operation: spec.id,
            locativeMatrix: spec.id === "god-name-to-place-name-embed" ? "tlā-n" : "",
            ordinaryNncSubject: spec.id === "god-name-to-normal-nnc" ? "3pl" : "",
        })
    );
    s.eq(
        "all Lesson 56.5 sentence, scope, downgrade, and place-embed operations are typed and reachable",
        sentenceOperations.map((frame) => [frame.operation, frame.authorizationStatus, frame.outputKind]),
        lcm.sentenceOperations.map((spec) => [spec.id, "authorized", spec.outputKind])
    );

    const eachConjunctOperation = sentenceOperations.find(
        frame => frame.operation === "adjunctor-before-each-conjunct"
    );
    const normalNncOperation = sentenceOperations.find(
        frame => frame.operation === "god-name-to-normal-nnc"
    );
    const selectedProjectionValues = Object.assign(
        {},
        temoc.leastCommonMultiple.selectedValues,
        conjunction.leastCommonMultiple.selectedValues,
        eachConjunctOperation.leastCommonMultiple.selectedValues,
        normalNncOperation.leastCommonMultiple.selectedValues
    );
    const blockedNameResult = ctx.evaluatePersonalNameNnc({
        sourceFrame: { ...temocSource },
        outerSubject: "2sg",
    });
    s.eq(
        "Lesson 56 owners project selected Source, Grammar, and Result axes while copied or blocked results have no authority",
        {
            selectedValues: selectedProjectionValues,
            typedProjections: [
                temoc,
                conjunction,
                eachConjunctOperation,
                normalNncOperation,
            ].every(frame =>
                frame.leastCommonMultiple.selectedValuesAreTypedProjection
                && Object.isFrozen(frame.leastCommonMultiple)),
            originalNameValid: ctx.isPersonalNameNncResult(temoc),
            copiedNameValid: ctx.isPersonalNameNncResult(
                JSON.parse(JSON.stringify(temoc))
            ),
            originalSentenceValid:
                ctx.isPersonalNameSentenceOperation(eachConjunctOperation)
                && ctx.isPersonalNameSentenceOperation(normalNncOperation),
            copiedSentenceValid: ctx.isPersonalNameSentenceOperation(
                JSON.parse(JSON.stringify(eachConjunctOperation))
            ),
            blockedHasProjection: Object.hasOwn(
                blockedNameResult,
                "leastCommonMultiple"
            ),
        },
        {
            selectedValues: {
                "affective-scope": "none",
                "affective-matrix": "none",
                "outer-subject": "2sg",
                "outer-number": "zero-zero",
                "translation-register": "strict-called-quoted-clause",
                "conjunction-analysis": "two-tier-conjoined-name-unit",
                "adjunctor-scope": "each-conjunct",
                "god-name-reranking": "normal-nnc-with-plural-rights",
            },
            typedProjections: true,
            originalNameValid: true,
            copiedNameValid: false,
            originalSentenceValid: true,
            copiedSentenceValid: false,
            blockedHasProjection: false,
        }
    );

    const operation = ctx.buildPersonalNameNncOperationFrame(temocSource);
    const registry = ctx.getDefaultGrammarContractRegistry();
    const registeredFrames = [
        temocClause,
        temocSource,
        operation,
        temoc,
        plan,
        sentenceOperations[0],
    ];
    s.eq(
        "all six Lesson 56 runtime frame kinds are registered and validate",
        registeredFrames.map((frame) => {
            const report = ctx.inspectRegisteredGrammarContract(registry, frame);
            return [frame.kind, frame.version, report.ok, report.errors];
        }),
        registeredFrames.map((frame) => [frame.kind, 2, true, []])
    );

    const forgedSource = { ...temocSource };
    const forgedOperation = { ...operation };
    const hostilePlan = ctx.preparePersonalNameNncParadigmPlan({
        sourceFrame: temocSource,
        canvasAnswer: "#FORGED#",
    });
    const hostileCoordinate =
        ctx.projectPersonalNameNncParadigmCoordinates(plan, [{
            outerSubject: "1sg",
            answer: "stored answer",
        }])[0];
    let copiedApplicationPlanFailure = "";
    try {
        const copiedApplicationProjection =
            ctx.projectClassicalPersonalNameNncParadigmCoordinates({
            ...applicationPlan,
        });
        copiedApplicationPlanFailure = copiedApplicationProjection == null
            ? "canonical-null-fail-closed"
            : "copied-plan-unexpectedly-returned";
    } catch (error) {
        copiedApplicationPlanFailure =
            String(error?.message || error);
    }
    s.eq(
        "forged frames, formula strings, surfaces, stored answers, target segments, and hostile paradigm carriers fail closed",
        {
            forgedSource: ctx.evaluatePersonalNameNnc({ sourceFrame: forgedSource, outerSubject: "2sg" }).blockReason,
            forgedOperationMismatch: ctx.getPersonalNameNncOperationFrameMismatch({ sourceFrame: temocSource, operationFrame: forgedOperation }),
            formula: ctx.evaluatePersonalNameNnc({ sourceFrame: temocSource, outerSubject: "2sg", formula: honorific.formulaRealization }).blockReason,
            surface: ctx.evaluatePersonalNameNnc({ sourceFrame: temocSource, outerSubject: "2sg", surface: honorific.surfaceRealization }).blockReason,
            storedAnswer: ctx.evaluatePersonalNameNnc({ sourceFrame: temocSource, outerSubject: "2sg", answer: honorific }).blockReason,
            targetSegments: ctx.evaluatePersonalNameNnc({ sourceFrame: temocSource, outerSubject: "2sg", targetSegments: [{ surface: "poison" }] }).blockReason,
            hostilePlan: [
                hostilePlan.authorizationStatus,
                hostilePlan.blockReason,
            ],
            hostileCoordinate: [
                hostileCoordinate.authorizationStatus,
                hostileCoordinate.blockReason,
                hostileCoordinate.formulaRealization,
                hostileCoordinate.surfaceRealization,
            ],
            copiedApplicationPlanFailure,
            falsePositiveApi: typeof ctx.classifyPersonalNameNncFalsePositive,
        },
        {
            forgedSource: "issued-operation-required",
            forgedOperationMismatch: "operation-frame-required",
            formula: "caller-authority-rejected:request.formula",
            surface: "caller-authority-rejected:request.surface",
            storedAnswer: "caller-authority-rejected:request.answer",
            targetSegments: "caller-authority-rejected:request.targetSegments",
            hostilePlan: [
                "blocked",
                "caller-authority-rejected:request.canvasAnswer",
            ],
            hostileCoordinate: [
                "blocked",
                "caller-authority-rejected:coordinate.answer",
                "",
                "",
            ],
            copiedApplicationPlanFailure: "canonical-null-fail-closed",
            falsePositiveApi: "undefined",
        }
    );

    const boundary = ctx.buildPersonalNameNncBoundaryMetadata();

    const shellSource = fs.readFileSync(
        path.resolve(__dirname, "../ui/shell/classical_shell.mjs"),
        "utf8"
    );
    const renderingSource = fs.readFileSync(
        path.resolve(__dirname, "../ui/rendering/rendering.mjs"),
        "utf8"
    );
    const applicationSource = fs.readFileSync(
        path.resolve(
            __dirname,
            "../application/classical/grammar_application.mjs"
        ),
        "utf8"
    );
    const stateSource = fs.readFileSync(
        path.resolve(__dirname, "../ui/state.mjs"),
        "utf8"
    );
    const personalNameFamilyControlSource =
        shellSource.match(
            /id="classical-personal-name-source-family"[\s\S]*?<\/select>/u
        )?.[0] || "";
    s.eq(
        "the shared construction workflow reaches the typed personal-name owner without a lesson lane or raw result authority",
        {
            hasReadOnlyPanel: shellSource.includes('id="classical-lesson56-grammar-readout"')
                && shellSource.includes('data-classical-source-authorizes="none"'),
            consumesCanonicalGcd: renderingSource.includes("targetObject.getPersonalNameNncGcd"),
            consumesCanonicalLcm: renderingSource.includes("targetObject.getPersonalNameNncLcm"),
            operationChoice: /<option value="personal-name-nnc"[^>]*>/u.test(
                shellSource
            ),
            sourceFamilyChoiceCount: (
                personalNameFamilyControlSource.match(
                    /<option value="/gu
                ) || []
            ).length,
            rawFunctionalMorphControlsAbsent: ![
                "classical-personal-name-inner-subject-prefix-1",
                "classical-personal-name-inner-subject-connector-1",
                "classical-personal-name-inner-subject-reference-1",
                "classical-personal-name-inner-number-prefix-1",
                "classical-personal-name-inner-number-suffix-1",
                "classical-personal-name-inner-subject-prefix-2",
                "classical-personal-name-inner-number-prefix-2",
            ].some(id => shellSource.includes(`id="${id}"`)),
            grammarChoices: [
                "classical-personal-name-affective-scope",
                "classical-personal-name-affective-matrix",
            ].every(id => shellSource.includes(`id="${id}"`)),
            issuesTypedSource:
                renderingSource.includes(
                    "targetObject.buildPersonalNameInnerClauseFrame"
                )
                && renderingSource.includes(
                    "getPersonalNameNncInnerClauseFunctionalSlotDefaults"
                )
                && renderingSource.includes(
                    "targetObject.buildPersonalNameNncSourceFrame"
                ),
            scalarOwner:
                renderingSource.includes(
                    "targetObject.requestClassicalPersonalNameNncResult(request)"
                ),
            paradigmOwner:
                renderingSource.includes(
                    ".prepareClassicalPersonalNameNncParadigmPlan"
                )
                && renderingSource.includes(
                    ".projectClassicalPersonalNameNncParadigmCoordinates"
                )
                && applicationSource.includes(
                    '"preparePersonalNameNncParadigmPlan"'
                )
                && applicationSource.includes(
                    '"projectPersonalNameNncParadigmCoordinates"'
                ),
            directEvaluatorAbsent:
                !renderingSource.includes(
                    "targetObject.evaluatePersonalNameNnc("
                ),
            rawSurfaceDisabled: !stateSource.includes(
                "renderPersonalNameEmbeddedNncWorkbenchSurface"
            ) || (
                stateSource.includes(
                    'function renderPersonalNameEmbeddedNncWorkbenchSurface(innerClause = "")'
                )
                && stateSource.includes('void innerClause;\n      return "";')
            ),
        },
        {
            hasReadOnlyPanel: false,
            consumesCanonicalGcd: false,
            consumesCanonicalLcm: false,
            operationChoice: true,
            sourceFamilyChoiceCount: 20,
            rawFunctionalMorphControlsAbsent: true,
            grammarChoices: true,
            issuesTypedSource: true,
            scalarOwner: true,
            paradigmOwner: true,
            directEvaluatorAbsent: true,
            rawSurfaceDisabled: true,
        }
    );

    return s;
}

module.exports = { run };
