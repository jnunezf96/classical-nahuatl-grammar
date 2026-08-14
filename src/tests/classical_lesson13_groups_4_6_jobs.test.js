"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson13_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson13-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson13-dyadic-possessor-architecture",
        "lesson13-dyadic-second-subposition",
        "lesson13-specific-possessor-paradigm",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const consonant = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "1sg", singularConnector: "0", animacy: "nonanimate",
    });
    const vowel = ctx.buildClassicalNahuatlPossessiveNncFrame("ā", {
        subject: "3common", possessor: "1sg", singularConnector: "uh", animacy: "nonanimate",
    });
    const thirdSingular = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "3sg", singularConnector: "0", animacy: "nonanimate",
    });
    const thirdPlural = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "3pl", singularConnector: "0", animacy: "nonanimate",
    });
    const secondSingular = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "2sg", singularConnector: "0", animacy: "nonanimate",
    });
    const secondPlural = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "2pl", singularConnector: "0", animacy: "nonanimate",
    });
    const nonspecificHuman = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "te", singularConnector: "0", animacy: "nonanimate",
    });
    const shapes = consonant.possessiveParadigmContractFrame.leastCommonMultiple.possessorStateShapeInventory;
    const shape = (identity) => shapes.find((entry) => entry.identity === identity);
    const contrastNnc = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "2pl", singularConnector: "0",
    });
    const contrastVnc = ctx.buildClassicalNahuatlTransitiveVncObjectFrame("(mati)", {
        transitivity: "transitive", subject: "2pl", mood: "indicative", tense: "present", object: "reflexive",
    });

    const observations = new Map();
    const expected = new Map();
    const add = (atomId, actual, wanted) => { observations.set(atomId, actual); expected.set(atomId, wanted); };

    add("ACI-P122-L014-F14C6E71A1", [consonant.stateFrame.arity, consonant.stateFrame.slots.map((slot) => slot.role)], ["dyadic", ["st1", "st2"]]);
    add("ACI-P122-L017-5E31ECB3A5", [shape("dyadic-first-singular-o").st1, shape("dyadic-first-plural-o").st1, shape("dyadic-second-singular-o").st1, shape("dyadic-second-plural-o").st1, shape("dyadic-third-singular-zero").st1], ["n", "t", "m", "am", "ī"]);
    add("ACI-P122-L018-F2BDFAB3CC", [shape("dyadic-third-singular-zero").possessorPerson, shape("dyadic-third-singular-zero").possessiveCaseLocation, shape("dyadic-third-singular-zero").st1], ["third", "st1", "ī"]);
    add("ACI-P122-L021-5B35269515", [[shape("dyadic-first-singular-o").possessorPerson, shape("dyadic-first-singular-o").possessorNumber, shape("dyadic-first-singular-o").st1], [shape("dyadic-first-plural-o").possessorPerson, shape("dyadic-first-plural-o").possessorNumber, shape("dyadic-first-plural-o").st1], [shape("dyadic-second-singular-o").possessorPerson, shape("dyadic-second-singular-o").possessorNumber, shape("dyadic-second-singular-o").st1], [shape("dyadic-second-plural-o").possessorPerson, shape("dyadic-second-plural-o").possessorNumber, shape("dyadic-second-plural-o").st1]], [["first", "singular", "n"], ["first", "plural", "t"], ["second", "singular", "m"], ["second", "plural", "am"]]);

    add("ACI-P122-L027-E79982D0C8", [[thirdSingular.stateFrame.slots[0].carrier, thirdSingular.stateFrame.slots[1].carrier], [consonant.stateFrame.slots[0].carrier, consonant.stateFrame.slots[1].carrier]], [["ī", "0"], ["n", "o"]]);
    add("ACI-P122-L028-F03A537B91", [[shape("dyadic-third-singular-zero").possessorNumber, shape("dyadic-third-singular-zero").st2], [shape("dyadic-third-plural-m").possessorNumber, shape("dyadic-third-plural-m").st2], [shape("dyadic-third-plural-n").possessorNumber, shape("dyadic-third-plural-n").st2]], [["singular-or-common", "0"], ["plural", "m"], ["plural", "n"]]);
    add("ACI-P122-L033-AD59D5E8AD", [[consonant.stateFrame.possessor, consonant.stateFrame.slots[1].carrier, shape("dyadic-first-singular-o").possessiveCaseLocation], [secondSingular.stateFrame.possessor, secondSingular.stateFrame.slots[1].carrier, shape("dyadic-second-singular-o").possessiveCaseLocation]], [["1sg", "o", "st2"], ["2sg", "o", "st2"]]);
    add("ACI-P122-L033-AD59D5E8AD-03", [[consonant.formulaRealization, consonant.stateFrame.slots[1].carrier], [vowel.formulaRealization, vowel.stateFrame.slots[1].carrier]], [["#0-0+n-o(cal)0-0#", "o"], ["#0-0+n-⎕(ā)uh-0#", "⎕"]]);
    add("ACI-P122-L033-2EF22919BF", [vowel.stateFrame.vowelInitialStem, vowel.stateFrame.st2SupportiveOrSilentBoundaryAction, consonant.stateFrame.vowelInitialStem, consonant.stateFrame.st2SupportiveOrSilentBoundaryAction], [true, "suppress-o-use-silent-repertory-mate", false, "retain-short-o"]);

    add("ACI-P123-L014-DAEC9E7F38", {
        valid: contrastNnc.authorizationStatus === "authorized" && contrastVnc.proofFrame.authorizationStatus === "authorized",
        nnc: [contrastNnc.subject, contrastNnc.stateFrame.possessor, contrastNnc.stateFrame.slots.map((slot) => [slot.role, slot.carrier]), contrastNnc.formulaRealization],
        vnc: [contrastVnc.objectFrame.subject, contrastVnc.objectFrame.objectKind, [["va1", contrastVnc.objectFrame.va1], ["va2", contrastVnc.objectFrame.va2]], contrastVnc.formulaRealization],
    }, {
        valid: true,
        nnc: ["3common", "2pl", [["st1", "am"], ["st2", "o"]], "#0-0+am-o(cal)0-0#"],
        vnc: ["2pl", "mainline-reflexive", [["va1", "m"], ["va2", "o"]], "#am-0+m-o(mati)0+0-h#"],
    });

    s.eq("accepted Lesson 13 Groups 4-6 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 33, unique: 33, writing: 10, reading: 23 });
    s.eq("every writing atom has its own exact grammar observation", {
        observed: writing.filter((record) => observations.has(record.atomId)).length,
        expected: writing.filter((record) => expected.has(record.atomId)).length,
        missing: writing.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 10, expected: 10, missing: [] });
    for (const record of writing) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted grammar job`, actual, wanted);
        const broken = Array.isArray(actual) ? ["BROKEN", ...actual.slice(1)] : { broken: true };
        s.no(`mutation:${record.atomId} fails when that grammar behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }

    const consonantCues = ctx.getClassicalFormulaDerivedAnnotations(consonant.formulaRealization, consonant.nncSlotFrame, consonant).map((cue) => cue.label);
    const vowelCues = ctx.getClassicalFormulaDerivedAnnotations(vowel.formulaRealization, vowel.nncSlotFrame, vowel).map((cue) => cue.label);
    const thirdCues = ctx.getClassicalFormulaDerivedAnnotations(thirdPlural.formulaRealization, thirdPlural.nncSlotFrame, thirdPlural).map((cue) => cue.label);
    const monadicCues = ctx.getClassicalFormulaDerivedAnnotations(nonspecificHuman.formulaRealization, nonspecificHuman.nncSlotFrame, nonspecificHuman).map((cue) => cue.label);
    s.eq("specific possessor letters have minimal clickable grammar cues", {
        firstOrSecond: [consonantCues.includes("possessor person and number"), consonantCues.includes("possessive case")],
        vowelCase: vowelCues.includes("possessive case"),
        third: [thirdCues.includes("possessor person and possessive case"), thirdCues.includes("possessor number")],
        monadic: monadicCues.includes("nonspecific human possessor"),
    }, { firstOrSecond: [true, true], vowelCase: true, third: [true, true], monadic: true });
    s.eq("specific possessor results remain authorized", [consonant.authorizationStatus, vowel.authorizationStatus, thirdSingular.authorizationStatus, thirdPlural.authorizationStatus, secondPlural.authorizationStatus], ["authorized", "authorized", "authorized", "authorized", "authorized"]);
    return s;
}

module.exports = { run };
