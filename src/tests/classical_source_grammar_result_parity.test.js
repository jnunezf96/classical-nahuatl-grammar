"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const PROJECT_ROOT = path.resolve(__dirname, "..", "..");

const AXIS_STAGE_BY_DISPOSITION = Object.freeze({
    "interactive-choice": "grammar",
    "intentionally-unsurfaced": "grammar",
    "internal-support": "internal",
});

const OUTPUT_STAGE_BY_DISPOSITION = Object.freeze({
    "public-result": "result",
    "analysis-readout": "result-analysis",
    "composed-projection": "result-continuation",
    "internal-support": "internal",
});

function readLedger(relativePath) {
    return JSON.parse(fs.readFileSync(
        path.join(PROJECT_ROOT, relativePath),
        "utf8"
    ));
}

function countBy(values) {
    return Object.fromEntries(
        Object.entries(values.reduce((counts, value) => {
            counts[value] = (counts[value] || 0) + 1;
            return counts;
        }, {})).sort(([left], [right]) => left.localeCompare(right))
    );
}

function isNonemptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

function sortedByAtomId(entries) {
    return [...entries].sort((left, right) =>
        String(left.atomId).localeCompare(String(right.atomId)));
}

function compareEntryProjections(actualEntries, expectedEntries) {
    const actualById = new Map(actualEntries.map(entry => [entry.atomId, entry]));
    const expectedById = new Map(expectedEntries.map(entry => [entry.atomId, entry]));
    return {
        missing: expectedEntries
            .filter(entry => !actualById.has(entry.atomId))
            .map(entry => entry.atomId),
        unexpected: actualEntries
            .filter(entry => !expectedById.has(entry.atomId))
            .map(entry => entry.atomId),
        drift: expectedEntries.flatMap(expected => {
            const actual = actualById.get(expected.atomId);
            return actual && JSON.stringify(actual) !== JSON.stringify(expected)
                ? [{ atomId: expected.atomId, expected, actual }]
                : [];
        }),
    };
}

