"use strict";

const { createSuite } = require("./runner");

const LOSS_ATOMS = Object.freeze([
    ["ACI-P050-L028-B8D8FC0DC6", value => value.tzW.lost && value.glottalYH.lost],
    ["ACI-P050-L029-420DB9E127", value => value.tzW.kind === "consonant-loss"],
    ["ACI-P050-L029-420DB9E127-02", value => value.tzW.side === "right" && value.glottalYY.side === "left"],
    ["ACI-P050-L031-20EA88210A", value => value.tzW.spelling === "tz" && value.tzW.optional],
    ["ACI-P050-L033-8ED17977BE", value => value.chW.spelling === "ch" && value.chW.optional],
    ["ACI-P050-L035-9EFC19B9DD", value => value.glottalYH.spelling === "h" && value.glottalYH.optional],
    ["ACI-P050-L038-FDCDDD3E8C", value => value.glottalYY.side === "left"],
    ["ACI-P050-L039-F36B64DA08", value => value.glottalYY.sound === "y"],
    ["ACI-P051-L002-C2956C7FBE", value => value.nasalY.sound === "y" && value.nasalY.nasalTrace],
    ["ACI-P051-L010-2EE5A7A9B5", value => value.nasalW.sound === "w" && value.nasalW.nasalTrace],
    ["ACI-P051-L012-BC6FF0C48A", value => value.nasalW.spelling === "nhu"],
    ["ACI-P051-L017-604F54B6B3", value => value.wW.sound === "w" && value.wW.side === "left"],
]);

const SHIFT_ATOMS = Object.freeze([
    ["ACI-P051-L019-A6D680E32A", value => value.mFinal.kind === "consonant-shift"],
    ["ACI-P051-L019-97F9BE6EAC", value => value.yFinal.sound === "š" && value.tFinal.sound === "h"],
    ["ACI-P051-L024-FA7BB4A79C", value => value.glottalVowel.spelling === "ya" && value.glottalVowel.optional],
    ["ACI-P051-L033-C91A77F168", value => value.mFinal.sound === "n̥" && value.mFinal.spelling === "n"],
    ["ACI-P051-L036-56B81394BE", value => value.mBeforeVowel.sound === "m" && value.mBeforeVowel.reverts],
    ["ACI-P052-L004-6BDC02425C", value => value.yFinal.sound === "š" && value.yFinal.spelling === "x"],
    ["ACI-P052-L007-141665CE3D", value => value.yAfterS.sound === "s" && value.yAfterS.spelling === "z"],
    ["ACI-P052-L010-C54302F544", value => value.kwFinal.sound === "k" && value.kwFinal.spelling === "c"],
    ["ACI-P052-L014-75267806EC", value => value.tFinal.sound === "h" && value.tFinal.spelling === "h"],
    ["ACI-P052-L017-66E82EE5B5", value => value.glottalNonfinal.sound === "t" && value.glottalNonfinal.rare],
]);

const ELISION_ATOMS = Object.freeze([
    ["ACI-P052-L020-B62AAD1010", value => value.short.authorized && value.short.output === "c"],
    ["ACI-P052-L021-547243D130", value => value.long.blocked && value.long.reason === "long-vowel-resists-elision"],
    ["ACI-P052-L027-342C84A888", value => value.written.spellingChange],
    ["ACI-P052-L028-1D946166F0", value => value.supportive.authorized && !value.supportive.proper],
    ["ACI-P052-L028-F3ABD9CFDA", value => value.supportive.authorized && !value.supportive.proper],
]);

