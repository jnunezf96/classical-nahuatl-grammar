"use strict";

const { createSuite } = require("./runner");

const OWNER_ID = "classical-type-one-final-a-replacement";
const EXACT_RULE_ID = "cn-l24-2432a-ehua-e-hu-a";
const SOURCE_READING = Object.freeze({
    meaning: "lift-off-in-flight",
    relation: "bird-animate-nonhuman-subject",
});
const TARGET_READINGS = Object.freeze([Object.freeze({
    meaning: "carry-something-heavy",
    relation: "heavy-nonhuman-object",
}), Object.freeze({
    meaning: "sing-something",
    relation: "song-nonhuman-object",
})]);
const ATOM_RECEIPTS = Object.freeze([Object.freeze({
    atomId: "ACI-P200-L004-E576F7CBBA-02",
    selection: "claim-p2297",
    facet: "aci-p200-l004-e576f7cbba-02-ehua-source-perfective",
    path:
        "constraints.finalAReplacementMorphologicalContrast.classPerfectiveContrast.sourcePerfectiveStem",
    value: "ē-hua",
}), Object.freeze({
    atomId: "ACI-P200-L004-E576F7CBBA-03",
    selection: "claim-p2298",
    facet: "aci-p200-l004-e576f7cbba-03-ehua-source-meaning",
    path: "derivations.ehua.options.0.sourceMeaning",
    value: "arise-or-depart",
}), Object.freeze({
    atomId: "ACI-P200-L004-E576F7CBBA-04",
    selection: "claim-p2298",
    facet: "aci-p200-l004-e576f7cbba-04-ehua-bird-flight-reading",
    path: "derivations.ehua.options.0.additionalSourceReadings.0",
    value: SOURCE_READING,
}), Object.freeze({
    atomId: "ACI-P200-L004-E576F7CBBA-05",
    selection: "claim-p2297",
    facet: "aci-p200-l004-e576f7cbba-05-ehua-causative-perfective",
    path: "participants.ehuaNonspecific.perfectiveCitationForm",
    value: "tla-(ē-uh)",
}), Object.freeze({
    atomId: "ACI-P200-L004-E576F7CBBA-06",
    selection: "claim-p2298",
    facet:
        "aci-p200-l004-e576f7cbba-06-ehua-nonspecific-nonhuman-object",
    path: "participants.ehuaNonspecific.implicitAgentObjectKind",
    value: "nonspecific-nonhuman",
}), Object.freeze({
    atomId: "ACI-P200-L004-E576F7CBBA-07",
    selection: "claim-p2298",
    facet: "aci-p200-l004-e576f7cbba-07-ehua-lift-target-meaning",
    path: "derivations.ehua.options.0.targetMeaning",
    value: "lift-something",
}), Object.freeze({
    atomId: "ACI-P200-L004-E576F7CBBA-08",
    selection: "claim-p2298",
    facet: "aci-p200-l004-e576f7cbba-08-ehua-heavy-carry-reading",
    path: "derivations.ehua.options.0.additionalTargetReadings.0",
    value: TARGET_READINGS[0],
}), Object.freeze({
    atomId: "ACI-P200-L004-E576F7CBBA-09",
    selection: "claim-p2298",
    facet: "aci-p200-l004-e576f7cbba-09-ehua-song-reading",
    path: "derivations.ehua.options.0.additionalTargetReadings.1",
    value: TARGET_READINGS[1],
})]);

