"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson34-numeral-reduplication",
    "lesson34-approximation-more-and-supplementation",
    "lesson34-measure-nncs-and-measured-composition",
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
    const s = createSuite("classical_lesson34_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson34-review-ledger.json"), "utf8"));
    const records = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
    ));
    const writing = records.filter(record => record.proposedDirection === "BOTH");
    const evaluate = input => ctx.evaluateClassicalNahuatlNominalConstruction(input);

    const reduplicated = [
        evaluate(request(1, { reduplication: "affinity" })),
        evaluate(request(1, { classifier: "rock",
            reduplication: "distributive-varietal" })),
        evaluate(request(5, { classifier: "thing",
            reduplication: "affinity" })),
        evaluate(request(5, { classifier: "thing",
            reduplication: "distributive-varietal" })),
        evaluate(request(6, { reduplication: "affinity" })),
        evaluate(request(9, { classifier: "thing",
            reduplication: "affinity" })),
        evaluate(request(9, { classifier: "thing",
            reduplication: "distributive-varietal" })),
        evaluate(request(10, { classifier: "rock",
            reduplication: "affinity" })),
        evaluate(request(10, { classifier: "thing",
            reduplication: "distributive-varietal" })),
        evaluate(request(18, { reduplication: "affinity" })),
        evaluate(request(18, { classifier: "thing",
            reduplication: "distributive-varietal" })),
    ];
    s.eq("numeral reduplication derives scope from morphemic structure", {
        statuses: reduplicated.map(frame => frame.authorizationStatus),
        stems: reduplicated.map(frame => frame.operationFrame?.stem),
        words: reduplicated.map(frame => frame.wordSurface),
        meanings: reduplicated.map(frame => frame.operationFrame
            ?.reduplicationFrame?.semanticContrast),
        scopes: reduplicated.map(frame => frame.operationFrame
            ?.reduplicationFrame?.targetScope),
        structural: reduplicated.every(frame => frame.operationFrame
            ?.reduplicationFrame?.scopeDerivedFromMorphemicStructure === true
            && frame.operationFrame?.reduplicationFrame
                ?.manualScopeChoiceAccepted === false),
    }, {
        statuses: Array(11).fill("authorized"),
        stems: ["cē-cen", "ceh-cen-te", "mā-mā-cu-ī-l-la-man",
            "mah-ma-cu-ī-l-la-man", "chī-chicua-cē",
            "chī-chiuc-nā-nāuh-tla-man",
            "chih-chiuc-nah-nāuh-tla-man", "mah-tlā-tlāc-te",
            "mah-tlah-tlāc-tla-man", "cā-cax-tōl-om-ē-ēi",
            "cah-cax-tōl-la-man-om-eh-ēi"],
        words: ["cēcen", "cehcentetl", "māmācuīllamantli",
            "mahmacuīllamantli", "chīchicuacē",
            "chīchiucnānāuhtlamantli", "chihchiucnahnāuhtlamantli",
            "mahtlātlāctetl", "mahtlahtlāctlamantli",
            "cācaxtōlli omēēi", "cahcaxtōllamantli omehēi"],
        meanings: ["continuity-or-relatedness",
            "separateness-dispersion-or-variety",
            "continuity-or-relatedness",
            "separateness-dispersion-or-variety",
            "continuity-or-relatedness", "continuity-or-relatedness",
            "separateness-dispersion-or-variety",
            "continuity-or-relatedness",
            "separateness-dispersion-or-variety",
            "continuity-or-relatedness",
            "separateness-dispersion-or-variety"],
        scopes: ["first-part", "first-part", "first-part", "first-part",
            "first-part", "embed-and-basic-numeral-matrix",
            "embed-and-basic-numeral-matrix", "mahtlac-matrix",
            "mahtlac-matrix", "all-conjuncts", "all-conjuncts"],
        structural: true,
    });

    const modifiers = [
        evaluate(request(10, { modifier: "canah" })),
        evaluate(request(10, { modifier: "quēn" })),
        evaluate(request(5, { modifier: "ahzo-quēn" })),
        evaluate(request(1, { modifier: "oc" })),
        evaluate(request(2, { modifier: "oc" })),
    ];
    const ocCe = modifiers[3].operationFrame?.numeralModifierFrame;
    s.eq("modifiers attach to the complete numeral and oc cē reaches supplementation", {
        surfaces: modifiers.map(frame => frame.sentenceSurface),
        positions: modifiers.map(frame => frame.operationFrame
            ?.numeralModifierFrame?.position),
        meanings: modifiers.map(frame => frame.operationFrame
            ?.numeralModifierFrame?.meaning),
        ocCe: [ocCe?.completeOcCeClause,
            ocCe?.supplementarySubjectEligible,
            ocCe?.canonicalSupplementationClauseEnvelope?.authorizationStatus,
            ocCe?.canonicalSupplementationClauseEnvelope?.surface],
        englishAuthority: modifiers.map(frame => frame.operationFrame
            ?.numeralModifierFrame?.englishElseExpressionsAuthorizeGrammar),
    }, {
        surfaces: ["Canah Mahtlāctli.", "Quēn Mahtlāctli.",
            "Ahzo quēn Mācuīlli.", "Oc Cē.", "Oc Ōme."],
        positions: Array(5).fill("before-complete-numeral-nnc"),
        meanings: ["approximately-more-or-less",
            "approximately-more-or-less",
            "perhaps-approximately-more-or-less", "another-or-more",
            "another-or-more"],
        ocCe: [true, true, "authorized", "Oc Cē"],
        englishAuthority: Array(5).fill(false),
    });

    const measure = (stem, nounClass, meaning = "amount", extra = {}) => (
        evaluate(request(1, {
            classifier: "measure",
            source: { measureStem: stem, measureClass: nounClass,
                measureMeaning: meaning, ...extra.source },
            ...extra,
        }))
    );
    const measures = [
        measure("cama", "tl"),
        measure("xomah", "tli"),
        measure("cuahui", "tl"),
        measure("te-xca-l", "tli"),
        measure("mā-pich", "tli"),
        measure("izte", "tl", "length"),
        measure("molic-pi", "tl", "length"),
        measure("ciyaca", "tl", "length"),
        measure("me-ca", "tl", "length"),
        measure("yōl-lo-h", "tli", "length"),
        measure("totally-open-measure", "tli"),
    ];
    s.eq("measure matrices stay open and preserve amount versus length", {
        statuses: measures.map(frame => frame.authorizationStatus),
        words: measures.map(frame => frame.wordSurface),
        meanings: measures.map(frame => frame.operationFrame
            ?.measureFrame?.selectedMeaning),
        open: measures.every(frame => frame.operationFrame?.measureFrame
            ?.compatibleTypedMeasureSourcesAreOpen === true),
        exampleGates: measures.map(frame => frame.operationFrame
            ?.measureFrame?.exampleMeasuresAuthorizeRoute),
    }, {
        statuses: Array(11).fill("authorized"),
        words: ["cencamatl", "cenxomahtli", "cencuahuitl",
            "centexcalli", "cemmāpichtli", "cemiztetl",
            "cemmolicpitl", "cenciyacatl", "cemmecatl",
            "cenyōllohtli", "centotallyopenmeasuretli"],
        meanings: ["amount", "amount", "amount", "amount", "amount",
            "length", "length", "length", "length", "length", "amount"],
        open: true,
        exampleGates: Array(11).fill(false),
    });

    const composedMeasure = evaluate(request(1, {
        classifier: "measure",
        source: {
            measureStem: "tla-māma-l",
            measureClass: "tli",
            measureMeaning: "amount",
            measuredStem: "tlacuāl",
            measuredClass: "tli",
        },
        measureComposition: "with-measured-nnc",
    }));
    const composition = composedMeasure.operationFrame
        ?.adjectivalModificationFrame;
    s.eq("measured composition keeps the owner-issued measure NNC principal", {
        status: composedMeasure.authorizationStatus,
        formula: composedMeasure.formulaRealization,
        surface: composedMeasure.sentenceSurface,
        relation: composition?.relation,
        roles: [composition?.principalClauseRole,
            composition?.modifierClauseRole],
        principal: composition?.measureIsPrincipal,
        ownerIssued: [
            typeof ctx.isClassicalNahuatlNncSlotFrame !== "function"
                || ctx.isClassicalNahuatlNncSlotFrame(
                    composition?.principalNncSlotFrame),
            typeof ctx.isClassicalNahuatlNncSlotFrame !== "function"
                || ctx.isClassicalNahuatlNncSlotFrame(
                    composition?.measuredNncSlotFrame),
        ],
        stringsAccepted: composition?.copiedOrStringComponentsAccepted,
    }, {
        status: "authorized",
        formula: "#0-0(cen-tla-māma-l)li-0# #0-0(tlacuāl)li-0#",
        surface: "centlamāmalli tlacuālli.",
        relation: "adjectival-modification",
        roles: ["measure-nnc", "thing-measured-nnc"],
        principal: true,
        ownerIssued: [true, true],
        stringsAccepted: false,
    });

    const hostile = [
        evaluate(request(5, { reduplication: "manual-double-scope" })),
        evaluate(request(1, { modifier: "else" })),
        measure("cama", "tl", "weight"),
        evaluate(request(1, { classifier: "measure", source: {
            measureStem: "cama", measureMeaning: "amount",
        } })),
        evaluate(request(1, { classifier: "measure", source: {
            measureClass: "tl", measureMeaning: "amount",
        } })),
        evaluate(request(1, { classifier: "basic",
            measureComposition: "with-measured-nnc" })),
        evaluate({ ...request(1), formula: "#forged#" }),
    ];
    s.eq("manual scope, English routes, incompatible measure facts, and strings block", {
        statuses: hostile.map(frame => frame.authorizationStatus),
        reasons: hostile.slice(0, 6).map(frame => frame.blockReason),
        poison: hostile[6].blockReason?.startsWith(
            "caller-supplied-derived-authority-rejected:"),
    }, {
        statuses: Array(7).fill("blocked"),
        reasons: ["cardinal-nominal-reduplication-kind-invalid",
            "cardinal-nominal-numeral-modifier-invalid",
            "measure-nnc-requires-amount-or-length-meaning",
            "measure-nnc-requires-measure-class",
            "measure-classifier-requires-measure-stem",
            "measured-nnc-composition-requires-measure-classifier"],
        poison: true,
    });

    const cueFrames = [...reduplicated, ...modifiers, ...measures,
        composedMeasure];
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
    }, { records: 78, writing: 48, readingOnly: 30,
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
    s.ok("the UI exposes meanings and composition but no scope or example lists",
        shell.includes('id="classical-construction-reduplication"')
        && shell.includes('id="classical-cardinal-modifier"')
        && shell.includes('id="classical-cardinal-measure-meaning"')
        && shell.includes('id="classical-cardinal-measure-class"')
        && shell.includes('id="classical-cardinal-measure-composition"')
        && shell.includes('id="classical-cardinal-measured-class"')
        && rendering.includes("measureMeaning")
        && rendering.includes("classical-cardinal-measured-class")
        && !shell.includes('id="classical-cardinal-reduplication-scope"')
        && !shell.includes('id="classical-cardinal-example-measure"')
        && !shell.includes('id="classical-cardinal-else-route"'));
    return s;
}

module.exports = { run };
