"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { pathToFileURL } = require("url");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function readLiveAtlasProbe() {
    const liveUrl = pathToFileURL(path.join(
        ROOT,
        "src/ui/diagnostics/classical_grammatical_atlas.mjs"
    )).href;
    const populationUrl = pathToFileURL(path.join(
        ROOT,
        "src/core/grammar/grammatical_atlas_population_adapter.mjs"
    )).href;
    const populationVersionUrl = pathToFileURL(path.join(
        ROOT,
        "data/classical_grammatical_atlas_population_version.mjs"
    )).href;
    const applicationUrl = pathToFileURL(path.join(
        ROOT,
        "src/application/classical/grammar_application.mjs"
    )).href;
    const script = `
        const liveModule = await import(${JSON.stringify(liveUrl)});
        const populationModule = await import(${JSON.stringify(populationUrl)});
        const populationVersionModule = await import(
          ${JSON.stringify(populationVersionUrl)}
        );
        const applicationModule = await import(${JSON.stringify(applicationUrl)});
        const populationVersion = populationVersionModule
          .CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_VERSION;
        const populationBeforeLoad = populationModule
          .getClassicalGrammaticalAtlasPopulationFrameIfReady();
        const populationFrame = await populationModule
          .loadClassicalGrammaticalAtlasPopulationFrame({
            populationVersion,
          });
        const memoizedPopulationFrame = await populationModule
          .loadClassicalGrammaticalAtlasPopulationFrame({
            populationVersion,
          });
        const firstAtom = populationFrame.atomCoordinates.find(
          atom => atom.operationCoordinateProjections.length,
        );

        const makeContainer = (kind, specificity = "specific") => ({
          kind,
          dataset: kind === "linear"
            ? { classicalLinearFormulaSpecificity: specificity }
            : kind === "diagram"
              ? { classicalDiagrammaticFormulaSpecificity: specificity }
              : {},
          ownerDocument: null,
          closest(selector) {
            if (
              kind === "sentence-formula"
              && selector.includes("sentence-formula-section")
            ) return this;
            if (
              kind === "diagram"
              && selector.includes("classical-rule-surface__diagram")
            ) return this;
            if (
              kind === "linear"
              && selector.includes("classical-rule-surface__linear")
            ) return this;
            return null;
          },
          matches(selector) {
            return kind === "sentence-surface"
              && selector.includes("sentence-surface");
          },
        });
        const linear = makeContainer("linear", "specific");
        const diagram = makeContainer("diagram", "specific");
        const sentenceFormula = makeContainer("sentence-formula", "specific");
        const sentenceSurface = makeContainer("sentence-surface", "specific");
        const diagramRow = { ownerDocument: null };
        const makeMark = (kind, coordinate, atoms) => ({
          dataset: {
            classicalFormulaCoordinate: coordinate,
            classicalFormulaCoordinateKind: "carrier-glyph",
            classicalFormulaCoordinateRoles: "stem|boundary",
            classicalDerivedAnnotationLessons: "§2|§7",
            classicalDerivedAnnotationAtoms: atoms,
          },
          ownerDocument: null,
          matches() { return false; },
          closest(selector) {
            if (selector.includes("diagram-row")) {
              return kind === "diagram" ? diagramRow : null;
            }
            if (selector.includes("sentence-formula-section")) {
              return kind === "sentence-formula" ? sentenceFormula : null;
            }
            if (selector === ".classical-rule-surface__diagram") {
              return kind === "diagram" ? diagram : null;
            }
            if (selector === ".classical-rule-surface__linear") {
              return kind === "linear" ? linear : null;
            }
            if (selector.includes("data-classical-linear-formula-specificity")) {
              return kind === "linear" ? linear
                : kind === "diagram" ? diagram : null;
            }
            if (
              selector.includes("classical-rule-surface__linear")
              && selector.includes("classical-rule-surface__diagram")
            ) {
              return kind === "linear" ? linear
                : kind === "diagram" ? diagram
                  : kind === "sentence-formula" ? sentenceFormula
                    : null;
            }
            return null;
          },
        });
        const marks = [
          makeMark("linear", "formula-coordinate-0-1", firstAtom.atomId),
          makeMark("diagram", "formula-coordinate-0-1", firstAtom.atomId),
          makeMark("sentence-formula", "formula-coordinate-1-2", ""),
        ];
        const viewContainers = [
          linear,
          diagram,
          sentenceFormula,
          sentenceSurface,
        ];
        const elementById = new Map();
        const workbench = {};
        const resultPanel = {};
        elementById.set("classical-workbench", workbench);
        elementById.set("classical-result-panel", resultPanel);
        const documentObject = {
          defaultView: null,
          head: {
            appendChild(element) {
              if (element.id) elementById.set(element.id, element);
            },
          },
          body: null,
          getElementById(id) { return elementById.get(id) || null; },
          createElement() {
            return { dataset: {}, textContent: "", id: "", type: "" };
          },
          querySelectorAll(selector) {
            if (selector.includes("[data-classical-formula-coordinate]")) {
              return marks;
            }
            if (selector.includes("classical-rule-surface__diagram-row")) {
              return [diagramRow];
            }
            if (
              selector.includes("classical-rule-surface__linear")
              || selector.includes("classical-rule-surface__sentence-surface")
            ) return viewContainers;
            return [];
          },
        };
        [...marks, ...viewContainers, diagramRow].forEach(element => {
          element.ownerDocument = documentObject;
        });

        const applicationApi =
          applicationModule.createClassicalGrammarApplicationApi(globalThis);
        const inventory = applicationApi
          .getClassicalGrammarApplicationInventory();
        const innerCanonical = Object.freeze({ kind: "fake-inner-result" });
        const outerCanonical = Object.freeze({ kind: "fake-outer-result" });
        const replacementOuterCanonical = Object.freeze({
          kind: "fake-replacement-outer-result",
        });
        const thirdCanonical = Object.freeze({ kind: "fake-third-result" });
        const innerResult = Object.freeze({
          operationId: "vnc:application",
          outputKind: "scalar",
          authorizationStatus: "authorized",
          canonicalResult: innerCanonical,
        });
        const outerResult = Object.freeze({
          operationId: "nnc:deverbal-construction",
          outputKind: "scalar",
          authorizationStatus: "authorized",
          canonicalResult: outerCanonical,
        });
        const replacementOuterResult = Object.freeze({
          operationId: "nnc:deverbal-construction",
          outputKind: "scalar",
          authorizationStatus: "authorized",
          canonicalResult: replacementOuterCanonical,
        });
        const thirdResult = Object.freeze({
          operationId: "vnc:application",
          outputKind: "scalar",
          authorizationStatus: "authorized",
          canonicalResult: thirdCanonical,
        });
        const innerGraph = Object.freeze({
          authorizationStatus: "observed",
          nodes: Object.freeze([Object.freeze({
            nodeId: "inner",
            applicationResult: innerResult,
          })]),
          edges: Object.freeze([]),
        });
        const outerGraph = Object.freeze({
          authorizationStatus: "observed",
          nodes: Object.freeze([
            Object.freeze({ nodeId: "inner", applicationResult: innerResult }),
            Object.freeze({ nodeId: "outer", applicationResult: outerResult }),
          ]),
          edges: Object.freeze([Object.freeze({
            fromNodeId: "inner",
            toNodeId: "outer",
            innerApplicationResult: innerResult,
            outerApplicationResult: outerResult,
            sharedUnitKinds: Object.freeze(["vnc-result"]),
            exactInnerResultIdentityObservedInOuterArguments: true,
          })]),
        });
        const thirdGraph = Object.freeze({
          authorizationStatus: "observed",
          nodes: Object.freeze([Object.freeze({
            nodeId: "third",
            applicationResult: thirdResult,
          })]),
          edges: Object.freeze([]),
        });
        const replacementOuterGraph = Object.freeze({
          authorizationStatus: "observed",
          nodes: Object.freeze([
            Object.freeze({ nodeId: "inner", applicationResult: innerResult }),
            Object.freeze({
              nodeId: "replacement-outer",
              applicationResult: replacementOuterResult,
            }),
          ]),
          edges: Object.freeze([Object.freeze({
            fromNodeId: "inner",
            toNodeId: "replacement-outer",
            innerApplicationResult: innerResult,
            outerApplicationResult: replacementOuterResult,
            sharedUnitKinds: Object.freeze(["vnc-result"]),
            exactInnerResultIdentityObservedInOuterArguments: true,
          })]),
        });
        const observationFor = (result, graph) => Object.freeze({
          kind: "classical-grammar-application-atlas-observation",
          version: 1,
          authorizationStatus: "observed",
          operationId: result.operationId,
          outputKind: result.outputKind,
          applicationResult: result,
          canonicalResult: result.canonicalResult,
          layerGraph: graph,
          rhymeFullPinFrame: null,
          rhymeCalibrationFrame: null,
          evaluationOrderFrame: null,
          exactOwnerIssuedResultObserved: true,
          grammarAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        });
        const innerObservation = observationFor(innerResult, innerGraph);
        const outerObservation = observationFor(outerResult, outerGraph);
        const replacementOuterObservation = observationFor(
          replacementOuterResult,
          replacementOuterGraph,
        );
        const thirdObservation = observationFor(thirdResult, thirdGraph);
        const issuedObservations = new WeakSet([
          innerObservation,
          outerObservation,
          replacementOuterObservation,
          thirdObservation,
        ]);
        const observationByResult = new WeakMap([
          [innerResult, innerObservation],
          [outerResult, outerObservation],
          [replacementOuterResult, replacementOuterObservation],
          [thirdResult, thirdObservation],
        ]);
        const nestedLedger = Object.freeze({
          revision: 4,
          route: Object.freeze({
            sourceUnit: "vnc",
            selectedOperation: "deverbal-nnc",
            result: Object.freeze({
              status: "authorized",
              resultUnit: "nnc",
            }),
          }),
          pathways: Object.freeze({
            anthillMap: Object.freeze({
              kind: "classical-interface-anthill-map",
            }),
          }),
          compositionPath: Object.freeze({
            deliveredSummary: Object.freeze({
              layerOperationIds: Object.freeze([
                "vnc:application",
                "nnc:deverbal-construction",
                "not-a-canonical-operation",
              ]),
              nextOperations: Object.freeze([
                Object.freeze({ operationId: "vnc:derivational-operation" }),
              ]),
            }),
          }),
        });
        const eventListeners = new Map();
        let subscribedObserver = null;
        let resultMutationObserver = null;
        class FakeMutationObserver {
          constructor(callback) {
            this.callback = callback;
            this.disconnected = false;
            resultMutationObserver = this;
          }
          observe(target, options) {
            this.target = target;
            this.options = options;
          }
          disconnect() {
            this.disconnected = true;
          }
        }
        const globalObject = {
          document: documentObject,
          queueMicrotask,
          MutationObserver: FakeMutationObserver,
          CustomEvent: class {
            constructor(type, init = {}) {
              this.type = type;
              this.detail = init.detail;
            }
          },
          addEventListener(type, listener) {
            if (!eventListeners.has(type)) eventListeners.set(type, []);
            eventListeners.get(type).push(listener);
          },
          removeEventListener(type, listener) {
            eventListeners.set(type, (eventListeners.get(type) || [])
              .filter(candidate => candidate !== listener));
          },
          dispatchEvent(event) {
            (eventListeners.get(event.type) || []).forEach(listener => {
              listener(event);
            });
            return true;
          },
          getClassicalGrammarApplicationInventory: () => inventory,
          buildClassicalGrammarApplicationRhymeOwnerCalibration:
            applicationApi.buildClassicalGrammarApplicationRhymeOwnerCalibration,
          isClassicalGrammarApplicationAtlasObservation: observation => (
            issuedObservations.has(observation)
          ),
          getClassicalGrammarApplicationAtlasObservation: result => (
            observationByResult.get(result) || null
          ),
          subscribeClassicalGrammarApplicationAtlasObservations(observer) {
            subscribedObserver = observer;
            observer(outerObservation);
            return () => { subscribedObserver = null; return true; };
          },
          getClassicalNestedControlLedger: () => nestedLedger,
        };
        documentObject.defaultView = globalObject;

        const controller = liveModule.installClassicalGrammaticalAtlas({
          globalObject,
          documentObject,
          populationFrame,
          maximumRecoverableApplications: 2,
        });
        const immediate = controller.current;
        await Promise.resolve();
        await Promise.resolve();
        const initial = controller.current;
        const initialProjection = globalObject.getClassicalGrammaticalAtlas();
        const firstView = initial.resultViewCoordinates.find(
          coordinate => coordinate.localCoordinateId,
        );
        const recoveredInner =
          globalObject.recoverClassicalGrammaticalAtlasApplication(
            "application-1",
          );
        const recoveredView =
          globalObject.recoverClassicalGrammaticalAtlasResultView(
            firstView.viewCoordinateId,
          );
        const atomOperationCoordinates =
          globalObject.getClassicalGrammaticalAtlasAtomOperationCoordinates(
            firstAtom.atomId,
          );
        let reentrantUpdateEvents = 0;
        let materializeInsideUpdateEvent = false;
        let reentrantMaterializedFrame = null;
        globalObject.addEventListener(
          "classical:grammatical-atlas-updated",
          () => {
            reentrantUpdateEvents += 1;
            globalObject.refreshClassicalGrammaticalAtlas();
            if (materializeInsideUpdateEvent) {
              materializeInsideUpdateEvent = false;
              reentrantMaterializedFrame =
                globalObject.getClassicalGrammaticalAtlasFrame();
            }
          },
        );
        const atomRoundTrip =
          globalObject.roundTripClassicalGrammaticalAtlasLocalCoordinate(
            firstAtom.localCoordinateId,
          );
        const materializedFrame =
          globalObject.getClassicalGrammaticalAtlasFrame();
        const materializedState = controller.current;
        const initialFacts = {
          stateKind: initial.kind,
          populationWasLazyAndMemoized:
            populationBeforeLoad === null
            && memoizedPopulationFrame === populationFrame,
          populationCountsMatchGeneratedSource:
            initial.populationFrame.populatedAtomCount
              === populationFrame.population.atoms.length
            && initial.baseAtlasFrame.lessonLocalCoordinateCount
              === populationFrame.population.atoms.length
                + populationFrame.defaultLessonLocalCoordinateCount,
          operationAndApplicationNodes:
            initial.baseAtlasFrame.typedNodes.filter(
              node => node.nodeType === "operation",
            ).length === inventory.operationIds.length
            && initial.applicationNodes.filter(
              node => node.nodeType === "application",
            ).length === 2
            && initial.applicationCoordinateMappings.every(mapping => (
              mapping.globalCoordinate
              && mapping.exactApplicationIdentityPreserved === true
            )),
          automaticUpdatesUseLightweightOverlay:
            initial.atlasFrame === null
            && initial.atlasFrameMaterializationStatus === "lazy-pending"
            && initial.automaticUpdatesUseLightweightOverlay === true
            && initial.fullFrameMaterializesOnlyOnExplicitRequest === true,
          replayDidNotDuplicateRevision:
            immediate.revision === initial.revision,
          explicitFullFrameMaterialized:
            materializedFrame.typedNodes.filter(
              node => node.nodeType === "application",
            ).length === 2
            && materializedState.atlasFrame === materializedFrame
            && materializedState.atlasFrameMaterializationStatus
              === "current",
          reentrantRefreshDidNotRepublish:
            reentrantUpdateEvents === 1
            && materializedState.revision === initial.revision + 1,
          applicationIds: initial.applicationNodeIds,
          exactContinuationEdge:
            initial.continuationEdges.length === 1
            && initial.continuationEdges[0]
              .exactInnerResultIdentityObservedInOuterArguments,
          recoveredInnerExact:
            recoveredInner.applicationResult === innerResult
            && recoveredInner.canonicalResult === innerCanonical,
          atomRoundTrip: atomRoundTrip.roundTripStatus,
          viewKinds: [...new Set(initial.resultViewCoordinates.map(
            coordinate => coordinate.viewKind,
          ))].sort(),
          viewAtomMapped: initial.resultViewCoordinates.some(
            coordinate => (
              coordinate.knownAtomIds.includes(firstAtom.atomId)
              && coordinate.atomLocalCoordinateIds.includes(
                firstAtom.localCoordinateId,
              )
              && firstAtom.operationGlobalCoordinateIds.every(
                globalCoordinateId => (
                  coordinate.atomOperationGlobalCoordinateIds.includes(
                    globalCoordinateId,
                  )
                ),
              )
            ),
          ),
          atomOperationCoordinatesExact:
            atomOperationCoordinates
              === populationFrame.indexes
                .operationCoordinateProjectionsByAtomId[firstAtom.atomId]
            && atomOperationCoordinates.every(projection => (
              populationModule
                .isClassicalGrammaticalAtlasPopulationExactOperationProjection(
                  projection,
                )
            )),
          structuralProjectionCloneRejected:
            populationModule
              .isClassicalGrammaticalAtlasPopulationExactOperationProjection(
                Object.freeze({ ...atomOperationCoordinates[0] }),
              ) === false,
          recoveredViewExact: recoveredView.element === marks[0],
          anthillMatches:
            initial.anthillJoin.matchedLayerOperationIds,
          nextMatches: initial.anthillJoin.matchedNextOperationIds,
          ownerEvidenceCount:
            initial.ownerCalibrationFrame.lessonOwnerEvidenceFrames.length,
          jsonSafeProjection:
            JSON.stringify(initialProjection).includes("fake-inner-result")
              === false
            && JSON.stringify(initialProjection).includes("secret-formula")
              === false,
          authority:
            initial.grammarAuthority === false
            && initialProjection.authority.grammarAuthority === false,
        };

        const revisionBeforeDomChange = controller.current.revision;
        linear.dataset.classicalLinearFormulaSpecificity = "general";
        marks[0].dataset.classicalFormulaCoordinateRoles =
          "stem|general-structure";
        resultMutationObserver.callback([]);
        await Promise.resolve();
        await Promise.resolve();
        const afterDomChange = controller.current;
        const changedLinearCoordinate = afterDomChange.resultViewCoordinates
          .find(coordinate => coordinate.viewKind === "linear-formula");
        const domRefreshFacts = {
          observesOnlyResultPanel:
            resultMutationObserver.target === resultPanel
            && resultMutationObserver.options.subtree === true,
          specificityUpdated:
            changedLinearCoordinate.specificity === "general",
          coordinateRolesUpdated:
            changedLinearCoordinate.coordinateRoles.includes(
              "general-structure",
            ),
          coalescedRevision:
            afterDomChange.revision === revisionBeforeDomChange + 1,
        };

        subscribedObserver(replacementOuterObservation);
        const synchronousReplacementFrame =
          globalObject.getClassicalGrammaticalAtlasFrame();
        const synchronousReplacementState = controller.current;
        await Promise.resolve();
        await Promise.resolve();
        const replacement = controller.current;
        const replacementFacts = {
          applicationIds: replacement.applicationNodeIds,
          newestEdgePreserved:
            replacement.continuationEdges.length === 1
            && replacement.continuationEdges[0]
              .fromApplicationNodeId === "application-1"
            && replacement.continuationEdges[0]
              .toApplicationNodeId === "application-3",
          reusedInnerStillRecoverable:
            globalObject.recoverClassicalGrammaticalAtlasApplication(
              "application-1",
            ).applicationResult === innerResult,
          supersededOuterEvicted:
            globalObject.recoverClassicalGrammaticalAtlasApplication(
              "application-2",
            ) === null,
          synchronousMaterializationUsesCurrentCalibration:
            synchronousReplacementFrame.sourceInputs.ownerCalibrationFrame
              === synchronousReplacementState.ownerCalibrationFrame
            && synchronousReplacementState.atlasFrame
              === synchronousReplacementFrame
            && synchronousReplacementState.atlasFrameMaterializationStatus
              === "current",
        };

        materializeInsideUpdateEvent = true;
        subscribedObserver(thirdObservation);
        await Promise.resolve();
        await Promise.resolve();
        const bounded = controller.current;
        const disconnects = controller.disconnect();
        const boundedFacts = {
          applicationIds: bounded.applicationNodeIds,
          oldestEvicted:
            globalObject.recoverClassicalGrammaticalAtlasApplication(
              "application-1",
            ) === null,
          currentRecoverable:
            globalObject.recoverClassicalGrammaticalAtlasApplication(
              "application-4",
            ).applicationResult === thirdResult,
          staleContinuationRemoved: bounded.continuationEdges.length === 0,
          typedApplicationNodeCount:
            bounded.applicationNodes.filter(
              node => node.nodeType === "application",
            ).length,
          reentrantMaterializationReconciled:
            reentrantMaterializedFrame
            && bounded.atlasFrame === reentrantMaterializedFrame
            && bounded.atlasFrameMaterializationStatus === "current"
            && bounded.atlasFrame.sourceInputs.ownerCalibrationFrame
              === bounded.ownerCalibrationFrame,
          disconnects,
          resultMutationObserverDisconnected:
            resultMutationObserver.disconnected,
        };
        process.stdout.write(JSON.stringify({
          initialFacts,
          domRefreshFacts,
          replacementFacts,
          boundedFacts,
        }));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { cwd: ROOT, encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
    );

    if (result.status !== 0) {
        throw new Error(result.stderr || "live Atlas probe failed");
    }
    return JSON.parse(result.stdout);
}

function readDeferredLoaderProbe() {
    const bootstrapUrl = pathToFileURL(path.join(
        ROOT,
        "src/bootstrap/bootstrap.mjs"
    )).href;
    const script = `
      const bootstrap = await import(${JSON.stringify(bootstrapUrl)});

      function harness(outcomes, { failDuringInstall = false } = {}) {
        const elements = new Map();
        const animationFrames = [];
        const idleCallbacks = [];
        const events = [];
        const documentObject = {
          documentElement: { dataset: {} },
          head: {
            appendChild(element) {
              if (element.id) elements.set(element.id, element);
            },
          },
          body: null,
          getElementById(id) { return elements.get(id) || null; },
          createElement() {
            return { id: "", type: "", dataset: {}, textContent: "" };
          },
        };
        const globalObject = {
          document: documentObject,
          requestAnimationFrame(callback) {
            animationFrames.push(callback);
          },
          requestIdleCallback(callback) {
            idleCallbacks.push(callback);
          },
          setTimeout,
          CustomEvent: class {
            constructor(type, init = {}) {
              this.type = type;
              this.detail = init.detail;
            }
          },
          dispatchEvent(event) {
            events.push(event);
            return true;
          },
        };
        const attempts = [];
        const installerAttempts = [];
        const deferred = bootstrap.installDeferredClassicalGrammaticalAtlas({
          globalObject,
          documentObject,
          async loadAtlasModule(attempt) {
            attempts.push(attempt);
            if (failDuringInstall) {
              return {
                async loadAndInstallClassicalGrammaticalAtlas() {
                  installerAttempts.push(installerAttempts.length + 1);
                  const outcome = outcomes.shift();
                  if (outcome instanceof Error) throw outcome;
                  return outcome;
                },
              };
            }
            const outcome = outcomes.shift();
            if (outcome instanceof Error) throw outcome;
            return {
              async loadAndInstallClassicalGrammaticalAtlas() {
                return outcome;
              },
            };
          },
        });
        return {
          deferred,
          globalObject,
          documentObject,
          animationFrames,
          idleCallbacks,
          attempts,
          installerAttempts,
          events,
        };
      }

      const successfulController = Object.freeze({ kind: "ready-controller" });
      const successful = harness([successfulController]);
      const beforePaint = {
        status: successful.globalObject
          .__CLASSICAL_GRAMMATICAL_ATLAS_LOAD_STATE__.status,
        phase: successful.globalObject
          .__CLASSICAL_GRAMMATICAL_ATLAS_LOAD_STATE__.phase,
        attempts: successful.attempts.length,
        oneAnimationFrameScheduled:
          successful.animationFrames.length === 1,
      };
      successful.animationFrames.shift()();
      const afterPaintBeforeIdle = {
        attempts: successful.attempts.length,
        oneIdleCallbackScheduled: successful.idleCallbacks.length === 1,
      };
      successful.idleCallbacks.shift()();
      const resolvedController = await successful.deferred.ready;
      const readyState = successful.globalObject
        .getClassicalGrammaticalAtlasLoadState();
      const readyProjection = JSON.parse(successful.documentObject
        .getElementById("classical-grammatical-atlas-load-state")
        .textContent);

      const recoveredController = Object.freeze({ kind: "retry-controller" });
      const retrying = harness([
        new Error("temporary population failure"),
        recoveredController,
      ]);
      retrying.animationFrames.shift()();
      retrying.idleCallbacks.shift()();
      let firstRejected = false;
      try {
        await retrying.deferred.ready;
      } catch {
        firstRejected = true;
      }
      const failedState = retrying.globalObject
        .getClassicalGrammaticalAtlasLoadState();
      const retryResult = await retrying.globalObject
        .retryClassicalGrammaticalAtlasLoad();
      const retriedState = retrying.globalObject
        .getClassicalGrammaticalAtlasLoadState();

      const installRecoveredController = Object.freeze({
        kind: "install-retry-controller",
      });
      const installRetrying = harness([
        new Error("temporary adapter or population failure"),
        installRecoveredController,
      ], { failDuringInstall: true });
      installRetrying.animationFrames.shift()();
      installRetrying.idleCallbacks.shift()();
      try {
        await installRetrying.deferred.ready;
      } catch {
        // The diagnostic module loaded; only its lazy dependency failed.
      }
      const installRetryResult = await installRetrying.deferred.retry();

      process.stdout.write(JSON.stringify({
        beforePaint,
        afterPaintBeforeIdle,
        ready: {
          attempts: successful.attempts,
          resolvedExact: resolvedController === successfulController,
          status: readyState.status,
          phase: readyState.phase,
          domStatus: successful.documentObject.documentElement.dataset
            .classicalGrammaticalAtlasStatus,
          projectedStatus: readyProjection.status,
          authority: readyState.grammarAuthority,
        },
        retry: {
          firstRejected,
          failedStatus: failedState.status,
          retryAvailable: failedState.retryAvailable,
          errorMessage: failedState.errorMessage,
          attempts: retrying.attempts,
          recoveredExact: retryResult === recoveredController,
          retriedStatus: retriedState.status,
          readyPromiseReplaced:
            retrying.globalObject.__CLASSICAL_GRAMMATICAL_ATLAS_READY__
              instanceof Promise,
        },
        dependencyRetry: {
          moduleLoadAttempts: installRetrying.attempts,
          installerAttempts: installRetrying.installerAttempts,
          recoveredExact:
            installRetryResult === installRecoveredController,
        },
      }));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { cwd: ROOT, encoding: "utf8", maxBuffer: 1024 * 1024 }
    );
    if (result.status !== 0) {
        throw new Error(result.stderr || "deferred Atlas loader probe failed");
    }
    return JSON.parse(result.stdout);
}

