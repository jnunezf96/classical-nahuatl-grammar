"use strict";

const { createSuite } = require("./runner");

const OWNER_ID = "classical-type-one-final-a-replacement";
const NORMAL_RULE_ID = "cn-l24-2432b-root-plus-ya-a";
const EXCEPTION_RULE_ID = "cn-l24-2432b-yocoya-retains-y-a";
const NORMAL_FORMATION = Object.freeze({
    sourceAnalysisCategory: "root-plus-ya",
    derivationType: "causative",
    derivationSubtype: "type-one",
    derivationRoute: "type-one-root-plus-ya-replacement",
    procedure: "delete-typed-derivational-ya-and-add-causative-a",
    ruleId: NORMAL_RULE_ID,
    targetStem: "xoco-ā",
    targetConstruction: Object.freeze({
        operation: "replace-morpheme",
        remove: "ya",
        add: "ā",
        underlyingAdd: "a",
        lengtheningEnvironment: "preceding-vowel",
    }),
});
const SOURCE_LEXICAL_FRAME = Object.freeze({
    stem: "yōco-ya",
    perfectiveStem: "yōco-x",
    meaning: "become-comely-or-well-formed",
});
const TARGET_FRAME = Object.freeze({
    citationForm: "tla-(yōco-y-a)",
    perfectiveCitationForm: "tla-(yōco-x)",
});
const PRIMARY_TARGET_READING = Object.freeze({
    meaning: "cause-something-to-become-well-formed",
    objectKind: "nonspecific-nonhuman",
});
const ADDITIONAL_TARGET_READING = Object.freeze({
    meaning: "form-invent-or-create-something",
    relation: "lexical-extension",
    objectKind: "nonspecific-nonhuman",
});
const ATOM_RECEIPTS = Object.freeze([Object.freeze({
    atomId: "ACI-P200-L006-06B6C54C5B",
    selection: "claim-p2299",
    facet:
        "aci-p200-l006-06b6c54c5b-root-plus-ya-causative-replacement",
    path: "constraints.rootPlusYaCausativeReplacement.normalFormation",
    value: NORMAL_FORMATION,
}), Object.freeze({
    atomId: "ACI-P200-L009-BE43182B1A",
    selection: "claim-p2300",
    facet:
        "aci-p200-l009-be43182b1a-root-plus-ya-causative-class-c",
    path: "constraints.rootPlusYaCausativeReplacement.targetClass",
    value: "C",
}), Object.freeze({
    atomId: "ACI-P200-L009-E833325858",
    selection: "claim-p2301",
    facet:
        "aci-p200-l009-e833325858-root-plus-ya-source-classes-a-or-b",
    path: "constraints.rootPlusYaCausativeReplacement.sourceClasses",
    value: ["A", "B"],
}), Object.freeze({
    atomId: "ACI-P200-L010-EB2EFD3CFA",
    selection: "claim-p2299",
    facet:
        "aci-p200-l010-eb2efd3cfa-root-plus-ya-exception-exists",
    path: "constraints.rootPlusYaCausativeReplacement.exception.exists",
    value: true,
}), Object.freeze({
    atomId: "ACI-P200-L010-EB2EFD3CFA-02",
    selection: "claim-p2299",
    facet:
        "aci-p200-l010-eb2efd3cfa-02-yocoya-final-a-exception-procedure",
    path:
        "constraints.rootPlusYaCausativeReplacement.exception.formationProcedure",
    value: Object.freeze({
        normalYaReplacement: false,
        retainY: true,
        replaceFinalAWithCausativeA: true,
    }),
}), Object.freeze({
    atomId: "ACI-P200-L010-EB2EFD3CFA-03",
    selection: "claim-p2301",
    facet:
        "aci-p200-l010-eb2efd3cfa-03-yocoya-source-lexical-frame",
    path:
        "constraints.rootPlusYaCausativeReplacement.exception.sourceLexicalFrame",
    value: SOURCE_LEXICAL_FRAME,
}), Object.freeze({
    atomId: "ACI-P200-L010-EB2EFD3CFA-04",
    selection: "claim-p2300",
    facet:
        "aci-p200-l010-eb2efd3cfa-04-yocoya-target-and-perfective",
    path: "constraints.rootPlusYaCausativeReplacement.exception.targetFrame",
    value: TARGET_FRAME,
}), Object.freeze({
    atomId: "ACI-P200-L010-EB2EFD3CFA-05",
    selection: "claim-p2300",
    facet:
        "aci-p200-l010-eb2efd3cfa-05-yocoya-primary-target-reading",
    path:
        "constraints.rootPlusYaCausativeReplacement.exception.primaryTargetReading",
    value: PRIMARY_TARGET_READING,
}), Object.freeze({
    atomId: "ACI-P200-L010-EB2EFD3CFA-06",
    selection: "claim-p2300",
    facet:
        "aci-p200-l010-eb2efd3cfa-06-yocoya-additional-target-reading",
    path:
        "constraints.rootPlusYaCausativeReplacement.exception.additionalTargetReadings.0",
    value: ADDITIONAL_TARGET_READING,
})]);

