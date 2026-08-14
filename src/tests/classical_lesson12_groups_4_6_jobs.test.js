"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson12_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson12-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson12-nounstem-predicate-and-translation",
        "lesson12-animacy-reference-and-number",
        "lesson12-state-selection-freedom",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const ordinary = ctx.buildClassicalNahuatlAbsolutiveNncFrame("cihua", {
        subject: "3sg", nounClass: "tl", animacy: "animate",
    });
    const common = ctx.buildClassicalNahuatlAbsolutiveNncFrame("cal", {
        subject: "3common", nounClass: "tli", animacy: "nonanimate",
    });
    const sameShapeAnimate = ctx.buildClassicalNahuatlAbsolutiveNncFrame("cal", {
        subject: "3sg", nounClass: "tli", animacy: "animate",
    });
    const animatePlural = ctx.buildClassicalNahuatlAbsolutiveNncFrame("cihua", {
        subject: "3pl", nounClass: "tl", pluralConnector: "t-in", animacy: "animate",
    });
    const blockedNonanimatePlural = ctx.buildClassicalNahuatlAbsolutiveNncFrame("chimalli", {
        subject: "3pl", nounClass: "tl", pluralConnector: "m-eh", animacy: "nonanimate",
    });
    const metaphoricalPlural = ctx.buildClassicalNahuatlAbsolutiveNncFrame("chimalli", {
        subject: "3pl", nounClass: "tl", pluralConnector: "m-eh", animacy: "nonanimate", metaphoricalOverride: true,
    });
    const singularPredicatePluralSubject = ctx.buildClassicalNahuatlAbsolutiveNncFrame("cem-ihti", {
        subject: "2pl", nounClass: "in", pluralConnector: "m-eh", animacy: "animate",
    });
    const singularPredicateDiagram = ctx.buildClassicalNahuatlNncDiagrammaticFrame(singularPredicatePluralSubject.nncSlotFrame);
    const ordinaryAbsolutive = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("cihua", { selectedState: "absolutive" });
    const ordinaryPossessive = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("cihua", { selectedState: "possessive" });
    const naturalPossessive = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("nān", {
        selectedState: "possessive",
        naturalPossessionPolicy: "naturally-possessed",
        policySelectionAuthority: "user-supplied-lexical-analysis",
    });
    const predicate = ordinary.predicateSemanticsFrame;
    const reference = ordinary.referenceSemanticsFrame;
    const observations = new Map();
    const expected = new Map();
    const add = (atomId, actual, wanted) => { observations.set(atomId, actual); expected.set(atomId, wanted); };

    add("ACI-P117-L036-C8DE1C0F5B", [ordinary.nncSlotFrame.slots.predicate.stem, predicate.lexicalMeaningLocus, ordinary.nncSlotFrame.slots.predicate.tenseSlot], ["cihua", "nounstem", "none"]);
    add("ACI-P117-L036-71F1ADC943", [ordinary.stateFrame.arity, ordinary.stateFrame.slots.length, ordinary.nncSlotFrame.slots.predicate.stem], ["vacant", 0, "cihua"]);
    add("ACI-P117-L039-5331FDD7E1", [predicate.tenseCategoryEncoded, predicate.timeReferenceSource], [false, "discourse-context"]);
    add("ACI-P117-L040-4B675CCE0F", [predicate.englishCopularTranslationRequired, predicate.englishCopularTenseSource, predicate.tenseCategoryEncoded], [true, "translation-context", false]);
    add("ACI-P117-L042-2818B90EC2", [predicate.laterExplicitTenseAssignmentAvailable, predicate.laterExplicitTenseAssignmentSection], [true, "§51.3"]);
    add("ACI-P117-L045-728AFA19F2", predicate.lexicalMeaningLocus, "nounstem");
    add("ACI-P117-L045-2D01BCCAD7", predicate.predicateRoleOptions, ["identify", "describe", "locate"]);
    add("ACI-P117-L046-E068E31CAD", [predicate.predicateFunctionCompulsory, predicate.independentReferentialStatus], [true, false]);
    add("ACI-P117-L047-2185565374", [predicate.independentReferentialStatus, predicate.referentialityAccedesTo], [false, "subject-personal-pronoun"]);
    add("ACI-P118-L002-F538FF95FD", [predicate.definitenessEncoded, predicate.indefinitenessEncoded, predicate.englishArticleSource], [false, false, "translation-context"]);

    add("ACI-P118-L007-C46D93880E", reference.culturalAnimacyMayDifferFromEnglishExpectation, true);
    add("ACI-P118-L011-F40485C497", reference.normalAnimacyCorrelation, "nounstem-classification-correlates-with-subject-reference");
    add("ACI-P118-L011-F40485C497-02", reference.nounstemAnimacyMayRevealSubjectReference, true);
    add("ACI-P118-L012-F1C49C9C42", reference.ultimateAnimacyAuthority, "subject-reference");
    add("ACI-P118-L014-60C53F908B", [blockedNonanimatePlural.authorizationStatus, metaphoricalPlural.authorizationStatus, metaphoricalPlural.nncSlotFrame.metaphoricalUse], ["blocked", "authorized", true]);
    add("ACI-P118-L017-FA37920445", [reference.nounstemIndicatesNumber, reference.nounstemParticipatesInNumberCompatibility], [false, true]);
    add("ACI-P118-L021-149C505475", [reference.animateSubjectNumbers, ordinary.authorizationStatus, animatePlural.authorizationStatus], [["singular", "plural"], "authorized", "authorized"]);
    add("ACI-P118-L022-A436F4137C", reference.thirdSingularGenericReferenceAllowed, true);
    add("ACI-P118-L022-636429F776", [ordinary.subject, reference.thirdSingularGenericReferenceAllowed], ["3sg", true]);
    add("ACI-P118-L025-C278CC501F", [blockedNonanimatePlural.blockReason, metaphoricalPlural.authorizationStatus], ["nonanimate-plural-requires-metaphorical-override", "authorized"]);
    add("ACI-P118-L025-DCFF252301", [reference.nonanimateSubjectNumbers, common.authorizationStatus, blockedNonanimatePlural.authorizationStatus], [["common"], "authorized", "blocked"]);
    add("ACI-P118-L028-F4D5529384", [reference.countMassDistinctionEncoded, reference.englishCountMassSource], [false, "translation-context"]);
    add("ACI-P118-L030-1F80867EF3", [[common.numberFrame.num1, common.numberFrame.num2], [sameShapeAnimate.numberFrame.num1, sameShapeAnimate.numberFrame.num2]], [["li", "0"], ["li", "0"]]);
    add("ACI-P118-L032-426540805C", reference.englishSingularPluralSource, "translation-context");
    add("ACI-P118-L035-005DAB2BF0", [reference.nounstemClassSelectsNumberMorphShape, ordinary.numberFrame.num1, common.numberFrame.num1], [true, "tl", "li"]);
    add("ACI-P118-L037-88C5E17536", [ordinary.numberFrame.numberIsNounInflection, ordinary.numberFrame.numberBelongsTo], [false, "subject-personal-pronoun"]);
    add("ACI-P118-L038-675F02E89C", ordinary.nncSlotFrame.slots.number.belongsTo, "subject-personal-pronoun");
    add("ACI-P118-L038-4AA3148FE9-02", [reference.numberPositionIsNounstemInflection, reference.nuclearClauseIsMorphologicalWord], [false, false]);
    add("ACI-P118-L038-4AA3148FE9-03", reference.numberPositionBelongsTo, "subject-personal-pronoun");
    add("ACI-P118-L041-D20A89A655", [reference.singularMeaningPredicateWithPluralSubjectAllowed, singularPredicatePluralSubject.authorizationStatus], [true, "authorized"]);
    add("ACI-P118-L041-434BEACB44", [singularPredicatePluralSubject.stem, singularPredicatePluralSubject.numberFrame.subjectNumber, singularPredicatePluralSubject.formulaRealization], ["cem-ihti", "plural", "#an-0(cem-ihti)m-eh#"]);
    add("ACI-P119-L009-4C1992ECE2", [singularPredicatePluralSubject.stem.startsWith("cem-"), singularPredicatePluralSubject.numberFrame.numberIsNounInflection, singularPredicatePluralSubject.numberFrame.numberBelongsTo], [true, false, "subject-personal-pronoun"]);
    add("ACI-P119-L013-608F33642C", `${singularPredicateDiagram.rows[0].expression} ${singularPredicateDiagram.rows[0].role}`, "#an-0( ... )m-eh# Subject");
    add("ACI-P119-L015-AEA2BF0FFF", [reference.subjectPredicateCompartmentalization, singularPredicateDiagram.rows.map((row) => row.role)], ["airtight", ["Subject", "Predicate"]]);

    add("ACI-P119-L019-EB5FCDD063", [ordinaryAbsolutive.stateAvailability, ordinaryPossessive.stateAvailability, ordinaryAbsolutive.selectedStateBelongsTo], ["both", "both", "user-authority-selection"]);
    add("ACI-P119-L024-F3C2508F08", [ordinaryAbsolutive.authorizationStatus, ordinaryPossessive.authorizationStatus, ordinaryAbsolutive.allowedStateValues], ["authorized", "authorized", ["absolutive", "possessive"]]);

    s.eq("accepted Lesson 12 Groups 4-6 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 57, unique: 57, writing: 36, reading: 21 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writing.filter((record) => observations.has(record.atomId)).length,
        expected: writing.filter((record) => expected.has(record.atomId)).length,
        missing: writing.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 36, expected: 36, missing: [] });
    for (const record of writing) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = Array.isArray(actual) ? ["BROKEN", ...actual.slice(1)] : `${actual}-BROKEN`;
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }

    const restricted = ctx.buildClassicalNahuatlPossessiveNncFrame("nān", {
        subject: "3sg", possessor: "1sg", singularConnector: "0", animacy: "animate",
        nncSourceAuthorityFrame: naturalPossessive,
    });
    const restrictedCues = ctx.getClassicalFormulaDerivedAnnotations(
        restricted.formulaRealization,
        restricted.nncSlotFrame,
        restricted,
    ).map((cue) => cue.label);
    s.ok("a naturally possessed Source shows its exact State restriction cue", restrictedCues.includes("natural possession"));
    s.no("an ordinary possessive NNC is not mislabeled as absolutive State", ctx.getClassicalFormulaDerivedAnnotations(
        ctx.buildClassicalNahuatlPossessiveNncFrame("cal", { subject: "3common", possessor: "1sg", singularConnector: "0", animacy: "nonanimate" }).formulaRealization,
        ctx.buildClassicalNahuatlPossessiveNncFrame("cal", { subject: "3common", possessor: "1sg", singularConnector: "0", animacy: "nonanimate" }).nncSlotFrame,
        ctx.buildClassicalNahuatlPossessiveNncFrame("cal", { subject: "3common", possessor: "1sg", singularConnector: "0", animacy: "nonanimate" }),
    ).some((cue) => cue.label === "absolutive State"));
    const applicationSource = ctx.issueCanonicalNncSourceFrame({ stem: "cal" });
    const applicationSelection = ctx.getCanonicalNncOperationSelectionFrame(applicationSource, {
        state: "absolutive",
        subject: "3pl",
        animacy: "animate",
        metaphoricalUse: true,
    });
    const applicationOperation = ctx.issueCanonicalNncOperationFrame(applicationSource, {
        state: "absolutive",
        subject: "3pl",
        metaphoricalUse: true,
    });
    const applicationResult = ctx.requestClassicalOrdinaryNncResult(applicationSource, applicationOperation);
    s.eq("the normal application path performs the deliberate metaphorical plural choice", {
        sourceStatus: applicationSource.authorizationStatus,
        sourceAnimacy: applicationSource.referentialAnimacy,
        connector: applicationSource.pluralConnectorOptions,
        choiceStatus: applicationSelection.authorizationStatus,
        metaphoricalAvailable: applicationSelection.metaphoricalUseAvailable,
        metaphoricalSelected: applicationSelection.selectedMetaphoricalUse,
        selectedNumber: applicationSelection.selectedSubjectNumber,
        operationStatus: applicationOperation.authorizationStatus,
        resultStatus: applicationResult.authorizationStatus,
        formula: applicationResult.formulaProjection.formulaRealization,
    }, {
        sourceStatus: "authorized",
        sourceAnimacy: "nonanimate",
        connector: ["t-in"],
        choiceStatus: "authorized",
        metaphoricalAvailable: true,
        metaphoricalSelected: true,
        selectedNumber: "plural",
        operationStatus: "authorized",
        resultStatus: "authorized",
        formula: "#0-0(cal)t-in#",
    });
    return s;
}

module.exports = { run };
