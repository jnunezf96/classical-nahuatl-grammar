"use strict";

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("canvas_restart_atom_099");
    const buildSource = (stem, verbClass, sourceValence) =>
        ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            verbClass,
            perfectiveClass: verbClass,
            valence: sourceValence,
            transitivity: sourceValence === "intransitive"
                ? "intransitive"
                : "transitive",
            objectKind: sourceValence === "intransitive"
                ? "none"
                : "specific-projective",
            objectPerson: sourceValence === "intransitive" ? "" : "2sg",
        });

    const nemi = ctx.buildClassicalNahuatlVerbstemClassFrame("nemi", {
        subject: "3sg",
        mood: "indicative",
        tense: "preterit",
        verbClass: "B",
        perfectiveClass: "B",
        valence: "intransitive",
        transitivity: "intransitive",
        objectKind: "none",
    });
    const mati = buildSource("mati", "B", "intransitive");
    const matiInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        mati,
        { derivationType: "causative" },
    );
    const machtia = matiInventory.options.find(
        option => option.targetStem === "mach-tiā",
    );
    const patla = buildSource("pa-tla", "A", "specific-projective");
    const patlaInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        patla,
        { derivationType: "applicative" },
    );
    const patilia = patlaInventory.options.find(
        option => option.targetStem === "pa-ti-liā",
    );
    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const nemiResult = application.evaluate({
        sourceStem: "nemi",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "preterit",
        requestedDerivation: "direct",
        requestedSourceVoice: "active",
    });
    const matiRequest = {
        sourceStem: "mati",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        requestedDerivation: "causative",
        requestedSourceVoice: "active",
        causativeObjectKind: "specific-projective",
        causativeResultSubject: "3sg",
    };
    const machtiaResult = application.evaluate({
        ...matiRequest,
        derivationOptionId: machtia?.optionId || "missing-mach-tiā",
    });
    const patlaRequest = {
        sourceStem: "pa-tla",
        verbClass: "A",
        sourceValence: "specific-projective",
        subject: "3sg",
        objectKind: "specific-projective",
        objectPerson: "2sg",
        requestedDerivation: "applicative",
        requestedSourceVoice: "active",
        applicativeObjectKind: "specific-projective",
        applicativeObjectPerson: "3sg",
    };
    const patiliaResult = application.evaluate({
        ...patlaRequest,
        derivationOptionId: patilia?.optionId || "missing-pa-ti-liā",
    });

    const relation = value => value ? {
        phoneme: value.phoneme,
        phone: value.phone,
        relation: value.relation,
        atomId: value.atomId,
    } : null;

    s.eq("atom 99 controls three real verbstem Results", {
        perfective: {
            status: nemiResult.authorizationStatus,
            source: nemiResult.normalizedRequest?.sourceStem,
            result: nemiResult.resultFrame?.selectedMachineryFrame
                ?.perfectiveStem,
            relation: relation(
                nemiResult.resultFrame?.selectedMachineryFrame
                    ?.classRuleFrame?.phoneRepertoryRelation,
            ),
        },
        causative: {
            status: machtiaResult.authorizationStatus,
            source: machtiaResult.normalizedRequest?.sourceStem,
            result: machtiaResult.resultFrame?.selectedMachineryFrame
                ?.stem || "",
            relation: relation(
                machtiaResult.resultFrame?.selectedMachineryFrame
                    ?.derivationOperationFrame?.selectedOption
                    ?.typeTwoInternalBridgeFrame?.phoneRepertoryRelation,
            ),
        },
        applicative: {
            status: patiliaResult.authorizationStatus,
            source: patiliaResult.normalizedRequest?.sourceStem,
            result: patiliaResult.resultFrame?.selectedMachineryFrame
                ?.stem || "",
            relation: relation(
                patiliaResult.resultFrame?.selectedMachineryFrame
                    ?.derivationOperationFrame?.selectedOption
                    ?.phoneRepertoryRelation,
            ),
        },
    }, {
        perfective: {
            status: "authorized",
            source: "nemi",
            result: "nen",
            relation: {
                phoneme: "m", phone: "n", relation: "irregular",
                atomId: "ACI-P025-L029-B44E4F4DFD",
            },
        },
        causative: {
            status: "authorized",
            source: "mati",
            result: "mach-tiā",
            relation: {
                phoneme: "t", phone: "ch", relation: "irregular",
                atomId: "ACI-P025-L029-B44E4F4DFD",
            },
        },
        applicative: {
            status: "authorized",
            source: "pa-tla",
            result: "pa-ti-liā",
            relation: {
                phoneme: "tl", phone: "t", relation: "irregular",
                atomId: "ACI-P025-L029-B44E4F4DFD",
            },
        },
    });
    return s;
}

module.exports = { run };
