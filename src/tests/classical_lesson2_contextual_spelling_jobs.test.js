"use strict";

const { createSuite } = require("./runner");

const ATOM_OBSERVATIONS = Object.freeze([
    ["ACI-P039-L008-483475B7F1", value => value.ca === "ca" && value.que === "que" && value.hua === "hua" && value.auh === "auh" && value.cua === "cua" && value.auc === "auc"],
    ["ACI-P039-L009-12800DB414", value => value.hua === "hua" && value.que === "que" && value.cua === "cua"],
    ["ACI-P039-L010-C014D0FE1B", value => value.hua === "hua" && value.auh === "auh" && value.que === "que" && value.cua === "cua" && value.auc === "auc"],
    ["ACI-P039-L010-9ACAD2E5CB", value => value.cua === "cua" && value.auc === "auc"],
    ["ACI-P039-L010-9ACAD2E5CB-02", value => value.hua === "hua" && value.auh === "auh"],
    ["ACI-P039-L010-9ACAD2E5CB-03", value => value.hua === "hua" && value.auh === "auh"],
    ["ACI-P039-L010-9ACAD2E5CB-04", value => value.que === "que"],
    ["ACI-P039-L010-9ACAD2E5CB-05", value => value.que === "que"],
    ["ACI-P043-L012-EBD20BB4BF", value => value.za === "za" && value.az === "az"],
    ["ACI-P043-L013-3C5E09B768", value => value.ce === "ce"],
    ["ACI-P043-L017-A663631D10", value => value.hua === "hua"],
    ["ACI-P043-L022-3DBCFED63B", value => value.auh === "auh"],
    ["ACI-P043-L024-287580F016", value => value.hua === "hua" && value.auh === "auh"],
    ["ACI-P044-L032-7A11C5ED53", value => value.ca === "ca" && value.ac === "ac"],
    ["ACI-P044-L033-7E95D05969", value => value.que === "que"],
    ["ACI-P044-L035-6C0893B25C", value => value.cua === "cua"],
    ["ACI-P044-L037-CD2F6CB119", value => value.auc === "auc"],
    ["ACI-P045-L039-CE4CCD3E27", value => value.ca === "ca" && value.que === "que" && value.za === "za" && value.ce === "ce"],
    ["ACI-P046-L006-9ACDEA625D", value => value.hua === "hua" && value.auh === "auh" && value.cua === "cua" && value.auc === "auc"],
]);

function run(ctx) {
    const s = createSuite("classical_lesson2_contextual_spelling_jobs");
    const transcribe = segments => {
        const source = ctx.buildClassicalNahuatlTranscriptionSourceFrame({
            constituents: [{ segments }],
        });
        const application = ctx.executeClassicalGrammarApplicationRequest({
            operationId: "orthography:transcription",
            args: [source],
        });
        return {
            source: source.authorizationStatus,
            application: application.authorizationStatus,
            canonical: ctx.isClassicalNahuatlTranscriptionFrame(application.canonicalResult),
            formula: application.canonicalResult.formula,
            surface: application.canonicalResult.surface,
        };
    };

    const runs = {
        ca: transcribe(["/k/", "a"]),
        que: transcribe(["/k/", "e"]),
        ac: transcribe(["a", "/k/"]),
        za: transcribe(["/s/", "a"]),
        ce: transcribe(["/s/", "e"]),
        az: transcribe(["a", "/s/"]),
        hua: transcribe(["/w/", "a"]),
        auh: transcribe(["a", "/w/"]),
        cua: transcribe(["/kʷ/", "a"]),
        auc: transcribe(["a", "/kʷ/"]),
    };
    const surfaces = Object.fromEntries(
        Object.entries(runs).map(([name, result]) => [name, result.surface])
    );

    s.eq("all contextual spelling witnesses travel through the normal application", {
        allAuthorized: Object.values(runs).every(result =>
            result.source === "authorized"
            && result.application === "authorized"
            && result.canonical
        ),
        formulas: Object.fromEntries(
            Object.entries(runs).map(([name, result]) => [name, result.formula])
        ),
        surfaces,
    }, {
        allAuthorized: true,
        formulas: {
            ca: "#(/k/a)#", que: "#(/k/e)#", ac: "#(a/k/)#",
            za: "#(/s/a)#", ce: "#(/s/e)#", az: "#(a/s/)#",
            hua: "#(/w/a)#", auh: "#(a/w/)#",
            cua: "#(/kʷ/a)#", auc: "#(a/kʷ/)#",
        },
        surfaces: {
            ca: "ca", que: "que", ac: "ac",
            za: "za", ce: "ce", az: "az",
            hua: "hua", auh: "auh", cua: "cua", auc: "auc",
        },
    });

    for (const [atomId, observes] of ATOM_OBSERVATIONS) {
        s.eq(`${atomId}: exact shared spelling behavior`, observes(surfaces), true);
        const changed = { ...surfaces };
        for (const key of Object.keys(changed)) {
            if (observes({ ...changed, [key]: `broken-${changed[key]}` }) === false) {
                changed[key] = `broken-${changed[key]}`;
                break;
            }
        }
        s.eq(`${atomId}: changing the required spelling fails its exact check`, observes(changed), false);
    }

    return s;
}

module.exports = { run };
