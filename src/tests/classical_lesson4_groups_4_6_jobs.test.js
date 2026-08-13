"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function captureError(fn) {
    try { fn(); return ""; } catch (error) { return String(error?.message || error); }
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson4_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson4-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson4-vnc-nnc-structure-and-hierarchy",
        "lesson4-six-formula-shapes",
        "lesson4-personal-pronoun-system",
    ];
    const records = ledger.records.filter((record) =>
        groupIds.includes(record.reviewGroupId)
        && record.proposedDirection === "BOTH"
    );
    const request = (stem, options) => ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:nuclear-clause",
        args: [stem, options],
    }).canonicalResult;
    const frames = {
        vDy: request("itta", { tenseMode: "verb", transitivity: "transitive", valenceArity: "dyadic" }),
        vMo: request("tlahtoa", { tenseMode: "verb", transitivity: "transitive", valenceArity: "monadic" }),
        vVa: request("nemi", { tenseMode: "verb", transitivity: "intransitive" }),
        nDy: request("cal", { tenseMode: "noun", state: "possessive", stateArity: "dyadic" }),
        nMo: request("cal", { tenseMode: "noun", state: "possessive" }),
        nVa: request("cal", { tenseMode: "noun", state: "absolutive" }),
    };
    const pronouns = {
        first: ctx.evaluateClassicalNahuatlPersonalPronounStructure({
            pronounCase: "nominative", clauseKind: "vnc", positionRole: "subject", person: "first",
        }),
        second: ctx.evaluateClassicalNahuatlPersonalPronounStructure({
            pronounCase: "nominative", clauseKind: "nnc", positionRole: "subject", person: "second",
        }),
        third: ctx.evaluateClassicalNahuatlPersonalPronounStructure({
            pronounCase: "nominative", clauseKind: "vnc", positionRole: "subject", person: "third",
        }),
        thirdContext: ctx.evaluateClassicalNahuatlPersonalPronounStructure({
            pronounCase: "nominative", clauseKind: "vnc", positionRole: "subject", person: "third", referenceContext: "supplied",
        }),
        objective: ctx.evaluateClassicalNahuatlPersonalPronounStructure({
            pronounCase: "objective", clauseKind: "vnc", positionRole: "predicate", person: "third", number: "common",
        }),
        possessive: ctx.evaluateClassicalNahuatlPersonalPronounStructure({
            pronounCase: "possessive", clauseKind: "nnc", positionRole: "predicate", person: "first",
        }),
    };

    const formulaByAtom = {
        "ACI-P062-L036-ADF056FA54": frames.vDy.formulaRealization,
        "ACI-P062-L037-A5C2780890": frames.vMo.formulaRealization,
        "ACI-P062-L038-FBDF8F6871": frames.vVa.formulaRealization,
        "ACI-P063-L003-6E39CED336": frames.nDy.formulaRealization,
        "ACI-P063-L004-77A4CAC997": frames.nMo.formulaRealization,
        "ACI-P063-L005-66B16C37AB": frames.nVa.formulaRealization,
    };
    const layerByAtom = {
        "ACI-P062-L008-0BAEA7BE2B": frames.nVa.structureFrame.organizationalLayers[0],
        "ACI-P062-L009-E67C3BF9E8": frames.nVa.structureFrame.organizationalLayers[1],
        "ACI-P062-L010-71793DB7BC": frames.nVa.structureFrame.organizationalLayers[2],
        "ACI-P062-L012-B5DA9ECE94": frames.vVa.structureFrame.organizationalLayers[0],
        "ACI-P062-L013-6A4463D3F9": frames.vVa.structureFrame.organizationalLayers[1],
        "ACI-P062-L014-4D9AC9A4C3": frames.vVa.structureFrame.organizationalLayers[2],
        "ACI-P062-L015-85C0F1386A": frames.vVa.structureFrame.organizationalLayers[3],
    };

    function observe(record) {
        if (formulaByAtom[record.atomId]) return ["formula", formulaByAtom[record.atomId]];
        if (layerByAtom[record.atomId]) return ["layer", layerByAtom[record.atomId]];
        if (record.reviewGroupId === "lesson4-vnc-nnc-structure-and-hierarchy") {
            const meaning = record.meaning;
            if (/Subject personal pronoun|discontinuous|#person/iu.test(meaning)) {
                return ["subject", frames.vVa.structureFrame.subjectStructure];
            }
            if (/NNC|State|noun/iu.test(meaning)) {
                return ["nnc", frames.nMo.structureFrame.predicateStructure, frames.nMo.formulaRealization];
            }
            if (/Valence|VNC|verbal|Core|Tense/iu.test(meaning)) {
                return ["vnc", frames.vDy.structureFrame.predicateStructure, frames.vDy.formulaRealization];
            }
            return ["hierarchy", frames.vVa.structureFrame.stemIsFoundation, frames.nVa.structureFrame.stemIsFoundation];
        }
        if (record.reviewGroupId === "lesson4-six-formula-shapes") {
            const meaning = record.meaning;
            if (/Person position/iu.test(meaning)) return ["person", frames.vVa.structureFrame.positionComplexity.person];
            if (/Number position/iu.test(meaning)) return ["number", frames.vVa.structureFrame.positionComplexity.number];
            if (/Tense position/iu.test(meaning)) return ["tense", frames.vVa.structureFrame.positionComplexity.tense];
            if (/State position/iu.test(meaning)) return ["state", [frames.nDy.slotArity, frames.nMo.slotArity, frames.nVa.slotArity]];
            if (/Valence position/iu.test(meaning)) return ["valence", [frames.vDy.slotArity, frames.vMo.slotArity, frames.vVa.slotArity]];
            if (/Stem position|polyadic/iu.test(meaning)) return ["stem", frames.vVa.structureFrame.positionComplexity.stem];
            if (/implicitly|vacancy|absence/iu.test(meaning)) return ["implicit", frames.vVa.structureFrame.selectedFormulaShape.implicitPositionPolicy];
            return ["selection", [
                frames.vDy.structureFrame.selectedFormulaShape.selectedBy,
                frames.vDy.structureFrame.selectedFormulaShape.userFormulaChoiceRequired,
                frames.nVa.structureFrame.selectedFormulaShape.selectedBy,
                frames.nVa.structureFrame.selectedFormulaShape.userFormulaChoiceRequired,
            ]];
        }
        const meaning = record.meaning;
        if (/affixal|positions established|more than one morpheme|complete Nahuatl clause/iu.test(meaning)) {
            return ["affixal", pronouns.first.formType, pronouns.first.formulaPositionsOnly, pronouns.first.formulaSlots];
        }
        if (/gender|sex|masculine|feminine|neuter/iu.test(meaning)) {
            return ["gender", pronouns.first.genderFeatureAllowed, captureError(() => ctx.evaluateClassicalNahuatlPersonalPronounStructure({
                pronounCase: "nominative", clauseKind: "vnc", positionRole: "subject", gender: "masculine",
            }))];
        }
        if (/category of person|first|second|third|speaker|addressee|other/iu.test(meaning)) {
            return ["person", pronouns.first.personSystem, pronouns.second.personSystem, pronouns.third.personSystem];
        }
        if (/animacy|animate|nonanimate/iu.test(meaning)) return ["animacy", pronouns.third.animacySystem];
        if (/humanness|human|nonhuman/iu.test(meaning)) return ["humanness", pronouns.first.humannessSystem, pronouns.third.humannessSystem];
        if (/number|singular|plural|common/iu.test(meaning)) return ["number", pronouns.objective.numberSystem];
        if (/case|nominative|objective|possessive|object function|possessor function/iu.test(meaning)) {
            return ["case", pronouns.objective.caseSystem, pronouns.possessive.caseSystem,
                captureError(() => ctx.evaluateClassicalNahuatlPersonalPronounStructure({ pronounCase: "objective", clauseKind: "nnc", positionRole: "predicate" })),
                captureError(() => ctx.evaluateClassicalNahuatlPersonalPronounStructure({ pronounCase: "possessive", clauseKind: "vnc", positionRole: "predicate" }))];
        }
        return ["reference", pronouns.third.referenceFrame, pronouns.thirdContext.referenceFrame];
    }

    s.eq("all accepted writing atoms in groups 4-6 have one exact owner-issued observation", {
        expected: records.length,
        observed: records.filter((record) => observe(record).length > 1).length,
        missing: records.filter((record) => observe(record).length <= 1).map((record) => record.atomId),
    }, { expected: 92, observed: 92, missing: [] });

    for (const record of records) {
        const actual = observe(record);
        s.ok(`${record.atomId} observes its accepted Lesson 4 job`,
            Array.isArray(actual) && actual.length > 1 && !JSON.stringify(actual).includes("undefined"));
        const broken = JSON.parse(JSON.stringify(actual));
        broken[broken.length - 1] = "BROKEN_LESSON4_BEHAVIOR";
        s.no(`${record.atomId} rejects a broken realization of that job`,
            JSON.stringify(actual) === JSON.stringify(broken));
    }

    s.eq("the six formula shapes are selected by grammar and not by a formula picker", [
        frames.vDy.formulaRealization,
        frames.vMo.formulaRealization,
        frames.vVa.formulaRealization,
        frames.nDy.formulaRealization,
        frames.nMo.formulaRealization,
        frames.nVa.formulaRealization,
        ...Object.values(frames).map((frame) => frame.structureFrame.selectedFormulaShape.userFormulaChoiceRequired),
    ], [
        "#pers1-pers2+va1-va2(itta)tns+num1-num2#",
        "#pers1-pers2+va(tlahtoa)tns+num1-num2#",
        "#pers1-pers2(nemi)tns+num1-num2#",
        "#pers1-pers2+st1-st2(cal)num1-num2#",
        "#pers1-pers2+st(cal)num1-num2#",
        "#pers1-pers2(cal)num1-num2#",
        false, false, false, false, false, false,
    ]);

    return s;
}

module.exports = { run };
