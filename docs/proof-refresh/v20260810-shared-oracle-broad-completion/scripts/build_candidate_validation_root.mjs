import fs from 'node:fs';
import path from 'node:path';

const stage = '/Users/jaimenunez/Documents/Codex/2026-08-08/referenced-chatgpt-conversation-this-is-an/work/proof-corpora/v20260810-shared-oracle-broad-completion';
const source = path.join(stage, 'repair-validation-root');
const merged = path.join(stage, 'merged-view-350');
const root = path.join(stage, 'candidate-validation-root-350');
if (fs.existsSync(root)) throw new Error(`candidate-validation-root-already-exists:${root}`);
fs.mkdirSync(root, {recursive: true});

fs.cpSync(path.join(source, 'scripts'), path.join(root, 'scripts'), {recursive: true, preserveTimestamps: true});
for (const entry of fs.readdirSync(source, {withFileTypes: true})) {
  if (['scripts', 'validation', 'reports'].includes(entry.name)) continue;
  fs.symlinkSync(path.join(source, entry.name), path.join(root, entry.name));
}
const validation = path.join(root, 'validation');
fs.mkdirSync(validation, {recursive: true});
for (const relative of ['declarations', 'oracles', 'owners', 'plans', 'runners', 'retired']) {
  const target = path.join(source, 'validation', relative);
  if (fs.existsSync(target)) fs.symlinkSync(target, path.join(validation, relative));
}
fs.mkdirSync(path.join(validation, 'method-runs'), {recursive: true});
for (const kind of ['runs', 'routes']) fs.symlinkSync(path.join(merged, kind), path.join(validation, kind));
fs.mkdirSync(path.join(root, 'reports/andrews_validation'), {recursive: true});
fs.copyFileSync(
  path.join(source, 'reports/andrews_validation/method-canaries.json'),
  path.join(root, 'reports/andrews_validation/method-canaries.json'),
);
console.log(JSON.stringify({valid: true, root, merged}, null, 2));
