"use strict";

const { createSuite } = require("./runner");

const CASES = Object.freeze([
    Object.freeze({
        label: "§25.6 causative",
        derivation: "causative",
        objectRequest: Object.freeze({
            causativeObjectKind: "specific-projective",
        }),
        ruleId: "cn-l25-256-final-o-direct-huia",
        formula: "#ni-0+c-0(temō-huia)0+0-0#",
        written: "nictemōhuia",
    }),
    Object.freeze({
        label: "§26.10 applicative",
        derivation: "applicative",
        objectRequest: Object.freeze({
            applicativeObjectKind: "specific-projective",
            applicativeObjectPerson: "2sg",
        }),
        ruleId: "cn-l26-2610-final-o-direct-huia",
        formula: "#ni-0+m-itz(temō-huia)0+0-0#",
        written: "nimitztemōhuia",
    }),
]);

function buildRequest(fixture, sourceStem = "temō") {
    return {
        sourceStem,
        verbClass: "A",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        objectKind: "none",
        objectPerson: "",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: fixture.derivation,
        requestedVoice: "active",
        ...fixture.objectRequest,
    };
}

function selectTemoHuia(application, fixture, sourceStem = "temō") {
    const request = buildRequest(fixture, sourceStem);
    const preview = application.evaluate({
        ...request,
        derivationOptionId: "",
    });
    const option = (
        preview.controlFrame?.derivationOptionInventory?.options || []
    ).find(candidate => candidate.targetStem === "temō-huiā") || null;
    const selectedRequest = {
        ...request,
        derivationOptionId:
            option?.optionId || `missing:${fixture.derivation}:temō-huiā`,
    };
    return {
        preview,
        option,
        selectedRequest,
        scalar: application.evaluate(selectedRequest),
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_temo_huia_quantity_authority");
    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const selections = CASES.map(fixture => ({
        fixture,
        ...selectTemoHuia(application, fixture),
    }));

    s.eq(
        "The shared final-ō + huiā formation preserves typed Source quantity for both licensed operations and independently projects exact LCM/GCD",
        selections.map(({ fixture, preview, option, scalar }) => {
            const finite = scalar.resultFrame?.finiteSurfaceFrame || null;
            return {
                label: fixture.label,
                inventoryCanonical:
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(
                        preview.controlFrame?.derivationOptionInventory
                    ),
                optionTarget: option?.targetStem || "",
                ruleId: option?.ruleId || "",
                sharedFormationRuleId:
                    option?.targetConstruction?.sharedFormationRuleId || "",
                operation:
                    option?.targetConstruction?.operation || "",
                preserveSourceFinalQuantity:
                    option?.targetConstruction
                        ?.preserveSourceFinalQuantity === true,
                scalarStatus: scalar.authorizationStatus,
                scalarCanonical:
                    ctx.isClassicalNahuatlVncApplicationFrame(scalar),
                resultCanonical:
                    ctx.isClassicalNahuatlVncApplicationResultFrame(
                        scalar.resultFrame
                    ),
                formula: scalar.resultFrame?.formulaRealization || "",
                written: scalar.resultFrame?.surfaceRealization || "",
                formulaIndependent:
                    finite?.formulaDerivedFromWrittenProjection === false,
                writtenIndependent:
                    finite?.writtenDerivedFromFormulaProjection === false,
            };
        }),
        CASES.map(fixture => ({
            label: fixture.label,
            inventoryCanonical: true,
            optionTarget: "temō-huiā",
            ruleId: fixture.ruleId,
            sharedFormationRuleId:
                "cn-vnc-final-o-huia-formation",
            operation: "append-huia-to-final-o",
            preserveSourceFinalQuantity: true,
            scalarStatus: "authorized",
            scalarCanonical: true,
            resultCanonical: true,
            formula: fixture.formula,
            written: fixture.written,
            formulaIndependent: true,
            writtenIndependent: true,
        }))
    );

    s.eq(
        "Each temō-huiā paradigm coordinate is pointwise identical to the shared scalar evaluator",
        selections.map(({ fixture, selectedRequest, scalar }) => {
            const plan = application.prepareParadigm({
                ...selectedRequest,
                outputScope: "paradigm",
            });
            const coordinate = application.projectParadigmCoordinates(
                plan,
                [{
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                }]
            )[0];
            return {
                label: fixture.label,
                planStatus: plan.authorizationStatus,
                coordinateStatus: coordinate.authorizationStatus,
                coordinateCanonical:
                    ctx.isClassicalNahuatlVncParadigmCoordinateFrame(
                        coordinate
                    ),
                scalarEquivalent: coordinate.scalarEquivalent === true,
                formula:
                    coordinate.formulaRealization,
                written:
                    coordinate.surfaceRealization,
                sameFormula:
                    coordinate.formulaRealization
                    === scalar.resultFrame?.formulaRealization,
                sameWritten:
                    coordinate.surfaceRealization
                    === scalar.resultFrame?.surfaceRealization,
                sameTypedResult:
                    coordinate.typedSlotFrame
                    === coordinate.scalarApplicationFrame?.resultFrame
                        ?.finalTypedVncSlotFrame,
            };
        }),
        CASES.map(fixture => ({
            label: fixture.label,
            planStatus: "authorized",
            coordinateStatus: "authorized",
            coordinateCanonical: true,
            scalarEquivalent: true,
            formula: fixture.formula,
            written: fixture.written,
            sameFormula: true,
            sameWritten: true,
            sameTypedResult: true,
        }))
    );

    s.eq(
        "Evidence-only short spellings and answer-shaped carriers cannot authorize a short-o result",
        (() => {
            const causative = selections[0];
            const poisoned = application.evaluate({
                ...causative.selectedRequest,
                targetStem: "temo-huiā",
                formula: "#ni-0+c-0(temo-huia)0+0-0#",
                surface: "nictemohuia",
                example: "tla-(temo-huiā)",
                lessonMetadata: {
                    section: "25.6",
                },
            });
            const quantityNeutralEntry = selectTemoHuia(
                application,
                CASES[0],
                "temo"
            );
            const wrongClass = application.evaluate({
                ...buildRequest(CASES[0]),
                verbClass: "B",
            });
            const wrongValence = application.evaluate({
                ...buildRequest(CASES[0]),
                sourceValence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const negativeTargets = [
                ...(wrongClass.controlFrame?.derivationOptionInventory
                    ?.options || []),
                ...(wrongValence.controlFrame?.derivationOptionInventory
                    ?.options || []),
            ].map(option => option.targetStem);
            return {
                poisonStatus: poisoned.authorizationStatus,
                poisonReason: poisoned.blockReason,
                rejectedAuthorityFields:
                    [...poisoned.rejectedAuthorityFields].sort(),
                poisonAbsent:
                    !JSON.stringify(poisoned).includes("temo-huiā")
                    && !JSON.stringify(poisoned).includes("nictemohuia"),
                quantityNeutralEntryStatus:
                    quantityNeutralEntry.scalar.authorizationStatus,
                quantityNeutralCanonicalTarget:
                    quantityNeutralEntry.option?.targetStem || "",
                quantityNeutralFormula:
                    quantityNeutralEntry.scalar.resultFrame
                        ?.formulaRealization || "",
                quantityNeutralWritten:
                    quantityNeutralEntry.scalar.resultFrame
                        ?.surfaceRealization || "",
                exactTargetAbsentFromMismatchedSources:
                    !negativeTargets.includes("temō-huiā"),
                shortTargetAbsentFromMismatchedSources:
                    !negativeTargets.includes("temo-huiā"),
            };
        })(),
        {
            poisonStatus: "blocked",
            poisonReason:
                "classical-vnc-application-caller-authority-rejected",
            rejectedAuthorityFields: [
                "example",
                "formula",
                "lessonMetadata",
                "surface",
                "targetStem",
            ],
            poisonAbsent: true,
            quantityNeutralEntryStatus: "authorized",
            quantityNeutralCanonicalTarget: "temō-huiā",
            quantityNeutralFormula:
                "#ni-0+c-0(temō-huia)0+0-0#",
            quantityNeutralWritten: "nictemōhuia",
            exactTargetAbsentFromMismatchedSources: true,
            shortTargetAbsentFromMismatchedSources: true,
        }
    );

    return s;
}

module.exports = { run };
