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
  idea(
    "lesson11-form-meaning-dislocation",
    "Read the meaning separately from the tense form",
    "Some VNCs use a preterit-shaped form for present meaning and a distant-past-shaped form for ordinary past meaning. The application therefore starts from the intended time meaning and supplies the required form; it does not insert the antecessive ō into a preterit-as-present form.",
  ),
  idea(
    "lesson11-positional-verbs",
    "Recognize standing, lying, and hanging as positional paradigms",
    "Ih-ca means to stand, on-o means to lie, and pil-ca means to hang. Their present forms are preterit-shaped and their ordinary past forms are distant-past-shaped. The on of on-o belongs inside that verbstem except when o is selected as the matrix of a connective-t construction.",
  ),
  idea(
    "lesson11-defective-a",
    "Read defective ā as present or absent",
    "The defective verb ā has only a preterit-shaped paradigm. Its positive forms mean to be present and its negative forms mean to be absent. The negative uses ah- or ay- according to participant, with ayāc preferred for third-person singular and ahāc also attested; Canvas writes ayoc āc as separate words and records traditional ayocac.",
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
