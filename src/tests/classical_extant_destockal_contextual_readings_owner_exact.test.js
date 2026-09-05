"use strict";

const { createSuite } = require("./runner");

// The test context must include the two private irregular-source projection
// functions from createClassicalVncDerivationValidationSemanticOperationsApi(ctx).
// They are test dependencies, not new public runtime capabilities. Owner receipt
// payloads are sanitized observations and cannot replace these issued frames.

const OWNER = "classical-destockal-irregular-source-lifecycle";
const PREFIX = "ClassicalDestockalIrregularSourceLifecycle";
const BASE = "constraints.destockalIrregularSourceLifecycle"
    + ".extantFusedContextualReadings";

const CASES = [
    {
        key: "xini-wall",
        selection: "claim-p2343-context-xini-wall",
        facet: "aci-p204-l003-429a0e8ace-04-xini-collapse-wall-contextual-selection",
        relationKind: "source",
        meaningId: "collapse-wall",
        referents: ["wall"],
        available: [
            ["collapse-wall", "wall"],
            ["slide-or-collapse-mountainside", "mountainside"],
        ],
        formula: "#0-0(xī-ni)0+0-0#",
        surface: "xīni",
    },
    {
        key: "xini-mountainside",
        selection: "claim-p2343-context-xini-mountainside",
        facet: "aci-p204-l003-429a0e8ace-05-xini-slide-or-collapse-mountainside-contextual-selection",
        relationKind: "source",
        meaningId: "slide-or-collapse-mountainside",
        referents: ["mountainside"],
        available: [
            ["collapse-wall", "wall"],
            ["slide-or-collapse-mountainside", "mountainside"],
        ],
        formula: "#0-0(xī-ni)0+0-0#",
        surface: "xīni",
    },
    {
        key: "cehui-fire",
        selection: "claim-p2343-context-cehui-fire",
        facet: "aci-p204-l004-ae01b03f8b-04-cehui-go-out-fire-contextual-selection",
        relationKind: "source",
        meaningId: "go-out-fire",
        referents: ["fire"],
        available: [
            ["become-cold", ""],
            ["go-out-fire", "fire"],
        ],
        formula: "#0-0(cē-hui)0+0-0#",
        surface: "cēhui",
    },
    {
        key: "xini-stitches",
        selection: "claim-p2343-context-xini-stitches",
        facet: "aci-p204-l003-429a0e8ace-09-xini-rip-out-stitches-contextual-selection",
        relationKind: "causative",
        meaningId: "rip-out-stitches",
        referents: ["stitches"],
        available: [
            ["ravel", ""],
            ["rip-out-stitches", "stitches"],
        ],
        formula: "#ni-0+tla(xī-ni-a)0+0-0#",
        surface: "nitlaxīnia",
    },
    {
        key: "cehui-flame",
        selection: "claim-p2343-context-cehui-flame",
        facet: "aci-p204-l004-ae01b03f8b-09-cehui-extinguish-flame-contextual-selection",
        relationKind: "causative",
        meaningId: "extinguish-flame",
        referents: ["fire", "candle-flame", "flame"],
        available: [
            ["cause-to-become-cold", ""],
            ["chill", ""],
            ["extinguish-flame", "fire-or-flame"],
        ],
        formula: "#ni-0+tla(cē-hui-a)0+0-0#",
        surface: "nitlacēhuia",
    },
];

const FIRE_OR_FLAME = new Set([
    "fire", "candle-flame", "flame", "fire-or-flame",
]);

function expectedContextStatus(requiredReferentKind, suppliedReferentKind) {
    if (!requiredReferentKind) return "not-required";
    if (requiredReferentKind === "fire-or-flame") {
        return FIRE_OR_FLAME.has(suppliedReferentKind) ? "matched" : "not-matched";
    }
    return requiredReferentKind === suppliedReferentKind ? "matched" : "not-matched";
}

