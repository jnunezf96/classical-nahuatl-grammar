"use strict";

const { createSuite } = require("./runner");

const get = (value, path) => path.split(".").reduce((current, key) => current[key], value);

function run(ctx = {}) {
    const s = createSuite("classical_adverbial_other_absolutive_exact");
    const facet = "p4191-while-in-44-5-seconddegree-adverbialization-creates-nncs-whose";
    const source = ctx.buildClassicalAdverbialOtherAbsolutiveInventorySource({
        analysisDomain: "classical-adverbial-other-absolutive-inventory",
        selection: "claim-p4191",
        requestedFacet: facet,
        participantChoice: `claim-p4191:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalAdverbialOtherAbsolutiveInventory(source);
    const frame = ownerResult.payload.definition;
    const observations = [
        ["ACI-P454-L009-8E8D33AC47-02", "cases.otherNoncuah.compositionalReading", "it is off in a separate place"],
        ["ACI-P454-L009-8E8D33AC47-03", "cases.otherNoncuah.lexicalReadings.0", "to one side"],
        ["ACI-P454-L009-8E8D33AC47-04", "cases.otherNoncuah.lexicalReadings.1", "separately"],
        ["ACI-P454-L009-8E8D33AC47-05", "cases.otherNoncuah.lexicalReadings.2", "apart"],
        ["ACI-P454-L009-8E8D33AC47-06", "cases.otherNoncuah.numberSystem", {
            singularOrSingleEntityForm: "nōncuah",
            multipleEntityForm: "nōnōncuah",
            operation: "reduplication",
            multipleEntityCondition: "more-than-one-entity",
            multipleEntityReadings: ["severally apart", "separately apart"],
        }],
        ["ACI-P454-L009-8E8D33AC47-07", "cases.otherNoncuah.numberSystem.multipleEntityCondition", "more-than-one-entity"],
        ["ACI-P454-L009-8E8D33AC47-08", "cases.otherNoncuah.numberSystem.multipleEntityReadings.0", "severally apart"],
        ["ACI-P454-L009-8E8D33AC47-09", "cases.otherNoncuah.numberSystem.multipleEntityReadings.1", "separately apart"],

        ["ACI-P454-L016-CFBF124F98-02", "cases.otherIxtlapal.compositionalReading", "it is with the side as the face"],
        ["ACI-P454-L016-CFBF124F98-03", "cases.otherIxtlapal.lexicalReadings", ["crosswise", "across", "athwart", "sideways"]],
        ["ACI-P454-L016-CFBF124F98-04", "cases.otherIxtlapal.lexicalReadings.2", "athwart"],
        ["ACI-P454-L016-CFBF124F98-05", "cases.otherIxtlapal.lexicalReadings.3", "sideways"],
        ["ACI-P454-L016-CFBF124F98-06", "cases.otherIxtlapal.sourceAnalysis.nounstem", "ix-tla-pal-li"],
        ["ACI-P454-L016-CFBF124F98-07", "cases.otherIxtlapal.sourceAnalysis.embed", { stem: "ix-tli", reading: "face" }],
        ["ACI-P454-L016-CFBF124F98-08", "cases.otherIxtlapal.sourceAnalysis.matrix.stem", "tla-pal-li"],
        ["ACI-P454-L016-CFBF124F98-09", "cases.otherIxtlapal.sourceAnalysis.matrix.readings.0", "a dyed thing"],
        ["ACI-P454-L016-CFBF124F98-10", "cases.otherIxtlapal.sourceAnalysis.matrix.readings.1", "a colored thing"],
        ["ACI-P454-L016-CFBF124F98-11", "cases.otherIxtlapal.sourceAnalysis.matrix.readings.2", "side"],

        ["ACI-P454-L027-3ECD298782-02", "cases.otherTlacuauh.compositionalReading", "it is in the manner of a hardened thing"],
        ["ACI-P454-L027-3ECD298782-03", "cases.otherTlacuauh.lexicalReadings.0", "strongly"],
        ["ACI-P454-L027-3ECD298782-04", "cases.otherTlacuauh.lexicalReadings.1", "positively"],
        ["ACI-P454-L027-3ECD298782-05", "cases.otherTlacuauh.lexicalReadings.2", "especially"],
        ["ACI-P454-L027-3ECD298782-06", "cases.otherTlacuauh.sourceAnalysis.nounstemReadings.0", "a thing that has become hard"],
        ["ACI-P454-L027-3ECD298782-07", "cases.otherTlacuauh.sourceAnalysis.nounstemReadings.1", "a hardened thing"],
        ["ACI-P454-L027-3ECD298782-08", "cases.otherTlacuauh.sourceAnalysis", {
            nounstem: "tlacu-ā-uh-tli",
            nounstemReadings: ["a thing that has become hard", "a hardened thing"],
            sourceVerbStem: "tlacu-ā-hua",
            sourceVerbReading: "to become hard",
            patientiveKind: "impersonal",
        }],
        ["ACI-P454-L027-3ECD298782-09", "cases.otherTlacuauh.sourceAnalysis.sourceVerbReading", "to become hard"],

        ["ACI-P454-L030-D7E3234B15-02", "cases.otherTlapic.compositionalReading", "it is in the manner of an imagined thing"],
        ["ACI-P454-L030-D7E3234B15-03", "cases.otherTlapic.lexicalReadings.0", "falsely"],
        ["ACI-P454-L030-D7E3234B15-04", "cases.otherTlapic.lexicalReadings.1", "in vain"],
        ["ACI-P454-L030-D7E3234B15-05", "cases.otherTlapic.lexicalReadings.2", "futilely"],
        ["ACI-P454-L030-D7E3234B15-06", "cases.otherTlapic.sourceAnalysis.nounstemReadings.0", "an imagined thing"],
        ["ACI-P454-L030-D7E3234B15-07", "cases.otherTlapic.sourceAnalysis.nounstemReadings.1", "a fabricated thing"],
        ["ACI-P454-L030-D7E3234B15-08", "cases.otherTlapic.sourceAnalysis.nounstemReadings.2", "an invented thing"],
        ["ACI-P454-L030-D7E3234B15-09", "cases.otherTlapic.sourceAnalysis", {
            nounstem: "tla-pic-tli",
            nounstemReadings: ["an imagined thing", "a fabricated thing", "an invented thing"],
            sourceVerbStem: "tla-piqui",
            sourceVerbReadings: ["to imagine something", "to invent something"],
            object: { specificity: "nonspecific", referentCategory: "nonhuman" },
            patientiveKind: "perfective",
        }],
        ["ACI-P454-L030-D7E3234B15-10", "cases.otherTlapic.sourceAnalysis.sourceVerbReadings.0", "to imagine something"],
        ["ACI-P454-L030-D7E3234B15-11", "cases.otherTlapic.sourceAnalysis.sourceVerbReadings.1", "to invent something"],

        ["ACI-P454-L039-56C05572E9-02", "cases.otherManner.compositionalReading", "it is in the manner of a known thing"],
        ["ACI-P454-L039-56C05572E9-03", "cases.otherManner.lexicalReadings.0", "quietly"],
        ["ACI-P454-L039-56C05572E9-04", "cases.otherManner.lexicalReadings.1", "calmly"],
        ["ACI-P454-L039-56C05572E9-05", "cases.otherManner.lexicalReadings.2", "gently"],
        ["ACI-P454-L039-56C05572E9-06", "cases.otherManner.sourceAnalysis.nounstem", "tla-mach-tli"],
        ["ACI-P454-L039-56C05572E9-07", "cases.otherManner.sourceAnalysis.sourceVerbStem", "tla-mati"],
        ["ACI-P454-L039-56C05572E9-08", "cases.otherManner.sourceAnalysis.object", {
            morph: "tla", specificity: "nonspecific", referentCategory: "nonhuman",
        }],
        ["ACI-P454-L039-56C05572E9-09", "cases.otherManner.sourceAnalysis.sourceVerbReading", "to know a nonhuman thing or something"],
    ];
    for (const [atomId, path, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, get(frame, path), expected);
        const hostile = JSON.parse(JSON.stringify(frame));
        const keys = path.split(".");
        const last = keys.pop();
        keys.reduce((current, key) => current[key], hostile)[last] = typeof expected === "boolean"
            ? !expected
            : (typeof expected === "object" ? { broken: true } : `${expected}-BROKEN`);
        s.no(`${atomId} rejects a broken ${path}`, JSON.stringify(get(hostile, path)) === JSON.stringify(expected));
    }
    s.eq("the other-absolutive owner is canonical", ownerResult.authorizationStatus, "authorized");
    return s;
}

module.exports = { run };
