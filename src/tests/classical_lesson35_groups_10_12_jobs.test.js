"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson35-ownerhood-hua-matrix",
    "lesson35-abundant-ownerhood-yoa",
    "lesson35-ownerhood-analysis-and-translation",
];

function ownerhoodRequest(matrix, source, overrides = {}) {
    return {
        constructionKind: "ownerhood",
        source: { ...source, ownerhoodMatrix: matrix },
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        numberConnector: "silent",
        ...overrides,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson35_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson35-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = request => ctx.evaluateClassicalNahuatlDeverbalNnc(request);

    const huaZero = evaluate(ownerhoodRequest("huā", {
        sourceStem: "cal", nounClass: "zero",
    }));
    const huaTl = evaluate(ownerhoodRequest("huā", {
        sourceStem: "petla", nounClass: "tl", nounSubclass: "1-a",
    }, { state: "possessive", possessor: "1sg" }));
    const recursiveHua = evaluate(ownerhoodRequest("huā", {
        sourceStem: huaTl.operationFrame.targetStems.generalUse,
        nounClass: "tl",
        nounSubclass: "1-a",
    }));
    s.eq("huā follows typed class and preserves recursive boundaries", {
        statuses: [huaZero, huaTl, recursiveHua]
            .map(frame => frame.authorizationStatus),
        restricted: [huaZero, huaTl, recursiveHua]
            .map(frame => frame.operationFrame.targetStems.restrictedUse),
        general: huaZero.operationFrame.targetStems.generalUse,
        matrix: huaZero.operationFrame.ownerhoodBoundaryFrame,
        examples: huaZero.operationFrame.ownerhoodSourceAnalysisFrame
            .exampleStemMembershipRequired,
    }, {
        statuses: ["authorized", "authorized", "authorized"],
        restricted: ["cal-huah-0", "petla-huah-0",
            "petla-huah-0-cā-huah-0"],
        general: "cal-huah-0-cā",
        matrix: {
            kind: "classical-nahuatl-lesson35-ownerhood-boundary-frame",
            version: 1,
            underlyingMatrix: "huā",
            realizedPreteritMatrix: "huah",
            finalPreteritMorph: "0",
            preteritOnly: true,
            finiteVncContinuation: "connective-t-only",
            supportiveFinalIDeletes: false,
            glottalizedFinalHMayBecomeY: false,
            finalZSpellsC: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        },
        examples: false,
    });

    const ordinary = huaZero;
    const abundant = evaluate(ownerhoodRequest("yō-ā", {
        sourceStem: "cal", nounClass: "zero",
    }));
    s.eq("ordinary and abundant ownerhood remain distinct typed analyses", {
        statuses: [ordinary, abundant].map(frame => frame.authorizationStatus),
        kinds: [ordinary, abundant]
            .map(frame => frame.operationFrame.ownerhoodKind),
        matrices: [ordinary, abundant]
            .map(frame => frame.operationFrame.ownerhoodMatrix),
        stems: [ordinary, abundant]
            .map(frame => frame.operationFrame.targetStems),
        continuations: [ordinary, abundant].map(frame => (
            frame.operationFrame.ownerhoodBoundaryFrame.finiteVncContinuation
        )),
    }, {
        statuses: ["authorized", "authorized"],
        kinds: ["ordinary-ownerhood", "abundant-ownerhood"],
        matrices: ["huā", "yō-ā"],
        stems: [
            { restrictedUse: "cal-huah-0", generalUse: "cal-huah-0-cā" },
            { restrictedUse: "cal-lō-h-0", generalUse: "cal-lō-h-0-cā" },
        ],
        continuations: ["connective-t-only", "typed-owner-continuation"],
    });

    const possessiveAbundant = evaluate(ownerhoodRequest("yō-ā", {
        sourceStem: "xōch", nounClass: "tli",
    }, { subject: "3pl", state: "possessive", possessor: "2sg" }));
    const translationHostile = evaluate({
        ...ownerhoodRequest("huā", {
            sourceStem: "cal", nounClass: "zero",
        }),
        translation: "have a house",
    });
    const wrongClass = evaluate(ownerhoodRequest("huā", {
        sourceStem: "xōch", nounClass: "tli",
    }));
    s.eq("state and participants remain grammatical while translation authorizes nothing", {
        possessive: [possessiveAbundant.authorizationStatus,
            possessiveAbundant.canonicalResult.state,
            possessiveAbundant.canonicalResult.subject,
            possessiveAbundant.canonicalResult.possessor],
        translation: [translationHostile.authorizationStatus,
            translationHostile.formulaRealization,
            Object.hasOwn(translationHostile.operationFrame, "translation")],
        wrongClass: [wrongClass.authorizationStatus, wrongClass.blockReason],
    }, {
        possessive: ["authorized", "possessive", "3pl", "2sg"],
        translation: ["authorized", huaZero.formulaRealization, false],
        wrongClass: ["blocked",
            "35.9-ownerhood-matrix-not-licensed-for-typed-source-class"],
    });

    const cueFrames = [huaZero, huaTl, recursiveHua, abundant,
        possessiveAbundant];
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
    }, { records: 219, writing: 137, readingOnly: 82,
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
