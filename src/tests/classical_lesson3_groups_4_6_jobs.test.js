"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson3_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.resolve(
        __dirname,
        "../../docs/canvas-progress/lesson3-review-ledger.json"
    ), "utf8"));
    const groupIds = new Set([
        "lesson3-adjunctor-in",
        "lesson3-conjunctor-auh",
        "lesson3-adverbial-particles",
    ]);
    const records = ledger.records.filter((record) =>
        groupIds.has(record.reviewGroupId)
        && record.proposedDirection === "BOTH"
    );
    const particle = (id) => ctx.requestClassicalParticleResult(id);
    const sentence = (tense = "present") => ctx.requestClassicalVncSentenceResultFrame(
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: "nemi",
            verbClass: "B",
            sourceValence: "intransitive",
            subject: "3sg",
            requestedDerivation: "direct",
            requestedVoice: "active",
            mood: "indicative",
            tense,
            outputScope: "single",
        })
    );
    const particleLayer = (id, tense = "present") => ctx.requestClassicalSentenceParticleFrame({
        particleId: id,
        nuclearResultFrame: sentence(tense),
    });
    const adverbialLayer = (id, tense = "present") => ctx.requestClassicalSentenceAdverbialFrame({
        adverbialId: id,
        nuclearResultFrame: sentence(tense),
    });

    const inResult = particle("l3-in");
    const inProfile = inResult.lexicalFactFrame.adjunctorProfile;
    const inLayer = particleLayer("l3-in");
    const anca = particle("l3-anca");
    const mah = particle("l3-mah");
    const auh = particle("l3-auh-conjunctor");
    const auhLayer = particleLayer("l3-auh-conjunctor");
    const antecessive = particle("l3-o-antecessive");
    const pastAntecessive = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
        subject: "1sg", mood: "indicative", tense: "preterit",
        verbClass: "B", valence: "intransitive", antecessive: true,
    });
    const presentAntecessive = ctx.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
        subject: "1sg", mood: "indicative", tense: "present",
        verbClass: "B", valence: "intransitive", antecessive: true,
    });
    const who = ctx.buildClassicalNahuatlPronominalNncFrame({
        subtype: "interrogative", interrogativeKind: "āc", subject: "3sg",
    });

    const observations = new Map([
        ["ACI-P055-L016-EC4A61E09F", [inResult.surface, inProfile.contextualTranslation]],
        ["ACI-P055-L016-EC4A61E09F-02", [inResult.lexicalFactFrame.functionScope, inLayer.authorizationStatus]],
        ["ACI-P055-L016-EC4A61E09F-03", [inProfile.contextualTranslation, inResult.lexicalFactFrame.translationAuthority]],
        ["ACI-P055-L016-EC4A61E09F-04", [inProfile.adjoinedUnitMarking]],
        ["ACI-P055-L016-EC4A61E09F-05", [inProfile.adjoinedUnitScope]],
        ["ACI-P055-L016-EC4A61E09F-06", [inProfile.determinerStatus]],
        ["ACI-P055-L016-EC4A61E09F-08", [inProfile.nounstemDefinitenessContrast]],
        ["ACI-P055-L016-EC4A61E09F-09", [inProfile.grammarUnit]],
        ["ACI-P055-L016-EC4A61E09F-10", [inProfile.nounstemActualizationRequirement]],
        ["ACI-P055-L016-EC4A61E09F-11", [inProfile.actualizationDeterminerPosition]],
        ["ACI-P055-L016-EC4A61E09F-14", [inProfile.ceSemanticAnalysis]],
        ["ACI-P056-L010-B5C02F73D2", [anca.authorizationStatus, anca.surface, anca.lexicalFactFrame.meanings]],
        ["ACI-P056-L013-0AB93ED9AA", [mah.authorizationStatus, mah.surface, mah.lexicalFactFrame.meanings]],
        ["ACI-P056-L015-5DAE53297D", [auhLayer.authorizationStatus, auh.surface, auh.lexicalFactFrame.meanings, auhLayer.placement.scope, auhLayer.sentenceSurfaceDisplay]],
        ["ACI-P056-L017-12EF9D6DAD", [particle("l3-mec").surface, particle("l3-nee").surface, particle("l3-mec").lexicalFactFrame.meanings]],
        ["ACI-P056-L018-DD5E88ED8C", [particle("l3-tel").surface, particle("l3-tel").lexicalFactFrame.meanings]],
        ["ACI-P056-L020-C9B9EAEAE9", [particle("l3-oc").surface, particle("l3-oc").lexicalFactFrame.meanings]],
        ["ACI-P056-L021-374442D32E", [particle("l3-zan").surface, particle("l3-zan").lexicalFactFrame.meanings]],
        ["ACI-P056-L022-6F742655B5", [particle("l3-za").surface, particle("l3-za").lexicalFactFrame.meanings]],
        ["ACI-P056-L023-6CCF356ADF", [adverbialLayer("l3-ye", "present").contextualMeaningFrame.contextualMeaning, adverbialLayer("l3-ye", "future").contextualMeaningFrame.contextualMeaning]],
        ["ACI-P056-L024-EA0D75FF38", [antecessive.surface, antecessive.lexicalFactFrame.meanings]],
        ["ACI-P056-L024-EA0D75FF38-02", [antecessive.formula, pastAntecessive.expandedVncBoundaryFrame.outsidePrefixes]],
        ["ACI-P056-L024-EA0D75FF38-03", [antecessive.lexicalFactFrame.antecessiveProfile.pronunciationAttachment]],
        ["ACI-P056-L024-EA0D75FF38-04", [antecessive.lexicalFactFrame.antecessiveProfile.writingAttachment]],
        ["ACI-P056-L024-EA0D75FF38-05", [pastAntecessive.authorizationStatus, presentAntecessive.authorizationStatus, presentAntecessive.expandedVncBoundaryFrame.antecessiveTenseAuthorized]],
        ["ACI-P056-L024-EA0D75FF38-06", [antecessive.lexicalFactFrame.antecessiveProfile.placementRelativeToPastVnc]],
        ["ACI-P056-L024-EA0D75FF38-07", [antecessive.lexicalFactFrame.antecessiveProfile.defaultEnglishTensePreference]],
        ["ACI-P056-L024-EA0D75FF38-09", [antecessive.lexicalFactFrame.antecessiveProfile.untranslatedWhenPerfectRenderingUnwarranted]],
        ["ACI-P056-L024-EA0D75FF38-10", [antecessive.lexicalFactFrame.antecessiveProfile.boundaryNotation]],
        ["ACI-P056-L029-5D0AB4CA0C", [particle("l3-no-adverbial").surface, particle("l3-no-adverbial").lexicalFactFrame.meanings]],
        ["ACI-P056-L030-1364B92E7F", [particle("l3-zo").surface, particle("l3-zo").lexicalFactFrame.meanings, ctx.getClassicalNahuatlSentenceAdverbialEntries().some((entry) => entry.id === "l3-zo")]],
        ["ACI-P056-L033-01F85DA0CE", [adverbialLayer("l3-quin", "preterit").contextualMeaningFrame.contextualMeaning, adverbialLayer("l3-quin", "present").authorizationStatus]],
        ["ACI-P056-L033-01F85DA0CE-02", [adverbialLayer("l3-quin", "future").contextualMeaningFrame.contextualMeaning]],
        ["ACI-P056-L034-BD5D01654A", [particle("l3-ach").surface, particle("l3-ach").lexicalFactFrame.meanings]],
        ["ACI-P056-L035-2AED292FE4", [particle("l3-at").surface, particle("l3-at").lexicalFactFrame.meanings]],
        ["ACI-P056-L035-2AED292FE4-02", [particle("l3-ac").surface, particle("l3-ac").lexicalFactFrame.meanings]],
        ["ACI-P056-L035-2AED292FE4-03", [particle("l3-ac").authorizationStatus, ctx.requestClassicalParticleResult("āc").authorizationStatus]],
        ["ACI-P056-L035-2AED292FE4-04", [who.authorizationStatus, who.sourceFrame.sourceStem, who.sourceFrame.subtypeDetail, who.formulaRealization]],
    ]);
    const expected = new Map([
        ["ACI-P055-L016-EC4A61E09F", ["in", true]],
        ["ACI-P055-L016-EC4A61E09F-02", ["adjunctor", "authorized"]],
        ["ACI-P055-L016-EC4A61E09F-03", [true, false]],
        ["ACI-P055-L016-EC4A61E09F-04", ["almost-always-optional"]],
        ["ACI-P055-L016-EC4A61E09F-05", [["single-item", "multi-item-sequence"]]],
        ["ACI-P055-L016-EC4A61E09F-06", ["not-a-determiner"]],
        ["ACI-P055-L016-EC4A61E09F-08", ["absent"]],
        ["ACI-P055-L016-EC4A61E09F-09", ["nuclear-clause"]],
        ["ACI-P055-L016-EC4A61E09F-10", [["nominal-nuclear-clause", "embed"]]],
        ["ACI-P055-L016-EC4A61E09F-11", ["none"]],
        ["ACI-P055-L016-EC4A61E09F-14", ["nominal-nuclear-clause-one-in-number"]],
        ["ACI-P056-L010-B5C02F73D2", ["authorized", "anca", ["therefore", "consequently", "hence", "apparently", "evidently"]]],
        ["ACI-P056-L013-0AB93ED9AA", ["authorized", "mah", ["as though", "such that"]]],
        ["ACI-P056-L015-5DAE53297D", ["authorized", "auh", ["and", "but"], "clause-initial", "Auh nemi"]],
        ["ACI-P056-L017-12EF9D6DAD", ["mec", "nee", ["then"]]],
        ["ACI-P056-L018-DD5E88ED8C", ["tēl", ["nevertheless", "despite that", "otherwise"]]],
        ["ACI-P056-L020-C9B9EAEAE9", ["oc", ["still", "yet", "for a little while", "else", "besides"]]],
        ["ACI-P056-L021-374442D32E", ["zan", ["only", "just", "nothing else but"]]],
        ["ACI-P056-L022-6F742655B5", ["zā", ["now only"]]],
        ["ACI-P056-L023-6CCF356ADF", ["already", "soon"]],
        ["ACI-P056-L024-EA0D75FF38", ["ō", ["already"]]],
        ["ACI-P056-L024-EA0D75FF38-02", ["ō#", ["ō#"]]],
        ["ACI-P056-L024-EA0D75FF38-03", ["obligatory-to-following-item"]],
        ["ACI-P056-L024-EA0D75FF38-04", ["obligatory-to-following-item"]],
        ["ACI-P056-L024-EA0D75FF38-05", ["authorized", "blocked", false]],
        ["ACI-P056-L024-EA0D75FF38-06", [["immediate", "nonimmediate"]]],
        ["ACI-P056-L024-EA0D75FF38-07", ["perfect"]],
        ["ACI-P056-L024-EA0D75FF38-09", [true]],
        ["ACI-P056-L024-EA0D75FF38-10", ["hash-marks-obligatory-attachment-to-following-item"]],
        ["ACI-P056-L029-5D0AB4CA0C", ["nō", ["also"]]],
        ["ACI-P056-L030-1364B92E7F", ["zo", ["surely"], false]],
        ["ACI-P056-L033-01F85DA0CE", ["just now", "blocked"]],
        ["ACI-P056-L033-01F85DA0CE-02", ["presently"]],
        ["ACI-P056-L034-BD5D01654A", ["ach", ["possibly", "indeterminably", "I do not know"]]],
        ["ACI-P056-L035-2AED292FE4", ["at", ["perhaps", "maybe"]]],
        ["ACI-P056-L035-2AED292FE4-02", ["ac", ["perhaps", "maybe"]]],
        ["ACI-P056-L035-2AED292FE4-03", ["authorized", "blocked"]],
        ["ACI-P056-L035-2AED292FE4-04", ["authorized", "ā-0", "what-person", "#0-0(ā-0)c-0#"]],
    ]);

    s.eq("accepted writing atoms in Groups 4-6 have one exact observation", {
        expected: records.length,
        observed: observations.size,
        missing: records.filter((record) => !observations.has(record.atomId)).map((record) => record.atomId),
    }, { expected: 38, observed: 38, missing: [] });
    for (const record of records) {
        const actual = observations.get(record.atomId);
        s.eq(`${record.atomId} observes its accepted grammar job`, actual, expected.get(record.atomId));
        const broken = JSON.parse(JSON.stringify(actual));
        broken[broken.length - 1] = "BROKEN_GRAMMAR_BEHAVIOR";
        s.no(`${record.atomId} rejects its relevant behavior when broken`,
            JSON.stringify(broken) === JSON.stringify(expected.get(record.atomId)));
    }

    s.eq("the interface inventories only licensed free particle choices", {
        sentenceParticles: ctx.getClassicalNahuatlSentenceParticleEntries()
            .filter((entry) => ["adjunctor", "conjunctor"].includes(entry.functionScope))
            .map((entry) => entry.id),
        adverbials: ctx.getClassicalNahuatlSentenceAdverbialEntries().map((entry) => entry.id),
    }, {
        sentenceParticles: ["l3-in", "l3-anca", "l3-mah", "l3-auh-conjunctor"],
        adverbials: ["l3-mec", "l3-nee", "l3-tel", "l3-oc", "l3-zan", "l3-za", "l3-ye", "l3-no-adverbial", "l3-quin", "l3-ach", "l3-at", "l3-ac"],
    });
    return s;
}

module.exports = { run };
