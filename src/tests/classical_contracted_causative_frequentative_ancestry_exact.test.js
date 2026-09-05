"use strict";

const { createSuite } = require("./runner");
const identity = value => String(value || "").normalize("NFC").replaceAll("-", "");

function run(ctx = {}) {
    const s = createSuite("classical_contracted_causative_frequentative_ancestry_exact");
    const evaluate = (sourceStem, verbClass = "B", extra = {}) => ctx.evaluateClassicalNahuatlLateVncDerivation({
        sourceStem, verbClass, sourceValence: "specific-projective", objectKind: "specific-projective", objectPerson: "3sg",
        subject: "3sg", mood: "indicative", tense: "present", derivationType: "direct", voice: "active",
        lateOperation: "frequentative", lateVariant: "destockal-causative", ...extra,
    });
    const fixtures = [
        ["mī-n-a", "B", "mīni", "mi", "ī", "mi-mī-tz-a", "quimimītza"],
        ["xī-ni-ā", "C", "xīni", "xi", "ī", "xi-xī-tz-a", "quixixītza"],
    ];
    const frames = fixtures.map(([stem, verbClass]) => evaluate(stem, verbClass));
    fixtures.forEach(([stem, verbClass, recovered, root, stock, target, surface], index) => {
        const frame = frames[index];
        const op = frame.operationFrame;
        const fused = op?.operationFacts?.fusedStockFrequentativeFrame;
        const ancestry = fused?.causativeSourceAncestryFrame;
        const inventory = ancestry?.derivationOptionInventory;
        const analysis = ancestry?.sourceAnalysisFrame?.analyses?.find(item => item.analysisId === ancestry.sourceAnalysisId);
        s.eq(`${stem}: forward-verified ancestry supplies the retained stock`, [
            frame.authorizationStatus, ctx.isClassicalNahuatlClosureFrame(frame), ctx.isClassicalNahuatlOperationFrame(op),
            op?.targetStem, frame.surfaceRealization, op?.operationFacts?.stockLongVowelReduced,
            ancestry?.authorizationStatus, identity(ancestry?.recoveredSourceStem), analysis?.lexicalStatus,
            analysis?.root, analysis?.stockFormative, analysis?.stemFormative,
            ancestry?.sourceCoalescenceFrame === fused?.sourceCoalescenceFrame,
            fused?.formation?.retainedStock, ancestry?.interpretation,
        ], ["authorized", true, true, target, surface, false, "authorized", recovered,
            "lexically-licensed-source-analysis", root, stock, "ni", true, `${root.slice(0, -1)}${stock}`,
            "available-source-analysis"]);
        s.eq(`${stem}: inventory, option, analysis, and actual source retain canonical identity`, [
            ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
            ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(ancestry?.sourceAnalysisFrame),
            inventory?.sourceAnalysisFrame === ancestry?.sourceAnalysisFrame,
            ancestry?.selectedOption?.sourceAnalysisFrame?.canonicalSignature === ancestry?.sourceAnalysisFrame?.canonicalSignature,
            inventory?.sourceMachineryFrame === ancestry?.sourceMachineryFrame,
            inventory?.options?.includes(ancestry?.selectedOption),
            ancestry?.selectedOption?.sourceAnalysisId === ancestry?.sourceAnalysisId,
            identity(ancestry?.selectedOption?.targetStem), ancestry?.selectedOption?.targetClass,
            ancestry?.actualCausativeSourceStem, ancestry?.actualCausativeSourceClass,
            ancestry?.sourceAgreementFrame === fused?.sourceAgreementFrame,
            ancestry?.forwardTargetIdentityMatches,
        ], [true, true, true, true, true, true, true, identity(stem), verbClass, stem, verbClass, true, true]);
        const lexeme = index === 0 ? "mini" : "xini";
        s.eq(`${stem}: the exact licensed ancestry and forward procedure are independently pinned`, [
            analysis?.analysisId, analysis?.category, analysis?.analysisAuthority, analysis?.segments,
            analysis?.destockalStructureFrame?.typeId, ancestry?.sourceAnalysisFrame?.callerSuppliedAnalysisAllowed,
            ancestry?.selectedOption?.ruleId, ancestry?.selectedOption?.derivationRoute,
            ancestry?.selectedOption?.targetConstruction?.operation,
            ancestry?.selectedOption?.targetConstruction?.underlyingSource, ancestry?.selectedOption?.exactWitness,
        ], [`cn-l24-2459-${lexeme}-fused-destockal:fused-destockal-ni-exact`, "fused-destockal-ni-exact",
            "typed-lexical-source-analysis", [root, stock, "ni"], "long-vowel-ni-or-hui", false,
            index === 0 ? "cn-l24-2459-mini-mi-n-a" : "cn-l24-2459-xini-xi-ni-a",
            `type-one-fused-destockal-${lexeme}-${index === 0 ? "replacement" : "addition"}-exact`,
            index === 0 ? "recover-fused-stock-and-replace" : "recover-fused-stock-and-append",
            `${root}-${stock}-ni`, true]);
    });
    s.eq("editorial hyphens do not supply or remove contracted ancestry", [
        evaluate("mīna"), evaluate("xīniā", "C"),
    ].map(frame => [frame.authorizationStatus, frame.operationFrame?.targetStem,
        Boolean(frame.operationFrame?.operationFacts?.fusedStockFrequentativeFrame?.causativeSourceAncestryFrame)]),
    [["authorized", "mi-mī-tz-a", true], ["authorized", "xi-xī-tz-a", true]]);
    s.eq("ordinary preterit inflection preserves the recovered long stock", [
        evaluate("mī-n-a", "B", { tense: "preterit" }), evaluate("xī-ni-ā", "C", { tense: "preterit" }),
    ].map(frame => [frame.authorizationStatus, frame.surfaceRealization,
        Boolean(frame.operationFrame?.operationFacts?.fusedStockFrequentativeFrame?.causativeSourceAncestryFrame)]),
    [["authorized", "quimimītz", true], ["authorized", "quixixītz", true]]);
    s.eq("explicit root-plus-stock input and contracted input converge without surface authority", [
        evaluate("mi-ī-n-a"), evaluate("xi-ī-ni-ā", "C"),
    ].map((frame, index) => [frame.authorizationStatus, frame.operationFrame?.targetStem === frames[index].operationFrame?.targetStem,
        frame.surfaceRealization === frames[index].surfaceRealization,
        frame.finiteSurfaceFrame?.formulaDerivedFromWrittenProjection, frame.finiteSurfaceFrame?.writtenDerivedFromFormulaProjection]),
    Array.from({ length: 2 }, () => ["authorized", true, true, false, false]));
    s.eq("ordinary non-fused causatives retain their normal stock reduction", (() => {
        const frame = evaluate("xap-ā-n-a");
        return [frame.authorizationStatus, frame.operationFrame?.targetStem, frame.operationFrame?.operationFacts?.stockLongVowelReduced,
            Boolean(frame.operationFrame?.operationFacts?.fusedStockFrequentativeFrame)];
    })(), ["authorized", "xa-xap-a-tz-a", true, false]);
    s.eq("unknown contracted and short-stock inputs stay open without a borrowed ancestry", [
        evaluate("xā-n-a"), evaluate("mi-n-a"), evaluate("xi-ni-ā", "C"),
    ].map(frame => [frame.authorizationStatus, Boolean(frame.operationFrame?.operationFacts?.fusedStockFrequentativeFrame?.causativeSourceAncestryFrame)]),
    Array.from({ length: 3 }, () => ["authorized", false]));
    s.eq("a related hui source does not authorize the different hua ancestry", (() => {
        const frame = evaluate("cē-hu-a");
        return [frame.authorizationStatus, Boolean(frame.operationFrame?.operationFacts?.fusedStockFrequentativeFrame?.causativeSourceAncestryFrame)];
    })(), ["authorized", false]);
    s.eq("the unlisted hui-ā construction is not added by suffix analogy", (() => {
        const frame = evaluate("cē-hui-ā", "C");
        return [frame.authorizationStatus, frame.blockReason];
    })(), ["blocked", "destockal-causative-source-required"]);
    s.eq("reduplication composes with the recovered stock rather than replaying an answer", (() => {
        const frame = evaluate("mī-n-a", "B", { frequentativeRepetitions: 2 });
        return [frame.authorizationStatus, frame.operationFrame?.targetStem, frame.surfaceRealization];
    })(), ["authorized", "mi-mi-mī-tz-a", "quimimimītza"]);
    s.eq("actual subject and nonspecific-object choices survive the ancestry repair", (() => {
        const frame = evaluate("mī-n-a", "B", {
            subject: "1sg", sourceValence: "projective-nonhuman", objectKind: "nonspecific-nonhuman", objectPerson: "",
        });
        return [frame.authorizationStatus, frame.surfaceRealization,
            frame.operationFrame?.targetTypedVncSlotFrame === frame.finalTypedVncSlotFrame,
            frame.finiteSurfaceFrame?.formulaDerivedFromWrittenProjection, frame.finiteSurfaceFrame?.writtenDerivedFromFormulaProjection];
    })(), ["authorized", "nitlamimītza", true, false, false]);
    const canonical = frames[0];
    const ancestry = canonical.operationFrame?.operationFacts?.fusedStockFrequentativeFrame?.causativeSourceAncestryFrame;
    const injected = evaluate("xap-ā-n-a", "B", {
        causativeSourceAncestryFrame: ancestry,
        fusedStockFrequentativeFrame: canonical.operationFrame?.operationFacts?.fusedStockFrequentativeFrame,
    });
    s.eq("caller-supplied ancestry does not turn an ordinary source into a fused one", [
        injected.authorizationStatus, injected.operationFrame?.targetStem,
        Boolean(injected.operationFrame?.operationFacts?.fusedStockFrequentativeFrame),
    ], ["authorized", "xa-xap-a-tz-a", false]);
    s.eq("copies do not mint canonical operation, closure, analysis, or inventory authority", [
        ctx.isClassicalNahuatlOperationFrame(JSON.parse(JSON.stringify(canonical.operationFrame))),
        ctx.isClassicalNahuatlClosureFrame(JSON.parse(JSON.stringify(canonical))),
        ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(ancestry ? JSON.parse(JSON.stringify(ancestry.sourceAnalysisFrame)) : null),
        ctx.isClassicalNahuatlVncDerivationOptionInventory(ancestry ? JSON.parse(JSON.stringify(ancestry.derivationOptionInventory)) : null),
    ], [false, false, false, false]);
    s.eq("the recovered analysis supplies no input gate or formula/surface/example authority", frames.map(frame => {
        const relation = frame.operationFrame?.operationFacts?.fusedStockFrequentativeFrame?.causativeSourceAncestryFrame;
        return [relation?.sourceAdmissionAuthority, relation?.callerSuppliedGrammarAuthority,
            relation?.formulaStringAuthority, relation?.surfaceStringAuthority, relation?.canvasExampleAuthority];
    }), Array.from({ length: 2 }, () => [false, false, false, false, false]));
    return s;
}

module.exports = { run };
