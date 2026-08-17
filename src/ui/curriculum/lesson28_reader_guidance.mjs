const freeze = value => {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freeze);
  return Object.freeze(value);
};

const idea = (ideaId, title, guidance) => freeze({ ideaId, title, guidance });

export const LESSON28_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson28-compounding-foundation-and-embed-matrix-order",
    "Choose the two Results; the application orders and joins them",
    "Choose the owner-issued Result that serves as the embed and the Result or typed stem analysis that serves as the principal matrix. Choose a nested bracketing only when the final composition really needs one. The application builds a binary compound, always puts the embed before the matrix, keeps the matrix subject as the compound subject, deletes the embed subject while preserving its reference, and derives the output category. The embed may function as object, possessor, modifier, or complement, never as an incorporated subject. The clickable compound cue shows the two Sources, their order, matrix governance, subject treatment, and valid embed functions.",
  ),
  idea(
    "lesson28-linked-integrated-and-valence-system",
    "Let the selected construction determine type and the embed determine valence",
    "Choose the embed, matrix, and a linked-versus-integrated analysis only when the same final composition genuinely supports both. The application derives compound valence from the embed and derives linked or integrated structure from the typed matrix construction. All four intransitive/transitive embed-matrix combinations remain possible across the licensed patterns. A built-in matrix can prefill an analysis for convenience, but any compatible user-supplied typed stem remains open; Canvas examples are evidence, never a whitelist. The clickable structure cue shows both valences, compound type, connective status, and open Source admission.",
  ),
  idea(
    "lesson28-connective-t-foundation",
    "Choose connective-t and the two Sources; t or ti is automatic",
    "Choose the connective-t construction, embed, and matrix. Only a traditional spelling that truly permits both a connective-t and a causative analysis needs an extra interpretation choice. The application uses the embed's canonical perfective plus zero preterit, inserts t before a vowel or ti before a consonant, keeps matrix agreement outside the embed, and generates the finite Result. It preserves both readings: the embed event may be completed before the matrix event, or may begin first and continue with it. English main-verb or auxiliary wording does not choose the Nahuatl structure. The clickable connective cue shows the perfective, zero, allomorph, matrix, and event readings.",
  ),
  idea(
    "lesson28-ca-nemi-and-yauh-matrices",
    "Choose ca, nemi, or yāuh; their finite cells are automatic",
    "Choose the matrix construction needed by the final composition. The application then applies the ordinary finite matrix behavior: ca supplies ca-h, ca-t, or ye where its mood, tense, and number require them; nemi supplies nemi or nen; and yāuh supplies singular present uh, plural present hui, yah, or yā. When the yā or yah shape is present, you may keep ti-yā or ti-yah or choose the licensed syncopated t-ā or t-ah surface. The embed may be active or an owner-issued nonactive Result, and its valence stays with the compound. Progressive, continuative, departure, do-and-leave, and the ē-hua plus ca seated idiom are reading cues, not extra controls. If traditional tia, tiaya, or tiani spelling truly hides the difference, choose connective-t or causative Analysis; otherwise the application derives the distinction. The clickable matrix cue shows the selected matrix, its actual finite stem, agreement, available readings, and any syncopation or spelling choice.",
  ),
  idea(
    "lesson28-hualla-huitz-ahci-mani-ihca-matrices",
    "Choose the matrix meaning; direction, connective, and finite shape follow",
    "Choose huālla, huītz, ahci, mani, ihca, or another compatible typed matrix for the final composition. If the intended Source is a carry predicate with huītz, choose the special carry analysis; otherwise keep the ordinary connective-t analysis. The application retains directional huāl inside huālla, derives t or ti, lets the matrix alone supply the compound Mood and Tense, and preserves the embed's valence and participants. The special carry construction requires a typed object, uses connectiveless itz, and derives its surface from the entered stem's shape; it never consults a stem whitelist. Coming, arrival, area or group stance, standing, and result-state meanings are reading cues, not extra controls. The clickable matrix cue shows the selected analysis, actual finite matrix, direction, connective status, valence, participants, and available readings.",
  ),
  idea(
    "lesson28-o-ehua-quiza-huetzi-and-other-matrices",
    "Choose the matrix; only real class or event-order choices remain",
    "Choose o, ēhua, quiza, huetzi, tlehcō, cal-aqui, pil-ca, or another compatible typed matrix for the final composition. The application derives the connective and ordinary finite matrix shape, preserves the embed's valence and participants, and automatically leaves out locative on when o is the matrix. For ēhua, choose Class A or Class B only when both histories are genuinely licensed. For huetzi, choose reversed event order only when the intended meaning places falling before the embed event; the written compound still keeps embed before matrix. Recumbent, beginning, rapid, abrupt, falling, ascending, entering, and suspended-state meanings are reading cues, not extra controls. Compatible typed stems remain open, and examples never form a whitelist. The clickable matrix cue shows the actual finite matrix, class history, locative omission, event interpretation, fixed constituent order, valence, participants, and available readings.",
  ),
  idea(
    "lesson28-special-embeds-event-order-and-nonactive-scope",
    "Choose only identity, chronology, or nonactive scope that changes the composition",
    "The typed Source automatically gives ca the embed ye, yāuh the embed yah, and ittā the embed itz. Cac automatically carries nonanimate reference; quiet, deserted, abandoned, silent, and fair-weather meanings are reading cues rather than controls. When typed itz could mean either look or come or go, choose the intended Source identity; the application keeps the two lexemes separate even though their embed shape is the same. Choose reversed event order only for a composition that licenses it, including the attested huetzi and ahci patterns and motion itz with ēhua; written order always stays embed before matrix. After choosing passive or impersonal Voice, choose Nonactive Scope only when more than one Canvas pattern is available: passive permits embed or both, while impersonal permits embed, matrix, or both. A stative matrix favors embed-only impersonalization but does not require it, and tla impersonal stays on the embed automatically. The clickable special-compound cue shows Source identity, special perfective, interpreted chronology, selected scope, participant effects, and derived nonactive forms.",
  ),
  idea(
    "lesson28-accompanying-possession",
    "Generate the two Results, then link them with Supplementation",
    "First generate and capture the possessive NNC Result, such as a possessed implement, garment, or food item. Use Add another derivation to generate and capture the ordinary ca-to-ye connective compound Result. Then choose Supplementation and make the possessed Result its supplementary subject; choose the Result order only when the final sentence needs a different topic. The application keeps the matrix subject, makes it cross-reference the possessed thing, preserves the possessor as a nested supplementary possessor, and derives the topic and the have-along, carry-with-one, have-on-one, or wear reading. It does not create a special have verb, possession picker, item list, or second supplementation engine. The clickable cue shows the possessed Result, ye compound, shared subject link, nested possessor, topic order, and available readings.",
  ),
  idea(
    "lesson28-intransitivized-reflexive-matrix",
    "Choose the reflexive-matrix construction and enter the matrix core",
    "Choose the reflexive-matrix compound and enter the open typed embed and matrix core needed by the final composition. Enter cāhua, tēca, tlāl-i-ā, man-a, quetza, or any other compatible typed core; the application adds fixed m-o automatically and does not change it for first- or second-person subjects. The fused reflexive grounds the matrix core's transitivity without adding a participant, while the embed alone determines whether the compound is intransitive or transitive. Stopping, remaining, settling, beginning, posture, gradual change, and intensifying meanings are reading cues rather than extra controls. With the man-a core, first- and second-person reference is automatically animate; a third-person referent needs Animacy only when it is genuinely unknown, and any animate subject must be plural. The clickable cue shows the entered core, fixed m-o, connective, embed valence, finite subject and number, subject coreference, restriction, and available readings. The five Canvas matrices are examples, never a stem whitelist.",
  ),
  idea(
    "lesson28-shared-object-compounds",
    "Choose Shared Object; the application verifies and writes it once",
    "Choose the shared-object compound after entering a transitive embed with its typed reflexive or projective object and an open typed transitive matrix. The ordinary Source object controls already identify the shared referent; a separate Referent choice is needed only if more than one typed object could genuinely be shared. The application verifies that the embed and matrix object are coreferential, preserves kind, person, and number, writes the carrier once on the embed, suppresses the duplicate matrix carrier, and keeps every other participant distinct. It derives the connective, hierarchy, valence, matrix finite form, and the special Class A ēhua embed automatically. Sitting, standing, recumbent, result-state, exit, downward, flat, and distributive plural meanings are reading cues rather than controls. The clickable cue shows both transitive Sources, verified identity, single embed-side carrier, matrix role and readings, participant preservation, and the final Result. The six Canvas matrices are common examples, never a stem whitelist.",
  ),
  idea(
    "lesson28-future-embed-compounds",
    "Choose the future supplement and nequi or qui; tense nesting is automatic",
    "Generate and capture the owner-issued future VNC Result that the final composition needs, then choose Future Embed. Choose nequi for desire or the anomalous qui construction for volition only when that is the real matrix analysis. The future predicate replaces the matrix object, and the application adds future z inside the compound automatically while keeping the embed's valence, object structure, and any passive or impersonal formation. Ordinary Mood and Tense apply outside to the matrix; qui is available only in the imperfect. Choose antecessive order only when the ordinary finite composition licenses and needs it. Traditional conditional wording is a reading, not another tense, and included-referent or past-optative patterns remain composition readings rather than extra controls. There are no separate controls for z, object deletion, example spellings, or finite nesting. The clickable cue shows the future supplementary object, subject coreference, internal future, matrix analysis, outside finite cell, event order, nonactive structure, and available readings. Nequi and qui are the Canvas inventory for this construction, never a whitelist on general Source entry.",
  ),
  idea(
    "lesson28-recursive-compounding",
    "Choose the captured Result’s next role; each new layer stays automatic",
    "Generate a compound and use Add another derivation to capture its owner-issued Result. Choose Compound again, then choose whether that captured Result is the new embed or the new matrix. If it is the embed, enter the new matrix under Grammar. If it is the matrix, enter the new embed in Source. That role and the resulting binary bracketing are the only new choices. The application verifies a non-circular hierarchy, preserves the links inside the captured Result, and derives each layer's connective, valence, participants, Mood, Tense, and outside finite boundary locally. Repeat Add another derivation whenever the composition needs another layer; there is no depth picker, connective picker, participant-copy control, or example-stem template. The four Canvas forms show how completed compounds can be reused and read, but they do not limit the stems or authorize a spelling. The clickable nested cue shows the captured Result, its selected role, the two-part bracketing, hierarchy depth, local rules, participant preservation, and continuation path.",
  ),
]);

export function isLesson28ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON28_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson28ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="28">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 28</span>
                      <small>Compound verbstems</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON28_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
