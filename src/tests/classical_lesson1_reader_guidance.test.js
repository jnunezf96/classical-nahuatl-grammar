"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_reader_guidance");
    const groups = ctx.LESSON1_READER_GUIDANCE_GROUPS;
    const authorityPanel = ctx.ClassicalAuthorityPanel();
    const records = groups.flatMap((group) => group.records);

    s.eq("three accepted reading groups contain eighteen exact Lesson 1 atoms", {
        groupCount: groups.length,
        atomCount: records.length,
        uniqueAtomCount: new Set(records.map((record) => record.atomId)).size,
    }, {
        groupCount: 3,
        atomCount: 18,
        uniqueAtomCount: 18,
    });

    for (const record of records) {
        s.ok(`${record.atomId} is shown exactly on the normal Grammar screen`,
            authorityPanel.includes(`data-classical-reader-guidance-atom="${record.atomId}"`)
            && authorityPanel.includes(record.statement));
        const mutation = groups.map((group) => ({
            ...group,
            records: group.records.map((candidate) => candidate.atomId === record.atomId
                ? { ...candidate, statement: `broken-${candidate.statement}` }
                : candidate),
        }));
        s.ok(`${record.atomId} fails when its reading guidance is changed`,
            ctx.isLesson1ReaderGuidanceExact(groups)
            && !ctx.isLesson1ReaderGuidanceExact(mutation));
    }

    s.ok("reader guidance cannot authorize or compose a Result",
        authorityPanel.includes('data-classical-source-authorizes="none"')
        && authorityPanel.includes('data-classical-result-authorizes="none"')
        && authorityPanel.includes("They do not create, change, allow, or block a Result."));

    return s;
}

module.exports = { run };
