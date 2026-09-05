"use strict";

const { createSuite } = require("./runner");
const OWNER = "classical-destockal-irregular-source-lifecycle";
const PREFIX = "ClassicalDestockalIrregularSourceLifecycle";
const FACET = "aci-p204-l005-94cd718f68-nonextant-ni-sources-retained-in-derived-stems";
const PATH = "constraints.destockalIrregularSourceLifecycle.nonextantNiSourceLifecycle";

function run(ctx = {}) {
    const s = createSuite("classical_nonextant_destockal_source_lifecycle_exact");
    const request = (sourceStem, overrides = {}) => ({
        sourceStem, sourceValence: "intransitive", verbClass: "A", subject: "3sg",
        mood: "indicative", tense: "present", derivationType: "direct", voice: "active",
        lateOperation: "frequentative", lateVariant: "destockal-lexicalized", ...overrides,
    });
    const evaluate = (stem, overrides = {}) => ctx.evaluateClassicalNahuatlLateVncDerivation(request(stem, overrides));
    const receipt = facet => {
        const source = ctx[`build${PREFIX}Source`]({
            analysisDomain: OWNER, selection: "claim-p2344", requestedFacet: facet,
            participantChoice: `claim-p2344:${facet}`,
        });
        const result = ctx[`evaluate${PREFIX}`](source);
        return { source, result, evidence: ctx[`get${PREFIX}ExecutionEvidence`](result) };
    };
    const direct = receipt(FACET);
    s.eq("the nonextant-source atom observes a signed dependency, not xini or a completion flag", [
        direct.result.authorizationStatus, direct.result.payload.effectiveCanonicalPath,
        direct.result.payload.sourceCanonicalPath, direct.result.payload.proofObservationKind,
        ctx[`is${PREFIX}Result`](direct.result), ctx[`is${PREFIX}ExecutionEvidence`](direct.evidence, direct.result),
    ], ["authorized", PATH, PATH, "direct-canonical-result-observation", true, true]);
    const legacy = receipt("p2344-among-the-destockal-verbstems-with-ni-as-the-stem");
    s.eq("the permanent legacy request now shares the exact lifecycle observation", [
        legacy.result.authorizationStatus, legacy.result.payload.effectiveCanonicalPath,
        legacy.result.payload.facetValue,
    ], ["authorized", PATH, direct.result.payload.facetValue]);
    const constraint = direct.result.payload.facetValue;
    s.eq("both observed sources exhaust the specific two-entry historical source system", [
        constraint?.sourceType, constraint?.entryCount,
        constraint?.sourceLifecycleSystem?.sources.map(source => [source.root, source.stockFormative, source.stemFormative]),
        constraint?.entries.map(entry => [entry.exact, entry.historicalSource.root,
            entry.historicalSource.independentUseStatus, entry.historicalSource.historicalStatus,
            entry.derivation.targetStem]),
    ], [
        { rank: "intransitive-destockal-verbstem", stemFormative: "ni" }, 2,
        [["po", "ō", "ni"], ["to", "ō", "ni"]],
        [[true, "po", "nonextant", "reconstructed-source", "po-pō-ca"],
            [true, "to", "nonextant", "reconstructed-source", "to-tō-ca"]],
    ]);
    const frames = [evaluate("po-pō-ca"), evaluate("to-tō-ca")];
    let system = null;
    frames.forEach((frame, index) => {
        const root = index ? "to" : "po";
        const fused = index ? "tō" : "pō";
        const operation = frame.operationFrame;
        const relation = operation.operationFacts.nonextantSourceLifecycleFrame;
        if (!system && relation) system = relation.sourceLifecycleSystem;
        s.eq(`${root}: the actual operation consumes its owner-held lexical ancestry`, [
            frame.authorizationStatus, ctx.isClassicalNahuatlClosureFrame(frame),
            ctx.isClassicalNahuatlOperationFrame(operation),
            relation?.sourceLifecycleSystem === system,
            system?.sources.includes(relation?.historicalSource),
            relation?.historicalSource.root, relation?.historicalSource.stockFormative,
            relation?.historicalSource.stemFormative,
            relation?.sourceCoalescenceFrame.resultStock,
            relation?.derivation,
            relation?.sourceAdmissionAuthority, relation?.canvasExampleAuthority,
            relation?.callerSuppliedGrammarAuthority,
        ], ["authorized", true, true, true, true, root, "ō", "ni", fused, {
            operation: "destockal-intransitive-frequentative", reduplicativePrefix: root,
            replacedStemFormative: "ni", targetStemFormative: "ca", targetClass: "A",
            targetStem: `${root}-${fused}-ca`, stockVowelPreserved: true,
        }, false, false, false]);
        s.eq(`${root}: constructed morphology reaches independent finite projections`, [
            operation.targetStem, operation.targetClass,
            operation.targetTypedVncSlotFrame === frame.finalTypedVncSlotFrame,
            frame.formulaRealization, frame.surfaceRealization,
            frame.finiteSurfaceFrame.formulaDerivedFromWrittenProjection,
            frame.finiteSurfaceFrame.writtenDerivedFromFormulaProjection,
        ], [`${root}-${fused}-ca`, "A", true, `#0-0(${root}-${fused}-ca)0+0-0#`, `${root}${fused}ca`, false, false]);
    });
    s.eq("the source lineage uses the same typed coalescence rule as ordinary boundary realization", (() => {
        const app = ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: "mi-ī-ni", verbClass: "B", sourceValence: "intransitive", subject: "3sg",
            requestedDerivation: "direct", requestedVoice: "active", mood: "indicative", tense: "present",
        });
        const boundary = app.resultFrame.finiteSurfaceFrame.neighboringBoundaries.find(item => item.coalescenceFrame);
        return [app.authorizationStatus, app.resultFrame.surfaceRealization,
            boundary?.coalescenceFrame.ruleContract === frames[0].operationFrame.operationFacts.nonextantSourceLifecycleFrame.sourceCoalescenceFrame.ruleContract];
    })(), ["authorized", "mīni", true]);
    for (const [stem, surface] of [["po-pō-ca", "popōcac"], ["to-tō-ca", "totōcac"]]) {
        const past = evaluate(stem, { tense: "preterit" });
        s.eq(`${stem}: the surviving derivative keeps normal Class A finite behavior`, [
            past.authorizationStatus, past.operationFrame.targetClass, past.surfaceRealization,
            Boolean(past.operationFrame.operationFacts.nonextantSourceLifecycleFrame),
        ], ["authorized", "A", surface, true]);
    }
    s.eq("other open completed sources do not inherit po/to nonextant ancestry",
        ["xa-xā-ca", "po-po-ca", "chi-chin-a-ca"].map(stem => {
            const frame = evaluate(stem);
            return [frame.authorizationStatus, frame.operationFrame.targetStem,
                Boolean(frame.operationFrame.operationFacts.nonextantSourceLifecycleFrame)];
        }), [["authorized", "xa-xā-ca", false], ["authorized", "po-po-ca", false],
            ["authorized", "chi-chin-a-ca", false]]);
    const ordinary = evaluate("xap-ā-ni", { verbClass: "B", lateVariant: "destockal-intransitive" });
    s.eq("ordinary productive stock reduction is not replaced by the lexical lifecycle rule", [
        ordinary.authorizationStatus, ordinary.operationFrame.targetStem,
        ordinary.operationFrame.operationFacts.stockLongVowelReduced,
        Boolean(ordinary.operationFrame.operationFacts.nonextantSourceLifecycleFrame),
    ], ["authorized", "xa-xap-a-ca", true, false]);
    const injected = evaluate("xa-xā-ca", {
        nonextantSourceLifecycleFrame: frames[0].operationFrame.operationFacts.nonextantSourceLifecycleFrame,
    });
    s.eq("caller-supplied lineage cannot turn another source into the historical po lexeme", [
        injected.authorizationStatus, injected.operationFrame.targetStem,
        Boolean(injected.operationFrame.operationFacts.nonextantSourceLifecycleFrame),
    ], ["authorized", "xa-xā-ca", false]);
    s.eq("copied closure, operation, and owner inputs do not carry canonical authority", [
        ctx.isClassicalNahuatlClosureFrame(JSON.parse(JSON.stringify(frames[0]))),
        ctx.isClassicalNahuatlOperationFrame(JSON.parse(JSON.stringify(frames[0].operationFrame))),
        ctx[`is${PREFIX}Result`](JSON.parse(JSON.stringify(direct.result))),
        ctx[`evaluate${PREFIX}`](JSON.parse(JSON.stringify(direct.source))).authorizationStatus,
    ], [false, false, false, "blocked"]);
    return s;
}

module.exports = { run };
