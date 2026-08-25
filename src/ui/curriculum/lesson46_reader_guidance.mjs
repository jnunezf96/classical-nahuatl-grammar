const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId, title, guidance,
});

export const LESSON46_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson46-option-two-system",
    "Option two integrates Source and relational matrix",
    "A typed embedded nounstem enters a licensed relational matrix as one NNC. Source kind, state, and boundary remain explicit; the relational matrix is neither a detachable suffix nor a preposition inferred from translation.",
  ),
  idea(
    "lesson46-locative-n-source-formations",
    "Locative n consumes exact upstream Sources",
    "Ordinary nounstems, preterit-agentive and active-action Results, and interrogative or modified Sources reach locative n through their owners. Participant mapping and supportive i follow the exact Source rather than reconstructed spelling.",
  ),
  idea(
    "lesson46-locative-n-predicate-state",
    "Predicate voice determines locative state",
    "Imperfect active, passive, impersonal, incorporated-adverb, and yohua Sources preserve their typed voice and participant structures. The locative owner derives absolutive or possessive state; it is not an independent correction choice.",
  ),
  idea(
    "lesson46-yan-perfective-locatives",
    "yan begins with an exact perfective Result",
    "Perfective, incorporated-perfective, and tla-impersonal Sources enter yan through canonical Result handoff. Subject-to-possessor transfer or absolutive state follows the selected upstream branch without stem-string reconstruction.",
  ),
  idea(
    "lesson46-tlah-abundance-place",
    "tlah keeps its typed abundance Source",
    "Ordinary and varietal nounstems can supply the abundance-place relation where licensed. Source variety, state, affective continuation, and boundary remain visible and are not generalized from an English place expression.",
  ),
  idea(
    "lesson46-co-c-specific-location",
    "co or c is a boundary result",
    "The Source edge selects ordinary co or c realization. Fire, temporal-yo, nested location, body-part, and affective-replacement facts remain typed exceptions or Source histories; spelling after generation never selects the variant.",
  ),
  idea(
    "lesson46-bodypart-location-combinations",
    "Body-part Sources remain nounstems inside location",
    "Body-part identity, state, participant structure, and co/c boundary are composed by the shared relational owner. Contextual location readings do not turn these NNCs into compound prepositions.",
  ),
  idea(
    "lesson46-ca-pa-direction-frequency",
    "Typed Source kind separates ca and pa functions",
    "The Source distinguishes ca interval from locative c and pa direction from pa frequency. Nested relational and can compounds and frequency assimilation are licensed route behavior, not disambiguation from translated meaning.",
  ),
  idea(
    "lesson46-fixed-and-restricted-matrices",
    "Each restricted matrix keeps its Source license",
    "nal, chi, downward ic, and teuh admit only their fixed, preferred, or explicitly exceptional Source kinds. Productivity elsewhere in the option-two system cannot silently broaden one of these matrices.",
  ),
  idea(
    "lesson46-numeral-modified-locations",
    "A numeral modifier must first be adverbialized",
    "The numeral and location Sources are typed independently. The numeral enters through its canonical adverbial operation before modifying a co/c location; the resulting translation remains descriptive rather than grammatical authority.",
  ),
]);

export function isLesson46ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON46_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson46ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="46">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 46</span>
                      <small>Option-two relational nounstems</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON46_READER_GUIDANCE_GROUPS.map(group => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
