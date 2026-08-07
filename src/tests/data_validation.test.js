"use strict";

const { createSuite } = require("./runner");
const {
    collectAndrewsTrajectoryErrors,
    collectClassicalInterfaceLanguagePolicyErrors,
} = require("../../scripts/check_grammar_data");

function run() {
    const s = createSuite("data_validation");
    const englishShell = [
        "<!doctype html>",
        '<html lang="en">',
        "<head><title>Classical Nahuatl Grammar</title></head>",
        "<body><main>Source · Grammar · Result</main></body>",
        "</html>",
    ].join("");

    s.eq("Andrews trajectory validator is exported", typeof collectAndrewsTrajectoryErrors, "function");
    s.eq("current Andrews trajectory contract passes validation", collectAndrewsTrajectoryErrors(), []);
    s.eq(
        "Classical interface language policy validator is exported",
        typeof collectClassicalInterfaceLanguagePolicyErrors,
        "function"
    );
    s.eq(
        "current English interface and Classical-only output policy pass validation",
        collectClassicalInterfaceLanguagePolicyErrors(),
        []
    );
    s.eq(
        "ordinary English interface terminology is permitted",
        collectClassicalInterfaceLanguagePolicyErrors({
            html: englishShell.replace(
                "</main>",
                " — Input, Output, Rule, Route, Stage, Result, Subject, Object, Tense, and Diagnostic</main>"
            ),
            generatedGrammarSource: 'const diagnostic = "The requested Classical form could not be generated.";',
        }),
        []
    );
    s.ok(
        "website document language must remain English",
        collectClassicalInterfaceLanguagePolicyErrors({
            html: englishShell.replace('lang="en"', 'lang="es"'),
            generatedGrammarSource: "",
        }).some((message) => message.includes('lang="en"'))
    );
    s.ok(
        "Modern Nawat or Pipil interface lanes are rejected",
        collectClassicalInterfaceLanguagePolicyErrors({
            html: englishShell.replace("</main>", '<button data-language-profile="nawat">Use Nawat</button></main>'),
            generatedGrammarSource: "",
        }).some((message) => message.includes("interface or language-profile lane"))
    );
    s.ok(
        "Modern Nawat conversion in generated grammar is rejected",
        collectClassicalInterfaceLanguagePolicyErrors({
            html: englishShell,
            generatedGrammarSource: "convertClassicalLettersToNawat(result);",
        }).some((message) => message.includes("Generated grammar and linguistic output"))
    );
    s.ok(
        "Pipil surface authority in generated output is rejected",
        collectClassicalInterfaceLanguagePolicyErrors({
            html: englishShell,
            generatedGrammarSource: 'const route = { surfaceAuthority: "Pipil" };',
        }).some((message) => message.includes("Generated grammar and linguistic output"))
    );
    s.eq(
        "English diagnostics do not become alternate-language grammar authority",
        collectClassicalInterfaceLanguagePolicyErrors({
            html: englishShell,
            generatedGrammarSource: [
                'const source = "typed Classical source";',
                'const diagnostic = "Source admission failed before generation.";',
                'const result = generateClassicalResult(source);',
            ].join("\n"),
        }),
        []
    );

    return s;
}

module.exports = { run };
