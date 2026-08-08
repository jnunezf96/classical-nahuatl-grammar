import {
  getCanonicalProofAddress,
  hasCanonicalProofAddress,
} from "./canonical_proof_address_registry.mjs";

// Canonical identity registry for grammar owners, operations, coordinates,
// routes, frame kinds, and implementation addresses.
//
// Existing readable strings remain compatibility labels.  The opaque identity
// is stable and separate from the label, current value, and current code/data
// location.  A future rename or move is handled by one alias/override here,
// rather than by renaming every consumer.

const freeze = Object.freeze;
const VERSION = 1;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;

export const CANONICAL_IDENTITY_NAMESPACES = freeze([
  "owner",
  "domain",
  "operation",
  "operation-contract",
  "input-contract",
  "source-kind",
  "result-kind",
  "frame-kind",
  "analysis-coordinate",
  "semantic-coordinate",
  "coordinate-axis",
  "selection",
  "assertion",
  "proof-address",
  "address",
  "route",
  "route-step",
  "route-branch",
  "rule",
  "effect-scope",
  "output-kind",
  "authority-reference",
  "registry",
]);

const NAMESPACE_SET = new Set(CANONICAL_IDENTITY_NAMESPACES);

// Add a single entry here when a readable identity is renamed.  The key is the
// new namespace/scope/name triple; the value is the old stable key or opaque ID.
const IDENTITY_ALIASES = freeze({});

// Add a single entry here when the code/data location of an identity moves.
// Identity and semantic name remain unchanged.
const CURRENT_LOCATION_OVERRIDES_BY_ID = freeze({});

const RECORDS_BY_ID = new Map();
const IDS_BY_LOOKUP_KEY = new Map();
const OWNER_SPEC_IDENTITIES = new WeakMap();
const SURFACE_IDENTITIES = new WeakMap();

function normalize(value = "") {
  return String(value == null ? "" : value).normalize("NFC").trim();
}

function normalizeNamespace(value = "") {
  const namespace = normalize(value).toLowerCase();
  if (!NAMESPACE_SET.has(namespace)) {
    throw new Error(`canonical-identity-namespace-unrecognized:${namespace}`);
  }
  return namespace;
}

function hash32(value, seed) {
  let hash = seed >>> 0;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
    hash ^= hash >>> 13;
  }
  return hash >>> 0;
}

function hex32(value) {
  return (value >>> 0).toString(16).padStart(8, "0");
}

function opaqueUuid(identityKey) {
  const key = normalize(identityKey);
  const raw = [
    hash32(key, 0x811c9dc5),
    hash32(`${key}\u241f1`, 0x9e3779b9),
    hash32(`${key}\u241f2`, 0x85ebca6b),
    hash32(`${key}\u241f3`, 0xc2b2ae35),
  ].map(hex32).join("");
  const versioned = `${raw.slice(0, 12)}5${raw.slice(13)}`;
  const variant = ((Number.parseInt(versioned[16], 16) & 0x3) | 0x8)
    .toString(16);
  const normalized = `${versioned.slice(0, 16)}${variant}${versioned.slice(17)}`;
  return [
    normalized.slice(0, 8),
    normalized.slice(8, 12),
    normalized.slice(12, 16),
    normalized.slice(16, 20),
    normalized.slice(20, 32),
  ].join("-");
}

function lookupKey(namespace, scopeKey, semanticName) {
  return `${namespace}\u241f${normalize(scopeKey)}\u241f${normalize(semanticName)}`;
}

function stableSeed(namespace, scopeKey, stableKey) {
  return `classical-canonical-identity:v${VERSION}:${namespace}:${normalize(scopeKey)}:${normalize(stableKey)}`;
}

function aliasFor(namespace, scopeKey, semanticName) {
  return IDENTITY_ALIASES[lookupKey(namespace, scopeKey, semanticName)] || "";
}

