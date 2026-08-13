"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function buildCanonicalUnit(ctx, {
    id,
    surface,
    unitKind,
    mood = "",
    tense = "",
} = {}) {
    const formulaRecord = ctx.buildGrammarFormulaRecord({
        id: `${id}:formula`,
        unit: String(unitKind || "clause").toUpperCase(),
        formula: `#${id}#`,
        formulaSlots: {
            source: { slot: "SOURCE", value: id },
        },
        source: "typed-particle-route-test-unit",
    });
    const formulaRealizationRecord =
        ctx.buildGrammarFormulaRealizationRecord({
            id: `${id}:realization`,
            formulaRecord,
            segmentFrames: [{
                slot: "source",
                role: "source",
                formulaValue: id,
                surface,
                sourceFrameId: `${id}:source`,
            }],
            surfaceForms: [surface],
            source: "typed-particle-route-test-unit",
        });
    const grammarFrame = null;
    return Object.freeze({
        kind: "classical-nahuatl-nuclear-clause-nuclear-clause-machinery-frame",
        version: 1,
        authorizationStatus: "authorized",
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        proofFrame: Object.freeze({
            authorizationStatus: "authorized",
        }),
        grammarGenerationAllowed: true,
        formulaRealization: formulaRecord.formula,
        grammarFrame,
        frames: grammarFrame,
    });
}

function createControllerHarness(ctx) {
    const applicationTarget = Object.create(ctx);
    applicationTarget.buildClassicalNahuatlLesson4NuclearClauseFrame =
        specification => buildCanonicalUnit(ctx, {
            ...specification,
            surface: specification.testUnitSurface,
        });
    const applicationApi =
        ctx.createClassicalGrammarApplicationApi(applicationTarget);
    Object.defineProperties(
        applicationTarget,
        Object.getOwnPropertyDescriptors(applicationApi)
    );
    const controllerTarget = Object.create(applicationTarget);
    const controllerApi =
        ctx.createClassicalClauseRelationControllerGlobals(controllerTarget);
    Object.defineProperties(
        controllerTarget,
        Object.getOwnPropertyDescriptors(controllerApi)
    );
    return {
        applicationTarget,
        controller:
            controllerTarget.createClassicalClauseRelationController(),
        issueUnit(specification) {
            const { surface: _documentarySurface, ...typedSpecification } =
                specification;
            return applicationTarget.executeClassicalGrammarApplicationRequest({
                operationId: "vnc:nuclear-clause",
                args: [typedSpecification],
            });
        },
        issueMarker(particleId) {
            const sourceFrame =
                applicationTarget.buildClassicalNahuatlParticleSourceFrame(
                    particleId
                );
            return applicationTarget.requestClassicalParticleResult(
                sourceFrame
            );
        },
    };
}

function composeMarkedScenario(ctx, {
    relation,
    markerId,
    relationProfile = "",
    adjoinedUnitKind = "vnc",
    adjoinedMood = "",
    adjoinedTense = "",
    order = "",
} = {}) {
    const harness = createControllerHarness(ctx);
    const principal = harness.issueUnit({
        id: `${relation}:principal`,
        surface: "niyāuh",
        unitKind: "vnc",
        mood: "indicative",
        tense: "present",
    });
    const adjoined = harness.issueUnit({
        id: `${relation}:adjoined`,
        surface: "tihualāz",
        unitKind: adjoinedUnitKind,
        mood: adjoinedMood,
        tense: adjoinedTense,
    });
    const marker = harness.issueMarker(markerId);
    const captures = [
        harness.controller.captureCurrentResult(
            "principal",
            principal.canonicalResult
        ),
        harness.controller.captureCurrentResult(
            "adjoined",
            adjoined.canonicalResult
        ),
        harness.controller.captureCurrentResult("marker", marker),
    ];
    const selections = {
        relation,
        ...(relationProfile ? { relationProfile } : {}),
        ...(order ? { order } : {}),
    };
    const result = harness.controller.compose(selections);
    return {
        captures,
        marker,
        result,
    };
}

