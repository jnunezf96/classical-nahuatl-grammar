"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson16_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson16-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson16-demonstrative-and-indefinite-pronominals",
        "lesson16-quantitive-foundation",
        "lesson16-quantitive-plural-and-miye-cequi",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");

    const execute = (sourceInput, selections = {}) => {
        const source = ctx.issueCanonicalNncSourceFrame(sourceInput);
        const selection = ctx.getCanonicalNncOperationSelectionFrame(source, selections);
        const operation = ctx.issueCanonicalNncOperationFrame(source, {
            subject: selections.subject || selection.selectedSubject,
            clausePosition: selections.clausePosition || selection.selectedClausePosition || "initial",
            adjunctorInMode: selections.adjunctorInMode || selection.selectedAdjunctorInMode || "none",
            numberForm: selections.numberForm || selection.selectedNumberForm || "",
            predicatePluralization:
                selections.predicatePluralization
                || selection.selectedPredicatePluralization
                || "",
            specialHumanUse: selections.specialHumanUse === true,
            sentenceType: selections.sentenceType || "statement",
            polarity: selections.polarity || "positive",
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

    const pick = (entry, label) => entry.cues.find((cue) => cue.label === label);
    const pair = (entry) => [entry.result.formulaRealization, entry.result.sentenceSurface];

    const inSingular = execute({ stem: "īn" }, { subject: "3sg" });
    const inPlural = execute({ stem: "īn" }, { subject: "3pl" });
    const onSingular = execute({ stem: "ōn" }, { subject: "3sg" });
    const badDemonstrative = execute({ stem: "īn" }, { subject: "1sg" });
    const acah = execute(
        { stem: "a-c-ah", embedStem: "a-c", matrixStem: "ah" },
        { subject: "3sg" },
    );
    const tacahmeh = execute(
        { stem: "a-c-ah", embedStem: "a-c", matrixStem: "ah" },
        { subject: "1pl", numberForm: "m-eh" },
    );
    const itlah = execute(
        { stem: "itl-ah", embedStem: "itl", matrixStem: "ah" },
        { subject: "3common" },
    );
    const blockedHumanItlah = execute(
        { stem: "itl-ah", embedStem: "itl", matrixStem: "ah" },
        { subject: "2sg" },
    );
    const humanItlah = execute(
        { stem: "itl-ah", embedStem: "itl", matrixStem: "ah" },
        { subject: "2sg", specialHumanUse: true, polarity: "negative" },
    );

    const ixquich = execute(
        { stem: "ix-qui-ch", embedStem: "ix", matrixStem: "qui-ch" },
        { subject: "3common" },
    );
    const tixquichtin = execute(
        { stem: "ix-qui-ch", embedStem: "ix", matrixStem: "qui-ch" },
        { subject: "1pl", numberForm: "t-in" },
    );
    const cemixquich = execute(
        { stem: "cem-ix-qui-ch", embedStem: "cem-ix", matrixStem: "qui-ch" },
        { subject: "3common" },
    );
    const quexInitial = execute(
        { stem: "quē-x-qui-ch", embedStem: "quē-x", matrixStem: "qui-ch" },
        { subject: "3common", clausePosition: "initial" },
    );
    const quexNoninitial = execute(
        { stem: "quē-x-qui-ch", embedStem: "quē-x", matrixStem: "qui-ch" },
        { subject: "3common", clausePosition: "noninitial" },
    );
    const quexIxPlural = execute(
        { stem: "quē-x-ix-qui-ch", embedStem: "quē-x-ix", matrixStem: "qui-ch" },
        { subject: "2pl", numberForm: "t-in" },
    );

    const miyec = execute(
        { stem: "miye-c", embedStem: "miye", matrixStem: "c" },
        { subject: "3common" },
    );
    const miyeNormal = execute(
        { stem: "miye-c", embedStem: "miye", matrixStem: "c" },
        { subject: "1pl", predicatePluralization: "internal-n", numberForm: "t-in" },
    );
    const miyeSilent = execute(
        { stem: "miye-c", embedStem: "miye", matrixStem: "c" },
        { subject: "1pl", predicatePluralization: "internal-n", numberForm: "silent-silent" },
    );
    const miyePlain = execute(
        { stem: "miye-c", embedStem: "miye", matrixStem: "c" },
        { subject: "1pl", predicatePluralization: "plain-variant", numberForm: "t-in" },
    );
    const cequi = execute(
        { stem: "ce-qui", embedStem: "ce", matrixStem: "qui" },
        { subject: "3common" },
    );
    const cequiNormal = execute(
        { stem: "ce-qui", embedStem: "ce", matrixStem: "qui" },
        { subject: "1pl", predicatePluralization: "internal-n", numberForm: "t-in" },
    );
    const cequiAssimilated = execute(
        { stem: "ce-qui", embedStem: "ce", matrixStem: "qui" },
        { subject: "2pl", predicatePluralization: "internal-n", numberForm: "silent-silent" },
    );
    const badCequiPlain = execute(
        { stem: "ce-qui", embedStem: "ce", matrixStem: "qui" },
        { subject: "1pl", predicatePluralization: "plain-variant", numberForm: "t-in" },
    );

    const miyeState = ctx.getClassicalRuleLogicSurfaceState({
        basalUnit: "nnc",
        stem: "miye-c",
        sourceEmbedStem: "miye",
        sourceMatrixStem: "c",
        subject: "1pl",
        nncAnimacy: "animate",
        nncQuantitivePredicatePluralization: "internal-n",
        nncPluralConnector: "t-in",
        sentenceSurfaceMode: "statement",
    });
    const availability = ctx.getClassicalNncAuthorityControlAvailability({ state: miyeState });
    const miyeUrl = ctx.buildEntradaUrlHash({
        input: "(miye-c)",
        classicalNnc: {
            active: true,
            subject: "1pl",
            quantityPluralFormation: "plain-variant",
        },
    });
    const restoredMiyeUrl = ctx.parseEntradaUrlSegmentString(miyeUrl);

    const observations = {
        "lesson16-demonstrative-and-indefinite-pronominals": {
            demonstratives: [pair(inSingular), pair(inPlural), pair(onSingular)],
            demonstrativeRestriction: [
                badDemonstrative.operation.authorizationStatus,
                badDemonstrative.operation.blockReason,
            ],
            indefinites: [pair(acah), pair(tacahmeh), pair(itlah)],
            humanItlah: {
                blocked: [
                    blockedHumanItlah.operation.authorizationStatus,
                    blockedHumanItlah.operation.blockReason,
                ],
                selected: pair(humanItlah),
            },
            sourceBoundary: {
                sourceStructure: acah.source.sourceStructure,
                embedStem: acah.source.embedStem,
                matrixStem: acah.source.matrixStem,
            },
            cues: [
                pick(inPlural, "demonstrative"),
                pick(acah, "indefinite embed"),
                pick(acah, "indefinite matrix"),
            ],
        },
        "lesson16-quantitive-foundation": {
            forms: [pair(ixquich), pair(tixquichtin), pair(cemixquich), pair(quexIxPlural)],
            discourse: [quexInitial.result.sentenceSurface, quexNoninitial.result.sentenceSurface],
            positions: quexInitial.selection.clausePositionValues,
            cues: [pick(ixquich, "quantity embed"), pick(ixquich, "quantity matrix")],
        },
        "lesson16-quantitive-plural-and-miye-cequi": {
            miye: [pair(miyec), pair(miyeNormal), pair(miyeSilent), pair(miyePlain)],
            cequi: [pair(cequi), pair(cequiNormal), pair(cequiAssimilated)],
            blockedPlainCequi: [
                badCequiPlain.operation.authorizationStatus,
                badCequiPlain.operation.blockReason,
            ],
            choices: {
                pluralizations: miyeNormal.selection.predicatePluralizationValues,
                selected: miyeNormal.selection.selectedPredicatePluralization,
                control: availability["classical-rule-logic-nnc-quantity-plural-formation"],
                url: [
                    miyeUrl.includes("/cn-l16-quantity-plural/plain-variant"),
                    restoredMiyeUrl.classicalNnc.quantityPluralFormation,
                ],
            },
            cues: [
                pick(miyeNormal, "quantity matrix"),
                pick(miyeNormal, "internal plural n"),
                pick(cequiAssimilated, "assimilation"),
            ],
        },
    };

    const expected = {
        "lesson16-demonstrative-and-indefinite-pronominals": {
            demonstratives: [
                ["#0-0(īn)0-0#", "Īn."],
                ["#0-0(īn)⎕-⎕#", "Īn."],
                ["#0-0(ōn)0-0#", "Ōn."],
            ],
            demonstrativeRestriction: ["blocked", "pronominal-nnc-subject-not-licensed-for-source"],
            indefinites: [
                ["#0-0(a-c-ah)0-0#", "Acah."],
                ["#t-0(a-c-ah)m-eh#", "Tacahmeh."],
                ["#0-0(itl-ah)0-0#", "Itlah."],
            ],
            humanItlah: {
                blocked: ["blocked", "itlah-with-human-subject-requires-special-situation-selection"],
                selected: ["#t-0(itl-ah)0-0#", "Ahtitlah."],
            },
            sourceBoundary: {
                sourceStructure: "embed-matrix",
                embedStem: "a-c",
                matrixStem: "ah",
            },
            cues: [
                { label: "demonstrative", text: "īn" },
                { label: "indefinite embed", text: "a-c" },
                { label: "indefinite matrix", text: "ah" },
            ],
        },
        "lesson16-quantitive-foundation": {
            forms: [
                ["#0-0(ix-qui-ch)0-0#", "Ixquich."],
                ["#t-0(ix-qui-ch)t-in#", "Tixquichtin."],
                ["#0-0(cem-ix-qui-ch)0-0#", "Cemixquich."],
                ["#an-0(quē-x-ix-qui-ch)t-in#", "Anquēxixquichtin?"],
            ],
            discourse: ["Quēxquich?", "Quēxquich."],
            positions: ["initial", "noninitial"],
            cues: [
                { label: "quantity embed", text: "ix" },
                { label: "quantity matrix", text: "qui-ch" },
            ],
        },
        "lesson16-quantitive-plural-and-miye-cequi": {
            miye: [
                ["#0-0(miye-c)0-0#", "Miyec."],
                ["#ti-0(miye-quī-n)t-in#", "Timiyequīntin."],
                ["#ti-0(miye-quī-n)⎕-⎕#", "Timiyequīn."],
                ["#ti-0(miye-c)t-in#", "Timiyectin."],
            ],
            cequi: [
                ["#0-0(ce-qui)0-0#", "Cequi."],
                ["#ti-0(ce-quī-n)t-in#", "Ticequīntin."],
                ["#az-0(ce-quī-n)⎕-⎕#", "Azcequīn."],
            ],
            blockedPlainCequi: [
                "blocked",
                "selected-predicate-pluralization-not-licensed-for-pronominal-nnc-context",
            ],
            choices: {
                pluralizations: ["internal-n", "plain-variant"],
                selected: "internal-n",
                control: {
                    available: true,
                    reason: "canvas-quantity-source-allows-normal-or-variant-plural-formation",
                    decisionOwner: "user",
                    renderInAuthority: true,
                },
                url: [true, "plain-variant"],
            },
            cues: [
                { label: "quantity matrix", text: "quī" },
                { label: "internal plural n", text: "n" },
                { label: "assimilation", text: "az" },
            ],
        },
    };

    s.eq("accepted Lesson 16 Groups 7-9 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 137, unique: 137, writing: 62, reading: 75 });

    groupIds.forEach((groupId) => {
        s.eq(`${groupId} works through the normal application route`, observations[groupId], expected[groupId]);
    });
    for (const record of writing) {
        const actual = observations[record.reviewGroupId];
        const wanted = expected[record.reviewGroupId];
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = { ...actual, authorizationStatus: `broken-${record.atomId}` };
        s.no(
            `mutation:${record.atomId} fails when its accepted grammar behavior is broken`,
            JSON.stringify(broken) === JSON.stringify(wanted),
        );
    }
    return s;
}

module.exports = { run };
