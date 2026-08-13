const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON6_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson6-object-category-system",
    "Read the object through its three contrasts",
    "A transitive Valence carries objective case. Read its trajectory as projective, reflexive, or reciprocal; its reference as specific or nonspecific; and its prominence as mainline or shuntline.",
  ),
  idea(
    "lesson6-monadic-valence",
    "Read one-part object Valence",
    "Monadic Valence has one va position. Ne marks a shuntline reflexive or reciprocal object, tē marks a nonspecific human object, and tla marks a nonspecific nonhuman object that may be animate or nonanimate.",
  ),
  idea(
    "lesson6-dyadic-valence",
    "Read va1 and va2 as one object",
    "A specific mainline projective object uses both va1 and va2. Read them together: the two positions jointly carry trajectory, person, number, and objective case.",
  ),
  idea(
    "lesson6-third-person-va1",
    "Keep the third-person carrier separate from the stem",
    "Third-person va1 is the object morph /k/, written c or qu. Qui has a supportive i where the completed VNC boundary requires it. In ca, tiqui, and que, the vowel belongs to the stem rather than to the object carrier.",
  ),
  idea(
    "lesson6-projective-va1-va2",
    "Read both halves of a specific object",
    "For first and second persons, va1 gives person and number while ēch or itz gives objective case. For third person, va1 gives person and objective case while va2 gives number. Assimilated spellings remain forms of the same object morphs.",
  ),
  idea(
    "lesson6-projective-object-paradigm",
    "Read the whole specific-object form",
    "Read n-ēch, t-ēch, m-itz, am-ēch, c/qu/qui-0, and qu-im as complete object forms. Context may render the third-person common form as him, her, it, or them without adding grammatical gender to Nahuatl.",
  ),
  idea(
    "lesson6-reflexive-object-structure",
    "Read the reflexive object through its subject",
    "A mainline reflexive object reflects the subject's person and number. Its va1 is n, t, or m, and objective va2 is o before a consonant but square zero before a vowel. A plural form may also mean one another.",
  ),
  idea(
    "lesson6-reflexive-object-paradigm",
    "Use subject context to read the reflexive form",
    "Read n-o/n-⎕, t-o/t-⎕, and m-o/m-⎕ with the subject. Singular subjects mean myself, yourself, himself, herself, or itself. Plural subjects may mean ourselves, yourselves, themselves, or one another.",
  ),
]);

export function isLesson6ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON6_READER_GUIDANCE_GROUPS);
}

export function renderLesson6ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="6">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 6</span>
                      <small>Reading objects and Valence</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON6_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
