// Canonical modern ESM module.

export function createUiI18nApi(targetObject = globalThis) {
    function getNonactivePersonSub(prefix, classicalLocaleContext = false) {
      if (!prefix) {
        return targetObject.getDummySubjectSubLabel(classicalLocaleContext);
      }
      return targetObject.getLocalizedLabel(targetObject.NONACTIVE_PERSON_SUB_LABELS[prefix], classicalLocaleContext, "");
    }
    function getSubjectSelectionByAgreement(subjectPrefix = "", subjectSuffix = "") {
      for (const group of targetObject.SUBJECT_PERSON_GROUPS) {
        if (!group || typeof group !== "object") {
          continue;
        }
        for (const number of targetObject.SUBJECT_PERSON_NUMBER_ORDER) {
          const selection = group[number];
          if (!selection) {
            continue;
          }
          if (String(selection.subjectPrefix || "") === String(subjectPrefix || "") && String(selection.subjectSuffix || "") === String(subjectSuffix || "")) {
            return {
              group,
              selection,
              number
            };
          }
        }
      }
      return null;
    }
    function getSubjectPersonLabelByAgreement(subjectPrefix = "", subjectSuffix = "", classicalLocaleContext = false) {
      const matched = getSubjectSelectionByAgreement(subjectPrefix, subjectSuffix);
      if (matched) {
        return targetObject.getSubjectPersonLabel(matched.group, matched.selection, classicalLocaleContext);
      }
      const info = targetObject.getPers1Pers2Info(subjectPrefix, subjectSuffix);
      if (!info) {
        return "";
      }
      const personKeyMap = {
        1: "first",
        2: "second",
        3: "third"
      };
      const personKey = personKeyMap[info.person] || "";
      const groupLabel = targetObject.getLocalizedLabel(targetObject.PERSON_GROUP_LABELS[personKey], classicalLocaleContext, `${info.person}a persona`);
      const numberKey = info.number === "pl" ? "plural" : "singular";
      const numberLabels = targetObject.NUMBER_LABELS[numberKey] || {};
      const numberLabel = classicalLocaleContext ? numberLabels.es || numberKey : numberLabels.es || numberKey;
      return [groupLabel, numberLabel].filter(Boolean).join(" ");
    }
    function getRetainedObjectSublabel(prefix = "", classicalLocaleContext = false) {
      const normalized = String(prefix || "");
      if (!normalized) {
        return "";
      }
      const dedicatedEs = {
        ta: "algo",
        te: "alguien",
        mu: "sí mismo",
        nech: "a mí",
        metz: "a ti",
        ki: "a él/ella/eso",
        tech: "a nosotros",
        metzin: "a ustedes",
        kin: "a ellos/ellas"
      };
      if (classicalLocaleContext) {
        const nonactiveLabel = targetObject.getLocalizedLabel(targetObject.NONACTIVE_PERSON_SUB_LABELS[normalized], true, "");
        if (nonactiveLabel) {
          return nonactiveLabel;
        }
      } else if (dedicatedEs[normalized]) {
        return dedicatedEs[normalized];
      }
      const label = targetObject.getObjectLabelShort(normalized, classicalLocaleContext);
      return label || normalized;
    }
    function getNonactivePersonCategory(prefix, classicalLocaleContext = false) {
      const entry = targetObject.NONACTIVE_PERSON_CATEGORY_LABELS[prefix] || targetObject.NONACTIVE_PERSON_CATEGORY_LABELS.default;
      return targetObject.getLocalizedLabel(entry, classicalLocaleContext, "");
    }
    function getNonactiveGenericLabel(prefix, classicalLocaleContext = false) {
      const entry = targetObject.NONACTIVE_GENERIC_LABELS[prefix] || targetObject.NONACTIVE_GENERIC_LABELS.default;
      return targetObject.getLocalizedLabel(entry, classicalLocaleContext, "impersonal");
    }
    function getNonactivePersonLabel(prefix, options = {}) {
      const classicalLocaleContext = options.classicalLocaleContext === true;
      if (options.isIntransitive) {
        return targetObject.getVerbBlockLabel("eventImpersonal", classicalLocaleContext, "Evento impersonal");
      }
      if (options.isDirectGroup) {
        if (targetObject.OBJECT_MARKERS.has(prefix)) {
          return getNonactiveGenericLabel(prefix, classicalLocaleContext);
        }
        return getNonactivePersonCategory(prefix, classicalLocaleContext) || targetObject.getVerbBlockLabel("patient", classicalLocaleContext, "Paciente");
      }
      return getNonactiveGenericLabel(prefix, classicalLocaleContext);
    }
    function getNonactiveRowLabelModel(prefix, options = {}) {
      const classicalLocaleContext = options.classicalLocaleContext === true;
      const subjectOverride = options.subjectOverride && typeof options.subjectOverride === "object" ? options.subjectOverride : null;
      const retainedObjectPrefix = String(options.retainedObjectPrefix || "");
      if (options.isIntransitive) {
        return {
          label: targetObject.getVerbBlockLabel("eventImpersonal", classicalLocaleContext, "Evento impersonal"),
          subLabel: getNonactiveGenericLabel("", classicalLocaleContext)
        };
      }
      if (options.isDirectGroup) {
        const patientLabel = targetObject.getVerbBlockLabel("patient", classicalLocaleContext, "Paciente");
        if (subjectOverride) {
          const personLabel = getSubjectPersonLabelByAgreement(subjectOverride.pers1 || "", subjectOverride.pers2 || "", classicalLocaleContext);
          const inverseParticipantLabel = getNonactivePersonSub(prefix, classicalLocaleContext);
          const retainedObjectLabel = getRetainedObjectSublabel(retainedObjectPrefix, classicalLocaleContext);
          return {
            label: personLabel || getNonactivePersonCategory(prefix, classicalLocaleContext) || patientLabel,
            subLabel: [inverseParticipantLabel, retainedObjectLabel].filter(Boolean).join(" · ")
          };
        }
        return {
          label: getNonactivePersonCategory(prefix, classicalLocaleContext) || patientLabel,
          subLabel: [getNonactivePersonSub(prefix, classicalLocaleContext), getRetainedObjectSublabel(retainedObjectPrefix, classicalLocaleContext)].filter(Boolean).join(" · ")
        };
      }
      return {
        label: getNonactiveGenericLabel(prefix, classicalLocaleContext),
        subLabel: targetObject.getObjectLabelShort(prefix, classicalLocaleContext) || getNonactivePersonSub(prefix, classicalLocaleContext)
      };
    }
    function getNonactiveSlotPrefixes(marker, slot) {
      if (!marker) {
        return null;
      }
      if (marker === "te") {
        return Array.from(targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS);
      }
      if (marker === "ta") {
        if (slot === "subject") {
          return ["ki"];
        }
        return ["", "ki", "ta"];
      }
      if (marker === "mu") {
        return slot === "object" ? ["mu"] : Array.from(targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS);
      }
      return null;
    }

    const api = {};
    api.getNonactivePersonSub = getNonactivePersonSub;
    api.getSubjectSelectionByAgreement = getSubjectSelectionByAgreement;
    api.getSubjectPersonLabelByAgreement = getSubjectPersonLabelByAgreement;
    api.getRetainedObjectSublabel = getRetainedObjectSublabel;
    api.getNonactivePersonCategory = getNonactivePersonCategory;
    api.getNonactiveGenericLabel = getNonactiveGenericLabel;
    api.getNonactivePersonLabel = getNonactivePersonLabel;
    api.getNonactiveRowLabelModel = getNonactiveRowLabelModel;
    api.getNonactiveSlotPrefixes = getNonactiveSlotPrefixes;
    return api;
}

export function installUiI18nGlobals(targetObject = globalThis) {
    const api = createUiI18nApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
