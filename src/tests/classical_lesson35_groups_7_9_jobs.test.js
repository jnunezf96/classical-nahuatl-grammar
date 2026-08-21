"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson35-old-woman-agentive-family",
    "lesson35-old-man-and-drum-source-contrast",
    "lesson35-ownerhood-e-matrix",
];

function oldPersonRequest(sourceStem, subject = "3sg", overrides = {}) {
    return {
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        source: {
            sourceStage: "preterit-predicate",
            sourceStem,
            verbClass: "B",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: subject,
        },
        subject,
        state: "absolutive",
        animacy: "animate",
        ...overrides,
    };
}

function ownerhoodRequest(source, overrides = {}) {
    return {
        constructionKind: "ownerhood",
        source,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        numberConnector: "silent",
        ...overrides,
    };
}

function nominalCompoundRequest(embedStem) {
    return {
        constructionKind: "compound-nnc",
        source: {
            embedStem,
            embedClass: "tl",
            matrixStem: "tēō",
            matrixClass: "tl",
        },
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson35_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson35-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));
    const evaluate = request => ctx.evaluateClassicalNahuatlDeverbalNnc(request);
    const compose = request => ctx.evaluateClassicalNahuatlNominalConstruction(
        request);

    const oldWomanSingular = evaluate(oldPersonRequest("ilama-ti", "1sg"));
    const oldWomanPlural = evaluate(oldPersonRequest("ilama-ti", "1pl"));
    const oldWomanPossessive = evaluate(oldPersonRequest("ilama-ti", "1sg", {
        state: "possessive",
        possessor: "2sg",
    }));
    s.eq("old-woman agentives derive number-conditioned perfectives and cā", {
        statuses: [oldWomanSingular, oldWomanPlural, oldWomanPossessive]
            .map(frame => frame.authorizationStatus),
        restricted: [oldWomanSingular, oldWomanPlural]
            .map(frame => frame.operationFrame.targetStems.restrictedUse),
        general: oldWomanPossessive.operationFrame.targetStems.generalUse,
        formulas: [oldWomanSingular, oldWomanPlural, oldWomanPossessive]
            .map(frame => frame.formulaRealization),
        analysis: oldWomanSingular.operationFrame.oldPersonAnalysisFrame,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        restricted: ["ilama-h-0", "ilama-t-0"],
        general: "ilama-t-0-cā",
        formulas: [
            "#n-0(ilama-h-0)⎕-0#",
            "#t-0(ilama-t-0)qu-eh#",
            "#n-0+m-⎕(ilama-t-0-cā)uh-0#",
        ],
        analysis: {
            kind: "classical-nahuatl-lesson35-old-person-source-analysis-frame",
            version: 1,
            authorizationStatus: "authorized",
            family: "old-woman",
            sourceKind: "derived-verbstem",
            sourceStem: "ilama-ti",
            sourceMeaning: "become-an-old-woman",
            referentialAnimacy: "animate",
            referentialHumanness: "human",
            referentialSex: "female",
            perfectiveAlternants: ["ilama-t", "ilama-h"],
            selectedPerfectiveStem: "ilama-h",
            generalUsePerfectiveStem: "ilama-t",
            selectionCondition: "singular-or-common-subject",
            singularNumberRealization: "silent-zero",
            pluralNumberRealization: "qu-eh",
            generalUseMatrix: "cā",
            compatibleContinuations: ["possessive-state",
                "affective-compound", "characteristic-yo-compound"],
            relatedNominalSources: ["ilama/tl", "ilan/tli"],
            relatedNominalSourcesRemainDistinct: true,
            surfaceSimilarityDoesNotMergeSources: true,
            exampleStemMembershipAuthorizesProductiveRoute: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        },
    });

    const oldManSingular = evaluate(oldPersonRequest("huē-huē-ti", "1sg"));
    const oldManPlural = evaluate(oldPersonRequest("huē-huē-ti", "1pl"));
    s.eq("old-man agentives preserve quantity loss and the separate plural stem", {
        restricted: [oldManSingular, oldManPlural]
            .map(frame => frame.operationFrame.targetStems.restrictedUse),
        general: oldManSingular.operationFrame.targetStems.generalUse,
        formulas: [oldManSingular.formulaRealization,
            oldManPlural.formulaRealization],
        sex: oldManSingular.operationFrame.oldPersonAnalysisFrame
            .referentialSex,
    }, {
        restricted: ["huē-hue-h-0", "huē-huē-t-0"],
        general: "huē-huē-t-0-cā",
        formulas: ["#ni-0(huē-hue-h-0)⎕-0#",
            "#ti-0(huē-huē-t-0)qu-eh#"],
        sex: "male",
    });

    const nominalSources = ["huē-huē", "huē-hueh", "hueh",
        "huē-huē-n", "ilama", "ilan"].map(stem => compose(
        nominalCompoundRequest(stem)));
    const nominalFacts = nominalSources.map(frame => (
        frame.sourceAuthorizationFrame.lexicalFacts
            .lesson35OldPersonNominalSourceFrame
    ));
    s.eq("typed nominal Source shapes keep drum, old-man, big, and variants apart", {
        statuses: nominalSources.map(frame => frame.authorizationStatus),
        stems: nominalFacts.map(frame => frame.sourceStem),
        readings: nominalFacts.map(frame => frame.lexicalReading),
        kinds: nominalFacts.map(frame => frame.sourceKind),
        preteritContrast: nominalFacts[1].distinctFromPreteritAgentive,
        nVariant: [nominalFacts[3].affectiveMatrix,
            nominalFacts[3].affectiveReading],
        authority: nominalFacts.map(frame => frame.productiveRouteAuthority),
    }, {
        statuses: Array(6).fill("authorized"),
        stems: ["huē-huē", "huē-hueh", "hueh", "huē-huē-n",
            "ilama", "ilan"],
        readings: ["upright-drum", "old-man", "big", "old-man",
            "old-woman", "old-woman"],
        kinds: ["ordinary-nounstem", "embed-only-nounstem",
            "embed-only-nounstem", "ordinary-nounstem",
            "ordinary-nounstem", "ordinary-nounstem"],
        preteritContrast: "huē-hue-h-0",
        nVariant: ["tōn", "disparaging"],
        authority: Array(6).fill(false),
    });

    const oldManThird = evaluate(oldPersonRequest("huē-huē-ti", "3sg"));
    const oldManClause = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        oldManThird, {
            referenceId: "referent:old-god",
            subjectReferenceId: "referent:old-god",
        });
    const godResult = ctx.buildClassicalNahuatlAbsolutiveNncFrame("tēō", {
        subject: "3sg", nounClass: "tl", animacy: "animate",
    });
    const godClause = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        godResult, {
            referenceId: "referent:old-god",
            subjectReferenceId: "referent:old-god",
        });
    const doubleNucleus = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause: oldManClause,
        supplementClause: godClause,
        options: {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
        },
    });
    s.eq("double-nucleus old-man plus god stays distinct from one compound", {
        status: doubleNucleus.authorizationStatus,
        sameReferent: doubleNucleus.referenceFrame.referenceIdentityUnified,
        formula: doubleNucleus.linearizationFrame.formulaRealization,
        tokens: doubleNucleus.linearizationFrame.tokens,
        singleKind: nominalSources[1].constructionKind,
        singleSource: nominalFacts[1].sourceStem,
        preteritSource: oldManThird.operationFrame.targetStems.restrictedUse,
    }, {
        status: "authorized",
        sameReferent: true,
        formula: "#0-0(huē-hue-h-0)⎕-0# + #0-0(tēō)tl-0#",
        tokens: [{ role: "principal", surface: "huēhueh" },
            { role: "supplement", surface: "tēōtl" }],
        singleKind: "compound-nnc",
        singleSource: "huē-hueh",
        preteritSource: "huē-hue-h-0",
    });

    const productiveE = ["xōch", "tepē", "coyōl"].map(sourceStem => (
        evaluate(ownerhoodRequest({ sourceStem, nounClass: "tli",
            ownerhoodMatrix: "ē" }))
    ));
    s.eq("ē ownerhood is productive from typed class and edge shape", {
        statuses: productiveE.map(frame => frame.authorizationStatus),
        matrices: productiveE.map(frame => frame.operationFrame
            .ownerhoodSourceAnalysisFrame.matrixOptions),
        restricted: productiveE.map(frame => frame.operationFrame
            .targetStems.restrictedUse),
        examplesRequired: productiveE.map(frame => frame.operationFrame
            .ownerhoodSourceAnalysisFrame.exampleStemMembershipRequired),
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        matrices: [["ē"], ["ē"], ["ē"]],
        restricted: ["xōch-eh-0", "tepē-eh-0", "coyōl-eh-0"],
        examplesRequired: [false, false, false],
    });

    const supportiveI = evaluate(ownerhoodRequest({
        sourceStem: "māx-tli", nounClass: "tl", nounSubclass: "2-c",
        ownerhoodMatrix: "ē",
    }));
    const glottal = evaluate(ownerhoodRequest({
        sourceStem: "cuēh", nounClass: "tl", nounSubclass: "2-a-glottal",
        ownerhoodMatrix: "ē",
    }));
    const spelling = evaluate(ownerhoodRequest({
        sourceStem: "nacaz", nounClass: "tli", ownerhoodMatrix: "ē",
    }));
    s.eq("ē boundaries derive supportive-i loss, h-to-y, and z-to-c", {
        stems: [supportiveI, glottal, spelling].map(frame => (
            frame.operationFrame.targetStems.restrictedUse
        )),
        flags: [supportiveI, glottal, spelling].map(frame => ({
            i: frame.operationFrame.ownerhoodBoundaryFrame
                .supportiveFinalIDeletes,
            y: frame.operationFrame.ownerhoodBoundaryFrame
                .glottalizedFinalHMayBecomeY,
            c: frame.operationFrame.ownerhoodBoundaryFrame.finalZSpellsC,
        })),
    }, {
        stems: ["māx-tl-eh-0", "cuēy-eh-0", "nacac-eh-0"],
        flags: [{ i: true, y: false, c: false },
            { i: false, y: true, c: false },
            { i: false, y: false, c: true }],
    });

    const childE = evaluate(ownerhoodRequest({
        sourceStem: "pil", nounClass: "tli", ownerhoodMatrix: "ē",
    }));
    const childHua = evaluate(ownerhoodRequest({
        sourceStem: "pil", nounClass: "tli", ownerhoodMatrix: "huā",
    }));
    const bookE = evaluate(ownerhoodRequest({
        sourceStem: "āmox", nounClass: "tli", ownerhoodMatrix: "ē",
    }));
    const bookHua = evaluate(ownerhoodRequest({
        sourceStem: "āmox", nounClass: "tli", ownerhoodMatrix: "huā",
    }));
    s.eq("lexical exceptions and genuine ē-huā alternatives stay narrow", {
        child: [[childE.authorizationStatus, childE.blockReason],
            [childHua.authorizationStatus,
                childHua.operationFrame.ownerhoodMatrix]],
        books: [bookE, bookHua].map(frame => [
            frame.authorizationStatus,
            frame.operationFrame.ownerhoodSourceAnalysisFrame.matrixOptions,
            frame.operationFrame.ownerhoodSourceAnalysisFrame
                .matrixChoiceRequired,
        ]),
    }, {
        child: [["blocked",
            "35.9-ownerhood-matrix-not-licensed-for-typed-source-class"],
            ["authorized", "huā"]],
        books: [["authorized", ["ē", "huā"], true],
            ["authorized", ["ē", "huā"], true]],
    });

    const silentOwner = productiveE[0];
    const quiOwner = evaluate(ownerhoodRequest({
        sourceStem: "xōch", nounClass: "tli", ownerhoodMatrix: "ē",
    }, { numberConnector: "qui" }));
    s.eq("singular ownerhood keeps only the real silent-versus-qui choice", {
        formulas: [silentOwner.formulaRealization,
            quiOwner.formulaRealization],
        choices: quiOwner.operationFrame.singularConnectorOptions,
        preteritOnly: quiOwner.operationFrame.ownerhoodBoundaryFrame
            .preteritOnly,
        continuation: quiOwner.operationFrame.ownerhoodBoundaryFrame
            .finiteVncContinuation,
        general: quiOwner.operationFrame.targetStems.generalUse,
    }, {
        formulas: ["#0-0(xōch-eh-0)⎕-0#",
            "#0-0(xōch-eh-0)qui-0#"],
        choices: ["silent", "qui"],
        preteritOnly: true,
        continuation: "connective-t-only",
        general: "xōch-eh-0-cā",
    });

    const hostile = evaluate({
        ...ownerhoodRequest({ sourceStem: "xōch", nounClass: "tli",
            ownerhoodMatrix: "ē" }),
        formula: "#caller-supplied#",
    });
    const wrongClass = evaluate(ownerhoodRequest({
        sourceStem: "xōch", nounClass: "zero", ownerhoodMatrix: "ē",
    }));
    s.eq("display strings and wrong Source facts cannot authorize ownerhood", {
        hostile: [hostile.authorizationStatus, hostile.blockReason],
        wrongClass: [wrongClass.authorizationStatus, wrongClass.blockReason],
    }, {
        hostile: ["blocked",
            "caller-supplied-derived-authority-rejected:request.formula"],
        wrongClass: ["blocked",
            "35.9-ownerhood-matrix-not-licensed-for-typed-source-class"],
    });

    const cueFrames = [oldWomanSingular, oldWomanPlural,
        oldWomanPossessive, oldManSingular, oldManPlural, oldManThird,
        ...nominalSources, ...productiveE, supportiveI, glottal, spelling,
        childHua, bookE, bookHua, quiOwner];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame
                || frame.canonicalResult?.vncSlotFrame
                || frame.typedSlotFrame,
            frame,
        )
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all accepted writing atoms have exact owner and clickable-cue jobs", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
        cueGroups: new Set(cues.map(cue => cue.role)).size,
        covered: GROUPS.every(group => {
            const ids = writing.filter(record => record.reviewGroupId === group)
                .map(record => record.atomId);
            return cues.some(cue => cue.role === group
                && ids.every(id => cue.atomIds?.includes(id)));
        }),
    }, { records: 217, writing: 127, readingOnly: 90,
        groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.role === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted canonical observation`,
            Boolean(cue?.atomIds?.includes(record.atomId)));
        s.eq(`mutation:${record.atomId} loses exact credit when removed`,
            cue.atomIds.filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }

    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.ok("the interface exposes genuine ownerhood choices and derives availability",
        shell.includes('id="classical-deverbal-nnc-ownerhood-matrix"')
        && shell.includes('id="classical-deverbal-nnc-number-connector"')
        && rendering.includes("getClassicalNahuatlOwnerhoodSourceAnalysis")
        && rendering.includes("classicalOwnerDerivedAvailability")
        && !shell.includes('id="classical-ownerhood-supportive-i"')
        && !shell.includes('id="classical-ownerhood-h-to-y"')
        && !shell.includes('id="classical-ownerhood-final-zero"'));
    return s;
}

module.exports = { run };
