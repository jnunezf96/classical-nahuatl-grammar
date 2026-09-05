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
    const nominalConstruction = inventory.operations.find(operation =>
        operation.operationId === "grammar:nominal-construction");
    const vncDerivationalOperation = inventory.operations.find(operation =>
        operation.operationId === "vnc:derivational-operation");
    const nominalSurfaceAxes = Object.fromEntries(
        ctx.getClassicalSourceGrammarResultSurfaceInventory().axes
            .filter(entry =>
                entry.operationId === "grammar:nominal-construction")
            .map(entry => [
                entry.axisId,
                {
                    role: nominalConstruction?.axisSemanticFactRoles[
                        entry.axisId
                    ],
                    disposition: entry.disposition,
                    canvasAtomIds: entry.canvasAtomIds,
                },
            ])
            .sort(([left], [right]) => left.localeCompare(right))
    );
    const vncDerivationalSurfaceAxes = Object.fromEntries(
        ctx.getClassicalSourceGrammarResultSurfaceInventory().axes
            .filter(entry =>
                entry.operationId === "vnc:derivational-operation")
            .map(entry => [
                entry.axisId,
                {
                    role: vncDerivationalOperation?.axisSemanticFactRoles[
                        entry.axisId
                    ],
                    disposition: entry.disposition,
                    canvasAtomIds: entry.canvasAtomIds,
                },
            ])
            .sort(([left], [right]) => left.localeCompare(right))
    );

    s.eq(
        "Canvas atoms resolve through the live nominal-construction owner without making the derived vacant state a choice",
        {
            axes: nominalSurfaceAxes,
            ownerCapability: nominalConstruction?.capabilityName,
        },
        {
            axes: {
                "affective-nnc": {
                    role: "genuine-user-choice",
                    disposition: "interactive-choice",
                    canvasAtomIds: [
                        "ACI-P304-L005-48EFFF29DA",
                        "ACI-P304-L007-AC2B0C0B42",
                    ],
                },
                "cardinal-number": {
                    role: "genuine-user-choice",
                    disposition: "interactive-choice",
                    canvasAtomIds: [
                        "ACI-P322-L006-3FBE3D3F72",
                        "ACI-P322-L009-81D7F1C9DF",
                    ],
                },
                "compound-nnc": {
                    role: "genuine-user-choice",
                    disposition: "interactive-choice",
                    canvasAtomIds: [
                        "ACI-P294-L003-00FE22E470",
                        "ACI-P294-L004-75BB08F9D3",
                    ],
                },
                "measure-modification": {
                    role: "genuine-user-choice",
                    disposition: "interactive-choice",
                    canvasAtomIds: [
                        "ACI-P322-L013-750123E9EC-02",
                        "ACI-P322-L015-D4456F71EE",
                    ],
                },
                "nominal-embed": {
                    role: "genuine-user-choice",
                    disposition: "interactive-choice",
                    canvasAtomIds: ["ACI-P275-L007-1F5E6886F4"],
                },
                "vacant-state": {
                    role: "derived-fact",
                    disposition: "intentionally-unsurfaced",
                    canvasAtomIds: [],
                },
            },
            ownerCapability:
                "evaluateClassicalNahuatlNominalConstruction",
        }
    );

    s.eq(
        "the attitude derivation family is the only public choice while order and participant facts stay owner-typed",
        {
            axes: vncDerivationalSurfaceAxes,
            ownerCapability: vncDerivationalOperation?.capabilityName,
        },
        {
            axes: {
                "derivation-family": {
                    role: "genuine-user-choice",
                    disposition: "interactive-choice",
                    canvasAtomIds: [
                        "ACI-P243-L011-43AC2A0DA2",
                        "ACI-P252-L002-896BFC2CEA",
                    ],
                },
                "operation-order": {
                    role: "derived-fact",
                    disposition: "intentionally-unsurfaced",
                    canvasAtomIds: [],
                },
                "source-participants": {
                    role: "contextual-fact",
                    disposition: "intentionally-unsurfaced",
                    canvasAtomIds: [],
                },
                "target-participants": {
                    role: "derived-fact",
                    disposition: "intentionally-unsurfaced",
                    canvasAtomIds: [],
                },
            },
            ownerCapability:
                "evaluateClassicalNahuatlLateVncDerivation",
        }
    );

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
            liveDeclared: 371,
            liveUnresolved: 70,
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
                "canonical-owner-contract-audit": 70,
                "live-application-declaration": 371,
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
                "live-application-declaration": 371,
                "canonical-owner-contract-audit": 70,
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
