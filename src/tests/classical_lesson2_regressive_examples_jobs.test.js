"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("classical_lesson2_regressive_examples_jobs");
    const assimilate = (leftConsonant, rightConsonant, options = {}) =>
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "phonology:assimilation",
            args: [{ leftConsonant, rightConsonant, grammaticalConstruction: true, ...options }],
        });
    const exact = (atomId, observed, broken) => {
        s.eq(`${atomId}: the normal application performs the exact job`, observed, true);
        s.eq(`${atomId}: changing the required behavior fails`, broken, false);
    };
    const wrong = (left, right, options, wrongForm) =>
        assimilate(left, right, { ...options, requestedOutputForm: wrongForm })
            .authorizationStatus === "authorized";

    const niquiz = assimilate("m", "s", {
        sourceLeftMorpheme: "niquim", sourceRightMorpheme: "centlālia",
        spellingStyle: "fully-assimilated",
    });
    exact("ACI-P049-L018-1E441CC94C",
        niquiz.canonicalResult.outputForm === "niquizcentlālia"
            && niquiz.canonicalResult.outputSound === "ss",
        wrong("m", "s", { sourceLeftMorpheme: "niquim", sourceRightMorpheme: "centlālia", spellingStyle: "fully-assimilated" }, "niquimcentlālia"));
    const tiquix = assimilate("m", "x", {
        sourceLeftMorpheme: "tiquim", sourceRightMorpheme: "xōx",
        spellingStyle: "fully-assimilated",
    });
    exact("ACI-P049-L019-8CDDF22229",
        tiquix.canonicalResult.outputForm === "tiquixxōx"
            && tiquix.canonicalResult.outputSound === "šš",
        wrong("m", "x", { sourceLeftMorpheme: "tiquim", sourceRightMorpheme: "xōx", spellingStyle: "fully-assimilated" }, "tiquimxōx"));

    const moncihtli = assimilate("n", "s", {
        sourceLeftMorpheme: "mōn", sourceRightMorpheme: "cihtli",
        spellingStyle: "source-preserving",
    });
    exact("ACI-P049-L020-2762BDE311",
        moncihtli.canonicalResult.traditionalSpellingMayHidePronunciation === true
            && moncihtli.canonicalResult.traditionalSourceSpellingRetained === true,
        assimilate("n", "t", { sourceLeftMorpheme: "mōn", sourceRightMorpheme: "tihtli", spellingStyle: "source-preserving" }).canonicalResult?.traditionalSpellingMayHidePronunciation === true);
    exact("ACI-P049-L020-2762BDE311-02",
        moncihtli.canonicalResult.outputForm === "mōncihtli"
            && moncihtli.canonicalResult.outputSound === "ss",
        wrong("n", "s", { sourceLeftMorpheme: "mōn", sourceRightMorpheme: "cihtli", spellingStyle: "source-preserving" }, "mōzcihtli"));
    exact("ACI-P049-L020-2762BDE311-03",
        moncihtli.canonicalResult.assimilationType === "total"
            && moncihtli.canonicalResult.outputSound === "ss",
        assimilate("n", "s", { grammaticalConstruction: false }).authorizationStatus === "authorized");

    const chicOn = assimilate("n", "x", {
        sourceLeftMorpheme: "chicōn", sourceRightMorpheme: "xihuitl",
        spellingStyle: "source-preserving",
    });
    exact("ACI-P049-L020-2762BDE311-04",
        chicOn.canonicalResult.outputForm === "chicōnxihuitl"
            && chicOn.canonicalResult.outputSound === "šš",
        wrong("n", "x", { sourceLeftMorpheme: "chicōn", sourceRightMorpheme: "xihuitl", spellingStyle: "source-preserving" }, "chicōxxihuitl"));
    exact("ACI-P049-L020-2762BDE311-05",
        chicOn.canonicalResult.outputSound === "šš"
            && chicOn.canonicalResult.dominantSide === "right",
        assimilate("n", "s").canonicalResult.outputSound === "šš");

    const zanCe = assimilate("n", "s", {
        sourceLeftMorpheme: "zan", sourceRightMorpheme: "cē",
        spellingStyle: "source-preserving", joinWithSpace: true,
    });
    const zazCe = assimilate("n", "s", {
        sourceLeftMorpheme: "zan", sourceRightMorpheme: "cē",
        spellingStyle: "fully-assimilated", joinWithSpace: true,
    });
    exact("ACI-P049-L020-2762BDE311-06",
        zanCe.canonicalResult.outputForm === "zan cē"
            && zanCe.canonicalResult.outputSound === "ss",
        wrong("n", "s", { sourceLeftMorpheme: "zan", sourceRightMorpheme: "cē", spellingStyle: "source-preserving", joinWithSpace: true }, "zaz cē"));
    exact("ACI-P049-L020-2762BDE311-07",
        zanCe.canonicalResult.outputSound === "ss",
        assimilate("n", "x").canonicalResult.outputSound === "ss");
    exact("ACI-P049-L020-2762BDE311-08",
        zazCe.canonicalResult.outputForm === "zaz cē"
            && zazCe.canonicalResult.outputSound === zanCe.canonicalResult.outputSound,
        wrong("n", "s", { sourceLeftMorpheme: "zan", sourceRightMorpheme: "cē", spellingStyle: "fully-assimilated", joinWithSpace: true }, "zan cē"));

    const inCihtli = assimilate("n", "s", {
        sourceLeftMorpheme: "in", sourceRightMorpheme: "cihtli",
        spellingStyle: "source-preserving", joinWithSpace: true,
    });
    exact("ACI-P049-L020-2762BDE311-09",
        inCihtli.canonicalResult.outputForm === "in cihtli"
            && inCihtli.canonicalResult.outputSound === "ss",
        wrong("n", "s", { sourceLeftMorpheme: "in", sourceRightMorpheme: "cihtli", spellingStyle: "source-preserving", joinWithSpace: true }, "iz cihtli"));
    exact("ACI-P049-L020-2762BDE311-10",
        inCihtli.canonicalResult.direction === "regressive"
            && inCihtli.canonicalResult.assimilationType === "total",
        assimilate("n", "s", { grammaticalConstruction: false }).authorizationStatus === "authorized");

    const techTzincoSource = { sourceLeftMorpheme: "ītech", sourceRightMorpheme: "tzinco" };
    const itechtzinco = assimilate("ch", "tz", { ...techTzincoSource, spellingStyle: "source-preserving" });
    const itetztzinco = assimilate("ch", "tz", { ...techTzincoSource, spellingStyle: "fully-assimilated" });
    const itettzinco = assimilate("ch", "tz", { ...techTzincoSource, spellingStyle: "unreleased-t-plus-right" });
    const itetzinco = assimilate("ch", "tz", { ...techTzincoSource, spellingStyle: "contracted" });
    exact("ACI-P049-L030-AF1F6BDC65", itechtzinco.canonicalResult.outputForm === "ītechtzinco", wrong("ch", "tz", { ...techTzincoSource, spellingStyle: "source-preserving" }, "ītetztzinco"));
    exact("ACI-P049-L030-AF1F6BDC65-02", itechtzinco.canonicalResult.outputSound === "¢¢" && itechtzinco.canonicalResult.releasePronunciation === "[t¢]", assimilate("ch", "s").canonicalResult.outputSound === "¢¢");
    exact("ACI-P049-L030-AF1F6BDC65-03", itetztzinco.canonicalResult.outputForm === "ītetztzinco", wrong("ch", "tz", { ...techTzincoSource, spellingStyle: "fully-assimilated" }, "ītechtzinco"));
    exact("ACI-P049-L030-AF1F6BDC65-04", itettzinco.canonicalResult.outputForm === "ītettzinco", wrong("ch", "tz", { ...techTzincoSource, spellingStyle: "unreleased-t-plus-right" }, "ītetzinco"));
    exact("ACI-P049-L030-AF1F6BDC65-05", itetzinco.canonicalResult.outputForm === "ītetzinco", wrong("ch", "tz", { ...techTzincoSource, spellingStyle: "contracted" }, "ītettzinco"));

    const techZaloaSource = { sourceLeftMorpheme: "quinetech", sourceRightMorpheme: "zāloa" };
    const techZaloa = assimilate("ch", "s", { ...techZaloaSource, spellingStyle: "source-preserving" });
    const teZaloa = assimilate("ch", "s", { ...techZaloaSource, spellingStyle: "contracted" });
    exact("ACI-P049-L030-AF1F6BDC65-06", techZaloa.canonicalResult.outputForm === "quinetechzāloa", wrong("ch", "s", { ...techZaloaSource, spellingStyle: "source-preserving" }, "quinetezāloa"));
    exact("ACI-P049-L030-AF1F6BDC65-07", techZaloa.canonicalResult.outputSound === "ss", assimilate("ch", "x").canonicalResult.outputSound === "ss");
    exact("ACI-P049-L030-AF1F6BDC65-08", teZaloa.canonicalResult.outputForm === "quinetezāloa", wrong("ch", "s", { ...techZaloaSource, spellingStyle: "contracted" }, "quinetechzāloa"));

    const mitzChiyaSource = { sourceLeftMorpheme: "nimitz", sourceRightMorpheme: "chiya" };
    const mitzChiya = assimilate("tz", "ch", { ...mitzChiyaSource, spellingStyle: "source-preserving" });
    const mitChiya = assimilate("tz", "ch", { ...mitzChiyaSource, spellingStyle: "unreleased-t-plus-right" });
    const miChiya = assimilate("tz", "ch", { ...mitzChiyaSource, spellingStyle: "contracted" });
    const mitChia = assimilate("tz", "ch", { ...mitzChiyaSource, spellingStyle: "unreleased-t-plus-right", omitIntervocalicY: true });
    const miChia = assimilate("tz", "ch", { ...mitzChiyaSource, spellingStyle: "contracted", omitIntervocalicY: true });
    exact("ACI-P049-L030-AF1F6BDC65-09", mitzChiya.canonicalResult.outputForm === "nimitzchiya", wrong("tz", "ch", { ...mitzChiyaSource, spellingStyle: "source-preserving" }, "nimitchiya"));
    exact("ACI-P049-L030-AF1F6BDC65-10", mitzChiya.canonicalResult.outputSound === "čč" && mitzChiya.canonicalResult.releasePronunciation === "[tč]", assimilate("tz", "s").canonicalResult.outputSound === "čč");
    exact("ACI-P049-L030-AF1F6BDC65-11", mitChiya.canonicalResult.outputForm === "nimitchiya", wrong("tz", "ch", { ...mitzChiyaSource, spellingStyle: "unreleased-t-plus-right" }, "nimichiya"));
    exact("ACI-P049-L030-AF1F6BDC65-12", miChiya.canonicalResult.outputForm === "nimichiya", wrong("tz", "ch", { ...mitzChiyaSource, spellingStyle: "contracted" }, "nimitchiya"));
    exact("ACI-P049-L030-AF1F6BDC65-13", mitChia.canonicalResult.outputForm === "nimitchia", wrong("tz", "ch", { ...mitzChiyaSource, spellingStyle: "unreleased-t-plus-right", omitIntervocalicY: true }, "nimitchiya"));
    exact("ACI-P049-L030-AF1F6BDC65-14", miChia.canonicalResult.outputForm === "nimichia", wrong("tz", "ch", { ...mitzChiyaSource, spellingStyle: "contracted", omitIntervocalicY: true }, "nimichiya"));

    const nechXoxaSource = { sourceLeftMorpheme: "nēch", sourceRightMorpheme: "xōxa" };
    const nechXoxa = assimilate("ch", "x", { ...nechXoxaSource, spellingStyle: "source-preserving" });
    const nexxoxa = assimilate("ch", "x", { ...nechXoxaSource, spellingStyle: "fully-assimilated" });
    exact("ACI-P049-L030-AF1F6BDC65-15", nechXoxa.canonicalResult.outputForm === "nēchxōxa", wrong("ch", "x", { ...nechXoxaSource, spellingStyle: "source-preserving" }, "nēxxōxa"));
    exact("ACI-P049-L030-AF1F6BDC65-16", nechXoxa.canonicalResult.outputSound === "šš", assimilate("ch", "s").canonicalResult.outputSound === "šš");
    exact("ACI-P049-L030-AF1F6BDC65-17", nexxoxa.canonicalResult.outputForm === "nēxxōxa", wrong("ch", "x", { ...nechXoxaSource, spellingStyle: "fully-assimilated" }, "nēchxōxa"));

    const cuamMaitl = assimilate("w", "m", {
        sourceLeftMorpheme: "cuauh", sourceRightMorpheme: "māitl",
        spellingStyle: "fully-assimilated",
    });
    exact("ACI-P049-L036-567BAC1121",
        cuamMaitl.canonicalResult.outputForm === "cuammāitl"
            && cuamMaitl.canonicalResult.outputSound === "mm",
        wrong("w", "m", { sourceLeftMorpheme: "cuauh", sourceRightMorpheme: "māitl", spellingStyle: "fully-assimilated" }, "cuauhmāitl"));
    const nappa = assimilate("w", "p", {
        sourceLeftMorpheme: "nāuh", sourceRightMorpheme: "pa",
        spellingStyle: "fully-assimilated",
    });
    exact("ACI-P049-L037-714FF652AC",
        nappa.canonicalResult.outputForm === "nāppa"
            && nappa.canonicalResult.outputSound === "pp",
        wrong("w", "p", { sourceLeftMorpheme: "nāuh", sourceRightMorpheme: "pa", spellingStyle: "fully-assimilated" }, "nāuhpa"));

    return s;
}

module.exports = { run };
