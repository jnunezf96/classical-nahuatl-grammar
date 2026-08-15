const freeze = Object.freeze;

function idea(ideaId, title, guidance) {
  return freeze({ ideaId, title, guidance });
}

export const LESSON16_READER_GUIDANCE_GROUPS = freeze([
  idea(
    "lesson16-pronominal-nnc-foundation",
    "Read a pronominal form as an NNC",
    "A pronominal NNC is an absolutive noun construction with a general entity or quantity meaning. English often translates it with a pronoun, but the Nahuatl structure remains a predicate with a personal-pronoun subject. In a pluralized predicate, internal n belongs inside the stem; the following t-in or silent dyad belongs to the subject.",
  ),
  idea(
    "lesson16-simple-personal-pronominals",
    "Read the simple personal stem by its subject",
    "The simple personal stem is generally eh and has the conditioned third-person shape yeh. Singular, common-number, and rare plural forms identify an entity. A third-person common subject may use eh especially for an abstract referent, and later sentence collocations may prefer eh while licensing yeh.",
  ),
  idea(
    "lesson16-compound-personal-foundation",
    "Keep the compound stem and subject number separate",
    "The compound personal stem is generally eh-huā and has the conditioned third-person shape yeh-huā. A plural subject adds internal n to the predicate and then takes its own subject-number dyad. A common-number distributive stem such as eh-eh-huā or yeh-yeh-huā presents various kinds of entities; English definite or indefinite wording does not change that structure.",
  ),
  idea(
    "lesson16-compound-personal-variants",
    "Read the compound variants by their context",
    "A personal compound may have a sounded or silent number ending without changing its basic translation. Adverbial modifiers add meanings such as only, same, very, or especially. A doubled first-plural subject is a special construction meaning a member or members of our people; it is not an ordinary second- or third-person pattern.",
  ),
  idea(
    "lesson16-what-interrogatives",
    "Read tleh by its clause position",
    "Tleh asks what an entity is when its interrogative force is active. It can occur with different personal subjects. Initial positive use is interrogative; negative or noninitial use is not. When a following in introduces a real dependent clause, read and write tleh and in separately. Tlein, tlei, and tlen are fused forms used when that expected clause is left unsaid.",
  ),
  idea(
    "lesson16-compound-and-who-interrogatives",
    "Separate what, which, and who forms",
    "Tlehhuātl asks what entity, cā and its compounds ask which entity, and āc asks who. Āc is fixed to a third-person singular grammatical shape even when English translates a plural referent. Negative āc becomes ayāc. As with tleh, write āc in separately before an actual dependent clause, but read āquin or aqui as fused elliptical forms when the clause is left unsaid.",
  ),
  idea(
    "lesson16-demonstrative-and-indefinite-pronominals",
    "Keep demonstrative and indefinite structure visible",
    "Īn and ōn are third-person demonstrative pronominal NNCs. Their plural subject has a silent number dyad rather than a changed demonstrative stem; traditional spelling may omit final n. In acah and itlah, ah is the matrix. Itlah with a personal subject is limited to a specially intended human situation.",
  ),
  idea(
    "lesson16-quantitive-foundation",
    "Read a quantity form as embed plus matrix",
    "A quantitive pronominal NNC combines a quantity-bearing embed with a matrix of the chi, qui, or quich family. The matrix takes its long shape before internal plural n. A quēx form is interrogative only when it is positive and sentence-initial; elsewhere it keeps the quantity structure but loses interrogative force.",
  ),
  idea(
    "lesson16-quantitive-plural-and-miye-cequi",
    "Separate quantity pluralization from subject number",
    "The normal plural quantity stem adds internal n after a long matrix, and the subject then has its own t-in or silent number dyad. Miya or miye forms can also have a licensed unchanged-stem plural variant. Cequi follows the internal-n pattern; before it, the second-plural subject prefix undergoes the written assimilation shown in azcequin.",
  ),
  idea(
    "lesson16-izqui-quezqui-aqui",
    "Keep quantity, question, and distribution distinct",
    "Izqui expresses an equal amount or number, quezqui asks a specific amount or number when it is positive and sentence-initial, and aqui expresses a small amount or number. Quezqui loses its interrogative force outside initial position. The reduplicated quecizqui asks or states an amount for each member, according to sentence position.",
  ),
  idea(
    "lesson16-achi-mochi-ixachi",
    "Read little, all, and a great many by their source",
    "Achi names a small quantity, mochi names a full amount or all, and ixachi names a very large amount or number. Mochi has both the normal internal-n plural and the licensed shortened mochtin variant. Short mo-ch can also serve as the embed of the compound personal stem mo-ch-eh-huā.",
  ),
]);

export function isLesson16ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON16_READER_GUIDANCE_GROUPS);
}

export function renderLesson16ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="16">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 16</span>
                      <small>Pronominal NNCs</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON16_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
