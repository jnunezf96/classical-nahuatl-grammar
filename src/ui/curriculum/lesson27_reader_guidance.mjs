const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON27_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson27-frequentative-foundation-and-shape-choice",
    "Choose the frequentative shape; let the Source supply its sounds",
    "Choose Frequentative for any open typed verbstem, then choose short vowel plus h, long vowel, or short vowel because Andrews gives no rule that predicts which shape a particular stem accepts. The application copies the initial consonant when present, copies the Source vowel with the selected quantity, builds the typed Result, and performs ordinary finite realization. Repetition, continuity, intensity, and separate agents, patients, occasions, or places remain available readings. Canvas examples are evidence, never a stem whitelist. The clickable frequentative-foundation cue shows Source, selected formula, copied material, Result, and available readings.",
  ),
  idea(
    "lesson27-short-glottal-ordinary-frequentatives",
    "Choose short vowel plus h; name a scope only when needed",
    "The short-vowel-plus-h formation commonly presents repeated acts as separate, intense, abrupt, uneven, or distributed. Meaning focus defaults to leave the reading open. Choose repeated action, separate agents, patients, occasions, or places only when the intended final semantic composition needs that distinction; the patient choice appears only when the typed Source has an object. The application preserves participant identity, derives the copied prefix, and supports the licensed fused-tla and tla-impersonal placements. Idiomatic meanings, extinct Sources, and Canvas examples stay reading evidence. The clickable short-glottal cue shows the chosen or open scope, participant availability, fusion, and Result.",
  ),
  idea(
    "lesson27-long-short-supportive-i-and-recursion",
    "Choose long or short, resolve initial i only when real, and add repetition",
    "Choose long-vowel or short-vowel formation when it is the intended lexical frequentative. If an initial i has a known Source analysis, the application uses it automatically; otherwise the existing Supportive i choice appears, with real i as the default. A supportive i before two consonants disappears and the copied consonant and vowel come from the following syllable, while a real i remains available for exceptional formation. Choose two or three reduplications only for intended insistence or emphasis; the same operation builds every layer. Reconstructed Sources and example meanings remain guidance. The clickable supportive-i and recursion cue shows initial-i analysis, deletion or retention, copied prefix, layer count, and Result.",
  ),
  idea(
    "lesson27-object-pronoun-reduplication",
    "Choose what is reduplicated only when the Source makes that choice real",
    "For an ordinary Source, the lexical stem remains the automatic reduplication target. When the typed Source contains fused tla, Reduplication target appears and lets you choose the lexical stem, fused tla, or both. When a mainline reflexive stands before a supportive initial i, it instead offers the reflexive target under short-vowel-plus-h formation. The application derives tlah-tla or tlā-tla, the copied lexical material, partial m-oh-o, n-oh-o, or t-oh-o, supportive-i deletion, and participant continuity. Object variety and repeated-event scope remain separate when both parts are reduplicated. Canvas examples are evidence, not a stem list. The clickable object-pronoun cue shows the selected target, fusion history, scopes, reflexive carrier, and deletion.",
  ),
  idea(
    "lesson27-intransitive-destockal-frequentatives",
    "Choose the special destockal formation; let shape and Voice do the rest",
    "A first-kind intransitive Source ending in the destockal shape ni or hui may use an ordinary frequentative or the special destockal formation. Choose the special formation only when that lexical contrast is intended, choose extra reduplication only for intended intensity, and use the existing Voice and formation choices when an impersonal Result is intended. The application changes ni or hui to ca, shortens only the stock vowel, adds the short-vowel prefix, assigns Class A, and derives ca to c-ō, ca to c-o-hua, inherent-impersonal, or tla-impersonal structure from the chosen Voice path. Any matching typed Source shape is admitted; examples never form a whitelist. The clickable destockal cue shows suffix replacement, stock vowel, recursion, Voice path, class, and Result.",
  ),
  idea(
    "lesson27-causative-destockal-frequentatives",
    "Choose the special causative destockal formation; keep its participants",
    "For any typed causative destockal Source with the n-a, ni-ā, or hu-a shape, choose the special causative destockal frequentative when intended. The application replaces the destockal part with tz, retains causative a, shortens the stock vowel, derives the short-vowel prefix, preserves the Source object structure, assigns Class B, and lets the normal perfective machinery drop final a. Lexical readings and Canvas examples guide interpretation but never authorize or block a stem. The clickable causative-destockal cue shows Source suffix, tz-a Result, retained causative force, stock vowel, participants, class, and perfective behavior.",
  ),
  idea(
    "lesson27-extinct-fused-and-role-ambiguous-destockals",
    "Supply the extinct or fused history; settle tz-a only when context requires it",
    "Choose the extinct-or-fused destockal analysis for any completed ca or tz-a Source with that history. The application preserves a fused long vowel, keeps an extinct Source explicitly reconstructed, and never limits the path to Andrews's examples. A completed tz-a Result retains both causative and applicative readings until the final composition needs one; then choose the matching causative or applicative interpretation. The clickable cue shows the Source history, retained vowel quantity, tz-a unit, available roles, participants, and contextual selection.",
  ),
  idea(
    "lesson27-destockal-applicative-and-type-two-causative",
    "Continue from the completed Result and choose the next derivation",
    "After generating a frequentative destockal Result, use it as the next Source. Choose destockal applicative to replace tz-a with ch-i and add liā, or choose the rare Type-two causative only when that lexical analysis is intended. Choose the added participant with the ordinary participant control. The application preserves earlier objects, derives their order, assigns the class, and does not invent the rejected tla fusion. The clickable cue shows the Result-to-Source link, suffix replacement, new participant, object hierarchy, and derivation role.",
  ),
  idea(
    "lesson27-uncertain-ca-frequentatives",
    "Choose the uncertain ca analysis and only the role or fusion you intend",
    "The uncertain-ca choices accept any open compatible root. Choose the plain ca formation, its causative tz-a counterpart, its applicative tz-a counterpart, or fused tla only when that is the intended structure. The application copies the root's initial material, adds ca or tz-a, imports the selected participant, applies sound assimilation from the resulting shape, and keeps the history uncertain. It never guesses an arbitrary root's meaning and never treats the Canvas examples as a stem list. The clickable cue shows root, reduplication, suffix, role, participant, fusion, assimilation, and evidence status.",
  ),
  idea(
    "lesson27-uncertain-tzca-frequentatives",
    "Choose uncertain tz-ca only for the final-syllable replacement formation",
    "Choose the uncertain tz-ca analysis for any open compatible intransitive Source when that historical formation is intended. The application replaces the final Source syllable with tz-ca, copies the initial Source material, and issues a completed Class A Result that Add another derivation can recapture for a later causative. A stem already containing unreduplicated tz-ca, or a transitive tz-ca stem, keeps its different Source analysis instead of being forced through this operation. Canvas meanings and relic comparisons are reading evidence and never a stem list. The clickable cue shows the replaced syllable, copied prefix, tz-ca Result, uncertain history, competing analyses, and continuation route.",
  ),
  idea(
    "lesson27-frequentative-nonactive",
    "Continue from the nonactive Result and choose its frequentative shape",
    "Use Add another derivation on an owner-issued nonactive Result, then choose the ordinary frequentative shape and any Mood or Tense needed by the final sentence. The application preserves the impersonal voice and participant topology, derives reduplication from the recaptured predicate, and reads the collective action as separate individual acts by the people or group involved. The imperfect and other finite forms still come from the ordinary Mood and Tense machinery. Alternative translations and witnessed forms remain reading evidence. The clickable cue shows the nonactive Source link, impersonal group, distribution, selected shape, participants, and finite realization.",
  ),
]);

export function isLesson27ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON27_READER_GUIDANCE_GROUPS,
  );
}

export function renderLesson27ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="27">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 27</span>
                      <small>Frequentatives</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON27_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
