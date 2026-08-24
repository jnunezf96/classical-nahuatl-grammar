#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const DEVELOPMENT_ROOT = path.dirname(path.dirname(SCRIPT_PATH));
const CLASSICAL_ROOT = path.dirname(DEVELOPMENT_ROOT);
const DEFAULT_WEB_ROOT = path.join(
  CLASSICAL_ROOT,
  "Classical_Nahuatl_Grammar_Web",
);
const DEFAULT_OUTPUT_RELATIVE_PATH =
  "data/classical_grammatical_atlas_population.mjs";
const DEFAULT_VERSION_OUTPUT_RELATIVE_PATH =
  "data/classical_grammatical_atlas_population_version.mjs";
const PUBLICATION_LOCK_RELATIVE_PATH =
  "data/.classical_grammatical_atlas_publication.lock";
const PUBLICATION_JOURNAL_RELATIVE_PATH =
  "data/.classical_grammatical_atlas_publication.journal.json";
const FIRST_LESSON = 1;
const MAXIMUM_LESSON = 58;
const POPULATION_KIND = "classical-grammatical-atlas-population";
const POPULATION_VERSION_KIND =
  "classical-grammatical-atlas-population-version";
const PUBLICATION_JOURNAL_KIND =
  "classical-grammatical-atlas-publication-journal";
const PUBLICATION_JOURNAL_SCHEMA_VERSION = 1;

function parseArguments(argv) {
  const options = {
    mode: "check",
    selfTest: false,
    webRoot: DEFAULT_WEB_ROOT,
    outputPath: "",
    versionOutputPath: "",
    lessonLedgerOverrides: new Map(),
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--write") options.mode = "write";
    else if (argument === "--check") options.mode = "check";
    else if (argument === "--self-test") options.selfTest = true;
    else if (argument === "--web-root") {
      options.webRoot = path.resolve(argv[index + 1] || "");
      index += 1;
    } else if (argument === "--output") {
      options.outputPath = path.resolve(argv[index + 1] || "");
      index += 1;
    } else if (argument === "--version-output") {
      options.versionOutputPath = path.resolve(argv[index + 1] || "");
      index += 1;
    } else if (argument === "--lesson-ledger-override") {
      const lessonArgument = argv[index + 1];
      const pathArgument = argv[index + 2];
      const lessonNumber = Number(lessonArgument);
      if (!Number.isInteger(lessonNumber)
        || lessonNumber < FIRST_LESSON
        || lessonNumber > MAXIMUM_LESSON
        || !pathArgument) {
        throw new Error(
          "--lesson-ledger-override needs a Lesson 1-58 number and a file path",
        );
      }
      const overridePath = path.resolve(pathArgument);
      if (options.lessonLedgerOverrides.has(lessonNumber)) {
        throw new Error(`duplicate Lesson ${lessonNumber} ledger override`);
      }
      options.lessonLedgerOverrides.set(lessonNumber, overridePath);
      index += 2;
    } else if (argument === "--help" || argument === "-h") {
      process.stdout.write([
        "Build the compact, non-authorizing population for every available Lesson 1-58 ledger.",
        "",
        "Usage:",
        "  node scripts/build_classical_grammatical_atlas_population.mjs --write",
        "  node scripts/build_classical_grammatical_atlas_population.mjs --check",
        "  node scripts/build_classical_grammatical_atlas_population.mjs --self-test",
        "  --version-output PATH writes/checks the matching version module",
        "  --lesson-ledger-override LESSON PATH stages one unpublished ledger",
        "",
      ].join("\n"));
      process.exit(0);
    } else {
      throw new Error(`unknown argument: ${argument}`);
    }
  }
  options.outputPath = options.outputPath || path.join(
    options.webRoot,
    DEFAULT_OUTPUT_RELATIVE_PATH,
  );
  options.versionOutputPath = options.versionOutputPath || (
    path.resolve(options.outputPath)
      === path.resolve(options.webRoot, DEFAULT_OUTPUT_RELATIVE_PATH)
      ? path.join(options.webRoot, DEFAULT_VERSION_OUTPUT_RELATIVE_PATH)
      : path.join(
        path.dirname(options.outputPath),
        `${path.basename(options.outputPath, path.extname(options.outputPath))}_version.mjs`,
      )
  );
  return options;
}

function text(value) {
  return String(value == null ? "" : value).trim();
}

function readBuffer(filePath) {
  return fs.readFileSync(filePath);
}

function readJson(filePath) {
  return JSON.parse(readBuffer(filePath).toString("utf8"));
}

function sha256(value) {
  return `sha256:${crypto.createHash("sha256").update(value).digest("hex")}`;
}

function sortedUnique(values) {
  return [...new Set(values.map(text).filter(Boolean))]
    .sort((left, right) => left.localeCompare(right));
}

function lessonLedgerRelativePath(lessonNumber) {
  return `docs/canvas-progress/lesson${lessonNumber}-${
    lessonNumber < 3 ? "job" : "review"
  }-ledger.json`;
}

function populatedLessonNumbers(webRoot, lessonLedgerOverrides = new Map()) {
  return Object.freeze(Array.from(
    { length: MAXIMUM_LESSON - FIRST_LESSON + 1 },
    (_, index) => index + FIRST_LESSON,
  ).filter(lessonNumber => (
    lessonLedgerOverrides.has(lessonNumber)
    || fs.existsSync(path.join(
      webRoot,
      lessonLedgerRelativePath(lessonNumber),
    ))
  )));
}

function acceptedRecord(ledger, record) {
  if (ledger.kind === "classical-nahuatl-lesson-atom-job-review") {
    return record.reviewStatus === "ACCEPTED"
      && record.implementationCredit === "EXACTLY_OBSERVED";
  }
  return /ACCEPTED|exactly-observed/iu.test(text(record.acceptanceStatus))
    || record.directionStatus?.WRITING === "EXACTLY_OBSERVED"
    || record.writingImplementationStatus
      === "EXACTLY_OBSERVED_NORMAL_APPLICATION_BEHAVIOR";
}

function recordDirection(record) {
  return text(record.proposedDirection || record.directionClass);
}

function recordGroupId(record) {
  return text(record.reviewGroupId || record.jobFamily);
}

function writingProofCoordinates(record) {
  return Object.freeze(sortedUnique(Object.entries(record)
    .filter(([key, value]) => [
      "observationTest",
      "mutationTest",
      "writingObservationTest",
      "writingMutationTest",
    ].includes(key) && text(value))
    .map(([, value]) => text(value))).map(reference => {
      const separator = reference.indexOf("#");
      return Object.freeze({
        reference,
        path: separator < 0 ? reference : reference.slice(0, separator),
        anchor: separator < 0 ? "" : reference.slice(separator + 1),
      });
    }));
}

