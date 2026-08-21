"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson32-possessive-affinity-number-alternatives",
    "lesson32-pil-lexeme-and-child-formations",
    "lesson32-affective-child-matrices",
];

function request(overrides = {}) {
    return {
        constructionKind: "affective-nnc",
        source: {
            embedStem: "pil",
            embedClass: "tli",
            ...overrides.source,
        },
        affectRoute: "compound",
        affectiveMatrix: "tzin",
        semanticReading: "pil-child",
        pilChildRoute: "affective",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
        ...overrides,
        source: {
            embedStem: "pil",
            embedClass: "tli",
            ...overrides.source,
        },
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson32_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson32-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = value => ctx.evaluateClassicalNahuatlNominalConstruction(value);
    const op = frame => frame.operationFrame || {};

    const possessiveHuan = evaluate(request({
        source: { embedStem: "cōl", embedClass: "tli" },
        semanticReading: "ordinary-affective",
        subject: "3pl",
        state: "possessive",
        possessor: "1sg",
        possessiveAffinityPlural: "hu-ān",
    }));
    const possessiveSilent = evaluate(request({
        source: { embedStem: "cōl", embedClass: "tli" },
        semanticReading: "ordinary-affective",
        subject: "3pl",
        state: "possessive",
        possessor: "1sg",
        possessiveAffinityPlural: "silent",
    }));
    const openPilMatrix = evaluate(request({
        source: { embedStem: "ich-ca", embedClass: "zero" },
        semanticReading: "ordinary-affective",
        affectiveMatrix: "pil",
        subject: "3pl",
        state: "possessive",
        possessiveAffinityPlural: "hu-ān",
    }));
    const openPolMatrix = evaluate(request({
        source: { embedStem: "tōtol", embedClass: "in" },
        semanticReading: "ordinary-affective",
        affectiveMatrix: "pōl",
        subject: "3pl",
        state: "possessive",
        possessiveAffinityPlural: "hu-ān",
    }));
    const invalidPossessiveNumber = evaluate(request({
        source: { embedStem: "cōl", embedClass: "tli" },
        semanticReading: "ordinary-affective",
        subject: "3pl",
        state: "possessive",
        possessiveAffinityPlural: "invented",
    }));

    const simplePossessiveChild = evaluate(request({
        pilChildRoute: "simple",
        subject: "2pl",
        state: "possessive",
        possessor: "1sg",
    }));
    const simplePluralChild = evaluate(request({
        pilChildRoute: "simple",
        subject: "3pl",
    }));
    const genderedChild = evaluate(request({
        pilChildRoute: "simple",
        pilGenderSpecification: "female",
        subject: "3pl",
    }));
    const uniqueChild = evaluate(request({
        subject: "3pl",
        state: "possessive",
        possessor: "1sg",
        possessiveAffinityPlural: "silent",
    }));
    const distributiveChildren = evaluate(request({
        subject: "3pl",
        state: "possessive",
        possessor: "3pl",
        pilPossessorDistribution: "distributive-varietal",
        possessiveAffinityPlural: "silent",
    }));
    const boundaryPilCompound = evaluate(request({
        source: { embedStem: "mah-pil", embedClass: "tli" },
        semanticReading: "pil-appendage",
        pilChildRoute: "simple",
    }));
    const falsePilReading = evaluate(request({
        source: { embedStem: "xōchi", embedClass: "tli" },
        pilChildRoute: "simple",
    }));

    const pluralTzinChild = evaluate(request({ subject: "2pl" }));
    const pluralTonChild = evaluate(request({
        affectiveMatrix: "tōn",
        subject: "3pl",
    }));
    const pluralPilChild = evaluate(request({
        affectiveMatrix: "pil",
        subject: "3pl",
    }));
    const pluralPolChild = evaluate(request({
        affectiveMatrix: "pōl",
        subject: "3pl",
    }));
    const fullVocative = evaluate(request({
        state: "vocative",
        possessor: "1sg",
        vocativeForm: "full",
    }));
    const shortVocative = evaluate(request({
        state: "vocative",
        possessor: "1sg",
        vocativeForm: "abbreviated",
    }));
    const belovedVocative = evaluate(request({
        source: { embedStem: "tla-zoh-pil", embedClass: "tli" },
        state: "vocative",
        possessor: "1sg",
        vocativeForm: "abbreviated",
    }));
    const invalidChildMatrix = evaluate(request({ affectiveMatrix: "zol" }));

    s.eq("possessive affective plurals expose only the two licensed dyads", {
        huan: [possessiveHuan.authorizationStatus,
            op(possessiveHuan).compoundStem,
            op(possessiveHuan).possessiveAffinityNumberFrame?.selectedDyad,
            possessiveHuan.canonicalResult?.numberFrame?.num1,
            possessiveHuan.canonicalResult?.numberFrame?.num2],
        silent: [possessiveSilent.authorizationStatus,
            op(possessiveSilent).possessiveAffinityNumberFrame?.selectedDyad,
            possessiveSilent.canonicalResult?.numberFrame?.num1,
            possessiveSilent.canonicalResult?.numberFrame?.num2],
        invalid: [invalidPossessiveNumber.authorizationStatus,
            invalidPossessiveNumber.blockReason],
    }, {
        huan: ["authorized", "cōl-tzi-tzin", "hu-ān", "hu", "ān"],
        silent: ["authorized", "⎕-⎕", "⎕", "⎕"],
        invalid: ["blocked", "possessive-affinity-plural-choice-invalid"],
    });
    s.eq("documentary disagreement never becomes a matrix whitelist", {
        pil: [openPilMatrix.authorizationStatus,
            op(openPilMatrix).possessiveAffinityNumberFrame
                ?.appliesAcrossAffectiveMatrices],
        pol: [openPolMatrix.authorizationStatus,
            op(openPolMatrix).possessiveAffinityNumberFrame
                ?.matrixWhitelistAllowed],
        evidence: [op(possessiveHuan).possessiveAffinityNumberFrame
            ?.moreFrequentVariant,
        op(possessiveHuan).possessiveAffinityNumberFrame
            ?.documentaryDisagreementPreserved],
    }, {
        pil: ["authorized", true],
        pol: ["authorized", false],
        evidence: ["hu-ān", true],
    });
    s.eq("simple pil child structure derives possession, affinity, gender, and open compounds", {
        possessive: [simplePossessiveChild.authorizationStatus,
            op(simplePossessiveChild).compoundStem,
            simplePossessiveChild.wordSurface,
            op(simplePossessiveChild).pilChildFormationFrame?.affinityAutomatic],
        plural: [op(simplePluralChild).compoundStem,
            simplePluralChild.wordSurface,
            op(simplePluralChild).affectiveAffinityFrame?.selectedTarget,
            op(simplePluralChild).pilLexemeFrame?.humanReadingChoiceRequired],
        gender: [op(genderedChild).compoundStem,
            genderedChild.wordSurface,
            op(genderedChild).pilLexemeFrame?.genderStem],
        compound: [boundaryPilCompound.authorizationStatus,
            op(boundaryPilCompound).compoundStem,
            op(boundaryPilCompound).pilLexemeFrame
                ?.lexemeAtFinalMorphemeBoundary],
        falseReading: [falsePilReading.authorizationStatus,
            falsePilReading.blockReason],
    }, {
        possessive: ["authorized", "pil", "amnopilhuān", false],
        plural: ["pī-pil", "pīpiltin", "pil-lexeme", true],
        gender: ["cihuā-pī-pil", "cihuāpīpiltin", "cihuā"],
        compound: ["authorized", "mah-pil", true],
        falseReading: ["blocked",
            "pil-lexeme-reading-requires-typed-pil-source"],
    });
    s.eq("the unique possessive child hierarchy is automatic and preserves distribution", {
        ordinary: [uniqueChild.authorizationStatus,
            op(uniqueChild).compoundStem,
            op(uniqueChild).uniquePilChildHierarchyFrame
                ?.innerPossessiveNncStem,
            op(uniqueChild).uniquePilChildHierarchyFrame
                ?.outerAffectiveMatrix,
            op(uniqueChild).uniquePilChildHierarchyFrame
                ?.hierarchyChoiceRequired],
        distributive: [distributiveChildren.authorizationStatus,
            op(distributiveChildren).compoundStem,
            op(distributiveChildren).pilLexemeFrame?.possessorDistribution,
            op(distributiveChildren).uniquePilChildHierarchyFrame
                ?.sourceBoundariesPreserved],
    }, {
        ordinary: ["authorized", "pil-hu-ān-tzi-tzin", "pil-hu-ān",
            "tzi-tzin", false],
        distributive: ["authorized", "pih-pil-hu-ān-tzi-tzin",
            "distributive-varietal", true],
    });
    s.eq("affective child matrices derive class and obligatory double affinity", {
        tzin: [pluralTzinChild.authorizationStatus,
            op(pluralTzinChild).affectiveChildMatrixFrame?.matrix,
            op(pluralTzinChild).affectiveAffinityFrame?.selectedTarget,
            op(pluralTzinChild).affectiveAffinityFrame?.targetChoiceRequired],
        ton: [op(pluralTonChild).compoundStem,
            op(pluralTonChild).matrixClass,
            op(pluralTonChild).affectiveChildMatrixFrame
                ?.doubleAffinityApplied],
        pil: [op(pluralPilChild).compoundStem,
            op(pluralPilChild).matrixClass,
            pluralPilChild.canonicalResult?.numberFrame?.num1],
        pol: [pluralPolChild.authorizationStatus,
            op(pluralPolChild).affectiveChildMatrixFrame?.matrixMeaning],
        invalid: [invalidChildMatrix.authorizationStatus,
            invalidChildMatrix.blockReason],
    }, {
        tzin: ["authorized", "tzin", "both", false],
        ton: ["pī-pil-to-tōn", "tli", true],
        pil: ["pī-pil-pi-pīl", "zero", "⎕"],
        pol: ["authorized", "brat"],
        invalid: ["blocked", "pil-child-affective-matrix-required"],
    });
    s.eq("child vocatives preserve the real form and meaning contrast", {
        full: [fullVocative.authorizationStatus, fullVocative.sentenceSurface,
            op(fullVocative).affectiveChildMatrixFrame?.vocativeMeaning],
        short: [shortVocative.authorizationStatus, shortVocative.sentenceSurface,
            op(shortVocative).affectiveChildMatrixFrame?.vocativeMeaning],
        beloved: [belovedVocative.authorizationStatus,
            belovedVocative.sentenceSurface,
            op(belovedVocative).affectiveChildMatrixFrame?.vocativeMeaning],
    }, {
        full: ["authorized", "nopiltziné", "my-child"],
        short: ["authorized", "nopiltzé", "summons-without-child-address"],
        beloved: ["authorized", "notlazohpiltzé", "beloved-child"],
    });

    const cueFrames = [possessiveHuan, possessiveSilent, simplePluralChild,
        genderedChild, uniqueChild, pluralTonChild, pluralPilChild,
        fullVocative, shortVocative];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame,
        )
    )).filter(cue => GROUPS.includes(cue.role));
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
    }, { records: 72, writing: 31, groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [op(possessiveHuan).possessiveAffinityNumberFrame
                ?.availableDyads,
            op(possessiveHuan).possessiveAffinityNumberFrame
                ?.moreFrequentVariant,
            op(possessiveHuan).possessiveAffinityNumberFrame
                ?.matrixWhitelistAllowed]
            : record.reviewGroupId === GROUPS[1]
                ? [op(simplePluralChild).pilLexemeFrame?.lexemeStem,
                    op(simplePluralChild).pilLexemeFrame
                        ?.affectivePilMatrixKeptDistinct,
                    op(uniqueChild).uniquePilChildHierarchyFrame
                        ?.hierarchyChoiceRequired]
                : [op(pluralTonChild).affectiveChildMatrixFrame
                    ?.availableMatrices,
                op(pluralTonChild).affectiveChildMatrixFrame
                    ?.doubleAffinityApplied,
                op(pluralTonChild).affectiveAffinityFrame
                    ?.targetChoiceRequired];
        const expected = record.reviewGroupId === GROUPS[0]
            ? [["hu-ān", "⎕-⎕"], "hu-ān", false]
            : record.reviewGroupId === GROUPS[1]
                ? ["pil", "pīl", false]
                : [["tzin", "tōn", "pil", "pōl"], true, false];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`,
            observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that Result`,
            record.reviewGroupId === GROUPS[0]
                ? op(possessiveSilent).possessiveAffinityNumberFrame
                    ?.selectedDyad !== op(possessiveHuan)
                        .possessiveAffinityNumberFrame?.selectedDyad
                : record.reviewGroupId === GROUPS[1]
                    ? op(genderedChild).compoundStem
                        !== op(simplePluralChild).compoundStem
                    : op(pluralPilChild).matrixClass
                        !== op(pluralTonChild).matrixClass);
    }
    return s;
}

module.exports = { run };
