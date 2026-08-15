"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson16_groups_10_11_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson16-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson16-izqui-quezqui-aqui",
        "lesson16-achi-mochi-ixachi",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const execute = (sourceInput, selections = {}) => {
        const source = ctx.issueCanonicalNncSourceFrame(sourceInput);
        const selection = ctx.getCanonicalNncOperationSelectionFrame(source, selections);
        const operation = ctx.issueCanonicalNncOperationFrame(source, {
            subject: selections.subject || selection.selectedSubject,
            clausePosition: selections.clausePosition || selection.selectedClausePosition || "initial",
            numberForm: selections.numberForm || selection.selectedNumberForm || "",
            predicatePluralization:
                selections.predicatePluralization
                || selection.selectedPredicatePluralization
                || "",
            sentenceType: "statement",
            polarity: "positive",
        });
        const result = ctx.requestClassicalPronominalNncResult(source, operation);
        const formula = result?.sentenceFrame?.sentenceFormulaDisplay || result?.formulaRealization || "";
        const cues = result?.authorizationStatus === "authorized"
            ? ctx.getClassicalFormulaDerivedAnnotations(
                formula,
                result.typedSlotFrame,
                result,
            ).map((cue) => ({
                label: cue.label,
                text: formula.slice(cue.start, cue.end),
            }))
            : [];
        return { source, selection, operation, result, formula, cues };
    };
    const pair = (entry) => entry.result
        ? [entry.result.formulaRealization, entry.result.sentenceSurface]
        : [entry.operation.authorizationStatus, entry.operation.blockReason];
    const cue = (entry, label) => entry.cues.find((candidate) => candidate.label === label);
    const composeSentence = (overrides) => {
        const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
            basalUnit: "nnc",
            subject: "3common",
            nncAnimacy: "animate",
            sentenceSurfaceMode: "statement",
            ...overrides,
        });
        return [
            frame.authorizationStatus,
            frame.sentenceFormulaDisplay,
            frame.sentenceSurfaceDisplay,
        ];
    };

    const izqui = execute(
        { stem: "iz-qui", embedStem: "iz", matrixStem: "qui" },
        { subject: "3common" },
    );
    const izquiInternal = execute(
        { stem: "iz-qui", embedStem: "iz", matrixStem: "qui" },
        { subject: "1pl", predicatePluralization: "internal-n", numberForm: "t-in" },
    );
    const izquiSilent = execute(
        { stem: "iz-qui", embedStem: "iz", matrixStem: "qui" },
        { subject: "1pl", predicatePluralization: "internal-n", numberForm: "silent-silent" },
    );
    const izquiVariant = execute(
        { stem: "iz-qui", embedStem: "iz", matrixStem: "qui" },
        { subject: "1pl", predicatePluralization: "plain-variant", numberForm: "m-eh" },
    );
    const quezquiInitial = execute(
        { stem: "quē-z-qui", embedStem: "quē-z", matrixStem: "qui" },
        { subject: "3common", clausePosition: "initial" },
    );
    const quezquiNoninitial = execute(
        { stem: "quē-z-qui", embedStem: "quē-z", matrixStem: "qui" },
        { subject: "3common", clausePosition: "noninitial" },
    );
    const quezquiPlural = execute(
        { stem: "quē-z-qui", embedStem: "quē-z", matrixStem: "qui" },
        { subject: "1pl", clausePosition: "initial", predicatePluralization: "internal-n", numberForm: "t-in" },
    );
    const quezquiVariant = execute(
        { stem: "quē-z-qui", embedStem: "quē-z", matrixStem: "qui" },
        { subject: "1pl", clausePosition: "initial", predicatePluralization: "plain-variant", numberForm: "m-eh" },
    );
    const quecizquiInitial = execute(
        { stem: "quē-c-iz-qui", embedStem: "quē-c-iz", matrixStem: "qui" },
        { subject: "3common", clausePosition: "initial" },
    );
    const quecizquiNoninitial = execute(
        { stem: "quē-c-iz-qui", embedStem: "quē-c-iz", matrixStem: "qui" },
        { subject: "3common", clausePosition: "noninitial" },
    );
    const aqui = execute(
        { stem: "a-qui", embedStem: "a", matrixStem: "qui" },
        { subject: "3common" },
    );

    const achi = execute(
        { stem: "a-chi", embedStem: "a", matrixStem: "chi" },
        { subject: "3common" },
    );
    const mochi = execute(
        { stem: "mo-chi", embedStem: "mo", matrixStem: "chi" },
        { subject: "3common" },
    );
    const mochiInternal = execute(
        { stem: "mo-chi", embedStem: "mo", matrixStem: "chi" },
        { subject: "1pl", predicatePluralization: "internal-n", numberForm: "t-in" },
    );
    const mochiSilent = execute(
        { stem: "mo-chi", embedStem: "mo", matrixStem: "chi" },
        { subject: "1pl", predicatePluralization: "internal-n", numberForm: "silent-silent" },
    );
    const mochiVariant = execute(
        { stem: "mo-ch", embedStem: "mo", matrixStem: "ch" },
        { subject: "1pl", predicatePluralization: "plain-variant", numberForm: "t-in" },
    );
    const mochiCompound = execute(
        { stem: "mo-ch-eh-huā", embedStem: "mo-ch", matrixStem: "eh-huā" },
        { subject: "3sg", numberForm: "sounded" },
    );
    const mochiCompoundPlural = execute(
        { stem: "mo-ch-eh-huā", embedStem: "mo-ch", matrixStem: "eh-huā" },
        { subject: "3pl", numberForm: "t-in" },
    );
    const ixachi = execute(
        { stem: "ix-a-chi", embedStem: "ix-a", matrixStem: "chi" },
        { subject: "3common" },
    );
    const ixachiInternal = execute(
        { stem: "ix-a-chi", embedStem: "ix-a", matrixStem: "chi" },
        { subject: "1pl", predicatePluralization: "internal-n", numberForm: "t-in" },
    );
    const ixachiSilent = execute(
        { stem: "ix-a-chi", embedStem: "ix-a", matrixStem: "chi" },
        { subject: "1pl", predicatePluralization: "internal-n", numberForm: "silent-silent" },
    );

    const huelSource = ctx.buildClassicalNahuatlParticleSourceFrame("l16-huel");
    const huelParticle = ctx.buildClassicalNahuatlParticleResultFrame(huelSource);
    const achiAdverbSource = ctx.buildClassicalNahuatlParticleSourceFrame("l16-achi-adverbial");
    const achiAdverb = ctx.buildClassicalNahuatlParticleResultFrame(achiAdverbSource);
    const huelIzqui = composeSentence({
        stem: "iz-qui",
        sourceEmbedStem: "iz",
        sourceMatrixStem: "qui",
        sentenceAdverbialId: "l16-huel",
    });
    const achiMochi = composeSentence({
        stem: "mo-chi",
        sourceEmbedStem: "mo",
        sourceMatrixStem: "chi",
        sentenceAdverbialId: "l16-achi-adverbial",
    });

    const observations = {
        "lesson16-izqui-quezqui-aqui": {
            izqui: [pair(izqui), pair(izquiInternal), pair(izquiSilent), pair(izquiVariant)],
            quezqui: [
                pair(quezquiInitial),
                pair(quezquiNoninitial),
                pair(quezquiPlural),
                pair(quezquiVariant),
            ],
            distributive: [pair(quecizquiInitial), pair(quecizquiNoninitial)],
            aqui: pair(aqui),
            modifiers: [
                [
                    ...huelIzqui,
                    huelParticle.lexicalFactFrame.meanings,
                ],
                ["l3-oc-no", "oc nō"],
                ["l3-zan-no", "zan no"],
            ],
            choices: {
                izquiPluralization: izquiInternal.selection.predicatePluralizationValues,
                quezquiPosition: quezquiInitial.selection.clausePositionValues,
            },
            cues: [
                cue(quezquiInitial, "quantity interrogative embed"),
                cue(quecizquiInitial, "distributive quantity embed"),
                cue(izquiInternal, "internal plural n"),
            ],
        },
        "lesson16-achi-mochi-ixachi": {
            simple: [pair(achi), pair(mochi), pair(ixachi)],
            mochiPlural: [pair(mochiInternal), pair(mochiSilent), pair(mochiVariant)],
            compound: [pair(mochiCompound), pair(mochiCompoundPlural)],
            ixachiPlural: [pair(ixachiInternal), pair(ixachiSilent)],
            adverbialAchi: [
                ...achiMochi,
                achiAdverb.lexicalFactFrame.meanings,
            ],
            choices: mochiInternal.selection.predicatePluralizationValues,
            cues: [
                cue(mochiCompound, "quantity embed"),
                cue(mochiCompound, "compound personal stem"),
                cue(mochiCompoundPlural, "internal plural n"),
            ],
        },
    };

    const expected = {
        "lesson16-izqui-quezqui-aqui": {
            izqui: [
                ["#0-0(iz-qui)0-0#", "Izqui."],
                ["#t-0(iz-quī-n)t-in#", "Tizquīntin."],
                ["#t-0(iz-quī-n)⎕-⎕#", "Tizquīn."],
                ["#t-0(iz-quī)m-eh#", "Tizquīmeh."],
            ],
            quezqui: [
                ["#0-0(quē-z-qui)0-0#", "Quēzqui?"],
                ["#0-0(quē-z-qui)0-0#", "Quēzqui."],
                ["#ti-0(quē-z-quī-n)t-in#", "Tiquēzquīntin?"],
                ["#ti-0(quē-z-quī)m-eh#", "Tiquēzquīmeh?"],
            ],
            distributive: [
                ["#0-0(quē-c-iz-qui)0-0#", "Quēcizqui?"],
                ["#0-0(quē-c-iz-qui)0-0#", "Quēcizqui."],
            ],
            aqui: ["#0-0(a-qui)0-0#", "Aqui."],
            modifiers: [
                [
                    "authorized",
                    "huel #0-0(iz-qui)0-0#.",
                    "Huel izqui.",
                    ["exactly", "completely"],
                ],
                ["l3-oc-no", "oc nō"],
                ["l3-zan-no", "zan no"],
            ],
            choices: {
                izquiPluralization: ["internal-n", "plain-variant"],
                quezquiPosition: ["initial", "noninitial"],
            },
            cues: [
                { label: "quantity interrogative embed", text: "quē-z" },
                { label: "distributive quantity embed", text: "quē-c-iz" },
                { label: "internal plural n", text: "n" },
            ],
        },
        "lesson16-achi-mochi-ixachi": {
            simple: [
                ["#0-0(a-chi)0-0#", "Achi."],
                ["#0-0(mo-chi)0-0#", "Mochi."],
                ["#0-0(ix-a-chi)0-0#", "Ixachi."],
            ],
            mochiPlural: [
                ["#ti-0(mo-chī-n)t-in#", "Timochīntin."],
                ["#ti-0(mo-chī-n)⎕-⎕#", "Timochīn."],
                ["#ti-0(mo-ch)t-in#", "Timochtin."],
            ],
            compound: [
                ["#0-0(mo-ch-eh-huā)tl-0#", "Mochehhuātl."],
                ["#0-0(mo-ch-eh-huā-n)t-in#", "Mochehhuāntin."],
            ],
            ixachiPlural: [
                ["#t-0(ix-a-chī-n)t-in#", "Tixachīntin."],
                ["#t-0(ix-a-chī-n)⎕-⎕#", "Tixachīn."],
            ],
            adverbialAchi: [
                "authorized",
                "achi #0-0(mo-chi)0-0#.",
                "Achi mochi.",
                ["almost"],
            ],
            choices: ["internal-n", "plain-variant"],
            cues: [
                { label: "quantity embed", text: "mo-ch" },
                { label: "compound personal stem", text: "eh-huā" },
                { label: "internal plural n", text: "n" },
            ],
        },
    };

    s.eq("accepted Lesson 16 Groups 10-11 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 49, unique: 49, writing: 7, reading: 42 });

    groupIds.forEach((groupId) => {
        s.eq(`${groupId} works through the normal application route`, observations[groupId], expected[groupId]);
    });
    for (const record of writing) {
        const actual = observations[record.reviewGroupId];
        const wanted = expected[record.reviewGroupId];
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = JSON.parse(JSON.stringify(actual));
        if ([
            "ACI-P149-L008-98901A5C7E",
            "ACI-P149-L009-7056510081-02",
            "ACI-P149-L009-7056510081-03",
        ].includes(record.atomId)) {
            broken.modifiers[0][2] = "Izqui.";
        } else if ([
            "ACI-P149-L019-14B641FC5D",
            "ACI-P149-L019-98D3DC135B",
        ].includes(record.atomId)) {
            broken.quezqui[1][1] = "Quēzqui?";
        } else if (record.atomId === "ACI-P149-L038-F884DBA571") {
            broken.adverbialAchi[2] = "Mochi.";
        } else if (record.atomId === "ACI-P150-L005-E6851D773B") {
            broken.compound[0][1] = "Mochi.";
        }
        s.no(
            `mutation:${record.atomId} fails when its accepted grammar behavior is broken`,
            JSON.stringify(broken) === JSON.stringify(wanted),
        );
    }
    return s;
}

module.exports = { run };
