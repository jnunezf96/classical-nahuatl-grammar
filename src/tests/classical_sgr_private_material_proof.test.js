"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const AXIS_LEDGER = JSON.parse(fs.readFileSync(
    path.join(ROOT, "docs", "CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json"),
    "utf8"
));
const OUTPUT_LEDGER = JSON.parse(fs.readFileSync(
    path.join(ROOT, "docs", "CLASSICAL_APPLICATION_OUTPUT_DISPOSITIONS.json"),
    "utf8"
));
const INDEX_HTML = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const SHELL_SOURCE = fs.readFileSync(
    path.join(ROOT, "src", "ui", "shell", "classical_shell.mjs"),
    "utf8"
);
const RENDERING_SOURCE = fs.readFileSync(
    path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
    "utf8"
);

const INTENTIONALLY_UNSURFACED_AXIS_ENTRIES = AXIS_LEDGER.entries.filter(
    entry => entry.surfaceDisposition === "intentionally-unsurfaced"
);
const INTERNAL_AXIS_ENTRIES = AXIS_LEDGER.entries.filter(
    entry => entry.surfaceDisposition === "internal-support"
);
const INTERNAL_OUTPUT_ENTRIES = OUTPUT_LEDGER.entries.filter(
    entry => entry.productDisposition === "internal-support"
);

