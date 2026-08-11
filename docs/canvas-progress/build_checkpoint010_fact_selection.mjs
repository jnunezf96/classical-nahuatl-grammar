import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const ledgerPath = path.join(root, "docs/ANDREWS_ATOM_LEDGER.json");
const selectionPath = path.join(root, "docs/canvas-progress/checkpoint010_fact_selection.json");
const atomLimit = 500;
const ownerLimit = 50;
const skippedOwners = [{
  ownerId: "classical-adverbial-adjunction-condition-vnc-center",
  reason: "existing typed owner has no authorized canonical execution coordinate",
}];
const skippedOwnerIds = new Set(skippedOwners.map((record) => record.ownerId));
const ledgerText = await readFile(ledgerPath, "utf8");
const ledger = JSON.parse(ledgerText);
const fields = Object.fromEntries(ledger.codebook.atomTuple.map((field, index) => [field, index]));

let preserved = null;
try {
  preserved = JSON.parse(await readFile(selectionPath, "utf8"));
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

let atoms = preserved?.checkpoint === "010" ? preserved.atoms : [];
let owners = preserved?.checkpoint === "010" ? preserved.owners : [];
let sourceLedgerDigest = preserved?.checkpoint === "010"
  ? preserved.sourceLedgerDigest
  : `sha256:${createHash("sha256").update(ledgerText).digest("hex")}`;

if (!preserved) {
  const pendingByOwner = new Map();
  for (const atom of ledger.atoms) {
    if (atom[fields.checkedStatus] !== "exact-observation-pending"
      || atom[fields.projectRole] !== "read-only-grammar-fact") continue;
    const ownerId = atom[fields.semanticOwnerId];
    if (skippedOwnerIds.has(ownerId)) continue;
    const specPath = path.join(root, `src/core/classical/nuclear-owner-specs/${ownerId}.mjs`);
    let specText = "";
    try {
      specText = await readFile(specPath, "utf8");
    } catch (error) {
      if (error?.code === "ENOENT") continue;
      throw error;
    }
    if (!/"prefix": "[^"]+"/.test(specText)
      || !/"claim-[^"]+::[^"]+": \{/.test(specText)) continue;
    if (!pendingByOwner.has(ownerId)) pendingByOwner.set(ownerId, { atomIds: [], specText });
    pendingByOwner.get(ownerId).atomIds.push(atom[fields.atomId]);
  }
  const ranked = [...pendingByOwner.entries()].sort((left, right) =>
    right[1].atomIds.length - left[1].atomIds.length
    || left[0].localeCompare(right[0]));
  for (const [ownerId, record] of ranked) {
    if (atoms.length >= atomLimit || owners.length >= ownerLimit) break;
    const prefix = record.specText.match(/"prefix": "([^"]+)"/)?.[1] || "";
    const coordinate = record.specText.match(/"(claim-[^"]+::[^"]+)": \{/)?.[1] || "";
    const [selection, requestedFacet] = coordinate.split("::");
    owners.push({ ownerId, prefix, selection, requestedFacet });
    atoms.push(...record.atomIds.sort().slice(0, atomLimit - atoms.length)
      .map((atomId) => ({ atomId, semanticOwnerId: ownerId })));
  }
}

const output = {
  schemaVersion: 1,
  kind: "classical-canvas-grammar-fact-checkpoint-selection",
  checkpoint: "010",
  selectionRule: "largest supported pending read-only grammar-fact owners, owner-id tie break, atom-id order",
  counts: { selectedOwners: owners.length, selectedAtoms: atoms.length },
  sourceLedgerDigest,
  skippedOwners,
  owners,
  atoms,
};
if (atoms.length !== atomLimit && owners.length !== ownerLimit) {
  throw new Error(`checkpoint-threshold-not-reached:${owners.length}:${atoms.length}`);
}
await writeFile(selectionPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output.counts));
