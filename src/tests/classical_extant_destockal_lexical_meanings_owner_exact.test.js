"use strict";

const { createSuite } = require("./runner");

const OWNER = "classical-destockal-irregular-source-lifecycle";
const PREFIX = "ClassicalDestockalIrregularSourceLifecycle";
const BASE = "constraints.destockalIrregularSourceLifecycle";

const CASES = [
    {
        lexeme: "mini",
        stem: "mī-ni",
        targetStem: "mī-n-a",
        targetFormula: "#ni-0+tla(mī-n-a)0+0-0#",
        targetSurface: "nitlamīna",
        sourceReadings: [
            ["aci-p204-l002-61a69ed581-04-mini-arrow-pierced", "arrow-pierced", ""],
        ],
        targetReadings: [
            ["aci-p204-l002-61a69ed581-07-mini-pierce-with-arrow", "pierce-with-arrow", ""],
        ],
    },
    {
        lexeme: "xini",
        stem: "xī-ni",
        targetStem: "xī-ni-ā",
        targetFormula: "#ni-0+tla(xī-ni-a)0+0-0#",
        targetSurface: "nitlaxīnia",
        sourceReadings: [
            ["aci-p204-l003-429a0e8ace-04-xini-collapse-wall", "collapse-wall", "wall"],
            ["aci-p204-l003-429a0e8ace-05-xini-slide-or-collapse-mountainside", "slide-or-collapse-mountainside", "mountainside"],
        ],
        targetReadings: [
            ["aci-p204-l003-429a0e8ace-08-xini-ravel", "ravel", ""],
            ["aci-p204-l003-429a0e8ace-09-xini-rip-out-stitches", "rip-out-stitches", "stitches"],
        ],
    },
    {
        lexeme: "cehui",
        stem: "cē-hui",
        targetStem: "cē-hui-ā",
        targetFormula: "#ni-0+tla(cē-hui-a)0+0-0#",
        targetSurface: "nitlacēhuia",
        sourceReadings: [
            ["aci-p204-l004-ae01b03f8b-03-cehui-become-cold", "become-cold", ""],
            ["aci-p204-l004-ae01b03f8b-04-cehui-go-out-fire", "go-out-fire", "fire"],
        ],
        targetReadings: [
            ["aci-p204-l004-ae01b03f8b-07-cehui-cause-to-become-cold", "cause-to-become-cold", ""],
            ["aci-p204-l004-ae01b03f8b-08-cehui-chill", "chill", ""],
            ["aci-p204-l004-ae01b03f8b-09-cehui-extinguish-flame", "extinguish-flame", "fire-or-flame"],
        ],
    },
];

function buildSourceApplication(ctx, row, sourceStem = row.stem) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "3sg",
        objectKind: "none",
        objectPerson: "",
        sourceVoice: "active",
        requestedDerivation: "direct",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
    });
}

