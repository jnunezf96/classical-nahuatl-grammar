const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON23_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson23-object-functions-and-governors",
    "Choose the composition; let its history identify each object",
    "Enter any Source and choose its real Valence, participants, and causative or applicative operation. A direct object belongs to a directive Source; a causative or applicative object belongs to the matching suffix operation. The application derives that function and keeps the object plus its governor as one grammatical link. Use a Source-analysis choice only when you truly intend an exceptional intransitive analysis. Canvas stems are examples, never a list of allowed inputs. The clickable object cue shows the function, governor, suffix link, and level.",
  ),
  idea(
    "lesson23-multiple-valence-foundation",
    "Add real participants, not an object count",
    "Start with the Source and add only the causative or applicative operations actually needed for the final composition. Each operation adds one complete Valence position, while a directive Source keeps its original direct object. The application counts the resulting positions and blocks a fourth one. There is no one-object, two-object, three-object, or slot-count choice. The clickable Valence cue shows the Source history and the complete position count.",
  ),
  idea(
    "lesson23-intransitive-source-histories",
    "Build an intransitive history one meaningful operation at a time",
    "An intransitive Source begins with no object. Choose each causative or applicative operation in the order needed and supply its participant. The application assigns contiguous levels automatically: the newest object is mainline, and every earlier object remains on its proper shuntline. Those levels describe derivational history, not printed object order. The clickable history cue traces each operation, object, level, and prominence without asking you to choose any of them separately.",
  ),
  idea(
    "lesson23-directive-source-histories",
    "Keep the directive object's place while adding later participants",
    "Enter any directive Source and its direct object, then choose only the later causative or applicative operations needed by the final composition. The direct object stays at level one; each later operation adds one complete position, and the newest object becomes mainline automatically. A third-stage causative is admitted only when you explicitly supply genuine Source-meaning support for that rare history. The clickable directive-history cue shows the retained direct object, later governors, levels, and prominence.",
  ),
  idea(
    "lesson23-filled-positions-and-mainline-reflexive",
    "Treat silent positions as real and choose reflexive meaning only once",
    "Choose reflexive participation only when the intended participants require it. Every Valence position and subposition remains present even when its carrier is silent. The application permits one mainline reflexive shape and normally binds it to the last-added suffix; earlier reflexives use their shuntline realization. Do not choose position filling, silence, mainline status, carrier shape, or suffix control. The clickable reflexive cue shows the real position, its governor, prominence, and sounded or silent realization.",
  ),
  idea(
    "lesson23-suffix-history-and-specific-incompatibility",
    "Choose the operations; let history and object form do different jobs",
    "Choose the causative and applicative operations in their intended order. Causative normally precedes applicative; supply exceptional-order support only for a genuinely intended exceptional history. The suffix sequence records derivational history, while object carriers receive their own form-based order. If specific objects are incompatible, all remain structurally present but only the privileged one is sounded. The clickable suffix-history cue shows the suffix order, prominence, surface order, and every silent participant.",
  ),
  idea(
    "lesson23-multiple-valence-formula-and-silencing",
    "Supply the participants; let the formula show every position",
    "Build the final composition by supplying its real participants. The application projects every complete Valence position into the shared formula and automatically privileges the newest mainline object. When specific objects cannot both sound, person and number determine whether the shuntline position appears as 0-0 or 0-im; the participant itself is never deleted. Nonspecific tē and tla remain ordinary carriers, and a shuntline reflexive or reciprocal appears as ne. The clickable formula cue shows every position, subposition, governor, and sounded or silent result without asking you to choose a carrier.",
  ),
  idea(
    "lesson23-object-order-and-role-ambiguity",
    "Let form set the order; choose roles only when the form cannot",
    "The application orders carriers by form: specific before reflexive, specific before nonspecific, reflexive before nonspecific, and human tē before nonhuman tla. The thirteen three-carrier combinations and their valid two-carrier subsequences follow automatically, while Direction keeps its Lesson 8 position. A shuntline reflexive remains ne, including m-o plus ne when two reflexives are present, and silent participants remain visible in the grammatical cue. Direct, causative, and applicative roles never control carrier order. Only when two distinct role mappings truly produce the same visible sequence, as with nēchtētla, does the clickable role cue preserve a user choice or an open reading for context to resolve.",
  ),
]);

export function isLesson23ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON23_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson23ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="23">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 23</span>
                      <small>Multiple verb objects</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON23_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
