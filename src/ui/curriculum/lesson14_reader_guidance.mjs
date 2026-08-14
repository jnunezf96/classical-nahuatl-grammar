const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON14_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson14-use-stem-kinds",
    "Read the nounstem required by the construction",
    "An absolutive NNC uses the restricted-use nounstem. A possessive NNC or the embed part of a compound uses the general-use nounstem. Many nouns have the same shape in both uses; some do not.",
  ),
  idea(
    "lesson14-nounstem-classes",
    "Read class as a lexical fact",
    "A nounstem belongs to the tl, tli, in, or zero class. Spelling helps rule out impossible classes, but it does not determine lexical membership. Some nouns allow more than one class, and a supportive initial i may have a form without that i.",
  ),
  idea(
    "lesson14-number-and-derived-nounstems",
    "Keep subject number apart from stem meaning",
    "Number belongs to the personal-pronoun subject. A long-vowel reduplication inside the nounstem marks affinity or cohesion. A glottal-stop reduplication inside the nounstem presents members separately, in separate places, or as different kinds.",
  ),
]);

export function isLesson14ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON14_READER_GUIDANCE_GROUPS);
}

export function renderLesson14ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="14">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 14</span>
                      <small>Nounstem classes</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON14_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
