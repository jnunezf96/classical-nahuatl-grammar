"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson34-cardinal-numeral-foundation-and-count-kind",
    "lesson34-numeral-one-and-cem-shape",
    "lesson34-two-three-four-shapes-and-gross-count",
];

function request(overrides = {}) {
    return {
        constructionKind: "cardinal-numeral-nnc",
        value: 1,
        classifier: "basic",
        countKind: "ordinary",
        subject: "3common",
        state: "absolutive",
        animacy: "nonanimate",
        ...overrides,
    };
}

function vnc(value, variant = "", matrixStem = "pah") {
    return request({
        value,
        numeralOutputKind: "vnc-embed",
        subject: "3sg",
        source: {
            matrixStem,
            matrixVerbClass: "A",
            matrixValence: "intransitive",
            numeralVariant: variant,
        },
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson34_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson34-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = input => ctx.evaluateClassicalNahuatlNominalConstruction(input);

    const one = evaluate(request());
    const onePlural = evaluate(request({ subject: "3pl", animacy: "animate" }));
    const ordinaryPlural = [2, 3, 4].map(value => evaluate(request({
        value, subject: "3pl", animacy: "animate",
    })));
    const gross = [2, 3, 4].map(value => evaluate(request({
        value, countKind: "gross", subject: "3pl", animacy: "nonanimate",
    })));

    s.eq("the owner derives free, plural, and gross numeral shapes", {
        one: [one.authorizationStatus, one.operationFrame?.stem,
            one.formulaRealization, one.wordSurface],
        onePlural: [onePlural.operationFrame?.stem,
            onePlural.formulaRealization, onePlural.wordSurface],
        ordinaryPlural: ordinaryPlural.map(frame => [
            frame.operationFrame?.stem, frame.formulaRealization,
        ]),
        gross: gross.map(frame => [frame.operationFrame?.stem,
            frame.formulaRealization]),
    }, {
        one: ["authorized", "cē", "#0-0(cē)0-0#", "cē"],
        onePlural: ["cem", "#0-0(cem)m-eh#", "cemmeh"],
        ordinaryPlural: [
            ["ōme-n", "#0-0(ōme-n)t-in#"],
            ["ēi-n", "#0-0(ēi-n)t-in#"],
            ["nāhui-n", "#0-0(nāhui-n)t-in#"],
        ],
        gross: [
            ["ōme-x", "#0-0(ōme-x)t-in#"],
            ["ē-ix", "#0-0(ē-ix)t-in#"],
            ["nāhu-ix", "#0-0(nāhu-ix)t-in#"],
        ],
    });

    const embedded = [
        evaluate(vnc(1)),
        evaluate(vnc(2, "short")),
        evaluate(vnc(2, "full")),
        evaluate(vnc(3, "y-loss")),
        evaluate(vnc(3, "y-retained")),
        evaluate(vnc(3, "y-to-x")),
        evaluate(vnc(4)),
        evaluate(vnc(4, "", "āc")),
    ];
    s.eq("typed position and boundary derive every accepted embedded shape", {
        status: embedded.map(frame => frame.authorizationStatus),
        stems: embedded.map(frame => frame.sourceFrame?.numeralStem),
        examplesAuthorize: embedded.map(frame => frame.sourceFrame
            ?.numeralSourceAnalysisFrame?.examplesAuthorizeSourceOrRoute),
        sourceKinds: embedded.map(frame => frame.sourceFrame
            ?.numeralSourceAnalysisFrame?.sourceKind),
    }, {
        status: Array(8).fill("authorized"),
        stems: ["cem", "ōm", "ōme", "ē", "yē", "ēx", "nāuh", "nāhu"],
        examplesAuthorize: Array(8).fill(false),
        sourceKinds: ["nounstem", "pronominal-stem", "pronominal-stem",
            "pronominal-stem", "pronominal-stem", "pronominal-stem",
            "pronominal-stem", "pronominal-stem"],
    });

    const automaticClassifier = evaluate(request({
        value: 2,
        classifier: "",
        source: { compatibleClassifiers: ["rock"] },
    }));
    const classifierChoice = evaluate(request({
        value: 2,
        classifier: "row",
        source: { compatibleClassifiers: ["rock", "row"] },
    }));
    s.eq("counting sets are typed compatibility choices, never noun lists", {
        automatic: [automaticClassifier.authorizationStatus,
            automaticClassifier.operationFrame?.classifier,
            automaticClassifier.sourceFrame?.numeralSourceAnalysisFrame
                ?.classifierChoiceRequired],
        choice: [classifierChoice.authorizationStatus,
            classifierChoice.operationFrame?.classifier,
            classifierChoice.sourceFrame?.numeralSourceAnalysisFrame
                ?.classifierChoiceRequired],
    }, {
        automatic: ["authorized", "rock", false],
        choice: ["authorized", "row", true],
    });

    const contradictions = [
        evaluate(request({ value: 1, countKind: "gross", subject: "3pl" })),
        evaluate(request({ value: 2, countKind: "gross", subject: "3common" })),
        evaluate(request({ value: 2, subject: "3pl", animacy: "nonanimate" })),
        evaluate(vnc(2, "unlicensed")),
        evaluate(request({ value: 2, classifier: "thing",
            source: { compatibleClassifiers: ["rock", "row"] } })),
        evaluate({ ...request(), formula: "#forged#" }),
    ];
    s.eq("contradicting count, participant, variant, classifier, and formula facts block", {
        statuses: contradictions.map(frame => frame.authorizationStatus),
        reasons: contradictions.slice(0, 5).map(frame => frame.blockReason),
        poison: contradictions[5].blockReason?.startsWith(
            "caller-supplied-derived-authority-rejected:"),
    }, {
        statuses: Array(6).fill("blocked"),
        reasons: [
            "gross-count-requires-a-numeral-value-of-two-or-more",
            "gross-count-requires-plural-subject",
            "ordinary-nonanimate-count-requires-common-number-subject",
            "numeral-source-variant-not-licensed-for-position",
            "selected-counting-set-not-compatible-with-typed-referent",
        ],
        poison: true,
    });

    const cueFrames = [one, onePlural, ...ordinaryPlural, ...gross, ...embedded];
    const cues = cueFrames.flatMap(frame => (
        ctx.getClassicalFormulaDerivedAnnotations(
            frame.formulaRealization,
            frame.canonicalResult?.nncSlotFrame
                || frame.canonicalResult?.finalTypedVncSlotFrame,
            frame,
        )
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("all accepted atoms have exact writing and clickable-cue routes", {
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
    }, { records: 111, writing: 51, readingOnly: 60,
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
    s.ok("the existing cardinal path exposes only genuine Lesson 34 choices",
        shell.includes('value="vnc-embed"')
        && shell.includes('id="classical-cardinal-numeral-variant"')
        && rendering.includes("&& variants.length > 1")
        && !shell.includes('id="classical-cardinal-manual-ix"')
        && !shell.includes('id="classical-cardinal-manual-number-dyad"'));
    return s;
}

module.exports = { run };
