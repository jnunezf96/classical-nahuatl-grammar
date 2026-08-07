"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_nonactive_authority");

    s.eq(
        "Nonactive lexical facts are owner-issued Source identities consumed by the shared operation",
        (() => {
            const chiye = ctx.getClassicalNahuatlNonactiveStemOptions(
                "chiye",
                {
                    verbClass: "B",
                    sourceValence: "specific-projective",
                }
            );
            const piye = ctx.getClassicalNahuatlNonactiveStemOptions(
                "piye",
                {
                    verbClass: "B",
                    sourceValence: "specific-projective",
                }
            );
            const teciIntransitive =
                ctx.getClassicalNahuatlNonactiveStemOptions("teci", {
                    verbClass: "B",
                    sourceValence: "intransitive",
                });
            const teciTransitive =
                ctx.getClassicalNahuatlNonactiveStemOptions("teci", {
                    verbClass: "B",
                    sourceValence: "specific-projective",
                });
            const chiyeRecord =
                ctx.deriveClassicalNahuatlNonactiveStemRecord(
                    "chiye",
                    {
                        verbClass: "B",
                        sourceValence: "specific-projective",
                        optionId: chiye.options[0]?.optionId || "",
                    }
                );
            return {
                rawTargetRegistries: [
                    typeof ctx.CLASSICAL_NAHUATL_LESSON20_ACTIVE_STEM_IDENTITIES,
                    typeof ctx.CLASSICAL_NAHUATL_LESSON20_FIXED_FORMATIONS,
                    typeof ctx.CLASSICAL_NAHUATL_CROSS_LESSON_NONACTIVE_SUPPLEMENTS,
                ],
                chiye: {
                    targets: chiye.options.map(option => option.nonactiveStem),
                    rule: chiye.options[0]?.ruleId || "",
                    category: chiye.options[0]?.decisionCategory || "",
                    typedIdentity:
                        ctx.isClassicalNahuatlActiveStemIdentityFrame(
                            chiye.sourceIdentityFrame,
                            "chiye"
                        ),
                    storedTargetAuthority:
                        chiye.sourceIdentityFrame.storedTargetFormationAuthority,
                    canonicalRecord:
                        ctx.isClassicalNahuatlNonactiveStemRecord(
                            chiyeRecord,
                            "chiye"
                        ),
                },
                piye: piye.options.map(option => option.nonactiveStem),
                teci: {
                    intransitive: teciIntransitive.options.map(
                        option => option.nonactiveStem
                    ),
                    transitive: teciTransitive.options.map(
                        option => option.nonactiveStem
                    ),
                    licenseOwnerIssued:
                        ctx.isClassicalNahuatlLexicalFormationLicenseFrame(
                            teciTransitive.options[0]
                                ?.lexicalFormationLicenseFrame,
                            "teci"
                        ),
                    sourceIdentityResolution:
                        teciTransitive.sourceIdentityFrame.identityResolution,
                    sourceLexicalIdentityId:
                        teciTransitive.sourceIdentityFrame.lexicalIdentityId,
                    formationLexicalIdentityId:
                        teciTransitive.options[0]
                            ?.lexicalFormationLicenseFrame?.lexicalIdentityId
                            || "",
                },
            };
        })(),
        {
            rawTargetRegistries: ["undefined", "undefined", "undefined"],
            chiye: {
                targets: ["chiye-lō"],
                rule: "cn-nonactive-class-b-licensed-final-e-allomorph",
                category: "licensed-final-e-allomorph",
                typedIdentity: true,
                storedTargetAuthority: false,
                canonicalRecord: true,
            },
            piye: ["piya-lō"],
            teci: {
                intransitive: ["tecī-hua"],
                transitive: ["tex-ō", "tex-o-hua"],
                licenseOwnerIssued: true,
                sourceIdentityResolution:
                    "licensed-nonactive-lexical-source",
                sourceLexicalIdentityId:
                    "cn-nonactive-lexical-source:teci",
                formationLexicalIdentityId:
                    "cn-nonactive-lexical-source:teci",
            },
        }
    );

    s.eq(
        "Documentary strings, copied frames, hidden fields, and accessors cannot authorize nonactive output",
        (() => {
            const issuedIdentity =
                ctx.buildClassicalNahuatlActiveStemIdentityFrame(
                    "chiye",
                    {
                        verbClass: "B",
                        sourceValence: "specific-projective",
                    }
                );
            const copiedIdentity = { ...issuedIdentity };
            const teci =
                ctx.getClassicalNahuatlNonactiveStemOptions("teci", {
                    verbClass: "B",
                    sourceValence: "specific-projective",
                });
            const issuedLicense =
                teci.options[0]?.lexicalFormationLicenseFrame;
            let getterCalls = 0;
            const accessorOptions = {};
            Object.defineProperty(accessorOptions, "verbClass", {
                enumerable: true,
                get() {
                    getterCalls += 1;
                    return "B";
                },
            });
            const accessorAttempt =
                ctx.getClassicalNahuatlNonactiveStemOptions(
                    "chiye",
                    accessorOptions
                );
            const documentaryAttempt =
                ctx.getClassicalNahuatlNonactiveStemOptions("chiye", {
                    verbClass: "B",
                    sourceValence: "specific-projective",
                    formationAuthority: "later-canvas-source-witness",
                });
            const storedAnswerAttempt =
                ctx.deriveClassicalNahuatlNonactiveStemRecord(
                    "chiye",
                    {
                        verbClass: "B",
                        sourceValence: "specific-projective",
                        optionId: "lō:chiye-lō",
                        nonactiveStem: "chiye-lō",
                    }
                );
            const evidenceAttempt =
                ctx.deriveClassicalNahuatlNonactiveStemRecord(
                    "aqui",
                    {
                        verbClass: "B",
                        sourceValence: "intransitive",
                        optionId: "o-hua:ac-o-hua",
                        lexicalEvidenceSignature:
                            "karttunen-1992:v1:forged",
                    }
                );
            const stringAttempt =
                ctx.deriveClassicalNahuatlNonactiveStemRecord(
                    "chiye",
                    "later-canvas-source-witness"
                );
            const revokedOptions = Proxy.revocable({}, {});
            revokedOptions.revoke();
            const revokedProxyAttempt =
                ctx.deriveClassicalNahuatlNonactiveStemRecord(
                    "chiye",
                    revokedOptions.proxy
                );
            return {
                issuedIdentityValid:
                    ctx.isClassicalNahuatlActiveStemIdentityFrame(
                        issuedIdentity,
                        "chiye"
                    ),
                copiedIdentityValid:
                    ctx.isClassicalNahuatlActiveStemIdentityFrame(
                        copiedIdentity,
                        "chiye"
                    ),
                issuedLicenseValid:
                    ctx.isClassicalNahuatlLexicalFormationLicenseFrame(
                        issuedLicense,
                        "teci"
                    ),
                copiedLicenseValid:
                    ctx.isClassicalNahuatlLexicalFormationLicenseFrame(
                        { ...issuedLicense },
                        "teci"
                    ),
                accessor: [
                    accessorAttempt.authorizationStatus,
                    accessorAttempt.blockReason,
                    getterCalls,
                ],
                documentary: [
                    documentaryAttempt.authorizationStatus,
                    documentaryAttempt.blockReason,
                ],
                storedAnswer: [
                    storedAnswerAttempt.authorizationStatus,
                    storedAnswerAttempt.blockReason,
                ],
                evidence: [
                    evidenceAttempt.authorizationStatus,
                    evidenceAttempt.blockReason,
                ],
                string: [
                    stringAttempt.authorizationStatus,
                    stringAttempt.blockReason,
                ],
                revokedProxy: [
                    revokedProxyAttempt.authorizationStatus,
                    revokedProxyAttempt.blockReason,
                ],
            };
        })(),
        {
            issuedIdentityValid: true,
            copiedIdentityValid: false,
            issuedLicenseValid: true,
            copiedLicenseValid: false,
            accessor: [
                "blocked",
                "nonactive-options-contain-hidden-accessor-or-unknown-authority",
                0,
            ],
            documentary: [
                "blocked",
                "nonactive-options-contain-hidden-accessor-or-unknown-authority",
            ],
            storedAnswer: [
                "blocked",
                "nonactive-options-contain-hidden-accessor-or-unknown-authority",
            ],
            evidence: [
                "blocked",
                "nonactive-options-contain-hidden-accessor-or-unknown-authority",
            ],
            string: [
                "blocked",
                "nonactive-options-must-be-a-plain-data-object",
            ],
            revokedProxy: [
                "blocked",
                "nonactive-options-contain-hidden-accessor-or-unknown-authority",
            ],
        }
    );

    s.eq(
        "Later derivation prerequisites and examples are absent while Lesson 20 productive rules remain",
        (() => {
            const inventories = [
                ["huāqui", "B", "intransitive", "huā-qui-lō"],
                ["caqui", "B", "specific-projective", "caquī-hua"],
                ["namaca", "A", "specific-projective", "namaquī-lō"],
                ["nequi", "B", "specific-projective", "nequi-lō"],
                ["mahui", "B", "intransitive", "mahu-o-hua"],
            ].map(([sourceStem, verbClass, sourceValence, forbiddenTarget]) => {
                const inventory =
                    ctx.getClassicalNahuatlNonactiveStemOptions(
                        sourceStem,
                        { verbClass, sourceValence }
                    );
                return {
                    sourceStem,
                    targets: inventory.options.map(
                        option => option.nonactiveStem
                    ),
                    forbiddenTargetPresent: inventory.options.some(
                        option => option.nonactiveStem === forbiddenTarget
                    ),
                    crossLessonExampleAuthority:
                        inventory.crossLessonExampleAuthority,
                };
            });
            const itta =
                ctx.getClassicalNahuatlNonactiveStemOptions("itta", {
                    verbClass: "A",
                    sourceValence: "specific-projective",
                });
            return {
                inventories,
                itta: itta.options.map(option => option.nonactiveStem),
            };
        })(),
        {
            inventories: [
                {
                    sourceStem: "huāqui",
                    targets: ["huāc-o-hua"],
                    forbiddenTargetPresent: false,
                    crossLessonExampleAuthority: false,
                },
                {
                    sourceStem: "caqui",
                    targets: ["cac-ō"],
                    forbiddenTargetPresent: false,
                    crossLessonExampleAuthority: false,
                },
                {
                    sourceStem: "namaca",
                    targets: ["namac-ō"],
                    forbiddenTargetPresent: false,
                    crossLessonExampleAuthority: false,
                },
                {
                    sourceStem: "nequi",
                    targets: ["nec-ō"],
                    forbiddenTargetPresent: false,
                    crossLessonExampleAuthority: false,
                },
                {
                    sourceStem: "mahui",
                    targets: ["mahuī-hua", "ma-ō-hua"],
                    forbiddenTargetPresent: false,
                    crossLessonExampleAuthority: false,
                },
            ],
            itta: ["itt-ō", "itt-a-lō"],
        }
    );

    return s;
}

module.exports = { run };
