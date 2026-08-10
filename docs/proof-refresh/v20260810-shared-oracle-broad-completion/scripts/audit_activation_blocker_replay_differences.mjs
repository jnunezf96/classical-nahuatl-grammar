import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const workspace = '/Users/jaimenunez/Documents/Codex/2026-08-08/referenced-chatgpt-conversation-this-is-an';
const canonical = '/Users/jaimenunez/Desktop/Classical_Nahuatl/Classical_Nahuatl_Grammar';
const version = 'v20260810-shared-oracle-broad-completion';
const stage = path.join(workspace, 'work/proof-corpora', version);
const checkpoint = JSON.parse(fs.readFileSync(path.join(stage, 'activation-blocker-replay-checkpoint.json'), 'utf8'));
const ownerIds = [...new Set([
  ...checkpoint.completedOwnerIds,
  'adjunctive-governance-analysis',
  'conjunctive-governance-analysis',
  'linguistic-structure-principles-analysis',
  'word-sentence-fragment-analysis',
  'governance-type-taxonomy',
])].sort();
const sha256 = (value) => `sha256:${createHash('sha256').update(JSON.stringify(value)).digest('hex')}`;

let oldFailedCaseCount = 0;
let newFailedCaseCount = 0;
let improvedCaseCount = 0;
let regressedCaseCount = 0;
let mutationCount = 0;
let mutationStatusDifferenceCount = 0;
let mutationObservationDifferenceCount = 0;
const failures = [];
const owners = [];

for (const ownerId of ownerIds) {
  const before = JSON.parse(fs.readFileSync(path.join(canonical, 'validation/runs', `${ownerId}.json`), 'utf8'));
  const after = JSON.parse(fs.readFileSync(path.join(stage, 'override/runs', `${ownerId}.json`), 'utf8'));
  const beforeCases = new Map(before.cases.map((item) => [item.caseId, item]));
  const caseDiffs = [];
  for (const testCase of after.cases) {
    const prior = beforeCases.get(testCase.caseId);
    if (!prior) { failures.push(`${ownerId}:new-case-without-baseline:${testCase.caseId}`); continue; }
    if (!prior.passed) oldFailedCaseCount += 1;
    if (!testCase.passed) newFailedCaseCount += 1;
    if (!prior.passed && testCase.passed) improvedCaseCount += 1;
    if (prior.passed && !testCase.passed) { regressedCaseCount += 1; failures.push(`${ownerId}:case-regressed:${testCase.caseId}`); }
    if (prior.passed !== testCase.passed) caseDiffs.push({caseId: testCase.caseId, before: prior.passed, after: testCase.passed});
  }
  if (after.cases.some((item) => item.passed !== true)) failures.push(`${ownerId}:staged-case-failure`);

  const priorMutations = new Map((before.mutationResults || []).map((item) => [item.mutationId, item]));
  const mutationDiffs = [];
  for (const current of after.mutationResults || []) {
    mutationCount += 1;
    const prior = priorMutations.get(current.mutationId);
    if (!prior) { failures.push(`${ownerId}:mutation-without-baseline:${current.mutationId}`); continue; }
    if (prior.status !== current.status) mutationStatusDifferenceCount += 1;
    const priorKilled = [...(prior.killedByCaseIds || [])].sort();
    const currentKilled = [...(current.killedByCaseIds || [])].sort();
    if (JSON.stringify(priorKilled) !== JSON.stringify(currentKilled)) {
      mutationObservationDifferenceCount += 1;
      mutationDiffs.push({mutationId: current.mutationId, beforeKilledByCaseIds: priorKilled, afterKilledByCaseIds: currentKilled});
    }
    if (current.status !== 'killed' || currentKilled.length === 0) failures.push(`${ownerId}:mutation-not-killed:${current.mutationId}`);
  }
  owners.push({ownerId, caseDiffs, mutationDiffs});
}
if (newFailedCaseCount) failures.push(`new-failed-cases:${newFailedCaseCount}`);
if (regressedCaseCount) failures.push(`regressed-cases:${regressedCaseCount}`);
if (mutationStatusDifferenceCount) failures.push(`mutation-status-differences:${mutationStatusDifferenceCount}`);
if (mutationObservationDifferenceCount) failures.push(`mutation-observation-differences:${mutationObservationDifferenceCount}`);

const report = {
  schemaVersion: 1, version, ownerCount: ownerIds.length, oldFailedCaseCount, newFailedCaseCount,
  improvedCaseCount, regressedCaseCount, mutationCount, mutationStatusDifferenceCount,
  mutationObservationDifferenceCount, failures, owners,
};
report.contentDigest = sha256(report);
fs.writeFileSync(path.join(stage, 'activation-blocker-old-new-difference-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({valid: failures.length === 0, ...report, owners: undefined}, null, 2));
if (failures.length) process.exitCode = 1;
