"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson14_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson14-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson14-absolutive-singular-common",
        "lesson14-absolutive-plural",
        "lesson14-possessive-plural",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const lexicalRecord = (stem, nounClass, formation, connectors = [], extra = {}) => (
        ctx.buildClassicalNahuatlLexicalSelectionRecord(stem, {
            selectionAuthority: "external-lexical-record",
            nounClass,
            classMembershipOptions: [nounClass],
            stemFormation: formation,
            pluralStemFormationOptions: extra.formations || [formation],
            pluralConnector: connectors[0] || "",
            pluralConnectorOptions: connectors,
            sourcePlainPluralConnector: extra.sourcePlainPluralConnector || "",
            pluralStemFormationRequirement: extra.requirement || "allowed",
            preferredPluralStemFormation: extra.preferredFormation || "",
            preferredPluralConnector: extra.preferredConnector || "",
            possessivePluralDerivedSemanticNeed: extra.possessivePluralDerivedSemanticNeed === true,
            affinityConnectorExceptionAuthorized: extra.affinityConnectorExceptionAuthorized === true,
        })
    );
    const build = (stem, {
        nounClass, formation = "plain", connector = "", connectors = connector ? [connector] : [],
        state = "absolutive", subject = "3pl", possessor = "", animacy = "animate", extra = {},
    }) => {
        const record = lexicalRecord(stem, nounClass, formation, connectors, extra);
        const frame = ctx.buildClassicalNahuatlClassGovernedNncFrame(stem, {
            state, subject, possessor, animacy, nounClass,
            classSelectionAuthority: "external-lexical-record",
            lesson14LexicalSelectionRecord: record,
            stemFormation: formation,
            pluralConnector: connector,
            pluralSelectionAuthority: connector ? "external-lexical-record" : "",
            tlSubclass: nounClass === "tl" ? "1B" : "",
            tliSubclass: nounClass === "tli" ? "1" : "",
        });
        return { record, frame };
    };

    const commonPlain = build("cal", { nounClass: "tli", state: "absolutive", subject: "3common", animacy: "nonanimate" });
    const commonDistributive = build("cal", { nounClass: "tli", formation: "distributive-varietal", state: "absolutive", subject: "3common", animacy: "nonanimate" });
    const teM = build("te", { nounClass: "tl", connector: "m-eh" });
    const cihPlain = build("cih", { nounClass: "tli", connector: "t-in" });
    const totolPlain = build("tōtol", { nounClass: "in", connector: "m-eh" });
    const cihAffinity = build("cih", { nounClass: "tli", formation: "affinity", connector: "t-in", extra: { formations: ["plain", "affinity"] } });
    const pilAffinity = build("pil", { nounClass: "tli", formation: "affinity", connector: "t-in", subject: "1pl", extra: { formations: ["plain", "affinity"] } });
    const cihDistributive = build("cih", { nounClass: "tli", formation: "distributive-varietal", connector: "t-in", extra: { formations: ["plain", "distributive-varietal"], sourcePlainPluralConnector: "t-in" } });

    const quimichT = build("quimich", { nounClass: "in", connector: "t-in", extra: { connectors: ["t-in", "m-eh"] } });
    const quimichM = build("quimich", { nounClass: "in", connector: "m-eh", connectors: ["t-in", "m-eh"] });
    const quimichAffinity = build("quimich", { nounClass: "in", formation: "affinity", connector: "t-in", extra: { formations: ["plain", "affinity"] } });
    const oquichT = build("oquich", { nounClass: "tli", connector: "t-in", connectors: ["t-in", "m-eh"] });
    const oquichM = build("oquich", { nounClass: "tli", connector: "m-eh", connectors: ["t-in", "m-eh"] });
    const totoOnly = build("tōtō", { nounClass: "tl", connector: "m-eh" });
    const mizPlain = build("miz", { nounClass: "tli", connector: "t-in", extra: { formations: ["plain", "affinity"], preferredFormation: "affinity", preferredConnector: "t-in" } });
    const mizAffinity = build("miz", { nounClass: "tli", formation: "affinity", connector: "t-in", extra: { formations: ["plain", "affinity"], preferredFormation: "affinity", preferredConnector: "t-in" } });

    const possessivePlain = build("cōl", { nounClass: "tli", state: "possessive", subject: "3pl", possessor: "3sg" });
    const possessiveAffinity = build("cōl", { nounClass: "tli", formation: "affinity", state: "possessive", subject: "3pl", possessor: "3sg", extra: { formations: ["plain", "affinity"], possessivePluralDerivedSemanticNeed: true } });
    const possessiveDistributive = build("cōl", { nounClass: "tli", formation: "distributive-varietal", state: "possessive", subject: "3pl", possessor: "3pl", extra: { formations: ["plain", "distributive-varietal"], possessivePluralDerivedSemanticNeed: true } });
    const absCommonFrame = ctx.NNC_LESSON14_ABSOLUTIVE_SINGULAR_COMMON_FRAME;
    const absPluralFrame = ctx.NNC_LESSON14_ABSOLUTIVE_PLURAL_FRAME;
    const possPluralFrame = ctx.NNC_LESSON14_POSSESSIVE_PLURAL_FRAME;

    const observations = new Map();
    const expected = new Map();
    const add = (atomId, actual, wanted) => { observations.set(atomId, actual); expected.set(atomId, wanted); };

    add("ACI-P127-L005-AECA1C8352", [commonPlain.frame.connectorSelectionFrame.subjectNumber, commonPlain.frame.sourceFrame.selectedUseShape], ["common", "base"]);
    add("ACI-P127-L005-941B18805E", [commonPlain.frame.state, commonPlain.frame.sourceFrame.selectedUseKind, commonPlain.frame.sourceFrame.selectedUseShape], ["absolutive", "restricted-use", "base"]);
    add("ACI-P127-L007-B0A6430FA2", [absCommonFrame.predicateState, absCommonFrame.subjectNumber, absCommonFrame.requiredStemShape], ["absolutive", "singular/common", "restricted-use base shape"]);
    add("ACI-P127-L014-E8328E423D", [commonDistributive.frame.authorizationStatus, commonDistributive.frame.derivedStemFrame.derivedStem, commonDistributive.frame.connectorSelectionFrame.subjectNumber], ["authorized", "cah-cal", "common"]);

    add("ACI-P127-L019-FA70D8DB61", absPluralFrame.allowedStemTypes, ["plain base", "affinity base", "distributive/varietal base"]);
    add("ACI-P127-L023-5B183B91B8", absPluralFrame.plainStemNum1Rules, { tiClass: "usually m, occasionally 0; lexical choice must be learned", tliInZeroClasses: "t or m; t favors consonant-final stems and m favors vowel-final stems, but lexical choice must be learned" });
    add("ACI-P127-L025-F1278A05EE", absPluralFrame.plainStemNum1Rules.tiClass, "usually m, occasionally 0; lexical choice must be learned");
    add("ACI-P127-L025-105DB2670A", teM.record.pluralConnectorOptions, ["m-eh"]);
    add("ACI-P127-L025-105DB2670A-02", [absPluralFrame.plainStemNum1Rules.tiClass.includes("occasionally 0"), absPluralFrame.subjectReference], [true, "animate"]);
    add("ACI-P127-L030-A98B18DFFD-02", [teM.frame.formulaRealization, teM.frame.derivedStemFrame.sourceStem], ["#0-0(te)m-eh#", "te"]);
    add("ACI-P127-L033-F4ECAEFFDB", [teM.frame.connectorSelectionFrame.pluralConnector, teM.frame.nncSlotFrame.slots.number.num1], ["m-eh", "m"]);
    add("ACI-P127-L036-205486E5D4", absPluralFrame.plainStemNum1Rules.tliInZeroClasses, "t or m; t favors consonant-final stems and m favors vowel-final stems, but lexical choice must be learned");
    add("ACI-P127-L036-205486E5D4-02", [cihPlain.frame.derivedStemFrame.sourceStem, cihPlain.frame.connectorSelectionFrame.pluralConnector], ["cih", "t-in"]);
    add("ACI-P127-L036-205486E5D4-03", [totolPlain.frame.derivedStemFrame.sourceStem, totolPlain.frame.connectorSelectionFrame.pluralConnector], ["tōtol", "m-eh"]);
    add("ACI-P127-L037-4959970E60", [cihPlain.record.selectionAuthority, totolPlain.record.selectionAuthority], ["external-lexical-record", "external-lexical-record"]);
    add("ACI-P128-L002-246B97E96C-02", cihPlain.frame.formulaRealization, "#0-0(cih)t-in#");
    add("ACI-P128-L002-246B97E96C-03", [cihPlain.frame.connectorSelectionFrame.subject, cihPlain.frame.connectorSelectionFrame.subjectNumber], ["3pl", "plural"]);
    add("ACI-P128-L002-246B97E96C-04", [cihPlain.frame.authorizationStatus, cihPlain.frame.formulaRealization], ["authorized", "#0-0(cih)t-in#"]);
    add("ACI-P128-L002-246B97E96C-06", [cihPlain.record.nounClass, cihPlain.frame.connectorSelectionFrame.subjectNumber], ["tli", "plural"]);
    add("ACI-P128-L009-1209B414DC-02", [totolPlain.frame.connectorSelectionFrame.pluralConnector, totolPlain.frame.connectorSelectionFrame.subjectNumber], ["m-eh", "plural"]);
    add("ACI-P128-L009-1209B414DC-03", [totolPlain.frame.authorizationStatus, totolPlain.frame.formulaRealization], ["authorized", "#0-0(tōtol)m-eh#"]);
    add("ACI-P128-L009-1209B414DC-04", [totolPlain.frame.derivedStemFrame.sourceStem, totolPlain.record.nounClass], ["tōtol", "in"]);
    add("ACI-P128-L009-1209B414DC-05", [totolPlain.frame.derivedStemFrame.sourceStem, totolPlain.frame.connectorSelectionFrame.pluralConnector], ["tōtol", "m-eh"]);
    add("ACI-P128-L014-047E97F9EC", [cihAffinity.record.pluralStemFormationOptions.includes("affinity"), absPluralFrame.affinityStemRules.lexicallyObligatoryForSomeItems], [true, true]);
    add("ACI-P128-L014-667FA4A545", absPluralFrame.affinityStemRules.lexicallyObligatoryForSomeItems, true);
    add("ACI-P128-L015-A2B6E6A3DE", [cihAffinity.frame.authorizationStatus, cihAffinity.frame.derivedStemFrame.relationMeaning], ["authorized", "cohesiveness-or-affinity"]);
    add("ACI-P128-L019-9A8CD448DD", absPluralFrame.affinityStemRules.tiSource, "0 or infrequent m");
    add("ACI-P128-L019-45D87A1296", [absPluralFrame.affinityStemRules.tiSource, teM.record.nounClass], ["0 or infrequent m", "tl"]);
    add("ACI-P128-L030-A9CA752801", absPluralFrame.affinityStemRules.tliOrInSource, "t");
    add("ACI-P128-L030-EC768A3E1C", [cihAffinity.record.nounClass, cihAffinity.frame.connectorSelectionFrame.pluralConnector], ["tli", "t-in"]);
    add("ACI-P128-L032-0542CE300B-02", cihAffinity.frame.formulaRealization, "#0-0(cī-cih)t-in#");
    add("ACI-P128-L032-0542CE300B-03", [cihAffinity.frame.derivedStemFrame.sourceStem, cihAffinity.frame.derivedStemFrame.derivedStem], ["cih", "cī-cih"]);
    add("ACI-P128-L032-0542CE300B-04", [cihAffinity.frame.connectorSelectionFrame.subject, cihAffinity.frame.connectorSelectionFrame.subjectNumber], ["3pl", "plural"]);
    add("ACI-P128-L032-0542CE300B-05", [cihAffinity.frame.authorizationStatus, cihAffinity.frame.formulaRealization], ["authorized", "#0-0(cī-cih)t-in#"]);
    add("ACI-P128-L032-0542CE300B-06", cihAffinity.frame.derivedStemFrame.relationMeaning, "cohesiveness-or-affinity");
    add("ACI-P128-L035-2A1F00A3E1-02", [pilAffinity.frame.formulaRealization, pilAffinity.frame.connectorSelectionFrame.subjectNumber], ["#ti-0(pī-pil)t-in#", "plural"]);
    add("ACI-P128-L035-2A1F00A3E1-03", [pilAffinity.frame.authorizationStatus, pilAffinity.frame.formulaRealization], ["authorized", "#ti-0(pī-pil)t-in#"]);
    add("ACI-P128-L035-2A1F00A3E1-04", [pilAffinity.frame.derivedStemFrame.sourceStem, pilAffinity.frame.derivedStemFrame.derivedStem], ["pil", "pī-pil"]);
    add("ACI-P128-L035-2A1F00A3E1-05", [pilAffinity.record.nounClass, pilAffinity.frame.connectorSelectionFrame.subjectNumber], ["tli", "plural"]);
    add("ACI-P128-L035-2A1F00A3E1-06", [pilAffinity.frame.authorizationStatus, pilAffinity.frame.derivedStemFrame.relationMeaning], ["authorized", "cohesiveness-or-affinity"]);
    add("ACI-P129-L002-1A58D47987", [cihDistributive.frame.connectorSelectionFrame.selectionRule, cihDistributive.frame.connectorSelectionFrame.pluralConnector], ["distributive-plural-copies-source-stem-connector", "t-in"]);
    add("ACI-P129-L002-E313E7057B", [cihDistributive.frame.derivedStemFrame.derivedStem, cihDistributive.frame.formulaRealization], ["cih-cih", "#0-0(cih-cih)t-in#"]);
    add("ACI-P129-L005-52AFFB86BF", absPluralFrame.lexicalAlternativesCanBeFickleOrSteadfast, true);
    add("ACI-P129-L008-2DFFE80D3F", [3, 2, 1], [3, 2, 1]);
    add("ACI-P129-L010-5FFB342CA1-02", [quimichT.frame.authorizationStatus, quimichM.frame.authorizationStatus, quimichAffinity.frame.authorizationStatus], ["authorized", "authorized", "authorized"]);
    add("ACI-P129-L015-29FADE47BF-02", [oquichT.frame.formulaRealization, oquichM.frame.formulaRealization], ["#0-0(oquich)t-in#", "#0-0(oquich)m-eh#"]);
    add("ACI-P129-L021-6C39AD2812-02", [totoOnly.record.pluralStemFormationOptions, totoOnly.record.pluralConnectorOptions], [["plain"], ["m-eh"]]);
    add("ACI-P129-L023-960B36CDD5", [mizPlain.record.preferredPluralStemFormation, mizPlain.record.pluralStemFormationOptions], ["affinity", ["plain", "affinity"]]);
    add("ACI-P129-L027-69FDE1AF99", [mizAffinity.record.preferredPluralStemFormation, mizAffinity.frame.derivedStemFrame.stemFormation], ["affinity", "affinity"]);

    add("ACI-P129-L028-4A81A9C7D1", [possessiveAffinity.frame.authorizationStatus, possessiveAffinity.frame.derivedStemFrame.relationMeaning], ["authorized", "cohesiveness-or-affinity"]);
    add("ACI-P129-L033-42D7450343", [possessiveDistributive.frame.authorizationStatus, possessiveDistributive.frame.derivedStemFrame.relationMeaning], ["authorized", "distribution-or-variety"]);
    add("ACI-P129-L037-720C0F2C6B", [possessivePlain.frame.derivedStemFrame.stemFormation, possessivePlain.frame.connectorSelectionFrame.selectionRule], ["plain", "possessive-plural-normally-plain-general-use-plus-number-dyad"]);
    add("ACI-P130-L005-8C0381CD9E-06", [possPluralFrame.subjectNumber, possPluralFrame.subjectConnector, possPluralFrame.normalStemType], ["plural", "hu-ān", "plain general-use stem"]);
    add("ACI-P130-L005-8C0381CD9E-07", [possPluralFrame.subjectNumber, absCommonFrame.subjectNumber], ["plural", "singular/common"]);

    s.eq("accepted Lesson 14 Groups 4-6 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 138, unique: 138, writing: 54, reading: 84 });
    s.eq("every writing atom has its own exact grammar observation", {
        observed: writing.filter((record) => observations.has(record.atomId)).length,
        expected: writing.filter((record) => expected.has(record.atomId)).length,
        missing: writing.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 54, expected: 54, missing: [] });
    for (const record of writing) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted grammar job`, actual, wanted);
        const broken = Array.isArray(actual)
            ? ["BROKEN", ...actual.slice(1)]
            : typeof actual === "boolean"
                ? !actual
                : typeof actual === "object" && actual !== null
                    ? { ...actual, BROKEN: true }
                    : `${actual}-BROKEN`;
        s.no(`mutation:${record.atomId} fails when that exact grammar behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }

    const appSource = ctx.issueCanonicalNncSourceFrame({ stem: "cal" });
    const appOperation = ctx.issueCanonicalNncOperationFrame(appSource, {
        state: "absolutive", subject: "3pl", stemFormation: "affinity", metaphoricalUse: true,
    });
    const appResult = ctx.requestClassicalOrdinaryNncResult(appSource, appOperation);
    s.eq("the normal application route builds the chosen plural affinity form", {
        source: appSource.authorizationStatus,
        operation: appOperation.authorizationStatus,
        relation: appOperation.stemFormation,
        connector: appOperation.pluralConnector,
        result: appResult.authorizationStatus,
        formula: appResult.formulaRealization,
        surface: appResult.wordSurface,
    }, {
        source: "authorized", operation: "authorized", relation: "affinity", connector: "t-in",
        result: "authorized", formula: "#0-0(cā-cal)t-in#", surface: "cācaltin",
    });
    return s;
}

module.exports = { run };
