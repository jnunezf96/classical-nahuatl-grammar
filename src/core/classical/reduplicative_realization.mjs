// Shared phonological realization. This utility issues no grammatical authority.
const consonantUnits = /^(?:ch|cu|hu|qu|tl|tz|[bcçhlmnpqstxyz])/u;
const vowels = "aāeēiīoō";
const shortVowel = value => ({ ā: "a", ē: "e", ī: "i", ō: "o" }[value] || value);
const longVowel = value => ({ a: "ā", e: "ē", i: "ī", o: "ō" }[value] || value);

export function getReduplicationParts(sourceStem, { supportiveI = false } = {}) {
  let stem = String(sourceStem || "").normalize("NFC").trim().replace(/^\((.*)\)$/u, "$1");
  if (supportiveI && /^i/u.test(stem)) {
    const afterI = stem.slice(1);
    const first = afterI.match(consonantUnits)?.[0] || "";
    const afterFirst = afterI.slice(first.length);
    const second = afterFirst.match(consonantUnits)?.[0] || "";
    const afterSecond = afterFirst.slice(second.length);
    const vowel = afterSecond.match(new RegExp(`^[${vowels}]`, "u"))?.[0] || afterFirst.match(new RegExp(`[${vowels}]`, "u"))?.[0] || "i";
    return { consonant: second || first, vowel, retainedStem: afterI };
  }
  const consonant = stem.match(consonantUnits)?.[0] || "";
  const remainder = stem.slice(consonant.length);
  const vowel = remainder.match(new RegExp(`[${vowels}]`, "u"))?.[0] || stem.match(new RegExp(`[${vowels}]`, "u"))?.[0] || "i";
  return { consonant, vowel, retainedStem: stem };
}

export function reduplicate(sourceStem, shape = "short-glottal", options = {}) {
  const parts = getReduplicationParts(sourceStem, options);
  const vowel = shape === "long" ? longVowel(shortVowel(parts.vowel)) : shortVowel(parts.vowel);
  const prefix = `${parts.consonant}${vowel}${shape === "short-glottal" ? "h" : ""}`;
  const repetitions = Math.max(1, Math.min(32, Number(options.repetitions) || 1));
  return `${Array.from({ length: repetitions }, () => prefix).join("-")}-${parts.retainedStem}`;
}
