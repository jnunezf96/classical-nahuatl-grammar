"use strict";

const { createSuite } = require("./runner");

const ATOM_OBSERVATIONS = Object.freeze([
    ["ACI-P049-L015-C455C3B960", value => value.nasalS.kind === "assimilation" && value.nasalS.direction === "regressive" && value.mN.direction === "regressive"],
    ["ACI-P049-L017-858F416ABB", value => value.nasalS.sound === "ss" && value.nasalX.sound === "šš"],
    ["ACI-P049-L025-D67ABE3304", value => value.chTz.spelling === "tztz" && value.tzCh.spelling === "chch"],
    ["ACI-P049-L026-3F7681258F", value => value.chTz.authorized && value.chS.authorized && value.tzCh.authorized && value.chX.authorized],
    ["ACI-P049-L027-6C08DCFF81", value => value.chTz.sound === "¢¢" && value.chS.sound === "ss" && value.tzCh.sound === "čč" && value.chX.sound === "šš"],
    ["ACI-P049-L035-5545D7F300", value => value.wM.spelling === "mm" && value.wP.spelling === "pp"],
    ["ACI-P049-L038-A0960810AA", value => value.mN.spelling === "nn"],
    ["ACI-P050-L002-2A6FAEECC1", value => [value.mT.spelling, value.mTl.spelling, value.mTz.spelling, value.mCh.spelling, value.mK.spelling, value.mKw.spelling].join(",") === "nt,ntl,ntz,nch,nc,ncu"],
    ["ACI-P050-L003-3F5C1F70A0", value => [value.mT.spelling, value.mTl.spelling, value.mTz.spelling, value.mCh.spelling, value.mK.spelling, value.mKw.spelling].every(spelling => spelling.startsWith("n"))],
    ["ACI-P050-L011-3504D7C808", value => value.nM.spelling === "mm"],
    ["ACI-P050-L014-BF59E2C201", value => value.nP.spelling === "mp"],
    ["ACI-P050-L017-467770C28E", value => value.chP.lowFrequency],
    ["ACI-P050-L018-F2730C2E59", value => value.chP.spelling === "pp"],
    ["ACI-P050-L021-98D398DFAD", value => value.kK.kind === "dissimilation" && value.kK.spelling === "hc"],
    ["ACI-P050-L022-A33747C200", value => value.kK.optional && value.kK.direction === "regressive"],
    ["ACI-P050-L023-D4122E6980", value => value.kK.sound === "hk" && value.kK.spelling === "hc"],
]);

function run(ctx) {
    const s = createSuite("classical_lesson2_regressive_rule_jobs");
    const assimilate = (leftConsonant, rightConsonant) => {
        const application = ctx.executeClassicalGrammarApplicationRequest({
            operationId: "phonology:assimilation",
            args: [{ leftConsonant, rightConsonant, grammaticalConstruction: true }],
        });
        const result = application.canonicalResult;
        return {
            authorized: application.authorizationStatus === "authorized" && ctx.isClassicalNahuatlTranscriptionAnalysisFrame(result),
            kind: result?.processKind || "",
            direction: result?.direction || "",
            sound: result?.outputSound || "",
            spelling: result?.outputSpelling || "",
            lowFrequency: result?.lowFrequency === true,
            optional: result?.optional === true,
        };
    };
    const observed = {
        nasalS: assimilate("m", "s"), nasalX: assimilate("n", "x"),
        chTz: assimilate("ch", "tz"), chS: assimilate("ch", "s"), tzCh: assimilate("tz", "ch"), chX: assimilate("ch", "x"),
        wM: assimilate("w", "m"), wP: assimilate("w", "p"), mN: assimilate("m", "n"),
        mT: assimilate("m", "t"), mTl: assimilate("m", "tl"), mTz: assimilate("m", "tz"), mCh: assimilate("m", "ch"), mK: assimilate("m", "k"), mKw: assimilate("m", "kw"),
        nM: assimilate("n", "m"), nP: assimilate("n", "p"), chP: assimilate("ch", "p"), kK: assimilate("k", "k"),
    };
    s.eq("regressive assimilation and dissimilation run through the ordinary application request", {
        allAuthorized: Object.values(observed).every(value => value.authorized),
        outputs: Object.fromEntries(Object.entries(observed).map(([key, value]) => [key, value.spelling])),
    }, {
        allAuthorized: true,
        outputs: { nasalS: "zz", nasalX: "xx", chTz: "tztz", chS: "zz", tzCh: "chch", chX: "xx", wM: "mm", wP: "pp", mN: "nn", mT: "nt", mTl: "ntl", mTz: "ntz", mCh: "nch", mK: "nc", mKw: "ncu", nM: "mm", nP: "mp", chP: "pp", kK: "hc" },
    });
    for (const [atomId, observes] of ATOM_OBSERVATIONS) {
        s.eq(`${atomId}: exact regressive rule job`, observes(observed), true);
        const broken = structuredClone(observed);
        for (const value of Object.values(broken)) { value.authorized = false; value.kind = "broken"; value.direction = "broken"; value.sound = "broken"; value.spelling = "broken"; value.lowFrequency = false; value.optional = false; }
        s.eq(`${atomId}: changing the regressive rule fails`, observes(broken), false);
    }
    return s;
}

module.exports = { run };
