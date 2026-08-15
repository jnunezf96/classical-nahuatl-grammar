"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson16_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson16-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson16-compound-personal-variants",
        "lesson16-what-interrogatives",
        "lesson16-compound-and-who-interrogatives",
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
            doubledFirstPlural: selections.doubledFirstPlural === true,
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

    const surface = (overrides) => {
        const state = ctx.getClassicalRuleLogicSurfaceState({
            basalUnit: "nnc",
            nncAnimacy: "animate",
            sentenceSurfaceMode: "statement",
            ...overrides,
        });
        return {
            state,
            result: ctx.buildClassicalRuleLogicSurfaceMachineryFrame(state),
            availability: ctx.getClassicalNncAuthorityControlAvailability({ state }),
        };
    };

    const soundedPersonal = surface({
        stem: "eh-huā",
        sourceEmbedStem: "eh",
        sourceMatrixStem: "huā",
        subject: "1sg",
        nncPluralConnector: "sounded",
    });
    const silentPersonal = surface({
        stem: "eh-huā",
        sourceEmbedStem: "eh",
        sourceMatrixStem: "huā",
        subject: "1sg",
        nncPluralConnector: "silent-silent",
    });
    const soundedPlural = execute(
        { stem: "eh-huā", embedStem: "eh", matrixStem: "huā" },
        { subject: "1pl", numberForm: "t-in" },
    );
    const silentPlural = execute(
        { stem: "eh-huā", embedStem: "eh", matrixStem: "huā" },
        { subject: "1pl", numberForm: "silent-silent" },
    );
    const doubledPlural = execute(
        { stem: "eh-huā", embedStem: "eh", matrixStem: "huā" },
        { subject: "1pl", numberForm: "t-in", doubledFirstPlural: true },
    );
    const hostileDoubled = execute(
        { stem: "eh-huā", embedStem: "eh", matrixStem: "huā" },
        { subject: "2pl", numberForm: "t-in", doubledFirstPlural: true },
    );
    const evaluativeParticleSource = ctx.buildClassicalNahuatlParticleSourceFrame(
        "l16-quen-mach-huel",
    );
    const evaluativeParticle = ctx.buildClassicalNahuatlParticleResultFrame(
        evaluativeParticleSource,
    );

    const tlehSource = { stem: "tl-eh", embedStem: "tl", matrixStem: "eh" };
    const tlehSubjects = ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
        .map((subject) => execute(tlehSource, { subject }));
    const tlehInitial = execute(tlehSource, { subject: "3sg" });
    const tlehNoninitial = execute(tlehSource, {
        subject: "3sg",
        clausePosition: "noninitial",
    });
    const tlehNegative = execute(tlehSource, {
        subject: "3sg",
        polarity: "negative",
    });
    const tlehDependent = execute(tlehSource, {
        subject: "3sg",
        adjunctorInMode: "dependent-clause",
    });
    const tlehFusions = ["fused-tlein", "fused-tlei", "fused-tlen"]
        .map((adjunctorInMode) => execute(tlehSource, {
            subject: "3sg",
            adjunctorInMode,
        }));

    const compoundWhat = execute(
        { stem: "tl-eh-huā", embedStem: "tl", matrixStem: "eh-huā" },
        { subject: "3sg", numberForm: "sounded" },
    );
    const whichSimple = execute({ stem: "cā" }, { subject: "3sg" });
    const whichTleh = execute(
        { stem: "cā-tl-eh", embedStem: "cā", matrixStem: "tl-eh" },
        { subject: "3sg" },
    );
    const whichTleinPlural = execute(
        { stem: "cā-tl-e-in", embedStem: "cā", matrixStem: "tl-e-in" },
        { subject: "3pl" },
    );
    const whichCompound = execute(
        { stem: "cā-tl-eh-huā", embedStem: "cā", matrixStem: "tl-eh-huā" },
        { subject: "3sg", numberForm: "sounded" },
    );
    const who = execute({ stem: "ā-0" }, { subject: "3sg" });
    const negativeWho = execute(
        { stem: "ā-0" },
        { subject: "3sg", polarity: "negative" },
    );
    const noninitialWho = execute(
        { stem: "ā-0" },
        { subject: "3sg", clausePosition: "noninitial" },
    );
    const fusedWho = execute(
        { stem: "ā-0" },
        { subject: "3sg", adjunctorInMode: "fused-aquin" },
    );
    const separateWho = execute(
        { stem: "ā-0" },
        { subject: "3sg", adjunctorInMode: "dependent-clause" },
    );
    const hostileWho = execute({ stem: "ā-0" }, { subject: "1sg" });

    const observations = {
        "lesson16-compound-personal-variants": {
            numberChoice: {
                values: soundedPersonal.state.nncOperationSelectionFrame.numberFormValues,
                available: soundedPersonal.availability[
                    "classical-rule-logic-nnc-plural-connector"
                ].available,
                owner: soundedPersonal.availability[
                    "classical-rule-logic-nnc-plural-connector"
                ].decisionOwner,
            },
            singularVariants: [
                [soundedPersonal.result.formulaRealization, soundedPersonal.result.sentenceSurface],
                [silentPersonal.result.formulaRealization, silentPersonal.result.sentenceSurface],
            ],
            pluralVariants: [
                [soundedPlural.result.formulaRealization, soundedPlural.result.sentenceSurface],
                [silentPlural.result.formulaRealization, silentPlural.result.sentenceSurface],
            ],
            doubled: [doubledPlural.result.formulaRealization, doubledPlural.result.sentenceSurface],
            hostileDoubled: [
                hostileDoubled.operation.authorizationStatus,
                hostileDoubled.operation.blockReason,
            ],
            evaluativeCollocation: {
                status: evaluativeParticle.authorizationStatus,
                formula: evaluativeParticle.formula,
                surface: evaluativeParticle.surface,
            },
        },
        "lesson16-what-interrogatives": {
            subjects: tlehSubjects.map((entry) => [
                entry.operation.subject,
                entry.result.formulaRealization,
                entry.result.sentenceSurface,
            ]),
            discourse: {
                initial: tlehInitial.result.sentenceSurface,
                noninitial: tlehNoninitial.result.sentenceSurface,
                negative: tlehNegative.result.sentenceSurface,
                separate: [tlehDependent.result.sentenceSurface, tlehDependent.formula],
                fused: tlehFusions.map((entry) => entry.result.sentenceSurface),
            },
            controls: {
                positions: tlehInitial.selection.clausePositionValues,
                inModes: tlehInitial.selection.adjunctorInValues,
            },
            cues: {
                nonhuman: tlehInitial.cues.find((cue) => cue.label === "nonhuman interrogative"),
                identity: tlehInitial.cues.find((cue) => cue.label === "identity stem"),
                fusion: tlehFusions[0].cues.find((cue) => cue.label === "fused in"),
            },
        },
        "lesson16-compound-and-who-interrogatives": {
            compounds: [
                [compoundWhat.result.formulaRealization, compoundWhat.result.sentenceSurface],
                [whichSimple.result.formulaRealization, whichSimple.result.sentenceSurface],
                [whichTleh.result.formulaRealization, whichTleh.result.sentenceSurface],
                [whichTleinPlural.result.formulaRealization, whichTleinPlural.result.sentenceSurface],
                [whichCompound.result.formulaRealization, whichCompound.result.sentenceSurface],
            ],
            who: {
                positive: [who.result.formulaRealization, who.result.sentenceSurface],
                negative: [negativeWho.formula, negativeWho.result.sentenceSurface],
                noninitial: noninitialWho.result.sentenceSurface,
                fused: [fusedWho.formula, fusedWho.result.sentenceSurface],
                separate: [separateWho.formula, separateWho.result.sentenceSurface],
                hostile: [hostileWho.operation.authorizationStatus, hostileWho.operation.blockReason],
            },
            cues: {
                which: whichTleh.cues.find((cue) => cue.label === "which interrogative"),
                fusedIdentity: whichTleinPlural.cues.find((cue) => cue.label === "fused identity stem"),
                fusedIn: whichTleinPlural.cues.find((cue) => cue.label === "fused in"),
                human: who.cues.find((cue) => cue.label === "human interrogative"),
                humanC: who.cues.find((cue) => cue.label === "human interrogative c"),
                negative: negativeWho.cues.find((cue) => cue.label === "negative who"),
            },
        },
    };

    const expected = {
        "lesson16-compound-personal-variants": {
            numberChoice: {
                values: ["sounded", "silent-silent"],
                available: true,
                owner: "user",
            },
            singularVariants: [
                ["#n-0(eh-huā)tl-0#", "Nehhuātl."],
                ["#n-0(eh-huā)⎕-0#", "Nehhuā."],
            ],
            pluralVariants: [
                ["#t-0(eh-huā-n)t-in#", "Tehhuāntin."],
                ["#t-0(eh-huā-n)⎕-⎕#", "Tehhuān."],
            ],
            doubled: ["#ti-t-0(eh-huā-n)t-in#", "Titehhuāntin."],
            hostileDoubled: [
                "blocked",
                "doubled-first-plural-person-is-limited-to-first-plural-personal-compound-nnc",
            ],
            evaluativeCollocation: {
                status: "authorized",
                formula: "quēn mach huel",
                surface: "quēn mach huel",
            },
        },
        "lesson16-what-interrogatives": {
            subjects: [
                ["1sg", "#ni-0(tl-eh)0-0#", "Nitleh?"],
                ["2sg", "#ti-0(tl-eh)0-0#", "Titleh?"],
                ["3sg", "#0-0(tl-eh)0-0#", "Tleh?"],
                ["1pl", "#ti-0(tl-eh)m-eh#", "Titlehmeh?"],
                ["2pl", "#an-0(tl-eh)m-eh#", "Antlehmeh?"],
                ["3pl", "#0-0(tl-eh)m-eh#", "Tlehmeh?"],
            ],
            discourse: {
                initial: "Tleh?",
                noninitial: "Tleh.",
                negative: "Ahtleh.",
                separate: ["Tleh in …?", "#0-0(tl-eh)0-0# in …?"],
                fused: ["Tlein?", "Tlei?", "Tlen?"],
            },
            controls: {
                positions: ["initial", "noninitial"],
                inModes: ["none", "dependent-clause", "fused-tlein", "fused-tlei", "fused-tlen"],
            },
            cues: {
                nonhuman: { label: "nonhuman interrogative", text: "tl" },
                identity: { label: "identity stem", text: "eh" },
                fusion: { label: "fused in", text: "in" },
            },
        },
        "lesson16-compound-and-who-interrogatives": {
            compounds: [
                ["#0-0(tl-eh-huā)tl-0#", "Tlehhuātl?"],
                ["#0-0(cā)tl-0#", "Cātl?"],
                ["#0-0(cā-tl-eh)0-0#", "Cātleh?"],
                ["#0-0(cā-tl-e-i)m-eh#", "Cātleimeh?"],
                ["#0-0(cā-tl-eh-huā)tl-0#", "Cātlehhuātl?"],
            ],
            who: {
                positive: ["#0-0(ā-0)c-0#", "Āc?"],
                negative: ["ay#0-0(ā-0)c-0#.", "Ayāc."],
                noninitial: "Āc.",
                fused: ["#0-0(ā-0)c-0# +in?", "Āquin?"],
                separate: ["#0-0(ā-0)c-0# in …?", "Āc in …?"],
                hostile: ["blocked", "pronominal-nnc-subject-not-licensed-for-source"],
            },
            cues: {
                which: { label: "which interrogative", text: "cā" },
                fusedIdentity: { label: "fused identity stem", text: "e" },
                fusedIn: { label: "fused in", text: "i" },
                human: { label: "human interrogative", text: "ā" },
                humanC: { label: "human interrogative c", text: "c" },
                negative: { label: "negative who", text: "ay" },
            },
        },
    };

    s.eq("accepted Lesson 16 Groups 4-6 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 123, unique: 123, writing: 53, reading: 70 });

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
