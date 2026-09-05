"use strict";

const { createSuite } = require("./runner");

const POSITION_FIELDS = Object.freeze([
    "objectId",
    "objectKind",
    "objectPerson",
    "governor",
    "derivationalLevel",
]);

function coreParticipant(frame) {
    return POSITION_FIELDS.map(field => frame?.[field]);
}

function fullPosition(frame) {
    return [
        ...coreParticipant(frame),
        frame?.prominence,
        frame?.carrier,
    ];
}

function fullRole(frame) {
    return [
        ...coreParticipant(frame),
        frame?.surface,
    ];
}

function selectApplication(ctx, initialRequest, targetStem, {
    sourceNonactiveFamily = "",
} = {}) {
    let request = { ...initialRequest };
    let preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    if (preview.controlFrame?.sourceNonactiveSelectorRequired) {
        const inventory = preview.controlFrame.sourceNonactiveOptionInventory;
        const sourceOption = inventory?.options?.find(option => (
            !sourceNonactiveFamily
            || option.suffixFamily === sourceNonactiveFamily
        )) || inventory?.options?.[0];
        request = {
            ...request,
            sourceNonactiveOptionId:
                sourceOption?.optionId || "missing-source-nonactive-option",
        };
        preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    }
    const option = preview.controlFrame?.derivationOptionInventory?.options
        ?.find(candidate => candidate.targetStem === targetStem);
    request = {
        ...request,
        derivationOptionId: option?.optionId || `missing-option:${targetStem}`,
    };
    return {
        request,
        option,
        frame: ctx.evaluateClassicalNahuatlVncApplication(request),
    };
}

function getDerivedParts(ctx, selected) {
    const application = selected.frame;
    const operation = application.resultFrame?.derivationOperationFrame;
    const machinery = application.resultFrame?.activeMachineryFrame;
    const finite = application.resultFrame?.finiteSurfaceFrame;
    const citation = ctx.buildClassicalNahuatlCanvasCitationProjectionFrame(
        machinery
    );
    const valenceSlots = finite?.typedFrame?.slots?.prePredicate?.filter(slot => (
        slot.kind === "monadic-valence" || slot.kind === "dyadic-valence"
    )) || [];
    return { application, operation, machinery, finite, citation, valenceSlots };
}

