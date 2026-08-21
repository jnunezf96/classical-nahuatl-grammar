#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createClassicalGrammarApplicationApi,
} from "../../src/application/classical/grammar_application.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const LEDGER_PATH = path.join(
  ROOT,
  "docs/CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json",
);
const STATE_PATH = path.join(ROOT, "src/ui/state.mjs");

const DIRECT_PROVENANCE = Object.freeze({
  "CAA-particle-negative-selection--polarity": Object.freeze([
    "ACI-P057-L020-0F1964812D",
  ]),
  "CAA-particle-negative-selection--sentence-kind": Object.freeze([
    "ACI-P057-L023-C7FBC7F91A-02",
    "ACI-P057-L023-C7FBC7F91A-05",
  ]),
});

function countBy(values, orderedKeys = []) {
  const counts = Object.fromEntries(orderedKeys.map(key => [key, 0]));
  values.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
}

function applicationRows() {
  const api = createClassicalGrammarApplicationApi({});
  return api.getClassicalGrammarApplicationInventory().operations.flatMap(
    operation => operation.axisIds.map(axisId => ({
      atomId: `CAA-${operation.operationId.replace(/:/gu, "-")}--${axisId}`,
      operationId: operation.operationId,
      axisId,
      semanticFactRole:
        operation.axisSemanticFactRoles[axisId] || "unresolved",
    })),
  );
}

function compactLedgerJson(ledger) {
  const bridgeEntries = ledger.canvasProvenance.entries;
  ledger.canvasProvenance.entries = ["__COMPACT_BRIDGE_ENTRIES__"];
  const expanded = JSON.stringify(ledger, null, 2);
  ledger.canvasProvenance.entries = bridgeEntries;
  const compactEntries = bridgeEntries.map(entry => (
    `      ${JSON.stringify(entry)}`
  )).join(",\n");
  return `${expanded.replace(
    /      "__COMPACT_BRIDGE_ENTRIES__"/u,
    compactEntries,
  )}\n`;
}

