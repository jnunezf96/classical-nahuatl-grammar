"use strict";

// Authored productive shape tests, not lexical attestations of pāna/B or a
// transitive chōca. §38.1.4 supplies the ordered core derivation; it does not
// require an invented finite patient or license passivizing a real tē object.
function buildPatientiveMatrixFixtureSource(ctx, fields = {}) {
    const sourceStem = fields.sourceStem || "pāna";
    const verbClass = fields.verbClass || "B";
    const options = ctx.getClassicalNahuatlNonactiveStemOptions(sourceStem, {
        verbClass, sourceValence: "projective-human",
    }).options || [];
    const option = options.find(item => fields.nonactiveOptionId
        ? item.optionId === fields.nonactiveOptionId
        : item.suffixFamily === "lō");
    const core = ctx.buildClassicalNahuatlPatientiveCoreSourceFrame({
        sourceStem, verbClass, sourceStage: "nonactive-core",
        sourceValence: "single-object", sourceObjectPattern: "nonspecific-human",
        sourceVoice: "impersonal", impersonalDerivationPath: "passive",
        nonactiveOptionId: option?.optionId || "",
    });
    const nnc = ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive", patientiveSourceFamily: "impersonal-core",
        canonicalPatientiveCoreSourceFrame: core,
        subject: "3sg", state: "absolutive", animacy: "animate", humanness: "human",
    });
    return { core, nnc };
}
function inspectPatientiveMatrixFixtureSource({ core, nnc }) {
    const chain = core.canonicalOrderedVoiceChain;
    return {
        sourceStem: core.lexicalSourceStem, verbClass: core.verbClass,
        sourceStatus: core.authorizationStatus,
        analysisScope: "authored-productive-shape-input; lexical-attestation-unclaimed",
        selectedOptionId: core.canonicalNonactiveStemRecord?.selectedOptionId,
        abstractSourceValence: chain?.layers?.[0]?.sourceFrame?.sourceValence,
        abstractObjectHumanness: chain?.layers?.[0]?.sourceFrame?.sourceObjectHumanness,
        ultimateSourceValence: chain?.ultimateSourceValence,
        abstractObjectPerson: chain?.sourceObjectPerson,
        abstractObjectReferent: chain?.sourceObjectReferent,
        coreStem: core.sourceStem, operations: chain?.operations,
        layerStems: chain?.layers?.map(layer => layer.targetStem),
        exactPreviousLayer: chain?.finalLayerFrame?.sourceFrame === chain?.layers?.at(-2),
        noFiniteSource: core.canonicalVncResult === null && core.finiteSubjectAsserted === false,
        noPatientInvented: core.sourceSubject === "" && core.patientReferent === "",
        patientiveStatus: nnc.authorizationStatus,
        patientiveStem: nnc.operationFrame?.targetStems?.restrictedUse,
        actualSurface: nnc.canonicalResult?.wordSurface,
        exactCoreSource: nnc.sourceFrame?.patientiveCoreSourceFrame === core,
    };
}
module.exports = { buildPatientiveMatrixFixtureSource, inspectPatientiveMatrixFixtureSource };
