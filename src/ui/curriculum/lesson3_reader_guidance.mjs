const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON3_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson3-particle-structure-and-identity",
    "Recognize particles as their own kind of word",
    "A particle is normally a small, single-part item. Read its attachment and stress as part of its grammar. Do not turn an uncertain historical origin into a different grammatical analysis without clear proof.",
  ),
  idea(
    "lesson3-particle-use-and-structural-limits",
    "Read a particle by the job it can do",
    "A particle may modify, introduce, or express a reaction, but it is not a matrix stem and is not normally a principal clause. Use its sentence position and licensed function to interpret it.",
  ),
  idea(
    "lesson3-clause-introducing-particles",
    "Use each clause introducer for its own force",
    "Read ca, cuix, tlā, mā, and ō as clause introducers with different meanings. The English wording helps explain the force, but the Nahuatl particle and its place before the clause remain the grammatical structure.",
  ),
  idea(
    "lesson3-adjunctor-in",
    "Read in as an adjunctor, not an article",
    "The particle in can mark one item or a longer unit as adjoined, and its use is usually optional. English may translate it as the, a, who, that, when, or something else, but those English words do not make in a determiner.",
  ),
  idea(
    "lesson3-conjunctor-auh",
    "Use context to read auh",
    "The particle auh joins sentence units. English may use and or but according to the context, while Nahuatl keeps the same conjunctor.",
  ),
  idea(
    "lesson3-adverbial-particles",
    "Read adverbial particles with their tense and position",
    "Use each adverbial particle's own meaning and sentence position. Let tense distinguish readings such as ye 'already' or 'soon' and quin 'just now' or 'presently'; keep bound ō# attached to a licensed past form.",
  ),
  idea(
    "lesson3-interjections-and-vocative",
    "Read interjections through speaker and situation",
    "Use the situation, expressive force, repetition, and any speaker restriction to identify an interjection. Keep the stressed vocative e attached to the name or nominal expression before it.",
  ),
  idea(
    "lesson3-negative-particle-prefixes",
    "Recover the negative prefix from its environment",
    "Read ah# and ca# as the same negative job in different environments. Use the preceding mā, tlā, or mah and the kind of sentence to recover the right form, and attach the negative prefix to the item on its right.",
  ),
  idea(
    "lesson3-particle-collocations",
    "Read particle combinations in their fixed order",
    "Keep the members separate and in their witnessed order while reading the combination as one grammatical unit. Its full meaning may not be predictable from the individual particles, and English words such as and or but need not belong to any one member.",
  ),
  idea(
    "lesson3-honorificized-particles",
    "Recognize honorific meaning on a particle combination",
    "Read tzin on a single particle or on the final member of a particle combination as making the particle expression honorific. The English translation may state the basic meaning without fully showing the respect or esteem carried by the Nahuatl form.",
  ),
]);

export function isLesson3ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON3_READER_GUIDANCE_GROUPS);
}

export function renderLesson3ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="3">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 3</span>
                      <small>Reading particles and their sentence jobs</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON3_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
