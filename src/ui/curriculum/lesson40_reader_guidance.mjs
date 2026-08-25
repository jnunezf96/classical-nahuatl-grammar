const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId,
  title,
  guidance,
});

export const LESSON40_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson40-adjectival-function-boundary",
    "Adjectival is a function of a complete NNC or VNC Result",
    "Nahuatl does not need a separate adjective stem class here. An exact owner-issued NNC or VNC Result enters adjectival function with its own Source, morphology, state, and boundaries intact. The ordinary adjectival NNC is absolutive. English adjective translation is reading guidance only: it cannot select a Source, authorize a route, or replace the exact Result.",
  ),
  idea(
    "lesson40-exceptional-adjectival-nncs",
    "Exceptional NNCs keep their own owners",
    "Huēi keeps its pronominal-like number behavior and hueh distributive or varietal history; nepāpan keeps its affinity relation; cēl and el keep their possessor-included analyses. These facts are settled before adjectival modification. They do not create a productive exceptional-adjective class, and the witnessed words do not form a whitelist.",
  ),
  idea(
    "lesson40-patientive-adjectival-function",
    "Patientive Results modify without losing their derivation",
    "An exact owner-issued patientive or potential-patient NNC Result may function adjectivally and express a resultant state. Its VNC ancestry, patientive procedure, class, participants, boundaries, and narrow lexical facts remain attached. A patientive-looking nounstem string, copied Result, formula, surface, or translation cannot authorize this continuation.",
  ),
  idea(
    "lesson40-customary-nominalized-vnc-adjectival-function",
    "Nominalization and modification remain separate operations",
    "A nominalized VNC Result—including a customary agentive or customary patientive—may enter adjectival modification. The exact nominalization is completed by its own owner first; modification then relates that complete NNC Result to another clause. They remain separate operations. Visible endings and English adjective meanings choose neither the nominalization nor its Source.",
  ),
  idea(
    "lesson40-preterit-agentive-adjectival-function",
    "Preterit-agentive Results retain their full VNC history",
    "An exact preterit-agentive Result may function adjectivally across verb classes, transitive and intransitive Sources, denominal Sources, compounds, and ownerhood formations. Class-conditioned formation and internal structure remain upstream facts. Compatible unlisted Results remain productive; Canvas examples prove the pattern but never gate it.",
  ),
  idea(
    "lesson40-root-plus-ya-adjectival-function",
    "Root-plus-ya is a typed history, not a spelling guess",
    "The obsolete root-plus-ya and denominal-ti-ya formations keep their typed Source histories and documented exceptions before entering adjectival function. This is not a spelling guess: a matching surface ending does not reconstruct that history. A Source-analysis choice appears only where the grammatical evidence genuinely leaves more than one licensed history open.",
  ),
  idea(
    "lesson40-synonymous-adjectival-systems",
    "Synonymous Results do not collapse their Sources",
    "Ni, hui, hua, ihui, ahui, ti-ya, c-ti-ya, and z-ti-ya formations may rhyme in meaning while remaining distinct typed derivations. English synonymy, visible spelling, and example frequency do not merge their owners. The user chooses an analysis only when context genuinely leaves more than one exact Source possible.",
  ),
  idea(
    "lesson40-predicate-adjective-sentence",
    "Multiple predicates remain multiple nuclear clauses",
    "A single predicate adjective uses the ordinary owner-issued NNC sentence path. A multiple-nucleus adjective construction captures the exact principal and modifying clause Results and applies canonical adjectival modification. Topology, order, an adjunctor, or VNC contact is selectable only when it changes the intended relation; the interface never flattens the structure into a modifier-word plus head-word string.",
  ),
]);

export function isLesson40ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON40_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson40ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="40">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 40</span>
                      <small>Adjectival NNC function and modification</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON40_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
