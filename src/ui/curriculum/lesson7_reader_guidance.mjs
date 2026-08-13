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
