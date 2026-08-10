import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const workspace = '/Users/jaimenunez/Documents/Codex/2026-08-08/referenced-chatgpt-conversation-this-is-an';
const version = 'v20260810-shared-oracle-broad-completion';
const stage = path.join(workspace, 'work/proof-corpora', version);
const manifestPath = path.join(workspace, 'work/proof-corpus-manifests', `${version}.json`);
const repairRoot = path.join(stage, 'repair-validation-root');
const sha256 = (value) => `sha256:${createHash('sha256').update(value).digest('hex')}`;
const digestJson = (value) => sha256(JSON.stringify(value));
const jsonNames = (dir) => fs.readdirSync(dir).filter((name) => name.endsWith('.json')).sort();

const runNames = jsonNames(path.join(stage, 'override/runs'));
const routeNames = jsonNames(path.join(stage, 'override/routes'));
if (JSON.stringify(runNames) !== JSON.stringify(routeNames)) throw new Error('override-run-route-owner-set-mismatch');
const ownerIds = runNames.map((name) => name.slice(0, -5));
if (ownerIds.length !== 350) throw new Error(`expanded-override-owner-count:${ownerIds.length}`);

const checkpoint321 = JSON.parse(fs.readFileSync(path.join(stage, 'replay-checkpoint.json'), 'utf8'));
const checkpoint25 = JSON.parse(fs.readFileSync(path.join(stage, 'activation-blocker-replay-checkpoint.json'), 'utf8'));
for (const ownerId of [...checkpoint321.completedOwnerIds, ...checkpoint25.completedOwnerIds]) {
  if (!ownerIds.includes(ownerId)) throw new Error(`checkpoint-owner-missing:${ownerId}`);
}

const sourceRecords = [];
function visit(directory, prefix = '') {
  for (const entry of fs.readdirSync(directory, {withFileTypes: true}).sort((a, b) => a.name.localeCompare(b.name))) {
    const absolute = path.join(directory, entry.name);
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) visit(absolute, relative);
    else if (entry.isFile()) sourceRecords.push({path: relative, digest: sha256(fs.readFileSync(absolute))});
  }
}
for (const relative of ['declarations', 'oracles', 'owners', 'plans', 'runners', 'retired']) {
  const directory = path.join(repairRoot, 'validation', relative);
  if (fs.existsSync(directory)) visit(directory, `validation/${relative}`);
}
sourceRecords.sort((a, b) => a.path.localeCompare(b.path));

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
delete manifest.contentDigest;
manifest.overlays[0].ownerCount = ownerIds.length;
manifest.overlays[0].ownerIds = ownerIds;
manifest.overlays[0].ownerSetDigest = digestJson(ownerIds);
manifest.validationInputs = {
  mode: 'isolated-versioned-source-overlay',
  root: repairRoot,
  recordCount: sourceRecords.length,
  contentDigest: digestJson(sourceRecords),
  repairReport: path.join(stage, 'activation-blocker-repair-report.json'),
  canonicalInputsModified: false,
};
manifest.contentDigest = digestJson(manifest);
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(path.join(stage, 'expanded-owner-ids.json'), `${JSON.stringify({
  schemaVersion: 1, version, ownerCount: ownerIds.length, ownerIds,
  ownerSetDigest: digestJson(ownerIds), sourceInputDigest: manifest.validationInputs.contentDigest,
}, null, 2)}\n`);
console.log(JSON.stringify({
  valid: true, ownerCount: ownerIds.length, sourceInputRecordCount: sourceRecords.length,
  sourceInputDigest: manifest.validationInputs.contentDigest, manifestDigest: manifest.contentDigest,
}, null, 2));
