"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const PARTICLES = Object.freeze({
    "l3-o-interjection": ["o", "o", ["huh", "really", "is that a fact", "oh", "ouch", "hey"]],
    "l3-e-vocative": ["#e", "é", ["O", "Hey"]],
    "l3-a": ["a", "a", ["alas"]],
    "l3-ax": ["ax + ax", "ax ax", ["alas", "ouch", "ow"]],
    "l3-hue": ["hue", "hue", ["alas"]],
    "l3-hueya": ["hueya", "hueya", ["alas"]],
    "l3-yahua": ["yahua", "yahua", ["alas"]],
    "l3-ihyo": ["ihyo", "ihyo", ["woe", "alas"]],
    "l3-no-interjection": ["nō", "nō", ["woe", "alas"]],
    "l3-auh-interjection": ["āuh", "āuh", ["good", "so"]],
    "l3-hui": ["hui", "hui", ["wow", "holy smoke", "gracious"]],
    "l3-elele": ["elele", "elele", ["ow", "ouch", "oh"]],
    "l3-elele-ay": ["elele + ay + ay + ay", "elele ay ay ay", ["ow", "ouch", "oh"]],
    "l3-ahcua": ["ahcua", "ahcua", ["ouch", "oh"]],
    "l3-ye-ye": ["ye + ye", "ye ye", ["aha"]],
    "l3-ih-i": ["ih + i", "ih i", ["aha"]],
    "l3-yeya": ["yeya", "yeya", ["aha"]],
    "l3-xi": ["xi", "xi", ["psst", "hush"]],
    "l3-xiuh": ["xiuh", "xiuh", ["shoo"]],
    "l3-iye": ["iye", "iye", ["yes"]],
    "l3-ahzo": ["ah# + zo", "ahzo", ["perhaps"]],
    "l3-ma-cazo": ["mā + ca# + zo", "mā cazo", ["if only perhaps", "since", "inasmuch as"]],
    "l3-ahtel": ["ah# + tēl", "ahtēl?", ["is it not clear", "it cannot be otherwise"]],
    "l3-aya": ["ah# + ye", "aya", ["not yet"]],
    "l3-ma-caye": ["mā + ca# + ye", "mā caye", ["if only not yet"]],
    "l3-ma-caya": ["mā + ca# + ya", "mā caya", ["if only not yet"]],
    "l3-ahoc": ["ah# + oc", "ahoc", ["no longer", "not any more", "not another"]],
    "l3-ayoc": ["ah# + yoc", "ayoc", ["no longer", "not any more", "not another"]],
    "l3-aoc": ["ah# + oc", "aoc", ["no longer", "not any more", "not another"]],
    "l3-ma-caoc": ["mā + ca# + oc", "mā caoc", ["if only no longer"]],
    "l3-ahno": ["ah# + nō", "ahnō", ["not also", "neither", "not either", "nor"]],
    "l3-ma-cano": ["mā + ca# + nō", "mā canō", ["if only not also", "if only neither"]],
    "l3-in-tla": ["in + tlā", "in tlā", ["if"]],
    "l3-in-tla-ca": ["in + tlā + ca#", "in tlā ca", ["if not"]],
    "l3-in-tla-zan": ["in + tlā + zan", "in tlā zan", ["and if", "if only", "if just"]],
    "l3-in-tla-za": ["in + tlā + zā", "in tlā zā", ["and if", "and if still", "but if now only"]],
    "l3-in-aya": ["in + aya", "in aya", ["before"]],
    "l3-in-tla-no-zo": ["in + tlā + no + zo", "in tlā no zo", ["and if perhaps", "by chance", "maybe", "but if"]],
    "l3-no-zo": ["no + zo", "no zo", ["either"]],
    "l3-ahno-zo": ["ah# + no + zo", "ahno zo", ["neither"]],
    "l3-ma-cano-zo": ["mā + ca# + no + zo", "mā cano zo", ["if only neither"]],
    "l3-no-zan": ["no + zan", "no zan", ["still", "up until now"]],
    "l3-za-zo": ["zā + zo", "zā zo", ["-ever", "no matter", "any"]],
    "l3-ahza-zo": ["ahzā + zo", "ahzā zo", ["perhaps", "maybe"]],
    "l3-ahza-zo-oc": ["ahzā + zo + oc", "ahzā zo oc", ["perhaps still", "perhaps another"]],
    "l3-ma-za-zo": ["mā + zā + zo", "mā zā zo", ["be that as it may", "regardless"]],
    "l3-za-zan": ["zā + zan", "zā zan", ["any which way", "foolishly", "nonsensically"]],
    "l3-zan-no": ["zan + no", "zan no", ["likewise", "by the same token", "similarly"]],
    "l3-zan-ye-no": ["zan + ye + no", "zan ye no", ["likewise", "by the same token", "similarly"]],
    "l3-ahzo-za": ["ahzo + zā", "ahzo zā", ["perhaps", "maybe", "possibly"]],
    "l3-ahzo-zan": ["ahzo + zan", "ahzo zan", ["perhaps", "maybe", "possibly"]],
    "l3-ahzo-ah": ["ah# + zo + ah#", "ahzo ah", ["perhaps not"]],
    "l3-ahzo-ma": ["ahzo + mā", "ahzo mā", ["perhaps"]],
    "l3-oc-no": ["oc + nō", "oc nō", ["and moreover", "and also", "similarly"]],
    "l3-za-oc-no": ["zā + oc + nō", "zā oc nō", ["even more so", "furthermore"]],
    "l3-auh-in-tla": ["auh + in + tlā", "auh in tlā", ["and if"]],
    "l3-auh-in-tla-ca": ["auh + in + tlā + ca#", "auh in tlā ca", ["and if not"]],
    "l3-ma-tel": ["mā + tēl", "mā tēl", ["let it nevertheless be", "maybe it will be for the best"]],
    "l3-ma-zo": ["mā + zo", "mā zo", ["even if", "even though", "although"]],
    "l3-ma-zo-tel": ["mā + zo + tēl", "mā zo tēl", ["supposing that", "let us assume that"]],
    "l3-ihyo-ma": ["ihyo + mā + ...", "ihyo mā ... !", ["oh if only"]],
    "l3-ihyo-iyahua": ["ihyo + iyahua", "ihyo iyahua!", ["oh woe"]],
    "l3-ahca-zo": ["ahca + zo", "ahca zo", ["perhaps", "maybe"]],
    "l3-ahzo-ca": ["ahzo + ca", "ahzo ca", ["perhaps", "maybe"]],
    "l3-ahca-zo-ah": ["ah + ca + zo + ah#", "ahca zo ah", ["perhaps not", "maybe not"]],
    "l3-ahzo-ca-ah": ["ah# + zo + ca + ah#", "ahzo ca ah", ["perhaps not", "maybe not"]],
});