function run(ctx = {}) {
    const s = createSuite(
        "classical_monadic_derived_participant_readout_exact"
    );
    const miniBase = {
        sourceStem: "mī-ni",
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "1sg",
        objectKind: "none",
        objectPerson: "",
        sourceVoice: "active",
        requestedDerivation: "causative",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
    };
    const impersonal = getDerivedParts(ctx, selectApplication(ctx, {
        ...miniBase,
        sourceVoice: "impersonal",
    }, "mī-n-a", { sourceNonactiveFamily: "hua" }));
    const specific = getDerivedParts(
        ctx,
        selectApplication(ctx, miniBase, "mī-n-a")
    );
    const reflexive = getDerivedParts(ctx, selectApplication(ctx, {
        ...miniBase,
        sourceSubject: "1sg",
    }, "mī-n-a"));
    const directional = getDerivedParts(ctx, selectApplication(ctx, {
        ...miniBase,
        sentenceOptions: { directionalPrefix: "on" },
    }, "mī-n-a"));
    const applicative = getDerivedParts(ctx, selectApplication(ctx, {
        sourceStem: "paca",
        verbClass: "A",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "3sg",
        objectKind: "none",
        objectPerson: "",
        sourceVoice: "active",
        requestedDerivation: "applicative",
        applicativeObjectKind: "nonspecific-human",
        applicativeObjectPerson: "",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
    }, "paqui-liā"));

    const derivedCases = [impersonal, specific, reflexive, directional, applicative];
    s.eq("the five public derived applications issue canonical finite and citation frames", (
        derivedCases.map(parts => [
            parts.application.authorizationStatus,
            ctx.isClassicalNahuatlVncApplicationFrame(parts.application),
            ctx.isClassicalNahuatlVncDerivationOperationFrame(parts.operation),
            ctx.isClassicalNahuatlDerivedVncMachineryFrame(parts.machinery),
            ctx.isClassicalNahuatlVncFiniteSurfaceFrame(parts.finite),
            ctx.isClassicalNahuatlCanvasCitationProjectionFrame(parts.citation),
        ])
    ), derivedCases.map(() => ["authorized", true, true, true, true, true]));

    s.eq("the repaired readout does not change independently generated formulas or words", (
        derivedCases.map(parts => [
            parts.application.resultFrame.formulaRealization,
            parts.application.resultFrame.surfaceRealization,
            parts.finite.formulaRealization,
            parts.finite.wordRealization,
        ])
    ), [
        ["#ni-0+tla(mī-n-a)0+0-0#", "nitlamīna", "#ni-0+tla(mī-n-a)0+0-0#", "nitlamīna"],
        ["#ni-0+c-0(mī-n-a)0+0-0#", "nicmīna", "#ni-0+c-0(mī-n-a)0+0-0#", "nicmīna"],
        ["#ni-0+n-o(mī-n-a)0+0-0#", "ninomīna", "#ni-0+n-o(mī-n-a)0+0-0#", "ninomīna"],
        ["#no-0+c-0+on(mī-n-a)0+0-0#", "noconmīna", "#no-0+c-0+on(mī-n-a)0+0-0#", "noconmīna"],
        ["#0-0+tē(paqui-lia)0+0-0#", "tēpaquilia", "#0-0+tē(paqui-lia)0+0-0#", "tēpaquilia"],
    ]);

    s.eq("formula and written projections remain independent", (
        derivedCases.map(parts => [
            parts.finite.formulaDerivedFromWrittenProjection,
            parts.finite.writtenDerivedFromFormulaProjection,
        ])
    ), derivedCases.map(() => [false, false]));

    const impersonalRequest = impersonal.operation.targetObjectRequests[0];
    s.eq("impersonal mī-ni causative keeps the signed nonspecific tla causee", [
        impersonal.operation.targetObjectRequests.length,
        impersonal.machinery.targetObjectRequests
            === impersonal.operation.targetObjectRequests,
        coreParticipant(impersonalRequest),
        fullPosition(impersonal.finite.participantPositions[0]),
        fullRole(impersonal.finite.orderedParticipantRoles[0]),
    ], [
        1,
        true,
        ["causative-object", "nonspecific-nonhuman", "", "causative", 1],
        ["causative-object", "nonspecific-nonhuman", "", "causative", 1, "mainline", "tla"],
        ["causative-object", "nonspecific-nonhuman", "", "causative", 1, "tla"],
    ]);

    s.eq("the impersonal causee is the same participant in the citation projection", [
        impersonal.finite.participantPositions.length,
        impersonal.finite.orderedParticipantRoles.length,
        impersonal.citation.participantPositions.length,
        coreParticipant(impersonal.citation.participantPositions[0]),
        impersonal.citation.participantPositions[0].carrier,
    ], [
        1,
        1,
        1,
        ["causative-object", "nonspecific-nonhuman", "", "causative", 1],
        "tla",
    ]);

    const SPECIAL_ORDERING_RULE =
        "cn-l25-25113-impersonal-causative-object-before-retained-reciprocative";
    s.eq("a lone impersonal tla causee does not acquire the special tē-plus-ne ordering rule", [
        impersonal.finite.ruleFrames.some(rule => rule.ruleId === SPECIAL_ORDERING_RULE),
        impersonal.finite.ruleFrames.map(rule => rule.ruleId),
    ], [false, ["cn-vnc-typed-finite-word-projection"]]);

    s.eq("the active specific causee retains causal identity and its real c-0 carrier", [
        coreParticipant(specific.operation.targetObjectRequests[0]),
        fullPosition(specific.finite.participantPositions[0]),
        fullRole(specific.finite.orderedParticipantRoles[0]),
        coreParticipant(specific.citation.participantPositions[0]),
    ], [
        ["causative-object", "specific-projective", "3sg", "causative", 1],
        ["causative-object", "specific-projective", "3sg", "causative", 1, "mainline", "c-0"],
        ["causative-object", "specific-projective", "3sg", "causative", 1, "c"],
        ["causative-object", "specific-projective", "3sg", "causative", 1],
    ]);

    s.eq("the active reflexive causee retains causal identity and its real n-o carrier", [
        coreParticipant(reflexive.operation.targetObjectRequests[0]),
        fullPosition(reflexive.finite.participantPositions[0]),
        fullRole(reflexive.finite.orderedParticipantRoles[0]),
        coreParticipant(reflexive.citation.participantPositions[0]),
    ], [
        ["causative-object", "reflexive", "1sg", "causative", 1],
        ["causative-object", "reflexive", "1sg", "causative", 1, "mainline", "n-o"],
        ["causative-object", "reflexive", "1sg", "causative", 1, "no"],
        ["causative-object", "reflexive", "1sg", "causative", 1],
    ]);

    s.eq("a directional is not mistaken for the one participant's carrier", [
        directional.finite.typedFrame.slots.prePredicate.map(slot => [slot.id, slot.kind, slot.carrier]),
        directional.valenceSlots.map(slot => slot.carrier),
        fullPosition(directional.finite.participantPositions[0]),
        fullRole(directional.finite.orderedParticipantRoles[0]),
        directional.citation.participantPositions[0].carrier,
    ], [
        [
            ["valence", "dyadic-valence", "c-0"],
            ["directional", "vnc-internal-directional", "on"],
        ],
        ["c-0"],
        ["causative-object", "specific-projective", "3sg", "causative", 1, "mainline", "c-0"],
        ["causative-object", "specific-projective", "3sg", "causative", 1, "c"],
        "c-0",
    ]);

    s.eq("the ordinary intransitive-to-applicative object uses the same signed readout path", [
        coreParticipant(applicative.operation.targetObjectRequests[0]),
        fullPosition(applicative.finite.participantPositions[0]),
        fullRole(applicative.finite.orderedParticipantRoles[0]),
        coreParticipant(applicative.citation.participantPositions[0]),
    ], [
        ["applicative-object", "nonspecific-human", "", "applicative", 1],
        ["applicative-object", "nonspecific-human", "", "applicative", 1, "mainline", "tē"],
        ["applicative-object", "nonspecific-human", "", "applicative", 1, "tē"],
        ["applicative-object", "nonspecific-human", "", "applicative", 1],
    ]);

    s.eq("every one-object derived position takes its carrier from the unique real valence slot", (
        derivedCases.map(parts => [
            parts.operation.targetObjectRequests.length,
            parts.valenceSlots.length,
            parts.finite.participantPositions[0]?.carrier,
            parts.valenceSlots[0]?.carrier,
        ])
    ), [
        [1, 1, "tla", "tla"],
        [1, 1, "c-0", "c-0"],
        [1, 1, "n-o", "n-o"],
        [1, 1, "c-0", "c-0"],
        [1, 1, "tē", "tē"],
    ]);

    const direct = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "mati",
        verbClass: "B",
        sourceValence: "specific-projective",
        sourceSubject: "1sg",
        subject: "1sg",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceVoice: "active",
        requestedDerivation: "direct",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
    });
    const directFinite = direct.resultFrame.finiteSurfaceFrame;
    s.eq("a normal direct object keeps the established non-derived readout", [
        direct.authorizationStatus,
        direct.resultFrame.formulaRealization,
        direct.resultFrame.surfaceRealization,
        fullPosition(directFinite.participantPositions[0]),
        fullRole(directFinite.orderedParticipantRoles[0]),
    ], [
        "authorized",
        "#ni-0+c-0(mati)0+0-0#",
        "nicmati",
        ["source-object-1", "specific-projective", "3sg", "directive", 1, "mainline", ""],
        ["source-object-1", "specific-projective", "3sg", "directive", 1, "c"],
    ]);

    const multi = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "maca",
        verbClass: "A",
        sourceValence: "multiple-object",
        subject: "3sg",
        tense: "future",
        requestedVoice: "active",
        objectRequests: [{
            objectId: "direct-specific",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            governor: "directive",
            derivationalLevel: 1,
        }, {
            objectId: "applied-human",
            objectKind: "nonspecific-human",
            objectPerson: "",
            governor: "applicative",
            derivationalLevel: 2,
        }],
    });
    const multiFinite = multi.resultFrame.finiteSurfaceFrame;
    const multiMachinery = multi.resultFrame.selectedMachineryFrame;
    const multiCitation = ctx.buildClassicalNahuatlCanvasCitationProjectionFrame(
        multiMachinery
    );
    s.eq("an existing multiple-object cluster remains authoritative and unchanged", [
        multi.authorizationStatus,
        multi.resultFrame.formulaRealization,
        multi.resultFrame.surfaceRealization,
        multiFinite.participantPositions.map(fullPosition),
        multiFinite.orderedParticipantRoles.map(fullRole),
    ], [
        "authorized",
        "#0-0+qui-0+tē(maca)z+⎕-0#",
        "quitēmacaz",
        [
            ["direct-specific", "specific-projective", "3sg", "directive", 1, "shuntline", "qui-0"],
            ["applied-human", "nonspecific-human", "", "applicative", 2, "mainline", "tē"],
        ],
        [
            ["direct-specific", "specific-projective", "3sg", "directive", 1, "qui"],
            ["applied-human", "nonspecific-human", "", "applicative", 2, "tē"],
        ],
    ]);

    s.eq("the multiple-object citation keeps the same issued cluster positions", [
        ctx.isClassicalNahuatlCanvasCitationProjectionFrame(multiCitation),
        multiCitation.participantPositions.map(fullPosition),
    ], [
        true,
        [
            ["direct-specific", "specific-projective", "3sg", "directive", 1, "shuntline", "qui-0"],
            ["applied-human", "nonspecific-human", "", "applicative", 2, "mainline", "tē"],
        ],
    ]);

    const retained = getDerivedParts(ctx, selectApplication(ctx, {
        sourceStem: "tla-zo-h-tla",
        verbClass: "A",
        sourceValence: "mainline-reflexive",
        objectKind: "reflexive",
        objectPerson: "3pl",
        sourceSubject: "3pl",
        subject: "2sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        sourceVoice: "impersonal",
        requestedVoice: "active",
        outputScope: "single",
    }, "tla-zo-h-tla-l-tiā"));
    s.eq("the real tē-plus-retained-ne case still receives the special ordering rule", [
        retained.application.authorizationStatus,
        retained.application.resultFrame.formulaRealization,
        retained.application.resultFrame.surfaceRealization,
        retained.finite.ruleFrames.map(rule => rule.ruleId),
    ], [
        "authorized",
        "#ti-0+tē+ne(tla-zo-h-tla-l-tia)0+0-0#",
        "titēnetlazohtlaltia",
        ["cn-vnc-typed-finite-word-projection", SPECIAL_ORDERING_RULE],
    ]);

    const retainedExpectedPositions = [
        ["causative-object", "nonspecific-human", "", "causative", 2, "mainline", "tē"],
        ["source-object-1", "reflexive", "nonfirst-common", "directive", 1, "shuntline", "ne"],
    ];
    s.eq("finite and citation readouts preserve tē before retained ne", [
        retained.finite.participantPositions.map(fullPosition),
        retained.finite.orderedParticipantRoles.map(fullRole),
        retained.citation.participantPositions.map(fullPosition),
        retained.citation.orderedParticipantRoles.map(role => [
            ...coreParticipant(role),
            role.prominence,
            role.surface,
        ]),
    ], [
        retainedExpectedPositions,
        [
            ["causative-object", "nonspecific-human", "", "causative", 2, "tē"],
            ["source-object-1", "reflexive", "nonfirst-common", "directive", 1, "ne"],
        ],
        retainedExpectedPositions,
        [
            ["causative-object", "nonspecific-human", "", "causative", 2, "mainline", "tē"],
            ["source-object-1", "reflexive", "nonfirst-common", "directive", 1, "shuntline", "ne"],
        ],
    ]);

    const copiedOperation = JSON.parse(JSON.stringify(impersonal.operation));
    const copiedMachinery = JSON.parse(JSON.stringify(impersonal.machinery));
    s.eq("copied participant sources cannot mint derivation or finite authority", [
        ctx.isClassicalNahuatlVncDerivationOperationFrame(copiedOperation),
        ctx.isClassicalNahuatlDerivedVncMachineryFrame(copiedMachinery),
        ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(copiedMachinery)
            .blockReason,
    ], [false, false, "classical-vnc-canonical-machinery-required"]);

    const tamperedRequests = impersonal.machinery.targetObjectRequests.map(
        request => ({ ...request, governor: "directive" })
    );
    const tamperedMachinery = {
        ...impersonal.machinery,
        targetObjectRequests: tamperedRequests,
    };
    s.eq("tampered target requests cannot relabel the signed monadic participant", [
        ctx.isClassicalNahuatlDerivedVncMachineryFrame(tamperedMachinery),
        ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(tamperedMachinery)
            .blockReason,
        impersonal.finite.participantPositions[0].governor,
    ], [false, "classical-vnc-canonical-machinery-required", "causative"]);

    return s;
}

module.exports = { run };
