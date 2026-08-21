"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson34-five-through-nine-composition",
    "lesson34-ten-fifteen-and-gross-possessive",
    "lesson34-higher-vigesimal-orders",
];

function request(value, overrides = {}) {
    return {
        constructionKind: "cardinal-numeral-nnc",
        value,
        classifier: "basic",
        countKind: "ordinary",
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
        ...overrides,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson34_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson34-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = input => ctx.evaluateClassicalNahuatlNominalConstruction(input);

    const ordinary = [5, 6, 7, 8, 9, 10, 15].map(value => evaluate(request(
        value, { subject: "3pl", animacy: "animate" }
    )));
    const gross = [5, 6, 7, 8, 9, 10, 15].map(value => evaluate(request(
        value, { countKind: "gross", subject: "3pl", animacy: "nonanimate" }
    )));
    s.eq("five through fifteen preserve Source boundaries and derive inflection", {
        ordinary: ordinary.map(frame => [frame.authorizationStatus,
            frame.operationFrame?.stem, frame.formulaRealization,
            frame.wordSurface]),
        gross: gross.map(frame => [frame.authorizationStatus,
            frame.operationFrame?.stem, frame.formulaRealization,
            frame.wordSurface]),
        sourceKinds: ordinary.slice(0, 5).map(frame => frame.sourceFrame
            ?.numeralSourceAnalysisFrame?.sourceKind),
        exampleAuthority: ordinary.map(frame => frame.sourceFrame
            ?.numeralSourceAnalysisFrame?.examplesAuthorizeSourceOrRoute),
    }, {
        ordinary: [
            ["authorized", "mā-cu-ī-l", "#0-0(mā-cu-ī-l)t-in#", "mācuīltin"],
            ["authorized", "chicua-cem-in", "#0-0(chicua-cem-in)t-in#", "chicuacemintin"],
            ["authorized", "chic-ōme-n", "#0-0(chic-ōme-n)t-in#", "chicōmentin"],
            ["authorized", "chicu-ēi-n", "#0-0(chicu-ēi-n)t-in#", "chicuēintin"],
            ["authorized", "chiuc-nāhui-n", "#0-0(chiuc-nāhui-n)t-in#", "chiucnāhuintin"],
            ["authorized", "mah-tlāc", "#0-0(mah-tlāc)t-in#", "mahtlāctin"],
            ["authorized", "cax-tōl", "#0-0(cax-tōl)t-in#", "caxtōltin"],
        ],
        gross: [
            ["authorized", "mā-cu-ī-l-ix", "#0-0(mā-cu-ī-l-ix)t-in#", "mācuīlixtin"],
            ["authorized", "chicua-cem-ix", "#0-0(chicua-cem-ix)t-in#", "chicuacemixtin"],
            ["authorized", "chic-ōme-x", "#0-0(chic-ōme-x)t-in#", "chicōmextin"],
            ["authorized", "chicu-ē-ix", "#0-0(chicu-ē-ix)t-in#", "chicuēixtin"],
            ["authorized", "chiuc-nāhu-ix", "#0-0(chiuc-nāhu-ix)t-in#", "chiucnāhuixtin"],
            ["authorized", "mah-tlāqu-ix", "#0-0(mah-tlāqu-ix)t-in#", "mahtlāquixtin"],
            ["authorized", "cax-tōl-ix", "#0-0(cax-tōl-ix)t-in#", "caxtōlixtin"],
        ],
        sourceKinds: ["derived-passive-patientive-nounstem",
            "five-plus-one-compound-numeral", "five-plus-two-compound-numeral",
            "five-plus-three-compound-numeral", "five-plus-four-compound-numeral"],
        exampleAuthority: Array(7).fill(false),
    });

    const highValues = [20, 40, 180, 400, 1200, 4000, 8000, 32000];
    const higher = highValues.map(value => evaluate(request(value)));
    s.eq("multipliers one through nineteen enter each fixed higher-order matrix", {
        statuses: higher.map(frame => frame.authorizationStatus),
        stems: higher.map(frame => frame.operationFrame?.stem),
        totals: higher.map(frame => frame.sourceFrame
            ?.numeralSourceAnalysisFrame?.computedTotalValue),
        terms: higher.map(frame => frame.sourceFrame
            ?.numeralSourceAnalysisFrame?.numeralTerms?.map(term => [
                term.multiplier, term.order, term.realizedStem, term.computedValue,
            ])),
        matrices: higher.map(frame => frame.sourceFrame
            ?.numeralSourceAnalysisFrame?.higherOrderMatrixFacts?.map(fact => (
                fact.matrixStem
            ))),
    }, {
        statuses: Array(8).fill("authorized"),
        stems: ["cem-pōhu-a-l", "ōm-pōhu-a-l", "chiuc-nāuh-pōhu-a-l",
            "cen-tzon", "ē-tzon", "mah-tlāc-tzon", "cen-xiqu-ipil",
            "nāuh-xiqu-ipil"],
        totals: highValues,
        terms: [
            [[1, 20, "cem-pōhu-a-l", 20]],
            [[2, 20, "ōm-pōhu-a-l", 40]],
            [[9, 20, "chiuc-nāuh-pōhu-a-l", 180]],
            [[1, 400, "cen-tzon", 400]],
            [[3, 400, "ē-tzon", 1200]],
            [[10, 400, "mah-tlāc-tzon", 4000]],
            [[1, 8000, "cen-xiqu-ipil", 8000]],
            [[4, 8000, "nāuh-xiqu-ipil", 32000]],
        ],
        matrices: [["pōhu-a-l"], ["pōhu-a-l"], ["pōhu-a-l"],
            ["tzon"], ["tzon"], ["tzon"], ["xiqu-ipil"], ["xiqu-ipil"]],
    });

    const grossPossessive = overrides => evaluate(request(10, {
        countKind: "gross", subject: "3pl", state: "possessive",
        animacy: "nonanimate", ...overrides,
    }));
    const animate = grossPossessive({ possessor: "3pl",
        grossPossessorKind: "animate" });
    const nonanimateTin = grossPossessive({ possessor: "3sg",
        grossPossessorKind: "nonanimate",
        source: { possessorReferentPlural: true },
        grossPossessiveNumberVariant: "tin" });
    const nonanimateTi = grossPossessive({ possessor: "3sg",
        grossPossessorKind: "nonanimate",
        source: { possessorReferentPlural: true },
        grossPossessiveNumberVariant: "ti" });
    s.eq("gross possessive participant facts and the genuine ti or tin choice are typed", {
        animate: [animate.authorizationStatus, animate.formulaRealization,
            animate.wordSurface, animate.operationFrame?.grossPossessiveFrame],
        nonanimateTin: [nonanimateTin.authorizationStatus,
            nonanimateTin.formulaRealization, nonanimateTin.wordSurface,
            nonanimateTin.operationFrame?.grossPossessiveFrame],
        nonanimateTi: [nonanimateTi.authorizationStatus,
            nonanimateTi.formulaRealization, nonanimateTi.wordSurface,
            nonanimateTi.operationFrame?.grossPossessiveFrame],
    }, {
        animate: ["authorized", "#0-0+ī-m(mah-tlāqu-ix)t-in#",
            "īmmahtlāquixtin", {
                kind: "classical-nahuatl-cardinal-gross-possessive-frame",
                version: 1, authorizationStatus: "authorized", possessor: "3pl",
                possessorKind: "animate", possessorReferentPlural: true,
                availableNumberVariants: ["tin"], selectedNumberVariant: "tin",
                numberVariantChoiceRequired: false,
                finalNMayBeOrthographicallyOmitted: false,
                formulaStringAuthority: false, surfaceStringAuthority: false,
            }],
        nonanimateTin: ["authorized", "#0-0+ī-0(mah-tlāqu-ix)t-in#",
            "īmahtlāquixtin", {
                kind: "classical-nahuatl-cardinal-gross-possessive-frame",
                version: 1, authorizationStatus: "authorized", possessor: "3sg",
                possessorKind: "nonanimate", possessorReferentPlural: true,
                availableNumberVariants: ["tin", "ti"], selectedNumberVariant: "tin",
                numberVariantChoiceRequired: true,
                finalNMayBeOrthographicallyOmitted: true,
                formulaStringAuthority: false, surfaceStringAuthority: false,
            }],
        nonanimateTi: ["authorized", "#0-0+ī-0(mah-tlāqu-ix)ti-0#",
            "īmahtlāquixti", {
                kind: "classical-nahuatl-cardinal-gross-possessive-frame",
                version: 1, authorizationStatus: "authorized", possessor: "3sg",
                possessorKind: "nonanimate", possessorReferentPlural: true,
                availableNumberVariants: ["tin", "ti"], selectedNumberVariant: "ti",
                numberVariantChoiceRequired: true,
                finalNMayBeOrthographicallyOmitted: true,
                formulaStringAuthority: false, surfaceStringAuthority: false,
            }],
    });

    const contradictions = [
        grossPossessive({ possessor: "3sg", grossPossessorKind: "animate" }),
        grossPossessive({ possessor: "3pl", grossPossessorKind: "nonanimate",
            source: { possessorReferentPlural: true } }),
        grossPossessive({ possessor: "3sg", grossPossessorKind: "nonanimate" }),
        grossPossessive({ possessor: "3pl", grossPossessorKind: "animate",
            grossPossessiveNumberVariant: "ti" }),
        evaluate({ ...request(20), formula: "#forged#" }),
    ];
    s.eq("participant mismatches and derived-string authority block", {
        statuses: contradictions.map(frame => frame.authorizationStatus),
        reasons: contradictions.slice(0, 4).map(frame => frame.blockReason),
        poison: contradictions[4].blockReason?.startsWith(
            "caller-supplied-derived-authority-rejected:"),
    }, {
        statuses: Array(5).fill("blocked"),
        reasons: ["gross-possessive-animate-possessor-must-be-plural",
            "gross-possessive-nonanimate-possessor-requires-third-person-common-number",
            "gross-possessive-nonanimate-possessor-referent-must-be-plural",
            "gross-possessive-ti-variant-requires-nonanimate-possessor"],
        poison: true,
    });

    const cueFrames = [...ordinary, ...gross, ...higher, animate,
        nonanimateTin, nonanimateTi];
    const cues = cueFrames.flatMap(frame => ctx.getClassicalFormulaDerivedAnnotations(
        frame.formulaRealization,
        frame.canonicalResult?.nncSlotFrame,
        frame,
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("every accepted atom has its exact writing or reading cue", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
        groups: new Set(records.map(record => record.reviewGroupId)).size,
        cueGroups: new Set(cues.map(cue => cue.role)).size,
        covered: GROUPS.every(group => {
            const ids = records.filter(record => record.reviewGroupId === group)
                .map(record => record.atomId);
            return cues.some(cue => cue.role === group
                && ids.every(id => cue.atomIds?.includes(id)));
        }),
    }, { records: 120, writing: 67, readingOnly: 53,
        groups: 3, cueGroups: 3, covered: true });

    for (const record of writing) {
        const cue = cues.find(entry => entry.role === record.reviewGroupId);
        s.ok(`${record.atomId} has its accepted canonical observation`,
            Boolean(cue?.atomIds?.includes(record.atomId)));
        s.eq(`mutation:${record.atomId} loses exact credit when removed`,
            cue.atomIds.filter(id => id !== record.atomId)
                .includes(record.atomId), false);
    }

    const shell = fs.readFileSync(path.join(
        ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.ok("the UI exposes only the accepted gross-possession choices",
        shell.includes('id="classical-cardinal-gross-possessor-kind"')
        && shell.includes('id="classical-cardinal-gross-number-variant"')
        && rendering.includes("cardinalGrossPossessive")
        && rendering.includes('cardinalGrossPossessorKind === "nonanimate"')
        && rendering.includes('subject: countKind === "gross" ? "3pl" : subject')
        && !shell.includes('id="classical-cardinal-gross-subject-number"')
        && !shell.includes('id="classical-cardinal-higher-order-matrix"')
        && !shell.includes('id="classical-cardinal-chicua-allomorph"'));
    return s;
}

module.exports = { run };
