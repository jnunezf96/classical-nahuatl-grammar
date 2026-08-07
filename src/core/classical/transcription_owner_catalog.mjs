// Routing-only catalog. Every imported spec retains independent ownership and proof.
import classical_assimilation_taxonomy from "./transcription-owner-specs/classical-assimilation-taxonomy.mjs";
import classical_ch_affricate_repertory_analysis from "./transcription-owner-specs/classical-ch-affricate-repertory-analysis.mjs";
import classical_compound_open_transition from "./transcription-owner-specs/classical-compound-open-transition.mjs";
import classical_consonant_graphemic_representation from "./transcription-owner-specs/classical-consonant-graphemic-representation.mjs";
import classical_consonant_loss from "./transcription-owner-specs/classical-consonant-loss.mjs";
import classical_consonant_phone_shift from "./transcription-owner-specs/classical-consonant-phone-shift.mjs";
import classical_consonant_system_analysis from "./transcription-owner-specs/classical-consonant-system-analysis.mjs";
import classical_consonantal_length from "./transcription-owner-specs/classical-consonantal-length.mjs";
import classical_contextual_consonant_spelling from "./transcription-owner-specs/classical-contextual-consonant-spelling.mjs";
import classical_glottal_phoneme_repertory_analysis from "./transcription-owner-specs/classical-glottal-phoneme-repertory-analysis.mjs";
import classical_k_phoneme_repertory_analysis from "./transcription-owner-specs/classical-k-phoneme-repertory-analysis.mjs";
import classical_known_prosodic_constraints from "./transcription-owner-specs/classical-known-prosodic-constraints.mjs";
import classical_kw_phoneme_repertory_analysis from "./transcription-owner-specs/classical-kw-phoneme-repertory-analysis.mjs";
import classical_l_phoneme_repertory_analysis from "./transcription-owner-specs/classical-l-phoneme-repertory-analysis.mjs";
import classical_lateral_affricate_repertory_analysis from "./transcription-owner-specs/classical-lateral-affricate-repertory-analysis.mjs";
import classical_long_vowel_glottal_allomorphy from "./transcription-owner-specs/classical-long-vowel-glottal-allomorphy.mjs";
import classical_m_phoneme_repertory_analysis from "./transcription-owner-specs/classical-m-phoneme-repertory-analysis.mjs";
import classical_n_phoneme_repertory_analysis from "./transcription-owner-specs/classical-n-phoneme-repertory-analysis.mjs";
import classical_p_phoneme_repertory_analysis from "./transcription-owner-specs/classical-p-phoneme-repertory-analysis.mjs";
import classical_progressive_assimilation from "./transcription-owner-specs/classical-progressive-assimilation.mjs";
import classical_regressive_assimilation from "./transcription-owner-specs/classical-regressive-assimilation.mjs";
import classical_regressive_dissimilation from "./transcription-owner-specs/classical-regressive-dissimilation.mjs";
import classical_s_phoneme_repertory_analysis from "./transcription-owner-specs/classical-s-phoneme-repertory-analysis.mjs";
import classical_sh_phoneme_repertory_analysis from "./transcription-owner-specs/classical-sh-phoneme-repertory-analysis.mjs";
import classical_stress_group_prosody from "./transcription-owner-specs/classical-stress-group-prosody.mjs";
import classical_supportive_vowel_realization from "./transcription-owner-specs/classical-supportive-vowel-realization.mjs";
import classical_supportive_vowel_status_analysis from "./transcription-owner-specs/classical-supportive-vowel-status-analysis.mjs";
import classical_syllabification from "./transcription-owner-specs/classical-syllabification.mjs";
import classical_t_phoneme_repertory_analysis from "./transcription-owner-specs/classical-t-phoneme-repertory-analysis.mjs";
import classical_tz_affricate_repertory_analysis from "./transcription-owner-specs/classical-tz-affricate-repertory-analysis.mjs";
import classical_vocable_stress from "./transcription-owner-specs/classical-vocable-stress.mjs";
import classical_vowel_elision from "./transcription-owner-specs/classical-vowel-elision.mjs";
import classical_vowel_graphemic_representation from "./transcription-owner-specs/classical-vowel-graphemic-representation.mjs";
import classical_vowel_repertory_analysis from "./transcription-owner-specs/classical-vowel-repertory-analysis.mjs";
import classical_w_phoneme_repertory_analysis from "./transcription-owner-specs/classical-w-phoneme-repertory-analysis.mjs";
import classical_y_phoneme_repertory_analysis from "./transcription-owner-specs/classical-y-phoneme-repertory-analysis.mjs";
import { createClassicalTranscriptionOwnerMechanicsApi } from "./transcription_owner_mechanics.mjs";
const OWNER_SPECS = Object.freeze([
  classical_assimilation_taxonomy,
  classical_ch_affricate_repertory_analysis,
  classical_compound_open_transition,
  classical_consonant_graphemic_representation,
  classical_consonant_loss,
  classical_consonant_phone_shift,
  classical_consonant_system_analysis,
  classical_consonantal_length,
  classical_contextual_consonant_spelling,
  classical_glottal_phoneme_repertory_analysis,
  classical_k_phoneme_repertory_analysis,
  classical_known_prosodic_constraints,
  classical_kw_phoneme_repertory_analysis,
  classical_l_phoneme_repertory_analysis,
  classical_lateral_affricate_repertory_analysis,
  classical_long_vowel_glottal_allomorphy,
  classical_m_phoneme_repertory_analysis,
  classical_n_phoneme_repertory_analysis,
  classical_p_phoneme_repertory_analysis,
  classical_progressive_assimilation,
  classical_regressive_assimilation,
  classical_regressive_dissimilation,
  classical_s_phoneme_repertory_analysis,
  classical_sh_phoneme_repertory_analysis,
  classical_stress_group_prosody,
  classical_supportive_vowel_realization,
  classical_supportive_vowel_status_analysis,
  classical_syllabification,
  classical_t_phoneme_repertory_analysis,
  classical_tz_affricate_repertory_analysis,
  classical_vocable_stress,
  classical_vowel_elision,
  classical_vowel_graphemic_representation,
  classical_vowel_repertory_analysis,
  classical_w_phoneme_repertory_analysis,
  classical_y_phoneme_repertory_analysis,
]);
export function createClassicalTranscriptionSemanticOwnersApi(targetObject = globalThis) {
  return createClassicalTranscriptionOwnerMechanicsApi(targetObject, OWNER_SPECS);
}
export function installClassicalTranscriptionSemanticOwnersGlobals(targetObject = globalThis) {
  const api = createClassicalTranscriptionSemanticOwnersApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
