"use strict";

const { createSuite } = require("./runner");

const OWNER = "classical-destockal-irregular-source-lifecycle";
const PREFIX = "ClassicalDestockalIrregularSourceLifecycle";
const BASE =
    "constraints.destockalIrregularSourceLifecycle.extantFusedNonspecificCausees";
const CASES = [
    {
        lexeme: "mini",
        selection: "claim-p2343-impersonal-mini",
        facet: "aci-p204-l002-61a69ed581-06-mini-nonspecific-causee",
        meaningFacet: "aci-p204-l002-61a69ed581-04",
        stem: "mī-ni",
        nonactiveStem: "mī-nī-hua",
        analysisId:
            "cn-l24-2459-mini-fused-destockal:fused-destockal-ni-exact",
        targetStem: "mī-n-a",
        targetClass: "B",
        formula: "#ni-0+tla(mī-n-a)0+0-0#",
        surface: "nitlamīna",
    },
    {
        lexeme: "xini",
        selection: "claim-p2343-impersonal-xini",
        facet: "aci-p204-l003-429a0e8ace-07-xini-nonspecific-causee",
        meaningFacet: "aci-p204-l003-429a0e8ace-04",
        stem: "xī-ni",
        nonactiveStem: "xī-nī-hua",
        analysisId:
            "cn-l24-2459-xini-fused-destockal:fused-destockal-ni-exact",
        targetStem: "xī-ni-ā",
        targetClass: "C",
        formula: "#ni-0+tla(xī-ni-a)0+0-0#",
        surface: "nitlaxīnia",
    },
    {
        lexeme: "cehui",
        selection: "claim-p2343-impersonal-cehui",
        facet: "aci-p204-l004-ae01b03f8b-06-cehui-nonspecific-causee",
        meaningFacet: "aci-p204-l004-ae01b03f8b-07",
        stem: "cē-hui",
        nonactiveStem: "cē-huī-hua",
        analysisId:
            "cn-l24-2459-cehui-fused-destockal:fused-destockal-hui-exact",
        targetStem: "cē-hui-ā",
        targetClass: "C",
        formula: "#ni-0+tla(cē-hui-a)0+0-0#",
        surface: "nitlacēhuia",
    },
];

function buildActiveCausative(ctx, row, {
    sourceSubject = "3sg",
    subject = "1sg",
    causativeObjectKind,
} = {}) {
    const request = {
        sourceStem: row.stem,
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject,
        subject,
        objectKind: "none",
        objectPerson: "",
        sourceVoice: "active",
        requestedDerivation: "causative",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
        ...(causativeObjectKind ? { causativeObjectKind } : {}),
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const option = preview.controlFrame?.derivationOptionInventory?.options
        ?.find(candidate => candidate.targetStem === row.targetStem);
    return ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        derivationOptionId:
            option?.optionId || `missing-active-causative:${row.targetStem}`,
    });
}

