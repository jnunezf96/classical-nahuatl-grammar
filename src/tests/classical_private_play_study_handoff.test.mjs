import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const shell = await readFile(
  new URL("../ui/shell/classical_shell.mjs", import.meta.url),
  "utf8",
);
const recorder = await readFile(
  new URL("../ui/diagnostics/classical_session_recorder.mjs", import.meta.url),
  "utf8",
);
const style = await readFile(new URL("../../style.css", import.meta.url), "utf8");
const privacy = await readFile(
  new URL("../../privacy.html", import.meta.url),
  "utf8",
);

assert.ok(shell.includes('id="classical-session-recorder-entry"'));
assert.ok(shell.includes('id="classical-session-recorder-setup"'));
assert.ok(shell.includes("Private play study"));
assert.ok(shell.includes("explore on your own"));
assert.ok(shell.includes("give the JSON file to the person who invited you"));
assert.ok(shell.includes(
  "return ClassicalSessionRecorderEntry() + ClassicalCompositionPathSummary()",
));
assert.match(
  style,
  /data-classical-session-recorder-available="true"[\s\S]*classical-session-recorder-entry:not\(\[hidden\]\)/u,
);
assert.match(style, /classical-session-recorder-entry\[hidden\]/u);
assert.ok(recorder.includes('current.studyEntry.hidden = !available'));
assert.ok(recorder.includes('if (advanced) advanced.open = true'));
assert.ok(recorder.includes("current.section?.scrollIntoView?."));
assert.ok(recorder.includes("current.consent?.focus?."));
assert.ok(recorder.includes("Download the JSON"));
assert.ok(privacy.includes("give the downloaded JSON file to that person"));
assert.equal(shell.includes("upload the recording"), false);
assert.equal(recorder.includes("fetch("), false);

process.stdout.write(
  "[PASS] classical_private_play_study_handoff: visible study entrance, focused setup, and explicit local return loop\n",
);
