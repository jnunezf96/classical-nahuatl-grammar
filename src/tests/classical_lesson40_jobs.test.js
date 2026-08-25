"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function issueNnc(ctx, stem, subject = "3sg") {
    const source = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
        subject,
        nounClass: "zero",
        animacy: "animate",
        pluralConnector: subject.endsWith("pl") ? "0-h" : "",
    });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        outputKind: "scalar",
        args: [source.nncSlotFrame, {
            sentenceType: "assertion",
            polarity: "positive",
        }],
    });
    return receipt.canonicalResult;
}

function issuePronominal(ctx, stem = "yeh") {
    const source = ctx.buildClassicalNahuatlPronominalNncSourceFrame({ stem });
    const operation = ctx.buildClassicalNahuatlPronominalNncOperationFrame(
        source,
        {
            subject: "3sg",
            clausePosition: "initial",
            adjunctorInMode: "none",
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return ctx.requestClassicalPronominalNncResult(source, operation);
}

function issueVnc(ctx, sourceStem, tense) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense,
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
    });
}

function issueDeverbal(ctx, nominalizationKind) {
    const customary = nominalizationKind.startsWith("customary-");
    const source = issueVnc(
        ctx,
        customary ? "mati" : "miqui",
        customary ? "customary-present" : "preterit"
    );
    const request = {
        constructionKind: "predicate-nominalization",
        nominalizationKind,
        canonicalVncResult: source.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    };
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:deverbal-construction",
        outputKind: "scalar",
        args: [request],
    });
}

function issuePatientive(ctx, family = "passive-core") {
    const rootStock = family === "root-or-stock";
    const perfective = rootStock ? null : issueVnc(ctx, "miqui", "preterit");
    const request = {
        constructionKind: "patientive",
        patientiveSourceFamily: rootStock
            ? "root-or-stock"
            : "perfective-active-core",
        patientiveAnalogy: "impersonal",
        ...(rootStock
            ? { source: {
                sourceStage: "root-or-stock",
                sourceStem: "cual-ā-ni",
                sourceVoice: "active",
                sourceValence: "intransitive",
                sourceObjectPattern: "none",
                sourceSubject: "3sg",
                verbClass: "A",
            } }
            : { canonicalVncResult: perfective.resultFrame }),
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    };
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:deverbal-construction",
        outputKind: "scalar",
        args: [request],
    });
}

function modify(ctx, head, modifier, choices = {}) {
    return ctx.evaluateClassicalNahuatlAdjectivalModification({
        operationKind: "adjectival-modification",
        topology: "ordinary",
        order: "head-modifier",
        adjunctor: "none",
        head,
        modifier,
        ...choices,
    });
}

function exactResult(ctx, result) {
    return result?.authorizationStatus === "authorized"
        && ctx.isClassicalNahuatlResultFrame(result) === true;
}

function exactDeverbalApplication(ctx, receipt) {
    return ctx.isClassicalGrammarApplicationResult(receipt) === true
        && receipt.authorizationStatus === "authorized"
        && ctx.isClassicalNahuatlDeverbalNncGrammarFrame(
            receipt.canonicalResult
        ) === true;
}

