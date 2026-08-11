"use strict";

const { createSuite } = require("./runner");

const SYLLABLE_ATOMS = Object.freeze([
    ["ACI-P046-L021-40B6D61100", value => value.cāna.count === 2 && value.cāna.vowels === 2],
    ["ACI-P046-L022-9665D9D2EE", value => value.shapes.join(",") === "V,CV,VC,CVC"],
    ["ACI-P046-L022-9665D9D2EE-02", value => value.open.join(",") === "V,CV"],
    ["ACI-P046-L022-9665D9D2EE-03", value => value.closed.join(",") === "VC,CVC"],
    ["ACI-P046-L024-D0D789C3B1", value => value.a.division === "a" && value.a.shapes[0] === "V"],
    ["ACI-P046-L025-4E77FB10D4", value => value.nō.division === "nō" && value.nō.shapes[0] === "CV"],
    ["ACI-P046-L026-70651956D2", value => value.oh.division === "oh" && value.oh.shapes[0] === "VC"],
    ["ACI-P046-L027-8FBF6FAAED", value => value.pan.division === "pan" && value.pan.shapes[0] === "CVC"],
    ["ACI-P046-L029-25646A541C", value => value.cāna.division === "cā-na"],
    ["ACI-P046-L029-25646A541C-02", value => value.cāna.division === "cā-na"],
    ["ACI-P046-L029-25646A541C-03", value => value.nāhui.division === "nā-hui"],
    ["ACI-P046-L031-4CF7032CCC", value => value.teōtl.division === "te-ōtl"],
    ["ACI-P046-L031-4CF7032CCC-02", value => value.teōtl.division === "te-ōtl"],
    ["ACI-P046-L036-545DFECF5A", value => value.initialCluster.blocked && value.finalCluster.blocked],
    ["ACI-P046-L037-BD23B5712F", value => value.ōmpa.division === "ōm-pa" && value.calli.division === "cal-li"],
    ["ACI-P046-L037-BD23B5712F-02", value => value.ōmpa.division === "ōm-pa"],
    ["ACI-P046-L037-BD23B5712F-03", value => value.calli.division === "cal-li"],
    ["ACI-P046-L037-BD23B5712F-04", value => value.iztatl.division === "iz-tatl"],
    ["ACI-P046-L040-0A22B91DC3", value => value.atzan.division === "a-tzan" && value.tōchtli.division === "tōch-tli"],
    ["ACI-P046-L040-0A22B91DC3-02", value => value.atzan.division === "a-tzan"],
    ["ACI-P046-L040-0A22B91DC3-03", value => value.tōchtli.division === "tōch-tli"],
]);

const U_ATOMS = Object.freeze([
    ["ACI-P046-L032-8E0B4956C5-02", value => value.standaloneU.blocked && value.nāuh.count === 1],
    ["ACI-P046-L032-8E0B4956C5-03", value => value.quitzacuia.authorized && value.nāuh.authorized && value.iucci.authorized],
    ["ACI-P046-L032-8E0B4956C5-04", value => value.quitzacuia.division === "qui-tza-cui-a"],
    ["ACI-P046-L032-8E0B4956C5-05", value => value.nāuh.division === "nāuh" && value.nāuh.count === 1],
    ["ACI-P046-L032-8E0B4956C5-06", value => value.iucci.division === "iuc-ci"],
    ["ACI-P046-L032-8E0B4956C5-07", value => value.nocuauh.division === "no-cuauh"],
]);

const SUPPORT_ATOMS = Object.freeze([
    ["ACI-P047-L002-BB982A730E", value => value.medialCluster === "cicaqui"],
    ["ACI-P047-L002-9154CBB67D", value => value.medialCluster === "cicaqui"],
    ["ACI-P047-L005-DE55B2626F", value => value.initialCluster === "xitlāhualō"],
    ["ACI-P047-L006-941AE6C38C", value => value.medialCluster === "cicaqui"],
    ["ACI-P047-L007-B9B2E97833", value => value.finalCluster === "oquichtli"],
    ["ACI-P047-L008-FA751C6F0E", value => value.dropInitial === "tla"],
]);

