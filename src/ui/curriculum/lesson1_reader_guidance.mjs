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
