"use strict";

const path = require("path");
const { spawnSync } = require("child_process");
const { pathToFileURL } = require("url");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function readAtlasProbe() {
    const atlasUrl = pathToFileURL(path.join(
        ROOT,
        "src/core/grammar/grammatical_atlas.mjs"
    )).href;
    const rhymeUrl = pathToFileURL(path.join(
        ROOT,
        "src/core/grammar/grammatical_rhyme_space.mjs"
    )).href;
    const lessonMapUrl = pathToFileURL(path.join(
        ROOT,
        "src/core/grammar/classical_lessons_1_58_rhyme_map.mjs"
    )).href;
    const script = `
        const atlasModule = await import(${JSON.stringify(atlasUrl)});
        const rhymeModule = await import(${JSON.stringify(rhymeUrl)});
        const lessonMap = await import(${JSON.stringify(lessonMapUrl)});
        const {
          buildClassicalGrammaticalAtlasAtomOperationProjectionFrame,
          buildClassicalGrammaticalAtlasFrame,
          buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame,
          buildClassicalGrammaticalAtlasTypedNodeFrame,
          projectClassicalGrammaticalAtlasLocalCoordinate,
          recoverClassicalGrammaticalAtlasGlobalCoordinate,
          roundTripClassicalGrammaticalAtlasLocalCoordinate,
          updateClassicalGrammaticalAtlasFrame,
        } = atlasModule;
        const {
          buildClassicalGrammaticalRhymeLessonPlaneFrame,
          buildClassicalGrammaticalRhymeRoutePlaneFrame,
        } = rhymeModule;

        const fullAtlas = buildClassicalGrammaticalAtlasFrame({
          lessonPlaneFrames:
            lessonMap.CLASSICAL_LESSONS_1_58_RHYME_PLANES,
        });
        const fullMap = {
          lessonPlaneCount: fullAtlas.lessonPlaneCount,
          lessonLocalCoordinateCount:
            fullAtlas.lessonLocalCoordinateCount,
          everyLessonRoundTrips: fullAtlas.lessonLocalCoordinates.every(
            frame => roundTripClassicalGrammaticalAtlasLocalCoordinate(
              fullAtlas,
              frame.localCoordinateId,
            ).roundTripStatus === "lossless",
          ),
          repeatedCoordinatesRetainEveryLocal:
            fullAtlas.globalCoordinates.some(coordinate => (
              coordinate.lessonLocalCoordinateIds.length > 1
            )),
          allGlobalMembersAccountedFor:
            fullAtlas.globalCoordinates.reduce(
              (count, coordinate) => (
                count + coordinate.lessonLocalCoordinateIds.length
              ),
              0,
            ) === 58,
          immutable: Object.isFrozen(fullAtlas)
            && Object.isFrozen(fullAtlas.globalCoordinates)
            && fullAtlas.globalCoordinates.every(Object.isFrozen)
            && Object.isFrozen(fullAtlas.localMappingById)
            && Object.isFrozen(fullAtlas.globalCoordinateIndex),
          groupingUsesOnlySixFields:
            fullAtlas.globalGroupingUsesOnlyNormalizedSixFields,
          grammarAuthority: fullAtlas.grammarAuthority,
        };

        const innerPlane = buildClassicalGrammaticalRhymeLessonPlaneFrame({
          lessonNumber: 101,
          emptiness: "Typed VNC Source",
          fullness: "Complete VNC Result",
          rotation: "F→C",
          rhymeAxes: ["derivation", "continuation"],
        });
        const reorderedSignature = Object.freeze({
          ...innerPlane.compatibilitySignature,
          requiresPresent: Object.freeze([
            ...innerPlane.compatibilitySignature.requiresPresent,
          ].reverse()),
          requiresAbsent: Object.freeze([
            ...innerPlane.compatibilitySignature.requiresAbsent,
          ].reverse()),
          adds: Object.freeze([
            ...innerPlane.compatibilitySignature.adds,
          ].reverse()),
          preserves: Object.freeze([
            ...innerPlane.compatibilitySignature.preserves,
          ].reverse()),
        });
        const equivalentPlane = Object.freeze({
          ...innerPlane,
          lessonNumber: 201,
          emptyPin: Object.freeze({
            ...innerPlane.emptyPin,
            description: "A separate lesson-local source identity",
          }),
          fullPin: Object.freeze({
            ...innerPlane.fullPin,
            description: "A separate lesson-local result identity",
          }),
          compatibilitySignature: reorderedSignature,
        });
        const identityA = Object.freeze({ id: "identity-a" });
        const identityB = Object.freeze({ id: "identity-b" });
        const evidenceA = Object.freeze({ evidenceId: "evidence-a" });
        const evidenceB = Object.freeze({ evidenceId: "evidence-b" });
        const localA =
          buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
            lessonPlaneFrame: innerPlane,
            localCoordinateId: "L101/atom:a",
            atomId: "a",
            localIdentity: identityA,
            evidenceFrames: [evidenceA],
          });
        const localB =
          buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
            lessonPlaneFrame: equivalentPlane,
            localCoordinateId: "L201/atom:b",
            atomId: "b",
            localIdentity: identityB,
            evidenceFrames: [evidenceB],
          });
        const groupedAtlas = buildClassicalGrammaticalAtlasFrame({
          lessonPlaneFrames: [equivalentPlane, innerPlane],
          lessonLocalCoordinateFrames: [localB, localA],
        });
        const projectionA =
          projectClassicalGrammaticalAtlasLocalCoordinate(
            groupedAtlas,
            localA.localCoordinateId,
          );
        const recoveredGroup =
          recoverClassicalGrammaticalAtlasGlobalCoordinate(
            groupedAtlas,
            projectionA.globalCoordinateId,
          );
        const localIdentity = {
          oneGlobalCoordinate: groupedAtlas.globalCoordinateCount,
          bothLocalCoordinatesRecovered:
            recoveredGroup.lessonLocalCoordinates.length,
          exactLocalFrames:
            recoveredGroup.lessonLocalCoordinates.includes(localA)
            && recoveredGroup.lessonLocalCoordinates.includes(localB),
          exactLocalIdentities:
            recoveredGroup.lessonLocalCoordinates.some(frame => (
              frame.localIdentity === identityA
            ))
            && recoveredGroup.lessonLocalCoordinates.some(frame => (
              frame.localIdentity === identityB
            )),
          exactEvidenceIdentities:
            recoveredGroup.lessonLocalCoordinates.some(frame => (
              frame.evidenceFrames[0] === evidenceA
            ))
            && recoveredGroup.lessonLocalCoordinates.some(frame => (
              frame.evidenceFrames[0] === evidenceB
            )),
          atomAndLessonIdentityExcludedFromGrouping:
            localA.atomIdentityParticipatesInGlobalGrouping === false
            && localA.lessonNumberParticipatesInGlobalGrouping === false,
          roundTripA:
            roundTripClassicalGrammaticalAtlasLocalCoordinate(
              groupedAtlas,
              localA.localCoordinateId,
            ).roundTripStatus,
        };
        const duplicateA =
          buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
            lessonPlaneFrame: innerPlane,
            localCoordinateId: "duplicate-local-id",
          });
        const duplicateB =
          buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
            lessonPlaneFrame: equivalentPlane,
            localCoordinateId: "duplicate-local-id",
          });
        const duplicateAtlas = buildClassicalGrammaticalAtlasFrame({
          lessonPlaneFrames: [innerPlane, equivalentPlane],
          lessonLocalCoordinateFrames: [duplicateA, duplicateB],
        });
        const populationEvidence = Array.from(
          { length: 1000 },
          (_, index) => Object.freeze({ evidenceId: "atom-" + index }),
        );
        const populationLocals = populationEvidence.map(
          (evidence, index) => (
            buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
              lessonPlaneFrame: innerPlane,
              localCoordinateId: "L101/atom:" + index,
              atomId: String(index),
              localIdentity: evidence,
              evidenceFrames: [evidence],
            })
          ),
        );
        const populationAtlas = buildClassicalGrammaticalAtlasFrame({
          lessonPlaneFrames: [innerPlane],
          lessonLocalCoordinateFrames: populationLocals,
        });
        const finalPopulationLocal = populationLocals.at(-1);
        const finalPopulationMapping =
          projectClassicalGrammaticalAtlasLocalCoordinate(
            populationAtlas,
            finalPopulationLocal.localCoordinateId,
          );
        const population = {
          duplicateFramesRejected:
            duplicateAtlas.rejectedLessonLocalCoordinates.length,
          ambiguousDuplicateHasNoProjection:
            projectClassicalGrammaticalAtlasLocalCoordinate(
              duplicateAtlas,
              "duplicate-local-id",
            ) === null,
          duplicateLessonsStillReceiveDefaults:
            duplicateAtlas.lessonLocalCoordinateCount,
          populationSize: populationAtlas.lessonLocalCoordinateCount,
          oneSixFieldCoordinate: populationAtlas.globalCoordinateCount,
          backwardRecoversEveryAtom:
            recoverClassicalGrammaticalAtlasGlobalCoordinate(
              populationAtlas,
              finalPopulationMapping.globalCoordinateId,
            ).allLocalFrames.length,
          indexedForwardIdentity:
            populationAtlas.localMappingById[
              finalPopulationLocal.localCoordinateId
            ].localFrame === finalPopulationLocal,
          indexedBackwardIdentity:
            populationAtlas.globalCoordinateIndex[
              finalPopulationMapping.globalCoordinateId
            ].localFrameIndex[
              finalPopulationLocal.localCoordinateId
            ] === finalPopulationLocal,
          exactRoundTrip:
            roundTripClassicalGrammaticalAtlasLocalCoordinate(
              populationAtlas,
              finalPopulationLocal.localCoordinateId,
            ).roundTripStatus,
        };

        const outerPlane = buildClassicalGrammaticalRhymeLessonPlaneFrame({
          lessonNumber: 102,
          emptiness: "Exact VNC Result",
          fullness: "Complete NNC Result",
          rotation: "C→F→C",
          rhymeAxes: ["nominalization", "continuation"],
        });
        const outerEvidence = Object.freeze({ evidenceId: "outer" });
        const outerLocal =
          buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
            lessonPlaneFrame: outerPlane,
            localCoordinateId: "L102/atom:outer",
            atomId: "outer",
            evidenceFrames: [outerEvidence],
          });
        const innerRoute = buildClassicalGrammaticalRhymeRoutePlaneFrame({
          operationId: "vnc:derivational-operation",
          outputKinds: ["scalar"],
          resultKinds: ["vnc-result"],
          axisIds: ["derivation", "continuation"],
          axisRoles: {
            derivation: "derived-fact",
            continuation: "architecture-invariant",
          },
          continuationOutputUnitKinds: ["vnc-result"],
        });
        const outerRoute = buildClassicalGrammaticalRhymeRoutePlaneFrame({
          operationId: "nnc:deverbal-construction",
          outputKinds: ["scalar"],
          resultKinds: ["nnc-result"],
          axisIds: ["nominalization", "continuation"],
          axisRoles: {
            nominalization: "derived-fact",
            continuation: "architecture-invariant",
          },
          continuationInputUnitKinds: ["vnc-result"],
          continuationOutputUnitKinds: ["nnc-result"],
        });
        const declaredOperationLink = (atomId, operationId, evidenceId) => (
          Object.freeze({
            kind:
              "classical-grammatical-atlas-population-exact-operation-link",
            version: 2,
            atomId,
            operationId,
            evidenceKinds: Object.freeze(["direct-application-axis"]),
            evidenceId,
            exactOwnerEvidenceStatus: "exact",
            grammarAuthority: false,
          })
        );
        const innerEndpointEvidence = Object.freeze({
          evidenceId: "inner-owner-operation",
        });
        const innerDeclaredOperationLink = declaredOperationLink(
          "inner-owner",
          innerRoute.emptyPin.operationId,
          "inner-owner-operation",
        );
        const innerEndpointProjection =
          buildClassicalGrammaticalAtlasAtomOperationProjectionFrame({
            atomId: "inner-owner",
            atomLocalCoordinateId: "L101/atom:inner-owner",
            operationId: innerRoute.emptyPin.operationId,
            compatibilitySignature: innerRoute.compatibilitySignature,
            exactOperationLinkFrames: [innerDeclaredOperationLink],
            evidenceFrames: [innerEndpointEvidence],
          });
        const innerEndpointLocal =
          buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
            lessonPlaneFrame: innerPlane,
            localCoordinateId: "L101/atom:inner-owner",
            atomId: "inner-owner",
            evidenceFrames: [
              innerEndpointEvidence,
              innerEndpointProjection,
            ],
          });
        const outerEndpointEvidence = Object.freeze({
          evidenceId: "outer-owner-operation",
        });
        const outerDeclaredOperationLink = declaredOperationLink(
          "outer-owner",
          outerRoute.emptyPin.operationId,
          "outer-owner-operation",
        );
        const outerEndpointProjection =
          buildClassicalGrammaticalAtlasAtomOperationProjectionFrame({
            atomId: "outer-owner",
            atomLocalCoordinateId: "L102/atom:outer-owner",
            operationId: outerRoute.emptyPin.operationId,
            compatibilitySignature: outerRoute.compatibilitySignature,
            exactOperationLinkFrames: [outerDeclaredOperationLink],
            evidenceFrames: [outerEndpointEvidence],
          });
        const outerEndpointLocal =
          buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
            lessonPlaneFrame: outerPlane,
            localCoordinateId: "L102/atom:outer-owner",
            atomId: "outer-owner",
            evidenceFrames: [
              outerEndpointEvidence,
              outerEndpointProjection,
            ],
          });
        const innerCanonical = Object.freeze({ kind: "vnc-result" });
        const outerCanonical = Object.freeze({ kind: "nnc-result" });
        const unrelatedCanonical = Object.freeze({ kind: "vnc-result" });
        const innerResult = Object.freeze({
          operationId: "vnc:derivational-operation",
          authorizationStatus: "authorized",
          canonicalResult: innerCanonical,
        });
        const outerResult = Object.freeze({
          operationId: "nnc:deverbal-construction",
          authorizationStatus: "authorized",
          canonicalResult: outerCanonical,
        });
        const unrelatedResult = Object.freeze({
          operationId: "vnc:derivational-operation",
          authorizationStatus: "authorized",
          canonicalResult: unrelatedCanonical,
        });
        const makeApplicationObservation = applicationResult => (
          Object.freeze({
            kind: "classical-grammar-application-atlas-observation",
            version: 1,
            authorizationStatus: "observed",
            operationId: applicationResult.operationId,
            applicationResult,
            canonicalResult: applicationResult.canonicalResult,
            exactOwnerIssuedResultObserved: true,
            grammarAuthority: false,
          })
        );
        const innerApplicationObservation =
          makeApplicationObservation(innerResult);
        const outerApplicationObservation =
          makeApplicationObservation(outerResult);
        const unrelatedApplicationObservation =
          makeApplicationObservation(unrelatedResult);
        const innerApplicationNode =
          buildClassicalGrammaticalAtlasTypedNodeFrame({
            nodeType: "application",
            nodeId: "application:inner",
            routePlaneFrame: innerRoute,
            applicationObservationFrame: innerApplicationObservation,
          });
        const outerApplicationNode =
          buildClassicalGrammaticalAtlasTypedNodeFrame({
            nodeType: "application",
            nodeId: "application:outer",
            routePlaneFrame: outerRoute,
            applicationObservationFrame: outerApplicationObservation,
          });
        const unrelatedApplicationNode =
          buildClassicalGrammaticalAtlasTypedNodeFrame({
            nodeType: "application",
            nodeId: "application:unrelated",
            routePlaneFrame: innerRoute,
            applicationObservationFrame: unrelatedApplicationObservation,
          });
        const ownerProof = Object.freeze({
          kind:
            "classical-grammar-application-rhyme-owner-proof-observation",
          version: 1,
          authorizationStatus: "observed",
          innerOperationId: "vnc:derivational-operation",
          outerOperationId: "nnc:deverbal-construction",
          sharedUnitKinds: Object.freeze(["vnc-result"]),
          innerApplicationResult: innerResult,
          outerApplicationResult: outerResult,
          exactInnerResultIdentityObservedInOuterArguments: true,
          bothResultsOwnerValidated: true,
          topologyCompatibilityObserved: true,
          grammarAuthority: false,
        });
        const ownerPair = Object.freeze({
          innerOperationId: "vnc:derivational-operation",
          outerOperationId: "nnc:deverbal-construction",
          sharedUnitKinds: Object.freeze(["vnc-result"]),
          sharedFamilyUnitKinds: Object.freeze(["vnc-result"]),
        });
        const ownerEdge = Object.freeze({
          kind: "classical-grammatical-rhyme-calibrated-lesson-edge",
          innerLessonNumber: 101,
          outerLessonNumber: 102,
          sharedUnitKinds: Object.freeze(["vnc-result"]),
          sharedRhymeAxes: Object.freeze(["continuation"]),
          ownerRoutePairs: Object.freeze([ownerPair]),
          exactOwnerProofs: Object.freeze([ownerProof]),
          calibrationStatus: "owner-contract-exactly-observed",
          exactOwnerProofObserved: true,
          grammarAuthority: false,
        });
        const unobservedEdge = Object.freeze({
          ...ownerEdge,
          innerLessonNumber: 102,
          outerLessonNumber: 101,
          ownerRoutePairs: Object.freeze([]),
          exactOwnerProofs: Object.freeze([]),
          calibrationStatus: "owner-contract-aligned-proof-required",
          exactOwnerProofObserved: false,
        });
        const ownerCalibration = Object.freeze({
          kind: "classical-grammatical-rhyme-owner-calibration-frame",
          calibratedEdges: Object.freeze([ownerEdge, unobservedEdge]),
          callerSuppliedOwnerAuthorizationAccepted: false,
          grammarAuthority: false,
        });
        const atlas = buildClassicalGrammaticalAtlasFrame({
          lessonPlaneFrames: [innerPlane, outerPlane],
          lessonLocalCoordinateFrames: [
            localA,
            innerEndpointLocal,
            outerEndpointLocal,
          ],
          routePlaneFrames: [innerRoute, outerRoute],
          typedNodeFrames: [
            innerApplicationNode,
            outerApplicationNode,
            unrelatedApplicationNode,
          ],
          ownerCalibrationFrame: ownerCalibration,
        });
        const hyperedge = atlas.declaredOwnerHyperedges[0];
        const ownerGraph = {
          typedNodeCount: atlas.typedNodeCount,
          operationNodesInstalled: atlas.typedNodes.filter(
            node => node.nodeType === "operation",
          ).length,
          applicationNodesInstalled: atlas.typedNodes.filter(
            node => node.nodeType === "application",
          ).length,
          oneDeclaredHyperedge: atlas.declaredOwnerHyperedgeCount,
          unobservedEdgeExcluded: atlas.unrepresentedOwnerEdges.length,
          exactInnerApplicationLinked:
            hyperedge.innerTypedNodeIds.includes("application:inner"),
          exactOuterApplicationLinked:
            hyperedge.outerTypedNodeIds.includes("application:outer"),
          unrelatedApplicationNotLinked:
            !hyperedge.innerTypedNodeIds.includes(
              "application:unrelated",
            ),
          declaredProofObjectIdentityPreserved:
            hyperedge.declaredOwnerProofObservationShapes[0] === ownerProof,
          declaredApplicationObjectIdentityPreserved:
            hyperedge.innerTypedNodes.find(
              node => node.nodeId === "application:inner",
            ).localIdentity === innerResult,
          typedBoundaryPreserved:
            hyperedge.sharedUnitKinds.join(",") === "vnc-result",
          callerDeclaredInnerAtomEndpointLinked:
            hyperedge.innerLessonLocalCoordinateIds.join(",")
              === innerEndpointLocal.localCoordinateId,
          callerDeclaredOuterAtomEndpointLinked:
            hyperedge.outerLessonLocalCoordinateIds.join(",")
              === outerEndpointLocal.localCoordinateId,
          unrelatedLessonAtomNotLinked:
            !hyperedge.innerLessonLocalCoordinateIds.includes(
              localA.localCoordinateId,
            ),
          callerDeclaredProjectionUsedAsEndpoint:
            hyperedge.innerAtomOperationProjections[0]
              === innerEndpointProjection
            && hyperedge.outerAtomOperationProjections[0]
              === outerEndpointProjection,
          callerDeclaredOperationCoordinatesUsedAsEndpoints:
            hyperedge.innerGlobalCoordinateIds.join(",")
              === innerEndpointProjection.operationGlobalCoordinateId
            && hyperedge.outerGlobalCoordinateIds.join(",")
              === outerEndpointProjection.operationGlobalCoordinateId,
          lessonScopeKeptSeparateFromAtomEndpoints:
            hyperedge.innerLessonScopeLocalCoordinateCount === 2
            && hyperedge.outerLessonScopeLocalCoordinateCount === 1
            && hyperedge.innerLessonLocalCoordinateIds.length === 0
            && hyperedge.outerLessonLocalCoordinateIds.length === 0,
          genericCoreDoesNotClaimPopulationIdentity:
            hyperedge.atomOperationCoordinatesRemainPopulationAdapterOwned
              === true,
          serviceIssuedIdentityValidationRemainsExternal:
            hyperedge.serviceIssuedIdentitiesMustBeValidatedExternally
              === true
            && hyperedge.ownerValidationStatus
              === "declared-owner-proof-shape-external-validation-required",
          endpointStatus:
            hyperedge.atomEndpointStatus,
          nonAuthorizing: hyperedge.grammarAuthority === false
            && atlas.grammarAuthority === false
            && atlas.atlasMayAuthorizeGrammar === false
            && atlas.callerSuppliedOwnerAuthorizationAccepted === false,
        };

        const endpointFreeAtlas = buildClassicalGrammaticalAtlasFrame({
          lessonPlaneFrames: [innerPlane, outerPlane],
          lessonLocalCoordinateFrames: [localA, outerLocal],
          routePlaneFrames: [innerRoute, outerRoute],
          typedNodeFrames: [
            innerApplicationNode,
            outerApplicationNode,
            unrelatedApplicationNode,
          ],
          ownerCalibrationFrame: ownerCalibration,
        });
        const endpointFreeHyperedge =
          endpointFreeAtlas.declaredOwnerHyperedges[0];
        const endpointFree = {
          oneDeclaredHyperedge:
            endpointFreeAtlas.declaredOwnerHyperedgeCount,
          exactApplicationsStillLinked:
            endpointFreeHyperedge.innerTypedNodeIds.includes(
              "application:inner",
            )
            && endpointFreeHyperedge.outerTypedNodeIds.includes(
              "application:outer",
            ),
          noInnerAtomEndpointInvented:
            endpointFreeHyperedge.innerLessonLocalCoordinateIds.length,
          noOuterAtomEndpointInvented:
            endpointFreeHyperedge.outerLessonLocalCoordinateIds.length,
          noInnerProjectionInvented:
            endpointFreeHyperedge.innerAtomOperationProjections.length,
          noOuterProjectionInvented:
            endpointFreeHyperedge.outerAtomOperationProjections.length,
          noOperationCoordinateInvented:
            endpointFreeHyperedge.innerGlobalCoordinateIds.length
            + endpointFreeHyperedge.outerGlobalCoordinateIds.length,
          lessonScopeStillRecoverable:
            endpointFreeHyperedge.innerLessonScopeLocalCoordinateCount
              + ","
              + endpointFreeHyperedge.outerLessonScopeLocalCoordinateCount,
          endpointStatus:
            endpointFreeHyperedge.atomEndpointStatus,
          declaredProofObjectIdentityPreserved:
            endpointFreeHyperedge.declaredOwnerProofObservationShapes[0]
              === ownerProof,
          nonAuthorizing:
            endpointFreeHyperedge.grammarAuthority === false
            && endpointFreeAtlas.grammarAuthority === false,
        };

        const secondEvidence = Object.freeze({ evidenceId: "inner-2" });
        const secondDeclaredOperationLink = declaredOperationLink(
          "second",
          innerRoute.emptyPin.operationId,
          "inner-2",
        );
        const secondInnerEndpointProjection =
          buildClassicalGrammaticalAtlasAtomOperationProjectionFrame({
            atomId: "second",
            atomLocalCoordinateId: "L101/atom:second",
            operationId: innerRoute.emptyPin.operationId,
            compatibilitySignature: innerRoute.compatibilitySignature,
            exactOperationLinkFrames: [secondDeclaredOperationLink],
            evidenceFrames: [secondEvidence],
          });
        const secondInnerLocal =
          buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
            lessonPlaneFrame: innerPlane,
            localCoordinateId: "L101/atom:second",
            atomId: "second",
            evidenceFrames: [
              secondEvidence,
              secondInnerEndpointProjection,
            ],
          });
        const oldInnerProjection =
          projectClassicalGrammaticalAtlasLocalCoordinate(
            atlas,
            innerEndpointLocal.localCoordinateId,
          );
        const updatedAtlas = updateClassicalGrammaticalAtlasFrame(atlas, {
          lessonLocalCoordinateFrames: [
            secondInnerLocal,
            outerEndpointLocal,
            innerEndpointLocal,
            localA,
          ],
        });
        const updatedInnerProjection =
          projectClassicalGrammaticalAtlasLocalCoordinate(
            updatedAtlas,
            secondInnerLocal.localCoordinateId,
          );
        const selfUpdate = {
          newImmutableFrame: updatedAtlas !== atlas
            && Object.isFrozen(updatedAtlas),
          priorFrameUnchanged: atlas.lessonLocalCoordinateCount === 3
            && atlas.declaredOwnerHyperedges[0]
              .innerLessonLocalCoordinateIds.length === 0,
          updatedLocalCount: updatedAtlas.lessonLocalCoordinateCount,
          updatedHyperedgeClaimsNoCallerAtomEndpoints:
            updatedAtlas.declaredOwnerHyperedges[0]
              .innerLessonLocalCoordinateIds.length,
          stableGlobalCoordinate:
            oldInnerProjection.globalCoordinateId
              === updatedInnerProjection.globalCoordinateId,
          newAtomRoundTrips:
            roundTripClassicalGrammaticalAtlasLocalCoordinate(
              updatedAtlas,
              secondInnerLocal.localCoordinateId,
            ).roundTripStatus,
          exactNewEvidencePreserved:
            roundTripClassicalGrammaticalAtlasLocalCoordinate(
              updatedAtlas,
              secondInnerLocal.localCoordinateId,
            ).recoveredLocalFrame.evidenceFrames[0] === secondEvidence,
          callerDeclaredNewProjectionNotUsedAsEndpoint:
            !(
            updatedAtlas.declaredOwnerHyperedges[0]
              .innerAtomOperationProjections.includes(
                secondInnerEndpointProjection,
              )
            ),
          unrelatedLessonAtomStillExcluded:
            !updatedAtlas.declaredOwnerHyperedges[0]
              .innerLessonLocalCoordinateIds.includes(
                localA.localCoordinateId,
              ),
        };

        process.stdout.write(JSON.stringify({
          fullMap,
          localIdentity,
          population,
          ownerGraph,
          endpointFree,
          selfUpdate,
        }));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { cwd: ROOT, encoding: "utf8" }
    );
    if (result.status !== 0) {
        throw new Error(result.stderr || "Grammatical Atlas probe failed");
    }
    return JSON.parse(result.stdout);
}

function run() {
    const s = createSuite("classical_grammatical_atlas");
    const probe = readAtlasProbe();

    s.eq("all 58 lesson planes map and recover without authority", probe.fullMap, {
        lessonPlaneCount: 58,
        lessonLocalCoordinateCount: 58,
        everyLessonRoundTrips: true,
        repeatedCoordinatesRetainEveryLocal: true,
        allGlobalMembersAccountedFor: true,
        immutable: true,
        groupingUsesOnlySixFields: true,
        grammarAuthority: false,
    });

    s.eq("six-field grouping preserves exact lesson atom and evidence identity", probe.localIdentity, {
        oneGlobalCoordinate: 1,
        bothLocalCoordinatesRecovered: 2,
        exactLocalFrames: true,
        exactLocalIdentities: true,
        exactEvidenceIdentities: true,
        atomAndLessonIdentityExcludedFromGrouping: true,
        roundTripA: "lossless",
    });

    s.eq("large atom populations use immutable indexes and reject ambiguous local IDs", probe.population, {
        duplicateFramesRejected: 2,
        ambiguousDuplicateHasNoProjection: true,
        duplicateLessonsStillReceiveDefaults: 2,
        populationSize: 1000,
        oneSixFieldCoordinate: 1,
        backwardRecoversEveryAtom: 1000,
        indexedForwardIdentity: true,
        indexedBackwardIdentity: true,
        exactRoundTrip: "lossless",
    });

    s.eq("generic Atlas keeps declared owner shapes non-authorizing", probe.ownerGraph, {
        typedNodeCount: 5,
        operationNodesInstalled: 2,
        applicationNodesInstalled: 3,
        oneDeclaredHyperedge: 1,
        unobservedEdgeExcluded: 1,
        exactInnerApplicationLinked: true,
        exactOuterApplicationLinked: true,
        unrelatedApplicationNotLinked: true,
        declaredProofObjectIdentityPreserved: true,
        declaredApplicationObjectIdentityPreserved: true,
        typedBoundaryPreserved: true,
        callerDeclaredInnerAtomEndpointLinked: false,
        callerDeclaredOuterAtomEndpointLinked: false,
        unrelatedLessonAtomNotLinked: true,
        callerDeclaredProjectionUsedAsEndpoint: false,
        callerDeclaredOperationCoordinatesUsedAsEndpoints: false,
        lessonScopeKeptSeparateFromAtomEndpoints: true,
        genericCoreDoesNotClaimPopulationIdentity: true,
        serviceIssuedIdentityValidationRemainsExternal: true,
        endpointStatus: "no-atom-operation-coordinate-claimed",
        nonAuthorizing: true,
    });

    s.eq("exact application hyperedges do not invent atom endpoints", probe.endpointFree, {
        oneDeclaredHyperedge: 1,
        exactApplicationsStillLinked: true,
        noInnerAtomEndpointInvented: 0,
        noOuterAtomEndpointInvented: 0,
        noInnerProjectionInvented: 0,
        noOuterProjectionInvented: 0,
        noOperationCoordinateInvented: 0,
        lessonScopeStillRecoverable: "1,1",
        endpointStatus: "no-atom-operation-coordinate-claimed",
        declaredProofObjectIdentityPreserved: true,
        nonAuthorizing: true,
    });

    s.eq("pure updates rebuild indexes and hyperedges without changing earlier frames", probe.selfUpdate, {
        newImmutableFrame: true,
        priorFrameUnchanged: true,
        updatedLocalCount: 4,
        updatedHyperedgeClaimsNoCallerAtomEndpoints: 0,
        stableGlobalCoordinate: true,
        newAtomRoundTrips: "lossless",
        exactNewEvidencePreserved: true,
        callerDeclaredNewProjectionNotUsedAsEndpoint: true,
        unrelatedLessonAtomStillExcluded: true,
    });

    return s;
}

module.exports = { run };
