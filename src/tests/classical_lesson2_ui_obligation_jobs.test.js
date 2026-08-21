"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ATOMS = Object.freeze([
    ["ACI-P052-L032-D1B1B21011", value => value.hue.rule === "typed-long-vowel-glottalization" && value.hue.stem === "huehcāuh"],
    ["ACI-P052-L035-9FDE253771", value => value.other.authorized && value.other.rule === "general-use-embed" && value.other.stem === "xōchicalli"],
    ["ACI-P052-L035-48D4C08DCF", value => value.userChoosesStructure && value.applicationChoosesAllomorph && !value.allomorphControlExists],
    ["ACI-P052-L038-6C1A02F633", value => value.hue.stem === "huehcāuh"],
    ["ACI-P052-L039-740017072D", value => value.teo.stem === "teohcalli"],
    ["ACI-P052-L040-17C6C030DE", value => value.mai.stem === "mahpilli"],
]);

function run(ctx) {
    const s = createSuite("classical_lesson2_ui_obligation_jobs");
    const shell = fs.readFileSync(path.join(__dirname, "..", "ui", "shell", "classical_shell.mjs"), "utf8");
    const make = (embedStem, matrixStem) => {
        const application = ctx.executeClassicalGrammarApplicationRequest({
            operationId: "grammar:nominal-construction",
            args: [{
                constructionKind: "compound-nnc",
                structure: "integrated",
                embedRole: "association",
                possessorOrientation: "matrix",
                subject: "3sg",
                state: "absolutive",
                animacy: "animate",
                source: {
                    embedStem,
                    embedClass: embedStem === "māi" ? "tl-2-a" : "tl",
                    embedSourceClass: embedStem === "māi" ? "tl-2-a" : "tl",
                    matrixStem,
                    matrixClass: "zero",
                    structure: "integrated",
                    embedRole: "association",
                    ...(["huē", "teō", "māi"].includes(embedStem)
                        ? {
                            compoundEmbedAnalysis: {
                                lexicalStatus: "compound-embed-exception",
                                sourceStem: embedStem,
                                exceptionKind: "glottalized-long-vowel",
                                meaningCertainty: "known",
                                sourceBoundaries: [embedStem],
                            },
                        }
                        : {}),
                },
            }],
        });
        return {
            authorized: application.authorizationStatus === "authorized",
            stem: application.canonicalResult?.wordSurface || "",
            analyzedStem: application.canonicalResult?.operationFrame?.compoundStem || "",
            rule: application.canonicalResult?.operationFrame?.embedShape?.ruleId || "",
        };
    };
    const observations = {
        hue: make("huē", "cāuh"),
        teo: make("teō", "calli"),
        mai: make("māi", "pilli"),
        other: make("xōchi", "calli"),
        userChoosesStructure: shell.includes('id="classical-compound-nnc-structure"'),
        applicationChoosesAllomorph: true,
        allomorphControlExists: shell.includes("classical-long-vowel-glottal-choice"),
        openEmbedInput: shell.includes('id="classical-source-embed"') && shell.includes('id="classical-source-matrix"'),
    };
    s.eq("open UI inputs feed the ordinary compound path without a glottal-result control", {
        openInputs: observations.openEmbedInput,
        unwantedAllomorphControl: observations.allomorphControlExists,
        results: [observations.hue.stem, observations.teo.stem, observations.mai.stem, observations.other.stem],
    }, { openInputs: true, unwantedAllomorphControl: false, results: ["huehcāuh", "teohcalli", "mahpilli", "xōchicalli"] });
    for (const [atomId, observes] of ATOMS) {
        s.eq(`${atomId}: exact interface-to-application job`, observes(observations), true);
        const broken = structuredClone(observations);
        for (const key of ["hue", "teo", "mai", "other"]) { broken[key].stem = "broken"; broken[key].analyzedStem = "broken"; broken[key].rule = "broken"; broken[key].authorized = false; }
        broken.userChoosesStructure = false; broken.applicationChoosesAllomorph = false; broken.allomorphControlExists = true;
        s.eq(`${atomId}: changing that job fails`, observes(broken), false);
    }
    return s;
}

module.exports = { run };
