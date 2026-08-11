const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON1_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson1-foundation-dependency-model",
    "Lesson 1 is a foundation",
    "Treat Lesson 1 as a foundation; later lessons supply the specific grammar.",
  ),
  idea(
    "language-specific-grammar-boundary",
    "Read the language on its own terms",
    "Approach Classical Nahuatl through its own patterns, while using careful comparison and practice to resist habits carried over from another language.",
  ),
  idea(
    "terminology-and-transfer-boundary",
    "Use grammar to resist language transfer",
    "Use precise grammatical terms and structural analysis so that a familiar translation does not replace the grammar of the source language.",
  ),
  idea(
    "linguistic-communication-source-model",
    "Understand the act of communication",
    "Read an expression as communication joining participants, information, and a shared medium governed by shared rules.",
  ),
  idea(
    "analysis-level-model",
    "Keep type, token, and instance distinct",
    "Distinguish the abstract pattern, its contextual representation, and its concrete occurrence when analyzing a form.",
  ),
  idea(
    "carrier-content-element-model",
    "Separate carrier from content",
    "Analyze the medium that carries an expression separately from the meaning or function carried by it, while preserving their relationship.",
  ),
  idea(
    "morpheme-model",
    "Recognize the morpheme",
    "Treat a morpheme as a meaningful union of carrier and content, not as spelling, sound, or meaning alone.",
  ),
  idea(
    "token-realization-model",
    "Identify token-level realizations",
    "Use the proper token-level unit for each system and keep conditioned variants tied to the type they represent.",
  ),
  idea(
    "instance-and-silent-contrast-model",
    "Recognize instances and silent contrasts",
    "Distinguish concrete sounds, letters, meanings, and forms while allowing a meaningful contrast to have no sounded realization.",
  ),
  idea(
    "level-element-matrix-model",
    "Keep levels and elements aligned",
    "Use the level-and-element matrix to prevent types, tokens, instances, carrier units, and content units from being confused with one another.",
  ),
  idea(
    "structural-rank-and-composition-model",
    "Read structure by rank and composition",
    "Identify how roots, stems, clauses, particles, and groups combine, change rank, and preserve their structural boundaries.",
  ),
  idea(
    "governance-and-participant-model",
    "Follow governance and participant roles",
    "Interpret a structure through the relations among its parts, including what governs, what is governed, and which participant fills each role.",
  ),
  idea(
    "translation-and-lexical-provenance-boundary",
    "Do not mistake translation for analysis",
    "Use the Classical Nahuatl form, its structure, and its lexical history as the basis of interpretation; treat translations as aids, not grammatical substitutes.",
  ),
]);

export function isLesson1ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON1_READER_GUIDANCE_GROUPS);
}

export function renderLesson1ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="1">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 1</span>
                      <small>Foundations for reading and interpretation</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON1_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
