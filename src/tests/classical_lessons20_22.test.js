"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lessons20_22");
    const root = path.resolve(__dirname, "..", "..");
    const shell = fs.readFileSync(path.join(root, "src", "ui", "shell", "classical_shell.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(root, "src", "ui", "rendering", "rendering.mjs"), "utf8");
    const vncApplication = fs.readFileSync(
        path.join(root, "src", "application", "classical", "vnc_application.mjs"),
        "utf8"
    );
    const vncEvaluator = fs.readFileSync(
        path.join(root, "src", "core", "classical", "vnc_layer_evaluator.mjs"),
        "utf8"
    );
    const vncGrammar = fs.readFileSync(
        path.join(root, "src", "core", "classical", "vnc_lessons20_22_grammar.mjs"),
        "utf8"
    );
    const contractRegistry = fs.readFileSync(
        path.join(root, "src", "core", "grammar", "contract_registry.mjs"),
        "utf8"
    );
    s.eq(
        "The test-only Lessons 20-22 source-span ledger has zero incomplete or presentation-exposed items",
        (() => {
            const frame = ctx.buildClassicalNahuatlLessons20To22ClosureFrame();
            const transcriptionLines = fs.readFileSync(
                path.join(root, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
                "utf8"
            ).split(/\n/u);
            const coveredSourceLines = new Set();
            frame.claims.forEach(claim => {
                for (
                    let line = claim.transcriptionLineStart;
                    line <= claim.transcriptionLineEnd;
                    line += 1
                ) {
                    coveredSourceLines.add(line);
                }
            });
            const sourceFurnitureLines = new Set([
                6742, 6743, 6776, 7022, 7024, 7025, 7055, 7057, 7189,
                7221, 7223, 7224, 7297, 7299, 7423, 7425,
            ]);
            const uncoveredSubstantiveLines = [];
            for (
                let line = frame.sourceLineStart;
                line <= frame.sourceLineEnd;
                line += 1
            ) {
                if (
                    transcriptionLines[line - 1]?.trim()
                    && !sourceFurnitureLines.has(line)
                    && !coveredSourceLines.has(line)
                ) {
                    uncoveredSubstantiveLines.push(line);
                }
            }
            return {
                status: frame.authorizationStatus,
                claims: frame.claimCount,
                lessons: frame.lessonCounts,
                dispositions: frame.dispositionCounts,
                unclassified: frame.unclassifiedClaimCount,
                partial: frame.partialImplementationCount,
                missingPaths: frame.missingExecutablePathCount,
                missingProofs: frame.missingProofObligationCount,
                uniqueIds: new Set(frame.claims.map(claim => claim.id)).size,
                presentationExposure: frame.claims.some(
                    claim => claim.presentationExposure !== false
                        || claim.projections.length !== 0
                ),
                proofKinds: frame.claims.every(claim => [
                    "positive",
                    "negative",
                    "interaction",
                    "hostile",
                    "scalar",
                    "paradigm",
                ].every(kind => Boolean(claim.proofIds?.[kind]))),
                uncoveredSubstantiveLines,
            };
        })(),
        {
            status: "authorized",
            claims: 80,
            lessons: { 20: 37, 21: 19, 22: 24 },
            dispositions: {
                "existing-canonical-rule": 62,
                "new-canonical-rule": 3,
                "read-only-evidence": 15,
                "genuinely-blocked": 0,
            },
            unclassified: 0,
            partial: 0,
            missingPaths: 0,
            missingProofs: 0,
            uniqueIds: 80,
            presentationExposure: false,
            proofKinds: true,
            uncoveredSubstantiveLines: [],
        }
    );

    s.eq(
        "The production GCD is executable and the LCM maps every executable source claim to canonical grammar",
        (() => {
            const frame = ctx.buildClassicalNahuatlGrammarContract();
            const ledger = ctx.buildClassicalNahuatlLessons20To22ClosureFrame();
            const inspection = ctx.inspectRegisteredGrammarContract(
                ctx.getDefaultGrammarContractRegistry(),
                frame
            );
            const lcm = frame.leastCommonMultiple;
            const executors = new Set(lcm.canonicalExecutorInventory);
            return {
                status: frame.authorizationStatus,
                inspection: inspection.status,
                gcd: frame.greatestCommonDivisor.identityId,
                source: frame.greatestCommonDivisor.inputKind,
                target: frame.greatestCommonDivisor.outputKind,
                order: frame.greatestCommonDivisor.operationOrder,
                agent: frame.greatestCommonDivisor.sourceAgentExpressible,
                axes: lcm.distinctionSpecs.length,
                uniqueAxes: new Set(lcm.distinctionSpecs.map(spec => spec.axisId)).size,
                allAxesExecutable: lcm.distinctionSpecs.every(spec =>
                    spec.canonicalExecutorIds.every(id => executors.has(id))
                ),
                allExecutableClaimsCovered: ledger.claims
                    .filter(claim => claim.disposition !== "read-only-evidence")
                    .every(claim => claim.canonicalObjectIds.some(id => executors.has(id))),
                voices: lcm.voiceOperationInventory,
                cores: lcm.nonactiveFormationCoreInventory,
                continuations: lcm.nonactiveContinuationInventory,
                objectCounts: lcm.objectCountInventory,
                restrictions: lcm.restrictions.length,
                interactions: lcm.interactions.length,
                exceptions: lcm.exceptionFamilies.length,
                auditMetadataAbsent:
                    !Object.hasOwn(frame, "sourceLineStart")
                    && !Object.hasOwn(frame, "claimCount")
                    && !Object.hasOwn(frame, "dispositionCounts")
                    && !Object.hasOwn(frame, "claimSignature"),
            };
        })(),
        {
            status: "authorized",
            inspection: "valid",
            gcd: "typed-active-vnc-to-derived-voice-vnc",
            source: "authorized-typed-active-vnc",
            target: "authorized-typed-derived-voice-vnc",
            order: [
                "vnc-active-source-analysis",
                "vnc-nonactive-stem-derivation",
                "vnc-voice-participant-transformation",
                "vnc-class-a-finite-realization",
                "vnc-sentence-force-composition",
            ],
            agent: false,
            axes: 30,
            uniqueAxes: 30,
            allAxesExecutable: true,
            allExecutableClaimsCovered: true,
            voices: ["passive", "impersonal", "inherent-impersonal", "tla-impersonal"],
            cores: ["ō", "lō", "hua"],
            continuations: ["none", "hua", "lō"],
            objectCounts: [0, 1, 2, 3],
            restrictions: 8,
            interactions: 7,
            exceptions: 9,
            auditMetadataAbsent: true,
        }
    );

    s.eq(
        "The GCD selection gate authorizes each licensed LCM branch and rejects missing prerequisites or forged operations",
        (() => {
            const evaluate = ctx.evaluateClassicalNahuatlGrammarSelection;
            const summarize = frame => ({
                status: frame.authorizationStatus,
                reason: frame.blockReason,
                operations: frame.gcdOperationIds,
                authority: frame.callerSuppliedAuthorityAccepted,
            });
            return {
                nonactive: summarize(evaluate({
                    operationId: "nonactive",
                    sourceAuthorized: true,
                    nonactiveFamilyAuthorized: true,
                    generatedRuleOptionAuthorized: true,
                })),
                passive: summarize(evaluate({
                    operationId: "passive",
                    sourceAuthorized: true,
                    nonactiveRecordAuthorized: true,
                    sourceValence: "specific-projective",
                    hasSpecificObject: true,
                })),
                impersonal: summarize(evaluate({
                    operationId: "impersonal",
                    sourceAuthorized: true,
                    nonactiveRecordAuthorized: true,
                    sourceValence: "intransitive",
                })),
                multipleObjectImpersonal: summarize(evaluate({
                    operationId: "impersonal",
                    sourceAuthorized: true,
                    nonactiveRecordAuthorized: true,
                    sourceValence: "multiple-object",
                })),
                inherent: summarize(evaluate({
                    operationId: "inherent-impersonal",
                    sourceAuthorized: true,
                    sourceValence: "intransitive",
                    inherentSourceAuthorized: true,
                })),
                tla: summarize(evaluate({
                    operationId: "tla-impersonal",
                    sourceAuthorized: true,
                    sourceValence: "intransitive",
                    tlaSourceAuthorized: true,
                })),
                passiveWithoutObject: summarize(evaluate({
                    operationId: "passive",
                    sourceAuthorized: true,
                    nonactiveRecordAuthorized: true,
                    sourceValence: "intransitive",
                })),
                impersonalSpecific: summarize(evaluate({
                    operationId: "impersonal",
                    sourceAuthorized: true,
                    nonactiveRecordAuthorized: true,
                    sourceValence: "specific-projective",
                    hasSpecificObject: true,
                })),
                forged: summarize(evaluate({
                    operationId: "lesson22-example-answer",
                    sourceAuthorized: true,
                    nonactiveRecordAuthorized: true,
                    sourceValence: "intransitive",
                })),
            };
        })(),
        {
            nonactive: {
                status: "authorized",
                reason: "",
                operations: [
                    "vnc-active-source-analysis",
                    "vnc-nonactive-stem-derivation",
                ],
                authority: false,
            },
            passive: {
                status: "authorized",
                reason: "",
                operations: [
                    "vnc-active-source-analysis",
                    "vnc-nonactive-stem-derivation",
                    "vnc-voice-participant-transformation",
                ],
                authority: false,
            },
            impersonal: {
                status: "authorized",
                reason: "",
                operations: [
                    "vnc-active-source-analysis",
                    "vnc-nonactive-stem-derivation",
                    "vnc-voice-participant-transformation",
                ],
                authority: false,
            },
            multipleObjectImpersonal: {
                status: "authorized",
                reason: "",
                operations: [
                    "vnc-active-source-analysis",
                    "vnc-nonactive-stem-derivation",
                    "vnc-voice-participant-transformation",
                ],
                authority: false,
            },
            inherent: {
                status: "authorized",
                reason: "",
                operations: [
                    "vnc-active-source-analysis",
                    "vnc-voice-participant-transformation",
                ],
                authority: false,
            },
            tla: {
                status: "authorized",
                reason: "",
                operations: [
                    "vnc-active-source-analysis",
                    "vnc-voice-participant-transformation",
                ],
                authority: false,
            },
            passiveWithoutObject: {
                status: "blocked",
                reason: "passive-requires-specific-or-reflexive-object",
                operations: [
                    "vnc-active-source-analysis",
                    "vnc-nonactive-stem-derivation",
                    "vnc-voice-participant-transformation",
                ],
                authority: false,
            },
            impersonalSpecific: {
                status: "blocked",
                reason: "impersonal-blocks-specific-projective-source",
                operations: [
                    "vnc-active-source-analysis",
                    "vnc-nonactive-stem-derivation",
                    "vnc-voice-participant-transformation",
                ],
                authority: false,
            },
            forged: {
                status: "blocked",
                reason: "nonactive-voice-operation-not-in-lcm",
                operations: ["vnc-active-source-analysis"],
                authority: false,
            },
        }
    );

    s.eq(
        "Intransitive final tza retains tz before o-hua without weakening genuine za to x",
        (() => {
            const finalTza = ctx.getClassicalNahuatlNonactiveStemOptions("oh-quetza", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const finalZa = ctx.getClassicalNahuatlNonactiveStemOptions("pasa", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const finalTzaRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord("oh-quetza", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            return {
                finalTza: finalTza.options.map(option => option.nonactiveStem),
                finalTzaRule: finalTza.options.map(option => option.ruleId),
                selectedFinalTza: finalTzaRecord.nonactiveStem,
                finalZa: finalZa.options.map(option => option.nonactiveStem),
            };
        })(),
        {
            finalTza: ["oh-quetz-o-hua"],
            finalTzaRule: ["cn-l20-5-intransitive-final-tza"],
            selectedFinalTza: "oh-quetz-o-hua",
            finalZa: ["pax-o-hua"],
        }
    );

    s.eq(
        "Generic final-hui remains additive while §25.2.4 retains its typed internal operation",
        (() => {
            const inventory = ctx.getClassicalNahuatlNonactiveStemOptions("ihc-i-hui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const source = ctx.buildClassicalNahuatlVerbstemClassFrame("ihc-i-hui", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                perfectiveClass: "B",
                valence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
                objectPerson: "",
            });
            const causativeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "causative",
            });
            const longHuiCausatives = causativeInventory.options
                .filter(option => option.targetStem === "ihc-i-huī-tiā")
                .map(option => ({
                    route: option.derivationRoute,
                    licensedNonactiveSource: option.licensedLesson20NonactiveStem,
                    authority: option.authorityStatus,
                }));
            const allStockVowels = ["a", "e", "i", "o"].map(vowel => {
                const sourceStem = `x-${vowel}-hui`;
                const vowelInventory = ctx.getClassicalNahuatlNonactiveStemOptions(sourceStem, {
                    verbClass: "B",
                    sourceValence: "intransitive",
                });
                return {
                    sourceStem,
                    hasLongHuiHua: vowelInventory.options.some(option => option.nonactiveStem === `x-${vowel}-huī-hua`),
                    longHuiRule: vowelInventory.options.find(option => option.nonactiveStem === `x-${vowel}-huī-hua`)?.ruleId || "",
                };
            });
            const forged = ctx.deriveClassicalNahuatlNonactiveStemRecord("ihc-i-hui", {
                verbClass: "B",
                sourceValence: "intransitive",
                optionId: "hua:FORGED-huī-hua",
            });
            return {
                stems: inventory.options.map(option => option.nonactiveStem),
                selectorRequired: inventory.selectorRequired,
                resolutionPolicy: inventory.candidateLattice.productiveCandidateSet.candidateResolutionPolicy,
                crossLessonExampleAuthority: inventory.crossLessonExampleAuthority,
                longHuiCausatives,
                allStockVowels,
                forged: {
                    status: forged.authorizationStatus,
                    reason: forged.blockReason,
                    target: forged.nonactiveStem,
                },
            };
        })(),
        {
            stems: [
                "ihc-i-ō-hua",
                "ihc-i-huī-hua",
                "ihc-i-hui-hua-lō",
            ],
            selectorRequired: true,
            resolutionPolicy: "collect-all-applicable-routes-then-apply-explicit-add-replace-block-compose-relationships",
            crossLessonExampleAuthority: false,
            longHuiCausatives: [{
                route: "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
                authority: "typed-lexical-route-plus-derived-internal-nonactive-prerequisite",
            }],
            allStockVowels: [
                { sourceStem: "x-a-hui", hasLongHuiHua: true, longHuiRule: "cn-l20-6-final-i-o" },
                { sourceStem: "x-e-hui", hasLongHuiHua: true, longHuiRule: "cn-l20-6-final-i-o" },
                { sourceStem: "x-i-hui", hasLongHuiHua: true, longHuiRule: "cn-l20-6-final-i-o" },
                { sourceStem: "x-o-hui", hasLongHuiHua: true, longHuiRule: "cn-l20-6-final-i-o" },
            ],
            forged: {
                status: "blocked",
                reason: "lesson20-selected-option-was-not-generated",
                target: "",
            },
        }
    );

    s.eq(
        "Causative and applicative prerequisites are absent from the shared nonactive operation",
        (() => {
            const records = [
                ...Object.values(ctx.CLASSICAL_NAHUATL_LESSON20_FIXED_FORMATIONS || {}).flat(),
                ...Object.values(ctx.CLASSICAL_NAHUATL_CROSS_LESSON_NONACTIVE_SUPPLEMENTS || {}).flat(),
            ];
            const derivedRecords = records.filter(record => /^derived-(?:causative|applicative)-source-prerequisite$/u.test(record.formationAuthority || ""));
            const legacyAuthorities = records.filter(record => /^hypothetical-(?:causative|applicative)-source$/u.test(record.formationAuthority || ""));
            const unaccounted = derivedRecords.filter(record => !record.nonactiveStem || !record.suffixFamily || !record.ruleId || !record.andrewsSection || !record.attestationStatus);
            const projectedRuleFrames = Object.entries(ctx.CLASSICAL_NAHUATL_CROSS_LESSON_NONACTIVE_SUPPLEMENTS || {}).flatMap(([sourceStem, sourceRecords]) => sourceRecords
                .filter(record => /^derived-(?:causative|applicative)-source-prerequisite$/u.test(record.formationAuthority || ""))
                .map(record => {
                    const sourceValence = record.sourceValenceMode === "transitive" ? "specific-projective" : "intransitive";
                    const option = ctx.getClassicalNahuatlNonactiveStemOptions(sourceStem, {
                        verbClass: sourceStem === "itt-a" ? "A" : "B",
                        sourceValence,
                    }).options.find(candidate => candidate.nonactiveStem === record.nonactiveStem);
                    return option?.prerequisiteSourceRuleFrame || null;
                }));
            const fixedProjectedRuleFrames = Object.entries(ctx.CLASSICAL_NAHUATL_LESSON20_FIXED_FORMATIONS || {}).flatMap(([sourceStem, sourceRecords]) => sourceRecords
                .filter(record => /^derived-(?:causative|applicative)-source-prerequisite$/u.test(record.formationAuthority || ""))
                .map(record => ctx.getClassicalNahuatlNonactiveStemOptions(sourceStem, {
                    verbClass: "B",
                    sourceValence: "intransitive",
                }).options.find(candidate => candidate.nonactiveStem === record.nonactiveStem)?.prerequisiteSourceRuleFrame || null));
            const allProjectedRuleFrames = [...projectedRuleFrames, ...fixedProjectedRuleFrames];
            const caqui = ctx.getClassicalNahuatlNonactiveStemOptions("caqui", {
                verbClass: "B",
                sourceValence: "specific-projective",
            }).options.find(option => option.nonactiveStem === "caquī-hua");
            const namaca = ctx.getClassicalNahuatlNonactiveStemOptions("namaca", {
                verbClass: "A",
                sourceValence: "specific-projective",
            }).options.find(option => option.nonactiveStem === "namaquī-lō");
            const summarizeProjection = option => ({
                relationship: option?.ruleRelationship || "",
                authority: option?.formationAuthority || "",
                status: option?.prerequisiteProjection?.authorizationStatus || "",
                consumer: option?.prerequisiteProjection?.consumerOperation || "",
                necessity: option?.prerequisiteProjection?.prerequisiteNecessity || "",
                callerSurfaceAuthority: option?.prerequisiteProjection?.directSurfaceStringAuthority,
            });
            return {
                rawRegistriesExposed: [
                    typeof ctx.CLASSICAL_NAHUATL_LESSON20_FIXED_FORMATIONS,
                    typeof ctx.CLASSICAL_NAHUATL_CROSS_LESSON_NONACTIVE_SUPPLEMENTS,
                ],
                derivedCount: derivedRecords.length,
                legacyAuthorities: legacyAuthorities.length,
                unaccounted: unaccounted.map(record => record.ruleId),
                reusableSourceRules: {
                    authorized: allProjectedRuleFrames.filter(frame => frame?.authorizationStatus === "authorized").length,
                    categoryCount: new Set(allProjectedRuleFrames.map(frame => frame?.categoryRuleId).filter(Boolean)).size,
                    unresolved: allProjectedRuleFrames.filter(frame => frame?.authorizationStatus !== "authorized").length,
                    directSurfaceAuthorities: allProjectedRuleFrames.filter(frame => frame?.directSurfaceStringAuthority !== false).length,
                    membershipQualifiers: [...new Set(allProjectedRuleFrames.map(frame => frame?.membershipQualifier).filter(Boolean))].sort(),
                },
                caqui: summarizeProjection(caqui),
                namaca: summarizeProjection(namaca),
            };
        })(),
        {
            rawRegistriesExposed: ["undefined", "undefined"],
            derivedCount: 0,
            legacyAuthorities: 0,
            unaccounted: [],
            reusableSourceRules: {
                authorized: 0,
                categoryCount: 0,
                unresolved: 0,
                directSurfaceAuthorities: 0,
                membershipQualifiers: [],
            },
            caqui: {
                relationship: "",
                authority: "",
                status: "",
                consumer: "",
                necessity: "",
            },
            namaca: {
                relationship: "",
                authority: "",
                status: "",
                consumer: "",
                necessity: "",
            },
        }
    );

    s.eq(
        "A later causative note cannot install a shared nonactive option",
        (() => {
            const licensedValences = [
                "intransitive",
                "specific-projective",
                "projective-human",
                "projective-nonhuman",
                "mainline-reflexive",
                "shuntline-reflexive",
                "human-reciprocal",
            ];
            const availability = Object.fromEntries(licensedValences.map(sourceValence => [
                sourceValence,
                ctx.getClassicalNahuatlNonactiveStemOptions("hue-tz-ca", {
                    verbClass: "A",
                    sourceValence,
                }).options.some(option => option.nonactiveStem === "hue-tz-quī-hua"),
            ]));
            const multipleObject = ctx.getClassicalNahuatlNonactiveStemOptions("hue-tz-ca", {
                verbClass: "A",
                sourceValence: "multiple-object",
            }).options.some(option => option.nonactiveStem === "hue-tz-quī-hua");
            const ordinaryIntransitive = ctx.getClassicalNahuatlNonactiveStemOptions("hue-tz-ca", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            return {
                availability,
                multipleObject,
                ordinaryIntransitive: ordinaryIntransitive.options.map(option => option.nonactiveStem),
            };
        })(),
        {
            availability: {
                intransitive: false,
                "specific-projective": false,
                "projective-human": false,
                "projective-nonhuman": false,
                "mainline-reflexive": false,
                "shuntline-reflexive": false,
                "human-reciprocal": false,
            },
            multipleObject: false,
            ordinaryIntransitive: ["hue-tz-c-ō"],
        }
    );

    s.eq(
        "The nonactive candidate lattice resolves licensed e-allomorphs and documents every uncovered final-shape cell",
        (() => {
            const chiye = ctx.getClassicalNahuatlNonactiveStemOptions("chiye", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const issuedIdentity = ctx.buildClassicalNahuatlActiveStemIdentityFrame("chiye", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const copiedIdentity = { ...issuedIdentity };
            let getterCalls = 0;
            const accessorOptions = {};
            Object.defineProperty(accessorOptions, "verbClass", {
                enumerable: true,
                get() {
                    getterCalls += 1;
                    return "B";
                },
            });
            const accessorAttempt = ctx.getClassicalNahuatlNonactiveStemOptions(
                "chiye",
                accessorOptions
            );
            const copiedAuthorityAttempt = ctx.getClassicalNahuatlNonactiveStemOptions("chiye", {
                verbClass: "B",
                sourceValence: "specific-projective",
                sourceIdentityFrame: copiedIdentity,
            });
            const boxedSourceAttempt = ctx.getClassicalNahuatlNonactiveStemOptions(
                new String("chiye"),
                { verbClass: "B", sourceValence: "specific-projective" }
            );
            const hiddenAuthorityOptions = {
                verbClass: "B",
                sourceValence: "specific-projective",
            };
            hiddenAuthorityOptions[Symbol("formationAuthority")] = "later-canvas-source-witness";
            const hiddenAuthorityAttempt =
                ctx.getClassicalNahuatlNonactiveStemOptions(
                    "chiye",
                    hiddenAuthorityOptions
                );
            const piye = ctx.getClassicalNahuatlNonactiveStemOptions("piye", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const meme = ctx.getClassicalNahuatlNonactiveStemOptions("mēmē", {
                verbClass: "D",
                sourceValence: "specific-projective",
            });
            const unknownE = ctx.getClassicalNahuatlNonactiveStemOptions("xele", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const collectedRoutes = ctx.buildClassicalNahuatlProductiveCandidateSet("palata", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const piyeRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord("piye", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            return {
                chiye: {
                    stems: chiye.options.map((option) => option.nonactiveStem),
                    identity: chiye.sourceIdentityFrame.lexicalIdentityId,
                    entered: chiye.sourceIdentityFrame.enteredStem,
                    canonical: chiye.sourceIdentityFrame.canonicalImperfectiveStem,
                    selector: chiye.selectorRequired,
                    resolution: chiye.candidateResolutionStatus,
                    identityCallerAllowed: chiye.sourceIdentityFrame.callerSuppliedIdentityAllowed,
                },
                piye: {
                    stems: piye.options.map((option) => option.nonactiveStem),
                    identity: piye.sourceIdentityFrame.lexicalIdentityId,
                    selector: piye.selectorRequired,
                    resolution: piye.candidateResolutionStatus,
                },
                meme: {
                    status: meme.authorizationStatus,
                    resolution: meme.candidateResolutionStatus,
                    reason: meme.blockReason,
                    identity: meme.sourceIdentityFrame.lexicalIdentityId,
                    license: meme.sourceIdentityFrame.exactNonactiveLicenseStatus,
                },
                unknownE: {
                    status: unknownE.authorizationStatus,
                    reason: unknownE.blockReason,
                    productiveCandidates: unknownE.candidateLattice.productiveCandidateSet.resolvedOptions.length,
                },
                collectedRoutes: collectedRoutes.routeEvaluations.map((route) => ({
                    category: route.decisionCategory,
                    resolution: route.resolution,
                })),
                piyeRecord: {
                    status: piyeRecord.authorizationStatus,
                    stem: piyeRecord.nonactiveStem,
                    identity: piyeRecord.lexicalIdentityId,
                    category: piyeRecord.decisionCategory,
                    typed: ctx.isClassicalNahuatlNonactiveStemRecord(piyeRecord, "piye"),
                },
                hostileAuthority: {
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
                    accessorStatus: accessorAttempt.authorizationStatus,
                    accessorReason: accessorAttempt.blockReason,
                    getterCalls,
                    copiedAuthorityStatus: copiedAuthorityAttempt.authorizationStatus,
                    copiedAuthorityReason: copiedAuthorityAttempt.blockReason,
                    boxedSourceStatus: boxedSourceAttempt.authorizationStatus,
                    boxedSourceReason: boxedSourceAttempt.blockReason,
                    hiddenAuthorityStatus: hiddenAuthorityAttempt.authorizationStatus,
                    hiddenAuthorityReason: hiddenAuthorityAttempt.blockReason,
                },
            };
        })(),
        {
            chiye: {
                stems: ["chiye-lō"],
                identity: "chiya-chiye-wait",
                entered: "chiye",
                canonical: "chiya",
                selector: false,
                resolution: "determinate",
                identityCallerAllowed: false,
            },
            piye: {
                stems: ["piya-lō"],
                identity: "piya-piye-guard",
                selector: false,
                resolution: "determinate",
            },
            meme: {
                status: "blocked",
                resolution: "documented-unresolved",
                reason: "lesson20-active-allomorph-nonactive-formation-documented-unresolved",
                identity: "mama-meme-carry-on-back",
                license: "documented-unresolved",
            },
            unknownE: {
                status: "blocked",
                reason: "lesson20-final-e-requires-owner-issued-licensed-active-allomorph",
                productiveCandidates: 0,
            },
            collectedRoutes: [
                { category: "transitive-final-ta", resolution: "selected" },
                { category: "general-final-a", resolution: "replaced-by-named-rule" },
            ],
            piyeRecord: {
                status: "authorized",
                stem: "piya-lō",
                identity: "piya-piye-guard",
                category: "exact-fixed-formation",
                typed: true,
            },
            hostileAuthority: {
                issuedIdentityValid: true,
                copiedIdentityValid: false,
                accessorStatus: "blocked",
                accessorReason: "nonactive-options-contain-hidden-accessor-or-unknown-authority",
                getterCalls: 0,
                copiedAuthorityStatus: "blocked",
                copiedAuthorityReason: "nonactive-options-contain-hidden-accessor-or-unknown-authority",
                boxedSourceStatus: "blocked",
                boxedSourceReason: "lesson20-typed-active-source-stem-required",
                hiddenAuthorityStatus: "blocked",
                hiddenAuthorityReason: "nonactive-options-contain-hidden-accessor-or-unknown-authority",
            },
        }
    );

    s.eq(
        "Ordered voice layers derive every higher-order witness and block adjacent-o or forged authority",
        (() => {
            const yohuaInventory = ctx.getClassicalNahuatlNonactiveStemOptions("yohua", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            const tlaYohuaFirstPass = ctx.getClassicalNahuatlNonactiveStemOptions("tla-yohua", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            const routeInventory = ctx.getClassicalNahuatlOrderedVoiceLayerOptions("yohua");
            const layer2Cascade = ctx.getClassicalNahuatlOrderedVoiceLayerCascadeOptions(
                "yohua",
                ["inherent-impersonal"]
            );
            const partialTlaCascade = ctx.deriveClassicalNahuatlOrderedVoiceLayerChain("yohua", {
                operations: ["inherent-impersonal", "tla-impersonal"],
            });
            const layer3Cascade = ctx.getClassicalNahuatlOrderedVoiceLayerCascadeOptions(
                "yohua",
                partialTlaCascade.operations
            );
            const completeCascade = ctx.deriveClassicalNahuatlOrderedVoiceLayerChain("yohua", {
                operations: ["inherent-impersonal", "tla-impersonal", "nonactive-lō"],
            });
            const triple = ctx.deriveClassicalNahuatlOrderedVoiceLayerChain("yohua", {
                routeId: "cn-l38-yohua-triply-impersonal",
                targetStem: "TARGET-LIE",
                layers: [{ targetStem: "LAYER-LIE" }],
                formulaArtifact: "#FORMULA-LIE#",
                surfaceArtifact: "SURFACE-LIE",
            });
            const forged = JSON.parse(JSON.stringify(triple));
            forged.layers[1].targetStem = "FORGED";
            const wrongSource = ctx.deriveClassicalNahuatlOrderedVoiceLayerChain("nēci", {
                routeId: "cn-l38-yohua-triply-impersonal",
            });
            return {
                yohuaOptions: yohuaInventory.options.map((option) => option.nonactiveStem),
                yohuaAutomatic: yohuaInventory.automaticOptionId,
                badAdjacentOAbsent: !JSON.stringify(yohuaInventory).includes("yoō-hua"),
                tlaYohuaFirstPassStatus: tlaYohuaFirstPass.authorizationStatus,
                tlaYohuaFirstPassOptions: tlaYohuaFirstPass.options.length,
                routeIds: routeInventory.options.map((option) => option.routeId),
                layer2Options: layer2Cascade.options.map((option) => `${option.operationId}:${option.targetStem}`),
                partialTlaTarget: partialTlaCascade.targetStem,
                partialTlaComplete: partialTlaCascade.completeRoute,
                partialTlaValid: ctx.isClassicalNahuatlOrderedVoiceLayerChain(partialTlaCascade, "yohua"),
                layer3Options: layer3Cascade.options.map((option) => `${option.operationId}:${option.targetStem}`),
                completeCascadeRoute: completeCascade.routeId,
                completeCascadeTarget: completeCascade.targetStem,
                tripleStatus: triple.authorizationStatus,
                tripleTarget: triple.targetStem,
                tripleLayers: triple.layers.map((layer) => `${layer.sourceStem}>${layer.targetStem}`),
                tripleDepth: triple.impersonalDepth,
                tripleValid: ctx.isClassicalNahuatlOrderedVoiceLayerChain(triple, "yohua"),
                poisonSurvives: JSON.stringify(triple).includes("LIE"),
                forgedValid: ctx.isClassicalNahuatlOrderedVoiceLayerChain(forged, "yohua"),
                wrongSourceStatus: wrongSource.authorizationStatus,
            };
        })(),
        {
            yohuaOptions: ["yohua-lō"],
            yohuaAutomatic: "lō:yohua-lō",
            badAdjacentOAbsent: true,
            tlaYohuaFirstPassStatus: "blocked",
            tlaYohuaFirstPassOptions: 0,
            routeIds: [
                "cn-l38-yohua-doubly-impersonal",
                "cn-l38-yohua-triply-impersonal",
            ],
            layer2Options: ["nonactive-lō:yohua-lō", "tla-impersonal:tla-yohua"],
            partialTlaTarget: "tla-yohua",
            partialTlaComplete: false,
            partialTlaValid: true,
            layer3Options: ["nonactive-lō:tla-yohua-lō"],
            completeCascadeRoute: "cn-l38-yohua-triply-impersonal",
            completeCascadeTarget: "tla-yohua-lō",
            tripleStatus: "authorized",
            tripleTarget: "tla-yohua-lō",
            tripleLayers: [
                "yohua>yohua",
                "yohua>tla-yohua",
                "tla-yohua>tla-yohua-lō",
            ],
            tripleDepth: 3,
            tripleValid: true,
            poisonSurvives: false,
            forgedValid: false,
            wrongSourceStatus: "blocked",
        }
    );

    s.eq(
        "Lesson 20 models one-to-three-unit macron and hyphen final shapes on both sides of every formation",
        (() => {
            const decomposedClassCStem = "pol-o-a\u0304";
            const classCInventory = ctx.getClassicalNahuatlNonactiveStemOptions(decomposedClassCStem, {
                verbClass: "C",
                sourceValence: "projective-nonhuman",
            });
            const hostileShapeInventory = ctx.getClassicalNahuatlNonactiveStemOptions(decomposedClassCStem, {
                verbClass: "C",
                sourceValence: "projective-nonhuman",
                sourceFinalShapeFrame: {
                    stem: "THIS-CALLER-SHAPE-LIES",
                    orthographicTail: { three: "xyz" },
                },
            });
            const classCOption = classCInventory.options[0];
            const paTiShape = ctx.buildClassicalNahuatlStemFinalShapeFrame("pa-ti");
            const peWaInventory = ctx.getClassicalNahuatlNonactiveStemOptions("pewa", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const classCRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord(decomposedClassCStem, {
                verbClass: "C",
                sourceValence: "projective-nonhuman",
            });
            return {
                normalizedSource: classCInventory.sourceStem,
                sourceOrthographicTail: classCInventory.sourceFinalShapeFrame.orthographicTail,
                sourceMorphemeTail: classCInventory.sourceFinalShapeFrame.morphemeTail,
                sourceMacron: classCInventory.sourceFinalShapeFrame.finalLetterHasMacron,
                sourceBoundary: classCInventory.sourceFinalShapeFrame.finalThreeContainsBoundary,
                paTiOrthographicTail: paTiShape.orthographicTail,
                paTiLetterTail: paTiShape.letterTail,
                target: classCOption.nonactiveStem,
                targetMorphemeTail: classCOption.nonactiveFinalShapeFrame.morphemeTail,
                replacement: classCOption.finalShapeRelation.replacementShape,
                relationAuthority: classCOption.finalShapeRelation.shapeAuthority,
                callerShapeAllowed: classCOption.finalShapeRelation.callerSuppliedShapeAllowed,
                peWaFamilyTail: peWaInventory.options[0].nonactiveFinalShapeFrame.morphemeTail.two,
                recordStatus: classCRecord.authorizationStatus,
                recordRelation: classCRecord.finalShapeRelation?.replacementShape,
                recordIsTyped: ctx.isClassicalNahuatlNonactiveStemRecord(classCRecord, "pol-o-ā"),
                unitLimit: classCInventory.finalShapeUnitLimit,
                preservesMacronAndHyphen: classCInventory.macronAndHyphenPreserved,
                hostileShapeStatus: hostileShapeInventory.authorizationStatus,
                hostileShapeReason: hostileShapeInventory.blockReason,
            };
        })(),
        {
            normalizedSource: "pol-o-ā",
            sourceOrthographicTail: { one: "ā", two: "-ā", three: "o-ā" },
            sourceMorphemeTail: { one: "ā", two: "o-ā", three: "pol-o-ā" },
            sourceMacron: true,
            sourceBoundary: true,
            paTiOrthographicTail: { one: "i", two: "ti", three: "-ti" },
            paTiLetterTail: { one: "i", two: "ti", three: "ati" },
            target: "pol-ō-lō",
            targetMorphemeTail: { one: "lō", two: "ō-lō", three: "pol-ō-lō" },
            replacement: "o-ā > ō-lō",
            relationAuthority: "computed-from-generated-source-and-target-stems",
            callerShapeAllowed: false,
            peWaFamilyTail: "peō-hua",
            recordStatus: "authorized",
            recordRelation: "o-ā > ō-lō",
            recordIsTyped: true,
            unitLimit: 3,
            preservesMacronAndHyphen: true,
            hostileShapeStatus: "blocked",
            hostileShapeReason: "nonactive-options-contain-hidden-accessor-or-unknown-authority",
        }
    );

    s.eq(
        "The six nonactive surfaces resolve through three shared formation cores",
        (() => {
            const inventories = {
                "ō": ctx.getClassicalNahuatlNonactiveStemOptions("āna", {
                    verbClass: "B",
                    sourceValence: "specific-projective",
                }),
                "o-hua": ctx.getClassicalNahuatlNonactiveStemOptions("miqui", {
                    verbClass: "B",
                    sourceValence: "intransitive",
                }),
                "lō": ctx.getClassicalNahuatlNonactiveStemOptions("mayāna", {
                    verbClass: "B",
                    sourceValence: "intransitive",
                }),
                "lo-hua": ctx.getClassicalNahuatlNonactiveStemOptions("ye", {
                    verbClass: "A",
                    sourceValence: "intransitive",
                }),
                "hua": ctx.getClassicalNahuatlNonactiveStemOptions("cochi", {
                    verbClass: "B",
                    sourceValence: "intransitive",
                }),
                "hua-lō": ctx.getClassicalNahuatlNonactiveStemOptions("cui", {
                    verbClass: "A",
                    sourceValence: "specific-projective",
                }),
            };
            const structures = Object.fromEntries(Object.entries(inventories).map(([family, inventory]) => {
                const option = inventory.options.find((candidate) => candidate.suffixFamily === family);
                return [family, {
                    core: option?.formationCore,
                    continuation: option?.formationContinuation,
                    sequence: option?.formationSequence,
                    allomorph: option?.formationStructure?.surfaceAllomorph,
                    surfaceIsRealization: option?.surfaceFamilyIsRealization,
                }];
            }));
            const mahui = ctx.getClassicalNahuatlNonactiveStemOptions("mahui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const yeRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord("ye", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            return {
                structures,
                formationCores: inventories["ō"].formationCores,
                coreAuthority: inventories["ō"].formationCoreAuthority,
                compensatoryAllomorph: mahui.options.find((option) => option.nonactiveStem === "ma-ō-hua")?.formationStructure?.surfaceAllomorph,
                yeRecord: {
                    status: yeRecord.authorizationStatus,
                    family: yeRecord.suffixFamily,
                    core: yeRecord.formationCore,
                    continuation: yeRecord.formationContinuation,
                    sequence: yeRecord.formationSequence,
                    typed: ctx.isClassicalNahuatlNonactiveStemRecord(yeRecord, "ye"),
                },
                invalidFamilyStatus: ctx.getClassicalNahuatlNonactiveFormationStructure("lexical-exception").authorizationStatus,
            };
        })(),
        {
            structures: {
                "ō": { core: "o", continuation: "terminal", sequence: ["o"], allomorph: "ō", surfaceIsRealization: true },
                "o-hua": { core: "o", continuation: "hua", sequence: ["o", "hua"], allomorph: "o-hua", surfaceIsRealization: true },
                "lō": { core: "lo", continuation: "terminal", sequence: ["lo"], allomorph: "lō", surfaceIsRealization: true },
                "lo-hua": { core: "lo", continuation: "hua", sequence: ["lo", "hua"], allomorph: "lo-hua", surfaceIsRealization: true },
                "hua": { core: "hua", continuation: "terminal", sequence: ["hua"], allomorph: "hua", surfaceIsRealization: true },
                "hua-lō": { core: "hua", continuation: "lo", sequence: ["hua", "lo"], allomorph: "hua-lō", surfaceIsRealization: true },
            },
            formationCores: ["o", "lo", "hua"],
            coreAuthority: "andrews-three-core-system-with-six-surface-realizations",
            compensatoryAllomorph: "ō-hua",
            yeRecord: {
                status: "authorized",
                family: "lo-hua",
                core: "lo",
                continuation: "hua",
                sequence: ["lo", "hua"],
                typed: true,
            },
            invalidFamilyStatus: "blocked",
        }
    );

    s.eq(
        "Lesson 20 productive shape rules cover unlisted stems and Appendix classes cannot be caller-forged",
        (() => {
            const rootPlusYa = ctx.getClassicalNahuatlNonactiveStemOptions("nequi-ya", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const finalCui = ctx.getClassicalNahuatlNonactiveStemOptions("xocui", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const finalTa = ctx.getClassicalNahuatlNonactiveStemOptions("patata", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const postvocalicTi = ctx.getClassicalNahuatlNonactiveStemOptions("meloti", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const intransitivePostvocalicTi = ctx.getClassicalNahuatlNonactiveStemOptions("pa-ti", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const huaRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord("cochi", {
                verbClass: "B",
                sourceValence: "intransitive",
                optionId: "hua:cochī-hua",
            });
            const oRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord("āna", {
                verbClass: "B",
                sourceValence: "specific-projective",
                optionId: "ō:ān-ō",
            });
            const ayi = ctx.deriveClassicalNahuatlNonactiveStemRecord("āyi", {
                verbClass: "B",
                sourceValence: "specific-projective",
                optionId: "hua:āyī-hua",
            });
            return {
                rootPlusYa: rootPlusYa.options.map((option) => option.nonactiveStem),
                finalCui: finalCui.options.map((option) => option.nonactiveStem),
                finalTa: finalTa.options.map((option) => option.nonactiveStem),
                postvocalicTi: postvocalicTi.options.map((option) => option.nonactiveStem),
                intransitivePostvocalicTi: intransitivePostvocalicTi.options.map((option) => option.nonactiveStem),
                intransitivePostvocalicTiSelector: intransitivePostvocalicTi.selectorRequired,
                huaClass: huaRecord.targetClass,
                oClass: oRecord.targetClass,
                ayiAspectStems: [ayi.imperfectiveNonactiveStem, ayi.perfectiveNonactiveStem],
            };
        })(),
        {
            rootPlusYa: ["nequi-lō"],
            finalCui: ["xoc-ō"],
            finalTa: ["patat-ō"],
            postvocalicTi: ["meloch-ō"],
            intransitivePostvocalicTi: ["pa-tī-hua", "pa-ch-ō"],
            intransitivePostvocalicTiSelector: true,
            huaClass: "A-1",
            oClass: "A-2",
            ayiAspectStems: ["āyī-hua", "āyī-hua"],
        }
    );

    s.eq(
        "Lesson 20 inventory identity and root-plus-ya analysis ignore editorial hyphens without folding vowel quantity",
        (() => {
            const getInventory = (sourceStem, verbClass, sourceValence) => ctx.getClassicalNahuatlNonactiveStemOptions(sourceStem, {
                verbClass,
                sourceValence,
            });
            const itta = getInventory("itta", "A", "specific-projective");
            const segmentedItta = getInventory("itt-a", "A", "specific-projective");
            const cocoya = getInventory("cocoya", "B", "intransitive");
            const segmentedCocoya = getInventory("coco-ya", "B", "intransitive");
            const quantityChangedCocoya = getInventory("cōcoya", "B", "intransitive");
            const rootPlusYa = getInventory("nequi-ya", "B", "intransitive");
            const unsegmentedRootPlusYa = getInventory("nequiya", "B", "intransitive");
            const huaqui = getInventory("huā-qui", "B", "intransitive");
            const unsegmentedHuaqui = getInventory("huāqui", "B", "intransitive");
            const quantityChangedHuaqui = getInventory("huaqui", "B", "intransitive");
            const genericSegmentedTa = getInventory("palat-a", "B", "specific-projective");
            const ittaRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord("itta", {
                verbClass: "A",
                sourceValence: "specific-projective",
                optionId: "ō:itt-ō",
            });
            const segmentedIttaRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord("itt-a", {
                verbClass: "A",
                sourceValence: "specific-projective",
                optionId: "ō:itt-ō",
            });
            const optionSignature = (inventory) => inventory.options.map((option) => `${option.ruleId}:${option.nonactiveStem}`);
            const huaquiSupplement = (inventory) => inventory.options.find((option) => option.ruleId === "cn-l25-8-huaqui-lo-base");
            return {
                fixedItta: {
                    solid: optionSignature(itta),
                    segmented: optionSignature(segmentedItta),
                    targetPreserved: segmentedItta.options[0]?.nonactiveStem,
                    doubledBoundaryAbsent: segmentedItta.options.every((option) => !option.nonactiveStem.includes("--")),
                    canonicalRecords: [
                        ctx.isClassicalNahuatlNonactiveStemRecord(ittaRecord, "itta"),
                        ctx.isClassicalNahuatlNonactiveStemRecord(segmentedIttaRecord, "itt-a"),
                    ],
                },
                fixedCocoya: {
                    solid: optionSignature(cocoya),
                    segmented: optionSignature(segmentedCocoya),
                    quantityChanged: optionSignature(quantityChangedCocoya),
                    quantityChangedDidNotUseExactRule: quantityChangedCocoya.options.every((option) => option.ruleId !== "cn-l20-2-class-b-root-plus-ya-cocoya"),
                },
                productiveRootPlusYa: {
                    solid: optionSignature(unsegmentedRootPlusYa),
                    segmented: optionSignature(rootPlusYa),
                    solidBoundaryObserved: unsegmentedRootPlusYa.sourceIdentityFrame.internalMorphology.explicitRootPlusYaBoundary,
                    segmentedBoundaryObserved: rootPlusYa.sourceIdentityFrame.internalMorphology.explicitRootPlusYaBoundary,
                    solidAnalysisAuthorized: unsegmentedRootPlusYa.sourceIdentityFrame.internalMorphology.rootPlusYaAnalysisAuthorized,
                    boundaryAuthority: unsegmentedRootPlusYa.sourceIdentityFrame.internalMorphology.rootPlusYaBoundaryAuthority,
                },
                crossLessonExampleAuthority: {
                    solid: huaquiSupplement(unsegmentedHuaqui)?.nonactiveStem || "",
                    segmented: huaquiSupplement(huaqui)?.nonactiveStem || "",
                    rule: huaquiSupplement(unsegmentedHuaqui)?.ruleId || "",
                    section: huaquiSupplement(unsegmentedHuaqui)?.andrewsSection || "",
                    quantityChangedHasSupplement: Boolean(huaquiSupplement(quantityChangedHuaqui)),
                    inventoryAuthority: [
                        unsegmentedHuaqui.crossLessonExampleAuthority,
                        huaqui.crossLessonExampleAuthority,
                    ],
                },
                genericBoundaryJoin: genericSegmentedTa.options.map((option) => option.nonactiveStem),
            };
        })(),
        {
            fixedItta: {
                solid: [
                    "cn-l20-4-itta:itt-ō",
                    "cn-l20-4-itta-lo-variant:itt-a-lō",
                ],
                segmented: [
                    "cn-l20-4-itta:itt-ō",
                    "cn-l20-4-itta-lo-variant:itt-a-lō",
                ],
                targetPreserved: "itt-ō",
                doubledBoundaryAbsent: true,
                canonicalRecords: [true, true],
            },
            fixedCocoya: {
                solid: ["cn-l20-2-class-b-root-plus-ya-cocoya:coco-lō"],
                segmented: ["cn-l20-2-class-b-root-plus-ya-cocoya:coco-lō"],
                quantityChanged: ["cn-l20-2-class-b-root-plus-ya-deletion:cōco-lō"],
                quantityChangedDidNotUseExactRule: true,
            },
            productiveRootPlusYa: {
                solid: ["cn-l20-2-class-b-root-plus-ya-deletion:nequi-lō"],
                segmented: ["cn-l20-2-class-b-root-plus-ya-deletion:nequi-lō"],
                solidBoundaryObserved: false,
                segmentedBoundaryObserved: true,
                solidAnalysisAuthorized: true,
                boundaryAuthority: false,
            },
            crossLessonExampleAuthority: {
                solid: "",
                segmented: "",
                rule: "",
                section: "",
                quantityChangedHasSupplement: false,
                inventoryAuthority: [false, false],
            },
            genericBoundaryJoin: ["palat-ō"],
        }
    );

    s.eq(
        "Lesson 20 records come only from generated rule options and reject typed answers or artifact poison",
        (() => {
            const record = ctx.deriveClassicalNahuatlNonactiveStemRecord("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const artifactPoison = ctx.deriveClassicalNahuatlNonactiveStemRecord("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
                formulaArtifact: "#THIS-FORMULA-LIES#",
                surfaceArtifact: "THIS SURFACE LIES",
            });
            const typedAnswer = ctx.buildClassicalNahuatlNonactiveStemRecord("mayāna", {
                nonactiveStem: "mayāna-lō",
                suffixFamily: "lō",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const forgedOption = ctx.deriveClassicalNahuatlNonactiveStemRecord("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
                optionId: "hua:mayāna-lō",
            });
            return {
                status: record.authorizationStatus,
                kind: record.kind,
                source: record.sourceStem,
                target: record.nonactiveStem,
                family: record.suffixFamily,
                targetClass: record.targetClass,
                formulaAuthority: record.formulaArtifactAuthority,
                surfaceAuthority: record.surfaceArtifactAuthority,
                formulaPoisonSurvives: record.nonactiveStem.includes("LIES"),
                artifactPoisonStatus: artifactPoison.authorizationStatus,
                artifactPoisonReason: artifactPoison.blockReason,
                artifactPoisonCanonical:
                    ctx.isClassicalNahuatlNonactiveStemRecord(
                        artifactPoison,
                        "mayāna"
                    ),
                typedAnswerStatus: typedAnswer.authorizationStatus,
                typedAnswerReason: typedAnswer.blockReason,
                forgedOptionStatus: forgedOption.authorizationStatus,
                forgedOptionReason: forgedOption.blockReason,
            };
        })(),
        {
            status: "authorized",
            kind: "classical-nahuatl-nonactive-vnc-nonactive-stem-record",
            source: "mayāna",
            target: "mayāna-lō",
            family: "lō",
            targetClass: "A-2",
            formulaAuthority: false,
            surfaceAuthority: false,
            formulaPoisonSurvives: false,
            artifactPoisonStatus: "blocked",
            artifactPoisonReason: "nonactive-options-contain-hidden-accessor-or-unknown-authority",
            artifactPoisonCanonical: false,
            typedAnswerStatus: "blocked",
            typedAnswerReason: "nonactive-options-contain-hidden-accessor-or-unknown-authority",
            forgedOptionStatus: "blocked",
            forgedOptionReason: "lesson20-selected-option-was-not-generated",
        }
    );

    s.eq(
        "Lesson 20 attaches raw nonactive evidence after candidate formation and rejects hostile evidence without changing Andrews choices",
        (() => {
            const exact = ctx.getClassicalNahuatlNonactiveStemOptions("aqui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const segmented = ctx.getClassicalNahuatlNonactiveStemOptions("a-qui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const quantityMarked = ctx.getClassicalNahuatlNonactiveStemOptions("cāhua", {
                verbClass: "A",
                sourceValence: "specific-projective",
            });
            const quantityFree = ctx.getClassicalNahuatlNonactiveStemOptions("cahua", {
                verbClass: "A",
                sourceValence: "specific-projective",
            });
            const exactEvidence = exact.options.flatMap(option => option.lexicalEvidenceMatches || []);
            const segmentedEvidence = segmented.options.flatMap(option => option.lexicalEvidenceMatches || []);
            const quantityMarkedEvidence = quantityMarked.options.flatMap(option => option.lexicalEvidenceMatches || []);
            const quantityFreeEvidence = quantityFree.options.flatMap(option => option.lexicalEvidenceMatches || []);
            const exactSelected = exact.options.find(option => option.nonactiveStem === "ac-o-hua");
            const segmentedSelected = segmented.options.find(option => option.nonactiveStem === "a-c-o-hua");
            const exactRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord("aqui", {
                verbClass: "B",
                sourceValence: "intransitive",
                optionId: exactSelected.optionId,
            });
            const segmentedRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord("a-qui", {
                verbClass: "B",
                sourceValence: "intransitive",
                optionId: segmentedSelected.optionId,
            });
            const callerEvidencePoison = ctx.deriveClassicalNahuatlNonactiveStemRecord("aqui", {
                verbClass: "B",
                sourceValence: "intransitive",
                optionId: exactSelected.optionId,
                lexicalEvidenceMatches: [{ generationAuthority: true }],
                lexicalEvidenceSignature: "forged",
            });
            const forgedEvidence = {
                ...exactRecord,
                lexicalEvidenceMatches: exactRecord.lexicalEvidenceMatches.map((record, index) => index === 0
                    ? { ...record, grammarAuthority: true }
                    : record),
            };
            const forgedSignature = {
                ...exactRecord,
                lexicalEvidenceSignature: "karttunen-1992:v1:forged",
            };
            const removedEvidence = {
                ...exactRecord,
                lexicalEvidenceMatches: [],
            };
            return {
                exact: {
                    targets: exact.options.map(option => option.nonactiveStem),
                    selectorRequired: exact.selectorRequired,
                    recordId: exactEvidence[0]?.sourceRecordId || "",
                    citation: [exactEvidence[0]?.sourceOriginal || "", exactEvidence[0]?.targetOriginal || ""],
                    provenance: [exactEvidence[0]?.relationExtractionField || "", exactEvidence[0]?.provenanceDisplay || ""],
                    direction: exactEvidence[0]?.directionContract || "",
                    authority: [
                        exactEvidence[0]?.grammarAuthority,
                        exactEvidence[0]?.generationAuthority,
                        exactEvidence[0]?.targetConstructionAuthority,
                        exactEvidence[0]?.formulaAuthority,
                        exactEvidence[0]?.surfaceAuthority,
                    ],
                    recordEvidenceRecomputed: exactRecord.lexicalEvidenceSignature === exactSelected.lexicalEvidenceSignature
                        && exactRecord.lexicalEvidenceMatches[0]?.sourceRecordId === exactEvidence[0]?.sourceRecordId,
                    canonical: ctx.isClassicalNahuatlNonactiveStemRecord(exactRecord, "aqui"),
                },
                segmented: {
                    targets: segmented.options.map(option => option.nonactiveStem),
                    sameRule: segmented.options[0]?.ruleId === exact.options[0]?.ruleId,
                    sameEvidenceRecord: segmentedEvidence[0]?.sourceRecordId === exactEvidence[0]?.sourceRecordId,
                    canonical: ctx.isClassicalNahuatlNonactiveStemRecord(segmentedRecord, "a-qui"),
                },
                quantityPreserved: {
                    markedOptionCount: quantityMarked.options.length,
                    quantityFreeOptionCount: quantityFree.options.length,
                    sameRule: quantityMarked.options[0]?.ruleId === quantityFree.options[0]?.ruleId,
                    sameSelector: quantityMarked.selectorRequired === quantityFree.selectorRequired,
                    markedEvidence: quantityMarkedEvidence.map(record => record.sourceRecordId),
                    quantityFreeEvidenceCount: quantityFreeEvidence.length,
                },
                callerEvidencePoison: {
                    status: callerEvidencePoison.authorizationStatus,
                    reason: callerEvidencePoison.blockReason,
                    canonical: ctx.isClassicalNahuatlNonactiveStemRecord(callerEvidencePoison, "aqui"),
                },
                hostileCanonical: {
                    evidence: ctx.isClassicalNahuatlNonactiveStemRecord(forgedEvidence, "aqui"),
                    signature: ctx.isClassicalNahuatlNonactiveStemRecord(forgedSignature, "aqui"),
                    removed: ctx.isClassicalNahuatlNonactiveStemRecord(removedEvidence, "aqui"),
                },
            };
        })(),
        {
            exact: {
                targets: ["ac-o-hua"],
                selectorRequired: false,
                recordId: "karttunen-all:000009:n1",
                citation: ["AQU(I)", "ACOHUA"],
                provenance: ["Karttunen", "raw Karttunen column"],
                direction: "TARGET marker SOURCE; inventory stores SOURCE -> TARGET",
                authority: [false, false, false, false, false],
                recordEvidenceRecomputed: true,
                canonical: true,
            },
            segmented: {
                targets: ["a-c-o-hua"],
                sameRule: true,
                sameEvidenceRecord: true,
                canonical: true,
            },
            quantityPreserved: {
                markedOptionCount: 1,
                quantityFreeOptionCount: 1,
                sameRule: true,
                sameSelector: true,
                markedEvidence: ["karttunen-all:000186:n1"],
                quantityFreeEvidenceCount: 0,
            },
            callerEvidencePoison: {
                status: "blocked",
                reason: "nonactive-options-contain-hidden-accessor-or-unknown-authority",
                canonical: false,
            },
            hostileCanonical: {
                evidence: false,
                signature: false,
                removed: false,
            },
        }
    );

    s.eq(
        "Class C derived-passive records lengthen final i before lō without importing §26.23 prerequisite answers",
        (() => {
            const inventory = ctx.getClassicalNahuatlNonactiveStemOptions("chihua-l-tiā", {
                verbClass: "C",
                sourceValence: "specific-projective",
            });
            const record = ctx.deriveClassicalNahuatlNonactiveStemRecord("chihua-l-tiā", {
                verbClass: "C",
                sourceValence: "specific-projective",
                optionId: inventory.options[0]?.optionId,
            });
            const active = ctx.buildClassicalNahuatlVerbstemClassFrame("chihua-l-tiā", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "C",
                perfectiveClass: "C",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const passive = ctx.buildClassicalNahuatlDerivedVncFrame(active, {
                voice: "passive",
                nonactiveStemRecord: record,
                sourceValence: "specific-projective",
                sourceSubject: "3sg",
                sourceObjectPerson: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "C",
            });
            const nequi = ctx.getClassicalNahuatlNonactiveStemOptions("nequi", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            return {
                inventory: inventory.options.map(option => option.nonactiveStem),
                quantityClass: inventory.options[0]?.vowelLengthRuleFrame?.sourceLengthClass,
                record: [record.authorizationStatus, record.nonactiveStem],
                passive: [passive.authorizationStatus, passive.stem, passive.formulaRealization],
                staleShortFormAbsent: inventory.options.every(option => option.nonactiveStem !== "chihua-l-ti-lō"),
                nequi: nequi.options.map(option => option.nonactiveStem),
                nequiHasCrossLessonPrerequisite:
                    nequi.options.some(option => (
                        option.nonactiveStem === "nequi-lō"
                        || option.prerequisiteSourceRuleFrame
                        || option.prerequisiteProjection
                    )),
            };
        })(),
        {
            inventory: ["chihua-l-tī-lō"],
            quantityClass: "lengthen-final-i",
            record: ["authorized", "chihua-l-tī-lō"],
            passive: ["authorized", "chihua-l-tī-lō", "#0-0(chihua-l-tī-lo)0+0-0#"],
            staleShortFormAbsent: true,
            nequi: ["nec-ō"],
            nequiHasCrossLessonPrerequisite: false,
        }
    );

    s.eq(
        "Lesson 20 derives deterministic, irregular, and genuinely alternative formations from active analysis",
        (() => {
            const mayana = ctx.getClassicalNahuatlNonactiveStemOptions("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const ana = ctx.getClassicalNahuatlNonactiveStemOptions("āna", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const poloa = ctx.getClassicalNahuatlNonactiveStemOptions("pol-o-ā", {
                verbClass: "C",
                sourceValence: "projective-nonhuman",
            });
            const yauh = ctx.getClassicalNahuatlNonactiveStemOptions("ya-uh", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            return {
                mayana: mayana.options.map((option) => option.nonactiveStem),
                mayanaSelector: mayana.selectorRequired,
                ana: ana.options.map((option) => option.nonactiveStem),
                anaSelector: ana.selectorRequired,
                poloa: poloa.options.map((option) => option.nonactiveStem),
                yauh: yauh.options.map((option) => option.nonactiveStem),
                callerMayTypeDerivedStem: mayana.userSuppliedDerivedStemAllowed,
            };
        })(),
        {
            mayana: ["mayāna-lō"],
            mayanaSelector: false,
            ana: ["ān-ō", "āna-lō"],
            anaSelector: true,
            poloa: ["pol-ō-lō"],
            yauh: ["hui-lo-hua"],
            callerMayTypeDerivedStem: false,
        }
    );

    s.eq(
        "Lesson 20 derives shape options without defaulting alternatives and applies determinate exceptions automatically",
        (() => {
            const miqui = ctx.getClassicalNahuatlNonactiveStemOptions("miqui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const mahui = ctx.getClassicalNahuatlNonactiveStemOptions("mahui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const derivedMahui = ctx.deriveClassicalNahuatlNonactiveStemRecord("mahui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const rejectedMahuiCausativePrerequisite = ctx.deriveClassicalNahuatlNonactiveStemRecord("mahui", {
                verbClass: "B",
                sourceValence: "intransitive",
                optionId: "o-hua:mahu-o-hua",
            });
            const unlisted = ctx.getClassicalNahuatlNonactiveStemOptions("xochi", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const zo = ctx.getClassicalNahuatlNonactiveStemOptions("zō", {
                verbClass: "A",
                sourceValence: "mainline-reflexive",
            });
            const selectedZoVariant = ctx.deriveClassicalNahuatlNonactiveStemRecord("zō", {
                verbClass: "A",
                sourceValence: "mainline-reflexive",
                optionId: "lō:zō-lō",
            });
            const ahci = ctx.getClassicalNahuatlNonactiveStemOptions("ahci", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            return {
                miqui: miqui.options.map((option) => ({
                    stem: option.nonactiveStem,
                    family: option.suffixFamily,
                    authority: option.formationAuthority,
                    optional: option.optionalForUser,
                })),
                miquiSelector: miqui.selectorRequired,
                mahui: mahui.options.map((option) => ({
                    stem: option.nonactiveStem,
                    family: option.suffixFamily,
                    rule: option.ruleId,
                    authority: option.formationAuthority,
                    section: option.andrewsSection,
                    optional: option.optionalForUser,
                })),
                mahuiSelector: mahui.selectorRequired,
                mahuiSelectionRequired: mahui.selectionRequired,
                mahuiDefaultOptionId: mahui.defaultOptionId,
                mahuiSelectionPolicy: mahui.alternativeSelectionPolicy,
                derivedMahui: {
                    status: derivedMahui.authorizationStatus,
                    stem: derivedMahui.nonactiveStem,
                    reason: derivedMahui.blockReason,
                },
                rejectedMahuiCausativePrerequisite: {
                    status: rejectedMahuiCausativePrerequisite.authorizationStatus,
                    stem: rejectedMahuiCausativePrerequisite.nonactiveStem,
                    authority: rejectedMahuiCausativePrerequisite.selectedFormationAuthority,
                    optional: rejectedMahuiCausativePrerequisite.selectedOptionWasUserOptional,
                    reason: rejectedMahuiCausativePrerequisite.blockReason,
                },
                unlisted: unlisted.options.map((option) => option.nonactiveStem),
                unlistedRuleAuthority: unlisted.options[0]?.formationAuthority,
                zo: zo.options.map((option) => ({
                    stem: option.nonactiveStem,
                    role: option.optionRole,
                    authority: option.formationAuthority,
                    optional: option.optionalForUser,
                })),
                zoSelector: zo.selectorRequired,
                selectedZoVariant: {
                    status: selectedZoVariant.authorizationStatus,
                    stem: selectedZoVariant.nonactiveStem,
                    authority: selectedZoVariant.selectedFormationAuthority,
                    optional: selectedZoVariant.selectedOptionWasUserOptional,
                },
                ahci: ahci.options.map((option) => ({
                    stem: option.nonactiveStem,
                    authority: option.formationAuthority,
                    optional: option.optionalForUser,
                })),
                ahciSelector: ahci.selectorRequired,
                exceptionPolicy: ahci.exceptionSelectionPolicy,
            };
        })(),
        {
            miqui: [
                { stem: "mic-o-hua", family: "o-hua", authority: "productive-rule", optional: false },
            ],
            miquiSelector: false,
            mahui: [
                {
                    stem: "mahuī-hua",
                    family: "hua",
                    rule: "cn-l20-6-final-i-o",
                    authority: "productive-rule",
                    section: "20",
                    optional: true,
                },
                {
                    stem: "mahui-hua-lō",
                    family: "hua-lō",
                    rule: "cn-l20-7-final-i-o-hua-lo-possibility",
                    authority: "shape-licensed-possibility",
                    section: "20",
                    optional: true,
                },
                {
                    stem: "ma-ō-hua",
                    family: "o-hua",
                    rule: "cn-l20-5-mahui",
                    authority: "productive-lexical-class-rule",
                    section: "20",
                    optional: true,
                },
            ],
            mahuiSelector: true,
            mahuiSelectionRequired: true,
            mahuiDefaultOptionId: "",
            mahuiSelectionPolicy: "explicit-user-choice-required-no-default",
            derivedMahui: {
                status: "blocked",
                stem: "",
                reason: "lesson20-nonactive-option-selection-required",
            },
            rejectedMahuiCausativePrerequisite: {
                status: "blocked",
                stem: "",
                authority: "",
                optional: false,
                reason: "lesson20-selected-option-was-not-generated",
            },
            unlisted: ["xochī-hua", "xochi-hua-lō"],
            unlistedRuleAuthority: "productive-rule",
            zo: [
                { stem: "zō-hua", role: "user-choice", authority: "productive-rule", optional: true },
                { stem: "zō-lō", role: "user-choice", authority: "optional-variant", optional: true },
            ],
            zoSelector: true,
            selectedZoVariant: {
                status: "authorized",
                stem: "zō-lō",
                authority: "optional-variant",
                optional: true,
            },
            ahci: [{ stem: "ahxī-hua", authority: "obligatory-exception", optional: false }],
            ahciSelector: false,
            exceptionPolicy: "only-owner-issued-lesson20-lexical-alternatives-are-user-selectable",
        }
    );

    const voiceAvailabilityRuntimeLoaded = typeof ctx.getClassicalNahuatlVncApplicationAllowedVoices === "function"
        && typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function";
    s.eq(
        "Voice availability follows the completed active analysis without a stem whitelist and normalizes incompatible requests",
        voiceAvailabilityRuntimeLoaded ? (() => {
            const mayanaInventory = ctx.getClassicalNahuatlNonactiveStemOptions("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const yohuaInventory = ctx.getClassicalNahuatlNonactiveStemOptions("yohua", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            const anaInventory = ctx.getClassicalNahuatlNonactiveStemOptions("āna", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const unsupportedInventory = ctx.getClassicalNahuatlNonactiveStemOptions("xyz", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const normalizedSurface = ctx.buildClassicalRuleLogicSurfaceFrame({
                basalUnit: "vnc",
                stem: "mayāna",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                valence: "intransitive",
                vncVoice: "passive",
                vncOutputScope: "single",
            });
            return {
                noStem: ctx.getClassicalNahuatlVncApplicationAllowedVoices({
                    sourceStem: "",
                    sourceValence: "intransitive",
                    nonactiveOptionInventory: mayanaInventory,
                }),
                intransitive: ctx.getClassicalNahuatlVncApplicationAllowedVoices({
                    sourceStem: "yohua",
                    sourceValence: "intransitive",
                    nonactiveOptionInventory: yohuaInventory,
                }),
                specific: ctx.getClassicalNahuatlVncApplicationAllowedVoices({
                    sourceStem: "āna",
                    sourceValence: "specific-projective",
                    nonactiveOptionInventory: anaInventory,
                }),
                unsupported: ctx.getClassicalNahuatlVncApplicationAllowedVoices({
                    sourceStem: "xyz",
                    sourceValence: "intransitive",
                    nonactiveOptionInventory: unsupportedInventory,
                }),
                normalizedRequestedVoice: normalizedSurface.state?.vncVoice,
                normalizedStatus: normalizedSurface.authorizationStatus,
            };
        })() : {
            runtimeStatus: "not-loaded-in-core-harness",
            staticWiring: vncApplication.includes("function getClassicalNahuatlVncApplicationAllowedVoices({")
                && vncApplication.includes('"source-stem-required-before-derived-voice"'),
        },
        voiceAvailabilityRuntimeLoaded ? {
            noStem: ["active"],
            intransitive: ["impersonal", "inherent-impersonal", "tla-impersonal"],
            specific: ["active", "passive"],
            unsupported: ["active", "inherent-impersonal", "tla-impersonal"],
            normalizedRequestedVoice: "active",
            normalizedStatus: "blocked",
        } : {
            runtimeStatus: "not-loaded-in-core-harness",
            staticWiring: true,
        }
    );

    const buildActive = ({
        stem = "mayāna",
        subject = "3pl",
        valence = "intransitive",
        objectPerson = "2sg",
        verbClass = "B",
    } = {}) => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence,
        transitivity: valence === "intransitive" ? "intransitive" : "transitive",
        objectKind: valence,
        objectPerson,
    });

    s.eq(
        "Lesson 20 and Appendix A select A-1/A-2 boundary behavior and the correct aspect stem",
        (() => {
            const buildPassive = ({
                stem,
                verbClass = "B",
                objectPerson = "1sg",
                mood = "indicative",
                tense = "present",
                nonactiveOptionId = "",
            }) => {
                const active = ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
                    subject: "3sg",
                    mood,
                    tense,
                    verbClass,
                    perfectiveClass: verbClass,
                    valence: "specific-projective",
                    transitivity: "transitive",
                    objectKind: "specific-projective",
                    objectPerson,
                });
                const nonactive = ctx.deriveClassicalNahuatlNonactiveStemRecord(stem, {
                    verbClass,
                    sourceValence: "specific-projective",
                    optionId: nonactiveOptionId,
                });
                return ctx.buildClassicalNahuatlDerivedVncFrame(active, {
                    voice: "passive",
                    nonactiveStemRecord: nonactive,
                    sourceValence: "specific-projective",
                    sourceSubject: "3sg",
                    sourceObjectPerson: objectPerson,
                    mood,
                    tense,
                    verbClass,
                });
            };
            const ihcaliPresent = buildPassive({
                stem: "ihcali",
                nonactiveOptionId: "hua:ihcalī-hua",
            });
            const pohuaPresent = buildPassive({ stem: "pōhu-a" });
            const pohuaFuture = buildPassive({ stem: "pōhu-a", tense: "future" });
            const pohuaPreterit = buildPassive({ stem: "pōhu-a", tense: "preterit" });
            const anaPresent = buildPassive({ stem: "āna", nonactiveOptionId: "ō:ān-ō" });
            const anaFuture = buildPassive({
                stem: "āna",
                tense: "future",
                nonactiveOptionId: "ō:ān-ō",
            });
            const ayiPreterit = buildPassive({
                stem: "āyi",
                objectPerson: "3sg",
                tense: "preterit",
                nonactiveOptionId: "hua:āyī-hua",
            });
            const chihuaPreterit = buildPassive({ stem: "chihua", tense: "preterit" });
            return {
                ihcaliPresent: [ihcaliPresent.nonactiveTargetClass, ihcaliPresent.selectedNonactiveAspect, ihcaliPresent.formulaRealization],
                pohuaPresent: [pohuaPresent.nonactiveTargetClass, pohuaPresent.formulaRealization],
                pohuaFuture: [pohuaFuture.nonactiveTargetClass, pohuaFuture.formulaRealization],
                pohuaPreterit: [pohuaPreterit.selectedNonactiveAspect, pohuaPreterit.formulaRealization],
                anaPresent: [anaPresent.nonactiveTargetClass, anaPresent.formulaRealization],
                anaFuture: [anaFuture.nonactiveTargetClass, anaFuture.formulaRealization],
                ayiPreterit: [ayiPreterit.stem, ayiPreterit.selectedNonactiveAspect, ayiPreterit.formulaRealization],
                chihuaPreterit: [chihuaPreterit.stem, chihuaPreterit.selectedNonactiveAspect, chihuaPreterit.formulaRealization],
            };
        })(),
        {
            ihcaliPresent: ["A-1", "imperfective", "#n-0(ihcalī-hua)0+0-0#"],
            pohuaPresent: ["A-2", "#ni-0(pōhu-a-lo)0+0-0#"],
            pohuaFuture: ["A-2", "#ni-0(pōhu-a-lō)z+⎕-0#"],
            pohuaPreterit: ["perfective", "#ni-0(pōhu-a-lō)0+c-0#"],
            anaPresent: ["A-2", "#n-0(ān-o)0+0-0#"],
            anaFuture: ["A-2", "#n-0(ān-ō)z+⎕-0#"],
            ayiPreterit: ["āyī-hua", "perfective", "#0-0(āyī-hua)0+c-0#"],
            chihuaPreterit: ["chīhua-lō", "perfective", "#ni-0(chīhua-lō)0+c-0#"],
        }
    );

    s.eq(
        "Lesson 21 passive consumes a typed active VNC and promotes its one specific object",
        (() => {
            const active = buildActive({
                stem: "chihua",
                subject: "2pl",
                valence: "specific-projective",
                objectPerson: "1sg",
                verbClass: "A",
            });
            const nonactive = ctx.deriveClassicalNahuatlNonactiveStemRecord("chihua", {
                verbClass: "A",
                sourceValence: "specific-projective",
            });
            const passive = ctx.buildClassicalNahuatlDerivedVncFrame(active, {
                voice: "passive",
                nonactiveStemRecord: nonactive,
                sourceValence: "specific-projective",
                sourceSubject: "2pl",
                sourceObjectPerson: "1sg",
                mood: "indicative",
                tense: "present",
            });
            const voiceFrame = passive.voiceTransformationFrame || {};
            return {
                sourceStatus: active.proofFrame.authorizationStatus,
                status: passive.proofFrame.authorizationStatus,
                voice: passive.voice,
                sourceStem: voiceFrame.sourceStem,
                targetStem: voiceFrame.targetStem,
                sourceSubject: voiceFrame.sourceSubject,
                sourceSubjectDeleted: voiceFrame.sourceSubjectDeleted,
                sourceValence: voiceFrame.sourceValence,
                targetValence: voiceFrame.targetValence,
                targetSubject: voiceFrame.targetSubject,
                promoted: voiceFrame.promotedObjectBecomesSubject,
                agentExpressible: voiceFrame.agentExpressible,
                formula: passive.formulaRealization,
                formulaHasActiveSubject: passive.formulaRealization.includes("an-0"),
                formulaHasObjectDyad: /\+(?:n-ēch|n-ech)/u.test(passive.formulaRealization),
            };
        })(),
        {
            sourceStatus: "authorized",
            status: "authorized",
            voice: "passive",
            sourceStem: "chihua",
            targetStem: "chihua-lō",
            sourceSubject: "2pl",
            sourceSubjectDeleted: true,
            sourceValence: "specific-projective",
            targetValence: "intransitive",
            targetSubject: "1sg",
            promoted: true,
            agentExpressible: false,
            formula: "#ni-0(chihua-lo)0+0-0#",
            formulaHasActiveSubject: false,
            formulaHasObjectDyad: false,
        }
    );

    s.eq(
        "Lesson 22 imports an empty third-singular subject and Lesson 38 derives the human-projective passive path",
        (() => {
            const nonactive = ctx.deriveClassicalNahuatlNonactiveStemRecord("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const intransitive = ctx.buildClassicalNahuatlDerivedVncFrame(buildActive(), {
                voice: "impersonal",
                nonactiveStemRecord: nonactive,
                sourceValence: "intransitive",
                sourceSubject: "3pl",
                mood: "indicative",
                tense: "present",
            });
            const nonspecific = ctx.buildClassicalNahuatlDerivedVncFrame(buildActive({
                valence: "projective-human",
            }), {
                voice: "impersonal",
                nonactiveStemRecord: nonactive,
                sourceValence: "projective-human",
                sourceSubject: "3pl",
                mood: "indicative",
                tense: "present",
            });
            return {
                intransitiveStatus: intransitive.proofFrame.authorizationStatus,
                intransitiveSubject: intransitive.voiceTransformationFrame?.targetSubject,
                impersonalReferent: intransitive.voiceTransformationFrame?.impersonalSubjectReferent,
                subjectImported: intransitive.voiceTransformationFrame?.impersonalSubjectImportedFromOutsideSource,
                sourceSubjectDeleted: intransitive.voiceTransformationFrame?.sourceSubjectDeleted,
                intransitiveFormula: intransitive.formulaRealization,
                nonspecificStatus: nonspecific.proofFrame.authorizationStatus,
                nonspecificTargetValence: nonspecific.voiceTransformationFrame?.targetValence,
                nonspecificFormula: nonspecific.formulaRealization,
                nonspecificObjectPreserved: /\+tē\(/u.test(nonspecific.formulaRealization),
            };
        })(),
        {
            intransitiveStatus: "authorized",
            intransitiveSubject: "3sg",
            impersonalReferent: "none",
            subjectImported: true,
            sourceSubjectDeleted: true,
            intransitiveFormula: "#0-0(mayāna-lo)0+0-0#",
            nonspecificStatus: "authorized",
            nonspecificTargetValence: "intransitive",
            nonspecificFormula: "#0-0(tla-mayāna-lo)0+0-0#",
            nonspecificObjectPreserved: false,
        }
    );

    s.eq(
        "Lessons 21 and 22 fail closed on each other's source gates and on a string-only nonactive claim",
        (() => {
            const record = ctx.deriveClassicalNahuatlNonactiveStemRecord("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const passiveIntransitive = ctx.buildClassicalNahuatlDerivedVncFrame(buildActive(), {
                voice: "passive",
                nonactiveStemRecord: record,
                sourceValence: "intransitive",
                sourceSubject: "3pl",
            });
            const impersonalSpecific = ctx.buildClassicalNahuatlDerivedVncFrame(buildActive({
                valence: "specific-projective",
            }), {
                voice: "impersonal",
                nonactiveStemRecord: record,
                sourceValence: "specific-projective",
                sourceSubject: "3pl",
                sourceObjectPerson: "2sg",
            });
            const fakeRecord = {
                kind: "classical-nahuatl-nonactive-vnc-nonactive-stem-record",
                authorizationStatus: "authorized",
                sourceStem: "mayāna",
                nonactiveStem: "FORMULA-LIE",
                selectionAuthority: "string-only",
                formulaArtifactAuthority: true,
                surfaceArtifactAuthority: true,
            };
            const stringOnly = ctx.buildClassicalNahuatlDerivedVncFrame(buildActive(), {
                voice: "impersonal",
                nonactiveStemRecord: fakeRecord,
                sourceValence: "intransitive",
                sourceSubject: "3pl",
            });
            return {
                passiveStatus: passiveIntransitive.proofFrame.authorizationStatus,
                passiveReason: passiveIntransitive.blockReason,
                impersonalStatus: impersonalSpecific.proofFrame.authorizationStatus,
                impersonalReason: impersonalSpecific.blockReason,
                stringOnlyStatus: stringOnly.proofFrame.authorizationStatus,
                stringOnlyReason: stringOnly.blockReason,
                stringLieSurvives: String(stringOnly.formulaRealization || "").includes("LIE"),
            };
        })(),
        {
            passiveStatus: "blocked",
            passiveReason: "passive-requires-specific-or-reflexive-object",
            impersonalStatus: "blocked",
            impersonalReason: "impersonal-blocks-specific-projective-source",
            stringOnlyStatus: "blocked",
            stringOnlyReason: "lesson20-authorized-typed-nonactive-stem-record-required",
            stringLieSurvives: false,
        }
    );

    s.eq(
        "Reflexive sources retain typed ne while passive and impersonal choose different subjects",
        (() => {
            const active = buildActive({
                stem: "zahua",
                subject: "1sg",
                valence: "mainline-reflexive",
                verbClass: "A",
            });
            const nonactive = ctx.deriveClassicalNahuatlNonactiveStemRecord("zahua", {
                verbClass: "A",
                sourceValence: "mainline-reflexive",
            });
            const passive = ctx.buildClassicalNahuatlDerivedVncFrame(active, {
                voice: "passive",
                nonactiveStemRecord: nonactive,
                sourceValence: "mainline-reflexive",
                sourceSubject: "1sg",
            });
            const impersonal = ctx.buildClassicalNahuatlDerivedVncFrame(active, {
                voice: "impersonal",
                nonactiveStemRecord: nonactive,
                sourceValence: "mainline-reflexive",
                sourceSubject: "1sg",
            });
            return {
                passiveStatus: passive.authorizationStatus,
                passiveSubject: passive.subject,
                passiveValence: passive.valence,
                passiveFormula: passive.formulaRealization,
                impersonalStatus: impersonal.authorizationStatus,
                impersonalSubject: impersonal.subject,
                impersonalValence: impersonal.valence,
                impersonalFormula: impersonal.formulaRealization,
            };
        })(),
        {
            passiveStatus: "authorized",
            passiveSubject: "1sg",
            passiveValence: "shuntline-reflexive",
            passiveFormula: "#ni-0+ne(zahua-lo)0+0-0#",
            impersonalStatus: "authorized",
            impersonalSubject: "3sg",
            impersonalValence: "shuntline-reflexive",
            impersonalFormula: "#0-0+ne(zahua-lo)0+0-0#",
        }
    );

    s.eq(
        "Every Lesson 22.1 and 22.6 lexical source span rebuilds its engine-owned analysis and target",
        (() => {
            const inherentSources = [
                "tōna",
                "quiy-a-hui",
                "te-c-i-hui",
                "āy-a-hui",
                "yohua",
            ];
            const tlaSources = [
                ["huā-qui", "tla-huā-qui"],
                ["pol-i-hui", "tla-pol-i-hui"],
                ["cel-i-ya", "tla-cel-i-ya"],
                ["ihyā-ya", "tla-ihyā-ya"],
                ["cah-ca-h", "tla-cah-ca-h"],
                ["on-o", "tla-on-o"],
                ["chic-ā-hua", "tla-chic-ā-hua"],
                ["huē-i-ya", "tla-huē-i-ya"],
                ["it-hui", "tla-t-hui"],
                ["petl-ā-ni", "tla-petl-ā-ni"],
                ["tlatz-i-ni", "tla-tlatz-ī-ni"],
                ["poy-ā-hua", "tla-poy-ā-hua"],
                ["nēci", "tla-nēci"],
                ["ce-ce-ya", "tla-ce-ce-ya"],
                ["yohua", "tla-yohua"],
                ["ih-cahu-a-ca", "tla-h-cahu-a-ca"],
                ["cue-cuech-ca", "tla-cue-cuech-ca"],
                ["izta-ya", "tla-zta-ya"],
            ];
            const inherent = inherentSources.map(sourceStem => {
                const analysis = ctx.getClassicalNahuatlInherentImpersonalSourceAnalysis(sourceStem);
                const record = ctx.buildClassicalNahuatlInherentImpersonalRecord(sourceStem, {
                    selectionAuthority: "andrews-lesson22-voice-selection",
                });
                return {
                    sourceStem,
                    status: analysis.authorizationStatus,
                    recordStatus: record.authorizationStatus,
                    typed: ctx.isClassicalNahuatlInherentImpersonalRecord(record, sourceStem),
                    span: `${analysis.transcriptionLineStart}-${analysis.transcriptionLineEnd}`,
                };
            });
            const tla = tlaSources.map(([sourceStem, expected]) => {
                const analysis = ctx.getClassicalNahuatlTlaImpersonalSourceAnalysis(sourceStem);
                const record = ctx.buildClassicalNahuatlTlaImpersonalStemRecord(sourceStem, {
                    selectionAuthority: "andrews-lesson22-rule-derivation",
                });
                return {
                    sourceStem,
                    expected,
                    actual: record.impersonalStem,
                    status: analysis.authorizationStatus,
                    recordStatus: record.authorizationStatus,
                    typed: ctx.isClassicalNahuatlTlaImpersonalStemRecord(record, sourceStem),
                    engineOwned: analysis.targetDerivedByEngine,
                    mechanicallyDerived:
                        ctx.deriveClassicalNahuatlTlaImpersonalTargetStem(
                            analysis.canonicalSourceStem,
                            analysis.realizationRuleId
                        ),
                    realizationRuleId: analysis.realizationRuleId,
                    span: `${analysis.transcriptionLineStart}-${analysis.transcriptionLineEnd}`,
                };
            });
            const arbitraryInherent = ctx.buildClassicalNahuatlInherentImpersonalRecord("xele", {
                selectionAuthority: "andrews-lesson22-voice-selection",
            });
            const arbitraryTla = ctx.buildClassicalNahuatlTlaImpersonalStemRecord("xele", {
                selectionAuthority: "andrews-lesson22-rule-derivation",
            });
            return {
                inherentCount: inherent.length,
                inherentAuthorized: inherent.every(item => item.status === "authorized" && item.recordStatus === "authorized" && item.typed && item.span !== "0-0"),
                tlaCount: tla.length,
                tlaAuthorized: tla.every(item => item.status === "authorized"
                    && item.recordStatus === "authorized"
                    && item.typed
                    && item.engineOwned
                    && item.actual === item.expected
                    && item.mechanicallyDerived === item.expected
                    && item.realizationRuleId
                    && item.span !== "0-0"),
                arbitraryInherent: [
                    arbitraryInherent.authorizationStatus,
                    arbitraryInherent.blockReason,
                    arbitraryInherent.sourceAnalysis.canvasExampleMatch,
                ],
                arbitraryTla: [
                    arbitraryTla.authorizationStatus,
                    arbitraryTla.blockReason,
                    arbitraryTla.impersonalStem,
                    arbitraryTla.sourceAnalysis.canvasExampleMatch,
                ],
            };
        })(),
        {
            inherentCount: 5,
            inherentAuthorized: true,
            tlaCount: 18,
            tlaAuthorized: true,
            arbitraryInherent: ["authorized", "", false],
            arbitraryTla: ["authorized", "", "tla-xele", false],
        }
    );

    s.eq(
        "Lesson 22 distinguishes inherent and exact tla-impersonal lexical routes",
        (() => {
            const inherentSource = buildActive({ stem: "yohua", subject: "1sg", valence: "intransitive", verbClass: "A" });
            const inherentRecord = ctx.buildClassicalNahuatlInherentImpersonalRecord("yohua", {
                selectionAuthority: "andrews-lesson22-voice-selection",
                formulaArtifact: "#LIE#",
            });
            const inherent = ctx.buildClassicalNahuatlDerivedVncFrame(inherentSource, {
                voice: "inherent-impersonal",
                inherentImpersonalRecord: inherentRecord,
                sourceValence: "intransitive",
                sourceSubject: "1sg",
                verbClass: "A",
            });
            const tlaSource = buildActive({ stem: "nēci", subject: "2pl", valence: "intransitive", verbClass: "B" });
            const tlaRecord = ctx.buildClassicalNahuatlTlaImpersonalStemRecord("nēci", {
                selectionAuthority: "andrews-lesson22-rule-derivation",
                surfaceArtifact: "LIE",
            });
            const tla = ctx.buildClassicalNahuatlDerivedVncFrame(tlaSource, {
                voice: "tla-impersonal",
                tlaImpersonalStemRecord: tlaRecord,
                sourceValence: "intransitive",
                sourceSubject: "2pl",
                verbClass: "B",
            });
            const fakeTla = ctx.buildClassicalNahuatlTlaImpersonalStemRecord("nēci", {
                impersonalStem: "tla-nēci",
                selectionAuthority: "andrews-lesson22-rule-derivation",
            });
            return {
                inherentRecordStatus: inherentRecord.authorizationStatus,
                inherentStatus: inherent.authorizationStatus,
                inherentSubject: inherent.subject,
                inherentStem: inherent.stem,
                inherentFormula: inherent.formulaRealization,
                tlaRecordStatus: tlaRecord.authorizationStatus,
                tlaStatus: tla.authorizationStatus,
                tlaSubject: tla.subject,
                tlaStem: tla.stem,
                tlaFormula: tla.formulaRealization,
                fakeTlaStatus: fakeTla.authorizationStatus,
                fakeTlaReason: fakeTla.blockReason,
                stringPoisonSurvives: `${inherent.formulaRealization}${tla.formulaRealization}`.includes("LIE"),
            };
        })(),
        {
            inherentRecordStatus: "authorized",
            inherentStatus: "authorized",
            inherentSubject: "3sg",
            inherentStem: "yohua",
            inherentFormula: "#0-0(yohua)0+0-0#",
            tlaRecordStatus: "authorized",
            tlaStatus: "authorized",
            tlaSubject: "3sg",
            tlaStem: "tla-nēci",
            tlaFormula: "#0-0(tla-nēci)0+0-0#",
            fakeTlaStatus: "blocked",
            fakeTlaReason: "lesson22-tla-impersonal-caller-supplied-target-not-authorized",
            stringPoisonSurvives: false,
        }
    );

    s.eq(
        "Lessons 20-22 corrected stems and carriers are pointwise-equivalent through scalar and prepared paradigm paths",
        (() => {
            const requests = [
                {
                    caseId: "chihua-present-passive",
                    sourceStem: "chihua",
                    verbClass: "A",
                    sourceValence: "specific-projective",
                    subject: "3sg",
                    objectPerson: "1sg",
                    requestedVoice: "passive",
                    expectedFormula: "#ni-0(chihua-lo)0+0-0#",
                    outputScope: "paradigm",
                },
                {
                    caseId: "chihua-preterit-passive",
                    sourceStem: "chihua",
                    verbClass: "A",
                    sourceValence: "specific-projective",
                    subject: "3sg",
                    objectPerson: "1sg",
                    requestedVoice: "passive",
                    tense: "preterit",
                    expectedFormula: "#ni-0(chīhua-lō)0+c-0#",
                    outputScope: "paradigm",
                },
                {
                    caseId: "itta-present-passive-lo",
                    sourceStem: "itt-a",
                    verbClass: "A",
                    sourceValence: "specific-projective",
                    subject: "3sg",
                    objectPerson: "1sg",
                    requestedVoice: "passive",
                    nonactiveOptionId: "lō:itt-a-lō",
                    expectedFormula: "#n-0(itt-a-lo)0+0-0#",
                    outputScope: "paradigm",
                },
                {
                    caseId: "neci-present-impersonal",
                    sourceStem: "nēci",
                    verbClass: "B",
                    sourceValence: "intransitive",
                    subject: "2pl",
                    requestedVoice: "impersonal",
                    nonactiveOptionId: "o-hua:nex-o-hua",
                    expectedFormula: "#0-0(nex-o-hua)0+0-0#",
                    outputScope: "paradigm",
                },
                {
                    caseId: "teohcihui-present-impersonal",
                    sourceStem: "teo-hci-hui",
                    verbClass: "B",
                    sourceValence: "intransitive",
                    subject: "2pl",
                    requestedVoice: "impersonal",
                    expectedFormula: "#0-0(teo-hci-ō-hua)0+0-0#",
                    outputScope: "paradigm",
                },
                {
                    caseId: "ciyahui-present-impersonal",
                    sourceStem: "ciya-hui",
                    verbClass: "B",
                    sourceValence: "intransitive",
                    subject: "2pl",
                    requestedVoice: "impersonal",
                    expectedFormula: "#0-0(ciya-ō-hua)0+0-0#",
                    outputScope: "paradigm",
                },
                {
                    caseId: "temi-present-impersonal",
                    sourceStem: "tēmi",
                    verbClass: "B",
                    sourceValence: "intransitive",
                    subject: "2pl",
                    requestedVoice: "impersonal",
                    expectedFormula: "#0-0(tēmi-hua)0+0-0#",
                    outputScope: "paradigm",
                },
                {
                    caseId: "yauh-present-impersonal",
                    sourceStem: "ya-uh",
                    verbClass: "A",
                    sourceValence: "intransitive",
                    subject: "2pl",
                    requestedVoice: "impersonal",
                    expectedFormula: "#0-0(hui-lō-hua)0+0-0#",
                    outputScope: "paradigm",
                },
                {
                    caseId: "ana-future-active-nech",
                    sourceStem: "āna",
                    verbClass: "A",
                    sourceValence: "specific-projective",
                    subject: "2pl",
                    objectPerson: "1sg",
                    requestedVoice: "active",
                    tense: "future",
                    expectedFormula: "#an-0+n-ēch(āna)z+qu-eh#",
                    outputScope: "paradigm",
                },
                {
                    caseId: "tlazohtla-present-impersonal-te",
                    sourceStem: "tla-zo-h-tla",
                    verbClass: "A",
                    sourceValence: "projective-human",
                    subject: "3pl",
                    requestedVoice: "impersonal",
                    nonactiveOptionId: "lō:tla-zo-h-tla-lō",
                    expectedFormula: "#0-0(tla-tla-zo-h-tla-lo)0+0-0#",
                    outputScope: "paradigm",
                },
            ];
            return requests.map(request => {
                const {
                    caseId,
                    expectedFormula,
                    tense = "present",
                    ...applicationRequest
                } = request;
                const coordinates = [
                    {
                        subject: request.subject,
                        mood: "indicative",
                        tense,
                    },
                ];
                const plan = ctx.prepareClassicalNahuatlVncParadigmPlan(applicationRequest);
                const projected = ctx.projectClassicalNahuatlVncParadigmCoordinates(
                    plan,
                    coordinates
                );
                const scalar = coordinates.map(coordinate =>
                    ctx.evaluateClassicalNahuatlVncApplication({
                        sourceStem: plan.targetStem,
                        verbClass: plan.targetClass,
                        sourceValence: plan.targetValence,
                        sourceObjectRequests: plan.targetObjectRequests,
                        ...coordinate,
                        requestedDerivation: "direct",
                        requestedVoice:
                            plan.selectedVoiceOperation === "inherent-impersonal"
                            || plan.selectedVoiceOperation === "tla-impersonal"
                                ? "impersonal"
                                : plan.selectedVoiceOperation,
                        nonactiveOptionId: plan.selectedNonactiveOptionId,
                        outputScope: "single",
                    })
                );
                return {
                    caseId,
                    planStatus: plan.authorizationStatus,
                    planCanonical: ctx.isClassicalNahuatlVncParadigmPlan(plan),
                    rowCount: projected.length,
                    rowsCanonical: projected.every(row =>
                        ctx.isClassicalNahuatlVncParadigmCoordinateFrame(row)
                    ),
                    rowsAuthorized: projected.every(
                        row => row.authorizationStatus === "authorized"
                    ),
                    pointwiseEquivalent: projected.every((row, index) =>
                        row.authorizationStatus === scalar[index].authorizationStatus
                        && row.formulaRealization
                            === scalar[index].resultFrame?.formulaRealization
                    ),
                    exactFormula: projected[0]?.formulaRealization === expectedFormula
                        && scalar[0]?.resultFrame?.formulaRealization === expectedFormula,
                    auditMetadataAbsent:
                        !Object.hasOwn(plan, "lessons20To22ClosureFrame")
                        && projected.every(row =>
                            !Object.hasOwn(row, "lessons20To22ClosureFrame")
                            && !Object.hasOwn(row, "claimSignature")
                            && !Object.hasOwn(row, "dispositionCounts")
                            && !Object.hasOwn(row, "sourceLineStart")
                        )
                        && scalar.every(frame =>
                            !Object.hasOwn(
                                frame.controlFrame || {},
                                "lessons20To22ClosureFrame"
                            )
                            && !Object.hasOwn(frame.resultFrame || {}, "claimSignature")
                            && !Object.hasOwn(frame.resultFrame || {}, "dispositionCounts")
                            && !Object.hasOwn(frame.resultFrame || {}, "sourceLineStart")
                        ),
                    stringAuthority: projected.every(row =>
                        row.formulaStringAuthority === false
                        && row.surfaceStringAuthority === false
                    ),
                };
            });
        })(),
        [
            {
                caseId: "chihua-present-passive",
                planStatus: "authorized",
                planCanonical: true,
                rowCount: 1,
                rowsCanonical: true,
                rowsAuthorized: true,
                pointwiseEquivalent: true,
                exactFormula: true,
                auditMetadataAbsent: true,
                stringAuthority: true,
            },
            {
                caseId: "chihua-preterit-passive",
                planStatus: "authorized",
                planCanonical: true,
                rowCount: 1,
                rowsCanonical: true,
                rowsAuthorized: true,
                pointwiseEquivalent: true,
                exactFormula: true,
                auditMetadataAbsent: true,
                stringAuthority: true,
            },
            {
                caseId: "itta-present-passive-lo",
                planStatus: "authorized",
                planCanonical: true,
                rowCount: 1,
                rowsCanonical: true,
                rowsAuthorized: true,
                pointwiseEquivalent: true,
                exactFormula: true,
                auditMetadataAbsent: true,
                stringAuthority: true,
            },
            {
                caseId: "neci-present-impersonal",
                planStatus: "authorized",
                planCanonical: true,
                rowCount: 1,
                rowsCanonical: true,
                rowsAuthorized: true,
                pointwiseEquivalent: true,
                exactFormula: true,
                auditMetadataAbsent: true,
                stringAuthority: true,
            },
            {
                caseId: "teohcihui-present-impersonal",
                planStatus: "authorized",
                planCanonical: true,
                rowCount: 1,
                rowsCanonical: true,
                rowsAuthorized: true,
                pointwiseEquivalent: true,
                exactFormula: true,
                auditMetadataAbsent: true,
                stringAuthority: true,
            },
            {
                caseId: "ciyahui-present-impersonal",
                planStatus: "authorized",
                planCanonical: true,
                rowCount: 1,
                rowsCanonical: true,
                rowsAuthorized: true,
                pointwiseEquivalent: true,
                exactFormula: true,
                auditMetadataAbsent: true,
                stringAuthority: true,
            },
            {
                caseId: "temi-present-impersonal",
                planStatus: "authorized",
                planCanonical: true,
                rowCount: 1,
                rowsCanonical: true,
                rowsAuthorized: true,
                pointwiseEquivalent: true,
                exactFormula: true,
                auditMetadataAbsent: true,
                stringAuthority: true,
            },
            {
                caseId: "yauh-present-impersonal",
                planStatus: "authorized",
                planCanonical: true,
                rowCount: 1,
                rowsCanonical: true,
                rowsAuthorized: true,
                pointwiseEquivalent: true,
                exactFormula: true,
                auditMetadataAbsent: true,
                stringAuthority: true,
            },
            {
                caseId: "ana-future-active-nech",
                planStatus: "authorized",
                planCanonical: true,
                rowCount: 1,
                rowsCanonical: true,
                rowsAuthorized: true,
                pointwiseEquivalent: true,
                exactFormula: true,
                auditMetadataAbsent: true,
                stringAuthority: true,
            },
            {
                caseId: "tlazohtla-present-impersonal-te",
                planStatus: "authorized",
                planCanonical: true,
                rowCount: 1,
                rowsCanonical: true,
                rowsAuthorized: true,
                pointwiseEquivalent: true,
                exactFormula: true,
                auditMetadataAbsent: true,
                stringAuthority: true,
            },
        ]
    );

    s.eq(
        "Caller-supplied Lesson 20 stems and expected forms fail closed without authorizing output",
        (() => {
            const request = {
                sourceStem: "nēci",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "2pl",
                mood: "indicative",
                tense: "present",
                requestedVoice: "impersonal",
                nonactiveOptionId: "o-hua:nex-o-hua",
            };
            const clean = ctx.evaluateClassicalNahuatlVncApplication(request);
            const poisoned = ctx.evaluateClassicalNahuatlVncApplication({
                ...request,
                nonactiveStem: "FORGED-STEM",
                perfectiveNonactiveStem: "FORGED-PERFECTIVE",
                expectedForm: "FORGED-EXPECTED-FORM",
                expectedFormula: "#FORGED-EXPECTED-FORMULA#",
                formulaArtifact: "#FORGED-FORMULA#",
                surfaceArtifact: "FORGED-SURFACE",
            });
            const blockedRecord = ctx.buildClassicalNahuatlNonactiveStemRecord("nēci", {
                verbClass: "B",
                sourceValence: "intransitive",
                nonactiveStem: "FORGED-STEM",
                expectedForm: "FORGED-EXPECTED-FORM",
            });
            const canonicalRecord = ctx.deriveClassicalNahuatlNonactiveStemRecord("nēci", {
                verbClass: "B",
                sourceValence: "intransitive",
                optionId: "o-hua:nex-o-hua",
            });
            const forgedImperfectiveRecord = {
                ...canonicalRecord,
                imperfectiveNonactiveStem: "FORGED-STEM",
            };
            const forgedPerfectiveRecord = {
                ...canonicalRecord,
                perfectiveNonactiveStem: "FORGED-PERFECTIVE",
            };
            const shallowClone = { ...canonicalRecord };
            const structuredCloneRecord = structuredClone(canonicalRecord);
            const jsonClone = JSON.parse(JSON.stringify(canonicalRecord));
            const activeSource = ctx.buildClassicalNahuatlVerbstemClassFrame("nēci", {
                subject: "2pl",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                perfectiveClass: "B",
                valence: "intransitive",
                transitivity: "intransitive",
            });
            const applyRecord = nonactiveStemRecord =>
                ctx.buildClassicalNahuatlDerivedVncFrame(activeSource, {
                    voice: "impersonal",
                    nonactiveStemRecord,
                    sourceValence: "intransitive",
                    sourceSubject: "2pl",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "B",
                });
            const issuedDerived = applyRecord(canonicalRecord);
            const shallowCloneDerived = applyRecord(shallowClone);
            const structuredCloneDerived = applyRecord(structuredCloneRecord);
            const jsonCloneDerived = applyRecord(jsonClone);
            return {
                cleanStatus: clean.authorizationStatus,
                poisonedStatus: poisoned.authorizationStatus,
                cleanFormula: clean.resultFrame?.formulaRealization,
                poisonedFormula: poisoned.resultFrame?.formulaRealization,
                callerAuthorityAccepted: poisoned.callerSuppliedAuthorityAccepted,
                poisonSurvives: JSON.stringify(poisoned).includes("FORGED"),
                blockedRecordStatus: blockedRecord.authorizationStatus,
                blockedRecordReason: blockedRecord.blockReason,
                canonicalRecordValid: ctx.isClassicalNahuatlNonactiveStemRecord(
                    canonicalRecord,
                    "nēci"
                ),
                forgedImperfectiveRecordValid: ctx.isClassicalNahuatlNonactiveStemRecord(
                    forgedImperfectiveRecord,
                    "nēci"
                ),
                forgedPerfectiveRecordValid: ctx.isClassicalNahuatlNonactiveStemRecord(
                    forgedPerfectiveRecord,
                    "nēci"
                ),
                shallowCloneValid: ctx.isClassicalNahuatlNonactiveStemRecord(
                    shallowClone,
                    "nēci"
                ),
                structuredCloneValid: ctx.isClassicalNahuatlNonactiveStemRecord(
                    structuredCloneRecord,
                    "nēci"
                ),
                jsonCloneValid: ctx.isClassicalNahuatlNonactiveStemRecord(
                    jsonClone,
                    "nēci"
                ),
                issuedDerivedStatus: issuedDerived.authorizationStatus,
                shallowCloneDerived: [
                    shallowCloneDerived.authorizationStatus,
                    shallowCloneDerived.blockReason,
                ],
                structuredCloneDerived: [
                    structuredCloneDerived.authorizationStatus,
                    structuredCloneDerived.blockReason,
                ],
                jsonCloneDerived: [
                    jsonCloneDerived.authorizationStatus,
                    jsonCloneDerived.blockReason,
                ],
            };
        })(),
        {
            cleanStatus: "authorized",
            poisonedStatus: "blocked",
            cleanFormula: "#0-0(nex-o-hua)0+0-0#",
            poisonedFormula: "",
            callerAuthorityAccepted: false,
            poisonSurvives: false,
            blockedRecordStatus: "blocked",
            blockedRecordReason: "nonactive-options-contain-hidden-accessor-or-unknown-authority",
            canonicalRecordValid: true,
            forgedImperfectiveRecordValid: false,
            forgedPerfectiveRecordValid: false,
            shallowCloneValid: false,
            structuredCloneValid: false,
            jsonCloneValid: false,
            issuedDerivedStatus: "authorized",
            shallowCloneDerived: [
                "blocked",
                "lesson20-authorized-typed-nonactive-stem-record-required",
            ],
            structuredCloneDerived: [
                "blocked",
                "lesson20-authorized-typed-nonactive-stem-record-required",
            ],
            jsonCloneDerived: [
                "blocked",
                "lesson20-authorized-typed-nonactive-stem-record-required",
            ],
        }
    );

    s.eq(
        "Canvas formula rules preserve second-plural, silent-object, and irregular source environments",
        (() => {
            const activeAn = ctx.buildClassicalNahuatlVerbstemClassFrame("āna", {
                subject: "2pl",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "1sg",
            });
            const silentObject = ctx.buildClassicalNahuatlVerbstemClassFrame("āyi", {
                subject: "3pl",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
                perfectiveClass: "B",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                silentSpecificObject: true,
            });
            const beSource = ctx.buildClassicalNahuatlVerbstemClassFrame("ye", {
                subject: "1pl",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "intransitive",
                transitivity: "intransitive",
            });
            const beImpersonal = ctx.buildClassicalNahuatlDerivedVncFrame(beSource, {
                voice: "impersonal",
                nonactiveStemRecord: ctx.deriveClassicalNahuatlNonactiveStemRecord("ye", {
                    verbClass: "A",
                    sourceValence: "intransitive",
                }),
                sourceValence: "intransitive",
                sourceSubject: "1pl",
                mood: "indicative",
                tense: "present",
            });
            const comeSource = ctx.buildClassicalNahuatlVerbstemClassFrame("hui-tz", {
                subject: "2pl",
                mood: "indicative",
                tense: "general-past",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "intransitive",
                transitivity: "intransitive",
            });
            const comeImpersonal = ctx.buildClassicalNahuatlDerivedVncFrame(comeSource, {
                voice: "impersonal",
                nonactiveStemRecord: ctx.deriveClassicalNahuatlNonactiveStemRecord("hui-tz", {
                    verbClass: "A",
                    sourceValence: "intransitive",
                }),
                sourceValence: "intransitive",
                sourceSubject: "2pl",
                mood: "indicative",
                tense: "general-past",
            });
            return {
                secondPluralBeforeNech: activeAn.formulaRealization,
                silentThirdObject: silentObject.formulaRealization,
                beImpersonal: beImpersonal.formulaRealization,
                comeImpersonal: comeImpersonal.formulaRealization,
            };
        })(),
        {
            secondPluralBeforeNech: "#an-0+n-ēch(āna)z+qu-eh#",
            silentThirdObject: "#0-0+⎕-0(āx)0+qu-eh#",
            beImpersonal: "#0-0(ye-lo-hua)0+c-0#",
            comeImpersonal: "#0-0(huī-lo-hua-tz)a+0-0#",
        }
    );

    s.eq(
        "Lesson 23 ignores carrier and formula poison while forged object clusters fail closed",
        (() => {
            const lower = ctx.buildClassicalNahuatlVerbstemClassFrame("maca", {
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const typed = ctx.buildClassicalNahuatlMultipleObjectVncFrame(lower, {
                formulaArtifact: "#FORMULA-LIE#",
                surfaceArtifact: "SURFACE-LIE",
                objectRequests: [
                    { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1, carrier: "CARRIER-LIE" },
                    { objectId: "applied-human", objectKind: "nonspecific-human", governor: "applicative", derivationalLevel: 2, carrier: "CARRIER-LIE" },
                ],
            });
            const forgedCluster = JSON.parse(JSON.stringify(typed.multipleObjectClusterFrame));
            forgedCluster.positions[0].carrier = "CARRIER-LIE";
            forgedCluster.positions[0].va1 = "CARRIER-LIE";
            const duplicateIdCluster = JSON.parse(JSON.stringify(typed.multipleObjectClusterFrame));
            duplicateIdCluster.objectRequests[1].objectId = duplicateIdCluster.objectRequests[0].objectId;
            const forgedTransform = ctx.buildClassicalNahuatlVoiceObjectClusterFrame(forgedCluster, {
                voice: "passive",
                tense: "future",
            });
            const forgedApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(lower, forgedCluster);
            const duplicateIdApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(lower, duplicateIdCluster);
            const forgedPassive = ctx.buildClassicalNahuatlDerivedVncFrame(typed, {
                voice: "passive",
                sourceObjectClusterFrame: forgedCluster,
                nonactiveStemRecord: ctx.deriveClassicalNahuatlNonactiveStemRecord("maca", {
                    verbClass: "A",
                    sourceValence: "specific-projective",
                    optionId: "ō:mac-ō",
                }),
                sourceValence: "multiple-object",
                sourceSubject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
            });
            return {
                typedStatus: typed.authorizationStatus,
                typedFormula: typed.formulaRealization,
                typedCarriers: typed.multipleObjectClusterFrame.linearCarriers,
                formulaArtifactAuthority: typed.multipleObjectClusterFrame.formulaArtifactAuthority,
                surfaceArtifactAuthority: typed.multipleObjectClusterFrame.surfaceArtifactAuthority,
                poisonSurvives: JSON.stringify(typed).includes("CARRIER-LIE")
                    || typed.formulaRealization.includes("LIE"),
                forgedTransformStatus: forgedTransform.authorizationStatus,
                forgedTransformReason: forgedTransform.blockReason,
                forgedApplyAccepted: forgedApply?.authorizationStatus === "authorized",
                duplicateIdApplyAccepted: duplicateIdApply?.authorizationStatus === "authorized",
                forgedPassiveStatus: forgedPassive.authorizationStatus,
                forgedPassiveHasLie: JSON.stringify(forgedPassive).includes("CARRIER-LIE"),
            };
        })(),
        {
            typedStatus: "authorized",
            typedFormula: "#0-0+qui-0+tē(maca)z+⎕-0#",
            typedCarriers: ["qui-0", "tē"],
            formulaArtifactAuthority: false,
            surfaceArtifactAuthority: false,
            poisonSurvives: false,
            forgedTransformStatus: "blocked",
            forgedTransformReason: "lesson23-authorized-source-object-cluster-required",
            forgedApplyAccepted: false,
            duplicateIdApplyAccepted: false,
            forgedPassiveStatus: "blocked",
            forgedPassiveHasLie: false,
        }
    );

    s.eq(
        "Lesson 23 voice clusters reject canonical cross-source mixing while direct clusters still apply",
        (() => {
            const buildLower = (objectPerson) => ctx.buildClassicalNahuatlVerbstemClassFrame("maca", {
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson,
            });
            const humanLower = buildLower("3sg");
            const humanSource = ctx.buildClassicalNahuatlMultipleObjectVncFrame(humanLower, {
                objectRequests: [
                    { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "applied-human", objectKind: "nonspecific-human", governor: "applicative", derivationalLevel: 2 },
                ],
            });
            const nonhumanSource = ctx.buildClassicalNahuatlMultipleObjectVncFrame(buildLower("2sg"), {
                objectRequests: [
                    { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "2sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "applied-nonhuman", objectKind: "nonspecific-nonhuman", governor: "applicative", derivationalLevel: 2 },
                ],
            });
            const macaNonactive = ctx.deriveClassicalNahuatlNonactiveStemRecord("maca", {
                verbClass: "A",
                sourceValence: "specific-projective",
                optionId: "ō:mac-ō",
            });
            const anaNonactive = ctx.deriveClassicalNahuatlNonactiveStemRecord("āna", {
                verbClass: "A",
                sourceValence: "specific-projective",
                optionId: "ō:ān-ō",
            });
            const directVoice = ctx.buildClassicalNahuatlVoiceObjectClusterFrame(humanSource.multipleObjectClusterFrame, {
                voice: "passive",
                tense: "future",
                sourceMachineryFrame: humanSource,
                nonactiveStemRecord: macaNonactive,
            });
            const mixedVoice = ctx.buildClassicalNahuatlVoiceObjectClusterFrame(humanSource.multipleObjectClusterFrame, {
                voice: "passive",
                tense: "future",
                sourceMachineryFrame: nonhumanSource,
                nonactiveStemRecord: macaNonactive,
            });
            const mixedRecordVoice = ctx.buildClassicalNahuatlVoiceObjectClusterFrame(humanSource.multipleObjectClusterFrame, {
                voice: "passive",
                tense: "future",
                sourceMachineryFrame: humanSource,
                nonactiveStemRecord: anaNonactive,
            });
            const mixedDerived = ctx.buildClassicalNahuatlDerivedVncFrame(nonhumanSource, {
                voice: "passive",
                sourceObjectClusterFrame: humanSource.multipleObjectClusterFrame,
                nonactiveStemRecord: macaNonactive,
                sourceValence: "multiple-object",
                sourceSubject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
            });
            const directCluster = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(humanLower, humanSource.multipleObjectClusterFrame);
            const licensedTargetLower = ctx.buildClassicalNahuatlVerbstemClassFrame("mac-o", {
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "projective-human",
                transitivity: "transitive",
                objectKind: "nonspecific-human",
            });
            const unrelatedTargetLower = ctx.buildClassicalNahuatlVerbstemClassFrame("nemi", {
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "projective-human",
                transitivity: "transitive",
                objectKind: "nonspecific-human",
            });
            const licensedVoiceApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(licensedTargetLower, directVoice);
            const unrelatedVoiceApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(unrelatedTargetLower, directVoice);
            const wrongSubjectLower = ctx.buildClassicalNahuatlVerbstemClassFrame("mac-o", {
                subject: "1sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "projective-human",
                transitivity: "transitive",
                objectKind: "nonspecific-human",
            });
            const wrongTenseLower = ctx.buildClassicalNahuatlVerbstemClassFrame("mac-o", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "projective-human",
                transitivity: "transitive",
                objectKind: "nonspecific-human",
            });
            const wrongSubjectVoiceApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(wrongSubjectLower, directVoice);
            const wrongTenseVoiceApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(wrongTenseLower, directVoice);
            return {
                humanSourceStatus: humanSource.authorizationStatus,
                nonhumanSourceStatus: nonhumanSource.authorizationStatus,
                directVoiceStatus: directVoice.authorizationStatus,
                mixedVoiceStatus: mixedVoice.authorizationStatus,
                mixedVoiceReason: mixedVoice.blockReason,
                mixedRecordStatus: mixedRecordVoice.authorizationStatus,
                mixedRecordReason: mixedRecordVoice.blockReason,
                mixedDerivedStatus: mixedDerived.authorizationStatus,
                mixedDerivedReason: mixedDerived.blockReason,
                directClusterStatus: directCluster?.authorizationStatus || "blocked",
                licensedVoiceApplyStatus: licensedVoiceApply?.authorizationStatus || "blocked",
                unrelatedVoiceApplyAccepted: unrelatedVoiceApply?.authorizationStatus === "authorized",
                wrongSubjectVoiceApplyAccepted: wrongSubjectVoiceApply?.authorizationStatus === "authorized",
                wrongTenseVoiceApplyAccepted: wrongTenseVoiceApply?.authorizationStatus === "authorized",
            };
        })(),
        {
            humanSourceStatus: "authorized",
            nonhumanSourceStatus: "authorized",
            directVoiceStatus: "authorized",
            mixedVoiceStatus: "blocked",
            mixedVoiceReason: "lesson23-validated-source-machinery-context-required",
            mixedRecordStatus: "blocked",
            mixedRecordReason: "lesson20-authorized-source-nonactive-record-context-required",
            mixedDerivedStatus: "blocked",
            mixedDerivedReason: "lesson23-validated-source-machinery-context-required",
            directClusterStatus: "authorized",
            licensedVoiceApplyStatus: "authorized",
            unrelatedVoiceApplyAccepted: false,
            wrongSubjectVoiceApplyAccepted: false,
            wrongTenseVoiceApplyAccepted: false,
        }
    );

    s.eq(
        "Lesson 21 keeps typed tē while §21.2.5 alone projects short te in the printed passive formula",
        (() => {
            const buildPassive = (sourceStem, optionId) => {
                const lower = ctx.buildClassicalNahuatlVerbstemClassFrame(sourceStem, {
                    subject: "3sg",
                    mood: "indicative",
                    tense: "future",
                    verbClass: "A",
                    perfectiveClass: "A",
                    valence: "specific-projective",
                    transitivity: "transitive",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                });
                const source = ctx.buildClassicalNahuatlMultipleObjectVncFrame(lower, {
                    objectRequests: [
                        { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                        { objectId: "applied-human", objectKind: "nonspecific-human", governor: "applicative", derivationalLevel: 2 },
                    ],
                });
                const record = ctx.deriveClassicalNahuatlNonactiveStemRecord(sourceStem, {
                    verbClass: "A",
                    sourceValence: "specific-projective",
                    optionId,
                });
                return ctx.buildClassicalNahuatlDerivedVncFrame(source, {
                    voice: "passive",
                    sourceObjectClusterFrame: source.multipleObjectClusterFrame,
                    nonactiveStemRecord: record,
                    sourceValence: "multiple-object",
                    sourceSubject: "3sg",
                    mood: "indicative",
                    tense: "future",
                    verbClass: "A",
                });
            };
            const exact = buildPassive("maca", "ō:mac-ō");
            const neighbor = buildPassive("āna", "ō:ān-ō");
            const position = exact.multipleObjectClusterFrame.positions[0];
            const projection = exact.multipleObjectClusterFrame.formulaCarrierProjectionFrames[0];
            const slot = exact.proofFrame.conclusion.finalTypedVncSlotFrame.slots.prePredicate[0];
            const finite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(exact);
            return {
                participant: [position.carrier, position.va, position.voiceTransformation],
                projection: [
                    projection.sourceCarrier,
                    projection.formulaCarrier,
                    projection.surfaceCarrier,
                    projection.participantTransformation,
                    projection.formulaOnly,
                ],
                slot: [
                    slot.carrier,
                    slot.underlyingCarrier,
                    slot.carrierProjectionRole,
                    slot.objectPositionFrame.carrier,
                ],
                exactFormula: exact.formulaRealization,
                finiteFormula: finite.formulaRealization,
                finiteSurfaceBeginsLongTe: /^tē/u.test(finite.wordRealization),
                hostileNeighbor: {
                    participantCarrier: neighbor.multipleObjectClusterFrame.positions[0].carrier,
                    projectionCount: neighbor.multipleObjectClusterFrame.formulaCarrierProjectionFrames.length,
                    formula: neighbor.formulaRealization,
                },
            };
        })(),
        {
            participant: ["tē", "tē", "retain-human-nonspecific-object-unchanged"],
            projection: ["tē", "te", "tē", false, true],
            slot: ["te", "tē", "contextual-formula-only", "tē"],
            exactFormula: "#0-0+te(mac-o)z+⎕-0#",
            finiteFormula: "#0-0+te(mac-o)z+⎕-0#",
            finiteSurfaceBeginsLongTe: true,
            hostileNeighbor: {
                participantCarrier: "tē",
                projectionCount: 0,
                formula: "#0-0+tē(ān-o)z+⎕-0#",
            },
        }
    );

    const surfaceRuntimeLoaded = typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function";
    s.eq(
        "Classical surface pipeline consumes the Lesson 20-22 controls instead of static examples",
        surfaceRuntimeLoaded ? (() => {
            const passive = ctx.buildClassicalRuleLogicSurfaceFrame({
                basalUnit: "vnc",
                stem: "chihua",
                subject: "2pl",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "1sg",
                vncVoice: "passive",
                nonactiveStem: "THIS-CALLER-ANSWER-MUST-NOT-SURVIVE",
                vncOutputScope: "single",
            });
            const tla = ctx.buildClassicalRuleLogicSurfaceFrame({
                basalUnit: "vnc",
                stem: "nēci",
                subject: "2pl",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                valence: "intransitive",
                vncVoice: "impersonal",
                nonactiveOptionId: "tla-impersonal",
                nonactiveStem: "THIS-CALLER-ANSWER-MUST-NOT-SURVIVE",
                vncOutputScope: "single",
            });
            return {
                passiveStatus: passive.authorizationStatus,
                passiveVoice: passive.machineryFrame?.voice,
                passiveFormula: passive.selectedFormula,
                passiveTargetSubject: passive.machineryFrame?.voiceTransformationFrame?.targetSubject,
                tlaStatus: tla.authorizationStatus,
                tlaVoice: tla.machineryFrame?.voice,
                tlaFormula: tla.selectedFormula,
                tlaTargetSubject: tla.machineryFrame?.voiceTransformationFrame?.targetSubject,
            };
        })() : {
            runtimeStatus: "not-loaded-in-core-harness",
            staticWiring: rendering.includes("requestClassicalVncApplicationResult(")
                && rendering.includes("vncApplicationFrame?.resultFrame?.selectedMachineryFrame")
                && !rendering.includes("typedTlaImpersonalStemRecord")
                && !rendering.includes("typedInherentImpersonalRecord"),
        },
        surfaceRuntimeLoaded ? {
            passiveStatus: "authorized",
            passiveVoice: "passive",
            passiveFormula: "#ni-0(chihua-lo)0+0-0#",
            passiveTargetSubject: "1sg",
            tlaStatus: "authorized",
            tlaVoice: "tla-impersonal",
            tlaFormula: "#0-0(tla-nēci)0+0-0#",
            tlaTargetSubject: "3sg",
        } : {
            runtimeStatus: "not-loaded-in-core-harness",
            staticWiring: true,
        }
    );

    s.ok(
        "Lesson 20-22 single-voice action is shared through the application boundary, not reconstructed by presentation",
        rendering.includes("requestClassicalVncApplicationResult(")
            && !rendering.includes("getClassicalNahuatlNonactiveStemOptions(")
            && !rendering.includes("deriveClassicalNahuatlNonactiveStemRecord(")
            && !rendering.includes("buildClassicalNahuatlInherentImpersonalRecord(")
            && !rendering.includes("buildClassicalNahuatlTlaImpersonalStemRecord(")
            && !rendering.includes("buildClassicalNahuatlDerivedVncFrame(")
            && vncApplication.includes("getClassicalNahuatlNonactiveStemOptions(")
            && vncApplication.includes("buildClassicalNahuatlDerivedVncFrame(")
    );

    s.ok(
        "Classical Canvas exposes voice plus explicit generated alternatives with no default or expected-answer input",
        shell.includes('id="classical-rule-logic-vnc-voice"')
            && shell.includes('id="classical-rule-logic-voice-layer-2"')
            && shell.includes('id="classical-rule-logic-voice-layer-3"')
            && shell.includes('data-classical-vnc-authority-order="predicate-voice-layer-2"')
            && shell.includes('data-classical-vnc-authority-order="predicate-voice-layer-3"')
            && shell.includes('id="classical-rule-logic-nonactive-family"')
            && !shell.includes('id="classical-rule-logic-nonactive-stem"')
            && shell.includes('value="passive"')
            && shell.includes('value="impersonal"')
            && !shell.includes('<option value="inherent-impersonal"')
            && !shell.includes('<option value="tla-impersonal"')
            && rendering.includes("node.value = option.optionId")
            && shell.includes('<option value="" selected>Choose a grammar-supported formation</option>')
            && !shell.includes('data-classical-authority-option')
            && !shell.includes('data-exact-witness')
            && !shell.includes('<option value="lō" selected')
            && rendering.includes('nonactiveInventory?.selectorRequired === true')
            && rendering.includes('nonactiveInventory.selectionRequired === true')
            && shell.includes('Choose a grammar-supported formation')
            && rendering.includes('surfaceFrame.state?.selectedNonactiveOptionId')
            && !rendering.includes('nonactiveInventory.defaultOptionId')
            && vncApplication.includes('dependencySource.deriveClassicalNahuatlNonactiveStemRecord(')
            && !rendering.includes('getClassicalRuleLogicSurfaceControlValue("classical-rule-logic-nonactive-stem"')
            && vncApplication.includes('dependencySource.buildClassicalNahuatlDerivedVncFrame(')
            && vncApplication.includes('"active-source-analysis-must-authorize-before-derived-voice"')
            && rendering.includes('allowedVncVoices = applicationControlFrame.allowedVoices')
            && rendering.includes('label: "Derived subject"')
            && rendering.includes('label: "Derived valence"')
    );

    s.ok(
        "Lessons 20-22 source audit remains internal and has no presentation or application-frame carrier",
        !shell.includes('id="classical-vnc-lessons20-22-source-closure"')
            && !shell.includes('id="classical-vnc-lessons20-22-grammar-closure"')
            && !rendering.includes("syncClassicalVncLessons20To22ClosurePanels")
            && !rendering.includes("lessons20To22ClosureFrame")
            && !vncApplication.includes("lessons20To22ClosureFrame")
            && !vncEvaluator.includes("buildClassicalNahuatlLessons20To22ClosureFrame")
            && !contractRegistry.includes(
                'contractKind: "classical-nahuatl-nonactive-vnc-source-closure-frame"'
            )
            && !vncGrammar.includes("transcriptionLineStart")
            && !vncGrammar.includes("dispositionCounts")
            && !vncGrammar.includes("claimSignature")
            && !shell.includes('name="lessons20To22ClosureFrame"')
            && !shell.includes('name="tlaImpersonalSourceAnalysis"')
    );

    return s;
}

module.exports = { run };
