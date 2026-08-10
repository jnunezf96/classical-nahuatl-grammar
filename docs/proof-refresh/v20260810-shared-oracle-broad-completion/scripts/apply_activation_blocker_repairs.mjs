import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const workspace = '/Users/jaimenunez/Documents/Codex/2026-08-08/referenced-chatgpt-conversation-this-is-an';
const version = 'v20260810-shared-oracle-broad-completion';
const stage = path.join(workspace, 'work/proof-corpora', version);
const root = path.join(stage, 'repair-validation-root');
const backupRoot = path.join(stage, 'source-input-backup');
const retirementRoot = path.join(root, 'validation/retired/semantic-scope-v20260810');
const require = createRequire(import.meta.url);

const { readAndrewsCanvasInventoryIndex } = require(
  path.join(root, 'scripts/lib/andrews_canvas_inventory_reconciliation.js'),
);
const { inventoryRecordDigest } = await import(
  pathToFileURL(path.join(root, 'scripts/lib/andrews_validation_method.mjs')).href,
);
const { renderRoutineOwnerProofRecords, writeProofRecordArtifactSet } = await import(
  pathToFileURL(path.join(root, 'scripts/lib/andrews_proof_record_compiler.mjs')).href,
);

const inventory = readAndrewsCanvasInventoryIndex({
  inventoryPath: path.join(root, 'docs/ANDREWS_CANVAS_INVENTORY.md'),
  canvasPath: path.join(root, 'ANDREWS_TRANSCRIPTION_CANVAS.md'),
});
if (!inventory.valid) throw new Error(`inventory-invalid:${inventory.failures.join(',')}`);
const denominator = JSON.parse(fs.readFileSync(path.join(root, 'config/andrews_denominator_manifest.json'), 'utf8'));
const manifestById = new Map(denominator.atoms.map((atom) => [atom.id, atom]));
const canvasText = fs.readFileSync(path.join(root, 'ANDREWS_TRANSCRIPTION_CANVAS.md'), 'utf8');

const changed = new Set();
const retired = new Set();
function backup(relativePath) {
  const source = path.join(root, relativePath);
  if (!fs.existsSync(source)) return;
  const destination = path.join(backupRoot, relativePath);
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.copyFileSync(source, destination);
  }
}
function write(relativePath, content) {
  backup(relativePath);
  fs.writeFileSync(path.join(root, relativePath), content);
  changed.add(relativePath);
}
function writeJson(relativePath, value) {
  write(relativePath, `${JSON.stringify(value, null, 2)}\n`);
}
function retire(relativePath) {
  const source = path.join(root, relativePath);
  if (!fs.existsSync(source)) return;
  backup(relativePath);
  const destination = path.join(retirementRoot, relativePath);
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  if (fs.existsSync(destination)) throw new Error(`retirement-target-exists:${relativePath}`);
  fs.renameSync(source, destination);
  retired.add(relativePath);
}

// The corrected oracle preserves exact equality first, then resolves a promoted
// witness by either its semantic broad leaf or the exact leaf of the recorded
// source path. This keeps fallback deterministic and avoids suffix guessing.
{
  const relativePath = 'validation/oracles/_lesson2-owner-oracle.mjs';
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const before = `  const broadLeaf = String(payload.broadCompletionLeaf || "");\n  const matchedKey = Object.keys(facetValue).find((key) =>\n    key.replace(/[^a-z0-9]+/giu, "").toLowerCase() === broadLeaf);`;
  const after = `  const normalized = (value) => String(value || "")\n    .replace(/[^a-z0-9]+/giu, "")\n    .toLowerCase();\n  const sourceLeaf = String(payload.sourceCanonicalPath || "").split(".").at(-1);\n  const eligibleLeaves = new Set([\n    normalized(payload.broadCompletionLeaf),\n    normalized(sourceLeaf),\n  ].filter(Boolean));\n  const matchedKey = Object.keys(facetValue).find((key) =>\n    eligibleLeaves.has(normalized(key)));`;
  if (!source.includes(before)) throw new Error('shared-oracle-repair-anchor-missing');
  write(relativePath, source.replace(before, after));
}