const ATOM_PARTICLES = Object.freeze({
    "ACI-P056-L038-AE8309CDD9": ["l3-o-interjection"],
    "ACI-P056-L039-564D7EA4ED": ["l3-o-interjection"],
    "ACI-P056-L040-9F2DD2E0DF": ["l3-e-vocative"],
    "ACI-P056-L040-9F2DD2E0DF-02": ["l3-e-vocative"],
    "ACI-P056-L040-9F2DD2E0DF-03": ["l3-e-vocative"],
    "ACI-P056-L040-9F2DD2E0DF-04": ["l3-e-vocative"],
    "ACI-P056-L040-9F2DD2E0DF-05": ["l3-e-vocative"],
    "ACI-P056-L040-9F2DD2E0DF-06": ["l3-e-vocative"],
    "ACI-P057-L005-1DF84143A6": ["l3-a"],
    "ACI-P057-L006-92D7836223": ["l3-ax"],
    "ACI-P057-L008-F1D2F3418D": ["l3-hue", "l3-hueya", "l3-yahua"],
    "ACI-P057-L009-5312507A59": ["l3-ihyo"],
    "ACI-P057-L011-FB997EC204": ["l3-no-interjection"],
    "ACI-P057-L012-D8A4648B18": ["l3-auh-interjection"],
    "ACI-P057-L012-D8A4648B18-02": ["l3-auh-interjection"],
    "ACI-P057-L013-FA99B1ACAC": ["l3-hui"],
    "ACI-P057-L014-C232C17AC1": ["l3-elele", "l3-elele-ay"],
    "ACI-P057-L015-B24CCD4EC4": ["l3-ahcua"],
    "ACI-P057-L016-0AE2D09B52": ["l3-ye-ye", "l3-ih-i", "l3-yeya"],
    "ACI-P057-L017-CD7A87DD0D": ["l3-xi"],
    "ACI-P057-L018-3BDB784FC1": ["l3-xiuh"],
    "ACI-P057-L019-D544D192EC": ["l3-iye"],
    "ACI-P057-L028-BF30A613C1": ["l3-ahzo"],
    "ACI-P057-L029-7BD2A9799E": ["l3-ma-cazo"],
    "ACI-P057-L029-7BD2A9799E-02": ["l3-ma-cazo"],
    "ACI-P057-L030-5805FF54ED": ["l3-ahtel"],
    "ACI-P057-L031-A74FD68C61": ["l3-aya"],
    "ACI-P057-L032-02952202B2": ["l3-ma-caye"],
    "ACI-P057-L032-33DFD92099": ["l3-ma-caya"],
    "ACI-P057-L033-50DA5EDEC8": ["l3-ahoc", "l3-ayoc", "l3-aoc"],
    "ACI-P057-L034-E19CB3D97E": ["l3-ma-caoc"],
    "ACI-P057-L036-B4C74714FB": ["l3-ahno"],
    "ACI-P057-L037-22B42E90A8": ["l3-ma-cano"],
    "ACI-P058-L015-7ADA1F848A": ["l3-in-tla"],
    "ACI-P058-L016-22F3013609": ["l3-in-tla-ca"],
    "ACI-P058-L016-8256F545E5": ["l3-in-tla-ca"],
    "ACI-P058-L019-8CE99FCFDA": ["l3-in-tla-zan"],
    "ACI-P058-L020-4835B3189A": ["l3-in-tla-za"],
    "ACI-P058-L020-4835B3189A-02": ["l3-in-tla-za"],
    "ACI-P058-L020-4835B3189A-03": ["l3-in-tla-za"],
    "ACI-P058-L020-4835B3189A-04": ["l3-in-tla-za"],
    "ACI-P058-L020-4835B3189A-05": ["l3-in-tla-za"],
    "ACI-P058-L021-9EAF8D91D6": ["l3-in-aya"],
    "ACI-P058-L022-C370B709CC": ["l3-in-tla-no-zo"],
    "ACI-P058-L025-B7FF1E5CA5": ["l3-no-zo"],
    "ACI-P058-L026-C5DDB29CF8": ["l3-ahno-zo"],
    "ACI-P058-L027-9F98D48BC5": ["l3-ma-cano-zo"],
    "ACI-P058-L028-DAD27A5927": ["l3-no-zan", "l3-za-zo", "l3-ahza-zo"],
    "ACI-P058-L030-1F8C08D5AE": ["l3-ahza-zo"],
    "ACI-P058-L031-1AAD1ECA40": ["l3-ahza-zo-oc"],
    "ACI-P058-L032-2FD6AC4CBA": ["l3-ma-za-zo"],
    "ACI-P058-L033-390330D08C": ["l3-za-zan"],
    "ACI-P058-L033-F62ECD4EB3": ["l3-za-zan"],
    "ACI-P058-L033-78915222C5": ["l3-za-zan"],
    "ACI-P058-L035-E6E44F6A1C": ["l3-zan-no"],
    "ACI-P058-L036-E4FBCE59CB": ["l3-zan-ye-no"],
    "ACI-P058-L037-20ACE3DE58": ["l3-ahzo-za"],
    "ACI-P058-L038-79A1482151": ["l3-ahzo-zan"],
    "ACI-P058-L039-C9FE6FC0C8": ["l3-ahzo-ah"],
    "ACI-P058-L040-5078A1255B": ["l3-ahzo-ma"],
    "ACI-P058-L041-F9F188CF97": ["l3-oc-no"],
    "ACI-P058-L041-F9F188CF97-02": ["l3-oc-no"],
    "ACI-P059-L002-E318DA0E85": ["l3-za-oc-no"],
    "ACI-P059-L004-9BC0D1603D": ["l3-auh-in-tla"],
    "ACI-P059-L005-1C893EDF52": ["l3-auh-in-tla-ca"],
    "ACI-P059-L006-58024209BB": ["l3-ma-tel"],
    "ACI-P059-L006-58024209BB-02": ["l3-ma-tel"],
    "ACI-P059-L006-0D1731BD90": ["l3-ma-tel"],
    "ACI-P059-L008-9F2D77B77A": ["l3-ma-zo"],
    "ACI-P059-L009-C501C360B1": ["l3-ma-zo-tel"],
    "ACI-P059-L010-41CAD89B37": ["l3-ihyo-ma"],
    "ACI-P059-L011-4D093ADEBC": ["l3-ihyo-iyahua"],
    "ACI-P059-L014-084C4A984E": ["l3-ahca-zo"],
    "ACI-P059-L015-56DD8F5A6B": ["l3-ahzo-ca"],
    "ACI-P059-L016-1FD716B5A2": ["l3-ahca-zo-ah"],
    "ACI-P059-L016-29C88418FB": ["l3-ahca-zo-ah"],
    "ACI-P059-L017-0900C585EE": ["l3-ahzo-ca-ah"],
    "ACI-P059-L017-9EABC66B4A": ["l3-ahzo-ca-ah"],
});

