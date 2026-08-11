// Routing-only catalog for independently owned foundational operations.
// It cannot execute grammar or own atoms. Each owner is proved through the
// shared mechanics plus only its exact spec and transitive semantic inputs.

import { createFoundationalOwnerMechanicsApi } from "./foundational_owner_mechanics.mjs";
import participantRoleAnalysis from "./foundational-owner-specs/participant-role-analysis.mjs";
import conceptualPlaneSeparation from "./foundational-owner-specs/conceptual-plane-separation.mjs";
import classicalNominalNumber from "./foundational-owner-specs/classical-nominal-number.mjs";
import classicalStemComposition from "./foundational-owner-specs/classical-stem-composition.mjs";
import classicalPlaceNncFormation from "./foundational-owner-specs/classical-place-nnc-formation.mjs";
import classicalPhonologicalDistinction from "./foundational-owner-specs/classical-phonological-distinction.mjs";
import classicalObjectEmbedDistinction from "./foundational-owner-specs/classical-object-embed-distinction.mjs";
import classicalParticleLexicalDistinction from "./foundational-owner-specs/classical-particle-lexicon.mjs";
import classicalVerbstemLexicon from "./foundational-owner-specs/classical-verbstem-lexicon.mjs";
import classicalNounstemLexicon from "./foundational-owner-specs/classical-nounstem-lexicon.mjs";
import classicalSegmentalPhonemeInventory from "./foundational-owner-specs/classical-segmental-phoneme-inventory.mjs";
import classicalGraphologicalRepresentation from "./foundational-owner-specs/classical-graphological-representation.mjs";

const OWNER_SPECS = Object.freeze([
  participantRoleAnalysis,
  conceptualPlaneSeparation,
  classicalNominalNumber,
  classicalStemComposition,
  classicalPlaceNncFormation,
  classicalPhonologicalDistinction,
  classicalObjectEmbedDistinction,
  classicalParticleLexicalDistinction,
  classicalVerbstemLexicon,
  classicalNounstemLexicon,
  classicalSegmentalPhonemeInventory,
  classicalGraphologicalRepresentation,
]);

export function createFoundationalOwnersApi(targetObject = globalThis) {
  return createFoundationalOwnerMechanicsApi(targetObject, OWNER_SPECS);
}