function explicitApplicationOperationIds(record) {
  const value = record.canonicalApplicationOperationIds
    || record.ownerApplicationOperationIds
    || [];
  return sortedUnique(Array.isArray(value) ? value : [value]);
}

function safeProofPath(webRoot, relativePath) {
  const normalized = path.normalize(text(relativePath));
  if (!normalized || path.isAbsolute(normalized) || normalized.startsWith("..")) {
    return "";
  }
  const resolved = path.resolve(webRoot, normalized);
  const relative = path.relative(webRoot, resolved);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative)
    ? resolved
    : "";
}

function operationEvidenceTokens(operation = {}) {
  return sortedUnique([
    operation.capabilityName,
    ...(operation.outputCapabilities || []).flatMap(output => [
      output.installedCapabilityName,
      ...(output.validatorNames || []),
    ]),
  ]);
}

function explicitOperationIdPresent(operationId, source) {
  const escaped = text(operationId).replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  return new RegExp(
    `operationId\\s*:\\s*["']${escaped}["']`,
    "u",
  ).test(source);
}

function operationIdsInProofSource(source, operations) {
  return operations.filter(operation => (
    operationEvidenceTokens(operation).some(token => source.includes(token))
    || explicitOperationIdPresent(operation.operationId, source)
  )).map(operation => operation.operationId);
}

function strongOperationEvidenceTokens(operation = {}) {
  return sortedUnique([
    operation.operationId,
    operation.capabilityName,
    ...(operation.outputCapabilities || []).flatMap(output => [
      output.installedCapabilityName,
    ]),
  ]);
}

async function loadSemanticOwnerSpec(webRoot, reference, cache) {
  const normalizedReference = text(reference);
  if (!normalizedReference || !/\.(?:mjs|js)$/u.test(normalizedReference)) {
    return null;
  }
  const specPath = safeProofPath(webRoot, normalizedReference);
  if (!specPath || !fs.existsSync(specPath)) return null;
  if (cache.has(specPath)) return cache.get(specPath);
  const imported = await import(pathToFileURL(specPath).href);
  const spec = imported.default
    || imported.spec
    || Object.values(imported).find(value => (
      value && typeof value === "object" && !Array.isArray(value)
    ))
    || null;
  cache.set(specPath, spec);
  return spec;
}

function applicationOperationsForOwnerSpec(spec, operations) {
  if (!spec || typeof spec !== "object") return [];
  const tokens = sortedUnique([
    spec.operationId,
    spec.executionFunctionName,
    spec.capabilityName,
  ]);
  if (!tokens.length) return [];
  return operations.filter(operation => (
    strongOperationEvidenceTokens(operation).some(token => (
      tokens.includes(token)
    ))
  )).map(operation => operation.operationId);
}

function dictionary(values, { includeEmpty = false } = {}) {
  const entries = sortedUnique(values);
  return includeEmpty ? ["", ...entries] : entries;
}

function dictionaryIndex(entries) {
  return new Map(entries.map((entry, index) => [entry, index]));
}

function setTable(sets, itemIndex) {
  const normalizedSets = sets.map(set => [...new Set(set)]
    .map(item => itemIndex.get(item))
    .filter(Number.isInteger)
    .sort((left, right) => left - right));
  const uniqueKeys = sortedUnique(normalizedSets
    .filter(set => set.length)
    .map(set => set.join(",")));
  const entries = [[], ...uniqueKeys.map(key => key.split(",").map(Number))];
  const index = new Map(entries.map((entry, entryIndex) => [
    entry.join(","),
    entryIndex,
  ]));
  return {
    entries,
    indices: normalizedSets.map(set => index.get(set.join(",")) || 0),
  };
}

function tupleFieldIndex(codebook) {
  return Object.fromEntries(codebook.map((field, index) => [field, index]));
}

function normalizedInventoryProjection(inventory) {
  return inventory.operations.map(operation => {
    const signature = operation.rhymeRoutePlaneFrame.compatibilitySignature;
    return [
      operation.operationId,
      operation.capabilityName,
      operation.outputCapabilities.map(output => [
        output.outputKind,
        output.installedCapabilityName,
        output.validatorNames,
      ]),
      operation.axisIds,
      [
        signature.requiresPresent,
        signature.requiresAbsent,
        signature.adds,
        signature.removes,
        signature.preserves,
        signature.emits,
      ],
    ];
  });
}

async function loadCanonicalInventory(webRoot) {
  const applicationPath = path.join(
    webRoot,
    "src/application/classical/grammar_application.mjs",
  );
  const module = await import(pathToFileURL(applicationPath).href);
  const api = module.createClassicalGrammarApplicationApi(globalThis);
  return api.getClassicalGrammarApplicationInventory();
}

function validateAxisDispositions(axisDispositions, inventory) {
  const operationIds = new Set(inventory.operationIds);
  const inventoryAxes = new Set(inventory.operations.flatMap(
    operation => operation.axisIds,
  ));
  if (axisDispositions.kind
    !== "classical-application-axis-surface-disposition-ledger") {
    throw new Error("unexpected application axis disposition kind");
  }
  if (axisDispositions.counts.operationCount !== inventory.operationIds.length) {
    throw new Error("application operation count differs from axis dispositions");
  }
  if (axisDispositions.counts.uniqueAxisCount !== inventoryAxes.size) {
    throw new Error("application axis count differs from axis dispositions");
  }
  axisDispositions.entries.forEach(entry => {
    if (!operationIds.has(entry.operationId)) {
      throw new Error(`unknown disposition operation: ${entry.operationId}`);
    }
    if (!inventoryAxes.has(entry.axisId)) {
      throw new Error(`unknown disposition axis: ${entry.axisId}`);
    }
  });
}

