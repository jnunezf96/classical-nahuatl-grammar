import {spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const workspace = '/Users/jaimenunez/Documents/Codex/2026-08-08/referenced-chatgpt-conversation-this-is-an';
const version = 'v20260810-shared-oracle-broad-completion';
const stage = path.join(workspace, 'work/proof-corpora', version);
const root = path.join(stage, 'repair-replay-root');
const checkpointPath = path.join(stage, 'activation-blocker-replay-checkpoint.json');
const ownerIds = [
  'carrier-grapheme-classification', 'carrier-phoneme-classification', 'carrier-rank-formation',
  'carrier-sigeme-classification', 'classical-graphological-representation',
  'classical-nuclear-clause-structure', 'classical-segmental-phoneme-inventory',
  'classical-syllable-structure', 'conceptual-plane-separation', 'linguistic-analysis-levels',
  'linguistic-element-classification', 'linguistic-structure-principles-analysis',
  'linguistic-unit-composition', 'morph-conditioning-analysis', 'morph-token-classification',
  'morpheme-taxonomy', 'nahuatl-structure-level-distribution', 'phone-repertory-analysis',
  'sig-token-classification', 'classical-applicative-unattested-source-licensing',
  'classical-double-object-applicative-transform', 'classical-nemi-irregular-paradigm',
  'classical-predicate-nominalization-preterit-agentive', 'classical-reflexive-partial-reduplication',
  'classical-triple-object-applicative-transform',
].sort();
const prior = fs.existsSync(checkpointPath) ? JSON.parse(fs.readFileSync(checkpointPath, 'utf8')) : {completedOwnerIds: []};
const complete = new Set(prior.completedOwnerIds || []);
const pending = ownerIds.filter((ownerId) => !complete.has(ownerId));
const batches = [];
for (let index = 0; index < pending.length; index += 10) batches.push(pending.slice(index, index + 10));

function validate(ownerId) {
  for (const kind of ['runs', 'routes']) {
    const file = path.join(stage, 'override', kind, `${ownerId}.json`);
    const document = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (document.ownerId !== ownerId) throw new Error(`owner-mismatch:${kind}:${ownerId}`);
  }
}
function persist() {
  fs.writeFileSync(checkpointPath, `${JSON.stringify({
    schemaVersion: 1, version, requiredOwnerCount: ownerIds.length,
    completedOwnerIds: [...complete].sort(),
  }, null, 2)}\n`);
}
function run(ownerBatch) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [
      '--max-old-space-size=6144', 'scripts/run_andrews_validation.mjs', '--execute-only', '--jobs', '4',
      ...ownerBatch.flatMap((ownerId) => ['--owner', ownerId]),
    ], {cwd: root, stdio: ['ignore', 'pipe', 'pipe']});
    let output = '';
    child.stdout.on('data', (chunk) => { output += chunk; });
    child.stderr.on('data', (chunk) => { output += chunk; });
    child.on('error', reject);
    child.on('close', (code) => code === 0 ? resolve() : reject(new Error(`replay-failed:${code}\n${output}`)));
  });
}

for (let index = 0; index < batches.length; index += 1) {
  await run(batches[index]);
  for (const ownerId of batches[index]) { validate(ownerId); complete.add(ownerId); }
  persist();
  console.log(`repair batch ${index + 1}/${batches.length}: ${complete.size}/${ownerIds.length}`);
}
for (const ownerId of ownerIds) validate(ownerId);
console.log(JSON.stringify({valid: true, requiredOwnerCount: ownerIds.length, completedOwnerCount: complete.size}, null, 2));
