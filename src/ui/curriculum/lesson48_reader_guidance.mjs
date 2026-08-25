const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId, title, guidance,
});

export const LESSON48_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson48-place-name-domain",
    "Place names are finite adverbial NNCs",
    "A typed Source and licensed place formation lead through boundary realization and NNC agreement to one finite Result. Translation, stored answers, target segments, and hidden noun class never authorize the output.",
  ),
  idea(
    "lesson48-n-place-name-group",
    "n place names preserve upstream formation history",
    "Imperfect active or nonactive, yan, man, tlan-vicinity, can, preterit-agentive, and action-noun Sources enter through their canonical owners. The place result retains Source identity rather than reconstructing a stem.",
  ),
  idea(
    "lesson48-pan-place-name-group",
    "pan distinguishes integrated and linked Sources",
    "An integrated Source and a connective-t Source are separate typed formations. The selected operation determines the boundary and pan matrix; final spelling does not choose the route.",
  ),
  idea(
    "lesson48-co-c-place-name-group",
    "co or c follows the typed Source edge",
    "Affective embeds, relational compounds, and ordinary Sources preserve their histories while the owner derives co or c. Ambiguous analysis stays visible evidence and cannot be resolved by editing the displayed word.",
  ),
  idea(
    "lesson48-other-place-name-groups",
    "Each remaining place family keeps its own boundary",
    "tlah, tzalan, ti-tlan, and chan reuse the same place-name architecture while preserving abundance, relational, connective, topographical, and supplementation facts. Translation uncertainty remains non-authoritative.",
  ),
  idea(
    "lesson48-gentilic-ca-routes",
    "Gentilics consume exact place-name Results",
    "Full-place, pan-eca, can-meca, co/c-silent, ownerhood-n-silent, and man/tlan-teca routes retain exact place provenance. Boundary replacement and noun class are derived and cannot be overridden by hidden state.",
  ),
  idea(
    "lesson48-other-gentilic-routes",
    "Other gentilic routes retain Source family",
    "Nonlocative absolutives, preterit-agentive owners and others, alternatives, and two-clause structures remain distinct typed routes. Defective spelling and ambiguity stay evidence instead of invented grammar.",
  ),
  idea(
    "lesson48-gentilic-extensions",
    "Gentilic extensions begin with exact Results",
    "Incorporation, collectivity, adjectival reuse, profession, and title operations consume owner-issued gentilic Results or closed lexical records. A similar surface or lesson label cannot authorize an extension.",
  ),
  idea(
    "lesson48-incorporation-adjectival-collectivity",
    "Exact gentilic identity survives continuation",
    "Compound incorporation, adjectival NNC use, and yō collectivity retain the original gentilic identity. Matrix, state, and possessive num1 variant are available only on licensed continuation paths.",
  ),
  idea(
    "lesson48-professions-and-titles",
    "Professions and titles form a closed productive inventory",
    "Only Canvas-licensed records with typed formulas generate. Tlīllān-calqui remains visible evidence but blocked because no typed NNC formula is supplied; the interface must not invent one.",
  ),
]);

export function isLesson48ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON48_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson48ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="48">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 48</span>
                      <small>Place-name and gentilic NNCs</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON48_READER_GUIDANCE_GROUPS.map(group => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
