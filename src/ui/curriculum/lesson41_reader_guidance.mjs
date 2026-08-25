const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId,
  title,
  guidance,
});

export const LESSON41_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson41-reduplicative-intensification",
    "Reduplication keeps its typed shape and scope",
    "Long-vowel reduplication can intensify an adjectival Result, while glottal reduplication keeps its distributive or varietal relation to plural or differentiated referents. These are owner-issued VNC operations, not repeated-string guesses. A choice appears only where more than one licensed formation or scope remains open.",
  ),
  idea(
    "lesson41-compound-matrix-intensification",
    "Compound intensifiers use the ordinary compound owner",
    "Pah-ti-c, cal-ti-c, tzon-ti-c, their licensed expansions, and compatible adjectival embeds enter the same typed compound-NNC operation. Embed and matrix Results, order, class, and bracketing remain explicit. Lesson 41 adds no intensifier engine and no stem whitelist.",
  ),
  idea(
    "lesson41-affective-and-metaphorical-intensification",
    "Affective matrices alter degree without becoming grammar authority",
    "Pōl can increase intensity; pil, tōn, and tzin can decrease it or add affective evaluation. The affective-NNC owner preserves the typed embed and matrix. Metaphor, simile, and English translation guide interpretation only: none can authorize morphology or select a Source.",
  ),
  idea(
    "lesson41-incorporated-adverb-and-supplement-source",
    "Translation does not reverse grammatical authority",
    "Adjectival Results from incorporated-adverb VNCs retain the exact embed role, matrix predicate, and same-entity or different-entity reference relation. English may reverse the apparent governor and governed, but the typed matrix remains the matrix and the embed never becomes the grammatical subject or agent.",
  ),
  idea(
    "lesson41-incorporated-complement-object-and-patientive",
    "Equal-looking Results can preserve different Source histories",
    "Incorporated complement, incorporated object, passive-adverbial, and patientive derivations may converge visibly. They do not collapse grammatically. The exact owner-issued Source history, voice, participants, and patientive Result remain attached; surface morphology alone cannot choose among them.",
  ),
  idea(
    "lesson41-denominal-compound-preterit-function",
    "The compound to denominal to agentive chain stays ordered",
    "A compound NNC can supply the typed nounstem for a denominal-ti VNC, whose exact VNC Result can then supply a preterit-agentive NNC in adjectival function. Each owner completes its own operation in order. The final spelling never licenses or reconstructs the earlier stages.",
  ),
  idea(
    "lesson41-adjectival-and-numeral-compound-embeds",
    "Adjectival and numeral embeds remain single-nucleus compounds",
    "Ordinary, possessive, preterit-agentive, and numeral NNC material may serve as a typed compound embed. The compound owner preserves embed identity, matrix authority, possessor orientation, and bracketing. This is a single-nucleus compound, not the multiple-nucleus modification developed in Lessons 42 and 43.",
  ),
]);

export function isLesson41ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON41_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson41ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="41">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 41</span>
                      <small>Intensified and compound adjectival NNCs</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON41_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
