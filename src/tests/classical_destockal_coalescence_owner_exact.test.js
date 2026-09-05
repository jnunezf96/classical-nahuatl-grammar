"use strict";

const { createSuite } = require("./runner");
const OWNER = "classical-destockal-irregular-source-lifecycle";
const PREFIX = "ClassicalDestockalIrregularSourceLifecycle";
const BASE = "constraints.destockalIrregularSourceLifecycle.coalescedStockSystem";
const ATOMS = [
    ["aci-p203-l023-c42fb7761b-irregular-coalesced-stock-system", ""],
    ["aci-p203-l023-4a6f6cc3be-root-final-vowel-condition", ".condition.rootEndsInVowel"],
    ["aci-p203-l023-4a6f6cc3be-02-identical-root-and-stock-vowels", ".condition.rootFinalVowelMatchesStockFormative"],
    ["aci-p203-l023-4a6f6cc3be-03-identical-vowel-coalescence-realization", ".realization"],
];

function run(ctx = {}) {
    const s = createSuite("classical_destockal_coalescence_owner_exact");
    const receipt = (facet, selection = "claim-p2343") => {
        const source = ctx[`build${PREFIX}Source`]({
            analysisDomain: OWNER, selection, requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx[`evaluate${PREFIX}`](source);
        return { source, result, evidence: ctx[`get${PREFIX}ExecutionEvidence`](result) };
    };
    const receipts = ATOMS.map(([facet]) => receipt(facet));
    ATOMS.forEach(([facet, path], index) => {
        const { result, evidence } = receipts[index];
        s.eq(`${facet} observes its exact signed relation`, [
            result.authorizationStatus, result.payload.effectiveCanonicalPath,
            result.payload.sourceCanonicalPath, result.payload.proofObservationKind,
            ctx[`is${PREFIX}Result`](result), ctx[`is${PREFIX}ExecutionEvidence`](evidence, result),
        ], ["authorized", `${BASE}${path}`, `${BASE}${path}`,
            "direct-canonical-result-observation", true, true]);
    });
    const legacy = receipt("p2343-there-are-a-few-irregular-destockal-verbstems-of-the");
    s.eq("the permanent legacy claim now observes the general rule, not the mini example route", [
        legacy.result.authorizationStatus, legacy.result.payload.effectiveCanonicalPath,
        legacy.result.payload.facetValue,
    ], ["authorized", BASE, receipts[0].result.payload.facetValue]);
    // Validation stays private to the owner. Test its public signed receipt.
    const system = receipts[0].result.payload.facetValue;
    s.eq("the shared rule explicitly preserves the hidden two-step morphology", {
        canonical: ctx[`is${PREFIX}Result`](receipts[0].result),
        families: system.ruleContract?.affectedStemFormativeFamilies,
        ranks: system.ruleContract?.rankSequence,
        obscured: system.ruleContract?.surfaceTwoStepStructureObscured,
        morphology: system.ruleContract?.underlyingMorphologyPreserved,
        formula: system.ruleContract?.formulaProjectionPreserved,
        admission: system.ruleContract?.sourceAdmissionAuthority,
        examples: system.ruleContract?.canvasExampleAuthority,
    }, {
        canonical: true, families: ["ni", "hui"], ranks: ["root", "stock", "intransitive-verbstem"],
        obscured: true, morphology: true, formula: true, admission: false, examples: false,
    });
    s.eq("vowel identity means quality, without collapsing the independent conditions", [
        receipts[1].result.payload.facetValue, receipts[2].result.payload.facetValue,
        system.condition,
    ], [true, true, {
        rootEndsInVowel: true, rootFinalVowelMatchesStockFormative: true,
        vowelMatchDimension: "quality-not-quantity",
    }]);
    const expected = [["a", "ā"], ["e", "ē"], ["i", "ī"], ["o", "ō"]]
        .flatMap(([short, long]) => ["ni", "hui"].map(theme => [
            true, `x${short}-${long}-${theme}`, short, long, theme,
            { root: `x${short}`, stockFormative: long, stemFormative: theme },
            `x${long}`, `#0-0(x${short}-${long}-${theme})0+0-0#`, `x${long}${theme}`,
        ]));
    s.eq("the owner observes both productive families across all four vowel qualities", [
        system.realization?.operation, system.realization?.underlyingVowelCount,
        system.realization?.surfaceVowelCount, system.realization?.outputConstituent,
        (system.realization?.observations || []).map(item => [
            item.exact, item.sourceStem, item.rootFinalVowel, item.stockFormative,
            item.stemFormative, item.underlyingMorphology, item.resultStock, item.formula, item.surface,
        ]),
    ], ["identical-vowel-coalescence", 2, 1, "surface-stock", expected]);
    const application = (stem, { verbClass = "B", tense = "present" } = {}) =>
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: stem, verbClass, sourceValence: "intransitive", sourceSubject: "3sg",
            subject: "3sg", requestedDerivation: "direct", requestedVoice: "active",
            mood: "indicative", tense, outputScope: "single",
        });
    const boundaryOf = app => app.resultFrame.finiteSurfaceFrame.neighboringBoundaries
        .find(boundary => boundary.coalescenceFrame);
    // These verify the productive boundary, not the separate lexical meanings
    // or exact causative preferences of the examples in §24.5.9.
    let liveRuleContract = null;
    for (const [stem, tense, formulaStem, surface, finiteTheme] of [
        ["mi-ī-ni", "present", "mi-ī-ni", "mīni", "ni"],
        ["mi-ī-ni", "preterit", "mi-ī-n", "mīn", "n"],
        ["xi-ī-ni", "preterit", "xi-ī-n", "xīn", "n"],
        ["xo-ō-hui", "preterit", "xo-ō-uh", "xōuh", "uh"],
    ]) {
        const app = application(stem, { tense });
        const boundary = boundaryOf(app);
        const relation = boundary?.coalescenceFrame;
        if (!liveRuleContract && relation) liveRuleContract = relation.ruleContract;
        s.eq(`${stem} ${tense} reaches the ordinary Result with an independent Formula`, [
            app.authorizationStatus, ctx.isClassicalNahuatlVncApplicationFrame(app),
            app.resultFrame.formulaRealization, app.resultFrame.surfaceRealization,
            relation?.finiteStemFormative, relation?.section, relation?.ruleContract === liveRuleContract,
            boundary?.applicableRuleFrames.includes(relation), boundary?.rightSurfaceAfter,
            boundary?.formulaCarrierChangedByWrittenBoundary,
            app.resultFrame.finiteSurfaceFrame.formulaDerivedFromWrittenProjection,
            app.resultFrame.finiteSurfaceFrame.writtenDerivedFromFormulaProjection,
        ], ["authorized", true, `#0-0(${formulaStem})0+${tense === "preterit" ? "⎕" : "0"}-0#`,
            surface, finiteTheme, "24.5.9", true, true, "", false, false, false]);
    }
    // Owner receipts intentionally strip documentary section metadata.
    s.eq("the receipt observes the same grammatical rule contract consumed by finite Results",
        system.ruleContract, JSON.parse(JSON.stringify(liveRuleContract,
            (key, value) => key === "section" ? undefined : value)));
    s.eq("mismatched quality, short stock, long root, and another theme stay outside this rule",
        ["xa-ī-ni", "xi-i-ni", "xī-ī-ni", "xi-ī-ya"].map(stem => {
            const app = application(stem);
            return [app.authorizationStatus, Boolean(boundaryOf(app))];
        }), Array.from({ length: 4 }, () => ["authorized", false]));
    const hua = application("ce-ē-hua", { verbClass: "A" });
    s.eq("the existing ē plus hua formation keeps its own family and section", [
        hua.authorizationStatus, hua.resultFrame.surfaceRealization,
        boundaryOf(hua)?.coalescenceFrame?.underlyingStemFormative,
        boundaryOf(hua)?.coalescenceFrame?.section,
    ], ["authorized", "cēhua", "hua", "24.6.2"]);
    const lifecycle = receipt("p2344-among-the-destockal-verbstems-with-ni-as-the-stem", "claim-p2344");
    s.eq("the separate nonextant-source request observes its own subsequently implemented lineage", [
        ctx[`is${PREFIX}Source`](lifecycle.source), lifecycle.result.authorizationStatus,
        ctx[`is${PREFIX}ExecutionEvidence`](lifecycle.evidence, lifecycle.result),
        lifecycle.result.payload.effectiveCanonicalPath,
    ], [true, "authorized", true, "constraints.destockalIrregularSourceLifecycle.nonextantNiSourceLifecycle"]);
    const app = application("mi-ī-ni");
    const editedSurface = JSON.parse(JSON.stringify(app.resultFrame.finiteSurfaceFrame));
    editedSurface.wordRealization = "miīni";
    s.eq("copied application, edited surface, and copied owner input cannot mint authority", [
        ctx.isClassicalNahuatlVncApplicationFrame(JSON.parse(JSON.stringify(app))),
        ctx.isClassicalNahuatlVncFiniteSurfaceFrame(editedSurface),
        ctx[`evaluate${PREFIX}`](JSON.parse(JSON.stringify(receipts[0].source))).authorizationStatus,
        ctx[`is${PREFIX}Result`](JSON.parse(JSON.stringify(receipts[0].result))),
    ], [false, false, "blocked", false]);
    return s;
}

module.exports = { run };