function run(ctx = {}) {
    const s = createSuite("classical_lesson3_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.resolve(
        __dirname, "../../docs/canvas-progress/lesson3-review-ledger.json"
    ), "utf8"));
    const groupIds = new Set([
        "lesson3-interjections-and-vocative",
        "lesson3-negative-particle-prefixes",
        "lesson3-particle-collocations",
    ]);
    const records = ledger.records.filter((record) =>
        groupIds.has(record.reviewGroupId) && record.proposedDirection === "BOTH");
    const observations = new Map();
    const particleObservation = (particleId) => {
        const result = ctx.requestClassicalParticleResult(particleId);
        return [result.formula, result.surface, result.lexicalFactFrame?.meanings || []];
    };
    for (const [atomId, particleIds] of Object.entries(ATOM_PARTICLES)) {
        observations.set(atomId, particleIds.flatMap(particleObservation));
    }
    const functional = Object.fromEntries(ctx.getClassicalNahuatlFunctionalClassRules()
        .map((rule) => [rule.id, rule]));
    const negative = Object.fromEntries(ctx.getClassicalNahuatlNegativizingParticleRules()
        .map((rule) => [rule.id, rule]));
    const collocation = Object.fromEntries(ctx.getClassicalNahuatlParticleCollocationRules()
        .map((rule) => [rule.id, rule]));
    const negativeSelection = (precedingParticleId = "", sentenceKind = "statement") => {
        const frame = ctx.requestClassicalNegativeParticleSelection({
            polarity: "negative", precedingParticleId, sentenceKind,
        });
        return [frame.authorizationStatus, frame.selectedParticleId, frame.formula,
            frame.selectionRule, frame.userSelectableAllomorph];
    };
    const nuclearResult = ctx.requestClassicalVncSentenceResultFrame(
        ctx.evaluateClassicalNahuatlVncApplication({
            sourceStem: "nemi", verbClass: "B", sourceValence: "intransitive",
            subject: "3sg", requestedDerivation: "direct", requestedVoice: "active",
            mood: "indicative", tense: "present", outputScope: "single",
        })
    );
    const standaloneInterjection = ctx.requestClassicalSentenceParticleFrame({
        particleId: "l3-o-interjection", nuclearResultFrame: nuclearResult,
    });
    const vocative = ctx.requestClassicalParticleResult("l3-e-vocative");
    const vocativeProfile = vocative.lexicalFactFrame.vocativeProfile;
    const ax = ctx.requestClassicalParticleResult("l3-ax");
    const femaleNo = ctx.requestClassicalParticleResult("l3-no-interjection", {
        speakerGender: "female",
    });
    const maleNo = ctx.requestClassicalParticleResult("l3-no-interjection", {
        speakerGender: "male",
    });
    const ruleObservations = new Map([
        ["ACI-P056-L037-DCC9E4187C", [
            functional["classical-interjection-independent-utterance-distribution"].mostCanOccurAlone,
            standaloneInterjection.authorizationStatus,
            standaloneInterjection.sentenceSurfaceDisplay,
            standaloneInterjection.independentUtterance,
        ]],
        ["ACI-P056-L040-9F2DD2E0DF-02", [
            ctx.requestClassicalParticleResult("l3-e-vocative", { speakerGender: "male" }).authorizationStatus,
            ctx.requestClassicalParticleResult("l3-e-vocative", { speakerGender: "female" }).authorizationStatus,
        ]],
        ["ACI-P056-L040-9F2DD2E0DF-03", [vocativeProfile.attachmentHost, vocativeProfile.pronunciationAttachment, vocativeProfile.writingAttachment]],
        ["ACI-P056-L040-9F2DD2E0DF-04", [vocativeProfile.stressBehavior]],
        ["ACI-P056-L040-9F2DD2E0DF-05", [vocative.surface, vocativeProfile.writtenStressAccent]],
        ["ACI-P056-L040-9F2DD2E0DF-06", [vocative.formula, vocativeProfile.boundaryNotation]],
        ["ACI-P057-L006-92D7836223", [
            ax.formula,
            ax.surface,
            ax.contextualRealizationFrame.variants.map((variant) => variant.writtenSurface),
        ]],
        ["ACI-P057-L011-FB997EC204", [femaleNo.authorizationStatus, maleNo.authorizationStatus, femaleNo.lexicalFactFrame.speakerProfile.requiredSpeakerGender]],
        ["ACI-P057-L020-0F1964812D", [negative["cn-l3-33-negative-particle-set"].forms]],
        ["ACI-P057-L021-F8C9506BBB", [negative["cn-l3-33-prefixal-adverbs"].attachment]],
        ["ACI-P057-L022-769ED90A06", [negative["cn-l3-33-negative-prefixes-attach-to-particles"].attachmentTargets]],
        ["ACI-P057-L023-C7FBC7F91A", [negative["cn-l3-33-ca-complementary-distribution"].caLicensedAfter]],
        ["ACI-P057-L023-C7FBC7F91A-02", [...negativeSelection("l3-ma"), ...negativeSelection("l3-tla")]],
        ["ACI-P057-L023-C7FBC7F91A-03", negativeSelection("l3-mah")],
        ["ACI-P057-L023-C7FBC7F91A-04", negativeSelection()],
        ["ACI-P057-L023-C7FBC7F91A-05", negativeSelection("l3-ma", "admonition")],
        ["ACI-P057-L038-0BB63A8964", [negative["cn-l3-33-solid-segmentation-violates-prefix-relation"].traditionalSolidSegmentationAuthorized]],
        ["ACI-P057-L039-3B4C9CC5D8", [negative["cn-l3-33-solid-segmentation-violates-prefix-relation"].rule]],
        ["ACI-P057-L041-001BD32072", [negative["cn-l3-33-ca-written-as-prefix"].rule]],
        ["ACI-P058-L002-6F48A55A15", [negative["cn-l3-33-clause-ca-negative-ca-distinction"].identities]],
        ["ACI-P058-L004-E971998280", [collocation["cn-l3-34-sequence"].rule]],
        ["ACI-P058-L005-35AF28C994", [collocation["cn-l3-34-fixed-order"].rule]],
        ["ACI-P058-L005-354F71BA15", [collocation["cn-l3-34-lexicalized-unit"].lexicalizationPossible, collocation["cn-l3-34-lexicalized-unit"].compositionalMeaningRequired]],
        ["ACI-P058-L007-B2FEBA3551", [collocation["cn-l3-34-stress-group"].normalProsodicUnit]],
        ["ACI-P058-L009-85D2B09AFF", [collocation["cn-l3-34-written-separately"].rule]],
        ["ACI-P058-L009-722041D90B", [collocation["cn-l3-34-nonfinal-no-shortening"].output, ...particleObservation("l3-no-zo")]],
        ["ACI-P058-L009-48810DDA3B", [collocation["cn-l3-34-nonfinal-no-shortening"].context]],
        ["ACI-P058-L012-5952A2206A", [collocation["cn-l3-34-adjunctor-in-optional"].particleId || "l3-in", collocation["cn-l3-34-adjunctor-in-optional"].rule]],
        ["ACI-P058-L013-A6432D783C", [collocation["cn-l3-34-in-subordinates-following-material"].scope]],
        ["ACI-P059-L012-C18B0D1531", [collocation["cn-l3-34-collocational-ca-scope"].collocationalCaEquivalentTo]],
        ["ACI-P059-L012-8C4A02A648", [collocation["cn-l3-34-collocational-ca-scope"].licensedCoMembers]],
        ["ACI-P059-L006-0D1731BD90", [ctx.requestClassicalParticleResult("l3-ma-tel").lexicalFactFrame.usageFacts]],
    ]);
    for (const [atomId, observation] of ruleObservations) observations.set(atomId, observation);

    const expectedRules = new Map([
        ["ACI-P056-L037-DCC9E4187C", [true, "authorized", "O", true]],
        ["ACI-P056-L040-9F2DD2E0DF-02", ["authorized", "blocked"]],
        ["ACI-P056-L040-9F2DD2E0DF-03", ["preceding-nominal-nuclear-clause", "obligatory", "obligatory"]],
        ["ACI-P056-L040-9F2DD2E0DF-04", ["attracts-stress"]],
        ["ACI-P056-L040-9F2DD2E0DF-05", ["é", "required-unique-item"]],
        ["ACI-P056-L040-9F2DD2E0DF-06", ["#e", "hash-marks-obligatory-attachment-to-preceding-item"]],
        ["ACI-P057-L006-92D7836223", ["ax + ax", "ax ax", ["ax ax ax"]]],
        ["ACI-P057-L011-FB997EC204", ["authorized", "blocked", "female"]],
        ["ACI-P057-L020-0F1964812D", [["ah#", "ca#"]]],
        ["ACI-P057-L021-F8C9506BBB", ["bound-to-following"]],
        ["ACI-P057-L022-769ED90A06", [["particle", "other-right-hand-item"]]],
        ["ACI-P057-L023-C7FBC7F91A", [["ma", "tla", "mah"]]],
        ["ACI-P057-L023-C7FBC7F91A-02", ["authorized", "l3-ca-negative", "ca#", "ca-after-ma-tla-or-mah", false, "authorized", "l3-ca-negative", "ca#", "ca-after-ma-tla-or-mah", false]],
        ["ACI-P057-L023-C7FBC7F91A-03", ["authorized", "l3-ca-negative", "ca#", "ca-after-ma-tla-or-mah", false]],
        ["ACI-P057-L023-C7FBC7F91A-04", ["authorized", "l3-ah-negative", "ah#", "ah-elsewhere", false]],
        ["ACI-P057-L023-C7FBC7F91A-05", ["authorized", "l3-ah-negative", "ah#", "ah-after-ma-in-admonition", false]],
        ["ACI-P057-L038-0BB63A8964", [false]],
        ["ACI-P057-L039-3B4C9CC5D8", ["Joining ca to the preceding particle misrepresents its prefixal relation to following material."]],
        ["ACI-P057-L041-001BD32072", ["Traditional solid spelling is not authority; ca# remains a prefixal particle in the proof frame."]],
        ["ACI-P058-L002-6F48A55A15", [["l3-ca", "l3-ca-negative"]]],
        ["ACI-P058-L004-E971998280", ["A collocation is a sequence of two or more particles."]],
        ["ACI-P058-L005-35AF28C994", ["Lesson 3 collocation output must preserve the witnessed particle order."]],
        ["ACI-P058-L005-354F71BA15", [true, false]],
        ["ACI-P058-L007-B2FEBA3551", ["stress-group"]],
        ["ACI-P058-L009-85D2B09AFF", ["Classical output keeps collocation members separate even when traditional spelling writes them solid."]],
        ["ACI-P058-L009-722041D90B", ["no", "no + zo", "no zo", ["either"]]],
        ["ACI-P058-L009-48810DDA3B", ["nonfinal-collocation-member"]],
        ["ACI-P058-L012-5952A2206A", ["l3-in", "Initial in is collocation-member authority and does not itself build the subordinate clause."]],
        ["ACI-P058-L013-A6432D783C", ["following-adjoined-material"]],
        ["ACI-P059-L012-C18B0D1531", ["zā"]],
        ["ACI-P059-L012-8C4A02A648", [["ah#", "zo"]]],
        ["ACI-P059-L006-0D1731BD90", [["dilemma-response collocation"]]],
    ]);

    s.eq("accepted writing atoms in Groups 7-9 have one exact observation", {
        expected: records.length,
        observed: observations.size,
        missing: records.filter((record) => !observations.has(record.atomId)).map((record) => record.atomId),
    }, { expected: 102, observed: 102, missing: [] });
    for (const record of records) {
        const actual = observations.get(record.atomId);
        const particleIds = ATOM_PARTICLES[record.atomId] || [];
        const expected = expectedRules.has(record.atomId)
            ? expectedRules.get(record.atomId)
            : particleIds.flatMap((particleId) => PARTICLES[particleId]);
        s.eq(`${record.atomId} observes its accepted grammar job`, actual, expected);
        const broken = JSON.parse(JSON.stringify(actual));
        broken[broken.length - 1] = "BROKEN_GRAMMAR_BEHAVIOR";
        s.no(`${record.atomId} rejects its relevant behavior when broken`,
            JSON.stringify(broken) === JSON.stringify(expected));
    }

    const uiEntries = ctx.getClassicalNahuatlSentenceParticleEntries();
    s.eq("normal application choices include the licensed new Lesson 3 work", {
        interjections: uiEntries.filter((entry) => entry.functionScope === "interjection").length,
        negativeExpressions: uiEntries.filter((entry) => entry.functionScope === "negation").map((entry) => entry.id),
        collocations: uiEntries.filter((entry) => entry.functionScope === "collocation").length,
        rawPredictableNegativesExposed: uiEntries.filter((entry) => ["l3-ah-negative", "l3-ca-negative"].includes(entry.id)).map((entry) => entry.id),
    }, {
        interjections: 19,
        negativeExpressions: ["l3-ahzo", "l3-ma-cazo", "l3-ahtel", "l3-aya", "l3-ma-caye", "l3-ma-caya", "l3-ahoc", "l3-ayoc", "l3-aoc", "l3-ma-caoc", "l3-ahno", "l3-ma-cano"],
        collocations: 34,
        rawPredictableNegativesExposed: [],
    });
    return s;
}

module.exports = { run };
