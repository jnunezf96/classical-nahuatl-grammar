const idea = (ideaId, title, guidance) => Object.freeze({ ideaId, title, guidance });

export const LESSON49_READER_GUIDANCE_GROUPS = Object.freeze([
  idea("lesson49-simple-adverbial-modification", "Adjunction begins with exact units", "Capture an owner-issued principal Result and adjoined Result, then choose only a licensed relation, degree, and order. The owner derives the formula and finite surface."),
  idea("lesson49-multiple-nucleus", "A simple relation may contain several nuclei", "Multiple nucleus units retain their own roles inside one typed structure. The interface shows the composition without flattening the captured Results."),
  idea("lesson49-head-recursion-and-interrogatives", "Recursion continues exact Results", "An exact adjunction Result may become the head of another relation. Inherent or particle-supported interrogative force remains attached to its typed source rather than punctuation."),
  idea("lesson49-modifier-recursion-and-collocations", "Spelling does not decide recursive structure", "Recursive modifiers and particle-adverbial collocations preserve their scope. Traditional solid spelling and English word order are reading evidence only."),
  idea("lesson49-intensifiers", "Intensifiers retain scope and polarity", "A licensed intensifier applies to an exact structure and does not erase its inner relation, polarity, or Result identity."),
  idea("lesson49-modifier-internal-and-apposition", "Internal recursion, apposition, and conjunction differ", "Similar surfaces may represent different typed relations. The selected analysis remains bounded by the captured units and the canonical owner."),
  idea("lesson49-both-side-recursion", "Both sides may carry derivational history", "Exact recursive Results can occur on both sides of an outer relation. Neither history is rebuilt from a formula, surface, saved answer, or copy."),
  idea("lesson49-adverbial-principal-rank", "Adverbial units may become principal", "A licensed adverbial clause or NNC can occupy principal rank. Interrogative upgrade, adjunctor, and force retention follow the typed construction."),
]);

export function isLesson49ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON49_READER_GUIDANCE_GROUPS);
}

export function renderLesson49ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="49">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 49</span>
                      <small>Adverbial modification</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON49_READER_GUIDANCE_GROUPS.map(group => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
