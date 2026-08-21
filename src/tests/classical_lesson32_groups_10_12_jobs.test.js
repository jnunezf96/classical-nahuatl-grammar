"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson32-pil-noble-and-honorific-formations",
    "lesson32-nonanimate-affinity-and-supplement-agreement",
    "lesson32-flawed-subject-nncs",
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
        semanticReading: "pil-noble",
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

function flawedAnalysis(stem, overrides = {}) {
    return {
        lexicalStatus: "flawed-subject-lexical-analysis",
        sourceStem: stem,
        availability: "optional",
        semanticDomain: "abnormal-or-defective-entity",
        defectEntityAmbiguous: false,
        neutralStemClass: "tli",
        flawedStemClassStrategy: "irregular-silent-num1",
        lexicalReading: "",
        usuallyRooster: false,
        ...overrides,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson32_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson32-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = value => ctx.evaluateClassicalNahuatlNominalConstruction(value);
    const op = frame => frame.operationFrame || {};

    const nobleSingular = evaluate(request({ subject: "1sg" }));
    const noblePlural = evaluate(request({ subject: "1pl" }));
    const nobleFemale = evaluate(request({
        subject: "3sg",
        pilGenderSpecification: "female",
    }));
    const noblePossessive = evaluate(request({
        subject: "2sg",
        state: "possessive",
        possessor: "1sg",
    }));
    const noblePossessivePlural = evaluate(request({
        subject: "2pl",
        state: "possessive",
        possessor: "1sg",
        possessiveAffinityPlural: "hu-ān",
    }));
    const honorificVocative = evaluate(request({
        semanticReading: "pil-honorific-vocative",
        subject: "3sg",
        state: "vocative",
        possessor: "1sg",
        vocativeForm: "full",
    }));
    const pluralHonorific = evaluate(request({
        semanticReading: "pil-honorific-vocative",
        subject: "3pl",
        state: "vocative",
        possessor: "1sg",
    }));

    s.eq("noble pil preserves ambiguity and optional gender specification", {
        singular: [nobleSingular.authorizationStatus,
            op(nobleSingular).compoundStem,
            nobleSingular.wordSurface,
            op(nobleSingular).pilNobleFormationFrame
                ?.childNobleAmbiguityPreserved],
        plural: [noblePlural.authorizationStatus,
            op(noblePlural).compoundStem,
            noblePlural.canonicalResult?.numberFrame?.num1,
            op(noblePlural).pilNobleFormationFrame?.readingChoiceRequired],
        female: [op(nobleFemale).compoundStem,
            op(nobleFemale).pilNobleFormationFrame?.genderStem,
            op(nobleFemale).pilNobleFormationFrame
                ?.femaleSpecificStemCustomarilyPreferred],
    }, {
        singular: ["authorized", "pil", "nipilli", true],
        plural: ["authorized", "pī-pil", "t", true],
        female: ["cihuā-pil", "cihuā", true],
    });
    s.eq("noble possession automatically uses the yō matrix", {
        singular: [noblePossessive.authorizationStatus,
            op(noblePossessive).compoundStem,
            op(noblePossessive).matrixClass,
            op(noblePossessive).pilNobleFormationFrame
                ?.possessiveYoMatrixAutomatic,
            op(noblePossessive).pilNobleFormationFrame
                ?.manualYoControlAllowed],
        plural: [noblePossessivePlural.authorizationStatus,
            op(noblePossessivePlural).compoundStem,
            noblePossessivePlural.canonicalResult?.numberFrame?.num1,
            noblePossessivePlural.canonicalResult?.numberFrame?.num2],
    }, {
        singular: ["authorized", "pil-lō", "tl", true, false],
        plural: ["authorized", "pil-lō", "hu", "ān"],
    });
    s.eq("the singular honorific vocative is nested tzin recursion, not affinity", {
        status: honorificVocative.authorizationStatus,
        stem: op(honorificVocative).compoundStem,
        surface: honorificVocative.sentenceSurface,
        inner: op(honorificVocative).pilHonorificVocativeFrame?.innerStem,
        recursion: op(honorificVocative).pilHonorificVocativeFrame
            ?.repeatedTzinAnalysis,
        affinity: op(honorificVocative).pilHonorificVocativeFrame
            ?.affinityPresent,
        plural: [pluralHonorific.authorizationStatus,
            pluralHonorific.blockReason],
    }, {
        status: "authorized",
        stem: "pil-tzin-tzin",
        surface: "nopiltzintziné",
        inner: "pil-tzin",
        recursion: "typed-recursion-not-reduplication",
        affinity: false,
        plural: ["blocked",
            "pil-honorific-vocative-requires-singular-subject"],
    });

    const nonanimatePlural = evaluate(request({
        source: { embedStem: "xōchi", embedClass: "tli" },
        semanticReading: "ordinary-affective",
        affectiveMatrix: "tōn",
        subject: "3pl",
        animacy: "nonanimate",
        nonanimateReduplicationReading: "ambiguous",
    }));
    const nonanimateCommon = evaluate(request({
        source: { embedStem: "cax", embedClass: "tli" },
        semanticReading: "ordinary-affective",
        affectiveMatrix: "tōn",
        subject: "3common",
        animacy: "nonanimate",
        reduplication: "affinity",
        nonanimateReduplicationReading: "affinity",
    }));
    const forcedDistributive = evaluate(request({
        source: { embedStem: "cax", embedClass: "tli" },
        semanticReading: "ordinary-affective",
        affectiveMatrix: "tōn",
        subject: "3common",
        animacy: "nonanimate",
        reduplication: "affinity",
        nonanimateReduplicationReading: "distributive-varietal",
        nonanimateReduplicationEvidence: [
            "verb-glottal-reduplication",
            "distributive-varietal-quantifier",
        ],
    }));
    s.eq("nonanimate affinity preserves exceptional plural and usual common number", {
        plural: [nonanimatePlural.authorizationStatus,
            op(nonanimatePlural).compoundStem,
            nonanimatePlural.canonicalResult?.numberFrame?.num1,
            nonanimatePlural.canonicalResult?.numberFrame?.num2,
            op(nonanimatePlural).nonanimateAffectiveAgreementFrame
                ?.pluralTinExceptionApplied,
            op(nonanimatePlural).nonanimateAffectiveAgreementFrame
                ?.supplementHeadNumber],
        common: [nonanimateCommon.authorizationStatus,
            op(nonanimateCommon).compoundStem,
            nonanimateCommon.canonicalResult?.numberFrame?.subjectNumber,
            op(nonanimateCommon).nonanimateAffectiveAgreementFrame
                ?.moreFrequentNumber],
    }, {
        plural: ["authorized", "xōchi-to-tōn", "t", "in", true,
            "common"],
        common: ["authorized", "cax-to-tōn", "common", "common"],
    });
    s.eq("nonanimate reduplication meaning stays contextual", {
        ambiguous: [op(nonanimatePlural).nonanimateAffectiveAgreementFrame
            ?.reduplicationReading,
        op(nonanimatePlural).nonanimateAffectiveAgreementFrame
            ?.reduplicationReadingChoiceRequired,
        op(nonanimatePlural).nonanimateAffectiveAgreementFrame
            ?.sourceShapeAloneDecidesReading],
        forced: [op(forcedDistributive).nonanimateAffectiveAgreementFrame
            ?.reduplicationReading,
        op(forcedDistributive).nonanimateAffectiveAgreementFrame
            ?.contextForcesDistributiveVarietal,
        op(forcedDistributive).nonanimateAffectiveAgreementFrame
            ?.contextualEvidence],
    }, {
        ambiguous: ["ambiguous", true, false],
        forced: ["distributive-varietal", true, [
            "verb-glottal-reduplication",
            "distributive-varietal-quantifier",
        ]],
    });

    const issueVnc = (sourceStem, options = {}) => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [{
                sourceStem,
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "3pl",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: "indicative",
                tense: "present",
                outputScope: "single",
            }],
        })
    );
    const seeing = issueVnc("itta");
    const principalEnvelope =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            seeing.canonicalResult,
            {
                referenceId: "viewers",
                subjectReferenceId: "viewers",
                objectReferenceId: "flowers",
            },
        );
    const supplementEnvelope =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            nonanimatePlural,
            { referenceId: "flowers", subjectReferenceId: "flowers" },
        );
    const supplementMismatchEnvelope =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            nonanimatePlural,
            { referenceId: "bowls", subjectReferenceId: "bowls" },
        );
    const supplementAgreement =
        ctx.evaluateClassicalNahuatlSupplementationOperation({
            operationKind: "relation",
            principalClause: principalEnvelope,
            supplementClause: supplementEnvelope,
            options: {
                referenceMode: "shared",
                headRole: "object",
                supplementContactRole: "subject",
                order: "supplement-first",
                principalObjectId: principalEnvelope.objects[0]?.id,
            },
        });
    const supplementMismatch =
        ctx.evaluateClassicalNahuatlSupplementationOperation({
            operationKind: "relation",
            principalClause: principalEnvelope,
            supplementClause: supplementMismatchEnvelope,
            options: {
                referenceMode: "shared",
                headRole: "object",
                supplementContactRole: "subject",
                order: "supplement-first",
                principalObjectId: principalEnvelope.objects[0]?.id,
            },
        });
    s.eq("same-referent supplementation automatically licenses the Canvas number mismatch", {
        envelopes: [principalEnvelope.authorizationStatus,
            principalEnvelope.blockReason,
            supplementEnvelope.authorizationStatus,
            supplementEnvelope.blockReason],
        envelope: supplementEnvelope.nonanimateAffectiveAgreementFrame
            ?.supplementAgreementExceptionKind,
        status: supplementAgreement.authorizationStatus,
        exception: supplementAgreement.referenceFrame?.agreementException,
        mismatch: [supplementMismatch.authorizationStatus,
            supplementMismatch.blockReason],
    }, {
        envelopes: ["authorized", "", "authorized", ""],
        envelope: "nonanimate-affective-plural-common-head",
        status: "authorized",
        exception: {
            kind: "nonanimate-affective-plural-common-head",
            licensed: true,
            sourceSection: "32.7",
        },
        mismatch: ["blocked", "shared-referent-identity-mismatch"],
    });

    const openStem = "xōmolli";
    const openAnalysis = flawedAnalysis(openStem);
    const flawedOpen = evaluate(request({
        source: { embedStem: openStem, embedClass: "tli",
            flawedSubjectAnalysis: openAnalysis },
        semanticReading: "ordinary-affective",
        affectRoute: "flawed-subject",
        affectiveMatrix: "",
        subject: "3sg",
    }));
    const ordinaryOpen = evaluate(request({
        source: { embedStem: openStem, embedClass: "tli",
            flawedSubjectAnalysis: openAnalysis },
        semanticReading: "ordinary-affective",
        affectRoute: "ordinary-subject",
        affectiveMatrix: "",
        subject: "3sg",
    }));
    const pluralRestored = evaluate(request({
        source: { embedStem: openStem, embedClass: "tli",
            flawedSubjectAnalysis: openAnalysis },
        semanticReading: "ordinary-affective",
        affectRoute: "flawed-subject",
        affectiveMatrix: "",
        subject: "1pl",
    }));
    const noTypedAnalysis = evaluate(request({
        source: { embedStem: "tzapa", embedClass: "tl" },
        semanticReading: "ordinary-affective",
        affectRoute: "flawed-subject",
        affectiveMatrix: "",
    }));
    const mismatchedTypedAnalysis = evaluate(request({
        source: { embedStem: openStem, embedClass: "tli",
            flawedSubjectAnalysis: flawedAnalysis("another-stem") },
        semanticReading: "ordinary-affective",
        affectRoute: "flawed-subject",
        affectiveMatrix: "",
    }));
    s.eq("flawed-subject grammar uses typed lexical facts and no example-stem list", {
        flawed: [flawedOpen.authorizationStatus,
            flawedOpen.canonicalResult?.numberFrame?.num1,
            op(flawedOpen).flawedSubjectFrame?.semanticDomain,
            op(flawedOpen).flawedSubjectFrame?.exampleStemWhitelistAllowed],
        ordinary: [ordinaryOpen.authorizationStatus,
            ordinaryOpen.canonicalResult?.numberFrame?.num1,
            op(ordinaryOpen).flawedSubjectFrame?.selectedRoute],
        plural: [pluralRestored.authorizationStatus,
            op(pluralRestored).flawedSubjectFrame?.selectedRoute,
            op(pluralRestored).flawedSubjectFrame?.pluralSuppressesFlawing,
            pluralRestored.canonicalResult?.numberFrame?.num1],
        noAnalysis: [noTypedAnalysis.authorizationStatus,
            noTypedAnalysis.blockReason],
        mismatch: [mismatchedTypedAnalysis.authorizationStatus,
            mismatchedTypedAnalysis.blockReason],
    }, {
        flawed: ["authorized", "⎕", "abnormal-or-defective-entity", false],
        ordinary: ["authorized", "tli", "ordinary-subject"],
        plural: ["authorized", "ordinary-subject", true, "t"],
        noAnalysis: ["blocked",
            "flawed-subject-requires-licensed-defect-stem"],
        mismatch: ["blocked",
            "typed-flawed-subject-lexical-analysis-mismatch"],
    });

    const ambiguousAnalysis = flawedAnalysis("īx-cuitla", {
        defectEntityAmbiguous: true,
    });
    const missingAmbiguity = evaluate(request({
        source: { embedStem: "īx-cuitla", embedClass: "tli",
            flawedSubjectAnalysis: ambiguousAnalysis },
        semanticReading: "ordinary-affective",
        affectRoute: "flawed-subject",
        affectiveMatrix: "",
        defectAnalysis: "",
    }));
    const entityReading = evaluate(request({
        source: { embedStem: "īx-cuitla", embedClass: "tli",
            flawedSubjectAnalysis: ambiguousAnalysis },
        semanticReading: "ordinary-affective",
        affectRoute: "flawed-subject",
        affectiveMatrix: "",
        defectAnalysis: "entity",
    }));
    const forcedTzin = evaluate(request({
        source: { embedStem: openStem, embedClass: "tli",
            flawedSubjectAnalysis: openAnalysis },
        semanticReading: "compassion",
        affectRoute: "compound",
        affectiveMatrix: "tzin",
        subject: "3sg",
    }));
    const zeroAlternative = evaluate(request({
        source: { embedStem: "tepi", embedClass: "tli",
            flawedSubjectAnalysis: flawedAnalysis("tepi", {
                availability: "obligatory",
                flawedStemClassStrategy: "zero-alternative",
            }) },
        semanticReading: "ordinary-affective",
        affectRoute: "flawed-subject",
        affectiveMatrix: "",
        subject: "3common",
        animacy: "nonanimate",
    }));
    const lexicalRooster = evaluate(request({
        source: { embedStem: "cuā-naca", embedClass: "tl",
            flawedSubjectAnalysis: flawedAnalysis("cuā-naca", {
                availability: "obligatory",
                semanticDomain: "lexicalized-flawed-subject",
                neutralStemClass: "tl",
                lexicalReading: "rooster",
                usuallyRooster: true,
            }) },
        semanticReading: "ordinary-affective",
        affectRoute: "flawed-subject",
        affectiveMatrix: "",
    }));
    s.eq("flawed-subject consequences remain typed and automatic", {
        ambiguityMissing: [missingAmbiguity.authorizationStatus,
            missingAmbiguity.blockReason],
        ambiguitySelected: [entityReading.authorizationStatus,
            op(entityReading).flawedSubjectFrame
                ?.selectedDefectEntityReading,
            op(entityReading).flawedSubjectFrame
                ?.sourceShapeDistinguishesPronominalCase],
        forced: [forcedTzin.authorizationStatus,
            forcedTzin.canonicalResult?.numberFrame?.num1,
            op(forcedTzin).flawedSubjectFrame
                ?.affectiveTzinTonForcesFlawing],
        zero: [zeroAlternative.authorizationStatus,
            op(zeroAlternative).matrixClass,
            op(zeroAlternative).flawedSubjectFrame
                ?.flawedStemClassStrategy],
        lexical: [lexicalRooster.authorizationStatus,
            op(lexicalRooster).flawedSubjectFrame?.selectedLexicalReading,
            op(lexicalRooster).flawedSubjectFrame?.usuallyRooster],
        distinct: op(flawedOpen).flawedSubjectFrame
            ?.unrelatedSilentNum1Procedures,
    }, {
        ambiguityMissing: ["blocked",
            "defect-entity-ambiguity-requires-typed-analysis"],
        ambiguitySelected: ["authorized", "entity", true],
        forced: ["authorized", "⎕", true],
        zero: ["authorized", "zero", "zero-alternative"],
        lexical: ["authorized", "rooster", true],
        distinct: ["adverbialization", "personal-name-nnc"],
    });

    const cueFrames = [nobleSingular, noblePossessive, honorificVocative,
        nonanimatePlural, forcedDistributive, flawedOpen, pluralRestored,
        forcedTzin, lexicalRooster];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame,
            frame,
        )
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all final Lesson 32 atoms have exact writing and clickable-cue routes", {
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
    }, { records: 102, writing: 48, groups: 3, cueGroups: 3,
        covered: true });

    for (const record of writing) {
        const observed = record.reviewGroupId === GROUPS[0]
            ? [op(noblePossessive).pilNobleFormationFrame
                ?.possessiveYoMatrixAutomatic,
            op(honorificVocative).pilHonorificVocativeFrame
                ?.repeatedTzinAnalysis,
            op(honorificVocative).pilHonorificVocativeFrame
                ?.affinityPresent]
            : record.reviewGroupId === GROUPS[1]
                ? [op(nonanimatePlural).nonanimateAffectiveAgreementFrame
                    ?.pluralTinExceptionApplied,
                op(nonanimatePlural).nonanimateAffectiveAgreementFrame
                    ?.supplementHeadNumber,
                op(forcedDistributive).nonanimateAffectiveAgreementFrame
                    ?.contextForcesDistributiveVarietal]
                : [op(flawedOpen).flawedSubjectFrame
                    ?.exampleStemWhitelistAllowed,
                op(pluralRestored).flawedSubjectFrame
                    ?.pluralSuppressesFlawing,
                op(flawedOpen).flawedSubjectFrame
                    ?.unrelatedProceduresKeptDistinct];
        const expected = record.reviewGroupId === GROUPS[0]
            ? [true, "typed-recursion-not-reduplication", false]
            : record.reviewGroupId === GROUPS[1]
                ? [true, "common", true]
                : [false, true, true];
        s.eq(`${record.atomId} observes its owner-issued canonical Result`,
            observed, expected);
        s.ok(`mutation:${record.atomId} changes or blocks that Result`,
            record.reviewGroupId === GROUPS[0]
                ? pluralHonorific.authorizationStatus === "blocked"
                : record.reviewGroupId === GROUPS[1]
                    ? supplementMismatch.authorizationStatus === "blocked"
                    : noTypedAnalysis.authorizationStatus === "blocked");
    }
    return s;
}

module.exports = { run };
