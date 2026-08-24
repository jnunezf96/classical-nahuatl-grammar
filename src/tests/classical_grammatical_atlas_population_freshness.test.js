"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");
const { spawnSync } = require("child_process");
const { createSuite } = require("./runner");
const {
    currentBrowserCacheKey,
    usesBrowserCacheKey,
} = require("./helpers/browser_cache_chain");

const WEB_ROOT = path.resolve(__dirname, "..", "..");
const ATLAS_GENERATOR_PATH = path.join(
    WEB_ROOT,
    "scripts",
    "build_classical_grammatical_atlas_population.mjs"
);
const POPULATION_PATH = path.join(
    WEB_ROOT,
    "data",
    "classical_grammatical_atlas_population.mjs"
);
const POPULATION_VERSION_PATH = path.join(
    WEB_ROOT,
    "data",
    "classical_grammatical_atlas_population_version.mjs"
);

function sha256(value) {
    return `sha256:${crypto.createHash("sha256").update(value).digest("hex")}`;
}

function readPopulation(filePath = POPULATION_PATH) {
    const source = fs.readFileSync(filePath, "utf8");
    const match = source.match(
        /CLASSICAL_GRAMMATICAL_ATLAS_POPULATION = deepFreeze\((\{.*\})\);\nexport default/su
    );
    if (!match) throw new Error("generated Atlas population payload is unreadable");
    return JSON.parse(match[1]);
}

function readPopulationVersion(filePath = POPULATION_VERSION_PATH) {
    const source = fs.readFileSync(filePath, "utf8");
    const match = source.match(
        /CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_VERSION = deepFreeze\((\{.*\})\);\nexport default/su
    );
    if (!match) throw new Error("generated Atlas population version is unreadable");
    return JSON.parse(match[1]);
}

function normalizedInventoryProjection(inventory) {
    return inventory.operations.map(operation => {
        const signature =
            operation.rhymeRoutePlaneFrame.compatibilitySignature;
        return [
            operation.operationId,
            operation.capabilityName,
            operation.outputCapabilities.map(output => [
                output.outputKind,
                output.installedCapabilityName,
                output.validatorNames,
            ]),
            operation.axisIds,
            [
                signature.requiresPresent,
                signature.requiresAbsent,
                signature.adds,
                signature.removes,
                signature.preserves,
                signature.emits,
            ],
        ];
    });
}

