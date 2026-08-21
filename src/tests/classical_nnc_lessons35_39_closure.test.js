"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    resolveLegacySupportPath,
} = require("./helpers/legacy_support_path");

const ROOT = path.resolve(__dirname, "..", "..");
const CANVAS_LINES = fs.readFileSync(
    path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
    "utf8"
).split(/\r?\n/u);
const LEDGER = fs.readFileSync(
    resolveLegacySupportPath("docs/LESSONS_35_39_SOURCE_LEDGER.md"),
    "utf8"
);
const PRODUCTION = fs.readFileSync(
    path.join(ROOT, "src", "core", "classical", "nnc_lessons35_39_closure.mjs"),
    "utf8"
);
const SHELL = fs.readFileSync(
    path.join(ROOT, "src", "ui", "shell", "classical_shell.mjs"),
    "utf8"
);
const RENDERING = fs.readFileSync(
    path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
    "utf8"
);
// Required proof families: claim-specific source inventory; positive witnesses;
// negative restrictions; interaction witnesses; hostile authority; scalar and
// paradigm equivalence; registered grammar contracts.

function parseLedgerRows() {
    return LEDGER.split(/\r?\n/u)
        .filter(line => /^\| L(?:35|36|37|38|39)-\d{2} \|/u.test(line))
        .map(line => {
            const fields = line.split("|").map(value => value.trim()).filter(Boolean);
            const [id, span, claim, disposition, family] = fields;
            const [lineStart, lineEnd] = span.split("-").map(Number);
            return {
                id,
                lesson: Number(id.slice(1, 3)),
                lineStart,
                lineEnd,
                claim,
                disposition: disposition.replaceAll("`", ""),
                family: family.replaceAll("`", ""),
            };
        });
}

function predicateRequest(nominalizationKind, overrides = {}) {
    const stages = {
        "preterit-agentive": "preterit-predicate",
        "preterit-patientive": "preterit-predicate",
        "customary-agentive-reanalysis": "customary-present-predicate",
        "customary-agentive-full": "customary-present-predicate",
        "customary-patientive": "customary-present-predicate",
        instrumentive: overrides.state === "possessive"
            ? "imperfect-predicate"
            : "customary-present-predicate",
        "present-agentive": "present-predicate",
        "future-agentive": "future-predicate",
        "passive-action": "distant-past-predicate",
        "active-action": "distant-past-predicate",
    };
    const passive = ["preterit-patientive", "customary-patientive", "passive-action"]
        .includes(nominalizationKind);
    const impersonal = nominalizationKind === "instrumentive" && overrides.state !== "possessive";
    return {
        constructionKind: "predicate-nominalization",
        nominalizationKind,
        source: {
            sourceStage: stages[nominalizationKind],
            sourceStem: nominalizationKind === "preterit-agentive" ? "pix-ca" : "mach-ti",
            verbClass: "A",
            sourceVoice: passive ? "passive" : impersonal ? "impersonal" : "active",
            sourceValence: nominalizationKind === "active-action"
                ? "intransitive"
                : passive
                    ? "single-object"
                    : "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: "3sg",
        state: overrides.state || "absolutive",
        ...overrides,
    };
}

function deverbalRequest(overrides = {}) {
    return {
        constructionKind: "deverbal-action",
        actionKind: "active-action",
        actionSuffix: "liz",
        source: {
            sourceStage: "future-core",
            sourceStem: "chi",
            verbClass: "B",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: "3sg",
        state: "absolutive",
        ...overrides,
    };
}

function withSource(request, overrides = {}) {
    return {
        ...request,
        source: {
            ...(request.source || {}),
            ...overrides,
        },
    };
}

function patientiveRequest(family = "passive-core", overrides = {}) {
    const profile = {
        "passive-core": {
            sourceStage: "nonactive-core",
            sourceStem: "cua-lō",
            sourceVoice: "passive",
            sourceValence: "single-object",
            nonactiveSuffix: "lō",
        },
        "impersonal-core": {
            sourceStage: "nonactive-core",
            sourceStem: "coch-ō",
            sourceVoice: "impersonal",
            sourceValence: "intransitive",
            nonactiveSuffix: "ō",
        },
        "perfective-active-core": {
            sourceStage: "perfective-core",
            sourceStem: "mic",
            sourceVoice: "active",
            sourceValence: "intransitive",
        },
        "imperfective-active-core": {
            sourceStage: "imperfective-core",
            sourceStem: "mictiā",
            sourceVoice: "active",
            sourceValence: "single-object",
        },
        "root-or-stock": {
            sourceStage: "root-or-stock",
            sourceStem: "cual-ā-ni",
            sourceVoice: "active",
            sourceValence: "intransitive",
        },
    }[family];
    return {
        constructionKind: "patientive",
        patientiveSourceFamily: family,
        patientiveAnalogy: "impersonal",
        source: {
            ...profile,
            verbClass: "A",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: "3sg",
        state: "absolutive",
        ...overrides,
    };
}

function exactOrdinaryNnc(ctx, stem = "mahuiz", sourceClass = "tli-1") {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem,
        sourceClass,
    });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: "absolutive",
            subject: "3sg",
            predicateFormation: "source-stem",
            stemFormation: "plain",
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return ctx.requestClassicalOrdinaryNncResult(source, operation);
}

function characteristicRequest(ctx, overrides = {}) {
    return {
        constructionKind: "patientive",
        patientiveKind: "characteristic-property",
        characteristicReading: "inherent-quality",
        canonicalNncResult: exactOrdinaryNnc(ctx),
        subject: "3sg",
        state: "absolutive",
        ...overrides,
    };
}

function exactPassivePatientive(ctx, suffix = "ō") {
    const request = {
        sourceStem: "itta",
        verbClass: "A",
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
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const option = (
        preview.controlFrame?.nonactiveOptionInventory?.options || []
    ).find(item => (
        item.suffixFamily === suffix
        || item.optionId.startsWith(`${suffix}:`)
    ));
    const passive = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        nonactiveOptionId: option?.optionId || "",
    });
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "passive-core",
        canonicalVncResult: passive.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
}

function exactImpersonalPatientive(ctx, overrides = {}) {
    const {
        sourceStem = "cochi",
        verbClass = "B",
        sourceValence = "intransitive",
        objectKind = "none",
        objectPerson = "3sg",
        suffix = "hua",
        subject = "3sg",
        animacy = "nonanimate",
    } = overrides;
    const request = {
        sourceStem,
        verbClass,
        sourceValence,
        subject,
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        voice: "impersonal",
        ...(objectKind === "none" ? {} : {
            objectKind,
            ...(objectKind === "specific-projective" ? { objectPerson } : {}),
        }),
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const option = (
        preview.controlFrame?.nonactiveOptionInventory?.options || []
    ).find(item => (
        item.suffixFamily === suffix
        || item.optionId.startsWith(`${suffix}:`)
    ));
    const impersonal = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        nonactiveOptionId: option?.optionId || "",
    });
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: impersonal.resultFrame,
        subject,
        state: "absolutive",
        animacy,
    });
}

function exactPerfectivePatientive(ctx, overrides = {}) {
    const {
        patientiveAnalogy = "impersonal",
        patientive = {},
        ...vncOverrides
    } = overrides;
    const application = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "miqui",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "preterit",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
        ...vncOverrides,
    });
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "perfective-active-core",
        patientiveAnalogy,
        canonicalVncResult: application.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...patientive,
    });
}

function exactImperfectivePatientive(ctx, overrides = {}) {
    const {
        patientiveAnalogy = "impersonal",
        patientive = {},
        ...vncOverrides
    } = overrides;
    const application = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "cuica",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
        ...vncOverrides,
    });
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "imperfective-active-core",
        patientiveAnalogy,
        canonicalVncResult: application.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...patientive,
    });
}

