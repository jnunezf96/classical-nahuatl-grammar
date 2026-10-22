// Shared stem operation; callers supply their owner-authorized source analysis.
export function pluralizeClassicalNahuatlLesson16InternalStem(stem = "") {
  const normalizedStem = String(stem).normalize("NFC").trim();
  if (/(?:huā|quī|chī)$/u.test(normalizedStem)) return `${normalizedStem}-n`;
  if (/qui$/u.test(normalizedStem)) return normalizedStem.replace(/qui$/u, "quī-n");
  if (/chi$/u.test(normalizedStem)) return normalizedStem.replace(/chi$/u, "chī-n");
  return "";
}
