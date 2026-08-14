const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON11_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson11-irregularity-foundation",
    "Look for irregularity in the perfective stem or tense meaning",
    "An irregular VNC usually departs from the regular system in its perfective stem or in the match between a tense form and its meaning. An unusual tense or number ending is possible but uncommon.",
  ),
  idea(
    "lesson11-speech-criterion",
    "Judge irregularity by sound, not spelling",
    "A regular sound change remains regular even when its spelling looks surprising. For example, the perfective of ce-ya follows the sound rules already learned in Lessons 2 and 7; spelling alone does not make it irregular.",
  ),
  idea(
    "lesson11-perfective-stem-irregularity",
    "Read the two rare perfective-stem irregularities",
    "A compound may exceptionally change the class of its matrix stem, as ahco-cui gives ahco-uc or ahco-c. Some ti-stems instead allow regular t and irregular h perfectives. With mati, singular preterit or admonitive favors mah but may use mat; plural and distant-past forms use mat.",
  ),
]);

export function isLesson11ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON11_READER_GUIDANCE_GROUPS);
}

export function renderLesson11ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="11">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 11</span>
                      <small>Irregular VNCs</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON11_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
