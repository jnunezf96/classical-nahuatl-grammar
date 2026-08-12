"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson3_group_10_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.resolve(
        __dirname, "../../docs/canvas-progress/lesson3-review-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter((record) =>
        record.reviewGroupId === "lesson3-honorificized-particles"
        && record.proposedDirection === "BOTH");
    const nuclearResult = ctx.requestClassicalVncSentenceResultFrame(
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: "nemi", verbClass: "B", sourceValence: "intransitive",
            subject: "3sg", requestedDerivation: "direct", requestedVoice: "active",
            mood: "indicative", tense: "present", outputScope: "single",
        })
    );
    const honorificSentence = (particleId) =>
        ctx.requestClassicalSentenceParticleFrame({
            particleId,
            honorificized: true,
            nuclearResultFrame: nuclearResult,
        });
    const otzin = honorificSentence("l3-o-behold");
    const auhtzin = honorificSentence("l3-auh-interjection");
    const caNoZotzin = honorificSentence("l3-ca-no-zo");
    const wrongConjunctorHonorific = honorificSentence("l3-auh-conjunctor");
    const observations = new Map([
        ["ACI-P059-L018-19FD991827", [
            caNoZotzin.honorificSourceFrame.operation,
            caNoZotzin.particleResultFrame.honorificMarker,
            caNoZotzin.particleResultFrame.typedSourceAuthority,
        ]],
        ["ACI-P059-L020-A5401273B0", [
            otzin.particleResultFrame.hostKind,
            caNoZotzin.particleResultFrame.hostKind,
            otzin.particleResultFrame.attachmentTarget,
            caNoZotzin.particleResultFrame.attachmentTarget,
        ]],
        ["ACI-P059-L021-7061D7CA2C", [
            caNoZotzin.particleResultFrame.collocationScope,
            caNoZotzin.particleResultFrame.surface,
        ]],
        ["ACI-P059-L024-6A5F7EF59E", [
            otzin.authorizationStatus,
            otzin.honorificizedEntryId,
            otzin.particleResultFrame.formula,
            otzin.particleResultFrame.surface,
            otzin.selectedEntry.meanings,
            otzin.sentenceSurfaceDisplay,
        ]],
        ["ACI-P059-L025-64943B2196", [
            auhtzin.authorizationStatus,
            auhtzin.honorificizedEntryId,
            auhtzin.particleResultFrame.formula,
            auhtzin.particleResultFrame.surface,
            auhtzin.selectedEntry.meanings,
            auhtzin.independentUtterance,
            auhtzin.sentenceSurfaceDisplay,
            wrongConjunctorHonorific.authorizationStatus,
        ]],
        ["ACI-P059-L026-BB2A070E1D", [
            caNoZotzin.authorizationStatus,
            caNoZotzin.honorificizedEntryId,
            caNoZotzin.particleResultFrame.formula,
            caNoZotzin.particleResultFrame.surface,
            caNoZotzin.selectedEntry.meanings,
            caNoZotzin.particleResultFrame.baseParticleResultFrames.map((frame) => frame.particleId),
            caNoZotzin.sentenceSurfaceDisplay,
        ]],
    ]);
    const expected = new Map([
        ["ACI-P059-L018-19FD991827", [
            "attach-tzin-to-final-particle-member", "tzin", true,
        ]],
        ["ACI-P059-L020-A5401273B0", [
            "single-particle", "collocation-final-member",
            "final-particle-member", "final-particle-member",
        ]],
        ["ACI-P059-L021-7061D7CA2C", [
            "entire-collocation", "ca no zotzin",
        ]],
        ["ACI-P059-L024-6A5F7EF59E", [
            "authorized", "l3-otzin", "ō + tzin", "ōtzin", ["behold"], "Ōtzin nemi",
        ]],
        ["ACI-P059-L025-64943B2196", [
            "authorized", "l3-auhtzin", "āuh + tzin", "āuhtzin", ["good", "good"], true, "Āuhtzin", "blocked",
        ]],
        ["ACI-P059-L026-BB2A070E1D", [
            "authorized", "l3-ca-no-zotzin", "ca + nō + zo + tzin",
            "ca no zotzin", ["thus it is"], ["l3-ca", "l3-no-adverbial", "l3-zo"],
            "Ca no zotzin nemi",
        ]],
    ]);

    s.eq("all six writing atoms in Group 10 have one exact normal-application observation", {
        expected: records.length,
        observed: observations.size,
        missing: records.filter((record) => !observations.has(record.atomId)).map((record) => record.atomId),
    }, { expected: 6, observed: 6, missing: [] });
    for (const record of records) {
        const actual = observations.get(record.atomId);
        s.eq(`${record.atomId} observes its accepted honorific job`, actual, expected.get(record.atomId));
        const broken = JSON.parse(JSON.stringify(actual));
        broken[broken.length - 1] = "BROKEN_HONORIFIC_BEHAVIOR";
        s.no(`${record.atomId} fails when its honorific behavior is broken`,
            JSON.stringify(broken) === JSON.stringify(expected.get(record.atomId)));
    }

    const choices = ctx.getClassicalNahuatlSentenceParticleEntries().map((entry) => entry.id);
    s.eq("the interface asks for honorific intent on the three licensed bases", {
        bases: ["l3-o-behold", "l3-auh-interjection", "l3-ca-no-zo"].filter((id) => choices.includes(id)),
        prebuiltResultsExposed: ["l3-otzin", "l3-auhtzin", "l3-ca-no-zotzin"].filter((id) => choices.includes(id)),
    }, {
        bases: ["l3-o-behold", "l3-auh-interjection", "l3-ca-no-zo"],
        prebuiltResultsExposed: [],
    });
    s.ok("every honorific sentence Result remains owner-issued",
        [otzin, auhtzin, caNoZotzin].every((frame) =>
            ctx.isClassicalNahuatlIssuedParticleSentenceLayerFrame(frame)
            && ctx.isClassicalNahuatlParticleHonorificResultFrame(frame.particleResultFrame)));
    return s;
}

module.exports = { run };