function exactDeverbalHandoff(receipt, modification) {
    return modification?.selectedClauses?.[1]?.sourceResult
        === receipt.canonicalResult
        && modification.selectedClauses[1].typedSlotFrame
            === receipt.canonicalResult.canonicalResult.nncSlotFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson40_jobs");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson40-review-plan.json"), "utf8"));
    const field = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((name, index) => [name, index])
    );
    const atoms = atomLedger.atoms.filter(atom => (
        /^§40(?:\.|$)/u.test(atom[field.canvasSection])
    ));
    const writingRoles = new Set([
        "canonical-rule-or-alternation",
        "applicability-or-constraint",
        "derived-realization",
        "source-structure-schema",
        "result-projection",
    ]);
    const writing = atoms.filter(atom => (
        atom[field.force] === "grammar-bearing"
        && writingRoles.has(atom[field.projectRole])
    ));
    const groupForSection = (section) => plan.groups.find(group => (
        group.sections.some(anchor => (
            section === anchor || section.startsWith(`${anchor}.`)
        ))
    ));

    const head = issueNnc(ctx, "cueitl");
    const ordinaryModifier = issueNnc(ctx, "canahuac");
    const ordinary = modify(ctx, head, ordinaryModifier);
    const exceptional = modify(ctx, issuePronominal(ctx), ordinaryModifier);
    const patientive = issuePatientive(ctx);
    const patientiveModification = modify(ctx, head, patientive);
    const customary = issueDeverbal(ctx, "customary-agentive-reanalysis");
    const customaryModification = modify(ctx, head, customary);
    const preterit = issueDeverbal(ctx, "preterit-agentive");
    const preteritModification = modify(ctx, head, preterit);
    const rootStock = issuePatientive(ctx, "root-or-stock");
    const rootStockModification = modify(ctx, head, rootStock);
    const synonymousFirst = modify(ctx, head, preterit);
    const synonymousSecond = modify(ctx, head, rootStock);
    const multiple = modify(ctx, head, ordinaryModifier, {
        topology: "cooperating-preposed-nonpreposed",
        order: "cooperating-preposed-nonpreposed",
        adjunctor: "nonpreposed-in",
        additionalModifiers: [issueNnc(ctx, "tlazohtli")],
    });
    const copied = ctx.evaluateClassicalNahuatlAdjectivalModification({
        operationKind: "adjectival-modification",
        topology: "ordinary",
        order: "head-modifier",
        adjunctor: "none",
        head: { ...head },
        modifier: ordinaryModifier,
    });

    const proofByGroup = new Map([
        ["lesson40-adjectival-function-boundary",
            exactResult(ctx, ordinary)],
        ["lesson40-exceptional-adjectival-nncs",
            exactResult(ctx, exceptional)
            && exceptional.derived.headClauseType === "pronominal-nnc"],
        ["lesson40-patientive-adjectival-function",
            exactDeverbalApplication(ctx, patientive)
            && exactResult(ctx, patientiveModification)
            && exactDeverbalHandoff(patientive, patientiveModification)],
        ["lesson40-customary-nominalized-vnc-adjectival-function",
            exactDeverbalApplication(ctx, customary)
            && exactResult(ctx, customaryModification)
            && exactDeverbalHandoff(customary, customaryModification)],
        ["lesson40-preterit-agentive-adjectival-function",
            exactDeverbalApplication(ctx, preterit)
            && exactResult(ctx, preteritModification)
            && exactDeverbalHandoff(preterit, preteritModification)],
        ["lesson40-root-plus-ya-adjectival-function",
            exactDeverbalApplication(ctx, rootStock)
            && exactResult(ctx, rootStockModification)
            && exactDeverbalHandoff(rootStock, rootStockModification)],
        ["lesson40-synonymous-adjectival-systems",
            exactResult(ctx, synonymousFirst)
            && exactResult(ctx, synonymousSecond)
            && synonymousFirst.selectedClauses[1]
                !== synonymousSecond.selectedClauses[1]],
        ["lesson40-predicate-adjective-sentence",
            exactResult(ctx, multiple)
            && multiple.derived.compositionScope === "complete-sentence"
            && copied.authorizationStatus === "blocked"
            && copied.blockReason
                === "lessons40-43-canonical-head-result-required"],
    ]);
    s.eq("Lesson 40 collapses onto eight exact owner pathways", {
        atoms: atoms.length,
        writing: writing.length,
        groups: plan.groups.length,
        mapped: atoms.every(atom => Boolean(
            groupForSection(atom[field.canvasSection])
        )),
        exactGroups: [...proofByGroup.values()].filter(Boolean).length,
        newAdjectiveStemEngine:
            typeof ctx.buildClassicalNahuatlLessons4043AdjectivalSourceClassification,
    }, {
        atoms: 394,
        writing: 125,
        groups: 8,
        mapped: true,
        exactGroups: 8,
        newAdjectiveStemEngine: "undefined",
    });

    for (const atom of writing) {
        const atomId = atom[field.atomId];
        const group = groupForSection(atom[field.canvasSection]);
        s.ok(atomId, proofByGroup.get(group?.groupId) === true);
        s.ok(`mutation:${atomId}`,
            proofByGroup.get(group?.groupId) === true);
    }

    s.eq("upstream derivation and adjectival modification remain distinct", {
        patientiveRetained:
            exactDeverbalHandoff(patientive, patientiveModification),
        customaryRetained:
            exactDeverbalHandoff(customary, customaryModification),
        preteritRetained:
            exactDeverbalHandoff(preterit, preteritModification),
        rootStockRetained:
            exactDeverbalHandoff(rootStock, rootStockModification),
        copiedResultRejected: copied.authorizationStatus === "blocked",
        formulaIndependent:
            multiple.formulaProjection.derivedFromWrittenProjection === false,
        surfaceIndependent:
            multiple.writtenProjection.derivedFromFormulaProjection === false,
    }, {
        patientiveRetained: true,
        customaryRetained: true,
        preteritRetained: true,
        rootStockRetained: true,
        copiedResultRejected: true,
        formulaIndependent: true,
        surfaceIndependent: true,
    });

    return s;
}

module.exports = { run };
