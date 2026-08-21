"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson36-customary-present-nominalization-foundation",
    "lesson36-customary-present-agentive-reanalysis",
    "lesson36-fully-nominal-customary-agentive",
];

function buildVnc(ctx, sourceStem = "mati", overrides = {}) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "customary-present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        ...overrides,
    });
}

function nominalize(ctx, resultFrame, nominalizationKind, overrides = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind,
        canonicalVncResult: resultFrame,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...overrides,
    });
}

function rawRequest(nominalizationKind, sourceStem, overrides = {}) {
    const sourceOverrides = overrides.source || {};
    const rest = { ...overrides };
    delete rest.source;
    return {
        constructionKind: "predicate-nominalization",
        nominalizationKind,
        source: {
            sourceStage: "customary-present-predicate",
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

function run(ctx = {}) {
    const s = createSuite("classical_lesson36_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson36-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const customaryVnc = buildVnc(ctx);
    const capture =
        ctx.captureClassicalNahuatlVncResultForPredicateNominalization(
            customaryVnc.resultFrame,
            "customary-agentive-reanalysis"
        );
    const reanalysis = nominalize(
        ctx,
        customaryVnc.resultFrame,
        "customary-agentive-reanalysis"
    );
    const full = nominalize(
        ctx,
        customaryVnc.resultFrame,
        "customary-agentive-full"
    );
    s.eq("the exact customary-present VNC Result supports both degrees", {
        vnc: customaryVnc.authorizationStatus,
        capture: [
            capture.authorizationStatus,
            capture.morphologicalTense,
            capture.sourceStage,
            capture.sourceStem,
            capture.canonicalVncResult === customaryVnc.resultFrame,
            ctx.isClassicalNahuatlPredicateNominalizationVncCaptureFrame(
                capture
            ),
        ],
        reanalysis: [
            reanalysis.authorizationStatus,
            reanalysis.sourceFrame.sourceCapturedFromExactVncResult,
            reanalysis.sourceFrame.canonicalVncResult
                === customaryVnc.resultFrame,
            reanalysis.operationFrame.targetStems,
            reanalysis.formulaRealization,
        ],
        full: [
            full.authorizationStatus,
            full.sourceFrame.sourceCapturedFromExactVncResult,
            full.sourceFrame.canonicalVncResult === customaryVnc.resultFrame,
            full.operationFrame.targetStems,
            full.formulaRealization,
        ],
    }, {
        vnc: "authorized",
        capture: ["authorized", "customary-present",
            "customary-present-predicate", "mati", true, true],
        reanalysis: ["authorized", true, true,
            { restrictedUse: "mati-ni", generalUse: "" },
            "#0-0(mati-ni)0-0#"],
        full: ["authorized", true, true,
            { restrictedUse: "mati-ni", generalUse: "mati-ni" },
            "#0-0(mati-ni)⎕-0#"],
    });

    const present = buildVnc(ctx, "mati", { tense: "present" });
    const hostile = [
        nominalize(ctx, { ...customaryVnc.resultFrame },
            "customary-agentive-reanalysis"),
        nominalize(ctx, JSON.parse(JSON.stringify(customaryVnc.resultFrame)),
            "customary-agentive-reanalysis"),
        nominalize(ctx, present.resultFrame,
            "customary-agentive-reanalysis"),
    ];
    s.eq("copied, JSON, and wrong-tense Results fail closed", {
        statuses: hostile.map(frame => frame.authorizationStatus),
        reasons: hostile.map(frame => frame.blockReason),
    }, {
        statuses: ["blocked", "blocked", "blocked"],
        reasons: [
            "exact-owner-issued-vnc-result-required",
            "exact-owner-issued-vnc-result-required",
            "customary-present-vnc-result-required",
        ],
    });

    const sourceShapes = [
        ["pah", "A"],
        ["pix", "B"],
        ["quihui", "D"],
        ["calaqui", "D"],
        ["chihua", "B"],
        ["māhui", "B"],
    ].map(([stem, verbClass]) => {
        const source = buildVnc(ctx, stem, { verbClass });
        return {
            source,
            result: source.authorizationStatus === "authorized"
                ? nominalize(ctx, source.resultFrame,
                    "customary-agentive-reanalysis")
                : null,
        };
    });
    s.eq("unlisted morphemic Source shapes use the same rule", {
        vncStatuses: sourceShapes.map(item => item.source.authorizationStatus),
        nncStatuses: sourceShapes.map(item => item.result?.authorizationStatus),
        finalNi: sourceShapes.map(item => (
            item.result?.operationFrame?.targetStems?.restrictedUse
                ?.endsWith("-ni")
        )),
        exactCapture: sourceShapes.map(item => (
            item.result?.sourceFrame?.sourceCapturedFromExactVncResult
        )),
        sourceUnits: sourceShapes.map(item => (
            item.result?.sourceFrame?.sourceUnit
        )),
        callerLexicalAuthority: sourceShapes.map(item => (
            item.result?.sourceFrame?.lexicalAuthorizationFrame
                ?.callerSuppliedLexicalAuthorityAccepted
        )),
    }, {
        vncStatuses: ["authorized", "authorized", "authorized",
            "authorized", "authorized", "authorized"],
        nncStatuses: ["authorized", "authorized", "authorized",
            "authorized", "authorized", "authorized"],
        finalNi: [true, true, true, true, true, true],
        exactCapture: [true, true, true, true, true, true],
        sourceUnits: ["owner-issued-vnc-result", "owner-issued-vnc-result",
            "owner-issued-vnc-result", "owner-issued-vnc-result",
            "owner-issued-vnc-result", "owner-issued-vnc-result"],
        callerLexicalAuthority: [false, false, false, false, false, false],
    });

    const projective = ctx.evaluateClassicalNahuatlDeverbalNnc(rawRequest(
        "customary-agentive-reanalysis",
        "mat",
        { source: {
            sourceValence: "single-object",
            sourceObjectPattern: "nonspecific-nonhuman",
        } }
    ));
    const reflexive = ctx.evaluateClassicalNahuatlDeverbalNnc(rawRequest(
        "customary-agentive-reanalysis",
        "mat",
        { subject: "2sg", source: {
            sourceValence: "single-object",
            sourceObjectPattern: "reflexive",
        } }
    ));
    s.eq("reanalysis preserves internal projective and reflexive structure", {
        projective: [projective.authorizationStatus,
            projective.operationFrame.targetStems.restrictedUse],
        reflexive: [reflexive.authorizationStatus,
            reflexive.operationFrame.targetStems.restrictedUse],
    }, {
        projective: ["authorized", "tla-mat-ni"],
        reflexive: ["authorized", "t-o-mat-ni"],
    });

    const pluralVnc = buildVnc(ctx, "mati", { subject: "2pl" });
    const pluralPreteritVnc = buildVnc(ctx, "mati", {
        subject: "2pl",
        tense: "preterit",
    });
    const absolutePlural = nominalize(
        ctx,
        pluralVnc.resultFrame,
        "customary-agentive-full",
        { subject: "2pl" }
    );
    const possessivePlural = nominalize(
        ctx,
        pluralVnc.resultFrame,
        "customary-agentive-full",
        { subject: "2pl", state: "possessive", possessor: "3pl",
            canonicalPreteritVncResult: pluralPreteritVnc.resultFrame }
    );
    s.eq("the fully nominal Source uses normal NNC state and number", {
        absolute: [absolutePlural.authorizationStatus,
            absolutePlural.operationFrame.nounClass,
            absolutePlural.operationFrame.allowedStates,
            absolutePlural.formulaRealization],
        possessive: [possessivePlural.authorizationStatus,
            possessivePlural.blockReason,
            possessivePlural.canonicalResult?.nncSlotFrame?.slots.subject.subject,
            possessivePlural.canonicalResult?.nncSlotFrame?.slots.state.slots[0]
                ?.possessorPerson,
            possessivePlural.formulaRealization],
        identity: [
            absolutePlural.sourceFrame.canonicalVncResult
                === pluralVnc.resultFrame,
            possessivePlural.sourceFrame.canonicalVncResult
                === pluralVnc.resultFrame,
        ],
    }, {
        absolute: ["authorized", "tl", ["absolutive", "possessive"],
            "#am-0(mati-ni)m-eh#"],
        possessive: ["authorized", "", "2pl", "3pl",
            "#am-0+ī-m(mat-0-cā)hu-ān#"],
        identity: [true, true],
    });

    const fullPlan = ctx.prepareClassicalDeverbalNncParadigmPlan({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "customary-agentive-full",
        canonicalVncResult: customaryVnc.resultFrame,
        canonicalPreteritVncResult: buildVnc(ctx, "mati", {
            tense: "preterit",
        }).resultFrame,
        subject: "3sg",
        state: "possessive",
        possessor: "3pl",
        animacy: "animate",
    });
    const fullCoordinates =
        ctx.projectClassicalDeverbalNncParadigmCoordinates(fullPlan);
    s.eq("the fully nominal route retains its exact VNC Result through the full paradigm", {
        plan: fullPlan.authorizationStatus,
        count: fullPlan.coordinateCount,
        projected: fullCoordinates.length,
        allAuthorized: fullCoordinates.every(frame => (
            frame.authorizationStatus === "authorized"
        )),
        allScalarEquivalent: fullCoordinates.every(frame => (
            frame.scalarEquivalent === true
        )),
        exactCapture: fullCoordinates.every(frame => (
            frame.scalarFrame.sourceFrame.canonicalVncResult
                === customaryVnc.resultFrame
            && frame.preparedFrame.sourceFrame.canonicalVncResult
                === customaryVnc.resultFrame
        )),
    }, {
        plan: "authorized",
        count: 12,
        projected: 12,
        allAuthorized: true,
        allScalarEquivalent: true,
        exactCapture: true,
    });

    const cueFrames = [reanalysis, full, absolutePlural, possessivePlural];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame
        )
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all accepted writing atoms have exact owner and clickable-cue jobs", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
        cueGroups: new Set(cues.map(cue => cue.role)).size,
        covered: GROUPS.every(group => {
            const ids = writing.filter(record => (
                record.reviewGroupId === group
            )).map(record => record.atomId);
            return cues.some(cue => cue.role === group
                && ids.every(id => cue.atomIds?.includes(id)));
        }),
    }, { records: 216, writing: 137, readingOnly: 79,
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
    s.ok("the interface reuses ordinary VNC and NNC choices",
        shell.includes('value="customary-agentive-reanalysis"')
        && shell.includes('value="customary-agentive-full"')
        && shell.includes('id="classical-rule-logic-nnc-state"')
        && shell.includes('id="classical-rule-logic-nnc-possessor"')
        && !shell.includes('id="classical-lesson36-manual-ni"')
        && !shell.includes('id="classical-lesson36-example-stem"'));
    return s;
}

module.exports = { run };
