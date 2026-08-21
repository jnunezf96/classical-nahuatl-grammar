const freeze = value => {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freeze);
  return Object.freeze(value);
};

const idea = (ideaId, title, guidance) => freeze({ ideaId, title, guidance });

export const LESSON30_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson30-nominal-embed-foundation-and-object-valence",
    "Choose the two Sources and their relation; the compound follows",
    "Choose Nominal embedding, the typed NNC and VNC Sources, and object, adverb, or complement only where more than one relation is genuinely possible. The application uses the noun's general-use stem, preserves both Source shapes and their internal boundary, and derives the compound through the one canonical VNC path. Object incorporation removes exactly one object position; adverb and complement incorporation do not use this object rule. The clickable cue shows both stems, the realized nounstem, relation, boundary, and before-and-after valence. Canvas examples prove the grammar and never limit which compatible Sources you may enter.",
  ),
  idea(
    "lesson30-single-object-incorporation",
    "One incorporated object automatically makes the matrix intransitive",
    "With a typed single-object matrix, the incorporated NNC satisfies its only object position. The application removes that object carrier, keeps the finite subject, derives an intransitive compound, and preserves the complete Source analysis. There is no object-pronoun or valence switch. The resulting canonical VNC can be used by Later derivation in the ordinary way. The clickable cue shows the incorporated role, missing object carrier, retained subject, intransitive Result, and continuation. Special example meanings remain reading facts, not controls or stem admission rules.",
  ),
  idea(
    "lesson30-higher-valence-object-incorporation",
    "Consume one typed object level and keep every other participant",
    "With a double- or triple-object matrix, incorporation consumes the typed object level matched by the NNC and leaves every other object in its original governor and derivational level. A double-object Source therefore yields one remaining object; a triple-object Source yields two. The structurally determined role is automatic. An object-role choice appears only if the typed Source itself leaves more than one compatible match. The clickable cue shows the consumed role, remaining nuclear objects, shuntline structure, one-level valence reduction, boundaries, and Later-derivation availability. Examples never become role or stem lists.",
  ),
  idea(
    "lesson30-exceptional-tla-fusion-and-source-ambiguity",
    "Use the exceptional reading only with an intransitive tla-fused matrix",
    "A typed intransitive matrix whose Source begins with fused tla can take the nominal embed as an adverb meaning form, nature, or resemblance. The noun is not the matrix object. If the same Source also permits an ordinary means or instrument reading, choose the intended analysis; otherwise the application derives it automatically. The clickable cue shows fused tla inside the matrix, the adverbial embed outside it, unchanged intransitive valence, and the selected analysis. This depends on Source structure, never a list of example stems.",
  ),
  idea(
    "lesson30-incorporated-adverb-foundation",
    "Adverb incorporation preserves the matrix and its valence",
    "An incorporated adverb can come directly from an adverbial NNC or from a transformed supplement. These histories may look alike, but the application keeps them distinct. When the typed Source supplies only one history, no choice is shown; choose a history only when more than one remains possible. The matrix may be intransitive or transitive, and every participant and object position remains unchanged. The clickable cue shows the Source history, adverb boundary, matrix participants, unchanged valence, and ordinary continuation without using an idiomatic translation as grammar.",
  ),
  idea(
    "lesson30-means-and-instrument-adverbs",
    "Means and instrument stay adverbial; referent identity controls possession",
    "Choose means or instrument only when both readings are genuinely possible. The nominal embed never becomes the finite subject or a passive agent, and incorporation does not change matrix valence. If typed referent identity makes an intimate possessor the same referent as a matrix participant, the application deletes its separate representation automatically; a different possessor remains represented. A referent choice appears only when identity is unresolved. The clickable cue shows means or instrument, the participant link, deleted or preserved possession, unchanged valence, and the complete typed Source. Noun identity and Canvas examples never gate the rule.",
  ),
  idea(
    "lesson30-place-adverbs",
    "A place embed keeps its full internal structure and the matrix intact",
    "A typed NNC Result may be incorporated as a place adverb whether its Source is simple or compound. The application preserves every internal boundary, the matrix subject and objects, and unchanged valence. If an intimate possessor is the same referent as a matrix participant, its separate representation disappears automatically; choose a referent only when identity is genuinely unresolved. The clickable cue shows the place relation, complete embed structure, participant continuity, possession, and unchanged valence. No place example, compound template, or nounstem list authorizes the rule.",
  ),
  idea(
    "lesson30-time-duration-cause-and-purpose-adverbs",
    "Typed relation gives time or cause its scope; translations remain readings",
    "The same incorporated-adverb owner handles time, duration, cause, and purpose while preserving all matrix participants and valence. The typed Source determines the relation whenever it can. Choose an Analysis only when more than one grammatical relation remains possible. Purpose and lack readings stay compatible contextual readings; they do not become lexical gates. The clickable cue shows the selected relation, temporal extent or causal scope, compatible readings, Source boundaries, and unchanged valence. English translations and Canvas witness stems never authorize admission.",
  ),
  idea(
    "lesson30-manner-and-compared-manner-adverbs",
    "Compared manner asks for a target only when a transitive matrix leaves two",
    "Ordinary manner and form-or-style readings use the shared adverb path and preserve matrix valence. For compared manner, an intransitive matrix automatically compares the subject. A transitive matrix asks for subject or object only when both remain grammatically possible; a typed unique target stays automatic. Cause versus compared manner appears as an Analysis only when both Source histories survive. The clickable cue shows manner scope, comparison target, subject or object orientation, unchanged valence, and any genuine ambiguity. Example identity and translation never decide the grammar.",
  ),
  idea(
    "lesson30-unique-embed-nounstems",
    "A unique lexical stem adds evidence without licensing incorporation",
    "Some nominal embeds survive only inside compound verbstems, and their historical meaning may be uncertain. Supply that lexical analysis only when it is genuinely needed. The application preserves the exact typed Source, internal boundaries, destockal or frequentative history, and real-versus-supportive initial i through ordinary continuation. Reduplication makes the initial i real automatically. The clickable cue shows lexical status, historical Source, vowel analysis, productive boundaries, and uncertainty. The same productive incorporation path remains open without this lexical label, so the small Canvas inventory never becomes a route whitelist.",
  ),
  idea(
    "lesson30-possessive-supplementary-subject-adverbs",
    "A supplementary subject becomes an adverb while its possessor becomes subject",
    "Choose the owner-issued intransitive principal and possessive supplementary NNC. The application incorporates the supplementary predicate as an adverb, changes its possessor from possessive to nominative case, and makes that possessor the finite subject. Its deeper semantic tie to the embed and its referent identity remain intact, while matrix valence stays unchanged. Supplementation and incorporation remain separate roles in one history. The clickable cue shows the captured Sources, possessor-to-subject promotion, embed relation, referent link, unchanged valence, and any genuine compared-manner ambiguity. Body-part, clothing, and family examples never gate the transformation.",
  ),
  idea(
    "lesson30-possessive-supplementary-object-and-passive-adverbs",
    "Typed history controls possessor-to-object promotion and passage through passive",
    "With a transitive principal and possessive supplementary object, the application incorporates the nominal adverbially and changes its possessor from possessive to objective case without changing matrix valence. Intimate possession blocks an applicative principal by typed derivational history, not stem spelling; a licensed less-intimate imitation remains distinct. Under passive, the active basic subject is discarded and its supplementary subject must become an adverb to survive, while the former object becomes passive subject and no passive agent can be expressed. The clickable cue shows Source history, promotion, participants, possession type, passive consequences, restrictions, and any genuine means-versus-supplement choice.",
  ),
  idea(
    "lesson30-incorporated-complements",
    "Referent identity links a complement to its matrix participant",
    "A complement is a necessary internal completion of the matrix, not an incorporated object, so matrix valence and every participant remain unchanged. The embedded nominal subject disappears automatically only when typed referent identity makes it the same participant as the matrix subject or object. Choose subject versus object, considering versus changing, or one of several object referents only when the typed Source leaves a real ambiguity. The clickable cue shows complement kind, the shared referent, deleted embedded subject, preserved matrix participant, unchanged valence, boundaries, and the productive w-plus-m assimilation. Contextual translations and Canvas example stems never authorize the route.",
  ),
  idea(
    "lesson30-reduplication-and-nonactive-continuation",
    "Reduplication keeps its boundary; nonactive follows current valence",
    "Reduplication may belong to the nominal embed, the matrix, or both. Choose a target or semantic scope only when more than one grammatical analysis survives; the application preserves both Source boundaries and derives repetition, distribution, alternation, or similarity. After incorporation, the completed compound enters the ordinary nonactive owner. A remaining specific object permits passive, while an intransitive Result or one with only nonspecific objects permits impersonal. The clickable cue shows reduplication target and meaning, completed-compound valence, available voice, promoted participant or faceless impersonal subject, and the preserved canonical continuation. A single-object incorporated object is already intransitive, so it cannot form a passive.",
  ),
  idea(
    "lesson30-embed-is-not-agent-or-subject",
    "The nominal embed never becomes the finite subject or an agent",
    "Across every Lesson 30 route, the nominal embed keeps its incorporated object, complement, or adverb role. It is never the finite subject and never the passive agent. A means or instrument reading remains adverbial. Under passive, the specific object becomes subject and no passive agent can be expressed; under impersonal, the finite subject is a faceless third-singular nominative participant, not the embed. These are automatic constraints, so there is no subject, agent, or translation control. The clickable cue keeps the embed role, finite subject, participant changes, passive barrier, and translation warning visible.",
  ),
]);

export function isLesson30ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON30_READER_GUIDANCE_GROUPS);
}

export function renderLesson30ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="30">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 30</span>
                      <small>Nominal embeds</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON30_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
