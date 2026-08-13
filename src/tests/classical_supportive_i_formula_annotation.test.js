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

function annotations(ctx, frame) {
    return ctx.getClassicalFormulaDerivedAnnotations(
        frame.resultFrame.finiteSurfaceFrame.formulaRealization,
        typedFrame(frame)
    );
}

function run(ctx = {}) {
    const s = createSuite("classical_supportive_i_formula_annotation");
    const subject = application(ctx);
    const object = application(ctx, {
        sourceValence: "specific-projective",
        objectPerson: "3sg",
        subject: "3sg",
    });
    const secondPersonObject = application(ctx, {
        sourceValence: "specific-projective",
        objectPerson: "2sg",
        subject: "3sg",
    });
    const nonspecificHumanObject = application(ctx, {
        sourceValence: "projective-human",
        subject: "3sg",
    });
    const nonspecificNonhumanObject = application(ctx, {
        sourceValence: "projective-nonhuman",
        subject: "3sg",
    });
    const reflexiveObject = application(ctx, {
        sourceValence: "mainline-reflexive",
        subject: "3sg",
    });
    const assimilatedPluralObject = application(ctx, {
        sourceValence: "specific-projective",
        objectPerson: "3pl",
        subject: "1pl",
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
    s.eq("every object hover names the carrier's grammatical job", {
        thirdPerson: annotations(ctx, object)
            .filter((annotation) => annotation.role.includes("object"))
            .map((annotation) => annotation.label),
        secondPerson: annotations(ctx, secondPersonObject)
            .filter((annotation) => annotation.role.includes("object") || annotation.role.includes("objective"))
            .map((annotation) => annotation.label),
        nonspecificHuman: annotations(ctx, nonspecificHumanObject)
            .filter((annotation) => annotation.role.includes("object"))
            .map((annotation) => annotation.label),
        nonspecificNonhuman: annotations(ctx, nonspecificNonhumanObject)
            .filter((annotation) => annotation.role.includes("object"))
            .map((annotation) => annotation.label),
        reflexive: annotations(ctx, reflexiveObject)
            .filter((annotation) => annotation.role.includes("object") || annotation.role.includes("objective"))
            .map((annotation) => annotation.label),
    }, {
        thirdPerson: ["third-person objective object", "supportive i", "silent singular object number"],
        secondPerson: ["object person and number", "objective case"],
        nonspecificHuman: ["nonspecific human object"],
        nonspecificNonhuman: ["nonspecific nonhuman object"],
        reflexive: ["reflexive object person and number", "objective case"],
    });
    s.no("Formula hovers substitute spelling or sound-process labels for grammatical jobs",
        [object, secondPersonObject, nonspecificHumanObject, nonspecificNonhumanObject, reflexiveObject]
            .flatMap((frame) => annotations(ctx, frame))
            .some((annotation) => /automatic|spelling|sound change/u.test(annotation.label)));
    const assimilatedFormula = assimilatedPluralObject.resultFrame.finiteSurfaceFrame.formulaRealization;
    const assimilatedAnnotations = annotations(ctx, assimilatedPluralObject);
    s.eq("the final assimilated object form, stem, and every Andrews formula boundary receive jobs", {
        formula: assimilatedFormula,
        objectJobs: assimilatedAnnotations
            .filter((annotation) => annotation.role.includes("object"))
            .map((annotation) => ({
                text: assimilatedFormula.slice(annotation.start, annotation.end),
                label: annotation.label,
            })),
        uncovered: Array.from(assimilatedFormula).flatMap((character, index) =>
            /\s/u.test(character)
                || assimilatedAnnotations.some((annotation) => index >= annotation.start && index < annotation.end)
                ? []
                : [{ index, character }]),
    }, {
        formula: "#ti-0+qu-in(mati)0+0-h#",
        objectJobs: [
            { text: "qu", label: "third-person objective object" },
            { text: "in", label: "object number" },
        ],
        uncovered: [],
    });
    const generalFormula = "#pers¹-pers²+va¹-va²(STEM)tns+num¹-num²#";
    const generalAnnotations = ctx.getClassicalGeneralFormulaAnnotations(generalFormula);
    s.eq("the General formula gives every position and boundary its Andrews job", {
        jobs: generalAnnotations.map((annotation) => ({
            text: generalFormula.slice(annotation.start, annotation.end),
            label: annotation.label,
        })),
        uncovered: Array.from(generalFormula).flatMap((character, index) =>
            /\s/u.test(character)
                || generalAnnotations.some((annotation) => index >= annotation.start && index < annotation.end)
                ? []
                : [{ index, character }]),
    }, {
        jobs: [
            { text: "#", label: "nuclear clause boundary" },
            { text: "pers¹", label: "subject person" },
            { text: "-", label: "subposition boundary" },
            { text: "pers²", label: "nominative" },
            { text: "+", label: "position boundary" },
            { text: "va¹", label: "object person with case or number" },
            { text: "-", label: "subposition boundary" },
            { text: "va²", label: "object number or objective case" },
            { text: "(", label: "stem boundary" },
            { text: "STEM", label: "predicate stem" },
            { text: ")", label: "stem boundary" },
            { text: "tns", label: "mood and tense" },
            { text: "+", label: "position boundary" },
            { text: "num¹", label: "number connector" },
            { text: "-", label: "subposition boundary" },
            { text: "num²", label: "subject number" },
            { text: "#", label: "nuclear clause boundary" },
        ],
        uncovered: [],
    });

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
        { text: "#", role: "nuclear-clause-left-boundary", label: "nuclear clause boundary; attaches right", presentation: "boundary" },
        { text: "n", role: "subject-person-carrier", label: "subject person", presentation: "carrier" },
        { text: "i", role: "subject-supportive-i", label: "supportive i", presentation: "supportive-i" },
        { text: "-", role: "subposition-boundary", label: "subposition boundary", presentation: "boundary" },
        { text: "0", role: "silent-nominative", label: "silent nominative", presentation: "silent" },
        { text: "+", role: "position-boundary", label: "position boundary", presentation: "boundary" },
        { text: "qu", role: "third-person-objective-object", label: "third-person objective object", presentation: "carrier" },
        { text: "-", role: "subposition-boundary", label: "subposition boundary", presentation: "boundary" },
        { text: "0", role: "object-number-carrier", label: "silent singular object number", presentation: "silent" },
        { text: "(", role: "stem-left-boundary", label: "stem boundary", presentation: "boundary" },
        { text: "mati", role: "predicate-stem", label: "predicate stem", presentation: "carrier" },
        { text: ")", role: "stem-right-boundary", label: "stem boundary", presentation: "boundary" },
        { text: "0", role: "silent-tense", label: "silent mood and tense", presentation: "silent" },
        { text: "+", role: "position-boundary", label: "position boundary", presentation: "boundary" },
        { text: "⎕", role: "silent-number-connector", label: "silent number connector", presentation: "silent" },
        { text: "-", role: "subposition-boundary", label: "subposition boundary", presentation: "boundary" },
        { text: "0", role: "silent-subject-number", label: "silent subject number", presentation: "silent" },
        { text: "#", role: "nuclear-clause-right-boundary", label: "nuclear clause boundary; attaches left", presentation: "boundary" },
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
        && rendering.includes("const diagramNotation = getClassicalGeneralFormulaAnnotations(text)")
        && rendering.includes("[...mapped, ...diagramNotation, ...diagramSlotJobs]")
        && rendering.includes("renderClassicalDiagramDerivedAnnotations(")
        && rendering.includes("renderClassicalGeneralFormulaAnnotations(formula, generalLinearFormula)")
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
