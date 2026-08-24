"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson35-agentive-embeds-in-vncs",
    "lesson35-vocative-agentive-realization",
    "lesson35-double-nucleus-ownerhood-embed",
];

function agentiveRequest(sourceStem, verbClass = "B", overrides = {}) {
    const subject = overrides.subject || "3sg";
    return {
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        source: {
            sourceStage: "preterit-predicate",
            sourceStem,
            verbClass,
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

function agentiveConstituent(resultFrame) {
    return {
        kind: "preterit-agentive-nnc",
        stem: resultFrame.operationFrame.targetStems.generalUse,
        resultFrame,
    };
}

function verbalEmbedRequest(agentive, overrides = {}) {
    const generalStem = agentive.operationFrame.targetStems.generalUse;
    const sourceOverrides = overrides.source || {};
    const rest = { ...overrides };
    delete rest.source;
    return {
        constructionKind: "nominal-embed-vnc",
        source: {
            embedStem: generalStem,
            embedClass: "tl",
            matrixStem: "chōca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
            embedConstituent: agentiveConstituent(agentive),
            ...sourceOverrides,
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
        ...rest,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson35_groups_13_15_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson35-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = request => ctx.evaluateClassicalNahuatlDeverbalNnc(request);
    const compose = request => ctx.evaluateClassicalNahuatlNominalConstruction(
        request);

    const agentive = evaluate(agentiveRequest("pix", "B", {
        state: "possessive", possessor: "1sg",
    }));
    const subjectManner = compose(verbalEmbedRequest(agentive));
    const objectManner = compose(verbalEmbedRequest(agentive, {
        orientation: "object",
        source: { matrixStem: "itta", matrixValence: "single-object" },
    }));
    s.eq("an exact general-use agentive enters the canonical VNC owner", {
        statuses: [subjectManner, objectManner]
            .map(frame => frame.authorizationStatus),
        exact: [subjectManner, objectManner].every(frame => (
            frame.sourceAuthorizationFrame.lexicalFacts
                .capturedEmbedResult === agentive
        )),
        orientations: [subjectManner, objectManner]
            .map(frame => frame.operationFrame.orientation),
        roles: [subjectManner, objectManner]
            .map(frame => frame.operationFrame.semanticRole),
        boundaries: subjectManner.operationFrame.embedInternalBoundaries,
    }, {
        statuses: ["authorized", "authorized"],
        exact: true,
        orientations: ["subject", "object"],
        roles: ["compared-manner", "compared-manner"],
        boundaries: ["pix", "0", "cā"],
    });
    const copiedAgentive = { ...agentive };
    const copiedEmbed = compose(verbalEmbedRequest(copiedAgentive));
    s.eq("a copied agentive cannot authorize a VNC embed", {
        status: copiedEmbed.authorizationStatus,
        reason: copiedEmbed.blockReason,
    }, {
        status: "blocked",
        reason: "preterit-agentive-embed-constituent-mismatch",
    });

    const singularA = evaluate(agentiveRequest("pix", "A"));
    const singularB = evaluate(agentiveRequest("pix", "B"));
    const pluralA = evaluate(agentiveRequest("pix", "A", {
        subject: "3pl",
    }));
    const vocatives = [singularA, singularB, pluralA].map(frame => evaluate({
        constructionKind: "vocative",
        canonicalNncResult: frame.canonicalResult,
    }));
    s.eq("vocative realization reads the exact agentive number boundary", {
        statuses: vocatives.map(frame => frame.authorizationStatus),
        connectors: vocatives.map(frame => (
            frame.operationFrame.sourceNumberConnector
        )),
        rules: vocatives.map(frame => (
            frame.operationFrame.appliedSemanticRules[0]
        )),
        words: vocatives.map(frame => frame.wordSurface),
        exact: vocatives.every(frame => (
            frame.operationFrame.vocativeAgentiveCaptureFrame
                .exactResultIdentityPreserved
        )),
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        connectors: ["c", "qui", "qu-eh"],
        rules: ["35.13-class-a-c-to-qu-before-e",
            "35.13-qui-supportive-i-loss-before-e",
            "35.13-plural-qu-eh-preserved-before-e"],
        words: ["pixquē", "pixquē", "pixquehē"],
        exact: true,
    });
    const rawVocative = evaluate({
        constructionKind: "vocative",
        source: { wordStem: "pix", numberConnector: "c" },
    });
    const copiedVocative = evaluate({
        constructionKind: "vocative",
        canonicalNncResult: { ...singularA.canonicalResult },
    });
    s.eq("raw and copied words cannot authorize a vocative", {
        statuses: [rawVocative, copiedVocative]
            .map(frame => frame.authorizationStatus),
        reasons: [rawVocative, copiedVocative]
            .map(frame => frame.blockReason),
    }, {
        statuses: ["blocked", "blocked"],
        reasons: Array(2).fill(
            "35.13-exact-owner-issued-absolutive-preterit-agentive-result-required"),
    });

    const nucleusA = singularA.canonicalResult.nncSlotFrame;
    const nucleusB = pluralA.canonicalResult.nncSlotFrame;
    const doubleNucleus = evaluate({
        constructionKind: "double-nucleus-ownerhood",
        source: {
            principalNncFrame: nucleusA,
            supplementNncFrame: nucleusB,
            lexicalizedFixedOrder: true,
        },
        subject: "2sg",
        state: "absolutive",
    });
    const unlicensedPair = evaluate({
        constructionKind: "double-nucleus-ownerhood",
        source: {
            principalNncFrame: nucleusA,
            supplementNncFrame: nucleusB,
            lexicalizedFixedOrder: false,
        },
        subject: "2sg",
        state: "absolutive",
    });
    s.eq("a licensed double nucleus preserves exact internal frames", {
        status: doubleNucleus.authorizationStatus,
        fixed: doubleNucleus.sourceFrame.fixedOrder,
        relation: doubleNucleus.sourceFrame.supplementationRelation,
        exact: doubleNucleus.sourceFrame.principalNncFrame === nucleusA
            && doubleNucleus.sourceFrame.supplementNncFrame === nucleusB,
        internalSubjects: [
            doubleNucleus.sourceFrame.principalNncFrame.slots.subject.subject,
            doubleNucleus.sourceFrame.supplementNncFrame.slots.subject.subject,
        ],
        outerSubject: doubleNucleus.canonicalResult.subject,
        overwrite: doubleNucleus.sourceFrame
            .outerSubjectMayOverwriteInternalPersonPositions,
        unlicensed: [unlicensedPair.authorizationStatus,
            unlicensedPair.blockReason],
    }, {
        status: "authorized",
        fixed: true,
        relation: "lexicalized-fixed-order-double-nucleus",
        exact: true,
        internalSubjects: ["3sg", "3pl"],
        outerSubject: "2sg",
        overwrite: false,
        unlicensed: ["blocked",
            "35.14-typed-fixed-order-double-nucleus-source-required"],
    });

    const cueFrames = [subjectManner, objectManner, ...vocatives,
        doubleNucleus];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization || frame.wordSurface,
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
    }, { records: 236, writing: 152, readingOnly: 84,
        groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.role === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted canonical observation`,
            Boolean(cue?.atomIds?.includes(record.atomId)));
        s.eq(`mutation:${record.atomId} loses exact credit when removed`,
            (cue?.atomIds || []).filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }
    return s;
}

module.exports = { run };
