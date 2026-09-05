// Shared typed grammar for Classical Nahuatl root-stock vowel coalescence.
//
// Consumers provide morpheme identities and ranks. Written and formula
// projections remain consequences of this relation, never its input authority.

const VERSION = 1;

const freeze = value => {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freeze);
  return Object.freeze(value);
};

const text = value => String(value ?? "").trim();

export const CLASSICAL_NAHUATL_ROOT_STOCK_VOWEL_COALESCENCE_RULE_CONTRACT =
  freeze({
    kind: "classical-nahuatl-root-stock-vowel-coalescence-rule-contract",
    version: VERSION,
    authorizationStatus: "authorized",
    ruleId: "cn-l24-identical-root-stock-vowel-coalescence",
    operation:
      "coalesce-identical-root-final-and-stock-formative-vowels-in-written-projection",
    affectedStemFormativeFamilies: ["ni", "hui"],
    rankSequence: ["root", "stock", "intransitive-verbstem"],
    licensedFamilies: {
      ni: {
        underlyingStemFormative: "ni",
        finiteStemFormatives: ["ni", "n"],
        stockFormativeQuantity: "long",
        section: "24.5.9",
      },
      hui: {
        underlyingStemFormative: "hui",
        finiteStemFormatives: ["hui", "uh"],
        stockFormativeQuantity: "long",
        section: "24.5.9",
      },
      hua: {
        underlyingStemFormative: "hua",
        finiteStemFormatives: ["hua"],
        stockFormatives: ["ē"],
        section: "24.6.2",
      },
    },
    rootFinalVowelQuantity: "short",
    stockFormativeQuantity: "long",
    vowelQualityRelation: "identical",
    underlyingVowelCount: 2,
    surfaceVowelCount: 1,
    surfaceTwoStepStructureObscured: true,
    underlyingMorphologyPreserved: true,
    formulaProjectionPreserved: true,
    sourceAdmissionAuthority: false,
    canvasExampleAuthority: false,
    contextualFactIsUserChoice: false,
  });

function getTypedMorphemeIdentity(morpheme = null) {
  return text(morpheme?.morphIdentity || morpheme?.surface || "");
}

export function buildClassicalNahuatlTypedRootStockVowelCoalescenceRelation(
  rootMorpheme = null,
  stockMorpheme = null,
  stemMorpheme = null,
) {
  const typedMorphemeRoles = [
    rootMorpheme?.slotRole || "",
    stockMorpheme?.slotRole || "",
    stemMorpheme?.slotRole || "",
  ];
  if (!typedMorphemeRoles.every(role => role === "predicate")) return null;

  const root = getTypedMorphemeIdentity(rootMorpheme);
  const stockFormative = getTypedMorphemeIdentity(stockMorpheme);
  const finiteStemFormative = getTypedMorphemeIdentity(stemMorpheme);
  const rootFinalVowel = root.at(-1) || "";
  const shortVowelByLongVowel = Object.freeze({
    ā: "a",
    ē: "e",
    ī: "i",
    ō: "o",
  });
  const stockVowelQuality = shortVowelByLongVowel[stockFormative] || "";
  const licensedFamilyEntry = Object.entries(
    CLASSICAL_NAHUATL_ROOT_STOCK_VOWEL_COALESCENCE_RULE_CONTRACT
      .licensedFamilies,
  ).find(([, family]) => (
    family.finiteStemFormatives.includes(finiteStemFormative)
    && (
      !Array.isArray(family.stockFormatives)
      || family.stockFormatives.includes(stockFormative)
    )
  )) || null;
  if (
    !root
    || !/^[aeio]$/u.test(rootFinalVowel)
    || !stockVowelQuality
    || stockVowelQuality !== rootFinalVowel
    || !licensedFamilyEntry
  ) {
    return null;
  }

  const [stemFormativeFamily, licensedFamily] = licensedFamilyEntry;
  const resultStock = `${root.slice(0, -1)}${stockFormative}`;
  const sourceMorphologyFrame = Object.freeze({
    kind: "classical-nahuatl-identical-vowel-boundary-source-frame",
    root,
    stockFormative,
    stemFormative: finiteStemFormative,
    outputVowel: stockFormative,
  });
  return freeze({
    kind: "classical-nahuatl-typed-root-stock-vowel-coalescence-relation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    ruleContract:
      CLASSICAL_NAHUATL_ROOT_STOCK_VOWEL_COALESCENCE_RULE_CONTRACT,
    ruleId:
      CLASSICAL_NAHUATL_ROOT_STOCK_VOWEL_COALESCENCE_RULE_CONTRACT.ruleId,
    section: licensedFamily.section,
    operation:
      CLASSICAL_NAHUATL_ROOT_STOCK_VOWEL_COALESCENCE_RULE_CONTRACT.operation,
    sourceMorphologyFrame,
    root,
    rootFinalVowel,
    stockFormative,
    stemFormativeFamily,
    underlyingStemFormative: licensedFamily.underlyingStemFormative,
    finiteStemFormative,
    vowelQualityRelation: "identical",
    rootFinalAndStockVowelQualityMatch: true,
    underlyingVowelCount: 2,
    surfaceVowelCount: 1,
    outputConstituent: "surface-stock",
    resultStock,
    condition: {
      rootEndsInVowel: true,
      rootFinalVowelMatchesStockFormative: true,
      vowelMatchDimension: "quality-not-quantity",
    },
    realization: {
      operation: "identical-vowel-coalescence",
      underlyingVowelCount: 2,
      surfaceVowelCount: 1,
      outputConstituent: "surface-stock",
      resultStock,
    },
    underlyingMorphology: {
      root,
      stockFormative,
      stemFormative: licensedFamily.underlyingStemFormative,
    },
    typedMorphemeRoles,
    surfaceTwoStepStructureObscured: true,
    underlyingMorphologyPreserved: true,
    formulaProjectionPreserved: true,
    formulaCarrierChangedByWrittenBoundary: false,
    sourceAdmissionAuthority: false,
    canvasExampleAuthority: false,
    contextualFactIsUserChoice: false,
  });
}
