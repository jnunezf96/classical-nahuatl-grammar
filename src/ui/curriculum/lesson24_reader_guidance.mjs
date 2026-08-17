const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON24_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson24-final-vowel-and-open-valence",
    "Choose the Source Valence; read the final vowel as a clue",
    "Enter any open verbstem and choose the Valence intended in the final composition. Final i is often intransitive and final a often directive, but exceptions are common; o may be a nonactive result, and hua plus a/e variants can be ambiguous. The application preserves your typed Valence and never admits or rejects a stem from its final vowel. Canvas examples are reading evidence, not a list of allowed inputs. The clickable Source cue shows the final vowel and chosen Valence without turning the vowel into authority.",
  ),
  idea(
    "lesson24-valence-neutral-sources",
    "Use the same stem shape with the Valence you mean",
    "When a Source is understood as valence-neutral, choose its intended intransitive or transitive Valence and supply the real transitive participant. The application keeps the same stem shape, enforces the selected object structure, and later sends that typed member to its proper passive or impersonal route. Applicative-like meaning is common and causative-like meaning is rarer, but neither is a separate control. There is no valence-neutral toggle, example picker, or stem list. The clickable Valence cue shows what your chosen analysis controls.",
  ),
  idea(
    "lesson24-final-i-type-one-causatives",
    "Choose replacement or addition only when both remain possible",
    "Choose Causative for an open final-i Source. If its analysis leaves two genuine Type 1 formations, choose replacement or addition: replacement removes i and adds short a, while addition keeps i and adds long ā. Supply a special consonant analysis only when the intended lexical analysis requires it. The application automatically derives the causative object, participant transfer, vowel length, and Class B for replacement or Class C for addition. Meaning shifts and Canvas examples remain reading evidence, never a whitelist. The clickable formation cue shows the base, removed or retained material, boundary, participant transfer, and resulting class.",
  ),
  idea(
    "lesson24-final-a-and-ya-causatives",
    "Let the Source analysis settle ordinary a or ya replacement",
    "Choose Causative for an open final-a Source. Ordinary final a is replaced morphologically by causative a even when the visible spelling stays the same; a normal root-plus-ya Source loses ya and receives long ā. The application derives the replacement, vowel quantity, participant transfer, and Class B or C result. Choose retained y only when you genuinely intend a licensed lexical exception. There is no visible-versus-invisible replacement, vowel-length, class, or example control, and Canvas examples never form a whitelist. The clickable formation cue shows the Source analysis, removed or retained material, surface identity or ya loss, and resulting class.",
  ),
  idea(
    "lesson24-destockal-source-architecture",
    "Read one completed Source as root, stock, and stem",
    "Supply the complete open verbstem and confirm a destockal analysis only when its internal structure is genuinely unresolved. The application keeps the ordered root plus stock formative as the stock, then adds the stem formative to make the completed verbstem. The intermediate stock is not treated as the completed destockal VNC Source. Rank, step, theme name, and family are derived facts rather than controls. The clickable structure cue shows every segment, its rank, and both derivational boundaries.",
  ),
  idea(
    "lesson24-ni-hui-destockal-sources",
    "Enter any long-vowel ni or hui Source; choose only a real exception",
    "Enter any open ni or hui destockal verbstem. The application reads root plus long stock vowel plus ni or hui, derives the regular stock-vowel harmony cue from the root, and carries the completed intransitive Source through Class B. If the intended stock vowel is exceptional, confirm that analysis; do not choose harmony, productivity, theme, class, or an inventory entry separately. Long-root-vowel cautions, meanings, perfectives, and the ā, ī, ō, and ē examples remain searchable reading evidence, never an admission list. The clickable stock cue shows root, stock vowel, theme, regular harmony or exception, and Source class.",
  ),
  idea(
    "lesson24-ni-hui-causative-procedure",
    "Choose a ni or hui procedure only when both remain possible",
    "Choose Causative for any open ni or hui destockal Source. When its typed analysis permits both procedures, choose replacement or addition: replacement changes final i to short a and gives Class B, while addition preserves the Source and adds long ā for Class C. The application derives the target, causative object, participant transfer, vowel quantity, and class. Majority tendencies and named exceptions are reading cues, not a stem list or separate controls. The clickable procedure cue shows the Source segments, selected boundary, preference, target, and class.",
  ),
  idea(
    "lesson24-coalesced-and-obsolete-destockal-sources",
    "Keep a hidden vowel boundary in the formula",
    "When identical root and stock vowels meet, supply or confirm the underlying segmented Source only if the visible spelling hides that boundary. The application keeps both vowels in the formula, coalesces them only in the written projection, and carries the same typed analysis into a later causative. A reconstructed or obsolete history is confirmed only when that is the analysis you intend; coalescence, asterisks, and example identity are not controls. The clickable boundary cue shows the underlying segments, written coalescence, and preserved Source history.",
  ),
  idea(
    "lesson24-hua-destockal-sources-and-causatives",
    "Enter the hua Source you mean; let causative replacement run",
    "Enter any open ā-hua or ē-hua destockal Source. Independently entered hua and hui synonyms remain separate lexical Sources; the application never converts one into the other. Confirm destockal, compound, exceptional-class, or reconstructed structure only when the typed form is genuinely ambiguous. After Causative is chosen, hua to hu-a replacement and the Class B target are automatic even when the visible spelling barely changes. Meanings, nounroot resemblances, dictionary gaps, and examples remain reading evidence rather than a whitelist. The clickable hua cue shows Source structure, coalescence when present, replacement, and target class.",
  ),
  idea(
    "lesson24-short-vowel-hui-destockal-causatives",
    "Let the root select short i or a; choose only a real exception",
    "Enter any open i-hui, a-hui, or o-hui destockal Source. The application derives the regular short stock cue from the last root vowel, with root-final l selecting i, and treats an exceptional Source relation as a confirmation only when needed. After Causative is chosen, i-hui or a-hui is replaced by o-ā, while special o-hui replaces hui with ā; the Class B Source and Class C result are automatic. Exact gaps such as pil-i-hui and the separate irregular pil-ca relation remain exact restrictions, not a whitelist. The clickable short-hui cue shows the root condition, Source ending, replacement, class, and any gap or irregular relation.",
  ),
  idea(
    "lesson24-causative-participant-transform",
    "Choose the causer; choose causee coreference only when it is real",
    "Choose the imported causative subject. The application automatically turns an active Source subject into the causative object, or an impersonal Source agent into nonspecific tla, and preserves the complete Source VNC core. Projective versus reflexive appears only when the same non-first-person participants leave a genuine interpretation choice; otherwise participant identity fixes it. Specific or nonspecific carrier, causative governor, formula line, and translation wording are derived rather than separate controls. The clickable participant cue traces Source voice, subject-to-object transfer, imported subject, and the chosen or automatic relation.",
  ),
]);

export function isLesson24ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON24_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson24ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="24">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 24</span>
                      <small>First-type causatives</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON24_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