const LOSS_EXAMPLE_ATOMS = Object.freeze([
    ["ACI-P050-L032-6A854B5881", value => value.tzW.spelling === "tz"],
    ["ACI-P050-L034-0CE6C057A3", value => value.chW.spelling === "ch"],
    ["ACI-P050-L036-079BB77243", value => value.glottalYH.sound === "h"],
    ["ACI-P050-L037-A7ED68BC22", value => value.glottalYH.spelling === "h"],
    ["ACI-P050-L041-5B4B525A12", value => value.glottalYY.sound === "y"],
    ["ACI-P051-L006-3F84F180F0", value => value.nasalY.nasalTrace],
    ["ACI-P051-L008-420FE74E92", value => value.nasalY.authorized],
    ["ACI-P051-L008-420FE74E92-02", value => value.nasalY.sound === "y"],
    ["ACI-P051-L008-420FE74E92-03", value => value.nasalY.nasalTrace],
    ["ACI-P051-L008-420FE74E92-05", value => value.nasalY.authorized],
    ["ACI-P051-L008-420FE74E92-06", value => value.nasalY.sound === "y" && value.nasalY.nasalTrace],
    ["ACI-P051-L008-420FE74E92-08", value => value.nasalY.spelling === "ny" && value.nasalY.sound === "y"],
    ["ACI-P051-L015-986907F7FC", value => value.nasalW.sound === "w" && value.nasalW.nasalTrace],
    ["ACI-P051-L018-ED7D149E28", value => value.wW.sound === "w"],
]);

const SHIFT_EXAMPLE_ATOMS = Object.freeze([
    ["ACI-P051-L026-7282155306", value => value.glottalVowel.sound === "ya"],
    ["ACI-P051-L027-097671FEE2", value => value.glottalVowel.sound === "ya"],
    ["ACI-P051-L028-D5624DC1DD", value => value.glottalVowel.sound === "ya" && value.glottalIntervocalic.sound === "i"],
    ["ACI-P051-L031-10C9538B7D", value => value.glottalVowel.sound === "ya" && value.glottalIntervocalic.sound === "i"],
    ["ACI-P051-L032-84D6EBBE58", value => value.glottalIntervocalic.sound === "i"],
    ["ACI-P051-L034-FE426CEED5", value => value.mFinal.spelling === "n"],
    ["ACI-P051-L035-BC67855BC4", value => value.mFinal.sound === "n̥"],
    ["ACI-P051-L037-8EAA56F84F-02", value => value.mBeforeVowel.sound === "m"],
    ["ACI-P052-L005-D67B7A0379", value => value.yFinal.spelling === "x"],
    ["ACI-P052-L006-A594137899", value => value.yFinal.sound === "š"],
    ["ACI-P052-L008-B75C5EBB29", value => value.yAfterS.spelling === "z"],
    ["ACI-P052-L012-28B57C1184", value => value.kwFinal.spelling === "c"],
    ["ACI-P052-L013-5B3C52836A", value => value.kwFinal.sound === "k"],
    ["ACI-P052-L015-C8ECAEF1C6", value => value.tFinal.spelling === "h"],
    ["ACI-P052-L016-866D50CD91", value => value.tFinal.sound === "h"],
    ["ACI-P052-L019-3D1FA677FB", value => value.glottalNonfinal.sound === "t"],
]);

const ELISION_EXAMPLE_ATOMS = Object.freeze([
    ["ACI-P052-L022-B72E6F8124", value => value.oc.output === "c"],
    ["ACI-P052-L023-E395C0CE17", value => value.oc.output === "c"],
    ["ACI-P052-L024-D598542D29", value => value.zo.output === "z" && value.inWord.output === "n"],
    ["ACI-P052-L025-C3515708D9", value => value.ihui.output === "hui"],
    ["ACI-P052-L026-BBB86405FC", value => value.zo.output === "z" && value.inWord.output === "n"],
    ["ACI-P052-L031-9C69DED1C4", value => value.omome.output === "mōme"],
]);

