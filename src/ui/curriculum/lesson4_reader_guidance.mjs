const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON4_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson4-nuclear-clause-identity-and-use",
    "Read the whole form as a clause",
    "Except for particles, a Nahuatl vocable is a nuclear clause with a subject and a predicate. Do not reduce it to an English-style word merely because English may translate it with one word. The same nuclear clause can stand as a sentence or take a main, dependent, or conjoined clause role.",
  ),
  idea(
    "lesson4-vnc-and-nnc-kinds",
    "Find the kind of predicate",
    "A verbal nuclear clause has a verbal predicate. A nominal nuclear clause has a nominal, adjectival, or adverbial predicate. An English translation with is does not add a separate Nahuatl copula to the structure.",
  ),
  idea(
    "lesson4-basic-formula-and-slots",
    "Read the formula as subject plus predicate",
    "The formula shows a rigid sequence of positions around a stem. First identify what information each position carries, such as person or number, and then identify the morpheme or morph that fills it.",
  ),
  idea(
    "lesson4-vnc-nnc-structure-and-hierarchy",
    "Read outward from the stem",
    "The stem is the foundation. In a VNC, valence and stem make the verbcore, the verbcore and tense make the predicate, and subject plus predicate make the VNC. In an NNC, state and stem make the nouncore or predicate, and subject plus predicate make the NNC.",
  ),
  idea(
    "lesson4-six-formula-shapes",
    "Let the grammar select the formula shape",
    "Person and number each have two subpositions, tense has one, and valence or state may have two, one, or no written position. An absent written position can still represent grammar that is implicitly present; it does not mean that the grammatical relationship has no realization.",
  ),
  idea(
    "lesson4-personal-pronoun-system",
    "Read pronouns from their affixes and context",
    "Nahuatl personal pronouns are affixes. Read person, animacy, humanness, number, and case together. Third person and common number may require context, and English gender choices belong to translation rather than Nahuatl pronoun grammar.",
  ),
]);

export function isLesson4ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON4_READER_GUIDANCE_GROUPS);
}

export function renderLesson4ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="4">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 4</span>
                      <small>Reading nuclear clauses and their formulas</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON4_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
