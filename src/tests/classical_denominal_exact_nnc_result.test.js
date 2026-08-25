"use strict";

const { createSuite } = require("./runner");

function ordinaryNncResult(ctx) {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "mich",
    });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: "absolutive",
            subject: "3sg",
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return ctx.requestClassicalOrdinaryNncResult(source, operation);
}

function run(ctx = {}) {
    const suite = createSuite("classical_denominal_exact_nnc_result");
    const canonicalNncResult = ordinaryNncResult(ctx);
    const inventory =
        ctx.getClassicalNahuatlDenominalVncOperationPathInventory({
            canonicalNncResult,
        });
    const inceptive = inventory.pathChoices.find(
        (choice) =>
            choice.operationPath.join(">") === "inceptive-ti"
            && choice.finalClassChoice === "A"
    );

    suite.eq(
        "an exact issued NNC Result alone can issue denominal paths",
        {
            result: ctx.isClassicalNahuatlOrdinaryNncResult(
                canonicalNncResult
            ),
            inventory:
                ctx.isClassicalNahuatlDenominalVncOperationPathInventory(
                    inventory
                ),
            exactInventoryIdentity:
                inventory.canonicalNncResult === canonicalNncResult,
            exactProjectionIdentity:
                inventory.canonicalNncSourceProjection
                    ?.canonicalResultFrame === canonicalNncResult,
            sourceRequestKeys: Object.keys(inceptive.sourceRequest),
            exactSourceRequestIdentity:
                inceptive.sourceRequest.canonicalNncResult
                    === canonicalNncResult,
        },
        {
            result: true,
            inventory: true,
            exactInventoryIdentity: true,
            exactProjectionIdentity: true,
            sourceRequestKeys: ["canonicalNncResult"],
            exactSourceRequestIdentity: true,
        }
    );

    const result = ctx.evaluateClassicalNahuatlDenominalVnc({
        ...inceptive.sourceRequest,
        operationPath: inceptive.operationPath,
        classChoices: inceptive.classChoices,
        subject: "3sg",
        mood: "indicative",
        tense: "present",
    });
    suite.eq(
        "denominal execution retains the exact NNC Result through Source and Result",
        {
            authorized:
                ctx.isClassicalNahuatlDenominalVncResultFrame(result),
            exactSourceIdentity:
                result.sourceFrame.canonicalNncResult
                    === canonicalNncResult,
            exactResultIdentity:
                result.canonicalNncResult === canonicalNncResult,
            projectionIdentity:
                result.canonicalNncSourceProjection
                    === inventory.canonicalNncSourceProjection,
            identityPreserved: result.exactResultIdentityPreserved,
            formula: result.formulaRealization,
            surface: result.surfaceRealization,
        },
        {
            authorized: true,
            exactSourceIdentity: true,
            exactResultIdentity: true,
            projectionIdentity: true,
            identityPreserved: true,
            formula: "#0-0(mich-ti)0+0-0#",
            surface: "michti",
        }
    );

    const copied =
        ctx.getClassicalNahuatlDenominalVncOperationPathInventory({
            canonicalNncResult: { ...canonicalNncResult },
        });
    const stringCarrier =
        ctx.getClassicalNahuatlDenominalVncOperationPathInventory({
            canonicalNncResult: canonicalNncResult.surfaceRealization,
        });
    const mixed =
        ctx.getClassicalNahuatlDenominalVncOperationPathInventory({
            canonicalNncResult,
            nounStem: "mich",
        });
    suite.eq(
        "copies, strings, and mixed string provenance cannot authorize the exact route",
        [
            copied.authorizationStatus,
            copied.blockReason,
            stringCarrier.authorizationStatus,
            stringCarrier.blockReason,
            mixed.authorizationStatus,
            mixed.blockReason,
        ],
        [
            "blocked",
            "denominal-exact-nnc-result-not-issued-by-canonical-owner",
            "blocked",
            "denominal-exact-nnc-result-not-issued-by-canonical-owner",
            "blocked",
            "denominal-exact-nnc-source-fields-are-mutually-exclusive",
        ]
    );

    const legacy = ctx.evaluateClassicalNahuatlDenominalVnc({
        nounStem: "mich",
        sourceKind: "nounstem",
        sourceState: "absolutive",
        operationId: "inceptive-ti",
        classChoice: "A",
        subject: "3sg",
    });
    suite.ok(
        "the existing typed-string Source route remains compatible",
        ctx.isClassicalNahuatlDenominalVncResultFrame(legacy)
    );

    return suite;
}

module.exports = { run };
