"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function buildSource(ctx, stem, {
    subject = "3sg",
    verbClass = "A",
    tense = "present",
    valence = "intransitive",
    objectKind = "none",
    objectPerson = "",
    initialVowelKind = "",
} = {}) {
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense,
        verbClass,
        perfectiveClass: verbClass,
        valence,
        transitivity: valence === "intransitive" ? "intransitive" : "transitive",
        objectKind,
        objectPerson,
        initialVowelKind,
    });
}

function buildIucApplication(ctx, causativeObjectKind = "") {
    const source = buildSource(ctx, "iuc-ci", {
        verbClass: "A",
        initialVowelKind: "supportive",
    });
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const option = inventory.options.find((candidate) => candidate.targetStem === "iuc-xi-tiā");
    const request = {
        sourceStem: "iuc-ci",
        subject: "1sg",
        sourceSubject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass: "A",
        sourceValence: "intransitive",
        requestedDerivation: "causative",
        derivationOptionId: option.optionId,
        sourceVoice: "active",
        requestedVoice: "active",
        causativeObjectKind,
    };
    return {
        source,
        inventory,
        option,
        request,
        application: ctx.evaluateClassicalNahuatlVncApplication(request),
    };
}

function buildLookaheadMachinery(ctx, stem) {
    const base = buildSource(ctx, stem, {
        subject: "1sg",
        verbClass: "A",
        valence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3pl",
    });
    const cluster = ctx.buildClassicalNahuatlObjectClusterFrame(stem, {
        subject: "1sg",
        subjectCarrier: "ni",
        predicateStem: stem,
        tense: "present",
        objectRequests: [{
            objectId: "outer",
            objectKind: "specific-projective",
            objectPerson: "3pl",
            governor: "causative",
            derivationalLevel: 2,
        }, {
            objectId: "silent",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            governor: "directive",
            derivationalLevel: 1,
        }],
        minimumPositionCount: 2,
        maximumPositionCount: 2,
    });
    return ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(base, cluster);
}

function buildChihuaPassive(ctx) {
    const source = buildSource(ctx, "chīhua", {
        subject: "1pl",
        verbClass: "A",
        valence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
    });
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const option = inventory.options.find((candidate) => candidate.targetStem === "chīhua-l-tiā");
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: option.optionId,
        targetSubject: "3pl",
        causativeObjectKind: "specific-projective",
    });
    const active = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense: "present",
        targetSubject: "3pl",
    });
    const nonactiveInventory = ctx.getClassicalNahuatlNonactiveStemOptions(active.targetStem, {
        verbClass: "C",
        sourceValence: "multiple-object",
    });
    const nonactiveRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord(active.targetStem, {
        verbClass: "C",
        sourceValence: "multiple-object",
        optionId: nonactiveInventory.options[0].optionId,
    });
    return ctx.buildClassicalNahuatlDerivedVncFrame(active, {
        voice: "passive",
        nonactiveStemRecord: nonactiveRecord,
        sourceObjectClusterFrame: active.targetObjectClusterFrame,
        sourceValence: "multiple-object",
        sourceSubject: "3pl",
        mood: "indicative",
        tense: "present",
        verbClass: "C",
    });
}

