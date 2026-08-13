const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON9_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson9-optative-time-use",
    "Read optative time from meaning as well as form",
    "The optative characteristically expresses wishes or hopes. Its ordinary nonpast and general past have their own optative grammar. A future or preterit optative borrows the corresponding indicative form and is identified by its use; a preterit optative requires earlier-event ō.",
  ),
  idea(
    "lesson9-optative-vnc-formation",
    "Read the parts that build an optative VNC",
    "Nonpast and past optatives use the imperfective stem. Second-person forms use x or xi. A plural nonpast optative has its own number dyad. Class C and Class D stems also change their final stem shape or vowel length according to what follows.",
  ),
  idea(
    "lesson9-optative-indicative-contrast",
    "Use both form and sentence context to identify the mood",
    "Some optatives are visibly distinct from indicatives because of person, number, or stem form. Other forms are identical. When form alone is ambiguous, a first- or third-person optative requires an introductory particle, so the surrounding sentence identifies its optative use.",
  ),
]);

export function isLesson9ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON9_READER_GUIDANCE_GROUPS);
}

export function renderLesson9ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="9">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 9</span>
                      <small>Optative VNCs, wishes, and commands</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON9_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
