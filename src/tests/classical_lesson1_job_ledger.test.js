"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson1_job_ledger");
    const atomLedger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "ANDREWS_ATOM_LEDGER.json"),
        "utf8"
    ));
    const jobLedger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", "lesson1-job-ledger.json"),
        "utf8"
    ));
    const atomIdIndex = atomLedger.codebook.atomTuple.indexOf("atomId");
    const sectionIndex = atomLedger.codebook.atomTuple.indexOf("canvasSection");
    const lesson1AtomIds = atomLedger.atoms
        .filter((atom) => /^§1\./u.test(atom[sectionIndex]))
        .map((atom) => atom[atomIdIndex]);
    const jobAtomIds = jobLedger.records.map((record) => record.atomId);

    s.eq(
        "all current Lesson 1 atoms receive exactly one job in Canvas order",
        {
            sourceCount: lesson1AtomIds.length,
            jobCount: jobAtomIds.length,
            uniqueJobs: new Set(jobAtomIds).size,
            sameOrder: JSON.stringify(lesson1AtomIds)
                === JSON.stringify(jobAtomIds),
            unassigned: jobLedger.counts.unassignedJobs,
        },
        {
            sourceCount: 854,
            jobCount: 854,
            uniqueJobs: 854,
            sameOrder: true,
            unassigned: 0,
        }
    );

    s.eq(
        "the accepted whole-lesson four-job model accounts for every atom",
        jobLedger.counts.byJobType,
        {
            BUILD_GRAMMAR: 113,
            BUILD_CODE_MODEL: 264,
            CHECK_GRAMMAR: 154,
            PROTECT_GRAMMAR: 323,
        }
    );

    const accepted = jobLedger.records.filter(record =>
        record.acceptanceStatus
            === "exactly-observed-normal-application-behavior"
        || record.acceptanceStatus
            === "accepted-reader-interpreter-guidance-observed"
    );
    s.eq(
        "only accepted review spans earn exact Lesson 1 credit",
        {
            acceptedJobs: jobLedger.counts.acceptedJobs,
            pendingJobs: jobLedger.counts.pendingJobs,
            acceptedSections: [...new Set(
                accepted.map(record => record.canvasSection.match(/^§1\.\d+/u)?.[0])
            )],
            acceptedByJobType: jobLedger.counts.acceptedByJobType,
            section111Progress: {
                accepted: jobLedger.records.filter(record =>
                    record.canvasSection.startsWith("§1.11")
                    && record.acceptanceStatus
                        === "exactly-observed-normal-application-behavior"
                ).length,
                total: jobLedger.records.filter(record =>
                    record.canvasSection.startsWith("§1.11")
                ).length,
            },
            acceptedWithoutObservation: accepted
                .filter(record => (
                    !record.observationKind
                    || !record.observationTest
                    || !record.mutationTest
                ))
                .map(record => record.atomId),
        },
        {
            acceptedJobs: 854,
            pendingJobs: 0,
            acceptedSections: [
                "§1.1",
                "§1.2",
                "§1.3",
                "§1.4",
                "§1.5",
                "§1.6",
                "§1.7",
                "§1.8",
                "§1.9",
                "§1.10",
                "§1.11",
                "§1.12",
                "§1.13",
            ],
            acceptedByJobType: {
                BUILD_GRAMMAR: 113,
                BUILD_CODE_MODEL: 264,
                CHECK_GRAMMAR: 154,
                PROTECT_GRAMMAR: 323,
            },
            section111Progress: { accepted: 135, total: 135 },
            acceptedWithoutObservation: [],
        }
    );

    s.eq(
        "evidence checks grammar but never becomes grammar authority",
        jobLedger.records
            .filter((record) => record.sourceForce === "evidence")
            .filter((record) => record.jobType !== "CHECK_GRAMMAR")
            .map((record) => record.atomId),
        []
    );

    s.eq(
        "Lesson 1 reading guidance cannot be mistaken for Result-writing grammar",
        {
            readerOnly: jobLedger.counts.byDirectionClass.READING_ONLY,
            both: jobLedger.counts.byDirectionClass.BOTH,
            writingOnly: jobLedger.counts.byDirectionClass.WRITING_ONLY,
            wrongSection: jobLedger.records
                .filter(record => record.directionClass === "READING_ONLY")
                .filter(record => !record.canvasSection.startsWith("§1.13"))
                .map(record => record.atomId),
            writesResult: jobLedger.records
                .filter(record => record.directionClass === "READING_ONLY")
                .filter(record => record.jobType === "BUILD_GRAMMAR")
                .map(record => record.atomId),
            composesResult: jobLedger.records
                .filter(record => record.directionClass === "READING_ONLY")
                .filter(record => !record.normalApplicationRequirement.includes(
                    "must not compose, select, or change a Result"
                ))
                .map(record => record.atomId),
        },
        {
            readerOnly: 255,
            both: 599,
            writingOnly: 0,
            wrongSection: [],
            writesResult: [],
            composesResult: [],
        }
    );

    s.eq(
        "every Lesson 1 atom has its complete direction assignment",
        {
            writing: jobLedger.counts.byDirection.WRITING,
            readingAndInterpretation:
                jobLedger.counts.byDirection.READING_AND_INTERPRETATION,
            invalidDirections: jobLedger.records
                .filter(record => !Array.isArray(record.directions)
                    || record.directions.length === 0
                    || record.directions.some(direction => ![
                        "WRITING",
                        "READING_AND_INTERPRETATION",
                    ].includes(direction)))
                .map(record => record.atomId),
            readerStatus: jobLedger.counts.byReaderStatus,
            presentedWithoutProof: jobLedger.records
                .filter(record => record.directionStatus.READING_AND_INTERPRETATION
                    === "EXACTLY_PRESENTED")
                .filter(record => !record.readerObservationTest || !record.readerMutationTest)
                .map(record => record.atomId),
        },
        {
            writing: 599,
            readingAndInterpretation: 854,
            invalidDirections: [],
            readerStatus: {
                EXACTLY_PRESENTED: 18,
                JOB_ASSIGNED_NOT_YET_PRESENTED: 836,
            },
            presentedWithoutProof: [],
        }
    );

    s.eq(
        "every real grammar job retains a canonical semantic owner",
        jobLedger.records
            .filter((record) => record.jobType === "BUILD_GRAMMAR")
            .filter((record) => !record.targetOwnerId)
            .map((record) => record.atomId),
        []
    );

    s.eq(
        "every atom states the normal application behavior required before acceptance",
        jobLedger.records
            .filter((record) => !record.normalApplicationRequirement)
            .map((record) => record.atomId),
        []
    );

    return s;
}

module.exports = { run };
