"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function issueNnc(ctx, stem, nounClass = "zero", subject = "3sg") {
    const nnc = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
        subject,
        nounClass,
        animacy: "animate",
        pluralConnector: subject.endsWith("pl") ? "0-h" : "t-in",
    });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        outputKind: "scalar",
        args: [
            nnc.nncSlotFrame,
            { sentenceType: "assertion", polarity: "positive" },
        ],
    });
    return receipt.canonicalResult;
}

function issueVnc(ctx) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        outputKind: "scalar",
        args: [{
            sourceStem: "chihua",
            verbClass: "A",
            sourceValence: "specific-projective",
            subject: "1sg",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            requestedDerivation: "direct",
            requestedVoice: "active",
            mood: "indicative",
            tense: "present",
            outputScope: "single",
        }],
    }).canonicalResult;
}

function issuePronominal(ctx, stem, subject = "3sg") {
    const source = ctx.buildClassicalNahuatlPronominalNncSourceFrame({ stem });
    const operation = ctx.buildClassicalNahuatlPronominalNncOperationFrame(
        source,
        {
            subject,
            clausePosition: "initial",
            adjunctorInMode: "none",
            sentenceType: "statement",
            polarity: "positive",
        },
    );
    return ctx.requestClassicalPronominalNncResult(source, operation);
}

function issueCardinal(ctx) {
    return ctx.requestClassicalNominalConstructionResult({
        constructionKind: "cardinal-numeral-nnc",
        value: 1,
        classifier: "basic",
        countKind: "ordinary",
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
    });
}

function issueSupplementation(ctx) {
    const principal = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            outputKind: "scalar",
            args: [{
                sourceStem: "cuīca",
                verbClass: "A",
                sourceValence: "intransitive",
                subject: "3sg",
                objectKind: "",
                objectPerson: "",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: "indicative",
                tense: "present",
                outputScope: "single",
            }],
        }).canonicalResult,
        {
            referenceId: "third",
            subjectReferenceId: "third",
            sourceStem: "cuīca",
        },
    );
    const supplement = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        ctx.buildClassicalNahuatlAbsolutiveNncFrame("tlācatl", {
            subject: "3sg", nounClass: "zero", animacy: "animate",
        }),
        {
            referenceId: "third",
            subjectReferenceId: "third",
            sourceStem: "tlācatl",
        },
    );
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "sentence:supplementation",
        outputKind: "scalar",
        args: [{
            operationKind: "relation",
            principalClause: principal,
            supplementClause: supplement,
            options: {
                referenceMode: "shared",
                headRole: "subject",
                supplementContactRole: "subject",
                order: "principal-first",
            },
        }],
    }).canonicalResult;
}

