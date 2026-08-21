"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson31-compound-nounstem-foundation-and-embed-meaning",
    "lesson31-possessor-orientation",
    "lesson31-matrix-authority-and-translation-reversal",
];

function ordinaryNnc(ctx, stem, state = "absolutive", possessor = "") {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem, sourceClass: "zero",
    });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source, { state, subject: "3sg", possessor });
    return ctx.requestClassicalOrdinaryNncResult(source, operation);
}

function compoundRequest(overrides = {}) {
    return {
        constructionKind: "compound-nnc",
        structure: "integrated",
        embedRole: "association",
        possessorOrientation: "matrix",
        subject: "3sg",
        state: "absolutive",
        possessor: "3sg",
        animacy: "animate",
        source: {
            embedStem: "xōchi",
            embedClass: "zero",
            matrixStem: "mox",
            matrixClass: "zero",
            ...overrides.source,
        },
        ...overrides,
        source: {
            embedStem: "xōchi",
            embedClass: "zero",
            matrixStem: "mox",
            matrixClass: "zero",
            ...overrides.source,
        },
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson31_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson31-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = request => ctx.evaluateClassicalNahuatlNominalConstruction(
        request);
    const operation = frame => frame.operationFrame || {};

    const embedResult = ordinaryNnc(ctx, "xōchi");
    const matrixResult = ordinaryNnc(ctx, "mox");
    const captured = evaluate(compoundRequest({
        source: {
            embedConstituent: {
                kind: "ordinary-nnc", stem: "xōchi", resultFrame: embedResult,
            },
            matrixConstituent: {
                kind: "ordinary-nnc", stem: "mox", resultFrame: matrixResult,
            },
        },
    }));
    const linked = evaluate(compoundRequest({
        structure: "linked-connective-t",
        possessorOrientation: "embed",
        state: "possessive",
        source: { structure: "linked-connective-t" },
    }));
    const integratedMatrix = evaluate(compoundRequest({ state: "possessive" }));
    const integratedEmbed = evaluate(compoundRequest({
        state: "possessive", possessorOrientation: "embed",
    }));
    const wrongLinked = evaluate(compoundRequest({
        structure: "linked-connective-t",
        possessorOrientation: "matrix",
        state: "possessive",
        source: { structure: "linked-connective-t" },
    }));
    const possessiveEmbedResult = ordinaryNnc(ctx, "xōchi", "possessive", "3sg");
    const inherited = evaluate(compoundRequest({
        state: "possessive",
        possessorOrientation: undefined,
        source: {
            embedConstituent: {
                kind: "ordinary-nnc", stem: "xōchi",
                resultFrame: possessiveEmbedResult,
            },
            matrixConstituent: {
                kind: "ordinary-nnc", stem: "mox", resultFrame: matrixResult,
            },
        },
    }));
    const firstOrder = evaluate(compoundRequest({
        source: { embedStem: "ā", matrixStem: "cal", matrixClass: "tli" },
    }));
    const reversedOrder = evaluate(compoundRequest({
        source: { embedStem: "cal", matrixStem: "ā", matrixClass: "tl" },
    }));
    const missingMatrix = evaluate(compoundRequest({
        source: { matrixStem: "" },
    }));
    const poisoned = evaluate({
        ...compoundRequest(), displayFormula: "#English gloss chooses matrix#",
    });

    const subclassSource = ctx.issueCanonicalNncSourceFrame({
        stem: "zaxa", sourceClass: "tl-2-b-a",
    });
    const subclassOperation = ctx.issueCanonicalNncOperationFrame(
        subclassSource, { state: "absolutive", subject: "3common" });
    const subclassResult = ctx.requestClassicalOrdinaryNncResult(
        subclassSource, subclassOperation);
    const finalARetained = evaluate(compoundRequest({
        source: {
            embedStem: "zaxa",
            embedClass: "tl-2-b-a",
            embedSourceClass: "tl-2-b-a",
            embedConstituent: {
                kind: "ordinary-nnc", stem: "zaxa", resultFrame: subclassResult,
            },
            matrixConstituent: {
                kind: "ordinary-nnc", stem: "mox", resultFrame: matrixResult,
            },
        },
    }));

    const cues = [captured, linked, firstOrder].flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame,
        )
    )).filter(cue => GROUPS.includes(cue.role));

    s.eq("the shared owner combines typed NNC Results without a stem inventory", {
        status: captured.authorizationStatus,
        canonical: ctx.isClassicalNahuatlNominalConstructionResult(captured),
        constituents: operation(captured).capturedNncConstituentCount,
        preserved: operation(captured).typedConstituentResultsPreserved,
        order: operation(captured).orderedConstituents,
        embed: [operation(captured).embedShape?.sourceStem,
            operation(captured).embedShape?.realizedStem],
        matrix: [operation(captured).matrixStem, operation(captured).matrixClass],
        stem: operation(captured).compoundStem,
        finalA: [operation(finalARetained).embedShape?.realizedStem,
            operation(finalARetained).embedShape?.ruleId],
    }, {
        status: "authorized", canonical: true, constituents: 2, preserved: true,
        order: ["embed", "matrix"], embed: ["xōchi", "xōchi"],
        matrix: ["mox", "zero"], stem: "xōchi-mox",
        finalA: ["zaxa", "compound-tl-2-b-final-a-retention"],
    });
    s.eq("possessor orientation follows structure and preserved Source history", {
        linked: [linked.authorizationStatus, operation(linked).possessorOrientation,
            operation(linked).possessorOrientationOptions,
            operation(linked).possessorOrientationChoiceRequired,
            operation(linked).possessorOrientationSource],
        integratedMatrix: [operation(integratedMatrix).possessorOrientation,
            operation(integratedMatrix).possessorOrientationOptions,
            operation(integratedMatrix).possessorOrientationChoiceRequired],
        integratedEmbed: operation(integratedEmbed).possessorOrientation,
        inherited: [inherited.authorizationStatus,
            operation(inherited).possessorOrientation,
            operation(inherited).possessorOrientationOptions,
            operation(inherited).possessorOrientationChoiceRequired,
            operation(inherited).possessorOrientationSource],
        contradiction: [wrongLinked.authorizationStatus, wrongLinked.blockReason],
    }, {
        linked: ["authorized", "embed", ["embed"], false, "linked-structure"],
        integratedMatrix: ["matrix", ["matrix", "embed"], true],
        integratedEmbed: "embed",
        inherited: ["authorized", "embed", ["embed"], false,
            "captured-possessive-embed"],
        contradiction: ["blocked",
            "linked-compound-requires-embed-possessor-orientation"],
    });
    s.eq("typed matrix authority survives translation reversal", {
        first: [operation(firstOrder).embedStem, operation(firstOrder).matrixStem,
            operation(firstOrder).matrixClass, operation(firstOrder).compoundStem,
            firstOrder.sourceFrame?.englishGlossOrderAuthority,
            firstOrder.sourceFrame?.translationAuthority],
        reversed: [operation(reversedOrder).embedStem,
            operation(reversedOrder).matrixStem,
            operation(reversedOrder).matrixClass,
            operation(reversedOrder).compoundStem],
        matrixAuthority: operation(firstOrder).matrixSelectionAuthority,
        missing: [missingMatrix.authorizationStatus, missingMatrix.blockReason],
        poisoned: [poisoned.authorizationStatus, poisoned.blockReason],
    }, {
        first: ["ā", "cal", "tli", "ā-cal", false, false],
        reversed: ["cal", "ā", "tl", "cal-ā"],
        matrixAuthority: "typed-source-analysis",
        missing: ["blocked", "nominal-compound-matrix-stem-and-class-required"],
        poisoned: ["blocked",
            "caller-supplied-derived-authority-rejected:request.displayFormula"],
    });
    s.eq("all accepted atoms have exact writing and clickable-cue routes", {
        records: records.length,
        writing: writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
        cueGroups: new Set(cues.map(cue => cue.role)).size,
        covered: GROUPS.every(group => {
            const ids = records.filter(record => record.reviewGroupId === group)
                .map(record => record.atomId);
            return cues.some(cue => cue.role === group
                && ids.every(id => cue.atomIds?.includes(id)));
        }),
    }, { records: 134, writing: 68, groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [operation(captured).compoundStem,
                operation(captured).matrixClass,
                operation(captured).orderedConstituents]
            : record.reviewGroupId === GROUPS[1]
                ? [operation(linked).possessorOrientation,
                    operation(linked).possessorOrientationSource,
                    operation(integratedMatrix).possessorOrientationOptions]
                : [operation(firstOrder).matrixStem,
                    operation(firstOrder).matrixClass,
                    firstOrder.sourceFrame?.translationAuthority];
        const expected = record.reviewGroupId === GROUPS[0]
            ? ["xōchi-mox", "zero", ["embed", "matrix"]]
            : record.reviewGroupId === GROUPS[1]
                ? ["embed", "linked-structure", ["matrix", "embed"]]
                : ["cal", "tli", false];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`,
            observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that canonical Result`,
            record.reviewGroupId === GROUPS[0]
                ? missingMatrix.authorizationStatus === "blocked"
                : record.reviewGroupId === GROUPS[1]
                    ? wrongLinked.authorizationStatus === "blocked"
                    : operation(reversedOrder).matrixStem
                        !== operation(firstOrder).matrixStem);
    }
    return s;
}

module.exports = { run };