function buildSingleObjectChihuaPassive(ctx) {
    const active = buildSource(ctx, "chīhua", {
        subject: "1sg",
        verbClass: "A",
        valence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const nonactiveInventory = ctx.getClassicalNahuatlNonactiveStemOptions(active.stem, {
        verbClass: "A",
        sourceValence: "specific-projective",
    });
    const nonactiveRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord(active.stem, {
        verbClass: "A",
        sourceValence: "specific-projective",
        optionId: nonactiveInventory.options[0].optionId,
    });
    return ctx.buildClassicalNahuatlDerivedVncFrame(active, {
        voice: "passive",
        nonactiveStemRecord: nonactiveRecord,
        sourceValence: "specific-projective",
        sourceSubject: "1sg",
        sourceObjectPerson: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass: "A",
    });
}

function buildCuiPerfectivePassive(ctx) {
    const source = buildSource(ctx, "cui", {
        subject: "3sg",
        verbClass: "A",
        tense: "preterit",
        valence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const option = inventory.options.find((candidate) => candidate.targetStem === "cui-tiā");
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: option.optionId,
        targetSubject: "1sg",
        causativeObjectKind: "specific-projective",
    });
    const active = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense: "preterit",
        targetSubject: "1sg",
    });
    const nonactiveInventory = ctx.getClassicalNahuatlNonactiveStemOptions(active.targetStem, {
        verbClass: "C",
        sourceValence: "multiple-object",
    });
    const nonactiveOption = nonactiveInventory.options.find((candidate) => candidate.suffixFamily === "lō");
    const nonactiveRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord(active.targetStem, {
        verbClass: "C",
        sourceValence: "multiple-object",
        optionId: nonactiveOption.optionId,
    });
    return ctx.buildClassicalNahuatlDerivedVncFrame(active, {
        voice: "passive",
        nonactiveStemRecord: nonactiveRecord,
        sourceObjectClusterFrame: active.targetObjectClusterFrame,
        sourceValence: "multiple-object",
        sourceSubject: active.targetSubject,
        mood: "indicative",
        tense: "preterit",
        verbClass: "C",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_finite_surface_contract");

    const pendingBundle = buildIucApplication(ctx, "");
    const pending = pendingBundle.application;
    const equalThirdPersonPending = ctx.evaluateClassicalNahuatlVncApplication({
        ...pendingBundle.request,
        subject: "3sg",
        sourceSubject: "3sg",
    });
    const equalThirdPersonSpecificPending = ctx.evaluateClassicalNahuatlVncApplication({
        ...pendingBundle.request,
        subject: "3sg",
        sourceSubject: "3sg",
        causativeObjectKind: "specific-projective",
    });
    const formationPending = ctx.evaluateClassicalNahuatlVncApplication({
        ...pendingBundle.request,
        derivationOptionId: "",
    });
    const nonhuman = buildIucApplication(ctx, "specific-projective").application;
    const human = buildIucApplication(ctx, "reflexive").application;

    s.eq("active causative object kind is derived from source voice before #3 authorization", {
        status: pending.authorizationStatus,
        reason: pending.blockReason,
        controlStatus: pending.controlFrame.authorizationStatus,
        eligible: pending.controlFrame.causativeObjectKindChoiceEligible,
        required: pending.controlFrame.causativeObjectKindSelectionRequired,
        allowed: pending.controlFrame.allowedCausativeObjectKinds,
        selected: pending.controlFrame.selectedCausativeObjectKind,
        resultSurface: pending.resultFrame.surfaceRealization,
    }, {
        status: "authorized",
        reason: "",
        controlStatus: "authorized",
        eligible: false,
        required: false,
        allowed: [],
        selected: "specific-projective",
        resultSurface: "niquiucxitia",
    });

    s.eq("equal third-person causative participants choose causee Valence directly", {
        missingObjectStatus: equalThirdPersonPending.authorizationStatus,
        missingObjectReason: equalThirdPersonPending.blockReason,
        objectEligible: equalThirdPersonPending.controlFrame.causativeObjectKindChoiceEligible,
        objectRequired: equalThirdPersonPending.controlFrame.causativeObjectKindSelectionRequired,
        selectedObject: equalThirdPersonPending.controlFrame.selectedCausativeObjectKind,
        allowedObjects: equalThirdPersonPending.controlFrame.allowedCausativeObjectKinds,
        specificObjectStatus: equalThirdPersonSpecificPending.authorizationStatus,
        specificObjectReason: equalThirdPersonSpecificPending.blockReason,
        legacyRelationAuthority: Object.prototype.hasOwnProperty.call(
            equalThirdPersonSpecificPending.controlFrame,
            "causativeReferentRelationChoiceEligible"
        ),
    }, {
        missingObjectStatus: "blocked",
        missingObjectReason: "classical-vnc-causative-causee-valence-selection-required",
        objectEligible: true,
        objectRequired: true,
        selectedObject: "",
        allowedObjects: ["specific-projective", "reflexive"],
        specificObjectStatus: "authorized",
        specificObjectReason: "",
        legacyRelationAuthority: false,
    });

    s.eq("formation selection precedes the causative participant gate when Andrews generates alternatives", {
        status: formationPending.authorizationStatus,
        reason: formationPending.blockReason,
        controlStatus: formationPending.controlFrame.authorizationStatus,
        formationRequired: formationPending.controlFrame.derivationSelectorRequired,
        selectedFormation: formationPending.controlFrame.selectedDerivationOptionId,
        objectChoiceEligible: formationPending.controlFrame.causativeObjectKindChoiceEligible,
        objectChoiceRequired: formationPending.controlFrame.causativeObjectKindSelectionRequired,
    }, {
        status: "blocked",
        reason: "classical-vnc-derivation-option-selection-required",
        controlStatus: "blocked",
        formationRequired: true,
        selectedFormation: "",
        objectChoiceEligible: false,
        objectChoiceRequired: false,
    });

    s.eq("typed causee Valence authorizes the finite causative surface", {
        application: nonhuman.authorizationStatus,
        applicationCanonical: ctx.isClassicalNahuatlVncApplicationFrame(nonhuman),
        selected: nonhuman.controlFrame.selectedCausativeObjectKind,
        finiteKind: nonhuman.resultFrame.finiteSurfaceFrame.kind,
        finiteCanonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(nonhuman.resultFrame.finiteSurfaceFrame),
        surface: nonhuman.resultFrame.surfaceRealization,
    }, {
        application: "authorized",
        applicationCanonical: true,
        selected: "specific-projective",
        finiteKind: "classical-nahuatl-vnc-finite-surface-frame",
        finiteCanonical: true,
        surface: "niquiucxitia",
    });

    s.eq("splicing a different valid participant request cannot authorize the old operation", ctx.isClassicalNahuatlVncApplicationFrame({
        ...nonhuman,
        normalizedRequest: human.normalizedRequest,
        controlFrame: human.controlFrame,
    }), false);

    const finite = nonhuman.resultFrame.finiteSurfaceFrame;
    const citation = ctx.buildClassicalNahuatlCanvasCitationProjectionFrame(nonhuman.resultFrame.activeMachineryFrame);
    const citationInventory = ctx.getClassicalNahuatlCanvasCitationProjectionInventory(
        buildIucApplication(ctx, "nonspecific-nonhuman").source,
        { derivationType: "causative", targetSubject: "1sg" }
    );
    const hostileInventoryOption = {
        ...citationInventory.options[0],
        targetSurface: "caller-owned-target",
    };
    const hostileInventory = {
        ...citationInventory,
        options: [hostileInventoryOption, ...citationInventory.options.slice(1)],
    };
    s.eq("finite, citation, and inventory option validators reject appended target strings", {
        finite: ctx.isClassicalNahuatlVncFiniteSurfaceFrame({ ...finite, targetSurface: "caller-owned-target" }),
        citation: ctx.isClassicalNahuatlCanvasCitationProjectionFrame({ ...citation, targetSurface: "caller-owned-target" }),
        inventoryOption: ctx.isClassicalNahuatlCanvasCitationProjectionInventory(hostileInventory),
        finiteBuilder: ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(nonhuman.resultFrame.activeMachineryFrame, { targetSurface: "caller-owned-target" }).blockReason,
        citationBuilder: ctx.buildClassicalNahuatlCanvasCitationProjectionFrame(nonhuman.resultFrame.activeMachineryFrame, { targetSurface: "caller-owned-target" }).blockReason,
    }, {
        finite: false,
        citation: false,
        inventoryOption: false,
        finiteBuilder: "classical-vnc-caller-supplied-surface-authority-rejected",
        citationBuilder: "classical-lessons24-25-caller-supplied-surface-authority-rejected",
    });

    const schematicSource = buildSource(ctx, "tomi", { subject: "3sg", verbClass: "B" });
    const schematicDerivationInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(schematicSource, {
        derivationType: "causative",
    });
    const schematic = ctx.getClassicalNahuatlCanvasSchematicCitationPossibilityInventory(
        schematicSource,
        schematicDerivationInventory
    );
    const tomAOption = schematicDerivationInventory.options.find((option) => option.targetStem === "tom-a");
    const tomAPossibilities = schematic.possibilities.filter((possibility) => possibility.derivationOptionId === tomAOption.optionId);
    const schematicEquivalence = tomAPossibilities.map((possibility) => {
        const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(schematicSource, possibility.operationFrame, {
            mood: "indicative",
            tense: "present",
            targetSubject: possibility.profile.targetSubject,
        });
        const fullProjection = ctx.buildClassicalNahuatlCanvasCitationProjectionFrame(machinery);
        return {
            profileId: possibility.profile.profileId,
            relation: possibility.relationRealization === fullProjection.relationRealization,
            sourceHistory: possibility.sourceHistoryRealization === fullProjection.sourceHistoryRealization,
            citation: possibility.citationRealization === fullProjection.citationRealization,
            roles: JSON.stringify(possibility.orderedParticipantRoles) === JSON.stringify(fullProjection.orderedParticipantRoles),
        };
    });
    const hostileSchematicPossibility = {
        ...schematic.possibilities[0],
        targetCitation: "caller-owned-target",
    };
    const nonhumanSchematicPossibility = tomAPossibilities.find((possibility) => possibility.profile.profileId === "nonspecific-nonhuman");
    const nonhumanFullMachinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
        schematicSource,
        nonhumanSchematicPossibility.operationFrame,
        { mood: "indicative", tense: "present", targetSubject: nonhumanSchematicPossibility.profile.targetSubject }
    );
    const nonhumanFullProjection = ctx.buildClassicalNahuatlCanvasCitationProjectionFrame(nonhumanFullMachinery);
    s.eq("the signed schematic projector keeps dictionary citation roles separate from finite participant authority", {
        status: schematic.authorizationStatus,
        canonical: ctx.isClassicalNahuatlCanvasSchematicCitationPossibilityInventory(schematic),
        profiles: tomAPossibilities.map((possibility) => possibility.profile.profileId),
        equivalence: schematicEquivalence,
        nonhumanEvidenceBoundary: {
            schematicCitation: nonhumanSchematicPossibility.citationRealization,
            schematicCitationRole: nonhumanSchematicPossibility.schematicCitationRole,
            finiteCitation: nonhumanFullProjection.citationRealization,
            finiteObjectKind: nonhumanSchematicPossibility.operationFrame.targetObjectRequests[0]?.objectKind || "",
        },
        noFullTargetFrames: schematic.possibilities.every((possibility) => !("machineryFrame" in possibility) && !("projectionFrame" in possibility)),
        hostile: ctx.isClassicalNahuatlCanvasSchematicCitationPossibilityInventory({
            ...schematic,
            possibilities: [hostileSchematicPossibility, ...schematic.possibilities.slice(1)],
        }),
    }, {
        status: "authorized",
        canonical: true,
        profiles: ["specific-projective-distinct", "nonspecific-human", "nonspecific-nonhuman", "coreferential-reflexive"],
        equivalence: [
            { profileId: "specific-projective-distinct", relation: true, sourceHistory: true, citation: true, roles: true },
            { profileId: "nonspecific-human", relation: true, sourceHistory: true, citation: true, roles: true },
            { profileId: "nonspecific-nonhuman", relation: false, sourceHistory: true, citation: false, roles: false },
            { profileId: "coreferential-reflexive", relation: true, sourceHistory: true, citation: true, roles: true },
        ],
        nonhumanEvidenceBoundary: {
            schematicCitation: "tla-(tom-a)",
            schematicCitationRole: "tla",
            finiteCitation: "tē-(tom-a)",
            finiteObjectKind: "specific-projective",
        },
        noFullTargetFrames: true,
        hostile: false,
    });

    s.eq("citation projection preserves lexical quantity, perfective zero omission, and mainline reflexive form", (() => {
        const ilpiPresent = buildSource(ctx, "ilpi-ā", { verbClass: "C", valence: "projective-nonhuman", objectKind: "nonspecific-nonhuman" });
        const ilpiPreterit = buildSource(ctx, "ilpi-ā", { verbClass: "C", tense: "preterit", valence: "projective-nonhuman", objectKind: "nonspecific-nonhuman" });
        const tomaPreterit = buildSource(ctx, "tom-a", { verbClass: "B", tense: "preterit", valence: "projective-nonhuman", objectKind: "nonspecific-nonhuman" });
        const ehua = buildSource(ctx, "ē-hu-a", { verbClass: "B", valence: "mainline-reflexive", objectKind: "reflexive" });
        return [ilpiPresent, ilpiPreterit, tomaPreterit, ehua]
            .map((frame) => ctx.buildClassicalNahuatlCanvasCitationProjectionFrame(frame).citationRealization);
    })(), ["tla-(ilpi-ā)", "tla-(ilpi-h)", "tla-(ton)", "m-Ø-(ē-hu-a)"]);

    s.eq("qu-im scans across a silent slot to the next sounded carrier", ["mati", "caqui"].map((stem) => {
        const machinery = buildLookaheadMachinery(ctx, stem);
        const frame = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
        return [frame.wordRealization, frame.orderedParticipantRoles.map((role) => role.surface)];
    }), [
        ["niquimmati", ["quim", ""]],
        ["niquincaqui", ["quin", ""]],
    ]);

    const futureOptativeCommand = ctx.buildClassicalNahuatlVerbstemClassFrame("tequi-ti", {
        subject: "2sg",
        mood: "optative",
        tense: "future",
        verbClass: "B",
        perfectiveClass: "B",
        valence: "intransitive",
        transitivity: "intransitive",
        sentenceSurfaceMode: "command",
        introductoryParticle: "mā",
    });
    const futureOptativeFinite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(futureOptativeCommand);
    const hostileFutureFormula = JSON.parse(JSON.stringify(futureOptativeCommand));
    hostileFutureFormula.formulaRealization = "#CALLER-FORMULA#";
    const hostileFutureProof = JSON.parse(JSON.stringify(futureOptativeCommand));
    hostileFutureProof.proofFrame.conclusion.authorized = false;
    s.eq("direct future-optative command machinery is admitted by typed formula continuity and fails closed on hostile drift", {
        status: futureOptativeFinite.authorizationStatus,
        canonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(futureOptativeFinite),
        word: futureOptativeFinite.wordRealization,
        formulaDrift: ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(hostileFutureFormula).blockReason,
        proofDrift: ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(hostileFutureProof).blockReason,
        callerTarget: ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(futureOptativeCommand, {
            targetSurface: "caller-owned-target",
        }).blockReason,
    }, {
        status: "authorized",
        canonical: true,
        word: "titequitiz",
        formulaDrift: "classical-vnc-canonical-machinery-required",
        proofDrift: "classical-vnc-canonical-machinery-required",
        callerTarget: "classical-vnc-caller-supplied-surface-authority-rejected",
    });

    const reflexiveItta = buildSource(ctx, "itta", {
        subject: "3sg",
        verbClass: "A",
        valence: "mainline-reflexive",
        objectKind: "reflexive",
    });
    const reflexiveIttaFinite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(reflexiveItta);
    s.eq("the typed m-o reflexive allomorph is retained before itta", {
        status: reflexiveIttaFinite.authorizationStatus,
        canonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(reflexiveIttaFinite),
        word: reflexiveIttaFinite.wordRealization,
        ruleIds: reflexiveIttaFinite.ruleFrames.map((rule) => rule.ruleId),
        carriers: reflexiveIttaFinite.typedFrame.slots.prePredicate.map((slot) => slot.carrier),
        predicate: reflexiveIttaFinite.typedFrame.slots.predicate.stem,
        positions: reflexiveIttaFinite.participantPositions.map((position) => position.objectKind),
    }, {
        status: "authorized",
        canonical: true,
        word: "moitta",
        ruleIds: ["cn-vnc-typed-finite-word-projection", "cn-vnc-itta-reflexive-o-retention"],
        carriers: ["m-⎕"],
        predicate: "itta",
        positions: ["reflexive"],
    });

    const passiveFinite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(buildChihuaPassive(ctx));
    s.eq("generic finite projection admits canonical Lessons 20-22 voice output and preserves causative -tīlō quantity", {
        status: passiveFinite.authorizationStatus,
        canonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(passiveFinite),
        word: passiveFinite.wordRealization,
    }, {
        status: "authorized",
        canonical: true,
        word: "titlachīhualtīloh",
    });

    const singleObjectPassive = buildSingleObjectChihuaPassive(ctx);
    const singleObjectPassiveFinite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(singleObjectPassive);
    s.eq("single-object voice frames require the canonical null/null cluster relation", {
        sourceCluster: singleObjectPassive.sourceObjectClusterFrame,
        voiceCluster: singleObjectPassive.voiceObjectClusterFrame,
        finiteStatus: singleObjectPassiveFinite.authorizationStatus,
        finiteCanonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(singleObjectPassiveFinite),
        missingSourceClusterKey: ctx.buildClassicalNahuatlVncFiniteSurfaceFrame((({ sourceObjectClusterFrame, ...frame }) => frame)(singleObjectPassive)).blockReason,
        forgedVoiceCluster: ctx.buildClassicalNahuatlVncFiniteSurfaceFrame({
            ...singleObjectPassive,
            voiceObjectClusterFrame: buildChihuaPassive(ctx).voiceObjectClusterFrame,
        }).blockReason,
    }, {
        sourceCluster: null,
        voiceCluster: null,
        finiteStatus: "authorized",
        finiteCanonical: true,
        missingSourceClusterKey: "classical-vnc-canonical-machinery-required",
        forgedVoiceCluster: "classical-vnc-canonical-machinery-required",
    });

    const implicitThirdNonactiveInventory = ctx.getClassicalNahuatlNonactiveStemOptions("quiyahu-iā", {
        verbClass: "C",
        sourceValence: "specific-projective",
    });
    const implicitThirdNonactiveOption = implicitThirdNonactiveInventory.options.find((candidate) => candidate.nonactiveStem === "quiyahu-i-lō");
    const implicitThirdPassive = ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "quiyahu-iā",
        verbClass: "C",
        sourceValence: "specific-projective",
        subject: "3sg",
        requestedVoice: "passive",
        nonactiveOptionId: implicitThirdNonactiveOption.optionId,
    });
    const diagnosticOnlyDrift = {
        ...implicitThirdPassive.resultFrame.selectedMachineryFrame,
        derivedMachineryFrame: {
            ...implicitThirdPassive.resultFrame.selectedMachineryFrame.derivedMachineryFrame,
            objectRelationshipRuleFrame: {
                ...implicitThirdPassive.resultFrame.selectedMachineryFrame.derivedMachineryFrame.objectRelationshipRuleFrame,
                valence: "projective-human",
            },
        },
    };
    const diagnosticOnlyFinite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(diagnosticOnlyDrift);
    s.eq("an earlier lesson diagnostic cannot veto an otherwise canonical complete voice result", {
        applicationStatus: implicitThirdPassive.authorizationStatus,
        finiteCanonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(implicitThirdPassive.resultFrame.finiteSurfaceFrame),
        diagnosticOnlyStatus: diagnosticOnlyFinite.authorizationStatus,
        diagnosticOnlyWordMatches: diagnosticOnlyFinite.wordRealization === implicitThirdPassive.resultFrame.surfaceRealization,
    }, {
        applicationStatus: "authorized",
        finiteCanonical: true,
        diagnosticOnlyStatus: "authorized",
        diagnosticOnlyWordMatches: true,
    });

    const cuiPerfectivePassive = buildCuiPerfectivePassive(ctx);
    const cuiPerfectiveFinite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(cuiPerfectivePassive);
    const hostileCuiVoice = JSON.parse(JSON.stringify(cuiPerfectivePassive));
    hostileCuiVoice.derivedMachineryFrame.priorVncFrame.requestedSourceValence = "intransitive";
    hostileCuiVoice.derivedMachineryFrame.objectRelationshipRuleFrame.valence = "intransitive";
    hostileCuiVoice.derivedMachineryFrame.objectRelationshipRuleFrame.selectedObjectPerson = "";
    s.eq("voice replay preserves canonical active valence/object context and rejects candidate-only drift", {
        finiteStatus: cuiPerfectiveFinite.authorizationStatus,
        finiteCanonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(cuiPerfectiveFinite),
        word: cuiPerfectiveFinite.wordRealization,
        hostile: ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(hostileCuiVoice).blockReason,
        hostileWithCallerOptions: ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(hostileCuiVoice, {
            sentenceOptions: { requestedSourceValence: "specific-projective", object: "3sg" },
        }).blockReason,
        cleanWithCallerOptions: ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(cuiPerfectivePassive, {
            sentenceOptions: { requestedSourceValence: "intransitive", object: "1sg" },
        }).canonicalSignature === cuiPerfectiveFinite.canonicalSignature,
    }, {
        finiteStatus: "authorized",
        finiteCanonical: true,
        word: "cuītīlōc",
        hostile: "classical-vnc-canonical-machinery-required",
        hostileWithCallerOptions: "classical-vnc-canonical-machinery-required",
        cleanWithCallerOptions: true,
    });

    const ihtaLHuia = buildSource(ctx, "iht-a-l-huia", {
        subject: "1sg",
        verbClass: "A",
        valence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const ihtaLHuiaFinite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(ihtaLHuia);
    const objectPredicateBoundary = ihtaLHuiaFinite.neighboringBoundaries.find((boundary) => (
        boundary.leftSlotRole === "pre-predicate"
        && boundary.rightSlotRole === "predicate"
    ));
    s.eq("the ordered boundary projection applies Lesson 2 between a third-singular k object and initial i", {
        status: ihtaLHuiaFinite.authorizationStatus,
        canonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(ihtaLHuiaFinite),
        formula: ihtaLHuiaFinite.formulaRealization,
        word: ihtaLHuiaFinite.wordRealization,
        morphemes: ihtaLHuiaFinite.orderedMorphemes.map((morpheme) => `${morpheme.order}:${morpheme.slotRole}:${morpheme.surface}`),
        allBoundaryOrder: ihtaLHuiaFinite.orderedBoundaries.map((boundary) => `${boundary.boundaryOrder}:${boundary.leftMorphemeOrder}>${boundary.rightMorphemeOrder}`),
        boundaryOrder: ihtaLHuiaFinite.neighboringBoundaries.map((boundary) => `${boundary.boundaryOrder}:${boundary.leftMorphemeOrder}>${boundary.rightMorphemeOrder}`),
        objectPredicate: {
            before: objectPredicateBoundary?.leftSurfaceBefore,
            after: objectPredicateBoundary?.leftSurfaceAfter,
            right: objectPredicateBoundary?.rightSurfaceAfter,
            rules: objectPredicateBoundary?.appliedRuleIds,
        },
    }, {
        status: "authorized",
        canonical: true,
        formula: "#ni-0+qu-0(iht-a-l-huia)0+0-0#",
        word: "niquihtalhuia",
        morphemes: [
            "0:subject:ni",
            "1:pre-predicate:qu",
            "2:predicate:iht",
            "3:predicate:a",
            "4:predicate:l",
            "5:predicate:huia",
            "6:tense:",
            "7:number:",
            "8:number:",
        ],
        allBoundaryOrder: ["0:0>1", "1:1>2", "2:2>3", "3:3>4", "4:4>5", "5:5>6", "6:6>7", "7:7>8"],
        boundaryOrder: ["0:0>1", "1:1>2", "2:2>3", "3:3>4", "4:4>5"],
        objectPredicate: {
            before: "qu",
            after: "qu",
            right: "iht",
            rules: ["cn-l2-24-k-initial-before-e-i"],
        },
    });

    const ihtaMultipleCluster = ctx.buildClassicalNahuatlObjectClusterFrame("iht-a-l-huia", {
        subject: "1sg",
        subjectCarrier: "ni",
        predicateStem: "iht-a-l-huia",
        tense: "present",
        objectRequests: [{
            objectId: "outer",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            governor: "applicative",
            derivationalLevel: 2,
        }, {
            objectId: "retained",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            governor: "directive",
            derivationalLevel: 1,
        }],
        minimumPositionCount: 2,
        maximumPositionCount: 2,
    });
    const ihtaMultipleMachinery = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(ihtaLHuia, ihtaMultipleCluster);
    const ihtaMultipleFinite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(ihtaMultipleMachinery);
    const ihtaMultipleObjectMorpheme = ihtaMultipleFinite.orderedMorphemes.find((morpheme) => (
        morpheme.slotRole === "pre-predicate" && morpheme.sounded
    ));
    const ihtaMultipleObjectBoundary = ihtaMultipleFinite.neighboringBoundaries.find((boundary) => (
        boundary.appliedRuleIds.includes("cn-l2-24-k-initial-before-e-i")
    ));
    const hostileIhtaMultipleProjection = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(ihtaMultipleMachinery, {
        formula: "#CALLER-FORMULA#",
    });
    s.eq("a silent retained object does not hide the following predicate from the ordered boundary rule", {
        status: ihtaMultipleFinite.authorizationStatus,
        formula: ihtaMultipleFinite.formulaRealization,
        word: ihtaMultipleFinite.wordRealization,
        carriers: ihtaMultipleFinite.typedFrame?.slots?.prePredicate.map((slot) => slot.carrier),
        soundedBoundary: ihtaMultipleFinite.neighboringBoundaries.find((boundary) => boundary.appliedRuleIds.includes("cn-l2-24-k-initial-before-e-i"))?.rightSurfaceAfter,
        independentProjections: {
            formulaCarrier: ihtaMultipleObjectMorpheme?.formulaCarrier,
            writtenCarrier: ihtaMultipleObjectMorpheme?.surface,
            formulaProjectionCarrier: ihtaMultipleFinite.formulaProjection?.morphemes
                .find((morpheme) => morpheme.order === ihtaMultipleObjectMorpheme?.order)?.carrier,
            formulaDerivedFromWritten: ihtaMultipleFinite.formulaDerivedFromWrittenProjection,
            writtenDerivedFromFormula: ihtaMultipleFinite.writtenDerivedFromFormulaProjection,
        },
        boundaryFormulaCarrier: {
            before: ihtaMultipleObjectBoundary?.leftFormulaCarrierBefore,
            after: ihtaMultipleObjectBoundary?.leftFormulaCarrierAfter,
            changed: ihtaMultipleObjectBoundary?.formulaCarrierChangedByWrittenBoundary,
        },
        exactNegative: ihtaMultipleFinite.formulaRealization.includes("+qu-0+"),
        hostile: {
            status: hostileIhtaMultipleProjection.authorizationStatus,
            reason: hostileIhtaMultipleProjection.blockReason,
            rejected: hostileIhtaMultipleProjection.rejectedAuthorityFields,
        },
    }, {
        status: "authorized",
        formula: "#ni-0+c-0+⎕-0(iht-a-l-huia)0+0-0#",
        word: "niquihtalhuia",
        carriers: ["c-0", "0-0"],
        soundedBoundary: "iht",
        independentProjections: {
            formulaCarrier: "c-0",
            writtenCarrier: "qu",
            formulaProjectionCarrier: "c-0",
            formulaDerivedFromWritten: false,
            writtenDerivedFromFormula: false,
        },
        boundaryFormulaCarrier: {
            before: "c-0",
            after: "c-0",
            changed: false,
        },
        exactNegative: false,
        hostile: {
            status: "blocked",
            reason: "classical-vnc-caller-supplied-surface-authority-rejected",
            rejected: ["formula"],
        },
    });

    const registry = ctx.getDefaultGrammarContractRegistry();
    s.eq("the four new surface contracts are registered", [
        "classical-nahuatl-vnc-finite-surface-frame",
        "classical-nahuatl-derived-vnc-canvas-citation-projection-frame",
        "classical-nahuatl-derived-vnc-canvas-citation-projection-inventory",
        "classical-nahuatl-derived-vnc-canvas-schematic-citation-possibility-inventory",
    ].map((kind) => Boolean(ctx.getGrammarContractDefinition(registry, kind, 1))), [true, true, true, true]);
    s.eq("the registry accepts canonical finite and citation frames", [
        ctx.isRegisteredGrammarContract(registry, finite, { contractKind: finite.kind, version: 1 }),
        ctx.isRegisteredGrammarContract(registry, citation, { contractKind: citation.kind, version: 1 }),
        ctx.isRegisteredGrammarContract(registry, citationInventory, { contractKind: citationInventory.kind, version: 1 }),
        ctx.isRegisteredGrammarContract(registry, schematic, { contractKind: schematic.kind, version: 1 }),
    ], [true, true, true, true]);

    const shellSource = fs.readFileSync(path.resolve(__dirname, "../ui/shell/classical_shell.mjs"), "utf8");
    const composerSource = fs.readFileSync(path.resolve(__dirname, "../ui/composer/composer.mjs"), "utf8");
    s.ok("the removed object-kind summary exposes no obsolete reset action", !shellSource.includes('data-classical-segment-control="classical-rule-logic-causative-object-kind"')
        && !shellSource.includes('data-classical-segment-reset="true"'));
    s.ok("the shared segment handler dispatches intentional empty resets", composerSource.includes('const intentionalReset = option.dataset.classicalSegmentReset === "true";')
        && composerSource.includes("!value && !intentionalReset"));

    return s;
}

module.exports = { run };
