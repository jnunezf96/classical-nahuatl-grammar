const freeze = value => {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freeze);
  return Object.freeze(value);
};

const idea = (ideaId, title, guidance) => freeze({ ideaId, title, guidance });

export const LESSON29_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson29-purposive-foundation-and-future-embed",
    "Choose Purposive; the future embed and link are automatic",
    "Choose Purposive for purposeful movement toward or away from a place. The application sends the typed verbstem through the shared Class A, B, C, or D future-stem rule, then builds a linked, connectiveless compound with the future action in the embed. Thus a Class C Source such as ihcuil-o-ā supplies ihcuil-ō before the normally silent ⎕ future boundary; the Source itself remains fully preserved. Movement comes before the intended action. The separate rare sounded-future checkbox is only for the explicitly requested, attested but nonpreferred z form. The clickable cue shows the typed Source, its future embed, boundary, compound type, and event order. Examples explain the pattern and never limit which compatible typed verbstem you may enter.",
  ),
  idea(
    "lesson29-internal-directional-matrix",
    "Direction comes from the series; t or c/qu follows automatically",
    "The Purposive series already says outbound or inbound, so there is no second Direction choice. The application builds an intransitive purposeful-motion matrix, uses internal t for outbound motion or internal /k/ written c or qu for inbound motion, and puts it after the future boundary. It derives c versus qu from the surrounding sounds. This internal t is not the Lesson 28 connective, and neither internal directional is the ordinary external on or huāl. The clickable cue shows the direction, internal morph, spelling, position, and contrast.",
  ),
  idea(
    "lesson29-purposeful-motion-base-and-series-system",
    "Choose one of six series; the motion base and finite pattern follow",
    "Choose one of the six Purposive series, which combines direction, mood, and tense in one choice. The application derives imperfective i with singular uh or plural hui, or perfective o where the series requires it; this o is not on-o. It then supplies zero finite tense and the ordinary singular Ø-Ø or plural Ø-h number dyad. Unlicensed combinations are rejected, but compatible typed Source stems remain open and Canvas examples are never a whitelist. The clickable cue shows the selected series, base, number partner, zero tense, and final dyad.",
  ),
  idea(
    "lesson29-outbound-nonpast-and-progressive-contrast",
    "Read outbound nonpast as present or future; keep it separate from the progressive",
    "Choose outbound nonpast indicative once. The application derives singular t-ī-uh or plural t-ī-hui without changing vowel length, preserves the typed subject and objects, and leaves both present-like and future-like readings available because context chooses the time reading. In a Purposive, the future embedded action begins after the going; in a Progressive, the embedded action is already happening during the going. The Purposive has internal directional t, while the Progressive has connective ti. Vowel length, glottal stops, and the Class B shape normally show the difference. Only an underspecified traditional spelling that erases those clues calls for a Purposive-versus-Progressive analysis. The clickable cue shows the number shape, reading range, event order, boundary, and sound evidence.",
  ),
  idea(
    "lesson29-outbound-past",
    "Read outbound past from t-o and use ordinary ō only when wanted",
    "Choose outbound past indicative once. The application derives perfective t-o, zero finite tense, and ordinary singular or plural number. Context supplies a simple past, habitual past, or anterior past reading; those are not three generator controls. The ordinary antecessive ō particle remains an optional sentence choice. A first- or third-person form can resemble a connective-t compound with on-o in an optative sentence, especially when glottal stops are not written. Typed structure and mā context resolve that difference; mā never introduces the past Purposive. The clickable cue shows t-o, number, reading range, optional ō, and the contrastive analysis.",
  ),
  idea(
    "lesson29-outbound-optative",
    "Build the outbound optative automatically; choose only n or the marked early singular",
    "Choose outbound nonpast optative once. The application derives ordinary t-i, the subject markers, and regular singular Ø or plural h. The free plural n variant is a real user choice and automatically requires long ī before n. Commands, exhortations, wishes, self-encouragement, and self-suggestion are contextual readings; let means an exhortation here, not permission. Second-person x or xi comes from the ordinary finite grammar. Purposive t-i plus finite number stays structurally distinct from the admonitive perfective plus t-ih or t-in, even where underspecified writing makes the surface identical; only then is an analysis choice real. The early singular stem-final glottal form is available only through its clearly marked alternative, while ordinary t-i remains preferred. The clickable cue shows the readings, h/n contrast, long ī, second person, admonitive boundary, and marked variant.",
  ),
  idea(
    "lesson29-inbound-nonfuture",
    "Read inbound c-o across the whole nonfuture range",
    "Choose inbound nonfuture indicative once. The application derives internal hither /k/, written c or qu from its sound environment, followed by perfective o and ordinary singular or plural number. Context can give the one form a present, preterit, imperfect, or distant-past reading; these are not extra controls. Ordinary antecessive ō remains optional and can occur even with a present translation because it points back to the past act of purposing, not to the intended action. Internal hither /k/ remains separate from external huāl. The clickable cue shows c-o, number, the complete reading range, optional ō and its scope, and the internal-versus-external distinction.",
  ),
  idea(
    "lesson29-inbound-future",
    "Subject number automatically selects qu-ī-uh or qu-i-hui",
    "Choose inbound future indicative once. The application preserves the typed Source, future embed, valence, subject, and objects, then derives singular qu-ī-uh or plural qu-i-hui from subject number. It also supplies zero finite tense and the ordinary number ending. The same rule works across compatible typed Source classes; Canvas verbs demonstrate it and never form an admission list. The clickable cue shows future hither-purpose meaning, the number-conditioned matrix shape, silent future boundary, participants, and open Source admission.",
  ),
  idea(
    "lesson29-inbound-optative",
    "Build inbound qu-i once; let context supply its optative reading",
    "Choose inbound nonpast optative once. The application derives qu-i, ordinary subject and object carriers, zero finite tense, and singular or plural number while preserving the future purpose relation. A command, exhortation, wish, self-encouragement, or self-suggestion is a contextual reading of that structure, not another form choice. English let is exhortative here, not permissive. Compatible typed Sources stay open across classes, and examples are evidence only. The clickable cue shows qu-i, participants, number, silent future structure, the full reading range, and the nonpermissive meaning.",
  ),
  idea(
    "lesson29-nonactive-purposive-embeds",
    "Continue an existing passive or impersonal Result into Purposive",
    "Choose passive or impersonal through the ordinary Voice grammar, then continue that owner-issued Result into Purposive. The application preserves the nonactive stem, voice, valence, and changed participant pattern; places the silent future boundary outside the nonactive stem; and derives the selected direction, series, matrix, number, and finite Result. Negative sentence particles remain outside the completed verbstem. This is the same future-embed principle used in Lesson 28, not a second Lesson 29 voice engine. The clickable cue shows the preserved voice and stem, participants, outer future boundary, and shared continuation path. Canvas examples never restrict which compatible nonactive Result may continue.",
  ),
  idea(
    "lesson29-compound-stemmed-purposive-embeds",
    "Continue a completed compound Result as the Purposive embed",
    "Capture an owner-issued compound VNC Result and choose Purposive as its next derivation. The application preserves the entire inner compound—its brackets, connective, valence, voice, reflexive or projective participants, and event relation—then places the outer silent future boundary and purposive matrix around that completed Result. The hierarchy must remain acyclic, and every later continuation keeps the inner Result intact. There is no example picker, depth control, participant-copy control, or second recursive engine. The clickable cue shows the captured compound stem, preserved inner structure, outer boundary, event order, and validated hierarchy.",
  ),
  idea(
    "lesson29-external-directionals-and-fulfilled-purpose",
    "Keep external on or huāl separate from internal Purposive direction",
    "Ordinary stem-external on or huāl can receive a purposive reading in context without becoming a formal Purposive verbstem. On a formal Purposive, choose an optional external directional independently of the internal t or /k/: the two directions may match or disagree because the embedded action and purposeful-motion matrix remain separate actions. On can express away, thither, or there; huāl expresses hither and may continue or intensify movement. Context may yield intended purpose, fulfilled purpose, metaphorical movement, or muted intention, but these readings add no translation or meaning controls. The clickable cue shows both directional layers, their agreement or disagreement, scope, participants, and the open contextual readings.",
  ),
]);

export function isLesson29ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON29_READER_GUIDANCE_GROUPS);
}

export function renderLesson29ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="29">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 29</span>
                      <small>Purposive verbstems</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON29_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