function makeDeverbalPlanRequest() {
    return {
        constructionKind: "predicate-nominalization",
        nominalizationKind: "future-agentive",
        source: {
            sourceStage: "future-predicate",
            sourceStem: "mach-ti",
            verbClass: "A",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: "3sg",
        state: "absolutive",
        subjects: ["1sg", "3sg"],
        states: ["absolutive"],
    };
}

function makeRelationalPlanRequest(ctx) {
    return {
        nounstem: {
            kind: ctx.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND
                || "classical-nahuatl-nnc-nounstem-request",
            stemId: "tlan-bottom",
            operation: "relational-nnc",
            formation: "option-two",
            sourceKind: "nounstem",
            sourceMode: "embed-matrix",
            sourceStem: "cal",
            sourceEmbedStem: "cal",
            sourceMatrixStem: "tlan",
        },
        state: "absolutive",
        subjectMode: "adverbialized",
    };
}

function makePersonalNameSource(ctx) {
    const clause = ctx.buildPersonalNameInnerClauseFrame({
        sourceFamily: "preterit-agentive",
        subjectPrefix: "Ø",
        subjectConnector: "Ø",
        predicateMorphs: ["temō", "Ø"],
        numberPrefix: "c",
        numberSuffix: "Ø",
    });
    return ctx.buildPersonalNameNncSourceFrame({
        sourceFamily: "preterit-agentive",
        clauses: [clause],
    });
}

function executePrivateOutputCases(ctx) {
    const ordinarySource = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "mich",
    });
    const pronominalSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({ stem: "yeh" });
    const personalNameSource = makePersonalNameSource(ctx);
    const vncRequest = {
        sourceStem: "nemi",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
    };
    const nominalRequest = {
        constructionKind: "nominal-embed-vnc",
        source: {
            embedStem: "coy-ō",
            embedClass: "zero",
            matrixStem: "chōca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
        },
        relation: "adverb",
        route: "direct-adverb",
        adverbRole: "compared-manner",
        orientation: "subject",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        outputKind: "single",
    };
    const placeRequest = {
        constructionKind: "place-name",
        formation: "co",
        source: { embedStem: "Tlach" },
        usage: "adverbial",
    };
    const denominalRequest = {
        nounStem: "tlīl",
        sourceKind: "nounstem",
        sourceState: "absolutive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        objectPeople: ["3sg", "2sg"],
        outputScope: "single",
        operationId: "inceptive-ti",
    };
    const relationalRequest = makeRelationalPlanRequest(ctx);
    const deverbalRequest = makeDeverbalPlanRequest();

    const execute = (operationId, outputKind, args) => {
        try {
            return {
                error: "",
                receipt: ctx.executeClassicalGrammarApplicationRequest({
                    operationId,
                    outputKind,
                    args,
                }),
            };
        } catch (error) {
            return {
                error: String(error?.message || error),
                receipt: null,
            };
        }
    };

    const adverbialSource = execute(
        "nnc:adverbial",
        "source-preparation",
        [{ stem: "cencah", clauseKind: "vnc" }]
    );

    const cases = new Map([
        ["CAO-vnc-finite-slot--scalar", {
            validator: "isClassicalNahuatlFiniteVncResult",
            execution: execute("vnc:finite-slot", "scalar", [
                "nemi",
                {
                    subject: "3sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "B",
                },
            ]),
        }],
        ["CAO-nnc-ordinary--prepared-plan", {
            validator: "isClassicalNahuatlOrdinaryNncParadigmPlan",
            execution: execute("nnc:ordinary", "prepared-plan", [
                ordinarySource,
                {
                    states: ["absolutive"],
                    subjects: ["1sg", "3sg"],
                    sentenceType: "statement",
                    polarity: "positive",
                },
            ]),
        }],
        ["CAO-vnc-source-selection--scalar", {
            validator: "isClassicalNahuatlFuenteSourceSelectionFrame",
            execution: execute(
                "vnc:source-selection",
                "scalar",
                ["(nemi)"]
            ),
        }],
        ["CAO-nnc-pronominal--prepared-plan", {
            validator: "isClassicalNahuatlPronominalNncParadigmPlan",
            execution: execute("nnc:pronominal", "prepared-plan", [
                pronominalSource,
                { sentenceType: "statement", polarity: "positive" },
            ]),
        }],
        ["CAO-vnc-application--prepared-plan", {
            validator: "isClassicalNahuatlVncParadigmPlan",
            execution: execute(
                "vnc:application",
                "prepared-plan",
                [vncRequest]
            ),
        }],
        ["CAO-vnc-transitive-object--scalar", {
            validator: "isClassicalNahuatlTransitiveVncObjectFrame",
            execution: execute("vnc:transitive-object", "scalar", [
                "(itta)",
                {
                    transitivity: "transitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    object: "2sg",
                },
            ]),
        }],
        ["CAO-vnc-verbstem-class--scalar", {
            validator: "isClassicalNahuatlVerbstemClassFrame",
            execution: execute("vnc:verbstem-class", "scalar", [
                "(itta)",
                {
                    transitivity: "transitive",
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    object: "2sg",
                    verbClass: "A",
                },
            ]),
        }],
        ["CAO-grammar-nominal-construction--prepared-plan", {
            validator: "isClassicalNahuatlNominalConstructionParadigmPlan",
            execution: execute(
                "grammar:nominal-construction",
                "prepared-plan",
                [nominalRequest]
            ),
        }],
        ["CAO-nnc-deverbal-construction--prepared-plan", {
            validator: "isClassicalNahuatlParadigmPlan",
            execution: execute(
                "nnc:deverbal-construction",
                "prepared-plan",
                [deverbalRequest]
            ),
        }],
        ["CAO-nnc-adverbial--source-preparation", {
            validator: "isClassicalNahuatlAdverbialPotentialFrame",
            execution: adverbialSource,
        }],
        ["CAO-nnc-adverbial--prepared-plan", {
            validator: "isClassicalNahuatlAdverbialNuclearBatchPlan",
            execution: execute("nnc:adverbial", "prepared-plan", [{
                adverbialPotentialFrames: [
                    adverbialSource.receipt?.canonicalResult,
                ].filter(Boolean),
                scope: "external-clause",
            }]),
        }],
        ["CAO-nnc-relational--prepared-plan", {
            validator: "isClassicalNahuatlPreparedPlan",
            execution: execute("nnc:relational", "prepared-plan", [
                relationalRequest,
                [{ coordinateId: "third", subjectId: "3sg" }],
            ]),
        }],
        ["CAO-nnc-place-gentilic--prepared-plan", {
            validator: "isPlaceGentilicNncParadigmPlan",
            execution: execute(
                "nnc:place-gentilic",
                "prepared-plan",
                [placeRequest]
            ),
        }],
        ["CAO-vnc-denominal--prepared-plan", {
            validator: "isClassicalNahuatlDenominalVncParadigmPlan",
            execution: execute(
                "vnc:denominal",
                "prepared-plan",
                [denominalRequest]
            ),
        }],
        ["CAO-nnc-personal-name--prepared-plan", {
            validator: "isPersonalNameNncParadigmPlan",
            execution: execute("nnc:personal-name", "prepared-plan", [{
                sourceFrame: personalNameSource,
            }]),
        }],
    ]);

    return {
        cases,
        execute,
        vncRequest,
    };
}

function createDomProbeElement(tagName = "div") {
    return {
        tagName,
        className: "",
        dataset: {},
        children: [],
        hidden: false,
        textContent: "",
        setAttribute(name, value) {
            this[name] = String(value);
        },
        append(...nodes) {
            this.children.push(...nodes);
        },
        appendChild(node) {
            this.children.push(node);
            return node;
        },
        replaceChildren(...nodes) {
            this.children = nodes;
        },
        querySelector() {
            return null;
        },
        remove() {
            this.removed = true;
        },
    };
}