function ownerhoodRequest(matrix = "ē", overrides = {}) {
    return {
        constructionKind: "ownerhood",
        source: {
            sourceStem: matrix === "ē" ? "caxitl" : "cal",
            nounClass: matrix === "ē" ? "tli" : "zero",
            nounSubclass: matrix === "ē" ? "2-b" : "",
            ownerhoodMatrix: matrix,
        },
        subject: "3sg",
        state: "absolutive",
        ...overrides,
    };
}

function nominalContinuationRequest(overrides = {}) {
    return {
        constructionKind: "nominal-continuation",
        source: {
            sourceStage: "derived-nounstem",
            sourceStem: "mic-ca",
            matrixStem: "tēuctli",
            matrixClass: "tli",
        },
        subject: "3sg",
        state: "absolutive",
        ...overrides,
    };
}

function vocativeRequest(overrides = {}) {
    return {
        constructionKind: "vocative",
        source: {
            wordStem: "pix",
            numberConnector: "c",
        },
        ...overrides,
    };
}

function witnessRoute(family) {
    if (family === "vocative/preterit-agentive-boundary") return "vocative";
    if (family.includes("double-nucleus")) return "double-nucleus";
    if (family.startsWith("ownerhood/")) return "ownerhood";
    if (family.startsWith("patientive/")) return "patientive";
    if (family.startsWith("continuation/")) return "continuation";
    if (
        family.startsWith("deverbal-action/")
        || family.startsWith("action/")
        || family.startsWith("sentence/")
        || family.startsWith("gcd/")
    ) return "deverbal";
    return "predicate";
}

function findAuditMetadata(value, currentPath = "frame") {
    if (!value || typeof value !== "object") return "";
    const blocked = new Set([
        "sourceSpans",
        "sourceSpan",
        "claimCount",
        "dispositionCounts",
        "ledgerDocument",
        "sourceReceipt",
    ]);
    for (const [key, item] of Object.entries(value)) {
        const nextPath = `${currentPath}.${key}`;
        if (blocked.has(key)) return nextPath;
        const nested = findAuditMetadata(item, nextPath);
        if (nested) return nested;
    }
    return "";
}