export function resolveCanonicalIdentity({
  identityId = "",
  namespace = "",
  semanticName = "",
  stableKey = "",
  scopeKey = "",
  currentLocation = "",
  metadata = {},
} = {}) {
  const normalizedNamespace = normalizeNamespace(namespace);
  const normalizedSemanticName = normalize(semanticName);
  const normalizedScopeKey = normalize(scopeKey);
  if (!normalizedSemanticName) {
    throw new Error(`canonical-identity-semantic-name-required:${normalizedNamespace}`);
  }

  const requestedId = normalize(identityId);
  const semanticLookupKey = lookupKey(
    normalizedNamespace,
    normalizedScopeKey,
    normalizedSemanticName,
  );
  const knownSemanticId = IDS_BY_LOOKUP_KEY.get(semanticLookupKey) || "";
  if (!requestedId && knownSemanticId) {
    return RECORDS_BY_ID.get(knownSemanticId);
  }
  const alias = aliasFor(
    normalizedNamespace,
    normalizedScopeKey,
    normalizedSemanticName,
  );
  const aliasIsId = UUID_PATTERN.test(alias);
  const normalizedStableKey = normalize(
    stableKey || (aliasIsId ? normalizedSemanticName : alias)
      || normalizedSemanticName,
  );
  const resolvedId = requestedId || (aliasIsId
    ? alias
    : opaqueUuid(stableSeed(
      normalizedNamespace,
      normalizedScopeKey,
      normalizedStableKey,
    )));
  if (!UUID_PATTERN.test(resolvedId)) {
    throw new Error(`canonical-identity-id-invalid:${resolvedId}`);
  }

  const existing = RECORDS_BY_ID.get(resolvedId) || null;
  if (existing) {
    if (
      existing.namespace !== normalizedNamespace
      || existing.scopeKey !== normalizedScopeKey
      || existing.stableKey !== normalizedStableKey
    ) {
      throw new Error(`canonical-identity-collision:${resolvedId}`);
    }
    IDS_BY_LOOKUP_KEY.set(
      lookupKey(
        normalizedNamespace,
        normalizedScopeKey,
        normalizedSemanticName,
      ),
      resolvedId,
    );
    return existing;
  }

  const locationOverride = Object.prototype.hasOwnProperty.call(
    CURRENT_LOCATION_OVERRIDES_BY_ID,
    resolvedId,
  )
    ? CURRENT_LOCATION_OVERRIDES_BY_ID[resolvedId]
    : currentLocation;
  const record = freeze({
    kind: "canonical-identity-record",
    version: VERSION,
    identityId: resolvedId,
    namespace: normalizedNamespace,
    semanticName: normalizedSemanticName,
    stableKey: normalizedStableKey,
    scopeKey: normalizedScopeKey,
    currentLocation: normalize(locationOverride),
    metadata: freeze({ ...(metadata || {}) }),
    identityAuthority: false,
    grammarAuthority: false,
  });
  RECORDS_BY_ID.set(resolvedId, record);
  IDS_BY_LOOKUP_KEY.set(
    lookupKey(
      normalizedNamespace,
      normalizedScopeKey,
      normalizedSemanticName,
    ),
    resolvedId,
  );
  return record;
}

function recordRole(namespace, semanticName, role, scopeKey, currentLocation) {
  return resolveCanonicalIdentity({
    namespace,
    semanticName,
    stableKey: role,
    scopeKey,
    currentLocation,
    metadata: { role },
  });
}