function run(ctx = {}) {
    const s = createSuite("classical_root_plus_ya_owner_exact");
    const issueReceipt = ({ selection, facet }) => {
        const source = ctx.buildClassicalTypeOneFinalAReplacementSource({
            analysisDomain: OWNER_ID,
            selection,
            requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx.evaluateClassicalTypeOneFinalAReplacement(source);
        return {
            source,
            result,
            evidence:
                ctx.getClassicalTypeOneFinalAReplacementExecutionEvidence(
                    result
                ),
        };
    };
    const receipts = ATOM_RECEIPTS.map(issueReceipt);
    const observation = receipt => ({
        status: receipt.result.authorizationStatus,
        canonicalPath: receipt.result.payload.effectiveCanonicalPath,
        sourceCanonicalPath: receipt.result.payload.sourceCanonicalPath,
        facetValue: receipt.result.payload.facetValue,
        observationKind: receipt.result.payload.proofObservationKind,
        observationStatus: receipt.result.payload.proofObservationStatus,
        broadProxyRetired:
            receipt.result.payload.broadCompletionProxyRetired,
        resultCanonical:
            ctx.isClassicalTypeOneFinalAReplacementResult(receipt.result),
        evidenceCanonical:
            ctx.isClassicalTypeOneFinalAReplacementExecutionEvidence(
                receipt.evidence,
                receipt.result
            ),
    });

    ATOM_RECEIPTS.forEach((atom, index) => {
        s.eq(`${atom.atomId} has one direct owner-issued observation`,
            observation(receipts[index]), {
                status: "authorized",
                canonicalPath: atom.path,
                sourceCanonicalPath: atom.path,
                facetValue: atom.value,
                observationKind: "direct-canonical-result-observation",
                observationStatus: "direct",
                broadProxyRetired: false,
                resultCanonical: true,
                evidenceCanonical: true,
            });
    });

    const definition = receipts[0].result.payload.definition;
    const constraint =
        definition.constraints.rootPlusYaCausativeReplacement;
    s.eq("normal root-plus-ya replacement is signed for Classes A and B", {
        status: constraint.authorizationStatus,
        frozen: Object.isFrozen(constraint),
        formation: constraint.normalFormation,
        sourceClasses: constraint.sourceClasses,
        targetClass: constraint.targetClass,
        perfectives: constraint.classBoundPerfectives,
        routeSignedBySourceClass: constraint.routeSignedBySourceClass,
        targetPerfectiveExact: constraint.targetPerfectiveExact,
        callerTargetAllowed: constraint.callerSuppliedTargetAllowed,
        formulaAuthority: constraint.formulaStringAuthority,
        surfaceAuthority: constraint.surfaceStringAuthority,
        storedExampleAuthority: constraint.storedExampleAuthority,
    }, {
        status: "authorized",
        frozen: true,
        formation: NORMAL_FORMATION,
        sourceClasses: ["A", "B"],
        targetClass: "C",
        perfectives: {
            A: {
                source: {
                    imperfectiveStem: "xoco-ya",
                    perfectiveStem: "xoco-ya",
                    changeRule: "class-a1-same-shape",
                },
                target: {
                    imperfectiveStem: "xoco-ā",
                    perfectiveStem: "xoco-h",
                    changeRule: "class-c-final-a-replaced-by-h",
                },
            },
            B: {
                source: {
                    imperfectiveStem: "xoco-ya",
                    perfectiveStem: "xoco-x",
                    changeRule: "class-b-y-to-x",
                },
                target: {
                    imperfectiveStem: "xoco-ā",
                    perfectiveStem: "xoco-h",
                    changeRule: "class-c-final-a-replaced-by-h",
                },
            },
        },
        routeSignedBySourceClass: { A: true, B: true },
        targetPerfectiveExact: true,
        callerTargetAllowed: false,
        formulaAuthority: false,
        surfaceAuthority: false,
        storedExampleAuthority: false,
    });

    const yocoyaOption = definition.derivations.yocoya.options.find(
        option => option.ruleId === EXCEPTION_RULE_ID
    );
    s.eq("the signed yōcoya option is a retained-y lexical exception", {
        exception: {
            status: constraint.exception.authorizationStatus,
            exists: constraint.exception.exists,
            formationProcedure: constraint.exception.formationProcedure,
            sourceLexicalFrame: constraint.exception.sourceLexicalFrame,
            targetFrame: constraint.exception.targetFrame,
            primaryTargetReading:
                constraint.exception.primaryTargetReading,
            additionalTargetReadings:
                constraint.exception.additionalTargetReadings,
            routeSigned: constraint.exception.routeSigned,
            perfectivesExact: constraint.exception.perfectivesExact,
            participantExact: constraint.exception.participantExact,
        },
        sourceStem: yocoyaOption.sourceStem,
        sourceMeaning: yocoyaOption.sourceMeaning,
        targetStem: yocoyaOption.targetStem,
        targetClass: yocoyaOption.targetClass,
        targetMeaning: yocoyaOption.targetMeaning,
        additionalTargetReadings: yocoyaOption.additionalTargetReadings,
        route: yocoyaOption.derivationRoute,
        procedure: yocoyaOption.procedure,
        ruleId: yocoyaOption.ruleId,
        callerTargetAllowed: yocoyaOption.callerSuppliedTargetAllowed,
        formulaAuthority: yocoyaOption.formulaArtifactAuthority,
        surfaceAuthority: yocoyaOption.surfaceArtifactAuthority,
    }, {
        exception: {
            status: "authorized",
            exists: true,
            formationProcedure: {
                normalYaReplacement: false,
                retainY: true,
                replaceFinalAWithCausativeA: true,
            },
            sourceLexicalFrame: SOURCE_LEXICAL_FRAME,
            targetFrame: TARGET_FRAME,
            primaryTargetReading: PRIMARY_TARGET_READING,
            additionalTargetReadings: [ADDITIONAL_TARGET_READING],
            routeSigned: true,
            perfectivesExact: true,
            participantExact: true,
        },
        sourceStem: "yōco-ya",
        sourceMeaning: "become-comely-or-well-formed",
        targetStem: "yōco-y-a",
        targetClass: "B",
        targetMeaning: "cause-something-to-become-well-formed",
        additionalTargetReadings: [{
            meaning: "form-invent-or-create-something",
            relation: "lexical-extension",
        }],
        route: "type-one-root-plus-ya-retentive-exception-exact",
        procedure:
            "preserve-root-final-y-and-replace-source-a-with-causative-a",
        ruleId: EXCEPTION_RULE_ID,
        callerTargetAllowed: false,
        formulaAuthority: false,
        surfaceAuthority: false,
    });

    const requestFor = ({ stem, verbClass, tense }) => ({
        sourceStem: stem,
        verbClass,
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "3sg",
        objectKind: "none",
        objectPerson: "",
        mood: "indicative",
        tense,
        requestedDerivation: "causative",
        sourceVoice: "impersonal",
        requestedVoice: "active",
    });
    const generate = ({ stem, verbClass, targetStem, tense, additions = {} }) => {
        const request = {
            ...requestFor({ stem, verbClass, tense }),
            ...additions,
        };
        const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
        const option = preview.controlFrame.derivationOptionInventory.options
            .find(candidate => candidate.targetStem === targetStem);
        const applied = ctx.evaluateClassicalNahuatlVncApplication({
            ...request,
            derivationOptionId:
                option?.optionId || `missing-root-plus-ya:${targetStem}`,
        });
        return { preview, option, applied };
    };
    const specifications = [{
        id: "coco",
        stem: "coco-ya",
        verbClass: "B",
        targetStem: "coco-ā",
        citationRole: "tē",
        objectKind: "nonspecific-human",
        presentFormula: "#0-0+tē(coco-a)0+0-0#",
        presentSurface: "tēcocoa",
        preteritFormula: "#0-0+tē(coco-h)0+⎕-0#",
        preteritSurface: "tēcocoh",
    }, {
        id: "tlapihuiya",
        stem: "tlap-ī-hui-ya",
        verbClass: "B",
        targetStem: "tlap-ī-hui-ā",
        citationRole: "tla",
        objectKind: "nonspecific-nonhuman",
        presentFormula: "#0-0+tla(tlap-ī-hui-a)0+0-0#",
        presentSurface: "tlatlapīhuia",
        preteritFormula: "#0-0+tla(tlap-ī-hui-h)0+⎕-0#",
        preteritSurface: "tlatlapīhuih",
    }, {
        id: "yocoya",
        stem: "yōco-ya",
        verbClass: "B",
        targetStem: "yōco-y-a",
        citationRole: "tla",
        objectKind: "nonspecific-nonhuman",
        presentFormula: "#0-0+tla(yōco-y-a)0+0-0#",
        presentSurface: "tlayōcoya",
        preteritFormula: "#0-0+tla(yōco-x)0+⎕-0#",
        preteritSurface: "tlayōcox",
    }];
    const generated = specifications.map(specification => ({
        specification,
        present: generate({ ...specification, tense: "present" }),
        preterit: generate({ ...specification, tense: "preterit" }),
    }));
    const summarize = ({ specification, present, preterit }) => ({
        id: specification.id,
        previewStatus: present.preview.authorizationStatus,
        previewReason: present.preview.blockReason,
        selectionRequired:
            present.preview.controlFrame.derivationOptionInventory
                .selectionRequired,
        targetStem: present.option?.targetStem || "",
        targetClass: present.option?.targetClass || "",
        citationRole: present.option?.causativeCitationRole || "",
        implicitAgentObjectKind:
            present.option?.implicitAgentObjectKind || "",
        presentStatus: present.applied.authorizationStatus,
        presentObjectKind: present.applied.resultFrame
            ?.derivationOperationFrame?.participantTransformFrame
            ?.implicitAgentObjectKind || "",
        presentFormula:
            present.applied.resultFrame?.formulaRealization || "",
        presentSurface:
            present.applied.resultFrame?.surfaceRealization || "",
        preteritStatus: preterit.applied.authorizationStatus,
        preteritObjectKind: preterit.applied.resultFrame
            ?.derivationOperationFrame?.participantTransformFrame
            ?.implicitAgentObjectKind || "",
        preteritFormula:
            preterit.applied.resultFrame?.formulaRealization || "",
        preteritSurface:
            preterit.applied.resultFrame?.surfaceRealization || "",
        presentCanonical:
            ctx.isClassicalNahuatlVncApplicationResultFrame(
                present.applied.resultFrame
            ),
        preteritCanonical:
            ctx.isClassicalNahuatlVncApplicationResultFrame(
                preterit.applied.resultFrame
            ),
    });
    s.eq("normal Grammar generates the exact tē and tla citation profiles",
        generated.map(summarize), specifications.map(specification => ({
            id: specification.id,
            previewStatus: "blocked",
            previewReason:
                "classical-vnc-derivation-option-selection-required",
            selectionRequired: true,
            targetStem: specification.targetStem,
            targetClass: specification.id === "yocoya" ? "B" : "C",
            citationRole: specification.citationRole,
            implicitAgentObjectKind: specification.objectKind,
            presentStatus: "authorized",
            presentObjectKind: specification.objectKind,
            presentFormula: specification.presentFormula,
            presentSurface: specification.presentSurface,
            preteritStatus: "authorized",
            preteritObjectKind: specification.objectKind,
            preteritFormula: specification.preteritFormula,
            preteritSurface: specification.preteritSurface,
            presentCanonical: true,
            preteritCanonical: true,
        })));

    const hostileFields = {
        sourceMeaning: "caller-source-meaning-must-not-authorize",
        targetMeaning: "caller-target-meaning-must-not-authorize",
        additionalTargetReadings: [{
            meaning: "caller-reading-must-not-authorize",
            relation: "caller",
        }],
        resultMeaning: "caller-result-meaning-must-not-authorize",
        causativeCitationRole: "tē",
        implicitAgentObjectKind: "nonspecific-human",
        targetPerfectiveStem: "caller-perfective",
    };
    const yocoya = generated.find(entry => entry.specification.id === "yocoya");
    const hostilePreview = ctx.evaluateClassicalNahuatlVncApplication({
        ...requestFor({
            stem: "yōco-ya",
            verbClass: "B",
            tense: "present",
        }),
        ...hostileFields,
    });
    const hostile = generate({
        stem: "yōco-ya",
        verbClass: "B",
        targetStem: "yōco-y-a",
        tense: "present",
        additions: hostileFields,
    });
    const hostileOption = hostile.applied.resultFrame
        ?.derivationOperationFrame?.selectedOption;
    s.eq("yōcoya meanings are read-only and hostile caller data is ignored", {
        ordinaryPreviewStatus: yocoya.present.preview.authorizationStatus,
        hostilePreviewStatus: hostilePreview.authorizationStatus,
        hostilePreviewReason: hostilePreview.blockReason,
        hostileSelectionRequired:
            hostilePreview.controlFrame.derivationOptionInventory
                .selectionRequired,
        status: hostile.applied.authorizationStatus,
        sourceMeaning: hostileOption?.sourceMeaning || "",
        targetMeaning: hostileOption?.targetMeaning || "",
        targetReadings: hostileOption?.additionalTargetReadings || [],
        citationRole: hostileOption?.causativeCitationRole || "",
        implicitAgentObjectKind:
            hostileOption?.implicitAgentObjectKind || "",
        callerTargetAllowed:
            hostileOption?.callerSuppliedTargetAllowed === true,
        callerAuthorityAccepted:
            hostile.applied.resultFrame?.callerSuppliedAuthorityAccepted
                === true,
        formula: hostile.applied.resultFrame?.formulaRealization || "",
        surface: hostile.applied.resultFrame?.surfaceRealization || "",
    }, {
        ordinaryPreviewStatus: "blocked",
        hostilePreviewStatus: "blocked",
        hostilePreviewReason:
            "classical-vnc-derivation-option-selection-required",
        hostileSelectionRequired: true,
        status: "authorized",
        sourceMeaning: "become-comely-or-well-formed",
        targetMeaning: "cause-something-to-become-well-formed",
        targetReadings: [{
            meaning: "form-invent-or-create-something",
            relation: "lexical-extension",
        }],
        citationRole: "tla",
        implicitAgentObjectKind: "nonspecific-nonhuman",
        callerTargetAllowed: false,
        callerAuthorityAccepted: false,
        formula: "#0-0+tla(yōco-y-a)0+0-0#",
        surface: "tlayōcoya",
    });

    const openSource = ctx.buildClassicalNahuatlVerbstemClassFrame(
        "xep-o-ya",
        {
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            verbClass: "B",
            perfectiveClass: "B",
            valence: "intransitive",
            transitivity: "intransitive",
            objectKind: "none",
            objectPerson: "",
        }
    );
    const openInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            openSource,
            { derivationType: "causative" }
        );
    const openOption = openInventory.options.find(
        option => option.targetStem === "xepo-ā"
    );
    s.eq("unlisted root-plus-ya input stays productive without a profile", {
        status: openInventory.authorizationStatus,
        selectionRequired: openInventory.selectionRequired,
        targetStem: openOption?.targetStem || "",
        targetClass: openOption?.targetClass || "",
        route: openOption?.derivationRoute || "",
        formationRuleTier: openOption?.formationRuleTier || "",
        exactWitness: openOption?.exactWitness === true,
        citationRole: openOption?.causativeCitationRole || "",
        implicitAgentObjectKind: openOption?.implicitAgentObjectKind || "",
        sourceMeaning: openOption?.sourceMeaning || "",
        sourceReadings: openOption?.additionalSourceReadings || [],
        targetMeaning: openOption?.targetMeaning || "",
        targetReadings: openOption?.additionalTargetReadings || [],
    }, {
        status: "authorized",
        selectionRequired: true,
        targetStem: "xepo-ā",
        targetClass: "C",
        route: "type-one-root-plus-ya-replacement",
        formationRuleTier: "typed-internal-morphology",
        exactWitness: false,
        citationRole: "",
        implicitAgentObjectKind: "",
        sourceMeaning: "",
        sourceReadings: [],
        targetMeaning: "",
        targetReadings: [],
    });

    s.eq("copied requests cannot mint any root-plus-ya atom receipt", {
        authentic: receipts.map(receipt =>
            receipt.result.authorizationStatus),
        copied: receipts.map(receipt =>
            ctx.evaluateClassicalTypeOneFinalAReplacement(
                JSON.parse(JSON.stringify(receipt.source))
            ).authorizationStatus),
    }, {
        authentic: Array(9).fill("authorized"),
        copied: Array(9).fill("blocked"),
    });

    const nonGrammarAtomIds = [
        "aci-p200-l006-2876bcda34",
        "aci-p200-l007-df888bfbc8",
        "aci-p200-l008-9b3879b41b",
        "aci-p200-l009-be43182b1a-02",
        "aci-p200-l009-be43182b1a-03",
        "aci-p200-l010-eb2efd3cfa-07",
    ];
    const ownerAssertionIds = (
        ctx.listRoutineSemanticEffectiveProofCoordinates?.() || []
    ).filter(record => record.ownerId === OWNER_ID)
        .map(record => String(record.assertionId || "")
            .replace(`${OWNER_ID}:`, "").toLowerCase());
    s.eq("the REF, evidence, and analysis atoms have no direct coordinate",
        nonGrammarAtomIds.filter(atomId => ownerAssertionIds.some(
            assertionId => assertionId === atomId
                || assertionId.startsWith(`${atomId}-`)
        )), []);

    return s;
}

module.exports = { run };
