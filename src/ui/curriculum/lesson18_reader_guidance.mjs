const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON18_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson18-integrated-and-short-pronominal",
    "Follow the antecessive scope, not only its position",
    "When a subject or object supplement comes before an antecessive VNC, ō may be written on the supplement even though it still concerns the VNC. The integrated and ordinary orders need not differ in English. Short personal-pronominal NNCs such as neh and teh remain complete clauses, but they cannot be independent utterances; they belong inside a larger composition unless they are principals adjoining another constituent.",
  ),
  idea(
    "lesson18-marked-supplementation",
    "Let in mark the complete adjoined unit",
    "The adjunctor in subordinates the whole following clause or sentence. It does not decide whether an NNC is singular or plural, definite or indefinite, and it does not replace the supplement's subject, object, possessor, or topic role. Traditional inin or inon spelling may join the written forms, but the typed adjunctor and demonstrative remain separate grammatical parts.",
  ),
  idea(
    "lesson18-discontinuous-supplementation",
    "Keep the head link across intervening clauses",
    "A supplement may stand far from its head, especially when topic order moves one member of a possessor structure. Read through the intervening clause and follow the clickable reference link back to the same subject, object, or possessor head. Distance changes the order, not the grammatical relationship, and a separated pair may itself participate in a larger supplementation structure.",
  ),
  idea(
    "lesson18-collective-and-named-partner",
    "Follow the real group, not apparent form matching",
    "A collective NNC can look singular while referring to a plural group, so its supplement may appear not to agree with its head. Andrews leaves two formula analyses of moch in view; keep that uncertainty when reading the formula. In a named-partner construction, the principal plural group already includes the speaker or addressee, and the supplement names only the newly identified third-person partner.",
  ),
  idea(
    "lesson18-male-bonding",
    "Check whether the male speaker belongs to the group",
    "A male speaker who belongs to the referenced group can use a first-person-plural NNC built on oquich-tli as the supplement of a third-person subject or possessor head. The person mismatch is licensed by speaker inclusion, not by the visible nounstem alone. A woman or a man outside that group uses the ordinary third-person oquichtin pattern instead.",
  ),
  idea(
    "lesson18-ayi-silent-object",
    "See the silent specific object of āyi",
    "Āyi remains transitive. A nonspecific patient is sounded as tla, but a specific patient is represented by a silent 0-0 object head. A supplementary object such as itlah or mochi binds that silent head, which is why the supplement can look headless. The application derives the silent head and the āyi or perfective āx stem from the chosen patient and tense; ichtequi follows a different object pattern.",
  ),
  idea(
    "lesson18-principal-deletion-and-command-subject",
    "Recover the deleted ca-h principal",
    "When ca-h is the shared principal of an adverbial modifier and a supplementary subject, the full and deleted compositions are both meaningful surface choices. In the deleted form, the adverbial becomes the proxy principal and the former supplementary subject becomes the surface subject. A second-person subject attached to an optative command remains a command subject, even when an English translation makes it look like direct address; it is not a real vocative.",
  ),
  idea(
    "lesson18-real-vocatives",
    "Let speaker context shape a real vocative",
    "A real vocative starts from a third-person NNC. A male speaker gets joined, exceptionally stressed e, with supportive final i absorbed automatically; licensed final glottal-y and silent plural-in variants remain genuine surface choices. A female speaker uses no e and instead gives the final syllable a higher tone with affected stress. The formula cues show which realization the typed speaker context produced.",
  ),
  idea(
    "lesson18-free-order-and-complete-clauses",
    "Follow the clause graph through free order",
    "Nahuatl permits wide constituent freedom: supplements may be distant, repeated in the same role, or recursively supplemented. Order does not silently choose the principal or grammatical role, so follow the clickable principal and reference links and use context only where Andrews leaves a real ambiguity. Forms translated as dog or I, such as chichi and nehhuātl, remain complete NNC assertions inside the larger composition rather than becoming mere noun or pronoun fragments.",
  ),
]);

export function isLesson18ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON18_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson18ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="18">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 18</span>
                      <small>Supplementation, part two</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON18_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