function coordinateRecords(spec, ownerIdentityId) {
  const records = [];
  for (const selection of spec.selections || []) {
    records.push(resolveCanonicalIdentity({
      namespace: "selection",
      semanticName: selection,
      stableKey: selection,
      scopeKey: ownerIdentityId,
      currentLocation: `selections.${selection}`,
    }));
  }
  for (const [coordinateKey, coordinate] of Object.entries(
    spec.coordinates || {},
  )) {
    const [selection = "", facet = ""] = coordinateKey.split("::");
    const coordinateRecord = resolveCanonicalIdentity({
      namespace: "semantic-coordinate",
      semanticName: facet || coordinateKey,
      stableKey: coordinateKey,
      scopeKey: ownerIdentityId,
      currentLocation: `coordinates.${coordinateKey}`,
      metadata: { selection, facet },
    });
    records.push(coordinateRecord);
    if (coordinate?.assertionId) {
      records.push(resolveCanonicalIdentity({
        namespace: "assertion",
        semanticName: coordinate.assertionId,
        stableKey: coordinateKey,
        scopeKey: ownerIdentityId,
        currentLocation: `coordinates.${coordinateKey}.assertionId`,
        metadata: { coordinateIdentityId: coordinateRecord.identityId },
      }));
    }
    if (
      coordinate?.proofAddressId
      && hasCanonicalProofAddress(coordinate.proofAddressId)
    ) {
      const proof = getCanonicalProofAddress(coordinate.proofAddressId);
      records.push(resolveCanonicalIdentity({
        identityId: proof.proofAddressId,
        namespace: "proof-address",
        semanticName: proof.semanticName,
        stableKey: proof.legacyKey || proof.semanticName,
        scopeKey: ownerIdentityId,
        currentLocation: proof.currentPath,
        metadata: {
          coordinateIdentityId: coordinateRecord.identityId,
          addressScope: proof.addressScope || "result-path",
          deprecated: proof.deprecated === true,
          replacementProofAddressIds:
            proof.replacementProofAddressIds || [],
        },
      }));
    }
    if (
      coordinate?.legacyProofAddressId
      && coordinate.legacyProofAddressId !== coordinate.proofAddressId
      && hasCanonicalProofAddress(coordinate.legacyProofAddressId)
    ) {
      const legacyProof = getCanonicalProofAddress(
        coordinate.legacyProofAddressId,
      );
      records.push(resolveCanonicalIdentity({
        identityId: legacyProof.proofAddressId,
        namespace: "proof-address",
        semanticName: legacyProof.semanticName,
        stableKey: legacyProof.legacyKey || legacyProof.semanticName,
        scopeKey: ownerIdentityId,
        currentLocation: legacyProof.currentPath,
        metadata: {
          addressScope: legacyProof.addressScope || "result-path",
          deprecated: legacyProof.deprecated === true,
          replacementProofAddressIds:
            legacyProof.replacementProofAddressIds || [],
          compatibilityOnly: true,
          sharedLegacyAddress: true,
        },
      }));
    }
  }
  for (const [analysisKind, definition] of Object.entries(spec.analyses || {})) {
    const coordinateRecord = resolveCanonicalIdentity({
      namespace: "analysis-coordinate",
      semanticName: analysisKind,
      stableKey: analysisKind,
      scopeKey: ownerIdentityId,
      currentLocation: `analyses.${analysisKind}`,
    });
    records.push(coordinateRecord);
    if (definition?.checkpoint) {
      records.push(resolveCanonicalIdentity({
        namespace: "route-step",
        semanticName: definition.checkpoint,
        stableKey: `analysis-checkpoint:${analysisKind}`,
        scopeKey: ownerIdentityId,
        currentLocation: `analyses.${analysisKind}.checkpoint`,
        metadata: { coordinateIdentityId: coordinateRecord.identityId },
      }));
    }
  }
  return records;
}

export function registerCanonicalOwnerSpecIdentity(spec = {}) {
  if (!spec || typeof spec !== "object") {
    throw new Error("canonical-owner-spec-object-required");
  }
  const existing = OWNER_SPEC_IDENTITIES.get(spec) || null;
  if (existing) return existing;
  const ownerId = normalize(spec.ownerId);
  if (!ownerId) throw new Error("canonical-owner-spec-owner-id-required");
  const ownerRecord = resolveCanonicalIdentity({
    namespace: "owner",
    semanticName: ownerId,
    stableKey: ownerId,
    currentLocation: "ownerId",
  });
  const ownerScope = ownerRecord.identityId;
  const operationRecord = recordRole(
    "operation",
    spec.operationId || `${ownerId}.operation`,
    "primary-operation",
    ownerScope,
    "operationId",
  );
  const domainRecord = recordRole(
    "domain",
    spec.domain || spec.analysisDomain || ownerId,
    "owner-domain",
    ownerScope,
    spec.domain ? "domain" : "analysisDomain",
  );
  const sourceKind = spec.sourceKind || `${ownerId}-source`;
  const resultKind = spec.resultKind || `${ownerId}-result`;
  const sourceRecord = recordRole(
    "source-kind",
    sourceKind,
    "owner-source-kind",
    ownerScope,
    spec.sourceKind ? "sourceKind" : "derived-source-kind",
  );
  const resultRecord = recordRole(
    "result-kind",
    resultKind,
    "owner-result-kind",
    ownerScope,
    spec.resultKind ? "resultKind" : "derived-result-kind",
  );
  const inputRecord = spec.inputContract
    ? recordRole(
      "input-contract",
      spec.inputContract,
      "owner-input-contract",
      ownerScope,
      "inputContract",
    )
    : null;
  const coordinateIdentityRecords = coordinateRecords(spec, ownerScope);
  const frame = freeze({
    kind: "canonical-owner-spec-identity-frame",
    version: VERSION,
    ownerIdentityId: ownerRecord.identityId,
    operationIdentityId: operationRecord.identityId,
    domainIdentityId: domainRecord.identityId,
    sourceKindIdentityId: sourceRecord.identityId,
    resultKindIdentityId: resultRecord.identityId,
    inputContractIdentityId: inputRecord?.identityId || "",
    coordinateIdentityIds: freeze(
      coordinateIdentityRecords.map(record => record.identityId),
    ),
    records: freeze([
      ownerRecord,
      operationRecord,
      domainRecord,
      sourceRecord,
      resultRecord,
      ...(inputRecord ? [inputRecord] : []),
      ...coordinateIdentityRecords,
    ]),
    grammarAuthority: false,
  });
  OWNER_SPEC_IDENTITIES.set(spec, frame);
  SURFACE_IDENTITIES.set(spec, freezeManifest(frame.records, "owner-spec"));
  return frame;
}