async function buildPopulation(webRoot, lessonLedgerOverrides = new Map()) {
  const atomLedgerPath = path.join(webRoot, "docs/ANDREWS_ATOM_LEDGER.json");
  const axisDispositionPath = path.join(
    webRoot,
    "docs/CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json",
  );
  const rhymeMapPath = path.join(
    webRoot,
    "src/core/grammar/classical_lessons_1_58_rhyme_map.mjs",
  );
  const atomLedgerBuffer = readBuffer(atomLedgerPath);
  const axisDispositionBuffer = readBuffer(axisDispositionPath);
  const rhymeMapBuffer = readBuffer(rhymeMapPath);
  const atomLedger = JSON.parse(atomLedgerBuffer.toString("utf8"));
  const axisDispositions = JSON.parse(axisDispositionBuffer.toString("utf8"));
  const inventory = await loadCanonicalInventory(webRoot);
  validateAxisDispositions(axisDispositions, inventory);

  const lessonPlanes = inventory.grammaticalRhymeCalibration
    .lessonDiscovery.lessonPlanes;
  const lessonPlaneIndexByNumber = new Map(lessonPlanes.map(
    (plane, index) => [plane.lessonNumber, index],
  ));
  if (lessonPlanes.length !== 58 || lessonPlaneIndexByNumber.size !== 58) {
    throw new Error("the canonical lesson rhyme map must contain 58 unique planes");
  }
  const populatedLessons = populatedLessonNumbers(
    webRoot,
    lessonLedgerOverrides,
  );
  if (!populatedLessons.length || populatedLessons[0] !== FIRST_LESSON) {
    throw new Error("the Atlas population requires at least the Lesson 1 ledger");
  }

  const atomFields = tupleFieldIndex(atomLedger.codebook.atomTuple);
  const atomById = new Map(atomLedger.atoms.map(atom => [
    atom[atomFields.atomId],
    atom,
  ]));
  if (atomById.size !== atomLedger.atoms.length) {
    throw new Error("the authoritative atom ledger contains duplicate atom IDs");
  }

  const dispositionByAtomId = new Map(axisDispositions.entries.map(entry => [
    entry.atomId,
    entry,
  ]));
  const proofOperationCache = new Map();
  const proofFilesSeen = new Set();
  const proofFileDigests = new Map();
  const missingProofFiles = new Set();
  const semanticOwnerSpecCache = new Map();
  const semanticOwnerSpecDigests = new Map();
  const lessonLedgerDigests = [];
  const rawAtoms = [];
  const rawGroups = new Map();
  const seenLessonAtomIds = new Set();

  for (const lessonNumber of populatedLessons) {
    const ledgerRelativePath = lessonLedgerRelativePath(lessonNumber);
    const ledgerPath = lessonLedgerOverrides.get(lessonNumber)
      || path.join(webRoot, ledgerRelativePath);
    const ledgerBuffer = readBuffer(ledgerPath);
    const ledger = JSON.parse(ledgerBuffer.toString("utf8"));
    lessonLedgerDigests.push([
      lessonNumber,
      ledgerRelativePath,
      sha256(ledgerBuffer),
    ]);
    const expectedRecordCount = Number(
      ledger.counts?.lesson1Atoms
      || ledger.counts?.lesson2Atoms
      || ledger.counts?.atoms,
    );
    if (!Number.isInteger(expectedRecordCount)
      || expectedRecordCount !== ledger.records?.length) {
      throw new Error(`Lesson ${lessonNumber} record count is inconsistent`);
    }
    const authoritativeLessonAtomIds = new Set(atomLedger.atoms
      .filter(atom => new RegExp(`^§${lessonNumber}(?:\\.|$)`, "u").test(
        text(atom[atomFields.canvasSection]),
      ))
      .map(atom => text(atom[atomFields.atomId])));
    const ledgerLessonAtomIds = new Set(ledger.records.map(
      record => text(record.atomId),
    ));
    const missingLessonAtomIds = [...authoritativeLessonAtomIds].filter(
      atomId => !ledgerLessonAtomIds.has(atomId),
    );
    const extraLessonAtomIds = [...ledgerLessonAtomIds].filter(
      atomId => !authoritativeLessonAtomIds.has(atomId),
    );
    if (
      authoritativeLessonAtomIds.size !== ledgerLessonAtomIds.size
      || missingLessonAtomIds.length
      || extraLessonAtomIds.length
    ) {
      throw new Error([
        `Lesson ${lessonNumber} ledger is not an exact authoritative atom partition`,
        `missing=${missingLessonAtomIds.join(",")}`,
        `extra=${extraLessonAtomIds.join(",")}`,
      ].join("; "));
    }
    for (const record of ledger.records) {
      const atomId = text(record.atomId);
      if (!atomId || seenLessonAtomIds.has(atomId)) {
        throw new Error(`duplicate or empty lesson atom ID: ${atomId}`);
      }
      seenLessonAtomIds.add(atomId);
      const atom = atomById.get(atomId);
      if (!atom) {
        throw new Error(`Lesson ${lessonNumber} atom is absent from atom ledger: ${atomId}`);
      }
      const groupId = recordGroupId(record);
      if (!groupId) {
        throw new Error(`Lesson ${lessonNumber} atom has no local group: ${atomId}`);
      }
      const groupKey = `${lessonNumber}\u0000${groupId}`;
      rawGroups.set(groupKey, {
        lessonNumber,
        groupId,
      });
      const direction = recordDirection(record);
      if (!["BOTH", "READING_ONLY"].includes(direction)) {
        throw new Error(`unsupported atom direction ${direction}: ${atomId}`);
      }
      const active = acceptedRecord(ledger, record);
      const proofCoordinates = active && direction === "BOTH"
        ? writingProofCoordinates(record)
        : [];
      if (active && direction === "BOTH" && !proofCoordinates.length) {
        throw new Error(`accepted writing atom has no proof reference: ${atomId}`);
      }
      const proofFileCandidateOperationIds = new Set();
      for (const proofCoordinate of proofCoordinates) {
        const proofReference = proofCoordinate.path;
        const proofPath = safeProofPath(webRoot, proofReference);
        if (!proofPath || !fs.existsSync(proofPath)) {
          missingProofFiles.add(proofReference);
          continue;
        }
        proofFilesSeen.add(proofReference);
        if (!proofOperationCache.has(proofReference)) {
          const proofBuffer = readBuffer(proofPath);
          const proofSource = proofBuffer.toString("utf8");
          proofFileDigests.set(proofReference, sha256(proofBuffer));
          proofOperationCache.set(
            proofReference,
            operationIdsInProofSource(proofSource, inventory.operations),
          );
        }
        proofOperationCache.get(proofReference).forEach(
          operationId => proofFileCandidateOperationIds.add(operationId),
        );
      }
      const directAxisAtomIds = atom[atomFields.applicationAxisIds] || [];
      directAxisAtomIds.forEach(axisAtomId => {
        if (!dispositionByAtomId.has(axisAtomId)) {
          throw new Error(`unknown direct application axis: ${axisAtomId}`);
        }
      });
      const semanticOwnerReference = text(
        atom[atomFields.semanticOwnerReference],
      );
      const ownerSpec = await loadSemanticOwnerSpec(
        webRoot,
        semanticOwnerReference,
        semanticOwnerSpecCache,
      );
      if (ownerSpec && semanticOwnerReference
        && !semanticOwnerSpecDigests.has(semanticOwnerReference)) {
        const ownerSpecPath = safeProofPath(webRoot, semanticOwnerReference);
        if (ownerSpecPath) {
          semanticOwnerSpecDigests.set(
            semanticOwnerReference,
            sha256(readBuffer(ownerSpecPath)),
          );
        }
      }
      const semanticOwnerOperationId = text(ownerSpec?.operationId);
      const ownerApplicationOperationIds = applicationOperationsForOwnerSpec(
        ownerSpec,
        inventory.operations,
      );
      const explicitOperationIds = explicitApplicationOperationIds(record);
      explicitOperationIds.forEach(operationId => {
        if (!inventory.operationIds.includes(operationId)) {
          throw new Error(
            `unknown explicit application operation ${operationId}: ${atomId}`,
          );
        }
      });
      const exactOperationEvidence = new Map();
      const addExactOperation = (operationId, evidenceKind) => {
        if (!operationId) return;
        const kinds = exactOperationEvidence.get(operationId) || new Set();
        kinds.add(evidenceKind);
        exactOperationEvidence.set(operationId, kinds);
      };
      if (active) {
        directAxisAtomIds.forEach(axisAtomId => addExactOperation(
          dispositionByAtomId.get(axisAtomId)?.operationId,
          "direct-application-axis",
        ));
      }
      if (active && direction === "BOTH") {
        explicitOperationIds.forEach(operationId => addExactOperation(
          operationId,
          "explicit-review-record",
        ));
        if (ownerApplicationOperationIds.length === 1) {
          addExactOperation(
            ownerApplicationOperationIds[0],
            "semantic-owner-route-match",
          );
        }
      }
      const evidenceDisposition = !active
        ? "review-pending"
        : direction === "READING_ONLY"
          ? "reading-only-no-application-operation-required"
          : exactOperationEvidence.size > 1
            ? "exact-multi-application-operation"
            : exactOperationEvidence.size === 1
              ? "exact-application-operation"
              : text(atom[atomFields.force]) !== "grammar-bearing"
                ? "non-grammar-evidence-no-application-route"
              : text(atom[atomFields.semanticOwnerId])
                ? "canonical-owner-only-no-application-route"
                : "accepted-writing-owner-link-pending";
      rawAtoms.push({
        atomId,
        lessonNumber,
        groupKey,
        semanticOwnerId: text(atom[atomFields.semanticOwnerId]),
        semanticOwnerOperationId,
        force: text(atom[atomFields.force]),
        projectRole: text(atom[atomFields.projectRole]),
        direction,
        status: active ? "ACTIVE" : "PENDING",
        proofFileCandidateOperationIds: [
          ...proofFileCandidateOperationIds,
        ],
        exactOperationEvidence,
        evidenceDisposition,
        directAxisAtomIds,
      });
    }
  }

  const groups = [...rawGroups.values()].sort((left, right) => (
    left.lessonNumber - right.lessonNumber
    || left.groupId.localeCompare(right.groupId)
  ));
  const groupKeys = groups.map(group => `${group.lessonNumber}\u0000${group.groupId}`);
  const groupIndex = dictionaryIndex(groupKeys);
  const semanticOwners = dictionary(
    rawAtoms.map(atom => atom.semanticOwnerId),
    { includeEmpty: true },
  );
  const semanticOwnerOperations = dictionary(
    rawAtoms.map(atom => atom.semanticOwnerOperationId),
    { includeEmpty: true },
  );
  const forces = dictionary(rawAtoms.map(atom => atom.force));
  const projectRoles = dictionary(rawAtoms.map(atom => atom.projectRole));
  const semanticOwnerIndex = dictionaryIndex(semanticOwners);
  const semanticOwnerOperationIndex = dictionaryIndex(
    semanticOwnerOperations,
  );
  const forceIndex = dictionaryIndex(forces);
  const projectRoleIndex = dictionaryIndex(projectRoles);
  const operations = [...inventory.operationIds];
  const operationIndex = dictionaryIndex(operations);

  const directAxisCoordinates = sortedUnique(rawAtoms.flatMap(
    atom => atom.directAxisAtomIds,
  )).map(axisAtomId => {
    const disposition = dispositionByAtomId.get(axisAtomId);
    return [
      axisAtomId,
      operationIndex.get(disposition.operationId),
      disposition.axisId,
    ];
  });
  const directAxisIndex = new Map(directAxisCoordinates.map(
    (coordinate, index) => [coordinate[0], index],
  ));
  const proofFileCandidateOperationSetTable = setTable(
    rawAtoms.map(atom => atom.proofFileCandidateOperationIds),
    operationIndex,
  );
  const directAxisSetTable = setTable(
    rawAtoms.map(atom => atom.directAxisAtomIds),
    directAxisIndex,
  );

  const directions = ["READING_ONLY", "BOTH"];
  const statuses = ["PENDING", "ACTIVE"];
  const evidenceDispositions = [
    "review-pending",
    "reading-only-no-application-operation-required",
    "exact-application-operation",
    "exact-multi-application-operation",
    "canonical-owner-only-no-application-route",
    "non-grammar-evidence-no-application-route",
    "accepted-writing-owner-link-pending",
  ];
  const operationEvidenceKinds = [
    "direct-application-axis",
    "explicit-review-record",
    "semantic-owner-route-match",
  ];
  const directionIndex = dictionaryIndex(directions);
  const statusIndex = dictionaryIndex(statuses);
  const evidenceDispositionIndex = dictionaryIndex(evidenceDispositions);
  const operationEvidenceKindIndex = dictionaryIndex(
    operationEvidenceKinds,
  );
  const atoms = rawAtoms.map((atom, index) => [
    atom.atomId,
    atom.lessonNumber,
    groupIndex.get(atom.groupKey),
    semanticOwnerIndex.get(atom.semanticOwnerId),
    forceIndex.get(atom.force),
    projectRoleIndex.get(atom.projectRole),
    directionIndex.get(atom.direction),
    statusIndex.get(atom.status),
    proofFileCandidateOperationSetTable.indices[index],
    directAxisSetTable.indices[index],
    semanticOwnerOperationIndex.get(atom.semanticOwnerOperationId),
    evidenceDispositionIndex.get(atom.evidenceDisposition),
  ]);
  const rawExactOperationLinks = rawAtoms.flatMap((atom, atomIndex) => (
    [...atom.exactOperationEvidence].map(([operationId, kinds]) => ({
      atomIndex,
      operationId,
      evidenceKinds: [...kinds],
    }))
  ));
  const operationEvidenceKindSetTable = setTable(
    rawExactOperationLinks.map(link => link.evidenceKinds),
    operationEvidenceKindIndex,
  );
  const exactOperationLinks = rawExactOperationLinks.map((link, index) => [
    link.atomIndex,
    operationIndex.get(link.operationId),
    operationEvidenceKindSetTable.indices[index],
  ]);

  const lessons = [];
  let atomStart = 0;
  for (const lessonNumber of populatedLessons) {
    const lessonAtoms = rawAtoms.filter(atom => atom.lessonNumber === lessonNumber);
    const activeCount = lessonAtoms.filter(atom => atom.status === "ACTIVE").length;
    lessons.push([
      lessonNumber,
      lessonPlaneIndexByNumber.get(lessonNumber),
      atomStart,
      lessonAtoms.length,
      activeCount,
      lessonAtoms.length - activeCount,
    ]);
    atomStart += lessonAtoms.length;
  }

  const grammarBearing = rawAtoms.filter(
    atom => atom.force === "grammar-bearing",
  );
  const activeAtoms = rawAtoms.filter(atom => atom.status === "ACTIVE");
  const bothAtoms = rawAtoms.filter(atom => atom.direction === "BOTH");
  const proofFileCandidateOperationLengths =
    proofFileCandidateOperationSetTable.indices.map(
      setIndex => proofFileCandidateOperationSetTable.entries[setIndex].length,
    );
  const exactOperationLinkCountByAtom = new Map();
  exactOperationLinks.forEach(link => {
    exactOperationLinkCountByAtom.set(
      link[0],
      Number(exactOperationLinkCountByAtom.get(link[0]) || 0) + 1,
    );
  });
  const exactOperationLinkLengths = rawAtoms.map((_, atomIndex) => (
    Number(exactOperationLinkCountByAtom.get(atomIndex) || 0)
  ));
  const operationSixFieldSignatures = inventory.operations.map(operation => {
    const signature = operation.rhymeRoutePlaneFrame.compatibilitySignature;
    return [
      signature.requiresPresent,
      signature.requiresAbsent,
      signature.adds,
      signature.removes,
      signature.preserves,
      signature.emits,
    ];
  });
  const directAxisLinkCount = directAxisSetTable.indices.reduce(
    (count, setIndex) => count + directAxisSetTable.entries[setIndex].length,
    0,
  );
  const inventoryProjection = normalizedInventoryProjection(inventory);
  const proofFileDigestEntries = [...proofFileDigests]
    .sort(([left], [right]) => left.localeCompare(right));
  const semanticOwnerSpecDigestEntries = [...semanticOwnerSpecDigests]
    .sort(([left], [right]) => left.localeCompare(right));
  if (missingProofFiles.size) {
    throw new Error([
      "accepted writing evidence references missing proof files",
      ...[...missingProofFiles].sort((left, right) => (
        left.localeCompare(right)
      )),
    ].join("\n- "));
  }
  const combinedDigestInput = JSON.stringify({
    atomLedger: sha256(atomLedgerBuffer),
    lessonLedgers: lessonLedgerDigests,
    lessonRhymeMap: sha256(rhymeMapBuffer),
    applicationInventory: sha256(JSON.stringify(inventoryProjection)),
    applicationAxisDispositions: sha256(axisDispositionBuffer),
    proofFiles: proofFileDigestEntries,
    semanticOwnerSpecs: semanticOwnerSpecDigestEntries,
  });

  const population = {
    schemaVersion: 2,
    kind: POPULATION_KIND,
    status: "generated-current",
    authority: {
      trackingAuthority: false,
      grammarAuthority: false,
      uiAuthority: false,
      lessonNumberAuthority: false,
      exampleIdentityAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      exactCanonicalOwnerStillRequired: true,
    },
    scope: {
      firstLesson: FIRST_LESSON,
      lastPopulatedLesson: populatedLessons.at(-1),
      maximumLesson: MAXIMUM_LESSON,
      populatedLessonNumbers: populatedLessons,
      coordinatePattern: "L{lessonNumber}/{groupId}/{atomId}",
      operationJoin: "operationId",
      lessonPlaneJoin: "lessonNumber",
      sixFieldOwner:
        "canonical application inventory rhymeRoutePlaneFrame.compatibilitySignature",
    },
    sourceDigests: {
      atomLedger: sha256(atomLedgerBuffer),
      lessonLedgers: lessonLedgerDigests,
      lessonRhymeMap: sha256(rhymeMapBuffer),
      applicationInventory: sha256(JSON.stringify(inventoryProjection)),
      applicationAxisDispositions: sha256(axisDispositionBuffer),
      proofFiles: proofFileDigestEntries,
      semanticOwnerSpecs: semanticOwnerSpecDigestEntries,
      combined: sha256(combinedDigestInput),
    },
    counts: {
      lessons: lessons.length,
      atoms: atoms.length,
      grammarBearing: grammarBearing.length,
      nonGrammar: atoms.length - grammarBearing.length,
      active: activeAtoms.length,
      pending: atoms.length - activeAtoms.length,
      activeGrammarBearing: grammarBearing.filter(atom => atom.status === "ACTIVE").length,
      pendingGrammarBearing: grammarBearing.filter(atom => atom.status === "PENDING").length,
      both: bothAtoms.length,
      readingOnly: atoms.length - bothAtoms.length,
      groups: groups.length,
      semanticOwners: semanticOwners.length - 1,
      semanticOwnerOperations: semanticOwnerOperations.length - 1,
      operations: operations.length,
      proofFileCandidateOperationSets:
        proofFileCandidateOperationSetTable.entries.length - 1,
      atomsWithProofFileCandidateOperations:
        proofFileCandidateOperationLengths.filter(Boolean).length,
      atomsWithSingleProofFileCandidateOperation:
        proofFileCandidateOperationLengths.filter(length => length === 1).length,
      atomsWithMultipleProofFileCandidateOperations:
        proofFileCandidateOperationLengths.filter(length => length > 1).length,
      exactOperationLinks: exactOperationLinks.length,
      atomsWithExactOperationLinks:
        exactOperationLinkLengths.filter(Boolean).length,
      atomsWithSingleExactOperationLink:
        exactOperationLinkLengths.filter(length => length === 1).length,
      atomsWithMultipleExactOperationLinks:
        exactOperationLinkLengths.filter(length => length > 1).length,
      acceptedWritingOwnerLinkPending: rawAtoms.filter(atom => (
        atom.evidenceDisposition === "accepted-writing-owner-link-pending"
      )).length,
      directAxisCoordinates: directAxisCoordinates.length,
      atomsWithDirectAxisEvidence:
        directAxisSetTable.indices.filter(Boolean).length,
      directAxisLinks: directAxisLinkCount,
      proofFilesRead: proofFilesSeen.size,
      missingProofFiles: missingProofFiles.size,
    },
    codebook: {
      lessonTuple: [
        "lessonNumber",
        "lessonPlaneIndex",
        "atomStart",
        "atomCount",
        "activeCount",
        "pendingCount",
      ],
      groupTuple: ["lessonNumber", "groupId"],
      atomTuple: [
        "atomId",
        "lessonNumber",
        "groupIndex",
        "semanticOwnerIndex",
        "forceIndex",
        "projectRoleIndex",
        "directionIndex",
        "statusIndex",
        "proofFileCandidateOperationSetIndex",
        "directAxisEvidenceSetIndex",
        "semanticOwnerOperationIndex",
        "evidenceDispositionIndex",
      ],
      operationSixFieldTuple: [
        "requiresPresent",
        "requiresAbsent",
        "adds",
        "removes",
        "preserves",
        "emits",
      ],
      exactOperationLinkTuple: [
        "atomIndex",
        "operationIndex",
        "operationEvidenceKindSetIndex",
      ],
      directAxisCoordinateTuple: [
        "applicationAxisAtomId",
        "operationIndex",
        "axisId",
      ],
      directions,
      statuses,
      evidenceDispositions,
      operationEvidenceKinds,
      forces,
      projectRoles,
    },
    lessons,
    groups: groups.map(group => [group.lessonNumber, group.groupId]),
    semanticOwners,
    semanticOwnerOperations,
    operations,
    operationSixFieldSignatures,
    proofFileCandidateOperationSets:
      proofFileCandidateOperationSetTable.entries,
    operationEvidenceKindSets: operationEvidenceKindSetTable.entries,
    exactOperationLinks,
    directAxisCoordinates,
    directAxisEvidenceSets: directAxisSetTable.entries,
    atoms,
  };

  validatePopulation(population, inventory, axisDispositions);
  return population;
}

