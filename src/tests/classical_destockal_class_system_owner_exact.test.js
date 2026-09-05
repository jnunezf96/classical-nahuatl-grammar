"use strict";

const { createSuite } = require("./runner");
const OWNERS = {
    source: ["classical-destockal-ni-hui-class-system", "ClassicalDestockalNiHuiClassSystem"],
    target: ["classical-destockal-causative-class-system", "ClassicalDestockalCausativeClassSystem"],
};
const ATOMS = [
    ["source", "claim-p2334", "aci-p203-l004-321dd44966-intransitive-destockal-ni-hui-class-b", "destockalNiHuiClassSystem.intransitiveClassAssignment", "p2334-intransitive-destockal-ni-and-hui-verbstems-belong-to-class"],
    ["source", "claim-p2335", "aci-p203-l005-ac982449b7-two-causative-procedures-with-lexical-preference", "destockalNiHuiClassSystem.causativeFormationAlternation", "p2335-in-order-to-form-the-first-type-causative-stem"],
    ["target", "claim-p2341", "aci-p203-l022-3ef3b0be62-replacement-causative-class-b", "destockalCausativeClassSystem.classAssignments.replacement", "p2341-causative-destockal-verbstems-of-the-n-a-and-hu"],
    ["target", "claim-p2342", "aci-p203-l022-f1ea346e69-addition-causative-class-c", "destockalCausativeClassSystem.classAssignments.addition", "p2342-those-of-the-ni-a-and-hui-a-kind"],
];

