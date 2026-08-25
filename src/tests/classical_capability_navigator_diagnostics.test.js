"use strict";

const path = require("path");
const { spawnSync } = require("child_process");
const { pathToFileURL } = require("url");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function readProbe() {
    const ledgerUrl = pathToFileURL(path.join(
        ROOT,
        "src/ui/diagnostics/classical_nested_control_ledger.mjs"
    )).href;
    const atlasUrl = pathToFileURL(path.join(
        ROOT,
        "src/ui/diagnostics/classical_grammatical_atlas.mjs"
    )).href;
    const script = `
      const ledger = await import(${JSON.stringify(ledgerUrl)});
      const atlas = await import(${JSON.stringify(atlasUrl)});
      const operationIds = ["operation:a", "operation:b", "operation:c"];
      const capabilityFrame = Object.freeze({
        kind: "classical-grammar-application-capability-navigator",
        version: 1,
        operationIds: Object.freeze(operationIds),
        operations: Object.freeze([
          Object.freeze({
            operationId: operationIds[0],
            availabilityStatus: "available",
            changes: Object.freeze({
              adds: Object.freeze(["voice"]),
              removes: Object.freeze([]),
            }),
            preserves: Object.freeze(["typed-source"]),
            routeDestination: "vnc-result",
          }),
          Object.freeze({
            operationId: operationIds[1],
            availabilityStatus: "missing-prerequisite",
            changes: Object.freeze({
              adds: Object.freeze(["relation"]),
              removes: Object.freeze([]),
            }),
            preserves: Object.freeze(["exact-result"]),
            routeDestination: "clause-result",
          }),
          Object.freeze({
            operationId: operationIds[2],
            availabilityStatus: "incompatible",
            changes: Object.freeze({ adds: Object.freeze([]), removes: Object.freeze([]) }),
            preserves: Object.freeze([]),
            routeDestination: "nnc-result",
          }),
        ]),
        typeCompatibilityOnly: false,
        directOwnerEvaluationIncluded: true,
        ownerAuthorizationStillRequired: true,
        grammarAuthority: false,
      });

      const documentObject = {
        defaultView: {
          getComputedStyle() {
            return { display: "block", visibility: "visible" };
          },
        },
        getElementById(id) {
          if (id === "classical-capability-navigator") return root;
          if (id === "capability-frame") return frameElement;
          return null;
        },
        querySelector() { return null; },
      };
      const makeReadout = (kind, value) => ({
        dataset: kind === "changes"
          ? { classicalCapabilityPathwayChanges: value }
          : { classicalCapabilityPathwayPreserves: value },
        textContent: value,
      });
      const makeItem = (record, selected = false) => {
        const changes = makeReadout(
          "changes",
          JSON.stringify(record.changes),
        );
        const preserves = makeReadout(
          "preserves",
          record.preserves.join("|"),
        );
        return {
          id: "capability-" + record.operationId,
          dataset: {
            classicalCapabilityOperationId: record.operationId,
            classicalCapabilityStatus: record.availabilityStatus,
            classicalCapabilityRouteDestination: record.routeDestination,
            classicalCapabilitySelected: String(selected),
          },
          attributes: [],
          hidden: false,
          isConnected: true,
          parentElement: null,
          ownerDocument: documentObject,
          getClientRects() { return [{}]; },
          getAttribute() { return null; },
          matches() { return false; },
          querySelector(selector) {
            if (selector.includes("pathway-changes")) return changes;
            if (selector.includes("pathway-preserves")) return preserves;
            return null;
          },
        };
      };
      const deliveredItems = capabilityFrame.operations
        .filter(record => record.availabilityStatus !== "incompatible")
        .map((record, index) => makeItem(record, index === 0));
      const root = {
        dataset: { classicalCapabilityFrameId: "capability-frame" },
        querySelectorAll(selector) {
          return selector.includes("capability-operation-id")
            ? deliveredItems
            : [];
        },
      };
      const frameElement = {
        id: "capability-frame",
        textContent: JSON.stringify(capabilityFrame),
      };
      const observed = ledger.observeClassicalCapabilityNavigatorPathways(
        documentObject,
      );
      const omitted = ledger.buildClassicalCapabilityNavigatorPathwayCast({
        capabilityFrame,
        deliveredRecords: observed.deliveredRecords.slice(1),
      });
      const unexpected = ledger.buildClassicalCapabilityNavigatorPathwayCast({
        capabilityFrame,
        deliveredRecords: [
          ...observed.deliveredRecords,
          {
            operationId: "operation:unknown",
            status: "compatible",
            changes: { adds: [], removes: [] },
            preserves: [],
            routeDestination: "unknown-result",
          },
        ],
      });
      const mismatch = ledger.buildClassicalCapabilityNavigatorPathwayCast({
        capabilityFrame,
        deliveredRecords: observed.deliveredRecords.map((record, index) => (
          index === 0
            ? { ...record, status: "missing-prerequisite", routeDestination: "wrong" }
            : record
        )),
      });
      const anthillJoin = atlas.buildClassicalGrammaticalAtlasAnthillJoin({
        nestedControlLedger: {
          revision: 7,
          pathways: { capabilityNavigator: unexpected },
          compositionPath: { deliveredSummary: {} },
          route: { sourceUnit: "vnc", result: {} },
        },
        operationIds,
      });
      process.stdout.write(JSON.stringify({
        observed: {
          frameAccepted: observed.frame.acceptedAsNonAuthorizingObservation,
          ownerStillRequired: observed.frame.ownerAuthorizationStillRequired,
          expected: observed.expectedOperationIds,
          delivered: observed.deliveredOperationIds,
          incompatible: observed.incompatibleOperationIds,
          missing: observed.missingOperationIds,
          unexpected: observed.unexpectedOperationIds,
          fields: observed.deliveredRecords.map(record => ({
            operationId: record.operationId,
            status: record.status,
            changes: record.changes,
            preserves: record.preserves,
            routeDestination: record.routeDestination,
          })),
          authority: observed.authority,
        },
        differences: {
          omitted: omitted.missingOperationIds,
          unexpected: unexpected.unexpectedOperationIds,
          statusMismatch: mismatch.statusMismatchOperationIds,
          destinationMismatch: mismatch.routeDestinationMismatchOperationIds,
        },
        anthill: {
          pathways: anthillJoin.capabilityPathwayIds,
          matched: anthillJoin.matchedCapabilityPathwayIds,
          unknown: anthillJoin.unknownCapabilityPathwayIds,
          missing: anthillJoin.missingCapabilityPathwayIds,
          unexpected: anthillJoin.unexpectedCapabilityPathwayIds,
          authority: {
            grammar: anthillJoin.grammarAuthority,
            ui: anthillJoin.uiAuthority,
            pathway: anthillJoin.capabilityPathwaysDoNotAuthorizeGrammar,
          },
        },
      }));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { cwd: ROOT, encoding: "utf8", maxBuffer: 1024 * 1024 }
    );
    if (result.status !== 0) {
        throw new Error(result.stderr || "capability diagnostics probe failed");
    }
    return JSON.parse(result.stdout);
}

function run() {
    const s = createSuite("classical_capability_navigator_diagnostics");
    const probe = readProbe();

    s.eq(
        "the ledger projects every delivered capability field from the embedded non-authorizing frame",
        probe.observed,
        {
            frameAccepted: true,
            ownerStillRequired: true,
            expected: ["operation:a", "operation:b"],
            delivered: ["operation:a", "operation:b"],
            incompatible: ["operation:c"],
            missing: [],
            unexpected: [],
            fields: [
                {
                    operationId: "operation:a",
                    status: "available",
                    changes: { adds: ["voice"], removes: [], summary: "" },
                    preserves: ["typed-source"],
                    routeDestination: "vnc-result",
                },
                {
                    operationId: "operation:b",
                    status: "missing-prerequisite",
                    changes: { adds: ["relation"], removes: [], summary: "" },
                    preserves: ["exact-result"],
                    routeDestination: "clause-result",
                },
            ],
            authority: {
                grammarAuthority: false,
                uiAuthority: false,
                capabilityFrameAuthorizesGrammar: false,
                deliveredPathwaysAuthorizeGrammar: false,
            },
        }
    );
    s.eq(
        "missing, unexpected, and mismatched pathway sets are derived without a route list",
        probe.differences,
        {
            omitted: ["operation:a"],
            unexpected: ["operation:unknown"],
            statusMismatch: ["operation:a"],
            destinationMismatch: ["operation:a"],
        }
    );
    s.eq(
        "the live Atlas joins known pathway IDs and observes unknown delivery without authorizing either",
        probe.anthill,
        {
            pathways: ["operation:a", "operation:b", "operation:unknown"],
            matched: ["operation:a", "operation:b"],
            unknown: ["operation:unknown"],
            missing: [],
            unexpected: ["operation:unknown"],
            authority: { grammar: false, ui: false, pathway: true },
        }
    );

    return s;
}

module.exports = { run };
