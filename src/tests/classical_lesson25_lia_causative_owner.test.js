"use strict";

const { createSuite } = require("./runner");

const LIA_CASES = Object.freeze([
    Object.freeze({
        stem: "tlāca-ti",
        classes: Object.freeze(["A", "B"]),
        category: "denominal-ti-candidate",
        segments: Object.freeze(["tlāca", "ti"]),
        target: "tlāca-ti-liā",
        formula: "#ni-0+c-0(tlāca-ti-lia)0+0-0#",
        written: "nictlācatilia",
    }),
    Object.freeze({
        stem: "nel-ti",
        classes: Object.freeze(["A"]),
        category: "denominal-ti-candidate",
        segments: Object.freeze(["nel", "ti"]),
        target: "nel-ti-liā",
        formula: "#ni-0+c-0(nel-ti-lia)0+0-0#",
        written: "nicneltilia",
    }),
    Object.freeze({
        stem: "mazā-ti",
        classes: Object.freeze(["A", "B"]),
        category: "denominal-ti-candidate",
        segments: Object.freeze(["mazā", "ti"]),
        target: "mazā-ti-liā",
        formula: "#ni-0+c-0(mazā-ti-lia)0+0-0#",
        written: "nicmazātilia",
    }),
    Object.freeze({
        stem: "ahhuiā-ya",
        classes: Object.freeze(["A", "B"]),
        category: "root-plus-ya",
        segments: Object.freeze(["ahhuiā", "ya"]),
        target: "ahhuiā-liā",
        formula: "#ni-0+c-0(ahhuiā-lia)0+0-0#",
        written: "nicahhuiālia",
    }),
    Object.freeze({
        stem: "ce-ce-ya",
        classes: Object.freeze(["A", "B"]),
        category: "root-plus-ya",
        segments: Object.freeze(["ce", "ce", "ya"]),
        target: "ce-ce-liā",
        formula: "#ni-0+c-0(ce-ce-lia)0+0-0#",
        written: "niccecelia",
    }),
    Object.freeze({
        stem: "xoco-ya",
        classes: Object.freeze(["A", "B"]),
        category: "root-plus-ya",
        segments: Object.freeze(["xoco", "ya"]),
        target: "xoco-liā",
        formula: "#ni-0+c-0(xoco-lia)0+0-0#",
        written: "nicxocolia",
    }),
    Object.freeze({
        stem: "chichi-ya",
        classes: Object.freeze(["A", "B"]),
        category: "root-plus-ya",
        segments: Object.freeze(["chichi", "ya"]),
        target: "chichi-liā",
        formula: "#ni-0+c-0(chichi-lia)0+0-0#",
        written: "nicchichilia",
    }),
    Object.freeze({
        stem: "te-ti-ya",
        classes: Object.freeze(["A", "B"]),
        category: "root-plus-ya",
        segments: Object.freeze(["te", "ti", "ya"]),
        target: "te-ti-liā",
        formula: "#ni-0+c-0(te-ti-lia)0+0-0#",
        written: "nictetilia",
    }),
    Object.freeze({
        stem: "xo-xō-hui-ya",
        classes: Object.freeze(["A", "B"]),
        category: "root-plus-ya",
        segments: Object.freeze(["xo", "xō", "hui", "ya"]),
        target: "xo-xō-hui-liā",
        formula: "#ni-0+c-0(xo-xō-hui-lia)0+0-0#",
        written: "nicxoxōhuilia",
    }),
]);

const EXPANDED_LIA_CASES = Object.freeze(LIA_CASES.flatMap((fixture) => (
    fixture.classes.map((verbClass) => Object.freeze({
        ...fixture,
        verbClass,
    }))
)));

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

