"use strict";

const { createSuite } = require("./runner");

function buildSpecificSource(ctx, {
    stem,
    subject,
    objectPerson,
    tense,
}) {
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense,
        verbClass: "A",
        perfectiveClass: "A",
        valence: "specific-projective",
        requestedSourceValence: "specific-projective",
        transitivity: "transitive",
        objectKind: "specific-projective",
        objectPerson,
    });
}

function deriveCausative(ctx, source, {
    targetStem,
    targetSubject,
    causativeObjectKind = "specific-projective",
}) {
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const option = inventory.options.find(candidate => candidate.targetStem === targetStem);
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: option?.optionId || "missing-option",
        targetSubject,
        causativeObjectKind,
    });
    const active = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense: source.priorVncFrame?.tense || source.tense,
        targetSubject,
    });
    return { inventory, option, operation, active };
}

function passivizeDerivedCausative(ctx, active, tense) {
    const nonactiveInventory = ctx.getClassicalNahuatlNonactiveStemOptions(active.targetStem, {
        verbClass: "C",
        sourceValence: "multiple-object",
    });
    const nonactiveOption = nonactiveInventory.options.find(option => option.suffixFamily === "lō");
    const nonactiveRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord(active.targetStem, {
        verbClass: "C",
        sourceValence: "multiple-object",
        optionId: nonactiveOption?.optionId || "missing-nonactive-option",
    });
    const passive = ctx.buildClassicalNahuatlDerivedVncFrame(active, {
        voice: "passive",
        nonactiveStemRecord: nonactiveRecord,
        sourceObjectClusterFrame: active.targetObjectClusterFrame,
        sourceValence: "multiple-object",
        sourceSubject: active.targetSubject,
        mood: "indicative",
        tense,
        verbClass: "C",
    });
    return { nonactiveInventory, nonactiveOption, nonactiveRecord, passive };
}

function finiteSurface(ctx, machinery) {
    const frame = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
    return {
        canonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(frame),
        word: frame.wordRealization,
    };
}

function selectCanonicalCausativeRequest(application, request, targetStem) {
    const preview = application.evaluate(request);
    const option = preview.controlFrame.derivationOptionInventory?.options
        ?.find(candidate => candidate.targetStem === targetStem);
    return {
        ...request,
        derivationOptionId: option?.optionId || `missing-${targetStem}`,
    };
}

