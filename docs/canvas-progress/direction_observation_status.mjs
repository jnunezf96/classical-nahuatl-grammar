// Factory evidence input only; these labels never authorize grammar.
export function directionObservationStatus({ atomId, writing, accepted,
  writingDeclared, readingDeclared, evidence = [] }) {
  const proved = direction => evidence.some(record => record.atomId === atomId
    && record.direction === direction && record.status === "passed"
    && record.positivePassed === true && record.mutationRejected === true
    && typeof record.testReference === "string" && record.testReference.length > 0);
  return Object.freeze({
    WRITING: !writing ? "NOT_A_WRITING_JOB"
      : !accepted ? "JOB_ASSIGNED_NOT_YET_ACCEPTED"
      : writingDeclared && proved("WRITING") ? "EXACTLY_OBSERVED"
      : "JOB_ASSIGNED_NOT_YET_OBSERVED",
    READING_AND_INTERPRETATION: accepted && readingDeclared
      && proved("READING_AND_INTERPRETATION") ? "EXACTLY_PRESENTED"
      : "JOB_ASSIGNED_NOT_YET_PRESENTED",
  });
}
