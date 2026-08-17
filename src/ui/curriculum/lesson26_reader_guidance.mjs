const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON26_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson26-applicative-foundation-and-irregular-sources",
    "Choose only the applicative analysis needed by the composition",
    "Choose Applicative for any open typed Source and supply the added participant. When the Source genuinely has an inherent, irregular, or valence-neutral applicative analysis, choose that analysis only if the final composition needs it and typed provenance has not already settled it. The application preserves an inherent identity route, the irregular itzi to itta route, or an authorized valence-neutral identity route and automatically derives the new object level and mainline status. Honorific observations, meanings, and Canvas stems are reading evidence, never a whitelist for otherwise productive input. The clickable applicative-foundation cue shows the Source analysis, participant relation, selected history, target, and object depth.",
  ),
  idea(
    "lesson26-type-one-applicatives",
    "Choose Type 1; let iā derive the Result",
    "Type 1 availability is lexically unpredictable, so choose Type 1 when it is the intended formation for any open typed Source. The application removes the final Source vowel, adds replacive iā, derives licensed fusion and boundary changes, assigns Class C, imports the applicative participant, and calculates object depth. Choose Causative versus Applicative only when the final composition genuinely supports both roles; a matching surface never chooses the role by itself. Meanings and Canvas examples remain reading evidence, not an admission list or stem whitelist. The clickable Type 1 cue shows the Source boundary, removed vowel, iā, Result, role, participant transfer, and object depth.",
  ),
  idea(
    "lesson26-type-two-foundation-and-final-i",
    "Choose Type 2; let Source shape choose the changes",
    "Choose Type 2 and the intended applicative participant for any open typed Source. Typed Source shape, class, and signed history determine liā or huiā and remove the Source-history choice whenever only one route remains. For final-i Sources the application attaches liā and automatically derives vowel length and the si to xi or tzi or ti to chi changes; it also preserves the silent āyi restriction, converts a retained Source reflexive to shuntline ne, assigns Class C, and derives every object level. Canvas stems are examples, never a whitelist. The clickable Type 2 cue shows the Source ending and history, suffix, automatic alternation, reflexive-to-ne transfer, Result, and object hierarchy.",
  ),
  idea(
    "lesson26-final-a-source-routes",
    "Let the typed final-a Source choose its route",
    "For any open typed final-a Source, choose only a genuinely unresolved Source history or competing recursive structure. The application uses the Source ending and signed history to derive iā, liā, or huiā, remove or preserve the right material, apply regular a to i and consonant changes, preserve a captured applicative as the Source of another applicative, assign Class C, and calculate every participant level. Formula examples show the productive relation and do not restrict it to their printed stems. The clickable final-a cue shows the Source ending, history, boundary change, recursion, Result, and participant depth.",
  ),
  idea(
    "lesson26-shape-and-class-exceptions",
    "Let class, shape, and valence apply the exception",
    "Class D final ā, Class B iya or eya, and oya Sources follow their Canvas-authorized exception routes for any open Source with the matching typed class, shape, valence, and history. The application preserves or deletes ya and appends liā as the typed facts require. Choose oya transitivity or Source history only when it is genuinely unsettled; there is no Canvas-stem picker. The clickable exception cue shows the Source class, ending, valence, selected history, automatic exception route, Result, and participant structure.",
  ),
  idea(
    "lesson26-oa-and-huia-routes",
    "Use signed internal history behind o-ā and huiā",
    "For an open typed o-ā Source, the application first uses signed internal history to distinguish root-final l, root-final o, a-hui, i-hui, fused, exceptional, and suppletive routes. A compact history choice appears only when provenance cannot recover which licensed Source produced the visible o-ā form; signed earlier derivation removes that choice. The application then derives huiā or exceptional liā, fusion, Class C, and participant structure automatically. Canvas witnesses never become spelling-based admission rules. The clickable o-ā and huiā cue shows the recovered history, reconstruction, fusion or suppletion, Result, alternatives, and participants.",
  ),
  idea(
    "lesson26-special-and-parallel-applicatives",
    "Choose a special or parallel formation only when the Result needs it",
    "Final-ō direct and replacive huiā routes, rare tiā applicatives, and parallel Type 1 and Type 2 formations use the same applicative operation as the regular patterns. Choose among Type 1, Type 2, rare tiā, Causative, or Applicative only when more than one licensed analysis can form the intended final composition. The application derives Source compaction, suffix, Class C, participant import, and object depth. Context and Canvas meanings help the reader interpret a Result but never select it or restrict open stems. The clickable special-and-parallel cue shows the selected route, Source history, target class, imported participant, and competing licensed formation when one exists.",
  ),
  idea(
    "lesson26-single-object-applicatives",
    "Choose the added participant; let the application build the single object",
    "When the typed Source is intransitive, choose the intended imported participant: nonspecific human, specific person, reflexive, or another licensed object kind. The application preserves the Source subject, compacts the Source, adds exactly one applicative object, derives its carrier and mainline status, and produces the final composition. Fusion, adverbial embedding, agreement, and example meanings are automatic or reading-only; they do not add menus. The clickable single-object cue shows the Source and target object counts, participant kind and identity, governor, derivational level, carrier, and final Result.",
  ),
  idea(
    "lesson26-double-object-applicatives",
    "Choose participant identity and only a genuinely ambiguous silent supplement",
    "When the typed Source already has one object, choose the new applicative participant and any genuinely unresolved referent identity. The application promotes the new applicative object to mainline, retains the Source object on the shuntline, derives compatibility, prefix order, partial or full silence, and changes a retained Source reflexive to shuntline ne. A grammatically present silent object remains available to the ordinary Lesson 17 supplementation path; choose its supplement head only if several eligible silent objects remain. The clickable double-object cue shows both object levels, mainline and shuntline roles, silence or ne, referent contact, and the supplement link without adding manual hierarchy controls.",
  ),
  idea(
    "lesson26-triple-object-applicatives",
    "Recapture the Result; let recursion build all three object levels",
    "Recapture an eligible double-object Result as the typed Source and choose only the new applicative participant and genuine referent identity. The ordinary recursive derivation path adds the third object as mainline, retains the earlier objects as first- and second-level shuntlines, and derives specificity, reflexivity, nonspecificity, compatibility, silence, ne, and prefix order. There is no separate triple-object engine and no manual hierarchy control. The clickable triple-object cue shows the recaptured Source, all three levels, sounded and silent carriers, and any ordinary supplement link.",
  ),
  idea(
    "lesson26-ambiguity-mood-and-voice",
    "Keep real ambiguity; use the ordinary Mood and Voice choices",
    "An applicative Result can preserve more than one licensed typed Source interpretation when its object sequence does not settle the roles. Choose an intended Source only when later composition or actual context requires it; the surface spelling never decides the analysis. For wish, command or exhortation, admonition, passive, or impersonal composition, choose the ordinary Mood or Voice control after the applicative is complete. The shared owners derive the form and retain the licensed participant hierarchy. The clickable ambiguity, Mood, and Voice cue shows competing Sources, the selected Mood or Voice, and retained participants.",
  ),
  idea(
    "lesson26-object-interpretation-and-applicative-unit",
    "Choose only a real object interpretation or derivation-role alternative",
    "Choose human, nonhuman, reflexive, or another participant interpretation only where typed structure and context leave a genuine alternative. The application derives fixed readings, keeps deceptive same-surface analyses separate, and never uses an English gloss or Canvas stem as grammatical authority. Causative and applicative routes remain separate typed compositions even when their surfaces or translations are close. The applicative object stays linked to the applicative suffix as one discontinuous grammatical unit. The clickable interpretation cue shows participant type, Source and Result roles, deceptive ambiguity, suffix-object linkage, and any real role comparison.",
  ),
]);

export function isLesson26ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON26_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson26ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="26">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 26</span>
                      <small>Applicatives</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON26_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
