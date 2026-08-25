const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId, title, guidance,
});

export const LESSON44_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson44-domain-and-degree-system",
    "Adverbial potential comes before degree",
    "A typed VNC, absolutive NNC, or possessive NNC enters the adverbial owner only when its lexical or productive Source licenses adverbial function. First and second degree are operations on that Source; they are not free labels applied to any clause.",
  ),
  idea(
    "lesson44-lexicalized-vnc-adverbials",
    "Lexicalized VNC adverbials keep their Source histories",
    "The VNC inventory preserves state slots, lexical contrasts, required collocations, obsolete status, and written boundaries. Similar spelling or an English adverb gloss does not extend the inventory or authorize a new Source.",
  ),
  idea(
    "lesson44-nnc-degree-formations",
    "NNC degree changes a typed subject operation",
    "First degree preserves the licensed Source shape. Second degree replaces the sounded num1 contribution with a silent one where that operation is licensed. Absolutive and possessive states remain distinct and no string is edited after generation.",
  ),
  idea(
    "lesson44-particle-looking-nnc-system",
    "Particle-looking forms remain nuclear clauses",
    "Nel, huel, nēn, mō, cuēl, mach, and quēn retain NNC identity. Negative particles, rhetorical questions, fused in, sentence position, and collocations are contextual operations or lexical facts—not evidence that the Source is a particle.",
  ),
  idea(
    "lesson44-other-absolutive-inventory",
    "One potential gate serves many semantic domains",
    "Time, duration, place, manner, and degree Sources use the same typed adverbial path. Lexical status, stress partners, and boundary facts are visible, while uncertain collocations remain evidence rather than generation authority.",
  ),
  idea(
    "lesson44-preterit-agentive-adverbials",
    "Productive adverbialization consumes an exact prior Result",
    "The general-use preterit-agentive route begins with the canonical Deverbal owner. Its exact Result—not raw segments or a copied object—enters the adverbial owner, preserving regular, obsolete, root-plus-ya, transitive, reflexive, and irregular Source distinctions.",
  ),
  idea(
    "lesson44-possessive-state-adverbials",
    "Possessive state remains visible and first-degree",
    "Possessive adverbial Sources keep their possessor and analysis history. Their first-degree restriction is enforced by the Source potential. Conjectural, conflicting, or lexicalized analyses remain read-only and cannot authorize a second-degree Result.",
  ),
  idea(
    "lesson44-incorporated-adverbials",
    "Incorporation is an exact Result-to-owner handoff",
    "When licensed, the adverbial Source enters the canonical nominal-embed VNC path. The external subject is discarded, the incorporated stem and internal boundary are recomputed, and compound-only Sources remain unavailable as external clauses.",
  ),
]);

export function isLesson44ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON44_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson44ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="44">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 44</span>
                      <small>Adverbial nuclear clauses</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON44_READER_GUIDANCE_GROUPS.map(group => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
