const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON20_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson20-nonactive-foundation-and-suffixes",
    "Start from the active imperfective stem",
    "Request the nonactive form from the familiar VNC workflow. The application starts from the typed active imperfective stem and derives the licensed nonactive Result. It asks you to choose a formation only when that Source truly has more than one valid Result. Follow the clickable stem cue to see the active base, suffix family, and the real o-hua or lo-hua boundary even when traditional writing shows oa or loa.",
  ),
  idea(
    "lesson20-regular-lo-and-root-ya",
    "Let regular lō and ya loss happen automatically",
    "For an ordinary lō formation, select the intended active Source and request nonactive voice. The application uses the same imperfective base available to the future and adds lō. In the narrow root-plus-ya class it removes ya automatically. The clickable cue shows the source-to-result change; there is no separate class, future-base, or drop-ya choice.",
  ),
  idea(
    "lesson20-class-c-d-lo-and-irregular-lohua",
    "Read vowel changes and suppletion inside the derived stem",
    "Class C and Class D vowel behavior comes from the typed Source, including lengthening or reduced-long spelling before lō. The small ca-h, ya-uh, and huāl-la-uh family uses its licensed suppletive lo-hua base, and compound records show which member receives lo-hua. Choose only when the Source licenses competing final Results; the clickable cue explains vowel change, suppletion, or compound attachment after the choice is made.",
  ),
  idea(
    "lesson20-o-nonactive-formation",
    "Let the ō formation reshape the final syllable",
    "When the typed final environment licenses ō, the application deletes the final vowel and derives any s-to-x or qu-to-c result automatically. This is a replacive imperfective base, not a copied active perfective. If Andrews also licenses lō or another nonactive Result, choose between the complete Results; otherwise the ō form proceeds without another control. The clickable cue shows the exact replacement.",
  ),
  idea(
    "lesson20-ohua-nonactive-formation",
    "Keep o-hua visible behind traditional oa spelling",
    "The application derives o-hua from the typed Source, removes the eligible final vowel, and automatically handles remaining w deletion, compensatory ō, and the licensed consonant changes. Traditional oa spelling never supplies the grammar. Optional final-ni and rare transitive formations appear only for Sources that actually license them, and the clickable cue shows each deletion, length change, or exception.",
  ),
  idea(
    "lesson20-hua-nonactive-formation",
    "Read the vowel and hua as one derived formation",
    "Hua follows licensed i- and o-final Sources. Long ī or ō keeps its length, while short final i normally lengthens; narrow ci-to-xī and transitive or Class C extensions come from typed lexical structure. A traditional written a after o does not erase hua. Choose only among competing final Results, while the application derives vowel quantity and exceptional replacement automatically.",
  ),
  idea(
    "lesson20-hualo-free-variants",
    "Choose hua-lō only where it is a real free variant",
    "Hua-lō is rare, but rarity is not a grammar control. For the small licensed set, the normal nonactive formation list offers the hua Result and its hua-lō free variant as two complete choices. Other hua Sources do not receive the variant. The clickable stem cue shows the shared hua core followed by lō after you choose the final Result.",
  ),
  idea(
    "lesson20-nonactive-class-a-and-perfective",
    "Let the nonactive Result continue as a Class A stem",
    "Every nonactive Result enters the ordinary Class A tense system, no matter which class its active Source had. The application derives the perfective from the nonactive imperfective and chooses long or reduced final o from the following typed morphs. Select the intended tense or VNC Result as usual; the clickable closing stem boundary shows the Class A profile, aspect, and imperfective-to-perfective pair without adding class or vowel switches.",
  ),
]);

export function isLesson20ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON20_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson20ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="20">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 20</span>
                      <small>Nonactive stem formation</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON20_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
