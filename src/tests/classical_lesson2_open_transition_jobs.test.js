"use strict";

const { createSuite } = require("./runner");

const ATOM_OBSERVATIONS = Object.freeze([
    ["ACI-P046-L009-EFF49EA6AF", value => value.supportive.boundary === "compound-stem-boundary"],
    ["ACI-P046-L011-06E359A028", value => value.supportive.rule === "cn-l2-25-supportive-i-kept" && value.k.rule === "cn-l2-25-stem-final-k-before-e-i-qu"],
    ["ACI-P046-L011-06E359A028-02", value => value.supportive.spelling === "i"],
    ["ACI-P046-L011-06E359A028-03", value => value.supportive.example === "tekoma + ikšiλ"],
    ["ACI-P046-L011-06E359A028-04", value => value.wFinal.spelling === "uh" && value.wFinal.finalSound],
    ["ACI-P046-L011-06E359A028-05", value => value.wFinal.example === "cuauhēhuatl"],
    ["ACI-P046-L014-F4DAC0D6CD", value => value.wFinal.spelling === "uh" && value.wFinal.finalSound],
    ["ACI-P046-L016-673C32854A", value => value.k.exception && value.kw.exception && value.wVariant.exception],
    ["ACI-P046-L016-611CEFD323", value => value.k.spelling === "qu"],
    ["ACI-P046-L016-611CEFD323-02", value => value.k.example === "tēyēquihtoa"],
    ["ACI-P046-L017-F8C9C48474", value => value.kw.spelling === "cu" && value.kw.example === "necuātl"],
    ["ACI-P046-L019-E3C2518B7A", value => value.wVariant.spelling === "hu" && value.wVariant.example === "cuācuahueh"],
]);

function run(ctx) {
    const s = createSuite("classical_lesson2_open_transition_jobs");
    const apply = options => {
        const application = ctx.executeClassicalGrammarApplicationRequest({
            operationId: "phonology:open-transition",
            args: [options],
        });
        const result = application.canonicalResult;
        return {
            authorized: application.authorizationStatus === "authorized"
                && ctx.isClassicalNahuatlTranscriptionAnalysisFrame(result),
            boundary: result?.boundaryType || "",
            rule: result?.selectedRuleId || "",
            spelling: result?.outputSpelling || "",
            example: result?.outputExample || "",
            finalSound: result?.conclusion?.spelledAsVocableFinal === true,
            exception: result?.conclusion?.exception === true,
        };
    };
    const observed = {
        supportive: apply({ boundaryType: "compound", stemInitialSupportiveI: true, stemFinalPhoneme: "/k/", followingVowel: "a" }),
        wFinal: apply({ boundaryType: "compound", stemFinalPhoneme: "/w/", followingVowel: "e" }),
        k: apply({ boundaryType: "compound", stemFinalPhoneme: "/k/", followingVowel: "i" }),
        kw: apply({ boundaryType: "compound", stemFinalPhoneme: "/kʷ/", followingVowel: "a" }),
        wVariant: apply({ boundaryType: "compound", stemFinalPhoneme: "/w/", followingVowel: "e", requestedSpelling: "hu" }),
    };
    s.eq("all open-transition jobs run through the ordinary application request", {
        allAuthorized: Object.values(observed).every(value => value.authorized),
        spellings: Object.fromEntries(Object.entries(observed).map(([key, value]) => [key, value.spelling])),
    }, {
        allAuthorized: true,
        spellings: { supportive: "i", wFinal: "uh", k: "qu", kw: "cu", wVariant: "hu" },
    });
    for (const [atomId, observes] of ATOM_OBSERVATIONS) {
        s.eq(`${atomId}: exact open-transition job`, observes(observed), true);
        const broken = structuredClone(observed);
        for (const value of Object.values(broken)) {
            value.boundary = "broken";
            value.rule = "broken";
            value.spelling = "broken";
            value.example = "broken";
            value.finalSound = false;
            value.exception = false;
        }
        s.eq(`${atomId}: changing its boundary behavior fails`, observes(broken), false);
    }
    return s;
}

module.exports = { run };
