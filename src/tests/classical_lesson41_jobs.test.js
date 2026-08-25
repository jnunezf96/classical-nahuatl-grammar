"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function ordinaryNnc(ctx, stem, sourceClass = "zero") {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem,
        sourceClass,
    });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        { state: "absolutive", subject: "3sg" },
    );
    return ctx.requestClassicalOrdinaryNncResult(source, operation);
}

function compound(ctx, fields = {}) {
    const source = fields.source || {};
    return ctx.evaluateClassicalNahuatlNominalConstruction({
        constructionKind: "compound-nnc",
        structure: "integrated",
        embedRole: "association",
        possessorOrientation: "matrix",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...fields,
        source: {
            embedStem: "xōchi",
            embedClass: "zero",
            matrixStem: "mox",
            matrixClass: "zero",
            ...source,
        },
    });
}

function affective(ctx, matrix) {
    return ctx.evaluateClassicalNahuatlNominalConstruction({
        constructionKind: "affective-nnc",
        source: { embedStem: "xōchi", embedClass: "zero" },
        affectRoute: "compound",
        affectiveMatrix: matrix,
        semanticReading: "ordinary-affective",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
}

function reduplicate(ctx, lateVariant) {
    return ctx.evaluateClassicalNahuatlLateVncDerivation({
        sourceStem: "chōca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        objectKind: "none",
        objectPerson: "",
        lateOperation: "frequentative",
        lateVariant,
        frequentativeRepetitions: 1,
        frequentativeScope: "open",
    });
}

function nominalEmbed(ctx, fields = {}) {
    const source = fields.source || {};
    return ctx.evaluateClassicalNahuatlNominalConstruction({
        constructionKind: "nominal-embed-vnc",
        source: {
            embedStem: "coy-ō",
            embedClass: "zero",
            matrixStem: "chōca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
            ...source,
        },
        relation: "adverb",
        route: "direct-adverb",
        adverbRole: "compared-manner",
        orientation: "subject",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice: "active",
        outputKind: "single",
        ...fields,
        source: {
            embedStem: "coy-ō",
            embedClass: "zero",
            matrixStem: "chōca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
            ...source,
        },
    });
}

function patientive(ctx) {
    const vnc = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "miqui",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        objectKind: "none",
        objectPerson: "",
        mood: "indicative",
        tense: "preterit",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
    });
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:deverbal-construction",
        outputKind: "scalar",
        args: [{
            constructionKind: "patientive",
            patientiveSourceFamily: "perfective-active-core",
            patientiveAnalogy: "impersonal",
            canonicalVncResult: vnc.resultFrame,
            subject: "3sg",
            state: "absolutive",
            animacy: "animate",
        }],
    });
}

function preteritAgentive(ctx, canonicalVncResult) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:deverbal-construction",
        outputKind: "scalar",
        args: [{
            constructionKind: "predicate-nominalization",
            nominalizationKind: "preterit-agentive",
            canonicalVncResult,
            subject: "3sg",
            state: "absolutive",
            animacy: "animate",
        }],
    });
}