function writeJson(filePath, value) {
    fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function checkLessonReviewAtlasTransaction() {
    const temporaryRoot = fs.mkdtempSync(path.join(
        os.tmpdir(),
        "classical-review-atlas-"
    ));
    const fixtureParent = path.join(temporaryRoot, "Classical_Nahuatl");
    const webRoot = path.join(
        fixtureParent,
        "Classical_Nahuatl_Grammar_Web"
    );
    const progressRoot = path.join(webRoot, "docs", "canvas-progress");
    const dataRoot = path.join(webRoot, "data");
    const generatorRoot = path.join(
        webRoot,
        "scripts"
    );
    const fixtureBuildPath = path.join(
        progressRoot,
        "build_lesson_review.mjs"
    );
    const fixtureGeneratorPath = path.join(
        generatorRoot,
        "build_classical_grammatical_atlas_population.mjs"
    );
    const ledgerPath = path.join(progressRoot, "lesson3-review-ledger.json");
    const packetPath = path.join(progressRoot, "lesson3-review-batches.md");
    const atlasPath = path.join(
        dataRoot,
        "classical_grammatical_atlas_population.mjs"
    );
    const versionPath = path.join(
        dataRoot,
        "classical_grammatical_atlas_population_version.mjs"
    );
    const lockPath = path.join(
        dataRoot,
        ".classical_grammatical_atlas_publication.lock"
    );
    const journalPath = path.join(
        dataRoot,
        ".classical_grammatical_atlas_publication.journal.json"
    );
    const decisionsPath = path.join(
        progressRoot,
        "lesson3-review-decisions.json"
    );
    const oldLedger = "old-ledger\n";
    const oldPacket = "old-packet\n";
    const oldAtlas = "old-atlas\n";
    const oldVersion = "old-version\n";
    const resetOutputs = () => {
        fs.writeFileSync(ledgerPath, oldLedger);
        fs.writeFileSync(packetPath, oldPacket);
        fs.writeFileSync(atlasPath, oldAtlas);
        fs.writeFileSync(versionPath, oldVersion);
    };
    const runBuild = environment => spawnSync(process.execPath, [
        fixtureBuildPath,
        "--lesson",
        "3",
        "--write",
    ], {
        encoding: "utf8",
        env: { ...process.env, ...environment },
    });
    const outputFacts = () => ({
        ledger: fs.readFileSync(ledgerPath, "utf8"),
        packet: fs.readFileSync(packetPath, "utf8"),
        atlas: fs.readFileSync(atlasPath, "utf8"),
        version: fs.readFileSync(versionPath, "utf8"),
    });
    const transientFiles = () => [
        ...fs.readdirSync(progressRoot),
        ...fs.readdirSync(dataRoot),
    ].filter(name => (
        name.includes("lesson-review")
        || name.includes("publication.lock")
        || name.includes("publication.journal")
    )).sort();
    try {
        fs.mkdirSync(progressRoot, { recursive: true });
        fs.mkdirSync(dataRoot, { recursive: true });
        fs.mkdirSync(generatorRoot, { recursive: true });
        fs.copyFileSync(path.join(
            WEB_ROOT,
            "docs",
            "canvas-progress",
            "build_lesson_review.mjs"
        ), fixtureBuildPath);
        writeJson(path.join(webRoot, "docs", "ANDREWS_ATOM_LEDGER.json"), {
            codebook: {
                atomTuple: [
                    "atomId",
                    "canvasSection",
                    "canvasSpan",
                    "meaning",
                    "force",
                    "category",
                    "projectRole",
                ],
            },
            atoms: [[
                "fixture-atom",
                "§3.1",
                "fixture",
                "fixture meaning",
                "grammar-bearing",
                "RUL",
                "canonical-rule-or-alternation",
            ]],
        });
        writeJson(path.join(progressRoot, "lesson3-review-plan.json"), {
            lesson: 3,
            groupsPerBatch: 3,
            groups: [{
                groupId: "fixture-group",
                title: "Fixture",
                sections: ["§3.1"],
                proposal: "Fixture proposal",
                writingJob: "FIXTURE_WRITING_JOB",
                readingJob: "FIXTURE_READING_JOB",
                decisionSplit: "Fixture split",
                controlPolicy: "Fixture policy",
            }],
        });
        writeJson(decisionsPath, {
            lesson: 3,
            decisions: {
                "fixture-group": {
                    status: "ACCEPTED",
                    acceptedJob: "Fixture job",
                },
            },
        });
        writeJson(path.join(
            progressRoot,
            "lesson3-implementation-proof.json"
        ), {
            lesson: 3,
            groups: {
                "fixture-group": {
                    status: "EXACTLY_OBSERVED",
                    readerTest: "src/tests/fixture-reader.test.js",
                    writingTest: "src/tests/fixture-writer.test.js",
                },
            },
        });
        resetOutputs();
        fs.writeFileSync(fixtureGeneratorPath, [
            "import fs from 'node:fs';",
            "import crypto from 'node:crypto';",
            "const outputIndex = process.argv.indexOf('--output');",
            "const versionIndex = process.argv.indexOf('--version-output');",
            "const overrideIndex = process.argv.indexOf('--lesson-ledger-override');",
            "const ledgerPath = process.argv[overrideIndex + 2];",
            "const ledgerSource = fs.readFileSync(ledgerPath, 'utf8');",
            "const ledger = JSON.parse(ledgerSource);",
            "if (ledger.records[0]?.atomId !== 'fixture-atom') process.exit(8);",
            "if (process.env.FIXTURE_GENERATOR_FAIL === '1') process.exit(7);",
            "const digest = crypto.createHash('sha256').update(ledgerSource).digest('hex');",
            "fs.writeFileSync(process.argv[outputIndex + 1], `new-atlas:${digest}\\n`);",
            "fs.writeFileSync(process.argv[versionIndex + 1], `new-version:${digest}\\n`);",
            "",
        ].join("\n"));
        const success = runBuild();
        const firstAtlas = fs.readFileSync(atlasPath, "utf8");
        const firstVersion = fs.readFileSync(versionPath, "utf8");
        const successFacts = {
            status: success.status,
            ledgerAtomCount: JSON.parse(
                fs.readFileSync(ledgerPath, "utf8")
            ).counts.atoms,
            packetChanged: fs.readFileSync(packetPath, "utf8") !== oldPacket,
            atlasGenerated: firstAtlas.startsWith("new-atlas:"),
            versionGenerated: firstVersion.startsWith("new-version:"),
            matchingDigest:
                firstAtlas.slice("new-atlas:".length)
                    === firstVersion.slice("new-version:".length),
            transientFiles: transientFiles(),
        };

        writeJson(decisionsPath, {
            lesson: 3,
            decisions: {
                "fixture-group": {
                    status: "ACCEPTED",
                    acceptedJob: "Changed fixture job",
                },
            },
        });
        const changed = runBuild();
        const versionChangeFacts = {
            status: changed.status,
            atlasChanged: fs.readFileSync(atlasPath, "utf8") !== firstAtlas,
            versionChanged:
                fs.readFileSync(versionPath, "utf8") !== firstVersion,
        };

        resetOutputs();
        const failure = runBuild({
            CLASSICAL_LESSON_REVIEW_TEST_FAIL_AFTER_PUBLISH: "2",
        });
        const rollbackFacts = {
            failed: failure.status !== 0,
            ...outputFacts(),
            transientFiles: transientFiles(),
        };

        resetOutputs();
        fs.writeFileSync(lockPath, `${JSON.stringify({
            schemaVersion: 1,
            pid: process.pid,
            token: "fixture-live-owner",
            actor: "fixture-live-owner",
        })}\n`);
        const refused = runBuild();
        const lockRefusalFacts = {
            failed: refused.status !== 0,
            namedHolder: String(refused.stderr).includes("fixture-live-owner"),
            ...outputFacts(),
            lockPreserved: fs.existsSync(lockPath),
        };
        fs.unlinkSync(lockPath);

        resetOutputs();
        const crashed = runBuild({
            CLASSICAL_LESSON_REVIEW_TEST_CRASH_AFTER_PUBLISH: "2",
        });
        const crashFacts = {
            status: crashed.status,
            journalLeft: fs.existsSync(journalPath),
            lockLeft: fs.existsSync(lockPath),
            ledgerPartlyPublished:
                fs.readFileSync(ledgerPath, "utf8") !== oldLedger,
            atlasNotYetPublished:
                fs.readFileSync(atlasPath, "utf8") === oldAtlas,
        };
        const recovered = runBuild({ FIXTURE_GENERATOR_FAIL: "1" });
        const staleRecoveryFacts = {
            recoveryRunFailedAfterRecovery: recovered.status !== 0,
            ...outputFacts(),
            transientFiles: transientFiles(),
        };

        resetOutputs();
        const committedCrash = runBuild({
            CLASSICAL_LESSON_REVIEW_TEST_CRASH_AFTER_COMMIT_JOURNAL: "1",
        });
        const committedOutputs = outputFacts();
        const committedCrashFacts = {
            status: committedCrash.status,
            journalLeft: fs.existsSync(journalPath),
            lockLeft: fs.existsSync(lockPath),
            allOutputsPublished: Object.entries(committedOutputs).every(
                ([name, value]) => value !== ({
                    ledger: oldLedger,
                    packet: oldPacket,
                    atlas: oldAtlas,
                    version: oldVersion,
                })[name]
            ),
        };
        const committedRecovery = runBuild({ FIXTURE_GENERATOR_FAIL: "1" });
        const committedRecoveryFacts = {
            recoveryRunFailedAfterRecovery: committedRecovery.status !== 0,
            committedOutputsPreserved:
                JSON.stringify(outputFacts())
                    === JSON.stringify(committedOutputs),
            transientFiles: transientFiles(),
        };
        return {
            successFacts,
            versionChangeFacts,
            rollbackFacts,
            lockRefusalFacts,
            crashFacts,
            staleRecoveryFacts,
            committedCrashFacts,
            committedRecoveryFacts,
        };
    } finally {
        fs.rmSync(temporaryRoot, { recursive: true, force: true });
    }
}

function checkGeneratedVersionChangesWithSource(lessonNumber) {
    const temporaryRoot = fs.mkdtempSync(path.join(
        os.tmpdir(),
        "classical-atlas-version-"
    ));
    const ledgerRelativePath = path.join(
        "docs",
        "canvas-progress",
        `lesson${lessonNumber}-${lessonNumber < 3 ? "job" : "review"}-ledger.json`
    );
    const sourceLedger = fs.readFileSync(
        path.join(WEB_ROOT, ledgerRelativePath),
        "utf8"
    );
    const overridePath = path.join(temporaryRoot, "changed-ledger.json");
    const populationPath = path.join(temporaryRoot, "changed-population.mjs");
    const versionPath = path.join(temporaryRoot, "changed-version.mjs");
    try {
        fs.writeFileSync(overridePath, `${sourceLedger}\n`);
        const run = spawnSync(
            process.execPath,
            [
                ATLAS_GENERATOR_PATH,
                "--write",
                "--web-root",
                WEB_ROOT,
                "--output",
                populationPath,
                "--version-output",
                versionPath,
                "--lesson-ledger-override",
                String(lessonNumber),
                overridePath,
            ],
            {
                cwd: path.dirname(ATLAS_GENERATOR_PATH),
                encoding: "utf8",
                maxBuffer: 16 * 1024 * 1024,
            }
        );
        const originalVersion = readPopulationVersion();
        const changedVersion = readPopulationVersion(versionPath);
        return {
            status: run.status,
            sourceDigestChanged:
                originalVersion.sourceDigest !== changedVersion.sourceDigest,
            populationDigestChanged:
                originalVersion.populationDigest
                    !== changedVersion.populationDigest,
            versionChanged:
                originalVersion.version !== changedVersion.version,
            populationDigestMatchesFile:
                changedVersion.populationDigest
                    === sha256(JSON.stringify(readPopulation(populationPath))),
        };
    } finally {
        fs.rmSync(temporaryRoot, { recursive: true, force: true });
    }
}

function run(ctx) {
    const s = createSuite(
        "classical_grammatical_atlas_population_freshness"
    );
    const population = readPopulation();
    const populationVersion = readPopulationVersion();
    const currentLessonDigests = population.sourceDigests.lessonLedgers.map(
        ([lessonNumber, relativePath]) => [
            lessonNumber,
            relativePath,
            sha256(fs.readFileSync(path.join(WEB_ROOT, relativePath))),
        ]
    );
    const currentProofDigests = population.sourceDigests.proofFiles.map(
        ([relativePath]) => [
            relativePath,
            sha256(fs.readFileSync(path.join(WEB_ROOT, relativePath))),
        ]
    );
    const currentSemanticOwnerSpecDigests =
        population.sourceDigests.semanticOwnerSpecs.map(
            ([relativePath]) => [
                relativePath,
                sha256(fs.readFileSync(path.join(WEB_ROOT, relativePath))),
            ]
        );
    const currentDigests = {
        atomLedger: sha256(fs.readFileSync(path.join(
            WEB_ROOT,
            "docs",
            "ANDREWS_ATOM_LEDGER.json"
        ))),
        lessonLedgers: currentLessonDigests,
        lessonRhymeMap: sha256(fs.readFileSync(path.join(
            WEB_ROOT,
            "src",
            "core",
            "grammar",
            "classical_lessons_1_58_rhyme_map.mjs"
        ))),
        applicationInventory: sha256(JSON.stringify(
            normalizedInventoryProjection(
                ctx.getClassicalGrammarApplicationInventory()
            )
        )),
        applicationAxisDispositions: sha256(fs.readFileSync(path.join(
            WEB_ROOT,
            "docs",
            "CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json"
        ))),
        proofFiles: currentProofDigests,
        semanticOwnerSpecs: currentSemanticOwnerSpecDigests,
    };
    const combined = sha256(JSON.stringify(currentDigests));
    s.eq(
        "the compact Atlas population is current with every Web-owned source and proof dependency",
        {
            atomLedger:
                currentDigests.atomLedger
                    === population.sourceDigests.atomLedger,
            lessonLedgers:
                JSON.stringify(currentDigests.lessonLedgers)
                    === JSON.stringify(
                        population.sourceDigests.lessonLedgers
                    ),
            lessonRhymeMap:
                currentDigests.lessonRhymeMap
                    === population.sourceDigests.lessonRhymeMap,
            applicationInventory:
                currentDigests.applicationInventory
                    === population.sourceDigests.applicationInventory,
            applicationAxisDispositions:
                currentDigests.applicationAxisDispositions
                    === population.sourceDigests
                        .applicationAxisDispositions,
            proofFiles:
                JSON.stringify(currentDigests.proofFiles)
                    === JSON.stringify(population.sourceDigests.proofFiles),
            semanticOwnerSpecs:
                JSON.stringify(currentDigests.semanticOwnerSpecs)
                    === JSON.stringify(
                        population.sourceDigests.semanticOwnerSpecs
                    ),
            missingAcceptedProofFiles:
                population.counts.missingProofFiles,
            combined:
                combined === population.sourceDigests.combined,
        },
        {
            atomLedger: true,
            lessonLedgers: true,
            lessonRhymeMap: true,
            applicationInventory: true,
            applicationAxisDispositions: true,
            proofFiles: true,
            semanticOwnerSpecs: true,
            missingAcceptedProofFiles: 0,
            combined: true,
        }
    );

    s.eq(
        "the generated version is the population commit marker and matches its exact payload and source digest",
        {
            kind: populationVersion.kind,
            populationSchemaVersion:
                populationVersion.populationSchemaVersion,
            sourceDigestMatches:
                populationVersion.sourceDigest
                    === population.sourceDigests.combined,
            populationDigestMatches:
                populationVersion.populationDigest
                    === sha256(JSON.stringify(population)),
            lessons: populationVersion.counts.lessons,
            atoms: populationVersion.counts.atoms,
            namedExport: fs.readFileSync(
                POPULATION_VERSION_PATH,
                "utf8"
            ).includes(
                "export const CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_VERSION"
            ) && fs.readFileSync(POPULATION_PATH, "utf8").includes(
                "export const CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_PAYLOAD_DIGEST"
            ),
            populationMode:
                fs.statSync(POPULATION_PATH).mode & 0o777,
            versionMode:
                fs.statSync(POPULATION_VERSION_PATH).mode & 0o777,
        },
        {
            kind: "classical-grammatical-atlas-population-version",
            populationSchemaVersion: population.schemaVersion,
            sourceDigestMatches: true,
            populationDigestMatches: true,
            lessons: population.counts.lessons,
            atoms: population.counts.atoms,
            namedExport: true,
            populationMode: 0o644,
            versionMode: 0o644,
        }
    );

    const availableLessonNumbers = Array.from(
        { length: 58 },
        (_, index) => index + 1
    ).filter(lessonNumber => fs.existsSync(path.join(
        WEB_ROOT,
        "docs",
        "canvas-progress",
        `lesson${lessonNumber}-${lessonNumber < 3 ? "job" : "review"}-ledger.json`
    )));
    const inventoryOperationIds =
        ctx.getClassicalGrammarApplicationInventory().operationIds;
    s.eq(
        "available future lessons and canonical operations cannot enter without making the generated population stale",
        {
            availableLessonNumbers:
                population.scope.populatedLessonNumbers,
            maximumLesson: population.scope.maximumLesson,
            operationIdsExact:
                JSON.stringify(population.operations)
                    === JSON.stringify(inventoryOperationIds),
        },
        {
            availableLessonNumbers,
            maximumLesson: 58,
            operationIdsExact: true,
        }
    );

    const generatorCheck = spawnSync(process.execPath, [
        ATLAS_GENERATOR_PATH,
        "--check",
        "--self-test",
        "--web-root",
        WEB_ROOT,
    ], {
        cwd: path.dirname(ATLAS_GENERATOR_PATH),
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
    });
    s.eq(
        "the committed population exactly matches deterministic generator logic",
        {
            generatorPresent: fs.existsSync(ATLAS_GENERATOR_PATH),
            status: generatorCheck.status,
            error: generatorCheck.error?.message || "",
            stderr: String(generatorCheck.stderr || "").trim(),
        },
        {
            generatorPresent: true,
            status: 0,
            error: "",
            stderr: "",
        }
    );

    s.eq(
        "a changed source digest changes both the generated population digest and its version",
        checkGeneratedVersionChangesWithSource(
            population.scope.lastPopulatedLesson
        ),
        {
            status: 0,
            sourceDigestChanged: true,
            populationDigestChanged: true,
            versionChanged: true,
            populationDigestMatchesFile: true,
        }
    );

    const transaction = checkLessonReviewAtlasTransaction();
    s.eq(
        "lesson review publication is locked, journaled, versioned, recoverable, and transactional",
        transaction,
        {
            successFacts: {
                status: 0,
                ledgerAtomCount: 1,
                packetChanged: true,
                atlasGenerated: true,
                versionGenerated: true,
                matchingDigest: true,
                transientFiles: [],
            },
            versionChangeFacts: {
                status: 0,
                atlasChanged: true,
                versionChanged: true,
            },
            rollbackFacts: {
                failed: true,
                ledger: "old-ledger\n",
                packet: "old-packet\n",
                atlas: "old-atlas\n",
                version: "old-version\n",
                transientFiles: [],
            },
            lockRefusalFacts: {
                failed: true,
                namedHolder: true,
                ledger: "old-ledger\n",
                packet: "old-packet\n",
                atlas: "old-atlas\n",
                version: "old-version\n",
                lockPreserved: true,
            },
            crashFacts: {
                status: 86,
                journalLeft: true,
                lockLeft: true,
                ledgerPartlyPublished: true,
                atlasNotYetPublished: true,
            },
            staleRecoveryFacts: {
                recoveryRunFailedAfterRecovery: true,
                ledger: "old-ledger\n",
                packet: "old-packet\n",
                atlas: "old-atlas\n",
                version: "old-version\n",
                transientFiles: [],
            },
            committedCrashFacts: {
                status: 87,
                journalLeft: true,
                lockLeft: true,
                allOutputsPublished: true,
            },
            committedRecoveryFacts: {
                recoveryRunFailedAfterRecovery: true,
                committedOutputsPreserved: true,
                transientFiles: [],
            },
        }
    );

    const indexSource = fs.readFileSync(path.join(
        WEB_ROOT,
        "index.html"
    ), "utf8");
    const browserSource = fs.readFileSync(path.join(
        WEB_ROOT,
        "src",
        "browser",
        "main.mjs"
    ), "utf8");
    const bootstrapSource = fs.readFileSync(path.join(
        WEB_ROOT,
        "src",
        "bootstrap",
        "bootstrap.mjs"
    ), "utf8");
    const atlasSource = fs.readFileSync(path.join(
        WEB_ROOT,
        "src",
        "ui",
        "diagnostics",
        "classical_grammatical_atlas.mjs"
    ), "utf8");
    const adapterSource = fs.readFileSync(path.join(
        WEB_ROOT,
        "src",
        "core",
        "grammar",
        "grammatical_atlas_population_adapter.mjs"
    ), "utf8");
    const cacheKey = currentBrowserCacheKey(indexSource);
    s.ok(
        "the browser uncached version probe keys each lazy Atlas delivery layer",
        usesBrowserCacheKey(indexSource, "src/browser/main.mjs", cacheKey)
            && usesBrowserCacheKey(browserSource, "bootstrap.mjs", cacheKey)
            && bootstrapSource.includes(
                "classical_grammatical_atlas_population_version.mjs"
            )
            && bootstrapSource.includes(
                'url.searchParams.set(\n            "cache",'
            )
            && bootstrapSource.includes("Date.now().toString(36)")
            && bootstrapSource.includes(
                'url.searchParams.set("v", populationVersion.version)'
            )
            && atlasSource.includes(
                "grammatical_atlas_population_adapter.mjs"
            )
            && atlasSource.includes(
                'adapterUrl.searchParams.set("v", version)'
            )
            && adapterSource.includes(
                "classical_grammatical_atlas_population.mjs"
            )
            && adapterSource.includes(
                'url.searchParams.set(\n    "v",\n    populationVersion.version'
            )
            && !/\bfrom\s+["'][^"']*classical_grammatical_atlas_population_version/
                .test(adapterSource)
            && !/\bfrom\s+["'][^"']*grammatical_atlas_population_adapter/
                .test(atlasSource)
    );

    return s;
}

module.exports = { run };
