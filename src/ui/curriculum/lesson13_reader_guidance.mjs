const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON13_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson13-possessive-formula-foundation",
    "Keep subject and possessor separate",
    "A possessive NNC has the same subject-person positions as an absolutive NNC, but its State position contains a possessor. A one-part possessor uses st; a specific possessor uses st¹-st². The possessor belongs to the predicate with the nounstem, not to the subject.",
  ),
  idea(
    "lesson13-possessive-subject-paradigm",
    "Read the possessive subject around the predicate",
    "Subject person comes before the possessor and nounstem. Subject number follows the nounstem: singular or common uses uh, hu plus an automatically added supportive i, or zero as licensed by the stem and boundary, while plural uses hu-ān. All connector spelling is automatic.",
  ),
  idea(
    "lesson13-monadic-possessors",
    "Read the one-part possessor by its reference",
    "ne means one another's and requires a third-person subject. tē means an unspecified human possessor. tla means an unspecified nonhuman possessor and normally requires a relational or otherwise authorized nounstem. These are possessors, not objects.",
  ),
  idea(
    "lesson13-dyadic-possessor-architecture",
    "Read the first specific-possessor part",
    "The first possessor part always carries person. With a third-person possessor, ī also carries possessive case. With first or second person, n, t, m, or am also carries the possessor's number.",
  ),
  idea(
    "lesson13-dyadic-second-subposition",
    "Read what the second possessor part completes",
    "After third-person ī, the second part carries possessor number: zero is singular or common, and m or n is plural. After first- or second-person n, t, m, or am, the second part carries possessive case: o before a consonant and square zero before a vowel.",
  ),
  idea(
    "lesson13-specific-possessor-paradigm",
    "Use structure to distinguish amo from ammo",
    "Specific possessors mean my, our, your, his, her, its, or their according to their person and number. In standard analysis, NNC am-o is a second-person plural possessor, while VNC am-m-o is a second-person plural subject plus reflexive object. Traditional spelling may hide that structural difference.",
  ),
]);

export function isLesson13ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON13_READER_GUIDANCE_GROUPS);
}

export function renderLesson13ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="13">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 13</span>
                      <small>Possessive NNCs</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON13_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
