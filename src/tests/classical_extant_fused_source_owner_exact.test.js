"use strict";

const { createSuite } = require("./runner");
const OWNER = "classical-destockal-irregular-source-lifecycle";
const PREFIX = "ClassicalDestockalIrregularSourceLifecycle";
const BASE = "constraints.destockalIrregularSourceLifecycle.extantFusedSources";
const ATOMS = [
    ["mini", "aci-p204-l002-61a69ed581-03-mini-coalescence", "coalescence"],
    ["mini", "aci-p204-l002-61a69ed581-05-mini-causative-formation", "causativeFormation"],
    ["xini", "aci-p204-l003-429a0e8ace-03-xini-coalescence", "coalescence"],
    ["xini", "aci-p204-l003-429a0e8ace-06-xini-causative-formation", "causativeFormation"],
    ["cehui", "aci-p204-l004-ae01b03f8b-cehui-source-constitution", "sourceConstitution"],
    ["cehui", "aci-p204-l004-ae01b03f8b-02-cehui-coalescence", "coalescence"],
    ["cehui", "aci-p204-l004-ae01b03f8b-05-cehui-causative-formation", "causativeFormation"],
];

function run(ctx = {}) {
    const s = createSuite("classical_extant_fused_source_owner_exact");
    const receipt = (lexeme, facet, extra = {}) => {
        const source = ctx[`build${PREFIX}Source`]({
            analysisDomain: OWNER, selection: `claim-p2343-extant-${lexeme}`, requestedFacet: facet,
            participantChoice: `claim-p2343-extant-${lexeme}:${facet}`, ...extra,
        });
        const result = ctx[`evaluate${PREFIX}`](source);
        return { source, result, evidence: ctx[`get${PREFIX}ExecutionEvidence`](result) };
    };
    const receipts = ATOMS.map(([lexeme, facet]) => receipt(lexeme, facet));
    ATOMS.forEach(([lexeme, facet, leaf], index) => {
        const { result, evidence } = receipts[index];
        s.eq(`${facet} directly observes only its own structural relation`, [
            result.authorizationStatus, result.payload.effectiveCanonicalPath, result.payload.sourceCanonicalPath,
            result.payload.proofObservationKind, ctx[`is${PREFIX}Result`](result),
            ctx[`is${PREFIX}ExecutionEvidence`](evidence, result),
        ], ["authorized", `${BASE}.${lexeme}.${leaf}`, `${BASE}.${lexeme}.${leaf}`,
            "direct-canonical-result-observation", true, true]);
    });
    const valueFor = (lexeme, leaf) => receipts[ATOMS.findIndex(item => item[0] === lexeme && item[2] === leaf)].result.payload.facetValue;
    for (const [lexeme, stem, root, stock, theme, target, targetClass, procedure] of [
        ["mini", "mī-ni", "mi", "ī", "ni", "mī-n-a", "B", "recover-fused-stock-and-replace"],
        ["xini", "xī-ni", "xi", "ī", "ni", "xī-ni-ā", "C", "recover-fused-stock-and-append"],
        ["cehui", "cē-hui", "ce", "ē", "hui", "cē-hui-ā", "C", "recover-fused-stock-and-append"],
    ]) {
        const coal = valueFor(lexeme, "coalescence");
        const formation = valueFor(lexeme, "causativeFormation");
        const analysis = coal?.sourceAnalysis;
        const relation = coal?.sourceCoalescenceFrame;
        const boundary = coal?.sourceCoalescenceBoundaryFrame;
        const reconstructed = `${root}-${stock}-${theme}`;
        s.eq(`${stem}: its own lexical analysis is distinguished from shape candidates`, [
            analysis?.analysisId, analysis?.analysisAuthority, analysis?.lexicalStatus,
            analysis?.segments, analysis?.root, analysis?.stockFormative, analysis?.stemFormative,
            analysis?.destockalStructureFrame?.typeId, coal?.sourceAnalysisFrame?.callerSuppliedAnalysisAllowed,
        ], [`cn-l24-2459-${lexeme}-fused-destockal:fused-destockal-${theme}-exact`,
            "typed-lexical-source-analysis", "lexically-licensed-source-analysis",
            [root, stock, theme], root, stock, theme, "long-vowel-ni-or-hui", false]);
        s.eq(`${stem}: coalescence is actually executed from the signed reconstructed source`, [
            coal?.reconstructedSourceStem,
            coal?.reconstructedSourceApplicationFrame?.normalizedRequest?.sourceStem,
            relation?.root, relation?.stockFormative, relation?.underlyingStemFormative,
            relation?.realization?.underlyingVowelCount, relation?.realization?.surfaceVowelCount,
            relation?.resultStock, boundary?.leftSurfaceAfter, boundary?.rightSurfaceAfter,
            boundary?.formulaCarrierChangedByWrittenBoundary,
            coal?.reconstructedSourceApplicationFrame?.resultFrame?.formulaRealization,
            coal?.reconstructedSourceApplicationFrame?.resultFrame?.surfaceRealization,
            coal?.sourceFiniteSurfaceFrame?.formulaDerivedFromWrittenProjection,
            coal?.sourceFiniteSurfaceFrame?.writtenDerivedFromFormulaProjection,
        ], [reconstructed, reconstructed, root, stock, theme, 2, 1,
            `${root.slice(0, -1)}${stock}`, `${root.slice(0, -1)}${stock}`, "", false,
            `#0-0(${reconstructed})0+0-0#`, stem.replaceAll("-", ""), false, false]);
        const operation = formation?.causativeOperationFrame;
        const participant = formation?.participantTransformFrame;
        s.eq(`${stem}: the selected causative is the actual continued Result, not a target-string proxy`, [
            formation?.sourceApplicationFrame?.normalizedRequest?.sourceStem,
            operation?.sourceStem, operation?.authorizationStatus, operation?.selectedOptionId,
            formation?.selectedOption?.optionId, operation?.targetStem, operation?.targetClass,
            operation?.selectedOption?.targetConstruction?.operation,
            operation?.selectedOption?.sourceAnalysisId,
            formation?.causativeApplicationFrame?.authorizationStatus,
            formation?.causativeApplicationFrame?.resultFrame?.selectedDerivation,
            formation?.finiteSurfaceFrame?.formulaDerivedFromWrittenProjection,
            formation?.finiteSurfaceFrame?.writtenDerivedFromFormulaProjection,
        ], [stem, stem, "authorized", formation?.selectedOption?.optionId,
            formation?.selectedOption?.optionId, target, targetClass, procedure, analysis?.analysisId,
            "authorized", "causative", false, false]);
        s.eq(`${stem}: real causee continuity is not mislabeled as the separate tla citation`, [
            participant?.sourceSubject, participant?.targetSubject,
            participant?.sourceObjectCount, participant?.targetObjectCount,
            participant?.sourceSubjectBecomesCausativeObject,
            participant?.addedObjectRequest?.objectKind, participant?.addedObjectRequest?.objectPerson,
            participant?.addedObjectRequest?.governor, formation?.citedNonspecificObjectObserved,
        ], ["3sg", "1sg", 0, 1, true, "specific-projective", "3sg", "causative", false]);
    }
    const constitution = valueFor("cehui", "sourceConstitution");
    s.eq("ce-ē-hui constitution preserves corrected long ē and all three ranked morphemes", [
        constitution?.sourceAnalysis?.segments, constitution?.reconstructedSourceStem,
        constitution?.underlyingMorphology,
    ], [["ce", "ē", "hui"], "ce-ē-hui", { root: "ce", stockFormative: "ē", stemFormative: "hui" }]);
    s.eq("a lexical source cannot request another source's proof coordinate", [
        receipt("mini", ATOMS[2][1]).result.authorizationStatus,
        receipt("cehui", ATOMS[0][1]).result.authorizationStatus,
    ], ["blocked", "blocked"]);
    s.eq("example parents, notation, meanings, and cited objects receive no accidental structural receipt", [
        ["mini", "aci-p204-l002-61a69ed581"],
        ["mini", "aci-p204-l002-61a69ed581-02"],
        ["mini", "aci-p204-l002-61a69ed581-04"],
        ["mini", "aci-p204-l002-61a69ed581-06"],
        ["cehui", "aci-p204-l004-ae01b03f8b-12"],
    ].map(([lexeme, facet]) => receipt(lexeme, facet).result.authorizationStatus), Array(5).fill("blocked"));
    s.eq("copying an owner Source or Result cannot mint proof authority", [
        ctx[`evaluate${PREFIX}`](JSON.parse(JSON.stringify(receipts[0].source))).authorizationStatus,
        ctx[`is${PREFIX}Result`](JSON.parse(JSON.stringify(receipts[0].result))),
        ctx[`is${PREFIX}ExecutionEvidence`](JSON.parse(JSON.stringify(receipts[0].evidence)), receipts[0].result),
    ], ["blocked", false, false]);
    return s;
}

module.exports = { run };