function collectDatasetTokens(node, target = []) {
    if (!node || typeof node !== "object") {
        return target;
    }
    Object.values(node.dataset || {}).forEach(value => {
        String(value || "").split(/\s+/u).filter(Boolean).forEach(
            token => target.push(token)
        );
    });
    (node.children || []).forEach(child => collectDatasetTokens(child, target));
    return target;
}

function run(ctx = {}) {
    const suite = createSuite("classical_sgr_private_material_proof");
    const inventory = ctx.getClassicalSourceGrammarResultSurfaceInventory();
    const privateInventoryAtoms = [
        ...inventory.axes,
        ...inventory.outputs,
    ].filter(atom => atom.binding?.public === false);
    const expectedPrivateIds = [
        ...INTENTIONALLY_UNSURFACED_AXIS_ENTRIES,
        ...INTERNAL_AXIS_ENTRIES,
        ...INTERNAL_OUTPUT_ENTRIES,
    ].map(entry => entry.atomId).sort();
    const privateDispositionCounts = privateInventoryAtoms.reduce(
        (counts, atom) => ({
            ...counts,
            [atom.disposition]: (counts[atom.disposition] || 0) + 1,
        }),
        {}
    );

    suite.eq(
        "the private denominator is the exact 326 unsurfaced plus 17 internal-support partition",
        {
            ledgerIntentionallyUnsurfaced:
                INTENTIONALLY_UNSURFACED_AXIS_ENTRIES.length,
            ledgerAxes: INTERNAL_AXIS_ENTRIES.map(entry => entry.atomId).sort(),
            ledgerOutputs: INTERNAL_OUTPUT_ENTRIES.map(entry => entry.atomId).sort(),
            inventoryCount: privateInventoryAtoms.length,
            inventoryIds: privateInventoryAtoms.map(atom => atom.atomId).sort(),
            dispositionCounts: privateDispositionCounts,
            stagesMatchDisposition: privateInventoryAtoms.every(atom => (
                atom.binding?.stage === (
                    atom.disposition === "intentionally-unsurfaced"
                        ? "grammar"
                        : "internal"
                )
                && atom.authority?.grammarAuthority === false
                && atom.authority?.uiAuthority === "none"
            )),
        },
        {
            ledgerIntentionallyUnsurfaced: 326,
            ledgerAxes: [
                "CAA-vnc-application--coordinate-projection",
                "CAA-vnc-application--operation-plan",
            ],
            ledgerOutputs: [
                "CAO-grammar-nominal-construction--prepared-plan",
                "CAO-nnc-adverbial--prepared-plan",
                "CAO-nnc-adverbial--source-preparation",
                "CAO-nnc-deverbal-construction--prepared-plan",
                "CAO-nnc-ordinary--prepared-plan",
                "CAO-nnc-personal-name--prepared-plan",
                "CAO-nnc-place-gentilic--prepared-plan",
                "CAO-nnc-pronominal--prepared-plan",
                "CAO-nnc-relational--prepared-plan",
                "CAO-vnc-application--prepared-plan",
                "CAO-vnc-denominal--prepared-plan",
                "CAO-vnc-finite-slot--scalar",
                "CAO-vnc-source-selection--scalar",
                "CAO-vnc-transitive-object--scalar",
                "CAO-vnc-verbstem-class--scalar",
            ],
            inventoryCount: 343,
            inventoryIds: expectedPrivateIds,
            dispositionCounts: {
                "intentionally-unsurfaced": 326,
                "internal-support": 17,
            },
            stagesMatchDisposition: true,
        }
    );

    const { cases, execute, vncRequest } = executePrivateOutputCases(ctx);
    INTERNAL_OUTPUT_ENTRIES.forEach(entry => {
        const testCase = cases.get(entry.atomId);
        const receipt = testCase?.execution?.receipt || null;
        const result = receipt?.canonicalResult || null;
        const validator = ctx[testCase?.validator];
        suite.eq(
            `${entry.atomId} executes its declared canonical capability`,
            {
                configured: Boolean(testCase),
                error: testCase?.execution?.error || "",
                receiptCanonical:
                    ctx.isClassicalGrammarApplicationResult(receipt),
                authorizationStatus: receipt?.authorizationStatus || "",
                operationId: receipt?.operationId || "",
                outputKind: receipt?.outputKind || "",
                capabilityName: receipt?.capabilityName || "",
                resultKind: result?.kind || "",
                resultAuthorized:
                    result?.authorizationStatus
                    || result?.proofFrame?.authorizationStatus
                    || "",
                validatorAvailable: typeof validator === "function",
                validatorAcceptsIssued:
                    typeof validator === "function" && validator(result),
                validatorRejectsCopy:
                    typeof validator === "function"
                    && validator({ ...result }) === false,
                noCallerAuthority:
                    receipt?.formulaStringAuthority === false
                    && receipt?.surfaceStringAuthority === false
                    && receipt?.displayTextAuthority === false,
            },
            {
                configured: true,
                error: "",
                receiptCanonical: true,
                authorizationStatus: "authorized",
                operationId: entry.operationId,
                outputKind: entry.outputKind,
                capabilityName: entry.capabilityName,
                resultKind: entry.resultKinds[0],
                resultAuthorized: "authorized",
                validatorAvailable: true,
                validatorAcceptsIssued: true,
                validatorRejectsCopy: true,
                noCallerAuthority: true,
            }
        );
    });

    const preparedPlanEntries = INTERNAL_OUTPUT_ENTRIES.filter(
        entry => entry.outputKind === "prepared-plan"
    );
    preparedPlanEntries.forEach(entry => {
        const plan = cases.get(entry.atomId)?.execution?.receipt?.canonicalResult;
        const copiedProjection = execute(
            entry.operationId,
            "coordinate-projection",
            [{
                kind: plan?.kind,
                version: plan?.version,
                authorizationStatus: plan?.authorizationStatus,
            }]
        );
        suite.eq(
            `${entry.atomId} cannot be copied into its downstream canonical projection`,
            {
                error: copiedProjection.error,
                authorizationStatus:
                    copiedProjection.receipt?.authorizationStatus || "",
                blockReason: copiedProjection.receipt?.blockReason || "",
                canonicalResult:
                    copiedProjection.receipt?.canonicalResult ?? null,
            },
            {
                error: "",
                authorizationStatus: "blocked",
                blockReason:
                    "classical-grammar-application-request-invalid:issued-authorized-prepared-plan-required",
                canonicalResult: null,
            }
        );
    });

    const adverbialPotential = cases.get(
        "CAO-nnc-adverbial--source-preparation"
    )?.execution?.receipt?.canonicalResult;
    const acceptedAdverbial = execute("nnc:adverbial", "scalar", [{
        adverbialPotentialFrame: adverbialPotential,
    }]);
    const copiedAdverbial = execute("nnc:adverbial", "scalar", [{
        adverbialPotentialFrame: { ...adverbialPotential },
    }]);
    suite.eq(
        "the internal adverbial Source preparation is consumable only by owner identity",
        {
            issued: acceptedAdverbial.receipt?.authorizationStatus || "",
            copied: copiedAdverbial.receipt?.authorizationStatus || "",
            copiedResultStatus:
                copiedAdverbial.receipt?.canonicalResult
                    ?.authorizationStatus || "",
            copiedBlockReason:
                copiedAdverbial.receipt?.canonicalResult?.blockReason || "",
            copiedFormula:
                copiedAdverbial.receipt?.canonicalResult
                    ?.formulaRealization || "",
            copiedSurface:
                copiedAdverbial.receipt?.canonicalResult
                    ?.surfaceRealization || "",
        },
        {
            issued: "authorized",
            copied: "blocked",
            copiedResultStatus: "blocked",
            copiedBlockReason:
                "owner-issued-adverbial-potential-frame-required",
            copiedFormula: "",
            copiedSurface: "",
        }
    );

    const vncPlan = cases.get(
        "CAO-vnc-application--prepared-plan"
    )?.execution?.receipt?.canonicalResult;
    const vncCoordinate = {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
    };
    const vncProjection = execute(
        "vnc:application",
        "coordinate-projection",
        [vncPlan, [vncCoordinate]]
    );
    const vncScalar = execute(
        "vnc:application",
        "scalar",
        [{ ...vncRequest, ...vncCoordinate }]
    );
    const projected = vncProjection.receipt?.canonicalResult?.[0] || null;
    const scalar = vncScalar.receipt?.canonicalResult?.resultFrame || null;
    suite.eq(
        "CAA-vnc-application--operation-plan executes as the owner-issued application plan",
        {
            planIssued: ctx.isClassicalNahuatlVncParadigmPlan(vncPlan),
            planStatus: vncPlan?.authorizationStatus || "",
            operationIdentity: vncPlan?.sourceOperationSignature ? true : false,
            typedSourceAuthority: vncPlan?.typedSourceAuthority === true,
            callerAuthority: vncPlan?.callerSuppliedAuthorityAccepted === true,
        },
        {
            planIssued: true,
            planStatus: "authorized",
            operationIdentity: true,
            typedSourceAuthority: true,
            callerAuthority: false,
        }
    );
    suite.eq(
        "CAA-vnc-application--coordinate-projection executes pointwise through the canonical plan",
        {
            receipt: vncProjection.receipt?.authorizationStatus || "",
            resultKind: projected?.kind || "",
            issued: ctx.isClassicalNahuatlVncParadigmCoordinateFrame(
                projected
            ),
            scalarReceipt: vncScalar.receipt?.authorizationStatus || "",
            sameFormula:
                projected?.formulaRealization === scalar?.formulaRealization,
            sameSurface:
                projected?.surfaceRealization === scalar?.surfaceRealization,
            scalarEquivalent: projected?.scalarEquivalent === true,
        },
        {
            receipt: "authorized",
            resultKind:
                "classical-nahuatl-vnc-paradigm-coordinate-frame",
            issued: true,
            scalarReceipt: "authorized",
            sameFormula: true,
            sameSurface: true,
            scalarEquivalent: true,
        }
    );

    const privateIds = new Set(expectedPrivateIds);
    const publicSource = `${INDEX_HTML}\n${SHELL_SOURCE}\n${RENDERING_SOURCE}`;
    const literalPublicCarriers = expectedPrivateIds.filter(atomId => (
        publicSource.includes(atomId)
    ));
    suite.eq(
        "private atoms have no literal public markup, control, or Result carrier",
        {
            privateIdsInPublicSource: literalPublicCarriers,
            axesPublicFilter:
                RENDERING_SOURCE.includes("atom.binding?.public === true"),
            resultPublicFilter:
                /const outputAtoms = \(inventory\?\.outputs \|\| \[\]\)\.filter\(atom => \(\s*atom\.binding\?\.public === true/u
                    .test(RENDERING_SOURCE),
            noInternalSelector:
                !RENDERING_SOURCE.includes(
                    '"vnc:application/operation-plan":'
                )
                && !RENDERING_SOURCE.includes(
                    '"vnc:application/coordinate-projection":'
                ),
        },
        {
            privateIdsInPublicSource: [],
            axesPublicFilter: true,
            resultPublicFilter: true,
            noInternalSelector: true,
        }
    );

    const documentObject = ctx.document;
    const originalQuerySelector = documentObject.querySelector;
    const originalQuerySelectorAll = documentObject.querySelectorAll;
    const originalGetElementById = documentObject.getElementById;
    const originalCreateElement = documentObject.createElement;
    const grammarControlProbe = createDomProbeElement("control-probe");
    const resultProbe = createDomProbeElement("result-probe");
    let syncResult = false;
    try {
        documentObject.querySelector = () => grammarControlProbe;
        documentObject.querySelectorAll = () => [grammarControlProbe];
        documentObject.getElementById = () => null;
        documentObject.createElement = tagName =>
            createDomProbeElement(tagName);
        syncResult = ctx.syncClassicalSourceGrammarResultSurface(
            vncScalar.receipt?.canonicalResult,
            resultProbe
        );
    } finally {
        documentObject.querySelector = originalQuerySelector;
        documentObject.querySelectorAll = originalQuerySelectorAll;
        documentObject.getElementById = originalGetElementById;
        documentObject.createElement = originalCreateElement;
    }
    const emittedDomTokens = [
        ...collectDatasetTokens(grammarControlProbe),
        ...collectDatasetTokens(resultProbe),
    ];
    suite.eq(
        "the production SGR correlation pass emits no private DOM carrier",
        {
            syncResult,
            publicInteractiveBindings:
                String(
                    grammarControlProbe.dataset.classicalSurfaceAtomIds || ""
                ).split(/\s+/u).filter(Boolean).length,
            emittedPrivateIds: emittedDomTokens.filter(token =>
                privateIds.has(token)
            ),
            resultAuthority:
                resultProbe.dataset.classicalSgrResultAuthority || "",
            grammarAuthority:
                resultProbe.dataset.classicalGrammarAuthority || "",
        },
        {
            syncResult: true,
            publicInteractiveBindings: 58,
            emittedPrivateIds: [],
            resultAuthority: "canonical-only",
            grammarAuthority: "false",
        }
    );

    return suite;
}

module.exports = { run };