function run(ctx) {
    const s = createSuite("classical_lesson2_syllable_support_jobs");
    const syllabify = word => {
        const application = ctx.executeClassicalGrammarApplicationRequest({
            operationId: "phonology:syllabify",
            args: [word],
        });
        const result = application.canonicalResult;
        return {
            authorized: application.authorizationStatus === "authorized"
                && ctx.isClassicalNahuatlTranscriptionAnalysisFrame(result),
            blocked: application.authorizationStatus === "blocked",
            division: result?.division || "",
            count: result?.syllableCount || 0,
            vowels: result?.vowelCount || 0,
            shapes: result?.syllables?.map(value => value.shape) || [],
        };
    };
    const observed = {
        a: syllabify("a"), nō: syllabify("nō"), oh: syllabify("oh"), pan: syllabify("pan"),
        cāna: syllabify("cāna"), nāhui: syllabify("nāhui"), teōtl: syllabify("teōtl"),
        ōmpa: syllabify("ōmpa"), calli: syllabify("calli"), iztatl: syllabify("iztatl"),
        atzan: syllabify("atzan"), tōchtli: syllabify("tōchtli"),
        quitzacuia: syllabify("quitzacuia"), nāuh: syllabify("nāuh"),
        iucci: syllabify("iucci"), nocuauh: syllabify("nocuauh"),
        standaloneU: syllabify("u"), initialCluster: syllabify("ppa"), finalCluster: syllabify("atlch"),
        shapes: ["V", "CV", "VC", "CVC"], open: ["V", "CV"], closed: ["VC", "CVC"],
    };
    s.eq("syllable jobs use the ordinary application request path", {
        ordinaryExamplesAuthorized: ["a", "nō", "oh", "pan", "cāna", "nāhui", "teōtl", "ōmpa", "calli", "iztatl", "atzan", "tōchtli", "quitzacuia", "nāuh", "iucci", "nocuauh"]
            .every(key => observed[key].authorized),
        standaloneUBlocked: observed.standaloneU.blocked,
        initialClusterBlocked: observed.initialCluster.blocked,
        finalClusterBlocked: observed.finalCluster.blocked,
    }, { ordinaryExamplesAuthorized: true, standaloneUBlocked: true, initialClusterBlocked: true, finalClusterBlocked: true });

    const support = options => ctx.executeClassicalGrammarApplicationRequest({
        operationId: "phonology:supportive-vowel",
        args: [options],
    }).canonicalResult;
    const supportObserved = {
        initialCluster: support({ sourceSegments: ["x", "tlāhualō"], insertionPosition: "between", tokenLevelLegal: false }).outputForm,
        medialCluster: support({ sourceSegments: ["c", "caqui"], insertionPosition: "between", tokenLevelLegal: false }).outputForm,
        finalCluster: support({ sourceSegments: ["oquich", "tl"], insertionPosition: "after", tokenLevelLegal: false }).outputForm,
        dropInitial: support({ sourceSegments: ["i", "tla"], insertionPosition: "before", supportiveIndex: 0, supportiveVowelNeeded: false }).outputForm,
    };
    s.eq("supportive i is added or removed through the ordinary application request path", supportObserved, {
        initialCluster: "xitlāhualō", medialCluster: "cicaqui", finalCluster: "oquichtli", dropInitial: "tla",
    });

    for (const [atomId, observes] of [...SYLLABLE_ATOMS, ...U_ATOMS]) {
        s.eq(`${atomId}: exact syllable job`, observes(observed), true);
        const broken = structuredClone(observed);
        for (const value of Object.values(broken)) {
            if (value && typeof value === "object" && "division" in value) {
                value.division = `broken-${value.division}`;
                value.count = 999;
                value.vowels = 999;
                value.authorized = false;
                value.shapes = ["broken"];
            }
        }
        broken.shapes = ["broken"];
        broken.open = ["broken"];
        broken.closed = ["broken"];
        broken.standaloneU.blocked = false;
        broken.initialCluster.blocked = false;
        broken.finalCluster.blocked = false;
        s.eq(`${atomId}: changing the required syllable behavior fails`, observes(broken), false);
    }
    for (const [atomId, observes] of SUPPORT_ATOMS) {
        s.eq(`${atomId}: exact supportive-i job`, observes(supportObserved), true);
        const broken = Object.fromEntries(Object.keys(supportObserved).map(key => [key, `broken-${supportObserved[key]}`]));
        s.eq(`${atomId}: changing supportive i fails`, observes(broken), false);
    }
    return s;
}

module.exports = { run };
