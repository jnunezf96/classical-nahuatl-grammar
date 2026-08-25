const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId, title, guidance,
});

export const LESSON43_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson43-nonpreposed-and-supplement-distance",
    "A postposed modifier remains a complete clause",
    "The modifier that follows its head may contain supplementary participants, and those participants may occur at a distance. The principal head, modifier, and supplements keep their own typed identities; English relative wording does not add a Nahuatl relative pronoun.",
  ),
  idea(
    "lesson43-cooperation-and-discontinuity",
    "Several modifiers can cooperate without flattening",
    "Preposed and nonpreposed modifiers may cooperate around one head, or a head and modifier may be discontinuous. Every exact clause remains recoverable, and the selected topology records their order and boundaries rather than reconstructing them from spacing.",
  ),
  idea(
    "lesson43-interrogative-modification-structure",
    "Interrogative NNCs are heads, not relative pronouns",
    "An interrogative pronominal NNC can participate in ordinary modification or supplementation. English may translate the result with a relative expression, but the Nahuatl structure still consists of typed nuclear clauses and their licensed relation.",
  ),
  idea(
    "lesson43-interrogative-head-readings",
    "Structure, reading, scope, and spelling stay separate",
    "The āc, tlêh, and other interrogative patterns preserve their head and scope readings through canonical owner facts. Traditional solid writing and preferred translations remain descriptive evidence; neither one authorizes the grammatical analysis.",
  ),
  idea(
    "lesson43-oc-ce-modified-head",
    "Oc cē keeps a modified-head analysis",
    "The additional-member value commonly translated as another comes from the existing NNC and modification structure. It is not a separate Source class or a lesson-specific formation operation.",
  ),
  idea(
    "lesson43-cem-one-of-group",
    "Cēm- singles one referent from a plural group",
    "The cēm- clause identifies the selected individual while another exact clause identifies the containing group. Their subject pronouns may differ because each clause keeps its own person-number coordinate; the mismatch is licensed only by this typed structure.",
  ),
  idea(
    "lesson43-acah-ayac-one-none-of",
    "Acah and ayāc narrow the same partitive relation",
    "Acah supplies an indefinite candidate and ayāc a negative candidate. A separate plural clause supplies the group. The one-of or none-of profile is derived from those exact Sources and cannot become a general agreement-bypass switch.",
  ),
  idea(
    "lesson43-discourse-conditioned-group-modification",
    "Some group readings require discourse Source facts",
    "Male-bonding requires a male speaker who belongs to the group; named-partner modification requires a known participant plus the named third person. These are owner-issued Source contexts, not example labels, and copied context objects cannot license the Result.",
  ),
]);

export function isLesson43ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON43_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson43ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="43">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 43</span>
                      <small>Nonpreposed and idiomatic adjectival modification</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON43_READER_GUIDANCE_GROUPS.map(group => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