function validatePopulation(population, inventory, axisDispositions) {
  if (population.kind !== POPULATION_KIND || population.schemaVersion !== 2) {
    throw new Error("unexpected Atlas population schema");
  }
  if (Object.entries(population.authority).some(([key, value]) => (
    key !== "exactCanonicalOwnerStillRequired" && value !== false
  )) || population.authority.exactCanonicalOwnerStillRequired !== true) {
    throw new Error("Atlas population authority boundary is invalid");
  }
  if (
    population.lessons.length
      !== population.scope.populatedLessonNumbers.length
  ) {
    throw new Error("Atlas population lesson count is invalid");
  }
  const atomIds = new Set();
  const operationIds = new Set(inventory.operationIds);
  const dispositionIds = new Set(axisDispositions.entries.map(entry => entry.atomId));
  let expectedStart = 0;
  population.lessons.forEach((lesson, index) => {
    const [lessonNumber, lessonPlaneIndex, atomStart, atomCount, active, pending] = lesson;
    if (lessonNumber !== population.scope.populatedLessonNumbers[index]
      || !Number.isInteger(lessonPlaneIndex)
      || atomStart !== expectedStart
      || active + pending !== atomCount) {
      throw new Error(`invalid Lesson ${lessonNumber} population slice`);
    }
    expectedStart += atomCount;
  });
  if (expectedStart !== population.atoms.length) {
    throw new Error("lesson slices do not cover the atom population");
  }
  population.atoms.forEach(atom => {
    if (atom.length !== population.codebook.atomTuple.length) {
      throw new Error(`invalid atom tuple length: ${atom[0]}`);
    }
    if (atomIds.has(atom[0])) throw new Error(`duplicate emitted atom: ${atom[0]}`);
    atomIds.add(atom[0]);
    const group = population.groups[atom[2]];
    if (!group || group[0] !== atom[1]) {
      throw new Error(`atom group leaves its lesson: ${atom[0]}`);
    }
    if (!population.semanticOwners[atom[3]]
      && population.semanticOwners[atom[3]] !== "") {
      throw new Error(`invalid semantic owner index: ${atom[0]}`);
    }
    if (!population.codebook.forces[atom[4]]
      || !population.codebook.projectRoles[atom[5]]
      || !population.codebook.directions[atom[6]]
      || !population.codebook.statuses[atom[7]]) {
      throw new Error(`invalid atom codebook index: ${atom[0]}`);
    }
    if (!population.proofFileCandidateOperationSets[atom[8]]
      || !population.directAxisEvidenceSets[atom[9]]) {
      throw new Error(`invalid atom evidence-set index: ${atom[0]}`);
    }
    if ((!population.semanticOwnerOperations[atom[10]]
      && population.semanticOwnerOperations[atom[10]] !== "")
      || !population.codebook.evidenceDispositions[atom[11]]) {
      throw new Error(`invalid atom owner/disposition index: ${atom[0]}`);
    }
  });
  population.proofFileCandidateOperationSets.flat().forEach(operationIndex => {
    if (!operationIds.has(population.operations[operationIndex])) {
      throw new Error(`invalid candidate operation index: ${operationIndex}`);
    }
  });
  population.exactOperationLinks.forEach(link => {
    const [atomIndex, operationIndex, evidenceKindSetIndex] = link;
    if (!population.atoms[atomIndex]
      || !operationIds.has(population.operations[operationIndex])
      || !population.operationEvidenceKindSets[evidenceKindSetIndex]?.length) {
      throw new Error(`invalid exact operation link: ${link.join(",")}`);
    }
  });
  if (population.operationSixFieldSignatures.length
      !== population.operations.length
    || population.operationSixFieldSignatures.some(signature => (
      !Array.isArray(signature)
      || signature.length !== population.codebook.operationSixFieldTuple.length
      || signature.some(field => !Array.isArray(field))
    ))) {
    throw new Error("invalid operation six-field coordinate table");
  }
  population.directAxisCoordinates.forEach(coordinate => {
    if (!dispositionIds.has(coordinate[0])
      || !operationIds.has(population.operations[coordinate[1]])) {
      throw new Error(`invalid direct-axis coordinate: ${coordinate[0]}`);
    }
  });
  if (population.counts.atoms !== population.atoms.length
    || population.counts.groups !== population.groups.length
    || population.counts.operations !== inventory.operationIds.length
    || population.counts.exactOperationLinks
      !== population.exactOperationLinks.length
    || population.counts.acceptedWritingOwnerLinkPending !== 0
    || population.counts.missingProofFiles !== 0) {
    throw new Error("Atlas population summary counts are inconsistent");
  }
  const serialized = JSON.stringify(population);
  for (const forbiddenKey of [
    "meaning",
    "formula",
    "surface",
    "expectedString",
    "exampleStem",
    "executableRule",
  ]) {
    if (serialized.includes(`\"${forbiddenKey}\":`)) {
      throw new Error(`forbidden runtime payload field: ${forbiddenKey}`);
    }
  }
  if (JSON.stringify(JSON.parse(serialized)) !== serialized) {
    throw new Error("Atlas population does not survive a JSON round trip");
  }
}

