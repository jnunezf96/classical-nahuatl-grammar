"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    CLASSICAL_NAHUATL_LESSONS49_50_SOURCE_CLAIMS,
    CLASSICAL_NAHUATL_LESSONS49_50_GCD,
    buildClassicalNahuatlLessons49To50ClosureReport,
} = require("./fixtures/classical_lessons49_50_source_ledger");

const ROOT = path.resolve(__dirname, "..", "..");
const CANVAS_LINES = fs.readFileSync(
    path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
    "utf8"
).split(/\r?\n/u);

function canonicalUnit(ctx, id, surface, features = {}) {
    if (features.unitKind === "particle") {
        const particleId = id.includes("condition")
            ? "l3-in-tla"
            : id.includes("concession")
                ? "l3-ma-zo"
                : "l3-ca";
        return ctx.requestClassicalParticleResult(particleId);
    }
    if (features.futureEmbed) {
        return ctx.requestClassicalLateVncOperation({
            sourceStem: "cochi",
            sourceValence: "intransitive",
            verbClass: "B",
            subject: "3sg",
            mood: "indicative",
            tense: "imperfect",
            derivationType: "direct",
            voice: "active",
            sentenceAntecessive: features.antecessive === true,
            lateOperation: "compound",
            lateVariant: "future-embed",
            compoundMatrixStem: "tla-qui",
        });
    }
    if (features.unitKind === "sentence") {
        const application = ctx.requestClassicalVncApplicationResult({
            sourceStem: "cati",
            verbClass: "B",
            sourceValence: "intransitive",
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            requestedVoice: "active",
        });
        return ctx.requestClassicalVncSentenceResultFrame(application);
    }
    if (
        features.unitKind === "vnc"
        || features.mood
        || features.tense
    ) {
        return ctx.requestClassicalVncApplicationResult({
            sourceStem: "cati",
            verbClass: "B",
            sourceValence: "intransitive",
            subject: "3sg",
            mood: features.mood || "indicative",
            tense:
                features.tense
                || (features.futureEmbed ? "future" : "present"),
            requestedVoice: "active",
            sentenceAntecessive: features.antecessive === true,
        });
    }
    const nnc = ctx.buildClassicalNahuatlAbsolutiveNncFrame(surface, {
        subject: "3sg",
        nounClass: "zero",
        animacy: "animate",
    });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        outputKind: "scalar",
        args: [
            nnc.nncSlotFrame,
            {
                sentenceType: "assertion",
                polarity: "positive",
            },
        ],
    });
    return receipt.canonicalResult;
}

function canonicalPlace(ctx) {
    return ctx.requestClassicalPlaceGentilicResult({
        constructionKind: "place-name",
        formation: "co",
        source: { embedStem: "Tlach" },
        usage: "adverbial",
    });
}

function canonicalAdverbial(ctx, stem) {
    const potential = ctx.resolveClassicalNahuatlAdverbialPotential({
        stem,
        clauseKind: "vnc",
    });
    return ctx.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: potential,
    });
}

function substantiveCanvasLine(line = "") {
    const value = String(line || "").trim();
    return Boolean(
        value
        && !value.startsWith("## PDF Page")
        && !/^\d+ Lesson (49|50)$/u.test(value)
        && !/^LESSON (49|50)$/u.test(value)
        && !/^Adverbial Modification \(Part (One|Two|Tivo)\)/u.test(value)
    );
}

