export const CLASSICAL_IRREGULAR_PHONE_OPTIONALITY = Object.freeze([
  "obligatory",
  "optional",
  "rare-optional",
]);

export const CLASSICAL_PHONE_REPERTORY_OPTIONALITY_FACTS = Object.freeze([
  "irregular-phones-may-be-obligatory",
  "irregular-phones-may-be-optional",
  "optional-irregular-phones-may-be-rare",
]);

export const CLASSICAL_PHONE_TO_PHONEME_DISAMBIGUATION =
  "morphemic-source-relationship";

export const CLASSICAL_NAHUATL_PHONE_REPERTORY_RELATIONS = Object.freeze([
  ["n", "n", "regular"],
  ["m", "n", "irregular"],
  ["ch", "ch", "regular"],
  ["t", "ch", "irregular"],
  ["t", "t", "regular"],
  ["tl", "t", "irregular"],
].map(([phoneme, phone, relation]) => Object.freeze({
  phoneme,
  phone,
  relation,
  atomId: "ACI-P025-L029-B44E4F4DFD",
  grammarAuthority: true,
})));

function normalizePhoneRepertorySymbol(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\/\[\]]/gu, "")
    .replaceAll("č", "ch")
    .replaceAll("λ", "tl");
}

export function getClassicalNahuatlPhoneRepertoryRelation(
  phoneme = "",
  phone = "",
) {
  const normalizedPhoneme = normalizePhoneRepertorySymbol(phoneme);
  const normalizedPhone = normalizePhoneRepertorySymbol(phone);
  return CLASSICAL_NAHUATL_PHONE_REPERTORY_RELATIONS.find(record => (
    record.phoneme === normalizedPhoneme
    && record.phone === normalizedPhone
  )) || null;
}
