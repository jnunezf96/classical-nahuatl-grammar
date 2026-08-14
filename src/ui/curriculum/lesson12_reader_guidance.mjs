const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON12_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson12-state-and-absolutive-formula",
    "Read an absolutive NNC as subject plus nounstem predicate",
    "State replaces the VNC Valence position. In an absolutive NNC, State is vacant: there is no possessor pronoun, and the nounstem serves as the predicate inside #pers¹-pers²(STEM)num¹-num²#.",
  ),
  idea(
    "lesson12-subject-number-connectors",
    "Keep the number connector with the subject",
    "The NNC subject uses person morphs like a VNC subject, but its number connector is sensitive to State and noun class. The connector belongs to the subject, not the nounstem predicate. Its supportive vowels and l-plus-tli assimilation are automatic.",
  ),
  idea(
    "lesson12-absolutive-subject-paradigm",
    "Recognize the complete absolutive subject paradigm",
    "Singular or common subjects use one of four noun-class shapes; plural subjects use one of three. Person and number choose the subject row, while the nounstem's typed class supplies the correct connector. The connector is never a separate grammatical choice.",
  ),
  idea(
    "lesson12-nounstem-predicate-and-translation",
    "Read the nounstem as a predicate",
    "The nounstem identifies, describes, or locates the subject. It does not itself mark tense, definiteness, or indefiniteness. English tense and articles must come from the surrounding context.",
  ),
  idea(
    "lesson12-animacy-reference-and-number",
    "Read number as part of the subject",
    "Actual subject reference decides animacy. Animate reference allows singular or plural; nonanimate reference uses common number unless a deliberate metaphorical reading changes the reference. Number belongs to the subject, never to the nounstem.",
  ),
  idea(
    "lesson12-state-selection-freedom",
    "Choose State unless the nounstem is exceptional",
    "Most nounstems allow either absolutive or possessive State. Only typed lexical knowledge may restrict the choice; a restricted case is shown simply as an exception.",
  ),
]);

export function isLesson12ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON12_READER_GUIDANCE_GROUPS);
}

export function renderLesson12ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="12">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 12</span>
                      <small>Absolutive NNCs</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON12_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