function buildCausativeRequest(stem, verbClass) {
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

function selectApplicationTarget(application, request, target) {
    const preview = application.evaluate({
        ...request,
        derivationOptionId: "",
    });
    const options =
        preview.controlFrame?.derivationOptionInventory?.options || [];
    const option = options.find((candidate) => (
        candidate.targetStem === target
    )) || null;
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
    const s = createSuite("classical_lesson25_lia_causative_owner");
    const application = ctx.createClassicalNahuatlVncApplication(ctx);

    s.eq(
        "Every exact §25.5 Source/class coordinate issues one read-only Class-C liā operation with exact independent projections",
        EXPANDED_LIA_CASES.map((fixture) => {
            const selection = selectApplicationTarget(
                application,
                buildCausativeRequest(fixture.stem, fixture.verbClass),
                fixture.target
            );
            const inventory =
                selection.preview.controlFrame?.derivationOptionInventory;
            const typeTwoOptions = (inventory?.options || []).filter(
                (option) => option.derivationSubtype === "type-two"
            );
            const analysisFrame =
                selection.scalar.resultFrame?.sourceAnalysisFrame || null;
            const analysis = (analysisFrame?.analyses || []).find(
                (candidate) => candidate.category === fixture.category
            ) || null;
            return {
                stem: fixture.stem,
                verbClass: fixture.verbClass,
                scalarStatus: selection.scalar.authorizationStatus,
                inventoryCanonical:
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(
                        inventory
                    ),
                typeTwoTargets: typeTwoOptions.map(
                    (option) => option.targetStem
                ),
                targetClass: selection.option?.targetClass || "",
                route: selection.option?.derivationRoute || "",
                exactWitness: selection.option?.exactWitness === true,
                lexicalChoiceRequired:
                    selection.option?.lexicalChoiceRequired === true,
                analysisCanonical:
                    ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
                        analysisFrame
                    ),
                analysisCategory: analysis?.category || "",
                analysisSegments: analysis?.segments || [],
                analysisAuthority: analysis?.analysisAuthority || "",
                analysisLexicalStatus: analysis?.lexicalStatus || "",
                analysisSelectionRequired:
                    analysis?.sourceAnalysisSelectionRequired === true,
                formula:
                    selection.scalar.resultFrame?.formulaRealization || "",
                written:
                    selection.scalar.resultFrame?.surfaceRealization || "",
            };
        }),
        EXPANDED_LIA_CASES.map((fixture) => ({
            stem: fixture.stem,
            verbClass: fixture.verbClass,
            scalarStatus: "authorized",
            inventoryCanonical: true,
            typeTwoTargets: [fixture.target],
            targetClass: "C",
            route: fixture.category === "denominal-ti-candidate"
                ? "type-two-lia-from-typed-denominal-ti"
                : "type-two-lia-from-typed-root-plus-ya",
            exactWitness: true,
            lexicalChoiceRequired: false,
            analysisCanonical: true,
            analysisCategory: fixture.category,
            analysisSegments: [...fixture.segments],
            analysisAuthority: "typed-lexical-source-analysis",
            analysisLexicalStatus: "lexically-licensed-source-analysis",
            analysisSelectionRequired: false,
            formula: fixture.formula,
            written: fixture.written,
        }))
    );

    s.eq(
        "The §25.4.8 root-plus-ya exceptions reject causative liā, retain exact l-tiā alternatives, and leave tlaōco-liā to the applicative owner",
        (() => {
            const summarizeCausative = (stem, targets) => {
                const request = buildCausativeRequest(stem, "A");
                const preview = application.evaluate(request);
                const typeTwoOptions = (
                    preview.controlFrame?.derivationOptionInventory?.options
                    || []
                ).filter((option) => option.derivationSubtype === "type-two");
                return {
                    targets: typeTwoOptions.map((option) => option.targetStem),
                    routes: typeTwoOptions.map(
                        (option) => option.derivationRoute
                    ),
                    selected: targets.map((target) => {
                        const selection = selectApplicationTarget(
                            application,
                            request,
                            target
                        );
                        return {
                            status: selection.scalar.authorizationStatus,
                            formula:
                                selection.scalar.resultFrame
                                    ?.formulaRealization || "",
                            written:
                                selection.scalar.resultFrame
                                    ?.surfaceRealization || "",
                        };
                    }),
                };
            };
            const applicativeRequest = {
                sourceStem: "tlaōco-ya",
                verbClass: "A",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "2sg",
                requestedVoice: "active",
            };
            const applicative = selectApplicationTarget(
                application,
                applicativeRequest,
                "tlaōco-liā"
            );
            return {
                tlaocoya: summarizeCausative(
                    "tlaōco-ya",
                    ["tlaōco-l-tiā"]
                ),
                ahuiya: summarizeCausative(
                    "āhui-ya",
                    ["āhui-l-tiā", "āhui-ya-l-tiā"]
                ),
                applicative: {
                    status: applicative.scalar.authorizationStatus,
                    route: applicative.option?.derivationRoute || "",
                    formula:
                        applicative.scalar.resultFrame?.formulaRealization
                        || "",
                    written:
                        applicative.scalar.resultFrame?.surfaceRealization
                        || "",
                },
            };
        })(),
        {
            tlaocoya: {
                targets: ["tlaōco-l-tiā"],
                routes: [
                    "type-two-tia-from-root-plus-ya-lo-internal-base",
                ],
                selected: [{
                    status: "authorized",
                    formula: "#ni-0+c-0(tlaōco-l-tia)0+0-0#",
                    written: "nictlaōcoltia",
                }],
            },
            ahuiya: {
                targets: ["āhui-l-tiā", "āhui-ya-l-tiā"],
                routes: [
                    "type-two-tia-from-root-plus-ya-lo-internal-base",
                    "type-two-tia-from-retained-ya-lo-internal-base",
                ],
                selected: [{
                    status: "authorized",
                    formula: "#ni-0+c-0(āhui-l-tia)0+0-0#",
                    written: "nicāhuiltia",
                }, {
                    status: "authorized",
                    formula: "#ni-0+c-0(āhui-ya-l-tia)0+0-0#",
                    written: "nicāhuiyaltia",
                }],
            },
            applicative: {
                status: "authorized",
                route: "type-two-intransitive-oya-delete-ya-add-lia",
                formula: "#ni-0+m-itz(tlaōco-lia)0+0-0#",
                written: "nimitztlaōcolia",
            },
        }
    );

    s.eq(
        "Copied, forged, answer-shaped, and cross-Source authority cannot mint a §25.5 operation",
        (() => {
            const source = buildSource(ctx, "ce-ce-ya", "A");
            const analysis =
                ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(
                    source
                );
            const inventory =
                ctx.getClassicalNahuatlVncDerivationOptionInventory(
                    source,
                    { derivationType: "causative" }
                );
            const option = inventory.options.find(
                (candidate) => candidate.targetStem === "ce-ce-liā"
            ) || null;
            const forgedOperation =
                ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
                    source,
                    {
                        derivationType: "causative",
                        optionId: "forged:cn-l25-2552-root-plus-ya-lia",
                        targetSubject: "1sg",
                        causativeObjectKind: "specific-projective",
                        targetStem: "ce-ce-liā",
                        formulaTargetStem: "ce-ce-lia",
                        printedResult: "niccecelia",
                        selectedOption: option ? { ...option } : null,
                    }
                );
            const otherSource = buildSource(ctx, "xoco-ya", "A");
            const crossSourceOperation =
                ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
                    otherSource,
                    {
                        derivationType: "causative",
                        optionId: option?.optionId || "missing-cece-option",
                        targetSubject: "1sg",
                        causativeObjectKind: "specific-projective",
                    }
                );
            const request = buildCausativeRequest("ce-ce-ya", "A");
            const selection = selectApplicationTarget(
                application,
                request,
                "ce-ce-liā"
            );
            const injected = application.evaluate({
                ...selection.selectedRequest,
                sourceAnalysisFrame: { ...analysis },
            });
            const injectedPlan = application.prepareParadigm({
                ...selection.selectedRequest,
                outputScope: "paradigm",
                sourceAnalysisFrame: { ...analysis },
            });
            return {
                copiedSourceInventory:
                    ctx.getClassicalNahuatlVncDerivationOptionInventory(
                        { ...source },
                        { derivationType: "causative" }
                    ).authorizationStatus,
                copiedAnalysisCanonical:
                    ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame({
                        ...analysis,
                    }),
                copiedInventoryCanonical:
                    ctx.isClassicalNahuatlVncDerivationOptionInventory({
                        ...inventory,
                    }),
                copiedOptionInventoryCanonical:
                    ctx.isClassicalNahuatlVncDerivationOptionInventory({
                        ...inventory,
                        options: inventory.options.map((candidate) => (
                            candidate === option
                                ? { ...candidate }
                                : candidate
                        )),
                    }),
                forged: [
                    forgedOperation.authorizationStatus,
                    forgedOperation.blockReason,
                ],
                crossSource: [
                    crossSourceOperation.authorizationStatus,
                    crossSourceOperation.blockReason,
                ],
                injected: [
                    injected.authorizationStatus,
                    injected.blockReason,
                    injected.resultFrame?.formulaRealization || "",
                    injected.resultFrame?.surfaceRealization || "",
                ],
                injectedPlan: [
                    injectedPlan.authorizationStatus,
                    injectedPlan.blockReason,
                ],
            };
        })(),
        {
            copiedSourceInventory: "blocked",
            copiedAnalysisCanonical: false,
            copiedInventoryCanonical: false,
            copiedOptionInventoryCanonical: false,
            forged: [
                "blocked",
                "classical-vnc-derivation-selected-option-was-not-generated",
            ],
            crossSource: [
                "blocked",
                "classical-vnc-derivation-selected-option-was-not-generated",
            ],
            injected: [
                "blocked",
                "classical-vnc-application-caller-authority-rejected",
                "",
                "",
            ],
            injectedPlan: [
                "blocked",
                "classical-vnc-paradigm-plan-caller-authority-rejected",
            ],
        }
    );

    s.eq(
        "Every licensed §25.5 coordinate reaches the shared scalar evaluator pointwise from paradigm preparation",
        EXPANDED_LIA_CASES.map((fixture) => {
            const selection = selectApplicationTarget(
                application,
                buildCausativeRequest(fixture.stem, fixture.verbClass),
                fixture.target
            );
            const plan = application.prepareParadigm({
                ...selection.selectedRequest,
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
                stem: fixture.stem,
                verbClass: fixture.verbClass,
                planStatus: plan.authorizationStatus,
                coordinateStatus: coordinate.authorizationStatus,
                scalarEquivalent: coordinate.scalarEquivalent === true,
                formula: coordinate.formulaRealization,
                written: coordinate.surfaceRealization,
                formulaMatchesScalar:
                    coordinate.formulaRealization
                    === selection.scalar.resultFrame?.formulaRealization
                    && coordinate.formulaRealization
                    === coordinate.scalarApplicationFrame?.resultFrame
                        ?.formulaRealization,
                writtenMatchesScalar:
                    coordinate.surfaceRealization
                    === selection.scalar.resultFrame?.surfaceRealization
                    && coordinate.surfaceRealization
                    === coordinate.scalarApplicationFrame?.resultFrame
                        ?.surfaceRealization,
            };
        }),
        EXPANDED_LIA_CASES.map((fixture) => ({
            stem: fixture.stem,
            verbClass: fixture.verbClass,
            planStatus: "authorized",
            coordinateStatus: "authorized",
            scalarEquivalent: true,
            formula: fixture.formula,
            written: fixture.written,
            formulaMatchesScalar: true,
            writtenMatchesScalar: true,
        }))
    );

    return s;
}

module.exports = { run };
