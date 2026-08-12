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
