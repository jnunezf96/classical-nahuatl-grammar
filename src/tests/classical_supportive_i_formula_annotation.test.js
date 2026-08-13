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
        ).filter((annotation) => annotation.role === "subject-supportive-i"),
    }, {
        formula: "#ni-0(mati)0+0-0#",
        annotations: [{
            start: 2,
            end: 3,
            role: "subject-supportive-i",
            label: "supportive i",
            presentation: "supportive-i",
            lessonSections: ["§5.3.1"],
            atomIds: ["ACI-P066-L028-2D04EA9809"],
        }],
    });
    s.eq("the supportive i of third-person qui is marked", {
        formula: object.resultFrame.finiteSurfaceFrame.formulaRealization,
        annotations: ctx.getClassicalFormulaDerivedAnnotations(
            object.resultFrame.finiteSurfaceFrame.formulaRealization,
            typedFrame(object)
        ).filter((annotation) => annotation.role === "object-supportive-i"),
    }, {
        formula: "#0-0+qui-0(mati)0+0-0#",
        annotations: [{
            start: 7,
            end: 8,
            role: "object-supportive-i",
            label: "supportive i",
            presentation: "supportive-i",
            lessonSections: ["§6.4.1.a"],
            atomIds: ["ACI-P073-L011-66E6495050", "ACI-P073-L019-DF58E7CC8C"],
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

    const allKindsFormula = "ca#ni-0+qu-0(mati)0+⎕-0#e";
    const allKinds = ctx.getClassicalFormulaDerivedAnnotations(allKindsFormula, {
        objectProfile: { objectKind: "specific-projective", objectPerson: "3sg" },
        slots: {
            subject: { pers1: "ni", pers2: "0", baseMorph: "n" },
            prePredicate: [{
                kind: "dyadic-valence",
                carrier: "qu-0",
                va1: "qu",
                va2: "0",
                morphIdentityFrame: { morphIdentity: "/k/" },
            }],
            predicate: { stem: "mati", tns: "0" },
            number: { num1: "⎕", num2: "0" },
        },
    }).map((annotation) => ({
        text: allKindsFormula.slice(annotation.start, annotation.end),
        role: annotation.role,
        label: annotation.label,
        presentation: annotation.presentation,
    }));
    s.eq("silent, changed, attached, and automatically chosen material receives exact hover jobs", allKinds, [
        { text: "#", role: "right-attached-boundary", label: "attaches right", presentation: "attachment" },
        { text: "n", role: "subject-person-carrier", label: "subject person", presentation: "carrier" },
        { text: "i", role: "subject-supportive-i", label: "supportive i", presentation: "supportive-i" },
        { text: "0", role: "silent-nominative", label: "silent nominative", presentation: "silent" },
        { text: "qu", role: "object-automatic-spelling", label: "/k/ spelling", presentation: "automatic-change" },
        { text: "0", role: "object-number-carrier", label: "silent singular object number", presentation: "silent" },
        { text: "0", role: "silent-tense", label: "silent mood and tense", presentation: "silent" },
        { text: "⎕", role: "silent-number-connector", label: "silent number connector", presentation: "silent" },
        { text: "0", role: "silent-subject-number", label: "silent subject number", presentation: "silent" },
        { text: "#", role: "left-attached-boundary", label: "attaches left", presentation: "attachment" },
    ]);
    const prefixedFormula = "ah#zo #ni-0(mati)0+0-0#.";
    s.eq("a particle-internal attachment mark does not hide the later VNC annotations",
        ctx.getClassicalFormulaDerivedAnnotations(prefixedFormula, {
            slots: {
                subject: { pers1: "ni", pers2: "0", baseMorph: "n" },
                prePredicate: [],
                predicate: { stem: "mati", tns: "0" },
                number: { num1: "0", num2: "0" },
            },
        }).filter((annotation) => ["right-attached-boundary", "subject-supportive-i"].includes(annotation.role)).map((annotation) => ({
            text: prefixedFormula.slice(annotation.start, annotation.end),
            role: annotation.role,
            label: annotation.label,
        })),
        [
            { text: "#", role: "right-attached-boundary", label: "attaches right" },
            { text: "i", role: "subject-supportive-i", label: "supportive i" },
        ]);

    const inventory = fs.readFileSync(path.join(ROOT, "docs/ANDREWS_CANVAS_INVENTORY.md"), "utf8");
    const hoverAuthorities = Object.values(ctx.getClassicalFormulaHoverAuthorities());
    s.ok("every possible hover authority names an Andrews lesson section and existing atom IDs",
        hoverAuthorities.length > 0
        && hoverAuthorities.every((authority) =>
            authority.lessonSections.length > 0
            && authority.atomIds.length > 0
            && authority.atomIds.every((atomId) => inventory.includes(`| ${atomId} |`))));
    s.ok("every rendered hover receives authority from that checked registry",
        allKinds.length > 0
        && ctx.getClassicalFormulaDerivedAnnotations(allKindsFormula, {
            objectProfile: { objectKind: "specific-projective", objectPerson: "3sg" },
            slots: {
                subject: { pers1: "ni", pers2: "0", baseMorph: "n" },
                prePredicate: [{
                    kind: "dyadic-valence",
                    carrier: "qu-0",
                    va1: "qu",
                    va2: "0",
                    morphIdentityFrame: { morphIdentity: "/k/" },
                }],
                predicate: { stem: "mati", tns: "0" },
                number: { num1: "⎕", num2: "0" },
            },
        }).every((annotation) =>
            annotation.lessonSections.length > 0
            && annotation.atomIds.length > 0
            && hoverAuthorities.some((authority) => authority.atomIds === annotation.atomIds)));

    const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");
    const rendering = fs.readFileSync(path.join(ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.ok("derived formula cues remain hoverable while only supportive i uses italic Fraunces",
        css.includes(".classical-formula__derived-annotation")
        && css.includes(".classical-formula__derived-annotation--supportive-i")
        && css.includes("color: inherit")
        && css.includes("cursor: pointer")
        && css.includes("font-family: var(--font-title)")
        && css.includes("font-style: italic")
        && !css.includes(".classical-formula__derived-annotation--supportive-i,\n.classical-formula__derived-annotation--silent")
        && !css.includes("text-decoration: underline dotted currentColor")
        && !rendering.includes("Italic color: supportive i added automatically"));
    s.ok("the Diagram view reuses the same exact Formula annotation authority",
        rendering.includes("function renderClassicalDiagramDerivedAnnotations(")
        && rendering.includes("getClassicalFormulaDerivedAnnotations(fullFormula, typedSlotFrame)")
        && rendering.includes("renderClassicalDerivedAnnotationRanges(element, text, mapped)")
        && rendering.includes("renderClassicalDiagramDerivedAnnotations(")
        && rendering.includes("specificLinearFormula")
        && rendering.includes("specificLinearTypedSlotFrame")
        && rendering.includes("classicalDerivedAnnotationLessons")
        && rendering.includes("classicalDerivedAnnotationAtoms"));
    s.no("the derived formula annotation is implemented as a user control",
        /id="[^"]*supportive-i-annotation[^"]*"/u.test(
            fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8")
        ));
    return s;
}

module.exports = { run };
