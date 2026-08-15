const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON17_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson17-supplementation-foundation",
    "Keep the head and supplement distinct",
    "Supplementation joins two complete nuclear clauses. The personal pronoun inside the principal remains the grammatical head. The added clause is its supplement: it identifies, emphasizes, contrasts, or clarifies the head, but it does not replace it. Read shared reference as two personal pronouns pointing to the same entity; included reference is a different relation developed later.",
  ),
  idea(
    "lesson17-shared-subject-and-have",
    "Follow the shared subject referent",
    "A supplementary subject has a personal-pronoun subject that refers to the same entity as the principal subject. Matching person and number help show the link, but the real link is shared reference. With locative on-cah as principal and a possessive NNC as supplement, English may use have; Nahuatl has not created a separate have verb.",
  ),
  idea(
    "lesson17-shared-object-and-possessor",
    "Follow the object or possessor head",
    "A supplement can identify the principal object or possessor instead of its subject. Find the personal-pronoun object or possessor inside the principal and follow its shared referent to the supplement. A Nahuatl supplementary possessor is not an English-style noun directly modifying another noun.",
  ),
  idea(
    "lesson17-recursive-supplementation",
    "Follow each link in a nested supplement chain",
    "Supplementation can repeat: a completed supplement relation can itself serve as the principal or supplement of another relation. Read from the outer principal through each clickable shared-referent link. Every layer remains a complete clause, and the resulting hierarchy cannot circle back into itself.",
  ),
  idea(
    "lesson17-contact-demonstratives-and-ambiguity",
    "Use referents, not neighboring stems",
    "The contact is identity between personal-pronoun referents, not resemblance between stems or closeness in the written sentence. Īn and ōn can be full demonstrative NNC supplements, including their traditional solid spellings. When the same third-person supplement can identify either the subject or object, keep both readings until the intended one is chosen.",
  ),
  idea(
    "lesson17-topic-comment",
    "Keep topic order separate from grammatical role",
    "A supplement becomes the topic when it comes before its principal; the principal and anything grouped with it form the comment. Subject, object, or possessor status still comes from the shared personal-pronoun link, not from position. Ca may emphasize the following comment, and a comment can contain another topic-comment layer.",
  ),
  idea(
    "lesson17-information-questions",
    "Recover the supplement that was questioned",
    "An entity information question replaces a supplement with an owner-issued interrogative NNC and puts that interrogative first. Follow its shared-reference link to the same subject, object, or possessor head to see what is being asked. Initial position and question punctuation are automatic; when Andrews permits more than one principal or head reading, the intended reading remains a real choice.",
  ),
]);

export function isLesson17ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON17_READER_GUIDANCE_GROUPS);
}

export function renderLesson17ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="17">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 17</span>
                      <small>Supplementation</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON17_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
