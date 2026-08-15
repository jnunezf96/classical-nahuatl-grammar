const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON19_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson19-vnc-supplements-and-shared-heads",
    "Read the VNC as a complete supplementary clause",
    "A VNC supplement is still a complete verbal clause, not an English-style participle or infinitive. Follow its clickable link to the exact subject, object, or possessor head in the principal. Optional in marks the whole adjoined clause, while order and traditional joined spellings do not change the shared referent or the nested clause structure.",
  ),
  idea(
    "lesson19-pronominal-existentials-and-included-reference",
    "Separate special existential form from reference structure",
    "Plural demonstratives combine with the defective existential ihqueh, and interrogative forms preserve their licensed frozen person or number mismatch. Those forms are derived from the selected pronominal source. In included reference, by contrast, the complete adjoined clause is the third-person singular referent; no pronoun inside it has to match the principal head.",
  ),
  idea(
    "lesson19-included-subject-possessor-and-recursion",
    "Follow the whole included clause and then its inner links",
    "An entire clause or sentence can fill a third-person singular subject or possessor head. First follow the clickable whole-clause link to that head, then read any shared-reference links inside the included clause. A typed ca or optional in keeps its own scope, and recursion never erases the difference between an outer included relation and an inner shared relation.",
  ),
  idea(
    "lesson19-speech-and-question-content",
    "Keep the complete utterance inside the speech relation",
    "A statement, question, command, or exclamation can be the whole included object of a saying or questioning VNC. The captured Result already determines the inner sentence type and mood. Choose direct or indirect reporting when both compositions remain possible, then follow the clickable content link instead of treating quotation marks or English word order as grammar.",
  ),
  idea(
    "lesson19-causing-and-requesting-content",
    "Keep matrix participants separate from the requested event",
    "The complete caused or requested proposition fills the matrix object head. Its internal subject is not automatically the causer, causee, requester, or addressee. Follow the participant links supplied by the typed VNCs; honorific, negative, and impersonal shapes stay inside their own Results and do not become extra supplementation choices.",
  ),
  idea(
    "lesson19-wishes-and-realizability",
    "Let realizability determine the wish shape",
    "A realizable wish normally uses future indicative or a licensed nonpast optative form; an impossible or counterfactual wish uses the Canvas-authorized past optative pattern, with antecessive scope where required. The application derives the available reading from mood, tense, polarity, and marking, and asks about realizability only when those typed facts still leave more than one final composition.",
  ),
  idea(
    "lesson19-perception-cognition-and-emotion",
    "Follow the whole proposition seen, known, remembered, or felt",
    "A perception or cognition VNC takes the complete proposition as its included object; an emotion or affect VNC takes the complete proposition as its supplementary subject. The application derives that role from the selected predicate. Perception normally keeps a present-tense supplement, while cognition, memory, fear, and happiness preserve the tense and participants already carried by the captured Result.",
  ),
  idea(
    "lesson19-same-subject-futures-and-rumored-report",
    "Keep the future clause behind the English infinitive",
    "With the licensed knowing, remembering, forgetting, or wanting predicate, a future VNC whose subject is the same referent remains a complete Nahuatl supplementary clause even when English uses an infinitive. The application derives the shared subject and future reading. Quil is a separate fixed report head; choose optional mach, then choose joined quilmach spelling only when mach is present, without turning either spelling into grammar.",
  ),
  idea(
    "lesson19-deleted-saying-principals",
    "Recover the saying relation behind the shorter surface",
    "A saying principal may disappear only after its typed speaker, addressee, silent content head, and complete utterance have all been validated. The visible speech action or surviving adverb does not directly govern the utterance: the clickable link keeps the deleted saying node recoverable. Choose the full or licensed shorter composition and direct or indirect reporting only where both final surfaces remain possible.",
  ),
]);

export function isLesson19ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON19_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson19ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="19">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 19</span>
                      <small>VNC and included-reference supplementation</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON19_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
