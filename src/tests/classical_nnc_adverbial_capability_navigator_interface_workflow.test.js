"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const suite = createSuite(
        "classical_nnc_adverbial_capability_navigator_interface_workflow"
    );
    const rendering = fs.readFileSync(
        path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
        "utf8"
    );
    const exactSource = ctx.issueCanonicalNncSourceFrame({
        stem: "achi",
        sourceClass: "zero",
    });
    const sourceNavigator = ctx
        .getClassicalGrammarApplicationCapabilityNavigator(exactSource);
    const sourceBinding = ctx
        .issueClassicalGrammarTypedSourceOperationBindingFrame(
            sourceNavigator,
            "nnc:ordinary",
            {}
        );
    const ordinaryReceipt = ctx
        .executeClassicalGrammarTypedSourceOperationBindingFrame(
            sourceBinding
        );
    const ordinaryResult = ordinaryReceipt?.canonicalResult || null;
    const resultNavigator = ctx
        .getClassicalGrammarApplicationCapabilityNavigator(ordinaryResult);
    const operation = resultNavigator?.operations?.find(candidate => (
        candidate.operationId === "nnc:adverbial"
    ));
    const initial = operation?.ownerBindingFrame || null;

    suite.eq(
        "the exact NNC Result exposes only the adverbial owner's genuine scope choice",
        {
            source: [
                ctx.isClassicalNahuatlOrdinaryNncResult(ordinaryResult),
                ordinaryResult?.sourceFrame === exactSource,
            ],
            navigator: [
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    resultNavigator
                ),
                operation?.availabilityStatus,
                operation?.ownerBindingFrameValidated,
            ],
            binding: [
                ctx.isClassicalGrammarFormationResultBindingFrame(initial),
                initial?.ownerChoiceFrameValidated,
                initial?.requiredChoiceIds,
                initial?.ownerChoiceOptionProjection?.scope,
                initial?.exactResult === ordinaryResult,
            ],
        },
        {
            source: [true, true],
            navigator: [true, "available", true],
            binding: [
                true,
                true,
                ["scope"],
                ["external-clause", "incorporated-predicate"],
                true,
            ],
        }
    );

    const ready = ctx.issueClassicalGrammarFormationResultBindingFrame(
        "nnc:adverbial",
        ordinaryResult,
        { scope: "external-clause" }
    );
    const invalid = ctx.issueClassicalGrammarFormationResultBindingFrame(
        "nnc:adverbial",
        ordinaryResult,
        { scope: "not-an-owner-option" }
    );
    suite.eq(
        "only an owner-projected scope advances the same exact Result binding to ready",
        {
            ready: [
                ctx.isClassicalGrammarFormationResultBindingFrame(ready),
                ready?.requiredChoiceIds,
                ready?.selectedOwnerChoices?.scope,
                ready?.exactResult === ordinaryResult,
            ],
            invalid: [
                ctx.isClassicalGrammarFormationResultBindingFrame(invalid),
                invalid?.requiredChoiceIds,
            ],
            copied: ctx.isClassicalGrammarFormationResultBindingFrame({
                ...ready,
            }),
        },
        {
            ready: [true, [], "external-clause", true],
            invalid: [true, ["scope"]],
            copied: false,
        }
    );

    const adverbialReceipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:adverbial",
        args: [{
            canonicalSourceResult: ordinaryResult,
            degree: ready.ownerChoiceFrame.allowedDegrees[0],
            scope: "external-clause",
            context: {},
        }],
    });
    const adverbialResult = adverbialReceipt?.canonicalResult || null;
    suite.eq(
        "the staged choice reaches one exact authorized Result and the interface wires it to the shared review panel",
        {
            receipt: [
                ctx.isClassicalGrammarApplicationResult(adverbialReceipt),
                adverbialReceipt?.authorizationStatus,
                adverbialReceipt?.operationId,
            ],
            result: [
                ctx.isClassicalNahuatlAdverbialNuclearResult(
                    adverbialResult
                ),
                adverbialResult?.canonicalSourceResult === ordinaryResult,
                adverbialResult?.operationFrame?.scope,
            ],
            interfaceWiring: [
                rendering.includes(
                    'binding.operationId === "nnc:adverbial"'
                ),
                rendering.includes(
                    'current.operationId === "nnc:adverbial"'
                ),
                rendering.includes(
                    'selectedConstruction: "adverbial-nuclear"'
                ),
                rendering.includes(
                    "renderClassicalNominalConstructionSurfaceBlock("
                ),
                rendering.includes(
                    'requireSelection: requiresChoice("scope")'
                ),
            ],
        },
        {
            receipt: [true, "authorized", "nnc:adverbial"],
            result: [true, true, "external-clause"],
            interfaceWiring: [true, true, true, true, true],
        }
    );

    return suite;
}

module.exports = { run };
