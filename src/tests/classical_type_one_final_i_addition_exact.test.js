"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_type_one_final_i_addition_exact");
    const issueReceipt = (selection, facet) => {
        const source = ctx.buildClassicalTypeOneFinalIAdditionSource({
            analysisDomain: "classical-type-one-final-i-addition",
            selection,
            requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx.evaluateClassicalTypeOneFinalIAddition(source);
        return {
            source,
            result,
            evidence:
                ctx.getClassicalTypeOneFinalIAdditionExecutionEvidence(result),
        };
    };
    const formationFacet =
        "aci-p199-l018-5551fb6cd1-type-one-final-i-addition-procedure";
    const classFacet =
        "aci-p199-l022-15b91eac39-type-one-final-i-addition-target-class-c";
    const formationReceipt = issueReceipt("claim-p2294", formationFacet);
    const classReceipt = issueReceipt("claim-p2295", classFacet);
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
            ctx.isClassicalTypeOneFinalIAdditionResult(receipt.result),
        evidenceCanonical:
            ctx.isClassicalTypeOneFinalIAdditionExecutionEvidence(
                receipt.evidence,
                receipt.result
            ),
    });

    s.eq("ACI-P199-L018-5551FB6CD1 owns addition of long causative ā", {
        ...observation(formationReceipt),
    }, {
        status: "authorized",
        canonicalPath: "derivations.ilpi.options.0.procedure",
        sourceCanonicalPath: "derivations.ilpi.options.0.procedure",
        facetValue: "preserve-final-i-and-append-long-causative-a",
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        broadProxyRetired: false,
        resultCanonical: true,
        evidenceCanonical: true,
    });

    s.eq("ACI-P199-L022-15B91EAC39 owns the derived Class C", {
        ...observation(classReceipt),
    }, {
        status: "authorized",
        canonicalPath: "derivations.ilpi.options.0.targetClass",
        sourceCanonicalPath: "derivations.ilpi.options.0.targetClass",
        facetValue: "C",
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        broadProxyRetired: false,
        resultCanonical: true,
        evidenceCanonical: true,
    });

    const ownedDerivation =
        formationReceipt.result.payload.definition.derivations.ilpi;
    const ownedOption = ownedDerivation.options[0];
    s.eq("the two receipts bind the exact signed addition formation", {
        source: [
            ownedDerivation.sourceStem,
            ownedDerivation.sourceClass,
            ownedDerivation.sourceValence,
        ],
        option: {
            ruleId: ownedOption.ruleId,
            route: ownedOption.derivationRoute,
            procedure: ownedOption.procedure,
            targetStem: ownedOption.targetStem,
            targetClass: ownedOption.targetClass,
            callerSuppliedTargetAllowed:
                ownedOption.callerSuppliedTargetAllowed,
        },
    }, {
        source: ["ilpi", "A", "intransitive"],
        option: {
            ruleId: "cn-l24-2431b-ilpi-ilpia",
            route: "type-one-final-i-addition-exact-long-a",
            procedure: "preserve-final-i-and-append-long-causative-a",
            targetStem: "ilpi-ā",
            targetClass: "C",
            callerSuppliedTargetAllowed: false,
        },
    });

    const buildSource = (stem) =>
        ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            verbClass: "A",
            perfectiveClass: "A",
            valence: "intransitive",
            transitivity: "intransitive",
            objectKind: "none",
            objectPerson: "",
        });
    const inspectAddition = (stem, expectedTarget) => {
        const source = buildSource(stem);
        const inventory =
            ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "causative",
            });
        const option = inventory.options.find(candidate => (
            candidate.targetStem === expectedTarget
            && candidate.derivationSubtype === "type-one"
        ));
        return {
            sourceStatus: source.authorizationStatus,
            inventoryStatus: inventory.authorizationStatus,
            inventoryCanonical:
                ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
            targetStem: option?.targetStem || "",
            targetClass: option?.targetClass || "",
            route: option?.derivationRoute || "",
            procedure: option?.procedure || "",
            construction: option?.targetConstruction || null,
            exactWitness: option?.exactWitness === true,
        };
    };
    s.eq("the three Canvas examples remain evidence for one productive rule", [
        inspectAddition("ilpi", "ilpi-ā"),
        inspectAddition("aqui", "aqui-ā"),
        inspectAddition("pah-ti", "pah-ti-ā"),
    ], ["ilpi-ā", "aqui-ā", "pah-ti-ā"].map(targetStem => ({
        sourceStatus: "authorized",
        inventoryStatus: "authorized",
        inventoryCanonical: true,
        targetStem,
        targetClass: "C",
        route: "type-one-final-i-addition-exact-long-a",
        procedure: targetStem === "pah-ti-ā"
            ? "preserve-denominal-ti-and-append-long-causative-a"
            : "preserve-final-i-and-append-long-causative-a",
        construction: {
            operation: "append",
            preserveSource: true,
            add: "ā",
            suffixQuantity: "long",
        },
        exactWitness: true,
    })));

    const unlisted = inspectAddition("zepi", "zepi-ā");
    s.eq("the examples do not gate an unlisted matching Source", unlisted, {
        sourceStatus: "authorized",
        inventoryStatus: "authorized",
        inventoryCanonical: true,
        targetStem: "zepi-ā",
        targetClass: "C",
        route: "type-one-final-i-addition",
        procedure: "preserve-source-and-add-long-causative-a",
        construction: {
            operation: "append",
            preserveSource: true,
            add: "ā",
        },
        exactWitness: false,
    });

    const request = {
        sourceStem: "ilpi",
        verbClass: "A",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "3sg",
        objectKind: "none",
        objectPerson: "",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        sourceVoice: "active",
        requestedVoice: "active",
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const typeOne = preview.controlFrame.derivationOptionInventory.options.find(
        candidate => candidate.ruleId === "cn-l24-2431b-ilpi-ilpia"
    );
    const applied = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        derivationOptionId:
            typeOne?.optionId || "missing-ilpi-type-one-option",
    });
    const cue = ctx.getClassicalFormulaDerivedAnnotations(
        applied.resultFrame?.formulaRealization || "",
        null,
        applied
    ).find(annotation => (
        annotation.role === "lesson24-final-i-type-one-causatives"
    ));
    s.eq("normal Grammar keeps the genuine formation choice and explains addition", {
        previewStatus: preview.authorizationStatus,
        previewReason: preview.blockReason,
        selectionRequired:
            preview.controlFrame.derivationOptionInventory.selectionRequired,
        options: preview.controlFrame.derivationOptionInventory.options.map(
            candidate => candidate.targetStem
        ),
        appliedStatus: applied.authorizationStatus,
        targetStem: typeOne?.targetStem || "",
        cueRetainsAndAdds:
            cue?.label.includes("retain the Source · add ā") === true,
        cueNamesAddition:
            cue?.label.includes(
                "full typed Source retained before long causative ā"
            ) === true,
        cueContradictsItself:
            cue?.label.includes("typed Source boundary replacement") === true,
    }, {
        previewStatus: "blocked",
        previewReason: "classical-vnc-derivation-option-selection-required",
        selectionRequired: true,
        options: ["ilpi-ā", "ilpī-tiā"],
        appliedStatus: "authorized",
        targetStem: "ilpi-ā",
        cueRetainsAndAdds: true,
        cueNamesAddition: true,
        cueContradictsItself: false,
    });

    s.eq("copied requests cannot mint either addition atom receipt", {
        formationAuthentic: formationReceipt.result.authorizationStatus,
        classAuthentic: classReceipt.result.authorizationStatus,
        formationCopied: ctx.evaluateClassicalTypeOneFinalIAddition(
            JSON.parse(JSON.stringify(formationReceipt.source))
        ).authorizationStatus,
        classCopied: ctx.evaluateClassicalTypeOneFinalIAddition(
            JSON.parse(JSON.stringify(classReceipt.source))
        ).authorizationStatus,
    }, {
        formationAuthentic: "authorized",
        classAuthentic: "authorized",
        formationCopied: "blocked",
        classCopied: "blocked",
    });

    return s;
}

module.exports = { run };