function issueCompound(ctx) {
    return ctx.requestClassicalNominalConstructionResult({
        constructionKind: "compound-nnc",
        source: {
            embedStem: "ā",
            embedClass: "tl",
            matrixStem: "cal",
            matrixClass: "tli",
        },
        structure: "integrated",
        embedRole: "association",
        possessorOrientation: "matrix",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
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

function run(ctx = {}) {
    const s = createSuite("classical_lesson42_jobs");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson42-review-plan.json"), "utf8"));
    const field = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((name, index) => [name, index]),
    );
    const atoms = atomLedger.atoms.filter(atom => (
        /^§42(?:\.|$)/u.test(atom[field.canvasSection])
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
    const groupBySection = new Map(plan.groups.flatMap(group => (
        group.sections.map(section => [section, group])
    )));

    const head = issueNnc(ctx, "cueitl");
    const modifier = issueNnc(ctx, "canahuac");
    const ordinary = modify(ctx, head, modifier);
    const preposed = modify(ctx, head, modifier, {
        order: "modifier-head-preposed",
    });
    const markedPreposed = modify(ctx, head, modifier, {
        order: "modifier-head-preposed",
        adjunctor: "in",
    });
    const recursive = modify(ctx, ordinary, issueNnc(ctx, "tlazohtli"));
    const transitiveObject = modify(ctx, head, issueVnc(ctx), {
        linkRole: "vnc-object",
    });
    const supplementationModifier = modify(
        ctx,
        head,
        issueSupplementation(ctx),
    );
    const compoundHead = issueCompound(ctx);
    const compoundMatrix = modify(ctx, compoundHead, modifier, {
        compoundHeadTarget: "compound-matrix",
    });
    const compoundWhole = modify(ctx, compoundHead, modifier, {
        compoundHeadTarget: "compound-whole",
    });
    const pronominalHead = modify(
        ctx,
        issuePronominal(ctx, "yeh"),
        issueNnc(ctx, "mich"),
    );
    const cardinalHead = modify(
        ctx,
        issueCardinal(ctx),
        issueNnc(ctx, "mich"),
        { adjunctor: "in" },
    );
    const cardinalModifier = modify(
        ctx,
        issueNnc(ctx, "xihuitl", "zero", "3common"),
        issueCardinal(ctx),
    );

    const incorporationHead = issueNnc(ctx, "mich", "in");
    const incorporationModifier = issueNnc(ctx, "cal", "tli");
    const lexicalizedModification = modify(
        ctx,
        incorporationHead,
        incorporationModifier,
        { order: "modifier-head-preposed" },
    );
    const incorporationAnalysis =
        ctx.buildClassicalNahuatlAdjectivalModificationIncorporationAnalysis({
            sequenceStatus: "lexicalized-concatenate",
        });
    const incorporationFrame =
        ctx.projectClassicalNahuatlAdjectivalModificationForIncorporation(
            lexicalizedModification,
            incorporationAnalysis,
        );
    const incorporatedCompound =
        ctx.evaluateClassicalNahuatlNominalConstruction({
            constructionKind: "compound-nnc",
            structure: "integrated",
            embedRole: "association",
            possessorOrientation: "matrix",
            subject: "3sg",
            state: "absolutive",
            animacy: "animate",
            source: {
                embedStem: incorporationFrame.incorporatedStem,
                embedClass: "zero",
                matrixStem: "tēn",
                matrixClass: "tli",
                embedConstituent: {
                    kind: "adjectival-modification",
                    stem: incorporationFrame.incorporatedStem,
                    resultFrame: lexicalizedModification,
                    bridgeFrame: incorporationFrame,
                },
            },
        });
    const copiedResultCompound =
        ctx.evaluateClassicalNahuatlNominalConstruction({
            constructionKind: "compound-nnc",
            source: {
                embedStem: incorporationFrame.incorporatedStem,
                embedClass: "zero",
                matrixStem: "tēn",
                matrixClass: "tli",
                embedConstituent: {
                    kind: "adjectival-modification",
                    stem: incorporationFrame.incorporatedStem,
                    resultFrame: { ...lexicalizedModification },
                    bridgeFrame: incorporationAnalysis,
                },
            },
        });

    const proofByGroup = new Map([
        ["lesson42-multiple-nucleus-rank-reversal",
            ordinary.authorizationStatus === "authorized"
            && ordinary.derived.headRank === "principal"
            && ordinary.derived.modifierRank === "adjoined"
            && ordinary.selectedClauses.length === 2],
        ["lesson42-preposed-and-unit-scope",
            preposed.authorizationStatus === "authorized"
            && preposed.linearizationTokens[0].clause.role === "modifier"
            && markedPreposed.derived.compositionScope === "adjoined-unit"],
        ["lesson42-supplementation-modification-ambiguity",
            supplementationModifier.authorizationStatus === "authorized"
            && supplementationModifier.derived.modifierClauseType
                === "supplementation-structure"],
        ["lesson42-compound-head-target",
            compoundMatrix.authorizationStatus === "authorized"
            && compoundWhole.authorizationStatus === "authorized"
            && compoundMatrix.selection.compoundHeadTarget
                === "compound-matrix"
            && compoundWhole.selection.compoundHeadTarget
                === "compound-whole"],
        ["lesson42-vnc-modifiers-and-reference-contact",
            transitiveObject.authorizationStatus === "authorized"
            && transitiveObject.selection.linkRole === "vnc-object"],
        ["lesson42-nnc-modifier-type-lattice",
            [pronominalHead, cardinalHead, cardinalModifier,
                supplementationModifier].every(result => (
                result.authorizationStatus === "authorized"
            ))],
        ["lesson42-recursive-modification",
            recursive.authorizationStatus === "authorized"
            && recursive.derived.recursionDepth === "one-or-more"
            && recursive.selectedClauses[0].sourceResult === ordinary],
        ["lesson42-incorporated-modification-structure",
            incorporatedCompound.authorizationStatus === "authorized"
            && incorporationFrame.modifierPart.stem === "calli"
            && incorporationFrame.headPart.stem === "mich"
            && incorporationFrame.modifierNumberDyadPreserved === true
            && incorporationFrame.headNumberDyadDeleted === true
            && incorporatedCompound.operationFrame
                .adjectivalModificationIncorporationFrame
                === incorporationFrame
            && incorporatedCompound.operationFrame.compoundStem
                === "calli-mich-tēn"
            && copiedResultCompound.authorizationStatus === "blocked"],
    ]);

    s.eq("Lesson 42 maps every atom to eight technical proof coordinates", {
        atoms: atoms.length,
        writing: writing.length,
        groups: plan.groups.length,
        mapped: atoms.every(atom => (
            groupBySection.has(atom[field.canvasSection])
        )),
        exactGroups: [...proofByGroup.values()].filter(Boolean).length,
        newLesson42Engine:
            typeof ctx.evaluateClassicalNahuatlLesson42Grammar,
    }, {
        atoms: 383,
        writing: 199,
        groups: 8,
        mapped: true,
        exactGroups: 8,
        newLesson42Engine: "undefined",
    });

    for (const group of plan.groups) {
        s.ok(
            `Lesson 42 ${group.groupId} is exactly observed`,
            proofByGroup.get(group.groupId) === true,
        );
    }

    s.ok(
        "Lesson 42 technical proof never promotes Canvas examples, formulas, or copied Results to authority",
        incorporationAnalysis.CanvasExampleMembershipRequired === false
        && incorporationAnalysis.grammarAuthority === false
        && incorporationFrame.formulaStringAuthority === false
        && incorporationFrame.surfaceStringAuthority === false
        && copiedResultCompound.authorizationStatus === "blocked",
    );

    return s;
}

module.exports = { run };
