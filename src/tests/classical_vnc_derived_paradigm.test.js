"use strict";

const { createSuite } = require("./runner");

function selectOption(application, request, targetStem) {
    const preview = application.evaluate({ ...request, derivationOptionId: "" });
    return (preview.controlFrame?.derivationOptionInventory?.options || []).find(option => option.targetStem === targetStem) || null;
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_derived_paradigm");
    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const coordinates = [
        ["indicative", ["present", "customary-present", "imperfect", "future", "preterit", "distant-past"]],
        ["optative", ["nonpast", "past", "future", "preterit"]],
        ["admonitive", ["nonpast"]],
    ].flatMap(([mood, tenses]) => tenses.flatMap(tense => ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].map(subject => ({ mood, tense, subject }))));
    const cases = [{
        label: "specific Causative",
        request: {
            sourceStem: "tomi",
            verbClass: "B",
            sourceValence: "intransitive",
            sourceSubject: "3sg",
            subject: "1sg",
            mood: "indicative",
            tense: "present",
            requestedDerivation: "causative",
            causativeObjectKind: "specific-projective",
            requestedVoice: "active",
        },
        targetStem: "tom-a",
        targetValence: "specific-projective",
        expectedStatusCounts: { authorized: 66 },
        expectedBlockReasonCounts: {},
    }, {
        label: "reflexive Causative",
        request: {
            sourceStem: "tomi",
            verbClass: "B",
            sourceValence: "intransitive",
            sourceSubject: "3sg",
            subject: "1sg",
            mood: "indicative",
            tense: "present",
            requestedDerivation: "causative",
            causativeObjectKind: "reflexive",
            requestedVoice: "active",
        },
        targetStem: "tom-a",
        targetValence: "mainline-reflexive",
        expectedStatusCounts: { authorized: 66 },
        expectedBlockReasonCounts: {},
    }, {
        label: "specific Applicative",
        request: {
            sourceStem: "mati",
            verbClass: "B",
            sourceValence: "specific-projective",
            subject: "1sg",
            objectPerson: "3sg",
            mood: "indicative",
            tense: "present",
            requestedDerivation: "applicative",
            applicativeObjectKind: "specific-projective",
            applicativeObjectPerson: "2sg",
            requestedVoice: "active",
        },
        targetStem: "mati-liā",
        targetValence: "multiple-object",
        expectedStatusCounts: { authorized: 55, blocked: 11 },
        expectedBlockReasonCounts: {
            "classical-vnc-applicative-coreferential-specific-object-must-be-reflexive": 11,
        },
    }, {
        label: "reflexive Applicative",
        request: {
            sourceStem: "mati",
            verbClass: "B",
            sourceValence: "specific-projective",
            subject: "1sg",
            objectPerson: "3sg",
            mood: "indicative",
            tense: "present",
            requestedDerivation: "applicative",
            applicativeObjectKind: "reflexive",
            applicativeObjectPerson: "",
            requestedVoice: "active",
        },
        targetStem: "mati-liā",
        targetValence: "multiple-object",
        expectedStatusCounts: { authorized: 66 },
        expectedBlockReasonCounts: {},
    }];

    cases.forEach(({ label, request, targetStem, targetValence, expectedStatusCounts, expectedBlockReasonCounts }) => {
        const option = selectOption(application, request, targetStem);
        const selectedRequest = { ...request, derivationOptionId: option?.optionId || "missing-derived-paradigm-option" };
        const singleScopePlan = application.prepareParadigm({ ...selectedRequest, outputScope: "single" });
        const fullScopePlan = application.prepareParadigm({ ...selectedRequest, outputScope: "paradigm" });
        s.eq(`${label} Grammar predicate is scope invariant`, {
            singleStatus: singleScopePlan.authorizationStatus,
            fullStatus: fullScopePlan.authorizationStatus,
            singleKind: singleScopePlan.conjugatablePredicateKind,
            fullKind: fullScopePlan.conjugatablePredicateKind,
            sameSignature: singleScopePlan.predicateSignature === fullScopePlan.predicateSignature,
            targetStem: fullScopePlan.targetStem,
            targetValence: fullScopePlan.targetValence,
        }, {
            singleStatus: "authorized",
            fullStatus: "authorized",
            singleKind: "classical-nahuatl-vnc-conjugatable-predicate",
            fullKind: "classical-nahuatl-vnc-conjugatable-predicate",
            sameSignature: true,
            targetStem,
            targetValence,
        });

        const scalar = application.inflectPredicateCoordinate(fullScopePlan, coordinates[0]);
        const projectedFirst = application.projectParadigmCoordinates(fullScopePlan, [coordinates[0]])[0];
        const independentlySelectedScalar = application.evaluate({
            ...selectedRequest,
            ...coordinates[0],
            outputScope: "single",
        });
        s.eq(`${label} one coordinate and table use the same predicate inflector`, {
            scalarStatus: scalar.authorizationStatus,
            samePredicate: scalar.predicateSignature === fullScopePlan.predicateSignature
                && projectedFirst.predicateSignature === fullScopePlan.predicateSignature,
            sameTypedResult: scalar.formulaRealization === projectedFirst.formulaRealization
                && scalar.surfaceRealization === projectedFirst.surfaceRealization
                && scalar.typedSlotFrame?.semanticIdentity === projectedFirst.typedSlotFrame?.semanticIdentity
                && scalar.formulaRealization === independentlySelectedScalar.resultFrame?.formulaRealization
                && scalar.surfaceRealization === independentlySelectedScalar.resultFrame?.surfaceRealization,
            originalSourceOperation: [
                scalar.scalarApplicationFrame?.normalizedRequest?.sourceStem,
                scalar.scalarApplicationFrame?.controlFrame?.derivationType,
                scalar.scalarApplicationFrame?.controlFrame?.selectedDerivationOptionId,
                scalar.scalarApplicationFrame?.controlFrame?.selectedVoice,
            ],
        }, {
            scalarStatus: "authorized",
            samePredicate: true,
            sameTypedResult: true,
            originalSourceOperation: [
                request.sourceStem,
                request.requestedDerivation,
                option?.optionId || "missing-derived-paradigm-option",
                request.requestedVoice,
            ],
        });

        const fullProjection = application.projectParadigmCoordinates(fullScopePlan, coordinates);
        const statusCounts = Object.fromEntries([...new Set(fullProjection.map(frame => frame.authorizationStatus))].sort().map(status => [
            status,
            fullProjection.filter(frame => frame.authorizationStatus === status).length,
        ]));
        const blockReasonCounts = Object.fromEntries([...new Set(fullProjection.map(frame => frame.blockReason).filter(Boolean))].sort().map(reason => [
            reason,
            fullProjection.filter(frame => frame.blockReason === reason).length,
        ]));
        s.eq(`${label} complete predicate projection`, {
            statusCounts,
            blockReasonCounts,
            allCoordinatesCanonical: fullProjection.every(frame => ctx.isClassicalNahuatlVncParadigmCoordinateFrame(frame)),
            onePredicate: fullProjection.every(frame => frame.predicateSignature === fullScopePlan.predicateSignature),
            pointwiseScalarEvaluation: fullProjection.every((frame) => (
                frame.scalarEquivalent === true
                && frame.authorizationStatus === frame.scalarApplicationFrame?.authorizationStatus
                && frame.blockReason === frame.scalarApplicationFrame?.blockReason
                && frame.formulaRealization === (frame.scalarApplicationFrame?.resultFrame?.formulaRealization || "")
                && frame.surfaceRealization === (frame.scalarApplicationFrame?.resultFrame?.surfaceRealization || "")
                && (frame.typedSlotFrame?.semanticIdentity || "")
                    === (frame.scalarApplicationFrame?.resultFrame?.finalTypedVncSlotFrame?.semanticIdentity || "")
            )),
            originalSourceOperationPreserved: fullProjection.every((frame) => (
                frame.sourceStem === request.sourceStem
                && frame.sourceClass === request.verbClass
                && frame.sourceValence === request.sourceValence
                && frame.derivationType === request.requestedDerivation
                && frame.selectedDerivationOptionId === option?.optionId
                && frame.selectedVoice === request.requestedVoice
                && frame.scalarApplicationFrame?.normalizedRequest?.sourceStem === request.sourceStem
            )),
            noDerivationReconstructionArtifacts: fullProjection.every(frame => ![
                "classical-vnc-paradigm-derived-source-not-authorized",
                "classical-vnc-paradigm-derived-source-analysis-not-authorized",
                "classical-vnc-paradigm-derived-inventory-not-authorized",
                "classical-vnc-paradigm-derived-option-not-authorized",
                "classical-vnc-derived-machinery-source-environment-continuity-required",
                "classical-vnc-causative-equal-person-category-referent-choice-required",
            ].includes(frame.blockReason)),
        }, {
            statusCounts: expectedStatusCounts,
            blockReasonCounts: expectedBlockReasonCounts,
            allCoordinatesCanonical: true,
            onePredicate: true,
            pointwiseScalarEvaluation: true,
            originalSourceOperationPreserved: true,
            noDerivationReconstructionArtifacts: true,
        });

        const forged = application.projectParadigmCoordinates(Object.freeze({ ...fullScopePlan }), [coordinates[0]])[0];
        const poisoned = application.projectParadigmCoordinates(fullScopePlan, [{ ...coordinates[0], targetStem: "forged" }])[0];
        s.eq(`${label} predicate and coordinate authority fail closed`, {
            forged: forged.blockReason,
            poisoned: poisoned.blockReason,
        }, {
            forged: "classical-vnc-paradigm-plan-not-issued-by-service",
            poisoned: "classical-vnc-paradigm-coordinate-fields-rejected",
        });
    });

    s.eq(
        "a later nonactive voice remains selected after derivation at the scalar and paradigm coordinate",
        (() => {
            const baseRequest = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const option = selectOption(application, baseRequest, "tom-a");
            const voicePreview = application.evaluate({
                ...baseRequest,
                derivationOptionId: option?.optionId || "",
                requestedVoice: "passive",
            });
            const nonactiveOptionId =
                voicePreview.controlFrame?.nonactiveOptionInventory
                    ?.automaticOptionId
                || voicePreview.controlFrame?.nonactiveOptionInventory
                    ?.options?.[0]?.optionId
                || "";
            const selectedRequest = {
                ...baseRequest,
                derivationOptionId: option?.optionId || "",
                requestedVoice: "passive",
                nonactiveOptionId,
            };
            const scalar = application.evaluate({
                ...selectedRequest,
                subject: "2pl",
            });
            const plan = application.prepareParadigm(selectedRequest);
            const coordinate =
                application.projectParadigmCoordinates(plan, [{
                    subject: "2pl",
                    mood: "indicative",
                    tense: "present",
                }])[0];
            return {
                statuses: [
                    scalar.authorizationStatus,
                    plan.authorizationStatus,
                    coordinate.authorizationStatus,
                ],
                sourceAndOperations: [
                    coordinate.sourceStem,
                    coordinate.derivationType,
                    coordinate.selectedDerivationOptionId,
                    coordinate.selectedVoice,
                    coordinate.selectedVoiceOperation,
                    coordinate.selectedNonactiveOptionId,
                ],
                selectedIds: [
                    option?.optionId || "",
                    nonactiveOptionId,
                ],
                scalarParity: [
                    coordinate.scalarApplicationFrame?.normalizedRequest
                        ?.sourceStem === baseRequest.sourceStem,
                    coordinate.scalarApplicationFrame?.controlFrame
                        ?.derivationType === "causative",
                    coordinate.scalarApplicationFrame?.controlFrame
                        ?.selectedVoice === "passive",
                    coordinate.formulaRealization
                        === scalar.resultFrame?.formulaRealization,
                    coordinate.surfaceRealization
                        === scalar.resultFrame?.surfaceRealization,
                    coordinate.typedSlotFrame
                        === coordinate.scalarApplicationFrame?.resultFrame
                            ?.finalTypedVncSlotFrame,
                ],
                projections: [
                    coordinate.formulaRealization,
                    coordinate.surfaceRealization,
                ],
            };
        })(),
        {
            statuses: ["authorized", "authorized", "authorized"],
            sourceAndOperations: [
                "tomi",
                "causative",
                "causative:type-one:replacement:tomi:tom-a",
                "passive",
                "passive",
                "lō:tom-a-lō",
            ],
            selectedIds: [
                "causative:type-one:replacement:tomi:tom-a",
                "lō:tom-a-lō",
            ],
            scalarParity: [true, true, true, true, true, true],
            projections: [
                "#0-0(tom-a-lo)0+0-0#",
                "tomalo",
            ],
        }
    );

    s.eq(
        "curriculum, stored-answer, formula, and target carriers cannot authorize a VNC paradigm or coordinate",
        (() => {
            const request = {
                sourceStem: "nemi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "direct",
                requestedVoice: "active",
            };
            const poisonedPlan = application.prepareParadigm({
                ...request,
                lesson: 7,
                storedAnswer: "FORGED-STORED-ANSWER",
                formula: "#FORGED-FORMULA#",
                targetStem: "forged-target",
            });
            const cleanPlan = application.prepareParadigm(request);
            const poisonedCoordinate =
                application.projectParadigmCoordinates(cleanPlan, [{
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    lessonNumber: 58,
                    displayText: "FORGED-DISPLAY",
                }])[0];
            return {
                plan: {
                    status: poisonedPlan.authorizationStatus,
                    reason: poisonedPlan.blockReason,
                    rejected: poisonedPlan.rejectedAuthorityFields,
                    poisonAbsent:
                        !JSON.stringify(poisonedPlan).includes("FORGED"),
                    curriculumOrderAuthority:
                        poisonedPlan.curriculumOrderAuthority,
                    lessonMetadataAuthority:
                        poisonedPlan.lessonMetadataAuthority,
                },
                coordinate: {
                    status: poisonedCoordinate.authorizationStatus,
                    reason: poisonedCoordinate.blockReason,
                    rejected: poisonedCoordinate.rejectedFields,
                    poisonAbsent:
                        !JSON.stringify(poisonedCoordinate).includes("FORGED"),
                    curriculumOrderAuthority:
                        poisonedCoordinate.curriculumOrderAuthority,
                    lessonMetadataAuthority:
                        poisonedCoordinate.lessonMetadataAuthority,
                },
            };
        })(),
        {
            plan: {
                status: "blocked",
                reason: "classical-vnc-paradigm-plan-caller-authority-rejected",
                rejected: ["targetStem", "formula", "storedAnswer", "lesson"],
                poisonAbsent: true,
                curriculumOrderAuthority: false,
                lessonMetadataAuthority: false,
            },
            coordinate: {
                status: "blocked",
                reason: "classical-vnc-paradigm-coordinate-fields-rejected",
                rejected: ["lessonNumber", "displayText"],
                poisonAbsent: true,
                curriculumOrderAuthority: false,
                lessonMetadataAuthority: false,
            },
        }
    );

    return s;
}

module.exports = { run };