function run(ctx = {}) {
    const s = createSuite("classical_destockal_class_system_owner_exact");
    const receipt = (ownerKey, selection, facet) => {
        const [owner, prefix] = OWNERS[ownerKey];
        const source = ctx[`build${prefix}Source`]({
            analysisDomain: owner, selection, requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx[`evaluate${prefix}`](source);
        const evidence = ctx[`get${prefix}ExecutionEvidence`](result);
        return { source, result, evidence, prefix };
    };
    const receipts = ATOMS.map(([owner, selection, facet]) => receipt(owner, selection, facet));
    ATOMS.forEach(([owner, selection, facet, path, legacy], index) => {
        const { result, evidence, prefix } = receipts[index];
        s.eq(`${facet} has a direct, signed structured observation`, {
            status: result.authorizationStatus,
            path: result.payload.effectiveCanonicalPath,
            sourcePath: result.payload.sourceCanonicalPath,
            observation: result.payload.proofObservationKind,
            canonical: ctx[`is${prefix}Result`](result),
            evidence: ctx[`is${prefix}ExecutionEvidence`](evidence, result),
        }, {
            status: "authorized", path: `constraints.${path}`, sourcePath: `constraints.${path}`,
            observation: "direct-canonical-result-observation", canonical: true, evidence: true,
        });
        const old = receipt(owner, selection, legacy).result;
        s.eq(`${selection} keeps its permanent legacy identity with the exact observation`,
            [old.authorizationStatus, old.payload.effectiveCanonicalPath, old.payload.facetValue],
            ["authorized", `constraints.${path}`, result.payload.facetValue]);
    });
    s.eq("source class assignment covers both typed formatives, not one example", receipts[0].result.payload.facetValue, {
        rank: "intransitive-verbstem", stemFormatives: ["ni", "hui"], classId: "B",
        andrewsSection: "24.5.6", contextualFactIsUserChoice: false,
    });
    s.eq("replacement class assignment binds both output sequences", receipts[2].result.payload.facetValue, {
        procedure: "replacement", outputSequences: ["n-a", "hu-a"], classId: "B",
        andrewsSection: "24.5.8", contextualFactIsUserChoice: false,
    });
    s.eq("addition class assignment binds both output sequences", receipts[3].result.payload.facetValue, {
        procedure: "addition", outputSequences: ["ni-ā", "hui-ā"], classId: "C",
        andrewsSection: "24.5.8", contextualFactIsUserChoice: false,
    });
    const alternation = receipts[1].result.payload.facetValue;
    s.eq("procedure preference is source-specific and does not assert universal free choice", {
        subtype: alternation.derivationSubtype,
        procedures: alternation.procedures,
        scope: alternation.selectionScope,
        preferenceAuthority: alternation.preferenceAuthority,
        universal: alternation.universalFreeAlternationAsserted,
        sources: alternation.sourceObservations.map(source => [
            source.sourceStem, source.stemFormative, source.sourceClass, source.exact,
            source.selectionRequired,
            source.options.map(option => [option.procedure, option.targetClass]).sort(),
            source.options.find(option => option.preference === "preferred")?.procedure,
        ]),
    }, {
        subtype: "type-one", procedures: ["replacement", "addition"],
        scope: "source-specific-licensed-options", preferenceAuthority: "typed-source-lexeme-or-category",
        universal: false,
        sources: [
            ["xap-ā-ni", "ni", "B", true, true, [["addition", "C"], ["replacement", "B"]], "addition"],
            ["xap-ā-hui", "hui", "B", true, true, [["addition", "C"], ["replacement", "B"]], "replacement"],
            ["cot-ō-ni", "ni", "B", true, true, [["addition", "C"], ["replacement", "B"]], "replacement"],
            ["tlap-ī-hui", "hui", "B", true, true, [["addition", "C"], ["replacement", "B"]], "addition"],
        ],
    });
    const inventory = (stem, verbClass = "B") => {
        const source = ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            subject: "3sg", mood: "indicative", tense: "present", verbClass,
            valence: "intransitive", transitivity: "intransitive", objectKind: "none",
        });
        return ctx.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "causative" });
    };
    const open = inventory("xap-ā-ni");
    s.eq("the generated options consume the same signed class relation observed by both owners",
        open.options.filter(option => option.derivationSubtype === "type-one").map(option => {
            const relation = option.destockalClassAssignmentFrame;
            const analysis = open.sourceAnalysisFrame.analyses.find(item => item.analysisId === option.sourceAnalysisId);
            return [relation?.classSystemFrame === analysis?.destockalStructureFrame?.classSystemFrame,
                relation?.targetClass === option.targetClass, relation?.suffixOnlyInference,
                ctx.isClassicalNahuatlVncDerivationOptionInventory(open)];
        }), [[true, true, false, true], [true, true, false, true]]);
    s.eq("exact long-stock variants retain their signed class relation", ["ōl-ī-ni", "chay-ā-hui", "tlap-ī-hui"].map(stem => {
        const choices = inventory(stem);
        return [choices.authorizationStatus, ctx.isClassicalNahuatlVncDerivationOptionInventory(choices),
            choices.options.filter(option => option.derivationSubtype === "type-one")
                .map(option => [option.destockalClassAssignmentFrame?.procedure, option.destockalClassAssignmentFrame?.targetClass])];
    }), [
        ["authorized", true, [["addition", "C"]]],
        ["authorized", true, [["replacement", "B"], ["addition", "C"]]],
        ["authorized", true, [["addition", "C"], ["replacement", "B"]]],
    ]);
    s.eq("Type 2 choices remain available without borrowing the Type 1 class relation",
        open.options.filter(option => option.derivationSubtype === "type-two")
            .map(option => Boolean(option.destockalClassAssignmentFrame)),
        [false, false]);
    for (const [stem, procedure, classId, perfective, surfaceEnding] of [
        ["xap-ā-ni", "replacement", "B", "xap-ā-n", "xapān"],
        ["xap-ā-hui", "addition", "C", "xap-ā-hui-h", "xapāhuih"],
    ]) {
        const choices = inventory(stem);
        const option = choices.options.find(item => item.destockalClassAssignmentFrame?.procedure === procedure);
        const app = ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: stem, verbClass: "B", sourceValence: "intransitive", sourceSubject: "3sg",
            subject: "1sg", requestedDerivation: "causative", derivationOptionId: option?.optionId || "missing",
            causativeObjectKind: "specific-projective", requestedVoice: "active",
            mood: "indicative", tense: "preterit", outputScope: "single",
        });
        s.eq(`${procedure} class reaches the ordinary public finite Result`, [
            option?.targetClass, app.authorizationStatus, ctx.isClassicalNahuatlVncApplicationFrame(app),
            app.resultFrame.formulaRealization.includes(`(${perfective})`),
            app.resultFrame.surfaceRealization.endsWith(surfaceEnding),
        ], [classId, "authorized", true, true, true]);
    }
    s.eq("Class A candidates and other destockal types do not acquire this class authority",
        [["xap-ā-hui", "A"], ["xap-a-hui", "B"], ["mī-ni", "B"]].map(([stem, classId]) => {
            const choices = inventory(stem, classId);
            return [choices.authorizationStatus, choices.options.some(option => option.destockalClassAssignmentFrame)];
        }), [["authorized", false], ["authorized", false], ["authorized", false]]);
    const original = receipts[0];
    const copiedInventory = JSON.parse(JSON.stringify(open));
    copiedInventory.options[0].targetClass = "D";
    s.eq("copied class claims, sources, and Results cannot mint owner authority", [
        ctx[`evaluate${original.prefix}`](JSON.parse(JSON.stringify(original.source))).authorizationStatus,
        ctx[`is${original.prefix}Result`](JSON.parse(JSON.stringify(original.result))),
        ctx.isClassicalNahuatlVncDerivationOptionInventory(copiedInventory),
        ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(JSON.parse(JSON.stringify(open.sourceAnalysisFrame))),
    ], ["blocked", false, false, false]);
    return s;
}

module.exports = { run };
