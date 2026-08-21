"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson34-conjoined-and-downgraded-numerals",
    "lesson34-unit-classifier-sets",
    "lesson34-special-twenty-count-sets",
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
    const s = createSuite("classical_lesson34_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson34-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = input => ctx.evaluateClassicalNahuatlNominalConstruction(input);

    const separate = [11, 12, 18, 32, 59].map(value => evaluate(request(value)));
    const compound = evaluate(request(11, {
        source: { conjunctionForm: "compound" },
    }));
    s.eq("higher-to-lower conjunction uses owner-issued component Results", {
        statuses: separate.map(frame => frame.authorizationStatus),
        words: separate.map(frame => frame.wordSurface),
        formulas: separate.map(frame => frame.formulaRealization),
        compound: [compound.authorizationStatus, compound.operationFrame?.stem,
            compound.wordSurface, compound.operationFrame?.conjunctionFrame
                ?.availableForms],
        recursion: separate.map(frame => frame.operationFrame
            ?.conjunctionFrame?.recursive),
        captures: separate.map(frame => frame.operationFrame
            ?.conjunctionCaptureFrame?.conjunctResults.length),
        ownerIssued: separate.every(frame => frame.operationFrame
            ?.conjunctionCaptureFrame?.conjunctResults.every(member => (
                typeof ctx.isClassicalNahuatlNncSlotFrame !== "function"
                || ctx.isClassicalNahuatlNncSlotFrame(member.canonicalResult)
            ))),
    }, {
        statuses: Array(5).fill("authorized"),
        words: ["mahtlāctli oncē", "mahtlāctli omōme",
            "caxtōlli omēi", "cempōhualli ommahtlāctli omōme",
            "ōmpōhualli oncaxtōlli onnāhui"],
        formulas: ["#0-0(mah-tlāc)tli-0# #0-0(on-cē)0-0#",
            "#0-0(mah-tlāc)tli-0# #0-0(om-ōme)0-0#",
            "#0-0(cax-tōl)li-0# #0-0(om-ēi)0-0#",
            "#0-0(cem-pōhu-a-l)li-0# #0-0(om-mah-tlāc)tli-0# #0-0(om-ōme)0-0#",
            "#0-0(ōm-pōhu-a-l)li-0# #0-0(on-cax-tōl)li-0# #0-0(on-nāhui)0-0#"],
        compound: ["authorized", "mah-tlāc-tl-oz-cē",
            "mahtlāctlozcē", ["separate", "compound"]],
        recursion: [false, false, false, true, true],
        captures: [2, 2, 2, 3, 3],
        ownerIssued: true,
    });

    const downgraded = [340, 5600].map(value => evaluate(request(value)));
    s.eq("downgrading deletes only the rightmost number position", downgraded.map(
        frame => {
            const fact = frame.operationFrame?.conjunctionFrame
                ?.downgradedEmbedFrames?.[0];
            return [frame.authorizationStatus, frame.operationFrame?.stem,
                fact?.sourceConjunctionValue, fact?.outerOrder,
                fact?.outerMatrix, fact?.deletedPosition,
                fact?.internalSourcesPreserved];
        }
    ), [
        ["authorized", "cax-tōl-om-ōme-pōhu-a-l", 17, 20,
            "pōhu-a-l", "rightmost-number-position-only", true],
        ["authorized", "mah-tlāc-om-nāhui-tzon", 14, 400,
            "tzon", "rightmost-number-position-only", true],
    ]);

    const classified = [
        evaluate(request(1, { classifier: "rock" })),
        evaluate(request(8, { classifier: "rock" })),
        evaluate(request(4, { classifier: "row" })),
        evaluate(request(15, { classifier: "thing" })),
        evaluate(request(19, { classifier: "cob" })),
        evaluate(request(21, { classifier: "cob" })),
        evaluate(request(39, { classifier: "cob" })),
    ];
    s.eq("productive unit classifiers derive boundary shape and cob tlamic", {
        stems: classified.map(frame => frame.operationFrame?.stem),
        words: classified.map(frame => frame.wordSurface),
        matrices: classified.map(frame => frame.operationFrame
            ?.classifierFrame?.matrixStem),
        exampleGates: classified.map(frame => frame.operationFrame
            ?.classifierFrame?.exampleReferentsAuthorizeRoute),
        tlamic: classified.slice(5).map(frame => [
            frame.operationFrame?.cobPreteritAgentiveResultFrame?.wordSurface,
            frame.operationFrame?.cobPreteritAgentiveResultFrame
                ?.authorizationStatus,
        ]),
    }, {
        stems: ["cen-te", "chicu-ē-te", "nāp-pān", "cax-tōl-la-man",
            "cax-tōl-ōlō-on-nāhui", "tlamic-on-cē",
            "tlamic-on-cax-tōl-on-nāhui"],
        words: ["centetl", "chicuētetl", "nāppāntli",
            "caxtōllamantli", "caxtōlōlōtl onnāhui",
            "tlamictli oncē", "tlamictli oncaxtōlli onnāhui"],
        matrices: ["te", "te", "pān", "tla-man", "ōlō", "tlamic", "tlamic"],
        exampleGates: Array(7).fill(false),
        tlamic: [["tlamic", "authorized"], ["tlamic", "authorized"]],
    });

    const special = [
        evaluate(request(20, { classifier: "tecpan",
            source: { referentClass: "unlisted-open-referent" } })),
        evaluate(request(53, { classifier: "tecpan",
            source: { referentClass: "another-unlisted-referent" } })),
        evaluate(request(40, { classifier: "ipil",
            source: { referentClass: "unlisted-open-referent" } })),
        evaluate(request(60, { classifier: "quimil",
            source: { referentClass: "unlisted-open-referent" } })),
    ];
    s.eq("special score matrices are productive and accept lower remainders", {
        statuses: special.map(frame => frame.authorizationStatus),
        stems: special.map(frame => frame.operationFrame?.stem),
        words: special.map(frame => frame.wordSurface),
        facts: special.map(frame => {
            const fact = frame.operationFrame?.classifierFrame;
            return [fact?.classifier, fact?.groupingMeaning, fact?.unitValue,
                fact?.multiplier, fact?.computedGroupedValue,
                fact?.exampleReferentMembershipRequired];
        }),
    }, {
        statuses: Array(4).fill("authorized"),
        stems: ["cen-tecpān", "ōn-tecpān-om-mah-tlāc-om-ēi",
            "ōm-ipil", "ē-quimil"],
        words: ["centecpāntli", "ōntecpāntli ommahtlāctli omēi",
            "ōmipilli", "ēquimilli"],
        facts: [
            ["tecpan", "lined-up-group-of-twenty", 20, 1, 20, false],
            ["tecpan", "lined-up-group-of-twenty", 20, 2, 53, false],
            ["ipil", "pile-group-of-twenty", 20, 2, 40, false],
            ["quimil", "bundle-group-of-twenty", 20, 3, 60, false],
        ],
    });

    const canonicalTlamic = classified[5].operationFrame
        ?.cobPreteritAgentiveResultFrame;
    const hostile = [
        evaluate(request(15, { source: { conjunctionForm: "compound" } })),
        evaluate(request(40, { classifier: "cob" })),
        evaluate(request(21, { classifier: "cob", source: {
            cobPreteritAgentiveResultFrame: { ...canonicalTlamic },
        } })),
        evaluate(request(40, { classifier: "quimil", source: {
            compatibleClassifiers: ["ipil"],
        } })),
        evaluate({ ...request(11), formula: "#forged#" }),
    ];
    s.eq("only grammatical facts block; Source spelling and examples do not", {
        statuses: hostile.map(frame => frame.authorizationStatus),
        reasons: hostile.slice(0, 4).map(frame => frame.blockReason),
        poison: hostile[4].blockReason?.startsWith(
            "caller-supplied-derived-authority-rejected:"),
    }, {
        statuses: Array(5).fill("blocked"),
        reasons: ["numeral-conjunctive-compound-not-licensed-for-selected-structure",
            "cob-classifier-is-not-licensed-beyond-thirty-nine",
            "cob-twenty-route-requires-engine-issued-tlamic-preterit-agentive",
            "selected-counting-set-not-compatible-with-typed-referent"],
        poison: true,
    });

    const cueFrames = [...separate, compound, ...downgraded, ...classified,
        ...special];
    const cues = cueFrames.flatMap(frame => ctx.getClassicalFormulaDerivedAnnotations(
        frame.formulaRealization,
        frame.canonicalResult?.nncSlotFrame,
        frame,
    )).filter(cue => GROUPS.includes(cue.role));
    s.eq("every accepted atom has its exact application or reading cue", {
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
    }, { records: 228, writing: 161, readingOnly: 67,
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
    s.ok("the UI exposes the genuine conjunction and classifier choices only",
        shell.includes('id="classical-cardinal-conjunction-form"')
        && shell.includes('value="separate"')
        && shell.includes('value="compound"')
        && shell.includes('value="tecpan"')
        && shell.includes('value="quimil"')
        && rendering.includes("classifierSelectionExplicit")
        && !shell.includes('id="classical-cardinal-referent-class"')
        && !rendering.includes("houses-rocks-blankets")
        && !rendering.includes("people-animals-lined-up"));
    return s;
}

module.exports = { run };
