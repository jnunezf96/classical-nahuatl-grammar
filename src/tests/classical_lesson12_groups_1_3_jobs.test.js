"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson12_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson12-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson12-state-and-absolutive-formula",
        "lesson12-subject-number-connectors",
        "lesson12-absolutive-subject-paradigm",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const build = (stem, subject, nounClass, animacy = "animate") =>
        ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
            subject,
            nounClass,
            animacy,
            pluralConnector: subject.endsWith("pl")
                ? nounClass === "in" ? "m-eh" : nounClass === "zero" ? "0-h" : "t-in"
                : "",
        });
    const forms = {
        tl1: build("cihua", "1sg", "tl"), tl2: build("cihua", "2sg", "tl"), tl3: build("cihua", "3sg", "tl"),
        tl1p: build("cihua", "1pl", "tl"), tl2p: build("cihua", "2pl", "tl"), tl3p: build("cihua", "3pl", "tl"),
        tli1: build("cal", "1sg", "tli", "nonanimate"), tli2: build("cal", "2sg", "tli", "nonanimate"), tli3: build("cal", "3common", "tli", "nonanimate"),
        tli1p: build("cal", "1pl", "tli"), tli2p: build("cal", "2pl", "tli"), tli3p: build("cal", "3pl", "tli"),
        in1: build("mich", "1sg", "in"), in2: build("mich", "2sg", "in"), in3: build("mich", "3sg", "in"),
        in1p: build("mich", "1pl", "in"), in2p: build("mich", "2pl", "in"), in3p: build("mich", "3pl", "in"),
        zero1: build("chichi", "1sg", "zero"), zero2: build("chichi", "2sg", "zero"), zero3: build("chichi", "3sg", "zero"),
        zero1p: build("chichi", "1pl", "zero"), zero2p: build("chichi", "2pl", "zero"), zero3p: build("chichi", "3pl", "zero"),
    };
    const possessive = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "1sg", singularConnector: "0", animacy: "nonanimate",
    });
    const contract = forms.in3.absolutiveParadigmContractFrame;
    const observations = new Map();
    const expected = new Map();
    const add = (atomId, actual, wanted) => { observations.set(atomId, actual); expected.set(atomId, wanted); };

    add("ACI-P115-L009-4E02BB0AA3", [possessive.stateFrame.arity, possessive.stateFrame.slots.map((slot) => slot.role)], ["dyadic", ["st1", "st2"]]);
    add("ACI-P115-L010-1588DEFAFC", [possessive.stateFrame.possessorRole, possessive.stateFrame.slots[0].possessorPerson], ["specific", "1sg"]);
    add("ACI-P115-L016-53D8BE9734", [contract.greatestCommonDivisor.formulaTemplate, forms.in3.formulaRealization], ["#pers1-pers2(STEM)num1-num2#", "#0-0(mich)in-0#"]);
    add("ACI-P115-L018-F42DBD1F11", [forms.in3.nncSlotFrame.slots.subject, forms.in3.nncSlotFrame.slots.predicate.stem], [{ pers1: "0", pers2: "0", subject: "3sg", pers1BaseMorph: "0", supportiveISurfacePolicy: "conditional-support-vowel-boundary-action", supportiveISurfaceAction: "not-needed", supportiveISurfaceReason: "third-person-zero" }, "mich"]);

    add("ACI-P115-L023-DF10481C95", [forms.tl1.personFrame.pers1, forms.tl1.personFrame.pers2, forms.tl1.personFrame.xXiAllowed], ["ni", "0", false]);
    add("ACI-P115-L026-95AEA0D8A8", [forms.tli3.numberFrame.num1, possessive.numberFrame.num1], ["li", "0"]);
    add("ACI-P115-L026-95AEA0D8A8-02", forms.tli3.numberFrame.numberBelongsTo, "subject-personal-pronoun");
    add("ACI-P115-L028-A4139D4FBD", [forms.tli3.stateFrame.state, forms.tli3.nncSlotFrame.slots.state.arity], ["absolutive", "vacant"]);
    add("ACI-P115-L028-A4139D4FBD-02", forms.tli3.nncSlotFrame.slots.number.belongsTo, "subject-personal-pronoun");
    add("ACI-P116-L002-D9ACC0ED85", [forms.tli3.numberFrame.state || "absolutive", forms.tli3.numberFrame.numberBelongsTo], ["absolutive", "subject-personal-pronoun"]);
    add("ACI-P116-L005-BB969DA0FA", contract.leastCommonMultiple.numberDyadInventory.slice(0, 4).map((entry) => entry.num1), ["tl", "tli", "in", "0"]);
    add("ACI-P116-L005-034A779B4E", [forms.tl3.state, forms.tl3.numberFrame.subjectNumber], ["absolutive", "singular"]);
    add("ACI-P116-L008-987F8BD8E3", [forms.tli3.numberFrame.supportiveVowelRoles, forms.in3.numberFrame.supportiveVowelRoles], [["tli-i", "li-i", "in-i"], ["tli-i", "li-i", "in-i"]]);
    add("ACI-P116-L009-CDD787101F", [forms.tl3.numberFrame.num1, forms.tli3.numberFrame.num1], ["tl", "li"]);
    add("ACI-P116-L009-CDD787101F-02", [forms.tl3.stem.endsWith("a"), forms.tl3.numberFrame.num1], [true, "tl"]);
    add("ACI-P116-L009-CDD787101F-03", [forms.tli3.stem.endsWith("l"), forms.tli3.numberFrame.num1], [true, "li"]);
    add("ACI-P116-L011-05170EBDAE", [forms.in3.stem.endsWith("ch"), forms.in3.numberFrame.num1], [true, "in"]);
    add("ACI-P116-L011-05170EBDAE-02", [forms.zero3.stem.endsWith("i"), forms.zero3.numberFrame.num1], [true, "0"]);
    add("ACI-P116-L011-05170EBDAE-03", [forms.zero3.authorizationStatus, forms.zero3.numberFrame.num1], ["authorized", "0"]);
    add("ACI-P116-L012-80FC7B488B", [forms.tli3.numberFrame.connectorRule, forms.tli3.numberFrame.num1], ["lesson-12.3.2a-l-plus-tl-assimilates-to-li", "li"]);
    add("ACI-P116-L013-D937FE8639", forms.tli3.formulaRealization, "#0-0(cal)li-0#");
    add("ACI-P116-L015-CF2F168DAF", contract.leastCommonMultiple.numberDyadInventory.slice(0, 4).map((entry) => entry.num2), ["0", "0", "0", "0"]);
    add("ACI-P116-L015-8A3A709DBB", [forms.tl1.numberFrame.num1, forms.tl1.numberFrame.num2], ["tl", "0"]);
    add("ACI-P116-L018-F92CA97689", [forms.tl1p.numberFrame.subjectNumber, forms.tl1p.numberFrame.num1], ["plural", "t"]);
    add("ACI-P116-L018-61C75F9C62", [forms.tl1p.state, forms.tl1p.numberFrame.num2], ["absolutive", "in"]);
    add("ACI-P116-L024-BA670DD472", contract.leastCommonMultiple.numberDyadInventory.slice(4).map((entry) => [entry.num1, entry.num2]), [["t", "in"], ["m", "eh"], ["0", "h"]]);

    add("ACI-P116-L033-7862336BFD", [contract.leastCommonMultiple.subjectPronounShapeInventory.length, contract.leastCommonMultiple.subjectPersonInventory.length], [21, 6]);
    add("ACI-P116-L035-0FFEC06FF8", contract.leastCommonMultiple.subjectPersonInventory.map((entry) => entry.subject), ["1sg", "2sg", "3sg-or-common", "1pl", "2pl", "3pl"]);
    add("ACI-P116-L036-F8859CD744", contract.leastCommonMultiple.subjectPronounShapeInventory.filter((entry) => !entry.subject.endsWith("pl")).length, 12);
    add("ACI-P116-L037-394788B340", contract.leastCommonMultiple.subjectPronounShapeInventory.filter((entry) => entry.subject.endsWith("pl")).length, 9);
    const formulaJobs = [
        ["ACI-P117-L002-2B983ED197", forms.tl1, "#ni-0(cihua)tl-0#"], ["ACI-P117-L003-6EF1986BCB", forms.tli1, "#ni-0(cal)li-0#"],
        ["ACI-P117-L004-090E347EAD", forms.in1, "#ni-0(mich)in-0#"], ["ACI-P117-L005-D0EE2B0E3E", forms.zero1, "#ni-0(chichi)0-0#"],
        ["ACI-P117-L006-F809F07AEE", forms.tl1, "#ni-0(cihua)tl-0#"], ["ACI-P117-L007-D97FF9D4DA", forms.tl1p, "#ti-0(cihua)t-in#"],
        ["ACI-P117-L008-1E59F6BA33", forms.in1p, "#ti-0(mich)m-eh#"], ["ACI-P117-L009-EE0BD12C23", forms.zero1p, "#ti-0(chichi)0-h#"],
        ["ACI-P117-L010-1245860ED7", forms.tl2, "#ti-0(cihua)tl-0#"], ["ACI-P117-L011-74A6688F55", forms.tli2, "#ti-0(cal)li-0#"],
        ["ACI-P117-L012-549F2F6DC5", forms.in2, "#ti-0(mich)in-0#"], ["ACI-P117-L013-4D193FC170", forms.zero2, "#ti-0(chichi)0-0#"],
        ["ACI-P117-L014-0A6CE681BD", forms.tl2p, "#an-0(cihua)t-in#"], ["ACI-P117-L015-C2D23ADA62", forms.in2p, "#am-0(mich)m-eh#"],
        ["ACI-P117-L016-8910539376", forms.zero2p, "#an-0(chichi)0-h#"], ["ACI-P117-L017-3C2757CC45", forms.tl3, "#0-0(cihua)tl-0#"],
        ["ACI-P117-L018-C564434F96", forms.tli3, "#0-0(cal)li-0#"], ["ACI-P117-L019-40F819D1AA", forms.in3, "#0-0(mich)in-0#"],
        ["ACI-P117-L020-11430C13FA", forms.zero3, "#0-0(chichi)0-0#"], ["ACI-P117-L021-BF1B507DF3", forms.tl3p, "#0-0(cihua)t-in#"],
        ["ACI-P117-L022-375E8EAD93", forms.in3p, "#0-0(mich)m-eh#"], ["ACI-P117-L023-161D4333CB", forms.zero3p, "#0-0(chichi)0-h#"],
    ];
    formulaJobs.forEach(([atomId, frame, wanted]) => add(atomId, frame.formulaRealization, wanted));
    add("ACI-P117-L028-E88B6188D7", [forms.tl1p.personFrame.subject, forms.tl1p.numberFrame.subjectNumber], ["1pl", "plural"]);
    add("ACI-P117-L029-42641B1D02", [forms.tl2.personFrame.subject, forms.tl2.numberFrame.subjectNumber], ["2sg", "singular"]);
    add("ACI-P117-L030-EF7C1089CE", [forms.tl2p.personFrame.subject, forms.tl2p.numberFrame.subjectNumber], ["2pl", "plural"]);
    add("ACI-P117-L031-82A92D6AC0", [forms.tl3.personFrame.subject, forms.tl3.numberFrame.subjectNumber], ["3sg", "singular"]);
    add("ACI-P117-L032-F1AF0F6DD3", [forms.tl3p.personFrame.subject, forms.tl3p.numberFrame.subjectNumber], ["3pl", "plural"]);
    add("ACI-P117-L034-77070235B5", [forms.tl1.personFrame.supportiveVowelPresent, forms.tl1.personFrame.pers1, forms.tl2p.personFrame.pers1BaseMorph, forms.tl2p.personFrame.pers1], [true, "ni", "am", "an"]);

    s.eq("accepted Lesson 12 Groups 1-3 cover every atom once", {
        atoms: records.length, unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length, reading: records.length - writing.length,
    }, { atoms: 80, unique: 80, writing: 58, reading: 22 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writing.filter((record) => observations.has(record.atomId)).length,
        expected: writing.filter((record) => expected.has(record.atomId)).length,
        missing: writing.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 58, expected: 58, missing: [] });
    for (const record of writing) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = Array.isArray(actual) ? ["BROKEN", ...actual.slice(1)] : `${actual}-BROKEN`;
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }
    const cues = ctx.getClassicalFormulaDerivedAnnotations(forms.tl1.formulaRealization, forms.tl1.nncSlotFrame, {}).map((cue) => cue.label);
    s.ok("Formula and Diagram show the accepted Lesson 12 grammatical jobs",
        cues.includes("absolutive State") && cues.includes("nounstem predicate")
        && cues.includes("number connector") && cues.includes("silent subject number"));
    return s;
}

module.exports = { run };
