import fs from 'node:fs';
import path from 'node:path';

const workspace = '/Users/jaimenunez/Documents/Codex/2026-08-08/referenced-chatgpt-conversation-this-is-an';
const version = 'v20260810-shared-oracle-broad-completion';
const stage = path.join(workspace, 'work/proof-corpora', version);
const source = path.join(stage, 'repair-validation-root');
const root = path.join(stage, 'repair-replay-root');
if (fs.existsSync(root)) throw new Error(`repair-replay-root-already-exists:${root}`);
fs.mkdirSync(root, {recursive: true});

for (const entry of fs.readdirSync(source, {withFileTypes: true})) {
  if (['validation', 'reports'].includes(entry.name)) continue;
  fs.symlinkSync(path.join(source, entry.name), path.join(root, entry.name));
}
const validation = path.join(root, 'validation');
fs.mkdirSync(validation, {recursive: true});
for (const relative of ['declarations', 'oracles', 'owners', 'plans', 'runners']) {
  fs.symlinkSync(path.join(source, 'validation', relative), path.join(validation, relative));
}
fs.mkdirSync(path.join(validation, 'method-runs'), {recursive: true});
for (const kind of ['runs', 'routes']) {
  fs.symlinkSync(path.join(stage, 'override', kind), path.join(validation, kind));
}
fs.mkdirSync(path.join(root, 'reports/andrews_validation'), {recursive: true});
fs.copyFileSync(
  path.join(source, 'reports/andrews_validation/method-canaries.json'),
  path.join(root, 'reports/andrews_validation/method-canaries.json'),
);
console.log(JSON.stringify({valid: true, root}, null, 2));
