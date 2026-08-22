"use strict";

const fs = require("fs");
const path = require("path");

function text(value) {
    return String(value == null ? "" : value).trim();
}

function proofReferences(record = {}) {
    return [...new Set(Object.entries(record)
        .filter(([key, value]) => /Test$/u.test(key) && text(value))
        .map(([, value]) => text(value).split("#")[0])
        .filter(Boolean))];
}

function acceptedProofRecords(ledger = null) {
    const records = Array.isArray(ledger?.records) ? ledger.records : [];
    if (ledger?.kind === "classical-nahuatl-lesson-atom-job-review") {
        return records.filter(record => (
            record.reviewStatus === "ACCEPTED"
            && record.implementationCredit === "EXACTLY_OBSERVED"
        ));
    }
    return records.filter(record => (
        /ACCEPTED|exactly-observed/u.test(
            text(record.acceptanceStatus),
        )
        || record.directionStatus?.WRITING === "EXACTLY_OBSERVED"
        || record.writingImplementationStatus
            === "EXACTLY_OBSERVED_NORMAL_APPLICATION_BEHAVIOR"
    ));
}

function lessonLedgerPath(rootDir, lessonNumber) {
    const progress = path.join(rootDir, "docs", "canvas-progress");
    const review = path.join(
        progress,
        `lesson${lessonNumber}-review-ledger.json`,
    );
    if (fs.existsSync(review)) return review;
    const jobs = path.join(
        progress,
        `lesson${lessonNumber}-job-ledger.json`,
    );
    return fs.existsSync(jobs) ? jobs : "";
}

function operationEvidenceTokens(operation = {}) {
    return [...new Set([
        operation.capabilityName,
        ...(operation.outputCapabilities || []).flatMap(output => [
            output.installedCapabilityName,
            ...(output.validatorNames || []),
        ]),
    ].map(text).filter(Boolean))];
}

function operationIdCallEvidenceToken(operationId = "", proofSource = "") {
    const normalizedOperationId = text(operationId);
    if (!normalizedOperationId) return "";
    const escapedOperationId = normalizedOperationId.replace(
        /[.*+?^${}()|[\]\\]/gu,
        "\\$&"
    );
    const operationPropertyPattern = new RegExp(
        `operationId\\s*:\\s*["']${escapedOperationId}["']`,
        "u"
    );
    return operationPropertyPattern.test(proofSource)
        ? `operationId:${normalizedOperationId}`
        : "";
}

function collectClassicalLessonRhymeOwnerEvidence({
    rootDir,
    inventory,
} = {}) {
    const lessonNumbers = inventory?.grammaticalRhymeCalibration
        ?.lessonDiscovery?.lessonNumbers || [];
    return Object.freeze(lessonNumbers.map(lessonNumber => {
        const ledgerPath = lessonLedgerPath(rootDir, lessonNumber);
        const ledger = ledgerPath
            ? JSON.parse(fs.readFileSync(ledgerPath, "utf8"))
            : null;
        const proofRecords = acceptedProofRecords(ledger);
        const proofFiles = [...new Set(proofRecords.flatMap(
            proofReferences,
        ))].filter(relativePath => fs.existsSync(path.join(
            rootDir,
            relativePath,
        )));
        const proofSource = proofFiles.map(relativePath => (
            fs.readFileSync(path.join(rootDir, relativePath), "utf8")
        )).join("\n");
        const operationEvidence = (inventory?.operations || [])
            .map(operation => {
                const matchingTokens = [...new Set([
                    ...operationEvidenceTokens(operation)
                        .filter(token => proofSource.includes(token)),
                    operationIdCallEvidenceToken(
                        operation.operationId,
                        proofSource
                    ),
                ].filter(Boolean))];
                return matchingTokens.length
                    ? Object.freeze({
                        operationId: operation.operationId,
                        matchingTokens: Object.freeze(matchingTokens),
                    })
                    : null;
            })
            .filter(Boolean);
        return Object.freeze({
            kind: "classical-grammatical-rhyme-lesson-owner-evidence",
            version: 1,
            lessonNumber,
            ledgerPath: ledgerPath
                ? path.relative(rootDir, ledgerPath)
                : "",
            ledgerKind: text(ledger?.kind),
            acceptedImplementationEvidencePresent:
                proofRecords.length > 0,
            acceptedProofRecordCount: proofRecords.length,
            proofFiles: Object.freeze(proofFiles),
            operationIds: Object.freeze(operationEvidence.map(
                evidence => evidence.operationId,
            )),
            operationEvidence: Object.freeze(operationEvidence),
            evidenceWasDerivedFromAcceptedProofFiles: true,
            lessonNumberAuthority: false,
            grammarAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        });
    }));
}

module.exports = {
    collectClassicalLessonRhymeOwnerEvidence,
};
