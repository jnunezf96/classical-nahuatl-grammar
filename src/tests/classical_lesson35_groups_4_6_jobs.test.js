"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson35-general-use-ca-stem",
    "lesson35-possessive-preterit-agentive-nnc",
    "lesson35-agentive-embeds-and-affectives",
];

function agentiveRequest(sourceStem, overrides = {}) {
    const sourceOverrides = overrides.source || {};
    const rest = { ...overrides };
    delete rest.source;
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
            sourceSubject: rest.subject || "3sg",
            ...sourceOverrides,
        },
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...rest,
    };
}

function agentiveConstituent(resultFrame, stem) {
    return {
        kind: "preterit-agentive-nnc",
        stem,
        resultFrame,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson35_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson35-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = input => ctx.evaluateClassicalNahuatlDeverbalNnc(input);
    const compose = input => ctx.evaluateClassicalNahuatlNominalConstruction(input);

    const ordinary = evaluate(agentiveRequest("zom", {
        state: "possessive", possessor: "1sg",
    }));
    const reflexive = evaluate(agentiveRequest("mat", {
        state: "possessive",
        possessor: "2sg",
        source: {
            sourceValence: "single-object",
            sourceObjectPattern: "reflexive",
        },
    }));
    const archaic = evaluate(agentiveRequest("mic", {
        preteritAgentiveVariant: "archaic-que",
    }));
    const unlicensedArchaic = evaluate(agentiveRequest("zom", {
        preteritAgentiveVariant: "archaic-que",
    }));
    s.eq("general-use cā is automatic and archaic quē stays lexical", {
        ordinary: [ordinary.authorizationStatus,
            ordinary.operationFrame.targetStems.generalUse,
            ordinary.operationFrame.semanticProfile.generalUseCompound],
        reflexive: [reflexive.operationFrame.targetStems.generalUse,
            reflexive.operationFrame.semanticProfile.generalUseCompound
                .reflexiveUsesShuntlineNe],
        archaic: [archaic.authorizationStatus,
            archaic.operationFrame.targetStems.generalUse,
            archaic.operationFrame.semanticProfile.generalUseCompound
                .archaicLexicalLicenseRequired],
        unlicensed: [unlicensedArchaic.authorizationStatus,
            unlicensedArchaic.blockReason],
    }, {
        ordinary: ["authorized", "zom-0-cā", {
            constructionKind: "compound",
            embedRole: "restricted-use",
            embedStem: "zom-0",
            matrixStem: "cā",
            matrixNounClass: "tl",
            matrixNounSubclass: "tl-1-a",
            outputStem: "zom-0-cā",
            relation: "restricted-use-embed-plus-ca-matrix",
            finalPreteritZeroImmediatelyBeforeMatrix: true,
            reflexiveUsesShuntlineNe: true,
            distribution: ["possessive-state-nnc", "adverbialized-nnc",
                "nominal-compound-embed", "verbal-compound-embed"],
            automaticForLicensedEnvironment: true,
            archaicLexicalLicenseRequired: false,
            satisfied: true,
        }],
        reflexive: ["ne-mat-0-cā", true],
        archaic: ["authorized", "mic-0-quē", true],
        unlicensed: ["blocked",
            "35.5-preterit-agentive-variant-not-lexically-authorized"],
    });

    const singular = ordinary;
    const plural = evaluate(agentiveRequest("zom", {
        subject: "3pl", state: "possessive", possessor: "1sg",
    }));
    const patientive = evaluate(agentiveRequest("tlahu-ēl-i-lō", {
        nominalizationKind: "preterit-patientive",
        state: "possessive",
        possessor: "2sg",
        source: { sourceVoice: "passive" },
    }));
    const caYo = evaluate(agentiveRequest("tla-ht-o-h", {
        subject: "3pl", state: "possessive", possessor: "3sg",
    }));
    const yauh = evaluate(agentiveRequest("yah", {
        preteritAgentiveVariant: "yauh-ti-owner",
        subject: "3pl", state: "possessive", possessor: "3sg",
    }));
    s.eq("possessive agentives derive number and keep typed participants", {
        singular: [singular.authorizationStatus,
            singular.operationFrame.possessiveAgentiveFrame,
            singular.formulaRealization],
        plural: [plural.operationFrame.possessiveAgentiveFrame.numberDyad,
            plural.formulaRealization],
        patientive: [patientive.authorizationStatus,
            patientive.operationFrame.possessiveAgentiveFrame
                .patientiveCounterpart],
        caYo: [caYo.authorizationStatus,
            caYo.operationFrame.targetStems.generalUse,
            caYo.operationFrame.possessiveAgentiveFrame.caYoMatrixIrregularity,
            caYo.operationFrame.semanticProfile.possessiveYoExtension],
        yauh: [yauh.authorizationStatus,
            yauh.operationFrame.targetStems.generalUse,
            yauh.operationFrame.possessiveAgentiveFrame
                .yauhInnerPossessorShift],
    }, {
        singular: ["authorized", {
            kind: "classical-nahuatl-possessive-preterit-agentive-frame",
            version: 1,
            authorizationStatus: "authorized",
            sourceStem: "zom-0-cā",
            sourceNounClass: "tl",
            sourceSubclass: "tl-1-a",
            subject: "3sg",
            possessor: "1sg",
            numberDyad: "uh-0",
            singularNumberDerivedAsUhZero: true,
            pluralNumberDerivedAsHuAn: false,
            cāInsertionIsUserChoice: false,
            numberDyadIsUserChoice: false,
            participantReferenceIsUserChoice: true,
            internalObjectPattern: "none",
            patientiveCounterpart: false,
            yauhInnerPossessorShift: false,
            caYoMatrixIrregularity: false,
            typedLexicalIrregularitiesOnly: true,
            exampleStemMembershipRequired: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        }, "#0-0+n-o(zom-0-cā)uh-0#"],
        plural: ["hu-ān", "#0-0+n-o(zom-0-cā)hu-ān#"],
        patientive: ["authorized", true],
        caYo: ["authorized", "tla-ht-o-h-0-cā-yō", true, {
            licensed: true,
            baseGeneralUse: "tla-ht-o-h-0-cā",
            matrixStem: "yō",
            outputStem: "tla-ht-o-h-0-cā-yō",
            lexicalLicenseRequired: true,
            generalizedFromExamples: false,
        }],
        yauh: ["authorized", "ti-yah-0-cā", true],
    });

    const agentive = evaluate(agentiveRequest("pix", {
        state: "possessive", possessor: "1sg",
    }));
    const generalStem = agentive.operationFrame.targetStems.generalUse;
    const constituent = agentiveConstituent(agentive, generalStem);
    const compound = compose({
        constructionKind: "compound-nnc",
        source: {
            embedStem: generalStem,
            embedClass: "tl-1-a",
            matrixStem: "cal",
            matrixClass: "tli",
            embedConstituent: constituent,
        },
        structure: "integrated",
        embedRole: "association",
        possessorOrientation: "matrix",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
    const verbal = compose({
        constructionKind: "nominal-embed-vnc",
        source: {
            embedStem: generalStem,
            embedClass: "tl",
            matrixStem: "chōca",
            matrixVerbClass: "A",
            matrixValence: "intransitive",
            embedConstituent: constituent,
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
    });
    const affective = compose({
        constructionKind: "affective-nnc",
        source: {
            embedStem: generalStem,
            embedClass: "tl",
            embedConstituent: constituent,
        },
        affectRoute: "compound",
        affectiveMatrix: "tzin",
        semanticReading: "honorific",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
    s.eq("one exact general-use Result enters all canonical compound owners", {
        statuses: [compound, verbal, affective]
            .map(frame => frame.authorizationStatus),
        reasons: [compound, verbal, affective]
            .map(frame => frame.blockReason),
        kinds: [compound, verbal, affective]
            .map(frame => frame.constructionKind),
        exact: [compound, verbal, affective].every(frame => (
            frame.sourceAuthorizationFrame.lexicalFacts
                .capturedEmbedResult === agentive
        )),
        classes: [compound, verbal, affective].map(frame => [
            frame.sourceAuthorizationFrame.lexicalFacts
                .capturedEmbedNounClass,
            frame.sourceAuthorizationFrame.lexicalFacts
                .capturedEmbedSourceClass,
            frame.sourceAuthorizationFrame.lexicalFacts
                .capturedEmbedSubclass,
        ]),
        formulas: [compound, verbal, affective]
            .map(frame => frame.formulaRealization),
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        reasons: ["", "", ""],
        kinds: ["compound-nnc", "nominal-embed-vnc", "affective-nnc"],
        exact: true,
        classes: [["tl", "tl-1-a", "tl-1-a"],
            ["tl", "tl-1-a", "tl-1-a"],
            ["tl", "tl-1-a", "tl-1-a"]],
        formulas: [compound.formulaRealization, verbal.formulaRealization,
            affective.formulaRealization],
    });

    const copied = { ...agentive };
    const hostile = [
        compose({
            constructionKind: "affective-nnc",
            source: { embedStem: generalStem, embedClass: "tl",
                embedConstituent: agentiveConstituent(null, generalStem) },
            affectRoute: "compound", affectiveMatrix: "tzin",
            semanticReading: "honorific", subject: "3sg",
            state: "absolutive", animacy: "animate",
        }),
        compose({
            constructionKind: "affective-nnc",
            source: { embedStem: generalStem, embedClass: "tl",
                embedConstituent: agentiveConstituent(copied, generalStem) },
            affectRoute: "compound", affectiveMatrix: "tzin",
            semanticReading: "honorific", subject: "3sg",
            state: "absolutive", animacy: "animate",
        }),
        compose({
            constructionKind: "affective-nnc",
            source: { embedStem: "zom-0-cā", embedClass: "tl",
                embedConstituent: agentiveConstituent(agentive,
                    "zom-0-cā") },
            affectRoute: "compound", affectiveMatrix: "tzin",
            semanticReading: "honorific", subject: "3sg",
            state: "absolutive", animacy: "animate",
        }),
    ];
    s.eq("missing, copied, and mismatched agentive Results fail closed", {
        statuses: hostile.map(frame => frame.authorizationStatus),
        reasons: hostile.map(frame => frame.blockReason),
    }, {
        statuses: ["blocked", "blocked", "blocked"],
        reasons: Array(3).fill("preterit-agentive-embed-constituent-mismatch"),
    });

    const hybridAgentive = evaluate(agentiveRequest("mat", {
        state: "possessive",
        possessor: "1sg",
        source: {
            sourceValence: "single-object",
            sourceObjectPattern: "nonspecific-nonhuman",
        },
        activatedObjectPerson: "3sg",
        supplementaryObjectRelation: "supplementary-object",
        supplementaryObjectReferentId: "referent:questioned-thing",
    }));
    const hybridStem = hybridAgentive.operationFrame.targetStems.generalUse;
    const hybridAffective = compose({
        constructionKind: "affective-nnc",
        source: {
            embedStem: hybridStem,
            embedClass: "tl",
            embedConstituent: agentiveConstituent(
                hybridAgentive,
                hybridStem,
            ),
        },
        affectRoute: "compound",
        affectiveMatrix: "tzin",
        semanticReading: "honorific",
        subject: "2sg",
        state: "absolutive",
        animacy: "animate",
    });
    s.eq("affective continuation preserves the licensed hybrid participant facts", {
        status: hybridAffective.authorizationStatus,
        exact: hybridAffective.sourceAuthorizationFrame.lexicalFacts
            .capturedEmbedResult === hybridAgentive,
        activation: hybridAffective.sourceAuthorizationFrame.lexicalFacts
            .capturedEmbedResult.operationFrame.activationLicenseFrame,
    }, {
        status: "authorized",
        exact: true,
        activation: {
            kind: "classical-nahuatl-agentive-object-activation-license-frame",
            version: 1,
            authorizationStatus: "authorized",
            sourceObjectPattern: "nonspecific-nonhuman",
            sourceCarrier: "tla",
            targetObjectPerson: "3sg",
            targetRelation: "supplementary-object",
            targetReferentId: "referent:questioned-thing",
            destination:
                "specific-projective-object-outside-nominalized-predicate",
            hybridStructure: true,
            freeObjectMovementAllowed: false,
            participantFactsValidated: true,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        },
    });

    const cueFrames = [ordinary, reflexive, archaic, singular, plural,
        patientive, caYo, yauh, compound, verbal, affective, hybridAffective];
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
    }, { records: 191, writing: 137, readingOnly: 54,
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
    s.ok("the interface reuses canonical Source-operation routes", [
        "compound-nnc", "nominal-embed-vnc", "affective-nnc",
    ].every(route => shell.includes(`value="${route}"`))
        && !shell.includes('id="classical-deverbal-general-use-ca"')
        && !shell.includes('id="classical-deverbal-final-zero-placement"')
        && !shell.includes('id="classical-deverbal-agentive-embed-string"'));
    return s;
}

module.exports = { run };
