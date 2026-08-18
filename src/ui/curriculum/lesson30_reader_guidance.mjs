const freeze = value => {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freeze);
  return Object.freeze(value);
};

const idea = (ideaId, title, guidance) => freeze({ ideaId, title, guidance });

export const LESSON30_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson30-nominal-embed-foundation-and-object-valence",
    "Choose the two Sources and their relation; the compound follows",
    "Choose Nominal embedding, the typed NNC and VNC Sources, and object, adverb, or complement only where more than one relation is genuinely possible. The application uses the noun's general-use stem, preserves both Source shapes and their internal boundary, and derives the compound through the one canonical VNC path. Object incorporation removes exactly one object position; adverb and complement incorporation do not use this object rule. The clickable cue shows both stems, the realized nounstem, relation, boundary, and before-and-after valence. Canvas examples prove the grammar and never limit which compatible Sources you may enter.",
  ),
  idea(
    "lesson30-single-object-incorporation",
    "One incorporated object automatically makes the matrix intransitive",
    "With a typed single-object matrix, the incorporated NNC satisfies its only object position. The application removes that object carrier, keeps the finite subject, derives an intransitive compound, and preserves the complete Source analysis. There is no object-pronoun or valence switch. The resulting canonical VNC can be used by Later derivation in the ordinary way. The clickable cue shows the incorporated role, missing object carrier, retained subject, intransitive Result, and continuation. Special example meanings remain reading facts, not controls or stem admission rules.",
  ),
  idea(
    "lesson30-higher-valence-object-incorporation",
    "Consume one typed object level and keep every other participant",
    "With a double- or triple-object matrix, incorporation consumes the typed object level matched by the NNC and leaves every other object in its original governor and derivational level. A double-object Source therefore yields one remaining object; a triple-object Source yields two. The structurally determined role is automatic. An object-role choice appears only if the typed Source itself leaves more than one compatible match. The clickable cue shows the consumed role, remaining nuclear objects, shuntline structure, one-level valence reduction, boundaries, and Later-derivation availability. Examples never become role or stem lists.",
  ),
]);

export function isLesson30ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON30_READER_GUIDANCE_GROUPS);
}

export function renderLesson30ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="30">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 30</span>
                      <small>Nominal embeds</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON30_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
