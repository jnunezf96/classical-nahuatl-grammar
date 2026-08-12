"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_lesson2_vowel_sonorant_jobs");
    const request = (operationId, args) =>
        ctx.executeClassicalGrammarApplicationRequest({ operationId, args });
    const realize = options => request("phonology:segment-realization", [options]);
    const transcribe = segments => {
        const source = ctx.buildClassicalNahuatlTranscriptionSourceFrame({
            constituents: [{ segments }],
        });
        return request("orthography:transcription", [source]);
    };
    const result = options => realize(options).canonicalResult;
    const authorized = options => realize(options).authorizationStatus === "authorized";
    const blocked = options => realize(options).authorizationStatus === "blocked";
    const exact = (atomId, observed, broken) => {
        s.eq(`${atomId}: the normal application performs the exact job`, observed, true);
        s.eq(`${atomId}: changing the required behavior fails`, broken, false);
    };

    const inventory = transcribe(["a", "ā", "e", "ē", "i", "ī", "o", "ō"])
        .canonicalResult.carrierFrame;
    const vowelCarriers = inventory.vowelCarriers;
    const consonantCarriers = inventory.consonantCarriers;
    const systemFacts = inventory.vowelSystemFacts;

    exact("ACI-P040-L014-ADEC9EA5BA",
        [["a", "ā"], ["e", "ē"], ["i", "ī"], ["o", "ō"]]
            .every(([short, long]) => vowelCarriers[short].lengthPair === long
                && vowelCarriers[long].lengthPair === short),
        vowelCarriers.a.lengthPair === "e");
    exact("ACI-P040-L019-FC803B7069",
        Object.values(vowelCarriers).every(carrier => carrier.phones.length >= 2),
        Object.values(vowelCarriers).every(carrier => carrier.phones.length < 2));
    exact("ACI-P040-L023-C01CE1CCD4",
        systemFacts.mostVowelPhonemesHaveAdditionalPhones === true,
        systemFacts.mostVowelPhonemesHaveAdditionalPhones === false);
    exact("ACI-P040-L025-9DA46515D8",
        authorized({ segment: "a", phone: "a", position: "vocable-initial", realizationClass: "full" })
            && authorized({ segment: "ā", phone: "a:", position: "vocable-medial", realizationClass: "full" }),
        authorized({ segment: "ā", phone: "a:", position: "vocable-final", realizationClass: "full" }));
    exact("ACI-P040-L026-0DC2748F9B",
        authorized({ segment: "a", phone: "a", position: "vocable-final", realizationClass: "reduced-short" })
            && blocked({ segment: "ā", phone: "a:", position: "vocable-final", realizationClass: "full" }),
        authorized({ segment: "a", phone: "a", position: "vocable-medial", realizationClass: "reduced-short" }));
    exact("ACI-P040-L027-FCF284FAA9",
        result({ segment: "ō", phone: "o·", position: "vocable-medial", realizationClass: "reduced-long" }).outputSpelling === "o",
        result({ segment: "ō", phone: "o·", position: "vocable-medial", realizationClass: "full" }).outputSpelling === "o");

    const deletionFinal = { segment: "ā", phone: "a:", position: "vocable-final", realizationClass: "full", finalLicense: "ephemeral-source-final-vowel-deleted-by-morphology" };
    const caFinal = { segment: "ā", phone: "a:", position: "vocable-final", realizationClass: "full", finalLicense: "adverbialized-nominal-final-ca" };
    const ceFinal = { segment: "ē", phone: "e:", position: "vocable-final", realizationClass: "full", finalLicense: "licensed-monosyllabic-vocable", vocable: "cē" };
    exact("ACI-P040-L032-E41AC9D0AC", authorized(deletionFinal), authorized({ ...deletionFinal, finalLicense: "" }));
    exact("ACI-P040-L032-1D7BCC5D92", authorized(deletionFinal), authorized({ ...deletionFinal, finalLicense: "unlicensed-deletion" }));
    exact("ACI-P040-L035-7F8DE8FC07", authorized(caFinal), authorized({ ...caFinal, finalLicense: "" }));
    exact("ACI-P040-L036-921E01756F", authorized(ceFinal), authorized({ ...ceFinal, vocable: "ne" }));
    exact("ACI-P040-L036-921E01756F-02",
        ["cē", "tlā", "mā", "zā", "nō"].every(vocable => systemFacts.licensedMonosyllabicFullLongFinalVocables.includes(vocable)),
        systemFacts.licensedMonosyllabicFullLongFinalVocables.includes("amo"));
    const beforeGlottal = { segment: "ā", phone: "a", position: "vocable-medial", environment: "before-glottal-stop", realizationClass: "full" };
    exact("ACI-P040-L038-0AA640AA81", authorized(beforeGlottal) && result(beforeGlottal).outputSpelling === "a", authorized({ ...beforeGlottal, environment: "" }));
    exact("ACI-P040-L038-8C88669247", authorized(beforeGlottal), authorized({ ...beforeGlottal, environment: "before-p" }));

    const repertoireChecks = [
        ["ACI-P041-L002-78798DC5FC", "a", ["a", "ã", "e", "ẽ"]],
        ["ACI-P041-L003-48A7223707", "ā", ["a:", "a·", "a", "e:", "e·", "e"]],
        ["ACI-P041-L009-E5AD8FE012", "e", ["e", "ẽ", "i", "a"]],
        ["ACI-P041-L010-B352453433", "ē", ["e:", "e·", "e", "i:"]],
        ["ACI-P041-L016-DA8C78CE97", "i", ["i", "ĩ"]],
        ["ACI-P041-L017-0C157E8D2C", "ī", ["i:", "i·", "i"]],
        ["ACI-P041-L020-B5F8BE761D", "o", ["o", "õ", "u"]],
        ["ACI-P041-L021-915EC47ED6", "ō", ["o:", "o·", "o", "u:", "u"]],
    ];
    for (const [atomId, segment, phones] of repertoireChecks) {
        exact(atomId,
            JSON.stringify(vowelCarriers[segment].phones) === JSON.stringify(phones),
            JSON.stringify(vowelCarriers[segment].phones) === JSON.stringify([...phones].reverse()));
    }

    const raisedA = { segment: "a", phone: "e", position: "vocable-medial", realizationClass: "full", lexicalVariantLicensed: true };
    exact("ACI-P041-L004-E95528412D", authorized(raisedA), authorized({ ...raisedA, lexicalVariantLicensed: false }));
    exact("ACI-P041-L005-C43BD63F9E", authorized(beforeGlottal), authorized({ ...beforeGlottal, environment: "before-k" }));
    const raisedE = { segment: "e", phone: "i", position: "vocable-medial", realizationClass: "full", lexicalVariantLicensed: true };
    exact("ACI-P041-L011-0D176C149F", authorized(raisedE), authorized({ ...raisedE, lexicalVariantLicensed: false }));
    const loweredE = { segment: "e", phone: "a", position: "vocable-medial", realizationClass: "full", lexicalVariantLicensed: true, spellingReflectsVariant: true };
    exact("ACI-P041-L012-FA117920E0", result(loweredE).variantStatus === "rare-lexical" && result(loweredE).outputSpelling === "a", authorized({ ...loweredE, lexicalVariantLicensed: false }));
    exact("ACI-P041-L012-FA117920E0-02", result({ ...loweredE, vocable: "aucxoā" }).outputSpelling === "a", result({ ...loweredE, lexicalVariantLicensed: false }).outputSpelling === "a");
    exact("ACI-P041-L012-FA117920E0-03", authorized({ ...loweredE, variantId: "ya", vocable: "aya" }), authorized({ ...loweredE, variantId: "ya", vocable: "ye" }));
    exact("ACI-P041-L012-FA117920E0-04", authorized({ ...loweredE, variantId: "ya", vocable: "aya" }), authorized({ ...loweredE, variantId: "ya", vocable: "yaya" }));

    const raisedOEnvironments = ["before-consonant-cluster", "before-vocable-final-lateral-affricate", "before-possessive-number-final-voiceless-w", "before-continuant"];
    exact("ACI-P041-L023-A9E8878B46", raisedOEnvironments.every(environment => authorized({ segment: "o", phone: "u", position: "vocable-medial", environment })), authorized({ segment: "o", phone: "u", position: "vocable-medial", environment: "unlicensed" }));
    exact("ACI-P041-L027-483A400CB1", blocked({ segment: "o", phone: "u", position: "vocable-medial", environment: "before-continuant", prefix: true }), authorized({ segment: "o", phone: "u", position: "vocable-medial", environment: "before-continuant", prefix: true }));
    exact("ACI-P041-L028-D0711ABC8B", raisedOEnvironments.every(environment => result({ segment: "o", phone: "u", position: "vocable-medial", environment }).outputSound === "u"), result({ segment: "o", phone: "u", position: "vocable-medial", environment: "unlicensed" }).outputSound === "u");
    exact("ACI-P041-L034-80C5D44F54", result({ segment: "ō", phone: "o·", position: "vocable-medial", realizationClass: "reduced-long" }).outputSpelling === "o", result({ segment: "ō", phone: "o:", position: "vocable-medial", realizationClass: "full" }).outputSpelling === "o");

    const words = {
        achtli: transcribe(["a", "/č/", "/λ/", "i"]).canonicalResult.surface,
        aachtli: transcribe(["ā", "/č/", "/λ/", "i"]).canonicalResult.surface,
        xihuitl: transcribe(["/š/", "i", "/w/", "i", "/λ/"]).canonicalResult.surface,
        metztli: transcribe(["/m/", "e", "/¢/", "/λ/", "i"]).canonicalResult.surface,
        quitoca: transcribe(["/k/", "i", "/t/", "o", "/k/", "a"]).canonicalResult.surface,
        xiihuitl: transcribe(["/š/", "ī", "/w/", "i", "/λ/"]).canonicalResult.surface,
        meetztli: transcribe(["/m/", "ē", "/¢/", "/λ/", "i"]).canonicalResult.surface,
        quitooka: transcribe(["/k/", "i", "/t/", "ō", "/k/", "a"]).canonicalResult.surface,
    };
    [
        ["ACI-P041-L036-A2AE8FEE10", words.achtli === "achtli" && words.aachtli === "āchtli", words.achtli === words.aachtli],
        ["ACI-P041-L037-89AA1E5A6B", words.xihuitl === "xihuitl", words.xihuitl === "xīhuitl"],
        ["ACI-P041-L038-618E249004", words.metztli === "metztli", words.metztli === "mētztli"],
        ["ACI-P041-L039-94EE686CE3", words.quitoca === "quitoca", words.quitoca === "quitōca"],
        ["ACI-P041-L040-3B46F87E44", words.xiihuitl === "xīhuitl", words.xiihuitl === "xihuitl"],
        ["ACI-P041-L041-0A5390ED12", words.meetztli === "mētztli", words.meetztli === "metztli"],
        ["ACI-P041-L042-A746F8CF58", words.quitooka === "quitōca", words.quitooka === "quitoca"],
    ].forEach(([atomId, observed, broken]) => exact(atomId, observed, broken));

    exact("ACI-P042-L002-487133CBD3",
        JSON.stringify(inventory.consonantSystemFacts.classes) === JSON.stringify(["sonorant", "fricative", "stop", "affricate"]),
        inventory.consonantSystemFacts.classes.includes("vowel"));
    exact("ACI-P042-L007-76FBE35B6A", blocked({ segment: "/l/", phone: "l", position: "vocable-initial" }), authorized({ segment: "/l/", phone: "l", position: "vocable-initial" }));
    exact("ACI-P042-L009-0B04C64A1A", JSON.stringify(consonantCarriers["/l/"].phones) === JSON.stringify(["l", "l̥"]), consonantCarriers["/l/"].phones.includes("n"));
    exact("ACI-P042-L010-3F0BBCCCFF", authorized({ segment: "/l/", phone: "l̥", position: "syllable-final" }), authorized({ segment: "/l/", phone: "l̥", position: "syllable-initial" }));
    exact("ACI-P042-L012-1D19FE24D3", JSON.stringify(consonantCarriers["/n/"].phones) === JSON.stringify(["n", "ŋ", "n̥", "m"]), consonantCarriers["/n/"].phones.includes("l"));
    exact("ACI-P042-L013-3D25C97C65", ["before-k", "before-kw"].every(environment => authorized({ segment: "/n/", phone: "ŋ", position: "vocable-medial", environment })), authorized({ segment: "/n/", phone: "ŋ", position: "vocable-medial", environment: "before-t" }));
    exact("ACI-P042-L014-CE62BAD7C6", ["utterance-final", "vocable-final", "before-w", "before-y"].every(environment => authorized({ segment: "/n/", phone: "n̥", position: "vocable-medial", environment })), authorized({ segment: "/n/", phone: "n̥", position: "vocable-medial", environment: "before-t" }));
    exact("ACI-P042-L017-06B8F9C50D", authorized({ segment: "/m/", phone: "m", position: "vocable-medial", environment: "before-vowel" }), authorized({ segment: "/m/", phone: "m", position: "vocable-final", environment: "before-vowel" }));
    exact("ACI-P042-L019-29E356C10F", JSON.stringify(consonantCarriers["/m/"].phones) === JSON.stringify(["m", "n", "ŋ", "n̥"]), consonantCarriers["/m/"].phones.includes("l"));
    exact("ACI-P042-L020-51448F6307", blocked({ segment: "/m/", phone: "m", position: "vocable-final", environment: "before-vowel" }), authorized({ segment: "/m/", phone: "m", position: "vocable-final", environment: "before-vowel" }));
    exact("ACI-P042-L020-01D4D9B115", ["before-vowel", "before-p", "before-m"].every(environment => authorized({ segment: "/m/", phone: "m", position: "vocable-medial", environment })), authorized({ segment: "/m/", phone: "m", position: "vocable-medial", environment: "before-t" }));
    exact("ACI-P042-L024-20B24DB455", result({ segment: "/n/", phone: "m", position: "vocable-medial", environment: "assimilation-to-m" }).outputSpelling === "m" && result({ segment: "/n/", phone: "n", position: "vocable-medial" }).outputSpelling === "n", result({ segment: "/n/", phone: "n", position: "vocable-medial" }).outputSpelling === "m");
    exact("ACI-P042-L027-CD2308A77F-02", result({ segment: "/m/", phone: "n", position: "vocable-medial" }).outputSpelling === "n", result({ segment: "/m/", phone: "n", position: "vocable-medial" }).outputSpelling === "m");
    exact("ACI-P042-L027-CD2308A77F-03", transcribe(["/m/", "a", "/s/", "ā", "/λ/"]).canonicalResult.surface === "mazātl", transcribe(["/m/", "a", "/s/", "a", "/λ/"]).canonicalResult.surface === "mazātl");
    exact("ACI-P042-L027-CD2308A77F-04", transcribe(["ā", "/m/", "a", "/λ/"]).canonicalResult.surface === "āmatl", transcribe(["a", "/m/", "a", "/λ/"]).canonicalResult.surface === "āmatl");
    exact("ACI-P042-L027-CD2308A77F-05", result({ segment: "/m/", phone: "n", position: "vocable-final" }).outputSpelling === "n", result({ segment: "/m/", phone: "m", position: "vocable-final", environment: "before-vowel" }).outputSpelling === "n");

    return s;
}

module.exports = { run };
