"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx) {
    const s = createSuite("classical_grammatical_rhyme_space");
    const inventory = ctx.getClassicalGrammarApplicationInventory();
    const axisLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs",
        "CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json"
    ), "utf8"));
    const lessonMapText = fs.readFileSync(path.join(
        ROOT,
        "docs",
        "canvas-progress",
        "lessons1_58-minimal-run-ledger.md"
    ), "utf8");
    const mappedLessonRows = [...lessonMapText.matchAll(
        /^\| L(\d+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gmu
    )].map(match => ({
        lessonNumber: Number(match[1]),
        emptiness: match[2].trim(),
        fullness: match[3].trim(),
        rotation: match[4].trim(),
        rhymeAxes: match[5].split(",").map(axis => axis.trim()),
    }));
    const axisJobs = new Map(axisLedger.entries.map(entry => [
        `${entry.operationId}/${entry.axisId}`,
        entry.semanticFactRole,
    ]));
    const axisOwners = new Map();
    inventory.operations.forEach(operation => {
        operation.axisIds.forEach(axisId => {
            const owners = axisOwners.get(axisId) || [];
            owners.push(operation.operationId);
            axisOwners.set(axisId, owners);
        });
    });
    const source = ctx.buildClassicalNahuatlTranscriptionSourceFrame({
        constituents: [{ segments: ["/k/", "a", "/l/"] }],
    });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "orthography:transcription",
        args: [source],
    });
    const receiptPin = ctx.getClassicalGrammarApplicationRhymeFullPin(
        receipt
    );
    const resultPin = ctx.getClassicalGrammarApplicationRhymeFullPin(
        receipt.canonicalResult
    );
    const copiedReceiptPin = ctx.getClassicalGrammarApplicationRhymeFullPin({
        ...receipt,
    });
    const copiedResultPin = ctx.getClassicalGrammarApplicationRhymeFullPin({
        ...receipt.canonicalResult,
    });
    const capture = ctx.captureClassicalGrammarApplicationResult(
        receipt,
        "rhyme-source"
    );
    const calibration =
        ctx.getClassicalGrammarApplicationRhymeCalibration(receipt);

    s.eq("all canonical application routes enter the shared dimensional inventory without lesson authority", {
        operationsHaveCoordinates: inventory.operations.every(operation => (
            operation.axisIds.length > 0
            && operation.axisIds.every(Boolean)
        )),
        repeatedCoordinateCount: [...axisOwners.values()].filter(
            owners => owners.length > 1
        ).length > 0,
        operationIdsAreUnique:
            new Set(inventory.operationIds).size
                === inventory.operationIds.length,
        lessonAxisAbsent: inventory.operations.every(operation => (
            !operation.axisIds.some(axisId => /lesson/u.test(axisId))
        )),
        routePlanesDeclared:
            inventory.grammaticalRhymeCalibration.declaredRoutePlaneCount
                === inventory.operationIds.length,
        routePlaneCount:
            inventory.grammaticalRhymeCalibration.routePlaneCount,
        everyEmptyAxisHasAcceptedJob: inventory.operations.every(
            operation => operation.axisIds.every(axisId => (
                axisJobs.has(`${operation.operationId}/${axisId}`)
            ))
        ),
        everyPlaneKeepsExactAxes: inventory.operations.every(operation => (
            JSON.stringify(
                operation.rhymeRoutePlaneFrame.emptyPin.requiredAxisIds
            ) === JSON.stringify(operation.axisIds)
        )),
        sharedAndDistinctPlanesAccountedFor:
            inventory.grammaticalRhymeCalibration.sharedRoutePlaneCount
            + inventory.grammaticalRhymeCalibration
                .dimensionallyDistinctRoutePlaneCount
            === inventory.operationIds.length,
        fixedOperationDenominator:
            inventory.operationIds.length
                === axisLedger.counts.operationCount,
        fixedAxisJobDenominator:
            [...axisJobs].length === axisLedger.counts.entryCount,
    }, {
        operationsHaveCoordinates: true,
        repeatedCoordinateCount: true,
        operationIdsAreUnique: true,
        lessonAxisAbsent: true,
        routePlanesDeclared: true,
        routePlaneCount: inventory.operationIds.length,
        everyEmptyAxisHasAcceptedJob: true,
        everyPlaneKeepsExactAxes: true,
        sharedAndDistinctPlanesAccountedFor: true,
        fixedOperationDenominator: true,
        fixedAxisJobDenominator: true,
    });

    const rhymeTopology =
        inventory.grammaticalRhymeCalibration.topology;
    const sixFields = [
        "requiresPresent",
        "requiresAbsent",
        "adds",
        "removes",
        "preserves",
        "emits",
    ];
    const operationById = new Map(inventory.operations.map(operation => [
        operation.operationId,
        operation,
    ]));
    const frequentativePlane = operationById.get(
        "vnc:derivational-operation"
    ).rhymeRoutePlaneFrame;
    const deverbalPlane = operationById.get(
        "nnc:deverbal-construction"
    ).rhymeRoutePlaneFrame;
    const frequentativeDeverbalEdge = rhymeTopology.insideOutEdges.find(
        edge => (
            edge.innerOperationId === "vnc:derivational-operation"
            && edge.outerOperationId === "nnc:deverbal-construction"
        )
    );
    const denominalEdge = rhymeTopology.insideOutEdges.find(edge => (
        edge.innerOperationId === "nnc:ordinary"
        && edge.outerOperationId === "vnc:denominal"
    ));
    s.eq("all routes receive six-field inside-out signatures and collapse only through typed owner-validated seams", {
        topologyKind: rhymeTopology.kind,
        topologyVersion: rhymeTopology.version,
        routeCount: rhymeTopology.routePlaneCount,
        inventoryIsCached:
            ctx.getClassicalGrammarApplicationInventory() === inventory,
        everyRouteHasSixFields:
            rhymeTopology.everyRouteHasSixFieldSignature,
        everyAxisAccountedFor: rhymeTopology.everyAxisAccountedFor,
        operationSignaturesComplete: inventory.operations.every(operation => (
            sixFields.every(field => Array.isArray(
                operation.rhymeRoutePlaneFrame
                    .compatibilitySignature[field]
            ))
            && operation.rhymeRoutePlaneFrame
                .compatibilitySignature.everyAxisAccountedFor
            && Object.isFrozen(
                operation.rhymeRoutePlaneFrame.compatibilitySignature
            )
        )),
        collapsedSeamKinds: rhymeTopology.boundarySeams
            .filter(seam => seam.collapsed)
            .map(seam => seam.unitKind),
        everySeamKeepsOwnerAuthority:
            rhymeTopology.boundarySeams.every(seam => (
                seam.exactOwnerValidationRequiredAtEveryHandoff
                && seam.localOperationHistoryPreserved
                && seam.grammarAuthority === false
            )),
        insideOutEdgesExist: rhymeTopology.insideOutEdgeCount > 0,
        exactContinuationEdgesExist:
            rhymeTopology.exactContinuationEdgeCount > 0,
        exactContinuationIsNarrowerThanAnalogy:
            rhymeTopology.exactContinuationEdgeCount
                < rhymeTopology.insideOutEdgeCount,
        everyEdgeIsOnlyTypedAlignment:
            rhymeTopology.insideOutEdges.every(edge => (
                edge.exactOwnerValidationRequired
                && edge.candidateOnlyUntilConsumerOwnerAuthorizesExactResult
                && edge.localHistoriesRemainDistinct
                && edge.grammarAuthority === false
            )),
        everyExactEdgeIsDeclaredByBothOwners:
            rhymeTopology.exactContinuationEdges.every(edge => (
                edge.continuationTypeContractDeclaredByBothOwners
                && edge.sharedUnitKinds.length > 0
                && edge.sharedFamilyUnitKinds.length > 0
                && edge.exactOwnerValidationRequired
                && edge.grammarAuthority === false
            )),
        sourceAnalysisFramesDoNotPretendToBeResults:
            ["vnc:verbstem-class", "vnc:finite-slot"].every(
                operationId => (
                    operationById.get(operationId)
                        .rhymeRoutePlaneFrame.compatibilitySignature
                        .exactContinuationOutputUnitKinds.length === 0
                )
            ),
        pronominalClauseIsNotAnEmbeddableNounstem:
            !rhymeTopology.exactContinuationEdges.some(edge => (
                edge.innerOperationId === "nnc:pronominal"
                && edge.outerOperationId
                    === "grammar:nominal-construction"
            )),
        slotContinuationKeepsItsExactJob:
            rhymeTopology.exactContinuationEdges.some(edge => (
                edge.innerOperationId === "nnc:ordinary"
                && edge.outerOperationId === "nnc:sentence-surface"
                && edge.sharedUnitKinds.includes(
                    "nnc-sentence-slot-frame"
                )
                && edge.sharedFamilyUnitKinds.includes("nnc-result")
            )),
        superpositionClassesExist:
            rhymeTopology.superimposedClassCount > 0,
        everyClassPreservesLocalGrammar:
            rhymeTopology.superpositionClasses.every(group => (
                group.sharedMovementDoesNotEraseLocalGrammar
                && group.grammarAuthority === false
            )),
        lessonAuthority: rhymeTopology.lessonNumberAuthority,
        exampleAuthority: rhymeTopology.exampleIdentityAuthority,
    }, {
        topologyKind: "classical-grammatical-rhyme-topology-frame",
        topologyVersion: 6,
        routeCount: axisLedger.counts.operationCount,
        inventoryIsCached: true,
        everyRouteHasSixFields: true,
        everyAxisAccountedFor: true,
        operationSignaturesComplete: true,
        collapsedSeamKinds: [
            "clause-result",
            "nnc-result",
            "particle-result",
            "phonological-unit",
            "typed-structure",
            "vnc-result",
        ],
        everySeamKeepsOwnerAuthority: true,
        insideOutEdgesExist: true,
        exactContinuationEdgesExist: true,
        exactContinuationIsNarrowerThanAnalogy: true,
        everyEdgeIsOnlyTypedAlignment: true,
        everyExactEdgeIsDeclaredByBothOwners: true,
        sourceAnalysisFramesDoNotPretendToBeResults: true,
        pronominalClauseIsNotAnEmbeddableNounstem: true,
        slotContinuationKeepsItsExactJob: true,
        superpositionClassesExist: true,
        everyClassPreservesLocalGrammar: true,
        lessonAuthority: false,
        exampleAuthority: false,
    });

    const lessonDiscovery = inventory.grammaticalRhymeCalibration
        .lessonDiscovery;
    const documentedDiscoveryCounts = lessonMapText.match(
        /produce ([\d,]+) typed-boundary candidates, ([\d,]+) direct-rhyme candidates, ([\d,]+) families[^,]+, and ([\d,]+) collapsed graph components/u
    );
    const documentedCount = index => Number(
        documentedDiscoveryCounts?.[index]?.replaceAll(",", "") || 0
    );
    s.eq("the executable lesson planes stay exact with the Lessons 1–58 map", {
        kind: lessonDiscovery.kind,
        version: lessonDiscovery.version,
        planeCount: lessonDiscovery.lessonPlaneCount,
        lessonNumbers: lessonDiscovery.lessonNumbers,
        mapParity: lessonDiscovery.lessonPlanes.every((plane, index) => {
            const row = mappedLessonRows[index];
            return plane.lessonNumber === row?.lessonNumber
                && plane.emptyPin.description === row?.emptiness
                && plane.fullPin.description === row?.fullness
                && plane.rotation.signature === row?.rotation
                && JSON.stringify(plane.rotation.rhymeAxes)
                    === JSON.stringify(row?.rhymeAxes);
        }),
        everyLessonHasSixFields:
            lessonDiscovery.everyLessonHasSixFieldSignature,
        everyCoordinateAccountedFor:
            lessonDiscovery.lessonPlanes.every(plane => (
                plane.compatibilitySignature
                    .everyMapCoordinateAccountedFor
            )),
        lessonNumberNeverAuthorizes:
            lessonDiscovery.lessonPlanes.every(plane => (
                plane.lessonNumberParticipatesInCompatibility === false
                && plane.compatibilitySignature
                    .lessonNumberAuthority === false
            )),
        documentedCountsStayDerived: Boolean(
            documentedCount(1) === lessonDiscovery.candidateEdgeCount
            && documentedCount(2)
                === lessonDiscovery.directRhymeEdgeCount
            && documentedCount(3)
                === lessonDiscovery.superpositionFamilyCount
            && documentedCount(4)
                === lessonDiscovery.collapsedComponentCount
        ),
    }, {
        kind: "classical-grammatical-rhyme-lesson-discovery-frame",
        version: 6,
        planeCount: 58,
        lessonNumbers: Array.from(
            { length: 58 },
            (_, index) => index + 1
        ),
        mapParity: true,
        everyLessonHasSixFields: true,
        everyCoordinateAccountedFor: true,
        lessonNumberNeverAuthorizes: true,
        documentedCountsStayDerived: true,
    });

    s.eq("the lesson map discovers the whole superposition graph without pair instructions", {
        candidateEdgesExist: lessonDiscovery.candidateEdgeCount > 0,
        directRhymeEdgesExist: lessonDiscovery.directRhymeEdgeCount > 0,
        familiesExist: lessonDiscovery.superpositionFamilyCount > 0,
        collapsedComponentsExist:
            lessonDiscovery.collapsedComponentCount > 0,
        compressedGraphExists:
            lessonDiscovery.compressedComponentEdges.length > 0,
        everyEdgeAutomatic:
            lessonDiscovery
                .everyConnectionWasDiscoveredWithoutPairInstructions,
        everyEdgeKeepsOwnerAuthority:
            lessonDiscovery.candidateEdges.every(edge => (
                edge.candidateOnlyUntilConsumerOwnerAuthorizesExactResult
                && edge.exactOwnerValidationRequired
                && edge.localHistoriesRemainDistinct
                && edge.grammarAuthority === false
            )),
        everyFamilyHasSeveralFullPins:
            lessonDiscovery.superpositionFamilies.every(family => (
                family.innerLessonNumbers.length > 1
                && family.oneEmptyPinAcceptsMultipleCompatibleFullPins
                && family.exactOwnerValidationRequiredForEveryMember
            )),
        everyCollapsedComponentKeepsItsPlanes:
            lessonDiscovery.collapsedComponents.every(component => (
                component.collapsePreservesEveryLessonPlane
                && component.exactOwnerValidationRequiredAtEveryStep
                && component.grammarAuthority === false
            )),
        grammarAuthority: lessonDiscovery.grammarAuthority,
    }, {
        candidateEdgesExist: true,
        directRhymeEdgesExist: true,
        familiesExist: true,
        collapsedComponentsExist: true,
        compressedGraphExists: true,
        everyEdgeAutomatic: true,
        everyEdgeKeepsOwnerAuthority: true,
        everyFamilyHasSeveralFullPins: true,
        everyCollapsedComponentKeepsItsPlanes: true,
        grammarAuthority: false,
    });

    const discoveredEdge = (innerLessonNumber, outerLessonNumber) => (
        lessonDiscovery.directRhymeEdges.find(edge => (
            edge.innerLessonNumber === innerLessonNumber
            && edge.outerLessonNumber === outerLessonNumber
        ))
    );
    const discoveredPath = lessonNumbers => lessonNumbers
        .slice(1)
        .every((outerLessonNumber, index) => Boolean(discoveredEdge(
            lessonNumbers[index],
            outerLessonNumber
        )));
    s.eq("accepted examples reappear afterward as checks of the general discovery", {
        causativeToFrequentative:
            discoveredEdge(24, 27)?.sharedUnitKinds,
        compoundNncToDenominal:
            discoveredEdge(31, 54)?.sharedUnitKinds,
        frequentativeToDeverbal37:
            discoveredEdge(27, 37)?.sharedUnitKinds,
        frequentativeToDeverbal38:
            discoveredEdge(27, 38)?.sharedUnitKinds,
        frequentativeToDeverbal39:
            discoveredEdge(27, 39)?.sharedUnitKinds,
        compoundDenominalFrequentative37:
            discoveredPath([31, 54, 27, 37]),
        compoundDenominalFrequentative38:
            discoveredPath([31, 54, 27, 38]),
        compoundDenominalFrequentative39:
            discoveredPath([31, 54, 27, 39]),
        l27FamilyContainsMoreThanNamedExamples:
            lessonDiscovery.superpositionFamilies
                .find(family => family.familyId === "vnc-result→L27")
                ?.innerLessonNumbers.length > 2,
        l54FamilyContainsMoreThanNamedExamples:
            lessonDiscovery.superpositionFamilies
                .find(family => family.familyId === "nnc-result→L54")
                ?.innerLessonNumbers.length > 2,
    }, {
        causativeToFrequentative: ["vnc-result"],
        compoundNncToDenominal: ["nnc-result"],
        frequentativeToDeverbal37: ["vnc-result"],
        frequentativeToDeverbal38: ["vnc-result"],
        frequentativeToDeverbal39: ["vnc-result"],
        compoundDenominalFrequentative37: true,
        compoundDenominalFrequentative38: true,
        compoundDenominalFrequentative39: true,
        l27FamilyContainsMoreThanNamedExamples: true,
        l54FamilyContainsMoreThanNamedExamples: true,
    });

    s.eq("the general topology independently rediscovers the Lesson 27 and Lessons 37–39 inside-out seam", {
        frequentativeEmits:
            frequentativePlane.compatibilitySignature.emittedUnitKinds,
        deverbalRequires:
            deverbalPlane.compatibilitySignature.requiredUnitKinds,
        deverbalEmits:
            deverbalPlane.compatibilitySignature.emittedUnitKinds,
        sharedUnitKinds: frequentativeDeverbalEdge?.sharedUnitKinds,
        compatibilityStatus:
            frequentativeDeverbalEdge?.compatibilityStatus,
        noAbsenceConflict:
            frequentativeDeverbalEdge?.absenceConflicts.length === 0,
        exactOwnerStillRequired:
            frequentativeDeverbalEdge?.exactOwnerValidationRequired,
        localHistoryDistinct:
            frequentativeDeverbalEdge?.localHistoriesRemainDistinct,
        inverseNncToVncAlsoDiscovered:
            denominalEdge?.sharedUnitKinds,
        lessonNumberInNeitherSignature:
            frequentativePlane.compatibilitySignature
                .lessonNumberAuthority === false
            && deverbalPlane.compatibilitySignature
                .lessonNumberAuthority === false,
    }, {
        frequentativeEmits: ["vnc-result"],
        deverbalRequires: ["vnc-result", "nnc-result"],
        deverbalEmits: ["nnc-result"],
        sharedUnitKinds: ["vnc-result"],
        compatibilityStatus:
            "typed-boundary-aligned-owner-proof-required",
        noAbsenceConflict: true,
        exactOwnerStillRequired: true,
        localHistoryDistinct: true,
        inverseNncToVncAlsoDiscovered: ["nnc-result"],
        lessonNumberInNeitherSignature: true,
    });
    s.eq("an exact owner-issued Result receives one reusable full pin", {
        receipt: receipt.authorizationStatus,
        complete: receiptPin?.coordinateCompleteness,
        samePinIdentity: receiptPin === resultPin,
        canonicalResultIdentity:
            receiptPin?.canonicalResult === receipt.canonicalResult,
        operationRetainedLocally:
            receiptPin?.localOperationId,
        operationDoesNotAuthorizeEquivalence:
            receiptPin
                ?.localOperationDoesNotAuthorizeCoordinateEquivalence,
        lessonAuthority: receiptPin?.lessonNumberAuthority,
        grammarAuthority: receiptPin?.grammarAuthority,
        captureCarriesSamePin:
            capture.rhymeFullPinFrame === receiptPin,
        calibrationStatus: calibration?.calibrationStatus,
        forwardCalibration: calibration?.forwardCalibration?.status,
        backwardCalibration: calibration?.backwardCalibration?.status,
        exactReturnPath:
            calibration?.applicationResult === receipt
            && calibration?.canonicalResult === receipt.canonicalResult,
        captureCarriesSameCalibration:
            capture.rhymeCalibrationFrame === calibration,
        captureRemainsExact:
            ctx.isClassicalGrammarApplicationResultCapture(
                capture,
                "rhyme-source"
            ),
        copiedReceiptRejected: copiedReceiptPin === null,
        copiedResultRejected: copiedResultPin === null,
    }, {
        receipt: "authorized",
        complete: "complete",
        samePinIdentity: true,
        canonicalResultIdentity: true,
        operationRetainedLocally: "orthography:transcription",
        operationDoesNotAuthorizeEquivalence: true,
        lessonAuthority: false,
        grammarAuthority: false,
        captureCarriesSamePin: true,
        calibrationStatus: "calibrated",
        forwardCalibration: "calibrated",
        backwardCalibration: "calibrated",
        exactReturnPath: true,
        captureCarriesSameCalibration: true,
        captureRemainsExact: true,
        copiedReceiptRejected: true,
        copiedResultRejected: true,
    });

    const spellingRequest = {
        phoneme: "/s/",
        syllablePosition: "initial",
        followingVowel: "a",
    };
    const rotatedSpellingRequest = {
        ...spellingRequest,
        followingVowel: "e",
    };
    const spelling = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "phonology:spelling-change",
        args: [spellingRequest],
    });
    const rotatedSpelling = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "phonology:spelling-change",
        args: [rotatedSpellingRequest],
    });
    const blockedSpelling = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "phonology:spelling-change",
        args: [{
            ...spellingRequest,
            requestedSpelling: "c",
        }],
    });
    const spellingCalibration =
        ctx.getClassicalGrammarApplicationRhymeCalibration(spelling);
    const rotatedCalibration =
        ctx.getClassicalGrammarApplicationRhymeCalibration(rotatedSpelling);
    s.eq("empty and full pins calibrate forward, backward, and sideways without erasing exact Sources", {
        apiInstalled:
            typeof ctx.getClassicalGrammarApplicationRhymeCalibration,
        firstStatus: spelling.authorizationStatus,
        secondStatus: rotatedSpelling.authorizationStatus,
        firstWritten: spelling.canonicalResult?.outputSpelling,
        secondWritten: rotatedSpelling.canonicalResult?.outputSpelling,
        sameEmptyCoordinate:
            JSON.stringify(spellingCalibration?.emptyPin)
                === JSON.stringify(rotatedCalibration?.emptyPin),
        differentExactResults:
            spelling.canonicalResult !== rotatedSpelling.canonicalResult,
        firstSourceIdentity:
            spellingCalibration?.exactTypedArguments?.[0]
                === spellingRequest,
        secondSourceIdentity:
            rotatedCalibration?.exactTypedArguments?.[0]
                === rotatedSpellingRequest,
        backwardFromResult:
            ctx.getClassicalGrammarApplicationRhymeCalibration(
                spelling.canonicalResult
            ) === spellingCalibration,
        sidewaysStatus: spellingCalibration?.sidewaysCalibration?.status,
        sharedCoordinates:
            spellingCalibration?.sidewaysCalibration?.alignedAxisIds,
        localFullness: spellingCalibration?.localFullnessComplete,
        continuationalFullness:
            spellingCalibration?.continuationalFullnessAvailable,
        lessonAuthority: spellingCalibration?.lessonNumberAuthority,
        exampleAuthority: spellingCalibration?.exampleIdentityAuthority,
        copiedReceiptRejected:
            ctx.getClassicalGrammarApplicationRhymeCalibration({
                ...spelling,
            }) === null,
        copiedResultRejected:
            ctx.getClassicalGrammarApplicationRhymeCalibration({
                ...spelling.canonicalResult,
            }) === null,
        blockedResultCannotCalibrate:
            blockedSpelling.authorizationStatus === "blocked"
            && ctx.getClassicalGrammarApplicationRhymeCalibration(
                blockedSpelling
            ) === null,
    }, {
        apiInstalled: "function",
        firstStatus: "authorized",
        secondStatus: "authorized",
        firstWritten: "z",
        secondWritten: "c",
        sameEmptyCoordinate: true,
        differentExactResults: true,
        firstSourceIdentity: true,
        secondSourceIdentity: true,
        backwardFromResult: true,
        sidewaysStatus: "aligned",
        sharedCoordinates: [
            "phonological-environment",
            "source-segment",
            "written-result",
        ],
        localFullness: true,
        continuationalFullness: true,
        lessonAuthority: false,
        exampleAuthority: false,
        copiedReceiptRejected: true,
        copiedResultRejected: true,
        blockedResultCannotCalibrate: true,
    });

    return s;
}

module.exports = { run };