const declarationRepairs = {
  'validation/declarations/lessons4-6/classical-nemi-irregular-paradigm.json': {
    'claim-1216': {canonicalPath: 'lesson11.selectedStem', oracleExpectation: 'nen'},
    'claim-1217': {
      canonicalPath: 'lesson11.tenseMapping',
      oracleExpectation: {
        lexemeId: 'nemi', selectedStem: 'nen', morphologicalTense: 'distant-past',
        semanticTenseValue: 'general-past', interpretation: 'distant-past-as-past',
        remapped: true, relation: '(nemi) > (nen)',
      },
    },
  },
  'validation/declarations/lessons35-36/classical-predicate-nominalization-preterit-agentive.json': {
    'claim-3361': {canonicalPath: 'cases.preteritAgentive.proofObservations.agentSemanticRole', oracleExpectation: 'agent-of-action'},
    'claim-3362': {canonicalPath: 'cases.preteritAgentive.proofObservations.agentiveTaxonomyStatus', oracleExpectation: 'most-common-agentive-nnc'},
    'claim-3363': {canonicalPath: 'cases.preteritAgentive.proofObservations.stemShapeInventory', oracleExpectation: ['restricted-use', 'general-use']},
    'claim-3364': {canonicalPath: 'cases.preteritAgentive.proofObservations.generalUseCompound', oracleExpectation: {
      constructionKind: 'compound', embedRole: 'restricted-use', embedStem: 'pix-ca-0', matrixStem: 'cā',
      outputStem: 'pix-ca-0-cā', relation: 'restricted-use-embed-plus-ca-matrix', satisfied: true,
    }},
    'claim-3365': {canonicalPath: 'cases.preteritAgentive.proofObservations.restrictedUseSourceRelation', oracleExpectation: {
      sourceUnit: 'vnc-core', sourceStage: 'preterit-predicate', sourcePredicateStem: 'pix-ca',
      sourceImperfectiveStem: '', sourcePerfectiveStem: 'pix-ca', perfectiveChangeRule: '',
      ownerFrameKind: '', ownerIssuedStageMember: true, outputNounstem: 'pix-ca-0', finalConstituent: '0',
      relation: 'preterit-predicate-reanalyzed-as-nounstem', satisfied: true,
    }},
    'claim-3366': {canonicalPath: 'cases.preteritAgentive.proofObservations.stateStemDistribution.absolutive', oracleExpectation: {
      state: 'absolutive', stemRole: 'restricted-use', stem: 'pix-ca-0', licensed: true,
    }},
    'claim-3367': {canonicalPath: 'cases.preteritAgentive.proofObservations.derivationOrder', oracleExpectation: {
      orderedRoles: ['restricted-use', 'general-use'], dependency: 'general-use-embeds-restricted-use', satisfied: true,
    }},
    'claim-3368': {canonicalPath: 'cases.preteritAgentive.proofObservations.stateStemDistribution.nonAbsolutive', oracleExpectation: {
      stateClass: 'non-absolutive', licensedStates: ['possessive'], stemRole: 'general-use', stem: 'pix-ca-0-cā', licensed: true,
    }},
  },
};

for (const [relativePath, repairs] of Object.entries(declarationRepairs)) {
  const declaration = JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
  for (const atom of declaration.atoms) {
    const repair = repairs[atom.scenario];
    if (repair) Object.assign(atom, repair);
  }
  const missing = Object.keys(repairs).filter((scenario) => !declaration.atoms.some((atom) => atom.scenario === scenario));
  if (missing.length) throw new Error(`declaration-scenarios-missing:${relativePath}:${missing.join(',')}`);
  writeJson(relativePath, declaration);
  const rendered = renderRoutineOwnerProofRecords({
    rootDir: root,
    declaration,
    declarationPath: relativePath,
    manifestById,
    inventory,
    canvasText,
  });
  for (const artifactPath of rendered.artifacts.keys()) backup(artifactPath);
  await writeProofRecordArtifactSet({rootDir: root, artifacts: rendered.artifacts});
  for (const artifactPath of rendered.artifacts.keys()) changed.add(artifactPath);
}

