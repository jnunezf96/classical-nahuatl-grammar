// Routing-only catalog for independently owned carrier-structure operations.
// The catalog installs no grammar of its own and is excluded from individual
// owner proof addresses. Each owner is addressed through its own spec plus the
// shared mechanics module; global runtime manifest/reachability gates verify
// this complete catalog afresh.

import { createCarrierStructureOwnerMechanicsApi } from "./carrier_structure_owner_mechanics.mjs";
import structuralUnitHierarchy from "./carrier-structure-owner-specs/structural-unit-hierarchy.mjs";
import carrierRankFormation from "./carrier-structure-owner-specs/carrier-rank-formation.mjs";
import classicalSyllableStructure from "./carrier-structure-owner-specs/classical-syllable-structure.mjs";
import carrierVocableStructure from "./carrier-structure-owner-specs/carrier-vocable-structure.mjs";
import carrierVocableProsody from "./carrier-structure-owner-specs/carrier-vocable-prosody.mjs";
import carrierPhonotacticSurfaceConstraints from "./carrier-structure-owner-specs/carrier-phonotactic-surface-constraints.mjs";
import nuclearClauseMorphosyntaxDomain from "./carrier-structure-owner-specs/nuclear-clause-morphosyntax-domain.mjs";
import nahuatlSyntaxDomainOnset from "./carrier-structure-owner-specs/nahuatl-syntax-domain-onset.mjs";
import nahuatlGroupComposition from "./carrier-structure-owner-specs/nahuatl-group-composition.mjs";
import nahuatlStructureLevelDistribution from "./carrier-structure-owner-specs/nahuatl-structure-level-distribution.mjs";
import { createFoundationalOwnersApi } from "./foundational_owner_catalog.mjs";

const OWNER_SPECS = Object.freeze([
  structuralUnitHierarchy,
  carrierRankFormation,
  classicalSyllableStructure,
  carrierVocableStructure,
  carrierVocableProsody,
  carrierPhonotacticSurfaceConstraints,
  nuclearClauseMorphosyntaxDomain,
  nahuatlSyntaxDomainOnset,
  nahuatlGroupComposition,
  nahuatlStructureLevelDistribution,
]);

export function createCarrierStructureOwnersApi(targetObject = globalThis) {
  const carrierApi = createCarrierStructureOwnerMechanicsApi(targetObject, OWNER_SPECS);
  const foundationalApi = createFoundationalOwnersApi(targetObject);
  return Object.freeze({ ...carrierApi, ...foundationalApi });
}

export function installCarrierStructureOwnersGlobals(targetObject = globalThis) {
  const api = createCarrierStructureOwnersApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