function populationPayloadDigest(population) {
  return sha256(JSON.stringify(population));
}

function serializedPopulation(population) {
  const payload = JSON.stringify(population);
  const payloadDigest = populationPayloadDigest(population);
  return [
    "// Generated by Classical_Nahuatl_Grammar_Web/scripts/",
    "// build_classical_grammatical_atlas_population.mjs. Do not edit by hand.",
    "function deepFreeze(value) {",
    "  if (!value || typeof value !== \"object\" || Object.isFrozen(value)) return value;",
    "  Object.values(value).forEach(deepFreeze);",
    "  return Object.freeze(value);",
    "}",
    `export const CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_PAYLOAD_DIGEST = ${JSON.stringify(payloadDigest)};`,
    `export const CLASSICAL_GRAMMATICAL_ATLAS_POPULATION = deepFreeze(${payload});`,
    "export default CLASSICAL_GRAMMATICAL_ATLAS_POPULATION;",
    "",
  ].join("\n");
}

function populationVersion(population) {
  const sourceDigest = population.sourceDigests.combined;
  const populationDigest = populationPayloadDigest(population);
  return Object.freeze({
    schemaVersion: 1,
    kind: POPULATION_VERSION_KIND,
    version: [
      `v${population.schemaVersion}`,
      sourceDigest.slice("sha256:".length, "sha256:".length + 16),
      populationDigest.slice("sha256:".length, "sha256:".length + 16),
    ].join("-"),
    populationSchemaVersion: population.schemaVersion,
    sourceDigest,
    populationDigest,
    populatedLessonNumbers: population.scope.populatedLessonNumbers,
    counts: Object.freeze({
      lessons: population.counts.lessons,
      atoms: population.counts.atoms,
      active: population.counts.active,
      pending: population.counts.pending,
    }),
  });
}

