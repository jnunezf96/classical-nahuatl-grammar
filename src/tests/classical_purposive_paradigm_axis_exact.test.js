"use strict";

const { createSuite } = require("./runner");

const get = (value, path) => path.split(".").reduce((current, key) => current[key], value);
const set = (value, path, replacement) => {
    const clone = JSON.parse(JSON.stringify(value));
    const keys = path.split(".");
    const last = keys.pop();
    keys.reduce((current, key) => current[key], clone)[last] = replacement;
    return clone;
};

function run(ctx = {}) {
    const s = createSuite("classical_purposive_paradigm_axis_exact");
    const facet = "p2912-the-tense-morph-for-all-tenses-is-0";
    const source = ctx.buildClassicalPurposiveParadigmAxisSystemSource({
        analysisDomain: "classical-purposive-paradigm-axis-system",
        selection: "claim-p2912",
        requestedFacet: facet,
        participantChoice: `claim-p2912:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalPurposiveParadigmAxisSystem(source);
    const frame = ownerResult.payload.definition;
    const observations = [
        ["ACI-P267-L018-A4828FC0DC-02", "contract.outboundTenseMeanings.1", "past"],
        ["ACI-P267-L018-A4828FC0DC-03", "contract.outboundTenseMeanings.0", "nonpast"],
        ["ACI-P267-L018-A4828FC0DC-04", "contract.inboundTenseMeanings.1", "future"],
        ["ACI-P267-L018-A4828FC0DC-05", "contract.inboundTenseMeanings.0", "nonfuture"],
        ["ACI-P267-L030-5D96BD40A2-02", "cases.paradigmAxisExamples.singFirstSingular.canonicalTranscriptionFormula", "#ni-Ø(cuīca-⎕-t-ī-uh)Ø+Ø-Ø#"],
        ["ACI-P267-L030-5D96BD40A2-03", "cases.paradigmAxisExamples.singFirstSingular.subjectRole", { person: "first", number: "singular", animacy: "human" }],
        ["ACI-P267-L030-5D96BD40A2-04", "cases.paradigmAxisExamples.singFirstSingular.purposeRelation", "embedded-action-is-purpose-of-movement"],
        ["ACI-P267-L030-5D96BD40A2-05", "cases.paradigmAxisExamples.singFirstSingular.readings.ongoingMovement", "I am going in order to sing"],
        ["ACI-P267-L030-5D96BD40A2-06", "cases.paradigmAxisExamples.singFirstSingular.readings.futureMovement", "I shall go in order to sing"],
        ["ACI-P267-L030-5D96BD40A2-08", "cases.paradigmAxisExamples.singFirstPlural.canonicalTranscriptionFormula", "#ti-Ø(cuīca-⎕-t-i-hui)Ø+Ø-h#"],
        ["ACI-P267-L030-5D96BD40A2-09", "cases.paradigmAxisExamples.singFirstPlural.subjectRole", { person: "first", number: "plural", animacy: "human" }],
        ["ACI-P267-L030-5D96BD40A2-10", "cases.paradigmAxisExamples.singFirstPlural.readings.ongoingMovement", "we are going in order to sing"],
        ["ACI-P267-L030-5D96BD40A2-11", "cases.paradigmAxisExamples.singFirstPlural.readings.futureMovement", "we shall go in order to sing"],
        ["ACI-P268-L007-3A37BD42BF-02", "cases.paradigmAxisExamples.eatFirstSingular.canonicalTranscriptionFormula", "#ni-Ø+tla(cuā-⎕-t-ī-uh)Ø+Ø-Ø#"],
        ["ACI-P268-L007-3A37BD42BF-03", "cases.paradigmAxisExamples.eatFirstSingular.subjectRole", { person: "first", number: "singular", animacy: "human" }],
        ["ACI-P268-L007-3A37BD42BF-04", "cases.paradigmAxisExamples.eatFirstSingular.objectMorphs", ["tla"]],
        ["ACI-P268-L007-3A37BD42BF-05", "cases.paradigmAxisExamples.eatFirstSingular.readings.ongoingMovement", "I am going in order to eat"],
        ["ACI-P268-L007-3A37BD42BF-06", "cases.paradigmAxisExamples.eatFirstSingular.readings.futureMovement", "I shall go in order to eat"],
        ["ACI-P268-L007-3A37BD42BF-08", "cases.paradigmAxisExamples.eatSecondPlural.canonicalTranscriptionFormula", "#an-Ø+tla(cuā-⎕-t-i-hui)Ø+Ø-h#"],
        ["ACI-P268-L007-3A37BD42BF-09", "cases.paradigmAxisExamples.eatSecondPlural.subjectRole", { person: "second", number: "plural", animacy: "human" }],
        ["ACI-P268-L007-3A37BD42BF-10", "cases.paradigmAxisExamples.eatSecondPlural.readings.ongoingMovement", "you plural are going in order to eat"],
        ["ACI-P268-L007-3A37BD42BF-11", "cases.paradigmAxisExamples.eatSecondPlural.readings.futureMovement", "you plural will go in order to eat"],
    ];
    for (const [atomId, path, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, get(frame, path), expected);
        const replacement = typeof expected === "boolean" ? !expected
            : Array.isArray(expected) ? ["BROKEN"]
                : expected && typeof expected === "object" ? { broken: true }
                    : `${expected}-BROKEN`;
        s.no(`${atomId} rejects a broken ${path}`, JSON.stringify(get(set(frame, path, replacement), path)) === JSON.stringify(expected));
    }
    s.eq("the typed owner executes the canonical purposive frame", {
        ownerStatus: ownerResult.authorizationStatus,
        frameStatus: frame.authorizationStatus,
        storedFormulaAuthority: frame.storedExampleAuthority,
    }, { ownerStatus: "authorized", frameStatus: "authorized", storedFormulaAuthority: false });
    return s;
}

module.exports = { run };
