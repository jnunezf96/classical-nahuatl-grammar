const idea = (ideaId, title, guidance) => Object.freeze({ ideaId, title, guidance });

export const LESSON51_READER_GUIDANCE_GROUPS = Object.freeze([
  idea("lesson51-complementation-domain", "Complements begin with exact clause Results", "The shared composition owner joins typed clauses through a licensed semantic relation and exact reference graph. Formula, surface, lesson, and saved state remain descriptive only."),
  idea("lesson51-object-complements", "Object complements unify exact referents", "Change, material, designation, and state profiles preserve the principal object and complement referent. Reflexivity and category agreement are derived rather than display choices."),
  idea("lesson51-subject-complements", "Subject contact may pass through special structures", "Identity, composition, state, embedded possessors, agentive iyoh, and passive transformation remain distinct owner-validated contact profiles."),
  idea("lesson51-adverbial-complements", "Adverbial complement families keep their constraints", "Coverage, beginning, satisfaction, daring, cessation, tarrying, and relational lexical pairs retain exact reference, tense, and lexical evidence."),
]);

export function isLesson51ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON51_READER_GUIDANCE_GROUPS);
}

export function renderLesson51ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="51">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 51</span>
                      <small>Clause complementation</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON51_READER_GUIDANCE_GROUPS.map(group => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
