"use strict";

const { createSuite } = require("./runner");

function makeDirectVncReceipt(ctx, stem = "ahci") {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        args: [{
            sourceStem: stem,
            verbClass: "A",
            sourceValence: "intransitive",
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            requestedDerivation: "direct",
            requestedVoice: "active",
            voice: "active",
        }],
    });
}

function run(ctx) {
    const s = createSuite("classical_grammar_application_atlas_observer");
    const atlasContract = ctx.getClassicalGrammarApplicationInventory()
        .grammaticalRhymeCalibration.grammaticalAtlas;

    s.eq(
        "the canonical application boundary exposes one read-only Atlas observer",
        [
            ctx.APPLICATION_ATLAS_OBSERVATION_KIND,
            typeof ctx.getClassicalGrammarApplicationAtlasObservation,
            typeof ctx.isClassicalGrammarApplicationAtlasObservation,
            typeof ctx.subscribeClassicalGrammarApplicationAtlasObservations,
        ],
        [
            "classical-grammar-application-atlas-observation",
            "function",
            "function",
            "function",
        ]
    );
    s.eq(
        "the application inventory declares one six-field Atlas without giving it grammar authority",
        atlasContract,
        {
            kind: "classical-grammatical-atlas-contract",
            version: 1,
            coordinateSystem: "classical-grammatical-atlas",
            localCoordinateSource:
                "generated-current-lesson-atom-population",
            globalGroupingFields: [
                "requiresPresent",
                "requiresAbsent",
                "adds",
                "removes",
                "preserves",
                "emits",
            ],
            applicationObservationKind:
                "classical-grammar-application-atlas-observation",
            applicationObservationEntrance:
                "executeClassicalGrammarApplicationRequest",
            automaticOwnerCalibrationPopulation:
                "normal-owner-issued-application-observations",
            continuationEdgesRequireExactOwnerIdentity: true,
            resultViewCoordinatesAreLocalPresentationCoordinates: true,
            atlasMayAuthorizeGrammar: false,
            lessonNumberAuthority: false,
            grammarAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        }
    );

    const observations = [];
    const unsubscribe =
        ctx.subscribeClassicalGrammarApplicationAtlasObservations(
            observation => observations.push(observation)
        );
    const receipt = makeDirectVncReceipt(ctx);
    const observation = observations.at(-1);

    s.eq(
        "an authorized Result is observed only after every existing Atlas input is complete",
        {
            receiptStatus: receipt.authorizationStatus,
            observationStatus: observation?.authorizationStatus,
            valid: ctx.isClassicalGrammarApplicationAtlasObservation(
                observation
            ),
            operationId: observation?.operationId,
            applicationIdentity:
                observation?.applicationResult === receipt,
            resultIdentity:
                observation?.canonicalResult === receipt.canonicalResult,
            fullPinIdentity:
                observation?.rhymeFullPinFrame
                    === ctx.getClassicalGrammarApplicationRhymeFullPin(
                        receipt
                    ),
            calibrationIdentity:
                observation?.rhymeCalibrationFrame
                    === ctx.getClassicalGrammarApplicationRhymeCalibration(
                        receipt
                    ),
            layerGraphIdentity:
                observation?.layerGraph
                    === ctx.getClassicalGrammarApplicationLayerGraph(
                        receipt
                    ),
            evaluationOrderIdentity:
                observation?.evaluationOrderFrame
                    === ctx.getClassicalGrammarApplicationEvaluationOrder(
                        receipt
                    ),
            grammarAuthority: observation?.grammarAuthority,
            frozen: Object.isFrozen(observation),
        },
        {
            receiptStatus: "authorized",
            observationStatus: "observed",
            valid: true,
            operationId: "vnc:application",
            applicationIdentity: true,
            resultIdentity: true,
            fullPinIdentity: true,
            calibrationIdentity: true,
            layerGraphIdentity: true,
            evaluationOrderIdentity: true,
            grammarAuthority: false,
            frozen: true,
        }
    );

    s.eq(
        "exact live identities retrieve the same observation while copies cannot",
        [
            ctx.getClassicalGrammarApplicationAtlasObservation(receipt)
                === observation,
            ctx.getClassicalGrammarApplicationAtlasObservation(
                receipt.canonicalResult
            ) === observation,
            ctx.getClassicalGrammarApplicationAtlasObservation({
                ...receipt,
            }),
            ctx.getClassicalGrammarApplicationAtlasObservation({
                ...receipt.canonicalResult,
            }),
        ],
        [true, true, null, null]
    );

    let immediate = null;
    const stopImmediate =
        ctx.subscribeClassicalGrammarApplicationAtlasObservations(
            current => { immediate = current; }
        );
    s.eq(
        "a late Atlas consumer receives the latest exact observation without replaying grammar",
        immediate === observation,
        true
    );
    stopImmediate();

    const countBeforeUnsubscribe = observations.length;
    s.eq("the Atlas observation subscription is removable", unsubscribe(), true);
    makeDirectVncReceipt(ctx, "chōca");
    s.eq(
        "a removed observer receives no later applications",
        observations.length,
        countBeforeUnsubscribe
    );

    let throwingObserverCalls = 0;
    const stopThrowing =
        ctx.subscribeClassicalGrammarApplicationAtlasObservations(() => {
            throwingObserverCalls += 1;
            throw new Error("diagnostics-must-not-interrupt-grammar");
        });
    const unaffectedReceipt = makeDirectVncReceipt(ctx, "nemi");
    stopThrowing();
    s.eq(
        "an Atlas observer failure cannot interrupt or alter canonical grammar",
        {
            calls: throwingObserverCalls > 0,
            authorizationStatus: unaffectedReceipt.authorizationStatus,
            canonicalResultPresent: Boolean(
                unaffectedReceipt.canonicalResult
            ),
            observationValid:
                ctx.isClassicalGrammarApplicationAtlasObservation(
                    ctx.getClassicalGrammarApplicationAtlasObservation(
                        unaffectedReceipt
                    )
                ),
        },
        {
            calls: true,
            authorizationStatus: "authorized",
            canonicalResultPresent: true,
            observationValid: true,
        }
    );

    return s;
}

module.exports = { run };
