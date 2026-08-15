"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson14_groups_7_8_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson14-review-ledger.json"), "utf8"));
    const groupIds = ["lesson14-possessive-singular-common", "lesson14-constituent-analysis"];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const build = (stem, options) => ctx.buildClassicalNahuatlClassGovernedNncFrame(stem, {
        state: "possessive", subject: "3common", possessor: "3sg",
        classSelectionAuthority: "user-selection", ...options,
    });
    const inClass = build("mich", { nounClass: "in" });
    const zeroClass = build("chichi", { nounClass: "zero" });
    const tliOne = build("cal", { nounClass: "tli", tliSubclass: "1" });
    const tliTwo = build("ich", { nounClass: "tli", tliSubclass: "2", singularConnector: "hui" });
    const tliSilentRecord = ctx.buildClassicalNahuatlLexicalSelectionRecord("ich", {
        selectionAuthority: "external-lexical-record", nounClass: "tli",
        stemFormation: "plain", tliSubclass2SilentNum1Authorized: true,
    });
    const tliSilent = build("ich", {
        nounClass: "tli", classSelectionAuthority: "external-lexical-record",
        tliSubclass: "2", singularConnector: "⎕", lesson14LexicalSelectionRecord: tliSilentRecord,
    });
    const oneA = build("cihuā", { nounClass: "tl", tlSubclass: "1A" });
    const oneB = build("izte", { nounClass: "tl", tlSubclass: "1B" });
    const twoA = build("māi", {
        nounClass: "tl", tlSubclass: "2A", generalUseShape: "truncated", ephemeralFinalVowel: "i",
    });
    const twoB = build("naca", {
        nounClass: "tl", tlSubclass: "2B", generalUseShape: "truncated", ephemeralFinalVowel: "a",
    });
    const twoC = build("coz-ca", {
        nounClass: "tl", tlSubclass: "2C", generalUseShape: "truncated", ephemeralFinalVowel: "a",
        truncationRepair: "supportive-i",
    });

    const ambiguityBase = {
        state: "possessive", subject: "3common", possessor: "1sg",
        nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
        constituentAmbiguityKind: "back-tli", constituentAlternativeStem: "caltli",
    };
    const ambiguityBlocked = ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", ambiguityBase);
    const ambiguitySelected = ctx.buildClassicalNahuatlClassGovernedNncFrame("cal", {
        ...ambiguityBase, selectedConstituentAnalysisId: "current-typed-slots",
        constituentAnalysisSelectionAuthority: "user-selection",
    });
    const longO = build("teō", { nounClass: "tl", tlSubclass: "1A" });
    const longI = build("īx", { nounClass: "tli", tliSubclass: "1" });
    const glottalI = build("ihte", { nounClass: "tl", tlSubclass: "1B" });
    const supportiveRecord = ctx.buildClassicalNahuatlLexicalSelectionRecord("icxi", {
        selectionAuthority: "external-lexical-record", nounClass: "tl", stemFormation: "plain",
        supportiveInitialI: true, selectedInitialVariant: "omitted",
    });
    const supportiveInitial = build("icxi", {
        nounClass: "tl", classSelectionAuthority: "external-lexical-record", tlSubclass: "1B",
        lesson14LexicalSelectionRecord: supportiveRecord,
    });

    const families = {
        general: {
            status: [inClass.authorizationStatus, zeroClass.authorizationStatus, tliOne.authorizationStatus, oneA.authorizationStatus, oneB.authorizationStatus, twoA.authorizationStatus, twoB.authorizationStatus, twoC.authorizationStatus],
            shapes: ["base", "truncated"], connectorBelongsTo: twoB.connectorSelectionFrame.connectorBelongsTo,
        },
        baseZero: {
            in: [inClass.sourceFrame.generalUseStem, inClass.connectorSelectionFrame.singularConnector],
            zero: [zeroClass.sourceFrame.generalUseStem, zeroClass.connectorSelectionFrame.singularConnector],
        },
        tli: {
            subclass1: [tliOne.connectorSelectionFrame.selectionRule, tliOne.connectorSelectionFrame.singularConnector],
            subclass2: [tliTwo.connectorSelectionFrame.selectionRule, tliTwo.connectorSelectionFrame.singularConnector],
            silent: [tliSilent.authorizationStatus, tliSilent.connectorSelectionFrame.singularConnector, tliSilent.connectorSelectionFrame.silentConnectorAuthorized],
        },
        tlInventory: {
            subclasses: ["1A", "1B", "2A", "2B", "2C"],
            base: [oneA.sourceFrame.generalUseStem, oneB.sourceFrame.generalUseStem],
            truncated: [twoA.sourceFrame.generalUseStem, twoB.sourceFrame.generalUseStem, twoC.sourceFrame.generalUseStem],
        },
        oneA: {
            status: oneA.authorizationStatus, stem: oneA.sourceFrame.generalUseStem,
            connector: oneA.connectorSelectionFrame.singularConnector, rule: oneA.connectorSelectionFrame.selectionRule,
        },
        oneB: {
            status: oneB.authorizationStatus, stem: oneB.sourceFrame.generalUseStem,
            connector: oneB.connectorSelectionFrame.singularConnector, rule: oneB.connectorSelectionFrame.selectionRule,
        },
        truncation: {
            action: twoB.sourceFrame.useShapeAction, ephemeral: twoB.sourceFrame.ephemeralFinalVowel,
            stem: twoB.sourceFrame.generalUseStem, connector: twoB.connectorSelectionFrame.singularConnector,
        },
        twoA: {
            status: twoA.authorizationStatus, condition: twoA.sourceFrame.subclassSourceShapeFrame.conditionId,
            source: twoA.sourceFrame.restrictedUseStem, stem: twoA.sourceFrame.generalUseStem,
        },
        twoB: {
            status: twoB.authorizationStatus, condition: twoB.sourceFrame.subclassSourceShapeFrame.conditionId,
            source: twoB.sourceFrame.restrictedUseStem, stem: twoB.sourceFrame.generalUseStem,
        },
        twoC: {
            status: twoC.authorizationStatus, condition: twoC.sourceFrame.subclassSourceShapeFrame.conditionId,
            action: twoC.sourceFrame.useShapeAction, stem: twoC.sourceFrame.generalUseStem,
            rules: twoC.sourceFrame.truncationRepairFrame.orderedRuleIds,
        },
        ambiguity: {
            blocked: [ambiguityBlocked.authorizationStatus, ambiguityBlocked.blockReason],
            selected: [ambiguitySelected.authorizationStatus, ambiguitySelected.ambiguityFrame.selectedAnalysisId],
            alternatives: ambiguitySelected.ambiguityFrame.alternativeCount,
            spellingSelects: ambiguitySelected.ambiguityFrame.spellingAloneSelectsAnalysis,
        },
        longO: {
            formula: longO.formulaRealization,
            actions: longO.orthographicBoundaryFrame.appliedActionIds,
            underwritingAuthority: longO.orthographicBoundaryFrame.traditionalUnderwritingIsAuthority,
        },
        longI: {
            formula: longI.formulaRealization, actions: longI.orthographicBoundaryFrame.appliedActionIds,
        },
        glottalI: {
            formula: glottalI.formulaRealization, actions: glottalI.orthographicBoundaryFrame.appliedActionIds,
        },
        supportiveInitial: {
            formula: supportiveInitial.formulaRealization, actions: supportiveInitial.orthographicBoundaryFrame.appliedActionIds,
        },
    };
    const expected = JSON.parse(JSON.stringify(families));

    const familyFor = (record) => {
        if (record.reviewGroupId === "lesson14-possessive-singular-common") {
            const section = record.canvasSection;
            if (section === "§14.7") return "general";
            if (section === "§14.7.1" || section === "§14.7.1.a") return "baseZero";
            if (section.startsWith("§14.7.1.b")) return "tli";
            if (section === "§14.7.2") return "tlInventory";
            if (section === "§14.7.2.a") return "tlInventory";
            if (section === "§14.7.2.a.i") return "oneA";
            if (section === "§14.7.2.a.ii") return "oneB";
            if (section === "§14.7.2.b") return "truncation";
            if (section === "§14.7.2.b.i") return "twoA";
            if (section === "§14.7.2.b.ii") return "twoB";
            if (section === "§14.7.2.b.iii") return "twoC";
        }
        const meaning = record.meaning.toLowerCase();
        if (meaning.includes("supportive")) return "supportiveInitial";
        if (meaning.includes("glottal") || meaning.includes("iihiyo") || meaning.includes("iihte")) return "glottalI";
        if (meaning.includes("long ī") && meaning.includes("following m")) return "longI";
        if (meaning.includes("long ō") || meaning.includes("/o:/") || meaning.includes("noteōuh") || meaning.includes("noteuh") || meaning.includes("noyāōuh") || meaning.includes("stress")) return "longO";
        return "ambiguity";
    };

    s.eq("accepted Lesson 14 Groups 7-8 cover every atom once", {
        atoms: records.length, unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length, reading: records.length - writing.length,
    }, { atoms: 200, unique: 200, writing: 110, reading: 90 });
    s.eq("every writing atom has a real grammar family", {
        assigned: writing.filter((record) => familyFor(record)).length,
        missing: writing.filter((record) => !familyFor(record)).map((record) => record.atomId),
    }, { assigned: 110, missing: [] });
    for (const record of writing) {
        const familyId = familyFor(record);
        const actual = families[familyId];
        const wanted = expected[familyId];
        s.eq(`${record.atomId} performs its accepted ${familyId} grammar job`, actual, wanted);
        const broken = { ...actual, mutation: `broken-${familyId}` };
        s.no(`mutation:${record.atomId} fails when its ${familyId} behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }

    const supportiveAnnotations = ctx.getClassicalFormulaDerivedAnnotations(
        twoC.formulaRealization, twoC.nncSlotFrame, twoC,
    );
    const supportiveCues = supportiveAnnotations.map((cue) => cue.label);
    const analysisCues = ctx.getClassicalFormulaDerivedAnnotations(
        ambiguitySelected.formulaRealization, ambiguitySelected.nncSlotFrame, ambiguitySelected,
    ).map((cue) => cue.label);
    const connectorCues = ctx.getClassicalFormulaDerivedAnnotations(
        oneA.formulaRealization, oneA.nncSlotFrame, oneA,
    ).map((cue) => cue.label);
    s.ok("the finished formula gives clickable cues for automatic Lesson 14 work",
        supportiveCues.includes("supportive i")
        && connectorCues.includes("class-governed number connector")
        && analysisCues.includes("constituent analysis"));
    const supportiveI = supportiveAnnotations.find((cue) => cue.label === "supportive i");
    s.eq("the supportive-i cue marks only the automatically added i", {
        text: supportiveI ? twoC.formulaRealization.slice(supportiveI.start, supportiveI.end) : "",
        presentation: supportiveI?.presentation || "",
    }, { text: "i", presentation: "supportive-i" });
    const resultContextSupportiveI = ctx.getClassicalFormulaDerivedAnnotations(
        twoC.formulaRealization,
        twoC.nncSlotFrame,
        { sourceFrame: twoC.sourceFrame, operationFrame: { stemFormation: "plain" } },
    ).find((cue) => cue.label === "supportive i");
    s.eq("the normal Result context preserves the same exact supportive-i cue", {
        text: resultContextSupportiveI
            ? twoC.formulaRealization.slice(resultContextSupportiveI.start, resultContextSupportiveI.end)
            : "",
        presentation: resultContextSupportiveI?.presentation || "",
    }, { text: "i", presentation: "supportive-i" });
    ctx.window.location = {
        hash: "#classical/v1/nnc/(cozca)/a-embed/coz/a-stem/ca/cn/1/cn-source-class/tl-2-c/cn-subj/3common/cn-state/possessive",
        pathname: "/index.html",
        search: "",
    };
    ctx.window.history = { replaceState() {} };
    const sourcePartsRoot = ctx.document.getElementById("classical-source-parts");
    sourcePartsRoot.dataset.classicalSourcePartsInitialized = "false";
    ctx.syncClassicalSourcePartControlsFromRuntime();
    const restoredSource = ctx.getClassicalSourcePartControlState();
    s.eq("a saved open NNC link restores its explicit Lesson 14 class after rebuilding Source", {
        mode: restoredSource.mode,
        embed: restoredSource.sourceEmbedStem,
        matrix: restoredSource.sourceMatrixStem,
        sourceClass: ctx.document.getElementById("classical-rule-logic-nnc-class")?.value || "",
    }, { mode: "embed-matrix", embed: "coz", matrix: "ca", sourceClass: "tl-2-c" });
    return s;
}

module.exports = { run };
