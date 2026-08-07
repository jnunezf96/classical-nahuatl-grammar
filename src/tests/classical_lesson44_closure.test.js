"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GRAMMAR_SOURCE = fs.readFileSync(
    path.join(ROOT, "src", "core", "classical", "adverbial_nuclear_grammar.mjs"),
    "utf8"
);
const CANVAS_LEDGER_SOURCE = fs.readFileSync(
    path.join(ROOT, "src", "tests", "fixtures", "classical_lesson44_source_ledger.mjs"),
    "utf8"
);

function findAuditCarrier(value, pathName = "frame") {
    if (!value || typeof value !== "object") return "";
    const blocked = new Set([
        "transcriptionLineStart",
        "transcriptionLineEnd",
        "sourceSpan",
        "sourceSpans",
        "claimCount",
        "claimSignature",
        "disposition",
        "dispositionCounts",
        "proofIds",
        "closureReceipt",
    ]);
    for (const [key, item] of Object.entries(value)) {
        const next = `${pathName}.${key}`;
        if (blocked.has(key)) return next;
        const nested = findAuditCarrier(item, next);
        if (nested) return nested;
    }
    return "";
}

function run(ctx) {
    const s = createSuite("classical_lesson44_closure");

    s.eq("Lesson 44 canonical runtime API is installed", [
        typeof ctx.getClassicalNahuatlLcm,
        typeof ctx.listClassicalNahuatlLesson44SourceRecords,
        typeof ctx.resolveClassicalNahuatlAdverbialPotential,
        typeof ctx.evaluateClassicalNahuatlAdverbialNuclear,
        typeof ctx.buildClassicalNahuatlAdverbialNuclearBatchPlan,
        typeof ctx.projectClassicalNahuatlAdverbialNuclearBatchCoordinates,
    ], ["function", "function", "function", "function", "function", "function"]);

    const lcm = ctx.getClassicalNahuatlLcm();
    const records = ctx.listClassicalNahuatlLesson44SourceRecords();
    const recordsById = new Map(records.map(record => [record.id, record]));
    const evaluateAdverbial = (request = {}) => {
        const {
            sourceId = "",
            productiveSource = null,
            ...operation
        } = request;
        const record = recordsById.get(sourceId) || null;
        const preteritAgentiveFrame = productiveSource
            ? ctx.requestClassicalDeverbalNncResult({
                constructionKind: "predicate-nominalization",
                nominalizationKind: "preterit-agentive",
                source: {
                    sourceStem: productiveSource.stem,
                    sourceStage: "preterit-predicate",
                    sourceVoice: "active",
                    sourceValence:
                        productiveSource.valence || "intransitive",
                    sourceObjectPattern:
                        productiveSource.objectPattern || "none",
                    verbClass: productiveSource.verbClass || "A",
                },
                subject: productiveSource.subject || "3sg",
                state: "absolutive",
                animacy: "animate",
            })
            : null;
        const adverbialPotentialFrame =
            ctx.resolveClassicalNahuatlAdverbialPotential({
                stem: record?.sourceForms?.[0] || "",
                clauseKind: record?.clauseKind || "",
                ...(preteritAgentiveFrame
                    ? { preteritAgentiveFrame }
                    : {}),
            });
        const canonicalRequest = {
            adverbialPotentialFrame,
            ...operation,
        };
        try {
            return ctx.requestClassicalAdverbialNncResult(canonicalRequest);
        } catch {
            return ctx.evaluateClassicalNahuatlAdverbialNuclear(
                canonicalRequest
            );
        }
    };
    s.eq("Lesson 44 LCM retains every licensed typed axis and all 98 Canvas source records", {
        gcd: lcm.gcdIdentity,
        sourceClauseKinds: lcm.axes.sourceClauseKinds,
        degrees: lcm.axes.adverbialDegrees,
        families: lcm.axes.constructionFamilies,
        preteritKinds: lcm.axes.preteritAgentiveSourceKinds,
        scopes: lcm.axes.scopes,
        sourceRecordCount: lcm.sourceRecordCount,
        listedRecordCount: records.length,
        familyCounts: lcm.familyCounts,
        complete: lcm.completeLicensedInventory,
    }, {
        gcd: "typed-source-nuclear-clause+adverbial-potential-gate+licensed-degree+adverbialized-subject+predicate-boundary-realization",
        sourceClauseKinds: ["vnc", "nnc-absolutive", "nnc-possessive"],
        degrees: ["first-degree", "second-degree"],
        families: [
            "lexicalized-vnc",
            "first-degree-nnc",
            "second-degree-nnc",
            "particle-looking-nnc",
            "other-absolutive-nnc",
            "preterit-agentive-nnc",
            "possessive-state-nnc",
            "incorporated-adverbial",
        ],
        preteritKinds: [
            "regular-intransitive",
            "obsolete-source",
            "obsolete-root-plus-ya-preterit",
            "root-plus-ya-full-stem",
            "irregular",
            "transitive",
            "reflexive-shuntline",
            "reflexive-mainline-lexicalized",
        ],
        scopes: ["external-clause", "incorporated-predicate"],
        sourceRecordCount: 98,
        listedRecordCount: 98,
        familyCounts: {
            "lexicalized-vnc": 13,
            "first-degree-nnc": 5,
            "second-degree-nnc": 2,
            "particle-looking-nnc": 7,
            "other-absolutive-nnc": 36,
            "preterit-agentive-nnc": 26,
            "possessive-state-nnc": 7,
            "incorporated-adverbial": 2,
        },
        complete: true,
    });
    s.eq(
        "Lesson 44 lexical records carry source forms and typed morph facts, never stored result surfaces",
        {
            everyRecordHasSource:
                records.every(record => record.sourceForms?.length),
            storedCanonicalTargets:
                records.filter(record => Object.hasOwn(
                    record,
                    "canonicalSurface"
                )).length,
            storedFormulaTargets:
                records.filter(record => Object.hasOwn(
                    record,
                    "formulaRealization"
                )).length,
        },
        {
            everyRecordHasSource: true,
            storedCanonicalTargets: 0,
            storedFormulaTargets: 0,
        }
    );
    s.eq("Lesson 44 typed contracts register through the existing adverbial runtime installer", [
        "classical-nahuatl-adverbial-nuclear-lcm",
        "classical-nahuatl-adverbial-potential-frame",
        "classical-nahuatl-adverbialized-subject-operation-frame",
        "classical-nahuatl-adverbial-context-frame",
        "classical-nahuatl-adverbial-nuclear-operation-frame",
        "classical-nahuatl-adverbial-nuclear-result",
        "classical-nahuatl-adverbial-nuclear-batch-plan",
        "classical-nahuatl-adverbial-nuclear-batch-coordinate",
    ].map(contractKind => Boolean(ctx.getGrammarContractDefinition(
        ctx.getDefaultGrammarContractRegistry(),
        contractKind,
        1
    ))), [true, true, true, true, true, true, true, true]);

    const exactWitnesses = [
        ["44.3-cencah", "#Ø-Ø(cen-ca-h)Ø+⎕-Ø#", "cencah", "first-degree"],
        ["44.3-hualcah", "#Ø-Ø+huāl(ca-h)Ø+⎕-Ø#", "huālcah", "first-degree"],
        ["44.3-motquiticah", "#Ø-Ø+m-o(tqui-Ø-ti-ca-h)Ø+Ø-Ø#", "motquiticah", "first-degree"],
        ["44.4-cenyohoal", "#Ø-Ø(cen-yohoa-l)⎕-Ø#", "cenyohoal", "second-degree"],
        ["44.5-quen", "#Ø-Ø(quē-n)Ø-Ø#", "quēn", "second-degree"],
        ["44.7-pacca", "#Ø-Ø(pāc-Ø-cā)⎕-Ø#", "pāccā", "second-degree"],
        ["44.7-nehmatca", "#Ø-Ø(ne-h-mat-Ø-cā)⎕-Ø#", "nehmatcā", "second-degree"],
        ["44.8-iyohca", "#Ø-Ø+i-Ø(yo-h-ca)Ø-Ø#", "īyohca", "first-degree"],
    ];
    s.eq("selected formulas and finite surfaces are rebuilt from typed Lesson 44 records", exactWitnesses.map(([sourceId, formula, surface, degree]) => {
        const frame = evaluateAdverbial({ sourceId });
        return {
            sourceId,
            status: frame.authorizationStatus,
            formulaMatches: frame.formulaRealization === formula,
            surfaceMatches: frame.wordSurface === surface,
            sharedFormulaProjection:
                recordsById.get(sourceId)?.formulaKind === "vnc"
                    ? ctx.renderClassicalNahuatlVncSlotFrameFormula(
                        frame.operationFrame?.typedSlotFrame
                    ) === frame.formulaRealization
                    : ctx.renderClassicalNahuatlNncSlotFrameFormula(
                        frame.operationFrame?.typedSlotFrame
                    ) === frame.formulaRealization,
            degree: frame.operationFrame?.degree,
            degreeMatches: frame.operationFrame?.degree === degree,
            typedPath: Boolean(frame.sourceFrame && frame.operationFrame && frame.operationFrame.subjectOperationFrame),
            selectedResultPath:
                frame.selectedResultId
                    === `${sourceId}:${degree}:external-clause`
                && frame.formulaProjection?.formulaRealization
                    === frame.formulaRealization
                && frame.formulaProjection
                    ?.derivedIndependentlyFromWrittenProjection === true
                && frame.writtenProjection?.wordSurface
                    === frame.wordSurface
                && frame.writtenProjection
                    ?.derivedIndependentlyFromFormulaProjection === true,
            noStringAuthority: frame.formulaStringAuthority === false
                && frame.surfaceStringAuthority === false
                && frame.catalogTargetAuthority === false,
        };
    }), exactWitnesses.map(([sourceId]) => ({
        sourceId,
        status: "authorized",
        formulaMatches: true,
        surfaceMatches: true,
        sharedFormulaProjection: true,
        degree: exactWitnesses.find(item => item[0] === sourceId)[3],
        degreeMatches: true,
        typedPath: true,
        selectedResultPath: true,
        noStringAuthority: true,
    })));

    const externalRecords = records.filter(record => record.externalAllowed);
    const externalFailures = externalRecords.flatMap(record => {
        const frame = evaluateAdverbial({
            sourceId: record.id,
            ...(record.requiredPrecedingParticles.length
                ? { context: { precedingParticle: record.requiredPrecedingParticles[0] } }
                : {}),
        });
        const failed = frame.authorizationStatus !== "authorized"
            || !frame.formulaRealization
            || !frame.wordSurface
            || frame.wordSurface !== record.sourceForms[0]
            || !frame.sourceFrame
            || !frame.operationFrame
            || !frame.operationFrame.subjectOperationFrame
            || (
                record.formulaKind === "vnc"
                    ? ctx.renderClassicalNahuatlVncSlotFrameFormula(
                        frame.operationFrame.typedSlotFrame
                    )
                    : ctx.renderClassicalNahuatlNncSlotFrameFormula(
                        frame.operationFrame.typedSlotFrame
                    )
            ) !== frame.formulaRealization
            || Boolean(findAuditCarrier(frame));
        return failed ? [{ id: record.id, status: frame.authorizationStatus, reason: frame.blockReason }] : [];
    });
    s.eq("every externally licensed Lesson 44 source executes through the typed GCD", externalFailures, []);

    const firstVnc = evaluateAdverbial({
        sourceId: "44.3-ihui",
        degree: "first-degree",
    });
    const secondVnc = evaluateAdverbial({
        sourceId: "44.3-ihui",
        degree: "second-degree",
    });
    const secondPossessive = evaluateAdverbial({
        sourceId: "44.8-iyohca",
        degree: "second-degree",
    });
    s.eq("authorized Lesson 44 scalar and nested operation frames pass registered validation", [
        ctx.isRegisteredGrammarContract(ctx.getDefaultGrammarContractRegistry(), firstVnc),
        ctx.isRegisteredGrammarContract(ctx.getDefaultGrammarContractRegistry(), firstVnc.operationFrame),
        ctx.isRegisteredGrammarContract(
            ctx.getDefaultGrammarContractRegistry(),
            firstVnc.operationFrame.subjectOperationFrame
        ),
        ctx.isRegisteredGrammarContract(ctx.getDefaultGrammarContractRegistry(), lcm),
    ], [true, true, true, true]);
    s.eq("VNC and possessive-state sources enforce first-degree-only restrictions", {
        firstVnc: firstVnc.authorizationStatus,
        secondVnc: [secondVnc.authorizationStatus, secondVnc.blockReason],
        secondPossessive: [secondPossessive.authorizationStatus, secondPossessive.blockReason],
    }, {
        firstVnc: "authorized",
        secondVnc: ["blocked", "adverbial-source-does-not-license-requested-degree"],
        secondPossessive: ["blocked", "adverbial-source-does-not-license-requested-degree"],
    });

    const productive = evaluateAdverbial({
        productiveSource: {
            stem: "pāc",
            valence: "intransitive",
        },
    });
    const ownerPreteritAgentive = ctx.requestClassicalDeverbalNncResult({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        source: {
            sourceStem: "pāc",
            sourceStage: "preterit-predicate",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            verbClass: "A",
        },
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
    const copiedPreteritAgentive = {
        ...ownerPreteritAgentive,
    };
    let copiedPrerequisiteFailure = "";
    try {
        ctx.prepareClassicalAdverbialNncSource({
            preteritAgentiveFrame: copiedPreteritAgentive,
        });
    } catch (error) {
        copiedPrerequisiteFailure = String(error?.message || error);
    }
    const retiredRawSegments = ctx.prepareClassicalAdverbialNncSource({
        clauseKind: "nnc-absolutive",
        predicateSegments: ["pāc", "Ø"],
        sourceKind: "regular-intransitive",
    });
    const wrongPrerequisiteFrame = ctx.requestClassicalDeverbalNncResult({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "active-action",
        source: {
            sourceStem: "pāc",
            sourceStage: "distant-past-predicate",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            verbClass: "A",
        },
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
    });
    const wrongOperation = ctx.prepareClassicalAdverbialNncSource({
        preteritAgentiveFrame: wrongPrerequisiteFrame,
    });
    s.eq("productive preterit-agentive adverbialization consumes only the owner-issued general-use prerequisite", {
        productive: {
            status: productive.authorizationStatus,
            formula: productive.formulaRealization,
            surface: productive.wordSurface,
            sourceKind: productive.operationFrame?.sourceKind,
            prerequisite:
                productive.sourceFrame?.sourceStage,
        },
        copiedRejectedByApplicationFirewall:
            copiedPrerequisiteFailure.startsWith(
                "classical-grammar-application-request-invalid:forbidden-authority:"
            ),
        retiredRaw: [
            retiredRawSegments.authorizationStatus,
            retiredRawSegments.blockReason,
        ],
        wrongOperation: [
            wrongOperation.authorizationStatus,
            wrongOperation.blockReason,
        ],
    }, {
        productive: {
            status: "authorized",
            formula: "#Ø-Ø(pāc-Ø-cā)⎕-Ø#",
            surface: "pāccā",
            sourceKind: "regular-intransitive",
            prerequisite: "preterit-predicate",
        },
        copiedRejectedByApplicationFirewall: true,
        retiredRaw: [
            "blocked",
            "retired-caller-authored-productive-source-rejected:predicateSegments",
        ],
        wrongOperation: [
            "blocked",
            "licensed-preterit-agentive-general-use-prerequisite-required",
        ],
    });

    const productivePotential = ctx.prepareClassicalAdverbialNncSource({
        preteritAgentiveFrame: ownerPreteritAgentive,
    });
    const productivePlan = ctx.prepareClassicalAdverbialNncParadigmPlan({
        adverbialPotentialFrames: [productivePotential],
        scope: "external-clause",
    });
    const productiveCoordinates =
        ctx.projectClassicalAdverbialNncParadigmCoordinates(
            productivePlan
        );
    s.eq("productive preterit-agentive coordinates use the same scalar evaluator pointwise", {
        planStatus: productivePlan.authorizationStatus,
        count: productiveCoordinates.length,
        scalarEquivalent:
            productiveCoordinates.every(row => (
                row.scalarEquivalent === true
                && row.formulaRealization
                    === productive.formulaRealization
                && row.wordSurface === productive.wordSurface
            )),
    }, {
        planStatus: "authorized",
        count: 1,
        scalarEquivalent: true,
    });

    const contextualCases = [
        evaluateAdverbial({
            sourceId: "44.3-iyoh",
            context: { precedingParticle: "zan" },
        }),
        evaluateAdverbial({
            sourceId: "44.5-huel",
            context: { negativeParticle: "ah", negationScope: "adverbial-adjunct" },
        }),
        evaluateAdverbial({
            sourceId: "44.5-mo",
            context: { negativeParticle: "ca", clauseType: "question" },
        }),
        evaluateAdverbial({
            sourceId: "44.5-quen",
            context: { sentencePosition: "noninitial" },
        }),
        evaluateAdverbial({
            sourceId: "44.6-moztla",
            context: { stressPartner: "eh" },
        }),
    ];
    s.eq("Lesson 44 contextual LCM executes required particles, negative scope, interrogative force, and stress partners", contextualCases.map(frame => ({
        status: frame.authorizationStatus,
        word: frame.wordSurface,
        sentence: frame.sentenceSurface,
        polarity: frame.operationFrame?.contextFrame?.semanticPolarity,
        interrogativeForce: frame.operationFrame?.contextFrame?.interrogativeForce,
        negativeImmediatelyPrecedes: frame.operationFrame?.contextFrame?.negativeImmediatelyPrecedes,
        stressPartner: frame.operationFrame?.contextFrame?.stressPartner,
    })), [
        {
            status: "authorized",
            word: "iyoh",
            sentence: "zan iyoh.",
            polarity: "affirmative",
            interrogativeForce: false,
            negativeImmediatelyPrecedes: "",
            stressPartner: "",
        },
        {
            status: "authorized",
            word: "ahhuel",
            sentence: "ahhuel.",
            polarity: "negative",
            interrogativeForce: false,
            negativeImmediatelyPrecedes: "adverbial-adjunct",
            stressPartner: "",
        },
        {
            status: "authorized",
            word: "camō",
            sentence: "camō.",
            polarity: "negative",
            interrogativeForce: "rhetorical",
            negativeImmediatelyPrecedes: "adverbial-adjunct",
            stressPartner: "",
        },
        {
            status: "authorized",
            word: "quēn",
            sentence: "quēn.",
            polarity: "affirmative",
            interrogativeForce: false,
            negativeImmediatelyPrecedes: "",
            stressPartner: "",
        },
        {
            status: "authorized",
            word: "mōztla",
            sentence: "mōztla eh.",
            polarity: "affirmative",
            interrogativeForce: false,
            negativeImmediatelyPrecedes: "",
            stressPartner: "eh",
        },
    ]);
    s.eq("required collocations and unlicensed contextual strings fail closed", [
        evaluateAdverbial({ sourceId: "44.3-iyoh" }).blockReason,
        evaluateAdverbial({
            sourceId: "44.3-iyoh",
            context: { precedingParticle: "oc" },
        }).blockReason,
        evaluateAdverbial({
            sourceId: "44.5-mach",
            context: { stressPartner: "fabricated" },
        }).blockReason,
        evaluateAdverbial({
            sourceId: "44.5-huel",
            context: { negativeParticle: "ca" },
        }).blockReason,
    ], [
        "lesson44-required-preceding-particle-choice-missing-or-invalid",
        "lesson44-required-preceding-particle-choice-missing-or-invalid",
        "lesson44-source-does-not-license-requested-stress-partner",
        "lesson44-source-does-not-license-requested-negative-particle",
    ]);

    const incorporationRequest = sourceId => ({
        sourceId,
        scope: "incorporated-predicate",
        matrix: {
            stem: "huetz",
            verbClass: "A",
            valence: "intransitive",
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            voice: "active",
        },
        outputKind: "single",
    });
    const incorporatedPani = evaluateAdverbial(
        incorporationRequest("44.6-pani")
    );
    const incorporatedNepan = evaluateAdverbial(
        incorporationRequest("44.9-nepan")
    );
    const compoundOnlyExternal = evaluateAdverbial({
        sourceId: "44.9-nepan",
        scope: "external-clause",
    });
    s.eq("Lesson 44 incorporation reuses the canonical nominal-embed VNC path and recomputes boundaries", {
        pani: {
            status: incorporatedPani.authorizationStatus,
            subjectDiscarded: incorporatedPani.operationFrame?.subjectOperationFrame?.subjectDiscarded,
            incorporatedStem: incorporatedPani.operationFrame?.incorporatedStem,
            compoundStem: incorporatedPani.operationFrame?.compoundStem,
            formula: incorporatedPani.formulaRealization,
            surface: incorporatedPani.wordSurface,
            evaluator: incorporatedPani.canonicalTargetEvaluator,
        },
        nepan: {
            status: incorporatedNepan.authorizationStatus,
            compoundStem: incorporatedNepan.operationFrame?.compoundStem,
            formula: incorporatedNepan.formulaRealization,
            surface: incorporatedNepan.wordSurface,
        },
        compoundOnlyExternal: [
            compoundOnlyExternal.authorizationStatus,
            compoundOnlyExternal.blockReason,
        ],
    }, {
        pani: {
            status: "authorized",
            subjectDiscarded: true,
            incorporatedStem: "pan",
            compoundStem: "pan-huetz",
            formula: "#0-0(pan-huetz)0+0-0#",
            surface: "panhuetz",
            evaluator: "grammar:nominal-construction",
        },
        nepan: {
            status: "authorized",
            compoundStem: "ne-pan-huetz",
            formula: "#0-0(ne-pan-huetz)0+0-0#",
            surface: "nepanhuetz",
        },
        compoundOnlyExternal: ["blocked", "adverbial-source-is-compound-only"],
    });

    const hostileRequests = [
        { sourceId: "44.3-cencah", formula: "#POISON#" },
        { sourceId: "44.3-cencah", surface: "poison" },
        { sourceId: "fabricated", sourceGate: "Andrews 44.3", structuredSource: true },
        { sourceId: "fabricated", canvasAnswer: "cencah" },
        { sourceId: "fabricated", lessonMetadata: { lesson: 44 } },
    ];
    s.eq("formula, surface, Canvas answer, lesson, and arbitrary source-gate authority all fail closed",
        hostileRequests.map(request => {
            const frame = evaluateAdverbial(request);
            return {
                status: frame.authorizationStatus,
                callerAccepted: frame.callerSuppliedAuthorityAccepted,
                blockedAsHostile: /caller-supplied-derived-authority-rejected|recognized-lesson44-typed-source-required/u.test(frame.blockReason),
            };
        }),
        hostileRequests.map(() => ({
            status: "blocked",
            callerAccepted: false,
            blockedAsHostile: true,
        })));

    const plan = ctx.prepareClassicalAdverbialNncParadigmPlan({
        scope: "external-clause",
    });
    const coordinates =
        ctx.projectClassicalAdverbialNncParadigmCoordinates(plan);
    const batchFailures = coordinates.flatMap(row => {
        const planned = plan.coordinates.find(
            coordinate => coordinate.coordinateId === row.coordinateId
        );
        const scalar = ctx.requestClassicalAdverbialNncResult({
            adverbialPotentialFrame: planned.adverbialPotentialFrame,
            degree: row.degree,
            scope: row.scope,
            ...(row.context ? { context: row.context } : {}),
        });
        const failed = !row.scalarEquivalent
            || row.authorizationStatus !== scalar.authorizationStatus
            || row.formulaRealization !== (scalar.formulaRealization || "")
            || row.wordSurface !== (scalar.wordSurface || "")
            || Boolean(findAuditCarrier(row));
        return failed ? [{ id: row.lexicalEntryId, row: row.authorizationStatus, scalar: scalar.authorizationStatus }] : [];
    });
    s.eq("complete external batch projection is pointwise identical to scalar evaluation", {
        planStatus: plan.authorizationStatus,
        planCount: plan.coordinateCount,
        coordinateCount: coordinates.length,
        failures: batchFailures,
    }, {
        planStatus: "authorized",
        planCount: 121,
        coordinateCount: 121,
        failures: [],
    });

    let hostileCoordinateFailure = "";
    try {
        ctx.projectClassicalAdverbialNncParadigmCoordinates(plan, [{
            ...plan.coordinates[0],
            resultSurface: "poison",
        }]);
    } catch (error) {
        hostileCoordinateFailure = String(error?.message || error);
    }
    s.eq(
        "batch coordinates cannot inject a result surface",
        hostileCoordinateFailure.startsWith(
            "classical-grammar-application-request-invalid:forbidden-authority:"
        ),
        true
    );

    const copiedFirstVnc = JSON.parse(JSON.stringify(firstVnc));
    s.eq("Lesson 44 owner projects source state and subject operation while blocked and copied frames have no authority", {
        projectionIdentity:
            firstVnc.leastCommonMultiple.projectionIdentity,
        selectedValues:
            firstVnc.leastCommonMultiple.selectedValues,
        ownerSourcePaths:
            firstVnc.leastCommonMultiple.ownerSourcePaths,
        typedProjection:
            firstVnc.leastCommonMultiple.selectedValuesAreTypedProjection,
        originalValid:
            ctx.isClassicalNahuatlAdverbialNuclearResult(firstVnc),
        copiedValid:
            ctx.isClassicalNahuatlAdverbialNuclearResult(copiedFirstVnc),
        blockedHasProjection:
            Object.hasOwn(secondVnc, "leastCommonMultiple"),
    }, {
        projectionIdentity:
            "classical-nahuatl-adverbial-nuclear-owner-selected-lcm-projection",
        selectedValues: {
            sourceStates: "verbal",
            subjectOperations: "first-degree-shape-preserved",
        },
        ownerSourcePaths: {
            sourceStates: "sourceFrame.clauseKind",
            subjectOperations:
                "operationFrame.subjectOperationFrame.operationId",
        },
        typedProjection: true,
        originalValid: true,
        copiedValid: false,
        blockedHasProjection: false,
    });

    const iuhPotential = ctx.resolveClassicalNahuatlAdverbialPotential({
        stem: "iuh",
        clauseKind: "vnc",
    });
    const iyohPotential = ctx.resolveClassicalNahuatlAdverbialPotential({
        stem: "iyoh",
        clauseKind: "vnc",
    });
    const huelPotential = ctx.resolveClassicalNahuatlAdverbialPotential({
        stem: "huel",
        clauseKind: "nnc-absolutive",
    });
    const copiedPotential = JSON.parse(JSON.stringify(iuhPotential));
    s.eq("owner-issued lexical potential separates genuine choices from read-only lexical facts", {
        iuhChoices: iuhPotential.genuineChoiceAxes,
        iyohChoices: iyohPotential.genuineChoiceAxes,
        huelChoices: huelPotential.genuineChoiceAxes,
        lexicalFactsReadOnly:
            Boolean(iuhPotential.lexicalFacts)
            && !iuhPotential.genuineChoiceAxes.includes("semantic-domain"),
        originalValid:
            ctx.isClassicalNahuatlAdverbialPotentialFrame(iuhPotential),
        copiedValid:
            ctx.isClassicalNahuatlAdverbialPotentialFrame(copiedPotential),
    }, {
        iuhChoices: ["surface-variant"],
        iyohChoices: ["preceding-particle"],
        huelChoices: ["scope", "negative-particle", "negation-scope"],
        lexicalFactsReadOnly: true,
        originalValid: true,
        copiedValid: false,
    });

    s.ok("source spans and dispositions remain test-only",
        !GRAMMAR_SOURCE.includes("transcriptionLineStart")
        && !GRAMMAR_SOURCE.includes("transcriptionLineEnd")
        && !GRAMMAR_SOURCE.includes("dispositionCounts")
        && CANVAS_LEDGER_SOURCE.includes("transcriptionLineStart")
        && CANVAS_LEDGER_SOURCE.includes("disposition"));

    return s;
}

module.exports = { run };
