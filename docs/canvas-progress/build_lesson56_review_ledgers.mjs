import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sourceLedger = JSON.parse(fs.readFileSync(path.join(root, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
const tupleKeys = sourceLedger.codebook.atomTuple;
const atomObjects = sourceLedger.atoms.map(tuple => Object.fromEntries(tupleKeys.map((key, index) => [key, tuple[index]])));

const lesson5Groups = [
  {
    groupId: "lesson5-intransitive-vnc-structure",
    title: "Intransitive VNC structure",
    sections: ["§5.1", "§5.2"],
    writingJob: "Build an intransitive VNC as #pers1-pers2(STEM)tns+num1-num2# while keeping Valence grammatically present but vacant.",
    readingJob: "Show how Subject and Predicate surround the stem and explain that unwritten Valence is still grammatically present.",
    decisionSplit: "The user supplies an intransitive source or valence; the application selects the intransitive formula and preserves its implicit Valence position.",
    controlPolicy: "Reuse the Source VNC Valence choice. Do not add a formula or empty-Valence control.",
    proposal: "Make the intransitive formula the automatic normal Result for an intransitive VNC source.",
  },
  {
    groupId: "lesson5-morph-carrier-and-spelling",
    title: "Morphs, carriers, and spelling",
    sections: ["§5.3"],
    writingJob: "Keep a grammatical morph distinct from its spoken, written, or silent carrier, and do not turn spelling variants into separate grammar.",
    readingJob: "Explain regular variants, real morphic variants, spelling variants, silent carriers, and Andrews's slash and tilde notation.",
    decisionSplit: "The user supplies the intended source; the application preserves morph identity and chooses its contextual carrier and spelling.",
    controlPolicy: "Do not add a spelling-variant control. Contextual realization and notation are application and reading-guide duties.",
    proposal: "Make morph identity part of the typed analysis while treating spelling as its contextual realization.",
  },
  {
    groupId: "lesson5-subject-person-fillers",
    title: "Subject person forms",
    sections: ["§5.3.1"],
    writingJob: "Select the authorized pers1 subject filler, supportive i, optative x, and second-plural nasal realization from person, number, mood, and the following sound.",
    readingJob: "Help the reader recover person and number from pers1 even where visible forms are homophonous or assimilated.",
    decisionSplit: "The user chooses subject person and number; the application derives supportive vowels, optative forms, assimilation, and the disambiguating number suffix.",
    controlPolicy: "Reuse the subject control. Do not expose supportive vowels, nasal assimilation, or pers1 allomorphs as separate choices.",
    proposal: "Make subject person and number the only user choices while the application realizes the exact pers1 carrier.",
  },
  {
    groupId: "lesson5-subject-case-filler",
    title: "Subject case and silent nominative",
    sections: ["§5.3.2"],
    writingJob: "Fill pers2 with the silently present nominative zero morph for every VNC subject.",
    readingJob: "Help the reader see silent nominative case as a real grammatical morph rather than an absence of grammar.",
    decisionSplit: "The subject function determines nominative case; the application supplies pers2=0 automatically.",
    controlPolicy: "Do not add a case control for an ordinary VNC subject.",
    proposal: "Keep nominative case structurally present and automatically realized by zero.",
  },
  {
    groupId: "lesson5-subject-number-connector",
    title: "Subject number connector",
    sections: ["§5.3.3", "§5.3.3.a", "§5.3.3.b", "§5.3.3.c"],
    writingJob: "Choose num1 from tense, mood, verbstem class, following number, and the licensed regular, supportive, or silent realization.",
    readingJob: "Show that c, qu, qui, and square zero are number-connector realizations rather than tense morphs.",
    decisionSplit: "The user chooses grammatical tense, mood, and subject number; the application derives num1.",
    controlPolicy: "Do not add a number-connector or silent-variant control.",
    proposal: "Make num1 an automatic bridge between the predicate and final subject number.",
  },
  {
    groupId: "lesson5-subject-number-suffix",
    title: "Definitive subject number suffix",
    sections: ["§5.3.4", "§5.3.4.a", "§5.3.4.b"],
    writingJob: "Realize singular or common number with zero and select h, eh, an, in, or ih for plural from the active mood-tense pattern.",
    readingJob: "Use num2 as the definitive number locus and read its variant together with num1.",
    decisionSplit: "The user chooses subject number; the application derives the licensed num2 carrier.",
    controlPolicy: "Reuse the subject-number choice. Do not expose suffix variants separately.",
    proposal: "Make num2 the final automatic statement of subject number.",
  },
  {
    groupId: "lesson5-subject-paradigms",
    title: "Complete VNC subject paradigms",
    sections: ["§5.4", "§5.4.1", "§5.4.2", "§5.4.3", "§5.4.4"],
    writingJob: "Build every subject person-number form through the four Canvas mood-tense paradigms, including common third person and all licensed silent variants.",
    readingJob: "Guide the reader from a complete subject dyad to its possible participant interpretation without importing English gender into Nahuatl grammar.",
    decisionSplit: "The user chooses subject, mood, and tense; the application selects the paradigm and complete distributed subject form.",
    controlPolicy: "Reuse subject, mood, and tense. Do not add a paradigm-number picker.",
    proposal: "Make the four paradigms automatic consequences of ordinary grammatical choices.",
  },
  {
    groupId: "lesson5-verbstem-categories",
    title: "Verbstem meaning, valence, voice, and aspect",
    sections: ["§5.5", "§5.5.1"],
    writingJob: "Keep lexical meaning, valence, voice, and aspect in the verbstem and require a real perfective realization even where its formation is not predictable.",
    readingJob: "Guide the reader through active and nonactive voice, imperfective and perfective aspect, and the eight contrasting stem kinds.",
    decisionSplit: "The user chooses a genuine construction or voice where available; lexical stem facts and required aspect shape remain application duties.",
    controlPolicy: "Reuse Source, valence, voice, and applicable derivation controls. Never offer evidence absence as a no-form choice.",
    proposal: "Make the typed verbstem the source of lexical meaning and all required stem-category distinctions.",
  },
  {
    groupId: "lesson5-mood-tense-system",
    title: "Mood, tense, aspect, and tense morphs",
    sections: ["§5.5.2"],
    writingJob: "Allow only the Canvas mood-tense-aspect combinations and realize the exact tense morph in the tns slot.",
    readingJob: "Distinguish grammatical tense from real-world time and preserve the licensed translation ranges and ambiguous silent-number dyad.",
    decisionSplit: "The user chooses a genuine mood and tense; the application limits choices by aspect and class and supplies the tns carrier.",
    controlPolicy: "Reuse mood and tense controls with Canvas-based availability. Do not expose tense morphs or English translations as grammar choices.",
    proposal: "Make mood and tense genuine choices whose available combinations and morphs are enforced by the application.",
  },
];

const lesson6Groups = [
  ["lesson6-object-category-system", "Object categories and transitive Valence", ["§6.1"]],
  ["lesson6-monadic-valence", "Monadic Valence: ne, te, and tla", ["§6.2", "§6.2.1", "§6.2.2", "§6.2.2.a", "§6.2.2.b"]],
  ["lesson6-dyadic-valence", "Dyadic specific projective Valence", ["§6.3"]],
  ["lesson6-third-person-va1", "Third-person projective va1", ["§6.4", "§6.4.1", "§6.4.1.a"]],
  ["lesson6-projective-va1-va2", "Nonthird va1 and projective va2", ["§6.4.1.b", "§6.4.2", "§6.4.2.a", "§6.4.2.b"]],
  ["lesson6-projective-object-paradigm", "Specific projective-object paradigm", ["§6.5"]],
  ["lesson6-reflexive-object-structure", "Mainline reflexive and reciprocal structure", ["§6.6", "§6.6.1", "§6.6.2"]],
  ["lesson6-reflexive-object-paradigm", "Reflexive and reciprocal object paradigm", ["§6.7"]],
].map(([groupId, title, sections]) => ({
  groupId, title, sections,
  writingJob: "Apply the exact Lesson 6 object rule represented by this group through the canonical transitive VNC path.",
  readingJob: "Guide the reader through the object structure, interpretation, and contextual realization represented by this group.",
  decisionSplit: "The user supplies genuine participant and trajectory choices; the application derives object slots, carriers, boundaries, and restrictions.",
  controlPolicy: "Reuse applicable valence and object choices; do not expose derived carriers or formula structure as user choices.",
  proposal: `Make ${title.toLowerCase()} part of the normal transitive VNC application.`,
}));

function buildLesson(lesson, groups) {
  const decisionsPath = path.join(root, `docs/canvas-progress/lesson${lesson}-review-decisions.json`);
  const proofPath = path.join(root, `docs/canvas-progress/lesson${lesson}-implementation-proof.json`);
  const decisions = fs.existsSync(decisionsPath) ? JSON.parse(fs.readFileSync(decisionsPath, "utf8")) : { decisions: {} };
  const proof = fs.existsSync(proofPath) ? JSON.parse(fs.readFileSync(proofPath, "utf8")) : { groups: {} };
  const lessonAtoms = atomObjects.filter(atom => String(atom.canvasSection).startsWith(`§${lesson}.`));
  const records = lessonAtoms.map(atom => {
    const group = groups.find(candidate => candidate.sections.includes(atom.canvasSection));
    if (!group) throw new Error(`unassigned:${atom.atomId}`);
    const status = decisions.decisions?.[group.groupId]?.status || "AWAITING_REVIEW";
    const exact = proof.groups?.[group.groupId]?.status === "EXACTLY_OBSERVED";
    const direction = atom.force === "grammar-bearing" ? "BOTH" : "READING_ONLY";
    return {
      atomId: atom.atomId,
      canvasSection: atom.canvasSection,
      canvasSpan: atom.canvasSpan,
      meaning: atom.meaning,
      sourceForce: atom.force,
      sourceCategory: atom.category,
      semanticOwnerId: atom.semanticOwnerId,
      reviewGroupId: group.groupId,
      proposedDirection: direction,
      proposedWritingJob: direction === "BOTH" ? group.writingJob : "NOT_A_WRITING_JOB",
      proposedReaderJob: direction === "BOTH" ? "GUIDE_READING_AND_INTERPRETATION" : "GUIDE_ANALYSIS_WITHOUT_AUTHORIZING_A_RESULT",
      proposedDecisionSplit: group.decisionSplit,
      proposedControlPolicy: group.controlPolicy,
      reviewStatus: status,
      acceptedJob: status === "ACCEPTED" ? decisions.decisions[group.groupId].acceptedJob : "",
      implementationCredit: status === "ACCEPTED" && exact ? "EXACTLY_OBSERVED" : "PENDING",
      writingObservationTest: direction === "BOTH" && exact ? proof.groups[group.groupId].writingTest + `#${atom.atomId}` : "",
      writingMutationTest: direction === "BOTH" && exact ? proof.groups[group.groupId].writingTest + `#mutation:${atom.atomId}` : "",
      readerGuidanceIdeaId: group.groupId,
      readerObservationTest: exact ? proof.groups[group.groupId].readerTest + `#${atom.atomId}` : "",
      readerMutationTest: exact ? proof.groups[group.groupId].readerTest + `#mutation:${atom.atomId}` : "",
    };
  });
  const groupRows = groups.map((group, index) => {
    const members = records.filter(record => record.reviewGroupId === group.groupId);
    return {
      groupNumber: index + 1,
      batchNumber: Math.floor(index / 3) + 1,
      ...group,
      atomCount: members.length,
      proposedBoth: members.filter(record => record.proposedDirection === "BOTH").length,
      proposedReadingOnly: members.filter(record => record.proposedDirection === "READING_ONLY").length,
      reviewStatus: decisions.decisions?.[group.groupId]?.status || "AWAITING_REVIEW",
      exactlyObserved: members.filter(record => record.implementationCredit === "EXACTLY_OBSERVED").length,
    };
  });
  const ledger = {
    schemaVersion: 1,
    kind: "classical-nahuatl-lesson-atom-job-review",
    lesson,
    source: "ANDREWS_TRANSCRIPTION_CANVAS.md",
    authority: {
      canvasAndAtomsAuthorizeGrammar: true,
      reviewLedgerAuthorizesGrammar: false,
      automationMayInventGrammar: false,
      implementationCreditRequiresAcceptedWorkingExactJob: true,
    },
    counts: {
      atoms: records.length,
      uniqueAtoms: new Set(records.map(record => record.atomId)).size,
      groups: groups.length,
      batches: Math.ceil(groups.length / 3),
      proposedBoth: records.filter(record => record.proposedDirection === "BOTH").length,
      proposedReadingOnly: records.filter(record => record.proposedDirection === "READING_ONLY").length,
      acceptedAtoms: records.filter(record => record.reviewStatus === "ACCEPTED").length,
      declinedAtoms: records.filter(record => record.reviewStatus === "DECLINED").length,
      awaitingReview: records.filter(record => record.reviewStatus === "AWAITING_REVIEW").length,
      implementationCredit: records.filter(record => record.implementationCredit === "EXACTLY_OBSERVED").length,
    },
    groups: groupRows,
    records,
  };
  fs.writeFileSync(path.join(root, `docs/canvas-progress/lesson${lesson}-review-plan.json`), JSON.stringify({ schemaVersion: 1, lesson, groupsPerBatch: 3, groups }, null, 2) + "\n");
  fs.writeFileSync(path.join(root, `docs/canvas-progress/lesson${lesson}-review-ledger.json`), JSON.stringify(ledger, null, 2) + "\n");
}

const requestedLesson = process.argv.find(argument => argument.startsWith("--lesson="))
  ?.split("=")[1] || "5";
if (requestedLesson === "5") buildLesson(5, lesson5Groups);
else if (requestedLesson === "6") buildLesson(6, lesson6Groups);
else throw new Error(`unsupported-lesson:${requestedLesson}`);
