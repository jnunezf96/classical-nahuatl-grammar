"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson33-compound-verbstem-attitude-scope";

function request(overrides = {}) {
    return {
        sourceStem: "chōca-ti-o",
        sourceEmbedStem: "chōca",
        sourceMatrixStem: "o",
        compoundMatrixClass: "A",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        lateOperation: "honorific",
        lateVariant: "applicative",
        honoredParticipant: "subject",
        ...overrides,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson33_group_10_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson33-review-ledger.json"), "utf8"));
    const renderingSource = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));

    const compositional = ctx.evaluateClassicalNahuatlLateVncDerivation(request());
    const directTargetAttempt = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        attitudeCompoundTarget: "matrix",
    }));
    const facts = compositional.operationFrame?.operationFacts || {};
    s.eq("ordinary compositional compounds transform the embed automatically", {
        status: compositional.authorizationStatus,
        targetStem: compositional.operationFrame?.targetStem,
        surface: compositional.surfaceRealization,
        formula: compositional.formulaRealization,
        target: facts.compoundTarget,
        basis: facts.compoundScopeBasis,
        structure: facts.selectedCompoundStructure,
        derived: facts.scopeDerivedAutomatically,
        directChoice: facts.directScopeChoiceExposed,
        poisonedTarget: directTargetAttempt.operationFrame?.operationFacts
            ?.compoundTarget,
        callerAuthority: directTargetAttempt.operationFrame?.operationFacts
            ?.callerAttitudeScopeAuthorityAccepted,
    }, {
        status: "authorized",
        targetStem: "chōqui-lih-t-o",
        surface: "mochōquilihtoc",
        formula: "#0-0+m-o(chōqui-lih-t-o)0+c-0#",
        target: "embed",
        basis: "compositional-intransitive-matrix",
        structure: "compositional",
        derived: true,
        directChoice: false,
        poisonedTarget: "embed",
        callerAuthority: false,
    });

    const cuiBase = request({
        sourceStem: "cui-ti-huetzi",
        sourceEmbedStem: "cui",
        sourceMatrixStem: "huetzi",
        compoundMatrixClass: "B",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: "A",
        honorificDerivationOptionId:
            "applicative:type-two:final-i:cui:cui-liā",
    });
    const cuiCompositional = ctx.evaluateClassicalNahuatlLateVncDerivation(cuiBase);
    const lexicalAnalysis = {
        lexicalStatus: "compound-verbstem-lexicalization-analysis",
        sourceEmbedStem: "cui",
        sourceMatrixStem: "huetzi",
        availableStructures: ["lexicalized"],
        selectedStructure: "lexicalized",
        lexicalMeaningId: "attack-as-unified-compound-verbstem",
    };
    const cuiLexicalized = ctx.evaluateClassicalNahuatlLateVncDerivation({
        ...cuiBase,
        honorificDerivationOptionId:
            "applicative:type-two:exact:cn-l26-264-huetzi-huechilia:huetzi:huechi-liā",
        compoundLexicalizationAnalysis: lexicalAnalysis,
    });
    s.eq("the same component stems receive different scope only from typed lexicalization structure", {
        compositional: [cuiCompositional.authorizationStatus,
            cuiCompositional.operationFrame?.operationFacts?.compoundTarget,
            cuiCompositional.operationFrame?.targetStem],
        lexicalized: [cuiLexicalized.authorizationStatus,
            cuiLexicalized.operationFrame?.operationFacts?.compoundTarget,
            cuiLexicalized.operationFrame?.operationFacts?.compoundScopeBasis,
            cuiLexicalized.operationFrame?.targetStem],
        lexicalMeaning: cuiLexicalized.operationFrame?.operationFacts
            ?.compoundLexicalMeaningId,
        exampleAuthority: cuiLexicalized.operationFrame?.operationFacts
            ?.exactExampleIdentityAuthority,
    }, {
        compositional: ["authorized", "embed", "cui-lih-ti-huetzi"],
        lexicalized: ["authorized", "matrix", "typed-lexicalized-unity",
            "cui-ti-huechi-lih"],
        lexicalMeaning: "attack-as-unified-compound-verbstem",
        exampleAuthority: false,
    });

    const unresolved = ctx.evaluateClassicalNahuatlLateVncDerivation({
        ...cuiBase,
        compoundLexicalizationAnalysis: {
            lexicalStatus: "compound-verbstem-lexicalization-analysis",
            sourceEmbedStem: "cui",
            sourceMatrixStem: "huetzi",
            availableStructures: ["compositional", "lexicalized"],
        },
    });
    const mismatched = ctx.evaluateClassicalNahuatlLateVncDerivation({
        ...cuiBase,
        compoundLexicalizationAnalysis: {
            ...lexicalAnalysis,
            sourceMatrixStem: "cāhua",
        },
    });
    s.eq("only a real typed Source-analysis ambiguity asks for a choice", {
        unresolved: [unresolved.authorizationStatus, unresolved.blockReason],
        mismatch: [mismatched.authorizationStatus, mismatched.blockReason],
    }, {
        unresolved: ["blocked",
            "compound-lexicalization-analysis-choice-required"],
        mismatch: ["blocked",
            "valid-matching-compound-lexicalization-analysis-required"],
    });

    s.ok("the live Source interface issues the compound before applying its attitude",
        renderingSource.includes("const compoundSourceFrame = compoundSourceSelected")
        && renderingSource.includes('lateOperation: "compound"')
        && renderingSource.includes('lateVariant: "connective-t"')
        && renderingSource.includes("attitudeCompoundClosureFrame: compoundSourceFrame")
        && renderingSource.includes("sourceEmbedStem,")
        && renderingSource.includes("sourceMatrixStem,"));

    const sharedSource = ctx.evaluateClassicalNahuatlLateVncDerivation({
        sourceStem: "cui",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        lateOperation: "compound",
        lateVariant: "shared-object",
        compoundMatrixStem: "tlāl-i-ā",
        compoundMatrixClass: "D",
    });
    const sharedAttitude = ctx.evaluateClassicalNahuatlLateVncDerivation({
        sourceStem: sharedSource.operationFrame?.targetStem,
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: sharedSource.operationFrame?.targetClass,
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        lateOperation: "pejorative",
        lateVariant: "preterit-embed",
        honoredParticipant: "subject",
        attitudeCompoundClosureFrame: sharedSource,
    });
    const sharedFacts = sharedAttitude.operationFrame?.operationFacts || {};
    s.eq("shared-object compounds transform the matrix without losing the shared object", {
        source: [sharedSource.authorizationStatus,
            sharedSource.operationFrame?.targetStem],
        result: [sharedAttitude.authorizationStatus,
            sharedAttitude.operationFrame?.targetStem,
            sharedFacts.compoundTarget, sharedFacts.compoundScopeBasis],
        connective: sharedFacts.connective,
        objectCount: sharedFacts.completedCompoundObjectFrame?.positions?.length
            || (sharedFacts.completedCompoundObjectFrame?.valenceArity
                === "vacant" ? 0 : 1),
        objectsPreserved: sharedFacts.compoundObjectsPreserved,
        boundaries: sharedFacts.typedInternalBoundariesPreserved,
        outer: [sharedFacts.outerSubjectPreserved,
            sharedFacts.outerMoodPreserved, sharedFacts.outerTensePreserved],
    }, {
        source: ["authorized", "cui-ti-tlāl-i-a"],
        result: ["authorized", "cui-ti-tlāl-i-h-0-pōl-o-h", "matrix",
            "shared-object-compound"],
        connective: "ti",
        objectCount: 1,
        objectsPreserved: true,
        boundaries: true,
        outer: [true, true, true],
    });

    const frames = [compositional, directTargetAttempt, cuiCompositional,
        cuiLexicalized, sharedAttitude];
    const cues = frames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.finalTypedVncSlotFrame,
            frame,
        )
    )).filter(cue => cue.role === GROUP);
    s.eq("all accepted Group 10 atoms have exact jobs and one canonical clickable cue", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
        cue: cues.some(cue => records.every(record => (
            cue.atomIds?.includes(record.atomId)
        ))),
    }, { records: 45, writing: 24, readingOnly: 21,
        accepted: true, cue: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.atomIds?.includes(record.atomId));
        s.ok(`${record.atomId} observes compound attitude scope`, Boolean(cue));
        s.eq(`mutation:${record.atomId} loses exact credit`,
            (cue?.atomIds || []).filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }
    return s;
}

module.exports = { run };
