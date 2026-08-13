"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function application(ctx, overrides = {}) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "mati",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        outputScope: "single",
        ...overrides,
    });
}

function typedFrame(frame) {
    return frame.resultFrame.finiteSurfaceFrame.machineryFrame.proofFrame
        .conclusion.finalTypedVncSlotFrame;
}

function run(ctx = {}) {
    const s = createSuite("classical_supportive_i_formula_annotation");
    const subject = application(ctx);
    const object = application(ctx, {
        sourceValence: "specific-projective",
        objectPerson: "3sg",
        subject: "3sg",
    });

    s.eq("subject supportive i is a derived formula annotation", {
        formula: subject.resultFrame.finiteSurfaceFrame.formulaRealization,
        annotations: ctx.getClassicalFormulaDerivedAnnotations(
            subject.resultFrame.finiteSurfaceFrame.formulaRealization,
            typedFrame(subject)
        ),
    }, {
        formula: "#ni-0(mati)0+0-0#",
        annotations: [{
            start: 2,
            end: 3,
            role: "subject-supportive-i",
            label: "supportive i · added automatically for pronunciation",
        }],
    });
    s.eq("the supportive i of third-person qui is marked", {
        formula: object.resultFrame.finiteSurfaceFrame.formulaRealization,
        annotations: ctx.getClassicalFormulaDerivedAnnotations(
            object.resultFrame.finiteSurfaceFrame.formulaRealization,
            typedFrame(object)
        ),
    }, {
        formula: "#0-0+qui-0(mati)0+0-0#",
        annotations: [{
            start: 7,
            end: 8,
            role: "object-supportive-i",
            label: "supportive i · added automatically for pronunciation",
        }],
    });
    s.eq("real stem i and ordinary qu receive no supportive annotation",
        ctx.getClassicalFormulaDerivedAnnotations(
            "#n-0+qu-0(itta)0+0-0#",
            {
                slots: {
                    subject: { pers1: "n", baseMorph: "n" },
                    prePredicate: [{
                        va1: "qu",
                        va2: "0",
                        morphIdentityFrame: {
                            supportiveSpelling: "qui",
                            supportiveVowel: "i",
                            supportiveVowelIsObjectIdentity: false,
                        },
                    }],
                    predicate: { stem: "itta" },
                },
            }
        ).filter((annotation) => annotation.role === "object-supportive-i"),
        []);

    const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");
    const rendering = fs.readFileSync(path.join(ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.ok("the formula cue keeps the formula color and uses italic Times New Roman without a legend or underline",
        css.includes(".classical-formula__derived-annotation.classical-formula__supportive-i")
        && css.includes("color: inherit")
        && css.includes('font-family: "Times New Roman", Times, serif')
        && css.includes("font-style: italic")
        && !css.includes("text-decoration: underline dotted currentColor")
        && !rendering.includes("Italic color: supportive i added automatically"));
    s.no("the derived formula annotation is implemented as a user control",
        /id="[^"]*supportive-i-annotation[^"]*"/u.test(
            fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8")
        ));
    return s;
}

module.exports = { run };
