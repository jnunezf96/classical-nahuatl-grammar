const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON15_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson15-possessive-plural-assimilation",
    "Recover the stem before hu-ān",
    "Before possessive plural hu-ān, a final voiceless w disappears and a final n is normally assimilated, although spelling may retain n. Read nocuāhuān from cuāuh and tonāhuān or tonānhuān from nān; the change belongs to this exact boundary.",
  ),
  idea(
    "lesson15-suppletive-possessive-stems",
    "Read the authorized possessive replacement",
    "Some nouns use a different stem in possessive State, including tlāca, pillō, and tēucyō formations. Totēc is a special title. Historical totēcuiyo is not evidence for a native source stem *tēcu-i and must not create a new grammatical derivation.",
  ),
  idea(
    "lesson15-derived-nonanimate-and-possessor-reduplication",
    "Separate grammar number from relationship meaning",
    "An affinity or distributive nonanimate possessive predicate keeps common grammatical number even when English uses a plural translation. A repeated possessor repeats the possessive relation; it does not move plurality from the subject or create a general free reduplication rule.",
  ),
  idea(
    "lesson15-secondary-general-use",
    "Read an inner possessive relation as part of the stem",
    "A complete inner possessive predicate may be lowered into a secondary general-use stem. Its nonspecific human carrier may appear as tē, ti, or t only where the lexical analysis licenses that form. The outer NNC still has its own subject and possessor.",
  ),
  idea(
    "lesson15-analogical-restricted-use",
    "Follow the tla predicate into a new nounstem",
    "A complete possessive predicate with tla may be lowered into a new restricted-use nounstem with a matching general-use form. The source noun and the derived noun may coexist or the derived noun may replace it; that is lexical information, not a general spelling operation.",
  ),
  idea(
    "lesson15-reclassification-and-possessor-scope",
    "Read reclassification and possessor rank separately",
    "A licensed tl Subclass 2-A stem may lose its ephemeral i and become Subclass 1-A, after which its State selects the new connector. The possessor inside the NNC remains the nuclear possessor; any supplementary possessor belongs outside the NNC nucleus.",
  ),
]);

export function isLesson15ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON15_READER_GUIDANCE_GROUPS);
}

export function renderLesson15ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="15">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 15</span>
                      <small>Ordinary NNC conditions</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON15_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