function reconcileLedger() {
  const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, "utf8"));
  const liveRows = applicationRows();
  const liveIds = new Set(liveRows.map(row => row.atomId));
  const existingById = new Map(ledger.entries.map(entry => [entry.atomId, entry]));
  const templates = new Map();
  ledger.entries.forEach(entry => {
    if (!templates.has(entry.surfaceDisposition)) {
      templates.set(entry.surfaceDisposition, entry);
    }
  });

  const entries = liveRows.map(row => {
    const existing = existingById.get(row.atomId);
    if (existing) {
      return row.semanticFactRole === "unresolved"
        ? existing
        : {
          ...existing,
          semanticFactRole: row.semanticFactRole,
          roleEvidenceKind: "live-application-declaration",
        };
    }
    if (row.semanticFactRole === "unresolved") {
      throw new Error(`Unresolved new application axis: ${row.atomId}`);
    }
    const surfaceDisposition = row.semanticFactRole === "genuine-user-choice"
      ? "interactive-choice"
      : "intentionally-unsurfaced";
    const template = templates.get(surfaceDisposition);
    if (!template) {
      throw new Error(`Missing disposition template: ${surfaceDisposition}`);
    }
    return {
      atomId: row.atomId,
      operationId: row.operationId,
      axisId: row.axisId,
      semanticFactRole: row.semanticFactRole,
      roleEvidenceKind: "live-application-declaration",
      surfaceDisposition,
      surfaceRationale: template.surfaceRationale,
      proofObligation: template.proofObligation,
      uiAuthority: "none",
      status: "classified",
    };
  });

  const staleIds = ledger.entries
    .filter(entry => !liveIds.has(entry.atomId))
    .map(entry => entry.atomId);
  if (staleIds.length) {
    throw new Error(`Stale application axes: ${staleIds.join(", ")}`);
  }

  const bridgeById = new Map(ledger.canvasProvenance.entries.map(entry => [
    entry.applicationAxisAtomId,
    entry,
  ]));
  Object.entries(DIRECT_PROVENANCE).forEach(([applicationAxisAtomId, canvasAtomIds]) => {
    bridgeById.set(applicationAxisAtomId, {
      applicationAxisAtomId,
      canvasAtomIds: [...canvasAtomIds],
    });
  });
  const bridgeEntries = [...bridgeById.values()].sort((left, right) => (
    left.applicationAxisAtomId.localeCompare(right.applicationAxisAtomId)
  ));
  const linkedAtomIds = bridgeEntries.flatMap(entry => entry.canvasAtomIds);

  ledger.version = 7;
  ledger.entries = entries;
  ledger.counts = {
    operationCount: new Set(entries.map(entry => entry.operationId)).size,
    uniqueAxisCount: new Set(entries.map(entry => entry.axisId)).size,
    entryCount: entries.length,
    status: countBy(entries.map(entry => entry.status), ["classified", "unresolved"]),
    surfaceDisposition: countBy(
      entries.map(entry => entry.surfaceDisposition),
      [
        "interactive-choice",
        "read-only-fact",
        "diagnostic-evidence",
        "internal-support",
        "intentionally-unsurfaced",
        "unresolved",
      ],
    ),
    semanticFactRole: countBy(
      entries.map(entry => entry.semanticFactRole),
      [
        "architecture-invariant",
        "boundary-conditioned-fact",
        "contextual-fact",
        "derived-fact",
        "genuine-user-choice",
        "lexical-fact",
        "unresolved",
      ],
    ),
    roleEvidenceKind: countBy(
      entries.map(entry => entry.roleEvidenceKind),
      ["live-application-declaration", "canonical-owner-contract-audit"],
    ),
  };
  ledger.canvasProvenance.entries = bridgeEntries;
  ledger.canvasProvenance.counts = {
    ...ledger.canvasProvenance.counts,
    interactiveAxisCount: entries.filter(entry => (
      entry.surfaceDisposition === "interactive-choice"
    )).length,
    mappedAxisCount: bridgeEntries.length,
    unmappedAxisCount: 0,
    directProvenanceLinkCount: linkedAtomIds.length,
    uniqueDirectProvenanceAtomCount: new Set(linkedAtomIds).size,
  };
  fs.writeFileSync(LEDGER_PATH, compactLedgerJson(ledger));
  return ledger;
}

function reconcileState(ledger) {
  let source = fs.readFileSync(STATE_PATH, "utf8");
  const provenanceRows = ledger.canvasProvenance.entries.map(entry => (
    `  ${JSON.stringify(entry.applicationAxisAtomId)}: Object.freeze(${JSON.stringify(entry.canvasAtomIds)})`
  )).join(",\n");
  source = source.replace(
    /const CLASSICAL_SOURCE_GRAMMAR_RESULT_CANVAS_PROVENANCE = Object\.freeze\(\{[\s\S]*?\n\}\);\n\nconst CLASSICAL_SOURCE_GRAMMAR_RESULT_NO_CANVAS_PROVENANCE/u,
    `const CLASSICAL_SOURCE_GRAMMAR_RESULT_CANVAS_PROVENANCE = Object.freeze({\n${provenanceRows}\n});\n\nconst CLASSICAL_SOURCE_GRAMMAR_RESULT_NO_CANVAS_PROVENANCE`,
  );
  const axisRows = ledger.entries.map(entry => (
    `${entry.operationId}|${entry.axisId}|${entry.surfaceDisposition}`
  )).join("\n");
  source = source.replace(
    /const CLASSICAL_SOURCE_GRAMMAR_RESULT_AXIS_ROWS = Object\.freeze\(`\n[\s\S]*?\n`\.trim\(\)\.split\("\\n"\)\.map\(row => Object\.freeze\(row\.split\("\|"\)\)\)\);/u,
    `const CLASSICAL_SOURCE_GRAMMAR_RESULT_AXIS_ROWS = Object.freeze(\`\n${axisRows}\n\`.trim().split("\\n").map(row => Object.freeze(row.split("|"))));`,
  );
  fs.writeFileSync(STATE_PATH, source);
}

const ledger = reconcileLedger();
reconcileState(ledger);
process.stdout.write(
  `Reconciled ${ledger.counts.entryCount} application axes across ${ledger.counts.operationCount} operations.\n`,
);
