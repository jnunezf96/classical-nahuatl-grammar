"use strict";

const { createSuite } = require("./runner");
const OWNER = "classical-destockal-ni-hui-lexical-inventory";
const BASE = "constraints.destockalNiHuiLexicalInventory.entries";
const ATOMS = [
    ["claim-p2319", "aci-p201-l023-af06ca7748-tlatzini-bursting-explosive-noise-reading", "tlatzini.readings.0", "make-a-bursting-or-explosive-noise"],
    ["claim-p2326", "aci-p202-l018-e2b0e76f50-olini-move-reading", "olini.readings.0", "move"],
    ["claim-p2326", "aci-p202-l018-e2b0e76f50-02-olini-move-along-a-path-reading", "olini.readings.1", "move-along-a-path"],
    ["claim-p2326", "aci-p202-l018-e2b0e76f50-03-olini-tremble-or-quake-reading", "olini.readings.2", "tremble-or-quake"],
    ["claim-p2326", "aci-p202-l018-e2b0e76f50-04-olini-long-root-vowel-quantity", "olini.sourceFrame.rootVowelQuantity", "long"],
];

function run(ctx = {}) {
    const s = createSuite("classical_ni_stock_ocr_corrections_exact");
    const receipt = (selection, facet) => {
        const source = ctx.buildClassicalDestockalNiHuiLexicalInventorySource({
            analysisDomain: OWNER, selection, requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx.evaluateClassicalDestockalNiHuiLexicalInventory(source);
        const evidence = ctx.getClassicalDestockalNiHuiLexicalInventoryExecutionEvidence(result);
        return { source, result, evidence };
    };
    const receipts = ATOMS.map(([selection, facet]) => receipt(selection, facet));
    ATOMS.forEach(([, facet, path, value], index) => {
        const { result, evidence } = receipts[index];
        s.eq(`${facet} has an exact signed observation`, {
            status: result.authorizationStatus, path: result.payload.effectiveCanonicalPath,
            sourcePath: result.payload.sourceCanonicalPath, value: result.payload.facetValue,
            kind: result.payload.proofObservationKind,
            canonical: ctx.isClassicalDestockalNiHuiLexicalInventoryResult(result),
            evidence: ctx.isClassicalDestockalNiHuiLexicalInventoryExecutionEvidence(evidence, result),
        }, {
            status: "authorized", path: `${BASE}.${path}`, sourcePath: `${BASE}.${path}`,
            value, kind: "direct-canonical-result-observation", canonical: true, evidence: true,
        });
    });
    const constraint = receipts[0].result.payload.definition.constraints.destockalNiHuiLexicalInventory;
    s.eq("both corrected lexical entries retain long ī and their different root conditions", constraint.entries, {
        tlatzini: {
            sourceFrame: { stem: "tlatz-ī-ni", root: "tlatz", rootVowel: "a", rootVowelQuantity: "short", stockFormative: "ī", stemFormative: "ni", exceptionKind: "stock-vowel-harmony-exception" },
            readings: ["make-a-bursting-or-explosive-noise"],
        },
        olini: {
            sourceFrame: { stem: "ōl-ī-ni", root: "ōl", rootVowel: "ō", rootVowelQuantity: "long", stockFormative: "ī", stemFormative: "ni", exceptionKind: "long-root-outside-normal-short-root-domain" },
            readings: ["move", "move-along-a-path", "tremble-or-quake"],
        },
    });
    for (const [selection, facet, key] of [
        ["claim-p2319", "p2319-tlatz-i-ni-to-make-a-bursting-explosive-noise", "tlatzini"],
        ["claim-p2326", "p2326-o-l-i-ni-to-move-to-move-along", "olini"],
    ]) {
        const { result } = receipt(selection, facet);
        s.eq(`${selection} retains its permanent identity with corrected content`,
            [result.authorizationStatus, result.payload.effectiveCanonicalPath, result.payload.facetValue],
            ["authorized", `${BASE}.${key}`, constraint.entries[key]]);
    }
    const source = stem => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg", mood: "indicative", tense: "present", verbClass: "B",
        valence: "intransitive", transitivity: "intransitive", objectKind: "none",
    });
    const analyze = stem => {
        const frame = ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source(stem));
        return { frame, analysis: frame.analyses[0] };
    };
    for (const [stem, root] of [["tlatz-ī-ni", "tlatz"], ["tlatzīni", "tlatz"], ["ōl-ī-ni", "ōl"], ["ōlīni", "ōl"]]) {
        const { frame, analysis } = analyze(stem);
        const harmony = analysis.stockVowelHarmonyFrame;
        s.eq(`${stem} has signed long-stock analysis independent of hyphens`, {
            canonical: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(frame),
            source: frame.sourceStem, segments: analysis.segments,
            type: analysis.destockalStructureFrame?.typeId,
            stock: analysis.destockalStructureFrame?.steps.stockFormation.formative,
            relation: harmony.relation, lexical: analysis.lexicalStatus,
            shortStockFrame: analysis.stockQuantityFrame || null,
        }, {
            canonical: true, source: `${root}-ī-ni`, segments: [root, "ī", "ni"],
            type: "long-vowel-ni-or-hui", stock: "ī",
            relation: root === "tlatz" ? "exceptional-stock-vowel-analysis" : "outside-normal-short-root-domain",
            lexical: "lexically-licensed-source-analysis", shortStockFrame: null,
        });
    }
    const application = (stem, extra = {}) => ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: stem, verbClass: "B", sourceValence: "intransitive",
        sourceSubject: "3sg", subject: "3sg", requestedDerivation: "direct",
        requestedVoice: "active", outputScope: "single", ...extra,
    });
    s.eq("Source display and direct Result preserve both corrected stock vowels",
        ["tlatz-ī-ni", "ōl-ī-ni"].map(stem => {
            const display = ctx.buildClassicalNahuatlVncSourceConstitutionProjection({ sourceStem: stem, verbClass: "B", sourceValence: "intransitive", requestedDerivation: "direct" }, ctx);
            const app = application(stem);
            return [display.parts.map(p => [p.segment, p.role]), display.grammarAuthority,
                app.authorizationStatus, app.resultFrame.formulaRealization, app.resultFrame.surfaceRealization];
        }), [
            [[["tlatz", "root"], ["ī", "stock formative"], ["ni", "stem formative"]], false, "authorized", "#0-0(tlatz-ī-ni)0+0-0#", "tlatzīni"],
            [[["ōl", "root"], ["ī", "stock formative"], ["ni", "stem formative"]], false, "authorized", "#0-0(ōl-ī-ni)0+0-0#", "ōlīni"],
        ]);
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source("ōl-ī-ni"), { derivationType: "causative" });
    const exact = inventory.options.find(o => o.derivationRoute === "type-one-destockal-ni-addition-exact-quantity");
    const derived = application("ōl-ī-ni", { requestedDerivation: "causative", derivationOptionId: exact?.optionId || "missing", subject: "1sg", causativeObjectKind: "specific-projective" });
    s.eq("the canonical causative preserves the corrected long stock vowel", {
        canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
        target: exact?.targetStem, status: derived.authorizationStatus,
        formula: derived.resultFrame.formulaRealization, surface: derived.resultFrame.surfaceRealization,
    }, { canonical: true, target: "ōl-ī-ni-ā", status: "authorized", formula: "#ni-0+c-0(ōl-ī-ni-a)0+0-0#", surface: "nicōlīnia" });
    const impersonal = application("tlatz-ī-ni", { requestedVoice: "impersonal", tense: "preterit", nonactiveOptionId: "tla-impersonal" });
    s.eq("the impersonal operation prefixes tla without inventing stock lengthening",
        [ctx.getClassicalNahuatlTlaImpersonalSourceAnalysis("tlatz-ī-ni").realizationRuleId,
            impersonal.authorizationStatus, impersonal.resultFrame.formulaRealization, impersonal.resultFrame.surfaceRealization],
        ["prefix-tla", "authorized", "#0-0(tla-tlatz-ī-n)0+⎕-0#", "tlatlatzīn"]);
    const resolve = enteredStem => ctx.resolveClassicalNahuatlCanonicalSourceStemRecord({ enteredStem, basalUnit: "vnc", valence: "intransitive" });
    s.eq("the source catalog and unmarked aliases use the corrected lexical vowels",
        ["tlatz-ī-ni", "tlatzini", "ōl-ī-ni", "olini"].map(stem => resolve(stem)?.stem),
        ["tlatz-ī-ni", "tlatz-ī-ni", "ōl-ī-ni", "ōl-ī-ni"]);
    const open = application("xap-i-ni");
    s.eq("lexical corrections do not gate an unlisted typed source",
        [open.authorizationStatus, open.resultFrame.formulaRealization, open.resultFrame.surfaceRealization],
        ["authorized", "#0-0(xap-i-ni)0+0-0#", "xapini"]);
    const original = receipts[0];
    s.eq("copied evidence and source cannot mint lexical authority", [
        ctx.evaluateClassicalDestockalNiHuiLexicalInventory(JSON.parse(JSON.stringify(original.source))).authorizationStatus,
        ctx.isClassicalDestockalNiHuiLexicalInventoryResult(JSON.parse(JSON.stringify(original.result))),
        ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(JSON.parse(JSON.stringify(analyze("ōl-ī-ni").frame))),
        Object.isFrozen(constraint), constraint.lexicalReadingsGrammarAuthority,
    ], ["blocked", false, false, true, false]);
    return s;
}

module.exports = { run };
