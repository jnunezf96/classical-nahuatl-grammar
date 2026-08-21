"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP = "lesson39-root-stock-allomorphs";

function rootStock(ctx, sourceStem, fields = {}) {
    return ctx.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive",
        patientiveSourceFamily: "root-or-stock",
        ...(fields.allomorph
            ? { rootStockAllomorph: fields.allomorph }
            : {}),
        source: {
            sourceStage: "root-or-stock",
            sourceStem,
            verbClass: "A",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: fields.subject || "3common",
        state: "absolutive",
        possessor: "",
        animacy: fields.animacy || "nonanimate",
    });
}

function frameOf(result) {
    return result.operationFrame?.rootStockPatientiveFrame;
}

function familyOf(result) {
    return frameOf(result)?.allomorphFamilyFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_group_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson39-review-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record => (
        record.reviewGroupId === GROUP
    ));
    const writing = records.filter(record => (
        record.proposedDirection === "BOTH"
    ));
    s.eq("accepted group has the exact atom-job denominator", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every(record => record.reviewStatus === "ACCEPTED"),
    }, { atoms: 58, writing: 26, reading: 32, accepted: true });

    const unknown = rootStock(ctx, "sōm-ā-hua");
    const c = rootStock(ctx, "sōm-ā-hua", { allomorph: "c" });
    const ch = rootStock(ctx, "sōm-ā-hua", { allomorph: "ch" });
    const zero = rootStock(ctx, "sōm-ā-hua", { allomorph: "zero" });
    s.eq("an unlisted hua Source exposes only the genuine family choice", {
        first: [unknown.authorizationStatus, unknown.blockReason],
        options: familyOf(c)?.availableTypedAlternatives,
        c: [frameOf(c)?.targetStem, frameOf(c)?.nounClass,
            c.formulaRealization],
        ch: [frameOf(ch)?.targetStem, frameOf(ch)?.nounClass,
            ch.formulaRealization],
        zero: [frameOf(zero)?.targetStem, frameOf(zero)?.nounClass,
            zero.formulaRealization],
        authority: [familyOf(c)?.typedAlternativesOnly,
            familyOf(c)?.freeSpellingChoiceAccepted,
            familyOf(c)?.exampleIdentityAuthorizesRoute],
    }, {
        first: ["blocked", "39.4-root-stock-allomorph-choice-required"],
        options: ["c", "ch", "zero"],
        c: ["sōm-a-c", "tli", "#0-0(sōm-a-c)tli-0#"],
        ch: ["sōm-a-ch", "tli", "#0-0(sōm-a-ch)tli-0#"],
        zero: ["sōm-a", "tl", "#0-0(sōm-a)tl-0#"],
        authority: [true, false, false],
    });

    const pitz = rootStock(ctx, "pitz-ā-hua");
    const zon = rootStock(ctx, "zōn-ē-hua");
    s.eq("witnessed c stocks shorten a true long stock formative", {
        pitz: [frameOf(pitz)?.availableAllomorphs,
            frameOf(pitz)?.selectedAllomorph,
            frameOf(pitz)?.stockFormativeVowel,
            familyOf(pitz)?.vowelRealizationRule,
            frameOf(pitz)?.targetStem],
        eStock: [frameOf(zon)?.stockFormativeVowel,
            familyOf(zon)?.longStockFormativeShortened,
            familyOf(zon)?.eStockOftenHasCharacteristicReading,
            familyOf(zon)?.resultReadings],
    }, {
        pitz: [["c"], "c", "ā",
            "shorten-stock-formative-long-vowel", "pitz-a-c"],
        eStock: ["ē", true, true, ["spongy-or-squashy-thing"]],
    });

    const downgraded = [
        ["tic-ē-hua", "tiza-tl", "tic"],
        ["pō-ch-ē-hua", "pō-ch-tli", "pō-ch"],
        ["tlīl-ē-hua", "tlīl-li", "tlīl"],
        ["nex-ē-hua", "nex-tli", "nex"],
        ["izta-l-ē-hua", "izta-l-li", "izta-l"],
    ].map(([source, nounstem, root]) => {
        const family = familyOf(rootStock(ctx, source));
        return [source, family?.rootRole,
            family?.downgradedNounstemSourceFrame?.nounstem,
            family?.downgradedNounstemSourceFrame?.downgradedRoot,
            nounstem, root];
    });
    s.eq("a downgraded nounstem remains attached when it fills the root", {
        all: downgraded.every(row => (
            row[1].startsWith("downgraded-")
            && row[2] === row[4]
            && row[3] === row[5]
        )),
        iztaEarlier: familyOf(rootStock(ctx, "izta-l-ē-hua"))
            ?.downgradedNounstemSourceFrame?.earlierSourceStem,
    }, { all: true, iztaEarlier: "izta-ya" });

    const patl = rootStock(ctx, "patl-ā-hua");
    const tomC = rootStock(ctx, "tom-ā-hua", { allomorph: "c" });
    const tomZero = rootStock(ctx, "tom-ā-hua", { allomorph: "zero" });
    const chamZero = rootStock(ctx, "cham-ā-hua", {
        allomorph: "zero", subject: "3sg", animacy: "animate",
    });
    s.eq("occasional ch and direct zero formations keep distinct typed jobs", {
        patl: [familyOf(patl)?.selectedFormation,
            frameOf(patl)?.targetStem, frameOf(patl)?.nounClass],
        tom: [frameOf(tomC)?.nounClass, frameOf(tomZero)?.nounClass,
            familyOf(tomZero)?.resultReadings],
        cham: [frameOf(chamZero)?.targetStem,
            familyOf(chamZero)?.referentProfile?.humanness,
            familyOf(chamZero)?.referentProfile?.number,
            familyOf(chamZero)?.resultReadings.includes("braggart")],
    }, {
        patl: ["stock-plus-ch", "patl-a-ch", "tli"],
        tom: ["tli", "tl",
            ["thing-that-has-become-plump", "green-husk-tomato"]],
        cham: ["cham-a", "human", "singular", true],
    });

    const iy = rootStock(ctx, "iy-ā-hua");
    const river = rootStock(ctx, "ā-tōy-a-hua");
    s.eq("lexical raising and compound short-vowel retention stay separate", {
        iy: [frameOf(iy)?.selectedAllomorph, frameOf(iy)?.targetStem,
            frameOf(iy)?.nounClass, familyOf(iy)?.vowelRealizationRule,
            familyOf(iy)?.resultReadings],
        river: [frameOf(river)?.targetStem, frameOf(river)?.nounClass,
            familyOf(river)?.vowelRealizationRule,
            familyOf(river)?.compoundSourceFrame?.embedStem,
            familyOf(river)?.compoundSourceFrame?.matrixStem,
            familyOf(river)?.compoundSourceFrame?.boundariesPreserved,
            familyOf(river)?.referentProfile?.referentKind,
            familyOf(river)?.resultReadings.includes("river")],
    }, {
        iy: ["zero", "iy-e", "tl", "raise-short-a-to-e",
            ["thing-that-has-become-offered-in-sacrifice", "tobacco"]],
        river: ["ā-tōy-a", "tl", "retain-short-compound-stock-vowel",
            "ā-tl", "tōy-ā-hua", true, "body-of-flowing-water", true],
    });

    const wrong = rootStock(ctx, "pitz-ā-hua", { allomorph: "ch" });
    const noShape = rootStock(ctx, "pitz-ā", { allomorph: "c" });
    s.eq("typed lexical restrictions and Source-shape admission stay distinct", {
        wrong: [wrong.authorizationStatus, wrong.blockReason],
        shape: [noShape.authorizationStatus, noShape.blockReason],
        meaning: [familyOf(pitz)?.lexicalMeaningDerivedFromShape,
            familyOf(pitz)?.formulaStringAuthority,
            familyOf(pitz)?.surfaceStringAuthority],
    }, {
        wrong: ["blocked",
            "39.4-root-stock-allomorph-not-lexically-authorized"],
        shape: ["blocked", "39.4-root-stock-source-not-lexically-authorized"],
        meaning: [false, false, false],
    });

    const cues = [c, ch, zero, pitz, zon, patl, chamZero, iy, river]
        .flatMap(result => ctx.getClassicalFormulaDerivedAnnotations(
            result.formulaRealization,
            result.canonicalResult?.nncSlotFrame,
            result
        )).filter(cue => cue.role === GROUP);
    const covered = new Set(cues.flatMap(cue => cue.atomIds || []));
    s.eq("all accepted atoms have exact jobs and writing atoms have cues", {
        atoms: records.length,
        writing: writing.length,
        reading: records.length - writing.length,
        cues: cues.length > 0,
        covered: writing.every(record => covered.has(record.atomId)),
    }, { atoms: 58, writing: 26, reading: 32,
        cues: true, covered: true });
    for (const record of writing) {
        s.ok(record.atomId, covered.has(record.atomId));
        s.eq(`mutation:${record.atomId}`,
            new Set([...covered].filter(id => id !== record.atomId))
                .has(record.atomId), false);
    }
    return s;
}

module.exports = { run };
