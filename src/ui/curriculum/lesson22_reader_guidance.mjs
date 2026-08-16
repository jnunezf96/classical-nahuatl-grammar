const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON22_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson22-inherently-impersonal-vncs",
    "Read an inherently impersonal VNC as agentless, not subjectless",
    "Enter the lexical stem and use the familiar tense or sentence form. Known Canvas examples carry their inherent-impersonal analysis automatically; for another intransitive Source, choosing the lexically impersonal formation supplies that analysis without consulting a stem list. The application then supplies its fixed third-person singular grammatical subject. That subject names nobody: it is a grammatical fiction, so the VNC is agentless but not missing a subject. Follow the clickable subject cue to see the analysis and event reading.",
  ),
  idea(
    "lesson22-nonanimate-versus-impersonal-subjects",
    "Separate a nameable nonanimate subject from an empty impersonal subject",
    "Both constructions can show third-person singular morphology, but they do not have the same subject. An ordinary nonanimate subject refers to one or more identifiable things, has common number, and can receive a supplement. An impersonal subject refers to nothing and cannot be supplemented. Supply the actual referent or supplement when one is intended; never use a missing visible supplement as an impersonal choice. The clickable subject cue shows referent identity, common number, and supplementability automatically.",
  ),
  idea(
    "lesson22-transformed-impersonal-voice",
    "Let impersonal voice replace the source subject automatically",
    "Compose the active Source first and choose impersonal voice only when the Voice control offers it. The application removes the personal source subject, installs a faceless third-person singular subject, and derives the licensed nonactive stem. Intransitive, nonspecific-object, and reflexive Sources can qualify; a specific projective object is blocked rather than repaired as passive. Do not choose subject replacement, nonactive formation, or a general-human reading separately. The clickable transformation cue shows what changed and keeps passive voice distinct.",
  ),
  idea(
    "lesson22-impersonal-formula-and-intransitive-irregular-results",
    "Keep the source formula while the subject and stem change",
    "Choose the familiar tense, mood, and sentence options. The application keeps the active Source's intransitive or transitive formula shape, replaces its personal subject with the fixed impersonal subject, and uses the owner-issued nonactive stem. The old subject leaves no recoverable surface trace. Irregular verbs keep the Lesson 11 tense and meaning dislocation automatically. The clickable formula cue shows the preserved valence, imported subject, stem change, and inherited irregular behavior without adding extra switches.",
  ),
  idea(
    "lesson22-nonspecific-object-retention-and-readings",
    "Retain tē and tla, then choose only a genuinely open reading",
    "Build the active Source with its nonspecific human tē, nonhuman tla, or both, then choose impersonal voice. The application keeps those object carriers and their typed roles unchanged. When the same completed formula genuinely supports several intended readings, the Reading control offers only those licensed interpretations; choosing one never rewrites the morphology. The clickable object cue identifies every retained carrier and the selected or still-open reading.",
  ),
  idea(
    "lesson22-reflexive-source-to-ne",
    "Let a reflexive Source become impersonal ne",
    "Compose the reflexive Source and choose impersonal voice. The application automatically changes the reflexive carrier to shuntline ne, installs the fixed impersonal subject, and retains any separate tē or tla object. Ne does not add a participant. Reflexive versus reciprocal remains a choice only when the plural active Source truly licenses both. The clickable ne cue traces the automatic change and keeps the other object carrier separate.",
  ),
  idea(
    "lesson22-impersonal-optative-and-admonitive",
    "Put the completed impersonal Result inside an ordinary wish or admonition",
    "First build the impersonal Result, then use the familiar Mood and sentence controls. Optative wishes, commands, exhortations, negative wishes, past wishes, and admonitions reuse the ordinary sentence machinery; there is no impersonal-only mood control. The application preserves the impersonal subject and stem while it adds the compatible tense, negation, and introductory material. The clickable mood cue shows the completed impersonal Result inside that ordinary sentence path.",
  ),
  idea(
    "lesson22-tla-impersonal-derivation-and-lexicon",
    "Enter a Source and let derivational tla build the stem",
    "Enter any intransitive Source and choose impersonal voice. When more than one generated impersonal formation is possible, choose the intended formation; the application then derives the tla-impersonal stem. Canvas examples supply known sound adjustments and readings, but never gate the Source. This tla belongs inside the verbstem and is not the nonspecific-object tla. Reading appears only when the known Source has a genuine intended-meaning choice. The clickable tla cue shows the Source-to-Result link without accepting a typed target stem.",
  ),
]);

export function isLesson22ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON22_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson22ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="22">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 22</span>
                      <small>Impersonal VNCs</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON22_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
