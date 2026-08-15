"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson19_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson19-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson19-vnc-supplements-and-shared-heads",
        "lesson19-pronominal-existentials-and-included-reference",
        "lesson19-included-subject-possessor-and-recursion",
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
                construction: options.construction || "",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: "indicative",
                tense: options.tense || "present",
                outputScope: "single",
                sentenceOptions: {},
            }],
        })
    );
    const issueNnc = (stem, options = {}) => {
        const frame = options.possessor
            ? ctx.buildClassicalNahuatlPossessiveNncFrame(stem, {
                subject: options.subject || "3sg",
                possessor: options.possessor,
                singularConnector: "0",
                nounstemRelationKind: "nonrelational",
                animacy: options.animacy || "animate",
            })
            : ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
                subject: options.subject || "3sg",
                nounClass: options.nounClass || "zero",
                animacy: options.animacy || "animate",
            });
        return ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            args: [
                frame.nncSlotFrame,
                { sentenceType: "assertion", polarity: "positive" },
            ],
        });
    };
    const issuePronominal = (sourceInput, subject = "3sg") => {
        const source = ctx.issueCanonicalNncSourceFrame(
            typeof sourceInput === "string" ? { stem: sourceInput } : sourceInput,
        );
        const selection = ctx.getCanonicalNncOperationSelectionFrame(
            source,
            { subject },
        );
        const operation = ctx.issueCanonicalNncOperationFrame(source, {
            subject,
            clausePosition: selection.selectedClausePosition || "initial",
            numberForm: selection.selectedNumberForm || "",
            predicatePluralization:
                selection.selectedPredicatePluralization || "",
            sentenceType: "statement",
            polarity: "positive",
        });
        return ctx.requestClassicalPronominalNncResult(source, operation);
    };
    const issueParticle = (particleId) => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "particle:result",
            args: [ctx.buildClassicalNahuatlParticleSourceFrame(particleId)],
        })
    );
    const makeController = () => {
        const target = Object.create(ctx);
        const api = ctx.createClassicalClauseRelationControllerGlobals(target);
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
        return target.createClassicalClauseRelationController();
    };
    const compose = ({
        principal,
        supplement,
        marker = null,
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
        );
        if (marker) {
            controller.captureCurrentResult(
                "marker",
                marker.canonicalResult || marker,
            );
        }
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
        result.result.canonicalResult?.operationFrames?.find((frame) => (
            frame.kind === kind
        )) || null
    );
    const cueLabels = (composition) => ctx.getClassicalFormulaDerivedAnnotations(
        composition.result.presentation.formula,
        null,
        composition.result.canonicalResult,
    ).map((cue) => cue.label);

    const principalVnc = issueVnc("quīza", { subject: "3pl" });
    const subjectVnc = issueVnc("mihtōtia", { subject: "3pl", tense: "future" });
    const sharedSubject = compose({
        principal: principalVnc,
        supplement: subjectVnc,
    });
    const objectPrincipal = issueVnc("cuī", {
        subject: "2sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const objectSupplement = issueVnc("nequi", {
        subject: "2sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const sharedObject = compose({
        principal: objectPrincipal,
        supplement: objectSupplement,
        selections: {
            supplementationHeadRole: "object",
            supplementationContactRole: "object",
        },
    });
    const possessedName = issueNnc("tōcā", {
        subject: "3sg",
        possessor: "3sg",
        animacy: "nonanimate",
    });
    const greenStanding = issueVnc("xoxōhuixtihca", { subject: "3sg" });
    const sharedPossessor = compose({
        principal: possessedName,
        supplement: greenStanding,
        marker: issueParticle("l3-in"),
        selections: {
            supplementationHeadRole: "possessor",
            supplementationContactRole: "subject",
        },
    });
    const nestedVnc = compose({
        principal: subjectVnc,
        supplement: issueVnc("cuīca", { subject: "3pl" }),
    });
    const recursive = compose({
        principal: principalVnc,
        supplement: nestedVnc.result,
    });
    const badVncPossessor = compose({
        principal: principalVnc,
        supplement: subjectVnc,
        selections: { supplementationHeadRole: "possessor" },
    });

    const demonstrative = issuePronominal("īn", "3pl");
    const existential = issueVnc("i-ā", {
        subject: "3pl",
        verbClass: "C",
        construction: "pronominal-nnc",
    });
    const demonstrativeExistential = compose({
        principal: existential,
        supplement: demonstrative,
    });
    const who = issuePronominal("ā-0", "3sg");
    const firstPluralExistential = issueVnc("i-ā", {
        subject: "1pl",
        verbClass: "C",
        construction: "pronominal-nnc",
    });
    const interrogativeExistential = compose({
        principal: firstPluralExistential,
        supplement: who,
        selections: { supplementationOrder: "supplement-first" },
    });
    const forgedExistential = ctx.buildClassicalNahuatlPronominalPluralCooperationFrame(
        { kind: "display-only", authorizationStatus: "authorized" },
        null,
    );

    const truth = issueNnc("nelli", { subject: "3sg", animacy: "nonanimate" });
    const said = issueVnc("ihtoa", {
        subject: "1sg",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        tense: "preterit",
    });
    const includedSubject = compose({
        principal: truth,
        supplement: said,
        selections: { supplementationReferenceMode: "included" },
    });
    const sharedAlternative = compose({
        principal: truth,
        supplement: said,
        selections: {
            supplementationReferenceMode: "shared",
            supplementationContactRole: "object",
        },
    });
    const possessedFact = issueNnc("tōcā", {
        subject: "3sg",
        possessor: "3sg",
        animacy: "nonanimate",
    });
    const includedPossessor = compose({
        principal: possessedFact,
        supplement: sharedSubject.result,
        marker: issueParticle("l3-ca"),
        selections: {
            supplementationReferenceMode: "included",
            supplementationHeadRole: "possessor",
            supplementationOrder: "supplement-first",
        },
    });
    const badIncludedPluralHead = compose({
        principal: principalVnc,
        supplement: said,
        selections: { supplementationReferenceMode: "included" },
    });

    const observations = {
        "lesson19-vnc-supplements-and-shared-heads": {
            subject: [
                sharedSubject.result.authorizationStatus,
                sharedSubject.result.canonicalResult?.supplementClause?.unitKind,
                sharedSubject.result.canonicalResult?.referenceFrame?.headRole,
            ],
            object: [
                sharedObject.result.authorizationStatus,
                sharedObject.result.canonicalResult?.referenceFrame?.headRole,
            ],
            possessor: [
                sharedPossessor.result.authorizationStatus,
                sharedPossessor.result.canonicalResult?.referenceFrame?.headRole,
                sharedPossessor.result.canonicalResult?.linearizationFrame
                    ?.formulaTokens?.some((token) => token.role === "adjunctor"),
            ],
            recursive: [
                recursive.result.authorizationStatus,
                operationFrame(
                    recursive,
                    "classical-nahuatl-supplementation-recursive-clause-graph-frame",
                )?.completeClauseNodeCount,
            ],
            cues: cueLabels(sharedSubject).some((label) => (
                label.includes("complete VNC")
            )),
        },
        "lesson19-pronominal-existentials-and-included-reference": {
            demonstrative: [
                demonstrativeExistential.result.authorizationStatus,
                operationFrame(
                    demonstrativeExistential,
                    "classical-nahuatl-supplementation-pronominal-plural-frame",
                )?.route,
            ],
            interrogative: [
                interrogativeExistential.result.authorizationStatus,
                operationFrame(
                    interrogativeExistential,
                    "classical-nahuatl-supplementation-pronominal-plural-frame",
                )?.typedMismatchException,
                interrogativeExistential.contract.blockReason,
                interrogativeExistential.result.blockReason,
            ],
            included: [
                includedSubject.result.authorizationStatus,
                includedSubject.result.canonicalResult?.referenceFrame
                    ?.wholeSupplementIsReferent,
            ],
            cues: cueLabels(demonstrativeExistential).some((label) => (
                label.includes("existential")
            )) && cueLabels(includedSubject).some((label) => (
                label.includes("whole included clause")
            )),
        },
        "lesson19-included-subject-possessor-and-recursion": {
            subject: [
                includedSubject.result.authorizationStatus,
                includedSubject.result.canonicalResult?.referenceFrame?.headRole,
            ],
            sharedAlternative: [
                sharedAlternative.result.authorizationStatus,
                sharedAlternative.result.canonicalResult?.referenceFrame
                    ?.referenceMode,
            ],
            possessor: [
                includedPossessor.result.authorizationStatus,
                includedPossessor.result.canonicalResult?.referenceFrame?.headRole,
                includedPossessor.result.canonicalResult
                    ?.supplementContinuationFrames?.length,
                includedPossessor.result.canonicalResult?.linearizationFrame
                    ?.formulaTokens?.some((token) => (
                        token.role === "comment-emphasis"
                    )),
            ],
            cues: cueLabels(includedPossessor).some((label) => (
                label.includes("whole included clause")
            )),
        },
    };
    const expected = {
        "lesson19-vnc-supplements-and-shared-heads": {
            subject: ["authorized", "vnc", "subject"],
            object: ["authorized", "object"],
            possessor: ["authorized", "possessor", true],
            recursive: ["authorized", 3],
            cues: true,
        },
        "lesson19-pronominal-existentials-and-included-reference": {
            demonstrative: ["authorized", "demonstrative"],
            interrogative: ["authorized", true, "", ""],
            included: ["authorized", true],
            cues: true,
        },
        "lesson19-included-subject-possessor-and-recursion": {
            subject: ["authorized", "subject"],
            sharedAlternative: ["authorized", "shared"],
            possessor: ["authorized", "possessor", 1, true],
            cues: true,
        },
    };
    const mutations = {
        "lesson19-vnc-supplements-and-shared-heads": [
            badVncPossessor.result.blockReason,
            ctx.isClassicalNahuatlSupplementationFrame({
                ...sharedSubject.result.canonicalResult,
            }),
        ],
        "lesson19-pronominal-existentials-and-included-reference": [
            forgedExistential.authorizationStatus,
            ctx.isClassicalNahuatlPronominalPluralCooperationFrame(
                forgedExistential,
            ),
        ],
        "lesson19-included-subject-possessor-and-recursion": [
            badIncludedPluralHead.result.blockReason,
            ctx.isClassicalNahuatlSupplementationFrame({
                ...includedSubject.result.canonicalResult,
            }),
        ],
    };
    const expectedMutations = {
        "lesson19-vnc-supplements-and-shared-heads": [
            "classical-supplementation-supplementation-head-role-not-licensed",
            false,
        ],
        "lesson19-pronominal-existentials-and-included-reference": [
            "blocked",
            false,
        ],
        "lesson19-included-subject-possessor-and-recursion": [
            "included-referent-head-must-be-third-person-singular",
            false,
        ],
    };

    s.eq("accepted Lesson 19 Groups 1-3 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 244, unique: 244, writing: 144, reading: 100 });
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
            mutations[record.reviewGroupId],
            expectedMutations[record.reviewGroupId],
        );
    }
    return s;
}

module.exports = { run };
