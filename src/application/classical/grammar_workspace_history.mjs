import { exportClassicalResultReloadRecipe, replayClassicalResultReloadRecipe }
  from "./result_reload.mjs?deverbalReload=20261024-8&innerParticle=20261024-1&remainingReload=20261024-1&conjunctReload=20261023-1&nominalReload=20261024-4&complexReload=20261027-1&placeReload=20261027-1";

const CLASSICAL_GRAMMAR_WORKSPACE_HISTORY_KIND =
  "classical-grammar-workspace-history";
const CLASSICAL_GRAMMAR_WORKSPACE_COMPARISON_KIND =
  "classical-grammar-workspace-comparison";

function freezeList(values = []) {
  return Object.freeze([...values]);
}

function unique(values = []) {
  return [...new Set(values)];
}

export function createClassicalGrammarWorkspaceHistory({
  captureClassicalGrammarApplicationResult = null,
  isClassicalGrammarApplicationResultCapture = null,
  isClassicalGrammarApplicationResult = null,
  getClassicalGrammarApplicationCapabilityNavigator = null,
  isClassicalGrammarApplicationCapabilityNavigator = null,
} = {}) {
  if (
    typeof captureClassicalGrammarApplicationResult !== "function"
    || typeof isClassicalGrammarApplicationResultCapture !== "function"
    || typeof isClassicalGrammarApplicationResult !== "function"
  ) {
    throw new TypeError(
      "classical-grammar-workspace-history-application-contract-required",
    );
  }

  const records = new Map();
  const branches = new Map();
  const issuedSnapshots = new WeakSet();
  const issuedComparisons = new WeakSet();
  let nodeSequence = 0;
  let branchSequence = 0;
  let revision = 0;
  let currentNodeId = "";
  let currentBranchId = "";

  function createBranch(anchorNodeId = "", label = "") {
    branchSequence += 1;
    const branchId = `branch-${branchSequence}`;
    branches.set(branchId, {
      branchId,
      anchorNodeId,
      label: String(label || "").trim(),
      nodeIds: [],
    });
    currentBranchId = branchId;
    currentNodeId = anchorNodeId;
    revision += 1;
    return branchId;
  }

  function ensureBranch() {
    return currentBranchId || createBranch("", "Main");
  }

  function getCapture(value = null, nodeId = "") {
    if (
      value
      && typeof value === "object"
      && value.kind === "classical-grammar-application-result-capture"
      && isClassicalGrammarApplicationResultCapture(value)
    ) {
      return value;
    }
    const slotId = `grammar-workspace-history:${nodeId}`;
    const capture = captureClassicalGrammarApplicationResult(value, slotId);
    return isClassicalGrammarApplicationResultCapture(capture, slotId)
      ? capture
      : null;
  }

  function record(value = null, options = {}) {
    nodeSequence += 1;
    const nodeId = `history-${nodeSequence}`;
    const capture = getCapture(value, nodeId);
    if (!capture) return null;
    const applicationResult = capture.applicationResult;
    if (
      !isClassicalGrammarApplicationResult(applicationResult)
      || applicationResult.authorizationStatus !== "authorized"
    ) {
      return null;
    }
    // particle:result constructs its own canonical particle Source. It never
    // consumes the currently selected Result, so its history node must not be
    // attached to that Result merely because it was issued next in time.
    const sourceIndependentRoot =
      applicationResult.operationId === "particle:result";
    const parentNodeId = sourceIndependentRoot
      ? ""
      : Object.prototype.hasOwnProperty.call(options, "parentNodeId")
        ? String(options.parentNodeId || "")
        : currentNodeId;
    const branchId = sourceIndependentRoot
      ? createBranch("", "Particle Result root")
      : Object.prototype.hasOwnProperty.call(options, "branchId")
        ? String(options.branchId || "")
        : ensureBranch();
    const label = sourceIndependentRoot
      ? applicationResult.operationId
      : String(options.label || "").trim();
    if (parentNodeId && !records.has(parentNodeId)) return null;
    if (!branches.has(branchId)) return null;
    const parent = parentNodeId ? records.get(parentNodeId) : null;
    const record = {
      nodeId,
      parentNodeId,
      branchId,
      depth: parent ? parent.depth + 1 : 1,
      sequence: nodeSequence,
      label,
      capture,
      childrenIds: [],
    };
    records.set(nodeId, record);
    if (parent) parent.childrenIds.push(nodeId);
    branches.get(branchId).nodeIds.push(nodeId);
    currentNodeId = nodeId;
    currentBranchId = branchId;
    revision += 1;
    return getNode(nodeId);
  }

  // Metadata cannot grant grammar authority. All Results are authenticated
  // before replacing any privately held history record.
  function restore(entries, branchRows, selection) {
    if (!Array.isArray(entries) || entries.length > 128
      || !Array.isArray(branchRows) || branchRows.length > 128
      || !selection || typeof selection.currentNodeId !== "string"
      || typeof selection.currentBranchId !== "string") return false;
    const nextRecords = new Map();
    const nextBranches = new Map();
    const boundedLabel = value => typeof value === "string" && value.length <= 200;
    let previousSequence = 0;
    for (const row of entries) {
      if (!row || Object.keys(row).some(key => ![
        "nodeId", "parentNodeId", "branchId", "sequence", "label", "result",
      ].includes(key)) || !Number.isSafeInteger(row.sequence)
        || row.sequence <= previousSequence || row.sequence > 1000000
        || row.nodeId !== `history-${row.sequence}`
        || !/^branch-[1-9]\d{0,5}$/.test(row.branchId || "")
        || typeof row.parentNodeId !== "string" || !boundedLabel(row.label)
        || row.parentNodeId && !nextRecords.has(row.parentNodeId)) return false;
      const capture = getCapture(row.result, row.nodeId);
      if (!capture || !isClassicalGrammarApplicationResult(capture.applicationResult)
        || capture.applicationResult.authorizationStatus !== "authorized"
        || capture.operationId === "particle:result" && row.parentNodeId) return false;
      const parent = nextRecords.get(row.parentNodeId);
      const record = { ...row, capture, depth: parent ? parent.depth + 1 : 1,
        childrenIds: [] };
      delete record.result;
      nextRecords.set(row.nodeId, record);
      if (parent) parent.childrenIds.push(row.nodeId);
      previousSequence = row.sequence;
    }
    for (const branch of branchRows) {
      if (!branch || Object.keys(branch).some(key => ![
        "branchId", "anchorNodeId", "label", "nodeIds",
      ].includes(key)) || !/^branch-[1-9]\d{0,5}$/.test(branch.branchId || "")
        || nextBranches.has(branch.branchId) || !boundedLabel(branch.label)
        || typeof branch.anchorNodeId !== "string"
        || branch.anchorNodeId && !nextRecords.has(branch.anchorNodeId)
        || !Array.isArray(branch.nodeIds) || branch.nodeIds.length > 128) return false;
      const members = [...nextRecords.values()].filter(row => row.branchId === branch.branchId);
      if (JSON.stringify(members.map(row => row.nodeId)) !== JSON.stringify(branch.nodeIds)
        || members.length && members[0].parentNodeId !== branch.anchorNodeId) return false;
      nextBranches.set(branch.branchId, { ...branch, nodeIds: [...branch.nodeIds] });
    }
    if ([...nextRecords.values()].some(row => !nextBranches.has(row.branchId))) return false;
    if (selection.currentNodeId && !nextRecords.has(selection.currentNodeId)
      || selection.currentBranchId && !nextBranches.has(selection.currentBranchId)) return false;
    const selectedBranch = nextBranches.get(selection.currentBranchId);
    if (nextRecords.size && (selection.currentNodeId || selection.currentBranchId) && (!selectedBranch || !selection.currentNodeId)
      || !nextRecords.size && (nextBranches.size || selection.currentNodeId || selection.currentBranchId)
      || selectedBranch && !selectedBranch.nodeIds.includes(selection.currentNodeId)
        && selectedBranch.anchorNodeId !== selection.currentNodeId) return false;
    records.clear(); branches.clear();
    for (const [id, row] of nextRecords) records.set(id, row);
    for (const [id, row] of nextBranches) branches.set(id, row);
    nodeSequence = previousSequence;
    branchSequence = Math.max(0, ...[...branches.keys()].map(id => Number(id.slice(7))));
    currentNodeId = selection.currentNodeId;
    currentBranchId = selection.currentBranchId;
    revision += 1;
    return true;
  }

  function getNode(nodeId = "") {
    const record = records.get(String(nodeId || ""));
    if (!record) return null;
    return Object.freeze({
      nodeId: record.nodeId,
      parentNodeId: record.parentNodeId,
      branchId: record.branchId,
      depth: record.depth,
      sequence: record.sequence,
      label: record.label,
      operationId: record.capture.operationId,
      outputKind: record.capture.outputKind,
      capturedResultRole: record.capture.capturedResultRole,
      childNodeIds: freezeList(record.childrenIds),
      hasExactResult: true,
      exactResultRecoverable: true,
      grammarAuthority: false,
    });
  }

  function recover(nodeId = currentNodeId) {
    return records.get(String(nodeId || ""))?.capture || null;
  }

  function continueFrom(nodeId = "") {
    const record = records.get(String(nodeId || ""));
    if (!record) return null;
    currentNodeId = record.nodeId;
    currentBranchId = record.branchId;
    revision += 1;
    return record.capture;
  }

  function canUndo() {
    const current = records.get(currentNodeId);
    const branch = branches.get(currentBranchId);
    return Boolean(
      current?.parentNodeId
      && current.branchId === currentBranchId
      && branch?.nodeIds.includes(current.nodeId)
      && records.has(current.parentNodeId)
    );
  }

  function undo() {
    if (!canUndo()) return null;
    const current = records.get(currentNodeId);
    const parent = records.get(current.parentNodeId);
    if (!parent) return null;
    currentNodeId = parent.nodeId;
    revision += 1;
    return parent.capture;
  }

  function fork(nodeId = currentNodeId, label = "") {
    const anchor = records.get(String(nodeId || ""));
    if (!anchor) return null;
    const branchId = createBranch(anchor.nodeId, label);
    return Object.freeze({
      branchId,
      anchorNodeId: anchor.nodeId,
      label: branches.get(branchId).label,
      exactAnchorResultRecoverable: true,
      grammarAuthority: false,
    });
  }

  function lineage(nodeId = "") {
    const path = [];
    let cursor = records.get(String(nodeId || "")) || null;
    while (cursor) {
      path.push(cursor);
      cursor = cursor.parentNodeId
        ? records.get(cursor.parentNodeId) || null
        : null;
    }
    return path.reverse();
  }

  function getNavigator(record = null) {
    if (
      !record
      || typeof getClassicalGrammarApplicationCapabilityNavigator
        !== "function"
      || typeof isClassicalGrammarApplicationCapabilityNavigator
        !== "function"
    ) return null;
    const navigator = getClassicalGrammarApplicationCapabilityNavigator(
      record.capture.canonicalResult,
    );
    return isClassicalGrammarApplicationCapabilityNavigator(navigator)
      ? navigator
      : null;
  }

  function compare(leftNodeId = "", rightNodeId = "") {
    const left = records.get(String(leftNodeId || ""));
    const right = records.get(String(rightNodeId || ""));
    if (!left || !right) return null;
    const leftLineage = lineage(left.nodeId);
    const rightLineage = lineage(right.nodeId);
    let sharedCount = 0;
    while (
      sharedCount < leftLineage.length
      && sharedCount < rightLineage.length
      && leftLineage[sharedCount].nodeId === rightLineage[sharedCount].nodeId
    ) sharedCount += 1;
    const ancestor = sharedCount
      ? leftLineage[sharedCount - 1]
      : null;
    const leftPath = leftLineage.slice(sharedCount);
    const rightPath = rightLineage.slice(sharedCount);
    const leftNavigator = getNavigator(left);
    const rightNavigator = getNavigator(right);
    const leftAvailable = leftNavigator?.operations
      ?.filter(operation => operation.availabilityStatus === "available")
      .map(operation => operation.operationId) || [];
    const rightAvailable = rightNavigator?.operations
      ?.filter(operation => operation.availabilityStatus === "available")
      .map(operation => operation.operationId) || [];
    const sharedAvailable = leftAvailable.filter(
      operationId => rightAvailable.includes(operationId),
    );
    const comparison = Object.freeze({
      kind: CLASSICAL_GRAMMAR_WORKSPACE_COMPARISON_KIND,
      version: 1,
      leftNodeId: left.nodeId,
      rightNodeId: right.nodeId,
      commonAncestorNodeId: ancestor?.nodeId || "",
      sameExactResult:
        left.capture.canonicalResult === right.capture.canonicalResult,
      leftOperationPath: freezeList(leftPath.map(
        record => record.capture.operationId,
      )),
      rightOperationPath: freezeList(rightPath.map(
        record => record.capture.operationId,
      )),
      sharedAvailableOperationIds: freezeList(unique(sharedAvailable)),
      leftOnlyAvailableOperationIds: freezeList(unique(
        leftAvailable.filter(operationId => !rightAvailable.includes(
          operationId,
        )),
      )),
      rightOnlyAvailableOperationIds: freezeList(unique(
        rightAvailable.filter(operationId => !leftAvailable.includes(
          operationId,
        )),
      )),
      exactResultsRecoverable: true,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedComparisons.add(comparison);
    return comparison;
  }

  function isComparison(value = null) {
    return Boolean(
      value
      && issuedComparisons.has(value)
      && value.kind === CLASSICAL_GRAMMAR_WORKSPACE_COMPARISON_KIND
      && value.version === 1
      && value.exactResultsRecoverable === true
      && value.grammarAuthority === false
      && Object.isFrozen(value)
    );
  }

  function snapshot() {
    const value = Object.freeze({
      kind: CLASSICAL_GRAMMAR_WORKSPACE_HISTORY_KIND,
      version: 1,
      revision,
      currentNodeId,
      currentBranchId,
      canUndo: canUndo(),
      nodeCount: records.size,
      branchCount: branches.size,
      nodes: freezeList([...records.keys()].map(getNode)),
      branches: freezeList([...branches.values()].map(branch => Object.freeze({
        branchId: branch.branchId,
        anchorNodeId: branch.anchorNodeId,
        label: branch.label,
        nodeIds: freezeList(branch.nodeIds),
      }))),
      exactResultsStoredPrivately: true,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedSnapshots.add(value);
    return value;
  }

  function isSnapshot(value = null) {
    return Boolean(
      value
      && issuedSnapshots.has(value)
      && value.kind === CLASSICAL_GRAMMAR_WORKSPACE_HISTORY_KIND
      && value.version === 1
      && value.nodeCount === value.nodes.length
      && value.branchCount === value.branches.length
      && typeof value.canUndo === "boolean"
      && value.exactResultsStoredPrivately === true
      && value.grammarAuthority === false
      && Object.isFrozen(value)
      && Object.isFrozen(value.nodes)
      && Object.isFrozen(value.branches)
    );
  }

  return Object.freeze({
    record,
    restore,
    recover,
    continueFrom,
    canUndo,
    undo,
    fork,
    compare,
    isComparison,
    getNode,
    snapshot,
    isSnapshot,
  });
}

export function installClassicalGrammarWorkspaceHistoryGlobals(
  targetObject = globalThis,
) {
  const history = createClassicalGrammarWorkspaceHistory({
    captureClassicalGrammarApplicationResult:
      targetObject.captureClassicalGrammarApplicationResult,
    isClassicalGrammarApplicationResultCapture:
      targetObject.isClassicalGrammarApplicationResultCapture,
    isClassicalGrammarApplicationResult:
      targetObject.isClassicalGrammarApplicationResult,
    getClassicalGrammarApplicationCapabilityNavigator:
      targetObject.getClassicalGrammarApplicationCapabilityNavigator,
    isClassicalGrammarApplicationCapabilityNavigator:
      targetObject.isClassicalGrammarApplicationCapabilityNavigator,
  });
  const observedApplicationResults = new WeakSet();
  const issuedUserActionTokens = new WeakSet();
  let userActionSequence = 0;
  const dispatchHistoryUpdate = () => {
    try {
      const EventConstructor = targetObject.CustomEvent
        || globalThis.CustomEvent;
      targetObject.document?.dispatchEvent?.(new EventConstructor(
        "classical:grammar-workspace-history-updated",
        { detail: history.snapshot() },
      ));
    } catch {
      // Workspace history is observational and cannot interrupt grammar.
    }
  };
  const getAuthorizedApplicationResult = value => {
    if (
      value
      && typeof targetObject.isClassicalGrammarApplicationResult
        === "function"
      && targetObject.isClassicalGrammarApplicationResult(value)
      && value.authorizationStatus === "authorized"
    ) return value;
    const slotId = `grammar-workspace-user-action:${userActionSequence}`;
    const capture = targetObject.captureClassicalGrammarApplicationResult?.(
      value,
      slotId,
    ) || null;
    return targetObject.isClassicalGrammarApplicationResultCapture?.(
      capture,
      slotId,
    ) && capture.applicationResult?.authorizationStatus === "authorized"
      ? capture.applicationResult
      : null;
  };
  const beginUserAction = (operationId = "") => {
    userActionSequence += 1;
    const token = Object.freeze({
      kind: "classical-grammar-workspace-user-action",
      sequence: userActionSequence,
      operationId: String(operationId || "").trim(),
      grammarAuthority: false,
    });
    issuedUserActionTokens.add(token);
    return token;
  };
  const finishUserAction = (
    token = null,
    exactResult = null,
    { record = true, recordExistingResult = false } = {},
  ) => {
    if (!token || !issuedUserActionTokens.delete(token)) return null;
    if (!record) return null;
    const applicationResult = getAuthorizedApplicationResult(exactResult);
    if (
      !applicationResult
      || observedApplicationResults.has(applicationResult) && !recordExistingResult
    ) return null;
    const node = history.record(applicationResult, {
      label: token.operationId || applicationResult.operationId,
    });
    if (!node) return null;
    observedApplicationResults.add(applicationResult);
    dispatchHistoryUpdate();
    return node;
  };
  // Owner probes and projections may issue many internal application
  // receipts while one visible control is being evaluated. Build history is
  // the child's action history, so only the explicit user-action transaction
  // above may add a node. The Atlas observes the internal receipts separately.
  const unsubscribe = () => false;
  const api = Object.freeze({
    CLASSICAL_GRAMMAR_WORKSPACE_HISTORY_KIND,
    CLASSICAL_GRAMMAR_WORKSPACE_COMPARISON_KIND,
    getClassicalGrammarWorkspaceHistory: () => history,
    getClassicalGrammarWorkspaceHistorySnapshot: () => history.snapshot(),
    recordClassicalGrammarWorkspaceResult: (value, options) => (
      history.record(value, options)
    ),
    restoreClassicalGrammarWorkspaceHistory: (entries, branches, selection) => {
      if (!history.restore(entries, branches, selection)) return false;
      for (const node of history.snapshot().nodes) {
        observedApplicationResults.add(history.recover(node.nodeId).applicationResult);
      }
      dispatchHistoryUpdate();
      return true;
    },
    recoverClassicalGrammarWorkspaceResult: nodeId => (
      history.recover(nodeId)
    ),
    continueClassicalGrammarWorkspaceFrom: nodeId => (
      history.continueFrom(nodeId)
    ),
    undoClassicalGrammarWorkspaceHistory: () => history.undo(),
    forkClassicalGrammarWorkspaceHistory: (nodeId, label) => (
      history.fork(nodeId, label)
    ),
    compareClassicalGrammarWorkspaceHistory: (leftNodeId, rightNodeId) => (
      history.compare(leftNodeId, rightNodeId)
    ),
    beginClassicalGrammarWorkspaceUserAction: operationId => (
      beginUserAction(operationId)
    ),
    completeClassicalGrammarWorkspaceUserAction: (
      token,
      exactResult,
      {recordExistingResult = false} = {},
    ) => finishUserAction(token, exactResult, { record: true, recordExistingResult }),
    cancelClassicalGrammarWorkspaceUserAction: token => {
      if (!token || !issuedUserActionTokens.has(token)) return false;
      finishUserAction(token, null, { record: false });
      return true;
    },
    isClassicalGrammarWorkspaceHistorySnapshot: value => (
      history.isSnapshot(value)
    ),
    isClassicalGrammarWorkspaceComparison: value => (
      history.isComparison(value)
    ),
    disconnectClassicalGrammarWorkspaceHistory: () => unsubscribe(),
  });
  Object.defineProperties(
    targetObject,
    Object.getOwnPropertyDescriptors(api),
  );
  return api;
}

export {
  CLASSICAL_GRAMMAR_WORKSPACE_COMPARISON_KIND,
  CLASSICAL_GRAMMAR_WORKSPACE_HISTORY_KIND,
};

const HISTORY_RELOAD_KIND = "classical-grammar-workspace-history-reload";

export function exportClassicalGrammarWorkspaceHistoryReloadState(runtime) {
  const snapshot = runtime.getClassicalGrammarWorkspaceHistorySnapshot?.();
  if (!runtime.isClassicalGrammarWorkspaceHistorySnapshot?.(snapshot)) return null;
  const unsupported = () => ({ kind: HISTORY_RELOAD_KIND, version: 1,
    status: "unsupported", nodeCount: snapshot.nodeCount });
  if (snapshot.nodes.length > 128 || snapshot.branches.length > 128
    || snapshot.nodes.some(node => node.label.length > 200
      || node.sequence > 1000000 || node.nodeId !== `history-${node.sequence}`
      || !/^branch-[1-9]\d{0,5}$/.test(node.branchId))
    || snapshot.branches.some(branch => branch.label.length > 200
      || !/^branch-[1-9]\d{0,5}$/.test(branch.branchId))) return unsupported();
  const nodes = snapshot.nodes.map(node => ({ nodeId: node.nodeId,
    parentNodeId: node.parentNodeId, branchId: node.branchId,
    sequence: node.sequence, label: node.label }));
  const roots = Object.fromEntries(snapshot.nodes.map(node => [node.nodeId,
    runtime.recoverClassicalGrammarWorkspaceResult(node.nodeId)?.canonicalResult]));
  let recipe = nodes.length ? exportClassicalResultReloadRecipe(runtime, roots) : null;
  if (!nodes.length || recipe) return { kind: HISTORY_RELOAD_KIND, version: 1, status: "supported",
    nodes, branches: snapshot.branches, currentNodeId: snapshot.currentNodeId,
    currentBranchId: snapshot.currentBranchId, recipe };
  // Preserve complete supported branches only. Never reconnect across a lost parent.
  const retained=[],omitted=[],kept=new Set();
  for(const row of nodes){
    const ancestorMissing=Boolean(row.parentNodeId&&!kept.has(row.parentNodeId));
    if(ancestorMissing||!exportClassicalResultReloadRecipe(runtime,{result:roots[row.nodeId]})){
      omitted.push({nodeId:row.nodeId,label:row.label,reason:ancestorMissing?'ancestor-unavailable':'unsupported-result'});
    }else{retained.push(row);kept.add(row.nodeId);}
  }
  const branches=snapshot.branches.filter(row=>(!row.anchorNodeId||kept.has(row.anchorNodeId))
    &&row.nodeIds.some(id=>kept.has(id))).map(row=>({...row,nodeIds:row.nodeIds.filter(id=>kept.has(id))}));
  recipe=retained.length?exportClassicalResultReloadRecipe(runtime,Object.fromEntries(retained.map(row=>[row.nodeId,roots[row.nodeId]]))):null;
  if(retained.length&&!recipe)return unsupported();
  const selected=kept.has(snapshot.currentNodeId)&&branches.some(b=>b.branchId===snapshot.currentBranchId);
  return {kind:HISTORY_RELOAD_KIND,version:2,status:'partial',nodes:retained,branches,omitted,
    currentNodeId:selected?snapshot.currentNodeId:'',currentBranchId:selected?snapshot.currentBranchId:'',recipe};
}

export function restoreClassicalGrammarWorkspaceHistoryReloadState(runtime, saved, sharedRoots = null) {
  if (!saved || saved.kind !== HISTORY_RELOAD_KIND || ![1,2].includes(saved.version)
    || !(saved.version===1&&saved.status==="supported"||saved.version===2&&saved.status==="partial") || Object.keys(saved).some(key => ![
      "kind", "version", "status", "nodes", "branches", "currentNodeId", "currentBranchId", "recipe", "omitted",
    ].includes(key)) || !Array.isArray(saved.nodes) || saved.nodes.length > 128
    || !Array.isArray(saved.branches) || saved.branches.length > 128
    || typeof runtime.restoreClassicalGrammarWorkspaceHistory !== "function"
    || saved.nodes.some(row => !row || Object.keys(row).some(key => ![
      "nodeId", "parentNodeId", "branchId", "sequence", "label",
    ].includes(key)))) return false;
  if(saved.version===2&&(!Array.isArray(saved.omitted)||saved.omitted.length>128||new Set(saved.omitted.map(row=>row?.nodeId)).size!==saved.omitted.length||saved.omitted.some(row=>!row
    ||Object.keys(row).some(k=>!['nodeId','label','reason'].includes(k))
    ||!/^history-[1-9]\d{0,5}$/.test(row.nodeId)||typeof row.label!=='string'||row.label.length>200
    ||!['ancestor-unavailable','unsupported-result'].includes(row.reason)
    ||saved.nodes.some(n=>n.nodeId===row.nodeId))))return false;
  const roots = sharedRoots || (saved.nodes.length ? replayClassicalResultReloadRecipe(runtime, saved.recipe) : {});
  if (!roots || !saved.nodes.length && saved.recipe !== null
    || JSON.stringify(Object.keys(roots).sort()) !== JSON.stringify(saved.nodes.map(row => row?.nodeId).sort())) return false;
  const entries = saved.nodes.map(row => ({ ...row, result: roots[row.nodeId] }));
  return runtime.restoreClassicalGrammarWorkspaceHistory(entries, saved.branches,
    { currentNodeId: saved.currentNodeId, currentBranchId: saved.currentBranchId });
}
