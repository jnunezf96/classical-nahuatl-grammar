const freeze = Object.freeze;

function freezeGroup(title, records) {
  return freeze({
    title,
    records: freeze(records.map(([atomId, statement]) => freeze({ atomId, statement }))),
  });
}

export const LESSON1_READER_GUIDANCE_GROUPS = freeze([
  freezeGroup("Lesson 1 is a foundation", [
    ["ACI-P018-L003-6F9AEBE144", "Spatial limitations constrain the scope of the preliminary presentation."],
    ["ACI-P018-L003-6F9AEBE144-02", "The preliminary paragraphs present only an extremely limited subset of a very complex subject."],
    ["ACI-P018-L004-8B274196BE", "Only a few general topics pertinent to the following lessons are considered in the preliminary presentation."],
    ["ACI-P018-L005-C65BAEE067", "Less general linguistic concepts are deferred until the specific grammatical problems to which they apply are discussed."],
  ]),
  freezeGroup("Read each language on its own terms", [
    ["ACI-P018-L007-11699BCBF2", "Languages differ from one another."],
    ["ACI-P018-L008-FC00404AFC", "Languages can vary widely even when they belong to the same language family."],
    ["ACI-P018-L008-FC00404AFC-02", "English is presented as a member of the Indo-European language family."],
    ["ACI-P018-L008-FC00404AFC-03", "Russian is presented as a member of the Indo-European language family."],
    ["ACI-P018-L008-FC00404AFC-04", "Irish is presented as a member of the Indo-European language family."],
    ["ACI-P018-L008-FC00404AFC-05", "Spanish is presented as a member of the Indo-European language family."],
    ["ACI-P018-L008-FC00404AFC-06", "Rumanian is presented as a member of the Indo-European language family."],
    ["ACI-P018-L008-FC00404AFC-07", "Hindi is presented as a member of the Indo-European language family."],
    ["ACI-P018-L008-FC00404AFC-08", "Languages from different families can display still greater differences than languages within one family."],
    ["ACI-P018-L008-FC00404AFC-09", "English, Swahili, Tagalog, Arabic, Japanese, Turkish, Quechua, and Nahuatl are listed to illustrate comparison across different language families."],
  ]),
  freezeGroup("Language remains open and changing", [
    ["ACI-P018-L011-9AF60BB546", "Language diversity is supported by arbitrariness, creativity, and change."],
    ["ACI-P018-L011-9AF60BB546-02", "Linguistic arbitrariness means that the content dimension is not motivatedly linked to the medium dimension."],
    ["ACI-P018-L011-9AF60BB546-03", "Linguistic creativity means that every language can produce an indefinitely large number of sentences."],
    ["ACI-P018-L011-9AF60BB546-04", "Linguistic change means that languages continually change in pronunciation, grammar, and lexicon."],
  ]),
  freezeGroup("Recognize adult language-learning pressure", [
    ["ACI-P018-L016-856BF54621", "Young children have no problem with language difference."],
    ["ACI-P018-L016-56E13BB51A", "Young children can apparently acquire native competence in a foreign language as easily as in their first language."],
    ["ACI-P018-L017-632BA40D59", "The openness to foreign-language learning described in §1.2 is said to diminish gradually with age."],
    ["ACI-P018-L017-632BA40D59-02", "The openness to foreign-language learning described in §1.2 is said to become lost during the early teenage years."],
    ["ACI-P018-L018-F9C2B920A2", "The loss of early language-learning openness is presented as a reason adults experience linguistic foreignness as a formidable difficulty."],
    ["ACI-P018-L019-8F0CF99916", "Adult learners have lost much of the linguistic flexibility attributed to children."],
    ["ACI-P018-L019-8F0CF99916-02", "Adult learners have lost much of the linguistic receptivity attributed to children."],
    ["ACI-P018-L019-8F0CF99916-03", "Acquired habits constrain an adult learner's response to a foreign language."],
    ["ACI-P018-L019-8F0CF99916-04", "Acquired presuppositions constrain an adult learner's response to a foreign language."],
    ["ACI-P018-L019-8F0CF99916-05", "Acquired predispositions constrain an adult learner's response to a foreign language."],
    ["ACI-P018-L019-8F0CF99916-06", "These habits, presuppositions, and predispositions operate as automatic expectations and responses."],
    ["ACI-P018-L019-8F0CF99916-07", "The constraining expectations and responses are inculcated during the learner's formative years."],
  ]),
  freezeGroup("Compare without replacing the language", [
    ["ACI-P018-L022-470C28E427", "Andrews argues that an adult learns a foreign language partly by using the adult’s own language as a means of comparison."],
    ["ACI-P018-L022-470C28E427-02", "Andrews argues that an adult learns a foreign language in constant struggle against interference from the adult’s own language."],
    ["ACI-P018-L024-7D8A399481", "A native speaker’s ease in handling minute details of pronunciation results from years of intimate familiarity."],
    ["ACI-P018-L024-7D8A399481-02", "A native speaker’s confidence in handling subtle details of thought expression results from years of intimate familiarity."],
    ["ACI-P018-L024-7D8A399481-03", "The author calls native familiarity ‘innocent’ when the mind is unaware of language-transfer pressure."],
    ["ACI-P018-L026-ECB4179AF8", "An adult foreign-language learner does not have the years of intimate familiarity available to a native-learning child."],
    ["ACI-P018-L026-ECB4179AF8-02", "An adult foreign-language learner does not have the child's innocence of language-transfer pressure."],
  ]),
  freezeGroup("Use an adult learning strategy", [
    ["ACI-P018-L027-97FD0346D9", "An adult foreign-language learner must use an acquisition strategy different from a child's strategy."],
    ["ACI-P018-L028-45C023E675", "An adult learner should compensate for limited time through alert, thoughtful, repetitive practice of basic patterns."],
    ["ACI-P018-L028-45C023E675-02", "Language learning resembles other skills in requiring attentive repetition of basics to achieve familiarity and ease of performance."],
    ["ACI-P019-L002-0AE428CE24", "An adult learner should offset reduced learning innocence by using the adult advantage of intellect."],
    ["ACI-P019-L002-0AE428CE24-02", "Adult language learning should employ comparative reasoning."],
    ["ACI-P019-L002-0AE428CE24-03", "Adult language learning should employ contrastive analysis."],
    ["ACI-P019-L004-DB6E5C2A3A", "An adult language learner should accept the assistance of grammatical explanation."],
    ["ACI-P019-L004-DB6E5C2A3A-02", "Grammar is a reasoned description of a language's elements and the rules governing relationships among those elements."],
  ]),
]);

export function isLesson1ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON1_READER_GUIDANCE_GROUPS);
}

export function renderLesson1ReaderGuidance(escapeHtml = String) {
  return LESSON1_READER_GUIDANCE_GROUPS.map((group) => `
                    <section class="grammar-inspector__section" data-classical-reader-guidance-group="true">
                      <h5>${escapeHtml(group.title)}</h5>
                      <ul>
${group.records.map((record) => `                        <li data-classical-reader-guidance-atom="${escapeHtml(record.atomId)}">${escapeHtml(record.statement)}</li>`).join("\n")}
                      </ul>
                    </section>`).join("");
}
