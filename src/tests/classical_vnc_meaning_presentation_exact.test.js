"use strict";

const { createSuite } = require("./runner");

function buildDirectApplication(ctx, sourceStem, verbClass = "B") {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        verbClass,
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

function buildImpersonalCausativeApplication(ctx, sourceStem, targetStem) {
    const request = {
        sourceStem,
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
        sourceNonactiveOptionId: sourceOption?.optionId || "missing-source-option",
    });
    const derivationOption = derivationPreview.controlFrame
        ?.derivationOptionInventory?.options?.find(option => (
            option.targetStem === targetStem
            && option.derivationSubtype === "type-one"
        ));
    return ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        sourceNonactiveOptionId: sourceOption?.optionId || "missing-source-option",
        derivationOptionId:
            derivationOption?.optionId || "missing-derivation-option",
    });
}

function summarizeRequirement(requirement) {
    return [
        requirement.meaningId,
        requirement.requiredReferentKind,
        requirement.contextStatus,
        requirement.supported,
    ];
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_meaning_presentation_exact");
    const xini = buildDirectApplication(ctx, "xī-ni");
    const xiniDefault = ctx.buildClassicalNahuatlVncMeaningPresentationFrame({
        applicationFrame: xini,
    });

    s.eq("default presentation exposes owner readings without asserting one", [
        xini.authorizationStatus,
        xiniDefault.authorizationStatus,
        ctx.isClassicalNahuatlVncMeaningPresentationFrame(xiniDefault),
        xiniDefault.applicationFrame === xini,
        xiniDefault.resultFrame === xini.resultFrame,
        xiniDefault.meaningFrame.applicationFrame === xini,
        xiniDefault.readingFrame.meaningFrame === xiniDefault.meaningFrame,
        xiniDefault.participantBinding
            === xiniDefault.meaningFrame.participantBinding,
        xiniDefault.availableReadings.map(reading => reading.meaningId),
        xiniDefault.possibleMeanings === xiniDefault.availableReadings,
        xiniDefault.readingChoices.map(reading => reading.meaningId),
        xiniDefault.supportedReadings.map(reading => reading.meaningId),
        xiniDefault.contextRequirements.map(summarizeRequirement),
        xiniDefault.selectedReading,
        xiniDefault.meaningAssertionStatus,
        xiniDefault.context,
        xiniDefault.formulaRealization === xini.resultFrame.formulaRealization,
        xiniDefault.surfaceRealization === xini.resultFrame.surfaceRealization,
    ], [
        "authorized",
        "authorized",
        true,
        true,
        true,
        true,
        true,
        true,
        ["collapse-wall", "slide-or-collapse-mountainside"],
        true,
        ["collapse-wall", "slide-or-collapse-mountainside"],
        [],
        [
            ["collapse-wall", "wall", "unresolved", false],
            [
                "slide-or-collapse-mountainside",
                "mountainside",
                "unresolved",
                false,
            ],
        ],
        "",
        "available-not-asserted",
        null,
        true,
        true,
    ]);

    const wall = ctx.buildClassicalNahuatlVncMeaningPresentationFrame({
        applicationFrame: xini,
        context: {
            participantFrame:
                xiniDefault.participantBinding.participantFrame,
            referentKind: "wall",
        },
        requestedReading: "collapse-wall",
    });
    s.eq("explicit matching context supports one selected reading only", [
        wall.authorizationStatus,
        ctx.isClassicalNahuatlVncMeaningPresentationFrame(wall),
        wall.applicationFrame === xini,
        wall.participantBinding === xiniDefault.participantBinding,
        wall.context?.participantFrame === wall.participantBinding.participantFrame,
        wall.context?.referentKind,
        wall.supportedReadings.map(reading => reading.meaningId),
        wall.contextRequirements.map(summarizeRequirement),
        wall.selectedReading,
        wall.selectedResolution?.reading.meaningId,
        wall.selectedResolution?.supported,
        wall.meaningAssertionStatus,
        wall.contextualFactsSupplied,
        wall.formulaRealization,
        wall.surfaceRealization,
    ], [
        "authorized",
        true,
        true,
        false,
        true,
        "wall",
        ["collapse-wall"],
        [
            ["collapse-wall", "wall", "matched", true],
            [
                "slide-or-collapse-mountainside",
                "mountainside",
                "not-matched",
                false,
            ],
        ],
        "collapse-wall",
        "collapse-wall",
        true,
        "selected-not-truth-asserted",
        true,
        "#0-0(xī-ni)0+0-0#",
        "xīni",
    ]);

    const cehuiCausative = buildImpersonalCausativeApplication(
        ctx,
        "cē-hui",
        "cē-hui-ā",
    );
    const cehuiPresentation =
        ctx.buildClassicalNahuatlVncMeaningPresentationFrame({
            applicationFrame: cehuiCausative,
        });
    const causee = cehuiCausative.resultFrame?.derivationOperationFrame
        ?.participantTransformFrame?.addedObjectRequest;
    s.eq("causative presentation binds readings to the actual transformed causee", [
        cehuiCausative.authorizationStatus,
        cehuiPresentation.authorizationStatus,
        ctx.isClassicalNahuatlVncMeaningPresentationFrame(cehuiPresentation),
        cehuiPresentation.relationKind,
        cehuiPresentation.participantBinding?.bindingRole,
        cehuiPresentation.participantBinding?.targetObjectRequest === causee,
        cehuiPresentation.availableReadings.map(reading => reading.meaningId),
        cehuiPresentation.supportedReadings.map(reading => reading.meaningId),
        cehuiPresentation.contextRequirements.map(summarizeRequirement),
        cehuiPresentation.formulaRealization,
        cehuiPresentation.surfaceRealization,
    ], [
        "authorized",
        "authorized",
        true,
        "causative",
        "transformed-causee",
        true,
        ["cause-to-become-cold", "chill", "extinguish-flame"],
        ["cause-to-become-cold", "chill"],
        [["extinguish-flame", "fire-or-flame", "unresolved", false]],
        "#ni-0+tla(cē-hui-a)0+0-0#",
        "nitlacēhuia",
    ]);

    const wrongParticipant =
        ctx.buildClassicalNahuatlVncMeaningPresentationFrame({
            applicationFrame: xini,
            context: {
                participantFrame: { ...xiniDefault.participantBinding.participantFrame },
                referentKind: "wall",
            },
            requestedReading: "collapse-wall",
        });
    s.eq("a copied participant blocks presentation but not the generated Result", [
        wrongParticipant.authorizationStatus,
        wrongParticipant.blockReason,
        ctx.isClassicalNahuatlVncMeaningPresentationFrame(wrongParticipant),
        wrongParticipant.meaningFrame?.applicationFrame === xini,
        wrongParticipant.availableReadings.map(reading => reading.meaningId),
        wrongParticipant.presentationBlocksGeneration,
        wrongParticipant.applicationAuthorizationUnaffected,
        xini.authorizationStatus,
        xini.resultFrame.formulaRealization,
        xini.resultFrame.surfaceRealization,
    ], [
        "blocked",
        "extant-destockal-reading-exact-participant-required",
        false,
        true,
        ["collapse-wall", "slide-or-collapse-mountainside"],
        false,
        true,
        "authorized",
        "#0-0(xī-ni)0+0-0#",
        "xīni",
    ]);

    const ordinary = buildDirectApplication(ctx, "chōca", "A");
    const unlicensed = ctx.buildClassicalNahuatlVncMeaningPresentationFrame({
        applicationFrame: ordinary,
    });
    const copiedApplication =
        ctx.buildClassicalNahuatlVncMeaningPresentationFrame({
            applicationFrame: { ...xini },
        });
    const hostilePresentation =
        ctx.buildClassicalNahuatlVncMeaningPresentationFrame({
            applicationFrame: xini,
            formulaRealization: "hostile",
        });
    s.eq("unlicensed, copied, and presentation-authority inputs never borrow meanings", {
        ordinary: [
            ordinary.authorizationStatus,
            unlicensed.authorizationStatus,
            unlicensed.availableReadings,
            unlicensed.presentationBlocksGeneration,
        ],
        copiedApplication: [
            copiedApplication.authorizationStatus,
            copiedApplication.applicationFrame,
            copiedApplication.availableReadings,
        ],
        hostilePresentation: [
            hostilePresentation.authorizationStatus,
            hostilePresentation.blockReason,
            hostilePresentation.availableReadings,
        ],
        copiedFrameValid:
            ctx.isClassicalNahuatlVncMeaningPresentationFrame({
                ...xiniDefault,
            }),
        flags: [
            xiniDefault.presentationRole,
            xiniDefault.contextSelectionIsPresentationOnly,
            xiniDefault.readingSelectionIsPresentationOnly,
            xiniDefault.presentationBlocksGeneration,
            xiniDefault.applicationAuthorizationUnaffected,
            xiniDefault.changesFiniteMorphology,
            xiniDefault.sourceAdmissionAuthority,
            xiniDefault.grammarGenerationAuthority,
            xiniDefault.callerSuppliedAuthorityAccepted,
            xiniDefault.formulaStringAuthority,
            xiniDefault.surfaceStringAuthority,
            Object.isFrozen(xiniDefault),
        ],
    }, {
        ordinary: ["authorized", "blocked", [], false],
        copiedApplication: ["blocked", null, []],
        hostilePresentation: [
            "blocked",
            "vnc-meaning-presentation-accepts-issued-application-and-presentation-input-only",
            [],
        ],
        copiedFrameValid: false,
        flags: [
            "read-only-owner-issued-interpretation",
            true,
            true,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
        ],
    });

    return s;
}

module.exports = { run };
