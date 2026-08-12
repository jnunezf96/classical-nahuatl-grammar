"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_lesson2_spelling_stress_lateral_jobs");
    const request = (operationId, args) =>
        ctx.executeClassicalGrammarApplicationRequest({ operationId, args });
    const spelling = options => request("phonology:spelling-change", [options]);
    const stress = (value, options = {}) => request("phonology:stress", [value, options]);
    const lateral = options => request("phonology:lateral-reading", [options]);
    const exact = (atomId, observed, broken) => {
        s.eq(`${atomId}: the normal application performs the exact job`, observed, true);
        s.eq(`${atomId}: changing the required behavior fails`, broken, false);
    };

    const kCa = spelling({ phoneme: "/k/", syllablePosition: "initial", followingVowel: "a" });
    const kQue = spelling({ phoneme: "/k/", syllablePosition: "initial", followingVowel: "e" });
    const sZa = spelling({ phoneme: "/s/", syllablePosition: "initial", followingVowel: "a" });
    const sCe = spelling({ phoneme: "/s/", syllablePosition: "initial", followingVowel: "e" });
    exact("ACI-P045-L037-854120FC29",
        [kCa, kQue, sZa, sCe].every(item => item.authorizationStatus === "authorized")
            && kCa.canonicalResult.outputSpelling === "c"
            && kQue.canonicalResult.outputSpelling === "qu"
            && sZa.canonicalResult.outputSpelling === "z"
            && sCe.canonicalResult.outputSpelling === "c"
            && [kCa, kQue, sZa, sCe].every(item => item.canonicalResult.pronunciationChanged === false),
        spelling({ phoneme: "/k/", syllablePosition: "initial", followingVowel: "e", requestedSpelling: "c" }).authorizationStatus === "authorized");
    const wInitial = spelling({ phoneme: "[w]", syllablePosition: "nonfinal", followingVowel: "a" });
    const wFinal = spelling({ phoneme: "[w]", syllablePosition: "final", precedingVowel: "a" });
    const kwInitial = spelling({ phoneme: "[kʷ]", syllablePosition: "nonfinal", followingVowel: "a" });
    const kwFinal = spelling({ phoneme: "[kʷ]", syllablePosition: "final", precedingVowel: "a" });
    exact("ACI-P045-L037-2764F7EB94",
        wInitial.canonicalResult.outputSpelling === "hu"
            && wFinal.canonicalResult.outputSpelling === "uh"
            && kwInitial.canonicalResult.outputSpelling === "cu"
            && kwFinal.canonicalResult.outputSpelling === "uc"
            && [wInitial, wFinal, kwInitial, kwFinal].every(item => item.canonicalResult.pronunciationChanged === true),
        spelling({ phoneme: "[w]", syllablePosition: "final", precedingVowel: "a", requestedSpelling: "hu" }).authorizationStatus === "authorized");

    const molpia = stress("molpia", { finalShortVowelContrast: true });
    const calac = stress("calac", { finalShortVowelContrast: true });
    exact("ACI-P047-L036-6CD7766584",
        molpia.authorizationStatus === "authorized"
            && molpia.canonicalResult.division === "mol-pi-a"
            && molpia.canonicalResult.stressedSyllable === "pi"
            && calac.canonicalResult.division === "ca-lac",
        stress("molpia", { ruleId: "broken-stress-rule" }).authorizationStatus === "authorized");

    const ordinary = stress("nopiltzin");
    const vocative = stress("nopiltziné", { vocativeParticle: true });
    exact("ACI-P047-L039-88C2F71613",
        ordinary.canonicalResult.stressRule === "penultimate"
            && vocative.canonicalResult.stressRule === "vocative-final-stress",
        stress("nopiltziné", { ruleId: "cn-l2-27-penultimate-vocable-stress", vocativeParticle: false }).canonicalResult.stressRule === "penultimate");
    exact("ACI-P047-L039-E77F9501C7",
        vocative.canonicalResult.vocativeParticle === true
            && vocative.canonicalResult.stressedSyllable === "ne",
        stress("nopiltzin", { vocativeParticle: false }).canonicalResult.vocativeParticle === true);
    exact("ACI-P047-L040-06C506AAFB",
        vocative.canonicalResult.vocativeHighPitch === true
            && vocative.canonicalResult.vocativeAccentSpelling === "é",
        ordinary.canonicalResult.vocativeHighPitch === true);

    const inOmpa = stress("inōmpa", { stressGroup: true, sourceVocables: ["in", "ōmpa"] });
    exact("ACI-P047-L044-EFA0C4600D",
        inOmpa.canonicalResult.stressGroupDivision === "i-nōm-pa",
        stress("inōmpa", { stressGroup: false }).canonicalResult.stressGroupDivision === "i-nōm-pa");
    const elided = request("phonology:vowel-elision", [{
        sourceMorpheme: "oc", targetMorpheme: "c", vowelLength: "short",
        stressGroupCombination: true,
    }]);
    const nonGroupElision = request("phonology:vowel-elision", [{
        sourceMorpheme: "oc", targetMorpheme: "c", vowelLength: "short",
        stressGroupCombination: false,
    }]);
    exact("ACI-P047-L046-84B2D61F57",
        elided.authorizationStatus === "authorized" && elided.canonicalResult.outputForm === "c",
        nonGroupElision.authorizationStatus === "authorized");

    const ini = stress("ini", { stressGroup: true, sourceVocables: ["īn", "in"], requestedTraditionalSolid: "ini" });
    exact("ACI-P047-L046-ACAAF1E12E", ini.canonicalResult.traditionalSolid === "ini", stress("ini", { stressGroup: true, sourceVocables: ["īn", "in"], requestedTraditionalSolid: "in in" }).authorizationStatus === "authorized");
    exact("ACI-P047-L046-ACAAF1E12E-02", ini.canonicalResult.sourceSequence === "īn in" && ini.canonicalResult.traditionalSolid === "ini", stress("ini", { stressGroup: true, sourceVocables: ["in", "in"] }).canonicalResult.sourceSequence === "īn in");
    exact("ACI-P047-L046-ACAAF1E12E-03", ini.canonicalResult.stressGroupDivision === "i-nin", stress("ini", { stressGroup: false }).canonicalResult.stressGroupDivision === "i-nin");
    exact("ACI-P047-L046-ACAAF1E12E-04", ini.canonicalResult.conclusion.stressedSyllable === "i" && ini.canonicalResult.conclusion.stressIndex === 0, stress("iyehuatl", { stressGroup: true, sourceVocables: ["in", "yehhuātl"] }).canonicalResult.conclusion.stressIndex === 0);

    const iyehuatl = stress("iyehuatl", { stressGroup: true, sourceVocables: ["in", "yehhuātl"], requestedTraditionalSolid: "iyehuatl" });
    exact("ACI-P048-L004-66769E844D", iyehuatl.canonicalResult.traditionalSolid === "iyehuatl", stress("iyehuatl", { stressGroup: true, sourceVocables: ["in", "yehhuātl"], requestedTraditionalSolid: "in yehhuātl" }).authorizationStatus === "authorized");
    exact("ACI-P048-L004-66769E844D-02", iyehuatl.canonicalResult.sourceSequence === "in yehhuātl", stress("iyehuatl", { stressGroup: true, sourceVocables: ["īc", "in"] }).canonicalResult.sourceSequence === "in yehhuātl");
    const iquin = stress("iquin", { stressGroup: true, sourceVocables: ["īc", "in"], requestedTraditionalSolid: "iquin" });
    exact("ACI-P048-L004-66769E844D-03", iquin.canonicalResult.traditionalSolid === "iquin", stress("iquin", { stressGroup: true, sourceVocables: ["īc", "in"], requestedTraditionalSolid: "icin" }).authorizationStatus === "authorized");
    exact("ACI-P048-L004-66769E844D-04", iquin.canonicalResult.sourceSequence === "īc in", stress("iquin", { stressGroup: true, sourceVocables: ["in", "īc"] }).canonicalResult.sourceSequence === "īc in");
    exact("ACI-P048-L004-66769E844D-05", iquin.canonicalResult.boundarySpelling === "qu", stress("ini", { stressGroup: true, sourceVocables: ["īn", "in"] }).canonicalResult.boundarySpelling === "qu");

    const quake = lateral({ sourceForm: "ollin", intendedMeaning: "quake" });
    const latex = lateral({ sourceForm: "ollin", intendedMeaning: "latex" });
    exact("ACI-P049-L010-9ED6E28F75-02",
        quake.authorizationStatus === "authorized"
            && quake.canonicalResult.canonicalForm === "ōlīn"
            && quake.canonicalResult.sourceIsCanonical === false,
        lateral({ sourceForm: "ollin", intendedMeaning: "quake", requestedResult: "ollin" }).authorizationStatus === "authorized");
    exact("ACI-P049-L010-9ED6E28F75-03",
        latex.authorizationStatus === "authorized"
            && latex.canonicalResult.canonicalForm === "ōlli"
            && latex.canonicalResult.sourceIsCanonical === false,
        lateral({ sourceForm: "ollin", intendedMeaning: "latex", requestedResult: "ollin" }).authorizationStatus === "authorized");
    exact("ACI-P049-L010-9ED6E28F75-04",
        latex.canonicalResult.lateralLength === "long"
            && latex.canonicalResult.progressiveRule === "l-plus-tl-to-ll",
        quake.canonicalResult.progressiveRule === "l-plus-tl-to-ll");
    exact("ACI-P049-L010-9ED6E28F75-05",
        latex.canonicalResult.finalConsonant === "" && quake.canonicalResult.finalConsonant === "n",
        latex.canonicalResult.finalConsonant === "n");
    const longWrittenForShort = lateral({ sourceForm: "traditional-form", writtenLateralLength: "long", phonologicalLateralLength: "short" });
    const shortWrittenForLong = lateral({ sourceForm: "traditional-form", writtenLateralLength: "short", phonologicalLateralLength: "long" });
    exact("ACI-P049-L012-157BDD7209",
        longWrittenForShort.canonicalResult.traditionalSpellingRelation === "ll-written-for-short-l",
        lateral({ sourceForm: "traditional-form", writtenLateralLength: "short", phonologicalLateralLength: "short" }).canonicalResult.traditionalSpellingWarning === true);
    exact("ACI-P049-L012-157BDD7209-02",
        shortWrittenForLong.canonicalResult.traditionalSpellingRelation === "l-written-for-long-ll",
        lateral({ sourceForm: "traditional-form", writtenLateralLength: "long", phonologicalLateralLength: "long" }).canonicalResult.traditionalSpellingWarning === true);

    return s;
}

module.exports = { run };