function run(ctx) {
    const s = createSuite("classical_clause_relation_particle_result");

    s.eq(
        "a copied application owner cannot authorize a Lesson 4-shaped fake without an owner-issued frame",
        (() => {
            const hostileHarness = createControllerHarness(ctx);
            const receipt = hostileHarness.issueUnit({
                id: "hostile-shaped-lesson4",
                surface: "forged",
                unitKind: "vnc",
                mood: "indicative",
                tense: "present",
            });
            return {
                authorizationStatus: receipt.authorizationStatus,
                blockReason: receipt.blockReason,
                canonicalResult: receipt.canonicalResult,
            };
        })(),
        {
            authorizationStatus: "blocked",
            blockReason:
                "classical-grammar-application-canonical-runtime-required",
            canonicalResult: null,
        }
    );

    s.eq(
        "main particle action and renderer use the same canonical scalar route with independent projections",
        (() => {
            const verbControl = ctx.document.getElementById("verb");
            const previousValue = verbControl.value;
            const previousMode = ctx.TenseModeState.mode;
            try {
                ctx.setActiveTenseMode(ctx.TENSE_MODE.particula);
                verbControl.value = "ma zo";
                const actionResult =
                    ctx.generateNuclearClauseSurface({ silent: true });
                const renderedResult =
                    ctx.renderParticleModeConjugations({
                        candidate: "ma zo",
                    });
                verbControl.value = "(nemi)";
                const blockedAction =
                    ctx.generateNuclearClauseSurface({ silent: true });
                const blockedRender =
                    ctx.renderParticleModeConjugations({
                        candidate: "(nemi)",
                    });
                const summarize = result => ({
                    canonical:
                        ctx.isClassicalNahuatlParticleResultFrame(
                            result
                        ),
                    particleId: result?.particleId || "",
                    formula: result?.formulaRecord?.formula || "",
                    formulaParticleId:
                        result?.formulaRecord?.formulaSlots?.particle
                            ?.particleId || "",
                    written:
                        result?.formulaRealizationRecord?.surface || "",
                    surface: result?.surface || "",
                    formulaRecordBound:
                        result?.grammarFrame?.resultFrame?.formulaRecord
                            === result?.formulaRecord,
                    writtenRecordBound:
                        result?.grammarFrame?.resultFrame
                            ?.formulaRealizationRecord
                            === result?.formulaRealizationRecord,
                    distinctProjectionRecords:
                        result?.formulaRecord
                            !== result?.formulaRealizationRecord,
                });
                return {
                    action: summarize(actionResult),
                    rendered: summarize(renderedResult),
                    exactNegative: [
                        blockedAction,
                        blockedRender,
                    ],
                };
            } finally {
                verbControl.value = previousValue;
                ctx.TenseModeState.mode = previousMode;
            }
        })(),
        {
            action: {
                canonical: true,
                particleId: "l3-ma-zo",
                formula: "mā zo",
                formulaParticleId: "l3-ma-zo",
                written: "mā zo",
                surface: "mā zo",
                formulaRecordBound: true,
                writtenRecordBound: true,
                distinctProjectionRecords: true,
            },
            rendered: {
                canonical: true,
                particleId: "l3-ma-zo",
                formula: "mā zo",
                formulaParticleId: "l3-ma-zo",
                written: "mā zo",
                surface: "mā zo",
                formulaRecordBound: true,
                writtenRecordBound: true,
                distinctProjectionRecords: true,
            },
            exactNegative: [null, null],
        }
    );

    s.eq(
        "production particle paths no longer invoke the diagnostic display model",
        (() => {
            const root = path.resolve(__dirname, "../..");
            const vncSource = fs.readFileSync(
                path.join(root, "src/core/vnc/vnc.mjs"),
                "utf8"
            );
            const rendererSource = fs.readFileSync(
                path.join(root, "src/ui/rendering/rendering.mjs"),
                "utf8"
            );
            return {
                vncDiagnosticBypass:
                    vncSource.includes("buildParticleModeDisplayModel"),
                rendererDiagnosticBypass:
                    rendererSource.includes("buildParticleModeDisplayModel"),
                vncCanonicalRequest:
                    vncSource.includes("requestClassicalParticleResult"),
                rendererCanonicalRequest:
                    rendererSource.includes(
                        "requestClassicalParticleResult"
                    ),
            };
        })(),
        {
            vncDiagnosticBypass: false,
            rendererDiagnosticBypass: false,
            vncCanonicalRequest: true,
            rendererCanonicalRequest: true,
        }
    );

    s.eq(
        "Lesson 3 issues exact standalone particle Results from typed particle identity",
        (() => {
            const options =
                ctx.getClassicalNahuatlClauseRelationMarkerOptions();
            const sources = [
                "l3-in-tla",
                "l3-ma-zo",
                "l3-ca",
            ].map(particleId => (
                ctx.buildClassicalNahuatlParticleSourceFrame(particleId)
            ));
            const [inTla, maZo, ca] = sources.map(sourceFrame => (
                ctx.requestClassicalParticleResult(sourceFrame)
            ));
            const capture =
                ctx.captureClassicalGrammarApplicationResult(
                    inTla,
                    "marker"
                );
            const copied = { ...inTla };
            const copiedCapture =
                ctx.captureClassicalGrammarApplicationResult(
                    copied,
                    "marker"
                );
            return {
                sources: sources.map(sourceFrame => (
                    ctx.isClassicalNahuatlParticleSourceFrame(sourceFrame)
                )),
                optionIds: options.map(option => [
                    option.particleId,
                    option.semanticMarker,
                    option.sourceForm,
                ]),
                results: [inTla, maZo, ca].map(result => ({
                    authorized: result.authorizationStatus,
                    canonical:
                        ctx.isClassicalNahuatlParticleResultFrame(
                            result
                        ),
                    particleId: result.particleId,
                    marker: result.semanticMarker,
                    formula:
                        result.grammarFrame.resultFrame.formulaRecord.formula,
                    formulaParticleId:
                        result.grammarFrame.resultFrame.formulaRecord
                            .formulaSlots.particle.particleId,
                    unit: result.grammarFrame.unitFrame.unitKind,
                    surface: result.grammarFrame.resultFrame
                        .formulaRealizationRecord.surface,
                    frozen: Object.isFrozen(result.grammarFrame.unitFrame),
                })),
                capture: [
                    capture.authorizationStatus,
                    ctx.isClassicalGrammarApplicationResultCapture(
                        capture,
                        "marker"
                    ),
                ],
                copied: [
                    ctx.isClassicalNahuatlParticleResultFrame(copied),
                    copiedCapture.authorizationStatus,
                ],
            };
        })(),
        {
            sources: [true, true, true],
            optionIds: [
                ["l3-ca", "ca", "ca"],
                ["l3-cuix", "cuix", "cuix"],
                ["l3-tla", "tla", "tlā"],
                ["l3-ma", "ma", "mā"],
                ["l3-e-vocative", "vocative-e", "#e"],
                ["l3-in", "in", "in"],
                ["l3-mah", "mah", "mah"],
                ["l3-ahzo", "ahzo", "ahzo"],
                ["l3-in-tla", "in-tla", "in tlā"],
                ["l3-ma-zo", "ma-zo", "mā zo"],
                ["l3-ma-zo-tel", "ma-zo-tel", "mā zo tēl"],
                ["l58-ahmo", "ahmo", "ahmō"],
                ["l58-mah-ca", "mah-ca", "mah ca#"],
                ["l58-quemah", "frozen-quemah", "quēmah"],
                ["l58-quemahca", "frozen-quemahca", "quemahca"],
                ["l58-oc-eh", "haste-collocation", "oc eh"],
                ["l58-tia-oc-eh", "haste-collocation", "tiā oc eh"],
                ["l58-ma-oc-eh", "haste-collocation", "mā oc eh"],
                ["l58-tia-cuel", "haste-collocation", "tiā cuēl"],
                ["l58-tia-cuel-eh", "haste-collocation", "tiā cuēl eh"],
                [
                    "l58-tia-cuel-ehhuatl",
                    "haste-collocation",
                    "tiā cuēl ehhuātl",
                ],
                ["l58-ma-cuel", "haste-collocation", "mā cuēl"],
                ["l58-ma-cuel-eh", "haste-collocation", "mā cuēl eh"],
                [
                    "l58-ma-cuel-ehhuatl",
                    "haste-collocation",
                    "mā cuēl ehhuātl",
                ],
                ["l58-ma-ye-cuel", "haste-collocation", "mā ye cuēl"],
                [
                    "l58-ma-ye-cuel-eh",
                    "haste-collocation",
                    "mā ye cuēl eh",
                ],
                ["l58-tia-ye-cuel", "haste-collocation", "tiā ye cuēl"],
                [
                    "l58-tia-ye-cuel-eh",
                    "haste-collocation",
                    "tiā ye cuēl eh",
                ],
            ],
            results: [
                {
                    authorized: "authorized",
                    canonical: true,
                    particleId: "l3-in-tla",
                    marker: "in-tla",
                    formula: "in tlā",
                    formulaParticleId: "l3-in-tla",
                    unit: "particle",
                    surface: "in tlā",
                    frozen: true,
                },
                {
                    authorized: "authorized",
                    canonical: true,
                    particleId: "l3-ma-zo",
                    marker: "ma-zo",
                    formula: "mā zo",
                    formulaParticleId: "l3-ma-zo",
                    unit: "particle",
                    surface: "mā zo",
                    frozen: true,
                },
                {
                    authorized: "authorized",
                    canonical: true,
                    particleId: "l3-ca",
                    marker: "ca",
                    formula: "ca",
                    formulaParticleId: "l3-ca",
                    unit: "particle",
                    surface: "ca",
                    frozen: true,
                },
            ],
            capture: ["authorized", true],
            copied: [false, "blocked"],
        }
    );

    s.eq(
        "controller marker profiles are semantic relation constraints rather than Lesson 3 display strings",
        {
            condition:
                ctx.getClassicalClauseRelationMarkerProfiles("condition"),
            concession:
                ctx.getClassicalClauseRelationMarkerProfiles("concession"),
            reason: ctx.getClassicalClauseRelationMarkerProfiles("reason"),
            time: ctx.getClassicalClauseRelationMarkerProfiles("time"),
        },
        {
            condition: ["tla", "in-tla"],
            concession: [
                "in-tla-nel",
                "in-ma-nel",
                "ma-nel",
                "ma-zo",
                "ma-zo-tel",
            ],
            reason: ["ca"],
            time: [],
        }
    );

    s.eq(
        "a copied application owner cannot recapture particle or clause Results for marked composition",
        (() => {
            const condition = composeMarkedScenario(ctx, {
                relation: "condition",
                markerId: "l3-in-tla",
                relationProfile: "open",
                adjoinedUnitKind: "vnc",
                adjoinedMood: "optative",
                adjoinedTense: "nonpast",
                order: "modifier-head",
            });
            const concession = composeMarkedScenario(ctx, {
                relation: "concession",
                markerId: "l3-ma-zo",
                relationProfile: "ma-zo",
                adjoinedUnitKind: "vnc",
                order: "modifier-head",
            });
            const reason = composeMarkedScenario(ctx, {
                relation: "reason",
                markerId: "l3-ca",
                adjoinedUnitKind: "sentence",
                order: "head-modifier",
            });
            return [condition, concession, reason].map(scenario => ({
                captures: scenario.captures.map(capture => (
                    capture.authorizationStatus
                )),
                markerCanonical:
                    ctx.isClassicalNahuatlParticleResultFrame(
                        scenario.marker
                    ),
                status: scenario.result.authorizationStatus,
                relation:
                    scenario.result.canonicalResult?.ruleProfile?.relation,
                marking:
                    scenario.result.canonicalResult?.ruleProfile?.marking,
                unit:
                    scenario.result.canonicalResult?.ruleProfile?.unitType,
                surface: scenario.result.presentation.surface,
            }));
        })(),
        [
            {
                captures: ["blocked", "blocked", "blocked"],
                markerCanonical: false,
                status: "blocked",
                relation: undefined,
                marking: undefined,
                unit: undefined,
                surface: "",
            },
            {
                captures: ["blocked", "blocked", "blocked"],
                markerCanonical: false,
                status: "blocked",
                relation: undefined,
                marking: undefined,
                unit: undefined,
                surface: "",
            },
            {
                captures: ["blocked", "blocked", "blocked"],
                markerCanonical: false,
                status: "blocked",
                relation: undefined,
                marking: undefined,
                unit: undefined,
                surface: "",
            },
        ]
    );

    s.eq(
        "the exact issued late VNC closure remains the capturable current source identity",
        (() => {
            const late = ctx.requestClassicalLateVncOperation({
                sourceStem: "chōca",
                sourceValence: "intransitive",
                verbClass: "A",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                derivationType: "direct",
                voice: "active",
                lateOperation: "frequentative",
                lateVariant: "ordinary-long",
                frequentativeRepetitions: 2,
            });
            const source =
                ctx.getCanonicalAdverbialAdjunctionSourceUnit(
                    late,
                    "principal"
                );
            const copied = { ...late };
            const copiedSource =
                ctx.getCanonicalAdverbialAdjunctionSourceUnit(
                    copied,
                    "principal"
                );
            const capture =
                ctx.captureClassicalGrammarApplicationResult(
                    late,
                    "principal"
                );
            return {
                closure: [
                    late.authorizationStatus,
                    ctx.isClassicalNahuatlClosureFrame(late),
                ],
                source: [
                    source.ok,
                    source.sourceKind,
                    source.features.unitKind,
                    source.surface === late.surfaceRealization,
                    source.features.mood,
                    source.features.tense,
                ],
                capture: [
                    capture.authorizationStatus,
                    ctx.isClassicalGrammarApplicationResultCapture(
                        capture,
                        "principal"
                    ),
                ],
                copied: [
                    ctx.isClassicalNahuatlClosureFrame(copied),
                    copiedSource.ok,
                    copiedSource.sourceKind,
                ],
            };
        })(),
        {
            closure: ["authorized", true],
            source: [
                true,
                "issued-late-vnc-closure-result",
                "vnc",
                true,
                "indicative",
                "present",
            ],
            capture: ["authorized", true],
            copied: [false, false, "untrusted"],
        }
    );

    s.eq(
        "unknown IDs and caller display or surface copies cannot issue marker authority",
        (() => {
            const missing =
                ctx.requestClassicalParticleResult(
                    ctx.buildClassicalNahuatlParticleSourceFrame(
                        "l3-fabricated-marker"
                    )
                );
            const issued = ctx.requestClassicalParticleResult(
                ctx.buildClassicalNahuatlParticleSourceFrame("l3-ca")
            );
            const displayCopy = {
                ...issued,
                particleId: "l3-ca",
                semanticMarker: "ca",
                surface: "ca",
                display: "ca",
            };
            return {
                missing: [
                    missing.authorizationStatus,
                    missing.blockReason,
                ],
                displayCopyCanonical:
                    ctx.isClassicalNahuatlParticleResultFrame(
                        displayCopy
                    ),
                displayCopyCapture:
                    ctx.captureClassicalGrammarApplicationResult(
                        displayCopy,
                        "marker"
                    ).authorizationStatus,
            };
        })(),
        {
            missing: [
                "blocked",
                "classical-particle-identity-not-licensed",
            ],
            displayCopyCanonical: false,
            displayCopyCapture: "blocked",
        }
    );

    return s;
}

module.exports = { run };
