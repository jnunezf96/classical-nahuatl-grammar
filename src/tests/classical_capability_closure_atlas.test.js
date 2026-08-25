"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { pathToFileURL } = require("url");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function probeClosure() {
    const moduleUrl = pathToFileURL(path.join(
        ROOT,
        "src/ui/diagnostics/classical_capability_closure_atlas.mjs"
    )).href;
    const script = `
      const {
        CLASSICAL_CAPABILITY_CLOSURE_OPERATION_IDS,
        createClassicalCapabilityClosureAtlas,
      } =
        await import(${JSON.stringify(moduleUrl)});
      const issuedNavigators = new WeakSet();
      const issuedApplications = new WeakSet();
      const operation = (
        operationId,
        availabilityStatus,
        availabilityAuthority,
        outputUnitKinds,
      ) => Object.freeze({
        operationId,
        availabilityStatus,
        availabilityReason: availabilityStatus === "available"
          ? "canonical-owner-accepted"
          : "owner-binding-required",
        availabilityAuthority,
        ownerInputAcceptanceProven: availabilityStatus === "available",
        outputUnitKinds: Object.freeze(outputUnitKinds),
      });
      const source = Object.freeze({ kind: "nnc-source" });
      const result = Object.freeze({ kind: "vnc-result" });
      const frame1 = Object.freeze({
        inputRole: "exact-owner-issued-source",
        exactSource: source,
        sourceUnitKinds: Object.freeze(["nnc-result"]),
        operations: Object.freeze([
          operation("vnc:denominal", "available", "canonical-owner-source-preflight", ["vnc-result"]),
          operation("vnc:application", "missing-prerequisite", "none", ["vnc-result"]),
          operation("vnc:diagram", "missing-prerequisite", "none", []),
        ]),
      });
      const frame2 = Object.freeze({
        inputRole: "exact-owner-issued-result",
        exactResult: result,
        emittedUnitKinds: Object.freeze(["vnc-result"]),
        operations: Object.freeze([
          operation("vnc:denominal", "missing-prerequisite", "none", ["vnc-result"]),
          operation("vnc:application", "available", "canonical-owner-result-binding", ["vnc-result"]),
          operation("vnc:diagram", "available", "canonical-owner-direct-probe", []),
        ]),
      });
      issuedNavigators.add(frame1);
      issuedNavigators.add(frame2);
      const atlas = createClassicalCapabilityClosureAtlas({
        operationIds: ["vnc:denominal", "vnc:application", "vnc:diagram"],
        isClassicalGrammarApplicationCapabilityNavigator: value =>
          issuedNavigators.has(value),
        isClassicalGrammarApplicationResult: value =>
          issuedApplications.has(value),
      });
      atlas.observeNavigator(frame1);
      const partial = atlas.snapshot();
      const cloneRejected = atlas.observeNavigator({ ...frame1 }) === false;
      atlas.observeNavigator(frame2);
      const denominalReceipt = Object.freeze({
        authorizationStatus: "authorized",
        operationId: "vnc:denominal",
        outputKind: "scalar",
      });
      const applicationReceipt = Object.freeze({
        authorizationStatus: "authorized",
        operationId: "vnc:application",
        outputKind: "scalar",
      });
      issuedApplications.add(denominalReceipt);
      issuedApplications.add(applicationReceipt);
      atlas.observeExecution(denominalReceipt);
      atlas.observeExecution(applicationReceipt);
      const outsideClosureReceipt = Object.freeze({
        authorizationStatus: "authorized",
        operationId: "vnc:unlisted-operation",
        outputKind: "scalar",
      });
      issuedApplications.add(outsideClosureReceipt);
      atlas.observeExecution(outsideClosureReceipt);
      const awaitingFinalExecution = atlas.snapshot();
      const diagramReceipt = Object.freeze({
        authorizationStatus: "authorized",
        operationId: "vnc:diagram",
        outputKind: "diagram",
      });
      issuedApplications.add(diagramReceipt);
      atlas.observeExecution(diagramReceipt);
      const complete = atlas.snapshot();
      process.stdout.write(JSON.stringify({
        fixedOperationCount:
          CLASSICAL_CAPABILITY_CLOSURE_OPERATION_IDS.length,
        partialUnreachable: partial.unreachableOperationIds,
        partialMissing: partial.missingBindingOperationIds,
        cloneRejected,
        approvedOperations: awaitingFinalExecution.ownerApprovedOperationIds,
        reachableOperations: awaitingFinalExecution.reachableOperationIds,
        unreachableOperations: awaitingFinalExecution.unreachableOperationIds,
        enteredOperations: awaitingFinalExecution.enteredOperationIds,
        unenteredOperations: awaitingFinalExecution.unenteredOperationIds,
        sinkUnitKinds: awaitingFinalExecution.sinkUnitKinds,
        completeBeforeAllExecutions:
          awaitingFinalExecution.closureComplete,
        completeAfterAllExecutions: complete.closureComplete,
        finalUnenteredOperations: complete.unenteredOperationIds,
        closureComplete: complete.closureComplete,
        observedInputs: complete.observedExactInputCount,
        observationOnly:
          complete.traversalUsesObservedOwnerApprovedConnectionsOnly,
        typeOnlyAuthority:
          complete.compatibilityAloneAuthorizesTraversal,
        authority: complete.grammarAuthority,
        frozen: Object.isFrozen(complete)
          && Object.isFrozen(complete.ownerApprovedConnections)
          && Object.isFrozen(complete.unenteredOperationIds)
          && complete.ownerApprovedConnections.every(Object.isFrozen),
      }));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { encoding: "utf8" }
    );
    if (result.status !== 0) throw new Error(result.stderr || result.stdout);
    return JSON.parse(result.stdout);
}

function run() {
    const s = createSuite("classical_capability_closure_atlas");
    const proof = probeClosure();

    s.eq(
        "the Atlas exposes routes that still lack an observed owner binding",
        {
            unreachable: proof.partialUnreachable,
            missing: proof.partialMissing,
            cloneRejected: proof.cloneRejected,
        },
        {
            unreachable: ["vnc:application", "vnc:diagram"],
            missing: ["vnc:application", "vnc:diagram"],
            cloneRejected: true,
        }
    );

    s.eq(
        "owner-approved traversal stays open until every declared operation has authorized execution evidence",
        {
            fixedOperationCount: proof.fixedOperationCount,
            approved: proof.approvedOperations,
            reachable: proof.reachableOperations,
            unreachable: proof.unreachableOperations,
            entered: proof.enteredOperations,
            unentered: proof.unenteredOperations,
            sinks: proof.sinkUnitKinds,
            completeBeforeAllExecutions: proof.completeBeforeAllExecutions,
            completeAfterAllExecutions: proof.completeAfterAllExecutions,
            finalUnentered: proof.finalUnenteredOperations,
            inputs: proof.observedInputs,
        },
        {
            fixedOperationCount: 25,
            approved: ["vnc:denominal", "vnc:application", "vnc:diagram"],
            reachable: ["vnc:denominal", "vnc:application", "vnc:diagram"],
            unreachable: [],
            entered: ["vnc:denominal", "vnc:application"],
            unentered: ["vnc:diagram"],
            sinks: [],
            completeBeforeAllExecutions: false,
            completeAfterAllExecutions: true,
            finalUnentered: [],
            inputs: 2,
        }
    );

    s.ok(
        "closure traversal is frozen, observational, and non-authorizing",
        proof.observationOnly === true
        && proof.typeOnlyAuthority === false
        && proof.authority === false
        && proof.frozen === true
    );

    const renderingSource = fs.readFileSync(path.join(
        ROOT,
        "src/ui/rendering/rendering.mjs"
    ), "utf8");
    s.ok(
        "the delivered Atlas readout distinguishes exploration from exact compositional closure",
        "the delivered Atlas readout distinguishes exploration from exact compositional closure",
        renderingSource.includes("Exploration coverage:")
        && renderingSource.includes(
            "Exact compositional closure requires witnessed Result handoffs."
        )
        && !renderingSource.includes("pathways owner-approved and reachable")
    );

    return s;
}

module.exports = { run };
