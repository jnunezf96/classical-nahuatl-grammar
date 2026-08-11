"use strict";

const { createSuite } = require("./runner");

const LENGTH_ATOMS = Object.freeze([
    ["ACI-P048-L006-25D05DF809", value => value.p.long && value.p.spelling === "pp"],
    ["ACI-P048-L007-7D80962D8F", value => value.p.long && value.p.mode === "single-bridging-pronunciation"],
    ["ACI-P048-L014-75FA4A7118", value => value.tz.releaseLost && value.ch.releaseLost],
    ["ACI-P048-L014-6209EBFA5B", value => value.tz.release === "[t¢]" && value.ch.release === "[tč]"],
    ["ACI-P048-L017-21FD087CB5", value => value.p.spelling === "pp" && value.ch.spelling === "chch"],
    ["ACI-P048-L017-AA7D9FFE1E", value => value.n.spelling === "nn" && value.x.spelling === "xx"],
    ["ACI-P048-L020-5D3CE9F346", value => value.p.spelling === "pp"],
    ["ACI-P048-L021-F4ABE9D684", value => value.n.spelling === "nn"],
    ["ACI-P048-L022-E80F04FD5F", value => value.z.spelling === "zz"],
    ["ACI-P048-L023-40EA5A1AE2", value => value.ch.spelling === "chch"],
    ["ACI-P048-L024-D82B147173", value => value.t.spelling === "tt"],
    ["ACI-P048-L025-80DD05B6AD", value => value.m.spelling === "mm"],
    ["ACI-P048-L026-1D67AB27C4", value => value.x.spelling === "xx"],
    ["ACI-P048-L027-3DE404BBB6", value => value.tz.spelling === "tztz"],
]);

const PROGRESSIVE_ATOMS = Object.freeze([
    ["ACI-P048-L031-8CCC8F75E7", value => value.mīltlah.applied],
    ["ACI-P048-L031-93FE5B0669", value => value.mīltlah.applied],
    ["ACI-P048-L033-9117D5E59C", value => value.mīltlah.solid === "mīllah"],
    ["ACI-P048-L033-4DBE276D8A", value => value.pilyōtl.solid === "pillōtl"],
    ["ACI-P048-L036-B8514ED37A", value => value.mīltlah.direction === "progressive"],
    ["ACI-P048-L038-479C0137E2", value => value.mīltlah.direction === "progressive"],
    ["ACI-P049-L002-B51D7D7656", value => value.mīltlah.solid === "mīllah"],
    ["ACI-P049-L003-AD6AB5D703", value => value.pilyōtl.solid === "pillōtl"],
    ["ACI-P049-L004-D7CCA4F6F0", value => value.chōquizyoh.solid === "chōquizzoh"],
    ["ACI-P049-L005-54CFD576ED", value => value.mixyoh.solid === "mixxoh"],
    ["ACI-P049-L006-0AE4EA92F1", value => value.huitzyoh.solid === "huitztzoh"],
    ["ACI-P049-L007-91AB12AD1D", value => value.oquichyōtl.solid === "oquichchōtl"],
    ["ACI-P049-L008-212820251B", value => value.prohibitedLl.blocked],
]);

function run(ctx) {
    const s = createSuite("classical_lesson2_length_progressive_jobs");
    const length = consonant => {
        const application = ctx.executeClassicalGrammarApplicationRequest({
            operationId: "phonology:consonant-length",
            args: [{ leftConsonant: consonant, rightConsonant: consonant, boundaryType: "within-vocable", grammaticalConstruction: true }],
        });
        const result = application.canonicalResult;
        return {
            authorized: application.authorizationStatus === "authorized" && ctx.isClassicalNahuatlTranscriptionAnalysisFrame(result),
            long: result?.longConsonant === true,
            spelling: result?.outputSpelling || "",
            mode: result?.pronunciationMode || "",
            releaseLost: result?.releaseFeatureLost === true,
            release: result?.releasePronunciation || "",
        };
    };
    const lengths = { p: length("p"), n: length("n"), z: length("z"), ch: length("ch"), t: length("t"), m: length("m"), x: length("x"), tz: length("tz") };
    s.eq("long consonants run through the ordinary application request", {
        allAuthorized: Object.values(lengths).every(value => value.authorized),
        spellings: Object.fromEntries(Object.entries(lengths).map(([key, value]) => [key, value.spelling])),
    }, { allAuthorized: true, spellings: { p: "pp", n: "nn", z: "zz", ch: "chch", t: "tt", m: "mm", x: "xx", tz: "tztz" } });

    const progressive = stem => {
        const application = ctx.executeClassicalGrammarApplicationRequest({ operationId: "phonology:progressive-assimilation", args: [stem] });
        const result = application.canonicalResult;
        return {
            authorized: application.authorizationStatus === "authorized" && ctx.isClassicalNahuatlTranscriptionAnalysisFrame(result),
            blocked: application.authorizationStatus === "blocked",
            applied: result?.transformationApplied === true,
            solid: result?.realizedSolidStem || "",
            direction: result?.boundaryActions?.[0]?.selectedRuleId?.includes("progressive") ? "progressive" : "",
        };
    };
    const progressives = {
        mīltlah: progressive("mīl-tlah"), pilyōtl: progressive("pil-yōtl"),
        chōquizyoh: progressive("chōquiz-yoh"), mixyoh: progressive("mix-yoh"),
        huitzyoh: progressive("huitz-yoh"), oquichyōtl: progressive("oquich-yōtl"),
        prohibitedLl: progressive("cal-lah"),
    };
    s.eq("progressive assimilation runs through the ordinary application request", {
        authorized: ["mīltlah", "pilyōtl", "chōquizyoh", "mixyoh", "huitzyoh", "oquichyōtl"].every(key => progressives[key].authorized),
        outputs: Object.fromEntries(Object.entries(progressives).filter(([key]) => key !== "prohibitedLl").map(([key, value]) => [key, value.solid])),
        unrelatedLlBlocked: progressives.prohibitedLl.blocked,
    }, {
        authorized: true,
        outputs: { mīltlah: "mīllah", pilyōtl: "pillōtl", chōquizyoh: "chōquizzoh", mixyoh: "mixxoh", huitzyoh: "huitztzoh", oquichyōtl: "oquichchōtl" },
        unrelatedLlBlocked: true,
    });

    for (const [atomId, observes] of LENGTH_ATOMS) {
        s.eq(`${atomId}: exact long-consonant job`, observes(lengths), true);
        const broken = structuredClone(lengths);
        for (const value of Object.values(broken)) { value.long = false; value.spelling = "broken"; value.mode = "broken"; value.releaseLost = false; value.release = "broken"; }
        s.eq(`${atomId}: changing length behavior fails`, observes(broken), false);
    }
    for (const [atomId, observes] of PROGRESSIVE_ATOMS) {
        s.eq(`${atomId}: exact progressive-assimilation job`, observes(progressives), true);
        const broken = structuredClone(progressives);
        for (const value of Object.values(broken)) { value.applied = false; value.solid = "broken"; value.direction = "broken"; value.blocked = false; }
        s.eq(`${atomId}: changing assimilation behavior fails`, observes(broken), false);
    }
    return s;
}

module.exports = { run };
