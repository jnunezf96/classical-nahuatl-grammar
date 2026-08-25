const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId, title, guidance,
});

export const LESSON47_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson47-tzalan-huic-options-one-two",
    "tzalan and huic choose between two licensed Source shapes",
    "These families allow possessive or integrated-matrix formation. Possessor, nounstem, varietal, compound, negative, affective, and directional facts stay typed; option three is unavailable because the owner does not license it.",
  ),
  idea(
    "lesson47-ca-icpac-options-one-three",
    "ca and icpac link Sources with connective t",
    "Possessive option one and linked option three share one relational owner. The linked Source, connective boundary, temporal or modifier context, and retained Source history remain explicit; integrated option two is not licensed.",
  ),
  idea(
    "lesson47-tech-options-one-two-three",
    "tech licenses all three relational formations",
    "Possessive, integrated-matrix, and connective-t Sources remain distinct operations. Nounstem or compound identity, assimilation, affective continuation, and boundary behavior are derived from the exact selected formation.",
  ),
  idea(
    "lesson47-tlan-options-one-two-three",
    "tlan preserves body-part and compound Source history",
    "All three formations are available, but each Source still carries its nounstem, body-part, compound, affective, and directional restrictions. A final written stem never replaces that typed history.",
  ),
  idea(
    "lesson47-pan-options-one-two-three",
    "pan carries formation history into continuation",
    "Possessive, integrated, and linked pan Sources retain number-connective, body-part, nepan, direction, metaphor, and subject facts. A verbal continuation consumes the exact owner-issued Result rather than a retyped surface.",
  ),
  idea(
    "lesson47-associated-entity",
    "Associated entity consumes an exact relational Result",
    "The upstream relational Source remains identifiable. Final co or c is replaced canonically where required before ca is attached, and the resulting NNC is explicitly not a gentilic derived from a spelling pattern.",
  ),
  idea(
    "lesson47-pertinency",
    "Pertinency has two exact Result-to-owner entrances",
    "A direct relational Result or an associated-entity Result can enter pertinency. The upstream identity and outer state remain distinct, and an embedded possessor cannot silently determine the outer NNC state.",
  ),
]);

export function isLesson47ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON47_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson47ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="47">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 47</span>
                      <small>Mixed-option relational nounstems</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON47_READER_GUIDANCE_GROUPS.map(group => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