function serializedPopulationVersion(version) {
  return [
    "// Generated by Classical_Nahuatl_Grammar_Web/scripts/",
    "// build_classical_grammatical_atlas_population.mjs. Do not edit by hand.",
    "function deepFreeze(value) {",
    "  if (!value || typeof value !== \"object\" || Object.isFrozen(value)) return value;",
    "  Object.values(value).forEach(deepFreeze);",
    "  return Object.freeze(value);",
    "}",
    `export const CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_VERSION = deepFreeze(${JSON.stringify(version)});`,
    "export default CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_VERSION;",
    "",
  ].join("\n");
}

function fsyncDirectory(directoryPath) {
  let descriptor;
  try {
    descriptor = fs.openSync(directoryPath, "r");
    fs.fsyncSync(descriptor);
  } finally {
    if (descriptor !== undefined) fs.closeSync(descriptor);
  }
}

function writeFileDurably(filePath, contents, options = {}) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const descriptor = fs.openSync(
    filePath,
    options.flag || "w",
    options.mode || 0o644,
  );
  try {
    const buffer = Buffer.isBuffer(contents)
      ? contents
      : Buffer.from(String(contents), "utf8");
    fs.writeSync(descriptor, buffer, 0, buffer.length, 0);
    fs.fsyncSync(descriptor);
  } finally {
    fs.closeSync(descriptor);
  }
  fsyncDirectory(path.dirname(filePath));
}