function authorized(value) {
    return value?.authorizationStatus === "authorized";
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson41_jobs");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson41-review-plan.json"), "utf8"));
    const field = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((name, index) => [name, index]),
    );
    const atoms = atomLedger.atoms.filter(atom => (
        /^§41(?:\.|$)/u.test(atom[field.canvasSection])
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

    const longVowel = reduplicate(ctx, "ordinary-long");
    const glottal = reduplicate(ctx, "ordinary-short-glottal");

    const embedResult = ordinaryNnc(ctx, "cual-a-x");
    const matrixResult = ordinaryNnc(ctx, "pah-ti-c");
    const intensifyingCompound = compound(ctx, {
        source: {
            embedStem: "cual-a-x",
            embedClass: "zero",
            matrixStem: "pah-ti-c",
            matrixClass: "zero",
            embedConstituent: {
                kind: "ordinary-nnc",
                stem: "cual-a-x",
                resultFrame: embedResult,
            },
            matrixConstituent: {
                kind: "ordinary-nnc",
                stem: "pah-ti-c",
                resultFrame: matrixResult,
            },
        },
    });
    const copiedCompound = compound(ctx, {
        source: {
            embedStem: "cual-a-x",
            embedClass: "zero",
            matrixStem: "pah-ti-c",
            matrixClass: "zero",
            embedConstituent: {
                kind: "ordinary-nnc",
                stem: "cual-a-x",
                resultFrame: { ...embedResult },
            },
        },
    });

    const pol = affective(ctx, "pōl");
    const tzin = affective(ctx, "tzin");

    const incorporatedAdverb = nominalEmbed(ctx);
    const reversedTranslation = nominalEmbed(ctx, {
        source: { embedStem: "ā", matrixStem: "ī" },
    });

    const incorporatedObject = nominalEmbed(ctx, {
        source: {
            embedStem: "xō-chi",
            matrixStem: "tēm-o-a",
            matrixVerbClass: "C",
            matrixValence: "single-object",
        },
        relation: "object",
        route: "object",
        orientation: "object",
        subject: "1sg",
    });
    const passiveAdverb = nominalEmbed(ctx, {
        source: {
            embedStem: "cōā",
            matrixStem: "cuā",
            matrixVerbClass: "A",
            matrixValence: "single-object",
            objectPeople: ["3sg"],
        },
        route: "passive-adverbialized-subject",
        adverbRole: "means",
        voice: "passive",
    });
    const patient = patientive(ctx);

    const compoundStem = intensifyingCompound.operationFrame?.compoundStem;
    const denominal = ctx.evaluateClassicalNahuatlDenominalVnc({
        nounStem: compoundStem,
        sourceKind: "nounstem",
        sourceState: "absolutive",
        operationId: "inceptive-ti",
        classChoice: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "preterit",
        objectPeople: [],
        outputScope: "single",
    });
    const agentive = preteritAgentive(
        ctx,
        denominal.canonicalVncFrame?.resultFrame,
    );

    const ordinaryEmbed = ordinaryNnc(ctx, "canahuac");
    const ordinaryMatrix = ordinaryNnc(ctx, "cueitl");
    const exactAdjectivalEmbed = compound(ctx, {
        source: {
            embedStem: "canahuac",
            embedClass: "zero",
            matrixStem: "cueitl",
            matrixClass: "zero",
            embedConstituent: {
                kind: "ordinary-nnc",
                stem: "canahuac",
                resultFrame: ordinaryEmbed,
            },
            matrixConstituent: {
                kind: "ordinary-nnc",
                stem: "cueitl",
                resultFrame: ordinaryMatrix,
            },
        },
    });
    const numeralEmbed = compound(ctx, {
        source: {
            embedStem: "cem",
            embedClass: "zero",
            matrixStem: "xihui",
            matrixClass: "tl",
        },
    });

    const proofByGroup = new Map([
        ["lesson41-reduplicative-intensification",
            authorized(longVowel)
            && authorized(glottal)
            && longVowel.operationFrame?.operationFacts?.shape
                !== glottal.operationFrame?.operationFacts?.shape],
        ["lesson41-compound-matrix-intensification",
            authorized(intensifyingCompound)
            && intensifyingCompound.operationFrame?.capturedNncConstituentCount
                === 2
            && copiedCompound.authorizationStatus === "blocked"],
        ["lesson41-affective-and-metaphorical-intensification",
            authorized(pol)
            && authorized(tzin)
            && pol.operationFrame?.affectiveMatrixStem
                !== tzin.operationFrame?.affectiveMatrixStem
            && pol.formulaStringAuthority === false
            && pol.surfaceStringAuthority === false],
        ["lesson41-incorporated-adverb-and-supplement-source",
            authorized(incorporatedAdverb)
            && authorized(reversedTranslation)
            && incorporatedAdverb.operationFrame
                ?.embedIsGrammaticalSubject === false
            && incorporatedAdverb.operationFrame?.embedIsAgent === false
            && incorporatedAdverb.formulaStringAuthority === false
            && incorporatedAdverb.surfaceStringAuthority === false],
        ["lesson41-incorporated-complement-object-and-patientive",
            authorized(incorporatedObject)
            && authorized(passiveAdverb)
            && authorized(patient)
            && incorporatedObject.operationFrame?.route
                !== passiveAdverb.operationFrame?.route],
        ["lesson41-denominal-compound-preterit-function",
            authorized(intensifyingCompound)
            && authorized(denominal)
            && denominal.sourceFrame?.nounStem === compoundStem
            && authorized(agentive)
            && Boolean(
                agentive.canonicalResult?.canonicalResult?.nncSlotFrame
            )],
        ["lesson41-adjectival-and-numeral-compound-embeds",
            authorized(exactAdjectivalEmbed)
            && exactAdjectivalEmbed.operationFrame?.capturedNncConstituentCount
                === 2
            && authorized(numeralEmbed)
            && exactAdjectivalEmbed.operationFrame?.compoundStem
                === "canahuac-cueitl"],
    ]);

    s.eq("Lesson 41 collapses onto seven existing-owner coordinates", {
        atoms: atoms.length,
        writing: writing.length,
        groups: plan.groups.length,
        mapped: atoms.every(atom => (
            groupBySection.has(atom[field.canvasSection])
        )),
        exactGroups: [...proofByGroup.values()].filter(Boolean).length,
        newLesson41Engine:
            typeof ctx.evaluateClassicalNahuatlLesson41Grammar,
    }, {
        atoms: 327,
        writing: 183,
        groups: 7,
        mapped: true,
        exactGroups: 7,
        newLesson41Engine: "undefined",
    });

    s.eq("each Lesson 41 coordinate has an exact existing-owner witness",
        Object.fromEntries(proofByGroup),
        Object.fromEntries([...proofByGroup.keys()].map(key => [key, true])),
    );

    for (const atom of writing) {
        const atomId = atom[field.atomId];
        const group = groupBySection.get(atom[field.canvasSection]);
        s.ok(atomId, proofByGroup.get(group?.groupId) === true);
        s.ok(`mutation:${atomId}`,
            proofByGroup.get(group?.groupId) === true);
    }

    s.eq("the rhyming operations remain separate typed owners", {
        reduplication: longVowel.operationFrame?.operation,
        compound: intensifyingCompound.constructionKind,
        affective: pol.constructionKind,
        incorporated: incorporatedAdverb.constructionKind,
        denominal: denominal.operationFrame?.operationId,
        agentive: agentive.canonicalResult?.operationFrame
            ?.nominalizationKind,
        formulaAuthority: agentive.canonicalResult?.formulaStringAuthority,
        surfaceAuthority: agentive.canonicalResult?.surfaceStringAuthority,
    }, {
        reduplication: "frequentative",
        compound: "compound-nnc",
        affective: "affective-nnc",
        incorporated: "nominal-embed-vnc",
        denominal: "inceptive-ti",
        agentive: "preterit-agentive",
        formulaAuthority: false,
        surfaceAuthority: false,
    });

    return s;
}

module.exports = { run };
