"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson13_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson13-review-ledger.json"), "utf8"));
    const groupIds = [
        "lesson13-possessive-formula-foundation",
        "lesson13-possessive-subject-paradigm",
        "lesson13-monadic-possessors",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const monadic = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "te", singularConnector: "0", animacy: "nonanimate",
    });
    const dyadic = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "1sg", singularConnector: "0", animacy: "nonanimate",
    });
    const monadicDiagram = ctx.buildClassicalNahuatlNncDiagrammaticFrame(monadic.nncSlotFrame);
    const dyadicDiagram = ctx.buildClassicalNahuatlNncDiagrammaticFrame(dyadic.nncSlotFrame);
    const lcm = dyadic.possessiveParadigmContractFrame.leastCommonMultiple;
    const dyads = Object.fromEntries(lcm.numberDyadInventory.map((entry) => [entry.identity, entry]));
    const shapes = Object.fromEntries(lcm.subjectPronounShapeInventory.map((entry) => [entry.identity, entry]));
    const shape = (subject, dyad) => {
        const value = shapes[`${subject}:${dyad}`];
        return [value.pers1, value.pers2, value.num1, value.num2];
    };

    const reciprocalAllowed = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3sg", possessor: "ne", singularConnector: "0",
    });
    const reciprocalBlocked = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "1sg", possessor: "ne", singularConnector: "0",
    });
    const human = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "te", singularConnector: "0",
    });
    const relationalSource = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("nacaz", {
        selectedState: "possessive",
        possessorCompatibility: "relational-tla",
        policySelectionAuthority: "user-supplied-lexical-analysis",
    });
    const nonhumanAllowed = ctx.buildClassicalNahuatlPossessiveNncFrame("nacaz", {
        subject: "3common", possessor: "tla", singularConnector: "0",
        nncSourceAuthorityFrame: relationalSource,
    });
    const nonhumanBlocked = ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
        subject: "3common", possessor: "tla", singularConnector: "0",
    });

    const observations = new Map();
    const expected = new Map();
    const add = (atomId, actual, wanted) => { observations.set(atomId, actual); expected.set(atomId, wanted); };

    add("ACI-P120-L009-F47C813B36", [monadic.stateFrame.arity, monadic.formulaTemplate, monadic.formulaRealization], ["monadic", "#pers1-pers2+st(STEM)num1-num2#", "#0-0+tē(cal)0-0#"]);
    add("ACI-P120-L012-4C37479982", `${monadicDiagram.generalRows[0].expression} ${monadicDiagram.generalRows[0].role}`, "#pers¹-pers²+ ... )num¹-num²# Subject");
    add("ACI-P120-L013-FF3596CBA6", `${monadicDiagram.generalRows[1].expression} ${monadicDiagram.generalRows[1].role}`, "+st(STEM) Predicate");
    add("ACI-P120-L015-C870F1D284", [dyadic.stateFrame.arity, dyadic.formulaTemplate, dyadic.formulaRealization], ["dyadic", "#pers1-pers2+st1-st2(STEM)num1-num2#", "#0-0+n-o(cal)0-0#"]);
    add("ACI-P120-L017-9B82D53EF1", `${dyadicDiagram.generalRows[0].expression} ${dyadicDiagram.generalRows[0].role}`, "#pers¹-pers²+ ... )num¹-num²# Subject");
    add("ACI-P120-L018-D79E5D617E", `${dyadicDiagram.generalRows[1].expression} ${dyadicDiagram.generalRows[1].role}`, "+st¹-st²(STEM) Predicate");
    add("ACI-P120-L021-6409D5A339", [[monadic.personFrame.pers1, monadic.personFrame.pers2], [dyadic.personFrame.pers1, dyadic.personFrame.pers2]], [["0", "0"], ["0", "0"]]);

    add("ACI-P120-L024-1062005AE6", dyads["possessive-singular-common-uh"].subjectNumber, "singular-or-common");
    add("ACI-P120-L024-CE0A2303A4", [dyads["possessive-singular-common-uh"].num2, dyads["possessive-singular-common-hui"].num2, dyads["possessive-singular-common-zero"].num2], ["0", "0", "0"]);
    add("ACI-P120-L025-2BBB82D900", [dyads["possessive-singular-common-uh"].conditioning, dyads["possessive-singular-common-hui"].conditioning], ["after-vowel-before-silent-num2-and-morphologically-selected", "after-consonant-and-rare-morphological-selection"]);
    add("ACI-P120-L026-0C0F0E7FA9", dyads["possessive-singular-common-hui"].conditioning, "after-consonant-and-rare-morphological-selection");
    add("ACI-P121-L003-DDFDCF5869", [dyads["possessive-singular-common-uh"].conditioning, dyads["possessive-singular-common-zero"].conditioning], ["after-vowel-before-silent-num2-and-morphologically-selected", "morphologically-selected"]);
    add("ACI-P121-L004-24F58A1FAF", [dyads["possessive-plural-hu-an"].subjectNumber, dyads["possessive-plural-hu-an"].num1, dyads["possessive-plural-hu-an"].num2], ["plural", "hu", "ān"]);
    add("ACI-P121-L009-6F36DD17BE", [lcm.subjectPersonInventory.length, lcm.subjectPronounShapeInventory.length], [6, 12]);
    add("ACI-P121-L011-6338924872", lcm.subjectPersonInventory.map((entry) => [entry.subject, entry.person, entry.number]), [["1sg", "first", "singular"], ["2sg", "second", "singular"], ["3sg-or-common", "third", "singular-or-common"], ["1pl", "first", "plural"], ["2pl", "second", "plural"], ["3pl", "third", "plural"]]);
    add("ACI-P121-L012-4AF3BA2EA6", [monadic.state, monadic.operationEvaluationFrame.resultOperationId, monadic.numberFrame.connectorRule], ["possessive", "nnc-possessive-state", "lesson-13.2-zero-morphologically-selected"]);
    add("ACI-P121-L015-C7C77C8442", shape("first-singular", "possessive-singular-common-uh"), ["n", "0", "uh", "0"]);
    add("ACI-P121-L016-D046F1A923", shape("first-singular", "possessive-singular-common-hui"), ["n", "0", "hui", "0"]);
    add("ACI-P121-L017-BFC4842520", shape("first-singular", "possessive-singular-common-zero"), ["n", "0", "0", "0"]);
    add("ACI-P121-L018-F2B0C6F416", shape("first-plural", "possessive-plural-hu-an"), ["t", "0", "hu", "ān"]);
    add("ACI-P121-L019-C7F699BD9F", shape("second-singular", "possessive-singular-common-uh"), ["t", "0", "uh", "0"]);
    add("ACI-P121-L020-2EC7B145F3", shape("second-singular", "possessive-singular-common-hui"), ["t", "0", "hui", "0"]);
    add("ACI-P121-L021-782CB6A53B", shape("second-singular", "possessive-singular-common-zero"), ["t", "0", "0", "0"]);
    add("ACI-P121-L022-02BF0C9695", shape("second-plural", "possessive-plural-hu-an"), ["am", "0", "hu", "ān"]);
    add("ACI-P121-L023-BA5F4F8B54", shape("third-singular-or-common", "possessive-singular-common-uh"), ["0", "0", "uh", "0"]);
    add("ACI-P121-L024-E40311F013", shape("third-singular-or-common", "possessive-singular-common-hui"), ["0", "0", "hui", "0"]);
    add("ACI-P121-L025-E340E9A68A", shape("third-singular-or-common", "possessive-singular-common-zero"), ["0", "0", "0", "0"]);
    add("ACI-P121-L026-9301878EEF", shape("third-plural", "possessive-plural-hu-an"), ["0", "0", "hu", "ān"]);

    add("ACI-P121-L031-226BDB24A4", [human.stateFrame.arity, human.stateFrame.slots.map((slot) => [slot.role, slot.carrier])], ["monadic", [["st", "tē"]]]);
    add("ACI-P122-L002-3389139451", [reciprocalAllowed.stateFrame.possessorRole, reciprocalAllowed.stateFrame.arity, reciprocalAllowed.stateFrame.slots[0].role], ["reciprocal", "monadic", "st"]);
    add("ACI-P122-L004-79CE340A6C", [reciprocalBlocked.authorizationStatus, reciprocalBlocked.blockReason, reciprocalAllowed.authorizationStatus], ["blocked", "reciprocal-possessor-requires-third-person-subject", "authorized"]);
    add("ACI-P122-L006-2B6E47A7DF", [[human.stateFrame.possessorRole, human.stateFrame.slots[0].carrier, human.authorizationStatus], [nonhumanAllowed.stateFrame.possessorRole, nonhumanAllowed.stateFrame.slots[0].carrier, nonhumanAllowed.authorizationStatus], [nonhumanBlocked.authorizationStatus, nonhumanBlocked.blockReason]], [["nonspecific-human", "tē", "authorized"], ["nonspecific-nonhuman", "tla", "authorized"], ["blocked", "tla-possessor-requires-relational-or-analogical-derived-nounstem"]]);

    s.eq("accepted Lesson 13 Groups 1-3 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 50, unique: 50, writing: 32, reading: 18 });
    s.eq("every writing atom has its own exact grammar observation", {
        observed: writing.filter((record) => observations.has(record.atomId)).length,
        expected: writing.filter((record) => expected.has(record.atomId)).length,
        missing: writing.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 32, expected: 32, missing: [] });
    for (const record of writing) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted grammar job`, actual, wanted);
        const broken = Array.isArray(actual) ? ["BROKEN", ...actual.slice(1)] : `${actual}-BROKEN`;
        s.no(`mutation:${record.atomId} fails when that grammar behavior is broken`, JSON.stringify(broken) === JSON.stringify(wanted));
    }

    const source = ctx.issueCanonicalNncSourceFrame({ stem: "cal" });
    const operation = ctx.issueCanonicalNncOperationFrame(source, {
        state: "possessive", subject: "3common", possessor: "nonspecific-human",
    });
    const result = ctx.requestClassicalOrdinaryNncResult(source, operation);
    s.eq("the normal application path turns the possessor meaning into the monadic Result", {
        source: source.authorizationStatus,
        operation: operation.authorizationStatus,
        possessor: operation.possessor,
        result: result.authorizationStatus,
        formula: result.formulaProjection.formulaRealization,
    }, {
        source: "authorized",
        operation: "authorized",
        possessor: "nonspecific-human",
        result: "authorized",
        formula: "#0-0+tē(cal)0-0#",
    });
    const metaphoricalPlan = ctx.prepareClassicalOrdinaryNncParadigmPlan(
        source,
        {
            states: ["possessive"],
            subjects: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
            metaphoricalUse: true,
        },
    );
    const metaphoricalCoordinates =
        ctx.projectClassicalOrdinaryNncParadigmCoordinates(
            metaphoricalPlan,
        );
    s.eq("the full paradigm keeps the accepted metaphorical reference choice while it expands the subject paradigm", {
        plan: metaphoricalPlan.authorizationStatus,
        coordinates: metaphoricalCoordinates.length,
        subjects: Array.from(new Set(
            metaphoricalCoordinates.map((coordinate) => coordinate.subject),
        )),
        metaphorical: metaphoricalCoordinates.every(
            (coordinate) => coordinate.operationFrame.metaphoricalUse === true,
        ),
        exact: metaphoricalCoordinates.every((coordinate) => (
            coordinate.authorizationStatus === "authorized"
            && coordinate.pointwiseEquivalent === true
        )),
    }, {
        plan: "authorized",
        coordinates: 88,
        subjects: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
        metaphorical: true,
        exact: true,
    });
    return s;
}

module.exports = { run };
