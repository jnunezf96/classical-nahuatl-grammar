const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId, title, guidance,
});

export const LESSON42_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson42-multiple-nucleus-rank-reversal",
    "Modification joins clauses, not adjective words",
    "The principal NNC contributes the substantival head through its predicate core. The modifier is an adjoined clause sharing its referent. English word order and labels do not determine these ranks, and Lesson 42 adds no adjective Source class.",
  ),
  idea(
    "lesson42-preposed-and-unit-scope",
    "Order and in-marking determine the visible unit",
    "A modifier may follow or precede its head. Preposed in begins the modifier clause and makes the marked structure available as an adjoined unit; it is not topicalization. The same canonical modification owner generates both orders.",
  ),
  idea(
    "lesson42-supplementation-modification-ambiguity",
    "The two readings differ by where the head lives",
    "Supplementation links an adjunct to a nuclear pronoun in the principal clause. Adjectival modification links it to an NNC predicate core. When both typed structures are possible, the interface may expose the relation; translation alone cannot choose it.",
  ),
  idea(
    "lesson42-compound-head-target",
    "A compound head may be targeted at two depths",
    "An exact compound NNC Result can be modified through its matrix or, under the licensed metaphorical reading, as a whole. The compound remains intact and the selected target is recorded explicitly rather than inferred from proximity.",
  ),
  idea(
    "lesson42-vnc-modifiers-and-reference-contact",
    "Transitive modifiers identify the contacted participant",
    "An intransitive VNC modifier normally shares its subject with the head. A transitive VNC may contact its subject or object where the typed participants permit it. Person, number, animacy, meaning, and exact Result identity constrain the choice.",
  ),
  idea(
    "lesson42-nnc-modifier-type-lattice",
    "Existing clause types enter one modification relation",
    "Adverbialized, numeral, quantitive, ordinary, supplementation, pronominal, demonstrative, and measure Results keep their original Source identities. Their head or modifier rank belongs to this composition; no renamed adjectival copies are created.",
  ),
  idea(
    "lesson42-recursive-modification",
    "An exact modification Result can become a larger head",
    "Recursion is an exact Result-to-Source handoff. The inner modification remains recoverable as the head of the outer one, and depth is derived from that identity. A written phrase or copied object cannot reconstruct the chain.",
  ),
  idea(
    "lesson42-incorporated-modification-structure",
    "A lexicalized modification can fill a compound embed",
    "Typed lexicalized-concatenate analysis lets an exact modifier-plus-head Result enter the compound owner. Constituent subject pronouns and the modifier number dyad remain; the head number dyad is deleted. Canvas examples illustrate this privilege but never whitelist it.",
  ),
]);

export function isLesson42ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON42_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson42ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="42">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 42</span>
                      <small>Multiple-nucleus adjectival modification</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON42_READER_GUIDANCE_GROUPS.map(group => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
