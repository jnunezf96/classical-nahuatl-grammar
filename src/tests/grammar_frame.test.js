"use strict";

const { createSuite } = require("./runner");
const {
    getCanonicalVncTestGrammarFrame,
} = require("./helpers/canonical_grammar_result");

function run(ctx = {}) {
    const s = createSuite("grammar_frame");

    s.eq(
        "canonical grammar frame keeps one ordered layer contract",
        {
            version: ctx.GRAMMAR_FRAME_VERSION,
            keys: ctx.GRAMMAR_FRAME_KEYS,
            layers: ctx.GRAMMAR_FRAME_LAYER_ORDER,
        },
        {
            version: 1,
            keys: [
                "authorityFrame",
                "orthographyFrame",
                "unitFrame",
                "morphBoundaryFrame",
                "stemFrame",
                "nuclearClauseFrame",
                "participantFrame",
                "inflectionFrame",
                "routeContract",
                "astFrame",
                "resultFrame",
                "diagnosticFrame",
            ],
            layers: [
                "authority-evidence",
                "orthography",
                "unit-kind",
                "morph-boundary",
                "stem-core",
                "nuclear-clause",
                "participants-state-valence",
                "inflection-route-source",
                "route-or-ast",
                "output-provenance",
                "diagnostics-curriculum",
            ],
        }
    );

    s.eq(
        "Andrews schemas retain NNC and VNC boundary distinctions",
        {
            ordinary:
                ctx.renderAndrewsFormulaTemplate(
                    "ordinary-nnc-shell"
                ),
            possessive:
                ctx.renderAndrewsFormulaTemplate(
                    "possessive-state-nnc"
                ),
            vnc: ctx.renderAndrewsFormulaTemplate("vnc-shell"),
            ordinaryHasTense:
                ctx.getAndrewsFormulaSlotSchema(
                    "ordinary-nnc-shell"
                ).hasTensePosition,
            possessiveHasTense:
                ctx.getAndrewsFormulaSlotSchema(
                    "possessive-state-nnc"
                ).hasTensePosition,
            vncHasTense:
                ctx.getAndrewsFormulaSlotSchema("vnc-shell")
                    .hasTensePosition,
            blockedNncTense:
                ctx.diagnoseAndrewsFormulaSlotInterpretation(
                    "ordinary-nnc-shell",
                    "num1-num2",
                    "tense"
                ).blocked,
            blockedVncObjectAsStem:
                ctx.diagnoseAndrewsFormulaSlotInterpretation(
                    "vnc-shell",
                    "va1-va2",
                    "stem"
                ).blocked,
        },
        {
            ordinary: "#pers1-pers2(STEM)num1-num2#",
            possessive:
                "#pers1-pers2+st1-st2(STEM)num1-num2#",
            vnc: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
            ordinaryHasTense: false,
            possessiveHasTense: false,
            vncHasTense: true,
            blockedNncTense: true,
            blockedVncObjectAsStem: true,
        }
    );

    s.eq(
        "formula source requirements fail closed before generation",
        {
            missingNnc:
                ctx.evaluateAndrewsFormulaSourceRequirements(
                    "ordinary-nnc-shell",
                    { inputValue: "" }
                ).ok,
            presentNnc:
                ctx.evaluateAndrewsFormulaSourceRequirements(
                    "ordinary-nnc-shell",
                    { inputValue: "cal" }
                ).ok,
            missingVnc:
                ctx.evaluateAndrewsFormulaSourceRequirements(
                    "vnc-shell",
                    { inputValue: "" }
                ).ok,
            presentVnc:
                ctx.evaluateAndrewsFormulaSourceRequirements(
                    "vnc-shell",
                    { inputValue: "nemi" }
                ).ok,
        },
        {
            missingNnc: false,
            presentNnc: true,
            missingVnc: false,
            presentVnc: true,
        }
    );

    const grammarFrame = getCanonicalVncTestGrammarFrame(ctx);
    s.eq(
        "one owner-issued result supplies coordinated independent projections",
        {
            issued: ctx.isIssuedGrammarFrame(grammarFrame),
            surfaces:
                ctx.getIssuedGrammarFrameCanonicalSurfaceForms(
                    grammarFrame
                ),
            pairs:
                ctx.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
                    grammarFrame
                ).map((pair) => ({
                    surface: pair.surface,
                    formula: pair.andrewsFormulaEcho,
                    formulaKind: pair.formulaRecord.kind,
                    writtenKind:
                        pair.formulaRealizationRecord.kind,
                    separateRecords:
                        pair.formulaRecord
                        !== pair.formulaRealizationRecord,
                })),
        },
        {
            issued: true,
            surfaces: ["micohuac"],
            pairs: [{
                surface: "micohuac",
                formula: "#0-0(mic-o-hua)0+c-0#",
                formulaKind: "grammar-formula-record",
                writtenKind:
                    "grammar-formula-realization-record",
                separateRecords: true,
            }],
        }
    );

    const copied = JSON.parse(JSON.stringify(grammarFrame));
    s.eq(
        "copied frame shape cannot authorize either projection",
        {
            issued: ctx.isIssuedGrammarFrame(copied),
            surfaces:
                ctx.getIssuedGrammarFrameCanonicalSurfaceForms(
                    copied
                ),
            pairs:
                ctx.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
                    copied
                ),
        },
        {
            issued: false,
            surfaces: [],
            pairs: [],
        }
    );

    return s;
}

module.exports = { run };
