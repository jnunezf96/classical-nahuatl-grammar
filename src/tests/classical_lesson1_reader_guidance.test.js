"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_reader_guidance");
    const groups = ctx.LESSON1_READER_GUIDANCE_GROUPS;
    const authorityPanel = ctx.ClassicalAuthorityPanel();
    const records = groups.flatMap((group) => group.records);
    const ledger = JSON.parse(fs.readFileSync(path.resolve(
        __dirname,
        "../../docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const style = fs.readFileSync(path.resolve(__dirname, "../../style.css"), "utf8");
    const ledgerByAtomId = new Map(ledger.records.map((record) => [record.atomId, record]));

    s.eq("six accepted reading groups contain forty-five exact Lesson 1 atoms", {
        groupCount: groups.length,
        atomCount: records.length,
        uniqueAtomCount: new Set(records.map((record) => record.atomId)).size,
    }, {
        groupCount: 6,
        atomCount: 45,
        uniqueAtomCount: 45,
    });

    for (const group of groups) {
        const atomIds = group.records.map((record) => record.atomId);
        s.ok(`${group.ideaId} is one collapsed idea on the normal Grammar screen`,
            authorityPanel.includes(`data-classical-reader-guidance-group="${group.ideaId}"`)
            && authorityPanel.includes(`data-classical-reader-guidance-atoms="${atomIds.join(" ")}"`)
            && authorityPanel.includes(`data-classical-reader-guidance-idea="${group.ideaId}"`)
            && authorityPanel.includes(group.guidance));
        s.eq(`${group.ideaId} keeps exact atom-to-idea bookkeeping`,
            atomIds.map((atomId) => ledgerByAtomId.get(atomId)?.readerGuidanceIdeaId || ""),
            atomIds.map(() => group.ideaId));
    }

    s.eq("the forty-five atom statements are collapsed out of the visible screen",
        records.filter((record) => authorityPanel.includes(record.statement)).map((record) => record.atomId),
        []);

    s.ok("the visible guide contains no atom bookkeeping language",
        !authorityPanel.includes("exact Lesson 1 atoms")
        && !authorityPanel.includes("support this idea")
        && authorityPanel.includes("These ideas help with reading and interpretation."));

    s.ok("the guide uses spaced cards with a responsive two-to-one-column layout",
        style.includes(".classical-reader-guidance__card")
        && style.includes("grid-template-columns: repeat(2, minmax(0, 1fr))")
        && style.includes("grid-template-columns: minmax(0, 1fr)")
        && style.includes("gap: 12px")
        && style.includes("padding: 14px 15px"));

    for (const record of records) {
        const mutation = groups.map((group) => ({
            ...group,
            records: group.records.filter((candidate) => candidate.atomId !== record.atomId),
        }));
        s.ok(`${record.atomId} fails when removed from its idea`,
            ctx.isLesson1ReaderGuidanceExact(groups)
            && !ctx.isLesson1ReaderGuidanceExact(mutation));
    }

    s.ok("reader guidance cannot authorize or compose a Result",
        authorityPanel.includes('data-classical-source-authorizes="none"')
        && authorityPanel.includes('data-classical-result-authorizes="none"')
        && authorityPanel.includes("They do not change the Result."));

    return s;
}

module.exports = { run };
