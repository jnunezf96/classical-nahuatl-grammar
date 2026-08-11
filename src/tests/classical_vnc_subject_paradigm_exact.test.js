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
    const s = createSuite("classical_vnc_subject_paradigm_exact");
    const frame = ctx.buildClassicalNahuatlSubjectParadigmSystemFrame();
    const observations = [
        ["ACI-P068-L017-A6B7673EF4-02", "thirdCommon.formula", "#Ø-Ø(...+Ø-Ø#"],
        ["ACI-P068-L017-A6B7673EF4-03", "thirdCommon.interpretations.singularHumanMale", "he"],
        ["ACI-P068-L017-A6B7673EF4-04", "thirdCommon.interpretations.singularHumanFemale", "she"],
        ["ACI-P068-L017-A6B7673EF4-05", "thirdCommon.interpretations.singularAnimateNonhuman", "it"],
        ["ACI-P068-L017-A6B7673EF4-06", "thirdCommon.interpretations.singularNonanimate", "it"],
        ["ACI-P068-L017-A6B7673EF4-07", "thirdCommon.interpretations.pluralNonanimate", "they"],
        ["ACI-P068-L018-0EEEF40773", "thirdPluralAnimate.formula", "#Ø-Ø(...+Ø-h#"],
        ["ACI-P068-L018-0EEEF40773-02", "thirdPluralAnimate.person", "third"],
        ["ACI-P068-L018-0EEEF40773-03", "thirdPluralAnimate.number", "plural"],
        ["ACI-P068-L018-0EEEF40773-04", "thirdPluralAnimate.animacy", "animate"],
        ["ACI-P068-L018-0EEEF40773-05", "pastOptativeUsesMainParadigm", true],
        ["ACI-P068-L018-0EEEF40773-06", "secondPersonPastOptativePers1Variants", ["x", "xi"]],
        ["ACI-P068-L024-CACB480BD5-02", "futurePreteritGlossParity", true],
        ["ACI-P068-L027-E61AF11E5D", "firstPluralFuturePreterit.futureFormula", "#t-Ø(...+qu-eh#"],
        ["ACI-P068-L027-E61AF11E5D-02", "firstPluralFuturePreterit.person", "first"],
        ["ACI-P068-L027-E61AF11E5D-03", "firstPluralFuturePreterit.number", "plural"],
        ["ACI-P068-L027-E61AF11E5D-04", "singularFuturePreteritConnectorAlternation.silentReplacesQui", true],
        ["ACI-P068-L029-F34FBD9C32", "singularFuturePreteritConnectorAlternation.limitedToSingular", true],
    ];
    for (const [atomId, path, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, get(frame, path), expected);
        const replacement = typeof expected === "boolean" ? !expected
            : Array.isArray(expected) ? ["BROKEN"]
                : `${expected}-BROKEN`;
        s.no(`${atomId} rejects a broken ${path}`, JSON.stringify(get(set(frame, path, replacement), path)) === JSON.stringify(expected));
    }
    s.ok("the subject-paradigm Result was issued by its canonical owner", ctx.isClassicalNahuatlSubjectParadigmSystemFrame(frame));
    return s;
}

module.exports = { run };
