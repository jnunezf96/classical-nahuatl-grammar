"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson16_contradiction_audit");
    const audit = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson16-contradiction-audit.json"),
        "utf8",
    ));

    const execute = (sourceInput, selections = {}) => {
        const source = ctx.issueCanonicalNncSourceFrame(sourceInput);
        const selection = ctx.getCanonicalNncOperationSelectionFrame(source, selections);
        const operation = ctx.issueCanonicalNncOperationFrame(source, {
            subject: selections.subject || selection.selectedSubject,
            clausePosition: selections.clausePosition || selection.selectedClausePosition || "initial",
            adjunctorInMode: selections.adjunctorInMode || selection.selectedAdjunctorInMode || "none",
            numberForm: selections.numberForm || selection.selectedNumberForm || "",
            predicatePluralization:
                selections.predicatePluralization
                || selection.selectedPredicatePluralization
                || "",
            doubledFirstPlural: selections.doubledFirstPlural === true,
            specialHumanUse: selections.specialHumanUse === true,
            sentenceType: selections.sentenceType || "statement",
            polarity: selections.polarity || "positive",
        });
        const result = operation.authorizationStatus === "authorized"
            ? ctx.requestClassicalPronominalNncResult(source, operation)
            : null;
        return { source, selection, operation, result };
    };
    const form = (entry) => entry.result
        ? [entry.result.formulaRealization, entry.result.sentenceSurface]
        : [entry.operation.authorizationStatus, entry.operation.blockReason];
    const sentenceForm = (entry) => entry.result
        ? [
            entry.result.formulaRealization,
            entry.result.sentenceFrame.sentenceFormulaDisplay,
            entry.result.sentenceSurface,
        ]
        : [entry.operation.authorizationStatus, entry.operation.blockReason];

    const personalFirst = execute({ stem: "yeh" }, { subject: "1sg" });
    const personalThird = execute({ stem: "eh" }, { subject: "3sg" });
    const possessiveSource = ctx.issueCanonicalNncSourceFrame({ stem: "eh" });
    const rejectedPossessiveOperation = ctx.issueCanonicalNncOperationFrame(
        possessiveSource,
        { subject: "1sg", state: "possessive" },
    );
    const compoundCommon = execute(
        { stem: "eh-huā", embedStem: "eh", matrixStem: "huā" },
        { subject: "3common", numberForm: "sounded" },
    );
    const compoundPlural = execute(
        { stem: "eh-huā", embedStem: "eh", matrixStem: "huā" },
        { subject: "3pl", numberForm: "t-in" },
    );
    const compoundSilent = execute(
        { stem: "eh-huā", embedStem: "eh", matrixStem: "huā" },
        { subject: "3pl", numberForm: "silent-silent" },
    );
    const invalidDoubled = execute(
        { stem: "eh-huā", embedStem: "eh", matrixStem: "huā" },
        { subject: "2pl", numberForm: "t-in", doubledFirstPlural: true },
    );

    const tlehSource = { stem: "tl-eh", embedStem: "tl", matrixStem: "eh" };
    const tlehInitial = execute(tlehSource, { subject: "3sg" });
    const tlehNoninitial = execute(tlehSource, {
        subject: "3sg", clausePosition: "noninitial",
    });
    const tlehSeparate = execute(tlehSource, {
        subject: "3sg", adjunctorInMode: "dependent-clause",
    });
    const tlehFused = execute(tlehSource, {
        subject: "3sg", adjunctorInMode: "fused-tlein",
    });

    const demonstrativeSingular = execute({ stem: "īn" }, { subject: "3sg" });
    const demonstrativePlural = execute({ stem: "īn" }, { subject: "3pl" });
    const itlahBlocked = execute(
        { stem: "itl-ah", embedStem: "itl", matrixStem: "ah" },
        { subject: "2sg" },
    );
    const itlahHuman = execute(
        { stem: "itl-ah", embedStem: "itl", matrixStem: "ah" },
        { subject: "2sg", specialHumanUse: true },
    );

    const miyeCommon = execute(
        { stem: "miye-c", embedStem: "miye", matrixStem: "c" },
        { subject: "3common" },
    );
    const miyeNormal = execute(
        { stem: "miye-c", embedStem: "miye", matrixStem: "c" },
        { subject: "1pl", predicatePluralization: "internal-n", numberForm: "t-in" },
    );
    const miyePlain = execute(
        { stem: "miye-c", embedStem: "miye", matrixStem: "c" },
        { subject: "1pl", predicatePluralization: "plain-variant", numberForm: "t-in" },
    );
    const cequiAssimilated = execute(
        { stem: "ce-qui", embedStem: "ce", matrixStem: "qui" },
        { subject: "2pl", predicatePluralization: "internal-n", numberForm: "silent-silent" },
    );
    const cequiPlainBlocked = execute(
        { stem: "ce-qui", embedStem: "ce", matrixStem: "qui" },
        { subject: "1pl", predicatePluralization: "plain-variant", numberForm: "t-in" },
    );
    const izquiPlain = execute(
        { stem: "iz-qui", embedStem: "iz", matrixStem: "qui" },
        { subject: "1pl", predicatePluralization: "plain-variant", numberForm: "m-eh" },
    );

    const simpleMoch = execute(
        { stem: "mo-ch", embedStem: "mo", matrixStem: "ch" },
        { subject: "1pl", predicatePluralization: "plain-variant", numberForm: "t-in" },
    );
    const compoundMoch = execute(
        { stem: "mo-ch-eh-huā", embedStem: "mo-ch", matrixStem: "eh-huā" },
        { subject: "3sg", numberForm: "sounded" },
    );

    const huelIzqui = ctx.buildClassicalRuleLogicSurfaceFrame({
        basalUnit: "nnc",
        stem: "iz-qui",
        sourceEmbedStem: "iz",
        sourceMatrixStem: "qui",
        subject: "3common",
        nncAnimacy: "animate",
        sentenceAdverbialId: "l16-huel",
        sentenceSurfaceMode: "statement",
    });
    const achiMochi = ctx.buildClassicalRuleLogicSurfaceFrame({
        basalUnit: "nnc",
        stem: "mo-chi",
        sourceEmbedStem: "mo",
        sourceMatrixStem: "chi",
        subject: "3common",
        nncAnimacy: "animate",
        sentenceAdverbialId: "l16-achi-adverbial",
        sentenceSurfaceMode: "statement",
    });

    s.eq("Lesson 16 contradiction report is closed", {
        status: audit.status,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length,
        authority: audit.reportAuthority,
    }, {
        status: "UNCONTRADICTED",
        resolved: 14,
        unresolved: 0,
        resolutions: 14,
        authority: false,
    });
    s.eq("source identity, conditioned personal form, and State remain separate", {
        first: form(personalFirst),
        third: form(personalThird),
        state: rejectedPossessiveOperation.blockReason,
    }, {
        first: ["#n-0(eh)0-0#", "Neh."],
        third: ["#0-0(yeh)0-0#", "Yeh."],
        state: "pronominal-nnc-operation-selection-not-recognized:state",
    });
    s.eq("internal plural, subject connector, silent variant, and doubled restriction do not collapse", {
        common: form(compoundCommon),
        sounded: form(compoundPlural),
        silent: form(compoundSilent),
        invalidDoubled: form(invalidDoubled),
    }, {
        common: ["#0-0(eh-huā)tl-0#", "Ehhuātl."],
        sounded: ["#0-0(yeh-huā-n)t-in#", "Yehhuāntin."],
        silent: ["#0-0(yeh-huā-n)⎕-⎕#", "Yehhuān."],
        invalidDoubled: [
            "blocked",
            "doubled-first-plural-person-is-limited-to-first-plural-personal-compound-nnc",
        ],
    });
    s.eq("clause position and the separate or fused in constructions remain distinct", {
        initial: sentenceForm(tlehInitial),
        noninitial: sentenceForm(tlehNoninitial),
        separate: sentenceForm(tlehSeparate),
        fused: sentenceForm(tlehFused),
    }, {
        initial: ["#0-0(tl-eh)0-0#", "#0-0(tl-eh)0-0#?", "Tleh?"],
        noninitial: ["#0-0(tl-eh)0-0#", "#0-0(tl-eh)0-0#.", "Tleh."],
        separate: ["#0-0(tl-eh)0-0#", "#0-0(tl-eh)0-0# in …?", "Tleh in …?"],
        fused: ["#0-0(tl-eh)0-0#", "#0-0(tl-eh)0-0# +in?", "Tlein?"],
    });
    s.eq("same-looking demonstratives and the special human itlah context retain typed differences", {
        demonstratives: [form(demonstrativeSingular), form(demonstrativePlural)],
        itlahBlocked: form(itlahBlocked),
        itlahHuman: form(itlahHuman),
    }, {
        demonstratives: [
            ["#0-0(īn)0-0#", "Īn."],
            ["#0-0(īn)⎕-⎕#", "Īn."],
        ],
        itlahBlocked: ["blocked", "itlah-with-human-subject-requires-special-situation-selection"],
        itlahHuman: ["#t-0(itl-ah)0-0#", "Titlah."],
    });
    s.eq("quantitive source identity, automatic allomorphy, variants, and assimilation agree", {
        common: form(miyeCommon),
        normal: form(miyeNormal),
        plain: form(miyePlain),
        izquiPlain: form(izquiPlain),
        cequiAssimilated: form(cequiAssimilated),
        cequiPlainBlocked: form(cequiPlainBlocked),
        choices: miyeNormal.selection.predicatePluralizationValues,
    }, {
        common: ["#0-0(miye-c)0-0#", "Miyec."],
        normal: ["#ti-0(miye-quī-n)t-in#", "Timiyequīntin."],
        plain: ["#ti-0(miye-c)t-in#", "Timiyectin."],
        izquiPlain: ["#t-0(iz-quī)m-eh#", "Tizquīmeh."],
        cequiAssimilated: ["#az-0(ce-quī-n)⎕-⎕#", "Azcequīn."],
        cequiPlainBlocked: [
            "blocked",
            "selected-predicate-pluralization-not-licensed-for-pronominal-nnc-context",
        ],
        choices: ["internal-n", "plain-variant"],
    });
    s.eq("sentence modifiers remain outside the completed NNC nucleus", {
        huel: [
            huelIzqui.selectedFormula,
            huelIzqui.sentenceFormulaDisplay,
            huelIzqui.sentenceSurfaceDisplay,
        ],
        achi: [
            achiMochi.selectedFormula,
            achiMochi.sentenceFormulaDisplay,
            achiMochi.sentenceSurfaceDisplay,
        ],
    }, {
        huel: ["#0-0(iz-qui)0-0#", "huel #0-0(iz-qui)0-0#.", "Huel izqui."],
        achi: ["#0-0(mo-chi)0-0#", "achi #0-0(mo-chi)0-0#.", "Achi mochi."],
    });
    s.eq("simple mo-ch and embedded mo-ch remain separate source structures", {
        simple: form(simpleMoch),
        compound: form(compoundMoch),
        structures: [simpleMoch.source.sourceStructure, compoundMoch.source.sourceStructure],
    }, {
        simple: ["#ti-0(mo-ch)t-in#", "Timochtin."],
        compound: ["#0-0(mo-ch-eh-huā)tl-0#", "Mochehhuātl."],
        structures: ["embed-matrix", "embed-matrix"],
    });
    return s;
}

module.exports = { run };