function buildImpersonalCausativeApplication(ctx, row) {
    const request = {
        sourceStem: row.stem,
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "1sg",
        objectKind: "none",
        objectPerson: "",
        sourceVoice: "impersonal",
        requestedDerivation: "causative",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
    };
    const sourcePreview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const sourceOption = sourcePreview.controlFrame?.sourceNonactiveOptionInventory
        ?.options?.find(option => option.suffixFamily === "hua");
    const derivationPreview = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        sourceNonactiveOptionId: sourceOption?.optionId || "missing-hua-source-option",
    });
    const derivationOption = derivationPreview.controlFrame?.derivationOptionInventory
        ?.options?.find(option => option.targetStem === row.targetStem
            && option.derivationSubtype === "type-one");
    return ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        sourceNonactiveOptionId: sourceOption?.optionId || "missing-hua-source-option",
        derivationOptionId: derivationOption?.optionId || "missing-exact-causative-option",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_extant_destockal_lexical_meanings_owner_exact");
    const receipt = (selection, facet) => {
        const source = ctx[`build${PREFIX}Source`]({
            analysisDomain: OWNER,
            selection,
            requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx[`evaluate${PREFIX}`](source);
        return {
            source,
            result,
            evidence: ctx[`get${PREFIX}ExecutionEvidence`](result),
        };
    };
    const expectedReadingSummary = (row, relationKind, meaningId, referent) => ({
        kind: "classical-nahuatl-extant-destockal-reading",
        readingId: `cn-l24-2459-${row.lexeme}-${meaningId}`,
        meaningId,
        meaning: meaningId,
        relation: relationKind === "source"
            ? "source-lexical-reading"
            : "causative-lexical-reading",
        availabilityStatus: "available-not-asserted",
        contextCondition: {
            kind: "classical-nahuatl-lexical-reading-context-condition",
            required: Boolean(referent),
            requiredReferentKind: referent,
            resolutionStatus: referent ? "unmet-or-unknown" : "not-required",
            participantRole: relationKind === "source"
                ? "source-subject"
                : "transformed-causee",
        },
    });
    const summarizeReading = reading => ({
        kind: reading?.kind,
        readingId: reading?.readingId,
        meaningId: reading?.meaningId,
        meaning: reading?.meaning,
        relation: reading?.relation,
        availabilityStatus: reading?.availabilityStatus,
        contextCondition: reading?.contextCondition,
    });

    const receiptRows = [];
    CASES.forEach(row => {
        row.sourceReadings.forEach(([facet, meaningId, referent], index) => {
            receiptRows.push({
                row,
                relationKind: "source",
                selection: `claim-p2343-extant-${row.lexeme}`,
                facet,
                path: `${BASE}.extantFusedSources.${row.lexeme}.sourceReadings.${index}`,
                meaningId,
                referent,
            });
        });
        row.targetReadings.forEach(([facet, meaningId, referent], index) => {
            receiptRows.push({
                row,
                relationKind: "causative",
                selection: `claim-p2343-impersonal-${row.lexeme}`,
                facet,
                path: `${BASE}.extantFusedNonspecificCausees.${row.lexeme}.availableReadings.${index}`,
                meaningId,
                referent,
            });
        });
    });
    const receipts = receiptRows.map(item => receipt(item.selection, item.facet));
    receiptRows.forEach((item, index) => {
        const { result, evidence } = receipts[index];
        s.eq(`${item.facet} directly observes one bound available reading`, [
            result.authorizationStatus,
            result.payload.effectiveCanonicalPath,
            result.payload.sourceCanonicalPath,
            result.payload.proofObservationKind,
            ctx[`is${PREFIX}Result`](result),
            ctx[`is${PREFIX}ExecutionEvidence`](evidence, result),
            summarizeReading(result.payload.facetValue),
            result.payload.facetValue?.participantBinding?.bindingRole,
        ], [
            "authorized",
            item.path,
            item.path,
            "direct-canonical-result-observation",
            true,
            true,
            expectedReadingSummary(item.row, item.relationKind, item.meaningId, item.referent),
            item.relationKind === "source" ? "source-subject" : "transformed-causee",
        ]);
    });

    const sourceApplications = CASES.map(row => buildSourceApplication(ctx, row));
    const sourceMeaningFrames = sourceApplications.map(applicationFrame => (
        ctx.buildClassicalNahuatlExtantDestockalMeaningFrame({ applicationFrame })
    ));
    CASES.forEach((row, index) => {
        const application = sourceApplications[index];
        const frame = sourceMeaningFrames[index];
        const expected = row.sourceReadings.map(([, meaningId, referent]) => (
            expectedReadingSummary(row, "source", meaningId, referent)
        ));
        s.eq(`${row.stem}: public source readings bind the issued source subject`, [
            application.authorizationStatus,
            frame.authorizationStatus,
            ctx.isClassicalNahuatlExtantDestockalMeaningFrame(frame),
            frame.kind,
            frame.relationKind,
            frame.applicationFrame === application,
            frame.resultFrame === application.resultFrame,
            frame.sourceAnalysisFrame === application.resultFrame?.sourceAnalysisFrame,
            frame.participantBinding?.bindingRole,
            frame.participantBinding?.participantFrame
                === application.normalizedRequest?.sourceSubjectFrame,
            application.normalizedRequest?.sourceSubjectFrame
                === application.resultFrame?.participantProjection?.sourceSubject,
            frame.availableReadings.map(summarizeReading),
            frame.availableReadings.every(reading => (
                reading.participantBinding === frame.participantBinding
            )),
            frame.meaningAssertionStatus,
            frame.selectedReading,
            frame.readingSelectionRequired,
        ], [
            "authorized",
            "authorized",
            true,
            "classical-nahuatl-extant-destockal-meaning-frame",
            "source",
            true,
            true,
            true,
            "source-subject",
            true,
            true,
            expected,
            true,
            "available-not-asserted",
            "",
            false,
        ]);
    });

    const causativeApplications = CASES.map(row => buildImpersonalCausativeApplication(ctx, row));
    const causativeMeaningFrames = causativeApplications.map(applicationFrame => (
        ctx.buildClassicalNahuatlExtantDestockalMeaningFrame({ applicationFrame })
    ));
    CASES.forEach((row, index) => {
        const application = causativeApplications[index];
        const frame = causativeMeaningFrames[index];
        const operation = application.resultFrame?.derivationOperationFrame;
        const transform = operation?.participantTransformFrame;
        const causee = transform?.addedObjectRequest;
        const projectedCausee = application.resultFrame?.participantProjection?.targetObjects
            ?.find(participant => participant.referenceId === causee?.objectId);
        const expected = row.targetReadings.map(([, meaningId, referent]) => (
            expectedReadingSummary(row, "causative", meaningId, referent)
        ));
        s.eq(`${row.targetStem}: public target readings bind the actual tla causee`, [
            application.authorizationStatus,
            application.resultFrame?.formulaRealization,
            application.resultFrame?.surfaceRealization,
            frame.authorizationStatus,
            ctx.isClassicalNahuatlExtantDestockalMeaningFrame(frame),
            frame.relationKind,
            frame.applicationFrame === application,
            frame.resultFrame === application.resultFrame,
            frame.derivationOperationFrame === operation,
            frame.participantTransformFrame === transform,
            causee && [causee.objectId, causee.objectKind, causee.governor],
            frame.participantBinding?.bindingRole,
            frame.participantBinding?.targetObjectRequest === causee,
            frame.participantBinding?.participantFrame === projectedCausee,
            frame.availableReadings.map(summarizeReading),
            frame.availableReadings.every(reading => (
                reading.participantBinding === frame.participantBinding
            )),
            frame.meaningAssertionStatus,
            frame.selectedReading,
            frame.readingSelectionRequired,
        ], [
            "authorized",
            row.targetFormula,
            row.targetSurface,
            "authorized",
            true,
            "causative",
            true,
            true,
            true,
            true,
            ["causative-object", "nonspecific-nonhuman", "causative"],
            "transformed-causee",
            true,
            true,
            expected,
            true,
            "available-not-asserted",
            "",
            false,
        ]);
    });

    const allMeaningFrames = [...sourceMeaningFrames, ...causativeMeaningFrames];
    s.eq("meaning projection is read-only and never grants string, example, or admission authority", (
        allMeaningFrames.map(frame => [
            frame.formulaRealization === frame.resultFrame?.formulaRealization,
            frame.surfaceRealization === frame.resultFrame?.surfaceRealization,
            frame.formulaStringAuthority,
            frame.surfaceStringAuthority,
            frame.canvasExampleAuthority,
            frame.sourceAdmissionAuthority,
            frame.grammarGenerationAuthority,
            frame.contextualFactsSupplied,
            frame.contextualFactIsUserChoice,
        ])
    ), allMeaningFrames.map(() => [
        true, true, false, false, false, false, false, false, false,
    ]));

    s.eq("wall, mountainside, fire, stitches, and flame remain explicitly unresolved context", (
        allMeaningFrames.flatMap(frame => frame.availableReadings)
            .filter(reading => reading.contextCondition.required)
            .map(reading => [
                reading.meaningId,
                reading.contextCondition.requiredReferentKind,
                reading.contextCondition.participantRole,
                reading.contextCondition.resolutionStatus,
                reading.availabilityStatus,
            ])
    ), [
        ["collapse-wall", "wall", "source-subject", "unmet-or-unknown", "available-not-asserted"],
        ["slide-or-collapse-mountainside", "mountainside", "source-subject", "unmet-or-unknown", "available-not-asserted"],
        ["go-out-fire", "fire", "source-subject", "unmet-or-unknown", "available-not-asserted"],
        ["rip-out-stitches", "stitches", "transformed-causee", "unmet-or-unknown", "available-not-asserted"],
        ["extinguish-flame", "fire-or-flame", "transformed-causee", "unmet-or-unknown", "available-not-asserted"],
    ]);

    s.eq("building meaning frames cannot mutate the canonical words or formulas", (
        CASES.flatMap((row, index) => [
            [sourceApplications[index].resultFrame?.formulaRealization,
                sourceApplications[index].resultFrame?.surfaceRealization],
            [causativeApplications[index].resultFrame?.formulaRealization,
                causativeApplications[index].resultFrame?.surfaceRealization],
        ])
    ), CASES.flatMap(row => [
        [`#0-0(${row.stem})0+0-0#`, row.stem.replaceAll("-", "")],
        [row.targetFormula, row.targetSurface],
    ]));

    const copiedApplication = JSON.parse(JSON.stringify(causativeApplications[0]));
    const copiedMeaningFrame = JSON.parse(JSON.stringify(causativeMeaningFrames[0]));
    const blockedCopy = ctx.buildClassicalNahuatlExtantDestockalMeaningFrame({
        applicationFrame: copiedApplication,
    });
    s.eq("copied applications, meaning frames, and owner results cannot mint authority", [
        blockedCopy.authorizationStatus,
        ctx.isClassicalNahuatlExtantDestockalMeaningFrame(copiedMeaningFrame),
        ctx[`is${PREFIX}Result`](JSON.parse(JSON.stringify(receipts[0].result))),
        ctx[`evaluate${PREFIX}`](JSON.parse(JSON.stringify(receipts[0].source))).authorizationStatus,
    ], ["blocked", false, false, "blocked"]);

    const openInputs = [
        buildSourceApplication(ctx, CASES[0], "za-ā-ni"),
        buildSourceApplication(ctx, CASES[0], "mi-ni"),
    ];
    s.eq("unknown and short-vowel inputs remain admitted without borrowed lexical senses", (
        openInputs.map(application => {
            const frame = ctx.buildClassicalNahuatlExtantDestockalMeaningFrame({
                applicationFrame: application,
            });
            return [
                application.authorizationStatus,
                application.resultFrame?.surfaceRealization,
                frame.authorizationStatus,
                ctx.isClassicalNahuatlExtantDestockalMeaningFrame(frame),
                frame.availableReadings?.length || 0,
            ];
        })
    ), [
        ["authorized", "zāni", "blocked", false, 0],
        ["authorized", "mini", "blocked", false, 0],
    ]);

    return s;
}

module.exports = { run };