function inferOwnerScope(value, fallback = "") {
  if (!value || typeof value !== "object") return normalize(fallback);
  return normalize(
    value.semanticOwnerId
      || value.ownerId
      || value.contractOwnerId
      || value.actorId
      || fallback,
  );
}

function classifyKey(key = "") {
  const normalizedKey = normalize(key);
  const lower = normalizedKey.toLowerCase();
  if (["ownerid", "semanticownerid", "contractownerid", "canonicalactorid", "actorid"].includes(lower)) return "owner";
  if (lower.includes("operationid")) return "operation";
  if (lower === "inputcontract") return "input-contract";
  if (lower === "sourcekind" || lower === "sourceframekind") return "source-kind";
  if (lower === "resultkind") return "result-kind";
  if (lower === "kind" || lower.endsWith("framekind") || lower.endsWith("framekinds")) return "frame-kind";
  if (lower === "assertionid") return "assertion";
  if (lower === "proofaddressid") return "proof-address";
  if (lower === "canonicalpath" || lower === "currentpath") return "address";
  if (lower === "stepid" || lower === "stages") return "route-step";
  if (lower === "branchid") return "route-branch";
  if (lower === "routeid") return "route";
  if (lower === "selection") return "selection";
  if (lower.includes("ruleid")) return "rule";
  if (lower === "domain" || lower === "analysisdomain") return "domain";
  if (lower === "requestedanalysiskind" || lower === "analysiskind") return "analysis-coordinate";
  if (lower === "effectscopes") return "effect-scope";
  if (lower === "outputkinds" || lower === "requestedoutputkind") return "output-kind";
  if (lower === "authorityrefs") return "authority-reference";
  if (lower.endsWith("id") || lower.endsWith("ids")) return "registry";
  return "";
}

