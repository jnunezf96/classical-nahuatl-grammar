const idea = (ideaId, title, guidance) => Object.freeze({ ideaId, title, guidance });
export const LESSON52_READER_GUIDANCE_GROUPS = Object.freeze([
  idea("lesson52-conjunction-domain", "Conjunction begins with exact clause Results", "The shared signed composition owner joins captured clauses through a licensed relation and reference graph; display metadata remains non-authoritative."),
  idea("lesson52-ordinary-and-marked-conjunction", "Conjuncts remain balanced typed units", "Unmarked, auh-marked, initial, adjoined, shared-supplement, and nested structures preserve rank and exact conjunct identity without inventing a head."),
  idea("lesson52-conjunction-modifiers", "Modifiers retain their semantic scope", "Additive, alternative, adversative, rightward, and pre-first profiles preserve modifier role, shared scope, and antecedent; in and ihuan are not generic conjunctors."),
  idea("lesson52-correlative-conjunction", "Correlation pairs exact Results", "Standard and loose patterns operate over captured conjunct identities. Repeated wording cannot manufacture a pair."),
  idea("lesson52-lexical-conjunction", "Lexical conjunction is bounded", "Licensed lexical types preserve arity, shared reference, state realization, and adjunctor distribution. Downstream compatibility is descriptive, not a handoff."),
  idea("lesson52-parallel-structure", "Parallel structures keep their axes", "Rephrasive, appositive, progressive, and combined profiles preserve each Source while exposing only licensed parallel choices."),
  idea("lesson52-conjunction-constraints", "Blocked conjunctions keep exact reasons", "Arity, rank, modifier, reference, and downstream constraints remain canonical. URL, formulas, surfaces, and hidden state cannot repair them."),
]);
export function isLesson52ReaderGuidanceExact(candidate = []) { return JSON.stringify(candidate) === JSON.stringify(LESSON52_READER_GUIDANCE_GROUPS); }
export function renderLesson52ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="52"><summary class="classical-reader-guidance__lesson-summary"><span>Lesson 52</span><small>Clause conjunction</small></summary><div class="classical-reader-guidance__lesson-body"><div class="classical-reader-guidance__grid">${LESSON52_READER_GUIDANCE_GROUPS.map(group => `<section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}"><h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5><p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p></section>`).join("")}</div></div></details>`;
}
