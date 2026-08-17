const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON25_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson25-type-two-foundation",
    "Choose Type 2; choose a Source history only when several remain",
    "Choose Causative Type 2 for any open typed Source. If its analysis supports more than one licensed nonactive history, choose the history needed for the final composition; otherwise the application uses the single available history. It automatically builds tiā, derives one, two, or three object positions from the Source, preserves an unexpected or reconstructed nonactive bridge, and uses huīca for yāuh or huāllāuh. Tiā versus meaningful ti-ā, honorific-only use, and the Canvas examples are reading evidence, not controls or a stem whitelist. The clickable Type 2 cue shows the Source, hidden nonactive bridge, replaced material, target, object count, and any suppletion.",
  ),
  idea(
    "lesson25-hua-source-routes",
    "Let the hua history derive the visible shape",
    "For any open typed Source with a licensed hua nonactive history, choose that history only when another licensed history competes with it. The application replaces hua with tiā and automatically derives long or shortened i, supportive i, a to i, s to x, and postvocalic ti to chi from Source shape. The Source's typed intransitive or transitive Valence determines the causative Valence; a one-object versus two-object result is not guessed from the visible stem. A Type 1 versus Type 2 choice appears only when both formations are licensed. Reconstructed forms, unattested counterparts, meanings, and Canvas examples remain reading evidence, never an admission list. The clickable hua cue shows the hidden bridge, shape changes, selected history, participant transfer, and target Valence.",
  ),
  idea(
    "lesson25-o-ohua-source-and-machtia",
    "Keep real machtia ambiguity; derive silent objects automatically",
    "For an open typed o or o-hua Source history, the application replaces that nonactive ending with tiā, derives the consonant-before-tiā shape, blocks the two-consonant environment, and sends l-before-tiā to the lō route. For machtia, choose an intransitive or transitive Source reading, or reflexive versus reciprocal reference, only when the final composition requires that genuine interpretation. While reading, unresolved alternatives stay visible. A retained specific shuntline object is silently present by general practice and can take a supplement; silent versus sounded appears only for the licensed writer variant. The application derives the supplement link and the w or m boundary change. The clickable machtia cue shows Source history, object level, silent or sounded realization, ambiguity, and supplement head.",
  ),
  idea(
    "lesson25-lo-source-routes",
    "Keep l; let the lō history derive the rest",
    "For any open typed Source with a licensed lō nonactive history, choose that history only when another licensed history or variant remains possible. The application replaces only final ō with tiā, keeps l, and automatically derives ka or ki, ni or na, kwa or i, s or x, wa or wi, and ti or chi outcomes from the typed Source shape. Class C and D Sources and root-plus-ya histories use the same owner. Reconstructed bridges, unexpected forms, meanings, and Canvas examples are reading evidence, never a stem whitelist or an admission list. The clickable lō cue shows the hidden bridge, retained l, automatic alternation, available variant, participant transfer, and target.",
  ),
  idea(
    "lesson25-lia-causatives",
    "Choose liā's role only when the composition is ambiguous",
    "A typed denominal-ti Source keeps its ti and receives liā; a typed root-plus-ya Source loses ya and receives liā. The application derives the Source segmentation, deletion, participant transfer, and Class C Result automatically. Choose Causative versus Applicative only when the same visible liā form genuinely supports both roles in the final composition, and confirm a Source history only when more than one remains licensed. Deverbal histories, lexical meanings, exceptions, and Canvas examples remain reading evidence rather than a stem list. The clickable liā cue shows Source segments, ya deletion, derivation role, participant change, Class C, and any real ambiguity.",
  ),
  idea(
    "lesson25-huia-class-and-parallel-causatives",
    "Keep licensed huiā and parallel causatives distinct",
    "For any open typed long-o Source, the application derives each licensed direct huiā, o-to-a plus huiā, or lō-to-tiā history and assigns every tiā, liā, and huiā causative to Class C. Choose a Source history, Causative versus Applicative role, or Type 1 versus Type 2 only when both grammatical results remain possible for the final composition. Parallel causatives remain distinct even when their meanings match; a meaning comparison never selects the operation. Canvas examples and lexical meanings are cues, not a stem whitelist. The clickable huiā or parallel cue shows the selected history, role, Class C Result, parallel formation, and read-only meaning relation.",
  ),
  idea(
    "lesson25-basic-causative-transformation",
    "Choose the causer; let the Source determine the causee",
    "For any open typed Source, choose the new causer and resolve coreference only when the final composition leaves a real referent choice. The application compacts the Source event, transfers its subject into the causative object, and imports the new outer subject. An active Source normally produces a specific causee, matching participants can produce a reflexive causee, and an impersonal Source transfers its implicit agent as a nonspecific causee. Object-prefix shape, person, governor, and participant level are automatic. The causee is object-like in the outer clause but remains subject-like inside the embedded event. Literal and lexical translations and Canvas examples are reading evidence, not controls. The clickable participant cue shows Source voice, old and new subjects, causee kind, governor, level, and coreference status.",
  ),
  idea(
    "lesson25-double-object-causatives",
    "Choose participants; derive mainline and shuntline automatically",
    "Build the causative from an open typed active-transitive, passive, or impersonal Source, then choose only the new causer and genuine referent identities. The application promotes the new causative object to mainline and preserves the older Source object on the shuntline. It derives prefix order, specific-object compatibility, silent specific shuntlines, source-agent transfer, and the change from retained source m-o to shuntline ne unless real coreference requires n-o or m-o. Mainline, shuntline, silence, ne, and prefix position are never manual controls. Conative and lexical readings and Canvas examples remain reading guidance. The clickable double-object cue shows Source voice, both object levels, governors, sounded or silent realization, ne, and coreference.",
  ),
  idea(
    "lesson25-triple-object-causatives",
    "Recapture the Result; derive all three object levels",
    "Choose an owner-issued double-object causative Result as the recursive Source, choose the new causer, and resolve only genuine participant identity. The application performs another ordinary causative operation and derives the new mainline object plus the two older shuntline levels, including specific, reflexive, or nonspecific outcomes, licensed silence, prefix order, Source-voice consequences, and coreference exceptions. A visible causative-shaped stem or a copied Result cannot authorize recursion; the captured canonical Result carries the needed history. No separate triple-object engine or manual level controls are added. Canvas examples are non-exhaustive reading evidence. The clickable recursive cue shows the captured Source link, three levels, governors, silence, prefix order, and participant identities.",
  ),
  idea(
    "lesson25-causative-ambiguity",
    "Keep every licensed Source until context really resolves it",
    "An ambiguous multiple-object causative Result can preserve more than one licensed typed Source analysis. Choose an intended Source only when the final composition or real context requires resolution; otherwise leave the reading open. The application keeps fixed prefix order, specific-object incompatibility, ne replacement, silence, and every still-possible analysis automatic. A surface string never chooses or authorizes its Source. Contextual interpretations and Canvas examples are reading guidance, not controls or stem permissions. The clickable ambiguity cue shows the competing Sources, their voices and object histories, the fixed Result, and which reducers actually apply.",
  ),
  idea(
    "lesson25-mood-and-nonactive-voice",
    "Use the ordinary Mood and Voice controls after causativization",
    "First complete the causative VNC, then choose the intended Mood or passive or impersonal Voice through the ordinary controls. The application derives optative, command, exhortation, admonitive, passive, and impersonal forms through their shared owners while preserving the remaining causative objects and participant levels. Lesson 25 adds no second mood lane and no special passive control. Formula comparisons, lexical readings, and Canvas examples remain reading evidence. The clickable later-layer cue shows the completed causative, selected Mood or Voice, canonical form change, and retained participant hierarchy.",
  ),
  idea(
    "lesson25-silent-object-supplementation",
    "Supply the supplement; choose its silent head only when needed",
    "Reuse Lesson 17 supplementation for any grammatically present silent direct or shuntline causative object. Supply the supplement and choose which eligible silent object it targets only when more than one head remains possible. The application validates referent identity, preserves the object's derivational level and silence, and lets the supplement clarify person or number without making the object overt in the principal. The three Canvas clauses are examples, not a closed list. The clickable nested-link cue shows the principal, silent head, supplement, shared referent, preserved level, and clarified reading.",
  ),
]);

export function isLesson25ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON25_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson25ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="25">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 25</span>
                      <small>Second-type causatives</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON25_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
