"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson3_contradiction_audit");
    const audit = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson3-contradiction-audit.json"
    ), "utf8"));
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson3-review-ledger.json"
    ), "utf8"));
    const particle = (id, options = {}) =>
        ctx.requestClassicalParticleResult(id, options);
    const formulaRows = [
        ["l3-in-aya", "in ah#ye"],
        ["l3-ahza-zo", "ah#zā zo"],
        ["l3-ahza-zo-oc", "ah#zā zo oc"],
        ["l3-ahzo-za", "ah#zo zā"],
        ["l3-ahzo-zan", "ah#zo zan"],
        ["l3-ahzo-ma", "ah#zo mā"],
        ["l3-ahca-zo", "ah#ca zo"],
        ["l3-ahzo-ca", "ah#zo ca"],
        ["l3-ahca-zo-ah", "ah#ca zo ah#"],
    ];
    s.eq("solid spelling never hides the grammatical members in the formula",
        formulaRows.map(([id]) => [id, particle(id).formula]), formulaRows);

    const punctuationRows = [
        ["l3-cuix", "cuix?", "cuix", "cuix"],
        ["l3-ahtel", "ahtēl?", "ahtēl", "ah#tēl"],
        ["l3-ihyo-ma", "ihyo mā ... !", "ihyo mā", "ihyo mā"],
        ["l3-ihyo-iyahua", "ihyo iyahua!", "ihyo iyahua", "ihyo iyahua"],
    ];
    const entries = new Map(ctx.getClassicalNahuatlParticleSourceEntries()
        .map((entry) => [entry.id, entry]));
    s.eq("example punctuation stays in the witness and out of the grammar Result",
        punctuationRows.map(([id]) => [
            id,
            entries.get(id).sourceForm,
            particle(id).surface,
            particle(id).formula,
        ]), punctuationRows);

    const baseVnc = {
        basalUnit: "vnc",
        vncOutputScope: "single",
        stem: "nemi",
        sourceTransitivity: "intransitive",
        valence: "intransitive",
        verbClass: "B",
        subject: "3sg",
    };
    const question = ctx.buildClassicalRuleLogicSurfaceFrame({
        ...baseVnc,
        mood: "indicative",
        tense: "present",
        sentenceSurfaceMode: "question-cuix",
    });
    const wishMa = ctx.buildClassicalRuleLogicSurfaceFrame({
        ...baseVnc,
        mood: "optative",
        tense: "nonpast",
        introductoryParticle: "mā",
    });
    const wishTla = ctx.buildClassicalRuleLogicSurfaceFrame({
        ...baseVnc,
        mood: "optative",
        tense: "past",
        introductoryParticle: "tlā",
    });
    s.eq("cuix, mā, and tlā work through their one normal sentence control", {
        duplicateParticleChoices: ctx.getClassicalNahuatlSentenceParticleEntries()
            .filter((entry) => ["l3-cuix", "l3-ma", "l3-tla"].includes(entry.id))
            .map((entry) => entry.id),
        normalResults: [
            question.sentenceSurfaceDisplay,
            wishMa.sentenceSurfaceDisplay,
            wishTla.sentenceSurfaceDisplay,
        ],
    }, {
        duplicateParticleChoices: [],
        normalResults: ["Cuix nemi?", "Mā nemi.", "Tlā nemini."],
    });

    const negative = (precedingParticleId, sentenceKind) => {
        const frame = ctx.requestClassicalNegativeParticleSelection({
            polarity: "negative",
            precedingParticleId,
            sentenceKind,
        });
        return [frame.authorizationStatus, frame.selectedParticleId,
            frame.formula, frame.selectionRule];
    };
    s.eq("the application chooses the negative form only in its Canvas context", [
        negative("l3-ma", "wish"),
        negative("l3-tla", "command"),
        negative("l3-mah", "statement"),
        negative("l3-ma", "statement"),
        negative("l3-ma", "admonition"),
        negative("", "statement"),
    ], [
        ["authorized", "l3-ca-negative", "ca#", "ca-after-ma-or-tla-in-wish-or-command"],
        ["authorized", "l3-ca-negative", "ca#", "ca-after-ma-or-tla-in-wish-or-command"],
        ["authorized", "l3-ca-negative", "ca#", "ca-after-mah"],
        ["authorized", "l3-ah-negative", "ah#", "ah-elsewhere"],
        ["authorized", "l3-ah-negative", "ah#", "ah-after-ma-in-admonition"],
        ["authorized", "l3-ah-negative", "ah#", "ah-elsewhere"],
    ]);
    s.eq("a caller cannot bypass the negative choice", [
        particle("l3-ah-negative").blockReason,
        particle("l3-ca-negative", {
            precedingParticleSourceFrame:
                ctx.buildClassicalNahuatlParticleSourceFrame("l3-ma"),
        }).blockReason,
        particle("l3-ah-negative", { structuralRole: "compound-embed" })
            .authorizationStatus,
    ], [
        "classical-negative-particle-selection-required",
        "classical-negative-particle-selection-required",
        "authorized",
    ]);

    const honorificTargets = ["l3-otzin", "l3-auhtzin", "l3-ca-no-zotzin"];
    const honorificResults = honorificTargets.map((targetId) =>
        ctx.evaluateClassicalNahuatlParticleHonorificFormation(
            ctx.buildClassicalNahuatlParticleHonorificSourceFrame({ targetId })
        ));
    s.eq("honorific Results must be built by the honorific rule", {
        direct: honorificTargets.map((id) => [
            ctx.buildClassicalNahuatlParticleSourceFrame(id).authorizationStatus,
            ctx.buildClassicalNahuatlParticleSourceFrame(id).blockReason,
        ]),
        generated: honorificResults.map((result) => [
            result.authorizationStatus,
            result.formula,
            result.surface,
        ]),
    }, {
        direct: honorificTargets.map(() => [
            "blocked",
            "classical-particle-honorific-formation-required",
        ]),
        generated: [
            ["authorized", "ōtzin", "ōtzin"],
            ["authorized", "āuhtzin", "āuhtzin"],
            ["authorized", "ca no zotzin", "ca no zotzin"],
        ],
    });

    s.eq("the audit records every found conflict as resolved", {
        status: audit.status,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        reportAuthority: audit.reportAuthority,
    }, {
        status: "UNCONTRADICTED",
        resolved: 6,
        unresolved: 0,
        reportAuthority: false,
    });
    s.eq("all Lesson 3 atoms keep their accepted exact jobs", {
        total: ledger.records.length,
        accepted: ledger.records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        exact: ledger.records.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
    }, { total: 204, accepted: 204, exact: 204 });

    const ahzoZanShortcut =
        ctx.findClassicalNahuatlParticleCombinationShortcutEntry("l3-ahzo-zan");
    const ahzoZanResult = ctx.buildClassicalRuleLogicSurfaceFrame({
        ...baseVnc,
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        particleCombinationShortcutId: "l3-ahzo-zan",
    });
    s.eq("zo plus zan plus negative selects the exact canonical combination", {
        choiceSummary: ahzoZanShortcut.choiceSummary,
        particle: ahzoZanShortcut.particleChoice,
        adverbial: ahzoZanShortcut.adverbialId,
        polarity: ahzoZanShortcut.polarity,
        surface: ahzoZanResult.sentenceSurfaceDisplay,
    }, {
        choiceSummary: "zo + zan + negative",
        particle: "zo",
        adverbial: "l3-zan",
        polarity: "negative",
        surface: "Ahzo zan ninemi.",
    });

    for (const [id, expectedFormula] of formulaRows) {
        s.no(`${id} rejects a lost grammatical boundary mutation`,
            particle(id).formula === expectedFormula.replace(/[ #]/gu, ""));
    }
    s.no("negative context rejects a ca#-everywhere mutation",
        negative("l3-ma", "statement")[1] === "l3-ca-negative");
    s.no("honorific formation rejects the old short-vowel mutation",
        honorificResults[1].formula === "auhtzin");
    s.no("the exact shortcut observation rejects a missing combination",
        ctx.buildClassicalRuleLogicSurfaceFrame({
            ...baseVnc,
            subject: "1sg",
            mood: "indicative",
            tense: "present",
            particleCombinationShortcutId: "missing-combination",
        }).sentenceSurfaceDisplay === "Ahzo zan ninemi.");

    const lesson3Entries = ctx.getClassicalNahuatlParticleSourceEntries()
        .filter((entry) => entry.curriculumCoordinate.startsWith("3."));
    const normalLesson3Result = (entry) => {
        if (entry.functionScope === "honorificized") {
            return ctx.evaluateClassicalNahuatlParticleHonorificFormation(
                ctx.buildClassicalNahuatlParticleHonorificSourceFrame({
                    targetId: entry.id,
                })
            );
        }
        if (entry.id === "l3-ah-negative") {
            return ctx.requestClassicalNegativeParticleSelection({
                polarity: "negative",
                precedingParticleId: "",
                sentenceKind: "statement",
            }).particleResultFrame;
        }
        if (entry.id === "l3-ca-negative") {
            return ctx.requestClassicalNegativeParticleSelection({
                polarity: "negative",
                precedingParticleId: "l3-ma",
                sentenceKind: "wish",
            }).particleResultFrame;
        }
        return particle(entry.id, {
            speakerGender: entry.id === "l3-e-vocative"
                ? "male"
                : entry.id === "l3-no-interjection"
                    ? "female"
                    : "",
        });
    };
    const lesson3Results = lesson3Entries.map((entry) => [
        entry.id,
        normalLesson3Result(entry),
    ]);
    s.eq("all Lesson 3 options use the Lesson 3 sentence-formula notation", {
        optionCount: lesson3Results.length,
        blocked: lesson3Results
            .filter(([, result]) => result.authorizationStatus !== "authorized")
            .map(([id]) => id),
        plusSignsBetweenParticles: lesson3Results
            .filter(([, result]) => result.formula.includes(" + "))
            .map(([id]) => id),
        spacesAfterRightAttachment: lesson3Results
            .filter(([, result]) => /#\s/u.test(result.formula))
            .map(([id]) => id),
        canaries: Object.fromEntries(
            lesson3Results
                .filter(([id]) => [
                    "l3-e-vocative",
                    "l3-ahzo",
                    "l3-in-tla-ca",
                    "l3-otzin",
                    "l3-ca-no-zotzin",
                ].includes(id))
                .map(([id, result]) => [id, result.formula])
        ),
    }, {
        optionCount: 95,
        blocked: [],
        plusSignsBetweenParticles: [],
        spacesAfterRightAttachment: [],
        canaries: {
            "l3-e-vocative": "#e",
            "l3-ahzo": "ah#zo",
            "l3-in-tla-ca": "in tlā ca#",
            "l3-otzin": "ōtzin",
            "l3-ca-no-zotzin": "ca no zotzin",
        },
    });

    return s;
}

module.exports = { run };