// Transfer the productive §1.12.3 proposition to its specific semantic owner.
{
  const oldAtomId = 'ACI-P032-L038-5CFADB0FE4';
  const newAtomId = 'ACI-P032-L038-5CFADB0FE4-04';
  for (const relativePath of [
    'validation/owners/conceptual-plane-separation.json',
    'validation/runners/foundational-owner-configs/conceptual-plane-separation.mjs',
    'validation/oracles/foundational-owner-configs/conceptual-plane-separation.mjs',
    'validation/oracles/conceptual-plane-separation.canvas-bindings.json',
  ]) {
    const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
    if (!source.includes(oldAtomId)) throw new Error(`conceptual-transfer-anchor-missing:${relativePath}`);
    write(relativePath, source.replaceAll(oldAtomId, newAtomId));
  }
}

// Retire only proof-source artifacts whose assignments are now non-grammar or
// duplicated by the more specific semantic owner. Existing run/route shards
// are intentionally untouched and become preserved orphan rollback evidence.
for (const relativePath of [
  'validation/owners/classical-nounstem-lexicon.json',
  'validation/runners/classical-nounstem-lexicon.mjs',
  'validation/runners/foundational-owner-configs/classical-nounstem-lexicon.mjs',
  'validation/oracles/classical-nounstem-lexicon.mjs',
  'validation/oracles/foundational-owner-configs/classical-nounstem-lexicon.mjs',
  'validation/oracles/classical-nounstem-lexicon.canvas-bindings.json',
  'validation/owners/conceptual-plane-separation-canvas-atom-assertions.json',
  'validation/runners/conceptual-plane-separation-canvas-atom-assertions.mjs',
  'validation/runners/nuclear-owner-configs/conceptual-plane-separation-canvas-atom-assertions.mjs',
  'validation/oracles/conceptual-plane-separation-canvas-atom-assertions.mjs',
  'validation/oracles/nuclear-owner-configs/conceptual-plane-separation-canvas-atom-assertions.mjs',
  'validation/oracles/conceptual-plane-separation-canvas-atom-assertions.canvas-bindings.json',
  'validation/plans/nuclear/conceptual-plane-separation-canvas-atom-assertions.json',
  'validation/declarations/reconciled-atom-owners/conceptual-plane-separation-canvas-atom-assertions.json',
]) retire(relativePath);

const sourceOwners = [
  'carrier-grapheme-classification', 'carrier-phoneme-classification', 'carrier-rank-formation',
  'carrier-sigeme-classification', 'classical-graphological-representation',
  'classical-nuclear-clause-structure', 'classical-segmental-phoneme-inventory',
  'classical-syllable-structure', 'conceptual-plane-separation', 'linguistic-analysis-levels',
  'linguistic-element-classification', 'linguistic-structure-principles-analysis',
  'linguistic-unit-composition', 'morph-conditioning-analysis', 'morph-token-classification',
  'morpheme-taxonomy', 'nahuatl-structure-level-distribution', 'phone-repertory-analysis',
  'sig-token-classification',
];
for (const ownerId of sourceOwners) {
  const relativePath = `validation/owners/${ownerId}.json`;
  const owner = JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
  for (const obligation of owner.sourceObligations || []) {
    const record = inventory.byId[obligation.atomId];
    if (!record) throw new Error(`inventory-record-missing:${ownerId}:${obligation.atomId}`);
    if (record.force !== 'grammar-bearing') throw new Error(`non-grammar-obligation-remains:${ownerId}:${obligation.atomId}`);
    obligation.inventoryCategory = record.category;
    obligation.canvasReference = record.container;
    obligation.inventoryRecordDigest = inventoryRecordDigest(record);
    obligation.sourceAnchor = record.anchor;
  }
  for (const oracle of owner.oracleObligations || []) {
    const atom = manifestById.get(oracle.atomId);
    if (!atom) throw new Error(`denominator-atom-missing:${ownerId}:${oracle.atomId}`);
    oracle.claimDigest = atom.claimDigest;
  }
  writeJson(relativePath, owner);
}

const report = {
  schemaVersion: 1,
  version,
  changedFiles: [...changed].sort(),
  retiredFiles: [...retired].sort(),
  changedFileCount: changed.size,
  retiredFileCount: retired.size,
  backupRoot,
  retirementRoot,
};
const reportPath = path.join(stage, 'activation-blocker-repair-report.json');
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
