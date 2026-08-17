"use strict";

const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const {
    CANVAS_EXAMPLES,
    buildCanvasExampleFrame,
    getFormulaRealization,
    projectRuntimeFormulaToCanvasWitnessShape,
} = require(path.join(ROOT, "scripts", "audit_classical_lessons24_26_canvas_examples.js"));

function findCanvasExample(id) {
    return CANVAS_EXAMPLES.find((example) => example.id === id);
}

function findNestedFrameByKind(value, expectedKind, seen = new Set()) {
    if (!value || typeof value !== "object" || seen.has(value)) {
        return null;
    }
    seen.add(value);
    if (value.kind === expectedKind) {
        return value;
    }
    for (const child of Object.values(value)) {
        const found = findNestedFrameByKind(child, expectedKind, seen);
        if (found) {
            return found;
        }
    }
    return null;
}

function summarizeCanvasBuild(context, exampleId) {
    const example = findCanvasExample(exampleId);
    const built = buildCanvasExampleFrame(context, example);
    return {
        example,
        built,
        summary: {
            inventoryStatus: built.optionInventory.authorizationStatus,
            optionIdPresent: Boolean(built.selectedOption?.optionId),
            subtype: built.selectedOption?.subtype || built.selectedOption?.derivationSubtype || "",
            targetStem: built.operationFrame?.targetStem || "",
            operationStatus: built.operationFrame?.authorizationStatus || "",
            operationTyped: context.isClassicalNahuatlVncDerivationOperationFrame(built.operationFrame),
            machineryStatus: built.machineryFrame?.authorizationStatus || "",
            formula: getFormulaRealization(built.machineryFrame),
        },
    };
}

function buildLesson2425Source(context, stem, {
    verbClass = "B",
    sourceValence = "intransitive",
} = {}) {
    return context.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: sourceValence === "intransitive" ? "none" : "specific-projective",
        objectPerson: sourceValence === "intransitive" ? "" : "2sg",
    });
}

function getBoundarylessClassicalStemIdentity(stem = "") {
    return String(stem || "").normalize("NFC").replace(/-/gu, "");
}

