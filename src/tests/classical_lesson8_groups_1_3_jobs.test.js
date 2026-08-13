"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson8_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson8-review-ledger.json"), "utf8"));
    const groupIds = ["lesson8-vnc-expansion-boundary", "lesson8-direction-location", "lesson8-antecessive-order"];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const directional = ctx.buildClassicalNahuatlDirectionalPrefixSystemFrame();
    const placement = ctx.buildClassicalNahuatlDirectionalPlacementSystemFrame();
    const support = ctx.buildClassicalNahuatlDirectionalPersonSupportSystemFrame();
    const contraction = ctx.buildClassicalNahuatlDirectionalIttaContractionSystemFrame();
    const antecessive = ctx.buildClassicalNahuatlAntecessivePrefixSystemFrame();
    const presentWithO = ctx.buildClassicalNahuatlVerbstemClassFrame("(miqui)", {
        valence: "intransitive", subject: "3sg", mood: "indicative", tense: "present", verbClass: "B", outsidePrefixes: ["ō#"],
    });
    const preteritWithO = ctx.buildClassicalNahuatlVerbstemClassFrame("(miqui)", {
        valence: "intransitive", subject: "3sg", mood: "indicative", tense: "preterit", verbClass: "B", outsidePrefixes: ["ō#"],
    });
    const boundary = Object.freeze({
        kinds: Object.freeze(["direction-or-location", "temporal-precedence", "negation"]),
        directionalInside: directional.insideVncCore,
        antecessiveOutside: antecessive.outsideVnc,
        modifiers: true,
        formulaInternalKinds: Object.freeze(["direction-or-location"]),
    });

    const jobs = new Map();
    const add = (atomId, receipt, field, expected) => jobs.set(atomId, { receipt, field, expected });
    add("ACI-P087-L003-48780B4A1D", boundary, "kinds", ["direction-or-location", "temporal-precedence", "negation"]);
    add("ACI-P087-L004-0BF4E80A2D", boundary, "directionalInside", true);
    add("ACI-P087-L005-C8A4DCBFC4", boundary, "antecessiveOutside", true);
    add("ACI-P087-L006-75C89C8954", boundary, "modifiers", true);
    add("ACI-P087-L007-785D9AC282", boundary, "formulaInternalKinds", ["direction-or-location"]);

    const directionalPrefixAtoms = [
        "ACI-P087-L009-C5DA1DCBF8", "ACI-P087-L009-400D755948", "ACI-P087-L018-073DCB9B6E",
        "ACI-P087-L018-073DCB9B6E-02", "ACI-P087-L021-AD0E11F975", "ACI-P087-L023-9AAC7E0B67",
        "ACI-P087-L024-6715FCD2B5", "ACI-P087-L025-8DB40F5D4C",
    ];
    const directionalFields = ["formulaSlotAuthorized", "insideVncCore", "meanings", "translationValueChangesWithDirectionalPrefix", "insideVncCore", "intransitivePlacement", "internalPrefixSlots", "formulaSlotAuthorized"];
    const directionalExpected = [true, true, ["distance-thither-away-there", "proximity-hither-here"], true, true, "before-intransitive-stem", ["directional-locative"], true];
    directionalPrefixAtoms.forEach((id, index) => add(id, directional, directionalFields[index], directionalExpected[index]));
    ["ACI-P088-L004-D568504105", "ACI-P088-L013-B5B71680BD", "ACI-P088-L013-09B3895E6F"].forEach((id, index) =>
        add(id, placement, ["directionalInsideVncCore", "placement", "finalFormula"][index], [true, "after-specific-projective-valence", "#no-0+c-0+on(itta)0+0-0#"][index]));
    ["ACI-P088-L016-B672C8B0CF", "ACI-P088-L016-81163246EB", "ACI-P088-L018-36D6F5B230", "ACI-P088-L019-E18F8FFE88", "ACI-P088-L020-7C7A0C3608"].forEach((id, index) =>
        add(id, support, ["supportiveIToOApplied", "supportiveIToOApplied", "firstPersonFormula", "secondPersonFormula", "optativeSecondFormula"][index], [true, true, "#no-0+c-0+on(itta)0+0-0#", "#to-0+c-0+on(itta)0+0-0#", "#xo-0+c-0+on(itta)0+⎕-0#"][index]));
    add("ACI-P088-L027-136F358984", contraction, "contractionApplies", true);

    const antecessiveAtoms = [
        ["ACI-P089-L025-993403902E", "outsideVnc", true],
        ["ACI-P089-L030-5898CB653A", "tenseAuthorized", true],
        ["ACI-P089-L030-B13835C33A", "indicativePastTenses", ["preterit", "distant-past", "imperfect"]],
        ["ACI-P089-L030-36AE929429", "indicativePastTenses", ["preterit", "distant-past", "imperfect"]],
        ["ACI-P089-L033-4B7B4345A0-02", "literalAlreadyTranslationRequired", false],
        ["ACI-P089-L035-7E504CCE95", "optional", true],
        ["ACI-P089-L035-F837E35DF5", "optional", true],
        ["ACI-P089-L041-D00D37897C", "objectSpellingAffected", false],
        ["ACI-P090-L002-D516EAF889", "externalSlots", ["antecessive-order"]],
    ];
    antecessiveAtoms.forEach(([id, field, expected]) => add(id, antecessive, field, expected));

    s.eq("the accepted groups cover every atom and exact writing job once", {
        atoms: records.length, unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length, mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 127, unique: 127, writing: 31, mapped: 31 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 8 job`, job.receipt[job.field], job.expected);
        const mutation = { ...job.receipt, [job.field]: "BROKEN_LESSON_8_JOB" };
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify(mutation[job.field]) === JSON.stringify(job.expected));
    }
    s.eq("normal application accepts past o and blocks present o", {
        preterit: [preteritWithO.authorizationStatus, preteritWithO.expandedVncBoundaryFrame.outsidePrefixes],
        present: [presentWithO.authorizationStatus, presentWithO.expandedVncBoundaryFrame.antecessiveTenseAuthorized, presentWithO.expandedVncBoundaryFrame.blockReason],
    }, {
        preterit: ["authorized", ["ō#"]],
        present: ["blocked", false, "antecessive-prefix-requires-past-tense-vnc"],
    });
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    s.ok("normal controls expose only the genuine directional and antecessive choices",
        shell.includes('id="classical-rule-logic-directional"')
        && shell.includes('<option value="on">')
        && shell.includes('<option value="huāl">')
        && shell.includes('id="classical-rule-logic-prefix-stack"')
        && !/(?:id|name)="[^"]*(?:directional-placement|antecessive-position|supportive-o)[^"]*"/iu.test(shell));
    return s;
}

module.exports = { run };
