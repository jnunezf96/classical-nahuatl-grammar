"use strict";

const { createSuite } = require("./runner");

function execute(ctx, operationId, args) {
    return ctx.executeClassicalGrammarApplicationRequest({ operationId, outputKind: "scalar", args, languageId: "classical-nahuatl" }).canonicalResult;
}

function sentence(ctx, stem, subject, possessor) {
    const nnc = ctx.buildClassicalNahuatlPossessiveNncFrame(stem, {
        subject,
        possessor,
        singularConnector: "0",
        nounstemRelationKind: "nonrelational",
        possessorCompatibility: "ordinary",
        animacy: "nonanimate",
    });
    return execute(ctx, "nnc:sentence-surface", [nnc.nncSlotFrame, { sentenceType: "assertion", polarity: "positive" }]);
}

function build(ctx) {
    const actualMerit = sentence(ctx, "mahcēhualti", "2sg", "3sg");
    const actualBoon = sentence(ctx, "cnōpilti", "2sg", "3sg");
    const reversedMerit = sentence(ctx, "mahcēhualti", "3sg", "2sg");
    const reversedBoon = sentence(ctx, "cnōpilti", "3sg", "2sg");
    const source = ctx.buildClassicalNahuatlKingPraiseRoleContrastSource(actualMerit, actualBoon, reversedMerit, reversedBoon);
    const result = execute(ctx, "classical.nnc.king-praise-role-contrast.interpret", [source]);
    return { actualMerit, actualBoon, reversedMerit, reversedBoon, source, result };
}

const JOBS = Object.freeze([
    ["ACI-P035-L008-4282D34A75", result => result.substitutedFormsAbsent?.includes("momahcēhualti")],
    ["ACI-P035-L008-4282D34A75-02", result => result.formMeanings?.momahcēhualti === "it-is-your-merit"],
    ["ACI-P035-L008-4282D34A75-03", result => result.substitutedFormsAbsent?.includes("mocnōpilti")],
    ["ACI-P035-L008-4282D34A75-04", result => result.formMeanings?.mocnōpilti === "it-is-your-boon"],
    ["ACI-P035-L008-4282D34A75-05", result => result.canvasFormsPresent?.includes("tīmahcēhualti")],
    ["ACI-P035-L008-4282D34A75-06", result => result.formMeanings?.tīmahcēhualti === "you-are-its-merit"],
    ["ACI-P035-L008-4282D34A75-07", result => result.canvasFormsPresent?.includes("tīcnōpilti")],
    ["ACI-P035-L008-4282D34A75-08", result => result.formMeanings?.tīcnōpilti === "you-are-its-boon"],
    ["ACI-P035-L008-4282D34A75-09", result => result.substitutedAnalysisReversesSubjectIntoPossessor === true],
    ["ACI-P035-L010-096E47F9BD", result => result.correctedTranslations?.[0] === "Now you are the one whom the city has merited and deserved."],
    ["ACI-P035-L010-096E47F9BD-02", result => result.correctedTranslations?.[1] === "Now it is you who are the one whom the city has merited and deserved."],
    ["ACI-P035-L010-096E47F9BD-03", result => result.actualParticipantRoles?.honoredRuler === "second-person-singular-human-merited-object-or-boon" && result.actualParticipantRoles?.city === "nonhuman-entity-that-has-merited-and-deserved-the-ruler"],
    ["ACI-P035-L011-CC9710C229", result => result.publishedTranslationReversesWhoMeritsWhom === true],
    ["ACI-P035-L012-D035D58273", result => result.reversalMovesReaderFurtherFromNahuatlEthos === true],
]);

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_king_praise_role_contrast_jobs");
    const built = build(ctx);
    s.eq("the normal NNC application builds the actual and reversed role forms", {
        actual: [built.actualMerit.canonicalNuclearSurface, built.actualBoon.canonicalNuclearSurface],
        reversed: [built.reversedMerit.canonicalNuclearSurface, built.reversedBoon.canonicalNuclearSurface],
    }, {
        actual: ["tīmahcēhualti", "tīcnōpilti"],
        reversed: ["momahcēhualti", "mocnōpilti"],
    });
    for (const [atomId, observes] of JOBS) {
        s.ok(`${atomId} performs its exact participant-role job`, observes(built.result));
        const mutation = {
            ...built.result,
            canvasFormsPresent: Object.freeze([]),
            substitutedFormsAbsent: Object.freeze([]),
            formMeanings: Object.freeze({}),
            actualParticipantRoles: Object.freeze({}),
            substitutedAnalysisReversesSubjectIntoPossessor: false,
            correctedTranslations: Object.freeze([]),
            publishedTranslationReversesWhoMeritsWhom: false,
            reversalMovesReaderFurtherFromNahuatlEthos: false,
        };
        s.ok(`mutation:${atomId} fails when its role behavior is broken`, !observes(mutation));
    }
    const copied = ctx.evaluateClassicalNahuatlKingPraiseRoleContrast(Object.freeze({ ...built.source }));
    s.eq("a copied source cannot claim the participant-role grammar", [copied.authorizationStatus, copied.blockReason], ["blocked", "owner-issued-king-praise-role-contrast-source-required"]);
    return s;
}

module.exports = { run };
