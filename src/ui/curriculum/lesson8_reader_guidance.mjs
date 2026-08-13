const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON8_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson8-vnc-expansion-boundary",
    "Read the VNC boundary before its modifiers",
    "Direction or location belongs inside the VNC. Earlier-event ō and negative ah or ca stand outside it. All three modify the predicate or clause, but they do not occupy the same grammatical position.",
  ),
  idea(
    "lesson8-direction-location",
    "Read on and huāl as meaningful direction or location",
    "On marks distance, movement away, or location there; huāl marks proximity, movement toward, or location here. They remain meaningful even when translation does not state them literally. Their position and neighboring spelling reveal their place inside the VNC.",
  ),
  idea(
    "lesson8-antecessive-order",
    "Read ō as an earlier-event modifier",
    "Antecessive ō stands outside a past-tense VNC and shows that its event comes before another event. It is optional where licensed and is not simply the Nahuatl equivalent of the English word already.",
  ),
  idea(
    "lesson8-negative-scope",
    "Read the negative over its full scope",
    "Negative ah stands outside the VNC and modifies the complete VNC or its modifier group. When antecessive ō is present, ah comes before it. Negative ca follows the same scope pattern but requires its own grammatical trigger.",
  ),
  idea(
    "lesson8-sentence-and-transformation",
    "Read the sentence as a complete grammatical unit",
    "A written sentence begins with a capital and ends with punctuation that reflects its use. A basic sentence is a positive assertion; other sentence uses transform one or more basic sentences by adding, replacing, moving, or deleting grammatical material.",
  ),
  idea(
    "lesson8-affirmative-assertion",
    "Read a positive statement from its nuclear clause",
    "A simple positive statement contains one nuclear clause, with optional modifiers around it. A verbal nuclear clause must be indicative. Its period and capitalization present the clause as a complete written statement.",
  ),
  idea(
    "lesson8-negative-assertion",
    "Read a negative statement as a transformed assertion",
    "Negative ah changes a positive assertion into a negative one but remains outside the VNC. The VNC itself keeps its grammatical structure while the negative takes scope over the statement.",
  ),
  idea(
    "lesson8-emphatic-assertion",
    "Read emphatic ca separately from polarity",
    "Sentence-initial ca makes an assertion emphatic. A negative assertion can also be emphatic: ca comes before the negative element, so emphasis and negation remain two different grammatical contributions.",
  ),
  idea(
    "lesson8-intonation-question",
    "Read a yes-no question without requiring a particle",
    "A positive or negative assertion can become a yes-no question through its intonation. In writing, the question mark shows this change; no interrogative particle must be present.",
  ),
]);

export function isLesson8ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON8_READER_GUIDANCE_GROUPS);
}

export function renderLesson8ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="8">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 8</span>
                      <small>Expanding the VNC and building sentences</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON8_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
