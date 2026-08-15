const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON21_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson21-passive-foundation-and-source-limits",
    "Request passive voice from a complete active Source",
    "Compose the active VNC first, including its real object, and then choose passive voice. The application checks that the Source has a specific projective or reflexive object, removes the active subject completely, promotes the eligible object, and uses the licensed nonactive stem. There is no keep-agent choice: when an English passive names its agent, compose the corresponding active Nahuatl clause instead. A clickable boundary cue summarizes the whole transformation.",
  ),
  idea(
    "lesson21-passive-formula-and-single-object-promotion",
    "Let the one specific object become the subject",
    "With one specific projective object, its person and number move automatically into the passive subject positions and the Result uses the intransitive formula. Different active subjects can therefore lead to the same passive form because the old subject leaves no trace. A grammatically present silent third-person object promotes in exactly the same way as a sounded one; silence never becomes another user choice. Follow the subject cue to see the relocation.",
  ),
  idea(
    "lesson21-passive-reflexive-ne-retention",
    "Keep the reflexive relation after promotion",
    "For a reflexive active Source, the reflexive participant becomes the passive subject and shuntline ne remains automatically as the trace of the reflexive relation. The passive Result is therefore transitive even though no new participant has been added. Choose reflexive or reciprocal only when a plural Source genuinely supports both interpretations; never add a retain-ne control. The clickable ne cue shows both destinations of the original reflexive object.",
  ),
  idea(
    "lesson21-passive-reflexive-projective-double-object",
    "Let unlike objects take their fixed passive destinations",
    "When the active Source contains one reflexive and one specific projective object, their different grammatical kinds already decide the outcome. The projective object becomes the passive subject, while the reflexive object becomes shuntline ne. Do not choose a promotion target after requesting passive voice. The clickable ne cue shows the projective promotion and reflexive retention together.",
  ),
  idea(
    "lesson21-passive-two-specific-mainline-promotion",
    "Promote the typed mainline object once",
    "With two specific projective objects, the mainline object recorded in the active Source becomes the passive subject and the shuntline object remains. A silent third-person shuntline object stays grammatically present and keeps its real number ambiguity; a third-person plural animate shuntline object receives its licensed sounded form. Choose mainline and shuntline roles only when composing a genuinely ambiguous active Source. The passive step follows that decision automatically.",
  ),
  idea(
    "lesson21-passive-specific-nonspecific-and-three-object",
    "Promote the only specific object and retain the rest",
    "When only one object is specific, that object becomes the passive subject regardless of its earlier line status. Nonspecific tē or tla remains automatically, and genuine interpretation ambiguity is kept rather than replaced by a preferred gloss. A three-object Source uses the same promotion and retention rules recursively; there is no three-object mode. The clickable role cue lists the promoted object and every retained carrier.",
  ),
  idea(
    "lesson21-passive-mood-sentence-composition",
    "Put the completed passive into an ordinary sentence mood",
    "Build the passive VNC first, then use the familiar mood and sentence controls for a wish, command or exhortation, or admonition. The chosen sentence force supplies its ordinary tense, number, negation, and introductory material while the passive object promotion and nonactive stem remain unchanged. There are no passive-specific mood controls. The clickable mood cue shows that sentence composition surrounds a completed passive Result instead of rebuilding its voice.",
  ),
  idea(
    "lesson21-active-reflexive-contextual-passive-reading",
    "Keep active reflexive grammar separate from passive meaning",
    "Some third-person active VNCs with a reflexive object can be understood contextually as passive, resultative, an event happening, or a listed idiomatic patient construction. The formula remains active and reflexive; choosing a contextual reading never changes it into passive voice. The subject is normally nonanimate, while an animate subject must still be understood as the patient rather than the agent. Use the Reading choice only where literal reflexive and contextual passive interpretations are genuinely available, and follow the clickable reflexive cue to keep grammar and meaning separate.",
  ),
]);

export function isLesson21ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON21_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson21ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="21">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 21</span>
                      <small>Passive voice</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON21_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
