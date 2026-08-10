import fs from 'node:fs';
import path from 'node:path';

const workspace = '/Users/jaimenunez/Documents/Codex/2026-08-08/referenced-chatgpt-conversation-this-is-an';
const canonical = '/Users/jaimenunez/Desktop/Classical_Nahuatl/Classical_Nahuatl_Grammar';
const version = 'v20260810-shared-oracle-broad-completion';
const stage = path.join(workspace, 'work/proof-corpora', version);
const root = path.join(stage, 'repair-validation-root');
const merged = path.join(stage, 'merged-view');

if (fs.existsSync(root)) throw new Error(`repair-validation-root-already-exists:${root}`);
fs.mkdirSync(root, {recursive: true});

fs.cpSync(path.join(canonical, 'scripts'), path.join(root, 'scripts'), {
  recursive: true,
  preserveTimestamps: true,
});
for (const relative of [
  'ANDREWS_TRANSCRIPTION_CANVAS.md', 'config', 'docs', 'node_modules',
  'package.json', 'package-lock.json', 'src',
]) {
  fs.symlinkSync(path.join(canonical, relative), path.join(root, relative));
}
for (const entry of fs.readdirSync(canonical, {withFileTypes: true})) {
  if (['scripts', 'validation', 'reports', 'ANDREWS_TRANSCRIPTION_CANVAS.md', 'config', 'docs',
    'node_modules', 'package.json', 'package-lock.json', 'src'].includes(entry.name)) continue;
  fs.symlinkSync(path.join(canonical, entry.name), path.join(root, entry.name));
}

const validationRoot = path.join(root, 'validation');
fs.mkdirSync(validationRoot, {recursive: true});
for (const relative of ['declarations', 'oracles', 'owners', 'plans', 'runners']) {
  fs.cpSync(path.join(canonical, 'validation', relative), path.join(validationRoot, relative), {
    recursive: true,
    preserveTimestamps: true,
  });
}
fs.mkdirSync(path.join(validationRoot, 'method-runs'), {recursive: true});
for (const kind of ['runs', 'routes']) {
  fs.symlinkSync(path.join(merged, kind), path.join(validationRoot, kind));
}
fs.mkdirSync(path.join(root, 'reports/andrews_validation'), {recursive: true});
fs.copyFileSync(
  path.join(canonical, 'reports/andrews_validation/method-canaries.json'),
  path.join(root, 'reports/andrews_validation/method-canaries.json'),
);

console.log(JSON.stringify({valid: true, version, root}, null, 2));
