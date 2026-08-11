"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_subject_person_dyad_exact");
    const frame = ctx.buildClassicalNahuatlSubjectPersonDyadSystemFrame();
    const exact = candidate => candidate.secondSingularFirstPluralPers1Homophonous === true
        && candidate.fillers.secondSingular === "t"
        && candidate.fillers.firstPlural === "t"
        && candidate.numberSuffixRequiredForSecondSingularFirstPluralDisambiguation === true
        && JSON.stringify(candidate.secondPluralMEnvironments) === JSON.stringify(["before-vowel", "before-m", "before-p"])
        && JSON.stringify(candidate.secondPluralNasalAssimilationVariants) === JSON.stringify(["am", "an", "az", "ax"])
        && candidate.allLicensedSecondPluralNasalAssimilationsAvailable === true;
    s.ok("the canonical Result derives every remaining person-dyad requirement", exact(frame));
    for (const mutate of [
        candidate => { candidate.fillers.firstPlural = "n"; },
        candidate => { candidate.numberSuffixRequiredForSecondSingularFirstPluralDisambiguation = false; },
        candidate => { candidate.secondPluralMEnvironments = ["before-vowel", "before-m"]; },
        candidate => { candidate.secondPluralNasalAssimilationVariants = ["am", "an", "az"]; },
        candidate => { candidate.allLicensedSecondPluralNasalAssimilationsAvailable = false; },
    ]) {
        const hostile = JSON.parse(JSON.stringify(frame));
        mutate(hostile);
        s.no("the exact observation rejects a broken shared behavior", exact(hostile));
    }
    s.ok("the Result was issued by the canonical system owner", ctx.isClassicalNahuatlSubjectPersonDyadSystemFrame(frame));
    return s;
}

module.exports = { run };