function run(ctx) {
    const s = createSuite("classical_lesson2_loss_shift_elision_jobs");
    const request = (operationId, args) => ctx.executeClassicalGrammarApplicationRequest({ operationId, args });
    const lose = options => {
        const application = request("phonology:consonant-loss", [options]); const result = application.canonicalResult;
        return { authorized: application.authorizationStatus === "authorized", kind: "consonant-loss", lost: Boolean(result?.lostConsonant), side: result?.lostSide || "", sound: result?.outputSound || "", spelling: result?.outputSpelling || "", optional: result?.optional === true, nasalTrace: result?.nasalizationTrace === true };
    };
    const losses = {
        tzW: lose({ leftConsonant: "tz", rightConsonant: "w" }), chW: lose({ leftConsonant: "ch", rightConsonant: "w" }),
        glottalYH: lose({ leftConsonant: "glottal", rightConsonant: "y" }), glottalYY: lose({ leftConsonant: "glottal", rightConsonant: "y", firstConsonantLost: true }),
        nasalY: lose({ leftConsonant: "n", rightConsonant: "y" }), nasalW: lose({ leftConsonant: "m", rightConsonant: "w" }), wW: lose({ leftConsonant: "w", rightConsonant: "w" }),
    };
    const shift = options => {
        const application = request("phonology:consonant-shift", [options]); const result = application.canonicalResult;
        return { authorized: application.authorizationStatus === "authorized", kind: "consonant-shift", sound: result?.outputSound || "", spelling: result?.outputSpelling || "", optional: result?.optional === true, rare: result?.rare === true, reverts: result?.revertsToOriginalM === true };
    };
    const shifts = {
        glottalVowel: shift({ sourceConsonant: "glottal", followingVowel: "a" }),
        glottalIntervocalic: shift({ sourceConsonant: "glottal", followingVowel: "i", position: "intervocalic", intervocalicYDisappears: true }),
        mFinal: shift({ sourceConsonant: "m", position: "vocable-final" }),
        mBeforeVowel: shift({ sourceConsonant: "m", position: "vocable-final", followingVocableBeginsWithVowel: true }),
        yFinal: shift({ sourceConsonant: "y", position: "vocable-final" }), yAfterS: shift({ sourceConsonant: "y", position: "vocable-final", priorSSound: true }),
        kwFinal: shift({ sourceConsonant: "kw", position: "vocable-final" }), tFinal: shift({ sourceConsonant: "t", position: "vocable-final" }),
        glottalNonfinal: shift({ sourceConsonant: "glottal", position: "nonfinal" }),
    };
    const elide = options => {
        const application = request("phonology:vowel-elision", [options]); const result = application.canonicalResult;
        return { authorized: application.authorizationStatus === "authorized", blocked: application.authorizationStatus === "blocked", reason: result?.blockReason || "", output: result?.outputForm || "", proper: result?.properElision === true, spellingChange: result?.spellingChangeOftenNecessary === true, side: result?.elisionSide || "", literalTargetMatchesDerived: result?.literalTargetMatchesDerived !== false };
    };
    const elisions = {
        short: elide({ sourceMorpheme: "oc", targetMorpheme: "wrong", vowelLength: "short", stressGroupCombination: true }),
        long: elide({ sourceMorpheme: "ōc", targetMorpheme: "c", vowelLength: "long", stressGroupCombination: true }),
        written: elide({ sourceMorpheme: "oc", targetMorpheme: "c", vowelLength: "short", indicatedInWriting: true, stressGroupCombination: true }),
        supportive: elide({ sourceMorpheme: "ic", targetMorpheme: "c", vowelLength: "short", supportiveI: true, stressGroupCombination: true }),
        oc: elide({ sourceMorpheme: "oc", targetMorpheme: "c", vowelLength: "short", stressGroupCombination: true }),
        zo: elide({ sourceMorpheme: "zo", targetMorpheme: "z", vowelLength: "short", stressGroupCombination: true }),
        inWord: elide({ sourceMorpheme: "in", targetMorpheme: "n", vowelLength: "short", stressGroupCombination: true }),
        ihui: elide({ sourceMorpheme: "ihui", targetMorpheme: "hui", elisionSide: "initial", vowelLength: "short", stressGroupCombination: true }),
        omome: elide({ sourceMorpheme: "omōme", targetMorpheme: "mōme", elisionSide: "initial", vowelLength: "short", stressGroupCombination: true }),
    };
    const finalVowelShapes = ["a", "ā", "e", "ē", "i", "ī", "o", "ō"].map((vowel) => (
        elide({
            sourceMorpheme: `x${vowel}`,
            elisionSide: "final",
            stressGroupCombination: true,
        })
    ));
    const missingStressGroup = elide({
        sourceMorpheme: "xepa",
        elisionSide: "final",
    });
    s.ok("all allowed loss and shift rules run through the ordinary application", Object.values(losses).every(value => value.authorized) && Object.values(shifts).every(value => value.authorized));
    for (const [atomId, observes] of LOSS_ATOMS) { s.eq(`${atomId}: exact consonant-loss job`, observes(losses), true); const broken = structuredClone(losses); for (const value of Object.values(broken)) { value.kind = "broken"; value.lost = false; value.side = "broken"; value.sound = "broken"; value.spelling = "broken"; value.optional = false; value.nasalTrace = false; } s.eq(`${atomId}: changing loss behavior fails`, observes(broken), false); }
    for (const [atomId, observes] of SHIFT_ATOMS) { s.eq(`${atomId}: exact consonant-shift job`, observes(shifts), true); const broken = structuredClone(shifts); for (const value of Object.values(broken)) { value.kind = "broken"; value.sound = "broken"; value.spelling = "broken"; value.optional = false; value.rare = false; value.reverts = false; } s.eq(`${atomId}: changing shift behavior fails`, observes(broken), false); }
    for (const [atomId, observes] of ELISION_ATOMS) { s.eq(`${atomId}: exact vowel-elision job`, observes(elisions), true); const broken = structuredClone(elisions); for (const value of Object.values(broken)) { value.authorized = false; value.blocked = false; value.reason = "broken"; value.output = "broken"; value.proper = true; value.spellingChange = false; } s.eq(`${atomId}: changing elision behavior fails`, observes(broken), false); }
    for (const [atomId, observes] of LOSS_EXAMPLE_ATOMS) { s.eq(`${atomId}: exact automatic loss example`, observes(losses), true); const broken = structuredClone(losses); for (const value of Object.values(broken)) { value.authorized = false; value.sound = "broken"; value.spelling = "broken"; value.nasalTrace = false; } s.eq(`${atomId}: breaking the automatic loss rule fails`, observes(broken), false); }
    for (const [atomId, observes] of SHIFT_EXAMPLE_ATOMS) { s.eq(`${atomId}: exact automatic shift example`, observes(shifts), true); const broken = structuredClone(shifts); for (const value of Object.values(broken)) { value.authorized = false; value.sound = "broken"; value.spelling = "broken"; value.reverts = false; } s.eq(`${atomId}: breaking the automatic shift rule fails`, observes(broken), false); }
    for (const [atomId, observes] of ELISION_EXAMPLE_ATOMS) { s.eq(`${atomId}: exact automatic elision example`, observes(elisions), true); const broken = structuredClone(elisions); for (const value of Object.values(broken)) { value.authorized = false; value.output = "broken"; } s.eq(`${atomId}: breaking the automatic elision rule fails`, observes(broken), false); }
    s.eq("unlisted final-vowel Source shapes use the same typed edge rule", finalVowelShapes.map((value) => [value.authorized, value.reason, value.output, value.side]), [
        [true, "", "x", "final"],
        [false, "long-vowel-resists-elision", "", "final"],
        [true, "", "x", "final"],
        [false, "long-vowel-resists-elision", "", "final"],
        [true, "", "x", "final"],
        [false, "long-vowel-resists-elision", "", "final"],
        [true, "", "x", "final"],
        [false, "long-vowel-resists-elision", "", "final"],
    ]);
    s.eq("a literal target cannot authorize or rewrite the productive edge rule", [
        elisions.short.authorized,
        elisions.short.output,
        elisions.short.literalTargetMatchesDerived,
    ], [true, "c", false]);
    s.eq("stress-group environment must be explicit Source information", [
        missingStressGroup.authorized,
        missingStressGroup.reason,
    ], [false, "not-set-stress-group-combination"]);
    return s;
}

module.exports = { run };
