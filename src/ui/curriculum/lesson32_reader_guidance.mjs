const freeze = value => {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freeze);
  return Object.freeze(value);
};

const idea = (ideaId, title, guidance) => freeze({ ideaId, title, guidance });

export const LESSON32_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson32-affective-nnc-foundation-and-attitude-route",
    "The typed Source says where the attitude belongs",
    "Lesson 32 has two different structures. An affective compound puts the attitude in a matrix nounstem after the embed. A flawed-subject formation puts it in the subject expression instead. The application derives the one compatible route from the typed Source and shows a route choice only if both analyses really survive. It preserves subject identity, constituent order, morphemic boundaries, and the ordinary NNC Result. Translation and Canvas examples cannot choose or authorize the route. The clickable cue shows the selected route, available routes, attitude location, subject, order, and whether a real user choice existed.",
  ),
  idea(
    "lesson32-pil-and-pol-affective-matrices",
    "pīl and pōl are productive matrices, not stem lists",
    "Use pīl for affectionate smallness and pōl for disparaging largeness with any compatible typed NNC embed. The application preserves the embed and matrix as morphemic Source parts, applies regular boundary sound changes automatically, and normally derives a zero-class Result. A genuinely lexicalized special meaning or irregular compound shape must arrive as typed lexical analysis; it is not guessed from an example spelling. That typed fact may preserve an exceptional embed variant or a tli Result while leaving the productive route open. The clickable cue shows the matrix meaning, open embed admission, Source boundary, automatic class, any typed lexical fact, and that Canvas examples never create a whitelist.",
  ),
  idea(
    "lesson32-tzin-matrix-class-meaning-and-vocative",
    "tzin keeps grammar, meaning, and vocative form separate",
    "The tzin matrix may express special regard, honor, compassion, affection, cherished smallness, or the delimitation of a masslike Source. Choose among those readings only when the intended meaning is genuinely open. The application derives the Result class automatically: a zero-class embed keeps zero, while another embed gives tli. Demonstrative and masslike typed embeds remain available without a vocabulary gate. In a vocative, full tzin and abbreviated tz are a real register choice where Canvas permits both; the final é is automatic. The clickable cue shows the reading, typed embed class, derived Result class, demonstrative or mass availability, vocative form, register, and automatic particle.",
  ),
  idea(
    "lesson32-ton-matrix-and-class-exceptions",
    "tōn means smallness without admiration or affection",
    "Use tōn with any compatible typed NNC embed when neutral or unadmiring smallness is intended. The application normally derives the Result class automatically: a zero-class embed keeps zero, while another embed gives tli. A real exceptional zero class or irregular boundary shape must be supplied as matching typed lexical analysis; an example stem never creates the exception. Completed affective Sources may continue as embeds without a depth or boundary control. The clickable cue shows the tōn meaning, embed class, Result class, automatic or exceptional source of that class, boundary evidence, recursion, and the absence of an animal or example whitelist.",
  ),
  idea(
    "lesson32-zol-matrix-recursion-and-denominal-continuation",
    "zol is nonanimate, always tli, and freely reusable",
    "Use zol for an old or worn-out nonanimate entity with any compatible typed NNC embed. The application enforces nonanimate reference and derives tli class automatically. An owner-issued zol compound may become the embed of another affective compound; the complete inner Result, hierarchy, and morphemic boundaries remain preserved without a depth choice. The typed zol tli Source may also continue through the ordinary denominal owner as inchoative zol-i-hui or causative zol-o-ā; the user chooses the intended continuation, but the VNC Source shape is assembled automatically. Free tzin and pōl denominals remain restricted to their later attitude matrices. The clickable cue shows meaning, animacy, class, recursion, boundaries, continuation, and non-authorizing examples.",
  ),
  idea(
    "lesson32-affective-affinity-and-absolutive-number",
    "A plural affective subject automatically triggers matrix affinity",
    "In a compound affective NNC with a plural subject, the application automatically gives the affective matrix its special short-vowel affinity prefix. This remains distinct from the long-vowel affinity pattern in Lesson 31. The corresponding singular number-one behavior automatically determines the absolutive plural dyad: sounded t-in follows a sounded singular number one, while silent zero-zero follows a silent one. Some typed Sources also license or require affinity on the embed. Obligatory double affinity is automatic; a target choice appears only when typed analysis says embed affinity is optional. Source vowel quantity and internal boundaries remain preserved. The clickable cue shows subject plurality, matrix and embed shapes, short-vowel evidence, selected target, optionality, singular number basis, and derived plural dyad.",
  ),
  idea(
    "lesson32-possessive-affinity-number-alternatives",
    "Possessive affinity keeps one real number choice",
    "A plural possessive affective NNC uses the same automatically derived affinity-shaped compound while preserving its possessor and plural subject. Canvas licenses two possessive number dyads: sounded hu-ān and silent zero-zero. The user chooses between them because both are real forms; hu-ān is simply more frequent. The disagreement among older grammarians is preserved as reading evidence and never turned into a pīl, pōl, or example-stem restriction. The clickable cue shows the possessor, subject, affinity stem, both licensed dyads, selected dyad, frequency tendency, documentary status, and the absence of a matrix whitelist.",
  ),
  idea(
    "lesson32-pil-lexeme-and-child-formations",
    "Simple pil stays distinct from affective matrix pīl",
    "The simple nounstem pil first means a pendant, dependent thing, or appendage. Its human readings are child and the extended noble reading; Canvas sometimes leaves those two genuinely ambiguous. The application reads pil at a morpheme boundary, so compounds ending in pil remain available without a word list, but the lexeme is never collapsed with the affectionate-smallness matrix pīl. Choose child versus noble only when the intended reading is open, and add oquich or cihuā only when gender specification is intended. Possession, number, the simple plural affinity stem, distributive possession, and the unique possessive pil-hu-ān plus outer tzi-tzin hierarchy are automatic. The clickable cue shows lexical identity, reading, conē contrast, possession, gender, affinity, distribution, hierarchy, and preserved boundaries.",
  ),
  idea(
    "lesson32-affective-child-matrices",
    "A plural affective child automatically carries double affinity",
    "For the child reading of pil, choose the intended affective matrix: tzin, tōn, pīl, or pōl. The application derives the matrix meaning and Result class, and an absolutive plural subject automatically puts affinity on both the pil embed and the matrix. There is no separate double-affinity or class control. Possessive Results continue normally. With tzin in a vocative, full tzin keeps the child address, while abbreviated tz may become a bare summons; a typed beloved-child compound preserves its affectionate reading. The final é is automatic. The clickable cue shows the child reading, selected matrix and attitude, class, double affinity, possession, vocative form, and meaning consequence.",
  ),
  idea(
    "lesson32-pil-noble-and-honorific-formations",
    "Noble pil keeps meaning, yō possession, and honorific recursion separate",
    "The simple pil lexeme can mean noble for a man or a woman, with cihuā customarily preferred when a woman is specified. Child and noble remain genuinely ambiguous where the same absolutive shape permits both, so the user chooses only the intended reading. A possessive noble NNC automatically embeds pil in the yō matrix and derives pil-lō; there is no manual yō control. The singular honorific vocative automatically nests pil-tzin inside a second tzin matrix. Its repeated tzin sequence is typed recursion, not affinity reduplication, and the final é is automatic. The clickable cue shows reading, gender, ambiguity, yō possession, nested structure, singularity, lack of affinity, and non-authorizing examples.",
  ),
  idea(
    "lesson32-nonanimate-affinity-and-supplement-agreement",
    "Nonanimate affective number and supplement agreement are both preserved",
    "A typed nonanimate affective Source may use a reduplicated matrix and the exceptional plural t-in form, while common number remains more frequent. When that plural NNC is a supplement, its same-referent third-person head may still have common number; the application carries this Canvas-approved mismatch into the ordinary supplementation owner automatically. On a nonanimate stem the reduplicated shape can mean affinity or distribution and variety. Choose a reading only when context leaves both open; typed glottal reduplication or a distributive expression can settle it automatically. The clickable cue shows animacy, surface number, common head, agreement exception, reduplication reading, context, and the absence of a stem whitelist.",
  ),
  idea(
    "lesson32-flawed-subject-nncs",
    "Flawed subjects depend on typed lexical meaning, not a stem list",
    "A flawed-subject Source carries a lexical analysis saying that the noun can name an abnormal, defective, repugnant, or lexically fixed entity. Any typed stem with that analysis can use the rule; Canvas examples never authorize a vocabulary list. In a singular or common absolutive NNC, the application replaces sounded ti, tli, or in with the irregular silent number-one variant. It preserves a real ordinary-versus-flawed choice, defect-versus-entity ambiguity, alternative zero-class analysis, and lexical readings only when the Source supplies them. Plural subjects automatically restore ordinary number marking, while tzin or tōn forces flawing where the defect analysis applies. The clickable cue shows Source shape, lexical meaning, attitude, subject, state, number one, class, pronominal case, plural restoration, and why adverbial and personal-name silent forms are unrelated.",
  ),
]);

export function isLesson32ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON32_READER_GUIDANCE_GROUPS
  );
}

export function renderLesson32ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="32">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 32</span>
                      <small>Affective nounstems</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON32_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
