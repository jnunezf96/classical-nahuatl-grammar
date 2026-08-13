const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON7_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson7-verbstem-structure",
    "Read the verbstem as one meaningful unit",
    "A verbstem may contain one morph or several. Hyphens inside it mark internal morph boundaries, but the complete verbstem carries one unified lexical meaning. An internal morph can be grammatically real even when its separate meaning is unknown.",
  ),
  idea(
    "lesson7-verbcore-citation",
    "Read a verb together with its Valence",
    "Do not treat a cited verb as a valence-free stem. Its citation form identifies whether it is intransitive or requires a human, nonhuman, reflexive, or reciprocal object relationship.",
  ),
  idea(
    "lesson7-class-basis",
    "Read class as a stem relationship",
    "Class A, B, C, or D tells how the perfective stem relates to the imperfective stem, especially what happens to the imperfective stem's final vowel. Class is grammar, not merely a spelling label.",
  ),
  idea(
    "lesson7-perfective-class-forms",
    "Read what the perfective did to the stem",
    "Class A keeps the stem or licenses its short-vowel partner. Class B loses or silences its last vowel. Class C replaces final long ā with h. Class D adds h and shortens the vowel. A silent causative carrier still belongs to the grammar even when it is not printed.",
  ),
  idea(
    "lesson7-imperfective-class-forms",
    "Read stem shape from its surroundings",
    "The same imperfective stem can have a full, short, long, or truncated shape. Its class, mood, tense, subject number, and following morph determine the shape; the writer does not choose it freely.",
  ),
  idea(
    "lesson7-class-b-perfective-changes",
    "Read through Class B spelling changes",
    "After Class B loses or silences its last vowel, the exposed ending may be spelled differently: qu becomes c, c becomes z, hu becomes uh, cu becomes uc, m becomes n, and y becomes x or z. Traditional oa and ia spelling must not hide the underlying Class B stem.",
  ),
  idea(
    "lesson7-variable-class-membership",
    "Read a real class alternative as two valid analyses",
    "Some verbs license both Class A and Class B. Each choice has its own perfective result. This is a genuine grammatical choice, not uncertainty created by missing evidence.",
  ),
  idea(
    "lesson7-class-guidelines-one-four",
    "Use class guidelines without guessing",
    "Monosyllable shape, a consonant group before the last vowel, final ca, or final tla can determine a class. The stated exceptions remain exceptions, and the guidelines do not predict every verb in the language.",
  ),
  idea(
    "lesson7-class-guidelines-five-eight",
    "Combine form, meaning, and lexical class facts",
    "Change-of-state hua, final ya, final o or ō, and the listed Class D stems have distinct class rules. Meaning matters where Canvas says it matters, and a listed lexical membership is not replaced by surface guessing.",
  ),
]);

export function isLesson7ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON7_READER_GUIDANCE_GROUPS);
}

export function renderLesson7ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="7">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 7</span>
                      <small>Reading verbstems and their classes</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON7_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
