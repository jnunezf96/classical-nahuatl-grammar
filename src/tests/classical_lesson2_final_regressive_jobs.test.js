"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_lesson2_final_regressive_jobs");
    const request = (operationId, args) =>
        ctx.executeClassicalGrammarApplicationRequest({ operationId, args });
    const assimilate = (leftConsonant, rightConsonant, options = {}) =>
        request("phonology:assimilation", [{
            leftConsonant, rightConsonant, grammaticalConstruction: true, ...options,
        }]);
    const exact = (atomId, observed, broken) => {
        s.eq(`${atomId}: the normal application performs the exact job`, observed, true);
        s.eq(`${atomId}: changing the required behavior fails`, broken, false);
    };
    const wrong = (left, right, options, wrongForm) =>
        assimilate(left, right, { ...options, requestedOutputForm: wrongForm })
            .authorizationStatus === "authorized";

    const omNohpalli = assimilate("m", "n", {
        sourceLeftMorpheme: "ōm", sourceRightMorpheme: "nohpalli",
        spellingStyle: "fully-assimilated",
    });
    exact("ACI-P049-L039-246AED30B6",
        omNohpalli.canonicalResult.outputForm === "ōnnohpalli"
            && omNohpalli.canonicalResult.outputSound === "nn",
        wrong("m", "n", { sourceLeftMorpheme: "ōm", sourceRightMorpheme: "nohpalli", spellingStyle: "fully-assimilated" }, "ōmnohpalli"));

    const partialExamples = [
        ["ACI-P050-L005-9FF09A5DC2", "t", "chicōm", "tepēc", "chicōntepēc"],
        ["ACI-P050-L006-E010CDBA9F", "tl", "cōm", "tlah", "cōntlah"],
        ["ACI-P050-L007-29AE5C2977", "ch", "cōm", "chīhua", "cōnchīhua"],
        ["ACI-P050-L008-AAB0B09006", "tz", "cōm", "tzālan", "cōntzālan"],
        ["ACI-P050-L009-0F31D4C5C8", "k", "tenām", "co", "tenānco"],
        ["ACI-P050-L010-5D9096C6B3", "kw", "cem", "cuemitl", "cencuemitl"],
    ];
    for (const [atomId, right, leftMorpheme, rightMorpheme, outputForm] of partialExamples) {
        const application = assimilate("m", right, {
            sourceLeftMorpheme: leftMorpheme,
            sourceRightMorpheme: rightMorpheme,
            spellingStyle: "fully-assimilated",
        });
        exact(atomId,
            application.canonicalResult.outputForm === outputForm
                && application.canonicalResult.assimilationType === "partial"
                && application.canonicalResult.outputSpelling.startsWith("n"),
            wrong("m", right, { sourceLeftMorpheme: leftMorpheme, sourceRightMorpheme: rightMorpheme, spellingStyle: "fully-assimilated" }, `${leftMorpheme}${rightMorpheme}`));
    }

    const onMopiqui = assimilate("n", "m", {
        sourceLeftMorpheme: "on", sourceRightMorpheme: "mopiqui",
        spellingStyle: "fully-assimilated",
    });
    const zanMoyollo = assimilate("n", "m", {
        sourceLeftMorpheme: "zan", sourceRightMorpheme: "moyōllo",
        spellingStyle: "source-preserving", joinWithSpace: true,
    });
    const zamMoyollo = assimilate("n", "m", {
        sourceLeftMorpheme: "zan", sourceRightMorpheme: "moyōllo",
        spellingStyle: "fully-assimilated", joinWithSpace: true,
    });
    exact("ACI-P050-L012-98FD2CCC6F",
        onMopiqui.canonicalResult.outputForm === "ommopiqui"
            && zanMoyollo.canonicalResult.outputForm === "zan moyōllo"
            && zamMoyollo.canonicalResult.outputForm === "zam moyōllo"
            && [onMopiqui, zanMoyollo, zamMoyollo].every(item => item.canonicalResult.outputSound === "mm"),
        wrong("n", "m", { sourceLeftMorpheme: "on", sourceRightMorpheme: "mopiqui", spellingStyle: "fully-assimilated" }, "onmopiqui"));

    const onPehua = assimilate("n", "p", {
        sourceLeftMorpheme: "on", sourceRightMorpheme: "pēhua",
        spellingStyle: "fully-assimilated",
    });
    const inPani = assimilate("n", "p", {
        sourceLeftMorpheme: "in", sourceRightMorpheme: "pani",
        spellingStyle: "fully-assimilated", joinWithSpace: true,
    });
    exact("ACI-P050-L015-7913C1CB36",
        onPehua.canonicalResult.outputForm === "ompēhua"
            && inPani.canonicalResult.outputForm === "im pani"
            && onPehua.canonicalResult.outputSound === "mp",
        wrong("n", "p", { sourceLeftMorpheme: "on", sourceRightMorpheme: "pēhua", spellingStyle: "fully-assimilated" }, "onpēhua"));

    const rareChP = assimilate("ch", "p", {
        sourceLeftMorpheme: "tzīntlāltech", sourceRightMorpheme: "pachihui",
        spellingStyle: "fully-assimilated",
    });
    const preservedChP = assimilate("ch", "p", {
        sourceLeftMorpheme: "tzīntlāltech", sourceRightMorpheme: "pachihui",
        spellingStyle: "source-preserving",
    });
    exact("ACI-P050-L019-4509698520",
        rareChP.canonicalResult.outputForm === "tzīntlālteppachihui"
            && preservedChP.canonicalResult.outputForm === "tzīntlāltechpachihui"
            && rareChP.canonicalResult.lowFrequency === true,
        wrong("ch", "p", { sourceLeftMorpheme: "tzīntlāltech", sourceRightMorpheme: "pachihui", spellingStyle: "fully-assimilated" }, "tzīntlāltechpachihui"));

    const mexihco = assimilate("k", "k", {
        sourceLeftMorpheme: "Mēxic", sourceRightMorpheme: "co",
        spellingStyle: "fully-assimilated",
    });
    exact("ACI-P050-L024-55CD4D646B",
        mexihco.canonicalResult.outputForm === "mēxihco"
            && mexihco.canonicalResult.processKind === "dissimilation"
            && mexihco.canonicalResult.outputSound === "hk",
        wrong("k", "k", { sourceLeftMorpheme: "Mēxic", sourceRightMorpheme: "co", spellingStyle: "fully-assimilated" }, "mēxicco"));

    const delabialization = request("phonology:consonant-shift", [{
        sourceConsonant: "kw", position: "exposed", grammaticalConstruction: true,
    }]);
    const kkToHk = assimilate("k", "k");
    exact("ACI-P050-L026-8BDE89138D",
        delabialization.authorizationStatus === "authorized"
            && delabialization.canonicalResult.outputSound === "k"
            && kkToHk.authorizationStatus === "authorized"
            && kkToHk.canonicalResult.outputSound === "hk",
        request("phonology:consonant-shift", [{ sourceConsonant: "kw", position: "syllable-initial", grammaticalConstruction: true }]).authorizationStatus === "authorized");

    return s;
}

module.exports = { run };
