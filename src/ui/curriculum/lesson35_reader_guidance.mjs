const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId,
  title,
  guidance,
});

export const LESSON35_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson35-nominalization-and-preterit-agentive-foundation",
    "A preterit VNC Result can become an NNC Source",
    "Structural nominalization changes grammatical rank: the application captures an exact owner-issued preterit VNC Result, keeps its complete typed Source and predicate structure, and makes that predicate available as a preterit-agentive NNC Source. This is different from merely using a noun-like translation. The restricted shape is used in its narrow absolutive environment; the general shape is built for the other licensed states and continuations. The user chooses nominalization only when it is the intended operation and chooses an agentive reading only when context truly leaves one open. The application does not ask the user to copy the predicate, choose a stored formula, or select an example verb. Canvas examples prove the operation but never authorize the route.",
  ),
  idea(
    "lesson35-absolutive-preterit-agentive-reanalysis",
    "The complete preterit predicate becomes the restricted nounstem",
    "The owner reanalyzes the complete preterit predicate as a nounstem. Its internal projective object or reflexive remains inside it, and preterit zero stays as its final constituent. The old antecessive ō belongs outside the VNC and is not carried into the nounstem. Subject number continues into the NNC number position. Verbstem class, perfective shape, passive patientive voice, compound Source structure, preterit-as-present analysis, and any licensed plural affinity remain typed facts. Required affinity is automatic; an optional affinity choice appears only where Canvas leaves a real alternative. The application derives these facts from the Source and never limits the operation to the printed verbs.",
  ),
  idea(
    "lesson35-number-animacy-and-object-activation",
    "Number and reference follow typed lexical and participant facts",
    "An absolutive preterit-agentive may use qui-zero, silent zero, or a genuinely licensed alternative. Some Sources fix one realization; some preserve a real choice. Silent number often accompanies nonanimate reference, but Canvas explicitly treats that as a tendency, not a universal rule. Animate and nonanimate readings therefore remain available or restricted according to the typed lexical analysis and context. An internal nonspecific object may become a specific projective object only when a supplementary object is actually needed and its referent is typed. That produces a controlled verbal-plus-nominal hybrid; it is not free object movement. The user sees only a real number, interpretation, or supplementary-object choice, never an example-stem list.",
  ),
  idea(
    "lesson35-general-use-ca-stem",
    "The general-use shape is a real cā compound",
    "The restricted preterit predicate is demoted to the embed of a compound whose fixed matrix is cā, a Subclass 1-A tl nounstem. The final preterit zero stays immediately before cā. If the embedded Source is reflexive, its reflexive becomes the shuntline ne shape. This general-use Source serves possessive NNCs, adverbialized NNCs, and compatible nominal or verbal compounds. The application builds routine cā automatically. The rare archaic quē matrix is available only from an explicit typed lexical record; a Canvas example proves that lexical formation but does not make quē productive for other stems.",
  ),
  idea(
    "lesson35-possessive-preterit-agentive-nnc",
    "Possession inflects the typed general-use Source",
    "In possessive state, the general-use cā compound behaves as a Subclass 1-A tl nounstem. A singular subject gets uh-zero and a plural subject gets hu-ān automatically. Subject and possessor remain separate participants, and internal objects or reflexives remain traceable. The same route admits a typed passive patientive counterpart. The cā-yō formation and the ya-uh shift from tē to ti are lexical irregularities, not patterns inferred from spelling or example membership. The user chooses intended possession and genuine participant reference; the application supplies cā, state, carriers, number, and licensed boundary changes.",
  ),
  idea(
    "lesson35-agentive-embeds-and-affectives",
    "An owner-issued agentive Result can continue as an embed",
    "The application can recapture the exact owner-issued general-use agentive Result and use it as the embed of an ordinary NNC compound, a VNC compound, or a compound-affective NNC. Its cā boundary, Source class, participant structure, and any licensed supplementary-object activation remain attached to that Result. The user chooses the intended compatible compound or affective operation and a genuinely open affective meaning. Placement and Result kind are automatic. A copied agentive string, a lookalike Result, or an example matrix cannot authorize continuation.",
  ),
  idea(
    "lesson35-old-woman-agentive-family",
    "Old-woman forms keep verbal and nominal Sources distinct",
    "The verbstem ilama-ti forms a preterit-agentive old-woman NNC. Singular reference selects ilama-h with silent number, while plural reference selects ilama-t with qu-eh. Possessive state automatically uses the cā general-use Source and ordinary possessive number. That exact Result can continue into affective or characteristic yō compounds. The related ordinary nounstems ilama-tl and ilan-tli remain separate typed Sources even when their meanings overlap. The application derives the number-conditioned verbal alternant and later boundaries; it never asks the user to choose a displayed formula or treats an example as a route list.",
  ),
  idea(
    "lesson35-old-man-and-drum-source-contrast",
    "Similar old-man and drum shapes are not the same Source",
    "The verbstem huē-huē-ti forms the old-man agentive: singular huē-hue-h has vowel-length loss and silent number, while plural huē-huē-t has qu-eh. The ordinary nounstem huē-huē-tl means upright drum in a simple NNC. Its basic old-man embed is the glottalized huē-hueh shape, which must remain distinct from the homophonous preterit-agentive huē-hue-h-zero. The shorter hueh embed and the huē-huē-n variant are separate Sources too. Exact vowel quantity, internal boundaries, distribution, and typed lexical reading decide which analysis survives; spelling resemblance never merges them.",
  ),
  idea(
    "lesson35-ownerhood-e-matrix",
    "Ownerhood follows nounstem class, edge shape, and real exceptions",
    "Ownerhood is built from an incorporated general-use nounstem plus the fixed verbal matrix ē or huā, then nominalized in the preterit. These matrices are not ordinary suffixes: their finite VNC continuation survives only inside a connective-t compound. For ē, tli stems normally qualify except those ending in h or uh; tl Subclasses 2-B and 2-C qualify, with supportive i removed in 2-C; a glottalized 2-A final h may become y; final z is written c before eh. A small typed lexical record preserves genuine exceptions and ē-or-huā alternatives without closing the productive class rule. The user chooses a matrix only where both are licensed, and may choose silent or qui number for a singular or common owner. Preterit zero and the cā general-use continuation are automatic.",
  ),
]);

export function isLesson35ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON35_READER_GUIDANCE_GROUPS
  );
}

export function renderLesson35ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="35">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 35</span>
                      <small>Preterit agentives</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON35_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
