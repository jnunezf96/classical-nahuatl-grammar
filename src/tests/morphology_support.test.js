"use strict";

/**
 * Tests for src/core/generation/morphology_support.mjs
 * Covers: tense suffix rules, directional support, patientivo possession
 * adjustment, and small morphology utilities.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("morphology_support");

    s.eq("applyTenseSuffixRules preserves preterito suffix", ctx.applyTenseSuffixRules("preterito", "t"), "t");
    s.eq("applyTenseSuffixRules resolves pasado-remoto suffix", ctx.applyTenseSuffixRules("pasado-remoto", "t"), "cat");

    s.eq("getAgentivoNumberSuffix plural slot", ctx.getAgentivoNumberSuffix("p"), "huān");
    s.eq("applyAgentivoNumberSuffix appends plural marker", ctx.applyAgentivoNumberSuffix("lis", "p"), "lishuān");
    s.eq("applyPatientivoAdjectiveNumberSuffix t -> meh", ctx.applyPatientivoAdjectiveNumberSuffix("t"), "meh");

    s.ok("startsWithAny matches shared prefix", ctx.startsWithAny("nemi", ["ne", "ca"]));
    s.eq("getTotalVowelCount counts nemi vowels", ctx.getTotalVowelCount("nemi"), 2);

    const hualPlan = ctx.buildHualDirectionalPlan({
        pers1Base: "",
        obj1Base: "qui",
        directionalOutputPrefix: "huāl",
    });
    s.ok("buildHualDirectionalPlan places huāl after a specific third-person object", hualPlan.placeAfterSpecificProjectiveObject);
    s.eq("buildHualDirectionalPlan preserves the Classical output prefix", hualPlan.directionalOutputPrefix, "huāl");

    const hualRealization = ctx.resolveDirectionalOutputChain({
        pers1: "",
        obj1: "qui",
        tronco: "huālitta",
        directionalChainMeta: {
            directionalInputPrefix: "huāl",
            pers1Base: "",
            pers2Base: "",
            obj1Base: "qui",
            directionalOutputPrefix: "huāl",
            directionalPlan: hualPlan,
            tense: "presente",
        },
    });
    s.eq("resolveDirectionalOutputChain composes the Classical huāl object chain", hualRealization.obj1, "quihuāl");
    s.eq("resolveDirectionalOutputChain strips huāl from tronco", hualRealization.tronco, "itta");

    const intransitiveHualPlan = ctx.buildHualDirectionalPlan({
        pers1Base: "ni",
        obj1Base: "",
        directionalOutputPrefix: "huāl",
        directionalRuleMode: "intransitive",
        isIntransitiveVerb: true,
    });
    const intransitiveHualRealization = ctx.resolveDirectionalOutputChain({
        pers1: "ni",
        obj1: "",
        tronco: "huālcholoa",
        directionalChainMeta: {
            directionalInputPrefix: "huāl",
            pers1Base: "ni",
            pers2Base: "",
            obj1Base: "",
            directionalOutputPrefix: "huāl",
            directionalPlan: intransitiveHualPlan,
            directionalRuleMode: "intransitive",
            tense: "presente",
            isIntransitiveVerb: true,
        },
    });
    s.eq("buildHualDirectionalPlan preserves intransitive Classical huāl", intransitiveHualPlan.directionalOutputPrefix, "huāl");
    s.eq(
        "resolveDirectionalOutputChain realizes the intransitive Classical huāl chain",
        {
            pers1: intransitiveHualRealization.pers1,
            obj1: intransitiveHualRealization.obj1,
            tronco: intransitiveHualRealization.tronco,
        },
        {
            pers1: "ni",
            obj1: "huāl",
            tronco: "choloa",
        }
    );

    s.eq(
        "adjustPatientivoPossessiveSuffix converts tli to yo in organic ownership",
        ctx.adjustPatientivoPossessiveSuffix("tli", true, "yo", {}),
        "yo"
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix default ownership drops ti after consonant-final patientive stem",
        ctx.adjustPatientivoPossessiveSuffix("tli", true, undefined, { stem: "tlaquetz" }),
        ""
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix default ownership rejects ti after vowel-final stem",
        ctx.adjustPatientivoPossessiveSuffix("tli", true, undefined, { stem: "naca" }),
        null
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix zero-ownership clears in",
        ctx.adjustPatientivoPossessiveSuffix("in", true, "zero", {}),
        ""
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix zero-ownership still clears tl",
        ctx.adjustPatientivoPossessiveSuffix("tl", true, "zero", {}),
        ""
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix default ownership keeps hu after a vowel-final tl stem",
        ctx.adjustPatientivoPossessiveSuffix("tl", true, undefined, { stem: "temi" }),
        "hu"
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix default ownership drops hu after consonant-final in stem",
        ctx.adjustPatientivoPossessiveSuffix("in", true, undefined, { stem: "ten" }),
        ""
    );

    return s;
}

module.exports = { run };