function run() {
    const s = createSuite("classical_grammatical_atlas_live");
    const probe = readLiveAtlasProbe();
    const deferred = readDeferredLoaderProbe();

    s.eq(
        "normal applications populate one exact live Atlas across atoms, routes, continuation, Anthill, and Result views",
        probe.initialFacts,
        {
            stateKind: "classical-grammatical-atlas-live-state",
            populationWasLazyAndMemoized: true,
            populationCountsMatchGeneratedSource: true,
            operationAndApplicationNodes: true,
            automaticUpdatesUseLightweightOverlay: true,
            replayDidNotDuplicateRevision: true,
            explicitFullFrameMaterialized: true,
            reentrantRefreshDidNotRepublish: true,
            applicationIds: ["application-1", "application-2"],
            exactContinuationEdge: true,
            recoveredInnerExact: true,
            atomRoundTrip: "lossless",
            viewKinds: [
                "diagram",
                "linear-formula",
                "sentence-formula",
                "sentence-surface",
            ],
            viewAtomMapped: true,
            atomOperationCoordinatesExact: true,
            structuralProjectionCloneRejected: true,
            recoveredViewExact: true,
            anthillMatches: [
                "vnc:application",
                "nnc:deverbal-construction",
            ],
            nextMatches: ["vnc:derivational-operation"],
            ownerEvidenceCount: 58,
            jsonSafeProjection: true,
            authority: true,
        }
    );

    s.eq(
        "Specific and General Result mutations coalesce into current live coordinates",
        probe.domRefreshFacts,
        {
            observesOnlyResultPanel: true,
            specificityUpdated: true,
            coordinateRolesUpdated: true,
            coalescedRevision: true,
        }
    );

    s.eq(
        "Atlas population waits for first paint and idle then exposes honest retryable delivery state",
        deferred,
        {
            beforePaint: {
                status: "loading",
                phase: "waiting-for-first-paint",
                attempts: 0,
                oneAnimationFrameScheduled: true,
            },
            afterPaintBeforeIdle: {
                attempts: 0,
                oneIdleCallbackScheduled: true,
            },
            ready: {
                attempts: [1],
                resolvedExact: true,
                status: "ready",
                phase: "observing",
                domStatus: "ready",
                projectedStatus: "ready",
                authority: false,
            },
            retry: {
                firstRejected: true,
                failedStatus: "failed",
                retryAvailable: true,
                errorMessage: "temporary population failure",
                attempts: [1, 2],
                recoveredExact: true,
                retriedStatus: "ready",
                readyPromiseReplaced: true,
            },
            dependencyRetry: {
                moduleLoadAttempts: [1],
                installerAttempts: [1, 2],
                recoveredExact: true,
            },
        }
    );

    s.eq(
        "bounded retention preserves reused endpoints in the newest exact continuation graph",
        probe.replacementFacts,
        {
            applicationIds: ["application-1", "application-3"],
            newestEdgePreserved: true,
            reusedInnerStillRecoverable: true,
            supersededOuterEvicted: true,
            synchronousMaterializationUsesCurrentCalibration: true,
        }
    );

    s.eq(
        "the live identity store stays bounded and removes continuation edges whose exact endpoint was evicted",
        probe.boundedFacts,
        {
            applicationIds: ["application-3", "application-4"],
            oldestEvicted: true,
            currentRecoverable: true,
            staleContinuationRemoved: true,
            typedApplicationNodeCount: 2,
            reentrantMaterializationReconciled: true,
            disconnects: true,
            resultMutationObserverDisconnected: true,
        }
    );

    const bootstrap = fs.readFileSync(path.join(
        ROOT,
        "src/bootstrap/bootstrap.mjs"
    ), "utf8");
    const ledgerInstall = bootstrap.indexOf(
        "installClassicalNestedControlLedger({ globalObject, documentObject });"
    );
    const atlasModuleUrl = bootstrap.indexOf(
        "../ui/diagnostics/classical_grammatical_atlas.mjs"
    );
    const deferredInstall = bootstrap.indexOf(
        "installDeferredClassicalGrammaticalAtlas({",
        ledgerInstall
    );
    s.eq(
        "the live Atlas installs after the self-updating Anthill ledger",
        {
            ledgerPresent: ledgerInstall >= 0,
            atlasModuleUrlPresent: atlasModuleUrl >= 0,
            deferredInstallAfterLedger: deferredInstall > ledgerInstall,
            firstPaintAndIdle:
                bootstrap.includes("requestAnimationFrame")
                && bootstrap.includes("requestIdleCallback"),
            startupDoesNotAwaitAtlasPopulation:
                bootstrap.includes(
                    "__CLASSICAL_GRAMMATICAL_ATLAS_READY__"
                )
                && bootstrap.includes(
                    "installDeferredClassicalGrammaticalAtlas({"
                ),
        },
        {
            ledgerPresent: true,
            atlasModuleUrlPresent: true,
            deferredInstallAfterLedger: true,
            firstPaintAndIdle: true,
            startupDoesNotAwaitAtlasPopulation: true,
        }
    );

    return s;
}

module.exports = { run };
