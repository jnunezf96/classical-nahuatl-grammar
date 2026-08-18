"use strict";

const { createSuite } = require("./runner");

const CASES = Object.freeze([
    Object.freeze({
        label: "§25.3 tomi through its o-hua nonactive prerequisite",
        sourceStem: "tomi",
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "1sg",
        objectPerson: "",
        sourceVoice: "active",
        previewStatus: "blocked",
        targetStem: "tom-tiā",
        route: "type-two-tia-from-tom-o-hua-internal-base",
        bridgeStem: "tom-o-hua",
        formula: "#ni-0+c-0(tom-tia)0+0-0#",
        written: "nictomtia",
    }),
    Object.freeze({
        label: "§25.3 quīza through its quīx-o-hua nonactive prerequisite",
        sourceStem: "quīza",
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "2sg",
        objectPerson: "",
        sourceVoice: "active",
        previewStatus: "blocked",
        targetStem: "quix-tiā",
        route: "type-two-tia-from-quix-o-hua-internal-base",
        bridgeStem: "quīx-o-hua",
        formula: "#ti-0+c-0(quix-tia)0+0-0#",
        written: "ticquīxtia",
    }),
    Object.freeze({
        label: "§25.11.3.b piya-l-tiā from a passive piya source",
        sourceStem: "piya",
        verbClass: "B",
        sourceValence: "specific-projective",
        sourceSubject: "3sg",
        subject: "1sg",
        objectPerson: "1sg",
        sourceVoice: "passive",
        previewStatus: "authorized",
        targetStem: "piya-l-tiā",
        route: "type-two-tia-from-piya-lo-internal-base",
        bridgeStem: "piya-lō",
        formula: "#ni-0+n-o+tē(piya-l-tia)0+0-0#",
        written: "ninotēpiyaltia",
    }),
]);

function buildRequest(fixture) {
    return {
        sourceStem: fixture.sourceStem,
        verbClass: fixture.verbClass,
        sourceValence: fixture.sourceValence,
        sourceSubject: fixture.sourceSubject,
        subject: fixture.subject,
        objectKind: fixture.sourceValence === "intransitive"
            ? "none"
            : "specific-projective",
        objectPerson: fixture.objectPerson,
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        sourceVoice: fixture.sourceVoice,
        requestedVoice: "active",
    };
}

function selectTarget(application, request, targetStem) {
    const preview = application.evaluate({
        ...request,
        derivationOptionId: "",
    });
    const option = (
        preview.controlFrame?.derivationOptionInventory?.options || []
    ).find(candidate => candidate.targetStem === targetStem) || null;
    const selectedRequest = {
        ...request,
        derivationOptionId: option?.optionId || `missing:${targetStem}`,
    };
    return {
        preview,
        option,
        selectedRequest,
        scalar: application.evaluate(selectedRequest),
    };
}

