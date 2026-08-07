"use strict";

const { createSuite } = require("./runner");

function hasForbiddenCanvasAuthorityCarrier(value) {
    if (!value || typeof value !== "object") {
        return false;
    }
    const forbiddenKeys = new Set([
        "canvasDerivationChoiceFrame",
        "canvasDerivationChoiceFrames",
        "selectedCanvasDerivationChoiceFrame",
        "selectedChoiceId",
        "selectedChoiceSignature",
        "choiceId",
        "catalogId",
        "printedSource",
        "printedResult",
    ]);
    return Reflect.ownKeys(value).some((key) => forbiddenKeys.has(String(key)));
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_derivation_canvas_authority_retirement");

    s.eq(
        "Stored Canvas derivation choices are not a public grammar capability",
        [
            typeof ctx.isClassicalNahuatlCanvasDerivationChoiceFrame,
            ctx.CLASSICAL_NAHUATL_CANVAS_DERIVATION_CHOICE_KIND,
        ],
        ["undefined", undefined]
    );

    s.eq(
        "Typed Source plus the semantic derivation owner selects the licensed temō route",
        (() => {
            const source = ctx.buildClassicalNahuatlVerbstemClassFrame("temō", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
            });
            const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "causative",
                choiceId: "FORGED-CANVAS-CHOICE",
                catalogId: "FORGED-CANVAS-CATALOG",
                printedSource: "(FORGED-SOURCE)",
                printedResult: "tla-(FORGED-RESULT)",
            });
            const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                targetSubject: "1sg",
                choiceId: "FORGED-CANVAS-CHOICE",
                targetStem: "FORGED-TARGET",
            });
            const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
                source,
                operation,
                {
                    mood: "indicative",
                    tense: "present",
                    targetSubject: "1sg",
                    printedResult: "FORGED-RESULT",
                }
            );
            return {
                inventoryStatus: inventory.authorizationStatus,
                inventoryCanonical:
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                optionCount: inventory.optionCount,
                optionId: inventory.options[0]?.optionId || "",
                semanticRuleId: inventory.options[0]?.ruleId || "",
                canonicalNonactiveRecord:
                    ctx.isClassicalNahuatlNonactiveStemRecord(
                        inventory.options[0]?.lesson20NonactiveStemRecord,
                        "temō"
                    ),
                operationStatus: operation.authorizationStatus,
                operationCanonical:
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                sourceIdentityPreserved: operation.sourceMachineryFrame === source,
                target: operation.targetStem,
                machineryStatus: machinery.authorizationStatus,
                machineryCanonical:
                    ctx.isClassicalNahuatlDerivedVncMachineryFrame(machinery),
                canvasCarrierPresent:
                    hasForbiddenCanvasAuthorityCarrier(inventory)
                    || inventory.options.some(hasForbiddenCanvasAuthorityCarrier)
                    || hasForbiddenCanvasAuthorityCarrier(operation),
                poisonPresent: JSON.stringify({
                    inventory,
                    operation,
                    target: machinery.targetStem,
                    formula: machinery.formulaRealization,
                }).includes("FORGED"),
            };
        })(),
        {
            inventoryStatus: "authorized",
            inventoryCanonical: true,
            optionCount: 1,
            optionId: "causative:type-two:final-o:direct:hua:temō-hua",
            semanticRuleId: "cn-l25-256-final-o-direct-huia",
            canonicalNonactiveRecord: true,
            operationStatus: "authorized",
            operationCanonical: true,
            sourceIdentityPreserved: true,
            target: "temō-huiā",
            machineryStatus: "authorized",
            machineryCanonical: true,
            canvasCarrierPresent: false,
            poisonPresent: false,
        }
    );

    s.eq(
        "A stored Canvas-shaped answer cannot create an ungenerated operation",
        (() => {
            const source = ctx.buildClassicalNahuatlVerbstemClassFrame("temō", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
            });
            const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                optionId: "causative:type-two:canvas:stored-answer",
                targetSubject: "1sg",
                selectedOption: {
                    choiceId: "causative:type-two:canvas:stored-answer",
                    sourceStem: "temō",
                    targetStem: "temō-huiā",
                    targetClass: "C",
                    printedResult: "tla-(temō-huiā)",
                    authorizationStatus: "authorized",
                },
            });
            return [
                operation.authorizationStatus,
                operation.blockReason,
                ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
            ];
        })(),
        [
            "blocked",
            "classical-vnc-derivation-selected-option-was-not-generated",
            false,
        ]
    );

    s.eq(
        "Owner-issued typed lexical bridges derive exact tēmi and cochi routes while copied or answer-shaped authority fails closed",
        (() => {
            const makeSource = (stem) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                perfectiveClass: "B",
                valence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
            });
            const specifications = [{
                stem: "tēmi",
                route: "type-two-tia-from-temi-hua-internal-base",
                ruleId: "cn-l25-258-temi-temi-tia",
            }, {
                stem: "cochi",
                route: "type-two-tia-from-cochi-hua-base",
                ruleId: "cn-l25-252-cochi-cochi-tia",
            }];
            const rows = specifications.map((specification) => {
                const source = makeSource(specification.stem);
                const inventory =
                    ctx.getClassicalNahuatlVncDerivationOptionInventory(
                        source,
                        {
                            derivationType: "causative",
                            choiceId: "FORGED-CANVAS-CHOICE",
                            catalogId: "FORGED-CANVAS-CATALOG",
                            printedResult: "FORGED-STORED-ANSWER",
                        }
                    );
                const typeTwoOptions = (inventory.options || []).filter(
                    (option) => option.derivationSubtype === "type-two"
                );
                const option = typeTwoOptions.find(
                    (candidate) => candidate.derivationRoute
                        === specification.route
                ) || null;
                const operation =
                    ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
                        source,
                        {
                            derivationType: "causative",
                            optionId: option?.optionId || "missing-option",
                            targetSubject: "1sg",
                            causativeObjectKind: "specific-projective",
                            targetStem: "FORGED-TARGET",
                            formulaTargetStem: "FORGED-FORMULA",
                            printedResult: "FORGED-STORED-ANSWER",
                        }
                    );
                const machinery =
                    ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
                        source,
                        operation,
                        {
                            mood: "indicative",
                            tense: "present",
                            targetSubject: "1sg",
                        }
                    );
                const copiedInventory = { ...inventory };
                const inventoryWithCopiedOption = {
                    ...inventory,
                    options: inventory.options.map((candidate) => (
                        candidate === option ? { ...candidate } : candidate
                    )),
                };
                const copiedSourceInventory =
                    ctx.getClassicalNahuatlVncDerivationOptionInventory(
                        { ...source },
                        { derivationType: "causative" }
                    );
                const forgedOperation =
                    ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
                        source,
                        {
                            derivationType: "causative",
                            optionId: `forged:${specification.ruleId}`,
                            targetSubject: "1sg",
                            causativeObjectKind: "specific-projective",
                            targetStem: option?.targetStem || "FORGED-TARGET",
                            formulaTargetStem:
                                option?.formulaTargetStem || "FORGED-FORMULA",
                            choiceId: "FORGED-CANVAS-CHOICE",
                            catalogId: "FORGED-CANVAS-CATALOG",
                            printedResult:
                                option?.targetStem || "FORGED-STORED-ANSWER",
                            selectedOption: option ? { ...option } : null,
                        }
                    );
                return {
                    source,
                    option,
                    exact: {
                        inventoryCanonical:
                            ctx.isClassicalNahuatlVncDerivationOptionInventory(
                                inventory
                            ),
                        typeTwoCount: typeTwoOptions.length,
                        targetStem: option?.targetStem || "",
                        formulaTargetStem: option?.formulaTargetStem || "",
                        bridgeStem: option?.typeTwoBridgeStem || "",
                        bridgeSuffixFamily:
                            option?.typeTwoBridgeSuffixFamily || "",
                        route: option?.derivationRoute || "",
                        ruleId: option?.ruleId || "",
                        prerequisitePolicy:
                            option?.typeTwoInternalBridgeFrame
                                ?.lesson20PrerequisitePolicy || "",
                        internalPrerequisiteOnly:
                            option?.typeTwoInternalBridgeFrame
                                ?.internalPrerequisiteOnly === true,
                        typedSourceAuthority:
                            option?.typeTwoInternalBridgeFrame
                                ?.typedSourceAuthority === true,
                        nonAuthorities: [
                            option?.typeTwoInternalBridgeFrame
                                ?.callerSuppliedAuthorityAccepted,
                            option?.typeTwoInternalBridgeFrame
                                ?.lesson20OperationAuthority,
                            option?.typeTwoInternalBridgeFrame
                                ?.lessonMetadataAuthority,
                            option?.typeTwoInternalBridgeFrame
                                ?.formulaStringAuthority,
                            option?.typeTwoInternalBridgeFrame
                                ?.surfaceStringAuthority,
                        ],
                        operationStatus: operation.authorizationStatus,
                        operationCanonical:
                            ctx.isClassicalNahuatlVncDerivationOperationFrame(
                                operation
                            ),
                        operationTarget: operation.targetStem || "",
                        operationFormulaTarget:
                            operation.formulaTargetStem || "",
                        machineryStatus: machinery.authorizationStatus,
                        machineryCanonical:
                            ctx.isClassicalNahuatlDerivedVncMachineryFrame(
                                machinery
                            ),
                        machineryTarget: machinery.targetStem || "",
                        formula: machinery.formulaRealization || "",
                        callerAnswerPoisonPresent: JSON.stringify({
                            inventory,
                            operation,
                            machineryTarget: machinery.targetStem,
                            machineryFormula: machinery.formulaRealization,
                        }).includes("FORGED"),
                        canvasCarrierPresent:
                            hasForbiddenCanvasAuthorityCarrier(inventory)
                            || inventory.options.some(
                                hasForbiddenCanvasAuthorityCarrier
                            )
                            || hasForbiddenCanvasAuthorityCarrier(operation),
                    },
                    hostile: {
                        copiedInventoryCanonical:
                            ctx.isClassicalNahuatlVncDerivationOptionInventory(
                                copiedInventory
                            ),
                        copiedOptionInventoryCanonical:
                            ctx.isClassicalNahuatlVncDerivationOptionInventory(
                                inventoryWithCopiedOption
                            ),
                        copiedSourceInventoryStatus:
                            copiedSourceInventory.authorizationStatus,
                        copiedSourceInventoryReason:
                            copiedSourceInventory.blockReason,
                        copiedOperationCanonical:
                            ctx.isClassicalNahuatlVncDerivationOperationFrame({
                                ...operation,
                            }),
                        copiedResultCanonical:
                            ctx.isClassicalNahuatlDerivedVncMachineryFrame({
                                ...machinery,
                            }),
                        forgedOperationStatus:
                            forgedOperation.authorizationStatus,
                        forgedOperationReason: forgedOperation.blockReason,
                        forgedOperationCanonical:
                            ctx.isClassicalNahuatlVncDerivationOperationFrame(
                                forgedOperation
                            ),
                    },
                };
            });
            const crossSourceOperation =
                ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
                    rows[0].source,
                    {
                        derivationType: "causative",
                        optionId: rows[1].option?.optionId
                            || "missing-cross-source-option",
                        targetSubject: "1sg",
                        causativeObjectKind: "specific-projective",
                    }
                );
            return {
                rows: rows.map(({ exact, hostile }) => ({ exact, hostile })),
                crossSourceOperation: {
                    status: crossSourceOperation.authorizationStatus,
                    reason: crossSourceOperation.blockReason,
                    canonical:
                        ctx.isClassicalNahuatlVncDerivationOperationFrame(
                            crossSourceOperation
                        ),
                },
            };
        })(),
        {
            rows: [{
                exact: {
                    inventoryCanonical: true,
                    typeTwoCount: 1,
                    targetStem: "tēmī-tiā",
                    formulaTargetStem: "tēmī-tiā",
                    bridgeStem: "tēmī-hua",
                    bridgeSuffixFamily: "hua",
                    route: "type-two-tia-from-temi-hua-internal-base",
                    ruleId: "cn-l25-258-temi-temi-tia",
                    prerequisitePolicy: "internal-only",
                    internalPrerequisiteOnly: true,
                    typedSourceAuthority: true,
                    nonAuthorities: [false, false, false, false, false],
                    operationStatus: "authorized",
                    operationCanonical: true,
                    operationTarget: "tēmī-tiā",
                    operationFormulaTarget: "tēmī-tiā",
                    machineryStatus: "authorized",
                    machineryCanonical: true,
                    machineryTarget: "tēmī-tiā",
                    formula: "#ni-0+c-0(tēmī-tia)0+0-0#",
                    callerAnswerPoisonPresent: false,
                    canvasCarrierPresent: false,
                },
                hostile: {
                    copiedInventoryCanonical: false,
                    copiedOptionInventoryCanonical: false,
                    copiedSourceInventoryStatus: "blocked",
                    copiedSourceInventoryReason:
                        "classical-vnc-derivation-base-source-not-canonical",
                    copiedOperationCanonical: false,
                    copiedResultCanonical: false,
                    forgedOperationStatus: "blocked",
                    forgedOperationReason:
                        "classical-vnc-derivation-selected-option-was-not-generated",
                    forgedOperationCanonical: false,
                },
            }, {
                exact: {
                    inventoryCanonical: true,
                    typeTwoCount: 1,
                    targetStem: "cochi-tiā",
                    formulaTargetStem: "cochi-tiā",
                    bridgeStem: "cochi-hua",
                    bridgeSuffixFamily: "hua",
                    route: "type-two-tia-from-cochi-hua-base",
                    ruleId: "cn-l25-252-cochi-cochi-tia",
                    prerequisitePolicy: "independent-lesson20",
                    internalPrerequisiteOnly: true,
                    typedSourceAuthority: true,
                    nonAuthorities: [false, false, false, false, false],
                    operationStatus: "authorized",
                    operationCanonical: true,
                    operationTarget: "cochi-tiā",
                    operationFormulaTarget: "cochi-tiā",
                    machineryStatus: "authorized",
                    machineryCanonical: true,
                    machineryTarget: "cochi-tiā",
                    formula: "#ni-0+c-0(cochi-tia)0+0-0#",
                    callerAnswerPoisonPresent: false,
                    canvasCarrierPresent: false,
                },
                hostile: {
                    copiedInventoryCanonical: false,
                    copiedOptionInventoryCanonical: false,
                    copiedSourceInventoryStatus: "blocked",
                    copiedSourceInventoryReason:
                        "classical-vnc-derivation-base-source-not-canonical",
                    copiedOperationCanonical: false,
                    copiedResultCanonical: false,
                    forgedOperationStatus: "blocked",
                    forgedOperationReason:
                        "classical-vnc-derivation-selected-option-was-not-generated",
                    forgedOperationCanonical: false,
                },
            }],
            crossSourceOperation: {
                status: "blocked",
                reason:
                    "classical-vnc-derivation-selected-option-was-not-generated",
                canonical: false,
            },
        }
    );

    s.eq(
        "Copied Source, inventory, option, operation, and Result envelopes cannot cross owner boundaries",
        (() => {
            const source =
                ctx.buildClassicalNahuatlVerbstemClassFrame("mahui", {
                    subject: "3sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "B",
                    perfectiveClass: "B",
                    valence: "intransitive",
                    transitivity: "intransitive",
                    objectKind: "none",
                });
            const inventory =
                ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "causative",
                });
            const option = inventory.options.find(
                candidate => candidate.targetStem === "mauh-tiā"
            );
            const operation =
                ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
                    source,
                    {
                        derivationType: "causative",
                        optionId: option?.optionId || "missing-option",
                        targetSubject: "1sg",
                        causativeObjectKind: "specific-projective",
                    }
                );
            const machinery =
                ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
                    source,
                    operation,
                    {
                        mood: "indicative",
                        tense: "present",
                        targetSubject: "1sg",
                    }
                );
            const sourceSpread = { ...source };
            const sourceJson = JSON.parse(JSON.stringify(source));
            const sourceStructured = structuredClone(source);
            const inventorySpread = { ...inventory };
            const inventoryJson = JSON.parse(JSON.stringify(inventory));
            const inventoryWithCopiedOption = {
                ...inventory,
                options: inventory.options.map(candidate =>
                    candidate === option ? { ...candidate } : candidate
                ),
            };
            const operationSpread = { ...operation };
            const operationWithCopiedOption = {
                ...operation,
                selectedOption: { ...operation.selectedOption },
            };
            const machinerySpread = { ...machinery };
            return {
                originals: {
                    source:
                        ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(
                            source
                        ),
                    inventory:
                        ctx.isClassicalNahuatlVncDerivationOptionInventory(
                            inventory
                        ),
                    operation:
                        ctx.isClassicalNahuatlVncDerivationOperationFrame(
                            operation
                        ),
                    machinery:
                        ctx.isClassicalNahuatlDerivedVncMachineryFrame(
                            machinery
                        ),
                },
                copiedSources: [
                    sourceSpread,
                    sourceJson,
                    sourceStructured,
                ].map(candidate => ({
                    sourceCanonical:
                        ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(
                            candidate
                        ),
                    inventoryStatus:
                        ctx.getClassicalNahuatlVncDerivationOptionInventory(
                            candidate,
                            { derivationType: "causative" }
                        ).authorizationStatus,
                })),
                copiedInventory: [
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(
                        inventorySpread
                    ),
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(
                        inventoryJson
                    ),
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(
                        inventoryWithCopiedOption
                    ),
                ],
                copiedOperation: [
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(
                        operationSpread
                    ),
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(
                        operationWithCopiedOption
                    ),
                ],
                copiedResult:
                    ctx.isClassicalNahuatlDerivedVncMachineryFrame(
                        machinerySpread
                    ),
            };
        })(),
        {
            originals: {
                source: true,
                inventory: true,
                operation: true,
                machinery: true,
            },
            copiedSources: [
                { sourceCanonical: false, inventoryStatus: "blocked" },
                { sourceCanonical: false, inventoryStatus: "blocked" },
                { sourceCanonical: false, inventoryStatus: "blocked" },
            ],
            copiedInventory: [false, false, false],
            copiedOperation: [false, false],
            copiedResult: false,
        }
    );

    return s;
}

module.exports = { run };
