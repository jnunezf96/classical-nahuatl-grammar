"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function buildSource(ctx, stem, {
    verbClass = "A",
    sourceValence = "intransitive",
    objectPerson = "2sg",
} = {}) {
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        requestedSourceValence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: sourceValence === "intransitive" ? "none" : sourceValence,
        objectPerson: sourceValence === "intransitive" ? "" : objectPerson,
    });
}

function inspectOption(ctx, stem, {
    verbClass = "A",
    sourceValence = "intransitive",
    objectPerson = "2sg",
    targetStem,
    applicativeObjectKind = "specific-projective",
    applicativeObjectPerson = "1sg",
} = {}) {
    const source = buildSource(ctx, stem, {
        verbClass,
        sourceValence,
        objectPerson,
    });
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(
        source,
        { derivationType: "applicative" },
    );
    const option = inventory.options.find((candidate) => (
        candidate.targetStem === targetStem
    )) || null;
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(
        source,
        {
            derivationType: "applicative",
            optionId: option?.optionId || `missing:${stem}:${targetStem}`,
            applicativeObjectKind,
            applicativeObjectPerson,
        },
    );
    const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
        source,
        operation,
        { mood: "indicative", tense: "present", targetSubject: "3sg" },
    );
    const formula = machinery.resultFrame?.formulaRealization
        || machinery.formulaRealization
        || "";
    const typed = machinery.resultFrame?.finalTypedVncSlotFrame
        || machinery.finalTypedVncSlotFrame
        || null;
    const cues = ctx.getClassicalFormulaDerivedAnnotations(formula, typed, machinery);
    return { source, inventory, option, operation, machinery, formula, cues };
}

function summarize(entry) {
    return {
        target: entry.option?.targetStem || "",
        subtype: entry.option?.derivationSubtype || "",
        route: entry.option?.derivationRoute || "",
        targetClass: entry.option?.targetClass || "",
        counts: [
            entry.operation.participantTransformFrame?.sourceObjectCount,
            entry.operation.participantTransformFrame?.targetObjectCount,
        ],
    };
}

function evaluateSilentCuilia(ctx) {
    const request = {
        sourceStem: "cui",
        verbClass: "A",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceSubject: "3sg",
        subject: "3sg",
        mood: "indicative",
        tense: "preterit",
        requestedDerivation: "applicative",
        applicativeObjectKind: "specific-projective",
        applicativeObjectPerson: "1sg",
        requestedVoice: "active",
    };
    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const preview = application.evaluate(request);
    const option = preview.controlFrame?.derivationOptionInventory?.options
        ?.find((candidate) => candidate.targetStem === "cui-liā");
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        args: [{
            ...request,
            derivationOptionId: option?.optionId || "missing:cui-liā",
        }],
    }).canonicalResult;
}

