"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson18_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson18-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson18-collective-and-named-partner",
        "lesson18-male-bonding",
        "lesson18-ayi-silent-object",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const issueVnc = (sourceStem, options = {}) => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [{
                sourceStem,
                verbClass: options.verbClass || "A",
                sourceValence: options.sourceValence || "intransitive",
                objectKind: options.objectKind || "",
                objectPerson: options.objectPerson || "",
                silentSpecificObject: options.silentSpecificObject === true,
                subject: options.subject || "3sg",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: "indicative",
                tense: options.tense || "present",
                outputScope: "single",
            }],
        })
    );
    const issueNnc = (
        stem,
        subject = "3sg",
        nounClass = "zero",
        pluralConnector = "",
    ) => {
        const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
            subject,
            nounClass,
            animacy: "animate",
            ...(pluralConnector ? { pluralConnector } : {}),
        });
        return ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            args: [
                frame.nncSlotFrame,
                { sentenceType: "assertion", polarity: "positive" },
            ],
        });
    };
    const makeController = () => {
        const target = Object.create(ctx);
        const api = ctx.createClassicalClauseRelationControllerGlobals(target);
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
        return target.createClassicalClauseRelationController();
    };
    const compose = ({
        principal,
        supplement,
        context = null,
        selections = {},
    }) => {
        const controller = makeController();
        controller.captureCurrentResult(
            "principal",
            principal.canonicalResult || principal,
        );
        controller.captureCurrentResult(
            "adjoined",
            supplement.canonicalResult || supplement,
            context,
        );
        const request = {
            relation: "supplementation",
            supplementationReferenceMode: "shared",
            supplementationHeadRole: "subject",
            supplementationContactRole: "subject",
            supplementationOrder: "principal-first",
            ...selections,
        };
        return {
            controller,
            contract: controller.buildDecisionContract(request),
            result: controller.compose(request),
        };
    };
    const operationFrame = (result, kind) => (
        result.canonicalResult?.operationFrames?.find((frame) => (
            frame.kind === kind
        )) || null
    );
    const cueLabels = (result) => ctx.getClassicalFormulaDerivedAnnotations(
        result.presentation.formula,
        null,
        result.canonicalResult,
    ).map((cue) => cue.label);
    const sourceContext = (options) => {
        const controller = makeController();
        return controller.issueDiscourseSourceContextFrame(options);
    };

    const pluralPrincipal = issueVnc("miqui", { subject: "3pl" });
    const collective = compose({
        principal: pluralPrincipal,
        supplement: issueNnc("mochi", "3sg"),
    });
    const namedContext = sourceContext({
        namedPartnerKnownParticipant: "addressee",
    });
    const namedPartner = compose({
        principal: pluralPrincipal,
        supplement: issueNnc("icnīuh", "3sg"),
        context: namedContext,
    });
    const ordinaryMismatch = compose({
        principal: pluralPrincipal,
        supplement: issueNnc("icnīuh", "3sg"),
    });

    const maleContext = sourceContext({
        speakerGender: "male",
        speakerGroupMembership: "member",
    });
    const femaleContext = sourceContext({
        speakerGender: "female",
        speakerGroupMembership: "member",
    });
    const men = issueNnc("oquich", "1pl", "tli", "t-in");
    const maleBonding = compose({
        principal: issueVnc("cuīca", { subject: "3pl" }),
        supplement: men,
        context: maleContext,
    });
    const blockedFemale = compose({
        principal: issueVnc("cuīca", { subject: "3pl" }),
        supplement: men,
        context: femaleContext,
    });

    const ayiUiRequest = ctx.buildClassicalRuleLogicVncApplicationRequest({
        stem: "āyi",
        subject: "3sg",
        sourceSubject: "3sg",
        mood: "indicative",
        tense: "preterit",
        verbClass: "B",
        valence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        derivationType: "direct",
        vncVoice: "active",
        vncOutputScope: "single",
    });
    const ayiPrincipal = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        args: [ayiUiRequest],
    });
    const ayi = compose({
        principal: ayiPrincipal,
        supplement: issueNnc("itlah", "3sg"),
        selections: {
            supplementationHeadRole: "object",
        },
    });
    const ichtequiUiRequest = ctx.buildClassicalRuleLogicVncApplicationRequest({
        ...ayiUiRequest,
        stem: "ichtequi",
        tense: "present",
    });
    const forgedIchtequi = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        issueVnc("ichtequi", {
            subject: "3sg",
            sourceValence: "specific-projective",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            silentSpecificObject: true,
        }).canonicalResult,
        {
            referenceId: "thief",
            subjectReferenceId: "thief",
            objectReferenceId: "patient",
            silentObjectKind: "ayi-specific-object",
        },
    );

    const observations = {
        "lesson18-collective-and-named-partner": {
            collective: [
                collective.contract.operationSelections.agreementException,
                collective.result.authorizationStatus,
                operationFrame(
                    collective.result,
                    "classical-nahuatl-referent-conditioned-agreement-frame",
                )?.agreementExceptionKind,
            ],
            named: [
                namedPartner.contract.operationSelections.agreementException,
                namedPartner.result.authorizationStatus,
                namedPartner.result.canonicalResult?.referenceFrame
                    ?.referenceRelationship,
            ],
            choices: [
                collective.contract.decisions.some((entry) => (
                    entry.id === "agreement-exception"
                )),
                namedPartner.contract.decisions.some((entry) => (
                    entry.id === "agreement-exception"
                )),
            ],
            cues: [
                cueLabels(collective.result),
                cueLabels(namedPartner.result),
            ],
        },
        "lesson18-male-bonding": {
            derived: [
                maleBonding.contract.operationSelections.agreementException,
                maleBonding.result.authorizationStatus,
                operationFrame(
                    maleBonding.result,
                    "classical-nahuatl-referent-conditioned-agreement-frame",
                )?.agreementExceptionKind,
            ],
            userExceptionChoice: maleBonding.contract.decisions.some(
                (entry) => entry.id === "agreement-exception",
            ),
            cues: cueLabels(maleBonding.result),
        },
        "lesson18-ayi-silent-object": {
            request: [
                ayiUiRequest.silentSpecificObject,
                ichtequiUiRequest.silentSpecificObject,
            ],
            result: [
                ayi.contract.decisions.find((entry) => (
                    entry.id === "principal-object-id"
                )) || null,
                ayi.contract.authorizationStatus,
                ayi.contract.blockReason,
                ayi.result.authorizationStatus,
                ayi.result.blockReason,
                operationFrame(
                    ayi.result,
                    "classical-nahuatl-ayi-silent-object-frame",
                )?.realization,
                operationFrame(
                    ayi.result,
                    "classical-nahuatl-ayi-silent-object-frame",
                )?.perfectiveStem,
            ],
            cues: cueLabels(ayi.result),
        },
    };
    const expected = {
        "lesson18-collective-and-named-partner": {
            collective: ["collective", "authorized", "collective-reference"],
            named: [
                "named-partner",
                "authorized",
                "named-partner-is-member-of-principal-group",
            ],
            choices: [false, false],
            cues: [
                [
                    "plural group head",
                    "plural reference licenses agreement",
                    "collective form · plural reference",
                ],
                [
                    "speaker or addressee plus named partner",
                    "named partner belongs to plural group",
                    "named third-person partner",
                ],
            ],
        },
        "lesson18-male-bonding": {
            derived: ["male-bonding", "authorized", "male-bonding"],
            userExceptionChoice: false,
            cues: [
                "third-person head · speaker included",
                "male speaker belongs to group",
                "first-person plural male group",
            ],
        },
        "lesson18-ayi-silent-object": {
            request: [true, false],
            result: [null, "authorized", "", "authorized", "", "0-0", "āx"],
            cues: [
                "āyi · silent specific-object head 0-0",
                "specific patient binds silent object 0-0",
                "specific patient · supplementary object",
            ],
        },
    };
    const mutations = {
        "lesson18-collective-and-named-partner": [
            ordinaryMismatch.result.blockReason,
        ],
        "lesson18-male-bonding": [blockedFemale.result.blockReason],
        "lesson18-ayi-silent-object": [
            forgedIchtequi.blockReason,
            ichtequiUiRequest.silentSpecificObject,
        ],
    };
    const expectedMutations = {
        "lesson18-collective-and-named-partner": [
            "shared-referent-person-number-mismatch",
        ],
        "lesson18-male-bonding": [
            "shared-referent-person-number-mismatch",
        ],
        "lesson18-ayi-silent-object": [
            "ayi-silent-object-requires-typed-ayi-vnc",
            false,
        ],
    };

    s.eq("accepted Lesson 18 Groups 4-6 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 75, unique: 75, writing: 43, reading: 32 });
    groupIds.forEach((groupId) => {
        s.eq(
            `${groupId} works through the normal composition path`,
            observations[groupId],
            expected[groupId],
        );
    });
    for (const record of writing) {
        s.eq(
            `${record.atomId} performs its accepted writing job`,
            observations[record.reviewGroupId],
            expected[record.reviewGroupId],
        );
        s.eq(
            `mutation:${record.atomId} fails when its accepted grammar behavior is broken`,
            mutations[record.reviewGroupId],
            expectedMutations[record.reviewGroupId],
        );
    }
    return s;
}

module.exports = { run };
