"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function countBy(values) {
    const counts = values.reduce((result, value) => {
        result[value] = (result[value] || 0) + 1;
        return result;
    }, {});
    return Object.fromEntries(Object.entries(counts).sort(([left], [right]) =>
        left.localeCompare(right)));
}

function run(ctx) {
    const s = createSuite("classical_application_axis_roles");
    const inventory = ctx.getClassicalGrammarApplicationInventory();
    const liveEntries = inventory.operations.flatMap(operation =>
        operation.axisIds.map(axisId => ({
            atomId: `CAA-${operation.operationId.replace(/:/gu, "-")}--${axisId}`,
            operationId: operation.operationId,
            axisId,
            role: operation.axisSemanticFactRoles[axisId] || "unresolved",
        }))
    );
    const ledger = JSON.parse(fs.readFileSync(
        path.resolve(
            __dirname,
            "../../docs/CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json"
        ),
        "utf8"
    ));
    const liveRoles = new Map(liveEntries.map(entry => [
        `${entry.operationId}/${entry.axisId}`,
        entry.role,
    ]));
    const declaredRoleDrift = ledger.entries.flatMap(entry => {
        const liveRole = liveRoles.get(`${entry.operationId}/${entry.axisId}`);
        return entry.roleEvidenceKind !== "live-application-declaration"
            || liveRole === entry.semanticFactRole
            ? []
            : [[entry.atomId, entry.semanticFactRole, liveRole]];
    });
    const auditedRoleEvidenceMissing = ledger.entries.flatMap(entry => (
        entry.roleEvidenceKind !== "canonical-owner-contract-audit"
        || ledger.authority.canonicalOwnerContractAudit
            .evidencePathsByOperation[entry.operationId]?.length > 0
            ? []
            : [entry.atomId]
    ));
    const interactiveRoleDrift = ledger.entries.flatMap(entry => {
        const isChoice = entry.semanticFactRole
            === "genuine-user-choice";
        const isInteractive = entry.surfaceDisposition
            === "interactive-choice";
        return isChoice === isInteractive
            ? []
            : [[entry.atomId, entry.semanticFactRole,
                entry.surfaceDisposition]];
    });

    s.eq(
        "all Lessons 1-58 axes have owner-evidenced roles without changing live owners",
        {
            entryCount: liveEntries.length,
            liveDeclared: liveEntries.filter(entry => entry.role !== "unresolved")
                .length,
            liveUnresolved: liveEntries.filter(entry => entry.role === "unresolved")
                .length,
            ledgerRoleCounts: countBy(ledger.entries.map(entry =>
                entry.semanticFactRole)),
            ledgerUnresolved: ledger.entries.filter(entry =>
                entry.semanticFactRole === "unresolved").map(entry => entry.atomId),
            evidenceKindCounts: countBy(ledger.entries.map(entry =>
                entry.roleEvidenceKind)),
            declaredRoleDrift,
            auditedRoleEvidenceMissing,
        },
        {
            entryCount: 441,
            liveDeclared: 361,
            liveUnresolved: 80,
            ledgerRoleCounts: {
                "architecture-invariant": 22,
                "boundary-conditioned-fact": 51,
                "contextual-fact": 113,
                "derived-fact": 131,
                "genuine-user-choice": 66,
                "lexical-fact": 58,
            },
            ledgerUnresolved: [],
            evidenceKindCounts: {
                "canonical-owner-contract-audit": 80,
                "live-application-declaration": 361,
            },
            declaredRoleDrift: [],
            auditedRoleEvidenceMissing: [],
        }
    );
    s.eq(
        "the non-authorizing parity ledger matches the live owner taxonomy",
        {
            version: ledger.version,
            entries: ledger.entries.length,
            interactiveRoleDrift,
            roleCounts: ledger.counts.semanticFactRole,
            evidenceKindCounts: ledger.counts.roleEvidenceKind,
            surfaceCounts: ledger.counts.surfaceDisposition,
            grammarAuthority: ledger.authority.grammarAuthority,
            semanticOwnerAuthority: ledger.authority.semanticOwnerAuthority,
            uiAuthority: ledger.authority.uiAuthority,
        },
        {
            version: 7,
            entries: 441,
            interactiveRoleDrift: [],
            roleCounts: {
                "architecture-invariant": 22,
                "boundary-conditioned-fact": 51,
                "contextual-fact": 113,
                "derived-fact": 131,
                "genuine-user-choice": 66,
                "lexical-fact": 58,
                unresolved: 0,
            },
            evidenceKindCounts: {
                "live-application-declaration": 361,
                "canonical-owner-contract-audit": 80,
            },
            surfaceCounts: {
                "interactive-choice": 66,
                "read-only-fact": 0,
                "diagnostic-evidence": 0,
                "internal-support": 2,
                "intentionally-unsurfaced": 373,
                unresolved: 0,
            },
            grammarAuthority: false,
            semanticOwnerAuthority: false,
            uiAuthority: "none",
        }
    );

    return s;
}

module.exports = { run };
