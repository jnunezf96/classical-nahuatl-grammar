#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repositoryRoot = path.resolve(path.dirname(scriptPath), "../..");
const outputPath = "docs/ANDREWS_ATOM_LEDGER.json";
const inputPaths = Object.freeze({
  semantic: "docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json",
  reconciliation: "docs/CLASSICAL_CANVAS_ATOM_UI_RECONCILIATION.json",
  exactObservationPointer: "docs/canvas-progress/active-exact-observation-manifest.json",
  canonicalOwnerReassignments: "docs/canvas-progress/current-canonical-owner-reassignments.json",
});

const sha256 = text => `sha256:${createHash("sha256").update(text).digest("hex")}`;
const readJson = async relativePath => JSON.parse(await readFile(path.join(repositoryRoot, relativePath), "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };

async function sourceFiles(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "tests") output.push(...await sourceFiles(absolutePath));
    } else if (/\.(?:mjs|js)$/u.test(entry.name)
      && !entry.name.endsWith("-canvas-atom-assertions.mjs")
      && entry.name !== "nuclear_semantic_owner_catalog.mjs") {
      output.push(absolutePath);
    }
  }
  return output;
}

async function ownerReferences(ownerIds) {
  const sources = (await sourceFiles(path.join(repositoryRoot, "src"))).sort();
  const contents = new Map(await Promise.all(sources.map(async absolutePath => [
    absolutePath,
    await readFile(absolutePath, "utf8"),
  ])));
  const references = new Map();
  for (const ownerId of ownerIds) {
    const directCandidates = [
      `src/core/classical/nuclear-owner-specs/${ownerId}.mjs`,
      `src/core/classical/transcription-owner-specs/${ownerId}.mjs`,
      `src/core/classical/particle-owner-specs/${ownerId}.mjs`,
      `src/core/concepts/foundational-owner-specs/${ownerId}.mjs`,
      `src/core/concepts/carrier-structure-owner-specs/${ownerId}.mjs`,
    ];
    let reference = "";
    for (const candidate of directCandidates) {
      try {
        if ((await stat(path.join(repositoryRoot, candidate))).isFile()) {
          reference = candidate;
          break;
        }
      } catch {}
    }
    if (!reference) {
      const quotedForms = [`"${ownerId}"`, `'${ownerId}'`, `\`${ownerId}\``];
      const match = sources.find(absolutePath => quotedForms.some(form => contents.get(absolutePath).includes(form)));
      if (match) reference = path.relative(repositoryRoot, match);
    }
    if (!reference && ownerId === "classical.verbstem.perfective.final-m-to-n") {
      reference = "src/core/classical/verbstem_classes.mjs";
    }
    references.set(ownerId, reference);
  }
  return references;
}

async function receiptReferences(manifest) {
  const references = new Map();
  for (const receiptRecord of manifest.receipts || []) {
    try {
      const receipt = await readJson(receiptRecord.path);
      for (const observation of receipt.observations || []) {
        references.set(observation.atomId, receiptRecord.path);
      }
    } catch {}
  }
  return references;
}

