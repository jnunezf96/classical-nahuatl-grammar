"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function issueOrdinary(ctx, stem = "mich") {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: "absolutive",
            subject: "3sg",
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:ordinary",
        args: [source, operation],
    });
}

function run(ctx = {}) {
    const suite = createSuite(
        "classical_formation_capability_navigator_interface_workflow"
    );
    const rendering = fs.readFileSync(
        path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
        "utf8"
    );
    const ordinary = issueOrdinary(ctx);
    const exactNnc = ordinary.canonicalResult;

    const denominalInitial = ctx
        .issueClassicalGrammarFormationResultBindingFrame(
            "vnc:denominal",
            exactNnc,
            {}
        );
    const denominalPath = denominalInitial.ownerPreflightFrame
        .pathChoices[0];
    const denominalAfterOperation = ctx
        .issueClassicalGrammarFormationResultBindingFrame(
            "vnc:denominal",
            exactNnc,
            { denominalOperation: denominalPath.operationId }
        );
    const denominalReady = ctx
        .issueClassicalGrammarFormationResultBindingFrame(
            "vnc:denominal",
            exactNnc,
            {
                denominalOperation: denominalPath.operationId,
                denominalOperationPath: denominalPath.pathChoiceId,
            }
        );
    const denominal = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:denominal",
        args: [{
            ...denominalPath.sourceRequest,
            operationId: denominalPath.operationId,
            operationPath: denominalPath.operationPath,
            classChoice: denominalPath.finalClassChoice,
            classChoices: denominalPath.classChoices,
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            outputScope: "single",
        }],
    });

    const placeInitial = ctx.issueClassicalGrammarFormationResultBindingFrame(
        "nnc:place-gentilic",
        exactNnc,
        {}
    );
    const placeReady = ctx.issueClassicalGrammarFormationResultBindingFrame(
        "nnc:place-gentilic",
        exactNnc,
        { constructionKind: "place-name", formation: "co" }
    );
    const place = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:place-gentilic",
        args: [{
            canonicalNncResult: exactNnc,
            constructionKind: "place-name",
            formation: "co",
            usage: "adverbial",
        }],
    });

    suite.eq(
        "denominal and place pathways advance only through owner-validated choices and preserve the exact Result",
        {
            denominalProgression: [
                denominalInitial.requiredChoiceIds,
                denominalAfterOperation.requiredChoiceIds,
                denominalReady.requiredChoiceIds,
            ],
            denominalResult: [
                denominal.authorizationStatus,
                denominal.canonicalResult?.canonicalNncResult === exactNnc,
            ],
            placeProgression: [
                placeInitial.requiredChoiceIds,
                placeReady.requiredChoiceIds,
            ],
            placeResult: [
                place.authorizationStatus,
                place.canonicalResult?.canonicalNncResult === exactNnc,
            ],
        },
        {
            denominalProgression: [
                ["classical-denominal-vnc-operation"],
                ["classical-denominal-vnc-operation-path"],
                [],
            ],
            denominalResult: ["authorized", true],
            placeProgression: [[
                "classical-place-gentilic-result-kind",
                "classical-place-gentilic-formation",
            ], []],
            placeResult: ["authorized", true],
        }
    );

    suite.ok(
        "the interface stages explicit prompts and sends ready formation requests through the one Result panel",
        rendering.includes("Choose a denominal operation")
        && rendering.includes("Choose an operation path")
        && rendering.includes("Choose a place or gentilic Result")
        && rendering.includes("Choose a formation")
        && rendering.includes(
            '"nnc:deverbal-construction",\n          "nnc:place-gentilic",\n          "vnc:denominal",'
        )
        && rendering.includes(
            'current.operationId === "nnc:relational"'
        )
        && rendering.includes(
            "renderClassicalCapabilityApplicationResultForReview("
        )
        && rendering.includes(
            "renderClassicalNominalConstructionSurfaceBlock("
        )
    );

    return suite;
}

module.exports = { run };
