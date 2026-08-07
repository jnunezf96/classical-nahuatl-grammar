"use strict";

const { createSuite } = require("./runner");

const PARALLEL_FORMATION_CASES = Object.freeze([
    Object.freeze({
        stem: "huā-qui",
        verbClass: "B",
        relationId: "cn-l25-258-huaqui-parallel-causatives",
        meaningRelation: "same-meaning",
        typeOneSemanticRole: "causative-in-meaning",
        typeTwoSemanticRole: "causative-in-meaning",
        formations: Object.freeze([
            Object.freeze({
                subtype: "type-one",
                target: "huā-tz-a",
                targetClass: "B",
                formula: "#ni-0+c-0(huā-tz-a)0+0-0#",
                written: "nichuātza",
            }),
            Object.freeze({
                subtype: "type-two",
                target: "huā-qui-l-tiā",
                targetClass: "C",
                formula: "#ni-0+c-0(huā-qui-l-tia)0+0-0#",
                written: "nichuāquiltia",
            }),
        ]),
    }),
    Object.freeze({
        stem: "tēmi",
        verbClass: "B",
        relationId: "cn-l25-258-temi-parallel-causatives",
        meaningRelation: "different-meaning",
        typeOneSemanticRole: "placement-causative-in-meaning",
        typeTwoSemanticRole: "filling-causative-in-meaning",
        formations: Object.freeze([
            Object.freeze({
                subtype: "type-one",
                target: "tēm-a",
                targetClass: "B",
                formula: "#ni-0+c-0(tēm-a)0+0-0#",
                written: "nictēma",
            }),
            Object.freeze({
                subtype: "type-two",
                target: "tēmī-tiā",
                targetClass: "C",
                formula: "#ni-0+c-0(tēmī-tia)0+0-0#",
                written: "nictēmītia",
            }),
        ]),
    }),
    ...["A", "B"].map((verbClass) => Object.freeze({
        stem: "pīn-ā-hua",
        verbClass,
        relationId: "cn-l25-258-pinahua-parallel-formations",
        meaningRelation: "different-meaning",
        typeOneSemanticRole: "applicative-in-meaning",
        typeTwoSemanticRole: "causative-in-meaning",
        formations: Object.freeze([
            Object.freeze({
                subtype: "type-one",
                target: "pīn-ā-hu-a",
                targetClass: "B",
                formula: "#ni-0+c-0(pīn-ā-hu-a)0+0-0#",
                written: "nicpīnāhua",
            }),
            Object.freeze({
                subtype: "type-two",
                target: "pīn-ā-uh-tiā",
                targetClass: "C",
                formula: "#ni-0+c-0(pīn-ā-uh-tia)0+0-0#",
                written: "nicpīnāuhtia",
            }),
        ]),
    })),
]);

function buildSource(ctx, stem, verbClass) {
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: "intransitive",
        transitivity: "intransitive",
        objectKind: "none",
    });
}

function buildApplicationRequest(stem, verbClass) {
    return {
        sourceStem: stem,
        verbClass,
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    };
}

