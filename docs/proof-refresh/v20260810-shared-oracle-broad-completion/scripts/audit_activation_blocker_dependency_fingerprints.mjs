import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const workspace = '/Users/jaimenunez/Documents/Codex/2026-08-08/referenced-chatgpt-conversation-this-is-an';
const canonical = '/Users/jaimenunez/Desktop/Classical_Nahuatl/Classical_Nahuatl_Grammar';
const version = 'v20260810-shared-oracle-broad-completion';
const stage = path.join(workspace, 'work/proof-corpora', version);
const diff = JSON.parse(fs.readFileSync(path.join(stage, 'activation-blocker-old-new-difference-report.json'), 'utf8'));
const repair = JSON.parse(fs.readFileSync(path.join(stage, 'activation-blocker-repair-report.json'), 'utf8'));
const allowedPaths = new Set([
  ...repair.changedFiles,
  'validation/oracles/_linguistic-structure-owner-configs.mjs',
  'validation/runners/_linguistic-structure-owner-scenarios.mjs',
]);
const changedPaths = (before = [], after = []) => {
  const left = new Map(before.map((item) => [item.path, item.digest]));
  const right = new Map(after.map((item) => [item.path, item.digest]));
  return [...new Set([...left.keys(), ...right.keys()])].sort().filter((key) => left.get(key) !== right.get(key));
};
const failures = [];
const owners = [];
for (const ownerId of diff.owners.map((item) => item.ownerId)) {
  const before = JSON.parse(fs.readFileSync(path.join(canonical, 'validation/runs', `${ownerId}.json`), 'utf8'));
  const after = JSON.parse(fs.readFileSync(path.join(stage, 'override/runs', `${ownerId}.json`), 'utf8'));
  const engineChanges = changedPaths(before.engineInputRecords, after.engineInputRecords);
  const validatorChanges = changedPaths(before.validatorInputRecords, after.validatorInputRecords);
  const runnerChanges = changedPaths(before.runnerInputRecords, after.runnerInputRecords);
  const unexpectedValidatorChanges = validatorChanges.filter((item) => !allowedPaths.has(item));
  const unexpectedRunnerChanges = runnerChanges.filter((item) => !allowedPaths.has(item));
  const ownerSpecChanged = before.ownerSpecDigest !== after.ownerSpecDigest;
  const ownerSpecChangeAllowed = !ownerSpecChanged || allowedPaths.has(`validation/owners/${ownerId}.json`);
  if (engineChanges.length) failures.push(`${ownerId}:engine-dependency-changed:${engineChanges.join(',')}`);
  if (unexpectedValidatorChanges.length) failures.push(`${ownerId}:unexpected-validator-change:${unexpectedValidatorChanges.join(',')}`);
  if (unexpectedRunnerChanges.length) failures.push(`${ownerId}:unexpected-runner-change:${unexpectedRunnerChanges.join(',')}`);
  if (!ownerSpecChangeAllowed) failures.push(`${ownerId}:unexpected-owner-spec-change`);
  if (before.caseCount !== after.caseCount || before.routeCount !== after.routeCount) failures.push(`${ownerId}:case-route-count-changed`);
  owners.push({ownerId, engineChanges, validatorChanges, runnerChanges, ownerSpecChanged});
}
const report = {
  schemaVersion: 1, version, ownerCount: owners.length,
  engineDependencyMismatchCount: owners.filter((item) => item.engineChanges.length).length,
  unexpectedValidatorDependencyMismatchCount: owners.filter((item) => item.validatorChanges.some((entry) => !allowedPaths.has(entry))).length,
  unexpectedRunnerDependencyMismatchCount: owners.filter((item) => item.runnerChanges.some((entry) => !allowedPaths.has(entry))).length,
  failures, owners,
};
report.contentDigest = `sha256:${createHash('sha256').update(JSON.stringify(report)).digest('hex')}`;
fs.writeFileSync(path.join(stage, 'activation-blocker-dependency-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({...report, owners: undefined}, null, 2));
if (failures.length) process.exitCode = 1;