function run(ctx = {}) {
    const s = createSuite("classical_nnc_lessons35_39_closure");
    const rows = parseLedgerRows();

    s.eq("claim-specific source inventory has all 72 classified rows", {
        count: rows.length,
        ids: new Set(rows.map(row => row.id)).size,
        unclassified: rows.filter(row => ![
            "existing-canonical-rule",
            "new-canonical-rule",
            "read-only-evidence",
            "genuinely-blocked",
        ].includes(row.disposition)).length,
    }, { count: 72, ids: 72, unclassified: 0 });
    s.eq("claim-specific source inventory exhausts every lesson span", [35, 36, 37, 38, 39]
        .map(lesson => {
            const lessonRows = rows.filter(row => row.lesson === lesson);
            return [
                lesson,
                lessonRows.length,
                lessonRows[0].lineStart,
                lessonRows.at(-1).lineEnd,
            ];
        }), [
        [35, 25, 12736, 13577],
        [36, 15, 13579, 14283],
        [37, 11, 14286, 14710],
        [38, 8, 14713, 15082],
        [39, 13, 15084, 15881],
    ]);
    rows.forEach(row => {
        s.ok(`${row.id} source span is nonempty Canvas evidence`,
            CANVAS_LINES.slice(row.lineStart - 1, row.lineEnd).join("\n").trim());
        s.ok(`${row.id} has a deterministic proof-family route`, witnessRoute(row.family));
    });
    s.eq("production does not carry source-audit metadata", [
        PRODUCTION.includes("ANDREWS_TRANSCRIPTION_CANVAS.md"),
        PRODUCTION.includes("LESSONS_35_39_SOURCE_LEDGER"),
        /\bsourceSpans\s*:/u.test(PRODUCTION),
        /\bclaimCount\s*:/u.test(PRODUCTION),
    ], [false, false, false, false]);
    s.eq("the public workflow exposes each non-duplicate Lessons 35–39 operation without a lesson route", {
        sharedConstruction: SHELL.includes(
            '<option value="deverbal-nnc">'
        ) || SHELL.includes('value="deverbal-nnc"'),
        deverbalSourceToResultRoute:
            SHELL.includes('data-classical-source-unit="any"')
            && SHELL.includes('data-classical-result-unit="nnc"')
            && SHELL.includes('Source → deverbal nominalization or characteristic patientive → NNC Result'),
        constructionKinds: [
            "predicate-nominalization",
            "deverbal-action",
            "patientive",
            "ownerhood",
            "vocative",
            "double-nucleus-ownerhood",
        ].filter(value => SHELL.includes(`value="${value}"`)).length,
        nominalizationKinds:
            ctx.CLASSICAL_NAHUATL_LESSONS_35_39_PREDICATE_NOMINALIZATION_KINDS
                .filter(value => SHELL.includes(`value="${value}"`)).length,
        appScalar:
            RENDERING.includes(
                "targetObject.requestClassicalDeverbalNncResult(request)"
            ),
        appParadigm:
            RENDERING.includes(
                "targetObject.prepareClassicalDeverbalNncParadigmPlan(request)"
            )
            && RENDERING.includes(
                ".projectClassicalDeverbalNncParadigmCoordinates(plan)"
            ),
        canonicalPreteritStageSource:
            RENDERING.includes("sourceImperfectiveStem: baseSource.sourceStem")
            && RENDERING.includes('sourceStem: ""'),
        genuineChoiceControls: [
            "classical-deverbal-nnc-activated-object-person",
            "classical-deverbal-nnc-preterit-agentive-variant",
            "classical-deverbal-nnc-final-i-boundary",
            "classical-deverbal-nnc-action-stem-variant",
            "classical-deverbal-nnc-passive-human-realization",
            "classical-deverbal-nnc-root-stock-allomorph",
        ].filter(id => SHELL.includes(`id="${id}"`)).length,
        genuineChoiceRequestFields: [
            "activatedObjectPerson:",
            "preteritAgentiveVariant:",
            "finalIRealization:",
            "actionStemVariant:",
            "passiveHumanObjectRealization:",
            "rootStockAllomorph:",
        ].filter(token => RENDERING.includes(token)).length,
        staleCallerAuthorityAbsent: [
            "selectedSemanticOptionIds",
            "activatedProjectiveObjectPerson",
            "stockKind:",
            "stockAllomorph:",
        ].every(token => !RENDERING.includes(token)),
        lessonRouteAbsent:
            !SHELL.includes("lessons35-39-route")
            && !RENDERING.includes("lessons35-39-route"),
    }, {
        sharedConstruction: true,
        deverbalSourceToResultRoute: true,
        constructionKinds: 6,
        nominalizationKinds:
            ctx.CLASSICAL_NAHUATL_LESSONS_35_39_PREDICATE_NOMINALIZATION_KINDS
                .length,
        appScalar: true,
        appParadigm: true,
        canonicalPreteritStageSource: true,
        genuineChoiceControls: 6,
        genuineChoiceRequestFields: 5,
        staleCallerAuthorityAbsent: true,
        lessonRouteAbsent: true,
    });

    const kindRequests = [
        ["preterit-agentive", predicateRequest("preterit-agentive")],
        ["preterit-patientive", predicateRequest("preterit-patientive")],
        ["customary-agentive-reanalysis", predicateRequest("customary-agentive-reanalysis")],
        ["customary-agentive-full", predicateRequest("customary-agentive-full")],
        ["customary-patientive", predicateRequest("customary-patientive")],
        ["instrumentive-absolutive", predicateRequest("instrumentive")],
        ["instrumentive-possessive", predicateRequest("instrumentive", {
            state: "possessive",
            source: {
                sourceStage: "imperfect-predicate",
                sourceStem: "mach-ti",
                verbClass: "A",
                sourceVoice: "active",
                sourceValence: "single-object",
                sourceObjectPattern: "none",
                sourceSubject: "1sg",
            },
        })],
        ["present-agentive", predicateRequest("present-agentive")],
        ["future-agentive", predicateRequest("future-agentive")],
        ["passive-action", predicateRequest("passive-action")],
        ["active-action", predicateRequest("active-action")],
    ];
    const positiveFrames = kindRequests.map(([label, request]) => {
        const frame = ctx.evaluateClassicalNahuatlDeverbalNnc(request);
        s.ok(`positive witnesses authorize ${label}`,
            frame.authorizationStatus === "authorized"
            && frame.sourceFrame?.authorizationStatus === "authorized"
            && frame.operationFrame?.authorizationStatus === "authorized"
            && frame.canonicalTargetEvaluator === "buildClassicalNahuatlNncSlotFrame"
            && frame.canonicalResult?.authorizationStatus === "authorized");
        return frame;
    });
    s.eq("preterit-agentive is the reanalyzed preterit predicate inside NNC slots", {
        formula: positiveFrames[0].formulaRealization,
        word: positiveFrames[0].wordSurface,
        stem: positiveFrames[0].operationFrame.targetStems.restrictedUse,
    }, {
        formula: "#0-0(pix-ca-0)c-0#",
        word: "pixcac",
        stem: "pix-ca-0",
    });
    const nemiPreteritAgentiveRequest = predicateRequest(
        "preterit-agentive",
        {
            source: {
                sourceStage: "preterit-predicate",
                sourceImperfectiveStem: "nemi",
                verbClass: "B",
                sourceVoice: "active",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
                sourceSubject: "3sg",
            },
        }
    );
    const nemiPreteritAgentive =
        ctx.evaluateClassicalNahuatlDeverbalNnc(
            nemiPreteritAgentiveRequest
        );
    s.eq("preterit-agentive derives nemi's Class B preterit member before nominalization", {
        status: nemiPreteritAgentive.authorizationStatus,
        sourceStem: nemiPreteritAgentive.sourceFrame?.sourceStem,
        sourceImperfectiveStem:
            nemiPreteritAgentive.sourceFrame?.sourceImperfectiveStem,
        derivedByOwner:
            nemiPreteritAgentive.sourceFrame
                ?.sourceStemDerivedByCanonicalOwner,
        changeRule:
            nemiPreteritAgentive.sourceFrame
                ?.canonicalStageDerivationFrame?.perfectiveChangeRule,
        formula: nemiPreteritAgentive.formulaRealization,
        word: nemiPreteritAgentive.wordSurface,
    }, {
        status: "authorized",
        sourceStem: "nen",
        sourceImperfectiveStem: "nemi",
        derivedByOwner: true,
        changeRule: "class-b-m-to-n",
        formula: "#0-0(nen-0)qui-0#",
        word: "nenqui",
    });
    const ambiguousNemiPreteritSource =
        ctx.evaluateClassicalNahuatlDeverbalNnc({
            ...nemiPreteritAgentiveRequest,
            source: {
                ...nemiPreteritAgentiveRequest.source,
                sourceStem: "nemi",
            },
        });
    s.eq("a caller cannot bypass the preterit owner with competing raw and staged stems", {
        status: ambiguousNemiPreteritSource.authorizationStatus,
        reason: ambiguousNemiPreteritSource.blockReason,
    }, {
        status: "blocked",
        reason:
            "ambiguous-imperfective-and-prepared-preterit-source-rejected",
    });
    const nemiPreteritAgentivePlan =
        ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
            ...nemiPreteritAgentiveRequest,
            subjects: ["3sg"],
            states: ["absolutive"],
        });
    const [nemiPreteritAgentiveCoordinate] =
        ctx.projectClassicalNahuatlParadigmCoordinates(
            nemiPreteritAgentivePlan
        );
    s.eq("nemi preterit-agentive scalar and paradigm use the same derived stage member", {
        planStatus: nemiPreteritAgentivePlan.authorizationStatus,
        coordinateStatus:
            nemiPreteritAgentiveCoordinate?.authorizationStatus,
        scalarEquivalent:
            nemiPreteritAgentiveCoordinate?.scalarEquivalent,
        formula: nemiPreteritAgentiveCoordinate?.formulaRealization,
        word: nemiPreteritAgentiveCoordinate?.wordSurface,
    }, {
        planStatus: "authorized",
        coordinateStatus: "authorized",
        scalarEquivalent: true,
        formula: "#0-0(nen-0)qui-0#",
        word: "nenqui",
    });
    s.eq("instrumentive possessive maps imperfect subject to possessor", {
        states: positiveFrames[6].operationFrame.allowedStates,
        possessor: positiveFrames[6].operationFrame.transformedPossessor,
        state: positiveFrames[6].canonicalResult.state,
    }, {
        states: ["possessive"],
        possessor: "1sg",
        state: "possessive",
    });
    const activatedHybrid = ctx.evaluateClassicalNahuatlDeverbalNnc(
        predicateRequest("preterit-agentive", {
            source: {
                sourceStage: "preterit-predicate",
                sourceStem: "mah-mat",
                verbClass: "B",
                sourceVoice: "active",
                sourceValence: "single-object",
                sourceObjectPattern: "nonspecific-nonhuman",
                sourceSubject: "3sg",
            },
            activatedObjectPerson: "3sg",
            supplementaryObjectRelation: "supplementary-object",
            supplementaryObjectReferentId: "supplement:food",
        })
    );
    s.eq("interaction witnesses realize the activated object outside the nounstem", {
        status: activatedHybrid.authorizationStatus,
        internalStem: activatedHybrid.operationFrame.targetStems.restrictedUse,
        externalObject: activatedHybrid.canonicalResult.externalObjectFrame
            && [
                activatedHybrid.canonicalResult.externalObjectFrame.va1,
                activatedHybrid.canonicalResult.externalObjectFrame.va2,
            ],
        formula: activatedHybrid.formulaRealization,
    }, {
        status: "authorized",
        internalStem: "mah-mat-0",
        externalObject: ["qui", "0"],
        formula: "#0-0+qui-0(mah-mat-0)qui-0#",
    });
    s.eq("selected Result is rendered from the returned typed participant slots", {
        selectedFormula: activatedHybrid.formulaRealization,
        typedFormula: ctx.renderClassicalNahuatlNncSlotFrameFormula(
            activatedHybrid.canonicalResult.nncSlotFrame
        ),
        participantRoles: activatedHybrid.canonicalResult.nncSlotFrame
            .slots.participant.slots.map(slot => `${slot.role}:${slot.carrier}`),
        selectedMatchesTyped: activatedHybrid.selectedResultMatchesTypedFrame,
    }, {
        selectedFormula: "#0-0+qui-0(mah-mat-0)qui-0#",
        typedFormula: "#0-0+qui-0(mah-mat-0)qui-0#",
        participantRoles: ["va1:qui", "va2:0"],
        selectedMatchesTyped: true,
    });
    const archaicQue = ctx.evaluateClassicalNahuatlDeverbalNnc(
        predicateRequest("preterit-agentive", {
            source: {
                sourceStage: "preterit-predicate",
                sourceStem: "yah",
                verbClass: "B",
                sourceVoice: "active",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
                sourceSubject: "3sg",
            },
            preteritAgentiveVariant: "archaic-que",
        })
    );
    s.eq("positive witnesses keep archaic que as a licensed absolutive general-use path", {
        status: archaicQue.authorizationStatus,
        stem: archaicQue.operationFrame.targetStems.restrictedUse,
        nounClass: archaicQue.operationFrame.nounClass,
        formula: archaicQue.formulaRealization,
        word: archaicQue.wordSurface,
    }, {
        status: "authorized",
        stem: "yah-0-quē",
        nounClass: "tl",
        formula: "#0-0(yah-0-quē)tl-0#",
        word: "yahquētl",
    });
    const lexicalAuthorization =
        archaicQue.sourceFrame.lexicalAuthorizationFrame;
    s.eq("lexical facts are owner-issued read-only Source authorization", {
        issued:
            ctx.isClassicalNahuatlLexicalAuthorizationFrame(
                lexicalAuthorization
            ),
        copied:
            ctx.isClassicalNahuatlLexicalAuthorizationFrame(
                JSON.parse(JSON.stringify(lexicalAuthorization))
            ),
        sourceStem: lexicalAuthorization.sourceStem,
        variants: lexicalAuthorization.preteritAgentiveVariants,
        callerAuthority:
            lexicalAuthorization.callerSuppliedLexicalAuthorityAccepted,
    }, {
        issued: true,
        copied: false,
        sourceStem: "yah",
        variants: ["ordinary", "archaic-que", "yauh-ti-owner"],
        callerAuthority: false,
    });
    [
        ["old-woman", "ilama-ti", "ilama-h-0"],
        ["old-man", "huē-huē-ti", "huē-hue-h-0"],
    ].forEach(([lexicalFamily, sourceStem, expectedStem]) => {
        const frame = ctx.evaluateClassicalNahuatlDeverbalNnc(
            predicateRequest("preterit-agentive", {
                numberConnector: "silent",
                source: {
                    sourceStage: "preterit-predicate",
                    sourceStem,
                    verbClass: "B",
                    sourceVoice: "active",
                    sourceValence: "intransitive",
                    sourceObjectPattern: "none",
                    sourceSubject: "3sg",
                },
            })
        );
        s.eq(`positive witnesses derive exact ${lexicalFamily} perfective`, {
            status: frame.authorizationStatus,
            stem: frame.operationFrame.targetStems.restrictedUse,
            family: frame.operationFrame.lexicalFamily,
        }, {
            status: "authorized",
            stem: expectedStem,
            family: lexicalFamily,
        });
    });
    const yauhOwner = ctx.evaluateClassicalNahuatlDeverbalNnc(
        predicateRequest("preterit-agentive", {
            state: "possessive",
            possessor: "3sg",
            source: {
                sourceStage: "preterit-predicate",
                sourceStem: "yah",
                verbClass: "B",
                sourceVoice: "active",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
                sourceSubject: "3sg",
            },
            preteritAgentiveVariant: "yauh-ti-owner",
        })
    );
    s.ok("positive witnesses keep yauh inner te-to-ti and secondary possessive state distinct",
        yauhOwner.authorizationStatus === "authorized"
        && yauhOwner.operationFrame.targetStems.generalUse === "ti-yah-0-cā"
        && yauhOwner.operationFrame.allowedStates.join("|") === "possessive");
    const realFinalILoss = ctx.evaluateClassicalNahuatlDeverbalNnc(
        predicateRequest("customary-agentive-full", {
            source: {
                sourceStage: "customary-present-predicate",
                sourceStem: "tē-cuā",
                verbClass: "A",
                sourceVoice: "active",
                sourceValence: "single-object",
                sourceObjectPattern: "none",
                sourceSubject: "3sg",
            },
            finalIRealization: "drop",
            boundaryContext: "compound",
        })
    );
    s.ok("interaction witnesses restrict real final-i loss to a licensed boundary",
        realFinalILoss.authorizationStatus === "authorized"
        && realFinalILoss.operationFrame.targetStems.restrictedUse === "tē-cuā-n"
        && realFinalILoss.operationFrame.boundaryVariant === "drop-real-final-i");

    [
        ["z active action", deverbalRequest({ actionSuffix: "z" })],
        ["liz active action", deverbalRequest()],
        ["potential patient", deverbalRequest({ actionKind: "potential-patient" })],
        ["impersonal general action", deverbalRequest({
            actionKind: "impersonal-general-action",
            source: {
                sourceStage: "future-core",
                sourceStem: "cua",
                verbClass: "A",
                sourceVoice: "impersonal",
                sourceValence: "intransitive",
                sourceObjectPattern: "nonspecific-nonhuman",
                sourceSubject: "3sg",
            },
        })],
    ].forEach(([label, request]) => {
        const frame = ctx.evaluateClassicalNahuatlDeverbalNnc(request);
        s.ok(`positive witnesses authorize ${label}`,
            frame.authorizationStatus === "authorized"
            && frame.operationFrame.operationId.startsWith("deverbal-action:"));
    });
    const exceptionalZAction = ctx.evaluateClassicalNahuatlDeverbalNnc(
        deverbalRequest({
            actionSuffix: "z",
            source: {
                sourceStage: "future-core",
                sourceStem: "toz-ō",
                verbClass: "A",
                sourceVoice: "active",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
                sourceSubject: "3sg",
            },
        })
    );
    s.eq("lexical z exception is generated only from its owner-issued Source fact", {
        status: exceptionalZAction.authorizationStatus,
        stem: exceptionalZAction.operationFrame.targetStems.restrictedUse,
        formula: exceptionalZAction.formulaRealization,
        word: exceptionalZAction.wordSurface,
        authorization:
            exceptionalZAction.operationFrame.appliedAuthorizationIds,
    }, {
        status: "authorized",
        stem: "toz-ō-z",
        formula: "#0-0(toz-ō-z)tli-0#",
        word: "tozōztli",
        authorization: ["lexical-source:z-final-exception"],
    });

    ctx.CLASSICAL_NAHUATL_LESSONS_35_39_PATIENTIVE_SOURCE_FAMILIES
        .forEach(family => {
            const frame = family === "passive-core"
                ? exactPassivePatientive(ctx)
                : family === "impersonal-core"
                    ? exactImpersonalPatientive(ctx)
                : family === "perfective-active-core"
                    ? exactPerfectivePatientive(ctx)
                : family === "imperfective-active-core"
                    ? exactImperfectivePatientive(ctx)
                : ctx.evaluateClassicalNahuatlDeverbalNnc(
                    patientiveRequest(family)
                );
            s.ok(`positive witnesses authorize patientive family ${family}`,
                frame.authorizationStatus === "authorized"
                && frame.operationFrame.patientiveSourceFamily === family);
        });
    const rootStockPatientive = ctx.evaluateClassicalNahuatlDeverbalNnc(
        patientiveRequest("root-or-stock")
    );
    s.eq("root-stock generation uses the licensed stock rather than caller history", {
        status: rootStockPatientive.authorizationStatus,
        stockKind: rootStockPatientive.operationFrame.rootStockKind,
        allomorph: rootStockPatientive.operationFrame.rootStockAllomorph,
        stem: rootStockPatientive.operationFrame.targetStems.restrictedUse,
        formula: rootStockPatientive.formulaRealization,
        word: rootStockPatientive.wordSurface,
    }, {
        status: "authorized",
        stockKind: "ni-stock",
        allomorph: "x",
        stem: "cual-a-x",
        formula: "#0-0(cual-a-x)tli-0#",
        word: "cualaxtli",
    });
    const alternateRootStockPatientive =
        ctx.evaluateClassicalNahuatlDeverbalNnc(
            patientiveRequest("root-or-stock", {
                rootStockAllomorph: "zero",
                source: {
                    sourceStage: "root-or-stock",
                    sourceStem: "tom-ā-hua",
                    verbClass: "A",
                    sourceVoice: "active",
                    sourceValence: "intransitive",
                    sourceObjectPattern: "none",
                    sourceSubject: "3sg",
                },
            })
        );
    s.eq("a genuine lexical alternative selects only an owner-licensed stock result", {
        status: alternateRootStockPatientive.authorizationStatus,
        allomorph:
            alternateRootStockPatientive.operationFrame.rootStockAllomorph,
        stem:
            alternateRootStockPatientive.operationFrame.targetStems
                .restrictedUse,
        formula: alternateRootStockPatientive.formulaRealization,
        word: alternateRootStockPatientive.wordSurface,
    }, {
        status: "authorized",
        allomorph: "zero",
        stem: "tom-a",
        formula: "#0-0(tom-a)tl-0#",
        word: "tomatl",
    });
    [
        "inherent-quality",
        "pertaining-to",
        "intrinsic-aspect",
    ].forEach(characteristicReading => {
        const frame = ctx.evaluateClassicalNahuatlDeverbalNnc(
            characteristicRequest(ctx, { characteristicReading })
        );
        s.ok(`positive witnesses authorize characteristic ${characteristicReading}`,
            frame.authorizationStatus === "authorized"
            && frame.operationFrame.characteristicReading === characteristicReading);
    });
    const organic = ctx.evaluateClassicalNahuatlDeverbalNnc(characteristicRequest(ctx, {
        characteristicReading: "organic-possession",
        state: "possessive",
        possessor: "3sg",
    }));
    s.ok("positive witnesses authorize possessive-only organic possession",
        organic.authorizationStatus === "authorized"
        && organic.operationFrame.allowedStates.join("|") === "possessive");
    const deletedHumanObject = ctx.evaluateClassicalNahuatlDeverbalNnc(
        patientiveRequest("passive-core", {
            source: {
                sourceStage: "nonactive-core",
                sourceStem: "tlan-ē-uh-ti-lō",
                verbClass: "A",
                sourceVoice: "passive",
                sourceValence: "double-object",
                sourceObjectPattern: "nonspecific-human",
                sourceSubject: "3sg",
                nonactiveSuffix: "lō",
            },
            passiveHumanObjectRealization: "delete",
        })
    );
    s.ok("raw passive stems no longer authorize optional te deletion",
        deletedHumanObject.authorizationStatus === "blocked"
        && deletedHumanObject.blockReason
            === "exact-owner-issued-passive-vnc-result-required");
    const rawHumanToTla = ctx.evaluateClassicalNahuatlDeverbalNnc(
        patientiveRequest("impersonal-core", {
            source: {
                sourceStage: "nonactive-core",
                sourceStem: "pach-ō-lō",
                verbClass: "A",
                sourceVoice: "impersonal",
                sourceValence: "single-object",
                sourceObjectPattern: "nonspecific-human",
                sourceSubject: "3sg",
                nonactiveSuffix: "lō",
            },
        })
    );
    s.ok("raw human impersonal patientive stems cannot bypass VNC ownership",
        rawHumanToTla.authorizationStatus === "blocked"
        && rawHumanToTla.blockReason
            === "exact-owner-issued-impersonal-vnc-result-required");
    const rootPlusYaPatientive = exactImpersonalPatientive(ctx, {
        sourceStem: "mela-ya",
        verbClass: "B",
        suffix: "lō",
    });
    s.ok("positive witnesses preserve VNC-owned root-plus-ya realization through the patientive",
        rootPlusYaPatientive.authorizationStatus === "authorized"
        && rootPlusYaPatientive.operationFrame.targetStems.restrictedUse === "mela-l"
        && rootPlusYaPatientive.operationFrame.impersonalPatientiveFamilyFrame
            .duplicatePatientiveRootPlusYaChoiceExposed === false);

    ["ē", "huā", "yō-ā"].forEach(matrix => {
        const request = matrix === "yō-ā"
            ? ownerhoodRequest(matrix, {
                source: {
                    sourceStem: "cal",
                    nounClass: "zero",
                    ownerhoodMatrix: "yō-ā",
                },
            })
            : ownerhoodRequest(matrix);
        const frame = ctx.evaluateClassicalNahuatlDeverbalNnc(request);
        s.ok(`positive witnesses authorize ownerhood matrix ${matrix}`,
            frame.authorizationStatus === "authorized"
            && frame.operationFrame.ownerhoodMatrix === matrix);
    });

    const nominalContinuation = ctx.evaluateClassicalNahuatlDeverbalNnc(
        nominalContinuationRequest()
    );
    s.ok("interaction witnesses authorize derived nounstem as nominal embed",
        nominalContinuation.authorizationStatus === "authorized"
        && nominalContinuation.operationFrame.continuationRelation === "compound-nnc-embed");
    const miquiFuture = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "miqui",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "future",
        requestedDerivation: "direct",
        requestedVoice: "active",
    });
    const miquiz = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "deverbal-action",
        actionKind: "active-action",
        actionSuffix: "z",
        canonicalVncResult: miquiFuture.resultFrame,
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
    const assimilatedAction = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "nominal-continuation",
        canonicalNncResult: miquiz.canonicalResult,
        source: {
            matrixStem: "tzin",
            matrixClass: "tli",
        },
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
    s.eq("interaction witnesses realize action-s before affective tz at the compound boundary", {
        source: miquiFuture.authorizationStatus,
        action: [miquiz.authorizationStatus,
            miquiz.operationFrame?.targetStems?.restrictedUse],
        continuation: [assimilatedAction.authorizationStatus,
            assimilatedAction.blockReason,
            assimilatedAction.operationFrame?.targetStems?.restrictedUse,
            assimilatedAction.operationFrame?.appliedSemanticRules],
    }, {
        source: "authorized",
        action: ["authorized", "miqui-z"],
        continuation: ["authorized", "", "miqui-tzin", [
            "35.7-or-37.5.4-or-38.2-or-39.6-nominal-embed",
            "37.5-s-to-tz-affective-assimilation",
        ]],
    });
    const actionSupplementPrincipal =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            ctx.evaluateClassicalNahuatlVncApplication({
                sourceStem: "cuīca",
                verbClass: "A",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "direct",
                objectKind: "",
                requestedVoice: "active",
            }),
            { referenceId: "actor", subjectReferenceId: "actor" }
        );
    const actionSupplementClause =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            ctx.evaluateClassicalNahuatlDeverbalNnc(deverbalRequest()),
            { referenceId: "actor", subjectReferenceId: "actor" }
        );
    const actionSupplement =
        ctx.evaluateClassicalNahuatlSupplementationOperation({
            operationKind: "relation",
            principalClause: actionSupplementPrincipal,
            supplementClause: actionSupplementClause,
            options: {
                referenceMode: "shared",
                headRole: "subject",
                supplementContactRole: "subject",
            },
        });
    s.ok("interaction witnesses admit a live active-action NNC as a typed supplement",
        actionSupplementClause.authorizationStatus === "authorized"
        && actionSupplement.authorizationStatus === "authorized"
        && actionSupplementClause.nuclearFormulaRealization
            === "#0-0(chi-liz)tli-0#"
        && actionSupplementClause.nuclearSurface === "chiliztli");
    const omittedCharacteristicYo = ctx.evaluateClassicalNahuatlDeverbalNnc(
        nominalContinuationRequest({
            source: {
                sourceStage: "derived-nounstem",
                sourceStem: "yōl-lō-yō",
                derivationKind: "characteristic-property-patientive",
                omitCharacteristicYō: true,
                matrixStem: "chicāhua",
                matrixClass: "tl",
            },
        })
    );
    s.ok("interaction witnesses omit characteristic yo only from typed full derivation history",
        omittedCharacteristicYo.authorizationStatus === "authorized"
        && omittedCharacteristicYo.operationFrame.targetStems.restrictedUse
            === "yōl-lō-chicāhua");
    const verbalContinuation = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "verbal-continuation",
        source: {
            sourceStage: "derived-nounstem",
            sourceStem: "mic-ca",
            embedClass: "zero",
            matrixStem: "chōca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
        },
        relation: "adverb",
        adverbRole: "manner",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
    });
    s.ok("interaction witnesses route derived nounstem to canonical VNC continuation",
        verbalContinuation.authorizationStatus === "authorized"
        && verbalContinuation.canonicalTargetEvaluator
            === "evaluateClassicalNahuatlNominalConstruction");
    const possessiveComplement = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "verbal-continuation",
        source: {
            sourceStage: "derived-nounstem",
            sourceStem: "chīhua-l",
            embedClass: "tli",
            sourceState: "possessive",
            possessor: "1sg",
            possessorToObjectTransfer: true,
            matrixFamily: "toca",
            matrixStem: "toca",
            matrixVerbClass: "A",
            matrixValence: "single-object",
        },
        relation: "complement",
        orientation: "object",
        complementKind: "pretending",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
    });
    s.ok("interaction witnesses transform patientive possessor into mainline matrix object",
        possessiveComplement.authorizationStatus === "authorized"
        && possessiveComplement.operationFrame.participantTransform?.sourceCase
            === "possessive"
        && possessiveComplement.operationFrame.participantTransform?.targetCase
            === "objective"
        && possessiveComplement.operationFrame.participantTransform
            ?.valenceInflationWithoutSuffix === true);
    const incorporatedPatientiveObject = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "verbal-continuation",
        source: {
            sourceStage: "derived-nounstem",
            sourceStem: "tla-ht-ō-l",
            embedClass: "tli",
            sourceState: "possessive",
            possessor: "3pl",
            possessorToObjectTransfer: true,
            matrixFamily: "ih-tlani",
            matrixStem: "ih-tlani",
            matrixVerbClass: "A",
            matrixValence: "single-object",
        },
        relation: "object",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
    });
    s.ok("interaction witnesses transfer patientive possessor to outside applicative object",
        incorporatedPatientiveObject.authorizationStatus === "authorized"
        && incorporatedPatientiveObject.operationFrame.participantTransform?.targetRole
            === "outside-applicative-object"
        && incorporatedPatientiveObject.operationFrame.participantTransform
            ?.valencePreservedWithInsideAndOutsideObjects === true);
    const vocative = ctx.evaluateClassicalNahuatlDeverbalNnc(vocativeRequest());
    s.eq("interaction witnesses apply vocative k spelling at the typed boundary", {
        status: vocative.authorizationStatus,
        rule: vocative.operationFrame.appliedSemanticRules[0],
        word: vocative.wordSurface,
    }, {
        status: "authorized",
        rule: "35.13-class-a-c-to-qu-before-e",
        word: "pixquē",
    });

    const nucleusA = positiveFrames[0].canonicalResult.nncSlotFrame;
    const nucleusB = positiveFrames[2].canonicalResult.nncSlotFrame;
    const doubleNucleus = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "double-nucleus-ownerhood",
        source: {
            principalNncFrame: nucleusA,
            supplementNncFrame: nucleusB,
            lexicalizedFixedOrder: true,
        },
        subject: "3sg",
        state: "absolutive",
    });
    s.ok("interaction witnesses preserve typed fixed-order double nucleus for ownerhood",
        doubleNucleus.authorizationStatus === "authorized"
        && doubleNucleus.sourceFrame.fixedOrder === true
        && doubleNucleus.operationFrame.operationId === "double-nucleus-ownerhood:yō-ā");
    const copiedNucleus = JSON.parse(JSON.stringify(nucleusA));
    copiedNucleus.slots.predicate.stem = "forged";
    const copiedDoubleNucleus = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "double-nucleus-ownerhood",
        source: {
            principalNncFrame: copiedNucleus,
            supplementNncFrame: nucleusB,
        },
        subject: "3sg",
        state: "absolutive",
    });
    s.eq("copied or mutated typed nuclei cannot authorize double-nucleus ownerhood", {
        status: copiedDoubleNucleus.authorizationStatus,
        reason: copiedDoubleNucleus.blockReason,
    }, {
        status: "blocked",
        reason: "35.14-typed-fixed-order-double-nucleus-source-required",
    });

    const negativeFrames = [
        ["wrong preterit source stage", predicateRequest("preterit-agentive", {
            source: {
                sourceStage: "present-predicate",
                sourceStem: "pix-ca",
                verbClass: "A",
                sourceVoice: "active",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
            },
        }), "source-stage-preterit-predicate-required"],
        ["active action rejects transitive nonreflexive source", predicateRequest("active-action", {
            source: {
                sourceStage: "distant-past-predicate",
                sourceStem: "mach-ti",
                verbClass: "A",
                sourceVoice: "active",
                sourceValence: "single-object",
                sourceObjectPattern: "none",
            },
        }), "nominalized-active-action-requires-intransitive-or-reflexive-source"],
        ["z requires final i or typed exception", deverbalRequest({
            actionSuffix: "z",
            source: {
                sourceStage: "future-core",
                sourceStem: "chōc",
                verbClass: "B",
                sourceVoice: "active",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
            },
        }), "37.2-z-requires-final-i-or-typed-exception"],
        ["active deverbal action rejects nonactive source voice", withSource(
            deverbalRequest({ actionKind: "active-action" }),
            { sourceVoice: "passive" }
        ), "deverbal-action-kind-source-voice-mismatch"],
        ["potential-patient action rejects impersonal source voice", withSource(
            deverbalRequest({ actionKind: "potential-patient" }),
            { sourceVoice: "impersonal" }
        ), "deverbal-action-kind-source-voice-mismatch"],
        ["impersonal general action rejects active source voice", withSource(
            deverbalRequest({ actionKind: "impersonal-general-action" }),
            { sourceVoice: "active" }
        ), "deverbal-action-kind-source-voice-mismatch"],
        ["passive patientive rejects intransitive ultimate source", patientiveRequest("passive-core", {
            source: {
                sourceStage: "nonactive-core",
                sourceStem: "cua-lō",
                verbClass: "A",
                sourceVoice: "passive",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
                nonactiveSuffix: "lō",
            },
        }), "exact-owner-issued-passive-vnc-result-required"],
        ["passive-core patientive rejects active source voice", withSource(
            patientiveRequest("passive-core"),
            { sourceVoice: "active" }
        ), "exact-owner-issued-passive-vnc-result-required"],
        ["impersonal-core patientive rejects passive source voice", withSource(
            patientiveRequest("impersonal-core"),
            { sourceVoice: "passive" }
        ), "exact-owner-issued-impersonal-vnc-result-required"],
        ["perfective-active-core patientive rejects a raw typed-looking source", withSource(
            patientiveRequest("perfective-active-core"),
            { sourceVoice: "passive" }
        ), "exact-owner-issued-active-preterit-vnc-result-required"],
        ["imperfective-active-core patientive rejects a raw typed-looking source", withSource(
            patientiveRequest("imperfective-active-core"),
            { sourceVoice: "impersonal" }
        ), "exact-owner-issued-active-present-vnc-result-required"],
        ["root-or-stock patientive rejects passive source voice", withSource(
            patientiveRequest("root-or-stock"),
            { sourceVoice: "passive" }
        ), "patientive-family-source-voice-mismatch"],
        ["characteristic-property patientive rejects a raw nounstem", {
            constructionKind: "patientive",
            patientiveKind: "characteristic-property",
            characteristicReading: "inherent-quality",
            source: {
                sourceStage: "nounstem-embed",
                sourceStem: "mahuiz",
                sourceUnit: "nnc-nounstem",
            },
            subject: "3sg",
            state: "absolutive",
        }, "exact-owner-issued-ordinary-nnc-result-required-for-characteristic-patientive"],
        ["nonactive suffix must match", patientiveRequest("impersonal-core", {
            source: {
                sourceStage: "nonactive-core",
                sourceStem: "coch-ō",
                verbClass: "A",
                sourceVoice: "impersonal",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
                nonactiveSuffix: "hua",
            },
        }), "exact-owner-issued-impersonal-vnc-result-required"],
        ["perfective final segment must be licensed", {
            constructionKind: "patientive",
            patientiveSourceFamily: "perfective-active-core",
            patientiveAnalogy: "impersonal",
            canonicalVncResult:
                ctx.evaluateClassicalNahuatlVncApplication({
                    sourceStem: "temō",
                    verbClass: "A",
                    sourceValence: "intransitive",
                    subject: "3sg",
                    mood: "indicative",
                    tense: "preterit",
                    requestedDerivation: "direct",
                    requestedVoice: "active",
                    voice: "active",
                }).resultFrame,
            subject: "3sg",
            state: "absolutive",
        }, "39.1-perfective-source-ending-not-licensed"],
        ["organic possession is possessive only", characteristicRequest(ctx, {
            characteristicReading: "organic-possession",
            state: "absolutive",
        }), "39.3.4-organic-possession-is-possessive-only"],
        ["unknown root-stock history cannot authorize", patientiveRequest("root-or-stock", {
            source: {
                sourceStage: "root-or-stock",
                sourceStem: "cuē",
                verbClass: "A",
                sourceVoice: "active",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
            },
        }), "39.4-root-stock-source-not-lexically-authorized"],
        ["ownerhood matrix is class-conditioned", ownerhoodRequest("ē", {
            source: {
                sourceStem: "cal",
                nounClass: "zero",
                ownerhoodMatrix: "ē",
            },
        }), "35.9-ownerhood-matrix-not-licensed-for-typed-source-class"],
        ["activated object needs its typed projective Source structure", predicateRequest("preterit-agentive", {
            source: {
                sourceStage: "preterit-predicate",
                sourceStem: "mah-mat",
                verbClass: "B",
                sourceVoice: "active",
                sourceValence: "single-object",
                sourceObjectPattern: "none",
            },
            activatedObjectPerson: "3sg",
        }), "35.4-or-36.2-typed-projective-object-activation-license-required"],
        ["real final-i loss needs an exact compound or vocative boundary", predicateRequest("customary-agentive-full", {
            source: {
                sourceStage: "customary-present-predicate",
                sourceStem: "tē-cuā",
                verbClass: "A",
                sourceVoice: "active",
                sourceValence: "single-object",
                sourceObjectPattern: "none",
            },
            finalIRealization: "drop",
            boundaryContext: "ordinary-nnc",
        }), "36.2-real-final-i-loss-boundary-license-required"],
        ["stock Source constrains its allomorph inventory", patientiveRequest("root-or-stock", {
            rootStockAllomorph: "x",
            source: {
                sourceStage: "root-or-stock",
                sourceStem: "tom-ā-hua",
                verbClass: "A",
                sourceVoice: "active",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
            },
        }), "39.4-root-stock-allomorph-not-lexically-authorized"],
        ["archaic que cannot be requested for an unlicensed lexeme", predicateRequest(
            "preterit-agentive",
            {
                preteritAgentiveVariant: "archaic-que",
            }
        ), "35.5-preterit-agentive-variant-not-lexically-authorized"],
        ["passive te deletion cannot be requested for an unlicensed lexeme",
            patientiveRequest("passive-core", {
                passiveHumanObjectRealization: "delete",
                source: {
                    sourceStage: "nonactive-core",
                    sourceStem: "cua-lō",
                    verbClass: "A",
                    sourceVoice: "passive",
                    sourceValence: "single-object",
                    sourceObjectPattern: "nonspecific-human",
                    nonactiveSuffix: "lō",
                },
            }),
            "exact-owner-issued-passive-vnc-result-required"],
        ["yo omission requires typed derivational history", nominalContinuationRequest({
            source: {
                sourceStage: "derived-nounstem",
                sourceStem: "yōl-lō-yō",
                omitCharacteristicYō: true,
                matrixStem: "chicāhua",
                matrixClass: "tl",
            },
        }), "39.9-characteristic-yo-omission-requires-typed-derived-source"],
    ];
    negativeFrames.forEach(([label, request, reason]) => {
        const frame = ctx.evaluateClassicalNahuatlDeverbalNnc(request);
        s.eq(`negative restrictions block ${label}`, {
            status: frame.authorizationStatus,
            reason: frame.blockReason,
        }, { status: "blocked", reason });
    });

    const hostileBases = [
        predicateRequest("preterit-agentive"),
        deverbalRequest(),
        patientiveRequest("passive-core"),
        ownerhoodRequest("ē"),
        nominalContinuationRequest(),
        vocativeRequest(),
    ];
    hostileBases.forEach((request, index) => {
        ["lesson", "displayFormula", "surface", "result"].forEach(key => {
            const frame = ctx.evaluateClassicalNahuatlDeverbalNnc({
                ...request,
                [key]: key === "lesson" ? 39 : "hostile-authority",
            });
            s.ok(`hostile authority ${index + 1}.${key} cannot authorize output`,
                frame.authorizationStatus === "blocked"
                && frame.blockReason.includes("caller-supplied-derived-authority-rejected"));
        });
    });
    const retiredSourceAuthorityFields = {
        selectedSemanticOptionIds: ["archaic-que-absolutive"],
        specialLexicalFamily: "old-woman",
        archaicQueAbsolutive: true,
        rarePossessiveReanalysis: true,
        activatedProjectiveObjectPerson: "3sg",
        agentiveEmbed: true,
        boundaryVariant: "drop-real-final-i",
        boundaryKind: "compound",
        stemRule: "ca-to-qui",
        rootPlusYa: true,
        transitivePotentialPatient: true,
        rootPlusYaDeletion: true,
        deleteRetainedHumanObject: true,
        retainExceptionalHumanPrefix: true,
        truncationStemRule: "ci-to-xi",
        stockKind: "hua-stock",
        stockAllomorph: "x",
        keepStockVowelLength: true,
        preteritAgentiveGeneralUse: true,
        lexicalAuthorizationFrame: {
            authorizationStatus: "authorized",
        },
    };
    Object.entries(retiredSourceAuthorityFields).forEach(([key, value]) => {
        const base = predicateRequest("preterit-agentive");
        const frame = ctx.evaluateClassicalNahuatlDeverbalNnc({
            ...base,
            source: {
                ...base.source,
                [key]: value,
            },
        });
        s.eq(`retired caller authority ${key} is rejected at the Source boundary`, {
            status: frame.authorizationStatus,
            reason: frame.blockReason,
        }, {
            status: "blocked",
            reason:
                `caller-supplied-derived-authority-rejected:request.source.${key}`,
        });
    });

    const scalarBase = predicateRequest("future-agentive");
    const scalar = ctx.evaluateClassicalNahuatlDeverbalNnc(scalarBase);
    const copiedSource = JSON.parse(JSON.stringify(scalar.sourceFrame));
    const copiedSourceAttempt = ctx.evaluateClassicalNahuatlDeverbalNnc({
        ...scalarBase,
        source: copiedSource,
    });
    s.eq("copied or forged issued source frames are rejected", {
        status: copiedSourceAttempt.authorizationStatus,
        reason: copiedSourceAttempt.blockReason,
    }, {
        status: "blocked",
        reason: "copied-or-forged-source-frame-rejected",
    });
    const applicationScalar = ctx.requestClassicalDeverbalNncResult(scalarBase);
    s.eq("global grammar application preserves the canonical selected Result", {
        status: applicationScalar.authorizationStatus,
        formula: applicationScalar.formulaRealization,
        word: applicationScalar.wordSurface,
    }, {
        status: scalar.authorizationStatus,
        formula: scalar.formulaRealization,
        word: scalar.wordSurface,
    });
    let hostileApplicationFailure = "";
    try {
        ctx.requestClassicalDeverbalNncResult({
            ...scalarBase,
            formula: "#hostile#",
        });
    } catch (error) {
        hostileApplicationFailure = String(error?.message || error);
    }
    s.ok("global grammar application cannot revive caller-supplied formula authority",
        hostileApplicationFailure
        === "classical-grammar-application-request-invalid:forbidden-authority:formula");
    const plan = ctx.buildClassicalNahuatlDeverbalNncParadigmPlan({
        ...scalarBase,
        subjects: ["1sg", "3sg", "1pl", "3pl"],
        states: ["absolutive", "possessive"],
    });
    const projected = ctx.projectClassicalNahuatlParadigmCoordinates(plan);
    s.eq("paradigm preparation issues one owner-authenticated plan", {
        issued: ctx.isClassicalNahuatlParadigmPlan(plan),
        copied: ctx.isClassicalNahuatlParadigmPlan(
            JSON.parse(JSON.stringify(plan))
        ),
    }, {
        issued: true,
        copied: false,
    });
    s.eq("scalar and paradigm equivalence prepare the complete typed coordinate product", {
        status: plan.authorizationStatus,
        count: plan.coordinateCount,
        projected: projected.length,
        scalarEvaluator: plan.scalarEvaluatorIdentity,
        allScalar: projected.every(frame => frame.scalarEquivalent),
        allOwnerIssued: projected.every(frame => (
            ctx.isClassicalNahuatlParadigmCoordinate(frame)
        )),
        sourcePreparedOnce: projected.every(frame => (
            frame.preparedFrame.sourceFrame === plan.preparedSourceFrame
        )),
    }, {
        status: "authorized",
        count: 8,
        projected: 8,
        scalarEvaluator: "evaluateClassicalNahuatlDeverbalNnc",
        allScalar: true,
        allOwnerIssued: true,
        sourcePreparedOnce: true,
    });
    s.ok("copied coordinate shape is not canonical authority",
        ctx.isClassicalNahuatlParadigmCoordinate(
            { ...projected[0] }
        ) === false);
    const applicationPlan = ctx.prepareClassicalDeverbalNncParadigmPlan({
        ...scalarBase,
        subjects: ["1sg", "3sg", "1pl", "3pl"],
        states: ["absolutive", "possessive"],
    });
    const applicationProjected =
        ctx.projectClassicalDeverbalNncParadigmCoordinates(applicationPlan);
    s.eq("the shared application exposes the same owner plan and pointwise scalar results", {
        planIssued:
            ctx.isClassicalNahuatlParadigmPlan(applicationPlan),
        coordinateCount: applicationProjected.length,
        allIssued: applicationProjected.every(frame => (
            ctx.isClassicalNahuatlParadigmCoordinate(frame)
        )),
        exactPoints: applicationProjected.map(frame => ({
            coordinateId: frame.coordinateId,
            formula: frame.formulaRealization,
            word: frame.wordSurface,
            scalarEquivalent: frame.scalarEquivalent,
        })),
    }, {
        planIssued: true,
        coordinateCount: projected.length,
        allIssued: true,
        exactPoints: projected.map(frame => ({
            coordinateId: frame.coordinateId,
            formula: frame.formulaRealization,
            word: frame.wordSurface,
            scalarEquivalent: frame.scalarEquivalent,
        })),
    });
    const selected = projected.find(frame => frame.coordinateId === "absolutive:3sg");
    s.eq("scalar and paradigm equivalence produce the same selected Result", {
        status: selected.authorizationStatus,
        formula: selected.formulaRealization,
        word: selected.wordSurface,
    }, {
        status: scalar.authorizationStatus,
        formula: scalar.formulaRealization,
        word: scalar.wordSurface,
    });
    const hostileProjection = ctx.projectClassicalNahuatlParadigmCoordinates(
        plan,
        [{ ...plan.coordinates[0], formula: "#hostile#" }]
    );
    s.ok("hostile authority cannot enter through a projected coordinate",
        hostileProjection[0].authorizationStatus === "blocked"
        && hostileProjection[0].blockReason.includes("caller-supplied-derived-authority-rejected"));
    const copiedPlan = JSON.parse(JSON.stringify(plan));
    s.eq("copied paradigm plans cannot project results",
        ctx.projectClassicalNahuatlParadigmCoordinates(copiedPlan),
        []);

    s.eq("LCM exposes every licensed distinction axis and GCD is satisfied", {
        gcd: scalar.greatestCommonDivisor.satisfied,
        lcmComplete: scalar.leastCommonMultiple.licensedAxisSetComplete,
        axisCount: scalar.leastCommonMultiple.axisCount,
        exportedAxisCount:
            ctx.CLASSICAL_NAHUATL_LESSONS_35_39_LCM_DISTINCTION_AXES.length,
        selectedEqualsLicensed:
            scalar.leastCommonMultiple.selectedAxisIds.join("|")
            === scalar.leastCommonMultiple.axisIds.join("|"),
        selectedSourceStage:
            scalar.leastCommonMultiple.selectedValues["source-stage"],
        selectedResultScope:
            scalar.leastCommonMultiple.selectedValues["scalar-versus-full-paradigm"],
        planResultScope:
            plan.leastCommonMultiple.selectedValues["scalar-versus-full-paradigm"],
        selectedContinuationRelation:
            verbalContinuation.leastCommonMultiple.selectedValues[
                "incorporated-object-versus-complement-versus-adverb"
            ],
        continuationOwnerPath:
            verbalContinuation.leastCommonMultiple.ownerSourcePaths[
                "incorporated-object-versus-complement-versus-adverb"
            ],
        selectedValuesAreTypedProjection:
            verbalContinuation.leastCommonMultiple
                .selectedValuesAreTypedProjection,
    }, {
        gcd: true,
        lcmComplete: true,
        axisCount: 29,
        exportedAxisCount: 29,
        selectedEqualsLicensed: true,
        selectedSourceStage: "future-predicate",
        selectedResultScope: "scalar",
        planResultScope: "full-paradigm",
        selectedContinuationRelation: "adverb",
        continuationOwnerPath: "operationFrame.continuationRelation",
        selectedValuesAreTypedProjection: true,
    });
    s.eq("runtime and UI projections carry no source-audit metadata", [
        findAuditMetadata(scalar),
        findAuditMetadata(plan),
        findAuditMetadata(projected),
        findAuditMetadata(ctx.buildClassicalNahuatlUiProjection(scalar)),
    ], ["", "", "", ""]);
    const ui = ctx.buildClassicalNahuatlUiProjection(scalar);
    s.ok("UI projection exposes derived grammar as read-only facts",
        ui.source.readOnly === true
        && ui.grammar.readOnly === true
        && ui.result.readOnly === true
        && ui.displayTextAuthority === false);
    s.eq("canonical UI projection returns the same read-only facts",
        ctx.buildClassicalNahuatlUiProjection(applicationScalar),
        ui);
    s.eq("slice-local application adapters are retired", [
        typeof ctx.requestLessons3539ApplicationFrame,
        typeof ctx.prepareLessons3539ApplicationPlan,
        typeof ctx.projectLessons3539ApplicationCoordinates,
        typeof ctx.projectLessons3539UiFrame,
    ], ["undefined", "undefined", "undefined", "undefined"]);

    [scalar, plan, nominalContinuation, vocative, doubleNucleus].forEach((frame, index) => {
        s.eq(`registered grammar contracts validate frame ${index + 1}`,
            ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                frame
            ).status,
            "valid");
    });

    return s;
}

module.exports = { run };