function selectApplicationFormation(application, request, target) {
    const preview = application.evaluate({
        ...request,
        derivationOptionId: "",
    });
    const option = (
        preview.controlFrame?.derivationOptionInventory?.options || []
    ).find(candidate => candidate.targetStem === target) || null;
    const selectedRequest = {
        ...request,
        derivationOptionId: option?.optionId || `missing:${target}`,
    };
    return {
        preview,
        option,
        selectedRequest,
        scalar: application.evaluate(selectedRequest),
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_8_parallel_formations");
    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const rows = PARALLEL_FORMATION_CASES.flatMap((fixture) => {
        const source = buildSource(ctx, fixture.stem, fixture.verbClass);
        const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
            source,
            { derivationType: "causative" }
        );
        return fixture.formations.map((formation) => {
            const option = inventory.options.find(candidate => (
                candidate.targetStem === formation.target
                && candidate.derivationSubtype === formation.subtype
            )) || null;
            const operation =
                ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
                    source,
                    {
                        derivationType: "causative",
                        optionId: option?.optionId || "",
                        targetSubject: "1sg",
                        causativeObjectKind: "specific-projective",
                    }
                );
            const result = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
                source,
                operation,
                {
                    targetSubject: "1sg",
                    mood: "indicative",
                    tense: "present",
                }
            );
            const finite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(
                result
            );
            const selection = selectApplicationFormation(
                application,
                buildApplicationRequest(fixture.stem, fixture.verbClass),
                formation.target
            );
            return {
                fixture,
                formation,
                source,
                inventory,
                option,
                operation,
                result,
                finite,
                selection,
            };
        });
    });

    s.eq(
        "Every §25.8 Source/class crosses both licensed causative operations through one canonical scalar path",
        rows.map((row) => {
            const relation = row.option?.parallelFormationLexicalRelation;
            return {
                stem: row.fixture.stem,
                verbClass: row.fixture.verbClass,
                subtype: row.formation.subtype,
                sourceCanonical:
                    ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(
                        row.source
                    ),
                inventoryCanonical:
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(
                        row.inventory
                    ),
                target: row.option?.targetStem || "",
                targetClass: row.option?.targetClass || "",
                operationCanonical:
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(
                        row.operation
                    ),
                resultCanonical:
                    ctx.isClassicalNahuatlDerivedVncMachineryFrame(row.result),
                finiteCanonical:
                    ctx.isClassicalNahuatlVncFiniteSurfaceFrame(row.finite),
                formula: row.finite.formulaRealization,
                written: row.finite.wordRealization,
                formulaIndependent:
                    row.finite.formulaDerivedFromWrittenProjection === false,
                writtenIndependent:
                    row.finite.writtenDerivedFromFormulaProjection === false,
                applicationStatus: row.selection.scalar.authorizationStatus,
                applicationFormula:
                    row.selection.scalar.resultFrame?.formulaRealization || "",
                applicationWritten:
                    row.selection.scalar.resultFrame?.surfaceRealization || "",
                relation: {
                    relationId: relation?.relationId || "",
                    meaningRelation: relation?.meaningRelation || "",
                    typeOneSemanticRole:
                        relation?.typeOneSemanticRole || "",
                    typeTwoSemanticRole:
                        relation?.typeTwoSemanticRole || "",
                    lexicalFactsReadOnly:
                        relation?.lexicalFactsReadOnly === true,
                    userSelectable: relation?.userSelectable === true,
                    operationSelectionAuthority:
                        relation?.operationSelectionAuthority === true,
                    translationAuthority:
                        relation?.translationAuthority === true,
                    formulaStringAuthority:
                        relation?.formulaStringAuthority === true,
                    surfaceStringAuthority:
                        relation?.surfaceStringAuthority === true,
                    lessonMetadataAuthority:
                        relation?.lessonMetadataAuthority === true,
                },
                semanticSelectionAbsent:
                    !Object.prototype.hasOwnProperty.call(
                        row.option || {},
                        "semanticSelection"
                    ),
                retiredShortRootTargetsAbsent:
                    !row.inventory.options.some(option => (
                        ["pin-ā-hu-a", "pin-ā-uh-tiā"].includes(
                            option.targetStem
                        )
                    )),
                retiredQuantityAlternationAbsent:
                    row.fixture.stem !== "pīn-ā-hua"
                    || (
                        row.option?.targetConstruction?.internalChange == null
                        && row.option?.targetConstruction?.operation
                            !== "replace-morpheme-with-quantity-alternation"
                    ),
            };
        }),
        rows.map((row) => ({
            stem: row.fixture.stem,
            verbClass: row.fixture.verbClass,
            subtype: row.formation.subtype,
            sourceCanonical: true,
            inventoryCanonical: true,
            target: row.formation.target,
            targetClass: row.formation.targetClass,
            operationCanonical: true,
            resultCanonical: true,
            finiteCanonical: true,
            formula: row.formation.formula,
            written: row.formation.written,
            formulaIndependent: true,
            writtenIndependent: true,
            applicationStatus: "authorized",
            applicationFormula: row.formation.formula,
            applicationWritten: row.formation.written,
            relation: {
                relationId: row.fixture.relationId,
                meaningRelation: row.fixture.meaningRelation,
                typeOneSemanticRole: row.fixture.typeOneSemanticRole,
                typeTwoSemanticRole: row.fixture.typeTwoSemanticRole,
                lexicalFactsReadOnly: true,
                userSelectable: false,
                operationSelectionAuthority: false,
                translationAuthority: false,
                formulaStringAuthority: false,
                surfaceStringAuthority: false,
                lessonMetadataAuthority: false,
            },
            semanticSelectionAbsent: true,
            retiredShortRootTargetsAbsent: true,
            retiredQuantityAlternationAbsent: true,
        }))
    );

    s.eq(
        "The §25.8 lexical relation is read-only shared information, while copied, forged, and semantic-selection authority fails closed",
        PARALLEL_FORMATION_CASES.map((fixture) => {
            const sourceRows = rows.filter(row => (
                row.fixture === fixture
            ));
            const [typeOne, typeTwo] = sourceRows;
            const copiedInventory = {
                ...typeOne.inventory,
            };
            const forgedRelation = Object.freeze({
                ...typeOne.option.parallelFormationLexicalRelation,
                meaningRelation: "caller-forged-meaning",
                operationSelectionAuthority: true,
            });
            const forgedOption = Object.freeze({
                ...typeOne.option,
                parallelFormationLexicalRelation: forgedRelation,
            });
            const forgedInventory = Object.freeze({
                ...typeOne.inventory,
                options: Object.freeze(
                    typeOne.inventory.options.map(option => (
                        option === typeOne.option ? forgedOption : option
                    ))
                ),
            });
            const copiedOperation = {
                ...typeOne.operation,
            };
            const forgedOperation = {
                ...typeOne.operation,
                selectedOption: forgedOption,
                targetStem: typeTwo.option.targetStem,
            };
            const hostileSemanticSelection =
                application.evaluate({
                    ...typeOne.selection.selectedRequest,
                    semanticSelection: "caller-claims-same-meaning",
                });
            const exactNegativeClass =
                fixture.stem === "pīn-ā-hua" ? "C" : "A";
            const exactNegativeSource = buildSource(
                ctx,
                fixture.stem,
                exactNegativeClass
            );
            const exactNegativeInventory =
                ctx.getClassicalNahuatlVncDerivationOptionInventory(
                    exactNegativeSource,
                    { derivationType: "causative" }
                );
            const exactNegativeOperation =
                ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
                    exactNegativeSource,
                    {
                        derivationType: "causative",
                        optionId: typeOne.option.optionId,
                        targetSubject: "1sg",
                        causativeObjectKind: "specific-projective",
                    }
                );
            return {
                stem: fixture.stem,
                verbClass: fixture.verbClass,
                sameReadOnlyRelation:
                    typeOne.option.parallelFormationLexicalRelation
                    === typeTwo.option.parallelFormationLexicalRelation,
                copiedInventoryCanonical:
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(
                        copiedInventory
                    ),
                forgedInventoryCanonical:
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(
                        forgedInventory
                    ),
                copiedOperationCanonical:
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(
                        copiedOperation
                    ),
                forgedOperationCanonical:
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(
                        forgedOperation
                    ),
                semanticSelectionStatus:
                    hostileSemanticSelection.authorizationStatus,
                semanticSelectionBlock:
                    hostileSemanticSelection.blockReason,
                rejectedAuthorityFields:
                    hostileSemanticSelection.rejectedAuthorityFields,
                hostileFormula:
                    hostileSemanticSelection.resultFrame
                        ?.formulaRealization || "",
                hostileWritten:
                    hostileSemanticSelection.resultFrame
                        ?.surfaceRealization || "",
                exactNegativeClass,
                exactNegativeTargets: (
                    exactNegativeInventory.options || []
                ).filter(option => fixture.formations.some(formation => (
                    formation.target === option.targetStem
                ))).map(option => option.targetStem),
                exactNegativeOperationStatus:
                    exactNegativeOperation.authorizationStatus,
                exactNegativeOperationBlock:
                    exactNegativeOperation.blockReason,
            };
        }),
        PARALLEL_FORMATION_CASES.map((fixture) => ({
            stem: fixture.stem,
            verbClass: fixture.verbClass,
            sameReadOnlyRelation: true,
            copiedInventoryCanonical: false,
            forgedInventoryCanonical: false,
            copiedOperationCanonical: false,
            forgedOperationCanonical: false,
            semanticSelectionStatus: "blocked",
            semanticSelectionBlock:
                "classical-vnc-application-caller-authority-rejected",
            rejectedAuthorityFields: ["semanticSelection"],
            hostileFormula: "",
            hostileWritten: "",
            exactNegativeClass:
                fixture.stem === "pīn-ā-hua" ? "C" : "A",
            exactNegativeTargets: [],
            exactNegativeOperationStatus: "blocked",
            exactNegativeOperationBlock:
                fixture.stem === "pīn-ā-hua"
                    ? "classical-vnc-causative-no-rule-derived-options"
                    : "classical-vnc-derivation-selected-option-was-not-generated",
        }))
    );

    s.eq(
        "Every §25.8 paradigm coordinate reuses the selected scalar evaluator pointwise",
        rows.map((row) => {
            const plan = application.prepareParadigm({
                ...row.selection.selectedRequest,
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
            return {
                stem: row.fixture.stem,
                verbClass: row.fixture.verbClass,
                subtype: row.formation.subtype,
                planStatus: plan.authorizationStatus,
                coordinateStatus: coordinate.authorizationStatus,
                scalarEquivalent: coordinate.scalarEquivalent === true,
                formula: coordinate.formulaRealization,
                written: coordinate.surfaceRealization,
                formulaMatchesScalar:
                    coordinate.formulaRealization
                    === row.selection.scalar.resultFrame?.formulaRealization
                    && coordinate.formulaRealization
                    === coordinate.scalarApplicationFrame?.resultFrame
                        ?.formulaRealization,
                writtenMatchesScalar:
                    coordinate.surfaceRealization
                    === row.selection.scalar.resultFrame?.surfaceRealization
                    && coordinate.surfaceRealization
                    === coordinate.scalarApplicationFrame?.resultFrame
                        ?.surfaceRealization,
            };
        }),
        rows.map((row) => ({
            stem: row.fixture.stem,
            verbClass: row.fixture.verbClass,
            subtype: row.formation.subtype,
            planStatus: "authorized",
            coordinateStatus: "authorized",
            scalarEquivalent: true,
            formula: row.formation.formula,
            written: row.formation.written,
            formulaMatchesScalar: true,
            writtenMatchesScalar: true,
        }))
    );

    return s;
}

module.exports = { run };