function replaceFileAtomically(filePath, contents, options = {}) {
  const temporaryPath = `${filePath}.tmp-${process.pid}-${crypto.randomUUID()}`;
  try {
    writeFileDurably(temporaryPath, contents, options);
    fs.renameSync(temporaryPath, filePath);
    fsyncDirectory(path.dirname(filePath));
  } finally {
    if (fs.existsSync(temporaryPath)) fs.unlinkSync(temporaryPath);
  }
}

function fileSnapshot(webRoot, filePath) {
  const relativePath = path.relative(webRoot, filePath);
  if (!relativePath
    || relativePath.startsWith("..")
    || path.isAbsolute(relativePath)) {
    throw new Error(`publication target leaves Web root: ${filePath}`);
  }
  return Object.freeze({
    relativePath,
    existed: fs.existsSync(filePath),
    contentsBase64: fs.existsSync(filePath)
      ? fs.readFileSync(filePath).toString("base64")
      : "",
  });
}

function restoreSnapshot(webRoot, snapshot) {
  const filePath = path.resolve(webRoot, text(snapshot.relativePath));
  const relativePath = path.relative(webRoot, filePath);
  if (!relativePath
    || relativePath.startsWith("..")
    || path.isAbsolute(relativePath)) {
    throw new Error("publication journal target leaves Web root");
  }
  if (snapshot.existed === true) {
    replaceFileAtomically(
      filePath,
      Buffer.from(text(snapshot.contentsBase64), "base64"),
    );
  } else if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    fsyncDirectory(path.dirname(filePath));
  }
}

function removeFileDurably(filePath) {
  if (!fs.existsSync(filePath)) return;
  fs.unlinkSync(filePath);
  fsyncDirectory(path.dirname(filePath));
}

function publicationJournalPath(webRoot) {
  return path.join(webRoot, PUBLICATION_JOURNAL_RELATIVE_PATH);
}

function writePublicationJournal(webRoot, journal) {
  replaceFileAtomically(
    publicationJournalPath(webRoot),
    `${JSON.stringify(journal, null, 2)}\n`,
    { mode: 0o600 },
  );
}

function validatePublicationJournal(webRoot, journal) {
  if (journal?.schemaVersion !== PUBLICATION_JOURNAL_SCHEMA_VERSION
    || journal?.kind !== PUBLICATION_JOURNAL_KIND
    || path.resolve(journal.webRoot || "") !== path.resolve(webRoot)
    || !Array.isArray(journal.targets)
    || !Array.isArray(journal.stageRelativePaths)) {
    throw new Error("Atlas publication journal is unreadable; refusing unsafe recovery");
  }
  for (const relativePath of [
    ...journal.targets.map(target => target.relativePath),
    ...journal.stageRelativePaths,
  ]) {
    const resolved = path.resolve(webRoot, text(relativePath));
    const relative = path.relative(webRoot, resolved);
    if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
      throw new Error("Atlas publication journal contains an unsafe path");
    }
  }
}

function recoverPublicationJournal(webRoot) {
  const journalPath = publicationJournalPath(webRoot);
  if (!fs.existsSync(journalPath)) return false;
  const journal = JSON.parse(fs.readFileSync(journalPath, "utf8"));
  validatePublicationJournal(webRoot, journal);
  const failures = [];
  if (journal.phase !== "COMMITTED") {
    for (const snapshot of journal.targets) {
      try {
        restoreSnapshot(webRoot, snapshot);
      } catch (error) {
        failures.push(`${snapshot.relativePath}: ${error.message}`);
      }
    }
  }
  for (const relativePath of journal.stageRelativePaths) {
    try {
      removeFileDurably(path.resolve(webRoot, relativePath));
    } catch (error) {
      failures.push(`${relativePath}: ${error.message}`);
    }
  }
  if (failures.length) {
    throw new Error([
      "Atlas publication journal recovery failed; journal was preserved.",
      ...failures,
    ].join("\n"));
  }
  removeFileDurably(journalPath);
  return true;
}

function processIsAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return true;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error?.code !== "ESRCH";
  }
}

