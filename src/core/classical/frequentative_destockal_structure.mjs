// Andrews 27.4: grammatical constitution, never a list of completed words.
export function getFrequentativeDestockalConstitution(sourceStem = "") {
  const entered = String(sourceStem).trim();
  if (!entered.includes("-")) {
    if (!entered.endsWith("ca")) return null;
    const core = entered.slice(0, -2);
    const initial = core.match(/^((?:ch|tl|tz|cu|qu|hu|[bcdfghjklmnpqrstvwxyz])?)([aeio])/u);
    if (!initial) return null;
    const prefix = initial[0];
    const candidates = [];
    for (let count = 1; core.startsWith(prefix.repeat(count)); count += 1) {
      const residual = core.slice(prefix.length * count);
      if (!residual) break;
      const stock = /[aeio]$/u.test(residual) ? residual.slice(-1) : "";
      const root = stock ? residual.slice(0, -1) : residual;
      const segmented = [...Array(count).fill(prefix), root, ...(stock ? [stock] : []), "ca"].join("-");
      const candidate = getFrequentativeDestockalConstitution(segmented);
      if (candidate) candidates.push(candidate);
    }
    // Multiple possible roots require constituent analysis; no guessed ancestry.
    return candidates.length === 1 ? Object.freeze({
      ...candidates[0], sourceStem: entered, analysisBasis: "unique-grammatical-constitution",
    }) : null;
  }
  const units = entered.split("-");
  if (units.at(-1) !== "ca" || units.length < 3) return null;
  units.pop();
  const stock = /^[aeio]$/u.test(units.at(-1)) ? units.pop() : "";
  const root = units.pop();
  const initial = root?.match(/^((?:ch|tl|tz|cu|qu|hu|[bcdfghjklmnpqrstvwxyz])?)([aāeēiīoō])/u);
  if (!initial || !units.length) return null;
  const short = { ā: "a", ē: "e", ī: "i", ō: "o" };
  const prefix = initial[1] + (short[initial[2]] || initial[2]);
  if (units.some(unit => unit !== prefix)) return null;
  // A separated reduced stock, or root/stock coalescence retaining its long vowel.
  if (!stock && !/^[aāeēiīoō]$/u.test(root.slice(initial[1].length))) return null;
  if (!stock && !/[āēīō]/u.test(root)) return null;
  return Object.freeze({
    kind: "classical-nahuatl-frequentative-destockal-constitution",
    sourceStem: String(sourceStem).trim(), root, stockFormative: stock,
    copiedPrefix: prefix, repetitions: units.length, themeSuffix: "ca",
    section: "27.4", reconstructedAncestorRequired: false,
  });
}
