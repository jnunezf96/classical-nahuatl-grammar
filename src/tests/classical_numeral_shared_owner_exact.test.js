"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_numeral_shared_owner_exact");
    const facet = "p3265-nncs-built-on-the-basic-set-of-numeral-stems";
    const source = ctx.buildClassicalNumeralBasicSetEvidenceAnalysisSource({
        analysisDomain: "classical-numeral-basic-set-evidence-analysis",
        selection: "claim-p3265",
        requestedFacet: facet,
        participantChoice: `claim-p3265:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalNumeralBasicSetEvidenceAnalysis(source);
    const cases = ownerResult.payload.definition.cases;
    const observations = [
        ["ACI-P323-L019-3D0EF977A1", "cases.vncAdverb incorporated cem before yā", {
            sourceKind: cases.vncAdverb.sourceKind, stem: cases.vncAdverb.stem,
            incorporatedRoute: cases.vncAdverb.rules["incorporated-adverb/source-route"],
        }, { sourceKind: "classical-nahuatl-cardinal-vnc-adverb-source-frame", stem: "cen-yā", incorporatedRoute: true }],
        ["ACI-P326-L026-852E858276-02", "cases.order20 numerical unit", {
            value: cases.order20.value, stem: cases.order20.stem,
        }, { value: 20, stem: "cem-pōhu-a-l" }],
        ["ACI-P326-L027-9C5AC1070B-02", "cases.order20 morphological realization", {
            formula: cases.order20.formulaRealization, surface: cases.order20.wordSurface,
        }, { formula: "#0-0(cem-pōhu-a-l)li-0#", surface: "cempōhualli" }],
        ["ACI-P326-L027-9C5AC1070B-04", "cases.order20 one-score computation", {
            multiplier: 1, unit: cases.order20.value, result: cases.order20.value,
        }, { multiplier: 1, unit: 20, result: 20 }],
        ["ACI-P326-L042-38C35522E7-02", "cases.order400 morphological realization", {
            formula: cases.order400.formulaRealization, surface: cases.order400.wordSurface,
        }, { formula: "#0-0(cen-tzon)tli-0#", surface: "centzontli" }],
        ["ACI-P326-L042-38C35522E7-04", "cases.order400 numerical value", {
            multiplier: 1, unit: 400, result: cases.order400.value,
        }, { multiplier: 1, unit: 400, result: 400 }],
    ];
    for (const [atomId, path, actual, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, actual, expected);
        const hostile = JSON.parse(JSON.stringify(actual));
        hostile[Object.keys(hostile)[0]] = "BROKEN";
        s.no(`${atomId} rejects a mutation of ${path}`, JSON.stringify(hostile) === JSON.stringify(expected));
    }
    s.eq("the shared numeral Result is authorized", ownerResult.authorizationStatus, "authorized");
    return s;
}

module.exports = { run };
