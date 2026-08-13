const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON10_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson10-admonitive-meaning",
    "Read the admonitive as a positive warning",
    "The admonitive gives a warning, caution, or advice. It is positive in form and meaning: it does not prohibit and is not a negative command. An English translation may look negative only because English often needs a different way to express the warning.",
  ),
  idea(
    "lesson10-admonitive-vnc-formation",
    "Read the perfective shape of a nonpast admonitive",
    "An admonitive has only nonpast time but uses the perfective stem. Class A marks it with h; the other classes use their perfective zero shape. Singular has ⎕-Ø, while plural has t-in or t-ih. Outside a sentence, the VNC alone has no translation value.",
  ),
  idea(
    "lesson10-affirmative-admonition-system",
    "Read mā as the beginning of an admonition",
    "An affirmative admonition requires mā before the admonitive VNC. Nēn may strengthen it. A second-person subject gives a direct warning, third person an indirect warning, and first person a warning to oneself or one's group. The meaning must remain cautionary, not a prohibition or wish.",
  ),
  idea(
    "lesson10-class-a-admonitions",
    "Read h as the Class A admonitive tense marker",
    "A Class A admonitive uses h after the perfective stem. Singular has ⎕-Ø and plural has t-in or t-ih, as in mā nitzahtzih and mā tzahtzihtin. The sentence remains a positive warning even when English uses negative wording.",
  ),
  idea(
    "lesson10-class-b-admonitions",
    "Read the Class B perfective shape in an admonition",
    "A Class B admonitive uses the perfective stem with zero tense. Singular mā tihuetz uses ⎕-Ø; plural mā tihuetztin uses t-in. Both positively warn the participant to beware or take care.",
  ),
  idea(
    "lesson10-class-c-admonitions",
    "Read the Class C perfective stem in an admonition",
    "A Class C admonitive uses its perfective stem, as in singular mā choloh and plural mā ancholohtin. Participant and number remain visible, and the meaning is positive caution rather than prohibition.",
  ),
]);

export function isLesson10ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON10_READER_GUIDANCE_GROUPS);
}

export function renderLesson10ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="10">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 10</span>
                      <small>Admonitive VNCs and warning sentences</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON10_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
