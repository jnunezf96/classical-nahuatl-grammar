export function getClassicalNahuatlNncPredicateBoundaryCarrier(slots = {}) {
      // Andrews 2.3: preserve the underlying stem while realizing the -h boundary.
      return slots.number?.num2 === "h"
        && ["0", "Ø", "⎕", ""].includes(slots.number?.num1 || "")
          ? String(slots.predicate?.stem || "").replace(/[āēīō]$/u,
              vowel => ({ā: "a", ē: "e", ī: "i", ō: "o"})[vowel])
          : slots.predicate?.stem;
    }
