"use strict";

const { createSuite } = require("./runner");

const PRESSED_DOWN_LEXEME = "cn-vnc-pachihui-pressed-down";
const SATIATED_LEXEME = "cn-vnc-pachihui-satiated";

function buildSource(ctx, sourceLexemeId, selectionOverride = null) {
    const selection = selectionOverride
        || ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
            enteredStem: "pach-i-hui",
            basalUnit: "vnc",
            valence: "intransitive",
            sourceLexemeId,
        });
    return {
        selection,
        machinery: ctx.buildClassicalNahuatlVerbstemClassFrame(
            "pach-i-hui",
            {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                perfectiveClass: "B",
                valence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
                canonicalSourceSelectionFrame: selection,
            }
        ),
    };
}

function getCausativeInventory(ctx, sourceLexemeId, selectionOverride = null) {
    const source = buildSource(ctx, sourceLexemeId, selectionOverride);
    return {
        ...source,
        inventory: ctx.getClassicalNahuatlVncDerivationOptionInventory(
            source.machinery,
            { derivationType: "causative" }
        ),
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_pachihui_source_lexeme_authority");

    s.eq(
        "Canvas §§24.7 and 25.2.4 are represented as two read-only lexical Source identities, not a Grammar-owned semantic selector",
        (() => {
            const record = ctx
                .getClassicalNahuatlCanonicalSourceStemInventory("vnc")
                .find(candidate => (
                    candidate.stem === "pach-i-hui"
                    && candidate.valenceDisplay === "intransitive"
                ));
            const missing =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "pach-i-hui",
                    basalUnit: "vnc",
                    valence: "intransitive",
                });
            const pressed =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "pach-i-hui",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    sourceLexemeId: PRESSED_DOWN_LEXEME,
                });
            const satiated =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "pach-i-hui",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    sourceLexemeId: SATIATED_LEXEME,
                });
            const operationPoison =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "pach-i-hui",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    sourceLexemeId: SATIATED_LEXEME,
                    semanticSelection: "pressed-down-sense",
                });
            return {
                record: {
                    canonical:
                        ctx.isClassicalNahuatlCanonicalSourceStemRecord(record),
                    relation: record?.sourceLexemeRelation || "",
                    selectionRequired:
                        record?.sourceLexemeSelectionRequired === true,
                    ids: record?.sourceLexemeIds || [],
                    sections: record?.sourceLexemeSections || [],
                    readOnly: record?.sourceLexemeFactsReadOnly === true,
                    userSelectableOperation:
                        record?.userSelectableOperation === true,
                    translationAuthority:
                        record?.translationAuthority === true,
                },
                missing: [
                    missing.authorizationStatus,
                    missing.blockReason,
                ],
                pressed: {
                    canonical:
                        ctx.isClassicalNahuatlCanonicalSourceSelectionFrame(
                            pressed
                        ),
                    lexeme: pressed.sourceLexemeId,
                    sameRecord: pressed.canonicalRecord === record,
                },
                satiated: {
                    canonical:
                        ctx.isClassicalNahuatlCanonicalSourceSelectionFrame(
                            satiated
                        ),
                    lexeme: satiated.sourceLexemeId,
                    sameRecord: satiated.canonicalRecord === record,
                },
                hostile: {
                    copiedPressedAccepted:
                        ctx.isClassicalNahuatlCanonicalSourceSelectionFrame({
                            ...pressed,
                        }),
                    clonedSatiatedAccepted:
                        ctx.isClassicalNahuatlCanonicalSourceSelectionFrame(
                            structuredClone(satiated)
                        ),
                    poisonStatus: operationPoison.authorizationStatus,
                    poisonReason: operationPoison.blockReason,
                    poisonCanonical:
                        ctx.isClassicalNahuatlCanonicalSourceSelectionFrame(
                            operationPoison
                        ),
                },
            };
        })(),
        {
            record: {
                canonical: true,
                relation: "lexical-source-sense-distinction",
                selectionRequired: true,
                ids: [PRESSED_DOWN_LEXEME, SATIATED_LEXEME],
                sections: ["24.7", "25.2.4"],
                readOnly: true,
                userSelectableOperation: false,
                translationAuthority: false,
            },
            missing: [
                "blocked",
                "canonical-source-lexeme-selection-required",
            ],
            pressed: {
                canonical: true,
                lexeme: PRESSED_DOWN_LEXEME,
                sameRecord: true,
            },
            satiated: {
                canonical: true,
                lexeme: SATIATED_LEXEME,
                sameRecord: true,
            },
            hostile: {
                copiedPressedAccepted: false,
                clonedSatiatedAccepted: false,
                poisonStatus: "blocked",
                poisonReason:
                    "canonical-source-selection-accepts-source-constituents-only",
                poisonCanonical: false,
            },
        }
    );

    s.eq(
        "Each pach-i-hui Source lexeme exposes only its Canvas-licensed causative and copied or cross-sense authority cannot recreate the other route",
        (() => {
            const pressed = getCausativeInventory(
                ctx,
                PRESSED_DOWN_LEXEME
            );
            const satiated = getCausativeInventory(ctx, SATIATED_LEXEME);
            const missing = getCausativeInventory(ctx, "");
            const copiedSelection = {
                ...satiated.selection,
            };
            const copied = getCausativeInventory(
                ctx,
                SATIATED_LEXEME,
                copiedSelection
            );
            const pressedOption = pressed.inventory.options[0] || null;
            const satiatedOption = satiated.inventory.options[0] || null;
            const crossSenseOperation =
                ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
                    satiated.machinery,
                    {
                        derivationType: "causative",
                        optionId: pressedOption?.optionId || "",
                        targetSubject: "1sg",
                        causativeObjectKind: "specific-projective",
                    }
                );
            return {
                pressed: {
                    status: pressed.inventory.authorizationStatus,
                    canonical:
                        ctx.isClassicalNahuatlVncDerivationOptionInventory(
                            pressed.inventory
                        ),
                    targets: pressed.inventory.options.map(option =>
                        option.targetStem
                    ),
                    constructions: pressed.inventory.options.map(option =>
                        option.targetConstruction
                    ),
                },
                satiated: {
                    status: satiated.inventory.authorizationStatus,
                    canonical:
                        ctx.isClassicalNahuatlVncDerivationOptionInventory(
                            satiated.inventory
                        ),
                    targets: satiated.inventory.options.map(option =>
                        option.targetStem
                    ),
                    bridgeLexeme:
                        satiatedOption?.typeTwoInternalBridgeFrame
                            ?.sourceLexemeId || "",
                },
                missing: [
                    missing.inventory.authorizationStatus,
                    missing.inventory.blockReason,
                    missing.inventory.options.length,
                ],
                copied: [
                    copied.inventory.authorizationStatus,
                    copied.inventory.blockReason,
                    copied.inventory.options.length,
                ],
                crossSense: [
                    crossSenseOperation.authorizationStatus,
                    crossSenseOperation.blockReason,
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(
                        crossSenseOperation
                    ),
                ],
            };
        })(),
        {
            pressed: {
                status: "authorized",
                canonical: true,
                targets: ["pach-o-ā"],
                constructions: [{
                    operation: "replace-morpheme-sequence",
                    remove: "i-hui",
                    add: "o-ā",
                }],
            },
            satiated: {
                status: "authorized",
                canonical: true,
                targets: ["pach-i-huī-tiā"],
                bridgeLexeme: SATIATED_LEXEME,
            },
            missing: [
                "blocked",
                "classical-vnc-derivation-canonical-source-lexeme-required",
                0,
            ],
            copied: [
                "blocked",
                "classical-vnc-derivation-canonical-source-lexeme-required",
                0,
            ],
            crossSense: [
                "blocked",
                "classical-vnc-derivation-selected-option-was-not-generated",
                false,
            ],
        }
    );

    s.eq(
        "The canonical application generates each projection independently and preserves the Source lexeme through scalar and paradigm execution",
        (() => {
            const application =
                ctx.createClassicalNahuatlVncApplication(ctx);
            const baseRequest = {
                sourceStem: "pach-i-hui",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
                sourceSubject: "3sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const execute = sourceLexemeId => {
                const preview = application.evaluate({
                    ...baseRequest,
                    sourceLexemeId,
                });
                const option =
                    preview.controlFrame?.derivationOptionInventory
                        ?.options?.[0] || null;
                const request = {
                    ...baseRequest,
                    sourceLexemeId,
                    derivationOptionId: option?.optionId || "",
                };
                return {
                    preview,
                    option,
                    request,
                    scalar: application.evaluate(request),
                };
            };
            const pressed = execute(PRESSED_DOWN_LEXEME);
            const satiated = execute(SATIATED_LEXEME);
            const plan = application.prepareParadigm({
                ...satiated.request,
                outputScope: "paradigm",
            });
            const coordinate = application.inflectPredicateCoordinate(
                plan,
                {
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                }
            );
            const missing = application.evaluate(baseRequest);
            const poison = application.evaluate({
                ...baseRequest,
                sourceLexemeId: SATIATED_LEXEME,
                semanticSelection: "pressed-down-sense",
            });
            return {
                pressed: {
                    target: pressed.option?.targetStem || "",
                    status: pressed.scalar.authorizationStatus,
                    formula:
                        pressed.scalar.resultFrame?.formulaRealization || "",
                    written:
                        pressed.scalar.resultFrame?.surfaceRealization || "",
                    sourceLexemeId:
                        pressed.scalar.normalizedRequest?.sourceLexemeId || "",
                },
                satiated: {
                    target: satiated.option?.targetStem || "",
                    status: satiated.scalar.authorizationStatus,
                    formula:
                        satiated.scalar.resultFrame?.formulaRealization || "",
                    written:
                        satiated.scalar.resultFrame?.surfaceRealization || "",
                    sourceLexemeId:
                        satiated.scalar.normalizedRequest?.sourceLexemeId || "",
                },
                paradigm: {
                    planStatus: plan.authorizationStatus,
                    planLexeme: plan.sourceLexemeId,
                    coordinateStatus: coordinate.authorizationStatus,
                    coordinateLexeme:
                        coordinate.scalarApplicationFrame?.normalizedRequest
                            ?.sourceLexemeId || "",
                    scalarEquivalent: coordinate.scalarEquivalent === true,
                    formula: coordinate.formulaRealization,
                    written: coordinate.surfaceRealization,
                },
                missing: [
                    missing.authorizationStatus,
                    missing.blockReason,
                    missing.resultFrame?.formulaRealization || "",
                    missing.resultFrame?.surfaceRealization || "",
                ],
                poison: [
                    poison.authorizationStatus,
                    poison.blockReason,
                    poison.rejectedAuthorityFields || [],
                    poison.resultFrame?.formulaRealization || "",
                    poison.resultFrame?.surfaceRealization || "",
                ],
            };
        })(),
        {
            pressed: {
                target: "pach-o-ā",
                status: "authorized",
                formula: "#ni-0+c-0(pach-o-a)0+0-0#",
                written: "nicpachoa",
                sourceLexemeId: PRESSED_DOWN_LEXEME,
            },
            satiated: {
                target: "pach-i-huī-tiā",
                status: "authorized",
                formula: "#ni-0+c-0(pach-i-huī-tia)0+0-0#",
                written: "nicpachihuītia",
                sourceLexemeId: SATIATED_LEXEME,
            },
            paradigm: {
                planStatus: "authorized",
                planLexeme: SATIATED_LEXEME,
                coordinateStatus: "authorized",
                coordinateLexeme: SATIATED_LEXEME,
                scalarEquivalent: true,
                formula: "#ni-0+c-0(pach-i-huī-tia)0+0-0#",
                written: "nicpachihuītia",
            },
            missing: [
                "blocked",
                "classical-vnc-derivation-authorized-source-required",
                "",
                "",
            ],
            poison: [
                "blocked",
                "classical-vnc-application-caller-authority-rejected",
                ["semanticSelection"],
                "",
                "",
            ],
        }
    );

    return s;
}

module.exports = { run };
