"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_lesson2_fricative_stop_affricate_jobs");
    const request = (operationId, args) =>
        ctx.executeClassicalGrammarApplicationRequest({ operationId, args });
    const realize = options => request("phonology:segment-realization", [options]);
    const authorized = options => realize(options).authorizationStatus === "authorized";
    const blocked = options => realize(options).authorizationStatus === "blocked";
    const result = options => realize(options).canonicalResult;
    const transcribe = segments => {
        const source = ctx.buildClassicalNahuatlTranscriptionSourceFrame({
            constituents: [{ segments }],
        });
        return request("orthography:transcription", [source]).canonicalResult;
    };
    const exact = (atomId, observed, broken) => {
        s.eq(`${atomId}: the normal application performs the exact job`, observed, true);
        s.eq(`${atomId}: changing the required behavior fails`, broken, false);
    };
    const carrierFrame = transcribe(["a"]).carrierFrame;
    const carriers = carrierFrame.consonantCarriers;

    const regular = (segment, phone, extra = {}) => ({
        segment, phone, position: "syllable-initial", followingVowel: "a", ...extra,
    });

    exact("ACI-P042-L032-200085F1A8",
        authorized(regular("/s/", "s"))
            && authorized(regular("/s/", "š", { morphologicalProcess: true })),
        authorized(regular("/s/", "š")));
    exact("ACI-P042-L035-63D7FE9185", authorized(regular("/š/", "š")), authorized(regular("/š/", "s")));
    exact("ACI-P042-L037-F7F60F2916",
        authorized(regular("/y/", "y"))
            && authorized({ segment: "/y/", phone: "š", position: "vocable-final" })
            && authorized({ segment: "/y/", phone: "s", position: "vocable-final" })
            && authorized(regular("/y/", "l", { morphologicalProcess: true })),
        authorized(regular("/y/", "l")));
    exact("ACI-P042-L038-A2D51BA4BB",
        blocked({ segment: "/y/", phone: "y", position: "vocable-final" })
            && authorized({ segment: "/y/", phone: "š", position: "vocable-final" }),
        authorized({ segment: "/y/", phone: "y", position: "vocable-final" }));
    exact("ACI-P042-L039-ACF0895BEB",
        authorized(regular("/w/", "w")) && carriers["/w/"].articulation.includes("labial"),
        authorized(regular("/w/", "l")));
    exact("ACI-P043-L003-353341D1F5",
        [
            regular("/w/", "w"),
            { segment: "/w/", phone: "w̥", position: "syllable-final" },
            regular("/w/", "β"),
            { segment: "/w/", phone: "ɸ", position: "syllable-final" },
            regular("/w/", "m", { morphologicalProcess: true }),
            regular("/w/", "p", { morphologicalProcess: true }),
        ].every(authorized),
        authorized(regular("/w/", "t")));
    exact("ACI-P043-L004-F2E29DEABA",
        authorized(regular("/w/", "w", { speakerVariant: "male" }))
            && authorized({ segment: "/w/", phone: "w̥", position: "syllable-final", speakerVariant: "male" }),
        authorized(regular("/w/", "β", { speakerVariant: "male" })));
    exact("ACI-P043-L009-8A8A8CF899",
        ["w", "β"].every(phone => authorized(regular("/w/", phone))),
        authorized({ segment: "/w/", phone: "β", position: "syllable-final" }));
    exact("ACI-P043-L010-2CCAB7C51B",
        ["w̥", "ɸ"].every(phone => authorized({ segment: "/w/", phone, position: "syllable-final" })),
        authorized(regular("/w/", "ɸ")));
    exact("ACI-P043-L019-15C0490C69",
        result({ segment: "/w/", phone: "w", position: "syllable-initial", sequence: "owā", omitFrequentW: true }).outputSpelling === "∅",
        result({ segment: "/w/", phone: "w", position: "syllable-initial", sequence: "awa", omitFrequentW: true }).outputSpelling === "∅");
    const ambiguousW = { segment: "/w/", phone: "w", position: "syllable-initial", sequence: "owā", owaOaAmbiguous: true };
    exact("ACI-P043-L020-A07915A2FD", blocked(ambiguousW) && authorized({ ...ambiguousW, lexicalChoice: "owa" }), authorized(ambiguousW));
    exact("ACI-P043-L020-A07915A2FD-02",
        transcribe(["/k/", "ō", "/w/", "ā", "/λ/"]).surface === "cōhuātl"
            && transcribe(["/k/", "ō", "ā", "/λ/"]).surface === "cōātl"
            && blocked(ambiguousW),
        authorized(ambiguousW));
    exact("ACI-P043-L027-98A44BD022-02",
        ["iya", "ayi"].every(sequence => result({ segment: "/y/", phone: "y", position: "syllable-initial", sequence, omitFrequentY: true }).outputSpelling === "∅"),
        result({ segment: "/y/", phone: "y", position: "syllable-initial", sequence: "aya", omitFrequentY: true }).outputSpelling === "∅");

    exact("ACI-P043-L034-AB18229A6C", authorized(regular("/p/", "p")), authorized(regular("/p/", "b")));
    exact("ACI-P043-L038-8B0190F494",
        authorized(regular("/t/", "t"))
            && authorized(regular("/t/", "č", { morphologicalProcess: true }))
            && authorized(regular("/t/", "h", { morphologicalProcess: true })),
        authorized(regular("/t/", "č")));
    exact("ACI-P043-L039-3329EAB5F5", authorized(regular("/t/", "č", { morphologicalProcess: true })), authorized(regular("/t/", "č")));
    exact("ACI-P044-L004-D360BDABAF", authorized(regular("/k/", "k")), authorized(regular("/k/", "h")));
    exact("ACI-P044-L005-D667DCBE75", authorized(regular("/k/", "h", { morphologicalProcess: true })), authorized(regular("/k/", "h")));
    exact("ACI-P044-L008-C4AD6FC5E4",
        authorized(regular("/kʷ/", "kʷ"))
            && authorized({ segment: "/kʷ/", phone: "kʷ̥", position: "syllable-final" })
            && authorized({ segment: "/kʷ/", phone: "k", position: "syllable-final", optionalDelabialization: true })
            && authorized(regular("/kʷ/", "h", { morphologicalProcess: true })),
        authorized(regular("/kʷ/", "p")));
    exact("ACI-P044-L009-A973F5B96F",
        carriers["/kʷ/"].composition.join("+") === "k-onset+w-release"
            && authorized(regular("/kʷ/", "kʷ"))
            && authorized({ segment: "/kʷ/", phone: "kʷ̥", position: "syllable-final" }),
        authorized({ segment: "/kʷ/", phone: "kʷ", position: "syllable-final" }));
    exact("ACI-P044-L009-A973F5B96F-02", authorized(regular("/kʷ/", "kʷ")), authorized({ segment: "/kʷ/", phone: "kʷ", position: "syllable-final" }));
    exact("ACI-P044-L011-8D096DB6AB", authorized({ segment: "/kʷ/", phone: "kʷ̥", position: "syllable-final" }), authorized(regular("/kʷ/", "kʷ̥")));
    exact("ACI-P044-L012-80135184B8", authorized({ segment: "/kʷ/", phone: "k", position: "syllable-final", optionalDelabialization: true }), authorized({ segment: "/kʷ/", phone: "k", position: "syllable-final" }));
    exact("ACI-P044-L014-144263341A", carriers["/ʔ/"].articulation.includes("glottal-closure") && authorized({ segment: "/ʔ/", phone: "ʔ", position: "utterance-final", precedingVowelQuantity: "short" }), authorized({ segment: "/ʔ/", phone: "ʔ", position: "utterance-final", precedingVowelQuantity: "long" }));
    exact("ACI-P044-L017-D45B9DF812", authorized({ segment: "/ʔ/", phone: "ʔ", position: "utterance-final", precedingVowelQuantity: "short" }), authorized({ segment: "/ʔ/", phone: "ʔ", position: "utterance-final", precedingVowelQuantity: "long" }));
    exact("ACI-P044-L017-2985B8B7F5", blocked({ segment: "/ʔ/", phone: "h", position: "utterance-internal", precedingVowelQuantity: "long" }) && authorized({ segment: "/ʔ/", phone: "h", position: "utterance-internal", precedingVowelQuantity: "short" }), authorized({ segment: "/ʔ/", phone: "h", position: "utterance-internal", precedingVowelQuantity: "long" }));
    exact("ACI-P044-L019-A1ABA633CB",
        blocked({ segment: "/ʔ/", phone: "ʔ", position: "vocable-initial", phonemic: true })
            && authorized({ segment: "/ʔ/", phone: "ʔ", position: "vocable-initial", phonemic: false }),
        authorized({ segment: "/ʔ/", phone: "ʔ", position: "vocable-initial", phonemic: true }));
    exact("ACI-P044-L021-561E724BF9", authorized({ segment: "/ʔ/", phone: "h", position: "utterance-final", precedingVowelQuantity: "short", dialectalAlternative: true }), authorized({ segment: "/ʔ/", phone: "h", position: "utterance-final", precedingVowelQuantity: "short" }));
    exact("ACI-P044-L023-01709339AE",
        authorized({ segment: "/ʔ/", phone: "ʔ", position: "utterance-final", precedingVowelQuantity: "short" })
            && authorized({ segment: "/ʔ/", phone: "h", position: "utterance-internal", precedingVowelQuantity: "short" })
            && authorized({ segment: "/ʔ/", phone: "y", position: "utterance-internal", precedingVowelQuantity: "short", morphologicalProcess: true }),
        authorized({ segment: "/ʔ/", phone: "y", position: "utterance-internal", precedingVowelQuantity: "short" }));
    exact("ACI-P044-L024-9D5908F96D", authorized({ segment: "/ʔ/", phone: "ʔ", position: "utterance-final", precedingVowelQuantity: "short" }), authorized({ segment: "/ʔ/", phone: "ʔ", position: "utterance-internal", precedingVowelQuantity: "short" }));
    exact("ACI-P044-L025-8730E52478", authorized({ segment: "/ʔ/", phone: "h", position: "utterance-internal", precedingVowelQuantity: "short" }), authorized({ segment: "/ʔ/", phone: "h", position: "utterance-final", precedingVowelQuantity: "short" }));
    exact("ACI-P044-L029-4CEF656946", authorized({ segment: "/ʔ/", phone: "y", position: "utterance-internal", precedingVowelQuantity: "short", morphologicalProcess: true }), authorized({ segment: "/ʔ/", phone: "y", position: "utterance-internal", precedingVowelQuantity: "short" }));
    exact("ACI-P044-L034-DCC310EE8E", transcribe(["/k/", "ē", "/n/"]).surface === "quēn" && transcribe(["/k/", "i", "/n/"]).surface === "quin", transcribe(["/k/", "ē", "/n/"]).surface === "cēn");
    exact("ACI-P044-L036-68347FAA55", result(regular("/kʷ/", "kʷ")).outputSpelling === "cu" && result({ segment: "/kʷ/", phone: "kʷ̥", position: "syllable-final" }).outputSpelling === "uc", result(regular("/kʷ/", "kʷ")).outputSpelling === "uc");
    exact("ACI-P044-L038-2D143BDBE9", result({ segment: "/kʷ/", phone: "kʷ̥", position: "syllable-final" }).outputSpelling === "uc", result({ segment: "/kʷ/", phone: "kʷ̥", position: "syllable-final" }).outputSpelling === "cu");
    exact("ACI-P044-L039-D582A407B2", result({ segment: "/kʷ/", phone: "k", position: "syllable-final", optionalDelabialization: true }).outputSpelling === "c", result({ segment: "/kʷ/", phone: "k", position: "syllable-final" }).outputSpelling === "c");

    exact("ACI-P045-L006-172CAF6951",
        authorized({ segment: "/λ/", phone: "λ", position: "syllable-initial" })
            && authorized({ segment: "/λ/", phone: "λ̥", position: "syllable-final" })
            && authorized(regular("/λ/", "t", { morphologicalProcess: true }))
            && authorized(regular("/λ/", "č", { morphologicalProcess: true, underlyingT: true }))
            && authorized(regular("/λ/", "l", { morphologicalProcess: true })),
        authorized(regular("/λ/", "č", { morphologicalProcess: true })));
    exact("ACI-P045-L008-A9CE40A048", authorized({ segment: "/λ/", phone: "λ", position: "syllable-initial" }), authorized({ segment: "/λ/", phone: "λ", position: "syllable-final" }));
    exact("ACI-P045-L009-59162348AA", authorized({ segment: "/λ/", phone: "λ̥", position: "syllable-final" }), authorized({ segment: "/λ/", phone: "λ̥", position: "syllable-initial" }));
    exact("ACI-P045-L010-20552CDB77", authorized(regular("/λ/", "t", { morphologicalProcess: true })), authorized(regular("/λ/", "t")));
    exact("ACI-P045-L011-5FE4F29714", authorized(regular("/λ/", "č", { morphologicalProcess: true, underlyingT: true })), authorized(regular("/λ/", "č", { morphologicalProcess: true })));
    exact("ACI-P045-L012-5A5BF547DB", blocked(regular("/λ/", "č", { morphologicalProcess: true })) && authorized(regular("/λ/", "č", { morphologicalProcess: true, underlyingT: true })), authorized(regular("/λ/", "č", { morphologicalProcess: true })));
    exact("ACI-P045-L013-E5A3BAC717", result(regular("/λ/", "č", { morphologicalProcess: true, underlyingT: true })).outputSpelling === "ch", result(regular("/λ/", "č", { morphologicalProcess: true })).outputSpelling === "ch");
    exact("ACI-P045-L014-1EE4F3B953", authorized(regular("/λ/", "l", { morphologicalProcess: true })), authorized(regular("/λ/", "l")));
    const singleTz = transcribe(["a", "/¢/", "a"]);
    const tPlusS = transcribe(["a", "/t/", "/s/", "a"]);
    exact("ACI-P045-L015-896059A9A2-03",
        carriers["/¢/"].onePhoneme === true
            && singleTz.formula === "#(a/¢/a)#"
            && tPlusS.formula === "#(a/t//s/a)#",
        singleTz.formula === tPlusS.formula);
    exact("ACI-P045-L019-700DDA618F", authorized(regular("/¢/", "¢")) && authorized(regular("/¢/", "č", { irregularSourceLicensed: true })), authorized(regular("/¢/", "č")));
    exact("ACI-P045-L020-F601244A8E", authorized(regular("/¢/", "č", { irregularSourceLicensed: true })), authorized(regular("/¢/", "č")));
    exact("ACI-P045-L021-356443CB33", result(regular("/¢/", "č", { irregularSourceLicensed: true })).outputSpelling === "ch", result(regular("/¢/", "č")).outputSpelling === "ch");
    exact("ACI-P045-L025-E803B9B8AC", authorized(regular("/č/", "č")) && authorized(regular("/č/", "¢", { irregularSourceLicensed: true })) && authorized(regular("/č/", "p", { irregularSourceLicensed: true })), authorized(regular("/č/", "p")));
    exact("ACI-P045-L026-3EB969809B", authorized(regular("/č/", "¢", { irregularSourceLicensed: true })), authorized(regular("/č/", "¢")));
    exact("ACI-P045-L026-3EB969809B-02", result(regular("/č/", "¢", { irregularSourceLicensed: true })).outputSpelling === "tz", result(regular("/č/", "¢")).outputSpelling === "tz");
    exact("ACI-P045-L026-3EB969809B-03", result(regular("/č/", "¢", { irregularSourceLicensed: true })).outputSpelling === "tz", result(regular("/č/", "č")).outputSpelling === "tz");
    exact("ACI-P045-L028-04AAC6D1B7", authorized(regular("/č/", "p", { irregularSourceLicensed: true })), authorized(regular("/č/", "p")));
    exact("ACI-P045-L034-7609BEDD16",
        authorized({ writtenSequence: "chu", sourcePhonemes: ["/k/", "/w/"] })
            && result({ writtenSequence: "chu", sourcePhonemes: ["/k/", "/w/"] }).singlePhoneme === false,
        authorized({ writtenSequence: "chu", sourcePhonemes: ["/kʷ/"] }));

    return s;
}

module.exports = { run };