function run(ctx = {}) {
    const s = createSuite("classical_ehua_readings_exact");
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
    const observation = (receipt) => ({
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
    const option = definition.derivations.ehua.options.find(
        candidate => candidate.ruleId === EXACT_RULE_ID
    );
    s.eq("the signed Type 1 option carries only the exact lexical readings", {
        frozen: Object.isFrozen(option),
        sourceStem: option.sourceStem,
        sourceMeaning: option.sourceMeaning,
        additionalSourceReadings: option.additionalSourceReadings,
        targetStem: option.targetStem,
        targetClass: option.targetClass,
        targetMeaning: option.targetMeaning,
        additionalTargetReadings: option.additionalTargetReadings,
        ruleId: option.ruleId,
        route: option.derivationRoute,
        procedure: option.procedure,
        formationRuleTier: option.formationRuleTier,
        stemRelation: option.stemRelation,
        callerSuppliedTargetAllowed: option.callerSuppliedTargetAllowed,
        formulaAuthority: option.formulaArtifactAuthority,
        surfaceAuthority: option.surfaceArtifactAuthority,
    }, {
        frozen: true,
        sourceStem: "ē-hua",
        sourceMeaning: "arise-or-depart",
        additionalSourceReadings: [SOURCE_READING],
        targetStem: "ē-hu-a",
        targetClass: "B",
        targetMeaning: "lift-something",
        additionalTargetReadings: TARGET_READINGS,
        ruleId: EXACT_RULE_ID,
        route: "type-one-final-a-morphological-replacement-exact",
        procedure:
            "replace-the-source-final-a-with-homophonous-causative-a-and-expose-the-hu-a-boundary",
        formationRuleTier: "productive-final-shape",
        stemRelation: "surface-identical-morphological-replacement",
        callerSuppliedTargetAllowed: false,
        formulaAuthority: false,
        surfaceAuthority: false,
    });

    const nonspecific = definition.participants.ehuaNonspecific;
    s.eq("the owner computes the ē-hua nonspecific participant and citation", {
        status: nonspecific.authorizationStatus,
        sourceVoice: nonspecific.sourceVoice,
        implicitAgentBecomesCausee:
            nonspecific.implicitAgentBecomesCausativeObject,
        causeeKind: nonspecific.implicitAgentObjectKind,
        targetObjects: nonspecific.targetObjectRequests,
        machineryStatus: nonspecific.machineryAuthorizationStatus,
        finiteStatus: nonspecific.finiteAuthorizationStatus,
        formula: nonspecific.formulaRealization,
        word: nonspecific.wordRealization,
        targetPerfectiveStem: nonspecific.targetPerfectiveStem,
        perfectiveCitation: nonspecific.perfectiveCitationForm,
        citationComputed:
            nonspecific.perfectiveCitationDerivedFromCanonicalComponents,
        storedExampleAuthority: nonspecific.storedExampleAuthority,
    }, {
        status: "authorized",
        sourceVoice: "impersonal",
        implicitAgentBecomesCausee: true,
        causeeKind: "nonspecific-nonhuman",
        targetObjects: [{
            objectId: "causative-object",
            objectKind: "nonspecific-nonhuman",
            objectPerson: "",
            governor: "causative",
            derivationalLevel: 1,
        }],
        machineryStatus: "authorized",
        finiteStatus: "authorized",
        formula: "#0-0+tla(ē-hu-a)0+0-0#",
        word: "tlaēhua",
        targetPerfectiveStem: "ē-uh",
        perfectiveCitation: "tla-(ē-uh)",
        citationComputed: true,
        storedExampleAuthority: false,
    });

    const baseRequest = {
        sourceStem: "ē-hua",
        verbClass: "A",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "3sg",
        objectKind: "none",
        objectPerson: "",
        mood: "indicative",
        requestedDerivation: "causative",
        sourceVoice: "impersonal",
        requestedVoice: "active",
    };
    const generate = (tense, additions = {}) => {
        const request = { ...baseRequest, tense, ...additions };
        const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
        const exact = preview.controlFrame.derivationOptionInventory.options
            .find(candidate => candidate.ruleId === EXACT_RULE_ID);
        const applied = ctx.evaluateClassicalNahuatlVncApplication({
            ...request,
            derivationOptionId:
                exact?.optionId || "missing-ehua-type-one-option",
        });
        return { preview, exact, applied };
    };
    const present = generate("present");
    const preterit = generate("preterit");
    const summarizeGeneration = generated => ({
        previewStatus: generated.preview.authorizationStatus,
        previewReason: generated.preview.blockReason,
        selectionRequired:
            generated.preview.controlFrame.derivationOptionInventory
                .selectionRequired,
        selectedTarget: generated.exact?.targetStem || "",
        appliedStatus: generated.applied.authorizationStatus,
        formula: generated.applied.resultFrame?.formulaRealization || "",
        surface: generated.applied.resultFrame?.surfaceRealization || "",
        resultCanonical:
            ctx.isClassicalNahuatlVncApplicationResultFrame(
                generated.applied.resultFrame
            ),
    });
    s.eq("normal impersonal Grammar generates present and preterit Results", {
        present: summarizeGeneration(present),
        preterit: summarizeGeneration(preterit),
    }, {
        present: {
            previewStatus: "blocked",
            previewReason:
                "classical-vnc-derivation-option-selection-required",
            selectionRequired: true,
            selectedTarget: "ē-hu-a",
            appliedStatus: "authorized",
            formula: "#0-0+tla(ē-hu-a)0+0-0#",
            surface: "tlaēhua",
            resultCanonical: true,
        },
        preterit: {
            previewStatus: "blocked",
            previewReason:
                "classical-vnc-derivation-option-selection-required",
            selectionRequired: true,
            selectedTarget: "ē-hu-a",
            appliedStatus: "authorized",
            formula: "#0-0+tla(ē-uh)0+⎕-0#",
            surface: "tlaēuh",
            resultCanonical: true,
        },
    });

    const hostileFields = {
        sourceMeaning: "caller-source-meaning-must-not-authorize",
        additionalSourceReadings: [{
            meaning: "caller-source-reading-must-not-authorize",
            relation: "caller",
        }],
        targetMeaning: "caller-target-meaning-must-not-authorize",
        additionalTargetReadings: [{
            meaning: "caller-target-reading-must-not-authorize",
            relation: "caller",
        }],
        resultMeaning: "caller-result-meaning-must-not-authorize",
    };
    const hostilePreview = ctx.evaluateClassicalNahuatlVncApplication({
        ...baseRequest,
        tense: "present",
        ...hostileFields,
    });
    const hostile = generate("present", hostileFields);
    const hostileOption = hostile.applied.resultFrame
        ?.derivationOperationFrame?.selectedOption;
    s.eq("read-only meanings neither select Grammar nor accept caller data", {
        ordinaryPreviewStatus: present.preview.authorizationStatus,
        hostilePreviewStatus: hostilePreview.authorizationStatus,
        hostilePreviewReason: hostilePreview.blockReason,
        hostileSelectionRequired:
            hostilePreview.controlFrame.derivationOptionInventory
                .selectionRequired,
        status: hostile.applied.authorizationStatus,
        sourceMeaning: hostileOption?.sourceMeaning || "",
        sourceReadings: hostileOption?.additionalSourceReadings || [],
        targetMeaning: hostileOption?.targetMeaning || "",
        targetReadings: hostileOption?.additionalTargetReadings || [],
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
        sourceMeaning: "arise-or-depart",
        sourceReadings: [SOURCE_READING],
        targetMeaning: "lift-something",
        targetReadings: TARGET_READINGS,
        callerTargetAllowed: false,
        callerAuthorityAccepted: false,
        formula: "#0-0+tla(ē-hu-a)0+0-0#",
        surface: "tlaēhua",
    });

    const unlistedSource = ctx.buildClassicalNahuatlVerbstemClassFrame(
        "xep-ē-hua",
        {
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            verbClass: "A",
            perfectiveClass: "A",
            valence: "intransitive",
            transitivity: "intransitive",
            objectKind: "none",
            objectPerson: "",
        }
    );
    const unlistedInventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(
            unlistedSource,
            { derivationType: "causative" }
        );
    const unlistedOption = unlistedInventory.options.find(
        candidate => candidate.targetStem === "xep-ē-hu-a"
    );
    s.eq("unlisted final-hua input stays productive without lexical readings", {
        status: unlistedInventory.authorizationStatus,
        selectionRequired: unlistedInventory.selectionRequired,
        targetStem: unlistedOption?.targetStem || "",
        route: unlistedOption?.derivationRoute || "",
        formationRuleTier: unlistedOption?.formationRuleTier || "",
        sourceMeaning: unlistedOption?.sourceMeaning || "",
        sourceReadings: unlistedOption?.additionalSourceReadings || [],
        targetMeaning: unlistedOption?.targetMeaning || "",
        targetReadings: unlistedOption?.additionalTargetReadings || [],
    }, {
        status: "authorized",
        selectionRequired: true,
        targetStem: "xep-ē-hu-a",
        route: "type-one-destockal-hua-replacement",
        formationRuleTier: "typed-internal-morphology",
        sourceMeaning: "",
        sourceReadings: [],
        targetMeaning: "",
        targetReadings: [],
    });

    s.eq("copied requests cannot mint any ē-hua atom receipt", {
        authentic: receipts.map(receipt =>
            receipt.result.authorizationStatus),
        copied: receipts.map(receipt =>
            ctx.evaluateClassicalTypeOneFinalAReplacement(
                JSON.parse(JSON.stringify(receipt.source))
            ).authorizationStatus),
    }, {
        authentic: Array(8).fill("authorized"),
        copied: Array(8).fill("blocked"),
    });

    const ownerAssertionIds = (
        ctx.listRoutineSemanticEffectiveProofCoordinates?.() || []
    ).filter(record => record.ownerId === OWNER_ID)
        .map(record => record.assertionId);
    const nonGrammarAtomAssertionIds = [
        `${OWNER_ID}:aci-p200-l004-e576f7cbba`,
        `${OWNER_ID}:aci-p200-l004-e576f7cbba-10`,
    ];
    s.eq("the evidence-pair and English-analysis atoms have no direct owner coordinate",
        nonGrammarAtomAssertionIds.filter(assertionId =>
            ownerAssertionIds.includes(assertionId)), []);

    return s;
}

module.exports = { run };
