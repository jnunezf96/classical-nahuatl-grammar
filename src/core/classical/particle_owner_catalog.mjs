// Routing-only catalog. Every spec retains independent semantic ownership and proof.
import classical_particle_structure_analysis from "./particle-owner-specs/classical-particle-structure-analysis.mjs";
import classical_particle_distribution_analysis from "./particle-owner-specs/classical-particle-distribution-analysis.mjs";
import classical_particle_lexicon from "./particle-owner-specs/classical-particle-lexicon.mjs";
import classical_negative_particle_distribution from "./particle-owner-specs/classical-negative-particle-distribution.mjs";
import classical_negative_particle_lexicon from "./particle-owner-specs/classical-negative-particle-lexicon.mjs";
import classical_particle_collocation_structure from "./particle-owner-specs/classical-particle-collocation-structure.mjs";
import classical_particle_collocation_lexicon from "./particle-owner-specs/classical-particle-collocation-lexicon.mjs";
import classical_particle_honorific_structure from "./particle-owner-specs/classical-particle-honorific-structure.mjs";
import classical_particle_honorific_formation from "./particle-owner-specs/classical-particle-honorific-formation.mjs";
import { createRoutineSemanticOwnerMechanicsApi } from "./transcription_owner_mechanics.mjs";
const OWNER_SPECS = Object.freeze([
  classical_particle_structure_analysis,
  classical_particle_distribution_analysis,
  classical_particle_lexicon,
  classical_negative_particle_distribution,
  classical_negative_particle_lexicon,
  classical_particle_collocation_structure,
  classical_particle_collocation_lexicon,
  classical_particle_honorific_structure,
  classical_particle_honorific_formation,
]);
export function createClassicalParticleSemanticOwnersApi(targetObject = globalThis, installationContext = null) {
  const semanticTarget = Object.create(targetObject);
  Object.defineProperties(semanticTarget, Object.getOwnPropertyDescriptors(installationContext?.moduleDependencyCapabilities || {}));
  return createRoutineSemanticOwnerMechanicsApi(semanticTarget, OWNER_SPECS);
}
export function installClassicalParticleSemanticOwnersGlobals(targetObject = globalThis, installationContext = null) {
  const api = createClassicalParticleSemanticOwnersApi(targetObject, installationContext);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
