"use strict";

const path = require("path");
const { spawnSync } = require("child_process");
const { pathToFileURL } = require("url");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function readPopulationProbe() {
    const adapterUrl = pathToFileURL(path.join(
        ROOT,
        "src/core/grammar/grammatical_atlas_population_adapter.mjs"
    )).href;
    const atlasUrl = pathToFileURL(path.join(
        ROOT,
        "src/core/grammar/grammatical_atlas.mjs"
    )).href;
    const populationVersionUrl = pathToFileURL(path.join(
        ROOT,
        "data/classical_grammatical_atlas_population_version.mjs"
    )).href;
    const populationDataUrl = pathToFileURL(path.join(
        ROOT,
        "data/classical_grammatical_atlas_population.mjs"
    )).href;
    const script = `
        const adapter = await import(${JSON.stringify(adapterUrl)});
        const atlasModule = await import(${JSON.stringify(atlasUrl)});
        const populationVersionModule = await import(
          ${JSON.stringify(populationVersionUrl)}
        );
        const populationDataModule = await import(
          ${JSON.stringify(populationDataUrl)}
        );
        const populationVersion = populationVersionModule
          .CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_VERSION;
        const beforeCanonicalLoad =
          adapter.getClassicalGrammaticalAtlasPopulationFrameIfReady();
        const frame = await adapter
          .loadClassicalGrammaticalAtlasPopulationFrame({
            populationVersion,
          });
        const repeatedFrame = await adapter
          .loadClassicalGrammaticalAtlasPopulationFrame({
            populationVersion,
          });
        const population = frame.population;
        const alteredPopulation = Object.freeze({
          ...population,
          exactOperationLinks: Object.freeze(
            population.exactOperationLinks.slice(1),
          ),
        });
        const atlas = frame.atlasFrame;
        const indexes = frame.indexes;
        const atomField = field => population.codebook.atomTuple.indexOf(field);
        const linkField = field => (
          population.codebook.exactOperationLinkTuple.indexOf(field)
        );
        const atomIdPosition = atomField("atomId");
        const lessonPosition = atomField("lessonNumber");
        const groupPosition = atomField("groupIndex");
        const candidateSetPosition = atomField(
          "proofFileCandidateOperationSetIndex",
        );
        const directAxisSetPosition = atomField(
          "directAxisEvidenceSetIndex",
        );
        const linkAtomPosition = linkField("atomIndex");
        const linkOperationPosition = linkField("operationIndex");
        const sixFields = [
          "requiresPresent",
          "requiresAbsent",
          "adds",
          "removes",
          "preserves",
          "emits",
        ];
        const normalized = values => [...new Set(values)].sort();
        const expectedSignature = sourceTuple => Object.fromEntries(
          sixFields.map((field, index) => [field, normalized(sourceTuple[index])]),
        );
        const signatureMatches = (signature, expected) => sixFields.every(
          field => JSON.stringify(signature[field])
            === JSON.stringify(expected[field]),
        );
        const cardinality = count => count === 0
          ? "zero"
          : count === 1 ? "single" : "multiple";

        const exactLinksByAtomIndex = new Map();
        population.exactOperationLinks.forEach((tuple, linkIndex) => {
          const atomIndex = Number(tuple[linkAtomPosition]);
          const links = exactLinksByAtomIndex.get(atomIndex) || [];
          links.push({
            tuple,
            linkIndex,
            operationIndex: Number(tuple[linkOperationPosition]),
          });
          exactLinksByAtomIndex.set(atomIndex, links);
        });

        const lessonCoordinates = {
          schemaVersion: population.schemaVersion,
          oneAtomPerTuple: frame.populatedAtomCount === population.atoms.length
            && frame.atomCoordinates.length === population.atoms.length
            && frame.rejectedAtomCount === 0,
          exactTupleAndLocalIdentity: frame.atomCoordinates.every(atom => {
            const tuple = population.atoms[atom.atomEvidenceFrame.sourceAtomIndex];
            const group = population.groups[tuple[groupPosition]];
            return atom.sourceTuple === tuple
              && atom.localCoordinateFrame.localIdentity === tuple
              && atom.localCoordinateId === [
                "L" + tuple[lessonPosition],
                group[1],
                tuple[atomIdPosition],
              ].join("/");
          }),
          exactLosslessRoundTrip: frame.atomCoordinates.every(atom => {
            const roundTrip = atlasModule
              .roundTripClassicalGrammaticalAtlasLocalCoordinate(
                atlas,
                atom.localCoordinateId,
              );
            const expectedEvidence = [
              atom.atomEvidenceFrame,
              ...atom.directAxisEvidenceFrames,
              ...atom.operationCoordinateProjections,
            ];
            return roundTrip.roundTripStatus === "lossless"
              && roundTrip.recoveredLocalFrame === atom.localCoordinateFrame
              && roundTrip.recoveredLocalFrame.localIdentity === atom.sourceTuple
              && roundTrip.recoveredLocalFrame.evidenceFrames.length
                === expectedEvidence.length
              && roundTrip.recoveredLocalFrame.evidenceFrames.every(
                (evidence, index) => evidence === expectedEvidence[index],
              );
          }),
          exactLessonIndexes: frame.atomCoordinates.every(atom => (
            indexes.atomById[atom.atomId] === atom
            && indexes.atomByLocalCoordinateId[atom.localCoordinateId] === atom
            && indexes.localCoordinateIdByAtomId[atom.atomId]
              === atom.localCoordinateId
            && indexes.lessonGlobalCoordinateIdByAtomId[atom.atomId]
              === atom.lessonGlobalCoordinateId
            && indexes.globalCoordinateIdByAtomId[atom.atomId]
              === atom.lessonGlobalCoordinateId
          )),
        };

        const candidatePairs = [];
        const exactPairs = [];
        const candidateCardinalityCounts = { zero: 0, single: 0, multiple: 0 };
        const exactCardinalityCounts = { zero: 0, single: 0, multiple: 0 };
        let candidateSetsDecodeExactly = true;
        let exactSetsDecodeOnlyFromExactLinks = true;
        let projectionsDecodeOnlyFromExactLinks = true;
        frame.atomCoordinates.forEach(atom => {
          const atomIndex = atom.atomEvidenceFrame.sourceAtomIndex;
          const tuple = population.atoms[atomIndex];
          const expectedCandidates = population.proofFileCandidateOperationSets[
            tuple[candidateSetPosition]
          ].map(operationIndex => population.operations[operationIndex]);
          const linkSources = exactLinksByAtomIndex.get(atomIndex) || [];
          const linkedOperationIds = new Set(linkSources.map(
            link => population.operations[link.operationIndex],
          ));
          const expectedExact = population.operations.filter(
            operationId => linkedOperationIds.has(operationId),
          );
          candidateSetsDecodeExactly = candidateSetsDecodeExactly
            && JSON.stringify(atom.proofFileCandidateOperationIds)
              === JSON.stringify(expectedCandidates)
            && atom.atomEvidenceFrame.proofFileCandidateMappingCardinality
              === cardinality(expectedCandidates.length);
          exactSetsDecodeOnlyFromExactLinks = exactSetsDecodeOnlyFromExactLinks
            && JSON.stringify(atom.exactOperationIds)
              === JSON.stringify(expectedExact)
            && JSON.stringify(atom.operationIds)
              === JSON.stringify(expectedExact)
            && atom.atomEvidenceFrame.exactOperationMappingCardinality
              === cardinality(expectedExact.length);
          projectionsDecodeOnlyFromExactLinks =
            projectionsDecodeOnlyFromExactLinks
            && atom.operationCoordinateProjections.length === linkSources.length
            && atom.operationCoordinateProjections.every((projection, index) => {
              const source = linkSources[index];
              const decodedLink = frame.exactOperationLinkFrames[
                source.linkIndex
              ];
              return projection.projectionStatus
                  === "declared-operation-coordinate"
                && projection
                  .exactLinkShapePreservedWithoutGrantingIdentity === true
                && projection.operationId
                  === population.operations[source.operationIndex]
                && projection.atomId === atom.atomId
                && projection.atomLocalCoordinateId === atom.localCoordinateId
                && projection.evidenceFrames.length === 1
                && projection.evidenceFrames[0] === decodedLink
                && decodedLink.sourceTuple === source.tuple
                && decodedLink.candidateProofSetDidNotAuthorizeLink === true;
            });
          candidateCardinalityCounts[cardinality(expectedCandidates.length)] += 1;
          exactCardinalityCounts[cardinality(expectedExact.length)] += 1;
          expectedCandidates.forEach(operationId => candidatePairs.push(
            atom.atomId + "\\u0000" + operationId,
          ));
          expectedExact.forEach(operationId => exactPairs.push(
            atom.atomId + "\\u0000" + operationId,
          ));
        });
        const exactPairSet = new Set(exactPairs);
        const candidateOnlyPairs = candidatePairs.filter(
          pair => !exactPairSet.has(pair),
        );
        const candidateEvidence = {
          candidateSetsDecodeExactly,
          candidateCountsMatchPopulation:
            candidateCardinalityCounts.single
              === population.counts.atomsWithSingleProofFileCandidateOperation
            && candidateCardinalityCounts.multiple
              === population.counts.atomsWithMultipleProofFileCandidateOperations
            && candidateCardinalityCounts.single
              + candidateCardinalityCounts.multiple
              === population.counts.atomsWithProofFileCandidateOperations,
          zeroSingleMultiplePreserved:
            Object.values(candidateCardinalityCounts).every(count => count > 0),
          candidateOnlyPairsExist: candidateOnlyPairs.length > 0,
          candidateOnlyPairsExcludedFromExactIndexes:
            candidateOnlyPairs.every(pair => {
              const [atomId, operationId] = pair.split("\\u0000");
              return indexes.candidateAtomIdsByOperationId[operationId]
                  .includes(atomId)
                && !indexes.exactAtomIdsByOperationId[operationId]
                  .includes(atomId)
                && !indexes.atomIdsByOperationId[operationId]
                  .includes(atomId);
            }),
          explicitNonAuthorizingFlags:
            frame.proofFileCandidatesDoNotAuthorizeOperationCoordinates === true
            && frame.operationCoordinatesRequireExactOwnerEvidence === true
            && frame.atomCoordinates.every(atom => (
              atom.candidateProofSetsDoNotCreateOperationCoordinates === true
              && atom.atomEvidenceFrame
                .proofFileCandidatesRemainNonAuthorizing === true
              && atom.atomEvidenceFrame
                .onlyExactOwnerEvidenceCreatesOperationCoordinates === true
            )),
        };
        const firstCanonicalProjection = frame.atomCoordinates
          .flatMap(atom => atom.operationCoordinateProjections)[0];
        const structuralClone = Object.freeze({
          ...firstCanonicalProjection,
        });
        const rebuiltFromCanonicalLink = atlasModule
          .buildClassicalGrammaticalAtlasAtomOperationProjectionFrame({
            atomId: firstCanonicalProjection.atomId,
            atomLocalCoordinateId:
              firstCanonicalProjection.atomLocalCoordinateId,
            operationId: firstCanonicalProjection.operationId,
            compatibilitySignature:
              firstCanonicalProjection.sixFieldSignature,
            exactOperationLinkFrames:
              firstCanonicalProjection.exactOperationLinkFrames,
          });
        const canonicalProjectionAtom = frame.indexes.atomById[
          firstCanonicalProjection.atomId
        ];
        const canonicalProjectionAtomIndex = canonicalProjectionAtom
          .atomEvidenceFrame.sourceAtomIndex;
        const minimalCustomPopulation = Object.freeze({
          ...frame.population,
          atoms: Object.freeze([
            frame.population.atoms[canonicalProjectionAtomIndex],
          ]),
          exactOperationLinks: Object.freeze(
            frame.population.exactOperationLinks
              .filter(tuple => (
                Number(tuple[linkAtomPosition])
                  === canonicalProjectionAtomIndex
              ))
              .map(tuple => Object.freeze(tuple.map((value, index) => (
                index === linkAtomPosition ? 0 : value
              )))),
          ),
        });
        const customFrame = adapter
          .buildClassicalGrammaticalAtlasPopulationFrame({
            population: minimalCustomPopulation,
          });
        const firstCustomProjection = customFrame.atomCoordinates
          .flatMap(atom => atom.operationCoordinateProjections)[0];
        const loaderBoundary = {
          initiallyUnmaterialized: beforeCanonicalLoad === null,
          repeatedLoadStableIdentity: repeatedFrame === frame,
          everyCanonicalProjectionIssued: frame.atomCoordinates.every(
            atom => atom.operationCoordinateProjections.every(
              projection => adapter
                .isClassicalGrammaticalAtlasPopulationExactOperationProjection(
                  projection,
                ),
            ),
          ),
          structuralCloneRejected: !adapter
            .isClassicalGrammaticalAtlasPopulationExactOperationProjection(
              structuralClone,
            ),
          coreRebuildRejected: !adapter
            .isClassicalGrammaticalAtlasPopulationExactOperationProjection(
              rebuiltFromCanonicalLink,
            ),
          publicCustomBuildRejected: !adapter
            .isClassicalGrammaticalAtlasPopulationExactOperationProjection(
              firstCustomProjection,
            ),
          exactCommitMarkerMatched: (await adapter
            .inspectClassicalGrammaticalAtlasPopulationCommit({
              population: frame.population,
              populationPayloadDigest: populationDataModule
                .CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_PAYLOAD_DIGEST,
              populationVersion,
            })).status === "matched",
          stalePayloadDigestRejected: (await adapter
            .inspectClassicalGrammaticalAtlasPopulationCommit({
              population: frame.population,
              populationPayloadDigest: "sha256:stale-payload",
              populationVersion,
            })).exactProjectionBrandingAllowed === false,
          alteredPayloadRejected: (await adapter
            .inspectClassicalGrammaticalAtlasPopulationCommit({
              population: alteredPopulation,
              populationPayloadDigest: populationDataModule
                .CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_PAYLOAD_DIGEST,
              populationVersion,
            })).exactProjectionBrandingAllowed === false,
          wrongLessonScopeRejected: (await adapter
            .inspectClassicalGrammaticalAtlasPopulationCommit({
              population: frame.population,
              populationPayloadDigest: populationDataModule
                .CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_PAYLOAD_DIGEST,
              populationVersion: Object.freeze({
                ...populationVersion,
                populatedLessonNumbers: Object.freeze(
                  populationVersion.populatedLessonNumbers.slice(1),
                ),
              }),
            })).exactProjectionBrandingAllowed === false,
          wrongStatusCountsRejected: (await adapter
            .inspectClassicalGrammaticalAtlasPopulationCommit({
              population: frame.population,
              populationPayloadDigest: populationDataModule
                .CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_PAYLOAD_DIGEST,
              populationVersion: Object.freeze({
                ...populationVersion,
                counts: Object.freeze({
                  ...populationVersion.counts,
                  active: populationVersion.counts.active - 1,
                  pending: populationVersion.counts.pending + 1,
                }),
              }),
            })).exactProjectionBrandingAllowed === false,
        };

        const exactOperations = {
          exactSetsDecodeOnlyFromExactLinks,
          projectionsDecodeOnlyFromExactLinks,
          linkAndProjectionCountsMatch:
            frame.exactOperationLinkFrames.length
              === population.exactOperationLinks.length
            && frame.exactOperationProjectionCount
              === population.exactOperationLinks.length,
          exactCountsMatchPopulation:
            exactCardinalityCounts.single
              === population.counts.atomsWithSingleExactOperationLink
            && exactCardinalityCounts.multiple
              === population.counts.atomsWithMultipleExactOperationLinks
            && exactCardinalityCounts.single + exactCardinalityCounts.multiple
              === population.counts.atomsWithExactOperationLinks,
          zeroSingleMultiplePreserved:
            Object.values(exactCardinalityCounts).every(count => count > 0),
          everyLinkHasExactEvidence:
            frame.exactOperationLinkFrames.every(link => (
              link.exactOwnerEvidenceStatus === "exact"
              && link.evidenceKinds.length > 0
              && !link.evidenceKinds.includes("single-operation-proof-file")
              && population.operations[link.operationIndex] === link.operationId
            )),
          onlyGrammarBearingAtomsReceiveExactLinks:
            frame.exactOperationLinkFrames.every(link => (
              indexes.atomById[link.atomId]
                ?.atomEvidenceFrame.force === "grammar-bearing"
            )),
        };

        const operationFrameById = Object.fromEntries(
          frame.operationCoordinateFrames.map(operation => [
            operation.operationId,
            operation,
          ]),
        );
        const operationCoordinates = {
          inventoryIsOneToOne:
            frame.operationCoordinateFrames.length === population.operations.length
            && frame.operationCoordinateFrames.every((operation, index) => (
              operation.operationIndex === index
              && operation.operationId === population.operations[index]
              && operation.sourceTuple
                === population.operationSixFieldSignatures[index]
            )),
          everyCanonicalSixFieldCoordinateMatches:
            frame.operationCoordinateFrames.every(operation => {
              const expected = expectedSignature(operation.sourceTuple);
              return signatureMatches(operation.sixFieldSignature, expected)
                && operation.sixFieldCoordinate.sixFieldSignature
                  === operation.sixFieldSignature
                && operation.operationGlobalCoordinateId
                  === operation.sixFieldCoordinate.globalCoordinateId;
            }),
          everyProjectionMatchesCanonicalOperation:
            frame.atomCoordinates.every(atom => (
              atom.operationCoordinateProjections.every(projection => {
                const operation = operationFrameById[projection.operationId];
                return Boolean(operation)
                  && signatureMatches(
                    projection.sixFieldSignature,
                    expectedSignature(operation.sourceTuple),
                  )
                  && projection.operationGlobalCoordinateId
                    === operation.operationGlobalCoordinateId
                  && JSON.stringify(projection.sixFieldSignature)
                    === JSON.stringify(operation.sixFieldSignature);
              })
            )),
          everyProjectionGlobalIndexMatches:
            frame.atomCoordinates.every(atom => (
              atom.operationCoordinateProjections.every(projection => (
                indexes.operationGlobalCoordinateIdsByAtomId[atom.atomId]
                  .includes(projection.operationGlobalCoordinateId)
                && indexes.atomIdsByOperationGlobalCoordinateId[
                  projection.operationGlobalCoordinateId
                ].includes(atom.atomId)
              ))
            )),
        };

        const expectedCandidateReverse = Object.fromEntries(
          population.operations.map(operationId => [operationId, []]),
        );
        const expectedExactReverse = Object.fromEntries(
          population.operations.map(operationId => [operationId, []]),
        );
        const expectedLocalReverse = Object.fromEntries(
          population.operations.map(operationId => [operationId, []]),
        );
        frame.atomCoordinates.forEach(atom => {
          atom.proofFileCandidateOperationIds.forEach(operationId => {
            expectedCandidateReverse[operationId].push(atom.atomId);
          });
          atom.exactOperationIds.forEach(operationId => {
            expectedExactReverse[operationId].push(atom.atomId);
            expectedLocalReverse[operationId].push(atom.localCoordinateId);
          });
        });
        const reverseIndexes = {
          candidateReverseExact: population.operations.every(operationId => (
            JSON.stringify(indexes.candidateAtomIdsByOperationId[operationId])
              === JSON.stringify(expectedCandidateReverse[operationId])
          )),
          exactReverseExact: population.operations.every(operationId => (
            JSON.stringify(indexes.exactAtomIdsByOperationId[operationId])
              === JSON.stringify(expectedExactReverse[operationId])
            && JSON.stringify(indexes.atomIdsByOperationId[operationId])
              === JSON.stringify(expectedExactReverse[operationId])
            && JSON.stringify(indexes.localCoordinateIdsByOperationId[operationId])
              === JSON.stringify(expectedLocalReverse[operationId])
          )),
          perAtomIndexesExact: frame.atomCoordinates.every(atom => (
            indexes.proofFileCandidateOperationIdsByAtomId[atom.atomId]
              === atom.proofFileCandidateOperationIds
            && JSON.stringify(indexes.exactOperationIdsByAtomId[atom.atomId])
              === JSON.stringify(atom.exactOperationIds)
            && JSON.stringify(indexes.operationIdsByAtomId[atom.atomId])
              === JSON.stringify(atom.exactOperationIds)
            && indexes.operationCoordinateProjectionsByAtomId[atom.atomId]
              === atom.operationCoordinateProjections
          )),
          exactAndCandidateIndexesAreDistinct:
            indexes.candidateAtomIdsByOperationId
              !== indexes.exactAtomIdsByOperationId
            && indexes.candidateAtomIdsByOperationId
              !== indexes.atomIdsByOperationId,
          indexesFrozen: Object.isFrozen(indexes)
            && Object.values(indexes.candidateAtomIdsByOperationId)
              .every(Object.isFrozen)
            && Object.values(indexes.exactAtomIdsByOperationId)
              .every(Object.isFrozen)
            && Object.values(indexes.atomIdsByOperationGlobalCoordinateId)
              .every(Object.isFrozen),
        };

        const validDispositionSet = new Set(
          population.codebook.evidenceDispositions,
        );
        const dispositionCounts = Object.fromEntries(
          population.codebook.evidenceDispositions.map(disposition => [
            disposition,
            frame.atomCoordinates.filter(atom => (
              atom.atomEvidenceFrame.evidenceDisposition === disposition
            )).length,
          ]),
        );
        const dispositions = {
          everyAtomHasValidDisposition: frame.atomCoordinates.every(atom => (
            validDispositionSet.has(
              atom.atomEvidenceFrame.evidenceDisposition,
            )
          )),
          dispositionCountsCoverEveryAtom:
            Object.values(dispositionCounts).reduce((sum, count) => sum + count, 0)
              === population.atoms.length,
          lessonDispositionCountsExact:
            frame.lessonOwnerEvidenceFrames.every(lesson => (
              population.codebook.evidenceDispositions.every(disposition => (
                lesson.evidenceDispositionCounts[disposition]
                  === frame.atomCoordinates.filter(atom => (
                    atom.lessonNumber === lesson.lessonNumber
                    && atom.atomEvidenceFrame.evidenceDisposition === disposition
                  )).length
              ))
            )),
          acceptedWritingOwnerLinkPendingIsZero:
            population.counts.acceptedWritingOwnerLinkPending === 0
            && dispositionCounts["accepted-writing-owner-link-pending"] === 0,
        };

        const expectedDefaultLessons = Array.from(
          {
            length: population.scope.maximumLesson
              - population.scope.lastPopulatedLesson,
          },
          (_, index) => population.scope.lastPopulatedLesson + index + 1,
        );
        const defaultLessons = {
          scopeStillStopsAtLesson39:
            population.scope.lastPopulatedLesson === 39
            && population.scope.maximumLesson === 58,
          lessons40Through58AreExactlyTheDefaults:
            JSON.stringify(frame.unpopulatedLessonNumbers)
              === JSON.stringify(expectedDefaultLessons)
            && expectedDefaultLessons.every(
              lessonNumber => lessonNumber >= 40 && lessonNumber <= 58,
            ),
          oneDefaultCoordinatePerUnpopulatedLesson:
            frame.defaultLessonLocalCoordinates.length
              === expectedDefaultLessons.length
            && expectedDefaultLessons.every(lessonNumber => (
              frame.defaultLessonLocalCoordinates.filter(local => (
                local.lessonNumber === lessonNumber
              )).length === 1
            )),
          unpopulatedOwnerEvidenceRemainsPending:
            frame.lessonOwnerEvidenceFrames.filter(lesson => (
              expectedDefaultLessons.includes(lesson.lessonNumber)
            )).every(lesson => (
              lesson.populationStatus === "unpopulated"
              && lesson.atomCount === 0
              && lesson.operationIds.length === 0
              && lesson.proofFileCandidateOperationIds.length === 0
              && lesson.operationIndexStatus === "accepted-evidence-pending"
              && lesson.acceptedImplementationEvidencePresent === false
            )),
        };

        const lessonEvidence = {
          oneFramePerLesson:
            frame.lessonOwnerEvidenceFrames.length
              === population.scope.maximumLesson,
          exactAndCandidateSummariesStaySeparate:
            frame.lessonOwnerEvidenceFrames.every(lesson => {
              const atoms = frame.atomCoordinates.filter(atom => (
                atom.lessonNumber === lesson.lessonNumber
              ));
              const exactSet = new Set(atoms.flatMap(
                atom => atom.exactOperationIds,
              ));
              const candidateSet = new Set(atoms.flatMap(
                atom => atom.proofFileCandidateOperationIds,
              ));
              const exact = population.operations.filter(
                operationId => exactSet.has(operationId),
              );
              const candidates = population.operations.filter(
                operationId => candidateSet.has(operationId),
              );
              return JSON.stringify(lesson.operationIds)
                  === JSON.stringify(exact)
                && JSON.stringify(lesson.proofFileCandidateOperationIds)
                  === JSON.stringify(candidates)
                && lesson.operationMappingCardinality
                  === cardinality(exact.length)
                && lesson.proofFileCandidateMappingCardinality
                  === cardinality(candidates.length)
                && lesson.exactOwnerOperationLinksOnly === true
                && lesson.proofFileCandidatesRemainNonAuthorizing === true;
            }),
        };

        const directAxis = {
          exactTupleDecode:
            frame.directAxisCoordinateFrames.length
              === population.directAxisCoordinates.length
            && frame.directAxisCoordinateFrames.every((axis, index) => (
              axis.sourceTuple === population.directAxisCoordinates[index]
              && population.operations[axis.operationIndex] === axis.operationId
            )),
          exactAtomLinks: frame.atomCoordinates.every(atom => {
            const tuple = atom.sourceTuple;
            const expected = population.directAxisEvidenceSets[
              tuple[directAxisSetPosition]
            ].map(index => frame.directAxisCoordinateFrames[index]);
            return atom.directAxisEvidenceFrames.length === expected.length
              && atom.directAxisEvidenceFrames.every(
                (axis, index) => axis === expected[index],
              );
          }),
        };

        const authorityViolations = [];
        const seen = new WeakSet();
        const visit = value => {
          if (!value || typeof value !== "object" || seen.has(value)) return;
          seen.add(value);
          Object.entries(value).forEach(([key, member]) => {
            if (
              /(?:Authority|MayAuthorizeGrammar|AuthorizesGrammar|AuthorizationAccepted)$/u
                .test(key)
              && member !== false
            ) authorityViolations.push([key, member]);
            visit(member);
          });
        };
        visit(frame);
        const authority = {
          violationCount: authorityViolations.length,
          populationFrameAuthority: frame.grammarAuthority,
          atlasAuthority: atlas.grammarAuthority,
          everyProjectionNonAuthorizing: frame.atomCoordinates.every(atom => (
            atom.operationCoordinateProjections.every(projection => (
              projection.grammarAuthority === false
              && projection.coordinateMayAuthorizeGrammar === false
            ))
          )),
        };

        process.stdout.write(JSON.stringify({
          lessonCoordinates,
          candidateEvidence,
          exactOperations,
          operationCoordinates,
          reverseIndexes,
          dispositions,
          defaultLessons,
          lessonEvidence,
          directAxis,
          authority,
          loaderBoundary,
        }));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { cwd: ROOT, encoding: "utf8", maxBuffer: 1024 * 1024 * 10 }
    );
    if (result.status !== 0) {
        throw new Error(
            result.stderr || "Grammatical Atlas population probe failed"
        );
    }
    return JSON.parse(result.stdout);
}

function run() {
    const s = createSuite("classical_grammatical_atlas_population");
    const probe = readPopulationProbe();

    s.eq("schema v2 keeps every lesson atom at its exact local coordinate", probe.lessonCoordinates, {
        schemaVersion: 2,
        oneAtomPerTuple: true,
        exactTupleAndLocalIdentity: true,
        exactLosslessRoundTrip: true,
        exactLessonIndexes: true,
    });

    s.eq("proof-file operation candidates remain complete but non-authorizing", probe.candidateEvidence, {
        candidateSetsDecodeExactly: true,
        candidateCountsMatchPopulation: true,
        zeroSingleMultiplePreserved: true,
        candidateOnlyPairsExist: true,
        candidateOnlyPairsExcludedFromExactIndexes: true,
        explicitNonAuthorizingFlags: true,
    });

    s.eq("exact operation coordinates come only from exact owner links", probe.exactOperations, {
        exactSetsDecodeOnlyFromExactLinks: true,
        projectionsDecodeOnlyFromExactLinks: true,
        linkAndProjectionCountsMatch: true,
        exactCountsMatchPopulation: true,
        zeroSingleMultiplePreserved: true,
        everyLinkHasExactEvidence: true,
        onlyGrammarBearingAtomsReceiveExactLinks: true,
    });

    s.eq("every atom operation projection retains the canonical six-field coordinate", probe.operationCoordinates, {
        inventoryIsOneToOne: true,
        everyCanonicalSixFieldCoordinateMatches: true,
        everyProjectionMatchesCanonicalOperation: true,
        everyProjectionGlobalIndexMatches: true,
    });

    s.eq("candidate and exact reverse indexes remain separate exact and immutable", probe.reverseIndexes, {
        candidateReverseExact: true,
        exactReverseExact: true,
        perAtomIndexesExact: true,
        exactAndCandidateIndexesAreDistinct: true,
        indexesFrozen: true,
    });

    s.eq("every atom has one valid honest evidence disposition", probe.dispositions, {
        everyAtomHasValidDisposition: true,
        dispositionCountsCoverEveryAtom: true,
        lessonDispositionCountsExact: true,
        acceptedWritingOwnerLinkPendingIsZero: true,
    });

    s.eq("Lessons 40 through 58 remain untouched default lesson planes", probe.defaultLessons, {
        scopeStillStopsAtLesson39: true,
        lessons40Through58AreExactlyTheDefaults: true,
        oneDefaultCoordinatePerUnpopulatedLesson: true,
        unpopulatedOwnerEvidenceRemainsPending: true,
    });

    s.eq("lesson summaries preserve exact links apart from proof-file candidates", probe.lessonEvidence, {
        oneFramePerLesson: true,
        exactAndCandidateSummariesStaySeparate: true,
    });

    s.eq("direct-axis evidence keeps its exact generated identity", probe.directAxis, {
        exactTupleDecode: true,
        exactAtomLinks: true,
    });

    s.eq("population coordinates evidence and indexes have no grammar authority", probe.authority, {
        violationCount: 0,
        populationFrameAuthority: false,
        atlasAuthority: false,
        everyProjectionNonAuthorizing: true,
    });

    s.eq("only the lazy canonical population loader issues exact coordinate identity", probe.loaderBoundary, {
        initiallyUnmaterialized: true,
        repeatedLoadStableIdentity: true,
        everyCanonicalProjectionIssued: true,
        structuralCloneRejected: true,
        coreRebuildRejected: true,
        publicCustomBuildRejected: true,
        exactCommitMarkerMatched: true,
        stalePayloadDigestRejected: true,
        alteredPayloadRejected: true,
        wrongLessonScopeRejected: true,
        wrongStatusCountsRejected: true,
    });

    return s;
}

module.exports = { run };
