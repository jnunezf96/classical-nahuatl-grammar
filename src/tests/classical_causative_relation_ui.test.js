"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_causative_relation_ui");
    const composerSource = fs.readFileSync(
        path.resolve(__dirname, "..", "ui", "composer", "composer.mjs"),
        "utf8"
    );
    const renderingSource = fs.readFileSync(
        path.resolve(__dirname, "..", "ui", "rendering", "rendering.mjs"),
        "utf8"
    );

    s.eq(
        "Only Canvas-supported causative participant controls forward whitelisted user intent",
        typeof ctx.getClassicalCausativeParticipantControlRequestOverrides === "function"
            ? {
                causeeValence: ctx.getClassicalCausativeParticipantControlRequestOverrides({
                    id: "classical-rule-logic-causative-causee-valence",
                    value: "specific-projective",
                    derivedStem: "forged-target",
                }),
                legacyRelation: ctx.getClassicalCausativeParticipantControlRequestOverrides({
                    id: "classical-rule-logic-causative-referent-relation",
                    value: "distinct",
                    result: "forged-result",
                }),
                specificShuntline: ctx.getClassicalCausativeParticipantControlRequestOverrides({
                    id: "classical-rule-logic-causative-specific-shuntline-realization",
                    value: "sounded",
                    formulaEcho: "forged-formula",
                }),
                intentionalReset: ctx.getClassicalCausativeParticipantControlRequestOverrides({
                    id: "classical-rule-logic-causative-causee-valence",
                    value: "",
                }),
                unrelated: ctx.getClassicalCausativeParticipantControlRequestOverrides({
                    id: "classical-rule-logic-subject",
                    value: "1sg",
                    causativeObjectKind: "reflexive",
                }),
            }
            : null,
        {
            causeeValence: {
                causativeObjectKind: "specific-projective",
                causativeSpecificShuntlineRealization: "",
            },
            legacyRelation: {},
            specificShuntline: {
                causativeObjectKind: "",
                causativeSpecificShuntlineRealization: "sounded",
            },
            intentionalReset: {
                causativeObjectKind: "",
                causativeSpecificShuntlineRealization: "",
            },
            unrelated: {},
        }
    );

    s.ok(
        "Direct and delegated input/change listeners commit existing and late participant controls before rerender without double rendering",
        composerSource.includes("getClassicalCausativeParticipantControlRequestOverrides(control)")
            && composerSource.includes('documentObject.addEventListener("input", handleClassicalCausativeParticipantControlChange, true);')
            && composerSource.includes('documentObject.addEventListener("change", handleClassicalCausativeParticipantControlChange, true);')
            && composerSource.includes('documentObject.addEventListener("click", handleClassicalCausativeParticipantRevisionClick);')
            && composerSource.includes('const classicalRuleLogicControls = targetObject.document.querySelectorAll("[data-classical-rule-logic-control]");\n      initClassicalCausativeParticipantControlEvents();\n      initClassicalNonactiveFormationControlEvents();\n      if (!ansButton')
            && (composerSource.match(/documentObject\.addEventListener\("input", handleClassicalCausativeParticipantControlChange, true\);/g) || []).length === 1
            && (composerSource.match(/documentObject\.addEventListener\("change", handleClassicalCausativeParticipantControlChange, true\);/g) || []).length === 1
            && composerSource.includes('if (isClassicalCausativeParticipantControl(control)) {\n          // Keep the delegated listener')
            && composerSource.includes("bindClassicalCausativeParticipantControlEvents(control);")
            && composerSource.includes('control.addEventListener("input", handleClassicalCausativeParticipantControlChange);')
            && composerSource.includes('control.addEventListener("change", handleClassicalCausativeParticipantControlChange);')
            && renderingSource.includes("targetObject.bindClassicalCausativeParticipantControlEvents(control);")
            && composerSource.includes("HandledClassicalCausativeParticipantChangeEvents.has(event)")
            && composerSource.includes('CLASSICAL_CAUSATIVE_PARTICIPANT_CONTROL_REQUEST_KEYS[String(option.dataset?.classicalSegmentControl || "")]')
    );

    s.ok(
        "Minimal Grammar keeps applicable decisions primary and reduces the typed derivation explanation to one read-only account",
        renderingSource.includes('account.dataset.classicalVncDerivationAccount = "source-operation-result"')
            && renderingSource.includes('appendAccountSegment("Source VNC"')
            && renderingSource.includes('appendAccountSegment(derivationType === "causative" ? "Causative" : "Applicative"')
            && renderingSource.includes('appendAccountSegment("Resulting VNC"')
            && renderingSource.includes('detailsSummary.textContent = "Grammar details"')
            && renderingSource.includes('details.dataset.classicalVncDerivationDetails = "read-only-typed-projection"')
            && renderingSource.includes('presentation.primary.appendChild(preview);')
            && renderingSource.includes('derivationSelectionRequired || derivationInventory.options.length > 1')
            && renderingSource.includes('presentation.primary.appendChild(sourceSubjectWrapper);')
            && renderingSource.includes('presentation.primary.appendChild(resultSubjectWrapper);')
            && renderingSource.includes('sameSurfaceOperation')
            && !renderingSource.includes('classical-vnc-authority-preview__stage-flow')
            && !renderingSource.includes('createStage("source-vnc"')
    );

    s.ok(
        "Nuclear clause and particle-group layers are persistent, while their inapplicable inner groups stay absent",
        (() => {
            const start = renderingSource.indexOf("function getClassicalVncAuthorityProgressivePresentation()");
            const end = renderingSource.indexOf("function buildClassicalVncAuthorityDerivationSurfaceModel", start);
            const presentationSource = start >= 0 && end > start ? renderingSource.slice(start, end) : "";
            return presentationSource.includes('createPersistentSection("nuclear-clause", "Nuclear clause", "subject · predicate"')
                && presentationSource.includes('createPersistentSection("particle-group", "Particles & sentence group", ""')
                && presentationSource.includes('createControlGroup("function", "Function"')
                && presentationSource.includes('createControlGroup("sequence", "Sequence"')
                && presentationSource.includes('createControlGroup("dependent", "Dependent operation"')
                && presentationSource.includes('targetObject.document.createElement("section")')
                && presentationSource.includes("section.hidden = false")
                && presentationSource.includes("group.hidden = visibleControls === 0")
                && !presentationSource.includes('targetObject.document.createElement("details")');
        })()
    );

    s.ok(
        "Unavailable VNC controls stay absent except visible read-only Stem class and mood-bound Tense facts",
        renderingSource.includes('const retainedReadOnlyClass = id === "classical-rule-logic-class"')
            && renderingSource.includes('const retainedReadOnlyTense = id === "classical-rule-logic-tense"')
            && renderingSource.includes("retainedReadOnlyClass || retainedReadOnlyTense")
            && renderingSource.includes("const visible = !hide && (!canvasDisabled || retainedReadOnlyControl);")
            && renderingSource.includes("control.disabled = !visible || retainedReadOnlyControl;")
            && renderingSource.includes('const explicitSemanticSelection = Object.prototype.hasOwnProperty.call(overrides, "mood")')
            && renderingSource.includes("const domMoodBoundSelection = !explicitSemanticSelection")
            && renderingSource.includes("domMoodBoundSelection?.tense || rawRequestedSemanticTense")
    );

    s.eq(
        "Blocked startup machinery never enters finite realization, while authorized subject changes stay canonical",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const base = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "",
                    valence: "intransitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    derivationType: "direct",
                    vncVoice: "active",
                };
                const blocked = ctx.buildClassicalRuleLogicSurfaceFrame(base);
                const firstPerson = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    stem: "nemi",
                });
                const secondPerson = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    stem: "nemi",
                    subject: "2sg",
                });
                const paradigm = ctx.buildClassicalVncParadigmFrame({
                    ...base,
                    stem: "chōca",
                    sourceTransitivity: "intransitive",
                    sourceMatrixStem: "chōca",
                    verbClass: "A",
                    requestedVerbClass: "A",
                    requestedValence: "intransitive",
                    objectKind: "specific-projective",
                    objectPerson: "2sg",
                    sentenceNegativeMode: "positive",
                    polarityMode: "positive",
                    sentenceSurfaceMode: "statement",
                }, {
                    valenceKeys: ["intransitive"],
                    groupKeys: ["imperfective-indicative"],
                    tenseKeys: ["present"],
                    subjectKeys: ["1sg", "2sg"],
                });
                return {
                    blockedStatus: blocked.authorizationStatus,
                    blockedFormula: blocked.selectedFormula,
                    blockedFiniteSurface: blocked.finiteSurfaceFrame,
                    firstPersonFormula: firstPerson.finiteSurfaceFrame?.formulaRealization || "",
                    firstPersonWord: firstPerson.finiteSurfaceFrame?.wordRealization || "",
                    secondPersonFormula: secondPerson.finiteSurfaceFrame?.formulaRealization || "",
                    secondPersonWord: secondPerson.finiteSurfaceFrame?.wordRealization || "",
                    paradigmStatus: paradigm.authorizationStatus,
                    paradigmRows: paradigm.rows.map((row) => [
                        row.subject,
                        row.formula,
                        row.surface,
                        row.typedSlotFrameKind,
                    ]),
                };
            })()
            : null,
        {
            blockedStatus: "blocked",
            blockedFormula: "",
            blockedFiniteSurface: null,
            firstPersonFormula: "#ni-0(nemi)0+0-0#",
            firstPersonWord: "ninemi",
            secondPersonFormula: "#ti-0(nemi)0+0-0#",
            secondPersonWord: "tinemi",
            paradigmStatus: "authorized",
            paradigmRows: [
                        ["1sg", "#ni-0(chōca)0+0-0#", "nichōca", "classical-nahuatl-vnc-slot-frame"],
                        ["2sg", "#ti-0(chōca)0+0-0#", "tichōca", "classical-nahuatl-vnc-slot-frame"],
            ],
        }
    );

    s.eq(
        "The delegated event path accepts participant changes and ignores unrelated controls",
        typeof ctx.handleClassicalCausativeParticipantControlChange === "function"
            ? (() => {
                const originalRenderClassicalRuleLogicSurfaceBlock = ctx.renderClassicalRuleLogicSurfaceBlock;
                ctx.renderClassicalRuleLogicSurfaceBlock = () => null;
                try {
                    return {
                        selected: ctx.handleClassicalCausativeParticipantControlChange({
                            target: {
                                id: "classical-rule-logic-causative-object-kind",
                                value: "nonspecific-nonhuman",
                            },
                        }),
                        causeeValence: ctx.handleClassicalCausativeParticipantControlChange({
                            target: {
                                id: "classical-rule-logic-causative-causee-valence",
                                value: "reflexive",
                            },
                        }),
                        legacyRelation: ctx.handleClassicalCausativeParticipantControlChange({
                            target: {
                                id: "classical-rule-logic-causative-referent-relation",
                                value: "coreferential",
                            },
                        }),
                        unrelated: ctx.handleClassicalCausativeParticipantControlChange({
                            target: {
                                id: "classical-rule-logic-subject",
                                value: "2sg",
                            },
                        }),
                    };
                } finally {
                    ctx.renderClassicalRuleLogicSurfaceBlock = originalRenderClassicalRuleLogicSurfaceBlock;
                }
            })()
            : null,
        {
            selected: false,
            causeeValence: true,
            legacyRelation: false,
            unrelated: false,
        }
    );

    s.eq(
        "The live-shaped Causee Valence control retains eligible shuntline intent and Change resets the causee choice",
        typeof ctx.getClassicalCausativeParticipantControlRequestOverrides === "function"
            && typeof ctx.handleClassicalCausativeParticipantRevisionClick === "function"
            && ctx.document
            ? (() => {
                const originalGetElementById = ctx.document.getElementById;
                const priorSurfaceFrame = ctx.ActiveClassicalRuleLogicSurfaceFrame;
                const originalRenderClassicalRuleLogicSurfaceBlock = ctx.renderClassicalRuleLogicSurfaceBlock;
                const controls = {
                    "classical-rule-logic-causative-causee-valence": {
                        id: "classical-rule-logic-causative-causee-valence",
                        value: "",
                    },
                    "classical-rule-logic-causative-specific-shuntline-realization": {
                        id: "classical-rule-logic-causative-specific-shuntline-realization",
                        value: "silent",
                    },
                };
                ctx.document.getElementById = (id) => controls[id] || null;
                ctx.renderClassicalRuleLogicSurfaceBlock = () => null;
                try {
                    controls["classical-rule-logic-causative-causee-valence"].value = "reflexive";
                    const causeeRequest = ctx.getClassicalCausativeParticipantControlRequestOverrides(
                        controls["classical-rule-logic-causative-causee-valence"]
                    );
                    const revisionButton = {
                        disabled: false,
                        dataset: {
                            classicalSegmentControl: "classical-rule-logic-causative-causee-valence",
                            classicalSegmentValue: "",
                            classicalSegmentReset: "true",
                        },
                        closest() {
                            return this;
                        },
                    };
                    const resetAccepted = ctx.handleClassicalCausativeParticipantRevisionClick({
                        target: revisionButton,
                    });
                    return {
                        causeeRequest,
                        resetAccepted,
                        causeeAfterReset: controls["classical-rule-logic-causative-causee-valence"].value,
                    };
                } finally {
                    ctx.document.getElementById = originalGetElementById;
                    ctx.ActiveClassicalRuleLogicSurfaceFrame = priorSurfaceFrame;
                    ctx.renderClassicalRuleLogicSurfaceBlock = originalRenderClassicalRuleLogicSurfaceBlock;
                }
            })()
            : null,
        {
            causeeRequest: {
                causativeObjectKind: "reflexive",
                causativeSpecificShuntlineRealization: "silent",
            },
            resetAccepted: true,
            causeeAfterReset: "",
        }
    );

    s.eq(
        "The iuc-ci equal-person causative recomputes from required Causee Valence to an authorized typed result",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const base = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "iuc-ci",
                    sourceTransitivity: "intransitive",
                    verbClass: "A",
                    valence: "intransitive",
                    subject: "3sg",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    derivationType: "causative",
                    sourceSubject: "3sg",
                    causativeSourceVoice: "active",
                    vncVoice: "active",
                    mood: "indicative",
                    tense: "present",
                    construction: "none",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                };
                const preview = ctx.buildClassicalRuleLogicSurfaceFrame(base);
                const option = preview.state?.derivationOptionInventory?.options?.find(
                    (candidate) => candidate.targetStem === "iuc-xi-tiā"
                );
                const pending = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    derivationOptionId: option?.optionId || "",
                });
                const priorSurfaceFrame = ctx.ActiveClassicalRuleLogicSurfaceFrame;
                ctx.ActiveClassicalRuleLogicSurfaceFrame = pending;
                let selected;
                let selectedParadigm;
                let reflexive;
                let movedReflexiveCoordinate;
                try {
                    selected = ctx.buildClassicalRuleLogicSurfaceFrame({
                        ...base,
                        derivationOptionId: option?.optionId || "",
                        causativeObjectKind: "specific-projective",
                    });
                    selectedParadigm = ctx.buildClassicalRuleLogicSurfaceFrame({
                        ...base,
                        derivationOptionId: option?.optionId || "",
                        causativeObjectKind: "specific-projective",
                        vncOutputScope: "paradigm",
                    });
                    reflexive = ctx.buildClassicalRuleLogicSurfaceFrame({
                        ...base,
                        derivationOptionId: option?.optionId || "",
                        causativeObjectKind: "reflexive",
                    });
                    ctx.ActiveClassicalRuleLogicSurfaceFrame = reflexive;
                    movedReflexiveCoordinate = ctx.buildClassicalRuleLogicSurfaceFrame({
                        ...base,
                        subject: "3pl",
                        derivationOptionId: option?.optionId || "",
                        causativeObjectKind: "reflexive",
                    });
                } finally {
                    ctx.ActiveClassicalRuleLogicSurfaceFrame = priorSurfaceFrame;
                }
                const selectedSurfaceModel = ctx.buildClassicalVncAuthorityDerivationSurfaceModel(selected);
                const selectedParadigmSurfaceModel = ctx.buildClassicalVncAuthorityDerivationSurfaceModel(selectedParadigm);
                const reflexiveSurfaceModel = ctx.buildClassicalVncAuthorityDerivationSurfaceModel(reflexive);
                const movedReflexiveSurfaceModel = ctx.buildClassicalVncAuthorityDerivationSurfaceModel(movedReflexiveCoordinate);
                return {
                    pending: [pending.authorizationStatus, pending.blockReason],
                    selected: [selected.authorizationStatus, selected.blockReason],
                    selectedSingleFormCoordinates: [
                        selected.authorityCapabilityFrame?.capabilities?.mood === true,
                        selected.authorityCapabilityFrame?.capabilities?.tense === true,
                        selected.authorityCapabilityFrame?.capabilities?.voice === true,
                        selected.authorityCapabilityFrame?.capabilityBasis || "",
                    ],
                    requestedCauseeValence: selected.state?.requestedCausativeObjectKind || "",
                    selectedCauseeValence: selected.state?.causativeObjectKind || "",
                    normalizedCauseeValence: selected.state?.vncApplicationFrame?.normalizedRequest?.causativeObjectKind || "",
                    reflexive: [
                        reflexive.authorizationStatus,
                        reflexive.state?.causativeObjectKind || "",
                        reflexive.state?.vncApplicationFrame?.normalizedRequest?.sourceSubject || "",
                    ],
                    movedReflexiveCoordinate: [
                        movedReflexiveCoordinate.authorizationStatus,
                        movedReflexiveCoordinate.state?.causativeObjectKind || "",
                        movedReflexiveCoordinate.state?.vncApplicationFrame?.normalizedRequest?.sourceSubject || "",
                    ],
                    selectedSurfaceModel: {
                        kind: selectedSurfaceModel?.kind || "",
                        grammarAuthority: selectedSurfaceModel?.grammarAuthority,
                        source: [
                            selectedSurfaceModel?.source?.subject || "",
                            selectedSurfaceModel?.source?.valence || "",
                        ],
                        operation: [
                            selectedSurfaceModel?.operation?.addedObjectKind || "",
                            selectedSurfaceModel?.operation?.participantBinding || "",
                        ],
                        result: [
                            selectedSurfaceModel?.result?.subject || "",
                            selectedSurfaceModel?.result?.subjectLabel || "",
                            selectedSurfaceModel?.result?.valence || "",
                        ],
                    },
                    outputScopeParity: [
                        selectedParadigm.authorizationStatus,
                        selectedParadigmSurfaceModel?.source?.subject === selectedSurfaceModel?.source?.subject,
                        selectedParadigmSurfaceModel?.source?.valence === selectedSurfaceModel?.source?.valence,
                        selectedParadigmSurfaceModel?.operation?.participantBinding === selectedSurfaceModel?.operation?.participantBinding,
                        selectedParadigmSurfaceModel?.result?.subject === selectedSurfaceModel?.result?.subject,
                        selectedParadigmSurfaceModel?.result?.valence === selectedSurfaceModel?.result?.valence,
                    ],
                    reflexiveSurfaceModel: [
                        reflexiveSurfaceModel?.operation?.participantBinding || "",
                        reflexiveSurfaceModel?.source?.subjectDisplay || "",
                    ],
                    movedReflexiveSurfaceModel: [
                        movedReflexiveSurfaceModel?.operation?.participantBinding || "",
                        movedReflexiveSurfaceModel?.source?.subjectDisplay || "",
                    ],
                    selectedFormula: selected.selectedFormula,
                    sentenceSurface: selected.sentenceSurfaceDisplay,
                };
            })()
            : null,
        {
            pending: ["blocked", "classical-vnc-causative-causee-valence-selection-required"],
            selected: ["authorized", ""],
            selectedSingleFormCoordinates: [true, true, true, "authorized-source-machinery-for-derived-vnc"],
            requestedCauseeValence: "specific-projective",
            selectedCauseeValence: "specific-projective",
            normalizedCauseeValence: "specific-projective",
            reflexive: ["authorized", "reflexive", "3sg"],
            movedReflexiveCoordinate: ["authorized", "reflexive", "3pl"],
            selectedSurfaceModel: {
                kind: "classical-vnc-authority-derivation-surface-model",
                grammarAuthority: false,
                source: ["3sg", "intransitive"],
                operation: ["specific-projective", "fixed-source-subject"],
                result: ["3sg", "Imported subject (causer)", "specific-projective"],
            },
            outputScopeParity: ["authorized", true, true, true, true, true],
            reflexiveSurfaceModel: [
                "target-subject-coordinate",
                "bound to resulting-subject coordinate (3sg)",
            ],
            movedReflexiveSurfaceModel: [
                "target-subject-coordinate",
                "bound to resulting-subject coordinate (3pl)",
            ],
            selectedFormula: "#0-0+qu-0(iuc-xi-tia)0+0-0#",
            sentenceSurface: "Quiucxitia.",
        }
    );

    s.eq(
        "The authorized applicative surface model preserves the source subject and reports its added object without becoming grammar authority",
        typeof ctx.buildClassicalVncAuthorityDerivationSurfaceModel === "function"
            ? (() => {
                const base = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "xeloa",
                    sourceTransitivity: "transitive",
                    verbClass: "C",
                    valence: "specific-projective",
                    subject: "1sg",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    derivationType: "applicative",
                    applicativeObjectKind: "specific-projective",
                    applicativeObjectPerson: "2sg",
                    vncVoice: "active",
                    mood: "indicative",
                    tense: "present",
                    construction: "none",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                };
                const preview = ctx.buildClassicalRuleLogicSurfaceFrame(base);
                const option = preview.state?.derivationOptionInventory?.options?.find(
                    (candidate) => candidate.targetStem === "xel-huiā"
                );
                const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    derivationOptionId: option?.optionId || "",
                });
                const model = ctx.buildClassicalVncAuthorityDerivationSurfaceModel(surface);
                const paradigmSurface = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    derivationOptionId: option?.optionId || "",
                    vncOutputScope: "paradigm",
                });
                const paradigmModel = ctx.buildClassicalVncAuthorityDerivationSurfaceModel(paradigmSurface);
                return {
                    authorization: [surface.authorizationStatus, model?.authorizationStatus || ""],
                    selectedSingleFormCoordinates: [
                        surface.authorityCapabilityFrame?.capabilities?.mood === true,
                        surface.authorityCapabilityFrame?.capabilities?.tense === true,
                        surface.authorityCapabilityFrame?.capabilities?.voice === true,
                        surface.authorityCapabilityFrame?.capabilityBasis || "",
                    ],
                    kind: model?.kind || "",
                    grammarAuthority: model?.grammarAuthority,
                    source: [
                        model?.source?.stem || "",
                        model?.source?.subject || "",
                        model?.source?.valence || "",
                    ],
                    operation: [
                        model?.operation?.addedObjectKind || "",
                        model?.operation?.addedObjectPerson || "",
                        model?.operation?.participantBinding || "",
                        model?.operation?.participantRole || "",
                    ],
                    result: [
                        model?.result?.stem || "",
                        model?.result?.subject || "",
                        model?.result?.subjectLabel || "",
                        model?.result?.valence || "",
                    ],
                    outputScopeParity: [
                        paradigmSurface.authorizationStatus,
                        paradigmModel?.source?.subject === model?.source?.subject,
                        paradigmModel?.source?.valence === model?.source?.valence,
                        paradigmModel?.operation?.addedObjectKind === model?.operation?.addedObjectKind,
                        paradigmModel?.operation?.participantBinding === model?.operation?.participantBinding,
                        paradigmModel?.result?.subject === model?.result?.subject,
                        paradigmModel?.result?.valence === model?.result?.valence,
                    ],
                };
            })()
            : null,
        {
            authorization: ["authorized", "authorized"],
            selectedSingleFormCoordinates: [true, true, true, "authorized-source-machinery-for-derived-vnc"],
            kind: "classical-vnc-authority-derivation-surface-model",
            grammarAuthority: false,
                    source: ["xel-o-ā", "1sg", "specific-projective"],
            operation: ["specific-projective", "2sg", "source-subject-preserved", "mainline applicative object"],
            result: ["xel-huiā", "1sg", "Subject · preserved from Source VNC", "multiple-object"],
            outputScopeParity: ["authorized", true, true, true, true, true, true],
        }
    );

    s.eq(
        "A reflexive causee request cannot carry an independently selected embedded subject",
        typeof ctx.buildClassicalRuleLogicVncApplicationRequest === "function"
            ? (() => {
                const request = ctx.buildClassicalRuleLogicVncApplicationRequest({
                    stem: "iuc-ci",
                    subject: "3pl",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "A",
                    valence: "intransitive",
                    derivationType: "causative",
                    requestedDerivationOptionId: "type-one-iuc-xi-tia",
                    sourceVoice: "active",
                    sourceSubject: "1sg",
                    causativeObjectKindChoiceEligible: true,
                    causativeObjectKind: "reflexive",
                });
                return {
                    causeeValence: request.causativeObjectKind,
                    independentEmbeddedSubjectPresent: Object.prototype.hasOwnProperty.call(request, "sourceSubject"),
                    legacyRelationPresent: Object.prototype.hasOwnProperty.call(request, "causativeReferentRelation"),
                };
            })()
            : null,
        {
            causeeValence: "reflexive",
            independentEmbeddedSubjectPresent: false,
            legacyRelationPresent: false,
        }
    );

    s.ok(
        "A selected single-form applicative Voice changes the canonical result rather than only its displayed control value",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const base = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "xeloa",
                    sourceTransitivity: "transitive",
                    verbClass: "C",
                    valence: "specific-projective",
                    subject: "1sg",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    derivationType: "applicative",
                    applicativeObjectKind: "specific-projective",
                    applicativeObjectPerson: "3sg",
                    mood: "indicative",
                    tense: "preterit",
                    construction: "none",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                };
                const preview = ctx.buildClassicalRuleLogicSurfaceFrame(base);
                const derivationOptionId = preview.state?.derivationOptionInventory?.options?.find(
                    (candidate) => candidate.targetStem === "xel-huiā"
                )?.optionId || "";
                const active = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    derivationOptionId,
                    vncVoice: "active",
                });
                const passive = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    derivationOptionId,
                    vncVoice: "passive",
                });
                return active.authorizationStatus === "authorized"
                    && passive.authorizationStatus === "authorized"
                    && passive.state?.vncApplicationFrame?.controlFrame?.selectedVoice === "passive"
                    && passive.state?.vncApplicationFrame?.resultFrame?.selectedMachineryFrame?.voice === "passive"
                    && passive.selectedFormula !== active.selectedFormula
                    && passive.sentenceSurfaceDisplay !== active.sentenceSurfaceDisplay;
            })()
            : false
    );

    s.eq(
        "Only the selected nonactive formation is forwarded as public intent",
        typeof ctx.getClassicalNonactiveFormationControlRequestOverrides === "function" ? [
            ctx.getClassicalNonactiveFormationControlRequestOverrides({
                id: "classical-rule-logic-nonactive-family",
                value: "tla-impersonal",
                derivedStem: "forged-stem",
                formula: "forged-formula",
            }),
            ctx.getClassicalNonactiveFormationControlRequestOverrides({
                id: "classical-rule-logic-vnc-voice",
                value: "impersonal",
                nonactiveOptionId: "forged-option",
            }),
        ] : null,
        [{ nonactiveOptionId: "tla-impersonal" }, {}]
    );

    s.eq(
        "A nonactive choice is accepted once and unrelated controls are ignored",
        typeof ctx.handleClassicalNonactiveFormationControlChange === "function"
            ? (() => {
                const originalRender = ctx.renderClassicalRuleLogicSurfaceBlock;
                ctx.renderClassicalRuleLogicSurfaceBlock = request => request;
                const event = {
                    target: {
                        id: "classical-rule-logic-nonactive-family",
                        value: "inherent-impersonal",
                    },
                };
                try {
                    return [
                        ctx.handleClassicalNonactiveFormationControlChange(event),
                        ctx.handleClassicalNonactiveFormationControlChange(event),
                        ctx.handleClassicalNonactiveFormationControlChange({
                            target: { id: "classical-rule-logic-subject", value: "1sg" },
                        }),
                    ];
                } finally {
                    ctx.renderClassicalRuleLogicSurfaceBlock = originalRender;
                }
            })()
            : null,
        [true, true, false]
    );

    s.ok(
        "Existing and late nonactive controls share the guarded event path",
        composerSource.includes('documentObject.addEventListener("input", handleClassicalNonactiveFormationControlChange, true);')
            && composerSource.includes('control.addEventListener("input", handleClassicalNonactiveFormationControlChange);')
            && composerSource.includes("HandledClassicalNonactiveFormationChangeEvents.has(event)")
            && composerSource.includes("getClassicalNonactiveFormationControlRequestOverrides(control)")
            && (composerSource.match(/documentObject\.addEventListener\("input", handleClassicalNonactiveFormationControlChange, true\);/g) || []).length === 1
            && renderingSource.includes('nonactiveFormationControl.addEventListener("input", targetObject.handleClassicalNonactiveFormationControlChange);')
            && renderingSource.includes('nonactiveFormationControl.dataset.classicalNonactiveFormationEventBound = "true";')
    );

    return s;
}

module.exports = { run };