function expectedSupportedIds(row, referentKind) {
    return row.available
        .filter(([, requirement]) => (
            ["matched", "not-required"].includes(
                expectedContextStatus(requirement, referentKind),
            )
        ))
        .map(([meaningId]) => meaningId);
}

function summarizeObservationContent(observation) {
    return [
        observation.authorizationStatus,
        observation.blockReason,
        observation.kind,
        observation.meaningFrame?.relationKind,
        observation.participantBinding?.bindingRole,
        observation.context?.referentKind,
        observation.context?.evidenceSource,
        observation.resolvedReadings.map(item => [
            item.reading.meaningId,
            item.contextStatus,
            item.supported,
        ]),
        observation.supportedReadings.map(reading => reading.meaningId),
        observation.selectedReading,
        observation.selectedResolution?.reading.meaningId || "",
        observation.selectedResolution?.contextStatus || "",
        observation.selectedResolution?.supported === true,
        observation.meaningAssertionStatus,
        observation.contextAloneSelectsReading,
        observation.contextChangesParticipantFacts,
        observation.changesFiniteMorphology,
        observation.sourceAdmissionAuthority,
        observation.grammarGenerationAuthority,
        observation.formulaStringAuthority,
        observation.surfaceStringAuthority,
        observation.formulaRealization,
        observation.surfaceRealization,
    ];
}

function expectedObservationContent(row, referentKind) {
    return [
        "authorized",
        "",
        "classical-nahuatl-extant-destockal-contextual-reading-frame",
        row.relationKind,
        row.relationKind === "source" ? "source-subject" : "transformed-causee",
        referentKind,
        "caller-supplied-context-not-independent-world-evidence",
        row.available.map(([meaningId, requirement]) => {
            const contextStatus = expectedContextStatus(requirement, referentKind);
            return [
                meaningId,
                contextStatus,
                ["matched", "not-required"].includes(contextStatus),
            ];
        }),
        expectedSupportedIds(row, referentKind),
        row.meaningId,
        row.meaningId,
        "matched",
        true,
        "selected-not-truth-asserted",
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        row.formula,
        row.surface,
    ];
}

function summarizeCanonicalObservation(ctx, observation, meaningFrame) {
    return [
        ctx.isClassicalNahuatlExtantDestockalReadingFrame(observation),
        observation.meaningFrame === meaningFrame,
        observation.participantBinding === meaningFrame.participantBinding,
        observation.context?.participantFrame
            === meaningFrame.participantBinding.participantFrame,
        observation.resolvedReadings.every(item => (
            item.participantBinding === meaningFrame.participantBinding
            && meaningFrame.availableReadings.includes(item.reading)
        )),
        Object.isFrozen(observation),
        summarizeObservationContent(observation),
    ];
}

function expectedCanonicalObservation(row, referentKind) {
    return [
        true,
        true,
        true,
        true,
        true,
        true,
        expectedObservationContent(row, referentKind),
    ];
}

