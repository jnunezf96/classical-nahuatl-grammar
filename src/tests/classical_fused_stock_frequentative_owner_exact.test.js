"use strict";

const { createSuite } = require("./runner");
const OWNER = "classical-fused-stock-vowel-frequentative";
const PREFIX = "ClassicalFusedStockVowelFrequentative";
const ATOMS = [
    ["claim-p2700", "aci-p247-l033-8eeeaac63f-fused-source-frequentative-formation-scope", "formationScope", "p2700-there-are-irregular-frequentative-stem-formations-based-on-the"],
    ["claim-p2701", "aci-p247-l034-5663d65b8d-fused-vowel-remains-long", "longVowelRetention", "p2701-in-the-frequentative-stem-this-fused-vowel-remains-long"],
];

function run(ctx = {}) {
    const s = createSuite("classical_fused_stock_frequentative_owner_exact");
    const receipt = (selection, facet) => {
        const source = ctx[`build${PREFIX}Source`]({
            analysisDomain: OWNER, selection, requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx[`evaluate${PREFIX}`](source);
        return { source, result, evidence: ctx[`get${PREFIX}ExecutionEvidence`](result) };
    };
    const receipts = ATOMS.map(([selection, facet]) => receipt(selection, facet));
    ATOMS.forEach(([selection, facet, leaf, oldFacet], index) => {
        const { result, evidence } = receipts[index];
        const path = `constraints.fusedStockVowelFrequentativeSystem.${leaf}`;
        s.eq(`${facet} directly observes the typed rule and actual Results`, [
            result.authorizationStatus, result.payload.effectiveCanonicalPath,
            result.payload.sourceCanonicalPath, result.payload.proofObservationKind,
            ctx[`is${PREFIX}Result`](result), ctx[`is${PREFIX}ExecutionEvidence`](evidence, result),
        ], ["authorized", path, path, "direct-canonical-result-observation", true, true]);
        const old = receipt(selection, oldFacet).result;
        s.eq(`${selection} retains its permanent legacy identity with the exact new observation`,
            [old.authorizationStatus, old.payload.effectiveCanonicalPath, old.payload.facetValue],
            ["authorized", path, result.payload.facetValue]);
    });
    const scope = receipts[0].result.payload.facetValue;
    const retention = receipts[1].result.payload.facetValue;
    s.eq("formation scope includes both ca and tz-a, not one surviving example", scope?.rule, {
        formationKind: "irregular-fused-source-frequentative",
        sourceAnalysisKind: "destockal-root-stock-vowel-coalescence",
        outputFamilies: [
            { kind: "intransitive-frequentative", formative: "ca" },
            { kind: "causative-frequentative", formative: "tz-a" },
        ],
    });
    s.eq("normal long retention leaves exact lexical exceptions with their own authority", retention?.rule, {
        inputUnit: "fused-root-stock-vowel", inputQuantity: "long", normalOutputQuantity: "long",
        outputFamilies: ["intransitive-ca", "causative-tz-a"],
        exceptionAuthority: "exact-signed-lexical-analysis",
    });
    s.eq("both owner observations cover the actual fused-source operations",
        [scope?.sourceRelations.map(item => item.exact), retention?.observations.map(item => item.exact)],
        [Array(7).fill(true), Array(7).fill(true)]);
    const evaluate = (sourceStem, variant = "destockal-intransitive", verbClass = "B", extra = {}) => {
        const causative = variant === "destockal-causative";
        return ctx.evaluateClassicalNahuatlLateVncDerivation({
            sourceStem, verbClass, sourceValence: causative ? "specific-projective" : "intransitive",
            objectKind: causative ? "specific-projective" : "none", objectPerson: causative ? "3sg" : "",
            subject: "3sg", mood: "indicative", tense: "present", derivationType: "direct", voice: "active",
            lateOperation: "frequentative", lateVariant: variant, ...extra,
        });
    };
    let sharedRule = null;
    for (const [source, variant, sourceClass, target, targetClass] of [
        ["xa-ā-ni", "destockal-intransitive", "B", "xa-xā-ca", "A"],
        ["xe-ē-hui", "destockal-intransitive", "B", "xe-xē-ca", "A"],
        ["xi-ī-ni", "destockal-intransitive", "B", "xi-xī-ca", "A"],
        ["xo-ō-hui", "destockal-intransitive", "B", "xo-xō-ca", "A"],
        ["xo-ō-n-a", "destockal-causative", "B", "xo-xō-tz-a", "B"],
        ["xi-ī-ni-ā", "destockal-causative", "C", "xi-xī-tz-a", "B"],
        ["xe-ē-hu-a", "destockal-causative", "B", "xe-xē-tz-a", "B"],
    ]) {
        const frame = evaluate(source, variant, sourceClass);
        const op = frame.operationFrame;
        const relation = op.operationFacts.fusedStockFrequentativeFrame;
        if (!sharedRule && relation) sharedRule = relation.ruleContract;
        s.eq(`${source}: one typed relation drives the proper target family`, [
            frame.authorizationStatus, ctx.isClassicalNahuatlClosureFrame(frame),
            ctx.isClassicalNahuatlOperationFrame(op), op.targetStem, op.targetClass,
            relation?.ruleContract === sharedRule,
            relation?.sourceAgreementFrame.sourceStem === op.sourceStem,
            relation?.formation.retainedStock === relation?.sourceCoalescenceFrame.resultStock,
            relation?.formation.targetStem, relation?.formation.stockQuantity,
            op.operationFacts.stockLongVowelReduced,
            frame.formulaRealization.includes(`(${target})`),
            frame.surfaceRealization.endsWith(target.replaceAll("-", "")),
            frame.finiteSurfaceFrame.formulaDerivedFromWrittenProjection,
            frame.finiteSurfaceFrame.writtenDerivedFromFormulaProjection,
        ], ["authorized", true, true, target, targetClass, true, true, true,
            target, "long", false, true, true, false, false]);
    }
    s.eq("known contracted source spellings use their canonical reconstruction",
        [["mī-ni", "mi-mī-ca"], ["cē-hui", "ce-cē-ca"], ["ce-ē-hui", "ce-cē-ca"]].map(([stem, target]) => {
            const frame = evaluate(stem);
            return [frame.authorizationStatus, frame.operationFrame.targetStem === target,
                Boolean(frame.operationFrame.operationFacts.fusedStockFrequentativeFrame)];
        }), Array.from({ length: 3 }, () => ["authorized", true, true]));
    s.eq("editorial hyphens do not control the causative fused-stock rule", [
        ["xoōna", "B", "xo-xō-tz-a"],
        ["xiīniā", "C", "xi-xī-tz-a"],
        ["xeēhua", "B", "xe-xē-tz-a"],
    ].map(([stem, sourceClass, target]) => {
        const frame = evaluate(stem, "destockal-causative", sourceClass);
        return [frame.authorizationStatus, frame.operationFrame.targetStem === target,
            Boolean(frame.operationFrame.operationFacts.fusedStockFrequentativeFrame)];
    }), Array.from({ length: 3 }, () => ["authorized", true, true]));
    s.eq("repetition composes with the retained fused vowel", (() => {
        const frame = evaluate("xe-ē-hui", "destockal-intransitive", "B", { frequentativeRepetitions: 2 });
        return [frame.authorizationStatus, frame.operationFrame.targetStem];
    })(), ["authorized", "xe-xe-xē-ca"]);
    s.eq("both output classes keep their ordinary preterit behavior", [
        evaluate("xe-ē-hui", "destockal-intransitive", "B", { tense: "preterit" }),
        evaluate("xo-ō-n-a", "destockal-causative", "B", { tense: "preterit" }),
    ].map(frame => [frame.authorizationStatus, frame.surfaceRealization]),
    [["authorized", "xexēcac"], ["authorized", "quixoxōtz"]]);
    s.eq("ordinary and nonmatching stocks keep normal reduction without claiming fusion",
        ["xap-ā-ni", "xa-ē-hui", "xā-ā-ni"].map(stem => {
            const frame = evaluate(stem);
            return [frame.authorizationStatus, frame.operationFrame.operationFacts.stockLongVowelReduced,
                Boolean(frame.operationFrame.operationFacts.fusedStockFrequentativeFrame)];
        }), Array.from({ length: 3 }, () => ["authorized", true, false]));
    s.eq("ordinary causative stock reduction remains productive", (() => {
        const frame = evaluate("xap-ō-n-a", "destockal-causative");
        return [frame.authorizationStatus, frame.operationFrame.targetStem,
            frame.operationFrame.operationFacts.stockLongVowelReduced,
            Boolean(frame.operationFrame.operationFacts.fusedStockFrequentativeFrame)];
    })(), ["authorized", "xa-xap-o-tz-a", true, false]);
    s.eq("completed corrected long-i and historical po lineages are not overwritten", [
        evaluate("pi-pī-tza", "destockal-lexicalized", "B", { sourceValence: "specific-projective", objectKind: "specific-projective", objectPerson: "3sg" }),
        evaluate("po-pō-ca", "destockal-lexicalized", "A"),
    ].map(frame => [frame.authorizationStatus, frame.operationFrame.targetStem,
        Boolean(frame.operationFrame.operationFacts.nonextantSourceLifecycleFrame)]),
    [["authorized", "pi-pī-tza", false], ["authorized", "po-pō-ca", true]]);
    s.eq("the user-corrected pi-pī-tza retains long ī in both accepted segmentations", [
        "pi-pī-tza", "pi-pī-tz-a",
    ].map(sourceStem => {
        const app = ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem, verbClass: "B", sourceValence: "specific-projective", objectKind: "specific-projective",
            objectPerson: "3sg", sourceSubject: "3sg", subject: "3sg", requestedDerivation: "direct",
            requestedVoice: "active", mood: "indicative", tense: "present", outputScope: "single",
        });
        return [app.authorizationStatus, ctx.isClassicalNahuatlVncApplicationFrame(app),
            app.resultFrame.surfaceRealization];
    }), [["authorized", true, "quipipītza"], ["authorized", true, "quipipītza"]]);
    s.eq("pi plus long stock ī follows the productive long-vowel causative frequentative rule", (() => {
        const frame = evaluate("pi-ī-n-a", "destockal-causative");
        return [frame.authorizationStatus, frame.operationFrame.targetStem, frame.surfaceRealization,
            frame.operationFrame.operationFacts.stockLongVowelReduced];
    })(), ["authorized", "pi-pī-tz-a", "quipipītza", false]);
    const actual = evaluate("xe-ē-hui");
    const injected = evaluate("xap-ā-ni", "destockal-intransitive", "B", {
        fusedStockFrequentativeFrame: actual.operationFrame.operationFacts.fusedStockFrequentativeFrame,
    });
    s.eq("injected or copied frames do not confer a fused-source rule or owner authority", [
        injected.operationFrame.targetStem, Boolean(injected.operationFrame.operationFacts.fusedStockFrequentativeFrame),
        ctx.isClassicalNahuatlOperationFrame(JSON.parse(JSON.stringify(actual.operationFrame))),
        ctx.isClassicalNahuatlClosureFrame(JSON.parse(JSON.stringify(actual))),
        ctx[`evaluate${PREFIX}`](JSON.parse(JSON.stringify(receipts[0].source))).authorizationStatus,
        ctx[`is${PREFIX}Result`](JSON.parse(JSON.stringify(receipts[0].result))),
    ], ["xa-xap-a-ca", false, false, false, "blocked", false]);
    return s;
}

module.exports = { run };