function run(ctx) {
    const s = createSuite("classical_lessons49_50_closure");

    s.eq(
        "Lessons 49-50 source ledger closes every substantive Canvas line through one GCD and complete LCM",
        (() => {
            const report = buildClassicalNahuatlLessons49To50ClosureReport();
            const coveredLines = new Set();
            CLASSICAL_NAHUATL_LESSONS49_50_SOURCE_CLAIMS.forEach((entry) => {
                for (
                    let line = entry.transcriptionLineStart;
                    line <= entry.transcriptionLineEnd;
                    line += 1
                ) {
                    coveredLines.add(line);
                }
            });
            const uncoveredLines = [];
            for (let line = report.sourceLineStart; line <= report.sourceLineEnd; line += 1) {
                if (!coveredLines.has(line) && substantiveCanvasLine(CANVAS_LINES[line - 1])) {
                    uncoveredLines.push(line);
                }
            }
            return {
                sourceDocument: report.sourceDocument,
                claimCount: report.claimCount,
                lessonClaimCounts: report.lessonClaimCounts,
                gcd: report.gcd,
                lcmAxisCount: report.lcmAxisCount,
                duplicateClaimIds: report.duplicateClaimIds,
                missingAxes: report.missingAxes,
                nonImplementedClaims: report.nonImplementedClaims,
                authorityLeaks: report.authorityLeaks,
                uncoveredLines,
            };
        })(),
        {
            sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
            claimCount: 39,
            lessonClaimCounts: {
                49: 17,
                50: 22,
            },
            gcd: CLASSICAL_NAHUATL_LESSONS49_50_GCD,
            lcmAxisCount: 131,
            duplicateClaimIds: [],
            missingAxes: [],
            nonImplementedClaims: [],
            authorityLeaks: [],
            uncoveredLines: [],
        }
    );

    s.eq(
        "runtime capability diagnostics use semantic names and never become a lesson-numbered authority lane",
        {
            hasSemanticDowngrade:
                ctx.getAdverbialAdjunctionCapabilityInventory()
                    .some(entry =>
                        entry.id === "time.downgrade-to-multiple-nucleus"
                    ),
            lessonNumberedIds:
                ctx.getAdverbialAdjunctionCapabilityInventory()
                    .map(entry => entry.id)
                    .filter(id => /(?:^|[.-])(49|50)(?:[.-]|$)/u.test(id)),
            allNonSurfaceAuthorizing:
                ctx.getAdverbialAdjunctionCapabilityInventory()
                    .every(entry => entry.authorizesSurfaceSpelling === false),
        },
        {
            hasSemanticDowngrade: true,
            lessonNumberedIds: [],
            allNonSurfaceAuthorizing: true,
        }
    );

    const principal = canonicalUnit(ctx, "principal", "niyawi", {
        unitKind: "vnc",
        mood: "indicative",
        tense: "present",
    });
    const placeModifier = canonicalUnit(ctx, "place-modifier", "nepa", {
        unitKind: "nnc",
    });
    const simple = ctx.evaluateAdverbialAdjunction({
        principalClause: principal,
        adjoinedUnit: placeModifier,
        semanticRelation: "place",
        adverbializationDegree: "first",
        structureKind: "simple",
        adjoinedUnitType: "nnc",
        order: "modifier-head",
        recursion: "none",
        marking: "unmarked",
    });
    s.eq(
        "Lesson 49 simple GCD produces a canonical formula, selected realization, and finite surface",
        {
            ok: simple.ok,
            supported: simple.supported,
            surface: simple.surface,
            profile: simple.ruleProfile,
            resultSurface: simple.grammarFrame.resultFrame.surface,
            formula: simple.grammarFrame.resultFrame.formulaRecord?.formula,
            realization: simple.grammarFrame.resultFrame.formulaRealizationRecord?.surface,
            generationAllowed: simple.grammarFrame.routeContract.generationAllowed,
            newWordGenerationAllowed: simple.newWordGenerationAllowed,
        },
        {
            ok: true,
            supported: true,
            surface: "nepa cati",
            profile: {
                kind: "adverbial-adjunction-rule-profile",
                version: 2,
                relation: "place",
                degree: "first",
                structure: "simple",
                order: "modifier-head",
                recursion: "none",
                marking: "unmarked",
                contrast: "unknown",
                timeProfile: "unknown",
                conditionType: "unknown",
                purposeType: "unknown",
                concessionType: "unknown",
                unitType: "nnc",
                intensifier: false,
                inherentlyInterrogative: false,
                interrogativeForceRetained: false,
                includedInLargerSentence: false,
                conditionalCuePresent: false,
                negative: false,
                principalCorroboratingAdverbial: false,
                reducedCopula: false,
                explicitAdverbialIndicator: false,
            },
            resultSurface: "nepa cati",
            formula: "MARKER? + ADJOINED(CN) + PRINCIPAL(CN)",
            realization: "nepa cati",
            generationAllowed: true,
            newWordGenerationAllowed: false,
        }
    );

    s.eq(
        "raw, stored, formula-display, and surface-display authority cannot enter the canonical GCD",
        (() => {
            const result = ctx.evaluateAdverbialAdjunction({
                principalClause: {
                    result: "stored-principal",
                    formulaEcho: "#display-principal#",
                    surface: "display-principal",
                },
                adjoinedUnit: "display-adjoined",
                semanticRelation: "place",
                adverbializationDegree: "first",
                structureKind: "simple",
                adjoinedUnitType: "nnc",
                order: "modifier-head",
                recursion: "none",
                marking: "unmarked",
                lesson: 49,
            });
            return {
                ok: result.ok,
                surface: result.surface,
                diagnostics: result.diagnostics,
            };
        })(),
        {
            ok: false,
            surface: "",
            diagnostics: [
                "adverbial-adjunction-canonical-principal-result-required",
                "adverbial-adjunction-canonical-adjoined-result-required",
            ],
        }
    );

    const personalNameClause = ctx.buildPersonalNameInnerClauseFrame({
        sourceFamily: "preterit-agentive",
        subjectPrefix: "Ø",
        subjectConnector: "Ø",
        predicateMorphs: ["temō", "Ø"],
        numberPrefix: "c",
        numberSuffix: "Ø",
    });
    const personalNameSource = ctx.buildPersonalNameNncSourceFrame({
        sourceFamily: "preterit-agentive",
        clauses: [personalNameClause],
    });
    const vocativeAgentive = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        source: {
            sourceStage: "preterit-predicate",
            sourceStem: "pix",
            verbClass: "A",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
    const canonicalApplicationSources = [
        {
            id: "grammar:nominal-construction",
            unitType: "nnc",
            surface: "coyōchōca",
            result: ctx.requestClassicalNominalConstructionResult({
                constructionKind: "nominal-embed-vnc",
                source: {
                    embedStem: "coy-ō",
                    embedClass: "zero",
                    matrixStem: "chōca",
                    matrixVerbClass: "A",
                    matrixValence: "intransitive",
                },
                relation: "adverb",
                route: "direct-adverb",
                adverbRole: "compared-manner",
                orientation: "subject",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                voice: "active",
                outputKind: "single",
            }),
        },
        {
            id: "nnc:deverbal-construction",
            unitType: "nnc",
            surface: "pixquē",
            result: ctx.requestClassicalDeverbalNncResult({
                constructionKind: "vocative",
                canonicalNncResult: vocativeAgentive,
            }),
        },
        {
            id: "nnc:adverbial",
            unitType: "nnc",
            surface: "cencah",
            result: canonicalAdverbial(ctx, "cencah"),
        },
        {
            id: "nnc:relational",
            unitType: "nnc",
            surface: "callan",
            result: ctx.requestClassicalRelationalNncResult({
                nounstem: {
                    kind: "classical-nahuatl-nnc-nounstem-request",
                    stemId: "tlan-bottom",
                    operation: "relational-nnc",
                    formation: "option-two",
                    sourceKind: "nounstem",
                    sourceMode: "embed-matrix",
                    sourceStem: "cal",
                    sourceEmbedStem: "cal",
                    sourceMatrixStem: "tlan",
                },
                state: "absolutive",
                subjectMode: "adverbialized",
            }),
        },
        {
            id: "nnc:place-gentilic",
            unitType: "nnc",
            surface: "Tlachco",
            result: canonicalPlace(ctx),
        },
        {
            id: "vnc:denominal",
            unitType: "vnc",
            surface: "tlīlti",
            result: ctx.requestClassicalDenominalVncResult({
                nounStem: "tlīl",
                sourceKind: "nounstem",
                sourceState: "absolutive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                objectPeople: ["3sg", "2sg"],
                outputScope: "single",
                operationId: "inceptive-ti",
            }),
        },
        {
            id: "nnc:personal-name",
            unitType: "nnc",
            surface: "temōc",
            result: ctx.requestClassicalPersonalNameNncResult({
                sourceFrame: personalNameSource,
                outerSubject: "3sg",
            }),
        },
    ];
    s.eq(
        "all surface-bearing grammar-application owners enter adjunction through owner capture, never result shape",
        canonicalApplicationSources.map((entry) => {
            const source = ctx.getCanonicalAdverbialAdjunctionSourceUnit(
                entry.result,
                "adjoined"
            );
            const copied = ctx.getCanonicalAdverbialAdjunctionSourceUnit(
                { ...entry.result },
                "adjoined"
            );
            return {
                id: entry.id,
                source: [
                    source.ok,
                    source.sourceKind,
                    source.unitType,
                    source.surface,
                ],
                copied: [copied.ok, copied.sourceKind, copied.surface],
            };
        }),
        canonicalApplicationSources.map((entry) => ({
            id: entry.id,
            source: [
                true,
                "application-canonical-result",
                entry.unitType,
                entry.surface,
            ],
            copied: [false, "untrusted", ""],
        }))
    );

    s.eq(
        "a mismatched declared unit type and a forged application receipt fail closed",
        (() => {
            const mismatched = ctx.evaluateAdverbialAdjunction({
                principalClause: principal,
                adjoinedUnit: canonicalPlace(ctx),
                semanticRelation: "place",
                adverbializationDegree: "first",
                structureKind: "simple",
                adjoinedUnitType: "vnc",
                order: "modifier-head",
                recursion: "none",
                marking: "unmarked",
            });
            const original = canonicalApplicationSources[0].result;
            const forged = ctx.getCanonicalAdverbialAdjunctionSourceUnit({
                kind: "classical-grammar-application-result",
                version: 1,
                authorizationStatus: "authorized",
                operationId: "grammar:nominal-construction",
                outputKind: "scalar",
                canonicalResult: original,
            }, "adjoined");
            return {
                mismatch: mismatched.diagnostics,
                forged: [forged.ok, forged.sourceKind, forged.surface],
            };
        })(),
        {
            mismatch: [
                "adverbial-adjunction-adjoined-unit-type-does-not-match-canonical-result",
            ],
            forged: [false, "untrusted", ""],
        }
    );

    const innerHead = ctx.evaluateAdverbialAdjunction({
        principalClause: principal,
        adjoinedUnit: canonicalUnit(ctx, "manner", "ihciuhca", { unitKind: "nnc" }),
        semanticRelation: "manner",
        adverbializationDegree: "second",
        structureKind: "simple",
        adjoinedUnitType: "nnc",
        order: "modifier-head",
        recursion: "none",
        marking: "unmarked",
    });
    const recursiveHead = ctx.evaluateAdverbialAdjunction({
        principalClause: innerHead,
        adjoinedUnit: canonicalUnit(ctx, "time", "āxcān", { unitKind: "nnc" }),
        semanticRelation: "time",
        adverbializationDegree: "second",
        structureKind: "complex",
        adjoinedUnitType: "nnc",
        order: "modifier-head",
        recursion: "head",
        marking: "unmarked",
    });
    s.eq(
        "Lesson 49 recursion consumes a prior canonical composition, never a claimed recursion label alone",
        {
            surface: recursiveHead.surface,
            sourceKind: recursiveHead.sourceContract.principal.sourceKind,
            recursion: recursiveHead.ruleProfile.recursion,
            falseHead: ctx.evaluateAdverbialAdjunction({
                principalClause: principal,
                adjoinedUnit: placeModifier,
                semanticRelation: "place",
                adverbializationDegree: "first",
                structureKind: "complex",
                adjoinedUnitType: "nnc",
                order: "modifier-head",
                recursion: "head",
                marking: "unmarked",
            }).diagnostics,
            copiedHead: ctx.evaluateAdverbialAdjunction({
                principalClause: { ...innerHead },
                adjoinedUnit: placeModifier,
                semanticRelation: "place",
                adverbializationDegree: "first",
                structureKind: "complex",
                adjoinedUnitType: "nnc",
                order: "modifier-head",
                recursion: "head",
                marking: "unmarked",
            }).diagnostics,
            copiedFrameHead: ctx.evaluateAdverbialAdjunction({
                principalClause: {
                    ...innerHead,
                    grammarFrame: { ...innerHead.grammarFrame },
                },
                adjoinedUnit: placeModifier,
                semanticRelation: "place",
                adverbializationDegree: "first",
                structureKind: "complex",
                adjoinedUnitType: "nnc",
                order: "modifier-head",
                recursion: "head",
                marking: "unmarked",
            }).diagnostics,
            detachedOwnerFrame: ctx.evaluateAdverbialAdjunction({
                principalClause: innerHead.grammarFrame,
                adjoinedUnit: placeModifier,
                semanticRelation: "place",
                adverbializationDegree: "first",
                structureKind: "complex",
                adjoinedUnitType: "nnc",
                order: "modifier-head",
                recursion: "head",
                marking: "unmarked",
            }).diagnostics,
        },
        {
            surface: "āxcān ihciuhca cati",
            sourceKind: "composition-ast",
            recursion: "head",
            falseHead: ["adverbial-adjunction-head-recursion-requires-recursive-head"],
            copiedHead: [
                "adverbial-adjunction-canonical-principal-result-required",
                "adverbial-adjunction-head-recursion-requires-recursive-head",
            ],
            copiedFrameHead: [
                "adverbial-adjunction-canonical-principal-result-required",
                "adverbial-adjunction-head-recursion-requires-recursive-head",
            ],
            detachedOwnerFrame: [
                "adverbial-adjunction-canonical-principal-result-required",
                "adverbial-adjunction-head-recursion-requires-recursive-head",
            ],
        }
    );

    const apposition = ctx.evaluateAdverbialAdjunction({
        principalClause: canonicalUnit(ctx, "general-place", "nepa", { unitKind: "nnc" }),
        adjoinedUnit: canonicalPlace(ctx),
        semanticRelation: "place",
        adverbializationDegree: "second",
        structureKind: "apposition",
        adjoinedUnitType: "nnc",
        order: "appositive-head-modifier",
        recursion: "appositive",
        marking: "unmarked",
    });
    s.eq("Lesson 49 apposition derives general-before-specific order", apposition.surface, "nepa Tlachco");

    const markerInTa = canonicalUnit(ctx, "condition-marker", "in ta", { unitKind: "particle" });
    const openCondition = ctx.evaluateAdverbialAdjunction({
        principalClause: principal,
        adjoinedUnit: canonicalUnit(ctx, "open-condition", "tiwalas", {
            unitKind: "vnc",
            mood: "optative",
            tense: "nonpast",
        }),
        markerUnit: markerInTa,
        semanticRelation: "condition",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "vnc",
        order: "modifier-head",
        recursion: "none",
        marking: "in-tla",
        conditionType: "open",
    });
    s.eq(
        "Lesson 50 open condition composes a canonical marker result without importing a Canvas spelling",
        {
            surface: openCondition.surface,
            markerSource: openCondition.sourceContract.marker.sourceKind,
            profileMarker: openCondition.ruleProfile.marking,
            adjoinedUnitMode:
                openCondition.relationContract.adjoinedUnitMode,
        },
        {
            surface: "in tlā cati cati",
            markerSource: "formula-realization",
            profileMarker: "in-tla",
            adjoinedUnitMode: "nonadverbialized",
        }
    );

    const hypotheticalPrincipal = canonicalUnit(ctx, "hypothetical-principal", "result-principal", {
        unitKind: "vnc",
        mood: "indicative",
        tense: "imperfect",
        futureEmbed: true,
        antecessive: true,
    });
    const hypotheticalAdjoined = canonicalUnit(ctx, "hypothetical-adjoined", "result-adjoined", {
        unitKind: "vnc",
        mood: "optative",
        tense: "past",
        antecessive: true,
    });
    const hypotheticalPast = ctx.evaluateAdverbialAdjunction({
        principalClause: hypotheticalPrincipal,
        adjoinedUnit: hypotheticalAdjoined,
        markerUnit: markerInTa,
        semanticRelation: "condition",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "vnc",
        order: "modifier-head",
        recursion: "none",
        marking: "in-tla",
        conditionType: "hypothetical-past",
    });
    const unmatchedHypothetical = ctx.evaluateAdverbialAdjunction({
        principalClause: hypotheticalPrincipal,
        adjoinedUnit: canonicalUnit(ctx, "unmatched-hypothetical", "unmatched", {
            unitKind: "vnc",
            mood: "optative",
            tense: "past",
            antecessive: false,
        }),
        markerUnit: markerInTa,
        semanticRelation: "condition",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "vnc",
        order: "modifier-head",
        recursion: "none",
        marking: "in-tla",
        conditionType: "hypothetical-past",
    });
    s.eq(
        "Lesson 50 hypothetical past requires past optative, future embed, and matched antecessive scope",
        {
            supported: hypotheticalPast.supported,
            surface: hypotheticalPast.surface,
            blocked: unmatchedHypothetical.diagnostics,
        },
        {
            supported: true,
            surface: "in tlā catini cochizquiya",
            blocked: ["adverbial-adjunction-past-hypothetical-antecessive-must-match"],
        }
    );

    const consequenceAdjoined = canonicalAdverbial(ctx, "iuh");
    const sentenceAdjoined = canonicalUnit(ctx, "sentence", "", {
        unitKind: "sentence",
    });
    const ahzoMarker = ctx.requestClassicalParticleResult("l3-ahzo");
    const relationCases = [
        {
            id: "time",
            request: {
                semanticRelation: "time",
                timeProfile: "explicit",
                explicitAdverbialIndicator: true,
                adjoinedUnitType: "nnc",
            },
            adjoined: placeModifier,
        },
        {
            id: "place",
            request: {
                semanticRelation: "place",
                adjoinedUnitType: "nnc",
            },
            adjoined: placeModifier,
        },
        {
            id: "manner",
            request: {
                semanticRelation: "manner",
                adjoinedUnitType: "nnc",
            },
            adjoined: placeModifier,
        },
        {
            id: "consideration",
            request: {
                semanticRelation: "consideration",
                contrast: "adverbial-modification",
                adjoinedUnitType: "nnc",
            },
            adjoined: placeModifier,
        },
        {
            id: "purpose",
            request: {
                semanticRelation: "purpose",
                purposeType: "unmarked",
                adjoinedUnitType: "vnc",
            },
            adjoined: canonicalUnit(ctx, "purpose-clause", "", {
                unitKind: "vnc",
                mood: "indicative",
                tense: "future",
            }),
        },
        {
            id: "condition",
            request: {
                semanticRelation: "condition",
                conditionType: "open",
                conditionalCuePresent: true,
                adjoinedUnitType: "nnc",
            },
            adjoined: placeModifier,
        },
        {
            id: "concession",
            request: {
                semanticRelation: "concession",
                concessionType: "ma-zo",
                marking: "ma-zo",
                markerUnit: canonicalUnit(ctx, "concession-marker", "ma su", { unitKind: "particle" }),
                adjoinedUnitType: "nnc",
            },
            adjoined: placeModifier,
        },
        {
            id: "consequence",
            request: {
                semanticRelation: "consequence",
                adjoinedUnitType: "nnc",
            },
            adjoined: consequenceAdjoined,
        },
        {
            id: "proviso",
            request: {
                semanticRelation: "proviso",
                marking: "ahzo",
                markerUnit: ahzoMarker,
                adjoinedUnitType: "sentence",
            },
            adjoined: sentenceAdjoined,
        },
        {
            id: "reason",
            request: {
                semanticRelation: "reason",
                marking: "ca",
                markerUnit: canonicalUnit(ctx, "reason-marker", "ka", { unitKind: "particle" }),
                adjoinedUnitType: "sentence",
            },
            adjoined: sentenceAdjoined,
        },
    ];
    s.eq(
        "Lesson 50 LCM executes all ten relation families through the same GCD",
        relationCases.map((entry) => {
            const request = {
                principalClause: principal,
                adjoinedUnit: entry.adjoined,
                adverbializationDegree: "nonadverbialized",
                structureKind: "complex",
                adjoinedUnitType: "clause",
                order: "modifier-head",
                recursion: "none",
                marking: "unmarked",
                ...entry.request,
            };
            const result = ctx.evaluateAdverbialAdjunction(request);
            return {
                id: entry.id,
                ok: result.ok,
                relation: result.ruleProfile.relation,
                formulaId: result.grammarFrame.resultFrame.formulaRecord?.id || "",
            };
        }),
        relationCases.map((entry) => ({
            id: entry.id,
            ok: true,
            relation: entry.id,
            formulaId: `adverbial-adjunction:nonadverbialized:${entry.id}:modifier-head`,
        }))
    );

    const reason = ctx.evaluateAdverbialAdjunction({
        principalClause: principal,
        adjoinedUnit: sentenceAdjoined,
        markerUnit: canonicalUnit(ctx, "ca-marker", "ka", { unitKind: "particle" }),
        semanticRelation: "reason",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "sentence",
        order: "head-modifier",
        recursion: "none",
        marking: "ca",
    });
    s.eq(
        "Lesson 50 reason preserves ca as a principal-clause introducer and translation mirage diagnostic",
        {
            surface: reason.surface,
            caIsConjunction: reason.relationContract.caIsConjunction,
            translationMirage: reason.relationContract.translationMirage,
            diagnostic: reason.diagnostics,
        },
        {
            surface: "cati ca cati",
            caIsConjunction: false,
            translationMirage: true,
            diagnostic: ["adverbial-adjunction-ca-is-not-conjunction"],
        }
    );

    return s;
}

module.exports = { run };
