"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson17_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson17-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson17-supplementation-foundation",
        "lesson17-shared-subject-and-have",
        "lesson17-shared-object-and-possessor",
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
                subject: options.subject || "3sg",
                objectKind: options.objectKind || "",
                objectPerson: options.objectPerson || "",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: "indicative",
                tense: "present",
                outputScope: "single",
                sentenceOptions: {
                    directionalPrefix: options.directionalPrefix || "",
                },
            }],
        })
    );
    const issueNnc = (frame) => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            args: [
                frame.nncSlotFrame,
                { sentenceType: "assertion", polarity: "positive" },
            ],
        })
    );
    const makeController = () => {
        const target = Object.create(ctx);
        const api = ctx.createClassicalClauseRelationControllerGlobals(target);
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
        return target.createClassicalClauseRelationController();
    };
    const compose = (principal, supplement, selections = {}) => {
        const controller = makeController();
        const principalCapture = controller.captureCurrentResult(
            "principal",
            principal.canonicalResult,
        );
        const supplementCapture = controller.captureCurrentResult(
            "adjoined",
            supplement.canonicalResult,
        );
        const request = {
            relation: "supplementation",
            supplementationReferenceMode: "shared",
            supplementationContactRole: "subject",
            supplementationOrder: "principal-first",
            ...selections,
        };
        return {
            controller,
            principalCapture,
            supplementCapture,
            contract: controller.buildDecisionContract(request),
            result: controller.compose(request),
        };
    };
    const decision = (contract, id) => {
        const found = contract.decisions.find((candidate) => (
            candidate.id === id
        ));
        return found
            ? { values: found.values, selected: found.selectedValue }
            : null;
    };
    const cues = (result) => (
        ctx.getClassicalFormulaDerivedAnnotations(
            result.presentation.formula,
            null,
            result.canonicalResult,
        ).map((cue) => ({
            label: cue.label,
            text: result.presentation.formula.slice(cue.start, cue.end),
        }))
    );
    const operationFrame = (result, kind) => (
        result.canonicalResult?.operationFrames?.find((frame) => (
            frame.kind === kind
        )) || null
    );

    const peter = issueNnc(ctx.buildClassicalNahuatlAbsolutiveNncFrame(
        "Petoloh",
        { subject: "1sg", nounClass: "zero", animacy: "animate" },
    ));
    const singing = issueVnc("cuīca", { subject: "1sg" });
    const sharedSubject = compose(singing, peter, {
        supplementationHeadRole: "subject",
    });

    const locatedCah = issueVnc("ca-h", {
        subject: "3sg",
        verbClass: "C",
        directionalPrefix: "on",
    });
    const unlocatedCah = issueVnc("ca-h", {
        subject: "3sg",
        verbClass: "C",
    });
    const possessedHouse = issueNnc(
        ctx.buildClassicalNahuatlPossessiveNncFrame("cal", {
            subject: "3sg",
            possessor: "1sg",
            singularConnector: "0",
            nounstemRelationKind: "nonrelational",
            animacy: "nonanimate",
        }),
    );
    const have = compose(locatedCah, possessedHouse, {
        supplementationHeadRole: "subject",
    });
    const noHave = compose(unlocatedCah, possessedHouse, {
        supplementationHeadRole: "subject",
    });

    const seeing = issueVnc("itta", {
        subject: "3sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "1sg",
    });
    const sharedObject = compose(seeing, peter, {
        supplementationHeadRole: "object",
    });
    const sharedPossessor = compose(possessedHouse, peter, {
        supplementationHeadRole: "possessor",
    });
    const impossibleNncObject = compose(possessedHouse, peter, {
        supplementationHeadRole: "object",
    });
    const impossibleVncPossessor = compose(singing, peter, {
        supplementationHeadRole: "possessor",
    });

    const principalEnvelope = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        singing.canonicalResult,
        { referenceId: "speaker-one", subjectReferenceId: "speaker-one" },
    );
    const mismatchedSupplementEnvelope =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            peter.canonicalResult,
            { referenceId: "speaker-two", subjectReferenceId: "speaker-two" },
        );
    const referentMismatch = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause: principalEnvelope,
        supplementClause: mismatchedSupplementEnvelope,
        options: {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
            order: "principal-first",
        },
    });

    const observations = {
        "lesson17-supplementation-foundation": {
            captures: [
                sharedSubject.principalCapture.authorizationStatus,
                sharedSubject.supplementCapture.authorizationStatus,
            ],
            referenceMode: decision(
                sharedSubject.contract,
                "supplementation-reference-mode",
            ),
            order: decision(
                sharedSubject.contract,
                "supplementation-order",
            ),
            status: sharedSubject.result.authorizationStatus,
            formula: sharedSubject.result.presentation.formula,
            surface: sharedSubject.result.presentation.surface,
            clauseKinds: [
                sharedSubject.result.canonicalResult.principalClause.unitKind,
                sharedSubject.result.canonicalResult.supplementClause.unitKind,
            ],
            principalHead: sharedSubject.result.canonicalResult.referenceFrame
                .principalHead.category,
            cues: cues(sharedSubject.result),
        },
        "lesson17-shared-subject-and-have": {
            shared: {
                relationship: sharedSubject.result.canonicalResult
                    .referenceFrame.referenceRelationship,
                identityUnified: sharedSubject.result.canonicalResult
                    .referenceFrame.referenceIdentityUnified,
                headRole: sharedSubject.result.canonicalResult
                    .referenceFrame.headRole,
                contactRole: sharedSubject.result.canonicalResult
                    .referenceFrame.supplementContactRole,
            },
            have: {
                status: have.result.authorizationStatus,
                formula: have.result.presentation.formula,
                surface: have.result.presentation.surface,
                frame: (() => {
                    const frame = operationFrame(
                        have.result,
                        "classical-nahuatl-supplementation-have-frame",
                    );
                    return frame && {
                        locativePrincipalStem: frame.locativePrincipalStem,
                        possessiveSupplement: frame.possessiveSupplement,
                        createsHaveVerb: frame.createsHaveVerb,
                    };
                })(),
            },
        },
        "lesson17-shared-object-and-possessor": {
            objectChoice: decision(
                sharedObject.contract,
                "supplementation-head-role",
            ),
            object: {
                status: sharedObject.result.authorizationStatus,
                formula: sharedObject.result.presentation.formula,
                surface: sharedObject.result.presentation.surface,
                role: sharedObject.result.canonicalResult.referenceFrame.headRole,
                cues: cues(sharedObject.result),
            },
            possessorChoice: decision(
                sharedPossessor.contract,
                "supplementation-head-role",
            ),
            possessor: {
                status: sharedPossessor.result.authorizationStatus,
                formula: sharedPossessor.result.presentation.formula,
                surface: sharedPossessor.result.presentation.surface,
                role: sharedPossessor.result.canonicalResult.referenceFrame.headRole,
                cues: cues(sharedPossessor.result),
            },
        },
    };
    const expected = {
        "lesson17-supplementation-foundation": {
            captures: ["authorized", "authorized"],
            referenceMode: {
                values: ["shared", "included", "absolute-topic"],
                selected: "shared",
            },
            order: {
                values: ["principal-first", "supplement-first", "discontinuous"],
                selected: "principal-first",
            },
            status: "authorized",
            formula: "#ni-0(cuīca)0+0-0# + #ni-0(Petoloh)0-0#",
            surface: "Nicuīca niPetoloh.",
            clauseKinds: ["vnc", "nnc"],
            principalHead: "1sg",
            cues: [
                { label: "principal subject head", text: "#ni-0(cuīca)0+0-0#" },
                { label: "shared referent", text: "+" },
                { label: "supplementary subject", text: "#ni-0(Petoloh)0-0#" },
            ],
        },
        "lesson17-shared-subject-and-have": {
            shared: {
                relationship: "identical",
                identityUnified: true,
                headRole: "subject",
                contactRole: "subject",
            },
            have: {
                status: "authorized",
                formula: "#0-0+on(ca-h)0+⎕-0# + #0-0+n-o(cal)0-0#",
                surface: "Oncah nocal.",
                frame: {
                    locativePrincipalStem: "ca-h",
                    possessiveSupplement: true,
                    createsHaveVerb: false,
                },
            },
        },
        "lesson17-shared-object-and-possessor": {
            objectChoice: {
                values: ["subject", "object"],
                selected: "object",
            },
            object: {
                status: "authorized",
                formula: "#0-0+n-ēch(itta)0+0-0# + #ni-0(Petoloh)0-0#",
                surface: "Nēchitta niPetoloh.",
                role: "object",
                cues: [
                    { label: "principal object head", text: "#0-0+n-ēch(itta)0+0-0#" },
                    { label: "shared referent", text: "+" },
                    { label: "supplementary object", text: "#ni-0(Petoloh)0-0#" },
                ],
            },
            possessorChoice: {
                values: ["subject", "possessor"],
                selected: "possessor",
            },
            possessor: {
                status: "authorized",
                formula: "#0-0+n-o(cal)0-0# + #ni-0(Petoloh)0-0#",
                surface: "Nocal niPetoloh.",
                role: "possessor",
                cues: [
                    { label: "principal possessor head", text: "#0-0+n-o(cal)0-0#" },
                    { label: "shared referent", text: "+" },
                    { label: "supplementary possessor", text: "#ni-0(Petoloh)0-0#" },
                ],
            },
        },
    };
    const mutationProof = {
        "lesson17-supplementation-foundation": {
            copiedCanonicalAccepted:
                ctx.isClassicalNahuatlSupplementationFrame({
                    ...sharedSubject.result.canonicalResult,
                }),
            missingSupplementStatus: (() => {
                const controller = makeController();
                controller.captureCurrentResult(
                    "principal",
                    singing.canonicalResult,
                );
                return controller.buildDecisionContract({
                    relation: "supplementation",
                }).authorizationStatus;
            })(),
        },
        "lesson17-shared-subject-and-have": {
            mismatchedReferentStatus: referentMismatch.authorizationStatus,
            mismatchedReferentReason: referentMismatch.blockReason,
            unlocatedHaveFramePresent: Boolean(operationFrame(
                noHave.result,
                "classical-nahuatl-supplementation-have-frame",
            )),
        },
        "lesson17-shared-object-and-possessor": {
            nncObjectStatus: impossibleNncObject.contract.authorizationStatus,
            nncObjectReason: impossibleNncObject.contract.blockReason,
            vncPossessorStatus:
                impossibleVncPossessor.contract.authorizationStatus,
            vncPossessorReason: impossibleVncPossessor.contract.blockReason,
        },
    };
    const expectedMutationProof = {
        "lesson17-supplementation-foundation": {
            copiedCanonicalAccepted: false,
            missingSupplementStatus: "blocked",
        },
        "lesson17-shared-subject-and-have": {
            mismatchedReferentStatus: "blocked",
            mismatchedReferentReason: "shared-referent-identity-mismatch",
            unlocatedHaveFramePresent: false,
        },
        "lesson17-shared-object-and-possessor": {
            nncObjectStatus: "blocked",
            nncObjectReason:
                "classical-supplementation-supplementation-head-role-not-licensed",
            vncPossessorStatus: "blocked",
            vncPossessorReason:
                "classical-supplementation-supplementation-head-role-not-licensed",
        },
    };

    s.eq("accepted Lesson 17 Groups 1-3 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 112, unique: 112, writing: 34, reading: 78 });
    groupIds.forEach((groupId) => {
        s.eq(
            `${groupId} works through the normal clause-composition path`,
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
            mutationProof[record.reviewGroupId],
            expectedMutationProof[record.reviewGroupId],
        );
    }
    return s;
}

module.exports = { run };
