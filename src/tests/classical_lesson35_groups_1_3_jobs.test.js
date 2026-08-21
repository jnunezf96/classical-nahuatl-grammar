"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson35-nominalization-and-preterit-agentive-foundation",
    "lesson35-absolutive-preterit-agentive-reanalysis",
    "lesson35-number-animacy-and-object-activation",
];

function request(sourceStem, overrides = {}) {
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

function buildVnc(ctx, tense = "preterit", sourceStem = "nemi") {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense,
        requestedDerivation: "direct",
        requestedVoice: "active",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson35_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson35-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = input => ctx.evaluateClassicalNahuatlDeverbalNnc(input);

    const preteritVnc = buildVnc(ctx);
    const capture = ctx.captureClassicalNahuatlPreteritVncResultForNominalization(
        preteritVnc.resultFrame
    );
    const capturedAgentive = evaluate({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        canonicalVncResult: preteritVnc.resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
    const capturedPossessive = evaluate({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        canonicalVncResult: preteritVnc.resultFrame,
        subject: "3sg",
        state: "possessive",
        possessor: "1sg",
        animacy: "animate",
    });
    s.eq("an exact preterit VNC Result becomes the typed agentive Source", {
        vnc: [preteritVnc.authorizationStatus,
            preteritVnc.resultFrame.formulaRealization],
        capture: [capture.authorizationStatus, capture.sourceStem,
            capture.morphologicalTense,
            capture.canonicalVncResult === preteritVnc.resultFrame,
            ctx.isClassicalNahuatlPreteritVncNominalizationCaptureFrame(capture)],
        restricted: [capturedAgentive.authorizationStatus,
            capturedAgentive.sourceFrame.sourceCapturedFromExactVncResult,
            capturedAgentive.operationFrame.targetStems.restrictedUse,
            capturedAgentive.formulaRealization],
        general: [capturedPossessive.authorizationStatus,
            capturedPossessive.operationFrame.targetStems.generalUse,
            capturedPossessive.formulaRealization],
    }, {
        vnc: ["authorized", "#0-0(nen)0+⎕-0#"],
        capture: ["authorized", "nen", "preterit", true, true],
        restricted: ["authorized", true, "nen-0", "#0-0(nen-0)qui-0#"],
        general: ["authorized", "nen-0-cā", "#0-0+n-o(nen-0-cā)uh-0#"],
    });

    const presentVnc = buildVnc(ctx, "present");
    const hostileCaptures = [
        evaluate({
            constructionKind: "predicate-nominalization",
            nominalizationKind: "preterit-agentive",
            canonicalVncResult: { ...preteritVnc.resultFrame },
            subject: "3sg", state: "absolutive", animacy: "animate",
        }),
        evaluate({
            constructionKind: "predicate-nominalization",
            nominalizationKind: "preterit-agentive",
            canonicalVncResult: JSON.parse(JSON.stringify(
                preteritVnc.resultFrame
            )),
            subject: "3sg", state: "absolutive", animacy: "animate",
        }),
        evaluate({
            constructionKind: "predicate-nominalization",
            nominalizationKind: "preterit-agentive",
            canonicalVncResult: presentVnc.resultFrame,
            subject: "3sg", state: "absolutive", animacy: "animate",
        }),
    ];
    s.eq("copied, JSON, and non-preterit VNC Results fail closed", {
        statuses: hostileCaptures.map(frame => frame.authorizationStatus),
        reasons: hostileCaptures.map(frame => frame.blockReason),
    }, {
        statuses: ["blocked", "blocked", "blocked"],
        reasons: [
            "exact-owner-issued-vnc-result-required",
            "exact-owner-issued-vnc-result-required",
            "preterit-vnc-result-required",
        ],
    });

    const classGrid = [
        request("maca", { source: { verbClass: "A" } }),
        request("pix", { source: { verbClass: "B" } }),
        request("tēmō", { source: { verbClass: "C" } }),
        request("calaqu", { source: { verbClass: "D" } }),
    ].map(evaluate);
    const projective = evaluate(request("mah-mat", {
        source: {
            sourceValence: "single-object",
            sourceObjectPattern: "nonspecific-nonhuman",
        },
    }));
    const reflexive = evaluate(request("mat", {
        source: {
            sourceValence: "single-object",
            sourceObjectPattern: "reflexive",
        },
    }));
    const plural = evaluate(request("pix", { subject: "3pl" }));
    s.eq("reanalysis is productive across class, object, reflexive, and number shapes", {
        classStatuses: classGrid.map(frame => frame.authorizationStatus),
        classFormulas: classGrid.map(frame => frame.formulaRealization),
        projective: [projective.operationFrame.targetStems.restrictedUse,
            projective.formulaRealization],
        reflexive: [reflexive.operationFrame.targetStems.restrictedUse,
            reflexive.formulaRealization],
        plural: [plural.operationFrame.targetStems.restrictedUse,
            plural.formulaRealization],
    }, {
        classStatuses: ["authorized", "authorized", "authorized", "authorized"],
        classFormulas: [
            "#0-0(maca-0)c-0#",
            "#0-0(pix-0)qui-0#",
            "#0-0(tēmō-0)qui-0#",
            "#0-0(calaqu-0)qui-0#",
        ],
        projective: ["tla-mah-mat-0", "#0-0(tla-mah-mat-0)qui-0#"],
        reflexive: ["m-o-mat-0", "#0-0(m-o-mat-0)qui-0#"],
        plural: ["pix-0", "#0-0(pix-0)qu-eh#"],
    });

    const requiredAffinity = evaluate(request("mic", { subject: "3pl" }));
    const optionalPlain = evaluate(request("tt-a", { subject: "3pl" }));
    const optionalAffinity = evaluate(request("tt-a", {
        subject: "3pl", affinity: true,
    }));
    const illicitAffinity = evaluate(request("zom", {
        subject: "3pl", affinity: true,
    }));
    s.eq("affinity is automatic, optional, or blocked only from typed facts", {
        required: [requiredAffinity.operationFrame.affinityFrame.requirement,
            requiredAffinity.operationFrame.affinityFrame.selectedChoice,
            requiredAffinity.operationFrame.affinityFrame.appliedAutomatically,
            requiredAffinity.formulaRealization],
        optional: [optionalPlain.operationFrame.affinityFrame.choiceRequired,
            optionalPlain.formulaRealization, optionalAffinity.formulaRealization],
        illicit: [illicitAffinity.authorizationStatus,
            illicitAffinity.blockReason],
    }, {
        required: ["plural-required", "affinity", true,
            "#0-0(mī-mic-0)qu-eh#"],
        optional: [true, "#0-0(tt-a-0)qu-eh#",
            "#0-0(tt-ā-tt-a-0)qu-eh#"],
        illicit: ["blocked", "35.3-affinity-plural-lexical-license-required"],
    });

    const numberAnimate = evaluate(request("izcal-i-h", {
        numberConnector: "qui", animacy: "animate",
    }));
    const numberNonanimate = evaluate(request("izcal-i-h", {
        numberConnector: "silent", animacy: "nonanimate",
    }));
    const numberMismatch = evaluate(request("izcal-i-h", {
        numberConnector: "qui", animacy: "nonanimate",
    }));
    const unlistedSameGrammar = ["zom", "tep"].map(stem => evaluate(
        request(stem, { animacy: "nonanimate" })
    ));
    s.eq("number and animacy use lexical alternatives without becoming route gates", {
        animate: [numberAnimate.authorizationStatus,
            numberAnimate.operationFrame.numberAnimacyFrame
                .availableSingularConnectors,
            numberAnimate.formulaRealization],
        nonanimate: [numberNonanimate.authorizationStatus,
            numberNonanimate.operationFrame.numberAnimacyFrame
                .silentNonanimateTendencyIsUniversal,
            numberNonanimate.formulaRealization],
        mismatch: [numberMismatch.authorizationStatus,
            numberMismatch.blockReason],
        unlisted: unlistedSameGrammar.map(frame => [
            frame.authorizationStatus,
            frame.operationFrame.numberAnimacyFrame.exampleStemMembershipRequired,
        ]),
    }, {
        animate: ["authorized", ["qui", "silent"],
            "#0-0(izcal-i-h-0)qui-0#"],
        nonanimate: ["authorized", false,
            "#0-0(izcal-i-h-0)⎕-0#"],
        mismatch: ["blocked", "35.4-agentive-number-and-animacy-analysis-mismatch"],
        unlisted: [["authorized", false], ["authorized", false]],
    });

    const activationBase = request("mah-mat", {
        source: {
            sourceValence: "single-object",
            sourceObjectPattern: "nonspecific-nonhuman",
        },
        activatedObjectPerson: "3sg",
    });
    const freeActivation = evaluate(activationBase);
    const licensedActivation = evaluate({
        ...activationBase,
        supplementaryObjectRelation: "supplementary-object",
        supplementaryObjectReferentId: "referent:food",
    });
    s.eq("object activation requires a typed supplementary-object relation", {
        free: [freeActivation.authorizationStatus, freeActivation.blockReason],
        licensed: [licensedActivation.authorizationStatus,
            licensedActivation.operationFrame.activationLicenseFrame,
            licensedActivation.operationFrame.targetStems.restrictedUse,
            licensedActivation.formulaRealization],
    }, {
        free: ["blocked",
            "35.4-or-36.2-typed-projective-object-activation-license-required"],
        licensed: ["authorized", {
            kind: "classical-nahuatl-agentive-object-activation-license-frame",
            version: 1,
            authorizationStatus: "authorized",
            sourceObjectPattern: "nonspecific-nonhuman",
            sourceCarrier: "tla",
            targetObjectPerson: "3sg",
            targetRelation: "supplementary-object",
            targetReferentId: "referent:food",
            destination: "specific-projective-object-outside-nominalized-predicate",
            hybridStructure: true,
            freeObjectMovementAllowed: false,
            participantFactsValidated: true,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        }, "mah-mat-0", "#0-0+qui-0(mah-mat-0)qui-0#"],
    });

    const cueFrames = [capturedAgentive, requiredAffinity,
        numberAnimate, numberNonanimate, licensedActivation];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
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
    }, { records: 273, writing: 159, readingOnly: 114,
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
    s.ok("the interface exposes only the genuinely licensed Lesson 35 choices",
        shell.includes('id="classical-deverbal-nnc-number-connector"')
        && shell.includes('id="classical-deverbal-nnc-affinity"')
        && shell.includes("Supplementary object activation")
        && rendering.includes("ownerValues.length > 1")
        && rendering.includes('supplementaryObjectRelation: "supplementary-object"')
        && !shell.includes('id="classical-deverbal-manual-preterit-zero"')
        && !shell.includes('id="classical-deverbal-example-stem"'));
    return s;
}

module.exports = { run };
