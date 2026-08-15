const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON14_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson14-use-stem-kinds",
    "Read the nounstem required by the construction",
    "An absolutive NNC uses the restricted-use nounstem. A possessive NNC or the embed part of a compound uses the general-use nounstem. Many nouns have the same shape in both uses; some do not.",
  ),
  idea(
    "lesson14-nounstem-classes",
    "Read class as a lexical fact",
    "A nounstem belongs to the tl, tli, in, or zero class. Spelling helps rule out impossible classes, but it does not determine lexical membership. Some nouns allow more than one class, and a supportive initial i may have a form without that i.",
  ),
  idea(
    "lesson14-number-and-derived-nounstems",
    "Keep subject number apart from stem meaning",
    "Number belongs to the personal-pronoun subject. A long-vowel reduplication inside the nounstem marks affinity or cohesion. A glottal-stop reduplication inside the nounstem presents members separately, in separate places, or as different kinds. A derived stem may also have a special or stronger lexical meaning; affective and exceptional pronominal stems belong to later lessons.",
  ),
  idea(
    "lesson14-absolutive-singular-common",
    "Read the base stem with a singular or common subject",
    "An absolutive NNC with a singular or common-number subject uses the base restricted-use nounstem. A nonanimate common subject may still use a distributive or varietal derived base when its referents are separate or varied.",
  ),
  idea(
    "lesson14-absolutive-plural",
    "Read plural form as a lexical pattern",
    "A plural animate subject may occur with a plain, affinity, or distributive or varietal nounstem. The following t, m, or zero belongs to subject number. Class gives guidance, but the noun's allowed forms, obligatory affinity, alternatives, and preferences must be known lexically.",
  ),
  idea(
    "lesson14-possessive-plural",
    "Read relationship inside a possessive plural stem",
    "A possessive NNC with a plural subject normally uses the plain general-use nounstem and hu-ān. Use an affinity stem for special cohesion or a distributive or varietal stem for separate lines or kinds. Exceptional lexical formations remain exceptions.",
  ),
  idea(
    "lesson14-possessive-singular-common",
    "Read class, stem shape, and connector separately",
    "In and zero stems use a base general-use stem with zero. Tli stems normally use zero, while a small subclass uses hu; an automatically added supportive i gives hui where the boundary requires it, and an authorized silent alternative may also occur. Tl stems use a lexical subclass: base plus uh, base plus zero, or a truncated stem. Truncation deletes only an ephemeral final vowel; supportive i repairs only the illegal cluster created in Subclass 2-C. Stem-final uh, tl, or tli must not be mistaken for a subject connector.",
  ),
  idea(
    "lesson14-constituent-analysis",
    "Keep a spelling open until structure settles it",
    "Short o after n, t, or am and m after possessor ī may belong to different constituents. Long ō belongs to the stem. Preserve noteōuh and noyāōuh rather than the misleading noteuh and noyāuh spellings. Preserve both initial vowels in īīx; shorten possessor ī before a stem beginning ih; and drop only a supportive initial i after ī. Vocabulary, vowel length, sound changes, and typed structure—not spelling alone—select the analysis.",
  ),
]);

export function isLesson14ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON14_READER_GUIDANCE_GROUPS);
}

export function renderLesson14ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="14">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 14</span>
                      <small>Nounstem classes</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON14_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
