"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lessons7_10_clickable_cues");
    const build = (overrides = {}) => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem: "huetz",
        valence: "intransitive",
        subject: "2sg",
        verbClass: "B",
        mood: "indicative",
        tense: "present",
        ...overrides,
    });
    const cueRows = (frame) => {
        const formula = frame.sentenceFormulaDisplay;
        const typedFrame = frame.machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame;
        const grammarContext = {
            ...frame.machineryFrame,
            mood: frame.state?.mood,
            tense: frame.state?.tense,
            sentenceSurfaceFrame: frame.sentenceSurfaceFrame,
        };
        return ctx.getClassicalFormulaDerivedAnnotations(formula, typedFrame, grammarContext)
            .map((cue) => ({
                text: formula.slice(cue.start, cue.end),
                role: cue.role,
                label: cue.label,
                lessons: cue.lessonSections,
            }));
    };

    const directional = cueRows(build({ directionalPrefix: "huāl" }));
    const analyzedStem = cueRows(build({ stem: "chip-ā-hua", verbClass: "A" }));
    const emphatic = cueRows(build({ sentenceType: "emphatic-assertion" }));
    const cuix = cueRows(build({ sentenceType: "yes-no-question", questionMode: "cuix" }));
    const wish = cueRows(build({ stem: "cochi", subject: "1sg", mood: "optative", tense: "nonpast", introductoryParticle: "mā" }));
    const futureCommand = cueRows(build({ stem: "tequi-ti", mood: "optative", tense: "future", sentenceType: "command-sentence", introductoryParticle: "mā" }));
    const admonition = cueRows(build({ mood: "admonitive", tense: "nonpast", introductoryParticle: "mā", introductoryModifier: "nēn", negative: true }));

    const hasCue = (rows, text, label) => rows.some((row) => row.text === text && row.label === label);
    s.eq("Lesson 7.1 identifies pieces inside an analyzed verbstem without inventing separate meanings", {
        morphs: analyzedStem.filter((row) => row.label === "verbstem morph")
            .map(({ role: _role, ...row }) => row),
        boundaries: analyzedStem.filter((row) => row.label === "stem morph boundary")
            .map(({ role: _role, ...row }) => row),
        innerClassClaims: analyzedStem.filter((row) => (
            row.role === "stem-internal-morph" && /Class [A-D]/u.test(row.label)
        )),
    }, {
        morphs: [
            { text: "chip", label: "verbstem morph", lessons: ["§7.1"] },
            { text: "ā", label: "verbstem morph", lessons: ["§7.1"] },
            { text: "hua", label: "verbstem morph", lessons: ["§7.1"] },
        ],
        boundaries: [
            { text: "-", label: "stem morph boundary", lessons: ["§7.1"] },
            { text: "-", label: "stem morph boundary", lessons: ["§7.1"] },
        ],
        innerClassClaims: [],
    });
    s.ok("Lesson 8 direction, emphasis, and question material has exact clickable jobs",
        hasCue(directional, "huāl", "direction toward here")
        && hasCue(emphatic, "ca", "emphatic assertion")
        && hasCue(cuix, "cuix", "yes-no question"));
    s.ok("Lesson 9 wish and command material has exact clickable jobs",
        hasCue(wish, "mā", "wish introducer")
        && wish.some((row) => row.label === "silent wish mood and tense")
        && hasCue(futureCommand, "mā", "command introducer")
        && futureCommand.some((row) => row.label === "future command"));
    s.ok("Lesson 10 admonition material has exact clickable jobs",
        hasCue(admonition, "mā", "admonition introducer")
        && hasCue(admonition, "nēn", "admonition strengthener")
        && hasCue(admonition, "ah", "cancels the admonition")
        && admonition.some((row) => row.label === "silent admonitive mood and tense")
        && admonition.some((row) => row.label === "silent admonitive number connector"));

    const inventory = fs.readFileSync(path.join(ROOT, "docs/ANDREWS_CANVAS_INVENTORY.md"), "utf8");
    const authorities = Object.values(ctx.getClassicalFormulaHoverAuthorities());
    s.ok("every new click message remains backed by Andrews sections and atom IDs",
        authorities.every((authority) => authority.lessonSections.length > 0
            && authority.atomIds.length > 0
            && authority.atomIds.every((atomId) => inventory.includes(`| ${atomId} |`))));

    const rendering = fs.readFileSync(path.join(ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.ok("the normal Formula and Diagram renderers receive the same Lesson 7-10 cue context",
        rendering.includes("derivedAnnotationGrammarContext")
        && rendering.includes("sentenceSurfaceFrame: Object.freeze({")
        && rendering.includes("sentenceCanvasRole: surfaceFrame.sentenceCanvasRole")
        && rendering.includes("renderClassicalDiagramDerivedAnnotations(")
        && rendering.includes('["stem-morph-boundary", "stem-constituent-boundary"].includes(annotation.role)')
        && rendering.includes('role.includes("directional")'));
    s.no("the new cues add a user control",
        /id="[^"]*(?:directional-cue|wish-cue|command-cue|admonition-cue)[^"]*"/u.test(
            fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8")
        ));
    return s;
}

module.exports = { run };
