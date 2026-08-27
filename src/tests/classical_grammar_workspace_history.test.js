"use strict";

const path = require("path");
const { spawnSync } = require("child_process");
const { pathToFileURL } = require("url");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function probeHistory() {
    const moduleUrl = pathToFileURL(path.join(
        ROOT,
        "src/application/classical/grammar_workspace_history.mjs"
    )).href;
    const script = `
      const {
        createClassicalGrammarWorkspaceHistory,
        installClassicalGrammarWorkspaceHistoryGlobals,
      } =
        await import(${JSON.stringify(moduleUrl)});
      const issuedApplications = new WeakSet();
      const issuedResults = new WeakMap();
      const issuedCaptures = new WeakSet();
      const issuedNavigators = new WeakSet();
      let receiptSequence = 0;
      const issue = (operationId, available) => {
        const canonicalResult = Object.freeze({
          kind: operationId + "-result",
          receipt: ++receiptSequence,
        });
        const applicationResult = Object.freeze({
          authorizationStatus: "authorized",
          operationId,
          outputKind: "scalar",
          canonicalResult,
        });
        issuedApplications.add(applicationResult);
        issuedResults.set(canonicalResult, applicationResult);
        const navigator = Object.freeze({
          operations: Object.freeze(available.map(id => Object.freeze({
            operationId: id,
            availabilityStatus: "available",
          }))),
        });
        issuedNavigators.add(navigator);
        issuedResults.set(navigator, canonicalResult);
        return { applicationResult, canonicalResult, navigator };
      };
      const a = issue("nnc:ordinary", ["vnc:denominal", "nnc:diagram"]);
      const b = issue("vnc:denominal", [
        "vnc:application",
        "vnc:diagram",
        "clause:composition",
      ]);
      const c = issue("nnc:adjectival-modification", [
        "nnc:diagram",
        "nnc:personal-name",
        "clause:composition",
      ]);
      const particle = issue("particle:result", [
        "sentence:particle-adjunction",
        "particle:negative-selection",
      ]);
      const navigatorByResult = new Map([
        [a.canonicalResult, a.navigator],
        [b.canonicalResult, b.navigator],
        [c.canonicalResult, c.navigator],
        [particle.canonicalResult, particle.navigator],
      ]);
      const capture = (value, slotId) => {
        const applicationResult = issuedApplications.has(value)
          ? value
          : issuedResults.get(value) || null;
        if (!applicationResult || !slotId) return Object.freeze({
          kind: "classical-grammar-application-result-capture",
          authorizationStatus: "blocked",
        });
        const frame = Object.freeze({
          kind: "classical-grammar-application-result-capture",
          version: 1,
          authorizationStatus: "authorized",
          slotId,
          operationId: applicationResult.operationId,
          outputKind: applicationResult.outputKind,
          capturedResultRole: "canonical-result",
          applicationResult,
          canonicalResult: applicationResult.canonicalResult,
        });
        issuedCaptures.add(frame);
        return frame;
      };
      const isCapture = (value, slotId = "") => Boolean(
        issuedCaptures.has(value)
        && (!slotId || value.slotId === slotId)
      );
      const history = createClassicalGrammarWorkspaceHistory({
        captureClassicalGrammarApplicationResult: capture,
        isClassicalGrammarApplicationResultCapture: isCapture,
        isClassicalGrammarApplicationResult: value =>
          issuedApplications.has(value),
        getClassicalGrammarApplicationCapabilityNavigator: value =>
          navigatorByResult.get(value) || null,
        isClassicalGrammarApplicationCapabilityNavigator: value =>
          issuedNavigators.has(value),
      });
      const nodeA = history.record(a.applicationResult, { label: "base" });
      const nodeB = history.record(b.canonicalResult, { label: "verb" });
      const branch = history.fork(nodeA.nodeId, "nominal alternative");
      const emptyForkSnapshot = history.snapshot();
      const emptyForkUndo = history.undo();
      const afterEmptyForkUndo = history.snapshot();
      const nodeC = history.record(c.canonicalResult, {
        parentNodeId: nodeA.nodeId,
        branchId: branch.branchId,
        label: "modifier",
      });
      const branchResultSnapshot = history.snapshot();
      const comparison = history.compare(nodeB.nodeId, nodeC.nodeId);
      const undoCapture = history.undo();
      const afterBranchUndo = history.snapshot();
      const continuedCapture = history.continueFrom(nodeB.nodeId);
      const snapshot = history.snapshot();
      const invalidContinue = history.continueFrom("history-missing");
      const afterInvalidContinue = history.snapshot();
      const particleNode = history.record(particle.applicationResult, {
        parentNodeId: nodeB.nodeId,
        branchId: nodeB.branchId,
        label: "attach to the current pathway",
      });
      const particleSnapshot = history.snapshot();
      const particleBranch = particleSnapshot.branches.find(
        candidate => candidate.branchId === particleNode.branchId
      );
      const particleUndo = history.undo();
      const clonedApplication = { ...a.applicationResult };
      const rejectedClone = history.record(clonedApplication);
      let historyUpdateCount = 0;
      const installedTarget = {
        captureClassicalGrammarApplicationResult: capture,
        isClassicalGrammarApplicationResultCapture: isCapture,
        isClassicalGrammarApplicationResult: value =>
          issuedApplications.has(value),
        getClassicalGrammarApplicationCapabilityNavigator: value =>
          navigatorByResult.get(value) || null,
        isClassicalGrammarApplicationCapabilityNavigator: value =>
          issuedNavigators.has(value),
        CustomEvent: class {
          constructor(type, init = {}) {
            this.type = type;
            this.detail = init.detail;
          }
        },
        document: {
          dispatchEvent: event => {
            if (event?.type === "classical:grammar-workspace-history-updated") {
              historyUpdateCount += 1;
            }
          },
        },
      };
      installClassicalGrammarWorkspaceHistoryGlobals(installedTarget);
      const applyToken = installedTarget
        .beginClassicalGrammarWorkspaceUserAction("vnc:denominal");
      const countBeforeApply = installedTarget
        .getClassicalGrammarWorkspaceHistorySnapshot().nodeCount;
      const applyNode = installedTarget
        .completeClassicalGrammarWorkspaceUserAction(
          applyToken,
          b.applicationResult,
        );
      const applySnapshot = installedTarget
        .getClassicalGrammarWorkspaceHistorySnapshot();
      process.stdout.write(JSON.stringify({
        nodeIds: snapshot.nodes.map(node => node.nodeId),
        branchCount: snapshot.branchCount,
        nodeCount: snapshot.nodeCount,
        currentNodeId: snapshot.currentNodeId,
        currentBranchId: snapshot.currentBranchId,
        invalidContinue: {
          rejected: invalidContinue === null,
          currentNodePreserved:
            afterInvalidContinue.currentNodeId === snapshot.currentNodeId,
          currentBranchPreserved:
            afterInvalidContinue.currentBranchId === snapshot.currentBranchId,
        },
        branchAnchor: branch.anchorNodeId,
        nodeBParent: nodeB.parentNodeId,
        nodeCParent: nodeC.parentNodeId,
        branchUndo: {
          emptyCanUndo: emptyForkSnapshot.canUndo,
          emptyDirectUndo: emptyForkUndo === null,
          emptyCurrentNodeId: afterEmptyForkUndo.currentNodeId,
          emptyCurrentBranchId: afterEmptyForkUndo.currentBranchId,
          resultCanUndo: branchResultSnapshot.canUndo,
          restoredNodeId: afterBranchUndo.currentNodeId,
          preservedBranchId: afterBranchUndo.currentBranchId,
          restoredCanUndo: afterBranchUndo.canUndo,
        },
        undoRecoveredA: undoCapture?.canonicalResult === a.canonicalResult,
        continueRecoveredB:
          continuedCapture?.canonicalResult === b.canonicalResult,
        directRecoverC:
          history.recover(nodeC.nodeId)?.canonicalResult === c.canonicalResult,
        rejectedClone: rejectedClone === null,
        comparisonValid: history.isComparison(comparison),
        ancestor: comparison.commonAncestorNodeId,
        leftPath: comparison.leftOperationPath,
        rightPath: comparison.rightOperationPath,
        sharedAvailable: comparison.sharedAvailableOperationIds,
        leftOnly: comparison.leftOnlyAvailableOperationIds,
        rightOnly: comparison.rightOnlyAvailableOperationIds,
        snapshotValid: history.isSnapshot(snapshot),
        frozen: Object.isFrozen(snapshot)
          && Object.isFrozen(snapshot.nodes)
          && snapshot.nodes.every(Object.isFrozen),
        authority: snapshot.grammarAuthority,
        comparisonAuthority: comparison.grammarAuthority,
        particleRoot: {
          parentNodeId: particleNode.parentNodeId,
          depth: particleNode.depth,
          label: particleNode.label,
          newBranch:
            particleNode.branchId !== nodeB.branchId
            && particleSnapshot.branchCount === snapshot.branchCount + 1,
          branchAnchor: particleBranch?.anchorNodeId,
          branchNodeIds: particleBranch?.nodeIds,
          undoAtRoot: particleUndo === null,
        },
        userAction: {
          countBeforeApply,
          nodeCount: applySnapshot.nodeCount,
          operations: applySnapshot.nodes.map(node => node.operationId),
          exactFinalRecorded:
            installedTarget.recoverClassicalGrammarWorkspaceResult(
              applyNode.nodeId,
            )?.applicationResult === b.applicationResult,
          historyUpdateCount,
        },
      }));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { encoding: "utf8" }
    );
    if (result.status !== 0) {
        throw new Error(result.stderr || result.stdout);
    }
    return JSON.parse(result.stdout);
}

function run() {
    const s = createSuite("classical_grammar_workspace_history");
    const proof = probeHistory();

    s.eq(
        "exact Results form two recoverable branches without copying",
        {
            nodeIds: proof.nodeIds,
            branchCount: proof.branchCount,
            nodeCount: proof.nodeCount,
            branchAnchor: proof.branchAnchor,
            nodeBParent: proof.nodeBParent,
            nodeCParent: proof.nodeCParent,
            currentNodeId: proof.currentNodeId,
            currentBranchId: proof.currentBranchId,
            invalidContinue: proof.invalidContinue,
            undoRecoveredA: proof.undoRecoveredA,
            continueRecoveredB: proof.continueRecoveredB,
            directRecoverC: proof.directRecoverC,
            rejectedClone: proof.rejectedClone,
        },
        {
            nodeIds: ["history-1", "history-2", "history-3"],
            branchCount: 2,
            nodeCount: 3,
            branchAnchor: "history-1",
            nodeBParent: "history-1",
            nodeCParent: "history-1",
            currentNodeId: "history-2",
            currentBranchId: "branch-1",
            invalidContinue: {
                rejected: true,
                currentNodePreserved: true,
                currentBranchPreserved: true,
            },
            undoRecoveredA: true,
            continueRecoveredB: true,
            directRecoverC: true,
            rejectedClone: true,
        }
    );

    s.eq(
        "an empty fork cannot undo, while its first Result undoes to the anchor without leaving the fork",
        proof.branchUndo,
        {
            emptyCanUndo: false,
            emptyDirectUndo: true,
            emptyCurrentNodeId: "history-1",
            emptyCurrentBranchId: "branch-2",
            resultCanUndo: true,
            restoredNodeId: "history-1",
            preservedBranchId: "branch-2",
            restoredCanUndo: false,
        }
    );

    s.eq(
        "branch comparison reports divergence from the exact common ancestor",
        {
            valid: proof.comparisonValid,
            ancestor: proof.ancestor,
            leftPath: proof.leftPath,
            rightPath: proof.rightPath,
            sharedAvailable: proof.sharedAvailable,
            leftOnly: proof.leftOnly,
            rightOnly: proof.rightOnly,
        },
        {
            valid: true,
            ancestor: "history-1",
            leftPath: ["vnc:denominal"],
            rightPath: ["nnc:adjectival-modification"],
            sharedAvailable: ["clause:composition"],
            leftOnly: ["vnc:application", "vnc:diagram"],
            rightOnly: ["nnc:diagram", "nnc:personal-name"],
        }
    );

    s.ok(
        "history and comparison are frozen non-authorizing projections",
        proof.snapshotValid
        && proof.frozen
        && proof.authority === false
        && proof.comparisonAuthority === false
    );

    s.eq(
        "a canonical Particle Result starts a new root instead of consuming the current Result",
        proof.particleRoot,
        {
            parentNodeId: "",
            depth: 1,
            label: "particle:result",
            newBranch: true,
            branchAnchor: "",
            branchNodeIds: ["history-4"],
            undoAtRoot: true,
        }
    );

    s.eq(
        "one user Apply records only its final authorized Result",
        proof.userAction,
        {
            countBeforeApply: 0,
            nodeCount: 1,
            operations: ["vnc:denominal"],
            exactFinalRecorded: true,
            historyUpdateCount: 1,
        }
    );

    return s;
}

module.exports = { run };
