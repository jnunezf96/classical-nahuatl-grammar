const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON5_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson5-intransitive-vnc-structure",
    "Read the intransitive VNC around its stem",
    "The subject begins before the stem and finishes after the predicate. An intransitive VNC has no written object filler, but its Valence position is still grammatically present and vacant.",
  ),
  idea(
    "lesson5-morph-carrier-and-spelling",
    "Keep a morph apart from its carrier",
    "A morph joins grammatical content to a spoken, written, or silent carrier. Different spellings do not necessarily mean different morphs. In Andrews's repertories, a slash separates spellings and a tilde separates real morphic variants.",
  ),
  idea(
    "lesson5-subject-person-fillers",
    "Recover subject person from pers1 and num2",
    "Read pers1 together with the final number suffix. The same t or ti can belong to second singular or first plural, supportive i appears before a consonant, second-person optative uses x or xi, and second-plural am changes with the following sound.",
  ),
  idea(
    "lesson5-subject-case-filler",
    "Read the silent nominative in pers2",
    "The subject's nominative case is always present in pers2. Its carrier is zero, so it is grammatically real even though it contributes no written sound.",
  ),
  idea(
    "lesson5-subject-number-connector",
    "Read num1 as the number bridge",
    "Num1 joins the predicate to the final number carrier. Its zero, c, qu, qui, square-zero, and t forms belong to the subject's number dyad; they are not tense endings of the predicate.",
  ),
  idea(
    "lesson5-subject-number-suffix",
    "Read definitive number in num2",
    "Num2 gives the subject's final number value. Zero marks singular or common number, while h, eh, ān, in, and the ih subvariant mark plural in their licensed mood-and-tense settings.",
  ),
  idea(
    "lesson5-subject-paradigms",
    "Read the whole distributed subject",
    "Read pers1, pers2, num1, and num2 together. The four subject patterns follow from mood and tense, while third-person common number needs context to distinguish he, she, it, or nonanimate they.",
  ),
  idea(
    "lesson5-verbstem-categories",
    "Read the categories carried by the verbstem",
    "The verbstem carries lexical meaning and organizes valence, voice, and aspect. Active and imperfective stems are basic sources; nonactive and perfective shapes remain required even when their formation must be learned with the verb.",
  ),
  idea(
    "lesson5-mood-tense-system",
    "Keep mood, tense, aspect, and time apart",
    "Mood gives the speaker's attitude, tense is grammatical, and aspect selects the appropriate stem. A tense may allow several translations, and grammatical present can refer to past time when context requires it.",
  ),
]);

export function isLesson5ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON5_READER_GUIDANCE_GROUPS);
}

export function renderLesson5ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="5">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 5</span>
                      <small>Reading intransitive subjects and their carriers</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON5_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