function buildLowLevelSource(ctx, fixture) {
    return ctx.buildClassicalNahuatlVerbstemClassFrame(
        fixture.sourceStem,
        {
            subject: fixture.sourceSubject,
            mood: "indicative",
            tense: "present",
            verbClass: fixture.verbClass,
            perfectiveClass: fixture.verbClass,
            valence: fixture.sourceValence,
            transitivity: fixture.sourceValence === "intransitive"
                ? "intransitive"
                : "transitive",
            objectKind: fixture.sourceValence === "intransitive"
                ? "none"
                : "specific-projective",
            objectPerson: fixture.objectPerson,
        }
    );
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_type_two_source_owners");
    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const selections = CASES.map((fixture) => ({
        fixture,
        ...selectTarget(
            application,
            buildRequest(fixture),
            fixture.targetStem
        ),
    }));

    s.eq(
        "The three formerly suppressed Sources issue exact shared causative operations and independent GCD/LCM projections",
        selections.map(({ fixture, preview, option, scalar }) => {
            const bridge = option?.typeTwoInternalBridgeFrame || null;
            const finite = scalar.resultFrame?.finiteSurfaceFrame || null;
            return {
                label: fixture.label,
                previewStatus: preview.authorizationStatus,
                inventoryCanonical:
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(
                        preview.controlFrame?.derivationOptionInventory
                    ),
                targetStem: option?.targetStem || "",
                route: option?.derivationRoute || "",
                exactWitness: option?.exactWitness === true,
                bridgeStem: bridge?.nonactiveStem || "",
                bridgeInternalOnly: bridge?.internalPrerequisiteOnly === true,
                bridgeTypedSourceAuthority:
                    bridge?.typedSourceAuthority === true,
                bridgeCallerAuthority:
                    bridge?.callerSuppliedAuthorityAccepted === true,
                bridgeFormulaAuthority:
                    bridge?.formulaStringAuthority === true,
                bridgeSurfaceAuthority:
                    bridge?.surfaceStringAuthority === true,
                scalarStatus: scalar.authorizationStatus,
                scalarCanonical:
                    ctx.isClassicalNahuatlVncApplicationFrame(scalar),
                operationCanonical:
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(
                        scalar.resultFrame?.derivationOperationFrame
                    ),
                finiteCanonical:
                    ctx.isClassicalNahuatlVncFiniteSurfaceFrame(finite),
                formula: scalar.resultFrame?.formulaRealization || "",
                written: scalar.resultFrame?.surfaceRealization || "",
                formulaIndependent:
                    finite?.formulaDerivedFromWrittenProjection === false,
                writtenIndependent:
                    finite?.writtenDerivedFromFormulaProjection === false,
            };
        }),
        CASES.map((fixture) => ({
            label: fixture.label,
            previewStatus: fixture.previewStatus,
            inventoryCanonical: true,
            targetStem: fixture.targetStem,
            route: fixture.route,
            exactWitness: true,
            bridgeStem: fixture.bridgeStem,
            bridgeInternalOnly: true,
            bridgeTypedSourceAuthority: true,
            bridgeCallerAuthority: false,
            bridgeFormulaAuthority: false,
            bridgeSurfaceAuthority: false,
            scalarStatus: "authorized",
            scalarCanonical: true,
            operationCanonical: true,
            finiteCanonical: true,
            formula: fixture.formula,
            written: fixture.written,
            formulaIndependent: true,
            writtenIndependent: true,
        }))
    );

    s.eq(
        "Every licensed coordinate is pointwise identical to the scalar evaluator",
        selections.map(({ fixture, selectedRequest, scalar }) => {
            const plan = application.prepareParadigm({
                ...selectedRequest,
                outputScope: "paradigm",
            });
            const coordinate = application.projectParadigmCoordinates(
                plan,
                [{
                    subject: fixture.subject,
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
                sameOperation:
                    coordinate.selectedDerivationOptionId
                    === selectedRequest.derivationOptionId,
                sourceVoice: coordinate.selectedSourceVoice,
            };
        }),
        CASES.map((fixture) => ({
            label: fixture.label,
            planStatus: "authorized",
            coordinateStatus: "authorized",
            coordinateCanonical: true,
            scalarEquivalent: true,
            sameFormula: true,
            sameWritten: true,
            sameTypedResult: true,
            sameOperation: true,
            sourceVoice: fixture.sourceVoice,
        }))
    );

    s.eq(
        "Wrong typed Sources, copied Source machinery, and caller answer carriers cannot authorize these routes",
        (() => {
            const exactNegatives = CASES.map((fixture) => {
                const request = buildRequest(fixture);
                const wrongSource = application.evaluate({
                    ...request,
                    sourceStem: "FORGED-SOURCE",
                });
                const wrongValence = application.evaluate({
                    ...request,
                    sourceValence: fixture.sourceValence === "intransitive"
                        ? "specific-projective"
                        : "intransitive",
                    objectKind: fixture.sourceValence === "intransitive"
                        ? "specific-projective"
                        : "none",
                    objectPerson: fixture.sourceValence === "intransitive"
                        ? "3sg"
                        : "",
                });
                const wrongTargets = [
                    ...(wrongSource.controlFrame?.derivationOptionInventory
                        ?.options || []),
                    ...(wrongValence.controlFrame?.derivationOptionInventory
                        ?.options || []),
                ].map(option => option.targetStem);
                return {
                    label: fixture.label,
                    wrongSourceBlocked:
                        wrongSource.authorizationStatus === "blocked",
                    wrongSourceReasonPresent:
                        Boolean(wrongSource.blockReason),
                    wrongSourceResultBlocked:
                        wrongSource.resultFrame?.authorizationStatus
                        === "blocked",
                    wrongSourceFormulaAbsent:
                        !wrongSource.resultFrame?.formulaRealization,
                    wrongSourceSurfaceAbsent:
                        !wrongSource.resultFrame?.surfaceRealization,
                    listedOptionCannotAuthorize:
                        !wrongTargets.includes(fixture.targetStem)
                        || wrongSource.authorizationStatus === "blocked",
                };
            });
            const copiedSources = CASES.map((fixture) => {
                const source = buildLowLevelSource(ctx, fixture);
                const copy = { ...source };
                const inventory =
                    ctx.getClassicalNahuatlVncDerivationOptionInventory(
                        copy,
                        { derivationType: "causative" }
                    );
                return {
                    label: fixture.label,
                    sourceCanonical:
                        ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(
                            source
                        ),
                    copyCanonical:
                        ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(
                            copy
                        ),
                    copyInventoryStatus: inventory.authorizationStatus,
                    copyOptions: inventory.options.length,
                };
            });
            const poisoned = application.evaluate({
                ...selections[1].selectedRequest,
                targetStem: "FORGED-TARGET",
                formula: "#FORGED-FORMULA#",
                surface: "FORGED-SURFACE",
                storedAnswer: "FORGED-ANSWER",
            });
            return {
                exactNegatives,
                copiedSources,
                poisonStatus: poisoned.authorizationStatus,
                poisonReason: poisoned.blockReason,
                rejectedAuthorityFields:
                    [...poisoned.rejectedAuthorityFields].sort(),
                poisonAbsent: !JSON.stringify(poisoned).includes("FORGED"),
            };
        })(),
        {
            exactNegatives: CASES.map((fixture) => ({
                label: fixture.label,
                wrongSourceBlocked: true,
                wrongSourceReasonPresent: true,
                wrongSourceResultBlocked: true,
                wrongSourceFormulaAbsent: true,
                wrongSourceSurfaceAbsent: true,
                listedOptionCannotAuthorize: true,
            })),
            copiedSources: CASES.map((fixture) => ({
                label: fixture.label,
                sourceCanonical: true,
                copyCanonical: false,
                copyInventoryStatus: "blocked",
                copyOptions: 0,
            })),
            poisonStatus: "blocked",
            poisonReason:
                "classical-vnc-application-caller-authority-rejected",
            rejectedAuthorityFields: [
                "formula",
                "storedAnswer",
                "surface",
                "targetStem",
            ],
            poisonAbsent: true,
        }
    );

    return s;
}

module.exports = { run };