function evaluateCanonicalVoice(application, request, voice) {
    const preview = application.evaluate({
        ...request,
        requestedVoice: voice,
    });
    const nonactiveOptionId = preview.controlFrame.nonactiveOptionInventory?.automaticOptionId
        || preview.controlFrame.nonactiveOptionInventory?.options?.[0]?.optionId
        || "";
    const selectedRequest = {
        ...request,
        requestedVoice: voice,
        nonactiveOptionId,
    };
    return {
        request: selectedRequest,
        result: application.evaluate(selectedRequest),
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_15_voice_routes");

    s.eq(
        "25.15 passivizes the canonical two-specific-object nōtza causative and retains third-plural qu-in",
        (() => {
            const source = buildSpecificSource(ctx, {
                stem: "nōtza",
                subject: "2sg",
                objectPerson: "3pl",
                tense: "present",
            });
            const derived = deriveCausative(ctx, source, {
                targetStem: "nōtza-l-tiā",
                targetSubject: "1pl",
            });
            const voice = passivizeDerivedCausative(ctx, derived.active, "present");
            return {
                sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source),
                option: [derived.option?.targetStem, derived.option?.ruleId],
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operation),
                activeCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.active),
                activeFormula: derived.active.formulaRealization,
                activeSurface: finiteSurface(ctx, derived.active),
                activePositions: derived.active.targetObjectClusterFrame?.positions.map(position => [
                    position.objectId,
                    position.objectPerson,
                    position.prominence,
                    position.carrier,
                ]),
                nonactive: [
                    voice.nonactiveOption?.nonactiveStem,
                    voice.nonactiveOption?.ruleId,
                    ctx.isClassicalNahuatlNonactiveStemRecord(voice.nonactiveRecord, derived.active.targetStem),
                ],
                passiveCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(voice.passive),
                passiveFormula: voice.passive.formulaRealization,
                passiveSurface: finiteSurface(ctx, voice.passive),
                promoted: [
                    voice.passive.subject,
                    voice.passive.voiceObjectClusterFrame?.promotedObjectId,
                    voice.passive.voiceObjectClusterFrame?.promotedObjectPerson,
                ],
                retained: voice.passive.voiceObjectClusterFrame?.positions.map(position => [
                    position.objectId,
                    position.objectPerson,
                    position.carrier,
                ]),
            };
        })(),
        {
            sourceCanonical: true,
            option: ["nōtza-l-tiā", "cn-l25-254-lo-to-l-tia:cn-l20-4-final-sa-lo-variant"],
            operationCanonical: true,
            activeCanonical: true,
            activeFormula: "#ti-0+m-itz+⎕-in(nōtza-l-tia)0+0-h#",
            activeSurface: { canonical: true, word: "timitzinnōtzaltiah" },
            activePositions: [
                ["causative-object", "2sg", "mainline", "m-itz"],
                ["source-object-1", "3pl", "shuntline", "0-im"],
            ],
            nonactive: ["nōtza-l-tī-lō", "cn-l20-2-class-c-final-i-lengthening", true],
            passiveCanonical: true,
            passiveFormula: "#ti-0+qu-in(nōtza-l-tī-lo)0+0-0#",
            passiveSurface: { canonical: true, word: "tiquinnōtzaltīlo" },
            promoted: ["2sg", "causative-object", "2sg"],
            retained: [["source-object-1", "3pl", "qu-im"]],
        }
    );

    s.eq(
        "25.15 derives exact cui-tiā, typed first-singular reflexive Valence, and the perfective passive continuation",
        (() => {
            const source = buildSpecificSource(ctx, {
                stem: "cui",
                subject: "1sg",
                objectPerson: "3sg",
                tense: "preterit",
            });
            const derived = deriveCausative(ctx, source, {
                targetStem: "cui-tiā",
                targetSubject: "1sg",
                causativeObjectKind: "mainline-reflexive",
            });
            const voice = passivizeDerivedCausative(ctx, derived.active, "preterit");
            const activeSurfaceFrame = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(derived.active);
            const passiveSurfaceFrame = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(voice.passive);
            const lesson2515QuantityRuleId = "cn-l25-2515-cui-passive-root-quantity-finalizer";
            const ignoredLegacyRelation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                optionId: derived.option?.optionId || "missing-option",
                targetSubject: "1sg",
                causativeObjectKind: "mainline-reflexive",
                causativeReferentRelation: "coreferential",
            });
            const forgedOperation = JSON.parse(JSON.stringify(derived.operation));
            forgedOperation.targetStem = "catalog-target-cannot-authorize";
            return {
                sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source),
                option: [derived.option?.targetStem, derived.option?.ruleId, derived.option?.baseTargetStem || ""],
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operation),
                participantRequests: derived.operation.targetObjectRequests.map(request => [
                    request.objectId,
                    request.objectKind,
                    request.objectPerson,
                    request.derivationalLevel,
                ]),
                activeCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.active),
                activeFormula: derived.active.formulaRealization,
                activeSurface: {
                    canonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(activeSurfaceFrame),
                    word: activeSurfaceFrame.wordRealization,
                },
                activePrematureFinalizerBlocked: !activeSurfaceFrame.ruleFrames.some(frame => frame.ruleId === lesson2515QuantityRuleId),
                nonactive: [
                    voice.nonactiveOption?.nonactiveStem,
                    voice.nonactiveOption?.ruleId,
                    ctx.isClassicalNahuatlNonactiveStemRecord(voice.nonactiveRecord, derived.active.targetStem),
                ],
                passiveCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(voice.passive),
                passiveFormula: voice.passive.formulaRealization,
                passiveSurface: {
                    canonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(passiveSurfaceFrame),
                    word: passiveSurfaceFrame.wordRealization,
                },
                passiveFinalizer: [
                    passiveSurfaceFrame.predicateStem,
                    passiveSurfaceFrame.ruleFrames.some(frame => frame.ruleId === lesson2515QuantityRuleId),
                ],
                promoted: [
                    voice.passive.subject,
                    voice.passive.voiceObjectClusterFrame?.promotedObjectId,
                    voice.passive.voiceObjectClusterFrame?.promotedObjectPerson,
                ],
                retained: voice.passive.voiceObjectClusterFrame?.positions.map(position => [
                    position.objectId,
                    position.objectKind,
                    position.carrier,
                ]),
                legacyRelationIgnored: [
                    ignoredLegacyRelation.authorizationStatus,
                    ignoredLegacyRelation.blockReason,
                    ignoredLegacyRelation.canonicalSignature === derived.operation.canonicalSignature,
                ],
                forgedOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(forgedOperation),
            };
        })(),
        {
            sourceCanonical: true,
            option: ["cui-tiā", "cn-l25-2515-cui-cuitia-surface", ""],
            operationCanonical: true,
            participantRequests: [
                ["source-object-1", "specific-projective", "3sg", 1],
                ["causative-object", "reflexive", "1sg", 2],
            ],
            activeCanonical: true,
            activeFormula: "#ni-0+c-0+n-o(cui-tih)0+⎕-0#",
            activeSurface: { canonical: true, word: "nicnocuitih" },
            activePrematureFinalizerBlocked: true,
            nonactive: ["cui-tī-lō", "cn-l20-2-class-c-final-i-lengthening", true],
            passiveCanonical: true,
            passiveFormula: "#0-0+ne(cui-tī-lō)0+c-0#",
            passiveSurface: { canonical: true, word: "necuītīlōc" },
            passiveFinalizer: ["cui-tī-lō", true],
            promoted: ["3sg", "source-object-1", "3sg"],
            retained: [["causative-object", "reflexive", "ne"]],
            legacyRelationIgnored: ["authorized", "", true],
            forgedOperationCanonical: false,
        }
    );

    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const canonicalCases = [{
        id: "nonspecific source object",
        targetStem: "chīhua-l-tiā",
        targetVoice: "passive",
        request: {
            sourceStem: "chihua",
            verbClass: "A",
            sourceValence: "projective-nonhuman",
            sourceSubject: "1pl",
            subject: "3pl",
            requestedDerivation: "causative",
            causativeObjectKind: "specific-projective",
            requestedVoice: "active",
        },
        expected: {
            activeFormula: "#0-0+t-ēch+tla(chīhua-l-tia)0+0-h#",
            activeWritten: "tēchtlachīhualtiah",
            nonactiveFormula: "#ti-0+tla(chīhua-l-tī-lo)0+0-h#",
            nonactiveWritten: "titlachīhualtīloh",
        },
    }, {
        id: "silent specific source object",
        targetStem: "chīhua-l-tiā",
        targetVoice: "passive",
        request: {
            sourceStem: "chihua",
            verbClass: "A",
            sourceValence: "specific-projective",
            objectPerson: "3sg",
            sourceSubject: "1pl",
            subject: "3pl",
            requestedDerivation: "causative",
            causativeObjectKind: "specific-projective",
            requestedVoice: "active",
        },
        expected: {
            activeFormula: "#0-0+t-ēch+⎕-0(chīhua-l-tia)0+0-h#",
            activeWritten: "tēchchīhualtiah",
            nonactiveFormula: "#ti-0+⎕-0(chīhua-l-tī-lo)0+0-h#",
            nonactiveWritten: "tichīhualtīloh",
        },
    }, {
        id: "retained third-plural source object",
        targetStem: "nōtza-l-tiā",
        targetVoice: "passive",
        request: {
            sourceStem: "nōtza",
            verbClass: "A",
            sourceValence: "specific-projective",
            objectPerson: "3pl",
            sourceSubject: "2sg",
            subject: "1pl",
            requestedDerivation: "causative",
            causativeObjectKind: "specific-projective",
            requestedVoice: "active",
        },
        expected: {
            activeFormula: "#ti-0+m-itz+⎕-in(nōtza-l-tia)0+0-h#",
            activeWritten: "timitzinnōtzaltiah",
            nonactiveFormula: "#ti-0+qu-in(nōtza-l-tī-lo)0+0-0#",
            nonactiveWritten: "tiquinnōtzaltīlo",
        },
    }, {
        id: "retained reflexive and perfective",
        targetStem: "cui-tiā",
        targetVoice: "passive",
        request: {
            sourceStem: "cui",
            verbClass: "A",
            sourceValence: "specific-projective",
            objectPerson: "3sg",
            sourceSubject: "1sg",
            subject: "1sg",
            mood: "indicative",
            tense: "preterit",
            requestedDerivation: "causative",
            causativeObjectKind: "reflexive",
            requestedVoice: "active",
        },
        expected: {
            activeFormula: "#ni-0+c-0+n-o(cui-tih)0+⎕-0#",
            activeWritten: "nicnocuitih",
            nonactiveFormula: "#0-0+ne(cui-tī-lō)0+c-0#",
            nonactiveWritten: "necuītīlōc",
        },
    }, {
        id: "impersonal source and impersonal target",
        targetStem: "chīhua-l-tiā",
        targetVoice: "impersonal",
        request: {
            sourceStem: "chihua",
            verbClass: "A",
            sourceValence: "projective-nonhuman",
            sourceVoice: "impersonal",
            sourceSubject: "3sg",
            subject: "1pl",
            requestedDerivation: "causative",
            requestedVoice: "active",
        },
        expected: {
            activeFormula: "#ti-0+tē+tla(chīhua-l-tia)0+0-h#",
            activeWritten: "titētlachīhualtiah",
            nonactiveFormula: "#0-0+tē+tla(chīhua-l-tī-lo)0+0-0#",
            nonactiveWritten: "tētlachīhualtīo",
        },
    }];
    const selectedCases = canonicalCases.map(testCase => {
        const activeRequest = selectCanonicalCausativeRequest(
            application,
            testCase.request,
            testCase.targetStem
        );
        const active = application.evaluate(activeRequest);
        const nonactive = evaluateCanonicalVoice(
            application,
            activeRequest,
            testCase.targetVoice
        );
        return { ...testCase, activeRequest, active, nonactive };
    });

    s.eq(
        "25.15 reaches every Canvas active/nonactive pair through the canonical application Result",
        selectedCases.map(entry => ({
            id: entry.id,
            activeCanonical: ctx.isClassicalNahuatlVncApplicationFrame(entry.active),
            activeFormula: entry.active.resultFrame.formulaRealization,
            activeWritten: entry.active.resultFrame.surfaceRealization,
            nonactiveCanonical: ctx.isClassicalNahuatlVncApplicationFrame(entry.nonactive.result),
            selectedVoice: entry.nonactive.result.controlFrame.selectedVoice,
            nonactiveFormula: entry.nonactive.result.resultFrame.formulaRealization,
            nonactiveWritten: entry.nonactive.result.resultFrame.surfaceRealization,
            independent: [
                entry.nonactive.result.resultFrame.finiteSurfaceFrame
                    ?.formulaDerivedFromWrittenProjection,
                entry.nonactive.result.resultFrame.finiteSurfaceFrame
                    ?.writtenDerivedFromFormulaProjection,
            ],
        })),
        canonicalCases.map(entry => ({
            id: entry.id,
            activeCanonical: true,
            activeFormula: entry.expected.activeFormula,
            activeWritten: entry.expected.activeWritten,
            nonactiveCanonical: true,
            selectedVoice: entry.targetVoice,
            nonactiveFormula: entry.expected.nonactiveFormula,
            nonactiveWritten: entry.expected.nonactiveWritten,
            independent: [false, false],
        }))
    );

    s.eq(
        "Every 25.15 nonactive paradigm coordinate is pointwise identical to scalar application",
        selectedCases.map(entry => {
            const plan = application.prepareParadigm({
                ...entry.nonactive.request,
                outputScope: "paradigm",
            });
            const coordinate = {
                subject: entry.activeRequest.subject,
                mood: entry.activeRequest.mood || "indicative",
                tense: entry.activeRequest.tense || "present",
            };
            const point = application.projectParadigmCoordinates(plan, [coordinate])[0];
            return {
                id: entry.id,
                plan: plan.authorizationStatus,
                point: point.authorizationStatus,
                scalarEquivalent: point.scalarEquivalent,
                formula: point.formulaRealization,
                written: point.surfaceRealization,
            };
        }),
        canonicalCases.map(entry => ({
            id: entry.id,
            plan: "authorized",
            point: "authorized",
            scalarEquivalent: true,
            formula: entry.expected.nonactiveFormula,
            written: entry.expected.nonactiveWritten,
        }))
    );

    s.eq(
        "25.15 rejects recognized but unlicensed voice intent and caller-supplied output authority",
        (() => {
            const unavailableTarget = application.evaluate({
                sourceStem: "mayāna",
                verbClass: "B",
                sourceValence: "intransitive",
                requestedVoice: "passive",
            });
            const unavailableSource = application.evaluate({
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "projective-nonhuman",
                requestedDerivation: "direct",
                sourceVoice: "impersonal",
                requestedVoice: "active",
            });
            const hostile = application.evaluate({
                ...selectedCases[0].nonactive.request,
                formulaRealization: "#forged#",
                surfaceRealization: "forged",
                lessonNumber: 25,
            });
            return {
                target: [
                    unavailableTarget.authorizationStatus,
                    unavailableTarget.blockReason,
                    unavailableTarget.resultFrame.formulaRealization,
                    unavailableTarget.resultFrame.surfaceRealization,
                ],
                source: [
                    unavailableSource.authorizationStatus,
                    unavailableSource.blockReason,
                    unavailableSource.resultFrame.formulaRealization,
                    unavailableSource.resultFrame.surfaceRealization,
                ],
                hostile: [
                    hostile.authorizationStatus,
                    hostile.blockReason,
                    [...hostile.rejectedAuthorityFields].sort(),
                    hostile.resultFrame.formulaRealization,
                    hostile.resultFrame.surfaceRealization,
                ],
            };
        })(),
        {
            target: [
                "blocked",
                "classical-vnc-target-voice-not-authorized-for-source",
                "",
                "",
            ],
            source: [
                "blocked",
                "classical-vnc-causative-source-voice-not-authorized-for-source",
                "",
                "",
            ],
            hostile: [
                "blocked",
                "classical-vnc-application-caller-authority-rejected",
                ["formulaRealization", "lessonNumber", "surfaceRealization"],
                "",
                "",
            ],
        }
    );

    return s;
}

module.exports = { run };