function supplementSilentSourceObject(ctx, principal) {
    const referenceId = "referent:book";
    const supplement = ctx.buildClassicalNahuatlPossessiveNncFrame("cn-āmox", {
        subject: "3sg",
        possessor: "1sg",
        singularConnector: "0",
        nounstemRelationKind: "nonrelational",
        animacy: "nonanimate",
    });
    return ctx.evaluateClassicalNahuatlSupplementationOperation({
        coordinateId: "lesson26-silent-book",
        operationKind: "relation",
        principalClause: ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            principal,
            {
                referenceId: "principal:lesson26-silent-book",
                subjectReferenceId: "subject:lesson26-silent-book",
                objectReferenceIds: {
                    "source-object-1": referenceId,
                    "applicative-object": "referent:beneficiary",
                },
            },
        ),
        supplementClause: ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            supplement,
            { referenceId },
        ),
        options: {
            referenceMode: "shared",
            headRole: "object",
            principalObjectId: "source-object-1",
            supplementContactRole: "subject",
            order: "principal-first",
            adjunctor: "none",
        },
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson26_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson26-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson26-special-and-parallel-applicatives",
        "lesson26-single-object-applicatives",
        "lesson26-double-object-applicatives",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const hasCue = (entry, role) => entry.cues.some((cue) => cue.role === role);

    const temo = inspectOption(ctx, "temō", { targetStem: "temō-huiā" });
    const tlehco = inspectOption(ctx, "tlehcō", { targetStem: "tlehca-huiā" });
    const pano = inspectOption(ctx, "panō", { targetStem: "pana-huiā" });
    const namaca = inspectOption(ctx, "namaca", {
        sourceValence: "specific-projective",
        targetStem: "namaqui-l-tiā",
    });
    const nequi = inspectOption(ctx, "nequi", {
        verbClass: "B",
        sourceValence: "specific-projective",
        targetStem: "nec-tiā",
    });
    const cohuaOne = inspectOption(ctx, "cōhua", {
        sourceValence: "specific-projective",
        targetStem: "cōhu-iā",
    });
    const cohuaTwo = inspectOption(ctx, "cōhua", {
        sourceValence: "specific-projective",
        targetStem: "cōhui-liā",
    });

    const singleHuman = inspectOption(ctx, "paca", {
        targetStem: "paqui-liā",
        applicativeObjectKind: "nonspecific-human",
        applicativeObjectPerson: "",
    });
    const singleSpecific = inspectOption(ctx, "paca", {
        targetStem: "paqui-liā",
    });
    const singleReflexive = inspectOption(ctx, "paca", {
        targetStem: "paqui-liā",
        applicativeObjectKind: "reflexive",
        applicativeObjectPerson: "",
    });

    const doubleSpecific = inspectOption(ctx, "mati", {
        verbClass: "B",
        sourceValence: "specific-projective",
        targetStem: "machi-liā",
    });
    const doubleReflexive = inspectOption(ctx, "mati", {
        verbClass: "B",
        sourceValence: "mainline-reflexive",
        targetStem: "machi-liā",
    });
    const silentCuilia = evaluateSilentCuilia(ctx);
    const silentCluster = silentCuilia.resultFrame?.selectedMachineryFrame
        ?.targetObjectClusterFrame || null;
    const supplementation = supplementSilentSourceObject(ctx, silentCuilia);

    const observations = {
        "lesson26-special-and-parallel-applicatives": {
            finalO: [temo, tlehco, pano].map(summarize),
            rareTia: [namaca, nequi].map(summarize),
            parallel: [cohuaOne, cohuaTwo].map(summarize),
            parallelChoices: cohuaOne.inventory.options.map((option) => [
                option.derivationSubtype,
                option.targetStem,
            ]),
            parallelChoiceRequired: cohuaOne.inventory.selectionRequired,
            classAndParticipants: [temo, namaca, nequi, cohuaOne, cohuaTwo]
                .every((entry) => (
                    entry.option?.targetClass === "C"
                    && entry.operation.participantTransformFrame?.addedObjectRequest
                        ?.governor === "applicative"
                )),
            cue: [temo, tlehco, pano, namaca, nequi, cohuaTwo]
                .every((entry) => hasCue(entry, "lesson26-special-and-parallel-applicatives")),
        },
        "lesson26-single-object-applicatives": {
            counts: [singleHuman, singleSpecific, singleReflexive]
                .map((entry) => summarize(entry).counts),
            participants: [singleHuman, singleSpecific, singleReflexive]
                .map((entry) => entry.operation.participantTransformFrame?.addedObjectRequest),
            formulas: [singleHuman.formula, singleSpecific.formula, singleReflexive.formula],
            subjectPreserved: [singleHuman, singleSpecific, singleReflexive]
                .every((entry) => entry.operation.participantTransformFrame
                    ?.sourceSubjectPreservedByApplicative === true),
            cue: [singleHuman, singleSpecific, singleReflexive]
                .every((entry) => hasCue(entry, "lesson26-single-object-applicatives")),
        },
        "lesson26-double-object-applicatives": {
            specific: {
                counts: summarize(doubleSpecific).counts,
                requests: doubleSpecific.operation.participantTransformFrame?.targetObjectRequests,
                formula: doubleSpecific.formula,
            },
            reflexive: {
                retained: doubleReflexive.operation.participantTransformFrame
                    ?.retainedTargetObjectRequests?.[0],
                rule: doubleReflexive.operation.participantTransformFrame
                    ?.retainedSourceReflexiveShuntlineRuleFrame?.ruleId || "",
                formula: doubleReflexive.formula,
            },
            silent: {
                formula: silentCuilia.resultFrame?.formulaRealization || "",
                positions: (silentCluster?.positions || []).map((position) => [
                    position.objectId,
                    position.prominence,
                    position.sounded,
                    position.carrier,
                    position.silencingRule,
                ]),
            },
            supplementation: {
                status: supplementation.authorizationStatus,
                valid: ctx.isClassicalNahuatlSupplementationFrame(supplementation),
                head: supplementation.referenceFrame?.principalHead?.id || "",
                silent: supplementation.referenceFrame?.principalHead?.silent,
                formula: supplementation.formulaRealization,
            },
            cue: hasCue(doubleSpecific, "lesson26-double-object-applicatives")
                && hasCue(doubleReflexive, "lesson26-double-object-applicatives"),
        },
    };
    const expected = {
        "lesson26-special-and-parallel-applicatives": {
            finalO: [
                { target: "temō-huiā", subtype: "type-two", route: "type-two-final-o-direct-huia", targetClass: "C", counts: [0, 1] },
                { target: "tlehca-huiā", subtype: "type-two", route: "type-two-final-o-replacive-huia", targetClass: "C", counts: [0, 1] },
                { target: "pana-huiā", subtype: "type-two", route: "type-two-final-o-replacive-huia", targetClass: "C", counts: [0, 1] },
            ],
            rareTia: [
                { target: "namaqui-l-tiā", subtype: "type-three", route: "type-three-applicative-from-lo-nonactive-exact", targetClass: "C", counts: [1, 2] },
                { target: "nec-tiā", subtype: "type-three", route: "type-three-applicative-from-o-nonactive-exact", targetClass: "C", counts: [1, 2] },
            ],
            parallel: [
                { target: "cōhu-iā", subtype: "type-one", route: "type-one-final-vowel-replacement-optional", targetClass: "C", counts: [1, 2] },
                { target: "cōhui-liā", subtype: "type-two", route: "type-two-parallel-final-hua-to-hui-lia-exact", targetClass: "C", counts: [1, 2] },
            ],
            parallelChoices: [
                ["type-two", "cōhui-liā"],
                ["type-one", "cōhu-iā"],
            ],
            parallelChoiceRequired: true,
            classAndParticipants: true,
            cue: true,
        },
        "lesson26-single-object-applicatives": {
            counts: [[0, 1], [0, 1], [0, 1]],
            participants: [
                { objectId: "applicative-object", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 1 },
                { objectId: "applicative-object", objectKind: "specific-projective", objectPerson: "1sg", governor: "applicative", derivationalLevel: 1 },
                { objectId: "applicative-object", objectKind: "reflexive", objectPerson: "", governor: "applicative", derivationalLevel: 1 },
            ],
            formulas: [
                "#0-0+tē(paqui-lia)0+0-0#",
                "#0-0+n-ēch(paqui-lia)0+0-0#",
                "#0-0+m-o(paqui-lia)0+0-0#",
            ],
            subjectPreserved: true,
            cue: true,
        },
        "lesson26-double-object-applicatives": {
            specific: {
                counts: [1, 2],
                requests: [
                    { objectId: "source-object-1", objectKind: "specific-projective", objectPerson: "2sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "applicative-object", objectKind: "specific-projective", objectPerson: "1sg", governor: "applicative", derivationalLevel: 2 },
                ],
                formula: "#0-0+n-ēch+⎕-⎕(machi-lia)0+0-0#",
            },
            reflexive: {
                retained: { objectId: "source-object-1", objectKind: "reflexive", objectPerson: "nonfirst-common", governor: "directive", derivationalLevel: 1 },
                rule: "cn-vnc-retained-source-mainline-reflexive-to-shuntline-ne",
                formula: "#0-0+n-ēch+ne(machi-lia)0+0-0#",
            },
            silent: {
                formula: "#0-0+n-ēch+⎕-0(cui-lih)0+⎕-0#",
                positions: [
                    ["applicative-object", "mainline", true, "n-ēch", ""],
                    ["source-object-1", "shuntline", false, "0-0", "incompatible-specific-projective-silenced"],
                ],
            },
            supplementation: {
                status: "authorized",
                valid: true,
                head: "source-object-1",
                silent: true,
                formula: "#0-0+n-ēch+⎕-0(cui-lih)0+⎕-0# + #0-0+n-o(cn-āmox)0-0#",
            },
            cue: true,
        },
    };
    const mutations = {
        "lesson26-special-and-parallel-applicatives": [
            temo.option?.targetStem !== "temō-huiā",
            tlehco.option?.targetStem !== "tlehca-huiā",
            namaca.option?.targetStem !== "namaqui-l-tiā",
            cohuaOne.inventory.selectionRequired !== true,
            cohuaOne.inventory.options.length !== 2,
            !hasCue(cohuaTwo, "lesson26-special-and-parallel-applicatives"),
        ],
        "lesson26-single-object-applicatives": [
            singleHuman.operation.participantTransformFrame?.targetObjectCount !== 1,
            singleSpecific.operation.participantTransformFrame?.addedObjectRequest?.objectPerson !== "1sg",
            singleReflexive.operation.participantTransformFrame?.addedObjectRequest?.objectKind !== "reflexive",
            !hasCue(singleSpecific, "lesson26-single-object-applicatives"),
        ],
        "lesson26-double-object-applicatives": [
            doubleSpecific.operation.participantTransformFrame?.targetObjectCount !== 2,
            doubleReflexive.operation.participantTransformFrame
                ?.retainedSourceReflexiveShuntlineRuleFrame?.targetObjectPerson !== "nonfirst-common",
            silentCluster?.positions?.find((position) => position.objectId === "source-object-1")
                ?.sounded !== false,
            supplementation.authorizationStatus !== "authorized",
            !hasCue(doubleSpecific, "lesson26-double-object-applicatives"),
        ],
    };

    s.eq("accepted Lesson 26 Groups 7-9 cover every atom once", {
        accepted: records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        records: records.length,
        both: writing.length,
        readingOnly: records.filter((record) => record.proposedDirection === "READING_ONLY").length,
        unique: new Set(records.map((record) => record.atomId)).size,
    }, { accepted: 89, records: 89, both: 39, readingOnly: 50, unique: 89 });
    for (const record of writing) {
        s.eq(
            `${record.atomId} has its exact accepted application job`,
            observations[record.reviewGroupId],
            expected[record.reviewGroupId],
        );
        s.eq(
            `mutation:${record.atomId} fails when its accepted job is contradicted`,
            mutations[record.reviewGroupId].some(Boolean),
            false,
        );
    }
    return s;
}

module.exports = { run };
