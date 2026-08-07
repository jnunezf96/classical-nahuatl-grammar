"use strict";

const { createSuite } = require("./runner");

const LESSON20_PREREQUISITE_OWNER =
    "classical-nahuatl-nonactive-formation";
const DERIVATION_INTERNAL_PREREQUISITE_OWNER =
    "classical-nahuatl-type-two-causative-internal-nonactive-bridge";

function buildSource(ctx, stem, verbClass, sourceValence) {
    const objectKind = sourceValence === "intransitive"
        ? "none"
        : sourceValence === "projective-human"
            ? "nonspecific-human"
            : sourceValence === "projective-nonhuman"
                ? "nonspecific-nonhuman"
                : "specific-projective";
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind,
        objectPerson: objectKind === "specific-projective" ? "3sg" : "",
    });
}

const SECTION_254_CASES = Object.freeze([
    Object.freeze({
        sectionCase: "main-A",
        stem: "itt-a",
        verbClass: "A",
        sourceValence: "projective-nonhuman",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "itt-a-lō",
                targetStem: "itt-a-l-tiā",
                prerequisiteOwner: LESSON20_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "main-chihua",
        stem: "chīhua",
        verbClass: "A",
        sourceValence: "specific-projective",
        expectedPairs: Object.freeze([
            Object.freeze({
                // The lexical Source retains Andrews's long ī, while the
                // Lesson 20 present nonactive allomorph independently realizes
                // short i (§20.8).  The causative target returns to the
                // canonical lexical quantity; neither projection authorizes
                // the other.
                nonactiveStem: "chihua-lō",
                constructionNonactiveStem: "chīhua-lō",
                targetStem: "chīhua-l-tiā",
                prerequisiteOwner: LESSON20_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "main-quemi",
        stem: "quēmi",
        verbClass: "B",
        sourceValence: "specific-projective",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "quēmi-lō",
                targetStem: "quēmi-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "main-C",
        stem: "chol-o-ā",
        verbClass: "C",
        sourceValence: "intransitive",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "chol-o-lō",
                targetStem: "chol-o-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "main-C-i-a",
        stem: "tlā-ti-ā",
        verbClass: "C",
        sourceValence: "specific-projective",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "tlā-ti-lō",
                targetStem: "tlā-ti-l-tiā",
                prerequisiteOwner: LESSON20_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "main-D",
        stem: "cuā",
        verbClass: "D",
        sourceValence: "specific-projective",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "cua-lō",
                targetStem: "cua-l-tiā",
                prerequisiteOwner: LESSON20_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.1-ka",
        stem: "chōca",
        verbClass: "A",
        sourceValence: "intransitive",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "chōca-lō",
                targetStem: "chōca-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
            Object.freeze({
                nonactiveStem: "chōqui-lō",
                targetStem: "chōqui-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.1-maca",
        stem: "maca",
        verbClass: "A",
        sourceValence: "specific-projective",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "maqui-lō",
                targetStem: "maqui-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.1-ki",
        stem: "caqui",
        verbClass: "B",
        sourceValence: "projective-nonhuman",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "caqui-lō",
                targetStem: "caqui-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.2",
        stem: "cual-ā-ni",
        verbClass: "B",
        sourceValence: "intransitive",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "cual-ā-ni-lō",
                targetStem: "cual-ā-ni-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
            Object.freeze({
                nonactiveStem: "cual-ā-na-lō",
                targetStem: "cual-ā-na-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.3",
        stem: "tzacu-a",
        verbClass: "B",
        sourceValence: "projective-nonhuman",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "tzacu-i-lō",
                targetStem: "tzacu-i-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.4-si",
        stem: "īmacaci",
        verbClass: "B",
        sourceValence: "projective-human",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "īmacaxi-lō",
                targetStem: "īmacaxi-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.4-sa",
        stem: "ihza",
        verbClass: "A",
        sourceValence: "intransitive",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "ihxi-lō",
                targetStem: "īhxi-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.5",
        stem: "ix-tlā-hu-a",
        verbClass: "B",
        sourceValence: "specific-projective",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "ix-tlā-hu-a-lō",
                targetStem: "ix-tlā-hu-a-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
            Object.freeze({
                nonactiveStem: "ix-tlā-hu-i-lō",
                targetStem: "ix-tlā-hu-i-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.6",
        stem: "mati",
        verbClass: "B",
        sourceValence: "projective-nonhuman",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "machi-lō",
                targetStem: "machi-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.7",
        stem: "itz-ti",
        verbClass: "A",
        sourceValence: "intransitive",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "itz-ti-lō",
                targetStem: "itz-ti-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.8-tlaoco",
        stem: "tlaōco-ya",
        verbClass: "A",
        sourceValence: "intransitive",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "tlaōco-lō",
                targetStem: "tlaōco-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
    Object.freeze({
        sectionCase: "25.4.8-ahui",
        stem: "āhui-ya",
        verbClass: "A",
        sourceValence: "intransitive",
        expectedPairs: Object.freeze([
            Object.freeze({
                nonactiveStem: "āhui-lō",
                targetStem: "āhui-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
            Object.freeze({
                nonactiveStem: "āhui-ya-lō",
                targetStem: "āhui-ya-l-tiā",
                prerequisiteOwner: DERIVATION_INTERNAL_PREREQUISITE_OWNER,
            }),
        ]),
    }),
]);

function getOptionPrerequisiteStem(option = null) {
    return option?.lesson20NonactiveStemRecord?.nonactiveStem
        || option?.typeTwoInternalBridgeFrame?.nonactiveStem
        || option?.typeTwoBridgeStem
        || "";
}

function getLoCausativeOptions(inventory = null) {
    return (inventory?.options || [])
        .filter((option) => (
            option.lesson20NonactiveStemRecord?.suffixFamily === "lō"
            || option.typeTwoInternalBridgeFrame?.suffixFamily === "lō"
            || option.typeTwoBridgeSuffixFamily === "lō"
            || /-l-tiā$/u.test(option.targetStem || "")
        ))
        .sort((left, right) => (
            `${getOptionPrerequisiteStem(left)}\u0000${left.targetStem}`
                .localeCompare(`${getOptionPrerequisiteStem(right)}\u0000${right.targetStem}`)
        ));
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_lo_source_category");

    SECTION_254_CASES.forEach(({
        sectionCase,
        stem,
        verbClass,
        sourceValence,
        expectedPairs,
    }) => {
        const source = buildSource(ctx, stem, verbClass, sourceValence);
        const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
            derivationType: "causative",
        });

        s.eq(
            `§${sectionCase} exposes exactly its licensed lō → l-tiā routes`,
            getLoCausativeOptions(inventory).map((option) => ({
                nonactiveStem: getOptionPrerequisiteStem(option),
                targetStem: option.targetStem,
            })),
            expectedPairs.map(({ nonactiveStem, targetStem }) => ({
                nonactiveStem,
                targetStem,
            })).sort((left, right) => (
                `${left.nonactiveStem}\u0000${left.targetStem}`
                    .localeCompare(`${right.nonactiveStem}\u0000${right.targetStem}`)
            ))
        );

        const lesson20Inventory =
            ctx.getClassicalNahuatlNonactiveStemOptions(stem, {
                verbClass,
                sourceValence,
            });

        expectedPairs.forEach((expected) => {
            const option = getLoCausativeOptions(inventory).find((candidate) => (
                getOptionPrerequisiteStem(candidate) === expected.nonactiveStem
                && candidate.targetStem === expected.targetStem
            )) || null;
            const lesson20Record = option?.lesson20NonactiveStemRecord || null;
            const internalBridge =
                option?.typeTwoInternalBridgeFrame || null;
            const lesson20ChoicePresent =
                (lesson20Inventory?.options || []).some((candidate) => (
                    candidate.nonactiveStem === expected.nonactiveStem
                ));
            const lesson20RecordCanonical = Boolean(
                lesson20Record
                && ctx.isClassicalNahuatlNonactiveStemRecord(
                    lesson20Record,
                    stem
                )
            );
            const internalBridgeCanonicalShape = Boolean(
                internalBridge
                && internalBridge.kind
                    === "classical-nahuatl-type-two-causative-internal-nonactive-bridge-frame"
                && internalBridge.authorizationStatus === "authorized"
                && internalBridge.sourceStem === stem
                && internalBridge.suffixFamily === "lō"
                && internalBridge.nonactiveStem === expected.nonactiveStem
                && internalBridge.targetStem === expected.targetStem
                && internalBridge.userSelectable === false
                && internalBridge.internalPrerequisiteOnly === true
                && internalBridge.typedSourceAuthority === true
                && internalBridge.callerSuppliedAuthorityAccepted === false
                && internalBridge.lesson20OperationAuthority === false
                && internalBridge.curriculumOrderAuthority === false
                && internalBridge.lessonMetadataAuthority === false
                && internalBridge.formulaStringAuthority === false
                && internalBridge.surfaceStringAuthority === false
                && Object.isFrozen(internalBridge)
            );
            const prerequisiteOwner = lesson20RecordCanonical
                ? LESSON20_PREREQUISITE_OWNER
                : internalBridgeCanonicalShape
                    ? DERIVATION_INTERNAL_PREREQUISITE_OWNER
                    : "";
            const operation =
                ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
                    source,
                    {
                        derivationType: "causative",
                        optionId: option?.optionId
                            || `missing-${sectionCase}-${expected.targetStem}`,
                        targetSubject: "1sg",
                    }
                );
            const operationBridge =
                operation?.selectedOption?.typeTwoInternalBridgeFrame || null;

            s.eq(
                `§${sectionCase} ${expected.nonactiveStem} has one owner-issued prerequisite path`,
                {
                    prerequisiteStem: getOptionPrerequisiteStem(option),
                    targetStem: option?.targetStem || "",
                    prerequisiteOwner,
                    lesson20ChoicePresent,
                    lesson20RecordCanonical,
                    copiedLesson20RecordAccepted: lesson20Record
                        ? ctx.isClassicalNahuatlNonactiveStemRecord(
                            { ...lesson20Record },
                            stem
                        )
                        : false,
                    ownerIssuedPrerequisiteCanonical:
                        prerequisiteOwner
                            === LESSON20_PREREQUISITE_OWNER
                            ? lesson20RecordCanonical
                            : internalBridgeCanonicalShape,
                    internalBridgeClaimsLesson20Authority:
                        internalBridge?.lesson20OperationAuthority === true,
                    operationStatus: operation?.authorizationStatus || "",
                    operationCanonical:
                        ctx.isClassicalNahuatlVncDerivationOperationFrame(
                            operation
                        ),
                    operationTargetStem: operation?.targetStem || "",
                    operationPrerequisiteStem:
                        getOptionPrerequisiteStem(
                            operation?.selectedOption || null
                        ),
                    operationBridgeMatchesInventory:
                        operationBridge || internalBridge
                            ? Boolean(
                                operationBridge?.canonicalSignature
                                && internalBridge?.canonicalSignature
                                && operationBridge.canonicalSignature
                                    === internalBridge.canonicalSignature
                            )
                            : true,
                    copiedInventoryAccepted:
                        ctx.isClassicalNahuatlVncDerivationOptionInventory({
                            ...inventory,
                        }),
                    copiedOperationAccepted:
                        ctx.isClassicalNahuatlVncDerivationOperationFrame({
                            ...operation,
                        }),
                    targetConstructionOperation:
                        option?.targetConstruction?.operation || "",
                    targetConstructionNonactiveStem:
                        option?.targetConstruction?.nonactiveStem || "",
                    targetConstructionRemove:
                        option?.targetConstruction?.remove || "",
                    targetConstructionAdd:
                        option?.targetConstruction?.add || "",
                    storedBaseTarget: option?.baseTargetStem || "",
                    formulaArtifactAuthority:
                        option?.formulaArtifactAuthority === true,
                    surfaceArtifactAuthority:
                        option?.surfaceArtifactAuthority === true,
                    callerTargetAuthority:
                        option?.callerSuppliedTargetAllowed === true,
                },
                {
                    prerequisiteStem: expected.nonactiveStem,
                    targetStem: expected.targetStem,
                    prerequisiteOwner: expected.prerequisiteOwner,
                    lesson20ChoicePresent:
                        expected.prerequisiteOwner
                            === LESSON20_PREREQUISITE_OWNER,
                    lesson20RecordCanonical:
                        expected.prerequisiteOwner
                            === LESSON20_PREREQUISITE_OWNER,
                    copiedLesson20RecordAccepted: false,
                    ownerIssuedPrerequisiteCanonical: true,
                    internalBridgeClaimsLesson20Authority: false,
                    operationStatus: "authorized",
                    operationCanonical: true,
                    operationTargetStem: expected.targetStem,
                    operationPrerequisiteStem: expected.nonactiveStem,
                    operationBridgeMatchesInventory: true,
                    copiedInventoryAccepted: false,
                    copiedOperationAccepted: false,
                    targetConstructionOperation:
                        expected.prerequisiteOwner
                            === LESSON20_PREREQUISITE_OWNER
                            ? "replace-nonactive-right-edge"
                            : "replace-internal-nonactive-right-edge",
                    targetConstructionNonactiveStem:
                        expected.constructionNonactiveStem
                        || expected.nonactiveStem,
                    targetConstructionRemove: "ō",
                    targetConstructionAdd: "tiā",
                    storedBaseTarget: "",
                    formulaArtifactAuthority: false,
                    surfaceArtifactAuthority: false,
                    callerTargetAuthority: false,
                }
            );
        });
    });

    return s;
}

module.exports = { run };
