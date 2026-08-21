const freeze = value => {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freeze);
  return Object.freeze(value);
};

const idea = (ideaId, title, guidance) => freeze({ ideaId, title, guidance });

export const LESSON31_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson31-compound-nounstem-foundation-and-embed-meaning",
    "Choose the two noun Sources; the matrix governs the compound",
    "A compound nounstem combines an embed NNC and a matrix NNC in that order. Enter the two typed Sources, or continue from their owner-issued Results, and choose linked or integrated structure only where the intended Source analysis requires it. The application preserves both morphemic Sources and their boundary, derives the embed's general-use shape, retains final a for a typed tl Subclass 2-B embed, and takes the Result noun class from the matrix. Choose an embed meaning only when more than one grammatical relation remains possible. The clickable cue shows both Sources, order, boundary, realized embed, matrix class, and productive authority. Canvas examples illustrate the rule and never limit valid nounstems.",
  ),
  idea(
    "lesson31-possessor-orientation",
    "Structure and Source history normally settle possession",
    "A linked compound is automatically oriented toward its embed. An integrated compound is normally matrix oriented, while an owner-issued possessive embed can preserve embed orientation from its adjoined-predicate history. Matrix government and possessor orientation are separate facts: the matrix still governs the compound's noun class even when the possessor points to the embed. The application shows a possessor-orientation choice only for a possessive integrated Source that genuinely permits both readings. The clickable cue shows the selected target, available alternatives, the grammatical reason, and the preserved possessor. Example compounds do not create an orientation list.",
  ),
  idea(
    "lesson31-matrix-authority-and-translation-reversal",
    "Read the typed matrix, not the English word order",
    "The typed matrix is the grammatical head and class governor even when an English or Spanish translation reverses the apparent relation or hides the Nahuatl structure. Swapping embed and matrix creates a different typed Source, not another gloss for the same analysis. Choose which constituent is matrix only where Canvas and the typed lexical analysis genuinely license both structures; otherwise the Source settles it. The clickable cue shows the matrix, governed class, ordered constituents, and the warning that translation, dictionary wording, formulas, surfaces, and stored examples have no grammatical authority.",
  ),
  idea(
    "lesson31-simple-embed-class-examples",
    "The typed embed class supplies its ordinary compound shape",
    "Choose the two typed NNC Sources and identify the embed nounstem class. For tli, in, zero, and tl Subclass 1 embeds, the application automatically uses the ordinary general-use stem and applies regular boundary phonology. The matrix Source still governs the Result noun class. No example noun, class consequence, or allomorph needs a separate choice. The clickable cue shows the embed class, full Source shape, realized compound shape, boundary rule, matrix, and Result class. Canvas examples prove the productive pattern but never authorize a list of stems.",
  ),
  idea(
    "lesson31-tl-subclass-two-and-boundary-alternations",
    "Shape is automatic; only a real lexical exception is supplied",
    "A typed tl Subclass 2 Source tells the application whether its ephemeral final vowel is removed, retained, or repaired with supportive i. Final a in Subclass 2-B is retained automatically. Choose a lexical analysis only for a genuinely marked loss, an attested long-vowel glottalized form, or an unexpected compound variant. Once the lexical fact is supplied, sound changes such as final h becoming y before a vowel follow automatically. The negative ah embed is read from its typed Source. The clickable cue keeps the fuller Source class and final edge beside the lexical fact, boundary rule, and realized Result; example identity never gates the rule.",
  ),
  idea(
    "lesson31-unique-compound-only-nounstems",
    "Compound-only status is evidence, not permission",
    "A nounstem that occurs only inside compounds may fill either the embed or matrix position. Supply that unique lexical status only when it is genuinely part of the Source analysis, together with whether its meaning is known or uncertain; morphemic boundaries, historical Source, and related formations remain preserved when available. The ordinary compound owner still applies. The same structurally valid compound remains productive without being on a Canvas list. The clickable cue shows unique status, position, uncertainty, boundaries, related formations, and that this evidence has no route-authorizing power.",
  ),
  idea(
    "lesson31-ca-matrix-compounds",
    "The ca matrix is lexical; its compatible embeds remain open",
    "The compound-only matrix ca means an entity associated with, characterized by, or made from the embed. Once the typed Source identifies ca as the matrix, compatible typed embeds use the productive compound owner; the listed compounds do not form a vocabulary gate. The matrix Source class derives the Result as tl Subclass 1-A or the less common tl Subclass 2-C. A nounstem merely ending in ca is kept separate when its typed Source says tl Subclass 2-B. Choose the ca-matrix analysis only for a real lexical ambiguity. The clickable cue shows ca status, embed contribution, Result subclass, uncertain meaning, later uses, and the structural final-ca contrast.",
  ),
  idea(
    "lesson31-yo-matrix-and-possessive-embed",
    "Keep absolutive and tla-possessive yō embeds distinct",
    "The compound-only yō matrix contributes abundant ownership or characteristic quality and is a typed tl Subclass 1-B Source. Its embed may come from an absolutive NNC or from a possessive NNC with nonspecific nonhuman possessor tla. Choose that history only when both typed analyses survive; an owner-issued embed Result settles it automatically. The application preserves internal possession, vowel length, and morphemic boundaries; applies licensed boundary assimilation automatically, including l plus yō becoming llō and x plus yō becoming xxō; and shortens final ō to o automatically before the possessive-state zero dyad. Translation cannot infer the history, and corrected Canvas examples prove these structural rules without authorizing stems. The clickable cue shows Source class, matrix meaning, embed state, tla, assimilation, state realization, and later specialized uses.",
  ),
  idea(
    "lesson31-conjunctive-compounds",
    "Conjuncts are equals, not embed and governor",
    "A conjunctive compound joins two equal NNC Sources. Choose conjunction only where it genuinely competes with a governed compound analysis. The first Source must supply a tl or tli number-one ending: the application automatically preserves l from a tl Source or tl from a tli Source as the first-conjunct vestige. The second conjunct supplies the Result class without becoming a grammatical governor. In the possessive state, the preserved Result may later continue as separate conjoined NNCs through the double-nucleus owner; no breakup control is added here. The clickable cue shows equality, vestige, Result class, possessive continuation, and that examples never select the structure.",
  ),
  idea(
    "lesson31-recursive-compound-embeds",
    "A completed compound can become the next embed",
    "Select an owner-issued compound NNC Result and an outer matrix. The application recaptures the complete inner Result as the new embed, preserves its Source classes, internal matrix relation, possession, morphemic boundaries, and canonical Result, and derives the unique outer hierarchy automatically. Every new layer remains acyclic and takes its Result class from its own outer matrix. No depth, example-template, or manual-boundary control is added. The clickable cue shows the inner matrix, outer matrix, bracketing, depth, boundaries, class, and preserved Result authority.",
  ),
  idea(
    "lesson31-recursive-matrices-and-bracketing-ambiguity",
    "A completed compound can also become the matrix",
    "An owner-issued compound NNC Result may fill the matrix subposition, or completed compound Results may fill both subpositions. The outer Result class comes from the complete outer matrix Result, while every inner hierarchy and boundary remains intact. Bracketing is derived automatically when captured Result roles settle it; a user choice appears only if the same typed constituents genuinely support more than one acyclic hierarchy. Surface spelling and examples cannot flatten or select the structure. The clickable cue shows all nested matrices, Result class, depth, available bracketings, and whether a choice was genuinely required.",
  ),
  idea(
    "lesson31-sex-distinction-compounds",
    "Sex distinction is typed; animate stems remain open",
    "Choose sex as the embed relation only when the intended animate referent is being specified as male or female, then supply the compatible typed sex-denoting NNC Source. The application attaches that embed to the animate matrix referent, preserves referent identity, and derives the ordinary compound shape and matrix-governed class automatically. Without the sex embed, the human or animal expression remains neutral where its Source permits that reading. Canvas examples prove the construction but never create a list of permitted people or animals. The clickable cue shows sex value, embed Source, animate referent, neutral contrast, Result class, and non-authorizing evidence.",
  ),
  idea(
    "lesson31-progeny-and-fellowship-compounds",
    "The lexical matrix supplies progeny or fellowship meaning",
    "For progeny, conē or pil-tōn is the typed matrix and the animal or other description is an open compatible embed; Canvas examples do not make an animal list. Conē has the Lesson 31 woman-specific nuance when the referent is a human child, while pil-tōn supplies the animal-offspring synonym described here. Fellowship uses possessive poh and keeps the subject, possessor, number, and possessor orientation linked through ordinary NNC inflection. Choose the intended lexical matrix and participant relation only when the Source has not already settled them. The clickable cue shows the matrix meaning, embed, human nuance or peer relation, participants, possession, plurality, and non-authorizing examples.",
  ),
  idea(
    "lesson31-affinity-reduplication-scope",
    "Typed Source analysis settles affinity scope whenever it can",
    "Affinity reduplication belongs to a plural compound Source and may apply to the embed, matrix, or both according to its typed lexical analysis. The application preserves vowel quantity and the internal boundary and carries whether the pattern is optional or obligatory. It shows a scope choice only when that analysis genuinely licenses more than one target; a unique or obligatory target is automatic. Possessive compounds keep their possession separately from affinity scope. The clickable cue shows the plural subject, licensed and selected targets, optional or obligatory status, boundary, vowel quantity, and why no example list authorizes the pattern.",
  ),
  idea(
    "lesson31-distributive-varietal-reduplication",
    "Distribution or variety always reduplicates the embed",
    "In a compound meaning distribution or different varieties, reduplication applies to the embed automatically. The user chooses distribution versus variety only when context really leaves that meaning open; there is no target or sound-change choice. The application preserves the full Source boundary together with vowel and glottal evidence and keeps this pattern distinct from affinity reduplication on a matrix. The clickable cue shows the selected or unresolved reading, automatic embed target, preserved shape evidence, affinity contrast, and the fact that Canvas examples prove rather than authorize the rule.",
  ),
]);

export function isLesson31ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON31_READER_GUIDANCE_GROUPS
  );
}

export function renderLesson31ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="31">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 31</span>
                      <small>Compound nounstems</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON31_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
