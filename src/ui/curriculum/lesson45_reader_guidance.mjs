const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId, title, guidance,
});

export const LESSON45_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson45-relational-nounstem-domain",
    "Relational forms are nounstems, not prepositions",
    "The Source is a typed relational NNC. Context can express participant role, locale, Source, goal, or path, but an English preposition-like translation does not create a morphological slot or authorize generation.",
  ),
  idea(
    "lesson45-four-usage-options",
    "Four formations reuse one relational Source",
    "Simple possessive, integrated matrix, connective-t linked, and compound-embed formations are licensed operations on a relational nounstem. The selected stem family determines which formations are possible and how its boundary is realized.",
  ),
  idea(
    "lesson45-five-option-groups",
    "The stem license controls available formations",
    "Every relational stem belongs to one of five option groups. Controls show only the formations licensed by that exact group; similar spelling, meaning, or translation cannot make an unavailable option grammatical.",
  ),
  idea(
    "lesson45-option-one-only-stems",
    "Option one preserves relational ownership",
    "Huān, tloc, pal, and c/ic take a possessive Source. Their possessor, reciprocal behavior, affective availability, and any fixed-participant restriction remain typed grammar facts rather than surface corrections.",
  ),
  idea(
    "lesson45-ic-semantic-functions",
    "One c/ic owner supports several contextual functions",
    "Means, purpose, reason, and time readings preserve the same relational identity and fixed third-common possessor. The contextual function changes interpretation without creating four homonymous grammar engines.",
  ),
  idea(
    "lesson45-ic-clause-distribution",
    "Clause context constrains ic without replacing it",
    "Initial interrogation, noninitial placement, negation, adjunct presence, and fusion with in are validated together. Position and punctuation alone do not authorize a use, and the relational Source remains unchanged.",
  ),
  idea(
    "lesson45-ic-adverb-degree-measurement",
    "Special uses are projections of the shared Source",
    "Ordinal, adverbial, degree, and measurement uses combine the typed c/ic Source with licensed modifiers. Their interpretations remain contextual projections, not separate owners inferred from translated labels.",
  ),
]);

export function isLesson45ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON45_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson45ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="45">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 45</span>
                      <small>Relational nounstems</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON45_READER_GUIDANCE_GROUPS.map(group => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
