"use strict";

const { createSuite } = require("./runner");

function exactDescriptorForge(value) {
    return Object.freeze(Object.defineProperties(
        {},
        Object.getOwnPropertyDescriptors(value)
    ));
}

function hostileIdentitySummary(ctx, validatorName, value) {
    const validator = ctx[validatorName];
    return {
        ownerIssued: validator(value),
        exactKindCopyAccepted: validator({ ...value }),
        jsonCopyAccepted: validator(
            JSON.parse(JSON.stringify(value))
        ),
        exactDescriptorForgeAccepted: validator(
            exactDescriptorForge(value)
        ),
    };
}

function run(ctx) {
    const s = createSuite("classical_foundational_owner_identity");

    const intransitiveOptions = {
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        verbClass: "B",
    };
    const nuclearClauseOptions = {
        nuclearClauseKind: "verbal-nuclear-clause",
        transitivity: "intransitive",
        valenceArity: "vacant",
    };
    const transitiveOptions = {
        tenseMode: "verbo",
        transitivity: "transitive",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        object: "2sg",
    };
    const verbstemOptions = {
        valence: "intransitive",
        subject: "1sg",
        mood: "indicative",
        tense: "preterit",
        verbClass: "B",
    };
    const finiteOwner =
        ctx.buildClassicalNahuatlFiniteVncResult(
            "(nemi)",
            intransitiveOptions
        );
    const nncSlot = ctx.buildClassicalNahuatlNncSlotFrame({
        sourceFrameKind: "typed-foundational-owner-test-source",
        sourceAuthorizationStatus: "authorized",
        stem: "cal",
        stateFrame: {
            authorizationStatus: "authorized",
            arity: "vacant",
            slots: [],
        },
        personFrame: {
            authorizationStatus: "authorized",
            subject: "1sg",
            pers1: "ni",
            pers2: "0",
        },
        numberFrame: {
            authorizationStatus: "authorized",
            subject: "1sg",
            num1: "0",
            num2: "0",
        },
    });
    const placeRequest = {
        constructionKind: "gentilic",
        formation: "ca-pan-eca",
        source: { placeStem: "Izta-pan" },
        subject: "1sg",
        state: "absolutive",
        nounClass: "tl",
        pluralConnector: "0-h",
    };

    const scalarCases = [
        {
            id: "vnc:nuclear-clause",
            validator: "isClassicalNahuatlNuclearClauseResult",
            ownerResult:
                ctx.buildClassicalNahuatlNuclearClauseResult(
                    "(nemi)",
                    nuclearClauseOptions
                ),
            args: ["(nemi)", nuclearClauseOptions],
        },
        {
            id: "vnc:finite-slot",
            validator: "isClassicalNahuatlFiniteVncResult",
            ownerResult: finiteOwner,
            args: ["(nemi)", intransitiveOptions],
        },
        {
            id: "nnc:diagram",
            validator: "isClassicalNahuatlNncDiagrammaticFrame",
            ownerResult:
                ctx.buildClassicalNahuatlNncDiagrammaticFrame(nncSlot),
            args: [nncSlot],
        },
        {
            id: "vnc:diagram",
            validator: "isClassicalNahuatlVncDiagrammaticFrame",
            ownerResult:
                ctx.buildClassicalNahuatlVncDiagrammaticFrame(
                    finiteOwner.vncSlotFrame
                ),
            args: [finiteOwner.vncSlotFrame],
        },
        {
            id: "vnc:source-selection",
            validator:
                "isClassicalNahuatlFuenteSourceSelectionFrame",
            ownerResult:
                ctx.buildClassicalNahuatlFuenteSourceSelectionFrame(
                    "(nemi)"
                ),
            args: ["(nemi)"],
        },
        {
            id: "vnc:transitive-object",
            validator:
                "isClassicalNahuatlTransitiveVncObjectFrame",
            ownerResult:
                ctx.buildClassicalNahuatlTransitiveVncObjectFrame(
                    "(itta)",
                    transitiveOptions
                ),
            args: ["(itta)", transitiveOptions],
        },
        {
            id: "vnc:verbstem-class",
            validator:
                "isClassicalNahuatlVerbstemClassFrame",
            ownerResult:
                ctx.buildClassicalNahuatlVerbstemClassFrame(
                    "(miqui)",
                    verbstemOptions
                ),
            args: ["(miqui)", verbstemOptions],
        },
        {
            id: "nnc:place-gentilic",
            validator: "isPlaceGentilicNncFrame",
            ownerResult: ctx.evaluatePlaceGentilicNnc(placeRequest),
            args: [placeRequest],
        },
    ];

    const scalarReceipts = scalarCases.map((entry) => ({
        ...entry,
        receipt: ctx.executeClassicalGrammarApplicationRequest({
            operationId: entry.id,
            args: entry.args,
        }),
    }));

    s.eq(
        "every foundational scalar route accepts its owner-issued result through the one application boundary",
        scalarReceipts.map((entry) => ({
            id: entry.id,
            directOwnerIssued: ctx[entry.validator](entry.ownerResult),
            applicationStatus: entry.receipt.authorizationStatus,
            applicationOwnerIssued: ctx[entry.validator](
                entry.receipt.canonicalResult
            ),
            resultKind: entry.receipt.canonicalResult?.kind || "",
        })),
        scalarReceipts.map((entry) => ({
            id: entry.id,
            directOwnerIssued: true,
            applicationStatus: "authorized",
            applicationOwnerIssued: true,
            resultKind: entry.ownerResult.kind,
        }))
    );

    s.eq(
        "exact-kind spread copies, JSON copies, and descriptor-perfect forgeries cannot impersonate foundational owner issuance",
        scalarCases.map((entry) => ({
            id: entry.id,
            ...hostileIdentitySummary(
                ctx,
                entry.validator,
                entry.ownerResult
            ),
        })),
        scalarCases.map((entry) => ({
            id: entry.id,
            ownerIssued: true,
            exactKindCopyAccepted: false,
            jsonCopyAccepted: false,
            exactDescriptorForgeAccepted: false,
        }))
    );

    const hostileSentenceInput = Object.freeze({
        kind: "hostile-vnc-lookalike",
    });
    const blockedOwnerResult =
        ctx.buildClassicalNahuatlVncSentenceResultFrame(
            hostileSentenceInput
        );
    const blockedApplicationReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:sentence-result",
            args: [hostileSentenceInput],
        });

    s.eq(
        "an owner-issued rejection preserves its exact reason without becoming a canonical Result",
        {
            ownerStatus: blockedOwnerResult.authorizationStatus,
            ownerReason: blockedOwnerResult.blockReason,
            applicationStatus:
                blockedApplicationReceipt.authorizationStatus,
            applicationReason:
                blockedApplicationReceipt.blockReason,
            canonicalResult:
                blockedApplicationReceipt.canonicalResult,
            applicationReceiptValid:
                ctx.isClassicalGrammarApplicationResult(
                    blockedApplicationReceipt
                ),
        },
        {
            ownerStatus: "blocked",
            ownerReason: "canonical-vnc-application-frame-required",
            applicationStatus: "blocked",
            applicationReason: "canonical-vnc-application-frame-required",
            canonicalResult: null,
            applicationReceiptValid: true,
        }
    );

    const ownerPlan =
        ctx.buildPlaceGentilicNncParadigmPlan(placeRequest);
    const ownerCoordinates =
        ctx.projectPlaceGentilicNncParadigmCoordinates(ownerPlan);
    const applicationPlanReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:place-gentilic",
            outputKind: "prepared-plan",
            args: [placeRequest],
        });
    const applicationCoordinateReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:place-gentilic",
            outputKind: "coordinate-projection",
            args: [applicationPlanReceipt.canonicalResult],
        });

    s.eq(
        "place-gentilic prepared plans and every pointwise coordinate retain owner identity through the application boundary",
        {
            directPlan:
                ctx.isPlaceGentilicNncParadigmPlan(ownerPlan),
            directCoordinateCount: ownerCoordinates.length,
            directCoordinates: ownerCoordinates.every(
                ctx.isPlaceGentilicNncParadigmCoordinate
            ),
            applicationPlanStatus:
                applicationPlanReceipt.authorizationStatus,
            applicationPlan:
                ctx.isPlaceGentilicNncParadigmPlan(
                    applicationPlanReceipt.canonicalResult
                ),
            applicationCoordinateStatus:
                applicationCoordinateReceipt.authorizationStatus,
            applicationCoordinateCount:
                applicationCoordinateReceipt.canonicalResult?.length || 0,
            applicationCoordinates:
                applicationCoordinateReceipt.canonicalResult?.every(
                    ctx.isPlaceGentilicNncParadigmCoordinate
                ) === true,
        },
        {
            directPlan: true,
            directCoordinateCount: 6,
            directCoordinates: true,
            applicationPlanStatus: "authorized",
            applicationPlan: true,
            applicationCoordinateStatus: "authorized",
            applicationCoordinateCount: 6,
            applicationCoordinates: true,
        }
    );

    s.eq(
        "place-gentilic plan and coordinate copies cannot cross the pointwise owner boundary",
        {
            plan: hostileIdentitySummary(
                ctx,
                "isPlaceGentilicNncParadigmPlan",
                ownerPlan
            ),
            coordinates: ownerCoordinates.map((coordinate) =>
                hostileIdentitySummary(
                    ctx,
                    "isPlaceGentilicNncParadigmCoordinate",
                    coordinate
                )),
        },
        {
            plan: {
                ownerIssued: true,
                exactKindCopyAccepted: false,
                jsonCopyAccepted: false,
                exactDescriptorForgeAccepted: false,
            },
            coordinates: Array(6).fill({
                ownerIssued: true,
                exactKindCopyAccepted: false,
                jsonCopyAccepted: false,
                exactDescriptorForgeAccepted: false,
            }),
        }
    );

    const inventory = ctx.getClassicalGrammarApplicationInventory();
    const outputValidatorAudit = inventory.operations.flatMap(
        (operation) => operation.outputCapabilities.map((output) => ({
            operationId: operation.operationId,
            outputKind: output.outputKind,
            validatorNames: output.validatorNames,
            validatorsInstalled: output.validatorsInstalled,
        }))
    );
    s.eq(
        "every declared operation and output kind has an installed canonical owner validator",
        {
            allOutputsHaveOwnerValidators:
                inventory.allOutputsHaveOwnerValidators,
            allOwnerValidatorsInstalled:
                inventory.allOwnerValidatorsInstalled,
            missingOwnerValidatorOutputs:
                inventory.missingOwnerValidatorOutputs,
            emptyValidatorContracts: outputValidatorAudit.filter(
                (output) => output.validatorNames.length === 0
            ),
            uninstalledValidatorContracts: outputValidatorAudit.filter(
                (output) => output.validatorsInstalled !== true
            ),
        },
        {
            allOutputsHaveOwnerValidators: true,
            allOwnerValidatorsInstalled: true,
            missingOwnerValidatorOutputs: [],
            emptyValidatorContracts: [],
            uninstalledValidatorContracts: [],
        }
    );

    return s;
}

module.exports = { run };