function run(ctx = {}) {
    const s = createSuite(
        "classical_extant_fused_nonspecific_causee_owner_exact"
    );
    const receipt = (row, facet = row.facet, extra = {}) => {
        const source = ctx[`build${PREFIX}Source`]({
            analysisDomain: OWNER,
            selection: row.selection,
            requestedFacet: facet,
            participantChoice: `${row.selection}:${facet}`,
            ...extra,
        });
        const result = ctx[`evaluate${PREFIX}`](source);
        return {
            source,
            result,
            evidence: ctx[`get${PREFIX}ExecutionEvidence`](result),
        };
    };
    const receipts = CASES.map(row => receipt(row));

    CASES.forEach((row, index) => {
        const { result, evidence } = receipts[index];
        s.eq(`${row.facet} has one direct owner-issued observation`, [
            result.authorizationStatus,
            result.payload.effectiveCanonicalPath,
            result.payload.sourceCanonicalPath,
            result.payload.proofObservationKind,
            ctx[`is${PREFIX}Result`](result),
            ctx[`is${PREFIX}ExecutionEvidence`](evidence, result),
        ], [
            "authorized",
            `${BASE}.${row.lexeme}`,
            `${BASE}.${row.lexeme}`,
            "direct-canonical-result-observation",
            true,
            true,
        ]);

        // Owner payloads are sanitized observations, not reusable capabilities.
        // Issuance/reference checks belong to the private canonical projection;
        // this public receipt checks exact content and corresponding signatures.
        const value = result.payload.facetValue;
        const sourceOption = value?.sourceNonactiveOption;
        const sourceMachinery = value?.sourceMachineryFrame;
        const voiceTransform = value?.sourceVoiceTransformationFrame;
        const sourceAnalysisFrame = value?.sourceAnalysisFrame;
        const sourceAnalysis = value?.sourceAnalysis;
        s.eq(`${row.stem}: Source selects a real hua impersonal formation`, [
            sourceOption?.optionId,
            sourceOption?.suffixFamily,
            sourceOption?.nonactiveStem,
            sourceOption?.optionRole,
            sourceOption?.isDefault,
            sourceMachinery?.voice,
            sourceMachinery?.nonactiveStemRecord?.selectedOptionId,
            sourceMachinery?.nonactiveStemRecord?.nonactiveStem,
            sourceMachinery?.authorizationStatus,
            voiceTransform?.authorizationStatus,
            voiceTransform?.impersonalSubjectReferent,
            voiceTransform?.targetSubject,
            voiceTransform?.sourceObjectPositionCount,
            sourceAnalysisFrame?.authorizationStatus,
            sourceAnalysisFrame?.sourceVoice,
            sourceAnalysisFrame?.sourceStem,
            sourceAnalysisFrame?.analyses?.some(analysis => analysis.analysisId === row.analysisId),
            sourceAnalysis?.analysisId,
            sourceAnalysis?.analysisAuthority,
            sourceAnalysis?.lexicalStatus,
        ], [
            `hua:${row.nonactiveStem}`,
            "hua",
            row.nonactiveStem,
            "user-choice",
            false,
            "impersonal",
            `hua:${row.nonactiveStem}`,
            row.nonactiveStem,
            "authorized",
            "authorized",
            "none",
            "3sg",
            0,
            "authorized",
            "impersonal",
            row.stem,
            true,
            row.analysisId,
            "typed-lexical-source-analysis",
            "lexically-licensed-source-analysis",
        ]);

        const inventory = value?.derivationOptionInventory;
        const option = value?.selectedOption;
        const application = value?.causativeApplicationFrame;
        const operation = value?.causativeOperationFrame;
        const participant = value?.participantTransformFrame;
        const causee = value?.causeeObjectRequest;
        s.eq(`${row.stem}: the impersonal source supplies the actual tla causee`, [
            inventory?.authorizationStatus,
            inventory?.sourceSignature === operation?.sourceSignature,
            inventory?.sourceAnalysisFrame?.canonicalSignature === sourceAnalysisFrame?.canonicalSignature,
            inventory?.options?.some(candidate => candidate.optionId === option?.optionId),
            option?.sourceAnalysisId,
            option?.targetStem,
            option?.targetClass,
            application?.authorizationStatus,
            application?.resultFrame?.derivationOperationFrame?.canonicalSignature === operation?.canonicalSignature,
            operation?.authorizationStatus,
            operation?.selectedOption?.canonicalSignature === option?.canonicalSignature,
            operation?.sourceMachineryFrame?.nonactiveStemRecord?.nonactiveStem,
            participant?.authorizationStatus,
            participant?.sourceVoice,
            participant?.implicitAgentBecomesCausativeObject,
            participant?.sourceSubjectBecomesCausativeObject,
            participant?.referentiallyEmptySourceSubjectDiscarded,
            application?.normalizedRequest?.causativeObjectKind,
            participant?.requestedCausativeObjectKind,
            application?.controlFrame?.selectedCausativeObjectKind,
            participant?.causativeObjectKind,
            participant?.causativeObjectKindChoiceEligible,
            participant?.allowedCausativeObjectKinds,
            participant?.causativeObjectKindSelectionRequired,
            participant?.targetSubject,
            participant?.sourceObjectCount,
            participant?.targetObjectCount,
            participant?.addedObjectRequest?.objectId === causee?.objectId,
            participant?.targetObjectRequests?.[0]?.objectId === causee?.objectId,
            causee && [
                causee.objectId,
                causee.objectKind,
                causee.objectPerson,
                causee.governor,
                causee.derivationalLevel,
            ],
        ], [
            "authorized",
            true,
            true,
            true,
            row.analysisId,
            row.targetStem,
            row.targetClass,
            "authorized",
            true,
            "authorized",
            true,
            row.nonactiveStem,
            "authorized",
            "impersonal",
            true,
            false,
            true,
            "",
            "",
            "nonspecific-nonhuman",
            "nonspecific-nonhuman",
            false,
            [],
            false,
            "1sg",
            0,
            1,
            true,
            true,
            ["causative-object", "nonspecific-nonhuman", "", "causative", 1],
        ]);

        const finite = value?.finiteSurfaceFrame;
        const resultFrame = application?.resultFrame;
        s.eq(`${row.stem}: the independent finite Result is generated normally`, [
            application?.authorizationStatus,
            operation?.targetStem,
            operation?.targetClass,
            finite?.authorizationStatus,
            resultFrame?.finiteSurfaceFrame?.canonicalSignature === finite?.canonicalSignature,
            finite?.machineryFrame?.derivationOperationFrame?.canonicalSignature === operation?.canonicalSignature,
            value?.formula,
            resultFrame?.formulaRealization,
            finite?.formulaRealization,
            value?.surface,
            resultFrame?.surfaceRealization,
            finite?.wordRealization,
            finite?.formulaDerivedFromWrittenProjection,
            finite?.writtenDerivedFromFormulaProjection,
        ], [
            "authorized",
            row.targetStem,
            row.targetClass,
            "authorized",
            true,
            true,
            row.formula,
            row.formula,
            row.formula,
            row.surface,
            row.surface,
            row.surface,
            false,
            false,
        ]);
    });

    s.eq("an active Source cannot request the impersonal-source tla causee", (
        CASES.map(row => {
            const frame = buildActiveCausative(ctx, row, {
                causativeObjectKind: "nonspecific-nonhuman",
            });
            return [frame.authorizationStatus, frame.blockReason];
        })
    ), CASES.map(() => [
        "blocked",
        "classical-vnc-causative-causee-valence-not-recognized",
    ]));

    s.eq("the hua source-voice alternative still requires an explicit choice", (
        CASES.map(row => {
            const frame = ctx.evaluateClassicalNahuatlVncApplication({
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
            });
            return [
                frame.authorizationStatus,
                frame.blockReason,
                frame.controlFrame?.sourceNonactiveSelectorRequired,
                frame.controlFrame?.selectedSourceNonactiveOptionId,
            ];
        })
    ), CASES.map(() => [
        "blocked",
        "lesson20-nonactive-option-selection-required",
        true,
        "",
    ]));

    const automaticSpecific = buildActiveCausative(ctx, CASES[0]);
    const sameThirdPending = buildActiveCausative(ctx, CASES[0], {
        sourceSubject: "3sg",
        subject: "3sg",
    });
    const automaticReflexive = buildActiveCausative(ctx, CASES[0], {
        sourceSubject: "1sg",
        subject: "1sg",
    });
    s.eq("the existing specific/reflexive defaults and real ambiguity remain intact", [
        automaticSpecific.authorizationStatus,
        automaticSpecific.resultFrame?.derivationOperationFrame
            ?.participantTransformFrame?.causativeObjectKind,
        automaticSpecific.controlFrame?.causativeObjectKindChoiceEligible,
        sameThirdPending.authorizationStatus,
        sameThirdPending.blockReason,
        sameThirdPending.controlFrame?.allowedCausativeObjectKinds,
        sameThirdPending.controlFrame?.selectedCausativeObjectKind,
        automaticReflexive.authorizationStatus,
        automaticReflexive.resultFrame?.derivationOperationFrame
            ?.participantTransformFrame?.causativeObjectKind,
        automaticReflexive.controlFrame?.causativeObjectKindChoiceEligible,
    ], [
        "authorized",
        "specific-projective",
        false,
        "blocked",
        "classical-vnc-causative-causee-valence-selection-required",
        ["specific-projective", "reflexive"],
        "",
        "authorized",
        "reflexive",
        false,
    ]);

    s.eq("one lexeme cannot claim another lexeme's nonspecific-causee atom", [
        receipt(CASES[0], CASES[1].facet).result.authorizationStatus,
        receipt(CASES[1], CASES[2].facet).result.authorizationStatus,
        receipt(CASES[2], CASES[0].facet).result.authorizationStatus,
    ], ["blocked", "blocked", "blocked"]);

    s.eq("participant receipts do not claim the separate lexical meanings", (
        CASES.map(row => receipt(row, row.meaningFacet).result.authorizationStatus)
    ), ["blocked", "blocked", "blocked"]);

    s.eq("copying an owner Source or Result cannot mint proof authority", [
        ctx[`evaluate${PREFIX}`](
            JSON.parse(JSON.stringify(receipts[0].source))
        ).authorizationStatus,
        ctx[`is${PREFIX}Result`](
            JSON.parse(JSON.stringify(receipts[0].result))
        ),
        ctx[`is${PREFIX}ExecutionEvidence`](
            JSON.parse(JSON.stringify(receipts[0].evidence)),
            receipts[0].result
        ),
    ], ["blocked", false, false]);

    return s;
}

module.exports = { run };
