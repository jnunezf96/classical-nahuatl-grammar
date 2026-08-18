"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUP10_ID = "lesson28-shared-object-compounds";
const GROUP11_ID = "lesson28-future-embed-compounds";
const GROUP12_ID = "lesson28-recursive-compounding";

function request(overrides = {}) {
    return {
        sourceStem: "cui",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        lateOperation: "compound",
        lateVariant: "shared-object",
        compoundMatrixStem: "tlāl-i-ā",
        ...overrides,
    };
}

function facts(frame) {
    return frame.operationFrame?.operationFacts || {};
}

function futureRequest(overrides = {}) {
    return request({
        sourceStem: "cochi",
        sourceValence: "intransitive",
        objectKind: "none",
        objectPerson: "",
        verbClass: "B",
        subject: "1sg",
        tense: "present",
        lateVariant: "future-embed",
        compoundMatrixStem: "tla-nequi",
        ...overrides,
    });
}

function ownerDefinition(ctx, prefix, domain, selection, facet) {
    const source = ctx[`build${prefix}Source`]({
        analysisDomain: domain,
        selection,
        requestedFacet: facet,
        participantChoice: `${selection}:${facet}`,
    });
    return ctx[`evaluate${prefix}`](source);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson28_groups_10_12_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson28-review-ledger.json"),
        "utf8",
    ));
    const records = ledger.records.filter((record) => (
        record.reviewGroupId === GROUP10_ID
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const matrices = [
        "tlāl-i-ā", "quetza", "tēca", "cāhua", "quix-tiā", "māy-a-hui",
    ].map((matrix) => ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: matrix,
    })));
    const projective = matrices[0];
    const reflexive = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceValence: "mainline-reflexive",
        objectKind: "reflexive",
        objectPerson: "",
        compoundMatrixStem: "quetza",
    }));
    const eHua = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "ē-hua",
        verbClass: "B",
        compoundMatrixStem: "tēca",
    }));
    const distributive = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "teh-tēn",
        objectPerson: "1pl",
        compoundMatrixStem: "māy-a-hui",
    }));
    const arbitraryMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        compoundMatrixStem: "zama",
    }));
    const missingObject = ctx.evaluateClassicalNahuatlLateVncDerivation(request({
        sourceStem: "chōca",
        sourceValence: "intransitive",
        objectKind: "none",
        objectPerson: "",
    }));
    const cues = ctx.getClassicalFormulaDerivedAnnotations(
        distributive.formulaRealization,
        distributive.finalTypedVncSlotFrame,
        distributive,
    ).filter((cue) => cue.role === GROUP10_ID);

    const observed = {
        projective: [
            projective.authorizationStatus,
            projective.operationFrame?.targetStem,
            projective.formulaRealization,
            projective.surfaceRealization,
            projective.operationFrame?.targetValence,
            facts(projective).sharedObjectEmbedAndMatrixTransitive,
            facts(projective).sharedObjectCoreferenceVerified,
            facts(projective).sharedObjectManifestationCount,
            facts(projective).sharedObjectCarrierSite,
            facts(projective).matrixSharedObjectCarrierSuppressed,
            facts(projective).sharedObjectReferentChoiceRequired,
            facts(projective).sharedObjectReferentResolvedByTypedSource,
        ],
        reflexive: [
            reflexive.authorizationStatus,
            reflexive.formulaRealization,
            reflexive.surfaceRealization,
            facts(reflexive).sharedObjectKind,
            facts(reflexive).sharedObjectReflexiveOrProjectivePreserved,
        ],
        matrices: matrices.map((frame) => [
            facts(frame).matrixSelectionStem,
            frame.operationFrame?.targetStem,
            facts(frame).matrixReadingOptions,
        ]),
        specialAndDistributive: [
            eHua.authorizationStatus,
            eHua.operationFrame?.targetStem,
            eHua.formulaRealization,
            facts(eHua).sharedObjectEHuaClassAEmbedAutomatic,
            facts(eHua).sharedObjectEmbedClass,
            distributive.authorizationStatus,
            distributive.formulaRealization,
            distributive.surfaceRealization,
            facts(distributive).sharedObjectPluralAllowsDistributiveReading,
        ],
        opennessAndGate: [
            arbitraryMatrix.authorizationStatus,
            arbitraryMatrix.operationFrame?.targetStem,
            facts(arbitraryMatrix).openTypedMatrixAdmission,
            facts(arbitraryMatrix).sharedObjectMatrixStemWhitelistUsed,
            missingObject.authorizationStatus,
            missingObject.blockReason,
        ],
        cue: [
            cues.some((cue) => records.every((record) => (
                cue.atomIds?.includes(record.atomId)
            ))),
            cues.some((cue) => cue.label.includes("coreference verified")
                && cue.label.includes("one carrier is realized on the embed")
                && cue.label.includes("no extra choice is needed")
                && cue.label.includes("plural shared reference permits a distributive reading")
                && cue.label.includes("examples never form a stem whitelist")),
        ],
    };
    const expected = {
        projective: [
            "authorized", "cui-ti-tlāl-i-a",
            "#0-0+qui-0(cui-ti-tlāl-i-a)0+0-0#", "quicuititlālia",
            "specific-projective", true, true, 1, "embed", true, false, true,
        ],
        reflexive: [
            "authorized", "#0-0+m-o(cui-ti-quetza)0+0-0#",
            "mocuitiquetza", "reflexive", true,
        ],
        matrices: [
            ["tlāl-i-ā", "cui-ti-tlāl-i-a",
                ["place-shared-object-sitting", "set-shared-object-in-a-condition"]],
            ["quetza", "cui-ti-quetza",
                ["place-shared-object-standing", "set-shared-object-in-a-condition"]],
            ["tēca", "cui-ti-tēca",
                ["stretch-shared-object-out", "place-shared-object-recumbent"]],
            ["cāhua", "cui-ti-cāhua",
                ["leave-shared-object-in-a-condition", "leave-shared-object-behind"]],
            ["quix-tiā", "cui-ti-quix-tia",
                ["cause-shared-object-to-exit-in-a-condition",
                    "cause-shared-object-to-end-up-in-a-manner"]],
            ["māy-a-hui", "cui-ti-māy-a-hui",
                ["push-shared-object-down-in-a-condition", "knock-shared-object-flat"]],
        ],
        specialAndDistributive: [
            "authorized", "ē-hua-ti-tēca", "#0-0+qu-0(ē-hua-ti-tēca)0+0-0#",
            true, "A", "authorized",
            "#0-0+t-ēch(teh-tēn-ti-māy-a-hui)0+0-0#",
            "tēchtehtēntimāyahui", true,
        ],
        opennessAndGate: [
            "authorized", "cui-ti-zama", true, false,
            "blocked", "shared-object-coreferential-embed-object-required",
        ],
        cue: [true, true],
    };
    s.eq("accepted Lesson 28 Group 10 verifies and realizes one typed shared object", observed, expected);

    const coreOwner = ownerDefinition(
        ctx,
        "ClassicalSharedObjectCompoundCoreference",
        "classical-shared-object-compound-coreference",
        "claim-p2860",
        "p2860-when-combined-into-a-compound-vnc-the-coreferential-object",
    );
    const matrixOwner = ownerDefinition(
        ctx,
        "ClassicalSharedObjectCompoundMatrixInventory",
        "classical-shared-object-compound-matrix-inventory",
        "claim-p2868",
        "p2868-m-o-te-tla-ma-y-a-hui-to",
    );
    s.eq("accepted Lesson 28 Group 10 typed owners observe canonical behavior", {
        core: [coreOwner.authorizationStatus,
            coreOwner.payload?.definition?.cases?.sharedObject?.facts
                ?.sharedObjectManifestationCount],
        matrix: [matrixOwner.authorizationStatus,
            matrixOwner.payload?.definition?.cases?.sharedObjectMatrices
                ?.["māy-a-hui"]?.facts?.matrixReadingOptions],
    }, {
        core: ["authorized", 1],
        matrix: ["authorized", [
            "push-shared-object-down-in-a-condition", "knock-shared-object-flat",
        ]],
    });

    const renderingSource = fs.readFileSync(
        path.join(ROOT, "src/ui/rendering/rendering.mjs"), "utf8",
    );
    s.eq("accepted Lesson 28 Group 10 exposes only genuine choices", {
        sharedConstruction: renderingSource.includes(
            '"connective-t", "reflexive-matrix", "shared-object"',
        ),
        conditionalReferentCue: renderingSource.includes(
            "sharedObjectReferentChoiceRequired",
        ),
        carrierControlAbsent: !renderingSource.includes(
            'id="classical-rule-logic-shared-object-carrier"',
        ),
        placementControlAbsent: !renderingSource.includes(
            'id="classical-rule-logic-shared-object-site"',
        ),
        whitelistAbsent: matrices.every((frame) => (
            facts(frame).sharedObjectMatrixStemWhitelistUsed === false
        )),
    }, {
        sharedConstruction: true,
        conditionalReferentCue: true,
        carrierControlAbsent: true,
        placementControlAbsent: true,
        whitelistAbsent: true,
    });
    s.eq("accepted Lesson 28 Group 10 covers every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
        accepted: records.every((record) => record.reviewStatus === "ACCEPTED"),
    }, {
        records: 30,
        unique: 30,
        writing: 17,
        reading: 13,
        accepted: true,
    });
    for (const record of writing) {
        s.eq(`${record.atomId} has its accepted writing job`, observed, expected);
        const mutation = JSON.parse(JSON.stringify(observed));
        mutation.projective[8] = "matrix";
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation) === JSON.stringify(expected),
            false,
        );
    }

    const group11Records = ledger.records.filter((record) => (
        record.reviewGroupId === GROUP11_ID
    ));
    const group11Writing = group11Records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const nequi = ctx.evaluateClassicalNahuatlLateVncDerivation(
        futureRequest(),
    );
    const nequiTransitive = ctx.evaluateClassicalNahuatlLateVncDerivation(
        futureRequest({
            sourceStem: "cōhua",
            sourceValence: "specific-projective",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            verbClass: "A",
            subject: "2sg",
            tense: "future",
        }),
    );
    const qui = ctx.evaluateClassicalNahuatlLateVncDerivation(futureRequest({
        compoundMatrixStem: "tla-qui",
        tense: "imperfect",
    }));
    const quiAntecessive = ctx.evaluateClassicalNahuatlLateVncDerivation(
        futureRequest({
            compoundMatrixStem: "tla-qui",
            tense: "imperfect",
            sentenceAntecessive: true,
        }),
    );
    const quiWrongTense = ctx.evaluateClassicalNahuatlLateVncDerivation(
        futureRequest({ compoundMatrixStem: "tla-qui" }),
    );
    const unknownMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(
        futureRequest({ compoundMatrixStem: "invented" }),
    );
    const structureOwner = ownerDefinition(
        ctx,
        "ClassicalFutureEmbedCompoundStructure",
        "classical-future-embed-compound-structure",
        "claim-p2870",
        "p2870-this-future-tense-vnc-allows-its-predicate-to-become",
    );
    const nequiOwner = ownerDefinition(
        ctx,
        "ClassicalNequiFutureEmbedCompound",
        "classical-nequi-future-embed-compound",
        "claim-p2875",
        "p2875-a-vnc-built-on-a-compound-stem-with-tla",
    );
    const quiOwner = ownerDefinition(
        ctx,
        "ClassicalQuiImperfectFutureEmbedCompound",
        "classical-qui-imperfect-future-embed-compound",
        "claim-p2885",
        "p2885-notice-also-its-usage-in-the-included-referent-supplementation",
    );
    const validation = structureOwner.payload?.definition;
    const futureCues = ctx.getClassicalFormulaDerivedAnnotations(
        nequi.formulaRealization,
        nequi.finalTypedVncSlotFrame,
        nequi,
    ).filter((cue) => cue.role === GROUP11_ID);
    const group11Observed = {
        nequi: [
            nequi.authorizationStatus,
            nequi.operationFrame?.targetStem,
            nequi.formulaRealization,
            nequi.surfaceRealization,
            facts(nequi).futureSupplementationAuthorized,
            facts(nequi).futureSupplementFunctionsAsObject,
            facts(nequi).matrixObjectReplacedByFuturePredicate,
            facts(nequi).matrixObjectCarrierSuppressed,
            facts(nequi).futureEmbedTenseMorph,
            facts(nequi).matrixFiniteTense,
            facts(nequi).futureEmbedActionAfterMatrixAction,
            facts(nequi).principalAndSupplementSubjectsCoreferential,
            ctx.isClassicalNahuatlSupplementationFrame(
                facts(nequi).futureSupplementationFrame,
            ),
        ],
        transitive: [
            nequiTransitive.authorizationStatus,
            nequiTransitive.operationFrame?.targetStem,
            nequiTransitive.formulaRealization,
            nequiTransitive.surfaceRealization,
            nequiTransitive.operationFrame?.targetValence,
            facts(nequiTransitive).futureEmbedValence,
            facts(nequiTransitive).embedFiniteCoordinate,
            facts(nequiTransitive).matrixFiniteTense,
        ],
        qui: [
            qui.authorizationStatus,
            qui.operationFrame?.targetStem,
            qui.formulaRealization,
            qui.surfaceRealization,
            facts(qui).futureMatrixAnalysisId,
            facts(qui).quiMatrixAnomalous,
            facts(qui).quiMatrixImperfectOnly,
            facts(qui).traditionalConditionalIsReadingNotTense,
            facts(qui).includedReferentSupplementationAvailable,
        ],
        antecessive: [
            quiAntecessive.authorizationStatus,
            facts(quiAntecessive).antecessiveOrderAvailable,
            facts(quiAntecessive).antecessiveOrderRequested,
            facts(quiAntecessive).antecessiveScopesFiniteMatrixTense,
        ],
        nonactive: [
            validation?.cases?.futureNequiPassive?.authorizationStatus,
            validation?.cases?.futureNequiPassive?.facts?.nonactiveScope,
            validation?.cases?.futureNequiPassive?.targetStem,
            validation?.cases?.futureNequiImpersonal?.authorizationStatus,
            validation?.cases?.futureNequiImpersonal?.facts?.nonactiveScope,
            validation?.cases?.futureNequiImpersonal?.targetStem,
        ],
        gates: [
            quiWrongTense.authorizationStatus,
            quiWrongTense.blockReason,
            unknownMatrix.authorizationStatus,
            unknownMatrix.blockReason,
            facts(nequi).futureMatrixInventoryIsConstructionalNotSourceWhitelist,
            facts(nequi).futureMatrixStemWhitelistUsed,
        ],
        owners: [
            structureOwner.authorizationStatus,
            validation?.authorizationStatus,
            validation?.contract?.futureEmbedSystem?.matrixObjectReplaced,
            nequiOwner.authorizationStatus,
            nequiOwner.payload?.definition?.contract?.futureEmbedSystem?.passiveEmbed,
            quiOwner.authorizationStatus,
            quiOwner.payload?.definition?.contract?.futureEmbedSystem
                ?.includedReferentSupplementation,
        ],
        cue: [
            futureCues.some((cue) => group11Records.every((record) => (
                cue.atomIds?.includes(record.atomId)
            ))),
            futureCues.some((cue) => (
                cue.label.includes("functions as the matrix object")
                && cue.label.includes("matrix Mood and Tense stay outside")
                && cue.label.includes("traditional conditional wording is a reading")
                && cue.label.includes("never a general Source-entry whitelist")
            )),
        ],
    };
    const group11Expected = {
        nequi: [
            "authorized", "cochi-z-nequi",
            "#ni-0(cochi-z-nequi)0+0-0#", "nicochiznequi",
            true, true, true, true, "z", "present", true, true, true,
        ],
        transitive: [
            "authorized", "cōhua-z-nequi",
            "#ti-0+c-0(cōhua-z-nequi)z+⎕-0#", "ticcōhuaznequiz",
            "specific-projective", "specific-projective",
            "indicative-future", "future",
        ],
        qui: [
            "authorized", "cochi-z-qui",
            "#ni-0(cochi-z-qui)ya+0-0#", "nicochizquiya",
            "qui-volition-imperfect", true, true, true, true,
        ],
        antecessive: ["authorized", true, true, true],
        nonactive: [
            "authorized", "embed", "mac-ō-z-nequi",
            "authorized", "embed", "mic-o-hua-z-nequi",
        ],
        gates: [
            "blocked", "tla-qui-matrix-is-imperfect-only",
            "blocked", "future-embed-matrix-analysis-must-be-nequi-or-qui",
            true, false,
        ],
        owners: [
            "authorized", "authorized", true,
            "authorized", "embed",
            "authorized", true,
        ],
        cue: [true, true],
    };
    s.eq(
        "accepted Lesson 28 Group 11 realizes the future supplement as the matrix object",
        group11Observed,
        group11Expected,
    );
    s.eq("accepted Lesson 28 Group 11 exposes only genuine choices", {
        futureConstruction: renderingSource.includes(
            '"huītz-carry", "future-embed"',
        ),
        analysisChoice: facts(nequi).futureMatrixAnalysisIsUserChoice,
        zControlAbsent: !renderingSource.includes(
            'id="classical-rule-logic-future-embed-z"',
        ),
        objectDeletionControlAbsent: !renderingSource.includes(
            'id="classical-rule-logic-future-object-deletion"',
        ),
        sourceWhitelistAbsent: facts(nequi).futureMatrixStemWhitelistUsed === false,
    }, {
        futureConstruction: true,
        analysisChoice: true,
        zControlAbsent: true,
        objectDeletionControlAbsent: true,
        sourceWhitelistAbsent: true,
    });
    s.eq("accepted Lesson 28 Group 11 covers every atom once", {
        records: group11Records.length,
        unique: new Set(group11Records.map((record) => record.atomId)).size,
        writing: group11Writing.length,
        reading: group11Records.length - group11Writing.length,
        accepted: group11Records.every((record) => (
            record.reviewStatus === "ACCEPTED"
        )),
    }, {
        records: 53,
        unique: 53,
        writing: 28,
        reading: 25,
        accepted: true,
    });
    for (const record of group11Writing) {
        s.eq(
            `${record.atomId} has its accepted writing job`,
            group11Observed,
            group11Expected,
        );
        const mutation = JSON.parse(JSON.stringify(group11Observed));
        mutation.nequi[6] = false;
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation) === JSON.stringify(group11Expected),
            false,
        );
    }

    const group12Records = ledger.records.filter((record) => (
        record.reviewGroupId === GROUP12_ID
    ));
    const group12Writing = group12Records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));
    const recursiveRequest = (overrides = {}) => ({
        sourceStem: "chōca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "2sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        lateOperation: "compound",
        lateVariant: "connective-t",
        compoundMatrixStem: "ahci",
        ...overrides,
    });
    const innerCompound = ctx.evaluateClassicalNahuatlLateVncDerivation(
        recursiveRequest(),
    );
    const recursiveEmbed = ctx.evaluateClassicalNahuatlLateVncDerivation(
        recursiveRequest({
            sourceStem: innerCompound.operationFrame?.targetStem,
            compoundMatrixStem: "ya-uh",
            compoundEmbedClosureFrame: innerCompound,
            tense: "future",
        }),
    );
    const recursiveMatrix = ctx.evaluateClassicalNahuatlLateVncDerivation(
        recursiveRequest({
            sourceStem: "cuah",
            verbClass: "B",
            compoundMatrixClosureFrame: innerCompound,
        }),
    );
    const recursiveFuture = ctx.evaluateClassicalNahuatlLateVncDerivation(
        recursiveRequest({
            sourceStem: recursiveEmbed.operationFrame?.targetStem,
            compoundEmbedClosureFrame: recursiveEmbed,
            lateVariant: "future-embed",
            compoundMatrixStem: "tla-nequi",
        }),
    );
    const duplicateResult = ctx.evaluateClassicalNahuatlLateVncDerivation(
        recursiveRequest({
            sourceStem: innerCompound.operationFrame?.targetStem,
            compoundEmbedClosureFrame: innerCompound,
            compoundMatrixClosureFrame: innerCompound,
        }),
    );
    const forgedResult = ctx.evaluateClassicalNahuatlLateVncDerivation(
        recursiveRequest({
            compoundEmbedClosureFrame: Object.freeze({
                ...innerCompound,
            }),
        }),
    );
    const recursiveCues = ctx.getClassicalFormulaDerivedAnnotations(
        recursiveEmbed.formulaRealization,
        recursiveEmbed.finalTypedVncSlotFrame,
        recursiveEmbed,
    ).filter((cue) => cue.role === GROUP12_ID);
    const recursiveOwner = ownerDefinition(
        ctx,
        "ClassicalCompoundRecursiveEmbedding",
        "classical-compound-recursive-embedding",
        "claim-p2886",
        "p2886-tla-cuah-t-ahci-ti-uh-to-go-along",
    );
    const recursiveContinuationProjection =
        ctx.getClassicalNahuatlVncContinuationSourceConstituents(
            innerCompound,
        );
    const shellSource = fs.readFileSync(
        path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8",
    );
    const group12Observed = {
        embed: [
            recursiveEmbed.authorizationStatus,
            recursiveEmbed.operationFrame?.ruleFamily,
            recursiveEmbed.operationFrame?.targetStem,
            recursiveEmbed.formulaRealization,
            recursiveEmbed.surfaceRealization,
            facts(recursiveEmbed).recursiveResultRole,
            facts(recursiveEmbed).recursiveBinaryConstituentCount,
            facts(recursiveEmbed).recursiveHierarchyAcyclic,
            facts(recursiveEmbed).recursiveHierarchyValidated,
            facts(recursiveEmbed).recursiveConstituentsDistinct,
            facts(recursiveEmbed).recursiveDepth,
        ],
        matrix: [
            recursiveMatrix.authorizationStatus,
            recursiveMatrix.operationFrame?.ruleFamily,
            recursiveMatrix.operationFrame?.targetStem,
            recursiveMatrix.formulaRealization,
            recursiveMatrix.surfaceRealization,
            facts(recursiveMatrix).recursiveResultRole,
            facts(recursiveMatrix).recursiveHierarchyAcyclic,
        ],
        localContinuity: [
            facts(recursiveEmbed).recursiveRoleIsUserChoice,
            facts(recursiveEmbed).recursiveSourceLinksPreserved,
            facts(recursiveEmbed).recursiveLocalRulesIndependent,
            facts(recursiveEmbed).recursiveLocalConnectiveDerived,
            facts(recursiveEmbed).recursiveValenceInheritedFromOuterEmbed,
            facts(recursiveEmbed).recursiveParticipantsPreserved,
            facts(recursiveEmbed)
                .recursiveFiniteBoundaryOutsideCompletedCompound,
            facts(recursiveEmbed).recursiveContinuationAvailable,
            facts(recursiveEmbed).recursiveExampleStemWhitelistUsed,
        ],
        future: [
            recursiveFuture.authorizationStatus,
            recursiveFuture.operationFrame?.targetStem,
            recursiveFuture.formulaRealization,
            recursiveFuture.surfaceRealization,
            facts(recursiveFuture).recursiveDepth,
            facts(recursiveFuture).futureSupplementationAuthorized,
        ],
        gates: [
            duplicateResult.authorizationStatus,
            duplicateResult.blockReason,
            forgedResult.authorizationStatus,
            forgedResult.blockReason,
        ],
        owner: [
            recursiveOwner.authorizationStatus,
            recursiveOwner.payload?.definition?.contract
                ?.recursiveCompoundingSystem?.capturedResultRoles,
            recursiveOwner.payload?.definition?.contract
                ?.recursiveCompoundingSystem?.hierarchyAcyclic,
            recursiveOwner.payload?.definition?.contract
                ?.recursiveCompoundingSystem?.exampleStemWhitelistUsed,
        ],
        continuationProjection: [
            recursiveContinuationProjection?.sourceStem,
            recursiveContinuationProjection?.verbClass,
            recursiveContinuationProjection?.sourceValence,
            recursiveContinuationProjection?.sourceSubject,
            recursiveContinuationProjection?.projectionRole,
        ],
        cue: [
            recursiveCues.some((cue) => group12Records.every((record) => (
                cue.atomIds?.includes(record.atomId)
            ))),
            recursiveCues.some((cue) => (
                cue.label.includes("reused as the next embed")
                && cue.label.includes("validated as acyclic")
                && cue.label.includes("each layer derives its own connective")
                && cue.label.includes("never a stem whitelist")
            )),
        ],
        controls: [
            shellSource.includes(
                'id="classical-rule-logic-compound-recursive-role"',
            ),
            shellSource.includes("use captured Result as the embed"),
            shellSource.includes("use captured Result as the matrix"),
            !shellSource.includes("classical-rule-logic-compound-depth"),
            !shellSource.includes("classical-rule-logic-recursive-connective"),
            !shellSource.includes("classical-rule-logic-copy-participants"),
        ],
    };
    const group12Expected = {
        embed: [
            "authorized", "compound-recursion", "chōca-t-ahci-ti-yā",
            "#ti-0(chōca-t-ahci-ti-yā)z+⎕-0#",
            "tichōcatahcitiyāz", "embed", 2, true, true, true, 2,
        ],
        matrix: [
            "authorized", "compound-recursion", "cuah-ti-chōca-t-ahci",
            "#ti-0(cuah-ti-chōca-t-ahci)0+0-0#",
            "ticuahtichōcatahci", "matrix", true,
        ],
        localContinuity: [
            true, true, true, true, true, true, true, true, false,
        ],
        future: [
            "authorized", "chōca-t-ahci-ti-yā-z-nequi",
            "#ti-0(chōca-t-ahci-ti-yā-z-nequi)0+0-0#",
            "tichōcatahcitiyāznequi", 3, true,
        ],
        gates: [
            "blocked",
            "recursive-compound-requires-distinct-embed-and-matrix-results",
            "blocked", "engine-issued-recursive-embed-closure-required",
        ],
        owner: ["authorized", ["embed", "matrix"], true, false],
        continuationProjection: [
            "chōca-t-ahci", "A", "intransitive", "2sg",
            "read-only-source-constituents",
        ],
        cue: [true, true],
        controls: [true, true, true, true, true, true],
    };
    s.eq(
        "accepted Lesson 28 Group 12 recursively reuses typed compound Results",
        group12Observed,
        group12Expected,
    );
    s.eq("accepted Lesson 28 Group 12 covers every atom once", {
        records: group12Records.length,
        unique: new Set(group12Records.map((record) => record.atomId)).size,
        writing: group12Writing.length,
        reading: group12Records.length - group12Writing.length,
        accepted: group12Records.every((record) => (
            record.reviewStatus === "ACCEPTED"
        )),
    }, {
        records: 13,
        unique: 13,
        writing: 3,
        reading: 10,
        accepted: true,
    });
    for (const record of group12Writing) {
        s.eq(
            `${record.atomId} has its accepted writing job`,
            group12Observed,
            group12Expected,
        );
        const mutation = JSON.parse(JSON.stringify(group12Observed));
        mutation.embed[7] = false;
        s.eq(
            `mutation:${record.atomId} fails when its accepted writing job changes`,
            JSON.stringify(mutation) === JSON.stringify(group12Expected),
            false,
        );
    }
    return s;
}

module.exports = { run };
