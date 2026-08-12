const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON2_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson2-sound-and-spelling",
    "Read spelling as a record of sound",
    "Use the Classical spelling system to recover the intended sounds, including vowel length and the glottal stop, while remembering that older spellings can be incomplete or inconsistent.",
  ),
  idea(
    "lesson2-internal-stem-boundaries",
    "Look through spelling to stem boundaries",
    "When sounds meet inside a stem or construction, keep the underlying parts in view even when the written form joins them or changes their appearance.",
  ),
  idea(
    "lesson2-syllables-and-supportive-i",
    "Use syllables to find supportive i",
    "Read syllable structure carefully so that a supportive i is recognized as help for pronunciation and not mistaken for an unrelated part of the word.",
  ),
  idea(
    "lesson2-stress",
    "Follow stress by syllable and group",
    "Use the normal next-to-last-syllable pattern together with the boundaries of vocables and stress groups; do not treat English stress habits as the rule.",
  ),
  idea(
    "lesson2-long-consonants",
    "Recognize long consonants",
    "Read a long consonant as one lengthened consonant across a boundary, while allowing for traditional spelling and rapid speech that may hide its length.",
  ),
  idea(
    "lesson2-progressive-assimilation",
    "Notice changes caused from the left",
    "When an earlier sound changes a following sound, recover the parts and the direction of the change instead of treating the resulting spelling as an unanalyzed whole.",
  ),
  idea(
    "lesson2-regressive-assimilation-and-dissimilation",
    "Notice changes caused from the right",
    "When a later sound changes an earlier one, use the surrounding structure to recover the relationship, including the places where Classical Nahuatl keeps a genuine alternative.",
  ),
  idea(
    "lesson2-consonant-loss",
    "Allow a consonant to be structurally present but unheard",
    "A missing surface consonant does not prove that the underlying part is absent; use the grammatical structure and the surrounding sounds to interpret the form.",
  ),
  idea(
    "lesson2-other-consonant-changes",
    "Read conditioned consonant changes",
    "Use the exact sound environment and construction to interpret shifts that are not simple assimilation or loss, without turning an isolated example into a general rule.",
  ),
  idea(
    "lesson2-vowel-elision",
    "Recover vowels hidden by elision",
    "When vowels meet and one is omitted, keep the underlying morphemes distinct and use the grammatical boundary to understand the shortened Result.",
  ),
  idea(
    "lesson2-long-vowel-to-glottal-stop",
    "Recognize the long-vowel and glottal-stop relationship",
    "At the licensed boundary, read the glottal realization as the conditioned form of the long vowel rather than as an unrelated segment.",
  ),
  idea(
    "lesson2-sentence-prosody",
    "Read sentence prosody with care",
    "Use the known stress-group patterns and sentence type, while keeping unknown historical intonation details unknown rather than treating missing evidence as missing grammar.",
  ),
]);

export function isLesson2ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON2_READER_GUIDANCE_GROUPS);
}

export function renderLesson2ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="2">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 2</span>
                      <small>Reading sounds, spelling, and sound changes</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON2_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
