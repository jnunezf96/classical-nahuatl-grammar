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
