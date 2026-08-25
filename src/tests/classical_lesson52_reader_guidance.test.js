"use strict";
const fs = require("fs"); const path = require("path"); const { createSuite } = require("./runner"); const ROOT = path.resolve(__dirname, "..", "..");
function run(ctx = {}) {
  const s = createSuite("classical_lesson52_reader_guidance");
  const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson52-review-ledger.json"), "utf8"));
  const plan = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson52-review-plan.json"), "utf8"));
  const records = ledger.records.filter(record => record.implementationCredit === "EXACTLY_OBSERVED" && record.reviewStatus === "IMPLEMENTATION_PROVEN");
  const ideas = ctx.LESSON52_READER_GUIDANCE_GROUPS; const panel = ctx.ClassicalAuthorityPanel(); const start = panel.indexOf('data-classical-reader-guidance-lesson="52"'); const html = panel.slice(start, panel.indexOf("</details>", start) + 10);
  s.eq("Lesson 52 guidance covers the exact technical-proof groups", { guidance: ideas.map(group => group.ideaId), plan: plan.groups.map(group => group.groupId), ledgerGroups: [...new Set(records.map(record => record.reviewGroupId))], atoms: records.length }, { guidance: plan.groups.map(group => group.groupId), plan: plan.groups.map(group => group.groupId), ledgerGroups: plan.groups.map(group => group.groupId), atoms: 896 });
  for (const group of ideas) { const matches = records.filter(record => record.reviewGroupId === group.ideaId); s.ok(`Lesson 52 ${group.ideaId} guidance is delivered`, matches.length > 0 && matches.every(record => record.readerGuidanceIdeaId === group.ideaId && record.readerObservationTest.includes("classical_lesson52_reader_guidance.test.js")) && html.includes(`data-classical-reader-guidance-group="${group.ideaId}"`)); }
  s.ok("Lesson 52 guidance remains non-authoritative", !html.includes('grammarAuthority="true"') && ledger.authority.reviewLedgerAuthorizesGrammar === false && ctx.isLesson52ReaderGuidanceExact(ideas));
  return s;
}
module.exports = { run };