function run(ctx = {}) {
    const suite = createSuite("classical_source_grammar_result_parity");
    const axisLedger = readLedger(
        "docs/CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json"
    );
    const outputLedger = readLedger(
        "docs/CLASSICAL_APPLICATION_OUTPUT_DISPOSITIONS.json"
    );
    const getInventory = ctx.getClassicalSourceGrammarResultSurfaceInventory;

    suite.eq(
        "the production UI exports the Source Grammar Result surface inventory API",
        typeof getInventory,
        "function"
    );

    const inventory = typeof getInventory === "function"
        ? getInventory()
        : {};
    const axes = Array.isArray(inventory?.axes) ? inventory.axes : [];
    const outputs = Array.isArray(inventory?.outputs) ? inventory.outputs : [];
    const atoms = [...axes, ...outputs];

    suite.eq(
        "the production inventory is explicitly non-authorizing",
        {
            kind: inventory?.kind,
            version: inventory?.version,
            uiAuthority: inventory?.authority?.uiAuthority,
            grammarAuthority: inventory?.authority?.grammarAuthority,
        },
        {
            kind: "classical-source-grammar-result-surface-inventory",
            version: 2,
            uiAuthority: "none",
            grammarAuthority: false,
        }
    );

    const ledgerAtomIds = [
        ...axisLedger.entries.map(entry => entry.atomId),
        ...outputLedger.entries.map(entry => entry.atomId),
    ].sort();
    const inventoryAtomIds = atoms.map(atom => atom.atomId).sort();
    const ledgerAtomIdSet = new Set(ledgerAtomIds);
    const inventoryAtomIdSet = new Set(inventoryAtomIds);
    suite.eq(
        "the production inventory binds the exact 447-atom parity denominator",
        {
            axes: axes.length,
            outputs: outputs.length,
            atoms: atoms.length,
            uniqueAtoms: new Set(inventoryAtomIds).size,
            missingAtomIds: ledgerAtomIds.filter(atomId =>
                !inventoryAtomIdSet.has(atomId)),
            unexpectedAtomIds: inventoryAtomIds.filter(atomId =>
                !ledgerAtomIdSet.has(atomId)),
        },
        {
            axes: 392,
            outputs: 55,
            atoms: 447,
            uniqueAtoms: 447,
            missingAtomIds: [],
            unexpectedAtomIds: [],
        }
    );

    const expectedAxes = sortedByAtomId(axisLedger.entries).map(entry => ({
        atomId: entry.atomId,
        operationId: entry.operationId,
        axisId: entry.axisId,
        disposition: entry.surfaceDisposition,
    }));
    const actualAxes = sortedByAtomId(axes).map(entry => ({
        atomId: entry.atomId,
        operationId: entry.operationId,
        axisId: entry.axisId,
        disposition: entry.disposition,
    }));
    suite.eq(
        "every production axis identity and disposition matches the axis ledger",
        compareEntryProjections(actualAxes, expectedAxes),
        { missing: [], unexpected: [], drift: [] }
    );

    const expectedOutputs = sortedByAtomId(outputLedger.entries).map(entry => ({
        atomId: entry.atomId,
        operationId: entry.operationId,
        outputKind: entry.outputKind,
        disposition: entry.productDisposition,
    }));
    const actualOutputs = sortedByAtomId(outputs).map(entry => ({
        atomId: entry.atomId,
        operationId: entry.operationId,
        outputKind: entry.outputKind,
        disposition: entry.disposition,
    }));
    suite.eq(
        "every production output identity and disposition matches the output ledger",
        compareEntryProjections(actualOutputs, expectedOutputs),
        { missing: [], unexpected: [], drift: [] }
    );

    suite.eq(
        "axis and output dispositions retain their exact closed partitions",
        {
            axes: countBy(axes.map(entry => entry.disposition)),
            outputs: countBy(outputs.map(entry => entry.disposition)),
        },
        {
            axes: {
                "intentionally-unsurfaced": 326,
                "interactive-choice": 64,
                "internal-support": 2,
            },
            outputs: {
                "analysis-readout": 6,
                "composed-projection": 5,
                "internal-support": 15,
                "public-result": 29,
            },
        }
    );

    const unresolvedOrAuthorizing = atoms.flatMap(atom => {
        const authority = atom?.authority || {};
        const disposition = String(atom?.disposition || "");
        const unresolved = atom?.status === "unresolved"
            || disposition === "unresolved"
            || atom?.semanticFactRole === "unresolved";
        const authorizing = authority.uiAuthority !== "none"
            || authority.grammarAuthority !== false;
        return unresolved || authorizing
            ? [{
                atomId: atom?.atomId || "",
                status: atom?.status,
                disposition,
                semanticFactRole: atom?.semanticFactRole,
                uiAuthority: authority.uiAuthority,
                grammarAuthority: authority.grammarAuthority,
            }]
            : [];
    });
    suite.eq(
        "no production atom is unresolved or owns UI or grammar authority",
        unresolvedOrAuthorizing,
        []
    );

    const bindingFailures = atoms.flatMap(atom => {
        const axisDisposition = AXIS_STAGE_BY_DISPOSITION[atom.disposition];
        const outputDisposition = OUTPUT_STAGE_BY_DISPOSITION[atom.disposition];
        const expectedStage = axisDisposition || outputDisposition || "";
        const expectedPublic = ![
            "internal-support",
            "intentionally-unsurfaced",
        ].includes(atom.disposition);
        const binding = atom?.binding;
        const valid = binding
            && binding.atomId === atom.atomId
            && binding.operationId === atom.operationId
            && binding.stage === expectedStage
            && binding.public === expectedPublic;
        return valid
            ? []
            : [{
                atomId: atom?.atomId || "",
                expected: {
                    atomId: atom?.atomId || "",
                    operationId: atom?.operationId || "",
                    stage: expectedStage,
                    public: expectedPublic,
                },
                actual: binding || null,
            }];
    });
    suite.eq(
        "every atom has an exact Source Grammar Result or internal binding",
        bindingFailures,
        []
    );

    const publicAtoms = atoms.filter(atom => atom?.binding?.public === true);
    const privateAtoms = atoms.filter(atom => atom?.binding?.public === false);
    suite.eq(
        "the public and private proof boundaries remain exact",
        {
            publicAtoms: publicAtoms.length,
            privateAtoms: privateAtoms.length,
        },
        {
            publicAtoms: 104,
            privateAtoms: 343,
        }
    );

    const publicProofFailures = publicAtoms.flatMap(atom => {
        const proof = atom?.proof;
        const valid = proof?.boundary === "public"
            && isNonemptyString(proof.focusedReceiptId)
            && isNonemptyString(proof.liveReceiptId);
        return valid ? [] : [atom?.atomId || ""];
    });
    const privateProofFailures = privateAtoms.flatMap(atom => {
        const proof = atom?.proof;
        const valid = proof?.boundary === "private"
            && isNonemptyString(proof.executionReceiptId)
            && isNonemptyString(proof.inertnessReceiptId);
        return valid ? [] : [atom?.atomId || ""];
    });
    suite.eq(
        "every public atom has focused and live proof IDs and every private atom has execution and inertness proof IDs",
        {
            publicProofFailures,
            privateProofFailures,
        },
        {
            publicProofFailures: [],
            privateProofFailures: [],
        }
    );

    const publicReceiptIds = publicAtoms.flatMap(atom => [
        atom?.proof?.focusedReceiptId,
        atom?.proof?.liveReceiptId,
    ]);
    const privateReceiptIds = privateAtoms.flatMap(atom => [
        atom?.proof?.executionReceiptId,
        atom?.proof?.inertnessReceiptId,
    ]);
    suite.eq(
        "parity proof IDs are atom-specific rather than shared aggregate receipts",
        {
            publicReceiptCount: publicReceiptIds.length,
            uniquePublicReceipts: new Set(publicReceiptIds).size,
            privateReceiptCount: privateReceiptIds.length,
            uniquePrivateReceipts: new Set(privateReceiptIds).size,
        },
        {
            publicReceiptCount: 208,
            uniquePublicReceipts: 208,
            privateReceiptCount: 686,
            uniquePrivateReceipts: 686,
        }
    );

    return suite;
}

module.exports = { run };