function visitIdentityFields(value, context, path, records, seen) {
  if (!value || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  const ownerName = inferOwnerScope(value, context.ownerName);
  const ownerRecord = ownerName
    ? resolveCanonicalIdentity({
      namespace: "owner",
      semanticName: ownerName,
      stableKey: ownerName,
      currentLocation: path,
    })
    : null;
  const scopeKey = ownerRecord?.identityId || context.scopeKey || "global";

  if (value.selection && value.requestedFacet) {
    records.push(resolveCanonicalIdentity({
      namespace: "semantic-coordinate",
      semanticName: `${value.selection}:${value.requestedFacet}`,
      stableKey: `${value.selection}::${value.requestedFacet}`,
      scopeKey,
      currentLocation: path,
    }));
  } else if (value.analysisKind || value.requestedAnalysisKind) {
    const analysisKind = value.analysisKind || value.requestedAnalysisKind;
    records.push(resolveCanonicalIdentity({
      namespace: "analysis-coordinate",
      semanticName: analysisKind,
      stableKey: analysisKind,
      scopeKey,
      currentLocation: path,
    }));
  }

  for (const key of Reflect.ownKeys(value)) {
    if (typeof key !== "string") continue;
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || descriptor.get || descriptor.set
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")) continue;
    const nested = descriptor.value;
    const namespace = classifyKey(key);
    const fieldPath = `${path}.${key}`;
    if (namespace && typeof nested === "string" && normalize(nested)) {
      if (namespace === "proof-address" && hasCanonicalProofAddress(nested)) {
        const proof = getCanonicalProofAddress(nested);
        records.push(resolveCanonicalIdentity({
          identityId: proof.proofAddressId,
          namespace: "proof-address",
          semanticName: proof.semanticName,
          stableKey: proof.legacyKey || proof.semanticName,
          scopeKey,
          currentLocation: proof.currentPath,
          metadata: { addressScope: proof.addressScope || "result-path" },
        }));
      } else {
        const roleKey = ["operation", "source-kind", "result-kind", "input-contract"]
          .includes(namespace)
          ? fieldPath.replace(/^\$\./u, "")
          : namespace === "address"
            ? value.assertionId || value.proofAddressId || fieldPath
            : nested;
        records.push(resolveCanonicalIdentity({
          namespace,
          semanticName: nested,
          stableKey: roleKey,
          scopeKey: namespace === "owner" ? "" : scopeKey,
          currentLocation: namespace === "address" ? nested : fieldPath,
        }));
      }
    } else if (namespace && Array.isArray(nested)) {
      nested.forEach((item, index) => {
        if (typeof item !== "string" || !normalize(item)) return;
        records.push(resolveCanonicalIdentity({
          namespace,
          semanticName: item,
          stableKey: item,
          scopeKey,
          currentLocation: `${fieldPath}[${index}]`,
        }));
      });
    }
    if (key === "coordinates" && nested && typeof nested === "object") {
      const coordinateSetName = value.selection && value.requestedFacet
        ? `${value.selection}:${value.requestedFacet}`
        : value.analysisKind || value.requestedAnalysisKind || fieldPath;
      records.push(resolveCanonicalIdentity({
        namespace: "semantic-coordinate",
        semanticName: coordinateSetName,
        stableKey: coordinateSetName,
        scopeKey,
        currentLocation: fieldPath,
      }));
      for (const axis of Object.keys(nested)) {
        records.push(resolveCanonicalIdentity({
          namespace: "coordinate-axis",
          semanticName: axis,
          stableKey: axis,
          scopeKey,
          currentLocation: `${fieldPath}.${axis}`,
        }));
      }
    }
    visitIdentityFields(
      nested,
      { ownerName, scopeKey },
      fieldPath,
      records,
      seen,
    );
  }
}

function freezeManifest(records, source = "inferred") {
  const unique = new Map();
  records.filter(Boolean).forEach(record => unique.set(record.identityId, record));
  return freeze({
    kind: "canonical-identity-surface",
    version: VERSION,
    source,
    identityIds: freeze([...unique.keys()]),
    records: freeze([...unique.values()]),
    grammarAuthority: false,
  });
}

export function registerCanonicalIdentitySurface(
  value,
  identityRequests = [],
  { source = "registered" } = {},
) {
  if (!value || typeof value !== "object") return null;
  const records = [];
  for (const request of identityRequests || []) {
    records.push(request?.kind === "canonical-identity-record"
      ? request
      : resolveCanonicalIdentity(request));
  }
  const manifest = freezeManifest(records, source);
  SURFACE_IDENTITIES.set(value, manifest);
  return manifest;
}

export function getCanonicalIdentitySurface(value, context = {}) {
  if (!value || typeof value !== "object") return null;
  const registered = SURFACE_IDENTITIES.get(value) || null;
  if (registered) return registered;
  const records = [];
  visitIdentityFields(
    value,
    {
      ownerName: normalize(context.ownerId),
      scopeKey: normalize(context.scopeKey),
    },
    "$",
    records,
    new WeakSet(),
  );
  const inferred = freezeManifest(records, "inferred");
  SURFACE_IDENTITIES.set(value, inferred);
  return inferred;
}

export function getCanonicalIdentityRecord(identityId = "") {
  return RECORDS_BY_ID.get(normalize(identityId)) || null;
}

export function getCanonicalIdentityId({
  namespace = "",
  semanticName = "",
  scopeKey = "",
} = {}) {
  const normalizedNamespace = normalizeNamespace(namespace);
  const key = lookupKey(normalizedNamespace, scopeKey, semanticName);
  return IDS_BY_LOOKUP_KEY.get(key)
    || resolveCanonicalIdentity({
      namespace: normalizedNamespace,
      semanticName,
      stableKey: semanticName,
      scopeKey,
    }).identityId;
}

export function listCanonicalIdentityRecords() {
  return freeze([...RECORDS_BY_ID.values()]);
}

export function isCanonicalIdentityRecord(value = null) {
  return Boolean(
    value
      && value.kind === "canonical-identity-record"
      && value.version === VERSION
      && UUID_PATTERN.test(value.identityId || "")
      && NAMESPACE_SET.has(value.namespace)
      && value.grammarAuthority === false
      && Object.isFrozen(value)
  );
}

export function createCanonicalIdentityInspectionApi() {
  return freeze({
    CANONICAL_IDENTITY_NAMESPACES,
    getCanonicalIdentityRecord,
    getCanonicalIdentityId,
    getCanonicalIdentitySurface,
    listCanonicalIdentityRecords,
    isCanonicalIdentityRecord,
  });
}