function run(ctx = {}) {
    const s = createSuite("classical_lessons24_26");

    s.eq(
        "Canvas witness comparison reads open verbstem shape rather than a stem whitelist",
        {
            canvasWitness: projectRuntimeFormulaToCanvasWitnessShape(
                "#ti-0+n-ēch+□-0(chihua-l-tia)0+0-0#"
            ),
            arbitraryMatchingStem: projectRuntimeFormulaToCanvasWitnessShape(
                "#ti-0+n-ēch+⎕-0(zepī-l-tiā)0+0-0#"
            ),
            differentMorphemeShape: projectRuntimeFormulaToCanvasWitnessShape(
                "#ti-0+n-ēch+⎕-0(zepī-tiā)0+0-0#"
            ),
        },
        {
            canvasWitness: "#ti-0+n-ēch+0-0(OPEN-STEM-MORPHEME-MORPHEME)0+0-0#",
            arbitraryMatchingStem: "#ti-0+n-ēch+0-0(OPEN-STEM-MORPHEME-MORPHEME)0+0-0#",
            differentMorphemeShape: "#ti-0+n-ēch+0-0(OPEN-STEM-MORPHEME)0+0-0#",
        }
    );

    s.eq(
        "The modern runtime exposes the complete typed Lessons 24-26 core boundary",
        [
            "buildClassicalNahuatlVncDerivationSourceAnalysisFrame",
            "isClassicalNahuatlVncDerivationSourceAnalysisFrame",
            "getClassicalNahuatlVncDerivationOptionInventory",
            "isClassicalNahuatlVncDerivationOptionInventory",
            "deriveClassicalNahuatlVncDerivationOperationFrame",
            "isClassicalNahuatlVncDerivationOperationFrame",
            "buildClassicalNahuatlDerivedVncMachineryFrame",
            "isClassicalNahuatlDerivedVncMachineryFrame",
        ].map((capability) => [capability, typeof ctx[capability]]),
        [
            ["buildClassicalNahuatlVncDerivationSourceAnalysisFrame", "function"],
            ["isClassicalNahuatlVncDerivationSourceAnalysisFrame", "function"],
            ["getClassicalNahuatlVncDerivationOptionInventory", "function"],
            ["isClassicalNahuatlVncDerivationOptionInventory", "function"],
            ["deriveClassicalNahuatlVncDerivationOperationFrame", "function"],
            ["isClassicalNahuatlVncDerivationOperationFrame", "function"],
            ["buildClassicalNahuatlDerivedVncMachineryFrame", "function"],
            ["isClassicalNahuatlDerivedVncMachineryFrame", "function"],
        ]
    );

    s.eq(
        "Lesson 24 derives both witnessed tomi causatives from typed source participants",
        (() => {
            const distinct = summarizeCanvasBuild(ctx, "l24-8146-tomi-distinct-causative");
            const reflexive = summarizeCanvasBuild(ctx, "l24-8166-tomi-reflexive-causative");
            const summarizeAddedObject = (built) => {
                const request = built.operationFrame?.participantTransformFrame?.addedObjectRequest
                    || built.operationFrame?.targetObjectRequests?.[0]
                    || null;
                return request ? {
                    objectId: request.objectId,
                    objectKind: request.objectKind,
                    objectPerson: request.objectPerson,
                    governor: request.governor,
                    derivationalLevel: request.derivationalLevel,
                } : null;
            };
            return {
                canvasLines: [
                    [distinct.example.lineStart, distinct.example.lineEnd],
                    [reflexive.example.lineStart, reflexive.example.lineEnd],
                ],
                distinct: distinct.summary,
                distinctObject: summarizeAddedObject(distinct.built),
                reflexive: reflexive.summary,
                reflexiveObject: summarizeAddedObject(reflexive.built),
            };
        })(),
        {
            canvasLines: [[8002, 8029], [8030, 8051]],
            distinct: {
                inventoryStatus: "authorized",
                optionIdPresent: true,
                subtype: "type-one",
                targetStem: "tom-a",
                operationStatus: "authorized",
                operationTyped: true,
                machineryStatus: "authorized",
                formula: "#ni-0+c-0(tom-a)0+0-0#",
            },
            distinctObject: {
                objectId: "causative-object",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                governor: "causative",
                derivationalLevel: 1,
            },
            reflexive: {
                inventoryStatus: "authorized",
                optionIdPresent: true,
                subtype: "type-one",
                targetStem: "tom-a",
                operationStatus: "authorized",
                operationTyped: true,
                machineryStatus: "authorized",
                formula: "#ni-0+n-o(tom-a)0+0-0#",
            },
            reflexiveObject: {
                objectId: "causative-object",
                objectKind: "reflexive",
                objectPerson: "1sg",
                governor: "causative",
                derivationalLevel: 1,
            },
        }
    );

    s.eq(
        "The exact §25.8 tēmi bridge preserves long ī without promoting the ordinary Lesson 20 stem",
        (() => {
            const source = ctx.buildClassicalNahuatlVerbstemClassFrame("tēmi", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                perfectiveClass: "B",
                valence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
            });
            const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "causative",
            });
            const witnessedOption = inventory.options.find((option) => (
                option.targetStem === "tēm-a" && option.subtype === "type-one"
            ));
            const exactTypeTwoOption = inventory.options.find((option) => (
                option.targetStem === "tēmī-tiā"
                && option.targetConstruction?.nonactiveStem === "tēmī-hua"
            )) || null;
            const ordinaryLesson20Option = ctx.getClassicalNahuatlNonactiveStemOptions("tēmi", {
                verbClass: "B",
                sourceValence: "intransitive",
            }).options.find((option) => option.nonactiveStem === "tēmi-hua") || null;
            const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                optionId: witnessedOption?.optionId || "missing-temi-canvas-option",
                targetSubject: "1sg",
            });
            const exactTypeTwoOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                optionId: exactTypeTwoOption?.optionId || "missing-exact-temi-type-two-option",
                targetSubject: "1sg",
            });
            const forgedOrdinaryBridgeOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                optionId: ordinaryLesson20Option?.optionId || "missing-ordinary-temi-bridge",
                targetSubject: "1sg",
            });
            const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
                mood: "indicative",
                tense: "present",
                targetSubject: "1sg",
            });
            return {
                sourceStatus: source.authorizationStatus,
                inventoryStatus: inventory.authorizationStatus,
                inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                targets: inventory.options.map(option => option.targetStem),
                exactTypeTwo: {
                    target: exactTypeTwoOption?.targetStem || "",
                    bridge: exactTypeTwoOption?.targetConstruction?.nonactiveStem || "",
                    visibility: exactTypeTwoOption?.citationBridgeVisibility || "",
                    hypothetical: exactTypeTwoOption?.citationBridgeHypothetical,
                    exactWitness: exactTypeTwoOption?.exactWitness === true,
                    operationStatus: exactTypeTwoOperation.authorizationStatus,
                    operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(exactTypeTwoOperation),
                },
                ordinaryLesson20Stem: ordinaryLesson20Option?.nonactiveStem || "",
                ordinarySurfaceExcluded: !inventory.options.some((option) => option.targetStem === "tēmi-tiā"),
                forgedOrdinaryBridgeStatus: forgedOrdinaryBridgeOperation.authorizationStatus,
                forgedOrdinaryBridgeReason: forgedOrdinaryBridgeOperation.blockReason,
                selectorRequired: inventory.selectorRequired,
                selectedTarget: operation.targetStem || "",
                operationStatus: operation.authorizationStatus,
                operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                machineryStatus: machinery.authorizationStatus,
                machineryTyped: ctx.isClassicalNahuatlDerivedVncMachineryFrame(machinery),
                formula: getFormulaRealization(machinery),
            };
        })(),
        {
            sourceStatus: "authorized",
            inventoryStatus: "authorized",
            inventoryCanonical: true,
            targets: ["tēm-a", "tēmī-tiā"],
            exactTypeTwo: {
                target: "tēmī-tiā",
                bridge: "tēmī-hua",
                visibility: "typed-internal-prerequisite",
                hypothetical: false,
                exactWitness: true,
                operationStatus: "authorized",
                operationCanonical: true,
            },
            ordinaryLesson20Stem: "tēmi-hua",
            ordinarySurfaceExcluded: true,
            forgedOrdinaryBridgeStatus: "blocked",
            forgedOrdinaryBridgeReason: "classical-vnc-derivation-selected-option-was-not-generated",
            selectorRequired: true,
            selectedTarget: "tēm-a",
            operationStatus: "authorized",
            operationTyped: true,
            machineryStatus: "authorized",
            machineryTyped: true,
            formula: "#ni-0+c-0(tēm-a)0+0-0#",
        }
    );

    s.eq(
        "The §25.3 nēci bridge restores Canvas quantity and excludes the ordinary Lesson 20 short target",
        (() => {
            const source = buildLesson2425Source(ctx, "nēci");
            const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "causative",
            });
            const longNexOption = inventory.options.find(option => option.targetStem === "nēx-tiā") || null;
            const longNexiOption = inventory.options.find(option => option.targetStem === "nēxi-tiā") || null;
            const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                optionId: longNexOption?.optionId || "missing-neci-long-nex-option",
                targetSubject: "1sg",
            });
            return {
                inventoryStatus: inventory.authorizationStatus,
                inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                targets: inventory.options.map(option => option.targetStem),
                shortTargetExcluded: !inventory.options.some(option => option.targetStem === "nex-tiā"),
                longNex: {
                    bridge: longNexOption?.targetConstruction?.nonactiveStem || "",
                    route: longNexOption?.derivationRoute || "",
                    exact: longNexOption?.exactWitness === true,
                },
                longNexi: {
                    bridge: longNexiOption?.targetConstruction?.nonactiveStem || "",
                    exact: longNexiOption?.exactWitness === true,
                },
                operationStatus: operation.authorizationStatus,
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
            };
        })(),
        {
            inventoryStatus: "authorized",
            inventoryCanonical: true,
            targets: ["nēz-a", "nēci-ā", "nēxi-tiā", "nēx-tiā"],
            shortTargetExcluded: true,
            longNex: {
                bridge: "nēx-o-hua",
                route: "type-two-tia-from-nex-o-hua-internal-base",
                exact: true,
            },
            longNexi: {
                bridge: "nēxi-hua",
                exact: true,
            },
            operationStatus: "authorized",
            operationCanonical: true,
        }
    );

    s.eq(
        "The §26.23 nequi surface has distinct canonical causative and applicative governors over the same typed lō prerequisite",
        (() => {
            const source = buildLesson2425Source(ctx, "nequi", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const causativeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "causative",
            });
            const applicativeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "applicative",
            });
            const causativeOption = causativeInventory.options.find(candidate => candidate.targetStem === "nequi-l-tiā") || null;
            const applicativeOption = applicativeInventory.options.find(candidate => candidate.targetStem === "nequi-l-tiā") || null;
            const causativeOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                optionId: causativeOption?.optionId || "missing-nequi-lo-causative",
                targetSubject: "1sg",
            });
            const applicativeOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "applicative",
                optionId: applicativeOption?.optionId || "missing-nequi-lo-applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "1sg",
            });
            const causativeMachinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
                source,
                causativeOperation,
                {
                    mood: "indicative",
                    tense: "present",
                    targetSubject: causativeOperation.targetSubject,
                }
            );
            const applicativeMachinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
                source,
                applicativeOperation,
                {
                    mood: "indicative",
                    tense: "present",
                    targetSubject: applicativeOperation.targetSubject,
                }
            );
            const wrongValenceSource = buildLesson2425Source(ctx, "nequi", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const wrongClassSource = buildLesson2425Source(ctx, "nequi", {
                verbClass: "A",
                sourceValence: "specific-projective",
            });
            const hasExactNequiLoRoute = (candidateSource, derivationType) => {
                const candidateInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
                    candidateSource,
                    { derivationType }
                );
                return candidateInventory.options.some(candidate => (
                    candidate.targetStem === "nequi-l-tiā"
                    && candidate.typeTwoInternalBridgeFrame?.nonactiveStem === "nequi-lō"
                ));
            };
            const summarizeOption = option => ({
                target: option?.targetStem || "",
                formulaTarget: option?.formulaTargetStem || "",
                bridge: option?.typeTwoInternalBridgeFrame?.nonactiveStem || "",
                bridgeSignaturePresent: Boolean(
                    option?.typeTwoInternalBridgeFrame?.canonicalSignature
                ),
                bridgeAuthority: option?.citationBridgeAuthority || "",
                bridgePolicy: option?.typeTwoInternalBridgeFrame?.lesson20PrerequisitePolicy || "",
                bridgeInternalOnly: option?.typeTwoInternalBridgeFrame?.internalPrerequisiteOnly === true,
                bridgeUserSelectable: option?.typeTwoInternalBridgeFrame?.userSelectable === true,
                lesson20OperationAuthority: option?.typeTwoInternalBridgeFrame?.lesson20OperationAuthority === true,
                lesson20RecordPresent: Boolean(option?.lesson20NonactiveStemRecord),
                route: option?.derivationRoute || "",
                section: option?.andrewsSection || "",
                exact: option?.exactWitness === true,
            });
            const summarizeOperation = (operation, machinery) => ({
                status: operation.authorizationStatus,
                canonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                type: operation.derivationType,
                target: operation.targetStem,
                formulaTarget: operation.formulaTargetStem,
                addedGovernor: operation.participantTransformFrame?.addedObjectRequest?.governor || "",
                sourceSubjectPreserved: operation.participantTransformFrame?.sourceSubjectPreservedByApplicative === true,
                sourceSubjectBecomesObject: operation.participantTransformFrame?.sourceSubjectBecomesCausativeObject === true,
                machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(machinery),
                formula: getFormulaRealization(machinery),
            });
            return {
                inventoriesCanonical: [
                    causativeInventory.authorizationStatus,
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(causativeInventory),
                    applicativeInventory.authorizationStatus,
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(applicativeInventory),
                ],
                causativeOption: summarizeOption(causativeOption),
                applicativeOption: summarizeOption(applicativeOption),
                samePrerequisiteIdentity: Boolean(
                    causativeOption?.typeTwoInternalBridgeFrame
                    && causativeOption.typeTwoInternalBridgeFrame
                        === applicativeOption?.typeTwoInternalBridgeFrame
                ),
                samePrerequisiteSignature: Boolean(
                    causativeOption?.typeTwoInternalBridgeFrame?.canonicalSignature
                    && causativeOption.typeTwoInternalBridgeFrame.canonicalSignature
                        === applicativeOption?.typeTwoInternalBridgeFrame?.canonicalSignature
                ),
                distinctOptionIds: Boolean(
                    causativeOption?.optionId
                    && applicativeOption?.optionId
                    && causativeOption.optionId !== applicativeOption.optionId
                ),
                causativeOperation: summarizeOperation(causativeOperation, causativeMachinery),
                applicativeOperation: summarizeOperation(applicativeOperation, applicativeMachinery),
                exactRestrictionNegatives: {
                    wrongValenceCausative: hasExactNequiLoRoute(wrongValenceSource, "causative"),
                    wrongValenceApplicative: hasExactNequiLoRoute(wrongValenceSource, "applicative"),
                    wrongClassCausative: hasExactNequiLoRoute(wrongClassSource, "causative"),
                    wrongClassApplicative: hasExactNequiLoRoute(wrongClassSource, "applicative"),
                },
            };
        })(),
        {
            inventoriesCanonical: ["authorized", true, "authorized", true],
            causativeOption: {
                target: "nequi-l-tiā",
                formulaTarget: "nequi-l-tiā",
                bridge: "nequi-lō",
                bridgeSignaturePresent: true,
                bridgeAuthority: "owner-issued-derivation-internal-nonactive-prerequisite",
                bridgePolicy: "internal-only",
                bridgeInternalOnly: true,
                bridgeUserSelectable: false,
                lesson20OperationAuthority: false,
                lesson20RecordPresent: false,
                route: "type-two-tia-from-exact-nequi-lo-license",
                section: "26.23",
                exact: true,
            },
            applicativeOption: {
                target: "nequi-l-tiā",
                formulaTarget: "nequi-l-tiā",
                bridge: "nequi-lō",
                bridgeSignaturePresent: true,
                bridgeAuthority: "owner-issued-derivation-internal-nonactive-prerequisite",
                bridgePolicy: "internal-only",
                bridgeInternalOnly: true,
                bridgeUserSelectable: false,
                lesson20OperationAuthority: false,
                lesson20RecordPresent: false,
                route: "type-three-applicative-from-exact-nequi-lo-prerequisite",
                section: "26.23",
                exact: true,
            },
            samePrerequisiteIdentity: true,
            samePrerequisiteSignature: true,
            distinctOptionIds: true,
            causativeOperation: {
                status: "authorized",
                canonical: true,
                type: "causative",
                target: "nequi-l-tiā",
                formulaTarget: "nequi-l-tiā",
                addedGovernor: "causative",
                sourceSubjectPreserved: false,
                sourceSubjectBecomesObject: true,
                machineryCanonical: true,
                formula: "#ni-0+c-0+⎕-⎕(nequi-l-tia)0+0-0#",
            },
            applicativeOperation: {
                status: "authorized",
                canonical: true,
                type: "applicative",
                target: "nequi-l-tiā",
                formulaTarget: "nequi-l-tiā",
                addedGovernor: "applicative",
                sourceSubjectPreserved: true,
                sourceSubjectBecomesObject: false,
                machineryCanonical: true,
                formula: "#0-0+n-ēch+⎕-⎕(nequi-l-tia)0+0-0#",
            },
            exactRestrictionNegatives: {
                wrongValenceCausative: false,
                wrongValenceApplicative: false,
                wrongClassCausative: false,
                wrongClassApplicative: false,
            },
        }
    );

    s.eq(
        "The §26.23 internal prerequisite and target remain owner-issued despite copied frames, Lesson 20 payloads, and stored target poison",
        (() => {
            const source = buildLesson2425Source(ctx, "nequi", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "applicative",
            });
            const option = inventory.options.find(candidate => candidate.targetStem === "nequi-l-tiā") || null;
            const bridge = option?.typeTwoInternalBridgeFrame || null;
            const storedTargetAttempt = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "applicative",
                optionId: option?.optionId || "missing-nequi-lo-applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "1sg",
                targetStem: "FORGED-STORED-TARGET",
                targetClass: "A",
                formula: "#FORGED-FORMULA#",
                surface: "FORGED-SURFACE",
                lesson20OptionId: "FORGED-LESSON20-OPTION",
                lesson20NonactiveStemRecord: {
                    nonactiveStem: "FORGED-LESSON20-STEM",
                },
            });
            const copiedBridgeOperation = {
                ...storedTargetAttempt,
                selectedOption: {
                    ...storedTargetAttempt.selectedOption,
                    typeTwoInternalBridgeFrame: { ...bridge },
                },
            };
            const structuredBridgeOperation = {
                ...storedTargetAttempt,
                selectedOption: {
                    ...storedTargetAttempt.selectedOption,
                    typeTwoInternalBridgeFrame: structuredClone(bridge),
                },
            };
            const jsonBridgeOperation = {
                ...storedTargetAttempt,
                selectedOption: {
                    ...storedTargetAttempt.selectedOption,
                    typeTwoInternalBridgeFrame: JSON.parse(JSON.stringify(bridge)),
                },
            };
            return {
                inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                bridge: {
                    stem: bridge?.nonactiveStem || "",
                    internalOnly: bridge?.internalPrerequisiteOnly === true,
                    userSelectable: bridge?.userSelectable === true,
                    lesson20OperationAuthority: bridge?.lesson20OperationAuthority === true,
                    callerAuthorityAccepted: bridge?.callerSuppliedAuthorityAccepted === true,
                    frozen: Object.isFrozen(bridge),
                },
                lesson20RecordPresent: Boolean(option?.lesson20NonactiveStemRecord),
                storedTargetAttempt: {
                    status: storedTargetAttempt.authorizationStatus,
                    canonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(storedTargetAttempt),
                    target: storedTargetAttempt.targetStem,
                    poisonPresent: JSON.stringify(storedTargetAttempt).includes("FORGED"),
                    issuedBridgePreserved:
                        storedTargetAttempt.selectedOption?.typeTwoInternalBridgeFrame === bridge,
                },
                copiedBridgeOperationsCanonical: [
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(copiedBridgeOperation),
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(structuredBridgeOperation),
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(jsonBridgeOperation),
                ],
            };
        })(),
        {
            inventoryCanonical: true,
            bridge: {
                stem: "nequi-lō",
                internalOnly: true,
                userSelectable: false,
                lesson20OperationAuthority: false,
                callerAuthorityAccepted: false,
                frozen: true,
            },
            lesson20RecordPresent: false,
            storedTargetAttempt: {
                status: "authorized",
                canonical: true,
                target: "nequi-l-tiā",
                poisonPresent: false,
                issuedBridgePreserved: true,
            },
            copiedBridgeOperationsCanonical: [false, false, false],
        }
    );

    s.eq(
        "A later patientive witness cannot back-authorize Lesson 20 or an unattested Lesson 25 causative",
        (() => {
            const lesson20Inventory = ctx.getClassicalNahuatlNonactiveStemOptions("itt-a", {
                verbClass: "A",
                sourceValence: "specific-projective",
            });
            const patientiveOption = lesson20Inventory.options.find(option => option.nonactiveStem === "it-hu-a-lō") || null;
            const patientiveRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord("itt-a", {
                verbClass: "A",
                sourceValence: "specific-projective",
                optionId: patientiveOption?.optionId || "missing-patientive-option",
            });
            const source = buildLesson2425Source(ctx, "itt-a", {
                verbClass: "A",
                sourceValence: "specific-projective",
            });
            const causatives = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "causative",
            });
            const forged = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                optionId: "causative:type-two:lō:it-hu-a-lō",
                targetSubject: "1sg",
            });
            return {
                lesson20Targets: lesson20Inventory.options.map(option => option.nonactiveStem),
                patientiveRecordStatus: patientiveRecord.authorizationStatus,
                patientiveRecordCanonical: ctx.isClassicalNahuatlNonactiveStemRecord(patientiveRecord, "itt-a"),
                patientiveAuthority: patientiveRecord.selectedFormationAuthority,
                causativeTargets: causatives.options.map(option => option.targetStem),
                unattestedTargetExcluded: !causatives.options.some(option => option.targetStem === "it-hu-a-l-tiā"),
                forgedStatus: forged.authorizationStatus,
                forgedReason: forged.blockReason,
            };
        })(),
        {
            lesson20Targets: ["itt-ō", "itt-a-lō"],
            patientiveRecordStatus: "blocked",
            patientiveRecordCanonical: false,
            patientiveAuthority: "",
            causativeTargets: ["itt-a-l-tiā", "itt-ī-tiā"],
            unattestedTargetExcluded: true,
            forgedStatus: "blocked",
            forgedReason: "classical-vnc-derivation-selected-option-was-not-generated",
        }
    );

    s.eq(
        "An unlisted final-i source receives both type-one alternatives and every typed Lesson 20 type-two route",
        (() => {
            const buildIntransitiveSource = (stem, verbClass) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass,
                perfectiveClass: verbClass,
                valence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
            });
            const tomiSource = buildIntransitiveSource("tomi", "B");
            const miquiSource = buildIntransitiveSource("miqui", "B");
            const temoSource = buildIntransitiveSource("temō", "A");
            const chihuaSource = ctx.buildClassicalNahuatlVerbstemClassFrame("chihua", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const chihuaCoreferentialSource = ctx.buildClassicalNahuatlVerbstemClassFrame("chihua", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "2sg",
            });
            const chihuaWrongValenceSource = ctx.buildClassicalNahuatlVerbstemClassFrame("chihua", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "mainline-reflexive",
                transitivity: "transitive",
                objectKind: "mainline-reflexive",
            });
            const chihuaTwoObjectSource = ctx.buildClassicalNahuatlMultipleObjectVncFrame(chihuaSource, {
                objectRequests: [
                    { objectId: "source-object-1", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "source-object-2", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
                ],
            });
            const tomiInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(tomiSource, { derivationType: "causative" });
            const miquiInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(miquiSource, { derivationType: "causative" });
            const temoInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(temoSource, { derivationType: "causative" });
            const chihuaInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(chihuaSource, { derivationType: "causative" });
            const chihuaCoreferentialInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(chihuaCoreferentialSource, { derivationType: "causative" });
            const chihuaWrongValenceInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(chihuaWrongValenceSource, { derivationType: "causative" });
            const chihuaTwoObjectInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(chihuaTwoObjectSource, { derivationType: "causative" });
            const forgedTomiAddition = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(tomiSource, {
                derivationType: "causative",
                optionId: "causative:type-one:addition:tomi:FORGED",
                targetSubject: "2sg",
            });
            const unselectedMiqui = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(miquiSource, {
                derivationType: "causative",
                optionId: "",
                targetSubject: "2sg",
            });
            const selectedMiquiOperations = miquiInventory.options.map((option) => ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
                miquiSource,
                {
                    derivationType: "causative",
                    optionId: option.optionId,
                    targetSubject: "2sg",
                }
            ));
            const chihuaOption = chihuaInventory.options[0] || null;
            const chihuaCoreferentialOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(chihuaCoreferentialSource, {
                derivationType: "causative",
                optionId: chihuaCoreferentialInventory.automaticOptionId,
                targetSubject: "2sg",
            });
            const chihuaThirdCategoryOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(chihuaSource, {
                derivationType: "causative",
                optionId: chihuaInventory.automaticOptionId,
                targetSubject: "3sg",
            });
            return {
                sourceStatuses: [tomiSource.authorizationStatus, miquiSource.authorizationStatus, temoSource.authorizationStatus, chihuaSource.authorizationStatus],
                tomi: {
                    status: tomiInventory.authorizationStatus,
                    targets: tomiInventory.options.map(option => option.targetStem),
                    routes: tomiInventory.options.map(option => option.derivationRoute),
                    selectorRequired: tomiInventory.selectorRequired,
                    canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(tomiInventory),
                    forgedAdditionBlocked: forgedTomiAddition.authorizationStatus === "blocked"
                        && !ctx.isClassicalNahuatlVncDerivationOperationFrame(forgedTomiAddition),
                },
                miqui: {
                    status: miquiInventory.authorizationStatus,
                    canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(miquiInventory),
                    selectorRequired: miquiInventory.selectorRequired,
                    automaticOptionId: miquiInventory.automaticOptionId,
                    options: miquiInventory.options.map((option) => ({
                        target: option.targetStem,
                        targetClass: option.targetClass,
                        route: option.derivationRoute,
                        lesson20Stem: option.lesson20NonactiveStemRecord?.nonactiveStem || "",
                        lesson20Family: option.lesson20NonactiveStemRecord?.suffixFamily || "",
                    })),
                    unselected: [unselectedMiqui.authorizationStatus, unselectedMiqui.blockReason],
                    selectedOperationsCanonical: selectedMiquiOperations.every((operation) => (
                        operation.authorizationStatus === "authorized"
                        && ctx.isClassicalNahuatlVncDerivationOperationFrame(operation)
                    )),
                },
                temo: {
                    status: temoInventory.authorizationStatus,
                    target: temoInventory.options[0]?.targetStem || "",
                    route: temoInventory.options[0]?.derivationRoute || "",
                    automatic: Boolean(temoInventory.automaticOptionId),
                },
                chihua: chihuaOption ? {
                    status: chihuaInventory.authorizationStatus,
                    target: chihuaOption.targetStem,
                    route: chihuaOption.derivationRoute,
                    license: chihuaOption.derivationLicenseId,
                    lesson20OptionId: chihuaOption.lesson20OptionId,
                    lesson20RuleId: chihuaOption.lesson20RuleId,
                    lesson20Stem: chihuaOption.lesson20NonactiveStemRecord?.nonactiveStem || "",
                    canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(chihuaInventory),
                } : null,
                chihuaMismatches: {
                    retainedThirdCategoryDistinct: [
                        chihuaThirdCategoryOperation.authorizationStatus,
                        chihuaThirdCategoryOperation.blockReason,
                        ctx.isClassicalNahuatlVncDerivationOperationFrame(chihuaThirdCategoryOperation),
                    ],
                    retainedSourceCoreference: [
                        chihuaCoreferentialInventory.authorizationStatus,
                        chihuaCoreferentialOperation.authorizationStatus,
                        chihuaCoreferentialOperation.blockReason,
                        ctx.isClassicalNahuatlVncDerivationOperationFrame(chihuaCoreferentialOperation),
                    ],
                    wrongValence: [
                        chihuaWrongValenceSource.authorizationStatus,
                        chihuaWrongValenceInventory.authorizationStatus,
                        chihuaWrongValenceInventory.blockReason,
                        chihuaWrongValenceInventory.options.length,
                    ],
                    twoObject: [
                        chihuaTwoObjectSource.authorizationStatus,
                        chihuaTwoObjectInventory.authorizationStatus,
                        chihuaTwoObjectInventory.blockReason,
                        chihuaTwoObjectInventory.options.length,
                    ],
                },
            };
        })(),
        {
            sourceStatuses: ["authorized", "authorized", "authorized", "authorized"],
            tomi: {
                status: "authorized",
                    targets: ["tom-a", "tom-tiā"],
                    routes: ["type-one-replacement-exact", "type-two-tia-from-tom-o-hua-internal-base"],
                selectorRequired: true,
                canonical: true,
                forgedAdditionBlocked: true,
            },
            miqui: {
                status: "authorized",
                canonical: true,
                selectorRequired: true,
                automaticOptionId: "",
                options: [
                    {
                        target: "mic-a",
                        targetClass: "B",
                        route: "type-one-final-i-replacement",
                        lesson20Stem: "",
                        lesson20Family: "",
                    },
                    {
                        target: "miqui-ā",
                        targetClass: "C",
                        route: "type-one-final-i-addition",
                        lesson20Stem: "",
                        lesson20Family: "",
                    },
                    {
                        target: "mic-tiā",
                        targetClass: "C",
                        route: "type-two-tia-from-o-hua-nonactive",
                        lesson20Stem: "mic-o-hua",
                        lesson20Family: "o-hua",
                    },
                ],
                unselected: ["blocked", "classical-vnc-derivation-option-selection-required"],
                selectedOperationsCanonical: true,
            },
            temo: {
                status: "authorized",
                target: "temō-huiā",
                route: "type-two-final-o-direct-huia",
                automatic: true,
            },
            chihua: {
                status: "authorized",
                    target: "chīhua-l-tiā",
                    route: "type-two-tia-from-exact-long-chihua-lo-license",
                    license: "cn-l25-254-long-chihua-lo-to-l-tia",
                lesson20OptionId: "lō:chihua-lō",
                lesson20RuleId: "cn-l20-2-chihua",
                lesson20Stem: "chihua-lō",
                canonical: true,
            },
            chihuaMismatches: {
                retainedThirdCategoryDistinct: ["authorized", "", true],
                retainedSourceCoreference: [
                    "authorized",
                    "authorized",
                    "",
                    true,
                ],
                wrongValence: ["authorized", "authorized", "", 1],
                twoObject: ["authorized", "authorized", "", 1],
            },
        }
    );

    s.eq(
        "Exact chihua and xeloa routes reject unambiguous source self-reference without treating third-person category equality as identity",
        (() => {
            const buildSpecificSource = (stem, verbClass, subject, objectPerson) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
                subject,
                mood: "indicative",
                tense: "present",
                verbClass,
                perfectiveClass: verbClass,
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson,
            });
            const summarize = (stem, verbClass, subject, derivationType) => {
                const source = buildSpecificSource(stem, verbClass, subject, subject);
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType });
                return {
                    sourceStatus: source.authorizationStatus,
                    inventoryStatus: inventory.authorizationStatus,
                    reason: inventory.blockReason,
                    optionTargets: inventory.options.map(option => option.targetStem),
                };
            };
            return {
                chihuaFirst: summarize("chihua", "A", "1sg", "causative"),
                xeloaSecond: summarize("xeloa", "C", "2sg", "applicative"),
                xeloaFirstPlural: summarize("xeloa", "C", "1pl", "applicative"),
                xeloaSecondPlural: summarize("xeloa", "C", "2pl", "applicative"),
                chihuaThird: summarize("chihua", "A", "3sg", "causative"),
                xeloaThirdPlural: summarize("xeloa", "C", "3pl", "applicative"),
            };
        })(),
        {
            chihuaFirst: {
                sourceStatus: "authorized",
                inventoryStatus: "blocked",
                reason: "classical-vnc-causative-source-specific-self-reference-must-be-reflexive",
                optionTargets: [],
            },
            xeloaSecond: {
                sourceStatus: "authorized",
                inventoryStatus: "blocked",
                reason: "classical-vnc-applicative-source-specific-self-reference-must-be-reflexive",
                optionTargets: [],
            },
            xeloaFirstPlural: {
                sourceStatus: "authorized",
                inventoryStatus: "blocked",
                reason: "classical-vnc-applicative-source-specific-self-reference-must-be-reflexive",
                optionTargets: [],
            },
            xeloaSecondPlural: {
                sourceStatus: "authorized",
                inventoryStatus: "blocked",
                reason: "classical-vnc-applicative-source-specific-self-reference-must-be-reflexive",
                optionTargets: [],
            },
            chihuaThird: {
                sourceStatus: "authorized",
                inventoryStatus: "authorized",
                reason: "",
                optionTargets: ["chīhua-l-tiā"],
            },
            xeloaThirdPlural: {
                sourceStatus: "authorized",
                inventoryStatus: "authorized",
                reason: "",
                optionTargets: ["xel-huiā"],
            },
        }
    );

    s.eq(
        "Causative participant import auto-reflexivizes only unambiguous singular coreference",
        (() => {
            const buildTomiSource = (subject) => ctx.buildClassicalNahuatlVerbstemClassFrame("tomi", {
                subject,
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                perfectiveClass: "B",
                valence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
            });
            const summarize = (subject) => {
                const source = buildTomiSource(subject);
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "causative" });
                const witnessedReplacement = inventory.options.find((option) => option.targetStem === "tom-a");
                const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                    derivationType: "causative",
                    optionId: witnessedReplacement?.optionId || "missing-tomi-replacement-option",
                    targetSubject: subject,
                });
                return {
                    inventoryStatus: inventory.authorizationStatus,
                    operationStatus: operation.authorizationStatus,
                    reason: operation.blockReason,
                    operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                    addedObjectKind: operation.participantTransformFrame?.addedObjectRequest?.objectKind || "",
                };
            };
            return {
                firstSingular: summarize("1sg"),
                secondSingular: summarize("2sg"),
                thirdSingular: summarize("3sg"),
                firstPlural: summarize("1pl"),
                secondPlural: summarize("2pl"),
                thirdPlural: summarize("3pl"),
            };
        })(),
        {
            firstSingular: {
                inventoryStatus: "authorized",
                operationStatus: "authorized",
                reason: "",
                operationTyped: true,
                addedObjectKind: "reflexive",
            },
            secondSingular: {
                inventoryStatus: "authorized",
                operationStatus: "authorized",
                reason: "",
                operationTyped: true,
                addedObjectKind: "reflexive",
            },
            thirdSingular: {
                inventoryStatus: "authorized",
                operationStatus: "blocked",
                reason: "classical-vnc-causative-causee-valence-selection-required",
                operationTyped: false,
                addedObjectKind: "",
            },
            firstPlural: {
                inventoryStatus: "authorized",
                operationStatus: "blocked",
                reason: "classical-vnc-causative-causee-valence-selection-required",
                operationTyped: false,
                addedObjectKind: "",
            },
            secondPlural: {
                inventoryStatus: "authorized",
                operationStatus: "blocked",
                reason: "classical-vnc-causative-causee-valence-selection-required",
                operationTyped: false,
                addedObjectKind: "",
            },
            thirdPlural: {
                inventoryStatus: "authorized",
                operationStatus: "blocked",
                reason: "classical-vnc-causative-causee-valence-selection-required",
                operationTyped: false,
                addedObjectKind: "",
            },
        }
    );

    s.eq(
        "Lesson 25 type-two causative consumes a typed Lesson 20 base and reuses Lesson 23 ordering",
        (() => {
            const witness = summarizeCanvasBuild(ctx, "l25-8571-chihua-type-two-causative");
            const nonactiveRecord = findNestedFrameByKind(
                witness.built.operationFrame,
                "classical-nahuatl-nonactive-vnc-nonactive-stem-record"
            ) || findNestedFrameByKind(
                witness.built.selectedOption,
                "classical-nahuatl-nonactive-vnc-nonactive-stem-record"
            );
            const cluster = witness.built.machineryFrame?.multipleObjectClusterFrame;
            return {
                canvasLines: [witness.example.lineStart, witness.example.lineEnd],
                summary: witness.summary,
                nonactive: nonactiveRecord ? {
                    kind: nonactiveRecord.kind,
                    status: nonactiveRecord.authorizationStatus,
                    stem: nonactiveRecord.nonactiveStem,
                } : null,
                clusterKind: cluster?.kind || "",
                positions: (cluster?.positions || []).map((position) => ({
                    id: position.objectId,
                    governor: position.governor,
                    level: position.derivationalLevel,
                    prominence: position.prominence,
                    carrier: position.carrier,
                    sounded: position.sounded,
                })),
            };
        })(),
        {
            canvasLines: [8309, 8317],
            summary: {
                inventoryStatus: "authorized",
                optionIdPresent: true,
                subtype: "type-two",
                targetStem: "chīhua-l-tiā",
                operationStatus: "authorized",
                operationTyped: true,
                machineryStatus: "authorized",
                formula: "#ti-0+n-ēch+⎕-0(chīhua-l-tia)0+0-0#",
            },
            nonactive: {
                kind: "classical-nahuatl-nonactive-vnc-nonactive-stem-record",
                status: "authorized",
                stem: "chihua-lō",
            },
            clusterKind: "classical-nahuatl-multiple-object-vnc-object-cluster-frame",
            positions: [
                { id: "causative-object", governor: "causative", level: 2, prominence: "mainline", carrier: "n-ēch", sounded: true },
                { id: "source-object-1", governor: "directive", level: 1, prominence: "shuntline", carrier: "0-0", sounded: false },
            ],
        }
    );

    s.eq(
        "Lesson 26 derives xeloa from root shape without a lexical mapping or spurious surface alternatives",
        (() => {
            const buildSource = (stem, {
                verbClass = "C",
                valence = "specific-projective",
                objectKind = "specific-projective",
                objectPerson = "3sg",
            } = {}) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass,
                perfectiveClass: verbClass,
                valence,
                transitivity: valence === "intransitive" ? "intransitive" : "transitive",
                objectKind,
                objectPerson,
            });
            const licensedSource = buildSource("xeloa");
            const wrongClassSource = buildSource("xeloa", { verbClass: "A" });
            const wrongValenceSource = buildSource("xeloa", {
                valence: "mainline-reflexive",
                objectKind: "mainline-reflexive",
                objectPerson: "",
            });
            const zeroObjectSource = buildSource("xeloa", {
                valence: "intransitive",
                objectKind: "none",
                objectPerson: "",
            });
            const twoObjectSource = ctx.buildClassicalNahuatlMultipleObjectVncFrame(licensedSource, {
                objectRequests: [
                    { objectId: "source-object-1", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "source-object-2", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
                ],
            });
            const productiveSources = [
                buildSource("mati", { verbClass: "B" }),
                buildSource("namaca", { verbClass: "A" }),
                buildSource("mēmē", { verbClass: "D" }),
                buildSource("temō", {
                    verbClass: "A",
                    valence: "intransitive",
                    objectKind: "none",
                    objectPerson: "",
                }),
            ];
            const licensedInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(licensedSource, {
                derivationType: "applicative",
            });
            const licensedOption = licensedInventory.options[0] || null;
            const summarizeSource = (source) => {
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "applicative",
                });
                const selectedOption = inventory.options[0] || null;
                const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                    derivationType: "applicative",
                    optionId: selectedOption?.optionId || "missing-rule-derived-option",
                    targetSubject: "1sg",
                    applicativeObjectKind: "specific-projective",
                    applicativeObjectPerson: "2sg",
                });
                return {
                    sourceStatus: source.authorizationStatus,
                    sourceKind: source.kind,
                    sourceClass: inventory.sourceClass,
                    sourceValence: inventory.sourceValence,
                    inventoryStatus: inventory.authorizationStatus,
                    blockReason: inventory.blockReason,
                    optionCount: inventory.optionCount,
                    ...(inventory.authorizationStatus === "authorized" ? {
                        selectorRequired: inventory.selectorRequired,
                        targets: inventory.options.map((option) => option.targetStem),
                        routes: inventory.options.map((option) => option.derivationRoute),
                    } : {}),
                    operationStatus: operation.authorizationStatus,
                    operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                };
            };
            return {
                licensed: licensedOption ? {
                    inventoryStatus: licensedInventory.authorizationStatus,
                    inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(licensedInventory),
                    targetStem: licensedOption.targetStem,
                    route: licensedOption.derivationRoute,
                    sourceClass: licensedOption.licensedSourceClass,
                    sourceValence: licensedOption.licensedSourceValence,
                    sourceObjectRange: [
                        licensedOption.licensedMinimumSourceObjectCount,
                        licensedOption.licensedMaximumSourceObjectCount,
                    ],
                } : null,
                mismatches: {
                    wrongClass: summarizeSource(wrongClassSource),
                    wrongValence: summarizeSource(wrongValenceSource),
                    zeroObject: summarizeSource(zeroObjectSource),
                    twoObject: summarizeSource(twoObjectSource),
                },
                productive: productiveSources.map(summarizeSource),
            };
        })(),
        {
            licensed: {
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                targetStem: "xel-huiā",
                route: "type-two-huia-from-root-final-l-o-a",
                sourceClass: "C",
                sourceValence: "specific-projective",
                sourceObjectRange: [0, 2],
            },
            mismatches: {
                wrongClass: {
                    sourceStatus: "authorized",
                    sourceKind: "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
                    sourceClass: "A",
                    sourceValence: "specific-projective",
                    inventoryStatus: "authorized",
                    blockReason: "",
                    optionCount: 1,
                    selectorRequired: false,
                    targets: ["xel-o-iā"],
                    routes: ["type-one-final-vowel-replacement-optional"],
                    operationStatus: "authorized",
                    operationTyped: true,
                },
                wrongValence: {
                    sourceStatus: "authorized",
                    sourceKind: "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
                    sourceClass: "C",
                    sourceValence: "mainline-reflexive",
                    inventoryStatus: "authorized",
                    blockReason: "",
                    optionCount: 1,
                    selectorRequired: false,
                    targets: ["xel-huiā"],
                    routes: ["type-two-huia-from-root-final-l-o-a"],
                    operationStatus: "authorized",
                    operationTyped: true,
                },
                zeroObject: {
                    sourceStatus: "authorized",
                    sourceKind: "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
                    sourceClass: "C",
                    sourceValence: "intransitive",
                    inventoryStatus: "authorized",
                    blockReason: "",
                    optionCount: 1,
                    selectorRequired: false,
                    targets: ["xel-huiā"],
                    routes: ["type-two-huia-from-root-final-l-o-a"],
                    operationStatus: "authorized",
                    operationTyped: true,
                },
                twoObject: {
                    sourceStatus: "authorized",
                    sourceKind: "classical-nahuatl-multiple-object-vnc-multiple-object-vnc-machinery-frame",
                    sourceClass: "C",
                    sourceValence: "multiple-object",
                    inventoryStatus: "authorized",
                    blockReason: "",
                    optionCount: 1,
                    selectorRequired: false,
                    targets: ["xel-huiā"],
                    routes: ["type-two-huia-from-root-final-l-o-a"],
                    operationStatus: "authorized",
                    operationTyped: true,
                },
            },
            productive: [
                {
                    sourceStatus: "authorized",
                    sourceKind: "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
                    sourceClass: "B",
                    sourceValence: "specific-projective",
                    inventoryStatus: "authorized",
                    blockReason: "",
                    optionCount: 3,
                    selectorRequired: true,
                    targets: ["machi-liā", "mat-iā", "mati-liā"],
                    routes: [
                        "type-two-final-ti-to-chi-lia-exact",
                        "type-one-final-vowel-replacement-optional",
                        "type-two-final-i-append-lia",
                    ],
                    operationStatus: "authorized",
                    operationTyped: true,
                },
                {
                    sourceStatus: "authorized",
                    sourceKind: "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
                    sourceClass: "A",
                    sourceValence: "specific-projective",
                    inventoryStatus: "authorized",
                    blockReason: "",
                    optionCount: 3,
                    selectorRequired: true,
                    targets: ["namaqui-l-tiā", "namaqu-iā", "namaqui-liā"],
                    routes: [
                        "type-three-applicative-from-lo-nonactive-exact",
                        "type-one-final-vowel-replacement-optional",
                        "type-two-final-ca-to-qui-lia",
                    ],
                    operationStatus: "authorized",
                    operationTyped: true,
                },
                {
                    sourceStatus: "authorized",
                    sourceKind: "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
                    sourceClass: "D",
                    sourceValence: "specific-projective",
                    inventoryStatus: "authorized",
                    blockReason: "",
                    optionCount: 1,
                    selectorRequired: false,
                    targets: ["mēmē-liā"],
                    routes: ["type-two-class-d-append-lia"],
                    operationStatus: "authorized",
                    operationTyped: true,
                },
                {
                    sourceStatus: "authorized",
                    sourceKind: "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
                    sourceClass: "A",
                    sourceValence: "intransitive",
                    inventoryStatus: "authorized",
                    blockReason: "",
                    optionCount: 1,
                    selectorRequired: false,
                    targets: ["temō-huiā"],
                    routes: ["type-two-final-o-direct-huia"],
                    operationStatus: "authorized",
                    operationTyped: true,
                },
            ],
        }
    );

    s.eq(
        "Typed internal morphology exposes productive causative and applicative rules beyond the Canvas witnesses",
        (() => {
            const buildSource = (stem, {
                verbClass,
                sourceValence = "intransitive",
            }) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass,
                perfectiveClass: verbClass,
                valence: sourceValence,
                transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
                objectKind: sourceValence === "intransitive" ? "none" : "specific-projective",
                objectPerson: sourceValence === "intransitive" ? "" : "2sg",
            });
            const summarize = (stem, verbClass, derivationType, sourceValence = "intransitive") => {
                const source = buildSource(stem, { verbClass, sourceValence });
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType });
                return {
                    sourceStatus: source.authorizationStatus,
                    status: inventory.authorizationStatus,
                    reason: inventory.blockReason,
                    canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                    targets: inventory.options.map((option) => option.targetStem),
                    routes: inventory.options.map((option) => option.derivationRoute),
                };
            };
            const summarizeExactApplicative = (stem) => {
                const source = buildSource(stem, {
                    verbClass: "A",
                    sourceValence: "specific-projective",
                });
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "applicative",
                });
                return {
                    status: inventory.authorizationStatus,
                    canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                    optionCount: inventory.options.length,
                    selectorRequired: inventory.selectorRequired,
                    targets: inventory.options.map((option) => option.targetStem),
                    routes: inventory.options.map((option) => option.derivationRoute),
                    exactWitnesses: inventory.options.map((option) => option.exactWitness === true),
                };
            };
            const classARootYa = summarize("coco-ya", "A", "causative");
            const classBRootYa = summarize("yōco-ya", "B", "causative");
            const destockalHua = summarize("chip-ā-hua", "A", "causative");
            const pilNegative = summarize("pil-i-hui", "B", "causative");
            const denominalTiCausative = summarize("tlāca-ti", "B", "causative");
            const denominalTiApplicative = summarize("tlāca-ti", "B", "applicative");
            const segmentedTomi = summarize("to-mi", "B", "causative");
            const segmentedTemo = summarize("te-mō", "A", "causative");
            const segmentedPil = summarize("pi-l-i-hui", "B", "causative");
            const segmentedXeloa = summarize("xe-loa", "C", "applicative", "specific-projective");
            const summarizeExplicitSegmentedXeloa = (stem) => {
                const source = buildSource(stem, {
                    verbClass: "C",
                    sourceValence: "specific-projective",
                });
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "applicative",
                });
                return {
                    status: inventory.authorizationStatus,
                    canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                    optionCount: inventory.options.length,
                    selectorRequired: inventory.selectorRequired,
                    targets: inventory.options.map((option) => option.targetStem),
                    routes: inventory.options.map((option) => option.derivationRoute),
                    exactWitnesses: inventory.options.map((option) => option.exactWitness === true),
                };
            };
            const explicitSegmentedXeloa = summarizeExplicitSegmentedXeloa("xel-o-a");
            const extraBoundedXeloa = summarizeExplicitSegmentedXeloa("xe-l-o-a");
            const segmentedChihua = summarize("chi-hua", "A", "causative", "specific-projective");
            return {
                rootPlusYa: {
                    classA: {
                        status: classARootYa.status,
                        canonical: classARootYa.canonical,
                        targets: classARootYa.targets,
                        routes: classARootYa.routes,
                    },
                    classB: {
                        status: classBRootYa.status,
                        canonical: classBRootYa.canonical,
                        targets: classBRootYa.targets,
                        routes: classBRootYa.routes,
                    },
                },
                destockalHua: {
                    status: destockalHua.status,
                    canonical: destockalHua.canonical,
                    hasTypedReplacement: destockalHua.targets.includes("chip-ā-hu-a")
                        && destockalHua.routes.includes("type-one-destockal-hua-replacement"),
                },
                pilNegative: {
                    status: pilNegative.status,
                    canonical: pilNegative.canonical,
                    typeOneRoutes: pilNegative.routes.filter((route) => route.startsWith("type-one")),
                },
                denominalTi: {
                    causativeStatus: denominalTiCausative.status,
                    causativeCanonical: denominalTiCausative.canonical,
                    liaRoute: denominalTiCausative.routes.includes("type-two-lia-from-typed-denominal-ti"),
                    liaTarget: denominalTiCausative.targets.includes("tlāca-ti-liā"),
                    applicativeStatus: denominalTiApplicative.status,
                    applicativeReason: denominalTiApplicative.reason,
                    applicativeTargets: denominalTiApplicative.targets,
                },
                applicativeFinalShapes: {
                    inaya: summarize("ināya", "B", "applicative", "specific-projective"),
                    oya: summarize("tlaōco-ya", "B", "applicative"),
                    finalSi: summarize("maci", "B", "applicative", "specific-projective"),
                    finalTla: summarize("motla", "A", "applicative", "specific-projective"),
                    explicitOa: summarize("xel-o-ā", "C", "applicative", "specific-projective"),
                },
                boundaryInsensitiveExactOverlays: {
                    tomi: {
                        exactReplacement: segmentedTomi.targets.includes("tom-a"),
                        genericAdditionSuppressed: !segmentedTomi.routes.includes("type-one-final-i-addition"),
                    },
                    temo: segmentedTemo.routes,
                    pilTypeOneRoutes: segmentedPil.routes.filter((route) => route.startsWith("type-one")),
                    xeloa: segmentedXeloa.targets,
                    explicitXeloa: explicitSegmentedXeloa,
                    extraBoundedXeloa,
                    exceptionalFinalTlToT: {
                        patla: summarizeExactApplicative("pa-tla"),
                        tlazohtla: summarizeExactApplicative("tla-zo-h-tla"),
                        genericMotla: summarizeExactApplicative("motla"),
                    },
                    chihua: {
                        targets: segmentedChihua.targets,
                        routes: segmentedChihua.routes,
                    },
                },
            };
        })(),
        {
            rootPlusYa: {
                classA: {
                    status: "authorized",
                    canonical: true,
                    targets: ["coco-ā", "coco-liā", "coco-l-tiā"],
                    routes: ["type-one-root-plus-ya-replacement", "type-two-lia-from-typed-root-plus-ya", "type-two-tia-from-lo-nonactive"],
                },
                classB: {
                    status: "authorized",
                    canonical: true,
                    targets: ["yōco-y-a", "yōco-liā", "yōco-l-tiā"],
                    routes: ["type-one-root-plus-ya-retentive-exception-exact", "type-two-lia-from-typed-root-plus-ya", "type-two-tia-from-lo-nonactive"],
                },
            },
            destockalHua: {
                status: "authorized",
                canonical: true,
                hasTypedReplacement: true,
            },
            pilNegative: {
                status: "authorized",
                canonical: true,
                typeOneRoutes: [],
            },
            denominalTi: {
                causativeStatus: "authorized",
                causativeCanonical: true,
                liaRoute: true,
                liaTarget: true,
                applicativeStatus: "authorized",
                applicativeReason: "",
                applicativeTargets: ["tlāca-t-iā"],
            },
            applicativeFinalShapes: {
                inaya: {
                    sourceStatus: "authorized",
                    status: "authorized",
                    reason: "",
                    canonical: true,
                    targets: ["ināy-iā", "ināyi-liā"],
                    routes: ["type-one-final-vowel-replacement-optional", "type-two-consonant-final-a-to-i-lia"],
                },
                oya: {
                    sourceStatus: "authorized",
                    status: "authorized",
                    reason: "",
                    canonical: true,
                    targets: ["tlaōco-y-iā", "tlaōco-liā"],
                    routes: ["type-one-final-vowel-replacement-optional", "type-two-intransitive-oya-delete-ya-add-lia"],
                },
                finalSi: {
                    sourceStatus: "authorized",
                    status: "authorized",
                    reason: "",
                    canonical: true,
                    targets: ["mac-iā", "maxi-liā"],
                    routes: ["type-one-final-vowel-replacement-optional", "type-two-final-si-to-xi-append-lia"],
                },
                finalTla: {
                    sourceStatus: "authorized",
                    status: "authorized",
                    reason: "",
                    canonical: true,
                    targets: ["mōtl-iā", "mōchi-liā"],
                    routes: ["type-one-final-vowel-replacement-optional", "type-two-final-tla-tza-to-chi-lia"],
                },
                explicitOa: {
                    sourceStatus: "authorized",
                    status: "authorized",
                    reason: "",
                    canonical: true,
                    targets: ["xel-huiā"],
                    routes: ["type-two-huia-from-root-final-l-o-a"],
                },
            },
            boundaryInsensitiveExactOverlays: {
                tomi: {
                    exactReplacement: true,
                    genericAdditionSuppressed: true,
                },
                temo: ["type-two-final-o-direct-huia"],
                pilTypeOneRoutes: [],
                xeloa: ["xel-huiā"],
                explicitXeloa: {
                    status: "authorized",
                    canonical: true,
                    optionCount: 1,
                    selectorRequired: false,
                    targets: ["xel-huiā"],
                    routes: ["type-two-huia-from-root-final-l-o-a"],
                    exactWitnesses: [false],
                },
                extraBoundedXeloa: {
                    status: "authorized",
                    canonical: true,
                    optionCount: 1,
                    selectorRequired: false,
                    targets: ["xel-huiā"],
                    routes: ["type-two-huia-from-root-final-l-o-a"],
                    exactWitnesses: [false],
                },
                exceptionalFinalTlToT: {
                    patla: {
                        status: "authorized",
                        canonical: true,
                        optionCount: 2,
                        selectorRequired: true,
                    targets: ["pa-tl-iā", "pa-ti-liā"],
                        routes: ["type-one-final-vowel-replacement-optional", "type-two-final-tla-to-ti-lia-exact"],
                        exactWitnesses: [false, true],
                    },
                    tlazohtla: {
                        status: "authorized",
                        canonical: true,
                        optionCount: 2,
                        selectorRequired: true,
                    targets: ["tla-zo-h-tl-iā", "tla-zo-h-ti-liā"],
                        routes: ["type-one-final-vowel-replacement-optional", "type-two-final-tla-to-ti-lia-exact"],
                        exactWitnesses: [false, true],
                    },
                    genericMotla: {
                        status: "authorized",
                        canonical: true,
                        optionCount: 2,
                        selectorRequired: true,
                    targets: ["mōtl-iā", "mōchi-liā"],
                        routes: ["type-one-final-vowel-replacement-optional", "type-two-final-tla-tza-to-chi-lia"],
                        exactWitnesses: [false, false],
                    },
                },
                chihua: {
                    targets: ["chīhua-l-tiā"],
                    routes: ["type-two-tia-from-exact-long-chihua-lo-license"],
                },
            },
        }
    );

    s.eq(
        "The public Lessons 24-25 source-analysis boundary returns canonical engine-derived morphology for solid spelling",
        [
            {
                stem: "yocoya",
                verbClass: "A",
                categories: ["root-plus-ya", "root-plus-ya-retentive-exception"],
                segments: [["yōco", "ya"], ["yōco", "ya"]],
                selectionRequired: [false, false],
            },
            {
                stem: "huāqui",
                verbClass: "B",
                categories: ["fused-destockal-final-i", "type-one-consonant-alternation"],
                segments: [["huā", "qui"], ["huā", "qui"]],
                selectionRequired: [false, false],
            },
            {
                stem: "cualāni",
                verbClass: "B",
                categories: ["destockal-ni-candidate", "fused-destockal-ni-exact"],
                segments: [["cual", "ā", "ni"], ["cual", "ā", "ni"]],
                selectionRequired: [false, false],
            },
            {
                stem: "polihui",
                verbClass: "B",
                categories: ["destockal-i-a-o-hui"],
                segments: [["pol", "i", "hui"]],
                selectionRequired: [false],
            },
            {
                stem: "tlācati",
                verbClass: "B",
                categories: ["denominal-ti-candidate"],
                segments: [["tlāca", "ti"]],
                selectionRequired: [false],
            },
        ].map((fixture) => {
            const source = buildLesson2425Source(ctx, fixture.stem, {
                verbClass: fixture.verbClass,
            });
            const frame = ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
            return {
                stem: fixture.stem,
                sourceStatus: source.authorizationStatus,
                analysisStatus: frame.authorizationStatus,
                canonical: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(frame),
                kind: frame.kind,
                lexicalStem: frame.lexicalStem,
                explicitBoundaryObserved: frame.explicitBoundaryObserved,
                boundaryAuthority: frame.boundaryAuthority,
                categories: frame.analyses.map((analysis) => analysis.category),
                segments: frame.analyses.map((analysis) => analysis.segments),
                selectionRequired: frame.analyses.map((analysis) => analysis.sourceAnalysisSelectionRequired),
                userBoundaryRequired: frame.analyses.map((analysis) => analysis.userAuthoredBoundaryRequired),
                callerSuppliedAnalysisAllowed: frame.callerSuppliedAnalysisAllowed,
                expected: {
                    categories: fixture.categories,
                    segments: fixture.segments,
                    selectionRequired: fixture.selectionRequired,
                },
            };
        }),
        [
            {
                stem: "yocoya",
                sourceStatus: "authorized",
                analysisStatus: "authorized",
                canonical: true,
                kind: "classical-nahuatl-vnc-derivation-source-analysis",
                lexicalStem: "yōcoya",
                explicitBoundaryObserved: false,
                boundaryAuthority: "engine-derived-analysis; editorial hyphens are observation only",
                categories: ["root-plus-ya", "root-plus-ya-retentive-exception"],
                segments: [["yōco", "ya"], ["yōco", "ya"]],
                selectionRequired: [false, false],
                userBoundaryRequired: [false, false],
                callerSuppliedAnalysisAllowed: false,
                expected: {
                    categories: ["root-plus-ya", "root-plus-ya-retentive-exception"],
                    segments: [["yōco", "ya"], ["yōco", "ya"]],
                    selectionRequired: [false, false],
                },
            },
            {
                stem: "huāqui",
                sourceStatus: "authorized",
                analysisStatus: "authorized",
                canonical: true,
                kind: "classical-nahuatl-vnc-derivation-source-analysis",
                lexicalStem: "huāqui",
                explicitBoundaryObserved: false,
                boundaryAuthority: "engine-derived-analysis; editorial hyphens are observation only",
                categories: ["fused-destockal-final-i", "type-one-consonant-alternation"],
                segments: [["huā", "qui"], ["huā", "qui"]],
                selectionRequired: [false, false],
                userBoundaryRequired: [false, false],
                callerSuppliedAnalysisAllowed: false,
                expected: {
                    categories: ["fused-destockal-final-i", "type-one-consonant-alternation"],
                    segments: [["huā", "qui"], ["huā", "qui"]],
                    selectionRequired: [false, false],
                },
            },
            {
                stem: "cualāni",
                sourceStatus: "authorized",
                analysisStatus: "authorized",
                canonical: true,
                kind: "classical-nahuatl-vnc-derivation-source-analysis",
                lexicalStem: "cualāni",
                explicitBoundaryObserved: false,
                boundaryAuthority: "engine-derived-analysis; editorial hyphens are observation only",
                categories: ["destockal-ni-candidate", "fused-destockal-ni-exact"],
                segments: [["cual", "ā", "ni"], ["cual", "ā", "ni"]],
                selectionRequired: [false, false],
                userBoundaryRequired: [false, false],
                callerSuppliedAnalysisAllowed: false,
                expected: {
                    categories: ["destockal-ni-candidate", "fused-destockal-ni-exact"],
                    segments: [["cual", "ā", "ni"], ["cual", "ā", "ni"]],
                    selectionRequired: [false, false],
                },
            },
            {
                stem: "polihui",
                sourceStatus: "authorized",
                analysisStatus: "authorized",
                canonical: true,
                kind: "classical-nahuatl-vnc-derivation-source-analysis",
                lexicalStem: "polihui",
                explicitBoundaryObserved: false,
                boundaryAuthority: "engine-derived-analysis; editorial hyphens are observation only",
                categories: ["destockal-i-a-o-hui"],
                segments: [["pol", "i", "hui"]],
                selectionRequired: [false],
                userBoundaryRequired: [false],
                callerSuppliedAnalysisAllowed: false,
                expected: {
                    categories: ["destockal-i-a-o-hui"],
                    segments: [["pol", "i", "hui"]],
                    selectionRequired: [false],
                },
            },
            {
                stem: "tlācati",
                sourceStatus: "authorized",
                analysisStatus: "authorized",
                canonical: true,
                kind: "classical-nahuatl-vnc-derivation-source-analysis",
                lexicalStem: "tlācati",
                explicitBoundaryObserved: false,
                boundaryAuthority: "engine-derived-analysis; editorial hyphens are observation only",
                categories: ["denominal-ti-candidate"],
                segments: [["tlāca", "ti"]],
                selectionRequired: [false],
                userBoundaryRequired: [false],
                callerSuppliedAnalysisAllowed: false,
                expected: {
                    categories: ["denominal-ti-candidate"],
                    segments: [["tlāca", "ti"]],
                    selectionRequired: [false],
                },
            },
        ]
    );

    s.eq(
        "Segmented and unsegmented Lesson 24 sources preserve source-analysis and causative semantics",
        [
            { id: "root-plus-ya", segmented: "yoco-ya", unsegmented: "yocoya", verbClass: "A" },
            { id: "fused-final-i", segmented: "huā-qui", unsegmented: "huāqui", verbClass: "B" },
            { id: "destockal-i-hui", segmented: "pol-i-hui", unsegmented: "polihui", verbClass: "B" },
        ].map((fixture) => {
            const summarize = (stem) => {
                const source = buildLesson2425Source(ctx, stem, { verbClass: fixture.verbClass });
                const analysis = ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "causative",
                });
                return {
                    sourceStatus: source.authorizationStatus,
                    analysisStatus: analysis.authorizationStatus,
                    analysisCanonical: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(analysis),
                    inventoryStatus: inventory.authorizationStatus,
                    inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                    explicitBoundaryObserved: analysis.explicitBoundaryObserved,
                    lexicalStem: analysis.lexicalStem,
                    analysisSemantics: analysis.analyses.map((candidate) => ({
                        category: candidate.category,
                        segments: candidate.segments,
                        root: candidate.root,
                        stockFormative: candidate.stockFormative,
                        stemFormative: candidate.stemFormative,
                    })),
                    routes: inventory.options.map((option) => option.derivationRoute),
                    targets: inventory.options.map((option) => option.targetStem),
                    boundarylessTargets: inventory.options.map((option) => (
                        getBoundarylessClassicalStemIdentity(option.targetStem)
                    )),
                };
            };
            const segmented = summarize(fixture.segmented);
            const unsegmented = summarize(fixture.unsegmented);
            return {
                id: fixture.id,
                allCanonical: [
                    segmented.sourceStatus,
                    segmented.analysisStatus,
                    segmented.analysisCanonical,
                    segmented.inventoryStatus,
                    segmented.inventoryCanonical,
                    unsegmented.sourceStatus,
                    unsegmented.analysisStatus,
                    unsegmented.analysisCanonical,
                    unsegmented.inventoryStatus,
                    unsegmented.inventoryCanonical,
                ],
                boundaryObservation: [
                    segmented.explicitBoundaryObserved,
                    unsegmented.explicitBoundaryObserved,
                ],
                lexicalIdentityParity: segmented.lexicalStem === unsegmented.lexicalStem,
                analysisSemanticParity: JSON.stringify(segmented.analysisSemantics)
                    === JSON.stringify(unsegmented.analysisSemantics),
                routeParity: JSON.stringify(segmented.routes) === JSON.stringify(unsegmented.routes),
                boundarylessTargetIdentityParity: JSON.stringify(segmented.boundarylessTargets)
                    === JSON.stringify(unsegmented.boundarylessTargets),
                targetSpellingsDiffer: JSON.stringify(segmented.targets) !== JSON.stringify(unsegmented.targets),
                routes: unsegmented.routes,
                boundarylessTargets: unsegmented.boundarylessTargets,
            };
        }),
        [
            {
                id: "root-plus-ya",
                allCanonical: ["authorized", "authorized", true, "authorized", true, "authorized", "authorized", true, "authorized", true],
                boundaryObservation: [true, false],
                lexicalIdentityParity: true,
                analysisSemanticParity: true,
                routeParity: true,
                boundarylessTargetIdentityParity: true,
                targetSpellingsDiffer: false,
                routes: ["type-one-root-plus-ya-retentive-exception-exact", "type-two-lia-from-typed-root-plus-ya", "type-two-tia-from-lo-nonactive"],
                boundarylessTargets: ["yōcoya", "yōcoliā", "yōcoyaltiā"],
            },
            {
                id: "fused-final-i",
                allCanonical: ["authorized", "authorized", true, "authorized", true, "authorized", "authorized", true, "authorized", true],
                boundaryObservation: [true, false],
                lexicalIdentityParity: true,
                analysisSemanticParity: true,
                routeParity: true,
                boundarylessTargetIdentityParity: true,
                targetSpellingsDiffer: false,
                routes: ["type-one-final-i-consonant-alternation-exact", "type-two-tia-from-exact-huaqui-lo-license"],
                boundarylessTargets: ["huātza", "huāquiltiā"],
            },
            {
                id: "destockal-i-hui",
                allCanonical: ["authorized", "authorized", true, "authorized", true, "authorized", "authorized", true, "authorized", true],
                boundaryObservation: [true, false],
                lexicalIdentityParity: true,
                analysisSemanticParity: true,
                routeParity: true,
                boundarylessTargetIdentityParity: true,
                targetSpellingsDiffer: false,
                routes: ["type-one-destockal-hui-to-o-a-exact-long-a", "type-two-tia-from-exact-destockal-ihui-internal-hua-base"],
                boundarylessTargets: ["poloā", "polihuītiā"],
            },
        ]
    );

    s.eq(
        "Lesson 24 includes Class A final-i addition and the exact huāqui and yocoya alternations",
        (() => {
            const additions = [
                { stem: "ilpi", target: "ilpi-ā" },
                { stem: "aqui", target: "aqui-ā" },
                { stem: "pah-ti", target: "pah-ti-ā" },
            ].map((fixture) => {
                const source = buildLesson2425Source(ctx, fixture.stem, { verbClass: "A" });
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "causative",
                });
                const option = inventory.options.find((candidate) => (
                    candidate.derivationRoute === "type-one-final-i-addition-exact-long-a"
                ));
                return {
                    stem: fixture.stem,
                    sourceClass: source.classId,
                    inventoryStatus: inventory.authorizationStatus,
                    inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                    target: option?.targetStem || "",
                    expectedTarget: fixture.target,
                    route: option?.derivationRoute || "",
                    targetClass: option?.targetClass || "",
                    construction: option?.targetConstruction || null,
                };
            });
            const summarizeExact = (stem, verbClass, route) => {
                const source = buildLesson2425Source(ctx, stem, { verbClass });
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "causative",
                });
                const option = inventory.options.find((candidate) => candidate.derivationRoute === route);
                return {
                    inventoryStatus: inventory.authorizationStatus,
                    inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                    target: option?.targetStem || "",
                    route: option?.derivationRoute || "",
                    exactWitness: option?.exactWitness === true,
                    sourceAnalysisId: option?.sourceAnalysisId || "",
                    construction: option?.targetConstruction || null,
                };
            };
            return {
                additions,
                huaqui: summarizeExact("huāqui", "B", "type-one-final-i-consonant-alternation-exact"),
                yocoya: summarizeExact("yocoya", "A", "type-one-root-plus-ya-retentive-exception-exact"),
            };
        })(),
        {
            additions: [
                {
                    stem: "ilpi",
                    sourceClass: "A",
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    target: "ilpi-ā",
                    expectedTarget: "ilpi-ā",
                    route: "type-one-final-i-addition-exact-long-a",
                    targetClass: "C",
                    construction: { operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" },
                },
                {
                    stem: "aqui",
                    sourceClass: "A",
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    target: "aqui-ā",
                    expectedTarget: "aqui-ā",
                    route: "type-one-final-i-addition-exact-long-a",
                    targetClass: "C",
                    construction: { operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" },
                },
                {
                    stem: "pah-ti",
                    sourceClass: "A",
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    target: "pah-ti-ā",
                    expectedTarget: "pah-ti-ā",
                    route: "type-one-final-i-addition-exact-long-a",
                    targetClass: "C",
                    construction: { operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" },
                },
            ],
            huaqui: {
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                target: "huā-tz-a",
                route: "type-one-final-i-consonant-alternation-exact",
                exactWitness: true,
                sourceAnalysisId: "cn-l24-2431a-huaqui-fused-destockal:type-one-consonant-alternation",
                construction: { operation: "replace-final-and-consonant", remove: "qui", add: "tz-a" },
            },
            yocoya: {
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                target: "yōco-y-a",
                route: "type-one-root-plus-ya-retentive-exception-exact",
                exactWitness: true,
                sourceAnalysisId: "cn-l24-2432b-yocoya-retentive-exception:root-plus-ya-retentive-exception",
                construction: { operation: "morphological-replacement", preserve: "y", remove: "source-a", add: "causative-a", surfaceChange: false },
            },
        }
    );

    s.eq(
        "Lesson 24.5.7 signs destockal preferences and 24.5.9 replaces generic final-i guesses with exact fused-stock formations",
        (() => {
            const preferences = [
                "chacu-ā-ni",
                "chay-ā-hui",
                "tlap-a-ni",
                "tzay-ā-ni",
                "cot-ō-ni",
                "tlap-i-hui",
            ].map((stem) => {
                const source = buildLesson2425Source(ctx, stem, { verbClass: "B" });
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "causative",
                });
                const preferred = inventory.options.find((option) => option.derivationalPreference === "preferred");
                const alternative = inventory.options.find((option) => option.derivationalPreference === "available-alternative");
                return {
                    stem,
                    inventoryStatus: inventory.authorizationStatus,
                    inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                    preferredRoute: preferred?.derivationRoute || "",
                    preferredTarget: preferred?.targetStem || "",
                    preferenceRuleId: preferred?.preferenceRuleId || "",
                    preferenceAndrewsSection: preferred?.preferenceAndrewsSection || "",
                    sourceAnalysisId: preferred?.sourceAnalysisId || "",
                    alternateRoute: alternative?.derivationRoute || "",
                    alternateStatus: alternative?.derivationalPreference || "",
                };
            });
            const exactFormations = [
                { stem: "mīni", route: "type-one-fused-destockal-mini-replacement-exact" },
                { stem: "xini", route: "type-one-fused-destockal-xini-addition-exact" },
                { stem: "cēhui", route: "type-one-fused-destockal-cehui-addition-exact" },
            ].map((fixture) => {
                const source = buildLesson2425Source(ctx, fixture.stem, { verbClass: "B" });
                const analysis = ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "causative",
                });
                const option = inventory.options.find((candidate) => candidate.derivationRoute === fixture.route);
                const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                    derivationType: "causative",
                    optionId: option?.optionId || "missing-fused-destockal-option",
                    targetSubject: "1sg",
                });
                const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
                    mood: "indicative",
                    tense: "present",
                    targetSubject: "1sg",
                });
                return {
                    stem: fixture.stem,
                    analysisCanonical: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(analysis),
                    inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                    target: option?.targetStem || "",
                    targetClass: option?.targetClass || "",
                    route: option?.derivationRoute || "",
                    exactWitness: option?.exactWitness === true,
                    sourceAnalysisId: option?.sourceAnalysisId || "",
                    operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                    machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(machinery),
                };
            });
            return { preferences, exactFormations };
        })(),
        {
            preferences: [
                {
                    stem: "chacu-ā-ni",
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    preferredRoute: "type-one-final-i-addition",
                    preferredTarget: "chacu-ā-ni-ā",
                    preferenceRuleId: "cn-l24-2457a-destockal-ni-prefers-addition",
                    preferenceAndrewsSection: "24.5.7",
                    sourceAnalysisId: "cn-l24-boundary-free-destockal-ni:chacuāni",
                    alternateRoute: "type-one-final-i-replacement",
                    alternateStatus: "available-alternative",
                },
                {
                    stem: "chay-ā-hui",
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    preferredRoute: "type-one-destockal-hui-replacement-exact-quantity",
                    preferredTarget: "chay-ā-hu-a",
                    preferenceRuleId: "cn-l24-2457b-destockal-hui-prefers-replacement",
                    preferenceAndrewsSection: "24.5.7",
                    sourceAnalysisId: "cn-l24-boundary-free-destockal-hui:chayāhui",
                    alternateRoute: "type-one-destockal-hui-addition-exact-long-a",
                    alternateStatus: "available-alternative",
                },
                {
                    stem: "tlap-a-ni",
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    preferredRoute: "type-one-final-i-addition",
                    preferredTarget: "tlap-ā-ni-ā",
                    preferenceRuleId: "cn-l24-2457a-destockal-ni-prefers-addition",
                    preferenceAndrewsSection: "24.5.7",
                    sourceAnalysisId: "cn-l24-boundary-free-destockal-ni:tlapāni",
                    alternateRoute: "type-one-final-i-replacement",
                    alternateStatus: "available-alternative",
                },
                {
                    stem: "tzay-ā-ni",
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    preferredRoute: "type-one-final-i-replacement",
                    preferredTarget: "tzay-ā-n-a",
                    preferenceRuleId: "cn-l24-2457a-tzayani-prefers-replacement",
                    preferenceAndrewsSection: "24.5.7",
                    sourceAnalysisId: "cn-l24-boundary-free-destockal-ni:tzayāni",
                    alternateRoute: "type-one-final-i-addition",
                    alternateStatus: "available-alternative",
                },
                {
                    stem: "cot-ō-ni",
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    preferredRoute: "type-one-final-i-replacement",
                    preferredTarget: "cot-ō-n-a",
                    preferenceRuleId: "cn-l24-2457a-cotoni-prefers-replacement",
                    preferenceAndrewsSection: "24.5.7",
                    sourceAnalysisId: "cn-l24-boundary-free-destockal-ni:cotōni",
                    alternateRoute: "type-one-final-i-addition",
                    alternateStatus: "available-alternative",
                },
                {
                    stem: "tlap-i-hui",
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    preferredRoute: "type-one-destockal-hui-addition-exact-long-a",
                    preferredTarget: "tlap-ī-hui-ā",
                    preferenceRuleId: "cn-l24-2457b-tlapihui-prefers-addition",
                    preferenceAndrewsSection: "24.5.7",
                    sourceAnalysisId: "cn-l24-2457b-tlapihui-addition-preference:destockal-hui-candidate",
                    alternateRoute: "type-one-destockal-hui-replacement-exact-quantity",
                    alternateStatus: "available-alternative",
                },
            ],
            exactFormations: [
                {
                    stem: "mīni",
                    analysisCanonical: true,
                    inventoryCanonical: true,
                    target: "mī-n-a",
                    targetClass: "B",
                    route: "type-one-fused-destockal-mini-replacement-exact",
                    exactWitness: true,
                    sourceAnalysisId: "cn-l24-2459-mini-fused-destockal:fused-destockal-ni-exact",
                    operationCanonical: true,
                    machineryCanonical: true,
                },
                {
                    stem: "xini",
                    analysisCanonical: true,
                    inventoryCanonical: true,
                    target: "xī-ni-ā",
                    targetClass: "C",
                    route: "type-one-fused-destockal-xini-addition-exact",
                    exactWitness: true,
                    sourceAnalysisId: "cn-l24-2459-xini-fused-destockal:fused-destockal-ni-exact",
                    operationCanonical: true,
                    machineryCanonical: true,
                },
                {
                    stem: "cēhui",
                    analysisCanonical: true,
                    inventoryCanonical: true,
                    target: "cē-hui-ā",
                    targetClass: "C",
                    route: "type-one-fused-destockal-cehui-addition-exact",
                    exactWitness: true,
                    sourceAnalysisId: "cn-l24-2459-cehui-fused-destockal:fused-destockal-hui-exact",
                    operationCanonical: true,
                    machineryCanonical: true,
                },
            ],
        }
    );

    s.eq(
        "Lesson 25 consumes canonical hidden nonactive bases and the Class D yauh suppletive route",
        (() => {
            const summarizeBridge = (stem, verbClass, sourceValence, target) => {
                const source = buildLesson2425Source(ctx, stem, { verbClass, sourceValence });
                const analysis = ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "causative",
                });
                const option = inventory.options.find((candidate) => candidate.targetStem === target);
                const record = option?.lesson20NonactiveStemRecord || null;
                const construction = option?.targetConstruction || null;
                const boundary = construction?.boundarySpellingFrame || null;
                return {
                    sourceClass: source.classId,
                    analysisCanonical: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(analysis),
                    inventoryStatus: inventory.authorizationStatus,
                    inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                    target: option?.targetStem || "",
                    route: option?.derivationRoute || "",
                    targetClass: option?.targetClass || "",
                    exactWitness: option?.exactWitness === true,
                    hiddenBase: record?.nonactiveStem || "",
                    hiddenFamily: record?.suffixFamily || "",
                    hiddenRecordCanonical: record
                        ? ctx.isClassicalNahuatlNonactiveStemRecord(record, stem)
                        : false,
                    construction: construction ? {
                        operation: construction.operation,
                        nonactiveStem: construction.nonactiveStem,
                        remove: construction.remove,
                        add: construction.add,
                        ...(boundary?.changed === true ? {
                            productiveTargetStem: construction.productiveTargetStem,
                            boundarySpelling: {
                                operationId: boundary.operationId,
                                phoneme: boundary.underlyingFinalConsonant,
                                input: boundary.inputSpelling,
                                output: boundary.outputSpelling,
                                result: boundary.realizedRetainedStem,
                                selectedRuleId: boundary.spellingChangeFrame?.selectedRuleId || "",
                            },
                        } : {}),
                    } : null,
                };
            };
            const yauhSource = buildLesson2425Source(ctx, "ya-uh", { verbClass: "D" });
            const yauhAnalysis = ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(yauhSource);
            const yauhInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(yauhSource, {
                derivationType: "causative",
            });
            const yauhOption = yauhInventory.options.find((candidate) => (
                candidate.derivationRoute === "type-two-suppletive-yauh-huica"
            ));
            return {
                mahui: summarizeBridge("mahui", "B", "intransitive", "mauh-tiā"),
                quemiOHua: summarizeBridge("quēmi", "B", "specific-projective", "quēn-tiā"),
                quemiLo: summarizeBridge("quēmi", "B", "specific-projective", "quēmi-l-tiā"),
                yauh: {
                    sourceClass: yauhSource.classId,
                    analysisCanonical: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(yauhAnalysis),
                    analysisCategories: yauhAnalysis.analyses.map((analysis) => analysis.category),
                    inventoryStatus: yauhInventory.authorizationStatus,
                    inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(yauhInventory),
                    selectorRequired: yauhInventory.selectorRequired,
                    target: yauhOption?.targetStem || "",
                    route: yauhOption?.derivationRoute || "",
                    targetClass: yauhOption?.targetClass || "",
                    exactWitness: yauhOption?.exactWitness === true,
                    sourceAnalysisId: yauhOption?.sourceAnalysisId || "",
                    construction: yauhOption?.targetConstruction || null,
                },
            };
        })(),
        {
            mahui: {
                sourceClass: "B",
                analysisCanonical: true,
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                target: "mauh-tiā",
                route: "type-two-tia-from-o-hua-w-to-uh-exact",
                targetClass: "C",
                exactWitness: true,
                hiddenBase: "",
                hiddenFamily: "",
                hiddenRecordCanonical: false,
                construction: {
                    operation: "replace-internal-nonactive-right-edge",
                    nonactiveStem: "mahu-o-hua",
                    remove: "o-hua",
                    add: "tiā",
                    productiveTargetStem: "mauh-tiā",
                    boundarySpelling: {
                        operationId: "cn-l2-derivational-boundary-spelling",
                        phoneme: "[w]",
                        input: "hu",
                        output: "uh",
                        result: "mauh",
                        selectedRuleId: "cn-l2-24-w-final",
                    },
                },
            },
            quemiOHua: {
                sourceClass: "B",
                analysisCanonical: true,
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                target: "quēn-tiā",
                route: "type-two-tia-from-o-hua-m-to-n-exact",
                targetClass: "C",
                exactWitness: true,
                hiddenBase: "",
                hiddenFamily: "",
                hiddenRecordCanonical: false,
                construction: { operation: "replace-internal-nonactive-right-edge", nonactiveStem: "quēm-o-hua", remove: "o-hua", add: "tiā" },
            },
            quemiLo: {
                sourceClass: "B",
                analysisCanonical: true,
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                target: "quēmi-l-tiā",
                route: "type-two-tia-from-quemi-lo-internal-base",
                targetClass: "C",
                exactWitness: true,
                hiddenBase: "",
                hiddenFamily: "",
                hiddenRecordCanonical: false,
                construction: { operation: "replace-internal-nonactive-right-edge", nonactiveStem: "quēmi-lō", remove: "ō", add: "tiā" },
            },
            yauh: {
                sourceClass: "D",
                analysisCanonical: true,
                analysisCategories: ["suppletive-causative-source"],
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                selectorRequired: false,
                target: "huīca",
                route: "type-two-suppletive-yauh-huica",
                targetClass: "A",
                exactWitness: true,
                sourceAnalysisId: "cn-l25-251-yauh-suppletive-source:suppletive-causative-source",
                construction: { operation: "suppletion", remove: "ya-uh", add: "huīca" },
            },
        }
    );

    s.eq(
        "Lesson 25.1 keeps yauh and huallauh suppletion continuous across editorial hyphens and signs the huāl target environment",
        (() => {
            const fixtures = [
                { stem: "ya-uh", route: "type-two-suppletive-yauh-huica" },
                { stem: "yauh", route: "type-two-suppletive-yauh-huica" },
                { stem: "huāl-la-uh", route: "type-two-suppletive-huallauh-hual-huica" },
                { stem: "huāllauh", route: "type-two-suppletive-huallauh-hual-huica" },
            ];
            let forgedDirectionalEnvironmentRejected = false;
            const forms = fixtures.map((fixture) => {
                const source = buildLesson2425Source(ctx, fixture.stem, { verbClass: "D" });
                const analysis = ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "causative",
                });
                const option = inventory.options.find((candidate) => candidate.derivationRoute === fixture.route);
                const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                    derivationType: "causative",
                    optionId: option?.optionId || "missing-irregular-suppletive-option",
                    targetSubject: "1sg",
                });
                const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
                    mood: "indicative",
                    tense: "present",
                    targetSubject: "1sg",
                    ...(operation.targetEnvironment ? { sentenceOptions: { directionalPrefix: "on" } } : {}),
                });
                if (fixture.stem === "huāllauh") {
                    const forgedOperation = {
                        ...operation,
                        targetEnvironment: {
                            ...operation.targetEnvironment,
                            directionalPrefix: "on",
                        },
                    };
                    forgedDirectionalEnvironmentRejected = !ctx.isClassicalNahuatlVncDerivationOperationFrame(forgedOperation);
                }
                return {
                    stem: fixture.stem,
                    sourceStatus: source.authorizationStatus,
                    explicitBoundaryObserved: analysis.explicitBoundaryObserved,
                    analysisCanonical: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(analysis),
                    inventoryStatus: inventory.authorizationStatus,
                    inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                    target: option?.targetStem || "",
                    targetClass: option?.targetClass || "",
                    route: option?.derivationRoute || "",
                    targetEnvironment: option?.targetEnvironment || null,
                    operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                    machineryStatus: machinery.authorizationStatus,
                    machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(machinery),
                    formula: getFormulaRealization(machinery),
                    realizedDirectionalPrefix: machinery.expandedVncBoundaryFrame?.directionalPrefix || "",
                };
            });
            return { forms, forgedDirectionalEnvironmentRejected };
        })(),
        {
            forms: [
                {
                    stem: "ya-uh",
                    sourceStatus: "authorized",
                    explicitBoundaryObserved: true,
                    analysisCanonical: true,
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    target: "huīca",
                    targetClass: "A",
                    route: "type-two-suppletive-yauh-huica",
                    targetEnvironment: null,
                    operationCanonical: true,
                    machineryStatus: "authorized",
                    machineryCanonical: true,
                    formula: "#ni-0+c-0(huīca)0+0-0#",
                    realizedDirectionalPrefix: "",
                },
                {
                    stem: "yauh",
                    sourceStatus: "authorized",
                    explicitBoundaryObserved: false,
                    analysisCanonical: true,
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    target: "huīca",
                    targetClass: "A",
                    route: "type-two-suppletive-yauh-huica",
                    targetEnvironment: null,
                    operationCanonical: true,
                    machineryStatus: "authorized",
                    machineryCanonical: true,
                    formula: "#ni-0+c-0(huīca)0+0-0#",
                    realizedDirectionalPrefix: "",
                },
                {
                    stem: "huāl-la-uh",
                    sourceStatus: "authorized",
                    explicitBoundaryObserved: true,
                    analysisCanonical: true,
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    target: "huīca",
                    targetClass: "A",
                    route: "type-two-suppletive-huallauh-hual-huica",
                    targetEnvironment: {
                        directionalPrefix: "huāl",
                        directionalMeaning: "proximity-hither-here",
                        environmentSource: "suppletive-huallauh-causative",
                        andrewsSection: "25.1 note",
                    },
                    operationCanonical: true,
                    machineryStatus: "authorized",
                    machineryCanonical: true,
                    formula: "#ni-0+c-0+huāl(huīca)0+0-0#",
                    realizedDirectionalPrefix: "huāl",
                },
                {
                    stem: "huāllauh",
                    sourceStatus: "authorized",
                    explicitBoundaryObserved: false,
                    analysisCanonical: true,
                    inventoryStatus: "authorized",
                    inventoryCanonical: true,
                    target: "huīca",
                    targetClass: "A",
                    route: "type-two-suppletive-huallauh-hual-huica",
                    targetEnvironment: {
                        directionalPrefix: "huāl",
                        directionalMeaning: "proximity-hither-here",
                        environmentSource: "suppletive-huallauh-causative",
                        andrewsSection: "25.1 note",
                    },
                    operationCanonical: true,
                    machineryStatus: "authorized",
                    machineryCanonical: true,
                    formula: "#ni-0+c-0+huāl(huīca)0+0-0#",
                    realizedDirectionalPrefix: "huāl",
                },
            ],
            forgedDirectionalEnvironmentRejected: true,
        }
    );

    s.eq(
        "Canonical source-analysis validation rejects forged analyses and boundary authority",
        (() => {
            const source = buildLesson2425Source(ctx, "yocoya", { verbClass: "A" });
            const analysis = ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
            const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "causative",
            });
            const cloneAnalysis = () => JSON.parse(JSON.stringify(analysis));
            const forgedSegments = cloneAnalysis();
            forgedSegments.analyses[0].segments = ["forged-root", "ya"];
            const forgedBoundaryObservation = cloneAnalysis();
            forgedBoundaryObservation.explicitBoundaryObserved = true;
            const forgedBoundaryAuthority = cloneAnalysis();
            forgedBoundaryAuthority.boundaryAuthority = "caller-supplied-hyphens-authorize-analysis";
            const forgedUserBoundaryRequirement = cloneAnalysis();
            forgedUserBoundaryRequirement.analyses[0].userAuthoredBoundaryRequired = true;
            const forgedInternalBoundary = cloneAnalysis();
            forgedInternalBoundary.sourceInternalMorphology.hasExplicitBoundary = true;
            const forgedInventory = JSON.parse(JSON.stringify(inventory));
            forgedInventory.sourceAnalysisFrame.analyses[0].segments = ["forged-root", "ya"];
            return {
                canonicalAnalysisAccepted: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(analysis),
                canonicalInventoryAccepted: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                forgedSegmentsAccepted: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(forgedSegments),
                forgedBoundaryObservationAccepted: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(forgedBoundaryObservation),
                forgedBoundaryAuthorityAccepted: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(forgedBoundaryAuthority),
                forgedUserBoundaryRequirementAccepted: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(forgedUserBoundaryRequirement),
                forgedInternalBoundaryAccepted: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(forgedInternalBoundary),
                forgedInventoryAccepted: ctx.isClassicalNahuatlVncDerivationOptionInventory(forgedInventory),
            };
        })(),
        {
            canonicalAnalysisAccepted: true,
            canonicalInventoryAccepted: true,
            forgedSegmentsAccepted: false,
            forgedBoundaryObservationAccepted: false,
            forgedBoundaryAuthorityAccepted: false,
            forgedUserBoundaryRequirementAccepted: false,
            forgedInternalBoundaryAccepted: false,
            forgedInventoryAccepted: false,
        }
    );

    s.eq(
        "Signed o-a histories authorize recursive applicatives while raw negative exceptions stay blocked",
        (() => {
            const buildSource = (stem) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                perfectiveClass: "B",
                valence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
            });
            const deriveStack = (stem, causativeRoute) => {
                const source = buildSource(stem);
                const causativeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "causative",
                });
                const causativeOption = causativeInventory.options.find((option) => option.derivationRoute === causativeRoute);
                const causativeOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                    derivationType: "causative",
                    optionId: causativeOption?.optionId || "missing-signed-o-a-option",
                    targetSubject: "1sg",
                });
                const causativeMachinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, causativeOperation, {
                    mood: "indicative",
                    tense: "present",
                    targetSubject: "1sg",
                });
                const applicativeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(causativeMachinery, {
                    derivationType: "applicative",
                });
                const applicativeOption = applicativeInventory.options.find((option) => (
                    option.derivationRoute === "type-two-huia-from-signed-causative-o-a-history"
                ));
                const applicativeOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(causativeMachinery, {
                    derivationType: "applicative",
                    optionId: applicativeOption?.optionId || "missing-signed-history-option",
                    targetSubject: "1sg",
                    applicativeObjectKind: "specific-projective",
                    applicativeObjectPerson: "2sg",
                });
                const applicativeMachinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
                    causativeMachinery,
                    applicativeOperation,
                    { mood: "indicative", tense: "present", targetSubject: "1sg" }
                );
                return {
                    causativeTarget: causativeOption?.targetStem || "",
                    causativeOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(causativeOperation),
                    causativeMachineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(causativeMachinery),
                    applicativeInventoryStatus: applicativeInventory.authorizationStatus,
                    applicativeInventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(applicativeInventory),
                    applicativeTarget: applicativeOption?.targetStem || "",
                    applicativeRoute: applicativeOption?.derivationRoute || "",
                    applicativeOperationStatus: applicativeOperation.authorizationStatus,
                    applicativeOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(applicativeOperation),
                    applicativeMachineryStatus: applicativeMachinery.authorizationStatus,
                    applicativeMachineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(applicativeMachinery),
                    formula: getFormulaRealization(applicativeMachinery),
                };
            };
            return {
                iHui: deriveStack("pol-i-hui", "type-one-destockal-hui-to-o-a-exact-long-a"),
                oHui: deriveStack("tlap-o-hui", "type-one-destockal-o-hui-to-o-a-exact-long-a"),
            };
        })(),
        {
            iHui: {
                causativeTarget: "pol-o-ā",
                causativeOperationCanonical: true,
                causativeMachineryCanonical: true,
                applicativeInventoryStatus: "authorized",
                applicativeInventoryCanonical: true,
                applicativeTarget: "pol-huiā",
                applicativeRoute: "type-two-huia-from-signed-causative-o-a-history",
                applicativeOperationStatus: "authorized",
                applicativeOperationCanonical: true,
                applicativeMachineryStatus: "authorized",
                applicativeMachineryCanonical: true,
                formula: "#ni-0+m-itz+⎕-0(pol-huia)0+0-0#",
            },
            oHui: {
                causativeTarget: "tlap-o-ā",
                causativeOperationCanonical: true,
                causativeMachineryCanonical: true,
                applicativeInventoryStatus: "authorized",
                applicativeInventoryCanonical: true,
                applicativeTarget: "tlap-o-l-huiā",
                applicativeRoute: "type-two-huia-from-signed-causative-o-a-history",
                applicativeOperationStatus: "authorized",
                applicativeOperationCanonical: true,
                applicativeMachineryStatus: "authorized",
                applicativeMachineryCanonical: true,
                formula: "#ni-0+m-itz+⎕-0(tlap-o-l-huia)0+0-0#",
            },
        }
    );

    s.eq(
        "A coreferential Lesson 26 participant requires an explicit reflexive choice instead of a projective person",
        (() => {
            const source = ctx.buildClassicalNahuatlVerbstemClassFrame("xeloa", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "C",
                perfectiveClass: "C",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "applicative",
            });
            const exactXeloaOptionId = inventory.options.find((option) => (
                option.targetStem === "xel-huiā"
                && option.derivationRoute === "type-two-huia-from-root-final-l-o-a"
            ))?.optionId || "missing-xeloa-productive-option";
            const projective = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "applicative",
                optionId: exactXeloaOptionId,
                targetSubject: "1sg",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "1sg",
            });
            const reflexive = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "applicative",
                optionId: exactXeloaOptionId,
                targetSubject: "1sg",
                applicativeObjectKind: "reflexive",
                applicativeObjectPerson: "",
            });
            const reflexiveMachinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, reflexive, {
                mood: "indicative",
                tense: "present",
                targetSubject: "1sg",
            });
            const thirdCategorySource = ctx.buildClassicalNahuatlVerbstemClassFrame("xeloa", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "C",
                perfectiveClass: "C",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "2sg",
            });
            const thirdCategoryInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(thirdCategorySource, {
                derivationType: "applicative",
            });
            const thirdCategoryExactXeloaOptionId = thirdCategoryInventory.options.find((option) => (
                option.targetStem === "xel-huiā"
                && option.derivationRoute === "type-two-huia-from-root-final-l-o-a"
            ))?.optionId || "missing-third-category-xeloa-productive-option";
            const thirdCategoryProjective = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(thirdCategorySource, {
                derivationType: "applicative",
                optionId: thirdCategoryExactXeloaOptionId,
                targetSubject: "3sg",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "3sg",
            });
            return {
                projective: {
                    status: projective.authorizationStatus,
                    reason: projective.blockReason,
                    operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(projective),
                    addedObject: projective.participantTransformFrame?.addedObjectRequest || null,
                },
                reflexive: {
                    status: reflexive.authorizationStatus,
                    operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(reflexive),
                    addedObject: reflexive.participantTransformFrame?.addedObjectRequest ? {
                        kind: reflexive.participantTransformFrame.addedObjectRequest.objectKind,
                        person: reflexive.participantTransformFrame.addedObjectRequest.objectPerson,
                        governor: reflexive.participantTransformFrame.addedObjectRequest.governor,
                    } : null,
                    machineryStatus: reflexiveMachinery.authorizationStatus,
                    formula: getFormulaRealization(reflexiveMachinery),
                },
                thirdCategoryDistinct: {
                    status: thirdCategoryProjective.authorizationStatus,
                    reason: thirdCategoryProjective.blockReason,
                    operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(thirdCategoryProjective),
                    addedObjectKind: thirdCategoryProjective.participantTransformFrame?.addedObjectRequest?.objectKind || "",
                    addedObjectPerson: thirdCategoryProjective.participantTransformFrame?.addedObjectRequest?.objectPerson || "",
                },
            };
        })(),
        {
            projective: {
                status: "blocked",
                reason: "classical-vnc-applicative-coreferential-specific-object-must-be-reflexive",
                operationTyped: false,
                addedObject: null,
            },
            reflexive: {
                status: "authorized",
                operationTyped: true,
                addedObject: { kind: "reflexive", person: "", governor: "applicative" },
                machineryStatus: "authorized",
                formula: "#ni-0+c-0+n-o(xel-huia)0+0-0#",
            },
            thirdCategoryDistinct: {
                status: "authorized",
                reason: "",
                operationTyped: true,
                addedObjectKind: "specific-projective",
                addedObjectPerson: "3sg",
            },
        }
    );

    s.eq(
        "Lesson 26 type-two applicative imports the mainline object and preserves the source object as Lesson 23 shuntline",
        (() => {
            const witness = summarizeCanvasBuild(ctx, "l26-9321-xeloa-type-two-applicative");
            const operationRequests = witness.built.operationFrame?.participantTransformFrame?.targetObjectRequests
                || witness.built.operationFrame?.targetObjectRequests
                || [];
            const cluster = witness.built.machineryFrame?.multipleObjectClusterFrame;
            return {
                canvasLines: [witness.example.lineStart, witness.example.lineEnd],
                summary: witness.summary,
                operationRequests: operationRequests.map((request) => ({
                    id: request.objectId,
                    governor: request.governor,
                    level: request.derivationalLevel,
                })),
                clusterKind: cluster?.kind || "",
                positions: (cluster?.positions || []).map((position) => ({
                    id: position.objectId,
                    governor: position.governor,
                    level: position.derivationalLevel,
                    prominence: position.prominence,
                    carrier: position.carrier,
                    sounded: position.sounded,
                })),
            };
        })(),
        {
            canvasLines: [8819, 8823],
            summary: {
                inventoryStatus: "authorized",
                optionIdPresent: true,
                subtype: "type-two",
                targetStem: "xel-huiā",
                operationStatus: "authorized",
                operationTyped: true,
                machineryStatus: "authorized",
                formula: "#ni-0+m-itz+⎕-0(xel-huia)0+0-0#",
            },
            operationRequests: [
                { id: "source-object-1", governor: "directive", level: 1 },
                { id: "applicative-object", governor: "applicative", level: 2 },
            ],
            clusterKind: "classical-nahuatl-multiple-object-vnc-object-cluster-frame",
            positions: [
                { id: "applicative-object", governor: "applicative", level: 2, prominence: "mainline", carrier: "m-itz", sounded: true },
                { id: "source-object-1", governor: "directive", level: 1, prominence: "shuntline", carrier: "0-0", sounded: false },
            ],
        }
    );

    s.eq(
        "Causative and applicative participant transforms raise typed source depth 0, 1, and 2 to target depth 1, 2, and 3",
        (() => {
            const buildSource = (stem, verbClass, sourceObjectCount) => {
                const oneObject = sourceObjectCount > 0;
                const lesson7 = ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass,
                    perfectiveClass: verbClass,
                    valence: oneObject ? "specific-projective" : "intransitive",
                    transitivity: oneObject ? "transitive" : "intransitive",
                    objectKind: oneObject ? "specific-projective" : "none",
                    objectPerson: oneObject ? "3sg" : "",
                });
                if (sourceObjectCount < 2) {
                    return lesson7;
                }
                return ctx.buildClassicalNahuatlMultipleObjectVncFrame(lesson7, {
                    objectRequests: [
                        { objectId: "source-object-1", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                        { objectId: "source-object-2", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
                    ],
                });
            };
            const summarize = (source, derivationType, expectedTarget) => {
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType });
                const option = inventory.options.find((candidate) => candidate.targetStem === expectedTarget);
                const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                    derivationType,
                    optionId: option?.optionId || "missing-depth-option",
                    targetSubject: derivationType === "applicative" ? "1sg" : "2sg",
                    applicativeObjectKind: "specific-projective",
                    applicativeObjectPerson: "2sg",
                });
                const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
                    mood: "indicative",
                    tense: "present",
                    targetSubject: derivationType === "applicative" ? "1sg" : "2sg",
                });
                return {
                    inventoryStatus: inventory.authorizationStatus,
                    target: option?.targetStem || "",
                    sourceCount: operation.participantTransformFrame?.sourceObjectCount ?? -1,
                    targetCount: operation.participantTransformFrame?.targetObjectCount ?? -1,
                    levels: (operation.targetObjectRequests || []).map((request) => request.derivationalLevel),
                    operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                    machineryStatus: machinery.authorizationStatus,
                    machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(machinery),
                };
            };
            return {
                causative: [
                    summarize(buildSource("miqui", "B", 0), "causative", "mic-tiā"),
                    summarize(buildSource("chihua", "A", 1), "causative", "chīhua-l-tiā"),
                    summarize(buildSource("chihua", "A", 2), "causative", "chīhua-l-tiā"),
                ],
                applicative: [0, 1, 2].map((depth) => summarize(
                    buildSource("mati", "B", depth),
                    "applicative",
                    "mati-liā"
                )),
            };
        })(),
        {
            causative: [
                { inventoryStatus: "authorized", target: "mic-tiā", sourceCount: 0, targetCount: 1, levels: [1], operationCanonical: true, machineryStatus: "authorized", machineryCanonical: true },
                { inventoryStatus: "authorized", target: "chīhua-l-tiā", sourceCount: 1, targetCount: 2, levels: [1, 2], operationCanonical: true, machineryStatus: "authorized", machineryCanonical: true },
                { inventoryStatus: "authorized", target: "chīhua-l-tiā", sourceCount: 2, targetCount: 3, levels: [1, 2, 3], operationCanonical: true, machineryStatus: "authorized", machineryCanonical: true },
            ],
            applicative: [
                { inventoryStatus: "authorized", target: "mati-liā", sourceCount: 0, targetCount: 1, levels: [1], operationCanonical: true, machineryStatus: "authorized", machineryCanonical: true },
                { inventoryStatus: "authorized", target: "mati-liā", sourceCount: 1, targetCount: 2, levels: [1, 2], operationCanonical: true, machineryStatus: "authorized", machineryCanonical: true },
                { inventoryStatus: "authorized", target: "mati-liā", sourceCount: 2, targetCount: 3, levels: [1, 2, 3], operationCanonical: true, machineryStatus: "authorized", machineryCanonical: true },
            ],
        }
    );

    s.eq(
        "Canonical typed source rebuilding rejects hostile outer stem, subject, class, valence, and object-count mutations",
        (() => {
            const buildSource = (stem, {
                subject = "3sg",
                verbClass = "B",
                valence = "intransitive",
                objectKind = "none",
                objectPerson = "",
            } = {}) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
                subject,
                mood: "indicative",
                tense: "present",
                verbClass,
                perfectiveClass: verbClass,
                valence,
                transitivity: valence === "intransitive" ? "intransitive" : "transitive",
                objectKind,
                objectPerson,
            });
            const miqui = buildSource("miqui");
            const tomi = buildSource("tomi");
            const xeloa = buildSource("xeloa", {
                subject: "1sg",
                verbClass: "C",
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const hostileStem = JSON.parse(JSON.stringify(miqui));
            hostileStem.sourceVerbstem = "tomi";
            const hostileSubject = JSON.parse(JSON.stringify(tomi));
            hostileSubject.priorVncFrame.subject = "1sg";
            hostileSubject.priorVncFrame.personDyad.subject = "1sg";
            const hostileClass = JSON.parse(JSON.stringify(xeloa));
            hostileClass.classId = "A";
            const hostileValence = JSON.parse(JSON.stringify(xeloa));
            hostileValence.citationRuleFrame.valence = "intransitive";
            const hostileObjectCount = JSON.parse(JSON.stringify(xeloa));
            hostileObjectCount.priorVncFrame.objectFrame = null;
            const summarize = (frame, derivationType) => {
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(frame, { derivationType });
                const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(frame, {
                    derivationType,
                    optionId: derivationType === "causative"
                        ? "causative:type-one:replacement:tomi:tom-a"
                        : "applicative:type-two:huiā:xeloa:xel-huiā",
                    targetSubject: "1sg",
                    applicativeObjectKind: "specific-projective",
                    applicativeObjectPerson: "2sg",
                });
                return {
                    inventoryStatus: inventory.authorizationStatus,
                    inventoryReason: inventory.blockReason,
                    targets: inventory.options.map(option => option.targetStem),
                    operationStatus: operation.authorizationStatus,
                    operationReason: operation.blockReason,
                    operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                };
            };
            return {
                stem: summarize(hostileStem, "causative"),
                subject: summarize(hostileSubject, "causative"),
                class: summarize(hostileClass, "applicative"),
                valence: summarize(hostileValence, "applicative"),
                objectCount: summarize(hostileObjectCount, "applicative"),
            };
        })(),
        {
            stem: {
                inventoryStatus: "blocked",
                inventoryReason: "classical-vnc-derivation-base-source-not-canonical",
                targets: [],
                operationStatus: "blocked",
                operationReason: "classical-vnc-derivation-base-source-not-canonical",
                operationTyped: false,
            },
            subject: {
                inventoryStatus: "blocked",
                inventoryReason: "classical-vnc-derivation-base-source-not-canonical",
                targets: [],
                operationStatus: "blocked",
                operationReason: "classical-vnc-derivation-base-source-not-canonical",
                operationTyped: false,
            },
            class: {
                inventoryStatus: "blocked",
                inventoryReason: "classical-vnc-derivation-base-source-not-canonical",
                targets: [],
                operationStatus: "blocked",
                operationReason: "classical-vnc-derivation-base-source-not-canonical",
                operationTyped: false,
            },
            valence: {
                inventoryStatus: "blocked",
                inventoryReason: "classical-vnc-derivation-base-source-not-canonical",
                targets: [],
                operationStatus: "blocked",
                operationReason: "classical-vnc-derivation-base-source-not-canonical",
                operationTyped: false,
            },
            objectCount: {
                inventoryStatus: "blocked",
                inventoryReason: "classical-vnc-derivation-base-source-not-canonical",
                targets: [],
                operationStatus: "blocked",
                operationReason: "classical-vnc-derivation-base-source-not-canonical",
                operationTyped: false,
            },
        }
    );

    s.eq(
        "Target, formula, surface, forged option, and forged operation payloads cannot authorize derivation",
        (() => {
            const witness = summarizeCanvasBuild(ctx, "l24-8146-tomi-distinct-causative");
            const source = witness.built.sourceMachineryFrame;
            const poisonedInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "causative",
                sourceValence: "intransitive",
                verbClass: "B",
                targetStem: "FORGED-TARGET",
                formula: "#FORGED-FORMULA#",
                surface: "FORGED-SURFACE",
                choiceId: "FORGED-CANVAS-CHOICE",
                catalogId: "FORGED-CANVAS-CATALOG",
                printedSource: "(FORGED-SOURCE)",
                printedResult: "tla-(FORGED-RESULT)",
            });
            const forgedOption = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                optionId: "forged-option-id",
                targetSubject: "1sg",
                selectedOption: {
                    optionId: "cn-l24-2431a-tomi-tom-a",
                    targetStem: "FORGED-TARGET",
                    authorizationStatus: "authorized",
                },
            });
            const staleSource = ctx.buildClassicalNahuatlVerbstemClassFrame("tēmi", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                perfectiveClass: "B",
                valence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
            });
            const staleOption = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(staleSource, {
                derivationType: "causative",
                optionId: witness.built.selectedOption?.optionId || "missing-source-bound-option",
                targetSubject: "2sg",
            });
            const forgedOperation = JSON.parse(JSON.stringify(witness.built.operationFrame));
            forgedOperation.targetStem = "FORGED-TARGET";
            forgedOperation.formula = "#FORGED-FORMULA#";
            forgedOperation.surface = "FORGED-SURFACE";
            const unsignedSelectedOptionOperation = JSON.parse(JSON.stringify(witness.built.operationFrame));
            delete unsignedSelectedOptionOperation.selectedOption.canonicalSignature;
            unsignedSelectedOptionOperation.selectedOption.unsignedAuthorityClaim = "FORGED-AUTHORITY";
            const builtFromForgedOperation = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
                source,
                forgedOperation,
                { mood: "indicative", tense: "present", targetSubject: "1sg" }
            );
            const builtFromUnsignedSelectedOption = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
                source,
                unsignedSelectedOptionOperation,
                { mood: "indicative", tense: "present", targetSubject: "1sg" }
            );
            const builtWithArtifactPoison = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
                source,
                witness.built.operationFrame,
                {
                    mood: "indicative",
                    tense: "present",
                    targetSubject: "1sg",
                    targetStem: "FORGED-TARGET",
                    formula: "#FORGED-FORMULA#",
                    surface: "FORGED-SURFACE",
                }
            );
            const stringOnlyOperation = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
                source,
                {
                    targetStem: "tom-a",
                    targetClass: "B",
                    formula: "#ni-0+c-0(tom-a)0+0-0#",
                    authorizationStatus: "authorized",
                },
                { mood: "indicative", tense: "present", targetSubject: "1sg" }
            );
            const forgedInventory = JSON.parse(JSON.stringify(poisonedInventory));
            forgedInventory.options[0].targetStem = "FORGED-TARGET";
            const forgedDerivedMachinery = JSON.parse(JSON.stringify(witness.built.machineryFrame));
            forgedDerivedMachinery.targetStem = "FORGED-TARGET";
            const duplicateObjectSource = ctx.buildClassicalNahuatlVerbstemClassFrame("namaca", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const duplicateObjectFrame = ctx.buildClassicalNahuatlMultipleObjectVncFrame(duplicateObjectSource, {
                objectRequests: [
                    { objectId: "duplicate-object", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "duplicate-object", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
                ],
            });
            const duplicateObjectInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(duplicateObjectFrame, {
                derivationType: "causative",
            });
            return {
                poisonInInventory: JSON.stringify(poisonedInventory).includes("FORGED"),
                canvasAuthorityCarrierPresent: [
                    "canvasDerivationChoiceFrames",
                    "choiceId",
                    "catalogId",
                    "printedSource",
                    "printedResult",
                ].some((key) => Object.hasOwn(poisonedInventory, key)),
                inventoryTargets: poisonedInventory.options.map((option) => option.targetStem),
                inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(poisonedInventory),
                forgedInventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(forgedInventory),
                forgedOptionBlocked: forgedOption.authorizationStatus === "blocked"
                    && Boolean(forgedOption.blockReason)
                    && !ctx.isClassicalNahuatlVncDerivationOperationFrame(forgedOption),
                staleOptionBlocked: staleOption.authorizationStatus === "blocked"
                    && staleOption.blockReason === "classical-vnc-derivation-selected-option-was-not-generated"
                    && !ctx.isClassicalNahuatlVncDerivationOperationFrame(staleOption),
                forgedOperationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(forgedOperation),
                forgedBuildBlocked: builtFromForgedOperation.authorizationStatus === "blocked"
                    && Boolean(builtFromForgedOperation.blockReason),
                unsignedSelectedOption: {
                    operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(unsignedSelectedOptionOperation),
                    buildStatus: builtFromUnsignedSelectedOption.authorizationStatus,
                },
                artifactPoisonBuild: [
                    builtWithArtifactPoison.authorizationStatus,
                    getFormulaRealization(builtWithArtifactPoison),
                    JSON.stringify(builtWithArtifactPoison).includes("FORGED"),
                ],
                derivedMachineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(witness.built.machineryFrame),
                forgedDerivedMachineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(forgedDerivedMachinery),
                stringOnlyBuildBlocked: stringOnlyOperation.authorizationStatus === "blocked"
                    && Boolean(stringOnlyOperation.blockReason),
                duplicateObjectIds: {
                    sourceStatus: duplicateObjectFrame.authorizationStatus,
                    sourceReason: duplicateObjectFrame.blockReason,
                    inventoryStatus: duplicateObjectInventory.authorizationStatus,
                    inventoryReason: duplicateObjectInventory.blockReason,
                    optionCount: duplicateObjectInventory.options.length,
                },
            };
        })(),
        {
            poisonInInventory: false,
            canvasAuthorityCarrierPresent: false,
            inventoryTargets: ["tom-a", "tom-tiā"],
            inventoryCanonical: true,
            forgedInventoryCanonical: false,
            forgedOptionBlocked: true,
            staleOptionBlocked: true,
            forgedOperationTyped: false,
            forgedBuildBlocked: true,
            unsignedSelectedOption: {
                operationTyped: false,
                buildStatus: "blocked",
            },
            artifactPoisonBuild: ["authorized", "#ni-0+c-0(tom-a)0+0-0#", false],
            derivedMachineryCanonical: true,
            forgedDerivedMachineryCanonical: false,
            stringOnlyBuildBlocked: true,
            duplicateObjectIds: {
                sourceStatus: "blocked",
                sourceReason: "lesson23-typed-object-request-inventory-invalid",
                inventoryStatus: "blocked",
                inventoryReason: "classical-vnc-derivation-source-machinery-kind-not-authorized",
                optionCount: 0,
            },
        }
    );

    s.eq(
        "Derived machinery validator rebuilds every typed target, formula, proof, and finalizer projection",
        (() => {
            const witness = summarizeCanvasBuild(ctx, "l26-9321-xeloa-type-two-applicative");
            const canonical = witness.built.machineryFrame;
            const clone = () => JSON.parse(JSON.stringify(canonical));
            const hostile = {};

            hostile.finalTypedAlias = clone();
            hostile.finalTypedAlias.finalTypedVncSlotFrame.semanticIdentity = "LIE";

            hostile.proofTypedTarget = clone();
            hostile.proofTypedTarget.proofFrame.conclusion.finalTypedVncSlotFrame.semanticIdentity = "LIE";

            hostile.sourceOperationTarget = clone();
            hostile.sourceOperationTarget.sourceOperationTargetFrames.target.semanticIdentity = "LIE";

            hostile.topFormula = clone();
            hostile.topFormula.formulaRealization = "#LIE#";

            hostile.proofFormula = clone();
            hostile.proofFormula.proofFrame.conclusion.selectedFormula = "#LIE#";

            hostile.finalBoundaryFormula = clone();
            hostile.finalBoundaryFormula.proofFrame.conclusion.finalBoundaryRealizationFrame.formulaRealization = "#LIE#";

            hostile.proofAuthorization = clone();
            hostile.proofAuthorization.proofFrame.authorizationStatus = "blocked";

            hostile.selectedOutput = clone();
            hostile.selectedOutput.selectedOutputLogicFrame.selectedFormula = "#LIE#";

            hostile.sentenceFinalizer = clone();
            hostile.sentenceFinalizer.sentenceSurfaceFrame.baseVncFormula = "#LIE#";

            hostile.grammarOperation = clone();
            hostile.grammarOperation.grammarOperationEvaluationFrame.resultOperationId = "LIE";

            hostile.clusterAlias = clone();
            hostile.clusterAlias.multipleObjectClusterFrame.positions[0].carrier = "LIE";

            const negativeSource = ctx.buildClassicalNahuatlVerbstemClassFrame("xeloa", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "C",
                perfectiveClass: "C",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                negative: true,
            });
            const negativeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(negativeSource, {
                derivationType: "applicative",
            });
            const negativeExactXeloaOptionId = negativeInventory.options.find((option) => (
                option.targetStem === "xel-huiā"
                && option.derivationRoute === "type-two-huia-from-root-final-l-o-a"
            ))?.optionId || "missing-negative-xeloa-productive-option";
            const negativeOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(negativeSource, {
                derivationType: "applicative",
                optionId: negativeExactXeloaOptionId,
                targetSubject: "1sg",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "2sg",
            });
            const negativeMachinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(negativeSource, negativeOperation, {
                mood: "indicative",
                tense: "present",
                targetSubject: "1sg",
                sentenceOptions: { negative: true },
            });

            const automaticSource = ctx.buildClassicalNahuatlVerbstemClassFrame("temō", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
            });
            const automaticOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(automaticSource, {
                derivationType: "causative",
                optionId: "",
                targetSubject: "1sg",
            });
            const automaticMachinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(automaticSource, automaticOperation, {
                mood: "indicative",
                tense: "present",
                targetSubject: "1sg",
            });

            return {
                canonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(canonical),
                canonicalAutomaticSelection: {
                    status: automaticMachinery.authorizationStatus,
                    requestedOptionId: automaticOperation.requestedOptionId,
                    selectedOptionId: automaticOperation.selectedOptionId,
                    canvasChoiceCapability: typeof ctx.isClassicalNahuatlCanvasDerivationChoiceFrame,
                    selectedCanvasChoicePresent:
                        Object.hasOwn(automaticOperation, "selectedCanvasDerivationChoiceFrame")
                        || Object.hasOwn(automaticOperation.selectedOption || {}, "canvasDerivationChoiceFrame"),
                    target: automaticOperation.targetStem,
                    typedSourceContinuity:
                        automaticOperation.sourceMachineryFrame === automaticSource
                        && automaticOperation.selectedOption?.sourceSignature === automaticOperation.sourceSignature,
                    semanticRuleId: automaticOperation.selectedOption?.ruleId || "",
                    nonactiveRecordCanonical:
                        ctx.isClassicalNahuatlNonactiveStemRecord(
                            automaticOperation.selectedOption?.lesson20NonactiveStemRecord,
                            automaticOperation.sourceStem
                        ),
                    canonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(automaticMachinery),
                },
                canonicalNegativeFinalizer: {
                    status: negativeMachinery.authorizationStatus,
                    sentenceType: negativeMachinery.sentenceSurfaceFrame?.sentenceType || "",
                    negativePrefix: negativeMachinery.sentenceSurfaceFrame?.negativePrefix || "",
                    canonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(negativeMachinery),
                },
                hostile: Object.fromEntries(Object.entries(hostile).map(([id, frame]) => [
                    id,
                    ctx.isClassicalNahuatlDerivedVncMachineryFrame(frame),
                ])),
            };
        })(),
        {
            canonical: true,
            canonicalAutomaticSelection: {
                status: "authorized",
                requestedOptionId: "",
                selectedOptionId: "causative:type-two:final-o:direct:hua:temō-hua",
                canvasChoiceCapability: "undefined",
                selectedCanvasChoicePresent: false,
                target: "temō-huiā",
                typedSourceContinuity: true,
                semanticRuleId: "cn-l25-256-final-o-direct-huia",
                nonactiveRecordCanonical: true,
                canonical: true,
            },
            canonicalNegativeFinalizer: {
                status: "authorized",
                sentenceType: "negative-assertion",
                negativePrefix: "ah#",
                canonical: true,
            },
            hostile: {
                finalTypedAlias: false,
                proofTypedTarget: false,
                sourceOperationTarget: false,
                topFormula: false,
                proofFormula: false,
                finalBoundaryFormula: false,
                proofAuthorization: false,
                selectedOutput: false,
                sentenceFinalizer: false,
                grammarOperation: false,
                clusterAlias: false,
            },
        }
    );

    s.eq(
        "Raw Karttunen 1992 relations attach quantity-preserving lexical evidence only after Andrews generates the same candidate",
        (() => {
            const buildSource = (stem, verbClass, sourceValence) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass,
                perfectiveClass: verbClass,
                valence: sourceValence,
                transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
                objectKind: sourceValence === "intransitive" ? "none" : sourceValence,
                objectPerson: sourceValence === "intransitive" ? "" : "3sg",
            });
            const inventoryFor = (stem, verbClass, sourceValence, derivationType) => ctx.getClassicalNahuatlVncDerivationOptionInventory(
                buildSource(stem, verbClass, sourceValence),
                { derivationType }
            );
            const evidenceInventory = ctx.getClassicalNahuatlKarttunen1992DerivationEvidenceInventory();
            const segmented = inventoryFor("cā-hua", "A", "specific-projective", "applicative");
            const unsegmented = inventoryFor("cāhua", "A", "specific-projective", "applicative");
            const quantityFree = inventoryFor("cahua", "A", "specific-projective", "applicative");
            const attestedCausative = inventoryFor("mayāna", "B", "intransitive", "causative");
            const unmappedCausative = inventoryFor("āyi", "B", "intransitive", "causative");
            const unrelated = inventoryFor("namaca", "A", "specific-projective", "applicative");
            const findEvidence = inventory => inventory.options.flatMap(option => option.lexicalEvidenceMatches || []);
            const segmentedEvidence = findEvidence(segmented)[0] || null;
            const confirmedEvidence = evidenceInventory.filter(record => record.runtimeIntersectionStatus === "confirmed-current-andrews-output");
            const noLicenseEvidence = evidenceInventory.filter(record => record.runtimeIntersectionStatus === "explicit-edge-no-current-andrews-overlap");
            const forged = JSON.parse(JSON.stringify(segmented));
            forged.options.find(option => option.lexicalEvidenceMatches?.length).lexicalEvidenceMatches[0].grammarAuthority = true;
            const quantityFreeRegularTypeTwo = quantityFree.options.find(option => option.ruleId === "cn-l26-267-consonant-a-i-lia");
            const unsegmentedRegularTypeTwo = unsegmented.options.find(option => option.ruleId === "cn-l26-267-consonant-a-i-lia");
            const corpusAyi = ctx.getClassicalNahuatlKarttunen1992DerivationEvidenceMatches({
                derivationType: "causative",
                sourceStem: "āyi",
                targetStem: "āyīltiā",
            });
            const crossSource = ctx.getClassicalNahuatlKarttunen1992DerivationEvidenceMatches({
                derivationType: "applicative",
                sourceStem: "cāhua",
                targetStem: "mayānaltiā",
            });
            return {
                corpus: {
                    total: evidenceInventory.length,
                    confirmed: confirmedEvidence.length,
                    applicative: confirmedEvidence.filter(record => record.operation === "applicative").length,
                    causative: confirmedEvidence.filter(record => record.operation === "causative").length,
                    nonactive: confirmedEvidence.filter(record => record.operation === "nonactive").length,
                    noLicenseCausative: noLicenseEvidence.filter(record => record.operation === "causative").length,
                    allCausative: evidenceInventory.filter(record => record.operation === "causative").length,
                    frozen: Object.isFrozen(evidenceInventory) && evidenceInventory.every(Object.isFrozen),
                    rawKarttunenOnly: evidenceInventory.every(record => record.relationExtractionField === "Karttunen"
                        && record.relationExtractionBlock === "raw CSV cell"
                        && record.provenanceDisplay === "raw Karttunen column"
                        && record.sourceFileSha256 === "5a48f4827eada45f7f3cfb0aea3c47874fe711a542c3c06b395e7bdde5c456bc"
                        && record.directionStatus === "source-after-marker-to-derivative-before-marker"
                        && record.directionContract === "TARGET marker SOURCE; inventory stores SOURCE -> TARGET"
                        && record.quantityStatus === "classical-vowel-quantity-preserved"
                        && record.normalizedTranslationUsed === false
                        && record.normalizedTranslationAuthority === false),
                },
                segmented: {
                    target: segmented.options.find(option => option.lexicalEvidenceMatches?.length)?.targetStem || "",
                    canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(segmented),
                    recordId: segmentedEvidence?.sourceRecordId || "",
                    matchBasis: segmentedEvidence?.matchBasis || "",
                    citation: [segmentedEvidence?.sourceOriginal || "", segmentedEvidence?.targetOriginal || ""],
                    rows: segmentedEvidence?.sourceRowNumbers || [],
                    provenance: [segmentedEvidence?.relationExtractionField || "", segmentedEvidence?.provenanceDisplay || ""],
                    direction: [segmentedEvidence?.directionStatus || "", segmentedEvidence?.directionContract || ""],
                    authority: [
                        segmentedEvidence?.grammarAuthority,
                        segmentedEvidence?.generationAuthority,
                        segmentedEvidence?.targetConstructionAuthority,
                        segmentedEvidence?.formulaAuthority,
                        segmentedEvidence?.surfaceAuthority,
                    ],
                },
                sameRecordWithoutBoundary: findEvidence(unsegmented)[0]?.sourceRecordId || "",
                quantityFree: {
                    optionCount: quantityFree.options.length,
                    ruleId: quantityFreeRegularTypeTwo?.ruleId || "",
                    sameRuleAsQuantityMarked: quantityFreeRegularTypeTwo?.ruleId === unsegmentedRegularTypeTwo?.ruleId,
                    evidenceCount: findEvidence(quantityFree).length,
                    canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(quantityFree),
                },
                attestedCausative: [
                    attestedCausative.options.find(option => option.lexicalEvidenceMatches?.length)?.targetStem || "",
                    findEvidence(attestedCausative)[0]?.sourceRecordId || "",
                ],
                unmappedDoesNotGenerate: {
                    noLicenseRecordPresent: corpusAyi[0]?.sourceRecordId || "",
                    generatedTargets: unmappedCausative.options.map(option => option.targetStem),
                    noLicenseEvidenceAttached: findEvidence(unmappedCausative).filter(record => record.sourceRecordId === corpusAyi[0]?.sourceRecordId).length,
                    otherLicensedEvidence: findEvidence(unmappedCausative).map(record => record.sourceRecordId),
                },
                unrelatedEvidenceCount: findEvidence(unrelated).length,
                crossSourceEvidenceCount: crossSource.length,
                hostileEvidenceCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(forged),
            };
        })(),
        {
            corpus: {
                total: 839,
                confirmed: 838,
                applicative: 452,
                causative: 89,
                nonactive: 297,
                noLicenseCausative: 1,
                allCausative: 90,
                frozen: true,
                rawKarttunenOnly: true,
            },
            segmented: {
                target: "cā-hui-liā",
                canonical: true,
                recordId: "karttunen-all:000041:a1",
                matchBasis: "exact-classical-boundaryless",
                citation: ["CĀHU(A)", "CĀHUILIĀ"],
                rows: [41, 186],
                provenance: ["Karttunen", "raw Karttunen column"],
                direction: ["source-after-marker-to-derivative-before-marker", "TARGET marker SOURCE; inventory stores SOURCE -> TARGET"],
                authority: [false, false, false, false, false],
            },
            sameRecordWithoutBoundary: "karttunen-all:000041:a1",
            quantityFree: {
                optionCount: 2,
                ruleId: "cn-l26-267-consonant-a-i-lia",
                sameRuleAsQuantityMarked: true,
                evidenceCount: 0,
                canonical: true,
            },
            attestedCausative: ["mayāna-l-tiā", "karttunen-all:000973:c1"],
            unmappedDoesNotGenerate: {
                noLicenseRecordPresent: "karttunen-all:003597:c1",
                generatedTargets: ["āy-a", "āyi-ā", "āyī-tiā"],
                noLicenseEvidenceAttached: 0,
                otherLicensedEvidence: ["karttunen-all:003596:c1"],
            },
            unrelatedEvidenceCount: 0,
            crossSourceEvidenceCount: 0,
            hostileEvidenceCanonical: false,
        }
    );

    return s;
}

module.exports = { run };
