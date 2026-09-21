import { createHash } from "node:crypto";

const digest = text => `sha256:${createHash("sha256").update(text).digest("hex")}`;
const requireThat = (condition, message) => {
  if (!condition) throw new Error(`exact-observation-integrity:${message}`);
};

// Integrity of stored evidence, not a replay or proof of current grammar.
export async function validateExactObservationIntegrity({ pointer, manifestText, readReceipt }) {
  requireThat(digest(manifestText) === pointer.activeManifestDigest, "manifest-digest-mismatch");
  const manifest = JSON.parse(manifestText);
  requireThat(manifest.status === "validated", "manifest-not-validated");
  requireThat(manifest.counts?.failed === 0, "manifest-failures");
  requireThat(Array.isArray(manifest.observations) && Array.isArray(manifest.receipts), "invalid-record-arrays");
  const observationByAtomId = new Map();
  for (const observation of manifest.observations) {
    if (observation.status !== "EXACTLY_OBSERVED") continue;
    requireThat(observation.atomId && !observationByAtomId.has(observation.atomId), "duplicate-or-empty-exact-atom");
    observationByAtomId.set(observation.atomId, observation);
  }
  requireThat(observationByAtomId.size === manifest.counts.exactlyObserved, "exact-count-mismatch");
  const receiptByAtomId = new Map();
  for (const record of manifest.receipts) {
    requireThat(typeof record.path === "string" && record.path.length > 0, "receipt-path-missing");
    // Read/parse errors intentionally propagate; missing evidence is not success.
    const text = await readReceipt(record.path);
    requireThat(digest(text) === record.digest, "receipt-digest-mismatch");
    const receipt = JSON.parse(text);
    requireThat(receipt.ownerId === record.ownerId, "receipt-owner-mismatch");
    requireThat(Array.isArray(receipt.observations), "receipt-observations-missing");
    for (const observation of receipt.observations) {
      const selected = observationByAtomId.get(observation.atomId);
      if (!selected || observation.status !== "EXACTLY_OBSERVED") continue;
      requireThat(observation.ownerId === selected.ownerId
        && observation.ownerId === receipt.ownerId
        && observation.assertionId === selected.assertionId
        && observation.canonicalPath === selected.canonicalPath,
      "receipt-observation-identity-mismatch");
      receiptByAtomId.set(observation.atomId, record.path);
    }
  }
  for (const atomId of observationByAtomId.keys()) {
    requireThat(receiptByAtomId.has(atomId), `exact-receipt-missing:${atomId}`);
  }
  return { observationByAtomId, receiptByAtomId };
}