export async function buildAuthoritativeAtomLedger({ checkOnly = false } = {}) {
  const [semanticText, reconciliationText, pointerText, reassignmentText] = await Promise.all(
    Object.values(inputPaths).map(relativePath => readFile(path.join(repositoryRoot, relativePath), "utf8")),
  );
  const semantic = JSON.parse(semanticText);
  const reconciliation = JSON.parse(reconciliationText);
  const pointer = JSON.parse(pointerText);
  const reassignments = JSON.parse(reassignmentText);
  const manifestText = await readFile(path.join(repositoryRoot, pointer.activeManifest), "utf8");
  const manifest = JSON.parse(manifestText);
  const fields = reconciliation.codebooks.atomTuple;
  const field = Object.fromEntries(fields.map((name, index) => [name, index]));
  const tupleByAtomId = new Map(reconciliation.atoms.map(tuple => [tuple[field.atomId], tuple]));
  const semanticByAtomId = new Map(semantic.atoms.map(atom => [atom.atomId, atom]));
  assert(reassignments.schemaVersion === 1
    && reassignments.kind === "current-canonical-owner-reassignments"
    && Array.isArray(reassignments.entries),
  "canonical owner reassignment input is invalid");
  const reassignmentByAtomId = new Map();
  for (const reassignment of reassignments.entries) {
    const atomId = String(reassignment.atomId || "");
    const supersededOwnerId = String(reassignment.supersedesCanonicalOwnerId || "");
    const canonicalOwnerId = String(reassignment.canonicalOwnerId || "");
    assert(atomId && !reassignmentByAtomId.has(atomId),
      `duplicate or empty canonical owner reassignment: ${atomId}`);
    const tuple = tupleByAtomId.get(atomId);
    const atom = semanticByAtomId.get(atomId);
    assert(tuple && atom, `canonical owner reassignment has unknown atom: ${atomId}`);
    assert(atom.force === "grammar-bearing",
      `canonical owner reassignment is not grammar-bearing: ${atomId}`);
    assert(tuple[field.canonicalOwnerId] === supersededOwnerId,
      `canonical owner reassignment source drifted: ${atomId}`);
    assert(canonicalOwnerId && canonicalOwnerId !== supersededOwnerId,
      `canonical owner reassignment target is invalid: ${atomId}`);
    reassignmentByAtomId.set(atomId, reassignment);
  }
  const observationByAtomId = new Map(manifest.observations.map(observation => [observation.atomId, observation]));
  const receiptByAtomId = await receiptReferences(manifest);
  const grammarOwnerIds = new Set(reconciliation.atoms
    .filter(tuple => tuple[field.force] === "grammar-bearing")
    .map(tuple => tuple[field.canonicalOwnerId]));
  reassignments.entries.forEach(reassignment => {
    grammarOwnerIds.add(reassignment.canonicalOwnerId);
  });
  const ownerReference = await ownerReferences(grammarOwnerIds);
  for (const reassignment of reassignments.entries) {
    const ownerPath = ownerReference.get(reassignment.canonicalOwnerId) || "";
    assert(ownerPath, `canonical owner reassignment target is unresolved: ${reassignment.atomId}`);
    const imported = await import(pathToFileURL(path.join(repositoryRoot, ownerPath)).href);
    const ownerSpec = imported.default || imported.spec || null;
    assert(ownerSpec?.ownerId === reassignment.canonicalOwnerId,
      `canonical owner reassignment target identity mismatch: ${reassignment.atomId}`);
  }
  const ledgerFields = Object.freeze([
    "atomId", "canvasSection", "canvasSpan", "meaning", "force", "category",
    "semanticFacets", "semanticOwnerId", "semanticOwnerReference", "projectRole",
    "applicationAxisIds", "referenceKind", "referencePath", "referenceCoordinate",
    "checkedStatus", "legacyTrackingKind",
  ]);
  const counts = {
    atoms: 0,
    grammarBearing: 0,
    evidence: 0,
    analysis: 0,
    documentary: 0,
    exactlyObserved: 0,
    retainedCanonicalProof: 0,
    exactObservationPending: 0,
    classifiedNonGrammar: 0,
    orphanAtoms: 0,
    orphanSemanticOwners: 0,
  };
  const orphanOwnerIds = new Set();
  const usedReassignments = new Set();
  const atoms = semantic.atoms.map(atom => {
    const tuple = tupleByAtomId.get(atom.atomId);
    assert(tuple, `missing project-role tuple for ${atom.atomId}`);
    const force = atom.force;
    const grammarBearing = force === "grammar-bearing";
    const reassignment = grammarBearing
      ? reassignmentByAtomId.get(atom.atomId) || null
      : null;
    const ownerId = grammarBearing
      ? reassignment?.canonicalOwnerId || tuple[field.canonicalOwnerId]
      : "";
    if (reassignment) usedReassignments.add(atom.atomId);
    const ownerPath = grammarBearing ? ownerReference.get(ownerId) || "" : "";
    if (grammarBearing && (!ownerId || !ownerPath)) orphanOwnerIds.add(ownerId || `(missing:${atom.atomId})`);
    const observation = observationByAtomId.get(atom.atomId) || null;
    const retained = tuple[field.proofCoordinateKind] === "retained-existing-canonical-proof";
    let referenceKind;
    let referencePath;
    let referenceCoordinate;
    let checkedStatus;
    if (!grammarBearing) {
      referenceKind = "canvas-presentation";
      referencePath = "docs/ANDREWS_CANVAS_INVENTORY.md";
      referenceCoordinate = atom.atomId;
      checkedStatus = "classified-non-grammar";
      counts.classifiedNonGrammar += 1;
    } else if (observation) {
      referenceKind = "exact-observation-receipt";
      referencePath = receiptByAtomId.get(atom.atomId) || pointer.activeManifest;
      referenceCoordinate = observation.canonicalPath || observation.assertionId || atom.atomId;
      checkedStatus = "exactly-observed";
      counts.exactlyObserved += 1;
    } else if (retained) {
      referenceKind = "retained-canonical-proof";
      referencePath = ownerPath;
      referenceCoordinate = ownerId;
      checkedStatus = "exactly-observed-retained";
      counts.retainedCanonicalProof += 1;
    } else {
      referenceKind = "active-exact-observation-backlog";
      referencePath = pointer.activeManifest;
      referenceCoordinate = atom.atomId;
      checkedStatus = "exact-observation-pending";
      counts.exactObservationPending += 1;
    }
    counts.atoms += 1;
    counts[force === "grammar-bearing" ? "grammarBearing" : force] += 1;
    return [
      atom.atomId,
      atom.belongsTo,
      atom.canvasSpan,
      atom.anchor,
      force,
      atom.category,
      atom.about,
      ownerId,
      ownerPath,
      tuple[field.uiRole],
      tuple[field.applicationAxisIds],
      referenceKind,
      referencePath,
      referenceCoordinate,
      checkedStatus,
      tuple[field.proofCoordinateKind],
    ];
  });
  counts.orphanSemanticOwners = orphanOwnerIds.size;
  counts.orphanAtoms = atoms.filter(tuple => tuple[4] === "grammar-bearing" && (!tuple[7] || !tuple[8])).length;
  counts.canonicalOwnerReassignments = usedReassignments.size;
  assert(counts.atoms === 28540, "fixed atom denominator drifted");
  assert(counts.grammarBearing === 18639, "fixed grammar-bearing denominator drifted");
  assert(new Set(atoms.map(tuple => tuple[0])).size === counts.atoms, "duplicate atom ID in authoritative ledger");
  assert(counts.orphanAtoms === 0 && counts.orphanSemanticOwners === 0, "authoritative ledger contains orphan grammar atoms");
  assert(usedReassignments.size === reassignmentByAtomId.size,
    "not every canonical owner reassignment was applied exactly once");
  assert(counts.exactlyObserved === manifest.counts.exactlyObserved, "active exact-observation count drifted");
  assert(counts.retainedCanonicalProof === 5347, "retained canonical proof count drifted");
  assert(counts.exactlyObserved + counts.retainedCanonicalProof + counts.exactObservationPending === counts.grammarBearing,
    "grammar checked-status accounting drifted");
  const ledger = {
    schemaVersion: 1,
    kind: "authoritative-classical-canvas-atom-ledger",
    status: "current-checked",
    authority: {
      trackingAuthority: "sole-current-atom-tracking-ledger",
      grammarAuthority: false,
      rule: "A ledger record tracks an atom; it never creates or authorizes grammar behavior.",
      semanticAuthority: "real canonical owner referenced by semanticOwnerId and semanticOwnerReference",
    },
    scope: {
      source: "ANDREWS_TRANSCRIPTION_CANVAS.md",
      lessons: "1-58",
      fixedAtomDenominator: 28540,
      fixedGrammarBearingDenominator: 18639,
    },
    counts,
    activeExactObservation: {
      manifest: pointer.activeManifest,
      manifestDigest: pointer.activeManifestDigest,
      rollbackManifest: pointer.rollbackManifest,
      exactlyObserved: manifest.counts.exactlyObserved,
      failed: manifest.counts.failed,
    },
    compatibilityInputs: {
      note: "These preserved versioned inputs support proof-history replay and existing checkpoint tooling; they are not competing current atom ledgers.",
      semanticScope: inputPaths.semantic,
      projectRoleReconciliation: inputPaths.reconciliation,
      proofMigrationHistory: "docs/ANDREWS_INDIVIDUAL_ATOM_PROOF_MIGRATION.json",
    },
    currentInputs: {
      canonicalOwnerReassignments: inputPaths.canonicalOwnerReassignments,
    },
    invariants: {
      stableUniqueAtomIds: true,
      everyGrammarAtomHasRealSemanticOwner: true,
      everyAtomHasProofOrPresentationReference: true,
      checkedStatusesAreExhaustive: true,
      trackingRecordsAuthorizeGrammar: false,
      evidenceAbsenceBlocksGeneration: false,
      examplesWhitelistRealization: false,
      canonicalOwnerReassignmentsValidatedAgainstHistoricalSnapshot: true,
    },
    codebook: { atomTuple: ledgerFields },
    inputDigests: {
      semantic: sha256(semanticText),
      reconciliation: sha256(reconciliationText),
      exactObservationPointer: sha256(pointerText),
      activeExactObservationManifest: sha256(manifestText),
      canonicalOwnerReassignments: sha256(reassignmentText),
    },
    atoms,
  };
  const serialized = `${JSON.stringify(ledger)}\n`;
  const absoluteOutputPath = path.join(repositoryRoot, outputPath);
  if (checkOnly) {
    assert(await readFile(absoluteOutputPath, "utf8") === serialized, `${outputPath} is stale; regenerate it`);
  } else {
    await writeFile(absoluteOutputPath, serialized);
  }
  return Object.freeze({ outputPath, counts });
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  console.log(JSON.stringify(await buildAuthoritativeAtomLedger({ checkOnly: process.argv.includes("--check") }), null, 2));
}
