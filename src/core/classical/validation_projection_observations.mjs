// Non-authorizing observations. Output inequality cannot establish the
// independence of the procedures that generated those outputs.
export function observeFormulaProjectionDifference(formulaRecord, realizationRecord) {
  const compare = (left, right) => typeof left === "string" && left.length > 0
    && typeof right === "string" && right.length > 0 ? left !== right : null;
  return Object.freeze({
    formulaIndependentOfWritten: null,
    formulaIndependenceStatus: "not-tested",
    formulaAndWrittenDiffer: compare(formulaRecord?.formula, realizationRecord?.surface),
    projectionRecordIdsDiffer: compare(formulaRecord?.id, realizationRecord?.id),
  });
}