function acquirePublicationLock(webRoot, actor) {
  const lockPath = path.join(webRoot, PUBLICATION_LOCK_RELATIVE_PATH);
  fs.mkdirSync(path.dirname(lockPath), { recursive: true });
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const token = crypto.randomUUID();
    const owner = {
      schemaVersion: 1,
      pid: process.pid,
      token,
      actor,
      startedAt: new Date().toISOString(),
    };
    try {
      writeFileDurably(lockPath, `${JSON.stringify(owner)}\n`, {
        flag: "wx",
        mode: 0o600,
      });
      return () => {
        if (!fs.existsSync(lockPath)) return;
        let current;
        try {
          current = JSON.parse(fs.readFileSync(lockPath, "utf8"));
        } catch {
          return;
        }
        if (current.token === token) removeFileDurably(lockPath);
      };
    } catch (error) {
      if (error?.code !== "EEXIST") throw error;
      let existing;
      try {
        existing = JSON.parse(fs.readFileSync(lockPath, "utf8"));
      } catch {
        throw new Error(
          `Atlas publication lock exists and is unreadable: ${lockPath}`,
        );
      }
      if (processIsAlive(Number(existing.pid))) {
        throw new Error(
          `Atlas publication lock is held by pid ${existing.pid} (${existing.actor || "unknown"})`,
        );
      }
      removeFileDurably(lockPath);
    }
  }
  throw new Error("Atlas publication lock could not be acquired");
}

function isCanonicalPublication(options) {
  return path.resolve(options.outputPath) === path.resolve(
    options.webRoot,
    DEFAULT_OUTPUT_RELATIVE_PATH,
  ) && path.resolve(options.versionOutputPath) === path.resolve(
    options.webRoot,
    DEFAULT_VERSION_OUTPUT_RELATIVE_PATH,
  );
}

function publishCanonicalPair(options, serialized, serializedVersion) {
  const transactionId = crypto.randomUUID();
  const stagePaths = [
    `${options.outputPath}.atlas-generator-${transactionId}.tmp`,
    `${options.versionOutputPath}.atlas-generator-${transactionId}.tmp`,
  ];
  const targets = [
    fileSnapshot(options.webRoot, options.outputPath),
    fileSnapshot(options.webRoot, options.versionOutputPath),
  ];
  const journal = {
    schemaVersion: PUBLICATION_JOURNAL_SCHEMA_VERSION,
    kind: PUBLICATION_JOURNAL_KIND,
    webRoot: path.resolve(options.webRoot),
    transactionId,
    actor: "atlas-generator",
    phase: "PREPARING",
    targets,
    stageRelativePaths: stagePaths.map(stagePath => (
      path.relative(options.webRoot, stagePath)
    )),
  };
  writePublicationJournal(options.webRoot, journal);
  try {
    writeFileDurably(stagePaths[0], serialized);
    writeFileDurably(stagePaths[1], serializedVersion);
    writePublicationJournal(options.webRoot, {
      ...journal,
      phase: "PUBLISHING",
    });
    fs.renameSync(stagePaths[0], options.outputPath);
    fsyncDirectory(path.dirname(options.outputPath));
    fs.renameSync(stagePaths[1], options.versionOutputPath);
    fsyncDirectory(path.dirname(options.versionOutputPath));
    writePublicationJournal(options.webRoot, {
      ...journal,
      phase: "COMMITTED",
    });
    removeFileDurably(publicationJournalPath(options.webRoot));
  } catch (error) {
    const failures = [];
    for (const snapshot of targets) {
      try {
        restoreSnapshot(options.webRoot, snapshot);
      } catch (rollbackError) {
        failures.push(`${snapshot.relativePath}: ${rollbackError.message}`);
      }
    }
    for (const stagePath of stagePaths) {
      try {
        removeFileDurably(stagePath);
      } catch (cleanupError) {
        failures.push(`${stagePath}: ${cleanupError.message}`);
      }
    }
    if (!failures.length) {
      removeFileDurably(publicationJournalPath(options.webRoot));
    }
    if (failures.length) {
      throw new Error([
        error.message,
        "Atlas publication rollback also failed; journal was preserved:",
        ...failures,
      ].join("\n"));
    }
    throw error;
  }
}

function report(population, verb) {
  process.stdout.write([
    `${verb} ${population.kind}`,
    `  lessons: ${population.counts.lessons}`,
    `  atoms: ${population.counts.atoms}`,
    `  active/pending: ${population.counts.active}/${population.counts.pending}`,
    `  groups: ${population.counts.groups}`,
    `  canonical operations: ${population.counts.operations}`,
    `  atoms with exact operation links: ${population.counts.atomsWithExactOperationLinks}`,
    `  atoms with candidate operation evidence: ${population.counts.atomsWithProofFileCandidateOperations}`,
    `  direct axis links: ${population.counts.directAxisLinks}`,
    "",
  ].join("\n"));
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const canonicalPublication = options.mode === "write"
    && isCanonicalPublication(options);
  const releaseLock = canonicalPublication
    ? acquirePublicationLock(options.webRoot, "atlas-generator")
    : () => {};
  try {
    if (canonicalPublication) recoverPublicationJournal(options.webRoot);
    const population = await buildPopulation(
      options.webRoot,
      options.lessonLedgerOverrides,
    );
    const serialized = serializedPopulation(population);
    const version = populationVersion(population);
    const serializedVersion = serializedPopulationVersion(version);
    if (options.selfTest) {
      const secondPopulation = await buildPopulation(
        options.webRoot,
        options.lessonLedgerOverrides,
      );
      const secondSerialized = serializedPopulation(secondPopulation);
      const secondVersion = serializedPopulationVersion(populationVersion(
        secondPopulation,
      ));
      if (secondSerialized !== serialized || secondVersion !== serializedVersion) {
        throw new Error("deterministic self-test failed");
      }
      report(population, "Self-tested");
    }
    if (options.mode === "write") {
      fs.mkdirSync(path.dirname(options.outputPath), { recursive: true });
      fs.mkdirSync(path.dirname(options.versionOutputPath), { recursive: true });
      if (canonicalPublication) {
        publishCanonicalPair(options, serialized, serializedVersion);
      } else {
        replaceFileAtomically(options.outputPath, serialized);
        replaceFileAtomically(options.versionOutputPath, serializedVersion);
      }
      report(
        population,
        `Wrote ${options.outputPath} and ${options.versionOutputPath}:`,
      );
      return;
    }
    if (!fs.existsSync(options.outputPath)) {
      throw new Error(`generated Atlas population is missing: ${options.outputPath}`);
    }
    if (!fs.existsSync(options.versionOutputPath)) {
      throw new Error(
        `generated Atlas population version is missing: ${options.versionOutputPath}`,
      );
    }
    const existing = fs.readFileSync(options.outputPath, "utf8");
    const existingVersion = fs.readFileSync(options.versionOutputPath, "utf8");
    if (existing !== serialized || existingVersion !== serializedVersion) {
      throw new Error([
        "generated Atlas population or version is stale; rerun with --write:",
        options.outputPath,
        options.versionOutputPath,
      ].join(" "));
    }
    report(
      population,
      `Checked ${options.outputPath} and ${options.versionOutputPath}:`,
    );
  } finally {
    releaseLock();
  }
}

main().catch(error => {
  process.stderr.write(`${error.stack || error.message || error}\n`);
  process.exitCode = 1;
});