function buildSourceMeaningFrame(ctx, sourceSubject) {
    const applicationFrame = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "xī-ni",
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject,
        subject: sourceSubject,
        objectKind: "none",
        objectPerson: "",
        sourceVoice: "active",
        requestedDerivation: "direct",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
    });
    return {
        applicationFrame,
        meaningFrame: ctx.buildClassicalNahuatlExtantDestockalMeaningFrame({
            applicationFrame,
        }),
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_extant_destockal_contextual_readings_owner_exact");
    const receipt = row => {
        const source = ctx[`build${PREFIX}Source`]({
            analysisDomain: OWNER,
            selection: row.selection,
            requestedFacet: row.facet,
            participantChoice: `${row.selection}:${row.facet}`,
        });
        const result = ctx[`evaluate${PREFIX}`](source);
        return {
            source,
            result,
            evidence: ctx[`get${PREFIX}ExecutionEvidence`](result),
            value: result.payload?.facetValue || null,
        };
    };

    const receipts = CASES.map(receipt);
    CASES.forEach((row, index) => {
        const { result, evidence, value } = receipts[index];
        const meaningFrame = value?.meaningFrame;
        s.eq(`${row.facet} directly observes contextual selection`, [
            result.authorizationStatus,
            result.payload?.effectiveCanonicalPath,
            result.payload?.sourceCanonicalPath,
            result.payload?.proofObservationKind,
            ctx[`is${PREFIX}Result`](result),
            ctx[`is${PREFIX}ExecutionEvidence`](evidence, result),
            meaningFrame?.relationKind,
            meaningFrame?.participantBinding?.bindingRole,
            value?.observations?.length,
            value?.observations?.map(observation => (
                summarizeObservationContent(observation)
            )),
            Object.isFrozen(value),
        ], [
            "authorized",
            `${BASE}.${row.key}`,
            `${BASE}.${row.key}`,
            "direct-canonical-result-observation",
            true,
            true,
            row.relationKind,
            row.relationKind === "source" ? "source-subject" : "transformed-causee",
            row.referents.length,
            row.referents.map(referentKind => (
                expectedObservationContent(row, referentKind)
            )),
            true,
        ]);
    });

    const rawProjections = CASES.map(row => (
        ctx.buildClassicalNahuatlDestockalIrregularSourceValidationFrame({
            requestedRelation: "extant-fused-contextual-reading",
            sourceSelection: row.key,
        })
    ));
    const valuesByKey = Object.fromEntries(CASES.map((row, index) => [
        row.key,
        rawProjections[index].constraints.destockalIrregularSourceLifecycle
            .extantFusedContextualReadings[row.key],
    ]));
    CASES.forEach((row, index) => {
        const projection = rawProjections[index];
        const value = valuesByKey[row.key];
        const meaningFrame = value.meaningFrame;
        s.eq(`${row.key}: runtime projection retains issued contextual frames`, [
            projection.authorizationStatus,
            ctx.isClassicalNahuatlDestockalIrregularSourceValidationFrame(projection),
            ctx.isClassicalNahuatlExtantDestockalMeaningFrame(meaningFrame),
            meaningFrame.relationKind,
            meaningFrame.participantBinding.bindingRole,
            value.observations.length,
            value.observations.map(observation => (
                summarizeCanonicalObservation(ctx, observation, meaningFrame)
            )),
            Object.isFrozen(value),
        ], [
            "authorized",
            true,
            true,
            row.relationKind,
            row.relationKind === "source" ? "source-subject" : "transformed-causee",
            row.referents.length,
            row.referents.map(referentKind => (
                expectedCanonicalObservation(row, referentKind)
            )),
            true,
        ]);
    });

    CASES.forEach(row => {
        const meaningFrame = valuesByKey[row.key].meaningFrame;
        const contextualFrames = row.referents.map(referentKind => (
            ctx.interpretClassicalNahuatlExtantDestockalReading({
                meaningFrame,
                context: {
                    participantFrame: meaningFrame.participantBinding.participantFrame,
                    referentKind,
                },
            })
        ));
        s.eq(`${row.key}: supplied context alone does not select a reading`, (
            contextualFrames.map((frame, index) => [
                frame.authorizationStatus,
                ctx.isClassicalNahuatlExtantDestockalReadingFrame(frame),
                frame.context?.referentKind,
                frame.supportedReadings.map(reading => reading.meaningId),
                frame.resolvedReadings.map(item => [item.reading.meaningId, item.contextStatus]),
                frame.selectedReading,
                frame.selectedResolution,
                frame.meaningAssertionStatus,
                frame.contextAloneSelectsReading,
                frame.meaningFrame.availableReadings === meaningFrame.availableReadings,
                frame.resolvedReadings.every(item => (
                    meaningFrame.availableReadings.includes(item.reading)
                )),
            ])
        ), row.referents.map(referentKind => [
            "authorized",
            true,
            referentKind,
            expectedSupportedIds(row, referentKind),
            row.available.map(([meaningId, requirement]) => [
                meaningId,
                expectedContextStatus(requirement, referentKind),
            ]),
            "",
            null,
            "available-not-asserted",
            false,
            true,
            true,
        ]));
    });

    CASES.forEach(row => {
        const meaningFrame = valuesByKey[row.key].meaningFrame;
        const referentKind = row.referents[0];
        const selected = ctx.interpretClassicalNahuatlExtantDestockalReading({
            meaningFrame,
            context: {
                participantFrame: meaningFrame.participantBinding.participantFrame,
                referentKind,
            },
            requestedReading: row.meaningId,
        });
        s.eq(`${row.key}: exact requested reading is supported by actual context`, (
            summarizeCanonicalObservation(ctx, selected, meaningFrame)
        ), expectedCanonicalObservation(row, referentKind));
    });

    const flameRow = CASES.find(row => row.key === "cehui-flame");
    const flameMeaningFrame = valuesByKey[flameRow.key].meaningFrame;
    s.eq("fire-or-flame accepts only its explicit fire and flame family", (
        [...FIRE_OR_FLAME].map(referentKind => {
            const frame = ctx.interpretClassicalNahuatlExtantDestockalReading({
                meaningFrame: flameMeaningFrame,
                context: {
                    participantFrame:
                        flameMeaningFrame.participantBinding.participantFrame,
                    referentKind,
                },
                requestedReading: flameRow.meaningId,
            });
            return [
                referentKind,
                frame.authorizationStatus,
                frame.selectedResolution?.contextStatus,
                frame.selectedReading,
            ];
        })
    ), [...FIRE_OR_FLAME].map(referentKind => [
        referentKind, "authorized", "matched", "extinguish-flame",
    ]));

    const generalSelections = [
        [valuesByKey["cehui-fire"].meaningFrame, "become-cold", ["become-cold"]],
        [valuesByKey["xini-stitches"].meaningFrame, "ravel", ["ravel"]],
        [valuesByKey["cehui-flame"].meaningFrame, "chill",
            ["cause-to-become-cold", "chill"]],
    ];
    s.eq("general readings need no contextual referent", (
        generalSelections.map(([meaningFrame, requestedReading]) => {
            const frame = ctx.interpretClassicalNahuatlExtantDestockalReading({
                meaningFrame,
                requestedReading,
            });
            return [
                frame.authorizationStatus,
                frame.context,
                frame.selectedReading,
                frame.selectedResolution?.contextStatus,
                frame.supportedReadings.map(reading => reading.meaningId),
                frame.meaningAssertionStatus,
            ];
        })
    ), generalSelections.map(([, requestedReading, supported]) => [
        "authorized",
        null,
        requestedReading,
        "not-required",
        supported,
        "selected-not-truth-asserted",
    ]));

    const unsupportedNarrow = [
        [valuesByKey["cehui-fire"].meaningFrame, "go-out-fire", "", ["become-cold"]],
        [valuesByKey["xini-stitches"].meaningFrame, "rip-out-stitches", "fire", ["ravel"]],
        [valuesByKey["cehui-flame"].meaningFrame, "extinguish-flame", "wall",
            ["cause-to-become-cold", "chill"]],
    ];
    s.eq("missing or wrong context blocks only the requested narrow reading", (
        unsupportedNarrow.map(([meaningFrame, requestedReading, referentKind]) => {
            const frame = ctx.interpretClassicalNahuatlExtantDestockalReading({
                meaningFrame,
                ...(referentKind ? {
                    context: {
                        participantFrame: meaningFrame.participantBinding.participantFrame,
                        referentKind,
                    },
                } : {}),
                requestedReading,
            });
            return [
                frame.authorizationStatus,
                frame.blockReason,
                frame.selectedReading,
                frame.meaningAssertionStatus,
                frame.supportedReadings.map(reading => reading.meaningId),
                frame.resolvedReadings.length === meaningFrame.availableReadings.length,
                frame.sourceAdmissionAuthority,
                frame.grammarGenerationAuthority,
            ];
        })
    ), unsupportedNarrow.map(([, , , supported]) => [
        "blocked",
        "extant-destockal-reading-required-context-not-supported",
        "",
        "available-not-asserted",
        supported,
        true,
        false,
        false,
    ]));

    const mountainRow = CASES.find(row => row.key === "xini-mountainside");
    const mountainMeaningFrame = valuesByKey[mountainRow.key].meaningFrame;
    const mountainAlias = ctx.interpretClassicalNahuatlExtantDestockalReading({
        meaningFrame: mountainMeaningFrame,
        context: {
            participantFrame: mountainMeaningFrame.participantBinding.participantFrame,
            referentKind: "mountain",
        },
        requestedReading: mountainRow.meaningId,
    });
    s.eq("mountainside is source-exact and is not widened to mountain", [
        mountainAlias.authorizationStatus,
        mountainAlias.blockReason,
        mountainAlias.resolvedReadings.map(item => [
            item.reading.meaningId, item.contextStatus,
        ]),
    ], [
        "blocked",
        "extant-destockal-reading-required-context-not-supported",
        [
            ["collapse-wall", "not-matched"],
            ["slide-or-collapse-mountainside", "not-matched"],
        ],
    ]);

    const wallMeaningFrame = valuesByKey["xini-wall"].meaningFrame;
    const stitchesMeaningFrame = valuesByKey["xini-stitches"].meaningFrame;
    const copiedParticipant = JSON.parse(JSON.stringify(
        wallMeaningFrame.participantBinding.participantFrame,
    ));
    const participantHostiles = [
        [wallMeaningFrame, copiedParticipant, "wall", "collapse-wall"],
        [wallMeaningFrame,
            valuesByKey["cehui-fire"].meaningFrame.participantBinding.participantFrame,
            "wall", "collapse-wall"],
        [stitchesMeaningFrame,
            stitchesMeaningFrame.participantBinding.participantProjection.targetSubject,
            "stitches", "rip-out-stitches"],
        [stitchesMeaningFrame,
            stitchesMeaningFrame.participantBinding.sourceSubjectFrame,
            "stitches", "rip-out-stitches"],
    ];
    s.eq("copied, foreign, causer, and source-subject participants cannot replace the causee", (
        participantHostiles.map(([meaningFrame, participantFrame, referentKind,
            requestedReading]) => {
            const frame = ctx.interpretClassicalNahuatlExtantDestockalReading({
                meaningFrame,
                context: { participantFrame, referentKind },
                requestedReading,
            });
            return [
                frame.authorizationStatus,
                frame.blockReason,
                frame.context,
                frame.selectedReading,
                frame.participantBinding === meaningFrame.participantBinding,
            ];
        })
    ), participantHostiles.map(() => [
        "blocked",
        "extant-destockal-reading-exact-participant-required",
        null,
        "",
        true,
    ]));

    const copiedMeaningFrame = JSON.parse(JSON.stringify(wallMeaningFrame));
    const authorizedWall = valuesByKey["xini-wall"].observations[0];
    const provenanceHostiles = [
        ctx.interpretClassicalNahuatlExtantDestockalReading({
            meaningFrame: copiedMeaningFrame,
            context: {
                participantFrame: copiedMeaningFrame.participantBinding.participantFrame,
                referentKind: "wall",
            },
            requestedReading: "collapse-wall",
        }),
        ctx.interpretClassicalNahuatlExtantDestockalReading({
            meaningFrame: wallMeaningFrame,
            context: {
                participantFrame: wallMeaningFrame.participantBinding.participantFrame,
                referentKind: "wall",
            },
            requestedReading: "ravel",
        }),
        ctx.interpretClassicalNahuatlExtantDestockalReading({
            meaningFrame: wallMeaningFrame,
            context: {
                participantFrame: wallMeaningFrame.participantBinding.participantFrame,
                referentKind: "wall",
            },
            requestedReading: 1,
        }),
        ctx.interpretClassicalNahuatlExtantDestockalReading({
            meaningFrame: wallMeaningFrame,
            context: {
                participantFrame: wallMeaningFrame.participantBinding.participantFrame,
                referentKind: "wall",
            },
            requestedReading: "collapse-wall",
            formulaStringAuthority: true,
        }),
        ctx.interpretClassicalNahuatlExtantDestockalReading({
            meaningFrame: wallMeaningFrame,
            context: {
                participantFrame: wallMeaningFrame.participantBinding.participantFrame,
                referentKind: "wall",
                sourceAdmissionAuthority: true,
            },
            requestedReading: "collapse-wall",
        }),
    ];
    s.eq("copies, unlicensed readings, malformed selections, and authority fields are blocked", [
        provenanceHostiles.map(frame => [frame.authorizationStatus, frame.blockReason]),
        ctx.isClassicalNahuatlExtantDestockalReadingFrame(
            JSON.parse(JSON.stringify(authorizedWall)),
        ),
    ], [
        [
            ["blocked", "owner-issued-extant-destockal-meaning-required"],
            ["blocked", "extant-destockal-reading-not-licensed"],
            ["blocked", "extant-destockal-reading-selection-must-be-text"],
            ["blocked", "extant-destockal-reading-accepts-typed-context-and-selection-only"],
            ["blocked", "extant-destockal-reading-context-shape-invalid"],
        ],
        false,
    ]);

    const authorizedObservations = Object.values(valuesByKey)
        .flatMap(value => value.observations);
    s.eq("context interpretation cannot change participants, words, formulas, or grammar authority", (
        authorizedObservations.map(frame => [
            frame.participantBinding.referentKind,
            frame.participantBinding.referentResolutionStatus,
            frame.participantBinding.agreementDoesNotResolveReferent,
            frame.participantBinding.objectKindDoesNotResolveReferent,
            frame.contextChangesParticipantFacts,
            frame.changesFiniteMorphology,
            frame.formulaRealization === frame.meaningFrame.formulaRealization,
            frame.surfaceRealization === frame.meaningFrame.surfaceRealization,
            frame.sourceAdmissionAuthority,
            frame.grammarGenerationAuthority,
            frame.formulaStringAuthority,
            frame.surfaceStringAuthority,
        ])
    ), authorizedObservations.map(() => [
        "", "unresolved", true, true, false, false, true, true,
        false, false, false, false,
    ]));

    const animateThird = buildSourceMeaningFrame(ctx, "3sg");
    const humanFirst = buildSourceMeaningFrame(ctx, "1sg");
    s.eq("wall context preserves unspecified animacy but cannot rewrite a known human", (
        [animateThird, humanFirst].map(({ applicationFrame, meaningFrame }) => {
            const interpreted = ctx.interpretClassicalNahuatlExtantDestockalReading({
                meaningFrame,
                context: {
                    participantFrame: meaningFrame.participantBinding.participantFrame,
                    referentKind: "wall",
                },
                requestedReading: "collapse-wall",
            });
            return [
                applicationFrame.authorizationStatus,
                meaningFrame.authorizationStatus,
                meaningFrame.participantBinding.participantFrame.animacy,
                meaningFrame.participantBinding.participantFrame.humanness,
                interpreted.authorizationStatus,
                interpreted.blockReason,
                interpreted.context?.participantFrame
                    === meaningFrame.participantBinding.participantFrame,
                interpreted.context?.referentKind || "",
                interpreted.selectedReading,
                interpreted.contextChangesParticipantFacts,
            ];
        })
    ), [
        [
            "authorized", "authorized", "animate", "unspecified",
            "authorized", "", true, "wall", "collapse-wall", false,
        ],
        [
            "authorized", "authorized", "animate", "human",
            "blocked", "extant-destockal-reading-context-conflicts-with-participant",
            false, "", "", false,
        ],
    ]);

    return s;
}

module.exports = { run };
