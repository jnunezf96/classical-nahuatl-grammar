const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId,
  title,
  guidance,
});

export const LESSON33_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson33-honorific-vnc-foundation-and-participant-gate",
    "Honorific grammar respects another participant",
    "Start with a complete neutral VNC Source. The Source analysis tells the application which honorific formations are licensed. If it licenses one formation, the application uses it automatically; if it licenses both causative and applicative, the user chooses between them. The respected participant is chosen only when the clause genuinely permits more than one reading. A first-person participant cannot honor itself, but a first-person subject may honor an object that is actually present. The mainline reflexive relation is automatic. English H notation and translations are reading aids only. The clickable cue shows the neutral Source, respected participant, available and selected formation, reflexive relation, self-honorification restriction, and lack of example authority.",
  ),
  idea(
    "lesson33-intransitive-causative-honorifics",
    "Causative honorifics reuse ordinary causative grammar",
    "When typed Source analysis licenses the causative formation, the application sends that Source through the ordinary causative owner and makes the caused participant reflexive with the Result subject. Source shape, vowel length, class, valence, and internal boundaries determine the ordinary causative realization. The user never builds Type 1, Type 2, liā, reflexive prefixes, connective structure, or spelling by hand: one canonical shape is automatic, and several real canonical shapes become a concise choice. A separate choice appears only when typed lexical analysis licenses more than one real causative alternative. Irregular, suppletive, connective-preferred, and mood-defective forms remain lexical facts rather than a verb list. Canvas examples prove these rules but never authorize a Source. The clickable cue shows Source structure, causative realization, reflexive coreference, lexical alternative, mood consequence, and open typed admission.",
  ),
  idea(
    "lesson33-intransitive-applicative-honorifics",
    "Applicative honorifics express acting in one's own interest",
    "When typed Source analysis licenses the applicative formation, the application sends that Source through the ordinary applicative owner and adds a subject-coreferential reflexive object automatically. The literal reading is acting in one's own interest. If only the applicative is licensed, it is automatic. If causative and applicative are both licensed, the user chooses the intended formation and a documented preference appears only as guidance. An applicative that exists only in honorific use stays a typed lexical fact. No miqui, chōca, or other example list can gate the rule. The clickable cue shows applicative shape, reflexive coreference, own-interest reading, route availability, preference, honorific-only status, Source boundaries, and lack of example authority.",
  ),
  idea(
    "lesson33-projective-applicative-honorifics",
    "Projective honorifics keep their original objects",
    "A projective VNC keeps every object already present when the ordinary applicative owner adds the subject-oriented reflexive beneficiary. Object person, number, grammatical role, and Source order remain automatic. The literal structure says that the subject acts for its own benefit, but respect may be directed toward the subject or an existing object. When both readings survive, the user chooses the respected participant because the Nahuatl form itself does not distinguish them. With a first-person subject, the subject cannot honor itself, so the application selects the existing object automatically and hides that choice. English H placement never decides the participant. The clickable cue shows the retained projective objects, reflexive beneficiary, own-benefit reading, possible honored participants, genuine ambiguity, first-person consequence, and lack of English-gloss authority.",
  ),
  idea(
    "lesson33-derived-causative-and-applicative-sources",
    "A completed derivation can become the next honorific Source",
    "A causative or applicative Result can continue into an honorific only when it is the complete owner-issued Result, not a retyped stem, copied formula, or example spelling. The application retains the inner derivation, higher agent, lower agent or source participant, theme, object order, and morphemic boundaries, then adds the ordinary applicative reflexive beneficiary. A first-person embedded participant cannot be selected as the respected object; an eligible nonspecific theme can remain the object reading and may be singular or plural in context. The user chooses subject versus object only when both respected-participant readings genuinely survive. Recapture, preservation, and realization are automatic. The clickable cue shows the inner derivation, retained participants and themes, added beneficiary, available respected targets, preserved boundaries, and lack of formula, surface, or example authority.",
  ),
  idea(
    "lesson33-projective-causative-honorifics",
    "A causative honorific keeps the patient and makes the agent reflexive",
    "When a projective Source has typed analysis licensing the causative honorific, the application keeps the existing patient and sends the Source through the ordinary causative grammar. The added reflexive participant is the same person as the Result subject, so the literal structure says that the agent causes itself to perform the action. Respect may point to the agent or the patient; that choice appears only when both readings remain possible. A first-person subject cannot honor itself, so an eligible patient is selected automatically. A sole causative or applicative route is automatic, while genuinely available routes or stem realizations remain concise choices. The caqui, nequi, and cuepa forms preserve their documented lexical realizations, but they do not form a list that controls which other Sources may use the rule. Any compatible typed Source follows the same productive grammar. The clickable cue shows the retained patient, reflexive agent, respected participant, route and realization choices, and absence of example authority.",
  ),
  idea(
    "lesson33-mainline-reflexive-preterit-embed-honorifics",
    "A mainline reflexive Source automatically becomes a preterit embed",
    "When the complete neutral Source already has a mainline reflexive object, that topology itself selects the honorific preterit-embed construction. The application takes the canonical perfective stem supplied by the Source's verb class, adds the silent preterit morph, incorporates that whole reflexive predicate as the object of the fixed tla-(tzin-o-ā) matrix, and preserves the Source object pronouns. This follows the integrated-compound pattern used by future embed, but perfective plus silent preterit replaces imperfective plus future z. The user does not choose the route, matrix, perfective form, object replacement, or bracketing. A shuntline reflexive is different: it remains inside an ordinary projective Source and follows that Source's compatible honorific route. The Class A, B, C, and D examples show the productive class behavior; they do not authorize a stem list. The clickable cue shows the reflexive topology, canonical perfective, silent preterit, fixed matrix, replaced matrix object, retained participants, and lack of example authority.",
  ),
  idea(
    "lesson33-reverential-double-honorifics",
    "A reverential adds a second honorific layer to a completed honorific",
    "A reverential is available only after the application has produced a complete owner-issued honorific Result. Choosing reverential intensity recaptures that Result, derives its canonical perfective preterit predicate, and incorporates it into a second fixed tla-(tzin-o-ā) matrix. The second layer is automatic. The neutral Source, inner honorific, and outer reverential remain three visible levels with their boundaries intact. If the inner honorific could respect either subject or object, that real choice was resolved in the inner layer and the reverential preserves it; the outer layer does not invent a new participant choice. Raw stems, copied honorific spellings, formulas, surfaces, and example forms cannot enter this route. The clickable cue shows the three-level hierarchy, inherited respected participant and ambiguity, perfective preterit embed, outer matrix, retained participants, preserved boundaries, and owner-issued authority.",
  ),
  idea(
    "lesson33-pejorative-preterit-embed-vncs",
    "A pejorative puts the Source perfective inside a fixed disparaging matrix",
    "An intransitive, projective-object, or reflexive VNC can become pejorative. The application takes the canonical perfective supplied by the Source's verb class, adds the silent preterit morph 0, and incorporates that predicate where the specific object of fixed tla-(pōl-o-ā) would stand. The matrix, perfective, replacement, and bracketing are automatic. Existing objects, their number, person, and grammatical roles remain part of the Result. Unlike honorification, pejorative grammar allows a first-person subject to disparage itself. A projective Source may leave a real choice between disparaging the subject and disparaging its object; that choice is shown only while both readings survive. Reflexive subject and object are the same referent, so they do not create a false choice. The Class A, B, C, and D examples prove productive class behavior and never authorize a stem list. The clickable cue shows Source topology, canonical perfective, silent 0, fixed matrix, retained participants, available disparaged participants, self-disparagement, and lack of formula, surface, or example authority.",
  ),
  idea(
    "lesson33-compound-verbstem-attitude-scope",
    "Compound structure decides where the attitude belongs",
    "A compound honorific or pejorative begins with the complete owner-issued compound Source. In an ordinary compositional compound with an intransitive matrix, the application transforms the embed. If typed Source analysis says that the whole compound is one lexicalized verbstem, it transforms the matrix. A shared-object compound also transforms the matrix so the shared object remains part of the completed Result. The connector, both Source members, objects, outer subject, mood, tense, and internal boundaries are preserved automatically. The user never chooses embed versus matrix directly. A concise compositional-versus-lexicalized Source-analysis choice appears only if both structures genuinely remain possible. The cui + huetzi examples show both analyses, but their spelling does not decide between them and no example list gates the rule. The clickable cue shows the typed compound structure, automatic scope and reason, preserved objects and boundaries, any real Source-analysis choice, and lack of formula, surface, or example authority.",
  ),
]);

export function isLesson33ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON33_READER_GUIDANCE_GROUPS
  );
}

export function renderLesson33ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="33">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 33</span>
                      <small>Honorific and pejorative VNCs</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON33_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
